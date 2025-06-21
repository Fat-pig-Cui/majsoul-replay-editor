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
            '_sanxiangliuju': true,
        }
    }
};
tiles0 = "1112340678999m6z";
tiles1 = "1112223334446z";
tiles2 = "19m19p19s1234567z";
tiles3 = "222444666888s6z";
paishan = randompaishan();
roundbegin();
qiepai(true);
liuju(5);
