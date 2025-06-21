loadproject();

// 八连庄放最后, 并且中间加了一个荒牌流局来破坏连续和牌

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
            '_yifanjieguyi': true,
            'init_point': 500000,
        }
    }
};

// 第1局: 推不倒
tiles0 = "33445888p456s557z";
tiles1 = "1334456789999m";
tiles2 = "11123447899p11z";
tiles3 = "1111222244999s";
paishan = randompaishan("2p", "2z....");
roundbegin();
qiepai();
normalmoqie();
hupai();

// 第2局: 赤三色
tiles0 = "340m406p067s24447z";
tiles1 = "1112345678999m";
tiles2 = "1112345678999p";
tiles3 = "1112345678999s";
paishan = randompaishan("2z", "2z....");
roundbegin();
qiepai();
normalmoqie();
hupai();

// 第3局: 三色通贯
tiles0 = "123m456p789s22447z";
tiles1 = "1112345678999m";
tiles2 = "1112345678999p";
tiles3 = "1112345678999s";
paishan = randompaishan("2z", "2z....");
roundbegin();
qiepai();
normalmoqie();
hupai();

// 第4局: 四连刻
tiles0 = "2223334445566m7z";
tiles1 = "1112347778999m";
tiles2 = "1112345678999p";
tiles3 = "1112345678999s";
paishan = randompaishan("5m", "2z....");
roundbegin();
qiepai();
normalmoqie();
hupai();

// 第5局: 一色四同顺
tiles0 = "2222333344455m7z";
tiles1 = "1111788889999m";
tiles2 = "1112345678999p";
tiles3 = "1112345678999s";
paishan = randompaishan("4m", "2z....");
roundbegin();
qiepai();
normalmoqie();
hupai();

// 第6局: 红孔雀
tiles0 = "11155777999s677z";
tiles1 = "1111788889999m";
tiles2 = "1112345678999p";
tiles3 = "1112223334445z";
paishan = randompaishan("7z", "2z....");
roundbegin();
qiepai("6z");
normalmoqie();
hupai();


// 中断连庄的小局
tiles0 = "19m19p189s1234567z";
tiles1 = "19m19p19s1234567z";
tiles2 = "19m19p19s1234567z";
tiles3 = "19m19p19s1234567z";
paishan = randompaishan();
roundbegin();
qiepai("8s");
moqieliuju();


// 第7局: 红一点
tiles0 = "22334466688s677z";
tiles1 = "1111788889999m";
tiles2 = "1112345678999p";
tiles3 = "1112223334445z";
paishan = randompaishan("7z", "2z....");
roundbegin();
qiepai("6z");
normalmoqie();
hupai();

// 第8局: 黑一色
tiles0 = "222444888p11227z";
tiles1 = "1111788889999m";
tiles2 = "1112345678999s";
tiles3 = "3334445556777z";
paishan = randompaishan("2z", "2z....");
roundbegin();
qiepai();
normalmoqie();
hupai();

// 第9局: 十三不搭
tiles0 = "159m258p37s123455z";
tiles1 = "1112340678999m";
tiles2 = "1112340678999p";
tiles3 = "1112340678999s";
paishan = randompaishan("", "2z....");
roundbegin();
hupai();

// 第10局: 百万石
tiles0 = "6667777888899m7z";
tiles1 = "1111222233334m";
tiles2 = "1112340678999p";
tiles3 = "1112340678999s";
paishan = randompaishan("9m", "2z....");
roundbegin();
qiepai();
normalmoqie();
hupai();

// 第11局: 金门桥
tiles0 = "1233455567789m7z";
tiles1 = "1112223344466m";
tiles2 = "1112340678999p";
tiles3 = "1112340678999s";
paishan = randompaishan("7z0m", "2z....");
roundbegin();
qiepai();
normalmoqie(2);
hupai();

// 第12局: 东北新干线
tiles0 = "123456789m11447z";
tiles1 = "1112340678999m";
tiles2 = "1112340678999p";
tiles3 = "1112340678999s";
paishan = randompaishan("74z", "2z....");
roundbegin();
qiepai();
normalmoqie(2);
hupai();

// 第13局: 无发绿一色
tiles0 = "2223344466688s7z";
tiles1 = "1112340678999m";
tiles2 = "1112340678999p";
tiles3 = "1112055678999s";
paishan = randompaishan("8s", "2z....");
roundbegin();
qiepai();
normalmoqie();
hupai();

// 第14局: 八连庄
tiles0 = "123456m234567p67z";
tiles1 = "1112345678999m";
tiles2 = "1112345678999p";
tiles3 = "1112345678999s";
paishan = randompaishan("6z", "2z....");
roundbegin();
qiepai();
normalmoqie();
hupai();
