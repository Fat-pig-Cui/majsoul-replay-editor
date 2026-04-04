/**
 * @file: data.ts - 核心数据文件, 包含所有非函数变量
 * @author: Fat-pig-Cui
 * @email: chubbypig@qq.com
 * @github: https://github.com/Fat-pig-Cui/majsoul-replay-editor
 */

// 玩家的个人信息
export const player_datas: PlayerDatas = [null, null];

// 玩家的起手
export const begin_tiles: Players_String = ['', ''];

// 玩家当时的手牌
export const player_tiles: Players_TileArray = [[], []];

// 完成编辑后的所有信息集合
export const all_data: AllData = {
    all_actions: [],
    xun: [],
    config: null,
    player_datas: [null, null],
    players: [null, null],
};

// 最终要注入到牌谱回放中的内容的内容, 每小局结束后 push 到 all_data.actions 中并清空
export const actions: Actions = [];

// ============================================================

/**
 * 一系列基本数据类型的变量集合:
 *
 * - chang: 场(东/南/西/北对应0/1/2/3)
 * - ju: 局(东1/2/3/4对应0/1/2/3)
 * - ben: 本场数
 * - liqibang: 场上立直棒个数
 * - benchangbang: 原子化的本场棒个数(用于和牌的点数划分)
 * - liqi_need: 立直所需要的棒子数, 默认为1
 * - base_point: 各家原点分数, 默认为25000
 * - draw_type: 摸牌方向: 1 表示正常摸牌, 0 表示岭上摸牌
 * - lst_draw_type: 最近玩家摸牌方向
 * - baogang_seat: 包杠的玩家, 无人包杠则为-1
 * - first_hu_seat: 川麻: 某局第一位和牌玩家的 seat, 若没有则为-1
 * - lianzhuang_cnt: 庄家连续和牌连庄数量, 用于八连庄
 */
export const base_info: BaseInfo = {
    chang: 0,
    ju: 0,
    ben: 0,
    liqibang: 0,
    benchangbang: 0,
    liqi_need: 1,
    base_point: 25000,
    draw_type: 1,
    lst_draw_type: 1,
    baogang_seat: -1,
    first_hu_seat: -1,
    lianzhuang_cnt: 0,
    player_cnt: 4,
};

// 对局的模式
export const config: Config = {category: 1, meta: {mode_id: 0}, mode: {mode: 1, detail_rule: {}}};

// 牌山, 会随着牌局的进行逐渐减少
export const paishan: Tile[] = [];

// 玩家的实时点数
export const scores: Players_Number = [0, 0];

// 各家点数变动
export const delta_scores: Players_Number = [0, 0];

// 玩家的切牌集合
export const discard_tiles: Players_TileMoqieArray = [[], []];

// 玩家的摸牌集合
export const deal_tiles: Players_TileMoqieArray = [[], []];

// 玩家的副露信息
export const fulu: Fulu = [[], []];

// 玩家的牌河
export const paihe: Paihe = [{liujumanguan: true, tiles: []}, {liujumanguan: true, tiles: []}];

// 立直信息
export const liqi_info: LiqiInfo = [{liqi: 0, yifa: 1, kai: false}, {liqi: 0, yifa: 1, kai: false}];

// 刚宣言立直的玩家信息
export const lst_liqi: LstLiqi = {valid: false, seat: 0, liqi: 0, kai: false};

// 宝牌指示牌(0: 表指示牌, 1: 里指示牌, 各5张)
export const dora_indicator: DoraIndicator = [[], []];

// dora相关数据
export const dora_cnt: DoraCnt = {cnt: 1, li_cnt: 1, lastype: 0, bonus: 0};

// 血战到底/血流成河: 玩家和牌历史
export const hules_history: HuleInfo[] = [];

// 玩家是否已和牌
export const huled: Players_Boolean = [false, false];

// 玩家的包牌信息
export const baopai: Baopai = [[], []];

// 玩家的巡目, 对应的数字是在 actions 中的下标
export const xun: Players_NumberArray = [[], []];

// 第四个明杠时, 前三副露是否都是杠子(然后第四个杠才构成包牌)
export const sigang_bao: Players_Boolean = [false, false];

// 配牌明牌: 玩家所亮明的牌, number 为牌的数字编码
export const mingpais: [TileNum, TileNum, TileNum?, TileNum?] = [{}, {}];

// 龙之目玉: 拥有目玉的玩家队列 和 各玩家打点的倍数, 只有有目玉的玩家为2, 其他都为1
export const muyu: Muyu = {seats: '', times: [1, 1, 1, 1]};

// 龙之目玉: 目玉信息
export const muyu_info: MuyuInfo = {id: 0, seat: 0, count: 0, count_max: 5};

// 川麻: 玩家的定缺, 注意 012 分别代表 pms
export const gaps: Gaps = [0, 0, 0, 0];

// 川麻: 开杠刮风下雨
export const chuanma_gangs: ChuanmaGangs = {over: [], not_over: null};

// 幻境传说: 命运卡3(厄运沙漏): 各家立直后舍牌数量
export const spell_hourglass: Players_Number = [0, 0];

// 占星之战: 牌候选池, 通常长度为3
export const awaiting_tiles: [Tile?, Tile?, Tile?] = [];

// 咏唱之战: 各家舍牌手摸切信息, 与 paihe.tiles 不同的是, 牌被鸣走后, shoumoqie 同样会去掉, 而 paihe.tiles 不会
export const shoumoqie: Players_BooleanArray = [[], []];

// 咏唱之战: 各家舍牌手摸切最大长度和bonus
export const yongchang_data: YongChangData = [
    {seat: 0, moqie_count: 0, moqie_bonus: 0, shouqie_count: 0, shouqie_bonus: 0},
    {seat: 1, moqie_count: 0, moqie_bonus: 0, shouqie_count: 0, shouqie_bonus: 0},
];

// 魂之一击: 各家立直信息
export const hunzhiyiji_info: HunzhiyijiInfo = [
    {seat: 0, liqi: 0, continue_deal_count: 0, overload: false},
    {seat: 1, liqi: 0, continue_deal_count: 0, overload: false},
];

// 国标玩家是否已错和
export const cuohu: Players_Boolean = [false, false];

/**
 * 各种振听:
 * - 同巡振听: 下标为0表示预先判断, 如果预先判断为 true, 则过一个操作后把值赋给下标为1的真实值
 * - 立直振听: 下标为0表示预先判断, 如果预先判断为 true, 则过一个操作后把值赋给下标为1的真实值
 * - 舍张振听
 * - 最终振听结果
 *
 * 影响振听的因素
 * 1. 自家牌河中有听的牌(qiepai)
 * 2. 其他家切牌(qiepai), 加杠(zimingpai), 拔北(zimingpai), 暗杠(国士, zimingpai)有听的牌
 * 3. 只有切牌的时候会解除舍张振听
 * 4. 只有在摸牌和自家鸣牌的时候会解除同巡振听
 * 5. 同巡和立直振听在pass掉这张牌之后才会振听, 紧跟的操作可能是 mopai, mingpai (hupai 不影响)
 */
export const zhenting: ZhenTing = {
    tongxun: [[false, false], [false, false]],
    liqi: [[false, false], [false, false]],
    shezhang: [false, false],
    result: [false, false],
};

// 回放用装扮随机池, 键是 slot, 值是对应的装扮id数组
export const views_pool: { [p: number]: number[] } = {};
