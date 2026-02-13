/**
 * @file: utils.ts - 一些辅助函数
 * @author: GrandDawn, Fat-pig-Cui
 * @email: chubbypig@qq.com
 * @github: https://github.com/Fat-pig-Cui/majsoul-replay-editor
 */

import {calcHupai, calcTingpai, getLstAction, isEqualTile, player_tiles} from "./core";
import {
    actions, ben, chang,
    dora_cnt,
    doras, fulu, gaps,
    huled, ju,
    liqi_info, lizhizt, mingpais, paihe,
    player_cnt,
    prelizhizt,
    pretongxunzt, scores,
    shezhangzt, shoumoqie, tongxunzt,
    xun, yongchang_data, zhenting
} from "./core";
import {
    is_chuanma,
    is_guobiao, is_heqie_mode, is_xiakeshang,
    no_dora,
    no_gangdora,
    no_ganglidora,
    no_lidora,
    no_zhenting
} from "./misc";
import {Constants} from "./constants";

// 玩家的巡目所对应的操作位置
export const calcXun = (): void => {
    for (let i = 0; i < player_cnt; i++)
        if (player_tiles[i].length % 3 === 2 && !huled[i])
            xun[i].push(actions.length - 1);
};

// 计算表指示牌
export const calcDoras = (): Doras => {
    if (dora_cnt.cnt > 5)
        dora_cnt.cnt = 5;
    if (dora_cnt.licnt > 5)
        dora_cnt.licnt = 5;
    if (no_ganglidora())
        dora_cnt.licnt = 1;
    if (no_gangdora())
        dora_cnt.cnt = dora_cnt.licnt = 1;
    if (no_lidora())
        dora_cnt.licnt = 0;
    if (is_chuanma() || is_guobiao() || no_dora())
        dora_cnt.cnt = dora_cnt.licnt = 0;
    let doras0: Doras = [];
    for (let i = 0; i < dora_cnt.cnt; i++)
        doras0[i] = doras[i];
    return doras0;
};

/**
 * tile 编码转换为数字编码
 * @param tile - 输入的牌
 * @param type - 是否区分红宝牌, 默认不区分
 * @param is_SP_tile - 是否区分以 Constants.SPT_SUFFIX 结尾的特殊牌, 默认不区分
 */
export const tile2Int = (tile: Tile, type: boolean = false, is_SP_tile: boolean = false): number => {
    if (tile === Constants.TBD) // 万象修罗百搭牌
        return 0;
    if (!is_SP_tile || tile.length <= 2) {
        if (type && tile[0] === '0') {
            if (tile[1] === 'm')
                return 35;
            if (tile[1] === 'p')
                return 36;
            if (tile[1] === 's')
                return 37;
        }
        if (tile[0] === '0')
            tile = '5' + tile[1];

        if (tile[1] === 'm')
            return parseInt(tile);
        if (tile[1] === 'p')
            return 9 + parseInt(tile);
        if (tile[1] === 's')
            return 18 + parseInt(tile);
        if (tile[1] === 'z')
            return 27 + parseInt(tile);
    } else if (tile[2] === Constants.SPT_SUFFIX) {
        if (type && tile[0] === '0') {
            if (tile[1] === 'm')
                return 35 + Constants.SPT_OFFSET;
            if (tile[1] === 'p')
                return 36 + Constants.SPT_OFFSET;
            if (tile[1] === 's')
                return 37 + Constants.SPT_OFFSET;
        }
        if (tile[0] === '0')
            tile = '5' + tile[1];

        if (tile[1] === 'm')
            return parseInt(tile) + Constants.SPT_OFFSET;
        if (tile[1] === 'p')
            return 9 + parseInt(tile) + Constants.SPT_OFFSET;
        if (tile[1] === 's')
            return 18 + parseInt(tile) + Constants.SPT_OFFSET;
        if (tile[1] === 'z')
            return 27 + parseInt(tile) + Constants.SPT_OFFSET;
    }
    throw new Error(roundInfo() + `tile2Int 输入不合规: ${tile}`);
};

/**
 * 数字编码转换为 tile 编码
 * @param x - 数字编码
 * @param type - 是否生成带 Constants.SPT_SUFFIX 结尾的特殊牌
 */
export const int2Tile = (x: number, type: boolean = false): Tile => {
    if (x === 0)
        return Constants.TBD;
    if (!type) {
        if (x >= 1 && x <= 9)
            return x.toString() + 'm' as Tile;
        if (x >= 10 && x <= 18)
            return (x - 9).toString() + 'p' as Tile;
        if (x >= 19 && x <= 27)
            return (x - 18).toString() + 's' as Tile;
        if (x >= 28 && x <= 34)
            return (x - 27).toString() + 'z' as Tile;
        if (x === 35)
            return '0m';
        if (x === 36)
            return '0p';
        if (x === 37)
            return '0s';
    } else {
        if (x >= 1 && x <= 9)
            return x.toString() + 'm' + Constants.SPT_SUFFIX as Tile;
        if (x >= 10 && x <= 18)
            return (x - 9).toString() + 'p' + Constants.SPT_SUFFIX as Tile;
        if (x >= 19 && x <= 27)
            return (x - 18).toString() + 's' + Constants.SPT_SUFFIX as Tile;
        if (x >= 28 && x <= 34)
            return (x - 27).toString() + 'z' + Constants.SPT_SUFFIX as Tile;
        if (x === 35)
            return '0m' + Constants.SPT_SUFFIX as Tile;
        if (x === 36)
            return '0p' + Constants.SPT_SUFFIX as Tile;
        if (x === 37)
            return '0s' + Constants.SPT_SUFFIX as Tile;
    }
    throw new Error(roundInfo() + `int2Tile 输入不合规: ${x}`);
};

// 手牌理牌算法
export const cmp = (x: Tile, y: Tile): number => tile2Int(x) - tile2Int(y);

// 随机排序比较函数
export const randomCmp = () => Math.random() - 0.5;

// 判断第一个参数里面的所有牌是否为第二个参数里面的牌的子集, 考虑和赤宝牌和特殊牌
export const inTiles = (x: Tile | Tile[], y: Tile[]): boolean => {
    if (typeof x == 'string')
        x = [x];
    let cnt: number[] = [], cnt2: number[] = [];
    for (let i = Constants.TILE_NUM.C1m; i <= Constants.TILE_NUM.C0s + Constants.SPT_OFFSET; i++)
        cnt[i] = cnt2[i] = 0;
    for (let i in x)
        cnt[tile2Int(x[i], true, true)]++;
    for (let i in y)
        cnt2[tile2Int(y[i], true, true)]++;
    for (let i = Constants.TILE_NUM.C1m; i <= Constants.TILE_NUM.C0s + Constants.SPT_OFFSET; i++)
        if (cnt[i] > cnt2[i])
            return false;
    return true;
};

// 更新 seat 号玩家的舍张振听状态
export const updateShezhangzt = (seat: Seat): void => {
    if (!is_chuanma() && !is_guobiao() && !no_zhenting()) {
        shezhangzt[seat] = false;
        let tingpais = calcTingpai(seat);
        for (let i in tingpais)
            for (let j in paihe[seat].tiles)
                if (isEqualTile(tingpais[i].tile, paihe[seat].tiles[j]))
                    shezhangzt[seat] = true;
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
export const updatePrezhenting = (seat: Seat, tile: Tile, is_angang: boolean = false): void => {
    if (!is_chuanma() && !is_guobiao() && !no_zhenting()) {
        // 同巡振听预判断
        for (let i: Seat = 0; i < player_cnt; i++) {
            if (i === seat)
                continue;
            let tingpais_i = calcTingpai(i as Seat);
            for (let j in tingpais_i)
                if (isEqualTile(tile, tingpais_i[j].tile)) {
                    if (!is_angang) {
                        pretongxunzt[i] = true;
                        break;
                    } else {
                        let tiles = player_tiles[i];
                        tiles.push(tile);
                        if (calcHupai(tiles) === 3) {
                            pretongxunzt[i] = true;
                            tiles.pop();
                            break;
                        }
                        tiles.pop();
                    }
                }
        }
        // 立直振听预判断
        for (let i: Seat = 0; i < player_cnt; i++) {
            if (liqi_info[i].liqi === 0)
                continue;
            let tingpais_i = calcTingpai(i as Seat);
            for (let j in tingpais_i)
                if (isEqualTile(tile, tingpais_i[j].tile)) {
                    if (!is_angang) {
                        prelizhizt[i] = true;
                        break;
                    } else {
                        let tiles = player_tiles[i];
                        tiles.push(tile);
                        if (calcHupai(tiles) === 3) {
                            prelizhizt[i] = true;
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
    for (let i = 0; i < player_cnt; i++)
        zhenting[i] = shezhangzt[i] || tongxunzt[i] || lizhizt[i];
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
        let random_tiles = ['.', 'H', 'T', 'Y', 'D', 'M', 'P', 'S'];
        for (let i in random_tiles) {
            let tmp_random_tile = random_tiles[i].repeat(2);
            if (tile === tmp_random_tile)
                return true;
        }
    }
    let honor_numbers = ['1', '2', '3', '4', '5', '6', '7'];
    let ordinal_numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    if (tile[1] === 'z')
        return honor_numbers.includes(tile[0]);
    else if (['m', 'p', 's'].includes(tile[1]))
        return ordinal_numbers.includes(tile[0]);
    return false;
};

// 判断 seat 参数是否为合法的 seat
export const isValidSeat = (seat: number): seat is Seat => {
    return seat >= 0 && seat < player_cnt && Math.floor(seat) === seat;
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
    let tingpai: { seat: number, tingpais1: { tile: string }[] }[] = [];
    let lastile = player_tiles[ju].pop();
    if (!is_heqie_mode())
        for (let i: Seat = 0; i < player_cnt; i++) {
            let tingpais1 = calcTingpai(i as Seat);
            if (tingpais1.length > 0)
                tingpai.push({seat: i, tingpais1: tingpais1});
        }
    player_tiles[ju].push(lastile);
    return tingpai;
};

// 通过最近其他玩家的操作把对应的牌 push 到要和牌的玩家的手牌中
export const push2PlayerTiles = (seat: Seat): void => {
    let lst_action = getLstAction(), lst_name = getLstAction().name;
    if (lst_name === 'RecordDiscardTile' || lst_name === 'RecordRevealTile' || lst_name === 'RecordLockTile')
        player_tiles[seat].push(lst_action.data.tile);
    else if (lst_name === 'RecordBaBei')
        player_tiles[seat].push(lst_action.data.tile);
    else if (lst_name === 'RecordAnGangAddGang')
        player_tiles[seat].push(lst_action.data.tiles);
};

// 将 seat 号玩家的副露信息 fulu 赋值给 ming
export const fulu2Ming = (seat: Seat): string[] => {
    let ming: string[] = [];
    for (let i in fulu[seat]) {
        let tiles = fulu[seat][i].tile;
        if (fulu[seat][i].type === 0)
            ming.push(`shunzi(${tiles[0]},${tiles[1]},${tiles[2]})`);
        else if (fulu[seat][i].type === 1)
            ming.push(`kezi(${tiles[0]},${tiles[1]},${tiles[2]})`);
        else if (fulu[seat][i].type === 2)
            ming.push(`minggang(${tiles[0]},${tiles[1]},${tiles[2]},${tiles[3]})`);
        else if (fulu[seat][i].type === 3)
            ming.push(`angang(${tiles[0]},${tiles[1]},${tiles[2]},${tiles[3]})`);
    }
    return ming;
};

/**
 * 配牌明牌, 如果有明的牌则去掉, 返回 true, 没有则返回 false
 * @param seat - seat 号玩家
 * @param tile - 牌的种类
 */
export const eraseMingpai = (seat: Seat, tile: Tile): boolean => {
    if (mingpais[seat][tile2Int(tile, true)] > 0) {
        mingpais[seat][tile2Int(tile, true)]--;
        return true;
    }
    return false;
};

// 川麻, 判断 seat 玩家是否花猪
export const huazhu = (seat: Seat): boolean => {
    // 注意 gaps 的 012 分别对应 pms, 而不是 mps
    for (let i in player_tiles[seat]) { // 查手牌
        if (Math.floor((tile2Int(player_tiles[seat][i]) - 1) / 9) === 0 && gaps[seat] === 1)
            return true;
        if (Math.floor((tile2Int(player_tiles[seat][i]) - 1) / 9) === 1 && gaps[seat] === 0)
            return true;
        if (Math.floor((tile2Int(player_tiles[seat][i]) - 1) / 9) === 2 && gaps[seat] === 2)
            return true;
    }
    for (let i in fulu[seat]) { // 查副露
        if (Math.floor((tile2Int(fulu[seat][i].tile[0]) - 1) / 9) === 0 && gaps[seat] === 1)
            return true;
        if (Math.floor((tile2Int(fulu[seat][i].tile[0]) - 1) / 9) === 1 && gaps[seat] === 0)
            return true;
        if (Math.floor((tile2Int(fulu[seat][i].tile[0]) - 1) / 9) === 2 && gaps[seat] === 2)
            return true;
    }
    return false;
};

// 幻境传说, 判断 tile 是否为 dora
export const isDora = (tile: Tile): boolean => {
    if (tile2Int(tile, true) >= Constants.TILE_NUM.C0m && tile2Int(tile, true) <= Constants.TILE_NUM.C0s)
        return true;
    let doras0 = calcDoras();
    for (let i in doras0)
        if (tile2Int(tile) === Constants.DORA_NXT[tile2Int(doras0[i])])
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
    for (let i in player_tiles[seat]) { // 查手牌
        if (!zimo && parseInt(i) === player_tiles[seat].length - 1) // 不是自摸, 则最后一张牌不考虑
            break;
        if (player_tiles[seat][i].length >= 2 && player_tiles[seat][i][2] === Constants.SPT_SUFFIX)
            sum++;
    }
    for (let i in fulu[seat]) // 查副露
        for (let j in fulu[seat][i].tile) {
            if (fulu[seat][i].type !== 3 && parseInt(j) === fulu[seat][i].tile.length - 1) // 不是暗杠, 则最后一张牌不考虑
                break;
            if (fulu[seat][i].tile[j].length > 2 && fulu[seat][i].tile[j][2] === Constants.SPT_SUFFIX)
                sum++;
        }
    return sum;
};

// 咏唱之战, 更新 seat 号玩家手摸切信息
export const updateShoumoqie = (seat: Seat): void => {
    for (let k = 0; k < 2; k++) { // k 为 0 表示摸切, 为 1 表示手切
        let flag = !!k, len = 0;
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
export const calcXiaKeShang = (): [number, number, number, number] => {
    let times: [number, number, number, number] = [1, 1, 1, 1];
    for (let i = 0; i < player_cnt; i++)
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

// 辅助函数, chang, ju, ben 转换为控制台输出的所在小局
export const roundInfo = (): string => {
    let chang_word = [`东`, `南`, `西`, `北`];
    return `${chang_word[chang]}${ju + 1}局${ben}本场: `;
};