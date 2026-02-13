/**
 * @file: constants.ts - 一些常量和自制的番种信息
 * @author: Fat-pig-Cui
 * @email: chubbypig@qq.com
 * @github: https://github.com/Fat-pig-Cui/majsoul-replay-editor
 */

// 自定义番种: 役种名称的汉字需要在已有的里面选, 否则不会显示
export const DIYFans = (): void => {
    // 9000: 诈和, '诈'字无法显示, 原名称为'振和'
    // 9001: 天地创造: '创造'无法显示, 原名称为'天地大白'
    // 9002: 万物生长: '万生长'无法显示, 原名称为'龙发杠载'
    // 9003: 开立直(役满): 对应语音是对局中的宣言立直
    // 9004: 开两立直(役满): 对应语音是对局中的宣言两立直
    // 9005: 开立直(2番)
    // 9006: 开两立直(3番)
    cfg.fan.fan.map_[9000] = {
        id: 9000,
        name_chs: '诈和',
        name_chs_t: '诈和',
        name_jp: '诈和',
        name_en: 'Fake winning',
        fan_menqing: 5,
        fan_fulu: 5,
        show_index: 5,
        sound: '',
    };
    cfg.fan.fan.map_[9001] = {
        id: 9001,
        name_chs: '天地创造',
        name_chs_t: '天地创造',
        name_jp: '天地创造',
        name_en: 'Beginning of the Cosmos',
        fan_menqing: 78,
        fan_fulu: 78,
        show_index: 6,
        sound: '',
    };
    cfg.fan.fan.map_[9002] = {
        id: 9002,
        name_chs: '万物生长',
        name_chs_t: '万物生长',
        name_jp: '万物生长',
        name_en: 'Sprout of the Earth',
        fan_menqing: 78,
        fan_fulu: 78,
        show_index: 7,
        sound: '',
    };
    cfg.fan.fan.map_[9003] = {
        id: 9003,
        name_chs: '役满 开立直',
        name_chs_t: '役满 开立直',
        name_jp: '役满 开立直',
        name_en: 'Open Reach',
        fan_menqing: 1,
        fan_fulu: 1,
        show_index: 0,
        sound: 'act_rich',
    };
    cfg.fan.fan.map_[9004] = {
        id: 9004,
        name_chs: '役满 开两立直',
        name_chs_t: '役满 开两立直',
        name_jp: '役满 开两立直',
        name_en: 'Open Double Reach',
        fan_menqing: 1,
        fan_fulu: 1,
        show_index: 0,
        sound: 'act_drich',
    };
    cfg.fan.fan.map_[9005] = {
        id: 9005,
        name_chs: '开立直',
        name_chs_t: '开立直',
        name_jp: '开立直',
        name_en: 'Open Reach',
        fan_menqing: 2,
        fan_fulu: 2,
        show_index: 0,
        sound: 'fan_liqi',
    };
    cfg.fan.fan.map_[9006] = {
        id: 9006,
        name_chs: '开两立直',
        name_chs_t: '开两立直',
        name_jp: '开两立直',
        name_en: 'Open Double Reach',
        fan_menqing: 3,
        fan_fulu: 3,
        show_index: 0,
        sound: 'fan_dliqi',
    };

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
    cfg.fan.fan.map_[9100] = {
        id: 9100,
        name_chs: '流局满贯',
        name_chs_t: '流局滿貫',
        name_jp: '流局滿貫',
        name_en: 'mangan at draw',
        fan_menqing: 5,
        fan_fulu: 5,
        show_index: 2000,
        sound: 'fan_liujumanguan',
    };
    cfg.fan.fan.map_[9101] = {
        id: 9101,
        name_chs: '役牌 东',
        name_chs_t: '役牌 東',
        name_jp: '役牌 東',
        name_en: 'East Wind',
        fan_menqing: 1,
        fan_fulu: 1,
        show_index: 150,
        sound: 'fan_dong',
    };
    cfg.fan.fan.map_[9102] = {
        id: 9102,
        name_chs: '役牌 连东',
        name_chs_t: '役牌 連東',
        name_jp: '役牌 連東',
        name_en: 'Double East Wind',
        fan_menqing: 1,
        fan_fulu: 1,
        show_index: 150,
        sound: 'fan_doubledong',
    };
    cfg.fan.fan.map_[9103] = {
        id: 9103,
        name_chs: '役牌 南',
        name_chs_t: '役牌 南',
        name_jp: '役牌 南',
        name_en: 'South Wind',
        fan_menqing: 1,
        fan_fulu: 1,
        show_index: 150,
        sound: 'fan_nan',
    };
    cfg.fan.fan.map_[9104] = {
        id: 9104,
        name_chs: '役牌 连南',
        name_chs_t: '役牌 連南',
        name_jp: '役牌 連南',
        name_en: 'Double South Wind',
        fan_menqing: 1,
        fan_fulu: 1,
        show_index: 150,
        sound: 'fan_doublenan',
    };
    cfg.fan.fan.map_[9105] = {
        id: 9105,
        name_chs: '役牌 西',
        name_chs_t: '役牌 西',
        name_jp: '役牌 西',
        name_en: 'West Wind',
        fan_menqing: 1,
        fan_fulu: 1,
        show_index: 150,
        sound: 'fan_xi',
    };
    cfg.fan.fan.map_[9106] = {
        id: 9106,
        name_chs: '役牌 连西',
        name_chs_t: '役牌 連西',
        name_jp: '役牌 連西',
        name_en: 'Double West Wind',
        fan_menqing: 1,
        fan_fulu: 1,
        show_index: 150,
        sound: 'fan_doublexi',
    };
    cfg.fan.fan.map_[9107] = {
        id: 9107,
        name_chs: '役牌 北',
        name_chs_t: '役牌 北',
        name_jp: '役牌 北',
        name_en: 'North Wind',
        fan_menqing: 1,
        fan_fulu: 1,
        show_index: 160,
        sound: 'fan_bei',
    };
    cfg.fan.fan.map_[9108] = {
        id: 9107,
        name_chs: '役牌 连北',
        name_chs_t: '役牌 連北',
        name_jp: '役牌 連北',
        name_en: 'Double North Wind',
        fan_menqing: 1,
        fan_fulu: 1,
        show_index: 160,
        sound: 'fan_doublebei',
    };

    // 对局操作语音, 中间会有较长时间的停顿
    // 9200: 立直
    // 9201: 两立直
    // 9202: 吃
    // 9203: 碰
    // 9204: 杠
    // 9205: 拔北
    // 9206: 荣, '荣'无法显示, 原名称为'点和'
    // 9207: 自摸
    cfg.fan.fan.map_[9200] = {
        id: 9200,
        name_chs: '立直',
        name_chs_t: '立直',
        name_jp: '立直',
        name_en: 'Reach',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 0,
        sound: 'act_rich',
    };
    cfg.fan.fan.map_[9201] = {
        id: 9200,
        name_chs: '双立直',
        name_chs_t: '双立直',
        name_jp: '双立直',
        name_en: 'Double Reach',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 0,
        sound: 'act_drich',
    };
    cfg.fan.fan.map_[9202] = {
        id: 9202,
        name_chs: '吃',
        name_chs_t: '吃',
        name_jp: '吃',
        name_en: 'Chi',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 0,
        sound: 'act_chi',
    };
    cfg.fan.fan.map_[9203] = {
        id: 9203,
        name_chs: '碰',
        name_chs_t: '碰',
        name_jp: '碰',
        name_en: 'Pon',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 0,
        sound: 'act_pon',
    };
    cfg.fan.fan.map_[9204] = {
        id: 9204,
        name_chs: '杠',
        name_chs_t: '杠',
        name_jp: '杠',
        name_en: 'Kan',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 0,
        sound: 'act_kan',
    };
    cfg.fan.fan.map_[9205] = {
        id: 9205,
        name_chs: '拔北',
        name_chs_t: '拔北',
        name_jp: '拔北',
        name_en: 'Babei',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 0,
        sound: 'act_babei',
    };
    cfg.fan.fan.map_[9206] = {
        id: 9206,
        name_chs: '荣和',
        name_chs_t: '荣和',
        name_jp: '荣和',
        name_en: 'Ron',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 0,
        sound: 'act_ron',
    };
    cfg.fan.fan.map_[9207] = {
        id: 9207,
        name_chs: '自摸',
        name_chs_t: '自摸',
        name_jp: '自摸',
        name_en: 'Tsumo',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 0,
        sound: 'act_tumo',
    };
    cfg.fan.fan.map_[9208] = {
        id: 9208,
        name_chs: '对局开始',
        name_chs_t: '对局开始',
        name_jp: '对局开始',
        name_en: '',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 9999,
        sound: 'ingame_start',
    };
    // 9209: 终局一位语音(天地无双指一姬的)
    cfg.fan.fan.map_[9209] = {
        id: 9209,
        name_chs: '天地无双',
        name_chs_t: '天地无双',
        name_jp: '天地无双',
        name_en: 'tianxiawushuangmiao',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 9999,
        sound: 'game_top',
    };
    cfg.fan.fan.map_[9210] = {
        id: 9210,
        name_chs: '荣和获胜',
        name_chs_t: '荣和获胜',
        name_jp: '荣和获胜',
        name_en: '',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 9999,
        sound: 'game_top_ron',
    };
    cfg.fan.fan.map_[9211] = {
        id: 9211,
        name_chs: '高分获胜',
        name_chs_t: '高分获胜',
        name_jp: '高分获胜',
        name_en: '',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 9999,
        sound: 'game_top_big',
    };

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
    cfg.fan.fan.map_[9300] = {
        id: 9300,
        name_chs: '满贯',
        name_chs_t: '满贯',
        name_jp: '满贯',
        name_en: 'mangan',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 2000,
        sound: 'gameend_manguan',
    };
    cfg.fan.fan.map_[9301] = {
        id: 9301,
        name_chs: '跳满',
        name_chs_t: '跳满',
        name_jp: '跳满',
        name_en: 'tiaoman',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 2000,
        sound: 'gameend_tiaoman',
    };
    cfg.fan.fan.map_[9302] = {
        id: 9302,
        name_chs: '倍满',
        name_chs_t: '倍满',
        name_jp: '倍满',
        name_en: 'beiman',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 2000,
        sound: 'gameend_beiman',
    };
    cfg.fan.fan.map_[9303] = {
        id: 9303,
        name_chs: '三倍满',
        name_chs_t: '三倍满',
        name_jp: '三倍满',
        name_en: 'sanbeiman',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 2000,
        sound: 'gameend_sanbeiman',
    };
    cfg.fan.fan.map_[9304] = {
        id: 9304,
        name_chs: '役满',
        name_chs_t: '役满',
        name_jp: '役满',
        name_en: 'yakuman',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 2000,
        sound: 'gameend_yiman1',
    };
    cfg.fan.fan.map_[9305] = {
        id: 9305,
        name_chs: '两倍役满',
        name_chs_t: '两倍役满',
        name_jp: '两倍役满',
        name_en: 'Double Yakuman',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 2000,
        sound: 'gameend_yiman2',
    };
    cfg.fan.fan.map_[9306] = {
        id: 9306,
        name_chs: '三倍役满',
        name_chs_t: '三倍役满',
        name_jp: '三倍役满',
        name_en: 'Triple Yakuman',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 2000,
        sound: 'gameend_yiman3',
    };
    cfg.fan.fan.map_[9307] = {
        id: 9307,
        name_chs: '四倍役满',
        name_chs_t: '四倍役满',
        name_jp: '四倍役满',
        name_en: 'Yakumans',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 2000,
        sound: 'gameend_yiman4',
    };
    cfg.fan.fan.map_[9308] = {
        id: 9308,
        name_chs: '五倍役满',
        name_chs_t: '五倍役满',
        name_jp: '五倍役满',
        name_en: 'Yakumans',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 2000,
        sound: 'gameend_yiman5',
    };
    cfg.fan.fan.map_[9309] = {
        id: 9309,
        name_chs: '六倍役满',
        name_chs_t: '六倍役满',
        name_jp: '六倍役满',
        name_en: 'Yakumans',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 2000,
        sound: 'gameend_yiman6',
    };
    cfg.fan.fan.map_[9310] = {
        id: 9310,
        name_chs: '累计役满',
        name_chs_t: '累计役满',
        name_jp: '累计役满',
        name_en: 'Yakumans',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 2000,
        sound: 'gameend_leijiyiman',
    };
    cfg.fan.fan.map_[9311] = {
        id: 9311,
        name_chs: '听牌',
        name_chs_t: '听牌',
        name_jp: '听牌',
        name_en: 'tingpai',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 2000,
        sound: 'gameend_tingpai',
    };
    cfg.fan.fan.map_[9312] = {
        id: 9310,
        name_chs: '未听牌',
        name_chs_t: '未听牌',
        name_jp: '未听牌',
        name_en: 'noting',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 2000,
        sound: 'gameend_noting',
    };

    // 流局语音, 这里可以穿插到川麻的番种中
    // 9400: 四风连打
    // 9400: 四杠散了, '散'无法显示
    // 9400: 九种九牌, '种'无法显示
    cfg.fan.fan.map_[9400] = {
        id: 9400,
        name_chs: '四风连打',
        name_chs_t: '四风连打',
        name_jp: '四风连打',
        name_en: 'sifenglianda',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 2000,
        sound: 'gameend_sifenglianda',
    };
    cfg.fan.fan.map_[9401] = {
        id: 9401,
        name_chs: '四杠散了',
        name_chs_t: '四杠散了',
        name_jp: '四杠散了',
        name_en: 'sigangsanle',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 2000,
        sound: 'gameend_sigangliuju',
    };
    cfg.fan.fan.map_[9402] = {
        id: 9402,
        name_chs: '四家立直',
        name_chs_t: '四家立直',
        name_jp: '四家立直',
        name_en: 'sijializhi',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 2000,
        sound: 'gameend_sijializhi',
    };
    cfg.fan.fan.map_[9403] = {
        id: 9403,
        name_chs: '九种九牌',
        name_chs_t: '九种九牌',
        name_jp: '九种九牌',
        name_en: 'jiuzhongjiupai',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 2000,
        sound: 'gameend_jiuzhongjiupai',
    };

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
    cfg.fan.fan.map_[9500] = {
        id: 9500,
        name_chs: '获得语音',
        name_chs_t: '获得语音',
        name_jp: '获得语音',
        name_en: 'selfintro',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 0,
        sound: 'lobby_selfintro',
    };
    cfg.fan.fan.map_[9501] = {
        id: 9501,
        name_chs: '登录语音普通',
        name_chs_t: '登录语音普通',
        name_jp: '登录语音普通',
        name_en: 'playerlogin',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 0,
        sound: 'lobby_playerlogin',
    };
    cfg.fan.fan.map_[9502] = {
        id: 9502,
        name_chs: '登录语音满羁绊',
        name_chs_t: '登录语音满羁绊',
        name_jp: '登录语音满羁绊',
        name_en: 'playerlogin_max',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 2000,
        sound: 'lobby_playerlogin',
    };
    cfg.fan.fan.map_[9503] = {
        id: 9503,
        name_chs: '大厅交互语音1',
        name_chs_t: '大厅交互语音1',
        name_jp: '大厅交互语音1',
        name_en: 'lobby_normal1',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 0,
        sound: 'lobby_normal',
    };
    cfg.fan.fan.map_[9504] = {
        id: 9504,
        name_chs: '大厅交互语音2',
        name_chs_t: '大厅交互语音2',
        name_jp: '大厅交互语音2',
        name_en: 'lobby_normal2',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 0,
        sound: 'lobby_normal',
    };
    cfg.fan.fan.map_[9505] = {
        id: 9505,
        name_chs: '大厅交互语音3',
        name_chs_t: '大厅交互语音3',
        name_jp: '大厅交互语音3',
        name_en: 'lobby_normal3',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 0,
        sound: 'lobby_normal',
    };
    cfg.fan.fan.map_[9506] = {
        id: 9506,
        name_chs: '大厅交互语音4',
        name_chs_t: '大厅交互语音4',
        name_jp: '大厅交互语音4',
        name_en: 'lobby_normal4',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 0,
        sound: 'lobby_normal',
    };
    cfg.fan.fan.map_[9507] = {
        id: 9507,
        name_chs: '大厅交互语音5',
        name_chs_t: '大厅交互语音5',
        name_jp: '大厅交互语音5',
        name_en: 'lobby_normal5',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 0,
        sound: 'lobby_normal',
    };
    cfg.fan.fan.map_[9508] = {
        id: 9508,
        name_chs: '大厅交互语音6',
        name_chs_t: '大厅交互语音6',
        name_jp: '大厅交互语音6',
        name_en: 'lobby_normal6',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 0,
        sound: 'lobby_normal',
    };
    cfg.fan.fan.map_[9509] = {
        id: 9509,
        name_chs: '大厅交互语音7',
        name_chs_t: '大厅交互语音7',
        name_jp: '大厅交互语音7',
        name_en: 'lobby_normal7',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 0,
        sound: 'lobby_normal',
    };
    cfg.fan.fan.map_[9510] = {
        id: 9510,
        name_chs: '大厅交互语音8',
        name_chs_t: '大厅交互语音8',
        name_jp: '大厅交互语音8',
        name_en: 'lobby_normal8',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 0,
        sound: 'lobby_normal',
    };
    cfg.fan.fan.map_[9511] = {
        id: 9511,
        name_chs: '送礼物语音普通',
        name_chs_t: '送礼物语音普通',
        name_jp: '送礼物语音普通',
        name_en: 'lobby_gift',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 0,
        sound: 'lobby_gift',
    };
    cfg.fan.fan.map_[9512] = {
        id: 9512,
        name_chs: '送礼物语音喜好',
        name_chs_t: '送礼物语音喜好',
        name_jp: '送礼物语音喜好',
        name_en: 'lobby_gift_favor',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 0,
        sound: 'lobby_gift_favor',
    };
    cfg.fan.fan.map_[9513] = {
        id: 9513,
        name_chs: '好感度升级语音1',
        name_chs_t: '好感度升级语音1',
        name_jp: '好感度升级语音1',
        name_en: 'lobby_levelup1',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 0,
        sound: 'lobby_levelup1',
    };
    cfg.fan.fan.map_[9514] = {
        id: 9514,
        name_chs: '好感度升级语音2',
        name_chs_t: '好感度升级语音2',
        name_jp: '好感度升级语音2',
        name_en: 'lobby_levelup2',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 0,
        sound: 'lobby_levelup2',
    };
    cfg.fan.fan.map_[9515] = {
        id: 9515,
        name_chs: '好感度升级语音3',
        name_chs_t: '好感度升级语音3',
        name_jp: '好感度升级语音3',
        name_en: 'lobby_levelup3',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 0,
        sound: 'lobby_levelup3',
    };
    cfg.fan.fan.map_[9516] = {
        id: 9516,
        name_chs: '好感度升级语音4',
        name_chs_t: '好感度升级语音4',
        name_jp: '好感度升级语音4',
        name_en: 'lobby_levelup4',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 0,
        sound: 'lobby_levelup4',
    };
    cfg.fan.fan.map_[9517] = {
        id: 9517,
        name_chs: '好感度升级语音5',
        name_chs_t: '好感度升级语音5',
        name_jp: '好感度升级语音5',
        name_en: 'lobby_levelmax',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 0,
        sound: 'lobby_levelmax',
    };
    cfg.fan.fan.map_[9517] = {
        id: 9517,
        name_chs: '好感度升级语音5',
        name_chs_t: '好感度升级语音5',
        name_jp: '好感度升级语音5',
        name_en: 'lobby_manjiban',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 0,
        sound: 'lobby_manjiban',
    };
    cfg.fan.fan.map_[9518] = {
        id: 9518,
        name_chs: '契约语音',
        name_chs_t: '契约语音',
        name_jp: '契约语音',
        name_en: 'lobby_qiyue',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 0,
        sound: 'lobby_qiyue',
    };
    cfg.fan.fan.map_[9519] = {
        id: 9519,
        name_chs: '新年语音',
        name_chs_t: '新年语音',
        name_jp: '新年语音',
        name_en: 'lobby_newyear',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 0,
        sound: 'lobby_newyear',
    };
    cfg.fan.fan.map_[9520] = {
        id: 9520,
        name_chs: '情人节语音',
        name_chs_t: '情人节语音',
        name_jp: '情人节语音',
        name_en: 'lobby_valentine',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 0,
        sound: 'lobby_valentine',
    };

    // 对局契约特殊语音
    // 9600: 连续打出多张相同牌, '续出多张'无法显示
    // 9600: 打出宝牌, '出'无法显示
    // 9600: 余牌少于10, '余少于'无法显示
    // 9600: 役满听牌, '听'无法显示
    // 9600: 倍满/三倍满听牌, '倍听'无法显示
    cfg.fan.fan.map_[9600] = {
        id: 9600,
        name_chs: '连续打出多张相同牌',
        name_chs_t: '连续打出多张相同牌',
        name_jp: '连续打出多张相同牌',
        name_en: 'ingame_lianda',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 0,
        sound: 'ingame_lianda',
    };
    cfg.fan.fan.map_[9601] = {
        id: 9601,
        name_chs: '打出宝牌',
        name_chs_t: '打出宝牌',
        name_jp: '打出宝牌',
        name_en: 'ingame_baopai',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 0,
        sound: 'ingame_baopai',
    };
    cfg.fan.fan.map_[9602] = {
        id: 9602,
        name_chs: '余牌少于10',
        name_chs_t: '余牌少于10',
        name_jp: '余牌少于10',
        name_en: 'ingame_remain10',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 0,
        sound: 'ingame_remain10',
    };
    cfg.fan.fan.map_[9603] = {
        id: 9603,
        name_chs: '役满听牌',
        name_chs_t: '役满听牌',
        name_jp: '役满听牌',
        name_en: 'ingame_yiman',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 0,
        sound: 'ingame_yiman',
    };
    cfg.fan.fan.map_[9604] = {
        id: 9604,
        name_chs: '倍满/三倍满听牌',
        name_chs_t: '倍满/三倍满听牌',
        name_jp: '倍满/三倍满听牌',
        name_en: 'ingame_beiman',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 0,
        sound: 'ingame_beiman',
    };
    cfg.fan.fan.map_[9605] = {
        id: 9605,
        name_chs: '进入友人房',
        name_chs_t: '进入友人房',
        name_jp: '进入友人房',
        name_en: 'lobby_room_in',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 0,
        sound: 'lobby_room_in',
    };
    cfg.fan.fan.map_[9606] = {
        id: 9606,
        name_chs: '友人房内准备',
        name_chs_t: '友人房内准备',
        name_jp: '友人房内准备',
        name_en: 'lobby_room_ready',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 0,
        sound: 'lobby_room_ready',
    };

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
    cfg.fan.fan.map_[9700] = {
        id: 9700,
        name_chs: '推不倒',
        name_chs_t: '推不倒',
        name_jp: '推不倒',
        name_en: '',
        fan_menqing: 1,
        fan_fulu: 1,
        show_index: 0,
        sound: '',
    };
    cfg.fan.fan.map_[9701] = {
        id: 9701,
        name_chs: '赤三色',
        name_chs_t: '赤三色',
        name_jp: '赤三色',
        name_en: '',
        fan_menqing: 2,
        fan_fulu: 2,
        show_index: 0,
        sound: '',
    };
    cfg.fan.fan.map_[9702] = {
        id: 9702,
        name_chs: '三色通贯',
        name_chs_t: '三色通贯',
        name_jp: '三色通贯',
        name_en: '',
        fan_menqing: 2,
        fan_fulu: 1,
        show_index: 0,
        sound: '',
    };
    cfg.fan.fan.map_[9703] = {
        id: 9703,
        name_chs: '四连刻',
        name_chs_t: '四连刻',
        name_jp: '四连刻',
        name_en: '',
        fan_menqing: 1,
        fan_fulu: 1,
        show_index: 0,
        sound: '',
    };
    cfg.fan.fan.map_[9704] = {
        id: 9704,
        name_chs: '一色四同顺',
        name_chs_t: '一色四同顺',
        name_jp: '一色四同顺',
        name_en: '',
        fan_menqing: 1,
        fan_fulu: 1,
        show_index: 0,
        sound: '',
    };
    cfg.fan.fan.map_[9705] = {
        id: 9705,
        name_chs: '红孔雀',
        name_chs_t: '红孔雀',
        name_jp: '红孔雀',
        name_en: '',
        fan_menqing: 1,
        fan_fulu: 1,
        show_index: 0,
        sound: '',
    };
    cfg.fan.fan.map_[9706] = {
        id: 9706,
        name_chs: '红一点',
        name_chs_t: '红一点',
        name_jp: '红一点',
        name_en: '',
        fan_menqing: 1,
        fan_fulu: 1,
        show_index: 0,
        sound: '',
    };
    cfg.fan.fan.map_[9707] = {
        id: 9707,
        name_chs: '黑一色',
        name_chs_t: '黑一色',
        name_jp: '黑一色',
        name_en: '',
        fan_menqing: 1,
        fan_fulu: 1,
        show_index: 0,
        sound: '',
    };
    cfg.fan.fan.map_[9708] = {
        id: 9708,
        name_chs: '十三不搭',
        name_chs_t: '十三不搭',
        name_jp: '十三不搭',
        name_en: '',
        fan_menqing: 1,
        fan_fulu: 1,
        show_index: 0,
        sound: '',
    };
    cfg.fan.fan.map_[9709] = {
        id: 9709,
        name_chs: '百万石',
        name_chs_t: '百万石',
        name_jp: '百万石',
        name_en: '',
        fan_menqing: 1,
        fan_fulu: 1,
        show_index: 0,
        sound: '',
    };
    cfg.fan.fan.map_[9710] = {
        id: 9710,
        name_chs: '金门桥',
        name_chs_t: '金门桥',
        name_jp: '金门桥',
        name_en: '',
        fan_menqing: 1,
        fan_fulu: 1,
        show_index: 0,
        sound: '',
    };
    cfg.fan.fan.map_[9711] = {
        id: 9711,
        name_chs: '东北新干线',
        name_chs_t: '东北新干线',
        name_jp: '东北新干线',
        name_en: '',
        fan_menqing: 1,
        fan_fulu: 1,
        show_index: 0,
        sound: '',
    };
    cfg.fan.fan.map_[9712] = {
        id: 9712,
        name_chs: '无发绿一色',
        name_chs_t: '无发绿一色',
        name_jp: '无发绿一色',
        name_en: '',
        fan_menqing: 1,
        fan_fulu: 1,
        show_index: 0,
        sound: 'fan_lvyise',
    };
};

// 国标麻将番种
export const guobiaoFans = (): void => {
    cfg.fan.fan.map_[8000] = {
        id: 8000,
        name_chs: '大四喜',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 88,
        fan_fulu: 88,
        show_index: 8000,
        sound: 'fan_dasixi',
    };
    cfg.fan.fan.map_[8001] = {
        id: 8001,
        name_chs: '大三元',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 88,
        fan_fulu: 88,
        show_index: 8001,
        sound: 'fan_dasanyuan',
    };
    cfg.fan.fan.map_[8002] = {
        id: 8002,
        name_chs: '绿一色',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 88,
        fan_fulu: 88,
        show_index: 8002,
        sound: 'fan_lvyise',
    };
    cfg.fan.fan.map_[8003] = {
        id: 8003,
        name_chs: '九莲宝灯',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 88,
        fan_fulu: 88,
        show_index: 8003,
        sound: 'fan_jiulianbaodeng',
    };
    cfg.fan.fan.map_[8004] = {
        id: 8004,
        name_chs: '四杠',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 88,
        fan_fulu: 88,
        show_index: 8004,
        sound: 'fan_sigangzi',
    };
    cfg.fan.fan.map_[8005] = {
        id: 8005,
        name_chs: '连七对',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 88,
        fan_fulu: 88,
        show_index: 8005,
        sound: '',
    };
    cfg.fan.fan.map_[8006] = {
        id: 8006,
        name_chs: '十三幺',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 88,
        fan_fulu: 88,
        show_index: 8006,
        sound: 'fan_guoshiwushuang',
    };

    cfg.fan.fan.map_[8007] = {
        id: 8007,
        name_chs: '清幺九',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 64,
        fan_fulu: 64,
        show_index: 8007,
        sound: 'fan_qinglaotou',
    };
    cfg.fan.fan.map_[8008] = {
        id: 8008,
        name_chs: '小四喜',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 64,
        fan_fulu: 64,
        show_index: 8008,
        sound: 'fan_xiaosixi',
    };
    cfg.fan.fan.map_[8009] = {
        id: 8009,
        name_chs: '小三元',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 64,
        fan_fulu: 64,
        show_index: 8009,
        sound: 'fan_xiaosanyuan',
    };
    cfg.fan.fan.map_[8010] = {
        id: 8010,
        name_chs: '字一色',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 64,
        fan_fulu: 64,
        show_index: 8010,
        sound: 'fan_ziyise',
    };
    cfg.fan.fan.map_[8011] = {
        id: 8011,
        name_chs: '四暗刻',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 64,
        fan_fulu: 64,
        show_index: 8011,
        sound: 'fan_sianke',
    };
    cfg.fan.fan.map_[8012] = {
        id: 8012,
        name_chs: '一色双龙会',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 64,
        fan_fulu: 64,
        show_index: 8012,
        sound: '',
    };

    cfg.fan.fan.map_[8013] = {
        id: 8013,
        name_chs: '一色四同顺',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 32,
        fan_fulu: 32,
        show_index: 8013,
        sound: '',
    };
    cfg.fan.fan.map_[8014] = {
        id: 8014,
        name_chs: '一色四节高',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 32,
        fan_fulu: 32,
        show_index: 8014,
        sound: '',
    };

    cfg.fan.fan.map_[8015] = {
        id: 8015,
        name_chs: '一色四步高',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 32,
        fan_fulu: 32,
        show_index: 8015,
        sound: '',
    };
    cfg.fan.fan.map_[8016] = {
        id: 8016,
        name_chs: '三杠',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 32,
        fan_fulu: 32,
        show_index: 8016,
        sound: 'fan_sangangzi',
    };
    cfg.fan.fan.map_[8017] = {
        id: 8017,
        name_chs: '混幺九',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 32,
        fan_fulu: 32,
        show_index: 8017,
        sound: 'fan_hunlaotou',
    };

    cfg.fan.fan.map_[8018] = {
        id: 8018,
        name_chs: '七对',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 24,
        fan_fulu: 24,
        show_index: 8018,
        sound: 'fan_qiduizi',
    };
    cfg.fan.fan.map_[8019] = {
        id: 8019,
        name_chs: '七星不靠',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 24,
        fan_fulu: 24,
        show_index: 8019,
        sound: '',
    };
    cfg.fan.fan.map_[8020] = {
        id: 8020,
        name_chs: '全双刻',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 24,
        fan_fulu: 24,
        show_index: 8020,
        sound: '',
    };
    cfg.fan.fan.map_[8021] = {
        id: 8021,
        name_chs: '清一色',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 24,
        fan_fulu: 24,
        show_index: 8021,
        sound: 'fan_qingyise',
    };
    cfg.fan.fan.map_[8022] = {
        id: 8022,
        name_chs: '一色三同顺',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 24,
        fan_fulu: 24,
        show_index: 8022,
        sound: '',
    };
    cfg.fan.fan.map_[8023] = {
        id: 8023,
        name_chs: '一色三节高',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 24,
        fan_fulu: 24,
        show_index: 8023,
        sound: '',
    };
    cfg.fan.fan.map_[8024] = {
        id: 8024,
        name_chs: '全大',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 24,
        fan_fulu: 24,
        show_index: 8024,
        sound: '',
    };
    cfg.fan.fan.map_[8025] = {
        id: 8025,
        name_chs: '全中',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 24,
        fan_fulu: 24,
        show_index: 8025,
        sound: '',
    };
    cfg.fan.fan.map_[8026] = {
        id: 8026,
        name_chs: '全小',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 24,
        fan_fulu: 24,
        show_index: 8026,
        sound: '',
    };

    cfg.fan.fan.map_[8027] = {
        id: 8027,
        name_chs: '清龙',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 16,
        fan_fulu: 16,
        show_index: 8027,
        sound: 'fan_yiqitongguan',
    };
    cfg.fan.fan.map_[8028] = {
        id: 8028,
        name_chs: '三色双龙会',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 16,
        fan_fulu: 16,
        show_index: 8028,
        sound: '',
    };
    cfg.fan.fan.map_[8029] = {
        id: 8029,
        name_chs: '一色三步高',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 16,
        fan_fulu: 16,
        show_index: 8029,
        sound: '',
    };
    cfg.fan.fan.map_[8030] = {
        id: 8030,
        name_chs: '全带五',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 16,
        fan_fulu: 16,
        show_index: 8030,
        sound: '',
    };
    cfg.fan.fan.map_[8031] = {
        id: 8031,
        name_chs: '三同刻',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 16,
        fan_fulu: 16,
        show_index: 8031,
        sound: 'fan_sansetongke',
    };
    cfg.fan.fan.map_[8032] = {
        id: 8032,
        name_chs: '三暗刻',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 16,
        fan_fulu: 16,
        show_index: 8032,
        sound: 'fan_sananke',
    };

    cfg.fan.fan.map_[8033] = {
        id: 8033,
        name_chs: '全不靠',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 12,
        fan_fulu: 12,
        show_index: 8033,
        sound: '',
    };
    cfg.fan.fan.map_[8034] = {
        id: 8034,
        name_chs: '组合龙',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 12,
        fan_fulu: 12,
        show_index: 8034,
        sound: '',
    };
    cfg.fan.fan.map_[8035] = {
        id: 8035,
        name_chs: '大于五',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 12,
        fan_fulu: 12,
        show_index: 8035,
        sound: '',
    };
    cfg.fan.fan.map_[8036] = {
        id: 8036,
        name_chs: '小于五',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 12,
        fan_fulu: 12,
        show_index: 8036,
        sound: '',
    };
    cfg.fan.fan.map_[8037] = {
        id: 8037,
        name_chs: '三风刻',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 12,
        fan_fulu: 12,
        show_index: 8037,
        sound: '',
    };

    cfg.fan.fan.map_[8038] = {
        id: 8038,
        name_chs: '花龙',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 8,
        fan_fulu: 8,
        show_index: 8038,
        sound: '',
    };
    cfg.fan.fan.map_[8039] = {
        id: 8039,
        name_chs: '推不倒',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 8,
        fan_fulu: 8,
        show_index: 8039,
        sound: '',
    };
    cfg.fan.fan.map_[8040] = {
        id: 8040,
        name_chs: '三色三同顺',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 8,
        fan_fulu: 8,
        show_index: 8040,
        sound: 'fan_sansetongshun',
    };
    cfg.fan.fan.map_[8041] = {
        id: 8041,
        name_chs: '三色三节高',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 8,
        fan_fulu: 8,
        show_index: 8041,
        sound: '',
    };
    cfg.fan.fan.map_[8042] = {
        id: 8042,
        name_chs: '无番和',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 8,
        fan_fulu: 8,
        show_index: 8042,
        sound: '',
    };
    cfg.fan.fan.map_[8043] = {
        id: 8043,
        name_chs: '妙手回春',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 8,
        fan_fulu: 8,
        show_index: 8043,
        sound: 'fan_haidi',
    };
    cfg.fan.fan.map_[8044] = {
        id: 8044,
        name_chs: '海底捞月',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 8,
        fan_fulu: 8,
        show_index: 8044,
        sound: 'fan_hedi',
    };
    cfg.fan.fan.map_[8045] = {
        id: 8045,
        name_chs: '杠上开花',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 8,
        fan_fulu: 8,
        show_index: 8045,
        sound: 'fan_lingshang',
    };
    cfg.fan.fan.map_[8046] = {
        id: 8046,
        name_chs: '抢杠和',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 8,
        fan_fulu: 8,
        show_index: 8046,
        sound: 'fan_qianggang',
    };

    cfg.fan.fan.map_[8047] = {
        id: 8047,
        name_chs: '碰碰和',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 6,
        fan_fulu: 6,
        show_index: 8047,
        sound: 'fan_duiduihu',
    };
    cfg.fan.fan.map_[8048] = {
        id: 8048,
        name_chs: '混一色',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 6,
        fan_fulu: 6,
        show_index: 8048,
        sound: 'fan_hunyise',
    };
    cfg.fan.fan.map_[8049] = {
        id: 8049,
        name_chs: '三色三步高',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 6,
        fan_fulu: 6,
        show_index: 8049,
        sound: '',
    };
    cfg.fan.fan.map_[8050] = {
        id: 8050,
        name_chs: '五门齐',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 6,
        fan_fulu: 6,
        show_index: 8050,
        sound: '',
    };
    cfg.fan.fan.map_[8051] = {
        id: 8051,
        name_chs: '全求人',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 6,
        fan_fulu: 6,
        show_index: 8051,
        sound: '',
    };
    cfg.fan.fan.map_[8052] = {
        id: 8052,
        name_chs: '双暗杠',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 6,
        fan_fulu: 6,
        show_index: 8052,
        sound: '',
    };
    cfg.fan.fan.map_[8053] = {
        id: 8053,
        name_chs: '双箭刻',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 6,
        fan_fulu: 6,
        show_index: 8053,
        sound: '',
    };

    cfg.fan.fan.map_[8054] = {
        id: 8054,
        name_chs: '全带幺',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 4,
        fan_fulu: 4,
        show_index: 8054,
        sound: 'fan_hunquandaiyaojiu',
    };
    cfg.fan.fan.map_[8055] = {
        id: 8055,
        name_chs: '不求人',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 4,
        fan_fulu: 4,
        show_index: 8055,
        sound: 'fan_zimo',
    };
    cfg.fan.fan.map_[8056] = {
        id: 8056,
        name_chs: '双明杠',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 4,
        fan_fulu: 4,
        show_index: 8056,
        sound: '',
    };
    cfg.fan.fan.map_[8057] = {
        id: 8057,
        name_chs: '和绝张',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 4,
        fan_fulu: 4,
        show_index: 8057,
        sound: '',
    };

    cfg.fan.fan.map_[8058] = {
        id: 8058,
        name_chs: '箭刻 白',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 2,
        fan_fulu: 2,
        show_index: 8058,
        sound: 'fan_bai',
    };
    cfg.fan.fan.map_[8059] = {
        id: 8059,
        name_chs: '箭刻 发',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 2,
        fan_fulu: 2,
        show_index: 8059,
        sound: 'fan_fa',
    };
    cfg.fan.fan.map_[8060] = {
        id: 8060,
        name_chs: '箭刻 中',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 2,
        fan_fulu: 2,
        show_index: 8060,
        sound: 'fan_zhong',
    };
    cfg.fan.fan.map_[8061] = {
        id: 8061,
        name_chs: '圈风刻',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 2,
        fan_fulu: 2,
        show_index: 8061,
        sound: '',
    };
    cfg.fan.fan.map_[8062] = {
        id: 8062,
        name_chs: '门风刻',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 2,
        fan_fulu: 2,
        show_index: 8062,
        sound: '',
    };
    cfg.fan.fan.map_[8063] = {
        id: 8063,
        name_chs: '门前清',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 2,
        fan_fulu: 2,
        show_index: 8063,
        sound: '',
    };
    cfg.fan.fan.map_[8064] = {
        id: 8064,
        name_chs: '平和',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 2,
        fan_fulu: 2,
        show_index: 8064,
        sound: 'fan_pinghu',
    };
    cfg.fan.fan.map_[8065] = {
        id: 8065,
        name_chs: '四归一',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 2,
        fan_fulu: 2,
        show_index: 8065,
        sound: 'scfan_gen',
    };
    cfg.fan.fan.map_[8066] = {
        id: 8066,
        name_chs: '双同刻',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 2,
        fan_fulu: 2,
        show_index: 8066,
        sound: '',
    };
    cfg.fan.fan.map_[8067] = {
        id: 8067,
        name_chs: '双暗刻',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 2,
        fan_fulu: 2,
        show_index: 8067,
        sound: '',
    };
    cfg.fan.fan.map_[8068] = {
        id: 8068,
        name_chs: '暗杠',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 2,
        fan_fulu: 2,
        show_index: 8068,
        sound: '',
    };
    cfg.fan.fan.map_[8069] = {
        id: 8069,
        name_chs: '断幺',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 2,
        fan_fulu: 2,
        show_index: 8069,
        sound: 'fan_duanyao',
    };

    cfg.fan.fan.map_[8070] = {
        id: 8070,
        name_chs: '一般高',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 1,
        fan_fulu: 1,
        show_index: 8070,
        sound: 'fan_yibeikou',
    };
    cfg.fan.fan.map_[8071] = {
        id: 8071,
        name_chs: '喜相逢',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 1,
        fan_fulu: 1,
        show_index: 8071,
        sound: '',
    };
    cfg.fan.fan.map_[8072] = {
        id: 8072,
        name_chs: '连六',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 1,
        fan_fulu: 1,
        show_index: 8072,
        sound: '',
    };
    cfg.fan.fan.map_[8073] = {
        id: 8073,
        name_chs: '老少副',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 1,
        fan_fulu: 1,
        show_index: 8073,
        sound: '',
    };
    cfg.fan.fan.map_[8074] = {
        id: 8074,
        name_chs: '幺九刻',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 1,
        fan_fulu: 1,
        show_index: 8074,
        sound: '',
    };
    cfg.fan.fan.map_[8075] = {
        id: 8075,
        name_chs: '明杠',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 1,
        fan_fulu: 1,
        show_index: 8075,
        sound: '',
    };
    cfg.fan.fan.map_[8076] = {
        id: 8076,
        name_chs: '缺一门',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 1,
        fan_fulu: 1,
        show_index: 8076,
        sound: '',
    };
    cfg.fan.fan.map_[8077] = {
        id: 8077,
        name_chs: '无字',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 1,
        fan_fulu: 1,
        show_index: 8077,
        sound: '',
    };
    cfg.fan.fan.map_[8078] = {
        id: 8078,
        name_chs: '边张',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 1,
        fan_fulu: 1,
        show_index: 8078,
        sound: '',
    };
    cfg.fan.fan.map_[8079] = {
        id: 8079,
        name_chs: '坎张',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 1,
        fan_fulu: 1,
        show_index: 8079,
        sound: '',
    };
    cfg.fan.fan.map_[8080] = {
        id: 8080,
        name_chs: '单钓将',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 1,
        fan_fulu: 1,
        show_index: 8080,
        sound: '',
    };
    cfg.fan.fan.map_[8081] = {
        id: 8081,
        name_chs: '自摸',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 1,
        fan_fulu: 1,
        show_index: 8081,
        sound: 'fan_zimo',
    };

    cfg.fan.fan.map_[8082] = {
        id: 8082,
        name_chs: '明暗杠',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 6,
        fan_fulu: 6,
        show_index: 8082,
        sound: '',
    };

    cfg.fan.fan.map_[8083] = {
        id: 8083,
        name_chs: '天和',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 8,
        fan_fulu: 8,
        show_index: 8083,
        sound: 'fan_tianhu',
    };
    cfg.fan.fan.map_[8084] = {
        id: 8084,
        name_chs: '地和',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 6,
        fan_fulu: 6,
        show_index: 8084,
        sound: 'fan_dihu',
    };
    cfg.fan.fan.map_[8085] = {
        id: 8085,
        name_chs: '人和',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 6,
        fan_fulu: 6,
        show_index: 8085,
        sound: '',
    };

// 花牌1-8, 以及'一大堆'情况
    cfg.fan.fan.map_[8091] = {
        id: 8091,
        name_chs: '花牌',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 1,
        fan_fulu: 1,
        show_index: 8091,
        sound: 'fan_dora1',
    };
    cfg.fan.fan.map_[8092] = {
        id: 8092,
        name_chs: '花牌',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 2,
        fan_fulu: 2,
        show_index: 8092,
        sound: 'fan_dora2',
    };
    cfg.fan.fan.map_[8093] = {
        id: 8093,
        name_chs: '花牌',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 3,
        fan_fulu: 3,
        show_index: 8093,
        sound: 'fan_dora3',
    };
    cfg.fan.fan.map_[8094] = {
        id: 8094,
        name_chs: '花牌',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 4,
        fan_fulu: 4,
        show_index: 8094,
        sound: 'fan_dora4',
    };
    cfg.fan.fan.map_[8095] = {
        id: 8095,
        name_chs: '花牌',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 5,
        fan_fulu: 5,
        show_index: 8095,
        sound: 'fan_dora5',
    };
    cfg.fan.fan.map_[8096] = {
        id: 8096,
        name_chs: '花牌',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 6,
        fan_fulu: 6,
        show_index: 8096,
        sound: 'fan_dora6',
    };
    cfg.fan.fan.map_[8097] = {
        id: 8097,
        name_chs: '花牌',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 7,
        fan_fulu: 7,
        show_index: 8097,
        sound: 'fan_dora7',
    };
    cfg.fan.fan.map_[8098] = {
        id: 8098,
        name_chs: '花牌',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 1,
        fan_fulu: 1,
        show_index: 8098,
        sound: 'fan_dora8',
    };
    cfg.fan.fan.map_[8099] = {
        id: 8099,
        name_chs: '花牌',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 1,
        fan_fulu: 1,
        show_index: 8099,
        sound: 'fan_dora13',
    };
};

// 常量集合
export class Constants {
    // 亲家起手牌数量
    public static readonly QIN_TILE_NUM = 14;
    // 闲家起手牌数量
    public static readonly XIAN_TILE_NUM = 13;
    // 特殊牌的后缀
    public static readonly SPT_SUFFIX = 't';
    // 特殊牌和普通牌数字编码的差值
    public static readonly SPT_OFFSET = 40;
    // 国标麻将起和番
    public static readonly GB_BASE_FAN = 8;
    // 万象修罗百搭牌编码
    public static readonly TBD = 'bd';
    // 国标麻将起和番
    public static readonly HUAPAI = '0m';
    // 万象修罗百搭牌数字编码
    public static readonly CBD = 0;
    // 常用牌的数字编码
    public static readonly TILE_NUM = Object.freeze({
        C1m: 1,
        C9m: 9,
        C1p: 10,
        C9p: 18,
        C1s: 19,
        C9s: 27,
        C1z: 28,
        C4z: 31,
        C5z: 32,
        C7z: 34,
        C0m: 35,
        C0p: 36,
        C0s: 37,
        C5m: 5,
        C5p: 14,
        C5s: 23,
    });

    /**
     * 顺子中比它大的牌, 如果某张牌的数字编码(不区分红宝牌)为 i, 则由它构成的顺子中比它大1的牌的数字编码为 NXT2[i]
     *
     * 故可得出 即 j, NXT2[j], NXT2[NXT2[j]] 构成递增的顺子
     *
     * 如果不存在, 则指向 35, 36
     *
     * 数组长度为37
     */
    public static readonly NXT2: readonly number[] = [0, 2, 3, 4, 5, 6, 7, 8, 9, 35, 11, 12, 13, 14, 15, 16, 17, 18, 35, 20, 21, 22, 23, 24, 25, 26, 27, 35, 35, 35, 35, 35, 35, 35, 35, 36, 0];

    /**
     * 宝牌指示牌表, 如果某张指示牌的数字编码(不区分红宝牌)为 i, 则它对应的宝牌的数字编码为 DORA_NXT[i]
     *
     * 数组长度35
     */
    public static readonly DORA_NXT: readonly number[] = [0, 2, 3, 4, 5, 6, 7, 8, 9, 1, 11, 12, 13, 14, 15, 16, 17, 18, 10, 20, 21, 22, 23, 24, 25, 26, 27, 19, 29, 30, 31, 28, 33, 34, 32];
}
