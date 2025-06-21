loadproject();

// 巡目的计数方式是自家摸到或鸣到牌时, 巡目就加一

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
    }
};

// 要让一家巡目最多, 那该家最好是亲家
// 一上来拔四个北, 开四个暗杠
// 且 自家出的牌
// 被西家碰四次
// 被南家碰四次
// 28巡
tiles0 = "11122233345556z";
tiles1 = "22337788p9999s6z";
tiles2 = "1199m1199p1111s6z";
paishan = randompaishan("9m192p.3p.7p.8p", "6z1m5321444z");
roundbegin();
combomopai(8);
qiepai();
for (let i = 0; i < 4; i++) {
    mingqiepai("1s");
    normalmoqie();
}
for (let i = 0; i < 4; i++) {
    mingqiepai("9s");
    normalmoqie(2);
}
moqieliuju();

// 要让一家牌河最少, 那该家最好是西家
// 亲家拔四北, 且南家出的牌被亲家杠四次
// 14巡
tiles0 = "11122233345556z";
tiles1 = "222333777888p6z";
tiles2 = "111999m111999p6z";
paishan = randompaishan("1235z", "6z.....444z");
roundbegin();
combomopai(4);
qiepai();
normalmoqie();
for (let i = 0; i < 4; i++) {
    mingpai();
    normalmoqie(2);
}
moqieliuju();
