loadproject();

// 惊鸿岁UP装扮:
// 立直棒-青竹伞
// 立直音乐-名扬四海 (没加入views)
// 头像框-竹福滚滚
// 桌布-清辉竹影
// 牌背-翠竹墨影

// 此外还有活动获得的 桌布-锦绣余年 (没加入views)

editdata.player_datas[0].nickname = "藤田佳奈";
editdata.player_datas[1].nickname = "三上千织";
editdata.player_datas[2].nickname = "莎拉";
editdata.player_datas[3].nickname = "泽克斯";
editdata.player_datas[0].avatar_id = 400306;
editdata.player_datas[1].avatar_id = 400407;
editdata.player_datas[2].avatar_id = 401607;
editdata.player_datas[3].avatar_id = 406004;

// 头像框-竹福滚滚
editdata.player_datas[0].avatar_frame = editdata.player_datas[1].avatar_frame = editdata.player_datas[2].avatar_frame = editdata.player_datas[3].avatar_frame = 30550022;
editdata.player_datas[0].views = editdata.player_datas[1].views = editdata.player_datas[2].views = editdata.player_datas[3].views = [
    {"slot": 0, "item_id": 30560007}, // 立直棒-青竹伞
    {"slot": 5, "item_id": 30550022}, // 头像框-竹福滚滚
    {"slot": 6, "item_id": 30580015}, // 桌布-清辉竹影
    {"slot": 7, "item_id": 30570009}, // 牌背-翠竹墨影
];

editdata.config = {
    'category': 1,
    'meta': {'mode_id': 0},
    'mode': {
        'mode': 1,
        'detail_rule': {
            'init_point': 100000,
            'table_cloth_id': 30580015, // 桌布-清辉竹影
            '_mjp_id': 30570009, // 牌背-翠竹墨影
        }
    }
};

// 示例对局
demogame();
