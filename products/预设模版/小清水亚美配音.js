clearproject();

player_datas[0].nickname = '八木唯';
player_datas[1].nickname = '九条璃雨';
player_datas[2].nickname = '原村和';
player_datas[3].nickname = '红月卡莲';
player_datas[0].avatar_id = 400701;
player_datas[1].avatar_id = 400801;
player_datas[2].avatar_id = 403501;
player_datas[3].avatar_id = 407301;

config = {
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
