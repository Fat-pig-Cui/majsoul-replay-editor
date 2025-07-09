loadproject();

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
            '_guobiao': true,
            '_guobiao_no_8fanfu': true,
            '_guobiao_lianzhuang': true,
        }
    }
};

// 2个一般高, 2个喜相逢, 去掉1个喜相逢
tiles0 = '22334m2233455p22z';
tiles1 = '1112336678999m';
tiles2 = '1112336678999p';
tiles3 = '1112345678999s';
paishan = randompaishan('..4m4p');
roundbegin();
qiepai();
normalmoqie(3);
mingqiepai();
normalmoqie();
hupai();

// 2个一般高, 2个连六, 去掉1个连六
tiles0 = '112233455699m11z';
tiles1 = '2223334445556z';
tiles2 = '1122336678999p';
tiles3 = '1122345678999s';
paishan = randompaishan('..6m4m');
roundbegin();
qiepai();
normalmoqie(3);
mingqiepai();
normalmoqie();
hupai();

// 2个一般高, 2个老少副, 去掉1个老少副
tiles0 = '1122337789m11p11z';
tiles1 = '1122334455666m';
tiles2 = '1122336678999p';
tiles3 = '1122345678999s';
paishan = randompaishan('..8m9m');
roundbegin();
qiepai();
normalmoqie(3);
mingqiepai();
normalmoqie();
hupai();

// 2个喜相逢, 2个连六, 去掉1个连六
tiles0 = '12345m1234569s12z';
tiles1 = '2223334445556z';
tiles2 = '1112233678999p';
tiles3 = '1122345678899s';
paishan = randompaishan('..6m...9s');
roundbegin();
qiepai();
normalmoqie(3);
mingqiepai();
normalmoqie(3);
zimohu();

// 2个喜相逢, 2个老少副, 去掉1个老少副
tiles0 = '123789m1234478p2z';
tiles1 = '2223334445556z';
tiles2 = '1112233678999p';
tiles3 = '1122345678999s';
paishan = randompaishan('9p');
roundbegin();
qiepai();
normalmoqie();
hupai();

// 花龙, 喜相逢, 连六, 去掉连六
tiles0 = '12345m789p123s112z';
tiles1 = '2223334445556z';
tiles2 = '1122336678999p';
tiles3 = '1122445678999s';
paishan = randompaishan('6m');
roundbegin();
qiepai();
normalmoqie();
hupai();

// 花龙, 喜相逢, 老少副, 去掉老少副
tiles0 = '56m123789p123s112z';
tiles1 = '2223334445556z';
tiles2 = '1122336678999p';
tiles3 = '1122445678999s';
paishan = randompaishan('4m');
roundbegin();
qiepai();
normalmoqie();
hupai();
