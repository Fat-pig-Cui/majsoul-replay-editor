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
            '_sigangbaopai': true,
            '_baogang': true,
            '_chang_ju_ben_num_': [0, 0, 1] // 1本场
        }
    }
};

// 第1局: 一般放铳
tiles0 = "23m123456p22345s7z";
tiles1 = "2223455567888m";
tiles2 = "1112345678999p";
tiles3 = "1112345678999s";
paishan = randompaishan("1m", "2z....");
roundbegin();
qiepai();
normalmoqie();
hupai();

// 第2局: 一般自摸
tiles0 = "123m123456p345s27z";
tiles1 = "2223455567888m";
tiles2 = "1112345678999p";
tiles3 = "1112345678s677z";
paishan = randompaishan("2z", "2z....");
roundbegin();
qiepai();
mingqiepai();
zimohu();

// 第3局: 包牌放铳, 不止一家包牌, 有非包牌部分, 第四家放铳
tiles0 = "12444555666777z";
tiles1 = "2223455567888m";
tiles2 = "2223455567888p";
tiles3 = "2223455567888s";
paishan = randompaishan("765zT4zTT1z", "TTTT");
roundbegin();
qiepai("2z");
normalmoqie();
for (let i = 0; i < 3; i++) {
    mingpai();
    normalmoqie(2);
}
normalmoqie();
mingpai();
normalmoqie(4);
hupai();

// 第4局: 有包杠, 不止一家包牌, 有非包牌部分
tiles0 = "12444555666777z";
tiles1 = "2223455567888m";
tiles2 = "2223455567888p";
tiles3 = "2223455567888s";
paishan = randompaishan("765zT4z", "1zTTT");
roundbegin();
qiepai("2z");
normalmoqie();
for (let i = 0; i < 3; i++) {
    mingpai();
    normalmoqie(2);
}
normalmoqie();
mingpai();
zimohu();

// 第5局: 一般包牌自摸, 只有一家包牌, 只有包牌部分
tiles0 = "1m999m2555666777z";
tiles1 = "2223455567888m";
tiles2 = "2223455567888p";
tiles3 = "2223455567888s";
paishan = randompaishan("765z9mHHH1m", "HHHH");
roundbegin();
qiepai("2z");
normalmoqie();
for (let i = 0; i < 4; i++) {
    mingpai();
    normalmoqie(2);
}
normalmoqie(2);
zimohu();

// 第6局: 混合包牌自摸, 只有一家包牌, 有非包牌部分
tiles0 = "12444555666777z";
tiles1 = "2223455567888m";
tiles2 = "2223455567888p";
tiles3 = "2223455567888s";
paishan = randompaishan("7654zTTT1z", "TTTT");
roundbegin();
qiepai("2z");
normalmoqie();
for (let i = 0; i < 4; i++) {
    mingpai();
    normalmoqie(2);
}
normalmoqie(2);
zimohu();

// 第7局: 一般多家包牌自摸, 有多家包牌, 只有包牌部分
tiles0 = "1999m2555666777z";
tiles1 = "2223455567888m";
tiles2 = "2223455567888p";
tiles3 = "2223455567888s";
paishan = randompaishan("765zH9mHHH1m", "HHHH");
roundbegin();
qiepai("2z");
normalmoqie();
for (let i = 0; i < 3; i++) {
    mingpai();
    normalmoqie(2);
}
normalmoqie();
mingpai();
normalmoqie(4);
zimohu();

// 第8局: 复合包牌自摸, 有多家包牌, 有非包牌部分
tiles0 = "12444555666777z";
tiles1 = "2223455567888m";
tiles2 = "2223455567888p";
tiles3 = "2223455567888s";
paishan = randompaishan("765zT4zTTT1z", "TTTT");
roundbegin();
qiepai("2z");
normalmoqie();
for (let i = 0; i < 3; i++) {
    mingpai();
    normalmoqie(2);
}
normalmoqie();
mingpai();
normalmoqie(4);
zimohu();
