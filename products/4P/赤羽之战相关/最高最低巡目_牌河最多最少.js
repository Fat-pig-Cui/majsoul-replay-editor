clearProject();

// 这里不考虑换三张的情况, 没有什么必要

// 这里分为是否有人和牌跑路的情况, 如果允许有人跑路, 那最低巡目应该是0(人和)
// 所以这里只有 3 * 2 = 6 局:
// 1. 有人跑路, 最高巡目 & 最多几张牌
// 2. 无人跑路, 最高巡目 & 最多几张牌
// 3. 无人跑路, 最低巡目 & 最少几张牌

player_datas[0].nickname = '一姬-契约';
player_datas[1].nickname = '新年初诣';
player_datas[2].nickname = '一姬当千';
player_datas[3].nickname = '绮春歌';
player_datas[0].avatar_id = 400102;
player_datas[1].avatar_id = 400104;
player_datas[2].avatar_id = 400105;
player_datas[3].avatar_id = 400106;

setConfig({
    category: 1,
    meta: {mode_id: 0},
    mode: {
        mode: 1,
        detail_rule: {
            chuanma: true,
            init_point: 200000,
        }
    }
});

// 有人跑路, 最高巡目
// 要让一家巡目最高, 那该家最好是庄家
// 且一上来就点北家, 然后又点西家
// 之后碰南家的牌四次(或亲家暗杠四次)
// 31巡
begin_tiles[0] = '1122334469999m4p';
begin_tiles[1] = '66688m46788p677s';
begin_tiles[2] = '1111222233334s';
begin_tiles[3] = '1111222233334p';
randomPaishan('4s.1234m');
roundBegin();
dingque('pspm');
qiepai();
hupai();

normalMoqie();
hupai();

normalMoqie();
for (let i = 0; i < 4; i++) {
    normalMoqie();
    mingQiepai('9m');
}
normalMoqie(49);
huangpai();

// 无人跑路, 最高巡目
// 要让一家巡目最高, 那该家最好是庄家
// 庄家暗杠四次, 且庄家出的牌
// 被北家碰四次
// 被西家碰四次
// 被南家碰四次
// 23巡
begin_tiles[3] = '1m1111222333444p';
begin_tiles[0] = '19999m55667788s';
begin_tiles[1] = '1m556677889999p';
begin_tiles[2] = '1m112233449999s';
randomPaishan('234p1234s5p.6p.7p.8p.5s..6s..7s..8s');
roundBegin();
dingque('psps');
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
normalMoqie(27);
huangpai();

// 无人跑路, 最低巡目
// 要让一家巡目最低, 那该家最好是北家
// 且 西家出的牌
// 被亲家杠四次
// 被南家杠四次
// 西家暗杠四次
// 赤羽不限制玩家开杠次数
// 8巡
begin_tiles[3] = '1112223334449m9s';
begin_tiles[0] = '111222333444p9s';
begin_tiles[1] = '1112223334449s';
begin_tiles[2] = '555666p5556669s';
randomPaishan('.1234s1m..2m..3m..4m..1p.2p.3p.4p');
roundBegin();
dingque('mpmp');
qiepai('9m');
normalMoqie(1);
mopai();
comboMopai(4);
qiepai();
for (let i = 0; i < 4; i++) {
    mingpai();
    normalMoqie(3);
}
for (let i = 0; i < 4; i++) {
    mingpai();
    normalMoqie(2);
}
normalMoqie(29);
huangpai();


// 有人跑路, 最多几张
// 要让一家牌河最多, 那该家最好是庄家
// 且一上来就点北家, 然后又点西家
// 之后碰南家的牌四次
// 31张
begin_tiles[3] = '1122334469999m4p';
begin_tiles[0] = '66688m46788p677s';
begin_tiles[1] = '1111222233334s';
begin_tiles[2] = '1111222233334p';
randomPaishan('4s.1234m');
roundBegin();
dingque('pspm');
qiepai();
hupai();

normalMoqie();
hupai();

normalMoqie();
for (let i = 0; i < 4; i++) {
    normalMoqie();
    mingQiepai('9m');
}
normalMoqie(49);
huangpai();

// 无人跑路, 最多几张
// 要让一家牌河最多, 那该家最好是庄家
// 且 南家出的牌
// 被亲家碰四次
// 被北家碰四次
// 被西家碰四次
// 20张
begin_tiles[2] = '1122334469999m8s';
begin_tiles[3] = '6667m6667p46667s';
begin_tiles[0] = '1122334469999p';
begin_tiles[1] = '1122334469999s';
randomPaishan('1234m1s.2s.3s.4s.1p..2p..3p..4p');
roundBegin();
dingque('mspp');
qiepai();
for (let i = 0; i < 4; i++) {
    normalMoqie();
    mingQiepai('9m');
}
for (let i = 0; i < 4; i++) {
    normalMoqie();
    mingQiepai('9s');
    normalMoqie();
}
for (let i = 0; i < 4; i++) {
    normalMoqie();
    mingQiepai('9p');
    normalMoqie(2);
}
normalMoqie(31);
huangpai();

// 无人跑路, 最少几张
// 要让一家牌河最少, 那该家最好是北家
// 且 北家出的牌
// 被亲家杠四次
// 被北家杠四次
// 被西家杠四次
// 北家自己也暗杠四次
// 赤羽不限制玩家开杠次数
// 4张
begin_tiles[2] = '1112223334449m9s';
begin_tiles[3] = '111222333444p9s';
begin_tiles[0] = '1112223334449s';
begin_tiles[1] = '555666p5556669s';
randomPaishan('..56p56s1m...2m...3m...4m...1p..2p..3p..4p..1s.2s.3s.4s');
roundBegin();
dingque('mpmp');
qiepai('9m');
normalMoqie(2);
mopai();
comboMopai(4);
qiepai();
for (let i = 0; i < 4; i++) {
    mingpai();
    normalMoqie(4);
}
for (let i = 0; i < 4; i++) {
    mingpai();
    normalMoqie(3);
}
for (let i = 0; i < 4; i++) {
    mingpai();
    normalMoqie(2);
}
normalMoqie(12);
huangpai();
