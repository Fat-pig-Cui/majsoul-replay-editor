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
            'hunzhiyiji_mode': true,
        }
    }
};

tiles0 = "11122233344457z";
tiles1 = "111666m22556p88s";
tiles2 = "340m34p23334405s";
tiles3 = "11112p88s555777z";
paishan = randompaishan("3s..0p", "44p2422s..52p");
roundbegin();
qiepai();
mingpai();
mopai();
combomopai();
qiepai();
mingqiepai("6p");
moqieliqi("2s");
normalmoqie(2);
zimohu();
