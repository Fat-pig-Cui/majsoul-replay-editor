loadproject();

// 化妆舞会当时并没有UP装扮, 但有以下装扮加入常驻:
// 立直棒-小恶魔蝙蝠
// 和牌-幽灵嗷嗷
// 立直-蝙蝠桀桀
// 立直音乐-一触即发 (没加入views)
// 牌背-天然呆幽灵

editdata.player_datas[0].nickname = "二阶堂美树";
editdata.player_datas[1].nickname = "泽尼娅";
editdata.player_datas[2].nickname = "四宫夏生";
editdata.player_datas[3].nickname = "汪次郎";
editdata.player_datas[0].avatar_id = 400203;
editdata.player_datas[1].avatar_id = 400903;
editdata.player_datas[2].avatar_id = 401103;
editdata.player_datas[3].avatar_id = 401203;

editdata.player_datas[0].views = editdata.player_datas[1].views = editdata.player_datas[2].views = editdata.player_datas[3].views = [
    {"slot": 0, "item_id": 305600}, // 立直棒-小恶魔蝙蝠
    {"slot": 1, "item_id": 305200}, // 和牌-幽灵嗷嗷
    {"slot": 2, "item_id": 305300}, // 立直-蝙蝠桀桀
    {"slot": 7, "item_id": 305700}, // 牌背-天然呆幽灵
];

editdata.config = {
    'category': 1,
    'meta': {'mode_id': 0},
    'mode': {
        'mode': 1,
        'detail_rule': {
            'init_point': 100000,
            '_mjp_id': 305700, // 牌背-天然呆幽灵
        }
    }
};

// 示例对局
demogame();
