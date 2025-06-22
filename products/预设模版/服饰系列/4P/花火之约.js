loadproject();

// 花火之约UP装扮:
// 立直棒-绯月荆棘
// 和牌-群星之寂
// 和牌-厄里斯之瞳
// 立直-星陨
// 立直-血·朗基努斯枪

editdata.player_datas[0].nickname = "小鸟游雏田";
editdata.player_datas[1].nickname = "凉宫杏树";
editdata.player_datas[2].nickname = "斋藤治";
editdata.player_datas[3].nickname = "A-37";
editdata.player_datas[0].avatar_id = 401904;
editdata.player_datas[1].avatar_id = 402104;
editdata.player_datas[2].avatar_id = 402303;
editdata.player_datas[3].avatar_id = 404503;

// 凉宫杏树, A-37 (俩动态服饰)
editdata.player_datas[1].views = editdata.player_datas[3].views = [
    {"slot": 0, "item_id": 305603}, // 立直棒-绯月荆棘
    {"slot": 1, "item_id": 305204}, // 和牌-群星之寂
    {"slot": 2, "item_id": 305304}, // 立直-星陨
];
// 小鸟游雏田, 斋藤治 (俩静态服饰)
editdata.player_datas[0].views = editdata.player_datas[2].views = [
    {"slot": 0, "item_id": 305603}, // 立直棒-绯月荆棘
    {"slot": 1, "item_id": 305205}, // 和牌-厄里斯之瞳
    {"slot": 2, "item_id": 305305}, // 立直-血·朗基努斯枪
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
