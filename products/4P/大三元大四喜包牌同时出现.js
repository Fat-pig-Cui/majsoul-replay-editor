loadproject();

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

tiles0 = '1112345678999m6z';
tiles1 = '377s1234556677z';
tiles2 = '23468s11223344z';
tiles3 = '122344s66788s57z';
paishan = randompaishan('3s', '2s....');
discardtiles = ['6z3s', '1234z', '2468s', '57z71s'];
roundbegin();
qiepai(true);
mingqiepai(12);
normalmoqie();
hupai();
