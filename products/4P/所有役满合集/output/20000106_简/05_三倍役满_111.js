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
            'init_point': 500000,
        }
    }
};

// 第1局: 东亲, 南起 地和, 大三元, 四暗刻
tiles0 = "1112340678999m1z";
tiles1 = "22p22s555666777z";
tiles2 = "1112340678999p";
tiles3 = "1112340678999s";
paishan = randompaishan("2p");
roundbegin();
qiepai();
zimohu();

// 第2局: 南亲, 西起 地和, 四暗刻, 字一色
tiles1 = "1112340678999m7z";
tiles2 = "1112223335566z";
tiles3 = "1112340678999p";
tiles0 = "1112340678999s";
paishan = randompaishan("5z");
roundbegin();
qiepai();
zimohu();

// 第3局: 西亲, 北起 地和, 四暗刻, 绿一色
tiles2 = "1112340678999m7z";
tiles3 = "22244466688s66z";
tiles0 = "1112340678999p";
tiles1 = "1112340678999s";
paishan = randompaishan("8s");
roundbegin();
qiepai();
zimohu();

// 第4局: 北亲, 东起 地和, 四暗刻, 清老头
tiles3 = "2223405567888m7z";
tiles0 = "111999m11199p11s";
tiles1 = "2223405567888p";
tiles2 = "2223405567888s";
paishan = randompaishan("9p");
roundbegin();
qiepai();
zimohu();

// 第5局: 东亲, 南起 地和, 四暗刻, 小四喜
tiles0 = "2223405567888m7z";
tiles1 = "111m1112223344z";
tiles2 = "2223405567888p";
tiles3 = "2223405567888s";
paishan = randompaishan("3z");
roundbegin();
qiepai();
zimohu();

// 第6局: 南亲, 南起 大三元, 四暗刻, 字一色
tiles1 = "1s1122555666777z";
tiles2 = "2223405567888m";
tiles3 = "2223405567888p";
tiles0 = "1113405567888s";
paishan = randompaishan("1z", "4z");
roundbegin();
qiepai("1s");
mingpai();
normalmoqie();
zimohu();

// 第7局: 南亲, 南起 大三元, 字一色, 四杠子 (副露)
tiles1 = "11123555666777z";
tiles2 = "2223405567888m";
tiles3 = "2223405567888p";
tiles0 = "2223405567888s";
paishan = randompaishan("1z", "2567z");
roundbegin();
qiepai("3z");
normalmoqie();
mingpai();
mopai();
combomopai(3);
hupai();

// 第8局: 南亲, 南起 四暗刻, 字一色, 小四喜
tiles1 = "1s1112223344555z";
tiles2 = "2223405567888m";
tiles3 = "2223405567888p";
tiles0 = "1113405567888s";
paishan = randompaishan("3z", "6z");
roundbegin();
qiepai("1s");
mingpai();
normalmoqie();
zimohu();

// 第9局: 南亲, 南起 字一色, 小四喜, 四杠子 (副露)
tiles1 = "1112223334z5557z";
tiles2 = "2223405567888m";
tiles3 = "2223405567888p";
tiles0 = "2223405567888s";
paishan = randompaishan("5z", "4123z");
roundbegin();
qiepai();
normalmoqie();
mingpai();
mopai();
combomopai(3);
hupai();
