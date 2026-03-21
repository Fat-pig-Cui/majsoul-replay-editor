/**
 * @file: utils.ts - 一些内部的辅助函数
 * @author: GrandDawn, Fat-pig-Cui
 * @email: chubbypig@qq.com
 * @github: https://github.com/Fat-pig-Cui/majsoul-replay-editor
 */

import {
    actions, dora_cnt, dora_indicator, fulu, gaps, huled, liqi_info, mingpais, paihe, scores, base_info, shoumoqie, xun,
    yongchang_data, muyu_info, muyu, player_tiles, all_data, lst_liqi, zhenting
} from "./data";
import {
    get_fanfu, get_field_spell_mode, is_chuanma, is_fufenliqi, is_guobiao, is_qieshang, is_qingtianjing, is_xiakeshang,
    no_dora, no_gangdora, no_ganglidora, no_leijiyiman, no_lidora, no_zhenting, scale_points
} from "./misc";
import {calcHupai, calcTingpai, getLstAction, isEqualTile} from "./exportedUtils";
import {Constants} from "./constants";

/**
 * 将 tile 牌简化: 去掉最后的 SPT_SUFFIX, 并将红宝牌转换为普通牌
 */
export const simplify = (tile: Tile): Tile => {
    if (tile[0] == '0')
        return '5' + tile[1] as Tile;
    return tile[0] + tile[1] as Tile;
};

/**
 * 按照排序返回 tile 的下一张牌, 忽略红宝牌
 */
export const nextTile = (tile: Tile): Tile => {
    tile = simplify(tile);
    if (tile === '7z')
        return '0m';
    const group = ['m', 'p', 's', 'z'];
    const cur_index = group.indexOf(tile[1]);
    if (tile[0] === '9')
        return '1' + group[cur_index + 1] as Tile;
    return (parseInt(tile) + 1) + tile[1] as Tile;
};

/**
 * 给定牌顺子给出中间的牌
 */
export const shunziMidTile = (tiles: Tile[]): Tile => {
    if (tiles.length !== 3)
        throw new Error(errRoundInfo() + `shunziMidTile: 输入牌数量不为3: ${tiles}`);
    const nums: number[] = [];
    for (const tile of tiles)
        nums.push(parseInt(simplify(tile)[0]));
    nums.sort((a, b) => a - b);
    return nums[1] + tiles[0][1] as Tile;
};

// 玩家的巡目所对应的操作位置
export const calcXun = (): void => {
    for (let i = 0; i < base_info.player_cnt; i++)
        if (player_tiles[i].length % 3 === 2 && !huled[i])
            xun[i].push(actions.length - 1);
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

// 手牌理牌算法
export const cmp = (x: Tile, y: Tile): number => {
    x = simplify(x);
    y = simplify(y);
    if (x === y)
        return 0;
    if (x === Constants.TBD)
        return -1;
    if (y === Constants.TBD)
        return 1;
    const group = Constants.GROUP;
    const group_index_x = group.indexOf(x[1]), group_index_y = group.indexOf(y[1]);
    const num_x = parseInt(x), num_y = parseInt(y);
    if (group_index_x > group_index_y)
        return 1;
    else if (group_index_x < group_index_y)
        return -1;
    else if (num_x > num_y)
        return 1;
    else if (num_x < num_y)
        return -1;
    return 0;
};

// 随机排序比较函数
export const randomCmp = () => Math.random() - 0.5;

// 判断第一个参数里面的所有牌是否为第二个参数里面的牌的子集, 考虑和赤宝牌和特殊牌
export const inTiles = (x: Tile | Tile[], y: Tile[]): boolean => {
    if (typeof x == 'string')
        x = [x];
    const table: any = {};
    for (const tile of y) {
        if (!table[tile])
            table[tile] = 0;
        table[tile]++;
    }
    for (const tile of x) {
        if (table[tile] === undefined)
            return false;
        table[tile]--;
        if (table[tile] < 0)
            return false;
    }
    return true;
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
 * 更新同巡和立直预振听, zimingpai 不会造成舍张振听, 所以只有同巡和立直,
 * 此外, 暗杠只有国士听牌才有可能导致其他玩家振听
 * @param seat - seat 号玩家
 * @param tile - 相关操作的牌
 * @param is_angang - 是否为暗杠, 默认否
 */
export const prejudgeZhenting = (seat: Seat, tile: Tile, is_angang: boolean = false): void => {
    if (!is_chuanma() && !is_guobiao() && !no_zhenting()) {
        // 同巡振听预判断
        for (let i: Seat = 0; i < base_info.player_cnt; i++) {
            if (i === seat)
                continue;
            const tingpais = calcTingpai(i as Seat);
            for (const tingpai of tingpais)
                if (isEqualTile(tile, tingpai.tile)) {
                    if (!is_angang) {
                        zhenting.tongxun[0][i] = true;
                        break;
                    } else {
                        const tiles = player_tiles[i];
                        tiles.push(tile);
                        if (calcHupai(tiles) === 3) {
                            zhenting.tongxun[0][i] = true;
                            tiles.pop();
                            break;
                        }
                        tiles.pop();
                    }
                }
        }
        // 立直振听预判断
        for (let i: Seat = 0; i < base_info.player_cnt; i++) {
            if (liqi_info[i].liqi === 0)
                continue;
            const tingpais = calcTingpai(i as Seat);
            for (const tingpai of tingpais)
                if (isEqualTile(tile, tingpai.tile)) {
                    if (!is_angang) {
                        zhenting.liqi[0][i] = true;
                        break;
                    } else {
                        const tiles = player_tiles[i];
                        tiles.push(tile);
                        if (calcHupai(tiles) === 3) {
                            zhenting.liqi[0][i] = true;
                            tiles.pop();
                            break;
                        }
                        tiles.pop();
                    }
                }
        }
    }
};

// 更新振听状态
export const updateZhenting = (): void => {
    for (let i = 0; i < base_info.player_cnt; i++)
        zhenting.result[i] = zhenting.shezhang[i] || zhenting.tongxun[1][i] || zhenting.liqi[1][i];
};

/**
 * 判断 tile 字符串是否合法
 * @param tile - 输入的牌
 * @param type - 是否允许'.HTYDMPS'等随机牌, 默认不允许
 */
export const isTile = (tile: string, type = false): tile is Tile => {
    if (tile.length < 2 || tile.length > 3 || (tile.length === 3 && tile[2] !== Constants.SPT_SUFFIX))
        return false;
    if (tile === Constants.TBD)
        return true;
    if (type) {
        const random_tiles = ['.', 'H', 'T', 'Y', 'D', 'M', 'P', 'S'];
        for (const t of random_tiles) {
            const tmp_random_tile = t.repeat(2);
            if (tile === tmp_random_tile)
                return true;
        }
    }
    const honor_numbers = ['1', '2', '3', '4', '5', '6', '7'];
    const ordinal_numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    if (tile[1] === 'z')
        return honor_numbers.includes(tile[0]);
    else if (['m', 'p', 's'].includes(tile[1]))
        return ordinal_numbers.includes(tile[0]);
    return false;
};

// 判断 seat 参数是否为合法的 seat
export const isValidSeat = (seat: number): seat is Seat => {
    return seat >= 0 && seat < base_info.player_cnt && Math.floor(seat) === seat;
};

// 判断 awaiting_index 参数是否为 AwaitingIndex 类型
export const isAwaitingIndex = (awaiting_index: number): awaiting_index is AwaitingIndex => {
    return awaiting_index === 0 || awaiting_index === 1 || awaiting_index === 2;
};

// 判断 beishui_type 参数是否为 BeishuiType 类型
export const isBeishuiType = (beishui_type: number): beishui_type is BeishuiType => {
    return beishui_type === 0 || beishui_type === 1 || beishui_type === 2;
};

// 开局计算所有玩家的听牌, 亲家去掉最后一张牌后再计算, 但仍然不会显示
export const getAllTingpai = (): { seat: number, tingpais1: { tile: string }[] }[] => {
    const tingpai: { seat: number, tingpais1: { tile: string }[] }[] = [];
    const lastile = player_tiles[base_info.ju].pop();
    for (let i: Seat = 0; i < base_info.player_cnt; i++) {
        const tingpais1 = calcTingpai(i as Seat);
        if (tingpais1.length > 0)
            tingpai.push({seat: i, tingpais1: tingpais1});
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

// 川麻, 判断 seat 玩家是否花猪
export const huazhu = (seat: Seat): boolean => {
    // 注意 gaps 的 012 分别对应 pms, 而不是 mps
    for (const tile of player_tiles[seat]) { // 查手牌
        if (tile[1] === 'm' && gaps[seat] === 1)
            return true;
        if (tile[1] === 'p' && gaps[seat] === 0)
            return true;
        if (tile[1] === 's' && gaps[seat] === 2)
            return true;
    }
    for (const f of fulu[seat]) { // 查副露
        const tile = f.tile[0];
        if (tile[1] === 'm' && gaps[seat] === 1)
            return true;
        if (tile[1] === 'p' && gaps[seat] === 0)
            return true;
        if (tile[1] === 's' && gaps[seat] === 2)
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
    for (const i in player_tiles[seat]) { // 查手牌
        if (!zimo && parseInt(i) === player_tiles[seat].length - 1) // 不是自摸, 则最后一张牌不考虑
            break;
        if (player_tiles[seat][i].length >= 2 && player_tiles[seat][i][2] === Constants.SPT_SUFFIX)
            sum++;
    }
    for (const f of fulu[seat]) // 查副露
        for (const j in f.tile) {
            if (f.type !== 3 && parseInt(j) === f.tile.length - 1) // 不是暗杠, 则最后一张牌不考虑
                break;
            if (f.tile[j].length > 2 && f.tile[j][2] === Constants.SPT_SUFFIX)
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
        return Constants.YIMAN_SUDIAN * val;

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

// 辅助函数, chang, ju, ben 转换为控制台输出的所在小局
export const errRoundInfo = (): string => {
    if (is_chuanma())
        return `第${all_data.all_actions.length + 1}局: `;
    const chang_word = [`东`, `南`, `西`, `北`];
    return `第${all_data.all_actions.length + 1}局(${chang_word[base_info.chang]}${base_info.ju + 1}局${base_info.ben}本场): `;
};
