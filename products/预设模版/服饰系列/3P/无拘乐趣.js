loadproject();

// 同期UP装扮:
// 立直音乐-炽热时刻 (没加入 views)
// 立直棒-包甜好瓜
// 头像框-大小姐发带
// 桌布-去海边
// 牌背-鸥气满满

editdata.player_datas[0].nickname = "抚子";
editdata.player_datas[1].nickname = "小鸟游雏田";
editdata.player_datas[2].nickname = "五十岚阳菜";
editdata.player_datas[0].avatar_id = 400606;
editdata.player_datas[1].avatar_id = 401906;
editdata.player_datas[2].avatar_id = 402006;

// 头像框-大小姐发带
editdata.player_datas[0].avatar_frame = editdata.player_datas[1].avatar_frame = editdata.player_datas[2].avatar_frame = 305552;
editdata.player_datas[0].views = editdata.player_datas[1].views = editdata.player_datas[2].views = [
    {"slot": 0, "item_id": 305622}, // 立直棒-包甜好瓜
    {"slot": 5, "item_id": 305545}, // 头像框-大小姐发带
    {"slot": 6, "item_id": 305814}, // 桌布-去海边
    {"slot": 7, "item_id": 305716}, // 牌背-鸥气满满
];

editdata.config = {
    'category': 1,
    'meta': {'mode_id': 0},
    'mode': {
        'mode': 11,
        'detail_rule': {
            'init_point': 100000,
            '_tablecloth_id': 305814, // 桌布-去海边
            '_mjp_id': 305716, // 牌背-鸥气满满
        }
    }
};

// 示例对局
demogame_3P();
