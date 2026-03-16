/**
 * @file: activityFunction.ts - 活动场相关函数
 * @author: GrandDawn, Fat-pig-Cui
 * @email: chubbypig@qq.com
 * @github: https://github.com/Fat-pig-Cui/majsoul-replay-editor
 */

import {base_info, muyu, player_tiles, gaps, scores, paihe, chuanma_gangs, delta_scores} from "./data";
import {separate, getLstAction} from "./exportedUtils"
import {errRoundInfo, cmp} from "./utils";
import {addChangeTile, addGangResult, addGangResultEnd, addLockTile, addSelectGap, addUnveilTile} from "./glue";
import {Constants} from "./constants";

/**
 * 龙之目玉: 设置拥有目玉的玩家队列
 */
export const setMuyuSeats = (m_seats: MuyuSeats): void => {
    muyu.seats = m_seats;
};

/**
 * 换三张换牌(修罗/川麻)
 * @param tls - 四名玩家交出去的牌
 * @param type - 换牌方式, 0: 逆时针, 1: 对家, 2: 顺时针
 */
export const huanpai = (tls: string[], type: HuanpaiType): void => {
    const tiles = [separate(tls[0]), separate(tls[1]), separate(tls[2]), separate(tls[3])];

    const ret: ChangeTileInfo = [null, null, null, null];
    for (let seat: Seat = 0; seat < base_info.player_cnt; seat++) {
        const in_seat = (seat - type + 3) % base_info.player_cnt;
        for (let j = 0; j < tiles[seat].length; j++) {
            player_tiles[seat].splice(player_tiles[seat].indexOf(tiles[seat][j]), 1);
            player_tiles[seat].push(tiles[in_seat][j]);
        }
        ret[seat] = {
            out_tiles: tiles[seat] as [Tile, Tile, Tile],
            out_tile_states: [0, 0, 0],
            in_tiles: tiles[in_seat] as [Tile, Tile, Tile],
            in_tile_states: [0, 0, 0],
        };
    }
    for (let i = 0; i < base_info.player_cnt; i++)
        player_tiles[i].sort(cmp);

    addChangeTile(ret, type);
};

/**
 * 定缺(川麻)
 * @example
 * // seat 从0-3的定缺花色分别为"索,万,饼,索"
 * dingque('smps')
 * @param x - 四位玩家的定缺
 */
export const dingque = (x: GapsInput): void => {
    const all_dingque = x.split('') as [GapInputType, GapInputType, GapInputType, GapInputType];
    const dict: { m: GapType, p: GapType, s: GapType } = {'m': 1 as GapType, 'p': 0 as GapType, 's': 2 as GapType}; // 注意 012 分别对应 pms, 而不是 mps
    const ret: Gaps = [0, 0, 0, 0];
    for (let i: Seat = 0; i < base_info.player_cnt; i++) {
        ret[i] = dict[all_dingque[i]];
        gaps[i] = ret[i];
    }

    addSelectGap(ret);
};

/**
 * seat 号玩家开牌并成功(暗夜之战)
 */
export const kaipai = (seat: Seat): void => {
    if (typeof seat != 'number')
        throw new Error(errRoundInfo() + `kaipai: 暗夜之战开牌必须指定玩家, seat: ${seat}`);
    if (getLstAction().name === 'RecordRevealTile') {
        const tile_seat = getLstAction().data.seat;
        const tile = getLstAction().data.tile;
        scores[seat] -= 2000;
        base_info.liqibang += 2;

        addUnveilTile(seat);

        addLockTile(tile_seat, 0, tile);

        if (!Constants.YAOJIU_TILE.includes(tile))
            paihe[tile_seat].liujumanguan = false;
    } else
        throw new Error(errRoundInfo() + `kaipai: 暗夜之战开牌的前提是有人刚暗牌, getLstAction().name: ${getLstAction().name}`);
};

/**
 * seat 号玩家开牌后锁定(暗夜之战)
 * @param seat
 */
export const kaipaiLock = (seat: Seat): void => {
    if (typeof seat != 'number')
        throw new Error(errRoundInfo() + `kaipaiLock: 暗夜之战开牌必须指定玩家, seat: ${seat}`);
    if (getLstAction().name === 'RecordRevealTile') {
        const tile_seat = getLstAction().data.seat;
        scores[seat] -= 2000;
        base_info.liqibang += 2;

        addUnveilTile(seat);

        scores[tile_seat] -= 4000;
        base_info.liqibang += 4;

        addLockTile(tile_seat, 1);

    } else
        throw new Error(errRoundInfo() + `kaipaiLock: 暗夜之战开牌的前提是有人刚暗牌, getLstAction().name: ${getLstAction().name}`);
};

/**
 * 川麻刮风下雨
 * @param type - 是否完场, 默认不完场
 */
export const calcGangPoint = (type: boolean = false): void => {
    if (!chuanma_gangs.not_over)
        return;

    chuanma_gangs.over.push(chuanma_gangs.not_over);
    delta_scores[chuanma_gangs.not_over.from] -= chuanma_gangs.not_over.val;
    delta_scores[chuanma_gangs.not_over.to] += chuanma_gangs.not_over.val;
    chuanma_gangs.not_over = null;

    const old_scores = scores.slice() as Players_Number;
    for (let i = 0; i < base_info.player_cnt; i++)
        scores[i] += delta_scores[i];

    if (!type)
        addGangResult(old_scores);
    else
        addGangResultEnd(old_scores);

    for (let i = 0; i < base_info.player_cnt; i++)
        delta_scores[i] = 0;
};
