loadproject();

// 这里认为, 拔的北不算牌河里面的, 因为牌河的是不要的牌, 丢弃的牌, 而拔的北不属于

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

// 要让一家牌河最多, 那该家最好是亲
// 且 南家出的牌
// 被亲家碰四次
// 被西家碰四次
// 且 无人拔北
// 23张
tiles0 = "9999s1122334457z";
tiles1 = "1m566678p157s555z";
tiles2 = "1122334469999p";
paishan = randompaishan("1234z1p.2p.3p.4p");
roundbegin();
qiepai();
for (let i = 0; i < 4; i++) {
    mopai();
    qiepai();
    mingpai();
    qiepai("9s");
}
mopai();
qiepai();
mingpai();
qiepai("9p");
for (let i = 0; i < 3; i++) {
    mopai();
    qiepai();
    mopai();
    qiepai();
    mingpai();
    qiepai("9p");
}
for (let i = 0; i < 43; i++) {
    mopai();
    qiepai();
}
notileliuju();

// 要让一家牌河最少, 那该家最好是西家
// 且 西家出的牌
// 被亲家杠四次
// 被南家碰四次
// 且 四个北全拔
// 11张
tiles0 = "11122233344445z";
tiles1 = "1122334469999p";
tiles2 = "9m135666p147s555z";
paishan = randompaishan(".1z.2z.3z.6z.1234p", "7666z");
roundbegin();
for (let i = 0; i < 4; i++) {
    leimingpai();
    mopai();
}
qiepai();
mopai();
qiepai();
for (let i = 0; i < 4; i++) {
    mopai();
    qiepai();
    mingpai();
    mopai();
    qiepai();
    mopai();
    qiepai();
}
for (let i = 0; i < 4; i++) {
    mopai();
    qiepai();
    mingpai();
    qiepai("9p");
}
for (let i = 0; i < 33; i++) {
    mopai();
    qiepai();
}
notileliuju();
