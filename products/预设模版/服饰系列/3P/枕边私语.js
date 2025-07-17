loadproject();

// 同期UP装扮:
// 立直棒-陨石法杖
// 和牌-天罚
// 立直-雷电环索

player_datas[0].nickname = '北见纱和子';
player_datas[1].nickname = '七海礼奈';
player_datas[2].nickname = '柚';
player_datas[0].avatar_id = 402405;
player_datas[1].avatar_id = 404404;
player_datas[2].avatar_id = 405903;

player_datas[0].views = player_datas[1].views = player_datas[2].views = [
    {'slot': 0, 'item_id': 305612}, // 立直棒-陨石法杖
    {'slot': 1, 'item_id': 305218}, // 和牌-天罚
    {'slot': 2, 'item_id': 305318}, // 立直-雷电环索
];

config = {
    'category': 1,
    'meta': {'mode_id': 0},
    'mode': {
        'mode': 11,
        'detail_rule': {
            'init_point': 100000,
        }
    }
};

// 示例对局
demogame();
