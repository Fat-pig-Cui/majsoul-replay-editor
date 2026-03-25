/**
 * @file: huleOnePlayer.ts - 核心文件, 计算某位玩家的和牌导致的各家点数变动, 分为立直, 川麻, 国标三个部分
 * @author: GrandDawn, Fat-pig-Cui
 * @email: chubbypig@qq.com
 * @github: https://github.com/Fat-pig-Cui/majsoul-replay-editor
 */

import {
    base_info, muyu, delta_scores, hunzhiyiji_info, liqi_info, player_tiles, dora_cnt, dora_indicator, huled, baopai,
    zhenting, spell_hourglass, cuohu
} from "./data";
import {
    cuohu_points, get_ben_times, get_field_spell_mode, is_guobiao_no_8fanfu, is_hunzhiyiji, is_qingtianjing, no_zimosun,
    is_wanxiangxiuluo, is_xiakeshang, is_xuezhandaodi, is_tianming, no_guoshiangang, scale_points
} from "./misc";
import {
    calcDoras, calcSudian, calcSudianChuanma, calcSudianGuobiao, calcTianming, calcXiaKeShang, errRoundInfo, fulu2Ming,
    huazhu, push2PlayerTiles
} from "./utils";
import {calcFan, calcFanChuanma, calcFanGuobiao} from "./calcFan";
import {calcHupai, getLstAction} from "./exportedUtils";
import {Constants} from "./constants";

/**
 * huleOnePlayer 组 - 立直
 *
 * 计算 seat 号玩家的和牌导致的各家点数变动
 */
export const huleOnePlayer = (seat: Seat): HuleInfo => {
    const {lst_action, lst_name, zimo, fangchong_seat, hand, hu_tile} = dataInit(seat);
    // -------------------------------------------
    if (is_hunzhiyiji() && !zimo && hunzhiyiji_info[fangchong_seat].liqi !== 0)
        hunzhiyiji_info[fangchong_seat].overload = true;

    const points = calcFan(seat, zimo, fangchong_seat);
    const sudian = calcSudian(points);
    const val = points.fans.reduce((sum, fan) => sum + fan.val, 0);

    const delta_scores_backup = delta_scores.slice();
    const qinjia = seat === base_info.ju;
    const title_id = judgeTitleId();
    // -------------------------------------------
    const tianming_bonus = is_tianming() ? calcTianming(seat, zimo) : 1;
    const xia_ke_shang_coefficient = calcXiaKeShang()[seat];
    const extra_times = tianming_bonus * xia_ke_shang_coefficient;

    const doras0: Doras = calcDoras();
    const li_doras0: Doras = liqi_info[seat].liqi !== 0 ? dora_indicator[1].slice(0, dora_cnt.li_cnt) as Doras : [];
    // -------------------------------------------
    if (judgeZhahu()) {
        if (seat === base_info.ju)
            base_info.lianzhuang_cnt = -1; // 诈和会导致连庄数重置, 而在 hupai 中会加1, 所以这里是 -1
        const [point_rong, point_sum, point_zimo_qin, point_zimo_xian] = calcPoint(Constants.ZHAHU_SUDIAN);
        for (let i = 0; i < base_info.player_cnt; i++) {
            if (i === seat || huled[i])
                continue;
            if (i === base_info.ju || seat === base_info.ju)
                movePoint(point_zimo_qin * muyu.times[i] * muyu.times[seat], i as Seat, seat);
            else
                movePoint(point_zimo_xian * muyu.times[i] * muyu.times[seat], i as Seat, seat);
        }
        player_tiles[seat].pop();
        console.log(errRoundInfo() + `seat: ${seat} 诈和`);
        return {
            count: 0,
            doras: doras0,
            li_doras: li_doras0,
            fans: [{val: 0, id: 9000}],
            fu: 0,
            hand: hand,
            hu_tile: hu_tile,
            liqi: liqi_info[seat].liqi !== 0,
            ming: fulu2Ming(seat),
            point_rong: -point_rong,
            point_sum: -point_sum,
            point_zimo_qin: -point_zimo_qin,
            point_zimo_xian: -point_zimo_xian,
            qinjia: qinjia,
            seat: seat,
            title_id: 1,
            yiman: false,
            zimo: zimo,
            dadian: is_xuezhandaodi() || is_wanxiangxiuluo() || base_info.player_cnt === 2 ? -delta_scores[seat] : undefined,
        };
    }

    const [point_rong, point_sum, point_zimo_qin, point_zimo_xian] = calcPoint(sudian);

    let delta_point = 0;
    // 有包牌
    if (baopai[seat].length > 0) {
        const yiman_sudian = Constants.YIMAN_SUDIAN;
        const all_bao_val = baopai[seat].reduce((sum, bao) => sum + bao.val, 0);

        const [feibao_rong, , feibao_zimo_qin, feibao_zimo_xian] = calcPoint((val - all_bao_val) * yiman_sudian);

        if (zimo) {
            // 包牌部分, 包牌家全包
            for (const bao of baopai[seat]) {
                for (let i = 0; i < base_info.player_cnt; i++) {
                    if (i === seat || huled[i])
                        continue;
                    if (i === base_info.ju || seat === base_info.ju)
                        delta_point = bao.val * 2 * yiman_sudian * muyu.times[i] * muyu.times[seat] * extra_times;
                    else
                        delta_point = bao.val * yiman_sudian * muyu.times[i] * muyu.times[seat] * extra_times;
                    movePoint(delta_point, bao.seat, seat);
                }
            }
            // 非包牌部分: 没有包杠, 则是一般自摸; 存在包杠, 则包杠全包
            for (let i = 0; i < base_info.player_cnt; i++) {
                if (i === seat || huled[i])
                    continue;
                let equal_seat = i as Seat;
                if (base_info.baogang_seat !== -1 && !huled[base_info.baogang_seat])
                    equal_seat = base_info.baogang_seat;
                if (i === base_info.ju || seat === base_info.ju)
                    delta_point = feibao_zimo_qin * muyu.times[i] * muyu.times[seat] * extra_times;
                else
                    delta_point = feibao_zimo_xian * muyu.times[i] * muyu.times[seat] * extra_times;
                movePoint(delta_point, equal_seat, seat);
            }
        } else { // 放铳
            // 包牌部分
            for (const bao of baopai[seat]) {
                delta_point = bao.val * 2 * yiman_sudian * muyu.times[fangchong_seat] * muyu.times[seat] * extra_times;
                if (qinjia)
                    delta_point *= 1.5;
                movePoint(delta_point, bao.seat, seat);
            }
            // 非包牌部分: 非包牌部分 + 包牌部分/2 => 非包牌部分 + (全部 - 非包牌部分)/2 => (全部 + 非包牌部分)/2
            delta_point = (point_rong + feibao_rong) / 2 * muyu.times[fangchong_seat] * muyu.times[seat] * extra_times;
            movePoint(delta_point, fangchong_seat, seat);
        }
    }
    // 无包牌情况下的包杠, 自摸全由包杠家负担
    else if (base_info.baogang_seat !== -1 && !huled[base_info.baogang_seat] && zimo) {
        for (let i = 0; i < base_info.player_cnt; i++) {
            if (i === seat || huled[i])
                continue;
            if (i === base_info.ju || seat === base_info.ju)
                delta_point = point_zimo_qin * muyu.times[i] * muyu.times[seat];
            else
                delta_point = point_zimo_xian * muyu.times[i] * muyu.times[seat];
            movePoint(delta_point, base_info.baogang_seat, seat);
        }
    }
    // 一般情况
    else {
        if (zimo) {
            for (let i = 0; i < base_info.player_cnt; i++) {
                if (i === seat || huled[i])
                    continue;
                if (i === base_info.ju || seat === base_info.ju)
                    delta_point = point_zimo_qin * muyu.times[i] * muyu.times[seat];
                else
                    delta_point = point_zimo_xian * muyu.times[i] * muyu.times[seat];
                movePoint(delta_point, i as Seat, seat);
            }
        } else {
            delta_point = point_rong * muyu.times[fangchong_seat] * muyu.times[seat];
            movePoint(delta_point, fangchong_seat, seat);
        }
    }
    const dadian = Math.max(delta_scores[seat], -delta_scores[seat]);
    // 幻境传说: 命运卡3
    if (get_field_spell_mode(3) === 3 && liqi_info[seat].liqi !== 0) {
        const diff = 300 * spell_hourglass[seat];
        const win_point = delta_scores[seat] - delta_scores_backup[seat];
        if (win_point < diff)
            for (let i = 0; i < base_info.player_cnt; i++)
                delta_scores[i] = delta_scores_backup[i];
        else {
            delta_scores[seat] -= diff;
            if (zimo)
                for (let i = 0; i < base_info.player_cnt; i++) {
                    if (i === seat)
                        continue;
                    delta_scores[i] += diff / 3;
                }
            else
                delta_scores[fangchong_seat] += diff;
        }
    }
    // 幻境传说: 庄家卡5
    if (get_field_spell_mode(1) === 5 && seat === base_info.ju && !zimo)
        movePoint(points.dora_bonus * 1000, fangchong_seat, seat);

    calcChangGong();
    player_tiles[seat].pop();
    return {
        count: val,
        doras: doras0,
        li_doras: li_doras0,
        fans: points.fans,
        fu: points.fu,
        hand: hand,
        hu_tile: hu_tile,
        liqi: liqi_info[seat].liqi !== 0,
        ming: fulu2Ming(seat),
        point_rong: point_rong,
        point_sum: point_sum,
        point_zimo_qin: point_zimo_qin,
        point_zimo_xian: point_zimo_xian,
        qinjia: qinjia,
        seat: seat,
        title_id: title_id,
        yiman: points.yiman,
        zimo: zimo,
        tianming_bonus: is_tianming() ? tianming_bonus : undefined,
        xia_ke_shang_coefficient: is_xiakeshang() ? xia_ke_shang_coefficient : undefined,
        dadian: is_xuezhandaodi() || is_wanxiangxiuluo() || base_info.player_cnt === 2 ? dadian : undefined,
    };

    // 判断是否为诈和
    function judgeZhahu(): boolean {
        if ((calcHupai(player_tiles[seat]) !== 3 || no_guoshiangang()) && lst_name === 'RecordAnGangAddGang' && lst_action.data.type === 3)
            return true;
        if (lst_name === 'RecordRevealTile' || lst_name === 'RecordLockTile' && lst_action.data.lock_state !== 0)
            return true;
        return sudian === Constants.ZHAHU_SUDIAN || !zimo && zhenting.result[seat];
    }

    // 判断 title_id
    function judgeTitleId(): number {
        let title_id = 0;
        if (!is_qingtianjing()) {
            if (points.yiman)
                title_id = val + 4;
            else if (sudian === 8000)
                title_id = 11;
            else if (sudian === 6000)
                title_id = 4;
            else if (sudian === 4000)
                title_id = 3;
            else if (sudian === 3000)
                title_id = 2;
            else if (sudian === 2000)
                title_id = 1;
        }
        return title_id;
    }

    /**
     * 通过素点计算 荣和, 自摸总计, 自摸收亲, 自摸收闲 的点数
     * @param c_sudian - 素点
     * @returns [荣和, 自摸总计, 自摸收亲, 自摸收闲]
     */
    function calcPoint(c_sudian: number): [number, number, number, number] {
        // 点数切上到整百
        const qieshang = (point: number): number => Math.ceil(point / 100) * 100;

        let rong: number, sum: number, zimo_qin: number, zimo_xian: number;
        if (qinjia) {
            rong = 6 * c_sudian;
            sum = 6 * c_sudian;
            zimo_qin = 2 * c_sudian;
            zimo_xian = 2 * c_sudian;
            if (no_zimosun())
                zimo_xian = 6 / (base_info.player_cnt - 1) * c_sudian;
            else
                sum = 2 * (base_info.player_cnt - 1) * c_sudian;
        } else {
            rong = 4 * c_sudian;
            sum = 4 * c_sudian;
            zimo_qin = 2 * c_sudian;
            zimo_xian = c_sudian;
            if (no_zimosun()) {
                zimo_qin = (base_info.player_cnt + 2) / (base_info.player_cnt - 1) * c_sudian;
                zimo_xian = 3 / (base_info.player_cnt - 1) * c_sudian;
            } else
                sum = base_info.player_cnt * c_sudian;
        }
        const ret: [number, number, number, number] = [rong, sum, zimo_qin, zimo_xian];
        for (const i in ret)
            ret[i] = qieshang(ret[i]) * extra_times;
        return ret;
    }

    // 计算本场供托划分
    function calcChangGong() {
        let equal_seat = fangchong_seat; // 等效放铳 seat
        let baopai_same_seat = true; // true 表示当前的和牌只有一种包牌, 或只有一家包牌
        let all_baopai = true; // 包牌家是否只有一家
        if (baopai[seat].length > 0) { // 有包牌
            let all_bao_val = 0;
            for (const bao of baopai[seat]) {
                all_bao_val += bao.val;
                if (baopai[seat][0].seat !== bao.seat)
                    baopai_same_seat = false;
            }
            all_baopai = val === all_bao_val;
        }
        // 存在包杠, 则包杠家支付全部本场, 相当于包杠家放铳
        if (base_info.baogang_seat !== -1 && zimo && !huled[base_info.baogang_seat])
            equal_seat = base_info.baogang_seat;
        // 自摸情况下全是包牌, 且包牌家只有一家, 则那个包牌家支付全部本场
        else if (baopai[seat].length > 0 && zimo && all_baopai && baopai_same_seat)
            equal_seat = baopai[seat][0].seat;

        let delta_point: number;
        if (equal_seat !== undefined) {
            delta_point = (base_info.player_cnt - 1) * 100 * base_info.benchangbang * get_ben_times();
            movePoint(delta_point, equal_seat, seat);
        } else {
            delta_point = 100 * base_info.benchangbang * get_ben_times();
            for (let i = 0; i < base_info.player_cnt; i++) {
                if (i === seat || huled[i])
                    continue;
                movePoint(delta_point, i as Seat, seat);
            }
        }
        base_info.benchangbang = 0;
        // 供托
        delta_scores[seat] += base_info.liqibang * 1000;
        base_info.liqibang = 0;
    }
};

/**
 * huleOnePlayer 组 - 川麻
 *
 * 计算 seat 号玩家的和牌导致的各家点数变动
 */
export const huleOnePlayerChuanma = (seat: Seat): HuleInfo => {
    const {lst_action, lst_name, zimo, fangchong_seat, hand, hu_tile} = dataInit(seat);
    // -------------------------------------------
    const points = calcFanChuanma(seat, zimo);
    const sudian = calcSudianChuanma(points);
    const val = points.fans.reduce((sum, fan) => sum + fan.val, 0);
    // -------------------------------------------
    const zhahu = calcHupai(player_tiles[seat]) === 0 || huazhu(seat) || lst_name === 'RecordAnGangAddGang' && lst_action.data.type === 3;
    if (zhahu) {
        for (let i = 0; i < base_info.player_cnt; i++) {
            if (i === seat || huled[i])
                continue;
            movePoint(Constants.ZHAHU_SUDIAN_CHUANMA - 1000, i as Seat, seat);
        }
        player_tiles[seat].pop();
        console.log(errRoundInfo() + `seat: ${seat} 玩家诈和`);
        return {
            seat: seat,
            hand: hand,
            ming: fulu2Ming(seat),
            hu_tile: hu_tile,
            zimo: zimo,
            yiman: false,
            count: 0,
            fans: [{val: 0, id: 9000}],
            fu: 0,
            title_id: 0,
            dadian: -delta_scores[seat],
            liqi: false,
            qinjia: false,
            doras: [] as Doras,
            li_doras: [] as Doras,
        };
    }
    if (zimo)
        for (let i = 0; i < base_info.player_cnt; i++) {
            if (i === seat || huled[i])
                continue;
            movePoint(sudian + 1000, i as Seat, seat);
        }
    else
        movePoint(sudian, fangchong_seat, seat);

    const dadian = Math.max(delta_scores[seat], -delta_scores[seat]);
    player_tiles[seat].pop();
    return {
        seat: seat,
        hand: hand,
        ming: fulu2Ming(seat),
        hu_tile: hu_tile,
        zimo: zimo,
        yiman: false,
        count: val,
        fans: points.fans,
        fu: points.fu,
        title_id: 0,
        dadian: dadian,
        liqi: false,
        qinjia: false,
        doras: [] as Doras,
        li_doras: [] as Doras,
    };
};

/**
 * huleOnePlayer 组 - 国标
 *
 * 计算 seat 号玩家的和牌导致的各家点数变动
 */
export const huleOnePlayerGuobiao = (seat: Seat): HuleInfo => {
    const {lst_action, lst_name, zimo, fangchong_seat, hand, hu_tile} = dataInit(seat);
    // -------------------------------------------
    const points = calcFanGuobiao(seat, zimo);
    const sudian = calcSudianGuobiao(points), sudian_no_huapai = calcSudianGuobiao(points, true);
    const val = points.fans.reduce((sum, fan) => sum + fan.val, 0);
    // -------------------------------------------
    const {zhahu, is_cuohu} = judgeZhahuCuohu();
    if (zhahu || is_cuohu) { // 诈和, 错和赔三家各 cuohu_points() * scale_points() 点
        for (let i = 0; i < base_info.player_cnt; i++) {
            if (i === seat)
                continue;
            movePoint(-cuohu_points() * scale_points(), i as Seat, seat);
        }
        if (!zimo)
            player_tiles[seat].pop();
        console.log(errRoundInfo() + `seat: ${seat} 诈和或错和`);
        return {
            count: 0,
            doras: [] as Doras,
            li_doras: [] as Doras,
            fans: zhahu ? [{val: 0, id: 9000}] : points.fans,
            fu: 0,
            hand: hand,
            hu_tile: hu_tile,
            liqi: false,
            ming: fulu2Ming(seat),
            point_rong: 3 * cuohu_points() * scale_points(),
            point_sum: 3 * cuohu_points() * scale_points(),
            point_zimo_qin: cuohu_points() * scale_points(),
            point_zimo_xian: cuohu_points() * scale_points(),
            qinjia: false,
            seat: seat,
            title_id: 0,
            yiman: false,
            zimo: zimo,
            cuohu: true,
        };
    }
    if (zimo) {
        for (let i = 0; i < base_info.player_cnt; i++) {
            if (i === seat)
                continue;
            movePoint(sudian + Constants.GB_BASE_FAN * scale_points(), i as Seat, seat);
        }
    } else {
        movePoint(sudian, fangchong_seat, seat);

        for (let i = 0; i < base_info.player_cnt; i++) {
            if (i === seat)
                continue;
            movePoint(Constants.GB_BASE_FAN * scale_points(), i as Seat, seat);
        }
    }
    player_tiles[seat].pop();
    return {
        count: val,
        doras: [] as Doras,
        li_doras: [] as Doras,
        fans: points.fans,
        fu: points.fu,
        hand: hand,
        hu_tile: hu_tile,
        liqi: false,
        ming: fulu2Ming(seat),
        point_rong: sudian + 3 * Constants.GB_BASE_FAN * scale_points(),
        point_sum: 3 * (sudian + Constants.GB_BASE_FAN * scale_points()),
        point_zimo_qin: sudian + Constants.GB_BASE_FAN * scale_points(),
        point_zimo_xian: sudian + Constants.GB_BASE_FAN * scale_points(),
        qinjia: false,
        seat: seat,
        title_id: 0,
        yiman: false,
        zimo: zimo,
        cuohu: false,
    };

    // 判断是否为诈和或错和
    function judgeZhahuCuohu() {
        let zhahu = false, is_cuohu = false;
        if (calcHupai(player_tiles[seat]) === 0)
            zhahu = true;
        // 国标无法听花牌, 所以和拔的花牌一定是诈和
        if (lst_name === 'RecordBaBei' || lst_name === 'RecordAnGangAddGang' && lst_action.data.type === 3)
            zhahu = true;
        if (!is_guobiao_no_8fanfu() && sudian_no_huapai < Constants.GB_BASE_FAN * scale_points())
            is_cuohu = true;
        if (cuohu[seat]) // 已错和的玩家再次和牌, 仍然是错和
            is_cuohu = true;
        return {zhahu, is_cuohu};
    }
};

// 初始化部分数据
const dataInit = (seat: Seat) => {
    const lst_action = getLstAction(), lst_name = getLstAction().name;
    const zimo = ['RecordNewRound', 'RecordDealTile'].includes(lst_name);
    if (!zimo)
        push2PlayerTiles(seat);
    const fangchong_seat: Seat = !zimo ? lst_action.data.seat : undefined;
    const hand = player_tiles[seat].slice();
    const hu_tile = hand.pop();
    return {lst_action, lst_name, zimo, fangchong_seat, hand, hu_tile};
};

// 在 delta_scores 中, from 号玩家交给 to 号玩家 point 点数
const movePoint = (point: number, from: Seat, to: Seat): void => {
    delta_scores[from] -= point;
    delta_scores[to] += point;
};
