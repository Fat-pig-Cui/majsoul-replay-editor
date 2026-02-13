/**
 * @file: misc.ts - 一些比较简短的函数和随机装扮相关的函数
 * @author: GrandDawn, Fat-pig-Cui
 * @email: chubbypig@qq.com
 * @github: https://github.com/Fat-pig-Cui/majsoul-replay-editor
 */

import {all_data, config} from "./core";

// 回放的桌布, 默认为当前使用的桌布
export const get_tablecloth_id = (): number => {
    if (typeof config.mode.detail_rule._tablecloth_id == 'number')
        return config.mode.detail_rule._tablecloth_id;
    if (all_data.player_datas[0].views) {
        let views = all_data.player_datas[0].views;
        for (let i in views)
            if (views[i].slot === 6)
                return views[i].item_id;
    }
    return uiscript.UI_Sushe.now_desktop_id;
};

// 回放的牌背, 默认为当前使用的牌背
export const get_mjp_id = (): number => {
    if (typeof config.mode.detail_rule._mjp_id == 'number')
        return config.mode.detail_rule._mjp_id;
    if (all_data.player_datas[0].views) {
        let views = all_data.player_datas[0].views;
        for (let i in views)
            if (views[i].slot === 7)
                return views[i].item_id;
    }
    return uiscript.UI_Sushe.now_mjp_id;
};

// 回放的牌面, 默认为当前使用的牌面
export const get_mjpsurface_id = (): number => {
    if (typeof config.mode.detail_rule._mjpsurface_id == 'number')
        return config.mode.detail_rule._mjpsurface_id;
    if (all_data.player_datas[0].views) {
        let views = all_data.player_datas[0].views;
        for (let i in views)
            if (views[i].slot === 13)
                return views[i].item_id;
    }
    return uiscript.UI_Sushe.now_mjp_surface_id;
};

// 初始点数
export const get_init_point = (): number => {
    if (typeof config.mode.detail_rule.init_point == 'number' && config.mode.detail_rule.init_point > -1)
        return config.mode.detail_rule.init_point;
    return -1;
};

// 红宝牌数量
export const get_aka_cnt = (): number => {
    if (typeof config.mode.detail_rule.dora_count == 'number' && config.mode.detail_rule.dora_count > -1)
        return config.mode.detail_rule.dora_count;
    return -1;
};

// 番缚, 默认为1
export const get_fanfu = (): number => {
    if (typeof config.mode.detail_rule.fanfu == 'number' && config.mode.detail_rule.fanfu > 1)
        return config.mode.detail_rule.fanfu;
    return 1;
};

// ------------------------------------------------------------------------

// 牌谱第一局的 chang, ju, ben 和场供中的立直棒个数(最后一个参数可以省略)
export const get_chang_ju_ben_num = (): [Seat, Seat, number, number?] => {
    if (config.mode.detail_rule._chang_ju_ben_num_ instanceof Array && config.mode.detail_rule._chang_ju_ben_num_.length >= 3)
        return config.mode.detail_rule._chang_ju_ben_num_;
    return [0, 0, 0, 0];
};

// 第一局各玩家的点数
export const get_init_scores = (): Players_Number | [] => {
    if (config.mode.detail_rule._scores_ instanceof Array)
        return config.mode.detail_rule._scores_;
    return [];
};

// 回放的主视角
export const get_mainrole_seat = (): Seat | -1 => {
    if (typeof config.mode.detail_rule._mainrole_ == 'number' && config.mode.detail_rule._mainrole_ > -1 && config.mode.detail_rule._mainrole_ < 4)
        return config.mode.detail_rule._mainrole_;
    return -1;
};

// ------------------------------------------------------------------------
// 是否为修罗之战模式
export const is_xuezhandaodi = (): boolean => config.mode.detail_rule.xuezhandaodi;

// 是否是赤羽之战模式
export const is_chuanma = (): boolean => config.mode.detail_rule.chuanma;

// 是否为宝牌狂热模式
export const is_dora3 = (): boolean => config.mode.detail_rule.dora3_mode;

// 是否为配牌明牌模式
export const is_begin_open = (): boolean => config.mode.detail_rule.begin_open_mode;

// 是否为龙之目玉模式
export const is_muyu = (): boolean => config.mode.detail_rule.muyu_mode;

// 是否为明镜之战模式
export const is_mingjing = (): boolean => config.mode.detail_rule.jiuchao_mode;

// 是否为暗夜之战模式
export const is_anye = (): boolean => config.mode.detail_rule.reveal_discard;

// 是否为幻境传说模式
export const is_field_spell = (): boolean => typeof config.mode.detail_rule.field_spell_mode == 'number';

// 获取幻境传说模式的庄家卡
export const get_field_spell_mode1 = (): FieldSpellNumber => {
    if (!is_field_spell())
        return 0;
    return Math.floor(config.mode.detail_rule.field_spell_mode % 10) as FieldSpellNumber;
};

// 获取幻境传说模式的机会卡
export const get_field_spell_mode2 = (): FieldSpellNumber => {
    if (!is_field_spell())
        return 0;
    return Math.floor((config.mode.detail_rule.field_spell_mode / 100) % 10) as FieldSpellNumber;
};

// 获取幻境传说模式的命运卡
export const get_field_spell_mode3 = (): FieldSpellNumber => {
    if (!is_field_spell())
        return 0;
    return Math.floor(config.mode.detail_rule.field_spell_mode / 10000) as FieldSpellNumber;
};

// 是否为占星之战模式
export const is_zhanxing = (): boolean => config.mode.detail_rule.zhanxing;

// 是否为天命之战模式
export const is_tianming = (): boolean => config.mode.detail_rule.tianming_mode;

// 是否为咏唱之战模式
export const is_yongchang = (): boolean => config.mode.detail_rule.yongchang_mode;

// 是否为魂之一击模式
export const is_hunzhiyiji = (): boolean => config.mode.detail_rule.hunzhiyiji_mode;

// 是否为万象修罗模式
export const is_wanxiangxiuluo = (): boolean => config.mode.detail_rule.wanxiangxiuluo_mode;

// 是否为背水之战模式
export const is_beishuizhizhan = (): boolean => config.mode.detail_rule.beishuizhizhan_mode;

// 是否为下克上模式
export const is_xiakeshang = (): boolean => config.mode.detail_rule.amusement_switches instanceof Array && config.mode.detail_rule.amusement_switches.includes(18);

// 是否为血流成河模式
export const is_xueliu = (): boolean => config.mode.detail_rule._xueliu;

// ------------------------------------------------------------------------
// 是否开启古役
export const is_guyi = (): boolean => config.mode.detail_rule.guyi_mode;

// 是否开启一番街的古役
export const is_yifanjieguyi = (): boolean => config.mode.detail_rule._yifanjieguyi;

// 是否为无食断模式
export const no_shiduan = (): boolean => config.mode.detail_rule._no_shiduan;

// 是否为无自摸损模式
export const no_zimosun = (): boolean => config.mode.detail_rule._no_zimosun;

// 是否公开手牌
export const is_openhand = (): boolean => config.mode.detail_rule.open_hand;

// ------------------------------------------------------------------------
// 立直所需要的立直棒个数, 默认为1
export const get_liqi_need = (): number => {
    if (typeof config.mode.detail_rule._liqi_need == 'number' && config.mode.detail_rule._liqi_need > -1)
        return config.mode.detail_rule._liqi_need;
    return 1;
};

// 本场点数的倍数, 默认为1
export const get_ben_times = (): number => {
    if (typeof config.mode.detail_rule._ben_times == 'number' && config.mode.detail_rule._ben_times > -1)
        return config.mode.detail_rule._ben_times;
    return 1;
};

// 四麻一个玩家听牌的罚符, 默认为段位规则: 1000
export const get_fafu_1ting = (): number => {
    if (typeof config.mode.detail_rule._fafu_1ting == 'number')
        return config.mode.detail_rule._fafu_1ting;
    return 1000;
};

// 四麻两个玩家听牌的罚符, 默认为段位规则: 1500
export const get_fafu_2ting = (): number => {
    if (typeof config.mode.detail_rule._fafu_2ting == 'number')
        return config.mode.detail_rule._fafu_2ting;
    return 1500;
};

// 四麻三个玩家听牌的罚符, 默认为段位规则: 3000
export const get_fafu_3ting = (): number => {
    if (typeof config.mode.detail_rule._fafu_3ting == 'number')
        return config.mode.detail_rule._fafu_3ting;
    return 3000;
};

// 三麻一个玩家听牌的罚符, 默认为段位规则: 1000
export const get_fafu_3p_1ting = (): number => {
    if (typeof config.mode.detail_rule._fafu_3p_1ting == 'number')
        return config.mode.detail_rule._fafu_3p_1ting;
    return 1000;
};

// 三麻两个玩家听牌的罚符, 默认为段位规则: 2000
export const get_fafu_3p_2ting = (): number => {
    if (typeof config.mode.detail_rule._fafu_3p_2ting == 'number')
        return config.mode.detail_rule._fafu_3p_2ting;
    return 2000;
};

// 二麻听牌的罚符, 默认为 1000
export const get_fafu_2p = (): number => {
    if (typeof config.mode.detail_rule._fafu_2p == 'number')
        return config.mode.detail_rule._fafu_2p;
    return 1000;
};

// 是否有切上满贯
export const is_qieshang = (): boolean => config.mode.detail_rule._qieshangmanguan;

// 是否有头跳
export const is_toutiao = (): boolean => config.mode.detail_rule._toutiao;

// 是否开启人和, 而且打点为满贯(5番)
export const is_renhumanguan = (): boolean => config.mode.detail_rule._renhumanguan;

// 是否无大三元大四喜包牌, 修罗模式强制无包牌
export const no_normalbaopai = (): boolean => config.mode.detail_rule._no_normalbaopai;

// 是否有四杠子包牌
export const is_sigangbaopai = (): boolean => config.mode.detail_rule._sigangbaopai;

// 是否禁用流局满贯
export const no_liujumanguan = (): boolean => config.mode.detail_rule._no_liujumanguan;

// 是否禁用一发
export const no_yifa = (): boolean => config.mode.detail_rule._no_yifa;

// 是否不算连风4符
export const no_lianfengsifu = (): boolean => config.mode.detail_rule._no_lianfengsifu;

// 是否禁用表宝牌
export const no_dora = (): boolean => config.mode.detail_rule._no_dora;

// 是否禁用里宝牌
export const no_lidora = (): boolean => config.mode.detail_rule._no_lidora;

// 是否禁用杠表宝牌
export const no_gangdora = (): boolean => config.mode.detail_rule._no_gangdora;

// 是否禁用杠里宝牌
export const no_ganglidora = (): boolean => config.mode.detail_rule._no_ganglidora;

// 明杠表宝牌是否即翻
export const is_dora_jifan = (): boolean => config.mode.detail_rule._dora_jifan;

// 是否有三家和了流局
export const is_sanxiangliuju = (): boolean => config.mode.detail_rule._sanxiangliuju;

// 是否禁用累计役满(番数最高三倍满)
export const no_leijiyiman = (): boolean => config.mode.detail_rule._no_leijiyiman;

// 是否无双倍役满(纯九, 四暗刻单骑, 十三面, 大四喜算单倍役满)
export const no_wyakuman = (): boolean => config.mode.detail_rule._no_wyakuman;

// 是否禁用国士枪暗杠
export const no_guoshiangang = (): boolean => config.mode.detail_rule._no_guoshiangang;

// 是否禁用立直需要点数限制(点数不够及负分的情况是否能立直)
export const is_fufenliqi = (): boolean => config.mode.detail_rule._fufenliqi;

// ------------------------------------------------------------------------
// 是否有包杠, 只适用于非修罗立直麻将
export const is_baogang = (): boolean => config.mode.detail_rule._baogang;

// 是否为青天井模式(谨慎使用, 高打点时很容易崩溃)
export const is_qingtianjing = (): boolean => config.mode.detail_rule._qingtianjing;

// 是否为无振听模式
export const no_zhenting = (): boolean => config.mode.detail_rule._no_zhenting;

// 是否 hupai 无参数时无役荣和自动诈和
export const is_ronghuzhahu = (): boolean => config.mode.detail_rule._ronghuzhahu;

// 是否开启自定义番种'天地创造'
export const is_tiandichuangzao = (): boolean => config.mode.detail_rule._tiandichuangzao;

// 是否开启自定义番种'万物生长'
export const is_wanwushengzhang = (): boolean => config.mode.detail_rule._wanwushengzhang;

// 是否允许大小四喜复合
export const is_sixifuhe = (): boolean => config.mode.detail_rule._sixifuhe;

// 是否根据 deal_tiles 确定牌山
export const is_mopai_paishan = (): boolean => config.mode.detail_rule._mopai_paishan;

// 是否为何切模式
export const is_heqie_mode = (): boolean => config.mode.detail_rule._heqie_mode;

// ------------------------------------------------------------------------
// 是否为国标模式
export const is_guobiao = (): boolean => config.mode.detail_rule._guobiao;

// 是否启用国标花牌(用 Constants.HUAPAI 即 0m 当作花牌)
export const is_guobiao_huapai = (): boolean => config.mode.detail_rule._guobiao_huapai;

// 国标模式是否禁用8番缚
export const is_guobiao_no_8fanfu = (): boolean => config.mode.detail_rule._guobiao_no_8fanfu;

// 国标模式是否可以连庄
export const is_guobiao_lianzhuang = (): boolean => config.mode.detail_rule._guobiao_lianzhuang;

// 国标模式为了美观, 将点数放大的倍数
export const scale_points = (): number => {
    if (typeof config.mode.detail_rule._scale_points == 'number')
        return config.mode.detail_rule._scale_points;
    return 100;
};

// 国标模式诈和, 错和赔各家的点数
export const cuohu_points = (): number => {
    if (typeof config.mode.detail_rule._cuohu_points == 'number')
        return config.mode.detail_rule._cuohu_points;
    return 10;
};

// 国标诈和, 错和后玩家是否陪打
export const is_cuohupeida = (): boolean => config.mode.detail_rule._cuohupeida;

// ------------------------------------------------------------------------

// 是否随机皮肤, 开启此选项后设置的皮肤无效
export const is_random_skin = (): boolean => config.mode.detail_rule._random_skin;

// 是否随机装扮, 范围包括立直棒, 和牌特效, 立直特效, 头像框, 桌布, 称号, 开启此选项后设置的对应装扮均无效
export const is_random_views = (): boolean => config.mode.detail_rule._random_views;

/**
 * 回放用装扮随机池和中文服无法加载和排除的装扮, 键是 slot, 值是对应的装扮id数组
 */
export const views_pool: { [p: number]: number[] } = {}, invalid_views: { [p: number]: number[] } = {
    // 头像框
    5: [
        305501,  // 头像框-默认
        305510,  // 头像框-四象战
        305511,  // 头像框-四象战
        305512,  // 头像框-四象战
        305513,  // 头像框-四象战
        305514,  // 头像框-四象战
        305515,  // 头像框-四象战
        305516,  // 头像框-四象战
        305517,  // 头像框-四象战
        305518,  // 头像框-四象战
        305519,  // 头像框-四象战
        305524,  // 头像框-四象战
        305525,  // 双聖の眷属たち
        305526,  // Team Championship Limited Portrait Frame
        305527,  // 头像框-四象战
        305528,  // 头像框-四象战
        305530,  // 头像框-四象战
        305531,  // 头像框-四象战
        305532,  // 头像框-四象战
        305533,  // 双聖の眷属たち
        305534,  // 头像框-四象战
        305535,  // 头像框-四象战
        305536,  // 头像框-四象战
        305538,  // 头像框-四象战
        305539,  // 双聖の眷属たち
        305540,  // 头像框-四象战
        305541,  // 头像框-四象战
        305543,  // 头像框-四象战
        305544,  // 头像框-四象战
        305546,  // 双聖の眷属たち
        305547,  // 头像框-四象战
        305548,  // 头像框-四象战
        305549,  // 头像框-四象战
        305550,  // 头像框-四象战
        305553,  // 双聖の眷属たち
        305555,  // 头像框-豆芽测试用
        30550001,  // 头像框-四象战
        30550002,  // 头像框-四象战
        30550003,  // 头像框-四象战
        30550004,  // 头像框-四象战
        30550005,  // 头像框-四象战
        30550006,  // 头像框-四象战
        30550007,  // 双聖の眷属たち
        30550008,  // 头像框-四象战
        30550009,  // 头像框-四象战
        30550010,  // 头像框-四象战
        30550011,  // 头像框-四象战
        30550013,  // 双聖の眷属たち
        30550015,  // 头像框-四象战
        30550018,  // Limited Portrait Frame
        30550019,  // 프로필 테두리 - MKC 2025
        30550024,  // 双聖の眷属たち
    ],
    // 称号
    11: [
        600001,  // 无称号
        600017,  // 认证玩家
        600025,  // 限时称号测试用
        600026,  // 雀魂公認の選ばれしプレイヤーG
        600029,  // インターハイ王者
        600041,  // 最強鴉天狗の愛弟子
        600043,  // Limited Title
        600044,  // 花より団子
        600048,  // 伝説の名コンビ
        600049,  // 伝説の迷コンビ
        600051,  // 虹懸かる右手
        600055,  // 麻雀スクワッド
        600066,  // みんな家族
        600067,  // ぶいすぽ女傑
        600069,  // インターハイ王者
        600071,  // 煌めく女王の星
        600072,  // 闘魂杯王者
        600073,  // 華風戦優勝
        600076,  // 雀魂インビ夏王者
        600077,  // 雀魂インビ冬将軍
        600081,  // 野鳥観察部
        600082,  // ななしサンマ王
        600085,  // ぶいすぽの頂
        600087,  // 雀荘牌舞台
        600088,  // 闘魂杯王者
        600089,  // 麒麟位2024
        600090,  // 四象战冠军
        600091,  // 四象战冠军
        600092,  // 四象战冠军
        600093,  // 花ノ国 戦国最強
        600095,  // 双聖戦優勝
        600097,  // 雀魂インビ夏王者
        600098,  // 限定称号
        600099,  // 四象战冠军
        600100,  // 四象战冠军
        600102,  // 豪勇無双のまつたけ
        600103,  // 華風戦優勝
        600104,  // Limited Title
        600105,  // MKC 2025 국사무쌍
        600106,  // 四象战冠军
        600109,  // 雀魂インビ冬将軍
        600110,  // ぶいすぽの覇者
        600111,  // プロ×魂天覇者
        600114,  // あやまらないよ！
        600115,  // 双聖戦優勝
        600122,  // 麒麟位2025
        600133,  // Limited Title
        600136,  // チームシリウス
    ],
};

// 更新装扮随机池
export const updateViews = (): void => {
    // 建议玩家随机的装扮: 立直棒(0), 和牌特效(1), 立直特效(2), 头像框(5), 桌布(6), 牌背(7), 称号(11), 牌面(13)
    const slots = [0, 1, 2, 5, 6, 7, 11, 13];
    for (let i in slots) {
        views_pool[slots[i]] = [];
        if (invalid_views[slots[i]] === undefined)
            invalid_views[slots[i]] = [];
    }

    const Items = cfg.item_definition.item.rows_, Titles = cfg.item_definition.title.rows_;
    for (let i in Items) {
        if (Items[i].name_chs === '(已过期)' || Items[i].category !== 5 || Items[i].type === 11)
            continue;
        let slot = Items[i].type;
        if (slots.includes(slot) && !invalid_views[slot].includes(Items[i].id))
            views_pool[slot].push(Items[i].id);
    }
    for (let i in Titles)
        if (!invalid_views[11].includes(Titles[i].id))
            views_pool[11].push(Titles[i].id);
};
