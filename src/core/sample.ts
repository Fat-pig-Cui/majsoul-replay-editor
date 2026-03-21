/**
 * @file: sample.ts - 一些定制化的牌谱, 包括示例牌局和报菜名牌局
 * @author: Fat-pig-Cui
 * @email: chubbypig@qq.com
 * @github: https://github.com/Fat-pig-Cui/majsoul-replay-editor
 */

import {all_data, actions, begin_tiles, base_info} from "./data";
import {mopai, qiepai, randomPaishan, roundEnd, gameBegin, hupai} from "./core";
import {normalMoqie, moqieLiqi} from "./simplifyFunction";
import {is_report_yakus} from "./misc";

/**
 * 示例牌局: 东一局庄家大七星w立, 南家追立放铳
 */
export const demoGame = (): void => {
    gameBegin();
    begin_tiles[0] = '11223344556777z';
    if (base_info.player_cnt === 2) {
        begin_tiles[1] = '1112340678999m';
        randomPaishan('6z', '55z............');
    } else if (base_info.player_cnt === 3) {
        begin_tiles[1] = '1112340678999p';
        begin_tiles[2] = '1112340678999s';
        randomPaishan('6z', '55z........');
    } else {
        begin_tiles[1] = '1112340678999m';
        begin_tiles[2] = '1112340678999p';
        begin_tiles[3] = '1112340678999s';
        randomPaishan('6z', '55z....');
    }
    qiepai(true);
    moqieLiqi();
    hupai();
};

/**
 * 用于报菜名的示例牌局
 */
export const reportYaku = (): void => {
    if (is_report_yakus())
        for (let i = 0; i < 2; i++)
            reportGame();
};

/**
 * 一姬专用的报菜名牌局
 */
export const reportYaku_yiji = (): void => {
    if (is_report_yakus())
        for (let i = 0; i < 10; i++)
            reportGame(true);
};

const generateHuleInfo = (index: number): Action => {
    const all_fans = [
        [
            {val: 1, id: 2}, // 立直
            {val: 2, id: 18}, // 两立直
            {val: 1, id: 30}, // 一发
            {val: 1, id: 3}, // 枪杠
            {val: 1, id: 4}, // 岭上开花
            {val: 1, id: 5}, // 海底摸月
            {val: 1, id: 6}, // 河底捞鱼
            {val: 1, id: 1}, // 门前清自摸和
            {val: 1, id: 14}, // 平和
            {val: 1, id: 13}, // 一杯口
            {val: 3, id: 28}, // 二杯口
            {val: 2, id: 25}, // 七对子
            {val: 1, id: 7}, // 役牌 白
            {val: 1, id: 8}, // 役牌 发
            {val: 1, id: 9}, // 役牌 中
            {val: 1, id: 9101}, // 役牌 东
            {val: 1, id: 9102}, // 役牌 连东
            {val: 1, id: 9103}, // 役牌 南
            {val: 1, id: 9104}, // 役牌 连南
            {val: 1, id: 10}, // 役牌:门风牌
            {val: 1, id: 11}, // 役牌:场风牌
            {val: 1, id: 9107}, // 役牌 北
            {val: 1, id: 9108}, // 役牌 连北
            {val: 1, id: 12}, // 断幺九
            {val: 2, id: 15}, // 混全带幺九
            {val: 2, id: 16}, // 一气通贯
            {val: 2, id: 17}, // 三色同顺
            {val: 2, id: 19}, // 三色同刻
            {val: 2, id: 20}, // 三杠子
            {val: 2, id: 21}, // 对对和
            {val: 2, id: 22}, // 三暗刻
            {val: 2, id: 23}, // 小三元
            {val: 2, id: 24}, // 混老头
            {val: 3, id: 26}, // 纯全带幺九
            {val: 3, id: 27}, // 混一色
            {val: 6, id: 29}, // 清一色
            {val: 1, id: 31}, // 宝牌
            {val: 2, id: 31}, // 宝牌
            {val: 3, id: 31}, // 宝牌
            {val: 4, id: 31}, // 宝牌
            {val: 5, id: 32}, // 红宝牌
            {val: 6, id: 32}, // 红宝牌
            {val: 7, id: 32}, // 红宝牌
            {val: 8, id: 32}, // 红宝牌
            {val: 9, id: 34}, // 拔北宝牌
            {val: 10, id: 34}, // 拔北宝牌
            {val: 11, id: 34}, // 拔北宝牌
            {val: 12, id: 34}, // 拔北宝牌
            {val: 13, id: 33}, // 里宝牌
            {val: 5, id: 9100}, // 流局满贯
            {val: 6, id: 1015}, // 清龙七对
            {val: 6, id: 1016}, // 十八罗汉
            {val: 6, id: 1017}, // 清十八罗汉
            {val: 4, id: 1010}, // 清对
            {val: 4, id: 1011}, // 将对
            {val: 4, id: 1012}, // 龙七对
            {val: 5, id: 1013}, // 清七对
            {val: 5, id: 1020}, // 清幺九
            {val: 5, id: 1014}, // 清金钩钓
            {val: 3, id: 1008}, // 带幺九
            {val: 3, id: 1009}, // 金钩钓
            {val: 1, id: 1000}, // 根
            {val: 1, id: 1002}, // 杠上炮
        ], [
            {val: 1, id: 35}, // 天和
            {val: 1, id: 36}, // 地和
            {val: 1, id: 37}, // 大三元
            {val: 1, id: 38}, // 四暗刻
            {val: 1, id: 39}, // 字一色
            {val: 1, id: 40}, // 绿一色
            {val: 1, id: 41}, // 清老头
            {val: 1, id: 42}, // 国士无双
            {val: 1, id: 43}, // 小四喜
            {val: 1, id: 44}, // 四杠子
            {val: 1, id: 45}, // 九莲宝灯
            {val: 2, id: 47}, // 纯正九莲宝灯
            {val: 2, id: 48}, // 四暗刻单骑
            {val: 2, id: 49}, // 国士无双十三面
            {val: 2, id: 50}, // 大四喜
        ]];
    return {
        "name": "RecordHule",
        "data": {
            "hules": [{
                "count": 64, // 207
                "doras": ["7z"],
                "li_doras": [],
                "fans": all_fans[index],
                "fu": 170,
                "hand": ["5z", "5z", "5z", "5z", "5z", "5z", "5z", "5z", "5z", "5z", "5z", "5z", "5z"],
                "hu_tile": "5z",
                "liqi": false,
                "ming": [],
                "point_rong": index === 1 ? 192000 : 32000,
                "point_sum": index === 1 ? 192000 : 32000,
                "point_zimo_qin": index === 1 ? 96000 : 16000,
                "point_zimo_xian": index === 1 ? 48000 : 8000,
                "qinjia": false,
                "seat": 2,
                "title_id": index === 1 ? 10 : 11,
                "yiman": index === 1,
                "zimo": true
            }],
            "old_scores": [300000, 300000, 300000, 300000],
            "delta_scores": [0, 0, 0, 0],
            "scores": [300000, 300000, 300000, 300000],
            "baopai": 0
        }
    };
};

const generateHuleInfo_yiji = (index: number): Action => {
    const all_fans = [
        [
            {val: 0, id: 9500}, // 自我介绍
            {val: 0, id: 9200},
            {val: 0, id: 9201},
            {val: 0, id: 9202},
            {val: 0, id: 9203},
            {val: 0, id: 9204},
            {val: 0, id: 9205},
            {val: 0, id: 9511}, // 送礼物普通
            {val: 0, id: 9206},
            {val: 0, id: 9603}, // 役满听牌
            {val: 0, id: 9207},
            {val: 1, id: 2},
            {val: 2, id: 18},
            {val: 1, id: 30},
            {val: 1, id: 3},
        ], [
            {val: 1, id: 4},
            {val: 1, id: 5},
            {val: 1, id: 6},
            {val: 1, id: 1},
            {val: 1, id: 14},
            {val: 1, id: 13},
            {val: 3, id: 28},
            {val: 2, id: 25},
            {val: 1, id: 7},
            {val: 1, id: 8},
            {val: 1, id: 9},
            {val: 1, id: 9101},
            {val: 1, id: 9102},
            {val: 1, id: 9103},
            {val: 1, id: 9104},
        ], [
            {val: 1, id: 10},
            {val: 1, id: 11},
            {val: 1, id: 9107},
            {val: 1, id: 9108},
            {val: 1, id: 12},
            {val: 2, id: 15},
            {val: 2, id: 16},
            {val: 2, id: 17},
            {val: 2, id: 19},
            {val: 2, id: 20},
            {val: 2, id: 21},
            {val: 2, id: 22},
            {val: 2, id: 23},
            {val: 2, id: 24},
            {val: 3, id: 26},
        ], [
            {val: 3, id: 27},
            {val: 6, id: 29},
            {val: 1, id: 31},
            {val: 2, id: 31},
            {val: 3, id: 31},
            {val: 4, id: 31},
            {val: 5, id: 32},
            {val: 6, id: 32},
            {val: 7, id: 32},
            {val: 8, id: 32},
            {val: 9, id: 34},
            {val: 10, id: 34},
            {val: 11, id: 34},
            {val: 12, id: 34},
            {val: 13, id: 33},
        ], [
            {val: 0, id: 9400}, // 四风连打
            {val: 0, id: 9401}, // 四杠散了
            {val: 0, id: 9402}, // 四家立直
            {val: 0, id: 9403}, // 九种九牌
            {val: 0, id: 9100}, // 流局满贯
            {val: 0, id: 9300},
            {val: 0, id: 9301},
            {val: 0, id: 9302},
            {val: 0, id: 9303},
            {val: 0, id: 9304},
            {val: 0, id: 9305},
            {val: 0, id: 9306},
            {val: 0, id: 9307},
            {val: 0, id: 9308},
            {val: 0, id: 9309},
            // {val: 0, id: 9502}, // 登录语音满羁绊
        ], [
            {val: 1, id: 35},
            {val: 1, id: 36},
            {val: 1, id: 37},
            {val: 1, id: 38},
            {val: 1, id: 39},
            {val: 1, id: 40},
            {val: 1, id: 41},
            {val: 1, id: 42},
        ], [
            {val: 1, id: 43},
            {val: 1, id: 44},
            {val: 1, id: 45},
            {val: 2, id: 47},
            {val: 2, id: 48},
            {val: 2, id: 49},
            {val: 2, id: 50},
            {val: 0, id: 9209},
        ], [
            {val: 6, id: 1015},
            {val: 6, id: 1016},
            {val: 6, id: 1017},
            {val: 4, id: 1010},
            {val: 4, id: 1011},
            {val: 4, id: 1012},
            {val: 5, id: 1013},
            {val: 5, id: 1020},
            {val: 5, id: 1014},
            {val: 3, id: 1008},
            {val: 3, id: 1009},
            {val: 1, id: 1000},
            {val: 1, id: 1002},
            {val: 0, id: 9311}, // 听牌
            {val: 0, id: 9312}, // 未听牌
        ], [
            {val: 0, id: 9500},
            {val: 0, id: 9501},
            {val: 0, id: 9502},
            {val: 0, id: 9503},
            {val: 0, id: 9504},
            {val: 0, id: 9505},
            {val: 0, id: 9506},
            {val: 0, id: 9507},
            {val: 0, id: 9508},
            {val: 0, id: 9509},
            {val: 0, id: 9510},
            {val: 0, id: 9511},
            {val: 0, id: 9512},
            {val: 0, id: 9513},
            {val: 0, id: 9514},
        ], [
            {val: 0, id: 9515},
            {val: 0, id: 9516},
            {val: 0, id: 9517},
            {val: 0, id: 9518},
            {val: 0, id: 9519},
            {val: 0, id: 9520},
            {val: 0, id: 9600},
            {val: 0, id: 9601},
            {val: 0, id: 9602},
            {val: 0, id: 9603},
            {val: 0, id: 9604},
        ]
    ];
    return {
        "name": "RecordHule",
        "data": {
            "hules": [{
                "count": 64,
                "doras": ["7z"],
                "li_doras": [],
                "fans": all_fans[index],
                "fu": 170,
                "hand": ["5z", "5z", "5z", "5z", "5z", "5z", "5z", "5z", "5z", "5z", "5z", "5z", "5z"],
                "hu_tile": "5z",
                "liqi": false,
                "ming": [],
                "point_rong": [5, 6].includes(index) ? 192000 : 32000,
                "point_sum": [5, 6].includes(index) ? 192000 : 32000,
                "point_zimo_qin": [5, 6].includes(index) ? 96000 : 16000,
                "point_zimo_xian": [5, 6].includes(index) ? 48000 : 8000,
                "qinjia": false,
                "seat": 2,
                "title_id": [5, 6].includes(index) ? 10 : 11,
                "yiman": [5, 6].includes(index),
                "zimo": true
            }],
            "old_scores": [300000, 300000, 300000, 300000],
            "delta_scores": [0, 0, 0, 0],
            "scores": [300000, 300000, 300000, 300000],
            "baopai": 0
        }
    };
};

const reportGame = (is_yiji: boolean = false): void => {
    begin_tiles[0] = '1112340678999m7z';
    begin_tiles[1] = '1112340678999p';
    begin_tiles[2] = '5555555555555z';
    begin_tiles[3] = '1112340678999s';
    randomPaishan('75z', '7z....');
    qiepai();
    normalMoqie();
    mopai();
    if (is_yiji)
        actions.push(generateHuleInfo_yiji(all_data.all_actions.length));
    else
        actions.push(generateHuleInfo(all_data.all_actions.length));
    roundEnd();
};
