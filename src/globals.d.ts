import type {
    t_player_datas,
    t_begin_tiles,
    t_player_tiles,
    t_all_data,
    t_clearProject,
    t_setConfig,
    t_setDiscardTiles,
    t_setDealTiles,
    t_setPaishan,
    t_randomPaishan,
    t_roundBegin,
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
    t_separateWithMoqie,
    t_separateWithParam,
    t_calcHupai,
    t_calcTingpai,
    t_getLstAction,
    t_setScores,
    t_resetReplay,
    t_reportYaku,
    t_reportYaku_yiji,
    t_protected_tiles,
    t_cmp
} from './main';

declare global {
    // 玩家的个人信息
    let player_datas: t_player_datas;
    // 玩家的起手
    let begin_tiles: t_begin_tiles;
    // 玩家当时的手牌
    let player_tiles: t_player_tiles;
    // 完成编辑后的所有信息集合
    let all_data: t_all_data;

    let clearProject: t_clearProject;
    let setConfig: t_setConfig;
    let setDiscardTiles: t_setDiscardTiles;
    let setDealTiles: t_setDealTiles;
    let setPaishan: t_setPaishan;
    let randomPaishan: t_randomPaishan;
    let roundBegin: t_roundBegin;
    let mopai: t_mopai;
    let qiepai: t_qiepai;
    let mingpai: t_mingpai;
    let zimingpai: t_zimingpai;
    let hupai: t_hupai;
    let huangpai: t_huangpai;
    let liuju: t_liuju;
    let setMuyuSeats: t_setMuyuSeats;
    let huanpai: t_huanpai;
    let dingque: t_dingque;
    let kaipai: t_kaipai;
    let kaipaiLock: t_kaipaiLock;
    let setRound: t_setRound;
    let getLeftTileCnt: t_getLeftTileCnt;
    let demoGame: t_demoGame;
    let normalMoqie: t_normalMoqie;
    let moqieLiqi: t_moqieLiqi;
    let comboMopai: t_comboMopai;
    let mingQiepai: t_mingQiepai;
    let zimoHu: t_zimoHu;
    let moqieLiuju: t_moqieLiuju;
    let judgeTile: t_judgeTile;
    let allEqualTiles: t_allEqualTiles;
    let isEqualTile: t_isEqualTile;
    let decompose: t_decompose;
    let separate: t_separate;
    let separateWithMoqie: t_separateWithMoqie;
    let separateWithParam: t_separateWithParam;
    let calcHupai: t_calcHupai;
    let calcTingpai: t_calcTingpai;
    let getLstAction: t_getLstAction;
    let setScores: t_setScores;
    let resetReplay: t_resetReplay;
    let reportYaku: t_reportYaku;
    let reportYaku_yiji: t_reportYaku_yiji;
    let protected_tiles: t_protected_tiles;
    let cmp: t_cmp;
}
