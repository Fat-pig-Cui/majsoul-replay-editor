loadproject();

// 这个在万象修罗中是可以正常出现的, 但雀魂官方的逻辑是大小四喜只会取大四喜, 所以只有六倍役满

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
    }
};

tiles0 = '1112340678999m5z';
tiles1 = '1112340678999p';
tiles2 = '1112223333444z';
tiles3 = '1112340678999s';
paishan = randompaishan('53z');
roundbegin();
qiepai();
normalmoqie();
zimohu();
