loadproject();

// 昭华年UP装扮:
// 立直棒-冰糖葫芦(咸)
// 和牌-鸿运开年
// 立直-生财有道
// 桌布-贺华岁
// 对局音乐-曲水流觞 (没加入views)

// 择芳意UP装扮:
// 立直棒-如意
// 和牌-金屏春色
// 立直-暗香梅影
// 桌布-乾坤福袋
// 牌背-花灯

player_datas[0].nickname = '相原舞';
player_datas[1].nickname = '雏桃';
player_datas[2].nickname = '辉夜姬';
player_datas[3].nickname = '艾丽莎';
player_datas[0].avatar_id = 400504;
player_datas[1].avatar_id = 402603;
player_datas[2].avatar_id = 402904;
player_datas[3].avatar_id = 403204;

// 相原舞, 雏桃
player_datas[0].views = player_datas[1].views = player_datas[2].views = player_datas[3].views = [
    {'slot': 0, 'item_id': 305606}, // 立直棒-冰糖葫芦(咸)
    {'slot': 1, 'item_id': 305210}, // 和牌-鸿运开年
    {'slot': 2, 'item_id': 305310}, // 立直-生财有道
    {'slot': 6, 'item_id': 305804}, // 桌布-贺华岁
    {'slot': 7, 'item_id': 305707}, // 牌背-花灯
];
// 辉夜姬, 艾丽莎
player_datas[0].views = player_datas[1].views = player_datas[2].views = player_datas[3].views = [
    {'slot': 0, 'item_id': 305611}, // 立直棒-如意
    {'slot': 1, 'item_id': 305217}, // 和牌-金屏春色
    {'slot': 2, 'item_id': 305317}, // 立直-暗香梅影
    {'slot': 6, 'item_id': 305808}, // 桌布-乾坤福袋
    {'slot': 7, 'item_id': 305707}, // 牌背-花灯
];

config = {
    'category': 1,
    'meta': {'mode_id': 0},
    'mode': {
        'mode': 1,
        'detail_rule': {
            'init_point': 100000,
            '_tablecloth_id': 305808, // 桌布-乾坤福袋
            '_mjp_id': 305707, // 牌背-花灯
        }
    }
};

// 示例对局
demogame();
