clearproject();

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
        'detail_rule': {
            '_guobiao': true,
            '_guobiao_no_8fanfu': true,
            '_guobiao_lianzhuang': true,
        }
    }
};

tiles0 = '147m258p2333469s1z';
tiles1 = '2223334445556z';
tiles2 = '1122336678999p';
tiles3 = '1122445678999s';
paishan = randompaishan('3s');
roundbegin();
qiepai();
normalmoqie();
hupai();
