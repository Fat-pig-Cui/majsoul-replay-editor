clearProject();

player_datas[0].nickname = '一姬-契约';
player_datas[1].nickname = '新年初诣';
player_datas[2].nickname = '一姬当千';
player_datas[3].nickname = '绮春歌';
player_datas[0].avatar_id = 400102;
player_datas[1].avatar_id = 400104;
player_datas[2].avatar_id = 400105;
player_datas[3].avatar_id = 400106;

setConfig({
    category: 1,
    meta: {mode_id: 0},
    mode: {
        mode: 1,
        detail_rule: {
            _guobiao: true,
            _guobiao_no_8fanfu: true,
            _guobiao_lianzhuang: true,
        }
    }
});

// 2个一般高, 2个喜相逢, 去掉1个喜相逢
begin_tiles[0] = '22334m2233455p22z';
begin_tiles[1] = '1112336678999m';
begin_tiles[2] = '1112336678999p';
begin_tiles[3] = '1112345678999s';
randomPaishan('..4m4p');
roundBegin();
qiepai();
normalMoqie(3);
mingQiepai();
normalMoqie();
hupai();

// 2个一般高, 2个连六, 去掉1个连六
begin_tiles[0] = '112233455699m11z';
begin_tiles[1] = '2223334445556z';
begin_tiles[2] = '1122336678999p';
begin_tiles[3] = '1122345678999s';
randomPaishan('..6m4m');
roundBegin();
qiepai();
normalMoqie(3);
mingQiepai();
normalMoqie();
hupai();

// 2个一般高, 2个老少副, 去掉1个老少副
begin_tiles[0] = '1122337789m11p11z';
begin_tiles[1] = '1122334455666m';
begin_tiles[2] = '1122336678999p';
begin_tiles[3] = '1122345678999s';
randomPaishan('..8m9m');
roundBegin();
qiepai();
normalMoqie(3);
mingQiepai();
normalMoqie();
hupai();

// 2个喜相逢, 2个连六, 去掉1个连六
begin_tiles[0] = '12345m1234569s12z';
begin_tiles[1] = '2223334445556z';
begin_tiles[2] = '1112233678999p';
begin_tiles[3] = '1122345678899s';
randomPaishan('..6m...9s');
roundBegin();
qiepai();
normalMoqie(3);
mingQiepai();
normalMoqie(3);
zimoHu();

// 2个喜相逢, 2个老少副, 去掉1个老少副
begin_tiles[0] = '123789m1234478p2z';
begin_tiles[1] = '2223334445556z';
begin_tiles[2] = '1112233678999p';
begin_tiles[3] = '1122345678999s';
randomPaishan('9p');
roundBegin();
qiepai();
normalMoqie();
hupai();

// 花龙, 喜相逢, 连六, 去掉连六
begin_tiles[0] = '12345m789p123s112z';
begin_tiles[1] = '2223334445556z';
begin_tiles[2] = '1122336678999p';
begin_tiles[3] = '1122445678999s';
randomPaishan('6m');
roundBegin();
qiepai();
normalMoqie();
hupai();

// 花龙, 喜相逢, 老少副, 去掉老少副
begin_tiles[0] = '56m123789p123s112z';
begin_tiles[1] = '2223334445556z';
begin_tiles[2] = '1122336678999p';
begin_tiles[3] = '1122445678999s';
randomPaishan('4m');
roundBegin();
qiepai();
normalMoqie();
hupai();
