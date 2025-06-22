loadproject();

// 天黑请闭眼UP装扮:
// 立直棒-喵星棒
// 和牌-杰克的恶作剧
// 立直-南瓜夜行
// 对局音乐-一千零一夜

// 此外还有活动获得的 桌布-月圆传说

editdata.player_datas[0].nickname = "三上千织";
editdata.player_datas[1].nickname = "艾因";
editdata.player_datas[2].nickname = "艾丽莎";
editdata.player_datas[3].nickname = "莱恩";
editdata.player_datas[0].avatar_id = 400406;
editdata.player_datas[1].avatar_id = 402504;
editdata.player_datas[2].avatar_id = 403205;
editdata.player_datas[3].avatar_id = 404704;

editdata.player_datas[0].views = editdata.player_datas[1].views = editdata.player_datas[2].views = editdata.player_datas[3].views = [
    {"slot": 0, "item_id": 30560001}, // 立直棒-喵星棒
    {"slot": 1, "item_id": 30520001}, // 和牌-杰克的恶作剧
    {"slot": 2, "item_id": 30530001}, // 立直-南瓜夜行
    {"slot": 6, "item_id": 30580001}, // 桌布-月圆传说
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
