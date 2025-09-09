clearProject();

// 巡目的计数方式是自家摸到或鸣到牌时, 巡目就加一

player_datas[0].nickname = '一姬-契约';
player_datas[1].nickname = '新年初诣';
player_datas[2].nickname = '一姬当千';
player_datas[3].nickname = '绮春歌';
player_datas[0].avatar_id = 400102;
player_datas[1].avatar_id = 400104;
player_datas[2].avatar_id = 400105;
player_datas[3].avatar_id = 400106;

config = {
    category: 1,
    meta: {mode_id: 0},
    mode: {
        mode: 1,
        detail_rule: {}
    }
};

// 要让一家巡目最多, 那该家最好是亲家
// 一上来开四个暗杠, 且自家出的牌
// 被北家碰四次
// 被西家碰四次
// 被南家碰/吃四次
// 27巡
begin_tiles[0] = '11112223334445z';
begin_tiles[1] = '112233449999m5z';
begin_tiles[2] = '112233449999p5z';
begin_tiles[3] = '112233449999s5z';
randomPaishan('234s1p.2p.3p.4p.1m..2m..3m..4m', '1s432z');
roundBegin();
comboMopai(4);
qiepai();
for (let i = 0; i < 4; i++) {
    mingQiepai('9s');
    normalMoqie();
}
for (let i = 0; i < 4; i++) {
    mingQiepai('9p');
    normalMoqie(2);
}
for (let i = 0; i < 4; i++) {
    mingQiepai('9m');
    normalMoqie(3);
}
moqieLiuju();

// 要让一家巡目最少, 那该家最好是北家, 且西家打出的牌
// 被亲家明杠四次
// 被南家碰四次
// 13巡
begin_tiles[0] = '11122233344457z';
begin_tiles[1] = '112233449999m5z';
begin_tiles[2] = '111222888999p5z';
begin_tiles[3] = '111222888999s5z';
randomPaishan('.1z.2z.3z.4z.1234m');
roundBegin();
qiepai();
normalMoqie(2);
for (let i = 0; i < 4; i++) {
    mingpai();
    normalMoqie(3);
}
for (let i = 0; i < 4; i++) {
    mingQiepai('9m');
    normalMoqie();
}
moqieLiuju();


// 要让一家牌河最多, 那该家最好是亲
// 且 南家出的牌
// 被亲家碰四次
// 被北家碰四次
// 被西家碰/吃四次
// 24张
begin_tiles[0] = '9999s1122334457z';
begin_tiles[1] = '111122226666p5z';
begin_tiles[2] = '333305559999p5z';
begin_tiles[3] = '112233449999m5z';
randomPaishan('1234z1m.2m.3m.4m.4p..4p..4p..4p');
roundBegin();
for (let i = 0; i < 4; i++) {
    qiepai('9s');
    normalMoqie();
    mingpai();
}
qiepai('7z');
for (let i = 0; i < 4; i++) {
    normalMoqie();
    mingQiepai('9m');
    normalMoqie();
}
for (let i = 0; i < 4; i++) {
    normalMoqie();
    mingQiepai('9p');
    normalMoqie(2);
}
moqieLiuju();

// 要让一家牌河最少, 那该家最好是北家,
// 且 北家出的牌
// 被亲家杠四次
// 被南家碰四次
// 被西家碰四次
// 10张
begin_tiles[0] = '11122233344457z';
begin_tiles[1] = '112233449999m5z';
begin_tiles[2] = '112233449999p5z';
begin_tiles[3] = '1111222266667s';
randomPaishan('..1z..2z..3z..4z..1m.2m.3m.4m.1p2p3p4p', '5z....');
roundBegin();
qiepai();
normalMoqie(3);
for (let i = 0; i < 4; i++) {
    mingpai();
    normalMoqie(4);
}
for (let i = 0; i < 4; i++) {
    mingQiepai('9m');
    normalMoqie(2);
}
for (let i = 0; i < 4; i++) {
    mingQiepai('9p');
    normalMoqie();
}
moqieLiuju();
