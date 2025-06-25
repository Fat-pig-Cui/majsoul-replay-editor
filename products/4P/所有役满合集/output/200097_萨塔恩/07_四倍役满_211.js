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
            'init_point': 750000,
        }
    }
};

// 第1局: 东亲, 东起 天和, 大三元, 四暗刻单骑
tiles0 = "222p22s555666777z";
tiles1 = "1112340678999m";
tiles2 = "1112340678999p";
tiles3 = "1112340678999s";
paishan = randompaishan();
roundbegin();
hupai();

// 第2局: 东亲, 东起 天和, 字一色, 四暗刻单骑
tiles0 = "11122233355566z";
tiles1 = "1112340678999m";
tiles2 = "1112340678999p";
tiles3 = "1112340678999s";
paishan = randompaishan();
roundbegin();
hupai();

// 第3局: 东亲, 东起 天和, 绿一色, 四暗刻单骑
tiles0 = "222444666888s66z";
tiles1 = "1112340678999m";
tiles2 = "1112340678999p";
tiles3 = "1112340678999s";
paishan = randompaishan();
roundbegin();
hupai();

// 第4局: 东亲, 东起 天和, 清老头, 四暗刻单骑
tiles0 = "111999m111999p11s";
tiles1 = "2223405567888m";
tiles2 = "2223405567888p";
tiles3 = "2223405567888s";
paishan = randompaishan();
roundbegin();
hupai();

// 第5局: 东亲, 东起 天和, 小四喜, 四暗刻单骑
tiles0 = "111m11122233344z";
tiles1 = "2223405567888m";
tiles2 = "2223405567888p";
tiles3 = "2223405567888s";
paishan = randompaishan();
roundbegin();
hupai();

// 第6局: 东亲, 南起 地和, 大三元, 四暗刻单骑
tiles0 = "1112340678999m1z";
tiles1 = "222p2s555666777z";
tiles2 = "1112340678999p";
tiles3 = "1112340678999s";
paishan = randompaishan("2s");
roundbegin();
qiepai();
zimohu();

// 第7局: 南亲, 西起 地和, 四暗刻, 大四喜
tiles1 = "1112340678999m1z";
tiles2 = "22m11122233344z";
tiles3 = "1112340678999p";
tiles0 = "1112340678999s";
paishan = randompaishan("4z");
roundbegin();
qiepai();
zimohu();

// 第8局: 南亲, 西起 地和, 字一色, 四暗刻单骑
tiles2 = "1112340678999m1z";
tiles3 = "1112223335556z";
tiles0 = "1112340678999p";
tiles1 = "1112340678999s";
paishan = randompaishan("6z");
roundbegin();
qiepai();
zimohu();

// 第9局: 西亲, 北起 地和, 绿一色, 四暗刻单骑
tiles3 = "1112340678999m1z";
tiles0 = "222444666888s6z";
tiles1 = "1112340678999p";
tiles2 = "1112340678999s";
paishan = randompaishan("6z");
roundbegin();
qiepai();
zimohu();

// 第10局: 北亲, 东起 地和, 清老头, 四暗刻单骑
tiles0 = "2223405567888m1z";
tiles1 = "111999m111999p1s";
tiles2 = "2223405567888p";
tiles3 = "2223405567888s";
paishan = randompaishan("1s");
roundbegin();
qiepai();
zimohu();

// 第11局: 东亲, 南起 地和, 小四喜, 四暗刻单骑
tiles1 = "2223405567888m1z";
tiles2 = "111m1112223334z";
tiles3 = "2223405567888p";
tiles0 = "2223405567888s";
paishan = randompaishan("4z");
roundbegin();
qiepai();
zimohu();

// 第12局: 南亲, 南起 大三元, 字一色, 四暗刻单骑
tiles2 = "11123555666777z";
tiles3 = "2223405567888m";
tiles0 = "2223405567888p";
tiles1 = "2223405567888s";
paishan = randompaishan("32z");
roundbegin();
qiepai("3z");
normalmoqie(2);
hupai();

// 第13局: 南亲, 南起 大三元, 四杠子, 四暗刻单骑
tiles2 = "1111s2555666777z";
tiles3 = "2223405567888m";
tiles0 = "2223405567888p";
tiles1 = "2223405567888s";
paishan = randompaishan("", "2567z");
roundbegin();
combomopai(4);
hupai();

// 第14局: 南亲, 南起 四暗刻, 字一色, 大四喜
tiles2 = "1s1112223334455z";
tiles3 = "2223405567888m";
tiles0 = "2223405567888p";
tiles1 = "1113405567888s";
paishan = randompaishan("4z", "7z");
roundbegin();
qiepai("1s");
mingpai();
normalmoqie();
zimohu();

// 第15局: 南亲, 南起 字一色, 小四喜, 四暗刻单骑
tiles2 = "11122233345557z";
tiles3 = "2223405567888m";
tiles0 = "2223405567888p";
tiles1 = "1113405567888s";
paishan = randompaishan("64z");
roundbegin();
qiepai();
normalmoqie(2);
hupai();

// 第16局: 南亲, 南起 字一色, 四杠子, 四暗刻单骑
tiles2 = "11112223335556z";
tiles3 = "2223405567888m";
tiles0 = "2223405567888p";
tiles1 = "2223405567888s";
paishan = randompaishan("", "6532z");
roundbegin();
combomopai(4);
hupai();

// 第17局: 南亲, 南起 绿一色, 四杠子, 四暗刻单骑
tiles2 = "2222444666888s6z";
tiles3 = "1112340678999m";
tiles0 = "1112340678999p";
tiles1 = "1111333377779s";
paishan = randompaishan("", "6z864s");
roundbegin();
combomopai(4);
hupai();

// 第18局: 南亲, 南起 清老头, 四杠子, 四暗刻单骑
tiles2 = "1111999m111999p1s";
tiles3 = "2223405567888m";
tiles0 = "2223405567888p";
tiles1 = "2223405567888s";
paishan = randompaishan("", "1s9p1p9m");
roundbegin();
combomopai(4);
hupai();

// 第19局: 南亲, 南起 小四喜, 四杠子, 四暗刻单骑
tiles2 = "1111m1112223334z";
tiles3 = "2223405567888m";
tiles0 = "2223405567888p";
tiles1 = "2223405567888s";
paishan = randompaishan("", "4z3z2z1z");
roundbegin();
combomopai(4);
hupai();
