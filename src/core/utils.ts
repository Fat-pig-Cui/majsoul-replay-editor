/**
 * @file: utils.ts - 一些辅助函数
 * @author: GrandDawn, Fat-pig-Cui
 * @email: chubbypig@qq.com
 * @github: https://github.com/Fat-pig-Cui/majsoul-replay-editor
 */

import {
    actions, ben, chang, dora_cnt,
    doras, fulu, gaps, huled, ju,
    liqi_info, lizhizt, mingpais, paihe,
    player_cnt, prelizhizt, pretongxunzt, scores,
    shezhangzt, shoumoqie, tongxunzt,
    xun, yongchang_data, zhenting,
    awaiting_tiles, muyu_info, muyu, paishan,
    player_tiles
} from "./core";
import {
    get_fanfu,
    is_chuanma,
    is_guobiao,
    is_heqie_mode,
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
 * - 'quanshuang': 国标: 组成全双刻的牌
 * - 'quanda': 国标: 组成全大的牌
 * - 'quanzhong': 国标: 组成全中的牌
 * - 'quanxiao': 国标: 组成全小的牌
 * - 'dayuwu': 国标: 组成大于五的牌
 * - 'xiaoyuwu': 国标: 组成小于五的牌
 * - 'tuibudao': 国标: 组成推不倒的牌
 */
export const judgeTile = (tile: Tile, type: string): boolean => {
    if (typeof tile != 'string' || tile.length === 1)
        throw new Error(errorRoundInfo() + `judgeTile: tile 格式不合规: ${tile}`);
    if (tile === Constants.TBD)
        return true;
    let x = tile2Int(tile);
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
            return x === Constants.TILE_NUM.C1s + 1 || x === Constants.TILE_NUM.C1s + 2 || x === Constants.TILE_NUM.C1s + 3 || x === Constants.TILE_NUM.C1s + 5 || x === Constants.TILE_NUM.C1s + 7 || x === Constants.TILE_NUM.C5z + 1;
        case 'quanshuang':
            return x <= Constants.TILE_NUM.C9s && ((x - 1) % 9 + 1) % 2 === 0;
        case 'quanda':
            return x <= Constants.TILE_NUM.C9s && (x - 1) % 9 >= 6;
        case 'quanzhong':
            return x <= Constants.TILE_NUM.C9s && (x - 1) % 9 >= 3 && (x - 1) % 9 <= 5;
        case 'quanxiao':
            return x <= Constants.TILE_NUM.C9s && (x - 1) % 9 <= 2;
        case 'dayuwu':
            return x <= Constants.TILE_NUM.C9s && (x - 1) % 9 >= 5;
        case 'xiaoyuwu':
            return x <= Constants.TILE_NUM.C9s && (x - 1) % 9 <= 3;
        case 'tuibudao':
            return x === 10 || x === 11 || x === 12 || x === 13 || x === 14 || x === 17 || x === 18 || x === 20 || x === 22 || x === 23 || x === 24 || x === 26 || x === 27 || x === 32;
        default:
            throw new Error(errorRoundInfo() + `judgeTile: type 格式不合规: ${type}`);
    }
};

/**
 * 返回和 tile 等效的所有牌, 优先把红宝牌和含有 Constants.SPT_SUFFIX 放到后面
 * @example
 * // return ['5m', '0m', '5mt', '0mt']
 * allEqualTiles('5m')
 */
export const allEqualTiles = (tile: Tile): Tile[] => {
    if (tile === Constants.TBD)
        return [Constants.TBD];
    tile = tile.substring(0, 2) as Tile; // 去掉可能存在的 Constants.SPT_SUFFIX
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
 * 解析牌, 会将简化后牌编码恢复成单个并列样子
 * @example
 * // return '1m2m3m9p9p'
 * decompose('123m99p')
 */
export const decompose = (tiles: string): string => {
    let x = tiles.replace(/\s*/g, '');
    let random_tiles = '.HTYDMPS'; // 随机牌
    let bd_tile_num = x.match(/b/g) ? x.match(/b/g).length : 0;
    let matches = x.match(/\d+[mpsz]t?|\.|H|T|Y|D|M|P|S/g);

    let ret = '';
    for (let i = 0; i < bd_tile_num; i++)
        ret += Constants.TBD; // 万象修罗百搭牌
    for (let i in matches) {
        if (matches[i].length === 1 && random_tiles.includes(matches[i])) {
            ret += matches[i] + matches[i];
            continue;
        }
        let kind_index = matches[i][matches[i].length - 1] === Constants.SPT_SUFFIX ? matches[i].length - 2 : matches[i].length - 1;
        let tile_kind = matches[i][kind_index];
        if (kind_index === matches[i].length - 2)
            tile_kind += Constants.SPT_SUFFIX;
        for (let j = 0; j < kind_index; j++)
            ret += matches[i][j] + tile_kind;
    }
    return ret;
};

/**
 * 拆分牌为数组, 与 decompose 类似, 不过返回的是数组
 * @example
 * // return ['1m', '2m', '3m', '9p', '9p']
 * separate('123m99p')
 */
export const separate = (tiles: string | Tile[]): Tile[] => {
    if (!tiles)
        return [];
    if (tiles instanceof Array)
        return tiles;
    tiles = decompose(tiles);
    let ret: Tile[] = [];
    while (tiles.length > 0) {
        let tmp_tile = tiles.substring(0, 2);
        if (!isTile(tmp_tile))
            console.error(errorRoundInfo() + `separate: 不合规的牌: ${tmp_tile}`);
        if (tiles.length > 2 && tiles[2] === Constants.SPT_SUFFIX) { // 第3位是 Constants.SPT_SUFFIX, 则是特殊牌
            ret.push(tiles.substring(0, 3) as Tile);
            tiles = tiles.substring(3);
        } else {
            ret.push(tiles.substring(0, 2) as Tile);
            tiles = tiles.substring(2);
        }
    }
    return ret;
};

/**
 * 拆分牌为数组, 比 separate 更进一步, 加入了摸切
 * @example
 * // return ['1m', '2m', '3m', '..', '9p']
 * separateWithMoqie('123m.9p')
 */
export const separateWithMoqie = (tiles: string | TileWithMoqie[]): TileWithMoqie[] => {
    if (!tiles)
        return [];
    if (tiles instanceof Array)
        return tiles;
    tiles = decompose(tiles);
    let ret: TileWithMoqie[] = [];
    while (tiles.length > 0) {
        let tmp_tile = tiles.substring(0, 2);
        if (!isTile(tmp_tile, true))
            console.error(errorRoundInfo() + `separateWithMoqie: 牌格式不合规: ${tmp_tile}`);
        if (tiles.length > 2 && tiles[2] === Constants.SPT_SUFFIX) { // 第3位是 Constants.SPT_SUFFIX, 则是特殊牌
            ret.push(tiles.substring(0, 3) as TileWithMoqie);
            tiles = tiles.substring(3);
        } else {
            ret.push(tiles.substring(0, 2) as TileWithMoqie);
            tiles = tiles.substring(2);
        }
    }
    return ret;
};

/**
 * 拆分牌为数组, 比 separateWithMoqie 更进一步, 可以拆分随机牌
 * @example
 * // return ['1m', '2m', '3m', 'YY', '9p']
 * separateWithParam('123mY9p')
 */
export const separateWithParam = (tiles: string | TileWithParam[]): TileWithParam[] => {
    if (!tiles)
        return [];
    if (tiles instanceof Array)
        return tiles;
    tiles = decompose(tiles);
    let ret: TileWithParam[] = [];
    while (tiles.length > 0) {
        let tmp_tile = tiles.substring(0, 2);
        if (!isTile(tmp_tile, true))
            console.error(errorRoundInfo() + `separateWithParam: 牌格式不合规: ${tmp_tile}`);
        if (tiles.length > 2 && tiles[2] === Constants.SPT_SUFFIX) { // 第3位是 Constants.SPT_SUFFIX, 则是特殊牌
            ret.push(tiles.substring(0, 3) as TileWithParam);
            tiles = tiles.substring(3);
        } else {
            ret.push(tiles.substring(0, 2) as TileWithParam);
            tiles = tiles.substring(2);
        }
    }
    return ret;
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
    let cnt: number[] = [], tmp: number[] = [];
    for (let i = Constants.CBD; i <= Constants.TILE_NUM.C7z; i++) // 是 Constants.CBD 而不是 Constants.TILE_NUM.C1m 是因为百搭牌
        cnt[i] = tmp[i] = 0;
    for (let i in tiles)
        cnt[tile2Int(tiles[i])]++;

    if (is_guobiao() && tiles.includes(Constants.HUAPAI))  // 国标无法听花牌, 有花牌一定不是和牌型
        return 0;

    if (is_wanxiangxiuluo() && cnt[Constants.CBD] === 1 && !type) {
        let tmp_tiles: Tile[] = [];
        for (let i in tiles)
            if (tiles[i] !== Constants.TBD)
                tmp_tiles.push(tiles[i]);
        for (let i = 1; i <= 34; i++) { // 百搭牌试所有牌
            tmp_tiles.push(int2Tile(i));
            let result = calcHupai(tmp_tiles, true);
            if (result !== 0) // 存在百搭牌使得成为和牌型, 则返回
                return result;
            tmp_tiles.pop();
        }
        return 0;
    }

    for (let i = Constants.TILE_NUM.C1m; i <= Constants.TILE_NUM.C7z; i++) {
        if (cnt[i] >= 2) { // 假设雀头, 则剩下的只有4个面子
            cnt[i] -= 2;
            let ok = true; // 先假设能和, 再依条件否定
            for (let j = Constants.TILE_NUM.C1m; j <= Constants.TILE_NUM.C7z; j++)
                tmp[j] = cnt[j];
            tmp[Constants.TILE_NUM.C0m] = tmp[Constants.TILE_NUM.C0p] = tmp[Constants.TILE_NUM.C0s] = 0;

            for (let k = 1; k <= 3; k++) {
                for (let j = k * 9 - 8; j !== 0; j = Constants.NXT2[j]) {
                    if (tmp[j] < 0) { // 若牌数量减为了负数, 说明有有未成形的顺子
                        ok = false;
                        break;
                    }
                    tmp[j] %= 3; // 去掉暗刻, 如果 tmp[j] 仍然不为0的话, 则要构成和牌型一定构成顺子
                    // j, Constants.NXT2[j], Constants.NXT2[NXT2[j]] 构成顺子, 三个一组减去
                    tmp[Constants.NXT2[j]] -= tmp[j];
                    tmp[Constants.NXT2[Constants.NXT2[j]]] -= tmp[j];
                }
                tmp[Constants.TILE_NUM.C0m] = tmp[Constants.TILE_NUM.C0p] = tmp[Constants.TILE_NUM.C0s] = 0;
            }
            // 若字牌不能构成暗刻
            for (let j = Constants.TILE_NUM.C1z; j <= Constants.TILE_NUM.C7z; j++)
                if (tmp[j] % 3 !== 0)
                    ok = false;

            cnt[i] += 2;
            if (ok)
                return 1;
        }
    }

    // 七对子
    let duizi = 0;
    for (let i = Constants.TILE_NUM.C1m; i <= Constants.TILE_NUM.C7z; i++) {
        if (cnt[i] === 2)
            duizi++;
        // 本来只要判断 cnt[i] === 4 就行, 这里扩展成作弊大于四张牌的情况
        if (cnt[i] >= 4 && cnt[i] % 2 === 0 && (is_chuanma() || is_guobiao()))
            duizi += cnt[i] / 2;
    }
    if (duizi === 7)
        return 2;

    // 国士无双
    let guoshi = true;
    for (let i = Constants.TILE_NUM.C1m; i <= Constants.TILE_NUM.C7z; i++) {
        if (judgeTile(int2Tile(i), 'Y')) {
            if (cnt[i] === 0) // 所有幺九牌都至少有一张
                guoshi = false;
        } else if (cnt[i] > 0) // 存在非幺九牌
            guoshi = false;
    }
    if (guoshi)
        return 3;

    if (is_guobiao() && tiles.length === 14) { // 国标的全不靠和七星不靠
        let quanbukao = true;
        for (let i = Constants.TILE_NUM.C1m; i <= Constants.TILE_NUM.C7z; i++)
            if (cnt[i] >= 2)
                quanbukao = false;
        // 3*3 的数组, 每一行代表一个花色, 三行分别对应 m, p, s 色, 每一行的三个元素分别代表是否有147, 258, 369中的牌
        let jin_huase = [
            [false, false, false],
            [false, false, false],
            [false, false, false],
        ];
        for (let j = 0; j <= 2; j++)
            for (let i = 0; i <= 8; i++)
                if (cnt[j * 9 + i + 1] === 1)
                    jin_huase[j][i % 3] = true;

        // jin_huase 的每一行, 每一列都最多只有一个 true
        for (let i = 0; i <= 2; i++) {
            let true_cnt_row = 0, true_cnt_col = 0;
            for (let j = 0; j <= 2; j++) {
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
            for (let j = 0; j <= 2; j++)
                for (let i = 0; i <= 2; i++)
                    if (jin_huase[j][i])
                        if (!(cnt[j * 9 + 1 + i] === 1 && cnt[j * 9 + 4 + i] === 1 && cnt[j * 9 + 7 + i] === 1))
                            zuhelong = false;
            return !zuhelong ? 4 : 5;
        }
    }
    if (is_guobiao() && tiles.length >= 11) { // 国标不含全不靠的组合龙
        let condition = [
            [1, 4, 7, 11, 14, 17, 21, 24, 27],
            [1, 4, 7, 12, 15, 18, 20, 23, 26],
            [2, 5, 8, 10, 13, 16, 21, 24, 27],
            [2, 5, 8, 12, 15, 18, 19, 22, 25],
            [3, 6, 9, 10, 13, 16, 20, 23, 26],
            [3, 6, 9, 11, 14, 17, 19, 22, 25],
        ];
        let flag = [true, true, true, true, true, true];
        for (let j in condition)
            for (let i in condition[j])
                if (cnt[condition[j][i]] === 0)
                    flag[j] = false;

        for (let row in condition) {
            if (flag[row]) {
                let new_tiles = tiles.slice();
                for (let i in condition[row])
                    for (let j in new_tiles)
                        if (new_tiles[j] === int2Tile(condition[row][i])) {
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
        for (let i = Constants.TILE_NUM.C1m; i <= Constants.TILE_NUM.C7z; i++) {
            if (cnt[i] === 2)
                duizi_num++;
            if (cnt[i] >= 3)
                shisanbuda = false;
        }
        if (duizi_num !== 1)
            shisanbuda = false;

        for (let j = 0; j <= 2; j++)
            for (let i = 1; i <= 7; i++)
                if (cnt[j * 9 + i] >= 1)
                    if (cnt[j * 9 + i + 1] !== 0 || cnt[j * 9 + i + 2] !== 0)
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
    let tiles = player_tiles[seat];
    let cnt: number[] = [];
    for (let i = Constants.CBD; i <= Constants.TILE_NUM.C7z; i++)
        cnt[i] = 0;
    for (let i in tiles)
        cnt[tile2Int(tiles[i])]++;

    if (is_guobiao() && tiles.includes(Constants.HUAPAI)) // 国标无法听花牌, 有花牌一定不是听牌型
        return [];

    let ret: { tile: Tile }[] = [];
    for (let i = Constants.TILE_NUM.C1m; i <= Constants.TILE_NUM.C7z; i++) { // 试所有牌作为听牌, 检查是否为和牌型
        tiles.push(int2Tile(i));
        cnt[i]++;
        // cnt[i] <= 4 为了除去虚听
        if ((cnt[i] <= 4 || type) && calcHupai(tiles) !== 0 && calcHupai(tiles) !== 12)
            ret.push({tile: int2Tile(i)});

        tiles.pop();
        cnt[i]--;
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
            while (['RecordChangeTile', 'RecordSelectGap', 'RecordGangResult', 'RecordFillAwaitingTiles'].includes(actions[ret].name))
                ret--;
        }
        return actions[ret];
    } else
        throw new Error(errorRoundInfo() + 'actions 为空');
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
    throw new Error(errorRoundInfo() + `tile2Int 输入不合规: ${tile}`);
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
    throw new Error(errorRoundInfo() + `int2Tile 输入不合规: ${x}`);
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

/**
 * 龙之目玉, 更新目玉
 */
export const updateMuyu = (): void => {
    let type = muyu_info.count === 0; // 更新类型, true 表示生成新目玉, false 表示计数
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

/**
 * calcSudian 组 - 立直
 *
 * 根据算得的番计算素点
 * @param x - 和牌信息
 * @param type - 有效值0和1, 0是一般模式, 1表示比较模式, 默认为一般模式
 */
export const calcSudian = (x: CalcFanRet, type: number = 0): number => {
    let fanfu = get_fanfu(), val = 0;
    for (let i in x.fans)
        val += x.fans[i].val;
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
    for (let i in x.fans)
        val = val + x.fans[i].val;
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
    for (let i in x.fans)
        if (!(no_huapai && x.fans[i].id >= 8091 && x.fans[i].id <= 8099))
            val = val + x.fans[i].val;
    return val * scale_points();
};

// 辅助函数, chang, ju, ben 转换为控制台输出的所在小局
export const errorRoundInfo = (): string => {
    const chang_word = [`东`, `南`, `西`, `北`];
    return `${chang_word[chang]}${ju + 1}局${ben}本场: `;
};
