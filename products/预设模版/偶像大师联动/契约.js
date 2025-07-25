clearproject();

player_datas[0].nickname = '浅仓透-契约';
player_datas[1].nickname = '樋口圆香-契约';
player_datas[2].nickname = '福丸小糸-契约';
player_datas[3].nickname = '市川雏菜-契约';
player_datas[0].avatar_id = 40010002;
player_datas[1].avatar_id = 40010102;
player_datas[2].avatar_id = 40010202;
player_datas[3].avatar_id = 40010302;

player_datas[0].views = player_datas[1].views = player_datas[2].views = player_datas[3].views = [
    {'slot': 0, 'item_id': 30560005}, // 立直棒-动听之源
    {'slot': 1, 'item_id': 30520007}, // 和牌-涟漪之空
    {'slot': 2, 'item_id': 30530007}, // 立直-水漾星光
    {'slot': 6, 'item_id': 30580011}, // 桌布-闪耀吧！
    {'slot': 7, 'item_id': 30570007}, // 牌背-静谧夜光
];

config = {
    'category': 1,
    'meta': {'mode_id': 0},
    'mode': {
        'mode': 1,
        'detail_rule': {
            'init_point': 100000,
            '_tablecloth_id': 30580011, // 桌布-闪耀吧！
            '_mjp_id': 30570007, // 牌背-静谧夜光
        }
    }
};

// 示例对局
demogame();
