/**
 * @file: shortFunction.ts - 一些比较简短的函数
 * @author: Fat-pig-Cui
 * @email: chubbypig@qq.com
 * @github: https://github.com/Fat-pig-Cui/majsoul-replay-editor
 */

import {paishan, config, deal_tiles, discard_tiles, base_info, scores} from "./data";
import {separate, separateWithMoqie} from "./exportedUtils";
import {roundBegin} from "./core";

/**
 * 设置对局的模式
 */
export const setConfig = (c: Config): void => {
    for (const key in c)
        config[key] = c[key];
};

/**
 * 设置玩家的切牌集合
 */
export const setDiscardTiles = (tiles: Players_String): void => {
    for (const i in tiles)
        discard_tiles[i] = separateWithMoqie(tiles[i]);
};

/**
 * 设置玩家的摸牌集合
 */
export const setDealTiles = (tiles: Players_String): void => {
    for (const i in tiles)
        deal_tiles[i] = separateWithMoqie(tiles[i]);
};

/**
 * 手动设置牌山(参数不含起手)
 */
export const setPaishan = (ps: string): void => {
    paishan.push(...separate(ps));
    roundBegin();
};

/**
 * 跳转局数
 * @param c - 场 chang, 0,1,2,3 分别表示 东,南,西,北 场
 * @param j - 局 ju, seat 为 ju 坐庄
 * @param b - 本 ben, 本场数
 */
export const setRound = (c: Seat, j: Seat, b: number): void => {
    [base_info.chang, base_info.ju, base_info.ben] = [c, j, b];
};

/**
 * 设置玩家的实时点数
 */
export const setScores = (s: Players_Number): void => {
    for (let i = 0; i < base_info.player_cnt; i++)
        scores[i] = s[i];
};
