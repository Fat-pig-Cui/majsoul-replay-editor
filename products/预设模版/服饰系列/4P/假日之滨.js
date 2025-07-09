loadproject();

// 假日之滨UP装扮:
// 立直棒-包甜好瓜
// 立直音乐-炽热时刻 (没加入views)
// 头像框-大小姐发带
// 桌布-去海边
// 牌背-鸥气满满

// 此外还有活动获得的 称号-喵之一手 和 牌面-猫咪雀圣

editdata.player_datas[0].nickname = '藤田佳奈';
editdata.player_datas[1].nickname = '汪次郎';
editdata.player_datas[2].nickname = '石原碓海';
editdata.player_datas[3].nickname = '福姬';
editdata.player_datas[0].avatar_id = 400305;
editdata.player_datas[1].avatar_id = 401204;
editdata.player_datas[2].avatar_id = 403104;
editdata.player_datas[3].avatar_id = 403805;

// 称号-喵之一手
editdata.player_datas[0].title = editdata.player_datas[1].title = editdata.player_datas[2].title = editdata.player_datas[3].title = 600078;
// 头像框-大小姐发带
editdata.player_datas[0].avatar_frame = editdata.player_datas[1].avatar_frame = editdata.player_datas[2].avatar_frame = editdata.player_datas[3].avatar_frame = 305552;
editdata.player_datas[0].views = editdata.player_datas[1].views = editdata.player_datas[2].views = editdata.player_datas[3].views = [
    {'slot': 0, 'item_id': 305622}, // 立直棒-包甜好瓜
    {'slot': 5, 'item_id': 305552}, // 头像框-大小姐发带
    {'slot': 6, 'item_id': 305814}, // 桌布-去海边
    {'slot': 7, 'item_id': 305716}, // 牌背-鸥气满满
    {'slot': 13, 'item_id': 305718}, // 牌面-猫咪雀圣
];

editdata.config = {
    'category': 1,
    'meta': {'mode_id': 0},
    'mode': {
        'mode': 1,
        'detail_rule': {
            'init_point': 100000,
            '_tablecloth_id': 305814, // 桌布-去海边
            '_mjp_id': 305716, // 牌背-鸥气满满
            '_mjpsurface_id': 305718, // 牌面-猫咪雀圣
        }
    }
};

// 示例对局
demogame();
