/**
 * @file: glue.ts - 胶水代码, 用于连接界面和核心逻辑
 * @author: GrandDawn, Fat-pig-Cui
 * @email: chubbypig@qq.com
 * @github: https://github.com/Fat-pig-Cui/majsoul-replay-editor
 */

import {
    delta_scores, hules_history, awaiting_tiles, hunzhiyiji_info, muyu_info, paishan, scores, yongchang_data,
    player_tiles, all_data, base_info
} from "./data";
import {is_chuanma, is_hunzhiyiji, is_muyu, is_xiakeshang, is_yongchang, is_zhanxing} from "./misc";
import {calcTingpai, getLeftTileCnt, getLstAction} from "./exportedUtils";
import {calcDoras, calcXiaKeShang, calcXun, getAllTingpai} from "./utils";

/**
 * 胶水代码: 开局
 * @param left_tile_count - 剩余牌数
 * @param fake_hash_code - 牌山虚假的 md5 或 sha256 码, 由下面 is_sha256 决定类型
 * @param opens - 配牌明牌: 明的牌
 * @param is_sha256 - 牌山是否包含起手
 */
export const addNewRound = (left_tile_count: number, fake_hash_code: string, opens: Opens, is_sha256: boolean): void => {
    pushAction('RecordNewRound', {
        chang: base_info.chang,
        ju: base_info.ju,
        ben: base_info.ben,
        ju_count: is_chuanma() ? all_data.all_actions.length : undefined,
        seat: base_info.ju,
        left_tile_count: left_tile_count,
        liqibang: base_info.liqibang,
        tiles0: player_tiles[0],
        tiles1: player_tiles[1],
        tiles2: player_tiles[2],
        tiles3: player_tiles[3],
        paishan: paishan.join(''),
        scores: scores,
        tingpai: !is_chuanma() ? getAllTingpai() : undefined,
        doras: calcDoras(),
        opens: opens,
        muyu: is_muyu() ? muyu_info : undefined,
        md5: !is_sha256 ? fake_hash_code : undefined,
        sha256: is_sha256 ? fake_hash_code : undefined,
        xia_ke_shang: is_xiakeshang() ? {score_coefficients: calcXiaKeShang()} : undefined,
    });
    calcXun();
};

/**
 * 胶水代码: 摸牌
 * @param seat - 摸牌的玩家
 * @param draw_card - 摸的牌
 * @param liqi - 刚立直玩家的立直信息
 * @param tile_state - 配牌明牌: 摸的牌是否是明牌
 * @param zhanxing_index - 占星之战: 摸的牌在候选池的位置
 * @param hunzhiyiji_data - 魂之一击: 魂之一击立直数据
 */
export const addDealTile = (seat: Seat, draw_card: Tile, liqi: Liqi, tile_state: boolean, zhanxing_index: AwaitingIndex, hunzhiyiji_data: HunzhiyijiInfo_Player): void => {
    pushAction('RecordDealTile', {
        seat: seat,
        tile: draw_card,
        left_tile_count: getLeftTileCnt(),
        liqi: liqi ? liqi : undefined,
        doras: calcDoras(),
        tile_state: tile_state ? tile_state : undefined,
        muyu: is_muyu() ? muyu_info : undefined,
        tile_index: is_zhanxing() ? zhanxing_index : undefined,
        hun_zhi_yi_ji_info: is_hunzhiyiji() ? hunzhiyiji_data : undefined,
    });
    calcXun();
};

/**
 * 胶水代码: 占星之战: 牌候选池填充
 * @param seat - 要摸牌的玩家
 * @param liqi - 刚立直玩家的立直信息
 */
export const addFillAwaitingTiles = (seat: Seat, liqi: Liqi): void => {
    pushAction('RecordFillAwaitingTiles', {
        operation: {seat: seat},
        awaiting_tiles: awaiting_tiles,
        left_tile_count: getLeftTileCnt(),
        liqi: liqi ? liqi : undefined,
        doras: calcDoras(),
    });
};

/**
 * 胶水代码: 切牌
 * @param seat - 切牌的玩家
 * @param tile - 切的牌
 * @param moqie - 是否为摸切
 * @param is_liqi - 是否立直
 * @param is_wliqi - 是否为双立直
 * @param is_kailiqi - 是否为开立直
 * @param tile_state - 配牌明牌: 切的牌是否为明的牌
 * @param beishui_type - 背水之战: 立直类型
 */
export const addDiscardTile = (seat: Seat, tile: Tile, moqie: boolean, is_liqi: boolean, is_wliqi: boolean, is_kailiqi: boolean, tile_state: boolean, beishui_type: BeishuiType): void => {
    pushAction('RecordDiscardTile', {
        seat: seat,
        tile: tile,
        moqie: moqie,
        is_liqi: is_liqi,
        is_wliqi: is_wliqi,
        is_kailiqi: is_kailiqi,
        doras: calcDoras(),
        tingpais: calcTingpai(seat),
        tile_state: tile_state ? tile_state : undefined,
        muyu: is_muyu() ? muyu_info : undefined,
        yongchang: is_yongchang() ? yongchang_data[seat] : undefined,
        hun_zhi_yi_ji_info: is_hunzhiyiji() && hunzhiyiji_info[seat].liqi && !hunzhiyiji_info[seat].overload ? hunzhiyiji_info[seat] : undefined,
        liqi_type_beishuizhizhan: is_liqi ? beishui_type : undefined,
    });
};

/**
 * 胶水代码: 暗夜之战暗牌
 * @param seat - 暗牌的玩家
 * @param tile - 切的牌
 * @param moqie - 是否为摸切
 * @param is_liqi - 是否立直
 * @param is_wliqi - 是否为双立直
 */
export const addRevealTile = (seat: Seat, tile: Tile, moqie: boolean, is_liqi: boolean, is_wliqi: boolean): void => {
    pushAction('RecordRevealTile', {
        seat: seat,
        tile: tile,
        moqie: moqie,
        is_liqi: is_liqi,
        is_wliqi: is_wliqi,
        liqibang: base_info.liqibang,
        scores: scores,
        tingpais: calcTingpai(seat),
    });
};

/**
 * 胶水代码: 暗夜之战锁牌
 * @param seat - 切牌的玩家
 * @param lock_state - 锁定状态, 0 为未锁定, 1 为锁定, 2 为无人开牌
 * @param tile - 切的牌
 */
export const addLockTile = (seat: Seat, lock_state: LockState, tile: Tile | '' = ''): void => {
    pushAction('RecordLockTile', {
        seat: seat,
        tile: tile,
        scores: scores,
        liqibang: base_info.liqibang,
        lock_state: lock_state,
    });
};

/**
 * 胶水代码: 暗夜之战开牌
 * @param seat - 开牌的玩家
 */
export const addUnveilTile = (seat: Seat): void => {
    pushAction('RecordUnveilTile', {
        seat: seat,
        scores: scores,
        liqibang: base_info.liqibang,
    });
};

/**
 * 胶水代码: 他家鸣牌(吃/碰/明杠)
 * @param seat - 鸣牌的玩家
 * @param fulu_tiles - 参与鸣牌的所有牌
 * @param tiles_from - 副露的牌来自哪些玩家
 * @param type - 操作类型, 0吃, 1碰, 2明杠
 * @param liqi - 刚立直玩家的立直信息
 * @param tile_states - 配牌明牌: 鸣出去的牌是否为明牌
 */
export const addChiPengGang = (seat: Seat, fulu_tiles: Tile[], tiles_from: Seat[], type: ChiPengGangType, liqi: Liqi, tile_states: boolean[]): void => {
    pushAction('RecordChiPengGang', {
        seat: seat,
        tiles: fulu_tiles,
        type: type,
        froms: tiles_from,
        liqi: liqi,
        scores: scores,
        tingpais: calcTingpai(seat),
        tile_states: tile_states,
        muyu: is_muyu() ? muyu_info : undefined,
        yongchang: is_yongchang() ? yongchang_data[tiles_from[tiles_from.length - 1]] : undefined,
        hun_zhi_yi_ji_info: is_hunzhiyiji() && hunzhiyiji_info[seat].liqi ? hunzhiyiji_info[tiles_from[tiles_from.length - 1]] : undefined,
    });
    calcXun();
};

/**
 * 胶水代码: 自家鸣牌(暗杠/加杠)
 * @param seat - 鸣牌的玩家
 * @param tile - 鸣的牌
 * @param ziming_type - 操作类型, 2加杠, 3暗杠
 * @param tile_states - 配牌明牌: 鸣出去的牌是否为明牌
 */
export const addAnGangAddGang = (seat: Seat, tile: Tile, ziming_type: ZiMingType, tile_states: boolean[]): void => {
    pushAction('RecordAnGangAddGang', {
        seat: seat,
        tiles: tile,
        type: ziming_type,
        doras: calcDoras(),
        tingpais: calcTingpai(seat),
        tile_states: tile_states,
    });
};

/**
 * 胶水代码: 自家鸣牌: 拔北
 * @param seat - 拔北的玩家
 * @param tile - 拔的牌
 * @param tile_states - 配牌明牌: 拔出去的牌是否为明牌
 */
export const addBaBei = (seat: Seat, tile: Tile, tile_states: boolean[]): void => {
    pushAction('RecordBaBei', {
        seat: seat,
        tile: tile,
        tile_states: tile_states,
        doras: calcDoras(),
        tingpais: calcTingpai(seat),
    });
};

/**
 * 胶水代码: 和牌
 * @param hule_info - 本次和牌所有的和牌信息
 * @param old_scores - 结算前分数
 * @param baopai_player - 包牌玩家, 注意和数值比 seat 大1
 */
export const endHule = (hule_info: HuleInfo[], old_scores: Players_Number, baopai_player: BaopaiPlayer): void => {
    pushAction('RecordHule', {
        hules: hule_info,
        old_scores: old_scores,
        delta_scores: delta_scores,
        scores: scores,
        baopai: baopai_player,
    });
};

/**
 * 胶水代码: 血战到底(修罗/川麻)中途和牌
 * @param hule_info - 本次和牌所有的和牌信息
 * @param old_scores - 结算前分数
 * @param liqi - 刚立直玩家的立直信息
 */
export const addHuleXueZhanMid = (hule_info: HuleInfo[], old_scores: Players_Number, liqi: Liqi): void => {
    pushAction('RecordHuleXueZhanMid', {
        hules: hule_info,
        old_scores: old_scores,
        delta_scores: delta_scores,
        scores: scores,
        liqi: liqi,
    });
};

/**
 * 胶水代码: 血战到底(修罗/川麻)完场和牌
 * @param hule_info - 本次和牌所有的和牌信息
 * @param old_scores - 结算前分数
 */
export const endHuleXueZhanEnd = (hule_info: HuleInfo[], old_scores: Players_Number): void => {
    pushAction('RecordHuleXueZhanEnd', {
        hules: hule_info,
        old_scores: old_scores,
        delta_scores: delta_scores,
        scores: scores,
        hules_history: hules_history,
    });
};

/**
 * 胶水代码: 自创函数: 血流成河中途和牌
 * @param hule_info - 本次和牌所有的和牌信息
 * @param old_scores - 结算前分数
 */
export const addHuleXueLiuMid = (hule_info: HuleInfo[], old_scores: Players_Number): void => {
    pushAction('RecordHuleXueLiuMid', {
        old_scores: old_scores,
        delta_scores: delta_scores,
        scores: scores,
        hules: hule_info,
        tingpais: getLstAction().name === 'RecordNewRound' ? calcTingpai(base_info.ju) : [],
        baopai: 0,
    });
};

/**
 * 胶水代码: 自创函数: 血流成河完场和牌
 * @param hule_info - 本次和牌所有的和牌信息
 * @param old_scores - 结算前分数
 */
export const endHuleXueLiuEnd = (hule_info: HuleInfo[], old_scores: Players_Number): void => {
    pushAction('RecordHuleXueLiuEnd', {
        old_scores: old_scores,
        delta_scores: delta_scores,
        scores: scores,
        hules: hule_info,
        hules_history: hules_history,
        baopai: 0,
    });
};


/**
 * 胶水代码: 荒牌流局
 * @param liujumanguan - 是否有流局满贯
 * @param ting_info - 玩家的听牌信息
 * @param scores_info - 结算相关信息
 */
export const endNoTile = (liujumanguan: boolean, ting_info: TingInfo, scores_info: ScoresInfo): void => {
    pushAction('RecordNoTile', {
        scores: scores_info,
        players: ting_info,
        liujumanguan: liujumanguan,
        hules_history: hules_history,
    });
};

/**
 * 胶水代码: 途中流局
 * @param type - 流局的类型
 * @param seat - 最后操作的玩家, 只有在九种九牌和三家和了有效
 * @param liqi - 立直信息
 * @param tiles - 玩家的手牌, 只有在九种九牌有效
 * @param allplayertiles - 所有玩家的手牌, 只有在四家立直和三家和了有效
 */
export const endLiuJu = (type: LiujuType, seat: Seat, liqi: Liqi, tiles: Tile[], allplayertiles: string[]): void => {
    pushAction('RecordLiuJu', {
        type: type,
        seat: type === 1 || type === 5 ? seat : undefined,
        liqi: liqi != null ? liqi : undefined,
        tiles: type === 1 ? tiles : undefined,
        allplayertiles: type === 4 || type === 5 ? allplayertiles : undefined,
        hules_history: hules_history,
    });
};

/**
 * 胶水代码: 换三张换牌
 * @param change_tile_infos - 换三张主体信息
 * @param type - 换牌方式, 0: 逆时针, 1: 对家, 2: 顺时针
 */
export const addChangeTile = (change_tile_infos: ChangeTileInfo, type: HuanpaiType): void => {
    pushAction('RecordChangeTile', {
        change_tile_infos: change_tile_infos,
        change_type: type,
        doras: calcDoras(),
        tingpai: !is_chuanma() ? getAllTingpai() : undefined,
        operations: [],
    });
};

/**
 * 胶水代码: 川麻: 定缺
 * @param gap_types - 所有玩家的定缺
 */
export const addSelectGap = (gap_types: Gaps): void => {
    pushAction('RecordSelectGap', {
        gap_types: gap_types,
        tingpai: getAllTingpai(),
    });
};

/**
 * 胶水代码: 川麻: 刮风下雨
 * @param old_scores - 结算前分数
 */
export const addGangResult = (old_scores: Players_Number): void => {
    pushAction('RecordGangResult', {
        gang_infos: {
            old_scores: old_scores,
            delta_scores: delta_scores,
            scores: scores,
        }
    });
};

/**
 * 胶水代码: 川麻: 刮风下雨完场
 * @param old_scores - 结算前分数
 */
export const addGangResultEnd = (old_scores: Players_Number): void => {
    pushAction('RecordGangResultEnd', {
        gang_infos: {
            old_scores: old_scores,
            delta_scores: delta_scores,
            scores: scores,
            hules_history: hules_history,
        },
    });
};

/**
 * 胶水代码: 自创函数, 国标错和配打
 * @param seat - 错和的玩家
 * @param zimo - 是否为自摸
 * @param old_scores - 结算前分数
 */
export const addCuohu = (seat: Seat, zimo: boolean, old_scores: Players_Number): void => {
    pushAction('RecordCuohu', {
        cuohu_info: {
            seat: seat,
            zimo: zimo,
            old_scores: old_scores,
            delta_scores: delta_scores,
            scores: scores,
        },
    });
};

/**
 * 胶水代码: 记录操作, 由上面所有的胶水函数调用
 * @param name
 * @param data
 */
const pushAction = (name: string, data: any): void => {
    all_data.cur_actions.push(JSON.parse(JSON.stringify({name: name, data: data})));
};
