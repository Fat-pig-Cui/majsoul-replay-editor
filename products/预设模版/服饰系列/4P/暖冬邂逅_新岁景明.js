loadproject();

// 除了如月莲

// 暖冬邂逅和新岁景明完全同期, UP装扮:
// 和牌-虚空结界
// 立直-星河入梦
// 立直音乐-处变不惊 (没加入views)
// 桌布-一番祥瑞录
// 牌背-开运达摩

editdata.player_datas[0].nickname = '斋藤治';
editdata.player_datas[1].nickname = '柚';
editdata.player_datas[2].nickname = '四宫冬实';
editdata.player_datas[3].nickname = '如月彩音';
editdata.player_datas[0].avatar_id = 402304;
editdata.player_datas[1].avatar_id = 405904;
editdata.player_datas[2].avatar_id = 406604;
editdata.player_datas[3].avatar_id = 406803;

editdata.player_datas[0].views = editdata.player_datas[1].views = editdata.player_datas[2].views = editdata.player_datas[3].views = [
    {'slot': 1, 'item_id': 30520002}, // 和牌-虚空结界
    {'slot': 2, 'item_id': 30530002}, // 立直-星河入梦
    {'slot': 6, 'item_id': 30580002}, // 桌布-一番祥瑞录
    {'slot': 7, 'item_id': 30570001}, // 牌背-开运达摩
];

editdata.config = {
    'category': 1,
    'meta': {'mode_id': 0},
    'mode': {
        'mode': 1,
        'detail_rule': {
            'init_point': 100000,
            '_tablecloth_id': 30580002, // 桌布-一番祥瑞录
            '_mjp_id': 30570001, // 牌背-开运达摩
        }
    }
};

// 示例对局
demogame();
