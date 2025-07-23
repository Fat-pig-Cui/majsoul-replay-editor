clearproject();

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

config = {
    'category': 1,
    'meta': {'mode_id': 0},
    'mode': {
        'mode': 1,
        'detail_rule': {
            'chuanma': true,
            'init_point': 200000,
        }
    }
};

// 有人跑路, 最高巡目
// 要让一家巡目最高, 那该家最好是庄家
// 且一上来就点北家, 然后又点西家
// 之后碰南家的牌四次(或亲家暗杠四次)
// 31巡
tiles0 = '1122334469999m4p';
tiles1 = '66688m46788p677s';
tiles2 = '1111222233334s';
tiles3 = '1111222233334p';
paishan = randompaishan('4s.1234m');
roundbegin();
dingque('pspm');
qiepai();
hupai();

normalmoqie();
hupai();

normalmoqie();
for (let i = 0; i < 4; i++) {
    normalmoqie();
    mingqiepai('9m');
}
normalmoqie(49);
notileliuju();

// 无人跑路, 最高巡目
// 要让一家巡目最高, 那该家最好是庄家
// 庄家暗杠四次, 且庄家出的牌
// 被北家碰四次
// 被西家碰四次
// 被南家碰四次
// 23巡
tiles3 = '1m1111222333444p';
tiles0 = '19999m55667788s';
tiles1 = '1m556677889999p';
tiles2 = '1m112233449999s';
paishan = randompaishan('234p1234s5p.6p.7p.8p.5s..6s..7s..8s');
roundbegin();
dingque('psps');
combomopai(4);
qiepai();
for (let i = 0; i < 4; i++) {
    mingqiepai('9s');
    normalmoqie();
}
for (let i = 0; i < 4; i++) {
    mingqiepai('9p');
    normalmoqie(2);
}
for (let i = 0; i < 4; i++) {
    mingqiepai('9m');
    normalmoqie(3);
}
normalmoqie(27);
notileliuju();

// 无人跑路, 最低巡目
// 要让一家巡目最低, 那该家最好是北家
// 且 西家出的牌
// 被亲家杠四次
// 被南家杠四次
// 西家暗杠四次
// 赤羽不限制玩家开杠次数
// 8巡
tiles3 = '1112223334449m9s';
tiles0 = '111222333444p9s';
tiles1 = '1112223334449s';
tiles2 = '555666p5556669s';
paishan = randompaishan('.1234s1m..2m..3m..4m..1p.2p.3p.4p');
roundbegin();
dingque('mpmp');
qiepai('9m');
normalmoqie(1);
mopai();
combomopai(4);
qiepai();
for (let i = 0; i < 4; i++) {
    mingpai();
    normalmoqie(3);
}
for (let i = 0; i < 4; i++) {
    mingpai();
    normalmoqie(2);
}
normalmoqie(29);
notileliuju();



// 有人跑路, 最多几张
// 要让一家牌河最多, 那该家最好是庄家
// 且一上来就点北家, 然后又点西家
// 之后碰南家的牌四次
// 31张
tiles3 = '1122334469999m4p';
tiles0 = '66688m46788p677s';
tiles1 = '1111222233334s';
tiles2 = '1111222233334p';
paishan = randompaishan('4s.1234m');
roundbegin();
dingque('pspm');
qiepai();
hupai();

normalmoqie();
hupai();

normalmoqie();
for (let i = 0; i < 4; i++) {
    normalmoqie();
    mingqiepai('9m');
}
normalmoqie(49);
notileliuju();

// 无人跑路, 最多几张
// 要让一家牌河最多, 那该家最好是庄家
// 且 南家出的牌
// 被亲家碰四次
// 被北家碰四次
// 被西家碰四次
// 20张
tiles2 = '1122334469999m8s';
tiles3 = '6667m6667p46667s';
tiles0 = '1122334469999p';
tiles1 = '1122334469999s';
paishan = randompaishan('1234m1s.2s.3s.4s.1p..2p..3p..4p');
roundbegin();
dingque('mspp');
qiepai();
for (let i = 0; i < 4; i++) {
    normalmoqie();
    mingqiepai('9m');
}
for (let i = 0; i < 4; i++) {
    normalmoqie();
    mingqiepai('9s');
    normalmoqie();
}
for (let i = 0; i < 4; i++) {
    normalmoqie();
    mingqiepai('9p');
    normalmoqie(2);
}
normalmoqie(31);
notileliuju();

// 无人跑路, 最少几张
// 要让一家牌河最少, 那该家最好是北家
// 且 北家出的牌
// 被亲家杠四次
// 被北家杠四次
// 被西家杠四次
// 北家自己也暗杠四次
// 赤羽不限制玩家开杠次数
// 4张
tiles2 = '1112223334449m9s';
tiles3 = '111222333444p9s';
tiles0 = '1112223334449s';
tiles1 = '555666p5556669s';
paishan = randompaishan('..56p56s1m...2m...3m...4m...1p..2p..3p..4p..1s.2s.3s.4s');
roundbegin();
dingque('mpmp');
qiepai('9m');
normalmoqie(2);
mopai();
combomopai(4);
qiepai();
for (let i = 0; i < 4; i++) {
    mingpai();
    normalmoqie(4);
}
for (let i = 0; i < 4; i++) {
    mingpai();
    normalmoqie(3);
}
for (let i = 0; i < 4; i++) {
    mingpai();
    normalmoqie(2);
}
normalmoqie(12);
notileliuju();
