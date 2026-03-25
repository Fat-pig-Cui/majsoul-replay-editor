import type {
    t_player_datas,
    t_begin_tiles,
    t_player_tiles,
    t_all_data,
    t_actions,
    t_clearProject,
    t_setConfig,
    t_setDiscardTiles,
    t_setDealTiles,
    t_setPaishan,
    t_randomPaishan,
    t_mopai,
    t_qiepai,
    t_mingpai,
    t_zimingpai,
    t_hupai,
    t_huangpai,
    t_liuju,
    t_setMuyuSeats,
    t_huanpai,
    t_dingque,
    t_kaipai,
    t_kaipaiLock,
    t_setRound,
    t_getLeftTileCnt,
    t_demoGame,
    t_setPlayGame,
    t_normalMoqie,
    t_moqieLiqi,
    t_comboMopai,
    t_mingQiepai,
    t_zimoHu,
    t_moqieLiuju,
    t_judgeTile,
    t_allEqualTiles,
    t_isEqualTile,
    t_decompose,
    t_separate,
    t_calcHupai,
    t_calcTingpai,
    t_getLstAction,
    t_setScores,
    t_resetReplay,
    t_reportYaku,
    t_reportYaku_yiji,
} from './main';

declare global {
    // 玩家的个人信息
    const player_datas: t_player_datas;
    // 玩家的起手
    const begin_tiles: t_begin_tiles;
    // 玩家当时的手牌
    const player_tiles: t_player_tiles;
    // 完成编辑后的所有信息集合
    const all_data: t_all_data;
    // 当前对局的所有信息集合
    const actions: t_actions;

    const clearProject: t_clearProject;
    const setConfig: t_setConfig;
    const setDiscardTiles: t_setDiscardTiles;
    const setDealTiles: t_setDealTiles;
    const setPaishan: t_setPaishan;
    const randomPaishan: t_randomPaishan;
    const mopai: t_mopai;
    const qiepai: t_qiepai;
    const mingpai: t_mingpai;
    const zimingpai: t_zimingpai;
    const hupai: t_hupai;
    const huangpai: t_huangpai;
    const liuju: t_liuju;
    const setMuyuSeats: t_setMuyuSeats;
    const huanpai: t_huanpai;
    const dingque: t_dingque;
    const kaipai: t_kaipai;
    const kaipaiLock: t_kaipaiLock;
    const setRound: t_setRound;
    const getLeftTileCnt: t_getLeftTileCnt;
    const demoGame: t_demoGame;
    const setPlayGame: t_setPlayGame;
    const normalMoqie: t_normalMoqie;
    const moqieLiqi: t_moqieLiqi;
    const comboMopai: t_comboMopai;
    const mingQiepai: t_mingQiepai;
    const zimoHu: t_zimoHu;
    const moqieLiuju: t_moqieLiuju;
    const judgeTile: t_judgeTile;
    const allEqualTiles: t_allEqualTiles;
    const isEqualTile: t_isEqualTile;
    const decompose: t_decompose;
    const separate: t_separate;
    const calcHupai: t_calcHupai;
    const calcTingpai: t_calcTingpai;
    const getLstAction: t_getLstAction;
    const setScores: t_setScores;
    const resetReplay: t_resetReplay;
    const reportYaku: t_reportYaku;
    const reportYaku_yiji: t_reportYaku_yiji;
}
