loadproject();

editdata.player_datas[0].nickname = '竹井久-兔耳派对';
editdata.player_datas[1].nickname = '福路美穗子-兔耳';
editdata.player_datas[2].nickname = '新子憧-兔耳派对';
editdata.player_datas[3].nickname = '园城寺怜-兔耳';
editdata.player_datas[0].avatar_id = 406203;
editdata.player_datas[1].avatar_id = 406303;
editdata.player_datas[2].avatar_id = 406403;
editdata.player_datas[3].avatar_id = 406503;

editdata.player_datas[0].views = editdata.player_datas[1].views = editdata.player_datas[2].views = editdata.player_datas[3].views = [
    {'slot': 0, 'item_id': 308023}, // 立直棒-爱心便当
    {'slot': 1, 'item_id': 308021}, // 和牌-高岭之花
    {'slot': 2, 'item_id': 308022}, // 立直-未来视
    {'slot': 6, 'item_id': 308024}, // 桌布-清凉假日
    {'slot': 7, 'item_id': 308025}, // 牌背-摇曳彩球
];

editdata.config = {
    'category': 1,
    'meta': {'mode_id': 0},
    'mode': {
        'mode': 1,
        'detail_rule': {
            'init_point': 100000,
            '_tablecloth_id': 308024, // 桌布-清凉假日
            '_mjp_id': 308025, // 牌背-摇曳彩球
        }
    }
};

// 示例对局
demogame();
