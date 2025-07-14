loadproject();

player_datas[0].nickname = '宫永咲';
player_datas[1].nickname = '原村和';
player_datas[2].nickname = '天江衣';
player_datas[3].nickname = '宫永照';
player_datas[0].avatar_id = 403401;
player_datas[1].avatar_id = 403501;
player_datas[2].avatar_id = 403601;
player_datas[3].avatar_id = 403701;

player_datas[0].views = player_datas[1].views = player_datas[2].views = player_datas[3].views = [
    {'slot': 0, 'item_id': 308003}, // 立直棒-墨西哥卷饼
    {'slot': 1, 'item_id': 308001}, // 和牌-龙卷雷霆
    {'slot': 2, 'item_id': 308002}, // 立直-花天月地
    {'slot': 6, 'item_id': 308004}, // 桌布-赛间小憩
    {'slot': 7, 'item_id': 308005}, // 牌背-艾托企鹅
];

config = {
    'category': 1,
    'meta': {'mode_id': 0},
    'mode': {
        'mode': 1,
        'detail_rule': {
            'init_point': 100000,
            '_tablecloth_id': 308004, // 桌布-赛间小憩
            '_mjp_id': 308005, // 牌背-艾托企鹅
        }
    }
};

// 示例对局
demogame();
