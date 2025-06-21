loadproject();

editdata.player_datas[0].nickname = "一姬-契约";
editdata.player_datas[1].nickname = "新年初诣";
editdata.player_datas[2].nickname = "一姬当千";
editdata.player_datas[3].nickname = "绮春歌";
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

tiles0 = "112233455699m11z";
tiles1 = "2223334445556z";
tiles2 = "1122336678999p";
tiles3 = "1122345678999s";
paishan = randompaishan("..6m4m");
roundbegin();
qiepai();
normalmoqie(3);
mingqiepai();
normalmoqie();
hupai();
