loadproject();

// 巡目的计数方式是自家摸到或鸣到牌时, 巡目就加一

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

// 要让一家巡目最多, 那该家最好是亲家
// 一上来开四个暗杠, 且自家出的牌
// 被北家碰四次
// 被西家碰四次
// 被南家碰/吃四次
// 27巡
tiles0 = "11112223334445z";
tiles1 = "112233449999m5z";
tiles2 = "112233449999p5z";
tiles3 = "112233449999s5z";
paishan = randompaishan("234s1p.2p.3p.4p.1m..2m..3m..4m", "1s432z");
roundbegin();
combomopai(4);
qiepai();
for (let i = 0; i < 4; i++) {
    mingqiepai("9s");
    normalmoqie();
}
for (let i = 0; i < 4; i++) {
    mingqiepai("9p");
    normalmoqie(2);
}
for (let i = 0; i < 4; i++) {
    mingqiepai("9m");
    normalmoqie(3);
}
normalmoqie(41);
notileliuju();

// 要让一家巡目最少, 那该家最好是北家, 且西家打出的牌
// 被亲家明杠四次
// 被南家碰四次
// 13巡
tiles0 = "11122233344457z";
tiles1 = "112233449999m5z";
tiles2 = "111222888999p5z";
tiles3 = "111222888999s5z";
paishan = randompaishan(".1z.2z.3z.4z.1234m");
roundbegin();
qiepai();
normalmoqie(2);
for (let i = 0; i < 4; i++) {
    mingpai();
    normalmoqie(3);
}
for (let i = 0; i < 4; i++) {
    mingqiepai("9m");
    normalmoqie();
}
normalmoqie(51);
notileliuju();
