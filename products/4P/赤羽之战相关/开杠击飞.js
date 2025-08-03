clearproject();

// 忽略换三张, 初始点数设为 1000

player_datas[0].nickname = '一姬-契约';
player_datas[1].nickname = '新年初诣';
player_datas[2].nickname = '一姬当千';
player_datas[3].nickname = '绮春歌';
player_datas[0].avatar_id = 400102;
player_datas[1].avatar_id = 400104;
player_datas[2].avatar_id = 400105;
player_datas[3].avatar_id = 400106;

config = {
    category: 1,
    meta: {mode_id: 0},
    mode: {
        mode: 1,
        detail_rule: {
            chuanma: true,
            init_point: 1000,
        }
    }
};

tiles0 = '11113334448889m';
tiles1 = '1112345678999p';
tiles2 = '1112345678999s';
tiles3 = '2223455567888s';
roundbegin();
dingque('psmp');
leimingpai(true);
