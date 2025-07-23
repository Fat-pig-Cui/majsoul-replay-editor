clearproject();

// 雀士的本愿: 和牌役种只包含 立直, 一发, 自摸, 平和, 一杯口, 断幺九, 三色同顺

player_datas[0].nickname = '一姬-契约';
player_datas[1].nickname = '新年初诣';
player_datas[2].nickname = '一姬当千';
player_datas[3].nickname = '绮春歌';
player_datas[0].avatar_id = 400102;
player_datas[1].avatar_id = 400104;
player_datas[2].avatar_id = 400105;
player_datas[3].avatar_id = 400106;

config = {
    'category': 1,
    'meta': {'mode_id': 0},
    'mode': {
        'mode': 1,
    }
};

tiles0 = '456m45556p4456s67z';
tiles1 = '1112340678999m';
tiles2 = '1112340678999p';
tiles3 = '23799s55566677z';
paishan = randompaishan('5sHHH6s', '57z....');
roundbegin();
qiepai();
mingqiepai('7s');
moqieliqi('6z');
normalmoqie(3);
zimohu();
