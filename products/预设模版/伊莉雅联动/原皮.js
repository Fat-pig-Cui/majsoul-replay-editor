clearproject();

player_datas[0].nickname = '伊莉雅';
player_datas[1].nickname = '美游';
player_datas[2].nickname = '小黑';
player_datas[3].nickname = '吉尔';
player_datas[0].avatar_id = 407901;
player_datas[1].avatar_id = 408001;
player_datas[2].avatar_id = 408101;
player_datas[3].avatar_id = 408201;

player_datas[0].views = player_datas[1].views = player_datas[2].views = player_datas[3].views = [
    {'slot': 0, 'item_id': 308033}, // 立直棒-红晖的魔杖
    {'slot': 1, 'item_id': 308031}, // 和牌-魔力的迸发
    {'slot': 2, 'item_id': 308032}, // 立直-英灵的典仪
    {'slot': 6, 'item_id': 308034}, // 桌布-星夜的羁绊
    {'slot': 7, 'item_id': 308035}, // 牌背-苍蓝的星辰
];

config = {
    'category': 1,
    'meta': {'mode_id': 0},
    'mode': {
        'mode': 1,
        'detail_rule': {
            'init_point': 100000,
            '_tablecloth_id': 308034, // 桌布-星夜的羁绊
            '_mjp_id': 308035, // 牌背-苍蓝的星辰
        }
    }
};

// 示例对局
demogame();
