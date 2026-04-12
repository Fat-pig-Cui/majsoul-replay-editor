(function () {
    'use strict';

    /**
     * @file: data.ts - 核心数据文件, 包含所有非函数变量
     * @author: Fat-pig-Cui
     * @email: chubbypig@qq.com
     * @github: https://github.com/Fat-pig-Cui/majsoul-replay-editor
     */
    // 玩家的个人信息
    const player_datas = [null, null];
    // 玩家的起手
    const begin_tiles = ['', ''];
    // 玩家当时的手牌
    const player_tiles = [[], []];
    // 完成编辑后的所有信息集合
    const all_data = {
        all_actions: [],
        xun: [],
        config: null,
        player_datas: [null, null],
        players: [null, null],
        cur_actions: [],
    };
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
     * - all_tile_nums: 当前模式下各种种类的牌应有数量
     */
    const base_info = {
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
        all_tile_nums: {},
    };
    // 对局的模式
    const config = { category: 1, meta: { mode_id: 0 }, mode: { mode: 1, detail_rule: {} } };
    // 牌山, 会随着牌局的进行逐渐减少
    const paishan = [];
    // 玩家的实时点数
    const scores = [0, 0];
    // 各家点数变动
    const delta_scores = [0, 0];
    // 玩家的切牌集合
    const discard_tiles = [[], []];
    // 玩家的摸牌集合
    const deal_tiles = [[], []];
    // 玩家的副露信息
    const fulu = [[], []];
    // 玩家的牌河
    const paihe = [{ liujumanguan: true, tiles: [] }, { liujumanguan: true, tiles: [] }];
    // 立直信息
    const liqi_info = [{ liqi: 0, yifa: 1, kai: false }, { liqi: 0, yifa: 1, kai: false }];
    // 刚宣言立直的玩家信息
    const lst_liqi = { valid: false, seat: 0, liqi: 0, kai: false };
    // 宝牌指示牌(0: 表指示牌, 1: 里指示牌, 各5张)
    const dora_indicator = [[], []];
    // dora相关数据
    const dora_cnt = { cnt: 1, li_cnt: 1, lastype: 0, bonus: 0 };
    // 血战到底/血流成河: 玩家和牌历史
    const hules_history = [];
    // 玩家是否已和牌
    const huled = [false, false];
    // 玩家的包牌信息
    const baopai = [[], []];
    // 玩家的巡目, 对应的数字是在 actions 中的下标
    const xun = [[], []];
    // 第四个明杠时, 前三副露是否都是杠子(然后第四个杠才构成包牌)
    const sigang_bao = [false, false];
    // 配牌明牌: 玩家所亮明的牌, number 为牌的数字编码
    const mingpais = [{}, {}];
    // 龙之目玉: 拥有目玉的玩家队列 和 各玩家打点的倍数, 只有有目玉的玩家为2, 其他都为1
    const muyu = { seats: '', times: [1, 1, 1, 1] };
    // 龙之目玉: 目玉信息
    const muyu_info = { id: 0, seat: 0, count: 0, count_max: 5 };
    // 川麻: 玩家的定缺, 注意 012 分别代表 pms
    const gaps = [0, 0, 0, 0];
    // 川麻: 开杠刮风下雨
    const chuanma_gangs = { over: [], not_over: null };
    // 幻境传说: 命运卡3(厄运沙漏): 各家立直后舍牌数量
    const spell_hourglass = [0, 0];
    // 占星之战: 牌候选池, 通常长度为3
    const awaiting_tiles = [];
    // 咏唱之战: 各家舍牌手摸切信息, 与 paihe.tiles 不同的是, 牌被鸣走后, shoumoqie 同样会去掉, 而 paihe.tiles 不会
    const shoumoqie = [[], []];
    // 咏唱之战: 各家舍牌手摸切最大长度和bonus
    const yongchang_data = [
        { seat: 0, moqie_count: 0, moqie_bonus: 0, shouqie_count: 0, shouqie_bonus: 0 },
        { seat: 1, moqie_count: 0, moqie_bonus: 0, shouqie_count: 0, shouqie_bonus: 0 },
    ];
    // 魂之一击: 各家立直信息
    const hunzhiyiji_info = [
        { seat: 0, liqi: 0, continue_deal_count: 0, overload: false },
        { seat: 1, liqi: 0, continue_deal_count: 0, overload: false },
    ];
    // 国标玩家是否已错和
    const cuohu = [false, false];
    /**
     * 各种振听:
     * - 同巡振听: 下标为0表示预先判断, 如果预先判断为 true, 则过一个操作后把值赋给下标为1的真实值
     * - 立直振听: 下标为0表示预先判断, 如果预先判断为 true, 则过一个操作后把值赋给下标为1的真实值
     * - 舍张振听
     * - 最终振听结果
     *
     * 影响振听的因素
     * 1. 自家牌河中有听的牌(qiepai)
     * 2. 其他家切牌(qiepai)有听的牌
     * 3. 只有切牌的时候会解除舍张振听
     * 4. 只有在摸牌和自家鸣牌的时候会解除同巡振听
     * 5. 同巡和立直振听在pass掉这张牌之后才会振听, 紧跟的操作可能是 mopai, mingpai (hupai 不影响)
     */
    const zhenting = {
        tongxun: [[false, false], [false, false]],
        liqi: [[false, false], [false, false]],
        shezhang: [false, false],
        result: [false, false],
    };
    // 回放用装扮随机池, 键是 slot, 值是对应的装扮id数组
    const views_pool = {};

    /**
     * @file: misc.ts - 随机装扮相关的函数和一些比较简短的函数
     * @author: GrandDawn, Fat-pig-Cui
     * @email: chubbypig@qq.com
     * @github: https://github.com/Fat-pig-Cui/majsoul-replay-editor
     */
    // 中文服无法加载和排除的装扮, 键是 slot, 值是对应的装扮id数组
    const invalid_views = {
        5: [
            305501, // 头像框-默认
            305510, // 头像框-四象战
            305511, // 头像框-四象战
            305512, // 头像框-四象战
            305513, // 头像框-四象战
            305514, // 头像框-四象战
            305515, // 头像框-四象战
            305516, // 头像框-四象战
            305517, // 头像框-四象战
            305518, // 头像框-四象战
            305519, // 头像框-四象战
            305524, // 头像框-四象战
            305525, // 双聖の眷属たち
            305526, // Team Championship Limited Portrait Frame
            305527, // 头像框-四象战
            305528, // 头像框-四象战
            305530, // 头像框-四象战
            305531, // 头像框-四象战
            305532, // 头像框-四象战
            305533, // 双聖の眷属たち
            305534, // 头像框-四象战
            305535, // 头像框-四象战
            305536, // 头像框-四象战
            305538, // 头像框-四象战
            305539, // 双聖の眷属たち
            305540, // 头像框-四象战
            305541, // 头像框-四象战
            305543, // 头像框-四象战
            305544, // 头像框-四象战
            305546, // 双聖の眷属たち
            305547, // 头像框-四象战
            305548, // 头像框-四象战
            305549, // 头像框-四象战
            305550, // 头像框-四象战
            305553, // 双聖の眷属たち
            305555, // 头像框-豆芽测试用
            30550001, // 头像框-四象战
            30550002, // 头像框-四象战
            30550003, // 头像框-四象战
            30550004, // 头像框-四象战
            30550005, // 头像框-四象战
            30550006, // 头像框-四象战
            30550007, // 双聖の眷属たち
            30550008, // 头像框-四象战
            30550009, // 头像框-四象战
            30550010, // 头像框-四象战
            30550011, // 头像框-四象战
            30550013, // 双聖の眷属たち
            30550015, // 头像框-四象战
            30550018, // Limited Portrait Frame
            30550019, // 프로필 테두리 - MKC 2025
            30550024, // 双聖の眷属たち
        ], // 头像框
        11: [
            600017, // 认证玩家
            600025, // 限时称号测试用
            600026, // 雀魂公認の選ばれしプレイヤーG
            600029, // インターハイ王者
            600041, // 最強鴉天狗の愛弟子
            600043, // Limited Title
            600044, // 花より団子
            600048, // 伝説の名コンビ
            600049, // 伝説の迷コンビ
            600051, // 虹懸かる右手
            600055, // 麻雀スクワッド
            600066, // みんな家族
            600067, // ぶいすぽ女傑
            600069, // インターハイ王者
            600071, // 煌めく女王の星
            600072, // 闘魂杯王者
            600073, // 華風戦優勝
            600076, // 雀魂インビ夏王者
            600077, // 雀魂インビ冬将軍
            600081, // 野鳥観察部
            600082, // ななしサンマ王
            600085, // ぶいすぽの頂
            600087, // 雀荘牌舞台
            600088, // 闘魂杯王者
            600089, // 麒麟位2024
            600090, // 四象战冠军
            600091, // 四象战冠军
            600092, // 四象战冠军
            600093, // 花ノ国 戦国最強
            600095, // 双聖戦優勝
            600097, // 雀魂インビ夏王者
            600098, // 限定称号
            600099, // 四象战冠军
            600100, // 四象战冠军
            600102, // 豪勇無双のまつたけ
            600103, // 華風戦優勝
            600104, // Limited Title
            600105, // MKC 2025 국사무쌍
            600106, // 四象战冠军
            600109, // 雀魂インビ冬将軍
            600110, // ぶいすぽの覇者
            600111, // プロ×魂天覇者
            600114, // あやまらないよ！
            600115, // 双聖戦優勝
            600122, // 麒麟位2025
            600129, // 双聖戦優勝
            600131, // Limited Title
            600133, // Limited Title
            600136, // チームシリウス
            600138, // にじLリーグ優勝
            600143, // MKC 2026 국사무쌍
            600146, // 華風戦優勝
            600150, // 開運全甲斐だ
        ], // 称号
    };
    // 更新装扮随机池
    const updateViews = () => {
        // 建议玩家随机的装扮: 立直棒(0), 和牌特效(1), 立直特效(2), 头像框(5), 桌布(6), 牌背(7), 称号(11), 牌面(13)
        const slots = [0, 1, 2, 5, 6, 7, 11, 13];
        for (const slot of slots) {
            views_pool[slot] = [];
            if (invalid_views[slot] === undefined)
                invalid_views[slot] = [];
        }
        const Items = cfg.item_definition.item.rows_, Titles = cfg.item_definition.title.rows_;
        for (const item of Items) {
            if (item.name_chs === '(已过期)' || item.category !== 5 || item.type === 11)
                continue;
            const slot = item.type;
            if (slots.includes(slot) && !invalid_views[slot].includes(item.id))
                views_pool[slot].push(item.id);
        }
        for (const title of Titles)
            if (!invalid_views[11].includes(title.id))
                views_pool[11].push(title.id);
    };
    // 回放的桌布, 默认为当前使用的桌布
    const get_tablecloth_id = () => {
        if (typeof config.mode.detail_rule._tablecloth_id == 'number')
            return config.mode.detail_rule._tablecloth_id;
        if (all_data.player_datas[0].views)
            for (const view of all_data.player_datas[0].views)
                if (view.slot === 6)
                    return view.item_id;
        return uiscript.UI_Sushe.now_desktop_id;
    };
    // 回放的牌背, 默认为当前使用的牌背
    const get_mjp_id = () => {
        if (typeof config.mode.detail_rule._mjp_id == 'number')
            return config.mode.detail_rule._mjp_id;
        if (all_data.player_datas[0].views)
            for (const view of all_data.player_datas[0].views)
                if (view.slot === 7)
                    return view.item_id;
        return uiscript.UI_Sushe.now_mjp_id;
    };
    // 回放的牌面, 默认为当前使用的牌面
    const get_mjpsurface_id = () => {
        if (typeof config.mode.detail_rule._mjpsurface_id == 'number')
            return config.mode.detail_rule._mjpsurface_id;
        if (all_data.player_datas[0].views)
            for (const view of all_data.player_datas[0].views)
                if (view.slot === 13)
                    return view.item_id;
        return uiscript.UI_Sushe.now_mjp_surface_id;
    };
    // 初始点数
    const get_init_point = () => {
        const init_point = config.mode.detail_rule.init_point;
        return typeof init_point == 'number' && init_point > -1 ? init_point : -1;
    };
    // 红宝牌数量
    const get_aka_cnt = () => {
        const dora_count = config.mode.detail_rule.dora_count;
        return typeof dora_count == 'number' && dora_count > -1 ? dora_count : -1;
    };
    // 番缚, 默认为1
    const get_fanfu = () => {
        const fanfu = config.mode.detail_rule.fanfu;
        return typeof fanfu == 'number' && fanfu > 1 ? fanfu : 1;
    };
    // ------------------------------------------------------------------------
    // 牌谱第一局的 chang, ju, ben 和场供中的立直棒个数(最后一个参数可以省略)
    const get_chang_ju_ben_num = () => {
        const chang_ju_ben_num = config.mode.detail_rule._chang_ju_ben_num_;
        if (chang_ju_ben_num instanceof Array && chang_ju_ben_num.length >= 3)
            return chang_ju_ben_num;
        return [0, 0, 0, 0];
    };
    // 第一局各玩家的点数
    const get_init_scores = () => {
        if (config.mode.detail_rule._scores_ instanceof Array)
            return config.mode.detail_rule._scores_;
        return [];
    };
    // 回放的主视角
    const get_mainrole_seat = () => {
        const mainrole = config.mode.detail_rule._mainrole_;
        return typeof mainrole == 'number' && mainrole > -1 && mainrole < 4 ? mainrole : -1;
    };
    // ------------------------------------------------------------------------
    // 是否为修罗之战模式
    const is_xuezhandaodi = () => config.mode.detail_rule.xuezhandaodi;
    // 是否是赤羽之战模式
    const is_chuanma = () => config.mode.detail_rule.chuanma;
    // 是否为宝牌狂热模式
    const is_dora3 = () => config.mode.detail_rule.dora3_mode;
    // 是否为配牌明牌模式
    const is_begin_open = () => config.mode.detail_rule.begin_open_mode;
    // 是否为龙之目玉模式
    const is_muyu = () => config.mode.detail_rule.muyu_mode;
    // 是否为明镜之战模式
    const is_mingjing = () => config.mode.detail_rule.jiuchao_mode;
    // 是否为暗夜之战模式
    const is_anye = () => config.mode.detail_rule.reveal_discard;
    /**
     * 获取幻境传说模式的庄家卡(1), 机会卡(2)或命运卡(3), 返回对应的卡牌编号(1-5), 0代表没有
     * @param card - 获取的卡牌你类型, 1代表庄家卡, 2代表机会卡, 3代表命运卡
     * @returns 对应的卡牌编号(1-5), 0代表没有
     */
    const get_field_spell_mode = (card) => {
        const field_spell_mode = config.mode.detail_rule.field_spell_mode;
        if (typeof field_spell_mode != 'number' || field_spell_mode < 0)
            return 0;
        let ret = 0;
        if (card === 1)
            ret = Math.floor(field_spell_mode % 10);
        else if (card === 2)
            ret = Math.floor(config.mode.detail_rule.field_spell_mode / 100) % 10;
        else if (card === 3)
            ret = Math.floor(config.mode.detail_rule.field_spell_mode / 10000);
        if (ret < 1 || ret > 5)
            return 0;
        return ret;
    };
    // 是否为占星之战模式
    const is_zhanxing = () => config.mode.detail_rule.zhanxing;
    // 是否为天命之战模式
    const is_tianming = () => config.mode.detail_rule.tianming_mode;
    // 是否为咏唱之战模式
    const is_yongchang = () => config.mode.detail_rule.yongchang_mode;
    // 是否为魂之一击模式
    const is_hunzhiyiji = () => config.mode.detail_rule.hunzhiyiji_mode;
    // 是否为万象修罗模式
    const is_wanxiangxiuluo = () => config.mode.detail_rule.wanxiangxiuluo_mode;
    // 是否为背水之战模式
    const is_beishuizhizhan = () => config.mode.detail_rule.beishuizhizhan_mode;
    // 是否为下克上模式
    const is_xiakeshang = () => config.mode.detail_rule.amusement_switches instanceof Array && config.mode.detail_rule.amusement_switches.includes(18);
    // 是否为血流成河模式
    const is_xueliu = () => config.mode.detail_rule._xueliu;
    // ------------------------------------------------------------------------
    // 是否开启古役
    const is_guyi = () => config.mode.detail_rule.guyi_mode;
    // 是否开启一番街的古役
    const is_yifanjieguyi = () => config.mode.detail_rule._yifanjieguyi;
    // 是否为无食断模式
    const no_shiduan = () => config.mode.detail_rule._no_shiduan;
    // 是否为无自摸损模式
    const no_zimosun = () => config.mode.detail_rule._no_zimosun;
    // 是否公开手牌
    const is_openhand = () => config.mode.detail_rule.open_hand;
    // ------------------------------------------------------------------------
    // 立直所需要的立直棒个数, 默认为1
    const get_liqi_need = () => {
        const liqi_need = config.mode.detail_rule._liqi_need;
        return typeof liqi_need == 'number' && liqi_need > -1 ? liqi_need : 1;
    };
    // 本场点数的倍数, 默认为1
    const get_ben_times = () => {
        const ben_times = config.mode.detail_rule._ben_times;
        return typeof ben_times == 'number' && ben_times > -1 ? ben_times : 1;
    };
    // 听牌的罚符, 参数为听牌玩家和未听牌玩家的个数, 有效值 1, 2, 3
    const get_fafu = (ting_cnt, no_ting_cnt) => {
        const fafu_1ting = config.mode.detail_rule.noting_fafu_1;
        const fafu_2ting = config.mode.detail_rule.noting_fafu_2;
        const fafu_3ting = config.mode.detail_rule.noting_fafu_3;
        switch (ting_cnt) {
            // 一个玩家听牌的罚符, 默认为段位规则: 1000
            case 1:
                return typeof fafu_1ting == 'number' ? fafu_1ting : 1000;
            // 两个玩家听牌的罚符, 默认为段位规则: 四麻1500, 三麻2000
            case 2:
                return typeof fafu_2ting == 'number' ? fafu_2ting : no_ting_cnt === 1 ? 2000 : 1500;
            // 三个玩家听牌的罚符, 默认为段位规则: 3000
            case 3:
                return typeof fafu_3ting == 'number' ? fafu_3ting : 1000;
            default:
                return 0;
        }
    };
    // 是否有切上满贯
    const is_qieshang = () => config.mode.detail_rule.have_qieshangmanguan;
    // 是否有头跳
    const is_toutiao = () => config.mode.detail_rule.have_toutiao;
    // 是否开启人和, 而且打点为满贯(5番)
    const is_renhumanguan = () => config.mode.detail_rule._renhumanguan;
    // 是否无大三元大四喜包牌, 修罗模式强制无包牌
    const no_normalbaopai = () => config.mode.detail_rule._no_normalbaopai;
    // 是否有四杠子包牌
    const is_sigangbaopai = () => config.mode.detail_rule._sigangbaopai;
    // 是否禁用流局满贯
    const no_liujumanguan = () => config.mode.detail_rule._no_liujumanguan;
    // 是否禁用一发
    const no_yifa = () => config.mode.detail_rule._no_yifa;
    // 是否不算连风4符
    const no_lianfengsifu = () => config.mode.detail_rule.disable_double_wind_four_fu;
    // 是否禁用表宝牌
    const no_dora = () => config.mode.detail_rule._no_dora;
    // 是否禁用里宝牌
    const no_lidora = () => config.mode.detail_rule._no_lidora;
    // 是否禁用杠表宝牌
    const no_gangdora = () => config.mode.detail_rule._no_gangdora;
    // 是否禁用杠里宝牌
    const no_ganglidora = () => config.mode.detail_rule._no_ganglidora;
    // 明杠表宝牌是否即翻
    const is_dora_jifan = () => config.mode.detail_rule.ming_dora_immediately_open;
    // 是否有三家和了流局
    const is_sanxiangliuju = () => config.mode.detail_rule.have_sanjiahele;
    // 是否禁用累计役满(番数最高三倍满)
    const no_leijiyiman = () => config.mode.detail_rule.disable_leijiyiman;
    // 是否无双倍役满(纯九, 四暗刻单骑, 十三面, 大四喜算单倍役满)
    const no_wyakuman = () => config.mode.detail_rule.disable_double_yakuman;
    // 是否无复合役满(役满牌型打点最多只有一倍)
    const no_composite_yakuman = () => config.mode.detail_rule.disable_composite_yakuman;
    // 是否禁用国士枪暗杠
    const no_guoshiangang = () => config.mode.detail_rule.disable_angang_guoshi;
    // 是否禁用立直需要点数限制(点数不够及负分的情况是否能立直)
    const is_fufenliqi = () => config.mode.detail_rule._fufenliqi;
    // ------------------------------------------------------------------------
    // 是否有包杠, 只适用于非修罗立直麻将
    const is_baogang = () => config.mode.detail_rule._baogang;
    // 是否为青天井模式(谨慎使用, 高打点时很容易崩溃)
    const is_qingtianjing = () => config.mode.detail_rule._qingtianjing;
    // 是否为无振听模式
    const no_zhenting = () => config.mode.detail_rule._no_zhenting;
    // 是否 hupai 无参数时无役荣和自动诈和
    const is_ronghuzhahu = () => config.mode.detail_rule._ronghuzhahu;
    // 是否开启自定义番种'天地创造'
    const is_tiandichuangzao = () => config.mode.detail_rule._tiandichuangzao;
    // 是否开启自定义番种'万物生长'
    const is_wanwushengzhang = () => config.mode.detail_rule._wanwushengzhang;
    // 是否允许大小四喜复合
    const is_sixifuhe = () => config.mode.detail_rule._sixifuhe;
    // 是否为报番模式, 适用于纯享版报菜名
    const is_report_yakus = () => config.mode.detail_rule._report_yakus;
    // ------------------------------------------------------------------------
    // 是否为国标模式
    const is_guobiao = () => config.mode.detail_rule._guobiao;
    // 是否启用国标花牌(用 Constants.HUAPAI 即 0m 当作花牌)
    const is_guobiao_huapai = () => config.mode.detail_rule._guobiao_huapai;
    // 国标模式是否禁用8番缚
    const is_guobiao_no_8fanfu = () => config.mode.detail_rule._guobiao_no_8fanfu;
    // 国标模式是否可以连庄
    const is_guobiao_lianzhuang = () => config.mode.detail_rule._guobiao_lianzhuang;
    // 国标模式为了美观, 将点数放大的倍数
    const scale_points = () => {
        const scale_points = config.mode.detail_rule._scale_points;
        return typeof scale_points == 'number' ? scale_points : 100;
    };
    // 国标模式诈和, 错和赔各家的点数
    const cuohu_points = () => {
        const cuohu_points = config.mode.detail_rule._cuohu_points;
        return typeof cuohu_points == 'number' ? cuohu_points : 10;
    };
    // 国标诈和, 错和后玩家是否陪打
    const is_cuohupeida = () => config.mode.detail_rule._cuohupeida;
    // ------------------------------------------------------------------------
    // 是否随机皮肤, 开启此选项后设置的皮肤无效
    const is_random_skin = () => config.mode.detail_rule._random_skin;
    // 是否随机装扮, 范围包括立直棒, 和牌特效, 立直特效, 头像框, 桌布, 称号, 开启此选项后设置的对应装扮均无效
    const is_random_views = () => config.mode.detail_rule._random_views;

    /**
     * @file: constants.ts - 一些常量和自制的番种信息
     * @author: Fat-pig-Cui
     * @email: chubbypig@qq.com
     * @github: https://github.com/Fat-pig-Cui/majsoul-replay-editor
     */
    // 常量集合
    class Constants {
    }
    // 亲家起手牌数量
    Constants.QIN_TILE_NUM = 14;
    // 闲家起手牌数量
    Constants.XIAN_TILE_NUM = 13;
    // 任何情况下牌山的最大长度
    Constants.PAISHAN_MAX_LEN = 136;
    // 满贯的素点
    Constants.MANGUAN_SUDIAN = 2000;
    // 役满的素点
    Constants.YIMAN_SUDIAN = 8000;
    // 立直诈和的素点(赔满贯)
    Constants.ZHAHU_SUDIAN = -2e3;
    // 川麻诈和的素点(赔6番)
    Constants.ZHAHU_SUDIAN_CHUANMA = -32e3;
    // 特殊牌的后缀
    Constants.SPT_SUFFIX = 't';
    // 国标麻将起和番
    Constants.GB_BASE_FAN = 8;
    // 调用 DFS 函数的起始牌编码
    Constants.DFS_BEGIN_TILE = '1m';
    // 调用 DFS 函数的终止牌编码
    Constants.DFS_END_TILE = '0m';
    // 万象修罗百搭牌编码
    Constants.TBD = 'bd';
    // 国标麻将花牌编码
    Constants.HUAPAI = '0m';
    // 麻将牌的四种类型
    Constants.GROUP = ['m', 'p', 's', 'z'];
    Constants.MAN_MID_TILE = ['2m', '3m', '4m', '5m', '6m', '7m', '8m'];
    Constants.MAN_TER_TILE = ['1m', '9m'];
    Constants.AKA_MAN_TILE = ['0m'];
    Constants.MAN_TILE_NO_AKA = [...Constants.MAN_MID_TILE, ...Constants.MAN_TER_TILE];
    Constants.MAN_TILE = [...Constants.MAN_TILE_NO_AKA, ...Constants.AKA_MAN_TILE];
    Constants.PIN_MID_TILE = ['2p', '3p', '4p', '5p', '6p', '7p', '8p'];
    Constants.PIN_TER_TILE = ['1p', '9p'];
    Constants.AKA_PIN_TILE = ['0p'];
    Constants.PIN_TILE_NO_AKA = [...Constants.PIN_MID_TILE, ...Constants.PIN_TER_TILE];
    Constants.PIN_TILE = [...Constants.PIN_TILE_NO_AKA, ...Constants.AKA_PIN_TILE];
    Constants.SOU_MID_TILE = ['2s', '3s', '4s', '5s', '6s', '7s', '8s'];
    Constants.SOU_TER_TILE = ['1s', '9s'];
    Constants.AKA_SOU_TILE = ['0s'];
    Constants.SOU_TILE_NO_AKA = [...Constants.SOU_MID_TILE, ...Constants.SOU_TER_TILE];
    Constants.SOU_TILE = [...Constants.SOU_TILE_NO_AKA, ...Constants.AKA_SOU_TILE];
    Constants.WIND_TILE = ['1z', '2z', '3z', '4z'];
    Constants.DRAGON_TILE = ['5z', '6z', '7z'];
    Constants.HONOR_TILE = [...Constants.WIND_TILE, ...Constants.DRAGON_TILE];
    Constants.TERMINAL_TILE = [...Constants.MAN_TER_TILE, ...Constants.PIN_TER_TILE, ...Constants.SOU_TER_TILE];
    Constants.YAOJIU_TILE = [...Constants.TERMINAL_TILE, ...Constants.HONOR_TILE];
    Constants.AKA_TILE = [...Constants.AKA_MAN_TILE, ...Constants.AKA_PIN_TILE, ...Constants.AKA_SOU_TILE];
    Constants.TILE_NO_AKA = [
        ...Constants.MAN_TILE_NO_AKA,
        ...Constants.PIN_TILE_NO_AKA,
        ...Constants.SOU_TILE_NO_AKA,
        ...Constants.HONOR_TILE,
    ];
    Constants.TILE = [
        ...Constants.MAN_TILE,
        ...Constants.PIN_TILE,
        ...Constants.SOU_TILE,
        ...Constants.HONOR_TILE,
    ];
    /**
     * 顺子中比它大的牌, 如果某张牌的数字编码(不区分红宝牌)为 i, 则由它构成的顺子中比它大1的牌的数字编码为 NXT2[i]
     *
     * 故可得出 即 j, NXT2[j], NXT2[NXT2[j]] 构成递增的顺子
     *
     * 如果不存在, 则指向 '0m', '0p'
     *
     * 数组长度为37
     */
    Constants.NXT2 = {
        '1m': '2m',
        '2m': '3m',
        '3m': '4m',
        '4m': '5m',
        '5m': '6m',
        '6m': '7m',
        '7m': '8m',
        '8m': '9m',
        '9m': '0m',
        '1p': '2p',
        '2p': '3p',
        '3p': '4p',
        '4p': '5p',
        '5p': '6p',
        '6p': '7p',
        '7p': '8p',
        '8p': '9p',
        '9p': '0m',
        '1s': '2s',
        '2s': '3s',
        '3s': '4s',
        '4s': '5s',
        '5s': '6s',
        '6s': '7s',
        '7s': '8s',
        '8s': '9s',
        '9s': '0m',
        '1z': '0m',
        '2z': '0m',
        '3z': '0m',
        '4z': '0m',
        '5z': '0m',
        '6z': '0m',
        '7z': '0m',
        '0m': '0p',
        '0p': '0s',
        '0s': '0s',
    };
    /**
     * 宝牌指示牌表, 如果某张指示牌的数字编码(不区分红宝牌)为 i, 则它对应的宝牌的数字编码为 DORA_NXT[i]
     *
     * 数组长度35
     */
    Constants.DORA_NXT = {
        '1m': '2m',
        '2m': '3m',
        '3m': '4m',
        '4m': '5m',
        '5m': '6m',
        '6m': '7m',
        '7m': '8m',
        '8m': '9m',
        '9m': '1m',
        '1p': '2p',
        '2p': '3p',
        '3p': '4p',
        '4p': '5p',
        '5p': '6p',
        '6p': '7p',
        '7p': '8p',
        '8p': '9p',
        '9p': '1p',
        '1s': '2s',
        '2s': '3s',
        '3s': '4s',
        '4s': '5s',
        '5s': '6s',
        '6s': '7s',
        '7s': '8s',
        '8s': '9s',
        '9s': '1s',
        '1z': '2z',
        '2z': '3z',
        '3z': '4z',
        '4z': '1z',
        '5z': '6z',
        '6z': '7z',
        '7z': '5z',
    };
    /**
     * 国标麻将组合龙的六种情况所需要的牌型
     */
    Constants.GB_CONDITIONS = [
        ['1m', '4m', '7m', '2p', '5p', '8p', '3s', '6s', '9s'],
        ['1m', '4m', '7m', '3p', '6p', '9p', '2s', '5s', '8s'],
        ['2m', '5m', '8m', '3p', '6p', '9p', '1s', '4s', '7s'],
        ['2m', '5m', '8m', '1p', '4p', '7p', '3s', '6s', '9s'],
        ['3m', '6m', '9m', '1p', '4p', '7p', '2s', '5s', '8s'],
        ['3m', '6m', '9m', '2p', '5p', '8p', '1s', '4s', '7s'],
    ];
    /**
     * 天凤中麻将牌的数字编码与牌编码的对应关系
     */
    Constants.TOUHOU_DICT = {
        '1m': 11, '2m': 12, '3m': 13, '4m': 14, '5m': 15, '6m': 16, '7m': 17, '8m': 18, '9m': 19,
        '1p': 21, '2p': 22, '3p': 23, '4p': 24, '5p': 25, '6p': 26, '7p': 27, '8p': 28, '9p': 29,
        '1s': 31, '2s': 32, '3s': 33, '4s': 34, '5s': 35, '6s': 36, '7s': 37, '8s': 38, '9s': 39,
        '1z': 41, '2z': 42, '3z': 43, '4z': 44, '5z': 45, '6z': 46, '7z': 47,
        '0m': 51, '0p': 52, '0s': 53,
        11: '1m', 12: '2m', 13: '3m', 14: '4m', 15: '5m', 16: '6m', 17: '7m', 18: '8m', 19: '9m',
        21: '1p', 22: '2p', 23: '3p', 24: '4p', 25: '5p', 26: '6p', 27: '7p', 28: '8p', 29: '9p',
        31: '1s', 32: '2s', 33: '3s', 34: '4s', 35: '5s', 36: '6s', 37: '7s', 38: '8s', 39: '9s',
        41: '1z', 42: '2z', 43: '3z', 44: '4z', 45: '5z', 46: '6z', 47: '7z',
        51: '0m', 52: '0p', 53: '0s',
    };
    // 自定义番种: 役种名称的汉字需要在已有的里面选, 否则不会显示
    const DIYFans = () => {
        const _ = cfg.fan.fan.map_;
        // 9000: 诈和, '诈'字无法显示, 原名称为'振和'
        // 9001: 天地创造: '创造'无法显示, 原名称为'天地大白'
        // 9002: 万物生长: '万生长'无法显示, 原名称为'龙发杠载'
        // 9003: 开立直(役满): 对应语音是对局中的宣言立直
        // 9004: 开两立直(役满): 对应语音是对局中的宣言两立直
        // 9005: 开立直(2番)
        // 9006: 开两立直(3番)
        _[9000] = { id: 9000, name_chs: '诈和', show_index: 5, sound: '' };
        _[9001] = { id: 9001, name_chs: '天地创造', show_index: 6, sound: '' };
        _[9002] = { id: 9002, name_chs: '万物生长', show_index: 7, sound: '' };
        _[9003] = { id: 9003, name_chs: '役满 开立直', show_index: 0, sound: 'act_rich' };
        _[9004] = { id: 9004, name_chs: '役满 开两立直', show_index: 0, sound: 'act_drich' };
        _[9005] = { id: 9005, name_chs: '开立直', show_index: 0, sound: 'fan_liqi' };
        _[9006] = { id: 9006, name_chs: '开两立直', show_index: 0, sound: 'fan_dliqi' };
        // 以下是流局满贯和自风场风役种分化
        // 9100: 流局满贯
        // 9101: 东
        // 9102: 连东
        // 9103: 南
        // 9104: 连南
        // 9105: 西: '西'显示不出来
        // 9106: 连西
        // 9107: 北
        // 9108: 连北
        _[9100] = { id: 9100, name_chs: '流局满贯', show_index: 1000, sound: 'fan_liujumanguan' };
        _[9101] = { id: 9101, name_chs: '役牌 东', show_index: 150, sound: 'fan_dong' };
        _[9102] = { id: 9102, name_chs: '役牌 连东', show_index: 150, sound: 'fan_doubledong' };
        _[9103] = { id: 9103, name_chs: '役牌 南', show_index: 150, sound: 'fan_nan' };
        _[9104] = { id: 9104, name_chs: '役牌 连南', show_index: 150, sound: 'fan_doublenan' };
        _[9105] = { id: 9105, name_chs: '役牌 西', show_index: 150, sound: 'fan_xi' };
        _[9106] = { id: 9106, name_chs: '役牌 连西', show_index: 150, sound: 'fan_doublexi' };
        _[9107] = { id: 9107, name_chs: '役牌 北', show_index: 160, sound: 'fan_bei' };
        _[9108] = { id: 9108, name_chs: '役牌 连北', show_index: 160, sound: 'fan_doublebei' };
        // 对局操作语音, 中间会有较长时间的停顿
        // 9200: 立直
        // 9201: 两立直
        // 9202: 吃
        // 9203: 碰
        // 9204: 杠
        // 9205: 拔北
        // 9206: 荣, '荣'无法显示, 原名称为'点和'
        // 9207: 自摸
        _[9200] = { id: 9200, name_chs: '立直', show_index: 0, sound: 'act_rich' };
        _[9201] = { id: 9200, name_chs: '双立直', show_index: 0, sound: 'act_drich' };
        _[9202] = { id: 9202, name_chs: '吃', show_index: 0, sound: 'act_chi' };
        _[9203] = { id: 9203, name_chs: '碰', show_index: 0, sound: 'act_pon' };
        _[9204] = { id: 9204, name_chs: '杠', show_index: 0, sound: 'act_kan' };
        _[9205] = { id: 9205, name_chs: '拔北', show_index: 0, sound: 'act_babei' };
        _[9206] = { id: 9206, name_chs: '荣和', show_index: 0, sound: 'act_ron' };
        _[9207] = { id: 9207, name_chs: '自摸', show_index: 0, sound: 'act_tumo' };
        _[9208] = { id: 9208, name_chs: '对局开始', show_index: 9999, sound: 'ingame_start' };
        // 9209: 终局一位语音(天地无双指一姬的)
        _[9209] = { id: 9209, name_chs: '天地无双', show_index: 9999, sound: 'game_top' };
        _[9210] = { id: 9210, name_chs: '荣和获胜', show_index: 9999, sound: 'game_top_ron' };
        _[9211] = { id: 9211, name_chs: '高分获胜', show_index: 9999, sound: 'game_top_big' };
        // 满贯及以上和听牌语音
        // 9300: 满贯
        // 9301: 跳满, '跳'无法显示, 原名称为'一点五满贯'
        // 9302: 倍满, '倍'无法显示, 原名称为'两满贯'
        // 9303: 三倍满
        // 9304: 役满
        // 9305: 双倍役满
        // 9306: 三倍役满
        // 9307: 四倍役满
        // 9308: 五倍役满
        // 9309: 六倍役满
        // 9310: 累计役满, '累计'无法显示, 原名称为'数满贯'
        // 9311: 听牌, '听'无法显示
        // 9312: 未听牌, '未'无法显示, 原名称为'无听牌'
        _[9300] = { id: 9300, name_chs: '满贯', show_index: 2000, sound: 'gameend_manguan' };
        _[9301] = { id: 9301, name_chs: '跳满', show_index: 2000, sound: 'gameend_tiaoman' };
        _[9302] = { id: 9302, name_chs: '倍满', show_index: 2000, sound: 'gameend_beiman' };
        _[9303] = { id: 9303, name_chs: '三倍满', show_index: 2000, sound: 'gameend_sanbeiman' };
        _[9304] = { id: 9304, name_chs: '役满', show_index: 2000, sound: 'gameend_yiman1' };
        _[9305] = { id: 9305, name_chs: '两倍役满', show_index: 2000, sound: 'gameend_yiman2' };
        _[9306] = { id: 9306, name_chs: '三倍役满', show_index: 2000, sound: 'gameend_yiman3' };
        _[9307] = { id: 9307, name_chs: '四倍役满', show_index: 2000, sound: 'gameend_yiman4' };
        _[9308] = { id: 9308, name_chs: '五倍役满', show_index: 2000, sound: 'gameend_yiman5' };
        _[9309] = { id: 9309, name_chs: '六倍役满', show_index: 2000, sound: 'gameend_yiman6' };
        _[9310] = { id: 9310, name_chs: '累计役满', show_index: 2000, sound: 'gameend_leijiyiman' };
        _[9311] = { id: 9311, name_chs: '听牌', show_index: 2000, sound: 'gameend_tingpai' };
        _[9312] = { id: 9310, name_chs: '未听牌', show_index: 2000, sound: 'gameend_noting' };
        // 流局语音, 这里可以穿插到川麻的番种中
        // 9400: 四风连打
        // 9400: 四杠散了, '散'无法显示
        // 9400: 九种九牌, '种'无法显示
        _[9400] = { id: 9400, name_chs: '四风连打', show_index: 2000, sound: 'gameend_sifenglianda' };
        _[9401] = { id: 9401, name_chs: '四杠散了', show_index: 2000, sound: 'gameend_sigangliuju' };
        _[9402] = { id: 9402, name_chs: '四家立直', show_index: 2000, sound: 'gameend_sijializhi' };
        _[9403] = { id: 9403, name_chs: '九种九牌', show_index: 2000, sound: 'gameend_jiuzhongjiupai' };
        // 大厅交互语音
        // 9500: 获得语音, 都无法显示
        // 9501: 登录语音普通, '语音普'无法显示
        // 9502: 登录语音满羁绊, '语音羁绊'无法显示
        // 9503: 大厅交互语音1, '厅互语音'无法显示
        // 9504: 大厅交互语音2
        // 9505: 大厅交互语音3
        // 9506: 大厅交互语音4
        // 9507: 大厅交互语音5
        // 9508: 大厅交互语音6
        // 9509: 大厅交互语音7
        // 9510: 大厅交互语音8
        // 9511: 送礼物语音普通, '送语音普'无法显示
        // 9512: 送礼物语音喜好, '送语音'无法显示
        // 9513: 好感度升级语音1, '感度升级语音'无法显示
        // 9514: 好感度升级语音2
        // 9515: 好感度升级语音3
        // 9516: 好感度升级语音4
        // 9517: 好感度升级语音5
        // 9518: 契约语音, 都无法显示
        // 9519: 新年语音, '新语音'无法显示
        // 9520: 情人节语音, '情节语音'无法显示
        _[9500] = { id: 9500, name_chs: '获得语音', show_index: 0, sound: 'lobby_selfintro' };
        _[9501] = { id: 9501, name_chs: '登录语音普通', show_index: 0, sound: 'lobby_playerlogin' };
        _[9502] = { id: 9502, name_chs: '登录语音满羁绊', show_index: 2000, sound: 'lobby_playerlogin' };
        _[9503] = { id: 9503, name_chs: '大厅交互语音1', show_index: 0, sound: 'lobby_normal' };
        _[9504] = { id: 9504, name_chs: '大厅交互语音2', show_index: 0, sound: 'lobby_normal' };
        _[9505] = { id: 9505, name_chs: '大厅交互语音3', show_index: 0, sound: 'lobby_normal' };
        _[9506] = { id: 9506, name_chs: '大厅交互语音4', show_index: 0, sound: 'lobby_normal' };
        _[9507] = { id: 9507, name_chs: '大厅交互语音5', show_index: 0, sound: 'lobby_normal' };
        _[9508] = { id: 9508, name_chs: '大厅交互语音6', show_index: 0, sound: 'lobby_normal' };
        _[9509] = { id: 9509, name_chs: '大厅交互语音7', show_index: 0, sound: 'lobby_normal' };
        _[9510] = { id: 9510, name_chs: '大厅交互语音8', show_index: 0, sound: 'lobby_normal' };
        _[9511] = { id: 9511, name_chs: '送礼物语音普通', show_index: 0, sound: 'lobby_gift' };
        _[9512] = { id: 9512, name_chs: '送礼物语音喜好', show_index: 0, sound: 'lobby_gift_favor' };
        _[9513] = { id: 9513, name_chs: '好感度升级语音1', show_index: 0, sound: 'lobby_levelup1' };
        _[9514] = { id: 9514, name_chs: '好感度升级语音2', show_index: 0, sound: 'lobby_levelup2' };
        _[9515] = { id: 9515, name_chs: '好感度升级语音3', show_index: 0, sound: 'lobby_levelup3' };
        _[9516] = { id: 9516, name_chs: '好感度升级语音4', show_index: 0, sound: 'lobby_levelup4' };
        // _[9517] = { id: 9517, name_chs: '好感度升级语音5', show_index: 0, sound: 'lobby_levelmax' };
        _[9517] = { id: 9517, name_chs: '好感度升级语音5', show_index: 0, sound: 'lobby_manjiban' };
        _[9518] = { id: 9518, name_chs: '契约语音', show_index: 0, sound: 'lobby_qiyue' };
        _[9519] = { id: 9519, name_chs: '新年语音', show_index: 0, sound: 'lobby_newyear' };
        _[9520] = { id: 9520, name_chs: '情人节语音', show_index: 0, sound: 'lobby_valentine' };
        // 对局契约特殊语音
        // 9600: 连续打出多张相同牌, '续出多张'无法显示
        // 9600: 打出宝牌, '出'无法显示
        // 9600: 余牌少于10, '余少于'无法显示
        // 9600: 役满听牌, '听'无法显示
        // 9600: 倍满/三倍满听牌, '倍听'无法显示
        _[9600] = { id: 9600, name_chs: '连续打出多张相同牌', show_index: 0, sound: 'ingame_lianda' };
        _[9601] = { id: 9601, name_chs: '打出宝牌', show_index: 0, sound: 'ingame_baopai' };
        _[9602] = { id: 9602, name_chs: '余牌少于10', show_index: 0, sound: 'ingame_remain10' };
        _[9603] = { id: 9603, name_chs: '役满听牌', show_index: 0, sound: 'ingame_yiman' };
        _[9604] = { id: 9604, name_chs: '倍满/三倍满听牌', show_index: 0, sound: 'ingame_beiman' };
        _[9605] = { id: 9605, name_chs: '进入友人房', show_index: 0, sound: 'lobby_room_in' };
        _[9606] = { id: 9606, name_chs: '友人房内准备', show_index: 0, sound: 'lobby_room_ready' };
        // 一番街的特色古役
        // 9700: 推不倒, '推倒'无法显示, 原名称为'对称牌'
        // 9701: 赤三色, '赤'无法显示, 原名称为'红三色'
        // 9702: 三色通贯
        // 9703: 四连刻
        // 9704: 一色四同顺
        // 9705: 红孔雀, '孔雀'无法显示, 原名称为'红一色'
        // 9706: 红一点
        // 9707: 黑一色, '黑'无法显示, 原名称为'暗一色'
        // 9708: 十三不搭, '搭'无法显示, 原名称为'十三不顺'
        // 9709: 百万石, '百万'无法显示, 原名称为'1000000石'
        // 9710: 金门桥, '桥'无法显示, 原名称为'金门顺'
        // 9711: 东北新干线, '新干线'无法显示, 原名称'东北一气通贯'
        // 9712: 无发绿一色
        _[9700] = { id: 9700, name_chs: '推不倒', show_index: 0, sound: '' };
        _[9701] = { id: 9701, name_chs: '赤三色', show_index: 0, sound: '' };
        _[9702] = { id: 9702, name_chs: '三色通贯', show_index: 0, sound: '' };
        _[9703] = { id: 9703, name_chs: '四连刻', show_index: 0, sound: '' };
        _[9704] = { id: 9704, name_chs: '一色四同顺', show_index: 0, sound: '' };
        _[9705] = { id: 9705, name_chs: '红孔雀', show_index: 0, sound: '' };
        _[9706] = { id: 9706, name_chs: '红一点', show_index: 0, sound: '' };
        _[9707] = { id: 9707, name_chs: '黑一色', show_index: 0, sound: '' };
        _[9708] = { id: 9708, name_chs: '十三不搭', show_index: 0, sound: '' };
        _[9709] = { id: 9709, name_chs: '百万石', show_index: 0, sound: '' };
        _[9710] = { id: 9710, name_chs: '金门桥', show_index: 0, sound: '' };
        _[9711] = { id: 9711, name_chs: '东北新干线', show_index: 0, sound: '' };
        _[9712] = { id: 9712, name_chs: '无发绿一色', show_index: 0, sound: 'fan_lvyise' };
        [
            9000, 9001, 9002, 9003, 9004, 9005, 9006,
            9100, 9101, 9102, 9103, 9104, 9105, 9106, 9107, 9108,
            9200, 9201, 9202, 9203, 9204, 9205, 9206, 9207, 9208, 9209, 9210, 9211,
            9300, 9301, 9302, 9303, 9304, 9305, 9306, 9307, 9308, 9309, 9310, 9311, 9312,
            9400, 9401, 9402, 9403,
            9500, 9501, 9502, 9503, 9504, 9505, 9506, 9507, 9508, 9509, 9510, 9511, 9512, 9513, 9514, 9515, 9516, 9517, 9518, 9519, 9520,
            9600, 9601, 9602, 9603, 9604, 9605, 9606,
            9700, 9701, 9702, 9703, 9704, 9705, 9706, 9707, 9708, 9709, 9710, 9711, 9712
        ].forEach(id => {
            _[id].name_chs_t = _[id].name_jp = _[id].name_en = '';
        });
    };
    // 国标麻将番种
    const guobiaoFans = () => {
        const _ = cfg.fan.fan.map_;
        _[8000] = { id: 8000, name_chs: '大四喜', show_index: 8000, sound: 'fan_dasixi' };
        _[8001] = { id: 8001, name_chs: '大三元', show_index: 8001, sound: 'fan_dasanyuan' };
        _[8002] = { id: 8002, name_chs: '绿一色', show_index: 8002, sound: 'fan_lvyise' };
        _[8003] = { id: 8003, name_chs: '九莲宝灯', show_index: 8003, sound: 'fan_jiulianbaodeng' };
        _[8004] = { id: 8004, name_chs: '四杠', show_index: 8004, sound: 'fan_sigangzi' };
        _[8005] = { id: 8005, name_chs: '连七对', show_index: 8005, sound: '' };
        _[8006] = { id: 8006, name_chs: '十三幺', show_index: 8006, sound: 'fan_guoshiwushuang' };
        _[8007] = { id: 8007, name_chs: '清幺九', show_index: 8007, sound: 'fan_qinglaotou' };
        _[8008] = { id: 8008, name_chs: '小四喜', show_index: 8008, sound: 'fan_xiaosixi' };
        _[8009] = { id: 8009, name_chs: '小三元', show_index: 8009, sound: 'fan_xiaosanyuan' };
        _[8010] = { id: 8010, name_chs: '字一色', show_index: 8010, sound: 'fan_ziyise' };
        _[8011] = { id: 8011, name_chs: '四暗刻', show_index: 8011, sound: 'fan_sianke' };
        _[8012] = { id: 8012, name_chs: '一色双龙会', show_index: 8012, sound: '' };
        _[8013] = { id: 8013, name_chs: '一色四同顺', show_index: 8013, sound: '' };
        _[8014] = { id: 8014, name_chs: '一色四节高', show_index: 8014, sound: '' };
        _[8015] = { id: 8015, name_chs: '一色四步高', show_index: 8015, sound: '' };
        _[8016] = { id: 8016, name_chs: '三杠', show_index: 8016, sound: 'fan_sangangzi' };
        _[8017] = { id: 8017, name_chs: '混幺九', show_index: 8017, sound: 'fan_hunlaotou' };
        _[8018] = { id: 8018, name_chs: '七对', show_index: 8018, sound: 'fan_qiduizi' };
        _[8019] = { id: 8019, name_chs: '七星不靠', show_index: 8019, sound: '' };
        _[8020] = { id: 8020, name_chs: '全双刻', show_index: 8020, sound: '' };
        _[8021] = { id: 8021, name_chs: '清一色', show_index: 8021, sound: 'fan_qingyise' };
        _[8022] = { id: 8022, name_chs: '一色三同顺', show_index: 8022, sound: '' };
        _[8023] = { id: 8023, name_chs: '一色三节高', show_index: 8023, sound: '' };
        _[8024] = { id: 8024, name_chs: '全大', show_index: 8024, sound: '' };
        _[8025] = { id: 8025, name_chs: '全中', show_index: 8025, sound: '' };
        _[8026] = { id: 8026, name_chs: '全小', show_index: 8026, sound: '' };
        _[8027] = { id: 8027, name_chs: '清龙', show_index: 8027, sound: 'fan_yiqitongguan' };
        _[8028] = { id: 8028, name_chs: '三色双龙会', show_index: 8028, sound: '' };
        _[8029] = { id: 8029, name_chs: '一色三步高', show_index: 8029, sound: '' };
        _[8030] = { id: 8030, name_chs: '全带五', show_index: 8030, sound: '' };
        _[8031] = { id: 8031, name_chs: '三同刻', show_index: 8031, sound: 'fan_sansetongke' };
        _[8032] = { id: 8032, name_chs: '三暗刻', show_index: 8032, sound: 'fan_sananke' };
        _[8033] = { id: 8033, name_chs: '全不靠', show_index: 8033, sound: '' };
        _[8034] = { id: 8034, name_chs: '组合龙', show_index: 8034, sound: '' };
        _[8035] = { id: 8035, name_chs: '大于五', show_index: 8035, sound: '' };
        _[8036] = { id: 8036, name_chs: '小于五', show_index: 8036, sound: '' };
        _[8037] = { id: 8037, name_chs: '三风刻', show_index: 8037, sound: '' };
        _[8038] = { id: 8038, name_chs: '花龙', show_index: 8038, sound: '' };
        _[8039] = { id: 8039, name_chs: '推不倒', show_index: 8039, sound: '' };
        _[8040] = { id: 8040, name_chs: '三色三同顺', show_index: 8040, sound: 'fan_sansetongshun' };
        _[8041] = { id: 8041, name_chs: '三色三节高', show_index: 8041, sound: '' };
        _[8042] = { id: 8042, name_chs: '无番和', show_index: 8042, sound: '' };
        _[8043] = { id: 8043, name_chs: '妙手回春', show_index: 8043, sound: 'fan_haidi' };
        _[8044] = { id: 8044, name_chs: '海底捞月', show_index: 8044, sound: 'fan_hedi' };
        _[8045] = { id: 8045, name_chs: '杠上开花', show_index: 8045, sound: 'fan_lingshang' };
        _[8046] = { id: 8046, name_chs: '抢杠和', show_index: 8046, sound: 'fan_qianggang' };
        _[8047] = { id: 8047, name_chs: '碰碰和', show_index: 8047, sound: 'fan_duiduihu' };
        _[8048] = { id: 8048, name_chs: '混一色', show_index: 8048, sound: 'fan_hunyise' };
        _[8049] = { id: 8049, name_chs: '三色三步高', show_index: 8049, sound: '' };
        _[8050] = { id: 8050, name_chs: '五门齐', show_index: 8050, sound: '' };
        _[8051] = { id: 8051, name_chs: '全求人', show_index: 8051, sound: '' };
        _[8052] = { id: 8052, name_chs: '双暗杠', show_index: 8052, sound: '' };
        _[8053] = { id: 8053, name_chs: '双箭刻', show_index: 8053, sound: '' };
        _[8054] = { id: 8054, name_chs: '全带幺', show_index: 8054, sound: 'fan_hunquandaiyaojiu' };
        _[8055] = { id: 8055, name_chs: '不求人', show_index: 8055, sound: 'fan_zimo' };
        _[8056] = { id: 8056, name_chs: '双明杠', show_index: 8056, sound: '' };
        _[8057] = { id: 8057, name_chs: '和绝张', show_index: 8057, sound: '' };
        _[8058] = { id: 8058, name_chs: '箭刻 白', show_index: 8058, sound: 'fan_bai' };
        _[8059] = { id: 8059, name_chs: '箭刻 发', show_index: 8059, sound: 'fan_fa' };
        _[8060] = { id: 8060, name_chs: '箭刻 中', show_index: 8060, sound: 'fan_zhong' };
        _[8061] = { id: 8061, name_chs: '圈风刻', show_index: 8061, sound: '' };
        _[8062] = { id: 8062, name_chs: '门风刻', show_index: 8062, sound: '' };
        _[8063] = { id: 8063, name_chs: '门前清', show_index: 8063, sound: '' };
        _[8064] = { id: 8064, name_chs: '平和', show_index: 8064, sound: 'fan_pinghu' };
        _[8065] = { id: 8065, name_chs: '四归一', show_index: 8065, sound: 'scfan_gen' };
        _[8066] = { id: 8066, name_chs: '双同刻', show_index: 8066, sound: '' };
        _[8067] = { id: 8067, name_chs: '双暗刻', show_index: 8067, sound: '' };
        _[8068] = { id: 8068, name_chs: '暗杠', show_index: 8068, sound: '' };
        _[8069] = { id: 8069, name_chs: '断幺', show_index: 8069, sound: 'fan_duanyao' };
        _[8070] = { id: 8070, name_chs: '一般高', show_index: 8070, sound: 'fan_yibeikou' };
        _[8071] = { id: 8071, name_chs: '喜相逢', show_index: 8071, sound: '' };
        _[8072] = { id: 8072, name_chs: '连六', show_index: 8072, sound: '' };
        _[8073] = { id: 8073, name_chs: '老少副', show_index: 8073, sound: '' };
        _[8074] = { id: 8074, name_chs: '幺九刻', show_index: 8074, sound: '' };
        _[8075] = { id: 8075, name_chs: '明杠', show_index: 8075, sound: '' };
        _[8076] = { id: 8076, name_chs: '缺一门', show_index: 8076, sound: '' };
        _[8077] = { id: 8077, name_chs: '无字', show_index: 8077, sound: '' };
        _[8078] = { id: 8078, name_chs: '边张', show_index: 8078, sound: '' };
        _[8079] = { id: 8079, name_chs: '坎张', show_index: 8079, sound: '' };
        _[8080] = { id: 8080, name_chs: '单钓将', show_index: 8080, sound: '' };
        _[8081] = { id: 8081, name_chs: '自摸', show_index: 8081, sound: 'fan_zimo' };
        _[8082] = { id: 8082, name_chs: '明暗杠', show_index: 8082, sound: '' };
        _[8083] = { id: 8083, name_chs: '天和', show_index: 8083, sound: 'fan_tianhu' };
        _[8084] = { id: 8084, name_chs: '地和', show_index: 8084, sound: 'fan_dihu' };
        _[8085] = { id: 8085, name_chs: '人和', show_index: 8085, sound: '' };
        // 花牌1-8, 以及'一大堆'情况
        _[8091] = { id: 8091, name_chs: '花牌', show_index: 8091, sound: 'fan_dora1' };
        _[8092] = { id: 8092, name_chs: '花牌', show_index: 8092, sound: 'fan_dora2' };
        _[8093] = { id: 8093, name_chs: '花牌', show_index: 8093, sound: 'fan_dora3' };
        _[8094] = { id: 8094, name_chs: '花牌', show_index: 8094, sound: 'fan_dora4' };
        _[8095] = { id: 8095, name_chs: '花牌', show_index: 8095, sound: 'fan_dora5' };
        _[8096] = { id: 8096, name_chs: '花牌', show_index: 8096, sound: 'fan_dora6' };
        _[8097] = { id: 8097, name_chs: '花牌', show_index: 8097, sound: 'fan_dora7' };
        _[8098] = { id: 8098, name_chs: '花牌', show_index: 8098, sound: 'fan_dora8' };
        _[8099] = { id: 8099, name_chs: '花牌', show_index: 8099, sound: 'fan_dora13' };
        [
            8000, 8001, 8002, 8003, 8004, 8005, 8006,
            8007, 8008, 8009, 8010, 8011, 8012,
            8013, 8014,
            8015, 8016, 8017,
            8018, 8019, 8020, 8021, 8022, 8023, 8024, 8025, 8026,
            8027, 8028, 8029, 8030, 8031, 8032,
            8033, 8034, 8035, 8036, 8037,
            8038, 8039, 8040, 8041, 8042, 8043, 8044, 8045, 8046,
            8047, 8048, 8049, 8050, 8051, 8052, 8053,
            8054, 8055, 8056, 8057,
            8058, 8059, 8060, 8061, 8062, 8063, 8064, 8065, 8066, 8067, 8068, 8069,
            8070, 8071, 8072, 8073, 8074, 8075, 8076, 8077, 8078, 8079, 8080, 8081,
            8082, 8083, 8084, 8085,
            8091, 8092, 8093, 8094, 8095, 8096, 8097, 8098, 8099
        ].forEach(id => {
            _[id].name_chs_t = _[id].name_jp = _[id].name_en = '';
        });
    };

    /**
     * @file: baseUtils.ts - 一些基础的辅助函数
     * @author: Fat-pig-Cui
     * @email: chubbypig@qq.com
     * @github: https://github.com/Fat-pig-Cui/majsoul-replay-editor
     */
    /**
     * 将 tile 牌简化: 去掉最后的 SPT_SUFFIX, 并将红宝牌转换为普通牌
     */
    const simplify = (tile) => {
        if (tile[0] == '0')
            return '5' + tile[1];
        return tile[0] + tile[1];
    };
    /**
     * 返回和 tile 等效的所有牌, 优先把红宝牌和含有 SPT_SUFFIX 放到后面
     * @example
     * allEqualTiles('5m')
     * // return ['5m', '0m', '5mt', '0mt']
     */
    const allEqualTiles = (tile) => {
        if (tile === Constants.TBD)
            return [Constants.TBD];
        tile = tile[0] + tile[1]; // 去掉可能存在的 SPT_SUFFIX
        if (tile[0] === '0' || tile[0] === '5' && tile[1] !== 'z')
            return ['5' + tile[1], '5' + tile[1] + Constants.SPT_SUFFIX, '0' + tile[1], '0' + tile[1] + Constants.SPT_SUFFIX];
        else
            return [tile, tile + Constants.SPT_SUFFIX];
    };
    /**
     * 解析牌, 会将简化后牌编码恢复成单个并列样子
     * @example
     * decompose('123m99p')
     * // return '1m2m3m9p9p'
     */
    const decompose = (tiles) => {
        const x = tiles.replace(/\s*/g, '');
        const random_tiles = '.HTYDMPS'; // 随机牌
        const bd_tile_num = x.match(/b/g) ? x.match(/b/g).length : 0;
        const matches = x.match(/\d+[mpsz]t?|\.|H|T|Y|D|M|P|S/g);
        let ret = '';
        for (let i = 0; i < bd_tile_num; i++)
            ret += Constants.TBD; // 万象修罗百搭牌
        for (const match of matches) {
            if (match.length === 1 && random_tiles.includes(match)) {
                ret += match + match;
                continue;
            }
            const kind_index = match[match.length - 1] === Constants.SPT_SUFFIX ? match.length - 2 : match.length - 1;
            let tile_kind = match[kind_index];
            if (kind_index === match.length - 2)
                tile_kind += Constants.SPT_SUFFIX;
            for (let j = 0; j < kind_index; j++)
                ret += match[j] + tile_kind;
        }
        return ret;
    };
    // 手牌理牌算法
    const cmp = (x, y) => {
        x = simplify(x);
        y = simplify(y);
        if (x === y)
            return 0;
        if (x === Constants.TBD)
            return -1;
        if (y === Constants.TBD)
            return 1;
        const group = Constants.GROUP;
        const group_index_x = group.indexOf(x[1]), group_index_y = group.indexOf(y[1]);
        const num_x = parseInt(x), num_y = parseInt(y);
        if (group_index_x > group_index_y)
            return 1;
        else if (group_index_x < group_index_y)
            return -1;
        else if (num_x > num_y)
            return 1;
        else if (num_x < num_y)
            return -1;
        return 0;
    };
    // 判断第一个参数里面的所有牌是否为第二个参数里面的牌的子集, 考虑和赤宝牌和特殊牌
    const inTiles = (x, y) => {
        if (typeof x == 'string')
            x = [x];
        const cnt = {};
        for (const tile of y) {
            if (cnt[tile] === undefined)
                cnt[tile] = 0;
            cnt[tile]++;
        }
        for (const tile of x) {
            if (cnt[tile] === undefined)
                return false;
            cnt[tile]--;
            if (cnt[tile] < 0)
                return false;
        }
        return true;
    };
    // 随机排序比较函数
    const randomCmp = () => Math.random() - 0.5;
    /**
     * 判断 tile 字符串是否合法
     * @param tile - 输入的牌
     * @param type - 是否允许'.HTYDMPS'等随机牌, 默认不允许
     */
    const isTile = (tile, type = false) => {
        if (tile.length < 2 || tile.length > 3 || (tile.length === 3 && tile[2] !== Constants.SPT_SUFFIX))
            return false;
        if (tile === Constants.TBD)
            return true;
        if (type) {
            const random_tiles = ['.', 'H', 'T', 'Y', 'D', 'M', 'P', 'S'];
            for (const t of random_tiles) {
                const tmp_random_tile = t.repeat(2);
                if (tile === tmp_random_tile)
                    return true;
            }
        }
        const honor_numbers = ['1', '2', '3', '4', '5', '6', '7'];
        const ordinal_numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
        if (tile[1] === 'z')
            return honor_numbers.includes(tile[0]);
        else if (['m', 'p', 's'].includes(tile[1]))
            return ordinal_numbers.includes(tile[0]);
        return false;
    };
    // 判断 seat 参数是否为合法的 seat
    const isValidSeat = (seat) => {
        return seat >= 0 && seat < base_info.player_cnt && Math.floor(seat) === seat;
    };
    // 判断 awaiting_index 参数是否为 AwaitingIndex 类型
    const isAwaitingIndex = (awaiting_index) => {
        return [0, 1, 2].includes(awaiting_index);
    };
    // 判断 beishui_type 参数是否为 BeishuiType 类型
    const isBeishuiType = (beishui_type) => {
        return [0, 1, 2].includes(beishui_type);
    };
    // 辅助函数, chang, ju, ben 转换为控制台输出的所在小局
    const errRoundInfo = () => {
        if (is_chuanma())
            return `第${all_data.all_actions.length + 1}局: `;
        const words = [`东`, `南`, `西`, `北`];
        return `第${all_data.all_actions.length + 1}局(${words[base_info.chang]}${base_info.ju + 1}局${base_info.ben}本场): `;
    };
    // 川麻, 判断 seat 玩家是否花猪
    const isHuazhu = (seat) => {
        // 注意 gaps 的 012 分别对应 pms, 而不是 mps
        if (is_chuanma()) {
            for (const tile of player_tiles[seat]) { // 查手牌
                if (tile[1] === 'm' && gaps[seat] === 1)
                    return true;
                if (tile[1] === 'p' && gaps[seat] === 0)
                    return true;
                if (tile[1] === 's' && gaps[seat] === 2)
                    return true;
            }
            for (const f of fulu[seat]) { // 查副露
                const tile = f.tile[0];
                if (tile[1] === 'm' && gaps[seat] === 1)
                    return true;
                if (tile[1] === 'p' && gaps[seat] === 0)
                    return true;
                if (tile[1] === 's' && gaps[seat] === 2)
                    return true;
            }
        }
        return false;
    };

    /**
     * @file: exportedUtils.ts - 一些要 export 的辅助函数
     * @author: Fat-pig-Cui
     * @email: chubbypig@qq.com
     * @github: https://github.com/Fat-pig-Cui/majsoul-replay-editor
     */
    /**
     * 获取当前位置还剩余多少牌
     */
    const getLeftTileCnt = () => {
        let left_cnt = paishan.length - 14;
        if (base_info.player_cnt === 2)
            left_cnt = paishan.length - 18;
        else if (is_chuanma() || is_guobiao())
            left_cnt = paishan.length;
        if (is_zhanxing())
            left_cnt += awaiting_tiles.length;
        return left_cnt;
    };
    /**
     * 判断 tile 牌是否满足 type 规则
     * @example
     * judgeTile('1m', 'M')
     * // return true
     * @param tile - 要验的牌
     * @param type - 规则:
     * - 'H': 字牌
     * - 'T': 老头牌
     * - 'Y': 幺九牌
     * - 'D': 中张牌
     * - 'M': 万子
     * - 'P': 饼子
     * - 'S': 索子
     * - 'L': 组成绿一色的牌
     * - 'jiangdui': 川麻: 组成将对的牌
     * - 'quanshuang': 国标: 组成全双刻的牌
     * - 'quanda': 国标: 组成全大的牌
     * - 'quanzhong': 国标: 组成全中的牌
     * - 'quanxiao': 国标: 组成全小的牌
     * - 'dayuwu': 国标: 组成大于五的牌
     * - 'xiaoyuwu': 国标: 组成小于五的牌
     * - 'tuibudao': 国标: 组成推不倒的牌
     * - 'hongkongque': 一番街古役: 组成红孔雀的牌
     * - 'hongyidian': 一番街古役: 组成红一点的牌
     * - 'heiyise': 一番街古役: 组成黑一色的牌
     */
    const judgeTile = (tile, type) => {
        if (typeof tile != 'string' || tile.length === 1)
            throw new Error(errRoundInfo() + `judgeTile: tile 格式不合规: ${tile}`);
        if (tile === Constants.TBD)
            return true;
        tile = simplify(tile);
        switch (type) {
            case 'Y':
                return tile[0] === '1' || tile[0] === '9' || tile[1] === 'z';
            case 'D':
                return !(tile[0] === '1' || tile[0] === '9' || tile[1] === 'z');
            case 'T':
                return tile[0] === '1' && tile[1] !== 'z' || tile[0] === '9';
            case 'H':
                return tile[1] === 'z';
            case 'M':
                return tile[1] === 'm';
            case 'P':
                return tile[1] === 'p';
            case 'S':
                return tile[1] === 's';
            case 'L':
                return separate('23468s6z').includes(tile);
            case 'jiangdui':
                return tile[1] !== 'z' && (tile[0] === '2' || tile[0] === '5' || tile[0] === '8');
            case 'quanshuang':
                return tile[1] !== 'z' && ['2', '4', '6', '8'].includes(tile[0]);
            case 'quanda':
                return tile[1] !== 'z' && ['7', '8', '9'].includes(tile[0]);
            case 'quanzhong':
                return tile[1] !== 'z' && ['4', '5', '6'].includes(tile[0]);
            case 'quanxiao':
                return tile[1] !== 'z' && ['1', '2', '3'].includes(tile[0]);
            case 'dayuwu':
                return tile[1] !== 'z' && ['6', '7', '8', '9'].includes(tile[0]);
            case 'xiaoyuwu':
                return tile[1] !== 'z' && ['1', '2', '3', '4'].includes(tile[0]);
            case 'tuibudao':
                return separate('1234589p245689s5z').includes(tile);
            case 'hongkongque':
                return separate('1579s7z').includes(tile);
            case 'hongyidian':
                return separate('23468s7z').includes(tile);
            case 'heiyise':
                return separate('248p1234z').includes(tile);
            default:
                throw new Error(errRoundInfo() + `judgeTile: type 格式不合规: ${type}`);
        }
    };
    /**
     * 判断两个牌是否等效
     */
    const isEqualTile = (x, y) => simplify(x) === simplify(y);
    const separateUnified = (tiles, mode = 'strict') => {
        if (!tiles)
            return [];
        if (tiles instanceof Array)
            return tiles;
        let s = decompose(tiles);
        const ret = [];
        const extended = mode === 'extended';
        while (s.length > 0) {
            const tmp_tile = s.substring(0, 2);
            if (!isTile(tmp_tile, extended)) {
                // 维持旧行为：只报错不抛异常
                console.error(errRoundInfo() + `separate: 牌格式不合规: ${tmp_tile}`);
            }
            if (s.length > 2 && s[2] === Constants.SPT_SUFFIX) { // 特殊牌
                ret.push(s.substring(0, 3));
                s = s.substring(3);
            }
            else {
                ret.push(s.substring(0, 2));
                s = s.substring(2);
            }
        }
        return ret;
    };
    /**
     * 拆分牌为数组, 与 decompose 类似, 不过返回的是数组
     * @example
     * separate('123m99p')
     * // return ['1m', '2m', '3m', '9p', '9p']
     */
    const separate = (tiles) => {
        return separateUnified(tiles, 'strict');
    };
    /**
     * 拆分牌为数组, 比 separate 更进一步, 加入了摸切
     * @example
     * separateWithMoqie('123m.9p')
     * // return ['1m', '2m', '3m', '..', '9p']
     */
    const separateWithMoqie = (tiles) => {
        return separateUnified(tiles, 'extended');
    };
    /**
     * 拆分牌为数组, 比 separateWithMoqie 更进一步, 可以拆分随机牌
     * @example
     * separateWithParam('123mY9p')
     * // return ['1m', '2m', '3m', 'YY', '9p']
     */
    const separateWithParam = (tiles) => {
        return separateUnified(tiles, 'extended');
    };
    /**
     * 计算手牌为 tiles 时的和牌型
     * @example
     * calcHupai('11122233344455z')
     * // return 1
     * calcHupai('19m19p19s11234567z')
     * // return 3
     * calcHupai('19m19p19s1234567z')
     * // return 0, 因为牌少一张, 处于待牌状态, 不是和牌型
     * @param tiles - 手牌
     * @param type - 是否可能没有百搭牌, 默认为可能有百搭牌
     * @returns
     * - 0: 不是和牌型
     * - 1: 一般型和牌
     * - 2: 七对子和牌
     * - 3: 国士型和牌
     * - 4: 国标中全不靠和牌(不含组合龙)
     * - 5: 国标中全不靠和牌(含有组合龙)
     * - 6-11: 国标中不含全不靠的组合龙和牌
     * - 12: 一番街古役: 十三不搭
     */
    const calcHupai = (tiles, type = false) => {
        const cnt = {}, tmp = {};
        for (const tile of Constants.TILE_NO_AKA)
            cnt[tile] = tmp[tile] = 0;
        cnt[Constants.TBD] = 0;
        for (const tile of tiles)
            cnt[simplify(tile)]++;
        if (is_guobiao() && tiles.includes(Constants.HUAPAI)) // 国标无法听花牌, 有花牌一定不是和牌型
            return 0;
        if (is_wanxiangxiuluo() && cnt[Constants.TBD] === 1 && !type) {
            const tmp_tiles = [];
            for (const tile of tiles)
                if (tile !== Constants.TBD)
                    tmp_tiles.push(tile);
            for (const tile of Constants.TILE_NO_AKA) { // 百搭牌试所有牌
                tmp_tiles.push(tile);
                const result = calcHupai(tmp_tiles, true);
                if (result !== 0) // 存在百搭牌使得成为和牌型, 则返回
                    return result;
                tmp_tiles.pop();
            }
            return 0;
        }
        const group = Constants.GROUP;
        for (const tile of Constants.TILE_NO_AKA) {
            if (cnt[tile] >= 2) { // 假设雀头, 则剩下的只有4个面子
                cnt[tile] -= 2;
                let ok = true; // 先假设能和, 再依条件否定
                for (const tl of Constants.TILE_NO_AKA)
                    tmp[tl] = cnt[tl];
                tmp['0m'] = tmp['0p'] = tmp['0s'] = 0;
                for (let k = 0; k < 3; k++) {
                    for (let j = 1 + group[k]; j !== '0s'; j = Constants.NXT2[j]) {
                        if (tmp[j] < 0) { // 若牌数量减为了负数, 说明有有未成形的顺子
                            ok = false;
                            break;
                        }
                        tmp[j] %= 3; // 去掉暗刻, 如果 tmp[j] 仍然不为0的话, 则要构成和牌型一定构成顺子
                        // j, Constants.NXT2[j], Constants.NXT2[NXT2[j]] 构成顺子, 三个一组减去
                        tmp[Constants.NXT2[j]] -= tmp[j];
                        tmp[Constants.NXT2[Constants.NXT2[j]]] -= tmp[j];
                    }
                    tmp['0m'] = tmp['0p'] = tmp['0s'] = 0;
                }
                // 若字牌不能构成暗刻
                for (const tile of Constants.HONOR_TILE)
                    if (tmp[tile] % 3 !== 0)
                        ok = false;
                if (ok)
                    return 1;
                cnt[tile] += 2;
            }
        }
        // 七对子
        let duizi = 0;
        for (const tile of Constants.TILE_NO_AKA) {
            if (cnt[tile] === 2)
                duizi++;
            // 本来只要判断 cnt[i] === 4 就行, 这里扩展成作弊大于四张牌的情况
            if (cnt[tile] >= 4 && cnt[tile] % 2 === 0 && (is_chuanma() || is_guobiao()))
                duizi += cnt[tile] / 2;
        }
        if (duizi === 7)
            return 2;
        // 国士无双
        let guoshi = true;
        for (const tile of Constants.TILE_NO_AKA) {
            if (Constants.YAOJIU_TILE.includes(tile)) {
                if (cnt[tile] === 0) // 所有幺九牌都至少有一张
                    guoshi = false;
            }
            else if (cnt[tile] > 0) // 存在非幺九牌
                guoshi = false;
        }
        if (guoshi)
            return 3;
        if (is_guobiao() && tiles.length === Constants.QIN_TILE_NUM) { // 国标的全不靠和七星不靠
            let quanbukao = true;
            for (const tile of Constants.TILE_NO_AKA)
                if (cnt[tile] >= 2)
                    quanbukao = false;
            // 3*3 的数组, 每一行代表一个花色, 三行分别对应 m, p, s 色, 每一行的三个元素分别代表是否有147, 258, 369中的牌
            const jin_huase = [
                [false, false, false],
                [false, false, false],
                [false, false, false],
            ];
            for (let j = 0; j < 3; j++)
                for (let i = 0; i <= 8; i++)
                    if (cnt[i + 1 + group[j]] === 1)
                        jin_huase[j][i % 3] = true;
            // jin_huase 的每一行, 每一列都最多只有一个 true
            for (let i = 0; i < 3; i++) {
                let true_cnt_row = 0, true_cnt_col = 0;
                for (let j = 0; j < 3; j++) {
                    if (jin_huase[i][j]) // 扫描每一行
                        true_cnt_row++;
                    if (jin_huase[j][i]) // 扫描每一列
                        true_cnt_col++;
                }
                if (true_cnt_row >= 2 || true_cnt_col >= 2)
                    quanbukao = false;
            }
            if (quanbukao) {
                let zuhelong = true; // 是否复合组合龙
                for (let j = 0; j < 3; j++)
                    for (let i = 0; i < 3; i++)
                        if (jin_huase[j][i])
                            if (!(cnt[i + 1 + group[j]] === 1 && cnt[i + 4 + group[j]] === 1 && cnt[i + 7 + group[j]] === 1))
                                zuhelong = false;
                return !zuhelong ? 4 : 5;
            }
        }
        if (is_guobiao() && tiles.length >= 11) { // 国标不含全不靠的组合龙
            const conditions = Constants.GB_CONDITIONS;
            const flags = [true, true, true, true, true, true];
            for (const [row, condition] of conditions.entries())
                for (const tile of condition)
                    if (cnt[tile] === 0)
                        flags[row] = false;
            for (const [row, condition] of conditions.entries()) {
                if (flags[row]) {
                    const new_tiles = tiles.slice();
                    for (const tile of condition)
                        new_tiles.splice(new_tiles.indexOf(tile), 1);
                    if (calcHupai(new_tiles) === 1)
                        return 6 + row;
                }
            }
        }
        if (is_yifanjieguyi() && tiles.length === 14) {
            let shisanbuda = true;
            let duizi_num = 0;
            for (const tile of Constants.TILE_NO_AKA) {
                if (cnt[tile] === 2)
                    duizi_num++;
                if (cnt[tile] >= 3)
                    shisanbuda = false;
            }
            if (duizi_num !== 1)
                shisanbuda = false;
            for (let j = 0; j < 3; j++)
                for (let i = 1; i <= 8; i++)
                    if (cnt[i + group[j]] >= 1)
                        if (cnt[i + 1 + group[j]] !== 0 || (i + 2 <= 9 && cnt[i + 2 + group[j]] !== 0))
                            shisanbuda = false;
            if (shisanbuda)
                return 12;
        }
        return 0;
    };
    /**
     * 计算 seat 号玩家的所有听牌
     * @example
     * // 当 player_tiles[0] 为 separate('1122335577889m')
     * calcTingpai(0)
     * // return [{tile: '6m'}, {tile: '9m'}]
     * @param seat - seat 号玩家
     * @param type - 是否考虑听第5张(无虚听), 默认不考虑
     */
    const calcTingpai = (seat, type = false) => {
        if (is_chuanma() && isHuazhu(seat))
            return [];
        const tiles = player_tiles[seat];
        const cnt = {};
        for (const tile of Constants.TILE_NO_AKA)
            cnt[tile] = 0;
        for (const tile of tiles)
            cnt[simplify(tile)]++;
        if (is_guobiao() && tiles.includes(Constants.HUAPAI)) // 国标无法听花牌, 有花牌一定不是听牌型
            return [];
        if (tiles.length % 3 !== 1) // 牌数量不对
            return [];
        const ret = [];
        for (const tile of Constants.TILE_NO_AKA) { // 试所有牌作为听牌, 检查是否为和牌型
            tiles.push(tile);
            cnt[tile]++;
            // cnt[i] <= 4 为了除去虚听
            const result = calcHupai(tiles);
            if ((cnt[tile] <= 4 || type) && result !== 0 && result !== 12)
                ret.push({ tile: tile });
            tiles.pop();
            cnt[tile]--;
        }
        return ret;
    };
    /**
     * 获取最近操作信息, 忽略 RecordChangeTile, RecordSelectGap, RecordGangResult, RecordFillAwaitingTiles 这几个操作
     * @param num - 倒数第 num 个操作, 默认为1
     */
    const getLstAction = (num = 1) => {
        if (all_data.cur_actions.length > 0) {
            let ret = all_data.cur_actions.length;
            for (let i = 0; i < num && ret >= 0; i++) {
                ret--;
                while (ret >= 0 && ['RecordChangeTile', 'RecordSelectGap', 'RecordGangResult', 'RecordFillAwaitingTiles'].includes(all_data.cur_actions[ret].name))
                    ret--;
            }
            return all_data.cur_actions[ret];
        }
        else
            throw new Error(errRoundInfo() + 'actions 为空');
    };

    /**
     * @file: utils.ts - 一些内部的辅助函数
     * @author: GrandDawn, Fat-pig-Cui
     * @email: chubbypig@qq.com
     * @github: https://github.com/Fat-pig-Cui/majsoul-replay-editor
     */
    /**
     * 获取当前模式各种牌的数量分布
     */
    const getTileNum = () => {
        const cnt = {};
        for (const tile of Constants.TILE) {
            cnt[tile] = Constants.AKA_TILE.includes(tile) ? 0 : 4;
            cnt[tile + Constants.SPT_SUFFIX] = 0;
        }
        let aka_cnt = 3;
        if (get_aka_cnt() > -1)
            aka_cnt = get_aka_cnt();
        else if (base_info.player_cnt === 3)
            aka_cnt = 2;
        else if (base_info.player_cnt === 2)
            aka_cnt = 1;
        if (base_info.player_cnt === 2) { // 二麻
            for (const tile of Constants.PIN_MID_TILE)
                cnt[tile] = 0;
            for (const tile of Constants.SOU_MID_TILE)
                cnt[tile] = 0;
            cnt['5m'] = 4 - aka_cnt;
            cnt['0m'] = aka_cnt;
        }
        else if (base_info.player_cnt === 3) { // 三麻
            for (const tile of Constants.MAN_MID_TILE)
                cnt[tile] = 0;
            cnt['5p'] = cnt['5s'] = 4 - Math.floor(aka_cnt / 2);
            cnt['0p'] = cnt['0s'] = Math.floor(aka_cnt / 2);
        }
        else { // 四麻
            if (aka_cnt === 4) {
                cnt['5m'] = cnt['5s'] = 3;
                cnt['5p'] = cnt['0p'] = 2;
                cnt['0m'] = cnt['0s'] = 1;
            }
            else {
                cnt['5m'] = cnt['5p'] = cnt['5s'] = 4 - Math.floor(aka_cnt / 3);
                cnt['0m'] = cnt['0p'] = cnt['0s'] = Math.floor(aka_cnt / 3);
            }
        }
        if (is_chuanma()) {
            for (const tile of Constants.HONOR_TILE)
                cnt[tile] = 0;
            cnt['0m'] = cnt['0p'] = cnt['0s'] = 0;
            cnt['5m'] = cnt['5p'] = cnt['5s'] = 4;
        }
        if (is_guobiao()) {
            cnt['0m'] = cnt['0p'] = cnt['0s'] = 0;
            cnt['5m'] = cnt['5p'] = cnt['5s'] = 4;
            // 用 HUAPAI 当做国标的花牌
            if (is_guobiao_huapai() && typeof editFunction == 'function')
                cnt[Constants.HUAPAI] = 8;
        }
        if (is_mingjing()) {
            for (const tile of Constants.TILE_NO_AKA) {
                cnt[tile] = 1;
                cnt[tile + Constants.SPT_SUFFIX] = 3;
            }
            cnt['0m'] = cnt['0p'] = cnt['0s'] = 0;
        }
        // 万象修罗
        if (is_wanxiangxiuluo())
            cnt[Constants.TBD] = 4;
        return cnt;
    };
    // 玩家的巡目所对应的操作位置
    const calcXun = () => {
        for (let i = 0; i < base_info.player_cnt; i++)
            if (player_tiles[i].length % 3 === 2 && !huled[i])
                xun[i].push(all_data.cur_actions.length - 1);
    };
    // 计算表指示牌
    const calcDoras = () => {
        if (dora_cnt.cnt > 5)
            dora_cnt.cnt = 5;
        if (dora_cnt.li_cnt > 5)
            dora_cnt.li_cnt = 5;
        if (no_ganglidora())
            dora_cnt.li_cnt = 1;
        if (no_gangdora())
            dora_cnt.cnt = dora_cnt.li_cnt = 1;
        if (no_lidora())
            dora_cnt.li_cnt = 0;
        if (is_chuanma() || is_guobiao() || no_dora())
            dora_cnt.cnt = dora_cnt.li_cnt = 0;
        const doras0 = [];
        for (let i = 0; i < dora_cnt.cnt; i++)
            doras0[i] = dora_indicator[0][i];
        return doras0;
    };
    // 更新 seat 号玩家的舍张振听状态
    const judgeShezhangzt = (seat) => {
        if (!is_chuanma() && !is_guobiao() && !no_zhenting()) {
            zhenting.shezhang[seat] = false;
            const tingpais = calcTingpai(seat);
            for (const tingpai of tingpais)
                for (const tile of paihe[seat].tiles)
                    if (isEqualTile(tingpai.tile, tile))
                        zhenting.shezhang[seat] = true;
            updateZhenting();
        }
    };
    /**
     * 更新同巡和立直预振听
     * @param seat - seat 号玩家
     * @param tile - 相关操作的牌
     */
    const prejudgeZhenting = (seat, tile) => {
        if (!is_chuanma() && !is_guobiao() && !no_zhenting()) {
            // 同巡振听预判断
            for (let i = 0; i < base_info.player_cnt; i++) {
                if (i === seat)
                    continue;
                const tingpais = calcTingpai(i);
                for (const tingpai of tingpais)
                    if (isEqualTile(tile, tingpai.tile)) {
                        zhenting.tongxun[0][i] = true;
                        break;
                    }
            }
            // 立直振听预判断
            for (let i = 0; i < base_info.player_cnt; i++) {
                if (liqi_info[i].liqi === 0)
                    continue;
                const tingpais = calcTingpai(i);
                for (const tingpai of tingpais)
                    if (isEqualTile(tile, tingpai.tile)) {
                        zhenting.liqi[0][i] = true;
                        break;
                    }
            }
        }
    };
    // 更新振听状态
    const updateZhenting = () => {
        for (let i = 0; i < base_info.player_cnt; i++)
            zhenting.result[i] = zhenting.shezhang[i] || zhenting.tongxun[1][i] || zhenting.liqi[1][i];
    };
    // 开局计算所有玩家的听牌, 亲家去掉最后一张牌后再计算, 但仍然不会显示
    const getAllTingpai = () => {
        const tingpai = [];
        const lastile = player_tiles[base_info.ju].pop();
        for (let seat = 0; seat < base_info.player_cnt; seat++) {
            const tingpais1 = calcTingpai(seat);
            if (tingpais1.length > 0)
                tingpai.push({ seat: seat, tingpais1: tingpais1 });
        }
        player_tiles[base_info.ju].push(lastile);
        return tingpai;
    };
    // 通过最近其他玩家的操作把对应的牌 push 到要和牌的玩家的手牌中
    const push2PlayerTiles = (seat) => {
        const lst_action = getLstAction(), lst_name = getLstAction().name;
        if (lst_name === 'RecordDiscardTile' || lst_name === 'RecordRevealTile' || lst_name === 'RecordLockTile')
            player_tiles[seat].push(lst_action.data.tile);
        else if (lst_name === 'RecordBaBei')
            player_tiles[seat].push(lst_action.data.tile);
        else if (lst_name === 'RecordAnGangAddGang')
            player_tiles[seat].push(lst_action.data.tiles);
    };
    // 将 seat 号玩家的副露信息 fulu 赋值给 ming
    const fulu2Ming = (seat) => {
        const ming = [];
        for (const f of fulu[seat]) {
            const tiles = f.tile;
            if (f.type === 0)
                ming.push(`shunzi(${tiles[0]},${tiles[1]},${tiles[2]})`);
            else if (f.type === 1)
                ming.push(`kezi(${tiles[0]},${tiles[1]},${tiles[2]})`);
            else if (f.type === 2)
                ming.push(`minggang(${tiles[0]},${tiles[1]},${tiles[2]},${tiles[3]})`);
            else if (f.type === 3)
                ming.push(`angang(${tiles[0]},${tiles[1]},${tiles[2]},${tiles[3]})`);
        }
        return ming;
    };
    /**
     * 把 lst_liqi 中的信息赋值给 liqi_info, 并返回胶水代码用的 liqi
     * @param type - 是否允许立直失败, 只会出现在血战到底模式中, 默认不允许
     */
    const lstLiqi2Liqi = (type = false) => {
        let ret = null;
        if (lst_liqi.valid) {
            let need_bangzi = base_info.liqi_need;
            if (lst_liqi.beishui_type === 1)
                need_bangzi = 5;
            else if (lst_liqi.beishui_type === 2)
                need_bangzi = 10;
            if (scores[lst_liqi.seat] >= need_bangzi * 1000 || is_fufenliqi()) {
                base_info.liqibang += need_bangzi;
                scores[lst_liqi.seat] -= need_bangzi * 1000;
                liqi_info[lst_liqi.seat] = {
                    liqi: lst_liqi.liqi,
                    yifa: get_field_spell_mode(2) === 2 ? 3 : 1, // 幻境传说: 机会卡2
                    kai: lst_liqi.kai,
                    beishui_type: lst_liqi.beishui_type,
                    xia_ke_shang: { score_coefficients: calcXiaKeShang() },
                };
                ret = {
                    seat: lst_liqi.seat,
                    liqibang: base_info.liqibang,
                    score: scores[lst_liqi.seat],
                    liqi_type_beishuizhizhan: lst_liqi.beishui_type,
                    xia_ke_shang: { score_coefficients: calcXiaKeShang() },
                };
            }
            else if (type)
                ret = {
                    seat: lst_liqi.seat,
                    liqibang: base_info.liqibang,
                    score: scores[lst_liqi.seat],
                    failed: true,
                };
        }
        lst_liqi.valid = false;
        return ret;
    };
    /**
     * 配牌明牌, 如果有明的牌则去掉, 返回 true, 没有则返回 false
     * @param seat - seat 号玩家
     * @param tile - 牌的种类
     */
    const eraseMingpai = (seat, tile) => {
        if (mingpais[seat][tile] > 0) {
            mingpais[seat][tile]--;
            return true;
        }
        return false;
    };
    /**
     * 龙之目玉, 更新目玉
     */
    const updateMuyu = () => {
        const type = muyu_info.count === 0; // 更新类型, true 表示生成新目玉, false 表示计数
        if (type) {
            muyu_info.id++;
            muyu_info.count = 5;
            if (muyu.seats.length > 0) {
                muyu_info.seat = parseInt(muyu.seats[0]);
                muyu.seats = muyu.seats.substring(1);
            }
            else
                muyu_info.seat = Math.floor(Math.random() * base_info.player_cnt);
            for (let i = 0; i < base_info.player_cnt; i++)
                muyu.times[i] = 1;
            muyu.times[muyu_info.seat]++;
        }
        else
            muyu_info.count--;
    };
    // 幻境传说, 判断 tile 是否为 dora
    const isDora = (tile) => {
        tile = simplify(tile);
        if (tile[0] === '0')
            return true;
        const doras0 = calcDoras();
        for (const dora0 of doras0)
            if (tile === Constants.DORA_NXT[dora0])
                return true;
        return false;
    };
    /**
     * 天命之战, 有多少天命牌
     * @param seat - seat 号玩家
     * @param zimo - 是否为自摸
     */
    const calcTianming = (seat, zimo) => {
        let sum = 1;
        for (const [index, tile] of player_tiles[seat].entries()) { // 查手牌
            if (!zimo && index === player_tiles[seat].length - 1) // 不是自摸, 则最后一张牌不考虑
                break;
            if (tile.length >= 2 && tile[2] === Constants.SPT_SUFFIX)
                sum++;
        }
        for (const f of fulu[seat]) // 查副露
            for (const [index, tile] of f.tile.entries()) {
                if (f.type !== 3 && index === f.tile.length - 1) // 不是暗杠, 则最后一张牌不考虑
                    break;
                if (tile.length > 2 && tile[2] === Constants.SPT_SUFFIX)
                    sum++;
            }
        return sum;
    };
    // 咏唱之战, 更新 seat 号玩家手摸切信息
    const updateShoumoqie = (seat) => {
        for (const flag of [false, true]) {
            let len = 0;
            for (let i = 0; i < shoumoqie[seat].length; i++)
                if (shoumoqie[seat][i] === flag) {
                    let j = i + 1;
                    while (shoumoqie[seat][j] === flag && j < shoumoqie[seat].length)
                        j++;
                    len = Math.max(len, j - i);
                    i = j + 1;
                }
            yongchang_data[seat][flag ? 'shouqie_count' : 'moqie_count'] = len;
            yongchang_data[seat][flag ? 'shouqie_bonus' : 'moqie_bonus'] = calcBonus(seat, flag);
        }
        /**
         * 咏唱之战, 计算 seat 号玩家的奖励番(绯, 苍)
         * @param seat - seat 号玩家
         * @param flag - 计算类型, false 表示摸切, true 表示手切
         */
        function calcBonus(seat, flag) {
            const val = yongchang_data[seat][flag ? 'shouqie_count' : 'moqie_count'];
            if (!flag) { // 摸切
                if (val < 3)
                    return 0;
                else if (val < 5)
                    return 1;
                else if (val < 7)
                    return 2;
                else if (val < 9)
                    return 3;
                else if (val < 12)
                    return 5;
                else
                    return 12;
            }
            else { // 手切
                if (val < 3)
                    return 0;
                else if (val < 6)
                    return 1;
                else if (val < 9)
                    return 2;
                else if (val < 12)
                    return 3;
                else if (val < 18)
                    return 5;
                else
                    return 12;
            }
        }
    };
    // 下克上, 返回各家的打点倍数
    const calcXiaKeShang = () => {
        const times = [1, 1, 1, 1];
        for (let i = 0; i < base_info.player_cnt; i++)
            if (is_xiakeshang() && scores[i] < 30000) {
                if (scores[i] < 10000)
                    times[i] = 4;
                else if (scores[i] < 20000)
                    times[i] = 3;
                else
                    times[i] = 2;
            }
        return times;
    };
    /**
     * calcSudian 组 - 立直
     *
     * 根据算得的番计算素点
     * @param x - 和牌信息
     * @param type - 有效值0和1, 0是一般模式, 1表示比较模式, 默认为一般模式
     */
    const calcSudian = (x, type = 0) => {
        const fanfu = get_fanfu();
        const val = x.fans.reduce((sum, fan) => sum + fan.val, 0);
        if (is_qingtianjing())
            return x.fu * Math.pow(2, val + 2);
        if (x.yiman)
            return Constants.YIMAN_SUDIAN * (!no_composite_yakuman() ? val : Math.max(...x.fans.map(fan => fan.val)));
        else if (val < fanfu)
            return Constants.ZHAHU_SUDIAN;
        else if (val >= 13 && !no_leijiyiman())
            return Constants.MANGUAN_SUDIAN * 4 + type * (val + x.fu * 0.01);
        else if (val >= 11)
            return Constants.MANGUAN_SUDIAN * 3 + type * (val + x.fu * 0.01);
        else if (val >= 8)
            return Constants.MANGUAN_SUDIAN * 2 + type * (val + x.fu * 0.01);
        else if (val >= 6)
            return Constants.MANGUAN_SUDIAN * 1.5 + type * (val + x.fu * 0.01);
        else if (val >= 5)
            return Constants.MANGUAN_SUDIAN + type * (val + x.fu * 0.01);
        else if (is_qieshang() && (val === 4 && x.fu === 30 || val === 3 && x.fu === 60))
            return Constants.MANGUAN_SUDIAN + type * (val + x.fu * 0.01);
        else
            return Math.min(Math.pow(2, val + 2) * x.fu, Constants.MANGUAN_SUDIAN) + type * (val + x.fu * 0.01);
    };
    /**
     * calcSudian 组 - 川麻
     *
     * 根据算得的番计算素点
     * @param x - 和牌信息
     * @param type - 有效值0和1, 0是一般模式, 1表示比较模式, 默认为一般模式
     */
    const calcSudianChuanma = (x, type = 0) => {
        const val = x.fans.reduce((sum, fan) => sum + fan.val, 0);
        if (val === 0)
            return 0;
        return Math.min(1000 * Math.pow(2, val - 1), 32000) + type * val;
    };
    /**
     * calcSudian 组 - 国标
     *
     * 根据算得的番计算素点
     * @param x - 和牌信息
     * @param no_huapai - 是否不考虑花牌, 默认考虑
     */
    const calcSudianGuobiao = (x, no_huapai = false) => {
        let val = 0;
        for (const fan of x.fans)
            if (!(no_huapai && fan.id >= 8091 && fan.id <= 8099))
                val += fan.val;
        return val * scale_points();
    };

    /**
     * @file: glue.ts - 胶水代码, 用于连接界面和核心逻辑
     * @author: GrandDawn, Fat-pig-Cui
     * @email: chubbypig@qq.com
     * @github: https://github.com/Fat-pig-Cui/majsoul-replay-editor
     */
    /**
     * 胶水代码: 开局
     * @param left_tile_count - 剩余牌数
     * @param fake_hash_code - 牌山虚假的 md5 或 sha256 码, 由下面 is_sha256 决定类型
     * @param opens - 配牌明牌: 明的牌
     * @param is_sha256 - 牌山是否包含起手
     */
    const addNewRound = (left_tile_count, fake_hash_code, opens, is_sha256) => {
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
            xia_ke_shang: is_xiakeshang() ? { score_coefficients: calcXiaKeShang() } : undefined,
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
    const addDealTile = (seat, draw_card, liqi, tile_state, zhanxing_index, hunzhiyiji_data) => {
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
    const addFillAwaitingTiles = (seat, liqi) => {
        pushAction('RecordFillAwaitingTiles', {
            operation: { seat: seat },
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
    const addDiscardTile = (seat, tile, moqie, is_liqi, is_wliqi, is_kailiqi, tile_state, beishui_type) => {
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
    const addRevealTile = (seat, tile, moqie, is_liqi, is_wliqi) => {
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
    const addLockTile = (seat, lock_state, tile = '') => {
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
    const addUnveilTile = (seat) => {
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
    const addChiPengGang = (seat, fulu_tiles, tiles_from, type, liqi, tile_states) => {
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
    const addAnGangAddGang = (seat, tile, ziming_type, tile_states) => {
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
    const addBaBei = (seat, tile, tile_states) => {
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
     * @param baopai_player - 包牌玩家, 注意和数值比 seat 大1, 逐渐弃用
     */
    const endHule = (hule_info, old_scores, baopai_player) => {
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
    const addHuleXueZhanMid = (hule_info, old_scores, liqi) => {
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
    const endHuleXueZhanEnd = (hule_info, old_scores) => {
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
    const addHuleXueLiuMid = (hule_info, old_scores) => {
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
    const endHuleXueLiuEnd = (hule_info, old_scores) => {
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
    const endNoTile = (liujumanguan, ting_info, scores_info) => {
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
    const endLiuJu = (type, seat, liqi, tiles, allplayertiles) => {
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
    const addChangeTile = (change_tile_infos, type) => {
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
    const addSelectGap = (gap_types) => {
        pushAction('RecordSelectGap', {
            gap_types: gap_types,
            tingpai: getAllTingpai(),
        });
    };
    /**
     * 胶水代码: 川麻: 刮风下雨
     * @param old_scores - 结算前分数
     */
    const addGangResult = (old_scores) => {
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
    const addGangResultEnd = (old_scores) => {
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
    const addCuohu = (seat, zimo, old_scores) => {
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
    const pushAction = (name, data) => {
        all_data.cur_actions.push(JSON.parse(JSON.stringify({ name: name, data: data })));
    };

    /**
     * @file: calcFan.ts - 核心文件, 根据牌算番, 分为立直, 川麻, 国标三个部分
     * @author: GrandDawn, Fat-pig-Cui
     * @email: chubbypig@qq.com
     * @github: https://github.com/Fat-pig-Cui/majsoul-replay-editor
     */
    /**
     * calcFan 组 - 立直
     *
     * 根据牌算番
     * @param seat - 和牌的 seat 号玩家
     * @param zimo - 是否是自摸
     * @param fangchong - 放铳玩家的 seat, 只有在 zimo 为 false 有效
     */
    const calcFan = (seat, zimo, fangchong) => {
        // 更新返回值
        const updateRet = (x) => {
            if (calcSudian(ret, 1) < calcSudian(x, 1))
                for (const key of Object.keys(x))
                    ret[key] = x[key];
        };
        const tiles = player_tiles[seat];
        const lastile = tiles[tiles.length - 1];
        const ret = { yiman: false, fans: [], fu: 0 };
        // cnt 不含副露, 不含红包牌和拔北宝牌
        // cnt2 包含副露, 不含红包牌和拔北宝牌
        const cnt = {}, cnt2 = {};
        for (const tile of Constants.TILE)
            cnt[tile] = cnt2[tile] = 0;
        cnt[Constants.TBD] = 0;
        for (const tile of tiles) {
            cnt[simplify(tile)]++;
            cnt2[simplify(tile)]++;
        }
        let fulu_cnt = 0;
        const partition = [];
        for (const f of fulu[seat])
            if (f.type !== 4) {
                if (f.type !== 3)
                    fulu_cnt++;
                partition.push(f);
                for (const tile of f.tile)
                    cnt2[simplify(tile)]++;
            }
        // 幻境传说: 庄家卡1: 庄家门清状态下荣和只能是立直状态, 否则诈和
        if (get_field_spell_mode(1) === 1 && seat === base_info.ju && fulu_cnt === 0 && !zimo && liqi_info[seat].liqi !== 0)
            return ret;
        const lst_name = getLstAction().name;
        if (!is_wanxiangxiuluo())
            normalCalc();
        else if (cnt[Constants.TBD] === 1) {
            cnt[Constants.TBD]--;
            tiles.splice(tiles.indexOf(Constants.TBD), 1);
            for (const tile of Constants.TILE_NO_AKA) {
                cnt[tile]++;
                tiles.push(tile);
                normalCalc();
                tiles.pop();
                cnt[tile]--;
            }
            tiles.unshift(Constants.TBD);
        }
        return ret;
        // 没有百搭牌情况下的算番流程, 分为一般算番(dfs)与特殊和牌型
        function normalCalc() {
            const result = calcHupai(tiles);
            if (result === 3 || result === 12)
                specialCalc();
            dfs(Constants.DFS_BEGIN_TILE, partition, cnt, lastile, zimo, updateRet, calc0);
            // 能与特殊和牌型复合的番种的计算, 包括国士和一番街古役十三不搭
            function specialCalc() {
                // 删除 ans 中番为 id 的番
                const deleteFan = (id) => {
                    const index = ans.fans.findIndex(fan => fan.id === id);
                    if (index !== -1)
                        ans.fans.splice(index, 1);
                };
                const menqing = fulu_cnt === 0;
                let tianhu = false;
                const ans = { yiman: !is_qingtianjing(), fans: [], fu: 25 };
                const wangpai_num = base_info.player_cnt === 2 ? 18 : 14;
                if (is_qingtianjing()) {
                    if (is_hunzhiyiji()) {
                        if (hunzhiyiji_info[seat].liqi === 1)
                            ans.fans.push({ val: 2, id: 804 }); // 立直
                        if (hunzhiyiji_info[seat].liqi === 2)
                            ans.fans.push({ val: 3, id: 805 }); // 双立直
                        if (hunzhiyiji_info[seat].liqi !== 0 && !hunzhiyiji_info[seat].overload)
                            ans.fans.push({ val: 1, id: 30 }); // 一发
                    }
                    else {
                        if (liqi_info[seat].kai) { // 开立直非役满情况
                            if (liqi_info[seat].liqi === 1)
                                ans.fans.push({ val: 2, id: 9005 }); // 开立直
                            if (liqi_info[seat].liqi === 2)
                                ans.fans.push({ val: 3, id: 9006 }); // 开两立直
                        }
                        else {
                            // 幻境传说: 机会卡5
                            if (get_field_spell_mode(2) === 5) {
                                if (liqi_info[seat].liqi === 1)
                                    ans.fans.push({ val: 2, id: 2 }); // 立直
                                if (liqi_info[seat].liqi === 2)
                                    ans.fans.push({ val: 4, id: 18 }); // 两立直
                            }
                            else if (is_beishuizhizhan()) {
                                if (liqi_info[seat].liqi === 1 && liqi_info[seat].beishui_type === 1)
                                    ans.fans.push({ val: 3, id: 806 }); // 真-立直
                                else if (liqi_info[seat].liqi === 2 && liqi_info[seat].beishui_type === 1)
                                    ans.fans.push({ val: 4, id: 807 }); // 真-两立直
                                else if (liqi_info[seat].liqi === 1 && liqi_info[seat].beishui_type === 2)
                                    ans.fans.push({ val: 5, id: 808 }); // 极-立直
                                else if (liqi_info[seat].liqi === 2 && liqi_info[seat].beishui_type === 2)
                                    ans.fans.push({ val: 6, id: 809 }); // 极-两立直
                                else if (liqi_info[seat].liqi === 1)
                                    ans.fans.push({ val: 1, id: 2 }); // 立直
                                else if (liqi_info[seat].liqi === 2)
                                    ans.fans.push({ val: 2, id: 18 }); // 两立直
                            }
                            else {
                                if (liqi_info[seat].liqi === 1)
                                    ans.fans.push({ val: 1, id: 2 }); // 立直
                                if (liqi_info[seat].liqi === 2)
                                    ans.fans.push({ val: 2, id: 18 }); // 两立直
                            }
                        }
                        // 幻境传说: 机会卡5
                        if (get_field_spell_mode(2) === 5) {
                            if (liqi_info[seat].liqi !== 0 && liqi_info[seat].yifa !== 0)
                                ans.fans.push({ val: 2, id: 30 }); // 一发
                        }
                        else {
                            if (liqi_info[seat].liqi !== 0 && liqi_info[seat].yifa !== 0 && !no_yifa())
                                ans.fans.push({ val: 1, id: 30 }); // 一发
                        }
                    }
                    if (is_guyi() || is_yifanjieguyi()) {
                        if (lst_name === 'RecordDiscardTile' && getLstAction().data.is_liqi)
                            ans.fans.push({ val: 1, id: 51 }); // 燕返
                        if (!zimo && base_info.lst_draw_type === 0 && lst_name === 'RecordDiscardTile')
                            if (getLstAction(3) !== undefined && (getLstAction(3).name === 'RecordAnGangAddGang' || getLstAction(3).name === 'RecordChiPengGang'))
                                ans.fans.push({ val: 1, id: 52 }); // 杠振
                    }
                    if (menqing && zimo)
                        ans.fans.push({ val: 1, id: 1 }); // 门前清自摸和
                    if (lst_name === 'RecordAnGangAddGang')
                        ans.fans.push({ val: 1, id: 3 }); // 枪杠
                    if (zimo && base_info.lst_draw_type === 0)
                        ans.fans.push({ val: 1, id: 4 }); // 岭上开花
                    if (zimo && paishan.length === wangpai_num && base_info.lst_draw_type === 1)
                        ans.fans.push({ val: 1, id: 5 }); // 海底摸月
                    if (!zimo && paishan.length === wangpai_num)
                        ans.fans.push({ val: 1, id: 6 }); // 河底捞鱼
                    // 四种dora: 表dora, 红dora, 拔北dora, 里dora
                    const all_doras = [0, 0, 0, 0];
                    // 先把拔北给算上, 然后减去
                    for (const f of fulu[seat])
                        if (f.type === 4) {
                            cnt2[simplify(f.tile[0])]++;
                            all_doras[2]++;
                        }
                    for (let i = 0; i < dora_cnt.cnt; i++) {
                        if (base_info.player_cnt === 3 && isEqualTile(dora_indicator[0][i], '1m'))
                            all_doras[0] += cnt2['9m'];
                        else if (base_info.player_cnt === 2) {
                            if (isEqualTile(dora_indicator[0][i], '1p'))
                                all_doras[0] += cnt2['9p'];
                            if (isEqualTile(dora_indicator[0][i], '1s'))
                                all_doras[0] += cnt2['9s'];
                        }
                        else {
                            // 幻境传说: 机会卡3
                            if (get_field_spell_mode(2) === 3)
                                all_doras[0] += cnt2[simplify(dora_indicator[0][i])];
                            all_doras[0] += cnt2[Constants.DORA_NXT[simplify(dora_indicator[0][i])]];
                        }
                    }
                    for (let i = 0; i < dora_cnt.li_cnt; i++) {
                        if (base_info.player_cnt === 3 && isEqualTile(dora_indicator[0][i], '1m'))
                            all_doras[3] += cnt2['9m'];
                        else if (base_info.player_cnt === 2) {
                            if (isEqualTile(dora_indicator[0][i], '1p'))
                                all_doras[3] += cnt2['9p'];
                            if (isEqualTile(dora_indicator[0][i], '1s'))
                                all_doras[3] += cnt2['9s'];
                        }
                        else {
                            // 幻境传说: 机会卡3
                            if (get_field_spell_mode(2) === 3)
                                all_doras[3] += cnt2[simplify(dora_indicator[1][i])];
                            all_doras[3] += cnt2[Constants.DORA_NXT[simplify(dora_indicator[1][i])]];
                        }
                    }
                    // 幻境传说: 庄家卡5
                    if (get_field_spell_mode(1) === 5 && seat === base_info.ju && !zimo)
                        ans.dora_bonus = all_doras[0] + all_doras[1] + all_doras[3];
                    // 悬赏番
                    if (all_doras[0] > 0)
                        // 幻境传说: 机会卡1
                        if (!(get_field_spell_mode(2) === 1 && liqi_info[seat].liqi !== 0))
                            ans.fans.push({ val: all_doras[0], id: 31 }); // 宝牌
                    if (all_doras[2] > 0)
                        ans.fans.push({ val: all_doras[2], id: 34 }); // 北宝牌
                    if (liqi_info[seat].liqi !== 0) {
                        // 幻境传说: 机会卡1
                        const times = get_field_spell_mode(2) === 1 ? 2 : 1;
                        ans.fans.push({ val: all_doras[3] * times, id: 33 }); // 里宝牌
                    }
                }
                if (result === 3) {
                    if (liqi_info[seat].yifa !== 0 && liqi_info[seat].liqi === 0)
                        if (zimo) {
                            deleteFan(1); // 删除门前清自摸和
                            if (seat === base_info.ju) {
                                ans.fans.push({ val: !is_qingtianjing() ? 1 : 13, id: 35 }); // 天和
                                tianhu = true;
                            }
                            else
                                ans.fans.push({ val: !is_qingtianjing() ? 1 : 13, id: 36 }); // 地和
                        }
                        else if (is_guyi() || is_yifanjieguyi())
                            ans.fans.push({ val: !is_qingtianjing() ? 1 : 13, id: 59 }); // 人和
                    if (menqing && cnt[simplify(lastile)] === 1 && !tianhu)
                        ans.fans.push({ val: !is_qingtianjing() ? 1 : 13, id: 42 }); // 国士无双
                    if (menqing && (cnt[simplify(lastile)] === 2 || tianhu)) {
                        const tmp = { val: !is_qingtianjing() ? 2 : 26, id: 49 }; // 国士无双十三面
                        if (no_wyakuman())
                            tmp.val /= 2;
                        ans.fans.push(tmp);
                    }
                    if (liqi_info[seat].liqi === 2)
                        if (zimo && paishan.length === wangpai_num && base_info.lst_draw_type === 1 || !zimo && paishan.length === wangpai_num) {
                            deleteFan(18); // 删除两立直
                            deleteFan(5); // 删除海底摸月
                            deleteFan(6); // 删除河底捞鱼
                            ans.fans.push({ val: !is_qingtianjing() ? 1 : 13, id: 63 }); // 石上三年
                        }
                }
                else if (result === 12) {
                    if (liqi_info[seat].yifa !== 0 && liqi_info[seat].liqi === 0 && zimo)
                        ans.fans.push({ val: !is_qingtianjing() ? 1 : 13, id: 9708 }); // 十三不搭
                }
                if (is_yifanjieguyi() && seat === base_info.ju && base_info.lianzhuang_cnt >= 7) // 第8次和牌
                    ans.fans.push({ val: 1, id: 46 }); // 八连庄
                updateRet(ans);
            }
        }
        /**
         * 核心算法, 根据所有前置动作计算手牌有哪些番
         *
         * @param tingpaifu - 听牌符数
         * @param partition_tmp - 牌划分的副本, 即 partition.slice()
         */
        function calc0(tingpaifu, partition_tmp) {
            // 删除 ans 中番为 id 的番
            const deleteFan = (id) => {
                const index = ans.fans.findIndex(fan => fan.id === id);
                if (index !== -1)
                    ans.fans.splice(index, 1);
            };
            baopai[seat] = []; // 重置和牌玩家包牌信息
            let tianhu = false;
            const menqing = fulu_cnt === 0;
            // 无青天井情况下默认为 true, 之后再否定
            const ans = { yiman: !is_qingtianjing(), fans: [], fu: 0, dora_bonus: 0 };
            // ----------------------------------------------
            // type_cnt[i] 的 0-7 下标分别对应对应划分种类的数量
            // 0: 明顺    1: 明刻   2: 明杠   3: 暗杠
            // 4: 北宝    5: 暗顺   6: 暗刻   7: 对子
            const type_cnt = {};
            // 刻子, 杠子, 暗刻, 顺子
            const kezi = {}, gangzi = {}, anke = {}, shunzi = {};
            let kezi_num = 0, gangzi_num = 0, anke_num = 0, duizi_num = 0;
            for (const tile of Constants.TILE_NO_AKA) {
                type_cnt[tile] = [0, 0, 0, 0, 0, 0, 0, 0];
                anke[tile] = gangzi[tile] = kezi[tile] = shunzi[tile] = 0;
            }
            for (const p of partition_tmp) {
                const type = p.type;
                switch (type) {
                    case 1:
                        kezi[simplify(p.tile[0])]++;
                        break;
                    case 2:
                        kezi[simplify(p.tile[0])]++;
                        gangzi[simplify(p.tile[0])]++;
                        break;
                    case 3:
                        kezi[simplify(p.tile[0])]++;
                        gangzi[simplify(p.tile[0])]++;
                        anke[simplify(p.tile[0])]++;
                        break;
                    case 6:
                        kezi[simplify(p.tile[0])]++;
                        anke[simplify(p.tile[0])]++;
                        break;
                    case 0:
                    case 5:
                        shunzi[shunziMidTile(p.tile)]++;
                        break;
                }
                if (type === 1 || type === 2 || type === 3 || type === 6 || type === 7)
                    type_cnt[simplify(p.tile[0])][type]++;
                if (type === 0 || type === 5)
                    type_cnt[shunziMidTile(p.tile)][type]++;
            }
            let beikou = 0;
            for (const tile of Constants.TILE_NO_AKA) {
                kezi_num += kezi[tile];
                anke_num += anke[tile];
                gangzi_num += gangzi[tile];
                duizi_num += type_cnt[tile][7];
                // 这里的杯口数量算上副露的, 最后在判断是否有效
                beikou += Math.floor(shunzi[tile] / 2);
            }
            const group = Constants.GROUP;
            // ---------------------------
            let ziyise = true, lvyise = true, qinglaotou = true, duanyao = true, hunlaotou = true;
            let hunyise_man = true, hunyise_pin = true, hunyise_sou = true;
            let qingyise_man = true, qingyise_pin = true, qingyise_sou = true;
            let hongkongque = true, hongyidian = true, heiyise = true;
            let tuibudao = true;
            for (const tile of Constants.TILE_NO_AKA)
                if (cnt2[tile] > 0) {
                    if (!judgeTile(tile, 'H'))
                        ziyise = false; // 字一色
                    if (!judgeTile(tile, 'T'))
                        qinglaotou = false; // 清老头
                    if (!judgeTile(tile, 'D'))
                        duanyao = false; // 断幺九
                    if (!judgeTile(tile, 'Y'))
                        hunlaotou = false; // 混老头
                    if (!judgeTile(tile, 'L'))
                        lvyise = false; // 绿一色
                    if (tile[1] !== 'm') {
                        if (tile[1] !== 'z')
                            hunyise_man = false;
                        qingyise_man = false;
                    }
                    if (tile[1] !== 'p') {
                        if (tile[1] !== 'z')
                            hunyise_pin = false;
                        qingyise_pin = false;
                    }
                    if (tile[1] !== 's') {
                        if (tile[1] !== 'z')
                            hunyise_sou = false;
                        qingyise_sou = false;
                    }
                    if (!judgeTile(tile, 'hongkongque'))
                        hongkongque = false;
                    if (!judgeTile(tile, 'hongyidian'))
                        hongyidian = false;
                    if (!judgeTile(tile, 'heiyise'))
                        heiyise = false;
                    if (!judgeTile(tile, 'tuibudao'))
                        tuibudao = false;
                }
            // -------------------------------------
            // 四种dora: 表dora, 红dora, 拔北dora, 里dora
            const all_doras = [0, 0, 0, 0];
            // 先把拔北给算上, 然后减去
            for (const f of fulu[seat])
                if (f.type === 4) {
                    cnt2[simplify(f.tile[0])]++;
                    all_doras[2]++;
                }
            for (let i = 0; i < dora_cnt.cnt; i++) {
                if (base_info.player_cnt === 3 && isEqualTile(dora_indicator[0][i], '1m'))
                    all_doras[0] += cnt2['9m'];
                else if (base_info.player_cnt === 2) {
                    if (isEqualTile(dora_indicator[0][i], '1p'))
                        all_doras[0] += cnt2['9p'];
                    if (isEqualTile(dora_indicator[0][i], '1s'))
                        all_doras[0] += cnt2['9s'];
                }
                else {
                    // 幻境传说: 机会卡3
                    if (get_field_spell_mode(2) === 3)
                        all_doras[0] += cnt2[simplify(dora_indicator[0][i])];
                    all_doras[0] += cnt2[Constants.DORA_NXT[simplify(dora_indicator[0][i])]];
                }
            }
            for (let i = 0; i < dora_cnt.li_cnt; i++) {
                if (base_info.player_cnt === 3 && isEqualTile(dora_indicator[1][i], '1m'))
                    all_doras[3] += cnt2['9m'];
                else if (base_info.player_cnt === 2) {
                    if (isEqualTile(dora_indicator[1][i], '1p'))
                        all_doras[3] += cnt2['9p'];
                    if (isEqualTile(dora_indicator[1][i], '1s'))
                        all_doras[3] += cnt2['9s'];
                }
                else {
                    // 幻境传说: 机会卡3
                    if (get_field_spell_mode(2) === 3)
                        all_doras[3] += cnt2[simplify(dora_indicator[1][i])];
                    all_doras[3] += cnt2[Constants.DORA_NXT[simplify(dora_indicator[1][i])]];
                }
            }
            // cnt2 不记录红宝牌, 所以不能用 cnt2
            for (const tile of tiles)
                if (tile[0] === '0')
                    all_doras[1]++;
            for (const f of fulu[seat])
                for (const tile of f.tile)
                    if (tile[0] === '0')
                        all_doras[1]++;
            for (const f of fulu[seat])
                if (f.type === 4)
                    cnt2[simplify(f.tile[0])]--;
            // 幻境传说: 庄家卡5
            // 正是存在这个, 所以 dora 的计算不能放到后面, 因为算完有役满之后就 return 了, 而算不到 dora_bonus
            if (get_field_spell_mode(1) === 5 && seat === base_info.ju && !zimo)
                ans.dora_bonus = all_doras[0] + all_doras[1] + all_doras[3];
            // ------------------------------------
            // ------------------------------------
            // ------------------------------------
            // 自己添加的役种
            if (is_tiandichuangzao() && type_cnt['5z'][2] === 1 && type_cnt['5z'][7] === 1 && type_cnt['5z'][3] === 3) {
                if (!is_qingtianjing()) {
                    ans.fans.push({ val: 6, id: 9001 }); // 天地创造
                    return ans;
                }
                else
                    ans.fans.push({ val: 0, id: 9001 }); // 设为0是防止重复计数
            }
            if (is_wanwushengzhang() && type_cnt['6z'][3] === 4 && type_cnt['6z'][7] === 1) {
                if (!is_qingtianjing()) {
                    ans.fans.push({ val: 6, id: 9002 }); // 万物生长
                    return ans;
                }
                else
                    ans.fans.push({ val: 0, id: 9002 }); // 设为0是防止重复计数
            }
            // ------------------------------------
            // ------------------------------------
            // ------------------------------------
            if (liqi_info[seat].yifa !== 0 && liqi_info[seat].liqi === 0)
                if (zimo)
                    if (seat === base_info.ju) {
                        ans.fans.push({ val: !is_qingtianjing() ? 1 : 13, id: 35 }); // 天和
                        tianhu = true;
                    }
                    else
                        ans.fans.push({ val: !is_qingtianjing() ? 1 : 13, id: 36 }); // 地和
                else if (is_guyi() || is_yifanjieguyi())
                    ans.fans.push({ val: !is_qingtianjing() ? 1 : 13, id: 59 }); // 人和
            const dasixi = kezi['1z'] >= 1 && kezi['2z'] >= 1 && kezi['3z'] >= 1 && kezi['4z'] >= 1;
            if (dasixi) {
                if (!is_xuezhandaodi() && !is_wanxiangxiuluo() && !no_normalbaopai() && !no_composite_yakuman()) {
                    let fulu_sixi = 0;
                    for (const f of fulu[seat]) {
                        const type = f.type;
                        if ((type === 1 || type === 2 || type === 3) && Constants.WIND_TILE.includes(simplify(f.tile[0]))) {
                            fulu_sixi++;
                            if (fulu_sixi === 4 && f.from !== undefined)
                                baopai[seat].push({ seat: f.from, val: no_wyakuman() ? 1 : 2 });
                        }
                    }
                }
                const tmp = { val: !is_qingtianjing() ? 2 : 26, id: 50 }; // 大四喜
                if (no_wyakuman())
                    tmp.val /= 2;
                ans.fans.push(tmp);
            }
            // jiulian[0] 用于判断是否为九莲, jiulian[1] 表示多出来的一张牌
            const jiulian = [false];
            const jlbd = [0, 3, 1, 1, 1, 1, 1, 1, 1, 3];
            for (let k = 0; k < 3; k++) {
                jiulian[0] = true;
                for (let i = 1; i <= 9; i++)
                    if (cnt2[i + group[k]] < jlbd[i]) // 手牌中各种牌数量不满足
                        jiulian[0] = false;
                    else if (cnt2[i + group[k]] > jlbd[i]) // 多出来的牌
                        jiulian[1] = i + group[k];
                if (jiulian[0])
                    break;
            }
            if (gangzi_num >= 1) // 九莲不允许有杠子
                jiulian[0] = false;
            if (menqing && jiulian[0] && (isEqualTile(lastile, jiulian[1]) || tianhu)) {
                const tmp = { val: !is_qingtianjing() ? 2 : 26, id: 47 }; // 纯正九莲宝灯
                if (no_wyakuman())
                    tmp.val /= 2;
                ans.fans.push(tmp);
            }
            if (menqing && anke_num === 4 && (type_cnt[simplify(lastile)][7] === 1 || tianhu)) {
                const tmp = { val: !is_qingtianjing() ? 2 : 26, id: 48 }; // 四暗刻单骑
                if (no_wyakuman())
                    tmp.val /= 2;
                ans.fans.push(tmp);
            }
            else if (menqing && anke_num === 4 && anke[simplify(lastile)] - gangzi[simplify(lastile)] >= 1 && !tianhu)
                ans.fans.push({ val: !is_qingtianjing() ? 1 : 13, id: 38 }); // 四暗刻
            if (kezi['5z'] >= 1 && kezi['6z'] >= 1 && kezi['7z'] >= 1) {
                if (!is_xuezhandaodi() && !is_wanxiangxiuluo() && !no_normalbaopai() && !no_composite_yakuman()) {
                    let fulu_sanyuan = 0;
                    for (const f of fulu[seat]) {
                        const type = f.type;
                        if ((type === 1 || type === 2 || type === 3) && Constants.DRAGON_TILE.includes(simplify(f.tile[0]))) {
                            fulu_sanyuan++;
                            if (fulu_sanyuan === 3 && f.from !== undefined)
                                baopai[seat].push({ seat: f.from, val: 1 });
                        }
                    }
                }
                ans.fans.push({ val: !is_qingtianjing() ? 1 : 13, id: 37 }); // 大三元
            }
            if (ziyise)
                ans.fans.push({ val: !is_qingtianjing() ? 1 : 13, id: 39 }); // 字一色
            if (lvyise)
                ans.fans.push({ val: !is_qingtianjing() ? 1 : 13, id: 40 }); // 绿一色
            if (qinglaotou)
                ans.fans.push({ val: !is_qingtianjing() ? 1 : 13, id: 41 }); // 清老头
            let xiaosixi = false;
            for (let i = 0; i < 4; i++)
                if (type_cnt[1 + i + 'z'][7] === 1 && kezi[1 + (i + 1) % 4 + 'z'] >= 1 && kezi[1 + (i + 2) % 4 + 'z'] >= 1 && kezi[1 + (i + 3) % 4 + 'z'] >= 1)
                    xiaosixi = true;
            if (xiaosixi && (!dasixi || is_sixifuhe()))
                ans.fans.push({ val: !is_qingtianjing() ? 1 : 13, id: 43 }); // 小四喜
            if (gangzi_num === 4) {
                if (!is_xuezhandaodi() && !is_wanxiangxiuluo() && !no_composite_yakuman() && is_sigangbaopai())
                    if (sigang_bao[seat]) {
                        let fulu_gangzi = 0;
                        for (const f of fulu[seat])
                            if (f.type === 2 || f.type === 3) {
                                fulu_gangzi++;
                                if (fulu_gangzi === 4 && f.from !== undefined)
                                    baopai[seat].push({ seat: f.from, val: 1 });
                            }
                    }
                ans.fans.push({ val: !is_qingtianjing() ? 1 : 13, id: 44 }); // 四杠子
            }
            if (menqing && jiulian[0] && !isEqualTile(lastile, jiulian[1]) && !tianhu)
                ans.fans.push({ val: !is_qingtianjing() ? 1 : 13, id: 45 }); // 九莲宝灯
            const wangpai_num = base_info.player_cnt === 2 ? 18 : 14;
            if (is_guyi() || is_yifanjieguyi()) {
                for (let j = 0; j < 3; j++) {
                    let flag = true;
                    for (let i = 2; i <= 8; i++)
                        if (cnt2[i + group[j]] !== 2)
                            flag = false;
                    if (flag) {
                        if (j === 0)
                            ans.fans.push({ val: !is_qingtianjing() ? 1 : 13, id: 62 }); // 大数邻
                        if (j === 1)
                            ans.fans.push({ val: !is_qingtianjing() ? 1 : 13, id: 60 }); // 大车轮
                        if (j === 2)
                            ans.fans.push({ val: !is_qingtianjing() ? 1 : 13, id: 61 }); // 大竹林
                        break;
                    }
                }
                if (liqi_info[seat].liqi === 2)
                    if (zimo && paishan.length === wangpai_num && base_info.lst_draw_type === 1 || !zimo && paishan.length === wangpai_num)
                        ans.fans.push({ val: !is_qingtianjing() ? 1 : 13, id: 63 }); // 石上三年
                if (ziyise && duizi_num === 7 && !no_wyakuman()) {
                    deleteFan(39); // 删除字一色
                    const tmp = { val: !is_qingtianjing() ? 2 : 26, id: 64 }; // 大七星
                    if (no_wyakuman())
                        tmp.val /= 2;
                    ans.fans.push(tmp);
                }
            }
            // 四连刻, 一色四同顺, 红孔雀, 红一点, 黑一色,
            // 十三不搭, 八连庄, 百万石, 金门桥, 东北新干线, 无发绿一色
            if (is_yifanjieguyi()) {
                let sitongshun = false, silianke = false;
                for (let i = 0; i < 3; i++)
                    for (let j = 1; j <= 9; j++) {
                        if (j !== 1 && j !== 9 && shunzi[j + group[i]] >= 4)
                            sitongshun = true;
                        if (j <= 6 && kezi[j + group[i]] >= 1 && kezi[j + 1 + group[i]] >= 1 && kezi[j + 2 + group[i]] >= 1 && kezi[j + 3 + group[i]] >= 1)
                            silianke = true;
                    }
                if (silianke)
                    ans.fans.push({ val: !is_qingtianjing() ? 1 : 13, id: 9703 }); // 四连刻
                if (sitongshun)
                    ans.fans.push({ val: !is_qingtianjing() ? 1 : 13, id: 9704 }); // 一色四同顺
                if (cnt2['7z'] === 0)
                    hongkongque = hongyidian = false;
                if (hongkongque)
                    ans.fans.push({ val: !is_qingtianjing() ? 1 : 13, id: 9705 }); // 红孔雀
                if (hongyidian)
                    ans.fans.push({ val: !is_qingtianjing() ? 1 : 13, id: 9706 }); // 红一点
                if (heiyise)
                    ans.fans.push({ val: !is_qingtianjing() ? 1 : 13, id: 9707 }); // 黑一色
                if (seat === base_info.ju && base_info.lianzhuang_cnt >= 7) // 第8次和牌
                    ans.fans.push({ val: !is_qingtianjing() ? 1 : 13, id: 46 }); // 八连庄
                if (qingyise_man) {
                    let sum = 0;
                    for (let i = 1; i <= 9; i++)
                        sum += cnt2[i + 'm'] * i;
                    if (sum >= 100)
                        ans.fans.push({ val: !is_qingtianjing() ? 1 : 13, id: 9709 }); // 百万石
                }
                let jinmenqiao = false;
                for (let i = 0; i < 3; i++)
                    if (shunzi[2 + group[i]] >= 1 && shunzi[4 + group[i]] >= 1 && shunzi[6 + group[i]] >= 1 && shunzi[8 + group[i]] >= 1)
                        jinmenqiao = true;
                if (menqing && jinmenqiao)
                    ans.fans.push({ val: !is_qingtianjing() ? 1 : 13, id: 9710 }); // 金门桥
                let xinganxian_part1 = false, xinganxian_part2 = false;
                for (let j = 0; j <= 2; j++) {
                    xinganxian_part1 = true;
                    for (let i = 1; i <= 9; i++)
                        if (cnt2[i + group[j]] !== 1)
                            xinganxian_part1 = false;
                    if (xinganxian_part1)
                        break;
                }
                if (kezi['1z'] === 1 && type_cnt['4z'][7] === 1 || kezi['4z'] === 1 && type_cnt['1z'][7] === 1)
                    xinganxian_part2 = true;
                if (menqing && xinganxian_part1 && xinganxian_part2)
                    ans.fans.push({ val: !is_qingtianjing() ? 1 : 13, id: 9711 }); // 东北新干线
                if (lvyise && cnt2['6z'] === 0) {
                    deleteFan(40);
                    ans.fans.push({ val: !is_qingtianjing() ? 2 : 26, id: 9712 }); // 无发绿一色
                }
            }
            if (liqi_info[seat].kai && !zimo && liqi_info[fangchong].liqi === 0) { // 开立直
                if (liqi_info[seat].liqi === 1)
                    ans.fans.push({ val: !is_qingtianjing() ? 1 : 13, id: 9003 });
                if (liqi_info[seat].liqi === 2)
                    ans.fans.push({ val: !is_qingtianjing() ? 1 : 13, id: 9004 });
            }
            if (ans.fans.length > 0 && !is_qingtianjing())
                return ans;
            // ------------------------------------
            // ------------------------------------
            // ------------------------------------
            ans.yiman = false;
            if (liqi_info[seat].yifa !== 0 && liqi_info[seat].liqi === 0 && seat !== base_info.ju && !zimo)
                if (is_renhumanguan() && !is_guyi() && !is_yifanjieguyi())
                    ans.fans.push({ val: 5, id: 65 }); // 人和2
            // ------------------------------------
            if (is_hunzhiyiji()) {
                if (hunzhiyiji_info[seat].liqi === 1)
                    ans.fans.push({ val: 2, id: 804 }); // 立直
                if (hunzhiyiji_info[seat].liqi === 2)
                    ans.fans.push({ val: 3, id: 805 }); // 双立直
                if (hunzhiyiji_info[seat].liqi !== 0 && !hunzhiyiji_info[seat].overload)
                    ans.fans.push({ val: 1, id: 30 }); // 一发
            }
            else {
                if (liqi_info[seat].kai) { // 开立直非役满情况
                    if (liqi_info[seat].liqi === 1)
                        ans.fans.push({ val: 2, id: 9005 }); // 开立直
                    if (liqi_info[seat].liqi === 2)
                        ans.fans.push({ val: 3, id: 9006 }); // 开两立直
                }
                else {
                    // 幻境传说: 机会卡5
                    if (get_field_spell_mode(2) === 5) {
                        if (liqi_info[seat].liqi === 1)
                            ans.fans.push({ val: 2, id: 2 }); // 立直
                        if (liqi_info[seat].liqi === 2)
                            ans.fans.push({ val: 4, id: 18 }); // 两立直
                    }
                    else if (is_beishuizhizhan()) {
                        if (liqi_info[seat].liqi === 1 && liqi_info[seat].beishui_type === 1)
                            ans.fans.push({ val: 3, id: 806 }); // 真-立直
                        else if (liqi_info[seat].liqi === 2 && liqi_info[seat].beishui_type === 1)
                            ans.fans.push({ val: 4, id: 807 }); // 真-两立直
                        else if (liqi_info[seat].liqi === 1 && liqi_info[seat].beishui_type === 2)
                            ans.fans.push({ val: 5, id: 808 }); // 极-立直
                        else if (liqi_info[seat].liqi === 2 && liqi_info[seat].beishui_type === 2)
                            ans.fans.push({ val: 6, id: 809 }); // 极-两立直
                        else if (liqi_info[seat].liqi === 1)
                            ans.fans.push({ val: 1, id: 2 }); // 立直
                        else if (liqi_info[seat].liqi === 2)
                            ans.fans.push({ val: 2, id: 18 }); // 两立直
                    }
                    else {
                        if (liqi_info[seat].liqi === 1)
                            ans.fans.push({ val: 1, id: 2 }); // 立直
                        if (liqi_info[seat].liqi === 2)
                            ans.fans.push({ val: 2, id: 18 }); // 两立直
                    }
                }
                // 幻境传说: 机会卡5
                if (get_field_spell_mode(2) === 5) {
                    if (liqi_info[seat].liqi !== 0 && liqi_info[seat].yifa !== 0)
                        ans.fans.push({ val: 2, id: 30 }); // 一发
                }
                else {
                    if (liqi_info[seat].liqi !== 0 && liqi_info[seat].yifa !== 0 && !no_yifa())
                        ans.fans.push({ val: 1, id: 30 }); // 一发
                }
            }
            if (lst_name === 'RecordAnGangAddGang')
                ans.fans.push({ val: 1, id: 3 }); // 枪杠
            if (zimo && base_info.lst_draw_type === 0)
                ans.fans.push({ val: 1, id: 4 }); // 岭上开花
            if (zimo && paishan.length === wangpai_num && base_info.lst_draw_type === 1)
                ans.fans.push({ val: 1, id: 5 }); // 海底摸月
            if (!zimo && paishan.length === wangpai_num)
                ans.fans.push({ val: 1, id: 6 }); // 河底捞鱼
            if (menqing && zimo)
                ans.fans.push({ val: 1, id: 1 }); // 门前清自摸和
            // ------------------------------------
            const hunyise = hunyise_man || hunyise_pin || hunyise_sou;
            const qingyise = qingyise_man || qingyise_pin || qingyise_sou;
            if (qingyise)
                ans.fans.push({ val: menqing ? 6 : 5, id: 29 }); // 清一色
            // ------------------------------------
            // 3 番
            if (beikou === 2 && menqing)
                ans.fans.push({ val: 3, id: 28 }); // 二杯口
            let chunquandai = true, hunquandai = true;
            for (let j = 0; j < 3; j++)
                for (let i = 1; i <= 9; i++) {
                    // 从顺子和(刻子, 雀头)的角度判断是否有全带, 先顺子后(刻子, 雀头)
                    if (i > 2 && i < 8 && shunzi[i + group[j]] >= 1)
                        chunquandai = hunquandai = false;
                    if (i > 1 && i < 9 && kezi[i + group[j]] + type_cnt[i + group[j]][7] >= 1)
                        chunquandai = hunquandai = false;
                }
            for (let i = 1; i <= 7; i++)
                if (kezi[i + 'z'] + type_cnt[i + 'z'][7] >= 1)
                    chunquandai = false;
            if (chunquandai)
                ans.fans.push({ val: menqing ? 3 : 2, id: 26 }); // 纯全带幺九
            if (hunyise && !qingyise)
                ans.fans.push({ val: menqing ? 3 : 2, id: 27 }); // 混一色
            // ------------------------------------
            // 2 番
            if (duizi_num === 7)
                ans.fans.push({ val: 2, id: 25 }); // 七对子
            if (hunquandai && !chunquandai && !hunlaotou)
                ans.fans.push({ val: menqing ? 2 : 1, id: 15 }); // 混全带幺九
            let yiqi = false;
            for (let i = 0; i < 3; i++)
                if (shunzi['2' + group[i]] >= 1 && shunzi['5' + group[i]] >= 1 && shunzi['8' + group[i]] >= 1)
                    yiqi = true;
            if (yiqi)
                ans.fans.push({ val: menqing ? 2 : 1, id: 16 }); // 一气通贯
            let sanse = false, sansetongke = false;
            for (let i = 1; i <= 9; i++) {
                if (i > 1 && i < 9 && shunzi[i + 'm'] >= 1 && shunzi[i + 'p'] >= 1 && shunzi[i + 's'] >= 1)
                    sanse = true;
                if (kezi[i + 'm'] >= 1 && kezi[i + 'p'] >= 1 && kezi[i + 's'] >= 1)
                    sansetongke = true;
            }
            if (sanse)
                ans.fans.push({ val: menqing ? 2 : 1, id: 17 }); // 三色同顺
            if (sansetongke)
                ans.fans.push({ val: 2, id: 19 }); // 三色同刻
            if (gangzi_num === 3)
                ans.fans.push({ val: 2, id: 20 }); // 三杠子
            if (kezi_num === 4)
                ans.fans.push({ val: 2, id: 21 }); // 对对和
            if (anke_num === 3)
                ans.fans.push({ val: 2, id: 22 }); // 三暗刻
            let xiaosanyuan = false;
            for (let i = 0; i < 3; i++)
                if (type_cnt[5 + i + 'z'][7] === 1 && kezi[5 + (i + 1) % 3 + 'z'] >= 1 && kezi[5 + (i + 2) % 3 + 'z'] >= 1)
                    xiaosanyuan = true;
            if (xiaosanyuan)
                ans.fans.push({ val: 2, id: 23 }); // 小三元
            if (hunlaotou && !qinglaotou)
                ans.fans.push({ val: 2, id: 24 }); // 混老头
            // ------------------------------------
            // 1 番
            let pinghu = true;
            if (duizi_num === 7)
                pinghu = false;
            for (const tile of Constants.TILE_NO_AKA) {
                if (kezi[tile] >= 1) // 有刻子
                    pinghu = false;
                if (type_cnt[tile][7] === 1) {
                    // 雀头是自风, 场风, 三元
                    if (((seat - base_info.ju + base_info.player_cnt) % base_info.player_cnt + 1) + 'z' === tile)
                        pinghu = false;
                    if ((base_info.chang + 1) + 'z' === tile)
                        pinghu = false;
                    if (Constants.DRAGON_TILE.includes(tile))
                        pinghu = false;
                }
            }
            // 顺子两面听判断
            let flag_liangmian = false;
            if (parseInt(simplify(lastile)) >= 4 && parseInt(simplify(lastile)) <= 9) // 数牌4-9
                if (shunzi[parseInt(simplify(lastile)) - 1 + lastile[1]] >= 1) // 顺子的中心比 lastile 小 1
                    flag_liangmian = true;
            if (parseInt(simplify(lastile)) >= 1 && parseInt(simplify(lastile)) <= 6) // 数牌1-6
                if (shunzi[parseInt(simplify(lastile)) + 1 + lastile[1]] >= 1) // 顺子的中心比 lastile 大 1
                    flag_liangmian = true;
            if (!flag_liangmian)
                pinghu = false;
            if (pinghu && menqing)
                ans.fans.push({ val: 1, id: 14 }); // 平和
            if (beikou === 1 && menqing)
                ans.fans.push({ val: 1, id: 13 }); // 一杯口
            if (kezi['5z'] >= 1)
                ans.fans.push({ val: kezi['5z'], id: 7 }); // 白
            if (kezi['6z'] >= 1)
                ans.fans.push({ val: kezi['6z'], id: 8 }); // 发
            if (kezi['7z'] >= 1)
                ans.fans.push({ val: kezi['7z'], id: 9 }); // 中
            if (kezi[(seat - base_info.ju + base_info.player_cnt) % base_info.player_cnt + 1 + 'z'] >= 1)
                ans.fans.push({
                    val: kezi[(seat - base_info.ju + base_info.player_cnt) % base_info.player_cnt + 1 + 'z'],
                    id: 10
                }); // 自风
            if (kezi[base_info.chang + 1 + 'z'] >= 1)
                ans.fans.push({ val: kezi[base_info.chang + 1 + 'z'], id: 11 }); // 场风
            if (duanyao && (!no_shiduan() || no_shiduan() && menqing))
                // 幻境传说: 机会卡4
                ans.fans.push({ val: get_field_spell_mode(2) === 4 ? 3 : 1, id: 12 }); // 断幺九
            // ------------------------------------
            if (is_guyi() || is_yifanjieguyi()) {
                if (lst_name === 'RecordDiscardTile' && getLstAction().data.is_liqi)
                    ans.fans.push({ val: 1, id: 51 }); // 燕返
                if (!zimo && base_info.lst_draw_type === 0 && lst_name === 'RecordDiscardTile')
                    if (getLstAction(3) !== undefined && (getLstAction(3).name === 'RecordAnGangAddGang' || getLstAction(3).name === 'RecordChiPengGang'))
                        ans.fans.push({ val: 1, id: 52 }); // 杠振
                if (fulu_cnt === 4)
                    ans.fans.push({ val: 1, id: 53 }); // 十二落抬
            }
            let wumenqi = true;
            const wumen_lows = ['1m', '1p', '1s', '1z', '5z'], wumen_highs = ['9m', '9p', '9s', '4z', '7z'];
            for (let i = 0; i < 5; i++) {
                let flag = false;
                for (let j = parseInt(wumen_lows[i]); j <= parseInt(wumen_highs[i]); j++)
                    flag || (flag = cnt2[j + wumen_lows[i][1]] > 0);
                if (!flag)
                    wumenqi = false;
            }
            if ((is_guyi() || is_yifanjieguyi()) && wumenqi)
                ans.fans.push({ val: 2, id: 54 }); // 五门齐
            let santongshun = false, sanlianke = false;
            for (const tile of Constants.TILE_NO_AKA) {
                if (!judgeTile(tile, 'H'))
                    if (kezi[parseInt(tile) - 1 + tile[1]] >= 1 && kezi[tile] >= 1 && kezi[parseInt(tile) + 1 + tile[1]] >= 1)
                        sanlianke = true;
                if (Math.floor(shunzi[tile] / 3) >= 1)
                    santongshun = true;
            }
            if ((is_guyi() || is_yifanjieguyi()) && sanlianke)
                ans.fans.push({ val: 2, id: 55 }); // 三连刻
            if ((is_guyi() || is_yifanjieguyi()) && santongshun) {
                deleteFan(13); // 删除一杯口
                ans.fans.push({ val: menqing ? 3 : 2, id: 56 }); // 一色三同顺
            }
            if (is_guyi()) {
                if (zimo && paishan.length === wangpai_num && base_info.lst_draw_type === 1 && simplify(lastile) === '1p') {
                    deleteFan(5); // 删除海底摸月
                    ans.fans.push({ val: 5, id: 57 }); // 一筒摸月
                }
                if (!zimo && paishan.length === wangpai_num && simplify(lastile) === '9p') {
                    deleteFan(6); // 删除河底捞鱼
                    ans.fans.push({ val: 5, id: 58 }); // 九筒捞鱼
                }
            }
            if (is_yifanjieguyi()) {
                let have_0m = false, have_0p = false, have_0s = false;
                for (const tile of tiles) {
                    if (tile.substring(0, 2) === '0m')
                        have_0m = true;
                    if (tile.substring(0, 2) === '0p')
                        have_0p = true;
                    if (tile.substring(0, 2) === '0s')
                        have_0s = true;
                }
                for (const f of fulu[seat])
                    for (const tile of f.tile) {
                        if (tile.substring(0, 2) === '0m')
                            have_0m = true;
                        if (tile.substring(0, 2) === '0p')
                            have_0p = true;
                        if (tile.substring(0, 2) === '0s')
                            have_0s = true;
                    }
                const chisanse = have_0m && have_0p && have_0s;
                let sansetongguan = false;
                for (let i = 0; i < 3; i++)
                    for (let j = (i + 1) % 3; j !== i; j = (j + 1) % 3) {
                        const k = 3 - i - j;
                        if (shunzi[3 * i + 2 + 'm'] >= 1 && shunzi[3 * j + 2 + 'p'] >= 1 && shunzi[3 * k + 2 + 's'] >= 1)
                            sansetongguan = true;
                    }
                if (tuibudao)
                    ans.fans.push({ val: 1, id: 9700 }); // 推不倒
                if (chisanse)
                    ans.fans.push({ val: 2, id: 9701 }); // 赤三色
                if (sansetongguan)
                    ans.fans.push({ val: menqing ? 2 : 1, id: 9702 }); // 三色通贯
            }
            if (calcSudian(ans) === -2e3)
                return ans;
            // --------------------------------------------------
            // 悬赏番
            if (all_doras[0] > 0)
                // 幻境传说: 机会卡1
                if (!(get_field_spell_mode(2) === 1 && liqi_info[seat].liqi !== 0))
                    ans.fans.push({ val: all_doras[0], id: 31 }); // 宝牌
            if (all_doras[1] > 0)
                ans.fans.push({ val: all_doras[1], id: 32 }); // 红宝牌
            if (all_doras[2] > 0)
                ans.fans.push({ val: all_doras[2], id: 34 }); // 北宝牌
            if (liqi_info[seat].liqi !== 0) {
                // 幻境传说: 机会卡1
                const times = get_field_spell_mode(2) === 1 ? 2 : 1;
                ans.fans.push({ val: all_doras[3] * times, id: 33 }); // 里宝牌
            }
            if (is_hunzhiyiji())
                if (!zimo && hunzhiyiji_info[fangchong].liqi !== 0)
                    ans.fans.push({ val: 2, id: 803 }); // 过载
            if (is_yongchang()) {
                const moqie_bonus = yongchang_data[seat].moqie_bonus;
                const shouqie_bonus = yongchang_data[seat].shouqie_bonus;
                if (moqie_bonus !== 0)
                    ans.fans.push({ val: moqie_bonus, id: 801 }); // 绯
                if (shouqie_bonus !== 0)
                    ans.fans.push({ val: shouqie_bonus, id: 802 }); // 苍
            }
            // --------------------------------------------------
            // --------------------------------------------------
            // --------------------------------------------------
            ans.fu = calcFu(tingpaifu, duizi_num, pinghu, type_cnt, seat, zimo, menqing, fulu_cnt);
            return ans;
        }
    };
    /**
     * calcFan 组 - 川麻
     *
     * 根据牌算番
     * @param seat - 和牌的 seat 号玩家
     * @param zimo - 是否是自摸
     * @param type - false 表示正常和牌, true 表示查大叫的情况
     */
    const calcFanChuanma = (seat, zimo, type = false) => {
        // 更新返回值
        const updateRet = (x) => {
            if (calcSudianChuanma(ret, 1) < calcSudianChuanma(x, 1))
                for (const key of Object.keys(x))
                    ret[key] = x[key];
        };
        const tiles = player_tiles[seat];
        // 手牌少一张, 表示查大叫的情况
        if (tiles.length % 3 === 1 && type) {
            const ret = { fans: [], fu: 0 };
            const tingpais = calcTingpai(seat);
            for (const tingpai of tingpais) {
                tiles.push(tingpai.tile);
                const tmp = calcFanChuanma(seat, zimo, type);
                updateRet(tmp);
                tiles.pop();
            }
            return ret;
        }
        const lastile = tiles[tiles.length - 1];
        const ret = { fans: [], fu: 0 };
        // cnt 不含副露, 不含红包牌和拔北宝牌
        // cnt2 包含副露, 不含红包牌和拔北宝牌
        const cnt = {}, cnt2 = {};
        for (const tile of Constants.TILE)
            cnt[tile] = cnt2[tile] = 0;
        for (const tile of tiles) {
            cnt[simplify(tile)]++;
            cnt2[simplify(tile)]++;
        }
        let fulu_cnt = 0;
        const partition = [];
        for (const f of fulu[seat]) {
            fulu_cnt++;
            partition.push(f);
            for (const tile of f.tile)
                cnt2[simplify(tile)]++;
        }
        if (isHuazhu(seat))
            return ret;
        dfs(Constants.DFS_BEGIN_TILE, partition, cnt, lastile, zimo, updateRet, calc0);
        if (calcHupai(tiles) === 2) { // 七对子只有一种分解方式
            partition.length = 0;
            for (const tile of Constants.TILE_NO_AKA)
                while (cnt[tile] > 0) {
                    partition.push({ type: 7, tile: [tile, tile] });
                    cnt[tile] -= 2;
                }
            calc0(0, partition.slice());
        }
        return ret;
        /**
         * 核心算法, 根据所有前置动作计算手牌有哪些番
         *
         * @param tingpaifu - 听牌符数, 这里没什么用
         * @param partition_tmp - 牌划分的副本, 即 partition.slice()
         */
        function calc0(tingpaifu, partition_tmp) {
            const ans = { fans: [], fu: 0 };
            // 0: 明顺    1: 明刻   2: 明杠   3: 暗杠
            // 4: 北宝    5: 暗顺   6: 暗刻   7: 对子
            const type_cnt = {};
            const kezi = {}, gangzi = {}, shunzi = {};
            let kezi_num = 0, gangzi_num = 0, duizi_num = 0;
            for (const tile of Constants.TILE_NO_AKA) {
                type_cnt[tile] = [0, 0, 0, 0, 0, 0, 0, 0];
                kezi[tile] = gangzi[tile] = shunzi[tile] = 0;
            }
            for (const p of partition_tmp) {
                const p_type = p.type;
                switch (p_type) {
                    case 1:
                        kezi[simplify(p.tile[0])]++;
                        break;
                    case 2:
                        kezi[simplify(p.tile[0])]++;
                        gangzi[simplify(p.tile[0])]++;
                        break;
                    case 3:
                        kezi[simplify(p.tile[0])]++;
                        gangzi[simplify(p.tile[0])]++;
                        break;
                    case 6:
                        kezi[simplify(p.tile[0])]++;
                        break;
                    case 0:
                    case 5:
                        shunzi[shunziMidTile(p.tile)]++;
                        break;
                }
                if (p_type === 1 || p_type === 2 || p_type === 3 || p_type === 6 || p_type === 7)
                    type_cnt[simplify(p.tile[0])][p_type]++;
                if (p_type === 0 || p_type === 5)
                    type_cnt[shunziMidTile(p.tile)][p_type]++;
            }
            for (const tile of Constants.TILE_NO_AKA) {
                kezi_num += kezi[tile];
                gangzi_num += gangzi[tile];
                duizi_num += type_cnt[tile][7];
            }
            const group = Constants.GROUP;
            // --------------------------
            let quandai = true;
            for (let j = 0; j < 3; j++)
                for (let i = 1; i <= 9; i++) {
                    // 从顺子和(刻子, 雀头)的角度判断是否有全带, 先顺子后(刻子, 雀头)
                    if (i > 2 && i < 8 && shunzi[i + group[j]] >= 1)
                        quandai = false;
                    if (i > 1 && i < 9 && kezi[i + group[j]] + type_cnt[i + group[j]][7] >= 1)
                        quandai = false;
                }
            // --------------------------
            let qingyise_man = true, qingyise_pin = true, qingyise_sou = true;
            let jiangdui = true;
            for (const tile of Constants.TILE_NO_AKA)
                if (cnt2[tile] > 0) {
                    if (tile[1] !== 'm')
                        qingyise_man = false;
                    if (tile[1] !== 'p')
                        qingyise_pin = false;
                    if (tile[1] !== 's')
                        qingyise_sou = false;
                    if (!judgeTile(tile, 'jiangdui'))
                        jiangdui = false;
                }
            const qingyise = qingyise_man || qingyise_pin || qingyise_sou;
            // ---------------------------
            ans.fans[1000] = 0;
            ans.fans[1003] = 1;
            for (const tile of Constants.TILE_NO_AKA)
                ans.fans[1000] += Math.floor(cnt2[tile] / 4); // 根
            if (!type && zimo && getLstAction(2) !== undefined && (getLstAction(2).name === 'RecordAnGangAddGang' || getLstAction(2).name === 'RecordChiPengGang'))
                ans.fans[1001] = 1; // 杠上花
            if (!type && !zimo && getLstAction(3) !== undefined && (getLstAction(3).name === 'RecordAnGangAddGang' || getLstAction(3).name === 'RecordChiPengGang'))
                ans.fans[1002] = 1; // 杠上炮
            if (!type && getLstAction().name === 'RecordAnGangAddGang')
                ans.fans[1004] = 1; // 抢杠
            if (kezi_num === 4)
                ans.fans[1005] = 2; // 对对和
            if (qingyise)
                ans.fans[1006] = 3; // 清一色
            if (duizi_num === 7)
                ans.fans[1007] = 3; // 七对子
            if (quandai)
                ans.fans[1008] = 3; // 带幺九
            if (fulu_cnt === 4)
                ans.fans[1009] = 3; // 金钩钓
            if (qingyise && kezi_num === 4)
                ans.fans[1010] = 4; // 清对
            if (jiangdui && kezi_num === 4)
                ans.fans[1011] = 4; // 将对
            if (ans.fans[1000] > 0 && duizi_num === 7) {
                ans.fans[1012] = 4;
                ans.fans[1000]--;
            } // 龙七对
            if (qingyise && duizi_num === 7)
                ans.fans[1013] = 5; // 清七对
            if (qingyise && fulu_cnt === 4)
                ans.fans[1014] = 5; // 清金钩钓
            if (qingyise && ans.fans[1012] === 4)
                ans.fans[1015] = 6; // 清龙七对
            if (gangzi_num === 4) {
                ans.fans[1016] = 6;
                ans.fans[1000] -= 4;
            } // 十八罗汉
            if (qingyise && gangzi_num === 4)
                ans.fans[1017] = 6; // 清十八罗汉
            if (liqi_info[seat].yifa !== 0 && liqi_info[seat].liqi === 0 && zimo)
                if (seat === base_info.ju)
                    ans.fans[1018] = 6; // 天和
                else
                    ans.fans[1019] = 6; // 地和
            if (qingyise && quandai)
                ans.fans[1020] = 5; // 清幺九
            if (!type && paishan.length === 0)
                ans.fans[1021] = 1; // 海底捞月
            ans.fu = calcFu(tingpaifu, duizi_num, false, type_cnt, seat, zimo, fulu_cnt === 0, fulu_cnt);
            return ans2Fan(ans);
        }
        // 根据初步算得的番列表, 确定要实际显示哪些番
        function ans2Fan(x) {
            const ans = { fans: [], fu: x.fu };
            for (let i = 1019; i >= 1005; i--) {
                if (i === 1014 && x.fans[1020] >= 1) { // 这里 1014 可以换成 1013, 1012
                    ans.fans.push({ val: x.fans[1020], id: 1020 });
                    break;
                }
                if (x.fans[i] >= 1) {
                    ans.fans.push({ val: x.fans[i], id: i });
                    break;
                }
                if (i === 1005 && ans.fans.length === 0)
                    ans.fans.push({ val: x.fans[1003], id: 1003 });
            }
            if (x.fans[1000] >= 1)
                ans.fans.push({ val: x.fans[1000], id: 1000 });
            if (x.fans[1001] >= 1)
                ans.fans.push({ val: x.fans[1001], id: 1001 });
            if (x.fans[1002] >= 1)
                ans.fans.push({ val: x.fans[1002], id: 1002 });
            if (x.fans[1004] >= 1)
                ans.fans.push({ val: x.fans[1004], id: 1004 });
            if (x.fans[1021] >= 1)
                ans.fans.push({ val: x.fans[1021], id: 1021 });
            return ans;
        }
    };
    /**
     * calcFan 组 - 国标
     *
     * 根据牌算番
     * @param seat - 和牌的 seat 号玩家
     * @param zimo - 是否是自摸
     */
    const calcFanGuobiao = (seat, zimo) => {
        // 更新返回值
        const updateRet = (x) => {
            if (calcSudianGuobiao(ret) < calcSudianGuobiao(x))
                for (const key of Object.keys(x))
                    ret[key] = x[key];
        };
        const tiles = player_tiles[seat];
        const lastile = tiles[tiles.length - 1];
        const ret = { fans: [], fu: 0 };
        // cnt 不含副露, 不含红包牌和拔北宝牌
        // cnt2 包含副露, 不含红包牌和拔北宝牌
        const cnt = {}, cnt2 = {};
        for (const tile of Constants.TILE)
            cnt[tile] = cnt2[tile] = 0;
        for (const tile of tiles) {
            cnt[simplify(tile)]++;
            cnt2[simplify(tile)]++;
        }
        let fulu_cnt = 0;
        const partition = [];
        for (const f of fulu[seat])
            if (f.type !== 4) {
                if (f.type !== 3)
                    fulu_cnt++;
                partition.push(f);
                for (const tile of f.tile)
                    cnt2[simplify(tile)]++;
            }
        dfs(Constants.DFS_BEGIN_TILE, partition, cnt, lastile, zimo, updateRet, calc0);
        const result = calcHupai(tiles);
        if (result === 3) {
            const ans = { fans: [], fu: 25 };
            ans.fans.push({ val: 88, id: 8006 }); // 十三幺
            specialCalc(ans);
            updateRet(ans);
        }
        if (result === 4 || result === 5) { // 一定是全不靠或七星不靠
            const qixingbukao = Constants.HONOR_TILE.every(tile => cnt[tile] > 0);
            const ans = { fans: [], fu: 25 };
            if (qixingbukao)
                ans.fans.push({ val: 24, id: 8019 }); // 七星不靠
            else if (result === 5) { // 有组合龙
                ans.fans.push({ val: 12, id: 8033 }); // 全不靠
                ans.fans.push({ val: 12, id: 8034 }); // 组合龙
            }
            else
                ans.fans.push({ val: 12, id: 8033 }); // 全不靠
            specialCalc(ans);
            updateRet(ans);
        }
        if (result >= 6 && result <= 11) { // 没有全不靠的组合龙
            const condition = Constants.GB_CONDITIONS[result - 6];
            for (let i = 0; i < 3; i++) {
                const new_shunzi = [condition[3 * i], condition[3 * i + 1], condition[3 * i + 2]];
                partition.push({ type: 8, tile: new_shunzi });
            }
            for (const tile of condition) {
                tiles.splice(tiles.indexOf(tile), 1);
                cnt[tile]--;
            }
            dfs(Constants.DFS_BEGIN_TILE, partition, cnt, lastile, zimo, updateRet, calc0);
            for (const tile of condition) {
                tiles.push(tile);
                cnt[tile]++;
            }
            tiles.sort(cmp);
            ret.fans.push({ val: 12, id: 8034 }); // 组合龙
            ret.fu = 25;
        }
        return ret;
        /**
         * 核心算法, 根据所有前置动作计算手牌有哪些番
         *
         * @param tingpaifu - 听牌符数, 这里没什么用
         * @param partition_tmp - 牌划分的副本, 即 partition.slice()
         */
        function calc0(tingpaifu, partition_tmp) {
            // ban 掉 ids 中 id 的番
            const banFan = (ids) => {
                if (typeof ids == 'number')
                    ids = [ids];
                for (const id of ids)
                    ban_num[id - 8000] = true;
            };
            // id 番是否已被 ban
            const isBanned = (id) => ban_num[id - 8000];
            const menqing = fulu_cnt === 0;
            // 不计列表
            const ban_num = [];
            for (let i = 0; i < 100; i++)
                ban_num[i] = false;
            // 指定数量的不计幺九刻计数
            let ban_yaojiuke_num = 0;
            const ans = { fans: [], fu: 0 };
            // 0: 明顺    1: 明刻   2: 明杠   3: 暗杠
            // 4: 北宝    5: 暗顺   6: 暗刻   7: 对子
            const type_cnt = {};
            // 刻子, 杠子, 暗刻, 顺子
            const kezi = {}, gangzi = {}, anke = {}, shunzi = {};
            let kezi_num = 0, gangzi_num = 0, anke_num = 0, duizi_num = 0;
            let minggang_num = 0, angang_num = 0;
            for (const tile of Constants.TILE_NO_AKA) {
                type_cnt[tile] = [0, 0, 0, 0, 0, 0, 0, 0];
                anke[tile] = gangzi[tile] = kezi[tile] = shunzi[tile] = 0;
            }
            for (const p of partition_tmp) {
                const type = p.type;
                switch (type) {
                    case 1:
                        kezi[simplify(p.tile[0])]++;
                        break;
                    case 2:
                        kezi[simplify(p.tile[0])]++;
                        gangzi[simplify(p.tile[0])]++;
                        break;
                    case 3:
                        kezi[simplify(p.tile[0])]++;
                        gangzi[simplify(p.tile[0])]++;
                        anke[simplify(p.tile[0])]++;
                        break;
                    case 6:
                        kezi[simplify(p.tile[0])]++;
                        anke[simplify(p.tile[0])]++;
                        break;
                    case 0:
                    case 5:
                        shunzi[shunziMidTile(p.tile)]++;
                        break;
                    case 8:
                        banFan(8042); // 有类型8, 则是在组合龙内, ban 无番和
                        break;
                }
                if (type === 1 || type === 2 || type === 3 || type === 6 || type === 7)
                    type_cnt[simplify(p.tile[0])][type]++;
                if (type === 0 || type === 5)
                    type_cnt[shunziMidTile(p.tile)][type]++;
            }
            let beikou = 0;
            for (const tile of Constants.TILE_NO_AKA) {
                anke_num += anke[tile];
                gangzi_num += gangzi[tile];
                kezi_num += kezi[tile];
                duizi_num += type_cnt[tile][7];
                minggang_num += type_cnt[tile][2];
                angang_num += type_cnt[tile][3];
                // 这里的杯口数量算上副露的, 最后在判断是否有效
                beikou += Math.floor(shunzi[tile] / 2);
            }
            const group = Constants.GROUP;
            // --------------------------
            // --------------------------
            // --------------------------
            let ziyise = true, lvyise = true, qinglaotou = true, duanyao = true, hunlaotou = true;
            let hunyise_man = true, hunyise_pin = true, hunyise_sou = true;
            let qingyise_man = true, qingyise_pin = true, qingyise_sou = true;
            let tuibudao = true, quanshuangke = true, dayuwu = true, xiaoyuwu = true;
            let quanda = true, quanzhong = true, quanxiao = true;
            let wuzi = true;
            for (const tile of Constants.TILE_NO_AKA)
                if (cnt2[tile] > 0) {
                    if (!judgeTile(tile, 'H'))
                        ziyise = false; // 字一色
                    if (!judgeTile(tile, 'T'))
                        qinglaotou = false; // 清幺九
                    if (!judgeTile(tile, 'D'))
                        duanyao = false; // 断幺
                    if (!judgeTile(tile, 'Y'))
                        hunlaotou = false; // 混幺九
                    if (!judgeTile(tile, 'L'))
                        lvyise = false; // 绿一色
                    if (tile[1] !== 'm') {
                        if (tile[1] !== 'z')
                            hunyise_man = false;
                        qingyise_man = false;
                    }
                    if (tile[1] !== 'p') {
                        if (tile[1] !== 'z')
                            hunyise_pin = false;
                        qingyise_pin = false;
                    }
                    if (tile[1] !== 's') {
                        if (tile[1] !== 'z')
                            hunyise_sou = false;
                        qingyise_sou = false;
                    }
                    if (!judgeTile(tile, 'tuibudao'))
                        tuibudao = false;
                    if (!judgeTile(tile, 'quanshuang'))
                        quanshuangke = false;
                    if (!judgeTile(tile, 'quanda'))
                        quanda = false;
                    if (!judgeTile(tile, 'quanzhong'))
                        quanzhong = false;
                    if (!judgeTile(tile, 'quanxiao'))
                        quanxiao = false;
                    if (!judgeTile(tile, 'dayuwu'))
                        dayuwu = false;
                    if (!judgeTile(tile, 'xiaoyuwu'))
                        xiaoyuwu = false;
                    if (judgeTile(tile, 'H'))
                        wuzi = false;
                }
            // ---------------------------
            // ---------------------------
            // ---------------------------
            if (angang_num === 1 && gangzi_num === 2)
                ans.fans.push({ val: 5, id: 8082 }); // 明暗杠
            // --------------------------
            // 天地人和
            if (liqi_info[seat].yifa !== 0 && liqi_info[seat].liqi === 0 && seat === base_info.ju && zimo) {
                ans.fans.push({ val: 8, id: 8083 }); // 天和
                // 不计 不求人, 自摸, 边张, 坎张, 单钓将
                banFan([8055, 8081, 8078, 8079, 8080]);
            }
            let first_tile = true;
            for (let tmp_seat = 0; tmp_seat < base_info.player_cnt; tmp_seat++) {
                if (tmp_seat === base_info.ju)
                    continue;
                if (!(liqi_info[tmp_seat].yifa !== 0 && liqi_info[tmp_seat].liqi === 0))
                    first_tile = false;
            }
            if (first_tile && seat !== base_info.ju && !zimo) {
                ans.fans.push({ val: 8, id: 8084 }); // 地和
                // 不计 门前清
                banFan(8063);
            }
            // 在立直麻将中人和的基础上添加亲家的下一家没有一发(因为国标没有立直, 所以任何情况下切牌后都没有一发)
            if (liqi_info[seat].yifa !== 0 && liqi_info[seat].liqi === 0 && seat !== base_info.ju) {
                if (zimo) {
                    ans.fans.push({ val: 8, id: 8085 }); // 人和
                    // 不计 不求人, 自摸
                    banFan([8055, 8081]);
                }
                else if (liqi_info[(base_info.ju + 1) % base_info.player_cnt].yifa === 0) {
                    ans.fans.push({ val: 8, id: 8085 }); // 人和
                    // 不计 门前清
                    banFan(8063);
                }
            }
            // --------------------------
            // --------------------------
            // --------------------------
            // 88 番, 十三幺不在 calc 函数中, 另算
            const dasixi = kezi['1z'] >= 1 && kezi['2z'] >= 1 && kezi['3z'] >= 1 && kezi['4z'] >= 1;
            if (dasixi && !isBanned(8000)) {
                ans.fans.push({ val: 88, id: 8000 }); // 大四喜
                // 不计 三风刻, 碰碰和, 圈风刻, 门风刻, 幺九刻
                banFan([8037, 8047, 8061, 8062, 8074]);
            }
            const dasanyuan = kezi['5z'] >= 1 && kezi['6z'] >= 1 && kezi['7z'] >= 1;
            if (dasanyuan && !isBanned(8001)) {
                ans.fans.push({ val: 88, id: 8001 }); // 大三元
                // 不计 双箭刻, 箭刻, 组成大三元的三副刻子不计幺九刻
                banFan([8053, 8058, 8059, 8060]);
                ban_yaojiuke_num += 3;
            }
            if (lvyise && !isBanned(8002)) {
                ans.fans.push({ val: 88, id: 8002 }); // 绿一色
                // 不计 混一色
                banFan(8048);
            }
            // 国标中的九莲对标立直麻将中的纯九
            let jiulian = false;
            const jlbd = [0, 3, 1, 1, 1, 1, 1, 1, 1, 3];
            for (let k = 0; k < 3; k++) {
                jiulian = true;
                for (let i = 1; i <= 9; i++)
                    if (cnt2[i + group[k]] < jlbd[i]) // 手牌中各种牌数量不满足
                        jiulian = false;
                    else if (cnt2[i + group[k]] > jlbd[i] && simplify(lastile) !== i + group[k]) // 多出来的牌不是 lastile
                        jiulian = false;
                if (jiulian)
                    break;
            }
            if (gangzi_num >= 1) // 九莲不允许有杠子
                jiulian = false;
            if (jiulian && !isBanned(8003)) {
                ans.fans.push({ val: 88, id: 8003 }); // 九莲宝灯
                // 不计 清一色, 不求人, 门前清, 无字, 一个幺九刻
                banFan([8021, 8055, 8063, 8077]);
                ban_yaojiuke_num++;
            }
            if (gangzi_num === 4 && !isBanned(8004)) {
                ans.fans.push({ val: 88, id: 8004 }); // 四杠
                // 不计 碰碰和, 单钓将
                banFan([8047, 8080]);
            }
            let lianqidui = false;
            for (let i = 0; i < 3; i++)
                if (type_cnt[3 + group[i]][7] >= 1 && type_cnt[4 + group[i]][7] >= 1 && type_cnt[5 + group[i]][7] >= 1 && type_cnt[6 + group[i]][7] >= 1 && type_cnt[7 + group[i]][7] >= 1) {
                    if (type_cnt[1 + group[i]][7] >= 1 && type_cnt[2 + group[i]][7] >= 1)
                        lianqidui = true;
                    if (type_cnt[2 + group[i]][7] >= 1 && type_cnt[8 + group[i]][7] >= 1)
                        lianqidui = true;
                    if (type_cnt[8 + group[i]][7] >= 1 && type_cnt[9 + group[i]][7] >= 1)
                        lianqidui = true;
                    break;
                }
            if (lianqidui && !isBanned(8005)) {
                ans.fans.push({ val: 88, id: 8005 }); // 连七对
                // 不计 清一色, 七对, 不求人, 门前清, 无字, 单钓将
                banFan([8021, 8018, 8055, 8063, 8077, 8080]);
            }
            // ---------------------------
            // 64 番
            if (qinglaotou && !isBanned(8007)) {
                ans.fans.push({ val: 64, id: 8007 }); // 清幺九
                // 不计 混幺九, 碰碰和, 全带幺, 双同刻, 幺九刻, 无字
                banFan([8017, 8047, 8054, 8066, 8074, 8077]);
            }
            let xiaosixi = false;
            for (let i = 0; i < 4; i++)
                if (type_cnt[1 + i + 'z'][7] === 1 && kezi[1 + (i + 1) % 4 + 'z'] >= 1 && kezi[1 + (i + 2) % 4 + 'z'] >= 1 && kezi[1 + (i + 3) % 4 + 'z'] >= 1)
                    xiaosixi = true;
            if (xiaosixi && !isBanned(8008)) {
                ans.fans.push({ val: 64, id: 8008 }); // 小四喜
                // 不计 三风刻, 幺九刻
                banFan([8037, 8074]);
            }
            let xiaosanyuan = false;
            for (let i = 0; i < 3; i++)
                if (type_cnt[5 + i + 'z'][7] === 1 && kezi[5 + (i + 1) % 3 + 'z'] >= 1 && kezi[5 + (i + 2) % 3 + 'z'] >= 1)
                    xiaosanyuan = true;
            if (xiaosanyuan && !isBanned(8009)) {
                ans.fans.push({ val: 64, id: 8009 }); // 小三元
                // 不计 箭刻, 双箭刻, 组成小三元的两副刻子不计幺九刻
                banFan([8058, 8059, 8060, 8053]);
                ban_yaojiuke_num += 2;
            }
            if (ziyise && !isBanned(8010)) {
                ans.fans.push({ val: 64, id: 8010 }); // 字一色
                // 不计 混幺九, 碰碰和, 全带幺, 幺九刻
                // 此外删除判断漏洞的混一色
                banFan([8017, 8047, 8054, 8074, 8048]);
            }
            if (anke_num === 4 && !isBanned(8011)) {
                ans.fans.push({ val: 64, id: 8011 }); // 四暗刻
                // 不计 碰碰和, 不求人, 门前清
                banFan([8047, 8055, 8063]);
            }
            let yiseshuanglonghui = false;
            for (let i = 0; i < 3; i++)
                if (shunzi[2 + group[i]] >= 2 && shunzi[8 + group[i]] >= 2 && type_cnt[5 + group[i]][7] >= 1)
                    yiseshuanglonghui = true;
            if (yiseshuanglonghui && !isBanned(8012)) {
                ans.fans.push({ val: 64, id: 8012 }); // 一色双龙会
                // 不计 七对, 清一色, 平和, 一般高, 老少副, 无字
                banFan([8018, 8021, 8064, 8070, 8073, 8077]);
            }
            // ---------------------------
            // 48 番
            let sitongshun = false, sijiegao = false;
            for (let i = 0; i <= 2; i++)
                for (let j = 1; j <= 9; j++) {
                    if (j !== 1 && j !== 9 && shunzi[j + group[i]] >= 4)
                        sitongshun = true;
                    if (j <= 6 && kezi[j + group[i]] >= 1 && kezi[j + 1 + group[i]] >= 1 && kezi[j + 2 + group[i]] >= 1 && kezi[j + 3 + group[i]] >= 1)
                        sijiegao = true;
                }
            if (sitongshun && !isBanned(8013)) {
                ans.fans.push({ val: 48, id: 8013 }); // 一色四同顺
                // 不计 一色三同顺, 一色三节高, 七对, 四归一, 一般高
                banFan([8022, 8023, 8018, 8065, 8070]);
            }
            if (sijiegao && !isBanned(8014)) {
                ans.fans.push({ val: 48, id: 8014 }); // 一色四节高
                // 不计 一色三同顺, 一色三节高, 碰碰和
                banFan([8022, 8023, 8047]);
            }
            // ---------------------------
            // 32 番
            let sibugao = false;
            for (let i = 0; i < 3; i++) {
                for (let j = 2; j <= 5; j++)
                    if (shunzi[j + group[i]] >= 1 && shunzi[j + 1 + group[i]] >= 1 && shunzi[j + 2 + group[i]] >= 1 && shunzi[j + 3 + group[i]] >= 1)
                        sibugao = true;
                if (shunzi[2 + group[i]] >= 1 && shunzi[4 + group[i]] >= 1 && shunzi[6 + group[i]] >= 1 && shunzi[8 + group[i]] >= 1)
                    sibugao = true;
            }
            if (sibugao && !isBanned(8015)) {
                ans.fans.push({ val: 32, id: 8015 }); // 一色四步高
                // 不计 一色三步高, 连六, 老少副
                banFan([8029, 8072, 8073]);
            }
            if (gangzi_num === 3)
                ans.fans.push({ val: 32, id: 8016 }); // 三杠
            if (hunlaotou && !qinglaotou && !isBanned(8017)) {
                ans.fans.push({ val: 32, id: 8017 }); // 混幺九
                // 不计 碰碰和, 全带幺, 幺九刻
                banFan([8047, 8054, 8074]);
            }
            // ---------------------------
            // 24 番
            // 七星不靠不在 calc 函数中, 另算
            if (duizi_num === 7 && !isBanned(8018)) {
                ans.fans.push({ val: 24, id: 8018 }); // 七对
                // 不计 不求人, 门前清, 单钓将
                banFan([8055, 8063, 8080]);
            }
            if (duizi_num >= 2) // 不能是七对
                quanshuangke = false;
            if (quanshuangke && !isBanned(8020)) {
                ans.fans.push({ val: 24, id: 8020 }); // 全双刻
                // 不计 碰碰和, 断幺, 无字
                banFan([8047, 8069, 8077]);
            }
            const qingyise = qingyise_man || qingyise_pin || qingyise_sou;
            if (qingyise && !isBanned(8021)) {
                ans.fans.push({ val: 24, id: 8021 }); // 清一色
                // 不计 无字
                banFan(8077);
            }
            const santongshun = Constants.TILE_NO_AKA.some(tile => shunzi[tile] === 3);
            if (santongshun && !isBanned(8022)) {
                ans.fans.push({ val: 24, id: 8022 }); // 一色三同顺
                // 不计 一色三节高, 一般高
                banFan([8023, 8070]);
            }
            let yisesanjiegao = false;
            for (let j = 0; j <= 2; j++)
                for (let i = 1; i <= 7; i++)
                    if (kezi[i + group[j]] >= 1 && kezi[i + 1 + group[j]] >= 1 && kezi[i + 2 + group[j]] >= 1)
                        yisesanjiegao = true;
            if (yisesanjiegao && !isBanned(8023)) {
                ans.fans.push({ val: 24, id: 8023 }); // 一色三节高
                // 不计一色三同顺
                banFan(8022);
            }
            if (quanda && !isBanned(8024)) {
                ans.fans.push({ val: 24, id: 8024 }); // 全大
                // 不计 大于五, 无字
                banFan([8035, 8077]);
            }
            if (quanzhong && !isBanned(8025)) {
                ans.fans.push({ val: 24, id: 8025 }); // 全中
                // 不计 断幺, 无字
                banFan([8069, 8077]);
            }
            if (quanxiao && !isBanned(8026)) {
                ans.fans.push({ val: 24, id: 8026 }); // 全小
                // 不计 小于五, 无字
                banFan([8036, 8077]);
            }
            // ---------------------------
            // 16 番
            let yiqi = false;
            for (let k = 0; k < 3; k++)
                if (shunzi['2' + group[k]] >= 1 && shunzi['5' + group[k]] >= 1 && shunzi['8' + group[k]] >= 1)
                    yiqi = true;
            if (yiqi && !isBanned(8027)) {
                ans.fans.push({ val: 16, id: 8027 }); // 清龙
                // 不计 连六, 老少副
                banFan([8072, 8073]);
            }
            let sanseshuanglonghui = false;
            for (let i = 0; i < 3; i++)
                if (shunzi[2 + group[(i + 1) % 3]] >= 1 && shunzi[8 + group[(i + 1) % 3]] >= 1)
                    if (shunzi[2 + group[(i + 2) % 3]] >= 1 && shunzi[8 + group[(i + 2) % 3]] >= 1)
                        if (type_cnt[5 + group[i]][7] >= 1)
                            sanseshuanglonghui = true;
            if (sanseshuanglonghui && !isBanned(8028)) {
                ans.fans.push({ val: 16, id: 8028 }); // 三色双龙会
                // 不计 喜相逢, 老少副, 无字, 平和
                banFan([8071, 8073, 8077, 8064]);
            }
            let yisesanbugao = false;
            for (let j = 0; j <= 2; j++) {
                for (let i = 2; i <= 6; i++)
                    if (shunzi[i + group[j]] >= 1 && shunzi[i + 1 + group[j]] >= 1 && shunzi[i + 2 + group[j]] >= 1)
                        yisesanbugao = true;
                for (let i = 0; i <= 2; i++)
                    if (shunzi[i + 2 + group[j]] >= 1 && shunzi[i + 4 + group[j]] >= 1 && shunzi[i + 6 + group[j]] >= 1)
                        yisesanbugao = true;
            }
            if (yisesanbugao && !isBanned(8029))
                ans.fans.push({ val: 16, id: 8029 }); // 一色三步高
            let quandaiwu = true;
            for (const tile of Constants.TILE_NO_AKA) {
                if (!(parseInt(tile) >= 4 && parseInt(tile) <= 6) && shunzi[tile] >= 1)
                    quandaiwu = false;
                if (tile !== '5m' && tile !== '5p' && tile !== '5s')
                    if (kezi[tile] >= 1 || type_cnt[tile][7] >= 1)
                        quandaiwu = false;
            }
            if (quandaiwu && !isBanned(8030)) {
                ans.fans.push({ val: 16, id: 8030 }); // 全带五
                // 不计 断幺, 无字
                banFan([8069, 8077]);
            }
            let santongke = false, shuangtongke = false;
            for (let i = 1; i <= 9; i++) {
                if (kezi[i + 'm'] >= 1 && kezi[i + 'p'] >= 1 && kezi[i + 's'] >= 1)
                    santongke = true;
                else if (kezi[i + 'm'] >= 1 && kezi[i + 'p'] >= 1 || kezi[i + 'm'] >= 1 && kezi[i + 's'] >= 1 || kezi[i + 'p'] >= 1 && kezi[i + 's'] >= 1)
                    shuangtongke = true;
            }
            if (santongke && !isBanned(8031)) {
                ans.fans.push({ val: 16, id: 8031 }); // 三同刻
                // 不计 双同刻
                banFan(8066);
            }
            if (anke_num === 3 && !isBanned(8032))
                ans.fans.push({ val: 16, id: 8032 }); // 三暗刻
            // ---------------------------
            // 12 番
            // 全不靠和组合龙不在 calc 函数中, 另算
            if (dayuwu && !isBanned(8035)) {
                ans.fans.push({ val: 12, id: 8035 }); // 大于五
                // 不计 无字
                banFan(8077);
            }
            if (xiaoyuwu && !isBanned(8036)) {
                ans.fans.push({ val: 12, id: 8036 }); // 小于五
                // 不计 无字
                banFan(8077);
            }
            let sanfengke = false;
            for (let i = 0; i < 4; i++)
                if (kezi[1 + i + 'z'] >= 1 && kezi[1 + (i + 1) % 4 + 'z'] >= 1 && kezi[1 + (i + 2) % 4 + 'z'] >= 1)
                    sanfengke = true;
            if (sanfengke && !xiaosixi && !isBanned(8037)) {
                ans.fans.push({ val: 12, id: 8037 }); // 三风刻
                // 组成三风刻的三副刻子不计幺九刻
                ban_yaojiuke_num += 3;
            }
            // ---------------------------
            // 8 番, 无番和放到最后
            let hualong = false;
            for (let i = 0; i < 3; i++)
                for (let j = (i + 1) % 3; j !== i; j = (j + 1) % 3) {
                    const k = 3 - i - j;
                    if (shunzi[3 * i + 2 + 'm'] >= 1 && shunzi[3 * j + 2 + 'p'] >= 1 && shunzi[3 * k + 2 + 's'] >= 1)
                        hualong = true;
                }
            let sansetongshun = false, ersetongshun_num = 0;
            for (let i = 2; i <= 8; i++) {
                if (shunzi[i + 'm'] >= 1 && shunzi[i + 'p'] >= 1 && shunzi[i + 's'] >= 1)
                    sansetongshun = true;
                for (let j = 0; j < 3; j++)
                    for (let k = j + 1; k < 3; k++)
                        if (shunzi[i + group[j]] >= 1 && shunzi[i + group[k]] >= 1) {
                            ersetongshun_num += shunzi[i + group[j]] >= 2 && shunzi[i + group[k]] >= 2 ? 2 : 1;
                            break;
                        }
            }
            if (hualong && !isBanned(8038)) {
                ans.fans.push({ val: 8, id: 8038 }); // 花龙
                // 还有喜相逢时, 删除连六和老少副
                if (ersetongshun_num >= 1)
                    banFan([8072, 8073]);
            }
            if (tuibudao && !isBanned(8039)) {
                ans.fans.push({ val: 8, id: 8039 }); // 推不倒
                // 不计 缺一门
                banFan(8076);
            }
            if (sansetongshun && !isBanned(8040)) {
                ans.fans.push({ val: 8, id: 8040 }); // 三色三同顺
                // 不计 喜相逢
                banFan(8071);
            }
            let sansesanjiegao = false;
            for (let i = 1; i <= 7; i++)
                for (let j = 0; j < 3; j++)
                    for (let k = (j + 1) % 3; k !== j; k = (k + 1) % 3) {
                        const l = 3 - j - k;
                        if (kezi[i + j + 'm'] >= 1 && kezi[i + k + 'p'] >= 1 && kezi[i + l + 's'] >= 1)
                            sansesanjiegao = true;
                    }
            if (sansesanjiegao && !isBanned(8041))
                ans.fans.push({ val: 8, id: 8041 }); // 三色三节高
            if (paishan.length === 0) {
                if (zimo && !isBanned(8043)) {
                    ans.fans.push({ val: 8, id: 8043 }); // 妙手回春
                    // 不计 自摸
                    banFan(8081);
                }
                else if (!isBanned(8044))
                    ans.fans.push({ val: 8, id: 8044 }); // 海底捞月
            }
            if (zimo && base_info.lst_draw_type === 0 && !isBanned(8045) && getLstAction(2).name !== 'RecordBaBei') {
                ans.fans.push({ val: 8, id: 8045 }); // 杠上开花
                // 不计 自摸
                banFan(8081);
            }
            if (getLstAction().name === 'RecordAnGangAddGang' && !isBanned(8046)) {
                ans.fans.push({ val: 8, id: 8046 }); // 抢杠和
                // 不计 和绝张
                banFan(8057);
            }
            // ---------------------------
            // 6 番
            if (kezi_num === 4 && !isBanned(8047))
                ans.fans.push({ val: 6, id: 8047 }); // 碰碰和
            const hunyise = hunyise_man || hunyise_pin || hunyise_sou;
            if (hunyise && !qingyise && !isBanned(8048))
                ans.fans.push({ val: 6, id: 8048 }); // 混一色
            let sansesanbugao = false;
            for (let i = 2; i <= 6; i++)
                for (let j = 0; j < 3; j++)
                    for (let k = (j + 1) % 3; k !== j; k = (k + 1) % 3) {
                        const l = 3 - j - k;
                        if (shunzi[i + j + 'm'] >= 1 && shunzi[i + k + 'p'] >= 1 && shunzi[i + l + 's'] >= 1)
                            sansesanbugao = true;
                    }
            if (sansesanbugao && !isBanned(8049))
                ans.fans.push({ val: 6, id: 8049 }); // 三色三步高
            let wumenqi = true;
            const wumen_lows = ['1m', '1p', '1s', '1z', '5z'], wumen_highs = ['9m', '9p', '9s', '4z', '7z'];
            for (let i = 0; i < 5; i++) {
                let flag = false;
                for (let j = parseInt(wumen_lows[i]); j <= parseInt(wumen_highs[i]); j++)
                    flag || (flag = cnt2[j + wumen_lows[i][1]] > 0);
                if (!flag)
                    wumenqi = false;
            }
            if (wumenqi && !isBanned(8050))
                ans.fans.push({ val: 6, id: 8050 }); // 五门齐
            if (!zimo && fulu_cnt === 4 && !isBanned(8051)) {
                ans.fans.push({ val: 6, id: 8051 }); // 全求人
                // 不计 单钓将
                banFan(8080);
            }
            if (angang_num === 2 && !isBanned(8052)) {
                ans.fans.push({ val: 6, id: 8052 }); // 双暗杠
                // 不计 双暗刻
                banFan(8067);
            }
            let shuangjianke = false;
            for (let i = 0; i < 3; i++)
                if (kezi[5 + i + 'z'] >= 1 && kezi[5 + (i + 1) % 3 + 'z'] >= 1)
                    shuangjianke = true;
            if (shuangjianke && !isBanned(8053)) {
                // 不计箭刻, 组成双箭刻的两副刻子不计幺九刻
                banFan([8058, 8059, 8060]);
                ban_yaojiuke_num += 2;
                ans.fans.push({ val: 6, id: 8053 }); // 双箭刻
            }
            // ---------------------------
            // 4 番
            let hunquandai = true;
            for (let j = 0; j < 3; j++)
                for (let i = 1; i <= 9; i++) {
                    // 从顺子和(刻子, 雀头)的角度判断是否有全带, 先顺子后(刻子, 雀头)
                    if (i > 2 && i < 8 && shunzi[i + group[j]] >= 1)
                        hunquandai = false;
                    if (i > 1 && i < 9 && kezi[i + group[j]] + type_cnt[i + group[j]][7] >= 1)
                        hunquandai = false;
                }
            if (hunquandai && !isBanned(8054))
                ans.fans.push({ val: 4, id: 8054 }); // 全带幺
            if (menqing && zimo && !isBanned(8055)) {
                // 不计 自摸
                banFan(8081);
                ans.fans.push({ val: 4, id: 8055 }); // 不求人
            }
            if (minggang_num === 2 && gangzi_num === 2 && !isBanned(8056))
                ans.fans.push({ val: 4, id: 8056 }); // 双明杠
            let lastile_num = 0;
            for (let tmp_seat = 0; tmp_seat < base_info.player_cnt; tmp_seat++) {
                for (const tile of paihe[tmp_seat].tiles) // 查牌河, 注意被鸣走的牌还在 paihe 中
                    if (isEqualTile(lastile, tile))
                        lastile_num++;
                for (const f of fulu[tmp_seat]) // 查副露
                    if (f.from !== undefined)
                        for (let k = 0; k < f.tile.length - 1; k++) // -1 是要剔除掉被鸣走的牌
                            if (isEqualTile(lastile, f.tile[k]))
                                lastile_num++;
            }
            if ((lastile_num === 4 || lastile_num === 3 && zimo) && !isBanned(8057))
                ans.fans.push({ val: 4, id: 8057 }); // 和绝张
            // ---------------------------
            // 2 番
            if (!isBanned(8058))
                for (let i = 0; i < kezi['5z']; i++) {
                    ans.fans.push({ val: 2, id: 8058 }); // 箭刻 白
                    // 这副刻子不计幺九刻
                    ban_yaojiuke_num++;
                }
            if (!isBanned(8059))
                for (let i = 0; i < kezi['6z']; i++) {
                    ans.fans.push({ val: 2, id: 8059 }); // 箭刻 发
                    // 这副刻子不计幺九刻
                    ban_yaojiuke_num++;
                }
            if (!isBanned(8060))
                for (let i = 0; i < kezi['7z']; i++) {
                    ans.fans.push({ val: 2, id: 8060 }); // 箭刻 中
                    // 这副刻子不计幺九刻
                    ban_yaojiuke_num++;
                }
            if (!isBanned(8061))
                for (let i = 0; i < kezi[base_info.chang + 1 + 'z']; i++) {
                    ans.fans.push({ val: 2, id: 8061 }); // 圈风刻
                    // 这副刻子不计幺九刻
                    ban_yaojiuke_num++;
                }
            if (!isBanned(8062))
                for (let i = 0; i < kezi[(seat - base_info.ju + base_info.player_cnt) % base_info.player_cnt + 1 + 'z']; i++) {
                    ans.fans.push({ val: 2, id: 8062 }); // 门风刻
                    // 这副刻子不计幺九刻
                    ban_yaojiuke_num++;
                }
            if (menqing && !zimo && !isBanned(8063))
                ans.fans.push({ val: 2, id: 8063 }); // 门前清
            let pinghu = true;
            if (duizi_num === 7)
                pinghu = false;
            for (const tile of Constants.TILE_NO_AKA)
                if (kezi[tile] >= 1 || Constants.HONOR_TILE.includes(tile) && type_cnt[tile][7] >= 1) // 有刻子或雀头是字牌
                    pinghu = false;
            if (pinghu && !isBanned(8064)) {
                ans.fans.push({ val: 2, id: 8064 }); // 平和
                // 不计 无字
                banFan(8077);
            }
            const siguiyi_num = Constants.TILE_NO_AKA.filter(tile => cnt2[tile] === 4 && gangzi[tile] === 0).length;
            if (siguiyi_num >= 1 && !isBanned(8065))
                ans.fans.push({ val: 2 * siguiyi_num, id: 8065 }); // 四归一
            if (shuangtongke && !isBanned(8066))
                ans.fans.push({ val: 2, id: 8066 }); // 双同刻
            if (anke_num === 2 && !isBanned(8067))
                ans.fans.push({ val: 2, id: 8067 }); // 双暗刻
            if (angang_num === 1 && gangzi_num === 1 && !isBanned(8068))
                ans.fans.push({ val: 2, id: 8068 }); // 暗杠
            if (duanyao && !isBanned(8069)) {
                ans.fans.push({ val: 2, id: 8069 }); // 断幺
                // 不计 无字
                banFan(8077);
            }
            // ---------------------------
            // 1 番
            if (beikou >= 1 && !isBanned(8070))
                ans.fans.push({ val: beikou, id: 8070 }); // 一般高
            if (ersetongshun_num >= 1 && !sansetongshun && !isBanned(8071))
                // 有2个一般高的情况下喜相逢最多只会算1个
                ans.fans.push({ val: beikou >= 2 ? 1 : ersetongshun_num, id: 8071 }); // 一般高
            let lianliu_num = 0;
            for (let j = 0; j < 3; j++)
                for (let i = 2; i <= 5; i++)
                    if (shunzi[i + group[j]] >= 1 && shunzi[i + 3 + group[j]] >= 1)
                        lianliu_num++;
            if (lianliu_num >= 1 && !isBanned(8072))
                // 有2个一般高, 喜相逢的情况下连六最多只会算1个
                ans.fans.push({ val: beikou >= 2 || ersetongshun_num >= 2 ? 1 : lianliu_num, id: 8072 }); // 连六
            let laoshaofu_num = 0;
            for (let j = 0; j < 3; j++)
                if (shunzi[2 + group[j]] >= 1 && shunzi[8 + group[j]] >= 1)
                    laoshaofu_num += shunzi[2 + group[j]] >= 2 && shunzi[8 + group[j]] >= 2 ? 2 : 1;
            if (laoshaofu_num >= 1 && !isBanned(8073))
                // 有2个一般高, 喜相逢的情况下老少副最多只会算1个
                ans.fans.push({ val: beikou >= 2 || ersetongshun_num >= 2 ? 1 : laoshaofu_num, id: 8073 }); // 老少副
            const yaojiuke_num = Constants.YAOJIU_TILE.reduce((sum, tile) => sum + kezi[tile], -ban_yaojiuke_num);
            if (!isBanned(8074) && yaojiuke_num >= 1)
                ans.fans.push({ val: yaojiuke_num, id: 8074 }); // 幺九刻
            if (minggang_num === 1 && gangzi_num === 1 && !isBanned(8075))
                ans.fans.push({ val: 1, id: 8075 }); // 明杠
            let have_m = 0, have_p = 0, have_s = 0;
            for (let i = 1; i <= 9; i++) {
                if (cnt2[i + 'm'] >= 1)
                    have_m = 1;
                if (cnt2[i + 'p'] >= 1)
                    have_p = 1;
                if (cnt2[i + 's'] >= 1)
                    have_s = 1;
            }
            const queyimen = have_m + have_p + have_s === 2;
            if (queyimen && !isBanned(8076))
                ans.fans.push({ val: 1, id: 8076 }); // 缺一门
            if (wuzi && !isBanned(8077))
                ans.fans.push({ val: 1, id: 8077 }); // 无字
            const cnt_hand = {}; // cnt 在 dfs 之后已经清零了, 所以要想再得到手牌情况需要重新遍历
            for (const tile of Constants.TILE_NO_AKA)
                cnt_hand[tile] = 0;
            for (const tile of tiles)
                cnt_hand[simplify(tile)]++;
            let bianzhang = false;
            if (parseInt(simplify(lastile)) === 3 && cnt_hand[2 + lastile[1]] >= 1 && cnt_hand[1 + lastile[1]] >= 1)
                bianzhang = true;
            if (parseInt(simplify(lastile)) === 7 && cnt_hand[8 + lastile[1]] >= 1 && cnt_hand[9 + lastile[1]] >= 1)
                bianzhang = true;
            if (bianzhang && !isBanned(8078)) {
                cnt_hand[simplify(lastile)]--;
                tiles.pop();
                if (calcTingpai(seat, true).length === 1) // 严格独听
                    ans.fans.push({ val: 1, id: 8078 }); // 边张
                tiles.push(lastile);
                cnt_hand[simplify(lastile)]++;
            }
            let kanzhang = cnt_hand[parseInt(simplify(lastile)) - 1 + lastile[1]] >= 1 && cnt_hand[parseInt(simplify(lastile)) + 1 + lastile[1]] >= 1;
            if (kanzhang && !bianzhang && !isBanned(8079)) {
                cnt_hand[simplify(lastile)]--;
                tiles.pop();
                if (calcTingpai(seat, true).length === 1) // 严格独听
                    ans.fans.push({ val: 1, id: 8079 }); // 坎张
                tiles.push(lastile);
                cnt_hand[simplify(lastile)]++;
            }
            let dandiaojiang = true;
            if (type_cnt[simplify(lastile)][7] !== 1)
                dandiaojiang = false;
            if (dandiaojiang && !kanzhang && !bianzhang && !isBanned(8080)) {
                cnt_hand[simplify(lastile)]--;
                tiles.pop();
                if (calcTingpai(seat, true).length === 1) // 严格独听
                    ans.fans.push({ val: 1, id: 8080 }); // 单钓将
                tiles.push(lastile);
                cnt_hand[simplify(lastile)]++;
            }
            if (zimo && !isBanned(8081))
                ans.fans.push({ val: 1, id: 8081 }); // 自摸
            // ---------------------------
            // ---------------------------
            // 无番和
            if (ans.fans.length === 0 && !isBanned(8042))
                ans.fans.push({ val: 8, id: 8042 }); // 无番和
            // ---------------------------
            // ---------------------------
            // ---------------------------
            // 花牌
            const huapai_num = fulu[seat].filter(f => f.type === 4).length;
            if (huapai_num >= 1 && huapai_num <= 8)
                ans.fans.push({ val: huapai_num, id: 8090 + huapai_num });
            else if (huapai_num >= 9)
                ans.fans.push({ val: huapai_num, id: 8099 });
            // ---------------------------
            // ---------------------------
            // ---------------------------
            ans.fu = calcFu(tingpaifu, duizi_num, pinghu, type_cnt, seat, zimo, menqing, fulu_cnt);
            return ans;
        }
        /**
         * 能与特殊牌型(国士, 全不靠)复合番种的计算, 不含全不靠的组合龙因为还会调用 dfs 所以不需要调用该函数
         *
         * 复合番种包括: 天和, 地和, 人和, 妙手回春, 海底捞月, 抢杠和, 和绝张, 自摸
         */
        function specialCalc(ans) {
            let ban_zimo = false;
            if (liqi_info[seat].yifa !== 0 && liqi_info[seat].liqi === 0 && seat === base_info.ju && zimo) {
                ans.fans.push({ val: 8, id: 8083 }); // 天和
                ban_zimo = true;
            }
            let first_tile = true;
            for (let tmp_seat = 0; tmp_seat < base_info.player_cnt; tmp_seat++) {
                if (tmp_seat === base_info.ju)
                    continue;
                if (!(liqi_info[tmp_seat].yifa !== 0 && liqi_info[tmp_seat].liqi === 0))
                    first_tile = false;
            }
            if (first_tile && seat !== base_info.ju && !zimo)
                ans.fans.push({ val: 8, id: 8084 }); // 地和
            // 在立直麻将中人和的基础上添加亲家的下一家没有一发(因为国标没有立直, 所以任何情况下切牌后都没有一发)
            if (liqi_info[seat].yifa !== 0 && liqi_info[seat].liqi === 0 && seat !== base_info.ju && zimo) {
                ans.fans.push({ val: 8, id: 8085 }); // 人和
                ban_zimo = true;
            }
            else if (liqi_info[seat].yifa !== 0 && liqi_info[seat].liqi === 0 && seat !== base_info.ju && !zimo && liqi_info[(base_info.ju + 1) % base_info.player_cnt].yifa === 0)
                ans.fans.push({ val: 8, id: 8085 }); // 人和
            if (paishan.length === 0)
                if (zimo) {
                    ans.fans.push({ val: 8, id: 8043 }); // 妙手回春
                    ban_zimo = true;
                }
                else
                    ans.fans.push({ val: 8, id: 8044 }); // 海底捞月
            if (getLstAction().name === 'RecordAnGangAddGang')
                ans.fans.push({ val: 8, id: 8046 }); // 抢杠和
            else {
                let lastile_num = 0;
                for (let tmp_seat = 0; tmp_seat < base_info.player_cnt; tmp_seat++) {
                    for (const tile of paihe[tmp_seat].tiles) // 查牌河, 注意被鸣走的牌还在 paihe 中
                        if (isEqualTile(lastile, tile))
                            lastile_num++;
                    for (const f of fulu[tmp_seat]) // 查副露
                        if (f.from !== undefined)
                            for (let k = 0; k < f.tile.length - 1; k++) // -1 是要剔除掉被鸣走的牌
                                if (isEqualTile(lastile, f.tile[k]))
                                    lastile_num++;
                }
                if (lastile_num === 4 || lastile_num === 3 && zimo)
                    ans.fans.push({ val: 4, id: 8057 }); // 和绝张
            }
            if (zimo && !ban_zimo)
                ans.fans.push({ val: 1, id: 8081 }); // 自摸
        }
    };
    // 深度优先搜索, 对手牌和副露进行划分, 搜索到尽头划分数量达到5或7时, 开始算番
    const dfs = (tile, partition, cnt, lastile, zimo, updateRet, calc0) => {
        const dfs0 = (tile, partition, cnt) => {
            if (tile === Constants.DFS_END_TILE) {
                if (partition.length === 5 || partition.length === 7)
                    calc(partition.slice(), lastile, zimo, updateRet, calc0);
                return;
            }
            if (cnt[tile] === 0) {
                dfs0(nextTile(tile), partition, cnt);
                return;
            }
            const whatever = [0, 2, 3, 5, 6, 8, 9, 11, 12, 14];
            for (const num of whatever) {
                if (cnt[tile] < num)
                    continue;
                cnt[tile] -= num;
                const cnt0 = cnt[tile];
                if (num % 3 === 2) { // 有对子
                    const kezi_num = (num - 2) / 3;
                    for (let i = 0; i < kezi_num; i++)
                        partition.push({ type: 6, tile: [tile, tile, tile] });
                    partition.push({ type: 7, tile: [tile, tile] });
                    dfs0(tile, partition, cnt);
                }
                else if (num % 3 === 0) // 3 的倍数, 全是当成刻子
                    for (let i = 0; i < num / 3; i++)
                        partition.push({ type: 6, tile: [tile, tile, tile] });
                if (cnt[Constants.NXT2[tile]] >= cnt0 && cnt[Constants.NXT2[Constants.NXT2[tile]]] >= cnt0) {
                    cnt[tile] -= cnt0;
                    cnt[Constants.NXT2[tile]] -= cnt0;
                    cnt[Constants.NXT2[Constants.NXT2[tile]]] -= cnt0;
                    for (let i = 0; i < cnt0; i++)
                        partition.push({
                            type: 5,
                            tile: [tile, Constants.NXT2[tile], Constants.NXT2[Constants.NXT2[tile]]],
                        });
                    dfs0(nextTile(tile), partition, cnt);
                    cnt[tile] += cnt0;
                    cnt[Constants.NXT2[tile]] += cnt0;
                    cnt[Constants.NXT2[Constants.NXT2[tile]]] += cnt0;
                    for (let i = 0; i < cnt0; i++)
                        partition.pop();
                }
                for (let i = 0; i < Math.floor((num + 1) / 3); i++)
                    partition.pop();
                cnt[tile] += num;
            }
        };
        dfs0(tile, partition, cnt);
    };
    // 根据 lastile 的情况, 确定听牌符并调用 calc0 开始算番
    const calc = (partition_tmp, lastile, zimo, updateRet, calc0) => {
        for (const p of partition_tmp) {
            const p_tiles = p.tile, type = p.type;
            if (type === 5 && (isEqualTile(p_tiles[0], lastile) || isEqualTile(p_tiles[1], lastile) || isEqualTile(p_tiles[2], lastile))) {
                if (!zimo)
                    p.type = 0;
                const mid_tile = shunziMidTile(p_tiles);
                if (isEqualTile(mid_tile, lastile))
                    updateRet(calc0(2, partition_tmp)); // 坎张听符
                else if (parseInt(simplify(lastile)) === 3 && parseInt(mid_tile) === 2)
                    updateRet(calc0(2, partition_tmp)); // 边张听符
                else if (parseInt(simplify(lastile)) === 7 && parseInt(mid_tile) === 8)
                    updateRet(calc0(2, partition_tmp)); // 边张听符
                else
                    updateRet(calc0(0, partition_tmp));
                p.type = 5;
            }
            if (type === 6 && isEqualTile(p_tiles[0], lastile)) {
                if (!zimo)
                    p.type = 1;
                updateRet(calc0(0, partition_tmp));
                p.type = 6;
            }
            if (type === 7 && isEqualTile(p_tiles[0], lastile))
                updateRet(calc0(2, partition_tmp)); // 单骑符
            if (type === 8)
                updateRet(calc0(0, partition_tmp)); // 组合龙
        }
    };
    // 计算牌的符数, 在川麻和国标模式中仍会调用, 但没什么用
    const calcFu = (tingpaifu, duizi_num, pinghu, type_cnt, seat, zimo, menqing, fulu_cnt) => {
        if (duizi_num === 7) // 七对子固定符数
            return 25;
        let fu = 20; // 符底
        if (!pinghu)
            fu += tingpaifu; // 听牌型符
        for (const tile of Constants.TILE_NO_AKA) {
            // 刻子符(幺九/中张, 明刻明杠, 暗杠暗刻)
            if (judgeTile(tile, 'Y')) {
                fu += type_cnt[tile][1] * 4;
                fu += type_cnt[tile][2] * 16;
                fu += type_cnt[tile][3] * 32;
                fu += type_cnt[tile][6] * 8;
            }
            else {
                fu += type_cnt[tile][1] * 2;
                fu += type_cnt[tile][2] * 8;
                fu += type_cnt[tile][3] * 16;
                fu += type_cnt[tile][6] * 4;
            }
            if (type_cnt[tile][7] === 1) {
                // 雀头符, 雀头是自风, 场风, 三元
                if (no_lianfengsifu()) {
                    if (tile === ((seat - base_info.ju + base_info.player_cnt) % base_info.player_cnt + 1 + 'z') || tile === base_info.chang + 1 + 'z')
                        fu += 2;
                }
                else {
                    if (tile === ((seat - base_info.ju + base_info.player_cnt) % base_info.player_cnt + 1 + 'z'))
                        fu += 2;
                    if (tile === base_info.chang + 1 + 'z')
                        fu += 2;
                }
                if (tile[1] === 'z' && parseInt(tile) >= 5 && parseInt(tile) <= 7)
                    fu += 2;
            }
        }
        if (zimo && !pinghu)
            fu += 2; // 自摸符
        if (!zimo && menqing)
            fu += 10; // 门前清荣和符
        fu = Math.ceil(fu / 10) * 10;
        if (fulu_cnt !== 0 && fu === 20)
            fu = 30;
        return fu;
    };
    /**
     * 按照排序返回 tile 的下一张牌, 忽略红宝牌
     */
    const nextTile = (tile) => {
        tile = simplify(tile);
        if (tile === '7z')
            return Constants.DFS_END_TILE;
        const group = ['m', 'p', 's', 'z'];
        const cur_index = group.indexOf(tile[1]);
        if (tile[0] === '9')
            return '1' + group[cur_index + 1];
        return (parseInt(tile) + 1) + tile[1];
    };
    /**
     * 给定牌顺子给出中间的牌
     */
    const shunziMidTile = (tiles) => {
        if (tiles.length !== 3)
            throw new Error(errRoundInfo() + `shunziMidTile: 输入牌数量不为3: ${tiles}`);
        const nums = [];
        for (const tile of tiles)
            nums.push(parseInt(simplify(tile)[0]));
        nums.sort((a, b) => a - b);
        return nums[1] + tiles[0][1];
    };

    /**
     * @file: huleOnePlayer.ts - 核心文件, 计算某位玩家的和牌导致的各家点数变动, 分为立直, 川麻, 国标三个部分
     * @author: GrandDawn, Fat-pig-Cui
     * @email: chubbypig@qq.com
     * @github: https://github.com/Fat-pig-Cui/majsoul-replay-editor
     */
    /**
     * huleOnePlayer 组 - 立直
     *
     * 计算 seat 号玩家的和牌导致的各家点数变动
     */
    const huleOnePlayer = (seat) => {
        const { lst_action, lst_name, zimo, fangchong_seat, hand, hu_tile } = dataInit(seat);
        // -------------------------------------------
        if (is_hunzhiyiji() && !zimo && hunzhiyiji_info[fangchong_seat].liqi !== 0)
            hunzhiyiji_info[fangchong_seat].overload = true;
        const points = calcFan(seat, zimo, fangchong_seat);
        const sudian = calcSudian(points);
        const val = points.yiman && no_composite_yakuman() ? Math.max(...points.fans.map(fan => fan.val)) :
            points.fans.reduce((sum, fan) => sum + fan.val, 0);
        const delta_scores_backup = delta_scores.slice();
        const qinjia = seat === base_info.ju;
        const title_id = judgeTitleId();
        // -------------------------------------------
        const tianming_bonus = is_tianming() ? calcTianming(seat, zimo) : 1;
        const xia_ke_shang_coefficient = calcXiaKeShang()[seat];
        const extra_times = tianming_bonus * xia_ke_shang_coefficient;
        const doras0 = calcDoras();
        const li_doras0 = liqi_info[seat].liqi !== 0 ? dora_indicator[1].slice(0, dora_cnt.li_cnt) : [];
        // -------------------------------------------
        if (judgeZhahu()) {
            if (seat === base_info.ju)
                base_info.lianzhuang_cnt = -1; // 诈和会导致连庄数重置, 而在 hupai 中会加1, 所以这里是 -1
            const [point_rong, point_sum, point_zimo_qin, point_zimo_xian] = calcPoint(Constants.ZHAHU_SUDIAN);
            for (let tmp_seat = 0; tmp_seat < base_info.player_cnt; tmp_seat++) {
                if (tmp_seat === seat || huled[tmp_seat])
                    continue;
                if (tmp_seat === base_info.ju || seat === base_info.ju)
                    movePoint(point_zimo_qin * muyu.times[tmp_seat] * muyu.times[seat], tmp_seat, seat);
                else
                    movePoint(point_zimo_xian * muyu.times[tmp_seat] * muyu.times[seat], tmp_seat, seat);
            }
            player_tiles[seat].pop();
            console.log(errRoundInfo() + `seat: ${seat} 诈和`);
            return {
                count: 0,
                doras: doras0,
                li_doras: li_doras0,
                fans: [{ val: 0, id: 9000 }],
                fu: 0,
                hand: hand,
                hu_tile: hu_tile,
                liqi: liqi_info[seat].liqi !== 0,
                ming: fulu2Ming(seat),
                point_rong: -point_rong,
                point_sum: -point_sum,
                point_zimo_qin: -point_zimo_qin,
                point_zimo_xian: -point_zimo_xian,
                qinjia: qinjia,
                seat: seat,
                title_id: 1,
                yiman: false,
                zimo: zimo,
                dadian: is_xuezhandaodi() || is_wanxiangxiuluo() || base_info.player_cnt === 2 ? -delta_scores[seat] : undefined,
            };
        }
        const [point_rong, point_sum, point_zimo_qin, point_zimo_xian] = calcPoint(sudian);
        let delta_point = 0;
        // 有包牌
        if (baopai[seat].length > 0) {
            const yiman_sudian = Constants.YIMAN_SUDIAN;
            const all_bao_val = baopai[seat].reduce((sum, bao) => sum + bao.val, 0);
            const [feibao_rong, , feibao_zimo_qin, feibao_zimo_xian] = calcPoint((val - all_bao_val) * yiman_sudian);
            if (zimo) {
                // 包牌部分, 包牌家全包
                for (const bao of baopai[seat]) {
                    for (let tmp_seat = 0; tmp_seat < base_info.player_cnt; tmp_seat++) {
                        if (tmp_seat === seat || huled[tmp_seat])
                            continue;
                        if (tmp_seat === base_info.ju || seat === base_info.ju)
                            delta_point = bao.val * 2 * yiman_sudian * muyu.times[tmp_seat] * muyu.times[seat] * extra_times;
                        else
                            delta_point = bao.val * yiman_sudian * muyu.times[tmp_seat] * muyu.times[seat] * extra_times;
                        movePoint(delta_point, bao.seat, seat);
                    }
                }
                // 非包牌部分: 没有包杠, 则是一般自摸; 存在包杠, 则包杠全包
                for (let tmp_seat = 0; tmp_seat < base_info.player_cnt; tmp_seat++) {
                    if (tmp_seat === seat || huled[tmp_seat])
                        continue;
                    if (tmp_seat === base_info.ju || seat === base_info.ju)
                        delta_point = feibao_zimo_qin * muyu.times[tmp_seat] * muyu.times[seat];
                    else
                        delta_point = feibao_zimo_xian * muyu.times[tmp_seat] * muyu.times[seat];
                    const equal_seat = base_info.baogang_seat !== -1 && !huled[base_info.baogang_seat] ?
                        base_info.baogang_seat : tmp_seat;
                    movePoint(delta_point, equal_seat, seat);
                }
            }
            else { // 放铳
                // 包牌部分
                for (const bao of baopai[seat]) {
                    delta_point = bao.val * 2 * yiman_sudian * muyu.times[fangchong_seat] * muyu.times[seat] * extra_times;
                    if (qinjia)
                        delta_point *= 1.5;
                    movePoint(delta_point, bao.seat, seat);
                }
                // 非包牌部分: 非包牌部分 + 包牌部分/2 => 非包牌部分 + (全部 - 非包牌部分)/2 => (全部 + 非包牌部分)/2
                delta_point = (point_rong + feibao_rong) / 2 * muyu.times[fangchong_seat] * muyu.times[seat];
                movePoint(delta_point, fangchong_seat, seat);
            }
        }
        // 一般情况
        else {
            if (zimo) {
                for (let tmp_seat = 0; tmp_seat < base_info.player_cnt; tmp_seat++) {
                    if (tmp_seat === seat || huled[tmp_seat])
                        continue;
                    if (tmp_seat === base_info.ju || seat === base_info.ju)
                        delta_point = point_zimo_qin * muyu.times[tmp_seat] * muyu.times[seat];
                    else
                        delta_point = point_zimo_xian * muyu.times[tmp_seat] * muyu.times[seat];
                    // 若有包杠, 自摸全由包杠家负担, 否则各家承担各自的
                    const equal_seat = base_info.baogang_seat !== -1 && !huled[base_info.baogang_seat] ?
                        base_info.baogang_seat : tmp_seat;
                    movePoint(delta_point, equal_seat, seat);
                }
            }
            else {
                delta_point = point_rong * muyu.times[fangchong_seat] * muyu.times[seat];
                movePoint(delta_point, fangchong_seat, seat);
            }
        }
        const dadian = Math.max(delta_scores[seat], -delta_scores[seat]);
        // 幻境传说: 命运卡3
        if (get_field_spell_mode(3) === 3 && liqi_info[seat].liqi !== 0) {
            const diff = 300 * spell_hourglass[seat];
            const win_point = delta_scores[seat] - delta_scores_backup[seat];
            if (win_point < diff)
                for (let tmp_seat = 0; tmp_seat < base_info.player_cnt; tmp_seat++)
                    delta_scores[tmp_seat] = delta_scores_backup[tmp_seat];
            else {
                delta_scores[seat] -= diff;
                if (zimo)
                    for (let tmp_seat = 0; tmp_seat < base_info.player_cnt; tmp_seat++) {
                        if (tmp_seat === seat)
                            continue;
                        delta_scores[tmp_seat] += diff / 3;
                    }
                else
                    delta_scores[fangchong_seat] += diff;
            }
        }
        // 幻境传说: 庄家卡5
        if (get_field_spell_mode(1) === 5 && seat === base_info.ju && !zimo)
            movePoint(points.dora_bonus * 1000, fangchong_seat, seat);
        calcChangGong();
        player_tiles[seat].pop();
        return {
            count: val,
            doras: doras0,
            li_doras: li_doras0,
            fans: points.fans,
            fu: points.fu,
            hand: hand,
            hu_tile: hu_tile,
            liqi: liqi_info[seat].liqi !== 0,
            ming: fulu2Ming(seat),
            point_rong: point_rong,
            point_sum: point_sum,
            point_zimo_qin: point_zimo_qin,
            point_zimo_xian: point_zimo_xian,
            qinjia: qinjia,
            seat: seat,
            title_id: title_id,
            yiman: points.yiman,
            zimo: zimo,
            baopai_seats: baopai[seat].map(bao => bao.seat),
            tianming_bonus: is_tianming() ? tianming_bonus : undefined,
            xia_ke_shang_coefficient: is_xiakeshang() ? xia_ke_shang_coefficient : undefined,
            dadian: is_xuezhandaodi() || is_wanxiangxiuluo() || base_info.player_cnt === 2 ? dadian : undefined,
        };
        // 判断是否为诈和
        function judgeZhahu() {
            if ((calcHupai(player_tiles[seat]) !== 3 || no_guoshiangang()) && lst_name === 'RecordAnGangAddGang' && lst_action.data.type === 3)
                return true;
            if (lst_name === 'RecordRevealTile' || lst_name === 'RecordLockTile' && lst_action.data.lock_state !== 0)
                return true;
            return sudian === Constants.ZHAHU_SUDIAN || !zimo && zhenting.result[seat];
        }
        // 判断 title_id
        function judgeTitleId() {
            let title_id = 0;
            if (!is_qingtianjing()) {
                if (points.yiman)
                    title_id = (!no_composite_yakuman() ? val : Math.max(...points.fans.map(fan => fan.val))) + 4;
                else if (sudian === 8000)
                    title_id = 11;
                else if (sudian === 6000)
                    title_id = 4;
                else if (sudian === 4000)
                    title_id = 3;
                else if (sudian === 3000)
                    title_id = 2;
                else if (sudian === 2000)
                    title_id = 1;
            }
            return title_id;
        }
        /**
         * 通过素点计算 荣和, 自摸总计, 自摸收亲, 自摸收闲 的点数
         * @param c_sudian - 素点
         * @returns [荣和, 自摸总计, 自摸收亲, 自摸收闲]
         */
        function calcPoint(c_sudian) {
            // 点数切上到整百
            const qieshang = (point) => Math.ceil(point / 100) * 100;
            let rong, sum, zimo_qin, zimo_xian;
            if (qinjia) {
                rong = 6 * c_sudian;
                sum = 6 * c_sudian;
                zimo_qin = 2 * c_sudian;
                zimo_xian = 2 * c_sudian;
                if (no_zimosun())
                    zimo_xian = 6 / (base_info.player_cnt - 1) * c_sudian;
                else
                    sum = 2 * (base_info.player_cnt - 1) * c_sudian;
            }
            else {
                rong = 4 * c_sudian;
                sum = 4 * c_sudian;
                zimo_qin = 2 * c_sudian;
                zimo_xian = c_sudian;
                if (no_zimosun()) {
                    zimo_qin = (base_info.player_cnt + 2) / (base_info.player_cnt - 1) * c_sudian;
                    zimo_xian = 3 / (base_info.player_cnt - 1) * c_sudian;
                }
                else
                    sum = base_info.player_cnt * c_sudian;
            }
            const ret = [rong, sum, zimo_qin, zimo_xian];
            for (const i of ret.keys())
                ret[i] = qieshang(ret[i]) * extra_times;
            return ret;
        }
        // 计算本场供托划分
        function calcChangGong() {
            let equal_seat = fangchong_seat; // 等效放铳 seat
            let baopai_same_seat = true; // true 表示当前的和牌只有一种包牌, 或只有一家包牌
            let all_baopai = true; // 包牌家是否只有一家
            if (baopai[seat].length > 0) { // 有包牌
                let all_bao_val = 0;
                for (const bao of baopai[seat]) {
                    all_bao_val += bao.val;
                    if (baopai[seat][0].seat !== bao.seat)
                        baopai_same_seat = false;
                }
                all_baopai = val === all_bao_val;
            }
            // 存在包杠, 则包杠家支付全部本场, 相当于包杠家放铳
            if (base_info.baogang_seat !== -1 && zimo && !huled[base_info.baogang_seat])
                equal_seat = base_info.baogang_seat;
            // 自摸情况下全是包牌, 且包牌家只有一家, 则那个包牌家支付全部本场
            else if (baopai[seat].length > 0 && zimo && all_baopai && baopai_same_seat)
                equal_seat = baopai[seat][0].seat;
            let delta_point;
            if (equal_seat !== undefined) {
                delta_point = (base_info.player_cnt - 1) * 100 * base_info.benchangbang * get_ben_times();
                movePoint(delta_point, equal_seat, seat);
            }
            else {
                delta_point = 100 * base_info.benchangbang * get_ben_times();
                for (let tmp_seat = 0; tmp_seat < base_info.player_cnt; tmp_seat++) {
                    if (tmp_seat === seat || huled[tmp_seat])
                        continue;
                    movePoint(delta_point, tmp_seat, seat);
                }
            }
            base_info.benchangbang = 0;
            // 供托
            delta_scores[seat] += base_info.liqibang * 1000;
            base_info.liqibang = 0;
        }
    };
    /**
     * huleOnePlayer 组 - 川麻
     *
     * 计算 seat 号玩家的和牌导致的各家点数变动
     */
    const huleOnePlayerChuanma = (seat) => {
        const { lst_action, lst_name, zimo, fangchong_seat, hand, hu_tile } = dataInit(seat);
        // -------------------------------------------
        const points = calcFanChuanma(seat, zimo);
        const sudian = calcSudianChuanma(points);
        const val = points.fans.reduce((sum, fan) => sum + fan.val, 0);
        // -------------------------------------------
        const zhahu = calcHupai(player_tiles[seat]) === 0 || isHuazhu(seat) || lst_name === 'RecordAnGangAddGang' && lst_action.data.type === 3;
        if (zhahu) {
            for (let tmp_seat = 0; tmp_seat < base_info.player_cnt; tmp_seat++) {
                if (tmp_seat === seat || huled[tmp_seat])
                    continue;
                movePoint(Constants.ZHAHU_SUDIAN_CHUANMA - 1000, tmp_seat, seat);
            }
            player_tiles[seat].pop();
            console.log(errRoundInfo() + `seat: ${seat} 玩家诈和`);
            return {
                seat: seat,
                hand: hand,
                ming: fulu2Ming(seat),
                hu_tile: hu_tile,
                zimo: zimo,
                yiman: false,
                count: 0,
                fans: [{ val: 0, id: 9000 }],
                fu: 0,
                title_id: 0,
                dadian: -delta_scores[seat],
                liqi: false,
                qinjia: false,
                doras: [],
                li_doras: [],
            };
        }
        if (zimo)
            for (let tmp_seat = 0; tmp_seat < base_info.player_cnt; tmp_seat++) {
                if (tmp_seat === seat || huled[tmp_seat])
                    continue;
                movePoint(sudian + 1000, tmp_seat, seat);
            }
        else
            movePoint(sudian, fangchong_seat, seat);
        const dadian = Math.max(delta_scores[seat], -delta_scores[seat]);
        player_tiles[seat].pop();
        return {
            seat: seat,
            hand: hand,
            ming: fulu2Ming(seat),
            hu_tile: hu_tile,
            zimo: zimo,
            yiman: false,
            count: val,
            fans: points.fans,
            fu: points.fu,
            title_id: 0,
            dadian: dadian,
            liqi: false,
            qinjia: false,
            doras: [],
            li_doras: [],
        };
    };
    /**
     * huleOnePlayer 组 - 国标
     *
     * 计算 seat 号玩家的和牌导致的各家点数变动
     */
    const huleOnePlayerGuobiao = (seat) => {
        const { lst_action, lst_name, zimo, fangchong_seat, hand, hu_tile } = dataInit(seat);
        // -------------------------------------------
        const points = calcFanGuobiao(seat, zimo);
        const sudian = calcSudianGuobiao(points), sudian_no_huapai = calcSudianGuobiao(points, true);
        const val = points.fans.reduce((sum, fan) => sum + fan.val, 0);
        // -------------------------------------------
        const { zhahu, is_cuohu } = judgeZhahuCuohu();
        if (zhahu || is_cuohu) { // 诈和, 错和赔三家各 cuohu_points() * scale_points() 点
            for (let tmp_seat = 0; tmp_seat < base_info.player_cnt; tmp_seat++) {
                if (tmp_seat === seat)
                    continue;
                movePoint(-cuohu_points() * scale_points(), tmp_seat, seat);
            }
            if (!zimo)
                player_tiles[seat].pop();
            console.log(errRoundInfo() + `seat: ${seat} 诈和或错和`);
            return {
                count: 0,
                doras: [],
                li_doras: [],
                fans: zhahu ? [{ val: 0, id: 9000 }] : points.fans,
                fu: 0,
                hand: hand,
                hu_tile: hu_tile,
                liqi: false,
                ming: fulu2Ming(seat),
                point_rong: 3 * cuohu_points() * scale_points(),
                point_sum: 3 * cuohu_points() * scale_points(),
                point_zimo_qin: cuohu_points() * scale_points(),
                point_zimo_xian: cuohu_points() * scale_points(),
                qinjia: false,
                seat: seat,
                title_id: 0,
                yiman: false,
                zimo: zimo,
                cuohu: true,
            };
        }
        if (zimo) {
            for (let tmp_seat = 0; tmp_seat < base_info.player_cnt; tmp_seat++) {
                if (tmp_seat === seat)
                    continue;
                movePoint(sudian + Constants.GB_BASE_FAN * scale_points(), tmp_seat, seat);
            }
        }
        else {
            movePoint(sudian, fangchong_seat, seat);
            for (let tmp_seat = 0; tmp_seat < base_info.player_cnt; tmp_seat++) {
                if (tmp_seat === seat)
                    continue;
                movePoint(Constants.GB_BASE_FAN * scale_points(), tmp_seat, seat);
            }
        }
        player_tiles[seat].pop();
        return {
            count: val,
            doras: [],
            li_doras: [],
            fans: points.fans,
            fu: points.fu,
            hand: hand,
            hu_tile: hu_tile,
            liqi: false,
            ming: fulu2Ming(seat),
            point_rong: sudian + 3 * Constants.GB_BASE_FAN * scale_points(),
            point_sum: 3 * (sudian + Constants.GB_BASE_FAN * scale_points()),
            point_zimo_qin: sudian + Constants.GB_BASE_FAN * scale_points(),
            point_zimo_xian: sudian + Constants.GB_BASE_FAN * scale_points(),
            qinjia: false,
            seat: seat,
            title_id: 0,
            yiman: false,
            zimo: zimo,
            cuohu: false,
        };
        // 判断是否为诈和或错和
        function judgeZhahuCuohu() {
            let zhahu = false, is_cuohu = false;
            if (calcHupai(player_tiles[seat]) === 0)
                zhahu = true;
            // 国标无法听花牌, 所以和拔的花牌一定是诈和
            if (lst_name === 'RecordBaBei' || lst_name === 'RecordAnGangAddGang' && lst_action.data.type === 3)
                zhahu = true;
            if (!is_guobiao_no_8fanfu() && sudian_no_huapai < Constants.GB_BASE_FAN * scale_points())
                is_cuohu = true;
            if (cuohu[seat]) // 已错和的玩家再次和牌, 仍然是错和
                is_cuohu = true;
            return { zhahu, is_cuohu };
        }
    };
    // 初始化部分数据
    const dataInit = (seat) => {
        const lst_action = getLstAction(), lst_name = getLstAction().name;
        const zimo = ['RecordNewRound', 'RecordDealTile'].includes(lst_name);
        if (!zimo)
            push2PlayerTiles(seat);
        const fangchong_seat = !zimo ? lst_action.data.seat : undefined;
        const hand = player_tiles[seat].slice();
        const hu_tile = hand.pop();
        return { lst_action, lst_name, zimo, fangchong_seat, hand, hu_tile };
    };
    // 在 delta_scores 中, from 号玩家交给 to 号玩家 point 点数
    const movePoint = (point, from, to) => {
        delta_scores[from] -= point;
        delta_scores[to] += point;
    };

    /**
     * @file: activityFunction.ts - 活动场相关函数
     * @author: GrandDawn, Fat-pig-Cui
     * @email: chubbypig@qq.com
     * @github: https://github.com/Fat-pig-Cui/majsoul-replay-editor
     */
    /**
     * 龙之目玉: 设置拥有目玉的玩家队列
     */
    const setMuyuSeats = (muyu_seats) => {
        muyu.seats = muyu_seats;
    };
    /**
     * 换三张换牌(修罗/川麻)
     * @param tls - 四名玩家交出去的牌
     * @param type - 换牌方式, 0: 逆时针, 1: 对家, 2: 顺时针
     */
    const huanpai = (tls, type) => {
        if (tls.length !== 4)
            throw new Error(errRoundInfo() + `huanpai: 第一个参数长度不为4, 要换三张换牌必须指定4名玩家交出去的牌, 玩家数也必须为4, tls: ${tls}`);
        const tiles = [separate(tls[0]), separate(tls[1]), separate(tls[2]), separate(tls[3])];
        if (tiles.some(swap_tiles => swap_tiles.length !== 3))
            console.error(errRoundInfo() + `huanpai: 换牌的牌数必须为3, 但有玩家的牌数不为3, tls: ${tls}`);
        const ret = [null, null, null, null];
        for (let seat = 0; seat < base_info.player_cnt; seat++) {
            for (const tile of tiles[seat]) {
                const index = player_tiles[seat].indexOf(tile);
                if (index === -1)
                    console.error(errRoundInfo() + `huanpai: seat: ${seat} 没有 ${tile} 这张牌`);
                player_tiles[seat].splice(index, 1);
            }
            const in_seat = (seat - type + 3) % base_info.player_cnt;
            for (const tile of tiles[in_seat])
                player_tiles[seat].push(tile);
            player_tiles[seat].sort(cmp);
            ret[seat] = {
                out_tiles: tiles[seat],
                out_tile_states: [0, 0, 0],
                in_tiles: tiles[in_seat],
                in_tile_states: [0, 0, 0],
            };
        }
        addChangeTile(ret, type);
    };
    /**
     * 定缺(川麻)
     * @example
     * // seat 从0-3的定缺花色分别为"索,万,饼,索"
     * dingque('smps')
     * @param x - 四位玩家的定缺
     */
    const dingque = (x) => {
        const all_dingque = x.split('');
        const dict = { 'm': 1, 'p': 0, 's': 2 }; // 注意 012 分别对应 pms, 而不是 mps
        const ret = [0, 0, 0, 0];
        for (let seat = 0; seat < base_info.player_cnt; seat++) {
            ret[seat] = dict[all_dingque[seat]];
            gaps[seat] = ret[seat];
        }
        addSelectGap(ret);
    };
    /**
     * seat 号玩家开牌并成功(暗夜之战)
     */
    const kaipai = (seat) => {
        if (!isValidSeat(seat))
            throw new Error(errRoundInfo() + `kaipai: 暗夜之战开牌必须指定玩家, seat: ${seat}`);
        if (getLstAction().name === 'RecordRevealTile') {
            const tile_seat = getLstAction().data.seat;
            const tile = getLstAction().data.tile;
            scores[seat] -= 2000;
            base_info.liqibang += 2;
            addUnveilTile(seat);
            addLockTile(tile_seat, 0, tile);
            if (!Constants.YAOJIU_TILE.includes(tile))
                paihe[tile_seat].liujumanguan = false;
        }
        else
            throw new Error(errRoundInfo() + `kaipai: 暗夜之战开牌的前提是有人刚暗牌, getLstAction().name: ${getLstAction().name}`);
    };
    /**
     * seat 号玩家开牌后锁定(暗夜之战)
     */
    const kaipaiLock = (seat) => {
        if (!isValidSeat(seat))
            throw new Error(errRoundInfo() + `kaipaiLock: 暗夜之战开牌必须指定玩家, seat: ${seat}`);
        if (getLstAction().name === 'RecordRevealTile') {
            const tile_seat = getLstAction().data.seat;
            scores[seat] -= 2000;
            base_info.liqibang += 2;
            addUnveilTile(seat);
            scores[tile_seat] -= 4000;
            base_info.liqibang += 4;
            addLockTile(tile_seat, 1);
        }
        else
            throw new Error(errRoundInfo() + `kaipaiLock: 暗夜之战开牌的前提是有人刚暗牌, getLstAction().name: ${getLstAction().name}`);
    };
    /**
     * 川麻刮风下雨
     * @param type - 是否完场, 默认不完场
     */
    const calcGangPoint = (type = false) => {
        if (!chuanma_gangs.not_over)
            return;
        chuanma_gangs.over.push(chuanma_gangs.not_over);
        delta_scores[chuanma_gangs.not_over.from] -= chuanma_gangs.not_over.val;
        delta_scores[chuanma_gangs.not_over.to] += chuanma_gangs.not_over.val;
        chuanma_gangs.not_over = null;
        const old_scores = scores.slice();
        for (let seat = 0; seat < base_info.player_cnt; seat++)
            scores[seat] += delta_scores[seat];
        if (!type)
            addGangResult(old_scores);
        else
            addGangResultEnd(old_scores);
        for (let seat = 0; seat < base_info.player_cnt; seat++)
            delta_scores[seat] = 0;
    };

    /**
     * @file: override.ts - 重写游戏函数以实现编辑功能, 以及部分强化功能
     * @author: Fat-pig-Cui
     * @email: chubbypig@qq.com
     * @github: https://github.com/Fat-pig-Cui/majsoul-replay-editor
     */
    const overrideStore = {
        backedUp: false,
        originals: {},
    };
    const backupOriginalsOnce = () => {
        if (overrideStore.backedUp)
            return;
        // 只备份“注入当下”能拿到的原函数引用；后续 export var 也以它为准
        overrideStore.originals.checkPaiPu = GameMgr.Inst.checkPaiPu;
        overrideStore.originals.resetData = uiscript.UI_Replay.prototype.resetData;
        overrideStore.originals.OnChoosedPai = view.ViewPai.prototype.OnChoosedPai;
        overrideStore.originals.seat2LocalPosition = view.DesktopMgr.prototype.seat2LocalPosition;
        overrideStore.originals.localPosition2Seat = view.DesktopMgr.prototype.localPosition2Seat;
        overrideStore.backedUp = true;
    };
    /**
     * 复原以查看真实牌谱
     */
    const resetReplay = () => {
        backupOriginalsOnce();
        if (overrideStore.originals.checkPaiPu)
            GameMgr.Inst.checkPaiPu = overrideStore.originals.checkPaiPu;
        if (overrideStore.originals.resetData)
            uiscript.UI_Replay.prototype.resetData = overrideStore.originals.resetData;
    };
    // 使补充和优化函数只执行一次的控制变量
    let inst_once_chkP = true;
    // 在线编辑(进入牌谱之后的修改, 包括切换视角和切换巡目, 只在 editOffline 中的 resetData 中调用)
    const editOnline = () => {
        const rounds = [];
        for (const actions of all_data.all_actions)
            rounds.push({ actions: actions, xun: all_data.xun[rounds.length][view.DesktopMgr.Inst.seat] });
        uiscript.UI_Replay.Inst.rounds = rounds;
        uiscript.UI_Replay.Inst.gameResult.result.players = all_data.players;
    };
    // 离线编辑(进入牌谱之前的修改, 只在 gameEnd 中调用)
    const editOffline = () => {
        // 修改玩家信息
        const editPlayerDatas = () => {
            const ret = [null, null];
            // 建议玩家随机的装扮: 立直棒(0), 和牌特效(1), 立直特效(2), 头像框(5), 桌布(6), 牌背(7), 称号(11), 牌面(13)
            const slots = [0, 1, 2, 5, 6, 7, 11, 13];
            for (let seat = 0; seat < base_info.player_cnt; seat++) {
                ret[seat] = {
                    account_id: 100000 + seat, // 账号唯一id, 这里没什么用随便设的
                    seat: seat, // 座次
                    nickname: player_datas[seat].nickname, // 昵称
                    avatar_id: player_datas[seat].avatar_id, // 头像id
                    character: {
                        charid: cfg.item_definition.skin.map_[player_datas[seat].avatar_id].character_id, // 角色id
                        level: 5, // 角色好感等级, 即好感几颗心
                        exp: 0, // 好感经验, 契约之后值是0
                        skin: player_datas[seat].avatar_id, // 皮肤, 和 avatar_id 一样
                        is_upgraded: true, // 是否已契约
                        extra_emoji: [10, 11, 12], // 额外表情, 除了初始的九个外其他都是额外表情, 包括契约后的三个
                    },
                    title: player_datas[seat].title, // 称号
                    level: { id: 10503, score: 4500 }, // 四麻段位分, 这里是圣三原点, 下同
                    level3: { id: 20503, score: 4500 }, // 三麻段位分
                    avatar_frame: player_datas[seat].avatar_frame, // 头像框
                    verified: player_datas[seat].verified, // 是否已认证, 0: 未认证, 1: 主播(猫爪)认证, 2: 职业(P标)认证
                    views: player_datas[seat].views, // 装扮槽
                };
                if (is_random_skin()) {
                    const skin_len = cfg.item_definition.skin.rows_.length;
                    let skin_id = cfg.item_definition.skin.rows_[Math.floor(Math.random() * skin_len)].id;
                    while (skin_id === 400000 || skin_id === 400001)
                        skin_id = cfg.item_definition.skin.rows_[Math.floor(Math.random() * skin_len)].id;
                    ret[seat].avatar_id = ret[seat].character.skin = skin_id;
                    ret[seat].character.charid = cfg.item_definition.skin.map_[skin_id].character_id;
                }
                if (is_random_views())
                    for (const slot of slots) {
                        const item_id = views_pool[slot][Math.floor(Math.random() * views_pool[slot].length)];
                        if (slot === 11) {
                            ret[seat].title = item_id;
                            continue;
                        }
                        if (slot === 5)
                            ret[seat].avatar_frame = item_id;
                        let existed = false;
                        for (const view of ret[seat].views)
                            if (view.slot === slot) {
                                view.item_id = item_id;
                                existed = true;
                                break;
                            }
                        if (!existed)
                            ret[seat].views.push({
                                slot: slot,
                                item_id: item_id,
                            });
                    }
            }
            for (let seat = 0; seat < base_info.player_cnt; seat++)
                player_datas[seat] = ret[seat];
            player_datas.splice(base_info.player_cnt);
        };
        // 备份原函数（只做一次），并同步导出变量
        backupOriginalsOnce();
        // 重写对局信息
        uiscript.UI_Replay.prototype.resetData = function () {
            var _a;
            try {
                // 始终调用“最初备份的原版”，避免导出变量被外部覆盖导致链条断裂
                (_a = overrideStore.originals.resetData) === null || _a === void 0 ? void 0 : _a.call(this);
                editOnline();
            }
            catch (e) {
                console.error(e);
            }
        };
        // 重写查看牌谱函数, 修改房间信息和玩家信息
        GameMgr.Inst.checkPaiPu = function (game_uuid, account_id, paipu_config) {
            try { // 添加下面
                if (all_data.all_actions.length === 0) {
                    console.error('GameMgr.Inst.checkPaiPu: 没有载入自制牌谱, 不可查看, 若要查看真实牌谱, 请输入 resetReplay()');
                    return;
                }
                if (inst_once_chkP) {
                    if (typeof editFunction == 'function')
                        editFunction();
                    updateViews();
                    DIYFans();
                    guobiaoFans();
                    optimizeFunction();
                }
            }
            catch (e) { // 添加上面
                console.error(e);
            }
            const W = this;
            game_uuid = game_uuid.trim();
            app.Log.log('checkPaiPu game_uuid:' + game_uuid + ' account_id:' + account_id.toString() + ' paipu_config:' + paipu_config);
            if (this.duringPaipu)
                app.Log.Error('已经在看牌谱了');
            else {
                this.duringPaipu = true;
                uiscript.UI_Loading.Inst.show(uiscript.ELoadingType.EEnterMJ);
                GameMgr.Inst.onLoadStart('paipu');
                if (paipu_config === 2)
                    game_uuid = game.Tools.DecodePaipuUUID(game_uuid);
                this.record_uuid = game_uuid;
                app.NetAgent.sendReq2Lobby('Lobby', 'fetchGameRecord', {
                    game_uuid: game_uuid,
                    client_version_string: this.getClientVersion()
                }, function (l, n) {
                    if (l || n.error) {
                        uiscript.UIMgr.Inst.showNetReqError('fetchGameRecord', l, n);
                        let y = 0.12;
                        uiscript.UI_Loading.Inst.setProgressVal(y);
                        const f = function () {
                            y += 0.06;
                            uiscript.UI_Loading.Inst.setProgressVal(Math.min(1, y));
                            if (y >= 1.1) {
                                uiscript.UI_Loading.Inst.close();
                                uiscript.UIMgr.Inst.showLobby();
                                Laya.timer.clear(this, f);
                            }
                        };
                        Laya.timer.loop(50, W, f);
                        W.duringPaipu = false;
                    }
                    else {
                        // 添加: 接受的牌谱信息去除 robots
                        n.head.robots = [];
                        // 修改的地方: 本来是 openMJRoom 的第二个参数(单个字母), 现在是 all_data.player_datas
                        // 本来是 openMJRoom 的第一个参数(如 X.config), 现在是 all_data.config
                        // 添加下面
                        editPlayerDatas();
                        try {
                            if (cfg.item_definition.view.get(get_tablecloth_id()) !== undefined)
                                uiscript.UI_Sushe.now_desktop_id = get_tablecloth_id();
                            if (cfg.item_definition.view.get(get_mjp_id()) !== undefined) {
                                uiscript.UI_Sushe.now_mjp_id = get_mjp_id();
                                GameMgr.Inst.mjp_view = cfg.item_definition.view.get(get_mjp_id()).res_name;
                                Laya.loader.load(`${game.LoadMgr.getAtlasRoot()}myres2/mjp/${GameMgr.Inst.mjp_view}/hand.atlas`);
                            }
                            if (cfg.item_definition.view.get(get_mjpsurface_id()) !== undefined) {
                                uiscript.UI_Sushe.now_mjp_surface_id = get_mjpsurface_id();
                                GameMgr.Inst.mjp_surface_view = cfg.item_definition.view.get(get_mjpsurface_id()).res_name;
                                Laya.loader.load(`${game.LoadMgr.getAtlasRoot()}myres2/mjpm/${GameMgr.Inst.mjp_surface_view}/ui.atlas`);
                            }
                            // 第一场的主视角
                            const tmp_seat = get_mainrole_seat();
                            if (tmp_seat !== -1)
                                account_id = all_data.player_datas[tmp_seat].account_id;
                            else // 第一局的亲家
                                account_id = all_data.player_datas[all_data.all_actions[0][0].data.ju].account_id;
                        }
                        catch (e) { // 添加上面
                            console.error(e);
                        }
                        const C = Laya.Handler.create(W, function (H) {
                            const main_func = function () {
                                game.Scene_Lobby.Inst.active = false;
                                game.Scene_MJ.Inst.openMJRoom(all_data.config, all_data.player_datas, Laya.Handler.create(W, function () {
                                    W.duringPaipu = false;
                                    view.DesktopMgr.Inst.paipu_config = paipu_config;
                                    view.DesktopMgr.Inst.initRoom(JSON.parse(JSON.stringify(all_data.config)), all_data.player_datas, account_id, view.EMJMode.paipu, Laya.Handler.create(W, function () {
                                        // 添加下面
                                        if (typeof editFunction2 == 'function' && inst_once_chkP)
                                            editFunction2();
                                        inst_once_chkP = false;
                                        if (base_info.player_cnt === 2) {
                                            view.DesktopMgr.Inst.rule_mode = view.ERuleMode.Liqi2;
                                            uiscript.UI_DesktopInfo.Inst.refreshSeat();
                                        }
                                        // 添加上面
                                        uiscript.UI_Replay.Inst.initMaka(false, false);
                                        uiscript.UI_Replay.Inst.initData(H);
                                        uiscript.UI_Replay.Inst.enable = true;
                                        Laya.timer.once(1000, W, function () {
                                            W.EnterMJ();
                                        });
                                        Laya.timer.once(1500, W, function () {
                                            view.DesktopMgr.player_link_state = [view.ELink_State.READY, view.ELink_State.READY, view.ELink_State.READY, view.ELink_State.READY];
                                            uiscript.UI_DesktopInfo.Inst.refreshLinks();
                                            uiscript.UI_Loading.Inst.close();
                                        });
                                        Laya.timer.once(1000, W, function () {
                                            uiscript.UI_Replay.Inst.nextStep(true);
                                        });
                                    }));
                                }), Laya.Handler.create(W, function (H) {
                                    return uiscript.UI_Loading.Inst.setProgressVal(0.1 + 0.9 * H);
                                }, null, false));
                            };
                            main_func();
                        });
                        let B = {};
                        B.record = n.head;
                        if (n.data && n.data.length) {
                            B.game = net.MessageWrapper.decodeMessage(n.data);
                            C.runWith(B);
                        }
                        else {
                            let O = n.data_url;
                            if (!O.startsWith('http'))
                                O = GameMgr.prefix_url + O;
                            game.LoadMgr.httpload(O, 'arraybuffer', false, Laya.Handler.create(W, function (H) {
                                if (H.success) {
                                    const N = new Laya.Byte();
                                    N.writeArrayBuffer(H.data);
                                    B.game = net.MessageWrapper.decodeMessage(N.getUint8Array(0, N.length));
                                    C.runWith(B);
                                }
                                else {
                                    uiscript.UIMgr.Inst.ShowErrorInfo(game.Tools.strOfLocalization(2005) + n.data_url);
                                    uiscript.UI_Loading.Inst.close();
                                    uiscript.UIMgr.Inst.showLobby();
                                    W.duringPaipu = false;
                                }
                            }));
                        }
                    }
                });
            }
        };
    };
    // ========================================================================
    // ============================= 一些的优化函数 =============================
    // ========================================================================
    const optimizeFunction = () => {
        // 修正多赤的暗杠
        view.ActionAnGangAddGang.getAngangTile = (tile, seat) => {
            const hand = view.DesktopMgr.Inst.players[view.DesktopMgr.Inst.seat2LocalPosition(seat)].hand;
            const mj_tile = mjcore.MJPai.Create(tile);
            let dora_cnt = 0; // 红宝牌数量
            let touming_cnt = 0; // 透明牌数量
            // 贪心策略: 优先杠出赤宝牌
            for (let i = 0; i < hand.length; i++) {
                if (mjcore.MJPai.Distance(hand[i].val, mj_tile) === 0 && hand[i].val.dora)
                    dora_cnt = Math.min(dora_cnt + 1, 4);
                if (mjcore.MJPai.Distance(hand[i].val, mj_tile) === 0 && hand[i].val.touming)
                    touming_cnt = Math.min(touming_cnt + 1, 4);
            }
            const angang_tiles = [];
            for (let i = 0; i < 4; i++) {
                const mjp = mjcore.MJPai.Create(tile);
                mjp.dora = false;
                mjp.touming = false;
                angang_tiles.push(mjp);
            }
            for (let i = 1; i <= dora_cnt; i++)
                angang_tiles[i % 4].dora = true;
            for (let i = 0; i < touming_cnt; i++)
                angang_tiles[i].touming = true;
            view.DesktopMgr.Inst.waiting_lingshang_deal_tile = true;
            return angang_tiles;
        };
        // 添加 category 为 3: '段位场' , 99: '装扮预览' 的情况
        // 逐渐取代 '四人东' 为对应模式的名称
        game.Tools.get_room_desc = function (config) {
            if (!config)
                return {
                    text: '',
                    isSimhei: false
                };
            let text = '';
            if (config.meta && config.meta.tournament_id) {
                const n = cfg.tournament.tournaments.get(config.meta.tournament_id);
                n && (text = n.name);
                return {
                    text: text,
                    isSimhei: true
                };
            }
            if (1 === config.category) {
                if (config.mode.detail_rule)
                    text += '友人场\xB7';
            }
            else if (4 === config.category)
                text += '比赛场\xB7';
            else if (2 === config.category) {
                const S = config.meta;
                if (S) {
                    const M = cfg.desktop.matchmode.get(S.mode_id);
                    M && (text += M['room_name_' + GameMgr.client_language] + '\xB7');
                }
            }
            else if (100 === config.category)
                return {
                    text: '新手教程',
                    isSimhei: false
                };
            // 添加下面
            else if (99 === config.category)
                return {
                    text: '装扮预览',
                    isSimhei: false
                };
            else if (3 === config.category)
                text += '段位场\xB7';
            if (config.category && config.mode.detail_rule) {
                const x = config.mode.detail_rule;
                if (x.xuezhandaodi)
                    text += '修罗之战';
                else if (x.chuanma)
                    text += '赤羽之战';
                else if (x.dora3_mode)
                    text += '宝牌狂热';
                else if (x.begin_open_mode)
                    text += '配牌明牌';
                else if (x.muyu_mode)
                    text += '龙之目玉';
                else if (x.jiuchao_mode)
                    text += '明镜之战';
                else if (x.reveal_discard)
                    text += '暗夜之战';
                else if (x.field_spell_mode)
                    text += '幻境传说';
                else if (x.zhanxing)
                    text += '占星之战';
                else if (x.tianming_mode)
                    text += '天命之战';
                else if (x.yongchang_mode)
                    text += '咏唱之战';
                else if (x.hunzhiyiji_mode)
                    text += '魂之一击';
                else if (x.wanxiangxiuluo_mode)
                    text += '万象修罗';
                else if (x.beishuizhizhan_mode)
                    text += '背水之战';
                else if (x.amusement_switches instanceof Array && x.amusement_switches.includes(18))
                    text += '下克上';
                else if (x._random_views || x._random_skin)
                    text = '随机装扮';
                else
                    text += this.room_mode_desc(config.mode.mode);
            }
            // 添加上面
            return {
                text: text,
                isSimhei: false
            };
        };
        // 1. 国标添加圈风刻, 门风刻语音
        // 2. 并不显示宝牌指示牌
        // 3. 番种数超过上限时, 会循环报菜名
        uiscript.UI_Win.prototype.showRecord = function (K) {
            var z = this;
            if (!view.DesktopMgr.Inst.record_show_anim)
                return this._showInfo_record(K),
                    this.isDoAnimation = false,
                    undefined;
            this.isDoAnimation = true,
                this.container_Activity_Point.me.visible = false,
                this.container_activity_rpg.me.visible = false,
                this.root.alpha = 0,
                this.tweenManager.addTweenTo(this.root, {
                    alpha: 1
                }, 500);
            var Z = view.DesktopMgr.Inst.getPlayerName(K.seat);
            game.Tools.SetNickname(this.winner_name, Z, false, true);
            var s = view.DesktopMgr.Inst.player_datas[K.seat].character, U = new uiscript.UIRect();
            U.x = this.illust_rect.x,
                U.y = this.illust_rect.y,
                U.width = this.illust_rect.width,
                U.height = this.illust_rect.height,
                this.char_skin.setRect(U),
                this.char_skin.setSkin(view.DesktopMgr.Inst.player_datas[K.seat].avatar_id, 'full'),
                2 === K.mode ? this.img_mode.visible = false : (this.img_mode.visible = true,
                    this.img_mode.skin = 0 === K.mode ? game.Tools.localUISrc('myres/mjdesktop/pg_zimo.png') : game.Tools.localUISrc('myres/mjdesktop/pg_he.png')),
                this._showPai(K),
                // 添加下面
                this.container_dora.visible = !(view.DesktopMgr.Inst.is_chuanma_mode() || is_guobiao()),
                this.container_lidora.visible = !(view.DesktopMgr.Inst.is_chuanma_mode() || is_guobiao());
            // 添加上面
            var O = K.fan_names.length, m = 100;
            this.container_fan_yiman.visible = false,
                this.container_fan_8.visible = false,
                this.container_fan_15.visible = false,
                this.container_fan_12.visible = false,
                this.container_fan_liuju.visible = false,
                this.container_fan_yiman.visible = false,
                this.container_fan_8.visible = false,
                this.container_fan_15.visible = false,
                this.container_fan_12.visible = false,
                this.container_fan_liuju.visible = false;
            var Y = null;
            Y = 2 === K.mode ? this.container_fan_liuju : K.yiman ? this.container_fan_yiman : 8 >= O ? this.container_fan_8 : 12 >= O ? this.container_fan_12 : this.container_fan_15,
                Y.visible = true;
            for (var j = 0; j < Y.numChildren; j++)
                Y.getChildAt(j).visible = false;
            for (var Q = [], j = 0; j < K.fan_names.length; j++) {
                var p = K.fan_names[j], M = 0, u = K.fan_ids[j], e = false, H = cfg.fan.fan.get(u);
                H && (e = !!H.mark),
                    9999 !== u && H && (M = H.show_index);
                var r = {
                    name: p,
                    index: M,
                    isSpecialFan: e
                };
                if (K.fan_value && K.fan_value.length > j && (r.value = K.fan_value[j]),
                    10 === u)
                    switch ((K.seat - view.DesktopMgr.Inst.index_ju + view.DesktopMgr.Inst.player_count) % view.DesktopMgr.Inst.player_count) {
                        case 0:
                            r.sound = 'fan_dong';
                            break;
                        case 1:
                            r.sound = 'fan_nan';
                            break;
                        case 2:
                            r.sound = 'fan_xi';
                            break;
                        case 3:
                            r.sound = 'fan_bei';
                    }
                else if (11 === u)
                    if (view.DesktopMgr.Inst.index_change % 4 === (K.seat - view.DesktopMgr.Inst.index_ju + view.DesktopMgr.Inst.player_count) % view.DesktopMgr.Inst.player_count)
                        switch (view.DesktopMgr.Inst.index_change % 4) {
                            case 0:
                                r.sound = 'fan_doubledong';
                                break;
                            case 1:
                                r.sound = 'fan_doublenan';
                                break;
                            case 2:
                                r.sound = 'fan_doublexi';
                                break;
                            case 3:
                                r.sound = 'fan_doublebei';
                        }
                    else
                        switch (view.DesktopMgr.Inst.index_change % 4) {
                            case 0:
                                r.sound = 'fan_dong';
                                break;
                            case 1:
                                r.sound = 'fan_nan';
                                break;
                            case 2:
                                r.sound = 'fan_xi';
                                break;
                            case 3:
                                r.sound = 'fan_bei';
                        }
                // 添加下面
                else if (8061 === u)
                    switch (view.DesktopMgr.Inst.index_change % 4) {
                        case 0:
                            r.sound = 'fan_dong';
                            break;
                        case 1:
                            r.sound = 'fan_nan';
                            break;
                        case 2:
                            r.sound = 'fan_xi';
                            break;
                        case 3:
                            r.sound = 'fan_bei';
                    }
                else if (8062 === u)
                    if (view.DesktopMgr.Inst.index_change % 4 === (K.seat - view.DesktopMgr.Inst.index_ju + view.DesktopMgr.Inst.player_count) % view.DesktopMgr.Inst.player_count)
                        switch ((K.seat - view.DesktopMgr.Inst.index_ju + view.DesktopMgr.Inst.player_count) % view.DesktopMgr.Inst.player_count) {
                            case 0:
                                r.sound = 'fan_doubledong';
                                break;
                            case 1:
                                r.sound = 'fan_doublenan';
                                break;
                            case 2:
                                r.sound = 'fan_doublexi';
                                break;
                            case 3:
                                r.sound = 'fan_doublebei';
                        }
                    else
                        switch ((K.seat - view.DesktopMgr.Inst.index_ju + view.DesktopMgr.Inst.player_count) % view.DesktopMgr.Inst.player_count) {
                            case 0:
                                r.sound = 'fan_dong';
                                break;
                            case 1:
                                r.sound = 'fan_nan';
                                break;
                            case 2:
                                r.sound = 'fan_xi';
                                break;
                            case 3:
                                r.sound = 'fan_bei';
                        }
                // 添加上面
                else if (u >= 31 && 34 >= u) {
                    var T = r.value;
                    T > 13 && (T = 13),
                        r.sound = 0 === T ? '' : 'fan_dora' + T;
                }
                else
                    9999 === u ? r.sound = 'fan_liujumanguan' : u >= 0 && (r.sound = cfg.fan.fan.get(u).sound);
                Q.push(r);
            }
            Q = Q.sort(function (B, K) {
                return B.index - K.index;
            }),
                m += 500;
            for (var I = function (B) {
                if (!(B % Y.numChildren)) // 添加该 if
                    C.timerManager.addTimerOnce(m, function () {
                        for (var k = 0; k < Y.numChildren; k++)
                            Y.getChildAt(k).visible = false;
                    });
                var Z = game.Tools.get_chara_audio(s, Q[B].sound);
                C.timerManager.addTimerOnce(m, function () {
                    var s = Y.getChildAt(B % Y.numChildren) // 加入 % Y.numChildren
                    , U = s.getChildByName('l_name');
                    U.text = Q[B].name,
                        U.color = Q[B].isSpecialFan ? '#ffc74c' : '#f1eeda';
                    var O = K.yiman && 'en' === GameMgr.client_language ? 290 : 242;
                    if (U.width = O,
                        game.Tools.labelLocalizationSize(U, O, 0.8),
                        undefined !== Q[B].value && null !== Q[B].value) {
                        s.getChildAt(2).visible = true;
                        var m = Q[B].value, j = m.toString();
                        2 === j.length ? (s.getChildAt(3).skin = game.Tools.localUISrc('myres/mjdesktop/number/h_' + j[1] + '.png'),
                            s.getChildAt(3).visible = true,
                            s.getChildAt(4).skin = game.Tools.localUISrc('myres/mjdesktop/number/h_' + j[0] + '.png'),
                            s.getChildAt(4).visible = true) : (s.getChildAt(3).skin = game.Tools.localUISrc('myres/mjdesktop/number/h_' + j[0] + '.png'),
                            s.getChildAt(3).visible = true,
                            s.getChildAt(4).visible = false);
                    }
                    s.visible = true,
                        z.tweenManager.addTweenFrom(s, {
                            x: 169,
                            y: 184,
                            alpha: 0
                        }, 100, Laya.Ease.strongOut),
                        Z ? (view.AudioMgr.PlaySound(Z.path, Z.volume),
                            view.AudioMgr.PlayAudio(211, 1, 0.5)) : view.AudioMgr.PlayAudio(211, 1, 1);
                }),
                    m += Z ? Z.time_length > 500 ? Z.time_length : 500 : 500;
            }, C = this, j = 0; j < O; j++) // 去掉 j < Y.numChildren 的循环条件
                I(j);
            this.container_fan.visible = false,
                this.container_fu.visible = false,
                this.img_yiman.visible = false,
                K.fan && K.fu ? (m += 300,
                    this.timerManager.addTimerOnce(m, function () {
                        view.AudioMgr.PlayAudio(208),
                            z.setFanFu(K.fan, K.fu);
                    })) : K.yiman && (m += 700,
                    this.timerManager.addTimerOnce(m, function () {
                        view.AudioMgr.PlayAudio(208),
                            z.img_yiman.alpha = 0,
                            z.img_yiman.visible = true,
                            z.tweenManager.addTweenTo(z.img_yiman, {
                                alpha: 1
                            }, 200);
                    })),
                this.container_score.alpha = 0;
            for (var j = 0; j < this.score_imgs.length; j++)
                this.score_imgs[j].visible = false;
            if (m += 700,
                this.container_score.scaleX = this.container_score.scaleY = 2,
                this.timerManager.addTimerOnce(m, function () {
                    for (var B = 0, Z = K.score; 0 !== Z;) {
                        var s = Z % 10;
                        if (Z = Math.floor(Z / 10),
                            z.score_imgs[B].skin = game.Tools.localUISrc('myres/mjdesktop/number/ww_' + s.toString() + '.png'),
                            z.score_imgs[B].visible = true,
                            B++,
                            B >= z.score_imgs.length)
                            break;
                    }
                    z.tweenManager.addTweenTo(z.container_score, {
                        alpha: 1,
                        scaleX: 1.2,
                        scaleY: 1.2
                    }, 200, Laya.Ease.strongIn),
                        view.AudioMgr.PlayAudio(221);
                }),
                this.container_title.visible = false,
                K.title_id) {
                m += 700;
                var V = 0, g = 0, W = '';
                switch (K.title_id) {
                    case mjcore.E_Dadian_Title.E_Dadian_Title_manguan:
                        W = 'gameend_manguan',
                            V = 214;
                        break;
                    case mjcore.E_Dadian_Title.E_Dadian_Title_tiaoman:
                        W = 'gameend_tiaoman',
                            V = 214;
                        break;
                    case mjcore.E_Dadian_Title.E_Dadian_Title_beiman:
                        W = 'gameend_beiman',
                            V = 201;
                        break;
                    case mjcore.E_Dadian_Title.E_Dadian_Title_sanbeiman:
                        W = 'gameend_sanbeiman',
                            V = 201;
                        break;
                    case mjcore.E_Dadian_Title.E_Dadian_Title_leijiyiman:
                        W = 'gameend_leijiyiman',
                            g = 2,
                            V = 226;
                        break;
                    case mjcore.E_Dadian_Title.E_Dadian_Title_yiman:
                        W = 'gameend_yiman1',
                            g = 1,
                            V = 226;
                        break;
                    case mjcore.E_Dadian_Title.E_Dadian_Title_yiman2:
                        W = 'gameend_yiman2',
                            g = 2,
                            V = 226;
                        break;
                    case mjcore.E_Dadian_Title.E_Dadian_Title_yiman3:
                        W = 'gameend_yiman3',
                            g = 2,
                            V = 226;
                        break;
                    case mjcore.E_Dadian_Title.E_Dadian_Title_yiman4:
                        W = 'gameend_yiman4',
                            g = 2,
                            V = 226;
                        break;
                    case mjcore.E_Dadian_Title.E_Dadian_Title_yiman5:
                        W = 'gameend_yiman5',
                            g = 2,
                            V = 226;
                        break;
                    case mjcore.E_Dadian_Title.E_Dadian_Title_yiman6:
                        W = 'gameend_yiman6',
                            g = 2,
                            V = 226;
                }
                var X = game.Tools.get_chara_audio(s, W);
                this.timerManager.addTimerOnce(m, function () {
                    z.setTitle(K.title_id),
                        z.container_title.visible = true,
                        z.container_title.alpha = 0,
                        z.container_title.scaleX = z.container_title.scaleY = 3,
                        z.tweenManager.addTweenTo(z.container_title, {
                            alpha: 1,
                            scaleX: 1.2,
                            scaleY: 1.2
                        }, 300, Laya.Ease.strongIn),
                        z.timerManager.addTimerOnce(300, function () {
                            0 !== V && view.AudioMgr.PlayAudio(V);
                        }),
                        X && z.timerManager.addTimerOnce(500, function () {
                            view.AudioMgr.PlaySound(X.path, X.volume);
                        }),
                        0 !== g && z.timerManager.addTimerOnce(300, function () {
                            var B, K;
                            'en' === GameMgr.client_language ? (B = z.root.getChildByName('effect_yiman_en'),
                                K = 'scene/effect_yiman2.lh') : 'kr' === GameMgr.client_language ? (B = z.root.getChildByName('effect_yiman_en'),
                                K = 'scene/effect_yiman.lh') : 1 === g ? (B = z.root.getChildByName('effect_yiman'),
                                K = 'scene/effect_yiman.lh') : (B = z.root.getChildByName('effect_yiman2'),
                                K = 'scene/effect_yiman2.lh'),
                                z.effect_yiman = game.FrontEffect.Inst.create_ui_effect(B, K, new Laya.Point(0, 0), 25);
                        });
                }),
                    (K.yiman || '累积役满' === K.title) && (m += 500);
            }
            if (this.muyu.visible = false,
                view.DesktopMgr.Inst.muyu_info) {
                var i = false;
                0 === K.mode ? i = true : 1 === K.mode && (view.DesktopMgr.Inst.index_player === view.DesktopMgr.Inst.muyu_info.seat && (i = true),
                    K.seat === view.DesktopMgr.Inst.muyu_info.seat && (i = true)),
                    i && (this.muyu.scale(1.2, 1.2),
                        m += 700,
                        this.timerManager.addTimerOnce(m, function () {
                            z.muyu.visible = true,
                                z.muyu.alpha = 0;
                            var B = (view.DesktopMgr.Inst.muyu_info.seat - view.DesktopMgr.Inst.index_ju + view.DesktopMgr.Inst.player_count) % view.DesktopMgr.Inst.player_count;
                            z.muyu.skin = game.Tools.localUISrc('myres/mjdesktop/muyu_seat' + B + '.png'),
                                z.tweenManager.addTweenTo(z.muyu, {
                                    alpha: 1
                                }, 250);
                        }));
            }
            if (view.DesktopMgr.Inst.is_tianming_mode()) {
                this.muyu.visible = false;
                var i = false;
                K.tianming_bonus > 0 && (i = true),
                    i && (this.muyu.scale(1, 1),
                        m += 700,
                        this.timerManager.addTimerOnce(m, function () {
                            z.muyu.visible = true,
                                z.muyu.alpha = 0,
                                z.muyu.skin = game.Tools.localUISrc('myres/mjdesktop/tianming_result_' + K.tianming_bonus + '.png'),
                                z.tweenManager.addTweenTo(z.muyu, {
                                    alpha: 1
                                }, 250);
                        }));
            }
            if (this.xiakeshang.visible = false,
                view.DesktopMgr.Inst.isTargetSpecialMode(18)) {
                var k = false;
                K.xia_ke_shang_coefficient && (k = true),
                    k && (m += 700,
                        this.timerManager.addTimerOnce(m, function () {
                            z.xiakeshang.visible = true,
                                z.xiakeshang.alpha = 0,
                                z.xiakeshang.skin = game.Tools.localUISrc('myres/mjdesktop/xiakeshang_result' + K.xia_ke_shang_coefficient + '.png'),
                                z.tweenManager.addTweenTo(z.xiakeshang, {
                                    alpha: 1
                                }, 250);
                        }));
            }
            if (view.DesktopMgr.Inst.mode === view.EMJMode.play && K.seat === view.DesktopMgr.Inst.seat && K.mode <= 1 && uiscript.UI_Activity.activity_is_running(uiscript.UI_Activity_DuanWu_Point.activity_id)) {
                for (var S = false, j = 0; j < view.DesktopMgr.Inst.player_datas.length; j++) {
                    var _ = view.DesktopMgr.Inst.player_datas[j];
                    if (!_ || game.Tools.isAI(_.account_id)) {
                        S = true;
                        break;
                    }
                }
                S ? this.container_Activity_Point.me.visible = false : m += this.container_Activity_Point.show(m, K.point_sum, K.score);
            }
            else
                this.container_Activity_Point.me.visible = false;
            if (view.DesktopMgr.Inst.mode === view.EMJMode.play && uiscript.UI_Activity.activity_is_running(uiscript.UI_Activity_RPG.activity_id)) {
                for (var S = false, j = 0; j < view.DesktopMgr.Inst.player_datas.length; j++) {
                    var _ = view.DesktopMgr.Inst.player_datas[j];
                    if (!_ || game.Tools.isAI(_.account_id)) {
                        S = true;
                        break;
                    }
                }
                if (S)
                    this.container_activity_rpg.me.visible = false;
                else {
                    var f = 0;
                    view.DesktopMgr.Inst.seat !== K.seat && (f = 0 === K.mode ? 2 : 1),
                        1 === f && 0 !== view.DesktopMgr.Inst.seat2LocalPosition(view.DesktopMgr.Inst.index_player) ? this.container_activity_rpg.me.visible = false : this.container_activity_rpg.show(f, 0);
                }
            }
            else
                this.container_activity_rpg.me.visible = false;
            this.btn_confirm.visible = false,
                m += 300,
                this.btn_confirm.disabled = true,
                this.timerManager.addTimerOnce(m, function () {
                    if (z.btn_confirm.visible = true,
                        z.btn_confirm.alpha = 1,
                        z.tweenManager.addTweenFrom(z.btn_confirm, {
                            alpha: 0
                        }, 200),
                        z.btn_confirm.disabled = false,
                        view.DesktopMgr.Inst.mode === view.EMJMode.paipu || view.DesktopMgr.Inst.mode === view.EMJMode.xinshouyindao)
                        z.count_down.visible = false,
                            z.btn_confirm.getChildByName('confirm').x = 131;
                    else {
                        z.count_down.visible = true,
                            z.btn_confirm.getChildByName('confirm').x = 165;
                        for (var B = function (B) {
                            z.timerManager.addTimerOnce(1000 * B, function () {
                                z.btn_confirm.disabled || (z.count_down.text = '(' + (3 - B).toString() + ')');
                            });
                        }, K = 0; 3 > K; K++)
                            B(K);
                        z.timerManager.addTimerOnce(3000, function () {
                            z.btn_confirm.disabled || z.onConfirm();
                        });
                    }
                });
        };
        // 上述函数对应的跳过动画的版本
        uiscript.UI_Win.prototype._showInfo_record = function (K) {
            this.container_Activity_Point.me.visible = false,
                this.root.alpha = 1;
            view.DesktopMgr.Inst.setNickname(this.winner_name, K.seat, '#c3e2ff', '#fbfbfb', true);
            var z = new uiscript.UIRect();
            z.x = this.illust_rect.x,
                z.y = this.illust_rect.y,
                z.width = this.illust_rect.width,
                z.height = this.illust_rect.height,
                this.char_skin.setRect(z),
                this.char_skin.setSkin(view.DesktopMgr.Inst.player_datas[K.seat].avatar_id, 'full'),
                2 === K.mode ? this.img_mode.visible = false : (this.img_mode.visible = true,
                    this.img_mode.skin = 0 === K.mode ? game.Tools.localUISrc('myres/mjdesktop/pg_zimo.png') : game.Tools.localUISrc('myres/mjdesktop/pg_he.png')),
                this._showPai(K),
                // 添加下面
                this.container_dora.visible = !(view.DesktopMgr.Inst.is_chuanma_mode() || is_guobiao()),
                this.container_lidora.visible = !(view.DesktopMgr.Inst.is_chuanma_mode() || is_guobiao());
            // 添加上面
            var Z = K.fan_names.length;
            this.container_fan_yiman.visible = false,
                this.container_fan_8.visible = false,
                this.container_fan_15.visible = false,
                this.container_fan_12.visible = false,
                this.container_fan_liuju.visible = false,
                this.container_fan_yiman.visible = false,
                this.container_fan_8.visible = false,
                this.container_fan_15.visible = false,
                this.container_fan_12.visible = false,
                this.container_fan_liuju.visible = false;
            var s;
            s = 2 === K.mode ? this.container_fan_liuju : K.yiman ? this.container_fan_yiman : 8 >= Z ? this.container_fan_8 : 12 >= Z ? this.container_fan_12 : this.container_fan_15,
                s.visible = true;
            for (var U = 0; U < s.numChildren; U++)
                s.getChildAt(U).visible = false;
            for (var O = [], U = 0; U < K.fan_names.length; U++) {
                var m = K.fan_names[U], Y = K.fan_ids[U], j = 0, Q = false, p = cfg.fan.fan.get(Y);
                p && (Q = !!p.mark),
                    9999 !== Y && p && (j = p.show_index);
                var M = {
                    name: m,
                    index: j,
                    isSpecialFan: Q
                };
                K.fan_value && K.fan_value.length > U && (M.value = K.fan_value[U]),
                    O.push(M);
            }
            O = O.sort(function (B, K) {
                return B.index - K.index;
            });
            for (var U = 0; Z > U && U < s.numChildren; U++) {
                var u = s.getChildAt(U), e = u.getChildByName('l_name');
                e.text = O[U].name,
                    e.color = O[U].isSpecialFan ? '#ffc74c' : '#f1eeda';
                var H = K.yiman && 'en' === GameMgr.client_language ? 290 : 242;
                if (e.width = H,
                    game.Tools.labelLocalizationSize(e, H, 0.8),
                    undefined !== O[U].value && null !== O[U].value) {
                    u.getChildAt(2).visible = true;
                    var r = O[U].value, T = r.toString();
                    2 === T.length ? (u.getChildAt(3).skin = game.Tools.localUISrc('myres/mjdesktop/number/h_' + T[1] + '.png'),
                        u.getChildAt(3).visible = true,
                        u.getChildAt(4).skin = game.Tools.localUISrc('myres/mjdesktop/number/h_' + T[0] + '.png'),
                        u.getChildAt(4).visible = true) : (u.getChildAt(3).skin = game.Tools.localUISrc('myres/mjdesktop/number/h_' + T[0] + '.png'),
                        u.getChildAt(3).visible = true,
                        u.getChildAt(4).visible = false);
                }
                u.visible = true;
            }
            this.container_fan.visible = false,
                this.container_fu.visible = false,
                this.img_yiman.visible = false,
                K.fan && K.fu ? this.setFanFu(K.fan, K.fu) : K.yiman && (this.img_yiman.alpha = 1,
                    this.img_yiman.visible = true);
            for (var U = 0; U < this.score_imgs.length; U++)
                this.score_imgs[U].visible = false;
            for (var I = K.score.toString(), U = 0; U < I.length && !(U >= this.score_imgs.length); U++)
                this.score_imgs[U].skin = game.Tools.localUISrc('myres/mjdesktop/number/ww_' + I.charAt(I.length - 1 - U) + '.png'),
                    this.score_imgs[U].visible = true;
            if (this.container_score.alpha = 1,
                this.container_score.scaleX = this.container_score.scaleY = 1.2,
                this.container_title.visible = false,
                K.title_id && (this.setTitle(K.title_id),
                    this.container_title.visible = true,
                    this.container_title.alpha = 1,
                    this.container_title.scaleX = this.container_title.scaleY = 1.2),
                this.muyu.visible = false,
                view.DesktopMgr.Inst.muyu_info) {
                var C = false;
                if (0 === K.mode ? C = true : 1 === K.mode && (view.DesktopMgr.Inst.index_player === view.DesktopMgr.Inst.muyu_info.seat && (C = true),
                    K.seat === view.DesktopMgr.Inst.muyu_info.seat && (C = true)),
                    C) {
                    this.muyu.visible = true,
                        this.muyu.alpha = 1;
                    var V = (view.DesktopMgr.Inst.muyu_info.seat - view.DesktopMgr.Inst.index_ju + view.DesktopMgr.Inst.player_count) % view.DesktopMgr.Inst.player_count;
                    this.muyu.skin = game.Tools.localUISrc('myres/mjdesktop/muyu_seat' + V + '.png');
                }
            }
            if (this.xiakeshang.visible = false,
                view.DesktopMgr.Inst.isTargetSpecialMode(18)) {
                var r = false;
                K.xia_ke_shang_coefficient && (r = true),
                    r && (this.xiakeshang.visible = true,
                        this.xiakeshang.alpha = 1,
                        this.xiakeshang.skin = game.Tools.localUISrc('myres/mjdesktop/xiakeshang_result' + K.xia_ke_shang_coefficient + '.png'));
            }
            this.count_down.text = '',
                this.btn_confirm.visible = true,
                this.btn_confirm.disabled = false,
                this.btn_confirm.alpha = 1,
                this.count_down.visible = false,
                this.btn_confirm.getChildByName('confirm').x = 131;
        };
        // 国标麻将不显示符数; 番数扩展到百位显示
        uiscript.UI_Win.prototype.setFanFu = function (B, K) {
            // cloneImage 函数由猫粮工作室老板娘"丝茉茉"提供
            const cloneImage = original => {
                const clone = new Laya.Image();
                original.parent.addChildAt(clone, 0);
                clone.pos(-138, 62);
                clone.size(original.width, original.height);
                clone.rotation = original.rotation;
                clone.scale(original.scaleX, original.scaleY);
                clone.alpha = original.alpha;
                clone.visible = original.visible;
                clone.skin = original.skin;
                return clone;
            };
            this.container_fan.visible = this.container_fu.visible = true,
                this.container_fan.alpha = this.container_fu.alpha = 0;
            if (this.fan_imgs.length < 3)
                this.fan_imgs[2] = cloneImage(this.fan_imgs[1]);
            for (var z = 0; 3 > z; z++)
                if (0 === B)
                    this.fan_imgs[z].visible = false;
                else {
                    var Z = B % 10;
                    B = Math.floor(B / 10),
                        this.fan_imgs[z].visible = true,
                        this.fan_imgs[z].skin = game.Tools.localUISrc('myres/mjdesktop/number/h_' + Z.toString() + '.png');
                }
            // 添加下面
            this.container_fu.visible = !(view.DesktopMgr.Inst.is_chuanma_mode() || is_guobiao());
            // 添加上面
            for (var z = 0; 3 > z; z++)
                if (0 === K)
                    this.fu_imgs[z].visible = false;
                else {
                    var Z = K % 10;
                    K = Math.floor(K / 10),
                        this.fu_imgs[z].visible = true,
                        this.fu_imgs[z].skin = game.Tools.localUISrc('myres/mjdesktop/number/ww_' + Z.toString() + '.png');
                }
            this.tweenManager.addTweenTo(this.container_fan, {
                alpha: 1
            }, 200),
                this.tweenManager.addTweenTo(this.container_fu, {
                    alpha: 1
                }, 200);
        };
    };

    /**
     * @file: core.ts - 核心文件, 包含牌谱编辑的基础函数
     * @author: GrandDawn, Fat-pig-Cui
     * @email: chubbypig@qq.com
     * @github: https://github.com/Fat-pig-Cui/majsoul-replay-editor
     */
    /**
     * 初始化必要变量
     */
    const clearProject = () => {
        var _a, _b;
        if ((_b = (_a = view === null || view === void 0 ? void 0 : view.DesktopMgr) === null || _a === void 0 ? void 0 : _a.Inst) === null || _b === void 0 ? void 0 : _b.active)
            throw new Error('clearProject: 请退出当前牌谱后再载入自制牌谱');
        game_begin_once = round_begin_once = true;
        for (let seat = 0; seat < 4; seat++) {
            player_datas[seat] = {
                nickname: `电脑${seat}`,
                avatar_id: 400101,
                title: 600001,
                avatar_frame: 0,
                verified: 0,
                views: []
            };
            begin_tiles[seat] = '';
            player_tiles[seat] = [];
            discard_tiles[seat] = [];
            deal_tiles[seat] = [];
            muyu.times[seat] = 1;
        }
        config.category = 1;
        config.meta = { mode_id: 0 };
        config.mode = { mode: 1, detail_rule: {} };
        muyu.seats = '';
        paishan.length = 0;
        base_info.chang = base_info.ju = base_info.ben = base_info.liqibang = base_info.benchangbang = base_info.lianzhuang_cnt = 0;
        base_info.liqi_need = base_info.draw_type = base_info.lst_draw_type = 1;
        base_info.baogang_seat = base_info.first_hu_seat = -1;
        base_info.base_point = 25000;
        base_info.all_tile_nums = {};
        all_data.all_actions = [];
        all_data.xun = [];
        all_data.player_datas = player_datas;
        all_data.config = config;
        all_data.players = [null, null];
    };
    /**
     * 随机牌山函数, 最后会将随机牌山赋给全局变量 paishan, paishan.join('') 就是牌谱界面显示的牌山字符串代码
     * @example
     * // 以四个三索开头, 东风为第一张岭上牌的牌山, 可以简写, 中间的空格不影响
     * randomPaishan('33s3s 3s', '1z')
     * @param ps_head - 牌山开头
     * @param ps_tail - 牌山结尾
     */
    const randomPaishan = (ps_head = '', ps_tail = '') => {
        gameBegin();
        const tiles = [separateWithParam(begin_tiles[0]), separateWithParam(begin_tiles[1]), separateWithParam(begin_tiles[2]), separateWithParam(begin_tiles[3])];
        const para_tiles = [separateWithParam(ps_head), separateWithParam(ps_tail)];
        // 检查手牌数量是否合规
        for (let seat = 0; seat < base_info.player_cnt; seat++) {
            const len = tiles[seat].length;
            if (seat === base_info.ju) {
                if (len > Constants.QIN_TILE_NUM)
                    console.warn(errRoundInfo() + `seat: ${seat} 为亲家起手牌数量超过正常值: ${len}, 页面可能会崩溃`);
                else if (len < Constants.QIN_TILE_NUM)
                    console.log(errRoundInfo() + `seat: ${seat} 为亲家起手牌数量不够: ${len}, 补全至${Constants.QIN_TILE_NUM}张`);
            }
            else {
                if (len > Constants.XIAN_TILE_NUM)
                    console.warn(errRoundInfo() + `seat: ${seat} 为闲家起手牌数量超过正常值: ${len}, 页面可能会崩溃`);
                else if (len < Constants.XIAN_TILE_NUM)
                    console.log(errRoundInfo() + `seat: ${seat} 为闲家起手牌数量不够: ${len}, 补全至${Constants.XIAN_TILE_NUM}张`);
            }
        }
        const cnt = JSON.parse(JSON.stringify(base_info.all_tile_nums));
        const sp_type = ['Y', 'D', 'T', 'H', 'M', 'P', 'S', '.'];
        // 减去玩家起手
        for (let seat = 0; seat < base_info.player_cnt; seat++)
            for (const tile of tiles[seat])
                if (!sp_type.includes(tile[0]))
                    if (is_tianming())
                        cnt[tile[0] + tile[1]]--;
                    else
                        cnt[tile]--;
        // 减去两个参数的牌
        for (const para_tile of para_tiles)
            for (const tile of para_tile)
                if (!sp_type.includes(tile[0]))
                    cnt[tile]--;
        const remain_tiles = [];
        for (const tile of Constants.TILE) {
            for (let i = 0; i < cnt[tile]; i++)
                remain_tiles.push(tile);
            for (let i = 0; i < cnt[tile + Constants.SPT_SUFFIX]; i++)
                remain_tiles.push(tile + Constants.SPT_SUFFIX);
        }
        remain_tiles.sort(randomCmp);
        for (const para_tile of para_tiles)
            randomize(para_tile);
        for (let seat = 0; seat < base_info.player_cnt; seat++)
            randomize(tiles[seat]);
        // 补全玩家起手
        for (let seat = 0; seat < base_info.player_cnt; seat++) {
            while (tiles[seat].length < Constants.XIAN_TILE_NUM)
                tiles[seat].push(remain_tiles.pop());
            if (seat === base_info.ju && tiles[seat].length < Constants.QIN_TILE_NUM)
                tiles[seat].push(remain_tiles.pop());
        }
        // 回写
        for (let seat = 0; seat < base_info.player_cnt; seat++)
            begin_tiles[seat] = tiles[seat].join('');
        if (!is_report_yakus())
            for (const tile of Object.keys(cnt))
                if (cnt[tile] < 0)
                    console.warn(errRoundInfo() + `paishan 不合规: ${base_info.all_tile_nums[tile] - cnt[tile]} 个 ${tile}`);
        paishan.length = 0;
        paishan.push(...para_tiles[0].concat(remain_tiles, para_tiles[1]));
        roundBegin();
        function randomize(tls) {
            for (const i of tls.keys())
                if (['H', 'T'].includes(tls[i][0])) {
                    const index = remain_tiles.findIndex((tile) => judgeTile(tile, tls[i][0]));
                    tls[i] = index > -1 ? remain_tiles.splice(index, 1)[0] : remain_tiles.pop();
                }
            for (const i of tls.keys())
                if (['Y', 'D', 'M', 'P', 'S'].includes(tls[i][0])) {
                    const index = remain_tiles.findIndex((tile) => judgeTile(tile, tls[i][0]));
                    tls[i] = index > -1 ? remain_tiles.splice(index, 1)[0] : remain_tiles.pop();
                }
            for (const i of tls.keys())
                if (tls[i][0] === '.')
                    tls[i] = remain_tiles.pop();
        }
    };
    /**
     * 摸牌, 参数顺序可以不一致, 包含
     * - {Seat} - 摸牌的玩家, 没有此参数时按照正常对局流程
     * - {Tile} - 摸的牌, 没有此参数时将根据 deal_tiles 或牌山确定
     * - {AwaitingIndex} - 占星之战: 牌候选池中选择的牌位置, 后面会变为 AwaitingIndex 类型
     */
    const mopai = (...args) => {
        let seat, tile, index;
        // 参数预处理
        for (const arg of args)
            if (typeof arg == 'string') {
                if (isTile(arg))
                    tile = arg;
                else
                    console.error(errRoundInfo() + `mopai: 不合规的牌: ${arg}`);
            }
            else if (typeof arg == 'number') {
                if (isValidSeat(arg))
                    seat = arg;
                else
                    console.error(errRoundInfo() + `mopai: 不合规的 seat: ${arg}, 当前对局玩家数: ${base_info.player_cnt}`);
            }
            else if (arg instanceof Array && arg.length === 1 && typeof arg[0] == 'number') {
                if (isAwaitingIndex(arg[0]))
                    index = arg[0];
                else
                    console.error(errRoundInfo() + `mopai: 不合规的 awaiting_index: ${arg[0]}`);
            }
        let liqi = null;
        let hunzhiyiji_data = null;
        lstActionCompletion();
        if (seat === undefined) {
            const lst_name = getLstAction().name, lst_seat = getLstAction().data.seat;
            // 自家鸣牌, 摸牌家仍然是上个操作的玩家
            if (['RecordChiPengGang', 'RecordBaBei', 'RecordAnGangAddGang'].includes(lst_name))
                seat = lst_seat;
            // 广义切牌, 摸牌家是上个操作玩家的下一家
            if (['RecordDiscardTile', 'RecordLockTile'].includes(lst_name))
                seat = is_hunzhiyiji() && hunzhiyiji_info[lst_seat].liqi && !hunzhiyiji_info[lst_seat].overload ? lst_seat : (lst_seat + 1) % base_info.player_cnt;
            // 血战到底和牌, 摸牌家为最后和牌家的下一家
            if (lst_name === 'RecordHuleXueZhanMid') {
                if (getLstAction(2).name === 'RecordAnGangAddGang') {
                    if (is_chuanma()) // 川麻枪杠, 摸牌家为被枪杠家的下一家
                        seat = (getLstAction(2).data.seat + 1) % base_info.player_cnt;
                    else // 修罗则为被枪杠家继续岭上摸牌
                        seat = getLstAction(2).data.seat;
                }
                else {
                    const lst_index = getLstAction().data.hules.length - 1;
                    seat = (getLstAction().data.hules[lst_index].seat + 1) % base_info.player_cnt;
                }
            }
            // 血流成河或国标错和, 摸牌家为和牌之前最后操作玩家的下一家
            if (['RecordHuleXueLiuMid', 'RecordCuohu'].includes(lst_name))
                seat = (getLstAction(2).data.seat + 1) % base_info.player_cnt;
            while (huled[seat])
                seat = (seat + 1) % base_info.player_cnt;
            if (isNaN(seat))
                throw new Error(errRoundInfo() + `mopai: 无法判断谁摸牌, getLstAction().name: ${lst_name}`);
        }
        if (tile === undefined && deal_tiles[seat].length > 0) {
            const tmp_tile = deal_tiles[seat].shift();
            if (tmp_tile !== '..')
                tile = tmp_tile;
        }
        // 是否明牌
        const tile_state = is_openhand() || liqi_info[seat].kai;
        // 占星之战, 填充牌候选池供 seat 号玩家选择
        if (is_zhanxing()) {
            if (index === undefined)
                index = 0;
            if (base_info.draw_type === 0)
                awaiting_tiles.push(paishan.pop());
            while (awaiting_tiles.length < 3 && paishan.length > 14)
                awaiting_tiles.push(paishan.shift());
            addFillAwaitingTiles(seat, liqi);
        }
        // 魂之一击, 摸牌家 seat 没过载, 则减少次数
        if (is_hunzhiyiji() && hunzhiyiji_info[seat].liqi && !hunzhiyiji_info[seat].overload) {
            if (hunzhiyiji_info[seat].continue_deal_count > 0)
                hunzhiyiji_info[seat].continue_deal_count--;
            hunzhiyiji_data = JSON.parse(JSON.stringify(hunzhiyiji_info[seat]));
        }
        // 实际摸的牌
        let draw_card = paishan[0];
        if (tile !== undefined)
            draw_card = tile;
        else if (is_zhanxing())
            draw_card = awaiting_tiles.splice(index, 1)[0];
        else if (base_info.draw_type === 0)
            draw_card = paishan[paishan.length - 1];
        player_tiles[seat].push(draw_card);
        if (!is_zhanxing())
            base_info.draw_type === 0 ? paishan.pop() : paishan.shift();
        base_info.lst_draw_type = base_info.draw_type;
        base_info.draw_type = 1;
        addDealTile(seat, draw_card, liqi, tile_state, index, hunzhiyiji_data);
        // 完成上个操作的后续
        function lstActionCompletion() {
            const lst_name = getLstAction().name, lst_seat = getLstAction().data.seat;
            // 开杠翻指示牌
            if (dora_cnt.lastype === 2) {
                dora_cnt.cnt += 1 + dora_cnt.bonus;
                dora_cnt.li_cnt += 1 + dora_cnt.bonus;
                dora_cnt.bonus = dora_cnt.lastype = 0;
            }
            // pass掉自家鸣牌, 则破一发
            for (let seat = 0; seat < base_info.player_cnt; seat++)
                if (liqi_info[seat].yifa === -1)
                    liqi_info[seat].yifa = 0;
            // pass掉上个操作的牌的, pre同巡振听和pre立直振听 转 真实振听
            for (let seat = 0; seat < base_info.player_cnt; seat++) {
                if (zhenting.tongxun[0][seat])
                    zhenting.tongxun[1][seat] = true;
                if (zhenting.liqi[0][seat])
                    zhenting.liqi[1][seat] = true;
            }
            // 龙之目玉: 更新目玉数据
            if (is_muyu() && muyu_info.count === 0)
                updateMuyu();
            // 川麻: 刮风下雨结算点数
            if (is_chuanma())
                calcGangPoint();
            // 暗夜之战: 暗牌无人开
            if (is_anye() && lst_name === 'RecordRevealTile')
                addLockTile(lst_seat, 2);
            // 魂之一击: 已过载的玩家, push 一次过载数据
            if (is_hunzhiyiji()) {
                const count = hunzhiyiji_info[lst_seat].continue_deal_count;
                if (lst_name !== 'RecordAnGangAddGang')
                    if (hunzhiyiji_info[lst_seat].liqi && count === 0 && !hunzhiyiji_info[lst_seat].overload) {
                        hunzhiyiji_info[lst_seat].overload = true;
                        hunzhiyiji_data = JSON.parse(JSON.stringify(hunzhiyiji_info[lst_seat]));
                    }
            }
            // 立直成功
            liqi = lstLiqi2Liqi(true);
        }
    };
    /**
     * 切牌, 参数顺序可以不一致, 包含
     * - {Seat} - 切牌的玩家, 没有此参数时按照正常对局流程
     * - {Tile} - 切的牌, 没有此参数时将根据 discard_tiles 确定或摸切
     * - {boolean|'kailiqi'} - 是否立直, 默认不立直, 若为 'kailiqi', 则为开立直
     * - {'anpai' | 'anpai_ignore_1000'}  - 暗夜之战: 当值为字符串 'anpai' 时, 表示暗牌, 若为 'anpai_ignore_1000' 则不会支付1000点, 默认不暗牌
     * - {[BeishuiType]} - 背水之战: 立直类型, 有效值为 '[0]', '[1]', '[2]', 默认为普通立直, 需要配合 is_liqi 使用
     */
    const qiepai = (...args) => {
        let seat, tile, is_liqi, anpai, beishui_type;
        let is_kailiqi = false;
        // 参数预处理
        for (const arg of args)
            if (['anpai', 'anpai_ignore_1000'].includes(arg))
                anpai = arg;
            else if (arg === 'kailiqi')
                is_kailiqi = is_liqi = true;
            else if (typeof arg == 'number') {
                if (isValidSeat(arg))
                    seat = arg;
                else
                    throw new Error(errRoundInfo() + `qiepai: 不合规的 seat: ${arg}, 当前对局玩家数: ${base_info.player_cnt}`);
            }
            else if (typeof arg == 'boolean')
                is_liqi = arg;
            else if (arg instanceof Array && arg.length === 1 && typeof arg[0] === 'number') {
                if (isBeishuiType(arg[0]))
                    beishui_type = arg[0];
                else
                    throw new Error(errRoundInfo() + `qiepai: 不合规的 beishui_type: ${arg[0]}`);
            }
            else if (typeof arg == 'string') {
                if (isTile(arg))
                    tile = arg;
                else
                    throw new Error(errRoundInfo() + `qiepai: 不合规的牌: ${arg}`);
            }
        lstActionCompletion();
        const lst_name = getLstAction().name;
        if (seat === undefined)
            seat = getLstAction().data.seat;
        if (is_liqi === undefined)
            is_liqi = false;
        if (is_beishuizhizhan() && beishui_type === undefined)
            beishui_type = 0;
        let moqie = true;
        // 如果 tile 参数原生不空, 且在手牌出现不止一次, 则一定是手切
        if (tile !== undefined && player_tiles[seat].indexOf(tile) !== player_tiles[seat].length - 1)
            moqie = false;
        if (tile === undefined && discard_tiles[seat].length > 0) {
            const tmp_tile = discard_tiles[seat].shift();
            if (tmp_tile !== '..')
                tile = tmp_tile;
        }
        if (tile === undefined)
            tile = player_tiles[seat][player_tiles[seat].length - 1];
        moqie && (moqie = player_tiles[seat][player_tiles[seat].length - 1] === tile && !['RecordNewRound', 'RecordChiPengGang'].includes(lst_name));
        // 切牌解除同巡振听
        zhenting.tongxun[0][seat] = zhenting.tongxun[1][seat] = false;
        updateZhenting();
        // 确定立直类型
        const is_wliqi = is_liqi && liqi_info[seat].yifa !== 0 && liqi_info[seat].liqi === 0;
        // 确定 lst_liqi
        if (is_liqi && liqi_info[seat].liqi === 0) {
            lst_liqi.valid = true;
            lst_liqi.seat = seat;
            lst_liqi.liqi = is_wliqi ? 2 : 1;
            lst_liqi.kai = is_kailiqi;
            lst_liqi.beishui_type = beishui_type;
        }
        // 切的牌是否为明牌
        const tile_state = is_openhand() || is_begin_open() && eraseMingpai(seat, tile);
        // 龙之目玉: 更新目玉数据
        if (is_muyu() && seat === muyu_info.seat)
            updateMuyu();
        // 暗夜之战: 暗牌支付1000点
        if (is_anye() && anpai === 'anpai') {
            scores[seat] -= 1000;
            base_info.liqibang++;
        }
        if (is_anye() && anpai === 'anpai_ignore_1000')
            anpai = 'anpai';
        // 幻境传说: 命运卡3
        if (get_field_spell_mode(3) === 3)
            if (liqi_info[seat].liqi !== 0)
                spell_hourglass[seat]++;
        // 咏唱之战: 更新手摸切数据
        if (is_yongchang()) {
            shoumoqie[seat].push(!moqie);
            updateShoumoqie(seat);
        }
        // 魂之一击: 宣布魂之一击立直
        if (is_hunzhiyiji() && lst_liqi.valid)
            hunzhiyiji_info[seat] = {
                seat: seat,
                liqi: lst_liqi.liqi,
                continue_deal_count: 6,
                overload: false,
            };
        // 切的牌从 player_tiles 中移除
        const index = player_tiles[seat].lastIndexOf(tile);
        if (index === -1) // 要切的牌手牌中没有, 则报错
            console.error(errRoundInfo() + `qiepai: seat: ${seat} 手牌不存在要切的牌: ${tile}`);
        player_tiles[seat].splice(index, 1);
        if (!moqie)
            player_tiles[seat].sort(cmp);
        // 切的牌 push 到 paihe 中, 并计算流局满贯
        paihe[seat].tiles.push(tile);
        if (!(is_anye() && anpai === 'anpai') && !Constants.YAOJIU_TILE.includes(tile))
            paihe[seat].liujumanguan = false;
        if (liqi_info[seat].yifa > 0)
            liqi_info[seat].yifa--;
        if (is_anye() && anpai === 'anpai')
            addRevealTile(seat, tile, moqie, is_liqi, is_wliqi);
        else {
            addDiscardTile(seat, tile, moqie, is_liqi, is_wliqi, is_kailiqi, tile_state, beishui_type);
            judgeShezhangzt(seat);
            prejudgeZhenting(seat, tile);
        }
        // 完成上个操作的后续
        function lstActionCompletion() {
            // 包杠失效
            base_info.baogang_seat = -1;
            // 开杠翻指示牌
            if (dora_cnt.lastype === 1) {
                dora_cnt.cnt += 1 + dora_cnt.bonus;
                dora_cnt.li_cnt += 1 + dora_cnt.bonus;
                dora_cnt.bonus = dora_cnt.lastype = 0;
            }
        }
    };
    /**
     * 他家鸣牌(吃/碰/明杠), 参数顺序可以不一致, 包含
     * - {Seat} - 鸣牌的玩家, 没有此参数时按照能否可以 明杠/碰/吃 确定鸣牌玩家
     * - {string|string[]} - 鸣牌家从手里拿出来的牌, 没有此参数时将根据能否可以 明杠/碰/吃 确定鸣牌类型
     * - {boolean} - 川麻: 开杠刮风下雨是否击飞, 默认不击飞
     */
    const mingpai = (...args) => {
        let seat, tiles, jifei;
        // 参数预处理
        for (const arg of args)
            if (typeof arg == 'number') {
                if (isValidSeat(arg))
                    seat = arg;
                else
                    throw new Error(errRoundInfo() + `mingpai: 不合规的 seat: ${arg}, 当前对局玩家数: ${base_info.player_cnt}`);
            }
            else if (typeof arg == 'boolean')
                jifei = arg;
            else if (arg instanceof Array || typeof arg == 'string')
                tiles = separate(arg);
        const from = getLstAction().data.seat, tile = getLstAction().data.tile;
        if (seat === undefined)
            if (tiles !== undefined)
                if (!isEqualTile(tiles[0], tile))
                    seat = (from + 1) % base_info.player_cnt;
                else
                    for (let i = from + 1; i < from + base_info.player_cnt; i++) {
                        const tmp_seat = i % base_info.player_cnt;
                        const cnt = {};
                        for (const tile of player_tiles[tmp_seat])
                            if (cnt[simplify(tile)] === undefined)
                                cnt[simplify(tile)] = 0;
                            else
                                cnt[simplify(tile)]++;
                        if (tiles.length === 3 && cnt[simplify(tiles[0])] >= 3)
                            seat = tmp_seat;
                        else if (tiles.length === 2 && cnt[simplify(tiles[0])] >= 2)
                            seat = tmp_seat;
                        if (seat !== undefined)
                            break;
                    }
        if (tiles === undefined) {
            // 明杠
            if (trying([tile, tile, tile], seat))
                return;
            // 碰
            if (trying([tile, tile], seat))
                return;
            // 吃
            if (base_info.player_cnt === 4 && !is_chuanma()) {
                seat = (from + 1) % base_info.player_cnt;
                if (tile[1] !== 'z' && !['1', '2'].includes(tile[0])) // 吃上端
                    if (trying([parseInt(simplify(tile)) - 2 + tile[1], parseInt(simplify(tile)) - 1 + tile[1]], seat))
                        return;
                if (tile[1] !== 'z' && !['1', '9'].includes(tile[0])) // 吃中间
                    if (trying([parseInt(simplify(tile)) - 1 + tile[1], parseInt(simplify(tile)) + 1 + tile[1]], seat))
                        return;
                if (tile[1] !== 'z' && !['8', '9'].includes(tile[0])) // 吃下端
                    if (trying([parseInt(simplify(tile)) + 1 + tile[1], parseInt(simplify(tile)) + 2 + tile[1]], seat))
                        return;
            }
            throw new Error(errRoundInfo() + `mingpai: seat: ${from} 的切牌: ${tile} 没有玩家能 mingpai`);
        }
        if (tiles.length <= 1)
            throw new Error(errRoundInfo() + `mingpai: seat: ${from} 的切牌: ${tile} 后的 mingpai tiles 参数不对: ${tiles}`);
        let liqi = null;
        lstActionCompletion();
        // 鸣出去的牌是否为明牌
        const tile_states = [];
        if (is_begin_open())
            for (const tile of tiles)
                tile_states.push(eraseMingpai(seat, tile));
        let type, tiles_from, fulu_tiles;
        if (!isEqualTile(tiles[0], tile)) { // 吃
            type = 0;
            tiles_from = [seat, seat, from];
            fulu_tiles = [tiles[0], tiles[1], tile];
        }
        else if (tiles.length === 2) { // 碰
            type = 1;
            tiles_from = [seat, seat, from];
            fulu_tiles = [tiles[0], tiles[1], tile];
            // 幻境传说: 庄家卡4
            if (get_field_spell_mode(1) === 4 && seat === base_info.ju)
                dora_cnt.lastype = is_dora_jifan() ? 2 : 1;
        }
        else if (tiles.length === 3) { // 大明杠
            type = 2;
            tiles_from = [seat, seat, seat, from];
            fulu_tiles = [tiles[0], tiles[1], tiles[2], tile];
            // 幻境传说: 庄家卡4
            if (get_field_spell_mode(1) === 4 && seat === base_info.ju)
                dora_cnt.bonus = 1;
            dora_cnt.lastype = is_dora_jifan() ? 2 : 1;
            if (is_chuanma())
                chuanma_gangs.not_over = { from: from, to: seat, val: 2000 };
            else {
                if (!is_guobiao()) {
                    let gang_num = 0; // 查是否四杠子确定, 用于包牌
                    for (const f of fulu[seat])
                        if (f.type === 2 || f.type === 3) // 查杠子个数
                            gang_num++;
                    if (gang_num === 3) // 之前已经有3个杠子, 则第4个杠构成四杠子包牌
                        sigang_bao[seat] = true;
                    if (is_baogang()) // 包杠
                        base_info.baogang_seat = from;
                }
                base_info.draw_type = 0;
            }
        }
        // 副露信息 push 到 fulu
        fulu[seat].push({ type: type, tile: fulu_tiles.slice(), from: from });
        // 从 player_tiles 中移除鸣出去的牌
        for (const tile of tiles)
            player_tiles[seat].splice(player_tiles[seat].indexOf(tile), 1);
        // 幻境传说: 命运卡4
        if (get_field_spell_mode(3) === 4) {
            scores[seat] -= 500;
            scores[from] += 500;
        }
        // 幻境传说: 命运卡5
        if (get_field_spell_mode(3) === 5 && isDora(tile)) {
            scores[seat] -= 2000;
            base_info.liqibang += 2;
        }
        addChiPengGang(seat, fulu_tiles, tiles_from, type, liqi, tile_states);
        // 川麻开杠击飞
        if (jifei)
            roundEnd();
        // 完成上个操作的后续
        function lstActionCompletion() {
            // pass掉上个操作的牌的, pre同巡振听和pre立直振听 转 真实振听
            for (let seat = 0; seat < base_info.player_cnt; seat++) {
                if (zhenting.tongxun[0][seat])
                    zhenting.tongxun[1][seat] = true;
                if (zhenting.liqi[0][seat])
                    zhenting.liqi[1][seat] = true;
            }
            // 破流满
            paihe[from].liujumanguan = false;
            // 龙之目玉: 更新目玉信息
            if (is_muyu() && muyu_info.count === 0)
                updateMuyu();
            // 咏唱之战: 移除最后的切牌
            if (is_yongchang()) {
                shoumoqie[from].pop();
                updateShoumoqie(from);
            }
            // 魂之一击: 破一发
            if (is_hunzhiyiji() && hunzhiyiji_info[from].liqi)
                hunzhiyiji_info[from].overload = true;
            // 立直成功
            liqi = lstLiqi2Liqi();
            for (let seat = 0; seat < base_info.player_cnt; seat++)
                liqi_info[seat].yifa = 0;
        }
        /**
         * 判断玩家能否鸣牌出 x 牌型的牌
         * @param x - 牌型, 组合之一
         * @param seat - 鸣牌的玩家, 可能为 undefined
         */
        function trying(x, seat) {
            const x0 = allEqualTiles(x[0]).reverse(), x1 = allEqualTiles(x[1]).reverse(), x2 = [];
            if (x.length === 3) // 大明杠
                x2.push(...allEqualTiles(x[2]).reverse());
            for (const tile0 of x0)
                for (const tile1 of x1) {
                    const try_tiles = [tile0, tile1];
                    if (x.length === 3) // 大明杠
                        for (const tile2 of x2) {
                            try_tiles.push(tile2);
                            if (tryMingpai(try_tiles))
                                return true;
                            try_tiles.pop();
                        }
                    else if (tryMingpai(try_tiles))
                        return true;
                }
            return false;
            /**
             * 判断 x 牌对应的某个组合 try_tiles 能否有玩家能鸣
             * @param try_tiles - 牌型, 组合之一
             */
            function tryMingpai(try_tiles) {
                for (let i = from + 1; i < from + base_info.player_cnt; i++) {
                    const tmp_seat = i % base_info.player_cnt;
                    if ((seat === tmp_seat || seat === undefined) && inTiles(try_tiles, player_tiles[tmp_seat])) {
                        mingpai(tmp_seat, try_tiles, jifei);
                        return true;
                    }
                }
                return false;
            }
        }
    };
    /**
     * 自家鸣牌(暗杠/加杠/拔北), 参数顺序可以不一致, 包含
     * - {number} - 鸣牌的玩家, 没有此参数时按照正常对局流程
     * - {string} - 要鸣的牌, 没有此参数时按照是否可以"拔北, 暗杠, 加杠"的顺序判断
     * - {ZiMingInputType} - 操作类型, 暗杠/加杠/拔北分别为 'angang'/'jiagang'/'babei', 没有此参数时按照是否可以"拔北, 暗杠, 加杠"的顺序判断
     * - {boolean} - 川麻: 开杠刮风下雨是否击飞, 默认不击飞
     */
    const zimingpai = (...args) => {
        let seat, tile, type, jifei;
        // 参数预处理
        for (const arg of args)
            if (['babei', 'angang', 'jiagang', 'baxi'].includes(arg))
                type = arg;
            else if (typeof arg == 'number') {
                if (isValidSeat(arg))
                    seat = arg;
                else
                    console.error(errRoundInfo() + `zimingpai: 不合规的 seat: ${arg}, 当前对局玩家数: ${base_info.player_cnt}`);
            }
            else if (typeof arg == 'boolean')
                jifei = arg;
            else if (typeof arg == 'string') {
                if (isTile(arg))
                    tile = arg;
                else
                    console.error(errRoundInfo() + `zimingpai: 不合规的牌: ${arg}`);
            }
        if (seat === undefined) {
            seat = getLstAction().data.seat;
            if (seat === undefined)
                throw new Error(errRoundInfo() + `zimingpai: 无法判断谁 zimingpai, getLstAction().name: ${getLstAction().name}`);
        }
        if (jifei === undefined)
            jifei = false;
        if (tile === undefined) {
            if (trying())
                return;
            throw new Error(errRoundInfo() + `zimingpai: seat: ${seat}, xun: ${xun[seat].length}: 玩家无法 zimingpai (没给 tile 情况下)`);
        }
        // 上个操作补完: 开杠翻指示牌
        if (dora_cnt.lastype === 1) {
            dora_cnt.cnt += 1 + dora_cnt.bonus;
            dora_cnt.li_cnt += 1 + dora_cnt.bonus;
            dora_cnt.bonus = dora_cnt.lastype = 0;
        }
        // 和 tile 等效牌的个数
        const tile_cnt = player_tiles[seat].filter(t => isEqualTile(t, tile)).length;
        // 拔北
        let is_babei = tile_cnt >= 1 && (base_info.player_cnt === 3 || base_info.player_cnt === 2) && isEqualTile(tile, '4z') && (!type || type === 'babei');
        // 拔西, 并入拔北
        is_babei || (is_babei = tile_cnt >= 1 && base_info.player_cnt === 2 && isEqualTile(tile, '3z') && (!type || type === 'baxi'));
        // 国标补花'拔花', 需要载入 add_function.js
        is_babei || (is_babei = is_guobiao() && tile === Constants.HUAPAI && type === 'babei' && typeof editFunction == 'function');
        // 强制拔北, 需要载入 add_function.js
        is_babei || (is_babei = tile_cnt >= 1 && type === 'babei' && typeof editFunction == 'function');
        const is_angang = tile_cnt >= 4 && (!type || type === 'angang');
        let is_jiagang = false;
        if (tile_cnt > 0 && (!type || type === 'jiagang') && player_tiles[seat].includes(tile))
            for (const f of fulu[seat])
                if (isEqualTile(f.tile[0], tile) && f.type === 1) {
                    is_jiagang = true;
                    break;
                }
        // 自家鸣牌会使得所有玩家的一发进入特殊状态, 若pass掉则一发立即消失
        for (let seat = 0; seat < base_info.player_cnt; seat++)
            if (liqi_info[seat].yifa > 0)
                liqi_info[seat].yifa = -1;
        // 鸣出去的牌明牌状态
        const tile_states = [];
        if (!is_chuanma())
            base_info.draw_type = 0;
        // 拔北
        if (is_babei) {
            if (is_begin_open())
                tile_states.push(eraseMingpai(seat, tile));
            fulu[seat].push({ type: 4, tile: [tile] });
            player_tiles[seat].splice(player_tiles[seat].lastIndexOf(tile), 1);
            player_tiles[seat].sort(cmp);
            addBaBei(seat, tile, tile_states);
        }
        else if (is_angang || is_jiagang) {
            const ziming_type = is_angang ? 3 : 2;
            // 幻境传说: 庄家卡4
            if (get_field_spell_mode(1) === 4 && seat === base_info.ju)
                dora_cnt.bonus = 1;
            dora_cnt.lastype = is_angang || is_jiagang && is_dora_jifan() ? 2 : 1;
            if (is_angang) {
                const tmp_fulu = { type: 3, tile: [] };
                let tile_num = 0;
                for (let i = player_tiles[seat].length - 1; i >= 0; i--)
                    if (isEqualTile(tile, player_tiles[seat][i])) {
                        if (is_begin_open())
                            tile_states.push(eraseMingpai(seat, player_tiles[seat][i]));
                        tmp_fulu.tile.push(player_tiles[seat][i]);
                        player_tiles[seat].splice(i, 1);
                        tile_num++;
                        if (tile_num >= 4)
                            break;
                    }
                tmp_fulu.tile.sort(cmp);
                tmp_fulu.tile = [tmp_fulu.tile[0], tmp_fulu.tile[2], tmp_fulu.tile[3], tmp_fulu.tile[1]]; // 让红宝牌显露
                fulu[seat].push(tmp_fulu);
                if (is_chuanma())
                    for (let from_seat = 0; from_seat < base_info.player_cnt; from_seat++) {
                        if (from_seat === seat || huled[from_seat])
                            continue;
                        chuanma_gangs.not_over = { from: from_seat, to: seat, val: 2000 };
                    }
            }
            else {
                if (is_begin_open())
                    tile_states.push(eraseMingpai(seat, tile));
                let index;
                for (const f of fulu[seat])
                    if (isEqualTile(f.tile[0], tile) && f.type === 1) {
                        f.type = 2;
                        f.tile.push(tile);
                        index = player_tiles[seat].lastIndexOf(tile);
                        player_tiles[seat].splice(index, 1);
                        break;
                    }
                // 本来应该是 player_tiles[seat].length - 1, 但因上面 splice 长度减1, 这里就加1
                if (is_chuanma() && index === player_tiles[seat].length)
                    for (let from_seat = 0; from_seat < base_info.player_cnt; from_seat++) {
                        if (from_seat === seat || huled[from_seat])
                            continue;
                        chuanma_gangs.not_over = { from: from_seat, to: seat, val: 1000 };
                    }
            }
            player_tiles[seat].sort(cmp);
            addAnGangAddGang(seat, tile, ziming_type, tile_states);
            if (jifei)
                roundEnd();
        }
        else
            throw new Error(errRoundInfo() + `zimingpai: seat: ${seat}, xun: ${xun[seat].length}: 玩家无法 zimingpai (给定 tile: ${tile} 情况下)`);
        // seat 号玩家尝试自家鸣牌, 按照顺序: 国标补花, 拔北, 拔西, 暗杠, 加杠
        function trying() {
            // 国标补花
            if (is_guobiao() && typeof editFunction == 'function' && inTiles(Constants.HUAPAI, player_tiles[seat])) {
                zimingpai(seat, Constants.HUAPAI, 'babei');
                return true;
            }
            let all_tiles;
            // 拔北
            if (base_info.player_cnt === 2 || base_info.player_cnt === 3) {
                all_tiles = allEqualTiles('4z').reverse();
                for (const tile of all_tiles)
                    if (inTiles(tile, player_tiles[seat])) {
                        zimingpai(seat, tile, 'babei');
                        return true;
                    }
            }
            // 拔西
            if (base_info.player_cnt === 2 && typeof editFunction == 'function') {
                all_tiles = allEqualTiles('3z').reverse();
                for (const tile of all_tiles)
                    if (inTiles(tile, player_tiles[seat])) {
                        zimingpai(seat, tile, 'babei');
                        return true;
                    }
            }
            // 暗杠
            for (const tile of player_tiles[seat]) {
                all_tiles = allEqualTiles(tile).reverse();
                for (const tile0 of all_tiles)
                    for (const tile1 of all_tiles)
                        for (const tile2 of all_tiles)
                            for (const tile3 of all_tiles) {
                                const tmp_angang = [tile0, tile1, tile2, tile3];
                                if (inTiles(tmp_angang, player_tiles[seat])) {
                                    zimingpai(seat, tile0, 'angang', jifei);
                                    return true;
                                }
                            }
            }
            // 加杠
            for (const tile of player_tiles[seat]) {
                all_tiles = allEqualTiles(tile).reverse();
                for (const tile of all_tiles)
                    if (inTiles(tile, player_tiles[seat])) {
                        let can_jiagang = false;
                        for (const f of fulu[seat])
                            if (isEqualTile(f.tile[0], tile) && f.type === 1) {
                                can_jiagang = true;
                                break;
                            }
                        if (can_jiagang) {
                            zimingpai(seat, tile, 'jiagang', jifei);
                            return true;
                        }
                    }
            }
            return false;
        }
    };
    /**
     * 和牌, 参数顺序可以不一致, 包含
     * - {Seat|Seat[]} - 本次和牌所有和牌的玩家, 没有此参数时按照正常对局流程
     * - {boolean} - 修罗/川麻: 是否为最终和牌, 默认为中途和牌
     */
    const hupai = (...args) => {
        let seats, type;
        // 参数预处理
        for (const arg of args)
            if (typeof arg == 'number') {
                if (isValidSeat(arg))
                    seats = [arg];
                else
                    console.error(errRoundInfo() + `hupai: 不合规的 seat: ${arg}, 当前对局玩家数: ${base_info.player_cnt}`);
            }
            else if (arg instanceof Array) {
                for (const s of arg)
                    if (typeof s != "number" || !isValidSeat(s))
                        console.error(errRoundInfo() + `hupai: 不合规的 seat: ${s}, 当前对局玩家数: ${base_info.player_cnt}`);
                seats = arg;
            }
            else if (typeof arg == 'boolean')
                type = arg;
        // 川麻枪杠, 则杠不收取点数
        if (is_chuanma())
            chuanma_gangs.not_over = null;
        if (type === undefined)
            type = false;
        if (seats === undefined || seats.length === 0) {
            const lst_name = getLstAction().name, lst_seat = getLstAction().data.seat;
            if (['RecordDealTile', 'RecordNewRound'].includes(lst_name))
                seats = [lst_seat];
            else { // 荣和
                seats = [];
                for (let i = lst_seat + 1; i < lst_seat + base_info.player_cnt; i++) {
                    const seat = i % base_info.player_cnt;
                    if (huled[seat])
                        continue;
                    push2PlayerTiles(seat);
                    if ((is_chuanma() || is_guobiao() && !cuohu[seat] || !is_chuanma() && !is_guobiao() && !zhenting.result[seat]) && calcHupai(player_tiles[seat]) !== 0) {
                        if (!is_chuanma() && !is_guobiao() && !is_ronghuzhahu()) { // 非川麻国标防止自动无役荣和诈和
                            const points = calcFan(seat, false, lst_seat);
                            if (calcSudian(points) !== -2e3)
                                seats.push(seat);
                        }
                        else
                            seats.push(seat);
                    }
                    player_tiles[seat].pop();
                    if (!is_chuanma() && (is_toutiao() || is_mingjing() || is_guobiao()) && seats.length >= 1)
                        break;
                }
            }
            if (seats.length === 0) // 没给参数 seat 的情况下, 无人能正常和牌
                throw new Error(errRoundInfo() + 'hupai: 没给 seat 参数无人能正常和牌');
        }
        // seats 重新排序, 按照放铳家逆时针顺序
        if (seats.length > 1) {
            const lst_name = getLstAction().name;
            let lst_seat = getLstAction().data.seat;
            if (['RecordNewRound', 'RecordDealTile'].includes(lst_name))
                lst_seat = (lst_seat + base_info.player_cnt - 1) % base_info.player_cnt;
            const hupai_seats = [false, false, false, false];
            for (const seat of seats)
                hupai_seats[seat] = true;
            seats = [];
            for (let i = lst_seat + 1; i <= lst_seat + base_info.player_cnt; i++)
                if (hupai_seats[i % base_info.player_cnt])
                    seats.push(i % base_info.player_cnt);
        }
        if (is_toutiao() || is_mingjing() || is_guobiao()) // 有头跳且参数给了至少两家和牌的情况, 则取头跳家
            seats = [seats[0]];
        // 非血战到底, 血流成河模式
        if (!is_xuezhandaodi() && !is_wanxiangxiuluo() && !is_chuanma() && !is_xueliu()) {
            const ret = [];
            // 包牌的玩家+1, 逐渐弃用
            let baopai_player = 0;
            for (const seat of seats)
                ret.push(!is_guobiao() ? huleOnePlayer(seat) : huleOnePlayerGuobiao(seat));
            // 国标错和陪打
            if (is_guobiao() && is_cuohupeida() && typeof editFunction == 'function' && ret[0].cuohu) {
                const old_scores = scores.slice();
                for (let seat = 0; seat < base_info.player_cnt; seat++)
                    if (seat === seats[0])
                        delta_scores[seat] = -3 * cuohu_points() * scale_points();
                    else
                        delta_scores[seat] = cuohu_points() * scale_points();
                for (let seat = 0; seat < base_info.player_cnt; seat++)
                    scores[seat] += delta_scores[seat];
                addCuohu(seats[0], ret[0].zimo, old_scores);
                for (let seat = 0; seat < base_info.player_cnt; seat++)
                    delta_scores[seat] = 0;
                cuohu[seats[0]] = true;
                return;
            }
            for (const seat of seats)
                huled[seat] = true;
            // '包'字的选择
            // 包牌比包杠优先, 因为雀魂目前没有包杠, 以雀魂为主
            if (!is_guobiao() && base_info.baogang_seat !== -1)
                baopai_player = base_info.baogang_seat + 1;
            base_info.baogang_seat = -1;
            // 多家包牌, 自摸情况下以最先包牌的玩家为准
            // 荣和情况下, 以距放铳玩家最近的玩家的最先包牌的玩家为准
            if (!is_guobiao())
                for (const seat of seats)
                    if (baopai[seat].length > 0) {
                        baopai_player = baopai[seat][0].seat + 1;
                        break;
                    }
            const old_scores = scores.slice();
            for (let seat = 0; seat < base_info.player_cnt; seat++)
                scores[seat] += delta_scores[seat];
            endHule(ret, old_scores, baopai_player);
            for (let seat = 0; seat < base_info.player_cnt; seat++)
                delta_scores[seat] = 0;
            if (huled[base_info.ju]) { // 亲家和牌, 则连庄
                if (!is_guobiao() || is_guobiao() && is_guobiao_lianzhuang())
                    base_info.ben++;
                // 幻境传说: 庄家卡2
                if (get_field_spell_mode(1) === 2)
                    base_info.ben += 4;
                base_info.lianzhuang_cnt++;
            }
            else {
                base_info.ju++;
                base_info.ben = 0;
                base_info.lianzhuang_cnt = 0;
            }
            roundEnd();
        }
        else {
            // 血流成河模式中, 和牌家prezhenting消失
            for (const seat of seats) {
                zhenting.tongxun[0][seat] = zhenting.tongxun[1][seat] = false;
                zhenting.liqi[0][seat] = zhenting.tongxun[1][seat] = false;
            }
            updateZhenting();
            const ret = [];
            for (const seat of seats) {
                const whatever = !is_chuanma() ? huleOnePlayer(seat) : huleOnePlayerChuanma(seat);
                ret.push(whatever);
                hules_history.push(whatever);
            }
            if (is_chuanma() && base_info.first_hu_seat === -1)
                base_info.first_hu_seat = seats[0];
            if (!is_xueliu())
                for (const seat of seats)
                    huled[seat] = true;
            const old_scores = scores.slice();
            for (let seat = 0; seat < base_info.player_cnt; seat++)
                scores[seat] += delta_scores[seat];
            if (!type) {
                let liqi = null;
                if (lst_liqi.valid) {
                    if (scores[lst_liqi.seat] >= 1000 * base_info.liqi_need || is_fufenliqi())
                        liqi = {
                            seat: lst_liqi.seat,
                            liqibang: base_info.liqibang + base_info.liqi_need,
                            score: scores[lst_liqi.seat] - 1000 * base_info.liqi_need,
                        };
                    else
                        liqi = {
                            seat: lst_liqi.seat,
                            liqibang: base_info.liqibang,
                            score: scores[lst_liqi.seat],
                            failed: true,
                        };
                }
                if (!is_chuanma())
                    for (let seat = 0; seat < base_info.player_cnt; seat++)
                        liqi_info[seat].yifa = 0;
                if (!is_xueliu())
                    addHuleXueZhanMid(ret, old_scores, liqi);
                else
                    addHuleXueLiuMid(ret, old_scores);
                if (lst_liqi.valid && (scores[lst_liqi.seat] >= 1000 * base_info.liqi_need || is_fufenliqi())) {
                    base_info.liqibang += base_info.liqi_need;
                    scores[lst_liqi.seat] -= 1000 * base_info.liqi_need;
                    liqi_info[lst_liqi.seat] = { liqi: lst_liqi.liqi, yifa: 0, kai: lst_liqi.kai };
                }
                lst_liqi.valid = false;
            }
            else {
                if (!is_xueliu())
                    endHuleXueZhanEnd(ret, old_scores);
                else
                    endHuleXueLiuEnd(ret, old_scores);
            }
            for (let seat = 0; seat < base_info.player_cnt; seat++)
                delta_scores[seat] = 0;
            if (type) {
                if (!is_chuanma())
                    base_info.ju++;
                roundEnd();
            }
        }
    };
    /**
     * 荒牌流局, 任何时刻都可以调用
     */
    const huangpai = () => {
        // 暗夜之战暗牌无人开
        if (is_anye() && getLstAction().name === 'RecordRevealTile')
            addLockTile(getLstAction().data.seat, 2);
        // 幻境传说: 庄家卡3
        if (get_field_spell_mode(1) === 3) {
            scores[base_info.ju] += base_info.liqibang * 1000;
            base_info.liqibang = 0;
        }
        base_info.lianzhuang_cnt = 0; // 任意荒牌流局都会导致连庄数重置
        // 剩余玩家数, 听牌玩家数
        let player_left = 0, ting_cnt = 0;
        // 川麻未听返杠的点数
        const taxes = [0, 0, 0, 0];
        // 玩家的听牌信息
        const ting_info = [];
        for (let seat = 0; seat < base_info.player_cnt; seat++) {
            if (!huled[seat])
                player_left++;
            const tings = huled[seat] ? [] : calcTingpai(seat);
            if (tings.length === 0)
                ting_info.push({ tingpai: false, hand: [], tings: tings });
            else {
                ting_cnt++;
                ting_info.push({ tingpai: true, hand: player_tiles[seat].slice(), tings: tings });
            }
        }
        const no_ting_cnt = player_left - ting_cnt; // 未听玩家数
        // 幻境传说: 命运卡1
        // 流局满贯/罚符倍数
        const times = get_field_spell_mode(3) === 1 ? 2 : 1;
        // 玩家的点数变动信息
        let scores_info = [];
        // 是否有流满
        let liujumanguan = false;
        if (!is_chuanma() && !is_guobiao())
            for (let seat = 0; seat < base_info.player_cnt; seat++)
                if (paihe[seat].liujumanguan && !huled[seat])
                    liujumanguan = true;
        if (liujumanguan)
            for (let i = base_info.ju; i < base_info.ju + base_info.player_cnt; i++) {
                const seat = i % base_info.player_cnt;
                if (!paihe[seat].liujumanguan || huled[seat])
                    continue;
                const cur_delta_scores = [0, 0];
                for (let seat = 0; seat < base_info.player_cnt; seat++)
                    cur_delta_scores[seat] = 0;
                const score = calcScore(seat, cur_delta_scores);
                scores_info.push({
                    seat: seat,
                    score: score,
                    old_scores: scores.slice(),
                    delta_scores: cur_delta_scores,
                    hand: player_tiles[seat].slice(),
                    ming: fulu2Ming(seat),
                    doras: calcDoras(),
                });
            }
        else {
            // 罚符, 川麻查大叫, 花猪
            if (ting_cnt !== 0 && no_ting_cnt !== 0 && !is_guobiao()) {
                if (!is_chuanma()) {
                    const fafu = get_fafu(ting_cnt, no_ting_cnt);
                    for (let seat = 0; seat < base_info.player_cnt; seat++) {
                        if (huled[seat])
                            continue;
                        if (ting_info[seat].tingpai) // 幻境传说: 命运卡1
                            delta_scores[seat] += fafu * no_ting_cnt / ting_cnt * times;
                        else
                            delta_scores[seat] -= fafu * times;
                    }
                }
                else { // seat 向 tmp_seat 查大叫, 查花猪
                    for (let seat = 0; seat < base_info.player_cnt; seat++) {
                        for (let tmp_seat = 0; tmp_seat < base_info.player_cnt; tmp_seat++) {
                            if (huled[seat] || huled[tmp_seat] || tmp_seat === seat)
                                continue;
                            let points = 0;
                            if (isHuazhu(tmp_seat))
                                points = Math.max(calcSudianChuanma(calcFanChuanma(seat, false, true)), 8000);
                            else if (!ting_info[tmp_seat].tingpai && ting_info[seat].tingpai)
                                points = calcSudianChuanma(calcFanChuanma(seat, false, true));
                            delta_scores[seat] += points;
                            delta_scores[tmp_seat] -= points;
                        }
                    }
                }
            }
            // 川麻未听返杠
            if (is_chuanma())
                for (const gang of chuanma_gangs.over) {
                    const from = gang.from, to = gang.to, val = gang.val;
                    if (!(ting_info[to].tingpai || huled[to])) {
                        taxes[to] -= val;
                        taxes[from] += val;
                    }
                }
            scores_info = [{
                    old_scores: scores.slice(),
                    delta_scores: delta_scores.slice(),
                    taxes: is_chuanma() ? taxes.slice() : undefined,
                }];
        }
        endNoTile(liujumanguan, ting_info, scores_info);
        for (let seat = 0; seat < base_info.player_cnt; seat++) {
            scores[seat] += delta_scores[seat] + taxes[seat];
            delta_scores[seat] = taxes[seat] = 0;
        }
        if (!is_xuezhandaodi() && !is_wanxiangxiuluo() && !is_chuanma())
            base_info.ben += get_field_spell_mode(1) === 2 ? 5 : 1; // 幻境传说: 庄家卡2
        if ((!ting_info[base_info.ju].tingpai || is_xuezhandaodi() || is_wanxiangxiuluo() || is_guobiao() && !is_guobiao_lianzhuang()) && !is_chuanma())
            base_info.ju++;
        roundEnd();
        /**
         * 计算 seat 号玩家的流局满贯导致的各家点数变动, 并返回流满点数
         * @param seat - seat 号玩家
         * @param cur_delta_scores - 该流满导致的玩家点数变动
         */
        function calcScore(seat, cur_delta_scores) {
            let score = 0;
            for (let tmp_seat = 0; tmp_seat < base_info.player_cnt; tmp_seat++) {
                if (seat === tmp_seat || huled[tmp_seat])
                    continue;
                // 幻境传说: 命运卡1
                if (seat === base_info.ju || tmp_seat === base_info.ju) {
                    cur_delta_scores[tmp_seat] -= 4000 * times;
                    cur_delta_scores[seat] += 4000 * times;
                    score += 4000 * times;
                }
                else {
                    cur_delta_scores[tmp_seat] -= 2000 * times;
                    cur_delta_scores[seat] += 2000 * times;
                    score += 2000 * times;
                }
            }
            if ((base_info.player_cnt === 3 || base_info.player_cnt === 2) && no_zimosun()) {
                const base_points = base_info.player_cnt === 3 ? 1000 : 4000;
                for (let tmp_seat = 0; tmp_seat < base_info.player_cnt; tmp_seat++) {
                    if (seat === tmp_seat || huled[tmp_seat])
                        continue;
                    if (seat === base_info.ju) {
                        cur_delta_scores[tmp_seat] -= base_points * 2;
                        cur_delta_scores[seat] += base_points * 2;
                        score += base_points * 2;
                    }
                    else {
                        cur_delta_scores[tmp_seat] -= base_points;
                        cur_delta_scores[seat] += base_points;
                        score += base_points;
                    }
                }
            }
            for (let seat = 0; seat < base_info.player_cnt; seat++)
                delta_scores[seat] += cur_delta_scores[seat];
            return score;
        }
    };
    /**
     * 途中流局
     * @param liuju_type - 流局类型, 若没有该参数, 则除了"三家和了"外, 由系统自动判断属于哪种流局
     */
    const liuju = (liuju_type) => {
        const all_liuju = [jiuZhongJiuPai, siFengLianDa, siGangSanLe, siJiaLiZhi, sanJiaHuLe];
        const seat = getLstAction().data.seat;
        let type, tiles;
        const allplayertiles = ['', '', '', ''];
        for (let seat = 0; seat < base_info.player_cnt; seat++)
            allplayertiles[seat] = player_tiles[seat].join('|');
        if (typeof liuju_type == 'number')
            all_liuju[liuju_type - 1]();
        else
            for (const liuju_i of all_liuju) {
                liuju_i();
                if (type !== undefined)
                    break;
            }
        const liqi = lstLiqi2Liqi();
        if (type !== undefined) {
            endLiuJu(type, seat, liqi, tiles, allplayertiles);
            if (!is_xuezhandaodi() && !is_wanxiangxiuluo() && !is_chuanma() && !is_guobiao())
                base_info.ben += get_field_spell_mode(1) === 2 ? 5 : 1; // 幻境传说: 庄家卡2
            roundEnd();
        }
        else
            throw new Error(errRoundInfo() + 'liuju: 不符合任何途中流局条件');
        // 九种九牌
        function jiuZhongJiuPai() {
            const has_tile = [];
            let type_num = 0;
            for (const tile of player_tiles[seat])
                if (Constants.YAOJIU_TILE.includes(simplify(tile)) && !has_tile[simplify(tile)]) {
                    has_tile[simplify(tile)] = true;
                    type_num++;
                }
            if (type_num >= 9 && liqi_info[seat].liqi === 0 && liqi_info[seat].yifa === 1 && player_tiles[seat].length === 14) {
                type = 1;
                tiles = player_tiles[seat].slice();
            }
            if (liuju_type !== undefined) {
                type = 1;
                tiles = player_tiles[seat].slice();
            }
        }
        // 四风连打
        function siFengLianDa() {
            if (base_info.player_cnt === 4)
                if (fulu[0].length === 0 && fulu[1].length === 0 && fulu[2].length === 0 && fulu[3].length === 0)
                    if (paihe[0].tiles.length === 1 && paihe[1].tiles.length === 1 && paihe[2].tiles.length === 1 && paihe[3].tiles.length === 1)
                        if (isEqualTile(paihe[0].tiles[0], paihe[1].tiles[0]) && isEqualTile(paihe[1].tiles[0], paihe[2].tiles[0]) && isEqualTile(paihe[2].tiles[0], paihe[3].tiles[0]))
                            if (Constants.WIND_TILE.includes(simplify(paihe[0].tiles[0])))
                                type = 2;
            if (liuju_type !== undefined)
                type = 2;
        }
        // 四杠散了
        function siGangSanLe() {
            let gang_player_cnt = 0;
            for (let seat = 0; seat < base_info.player_cnt; seat++)
                for (let f of fulu[seat])
                    if (f.type === 2 || f.type === 3) {
                        gang_player_cnt++;
                        break;
                    }
            if (dora_cnt.cnt === 5 && gang_player_cnt >= 2)
                type = 3;
            if (liuju_type !== undefined)
                type = 3;
        }
        // 四家立直
        function siJiaLiZhi() {
            if (base_info.player_cnt === 4) {
                let liqi_player_cnt = 0;
                for (let seat = 0; seat < base_info.player_cnt; seat++)
                    if (liqi_info[seat].liqi !== 0)
                        liqi_player_cnt++;
                if (lst_liqi.valid && liqi_player_cnt === 3)
                    type = 4;
            }
            if (liuju_type !== undefined)
                type = 4;
        }
        // 三家和了, 需要设置 'have_sanjiahele'
        function sanJiaHuLe() {
            if (is_sanxiangliuju())
                type = 5;
        }
    };
    // 使 gameBegin 每个牌谱只运行一次的变量
    let game_begin_once;
    // 使 roundBegin 每个小局只运行一次的变量
    let round_begin_once;
    // 只在一开局生效或者整个对局期间都不会变化的数据的初始化
    const gameBegin = () => {
        if (!game_begin_once)
            return;
        if (config.mode.mode >= 20 && config.mode.mode <= 29)
            base_info.player_cnt = 2;
        else if (config.mode.mode >= 10 && config.mode.mode <= 19)
            base_info.player_cnt = 3;
        else
            base_info.player_cnt = 4;
        all_data.config = config;
        player_datas.splice(base_info.player_cnt);
        all_data.player_datas = player_datas;
        if (base_info.player_cnt === 3 || base_info.player_cnt === 2) { // 三麻, 二麻屏蔽以下模式
            const x = config.mode.detail_rule;
            x.wanxiangxiuluo_mode = x.xuezhandaodi = x.muyu_mode = x.chuanma = false;
        }
        base_info.liqi_need = get_liqi_need();
        if (get_field_spell_mode(3) === 2) // 幻境传说: 命运卡2
            base_info.liqi_need = 2;
        [base_info.chang, base_info.ju, base_info.ben, base_info.liqibang] = get_chang_ju_ben_num();
        if (!base_info.liqibang)
            base_info.liqibang = 0;
        base_info.lianzhuang_cnt = 0;
        let init_point = get_init_point();
        if (init_point === -1) {
            if (base_info.player_cnt === 2) // 二麻
                init_point = 50000;
            else if (base_info.player_cnt === 3) // 三麻
                init_point = 35000;
            else { // 四麻
                if (is_guobiao())
                    init_point = 300 * scale_points();
                else if (is_chuanma() || is_tianming())
                    init_point = 50000;
                else if (is_muyu())
                    init_point = 40000;
                else if (is_dora3())
                    init_point = 35000;
                else
                    init_point = 25000;
            }
        }
        scores.splice(base_info.player_cnt);
        for (let seat = 0; seat < base_info.player_cnt; seat++)
            scores[seat] = init_point;
        base_info.base_point = scores[0];
        const tmp_scores = get_init_scores();
        for (const seat of tmp_scores.keys())
            scores[seat] = tmp_scores[seat];
        base_info.all_tile_nums = getTileNum();
        game_begin_once = false;
    };
    // 开局, 数据初始化
    const roundBegin = () => {
        gameBegin();
        if (!round_begin_once)
            return;
        for (let seat = 0; seat < base_info.player_cnt; seat++) {
            fulu[seat] = [];
            baopai[seat] = [];
            xun[seat] = [];
            shoumoqie[seat] = [];
            huled[seat] = false;
            sigang_bao[seat] = false;
            cuohu[seat] = false;
            zhenting.tongxun[0][seat] = false;
            zhenting.tongxun[1][seat] = false;
            zhenting.liqi[0][seat] = false;
            zhenting.liqi[1][seat] = false;
            zhenting.shezhang[seat] = false;
            zhenting.result[seat] = false;
            gaps[seat] = 0;
            delta_scores[seat] = 0;
            spell_hourglass[seat] = 0;
            muyu.times[seat] = 1;
            mingpais[seat] = {};
            paihe[seat] = { liujumanguan: !no_liujumanguan(), tiles: [] };
            liqi_info[seat] = { liqi: 0, yifa: 1, kai: false };
            hunzhiyiji_info[seat] = { seat: seat, liqi: 0, continue_deal_count: 0, overload: false };
            yongchang_data[seat] = { seat: seat, moqie_count: 0, moqie_bonus: 0, shouqie_count: 0, shouqie_bonus: 0 };
        }
        muyu_info.id = muyu_info.seat = muyu_info.count = 0;
        lst_liqi.valid = false;
        chuanma_gangs.over = [];
        chuanma_gangs.not_over = null;
        dora_cnt.cnt = dora_cnt.li_cnt = is_dora3() || is_muyu() ? 3 : 1;
        dora_cnt.lastype = dora_cnt.bonus = 0;
        hules_history.length = 0;
        base_info.first_hu_seat = -1;
        base_info.benchangbang = base_info.ben;
        base_info.lst_draw_type = base_info.draw_type = 1;
        base_info.baogang_seat = -1;
        awaiting_tiles.length = 0;
        dora_indicator[0].length = dora_indicator[1].length = 0;
        for (let i = 0; i < 5; i++) {
            dora_indicator[0].push(paishan[paishan.length - (21 - 4 * base_info.player_cnt + 2 * i)]);
            dora_indicator[1].push(paishan[paishan.length - (22 - 4 * base_info.player_cnt + 2 * i)]);
        }
        const tiles = [separate(begin_tiles[0]), separate(begin_tiles[1]), separate(begin_tiles[2]), separate(begin_tiles[3])];
        if (tiles[0].length === 0 && tiles[1].length === 0 && tiles[2].length === 0 && tiles[3].length === 0) { // 没有给定起手, 则模仿现实中摸牌
            for (let i = 0; i < 3; i++)
                for (let seat = 0; seat < base_info.player_cnt; seat++)
                    for (let k = 0; k < 4; k++)
                        tiles[seat].push(paishan.shift());
            for (let seat = 0; seat < base_info.player_cnt; seat++)
                tiles[seat].push(paishan.shift());
            tiles[0].push(paishan.shift());
            tiles.push(...tiles.splice(0, base_info.ju));
        }
        for (let seat = 0; seat < base_info.player_cnt; seat++) {
            tiles[seat].sort(cmp);
            player_tiles[seat] = tiles[seat];
        }
        // 剩余牌数量
        const left_cnt = getLeftTileCnt();
        let opens = undefined;
        if (is_begin_open() || is_openhand()) {
            opens = [null, null];
            for (let seat = 0; seat < base_info.player_cnt; seat++) {
                const ret = { seat: seat, tiles: [], count: [] };
                const tiles = player_tiles[seat], cnt = {};
                for (const tile of Constants.TILE)
                    cnt[tile] = 0;
                for (const tile of tiles)
                    cnt[tile]++;
                mingpais[seat] = cnt;
                for (const tile of Object.keys(cnt)) {
                    ret.tiles.push(tile);
                    ret.count.push(cnt[tile]);
                }
                opens[seat] = ret;
            }
        }
        if (is_muyu())
            updateMuyu();
        paishan.splice(Constants.PAISHAN_MAX_LEN);
        // 添加起手进牌山
        let begin_len = 0, is_sha256 = false, has_integrity = true;
        const qishou_tiles = [], random_tiles = [[], [], [], []];
        for (let seat = 0; seat < base_info.player_cnt; seat++) {
            if (seat === base_info.ju) {
                if (player_tiles[seat].length !== Constants.QIN_TILE_NUM)
                    has_integrity = false;
            }
            else if (player_tiles[seat].length !== Constants.XIAN_TILE_NUM)
                has_integrity = false;
            for (const tile of player_tiles[seat])
                if (tile !== Constants.TBD) {
                    begin_len++;
                    random_tiles[seat].push(is_tianming() ? tile[0] + tile[1] : tile);
                }
            random_tiles[seat].sort(randomCmp);
        }
        if (has_integrity && begin_len + paishan.length <= Constants.PAISHAN_MAX_LEN) {
            is_sha256 = true;
            for (let i = 0; i < 3; i++)
                for (let j = base_info.ju; j < base_info.ju + base_info.player_cnt; j++)
                    for (let k = 0; k < 4; k++)
                        if (i * 4 + k < random_tiles[j % base_info.player_cnt].length)
                            qishou_tiles.push(random_tiles[j % base_info.player_cnt][i * 4 + k]);
            for (let j = base_info.ju; j < base_info.ju + base_info.player_cnt; j++)
                if (random_tiles[j % base_info.player_cnt].length > 12)
                    qishou_tiles.push(random_tiles[j % base_info.player_cnt][12]);
            if (random_tiles[base_info.ju].length > 13)
                qishou_tiles.push(random_tiles[base_info.ju][13]);
            paishan.unshift(...qishou_tiles);
        }
        const hash_code_set = '0123456789abcdef';
        const hash_len = is_sha256 ? 64 : 32;
        let fake_hash_code = '';
        for (let i = 0; i < hash_len; i++)
            fake_hash_code += hash_code_set[Math.floor(hash_code_set.length * Math.random())];
        addNewRound(left_cnt, fake_hash_code, opens, is_sha256);
        if (is_sha256)
            paishan.splice(0, begin_len);
        round_begin_once = false;
    };
    // 小局结束
    const roundEnd = () => {
        if (all_data.cur_actions.length === 0)
            return;
        if (is_chuanma() && chuanma_gangs.not_over && getLstAction().name !== 'RecordNoTile' && getLstAction().name !== 'RecordHuleXueZhanEnd')
            calcGangPoint(true);
        all_data.all_actions.push(all_data.cur_actions.slice());
        all_data.xun.push(xun.slice());
        for (let seat = 0; seat < base_info.player_cnt; seat++) {
            begin_tiles[seat] = '';
            discard_tiles[seat] = [];
            deal_tiles[seat] = [];
            xun[seat] = [];
        }
        muyu.seats = '';
        paishan.length = 0;
        all_data.cur_actions.length = 0;
        if (is_chuanma() && base_info.first_hu_seat !== -1)
            base_info.ju = base_info.first_hu_seat;
        if (base_info.ju === base_info.player_cnt) {
            base_info.chang++;
            base_info.ju = 0;
        }
        base_info.chang %= base_info.player_cnt;
        gameEnd();
        round_begin_once = true;
    };
    // 计算终局界面玩家的点数
    const gameEnd = () => {
        /**
         * 根据最终点数和座次确定位次的比较算法
         * @param x - 参数1玩家的信息
         * @param y - 参数2玩家的信息
         */
        const cmp2 = (x, y) => {
            if (x.part_point_1 < y.part_point_1)
                return 1;
            if (x.part_point_1 > y.part_point_1)
                return -1;
            if (x.seat > y.seat)
                return 1;
            if (x.seat < y.seat)
                return -1;
            return 0;
        };
        const players = [null, null];
        for (let seat = 0; seat < base_info.player_cnt; seat++)
            players[seat] = {
                seat: seat,
                gold: 0,
                grading_score: 0,
                part_point_1: scores[seat],
                part_point_2: 0,
                total_point: 0,
            };
        players.sort(cmp2);
        players[0].part_point_1 += base_info.liqibang * 1000;
        const madian = [[5, -5], [10, 0, -10], [15, 5, -5, -15]];
        for (let seat = 1; seat < base_info.player_cnt; seat++) {
            players[seat].total_point = players[seat].part_point_1 - base_info.base_point + madian[base_info.player_cnt - 2][seat] * 1000;
            players[0].total_point -= players[seat].total_point;
        }
        all_data.players = players;
        editOffline();
    };

    /**
     * @file: shortFunction.ts - 一些要 export 的比较简短的函数
     * @author: Fat-pig-Cui
     * @email: chubbypig@qq.com
     * @github: https://github.com/Fat-pig-Cui/majsoul-replay-editor
     */
    /**
     * 设置对局的模式
     */
    const setConfig = (c) => {
        for (const key of Object.keys(c))
            config[key] = c[key];
    };
    /**
     * 设置玩家的切牌集合
     */
    const setDiscardTiles = (tiles) => {
        for (const seat of Object.keys(tiles))
            discard_tiles[seat] = separateWithMoqie(tiles[seat]);
    };
    /**
     * 设置玩家的摸牌集合
     */
    const setDealTiles = (tiles) => {
        for (const seat of Object.keys(tiles))
            deal_tiles[seat] = separateWithMoqie(tiles[seat]);
    };
    /**
     * 手动设置牌山(参数不含起手)
     */
    const setPaishan = (ps) => {
        paishan.push(...separate(ps));
        roundBegin();
    };
    /**
     * 跳转局数
     * @param chang - 场, 0,1,2,3 分别表示 东,南,西,北 场
     * @param ju - 局, seat 为 ju 坐庄
     * @param ben - 本, 本场数
     */
    const setRound = (chang, ju, ben) => {
        [base_info.chang, base_info.ju, base_info.ben] = [chang, ju, ben];
    };
    /**
     * 设置玩家的实时点数
     */
    const setScores = (s) => {
        for (let i = 0; i < base_info.player_cnt; i++)
            scores[i] = s[i];
    };

    /**
     * @file: simplifyFunction.ts - 便捷函数
     * @author: Fat-pig-Cui
     * @email: chubbypig@qq.com
     * @github: https://github.com/Fat-pig-Cui/majsoul-replay-editor
     */
    /**
     * 便捷函数: 正常摸切
     * @param tile_cnt - 要切的牌(Tile)或循环次数(number), 默认为1
     */
    const normalMoqie = (tile_cnt) => {
        if (tile_cnt === undefined)
            tile_cnt = 1;
        if (typeof tile_cnt == 'number')
            for (let i = 0; i < tile_cnt; i++) {
                mopai();
                qiepai();
            }
        else if (typeof tile_cnt == 'string') {
            mopai();
            qiepai(tile_cnt);
        }
        else
            throw new Error(errRoundInfo() + `normalMoqie: tile_cnt 参数不合规: ${tile_cnt}`);
    };
    /**
     * 便捷函数: 摸牌立直
     * @param tile_cnt - 要切的牌(Tile)或循环次数(number), 默认为1
     */
    const moqieLiqi = (tile_cnt) => {
        if (tile_cnt === undefined)
            tile_cnt = 1;
        if (typeof tile_cnt == 'number')
            for (let i = 0; i < tile_cnt; i++) {
                mopai();
                qiepai(true);
            }
        else if (typeof tile_cnt == 'string') {
            mopai();
            qiepai(tile_cnt, true);
        }
        else
            throw new Error(errRoundInfo() + `moqieLiqi: tile_cnt 参数不合规: ${tile_cnt}`);
    };
    /**
     * 便捷函数: 连续岭上摸牌
     * @param tile_cnt - 要鸣的牌(string)或循环次数(number), 默认为1
     */
    const comboMopai = (tile_cnt) => {
        if (tile_cnt === undefined)
            tile_cnt = 1;
        if (typeof tile_cnt == 'number')
            for (let i = 0; i < tile_cnt; i++) {
                zimingpai();
                mopai();
            }
        else if (typeof tile_cnt == 'string') {
            zimingpai(tile_cnt);
            mopai();
        }
        else
            throw new Error(errRoundInfo() + `comboMopai: tile_cnt 参数不合规: ${tile_cnt}`);
    };
    /**
     * 便捷函数: 鸣牌并切牌
     * @param tls_cnt - 要切的牌(string, 1张牌)或鸣牌从手里拿出来的牌(string, 至少2张牌)或循环次数(number), 默认为1
     */
    const mingQiepai = (tls_cnt) => {
        if (tls_cnt === undefined)
            tls_cnt = 1;
        if (typeof tls_cnt == 'number')
            for (let i = 0; i < tls_cnt; i++) {
                mingpai();
                qiepai();
            }
        else if (typeof tls_cnt == 'string') {
            const split_tile = separate(tls_cnt);
            if (split_tile.length >= 2) {
                mingpai(tls_cnt);
                qiepai();
            }
            else {
                mingpai();
                qiepai(tls_cnt);
            }
        }
        else
            throw new Error(errRoundInfo() + `mingQiepai: tls_cnt 参数不合规: ${tls_cnt}`);
    };
    /**
     * 便捷函数: 自摸和牌
     * @param flag - 修罗/川麻: 即 hupai 中的 type 参数, 是否为最终和牌, 默认为中途和牌
     */
    const zimoHu = (flag = false) => {
        if (typeof flag == 'boolean') {
            mopai();
            hupai(flag);
        }
        else
            throw new Error(errRoundInfo() + `zimoHu: flag 参数不合规: ${flag}`);
    };
    /**
     * 便捷函数: 摸切到荒牌流局
     */
    const moqieLiuju = () => {
        normalMoqie(getLeftTileCnt());
        huangpai();
    };

    /**
     * @file: sample.ts - 一些定制化的牌谱, 包括示例牌局, 根据截图自制牌谱和报菜名牌局
     * @author: Fat-pig-Cui
     * @email: chubbypig@qq.com
     * @github: https://github.com/Fat-pig-Cui/majsoul-replay-editor
     */
    /**
     * 示例牌局: 东一局庄家大七星w立, 南家追立放铳
     */
    const demoGame = () => {
        gameBegin();
        begin_tiles[0] = '11223344556777z';
        if (base_info.player_cnt === 2) {
            begin_tiles[1] = '1112340678999m';
            randomPaishan('6z', '55z............');
        }
        else if (base_info.player_cnt === 3) {
            begin_tiles[1] = '1112340678999p';
            begin_tiles[2] = '1112340678999s';
            randomPaishan('6z', '55z........');
        }
        else {
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
     * 根据截图自制牌谱
     *
     * @param jsons - 截图中的信息, 详见 RoundJson 的定义, 或查看 products 文件夹下的"根据可见手牌和牌河生成雀魂牌谱"
     */
    const setPlayGame = (jsons) => {
        if (!(jsons instanceof Array))
            jsons = [jsons];
        gameBegin();
        for (const json of jsons) {
            const cnt = JSON.parse(JSON.stringify(base_info.all_tile_nums));
            const remain_tiles = [];
            // 玩家的副露信息
            const new_fulu = [[], [], [], []];
            // 玩家的切牌信息
            const new_discard_tiles = [[], [], [], []];
            // 玩家的广义摸牌(起手+手切+副露中自己的牌)
            const new_deal_tiles = [[], [], [], []];
            // 预处理
            (function () {
                // 解析 fulu 至 new_fulu
                const json_fulus = [json.fulu0, json.fulu1, json.fulu2, json.fulu3];
                for (let seat = 0; seat < base_info.player_cnt; seat++) {
                    for (const tmp_fulu of json_fulus[seat]) {
                        const tile_type = tmp_fulu[tmp_fulu.length - 1];
                        const own_tiles = [];
                        if (tmp_fulu.includes('_')) {
                            let index = tmp_fulu.indexOf('_');
                            const ming_tile = tmp_fulu[index + 1] + tile_type;
                            for (let j = 0; j < tmp_fulu.length - 1; j++)
                                if (tmp_fulu[j] !== '_' && tmp_fulu[j] !== '^')
                                    own_tiles.push(tmp_fulu[j] + tile_type);
                                else
                                    j++;
                            const is_jiagang = tmp_fulu.includes('^');
                            let type = '';
                            if (!isEqualTile(own_tiles[0], own_tiles[1]))
                                type = 'chi';
                            else if (is_jiagang)
                                type = 'jiagang';
                            else if (own_tiles.length === 2)
                                type = 'peng';
                            else if (own_tiles.length === 3)
                                type = 'minggang';
                            if (type === 'minggang' && index === 3)
                                index = 2;
                            let from = (seat + 3 - index) % base_info.player_cnt;
                            if (type === 'jiagang') { // 加杠多一个碰, 方便算法实现, 并且加杠的 from 优化
                                new_fulu[seat].push({
                                    type: 'peng',
                                    own_tiles: own_tiles,
                                    ming_tile: ming_tile,
                                    from: from,
                                });
                                from = seat;
                            }
                            new_fulu[seat].push({
                                type: type,
                                own_tiles: own_tiles,
                                ming_tile: type !== 'jiagang' ? ming_tile : tmp_fulu[tmp_fulu.indexOf('_') + 1] + tile_type,
                                from: from,
                            });
                        }
                        else {
                            for (let j = 0; j < tmp_fulu.length - 1; j++)
                                own_tiles.push(tmp_fulu[j] + tile_type);
                            new_fulu[seat].push({
                                type: 'angang',
                                own_tiles: own_tiles,
                                from: seat,
                            });
                        }
                    }
                }
                // 解析 paihe 至 new_discard_tiles
                (function () {
                    const tmp_qiepai_set = [json.paihe0, json.paihe1, json.paihe2, json.paihe3];
                    const new_qiepai_set = [[], [], [], []];
                    for (let seat = 0; seat < base_info.player_cnt; seat++) {
                        new_qiepai_set[seat] = separate_tiles(tmp_qiepai_set[seat]);
                        for (const tile_with_suf of new_qiepai_set[seat])
                            new_discard_tiles[seat].push({
                                tile: tile_with_suf.substring(0, 2),
                                moqie: tile_with_suf.includes('g'),
                                is_liqi: tile_with_suf.includes('r'),
                            });
                    }
                })();
                // 从 new_fulu, new_discard_tiles 和 tiles0-3 解析至 new_deal_tiles
                const first_tile = new_discard_tiles[base_info.ju][0];
                if (!first_tile.moqie) {
                    new_deal_tiles[base_info.ju].push(first_tile.tile);
                    new_discard_tiles[base_info.ju].shift();
                }
                for (let seat = 0; seat < base_info.player_cnt; seat++) {
                    for (const tmp_fulu of new_fulu[seat])
                        if (tmp_fulu.type !== 'jiagang')
                            new_deal_tiles[seat].push(...tmp_fulu.own_tiles);
                        else
                            new_deal_tiles[seat].push(tmp_fulu.ming_tile);
                }
                for (let seat = 0; seat < base_info.player_cnt; seat++)
                    for (const discard_tile of new_discard_tiles[seat]) {
                        if (!discard_tile.moqie)
                            new_deal_tiles[seat].push(discard_tile.tile);
                        else
                            cnt[discard_tile.tile]--;
                    }
                new_discard_tiles[base_info.ju].unshift(first_tile);
                for (let seat = 0; seat < base_info.player_cnt; seat++) {
                    new_deal_tiles[seat].push(...separate(json['tiles' + seat]));
                    for (const tile of new_deal_tiles[seat])
                        cnt[tile]--;
                }
                const dora = json.dora;
                const li_dora = json.li_dora.slice();
                while (li_dora.length < dora.length)
                    li_dora.push('.');
                let zhishipais = '';
                for (let i = dora.length - 1; i >= 0; i--) {
                    zhishipais += li_dora[i] + dora[i];
                    cnt[dora[i]]--;
                    if (li_dora[i] !== '.')
                        cnt[li_dora[i]]--;
                }
                if (base_info.player_cnt === 3)
                    zhishipais += '....';
                for (const tile of Constants.TILE) {
                    for (let i = 0; i < cnt[tile]; i++)
                        remain_tiles.push(tile);
                    if (cnt[tile] < 0)
                        console.warn(errRoundInfo() + `${4 - cnt[tile]} 个 ${tile}`);
                }
                remain_tiles.sort(randomCmp);
                for (let seat = 0; seat < base_info.player_cnt; seat++) {
                    const num = base_info.ju === seat ? Constants.QIN_TILE_NUM : Constants.XIAN_TILE_NUM;
                    while (separate(begin_tiles[seat]).length < num && new_deal_tiles[seat].length > 0)
                        begin_tiles[seat] += new_deal_tiles[seat].shift();
                    while (separate(begin_tiles[seat]).length < num && remain_tiles.length > 0)
                        begin_tiles[seat] += remain_tiles.pop();
                }
                randomPaishan('', zhishipais + '....');
                // paihe 经过该函数变为数组格式
                function separate_tiles(tiles) {
                    if (!tiles)
                        return [];
                    tiles = tiles.replace(/\s*/g, '');
                    const ret = [];
                    while (tiles.length > 0) {
                        // 牌河中的牌有三种可能
                        // 1. 长度为4, 类似 1pgr, 即摸切1p&立直
                        // 2. 长度为3, 类似 1pr 和 1pg, 摸切1p, 或手切1p立直
                        // 3. 长度为2, 如 1p, 即手切1p
                        if (tiles.length > 3 && (tiles[2] === 'g' && tiles[3] === 'r' || tiles[2] === 'r' && tiles[3] === 'g')) {
                            ret.push(tiles.substring(0, 4));
                            tiles = tiles.substring(4);
                        }
                        else if (tiles.length > 2 && (tiles[2] === 'g' || tiles[2] === 'r')) {
                            ret.push(tiles.substring(0, 3));
                            tiles = tiles.substring(3);
                        }
                        else {
                            ret.push(tiles.substring(0, 2));
                            tiles = tiles.substring(2);
                        }
                    }
                    return ret;
                }
            })();
            let seat = base_info.ju;
            let nxt_step = json.first_op === 1 ? 'angang' : json.first_op === 2 ? 'hupai/liuju' : 'qiepai';
            while (true) {
                switch (nxt_step) {
                    case 'mopai':
                        new_mopai();
                        break;
                    case 'qiepai':
                        new_qiepai();
                        break;
                    case 'chi':
                    case 'peng':
                    case 'minggang':
                        new_mingpai();
                        break;
                    case 'angang':
                    case 'jiagang':
                        new_zimingpai();
                        break;
                }
                if (nxt_step === 'hupai/liuju')
                    break;
                function new_mopai() {
                    if (new_discard_tiles[seat].length <= 0) {
                        nxt_step = 'hupai/liuju';
                        return;
                    }
                    if (new_fulu[seat].length > 0 && (new_fulu[seat][0].type === 'angang' || new_fulu[seat][0].type === 'jiagang'))
                        nxt_step = new_fulu[seat][0].type;
                    else
                        nxt_step = 'qiepai';
                    let tile = new_discard_tiles[seat][0].tile;
                    if (!new_discard_tiles[seat][0].moqie || nxt_step === 'angang') {
                        if (new_deal_tiles[seat].length === 0)
                            tile = remain_tiles.pop();
                        else
                            tile = new_deal_tiles[seat].shift();
                    }
                    mopai(seat, tile);
                }
                // 先看其他家谁可以鸣主视角的牌, 再看主视角自己切什么牌
                function new_qiepai() {
                    const tile_info = new_discard_tiles[seat].shift();
                    const para_tile = tile_info.moqie ? undefined : tile_info.tile;
                    const tile = tile_info.tile;
                    qiepai(seat, para_tile, tile_info.is_liqi);
                    // 明杠, 碰
                    const ops = ['minggang', 'peng'];
                    for (const op of ops)
                        for (let i = seat + 1; i < seat + base_info.player_cnt; i++) {
                            const tmp_seat = i % base_info.player_cnt;
                            const tmp_fulu = new_fulu[tmp_seat][0];
                            if (tmp_fulu && tmp_fulu.type === op && tmp_fulu.from === seat && isEqualTile(tmp_fulu.ming_tile, tile)) {
                                nxt_step = op;
                                seat = tmp_seat;
                                return;
                            }
                        }
                    const tmp_seat = (seat + 1) % base_info.player_cnt;
                    const tmp_fulu = new_fulu[tmp_seat][0];
                    if (tmp_fulu && tmp_fulu.type === 'chi' && tmp_fulu.from === seat && isEqualTile(tmp_fulu.ming_tile, tile)) {
                        nxt_step = 'chi';
                        seat = tmp_seat;
                        return;
                    }
                    nxt_step = 'mopai';
                    seat = (seat + 1) % base_info.player_cnt;
                }
                function new_mingpai() {
                    const tmp_fulu = new_fulu[seat].shift();
                    mingpai(seat, tmp_fulu.own_tiles.join(''));
                    if (tmp_fulu.type === 'minggang')
                        nxt_step = 'mopai';
                    else
                        nxt_step = 'qiepai';
                }
                function new_zimingpai() {
                    const tmp_fulu = new_fulu[seat].shift();
                    zimingpai(seat, tmp_fulu.own_tiles[0], tmp_fulu.type);
                    nxt_step = 'mopai';
                }
            }
            if (json.lst_mopai)
                mopai(json.lst_mopai);
            if (json.end_mode === 1) {
                if (json.hu_seat.length === 0)
                    hupai();
                else
                    hupai(json.hu_seat);
            }
            else if (json.end_mode === 2)
                liuju();
            else
                huangpai();
            fixPaishan(json.dora.length, json.li_dora.length);
        }
    };
    const tenhou2Majsoul = (json) => {
        if (!json)
            throw new Error('User canceled input');
        gameBegin();
        // log[0][0][0]: 等于 chang * 4 + ju
        // log[0][0][1]: 本场数
        // log[0][0][2]: 供托棒子个数
        const log = json.log;
        log[0].shift();
        const tmp_scores = log[0].shift();
        const biao_dora = log[0].shift();
        const li_dora = log[0].shift();
        const dict = Constants.TOUHOU_DICT;
        // 起手
        const tiles = [];
        // 广义摸牌组
        const new_mopai_set = [[], [], [], []];
        // 广义切牌组
        const new_qiepai_set = [[], [], [], []];
        // 各家摸牌的巡目河切牌的巡目
        const mopai_xunmu = [0, 0, 0, 0], qiepai_xunmu = [0, 0, 0, 0];
        for (let i = 0; i < Math.floor(log[0].length / 3); i++) {
            tiles[i] = log[0][3 * i];
            new_mopai_set[i] = log[0][3 * i + 1];
            new_qiepai_set[i] = log[0][3 * i + 2];
        }
        if (base_info.player_cnt === 3) { // 三麻点数修正
            let all_4p_points = true;
            for (const seat of tmp_scores.keys())
                if (tmp_scores[seat] !== 25000)
                    all_4p_points = false;
            if (all_4p_points) // 三麻点数修正
                for (let seat = 0; seat < base_info.player_cnt; seat++)
                    tmp_scores[seat] = 35000;
        }
        // while 循环关键变量: seat: 要操作的玩家, nxt_step: 下个操作的类型
        let seat = base_info.ju, nxt_step = 'mopai';
        while (true) {
            switch (nxt_step) {
                case 'mopai':
                    new_mopai();
                    break;
                case 'qiepai':
                    new_qiepai();
                    break;
                case 'chi':
                case 'peng':
                case 'minggang':
                    new_mingpai();
                    break;
                case 'angang':
                case 'jiagang':
                    new_zimingpai();
                    break;
            }
            if (nxt_step === 'liuju') {
                huangpai();
                fixPaishan();
                break;
            }
        }
        // new_mopai 不会改变 seat
        function new_mopai() {
            if (mopai_xunmu[seat] >= new_mopai_set[seat].length) {
                nxt_step = 'liuju';
                return;
            }
            // 开局, 亲家补全至14张牌
            if (seat === base_info.ju && mopai_xunmu[base_info.ju] === 0) {
                tiles[base_info.ju].push(new_mopai_set[base_info.ju][mopai_xunmu[base_info.ju]]);
                for (const seat of tiles.keys())
                    begin_tiles[seat] = process(tiles[seat]);
                let zhishipais = '';
                for (let i = biao_dora.length - 1; i >= 0; i--) {
                    if (li_dora[i] !== undefined)
                        zhishipais += dict[li_dora[i]];
                    zhishipais += dict[biao_dora[i]];
                }
                randomPaishan('', zhishipais + '....');
                function process(tls) {
                    let ret = '';
                    for (const touhou_tile of tls)
                        ret += dict[touhou_tile];
                    return ret;
                }
            }
            else
                mopai(seat, dict[new_mopai_set[seat][mopai_xunmu[seat]]]);
            mopai_xunmu[seat]++;
            const nxt_qiepai = new_qiepai_set[seat][qiepai_xunmu[seat]];
            if (typeof nxt_qiepai == 'string') {
                if (nxt_qiepai.includes('a'))
                    nxt_step = 'angang';
                else if (nxt_qiepai.includes('k'))
                    nxt_step = 'jiagang';
                else if (nxt_qiepai.includes('r'))
                    nxt_step = 'qiepai';
            }
            else
                nxt_step = 'qiepai';
        }
        function new_qiepai() {
            if (qiepai_xunmu[seat] >= new_qiepai_set[seat].length) {
                nxt_step = 'liuju';
                return;
            }
            let is_liqi = false;
            let tile;
            const nxt_qiepai = new_qiepai_set[seat][qiepai_xunmu[seat]];
            if (typeof nxt_qiepai == 'string') {
                tile = dict[parseInt(nxt_qiepai.substring(1))];
                is_liqi = true;
            }
            else
                tile = dict[nxt_qiepai];
            qiepai(seat, tile, is_liqi);
            qiepai_xunmu[seat]++;
            // 明杠
            for (let i = seat + 1; i < seat + base_info.player_cnt; i++) {
                const tmp_seat = i % base_info.player_cnt;
                const nxt_mopai = new_mopai_set[tmp_seat][mopai_xunmu[tmp_seat]];
                if (typeof nxt_mopai == 'string') {
                    const [tmp_fulu_from_seat, tmp_fulu_type] = judge_fulu(nxt_mopai, tmp_seat);
                    if (tmp_fulu_from_seat === seat && tmp_fulu_type === 'm') {
                        nxt_step = 'minggang';
                        seat = tmp_seat;
                        return;
                    }
                }
            }
            // 碰
            for (let i = seat + 1; i < seat + base_info.player_cnt; i++) {
                const tmp_seat = i % base_info.player_cnt;
                const nxt_mopai = new_mopai_set[tmp_seat][mopai_xunmu[tmp_seat]];
                if (typeof nxt_mopai == 'string') {
                    const [tmp_fulu_from_seat, tmp_fulu_type] = judge_fulu(nxt_mopai, tmp_seat);
                    if (tmp_fulu_from_seat === seat && tmp_fulu_type === 'p') {
                        nxt_step = 'peng';
                        seat = tmp_seat;
                        return;
                    }
                }
            }
            // 吃
            const tmp_seat = (seat + 1) % base_info.player_cnt;
            const nxt_mopai = new_mopai_set[tmp_seat][mopai_xunmu[tmp_seat]];
            if (typeof nxt_mopai == 'string') {
                const [tmp_fulu_from_seat, tmp_fulu_type] = judge_fulu(nxt_mopai, tmp_seat);
                if (tmp_fulu_from_seat === seat && tmp_fulu_type === 'c') {
                    nxt_step = 'chi';
                    seat = tmp_seat;
                    return;
                }
            }
            // 摸牌
            seat = (seat + 1) % base_info.player_cnt;
            nxt_step = 'mopai';
            function judge_fulu(tmp_fulu, tmp_seat) {
                const fulu_types = ['c', 'p', 'm'];
                let fulu_local_seat = 0;
                let fulu_type = '';
                for (const type of fulu_types)
                    if (tmp_fulu.includes(type)) {
                        let index = tmp_fulu.indexOf(type);
                        if (index === 6)
                            index = 4;
                        fulu_type = type;
                        fulu_local_seat = 3 - index / 2;
                        break;
                    }
                const real_seat = (fulu_local_seat + tmp_seat) % 4;
                return [real_seat, fulu_type];
            }
        }
        // new_mingpai 不会改变 seat
        function new_mingpai() {
            const fulu = new_mopai_set[seat][mopai_xunmu[seat]];
            mopai_xunmu[seat]++;
            let [tmp_tiles, fulu_type] = parse_fulu(fulu);
            const tiles = [];
            while (tmp_tiles.length) {
                tiles.push(dict[parseInt(tmp_tiles.substring(0, 2))]);
                tmp_tiles = tmp_tiles.substring(2);
            }
            mingpai(seat, tiles.join(''));
            if (fulu_type === 'm') {
                qiepai_xunmu[seat]++;
                nxt_step = 'mopai';
            }
            else
                nxt_step = 'qiepai';
        }
        // new_zimingpai 不会改变 seat
        function new_zimingpai() {
            const fulu = new_qiepai_set[seat][qiepai_xunmu[seat]];
            qiepai_xunmu[seat]++;
            const [tmp_tiles, fulu_type] = parse_fulu(fulu);
            const tile = dict[parseInt(tmp_tiles.substring(0, 2))];
            const type = fulu_type === 'a' ? 'angang' : 'jiagang';
            zimingpai(seat, tile, type);
            nxt_step = 'mopai';
        }
        function parse_fulu(fulu) {
            // 'c': 吃, 'p': 碰, 'm': 明杠, 'a': 暗杠, 'k': 加杠
            if (typeof fulu === 'number')
                return [];
            const fulu_types = ['c', 'p', 'm', 'a', 'k'];
            for (const type of fulu_types)
                if (fulu.includes(type)) {
                    const index = fulu.indexOf(type);
                    return [fulu.substring(0, index) + fulu.substring(index + 3), type];
                }
            return [];
        }
    };
    /**
     * 用于报菜名的示例牌局
     */
    const reportYaku = () => {
        if (is_report_yakus())
            for (let i = 0; i < 2; i++)
                reportGame();
    };
    /**
     * 一姬专用的报菜名牌局
     */
    const reportYaku_yiji = () => {
        if (is_report_yakus())
            for (let i = 0; i < 10; i++)
                reportGame(true);
    };
    /**
     * 根据已结束的对局进行牌山修正, 用于"天凤牌谱编辑器数据转雀魂格式"和"根据可见手牌和牌河生成雀魂牌谱"的最后
     * @param dora_num - 表指示牌数量, 默认为1
     * @param li_dora_num - 里指示牌刷领, 默认为0
     */
    const fixPaishan = (dora_num = 1, li_dora_num = 0) => {
        let qishou_num = 53, all_lingshang_num = 4;
        if (base_info.player_cnt === 3) {
            qishou_num = 40;
            all_lingshang_num = 8;
        }
        else if (base_info.player_cnt === 2) {
            qishou_num = 27;
            all_lingshang_num = 12;
        }
        const data_new_round = all_data.all_actions[all_data.all_actions.length - 1][0].data;
        if (!data_new_round.sha256)
            qishou_num = 0;
        let normal_num = 0, lingshang_num = 0;
        const normal_tiles = [], lingshang_tiles = [];
        const cur_actions = all_data.all_actions[all_data.all_actions.length - 1];
        for (const [index, action] of cur_actions.entries()) {
            if (action.name === 'RecordDealTile') {
                let is_lingshang = false;
                const lst_action = cur_actions[index - 1];
                if (lst_action.name === 'RecordChiPengGang' && lst_action.data.type === 2) // 上一个操作是暗杠, 则这张牌是岭上牌
                    is_lingshang = true;
                if (lst_action.name === 'RecordAnGangAddGang' || lst_action.name === 'RecordBaBei') // 上一个操作是暗杠/加杠/拔北, 则这张牌是岭上牌
                    is_lingshang = true;
                if (is_lingshang) {
                    lingshang_num++;
                    lingshang_tiles.push(action.data.tile);
                }
                else {
                    normal_num++;
                    normal_tiles.push(action.data.tile);
                }
            }
        }
        const new_paishan = separate(data_new_round.paishan);
        const protected_index = [];
        for (let i = 0; i < dora_num; i++)
            protected_index.push(new_paishan.length - 1 - all_lingshang_num - i * 2);
        for (let i = 0; i < li_dora_num; i++)
            protected_index.push(new_paishan.length - 2 - all_lingshang_num - i * 2);
        for (let i = 0; i < normal_num; i++) {
            if (new_paishan[qishou_num + i] === normal_tiles[i])
                continue;
            let same_index = -1;
            for (let j = qishou_num + i + 1; j < new_paishan.length; j++)
                if (!protected_index.includes(j) && new_paishan[j] === normal_tiles[i]) {
                    same_index = j;
                    break;
                }
            if (same_index !== -1) {
                const tmp = new_paishan[qishou_num + i];
                new_paishan[qishou_num + i] = new_paishan[same_index];
                new_paishan[same_index] = tmp;
            }
        }
        for (let i = 0; i < lingshang_num; i++) {
            if (new_paishan[new_paishan.length - 1 - i] === lingshang_tiles[i])
                continue;
            let same_index = -1;
            for (let j = new_paishan.length - 2 - i; j >= qishou_num; j--)
                if (!protected_index.includes(j) && new_paishan[j] === lingshang_tiles[i]) {
                    same_index = j;
                    break;
                }
            if (same_index !== -1) {
                const tmp = new_paishan[new_paishan.length - 1 - i];
                new_paishan[new_paishan.length - 1 - i] = new_paishan[same_index];
                new_paishan[same_index] = tmp;
            }
        }
        data_new_round.paishan = new_paishan.join('');
    };
    const generateHuleInfo = (index) => {
        const all_fans = [
            [
                { val: 1, id: 2 }, // 立直
                { val: 2, id: 18 }, // 两立直
                { val: 1, id: 30 }, // 一发
                { val: 1, id: 3 }, // 枪杠
                { val: 1, id: 4 }, // 岭上开花
                { val: 1, id: 5 }, // 海底摸月
                { val: 1, id: 6 }, // 河底捞鱼
                { val: 1, id: 1 }, // 门前清自摸和
                { val: 1, id: 14 }, // 平和
                { val: 1, id: 13 }, // 一杯口
                { val: 3, id: 28 }, // 二杯口
                { val: 2, id: 25 }, // 七对子
                { val: 1, id: 7 }, // 役牌 白
                { val: 1, id: 8 }, // 役牌 发
                { val: 1, id: 9 }, // 役牌 中
                { val: 1, id: 9101 }, // 役牌 东
                { val: 1, id: 9102 }, // 役牌 连东
                { val: 1, id: 9103 }, // 役牌 南
                { val: 1, id: 9104 }, // 役牌 连南
                { val: 1, id: 10 }, // 役牌:门风牌
                { val: 1, id: 11 }, // 役牌:场风牌
                { val: 1, id: 9107 }, // 役牌 北
                { val: 1, id: 9108 }, // 役牌 连北
                { val: 1, id: 12 }, // 断幺九
                { val: 2, id: 15 }, // 混全带幺九
                { val: 2, id: 16 }, // 一气通贯
                { val: 2, id: 17 }, // 三色同顺
                { val: 2, id: 19 }, // 三色同刻
                { val: 2, id: 20 }, // 三杠子
                { val: 2, id: 21 }, // 对对和
                { val: 2, id: 22 }, // 三暗刻
                { val: 2, id: 23 }, // 小三元
                { val: 2, id: 24 }, // 混老头
                { val: 3, id: 26 }, // 纯全带幺九
                { val: 3, id: 27 }, // 混一色
                { val: 6, id: 29 }, // 清一色
                { val: 1, id: 31 }, // 宝牌
                { val: 2, id: 31 }, // 宝牌
                { val: 3, id: 31 }, // 宝牌
                { val: 4, id: 31 }, // 宝牌
                { val: 5, id: 32 }, // 红宝牌
                { val: 6, id: 32 }, // 红宝牌
                { val: 7, id: 32 }, // 红宝牌
                { val: 8, id: 32 }, // 红宝牌
                { val: 9, id: 34 }, // 拔北宝牌
                { val: 10, id: 34 }, // 拔北宝牌
                { val: 11, id: 34 }, // 拔北宝牌
                { val: 12, id: 34 }, // 拔北宝牌
                { val: 13, id: 33 }, // 里宝牌
                { val: 5, id: 9100 }, // 流局满贯
                { val: 6, id: 1015 }, // 清龙七对
                { val: 6, id: 1016 }, // 十八罗汉
                { val: 6, id: 1017 }, // 清十八罗汉
                { val: 4, id: 1010 }, // 清对
                { val: 4, id: 1011 }, // 将对
                { val: 4, id: 1012 }, // 龙七对
                { val: 5, id: 1013 }, // 清七对
                { val: 5, id: 1020 }, // 清幺九
                { val: 5, id: 1014 }, // 清金钩钓
                { val: 3, id: 1008 }, // 带幺九
                { val: 3, id: 1009 }, // 金钩钓
                { val: 1, id: 1000 }, // 根
                { val: 1, id: 1002 }, // 杠上炮
            ], [
                { val: 1, id: 35 }, // 天和
                { val: 1, id: 36 }, // 地和
                { val: 1, id: 37 }, // 大三元
                { val: 1, id: 38 }, // 四暗刻
                { val: 1, id: 39 }, // 字一色
                { val: 1, id: 40 }, // 绿一色
                { val: 1, id: 41 }, // 清老头
                { val: 1, id: 42 }, // 国士无双
                { val: 1, id: 43 }, // 小四喜
                { val: 1, id: 44 }, // 四杠子
                { val: 1, id: 45 }, // 九莲宝灯
                { val: 2, id: 47 }, // 纯正九莲宝灯
                { val: 2, id: 48 }, // 四暗刻单骑
                { val: 2, id: 49 }, // 国士无双十三面
                { val: 2, id: 50 }, // 大四喜
            ]
        ];
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
    const generateHuleInfo_yiji = (index) => {
        const all_fans = [
            [
                { val: 0, id: 9500 }, // 自我介绍
                { val: 0, id: 9200 },
                { val: 0, id: 9201 },
                { val: 0, id: 9202 },
                { val: 0, id: 9203 },
                { val: 0, id: 9204 },
                { val: 0, id: 9205 },
                { val: 0, id: 9511 }, // 送礼物普通
                { val: 0, id: 9206 },
                { val: 0, id: 9603 }, // 役满听牌
                { val: 0, id: 9207 },
                { val: 1, id: 2 },
                { val: 2, id: 18 },
                { val: 1, id: 30 },
                { val: 1, id: 3 },
            ], [
                { val: 1, id: 4 },
                { val: 1, id: 5 },
                { val: 1, id: 6 },
                { val: 1, id: 1 },
                { val: 1, id: 14 },
                { val: 1, id: 13 },
                { val: 3, id: 28 },
                { val: 2, id: 25 },
                { val: 1, id: 7 },
                { val: 1, id: 8 },
                { val: 1, id: 9 },
                { val: 1, id: 9101 },
                { val: 1, id: 9102 },
                { val: 1, id: 9103 },
                { val: 1, id: 9104 },
            ], [
                { val: 1, id: 10 },
                { val: 1, id: 11 },
                { val: 1, id: 9107 },
                { val: 1, id: 9108 },
                { val: 1, id: 12 },
                { val: 2, id: 15 },
                { val: 2, id: 16 },
                { val: 2, id: 17 },
                { val: 2, id: 19 },
                { val: 2, id: 20 },
                { val: 2, id: 21 },
                { val: 2, id: 22 },
                { val: 2, id: 23 },
                { val: 2, id: 24 },
                { val: 3, id: 26 },
            ], [
                { val: 3, id: 27 },
                { val: 6, id: 29 },
                { val: 1, id: 31 },
                { val: 2, id: 31 },
                { val: 3, id: 31 },
                { val: 4, id: 31 },
                { val: 5, id: 32 },
                { val: 6, id: 32 },
                { val: 7, id: 32 },
                { val: 8, id: 32 },
                { val: 9, id: 34 },
                { val: 10, id: 34 },
                { val: 11, id: 34 },
                { val: 12, id: 34 },
                { val: 13, id: 33 },
            ], [
                { val: 0, id: 9400 }, // 四风连打
                { val: 0, id: 9401 }, // 四杠散了
                { val: 0, id: 9402 }, // 四家立直
                { val: 0, id: 9403 }, // 九种九牌
                { val: 0, id: 9100 }, // 流局满贯
                { val: 0, id: 9300 },
                { val: 0, id: 9301 },
                { val: 0, id: 9302 },
                { val: 0, id: 9303 },
                { val: 0, id: 9304 },
                { val: 0, id: 9305 },
                { val: 0, id: 9306 },
                { val: 0, id: 9307 },
                { val: 0, id: 9308 },
                { val: 0, id: 9309 },
                // {val: 0, id: 9502}, // 登录语音满羁绊
            ], [
                { val: 1, id: 35 },
                { val: 1, id: 36 },
                { val: 1, id: 37 },
                { val: 1, id: 38 },
                { val: 1, id: 39 },
                { val: 1, id: 40 },
                { val: 1, id: 41 },
                { val: 1, id: 42 },
            ], [
                { val: 1, id: 43 },
                { val: 1, id: 44 },
                { val: 1, id: 45 },
                { val: 2, id: 47 },
                { val: 2, id: 48 },
                { val: 2, id: 49 },
                { val: 2, id: 50 },
                { val: 0, id: 9209 },
            ], [
                { val: 6, id: 1015 },
                { val: 6, id: 1016 },
                { val: 6, id: 1017 },
                { val: 4, id: 1010 },
                { val: 4, id: 1011 },
                { val: 4, id: 1012 },
                { val: 5, id: 1013 },
                { val: 5, id: 1020 },
                { val: 5, id: 1014 },
                { val: 3, id: 1008 },
                { val: 3, id: 1009 },
                { val: 1, id: 1000 },
                { val: 1, id: 1002 },
                { val: 0, id: 9311 }, // 听牌
                { val: 0, id: 9312 }, // 未听牌
            ], [
                { val: 0, id: 9500 },
                { val: 0, id: 9501 },
                { val: 0, id: 9502 },
                { val: 0, id: 9503 },
                { val: 0, id: 9504 },
                { val: 0, id: 9505 },
                { val: 0, id: 9506 },
                { val: 0, id: 9507 },
                { val: 0, id: 9508 },
                { val: 0, id: 9509 },
                { val: 0, id: 9510 },
                { val: 0, id: 9511 },
                { val: 0, id: 9512 },
                { val: 0, id: 9513 },
                { val: 0, id: 9514 },
            ], [
                { val: 0, id: 9515 },
                { val: 0, id: 9516 },
                { val: 0, id: 9517 },
                { val: 0, id: 9518 },
                { val: 0, id: 9519 },
                { val: 0, id: 9520 },
                { val: 0, id: 9600 },
                { val: 0, id: 9601 },
                { val: 0, id: 9602 },
                { val: 0, id: 9603 },
                { val: 0, id: 9604 },
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
    const reportGame = (is_yiji = false) => {
        begin_tiles[0] = '1112340678999m7z';
        begin_tiles[1] = '1112340678999p';
        begin_tiles[2] = '5555555555555z';
        begin_tiles[3] = '1112340678999s';
        randomPaishan('75z', '7z....');
        qiepai();
        normalMoqie();
        mopai();
        if (is_yiji)
            all_data.cur_actions.push(generateHuleInfo_yiji(all_data.all_actions.length));
        else
            all_data.cur_actions.push(generateHuleInfo(all_data.all_actions.length));
        roundEnd();
    };

    /**
     * @file: main.ts - 外部使用的变量和函数
     * @author: GrandDawn, Fat-pig-Cui
     * @email: chubbypig@qq.com
     * @github: https://github.com/Fat-pig-Cui/majsoul-replay-editor
     */
    window.player_datas = player_datas;
    window.begin_tiles = begin_tiles;
    window.player_tiles = player_tiles;
    window.all_data = all_data;
    window.clearProject = clearProject;
    window.setConfig = setConfig;
    window.setDiscardTiles = setDiscardTiles;
    window.setDealTiles = setDealTiles;
    window.setPaishan = setPaishan;
    window.randomPaishan = randomPaishan;
    window.mopai = mopai;
    window.qiepai = qiepai;
    window.mingpai = mingpai;
    window.zimingpai = zimingpai;
    window.hupai = hupai;
    window.huangpai = huangpai;
    window.liuju = liuju;
    window.setMuyuSeats = setMuyuSeats;
    window.huanpai = huanpai;
    window.dingque = dingque;
    window.kaipai = kaipai;
    window.kaipaiLock = kaipaiLock;
    window.setRound = setRound;
    window.getLeftTileCnt = getLeftTileCnt;
    window.normalMoqie = normalMoqie;
    window.moqieLiqi = moqieLiqi;
    window.comboMopai = comboMopai;
    window.mingQiepai = mingQiepai;
    window.zimoHu = zimoHu;
    window.moqieLiuju = moqieLiuju;
    window.judgeTile = judgeTile;
    window.isEqualTile = isEqualTile;
    window.separate = separate;
    window.calcHupai = calcHupai;
    window.calcTingpai = calcTingpai;
    window.getLstAction = getLstAction;
    window.setScores = setScores;
    window.demoGame = demoGame;
    window.setPlayGame = setPlayGame;
    window.tenhou2Majsoul = tenhou2Majsoul;
    window.reportYaku = reportYaku;
    window.reportYaku_yiji = reportYaku_yiji;
    window.resetReplay = resetReplay;

})();
