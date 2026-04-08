/**
 * @file: baseUtils.ts - 一些基础的辅助函数
 * @author: Fat-pig-Cui
 * @email: chubbypig@qq.com
 * @github: https://github.com/Fat-pig-Cui/majsoul-replay-editor
 */

import {all_data, base_info, fulu, gaps, player_tiles} from "./data";
import {is_chuanma} from "./misc";
import {Constants} from "./constants";

/**
 * 将 tile 牌简化: 去掉最后的 SPT_SUFFIX, 并将红宝牌转换为普通牌
 */
export const simplify = (tile: Tile): SimpleTile => {
    if (tile[0] == '0')
        return '5' + tile[1] as SimpleTile;
    return tile[0] + tile[1] as SimpleTile;
};

/**
 * 返回和 tile 等效的所有牌, 优先把红宝牌和含有 SPT_SUFFIX 放到后面
 * @example
 * allEqualTiles('5m')
 * // return ['5m', '0m', '5mt', '0mt']
 */
export const allEqualTiles = (tile: Tile): Tile[] => {
    if (tile === Constants.TBD)
        return [Constants.TBD];
    tile = tile[0] + tile[1]; // 去掉可能存在的 SPT_SUFFIX
    if (tile[0] === '0' || tile[0] === '5' && tile[1] !== 'z')
        return ['5' + tile[1], '5' + tile[1] + Constants.SPT_SUFFIX, '0' + tile[1], '0' + tile[1] + Constants.SPT_SUFFIX] as Tile[];
    else
        return [tile, tile + Constants.SPT_SUFFIX] as Tile[];
};


/**
 * 解析牌, 会将简化后牌编码恢复成单个并列样子
 * @example
 * decompose('123m99p')
 * // return '1m2m3m9p9p'
 */
export const decompose = (tiles: string): string => {
    const x = tiles.replace(/\s*/g, '');
    const random_tiles = '.HTYDMPS'; // 随机牌
    const bd_tile_num = x.match(/b/g) ? x.match(/b/g).length : 0;
    const matches = x.match(/\d+[mpsz]t?|\.|H|T|Y|D|M|P|S/g);

    let ret = '';
    for (let i = 0; i < bd_tile_num; i++)
        ret += Constants.TBD; // 万象修罗百搭牌
    for (const match of matches) {
        if (match.length === 1 && random_tiles.includes(match)) {
            ret += match + match;
            continue;
        }
        const kind_index = match[match.length - 1] === Constants.SPT_SUFFIX ? match.length - 2 : match.length - 1;
        let tile_kind = match[kind_index];
        if (kind_index === match.length - 2)
            tile_kind += Constants.SPT_SUFFIX;
        for (let j = 0; j < kind_index; j++)
            ret += match[j] + tile_kind;
    }
    return ret;
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

// 判断第一个参数里面的所有牌是否为第二个参数里面的牌的子集, 考虑和赤宝牌和特殊牌
export const inTiles = (x: Tile | Tile[], y: Tile[]): boolean => {
    if (typeof x == 'string')
        x = [x];
    const cnt: TileNumAll = {};
    for (const tile of y) {
        if (cnt[tile] === undefined)
            cnt[tile] = 0;
        cnt[tile]++;
    }
    for (const tile of x) {
        if (cnt[tile] === undefined)
            return false;
        cnt[tile]--;
        if (cnt[tile] < 0)
            return false;
    }
    return true;
};

// 随机排序比较函数
export const randomCmp = () => Math.random() - 0.5;

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
    return [0, 1, 2].includes(awaiting_index);
};

// 判断 beishui_type 参数是否为 BeishuiType 类型
export const isBeishuiType = (beishui_type: number): beishui_type is BeishuiType => {
    return [0, 1, 2].includes(beishui_type);
};

// 辅助函数, chang, ju, ben 转换为控制台输出的所在小局
export const errRoundInfo = (): string => {
    if (is_chuanma())
        return `第${all_data.all_actions.length + 1}局: `;
    const chang_word = [`东`, `南`, `西`, `北`];
    return `第${all_data.all_actions.length + 1}局(${chang_word[base_info.chang]}${base_info.ju + 1}局${base_info.ben}本场): `;
};

// 川麻, 判断 seat 玩家是否花猪
export const isHuazhu = (seat: Seat): boolean => {
    // 注意 gaps 的 012 分别对应 pms, 而不是 mps
    if (is_chuanma()) {
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
    }
    return false;
};
