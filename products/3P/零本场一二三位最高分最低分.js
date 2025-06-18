loadproject();

// 主要思路可以参照四麻的十一倍铳满和对应文件
// 这里分两种情况, 不限制本场数和只能零本场
// 不限制本场数一位最高分和二三位最低分都没有限制, 且二位最高分就是零本场情况下的一位最高分
// 零本场限制了用刷本场的方法刷最高分

editdata.player_datas[0].nickname = "一姬-契约";
editdata.player_datas[1].nickname = "一姬当千";
editdata.player_datas[2].nickname = "绮春歌";
editdata.player_datas[0].avatar_id = 400102;
editdata.player_datas[1].avatar_id = 400105;
editdata.player_datas[2].avatar_id = 400106;

editdata.config = {
    'category': 1,
    'meta': {'mode_id': 0},
    'mode': {
        'mode': 11,
        'detail_rule': {
            '_scores_': [105000, 0, 0]
        }
    }
};

// 零本场一位最高分: 393000, 三位最低分: -384000
tiles0 = "11112223334446z";
tiles1 = "1112340678999p";
tiles2 = "222444666888s6z";
paishan = randompaishan("6z", "1m432z");
roundbegin();
for (let i = 0; i < 4; i++) {
    leimingpai(i + 1 + "z", "angang");
    mopai();
}
qiepai();
normalmoqie();
hupai();

gotoju(0, 0, 0);

// 零本场二位最高分: 228500
scores = [36500, 68500, 0];
tiles0 = "2222444666888s6z";
tiles1 = "1112223334446z";
tiles2 = "1112340678999p";
paishan = randompaishan("76z", "1m864s");
roundbegin();
for (let i = 0; i < 4; i++) {
    leimingpai((i + 1) * 2 + "s", "angang");
    mopai();
}
qiepai();
normalmoqie(2);
hupai();

gotoju(0, 0, 0);

// 零本场二位最低分: -96000
scores = [105000, 0, 0];
tiles0 = "11122233344466z";
tiles1 = "1112340678999p";
tiles2 = "1112340678999s";
paishan = randompaishan();
roundbegin();
hupai();
