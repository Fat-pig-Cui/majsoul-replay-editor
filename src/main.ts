/**
 * @file: main.ts - 外部使用的变量和函数
 * @author: GrandDawn, Fat-pig-Cui
 * @email: chubbypig@qq.com
 * @github: https://github.com/Fat-pig-Cui/majsoul-replay-editor
 */

import {player_datas, begin_tiles, player_tiles, all_data, actions} from './core/data';

import {clearProject, randomPaishan, mopai, qiepai, mingpai, zimingpai, hupai, huangpai, liuju} from './core/core';

import {setConfig, setDiscardTiles, setDealTiles, setPaishan, setRound, setScores} from './core/shortFunction';

import {setMuyuSeats, huanpai, dingque, kaipai, kaipaiLock} from './core/activityFunction';

import {normalMoqie, moqieLiqi, comboMopai, mingQiepai, zimoHu, moqieLiuju} from './core/simplifyFunction';

import {getLeftTileCnt, judgeTile, isEqualTile, decompose} from "./core/exportedUtils";
import {separate, calcHupai, calcTingpai, getLstAction} from './core/exportedUtils';

import {demoGame, setPlayGame, tenhou2Majsoul, reportYaku, reportYaku_yiji} from "./core/sample";

import {resetReplay} from "./core/override";

export type t_player_datas = typeof player_datas;
export type t_begin_tiles = typeof begin_tiles;
export type t_player_tiles = typeof player_tiles;
export type t_all_data = typeof all_data;
export type t_actions = typeof actions;
export type t_clearProject = typeof clearProject;
export type t_setConfig = typeof setConfig;
export type t_setDiscardTiles = typeof setDiscardTiles;
export type t_setDealTiles = typeof setDealTiles;
export type t_setPaishan = typeof setPaishan;
export type t_randomPaishan = typeof randomPaishan;
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
export type t_normalMoqie = typeof normalMoqie;
export type t_moqieLiqi = typeof moqieLiqi;
export type t_comboMopai = typeof comboMopai;
export type t_mingQiepai = typeof mingQiepai;
export type t_zimoHu = typeof zimoHu;
export type t_moqieLiuju = typeof moqieLiuju;
export type t_judgeTile = typeof judgeTile;
export type t_isEqualTile = typeof isEqualTile;
export type t_decompose = typeof decompose;
export type t_separate = typeof separate;
export type t_calcHupai = typeof calcHupai;
export type t_calcTingpai = typeof calcTingpai;
export type t_getLstAction = typeof getLstAction;
export type t_setScores = typeof setScores;
export type t_demoGame = typeof demoGame;
export type t_setPlayGame = typeof setPlayGame;
export type t_tenhou2Majsoul = typeof tenhou2Majsoul;
export type t_reportYaku = typeof reportYaku;
export type t_reportYaku_yiji = typeof reportYaku_yiji;
export type t_resetReplay = typeof resetReplay;

(window as any).player_datas = player_datas;
(window as any).begin_tiles = begin_tiles;
(window as any).player_tiles = player_tiles;
(window as any).all_data = all_data;
(window as any).actions = actions;
(window as any).clearProject = clearProject;
(window as any).setConfig = setConfig;
(window as any).setDiscardTiles = setDiscardTiles;
(window as any).setDealTiles = setDealTiles;
(window as any).setPaishan = setPaishan;
(window as any).randomPaishan = randomPaishan;
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
(window as any).normalMoqie = normalMoqie;
(window as any).moqieLiqi = moqieLiqi;
(window as any).comboMopai = comboMopai;
(window as any).mingQiepai = mingQiepai;
(window as any).zimoHu = zimoHu;
(window as any).moqieLiuju = moqieLiuju;
(window as any).judgeTile = judgeTile;
(window as any).isEqualTile = isEqualTile;
(window as any).decompose = decompose;
(window as any).separate = separate;
(window as any).calcHupai = calcHupai;
(window as any).calcTingpai = calcTingpai;
(window as any).getLstAction = getLstAction;
(window as any).setScores = setScores;
(window as any).demoGame = demoGame;
(window as any).setPlayGame = setPlayGame;
(window as any).tenhou2Majsoul = tenhou2Majsoul;
(window as any).reportYaku = reportYaku;
(window as any).reportYaku_yiji = reportYaku_yiji;
(window as any).resetReplay = resetReplay;
