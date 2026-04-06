/**
 * @file: exportedUtils.ts - 一些要 export 的辅助函数
 * @author: Fat-pig-Cui
 * @email: chubbypig@qq.com
 * @github: https://github.com/Fat-pig-Cui/majsoul-replay-editor
 */

import {all_data, awaiting_tiles, base_info, paishan, player_tiles} from "./data";
import {is_chuanma, is_guobiao, is_wanxiangxiuluo, is_yifanjieguyi, is_zhanxing} from "./misc";
import {errRoundInfo, simplify, huazhu, isTile, decompose} from "./utils";
import {Constants} from "./constants";

/**
 * 获取当前位置还剩余多少牌
 */
export const getLeftTileCnt = (): number => {
    let left_cnt = paishan.length - 14;
    if (base_info.player_cnt === 2)
        left_cnt = paishan.length - 18;
    else if (is_chuanma() || is_guobiao())
        left_cnt = paishan.length;
    if (is_zhanxing())
        left_cnt += awaiting_tiles.length;
    return left_cnt;
};

/**
 * 判断 tile 牌是否满足 type 规则
 * @example
 * judgeTile('1m', 'M')
 * // return true
 * @param tile - 要验的牌
 * @param type - 规则:
 * - 'H': 字牌
 * - 'T': 老头牌
 * - 'Y': 幺九牌
 * - 'D': 中张牌
 * - 'M': 万子
 * - 'P': 饼子
 * - 'S': 索子
 * - 'L': 组成绿一色的牌
 * - 'jiangdui': 川麻: 组成将对的牌
 * - 'quanshuang': 国标: 组成全双刻的牌
 * - 'quanda': 国标: 组成全大的牌
 * - 'quanzhong': 国标: 组成全中的牌
 * - 'quanxiao': 国标: 组成全小的牌
 * - 'dayuwu': 国标: 组成大于五的牌
 * - 'xiaoyuwu': 国标: 组成小于五的牌
 * - 'tuibudao': 国标: 组成推不倒的牌
 * - 'hongkongque': 一番街古役: 组成红孔雀的牌
 * - 'hongyidian': 一番街古役: 组成红一点的牌
 * - 'heiyise': 一番街古役: 组成黑一色的牌
 */
export const judgeTile = (tile: Tile, type: string): boolean => {
    if (typeof tile != 'string' || tile.length === 1)
        throw new Error(errRoundInfo() + `judgeTile: tile 格式不合规: ${tile}`);
    if (tile === Constants.TBD)
        return true;
    tile = simplify(tile);
    switch (type) {
        case 'Y':
            return tile[0] === '1' || tile[0] === '9' || tile[1] === 'z';
        case 'D':
            return !(tile[0] === '1' || tile[0] === '9' || tile[1] === 'z');
        case 'T':
            return tile[0] === '1' && tile[1] !== 'z' || tile[0] === '9';
        case 'H':
            return tile[1] === 'z';
        case 'M':
            return tile[1] === 'm';
        case 'P':
            return tile[1] === 'p';
        case 'S':
            return tile[1] === 's';
        case 'L':
            return separate('23468s6z').includes(tile);
        case 'jiangdui':
            return tile[1] !== 'z' && (tile[0] === '2' || tile[0] === '5' || tile[0] === '8');
        case 'quanshuang':
            return tile[1] !== 'z' && ['2', '4', '6', '8'].includes(tile[0]);
        case 'quanda':
            return tile[1] !== 'z' && ['7', '8', '9'].includes(tile[0]);
        case 'quanzhong':
            return tile[1] !== 'z' && ['4', '5', '6'].includes(tile[0]);
        case 'quanxiao':
            return tile[1] !== 'z' && ['1', '2', '3'].includes(tile[0]);
        case 'dayuwu':
            return tile[1] !== 'z' && ['6', '7', '8', '9'].includes(tile[0]);
        case 'xiaoyuwu':
            return tile[1] !== 'z' && ['1', '2', '3', '4'].includes(tile[0]);
        case 'tuibudao':
            return separate('1234589p245689s5z').includes(tile);
        case 'hongkongque':
            return separate('1579s7z').includes(tile);
        case 'hongyidian':
            return separate('23468s7z').includes(tile);
        case 'heiyise':
            return separate('248p1234z').includes(tile);
        default:
            throw new Error(errRoundInfo() + `judgeTile: type 格式不合规: ${type}`);
    }
};

/**
 * 判断两个牌是否等效
 */
export const isEqualTile = (x: Tile, y: Tile): boolean => simplify(x) === simplify(y);

/**
 * 拆分牌为数组（统一实现）。
 *
 * - mode = 'strict': 等价于 separate（不允许摸切/随机牌 token）
 * - mode = 'extended': 等价于 separateWithMoqie / separateWithParam（允许摸切/随机牌 token）
 */
type SeparateMode = 'strict' | 'extended';
const separateUnified = (
    tiles: string | (Tile | TileWithMoqie | TileWithParam)[],
    mode: SeparateMode = 'strict'
): (Tile | TileWithMoqie | TileWithParam)[] => {
    if (!tiles)
        return [];
    if (tiles instanceof Array)
        return tiles;

    let s = decompose(tiles);
    const ret: (Tile | TileWithMoqie | TileWithParam)[] = [];
    const extended = mode === 'extended';

    while (s.length > 0) {
        const tmp_tile = s.substring(0, 2);
        if (!isTile(tmp_tile, extended)) {
            // 维持旧行为：只报错不抛异常
            console.error(errRoundInfo() + `separate: 牌格式不合规: ${tmp_tile}`);
        }
        if (s.length > 2 && s[2] === Constants.SPT_SUFFIX) { // 特殊牌
            ret.push(s.substring(0, 3) as Tile);
            s = s.substring(3);
        } else {
            ret.push(s.substring(0, 2) as Tile);
            s = s.substring(2);
        }
    }
    return ret;
};

/**
 * 拆分牌为数组, 与 decompose 类似, 不过返回的是数组
 * @example
 * separate('123m99p')
 * // return ['1m', '2m', '3m', '9p', '9p']
 */
export const separate = (tiles: string | Tile[]): Tile[] => {
    return separateUnified(tiles, 'strict') as Tile[];
};

/**
 * 拆分牌为数组, 比 separate 更进一步, 加入了摸切
 * @example
 * separateWithMoqie('123m.9p')
 * // return ['1m', '2m', '3m', '..', '9p']
 */
export const separateWithMoqie = (tiles: string | TileWithMoqie[]): TileWithMoqie[] => {
    return separateUnified(tiles, 'extended') as TileWithMoqie[];
};

/**
 * 拆分牌为数组, 比 separateWithMoqie 更进一步, 可以拆分随机牌
 * @example
 * separateWithParam('123mY9p')
 * // return ['1m', '2m', '3m', 'YY', '9p']
 */
export const separateWithParam = (tiles: string | TileWithParam[]): TileWithParam[] => {
    return separateUnified(tiles, 'extended') as TileWithParam[];
};

/**
 * 计算手牌为 tiles 时的和牌型
 * @example
 * calcHupai('11122233344455z')
 * // return 1
 * calcHupai('19m19p19s11234567z')
 * // return 3
 * calcHupai('19m19p19s1234567z')
 * // return 0, 因为牌少一张, 处于待牌状态, 不是和牌型
 * @param tiles - 手牌
 * @param type - 是否可能没有百搭牌, 默认为可能有百搭牌
 * @returns
 * - 0: 不是和牌型
 * - 1: 一般型和牌
 * - 2: 七对子和牌
 * - 3: 国士型和牌
 * - 4: 国标中全不靠和牌(不含组合龙)
 * - 5: 国标中全不靠和牌(含有组合龙)
 * - 6-11: 国标中不含全不靠的组合龙和牌
 * - 12: 一番街古役: 十三不搭
 */
export const calcHupai = (tiles: Tile[], type: boolean = false): number => {
    const cnt: TileNum = {}, tmp: TileNum = {};
    for (const tile of Constants.TILE_NO_AKA)
        cnt[tile] = tmp[tile] = 0;
    cnt[Constants.TBD] = 0;
    for (const tile of tiles)
        cnt[simplify(tile)]++;

    if (is_guobiao() && tiles.includes(Constants.HUAPAI))  // 国标无法听花牌, 有花牌一定不是和牌型
        return 0;

    if (is_wanxiangxiuluo() && cnt[Constants.TBD] === 1 && !type) {
        const tmp_tiles: Tile[] = [];
        for (const tile of tiles)
            if (tile !== Constants.TBD)
                tmp_tiles.push(tile);
        for (const tile of Constants.TILE_NO_AKA) { // 百搭牌试所有牌
            tmp_tiles.push(tile);
            const result = calcHupai(tmp_tiles, true);
            if (result !== 0) // 存在百搭牌使得成为和牌型, 则返回
                return result;
            tmp_tiles.pop();
        }
        return 0;
    }
    const group = Constants.GROUP;
    for (const tile of Constants.TILE_NO_AKA) {
        if (cnt[tile] >= 2) { // 假设雀头, 则剩下的只有4个面子
            cnt[tile] -= 2;
            let ok = true; // 先假设能和, 再依条件否定
            for (const tl of Constants.TILE_NO_AKA)
                tmp[tl] = cnt[tl];
            tmp['0m'] = tmp['0p'] = tmp['0s'] = 0;

            for (let k = 0; k < 3; k++) {
                for (let j = 1 + group[k]; j !== '0s'; j = Constants.NXT2[j]) {
                    if (tmp[j] < 0) { // 若牌数量减为了负数, 说明有有未成形的顺子
                        ok = false;
                        break;
                    }
                    tmp[j] %= 3; // 去掉暗刻, 如果 tmp[j] 仍然不为0的话, 则要构成和牌型一定构成顺子
                    // j, Constants.NXT2[j], Constants.NXT2[NXT2[j]] 构成顺子, 三个一组减去
                    tmp[Constants.NXT2[j]] -= tmp[j];
                    tmp[Constants.NXT2[Constants.NXT2[j]]] -= tmp[j];
                }
                tmp['0m'] = tmp['0p'] = tmp['0s'] = 0;
            }
            // 若字牌不能构成暗刻
            for (const tile of Constants.HONOR_TILE)
                if (tmp[tile] % 3 !== 0)
                    ok = false;

            if (ok)
                return 1;

            cnt[tile] += 2;
        }
    }

    // 七对子
    let duizi = 0;
    for (const tile of Constants.TILE_NO_AKA) {
        if (cnt[tile] === 2)
            duizi++;
        // 本来只要判断 cnt[i] === 4 就行, 这里扩展成作弊大于四张牌的情况
        if (cnt[tile] >= 4 && cnt[tile] % 2 === 0 && (is_chuanma() || is_guobiao()))
            duizi += cnt[tile] / 2;
    }
    if (duizi === 7)
        return 2;

    // 国士无双
    let guoshi = true;
    for (const tile of Constants.TILE_NO_AKA) {
        if (Constants.YAOJIU_TILE.includes(tile)) {
            if (cnt[tile] === 0) // 所有幺九牌都至少有一张
                guoshi = false;
        } else if (cnt[tile] > 0) // 存在非幺九牌
            guoshi = false;
    }
    if (guoshi)
        return 3;

    if (is_guobiao() && tiles.length === Constants.QIN_TILE_NUM) { // 国标的全不靠和七星不靠
        let quanbukao = true;
        for (const tile of Constants.TILE_NO_AKA)
            if (cnt[tile] >= 2)
                quanbukao = false;
        // 3*3 的数组, 每一行代表一个花色, 三行分别对应 m, p, s 色, 每一行的三个元素分别代表是否有147, 258, 369中的牌
        const jin_huase = [
            [false, false, false],
            [false, false, false],
            [false, false, false],
        ];
        for (let j = 0; j < 3; j++)
            for (let i = 0; i <= 8; i++)
                if (cnt[i + 1 + group[j]] === 1)
                    jin_huase[j][i % 3] = true;

        // jin_huase 的每一行, 每一列都最多只有一个 true
        for (let i = 0; i < 3; i++) {
            let true_cnt_row = 0, true_cnt_col = 0;
            for (let j = 0; j < 3; j++) {
                if (jin_huase[i][j]) // 扫描每一行
                    true_cnt_row++;
                if (jin_huase[j][i]) // 扫描每一列
                    true_cnt_col++;
            }
            if (true_cnt_row >= 2 || true_cnt_col >= 2)
                quanbukao = false;
        }
        if (quanbukao) {
            let zuhelong = true; // 是否复合组合龙
            for (let j = 0; j < 3; j++)
                for (let i = 0; i < 3; i++)
                    if (jin_huase[j][i])
                        if (!(cnt[i + 1 + group[j]] === 1 && cnt[i + 4 + group[j]] === 1 && cnt[i + 7 + group[j]] === 1))
                            zuhelong = false;
            return !zuhelong ? 4 : 5;
        }
    }
    if (is_guobiao() && tiles.length >= 11) { // 国标不含全不靠的组合龙
        const conditions = Constants.GB_CONDITIONS;
        const flags = [true, true, true, true, true, true];

        for (const [row, condition] of conditions.entries())
            for (const tile of condition)
                if (cnt[tile] === 0)
                    flags[row] = false;

        for (const [row, condition] of conditions.entries()) {
            if (flags[row]) {
                const new_tiles = tiles.slice();
                for (const tile of condition)
                    new_tiles.splice(new_tiles.indexOf(tile), 1);
                if (calcHupai(new_tiles) === 1)
                    return 6 + row;
            }
        }
    }
    if (is_yifanjieguyi() && tiles.length === 14) {
        let shisanbuda = true;
        let duizi_num = 0;
        for (const tile of Constants.TILE_NO_AKA) {
            if (cnt[tile] === 2)
                duizi_num++;
            if (cnt[tile] >= 3)
                shisanbuda = false;
        }
        if (duizi_num !== 1)
            shisanbuda = false;

        for (let j = 0; j < 3; j++)
            for (let i = 1; i <= 8; i++)
                if (cnt[i + group[j]] >= 1)
                    if (cnt[i + 1 + group[j]] !== 0 || (i + 2 <= 9 && cnt[i + 2 + group[j]] !== 0))
                        shisanbuda = false;
        if (shisanbuda)
            return 12;
    }
    return 0;
};

/**
 * 计算 seat 号玩家的所有听牌
 * @example
 * // 当 player_tiles[0] 为 separate('1122335577889m')
 * calcTingpai(0)
 * // return [{tile: '6m'}, {tile: '9m'}]
 * @param seat - seat 号玩家
 * @param type - 是否考虑听第5张(无虚听), 默认不考虑
 */
export const calcTingpai = (seat: Seat, type: boolean = false): { tile: Tile }[] => {
    if (is_chuanma() && huazhu(seat))
        return [];
    const tiles = player_tiles[seat];
    const cnt: TileNum = {};
    for (const tile of Constants.TILE_NO_AKA)
        cnt[tile] = 0;
    for (const tile of tiles)
        cnt[simplify(tile)]++;

    if (is_guobiao() && tiles.includes(Constants.HUAPAI)) // 国标无法听花牌, 有花牌一定不是听牌型
        return [];
    if (tiles.length % 3 !== 1) // 牌数量不对
        return [];

    const ret: { tile: Tile }[] = [];
    for (const tile of Constants.TILE_NO_AKA) { // 试所有牌作为听牌, 检查是否为和牌型
        tiles.push(tile);
        cnt[tile]++;
        // cnt[i] <= 4 为了除去虚听
        const result = calcHupai(tiles);
        if ((cnt[tile] <= 4 || type) && result !== 0 && result !== 12)
            ret.push({tile: tile});

        tiles.pop();
        cnt[tile]--;
    }
    return ret;
};

/**
 * 获取最近操作信息, 忽略 RecordChangeTile, RecordSelectGap, RecordGangResult, RecordFillAwaitingTiles 这几个操作
 * @param num - 倒数第 num 个操作, 默认为1
 */
export const getLstAction = (num: number = 1): Action => {
    if (all_data.cur_actions.length > 0) {
        let ret = all_data.cur_actions.length;
        for (let i = 0; i < num && ret >= 0; i++) {
            ret--;
            while (ret >= 0 && ['RecordChangeTile', 'RecordSelectGap', 'RecordGangResult', 'RecordFillAwaitingTiles'].includes(all_data.cur_actions[ret].name))
                ret--;
        }
        return all_data.cur_actions[ret];
    } else
        throw new Error(errRoundInfo() + 'actions 为空');
};
