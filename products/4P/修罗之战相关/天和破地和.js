loadproject();

// 立直麻将和牌算鸣牌的一种, 所以会"天和破地和", 有视频佐证: https://www.bilibili.com/video/BV1mf4y1M7cw

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
    'meta': {'mode_id': 40},
    'mode': {
        'mode': 1,
        'detail_rule': {
            'xuezhandaodi': true,
        }
    }
};

tiles0 = "23458m112p367899s";
tiles1 = "3478p12378s1236z";
tiles2 = "1345667m122p499s";
tiles3 = "29p6s1122334447z";
paishan = randompaishan("6z2s7z", "7z....");
roundbegin();
huansanzhang("8m2p3s", "123z", "16m1p", "29p6s", 1);
hupai();

zimohu();

zimohu(true);
