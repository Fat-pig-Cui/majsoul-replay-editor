declare var checkPaiPu: Function, resetData: Function, OnChoosedPai: Function, seat2LocalPosition: Function, localPosition2Seat: Function;
declare const player_datas: PlayerDatas;
declare const begin_tiles: [string, string, string?, string?];
declare const player_tiles: Players_TileArray;
declare const all_data: AllData;
declare const clearProject: () => void;
declare const setConfig: (c: Config) => void;
declare const setDiscardTiles: (tiles: Players_String) => void;
declare const setDealTiles: (tiles: Players_String) => void;
declare const setPaishan: (ps: string) => void;
declare let randomPaishan: (ps_head?: string, ps_back?: string) => void;
declare const roundBegin: () => void;
declare let mopai: (...args: any[]) => void;
declare let qiepai: (...args: any[]) => void;
declare let mingpai: (...args: any[]) => void;
declare let zimingpai: (...args: any[]) => void;
declare let hupai: (...args: any[]) => void;
declare let huangpai: () => void;
declare let liuju: (liuju_type?: LiujuType) => void;
declare const setMuyuSeats: (m_seats: MuyuSeats) => void;
declare const huanpai: (tls: string[], type: HuanpaiType) => void;
declare const dingque: (x: GapsInput) => void;
declare let kaipai: (seat: Seat) => void;
declare let kaipaiLock: (seat: Seat) => void;
declare const setRound: (c: Seat, j: Seat, b: number) => void;
declare const getLeftTileCnt: () => number;
declare const demoGame: () => void;
declare const normalMoqie: (tile_cnt?: Tile | number) => void;
declare const moqieLiqi: (tile_cnt?: Tile | number) => void;
declare const comboMopai: (tile_cnt?: Tile | number) => void;
declare const mingQiepai: (tls_cnt?: string | number) => void;
declare const zimoHu: (flag?: boolean) => void;
declare const moqieLiuju: () => void;
declare const judgeTile: (tile: Tile, type: string) => boolean;
declare const allEqualTiles: (tile: Tile) => Tile[];
declare const isEqualTile: (x: Tile, y: Tile) => boolean;
declare const decompose: (tiles: string) => string;
declare const separate: (tiles: string | Tile[]) => Tile[];
declare const separateWithMoqie: (tiles: string | TileWithMoqie[]) => TileWithMoqie[];
declare const separateWithParam: (tiles: string | TileWithParam[]) => TileWithParam[];
declare const calcHupai: (tiles: Tile[], type?: boolean) => number;
declare const calcTingpai: (seat: Seat, type?: boolean) => {
    tile: Tile;
}[];
declare const getLstAction: (num?: number) => Action;
declare const setScores: (s: Players_Number) => void;
declare const resetReplay: () => void;
declare let config: Config;
declare let paishan: Tile[];
declare let scores: Players_Number;
declare let player_cnt: PlayerNum;
declare let liqi_need: number;
declare let chang: Seat, ju: Seat, ben: number, liqibang: number, benchangbang: number;
declare let discard_tiles: Players_TileMoqieArray, deal_tiles: Players_TileMoqieArray;
declare let fulu: Fulu;
declare let paihe: Paihe;
declare let liqi_info: LiqiInfo;
declare let lst_liqi: LstLiqi;
declare let doras: Doras, li_doras: Doras;
declare let dora_cnt: DoraCnt;
declare let delta_scores: Players_Number;
declare let base_points: number;
declare let draw_type: 0 | 1, lst_draw_type: 0 | 1;
declare let actions: Actions;
declare let hules_history: HuleInfo[];
declare let huled: Players_Boolean;
declare let baopai: Baopai;
declare let xun: Players_NumberArray;
declare let players: Players;
declare let sigang_bao: [boolean, boolean, boolean?, boolean?];
declare let baogang_seat: -1 | Seat;
declare let mingpais: Players_NumberArray;
declare let muyu_seats: MuyuSeats;
declare let muyu: Muyu;
declare let muyu_times: [1 | 2, 1 | 2, (1 | 2)?, (1 | 2)?];
declare let ju_cnt: -1 | Seat;
declare let gaps: Gaps;
declare let chuanma_gangs: ChuanmaGangs;
declare let spell_hourglass: Players_Number;
declare let hunzhiyiji_info: HunzhiyijiInfo;
declare let shoumoqie: Players_BooleanArray;
declare let yongchang_data: YongChangData;
declare let awaiting_tiles: [Tile?, Tile?, Tile?];
declare let lianzhuang_cnt: number;
declare let cuohu: [boolean, boolean, boolean, boolean];
declare let protected_tiles: {
    seat: number;
    tiles: string[];
};
declare let pretongxunzt: Players_Boolean, prelizhizt: Players_Boolean, shezhangzt: Players_Boolean, tongxunzt: Players_Boolean, lizhizt: Players_Boolean, zhenting: Players_Boolean;
declare let game_begin_once: boolean;
declare const gameBegin: () => void;
declare const init: () => void;
declare const calcXun: () => void;
declare const calcDoras: () => Doras;
declare const tile2Int: (tile: Tile, type?: boolean, is_SP_tile?: boolean) => number;
declare const int2Tile: (x: number, type?: boolean) => Tile;
declare const cmp: (x: Tile, y: Tile) => number;
declare const randomCmp: () => number;
declare const inTiles: (x: Tile | Tile[], y: Tile[]) => boolean;
declare const updateShezhangzt: (seat: Seat) => void;
declare const updatePrezhenting: (seat: Seat, tile: Tile, is_angang?: boolean) => void;
declare const updateZhenting: () => void;
declare const isTile: (tile: string) => boolean;
declare const lstLiqi2Liqi: (type?: boolean) => Liqi;
declare const getAllTingpai: () => {
    seat: number;
    tingpais1: {
        tile: string;
    }[];
}[];
declare const push2PlayerTiles: (seat: Seat) => void;
declare const fulu2Ming: (seat: Seat) => string[];
declare const eraseMingpai: (seat: Seat, tile: Tile) => boolean;
declare const updateMuyu: (type?: boolean) => void;
declare const huazhu: (seat: Seat) => boolean;
declare const isDora: (tile: Tile) => boolean;
declare const calcTianming: (seat: Seat, zimo: boolean) => number;
declare const updateShoumoqie: (seat: Seat) => void;
declare const calcXiaKeShang: () => [number, number, number, number];
declare let huleOnePlayer: (seat: Seat) => HuleInfo;
declare let huleOnePlayerChuanma: (seat: Seat) => HuleInfo;
declare let huleOnePlayerGuobiao: (seat: Seat) => HuleInfo;
declare const calcFan: (seat: Seat, zimo: boolean, fangchong?: Seat) => CalcFanRet;
declare const calcFanChuanma: (seat: Seat, zimo: boolean, type?: boolean) => CalcFanRet;
declare const calcFanGuobiao: (seat: Seat, zimo: boolean) => CalcFanRet;
declare const calcSudian: (x: CalcFanRet, type?: number) => number;
declare const calcSudianChuanma: (x: CalcFanRet, type?: number) => number;
declare const calcSudianGuobiao: (x: CalcFanRet, no_huapai?: boolean) => number;
declare const calcGangPoint: (type?: boolean) => void;
declare const roundEnd: () => void;
declare const gameEnd: () => void;
declare const roundInfo: () => string;
declare let addNewRound: (left_tile_count: number, fake_hash_code: string, opens: Opens, is_sha256: boolean) => void;
declare let addDealTile: (seat: Seat, draw_card: Tile, liqi: Liqi, tile_state: boolean, zhanxing_index: AwaitingIndex, hunzhiyiji_data: HunzhiyijiInfo_Player) => void;
declare let addFillAwaitingTiles: (seat: Seat, liqi: Liqi) => void;
declare let addDiscardTile: (seat: Seat, tile: Tile, moqie: boolean, is_liqi: boolean, is_wliqi: boolean, is_kailiqi: boolean, tile_state: boolean, beishui_type: BeishuiType) => void;
declare let addRevealTile: (seat: Seat, tile: Tile, moqie: boolean, is_liqi: boolean, is_wliqi: boolean) => void;
declare let addLockTile: (seat: Seat, lock_state: LockState, tile?: Tile | "") => void;
declare let addUnveilTile: (seat: Seat) => void;
declare let addChiPengGang: (seat: Seat, split_tiles: Tile[], froms: Seat[], type: ChiPengGangType, liqi: Liqi, tile_states: boolean[]) => void;
declare let addAnGangAddGang: (seat: Seat, tile: Tile, ziming_type: ZiMingType, tile_states: boolean[]) => void;
declare let addBaBei: (seat: Seat, tile: Tile, tile_states: boolean[]) => void;
declare let endHule: (hule_info: HuleInfo[], old_scores: Players_Number, baopait: BaopaiT) => void;
declare let addHuleXueZhanMid: (hule_info: HuleInfo[], old_scores: Players_Number, liqi: Liqi) => void;
declare let endHuleXueZhanEnd: (hule_info: HuleInfo[], old_scores: Players_Number) => void;
declare let addHuleXueLiuMid: (hule_info: HuleInfo[], old_scores: Players_Number) => void;
declare let endHuleXueLiuEnd: (hule_info: HuleInfo[], old_scores: Players_Number) => void;
declare let endNoTile: (liujumanguan: boolean, ting_info: TingInfo, scores_info: ScoresInfo) => void;
declare let endLiuJu: (type: LiujuType, seat: Seat, liqi: Liqi, tiles: Tile[], allplayertiles: string[]) => void;
declare let addChangeTile: (change_tile_infos: ChangeTileInfo, type: HuanpaiType) => void;
declare let addSelectGap: (gap_types: Gaps) => void;
declare let addGangResult: (old_scores: Players_Number) => void;
declare let addGangResultEnd: (old_scores: Players_Number) => void;
declare let addCuohu: (seat: Seat, zimo: boolean, old_scores: Players_Number) => void;
declare const get_tablecloth_id: () => number;
declare const get_mjp_id: () => number;
declare const get_mjpsurface_id: () => number;
declare const get_init_point: () => number;
declare const get_aka_cnt: () => number;
declare const get_fanfu: () => number;
declare const get_chang_ju_ben_num: () => [Seat, Seat, number, number?];
declare const get_init_scores: () => Players_Number | [];
declare const get_mainrole_seat: () => Seat | -1;
declare const is_xuezhandaodi: () => boolean;
declare const is_chuanma: () => boolean;
declare const is_dora3: () => boolean;
declare const is_begin_open: () => boolean;
declare const is_muyu: () => boolean;
declare const is_mingjing: () => boolean;
declare const is_anye: () => boolean;
declare const is_field_spell: () => boolean;
declare const get_field_spell_mode1: () => FieldSpellNumber;
declare const get_field_spell_mode2: () => FieldSpellNumber;
declare const get_field_spell_mode3: () => FieldSpellNumber;
declare const is_zhanxing: () => boolean;
declare const is_tianming: () => boolean;
declare const is_yongchang: () => boolean;
declare const is_hunzhiyiji: () => boolean;
declare const is_wanxiangxiuluo: () => boolean;
declare const is_beishuizhizhan: () => boolean;
declare const is_xiakeshang: () => boolean;
declare const is_xueliu: () => boolean;
declare const is_guyi: () => boolean;
declare const is_yifanjieguyi: () => boolean;
declare const no_shiduan: () => boolean;
declare const no_zimosun: () => boolean;
declare const is_openhand: () => boolean;
declare const get_liqi_need: () => number;
declare const get_ben_times: () => number;
declare const get_fafu_1ting: () => number;
declare const get_fafu_2ting: () => number;
declare const get_fafu_3ting: () => number;
declare const get_fafu_3p_1ting: () => number;
declare const get_fafu_3p_2ting: () => number;
declare const get_fafu_2p: () => number;
declare const is_qieshang: () => boolean;
declare const is_toutiao: () => boolean;
declare const is_renhumanguan: () => boolean;
declare const no_normalbaopai: () => boolean;
declare const is_sigangbaopai: () => boolean;
declare const no_liujumanguan: () => boolean;
declare const no_yifa: () => boolean;
declare const no_lianfengsifu: () => boolean;
declare const no_dora: () => boolean;
declare const no_lidora: () => boolean;
declare const no_gangdora: () => boolean;
declare const no_ganglidora: () => boolean;
declare const is_dora_jifan: () => boolean;
declare const is_sanxiangliuju: () => boolean;
declare const no_leijiyiman: () => boolean;
declare const no_wyakuman: () => boolean;
declare const no_guoshiangang: () => boolean;
declare const is_fufenliqi: () => boolean;
declare const is_baogang: () => boolean;
declare const is_qingtianjing: () => boolean;
declare const no_zhenting: () => boolean;
declare const is_ronghuzhahu: () => boolean;
declare const is_tiandichuangzao: () => boolean;
declare const is_wanwushengzhang: () => boolean;
declare const is_mopai_paishan: () => boolean;
declare const is_heqie_mode: () => boolean;
declare const is_guobiao: () => boolean;
declare const is_guobiao_huapai: () => boolean;
declare const is_guobiao_no_8fanfu: () => boolean;
declare const is_guobiao_lianzhuang: () => boolean;
declare const scale_points: () => number;
declare const cuohu_points: () => number;
declare const is_cuohupeida: () => boolean;
declare const is_random_skin: () => boolean;
declare const is_random_views: () => boolean;
declare const views_pool: {
    [p: number]: number[];
}, invalid_views: {
    [p: number]: number[];
};
declare const updateViews: () => void;
declare const DIYFans: () => void;
declare const guobiaoFans: () => void;
declare let inst_once: boolean;
declare const editOnline: () => void;
declare const editOffline: () => void;
declare const optimizeFunction: () => void;
declare class Constants {
    static readonly QIN_TILE_NUM = 14;
    static readonly XIAN_TILE_NUM = 13;
    static readonly SPT_SUFFIX = "t";
    static readonly SPT_OFFSET = 40;
    static readonly GB_BASE_FAN = 8;
    static readonly TBD = "bd";
    static readonly HUAPAI = "0m";
    static readonly CBD = 0;
    static readonly TILE_NUM: Readonly<{
        C1m: 1;
        C9m: 9;
        C1p: 10;
        C9p: 18;
        C1s: 19;
        C9s: 27;
        C1z: 28;
        C4z: 31;
        C5z: 32;
        C7z: 34;
        C0m: 35;
        C0p: 36;
        C0s: 37;
        C5m: 5;
        C5p: 14;
        C5s: 23;
    }>;
    static readonly NXT2: readonly number[];
    static readonly DORA_NXT: readonly number[];
}
declare var editFunction: Function, editFunction2: Function, cfg: Cfg_Type, view: View_Type, GameMgr: GameMgr_Type, uiscript: UIScript_Type;
declare type Cfg_Type = {
    item_definition: {
        item: {
            rows_: {
                id: number;
                name_chs: string;
                category: number;
                type: number;
            }[];
        };
        title: {
            rows_: {
                id: number;
                name_chs: string;
                category: number;
                type: number;
            }[];
        };
        skin: {
            map_: {
                id: number;
                character_id: number;
            }[];
            rows_: {
                id: number;
                character_id: number;
            }[];
        };
    };
    fan: {
        fan: {
            map_: {
                id: number;
                name_chs: string;
                name_chs_t: string;
                name_jp: string;
                name_en: string;
                fan_menqing: number;
                fan_fulu: number;
                show_index: number;
                sound: string;
            }[];
        };
    };
};
declare type View_Type = {
    DesktopMgr?: {
        Inst?: {
            seat: Seat;
            active: boolean;
        };
        prototype: {
            seat2LocalPosition: Function;
            localPosition2Seat: Function;
        };
    };
    ViewPai: {
        prototype: {
            OnChoosedPai: Function;
        };
    };
};
declare type GameMgr_Type = {
    Inst: {
        checkPaiPu: Function;
    };
};
declare type UIScript_Type = {
    UI_Replay: {
        prototype: {
            resetData: Function;
        };
        Inst: {
            rounds: {
                actions: Actions;
                xun: number[];
            }[];
            gameResult: {
                result: {
                    players: Players;
                };
            };
        };
    };
    UI_Sushe: {
        now_desktop_id: number;
        now_mjp_id: number;
        now_mjp_surface_id: number;
    };
};
type HonorNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7;
type OrdinalNumber = 0 | HonorNumber | 8 | 9;
type HonorType = 'z';
type OrdinalType = 'm' | 'p' | 's';
type HonorTile = `${HonorNumber}${HonorType}${'' | typeof Constants.SPT_SUFFIX}`;
type OrdinalTile = `${OrdinalNumber}${OrdinalType}${'' | typeof Constants.SPT_SUFFIX}`;
type Tile = HonorTile | OrdinalTile | typeof Constants.TBD;
type TileWithMoqie = Tile | '..';
type TileWithParam = TileWithMoqie | 'YY' | 'DD' | 'TT' | 'HH' | 'MM' | 'PP' | 'SS';
type Seat = 0 | 1 | 2 | 3;
type PlayerNum = 2 | 3 | 4;
type ChiPengGangType = 0 | 1 | 2;
type ZiMingType = 2 | 3;
type LiujuType = 1 | 2 | 3 | 4 | 5;
type BaopaiT = Seat | 4;
type HuanpaiType = 0 | 1 | 2;
type LockState = 0 | 1 | 2;
type FieldSpellNumber = 0 | 1 | 2 | 3 | 4 | 5;
type AwaitingIndex = 0 | 1 | 2;
type BeishuiType = 0 | 1 | 2;
type FuLuType = 0 | 1 | 2 | 3 | 4;
type PartitionType = FuLuType | 5 | 6 | 7 | 8;
type DoraCntType = 0 | 1 | 2 | 3 | 4 | 5;
type Config = {
    category: number;
    meta: {
        mode_id?: number;
        room_id?: number;
    };
    mode: {
        mode: number;
        detail_rule: {
            _tablecloth_id?: number;
            _mjp_id?: number;
            _mjpsurface_id?: number;
            init_point?: number;
            dora_count?: number;
            fanfu?: number;
            _chang_ju_ben_num_?: [Seat, Seat, number, number?];
            _scores_?: [number, number, number?, number?];
            _mainrole_?: Seat;
            xuezhandaodi?: boolean;
            chuanma?: boolean;
            dora3_mode?: boolean;
            begin_open_mode?: boolean;
            muyu_mode?: boolean;
            jiuchao_mode?: boolean;
            reveal_discard?: boolean;
            field_spell_mode?: number;
            zhanxing?: boolean;
            tianming_mode?: boolean;
            yongchang_mode?: boolean;
            hunzhiyiji_mode?: boolean;
            wanxiangxiuluo_mode?: boolean;
            beishuizhizhan_mode?: boolean;
            amusement_switches?: number[];
            _xueliu?: boolean;
            guyi_mode?: boolean;
            _yifanjieguyi?: boolean;
            _no_shiduan?: boolean;
            _no_zimosun?: boolean;
            open_hand?: boolean;
            _liqi_need?: number;
            _ben_times?: number;
            _fafu_1ting?: number;
            _fafu_2ting?: number;
            _fafu_3ting?: number;
            _fafu_3p_1ting?: number;
            _fafu_3p_2ting?: number;
            _fafu_2p?: number;
            _qieshangmanguan?: boolean;
            _toutiao?: boolean;
            _renhumanguan?: boolean;
            _no_normalbaopai?: boolean;
            _sigangbaopai?: boolean;
            _no_liujumanguan?: boolean;
            _no_yifa?: boolean;
            _no_lianfengsifu?: boolean;
            _no_dora?: boolean;
            _no_lidora?: boolean;
            _no_gangdora?: boolean;
            _no_ganglidora?: boolean;
            _dora_jifan?: boolean;
            _sanxiangliuju?: boolean;
            _no_leijiyiman?: boolean;
            _no_wyakuman?: boolean;
            _no_guoshiangang?: boolean;
            _fufenliqi?: boolean;
            _baogang?: boolean;
            _qingtianjing?: boolean;
            _no_zhenting?: boolean;
            _ronghuzhahu?: boolean;
            _tiandichuangzao?: boolean;
            _wanwushengzhang?: boolean;
            _mopai_paishan?: boolean;
            _heqie_mode?: boolean;
            _guobiao?: boolean;
            _guobiao_huapai?: boolean;
            _guobiao_no_8fanfu?: boolean;
            _guobiao_lianzhuang?: boolean;
            _scale_points?: number;
            _cuohu_points?: number;
            _cuohupeida?: boolean;
            _random_skin?: boolean;
            _random_views?: boolean;
        };
    };
};
type FuluInfo = {
    type: FuLuType;
    tile: Tile[];
    from?: Seat;
};
type Partition = {
    type: PartitionType;
    tile: Tile[];
}[];
type LstLiqi = {
    seat: Seat;
    liqi: number;
    kai: boolean;
    beishui_type?: BeishuiType;
    xia_ke_shang?: {
        score_coefficients: Players_Number;
    };
};
type Liqi = {
    seat: Seat;
    liqibang: number;
    score: number;
    liqi_type_beishuizhizhan?: BeishuiType;
    xia_ke_shang?: {
        score_coefficients: Players_Number;
    };
    failed?: boolean;
};
type DoraCnt = {
    cnt: DoraCntType;
    licnt: DoraCntType;
    lastype: number;
    bonus?: number;
};
type ActionData = {
    seat?: Seat;
    tile?: Tile;
    tiles?: Tile;
    hules?: HuleInfo[];
    left_tile_count?: number;
    type?: number;
    is_liqi?: boolean;
    lock_state?: 0 | 1 | 2;
};
type BaopaiInfo = {
    seat: Seat;
    val: number;
};
type Muyu = {
    id: number;
    seat: Seat;
    count: 0 | 1 | 2 | 3 | 4 | 5;
    count_max: 5;
};
type ChuanmaGangInfo = {
    from: Seat;
    to: Seat;
    val: number;
};
type ChuanmaGangs = {
    over: ChuanmaGangInfo[];
    notover: [ChuanmaGangInfo?];
};
type Paihe_Player = {
    liujumanguan: boolean;
    tiles: Tile[];
};
type PlayerDatas_Player = {
    nickname: string;
    avatar_id: number;
    account_id?: number;
    character?: {
        charid?: number;
        level?: number;
        exp?: number;
        skin?: number;
        is_upgraded?: boolean;
        extra_emoji?: number[];
    };
    seat?: Seat;
    level?: {
        id: number;
        score: number;
    };
    level3?: {
        id: number;
        score: number;
    };
    title?: number;
    avatar_frame?: number;
    verified?: number;
    views?: {
        slot: number;
        item_id: number;
    }[];
};
type LiqiInfo_Player = {
    liqi: number;
    yifa: number;
    kai: boolean;
    beishui_type?: BeishuiType;
    xia_ke_shang?: {
        score_coefficients: Players_Number;
    };
};
type Player_Player = {
    seat: Seat;
    gold: number;
    grading_score: number;
    part_point_1: number;
    part_point_2: number;
    total_point: number;
};
type HunzhiyijiInfo_Player = {
    seat: Seat;
    liqi: number;
    continue_deal_count: 0 | 1 | 2 | 3 | 4 | 5 | 6;
    overload: boolean;
};
type YongChangData_Player = {
    seat: Seat;
    moqie_count: number;
    moqie_bonus: number;
    shouqie_count: number;
    shouqie_bonus: number;
};
type Players_Number = [number, number, number?, number?];
type Players_NumberArray = [number[], number[], number[]?, number[]?];
type Players_String = [string, string, string?, string?];
type Players_TileArray = [Tile[], Tile[], Tile[]?, Tile[]?];
type Players_TileMoqieArray = [TileWithMoqie[], TileWithMoqie[], TileWithMoqie[]?, TileWithMoqie[]?];
type Players_Boolean = [boolean, boolean, boolean?, boolean?];
type Players_BooleanArray = [boolean[], boolean[], boolean[]?, boolean[]?];
type PlayerDatas = [PlayerDatas_Player, PlayerDatas_Player, PlayerDatas_Player?, PlayerDatas_Player?];
type Fulu = [FuluInfo[], FuluInfo[], FuluInfo[]?, FuluInfo[]?];
type Paihe = [Paihe_Player, Paihe_Player, Paihe_Player?, Paihe_Player?];
type LiqiInfo = [LiqiInfo_Player, LiqiInfo_Player, LiqiInfo_Player?, LiqiInfo_Player?];
type Baopai = [BaopaiInfo[], BaopaiInfo[], BaopaiInfo[]?, BaopaiInfo[]?];
type Players = [Player_Player, Player_Player, Player_Player?, Player_Player?];
type HunzhiyijiInfo = [HunzhiyijiInfo_Player, HunzhiyijiInfo_Player, HunzhiyijiInfo_Player?, HunzhiyijiInfo_Player?];
type YongChangData = [YongChangData_Player, YongChangData_Player, YongChangData_Player?, YongChangData_Player?];
type GapInputType = OrdinalType;
type GapsInput = `${GapInputType}${GapInputType}${GapInputType}${GapInputType}`;
type GapType = 0 | 1 | 2;
type Gaps = [GapType, GapType, GapType, GapType];
type Doras = [Tile?, Tile?, Tile?, Tile?, Tile?];
type ActionName = 'RecordNewRound' | 'RecordDealTile' | 'RecordFillAwaitingTiles' | 'RecordDiscardTile' | 'RecordRevealTile' | 'RecordLockTile' | 'RecordUnveilTile' | 'RecordChiPengGang' | 'RecordAnGangAddGang' | 'RecordBaBei' | 'RecordHule' | 'RecordHuleXueZhanMid' | 'RecordHuleXueZhanEnd' | 'RecordHuleXueLiuMid' | 'RecordHuleXueLiuEnd' | 'RecordNoTile' | 'RecordLiuJu' | 'RecordChangeTile' | 'RecordSelectGap' | 'RecordGangResult' | 'RecordGangResultEnd' | 'RecordCuohu';
type Action = {
    name: ActionName;
    data: ActionData;
};
type Actions = Action[];
type ZiMingInputType = 'angang' | 'jiagang' | 'babei' | 'baxi';
type MuyuSeats = `` | `${Seat}` | `${Seat}${Seat}` | `${Seat}${Seat}${Seat}` | `${Seat}${Seat}${Seat}${Seat}` | `${Seat}${Seat}${Seat}${Seat}${Seat}` | `${Seat}${Seat}${Seat}${Seat}${Seat}${Seat}`;
type HuleInfo = {
    count: number;
    doras: Doras;
    li_doras: Doras;
    fans: FansType;
    fu: number;
    hand: Tile[];
    hu_tile: Tile;
    liqi: boolean;
    ming: string[];
    point_rong?: number;
    point_sum?: number;
    point_zimo_qin?: number;
    point_zimo_xian?: number;
    qinjia: boolean;
    seat: Seat;
    title_id: number;
    yiman: boolean;
    zimo: boolean;
    dadian?: number;
    tianming_bonus?: number;
    xia_ke_shang_coefficient?: number;
    cuohu?: boolean;
};
type FansType = {
    id: number;
    val: number;
}[];
type TypeCnt = [number, number, number, number, number, number, number, number][];
type CalcFanRet = {
    yiman?: boolean;
    fans: FansType;
    fu: number;
    dora_bonus?: number;
};
type Open_Player = {
    seat: Seat;
    tiles: string[];
    count: number[];
};
type Opens = [Open_Player, Open_Player, Open_Player?, Open_Player?];
type TingInfo = {
    tingpai: boolean;
    hand: Tile[];
    tings: {
        tile: Tile;
    }[];
}[];
type ScoresInfo = {
    seat?: Seat;
    score?: number;
    old_scores: Players_Number;
    delta_scores: Players_Number;
    hand?: Tile[];
    ming?: string[];
    doras?: Doras;
    taxes?: [number, number, number, number];
}[];
type ChangeTileInfo_Player = {
    out_tiles: [Tile, Tile, Tile];
    out_tile_states: [number, number, number];
    in_tiles: [Tile, Tile, Tile];
    in_tile_states: [number, number, number];
};
type ChangeTileInfo = [ChangeTileInfo_Player, ChangeTileInfo_Player, ChangeTileInfo_Player, ChangeTileInfo_Player];
type AllData = {
    actions: Actions[];
    xun: Players_NumberArray[];
    config: Config;
    player_datas: PlayerDatas;
    players: Players;
};
