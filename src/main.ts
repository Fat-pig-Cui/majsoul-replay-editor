/**
 * @file: main.ts - 外部使用的函数
 * @author: GrandDawn, Fat-pig-Cui
 * @email: chubbypig@qq.com
 * @github: https://github.com/Fat-pig-Cui/majsoul-replay-editor
 */

import {player_datas, begin_tiles, player_tiles, all_data} from './core/core'
import {clearProject, setConfig, setDiscardTiles, setDealTiles, setPaishan} from './core/core'
import {randomPaishan, roundBegin, mopai, qiepai, mingpai, zimingpai} from './core/core'
import {hupai, huangpai, liuju, setMuyuSeats, huanpai, dingque} from './core/core'
import {kaipai, kaipaiLock, setRound, getLeftTileCnt, demoGame, normalMoqie} from './core/core'
import {moqieLiqi, comboMopai, mingQiepai, zimoHu, moqieLiuju, judgeTile} from './core/core'
import {allEqualTiles, isEqualTile, decompose, separate, separateWithMoqie, separateWithParam} from './core/core'
import {calcHupai, calcTingpai, getLstAction, setScores, resetReplay} from './core/core'
import {reportYaku, reportYaku_yiji} from "./core/core";
import {protected_tiles} from "./core/core";
import {cmp} from "./core/utils";

export type t_player_datas = typeof player_datas;
export type t_begin_tiles = typeof begin_tiles;
export type t_player_tiles = typeof player_tiles;
export type t_all_data = typeof all_data;
export type t_clearProject = typeof clearProject;
export type t_setConfig = typeof setConfig;
export type t_setDiscardTiles = typeof setDiscardTiles;
export type t_setDealTiles = typeof setDealTiles;
export type t_setPaishan = typeof setPaishan;
export type t_randomPaishan = typeof randomPaishan;
export type t_roundBegin = typeof roundBegin;
export type t_mopai = typeof mopai;
export type t_qiepai = typeof qiepai;
export type t_mingpai = typeof mingpai;
export type t_zimingpai = typeof zimingpai;
export type t_hupai = typeof hupai;
export type t_huangpai = typeof huangpai;
export type t_liuju = typeof liuju;
export type t_setMuyuSeats = typeof setMuyuSeats;
export type t_huanpai = typeof huanpai;
export type t_dingque = typeof dingque;
export type t_kaipai = typeof kaipai;
export type t_kaipaiLock = typeof kaipaiLock;
export type t_setRound = typeof setRound;
export type t_getLeftTileCnt = typeof getLeftTileCnt;
export type t_demoGame = typeof demoGame;
export type t_normalMoqie = typeof normalMoqie;
export type t_moqieLiqi = typeof moqieLiqi;
export type t_comboMopai = typeof comboMopai;
export type t_mingQiepai = typeof mingQiepai;
export type t_zimoHu = typeof zimoHu;
export type t_moqieLiuju = typeof moqieLiuju;
export type t_judgeTile = typeof judgeTile;
export type t_allEqualTiles = typeof allEqualTiles;
export type t_isEqualTile = typeof isEqualTile;
export type t_decompose = typeof decompose;
export type t_separate = typeof separate;
export type t_separateWithMoqie = typeof separateWithMoqie;
export type t_separateWithParam = typeof separateWithParam;
export type t_calcHupai = typeof calcHupai;
export type t_calcTingpai = typeof calcTingpai;
export type t_getLstAction = typeof getLstAction;
export type t_setScores = typeof setScores;
export type t_resetReplay = typeof resetReplay;
export type t_reportYaku = typeof reportYaku;
export type t_reportYaku_yiji = typeof reportYaku_yiji;
export type t_protected_tiles = typeof protected_tiles;
export type t_cmp = typeof cmp;

export {
    player_datas,
    begin_tiles,
    player_tiles,
    all_data,
    clearProject,
    setConfig,
    setDiscardTiles,
    setDealTiles,
    setPaishan,
    randomPaishan,
    roundBegin,
    mopai,
    qiepai,
    mingpai,
    zimingpai,
    hupai,
    huangpai,
    liuju,
    setMuyuSeats,
    huanpai,
    dingque,
    kaipai,
    kaipaiLock,
    setRound,
    getLeftTileCnt,
    demoGame,
    normalMoqie,
    moqieLiqi,
    comboMopai,
    mingQiepai,
    zimoHu,
    moqieLiuju,
    judgeTile,
    allEqualTiles,
    isEqualTile,
    decompose,
    separate,
    separateWithMoqie,
    separateWithParam,
    calcHupai,
    calcTingpai,
    getLstAction,
    setScores,
    resetReplay,
    reportYaku,
    reportYaku_yiji,
    protected_tiles,
    cmp,
};

declare type MRE_Type = {
    player_datas: t_player_datas;
    begin_tiles: t_begin_tiles;
    player_tiles: t_player_tiles;
    all_data: t_all_data;
    clearProject: t_clearProject;
    setConfig: t_setConfig;
    setDiscardTiles: t_setDiscardTiles;
    setDealTiles: t_setDealTiles;
    setPaishan: t_setPaishan;
    randomPaishan: t_randomPaishan;
    roundBegin: t_roundBegin;
    mopai: t_mopai;
    qiepai: t_qiepai;
    mingpai: t_mingpai;
    zimingpai: t_zimingpai;
    hupai: t_hupai;
    huangpai: t_huangpai;
    liuju: t_liuju;
    setMuyuSeats: t_setMuyuSeats;
    huanpai: t_huanpai;
    dingque: t_dingque;
    kaipai: t_kaipai;
    kaipaiLock: t_kaipaiLock;
    setRound: t_setRound;
    getLeftTileCnt: t_getLeftTileCnt;
    demoGame: t_demoGame;
    normalMoqie: t_normalMoqie;
    moqieLiqi: t_moqieLiqi;
    comboMopai: t_comboMopai;
    mingQiepai: t_mingQiepai;
    zimoHu: t_zimoHu;
    moqieLiuju: t_moqieLiuju;
    judgeTile: t_judgeTile;
    allEqualTiles: t_allEqualTiles;
    isEqualTile: t_isEqualTile;
    decompose: t_decompose;
    separate: t_separate;
    separateWithMoqie: t_separateWithMoqie;
    separateWithParam: t_separateWithParam;
    calcHupai: t_calcHupai;
    calcTingpai: t_calcTingpai;
    getLstAction: t_getLstAction;
    setScores: t_setScores;
    resetReplay: t_resetReplay;
    reportYaku: t_reportYaku;
    reportYaku_yiji: t_reportYaku_yiji;
    protected_tiles: t_protected_tiles;
    cmp: t_cmp;
};

export const MRE: MRE_Type = {
    player_datas: player_datas,
    begin_tiles: begin_tiles,
    player_tiles: player_tiles,
    all_data: all_data,
    clearProject: clearProject,
    setConfig: setConfig,
    setDiscardTiles: setDiscardTiles,
    setDealTiles: setDealTiles,
    setPaishan: setPaishan,
    randomPaishan: randomPaishan,
    roundBegin: roundBegin,
    mopai: mopai,
    qiepai: qiepai,
    mingpai: mingpai,
    zimingpai: zimingpai,
    hupai: hupai,
    huangpai: huangpai,
    liuju: liuju,
    setMuyuSeats: setMuyuSeats,
    huanpai: huanpai,
    dingque: dingque,
    kaipai: kaipai,
    kaipaiLock: kaipaiLock,
    setRound: setRound,
    getLeftTileCnt: getLeftTileCnt,
    demoGame: demoGame,
    normalMoqie: normalMoqie,
    moqieLiqi: moqieLiqi,
    comboMopai: comboMopai,
    mingQiepai: mingQiepai,
    zimoHu: zimoHu,
    moqieLiuju: moqieLiuju,
    judgeTile: judgeTile,
    allEqualTiles: allEqualTiles,
    isEqualTile: isEqualTile,
    decompose: decompose,
    separate: separate,
    separateWithMoqie: separateWithMoqie,
    separateWithParam: separateWithParam,
    calcHupai: calcHupai,
    calcTingpai: calcTingpai,
    getLstAction: getLstAction,
    setScores: setScores,
    resetReplay: resetReplay,
    reportYaku: reportYaku,
    reportYaku_yiji: reportYaku_yiji,
    protected_tiles: protected_tiles,
    cmp: cmp,
};

(window as any).player_datas = player_datas;
(window as any).begin_tiles = begin_tiles;
(window as any).player_tiles = player_tiles;
(window as any).all_data = all_data;
(window as any).clearProject = clearProject;
(window as any).setConfig = setConfig;
(window as any).setDiscardTiles = setDiscardTiles;
(window as any).setDealTiles = setDealTiles;
(window as any).setPaishan = setPaishan;
(window as any).randomPaishan = randomPaishan;
(window as any).roundBegin = roundBegin;
(window as any).mopai = mopai;
(window as any).qiepai = qiepai;
(window as any).mingpai = mingpai;
(window as any).zimingpai = zimingpai;
(window as any).hupai = hupai;
(window as any).huangpai = huangpai;
(window as any).liuju = liuju;
(window as any).setMuyuSeats = setMuyuSeats;
(window as any).huanpai = huanpai;
(window as any).dingque = dingque;
(window as any).kaipai = kaipai;
(window as any).kaipaiLock = kaipaiLock;
(window as any).setRound = setRound;
(window as any).getLeftTileCnt = getLeftTileCnt;
(window as any).demoGame = demoGame;
(window as any).normalMoqie = normalMoqie;
(window as any).moqieLiqi = moqieLiqi;
(window as any).comboMopai = comboMopai;
(window as any).mingQiepai = mingQiepai;
(window as any).zimoHu = zimoHu;
(window as any).moqieLiuju = moqieLiuju;
(window as any).judgeTile = judgeTile;
(window as any).allEqualTiles = allEqualTiles;
(window as any).isEqualTile = isEqualTile;
(window as any).decompose = decompose;
(window as any).separate = separate;
(window as any).separateWithMoqie = separateWithMoqie;
(window as any).separateWithParam = separateWithParam;
(window as any).calcHupai = calcHupai;
(window as any).calcTingpai = calcTingpai;
(window as any).getLstAction = getLstAction;
(window as any).setScores = setScores;
(window as any).resetReplay = resetReplay;
(window as any).reportYaku = reportYaku;
(window as any).reportYaku_yiji = reportYaku_yiji;
(window as any).protected_tiles = protected_tiles;
(window as any).cmp = cmp;
