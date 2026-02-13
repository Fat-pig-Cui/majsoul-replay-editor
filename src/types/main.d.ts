// 兼容 TypeScript 语法的声明
declare var editFunction: Function, editFunction2: Function, cfg: Cfg_Type, view: View_Type, GameMgr: GameMgr_Type,
    uiscript: UIScript_Type, app: any, game: any, Laya: any, mjcore: any, net: any;
// ========================================================================
declare type Cfg_Type = {
    item_definition: {
        item: {
            rows_: {
                id: number,
                name_chs: string,
                category: number,
                type: number,
            }[],
        }
        title: {
            rows_: {
                id: number,
                name_chs: string,
                category: number,
                type: number,
            }[],
        }
        skin: {
            map_: {
                id: number,
                character_id: number,
            }[],
            rows_: {
                id: number,
                character_id: number,
            }[],
        }
        view: {
            get: Function;
        }
    }
    fan: {
        fan: {
            map_: {
                id: number,
                name_chs: string,
                name_chs_t: string,
                name_jp: string,
                name_en: string,
                fan_menqing: number,
                fan_fulu: number,
                show_index: number,
                sound: string,
            }[],
            get: (id: number) => {
                id: number,
                name_chs: string,
                name_chs_t: string,
                name_jp: string,
                name_en: string,
                fan_menqing: number,
                fan_fulu: number,
                show_index: number,
                sound: string,
                mark?: boolean,
            };
        }
    }
    tournament: {
        tournaments: {
            get: (id: number) => { name: string };
        }
    },
    desktop: {
        matchmode: {
            get: (id: number) => any;
        }
    }
};
declare type View_Type = {
    ViewPlayer_Other: any;
    ViewPlayer_Me: any;
    EMJMode: any;
    ERuleMode: any;
    ELink_State: any;
    AudioMgr: any;
    DesktopMgr?: {
        player_link_state: any;
        Inst?: {
            seat: Seat,
            active: boolean,
            paipu_config: any;
            initRoom: Function;
            rule_mode: any;
            mode: number;
            setNickname: Function;
            is_peipai_open_mode: Function;
            is_tianming_mode: Function;
            isTargetSpecialMode: Function;
            players: { hand: any[] }[];
            waiting_lingshang_deal_tile: boolean;
            record_show_anim: boolean;
            getPlayerName: (seat: number) => string;
            player_datas: PlayerDatas;
            index_ju: number;
            player_count: number;
            index_player: Seat;
            index_change: number;
            is_chuanma_mode: () => boolean;
            seat2LocalPosition: (seat: Seat) => number;
            muyu_info: {
                seat: Seat,
            }
        },
        prototype: {
            seat2LocalPosition: Function,
            localPosition2Seat: Function,
        },
    }
    ViewPai: {
        prototype: {
            OnChoosedPai: Function,
        },
    }
    ActionAnGangAddGang: {
        getAngangTile: Function;
    }
};
declare type GameMgr_Type = {
    Inst: {
        checkPaiPu: Function,
        onLoadStart: Function,
        mjp_view: any,
        mjp_surface_view: any,
        duringPaipu: boolean;
        record_uuid: string;
        getClientVersion: Function;
    },
    prefix_url: string;
    client_language: string;
};
declare type UIScript_Type = {
    UI_Loading: any;
    ELoadingType: any;
    UIMgr: any;
    UI_DesktopInfo: any;
    UI_Win: any;
    UIRect: any;
    UI_Activity: any;
    UI_Activity_DuanWu_Point: any;
    UI_Activity_RPG: any;
    UI_Replay: {
        prototype: {
            resetData: Function,
        }
        Inst: {
            initMaka: Function;
            initData: Function;
            enable: boolean;
            rounds: {
                actions: Actions,
                xun: number[],
            }[],
            gameResult: {
                result: {
                    players: Players
                }
            }
            nextStep: Function;
        }
    },
    UI_Sushe: {
        now_desktop_id: number,
        now_mjp_id: number,
        now_mjp_surface_id: number,
    }
};
// ========================================================================
type HonorNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7;
type OrdinalNumber = 0 | HonorNumber | 8 | 9;
type HonorType = 'z';
type OrdinalType = 'm' | 'p' | 's';
type HonorTile = `${HonorNumber}${HonorType}${'' | 't'}`;
type OrdinalTile = `${OrdinalNumber}${OrdinalType}${'' | 't'}`;

type Tile = HonorTile | OrdinalTile | 'bd';
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
    category: number,
    meta: { mode_id?: number, room_id?: number },
    mode: {
        mode: number,
        detail_rule: {
            _tablecloth_id?: number,
            _mjp_id?: number,
            _mjpsurface_id?: number,
            init_point?: number,
            dora_count?: number,
            fanfu?: number,
            _chang_ju_ben_num_?: [Seat, Seat, number, number?],
            _scores_?: [number, number, number?, number?],
            _mainrole_?: Seat,
            xuezhandaodi?: boolean,
            chuanma?: boolean,
            dora3_mode?: boolean,
            begin_open_mode?: boolean,
            muyu_mode?: boolean,
            jiuchao_mode?: boolean,
            reveal_discard?: boolean,
            field_spell_mode?: number,
            zhanxing?: boolean,
            tianming_mode?: boolean,
            yongchang_mode?: boolean,
            hunzhiyiji_mode?: boolean,
            wanxiangxiuluo_mode?: boolean,
            beishuizhizhan_mode?: boolean,
            amusement_switches?: number[],
            _xueliu?: boolean,
            guyi_mode?: boolean,
            _yifanjieguyi?: boolean,
            _no_shiduan?: boolean,
            _no_zimosun?: boolean,
            open_hand?: boolean,
            _liqi_need?: number,
            _ben_times?: number,
            _fafu_1ting?: number,
            _fafu_2ting?: number,
            _fafu_3ting?: number,
            _fafu_3p_1ting?: number,
            _fafu_3p_2ting?: number,
            _fafu_2p?: number,
            _qieshangmanguan?: boolean,
            _toutiao?: boolean,
            _renhumanguan?: boolean,
            _no_normalbaopai?: boolean,
            _sigangbaopai?: boolean,
            _no_liujumanguan?: boolean,
            _no_yifa?: boolean,
            _no_lianfengsifu?: boolean,
            _no_dora?: boolean,
            _no_lidora?: boolean,
            _no_gangdora?: boolean,
            _no_ganglidora?: boolean,
            _dora_jifan?: boolean,
            _sanxiangliuju?: boolean,
            _no_leijiyiman?: boolean,
            _no_wyakuman?: boolean,
            _no_guoshiangang?: boolean,
            _fufenliqi?: boolean,
            _baogang?: boolean,
            _qingtianjing?: boolean,
            _no_zhenting?: boolean,
            _ronghuzhahu?: boolean,
            _tiandichuangzao?: boolean,
            _wanwushengzhang?: boolean,
            _tianguishi_vs_yuantiankemei?: boolean,
            _report_yakus?: boolean,
            _sixifuhe?: boolean,
            _mopai_paishan?: boolean,
            _heqie_mode?: boolean,
            _guobiao?: boolean,
            _guobiao_huapai?: boolean,
            _guobiao_no_8fanfu?: boolean,
            _guobiao_lianzhuang?: boolean,
            _scale_points?: number,
            _cuohu_points?: number,
            _cuohupeida?: boolean,
            _random_skin?: boolean,
            _random_views?: boolean,
        },
        testing_environment?: any
    };
};
type FuluInfo = { type: FuLuType, tile: Tile[], from?: Seat };
type Partition = { type: PartitionType, tile: Tile[] }[];
type LstLiqi = {
    seat: Seat,
    liqi: number,
    kai: boolean,
    beishui_type?: BeishuiType,
    xia_ke_shang?: { score_coefficients: Players_Number },
};
type Liqi = {
    seat: Seat,
    liqibang: number,
    score: number,
    liqi_type_beishuizhizhan?: BeishuiType,
    xia_ke_shang?: { score_coefficients: Players_Number },
    failed?: boolean,
};
type DoraCnt = {
    cnt: DoraCntType,
    licnt: DoraCntType,
    lastype: number,
    bonus?: number,
};
type ActionData = {
    ju?: Seat;
    seat?: Seat,
    tile?: Tile,
    tiles?: Tile,
    hules?: HuleInfo[],
    left_tile_count?: number,
    type?: number,
    is_liqi?: boolean,
    lock_state?: 0 | 1 | 2,
};
type BaopaiInfo = { seat: Seat, val: number };
type Muyu = {
    id: number,
    seat: Seat,
    count: 0 | 1 | 2 | 3 | 4 | 5,
    count_max: 5,
};
type ChuanmaGangInfo = { from: Seat, to: Seat, val: number };
type ChuanmaGangs = { over: ChuanmaGangInfo[], notover: [ChuanmaGangInfo?] };

type Paihe_Player = { liujumanguan: boolean, tiles: Tile[] };
type PlayerDatas_Player = {
    nickname: string,
    avatar_id: number,
    account_id?: number,
    character?: {
        charid?: number,
        level?: number,
        exp?: number,
        skin?: number,
        is_upgraded?: boolean,
        extra_emoji?: number[],
    },
    seat?: Seat,
    level?: { id: number, score: number },
    level3?: { id: number, score: number },
    title?: number,
    avatar_frame?: number,
    verified?: number,
    views?: { slot: number, item_id: number }[],
};
type LiqiInfo_Player = {
    liqi: number,
    yifa: number,
    kai: boolean,
    beishui_type?: BeishuiType,
    xia_ke_shang?: { score_coefficients: Players_Number },
};
type Player_Player = {
    seat: Seat,
    gold: number,
    grading_score: number,
    part_point_1: number,
    part_point_2: number,
    total_point: number,
};
type HunzhiyijiInfo_Player = {
    seat: Seat,
    liqi: number,
    continue_deal_count: 0 | 1 | 2 | 3 | 4 | 5 | 6,
    overload: boolean,
};
type YongChangData_Player = {
    seat: Seat,
    moqie_count: number,
    moqie_bonus: number,
    shouqie_count: number,
    shouqie_bonus: number,
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

type ActionName =
    | 'RecordNewRound'
    | 'RecordDealTile'
    | 'RecordFillAwaitingTiles'
    | 'RecordDiscardTile'
    | 'RecordRevealTile'
    | 'RecordLockTile'
    | 'RecordUnveilTile'
    | 'RecordChiPengGang'
    | 'RecordAnGangAddGang'
    | 'RecordBaBei'
    | 'RecordHule'
    | 'RecordHuleXueZhanMid'
    | 'RecordHuleXueZhanEnd'
    | 'RecordHuleXueLiuMid'
    | 'RecordHuleXueLiuEnd'
    | 'RecordNoTile'
    | 'RecordLiuJu'
    | 'RecordChangeTile'
    | 'RecordSelectGap'
    | 'RecordGangResult'
    | 'RecordGangResultEnd'
    | 'RecordCuohu';
type Action = { name: ActionName, data: ActionData };
type Actions = Action[];

type ZiMingInputType = 'angang' | 'jiagang' | 'babei' | 'baxi';
type MuyuSeats =
    | ``
    | `${Seat}`
    | `${Seat}${Seat}`
    | `${Seat}${Seat}${Seat}`
    | `${Seat}${Seat}${Seat}${Seat}`
    | `${Seat}${Seat}${Seat}${Seat}${Seat}`
    | `${Seat}${Seat}${Seat}${Seat}${Seat}${Seat}`;

type HuleInfo = {
    count: number,
    doras: Doras,
    li_doras: Doras,
    fans: FansType,
    fu: number,
    hand: Tile[],
    hu_tile: Tile,
    liqi: boolean,
    ming: string[],
    point_rong?: number,
    point_sum?: number,
    point_zimo_qin?: number,
    point_zimo_xian?: number,
    qinjia: boolean,
    seat: Seat,
    title_id: number,
    yiman: boolean,
    zimo: boolean,
    dadian?: number,
    tianming_bonus?: number,
    xia_ke_shang_coefficient?: number,
    cuohu?: boolean,
};
type FansType = { id: number; val: number; }[];
type TypeCnt = [number, number, number, number, number, number, number, number][];
type CalcFanRet = { yiman?: boolean, fans: FansType, fu: number, dora_bonus?: number };
type Open_Player = { seat: Seat, tiles: string[], count: number[] };
type Opens = [Open_Player, Open_Player, Open_Player?, Open_Player?];
type TingInfo = { tingpai: boolean, hand: Tile[], tings: { tile: Tile }[] }[];
type ScoresInfo = {
    seat?: Seat,
    score?: number,
    old_scores: Players_Number,
    delta_scores: Players_Number,
    hand?: Tile[],
    ming?: string[],
    doras?: Doras,
    taxes?: [number, number, number, number],
}[];
type ChangeTileInfo_Player = {
    out_tiles: [Tile, Tile, Tile],
    out_tile_states: [number, number, number],
    in_tiles: [Tile, Tile, Tile],
    in_tile_states: [number, number, number],
};
type ChangeTileInfo = [ChangeTileInfo_Player, ChangeTileInfo_Player, ChangeTileInfo_Player, ChangeTileInfo_Player];

type AllData = {
    all_actions: Actions[],
    xun: Players_NumberArray[],
    config: Config,
    player_datas: PlayerDatas,
    players: Players,
};
