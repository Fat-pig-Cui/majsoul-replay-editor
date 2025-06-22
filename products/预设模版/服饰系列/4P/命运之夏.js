loadproject();

// 命运之夏UP装扮:
// 立直棒-喵切丸
// 和牌-疾月斩
// 立直-风华斩
// 桌布-勇喵传说
// 牌背-鬼煤球

// 此外还有活动获得的 称号-一姬当千 和 动态桌布-捞金鱼 (没加入views)

editdata.player_datas[0].nickname = "卡维";
editdata.player_datas[1].nickname = "明智英树";
editdata.player_datas[2].nickname = "二之宫花";
editdata.player_datas[3].nickname = "艾因";
editdata.player_datas[0].avatar_id = 401003;
editdata.player_datas[1].avatar_id = 401404;
editdata.player_datas[2].avatar_id = 401707;
editdata.player_datas[3].avatar_id = 402503;

// 称号-一姬当千
editdata.player_datas[0].title = editdata.player_datas[1].title = editdata.player_datas[2].title = editdata.player_datas[3].title = 600045;
editdata.player_datas[0].views = editdata.player_datas[1].views = editdata.player_datas[2].views = editdata.player_datas[3].views = [
    {"slot": 0, "item_id": 305610}, // 立直棒-喵切丸
    {"slot": 1, "item_id": 305213}, // 和牌-疾月斩
    {"slot": 2, "item_id": 305313}, // 立直-风华斩
    {"slot": 6, "item_id": 305806}, // 桌布-勇喵传说
    {"slot": 7, "item_id": 305705}, // 牌背-鬼煤球
];

editdata.config = {
    'category': 1,
    'meta': {'mode_id': 0},
    'mode': {
        'mode': 1,
        'detail_rule': {
            'init_point': 100000,
            '_tablecloth_id': 305806, // 桌布-勇喵传说
            '_mjp_id': 305705, // 牌背-鬼煤球
        }
    }
};

// 示例对局
demogame();
