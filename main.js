"use strict";

// 回放用装扮
var liqibangs = [], hupais = [], liqis = [];
var avatar_frames = [], tablecloths = [], titles = [];

// 中文服无法加载的和排除的装扮
var invalid_frames = [
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
];
var invalid_titles = [
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
];

var update_views_once = true;

function update_views() {
    if (!update_views_once)
        return;
    update_views_once = false;

    let slots = [0, 1, 2, 5, 6];
    let ITEM = cfg.item_definition.item.rows_;
    let TITLE = cfg.item_definition.title.rows_;
    for (let i = 0; i < ITEM.length; i++) {
        if (ITEM[i].name_chs === "(已过期)")
            continue;
        let category = ITEM[i].category, item_slot = ITEM[i].type;
        let same_slot = false;
        for (let j = 0; j < slots.length; j++)
            if (slots[j] === item_slot)
                same_slot = true;
        if (category === 5 && same_slot) {
            let is_banned = false;
            switch (item_slot) {
                case 0:
                    liqibangs.push(ITEM[i].id);
                    break;
                case 1:
                    hupais.push(ITEM[i].id);
                    break;
                case 2:
                    liqis.push(ITEM[i].id);
                    break;
                case 5:
                    for (let j = 0; j < invalid_frames.length; j++)
                        if (invalid_frames[j] === ITEM[i].id) {
                            is_banned = true;
                            break;
                        }
                    if (!is_banned)
                        avatar_frames.push(ITEM[i].id);
                    break;
                case 6:
                    tablecloths.push(ITEM[i].id);
                    break;
                default:
                    break;
            }
        }
    }
    for (let i = 0; i < TITLE.length; i++) {
        let is_banned = false;
        for (let j = 0; j < invalid_titles.length; j++)
            if (TITLE[i].id === invalid_titles[j]) {
                is_banned = true;
                break;
            }
        if (!is_banned)
            titles.push(TITLE[i].id)
    }
}

// 自定义役种: 役种名称的汉字需要在已有的里面选, 否则不会显示
var DIY_fan_once = true;

function DIY_fan() {
    if (!DIY_fan_once)
        return;
    DIY_fan_once = false;
    // 9000: 诈和, "诈"字无法显示, 原名称为"振和"
    // 9001: 天地创造: "创造"无法显示, 原名称为"天地大白"
    // 9002: 万物生长: "万生长"无法显示, 原名称为"龙发杠载"
    // 9003: 开立直(役满): 对应语音是对局中的宣言立直
    // 9004: 开两立直(役满): 对应语音是对局中的宣言两立直
    // 9005: 开立直(2番)
    // 9006: 开两立直(3番)
    cfg.fan.fan.map_[9000] = {
        "id": 9000,
        "name_chs": "诈和",
        "name_chs_t": "诈和",
        "name_jp": "诈和",
        "name_en": "Fake winning",
        "name_kr": "诈和",
        "xuanshang": 0,
        "yiman": 0,
        "fan_menqing": 5,
        "fan_fulu": 5,
        "show_index": 5,
        "sound": "",
        "is_guyi": 0,
        "rarity": 0,
        "show_range_1": 0,
        "show_range_2": "",
        "merge_id": 0
    };
    cfg.fan.fan.map_[9001] = {
        "id": 9001,
        "name_chs": "天地创造",
        "name_chs_t": "天地创造",
        "name_jp": "天地创造",
        "name_en": "Beginning of the Cosmos",
        "name_kr": "天地创造",
        "xuanshang": 0,
        "yiman": 6,
        "fan_menqing": 78,
        "fan_fulu": 78,
        "show_index": 6,
        "sound": "",
        "is_guyi": 0,
        "rarity": 0,
        "show_range_1": 0,
        "show_range_2": "",
        "merge_id": 0
    };
    cfg.fan.fan.map_[9002] = {
        "id": 9002,
        "name_chs": "万物生长",
        "name_chs_t": "万物生长",
        "name_jp": "万物生长",
        "name_en": "Sprout of the Earth",
        "name_kr": "万物生长",
        "xuanshang": 0,
        "yiman": 6,
        "fan_menqing": 78,
        "fan_fulu": 78,
        "show_index": 7,
        "sound": "",
        "is_guyi": 0,
        "rarity": 0,
        "show_range_1": 0,
        "show_range_2": "",
        "merge_id": 0
    };
    cfg.fan.fan.map_[9003] = {
        "id": 9003,
        "name_chs": "役满 开立直",
        "name_chs_t": "役满 开立直",
        "name_jp": "役满 开立直",
        "name_en": "Open Reach",
        "name_kr": "役满 开立直",
        "xuanshang": 0,
        "yiman": 1,
        "fan_menqing": 1,
        "fan_fulu": 1,
        "show_index": 0,
        "sound": "act_rich",
        "is_guyi": 0,
        "rarity": 0,
        "show_range_1": 0,
        "show_range_2": "",
        "merge_id": 0
    };
    cfg.fan.fan.map_[9004] = {
        "id": 9004,
        "name_chs": "役满 开两立直",
        "name_chs_t": "役满 开两立直",
        "name_jp": "役满 开两立直",
        "name_en": "Open Double Reach",
        "name_kr": "役满 开两立直",
        "xuanshang": 0,
        "yiman": 1,
        "fan_menqing": 1,
        "fan_fulu": 1,
        "show_index": 0,
        "sound": "act_drich",
        "is_guyi": 0,
        "rarity": 0,
        "show_range_1": 0,
        "show_range_2": "",
        "merge_id": 0
    };
    cfg.fan.fan.map_[9005] = {
        "id": 9005,
        "name_chs": "开立直",
        "name_chs_t": "开立直",
        "name_jp": "开立直",
        "name_en": "Open Reach",
        "name_kr": "开立直",
        "xuanshang": 0,
        "yiman": 0,
        "fan_menqing": 2,
        "fan_fulu": 2,
        "show_index": 0,
        "sound": "fan_liqi",
        "is_guyi": 0,
        "rarity": 0,
        "show_range_1": 0,
        "show_range_2": "",
        "merge_id": 0
    };
    cfg.fan.fan.map_[9006] = {
        "id": 9006,
        "name_chs": "开两立直",
        "name_chs_t": "开两立直",
        "name_jp": "开两立直",
        "name_en": "Open Double Reach",
        "name_kr": "开两立直",
        "xuanshang": 0,
        "yiman": 0,
        "fan_menqing": 3,
        "fan_fulu": 3,
        "show_index": 0,
        "sound": "fan_dliqi",
        "is_guyi": 0,
        "rarity": 0,
        "show_range_1": 0,
        "show_range_2": "",
        "merge_id": 0
    };

    // 以下是流局满贯和自风场风役种分化
    // 9100: 流局满贯
    // 9101: 东
    // 9102: 双东
    // 9103: 南
    // 9104: 双南
    // 9105: 西: "西"显示不出来
    // 9106: 双西
    // 9107: 北
    // 9108: 双北
    cfg.fan.fan.map_[9100] = {
        "id": 9100,
        "name_chs": "流局满贯",
        "name_chs_t": "流局滿貫",
        "name_jp": "流局滿貫",
        "name_en": "mangan at draw",
        "name_kr": "流局满贯",
        "xuanshang": 0,
        "yiman": 0,
        "fan_menqing": 5,
        "fan_fulu": 5,
        "show_index": 2000,
        "sound": "fan_liujumanguan",
        "is_guyi": 0,
        "rarity": 0,
        "show_range_1": 0,
        "show_range_2": "",
        "merge_id": 0
    };
    cfg.fan.fan.map_[9101] = {
        "id": 9101,
        "name_chs": "役牌 东",
        "name_chs_t": "役牌 東",
        "name_jp": "役牌 東",
        "name_en": "East Wind",
        "name_kr": "役牌 东",
        "xuanshang": 0,
        "yiman": 0,
        "fan_menqing": 1,
        "fan_fulu": 1,
        "show_index": 150,
        "sound": "fan_dong",
        "is_guyi": 0,
        "rarity": 0,
        "show_range_1": 0,
        "show_range_2": "",
        "merge_id": 0
    };
    cfg.fan.fan.map_[9102] = {
        "id": 9102,
        "name_chs": "役牌 连东",
        "name_chs_t": "役牌 連東",
        "name_jp": "役牌 連東",
        "name_en": "Double East Wind",
        "name_kr": "役牌 连东",
        "xuanshang": 0,
        "yiman": 0,
        "fan_menqing": 1,
        "fan_fulu": 1,
        "show_index": 150,
        "sound": "fan_doubledong",
        "is_guyi": 0,
        "rarity": 0,
        "show_range_1": 0,
        "show_range_2": "",
        "merge_id": 0
    };
    cfg.fan.fan.map_[9103] = {
        "id": 9103,
        "name_chs": "役牌 南",
        "name_chs_t": "役牌 南",
        "name_jp": "役牌 南",
        "name_en": "South Wind",
        "name_kr": "役牌 南",
        "xuanshang": 0,
        "yiman": 0,
        "fan_menqing": 1,
        "fan_fulu": 1,
        "show_index": 150,
        "sound": "fan_nan",
        "is_guyi": 0,
        "rarity": 0,
        "show_range_1": 0,
        "show_range_2": "",
        "merge_id": 0
    };
    cfg.fan.fan.map_[9104] = {
        "id": 9104,
        "name_chs": "役牌 连南",
        "name_chs_t": "役牌 連南",
        "name_jp": "役牌 連南",
        "name_en": "Double South Wind",
        "name_kr": "役牌 连南",
        "xuanshang": 0,
        "yiman": 0,
        "fan_menqing": 1,
        "fan_fulu": 1,
        "show_index": 150,
        "sound": "fan_doublenan",
        "is_guyi": 0,
        "rarity": 0,
        "show_range_1": 0,
        "show_range_2": "",
        "merge_id": 0
    };
    cfg.fan.fan.map_[9105] = {
        "id": 9105,
        "name_chs": "役牌 西",
        "name_chs_t": "役牌 西",
        "name_jp": "役牌 西",
        "name_en": "West Wind",
        "name_kr": "役牌 西",
        "xuanshang": 0,
        "yiman": 0,
        "fan_menqing": 1,
        "fan_fulu": 1,
        "show_index": 150,
        "sound": "fan_xi",
        "is_guyi": 0,
        "rarity": 0,
        "show_range_1": 0,
        "show_range_2": "",
        "merge_id": 0
    };
    cfg.fan.fan.map_[9106] = {
        "id": 9106,
        "name_chs": "役牌 连西",
        "name_chs_t": "役牌 連西",
        "name_jp": "役牌 連西",
        "name_en": "Double West Wind",
        "name_kr": "役牌 连西",
        "xuanshang": 0,
        "yiman": 0,
        "fan_menqing": 1,
        "fan_fulu": 1,
        "show_index": 150,
        "sound": "fan_doublexi",
        "is_guyi": 0,
        "rarity": 0,
        "show_range_1": 0,
        "show_range_2": "",
        "merge_id": 0
    };
    cfg.fan.fan.map_[9107] = {
        "id": 9107,
        "name_chs": "役牌 北",
        "name_chs_t": "役牌 北",
        "name_jp": "役牌 北",
        "name_en": "North Wind",
        "name_kr": "役牌 北",
        "xuanshang": 0,
        "yiman": 0,
        "fan_menqing": 1,
        "fan_fulu": 1,
        "show_index": 160,
        "sound": "fan_bei",
        "is_guyi": 0,
        "rarity": 0,
        "show_range_1": 0,
        "show_range_2": "",
        "merge_id": 0
    };
    cfg.fan.fan.map_[9108] = {
        "id": 9107,
        "name_chs": "役牌 连北",
        "name_chs_t": "役牌 連北",
        "name_jp": "役牌 連北",
        "name_en": "Double North Wind",
        "name_kr": "役牌 连北",
        "xuanshang": 0,
        "yiman": 0,
        "fan_menqing": 1,
        "fan_fulu": 1,
        "show_index": 160,
        "sound": "fan_doublebei",
        "is_guyi": 0,
        "rarity": 0,
        "show_range_1": 0,
        "show_range_2": "",
        "merge_id": 0
    };

    // 对局操作语音, 中间会有较长时间的停顿
    // 9200: 立直
    // 9201: 两立直
    // 9202: 吃
    // 9203: 碰
    // 9204: 杠
    // 9205: 拔北
    // 9206: 荣, "荣"无法显示, 原名称为"点和"
    // 9207: 自摸
    cfg.fan.fan.map_[9200] = {
        "id": 9200,
        "name_chs": "立直",
        "name_chs_t": "立直",
        "name_jp": "立直",
        "name_en": "Reach",
        "name_kr": "立直",
        "xuanshang": 0,
        "yiman": 0,
        "fan_menqing": 0,
        "fan_fulu": 0,
        "show_index": 0,
        "sound": "act_rich",
        "is_guyi": 0,
        "rarity": 0,
        "show_range_1": 0,
        "show_range_2": "",
        "merge_id": 0
    };
    cfg.fan.fan.map_[9201] = {
        "id": 9200,
        "name_chs": "双立直",
        "name_chs_t": "双立直",
        "name_jp": "双立直",
        "name_en": "Double Reach",
        "name_kr": "双立直",
        "xuanshang": 0,
        "yiman": 0,
        "fan_menqing": 0,
        "fan_fulu": 0,
        "show_index": 0,
        "sound": "act_drich",
        "is_guyi": 0,
        "rarity": 0,
        "show_range_1": 0,
        "show_range_2": "",
        "merge_id": 0
    };
    cfg.fan.fan.map_[9202] = {
        "id": 9202,
        "name_chs": "吃",
        "name_chs_t": "吃",
        "name_jp": "吃",
        "name_en": "Chi",
        "name_kr": "吃",
        "xuanshang": 0,
        "yiman": 0,
        "fan_menqing": 0,
        "fan_fulu": 0,
        "show_index": 0,
        "sound": "act_chi",
        "is_guyi": 0,
        "rarity": 0,
        "show_range_1": 0,
        "show_range_2": "",
        "merge_id": 0
    };
    cfg.fan.fan.map_[9203] = {
        "id": 9203,
        "name_chs": "碰",
        "name_chs_t": "碰",
        "name_jp": "碰",
        "name_en": "Pon",
        "name_kr": "碰",
        "xuanshang": 0,
        "yiman": 0,
        "fan_menqing": 0,
        "fan_fulu": 0,
        "show_index": 0,
        "sound": "act_pon",
        "is_guyi": 0,
        "rarity": 0,
        "show_range_1": 0,
        "show_range_2": "",
        "merge_id": 0
    };
    cfg.fan.fan.map_[9204] = {
        "id": 9204,
        "name_chs": "杠",
        "name_chs_t": "杠",
        "name_jp": "杠",
        "name_en": "Kan",
        "name_kr": "杠",
        "xuanshang": 0,
        "yiman": 0,
        "fan_menqing": 0,
        "fan_fulu": 0,
        "show_index": 0,
        "sound": "act_kan",
        "is_guyi": 0,
        "rarity": 0,
        "show_range_1": 0,
        "show_range_2": "",
        "merge_id": 0
    };
    cfg.fan.fan.map_[9205] = {
        "id": 9205,
        "name_chs": "拔北",
        "name_chs_t": "拔北",
        "name_jp": "拔北",
        "name_en": "Babei",
        "name_kr": "拔北",
        "xuanshang": 0,
        "yiman": 0,
        "fan_menqing": 0,
        "fan_fulu": 0,
        "show_index": 0,
        "sound": "act_babei",
        "is_guyi": 0,
        "rarity": 0,
        "show_range_1": 0,
        "show_range_2": "",
        "merge_id": 0
    };
    cfg.fan.fan.map_[9206] = {
        "id": 9206,
        "name_chs": "荣和",
        "name_chs_t": "荣和",
        "name_jp": "荣和",
        "name_en": "Ron",
        "name_kr": "荣和",
        "xuanshang": 0,
        "yiman": 0,
        "fan_menqing": 0,
        "fan_fulu": 0,
        "show_index": 0,
        "sound": "act_ron",
        "is_guyi": 0,
        "rarity": 0,
        "show_range_1": 0,
        "show_range_2": "",
        "merge_id": 0
    };
    cfg.fan.fan.map_[9207] = {
        "id": 9207,
        "name_chs": "自摸",
        "name_chs_t": "自摸",
        "name_jp": "自摸",
        "name_en": "Tsumo",
        "name_kr": "自摸",
        "xuanshang": 0,
        "yiman": 0,
        "fan_menqing": 0,
        "fan_fulu": 0,
        "show_index": 0,
        "sound": "act_tumo",
        "is_guyi": 0,
        "rarity": 0,
        "show_range_1": 0,
        "show_range_2": "",
        "merge_id": 0
    };
    // 9208: 终局一位语音(天地无双指一姬的)
    cfg.fan.fan.map_[9208] = {
        "id": 9208,
        "name_chs": "天地无双",
        "name_chs_t": "天地无双",
        "name_jp": "天地无双",
        "name_en": "tianxiawushuangmiao",
        "name_kr": "天地无双",
        "xuanshang": 0,
        "yiman": 0,
        "fan_menqing": 0,
        "fan_fulu": 0,
        "show_index": 9999,
        "sound": "game_top",
        "is_guyi": 0,
        "rarity": 0,
        "show_range_1": 0,
        "show_range_2": "",
        "merge_id": 0
    };

    // 满贯及以上和听牌语音
    // 9300: 满贯
    // 9301: 跳满, "跳"无法显示, 原名称为"一点五满贯"
    // 9302: 倍满, "倍"无法显示, 原名称为"两满贯"
    // 9303: 三倍满
    // 9304: 役满
    // 9305: 双倍役满
    // 9306: 三倍役满
    // 9307: 四倍役满
    // 9308: 五倍役满
    // 9309: 六倍役满
    // 9310: 累计役满, "累计"无法显示, 原名称为"数满贯"
    // 9311: 听牌, "听"无法显示
    // 9312: 未听牌, "未"无法显示, 原名称为"无听牌"
    cfg.fan.fan.map_[9300] = {
        "id": 9300,
        "name_chs": "满贯",
        "name_chs_t": "满贯",
        "name_jp": "满贯",
        "name_en": "mangan",
        "name_kr": "满贯",
        "xuanshang": 0,
        "yiman": 0,
        "fan_menqing": 0,
        "fan_fulu": 0,
        "show_index": 0,
        "sound": "gameend_manguan",
        "is_guyi": 0,
        "rarity": 0,
        "show_range_1": 0,
        "show_range_2": "",
        "merge_id": 0
    };
    cfg.fan.fan.map_[9301] = {
        "id": 9301,
        "name_chs": "跳满",
        "name_chs_t": "跳满",
        "name_jp": "跳满",
        "name_en": "tiaoman",
        "name_kr": "跳满",
        "xuanshang": 0,
        "yiman": 0,
        "fan_menqing": 0,
        "fan_fulu": 0,
        "show_index": 0,
        "sound": "gameend_tiaoman",
        "is_guyi": 0,
        "rarity": 0,
        "show_range_1": 0,
        "show_range_2": "",
        "merge_id": 0
    };
    cfg.fan.fan.map_[9302] = {
        "id": 9302,
        "name_chs": "倍满",
        "name_chs_t": "倍满",
        "name_jp": "倍满",
        "name_en": "beiman",
        "name_kr": "倍满",
        "xuanshang": 0,
        "yiman": 0,
        "fan_menqing": 0,
        "fan_fulu": 0,
        "show_index": 0,
        "sound": "gameend_beiman",
        "is_guyi": 0,
        "rarity": 0,
        "show_range_1": 0,
        "show_range_2": "",
        "merge_id": 0
    };
    cfg.fan.fan.map_[9303] = {
        "id": 9303,
        "name_chs": "三倍满",
        "name_chs_t": "三倍满",
        "name_jp": "三倍满",
        "name_en": "sanbeiman",
        "name_kr": "三倍满",
        "xuanshang": 0,
        "yiman": 0,
        "fan_menqing": 0,
        "fan_fulu": 0,
        "show_index": 0,
        "sound": "gameend_sanbeiman",
        "is_guyi": 0,
        "rarity": 0,
        "show_range_1": 0,
        "show_range_2": "",
        "merge_id": 0
    };
    cfg.fan.fan.map_[9304] = {
        "id": 9304,
        "name_chs": "役满",
        "name_chs_t": "役满",
        "name_jp": "役满",
        "name_en": "yakuman",
        "name_kr": "役满",
        "xuanshang": 0,
        "yiman": 0,
        "fan_menqing": 0,
        "fan_fulu": 0,
        "show_index": 0,
        "sound": "gameend_yiman1",
        "is_guyi": 0,
        "rarity": 0,
        "show_range_1": 0,
        "show_range_2": "",
        "merge_id": 0
    };
    cfg.fan.fan.map_[9305] = {
        "id": 9305,
        "name_chs": "两倍役满",
        "name_chs_t": "两倍役满",
        "name_jp": "两倍役满",
        "name_en": "Double Yakuman",
        "name_kr": "两倍役满",
        "xuanshang": 0,
        "yiman": 0,
        "fan_menqing": 0,
        "fan_fulu": 0,
        "show_index": 0,
        "sound": "gameend_yiman2",
        "is_guyi": 0,
        "rarity": 0,
        "show_range_1": 0,
        "show_range_2": "",
        "merge_id": 0
    };
    cfg.fan.fan.map_[9306] = {
        "id": 9306,
        "name_chs": "三倍役满",
        "name_chs_t": "三倍役满",
        "name_jp": "三倍役满",
        "name_en": "Triple Yakuman",
        "name_kr": "三倍役满",
        "xuanshang": 0,
        "yiman": 0,
        "fan_menqing": 0,
        "fan_fulu": 0,
        "show_index": 0,
        "sound": "gameend_yiman3",
        "is_guyi": 0,
        "rarity": 0,
        "show_range_1": 0,
        "show_range_2": "",
        "merge_id": 0
    };
    cfg.fan.fan.map_[9307] = {
        "id": 9307,
        "name_chs": "四倍役满",
        "name_chs_t": "四倍役满",
        "name_jp": "四倍役满",
        "name_en": "Yakumans",
        "name_kr": "四倍役满",
        "xuanshang": 0,
        "yiman": 0,
        "fan_menqing": 0,
        "fan_fulu": 0,
        "show_index": 0,
        "sound": "gameend_yiman4",
        "is_guyi": 0,
        "rarity": 0,
        "show_range_1": 0,
        "show_range_2": "",
        "merge_id": 0
    };
    cfg.fan.fan.map_[9308] = {
        "id": 9308,
        "name_chs": "五倍役满",
        "name_chs_t": "五倍役满",
        "name_jp": "五倍役满",
        "name_en": "Yakumans",
        "name_kr": "五倍役满",
        "xuanshang": 0,
        "yiman": 0,
        "fan_menqing": 0,
        "fan_fulu": 0,
        "show_index": 0,
        "sound": "gameend_yiman5",
        "is_guyi": 0,
        "rarity": 0,
        "show_range_1": 0,
        "show_range_2": "",
        "merge_id": 0
    };
    cfg.fan.fan.map_[9309] = {
        "id": 9309,
        "name_chs": "六倍役满",
        "name_chs_t": "六倍役满",
        "name_jp": "六倍役满",
        "name_en": "Yakumans",
        "name_kr": "六倍役满",
        "xuanshang": 0,
        "yiman": 0,
        "fan_menqing": 0,
        "fan_fulu": 0,
        "show_index": 0,
        "sound": "gameend_yiman6",
        "is_guyi": 0,
        "rarity": 0,
        "show_range_1": 0,
        "show_range_2": "",
        "merge_id": 0
    };
    cfg.fan.fan.map_[9310] = {
        "id": 9310,
        "name_chs": "累计役满",
        "name_chs_t": "累计役满",
        "name_jp": "累计役满",
        "name_en": "Yakumans",
        "name_kr": "累计役满",
        "xuanshang": 0,
        "yiman": 0,
        "fan_menqing": 0,
        "fan_fulu": 0,
        "show_index": 0,
        "sound": "gameend_leijiyiman",
        "is_guyi": 0,
        "rarity": 0,
        "show_range_1": 0,
        "show_range_2": "",
        "merge_id": 0
    };
    cfg.fan.fan.map_[9311] = {
        "id": 9311,
        "name_chs": "听牌",
        "name_chs_t": "听牌",
        "name_jp": "听牌",
        "name_en": "tingpai",
        "name_kr": "听牌",
        "xuanshang": 0,
        "yiman": 0,
        "fan_menqing": 0,
        "fan_fulu": 0,
        "show_index": 2000,
        "sound": "gameend_tingpai",
        "is_guyi": 0,
        "rarity": 0,
        "show_range_1": 0,
        "show_range_2": "",
        "merge_id": 0
    };
    cfg.fan.fan.map_[9312] = {
        "id": 9310,
        "name_chs": "未听牌",
        "name_chs_t": "未听牌",
        "name_jp": "未听牌",
        "name_en": "noting",
        "name_kr": "未听牌",
        "xuanshang": 0,
        "yiman": 0,
        "fan_menqing": 0,
        "fan_fulu": 0,
        "show_index": 2000,
        "sound": "gameend_noting",
        "is_guyi": 0,
        "rarity": 0,
        "show_range_1": 0,
        "show_range_2": "",
        "merge_id": 0
    };

    // 流局语音, 这里可以穿插到川麻的番种中
    // 9400: 四风连打
    // 9400: 四杠散了, "散"无法显示
    // 9400: 九种九牌, "种"无法显示
    cfg.fan.fan.map_[9400] = {
        "id": 9400,
        "name_chs": "四风连打",
        "name_chs_t": "四风连打",
        "name_jp": "四风连打",
        "name_en": "sifenglianda",
        "name_kr": "四风连打",
        "xuanshang": 0,
        "yiman": 0,
        "fan_menqing": 0,
        "fan_fulu": 0,
        "show_index": 0,
        "sound": "gameend_sifenglianda",
        "is_guyi": 0,
        "rarity": 0,
        "show_range_1": 0,
        "show_range_2": "",
        "merge_id": 0
    };
    cfg.fan.fan.map_[9401] = {
        "id": 9401,
        "name_chs": "四杠散了",
        "name_chs_t": "四杠散了",
        "name_jp": "四杠散了",
        "name_en": "sigangsanle",
        "name_kr": "四杠散了",
        "xuanshang": 0,
        "yiman": 0,
        "fan_menqing": 0,
        "fan_fulu": 0,
        "show_index": 0,
        "sound": "gameend_sigangliuju",
        "is_guyi": 0,
        "rarity": 0,
        "show_range_1": 0,
        "show_range_2": "",
        "merge_id": 0
    };
    cfg.fan.fan.map_[9402] = {
        "id": 9402,
        "name_chs": "九种九牌",
        "name_chs_t": "九种九牌",
        "name_jp": "九种九牌",
        "name_en": "jiuzhongjiupai",
        "name_kr": "九种九牌",
        "xuanshang": 0,
        "yiman": 0,
        "fan_menqing": 0,
        "fan_fulu": 0,
        "show_index": 0,
        "sound": "gameend_jiuzhongjiupai",
        "is_guyi": 0,
        "rarity": 0,
        "show_range_1": 0,
        "show_range_2": "",
        "merge_id": 0
    };

    // 大厅交互语音
    // 9500: 获得语音, 都无法显示
    // 9501: 登录语音普通, "语音普"无法显示
    // 9502: 登录语音满羁绊, "语音羁绊"无法显示
    // 9503: 大厅交互语音1, "厅互语音"无法显示
    // 9504: 大厅交互语音2
    // 9505: 大厅交互语音3
    // 9506: 大厅交互语音4
    // 9507: 大厅交互语音5
    // 9508: 大厅交互语音6
    // 9509: 大厅交互语音7
    // 9510: 大厅交互语音8
    // 9511: 送礼物语音普通, "送语音普"无法显示
    // 9512: 送礼物语音喜好, "送语音"无法显示
    // 9513: 好感度升级语音1, "感度升级语音"无法显示
    // 9514: 好感度升级语音2
    // 9515: 好感度升级语音3
    // 9516: 好感度升级语音4
    // 9517: 好感度升级语音5
    // 9518: 契约语音, 都无法显示
    // 9519: 新年语音, "新语音"无法显示
    // 9520: 情人节语音, "情节语音"无法显示
    cfg.fan.fan.map_[9500] = {
        "id": 9500,
        "name_chs": "获得语音",
        "name_chs_t": "获得语音",
        "name_jp": "获得语音",
        "name_en": "selfintro",
        "name_kr": "获得语音",
        "xuanshang": 0,
        "yiman": 0,
        "fan_menqing": 0,
        "fan_fulu": 0,
        "show_index": 0,
        "sound": "lobby_selfintro",
        "is_guyi": 0,
        "rarity": 0,
        "show_range_1": 0,
        "show_range_2": "",
        "merge_id": 0
    };
    cfg.fan.fan.map_[9501] = {
        "id": 9501,
        "name_chs": "登录语音普通",
        "name_chs_t": "登录语音普通",
        "name_jp": "登录语音普通",
        "name_en": "playerlogin",
        "name_kr": "登录语音普通",
        "xuanshang": 0,
        "yiman": 0,
        "fan_menqing": 0,
        "fan_fulu": 0,
        "show_index": 0,
        "sound": "lobby_playerlogin",
        "is_guyi": 0,
        "rarity": 0,
        "show_range_1": 0,
        "show_range_2": "",
        "merge_id": 0
    };
    cfg.fan.fan.map_[9502] = {
        "id": 9502,
        "name_chs": "登录语音满羁绊",
        "name_chs_t": "登录语音满羁绊",
        "name_jp": "登录语音满羁绊",
        "name_en": "playerlogin_max",
        "name_kr": "登录语音满羁绊",
        "xuanshang": 0,
        "yiman": 0,
        "fan_menqing": 0,
        "fan_fulu": 0,
        "show_index": 0,
        "sound": "lobby_playerlogin",
        "is_guyi": 0,
        "rarity": 0,
        "show_range_1": 0,
        "show_range_2": "",
        "merge_id": 0
    };
    cfg.fan.fan.map_[9503] = {
        "id": 9503,
        "name_chs": "大厅交互语音1",
        "name_chs_t": "大厅交互语音1",
        "name_jp": "大厅交互语音1",
        "name_en": "lobby_normal1",
        "name_kr": "大厅交互语音1",
        "xuanshang": 0,
        "yiman": 0,
        "fan_menqing": 0,
        "fan_fulu": 0,
        "show_index": 0,
        "sound": "lobby_normal",
        "is_guyi": 0,
        "rarity": 0,
        "show_range_1": 0,
        "show_range_2": "",
        "merge_id": 0
    };
    cfg.fan.fan.map_[9504] = {
        "id": 9504,
        "name_chs": "大厅交互语音2",
        "name_chs_t": "大厅交互语音2",
        "name_jp": "大厅交互语音2",
        "name_en": "lobby_normal2",
        "name_kr": "大厅交互语音2",
        "xuanshang": 0,
        "yiman": 0,
        "fan_menqing": 0,
        "fan_fulu": 0,
        "show_index": 0,
        "sound": "lobby_normal",
        "is_guyi": 0,
        "rarity": 0,
        "show_range_1": 0,
        "show_range_2": "",
        "merge_id": 0
    };
    cfg.fan.fan.map_[9505] = {
        "id": 9505,
        "name_chs": "大厅交互语音3",
        "name_chs_t": "大厅交互语音3",
        "name_jp": "大厅交互语音3",
        "name_en": "lobby_normal3",
        "name_kr": "大厅交互语音3",
        "xuanshang": 0,
        "yiman": 0,
        "fan_menqing": 0,
        "fan_fulu": 0,
        "show_index": 0,
        "sound": "lobby_normal",
        "is_guyi": 0,
        "rarity": 0,
        "show_range_1": 0,
        "show_range_2": "",
        "merge_id": 0
    };
    cfg.fan.fan.map_[9506] = {
        "id": 9506,
        "name_chs": "大厅交互语音4",
        "name_chs_t": "大厅交互语音4",
        "name_jp": "大厅交互语音4",
        "name_en": "lobby_normal4",
        "name_kr": "大厅交互语音4",
        "xuanshang": 0,
        "yiman": 0,
        "fan_menqing": 0,
        "fan_fulu": 0,
        "show_index": 0,
        "sound": "lobby_normal",
        "is_guyi": 0,
        "rarity": 0,
        "show_range_1": 0,
        "show_range_2": "",
        "merge_id": 0
    };
    cfg.fan.fan.map_[9507] = {
        "id": 9507,
        "name_chs": "大厅交互语音5",
        "name_chs_t": "大厅交互语音5",
        "name_jp": "大厅交互语音5",
        "name_en": "lobby_normal5",
        "name_kr": "大厅交互语音5",
        "xuanshang": 0,
        "yiman": 0,
        "fan_menqing": 0,
        "fan_fulu": 0,
        "show_index": 0,
        "sound": "lobby_normal",
        "is_guyi": 0,
        "rarity": 0,
        "show_range_1": 0,
        "show_range_2": "",
        "merge_id": 0
    };
    cfg.fan.fan.map_[9508] = {
        "id": 9508,
        "name_chs": "大厅交互语音6",
        "name_chs_t": "大厅交互语音6",
        "name_jp": "大厅交互语音6",
        "name_en": "lobby_normal6",
        "name_kr": "大厅交互语音6",
        "xuanshang": 0,
        "yiman": 0,
        "fan_menqing": 0,
        "fan_fulu": 0,
        "show_index": 0,
        "sound": "lobby_normal",
        "is_guyi": 0,
        "rarity": 0,
        "show_range_1": 0,
        "show_range_2": "",
        "merge_id": 0
    };
    cfg.fan.fan.map_[9509] = {
        "id": 9509,
        "name_chs": "大厅交互语音7",
        "name_chs_t": "大厅交互语音7",
        "name_jp": "大厅交互语音7",
        "name_en": "lobby_normal7",
        "name_kr": "大厅交互语音7",
        "xuanshang": 0,
        "yiman": 0,
        "fan_menqing": 0,
        "fan_fulu": 0,
        "show_index": 0,
        "sound": "lobby_normal",
        "is_guyi": 0,
        "rarity": 0,
        "show_range_1": 0,
        "show_range_2": "",
        "merge_id": 0
    };
    cfg.fan.fan.map_[9510] = {
        "id": 9510,
        "name_chs": "大厅交互语音8",
        "name_chs_t": "大厅交互语音8",
        "name_jp": "大厅交互语音8",
        "name_en": "lobby_normal8",
        "name_kr": "大厅交互语音8",
        "xuanshang": 0,
        "yiman": 0,
        "fan_menqing": 0,
        "fan_fulu": 0,
        "show_index": 0,
        "sound": "lobby_normal",
        "is_guyi": 0,
        "rarity": 0,
        "show_range_1": 0,
        "show_range_2": "",
        "merge_id": 0
    };
    cfg.fan.fan.map_[9511] = {
        "id": 9511,
        "name_chs": "送礼物语音普通",
        "name_chs_t": "送礼物语音普通",
        "name_jp": "送礼物语音普通",
        "name_en": "lobby_gift",
        "name_kr": "送礼物语音普通",
        "xuanshang": 0,
        "yiman": 0,
        "fan_menqing": 0,
        "fan_fulu": 0,
        "show_index": 0,
        "sound": "lobby_gift",
        "is_guyi": 0,
        "rarity": 0,
        "show_range_1": 0,
        "show_range_2": "",
        "merge_id": 0
    };
    cfg.fan.fan.map_[9512] = {
        "id": 9512,
        "name_chs": "送礼物语音喜好",
        "name_chs_t": "送礼物语音喜好",
        "name_jp": "送礼物语音喜好",
        "name_en": "lobby_gift_favor",
        "name_kr": "送礼物语音喜好",
        "xuanshang": 0,
        "yiman": 0,
        "fan_menqing": 0,
        "fan_fulu": 0,
        "show_index": 0,
        "sound": "lobby_gift_favor",
        "is_guyi": 0,
        "rarity": 0,
        "show_range_1": 0,
        "show_range_2": "",
        "merge_id": 0
    };
    cfg.fan.fan.map_[9513] = {
        "id": 9513,
        "name_chs": "好感度升级语音1",
        "name_chs_t": "好感度升级语音1",
        "name_jp": "好感度升级语音1",
        "name_en": "lobby_levelup1",
        "name_kr": "好感度升级语音1",
        "xuanshang": 0,
        "yiman": 0,
        "fan_menqing": 0,
        "fan_fulu": 0,
        "show_index": 0,
        "sound": "lobby_levelup1",
        "is_guyi": 0,
        "rarity": 0,
        "show_range_1": 0,
        "show_range_2": "",
        "merge_id": 0
    };
    cfg.fan.fan.map_[9514] = {
        "id": 9514,
        "name_chs": "好感度升级语音2",
        "name_chs_t": "好感度升级语音2",
        "name_jp": "好感度升级语音2",
        "name_en": "lobby_levelup2",
        "name_kr": "好感度升级语音2",
        "xuanshang": 0,
        "yiman": 0,
        "fan_menqing": 0,
        "fan_fulu": 0,
        "show_index": 0,
        "sound": "lobby_levelup2",
        "is_guyi": 0,
        "rarity": 0,
        "show_range_1": 0,
        "show_range_2": "",
        "merge_id": 0
    };
    cfg.fan.fan.map_[9515] = {
        "id": 9515,
        "name_chs": "好感度升级语音3",
        "name_chs_t": "好感度升级语音3",
        "name_jp": "好感度升级语音3",
        "name_en": "lobby_levelup3",
        "name_kr": "好感度升级语音3",
        "xuanshang": 0,
        "yiman": 0,
        "fan_menqing": 0,
        "fan_fulu": 0,
        "show_index": 0,
        "sound": "lobby_levelup3",
        "is_guyi": 0,
        "rarity": 0,
        "show_range_1": 0,
        "show_range_2": "",
        "merge_id": 0
    };
    cfg.fan.fan.map_[9516] = {
        "id": 9516,
        "name_chs": "好感度升级语音4",
        "name_chs_t": "好感度升级语音4",
        "name_jp": "好感度升级语音4",
        "name_en": "lobby_levelup4",
        "name_kr": "好感度升级语音4",
        "xuanshang": 0,
        "yiman": 0,
        "fan_menqing": 0,
        "fan_fulu": 0,
        "show_index": 0,
        "sound": "lobby_levelup4",
        "is_guyi": 0,
        "rarity": 0,
        "show_range_1": 0,
        "show_range_2": "",
        "merge_id": 0
    };
    cfg.fan.fan.map_[9517] = {
        "id": 9517,
        "name_chs": "好感度升级语音5",
        "name_chs_t": "好感度升级语音5",
        "name_jp": "好感度升级语音5",
        "name_en": "lobby_levelmax",
        "name_kr": "好感度升级语音5",
        "xuanshang": 0,
        "yiman": 0,
        "fan_menqing": 0,
        "fan_fulu": 0,
        "show_index": 0,
        "sound": "lobby_levelmax",
        "is_guyi": 0,
        "rarity": 0,
        "show_range_1": 0,
        "show_range_2": "",
        "merge_id": 0
    };
    cfg.fan.fan.map_[9517] = {
        "id": 9517,
        "name_chs": "好感度升级语音5",
        "name_chs_t": "好感度升级语音5",
        "name_jp": "好感度升级语音5",
        "name_en": "lobby_manjiban",
        "name_kr": "好感度升级语音5",
        "xuanshang": 0,
        "yiman": 0,
        "fan_menqing": 0,
        "fan_fulu": 0,
        "show_index": 0,
        "sound": "lobby_manjiban",
        "is_guyi": 0,
        "rarity": 0,
        "show_range_1": 0,
        "show_range_2": "",
        "merge_id": 0
    };
    cfg.fan.fan.map_[9518] = {
        "id": 9518,
        "name_chs": "契约语音",
        "name_chs_t": "契约语音",
        "name_jp": "契约语音",
        "name_en": "lobby_qiyue",
        "name_kr": "契约语音",
        "xuanshang": 0,
        "yiman": 0,
        "fan_menqing": 0,
        "fan_fulu": 0,
        "show_index": 0,
        "sound": "lobby_qiyue",
        "is_guyi": 0,
        "rarity": 0,
        "show_range_1": 0,
        "show_range_2": "",
        "merge_id": 0
    };
    cfg.fan.fan.map_[9519] = {
        "id": 9519,
        "name_chs": "新年语音",
        "name_chs_t": "新年语音",
        "name_jp": "新年语音",
        "name_en": "lobby_newyear",
        "name_kr": "新年语音",
        "xuanshang": 0,
        "yiman": 0,
        "fan_menqing": 0,
        "fan_fulu": 0,
        "show_index": 0,
        "sound": "lobby_newyear",
        "is_guyi": 0,
        "rarity": 0,
        "show_range_1": 0,
        "show_range_2": "",
        "merge_id": 0
    };
    cfg.fan.fan.map_[9520] = {
        "id": 9520,
        "name_chs": "情人节语音",
        "name_chs_t": "情人节语音",
        "name_jp": "情人节语音",
        "name_en": "lobby_valentine",
        "name_kr": "情人节语音",
        "xuanshang": 0,
        "yiman": 0,
        "fan_menqing": 0,
        "fan_fulu": 0,
        "show_index": 0,
        "sound": "lobby_valentine",
        "is_guyi": 0,
        "rarity": 0,
        "show_range_1": 0,
        "show_range_2": "",
        "merge_id": 0
    };

    // 对局契约特殊语音
    // 9600: 连续打出多张相同牌, "续出多张"无法显示
    // 9600: 打出宝牌, "出"无法显示
    // 9600: 余牌少于10, "余少于"无法显示
    // 9600: 役满听牌, "听"无法显示
    // 9600: 倍满/三倍满听牌, "倍听"无法显示
    cfg.fan.fan.map_[9600] = {
        "id": 9600,
        "name_chs": "连续打出多张相同牌",
        "name_chs_t": "连续打出多张相同牌",
        "name_jp": "连续打出多张相同牌",
        "name_en": "ingame_lianda",
        "name_kr": "连续打出多张相同牌",
        "xuanshang": 0,
        "yiman": 0,
        "fan_menqing": 0,
        "fan_fulu": 0,
        "show_index": 0,
        "sound": "ingame_lianda",
        "is_guyi": 0,
        "rarity": 0,
        "show_range_1": 0,
        "show_range_2": "",
        "merge_id": 0
    };
    cfg.fan.fan.map_[9601] = {
        "id": 9601,
        "name_chs": "打出宝牌",
        "name_chs_t": "打出宝牌",
        "name_jp": "打出宝牌",
        "name_en": "ingame_baopai",
        "name_kr": "打出宝牌",
        "xuanshang": 0,
        "yiman": 0,
        "fan_menqing": 0,
        "fan_fulu": 0,
        "show_index": 0,
        "sound": "ingame_baopai",
        "is_guyi": 0,
        "rarity": 0,
        "show_range_1": 0,
        "show_range_2": "",
        "merge_id": 0
    };
    cfg.fan.fan.map_[9602] = {
        "id": 9602,
        "name_chs": "余牌少于10",
        "name_chs_t": "余牌少于10",
        "name_jp": "余牌少于10",
        "name_en": "ingame_remain10",
        "name_kr": "余牌少于10",
        "xuanshang": 0,
        "yiman": 0,
        "fan_menqing": 0,
        "fan_fulu": 0,
        "show_index": 0,
        "sound": "ingame_remain10",
        "is_guyi": 0,
        "rarity": 0,
        "show_range_1": 0,
        "show_range_2": "",
        "merge_id": 0
    };
    cfg.fan.fan.map_[9603] = {
        "id": 9603,
        "name_chs": "役满听牌",
        "name_chs_t": "役满听牌",
        "name_jp": "役满听牌",
        "name_en": "ingame_yiman",
        "name_kr": "役满听牌",
        "xuanshang": 0,
        "yiman": 0,
        "fan_menqing": 0,
        "fan_fulu": 0,
        "show_index": 0,
        "sound": "ingame_yiman",
        "is_guyi": 0,
        "rarity": 0,
        "show_range_1": 0,
        "show_range_2": "",
        "merge_id": 0
    };
    cfg.fan.fan.map_[9604] = {
        "id": 9604,
        "name_chs": "倍满/三倍满听牌",
        "name_chs_t": "倍满/三倍满听牌",
        "name_jp": "倍满/三倍满听牌",
        "name_en": "ingame_beiman",
        "name_kr": "倍满/三倍满听牌",
        "xuanshang": 0,
        "yiman": 0,
        "fan_menqing": 0,
        "fan_fulu": 0,
        "show_index": 0,
        "sound": "ingame_beiman",
        "is_guyi": 0,
        "rarity": 0,
        "show_range_1": 0,
        "show_range_2": "",
        "merge_id": 0
    };

    // 一番街的特色古役
    // 9700: 推不倒, "推倒"无法显示, 原名称为"对称牌"
    // 9701: 赤三色, "赤"无法显示, 原名称为"红三色"
    // 9702: 三色通贯
    // 9703: 四连刻
    // 9704: 一色四同顺
    // 9705: 红孔雀, "孔雀"无法显示, 原名称为"红一色"
    // 9706: 红一点
    // 9707: 黑一色, "黑"无法显示, 原名称为"暗一色"
    // 9708: 十三不搭, "搭"无法显示, 原名称为"十三不顺"
    // 9709: 百万石, "百万"无法显示, 原名称为"1000000石"
    // 9710: 金门桥, "桥"无法显示, 原名称为"金门顺"
    // 9711: 东北新干线, "新干线"无法显示, 原名称"东北一气通贯"
    // 9712: 无发绿一色
    cfg.fan.fan.map_[9700] = {
        "id": 9700,
        "name_chs": "推不倒",
        "name_chs_t": "推不倒",
        "name_jp": "推不倒",
        "name_en": "",
        "name_kr": "推不倒",
        "xuanshang": 0,
        "yiman": 0,
        "fan_menqing": 1,
        "fan_fulu": 1,
        "show_index": 0,
        "sound": "",
        "is_guyi": 0,
        "rarity": 0,
        "show_range_1": 2000,
        "show_range_2": "",
        "merge_id": 0
    };
    cfg.fan.fan.map_[9701] = {
        "id": 9701,
        "name_chs": "赤三色",
        "name_chs_t": "赤三色",
        "name_jp": "赤三色",
        "name_en": "",
        "name_kr": "赤三色",
        "xuanshang": 0,
        "yiman": 0,
        "fan_menqing": 2,
        "fan_fulu": 2,
        "show_index": 0,
        "sound": "",
        "is_guyi": 0,
        "rarity": 0,
        "show_range_1": 2000,
        "show_range_2": "",
        "merge_id": 0
    };
    cfg.fan.fan.map_[9702] = {
        "id": 9702,
        "name_chs": "三色通贯",
        "name_chs_t": "三色通贯",
        "name_jp": "三色通贯",
        "name_en": "",
        "name_kr": "三色通贯",
        "xuanshang": 0,
        "yiman": 0,
        "fan_menqing": 2,
        "fan_fulu": 1,
        "show_index": 0,
        "sound": "",
        "is_guyi": 0,
        "rarity": 0,
        "show_range_1": 2000,
        "show_range_2": "",
        "merge_id": 0
    };
    cfg.fan.fan.map_[9703] = {
        "id": 9703,
        "name_chs": "四连刻",
        "name_chs_t": "四连刻",
        "name_jp": "四连刻",
        "name_en": "",
        "name_kr": "四连刻",
        "xuanshang": 0,
        "yiman": 1,
        "fan_menqing": 1,
        "fan_fulu": 1,
        "show_index": 0,
        "sound": "",
        "is_guyi": 0,
        "rarity": 0,
        "show_range_1": 2000,
        "show_range_2": "",
        "merge_id": 0
    };
    cfg.fan.fan.map_[9704] = {
        "id": 9704,
        "name_chs": "一色四同顺",
        "name_chs_t": "一色四同顺",
        "name_jp": "一色四同顺",
        "name_en": "",
        "name_kr": "一色四同顺",
        "xuanshang": 0,
        "yiman": 1,
        "fan_menqing": 1,
        "fan_fulu": 1,
        "show_index": 0,
        "sound": "",
        "is_guyi": 0,
        "rarity": 0,
        "show_range_1": 2000,
        "show_range_2": "",
        "merge_id": 0
    };
    cfg.fan.fan.map_[9705] = {
        "id": 9705,
        "name_chs": "红孔雀",
        "name_chs_t": "红孔雀",
        "name_jp": "红孔雀",
        "name_en": "",
        "name_kr": "红孔雀",
        "xuanshang": 0,
        "yiman": 1,
        "fan_menqing": 1,
        "fan_fulu": 1,
        "show_index": 0,
        "sound": "",
        "is_guyi": 0,
        "rarity": 0,
        "show_range_1": 2000,
        "show_range_2": "",
        "merge_id": 0
    };
    cfg.fan.fan.map_[9706] = {
        "id": 9706,
        "name_chs": "红一点",
        "name_chs_t": "红一点",
        "name_jp": "红一点",
        "name_en": "",
        "name_kr": "红一点",
        "xuanshang": 0,
        "yiman": 1,
        "fan_menqing": 1,
        "fan_fulu": 1,
        "show_index": 0,
        "sound": "",
        "is_guyi": 0,
        "rarity": 0,
        "show_range_1": 2000,
        "show_range_2": "",
        "merge_id": 0
    };
    cfg.fan.fan.map_[9707] = {
        "id": 9707,
        "name_chs": "黑一色",
        "name_chs_t": "黑一色",
        "name_jp": "黑一色",
        "name_en": "",
        "name_kr": "黑一色",
        "xuanshang": 0,
        "yiman": 1,
        "fan_menqing": 1,
        "fan_fulu": 1,
        "show_index": 0,
        "sound": "",
        "is_guyi": 0,
        "rarity": 0,
        "show_range_1": 2000,
        "show_range_2": "",
        "merge_id": 0
    };
    cfg.fan.fan.map_[9708] = {
        "id": 9708,
        "name_chs": "十三不搭",
        "name_chs_t": "十三不搭",
        "name_jp": "十三不搭",
        "name_en": "",
        "name_kr": "十三不搭",
        "xuanshang": 0,
        "yiman": 1,
        "fan_menqing": 1,
        "fan_fulu": 1,
        "show_index": 0,
        "sound": "",
        "is_guyi": 0,
        "rarity": 0,
        "show_range_1": 2000,
        "show_range_2": "",
        "merge_id": 0
    };
    cfg.fan.fan.map_[9709] = {
        "id": 9709,
        "name_chs": "百万石",
        "name_chs_t": "百万石",
        "name_jp": "百万石",
        "name_en": "",
        "name_kr": "百万石",
        "xuanshang": 0,
        "yiman": 1,
        "fan_menqing": 1,
        "fan_fulu": 1,
        "show_index": 0,
        "sound": "",
        "is_guyi": 0,
        "rarity": 0,
        "show_range_1": 2000,
        "show_range_2": "",
        "merge_id": 0
    };
    cfg.fan.fan.map_[9710] = {
        "id": 9710,
        "name_chs": "金门桥",
        "name_chs_t": "金门桥",
        "name_jp": "金门桥",
        "name_en": "",
        "name_kr": "金门桥",
        "xuanshang": 0,
        "yiman": 1,
        "fan_menqing": 1,
        "fan_fulu": 1,
        "show_index": 0,
        "sound": "",
        "is_guyi": 0,
        "rarity": 0,
        "show_range_1": 2000,
        "show_range_2": "",
        "merge_id": 0
    };
    cfg.fan.fan.map_[9711] = {
        "id": 9711,
        "name_chs": "东北新干线",
        "name_chs_t": "东北新干线",
        "name_jp": "东北新干线",
        "name_en": "",
        "name_kr": "东北新干线",
        "xuanshang": 0,
        "yiman": 1,
        "fan_menqing": 1,
        "fan_fulu": 1,
        "show_index": 0,
        "sound": "",
        "is_guyi": 0,
        "rarity": 0,
        "show_range_1": 2000,
        "show_range_2": "",
        "merge_id": 0
    };
    cfg.fan.fan.map_[9712] = {
        "id": 9712,
        "name_chs": "无发绿一色",
        "name_chs_t": "无发绿一色",
        "name_jp": "无发绿一色",
        "name_en": "",
        "name_kr": "无发绿一色",
        "xuanshang": 0,
        "yiman": 1,
        "fan_menqing": 1,
        "fan_fulu": 1,
        "show_index": 0,
        "sound": "fan_lvyise",
        "is_guyi": 0,
        "rarity": 0,
        "show_range_1": 2000,
        "show_range_2": "",
        "merge_id": 0
    };
}

// md5 计算函数, 与牌谱回放关系不大
function md5(string) {
    function md5_RotateLeft(lValue, iShiftBits) {
        return lValue << iShiftBits | lValue >>> 32 - iShiftBits;
    }

    function md5_AddUnsigned(lX, lY) {
        let lX4, lY4, lX8, lY8, lResult;
        lX8 = lX & 0x80000000;
        lY8 = lY & 0x80000000;
        lX4 = lX & 0x40000000;
        lY4 = lY & 0x40000000;
        lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
        if (lX4 & lY4)
            return lResult ^ 0x80000000 ^ lX8 ^ lY8;
        if (lX4 | lY4) {
            if (lResult & 0x40000000)
                return lResult ^ 0xC0000000 ^ lX8 ^ lY8;
            else
                return lResult ^ 0x40000000 ^ lX8 ^ lY8;
        } else
            return lResult ^ lX8 ^ lY8;
    }

    function md5_F(x, y, z) {
        return x & y | ~x & z;
    }

    function md5_G(x, y, z) {
        return x & z | y & ~z;
    }

    function md5_H(x, y, z) {
        return x ^ y ^ z;
    }

    function md5_I(x, y, z) {
        return y ^ (x | ~z);
    }

    function md5_FF(a, b, c, d, x, s, ac) {
        a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_F(b, c, d), x), ac));
        return md5_AddUnsigned(md5_RotateLeft(a, s), b);
    }

    function md5_GG(a, b, c, d, x, s, ac) {
        a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_G(b, c, d), x), ac));
        return md5_AddUnsigned(md5_RotateLeft(a, s), b);
    }

    function md5_HH(a, b, c, d, x, s, ac) {
        a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_H(b, c, d), x), ac));
        return md5_AddUnsigned(md5_RotateLeft(a, s), b);
    }

    function md5_II(a, b, c, d, x, s, ac) {
        a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_I(b, c, d), x), ac));
        return md5_AddUnsigned(md5_RotateLeft(a, s), b);
    }

    function md5_ConvertToWordArray(string) {
        let lWordCount;
        let lMessageLength = string.length;
        let lNumberOfWords_temp1 = lMessageLength + 8;
        let lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64;
        let lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
        let lWordArray = Array(lNumberOfWords - 1);
        let lBytePosition = 0;
        let lByteCount = 0;
        while (lByteCount < lMessageLength) {
            lWordCount = (lByteCount - (lByteCount % 4)) / 4;
            lBytePosition = (lByteCount % 4) * 8;
            lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount) << lBytePosition));
            lByteCount++;
        }
        lWordCount = (lByteCount - (lByteCount % 4)) / 4;
        lBytePosition = (lByteCount % 4) * 8;
        lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
        lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
        lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
        return lWordArray;
    }

    function md5_WordToHex(lValue) {
        let WordToHexValue = "",
            WordToHexValue_temp = "",
            lByte, lCount;
        for (lCount = 0; lCount <= 3; lCount++) {
            lByte = (lValue >>> (lCount * 8)) & 255;
            WordToHexValue_temp = "0" + lByte.toString(16);
            WordToHexValue = WordToHexValue + WordToHexValue_temp.substring(WordToHexValue_temp.length - 2);
        }
        return WordToHexValue;
    }

    function md5_Utf8Encode(string) {
        string = string.replace(/\r\n/g, "\n");
        let utftext = "";
        for (let n = 0; n < string.length; n++) {
            let c = string.charCodeAt(n);
            if (c < 128)
                utftext += String.fromCharCode(c);
            else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
        }
        return utftext;
    }

    let x;
    let k, AA, BB, CC, DD, a, b, c, d;
    let S11 = 7, S12 = 12, S13 = 17, S14 = 22;
    let S21 = 5, S22 = 9, S23 = 14, S24 = 20;
    let S31 = 4, S32 = 11, S33 = 16, S34 = 23;
    let S41 = 6, S42 = 10, S43 = 15, S44 = 21;
    string = md5_Utf8Encode(string);
    x = md5_ConvertToWordArray(string);
    a = 0x67452301;
    b = 0xEFCDAB89;
    c = 0x98BADCFE;
    d = 0x10325476;
    for (k = 0; k < x.length; k += 16) {
        AA = a;
        BB = b;
        CC = c;
        DD = d;
        a = md5_FF(a, b, c, d, x[k], S11, 0xD76AA478);
        d = md5_FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756);
        c = md5_FF(c, d, a, b, x[k + 2], S13, 0x242070DB);
        b = md5_FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE);
        a = md5_FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF);
        d = md5_FF(d, a, b, c, x[k + 5], S12, 0x4787C62A);
        c = md5_FF(c, d, a, b, x[k + 6], S13, 0xA8304613);
        b = md5_FF(b, c, d, a, x[k + 7], S14, 0xFD469501);
        a = md5_FF(a, b, c, d, x[k + 8], S11, 0x698098D8);
        d = md5_FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF);
        c = md5_FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1);
        b = md5_FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE);
        a = md5_FF(a, b, c, d, x[k + 12], S11, 0x6B901122);
        d = md5_FF(d, a, b, c, x[k + 13], S12, 0xFD987193);
        c = md5_FF(c, d, a, b, x[k + 14], S13, 0xA679438E);
        b = md5_FF(b, c, d, a, x[k + 15], S14, 0x49B40821);
        a = md5_GG(a, b, c, d, x[k + 1], S21, 0xF61E2562);
        d = md5_GG(d, a, b, c, x[k + 6], S22, 0xC040B340);
        c = md5_GG(c, d, a, b, x[k + 11], S23, 0x265E5A51);
        b = md5_GG(b, c, d, a, x[k], S24, 0xE9B6C7AA);
        a = md5_GG(a, b, c, d, x[k + 5], S21, 0xD62F105D);
        d = md5_GG(d, a, b, c, x[k + 10], S22, 0x2441453);
        c = md5_GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681);
        b = md5_GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8);
        a = md5_GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6);
        d = md5_GG(d, a, b, c, x[k + 14], S22, 0xC33707D6);
        c = md5_GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87);
        b = md5_GG(b, c, d, a, x[k + 8], S24, 0x455A14ED);
        a = md5_GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905);
        d = md5_GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8);
        c = md5_GG(c, d, a, b, x[k + 7], S23, 0x676F02D9);
        b = md5_GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A);
        a = md5_HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942);
        d = md5_HH(d, a, b, c, x[k + 8], S32, 0x8771F681);
        c = md5_HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122);
        b = md5_HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C);
        a = md5_HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44);
        d = md5_HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9);
        c = md5_HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60);
        b = md5_HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70);
        a = md5_HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6);
        d = md5_HH(d, a, b, c, x[k], S32, 0xEAA127FA);
        c = md5_HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085);
        b = md5_HH(b, c, d, a, x[k + 6], S34, 0x4881D05);
        a = md5_HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039);
        d = md5_HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5);
        c = md5_HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8);
        b = md5_HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665);
        a = md5_II(a, b, c, d, x[k], S41, 0xF4292244);
        d = md5_II(d, a, b, c, x[k + 7], S42, 0x432AFF97);
        c = md5_II(c, d, a, b, x[k + 14], S43, 0xAB9423A7);
        b = md5_II(b, c, d, a, x[k + 5], S44, 0xFC93A039);
        a = md5_II(a, b, c, d, x[k + 12], S41, 0x655B59C3);
        d = md5_II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92);
        c = md5_II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D);
        b = md5_II(b, c, d, a, x[k + 1], S44, 0x85845DD1);
        a = md5_II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F);
        d = md5_II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0);
        c = md5_II(c, d, a, b, x[k + 6], S43, 0xA3014314);
        b = md5_II(b, c, d, a, x[k + 13], S44, 0x4E0811A1);
        a = md5_II(a, b, c, d, x[k + 4], S41, 0xF7537E82);
        d = md5_II(d, a, b, c, x[k + 11], S42, 0xBD3AF235);
        c = md5_II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB);
        b = md5_II(b, c, d, a, x[k + 9], S44, 0xEB86D391);
        a = md5_AddUnsigned(a, AA);
        b = md5_AddUnsigned(b, BB);
        c = md5_AddUnsigned(c, CC);
        d = md5_AddUnsigned(d, DD);
    }
    return (md5_WordToHex(a) + md5_WordToHex(b) + md5_WordToHex(c) + md5_WordToHex(d)).toLowerCase();
}

// editgame 是在线改(进入牌谱之后的修改, 如切换视角和切换巡目), edit 是离线改(进入牌谱之前改)
function editgame(editdata) {
    try {
        let UI_Replay = uiscript.UI_Replay.Inst;
        let rounds = [];
        for (let i = 0; i < editdata.actions.length; i++) {
            let whatever = {'actions': editdata.actions[i], 'xun': []};

            try { // 线上修改
                whatever.xun = editdata.xun[i][view.DesktopMgr.Inst.seat];
            } catch (e) { // 线下修改
                whatever.xun = editdata.xun[i][0];
            }
            rounds.push(whatever);
        }
        UI_Replay.rounds = rounds;
        UI_Replay.gameResult.result.players = editdata.players;
    } catch (e) {
        throw (e);
    }
}

// 回放接口, 在 edit 中重写, 并在 canceledit 中复原
// 其中 showInfo_mj 的重写在 guobiao.js 中
var resetData, checkPaiPu, showInfo_mj;

function edit(x) {
    try {
        if (resetData === undefined)
            resetData = uiscript.UI_Replay.prototype.resetData;
        if (checkPaiPu === undefined)
            checkPaiPu = GameMgr.Inst.checkPaiPu;
        if (showInfo_mj === undefined)
            showInfo_mj = uiscript.UI_Win.prototype._showInfo_mj;

        if (x === undefined)
            x = JSON.parse(JSON.stringify(editdata));

        // 玩家信息
        function player_datas(a) {
            let ret = [];
            let views_pool = [];
            views_pool[0] = liqibangs, views_pool[1] = hupais, views_pool[2] = liqis;
            views_pool[5] = avatar_frames, views_pool[6] = tablecloths, views_pool[11] = titles;
            let slot_num = [0, 1, 2, 5, 6, 11];
            // 建议玩家随机的装扮: 立直棒(0), 和牌特效(1), 立直特效(2), 头像框(5), 桌布(6), 称号(11)
            for (let seat = 0; seat < x.player_datas.length; seat++) {
                ret[seat] = {
                    'account_id': x.player_datas[seat].avatar_id * 10 + seat,
                    'seat': seat,
                    'nickname': x.player_datas[seat].nickname,
                    'avatar_id': x.player_datas[seat].avatar_id,
                    'character': {
                        'charid': cfg.item_definition.skin.map_[x.player_datas[seat].avatar_id].character_id,
                        'level': 5,
                        "exp": 0,
                        'skin': x.player_datas[seat].avatar_id,
                        'is_upgraded': true,
                        'extra_emoji': [10, 11, 12]
                    },
                    'title': x.player_datas[seat].title,
                    'level': {'id': 10503, 'score': 4500},
                    'level3': {'id': 20503, 'score': 4500},
                    'avatar_frame': x.player_datas[seat].avatar_frame,
                    'verified': x.player_datas[seat].verified,
                    'views': x.player_datas[seat].views,
                }
                if (a[seat].account_id !== undefined)
                    ret[seat].account_id = a[seat].account_id;
                if (is_random_views()) {
                    for (let i = 0; i < slot_num.length; i++) {
                        let slot = slot_num[i];
                        let item_id = views_pool[slot][Math.floor(Math.random() * views_pool[slot].length)];
                        if (slot === 11) {
                            ret[seat].title = item_id;
                            continue;
                        }
                        if (slot === 5)
                            ret[seat].avatar_frame = item_id;
                        let existed = false;
                        for (let j = 0; j < ret[seat].views.length; j++)
                            if (ret[seat].views[j].slot === slot) {
                                ret[seat].views[j].item_id = item_id;
                                existed = true;
                            }
                        if (!existed)
                            ret[seat].views.push({
                                "slot": slot,
                                "item_id": item_id,
                            });
                    }
                }
                if (is_random_skin()) {
                    let skin_len = cfg.item_definition.skin.rows_.length;
                    let skin = cfg.item_definition.skin.rows_[Math.floor(Math.random() * skin_len)].id;
                    while (skin === 400000 || skin === 400001)
                        skin = cfg.item_definition.skin.rows_[Math.floor(Math.random() * skin_len)].id;
                    ret[seat].avatar_id = skin;
                    ret[seat].character.skin = skin;
                    ret[seat].character.charid = cfg.item_definition.skin.map_[skin].character_id;
                }
            }
            x.playerdatas = ret;
            return ret;
        }

        function is_random_views() {
            return !!(config && config.mode && config.mode.detail_rule && config.mode.detail_rule._random_views);
        }

        function is_random_skin() {
            return !!(config && config.mode && config.mode.detail_rule && config.mode.detail_rule._random_skin);
        }

        function get_tablecloth_id() {
            if (!!(config && config.mode && config.mode.detail_rule && config.mode.detail_rule._tablecloth_id !== undefined))
                return config.mode.detail_rule._tablecloth_id;
            if (x.player_datas[0].views) {
                let views = x.player_datas[0].views;
                for (let i = 0; i < views.length; i++)
                    if (views[i].slot === 6)
                        return views[i].item_id;
            }
            // 原来的桌布
            return uiscript.UI_Sushe.now_desktop_id;
        }

        function get_mjp_id() {
            if (!!(config && config.mode && config.mode.detail_rule && config.mode.detail_rule._mjp_id !== undefined))
                return config.mode.detail_rule._mjp_id;
            if (x.player_datas[0].views) {
                let views = x.player_datas[0].views;
                for (let i = 0; i < views.length; i++)
                    if (views[i].slot === 7)
                        return views[i].item_id;
            }
            // 原来的牌背
            return uiscript.UI_Sushe.now_mjp_id;
        }

        function get_mjpsurface_id() {
            if (!!(config && config.mode && config.mode.detail_rule && config.mode.detail_rule._mjpsurface_id !== undefined)) {
                if (typeof (config.mode.detail_rule._mjpsurface_id) === "boolean" && config.mode.detail_rule._mjpsurface_id)
                    return 305718; // 目前只有两个牌面, 另一个牌面是: 牌面-猫咪雀圣
                else
                    return config.mode.detail_rule._mjpsurface_id;
            }
            if (x.player_datas[0].views) {
                let views = x.player_datas[0].views;
                for (let i = 0; i < views.length; i++)
                    if (views[i].slot === 13)
                        return views[i].item_id;
            }
            // 原来的牌面
            return uiscript.UI_Sushe.now_mjp_surface_id;
        }

        // 重写 resetData 主要是为了切换视角时数据不复原, 如果不需要切换视角则可以不用管
        uiscript.UI_Replay.prototype.resetData = function () {
            let _ = resetData.call(this);
            if (typeof (editfunction2) !== "undefined")
                editfunction2();
            editgame(x);
            return _;
        }

        GameMgr.Inst.checkPaiPu = function (game_uuid, account_id, paipu_config, is_maka) {
            try {
                // 添加下面
                DIY_fan();
                update_views();
                if (typeof (guobiao_fanlist) !== "undefined")
                    guobiao_fanlist();

                is_maka = false;

                var H = GameMgr;
                // 添加上面

                var W = this;
                return void 0 === is_maka && (is_maka = !1),
                    game_uuid = game_uuid.trim(),
                    app.Log.log('checkPaiPu game_uuid:' + game_uuid + ' account_id:' + account_id['toString']() + ' paipu_config:' + paipu_config),
                    this['duringPaipu'] ? (app.Log['Error']('已经在看牌谱了'),
                        void 0) : (this['duringPaipu'] = !0,
                        uiscript['UI_Loading'].Inst.show(uiscript['ELoadingType']['EEnterMJ']),
                        H.Inst['onLoadStart']('paipu'),
                    2 & paipu_config && (game_uuid = game['Tools']['DecodePaipuUUID'](game_uuid)),
                        this['record_uuid'] = game_uuid,
                        app['NetAgent']['sendReq2Lobby']('Lobby', 'fetchGameRecord', {
                            game_uuid: game_uuid,
                            client_version_string: this['getClientVersion']()
                        }, function (l, n) {
                            if (l || n['error']) {
                                uiscript['UIMgr'].Inst['showNetReqError']('fetchGameRecord', l, n);
                                var y = 0.12;
                                uiscript['UI_Loading'].Inst['setProgressVal'](y);
                                var f = function () {
                                    return y += 0.06,
                                        uiscript['UI_Loading'].Inst['setProgressVal'](Math.min(1, y)),
                                        y >= 1.1 ? (uiscript['UI_Loading'].Inst['close'](null),
                                            uiscript['UIMgr'].Inst['showLobby'](),
                                            Laya['timer']['clear'](this, f),
                                            void 0) : void 0;
                                };
                                Laya['timer'].loop(50, W, f),
                                    W['duringPaipu'] = !1;
                            } else {
                                // 添加: 接受的牌谱信息去除 robots
                                n.head.robots = [];

                                uiscript['UI_Activity_SevenDays']['task_done'](3),
                                    uiscript['UI_Loading'].Inst['setProgressVal'](0.1);
                                var I = n.head
                                    , z = [null, null, null, null]
                                    , r = game['Tools']['strOfLocalization'](2003)
                                    , w = I['config'].mode;
                                app['NetAgent']['sendReq2Lobby']('Lobby', 'readGameRecord', {
                                    game_uuid: game_uuid,
                                    client_version_string: W['getClientVersion']()
                                }, function () {
                                }),
                                w['extendinfo'] && (r = game['Tools']['strOfLocalization'](2004)),
                                w['detail_rule'] && w['detail_rule']['ai_level'] && (1 === w['detail_rule']['ai_level'] && (r = game['Tools']['strOfLocalization'](2003)),
                                2 === w['detail_rule']['ai_level'] && (r = game['Tools']['strOfLocalization'](2004)));
                                var YY = !1;
                                I['end_time'] ? (W['record_end_time'] = I['end_time'],
                                I['end_time'] > 1576112400 && (YY = !0)) : W['record_end_time'] = -1,
                                    W['record_start_time'] = I['start_time'] ? I['start_time'] : -1;
                                for (var a = __spreadArray(__spreadArray([], I['accounts'], !0), I['robots'] || [], !0), q = 0; q < a['length']; q++) {
                                    var c = a[q];
                                    if (c['character']) {
                                        var K = c['character']
                                            , G = {};
                                        if (YY) {
                                            var M = c['views'];
                                            if (M)
                                                for (var Y = 0; Y < M['length']; Y++)
                                                    G[M[Y].slot] = M[Y]['item_id'];
                                        } else {
                                            var s = K['views'];
                                            if (s)
                                                for (var Y = 0; Y < s['length']; Y++) {
                                                    var E = s[Y].slot
                                                        , Z = s[Y]['item_id']
                                                        , m = E - 1;
                                                    G[m] = Z;
                                                }
                                        }
                                        var R = [];
                                        for (var _ in G)
                                            R.push({
                                                slot: parseInt(_),
                                                item_id: G[_],
                                                type: 0,
                                                item_id_list: []
                                            });
                                        c['views'] = R,
                                        game['Tools'].isAI(c['account_id']) && (c['avatar_id'] = c['character'].skin,
                                            c['level'] = c['level'] || {
                                                id: 10101,
                                                score: 0
                                            },
                                            c['level3'] = c['level'] || {
                                                id: 20101,
                                                score: 0
                                            },
                                            c['nickname'] = c['nickname'] || r),
                                            z[c.seat] = c;
                                    } else
                                        c['character'] = {
                                            charid: c['avatar_id'],
                                            level: 0,
                                            exp: 0,
                                            views: [],
                                            skin: cfg['item_definition']['character'].get(c['avatar_id'])['init_skin'],
                                            is_upgraded: !1,
                                            rewarded_level: [],
                                            extra_emoji: null
                                        },
                                            c['avatar_id'] = c['character'].skin,
                                            c['views'] = [],
                                            z[c.seat] = c;
                                }
                                for (var Q = game['GameUtility']['get_default_ai_skin'](), U = game['GameUtility']['get_default_ai_character'](), q = 0; q < z['length']; q++)
                                    null == z[q] && (z[q] = {
                                        nickname: r,
                                        avatar_id: Q,
                                        level: {
                                            id: 10101
                                        },
                                        level3: {
                                            id: 20101
                                        },
                                        character: {
                                            charid: U,
                                            level: 0,
                                            exp: 0,
                                            views: [],
                                            skin: Q,
                                            is_upgraded: !1
                                        }
                                    });
                                var X = [];
                                X = X['concat'](n.head['accounts']);

                                // 修改的地方: 本来是 openMJRoom 的第二个参数(单个字母), 现在套上了 player_datas 函数
                                // 本来是 openMJRoom 的第一个参数(如 X['config']), 现在是 x.config
                                // 修改 account_id 主要是为了强制修改一开始的主视角为东起, 防止一些bug
                                // 添加下面
                                let new_player_datas = player_datas(z);
                                X = new_player_datas;

                                if (cfg.item_definition.view.get(get_tablecloth_id()) !== undefined)
                                    uiscript.UI_Sushe.now_desktop_id = get_tablecloth_id();
                                if (cfg.item_definition.view.get(get_mjp_id()) !== undefined)
                                    uiscript.UI_Sushe.now_mjp_id = get_mjp_id();
                                if (cfg.item_definition.view.get(get_mjpsurface_id()) !== undefined)
                                    uiscript.UI_Sushe.now_mjp_surface_id = get_mjpsurface_id();

                                // 第一场的主视角
                                if (!!(config && config.mode && config.mode.detail_rule && typeof (config.mode.detail_rule._local_position_) === "number"))
                                    account_id = new_player_datas[config.mode.detail_rule._local_position_].account_id;
                                else
                                    account_id = new_player_datas[editdata.actions[0][0].data.ju].account_id;
                                // 添加上面

                                var C = Laya['Handler']['create'](W, function (H) {
                                    var XX = function () {
                                        game['Scene_Lobby'].Inst['active'] && (game['Scene_Lobby'].Inst['active'] = !1),
                                            game['Scene_MJ'].Inst['openMJRoom'](x.config, new_player_datas, Laya['Handler']['create'](W, function () {
                                                W['duringPaipu'] = !1,
                                                    view['DesktopMgr'].Inst['paipu_config'] = paipu_config,
                                                    view['DesktopMgr'].Inst['initRoom'](JSON['parse'](JSON['stringify'](x.config)), new_player_datas, account_id, view['EMJMode']['paipu'], Laya['Handler']['create'](W, function () {
                                                        // 添加下面4行
                                                        if (typeof (editfunction2) !== "undefined")
                                                            editfunction2();
                                                        if (x.config.mode.mode > 20)
                                                            view.DesktopMgr.Inst.rule_mode = view.ERuleMode.Liqi2;

                                                        uiscript['UI_Replay'].Inst['initMaka'](false, false),
                                                            uiscript['UI_Replay'].Inst['initData'](H),
                                                            // 添加下面1行
                                                            // editgame(x),
                                                            uiscript['UI_Replay'].Inst['enable'] = !0,
                                                            Laya['timer'].once(1000, W, function () {
                                                                W['EnterMJ']();
                                                            }),
                                                            Laya['timer'].once(1500, W, function () {
                                                                view['DesktopMgr']['player_link_state'] = [view['ELink_State']['READY'], view['ELink_State']['READY'], view['ELink_State']['READY'], view['ELink_State']['READY']],
                                                                    uiscript['UI_DesktopInfo'].Inst['refreshLinks'](),
                                                                    uiscript['UI_Loading'].Inst['close']();
                                                            }),
                                                            Laya['timer'].once(1000, W, function () {
                                                                uiscript['UI_Replay'].Inst['nextStep'](!0);
                                                            });
                                                    }));
                                            }), Laya['Handler']['create'](W, function (H) {
                                                return uiscript['UI_Loading'].Inst['setProgressVal'](0.1 + 0.9 * H);
                                            }, null, !1));
                                    };
                                    XX();
                                })
                                    , B = {};
                                if (B['record'] = I,
                                n.data && n.data['length'])
                                    B.game = net['MessageWrapper']['decodeMessage'](n.data),
                                        C['runWith'](B);
                                else {
                                    var O = n['data_url'];
                                    O['startsWith']('http') || (O = H['prefix_url'] + O),
                                        game['LoadMgr']['httpload'](O, 'arraybuffer', !1, Laya['Handler']['create'](W, function (H) {
                                            if (H['success']) {
                                                var N = new Laya.Byte();
                                                N['writeArrayBuffer'](H.data);
                                                var e = net['MessageWrapper']['decodeMessage'](N['getUint8Array'](0, N['length']));
                                                B.game = e,
                                                    C['runWith'](B);
                                            } else
                                                uiscript['UIMgr'].Inst['ShowErrorInfo'](game['Tools']['strOfLocalization'](2005) + n['data_url']),
                                                    uiscript['UI_Loading'].Inst['close'](null),
                                                    uiscript['UIMgr'].Inst['showLobby'](),
                                                    W['duringPaipu'] = !1;
                                        }));
                                }
                            }
                        }),
                        void 0);
            } catch (e) {
                console.error(e);
            }
        }
    } catch (e) {
    }
}

// 取消编辑
function canceledit() {
    if (resetData !== undefined)
        uiscript.UI_Replay.prototype.resetData = function () {
            return resetData.call(this);
        }
    if (checkPaiPu !== undefined)
        GameMgr.Inst.checkPaiPu = function (game_uuid, account_id, paipu_config, is_maka) {
            return checkPaiPu.call(this, game_uuid, account_id, paipu_config, is_maka);
        }
    if (showInfo_mj !== undefined)
        uiscript.UI_Win.prototype._showInfo_mj = function (e) {
            return showInfo_mj.call(this, e);
        }
}

// config: 对局房间的信息, playercnt: 玩家数, players: 玩家信息
var config = null, playercnt = 4, players = [];
// liqi_need: 立直所需要的棒子数, ben_times: 本场点数的倍数
var liqi_need = 1, ben_times = 1;
// 荒牌流局罚符(未听牌玩家向听牌玩家支付的点数)
var fafu_1ting = 3000, fafu_2ting = 1500, fafu_3ting = 1000;
var fafu_3p_1ting = 2000, fafu_3p_2ting = 1000, fafu_2p = 1000;
// tiles: 玩家的起手, paishan: 牌山
// playertiles: 玩家的手牌, fulu: 玩家的副露信息
// paihe: 玩家的牌河, discardtiles: 玩家的切牌, xun: 玩家的巡目
var tiles0 = "", tiles1 = "", tiles2 = "", tiles3 = "";
var paishan = "";
var playertiles = [[], [], [], []], fulu = [[], [], [], []];
var paihe = [], discardtiles = ["", "", "", ""], xun = [];
// liqiinfo: 立直信息, lstliqi: 宣言立直的玩家信息
var liqiinfo = [], lstliqi = null;
// doras: 表宝牌, li_doras: 里宝牌, doracnt: 表里dora数量, 及最近类型: 1表示即翻指示牌(暗杠), 2表示过一个操作才翻指示牌(明杠),
// bonus 是幻境传说模式下能否多一个dora的表现
var doras = [], li_doras = [], doracnt = {'cnt': 1, 'licnt': 1, 'lastype': 0, 'bonus': 0};
// chang: 场(东/南/西/北), ju: 局(东1/2/3/4), ben: 本场数, liqibang: 场上立直棒个数, benchangbang: 本场棒个数
var chang = 0, ju = 0, ben = 0, liqibang = 0, benchangbang = 0;
// scores: 玩家点数, delta_scores: 玩家点数变动, firstneededscores: 一位必要点数
var scores = [], delta_scores = [], firstneededscores = 0;
// drawtype: 摸牌方向: 1 表示正常摸牌, 0 表示岭上摸牌, lstdrawtype: 最近玩家摸牌方向
var drawtype = 1, lstdrawtype = 1;
// 最终要注入到牌谱回放中的内容的内容
var actions = [];
// hules_history: 和牌历史, hupaied: 玩家是否已和牌
var hules_history = [], hupaied = [];
// baopai: 玩家的包牌信息, sigangbao: 第四个明杠时, 前三副露是否都是杠子(然后第四个杠才构成包牌)
// baogangseat: 包杠的玩家
var baopai = [[], [], [], []], sigangbao = [false, false, false, false]
var baogangseat = -1;

// mingpais: 配牌明牌模式玩家所亮明的牌
var mingpais = [{}, {}, {}, {}];
// muyu: 龙之目玉模式中的目玉位置, muyutimes: 打点的倍数, muyuseats: 当前有目玉的玩家
var muyu = {'count': 5, 'seat': 0, 'id': 0}, muyutimes = [1, 1, 1, 1], muyuseats = "";
// juc: 赤羽之战第一位和牌玩家的 seat, gaps: 玩家的定缺, chuanmagangs: 川麻的开杠
var juc = -1, gaps = [], chuanmagangs = {'over': [], 'notover': []};
// 幻境传说: 命运卡3(厄运沙漏): 各家立直后舍牌数量
var spell_triple = [0, 0, 0, 0];
// 魂之一击模式中各家相关信息
var hunzhiyiji_info = [{}, {}, {}, {}];
// 咏唱之战所有玩家手摸切, max_Len 各家第1位是摸切最大长度, 第2位是手切最大长度
var shoumoqie = [[], [], [], []], shoumoqiemaxlen = [[0, 0], [0, 0], [0, 0], [0, 0]];
// 占星之战长度为3的牌候选池
var awaiting_tiles = [];

// 庄家连续和牌连庄数量, 用于八连庄
var lianzhuangcnt = 0;
// 国标花牌
var huapai = "0m";
// -----振听-----
// 造成振听的因素
// 1. 自家牌河中有听的牌 (qiepai)
// 2. 其他家切牌(qiepai), 加杠(leimingpai), 拔北(leimingpai), 暗杠(国士, leimingpai)有听的牌
// 只有切牌的时候会解除舍张振听
// 只有在摸牌和自家鸣牌的时候会解除同巡振听
// 同巡和立直振听在pass掉这张牌之后才会振听, 紧跟的操作可能是 mopai, mingpai (hupai 不影响)
var shezhangzhenting = [false, false, false, false], pretongxunzhenting = [false, false, false, false],
    prelizhizhenting = [false, false, false, false];
var tongxunzhenting = [false, false, false, false], lizhizhenting = [false, false, false, false],
    zhenting = [false, false, false, false];
// 特殊牌的后缀以及和普通牌编码的差值
var tile_suf = 't', OFFSET = 40;
var specialtiles = {
    'all': separatetile("0123456789m0123456789p0123456789s1234567z"),
    'lvyise': separatetile("0123456789m0123456789p01579s123457z"),
    'ziyise': separatetile("0123456789m0123456789p0123456789s"),
    'qinglaotou': separatetile("02345678m02345678p02345678s1234567z"),
    'duanyaojiu': separatetile("19m19p19s1234567z"),
    'hunlaotou': separatetile("02345678m02345678p02345678s"),
    'guoshiwushuang': separatetile("02345678m02345678p02345678s"),
    'qingyise_man': separatetile("0123456789p0123456789s1234567z"),
    'qingyise_pin': separatetile("0123456789m0123456789s1234567z"),
    'qingyise_sou': separatetile("0123456789m0123456789p1234567z"),
    'hunyise_man': separatetile("0123456789p0123456789s"),
    'hunyise_pin': separatetile("0123456789m0123456789s"),
    'hunyise_sou': separatetile("0123456789m0123456789p"),
};
var editdata = {
    'actions': [],
    'xun': [],
    'players': [],
    'config': undefined,
    'player_datas': [
        {'nickname': "电脑0", 'avatar_id': 400101, 'title': 600001, 'avatar_frame': 0, 'verified': 0, 'views': []},
        {'nickname': "电脑1", 'avatar_id': 400101, 'title': 600001, 'avatar_frame': 0, 'verified': 0, 'views': []},
        {'nickname': "电脑2", 'avatar_id': 400101, 'title': 600001, 'avatar_frame': 0, 'verified': 0, 'views': []},
        {'nickname': "电脑3", 'avatar_id': 400101, 'title': 600001, 'avatar_frame': 0, 'verified': 0, 'views': []},
    ]
};
var lastscene;

// nxt2 表示顺子中比它大的牌, 如果不存在则直接指向 35 和 36
// 即 j, nxt2[j], nxt2[nxt2[j]] 构成递增的顺子
// doranxt 表示指示牌对应的宝牌
// dora_spell 表示"宝牌指示牌也是宝牌", 幻境传说使用
var nxt2 = [0, 2, 3, 4, 5, 6, 7, 8, 9, 35, 11, 12, 13, 14, 15, 16, 17, 18, 35, 20, 21, 22, 23, 24, 25, 26, 27, 35, 35, 35, 35, 35, 35, 35, 35, 36, 0];
var doranxt = [0, 2, 3, 4, 5, 6, 7, 8, 9, 1, 11, 12, 13, 14, 15, 16, 17, 18, 10, 20, 21, 22, 23, 24, 25, 26, 27, 19, 29, 30, 31, 28, 33, 34, 32];
var dora_spell = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34];

// 舍张振听
function updatepreshezhang(seat) {
    if (!is_chuanma() && !is_guobiao() && !no_zhenting()) {
        // 舍张振听判断
        shezhangzhenting[seat] = false;
        let tingpais = calctingpai(seat);
        for (let i = 0; i < tingpais.length; i++)
            for (let j = 0; j < paihe[seat].tiles.length; j++)
                if (equaltile(tingpais[i].tile, paihe[seat].tiles[j]))
                    shezhangzhenting[seat] = true;
        updatezhenting();
    }
}

// leimingpai 不会造成舍张振听, 所以只有同巡和立直
// 此外, 暗杠只有国士听牌才有可能导致其他玩家振听
function updateprezhenting_2(seat, tile, is_angang = false) {
    if (!is_chuanma() && !is_guobiao() && !no_zhenting()) {
        // 其他家同巡振听预判断
        for (let i = 0; i < playercnt; i++) {
            if (i === seat)
                continue;
            let tingpais_i = calctingpai(i);
            for (let j = 0; j < tingpais_i.length; j++)
                if (equaltile(tile, tingpais_i[j].tile)) {
                    if (!is_angang) {
                        pretongxunzhenting[i] = true;
                        break;
                    } else {
                        let tiles = playertiles[i];
                        tiles.push(tile);
                        if (calchupai(tiles) === 3) {
                            pretongxunzhenting[i] = true;
                            tiles.length--;
                            break;
                        }
                        tiles.length--;
                    }
                }
        }
        // 其他家立直振听预判断
        for (let i = 0; i < playercnt; i++) {
            if (liqiinfo[i].liqi === 0)
                continue;
            let tingpais_i = calctingpai(i);
            for (let j = 0; j < tingpais_i.length; j++)
                if (equaltile(tile, tingpais_i[j].tile)) {
                    if (!is_angang) {
                        prelizhizhenting[i] = true;
                        break;
                    } else {
                        let tiles = playertiles[i];
                        tiles.push(tile);
                        if (calchupai(tiles) === 3) {
                            prelizhizhenting[i] = true;
                            tiles.length--;
                            break;
                        }
                        tiles.length--;
                    }
                }
        }
        updatezhenting();
    }
}

function updatezhenting() {
    for (let i = 0; i < playercnt; i++)
        zhenting[i] = shezhangzhenting[i] || tongxunzhenting[i] || lizhizhenting[i];
}

function saveproject() {
    let tmp = {};
    tmp.scores = JSON.parse(JSON.stringify(scores));
    tmp.tiles0 = JSON.parse(JSON.stringify(tiles0));
    tmp.tiles1 = JSON.parse(JSON.stringify(tiles1));
    tmp.tiles2 = JSON.parse(JSON.stringify(tiles2));
    tmp.tiles3 = JSON.parse(JSON.stringify(tiles3));
    tmp.firstneededscores = JSON.parse(JSON.stringify(firstneededscores));
    tmp.baopai = JSON.parse(JSON.stringify(baopai));
    tmp.liqibang = JSON.parse(JSON.stringify(liqibang));
    tmp.lstliqi = JSON.parse(JSON.stringify(lstliqi));
    tmp.doracnt = JSON.parse(JSON.stringify(doracnt));
    tmp.playertiles = JSON.parse(JSON.stringify(playertiles));
    tmp.fulu = JSON.parse(JSON.stringify(fulu));
    tmp.paihe = JSON.parse(JSON.stringify(paihe));
    tmp.muyu = JSON.parse(JSON.stringify(muyu));
    tmp.liqiinfo = JSON.parse(JSON.stringify(liqiinfo));
    tmp.drawtype = JSON.parse(JSON.stringify(drawtype));
    tmp.lstdrawtype = JSON.parse(JSON.stringify(lstdrawtype));
    tmp.doras = JSON.parse(JSON.stringify(doras));
    tmp.li_doras = JSON.parse(JSON.stringify(li_doras));
    tmp.delta_scores = JSON.parse(JSON.stringify(delta_scores));
    tmp.muyutimes = JSON.parse(JSON.stringify(muyutimes));
    tmp.muyuseats = JSON.parse(JSON.stringify(muyuseats));
    tmp.mingpais = JSON.parse(JSON.stringify(mingpais));
    tmp.chang = JSON.parse(JSON.stringify(chang));
    tmp.ju = JSON.parse(JSON.stringify(ju));
    tmp.ben = JSON.parse(JSON.stringify(ben));
    tmp.lianzhuangcnt = JSON.parse(JSON.stringify(lianzhuangcnt));
    tmp.playercnt = JSON.parse(JSON.stringify(playercnt));
    tmp.actions = JSON.parse(JSON.stringify(actions));
    tmp.xun = JSON.parse(JSON.stringify(xun));
    tmp.players = JSON.parse(JSON.stringify(players));
    tmp.benchangbang = JSON.parse(JSON.stringify(benchangbang));
    tmp.chuanmagangs = JSON.parse(JSON.stringify(chuanmagangs));
    tmp.config = JSON.parse(JSON.stringify(config));
    tmp.liqi_need = JSON.parse(JSON.stringify(liqi_need));
    tmp.ben_times = JSON.parse(JSON.stringify(ben_times));
    tmp.fafu_1ting = JSON.parse(JSON.stringify(fafu_1ting));
    tmp.fafu_2ting = JSON.parse(JSON.stringify(fafu_2ting));
    tmp.fafu_3ting = JSON.parse(JSON.stringify(fafu_3ting));
    tmp.fafu_3p_1ting = JSON.parse(JSON.stringify(fafu_3p_1ting));
    tmp.fafu_3p_2ting = JSON.parse(JSON.stringify(fafu_3p_2ting));
    tmp.fafu_2p = JSON.parse(JSON.stringify(fafu_2p));
    tmp.hules_history = JSON.parse(JSON.stringify(hules_history));
    tmp.hupaied = JSON.parse(JSON.stringify(hupaied));
    tmp.paishan = JSON.parse(JSON.stringify(paishan));
    tmp.discardtiles = JSON.parse(JSON.stringify(discardtiles));
    tmp.gaps = JSON.parse(JSON.stringify(gaps));
    tmp.juc = JSON.parse(JSON.stringify(juc));
    tmp.editdata = JSON.parse(JSON.stringify(editdata));
    tmp.baogangseat = JSON.parse(JSON.stringify(baogangseat));
    tmp.shezhangzhenting = JSON.parse(JSON.stringify(shezhangzhenting));
    tmp.pretongxunzhenting = JSON.parse(JSON.stringify(pretongxunzhenting));
    tmp.tongxunzhenting = JSON.parse(JSON.stringify(tongxunzhenting));
    tmp.prelizhizhenting = JSON.parse(JSON.stringify(prelizhizhenting));
    tmp.lizhizhenting = JSON.parse(JSON.stringify(lizhizhenting));
    tmp.zhenting = JSON.parse(JSON.stringify(zhenting));
    tmp.sigangbao = JSON.parse(JSON.stringify(sigangbao));
    tmp.spell_triple = JSON.parse(JSON.stringify(spell_triple));
    tmp.hunzhiyiji_info = JSON.parse(JSON.stringify(hunzhiyiji_info));
    tmp.shoumoqie = JSON.parse(JSON.stringify(shoumoqie));
    tmp.shoumoqiemaxlen = JSON.parse(JSON.stringify(shoumoqiemaxlen));
    tmp.awaiting_tiles = JSON.parse(JSON.stringify(awaiting_tiles));
    lastscene = tmp;
}

function loadproject(x) {
    if (x !== undefined) {
        scores = JSON.parse(JSON.stringify(x.scores));
        tiles0 = JSON.parse(JSON.stringify(x.tiles0));
        tiles1 = JSON.parse(JSON.stringify(x.tiles1));
        tiles2 = JSON.parse(JSON.stringify(x.tiles2));
        tiles3 = JSON.parse(JSON.stringify(x.tiles3));
        firstneededscores = JSON.parse(JSON.stringify(x.firstneededscores));
        baopai = JSON.parse(JSON.stringify(x.baopai));
        liqibang = JSON.parse(JSON.stringify(x.liqibang));
        lstliqi = JSON.parse(JSON.stringify(x.lstliqi));
        doracnt = JSON.parse(JSON.stringify(x.doracnt));
        playertiles = JSON.parse(JSON.stringify(x.playertiles));
        fulu = JSON.parse(JSON.stringify(x.fulu));
        paihe = JSON.parse(JSON.stringify(x.paihe));
        muyu = JSON.parse(JSON.stringify(x.muyu));
        liqiinfo = JSON.parse(JSON.stringify(x.liqiinfo));
        drawtype = JSON.parse(JSON.stringify(x.drawtype));
        lstdrawtype = JSON.parse(JSON.stringify(x.lstdrawtype));
        doras = JSON.parse(JSON.stringify(x.doras));
        li_doras = JSON.parse(JSON.stringify(x.li_doras));
        delta_scores = JSON.parse(JSON.stringify(x.delta_scores));
        muyutimes = JSON.parse(JSON.stringify(x.muyutimes));
        muyuseats = JSON.parse(JSON.stringify(x.muyuseats));
        mingpais = JSON.parse(JSON.stringify(x.mingpais));
        chang = JSON.parse(JSON.stringify(x.chang));
        ju = JSON.parse(JSON.stringify(x.ju));
        ben = JSON.parse(JSON.stringify(x.ben));
        lianzhuangcnt = JSON.parse(JSON.stringify(x.lianzhuangcnt));
        playercnt = JSON.parse(JSON.stringify(x.playercnt));
        actions = JSON.parse(JSON.stringify(x.actions));
        xun = JSON.parse(JSON.stringify(x.xun));
        players = JSON.parse(JSON.stringify(x.players));
        benchangbang = JSON.parse(JSON.stringify(x.benchangbang));
        chuanmagangs = JSON.parse(JSON.stringify(x.chuanmagangs));
        config = JSON.parse(JSON.stringify(x.config));
        liqi_need = JSON.parse(JSON.stringify(x.liqi_need));
        ben_times = JSON.parse(JSON.stringify(x.ben_times));
        fafu_1ting = JSON.parse(JSON.stringify(x.fafu_1ting));
        fafu_2ting = JSON.parse(JSON.stringify(x.fafu_2ting));
        fafu_3ting = JSON.parse(JSON.stringify(x.fafu_3ting));
        fafu_3p_1ting = JSON.parse(JSON.stringify(x.fafu_3p_1ting));
        fafu_3p_2ting = JSON.parse(JSON.stringify(x.fafu_3p_2ting));
        fafu_2p = JSON.parse(JSON.stringify(x.fafu_2p));
        hules_history = JSON.parse(JSON.stringify(x.hules_history));
        hupaied = JSON.parse(JSON.stringify(x.hupaied));
        paishan = JSON.parse(JSON.stringify(x.paishan));
        discardtiles = JSON.parse(JSON.stringify(x.discardtiles));
        gaps = JSON.parse(JSON.stringify(x.gaps));
        juc = JSON.parse(JSON.stringify(x.juc));
        editdata = JSON.parse(JSON.stringify(x.editdata));
        baogangseat = JSON.parse(JSON.stringify(x.baogangseat));
        shezhangzhenting = JSON.parse(JSON.stringify(x.shezhangzhenting));
        pretongxunzhenting = JSON.parse(JSON.stringify(x.pretongxunzhenting));
        tongxunzhenting = JSON.parse(JSON.stringify(x.tongxunzhenting));
        prelizhizhenting = JSON.parse(JSON.stringify(x.prelizhizhenting));
        lizhizhenting = JSON.parse(JSON.stringify(x.lizhizhenting));
        zhenting = JSON.parse(JSON.stringify(x.zhenting));
        sigangbao = JSON.parse(JSON.stringify(x.sigangbao));
        spell_triple = JSON.parse(JSON.stringify(x.spell_triple));
        hunzhiyiji_info = JSON.parse(JSON.stringify(x.hunzhiyiji_info));
        shoumoqie = JSON.parse(JSON.stringify(x.shoumoqie));
        shoumoqiemaxlen = JSON.parse(JSON.stringify(x.shoumoqiemaxlen));
        awaiting_tiles = JSON.parse(JSON.stringify(x.awaiting_tiles));
        return;
    }
    scores = [25000, 25000, 25000, 25000];
    tiles0 = tiles1 = tiles2 = tiles3 = "";
    liqibang = 0;
    muyu = {'count': 5, 'seat': 0, 'id': 0};
    mingpais = [{}, {}, {}, {}];
    chang = 0;
    ju = 0;
    ben = 0;
    lianzhuangcnt = 0;
    paishan = "";
    discardtiles = ["", "", "", ""];
    juc = -1;
    baogangseat = -1;
    shezhangzhenting = pretongxunzhenting = prelizhizhenting = [false, false, false, false];
    tongxunzhenting = lizhizhenting = zhenting = [false, false, false, false];
    sigangbao = [false, false, false, false];
    spell_triple = [0, 0, 0, 0];
    hunzhiyiji_info = [
        {"liqi": 0, "yifa": false, "cnt": 0, "overload": false, "is_push": false},
        {"liqi": 0, "yifa": false, "cnt": 0, "overload": false, "is_push": false},
        {"liqi": 0, "yifa": false, "cnt": 0, "overload": false, "is_push": false},
        {"liqi": 0, "yifa": false, "cnt": 0, "overload": false, "is_push": false},
    ];
    shoumoqie = [[], [], [], []];
    shoumoqiemaxlen = [[0, 0], [0, 0], [0, 0], [0, 0]];
    awaiting_tiles = [];
    editdata = {
        'actions': [],
        'xun': [],
        'players': [],
        'config': undefined,
        'player_datas': [
            {'avatar_frame': 0, 'avatar_id': 400101, 'nickname': "电脑0", 'title': 600001, 'views': []},
            {'avatar_frame': 0, 'avatar_id': 400101, 'nickname': "电脑1", 'title': 600001, 'views': []},
            {'avatar_frame': 0, 'avatar_id': 400101, 'nickname': "电脑2", 'title': 600001, 'views': []},
            {'avatar_frame': 0, 'avatar_id': 400101, 'nickname': "电脑3", 'title': 600001, 'views': []},
        ]
    };
}

function edit_online() {
    saveproject();
    if (actions.length !== 0)
        roundend(true);
    gameend(true);
    try {
        if (view.DesktopMgr.Inst.active)
            editgame(JSON.parse(JSON.stringify(editdata)));
        else
            edit(JSON.parse(JSON.stringify(editdata)));
    } catch (e) {
        edit(JSON.parse(JSON.stringify(editdata)));
    }
    loadproject(lastscene);
}

function init() {
    muyutimes = [1, 1, 1, 1];
    if (typeof (muyuseats) == "number")
        muyuseats = muyuseats.toString();
    xun = [[], [], [], []];
    gaps = [];
    baopai = [[], [], [], []];
    actions = [];
    lstliqi = null;
    chuanmagangs = {'over': [], 'notover': []};
    doracnt = {'cnt': 1, 'licnt': 1, 'lastype': 0, 'bonus': 0};
    hupaied = [false, false, false, false];
    hules_history = [];
    playertiles = [[], [], [], []];
    fulu = [[], [], [], []];
    paihe = [
        {'liujumanguan': true, 'tiles': []},
        {'liujumanguan': true, 'tiles': []},
        {'liujumanguan': true, 'tiles': []},
        {'liujumanguan': true, 'tiles': []}
    ];
    liqiinfo = [
        {'liqi': 0, 'kai': 0, 'yifa': 1},
        {'liqi': 0, 'kai': 0, 'yifa': 1},
        {'liqi': 0, 'kai': 0, 'yifa': 1},
        {'liqi': 0, 'kai': 0, 'yifa': 1}
    ];
    drawtype = 1;
    lstdrawtype = 1;
    doras = [];
    li_doras = [];
    baogangseat = -1;
    shezhangzhenting = pretongxunzhenting = prelizhizhenting = [false, false, false, false];
    tongxunzhenting = lizhizhenting = zhenting = [false, false, false, false];
    sigangbao = [false, false, false, false];
    spell_triple = [0, 0, 0, 0];
    hunzhiyiji_info = [
        {"liqi": 0, "yifa": false, "cnt": 0, "overload": false, "is_push": false},
        {"liqi": 0, "yifa": false, "cnt": 0, "overload": false, "is_push": false},
        {"liqi": 0, "yifa": false, "cnt": 0, "overload": false, "is_push": false},
        {"liqi": 0, "yifa": false, "cnt": 0, "overload": false, "is_push": false},
    ];
    shoumoqie = [[], [], [], []];
    shoumoqiemaxlen = [[0, 0], [0, 0], [0, 0], [0, 0]];
    awaiting_tiles = [];
    if (!tiles0 && !tiles1 && !tiles2 && !tiles3) { // 没有给定起手, 则模仿现实中摸牌
        if (!paishan)
            paishan = randompaishan();
        let ESWN = ["", "", "", ""];
        for (let i = 0; i < 3; i++)
            for (let j = 0; j < playercnt; j++)
                for (let k = 0; k < 4; k++)
                    ESWN[j] += pop_firstile();
        for (let i = 0; i < playercnt; i++)
            ESWN[i] += pop_firstile();
        ESWN[0] += pop_firstile();

        tiles0 = ESWN[(playercnt - ju) % playercnt];
        tiles1 = ESWN[(playercnt + 1 - ju) % playercnt];
        if (playercnt >= 3)
            tiles2 = ESWN[(playercnt + 2 - ju) % playercnt];
        if (playercnt === 4)
            tiles3 = ESWN[(playercnt + 3 - ju) % playercnt];
    }
    for (let i = 0; i < discardtiles.length; i++)
        discardtiles[i] = decompose(discardtiles[i]);
    if (typeof (tiles0) == "string")
        tiles0 = separatetile(tiles0);
    if (typeof (tiles1) == "string")
        tiles1 = separatetile(tiles1);
    if (typeof (tiles2) == "string")
        tiles2 = separatetile(tiles2);
    if (typeof (tiles3) == "string")
        tiles3 = separatetile(tiles3);
    tiles0.sort(cmp);
    tiles1.sort(cmp);
    tiles2.sort(cmp);
    tiles3.sort(cmp);
    if (tiles2.length === 0 && tiles3.length === 0) { // 二麻, 岭上牌12张
        playercnt = 2;
        for (let i = 0; i < 5; i++) {
            doras[i] = lastn_tile(13 + 2 * i);
            li_doras[i] = lastn_tile(14 + 2 * i);
        }
    } else if (tiles3.length === 0) { // 三麻, 岭上牌8张
        playercnt = 3;
        for (let i = 0; i < 5; i++) {
            doras[i] = lastn_tile(9 + 2 * i);
            li_doras[i] = lastn_tile(10 + 2 * i);
        }
    } else { // 四麻, 岭上牌4张
        playercnt = 4;
        for (let i = 0; i < 5; i++) {
            doras[i] = lastn_tile(5 + 2 * i);
            li_doras[i] = lastn_tile(6 + 2 * i);
        }
    }
    delta_scores = [];
    for (let i = 0; i < playercnt; i++)
        delta_scores[i] = 0;
    for (let i = 0; i < tiles0.length; i++)
        playertiles[0][i] = tiles0[i];
    for (let i = 0; i < tiles1.length; i++)
        playertiles[1][i] = tiles1[i];
    for (let i = 0; i < tiles2.length; i++)
        playertiles[2][i] = tiles2[i];
    for (let i = 0; i < tiles3.length; i++)
        playertiles[3][i] = tiles3[i];
}

function is_huansanzhang() {
    return !!(config && config.mode && config.mode.detail_rule && config.mode.detail_rule.huansanzhang);
}

function is_xuezhandaodi() {
    return !!(config && config.mode && config.mode.detail_rule && config.mode.detail_rule.xuezhandaodi);
}

function is_chuanma() {
    return !!(config && config.mode && config.mode.detail_rule && config.mode.detail_rule.chuanma);
}

function is_dora3() {
    return !!(config && config.mode && config.mode.detail_rule && config.mode.detail_rule.dora3_mode);
}

function is_peipaimingpai() {
    return !!(config && config.mode && config.mode.detail_rule && config.mode.detail_rule.begin_open_mode);
}

function is_muyu() {
    return !!(config && config.mode && config.mode.detail_rule && config.mode.detail_rule.muyu_mode);
}

function is_mingjing() {
    return !!(config && config.mode && config.mode.detail_rule && config.mode.detail_rule.jiuchao_mode)
}

function is_anye() {
    return !!(config && config.mode && config.mode.detail_rule && config.mode.detail_rule.reveal_discard)
}

function is_field_spell() {
    return !!(config && config.mode && config.mode.detail_rule && config.mode.detail_rule.field_spell_mode)
}

function get_field_spell_mode1() {
    if (!is_field_spell())
        return 0;
    return Math.floor(parseInt(config.mode.detail_rule.field_spell_mode) % 10);
}

function get_field_spell_mode2() {
    if (!is_field_spell())
        return 0;
    return Math.floor((parseInt(config.mode.detail_rule.field_spell_mode) % 1000) / 100);
}

function get_field_spell_mode3() {
    if (!is_field_spell())
        return 0;
    return Math.floor(parseInt(config.mode.detail_rule.field_spell_mode) / 10000);
}

function is_zhanxing() {
    return !!(config && config.mode && config.mode.detail_rule && config.mode.detail_rule.zhanxing)
}

function is_tianming() {
    return !!(config && config.mode && config.mode.detail_rule && config.mode.detail_rule.tianming_mode)
}

function is_yongchang() {
    return !!(config && config.mode && config.mode.detail_rule && config.mode.detail_rule.yongchang_mode)
}

function is_hunzhiyiji() {
    return !!(config && config.mode && config.mode.detail_rule && config.mode.detail_rule.hunzhiyiji_mode)
}

function is_wanxiangxiuluo() {
    return !!(config && config.mode && config.mode.detail_rule && config.mode.detail_rule.wanxiangxiuluo_mode)
}

function is_beishuizhizhan() {
    return !!(config && config.mode && config.mode.detail_rule && config.mode.detail_rule.beishuizhizhan_mode)
}

function is_xueliu() {
    return !!(config && config.mode && config.mode.detail_rule && config.mode.detail_rule._xueliu);
}

// ---------------------------------

function is_guyi() {
    return !!(config && config.mode && config.mode.detail_rule && config.mode.detail_rule.guyi_mode);
}

function is_yifanjieguyi() {
    return !!(config && config.mode && config.mode.detail_rule && config.mode.detail_rule._yifanjieguyi)
}

function no_shiduan() {
    return !!(config && config.mode && config.mode.detail_rule && config.mode.detail_rule._no_shiduan);
}

function no_zimosun() {
    return !!(config && config.mode && config.mode.detail_rule && config.mode.detail_rule._no_zimosun);
}

function is_openhand() {
    return !!(config && config.mode && config.mode.detail_rule && config.mode.detail_rule.open_hand);
}

// ---------------------------------

function is_qieshangmanguan() {
    return !!(config && config.mode && config.mode.detail_rule && config.mode.detail_rule._qieshangmanguan)
}

function is_toutiao() {
    return !!(config && config.mode && config.mode.detail_rule && config.mode.detail_rule._toutiao)
}

function no_normalbaopai() {
    return !!(config && config.mode && config.mode.detail_rule && config.mode.detail_rule._no_normalbaopai)
}

function sigangbaopai() {
    return !!(config && config.mode && config.mode.detail_rule && config.mode.detail_rule._sigangbaopai)
}

function no_liujumanguan() {
    return !!(config && config.mode && config.mode.detail_rule && config.mode.detail_rule._no_liujumanguan)
}

function no_yifa() {
    return !!(config && config.mode && config.mode.detail_rule && config.mode.detail_rule._no_yifa)
}

function no_lianfengsifu() {
    return !!(config && config.mode && config.mode.detail_rule && config.mode.detail_rule._no_lianfengsifu)
}

function is_dora_jifan() {
    return !!(config && config.mode && config.mode.detail_rule && config.mode.detail_rule._dora_jifan)
}

function is_sanxiangliuju() {
    return !!(config && config.mode && config.mode.detail_rule && config.mode.detail_rule._sanxiangliuju)
}

function no_leijiyiman() {
    return !!(config && config.mode && config.mode.detail_rule && config.mode.detail_rule._no_leijiyiman)
}

function no_wyakuman() {
    return !!(config && config.mode && config.mode.detail_rule && config.mode.detail_rule._no_wyakuman)
}

function no_guoshiangang() {
    return !!(config && config.mode && config.mode.detail_rule && config.mode.detail_rule._no_guoshiangang)
}

function is_renhumanguan() {
    return !!(config && config.mode && config.mode.detail_rule && config.mode.detail_rule._renhumanguan)
}

function no_dora() {
    return !!(config && config.mode && config.mode.detail_rule && config.mode.detail_rule._no_dora)
}

function no_lidora() {
    return !!(config && config.mode && config.mode.detail_rule && config.mode.detail_rule._no_lidora)
}

function no_gangdora() {
    return !!(config && config.mode && config.mode.detail_rule && config.mode.detail_rule._no_gangdora)
}

function no_ganglidora() {
    return !!(config && config.mode && config.mode.detail_rule && config.mode.detail_rule._no_ganglidora)
}

// ---------------------------------

function is_baogang() {
    return !!(config && config.mode && config.mode.detail_rule && config.mode.detail_rule._baogang)
}

function is_qingtianjing() {
    return !!(config && config.mode && config.mode.detail_rule && config.mode.detail_rule._qingtianjing)
}

function no_zhenting() {
    return !!(config && config.mode && config.mode.detail_rule && config.mode.detail_rule._no_zhenting)
}

function ronghuzhahu() {
    return !!(config && config.mode && config.mode.detail_rule && config.mode.detail_rule._ronghuzhahu)
}

// ---------------------------------

function is_guobiao() {
    return !!(config && config.mode && config.mode.detail_rule && config.mode.detail_rule._guobiao)
}

function is_guobiao_no_8fanfu() {
    return !!(config && config.mode && config.mode.detail_rule && config.mode.detail_rule._guobiao_no_8fanfu)
}

function is_guobiao_lianzhuang() {
    return !!(config && config.mode && config.mode.detail_rule && config.mode.detail_rule._guobiao_lianzhuang)
}

// ---------------------------------

function fanfu() {
    if (!!(config && config.mode && config.mode.detail_rule && config.mode.detail_rule.fanfu !== undefined))
        return config.mode.detail_rule.fanfu;
    return 1;
}

function reddora_count() {
    if (!!(config && config.mode && config.mode.detail_rule && config.mode.detail_rule.dora_count !== undefined))
        return config.mode.detail_rule.dora_count;
    return -1;
}

function get_muyu(type) {
    if (type === "new") {
        muyu.id++;
        muyu.count = 5;
        if (muyuseats && muyuseats[0]) {
            muyu.seat = parseInt(muyuseats[0]);
            muyuseats = muyuseats.substring(1);
        } else
            muyu.seat = Math.floor(Math.random() * playercnt);
        return muyu;
    }
    if (type === "countdown")
        muyu.count--;
    return muyu;
}

function update_muyu() {
    muyutimes = [1, 1, 1, 1];
    muyutimes[muyu.seat]++;
}

function decompose(x) {
    x = x.replace(/\s*/g, "");
    for (let i = 0; i < x.length; i++) {
        if (x[i] === '.' || x[i] === 'Y' || x[i] === 'D' || x[i] === 'H' || x[i] === 'T' || x[i] === 'M' || x[i] === 'P' || x[i] === 'S') {
            x = x.substring(0, i + 1) + x[i] + x.substring(i + 1);
            i++;
            continue;
        }
        if (x[i] === 'b') { // 万象修罗的百搭牌
            if (i + 1 === x.length || (i + 1 < x.length && x[i + 1] !== 'd'))
                x = x.substring(0, i + 1) + 'd' + x.substring(i + 1);
            i++;
            continue;
        }
        if (x[i] !== 'm' && x[i] !== 'p' && x[i] !== 's' && x[i] !== 'z')
            for (let j = i + 1; j < x.length; j++) {
                if (x[j] === 'm' || x[j] === 'p' || x[j] === 's' || x[j] === 'z') {
                    if (j + 1 < x.length && x[j + 1] === tile_suf) { // 以 't' 结尾的特殊牌
                        if (j !== i + 1)
                            x = x.substring(0, i + 1) + x[j] + x[j + 1] + x.substring(i + 1);
                        i += 2;
                        break;
                    } else {
                        if (j !== i + 1)
                            x = x.substring(0, i + 1) + x[j] + x.substring(i + 1);
                        i++;
                        break;
                    }
                }
            }
    }
    return x;
}

function separatetile(x) {
    x = decompose(x);
    let ret = [];
    while (x.length > 0) {
        if (x.length > 2 && x[2] === tile_suf) { // 第3位是't', 则是特殊牌
            ret.push(x.substring(0, 3));
            x = x.substring(3);
        } else {
            ret.push(x.substring(0, 2));
            x = x.substring(2);
        }
    }
    return ret;
}

function getlstaction(x) {
    if (actions.length !== 0) {
        if (x === undefined)
            x = 1;
        let ret = actions.length;
        for (let i = 1; i <= x; i++) {
            ret--;
            while (actions[ret] !== undefined && (actions[ret].name === "RecordSelectGap" || actions[ret].name === "RecordGangResult"))
                ret--;
        }
        return actions[ret];
    } else
        return editdata.actions[editdata.actions.length - 1][editdata.actions[editdata.actions.length - 1].length - 1];
}

// 咏唱之战使用, 计算最大长度
function longest_length(arr, val) {
    let len = 0;
    for (let i = 0; i < arr.length; i++)
        if (arr[i] === val) {
            let tmp_len = 1, j = i + 1;
            while (arr[j] === val && j < arr.length)
                j++;
            tmp_len = j - i;
            len = tmp_len > len ? tmp_len : len;
            i = j + 1;
        }
    return len;
}

// 咏唱之战使用, 计算奖励番
function calcbonus(val, type) {
    if (!type) { // 摸切
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
    } else { // 手切
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

// 获取 paishan 中倒数第 n 个牌
function lastn_tile(n) {
    let cnt = 0;
    for (let i = paishan.length - 1; i >= 0; i--) {
        if (paishan[i] === 'm' || paishan[i] === 'p' || paishan[i] === 's' || paishan[i] === 'z' || paishan[i] === 'd')
            cnt++;
        if (cnt === n) {
            if (i + 1 < paishan.length && paishan[i + 1] === tile_suf)
                return paishan[i - 1] + paishan[i] + tile_suf;
            else
                return paishan[i - 1] + paishan[i];
        }
    }
    console.warn("Illegal input at lastn_tile()");
    return "";
}

// 从 paishan 末尾摸走一张牌
function pop_lastile() {
    if (paishan[paishan.length - 1] === tile_suf) {
        let tile = paishan.substring(paishan.length - 3);
        paishan = paishan.substring(0, paishan.length - 3);
        return tile;
    }
    let tile = paishan.substring(paishan.length - 2);
    paishan = paishan.substring(0, paishan.length - 2);
    return tile;
}

// 获取 paishan 中正数第 n 个牌
function firstn_tile(n) {
    let cnt = 0;
    for (let i = 0; i < paishan.length; i++) {
        if (paishan[i] === 'm' || paishan[i] === 'p' || paishan[i] === 's' || paishan[i] === 'z' || paishan[i] === 'd')
            cnt++;
        if (cnt === n) {
            if (i + 1 < paishan.length && paishan[i + 1] === tile_suf)
                return paishan[i - 1] + paishan[i] + tile_suf;
            else
                return paishan[i - 1] + paishan[i];
        }
    }
    console.warn("Illegal input at firstn_tile()");
    return "";
}

// 从 paishan 开头摸走一张牌
function pop_firstile() {
    if (paishan.length > 2 && paishan[2] === tile_suf) {
        let tile = paishan.substring(0, 3);
        paishan = paishan.substring(3);
        return tile;
    }
    let tile = paishan.substring(0, 2);
    paishan = paishan.substring(2);
    return tile;
}

// 获取 paishan 中有多少个牌
function paishan_len() {
    let cnt = 0;
    for (let i = 0; i < paishan.length; i++)
        if (paishan[i] === 'm' || paishan[i] === 'p' || paishan[i] === 's' || paishan[i] === 'z' || paishan[i] === 'd')
            cnt++;
    return cnt;
}

// 消除 seat 号玩家的一个 discardtiles
function pop_discardtiles(seat) {
    if (discardtiles[seat].length > 2 && discardtiles[seat][2] === tile_suf) {
        let tile = discardtiles[seat].substring(0, 3);
        discardtiles[seat] = discardtiles[seat].substring(3);
        return tile;
    } else if (discardtiles[seat].length >= 2) {
        let tile = discardtiles[seat].substring(0, 2);
        discardtiles[seat] = discardtiles[seat].substring(2);
        return tile;
    }
    console.warn("Illegal input at pop_discardtiles()");
    return "..";
}

function get_left_tile_cnt() {
    let tmp_action;
    if (actions.length !== 0)
        tmp_action = actions;
    else
        tmp_action = editdata.actions[editdata.actions.length - 1];

    for (let i = tmp_action.length - 1; i >= 0; i--)
        if (tmp_action[i].name === "RecordNewRound" || tmp_action[i].name === "RecordDealTile" || tmp_action[i].name === "RecordFillAwaitingTiles")
            return tmp_action[i].data.left_tile_count;

    return 0;
}

// tile 是否为 dora, 用于幻境传说
function is_dora(tile) {
    if (tile[0] === '0')
        return true;
    let doras0 = calcdoras();
    for (let i = 0; i < doras0.length; i++)
        if (tiletoint(tile) === doranxt[tiletoint(doras0[i])])
            return true;

    return false;
}

function equaltile(x, y) {
    if (x[1] === y[1] && x[0] === '0' && y[0] === '5')
        return true;
    if (x[1] === y[1] && x[0] === '5' && y[0] === '0')
        return true;
    return x[0] === y[0] && x[1] === y[1];
}

// 返回和 tile 等效的所有牌, 优先把红宝牌和含有 tile_suf 放到前面
function allequaltile(tile) {
    if (tile.length >= 3)
        tile = tile.substring(0, 2);
    if (tile[0] === '0' || (tile[0] === '5' && tile[1] !== 'z'))
        return ['5' + tile[1], '5' + tile[1] + tile_suf, '0' + tile[1], '0' + tile[1] + tile_suf].reverse();
    else
        return [tile, tile + tile_suf].reverse();
}

// type 表示是否区分红宝牌, false 表示不区分, true 表示区分
// special_tile 表示是否区分以 't' 结尾的特殊牌, false 表示不区分, true 表示区分
function tiletoint(tile, type = false, special_tile = false) {
    if (tile === "bd") // 万象修罗百搭牌
        return 0;
    if (!special_tile || tile.length <= 2) {
        if (type && tile[0] === "0") {
            if (tile[1] === "m")
                return 35;
            if (tile[1] === "p")
                return 36;
            if (tile[1] === "s")
                return 37;
        }
        if (tile[0] === '0')
            tile = '5' + tile[1];

        if (tile[1] === 'm')
            return parseInt(tile);
        if (tile[1] === 'p')
            return 9 + parseInt(tile);
        if (tile[1] === 's')
            return 18 + parseInt(tile);
        if (tile[1] === 'z')
            return 27 + parseInt(tile);
    } else if (tile[2] === 't') {
        if (type && tile[0] === "0") {
            if (tile[1] === "m")
                return 35 + OFFSET;
            if (tile[1] === "p")
                return 36 + OFFSET;
            if (tile[1] === "s")
                return 37 + OFFSET;
        }
        if (tile[0] === '0')
            tile = '5' + tile[1];

        if (tile[1] === 'm')
            return parseInt(tile) + OFFSET;
        if (tile[1] === 'p')
            return 9 + parseInt(tile) + OFFSET;
        if (tile[1] === 's')
            return 18 + parseInt(tile) + OFFSET;
        if (tile[1] === 'z')
            return 27 + parseInt(tile) + OFFSET;
    }

    console.warn("Illegal input at tiletoint()");
    return -1;
}

// type 表示是否生成带 't' 结尾的特殊牌
function inttotile(x, type = false) {
    if (x === 0)
        return "bd";
    if (!type) {
        if (x >= 1 && x <= 9)
            return x.toString() + "m";
        if (x >= 10 && x <= 18)
            return (x - 9).toString() + "p";
        if (x >= 19 && x <= 27)
            return (x - 18).toString() + "s";
        if (x >= 28 && x <= 34)
            return (x - 27).toString() + "z";
        if (x === 35)
            return "0m";
        if (x === 36)
            return "0p";
        if (x === 37)
            return "0s";
    } else {
        if (x >= 1 && x <= 9)
            return x.toString() + "mt";
        if (x >= 10 && x <= 18)
            return (x - 9).toString() + "pt";
        if (x >= 19 && x <= 27)
            return (x - 18).toString() + "st";
        if (x >= 28 && x <= 34)
            return (x - 27).toString() + "zt";
        if (x === 35)
            return "0mt";
        if (x === 36)
            return "0pt";
        if (x === 37)
            return "0st";
    }

    console.warn("Illegal input at inttotile()");
    return "Xz";
}

// 查花猪, 注意 gaps 的 012 分别对应 pms, 而不是 mps
function huazhu(seat) {
    // 查手牌
    for (let i = 0; i < playertiles[seat].length; i++) {
        if (Math.floor((tiletoint(playertiles[seat][i]) - 1) / 9) === 0 && gaps[seat] === 1)
            return true;
        if (Math.floor((tiletoint(playertiles[seat][i]) - 1) / 9) === 1 && gaps[seat] === 0)
            return true;
        if (Math.floor((tiletoint(playertiles[seat][i]) - 1) / 9) === 2 && gaps[seat] === 2)
            return true;
    }
    // 查副露
    for (let i = 0; i < fulu[seat].length; i++) {
        if (Math.floor((tiletoint(fulu[seat][i].tile[0]) - 1) / 9) === 0 && gaps[seat] === 1)
            return true;
        if (Math.floor((tiletoint(fulu[seat][i].tile[0]) - 1) / 9) === 1 && gaps[seat] === 0)
            return true;
        if (Math.floor((tiletoint(fulu[seat][i].tile[0]) - 1) / 9) === 2 && gaps[seat] === 2)
            return true;
    }
    return false;
}

function erasemingpai(tile, seat) {
    if (mingpais[seat][tile] > 0) {
        mingpais[seat][tile]--;
        return true;
    }
    return false;
}

// calchupai 计算手牌为 tiles 时的和牌型, type 表示是否可能有万能牌, 返回值的含义:
// 0: 不是和牌型
// 1: 一般型和牌
// 2: 七对子和牌
// 3: 国士型和牌
// 4: 国标中全不靠和牌(不含组合龙)
// 5: 国标中全不靠和牌(含有组合龙)
// 6-11: 国标中一般组合龙和牌
// 12: 一番街古役"十三不搭"
function calchupai(tiles, type) {
    function deletetile(tiles, int) {
        for (let i = 0; i < tiles.length; i++)
            if (tiletoint(tiles[i]) === int) {
                let tmp = tiles[i];
                tiles[i] = tiles[tiles.length - 1];
                tiles[tiles.length - 1] = tmp;
                tiles.length--;
                return tiles;
            }
        return tiles;
    }
    if (type === undefined)
        type = true;

    let cnt = [], tmp = [];
    for (let i = 0; i < nxt2.length; i++)
        cnt[i] = tmp[i] = 0;
    for (let i = 0; i < tiles.length; i++)
        cnt[tiletoint(tiles[i])]++;

    if (is_guobiao())  // 国标无法听花牌, 有花牌一定不是和牌型
        for (let i = 0; i < tiles.length; i++)
            if (tiles[i] === huapai)
                return 0;

    if (is_wanxiangxiuluo() && cnt[tiletoint("bd")] === 1 && type) {
        cnt[tiletoint("bd")]--;
        let tmp_tiles = [];
        for (let i = 0; i < tiles.length; i++) {
            if (tiles[i] === "bd")
                continue;
            tmp_tiles.push(tiles[i]);
        }

        for (let i = 1; i <= 34; i++) { // 试所有百搭牌
            tmp_tiles.push(inttotile(i));
            cnt[i]++;
            let result = calchupai(tmp_tiles, false);
            if (result !== 0) // 存在百搭牌使得成为和牌型, 则返回
                return result;
            tmp_tiles.length--;
            cnt[i]--;
        }
    }

    for (let i = 1; i <= 34; i++) {
        if (cnt[i] >= 2) { // 假设雀头, 则剩下的只有4个面子
            cnt[i] -= 2;
            let ok = true; // 先假设能和, 再依条件否定
            for (let j = 0; j < nxt2.length; j++)
                tmp[j] = cnt[j];

            for (let k = 1; k <= 3; k++) {
                for (let j = k * 9 - 8; j !== 0; j = nxt2[j]) {
                    if (tmp[j] < 0) { // 若牌数量减为了负数, 说明有有未成形的顺子
                        ok = false;
                        break;
                    }
                    tmp[j] %= 3; // 去掉暗刻, 如果 tmp[j] 仍然不为0的话, 则要构成和牌型一定构成顺子
                    // j, nxt2[j], nxt2[nxt2[j]] 构成顺子, 三个一组减去
                    tmp[nxt2[j]] -= tmp[j];
                    tmp[nxt2[nxt2[j]]] -= tmp[j];
                }
                tmp[35] = tmp[36] = 0;
            }
            // 字牌不能构成暗刻
            for (let j = 28; j <= 34; j++)
                if (tmp[j] % 3 !== 0)
                    ok = false;

            cnt[i] += 2;
            if (ok)
                return 1;
        }
    }

    // 七对子
    let duizi = 0;
    for (let i = 1; i <= 34; i++) {
        if (cnt[i] === 2)
            duizi++;
        // 本来只要判断 cnt[i] === 4 就行, 这里扩展成作弊大于四张牌的情况
        if (cnt[i] >= 4 && (cnt[i] % 2 === 0) && (is_chuanma() || is_guobiao()))
            duizi += cnt[i] / 2;
    }
    if (duizi === 7)
        return 2;

    // 国士无双
    let guoshi = true;
    for (let i = 1; i <= 34; i++) {
        if (i === 1 || i === 9 || i === 10 || i === 18 || i === 19 || i >= 27 && i <= 34) {
            if (cnt[i] === 0) // 所有幺九牌都至少有一张
                guoshi = false;
        } else if (cnt[i] > 0) // 存在非幺九牌
            guoshi = false;
    }
    if (guoshi)
        return 3;

    if (is_guobiao() && tiles.length === 14) { // 国标的全不靠和七星不靠
        let quanbukao = true;
        for (let i = 0; i <= 34; i++)
            if (cnt[i] >= 2)
                quanbukao = false;
        // 3*3 的数组, 每一行代表一个花色, 三行分别对应 m, p, s 色, 每一行的三个元素分别代表是否有147, 258, 369中的牌
        let jin_huase = [
            [false, false, false],
            [false, false, false],
            [false, false, false]
        ];
        for (let j = 0; j <= 2; j++)
            for (let i = 0; i <= 8; i++)
                if (cnt[j * 9 + i + 1] === 1)
                    jin_huase[j][i % 3] = true;

        // jin_huase 的每一行, 每一列都最多只有一个 true
        for (let i = 0; i <= 2; i++) { // 扫描每一行
            let true_cnt = 0;
            for (let j = 0; j <= 2; j++)
                if (jin_huase[i][j])
                    true_cnt++;
            if (true_cnt >= 2)
                quanbukao = false;
        }
        for (let i = 0; i <= 2; i++) { // 扫描每一列
            let true_cnt = 0;
            for (let j = 0; j <= 2; j++)
                if (jin_huase[j][i])
                    true_cnt++;
            if (true_cnt >= 2)
                quanbukao = false;
        }
        if (quanbukao) {
            let zuhelong = true; // 是否复合组合龙
            for (let j = 0; j <= 2; j++)
                for (let i = 0; i <= 2; i++)
                    if (jin_huase[j][i])
                        if (!(cnt[j * 9 + 1 + i] === 1 && cnt[j * 9 + 4 + i] === 1 && cnt[j * 9 + 7 + i] === 1))
                            zuhelong = false;
            if (!zuhelong)
                return 4;
            else
                return 5;
        }
    }
    if (is_guobiao() && tiles.length >= 11) { // 国标的组合龙
        let condition = [
            [1, 4, 7, 11, 14, 17, 21, 24, 27],
            [1, 4, 7, 12, 15, 18, 20, 23, 26],
            [2, 5, 8, 10, 13, 16, 21, 24, 27],
            [2, 5, 8, 12, 15, 18, 19, 22, 25],
            [3, 6, 9, 10, 13, 16, 20, 23, 26],
            [3, 6, 9, 11, 14, 17, 19, 22, 25],
        ];
        let flag = [true, true, true, true, true, true];
        for (let j = 0; j < condition.length; j++)
            for (let i = 0; i < condition[j].length; i++)
                if (cnt[condition[j][i]] === 0)
                    flag[j] = false;

        for (let row = 0; row < condition.length; row++) {
            if (flag[row]) {
                let new_tiles = [];
                for (let i = 0; i < tiles.length; i++)
                    new_tiles[i] = tiles[i];
                for (let i = 0; i < condition[row].length; i++)
                    new_tiles = deletetile(new_tiles, condition[row][i]);
                if (calchupai(new_tiles) !== 0)
                    return 6 + row;
            }
        }
    }
    if (is_yifanjieguyi() && tiles.length === 14) {
        let shisanbuda = true;
        let duizi_num = 0;
        for (let i = 1; i <= 34; i++) {
            if (cnt[i] === 2)
                duizi_num++;
            if (cnt[i] >= 3)
                shisanbuda = false;
        }
        if (duizi_num !== 1)
            shisanbuda = false;

        for (let j = 0; j <= 2; j++)
            for (let i = 1; i <= 7; i++)
                if (cnt[j * 9 + i] >= 1)
                    if (cnt[j * 9 + i + 1] !== 0 || cnt[j * 9 + i + 2] !== 0)
                        shisanbuda = false;
        if (shisanbuda)
            return 12;
    }
    return 0;
}

// type 为 true 时考虑听第5张, 即不考虑虚听
function calctingpai(seat, type = false) {
    if (is_chuanma() && huazhu(seat))
        return [];
    let tiles = playertiles[seat];
    let cnt = [];
    for (let i = 0; i < nxt2.length; i++)
        cnt[i] = 0;
    for (let i = 0; i < tiles.length; i++)
        cnt[tiletoint(tiles[i])]++;

    if (is_guobiao()) { // 国标无法听花牌, 有花牌一定不时听牌型
        for (let i = 0; i < tiles.length; i++)
            if (tiles[i] === huapai)
                return [];
    }

    let res = [];

    for (let i = 1; i <= 34; i++) { // 试所有牌作为听牌, 检查是否为和牌型
        tiles.push(inttotile(i));
        cnt[i]++;
        // cnt[i] <= 4 为了除去虚听
        if ((cnt[i] <= 4 || type) && calchupai(tiles) !== 0 && calchupai(tiles) !== 12)
            res.push({'tile': inttotile(i)});

        tiles.length--;
        cnt[i]--;
    }
    return res;
}

function inserthules_history(x) {
    let flag = false;
    for (let i = 0; i < hules_history.length; i++) {
        let y = hules_history[i];
        let flag2 = true;
        if (x.seat !== y.seat)
            flag2 = false;
        if (x.hu_tile !== y.hu_tile)
            flag2 = false;
        if (y.fans.length !== x.fans.length)
            flag2 = false;
        if (x.dadian !== y.dadian)
            flag2 = false;
        if (x.zimo !== y.zimo)
            flag2 = false;
        if (flag2)
            for (let j = 0; j < x.fans.length; j++) {
                if (x.fans[j].val !== y.fans[j].val || x.fans[j].id !== y.fans[j].id)
                    flag2 = false;
            }
        if (flag2)
            flag = true;
    }
    if (!flag)
        hules_history.push(x);
}

function calcsudian_chuanma(x, type = 0) {
    let val = 0;
    for (let i = 0; i < x.length; i++)
        val = val + x[i].val;
    return Math.min(1000 * Math.pow(2, val - 1), 32000) + type * val;
}

// type: 0 表示一般模式, 1 表示比较模式
function calcsudian(x, type = 0) {
    let val = 0;
    for (let i = 0; i < x.fans.length; i++)
        val = val + x.fans[i].val;
    if (is_qingtianjing())
        return x.fu * Math.pow(2, val + 2);
    if (x.yiman)
        return 8000 * val + type * val + type * x.fu / 5 * 0.01;

    else if (val < fanfu())
        return -2000;
    else if (val === 5)
        return 2000 + type * val + type * x.fu / 5 * 0.01;
    else if (val === 6 || val === 7)
        return 3000 + type * val + type * x.fu / 5 * 0.01;
    else if (val >= 8 && val <= 10)
        return 4000 + type * val + type * x.fu / 5 * 0.01;
    else if (val === 11 || val === 12 || (val >= 13 && no_leijiyiman()))
        return 6000 + type * val + type * x.fu / 5 * 0.01;
    else if (val >= 13)
        return 8000 + type * val + type * x.fu / 5 * 0.01;
    else if (type === 0 && is_qieshangmanguan() && (val === 4 && x.fu === 30 || val === 3 && x.fu === 60))
        return 2000;
    else
        return Math.min(Math.pow(2, val + 2) * x.fu, 2000) + type * val + type * x.fu / 5 * 0.01;
}

// 0: 明顺    1: 明刻   2: 明杠   3: 暗杠
// 4: 北宝    5: 暗顺   6: 暗刻   7: 对子

// 1~64
// 自摸   立直   抢杠     岭上   海底   河底   白     发     中     门风
// 场风   断幺   一杯     平和   混全   一气   三色   w立    三同刻 三杠
// 对对   三暗   小三元   混老头 七对   纯全   混     二杯   清     一发
// dora   红宝   里宝     北宝   天和   地和   带三元 四暗   字一色 绿一色
// 清老头 国士   小四喜   四杠   九莲   八连庄 纯九   四单   十三面 带四喜
// 燕返   杠振   十二落抬 五门齐 三连刻 三同顺 1p摸月 9p捞鱼 人和   带车轮
// 大竹林 大数邻 石上     带七星 人和2

// type 为 false 表示正常和牌, true 表示查大叫的情况
function calcfan_chuanma(tiles, seat, zimo, type = false) {
    // 手牌少一张, 表示查大叫的情况
    if (tiles.length % 3 === 1) {
        let tingpais = calctingpai(seat), ret = [];
        for (let i = 0; i < tingpais.length; i++) {
            tiles.push(tingpais[i].tile);
            let tmp = calcfan_chuanma(tiles.slice(), seat, zimo, true);
            if (calcsudian_chuanma(tmp, 1) > calcsudian_chuanma(ret, 1))
                ret = tmp;
            tiles.length--;
        }
        return ret;
    }

    function tofan(x) {
        let ans = [];
        for (let i = 1019; i >= 1005; i--) {
            if (i === 1014 && x[1020] >= 1) { // 这里 1014 可以换成 1013, 1012
                ans.push({'val': x[1020], 'id': 1020});
                break;
            }
            if (x[i] >= 1) {
                ans.push({'val': x[i], 'id': i});
                break;
            }
            if (i === 1005 && ans.length === 0)
                ans.push({'val': x[1003], 'id': 1003});
        }
        if (x[1000] >= 1)
            ans.push({'val': x[1000], 'id': 1000});
        if (x[1001] >= 1)
            ans.push({'val': x[1001], 'id': 1001});
        if (x[1002] >= 1)
            ans.push({'val': x[1002], 'id': 1002});
        if (x[1004] >= 1)
            ans.push({'val': x[1004], 'id': 1004});
        if (x[1021] >= 1)
            ans.push({'val': x[1021], 'id': 1021});
        return ans;
    }

    let lastile = tiles[tiles.length - 1], fulucnt = 0;
    let ret = [];
    let cnt = [];
    for (let i = 0; i < nxt2.length; i++)
        cnt[i] = 0;
    for (let i = 0; i < tiles.length; i++)
        cnt[tiletoint(tiles[i])]++;
    let partition = [];
    for (let i = 0; i < fulu[seat].length; i++) {
        partition.push(fulu[seat][i]);
        fulucnt++;
    }

    function updateret(x) {
        if (calcsudian_chuanma(x, 1) > calcsudian_chuanma(ret, 1))
            ret = x;
    }

    function calc() {
        let cnt2 = [];
        for (let i = 0; i < nxt2.length; i++)
            cnt2[i] = 0;
        let partitiontmp = partition.slice();
        for (let i = partitiontmp.length - 1; i >= 0; i--) {
            let tmp_tiles = partitiontmp[i].tile;
            if (partitiontmp[i].type === 0 || partitiontmp[i].type === 5)
                for (let j = 0; j <= 2; j++)
                    cnt2[tiletoint(tmp_tiles[j])]++;
            else if (partitiontmp[i].type === 1 || partitiontmp[i].type === 6)
                cnt2[tiletoint(tmp_tiles[0])] += 3;
            else if (partitiontmp[i].type === 2 || partitiontmp[i].type === 3)
                cnt2[tiletoint(tmp_tiles[0])] += 4;
            else if (partitiontmp[i].type === 7)
                cnt2[tiletoint(tmp_tiles[0])] += 2;
        }

        function calc0() {
            let ans = [];
            // 0: 明顺    1: 明刻   2: 明杠   3: 暗杠
            // 4: 北宝    5: 暗顺   6: 暗刻   7: 对子
            let typecnt = [[]];
            let kezi = [], gangzi = [], shunzi = [];
            let kezi_num = 0, gangzi_num = 0, duizi_num = 0;
            for (let i = 0; i <= 27; i++) {
                typecnt[i] = [0, 0, 0, 0, 0, 0, 0, 0];
                kezi[i] = gangzi[i] = shunzi[i] = 0;
            }
            for (let i = 0; i < partitiontmp.length; i++) {
                let tmp_type = partitiontmp[i].type;
                switch (tmp_type) {
                    case 1:
                        kezi[tiletoint(partitiontmp[i].tile[0])]++;
                        break;
                    case 2:
                        kezi[tiletoint(partitiontmp[i].tile[0])]++;
                        gangzi[tiletoint(partitiontmp[i].tile[0])]++;
                        break;
                    case 3:
                        kezi[tiletoint(partitiontmp[i].tile[0])]++;
                        gangzi[tiletoint(partitiontmp[i].tile[0])]++;
                        break;
                    case 6:
                        kezi[tiletoint(partitiontmp[i].tile[0])]++;
                        break;
                    case 0:
                    case 5:
                        shunzi[(tiletoint(partitiontmp[i].tile[0]) + tiletoint(partitiontmp[i].tile[1]) + tiletoint(partitiontmp[i].tile[2])) / 3]++;
                        break;
                }
                if (tmp_type === 1 || tmp_type === 2 || tmp_type === 3 || tmp_type === 6 || tmp_type === 7)
                    typecnt[tiletoint(partitiontmp[i].tile[0])][tmp_type]++;
                if (tmp_type === 0 || tmp_type === 5)
                    typecnt[(tiletoint(partitiontmp[i].tile[0]) + tiletoint(partitiontmp[i].tile[1]) + tiletoint(partitiontmp[i].tile[2])) / 3][tmp_type]++;
            }
            for (let i = 1; i <= 27; i++) {
                gangzi_num += gangzi[i];
                kezi_num += kezi[i];
            }
            if (partitiontmp.length === 7)
                duizi_num = 7;
            // --------------------------
            let quandai = true;
            for (let i = 1; i <= 27; i++) {
                // 顺子和(刻子, 雀头)
                if (i !== 2 && i !== 8 && i !== 11 && i !== 17 && i !== 20 && i !== 26 && shunzi[i] >= 1)
                    quandai = false;
                if (i !== 1 && i !== 9 && i !== 10 && i !== 18 && i !== 19 && i !== 27 && i < 28 && kezi[i] + typecnt[i][7] >= 1)
                    quandai = false;
            }
            // --------------------------
            let qingyise = false;
            for (let k = 0; k <= 3; k++) {
                qingyise = true;
                for (let i = 1; i <= 34; i++) {
                    if (Math.floor((i - 1) / 9) !== k && i <= 27 && cnt2[i] > 0)
                        qingyise = false;
                }
                if (qingyise)
                    break;
            }
            // ---------------------------
            let jiangdui = true;
            for (let i = 1; i <= 34; i++) {
                if (i !== 2 && i !== 5 && i !== 8 && i !== 11 && i !== 14 && i !== 17 && i !== 20 && i !== 23 && i !== 26 && cnt2[i] > 0)
                    jiangdui = false;
            }
            // ---------------------------
            ans[1000] = 0;
            for (let i = 1; i <= 27; i++)
                ans[1000] += Math.floor(cnt2[i] / 4); // 根
            if (!type && zimo && getlstaction(2) !== undefined && (getlstaction(2).name === "RecordAnGangAddGang" || getlstaction(2).name === "RecordChiPengGang"))
                ans[1001] = 1; // 杠上花
            if (!type && !zimo && getlstaction().name !== "RecordAnGangAddGang" && getlstaction(3) !== undefined && (getlstaction(3).name === "RecordAnGangAddGang" || getlstaction(3).name === "RecordChiPengGang"))
                ans[1002] = 1; // 杠上炮
            ans[1003] = 1;
            if (!type && getlstaction().name === "RecordAnGangAddGang")
                ans[1004] = 1; // 抢杠
            if (kezi_num === 4)
                ans[1005] = 2; // 对对和
            if (qingyise)
                ans[1006] = 3; // 清一色
            if (duizi_num === 7)
                ans[1007] = 3; // 七对子
            if (quandai)
                ans[1008] = 3; // 带幺九
            if (fulucnt === 4)
                ans[1009] = 3; // 金钩钓
            if (qingyise && kezi_num === 4)
                ans[1010] = 4; // 清对
            if (jiangdui && kezi_num === 4)
                ans[1011] = 4; // 将对
            if (ans[1000] > 0 && duizi_num === 7) {
                ans[1012] = 4;
                ans[1000]--;
            } // 龙七对
            if (qingyise && duizi_num === 7)
                ans[1013] = 5; // 清七对
            if (qingyise && fulucnt === 4)
                ans[1014] = 5; // 清金钩钓
            if (qingyise && ans[1012] === 4)
                ans[1015] = 6; // 清龙七对
            if (gangzi_num === 4) {
                ans[1016] = 6;
                ans[1000] -= 4;
            } // 十八罗汉
            if (qingyise && gangzi_num === 4)
                ans[1017] = 6; // 清十八罗汉
            if (liqiinfo[seat].yifa !== 0 && liqiinfo[seat].liqi === 0 && seat === ju && zimo)
                ans[1018] = 6; // 天和
            if (liqiinfo[seat].yifa !== 0 && liqiinfo[seat].liqi === 0 && seat !== ju && zimo)
                ans[1019] = 6; // 地和
            if (qingyise && quandai)
                ans[1020] = 5; // 清幺九
            if (!type && paishan_len() === 0)
                ans[1021] = 1; // 海底捞月
            return tofan(ans);
        }

        for (let i = partitiontmp.length - 1; i >= 0; i--) {
            let tile = partitiontmp[i].tile, tmp_type = partitiontmp[i].type;
            if (tmp_type === 5 && (equaltile(tile[0], lastile) || equaltile(tile[1], lastile) || equaltile(tile[2], lastile))) {
                if (!zimo)
                    partitiontmp[i].type = 0;
                let midtile = inttotile((tiletoint(tile[0]) + tiletoint(tile[1]) + tiletoint(tile[2])) / 3);
                if (equaltile(midtile, lastile))
                    updateret(calc0());
                else if (tiletoint(lastile) % 9 === 3 && tiletoint(midtile) % 9 === 2)
                    updateret(calc0());
                else if (tiletoint(lastile) % 9 === 7 && tiletoint(midtile) % 9 === 8)
                    updateret(calc0());
                else
                    updateret(calc0());
                partitiontmp[i].type = 5;
            }
            if (tmp_type === 6 && equaltile(tile[0], lastile)) {
                if (!zimo)
                    partitiontmp[i].type = 1;
                updateret(calc0());
                partitiontmp[i].type = 6;
            }
            if (tmp_type === 7 && equaltile(tile[0], lastile))
                updateret(calc0());
        }
    }

    // 一般形: 4个面子 + 1个雀头
    function dfs(now) {
        if (now === 28) {
            if (partition.length === 5) // 本来有 或者 partition.length === 7, 这里单独把七对子的情况放到下面了, 这里就不用了
                calc();
            return;
        }
        if (cnt[now] === 0) {
            dfs(now + 1);
            return;
        }
        let whatever = [0, 2, 3, 5, 6, 8, 9, 11, 12, 14];
        for (let k = 0; k < whatever.length; k++) {
            if (cnt[now] < whatever[k])
                continue;
            cnt[now] -= whatever[k];
            let cnt0 = cnt[now];
            if (whatever[k] % 3 === 2) { // 有对子
                let kezi_num = (whatever[k] - 2) / 3;
                for (let j = 0; j < kezi_num; j++)
                    partition.push({'type': 6, 'tile': [inttotile(now), inttotile(now), inttotile(now)]});
                partition.push({'type': 7, 'tile': [inttotile(now), inttotile(now)]});
                dfs(now);
            } else if (whatever[k] % 3 === 0)
                for (let j = 0; j < whatever[k] / 3; j++)
                    partition.push({'type': 6, 'tile': [inttotile(now), inttotile(now), inttotile(now)]});

            if (cnt[nxt2[now]] >= cnt0 && cnt[nxt2[nxt2[now]]] >= cnt0) {
                cnt[now] -= cnt0;
                cnt[nxt2[now]] -= cnt0;
                cnt[nxt2[nxt2[now]]] -= cnt0;
                for (let i = 1; i <= cnt0; i++)
                    partition.push({
                        'type': 5,
                        'tile': [inttotile(now), inttotile(nxt2[now]), inttotile(nxt2[nxt2[now]])]
                    });
                dfs(now + 1);
                cnt[now] += cnt0;
                cnt[nxt2[now]] += cnt0;
                cnt[nxt2[nxt2[now]]] += cnt0;
                for (let i = 1; i <= cnt0; i++)
                    partition.length--;
            }
            for (let i = 0; i < Math.floor((whatever[k] + 1) / 3); i++)
                partition.length--;
            cnt[now] += whatever[k];
        }
    }

    dfs(1);
    partition = [];

    if (calchupai(tiles) === 2) { // 七对子只有一种分解方式
        for (let i = 1; i <= 27; i++)
            while (cnt[i] > 0) {
                partition.push({'type': 7, 'tile': [inttotile(i), inttotile(i)]});
                cnt[i] -= 2;
            }
        calc();
    }

    return ret;
}

function calcfan(tiles, seat, zimo, fangchong) {
    let lastile = tiles[tiles.length - 1], fulucnt = 0;
    let ret = {'yiman': false, 'fans': [], 'fu': 0};
    let cnt = [];
    for (let i = 0; i < nxt2.length; i++)
        cnt[i] = 0;
    for (let i = 0; i < tiles.length; i++)
        cnt[tiletoint(tiles[i])]++;

    let partition = [];
    for (let i = 0; i < fulu[seat].length; i++) {
        if (fulu[seat][i].type !== 4)
            partition.push(fulu[seat][i]);
        if (fulu[seat][i].type !== 4 && fulu[seat][i].type !== 3)
            fulucnt++;
    }

    // 幻境传说: 庄家卡1: 庄家门清状态下荣和只能是立直状态, 否则诈和
    if (get_field_spell_mode1() === 1 && seat === ju && fulucnt === 0 && !zimo && liqiinfo[seat].liqi !== 0)
        return ret;

    function updateret(x) {
        if (x !== undefined && calcsudian(x, 1) > calcsudian(ret, 1))
            ret = x;
    }

    function calc() {
        let cnt2 = [];
        for (let i = 0; i < nxt2.length; i++)
            cnt2[i] = 0;
        let partitiontmp = partition.slice();
        for (let i = partitiontmp.length - 1; i >= 0; i--) {
            let tiles = partitiontmp[i].tile;
            if (partitiontmp[i].type === 0 || partitiontmp[i].type === 5)
                for (let j = 0; j <= 2; j++)
                    cnt2[tiletoint(tiles[j])]++;
            else if (partitiontmp[i].type === 1 || partitiontmp[i].type === 6)
                cnt2[tiletoint(tiles[0])] += 3;
            else if (partitiontmp[i].type === 2 || partitiontmp[i].type === 3)
                cnt2[tiletoint(tiles[0])] += 4;
            else if (partitiontmp[i].type === 7)
                cnt2[tiletoint(tiles[0])] += 2;
        }

        function calc0(tingpaifu) {
            function deletefan(ans, x) {
                let flag = false;
                for (let i = 0; i < ans.fans.length; i++) {
                    if (flag)
                        ans.fans[i - 1] = ans.fans[i];
                    if (ans.fans[i].id === x)
                        flag = true;
                }
                if (flag)
                    ans.fans.length = ans.fans.length - 1;
                return ans;
            }

            let tianhu = false;
            baopai[seat] = []; // 重置和牌玩家包牌信息
            let menqing = fulucnt === 0;
            // 无青天井情况下默认为 true, 之后再否定
            let ans = {'yiman': !is_qingtianjing(), 'fans': [], 'fu': 0};
            // ----------------------------------------------
            // typecnt[i] 的 0-7 下标分别对应对应划分种类的数量
            // 0: 明顺    1: 明刻   2: 明杠   3: 暗杠
            // 4: 北宝    5: 暗顺   6: 暗刻   7: 对子
            let typecnt = [[]];
            // 刻子, 杠子, 暗刻, 顺子
            let kezi = [], gangzi = [], anke = [], shunzi = [];
            let kezi_num = 0, gangzi_num = 0, anke_num = 0, duizi_num = 0;

            for (let i = 0; i <= 34; i++) {
                typecnt[i] = [0, 0, 0, 0, 0, 0, 0, 0];
                anke[i] = gangzi[i] = kezi[i] = shunzi[i] = 0;
            }
            for (let i = 0; i < partitiontmp.length; i++) {
                let type = partitiontmp[i].type;
                switch (type) {
                    case 1:
                        kezi[tiletoint(partitiontmp[i].tile[0])]++;
                        break;
                    case 2:
                        kezi[tiletoint(partitiontmp[i].tile[0])]++;
                        gangzi[tiletoint(partitiontmp[i].tile[0])]++;
                        break;
                    case 3:
                        kezi[tiletoint(partitiontmp[i].tile[0])]++;
                        gangzi[tiletoint(partitiontmp[i].tile[0])]++;
                        anke[tiletoint(partitiontmp[i].tile[0])]++;
                        break;
                    case 6:
                        kezi[tiletoint(partitiontmp[i].tile[0])]++;
                        anke[tiletoint(partitiontmp[i].tile[0])]++;
                        break;
                    case 0:
                    case 5:
                        shunzi[(tiletoint(partitiontmp[i].tile[0]) + tiletoint(partitiontmp[i].tile[1]) + tiletoint(partitiontmp[i].tile[2])) / 3]++;
                        break;
                }
                if (type === 1 || type === 2 || type === 3 || type === 6 || type === 7)
                    typecnt[tiletoint(partitiontmp[i].tile[0])][type]++;
                if (type === 0 || type === 5)
                    typecnt[(tiletoint(partitiontmp[i].tile[0]) + tiletoint(partitiontmp[i].tile[1]) + tiletoint(partitiontmp[i].tile[2])) / 3][type]++;
            }
            let beikou = 0, santongshun = false, sanlianke = false;
            for (let i = 1; i <= 34; i++) {
                anke_num += anke[i];
                gangzi_num += gangzi[i];
                kezi_num += kezi[i];
                duizi_num += typecnt[i][7];

                if (i >= 2 && i <= 8 || i >= 11 && i <= 17 || i >= 20 && i <= 26) {
                    if (kezi[i - 1] >= 1 && kezi[i] >= 1 && kezi[i + 1] >= 1)
                        sanlianke = true;
                }
                // 这里的杯口数量算上副露的, 最后在判断是否有效
                beikou += Math.floor(shunzi[i] / 2);

                if (Math.floor(shunzi[i] / 3) >= 1)
                    santongshun = true;
            }
            // ---------------------------
            let flag_ziyise = true, flag_lvyise = true, flag_qinglaotou = true, flag_duanyao = true,
                flag_hunlaotou = true;
            for (let i = 1; i <= 34; i++) {
                if (i <= 27 && cnt2[i] > 0)
                    flag_ziyise = false; // 字一色
                if (i !== 20 && i !== 21 && i !== 22 && i !== 24 && i !== 26 && i !== 33 && cnt2[i] > 0)
                    flag_lvyise = false; // 绿一色
                if (i !== 1 && i !== 9 && i !== 10 && i !== 18 && i !== 19 && i !== 27 && cnt2[i] > 0)
                    flag_qinglaotou = false; // 清老头
                if ((i === 1 || i === 9 || i === 10 || i === 18 || i === 19 || i === 27 || i >= 28 && i <= 34) && cnt2[i] > 0)
                    flag_duanyao = false; // 断幺九
                if ((i >= 2 && i <= 8 || i >= 11 && i <= 17 || i >= 20 && i <= 26) && cnt2[i] > 0)
                    flag_hunlaotou = false; // 混老头
            }
            // ---------------------------------
            let wumenqi = true;
            if (cnt2[1] + cnt2[2] + cnt2[3] + cnt2[4] + cnt2[5] + cnt2[6] + cnt2[7] + cnt2[8] + cnt2[9] === 0)
                wumenqi = false;
            if (cnt2[10] + cnt2[11] + cnt2[12] + cnt2[13] + cnt2[14] + cnt2[15] + cnt2[16] + cnt2[17] + cnt2[18] === 0)
                wumenqi = false;
            if (cnt2[19] + cnt2[20] + cnt2[21] + cnt2[22] + cnt2[23] + cnt2[24] + cnt2[25] + cnt2[26] + cnt2[27] === 0)
                wumenqi = false;
            if (cnt2[28] + cnt2[29] + cnt2[30] + cnt2[31] === 0)
                wumenqi = false;
            if (cnt2[32] + cnt2[33] + cnt2[34] === 0)
                wumenqi = false;
            // ---------------------------------
            // jiulian[0] 用于判断是否为九莲, jiulian[1] 表示多出来的一张牌
            let jiulian = [false, ""], yiqi = false, hunyise = false, qingyise = false;
            let jlbd = [0, 3, 1, 1, 1, 1, 1, 1, 1, 3];
            for (let k = 0; k <= 2; k++) {
                if (shunzi[k * 9 + 2] >= 1 && shunzi[k * 9 + 5] >= 1 && shunzi[k * 9 + 8] >= 1)
                    yiqi = true;

                jiulian = [true, ""];
                for (let i = 1; i <= 9; i++)
                    if (cnt2[k * 9 + i] < jlbd[i]) // 手牌中各种牌数量不满足
                        jiulian = [false, ""];
                if (jiulian[0]) {
                    for (let i = 1; i <= 9; i++)
                        if (cnt2[k * 9 + i] > jlbd[i]) {
                            jiulian[1] = inttotile(k * 9 + i);
                            break;
                        }
                    break;
                }
            }
            for (let i = 0; i <= 34; i++)
                if (gangzi[i] >= 1) // 九莲不允许有杠子
                    jiulian = [false, ""];

            for (let k = 0; k <= 3; k++) {
                hunyise = true;
                qingyise = true;
                for (let i = 1; i <= 34; i++) {
                    if (Math.floor((i - 1) / 9) !== k && cnt2[i] > 0)
                        qingyise = false;
                    if (Math.floor((i - 1) / 9) !== k && i <= 27 && cnt2[i] > 0)
                        hunyise = false;
                }
                if (hunyise)
                    break;
            }
            // ----------------------------------
            let sanse = false, sansetongke = false;
            for (let i = 1; i <= 9; i++) {
                if (i >= 2 && i <= 8)
                    if (shunzi[i] >= 1 && shunzi[i + 9] >= 1 && shunzi[i + 18] >= 1)
                        sanse = true;

                if (kezi[i] >= 1 && kezi[i + 9] >= 1 && kezi[i + 18] >= 1)
                    sansetongke = true;
            }
            // ----------------------------------
            let chunquandai = true, hunquandai = true;
            for (let i = 1; i <= 34; i++) {
                // 从顺子和(刻子, 雀头)的角度判断是否有全带, 先顺子后(刻子, 雀头)
                if (i !== 2 && i !== 8 && i !== 11 && i !== 17 && i !== 20 && i !== 26 && shunzi[i] >= 1) {
                    chunquandai = false;
                    hunquandai = false;
                }
                if (i !== 1 && i !== 9 && i !== 10 && i !== 18 && i !== 19 && i !== 27 && i < 28 && kezi[i] + typecnt[i][7] >= 1) {
                    chunquandai = false;
                    hunquandai = false;
                }
                if (i >= 28 && i <= 34 && kezi[i] + typecnt[i][7] >= 1)
                    chunquandai = false;
            }
            // ------------------------------------
            let pinghu = true;
            if (duizi_num === 7)
                pinghu = false;
            for (let i = 1; i <= 34; i++) {
                // 有刻子
                if (kezi[i] >= 1)
                    pinghu = false;

                if (typecnt[i][7] === 1) {
                    // 雀头是自风, 场风, 三元
                    if (tiletoint(((seat - ju + playercnt) % playercnt + 1).toString() + "z") === i)
                        pinghu = false;
                    if (tiletoint((chang + 1).toString() + "z") === i)
                        pinghu = false;
                    if (i === 32 || i === 33 || i === 34)
                        pinghu = false;
                }
            }
            // 顺子两面听判断
            let flag_liangmian = false;
            if ((tiletoint(lastile) - 1) % 9 >= 3) // 数牌4-9
                if (shunzi[tiletoint(lastile) - 1] >= 1) // 顺子的中心比 lastile 小 1
                    flag_liangmian = true;
            if ((tiletoint(lastile) - 1) % 9 <= 5) // 数牌1-6
                if (shunzi[tiletoint(lastile) + 1] >= 1) // 顺子的中心比 lastile 大 1
                    flag_liangmian = true;
            if (!flag_liangmian)
                pinghu = false;
            // -------------------------------------
            let xiaosanyuan = false, xiaosixi = false, dasixi = false;

            if (kezi[32] >= 1 && kezi[33] >= 1 && typecnt[34][7] === 1)
                xiaosanyuan = true;
            if (kezi[32] >= 1 && typecnt[33][7] === 1 && kezi[34] >= 1)
                xiaosanyuan = true;
            if (typecnt[32][7] === 1 && kezi[33] >= 1 && kezi[34] >= 1)
                xiaosanyuan = true;

            if (kezi[28] >= 1 && kezi[29] >= 1 && kezi[30] >= 1 && typecnt[31][7] === 1)
                xiaosixi = true;
            if (kezi[28] >= 1 && kezi[29] >= 1 && typecnt[30][7] === 1 && kezi[31] >= 1)
                xiaosixi = true;
            if (kezi[28] >= 1 && typecnt[29][7] === 1 && kezi[30] >= 1 && kezi[31] >= 1)
                xiaosixi = true;
            if (typecnt[28][7] === 1 && kezi[29] >= 1 && kezi[30] >= 1 && kezi[31] >= 1)
                xiaosixi = true;

            if (kezi[28] >= 1 && kezi[29] >= 1 && kezi[30] >= 1 && kezi[31] >= 1)
                dasixi = true;

            // -------------------------------------
            // 四种dora: 表dora, 红dora, 拔北dora, 里dora
            let alldoras = [0, 0, 0, 0];
            for (let i = 0; i < fulu[seat].length; i++) {
                if (fulu[seat][i].type === 4) {
                    cnt2[tiletoint(fulu[seat][i].tile[0])]++;
                    alldoras[2]++;
                }
            }
            for (let i = 0; i < doracnt.cnt; i++) {
                if ((playercnt === 3 || playercnt === 2) && tiletoint(doras[i]) === 1)
                    alldoras[0] += cnt2[9];
                else if (playercnt === 2 && tiletoint(doras[i]) === 10)
                    alldoras[0] += cnt2[18];
                else {
                    // 幻境传说: 机会卡3
                    if (get_field_spell_mode2() === 3)
                        alldoras[0] += cnt2[dora_spell[tiletoint(doras[i])]];
                    alldoras[0] += cnt2[doranxt[tiletoint(doras[i])]];
                }

            }
            for (let i = 0; i < doracnt.licnt; i++) {
                if ((playercnt === 3 || playercnt === 2) && tiletoint(li_doras[i]) === 1)
                    alldoras[3] += cnt2[9];
                else if (playercnt === 2 && tiletoint(li_doras[i]) === 10)
                    alldoras[3] += cnt2[18];
                else {
                    // 幻境传说: 机会卡3
                    if (get_field_spell_mode2() === 3)
                        alldoras[3] += cnt2[dora_spell[tiletoint(li_doras[i])]];
                    alldoras[3] += cnt2[doranxt[tiletoint(li_doras[i])]];
                }
            }
            for (let i = 0; i < tiles.length; i++)
                if (tiles[i][0] === '0')
                    alldoras[1]++;
            for (let i = 0; i < fulu[seat].length; i++)
                for (let j = 0; j < fulu[seat][i].tile.length; j++)
                    if (fulu[seat][i].tile[j][0] === '0')
                        alldoras[1]++;
            let lstaction = getlstaction();
            for (let i = 0; i < fulu[seat].length; i++) {
                if (fulu[seat][i].type === 4)
                    cnt2[tiletoint(fulu[seat][i].tile[0])]--;
            }
            // ------------------------------------
            // ------------------------------------
            // ------------------------------------
            // 自己添加的役种
            if (typecnt[32][2] === 1 && typecnt[32][7] === 1 && typecnt[32][3] === 3) {
                if (!is_qingtianjing()) {
                    ans.fans.push({'val': 6, 'id': 9001}); // 天地创造, 实际显示"天地大白"
                    return ans;
                } else
                    ans.fans.push({'val': 0, 'id': 9001}); // 设为0是防止重复计数
            }
            if (typecnt[33][3] === 4 && typecnt[33][7] === 1) {
                if (!is_qingtianjing()) {
                    ans.fans.push({'val': 6, 'id': 9002}); // 万物生长, 实际显示"龙发杠载"
                    return ans;
                } else
                    ans.fans.push({'val': 0, 'id': 9002}); // 设为0是防止重复计数
            }
            // ------------------------------------
            // ------------------------------------
            // ------------------------------------
            if (liqiinfo[seat].yifa !== 0 && liqiinfo[seat].liqi === 0 && seat === ju && zimo) {
                tianhu = true;
                if (!is_qingtianjing())
                    ans.fans.push({'val': 1, 'id': 35}); // 天和
                else
                    ans.fans.push({'val': 13, 'id': 35}); // 天和
            }
            if (liqiinfo[seat].yifa !== 0 && liqiinfo[seat].liqi === 0 && seat !== ju && zimo) {
                if (!is_qingtianjing())
                    ans.fans.push({'val': 1, 'id': 36}); // 地和
                else
                    ans.fans.push({'val': 13, 'id': 36}); // 地和
            }
            if (liqiinfo[seat].yifa !== 0 && liqiinfo[seat].liqi === 0 && seat !== ju && !zimo && (is_guyi() || is_yifanjieguyi())) {
                if (!is_qingtianjing())
                    ans.fans.push({'val': 1, 'id': 59}); // 人和
                else
                    ans.fans.push({'val': 13, 'id': 59}); // 人和
            }

            if (kezi[32] >= 1 && kezi[33] >= 1 && kezi[34] >= 1) {
                if (!is_qingtianjing()) {
                    ans.fans.push({'val': 1, 'id': 37}); // 大三元
                    if (!is_xuezhandaodi() && !is_wanxiangxiuluo() && !no_normalbaopai()) {
                        let fulusanyuancnt = 0;
                        for (let i = 0; i < fulu[seat].length; i++) {
                            let type = fulu[seat][i].type, tile = tiletoint(fulu[seat][i].tile[0]);
                            if ((type === 1 || type === 2 || type === 3) && (tile === 32 || tile === 33 || tile === 34)) {
                                fulusanyuancnt++;
                                if (fulusanyuancnt === 3 && fulu[seat][i].from !== undefined)
                                    baopai[seat].push({'seat': fulu[seat][i].from, 'val': 1});
                            }
                        }
                    }
                } else
                    ans.fans.push({'val': 13, 'id': 37}); // 大三元
            }

            if (menqing && anke_num === 4 && (typecnt[tiletoint(lastile)][7] === 1 || tianhu)) {
                if (!is_qingtianjing())
                    ans.fans.push({'val': no_wyakuman() ? 1 : 2, 'id': 48}); // 四暗刻单骑
                else
                    ans.fans.push({'val': no_wyakuman() ? 13 : 26, 'id': 48}); // 四暗刻单骑
            } else if (menqing && anke_num === 4 && anke[tiletoint(lastile)] - gangzi[tiletoint(lastile)] >= 1 && !tianhu) {
                if (!is_qingtianjing())
                    ans.fans.push({'val': 1, 'id': 38}); // 四暗刻
                else
                    ans.fans.push({'val': 13, 'id': 38}); // 四暗刻
            }
            if (flag_ziyise) {
                if (!is_qingtianjing())
                    ans.fans.push({'val': 1, 'id': 39}); // 字一色
                else
                    ans.fans.push({'val': 13, 'id': 39}); // 字一色
            }
            if (flag_lvyise) {
                if (!is_qingtianjing())
                    ans.fans.push({'val': 1, 'id': 40}); // 绿一色
                else
                    ans.fans.push({'val': 13, 'id': 40}); // 绿一色
            }
            if (flag_qinglaotou) {
                if (!is_qingtianjing())
                    ans.fans.push({'val': 1, 'id': 41}); // 清老头
                else
                    ans.fans.push({'val': 13, 'id': 41}); // 清老头
            }

            if (xiaosixi && !dasixi) {
                if (!is_qingtianjing())
                    ans.fans.push({'val': 1, 'id': 43}); // 小四喜
                else
                    ans.fans.push({'val': 13, 'id': 43}); // 小四喜
            }

            if (gangzi_num === 4) {
                if (!is_qingtianjing()) {
                    ans.fans.push({'val': 1, 'id': 44}); // 四杠子
                    if (!is_xuezhandaodi() && !is_wanxiangxiuluo() && sigangbaopai() && sigangbao[seat]) {
                        let fulugangzi = 0;
                        for (let i = 0; i < fulu[seat].length; i++) {
                            let type = fulu[seat][i].type;
                            if (type === 2 || type === 3) {
                                fulugangzi++;
                                if (fulugangzi === 4 && fulu[seat][i].from !== undefined)
                                    baopai[seat].push({'seat': fulu[seat][i].from, 'val': 1});
                            }
                        }
                    }
                } else
                    ans.fans.push({'val': 13, 'id': 44}); // 四杠子
            }

            if (menqing && jiulian[0] && (equaltile(lastile, jiulian[1]) || tianhu)) {
                if (!is_qingtianjing())
                    ans.fans.push({'val': no_wyakuman() ? 1 : 2, 'id': 47}); // 纯正九莲宝灯
                else
                    ans.fans.push({'val': no_wyakuman() ? 13 : 26, 'id': 47}); // 纯正九莲宝灯
            }

            if (menqing && jiulian[0] && !equaltile(lastile, jiulian[1]) && !tianhu) {
                if (!is_qingtianjing())
                    ans.fans.push({'val': 1, 'id': 45}); // 九莲宝灯
                else
                    ans.fans.push({'val': 13, 'id': 45}); // 九莲宝灯
            }

            if (dasixi) {
                if (!is_qingtianjing()) {
                    ans.fans.push({'val': no_wyakuman() ? 1 : 2, 'id': 50}); // 大四喜
                    if (!is_xuezhandaodi() && !is_wanxiangxiuluo() && !no_normalbaopai()) {
                        let fulusixicnt = 0;
                        for (let i = 0; i < fulu[seat].length; i++) {
                            let type = fulu[seat][i].type, tile = tiletoint(fulu[seat][i].tile[0]);
                            if ((type === 1 || type === 2 || type === 3) && (tile === 28 || tile === 29 || tile === 30 || tile === 31)) {
                                fulusixicnt++;
                                if (fulusixicnt === 4 && fulu[seat][i].from !== undefined)
                                    baopai[seat].push({'seat': fulu[seat][i].from, 'val': no_wyakuman() ? 1 : 2});
                            }
                        }
                    }
                } else
                    ans.fans.push({'val': no_wyakuman() ? 13 : 26, 'id': 50}); // 大四喜
            }
            if (is_guyi() || is_yifanjieguyi()) {
                if (qingyise && duizi_num === 7 && flag_duanyao) {
                    if (!is_qingtianjing()) {
                        if (cnt2[2] > 0) ans.fans.push({'val': 1, 'id': 62}); // 大数邻
                        if (cnt2[11] > 0) ans.fans.push({'val': 1, 'id': 60}); // 大车轮
                        if (cnt2[20] > 0) ans.fans.push({'val': 1, 'id': 61}); // 大竹林
                    } else {
                        if (cnt2[2] > 0) ans.fans.push({'val': 13, 'id': 62}); // 大数邻
                        if (cnt2[11] > 0) ans.fans.push({'val': 13, 'id': 60}); // 大车轮
                        if (cnt2[20] > 0) ans.fans.push({'val': 13, 'id': 61}); // 大竹林
                    }
                }
                if (liqiinfo[seat].liqi === 2) {
                    let is_shishangsannian = false;
                    if (playercnt === 4) {
                        if (zimo && paishan_len() === 14 && lstdrawtype === 1 || !zimo && paishan_len() === 14)
                            is_shishangsannian = true;
                    } else if (playercnt === 3) {
                        if (zimo && paishan_len() === 18 && lstdrawtype === 1 || !zimo && paishan_len() === 18)
                            is_shishangsannian = true;
                    } else if (playercnt === 2) {
                        if (zimo && paishan_len() === 22 && lstdrawtype === 1 || !zimo && paishan_len() === 22)
                            is_shishangsannian = true;
                    }
                    if (is_shishangsannian) {
                        if (!is_qingtianjing())
                            ans.fans.push({'val': 1, 'id': 63}); // 石上三年
                        else
                            ans.fans.push({'val': 13, 'id': 63}); // 石上三年
                    }
                }
                if (flag_ziyise && duizi_num === 7 && !no_wyakuman()) {
                    ans = deletefan(ans, 39); // 删除字一色
                    if (!is_qingtianjing())
                        ans.fans.push({'val': 2, 'id': 64}); // 大七星
                    else
                        ans.fans.push({'val': 26, 'id': 64}); // 大七星
                }
            }
            // 四连刻, 一色四同顺, 红孔雀, 红一点, 黑一色,
            // 十三不搭, 八连庄, 百万石, 金门桥, 东北新干线, 无发绿一色
            if (is_yifanjieguyi()) {
                let sitongshun = false, silianke = false;
                for (let i = 0; i <= 2; i++)
                    for (let j = 1; j <= 9; j++) {
                        if (j !== 1 && j !== 9 && shunzi[i * 9 + j] >= 4)
                            sitongshun = true;
                        if (j <= 6 && kezi[i * 9 + j] >= 1 && kezi[i * 9 + j + 1] >= 1 && kezi[i * 9 + j + 2] >= 1 && kezi[i * 9 + j + 3] >= 1)
                            silianke = true;
                    }
                if (silianke)
                    ans.fans.push({'val': 1, 'id': 9703}); // 四连刻
                if (sitongshun)
                    ans.fans.push({'val': 1, 'id': 9704}); // 一色四同顺

                let hongkongque = true, hongyidian = true, heiyise = true;
                if (cnt2[34] === 0)
                    hongkongque = hongyidian = false;
                for (let i = 1; i <= nxt2.length; i++) {
                    if (i !== 19 && i !== 23 && i !== 25 && i !== 27 && i !== 34 && i !== 37 && cnt2[i] >= 1)
                        hongkongque = false;
                    if (i !== 20 && i !== 21 && i !== 22 && i !== 24 && i !== 26 && i !== 34 && cnt2[i] >= 1)
                        hongyidian = false;
                    if (i !== 11 && i !== 13 && i !== 17 && i !== 28 && i !== 29 && i !== 30 && i !== 31 && cnt2[i] >= 1)
                        heiyise = false;
                }
                if (hongkongque)
                    ans.fans.push({'val': 1, 'id': 9705}); // 红孔雀
                if (hongyidian)
                    ans.fans.push({'val': 1, 'id': 9706}); // 红一点
                if (heiyise)
                    ans.fans.push({'val': 1, 'id': 9707}); // 黑一色

                if (seat === ju && lianzhuangcnt >= 7) // 第8次和牌
                    ans.fans.push({'val': 1, 'id': 46}); // 八连庄

                let wan_qingyise = true;
                for (let i = 10; i < nxt2.length; i++)
                    if (cnt2[i] >= 1)
                        wan_qingyise = false;
                if (wan_qingyise) {
                    let sum = 0;
                    for (let i = 1; i <= 9; i++)
                        sum += cnt2[i] * i;
                    if (sum >= 100)
                        ans.fans.push({'val': 1, 'id': 9709}); // 百万石
                }

                let jinmenqiao = false;
                for (let i = 0; i <= 2; i++)
                    if (shunzi[i * 9 + 2] >= 1 && shunzi[i * 9 + 4] >= 1 && shunzi[i * 9 + 6] >= 1 && shunzi[i * 9 + 8] >= 1)
                        jinmenqiao = true;
                if (menqing && jinmenqiao)
                    ans.fans.push({'val': 1, 'id': 9710}); // 金门桥

                let xinganxian_part1 = false, xinganxian_part2 = false;
                for (let j = 0; j <= 2; j++)
                    if (cnt2[j * 9 + 1] === 1 && cnt2[j * 9 + 2] === 1 && cnt2[j * 9 + 3] === 1 && cnt2[j * 9 + 4] === 1)
                        if (cnt2[j * 9 + 5] === 1 && cnt2[j * 9 + 6] === 1 && cnt2[j * 9 + 7] === 1)
                            if (cnt2[j * 9 + 8] === 1 && cnt2[j * 9 + 9] === 1)
                                xinganxian_part1 = true;
                if (kezi[28] === 1 && typecnt[31][7] === 1 || kezi[31] === 1 && typecnt[28][7] === 1)
                    xinganxian_part2 = true;
                if (menqing && xinganxian_part1 && xinganxian_part2)
                    ans.fans.push({'val': 1, 'id': 9711}); // 东北新干线

                if (flag_lvyise && cnt2[33] === 0) {
                    deletefan(ans, 40);
                    ans.fans.push({'val': 2, 'id': 9712}); // 无发绿一色
                }
            }

            if (liqiinfo[seat].kai && !zimo && liqiinfo[fangchong].liqi === 0) { // 开立直
                if (liqiinfo[seat].liqi === 2)
                    ans.fans.push({'val': 1, 'id': 9004});
                if (liqiinfo[seat].liqi === 1)
                    ans.fans.push({'val': 1, 'id': 9003});
            }
            if (ans.fans.length !== 0 && !is_qingtianjing())
                return ans;
            // ------------------------------------
            ans.yiman = false;

            if (liqiinfo[seat].yifa !== 0 && liqiinfo[seat].liqi === 0 && seat !== ju && !zimo && (is_guyi() || is_yifanjieguyi())) {
                if (is_renhumanguan())
                    ans.fans.push({'val': 5, 'id': 65}); // 人和2
            }

            if (is_hunzhiyiji()) {
                if (hunzhiyiji_info[seat].liqi === 1)
                    ans.fans.push({'val': 2, 'id': 804}); // 立直
                if (hunzhiyiji_info[seat].liqi === 2)
                    ans.fans.push({'val': 3, 'id': 805}); // 双立直
                if (hunzhiyiji_info[seat].liqi !== 0 && !hunzhiyiji_info[seat].overload)
                    ans.fans.push({'val': 1, 'id': 30}); // 一发
            } else {
                if (liqiinfo[seat].kai) { // 开立直非役满情况
                    if (liqiinfo[seat].liqi === 1)
                        ans.fans.push({'val': 2, 'id': 9005}); // 开立直
                    if (liqiinfo[seat].liqi === 2)
                        ans.fans.push({'val': 3, 'id': 9006}); // 开两立直
                } else {
                    // 幻境传说: 机会卡5
                    if (get_field_spell_mode2() === 5) {
                        if (liqiinfo[seat].liqi === 1)
                            ans.fans.push({'val': 2, 'id': 2}); // 立直
                        if (liqiinfo[seat].liqi === 2)
                            ans.fans.push({'val': 4, 'id': 18}); // 两立直
                    } else if (is_beishuizhizhan()) {
                        if (liqiinfo[seat].liqi === 1 && liqiinfo[seat].beishui_type === 1)
                            ans.fans.push({'val': 3, 'id': 806}); // 真-立直
                        else if (liqiinfo[seat].liqi === 2 && liqiinfo[seat].beishui_type === 1)
                            ans.fans.push({'val': 4, 'id': 807}); // 真-两立直
                        else if (liqiinfo[seat].liqi === 1 && liqiinfo[seat].beishui_type === 2)
                            ans.fans.push({'val': 5, 'id': 808}); // 极-立直
                        else if (liqiinfo[seat].liqi === 2 && liqiinfo[seat].beishui_type === 2)
                            ans.fans.push({'val': 6, 'id': 809}); // 极-两立直
                        else if (liqiinfo[seat].liqi === 1)
                            ans.fans.push({'val': 1, 'id': 2}); // 立直
                        else if (liqiinfo[seat].liqi === 2)
                            ans.fans.push({'val': 2, 'id': 18}); // 两立直
                    } else {
                        if (liqiinfo[seat].liqi === 1)
                            ans.fans.push({'val': 1, 'id': 2}); // 立直
                        if (liqiinfo[seat].liqi === 2)
                            ans.fans.push({'val': 2, 'id': 18}); // 两立直
                    }
                }
                // 幻境传说: 机会卡5
                if (get_field_spell_mode2() === 5) {
                    if (liqiinfo[seat].liqi !== 0 && liqiinfo[seat].yifa !== 0)
                        ans.fans.push({'val': 2, 'id': 30}); // 一发
                } else {
                    if (liqiinfo[seat].liqi !== 0 && liqiinfo[seat].yifa !== 0 && !no_yifa())
                        ans.fans.push({'val': 1, 'id': 30}); // 一发
                }
            }
            if (is_guyi() || is_yifanjieguyi()) {
                if (lstaction.name === "RecordDiscardTile" && lstaction.data.is_liqi)
                    ans.fans.push({'val': 1, 'id': 51}); // 燕返
                if (!zimo && lstdrawtype === 0 && lstaction.name === "RecordDiscardTile")
                    ans.fans.push({'val': 1, 'id': 52}); // 杠振
                if (fulucnt === 4)
                    ans.fans.push({'val': 1, 'id': 53}); // 十二落抬
            }
            if (menqing && zimo)
                ans.fans.push({'val': 1, 'id': 1}); // 门前清自摸和

            if (lstaction.name === "RecordAnGangAddGang")
                ans.fans.push({'val': 1, 'id': 3}); // 枪杠
            if (zimo && lstdrawtype === 0)
                ans.fans.push({'val': 1, 'id': 4}); // 岭上开花
            if (zimo && paishan_len() === 14 && lstdrawtype === 1)
                ans.fans.push({'val': 1, 'id': 5}); // 海底摸月
            if (!zimo && paishan_len() === 14)
                ans.fans.push({'val': 1, 'id': 6}); // 河底捞鱼

            if (kezi[32] >= 1)
                ans.fans.push({'val': kezi[32], 'id': 7}); // 白
            if (kezi[33] >= 1)
                ans.fans.push({'val': kezi[33], 'id': 8}); // 发
            if (kezi[34] >= 1)
                ans.fans.push({'val': kezi[34], 'id': 9}); // 中
            if (kezi[tiletoint(((seat - ju + playercnt) % playercnt + 1).toString() + "z")] >= 1)
                ans.fans.push({
                    'val': kezi[tiletoint(((seat - ju + playercnt) % playercnt + 1).toString() + "z")],
                    'id': 10
                }); // 自风
            if (kezi[tiletoint((chang + 1).toString() + "z")] >= 1)
                ans.fans.push({'val': kezi[tiletoint((chang + 1).toString() + "z")], 'id': 11}); // 场风

            if (flag_duanyao && (!no_shiduan() || no_shiduan() && menqing)) {
                // 幻境传说: 机会卡4
                if (get_field_spell_mode2() === 4)
                    ans.fans.push({'val': 3, 'id': 12}); // 断幺九
                else
                    ans.fans.push({'val': 1, 'id': 12}); // 断幺九
            }

            if (beikou === 1 && menqing)
                ans.fans.push({'val': 1, 'id': 13}); // 一杯口

            if (pinghu && menqing)
                ans.fans.push({'val': 1, 'id': 14}); // 平和

            if (hunquandai && !chunquandai && !flag_hunlaotou)
                ans.fans.push({'val': menqing ? 2 : 1, 'id': 15}); // 混全带幺九

            if (yiqi)
                ans.fans.push({'val': menqing ? 2 : 1, 'id': 16}); // 一气通贯

            if (sanse)
                ans.fans.push({'val': menqing ? 2 : 1, 'id': 17}); // 三色同顺

            if (sansetongke)
                ans.fans.push({'val': 2, 'id': 19}); // 三色同刻

            if (gangzi_num === 3)
                ans.fans.push({'val': 2, 'id': 20}); // 三杠子

            if (kezi_num === 4)
                ans.fans.push({'val': 2, 'id': 21}); // 对对和

            if (anke_num === 3)
                ans.fans.push({'val': 2, 'id': 22}); // 三暗刻

            if (xiaosanyuan)
                ans.fans.push({'val': 2, 'id': 23}); // 小三元

            if (flag_hunlaotou && !flag_qinglaotou)
                ans.fans.push({'val': 2, 'id': 24}); // 混老头

            if (duizi_num === 7)
                ans.fans.push({'val': 2, 'id': 25}); // 七对子

            if ((is_guyi() || is_yifanjieguyi()) && wumenqi)
                ans.fans.push({'val': 2, 'id': 54}); // 五门齐

            if ((is_guyi() || is_yifanjieguyi()) && sanlianke)
                ans.fans.push({'val': 2, 'id': 55}); // 三连刻

            if (chunquandai)
                ans.fans.push({'val': menqing ? 3 : 2, 'id': 26}); // 纯全带幺九

            if (hunyise && !qingyise)
                ans.fans.push({'val': menqing ? 3 : 2, 'id': 27}); // 混一色

            if ((is_guyi() || is_yifanjieguyi()) && santongshun) {
                ans = deletefan(ans, 13); // 删除一杯口
                ans.fans.push({'val': menqing ? 3 : 2, 'id': 56}); // 一色三同顺
            }

            if (beikou === 2 && menqing)
                ans.fans.push({'val': 3, 'id': 28}); // 二杯口

            if (qingyise)
                ans.fans.push({'val': menqing ? 6 : 5, 'id': 29}); // 清一色
            if (is_guyi()) {
                let yitongmoyue = false, jiutonglaoyu = false;
                if (playercnt === 4) {
                    if (zimo && paishan_len() === 14 && lstdrawtype === 1 && lastile === "1p")
                        yitongmoyue = true;
                    if (!zimo && paishan_len() === 14 && lastile === "9p")
                        jiutonglaoyu = true;
                } else if (playercnt === 3) {
                    if (zimo && paishan_len() === 18 && lstdrawtype === 1 && lastile === "1p")
                        yitongmoyue = true;
                    if (!zimo && paishan_len() === 18 && lastile === "9p")
                        jiutonglaoyu = true;
                } else if (playercnt === 2) {
                    if (zimo && paishan_len() === 22 && lstdrawtype === 1 && lastile === "1p")
                        yitongmoyue = true;
                    if (!zimo && paishan_len() === 22 && lastile === "9p")
                        jiutonglaoyu = true;
                }
                if (yitongmoyue) {
                    ans = deletefan(ans, 5); // 删除海底摸月
                    ans.fans.push({'val': 5, 'id': 57}); // 一筒摸月
                }
                if (jiutonglaoyu) {
                    ans = deletefan(ans, 6); // 删除河底捞鱼
                    ans.fans.push({'val': 5, 'id': 58}); // 九筒捞鱼
                }
            }

            if (is_yifanjieguyi()) {
                let tuibudao = true;
                let chisanse = false;
                let sansetongguan = false;
                for (let i = 1; i <= nxt2.length; i++)
                    if (i !== 10 && i !== 11 && i !== 12 && i !== 13 && i !== 14 && i !== 17 && i !== 18)
                        if (i !== 20 && i !== 22 && i !== 23 && i !== 24 && i !== 26 && i !== 27)
                            if (i !== 32 && cnt2[i] >= 1) {
                                tuibudao = false;
                                break;
                            }

                let have_0m = false, have_0p = false, have_0s = false;
                for (let i = 0; i < tiles.length; i++) {
                    if (tiles[i].substring(0, 2) === "0m")
                        have_0m = true;
                    if (tiles[i].substring(0, 2) === "0p")
                        have_0p = true;
                    if (tiles[i].substring(0, 2) === "0s")
                        have_0s = true;
                }
                for (let i = 0; i < fulu[seat].length; i++)
                    for (let j = 0; j < fulu[seat][i].tile.length; j++) {
                        if (fulu[seat][i].tile[j].substring(0, 2) === "0m")
                            have_0m = true;
                        if (fulu[seat][i].tile[j].substring(0, 2) === "0p")
                            have_0p = true;
                        if (fulu[seat][i].tile[j].substring(0, 2) === "0s")
                            have_0s = true;
                    }
                if (have_0m && have_0p && have_0s)
                    chisanse = true;

                if (shunzi[2] >= 1 && shunzi[14] >= 1 && shunzi[26] >= 1)
                    sansetongguan = true;
                if (shunzi[2] >= 1 && shunzi[17] >= 1 && shunzi[23] >= 1)
                    sansetongguan = true;
                if (shunzi[5] >= 1 && shunzi[11] >= 1 && shunzi[26] >= 1)
                    sansetongguan = true;
                if (shunzi[5] >= 1 && shunzi[17] >= 1 && shunzi[20] >= 1)
                    sansetongguan = true;
                if (shunzi[8] >= 1 && shunzi[11] >= 1 && shunzi[23] >= 1)
                    sansetongguan = true;
                if (shunzi[8] >= 1 && shunzi[14] >= 1 && shunzi[20] >= 1)
                    sansetongguan = true;

                if (tuibudao)
                    ans.fans.push({'val': 1, 'id': 9700}); // 推不倒
                if (chisanse)
                    ans.fans.push({'val': 2, 'id': 9701}); // 赤三色
                if (sansetongguan)
                    ans.fans.push({'val': menqing ? 2 : 1, 'id': 9702}); // 三色通贯
            }


            if (calcsudian(ans) === -2000)
                return ans;

            if (alldoras[0] !== 0)
                // 幻境传说: 机会卡1
                if (!(get_field_spell_mode2() === 1 && liqiinfo[seat].liqi !== 0))
                    ans.fans.push({'val': alldoras[0], 'id': 31}); // 宝牌
            if (alldoras[1] !== 0)
                ans.fans.push({'val': alldoras[1], 'id': 32}); // 红宝牌
            if (alldoras[2] !== 0)
                ans.fans.push({'val': alldoras[2], 'id': 34}); // 北宝牌
            if (liqiinfo[seat].liqi !== 0) {
                let times = 1;
                // 幻境传说: 机会卡1
                if (get_field_spell_mode2() === 1 && liqiinfo[seat].liqi !== 0)
                    times = 2;
                ans.fans.push({'val': alldoras[3] * times, 'id': 33}); // 里宝牌
            }

            // 幻境传说: 庄家卡5
            if (get_field_spell_mode1() === 1 && seat === ju && !zimo)
                ans.dorabonus = alldoras[0] + alldoras[1] + alldoras[3];

            if (is_hunzhiyiji())
                if (!zimo && hunzhiyiji_info[fangchong].liqi !== 0)
                    ans.fans.push({'val': 2, 'id': 803}); // 过载

            if (is_yongchang()) {
                let moqie_bonus = calcbonus(shoumoqiemaxlen[seat][0], false);
                let shouqie_bonus = calcbonus(shoumoqiemaxlen[seat][1], true);
                if (moqie_bonus !== 0)
                    ans.fans.push({'val': moqie_bonus, 'id': 801}); // 绯
                if (shouqie_bonus !== 0)
                    ans.fans.push({'val': shouqie_bonus, 'id': 802}); // 苍
            }
            // --------------------------------------------------
            // --------------------------------------------------
            // --------------------------------------------------
            if (duizi_num === 7) { // 七对子固定符数
                ans.fu = 25;
                return ans;
            }
            ans.fu = 20; // 符底
            if (!pinghu)
                ans.fu += tingpaifu; // 听牌型符
            for (let i = 1; i <= 34; i++) {
                // 刻子符(幺九/中张, 明刻明杠, 暗杠暗刻)
                if (i === 1 || i === 9 || i === 10 || i === 18 || i === 19 || i === 27 || i >= 28 && i <= 34) {
                    ans.fu += typecnt[i][1] * 4;
                    ans.fu += typecnt[i][2] * 16;
                    ans.fu += typecnt[i][3] * 32;
                    ans.fu += typecnt[i][6] * 8;
                } else {
                    ans.fu += typecnt[i][1] * 2;
                    ans.fu += typecnt[i][2] * 8;
                    ans.fu += typecnt[i][3] * 16;
                    ans.fu += typecnt[i][6] * 4;
                }
                if (typecnt[i][7] === 1) {
                    // 雀头符, 雀头是自风, 场风, 三元
                    if (no_lianfengsifu()) {
                        if (i === tiletoint(((seat - ju + playercnt) % playercnt + 1).toString() + "z") || i === tiletoint((chang + 1).toString() + "z"))
                            ans.fu += 2;
                    } else {
                        if (i === tiletoint(((seat - ju + playercnt) % playercnt + 1).toString() + "z"))
                            ans.fu += 2;
                        if (i === tiletoint((chang + 1).toString() + "z"))
                            ans.fu += 2;
                    }
                    if (i === 32 || i === 33 || i === 34)
                        ans.fu += 2;
                }
            }
            if (zimo && !pinghu)
                ans.fu += 2; // 自摸符
            if (!zimo && menqing)
                ans.fu += 10; // 门前清荣和符
            ans.fu =
                Math.ceil(ans.fu / 10) * 10;
            if (fulucnt !== 0 && ans.fu === 20)
                ans.fu = 30;
            // --------------------------------------------------
            return ans;
        }

        for (let i = partitiontmp.length - 1; i >= 0; i--) {
            let tile = partitiontmp[i].tile, type = partitiontmp[i].type;
            if (type === 5 && (equaltile(tile[0], lastile) || equaltile(tile[1], lastile) || equaltile(tile[2], lastile))) {
                if (!zimo)
                    partitiontmp[i].type = 0;
                let midtile = inttotile((tiletoint(tile[0]) + tiletoint(tile[1]) + tiletoint(tile[2])) / 3);
                if (equaltile(midtile, lastile))
                    updateret(calc0(2)); // 坎张听符
                else if (tiletoint(lastile) % 9 === 3 && tiletoint(midtile) % 9 === 2)
                    updateret(calc0(2)); // 边张听符
                else if (tiletoint(lastile) % 9 === 7 && tiletoint(midtile) % 9 === 8)
                    updateret(calc0(2)); // 边张听符
                else
                    updateret(calc0(0));
                partitiontmp[i].type = 5;
            }
            if (type === 6 && equaltile(tile[0], lastile)) {
                if (!zimo)
                    partitiontmp[i].type = 1;
                updateret(calc0(0));
                partitiontmp[i].type = 6;
            }
            if (type === 7 && equaltile(tile[0], lastile))
                updateret(calc0(2)); // 单骑符
        }
    }

    function dfs(now) {
        if (now === 35) {
            if (partition.length === 7 || partition.length === 5)
                calc();
            return;
        }
        if (cnt[now] === 0) {
            dfs(now + 1);
            return;
        }
        let whatever = [0, 2, 3, 5, 6, 8, 9, 11, 12, 14];
        for (let k = 0; k < whatever.length; k++) {
            if (cnt[now] < whatever[k])
                continue;
            cnt[now] -= whatever[k];
            let cnt0 = cnt[now];
            if (whatever[k] % 3 === 2) { // 有对子
                let kezi_num = (whatever[k] - 2) / 3;
                for (let j = 0; j < kezi_num; j++)
                    partition.push({'type': 6, 'tile': [inttotile(now), inttotile(now), inttotile(now)]});
                partition.push({'type': 7, 'tile': [inttotile(now), inttotile(now)]});
                dfs(now);
            } else if (whatever[k] % 3 === 0) // 3 的倍数, 全是当成刻子
                for (let j = 0; j < whatever[k] / 3; j++)
                    partition.push({'type': 6, 'tile': [inttotile(now), inttotile(now), inttotile(now)]});

            if (cnt[nxt2[now]] >= cnt0 && cnt[nxt2[nxt2[now]]] >= cnt0) {
                cnt[now] -= cnt0;
                cnt[nxt2[now]] -= cnt0;
                cnt[nxt2[nxt2[now]]] -= cnt0;
                for (let i = 1; i <= cnt0; i++)
                    partition.push({
                        'type': 5,
                        'tile': [inttotile(now), inttotile(nxt2[now]), inttotile(nxt2[nxt2[now]])]
                    });
                dfs(now + 1);
                cnt[now] += cnt0;
                cnt[nxt2[now]] += cnt0;
                cnt[nxt2[nxt2[now]]] += cnt0;
                for (let i = 1; i <= cnt0; i++)
                    partition.length--;
            }
            for (let i = 0; i < Math.floor((whatever[k] + 1) / 3); i++)
                partition.length--;
            cnt[now] += whatever[k];
        }
    }

    if (!is_wanxiangxiuluo()) {
        dfs(1);
        if (calchupai(tiles) === 3) {
            let menqing = fulucnt === 0;
            let tianhu = false;
            let ans = {'yiman': !is_qingtianjing(), 'fans': [], 'fu': 25};
            if (liqiinfo[seat].yifa !== 0 && liqiinfo[seat].liqi === 0 && seat === ju && zimo) {
                tianhu = true;
                if (!is_qingtianjing())
                    ans.fans.push({'val': 1, 'id': 35});
                else
                    ans.fans.push({'val': 13, 'id': 35});
            } // 天和
            if (liqiinfo[seat].yifa !== 0 && liqiinfo[seat].liqi === 0 && seat !== ju && zimo) {
                if (!is_qingtianjing())
                    ans.fans.push({'val': 1, 'id': 36}); // 地和
                else
                    ans.fans.push({'val': 13, 'id': 36}); // 地和
            }
            if (liqiinfo[seat].yifa !== 0 && liqiinfo[seat].liqi === 0 && seat !== ju && !zimo && is_guyi()) {
                if (!is_qingtianjing())
                    ans.fans.push({'val': 1, 'id': 59}); // 人和
                else
                    ans.fans.push({'val': 13, 'id': 59}); // 人和
            }
            if (menqing && cnt[tiletoint(lastile)] === 1 && !tianhu) {
                if (!is_qingtianjing())
                    ans.fans.push({'val': 1, 'id': 42}); // 国士无双
                else
                    ans.fans.push({'val': 13, 'id': 42}); // 国士无双
            }
            if (menqing && (cnt[tiletoint(lastile)] === 2 || tianhu)) {
                if (!is_qingtianjing())
                    ans.fans.push({'val': no_wyakuman() ? 1 : 2, 'id': 49}); // 国士无双十三面
                else
                    ans.fans.push({'val': no_wyakuman() ? 13 : 26, 'id': 49}); // 国士无双十三面
            }
            if (liqiinfo[seat].liqi === 2) {
                let is_shishangsannian = false;
                if (playercnt === 4) {
                    if (zimo && paishan_len() === 14 && lstdrawtype === 1 || !zimo && paishan_len() === 14)
                        is_shishangsannian = true;
                } else if (playercnt === 3) {
                    if (zimo && paishan_len() === 18 && lstdrawtype === 1 || !zimo && paishan_len() === 18)
                        is_shishangsannian = true;
                } else if (playercnt === 2) {
                    if (zimo && paishan_len() === 22 && lstdrawtype === 1 || !zimo && paishan_len() === 22)
                        is_shishangsannian = true;
                }
                if (is_shishangsannian) {
                    if (!is_qingtianjing())
                        ans.fans.push({'val': 1, 'id': 63}); // 石上三年
                    else
                        ans.fans.push({'val': 13, 'id': 63}); // 石上三年
                }
            }
            updateret(ans);
        }
    } else if (cnt[tiletoint("bd")] === 1) {
        cnt[tiletoint("bd")]--;
        let tmp_tiles = [], origin_tiles = [];
        for (let i = 0; i < tiles.length; i++) {
            origin_tiles.push(tiles[i]);

            if (tiles[i] === "bd")
                continue;
            tmp_tiles.push(tiles[i]);
        }
        tiles = tmp_tiles;
        for (let j = 1; j <= 34; j++) {
            cnt[j]++;
            tiles.push(inttotile(j));

            dfs(1);
            if (calchupai(tiles) === 3) {
                let menqing = fulucnt === 0;
                let tianhu = false;
                let ans = {'yiman': !is_qingtianjing(), 'fans': [], 'fu': 25};
                if (liqiinfo[seat].yifa !== 0 && liqiinfo[seat].liqi === 0 && seat === ju && zimo) {
                    tianhu = true;
                    if (!is_qingtianjing())
                        ans.fans.push({'val': 1, 'id': 35});
                    else
                        ans.fans.push({'val': 13, 'id': 35});
                } // 天和
                if (liqiinfo[seat].yifa !== 0 && liqiinfo[seat].liqi === 0 && seat !== ju && zimo) {
                    if (!is_qingtianjing())
                        ans.fans.push({'val': 1, 'id': 36}); // 地和
                    else
                        ans.fans.push({'val': 13, 'id': 36}); // 地和
                }
                if (liqiinfo[seat].yifa !== 0 && liqiinfo[seat].liqi === 0 && seat !== ju && !zimo && is_guyi()) {
                    if (!is_qingtianjing())
                        ans.fans.push({'val': 1, 'id': 59}); // 人和
                    else
                        ans.fans.push({'val': 13, 'id': 59}); // 人和
                }
                if (menqing && cnt[tiletoint(lastile)] === 1 && !tianhu) {
                    if (!is_qingtianjing())
                        ans.fans.push({'val': 1, 'id': 42}); // 国士无双
                    else
                        ans.fans.push({'val': 13, 'id': 42}); // 国士无双
                }
                if (menqing && (cnt[tiletoint(lastile)] === 2 || tianhu)) {
                    if (!is_qingtianjing())
                        ans.fans.push({'val': no_wyakuman() ? 1 : 2, 'id': 49}); // 国士无双十三面
                    else
                        ans.fans.push({'val': no_wyakuman() ? 13 : 26, 'id': 49}); // 国士无双十三面
                }
                if (liqiinfo[seat].liqi === 2) {
                    let is_shishangsannian = false;
                    if (playercnt === 4) {
                        if (zimo && paishan_len() === 14 && lstdrawtype === 1 || !zimo && paishan_len() === 14)
                            is_shishangsannian = true;
                    } else if (playercnt === 3) {
                        if (zimo && paishan_len() === 18 && lstdrawtype === 1 || !zimo && paishan_len() === 18)
                            is_shishangsannian = true;
                    } else if (playercnt === 2) {
                        if (zimo && paishan_len() === 22 && lstdrawtype === 1 || !zimo && paishan_len() === 22)
                            is_shishangsannian = true;
                    }
                    if (is_shishangsannian) {
                        if (!is_qingtianjing())
                            ans.fans.push({'val': 1, 'id': 63}); // 石上三年
                        else
                            ans.fans.push({'val': 13, 'id': 63}); // 石上三年
                    }
                }
                updateret(ans);
            }

            tiles.length--;
            cnt[j]--;

            for (let i = 1; i <= nxt2.length; i++)
                cnt[i] = 0;
            for (let i = 0; i < tiles.length; i++)
                cnt[tiletoint(tiles[i])]++;
        }
        tiles = origin_tiles;
    }

    if (is_yifanjieguyi() && calchupai(tiles) === 12) {
        let ans = {'yiman': !is_qingtianjing(), 'fans': [], 'fu': 25};
        if (liqiinfo[seat].yifa !== 0 && liqiinfo[seat].liqi === 0 && zimo)
            ans.fans.push({'val': 1, 'id': 9708}); // 十三不搭
        updateret(ans);
    }
    return ret;
}

function calcxun() {
    for (let x = 0; x < playercnt; x++)
        if (playertiles[x].length % 3 === 2 && !hupaied[x])
            xun[x].push(actions.length - 1);
}

function calcdoras() {
    doracnt.cnt = Math.min(doracnt.cnt, 5);
    doracnt.licnt = Math.min(doracnt.licnt, 5);
    if (no_ganglidora())
        doracnt.licnt = 1;
    if (no_gangdora())
        doracnt.cnt = doracnt.licnt = 1;
    if (no_lidora())
        doracnt.licnt = 0;
    if (is_chuanma() || is_guobiao() || no_dora())
        doracnt.cnt = doracnt.licnt = 0;
    let doras0 = [];
    for (let i = 0; i < doracnt.cnt; i++)
        doras0[i] = doras[i];
    return doras0;
}

function gamebegin() {
    if (!editdata.config)
        editdata.config = {
            'category': 1,
            'meta': {'mode_id': 0},
            'mode': {
                'mode': 1,
            }
        };
    config = editdata.config;
    if (config.mode.mode >= 11 && config.mode.mode <= 20) { // 三麻屏蔽以下模式
        if (is_xuezhandaodi() || is_wanxiangxiuluo())
            config.mode.detail_rule.wanxiangxiuluo_mode = config.mode.detail_rule.xuezhandaodi = false;
        if (is_huansanzhang())
            config.mode.detail_rule.huansanzhang = false;
        if (is_muyu())
            config.mode.detail_rule.muyu_mode = false;
        if (is_dora3())
            config.mode.detail_rule.dora3_mode = false;
    }
    if (config.mode.mode >= 21)
        playercnt = 2;
    else if (config.mode.mode >= 11 && config.mode.mode <= 20)
        playercnt = 3;
    else
        playercnt = 4;

    if (!!(config && config.mode && config.mode.detail_rule && typeof (config.mode.detail_rule._liqi_need) === "number"))
        liqi_need = config.mode.detail_rule._liqi_need;
    else if (get_field_spell_mode3() === 2) // 幻境传说: 命运卡2
        liqi_need = 2;
    else
        liqi_need = 1;
    if (!!(config && config.mode && config.mode.detail_rule && typeof (config.mode.detail_rule._ben_times) === "number"))
        ben_times = config.mode.detail_rule._ben_times;
    else
        ben_times = 1;

    if (!!(config && config.mode && config.mode.detail_rule && typeof (config.mode.detail_rule._fafu_1ting) === "number"))
        fafu_1ting = config.mode.detail_rule._fafu_1ting;
    else
        fafu_1ting = 1000;
    if (!!(config && config.mode && config.mode.detail_rule && typeof (config.mode.detail_rule._fafu_2ting) === "number"))
        fafu_2ting = config.mode.detail_rule._fafu_2ting;
    else
        fafu_2ting = 1500;
    if (!!(config && config.mode && config.mode.detail_rule && typeof (config.mode.detail_rule._fafu_3ting) === "number"))
        fafu_3ting = config.mode.detail_rule._fafu_3ting;
    else
        fafu_3ting = 3000;
    if (!!(config && config.mode && config.mode.detail_rule && typeof (config.mode.detail_rule._fafu_3p_1ting) === "number"))
        fafu_3p_1ting = config.mode.detail_rule._fafu_3p_1ting;
    else
        fafu_3p_1ting = 1000;
    if (!!(config && config.mode && config.mode.detail_rule && typeof (config.mode.detail_rule._fafu_3p_2ting) === "number"))
        fafu_3p_2ting = config.mode.detail_rule._fafu_3p_2ting;
    else
        fafu_3p_2ting = 2000;
    if (!!(config && config.mode && config.mode.detail_rule && typeof (config.mode.detail_rule._fafu_2p) === "number"))
        fafu_2p = config.mode.detail_rule._fafu_2p;
    else
        fafu_2p = 2000;

    if (!!(config && config.mode && config.mode.detail_rule && typeof (config.mode.detail_rule._chang_ju_ben_num_) === "object")) {
        [chang, ju, ben, liqibang] = config.mode.detail_rule._chang_ju_ben_num_;
        if (liqibang === undefined)
            liqibang = 0;
        if (chang === undefined || ju === undefined || ben === undefined || chang < 0 || chang > 4 || ju < 0 || ju > playercnt)
            console.error("Error at 'config.mode.detail_rule._chang_ju_ben_num_'");
    }

    if (playercnt === 2) { // 二麻
        if (config && config.mode && config.mode.detail_rule && config.mode.detail_rule.init_point)
            scores = [config.mode.detail_rule.init_point, config.mode.detail_rule.init_point];
        else
            scores = [50000, 50000];
    } else if (playercnt === 3) { // 三麻
        if (config && config.mode && config.mode.detail_rule && config.mode.detail_rule.init_point)
            scores = [config.mode.detail_rule.init_point, config.mode.detail_rule.init_point, config.mode.detail_rule.init_point];
        else
            scores = [35000, 35000, 35000];
    } else { // 四麻
        if (config && config.mode && config.mode.detail_rule && config.mode.detail_rule.init_point)
            scores = [config.mode.detail_rule.init_point, config.mode.detail_rule.init_point, config.mode.detail_rule.init_point, config.mode.detail_rule.init_point];
        else {
            if (is_guobiao())
                scores = [30000, 30000, 30000, 30000];
            else if (is_chuanma() || is_tianming())
                scores = [50000, 50000, 50000, 50000];
            else if (is_muyu())
                scores = [40000, 40000, 40000, 40000];
            else if (is_dora3())
                scores = [35000, 35000, 35000, 35000];
            else
                scores = [25000, 25000, 25000, 25000];
        }
    }
    firstneededscores = scores[0];

    if (!!(config && config.mode && config.mode.detail_rule && typeof (config.mode.detail_rule._scores_) === "object"))
        scores = config.mode.detail_rule._scores_;

    edit_online();
}

function addNewRound(chang, ju, ben, doras, left_tile_count, liqibang, md5, paishan, scores, tiles0, tiles1, tiles2, tiles3, tingpai) {
    function mingpai_data(tiles, seat) {
        let ret = {'count': [], 'seat': seat, 'tiles': []};
        let cnt = [];
        for (let i = 1; i <= nxt2.length; i++)
            cnt[i] = 0;
        for (let i = 0; i < tiles.length; i++)
            cnt[tiletoint(tiles[i], true)]++;
        for (let i = 1; i <= nxt2.length; i++) {
            if (cnt[i] === 0)
                continue;
            ret.tiles.push(inttotile(i, true));
            ret.count.push(cnt[i]);
        }
        for (let i = 1; i <= nxt2.length; i++)
            mingpais[seat][inttotile(i, true)] = cnt[i];
        return ret;
    }

    let ret = {
        'name': "RecordNewRound",
        'data': {
            'chang': chang,
            'ju': ju,
            'ben': ben,
            'left_tile_count': left_tile_count,
            'liqibang': liqibang,
            'md5': md5,
            'paishan': paishan,
            'scores': scores.slice(),
            'tiles0': tiles0.slice(),
            'tiles1': tiles1.slice(),
            'tiles2': tiles2.slice(),
            'tiles3': tiles3.slice()
        }
    };
    if (is_huansanzhang() || is_chuanma())
        ret.data.operations = [{
            'operation_list': [{
                'change_tile_states': [0, 0, 0],
                'change_tiles': tiles0.slice(0, 3),
                'type': 12
            }],
            'seat': 0
        }, {
            'operation_list': [{
                'change_tile_states': [0, 0, 0],
                'change_tiles': tiles1.slice(0, 3),
                'type': 12
            }],
            'seat': 1
        }, {
            'operation_list': [{
                'change_tile_states': [0, 0, 0],
                'change_tiles': tiles2.slice(0, 3),
                'type': 12
            }],
            'seat': 2
        }, {
            'operation_list': [{
                'change_tile_states': [0, 0, 0],
                'change_tiles': tiles3.slice(0, 3),
                'type': 12
            }],
            'seat': 3
        }
        ];
    ret.data.opens = [];
    if (is_peipaimingpai() || is_openhand()) {
        ret.data.opens.push(mingpai_data(tiles0, 0));
        ret.data.opens.push(mingpai_data(tiles1, 1));
        ret.data.opens.push(mingpai_data(tiles2, 2));
        ret.data.opens.push(mingpai_data(tiles3, 3));
    }

    if (is_chuanma())
        ret.data.ju_count = editdata.actions.length;
    if (tingpai !== undefined)
        ret.data.tingpai = tingpai;
    if (!is_xuezhandaodi() && !is_wanxiangxiuluo() && !is_chuanma()) {
        if (typeof (doras) === "string")
            ret.data.dora = doras;
        else
            ret.data.doras = doras;
    }
    if (is_muyu()) {
        get_muyu("new");
        ret.data.muyu = {
            'count_max': 5,
            'count': muyu.count,
            'id': muyu.id,
            'seat': muyu.seat
        }
        update_muyu();
    }
    actions.push(ret);
    calcxun();
    edit_online();
}

function roundbegin() {
    if (typeof (editfunction) !== "undefined")
        editfunction();

    if (editdata.actions.length === 0)
        gamebegin();

    init();
    benchangbang = ben;
    let lastile = playertiles[ju][playertiles[ju].length - 1];
    playertiles[ju].length--;
    let tingpais = [];
    for (let i = 0; i < playercnt; i++) {
        let tingpaitmp = calctingpai(i);
        if (tingpaitmp.length !== 0)
            tingpais.push({'seat': i, 'tingpais1': tingpaitmp});
    }
    playertiles[ju].push(lastile);
    if (is_dora3())
        doracnt.cnt = doracnt.licnt = 3;

    if (playercnt === 2)
        addNewRound(chang, ju, ben, calcdoras(), paishan_len() - 18, liqibang, md5(paishan), paishan, scores.slice(), tiles0.slice(), tiles1.slice(), tiles2.slice(), tiles3.slice(), tingpais);
    else if (is_chuanma() || is_guobiao())
        addNewRound(chang, ju, ben, calcdoras(), paishan_len(), liqibang, md5(paishan), paishan, scores.slice(), tiles0.slice(), tiles1.slice(), tiles2.slice(), tiles3.slice(), tingpais);
    else
        addNewRound(chang, ju, ben, calcdoras(), paishan_len() - 14, liqibang, md5(paishan), paishan, scores.slice(), tiles0.slice(), tiles1.slice(), tiles2.slice(), tiles3.slice(), tingpais);
    saveproject();
}

function addDiscardTile(is_liqi, is_wliqi, doras, moqie, seat, tile, tingpais, tile_state, is_kailiqi, beishui_type) {
    for (let i = 0; i < playertiles[seat].length; i++)
        if (playertiles[seat][i] === tile) {
            playertiles[seat][i] = playertiles[seat][playertiles[seat].length - 1];
            playertiles[seat].length--;
            break;
        }

    let ret = {
        'name': "RecordDiscardTile",
        'data': {
            'is_liqi': is_liqi,
            'is_wliqi': is_wliqi,
            'doras': doras,
            'moqie': moqie,
            'seat': seat,
            'tile': tile,
            'tingpais': calctingpai(seat)
        }
    };
    if (is_beishuizhizhan() && (is_liqi || is_wliqi))
        ret.data.liqi_type_beishuizhizhan = beishui_type;

    if (is_hunzhiyiji() && hunzhiyiji_info[seat].liqi !== 0 && hunzhiyiji_info[seat].cnt === 6)
        ret.data.hun_zhi_yi_ji_info = {
            "seat": seat,
            "continue_deal_count": 6,
            "overload": false
        };
    if (is_yongchang()) {
        ret.data.yongchang = {
            "seat": seat,
            "moqie_count": shoumoqiemaxlen[seat][0],
            "moqie_bonus": calcbonus(shoumoqiemaxlen[seat][0], false),
            "shouqie_count": shoumoqiemaxlen[seat][1],
            "shouqie_bonus": calcbonus(shoumoqiemaxlen[seat][1], true)
        }
    }

    if (is_muyu()) {
        if (seat === muyu.seat)
            get_muyu("countdown");
        ret.data.muyu = {
            'count_max': 5,
            'count': muyu.count,
            'id': muyu.id,
            'seat': muyu.seat
        }
        update_muyu();
        if (muyu.count === 0)
            get_muyu("new");
    }
    if (tile_state !== undefined)
        ret.data.tile_state = tile_state;
    if (is_kailiqi)
        ret.data.is_kailiqi = true;
    actions.push(ret);
    calcxun();
    edit_online();
}

function addRevealTile(is_liqi, is_wliqi, moqie, seat, tile) {
    for (let i = 0; i < playertiles[seat].length; i++)
        if (playertiles[seat][i] === tile) {
            playertiles[seat][i] = playertiles[seat][playertiles[seat].length - 1];
            playertiles[seat].length--;
            break;
        }

    let ret = {
        'name': "RecordRevealTile",
        'data': {
            'seat': seat,
            'is_liqi': is_liqi,
            'is_wliqi': is_wliqi,
            'moqie': moqie,
            'tile': tile,
            'scores': scores.slice(),
            'liqibang': liqibang,
            'tingpais': calctingpai(seat)
        }
    };
    actions.push(ret);
    calcxun();
    edit_online();
}

function addLockTile(seat, lock_state, tile) {
    let ret = {
        'name': "RecordLockTile",
        'data': {
            'seat': seat,
            'scores': scores.slice(),
            'liqibang': liqibang,
            'tile': "",
            'lock_state': lock_state,
        }
    };
    if (tile !== undefined)
        ret.data.tile = tile;
    actions.push(ret);
    calcxun();
    edit_online();
}

function addUnveilTile(seat, seat_tile) {
    let ret = {
        'name': "RecordUnveilTile",
        'data': {
            'seat': seat,
            'scores': scores.slice(),
            'liqibang': liqibang,
            'operation': {
                'seat': seat_tile,
            }
        }
    };
    actions.push(ret);
    calcxun();
    edit_online();
}

function addDealTile(doras, left_tile_count, seat, tile, liqi, tile_state, tile_index) {
    playertiles[seat].push(tile);
    let ret = {
        'name': "RecordDealTile",
        'data': {
            'seat': seat,
            'tile': tile,
            'left_tile_count': left_tile_count,
            'doras': doras,
        }
    };

    if (is_zhanxing())
        ret.data.tile_index = tile_index;

    if (is_hunzhiyiji() && hunzhiyiji_info[seat].liqi && hunzhiyiji_info[seat].yifa)
        ret.data.hun_zhi_yi_ji_info = {
            "seat": seat,
            "continue_deal_count": hunzhiyiji_info[seat].cnt,
            "overload": false
        };
    let lstseat = getlstaction().data.seat;
    if (is_hunzhiyiji() && hunzhiyiji_info[lstseat].liqi && hunzhiyiji_info[lstseat].overload && !hunzhiyiji_info[lstseat].is_push) {
        ret.data.hun_zhi_yi_ji_info = {
            "seat": lstseat,
            "continue_deal_count": hunzhiyiji_info[lstseat].cnt,
            "overload": true
        };
        hunzhiyiji_info[lstseat].is_push = true;
    }

    if (tile_state !== undefined)
        ret.data.tile_state = tile_state;
    if (liqi != null)
        ret.data.liqi = liqi;
    if (is_muyu()) {
        if (muyu.seat === seat)
            ret.data.muyu = {
                'count_max': 5,
                'count': muyu.count,
                'id': muyu.id,
                'seat': muyu.seat
            }
        update_muyu();
    }
    actions.push(ret);
    calcxun();
    edit_online();
}

function addFillAwaitingTiles(doras, seat, awaiting_tiles, left_tile_count, liqi) {
    let ret = {
        'name': "RecordFillAwaitingTiles",
        'data': {
            'doras': doras,
            'awaiting_tiles': awaiting_tiles.slice(),
            'left_tile_count': left_tile_count,
            'operation': {
                'seat': seat
            }
        }
    };
    if (liqi != null)
        ret.data.liqi = liqi;
    actions.push(ret);
    calcxun();
    edit_online();
}

function addChiPengGang(froms, seat, tiles, type, liqi, tile_states) {
    for (let j = 0; j < tiles.length - 1; j++)
        for (let i = 0; i < playertiles[seat].length; i++)
            if (playertiles[seat][i] === tiles[j]) {
                playertiles[seat][i] = playertiles[seat][playertiles[seat].length - 1];
                playertiles[seat].length--;
                break;
            }

    let ret = {
        'name': "RecordChiPengGang",
        'data': {
            'froms': froms,
            'seat': seat,
            'tiles': tiles,
            'type': type
        }
    };
    let from = froms[froms.length - 1];
    if (liqi != null)
        ret.data.liqi = liqi;
    if (is_hunzhiyiji() && hunzhiyiji_info[from].liqi && !hunzhiyiji_info[from].is_push) {
        ret.data.hun_zhi_yi_ji_info = {
            "seat": from,
            "continue_deal_count": hunzhiyiji_info[from].cnt,
            "overload": true
        };
        hunzhiyiji_info[from].is_push = true;
    }
    if (is_yongchang()) {
        ret.data.yongchang = {
            "seat": from,
            "moqie_count": shoumoqiemaxlen[from][0],
            "moqie_bonus": calcbonus(shoumoqiemaxlen[from][0], false),
            "shouqie_count": shoumoqiemaxlen[from][1],
            "shouqie_bonus": calcbonus(shoumoqiemaxlen[from][1], true)
        }
    }

    if (tile_states !== undefined)
        ret.data.tile_states = tile_states;
    if (is_muyu()) {
        if (muyu.seat === seat)
            ret.data.muyu = {
                'count_max': 5,
                'count': muyu.count,
                'id': muyu.id,
                'seat': muyu.seat
            }
        update_muyu();
    }
    actions.push(ret);
    calcxun();
    edit_online();
}

function addAnGangAddGang(doras, seat, tile, type, tile_states) {
    if (type !== 3) {
        for (let i = 0; i < playertiles[seat].length; i++)
            if (equaltile(playertiles[seat][i], tile)) {
                playertiles[seat][i] = playertiles[seat][playertiles[seat].length - 1];
                playertiles[seat].length--;
                break;
            }
    } else // 暗杠
        for (let j = 0; j < 4; j++)
            for (let i = 0; i < playertiles[seat].length; i++)
                if (equaltile(playertiles[seat][i], tile)) {
                    playertiles[seat][i] = playertiles[seat][playertiles[seat].length - 1];
                    playertiles[seat].length--;
                    break;
                }

    let ret = {
        'name': "RecordAnGangAddGang",
        'data': {
            'doras': doras,
            'seat': seat,
            'tiles': tile,
            'type': type
        }
    };
    if (tile_states)
        ret.data.tile_states = tile_states;
    actions.push(ret);
    calcxun();
    edit_online();
}

function addBaBei(doras, seat, moqie, tile) {
    if (typeof (moqie) == "string") {
        tile = moqie;
        moqie = undefined;
    }
    if (tile === undefined)
        tile = "4z";
    if (moqie === undefined)
        moqie = playertiles[seat][playertiles[seat].length - 1] === tile;

    for (let i = 0; i < playertiles[seat].length; i++)
        if (playertiles[seat][i] === tile) {
            playertiles[seat][i] = playertiles[seat][playertiles[seat].length - 1];
            playertiles[seat].length--;
            break;
        }

    let ret = {
        'name': "RecordBaBei",
        'data': {
            'doras': doras,
            'moqie': moqie,
            'seat': seat,
            'tile': tile
        }
    };
    actions.push(ret);
    calcxun();
    edit_online();
}

function cmp(x, y) {
    return tiletoint(x) - tiletoint(y);
}

function hupaioneplayer_chuanma(seat) {
    let lstaction = getlstaction(), zimo = false;
    if (lstaction.name === "RecordNewRound" || lstaction.name === "RecordChangeTile")
        playertiles[seat].sort(cmp);
    if (lstaction.name === "RecordDealTile" || lstaction.name === "RecordNewRound" || lstaction.name === "RecordChangeTile")
        zimo = true;
    else if (lstaction.name === "RecordDiscardTile")
        playertiles[seat].push(lstaction.data.tile);
    else if (lstaction.name === "RecordAnGangAddGang")
        playertiles[seat].push(lstaction.data.tiles);
    else if (lstaction.name === "RecordBaBei")
        playertiles[seat].push(lstaction.data.tile);

    let fangchong;
    if (!zimo)
        fangchong = lstaction.data.seat;
    let ming = [];
    for (let i = 0; i < fulu[seat].length; i++) {
        let tiles = fulu[seat][i].tile;
        if (fulu[seat][i].type === 0)
            ming.push("shunzi(" + tiles[0] + "," + tiles[1] + "," + tiles[2] + ")");
        else if (fulu[seat][i].type === 1)
            ming.push("kezi(" + tiles[0] + "," + tiles[1] + "," + tiles[2] + ")");
        else if (fulu[seat][i].type === 2)
            ming.push("minggang(" + tiles[0] + "," + tiles[1] + "," + tiles[2] + "," + tiles[3] + ")");
        else if (fulu[seat][i].type === 3)
            ming.push("angang(" + tiles[0] + "," + tiles[1] + "," + tiles[2] + "," + tiles[3] + ")");
    }
    let hand = playertiles[seat].slice(), hu_tile;
    hu_tile = hand[hand.length - 1];
    hand.length--;
    hand.sort(cmp);
    // -------------------------------------------
    let fans = calcfan_chuanma(playertiles[seat], seat, zimo);
    let val = 0;
    for (let i = 0; i < fans.length; i++)
        val = val + fans[i].val;
    // -------------------------------------------
    let sudian = calcsudian_chuanma(fans);
    let zhahu = false;
    if (calchupai(playertiles[seat]) === 0 || huazhu(seat))
        zhahu = true;
    if (lstaction.name === "RecordAnGangAddGang" && lstaction.data.type === 3)
        zhahu = true;
    if (zhahu) {
        for (let i = 0; i < playercnt; i++) {
            if (i === seat || hupaied[i])
                continue;
            delta_scores[i] -= -33000;
            delta_scores[seat] += -33000;
        }
        let ret = {
            'count': val,
            'doras': [],
            'li_doras': [],
            'dadian': -delta_scores[seat],
            'fans': [{'val': 0, 'id': 9000}],
            'fu': 0,
            'hand': hand,
            'hu_tile': hu_tile,
            'ming': ming,
            'liqi': false,
            'qinjia': false,
            'seat': seat,
            'title_id': 0,
            'yiman': false,
            'zimo': zimo,
        }
        playertiles[seat].length--;
        return ret;
    }
    if (zimo)
        for (let i = 0; i < playercnt; i++) {
            if (i === seat || hupaied[i])
                continue;
            delta_scores[i] -= sudian + 1000;
            delta_scores[seat] += sudian + 1000;
        }
    else {
        delta_scores[fangchong] -= sudian;
        delta_scores[seat] += sudian;
    }
    let dadian = Math.max(delta_scores[seat], -delta_scores[seat]);
    // ---------------------------------------------------
    let ret = {
        'count': val,
        'doras': [],
        'li_doras': [],
        'dadian': dadian,
        'fans': fans,
        'fu': 20,
        'hand': hand,
        'hu_tile': hu_tile,
        'ming': ming,
        'liqi': false,
        'qinjia': false,
        'seat': seat,
        'title_id': 0,
        'yiman': false,
        'zimo': zimo,
    }
    playertiles[seat].length--;
    return ret;
}

function hupaioneplayer(seat) {
    function qieshang(x) {
        return Math.ceil(x / 100) * 100;
    }

    let lstaction = getlstaction(), zimo = false;
    if (lstaction.name === "RecordNewRound" || lstaction.name === "RecordChangeTile")
        playertiles[seat].sort(cmp);
    if (lstaction.name === "RecordDealTile" || lstaction.name === "RecordNewRound" || lstaction.name === "RecordChangeTile")
        zimo = true;
    else if (lstaction.name === "RecordDiscardTile" || lstaction.name === "RecordRevealTile" || ((lstaction.name === "RecordLockTile" && lstaction.data.lock_state === 0)))
        playertiles[seat].push(lstaction.data.tile);
    else if (lstaction.name === "RecordAnGangAddGang")
        playertiles[seat].push(lstaction.data.tiles);
    else if (lstaction.name === "RecordBaBei")
        playertiles[seat].push(lstaction.data.tile);
    let fangchong;
    if (!zimo)
        fangchong = lstaction.data.seat;

    if (is_hunzhiyiji() && !zimo && hunzhiyiji_info[fangchong].yifa) {
        hunzhiyiji_info.yifa = false;
        hunzhiyiji_info.overload = true;
    }

    let doras0 = [];
    for (let i = 0; i < doracnt.cnt; i++)
        doras0[i] = doras[i];
    let li_doras0 = [];
    if (liqiinfo[seat].liqi !== 0)
        for (let i = 0; i < doracnt.licnt; i++)
            li_doras0[i] = li_doras[i];
    let ming = [];
    for (let i = 0; i < fulu[seat].length; i++) {
        let tiles = fulu[seat][i].tile;
        if (fulu[seat][i].type === 0)
            ming.push("shunzi(" + tiles[0] + "," + tiles[1] + "," + tiles[2] + ")");
        else if (fulu[seat][i].type === 1)
            ming.push("kezi(" + tiles[0] + "," + tiles[1] + "," + tiles[2] + ")");
        else if (fulu[seat][i].type === 2)
            ming.push("minggang(" + tiles[0] + "," + tiles[1] + "," + tiles[2] + "," + tiles[3] + ")");
        else if (fulu[seat][i].type === 3)
            ming.push("angang(" + tiles[0] + "," + tiles[1] + "," + tiles[2] + "," + tiles[3] + ")");
    }
    let hand = playertiles[seat].slice(), hu_tile;
    hu_tile = hand[hand.length - 1];
    hand.length--;
    hand.sort(cmp);
    // ------------------------------
    let qinjia = seat === ju;
    let liqi = liqiinfo[seat].liqi !== 0;
    // -------------------------------------------
    let points = calcfan(playertiles[seat], seat, zimo, fangchong);
    let val = 0, title_id = 0;
    for (let i = 0; i < points.fans.length; i++)
        val += points.fans[i].val;
    if (!is_qingtianjing()) {
        if (!points.yiman && val === 5 || calcsudian(points) === 2000)
            title_id = 1;
        if (!points.yiman && (val === 6 || val === 7))
            title_id = 2;
        if (!points.yiman && (val === 8 || val === 9 || val === 10))
            title_id = 3;
        if (!points.yiman && (val === 11 || val === 12 || (val >= 13 && no_leijiyiman())))
            title_id = 4;
        if (!points.yiman && val >= 13)
            title_id = 11;
        if (points.yiman)
            title_id = val + 4;
    }
    // -------------------------------------------
    let tianming_bonus = 1;
    if (is_tianming())
        tianming_bonus = calc_tianming(seat, zimo);
    // -------------------------------------------
    let sudian = calcsudian(points);
    let zhahu = false;
    if (calchupai(playertiles[seat]) === 0 || sudian === -2000)
        zhahu = true;
    if ((calchupai(playertiles[seat]) !== 3 || no_guoshiangang()) && calchupai(playertiles[seat]) !== 3 && lstaction.name === "RecordAnGangAddGang" && lstaction.data.type === 3)
        zhahu = true;
    if (!zimo && zhenting[seat])
        zhahu = true;
    if (lstaction.name === "RecordRevealTile" || ((lstaction.name === "RecordLockTile" && lstaction.data.lock_state !== 0)))
        zhahu = true;
    let point_rong, point_sum, point_zimo_qin, point_zimo_xian;
    if (qinjia) {
        point_rong = 6 * sudian;
        point_zimo_qin = 2 * sudian; // not needed
        point_zimo_xian = 2 * sudian;
        if (playercnt === 3 && no_zimosun())
            point_zimo_xian = 3 * sudian;
        if (playercnt === 2 && no_zimosun())
            point_zimo_xian = 6 * sudian;
        if (playercnt === 3 && !no_zimosun())
            point_sum = 4 * sudian;
        else if (playercnt === 2 && !no_zimosun())
            point_sum = 2 * sudian;
        else
            point_sum = 6 * sudian;
    } else {
        point_rong = 4 * sudian;
        point_zimo_qin = 2 * sudian;
        point_zimo_xian = sudian;
        if (playercnt === 3 && no_zimosun()) {
            point_zimo_qin = sudian * 5 / 2;
            point_zimo_xian = sudian * 3 / 2;
        }
        if (playercnt === 2 && no_zimosun()) {
            point_zimo_qin = 6 * sudian;
            point_zimo_xian = 0;
        }
        if (playercnt === 3 && !no_zimosun())
            point_sum = 3 * sudian;
        else if (playercnt === 2 && !no_zimosun())
            point_sum = 2 * sudian;
        else
            point_sum = 4 * sudian;
    }
    point_rong = qieshang(point_rong) * tianming_bonus;
    point_sum = qieshang(point_sum) * tianming_bonus;
    point_zimo_qin = qieshang(point_zimo_qin) * tianming_bonus;
    point_zimo_xian = qieshang(point_zimo_xian) * tianming_bonus;

    if (zhahu) {
        if (qinjia) {
            point_rong = 12000;
            point_zimo_qin = 4000; // not needed
            point_zimo_xian = 4000;
            if (playercnt === 3 && no_zimosun()) {
                point_zimo_qin = 6000;
                point_zimo_xian = 6000;
            }
            if (playercnt === 2 && no_zimosun()) {
                point_zimo_qin = 12000;
                point_zimo_xian = 12000;
            }
            if (playercnt === 3 && !no_zimosun())
                point_sum = 8000;
            else if (playercnt === 2 && !no_zimosun())
                point_sum = 4000;
            else point_sum = 12000;
        } else {
            point_rong = 8000;
            point_zimo_qin = 4000;
            point_zimo_xian = 2000;
            if (playercnt === 3 && no_zimosun()) {
                point_zimo_qin = 5000;
                point_zimo_xian = 3000;
            }
            if (playercnt === 2 && no_zimosun()) {
                point_zimo_qin = 8000;
                point_zimo_xian = 8000;
            }
            if (playercnt === 3 && !no_zimosun())
                point_sum = 6000;
            else if (playercnt === 2 && !no_zimosun())
                point_sum = 4000;
            else
                point_sum = 8000;
        }
        for (let i = 0; i < playercnt; i++) {
            if (i === seat || hupaied[i])
                continue;
            if (i === ju || seat === ju) {
                delta_scores[i] -= qieshang(-4000) * muyutimes[i] * muyutimes[seat];
                delta_scores[seat] += qieshang(-4000) * muyutimes[i] * muyutimes[seat];
            } else {
                delta_scores[i] -= qieshang(-2000) * muyutimes[i] * muyutimes[seat];
                delta_scores[seat] += qieshang(-2000) * muyutimes[i] * muyutimes[seat];
            }
        }
        if (playercnt === 3 && no_zimosun())
            for (let i = 0; i < playercnt; i++) {
                if (i === seat || hupaied[i])
                    continue;
                if (seat === ju) {
                    delta_scores[i] -= qieshang(-2000) * muyutimes[i] * muyutimes[seat];
                    delta_scores[seat] += qieshang(-2000) * muyutimes[i] * muyutimes[seat];
                } else {
                    delta_scores[i] -= qieshang(-1000) * muyutimes[i] * muyutimes[seat];
                    delta_scores[seat] += qieshang(-1000) * muyutimes[i] * muyutimes[seat];
                }
            }

        if (playercnt === 2 && no_zimosun())
            for (let i = 0; i < playercnt; i++) {
                if (i === seat || hupaied[i])
                    continue;
                if (seat === ju) {
                    delta_scores[i] -= qieshang(-8000) * muyutimes[i] * muyutimes[seat];
                    delta_scores[seat] += qieshang(-8000) * muyutimes[i] * muyutimes[seat];
                } else {
                    delta_scores[i] -= qieshang(-4000) * muyutimes[i] * muyutimes[seat];
                    delta_scores[seat] += qieshang(-4000) * muyutimes[i] * muyutimes[seat];
                }
            }

        let ret = {
            'count': 0,
            'doras': doras0,
            'li_doras': li_doras0,
            'fans': [{'val': 0, 'id': 9000}],
            'fu': 0,
            'hand': hand,
            'hu_tile': hu_tile,
            'liqi': liqi,
            'ming': ming,
            'point_rong': point_rong,
            'point_sum': point_sum,
            'point_zimo_qin': point_zimo_qin,
            'point_zimo_xian': point_zimo_xian,
            'qinjia': qinjia,
            'seat': seat,
            'title_id': 1,
            'yiman': false,
            'zimo': zimo,
        }
        playertiles[seat].length--;
        if (is_xuezhandaodi() || is_wanxiangxiuluo() || playercnt === 2)
            ret.dadian = -delta_scores[seat];
        return ret;
    }

    // 幻境传说: 庄家卡5
    if (get_field_spell_mode1() === 5 && seat === ju && !zimo) {
        delta_scores[seat] += points.dorabonus * 1000;
        delta_scores[fangchong] -= points.dorabonus * 1000;
    }

    if (baopai[seat].length !== 0) { // 有包牌
        let baoval = 0;
        for (let j = 0; j < baopai[seat].length; j++)
            baoval += baopai[seat][j].val

        if (zimo) {
            if (baogangseat === -1 || hupaied[baogangseat]) { // 不存在包杠, 或包杠家已和牌, 则这部分包牌全包
                for (let j = 0; j < baopai[seat].length; j++)
                    for (let i = 0; i < playercnt; i++) { // 包牌部分
                        if (i === seat || hupaied[i])
                            continue;
                        if (i === ju || seat === ju) { // 亲, 或子
                            delta_scores[baopai[seat][j].seat] -= baopai[seat][j].val * 16000 * muyutimes[i] * muyutimes[seat] * tianming_bonus;
                            delta_scores[seat] += baopai[seat][j].val * 16000 * muyutimes[i] * muyutimes[seat] * tianming_bonus;
                        } else {
                            delta_scores[baopai[seat][j].seat] -= baopai[seat][j].val * 8000 * muyutimes[i] * muyutimes[seat] * tianming_bonus;
                            delta_scores[seat] += baopai[seat][j].val * 8000 * muyutimes[i] * muyutimes[seat] * tianming_bonus;
                        }
                    }

                for (let i = 0; i < playercnt; i++) { // 非包牌部分
                    if (i === seat || hupaied[i])
                        continue;
                    if (i === ju || seat === ju) { // 亲, 或子
                        delta_scores[i] -= (val - baoval) * 16000 * muyutimes[i] * muyutimes[seat] * tianming_bonus;
                        delta_scores[seat] += (val - baoval) * 16000 * muyutimes[i] * muyutimes[seat] * tianming_bonus;
                    } else {
                        delta_scores[i] -= (val - baoval) * 8000 * muyutimes[i] * muyutimes[seat] * tianming_bonus;
                        delta_scores[seat] += (val - baoval) * 8000 * muyutimes[i] * muyutimes[seat] * tianming_bonus;
                    }
                }
                if (playercnt === 3 && no_zimosun()) // 三麻无自摸损
                    for (let i = 0; i < playercnt; i++) {
                        if (i === seat || hupaied[i])
                            continue;
                        if (seat === ju) {
                            delta_scores[i] -= (val - baoval) * 8000 * muyutimes[i] * muyutimes[seat] * tianming_bonus;
                            delta_scores[seat] += (val - baoval) * 8000 * muyutimes[i] * muyutimes[seat] * tianming_bonus;
                        } else {
                            delta_scores[i] -= (val - baoval) * 4000 * muyutimes[i] * muyutimes[seat] * tianming_bonus;
                            delta_scores[seat] += (val - baoval) * 4000 * muyutimes[i] * muyutimes[seat] * tianming_bonus;
                        }
                    }

                if (playercnt === 2 && no_zimosun()) // 二麻无自摸损
                    for (let i = 0; i < playercnt; i++) {
                        if (i === seat || hupaied[i])
                            continue;
                        if (seat === ju) {
                            delta_scores[i] -= (val - baoval) * 32000 * muyutimes[i] * muyutimes[seat] * tianming_bonus;
                            delta_scores[seat] += (val - baoval) * 32000 * muyutimes[i] * muyutimes[seat] * tianming_bonus;
                        } else {
                            delta_scores[i] -= (val - baoval) * 16000 * muyutimes[i] * muyutimes[seat] * tianming_bonus;
                            delta_scores[seat] += (val - baoval) * 16000 * muyutimes[i] * muyutimes[seat] * tianming_bonus;
                        }
                    }

            } else if (!hupaied[baogangseat]) { // 有包牌存在包杠, 则看成包杠放铳
                if (qinjia) {
                    for (let j = 0; j < baopai[seat].length; j++) {
                        delta_scores[baopai[seat][j].seat] -= baopai[seat][j].val * 24000 * muyutimes[baogangseat] * muyutimes[seat] * tianming_bonus;
                        delta_scores[seat] += baopai[seat][j].val * 24000 * muyutimes[baogangseat] * muyutimes[seat] * tianming_bonus;
                    }
                    delta_scores[baogangseat] -= (val * 48000 - baoval * 24000) * muyutimes[baogangseat] * muyutimes[seat] * tianming_bonus;
                    delta_scores[seat] += (val * 48000 - baoval * 24000) * muyutimes[baogangseat] * muyutimes[seat] * tianming_bonus;
                } else {
                    for (let j = 0; j < baopai[seat].length; j++) {
                        delta_scores[baopai[seat][j].seat] -= baopai[seat][j].val * 16000 * muyutimes[baogangseat] * muyutimes[seat] * tianming_bonus;
                        delta_scores[seat] += baopai[seat][j].val * 16000 * muyutimes[baogangseat] * muyutimes[seat] * tianming_bonus;
                    }
                    delta_scores[baogangseat] -= (val * 32000 - baoval * 16000) * muyutimes[baogangseat] * muyutimes[seat] * tianming_bonus;
                    delta_scores[seat] += (val * 32000 - baoval * 16000) * muyutimes[baogangseat] * muyutimes[seat] * tianming_bonus;
                }
            }
        } else { // 放铳, 则无需包杠
            if (qinjia) {
                for (let j = 0; j < baopai[seat].length; j++) {
                    delta_scores[baopai[seat][j].seat] -= baopai[seat][j].val * 24000 * muyutimes[fangchong] * muyutimes[seat] * tianming_bonus;
                    delta_scores[seat] += baopai[seat][j].val * 24000 * muyutimes[fangchong] * muyutimes[seat] * tianming_bonus;
                }
                delta_scores[fangchong] -= (val * 48000 - baoval * 24000) * muyutimes[fangchong] * muyutimes[seat] * tianming_bonus;
                delta_scores[seat] += (val * 48000 - baoval * 24000) * muyutimes[fangchong] * muyutimes[seat] * tianming_bonus;
            } else {
                for (let j = 0; j < baopai[seat].length; j++) {
                    delta_scores[baopai[seat][j].seat] -= baopai[seat][j].val * 16000 * muyutimes[fangchong] * muyutimes[seat] * tianming_bonus;
                    delta_scores[seat] += baopai[seat][j].val * 16000 * muyutimes[fangchong] * muyutimes[seat] * tianming_bonus;
                }
                delta_scores[fangchong] -= (val * 32000 - baoval * 16000) * muyutimes[fangchong] * muyutimes[seat] * tianming_bonus;
                delta_scores[seat] += (val * 32000 - baoval * 16000) * muyutimes[fangchong] * muyutimes[seat] * tianming_bonus;
            }
        }
    } else if (baogangseat !== -1 && zimo && !hupaied[baogangseat]) { // 非包牌情况下的包杠
        if (qinjia) {
            delta_scores[baogangseat] -= qieshang(6 * sudian) * muyutimes[baogangseat] * muyutimes[seat] * tianming_bonus;
            delta_scores[seat] += qieshang(6 * sudian) * muyutimes[baogangseat] * muyutimes[seat] * tianming_bonus;
        } else {
            delta_scores[baogangseat] -= qieshang(4 * sudian) * muyutimes[baogangseat] * muyutimes[seat] * tianming_bonus;
            delta_scores[seat] += qieshang(4 * sudian) * muyutimes[baogangseat] * muyutimes[seat] * tianming_bonus;
        }
    } else { // 正常情况
        if (zimo) {
            for (let i = 0; i < playercnt; i++) {
                if (i === seat || hupaied[i])
                    continue;
                if (i === ju || seat === ju) {
                    delta_scores[i] -= qieshang(sudian * 2) * muyutimes[i] * muyutimes[seat] * tianming_bonus;
                    delta_scores[seat] += qieshang(sudian * 2) * muyutimes[i] * muyutimes[seat] * tianming_bonus;
                } else {
                    delta_scores[i] -= qieshang(sudian) * muyutimes[i] * muyutimes[seat] * tianming_bonus;
                    delta_scores[seat] += qieshang(sudian) * muyutimes[i] * muyutimes[seat] * tianming_bonus;
                }
            }
            if (playercnt === 3 && no_zimosun()) {
                for (let i = 0; i < playercnt; i++) {
                    if (i === seat || hupaied[i])
                        continue;
                    if (seat === ju) {
                        delta_scores[i] -= qieshang(sudian) * muyutimes[i] * muyutimes[seat] * tianming_bonus;
                        delta_scores[seat] += qieshang(sudian) * muyutimes[i] * muyutimes[seat] * tianming_bonus;
                    } else {
                        delta_scores[i] -= qieshang(sudian / 2) * muyutimes[i] * muyutimes[seat] * tianming_bonus;
                        delta_scores[seat] += qieshang(sudian / 2) * muyutimes[i] * muyutimes[seat] * tianming_bonus;
                    }
                }
            }
            if (playercnt === 2 && no_zimosun()) {
                for (let i = 0; i < playercnt; i++) {
                    if (i === seat || hupaied[i])
                        continue;
                    if (seat === ju) {
                        delta_scores[i] -= qieshang(sudian * 4) * muyutimes[i] * muyutimes[seat] * tianming_bonus;
                        delta_scores[seat] += qieshang(sudian * 4) * muyutimes[i] * muyutimes[seat] * tianming_bonus;
                    } else {
                        delta_scores[i] -= qieshang(sudian * 2) * muyutimes[i] * muyutimes[seat] * tianming_bonus;
                        delta_scores[seat] += qieshang(sudian * 2) * muyutimes[i] * muyutimes[seat] * tianming_bonus;
                    }
                }
            }
        } else {
            if (qinjia) {
                delta_scores[fangchong] -= qieshang(6 * sudian) * muyutimes[fangchong] * muyutimes[seat] * tianming_bonus;
                delta_scores[seat] += qieshang(6 * sudian) * muyutimes[fangchong] * muyutimes[seat] * tianming_bonus;
            } else {
                delta_scores[fangchong] -= qieshang(4 * sudian) * muyutimes[fangchong] * muyutimes[seat] * tianming_bonus;
                delta_scores[seat] += qieshang(4 * sudian) * muyutimes[fangchong] * muyutimes[seat] * tianming_bonus;
            }
        }
    }
    let dadian = Math.max(delta_scores[seat], -delta_scores[seat]);
    // 幻境传说: 命运卡3
    if (get_field_spell_mode3() === 3 && liqiinfo[seat].liqi !== 0) {
        let diff = 300 * spell_triple[seat];
        if (delta_scores[seat] <= diff)
            for (let i = 0; i < playercnt; i++)
                delta_scores[i] = 0;
        else {
            delta_scores[seat] -= diff;
            if (zimo)
                for (let i = 0; i < playercnt; i++) {
                    if (i === seat)
                        continue;
                    delta_scores[i] += diff / 3;
                }
            else
                delta_scores[fangchong] += diff;
        }
    }

    // 本场与供托
    if (baopai[seat].length !== 0) { // 有包牌
        let baoval = 0;
        let same_seat = true; // true 表示当前的和牌只有一种包牌, 或只有一家包牌
        for (let j = 0; j < baopai[seat].length; j++) {
            baoval += baopai[seat][j].val
            if (j !== 0 && baopai[seat][0].seat !== baopai[seat][j].seat)
                same_seat = false;
        }
        if (baogangseat === -1 || hupaied[baogangseat]) { // 不存在包杠或包杠家已和牌
            if (zimo && (val - baoval !== 0 || !same_seat)) { // 自摸情况下有非包牌部分, 或包牌家不止一家, 本场划分相当于一般自摸
                for (let i = 0; i < playercnt; i++) {
                    if (i === seat || hupaied[i])
                        continue;
                    delta_scores[i] -= 100 * benchangbang * ben_times;
                    delta_scores[seat] += 100 * benchangbang * ben_times;
                }
            } else if (zimo) { // 自摸情况下全是包牌, 且包牌家只有一家, 则那个包牌家支付全部本场
                delta_scores[baopai[seat][0].seat] -= (playercnt - 1) * 100 * benchangbang * ben_times;
                delta_scores[seat] += (playercnt - 1) * 100 * benchangbang * ben_times;
            } else { // 放铳, 放铳家支付全部本场
                delta_scores[fangchong] -= (playercnt - 1) * 100 * benchangbang * ben_times;
                delta_scores[seat] += (playercnt - 1) * 100 * benchangbang * ben_times;
            }
        } else if (zimo && !hupaied[baogangseat]) { // 有包牌存在包杠, 则一定是自摸, 包杠家支付全部本场
            delta_scores[baogangseat] -= (playercnt - 1) * 100 * benchangbang * ben_times;
            delta_scores[seat] += (playercnt - 1) * 100 * benchangbang * ben_times;
        }
    } else if (zimo) { // 一般自摸
        if (baogangseat !== -1 && !hupaied[baogangseat]) { // 存在包杠, 则包杠家支付全部本场, 相当于包杠家放铳
            delta_scores[baogangseat] -= (playercnt - 1) * 100 * benchangbang * ben_times;
            delta_scores[seat] += (playercnt - 1) * 100 * benchangbang * ben_times;
        } else
            for (let i = 0; i < playercnt; i++) {
                if (i === seat || hupaied[i])
                    continue;
                delta_scores[i] -= 100 * benchangbang * ben_times;
                delta_scores[seat] += 100 * benchangbang * ben_times;
            }
    } else { // 一般放铳
        delta_scores[fangchong] -= (playercnt - 1) * 100 * benchangbang * ben_times;
        delta_scores[seat] += (playercnt - 1) * 100 * benchangbang * ben_times;
    }
    benchangbang = 0;
    delta_scores[seat] += liqibang * 1000;
    liqibang = 0;
    // ---------------------------------------------------
    let ret = {
        'count': val,
        'doras': doras0,
        'li_doras': li_doras0,
        'fans': points.fans,
        'fu': points.fu,
        'hand': hand,
        'hu_tile': hu_tile,
        'liqi': liqi,
        'ming': ming,
        'point_rong': point_rong,
        'point_sum': point_sum,
        'point_zimo_qin': point_zimo_qin,
        'point_zimo_xian': point_zimo_xian,
        'qinjia': qinjia,
        'seat': seat,
        'title_id': title_id,
        'yiman': points.yiman,
        'zimo': zimo,
    }
    if (is_tianming())
        ret.tianming_bonus = tianming_bonus;
    if (is_xuezhandaodi() || is_wanxiangxiuluo() || playercnt === 2)
        ret.dadian = dadian;
    playertiles[seat].length--;
    return ret;
}

function calc_tianming(seat, zimo) {
    let sum = 1;
    // 查手牌
    for (let i = 0; i < playertiles[seat].length; i++) {
        if (!zimo && i === playertiles[seat].length - 1) // 不是自摸, 则最后一张牌不考虑
            break;
        if (playertiles[seat][i].length >= 2 && playertiles[seat][i][2] === tile_suf)
            sum++;
    }
    // 查副露
    for (let i = 0; i < fulu[seat].length; i++)
        for (let j = 0; j < fulu[seat][i].length; j++) {
            if (fulu[seat][i].type !== 3 && j === fulu[seat][i].length - 1) // 不是暗杠, 则最后一张牌不考虑
                break;
            if (fulu[seat][i][j].length > 2 && fulu[seat][i][j][2] === tile_suf)
                sum++;
        }
    return sum
}

function endHule(HuleInfo, old_scores, delta_scores, scores, baopai) {
    actions.push({
        'name': "RecordHule",
        'data': {
            'delta_scores': delta_scores.slice(),
            'gameend': {},
            'hules': HuleInfo,
            'old_scores': old_scores.slice(),
            'scores': scores.slice(),
            'baopai': baopai
        }
    });
    edit_online();
}

function addHuleXueZhanMid(HuleInfo, old_scores, delta_scores, scores, liqi) {
    if (!is_chuanma())
        for (let seat = 0; seat < playercnt; seat++)
            liqiinfo[seat].yifa = 0;
    let ret = {
        'name': "RecordHuleXueZhanMid",
        'data': {
            'delta_scores': delta_scores.slice(),
            'hules': HuleInfo,
            'old_scores': old_scores.slice(),
            'scores': scores.slice(),
        }
    };
    if (liqi != null)
        ret.data.liqi = liqi;
    actions.push(ret);
    edit_online();
}

function addHuleXueZhanEnd(HuleInfo, old_scores, delta_scores, scores, hules_history) {
    actions.push({
        'name': "RecordHuleXueZhanEnd",
        'data': {
            'delta_scores': delta_scores.slice(),
            'hules': HuleInfo,
            'hules_history': hules_history,
            'old_scores': old_scores.slice(),
            'scores': scores.slice()
        }
    });
}

function addHuleXueLiu(HuleInfo, old_scores, delta_scores, scores) {
    if (!is_chuanma())
        for (let seat = 0; seat < playercnt; seat++)
            liqiinfo[seat].yifa = 0;
    actions.push({
        'name': "RecordHuleXueLiu",
        'data': {
            'delta_scores': delta_scores.slice(),
            'hules': HuleInfo,
            'old_scores': old_scores.slice(),
            'scores': scores.slice(),
            'baopai': 0
        }
    });
    edit_online();
}

function addHuleXueLiuEnd(HuleInfo, old_scores, delta_scores, scores, hules_history) {
    let allplayertiles = ["", "", "", ""];
    for (let seat = 0; seat < playercnt; seat++) {
        playertiles[seat].sort(cmp);
        for (let i = 0; i < playertiles[seat].length; i++) {
            allplayertiles[seat] += playertiles[seat][i];
            if (i !== playertiles[seat].length - 1)
                allplayertiles[seat] += "|";
        }
    }
    for (let seat = 0; seat < playercnt; seat++)
        liqiinfo[seat].yifa = 0;
    actions.push({
        'name': "RecordHuleXueLiuEnd",
        'data': {
            'delta_scores': delta_scores.slice(),
            'hules': HuleInfo,
            'hules_history': hules_history,
            'old_scores': old_scores.slice(),
            'scores': scores.slice(),
            'allplayertiles': allplayertiles,
            'baopai': 0
        }
    });
    edit_online();
}

function hupai(x, type) {
    if (chuanmagangs.notover.length !== 0) {
        let seat = getlstaction().data.seat, tile = getlstaction().data.tiles;
        for (let i = 0; i < fulu[seat].length; i++)
            if (fulu[seat][i].type === 2 && equaltile(fulu[seat][i].tile[0], tile)) {
                fulu[seat][i].type = 1;
                fulu[seat][i].tile.length--;
                break;
            }
        chuanmagangs.notover.length = 0;
    }
    if (typeof (x) == "boolean") {
        type = x;
        x = undefined;
    }
    if (typeof (x) == "number")
        x = [x];
    if (x === undefined || x.length === 0) {
        let lstaction = getlstaction();
        if (lstaction.name === "RecordDealTile")
            x = [lstaction.data.seat];
        else if (lstaction.name === "RecordNewRound" || lstaction.name === "RecordChangeTile")
            x = [ju];
        else { // 荣和
            x = [];
            for (let i = lstaction.data.seat + 1; i < lstaction.data.seat + playercnt; i++) {
                const seat = i % playercnt;
                if (seat === lstaction.data.seat || hupaied[seat])
                    continue;
                if (lstaction.name === "RecordDiscardTile" || lstaction.name === "RecordRevealTile" || (lstaction.name === "RecordLockTile" && lstaction.data.lock_state === 0))
                    playertiles[seat].push(lstaction.data.tile);
                else if (lstaction.name === "RecordAnGangAddGang")
                    playertiles[seat].push(lstaction.data.tiles);
                else if (lstaction.name === "RecordBaBei")
                    playertiles[seat].push(lstaction.data.tile);
                if ((is_chuanma() || is_guobiao() || !is_chuanma() && !is_guobiao() && !zhenting[seat]) && calchupai(playertiles[seat]) !== 0) {
                    if (!is_chuanma() && !is_guobiao() && !ronghuzhahu()) { // 非川麻国标防止自动无役荣和诈和
                        let points = calcfan(playertiles[seat], seat, false, lstaction.data.seat);
                        if (calcsudian(points) !== -2000)
                            x.push(seat);
                    } else
                        x.push(seat);
                    if (!is_chuanma() && (is_toutiao() || is_mingjing() || is_guobiao())) {
                        playertiles[seat].length = playertiles[seat].length - 1;
                        break;
                    }
                }
                playertiles[seat].length = playertiles[seat].length - 1;
            }
        }
        if (x.length === 0) { // 没给参数 seat 的情况下, 无人能正常和牌
            console.warn("chang: " + chang + ", ju: " + ju + ", ben: " + ben + ", hupai 没给 seat 参数无人能正常和牌");
            return;
        }
    }
    // 血流成河模式中, 和牌家prezhenting消失
    for (let i = 0; i < x.length; i++) {
        pretongxunzhenting[x[i]] = tongxunzhenting[x[i]] = false;
        prelizhizhenting[x[i]] = lizhizhenting[x[i]] = false;
    }
    updatezhenting();

    if ((is_toutiao() || is_mingjing() || is_guobiao()) && x.length >= 2) // 有头跳且参数给了至少两家和牌的情况, 则取头跳家
        x = [x[0]];

    if (!is_xuezhandaodi() && !is_wanxiangxiuluo() && !is_chuanma() && !is_xueliu()) {
        if (!is_guobiao()) {
            let ret = [], baopait = 0;
            for (let i = 0; i < x.length; i++)
                ret.push(hupaioneplayer(x[i]));
            for (let i = 0; i < x.length; i++)
                hupaied[x[i]] = true;
            // "包"字的选择
            // 包牌比包杠优先, 因为雀魂目前没有包杠, 以雀魂为主
            if (baogangseat !== -1)
                baopait = baogangseat + 1
            baogangseat = -1;
            // 多家包牌, 自摸情况下以最先包牌的玩家为准
            // 荣和情况下, 以距放铳玩家最近的玩家的最先包牌的玩家为准
            for (let i = 0; i < x.length; i++)
                if (baopai[x[i]].length !== 0) {
                    baopait = baopai[x[i]][0].seat + 1;
                    break;
                }
            let old_scores = scores.slice();
            for (let i = 0; i < playercnt; i++)
                scores[i] = scores[i] + delta_scores[i];
            endHule(ret, old_scores.slice(), delta_scores.slice(), scores.slice(), baopait);
            delta_scores = [0, 0, 0, 0];
            if (hupaied[ju]) { // 庄家和牌, 则连庄
                ben++;
                // 幻境传说: 庄家卡2
                if (get_field_spell_mode1() === 2)
                    ben += 4;
                lianzhuangcnt++;
            } else {
                ju++;
                ben = 0;
                lianzhuangcnt = 0;
            }
        } else { // 国标模式
            let ret = [];
            ret.push(hupai_guobiao(x[0]));
            hupaied[x[0]] = true;
            let old_scores = scores.slice();
            for (let i = 0; i < playercnt; i++)
                scores[i] = scores[i] + delta_scores[i];
            endHule(ret, old_scores.slice(), delta_scores.slice(), scores.slice(), 0);
            delta_scores = [0, 0, 0, 0];
            // 国标正常情况下不连庄, 除了设置了 'guobiao_lianzhuang'
            if (hupaied[ju] && is_guobiao_lianzhuang())
                ben++;
            else {
                ju++;
                ben = 0;
            }
        }
        roundend();
    } else if ((is_xuezhandaodi() || is_wanxiangxiuluo() || is_chuanma() || is_xueliu()) && !type) {
        let ret = [];
        for (let i = 0; i < x.length; i++) {
            let whatever;
            if (!is_chuanma())
                whatever = hupaioneplayer(x[i]);
            else
                whatever = hupaioneplayer_chuanma(x[i]);
            ret.push(whatever);
            inserthules_history(whatever);
        }
        if (is_chuanma() && juc === -1)
            juc = x[0];
        if (!is_xueliu()) for (let i = 0; i < x.length; i++)
            hupaied[x[i]] = true;
        let old_scores = scores.slice();
        for (let i = 0; i < playercnt; i++)
            scores[i] = scores[i] + delta_scores[i];

        let liqi = null;
        if (lstliqi != null) {
            if (scores[lstliqi.seat] >= 1000 * liqi_need)
                liqi = {
                    'seat': lstliqi.seat,
                    'score': scores[lstliqi.seat] - 1000 * liqi_need,
                    'liqibang': liqibang + liqi_need
                };
            else
                liqi = {
                    'seat': lstliqi.seat,
                    'score': scores[lstliqi.seat],
                    'liqibang': liqibang,
                    'failed': true
                };
        }

        if (!is_xueliu())
            addHuleXueZhanMid(ret, old_scores.slice(), delta_scores.slice(), scores.slice(), liqi);
        else
            addHuleXueLiu(ret, old_scores.slice(), delta_scores.slice(), scores.slice());

        if (lstliqi != null && scores[lstliqi.seat] >= 1000 * liqi_need) {
            liqibang += liqi_need;
            scores[lstliqi.seat] -= 1000 * liqi_need;
            liqiinfo[lstliqi.seat] = {'liqi': lstliqi.type, 'yifa': 0, 'kai': lstliqi.kai};
        }
        lstliqi = null;

        delta_scores = [0, 0, 0, 0];
    } else if ((is_xuezhandaodi() || is_wanxiangxiuluo() || is_chuanma() || is_xueliu()) && type) {
        let ret = [];
        for (let i = 0; i < x.length; i++) {
            let whatever;
            if (!is_chuanma())
                whatever = hupaioneplayer(x[i]);
            else
                whatever = hupaioneplayer_chuanma(x[i]);
            ret.push(whatever);
            inserthules_history(whatever);
        }
        if (is_chuanma() && juc === -1)
            juc = x[0];
        if (!is_xueliu()) for (let i = 0; i < x.length; i++)
            hupaied[x[i]] = true;
        let old_scores = scores.slice();
        for (let i = 0; i < playercnt; i++)
            scores[i] = scores[i] + delta_scores[i];
        if (!is_xueliu())
            addHuleXueZhanEnd(ret, old_scores.slice(), delta_scores.slice(), scores.slice(), hules_history);
        else
            addHuleXueLiuEnd(ret, old_scores.slice(), delta_scores.slice(), scores.slice(), hules_history);
        delta_scores = [0, 0, 0, 0];
        if (!is_chuanma())
            ju++;
        roundend();
    }
    if (is_chuanma() && !hupaied[0] && !hupaied[1] && !hupaied[2] && !hupaied[3])
        ju = x[0];
    saveproject();
}

function addChangeTile(change_tile_infos, change_type, doras) {
    for (let seat = 0; seat < playercnt; seat++) {
        for (let j = 0; j < 3; j++) {
            for (let i = 0; i < playertiles[seat].length; i++) {
                if (playertiles[seat][i] === change_tile_infos[seat].out_tiles[j]) {
                    playertiles[seat][i] = playertiles[seat][playertiles[seat].length - 1];
                    playertiles[seat].length--;
                    break;
                }
            }
        }
        for (let j = 0; j < 3; j++)
            playertiles[seat].push(change_tile_infos[seat].in_tiles[j]);
    }
    let ret = {
        'name': "RecordChangeTile",
        'data': {
            'change_tile_infos': change_tile_infos,
            'change_type': change_type,
            'doras': doras
        }
    };
    let lastile = playertiles[ju][playertiles[ju].length - 1];
    playertiles[ju].length--;
    let tingpais = [];
    for (let i = 0; i < playercnt; i++) {
        let tingpaitmp = calctingpai(i);
        if (tingpaitmp.length !== 0)
            tingpais.push({'seat': i, 'tingpais1': tingpaitmp});
    }
    if (tingpais.length !== 0)
        ret.data.tingpai = tingpais;
    playertiles[ju].push(lastile);
    if (is_chuanma())
        ret.data.operations = [{
            'operation_list': [{
                'gap_type': 0,
                'type': 13
            }],
            'seat': 0
        }, {
            'operation_list': [{
                'gap_type': 0,
                'type': 13
            }],
            'seat': 1
        }, {
            'operation_list': [{
                'gap_type': 0,
                'type': 13
            }],
            'seat': 2
        }, {
            'operation_list': [{
                'gap_type': 0,
                'type': 13
            }],
            'seat': 3
        }];
    actions.push(ret);
    edit_online();
}

// 0: 逆时针  1: 对家   2: 顺时针
function huansanzhang(tiles0, tiles1, tiles2, tiles3, type) {
    if (typeof (tiles0) == "string")
        tiles0 = separatetile(tiles0);
    if (typeof (tiles1) == "string")
        tiles1 = separatetile(tiles1);
    if (typeof (tiles2) == "string")
        tiles2 = separatetile(tiles2);
    if (typeof (tiles3) == "string")
        tiles3 = separatetile(tiles3);

    let ret = [];
    let tiles = [tiles0, tiles1, tiles2, tiles3];
    for (let seat = 0; seat < playercnt; seat++)
        ret.push({
            'out_tiles': tiles[seat],
            'in_tile_states': [0, 0, 0],
            'in_tiles': tiles[(seat - type - 1 + playercnt * 2) % playercnt],
            'out_tile_states': [0, 0, 0],
        });

    addChangeTile(ret, type, calcdoras());
    for (let i = 0; i < playercnt; i++)
        playertiles[i].sort(cmp);
    saveproject();
}

function addSelectGap(gap_types) {
    let ret = {
        'name': "RecordSelectGap",
        'data': {
            'gap_types': gap_types,
        }
    };
    let tingpais = [];
    for (let i = 0; i < playercnt; i++) {
        let tingpaitmp = calctingpai(i);
        if (tingpaitmp.length !== 0)
            tingpais.push({'seat': i, 'tingpais1': tingpaitmp});
    }
    if (tingpais.length !== 0)
        ret.data.tingpai = tingpais;
    actions.push(ret);
    edit_online();
}

// 注意 gaps 的 012 分别对应 pms, 而不是 mps
function dingque(x) {
    if (typeof (x) == "number")
        x = x.toString();
    if (typeof (x) == "string")
        x = x.split('');
    let ret = [];
    for (let i = 0; i < x.length; i++) {
        if (x[i] === "m" || x[i] === "1")
            ret.push(1);
        if (x[i] === "p" || x[i] === "0")
            ret.push(0);
        if (x[i] === "s" || x[i] === "2")
            ret.push(2);
    }
    gaps = ret;
    addSelectGap(ret);
    saveproject();
}

function addGangResult(gang_infos) {
    actions.push({
        'name': "RecordGangResult",
        'data': {
            'gang_infos': gang_infos,
        }
    });
    edit_online();
}

function addGangResultEnd(gang_infos) {
    actions.push({
        'name': "RecordGangResultEnd",
        'data': {
            'gang_infos': gang_infos,
        }
    });
    edit_online();
}

function calcgangpoint(type) {
    let ret = {
        'delta_scores': [],
        'old_scores': scores.slice(),
        'scores': []
    }
    if (chuanmagangs.notover.length === 0)
        return;
    for (let i = chuanmagangs.notover.length - 1; i >= 0; i--) {
        chuanmagangs.over.push(chuanmagangs.notover[i]);
        delta_scores[chuanmagangs.notover[i].from] -= chuanmagangs.notover[i].val;
        delta_scores[chuanmagangs.notover[i].to] += chuanmagangs.notover[i].val;
        chuanmagangs.notover.length--;
    }
    ret.delta_scores = delta_scores.slice();
    for (let i = 0; i < playercnt; i++) {
        scores[i] = scores[i] + delta_scores[i];
        delta_scores[i] = 0;
    }
    ret.scores = scores.slice();
    if (!type)
        addGangResult(ret);
    else {
        ret.hules_history = hules_history;
        addGangResultEnd(ret);
    }
    saveproject();
}

function endNoTile(liujumanguan, players, scores) {
    let ret = {
        'name': "RecordNoTile",
        'data': {
            'gameend': false,
            'liujumanguan': liujumanguan,
            'players': players,
            'scores': scores
        }
    };
    if (hules_history.length !== 0)
        ret.data.hules_history = hules_history;
    actions.push(ret);
    edit_online();
}

function unveil(seat) {
    if (getlstaction().name === "RecordRevealTile") {
        scores[seat] -= 2000;
        liqibang += 2;
        let seat_tile = getlstaction().data.seat;
        let tile = getlstaction().data.tile;
        if (typeof (seat) !== "number") {
            console.error("unveil: 暗夜之战开牌必须指定玩家");
            return;
        }
        addUnveilTile(seat, seat_tile);
        addLockTile(seat_tile, 0, tile);
        if (tile !== 1 && tile !== 9 && tile !== 10 && tile !== 18 && tile !== 19 && tile !== 27 && tile <= 27)
            paihe[seat].liujumanguan = false;
        saveproject();
    } else
        console.error("unveil: 暗夜之战开牌的前提是有人刚暗牌");
}

function unveil_lock(seat) {
    if (typeof (seat) !== "number") {
        console.error("unveil: 暗夜之战开牌必须指定玩家");
        return;
    }
    if (getlstaction().name === "RecordRevealTile") {
        scores[seat] -= 2000;
        liqibang += 2;
        let seat_tile = getlstaction().data.seat;
        addUnveilTile(seat, seat_tile);
        scores[seat_tile] -= 4000;
        liqibang += 4;
        addLockTile(seat_tile, 1);
        saveproject();
    } else
        console.error("unveil_lock: 暗夜之战开牌的前提是有人刚暗牌");
}

function mopai(seat, index) {
    if (typeof (seat) == "object") {
        index = seat;
        seat = undefined;
    }
    let lstaction = getlstaction();

    // 暗夜之战暗牌无人开
    if (is_anye() && lstaction.name === "RecordRevealTile")
        addLockTile(lstaction.data.seat, 2);

    if (is_chuanma())
        calcgangpoint();
    let liqi = null;
    let drawcard;
    if (lstliqi != null) {
        let need_bangzi = liqi_need;
        if (is_beishuizhizhan() && lstliqi != null && lstliqi.beishui_type !== undefined) {
            if (lstliqi.beishui_type === 1)
                need_bangzi = 5;
            else if (lstliqi.beishui_type === 2)
                need_bangzi = 10;
        }
        if (scores[lstliqi.seat] >= need_bangzi * 1000) {
            liqibang += need_bangzi;
            scores[lstliqi.seat] -= need_bangzi * 1000;
            liqiinfo[lstliqi.seat] = {'liqi': lstliqi.type, 'yifa': 1, 'kai': lstliqi.kai};
            // 幻境传说: 机会卡2
            if (get_field_spell_mode2() === 2)
                liqiinfo[lstliqi.seat].yifa = 3;
            liqi = {
                'liqibang': liqibang,
                'score': scores[lstliqi.seat],
                'seat': lstliqi.seat
            };
            if (is_beishuizhizhan())
                liqi.liqi_type_beishuizhizhan = liqiinfo[lstliqi.seat].beishui_type = lstliqi.beishui_type;
        } else
            liqi = {
                'liqibang': liqibang,
                'score': scores[lstliqi.seat],
                'seat': lstliqi.seat,
                'failed': true
            };
    }
    lstliqi = null;
    lstaction = getlstaction();
    if (seat === undefined) {
        if (lstaction.name === "RecordChiPengGang" || lstaction.name === "RecordBaBei" || lstaction.name === "RecordAnGangAddGang")
            seat = lstaction.data.seat;
        if (lstaction.name === "RecordDiscardTile" || lstaction.name === "RecordLockTile") {
            if (is_hunzhiyiji() && hunzhiyiji_info[lstaction.data.seat].yifa)
                seat = lstaction.data.seat;
            else
                seat = (lstaction.data.seat + 1) % playercnt;
        }

        let lst2action = getlstaction(2);
        if (lstaction.name === "RecordHuleXueZhanMid") {
            // 血战到底模式枪杠, 摸牌家为放铳家的下一家
            if (lst2action.name === "RecordAnGangAddGang")
                seat = (lst2action.data.seat + 1) % playercnt;
            else
                seat = (lstaction.data.hules[lstaction.data.hules.length - 1].seat + 1) % playercnt;
        }
        // 血流成河下, 摸牌家为自摸或放铳家的下一家
        if (lstaction.name === "RecordHuleXueLiu") {
            if (lst2action.name === "RecordNewRound" || lst2action.name === "RecordChangeTile" || lst2action.name === "RecordSelectGap")
                seat = (lstaction.data.hules[lstaction.data.hules.length - 1].seat + 1) % playercnt;
            else
                seat = (lst2action.data.seat + 1) % playercnt;
        }

        while (hupaied[seat])
            seat = (seat + 1) % playercnt;
    }
    if (isNaN(seat))
        console.error("mopai: 无法判断谁摸牌, lstaction.name: " + lstaction.name);

    if (is_zhanxing()) {
        if (typeof (index) == "undefined")
            index = 0;
        else if (typeof (index) == "object")
            index = index[0];
        if (drawtype === 0)
            awaiting_tiles.push(pop_lastile());
        while (awaiting_tiles.length < 3 && paishan_len() > 14)
            awaiting_tiles.push(pop_firstile());

        addFillAwaitingTiles(calcdoras(), seat, awaiting_tiles, paishan_len() - 14 + awaiting_tiles.length, liqi);
    }

    // pass掉上个操作的牌的, pre同巡振听和pre立直振听 转 真实振听
    for (let i = 0; i < playercnt; i++) {
        if (pretongxunzhenting[i])
            tongxunzhenting[i] = true;
        if (prelizhizhenting[i])
            lizhizhenting[i] = true;
    }
    // 摸牌解除同巡振听
    pretongxunzhenting[seat] = tongxunzhenting[seat] = false;
    updatezhenting();

    if (is_hunzhiyiji() && hunzhiyiji_info[seat].yifa)
        hunzhiyiji_info[seat].cnt--;
    if (is_hunzhiyiji() && !hunzhiyiji_info[lstaction.data.seat].yifa)
        hunzhiyiji_info[seat].overload = true;

    if (doracnt.lastype === 2) {
        doracnt.cnt += 1 + doracnt.bonus;
        doracnt.licnt += 1 + doracnt.bonus;
        doracnt.bonus = doracnt.lastype = 0;
    }
    for (let i = 0; i < playercnt; i++)
        if (liqiinfo[i].yifa === -1)
            liqiinfo[i].yifa = 0;

    let tile_state;
    if (is_openhand() || liqiinfo[seat].kai)
        tile_state = 1;
    let tmp_paishan_len = paishan_len();
    if (is_zhanxing())
        tmp_paishan_len += awaiting_tiles.length;
    if (is_zhanxing()) {
        drawcard = pop_awaiting_tiles(index);
        addDealTile(calcdoras(), tmp_paishan_len - 15, seat, drawcard, liqi, tile_state, index);
        lstdrawtype = drawtype;
    } else if (drawtype === 1) {
        if (playercnt === 2)
            addDealTile(calcdoras(), tmp_paishan_len - 19, seat, firstn_tile(1), liqi, tile_state, index);
        else if (!is_chuanma() && !is_guobiao())
            addDealTile(calcdoras(), tmp_paishan_len - 15, seat, firstn_tile(1), liqi, tile_state, index);
        else
            addDealTile(calcdoras(), tmp_paishan_len - 1, seat, firstn_tile(1), liqi, tile_state, index);
        drawcard = pop_firstile();
        lstdrawtype = 1;
    } else {
        if (playercnt === 2)
            addDealTile(calcdoras(), tmp_paishan_len - 19, seat, lastn_tile(1), liqi, tile_state, index);
        else if (!is_guobiao())
            addDealTile(calcdoras(), tmp_paishan_len - 15, seat, lastn_tile(1), liqi, tile_state, index);
        else
            addDealTile(calcdoras(), tmp_paishan_len - 1, seat, lastn_tile(1), liqi, tile_state, index);
        drawcard = pop_lastile();
        lstdrawtype = 0;
    }
    drawtype = 1;
    saveproject();
    return drawcard;

    function pop_awaiting_tiles(index) {
        let tile = awaiting_tiles[index];
        for (let i = index; i < 2; i++)
            awaiting_tiles[i] = awaiting_tiles[i + 1];
        awaiting_tiles.length--;
        return tile;
    }
}

function qiepai(seat, kind, is_liqi, anpai, beishui_type) {
    function preprocess() {
        let obj = {};
        let mat = [seat, kind, is_liqi, anpai, beishui_type];
        for (let i = 0; i < mat.length; i++) {
            if (mat[i] === "anpai")
                obj.anpai = mat[i];
            else if (typeof (mat[i]) === "number")
                obj.seat = mat[i];
            else if (typeof (mat[i]) === "boolean" || mat[i] === "kailiqi")
                obj.is_liqi = mat[i];
            else if (typeof (mat[i]) === "object")
                obj.beishui_type = mat[i];
            else if (mat[i] !== undefined)
                obj.kind = mat[i];
        }
        return [obj.seat, obj.kind, obj.is_liqi, obj.anpai, obj.beishui_type];
    }

    baogangseat = -1;
    [seat, kind, is_liqi, anpai, beishui_type] = preprocess()

    if (seat === undefined) {
        let lstaction = getlstaction();
        if (lstaction.name === "RecordNewRound" || lstaction.name === "RecordChangeTile" || lstaction.name === "RecordSelectGap")
            seat = ju;
        else
            seat = lstaction.data.seat;
    }
    if (kind === undefined) {
        if (discardtiles[seat].length !== 0) {
            kind = pop_discardtiles(seat);
            if (kind === "..")
                kind = "moqie";
        } else
            kind = "moqie";
    }
    if (is_liqi === undefined)
        is_liqi = false;
    if (anpai === undefined)
        anpai = false;
    if (beishui_type === undefined)
        beishui_type = 0;
    else
        beishui_type = beishui_type[0];

    let is_wliqi = false, is_kailiqi = false;
    if (!!is_liqi && liqiinfo[seat].yifa !== 0 && liqiinfo[seat].liqi === 0)
        is_wliqi = true;

    if (is_liqi === "kailiqi") {
        is_liqi = true;
        is_kailiqi = true;
    } else if (is_liqi)
        is_liqi = true;

    if (is_wliqi)
        lstliqi = {'seat': seat, 'type': 2, 'kai': 0};
    else if (is_liqi)
        lstliqi = {'seat': seat, 'type': 1, 'kai': 0};
    if (is_kailiqi)
        lstliqi.kai = 1;
    if (is_beishuizhizhan() && is_liqi)
        lstliqi.beishui_type = beishui_type;
    if (doracnt.lastype === 1) {
        doracnt.cnt += 1 + doracnt.bonus;
        doracnt.licnt += 1 + doracnt.bonus;
        doracnt.bonus = doracnt.lastype = 0;
    }
    // flag: 0 表示 kind === "moqie" 而摸切, 1 表示手切, 2 表示 kind 正好等于摸的牌而摸切
    let flag = 0, tile;
    if (kind === "moqie")
        flag = 2;
    else if (typeof (kind) == "string")
        kind = [kind];

    function swap(x) {
        playertiles[seat][x] = playertiles[seat][playertiles[seat].length - 1];
        playertiles[seat][playertiles[seat].length - 1] = tile;
        if (x === playertiles[seat].length - 1)
            flag = 2;
        else
            flag = 1;
    }

    function intiles(x, tile) {
        if (x === "moqie")
            return true;
        let cnt = [];
        for (let i = 1; i <= nxt2.length; i++)
            cnt[i] = 0;
        for (let i = 0; i < x.length; i++)
            cnt[tiletoint(x[i], true)]++;
        return cnt[tiletoint(tile, true)] >= 1;
    }

    // 暗夜之战相关
    if (is_anye() && anpai === "anpai") {
        scores[seat] -= 1000;
        liqibang++;
    }

    // 幻境传说: 命运卡3
    if (get_field_spell_mode3() === 3)
        if (liqiinfo[seat].liqi !== 0)
            spell_triple[seat]++;

    // 咏唱之战相关
    if (is_yongchang()) {
        if (kind === "moqie")
            shoumoqie[seat].push(false);
        else
            shoumoqie[seat].push(true);
        let moqiemaxlen = longest_length(shoumoqie[seat], false);
        let shouqiemaxlen = longest_length(shoumoqie[seat], true);
        shoumoqiemaxlen[seat] = [moqiemaxlen, shouqiemaxlen];
    }

    // 魂之一击相关
    if (is_hunzhiyiji() && lstliqi != null)
        hunzhiyiji_info[seat] = {
            "liqi": lstliqi.type,
            "yifa": true,
            "cnt": 6,
            "overload": false,
            "is_push": false
        };
    if (is_hunzhiyiji() && hunzhiyiji_info[seat].cnt <= 0)
        hunzhiyiji_info[seat].yifa = false;

    for (let i = playertiles[seat].length - 1; i >= 0; i--) {
        tile = playertiles[seat][i];
        if (intiles(kind, tile)) {
            swap(i);
            break;
        }
        if (i === 0 && kind !== "moqie") { // 要切的牌不在手牌中, 则报错
            console.error("chang: " + chang + ", ju: " + ju + ", ben: " + ben + ", seat: " + seat + " 手牌不存在要切的牌: " + kind);
            return false;
        }
    }

    let lstactionname = getlstaction().name;
    let tile_state;
    if (is_openhand())
        tile_state = 1;
    if (flag === 0 && kind[0] >= '0' && kind[0] <= '9') {
        if (is_peipaimingpai())
            tile_state = erasemingpai(kind, seat);
        let abc = tiletoint(kind);
        paihe[seat].tiles.push(kind);
        if (!(is_anye() && anpai === "anpai"))
            if (abc !== 1 && abc !== 9 && abc !== 10 && abc !== 18 && abc !== 19 && abc !== 27 && abc <= 27)
                paihe[seat].liujumanguan = false;
        if (liqiinfo[seat].yifa > 0)
            liqiinfo[seat].yifa--;
        if (is_anye() && anpai === "anpai") {
            if (playertiles[seat][playertiles[seat].length - 1] === kind && lstactionname !== "RecordNewRound" && lstactionname !== "RecordChiPengGang")
                addRevealTile(is_liqi, is_wliqi, true, seat, kind);
            else
                addRevealTile(is_liqi, is_wliqi, false, seat, kind);
        } else {
            if (playertiles[seat][playertiles[seat].length - 1] === kind && lstactionname !== "RecordNewRound" && lstactionname !== "RecordChiPengGang")
                addDiscardTile(is_liqi, is_wliqi, calcdoras(), true, seat, kind, calctingpai(seat), tile_state, is_kailiqi, beishui_type);
            else
                addDiscardTile(is_liqi, is_wliqi, calcdoras(), false, seat, kind, calctingpai(seat), tile_state, is_kailiqi, beishui_type);

            let tile = kind;

            updatepreshezhang(seat);
            updateprezhenting_2(seat, tile);
        }
        saveproject();
        return true;
    }
    if (flag === 1 || lstactionname === "RecordNewRound" || lstactionname === "RecordChiPengGang") {
        let tile = playertiles[seat][playertiles[seat].length - 1];
        if (is_peipaimingpai())
            tile_state = erasemingpai(tile, seat);
        paihe[seat].tiles.push(tile);
        let abc = tiletoint(tile);
        if (!(is_anye() && anpai === "anpai"))
            if (abc !== 1 && abc !== 9 && abc !== 10 && abc !== 18 && abc !== 19 && abc !== 27 && abc <= 27)
                paihe[seat].liujumanguan = false;
        if (liqiinfo[seat].yifa > 0)
            liqiinfo[seat].yifa--;
        if (is_anye() && anpai === "anpai")
            addRevealTile(is_liqi, is_wliqi, false, seat, tile);
        else {
            addDiscardTile(is_liqi, is_wliqi, calcdoras(), false, seat, tile, calctingpai(seat), tile_state, is_kailiqi, beishui_type);

            updatepreshezhang(seat);
            updateprezhenting_2(seat, tile);
        }
        saveproject();
        return true;
    } else if (flag === 2 && lstactionname !== "RecordNewRound" && lstactionname !== "RecordChiPengGang") {
        let tile = playertiles[seat][playertiles[seat].length - 1];
        if (is_peipaimingpai())
            tile_state = erasemingpai(tile, seat);
        paihe[seat].tiles.push(tile);
        let abc = tiletoint(tile);
        if (!(is_anye() && anpai === "anpai"))
            if (abc !== 1 && abc !== 9 && abc !== 10 && abc !== 18 && abc !== 19 && abc !== 27 && abc <= 27)
                paihe[seat].liujumanguan = false;
        if (liqiinfo[seat].yifa > 0)
            liqiinfo[seat].yifa--;
        if (is_anye() && anpai === "anpai")
            addRevealTile(is_liqi, is_wliqi, true, seat, tile);
        else {
            addDiscardTile(is_liqi, is_wliqi, calcdoras(), true, seat, tile, calctingpai(seat), tile_state, is_kailiqi, beishui_type);

            updatepreshezhang(seat);
            updateprezhenting_2(seat, tile);
        }
        saveproject();
        return true;
    } else
        return false;
}

function mingpai(seat, tiles) {
    function intiles(x, y) {
        let cnt = [], cnt2 = [];
        for (let i = 1; i <= nxt2.length + OFFSET; i++)
            cnt[i] = cnt2[i] = 0;
        for (let i = 0; i < x.length; i++)
            cnt[tiletoint(x[i], true, true)]++;
        for (let i = 0; i < y.length; i++)
            cnt2[tiletoint(y[i], true, true)]++;
        for (let i = 1; i <= nxt2.length + OFFSET; i++)
            if (cnt[i] > cnt2[i])
                return false;
        return true;
    }

    function trying(x, seat) {
        let x0 = allequaltile(x[0]), x1 = allequaltile(x[1]), x2 = [];
        if (x.length === 3) // 明杠
            x2 = allequaltile(x[2]);
        for (let i = 0; i < x0.length; i++)
            for (let j = 0; j < x1.length; j++) {
                let try_tiles = [x0[i], x1[j]];
                if (x.length === 3) // 明杠
                    for (let k = 0; k < x2.length; k++) {
                        try_tiles[2] = x2[k];
                        if (trymingpai(try_tiles))
                            return true;
                    }
                else if (trymingpai(try_tiles))
                    return true;
            }
        return false;

        function trymingpai(try_tiles){
            for (let seat2 = 0; seat2 < playercnt; seat2++)
                if ((seat === seat2 || seat === undefined) && intiles(try_tiles, playertiles[seat2])) {
                    mingpai(seat2, try_tiles.slice());
                    return true;
                }
            return false;
        }
    }

    if (typeof (seat) != "number") {
        tiles = seat;
        seat = undefined;
    }
    if (typeof (tiles) == "string")
        tiles = separatetile(tiles);

    if (seat === undefined) {
        if (tiles !== undefined && !equaltile(tiles[0], getlstaction().data.tile))
            seat = (getlstaction().data.seat + 1) % playercnt;
        else if (tiles !== undefined) {
            for (let seat2 = 0; seat2 < playercnt; seat2++) {
                if (seat2 === getlstaction().data.seat)
                    continue;
                let cnt = [];
                for (let i = 0; i < nxt2.length; i++)
                    cnt[i] = 0;
                for (let i = 0; i < playertiles[seat2].length; i++)
                    cnt[tiletoint(playertiles[seat2][i])]++;
                if (tiles.length === 3 && cnt[tiletoint(tiles[0])] >= 3)
                    seat = seat2;
                if (tiles.length === 2 && cnt[tiletoint(tiles[0])] >= 2)
                    seat = seat2;
            }
        }
    }

    if (tiles === undefined) {
        let lastile = getlstaction().data.tile;
        lastile = inttotile(tiletoint(lastile));
        // 明杠
        if (trying([lastile, lastile, lastile], seat))
            return;
        // 碰
        if (trying([lastile, lastile], seat))
            return;
        // 吃
        seat = (getlstaction().data.seat + 1) % playercnt;
        if (lastile[1] !== 'z' && lastile[0] !== '1' && lastile[0] !== '2') // 吃上端
            if (trying([inttotile(tiletoint(lastile) - 2), inttotile(tiletoint(lastile) - 1)], seat))
                return;
        if (lastile[1] !== 'z' && lastile[0] !== '1' && lastile[0] !== '9') // 吃中间
            if (trying([inttotile(tiletoint(lastile) - 1), inttotile(tiletoint(lastile) + 1)], seat))
                return;
        if (lastile[1] !== 'z' && lastile[0] !== '8' && lastile[0] !== '9') // 吃下端
            if (trying([inttotile(tiletoint(lastile) + 1), inttotile(tiletoint(lastile) + 2)], seat))
                return;

        console.warn("chang: " + chang + ", ju: " + ju + ", ben: " + ben + ", xun: " + xun[seat].length + ": 没有玩家能 mingpai()");
        return;
    }

    // pass掉上个操作的牌的, pre同巡振听和pre立直振听 转 真实振听
    for (let i = 0; i < playercnt; i++) {
        if (pretongxunzhenting[i])
            tongxunzhenting[i] = true;
        if (prelizhizhenting[i])
            lizhizhenting[i] = true;
    }
    // 自家鸣牌解除同巡振听
    pretongxunzhenting[seat] = tongxunzhenting[seat] = false;
    updatezhenting();

    let lstaction = getlstaction();
    paihe[lstaction.data.seat].liujumanguan = false;
    let from = getlstaction().data.seat, lastile = getlstaction().data.tile;

    // 魂之一击模式
    if (is_hunzhiyiji() && hunzhiyiji_info[from].liqi) {
        hunzhiyiji_info.yifa = false;
        hunzhiyiji_info.overload = true;
    }
    // 咏唱之战模式
    if (is_yongchang()) {
        shoumoqie[from].length--;
        let moqiemaxlen = longest_length(shoumoqie[from], false);
        let shouqiemaxlen = longest_length(shoumoqie[from], true);
        shoumoqiemaxlen[from] = [moqiemaxlen, shouqiemaxlen];
    }

    let liqi = null;
    let need_bangzi = liqi_need;
    if (is_beishuizhizhan() && lstliqi != null && lstliqi.beishui_type !== undefined) {
        if (lstliqi.beishui_type === 1)
            need_bangzi = 5;
        else if (lstliqi.beishui_type === 2)
            need_bangzi = 10;
    }
    if (lstliqi != null && scores[lstliqi.seat] >= need_bangzi * 1000) {
        liqibang += need_bangzi;
        scores[lstliqi.seat] -= need_bangzi * 1000;
        liqiinfo[lstliqi.seat] = {'liqi': lstliqi.type, 'yifa': 1, 'kai': lstliqi.kai};
        // 幻境传说: 机会卡2
        if (get_field_spell_mode2() === 2)
            liqiinfo[lstliqi.seat].yifa = 3;

        liqi = {
            'liqibang': liqibang,
            'score': scores[lstliqi.seat],
            'seat': lstliqi.seat
        };
        if (is_beishuizhizhan())
            liqi.liqi_type_beishuizhizhan = liqiinfo[lstliqi.seat].beishui_type = lstliqi.beishui_type;
    }
    for (let i = 0; i < playercnt; i++)
        liqiinfo[i].yifa = 0;
    lstliqi = null;

    let tile_states = [];
    if (is_peipaimingpai())
        for (let i = 0; i < tiles.length; i++)
            tile_states.push(erasemingpai(tiles[i], seat));
    if (!equaltile(tiles[0], lastile)) { // 吃
        fulu[seat].push({'type': 0, 'tile': [tiles[0], tiles[1], lastile], 'from': from});
        addChiPengGang([seat, seat, from], seat, [tiles[0], tiles[1], lastile], 0, liqi, tile_states);
        // 幻境传说: 命运卡4
        if (get_field_spell_mode3() === 4) {
            scores[seat] -= 500;
            scores[from] += 500;
        }
        if (get_field_spell_mode3() === 5)
            if (is_dora(lastile)) {
                scores[seat] -= 2000;
                liqibang += 2;
            }
    } else if (tiles.length === 3) { // 大明杠
        // 幻境传说: 庄家卡4
        if (get_field_spell_mode1() === 4 && seat === ju)
            doracnt.bonus = 1;
        doracnt.lastype = is_dora_jifan() ? 2 : 1;
        if (!is_chuanma()) {
            if (!is_guobiao()) {
                if (!sigangbao[seat]) { // 查是否四杠子确定, 用于包牌
                    let gang_num = 0;
                    for (let j = 0; j < fulu[seat].length; j++)
                        if (fulu[seat][j].type === 2 || fulu[seat][j].type === 3) // 查杠子个数
                            gang_num++;

                    if (gang_num === 3) // 之前已经有3个杠子, 则第4个杠构成四杠子包牌
                        sigangbao[seat] = true;
                }
                if (is_baogang())
                    baogangseat = from;
            }
            drawtype = 0;
        } else
            chuanmagangs.notover.push({'from': from, 'to': seat, 'val': 2000});
        fulu[seat].push({'type': 2, 'tile': [tiles[0], tiles[1], tiles[2], lastile], 'from': from});
        addChiPengGang([seat, seat, seat, from], seat, [tiles[0], tiles[1], tiles[2], lastile], 2, liqi, tile_states);
        // 幻境传说: 命运卡4
        if (get_field_spell_mode3() === 4) {
            scores[seat] -= 500;
            scores[from] += 500;
        }
        if (get_field_spell_mode3() === 5)
            if (is_dora(lastile)) {
                scores[seat] -= 2000;
                liqibang += 2;
            }
    } else { // 碰
        // 幻境传说: 庄家卡4
        if (get_field_spell_mode1() === 4 && seat === ju)
            doracnt.lastype = is_dora_jifan() ? 2 : 1;
        fulu[seat].push({'type': 1, 'tile': [tiles[0], tiles[1], lastile], 'from': from});
        addChiPengGang([seat, seat, from], seat, [tiles[0], tiles[1], lastile], 1, liqi, tile_states);
        // 幻境传说: 命运卡4
        if (get_field_spell_mode3() === 4) {
            scores[seat] -= 500;
            scores[from] += 500;
        }
        if (get_field_spell_mode3() === 5)
            if (is_dora(lastile)) {
                scores[seat] -= 2000;
                liqibang += 2;
            }
    }
    playertiles[seat].sort(cmp);
    saveproject();
}

// first 表示是否为第一次调用, 用于调试
function leimingpai(seat, tile, type, first) {
    if (first === undefined)
        first = true;

    function preprocess() {
        let obj = {};
        let mat = [seat, tile, type];
        for (let i = 0; i < mat.length; i++) {
            if (mat[i] === "babei" || mat[i] === "angang" || mat[i] === "jiagang" || mat[i] === "baxi")
                obj.type = mat[i];
            else if (typeof (mat[i]) === "number")
                obj.seat = mat[i];
            else if (mat[i] !== undefined)
                obj.tile = mat[i];
        }
        return [obj.seat, obj.tile, obj.type];
    }

    [seat, tile, type] = preprocess();

    let lstaction = getlstaction();
    if (seat === undefined) {
        if (lstaction.name === "RecordNewRound" || lstaction.name === "RecordChangeTile")
            seat = ju;
        else
            seat = lstaction.data.seat;
    }
    if (seat === undefined) {
        console.error("leimingpai: 无法判断谁 leimingpai, lstaction.name: " + lstaction.name)
        return false;
    }
    if (tile === undefined) {
        // 国标补花
        if (is_guobiao() && leimingpai(seat, huapai, "babei", false))
            return true;
        if ((playercnt === 2 || playercnt === 3))
            if ((leimingpai(seat, "4zt", "babei", false) || leimingpai(seat, "4z", "babei", false)))
                return true;
        if (playercnt === 2)
            if ((leimingpai(seat, "3zt", "babei", false) || leimingpai(seat, "3z", "babei", false)))
                return true;
        for (let i = 1; i <= nxt2.length; i++)
            if (leimingpai(seat, inttotile(i) + tile_suf, "angang", false) || leimingpai(seat, inttotile(i), "angang", false))
                return true;
        for (let i = 1; i <= nxt2.length; i++)
            if (leimingpai(seat, inttotile(i) + tile_suf, "jiagang", false) || leimingpai(seat, inttotile(i), "jiagang", false))
                return true;
        console.warn("chang: " + chang + ", ju: " + ju + ", ben: " + ben + ", seat: " + seat + ", xun: " + xun[seat].length + ": 玩家无法 leimingpai() (没给 tile 情况下)");
        return false;
    }

    function intiles(x, tile) {
        let cnt = [];
        for (let i = 0; i <= nxt2.length + OFFSET; i++)
            cnt[i] = 0;
        for (let i = 0; i < x.length; i++)
            cnt[tiletoint(x[i], true, true)]++;
        return cnt[tiletoint(tile, true, true)] >= 1;
    }

    if (!intiles(playertiles[seat], tile))
        return false;

    if (doracnt.lastype === 1) {
        doracnt.cnt += 1 + doracnt.bonus;
        doracnt.licnt += 1 + doracnt.bonus;
        doracnt.bonus = doracnt.lastype = 0;
    }
    let tile_states = [];
    let tilecnt = 0, jiagangflag = false;
    for (let i = 0; i < playertiles[seat].length; i++)
        if (equaltile(tile, playertiles[seat][i]))
            tilecnt++;

    // 国标补花, 需要载入 add_function.js
    if (is_guobiao() && tile === huapai && type === "babei" && typeof (editfunction) !== "undefined") {
        fulu[seat].push({'type': 4, 'tile': [tile]});
        drawtype = 0;
        addBaBei(calcdoras(), seat, tile, tile_states);
        saveproject();
        return true;
    }

    // 拔北
    if (tilecnt >= 1 && (playercnt === 3 && tile.substring(0, 2) === "4z" || playercnt === 2 && tile.substring(0, 2) === "4z" || playercnt === 2 && tile.substring(0, 2) === "3z") && (type === undefined || type === "babei")) {
        if (is_peipaimingpai())
            tile_states.push(erasemingpai(tile, seat));
        for (let i = 0; i < playercnt; i++)
            if (liqiinfo[i].yifa > 0)
                liqiinfo[i].yifa = -1;
        fulu[seat].push({'type': 4, 'tile': [tile]});
        drawtype = 0;
        addBaBei(calcdoras(), seat, tile, tile_states);

        updateprezhenting_2(seat, tile);

        saveproject();
        return true;
    }
    // 暗杠
    if (tilecnt >= 4 && (type === undefined || type === "angang")) {
        for (let i = 0; i < playercnt; i++)
            if (liqiinfo[i].yifa > 0)
                liqiinfo[i].yifa = -1;
        // 幻境传说: 庄家卡4
        if (get_field_spell_mode1() === 4 && seat === ju)
            doracnt.bonus = 1;

        doracnt.lastype = 2;
        fulu[seat].push({'type': 3, 'tile': []});
        let tilenum = 0;
        for (let i = 0; i < playertiles[seat].length; i++) {
            if (equaltile(tile, playertiles[seat][i])) {
                tilenum++;
                if (is_peipaimingpai())
                    tile_states.push(erasemingpai(playertiles[seat][i], seat));
                fulu[seat][fulu[seat].length - 1].tile.push(playertiles[seat][i]);
                if (tilenum >= 4)
                    break;
            }
        }
        fulu[seat][fulu[seat].length - 1].tile.sort();
        let tmptile = fulu[seat][fulu[seat].length - 1].tile[2];
        fulu[seat][fulu[seat].length - 1].tile[2] = fulu[seat][fulu[seat].length - 1].tile[1];
        fulu[seat][fulu[seat].length - 1].tile[1] = fulu[seat][fulu[seat].length - 1].tile[0];
        fulu[seat][fulu[seat].length - 1].tile[0] = tmptile;

        if (!is_chuanma())
            drawtype = 0;
        else {
            for (let i = 0; i < playercnt; i++) {
                if (i === seat || hupaied[i])
                    continue;
                chuanmagangs.notover.push({'from': i, 'to': seat, 'val': 2000});
            }
        }
        addAnGangAddGang(calcdoras(), seat, tile, 3, tile_states);

        updateprezhenting_2(seat, tile, true);

        saveproject();
        return true;
    }

    for (let i = 0; i < fulu[seat].length; i++)
        if (equaltile(fulu[seat][i].tile[0], tile) && fulu[seat][i].type === 1) {
            jiagangflag = true;
            break;
        }
    if (jiagangflag && tilecnt >= 1 && (type === undefined || type === "jiagang")) {
        for (let i = 0; i < playercnt; i++)
            if (liqiinfo[i].yifa > 0)
                liqiinfo[i].yifa = -1;
        // 幻境传说: 庄家卡4
        if (get_field_spell_mode1() === 4 && seat === ju)
            doracnt.bonus = 1;
        doracnt.lastype = is_dora_jifan() ? 2 : 1;
        for (let i = 0; i < fulu[seat].length; i++) {
            if (fulu[seat][i].type === 1 && equaltile(fulu[seat][i].tile[0], tile)) {
                fulu[seat][i].type = 2;
                for (let j = 0; j < playertiles[seat].length; j++) {
                    if (equaltile(tile, playertiles[seat][j])) {
                        if (is_peipaimingpai())
                            tile_states.push(erasemingpai(playertiles[seat][j], seat));
                        fulu[seat][i].tile.push(playertiles[seat][j]);
                    }
                }
                fulu[seat][i].tile.push(tile);
                break;
            }
        }
        if (!is_chuanma())
            drawtype = 0;
        else {
            if (playertiles[seat][playertiles[seat].length - 1] === tile) {
                for (let i = 0; i < playercnt; i++) {
                    if (i === seat || hupaied[i])
                        continue;
                    chuanmagangs.notover.push({'from': i, 'to': seat, 'val': 1000});
                }
            }
        }
        addAnGangAddGang(calcdoras(), seat, tile, 2, tile_states);

        updateprezhenting_2(seat, tile);

        saveproject();
        return true;
    }
    // 强制"拔北", 需要导入 add_function.js
    if (tilecnt >= 1 && type === "babei" && typeof (editfunction) !== "undefined") {
        if (is_peipaimingpai())
            tile_states.push(erasemingpai(tile, seat));
        for (let i = 0; i < playercnt; i++)
            if (liqiinfo[i].yifa > 0)
                liqiinfo[i].yifa = -1;
        fulu[seat].push({'type': 4, 'tile': [tile]});
        drawtype = 0;
        addBaBei(calcdoras(), seat, tile, tile_states);

        updateprezhenting_2(seat, tile);

        saveproject();
        return true;
    }
    if (first)
        console.warn("chang: " + chang + ", ju: " + ju + ", ben: " + ben + ", seat: " + seat + ", xun: " + xun[seat].length + ": 玩家无法 leimingpai() (给定 tile 情况下)");
    return false;
}

function notileliuju() {
    // 暗夜之战暗牌无人开
    let lstaction = getlstaction();
    if (is_anye() && lstaction.name === "RecordRevealTile")
        addLockTile(lstaction.data.seat, 2);

    // 幻境传说: 庄家卡3
    if (get_field_spell_mode1() === 3) {
        scores[ju] += liqibang * 1000;
        liqibang = 0;
    }

    let playerleft = 0;
    for (let seat = 0; seat < playercnt; seat++)
        if (!hupaied[seat])
            playerleft++;
    let tingcnt = 0;
    let liujumanguan = false;
    let ret = [];
    for (let i = 0; i < playercnt; i++) {
        let tings = calctingpai(i);
        if (tings.length === 0 || hupaied[i]) {
            ret.push({
                'tingpai': false,
                'hand': [],
                'tings': []
            });
        } else {
            tingcnt++;
            playertiles[i].sort(cmp);
            ret.push({
                'tingpai': true,
                'hand': playertiles[i].slice(),
                'tings': tings
            });
        }
    }
    lianzhuangcnt = 0; // 任意荒牌流局都会导致连庄数重置

    // 幻境传说: 命运卡1
    let times = 1;
    if (get_field_spell_mode3() === 1)
        times = 2;

    let ret2 = [];
    if (!no_liujumanguan()) {
        for (let i = ju; i < playercnt + ju; i++) {
            if (is_chuanma() || is_guobiao())
                break;
            const seat = i % playercnt;
            if (!paihe[seat].liujumanguan || hupaied[seat])
                continue;
            liujumanguan = true;
            let score = 0;
            playertiles[seat].sort(cmp);
            for (let i = 0; i < playercnt; i++) {
                if (seat === i || hupaied[i])
                    continue;
                // 幻境传说: 命运卡1
                if (seat === ju || i === ju) {
                    delta_scores[i] -= 4000 * times;
                    delta_scores[seat] += 4000 * times;
                    score += 4000 * times;
                } else {
                    delta_scores[i] -= 2000 * times;
                    delta_scores[seat] += 2000 * times;
                    score += 2000 * times;
                }
            }
            if (playercnt === 3 && no_zimosun()) {
                for (let i = 0; i < playercnt; i++) {
                    if (seat === i || hupaied[i])
                        continue;
                    if (seat === ju) {
                        delta_scores[i] -= 2000;
                        delta_scores[seat] += 2000;
                        score += 2000;
                    } else {
                        delta_scores[i] -= 1000;
                        delta_scores[seat] += 1000;
                        score += 1000;
                    }
                }
            }
            if (playercnt === 2 && no_zimosun()) {
                for (let i = 0; i < playercnt; i++) {
                    if (seat === i || hupaied[i])
                        continue;
                    if (seat === ju) {
                        delta_scores[i] -= 8000;
                        delta_scores[seat] += 8000;
                        score += 8000;
                    } else {
                        delta_scores[i] -= 4000;
                        delta_scores[seat] += 4000;
                        score += 4000;
                    }
                }
            }
            let ming = [];
            for (let i = 0; i < fulu[seat].length; i++) {
                let tiles = fulu[seat][i].tile;
                if (fulu[seat][i].type === 0)
                    ming.push("shunzi(" + tiles[0] + "," + tiles[1] + "," + tiles[2] + ")");
                else if (fulu[seat][i].type === 1)
                    ming.push("kezi(" + tiles[0] + "," + tiles[1] + "," + tiles[2] + ")");
                else if (fulu[seat][i].type === 2)
                    ming.push("minggang(" + tiles[0] + "," + tiles[1] + "," + tiles[2] + "," + tiles[3] + ")");
                else if (fulu[seat][i].type === 3)
                    ming.push("angang(" + tiles[0] + "," + tiles[1] + "," + tiles[2] + "," + tiles[3] + ")");
            }
            ret2.push({
                'delta_scores': delta_scores.slice(),
                'doras': calcdoras(),
                'hand': playertiles[seat].slice(),
                'ming': ming,
                'old_scores': scores.slice(),
                'score': score,
                'seat': seat
            });
            for (let i = 0; i < playercnt; i++) {
                scores[i] = scores[i] + delta_scores[i];
                delta_scores[i] = 0;
            }
        }
        if (liujumanguan && !is_chuanma() && !is_guobiao()) {
            endNoTile(true, ret, ret2);
            if (!is_xuezhandaodi() && !is_wanxiangxiuluo() && !is_xueliu()) {
                ben++;
                // 幻境传说: 庄家卡2
                if (get_field_spell_mode1() === 2)
                    ben += 4;
            }
            if (!ret[ju].tingpai || is_xuezhandaodi() || is_wanxiangxiuluo())
                ju++;
            roundend();
            saveproject();
            return;
        }
    }
    ret2 = [{'delta_scores': [], 'old_scores': []}];
    let notingcnt = playerleft - tingcnt;
    if (tingcnt !== 0 && notingcnt !== 0) {
        if (!is_chuanma() && !is_guobiao()) {
            let fafu = 1000;
            if (tingcnt === 1 && notingcnt === 1)
                fafu = fafu_2p;
            else if (tingcnt === 1 && notingcnt === 2)
                fafu = fafu_3p_1ting;
            else if (tingcnt === 2 && notingcnt === 1)
                fafu = fafu_3p_2ting;
            else if (tingcnt === 1 && notingcnt === 3)
                fafu = fafu_1ting;
            else if (tingcnt === 2 && notingcnt === 2)
                fafu = fafu_2ting;
            else if (tingcnt === 3 && notingcnt === 1)
                fafu = fafu_3ting;

            for (let seat = 0; seat < playercnt; seat++) {
                if (hupaied[seat])
                    continue;
                // 幻境传说: 命运卡1
                if (ret[seat].tingpai)
                    delta_scores[seat] += fafu * notingcnt / tingcnt * times;
                else
                    delta_scores[seat] -= fafu * times;
            }
        } else if (is_chuanma()) {
            for (let seat = 0; seat < playercnt; seat++) {
                for (let i = 0; i < playercnt; i++) {
                    if (hupaied[seat] || hupaied[i] || i === seat)
                        continue;
                    if (huazhu(i) && ret[seat].tingpai) {
                        delta_scores[seat] += Math.max(calcsudian_chuanma(calcfan_chuanma(playertiles[seat], seat, false)), 8000);
                        delta_scores[i] -= Math.max(calcsudian_chuanma(calcfan_chuanma(playertiles[seat], seat, false)), 8000);
                    } else if (huazhu(i)) {
                        delta_scores[seat] += 8000;
                        delta_scores[i] -= 8000;
                    } else if (!ret[i].tingpai && ret[seat].tingpai) {
                        delta_scores[seat] += calcsudian_chuanma(calcfan_chuanma(playertiles[seat], seat, false));
                        delta_scores[i] -= calcsudian_chuanma(calcfan_chuanma(playertiles[seat], seat, false));
                    }
                }
            }
        }
    }
    ret2[0].old_scores = scores.slice();
    ret2[0].delta_scores = delta_scores.slice();
    if (is_chuanma()) {
        let taxes = [0, 0, 0, 0];
        for (let i = 0; i < chuanmagangs.over.length; i++) {
            let from = chuanmagangs.over[i].from, to = chuanmagangs.over[i].to, val = chuanmagangs.over[i].val;
            if (!(ret[to].tingpai || hupaied[to])) {
                taxes[to] -= val;
                taxes[from] += val;
            }
        }
        ret2[0].taxes = taxes;
        for (let seat = 0; seat < playercnt; seat++)
            scores[seat] = scores[seat] + taxes[seat];
    }
    for (let seat = 0; seat < playercnt; seat++)
        scores[seat] = scores[seat] + delta_scores[seat];
    endNoTile(false, ret, ret2);
    if (!is_xuezhandaodi() && !is_wanxiangxiuluo() && !is_chuanma()) {
        ben++;
        // 幻境传说: 庄家卡2
        if (get_field_spell_mode1() === 2)
            ben += 4;
    }
    if ((!ret[ju].tingpai || is_xuezhandaodi() || is_wanxiangxiuluo() || (is_guobiao() && !is_guobiao_lianzhuang())) && !is_chuanma())
        ju++;
    roundend();
    saveproject();
}

function liuju(liuju_type) {
    let ret, seat;
    let lstaction = getlstaction();
    if (lstaction.name === "RecordNewRound" || lstaction.name === "RecordChangeTile" || lstaction.name === "RecordSelectGap")
        seat = ju;
    else
        seat = lstaction.data.seat;
    let all_liuju = [ret_jiuzhongjiupai, ret_sifenglianda, sigangsanle, sijializhi, sanjiahule];

    let allplayertiles = ["", "", "", ""];
    for (let seat = 0; seat < playercnt; seat++) {
        playertiles[seat].sort(cmp);
        for (let i = 0; i < playertiles[seat].length; i++) {
            allplayertiles[seat] += playertiles[seat][i];
            if (i !== playertiles[seat].length - 1)
                allplayertiles[seat] += "|";
        }
    }

    if (typeof (liuju_type) == "number")
        all_liuju[liuju_type - 1]();
    else
        for (let i = 0; i < all_liuju.length; i++) {
            all_liuju[i]();
            if (ret !== undefined)
                break;
        }

    // 九种九牌
    function ret_jiuzhongjiupai() {
        let cnt = [], yaojiutype = 0;
        for (let i = 0; i <= 36; i++)
            cnt[i] = 0;
        for (let i = 0; i < playertiles[seat].length; i++)
            cnt[tiletoint(playertiles[seat][i])]++;
        for (let i = 0; i <= 36; i++)
            if ((i === 1 || i === 9 || i === 10 || i === 18 || i === 19 || (i >= 27 && i <= 34)) && cnt[i] >= 1)
                yaojiutype++;
        if (yaojiutype >= 9 && liqiinfo[seat].liqi === 0 && liqiinfo[seat].yifa === 1 && playertiles[seat].length === 14) {
            let lastile = playertiles[seat][playertiles[seat].length - 1];
            playertiles[seat].length--;
            playertiles[seat].sort(cmp);
            playertiles[seat].push(lastile);
            ret = {
                'name': "RecordLiuJu",
                'data': {
                    'seat': seat,
                    'tiles': playertiles[seat].slice(),
                    'type': 1
                }
            };
        }
    }

    // 四风连打
    function ret_sifenglianda() {
        if (playercnt === 4)
            if (fulu[0].length === 0 && fulu[1].length === 0 && fulu[2].length === 0 && fulu[3].length === 0)
                if (paihe[0].tiles.length === 1 && paihe[1].tiles.length === 1 && paihe[2].tiles.length === 1 && paihe[3].tiles.length === 1)
                    if (paihe[0].tiles[0] === paihe[1].tiles[0] && paihe[1].tiles[0] === paihe[2].tiles[0] && paihe[2].tiles[0] === paihe[3].tiles[0])
                        if (tiletoint(paihe[0].tiles[0]) >= 28 && tiletoint(paihe[0].tiles[0]) <= 31) {
                            let need_bangzi = liqi_need;
                            if (is_beishuizhizhan() && lstliqi != null && lstliqi.beishui_type !== undefined) {
                                if (lstliqi.beishui_type === 1)
                                    need_bangzi = 5;
                                else if (lstliqi.beishui_type === 2)
                                    need_bangzi = 10;
                            }
                            if (lstliqi != null && scores[lstliqi.seat] >= need_bangzi * 1000) {
                                liqibang += need_bangzi;
                                scores[lstliqi.seat] -= need_bangzi * 1000;
                                liqiinfo[lstliqi.seat] = {'liqi': lstliqi.type, 'yifa': 1, 'kai': lstliqi.kai};
                                if (is_beishuizhizhan())
                                    liqiinfo[lstliqi.seat].beishui_type = lstliqi.beishui_type;
                            }
                            ret = {
                                'name': "RecordLiuJu",
                                'data': {
                                    'type': 2
                                }
                            };
                        }
    }

    // 四杠散了
    function sigangsanle() {
        let havegang = [false, false, false, false], havegangcnt = 0;
        for (let seat = 0; seat < playercnt; seat++) {
            for (let i = 0; i < fulu[seat].length; i++)
                if (fulu[seat][i].type === 2 || fulu[seat][i].type === 3)
                    havegang[seat] = true;
            if (havegang[seat])
                havegangcnt++;
        }
        if (doracnt.cnt === 5 && havegangcnt >= 2) {
            let need_bangzi = liqi_need;
            if (is_beishuizhizhan() && lstliqi != null && lstliqi.beishui_type !== undefined) {
                if (lstliqi.beishui_type === 1)
                    need_bangzi = 5;
                else if (lstliqi.beishui_type === 2)
                    need_bangzi = 10;
            }
            if (lstliqi != null && scores[lstliqi.seat] >= need_bangzi * 1000) {
                liqibang += need_bangzi;
                scores[lstliqi.seat] -= need_bangzi * 1000;
                liqiinfo[lstliqi.seat] = {'liqi': lstliqi.type, 'yifa': 1, 'kai': lstliqi.kai};
                if (is_beishuizhizhan())
                    liqiinfo[lstliqi.seat].beishui_type = lstliqi.beishui_type;
            }
            ret = {
                'name': "RecordLiuJu",
                'data': {
                    'type': 3
                }
            };
        }
    }

    // 四家立直
    function sijializhi() {
        if (playercnt === 4 && ret === undefined) {
            let liqiplayercnt = 0;
            for (let i = 0; i <= 3; i++)
                if (liqiinfo[i].liqi !== 0)
                    liqiplayercnt++;
            let need_bangzi = liqi_need;
            if (is_beishuizhizhan() && lstliqi != null && lstliqi.beishui_type !== undefined) {
                if (lstliqi.beishui_type === 1)
                    need_bangzi = 5;
                else if (lstliqi.beishui_type === 2)
                    need_bangzi = 10;
            }

            if (lstliqi != null && scores[lstliqi.seat] >= need_bangzi * 1000) {
                liqibang += need_bangzi;
                scores[lstliqi.seat] -= need_bangzi * 1000;
                liqiinfo[lstliqi.seat] = {'liqi': lstliqi.type, 'yifa': 1, 'kai': lstliqi.kai};
                if (is_beishuizhizhan())
                    liqiinfo[lstliqi.seat].beishui_type = lstliqi.beishui_type;

                if (liqiplayercnt === 3)
                    ret = {
                        'name': "RecordLiuJu",
                        'data': {
                            'type': 4,
                            'liqi': {
                                'liqibang': liqibang,
                                'score': scores[lstliqi.seat],
                                'seat': lstliqi.seat
                            },
                            'allplayertiles': allplayertiles
                        }
                    };
            }
        }
    }

    // 三家和了, 需要设置 '_sanxiangliuju'
    function sanjiahule() {
        if (is_sanxiangliuju())
            ret = {
                'name': "RecordLiuJu",
                'data': {
                    'seat': seat,
                    'type': 5,
                    'allplayertiles': allplayertiles
                }
            };
    }

    if (hules_history.length !== 0 && ret != null)
        ret.data.hules_history = hules_history;
    if (ret !== undefined) {
        actions.push(ret);
        edit_online();
        if (!is_xuezhandaodi() && !is_wanxiangxiuluo() && !is_chuanma() && !is_guobiao()) {
            ben++;
            // 幻境传说: 庄家卡2
            if (get_field_spell_mode1() === 2)
                ben += 4;
        }
        roundend();
        saveproject();
    } else
        console.error("chang: " + chang + ", ju: " + ju + ", ben: " + ben + ": 不符合任何途中流局条件");
}

function roundend(type) {
    if (actions.length === 0)
        return;
    if (!type && is_chuanma() && chuanmagangs.notover.length !== 0 && getlstaction().name !== "RecordNoTile" && getlstaction().name !== "RecordHuleXueZhanEnd")
        calcgangpoint(true);
    discardtiles = ["", "", "", ""];
    tiles0 = "";
    tiles1 = "";
    tiles2 = "";
    tiles3 = "";
    paishan = "";
    muyuseats = "";
    editdata.actions.push(actions.slice());
    editdata.xun.push(xun.slice());
    xun = [[], [], [], []];
    actions = [];
    if (is_chuanma() && juc !== -1) {
        ju = juc;
        juc = -1;
    }
    if (ju === playercnt) {
        chang++;
        ju = 0;
    }
    if (chang === playercnt)
        chang = 0;

    gameend();
}

function gameend(noedit = false) {
    function cmp2(x, y) {
        if (y.part_point_1 > x.part_point_1)
            return 1;
        if (y.part_point_1 < x.part_point_1)
            return -1;
        if (y.seat < x.seat)
            return 1;
        if (y.seat > x.seat)
            return -1;
        return 0;
    }

    players = [];
    for (let i = 0; i < playercnt; i++)
        players.push({
            'gold': 0,
            'grading_score': 0,
            'part_point_1': scores[i],
            'part_point_2': 0,
            'seat': i,
            'total_point': 0,
        });
    players.sort(cmp2);
    players[0].part_point_1 += liqibang * 1000;
    let madian = [[15, 5, -5, -15], [10, 0, -10], [5, -5]];
    if (playercnt === 2) {
        players[1].total_point = players[1].part_point_1 - firstneededscores + madian[2][1] * 1000;
        players[0].total_point = -players[1].total_point;
    } else if (playercnt === 3) {
        for (let i = 1; i < 3; i++)
            players[i].total_point = players[i].part_point_1 - firstneededscores + madian[1][i] * 1000;
        players[0].total_point = -players[1].total_point - players[2].total_point;
    } else {
        for (let i = 1; i < 4; i++)
            players[i].total_point = players[i].part_point_1 - firstneededscores + madian[0][i] * 1000;
        players[0].total_point = -players[1].total_point - players[2].total_point - players[3].total_point;
    }
    editdata.players = players;
    if (!noedit)
        edit();
}

function randompaishan(paishanhead = "", paishanback = "", reddora) {
    if (editdata.actions.length === 0)
        gamebegin();

    if (typeof (tiles0) == "string")
        tiles0 = separatetile(tiles0);
    if (typeof (tiles1) == "string")
        tiles1 = separatetile(tiles1);
    if (typeof (tiles2) == "string")
        tiles2 = separatetile(tiles2);
    if (typeof (tiles3) == "string")
        tiles3 = separatetile(tiles3);

    // 检查手牌数量是否合规
    let all_tiles = [tiles0, tiles1, tiles2, tiles3];
    for (let i = 0; i < playercnt; i++) {
        let tiles_len = all_tiles[i].length;
        if (i === ju && !is_chuanma()) {
            if (tiles_len !== 14)
                console.warn("chang: " + chang + ", ju: " + ju + ", ben: " + ben + ", tiles" + i + " 长度不对: " + tiles_len);
        } else if (tiles_len !== 13 && !is_chuanma())
            console.warn("chang: " + chang + ", ju: " + ju + ", ben: " + ben + ", tiles" + i + " 长度不对: " + tiles_len);
    }

    if (typeof (paishanhead) == "number") {
        reddora = paishanhead;
        paishanhead = paishanback = "";
    }

    if (typeof (paishanback) == "number") {
        reddora = paishanback;
        paishanback = "";
    }
    paishanhead = decompose(paishanhead);
    paishanback = decompose(paishanback);
    if (reddora === undefined) {
        reddora = reddora_count();
        if (reddora === -1) {
            if (config.mode.mode >= 21)
                reddora = 1;
            else if (config.mode.mode >= 11 && config.mode.mode <= 20)
                reddora = 2;
            else
                reddora = 3;
        }
    }

    function randomcmp() {
        return Math.random() - 0.5;
    }

    let cnt = [], tiles = [];
    cnt[0] = 0;
    for (let i = 1; i <= 34; i++)
        cnt[i] = 4;
    for (let i = 35; i <= 37; i++)
        cnt[i] = 0;

    if (playercnt === 2) { // 二麻
        cnt[11] = cnt[12] = cnt[13] = cnt[14] = cnt[15] = cnt[16] = cnt[17] = cnt[20] = cnt[21] = cnt[22] = cnt[23] = cnt[24] = cnt[25] = cnt[26] = 0;
        if (reddora === undefined || reddora === 1) {
            cnt[5] = 3;
            cnt[35] = 1;
        }
    } else if (playercnt === 3) { // 三麻, 赤宝牌数量分为 3, 4, 6, 9, 12
        cnt[2] = cnt[3] = cnt[4] = cnt[5] = cnt[6] = cnt[7] = cnt[8] = 0;
        if (reddora === undefined || reddora === 2) {
            cnt[14] = cnt[23] = 3;
            cnt[36] = cnt[37] = 1;
        } else if (reddora === 4) {
            cnt[14] = cnt[23] = 2;
            cnt[36] = cnt[37] = 2;
        } else if (reddora === 6) {
            cnt[14] = cnt[23] = 1;
            cnt[36] = cnt[37] = 3;
        } else if (reddora === 8) {
            cnt[14] = cnt[23] = 0;
            cnt[36] = cnt[37] = 4;
        }
    } else { // 四麻, 赤宝牌数量分为 3, 4, 6, 9, 12
        if (reddora === undefined || reddora === 3) {
            cnt[5] = cnt[14] = cnt[23] = 3;
            cnt[35] = cnt[36] = cnt[37] = 1;
        } else if (reddora === 4) {
            cnt[5] = cnt[23] = 3;
            cnt[14] = cnt[36] = 2;
            cnt[35] = cnt[37] = 1;
        } else if (reddora === 6) {
            cnt[5] = cnt[14] = cnt[23] = 2;
            cnt[35] = cnt[36] = cnt[37] = 2;
        } else if (reddora === 9) {
            cnt[5] = cnt[14] = cnt[23] = 1;
            cnt[35] = cnt[36] = cnt[37] = 3;
        } else if (reddora === 12) {
            cnt[5] = cnt[14] = cnt[23] = 0;
            cnt[35] = cnt[36] = cnt[37] = 4;
        }
    }
    if (is_chuanma()) {
        cnt[28] = cnt[29] = cnt[30] = cnt[31] = cnt[32] = cnt[33] = cnt[34] = cnt[35] = cnt[36] = cnt[37] = 0;
        cnt[5] = cnt[14] = cnt[23] = 4;
    }
    if (is_guobiao()) {
        cnt[5] = cnt[14] = cnt[23] = 4;
        cnt[35] = cnt[36] = cnt[37] = 0;
        // 用 huapai 当做国标的花牌
        if (typeof (editfunction) !== "undefined")
            cnt[tiletoint(huapai, true)] = 8;
    }

    // 明镜之战
    let cnt2 = [];
    cnt2[0] = 0;
    for (let i = 1; i <= 34; i++)
        cnt2[i] = 3;
    if (is_mingjing()) {
        for (let i = 1; i <= 34; i++)
            cnt[i] = 1;
        cnt[35] = cnt[36] = cnt[37] = 0;
    }

    // 万象修罗
    if (is_wanxiangxiuluo())
        cnt[0] = 4;

    for (let j = 0; j < all_tiles.length; j++) {
        for (let i = 0; i < all_tiles[j].length; i++)
            if (all_tiles[j][i].length > 2 && all_tiles[j][i][2] === tile_suf && !is_tianming())
                cnt2[tiletoint(all_tiles[j][i])]--;

            else
                cnt[tiletoint(all_tiles[j][i], true)]--;
    }
    let all_paishan = [paishanhead, paishanback];
    for (let j = 0; j < all_paishan.length; j++) {
        for (let i = 0; i < all_paishan[j].length; i++)
            if (all_paishan[j][i] !== '.' && all_paishan[j][i] !== 'Y' && all_paishan[j][i] !== 'D' && all_paishan[j][i] !== 'H' && all_paishan[j][i] !== 'T')
                if (all_paishan[j][i] !== 'M' && all_paishan[j][i] !== 'P' && all_paishan[j][i] !== 'S') {
                    if (i + 2 < all_paishan[j].length && all_paishan[j][i + 2] === tile_suf) {
                        cnt2[tiletoint(all_paishan[j][i] + all_paishan[j][i + 1] + tile_suf, true)]--;
                        i++;
                    } else
                        cnt[tiletoint(all_paishan[j][i] + all_paishan[j][i + 1], true)]--;
                    i++;
                }
    }

    for (let i = 1; i <= nxt2.length; i++) {
        for (let j = 1; j <= cnt[i]; j++)
            tiles.push(inttotile(i));
        if (is_mingjing())
            for (let j = 1; j <= cnt2[i]; j++)
                tiles.push(inttotile(i) + tile_suf);
    }

    tiles.sort(randomcmp);

    paishanhead = randomize(paishanhead, tiles);
    paishanback = randomize(paishanback, tiles);

    for (let i = 0; i < tiles.length; i++)
        paishanhead += tiles[i];

    let ret_paishan = paishanhead + paishanback;

    for (let i = 0; i < cnt.length; i++) {
        if (is_mingjing()) {
            if (cnt[i] < 0 && ret_paishan.length !== 83 * 2)
                console.warn("明镜之战: chang: " + chang + ", ju: " + ju + ", ben: " + ben + " paishan 不合规: " + (1 - cnt[i]) + " 个 " + inttotile(i));
            if (cnt2[i] < 0 && ret_paishan.length !== 83 * 2)
                console.warn("明镜之战: chang: " + chang + ", ju: " + ju + ", ben: " + ben + " paishan 不合规: " + (3 - cnt2[i]) + " 个 " + inttotile(i) + tile_suf);
        } else if (cnt[i] < 0) {
            if (is_guobiao() && ret_paishan.length !== 83 * 2)
                console.warn("chang: " + chang + ", ju: " + ju + ", ben: " + ben + " paishan 不合规: " + (4 - cnt[i]) + " 个 " + inttotile(i));
            else if (is_chuanma() && ret_paishan.length !== 55 * 2)
                console.warn("chang: " + chang + ", ju: " + ju + ", ben: " + ben + " paishan 不合规: " + (4 - cnt[i]) + " 个 " + inttotile(i));
            else if (!is_chuanma() && !is_guobiao() && config.mode.mode >= 10 && config.mode.mode <= 19 && ret_paishan.length !== 68 * 2)
                console.warn("chang: " + chang + ", ju: " + ju + ", ben: " + ben + " paishan 不合规: " + (4 - cnt[i]) + " 个 " + inttotile(i));
            else if (!is_chuanma() && !is_guobiao() && config.mode.mode < 10 && config.mode.mode >= 0 && ret_paishan.length !== 83 * 2)
                console.warn("chang: " + chang + ", ju: " + ju + ", ben: " + ben + " paishan 不合规: " + (4 - cnt[i]) + " 个 " + inttotile(i));
        }
    }
    return ret_paishan;

    function insert_paishan(paishan, index, char) {
        for (let i = paishan.length - 1; i >= index; i--)
            paishan[i + 1] = paishan[i];
        paishan[index] = char;
    }

    function randomize(paishan_n, tiles) {
        function pushtiles2paishan(i) {
            paishan_n[i] = tiles[tiles.length - 1][0];
            paishan_n[i + 1] = tiles[tiles.length - 1][1];
            if (tiles[tiles.length - 1].length > 2 && tiles[tiles.length - 1][2] === tile_suf) {
                insert_paishan(paishan_n, i + 2, tile_suf);
                i++;
            }
            tiles.length--;
        }

        function swap(tiles, j) {
            let tmp = tiles[j];
            tiles[j] = tiles[tiles.length - 1];
            tiles[tiles.length - 1] = tmp;
        }

        paishan_n = paishan_n.split('');
        for (let i = 0; i < paishan_n.length; i++) {
            if (paishan_n[i] === 'H') { // 字牌
                for (let j = 0; j < tiles.length; j++) {
                    if (tiles[j][1] === 'z') {
                        swap(tiles, j);
                        break;
                    }
                }
                pushtiles2paishan(i);
            } else if (paishan_n[i] === 'T') { // 老头牌
                for (let j = 0; j < tiles.length; j++) {
                    if (tiles[j][0] === '1' && tiles[j][1] !== 'z' || tiles[j][0] === '9') {
                        swap(tiles, j);
                        break;
                    }
                }
                pushtiles2paishan(i);
            }
        }
        for (let i = 0; i < paishan_n.length; i++) {
            if (paishan_n[i] === 'Y') { // 幺九牌
                for (let j = 0; j < tiles.length; j++) {
                    if (tiles[j][0] === '1' || tiles[j][0] === '9' || tiles[j][1] === 'z') {
                        swap(tiles, j);
                        break;
                    }
                }
                pushtiles2paishan(i);

            } else if (paishan_n[i] === 'D') { // 中张牌
                for (let j = 0; j < tiles.length; j++) {
                    if (!(tiles[j][0] === '1' || tiles[j][0] === '9' || tiles[j][1] === 'z')) {
                        swap(tiles, j);
                        break;
                    }
                }
                pushtiles2paishan(i);
            } else if (paishan_n[i] === 'M') { // 万子
                for (let j = 0; j < tiles.length; j++) {
                    if (tiles[j][1] === 'm') {
                        swap(tiles, j);
                        break;
                    }
                }
                pushtiles2paishan(i);
            } else if (paishan_n[i] === 'P') { // 饼子
                for (let j = 0; j < tiles.length; j++) {
                    if (tiles[j][1] === 'p') {
                        swap(tiles, j);
                        break;
                    }
                }
                pushtiles2paishan(i);
            } else if (paishan_n[i] === 'S') { // 索子
                for (let j = 0; j < tiles.length; j++) {
                    if (tiles[j][1] === 's') {
                        swap(tiles, j);
                        break;
                    }
                }
                pushtiles2paishan(i);
            }
        }
        for (let i = 0; i < paishan_n.length; i++)
            if (paishan_n[i] === '.') // 任意其他牌
                pushtiles2paishan(i);
        paishan_n = paishan_n.join('');
        return paishan_n;
    }
}

function loadreplay() {
    loadproject();
    let rounds = uiscript.UI_Replay.Inst.rounds;
    editdata.config = view.DesktopMgr.Inst.game_config;
    if (uiscript.UI_Replay.Inst.gameResult.accounts[0])
        editdata.player_datas[0] = view.DesktopMgr.Inst.player_datas[0];
    if (uiscript.UI_Replay.Inst.gameResult.accounts[1])
        editdata.player_datas[1] = view.DesktopMgr.Inst.player_datas[1];
    if (uiscript.UI_Replay.Inst.gameResult.accounts[2])
        editdata.player_datas[2] = view.DesktopMgr.Inst.player_datas[2];
    if (uiscript.UI_Replay.Inst.gameResult.accounts[3])
        editdata.player_datas[3] = view.DesktopMgr.Inst.player_datas[3];
    editdata.player_datas[0].views = [];
    editdata.player_datas[1].views = [];
    editdata.player_datas[2].views = [];
    editdata.player_datas[3].views = [];
    gamebegin();
    for (let i = 0; i < rounds.length; i++) {
        let tt = rounds[i].actions;
        tiles0 = rounds[i].actions[0].data.tiles0;
        tiles1 = rounds[i].actions[0].data.tiles1;
        tiles2 = rounds[i].actions[0].data.tiles2;
        if (rounds[i].actions[0].data.tiles3)
            tiles3 = rounds[i].actions[0].data.tiles3;
        paishan = rounds[i].actions[0].data.paishan;
        roundbegin();
        for (let j = 1; j < tt.length; j++) {
            if (tt[j].name === "RecordDealTile")
                mopai();
            if (tt[j].name === "RecordDiscardTile" || tt[j].name === "RecordRevealTile")
                qiepai(tt[j].data.tile, tt[j].data.is_liqi);
            if (tt[j].name === "RecordChiPengGang") {
                let tmp = [];
                for (let k = 0; k < tt[j].data.tiles.length; k++)
                    if (tt[j].data.froms[k] === tt[j].data.seat)
                        tmp.push(tt[j].data.tiles[k]);
                mingpai(tmp);
            }
            if (tt[j].name === "RecordAnGangAddGang") {
                if (tt[j].data.type === 3)
                    leimingpai(tt[j].data.tiles, "angang");
                else
                    leimingpai(tt[j].data.tiles, "jiagang");
            }
            if (tt[j].name === "RecordBaBei")
                leimingpai("4z", "babei");
            if (tt[j].name === "RecordLiuJu")
                liuju();
            if (tt[j].name === "RecordNoTile")
                notileliuju();
            if (tt[j].name === "RecordHule" || tt[j].name === "RecordHuleXueZhanMid" || tt[j].name === "RecordHuleXueZhanEnd") {
                let tmp = [];
                for (let k = 0; k < tt[j].data.hules.length; k++)
                    tmp.push(tt[j].data.hules[k].seat);
                if (tt[j].name === "RecordHuleXueZhanEnd")
                    hupai(tmp, true);
                else
                    hupai(tmp);
            }
            if (tt[j].name === "RecordChangeTile")
                huansanzhang(tt[j].data.change_tile_infos[0].out_tiles, tt[j].data.change_tile_infos[1].out_tiles, tt[j].data.change_tile_infos[2].out_tiles, tt[j].data.change_tile_infos[3].out_tiles, tt[j].data.change_type);

            if (tt[j].name === "RecordSelectGap") {
                let tmp = "";
                for (let k = 0; k < tt[j].data.gap_types.length; k++) {
                    if (tt[j].data.gap_types[k] === 0)
                        tmp += "p";
                    if (tt[j].data.gap_types[k] === 1)
                        tmp += "m";
                    if (tt[j].data.gap_types[k] === 2)
                        tmp += "s";
                }
                dingque(tmp);
            }
        }
        roundend();
    }
    gameend();
}

function demogame() {
    tiles0 = "11223344556777z";
    tiles1 = "1112340678999m";
    tiles2 = "1112340678999p";
    tiles3 = "1112340678999s";
    paishan = randompaishan("6z", "55z....");
    roundbegin();
    qiepai(true);
    moqieliqi();
    hupai();
}

function demogame_3P() {
    tiles0 = "11223344556777z";
    tiles1 = "1112340678999p";
    tiles2 = "1112340678999s";
    paishan = randompaishan("6z", "55z........");
    roundbegin();
    qiepai(true);
    moqieliqi();
    hupai();
}

function gotoju(c_chang = chang, c_ju = ju, c_ben = ben) {
    chang = c_chang;
    ju = c_ju;
    ben = c_ben;
}

function normalmoqie(tile_cnt) {
    if (tile_cnt === undefined)
        tile_cnt = 1;
    if (typeof (tile_cnt) === "number")
        for (let i = 0; i < tile_cnt; i++) {
            mopai();
            qiepai();
        }
    else if (typeof (tile_cnt) === "string") {
        mopai();
        qiepai(tile_cnt);
    } else
        console.error("Error at normalmoqie()");
}

function mingqiepai(tls_cnt) {
    if (tls_cnt === undefined)
        tls_cnt = 1;
    if (typeof (tls_cnt) === "number")
        for (let i = 0; i < tls_cnt; i++) {
            mingpai();
            qiepai();
        }
    else if (typeof (tls_cnt) === "string" && !isNaN(parseInt(tls_cnt[1]))) { // 第二个字符是数字, 则至少两张牌, 是鸣牌
        mingpai(tls_cnt);
        qiepai();
    } else if (typeof (tls_cnt) === "string") {
        mingpai();
        qiepai(tls_cnt);
    } else
        console.error("Error at mingqiepai()");
}

function moqieliqi(tile) {
    if (tile === undefined) {
        mopai();
        qiepai(true);
    } else {
        mopai();
        qiepai(tile, true);
    }
}

function zimohu(flag = false) {
    if (typeof (flag) == "boolean") {
        mopai();
        hupai(flag);
    } else
        console.error("Error at zimohu()");
}

function combomopai(tile_cnt) {
    if (tile_cnt === undefined)
        tile_cnt = 1;
    if (typeof (tile_cnt) === "number")
        for (let i = 0; i < tile_cnt; i++) {
            leimingpai();
            mopai();
        }
    else if (typeof (tile_cnt) === "string") {
        leimingpai(tile_cnt);
        mopai();
    } else
        console.error("Error at combomopai()");
}

function moqieliuju() {
    normalmoqie(get_left_tile_cnt());
    notileliuju();
}
