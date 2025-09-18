clearProject();

// 关于巡目, 巡目的计数方式是自家摸到或鸣到牌时, 巡目就加一

// 关于牌河, 这里认为, 拔的北不算牌河里面的, 因为牌河的特征是不要的牌, 丢弃的牌, 而拔的北不属于

player_datas[0].nickname = '一姬-契约';
player_datas[1].nickname = '一姬当千';
player_datas[2].nickname = '绮春歌';
player_datas[0].avatar_id = 400102;
player_datas[1].avatar_id = 400105;
player_datas[2].avatar_id = 400106;

setConfig({
    category: 1,
    meta: {mode_id: 0},
    mode: {
        mode: 11,
        detail_rule: {}
    }
});

// 要让一家巡目最多, 那该家最好是亲家
// 一上来拔四个北, 开四个暗杠
// 且 自家出的牌
// 被西家碰四次
// 被南家碰四次
// 28巡
begin_tiles[0] = '11122233345556z';
begin_tiles[1] = '22337788p9999s6z';
begin_tiles[2] = '1199m1199p1111s6z';
randomPaishan('9m192p.3p.7p.8p', '6z1m5321444z');
roundBegin();
comboMopai(8);
qiepai();
for (let i = 0; i < 4; i++) {
    mingQiepai('1s');
    normalMoqie();
}
for (let i = 0; i < 4; i++) {
    mingQiepai('9s');
    normalMoqie(2);
}
moqieLiuju();

// 要让一家巡目最少, 那该家最好是西家
// 亲家拔四北, 且南家出的牌被亲家杠四次
// 14巡
begin_tiles[0] = '11122233345556z';
begin_tiles[1] = '222333777888p6z';
begin_tiles[2] = '111999m111999p6z';
randomPaishan('1235z', '6z.....444z');
roundBegin();
comboMopai(4);
qiepai();
normalMoqie();
for (let i = 0; i < 4; i++) {
    mingpai();
    normalMoqie(2);
}
moqieLiuju();


// 要让一家牌河最多, 那该家最好是亲家
// 且 南家出的牌
// 被亲家碰四次
// 被西家碰四次
// 且 无人拔北
// 23张
begin_tiles[0] = '9999s1122334457z';
begin_tiles[1] = '1m566678p157s555z';
begin_tiles[2] = '1122334469999p';
randomPaishan('1234z1p.2p.3p.4p');
roundBegin();
qiepai();
for (let i = 0; i < 4; i++) {
    normalMoqie();
    mingQiepai('9s');
}
normalMoqie();
mingQiepai('9p');
for (let i = 0; i < 3; i++) {
    normalMoqie(2);
    mingQiepai('9p');
}
moqieLiuju();

// 要让一家牌河最少, 那该家最好是西家
// 且 西家出的牌
// 被亲家杠四次
// 被南家碰四次
// 且 四个北全拔
// 11张
begin_tiles[0] = '11122233344445z';
begin_tiles[1] = '1122334469999p';
begin_tiles[2] = '9m135666p147s555z';
randomPaishan('.1z.2z.3z.6z.1234p', '7666z');
roundBegin();
comboMopai(4);
qiepai();
normalMoqie();
for (let i = 0; i < 4; i++) {
    normalMoqie();
    mingpai();
    normalMoqie(2);
}
for (let i = 0; i < 4; i++) {
    normalMoqie();
    mingQiepai('9p');
}
moqieLiuju();
