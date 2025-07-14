loadproject();

// 同期UP装扮:
// 立直音乐-舞之序曲 (没加入 views)
// 和牌-伺机而动
// 立直-一步之遥
// 桌布-破茧

player_datas[0].nickname = '九条璃雨';
player_datas[1].nickname = '北见纱和子';
player_datas[2].nickname = '艾丽莎';
player_datas[0].avatar_id = 400806;
player_datas[1].avatar_id = 402406;
player_datas[2].avatar_id = 403206;

player_datas[0].views = player_datas[1].views = player_datas[2].views = [
    {'slot': 1, 'item_id': 30520004}, // 和牌-伺机而动
    {'slot': 2, 'item_id': 30530004}, // 立直-一步之遥
    {'slot': 6, 'item_id': 30580006}, // 桌布-破茧
];

config = {
    'category': 1,
    'meta': {'mode_id': 0},
    'mode': {
        'mode': 11,
        'detail_rule': {
            'init_point': 100000,
            '_tablecloth_id': 30580006, // 桌布-破茧
        }
    }
};

// 示例对局
demogame_3P();
