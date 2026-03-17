/**
 * @file: huleOnePlayer.ts - 核心文件, 计算 seat 号玩家的和牌导致的各家点数变动, 分为立直, 川麻, 国标三个部分
 * @author: GrandDawn, Fat-pig-Cui
 * @email: chubbypig@qq.com
 * @github: https://github.com/Fat-pig-Cui/majsoul-replay-editor
 */

import {
    all_data, base_info, muyu, delta_scores, hunzhiyiji_info, liqi_info, player_tiles, dora_cnt, dora_indicator, huled,
    baopai, zhenting, spell_hourglass, cuohu
} from "./data";
import {
    cuohu_points, get_ben_times, get_field_spell_mode, is_guobiao_no_8fanfu, is_hunzhiyiji, is_qingtianjing, no_zimosun,
    is_wanxiangxiuluo, is_xiakeshang, is_xuezhandaodi, is_tianming, no_guoshiangang,  scale_points
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
    /**
     * 点数切上到整百
     * @param point - 原点数
     */
    const qieshang = (point: number): number => Math.ceil(point / 100) * 100;

    const lst_action = getLstAction(), lst_name = getLstAction().name;
    let zimo = false;
    if (lst_name === 'RecordDealTile' || lst_name === 'RecordNewRound')
        zimo = true;
    else
        push2PlayerTiles(seat);
    let fangchong_seat: Seat;
    const delta_scores_backup = delta_scores.slice();
    if (!zimo)
        fangchong_seat = lst_action.data.seat;

    if (is_hunzhiyiji() && !zimo && hunzhiyiji_info[fangchong_seat].liqi !== 0)
        hunzhiyiji_info[fangchong_seat].overload = true;

    const ming = fulu2Ming(seat);
    const qinjia = seat === base_info.ju;
    const liqi = liqi_info[seat].liqi !== 0;
    const hand = player_tiles[seat].slice();
    const hu_tile = hand[hand.length - 1];
    hand.pop();
    // -------------------------------------------
    const points = calcFan(seat, zimo, fangchong_seat);
    const sudian = calcSudian(points);
    let val = 0, title_id = 0;
    for (const fan of points.fans)
        val += fan.val;
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
    // -------------------------------------------
    let tianming_bonus = 1;
    if (is_tianming())
        tianming_bonus = calcTianming(seat, zimo);
    const xia_ke_shang_coefficient = calcXiaKeShang()[seat];

    const extra_times = tianming_bonus * xia_ke_shang_coefficient;
    // -------------------------------------------
    let zhahu = false;
    if (calcHupai(player_tiles[seat]) === 0 || sudian === -2000)
        zhahu = true;
    if ((calcHupai(player_tiles[seat]) !== 3 || no_guoshiangang()) && lst_name === 'RecordAnGangAddGang' && lst_action.data.type === 3)
        zhahu = true;
    if (!zimo && zhenting.result[seat])
        zhahu = true;
    if (lst_name === 'RecordRevealTile' || lst_name === 'RecordLockTile' && lst_action.data.lock_state !== 0)
        zhahu = true;
    let point_rong: number, point_sum: number, point_zimo_qin: number, point_zimo_xian: number;

    const doras0: Doras = calcDoras();
    const li_doras0: Doras = [];
    if (liqi_info[seat].liqi !== 0)
        for (let i = 0; i < dora_cnt.li_cnt; i++)
            li_doras0[i] = dora_indicator[1][i];

    if (zhahu) {
        if (seat === base_info.ju)
            base_info.lianzhuang_cnt = -1; // 任意荒牌流局都会导致连庄数重置, 而在 hupai 中会加1, 所以这里是 -1
        [point_rong, point_sum, point_zimo_qin, point_zimo_xian] = calcPoint(-2000);
        for (let i = 0; i < base_info.player_cnt; i++) {
            if (i === seat || huled[i])
                continue;
            let delta_point = 0;
            if (i === base_info.ju || seat === base_info.ju) {
                delta_point = point_zimo_qin * muyu.times[i] * muyu.times[seat];
                delta_scores[i] -= delta_point;
                delta_scores[seat] += delta_point;
            } else {
                delta_point = point_zimo_xian * muyu.times[i] * muyu.times[seat];
                delta_scores[i] -= delta_point;
                delta_scores[seat] += delta_point;
            }
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
            liqi: liqi,
            ming: ming,
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

    [point_rong, point_sum, point_zimo_qin, point_zimo_xian] = calcPoint(sudian);
    point_rong = qieshang(point_rong) * extra_times;
    point_sum = qieshang(point_sum) * extra_times;
    point_zimo_qin = qieshang(point_zimo_qin) * extra_times;
    point_zimo_xian = qieshang(point_zimo_xian) * extra_times;

    // 有包牌
    if (baopai[seat].length > 0) {
        let delta_point = 0;
        let yiman_sudian = 8000;
        let all_bao_val = 0;
        for (const bao of baopai[seat])
            all_bao_val += bao.val;

        let feibao_rong: number, feibao_zimo_qin: number, feibao_zimo_xian: number;
        [feibao_rong, , feibao_zimo_qin, feibao_zimo_xian] = calcPoint((val - all_bao_val) * yiman_sudian);
        feibao_rong = qieshang(feibao_rong) * extra_times;
        feibao_zimo_qin = qieshang(feibao_zimo_qin) * extra_times;
        feibao_zimo_xian = qieshang(feibao_zimo_xian) * extra_times;

        if (zimo) {
            // 包牌部分, 包牌家全包
            for (const bao of baopai[seat]) {
                for (let i = 0; i < base_info.player_cnt; i++) {
                    if (i === seat || huled[i])
                        continue;
                    if (i === base_info.ju || seat === base_info.ju) {
                        delta_point = bao.val * 2 * yiman_sudian * muyu.times[i] * muyu.times[seat] * extra_times;
                        delta_scores[bao.seat] -= delta_point;
                        delta_scores[seat] += delta_point;
                    } else {
                        delta_point = bao.val * yiman_sudian * muyu.times[i] * muyu.times[seat] * extra_times;
                        delta_scores[bao.seat] -= delta_point;
                        delta_scores[seat] += delta_point;
                    }
                }
            }
            // 非包牌部分: 没有包杠, 则是一般自摸; 存在包杠, 则包杠全包
            for (let i = 0; i < base_info.player_cnt; i++) {
                if (i === seat || huled[i])
                    continue;
                let equal_seat = i;
                if (base_info.baogang_seat !== -1 && !huled[base_info.baogang_seat])
                    equal_seat = base_info.baogang_seat;
                if (i === base_info.ju || seat === base_info.ju) {
                    delta_point = feibao_zimo_qin * muyu.times[i] * muyu.times[seat];
                    delta_scores[equal_seat] -= delta_point;
                    delta_scores[seat] += delta_point;
                } else {
                    delta_point = feibao_zimo_xian * muyu.times[i] * muyu.times[seat];
                    delta_scores[equal_seat] -= delta_point;
                    delta_scores[seat] += delta_point;
                }
            }
        } else {
            // 包牌部分
            for (const bao of baopai[seat]) {
                delta_point = bao.val * yiman_sudian * 2 * muyu.times[fangchong_seat] * muyu.times[seat] * extra_times;
                if (qinjia)
                    delta_point *= 1.5;
                delta_scores[bao.seat] -= delta_point;
                delta_scores[seat] += delta_point;
            }
            // 非包牌部分: 非包牌部分 + 包牌部分/2 => 非包牌部分 + (全部 - 非包牌部分)/2 => (全部 + 非包牌部分)/2
            delta_point = (point_rong + feibao_rong) / 2 * muyu.times[fangchong_seat] * muyu.times[seat];
            delta_scores[fangchong_seat] -= delta_point;
            delta_scores[seat] += delta_point;
        }
    }
    // 无包牌情况下的包杠, 自摸全由包杠家负担
    else if (base_info.baogang_seat !== -1 && !huled[base_info.baogang_seat] && zimo) {
        let delta_point = 0;
        for (let i = 0; i < base_info.player_cnt; i++) {
            if (i === seat || huled[i])
                continue;
            if (i === base_info.ju || seat === base_info.ju) {
                delta_point = point_zimo_qin * muyu.times[i] * muyu.times[seat];
                delta_scores[base_info.baogang_seat] -= delta_point;
                delta_scores[seat] += delta_point;
            } else {
                delta_point = point_zimo_xian * muyu.times[i] * muyu.times[seat];
                delta_scores[base_info.baogang_seat] -= delta_point;
                delta_scores[seat] += delta_point;
            }
        }
    }
    // 一般情况
    else {
        let delta_point = 0;
        if (zimo) {
            for (let i = 0; i < base_info.player_cnt; i++) {
                if (i === seat || huled[i])
                    continue;
                if (i === base_info.ju || seat === base_info.ju) {
                    delta_point = point_zimo_qin * muyu.times[i] * muyu.times[seat];
                    delta_scores[i] -= delta_point;
                    delta_scores[seat] += delta_point;
                } else {
                    delta_point = point_zimo_xian * muyu.times[i] * muyu.times[seat];
                    delta_scores[i] -= delta_point;
                    delta_scores[seat] += delta_point;
                }
            }
        } else {
            delta_point = point_rong * muyu.times[fangchong_seat] * muyu.times[seat];
            delta_scores[fangchong_seat] -= delta_point;
            delta_scores[seat] += delta_point;
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
    if (get_field_spell_mode(1) === 5 && seat === base_info.ju && !zimo) {
        delta_scores[seat] += points.dora_bonus * 1000;
        delta_scores[fangchong_seat] -= points.dora_bonus * 1000;
    }

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
        liqi: liqi,
        ming: ming,
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

    /**
     * 通过素点计算 荣和, 自摸总计, 自摸收亲, 自摸收闲 的点数
     * @param c_sudian - 素点
     * @returns [荣和, 自摸总计, 自摸收亲, 自摸收闲]
     */
    function calcPoint(c_sudian: number): [number, number, number, number] {
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
        return [rong, sum, zimo_qin, zimo_xian];
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
            delta_scores[equal_seat] -= delta_point;
            delta_scores[seat] += delta_point;
        } else {
            delta_point = 100 * base_info.benchangbang * get_ben_times();
            for (let i = 0; i < base_info.player_cnt; i++) {
                if (i === seat || huled[i])
                    continue;
                delta_scores[i] -= delta_point;
                delta_scores[seat] += delta_point;
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
    const lst_action = getLstAction(), lst_name = getLstAction().name;
    let zimo = false;
    if (lst_name === 'RecordDealTile' || lst_name === 'RecordNewRound')
        zimo = true;
    else
        push2PlayerTiles(seat);
    let fangchong_seat: Seat;
    if (!zimo)
        fangchong_seat = lst_action.data.seat;

    const ming = fulu2Ming(seat);
    const hand = player_tiles[seat].slice();
    const hu_tile = hand[hand.length - 1];
    hand.pop();
    // -------------------------------------------
    const points = calcFanChuanma(seat, zimo);
    const sudian = calcSudianChuanma(points);
    let val = 0;
    for (const fan of points.fans)
        val += fan.val;
    // -------------------------------------------
    let zhahu = false;
    if (huazhu(seat) || calcHupai(player_tiles[seat]) === 0)
        zhahu = true;
    if (lst_name === 'RecordAnGangAddGang' && lst_action.data.type === 3)
        zhahu = true;
    if (zhahu) {
        for (let i = 0; i < base_info.player_cnt; i++) {
            if (i === seat || huled[i])
                continue;
            delta_scores[i] -= -33000;
            delta_scores[seat] += -33000;
        }
        player_tiles[seat].pop();
        console.log(`第${all_data.all_actions.length + 1}局: seat: ${seat} 玩家诈和`);
        return {
            seat: seat,
            hand: hand,
            ming: ming,
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
            delta_scores[i] -= sudian + 1000;
            delta_scores[seat] += sudian + 1000;
        }
    else {
        delta_scores[fangchong_seat] -= sudian;
        delta_scores[seat] += sudian;
    }
    const dadian = Math.max(delta_scores[seat], -delta_scores[seat]);
    player_tiles[seat].pop();
    // ---------------------------------------------------
    return {
        seat: seat,
        hand: hand,
        ming: ming,
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
    const lst_action = getLstAction(), lst_name = getLstAction().name;
    let zimo = false;
    if (lst_name === 'RecordDealTile' || lst_name === 'RecordNewRound')
        zimo = true;
    else
        push2PlayerTiles(seat);
    let fangchong_seat: Seat;
    if (!zimo)
        fangchong_seat = lst_action.data.seat;

    const ming = fulu2Ming(seat);
    const qinjia = seat === base_info.ju;
    const hand = player_tiles[seat].slice();
    const hu_tile = hand[hand.length - 1];
    hand.pop();
    // -------------------------------------------
    const points = calcFanGuobiao(seat, zimo);
    const sudian = calcSudianGuobiao(points), sudian_no_huapai = calcSudianGuobiao(points, true);
    let val = 0;
    for (const fan of points.fans)
        val += fan.val;
    // -------------------------------------------
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

    if (zhahu || is_cuohu) { // 诈和, 错和赔三家各 cuohu_points() * scale_points() 点
        for (let i = 0; i < base_info.player_cnt; i++) {
            if (i === seat)
                continue;
            delta_scores[i] += cuohu_points() * scale_points();
            delta_scores[seat] -= cuohu_points() * scale_points();
        }
        if (!zimo)
            player_tiles[seat].pop();
        console.log(errRoundInfo() + `seat: ${seat} 玩家诈和或错和`);
        return {
            count: 0,
            doras: [] as Doras,
            li_doras: [] as Doras,
            fans: zhahu ? [{val: 0, id: 9000}] : points.fans,
            fu: 0,
            hand: hand,
            hu_tile: hu_tile,
            liqi: false,
            ming: ming,
            point_rong: 3 * cuohu_points() * scale_points(),
            point_sum: 3 * cuohu_points() * scale_points(),
            point_zimo_qin: cuohu_points() * scale_points(),
            point_zimo_xian: cuohu_points() * scale_points(),
            qinjia: qinjia,
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
            delta_scores[i] -= sudian + Constants.GB_BASE_FAN * scale_points();
            delta_scores[seat] += sudian + Constants.GB_BASE_FAN * scale_points();
        }
    } else {
        delta_scores[fangchong_seat] -= sudian;
        delta_scores[seat] += sudian;

        for (let i = 0; i < base_info.player_cnt; i++) {
            if (i === seat)
                continue;
            delta_scores[i] -= Constants.GB_BASE_FAN * scale_points();
            delta_scores[seat] += Constants.GB_BASE_FAN * scale_points();
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
        ming: ming,
        point_rong: sudian + 3 * Constants.GB_BASE_FAN * scale_points(),
        point_sum: 3 * (sudian + Constants.GB_BASE_FAN * scale_points()),
        point_zimo_qin: sudian + Constants.GB_BASE_FAN * scale_points(),
        point_zimo_xian: sudian + Constants.GB_BASE_FAN * scale_points(),
        qinjia: qinjia,
        seat: seat,
        title_id: 0,
        yiman: false,
        zimo: zimo,
        cuohu: false,
    };
};
