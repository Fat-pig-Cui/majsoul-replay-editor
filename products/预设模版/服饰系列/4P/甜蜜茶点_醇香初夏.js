loadproject();

// 甜蜜茶点和醇香初夏UP装扮完全一样:
// 立直棒-夹心猫团子
// 牌背-蝴蝶结
// 头像框-猫咪军团的身份

editdata.player_datas[0].nickname = "三上千织";
editdata.player_datas[1].nickname = "小鸟游雏田";
editdata.player_datas[2].nickname = "雏桃";
editdata.player_datas[3].nickname = "A-37";
editdata.player_datas[0].avatar_id = 400405;
editdata.player_datas[1].avatar_id = 401903;
editdata.player_datas[2].avatar_id = 402604;
editdata.player_datas[3].avatar_id = 404504;

// 头像框-猫咪军团的身份
editdata.player_datas[0].avatar_frame = editdata.player_datas[1].avatar_frame = editdata.player_datas[2].avatar_frame = editdata.player_datas[3].avatar_frame = 305523;
editdata.player_datas[0].views = editdata.player_datas[1].views = editdata.player_datas[2].views = editdata.player_datas[3].views = [
    {"slot": 0, "item_id": 305608}, // 立直棒-夹心猫团子
    {"slot": 5, "item_id": 305523}, // 头像框-猫咪军团的身份
    {"slot": 7, "item_id": 305704}, // 牌背-蝴蝶结
];

editdata.config = {
    'category': 1,
    'meta': {'mode_id': 0},
    'mode': {
        'mode': 1,
        'detail_rule': {
            'init_point': 100000,
            '_mjp_id': 305704, // 牌背-蝴蝶结
        }
    }
};

// 示例对局
demogame();
