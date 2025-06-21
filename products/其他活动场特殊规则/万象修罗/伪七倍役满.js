loadproject();

// 雀魂官方的逻辑是大小四喜同时满足的话只会取大四喜, 所以只有六倍役满而不是七倍

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
            'huansanzhang': true,
            'wanxiangxiuluo_mode': true,
        }
    }
};

tiles0 = "b1112340679m899p";
tiles1 = "b112223344z899s";
tiles2 = "b111234067p89m7z";
tiles3 = "b111234067s134z";
paishan = randompaishan("2z", "1z....");
roundbegin();
huansanzhang("899p", "899s", "89m7z", "134z", 1);
qiepai();

zimohu(true);
