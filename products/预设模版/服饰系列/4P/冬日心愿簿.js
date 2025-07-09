loadproject();

// 冬日心愿簿UP装扮:
// 和牌-得胜达摩
// 立直-一锤定音
// 桌布-瑞雪祈狐
// 牌背-圣夜雪人

// 此外还有活动获得的 立直棒-立奇棒

editdata.player_datas[0].nickname = '汪次郎';
editdata.player_datas[1].nickname = '二之宫花';
editdata.player_datas[2].nickname = '白石奈奈';
editdata.player_datas[3].nickname = '雏桃';
editdata.player_datas[0].avatar_id = 401205;
editdata.player_datas[1].avatar_id = 401709;
editdata.player_datas[2].avatar_id = 401805;
editdata.player_datas[3].avatar_id = 402605;

editdata.player_datas[0].views = editdata.player_datas[1].views = editdata.player_datas[2].views = editdata.player_datas[3].views = [
    {'slot': 0, 'item_id': 30560006}, // 立直棒-立奇棒
    {'slot': 1, 'item_id': 30520008}, // 和牌-得胜达摩
    {'slot': 2, 'item_id': 30530008}, // 立直-一锤定音
    {'slot': 6, 'item_id': 30580012}, // 桌布-瑞雪祈狐
    {'slot': 7, 'item_id': 30570008}, // 牌背-圣夜雪人
];

editdata.config = {
    'category': 1,
    'meta': {'mode_id': 0},
    'mode': {
        'mode': 1,
        'detail_rule': {
            'init_point': 100000,
            '_tablecloth_id': 30580012, // 桌布-瑞雪祈狐
            '_mjp_id': 30570008, // 牌背-圣夜雪人
        }
    }
};

// 示例对局
demogame();
