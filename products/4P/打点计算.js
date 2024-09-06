loadproject();

// 这个主要是在算点的时候有歧义的选择(即选择最大的)

// 第1局, 123m777888999p1z 荣和1z
// 一杯口, 混全 (or 三暗刻)
// 第2局, 777888999p1z 123m 荣和1z
// 三暗刻 (or 混全)
// 第3局, 123m77888999p11z 自摸7p
// 自摸, 一杯口, 混全 (or 自摸, 三暗刻)
// 第4局, 77888999p11z 123m 自摸7p
// 三暗刻 (or 混全)
// 第5局, 111m77888999p11z 荣和7p
// 对对和, 三暗刻 (or 一杯口, 混全)

// 第6局, 1239m777888999p 荣和9m
// 一杯口, 纯全 (or 三暗刻)
// 第7局, 9m777888999p 123m 荣和9m
// 三暗刻 (or 纯全)
// 第8局, 11123m77888999p 自摸7p
// 自摸, 一杯口, 纯全 (or 自摸, 三暗刻)
// 第9局, 11m77888999p 789m 自摸7p
// 三暗刻 (or 纯全)
// 第10局, 11199m77888999p 荣和7p
// 对对和, 三暗刻 (or 一杯口, 纯全)

// 第11局, 123m123p1123344s 荣和2s
// 一杯口, 三色同顺 (or 平和, 一杯口 or 平和, 一杯口, 三色同顺)

editdata.player_datas[0].nickname = "一姬-契约";
editdata.player_datas[1].nickname = "海滩派对";
editdata.player_datas[2].nickname = "新年初诣";
editdata.player_datas[3].nickname = "一姬当千";
editdata.player_datas[0].avatar_id = 400102;
editdata.player_datas[1].avatar_id = 400103;
editdata.player_datas[2].avatar_id = 400104;
editdata.player_datas[3].avatar_id = 400105;

editdata.config = {
    'category': 1,
    'meta': {'mode_id': 0},
    'mode': {
        'mode': 1,
        'detail_rule': {
            'init_point': 100000,
        }
    }
};

// 第1局, 123m777888999p1z 荣和1z
tiles0 = "123m777888999p15z";
tiles1 = "2223334445557z";
tiles2 = "1112340678999s";
tiles3 = "2223455567888s";
paishan = randompaishan("1z", "7z....");
roundbegin();
qiepai();
normalmoqie();
hupai();

// 第2局, 777888999p1z 123m 荣和1z
tiles0 = "12m777888999p2s15z";
tiles1 = "2223334445557z";
tiles2 = "888m3666777999s";
tiles3 = "2223455567888s";
paishan = randompaishan("1z", "7z.7z...3m");
roundbegin();
qiepai("2s");
mingpai();
normalmoqie();
mingqiepai("5z")
normalmoqie();
hupai();

// 第3局, 123m77888999p11z 自摸7p
tiles0 = "123m77888999p115z";
tiles1 = "2223334445557z";
tiles2 = "1112340678999s";
tiles3 = "2223455567888s";
paishan = randompaishan("1117p", "6z....");
roundbegin();
qiepai();
normalmoqie(3);
zimohu();

// 第4局, 77888999p11z 123m 自摸7p
tiles0 = "78m77888999p25s11z";
tiles1 = "111p2223334447z";
tiles2 = "888m3666777999s";
tiles3 = "2223405567888s";
paishan = randompaishan("7p", "5z.5z.6z..29m");
roundbegin();
qiepai("2s");
mingpai();
normalmoqie();
mingqiepai("5s");
mingpai();
normalmoqie();
zimohu();

// 第5局, 111m77888999p11z 荣和7p
tiles0 = "111m77888999p115z";
tiles1 = "3334445556667z";
tiles2 = "1112340678999s";
tiles3 = "2223455567888s";
paishan = randompaishan("7p", "2z....");
roundbegin();
qiepai();
normalmoqie();
hupai();

// 第6局, 1239m777888999p 荣和9m
tiles0 = "1239m777888999p5z";
tiles1 = "1112223334447z";
tiles2 = "1112340678999s";
tiles3 = "2223455567888s";
paishan = randompaishan("9m", "7z....");
roundbegin();
qiepai();
normalmoqie();
hupai();

// 第7局, 9m777888999p 123m 荣和9m
tiles0 = "129m777888999p2s5z";
tiles1 = "1112223334447z";
tiles2 = "888m3666777999s";
tiles3 = "2223455567888s";
paishan = randompaishan("9m", "7z.7z...3m");
roundbegin();
qiepai("2s");
mingpai();
normalmoqie();
mingqiepai("5z")
normalmoqie();
hupai();

// 第8局, 11123m77888999p 自摸7p
tiles0 = "12399m77888999p5z";
tiles1 = "1112223334447z";
tiles2 = "1112340678999s";
tiles3 = "2223455567888s";
paishan = randompaishan("555z7p", "6z....");
roundbegin();
qiepai();
normalmoqie(3);
zimohu();

// 第9局, 11m77888999p 789m 自摸7p
tiles0 = "1178m77888999p25s";
tiles1 = "1112223334447z";
tiles2 = "888m3666777999s";
tiles3 = "2223405567888s";
paishan = randompaishan("7p", "5z.5z.6z..29m");
roundbegin();
qiepai("2s");
mingpai();
normalmoqie();
mingqiepai("5s");
mingpai();
normalmoqie();
zimohu();

// 第10局, 11199m77888999p 荣和7p
tiles0 = "11199m77888999p5z";
tiles1 = "1113334446667z";
tiles2 = "1112340678999s";
tiles3 = "2223455567888s";
paishan = randompaishan("7p", "2z....");
roundbegin();
qiepai();
normalmoqie();
hupai();

// 第11局, 123m123p1123344s 荣和2s
tiles0 = "123m123p1123344s5z";
tiles1 = "1113334446667z";
tiles2 = "4444055566667m";
tiles3 = "4444055566667p";
paishan = randompaishan("2s", "2z....");
roundbegin();
qiepai();
normalmoqie();
hupai();
