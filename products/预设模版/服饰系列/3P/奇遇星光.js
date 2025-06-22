loadproject();

// 同期UP装扮:
// 对局音乐-一心一智 (没加入 views)
// 立直棒-秘传之卷
// 和牌-天地无用
// 立直-毒烟玉

editdata.player_datas[0].nickname = "姬川响";
editdata.player_datas[1].nickname = "四宫冬实";
editdata.player_datas[2].nickname = "琳琅";
editdata.player_datas[0].avatar_id = 404604;
editdata.player_datas[1].avatar_id = 406605;
editdata.player_datas[2].avatar_id = 408403;

editdata.player_datas[0].views = editdata.player_datas[1].views = editdata.player_datas[2].views = [
    {"slot": 0, "item_id": 305620}, // 立直棒-秘传之卷
    {"slot": 1, "item_id": 305222}, // 和牌-天地无用
    {"slot": 2, "item_id": 305322}, // 立直-毒烟玉
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
