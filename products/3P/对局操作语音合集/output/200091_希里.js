clearProject();

player_datas[0].nickname = '希里-契约';
player_datas[1].nickname = '希里';
player_datas[2].nickname = '摇曳心情';
player_datas[0].avatar_id = 409102;
player_datas[1].avatar_id = 409101;
player_datas[2].avatar_id = 409103;

setConfig({
    category: 1,
    meta: {mode_id: 0},
    mode: {
        mode: 10,
        detail_rule: {}
    }
});

// 第1局: 立直, 两立直, 吃, 碰, 杠, 拔北, 四杠流局
begin_tiles[0] = '1112340678999p1s';
begin_tiles[1] = '234466688s5567z';
begin_tiles[2] = '1112223335777z';
randomPaishan('1z8s', '6z.6z.......4s');
qiepai(true);
mingQiepai('23s');
mopai();
comboMopai();
qiepai(true);
mingQiepai();
normalMoqie();
hupai(1);

// 第2局: 自摸
begin_tiles[1] = '111m23456p11123s4z';
begin_tiles[2] = '1112340678999p';
begin_tiles[0] = '1112223334445z';
randomPaishan('', '1m.......1p');
comboMopai();
hupai();
