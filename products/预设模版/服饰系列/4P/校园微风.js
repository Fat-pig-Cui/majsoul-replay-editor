clearproject();

// 校园微风UP装扮:
// 立直棒-小鳄霸
// 和牌-喵——呜！
// 立直-萌爪狂欢
// 立直音乐-势如破竹 (没加入views)
// 对局音乐-漂浮霓虹 (没加入views)

player_datas[0].nickname = '一姬';
player_datas[1].nickname = '九条璃雨';
player_datas[2].nickname = '泽尼娅';
player_datas[3].nickname = '藤本绮罗';
player_datas[0].avatar_id = 400107;
player_datas[1].avatar_id = 400807;
player_datas[2].avatar_id = 400907;
player_datas[3].avatar_id = 402806;

player_datas[0].views = player_datas[1].views = player_datas[2].views = player_datas[3].views = [
    {'slot': 0, 'item_id': 30560003}, // 立直棒-小鳄霸
    {'slot': 1, 'item_id': 30520005}, // 和牌-喵——呜！
    {'slot': 2, 'item_id': 30530005}, // 立直-萌爪狂欢
];

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
