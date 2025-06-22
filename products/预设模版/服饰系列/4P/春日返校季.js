loadproject();

// 春日返校季UP装扮:
// 立直棒-仿生喵
// 和牌-核心裂变
// 立直-虚拟导航

editdata.player_datas[0].nickname = "一之濑空";
editdata.player_datas[1].nickname = "莎拉";
editdata.player_datas[2].nickname = "五十岚阳菜";
editdata.player_datas[3].nickname = "月见山";
editdata.player_datas[0].avatar_id = 401304;
editdata.player_datas[1].avatar_id = 401604;
editdata.player_datas[2].avatar_id = 402004;
editdata.player_datas[3].avatar_id = 402703;

editdata.player_datas[0].views = editdata.player_datas[1].views = editdata.player_datas[2].views = editdata.player_datas[3].views = [
    {"slot": 0, "item_id": 305607}, // 立直棒-仿生喵
    {"slot": 1, "item_id": 305211}, // 和牌-核心裂变
    {"slot": 2, "item_id": 305311}, // 立直-虚拟导航
];

editdata.config = {
    'category': 1,
    'meta': {'mode_id': 0},
    'mode': {
        'mode': 1,
        'detail_rule': {
            'init_point': 100000,
        }
    }
};

// 示例对局
demogame();
