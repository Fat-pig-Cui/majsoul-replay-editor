clearproject();

// 同期UP装扮:
// 立直音乐-所向披靡 (没加入 views)
// 立直棒-可口喵乐
// 头像框-窗外
// 牌背-祥云兔

player_datas[0].nickname = '一姬';
player_datas[1].nickname = '泽尼娅';
player_datas[2].nickname = '一之濑空';
player_datas[0].avatar_id = 400106;
player_datas[1].avatar_id = 400905;
player_datas[2].avatar_id = 401305;

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
            '_mjp_id': 305711, // 牌背-祥云兔
        }
    }
};

// 示例对局
demogame();
