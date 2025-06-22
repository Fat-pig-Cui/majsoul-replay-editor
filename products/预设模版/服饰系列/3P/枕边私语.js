loadproject();

// 同期UP装扮:
// 立直棒-陨石法杖
// 和牌-天罚
// 立直-雷电环索

editdata.player_datas[0].nickname = "北见纱和子";
editdata.player_datas[1].nickname = "七海礼奈";
editdata.player_datas[2].nickname = "柚";
editdata.player_datas[0].avatar_id = 402405;
editdata.player_datas[1].avatar_id = 404404;
editdata.player_datas[2].avatar_id = 405903;

editdata.player_datas[0].views = editdata.player_datas[1].views = editdata.player_datas[2].views = [
    {"slot": 0, "item_id": 305612}, // 立直棒-陨石法杖
    {"slot": 1, "item_id": 305218}, // 和牌-天罚
    {"slot": 2, "item_id": 305318}, // 立直-雷电环索
];

editdata.config = {
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
