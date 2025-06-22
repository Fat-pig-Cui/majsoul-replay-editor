loadproject();

// 四方雀者UP装扮:
// 立直棒-秘传之卷
// 和牌-天地无用
// 立直-毒烟玉
// 对局音乐-一心一智 (没加入views)

// 此外还有活动获得的 牌背-手里剑

editdata.player_datas[0].nickname = "抚子";
editdata.player_datas[1].nickname = "八木唯";
editdata.player_datas[2].nickname = "莎拉";
editdata.player_datas[3].nickname = "七夕";
editdata.player_datas[0].avatar_id = 400605;
editdata.player_datas[1].avatar_id = 400707;
editdata.player_datas[2].avatar_id = 401606;
editdata.player_datas[3].avatar_id = 403904;

editdata.player_datas[0].views = editdata.player_datas[1].views = editdata.player_datas[2].views = editdata.player_datas[3].views = [
    {"slot": 0, "item_id": 305620}, // 立直棒-秘传之卷
    {"slot": 1, "item_id": 305222}, // 和牌-天地无用
    {"slot": 2, "item_id": 305322}, // 立直-毒烟玉
    {"slot": 7, "item_id": 305714}, // 牌背-手里剑
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
