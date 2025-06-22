loadproject();

// 魇魔之约没有UP装扮

// 暗夜法则UP装扮:
// 和牌-天降正义
// 和牌-黄金之蝶
// 立直-断罪
// 立直-蝶惑

editdata.player_datas[0].nickname = "藤田佳奈";
editdata.player_datas[1].nickname = "八木唯";
editdata.player_datas[2].nickname = "明智英树";
editdata.player_datas[3].nickname = "如月莲";
editdata.player_datas[0].avatar_id = 400304;
editdata.player_datas[1].avatar_id = 400704;
editdata.player_datas[2].avatar_id = 401403;
editdata.player_datas[3].avatar_id = 403003;

// 八木唯, 明智英树
editdata.player_datas[1].views = editdata.player_datas[2].views = [
    {"slot": 1, "item_id": 305206}, // 和牌-天降正义
    {"slot": 2, "item_id": 305306}, // 立直-断罪
];
// 藤田佳奈, 如月莲
editdata.player_datas[0].views = editdata.player_datas[3].views = [
    {"slot": 1, "item_id": 305207}, // 和牌-黄金之蝶
    {"slot": 2, "item_id": 305307}, // 立直-蝶惑
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
