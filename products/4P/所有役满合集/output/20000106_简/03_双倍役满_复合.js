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

// 第1局: 东亲, 东起 天和, 大三元
tiles0 = "23488m555666777z";
tiles1 = "1112345678999m";
tiles2 = "1112340678999p";
tiles3 = "1112340678999s";
paishan = randompaishan();
roundbegin();
hupai();

// 第2局: 东亲, 东起 天和, 字一色 (大七星)
tiles0 = "11223344556677z";
tiles1 = "1112340678999m";
tiles2 = "1112340678999p";
tiles3 = "1112340678999s";
paishan = randompaishan();
roundbegin();
hupai();

// 第3局: 东亲, 东起 天和, 绿一色
tiles0 = "223344666888s66z";
tiles1 = "1112340678999m";
tiles2 = "1112340678999p";
tiles3 = "1112340678999s";
paishan = randompaishan();
roundbegin();
hupai();

// 第4局: 东亲, 东起 天和, 小四喜
tiles0 = "234m11122233344z";
tiles1 = "1112340678999m";
tiles2 = "1112340678999p";
tiles3 = "1112340678999s";
paishan = randompaishan();
roundbegin();
hupai();

// 第5局: 东亲, 南起 地和, 大三元
tiles0 = "1112340678999m1z";
tiles1 = "23488m55566677z";
tiles2 = "1112340678999p";
tiles3 = "1112340678999s";
paishan = randompaishan("7z");
roundbegin();
qiepai();
zimohu();

// 第6局: 南亲, 西起 地和, 四暗刻
tiles1 = "1112340678999m7z";
tiles2 = "555m555p555s1122z";
tiles3 = "1112340678999p";
tiles0 = "1112340678999s";
paishan = randompaishan("1z");
roundbegin();
qiepai();
zimohu();

// 第7局: 西亲, 北起 地和, 字一色
tiles2 = "1112340678999m1z";
tiles3 = "1122334455667z";
tiles0 = "1112340678999p";
tiles1 = "1112340678999s";
paishan = randompaishan("7z");
roundbegin();
qiepai();
zimohu();

// 第8局: 北亲, 东起 地和, 绿一色
tiles3 = "1112340678999m1z";
tiles0 = "223344666888s6z";
tiles1 = "1112340678999p";
tiles2 = "1112340678999s";
paishan = randompaishan("6z");
roundbegin();
qiepai();
zimohu();

// 第9局: 东亲, 南起 地和, 国士无双
tiles0 = "1112340678999m1z";
tiles1 = "19m19p19s1123457z";
tiles2 = "1112340678999p";
tiles3 = "1112340678999s";
paishan = randompaishan("6z");
roundbegin();
qiepai();
zimohu();

// 第10局: 南亲, 西起 地和, 小四喜
tiles1 = "1112340678999m1z";
tiles2 = "234m1112223334z";
tiles3 = "1112340678999p";
tiles0 = "1112340678999s";
paishan = randompaishan("4z");
roundbegin();
qiepai();
zimohu();

// 第11局: 西亲, 北起 地和, 九莲宝灯
tiles2 = "11122233344457z";
tiles3 = "1111234678999m";
tiles0 = "1112340678999p";
tiles1 = "1112340678999s";
paishan = randompaishan("0m");
roundbegin();
qiepai();
zimohu();

// 第12局: 北亲, 北起 大三元, 四暗刻
tiles3 = "222m88p155566677z";
tiles0 = "1112340678999m";
tiles1 = "1112340678999p";
tiles2 = "1112340678999s";
paishan = randompaishan("1117z");
roundbegin();
qiepai("1z");
normalmoqie(3);
zimohu();

// 第13局: 北亲, 北起 大三元, 字一色
tiles3 = "12233555666777z";
tiles0 = "1112340678999m";
tiles1 = "1112340678999p";
tiles2 = "1112340678999s";
paishan = randompaishan("2z");
roundbegin();
qiepai("1z");
normalmoqie();
hupai();

// 第14局: 北亲, 北起 大三元, 四杠子 (副露)
tiles3 = "555m12555666777z";
tiles0 = "1111234678999m";
tiles1 = "1112340678999p";
tiles2 = "1112340678999s";
paishan = randompaishan("5z", "276z0m");
roundbegin();
qiepai("1z");
normalmoqie();
mingpai();
mopai();
combomopai(3);
hupai();

// 第15局: 北亲, 北起 四暗刻, 字一色
tiles3 = "1s1112223335566z";
tiles0 = "1112340678999m";
tiles1 = "1112340678999p";
tiles2 = "1113340678999s";
paishan = randompaishan("5z", "4z");
roundbegin();
qiepai("1s");
mingpai();
normalmoqie();
zimohu();

// 第16局: 北亲, 北起 四暗刻, 绿一色
tiles3 = "122244466688s66z";
tiles0 = "1112340678999m";
tiles1 = "1112340678999p";
tiles2 = "1113340678999s";
paishan = randompaishan("6z", "4z");
roundbegin();
qiepai("1s");
mingpai();
normalmoqie();
zimohu();

// 第17局: 北亲, 北起 四暗刻, 清老头
tiles3 = "11999m11999p1999s";
tiles0 = "2223405567888m";
tiles1 = "2223405567888p";
tiles2 = "1113405567888s";
paishan = randompaishan("1m", "4z");
roundbegin();
qiepai("1s");
mingpai();
normalmoqie();
zimohu();

// 第18局: 北亲, 北起 四暗刻, 小四喜
tiles3 = "1222s1112223344z";
tiles0 = "2223405567888m";
tiles1 = "2223405567888p";
tiles2 = "1113405567888s";
paishan = randompaishan("3z", "5z");
roundbegin();
qiepai("1s");
mingpai();
normalmoqie();
zimohu();

// 第19局: 北亲, 北起 字一色, 小四喜
tiles3 = "11122233445557z";
tiles0 = "2223405567888m";
tiles1 = "2223405567888p";
tiles2 = "2223405567888s";
paishan = randompaishan("3z");
roundbegin();
qiepai();
normalmoqie();
hupai();

// 第20局: 北亲, 北起 字一色, 四杠子 (副露)
tiles3 = "11122233355567z";
tiles0 = "2223405567888m";
tiles1 = "2223405567888p";
tiles2 = "2223405567888s";
paishan = randompaishan("1z", "6532z");
roundbegin();
qiepai();
normalmoqie();
mingpai();
mopai();
combomopai(3);
hupai();

// 第21局: 北亲, 北起 绿一色, 四杠子 (副露)
tiles3 = "222444666888s67z";
tiles0 = "2223405567888m";
tiles1 = "2223405567888p";
tiles2 = "1111333377779s";
paishan = randompaishan("2s", "6z864s");
roundbegin();
qiepai();
normalmoqie();
mingpai();
mopai();
combomopai(3);
hupai();

// 第22局: 北亲, 北起 清老头, 四杠子 (副露)
tiles3 = "1999m111999p999s6z";
tiles0 = "2223405567888m";
tiles1 = "2223405567888p";
tiles2 = "2223405567888s";
paishan = randompaishan("9s", "19m19p");
roundbegin();
qiepai();
normalmoqie();
mingpai();
mopai();
combomopai(3);
hupai();

// 第23局: 北亲, 北起 小四喜, 四杠子 (副露)
tiles3 = "111s11122233347z";
tiles0 = "2223405567888m";
tiles1 = "2223405567888p";
tiles2 = "2223405567888s";
paishan = randompaishan("1s", "4321z");
roundbegin();
qiepai();
normalmoqie();
mingpai();
mopai();
combomopai(3);
hupai();
