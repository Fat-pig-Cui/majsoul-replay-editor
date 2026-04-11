/**
 * @file: utils.ts - 一些内部的辅助函数
 * @author: GrandDawn, Fat-pig-Cui
 * @email: chubbypig@qq.com
 * @github: https://github.com/Fat-pig-Cui/majsoul-replay-editor
 */

import {
    dora_cnt, dora_indicator, fulu, huled, liqi_info, mingpais, paihe, scores, base_info, shoumoqie, xun,
    yongchang_data, muyu_info, muyu, player_tiles, all_data, lst_liqi, zhenting
} from "./data";
import {
    get_aka_cnt, get_fanfu, get_field_spell_mode, is_chuanma, is_fufenliqi, is_guobiao, is_guobiao_huapai, is_mingjing,
    is_qieshang, is_qingtianjing, is_wanxiangxiuluo, is_xiakeshang, no_composite_yakuman,
    no_dora, no_gangdora, no_ganglidora, no_leijiyiman, no_lidora, no_zhenting, scale_points
} from "./misc";
import {calcTingpai, getLstAction, isEqualTile} from "./exportedUtils";
import {simplify} from "./baseUtils";
import {Constants} from "./constants";

/**
 * 获取当前模式各种牌的数量分布
 */
export const getTileNum = (): TileNumAll => {
    const cnt: TileNumAll = {};
    for (const tile of Constants.TILE) {
        cnt[tile] = Constants.AKA_TILE.includes(tile) ? 0 : 4;
        cnt[tile + Constants.SPT_SUFFIX] = 0;
    }

    let aka_cnt = 3;
    if (get_aka_cnt() > -1)
        aka_cnt = get_aka_cnt();
    else if (base_info.player_cnt === 3)
        aka_cnt = 2;
    else if (base_info.player_cnt === 2)
        aka_cnt = 1;

    if (base_info.player_cnt === 2) { // 二麻
        for (const tile of Constants.PIN_MID_TILE)
            cnt[tile] = 0;
        for (const tile of Constants.SOU_MID_TILE)
            cnt[tile] = 0;
        cnt['5m'] = 4 - aka_cnt;
        cnt['0m'] = aka_cnt;
    } else if (base_info.player_cnt === 3) { // 三麻
        for (const tile of Constants.MAN_MID_TILE)
            cnt[tile] = 0;
        cnt['5p'] = cnt['5s'] = 4 - Math.floor(aka_cnt / 2);
        cnt['0p'] = cnt['0s'] = Math.floor(aka_cnt / 2);
    } else { // 四麻
        if (aka_cnt === 4) {
            cnt['5m'] = cnt['5s'] = 3;
            cnt['5p'] = cnt['0p'] = 2;
            cnt['0m'] = cnt['0s'] = 1;
        } else {
            cnt['5m'] = cnt['5p'] = cnt['5s'] = 4 - Math.floor(aka_cnt / 3);
            cnt['0m'] = cnt['0p'] = cnt['0s'] = Math.floor(aka_cnt / 3);
        }
    }
    if (is_chuanma()) {
        for (const tile of Constants.HONOR_TILE)
            cnt[tile] = 0;
        cnt['0m'] = cnt['0p'] = cnt['0s'] = 0;
        cnt['5m'] = cnt['5p'] = cnt['5s'] = 4;
    }
    if (is_guobiao()) {
        cnt['0m'] = cnt['0p'] = cnt['0s'] = 0;
        cnt['5m'] = cnt['5p'] = cnt['5s'] = 4;
        // 用 HUAPAI 当做国标的花牌
        if (is_guobiao_huapai() && typeof editFunction == 'function')
            cnt[Constants.HUAPAI] = 8;
    }
    if (is_mingjing()) {
        for (const tile of Constants.TILE_NO_AKA) {
            cnt[tile] = 1;
            cnt[tile + Constants.SPT_SUFFIX] = 3;
        }
        cnt['0m'] = cnt['0p'] = cnt['0s'] = 0;
    }
    // 万象修罗
    if (is_wanxiangxiuluo())
        cnt[Constants.TBD] = 4;

    return cnt;
};

// 玩家的巡目所对应的操作位置
export const calcXun = (): void => {
    for (let i = 0; i < base_info.player_cnt; i++)
        if (player_tiles[i].length % 3 === 2 && !huled[i])
            xun[i].push(all_data.cur_actions.length - 1);
};

// 计算表指示牌
export const calcDoras = (): Doras => {
    if (dora_cnt.cnt > 5)
        dora_cnt.cnt = 5;
    if (dora_cnt.li_cnt > 5)
        dora_cnt.li_cnt = 5;
    if (no_ganglidora())
        dora_cnt.li_cnt = 1;
    if (no_gangdora())
        dora_cnt.cnt = dora_cnt.li_cnt = 1;
    if (no_lidora())
        dora_cnt.li_cnt = 0;
    if (is_chuanma() || is_guobiao() || no_dora())
        dora_cnt.cnt = dora_cnt.li_cnt = 0;
    const doras0: Doras = [];
    for (let i = 0; i < dora_cnt.cnt; i++)
        doras0[i] = dora_indicator[0][i];
    return doras0;
};

// 更新 seat 号玩家的舍张振听状态
export const judgeShezhangzt = (seat: Seat): void => {
    if (!is_chuanma() && !is_guobiao() && !no_zhenting()) {
        zhenting.shezhang[seat] = false;
        const tingpais = calcTingpai(seat);
        for (const tingpai of tingpais)
            for (const tile of paihe[seat].tiles)
                if (isEqualTile(tingpai.tile, tile))
                    zhenting.shezhang[seat] = true;
        updateZhenting();
    }
};

/**
 * 更新同巡和立直预振听
 * @param seat - seat 号玩家
 * @param tile - 相关操作的牌
 */
export const prejudgeZhenting = (seat: Seat, tile: Tile): void => {
    if (!is_chuanma() && !is_guobiao() && !no_zhenting()) {
        // 同巡振听预判断
        for (let i = 0; i < base_info.player_cnt; i++) {
            if (i === seat)
                continue;
            const tingpais = calcTingpai(i as Seat);
            for (const tingpai of tingpais)
                if (isEqualTile(tile, tingpai.tile)) {
                    zhenting.tongxun[0][i] = true;
                    break;
                }
        }
        // 立直振听预判断
        for (let i = 0; i < base_info.player_cnt; i++) {
            if (liqi_info[i].liqi === 0)
                continue;
            const tingpais = calcTingpai(i as Seat);
            for (const tingpai of tingpais)
                if (isEqualTile(tile, tingpai.tile)) {
                    zhenting.liqi[0][i] = true;
                    break;
                }
        }
    }
};

// 更新振听状态
export const updateZhenting = (): void => {
    for (let i = 0; i < base_info.player_cnt; i++)
        zhenting.result[i] = zhenting.shezhang[i] || zhenting.tongxun[1][i] || zhenting.liqi[1][i];
};

// 开局计算所有玩家的听牌, 亲家去掉最后一张牌后再计算, 但仍然不会显示
export const getAllTingpai = (): { seat: number, tingpais1: { tile: string }[] }[] => {
    const tingpai: { seat: number, tingpais1: { tile: string }[] }[] = [];
    const lastile = player_tiles[base_info.ju].pop();
    for (let seat = 0; seat < base_info.player_cnt; seat++) {
        const tingpais1 = calcTingpai(seat as Seat);
        if (tingpais1.length > 0)
            tingpai.push({seat: seat, tingpais1: tingpais1});
    }
    player_tiles[base_info.ju].push(lastile);
    return tingpai;
};

// 通过最近其他玩家的操作把对应的牌 push 到要和牌的玩家的手牌中
export const push2PlayerTiles = (seat: Seat): void => {
    const lst_action = getLstAction(), lst_name = getLstAction().name;
    if (lst_name === 'RecordDiscardTile' || lst_name === 'RecordRevealTile' || lst_name === 'RecordLockTile')
        player_tiles[seat].push(lst_action.data.tile);
    else if (lst_name === 'RecordBaBei')
        player_tiles[seat].push(lst_action.data.tile);
    else if (lst_name === 'RecordAnGangAddGang')
        player_tiles[seat].push(lst_action.data.tiles);
};

// 将 seat 号玩家的副露信息 fulu 赋值给 ming
export const fulu2Ming = (seat: Seat): string[] => {
    const ming: string[] = [];
    for (const f of fulu[seat]) {
        const tiles = f.tile;
        if (f.type === 0)
            ming.push(`shunzi(${tiles[0]},${tiles[1]},${tiles[2]})`);
        else if (f.type === 1)
            ming.push(`kezi(${tiles[0]},${tiles[1]},${tiles[2]})`);
        else if (f.type === 2)
            ming.push(`minggang(${tiles[0]},${tiles[1]},${tiles[2]},${tiles[3]})`);
        else if (f.type === 3)
            ming.push(`angang(${tiles[0]},${tiles[1]},${tiles[2]},${tiles[3]})`);
    }
    return ming;
};

/**
 * 把 lst_liqi 中的信息赋值给 liqi_info, 并返回胶水代码用的 liqi
 * @param type - 是否允许立直失败, 只会出现在血战到底模式中, 默认不允许
 */
export const lstLiqi2Liqi = (type: boolean = false): Liqi => {
    let ret = null;
    if (lst_liqi.valid) {
        let need_bangzi = base_info.liqi_need;
        if (lst_liqi.beishui_type === 1)
            need_bangzi = 5;
        else if (lst_liqi.beishui_type === 2)
            need_bangzi = 10;
        if (scores[lst_liqi.seat] >= need_bangzi * 1000 || is_fufenliqi()) {
            base_info.liqibang += need_bangzi;
            scores[lst_liqi.seat] -= need_bangzi * 1000;
            liqi_info[lst_liqi.seat] = {
                liqi: lst_liqi.liqi,
                yifa: get_field_spell_mode(2) === 2 ? 3 : 1, // 幻境传说: 机会卡2
                kai: lst_liqi.kai,
                beishui_type: lst_liqi.beishui_type,
                xia_ke_shang: {score_coefficients: calcXiaKeShang()},
            };
            ret = {
                seat: lst_liqi.seat,
                liqibang: base_info.liqibang,
                score: scores[lst_liqi.seat],
                liqi_type_beishuizhizhan: lst_liqi.beishui_type,
                xia_ke_shang: {score_coefficients: calcXiaKeShang()},
            };
        } else if (type)
            ret = {
                seat: lst_liqi.seat,
                liqibang: base_info.liqibang,
                score: scores[lst_liqi.seat],
                failed: true,
            };
    }
    lst_liqi.valid = false;
    return ret;
};

/**
 * 配牌明牌, 如果有明的牌则去掉, 返回 true, 没有则返回 false
 * @param seat - seat 号玩家
 * @param tile - 牌的种类
 */
export const eraseMingpai = (seat: Seat, tile: Tile): boolean => {
    if (mingpais[seat][tile] > 0) {
        mingpais[seat][tile]--;
        return true;
    }
    return false;
};

/**
 * 龙之目玉, 更新目玉
 */
export const updateMuyu = (): void => {
    const type = muyu_info.count === 0; // 更新类型, true 表示生成新目玉, false 表示计数
    if (type) {
        muyu_info.id++;
        muyu_info.count = 5;
        if (muyu.seats.length > 0) {
            muyu_info.seat = parseInt(muyu.seats[0]) as Seat;
            muyu.seats = muyu.seats.substring(1) as MuyuSeats;
        } else
            muyu_info.seat = Math.floor(Math.random() * base_info.player_cnt) as Seat;
        for (let i = 0; i < base_info.player_cnt; i++)
            muyu.times[i] = 1;
        muyu.times[muyu_info.seat]++;
    } else
        muyu_info.count--;
};

// 幻境传说, 判断 tile 是否为 dora
export const isDora = (tile: Tile): boolean => {
    tile = simplify(tile);
    if (tile[0] === '0')
        return true;
    const doras0 = calcDoras();
    for (const dora0 of doras0)
        if (tile === Constants.DORA_NXT[dora0])
            return true;
    return false;
};

/**
 * 天命之战, 有多少天命牌
 * @param seat - seat 号玩家
 * @param zimo - 是否为自摸
 */
export const calcTianming = (seat: Seat, zimo: boolean): number => {
    let sum = 1;
    for (const [index, tile] of player_tiles[seat].entries()) { // 查手牌
        if (!zimo && index === player_tiles[seat].length - 1) // 不是自摸, 则最后一张牌不考虑
            break;
        if (tile.length >= 2 && tile[2] === Constants.SPT_SUFFIX)
            sum++;
    }
    for (const f of fulu[seat]) // 查副露
        for (const [index, tile] of f.tile.entries()) {
            if (f.type !== 3 && index === f.tile.length - 1) // 不是暗杠, 则最后一张牌不考虑
                break;
            if (tile.length > 2 && tile[2] === Constants.SPT_SUFFIX)
                sum++;
        }
    return sum;
};

// 咏唱之战, 更新 seat 号玩家手摸切信息
export const updateShoumoqie = (seat: Seat): void => {
    for (const flag of [false, true]) {
        let len = 0;
        for (let i = 0; i < shoumoqie[seat].length; i++)
            if (shoumoqie[seat][i] === flag) {
                let j = i + 1;
                while (shoumoqie[seat][j] === flag && j < shoumoqie[seat].length)
                    j++;
                len = Math.max(len, j - i);
                i = j + 1;
            }
        yongchang_data[seat][flag ? 'shouqie_count' : 'moqie_count'] = len;
        yongchang_data[seat][flag ? 'shouqie_bonus' : 'moqie_bonus'] = calcBonus(seat, flag);
    }

    /**
     * 咏唱之战, 计算 seat 号玩家的奖励番(绯, 苍)
     * @param seat - seat 号玩家
     * @param flag - 计算类型, false 表示摸切, true 表示手切
     */
    function calcBonus(seat: Seat, flag: boolean) {
        const val = yongchang_data[seat][flag ? 'shouqie_count' : 'moqie_count'];
        if (!flag) { // 摸切
            if (val < 3)
                return 0;
            else if (val < 5)
                return 1;
            else if (val < 7)
                return 2;
            else if (val < 9)
                return 3;
            else if (val < 12)
                return 5;
            else
                return 12;
        } else { // 手切
            if (val < 3)
                return 0;
            else if (val < 6)
                return 1;
            else if (val < 9)
                return 2;
            else if (val < 12)
                return 3;
            else if (val < 18)
                return 5;
            else
                return 12;
        }
    }
};

// 下克上, 返回各家的打点倍数
export const calcXiaKeShang = (): Players_Number => {
    const times: Players_Number = [1, 1, 1, 1];
    for (let i = 0; i < base_info.player_cnt; i++)
        if (is_xiakeshang() && scores[i] < 30000) {
            if (scores[i] < 10000)
                times[i] = 4;
            else if (scores[i] < 20000)
                times[i] = 3;
            else
                times[i] = 2;
        }
    return times;
};

/**
 * calcSudian 组 - 立直
 *
 * 根据算得的番计算素点
 * @param x - 和牌信息
 * @param type - 有效值0和1, 0是一般模式, 1表示比较模式, 默认为一般模式
 */
export const calcSudian = (x: CalcFanRet, type: number = 0): number => {
    const fanfu = get_fanfu();
    const val = x.fans.reduce((sum, fan) => sum + fan.val, 0);
    if (is_qingtianjing())
        return x.fu * Math.pow(2, val + 2);

    if (x.yiman)
        return Constants.YIMAN_SUDIAN * (!no_composite_yakuman() ? val : Math.max(...x.fans.map(fan => fan.val)));

    else if (val < fanfu)
        return Constants.ZHAHU_SUDIAN;
    else if (val >= 13 && !no_leijiyiman())
        return Constants.MANGUAN_SUDIAN * 4 + type * (val + x.fu * 0.01);
    else if (val >= 11)
        return Constants.MANGUAN_SUDIAN * 3 + type * (val + x.fu * 0.01);
    else if (val >= 8)
        return Constants.MANGUAN_SUDIAN * 2 + type * (val + x.fu * 0.01);
    else if (val >= 6)
        return Constants.MANGUAN_SUDIAN * 1.5 + type * (val + x.fu * 0.01);
    else if (val >= 5)
        return Constants.MANGUAN_SUDIAN + type * (val + x.fu * 0.01);
    else if (is_qieshang() && (val === 4 && x.fu === 30 || val === 3 && x.fu === 60))
        return Constants.MANGUAN_SUDIAN + type * (val + x.fu * 0.01);
    else
        return Math.min(Math.pow(2, val + 2) * x.fu, Constants.MANGUAN_SUDIAN) + type * (val + x.fu * 0.01);
};

/**
 * calcSudian 组 - 川麻
 *
 * 根据算得的番计算素点
 * @param x - 和牌信息
 * @param type - 有效值0和1, 0是一般模式, 1表示比较模式, 默认为一般模式
 */
export const calcSudianChuanma = (x: CalcFanRet, type: number = 0): number => {
    const val = x.fans.reduce((sum, fan) => sum + fan.val, 0);
    if (val === 0)
        return 0;
    return Math.min(1000 * Math.pow(2, val - 1), 32000) + type * val;
};

/**
 * calcSudian 组 - 国标
 *
 * 根据算得的番计算素点
 * @param x - 和牌信息
 * @param no_huapai - 是否不考虑花牌, 默认考虑
 */
export const calcSudianGuobiao = (x: CalcFanRet, no_huapai: boolean = false): number => {
    let val = 0;
    for (const fan of x.fans)
        if (!(no_huapai && fan.id >= 8091 && fan.id <= 8099))
            val += fan.val;
    return val * scale_points();
};
