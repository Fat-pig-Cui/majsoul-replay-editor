/**
 * @file: simplifyFunction.ts - 便捷函数
 * @author: Fat-pig-Cui
 * @email: chubbypig@qq.com
 * @github: https://github.com/Fat-pig-Cui/majsoul-replay-editor
 */

import {mopai, qiepai, mingpai, zimingpai, hupai, huangpai} from "./core";
import {separate, getLeftTileCnt} from "./exportedUtils"
import {errRoundInfo} from "./utils";

/**
 * 便捷函数: 正常摸切
 * @param tile_cnt - 要切的牌(Tile)或循环次数(number), 默认为1
 */
export const normalMoqie = (tile_cnt?: Tile | number): void => {
    if (tile_cnt === undefined)
        tile_cnt = 1;
    if (typeof tile_cnt == 'number')
        for (let i = 0; i < tile_cnt; i++) {
            mopai();
            qiepai();
        }
    else if (typeof tile_cnt == 'string') {
        mopai();
        qiepai(tile_cnt);
    } else
        throw new Error(errRoundInfo() + `normalMoqie: tile_cnt 参数不合规: ${tile_cnt}`);
};

/**
 * 便捷函数: 摸牌立直
 * @param tile_cnt - 要切的牌(Tile)或循环次数(number), 默认为1
 */
export const moqieLiqi = (tile_cnt?: Tile | number): void => {
    if (tile_cnt === undefined)
        tile_cnt = 1;
    if (typeof tile_cnt == 'number')
        for (let i = 0; i < tile_cnt; i++) {
            mopai();
            qiepai(true);
        }
    else if (typeof tile_cnt == 'string') {
        mopai();
        qiepai(tile_cnt, true);
    } else
        throw new Error(errRoundInfo() + `moqieLiqi: tile_cnt 参数不合规: ${tile_cnt}`);
};

/**
 * 便捷函数: 连续岭上摸牌
 * @param tile_cnt - 要鸣的牌(string)或循环次数(number), 默认为1
 */
export const comboMopai = (tile_cnt?: Tile | number): void => {
    if (tile_cnt === undefined)
        tile_cnt = 1;
    if (typeof tile_cnt == 'number')
        for (let i = 0; i < tile_cnt; i++) {
            zimingpai();
            mopai();
        }
    else if (typeof tile_cnt == 'string') {
        zimingpai(tile_cnt);
        mopai();
    } else
        throw new Error(errRoundInfo() + `comboMopai: tile_cnt 参数不合规: ${tile_cnt}`);
};

/**
 * 便捷函数: 鸣牌并切牌
 * @param tls_cnt - 要切的牌(string, 1张牌)或鸣牌从手里拿出来的牌(string, 至少2张牌)或循环次数(number), 默认为1
 */
export const mingQiepai = (tls_cnt?: string | number): void => {
    if (tls_cnt === undefined)
        tls_cnt = 1;
    if (typeof tls_cnt == 'number')
        for (let i = 0; i < tls_cnt; i++) {
            mingpai();
            qiepai();
        }
    else if (typeof tls_cnt == 'string') {
        const split_tile = separate(tls_cnt);
        if (split_tile.length >= 2) {
            mingpai(tls_cnt);
            qiepai();
        } else {
            mingpai();
            qiepai(tls_cnt);
        }
    } else
        throw new Error(errRoundInfo() + `mingQiepai: tls_cnt 参数不合规: ${tls_cnt}`);
};

/**
 * 便捷函数: 自摸和牌
 * @param flag - 修罗/川麻: 即 hupai 中的 type 参数, 是否为最终和牌, 默认为中途和牌
 */
export const zimoHu = (flag: boolean = false): void => {
    if (typeof flag == 'boolean') {
        mopai();
        hupai(flag);
    } else
        throw new Error(errRoundInfo() + `zimoHu: flag 参数不合规: ${flag}`);
};

/**
 * 便捷函数: 摸切到荒牌流局
 */
export const moqieLiuju = (): void => {
    normalMoqie(getLeftTileCnt());
    huangpai();
};
