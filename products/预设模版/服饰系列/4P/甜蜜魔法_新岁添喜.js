clearproject();

// 甜蜜魔法和新岁添喜完全同期, UP装扮:
// 立直棒-仙境密匙
// 头像框-雪夜童话
// 桌布-仙境茶话会
// 牌背-三月兔

player_datas[0].nickname = '五十岚阳菜';
player_datas[1].nickname = '福姬';
player_datas[2].nickname = '姬川响';
player_datas[3].nickname = '莱恩';
player_datas[0].avatar_id = 402005;
player_datas[1].avatar_id = 403804;
player_datas[2].avatar_id = 404603;
player_datas[3].avatar_id = 404703;

// 头像框-雪夜童话
player_datas[0].avatar_frame = player_datas[1].avatar_frame = player_datas[2].avatar_frame = player_datas[3].avatar_frame = 305542;
player_datas[0].views = player_datas[1].views = player_datas[2].views = player_datas[3].views = [
    {'slot': 0, 'item_id': 305614}, // 立直棒-仙境密匙
    {'slot': 5, 'item_id': 305542}, // 头像框-雪夜童话
    {'slot': 6, 'item_id': 305812}, // 桌布-仙境茶话会
    {'slot': 7, 'item_id': 305710}, // 牌背-三月兔
];

config = {
    'category': 1,
    'meta': {'mode_id': 0},
    'mode': {
        'mode': 1,
        'detail_rule': {
            'init_point': 100000,
            '_tablecloth_id': 305812, // 桌布-仙境茶话会
            '_mjp_id': 305710, // 牌背-三月兔
        }
    }
};

// 示例对局
demogame();
