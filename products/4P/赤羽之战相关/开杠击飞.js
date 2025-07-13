loadproject();

// 开杠"刮风下雨"使得玩家被击飞导致牌局结束时, 在 leimingpai 后调用 roundend 即可
// 忽略换三张, 初始点数设为 1000

editdata.player_datas[0].nickname = '一姬-契约';
editdata.player_datas[1].nickname = '新年初诣';
editdata.player_datas[2].nickname = '一姬当千';
editdata.player_datas[3].nickname = '绮春歌';
editdata.player_datas[0].avatar_id = 400102;
editdata.player_datas[1].avatar_id = 400104;
editdata.player_datas[2].avatar_id = 400105;
editdata.player_datas[3].avatar_id = 400106;

editdata.config = {
    'category': 1,
    'meta': {'mode_id': 0},
    'mode': {
        'mode': 1,
        'detail_rule': {
            'chuanma': true,
            'init_point': 1000,
            'xuezhandaodi': true,
        }
    }
};

tiles0 = '11113334448889m';
tiles1 = '1112345678999p';
tiles2 = '1112345678999s';
tiles3 = '2223455567888s';
paishan = randompaishan();
roundbegin();
dingque('psmp');
leimingpai();
roundend();
