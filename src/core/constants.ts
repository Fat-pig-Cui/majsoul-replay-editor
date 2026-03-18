/**
 * @file: constants.ts - 一些常量和自制的番种信息
 * @author: Fat-pig-Cui
 * @email: chubbypig@qq.com
 * @github: https://github.com/Fat-pig-Cui/majsoul-replay-editor
 */

// 常量集合
export class Constants {
    // 亲家起手牌数量
    public static readonly QIN_TILE_NUM = 14;
    // 闲家起手牌数量
    public static readonly XIAN_TILE_NUM = 13;
    // 任何情况下牌山的最大长度
    public static readonly PAISHAN_MAX_LEN = 136;
    // 满贯的素点
    public static readonly MANGUAN_SUDIAN = 2000;
    // 役满的素点
    public static readonly YIMAN_SUDIAN = 8000;
    // 立直诈和的素点(赔满贯)
    public static readonly ZHAHU_SUDIAN = -2000;
    // 川麻诈和的素点(赔6番)
    public static readonly ZHAHU_SUDIAN_CHUANMA = -32000;
    // 特殊牌的后缀
    public static readonly SPT_SUFFIX = 't';
    // 国标麻将起和番
    public static readonly GB_BASE_FAN = 8;
    // 万象修罗百搭牌编码
    public static readonly TBD = 'bd';
    // 国标麻将花牌编码
    public static readonly HUAPAI = '0m';
    // 麻将牌的四种类型
    public static readonly GROUP: readonly [string, string, string, string] = ['m', 'p', 's', 'z'];

    public static readonly MAN_MID_TILE: readonly Tile[] = ['2m', '3m', '4m', '5m', '6m', '7m', '8m'];
    public static readonly MAN_TER_TILE: readonly Tile[] = ['1m', '9m'];
    public static readonly AKA_MAN_TILE: readonly Tile[] = ['0m'];

    public static readonly MAN_TILE_NO_AKA: readonly Tile[] = [...Constants.MAN_MID_TILE, ...Constants.MAN_TER_TILE];
    public static readonly MAN_TILE: readonly Tile[] = [...Constants.MAN_TILE_NO_AKA, ...Constants.AKA_MAN_TILE];

    public static readonly PIN_MID_TILE: readonly Tile[] = ['2p', '3p', '4p', '5p', '6p', '7p', '8p'];
    public static readonly PIN_TER_TILE: readonly Tile[] = ['1p', '9p'];
    public static readonly AKA_PIN_TILE: readonly Tile[] = ['0p'];

    public static readonly PIN_TILE_NO_AKA: readonly Tile[] = [...Constants.PIN_MID_TILE, ...Constants.PIN_TER_TILE];
    public static readonly PIN_TILE: readonly Tile[] = [...Constants.PIN_TILE_NO_AKA, ...Constants.AKA_PIN_TILE];

    public static readonly SOU_MID_TILE: readonly Tile[] = ['2s', '3s', '4s', '5s', '6s', '7s', '8s'];
    public static readonly SOU_TER_TILE: readonly Tile[] = ['1s', '9s'];
    public static readonly AKA_SOU_TILE: readonly Tile[] = ['0s'];

    public static readonly SOU_TILE_NO_AKA: readonly Tile[] = [...Constants.SOU_MID_TILE, ...Constants.SOU_TER_TILE];
    public static readonly SOU_TILE: readonly Tile[] = [...Constants.SOU_TILE_NO_AKA, ...Constants.AKA_SOU_TILE];

    public static readonly WIND_TILE: readonly Tile[] = ['1z', '2z', '3z', '4z'];
    public static readonly DRAGON_TILE: readonly Tile[] = ['5z', '6z', '7z'];
    public static readonly HONOR_TILE: readonly Tile[] = [...Constants.WIND_TILE, ...Constants.DRAGON_TILE];

    public static readonly TERMINAL_TILE: readonly Tile[] = [...Constants.MAN_TER_TILE, ...Constants.PIN_TER_TILE, ...Constants.SOU_TER_TILE];
    public static readonly YAOJIU_TILE: readonly Tile[] = [...Constants.TERMINAL_TILE, ...Constants.HONOR_TILE];

    public static readonly AKA_TILE: readonly Tile[] = [...Constants.AKA_MAN_TILE, ...Constants.AKA_PIN_TILE, ...Constants.AKA_SOU_TILE];

    public static readonly TILE_NO_AKA: readonly Tile[] = [
        ...Constants.MAN_TILE_NO_AKA,
        ...Constants.PIN_TILE_NO_AKA,
        ...Constants.SOU_TILE_NO_AKA,
        ...Constants.HONOR_TILE,
    ];

    public static readonly TILE: readonly Tile[] = [
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
    public static readonly NXT2 = {
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
    public static readonly DORA_NXT = {
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
    public static readonly GB_CONDITIONS: readonly Tile[][] = [
        ['1m', '4m', '7m', '2p', '5p', '8p', '3s', '6s', '9s'],
        ['1m', '4m', '7m', '3p', '6p', '9p', '2s', '5s', '8s'],
        ['2m', '5m', '8m', '3p', '6p', '9p', '1s', '4s', '7s'],
        ['2m', '5m', '8m', '1p', '4p', '7p', '3s', '6s', '9s'],
        ['3m', '6m', '9m', '1p', '4p', '7p', '2s', '5s', '8s'],
        ['3m', '6m', '9m', '2p', '5p', '8p', '1s', '4s', '7s'],
    ];
}

// 自定义番种: 役种名称的汉字需要在已有的里面选, 否则不会显示
export const DIYFans = (): void => {
    const _ = cfg.fan.fan.map_;
    // 9000: 诈和, '诈'字无法显示, 原名称为'振和'
    // 9001: 天地创造: '创造'无法显示, 原名称为'天地大白'
    // 9002: 万物生长: '万生长'无法显示, 原名称为'龙发杠载'
    // 9003: 开立直(役满): 对应语音是对局中的宣言立直
    // 9004: 开两立直(役满): 对应语音是对局中的宣言两立直
    // 9005: 开立直(2番)
    // 9006: 开两立直(3番)
    _[9000] = {id: 9000, name_chs: '诈和', show_index: 5, sound: ''};
    _[9001] = {id: 9001, name_chs: '天地创造', show_index: 6, sound: ''};
    _[9002] = {id: 9002, name_chs: '万物生长', show_index: 7, sound: ''};
    _[9003] = {id: 9003, name_chs: '役满 开立直', show_index: 0, sound: 'act_rich'};
    _[9004] = {id: 9004, name_chs: '役满 开两立直', show_index: 0, sound: 'act_drich'};
    _[9005] = {id: 9005, name_chs: '开立直', show_index: 0, sound: 'fan_liqi'};
    _[9006] = {id: 9006, name_chs: '开两立直', show_index: 0, sound: 'fan_dliqi'};

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
    _[9100] = {id: 9100, name_chs: '流局满贯', show_index: 1000, sound: 'fan_liujumanguan'};
    _[9101] = {id: 9101, name_chs: '役牌 东', show_index: 150, sound: 'fan_dong'};
    _[9102] = {id: 9102, name_chs: '役牌 连东', show_index: 150, sound: 'fan_doubledong'};
    _[9103] = {id: 9103, name_chs: '役牌 南', show_index: 150, sound: 'fan_nan'};
    _[9104] = {id: 9104, name_chs: '役牌 连南', show_index: 150, sound: 'fan_doublenan'};
    _[9105] = {id: 9105, name_chs: '役牌 西', show_index: 150, sound: 'fan_xi'};
    _[9106] = {id: 9106, name_chs: '役牌 连西', show_index: 150, sound: 'fan_doublexi'};
    _[9107] = {id: 9107, name_chs: '役牌 北', show_index: 160, sound: 'fan_bei'};
    _[9108] = {id: 9108, name_chs: '役牌 连北', show_index: 160, sound: 'fan_doublebei'};

    // 对局操作语音, 中间会有较长时间的停顿
    // 9200: 立直
    // 9201: 两立直
    // 9202: 吃
    // 9203: 碰
    // 9204: 杠
    // 9205: 拔北
    // 9206: 荣, '荣'无法显示, 原名称为'点和'
    // 9207: 自摸
    _[9200] = {id: 9200, name_chs: '立直', show_index: 0, sound: 'act_rich'};
    _[9201] = {id: 9200, name_chs: '双立直', show_index: 0, sound: 'act_drich'};
    _[9202] = {id: 9202, name_chs: '吃', show_index: 0, sound: 'act_chi'};
    _[9203] = {id: 9203, name_chs: '碰', show_index: 0, sound: 'act_pon'};
    _[9204] = {id: 9204, name_chs: '杠', show_index: 0, sound: 'act_kan'};
    _[9205] = {id: 9205, name_chs: '拔北', show_index: 0, sound: 'act_babei'};
    _[9206] = {id: 9206, name_chs: '荣和', show_index: 0, sound: 'act_ron'};
    _[9207] = {id: 9207, name_chs: '自摸', show_index: 0, sound: 'act_tumo'};
    _[9208] = {id: 9208, name_chs: '对局开始', show_index: 9999, sound: 'ingame_start'};
    // 9209: 终局一位语音(天地无双指一姬的)
    _[9209] = {id: 9209, name_chs: '天地无双', show_index: 9999, sound: 'game_top'};
    _[9210] = {id: 9210, name_chs: '荣和获胜', show_index: 9999, sound: 'game_top_ron'};
    _[9211] = {id: 9211, name_chs: '高分获胜', show_index: 9999, sound: 'game_top_big'};

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
    _[9300] = {id: 9300, name_chs: '满贯', show_index: 2000, sound: 'gameend_manguan'};
    _[9301] = {id: 9301, name_chs: '跳满', show_index: 2000, sound: 'gameend_tiaoman'};
    _[9302] = {id: 9302, name_chs: '倍满', show_index: 2000, sound: 'gameend_beiman'};
    _[9303] = {id: 9303, name_chs: '三倍满', show_index: 2000, sound: 'gameend_sanbeiman'};
    _[9304] = {id: 9304, name_chs: '役满', show_index: 2000, sound: 'gameend_yiman1'};
    _[9305] = {id: 9305, name_chs: '两倍役满', show_index: 2000, sound: 'gameend_yiman2'};
    _[9306] = {id: 9306, name_chs: '三倍役满', show_index: 2000, sound: 'gameend_yiman3'};
    _[9307] = {id: 9307, name_chs: '四倍役满', show_index: 2000, sound: 'gameend_yiman4'};
    _[9308] = {id: 9308, name_chs: '五倍役满', show_index: 2000, sound: 'gameend_yiman5'};
    _[9309] = {id: 9309, name_chs: '六倍役满', show_index: 2000, sound: 'gameend_yiman6'};
    _[9310] = {id: 9310, name_chs: '累计役满', show_index: 2000, sound: 'gameend_leijiyiman'};
    _[9311] = {id: 9311, name_chs: '听牌', show_index: 2000, sound: 'gameend_tingpai'};
    _[9312] = {id: 9310, name_chs: '未听牌', show_index: 2000, sound: 'gameend_noting'};

    // 流局语音, 这里可以穿插到川麻的番种中
    // 9400: 四风连打
    // 9400: 四杠散了, '散'无法显示
    // 9400: 九种九牌, '种'无法显示
    _[9400] = {id: 9400, name_chs: '四风连打', show_index: 2000, sound: 'gameend_sifenglianda'};
    _[9401] = {id: 9401, name_chs: '四杠散了', show_index: 2000, sound: 'gameend_sigangliuju'};
    _[9402] = {id: 9402, name_chs: '四家立直', show_index: 2000, sound: 'gameend_sijializhi'};
    _[9403] = {id: 9403, name_chs: '九种九牌', show_index: 2000, sound: 'gameend_jiuzhongjiupai'};

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
    _[9500] = {id: 9500, name_chs: '获得语音', show_index: 0, sound: 'lobby_selfintro'};
    _[9501] = {id: 9501, name_chs: '登录语音普通', show_index: 0, sound: 'lobby_playerlogin'};
    _[9502] = {id: 9502, name_chs: '登录语音满羁绊', show_index: 2000, sound: 'lobby_playerlogin'};
    _[9503] = {id: 9503, name_chs: '大厅交互语音1', show_index: 0, sound: 'lobby_normal'};
    _[9504] = {id: 9504, name_chs: '大厅交互语音2', show_index: 0, sound: 'lobby_normal'};
    _[9505] = {id: 9505, name_chs: '大厅交互语音3', show_index: 0, sound: 'lobby_normal'};
    _[9506] = {id: 9506, name_chs: '大厅交互语音4', show_index: 0, sound: 'lobby_normal'};
    _[9507] = {id: 9507, name_chs: '大厅交互语音5', show_index: 0, sound: 'lobby_normal'};
    _[9508] = {id: 9508, name_chs: '大厅交互语音6', show_index: 0, sound: 'lobby_normal'};
    _[9509] = {id: 9509, name_chs: '大厅交互语音7', show_index: 0, sound: 'lobby_normal'};
    _[9510] = {id: 9510, name_chs: '大厅交互语音8', show_index: 0, sound: 'lobby_normal'};
    _[9511] = {id: 9511, name_chs: '送礼物语音普通', show_index: 0, sound: 'lobby_gift'};
    _[9512] = {id: 9512, name_chs: '送礼物语音喜好', show_index: 0, sound: 'lobby_gift_favor'};
    _[9513] = {id: 9513, name_chs: '好感度升级语音1', show_index: 0, sound: 'lobby_levelup1'};
    _[9514] = {id: 9514, name_chs: '好感度升级语音2', show_index: 0, sound: 'lobby_levelup2'};
    _[9515] = {id: 9515, name_chs: '好感度升级语音3', show_index: 0, sound: 'lobby_levelup3'};
    _[9516] = {id: 9516, name_chs: '好感度升级语音4', show_index: 0, sound: 'lobby_levelup4'};
    // _[9517] = { id: 9517, name_chs: '好感度升级语音5', show_index: 0, sound: 'lobby_levelmax' };
    _[9517] = {id: 9517, name_chs: '好感度升级语音5', show_index: 0, sound: 'lobby_manjiban'};
    _[9518] = {id: 9518, name_chs: '契约语音', show_index: 0, sound: 'lobby_qiyue'};
    _[9519] = {id: 9519, name_chs: '新年语音', show_index: 0, sound: 'lobby_newyear'};
    _[9520] = {id: 9520, name_chs: '情人节语音', show_index: 0, sound: 'lobby_valentine'};

    // 对局契约特殊语音
    // 9600: 连续打出多张相同牌, '续出多张'无法显示
    // 9600: 打出宝牌, '出'无法显示
    // 9600: 余牌少于10, '余少于'无法显示
    // 9600: 役满听牌, '听'无法显示
    // 9600: 倍满/三倍满听牌, '倍听'无法显示
    _[9600] = {id: 9600, name_chs: '连续打出多张相同牌', show_index: 0, sound: 'ingame_lianda'};
    _[9601] = {id: 9601, name_chs: '打出宝牌', show_index: 0, sound: 'ingame_baopai'};
    _[9602] = {id: 9602, name_chs: '余牌少于10', show_index: 0, sound: 'ingame_remain10'};
    _[9603] = {id: 9603, name_chs: '役满听牌', show_index: 0, sound: 'ingame_yiman'};
    _[9604] = {id: 9604, name_chs: '倍满/三倍满听牌', show_index: 0, sound: 'ingame_beiman'};
    _[9605] = {id: 9605, name_chs: '进入友人房', show_index: 0, sound: 'lobby_room_in'};
    _[9606] = {id: 9606, name_chs: '友人房内准备', show_index: 0, sound: 'lobby_room_ready'};

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
    _[9700] = {id: 9700, name_chs: '推不倒', show_index: 0, sound: ''};
    _[9701] = {id: 9701, name_chs: '赤三色', show_index: 0, sound: ''};
    _[9702] = {id: 9702, name_chs: '三色通贯', show_index: 0, sound: ''};
    _[9703] = {id: 9703, name_chs: '四连刻', show_index: 0, sound: ''};
    _[9704] = {id: 9704, name_chs: '一色四同顺', show_index: 0, sound: ''};
    _[9705] = {id: 9705, name_chs: '红孔雀', show_index: 0, sound: ''};
    _[9706] = {id: 9706, name_chs: '红一点', show_index: 0, sound: ''};
    _[9707] = {id: 9707, name_chs: '黑一色', show_index: 0, sound: ''};
    _[9708] = {id: 9708, name_chs: '十三不搭', show_index: 0, sound: ''};
    _[9709] = {id: 9709, name_chs: '百万石', show_index: 0, sound: ''};
    _[9710] = {id: 9710, name_chs: '金门桥', show_index: 0, sound: ''};
    _[9711] = {id: 9711, name_chs: '东北新干线', show_index: 0, sound: ''};
    _[9712] = {id: 9712, name_chs: '无发绿一色', show_index: 0, sound: 'fan_lvyise'};

    const ids = [
        9000, 9001, 9002, 9003, 9004, 9005, 9006,
        9100, 9101, 9102, 9103, 9104, 9105, 9106, 9107, 9108,
        9200, 9201, 9202, 9203, 9204, 9205, 9206, 9207, 9208, 9209, 9210, 9211,
        9300, 9301, 9302, 9303, 9304, 9305, 9306, 9307, 9308, 9309, 9310, 9311, 9312,
        9400, 9401, 9402, 9403,
        9500, 9501, 9502, 9503, 9504, 9505, 9506, 9507, 9508, 9509, 9510, 9511, 9512, 9513, 9514, 9515, 9516, 9517, 9518, 9519, 9520,
        9600, 9601, 9602, 9603, 9604, 9605, 9606,
        9700, 9701, 9702, 9703, 9704, 9705, 9706, 9707, 9708, 9709, 9710, 9711, 9712
    ];
    for (const id of ids)
        _[id].name_chs_t = _[id].name_jp = _[id].name_en = '';
};

// 国标麻将番种
export const guobiaoFans = (): void => {
    const _ = cfg.fan.fan.map_;
    _[8000] = {id: 8000, name_chs: '大四喜', show_index: 8000, sound: 'fan_dasixi'};
    _[8001] = {id: 8001, name_chs: '大三元', show_index: 8001, sound: 'fan_dasanyuan'};
    _[8002] = {id: 8002, name_chs: '绿一色', show_index: 8002, sound: 'fan_lvyise'};
    _[8003] = {id: 8003, name_chs: '九莲宝灯', show_index: 8003, sound: 'fan_jiulianbaodeng'};
    _[8004] = {id: 8004, name_chs: '四杠', show_index: 8004, sound: 'fan_sigangzi'};
    _[8005] = {id: 8005, name_chs: '连七对', show_index: 8005, sound: ''};
    _[8006] = {id: 8006, name_chs: '十三幺', show_index: 8006, sound: 'fan_guoshiwushuang'};

    _[8007] = {id: 8007, name_chs: '清幺九', show_index: 8007, sound: 'fan_qinglaotou'};
    _[8008] = {id: 8008, name_chs: '小四喜', show_index: 8008, sound: 'fan_xiaosixi'};
    _[8009] = {id: 8009, name_chs: '小三元', show_index: 8009, sound: 'fan_xiaosanyuan'};
    _[8010] = {id: 8010, name_chs: '字一色', show_index: 8010, sound: 'fan_ziyise'};
    _[8011] = {id: 8011, name_chs: '四暗刻', show_index: 8011, sound: 'fan_sianke'};
    _[8012] = {id: 8012, name_chs: '一色双龙会', show_index: 8012, sound: ''};

    _[8013] = {id: 8013, name_chs: '一色四同顺', show_index: 8013, sound: ''};
    _[8014] = {id: 8014, name_chs: '一色四节高', show_index: 8014, sound: ''};

    _[8015] = {id: 8015, name_chs: '一色四步高', show_index: 8015, sound: ''};
    _[8016] = {id: 8016, name_chs: '三杠', show_index: 8016, sound: 'fan_sangangzi'};
    _[8017] = {id: 8017, name_chs: '混幺九', show_index: 8017, sound: 'fan_hunlaotou'};

    _[8018] = {id: 8018, name_chs: '七对', show_index: 8018, sound: 'fan_qiduizi'};
    _[8019] = {id: 8019, name_chs: '七星不靠', show_index: 8019, sound: ''};
    _[8020] = {id: 8020, name_chs: '全双刻', show_index: 8020, sound: ''};
    _[8021] = {id: 8021, name_chs: '清一色', show_index: 8021, sound: 'fan_qingyise'};
    _[8022] = {id: 8022, name_chs: '一色三同顺', show_index: 8022, sound: ''};
    _[8023] = {id: 8023, name_chs: '一色三节高', show_index: 8023, sound: ''};
    _[8024] = {id: 8024, name_chs: '全大', show_index: 8024, sound: ''};
    _[8025] = {id: 8025, name_chs: '全中', show_index: 8025, sound: ''};
    _[8026] = {id: 8026, name_chs: '全小', show_index: 8026, sound: ''};

    _[8027] = {id: 8027, name_chs: '清龙', show_index: 8027, sound: 'fan_yiqitongguan'};
    _[8028] = {id: 8028, name_chs: '三色双龙会', show_index: 8028, sound: ''};
    _[8029] = {id: 8029, name_chs: '一色三步高', show_index: 8029, sound: ''};
    _[8030] = {id: 8030, name_chs: '全带五', show_index: 8030, sound: ''};
    _[8031] = {id: 8031, name_chs: '三同刻', show_index: 8031, sound: 'fan_sansetongke'};
    _[8032] = {id: 8032, name_chs: '三暗刻', show_index: 8032, sound: 'fan_sananke'};

    _[8033] = {id: 8033, name_chs: '全不靠', show_index: 8033, sound: ''};
    _[8034] = {id: 8034, name_chs: '组合龙', show_index: 8034, sound: ''};
    _[8035] = {id: 8035, name_chs: '大于五', show_index: 8035, sound: ''};
    _[8036] = {id: 8036, name_chs: '小于五', show_index: 8036, sound: ''};
    _[8037] = {id: 8037, name_chs: '三风刻', show_index: 8037, sound: ''};

    _[8038] = {id: 8038, name_chs: '花龙', show_index: 8038, sound: ''};
    _[8039] = {id: 8039, name_chs: '推不倒', show_index: 8039, sound: ''};
    _[8040] = {id: 8040, name_chs: '三色三同顺', show_index: 8040, sound: 'fan_sansetongshun'};
    _[8041] = {id: 8041, name_chs: '三色三节高', show_index: 8041, sound: ''};
    _[8042] = {id: 8042, name_chs: '无番和', show_index: 8042, sound: ''};
    _[8043] = {id: 8043, name_chs: '妙手回春', show_index: 8043, sound: 'fan_haidi'};
    _[8044] = {id: 8044, name_chs: '海底捞月', show_index: 8044, sound: 'fan_hedi'};
    _[8045] = {id: 8045, name_chs: '杠上开花', show_index: 8045, sound: 'fan_lingshang'};
    _[8046] = {id: 8046, name_chs: '抢杠和', show_index: 8046, sound: 'fan_qianggang'};

    _[8047] = {id: 8047, name_chs: '碰碰和', show_index: 8047, sound: 'fan_duiduihu'};
    _[8048] = {id: 8048, name_chs: '混一色', show_index: 8048, sound: 'fan_hunyise'};
    _[8049] = {id: 8049, name_chs: '三色三步高', show_index: 8049, sound: ''};
    _[8050] = {id: 8050, name_chs: '五门齐', show_index: 8050, sound: ''};
    _[8051] = {id: 8051, name_chs: '全求人', show_index: 8051, sound: ''};
    _[8052] = {id: 8052, name_chs: '双暗杠', show_index: 8052, sound: ''};
    _[8053] = {id: 8053, name_chs: '双箭刻', show_index: 8053, sound: ''};

    _[8054] = {id: 8054, name_chs: '全带幺', show_index: 8054, sound: 'fan_hunquandaiyaojiu'};
    _[8055] = {id: 8055, name_chs: '不求人', show_index: 8055, sound: 'fan_zimo'};
    _[8056] = {id: 8056, name_chs: '双明杠', show_index: 8056, sound: ''};
    _[8057] = {id: 8057, name_chs: '和绝张', show_index: 8057, sound: ''};

    _[8058] = {id: 8058, name_chs: '箭刻 白', show_index: 8058, sound: 'fan_bai'};
    _[8059] = {id: 8059, name_chs: '箭刻 发', show_index: 8059, sound: 'fan_fa'};
    _[8060] = {id: 8060, name_chs: '箭刻 中', show_index: 8060, sound: 'fan_zhong'};
    _[8061] = {id: 8061, name_chs: '圈风刻', show_index: 8061, sound: ''};
    _[8062] = {id: 8062, name_chs: '门风刻', show_index: 8062, sound: ''};
    _[8063] = {id: 8063, name_chs: '门前清', show_index: 8063, sound: ''};
    _[8064] = {id: 8064, name_chs: '平和', show_index: 8064, sound: 'fan_pinghu'};
    _[8065] = {id: 8065, name_chs: '四归一', show_index: 8065, sound: 'scfan_gen'};
    _[8066] = {id: 8066, name_chs: '双同刻', show_index: 8066, sound: ''};
    _[8067] = {id: 8067, name_chs: '双暗刻', show_index: 8067, sound: ''};
    _[8068] = {id: 8068, name_chs: '暗杠', show_index: 8068, sound: ''};
    _[8069] = {id: 8069, name_chs: '断幺', show_index: 8069, sound: 'fan_duanyao'};

    _[8070] = {id: 8070, name_chs: '一般高', show_index: 8070, sound: 'fan_yibeikou'};
    _[8071] = {id: 8071, name_chs: '喜相逢', show_index: 8071, sound: ''};
    _[8072] = {id: 8072, name_chs: '连六', show_index: 8072, sound: ''};
    _[8073] = {id: 8073, name_chs: '老少副', show_index: 8073, sound: ''};
    _[8074] = {id: 8074, name_chs: '幺九刻', show_index: 8074, sound: ''};
    _[8075] = {id: 8075, name_chs: '明杠', show_index: 8075, sound: ''};
    _[8076] = {id: 8076, name_chs: '缺一门', show_index: 8076, sound: ''};
    _[8077] = {id: 8077, name_chs: '无字', show_index: 8077, sound: ''};
    _[8078] = {id: 8078, name_chs: '边张', show_index: 8078, sound: ''};
    _[8079] = {id: 8079, name_chs: '坎张', show_index: 8079, sound: ''};
    _[8080] = {id: 8080, name_chs: '单钓将', show_index: 8080, sound: ''};
    _[8081] = {id: 8081, name_chs: '自摸', show_index: 8081, sound: 'fan_zimo'};

    _[8082] = {id: 8082, name_chs: '明暗杠', show_index: 8082, sound: ''};
    _[8083] = {id: 8083, name_chs: '天和', show_index: 8083, sound: 'fan_tianhu'};
    _[8084] = {id: 8084, name_chs: '地和', show_index: 8084, sound: 'fan_dihu'};
    _[8085] = {id: 8085, name_chs: '人和', show_index: 8085, sound: ''};

    // 花牌1-8, 以及'一大堆'情况
    _[8091] = {id: 8091, name_chs: '花牌', show_index: 8091, sound: 'fan_dora1'};
    _[8092] = {id: 8092, name_chs: '花牌', show_index: 8092, sound: 'fan_dora2'};
    _[8093] = {id: 8093, name_chs: '花牌', show_index: 8093, sound: 'fan_dora3'};
    _[8094] = {id: 8094, name_chs: '花牌', show_index: 8094, sound: 'fan_dora4'};
    _[8095] = {id: 8095, name_chs: '花牌', show_index: 8095, sound: 'fan_dora5'};
    _[8096] = {id: 8096, name_chs: '花牌', show_index: 8096, sound: 'fan_dora6'};
    _[8097] = {id: 8097, name_chs: '花牌', show_index: 8097, sound: 'fan_dora7'};
    _[8098] = {id: 8098, name_chs: '花牌', show_index: 8098, sound: 'fan_dora8'};
    _[8099] = {id: 8099, name_chs: '花牌', show_index: 8099, sound: 'fan_dora13'};

    const ids = [
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
    ];
    for (const id of ids)
        _[id].name_chs_t = _[id].name_jp = _[id].name_en = '';
};
