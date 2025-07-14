loadproject();

// 同期UP装扮:
// 立直棒-饺子
// 和牌-烟花
// 立直-鼠生威

player_datas[0].nickname = '二之宫花';
player_datas[1].nickname = '白石奈奈';
player_datas[2].nickname = '四宫冬实';
player_datas[0].avatar_id = 401708;
player_datas[1].avatar_id = 401804;
player_datas[2].avatar_id = 406603;

player_datas[0].views = player_datas[1].views = player_datas[2].views = [
    {'slot': 0, 'item_id': 305028}, // 立直棒-饺子
    {'slot': 1, 'item_id': 305029}, // 和牌-烟花
    {'slot': 2, 'item_id': 305303}, // 立直-鼠生威
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
demogame_3P();
