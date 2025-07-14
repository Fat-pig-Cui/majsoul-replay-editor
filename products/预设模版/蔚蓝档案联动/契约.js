loadproject();

player_datas[0].nickname = '砂狼白子-契约';
player_datas[1].nickname = '小鸟游星野-契约';
player_datas[2].nickname = '陆八魔爱露-契约';
player_datas[3].nickname = '浅黄睦月-契约';
player_datas[0].avatar_id = 408602;
player_datas[1].avatar_id = 408702;
player_datas[2].avatar_id = 408802;
player_datas[3].avatar_id = 408902;

player_datas[0].views = player_datas[1].views = player_datas[2].views = player_datas[3].views = [
    {'slot': 0, 'item_id': 308038}, // 立直棒-大蛇比纳
    {'slot': 1, 'item_id': 308036}, // 和牌-冷血射击
    {'slot': 2, 'item_id': 308037}, // 立直-虹色轨迹
    {'slot': 6, 'item_id': 308039}, // 桌布-什亭青空
    {'slot': 7, 'item_id': 308040}, // 牌背-佩洛之星
];

config = {
    'category': 1,
    'meta': {'mode_id': 0},
    'mode': {
        'mode': 1,
        'detail_rule': {
            'init_point': 100000,
            '_tablecloth_id': 308039, // 桌布-什亭青空
            '_mjp_id': 308040, // 牌背-佩洛之星
        }
    }
};

// 示例对局
demogame();
