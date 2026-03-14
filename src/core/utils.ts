/**
 * @file: utils.ts - 一些辅助函数
 * @author: GrandDawn, Fat-pig-Cui
 * @email: chubbypig@qq.com
 * @github: https://github.com/Fat-pig-Cui/majsoul-replay-editor
 */

import {
    actions, dora_cnt,
    doras, fulu, gaps, huled,
    liqi_info, lizhizt, mingpais, paihe,
    player_cnt, prelizhizt, pretongxunzt, scores,
    shezhangzt, shoumoqie, tongxunzt,
    xun, yongchang_data, zhenting,
    awaiting_tiles, muyu_info, muyu, paishan,
    player_tiles, all_data, base_info, lst_liqi
} from "./core";
import {
    get_fanfu, get_field_spell_mode,
    is_chuanma, is_fufenliqi,
    is_guobiao,
    is_qieshang,
    is_qingtianjing,
    is_wanxiangxiuluo,
    is_xiakeshang,
    is_yifanjieguyi, is_zhanxing,
    no_dora,
    no_gangdora,
    no_ganglidora,
    no_leijiyiman,
    no_lidora,
    no_zhenting,
    scale_points
} from "./misc";
import {Constants} from "./constants";

/**
 * 获取当前位置还剩余多少牌
 */
export const getLeftTileCnt = (): number => {
    let left_cnt = paishan.length - 14;
    if (player_cnt === 2)
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
 * // return true
 * judgeTile('1m', 'M')
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
            return tile[1] !== 'z' && parseInt(tile) % 2 === 0;
        case 'quanda':
            return tile[1] !== 'z' && parseInt(tile) >= 7;
        case 'quanzhong':
            return tile[1] !== 'z' && parseInt(tile) >= 4 && parseInt(tile) <= 6;
        case 'quanxiao':
            return tile[1] !== 'z' && parseInt(tile) <= 3;
        case 'dayuwu':
            return tile[1] !== 'z' && parseInt(tile) >= 6;
        case 'xiaoyuwu':
            return tile[1] !== 'z' && parseInt(tile) <= 4;
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
 * 返回和 tile 等效的所有牌, 优先把红宝牌和含有 SPT_SUFFIX 放到后面
 * @example
 * // return ['5m', '0m', '5mt', '0mt']
 * allEqualTiles('5m')
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
 * 判断两个牌是否等效
 */
export const isEqualTile = (x: Tile, y: Tile): boolean => allEqualTiles(x).includes(y);

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
    for (let tile of tiles) {
        tile = simplify(tile);
        nums.push(parseInt(tile[0]));
    }
    nums.sort((a, b) => a - b);
    return nums[1] + tiles[0][1] as Tile;
};

/**
 * 解析牌, 会将简化后牌编码恢复成单个并列样子
 * @example
 * // return '1m2m3m9p9p'
 * decompose('123m99p')
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

/**
 * 拆分牌为数组（统一实现）。
 *
 * - mode = 'strict': 等价于 separate（不允许摸切/随机牌 token）
 * - mode = 'extended': 等价于 separateWithMoqie / separateWithParam（允许摸切/随机牌 token）
 */
type SeparateMode = 'strict' | 'extended';

function separateUnified(tiles: string | Tile[], mode?: 'strict'): Tile[];
function separateUnified(tiles: string | TileWithMoqie[], mode: 'extended'): TileWithMoqie[];
function separateUnified(tiles: string | TileWithParam[], mode: 'extended'): TileWithParam[];
function separateUnified(
    tiles: string | (Tile | TileWithMoqie | TileWithParam)[],
    mode: SeparateMode = 'strict'
): (Tile | TileWithMoqie | TileWithParam)[] {
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
}

/**
 * 拆分牌为数组, 与 decompose 类似, 不过返回的是数组
 * @example
 * // return ['1m', '2m', '3m', '9p', '9p']
 * separate('123m99p')
 */
export const separate = (tiles: string | Tile[]): Tile[] => {
    return separateUnified(tiles, 'strict');
};

/**
 * 拆分牌为数组, 比 separate 更进一步, 加入了摸切
 * @example
 * // return ['1m', '2m', '3m', '..', '9p']
 * separateWithMoqie('123m.9p')
 */
export const separateWithMoqie = (tiles: string | TileWithMoqie[]): TileWithMoqie[] => {
    return separateUnified(tiles, 'extended') as TileWithMoqie[];
};

/**
 * 拆分牌为数组, 比 separateWithMoqie 更进一步, 可以拆分随机牌
 * @example
 * // return ['1m', '2m', '3m', 'YY', '9p']
 * separateWithParam('123mY9p')
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
        const condition = Constants.GB_CONDITIONS;
        const flag = [true, true, true, true, true, true];

        for (let row in condition)
            for (let i in condition[row])
                if (cnt[condition[row][i]] === 0)
                    flag[row] = false;

        for (let row in condition) {
            if (flag[row]) {
                const new_tiles = tiles.slice();
                for (let i in condition[row])
                    for (let j in new_tiles)
                        if (new_tiles[j] === condition[row][i]) {
                            new_tiles.splice(parseInt(j), 1);
                            break;
                        }
                if (calcHupai(new_tiles) === 1)
                    return 6 + parseInt(row);
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
    if (actions.length > 0) {
        let ret = actions.length;
        for (let i = 0; i < num; i++) {
            ret--;
            while (ret >= 0 && ['RecordChangeTile', 'RecordSelectGap', 'RecordGangResult', 'RecordFillAwaitingTiles'].includes(actions[ret].name))
                ret--;
        }
        return actions[ret];
    } else
        throw new Error(errRoundInfo() + 'actions 为空');
};

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
        doras0[i] = doras[i];
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
export const updateShezhangzt = (seat: Seat): void => {
    if (!is_chuanma() && !is_guobiao() && !no_zhenting()) {
        shezhangzt[seat] = false;
        const tingpais = calcTingpai(seat);
        for (const tingpai of tingpais)
            for (const tile of paihe[seat].tiles)
                if (isEqualTile(tingpai.tile, tile))
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
            const tingpais = calcTingpai(i as Seat);
            for (const tingpai of tingpais)
                if (isEqualTile(tile, tingpai.tile)) {
                    if (!is_angang) {
                        pretongxunzt[i] = true;
                        break;
                    } else {
                        const tiles = player_tiles[i];
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
            const tingpais = calcTingpai(i as Seat);
            for (const tingpai of tingpais)
                if (isEqualTile(tile, tingpai.tile)) {
                    if (!is_angang) {
                        prelizhizt[i] = true;
                        break;
                    } else {
                        const tiles = player_tiles[i];
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
    const tingpai: { seat: number, tingpais1: { tile: string }[] }[] = [];
    const lastile = player_tiles[base_info.ju].pop();
    for (let i: Seat = 0; i < player_cnt; i++) {
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
        let tiles = f.tile;
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
    if (lst_liqi != null) {
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
            muyu_info.seat = Math.floor(Math.random() * player_cnt) as Seat;
        for (let i = 0; i < player_cnt; i++)
            muyu.times[i] = 1;
        muyu.times[muyu_info.seat]++;
    } else
        muyu_info.count--;
};

// 幻境传说, 判断 tile 是否为 dora
export const isDora = (tile: Tile): boolean => {
    tile = simplify(tile);
    if (tile === '0m' || tile === '0p' || tile === '0s')
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
    for (let i in player_tiles[seat]) { // 查手牌
        if (!zimo && parseInt(i) === player_tiles[seat].length - 1) // 不是自摸, 则最后一张牌不考虑
            break;
        if (player_tiles[seat][i].length >= 2 && player_tiles[seat][i][2] === Constants.SPT_SUFFIX)
            sum++;
    }
    for (const f of fulu[seat]) // 查副露
        for (let j in f.tile) {
            if (f.type !== 3 && parseInt(j) === f.tile.length - 1) // 不是暗杠, 则最后一张牌不考虑
                break;
            if (f.tile[j].length > 2 && f.tile[j][2] === Constants.SPT_SUFFIX)
                sum++;
        }
    return sum;
};

// 咏唱之战, 更新 seat 号玩家手摸切信息
export const updateShoumoqie = (seat: Seat): void => {
    for (let k = 0; k < 2; k++) { // k 为 0 表示摸切, 为 1 表示手切
        const flag = !!k;
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
export const calcXiaKeShang = (): [number, number, number, number] => {
    const times: [number, number, number, number] = [1, 1, 1, 1];
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

/**
 * calcSudian 组 - 立直
 *
 * 根据算得的番计算素点
 * @param x - 和牌信息
 * @param type - 有效值0和1, 0是一般模式, 1表示比较模式, 默认为一般模式
 */
export const calcSudian = (x: CalcFanRet, type: number = 0): number => {
    const fanfu = get_fanfu();
    let val = 0;
    for (const fan of x.fans)
        val += fan.val;
    if (is_qingtianjing())
        return x.fu * Math.pow(2, val + 2);

    if (x.yiman)
        return 8000 * val;

    else if (val < fanfu)
        return -2000;
    else if (val >= 13 && !no_leijiyiman())
        return 8000 + type * (val + x.fu * 0.01);
    else if (val >= 11)
        return 6000 + type * (val + x.fu * 0.01);
    else if (val >= 8)
        return 4000 + type * (val + x.fu * 0.01);
    else if (val >= 6)
        return 3000 + type * (val + x.fu * 0.01);
    else if (val >= 5)
        return 2000 + type * (val + x.fu * 0.01);
    else if (is_qieshang() && (val === 4 && x.fu === 30 || val === 3 && x.fu === 60))
        return 2000 + type * (val + x.fu * 0.01);
    else
        return Math.min(Math.pow(2, val + 2) * x.fu, 2000) + type * (val + x.fu * 0.01);
};

/**
 * calcSudian 组 - 川麻
 *
 * 根据算得的番计算素点
 * @param x - 和牌信息
 * @param type - 有效值0和1, 0是一般模式, 1表示比较模式, 默认为一般模式
 */
export const calcSudianChuanma = (x: CalcFanRet, type: number = 0): number => {
    let val = 0;
    for (const fan of x.fans)
        val += fan.val;
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

/**
 * 根据已结束的对局进行牌山修正, 用于"天凤牌谱编辑器数据转雀魂格式"和"根据可见手牌和牌河生成雀魂牌谱"的最后
 *
 * @param dora_num - 表指示牌数量, 默认为1
 * @param li_dora_num - 里指示牌刷领, 默认为0
 */
export const fixPaishan = (dora_num: number = 1, li_dora_num: number = 0): void => {
    let qishou_num = 53, all_lingshang_num = 4;
    if (player_cnt === 3) {
        qishou_num = 40;
        all_lingshang_num = 8;
    } else if (player_cnt === 2) {
        qishou_num = 27;
        all_lingshang_num = 12;
    }
    const data_new_round = all_data.all_actions[all_data.all_actions.length - 1][0].data;
    if (!data_new_round.sha256)
        qishou_num = 0;

    let normal_num = 0, lingshang_num = 0;
    const normal_tiles: Tile[] = [], lingshang_tiles: Tile[] = [];

    const cur_actions = all_data.all_actions[all_data.all_actions.length - 1];
    for (const i in cur_actions) {
        if (cur_actions[i].name === 'RecordDealTile') {
            let is_lingshang = false;
            const lst_action = cur_actions[parseInt(i) - 1];
            if (lst_action.name === 'RecordChiPengGang' && lst_action.data.type === 2) // 上一个操作是暗杠, 则这张牌是岭上牌
                is_lingshang = true;
            if (lst_action.name === 'RecordAnGangAddGang' || lst_action.name === 'RecordBaBei') // 上一个操作是暗杠/加杠/拔北, 则这张牌是岭上牌
                is_lingshang = true;

            if (is_lingshang) {
                lingshang_num++;
                lingshang_tiles.push(cur_actions[i].data.tile);
            } else {
                normal_num++;
                normal_tiles.push(cur_actions[i].data.tile);
            }
        }
    }
    const new_paishan: Tile[] = separate(data_new_round.paishan);
    const protected_index = [];
    for (let i = 0; i < dora_num; i++)
        protected_index.push(new_paishan.length - 1 - all_lingshang_num - i * 2);
    for (let i = 0; i < li_dora_num; i++)
        protected_index.push(new_paishan.length - 2 - all_lingshang_num - i * 2);

    for (let i = 0; i < normal_num; i++) {
        if (new_paishan[qishou_num + i] === normal_tiles[i])
            continue;
        let same_index = -1;
        for (let j = qishou_num + i + 1; j < new_paishan.length; j++)
            if (!protected_index.includes(j) && new_paishan[j] === normal_tiles[i]) {
                same_index = j;
                break;
            }
        if (same_index !== -1) {
            const tmp = new_paishan[qishou_num + i];
            new_paishan[qishou_num + i] = new_paishan[same_index];
            new_paishan[same_index] = tmp;
        }
    }
    for (let i = 0; i < lingshang_num; i++) {
        if (new_paishan[new_paishan.length - 1 - i] === lingshang_tiles[i])
            continue;
        let same_index = -1;
        for (let j = new_paishan.length - 2 - i; j >= qishou_num; j--)
            if (!protected_index.includes(j) && new_paishan[j] === lingshang_tiles[i]) {
                same_index = j;
                break;
            }
        if (same_index !== -1) {
            const tmp = new_paishan[new_paishan.length - 1 - i];
            new_paishan[new_paishan.length - 1 - i] = new_paishan[same_index];
            new_paishan[same_index] = tmp;
        }
    }
    data_new_round.paishan = new_paishan.join('');
};
