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
            'beishuizhizhan_mode': true,
        }
    }
};

tiles0 = "1999p1115556677z";
tiles1 = "222205558888m6z";
tiles2 = "222205558888s3z";
tiles3 = "3333444467777s";
paishan = randompaishan("...9p", "4444z8888p776251z");
roundbegin();
qiepai("1p", true, [2]);
normalmoqie(3);
mopai();
combomopai(3);
qiepai();
normalmoqie(60);
mopai();
combomopai();
qiepai();
hupai();
