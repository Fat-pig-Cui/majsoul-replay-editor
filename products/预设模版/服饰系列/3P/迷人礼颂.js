clearproject();

// 同期UP装扮:
// 立直音乐-所向披靡 (没加入 views)
// 立直棒-可口喵乐
// 头像框-窗外
// 牌背-祥云兔

player_datas[0].nickname = '夏弥尔';
player_datas[1].nickname = '未来';
player_datas[2].nickname = '汉娜';
player_datas[0].avatar_id = 405404;
player_datas[1].avatar_id = 406903;
player_datas[2].avatar_id = 407703;

// 头像框-窗外
player_datas[0].avatar_frame = player_datas[1].avatar_frame = player_datas[2].avatar_frame = 305545;
player_datas[0].views = player_datas[1].views = player_datas[2].views = [
    {'slot': 0, 'item_id': 305619}, // 立直棒-可口喵乐
    {'slot': 5, 'item_id': 305545}, // 头像框-窗外
    {'slot': 7, 'item_id': 305711}, // 牌背-祥云兔
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
