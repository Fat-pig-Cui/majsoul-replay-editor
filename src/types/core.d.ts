type HonorNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7;
type OrdinalNumber = 0 | HonorNumber | 8 | 9;
type HonorType = 'z';
type OrdinalType = 'm' | 'p' | 's';
type HonorTile = `${HonorNumber}${HonorType}${'' | 't'}`;
type OrdinalTile = `${OrdinalNumber}${OrdinalType}${'' | 't'}`;

type Tile = HonorTile | OrdinalTile | 'bd';
type TileWithMoqie = Tile | '..';
type TileWithParam = TileWithMoqie | 'YY' | 'DD' | 'TT' | 'HH' | 'MM' | 'PP' | 'SS';

// 座次
type Seat = 0 | 1 | 2 | 3;
// 玩家数量
type PlayerNum = 2 | 3 | 4;

// 他家鸣牌类型 0: 吃, 1: 碰, 2: 杠
type ChiPengGangType = 0 | 1 | 2;
// 自家鸣牌类型 2: 加杠, 3: 暗杠
type ZiMingType = 2 | 3;
// 流局种类 1: 九种九牌, 2: 四风连打, 3: 四杠散了, 4: 四家立直, 5: 三家和了
type LiujuType = 1 | 2 | 3 | 4 | 5;
// 包牌玩家, 注意有包牌的话包牌的值为 Seat + 1, 没有包牌为0
// 即 seat 为 0,1,2,3 的玩家包牌值分别为 1,2,3,4
type BaopaiT = Seat | 4;
// 换牌类型 0: 逆时针, 1: 对家, 2: 顺时针
type HuanpaiType = 0 | 1 | 2;
// 占星之战的选牌 index
type AwaitingIndex = 0 | 1 | 2;
// 背水之战的立直类型 0: 无效果, 1: 真系列, 2: 极系列
type BeishuiType = 0 | 1 | 2;
// 副露类型 0: 明顺, 1: 明刻, 2: 明杠(含加杠), 3: 暗杠, 4: 拔北宝牌
type FuLuType = 0 | 1 | 2 | 3 | 4;
// 划分牌的类型, 除了 FuLuType 以外还包括 5: 暗顺, 6: 暗刻, 7: 对子, 8: 组合龙的特殊顺子(仅在国标模式存在)
type PartitionType = FuLuType | 5 | 6 | 7 | 8;
// 翻开指示牌的数量
type DoraCntType = 0 | 1 | 2 | 3 | 4 | 5;
// 0: 不翻指示牌, 1: 开杠家进行操作后翻指示牌, 2: 立即翻指示牌
type DoraLasType = 0 | 1 | 2;
// 立直的类型 0: 不立直, 1: 普通立直, 2: 两立直
type LiqiNumType = 0 | 1 | 2;
// 目玉数量
type MuyuCountType = 0 | 1 | 2 | 3 | 4 | 5;

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
    liqi: LiqiNumType,
    kai: boolean,
    beishui_type?: BeishuiType,
    xia_ke_shang?: { score_coefficients: Players_Number },
};
type Liqi = {
    seat: Seat,
    liqibang: number,
    score: number, // 立直之后的玩家点数
    liqi_type_beishuizhizhan?: BeishuiType,
    xia_ke_shang?: { score_coefficients: Players_Number },
    failed?: boolean,
};
type DoraCnt = {
    cnt: DoraCntType,
    licnt: DoraCntType,
    lastype: DoraLasType,
    bonus?: number, // 多翻的指示牌数量
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
    lock_state?: LockState,
};
type BaopaiInfo = { seat: Seat, val: number };
type MuyuInfo = {
    id: number,
    seat: Seat,
    count: MuyuCountType,
    count_max: 5,
};
type ChuanmaGangInfo = { from: Seat, to: Seat, val: number };
type ChuanmaGangs = { over: ChuanmaGangInfo[], not_over: [ChuanmaGangInfo?] };

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
    verified?: 0 | 1 | 2, // 0: 未认证, 1: 主播(猫爪)认证, 2: 职业(P标)认证
    views?: { slot: number, item_id: number }[],
};
type LiqiInfo_Player = {
    liqi: LiqiNumType,
    yifa: number, // 大于0就表示有(假)一发
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
    liqi: LiqiNumType,
    continue_deal_count: 0 | 1 | 2 | 3 | 4 | 5 | 6,
    overload: boolean,
};
type YongChangData_Player = {
    seat: Seat,
    moqie_count: number,
    moqie_bonus: 0 | 1 | 2 | 3 | 5 | 12,
    shouqie_count: number,
    shouqie_bonus: 0 | 1 | 2 | 3 | 5 | 12,
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
type Muyu = { seats: MuyuSeats, times: [1 | 2, 1 | 2, (1 | 2)?, (1 | 2)?] };
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

declare var editFunction: Function, editFunction2: Function;
