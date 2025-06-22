loadproject();

// 睡前故事UP装扮:
// 立直棒-魔法棒
// 和牌-歌剧魅影
// 和牌-魔法少女
// 立直-非常事态
// 立直-魔法少女

// 满风佳期UP装扮:
// 立直棒-虚无传送门
// 和牌-无间契印
// 立直-灵魂契约

editdata.player_datas[0].nickname = "凉宫杏树";
editdata.player_datas[1].nickname = "藤本绮罗";
editdata.player_datas[2].nickname = "艾丽莎";
editdata.player_datas[3].nickname = "森川绫子";
editdata.player_datas[0].avatar_id = 402103;
editdata.player_datas[1].avatar_id = 402804;
editdata.player_datas[2].avatar_id = 403203;
editdata.player_datas[3].avatar_id = 404803;

// 凉宫杏树
editdata.player_datas[0].views = [
    {"slot": 0, "item_id": 305601}, // 立直棒-魔法棒
    {"slot": 1, "item_id": 305201}, // 和牌-歌剧魅影
    {"slot": 2, "item_id": 305301}, // 立直-非常事态
];
// 艾丽莎
editdata.player_datas[0].views = [
    {"slot": 0, "item_id": 305601}, // 立直棒-魔法棒
    {"slot": 1, "item_id": 305202}, // 和牌-魔法少女
    {"slot": 2, "item_id": 305302}, // 立直-魔法少女
];
// 藤本绮罗, 森川绫子
editdata.player_datas[1].views = editdata.player_datas[3].views = [
    {"slot": 0, "item_id": 305609}, // 立直棒-虚无传送门
    {"slot": 1, "item_id": 305212}, // 和牌-无间契印
    {"slot": 2, "item_id": 305312}, // 立直-灵魂契约
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
