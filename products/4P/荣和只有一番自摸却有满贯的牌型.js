loadproject();

// 问: 立直情况下, 什么牌型荣和只有1番40符, 但自摸同样的牌是满贯?
// 答: 有条件的三暗刻, 三个暗刻都不是幺九刻, 而且牌型没有断幺九, 雀头不能是役牌.
// 如 123m22444666p88s 荣和/自摸 8s

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
    }
};

// 荣和
tiles0 = "123m22444666p8s34z";
tiles1 = "1112340678999m";
tiles2 = "1112340678999p";
tiles3 = "122550899s3344z";
paishan = randompaishan("8s", "11z....");
roundbegin();
qiepai();
mingpai();
qiepai("1s");
mopai();
qiepai("3z", true);
mingpai();
qiepai("8s");
hupai();

// 自摸
tiles0 = "123m22444666p8s34z";
tiles1 = "1112340678999m";
tiles2 = "1112340678999p";
tiles3 = "122550799s3344z";
paishan = randompaishan("88s", "11z....");
roundbegin();
qiepai();
mingpai();
qiepai("1s");
mopai();
qiepai("3z", true);
mingpai();
qiepai("7s");
mopai();
hupai();
