clearProject();

player_datas[0] = {
    nickname: '北雨听海',
    avatar_id: 402602, // 雏桃-契约
    title: 600006, // 魂之契约者-中阶
    level: {id: 10302, score: 700},
    views: [
        {slot: 0, item_id: 305620}, // 立直棒-秘传之卷
        {slot: 1, item_id: 305209}, // 和牌-安可
        {slot: 2, item_id: 305320}, // 立直-立直鸭
    ]
};
player_datas[1] = {
    nickname: '猛吞',
    avatar_id: 400102, // 一姬-契约
    title: 600045, // 一姬当千
    avatar_frame: 305500, // 头像框-豆芽
    level: {id: 10401, score: 1400},
    views: [
        {slot: 0, item_id: 305019}, // 24K金棒
        {slot: 1, item_id: 308026}, // 和牌-绝对的命令
        {slot: 2, item_id: 308017}, // 立直-恋之箭矢
        {slot: 5, item_id: 305500}, // 头像框-豆芽
    ]
};
player_datas[2] = {
    nickname: '114231',
    avatar_id: 405001, // 赤木茂
    level: {id: 10501, score: 2000},
    views: [
        {slot: 0, item_id: 305621}, // 立直棒-盆栽
        {slot: 1, item_id: 305034}, // 和牌-爆炎龙卷
        {slot: 2, item_id: 305300}, // 立直-蝙蝠桀桀
    ]
};
player_datas[3] = {
    nickname: '领取好运',
    avatar_id: 402202, // 约瑟夫-契约
    title: 600038, // 神社贵宾
    avatar_frame: 305523, // 头像框-猫咪军团的身份
    level: {id: 10501, score: 2000},
    views: [
        {slot: 0, item_id: 305049}, // 立直棒-炎夏型一姬甜筒
        {slot: 1, item_id: 308021}, // 和牌-高岭之花
        {slot: 2, item_id: 308022}, // 立直-未来视
        {slot: 5, item_id: 305523}, // 头像框-猫咪军团的身份
    ]
};

config = {
    category: 4,
    meta: {mode_id: 0},
    mode: {
        mode: 2,
        detail_rule: {}
    }
};

// 东1局0本场
begin_tiles[0] = '3m179p3334789s447z';
begin_tiles[1] = '234689m124p68s15z';
begin_tiles[2] = '7m5667p3445s1224z';
begin_tiles[3] = '13406669m68p2s37z';
setDiscardTiles(['1p3m9p2m3p6z9m1p7p7p6z9s3z9m4m', '1z5z5z1z3z1p2s7p4p8s2s1s9s8s', '1z4z7m1z8m3m3z7z1m2z2z7p8p9p', '9s2s8p6p3p9s9p2p3z8p7z1s4p6z']);
randomPaishan('6s8p9s2s7p0s7m7p5z3m1m2m1z1z3p3p3z8m6z5m4s9s9m2s3z9p1p4p7z2p6s3p1m6z7m9p8p7z2s5m7m1s4z1s3z9s6p4p9m8s6z6z4m', '1m2p....');
roundBegin();
qiepai();
normalMoqie(18);
mingQiepai('79m');
normalMoqie(15);
mingQiepai();
normalMoqie();
moqieLiqi();
normalMoqie(6);
mingQiepai();
normalMoqie(12);
hupai();

// 东2局0本场
begin_tiles[1] = '146m199p234779s33z';
begin_tiles[2] = '45m344678p469s23z';
begin_tiles[3] = '1679m245669p8s56z';
begin_tiles[0] = '2889m348p2207s13z';
setDiscardTiles(['2m1z1p2s1z3z5z6z8p8p5z4m', '1m1p6m4m9p9p9s4s8p3m3m8s7m', '3z1s9s6z2z6z1p4s8p4m2p1p2m', '9p1s6z5z1s7z8s9m2p2m2p2p4m']);
randomPaishan('6z1m3s7z1s1s1s7z7p4m1p2s3s5m8p1p1s1z4s6z7z4z5s6z7m1m5z8p8m2m6s3m1p5s3p3m2p2p6m8s2z2p5z7m2m5s4m7s', '3s....');
roundBegin();
qiepai();
normalMoqie(15);
mingQiepai('34s');
normalMoqie(6);
mingQiepai();
normalMoqie(3);
mingQiepai();
normalMoqie(21);
moqieLiqi();
normalMoqie();
zimoHu();

// 东2局1本场
begin_tiles[1] = '179m134689p16s577z';
begin_tiles[2] = '369m13p055s13456z';
begin_tiles[3] = '124068m8p1136s34z';
begin_tiles[0] = '2344m24579p4s156z';
setDiscardTiles(['1z5z9m6z4s2p9s3z7m1p3m6s6z2m9s2z2p', '1m1s5z3m2m9m7m6s4s3p8s5m9p2s5s4z1z9p6m', '3z4z9s9m6z1z5z9s1p3p2z9m3m2s3s3s3z6s2z', '4z3z6s3p1s9p1s8s6z2z2m4s3s4s2s6m7m']);
randomPaishan('4m7p7s4s7m3p9s1p9s4s9m3m3s6p7s2m3s8m6p8p5m9p7s5m6z3m3p9s8s3z5p2s2z7z7m8s0p2z1p5m9m7p1m6p7z4p6s2s3z8m6z5s6s4s2m4z2z2s9s1z4p7p2z9p1m7m2p6m2s', '1s....');
roundBegin();
qiepai();
normalMoqie(23);
mingQiepai('34p');
normalMoqie(9);
mingQiepai();
normalMoqie(10);
moqieLiqi();
moqieLiuju();

// 东3局2本场
begin_tiles[2] = '107m130567p7s1145z';
begin_tiles[3] = '457m12458p78s367z';
begin_tiles[0] = '1223359m3p148s23z';
begin_tiles[1] = '12479m27p2239s34z';
setDiscardTiles(['1s2z8s3z3p9m7z6z4z2p8p4s6s3z', '3z4z5z1m9s9m2z8s2p3s7p3s8p5z4s4m', '4z1m5z7m3p7p6s5s9p5p4p9p1p5s6z2z', '3z7z1p2z6z8p3s1s6s2s4p5p7p8s6p']);
randomPaishan('2p6m6p7p6s1m4p7s2z0s5z4m3s3s8m3p5m4s4p6m8m3m6m6s7m7z2z5s1s6z8s9p9s4z6p2s4p9p9s2p3s1p8m8p8p5s7p4m5z6z6p6s4s2z7s3z2m', '8s....');
roundBegin();
qiepai();
normalMoqie(35);
mingQiepai('13p');
normalMoqie();
mingQiepai();
normalMoqie();
mingQiepai();
normalMoqie(10);
moqieLiqi();
normalMoqie(9);
hupai();

// 东4局0本场
begin_tiles[3] = '1378m1278p1237s33z';
begin_tiles[0] = '58m467p468s12357z';
begin_tiles[1] = '59m34678p2089s47z';
begin_tiles[2] = '2277m067p3689s47z';
setDiscardTiles(['1z7z3z9s9p4p3p5z6p7p', '1z7z4z2s1z7z9m5m7s6z', '7z9s9s2p7m6z1s4z3s1s', '7s3s3m2p2s3z6p3z2s1z']);
randomPaishan('4m1z4s3s2z7s6m1m8s7s9s9p9s4s2p2s9p1z1s1p7m7z6z6p3p6s5m1m2z8p4p2s9m6z1s1z6m2p5z9m', '4m8m....');
roundBegin();
qiepai();
normalMoqie(31);
moqieLiqi();
normalMoqie(5);
moqieLiqi();
normalMoqie();
zimoHu();

// 东4局1本场
begin_tiles[3] = '8m133569p279s2246z';
begin_tiles[0] = '357m1347p1467s67z';
begin_tiles[1] = '24499m1349p256s2z';
begin_tiles[2] = '19m2489p2479s337z';
setDiscardTiles(['1s3z7p7z4s1p4z5m4z3p2s6z6z', '2z9p1z5z1p2m6p6s1s2m2s7p', '1m9m8m2s1z7z8p9m9p3s9s', '4z5z9p8m1m5m2s5z1m7z9p3p7s']);
randomPaishan('6z5z2p5z3z6p1z6z4p1z8m5m6p1s5p1m8p4m5m7z3m4s3s5z4z7m6m2z8m6s9m1m4z4s3s9s0s2m5s9p2s5s3z2p7p6m7p', '3m....');
roundBegin();
qiepai();
normalMoqie(45);
mingQiepai();
moqieLiqi();
normalMoqie();
hupai();

// 东4局2本场
begin_tiles[3] = '23445m1p127s11457z';
begin_tiles[0] = '0m22457p2448s346z';
begin_tiles[1] = '137m8p5667899s67z';
begin_tiles[2] = '46m789p345s11227z';
setDiscardTiles(['3z8s9m2z4z1p7p6z0m4s4z7z3z8p', '6z7z3p5z3p3m2z9p5p8p8s5m3m3s', '7z5z4p9m5p0p4s1p2m7p7p2m', '4z1p7z5z7s6s1s5z3s6p8s3m1m']);
randomPaishan('6z9p7m5z1s9m3p4p2m2z5z4s1s1s3p9m5m1p0s5p6s4z2z0p2s6z1m2m5z3s5p1p3s5s5m2m6p7s7p8s7z8m7p9p3z3m8m1m8p3s', '8m....');
roundBegin();
qiepai();
normalMoqie(2);
mingQiepai();
normalMoqie(35);
mingQiepai();
normalMoqie(13);
hupai();

// 南1局0本场
begin_tiles[0] = '45m3488p112406s47z';
begin_tiles[1] = '2356m4569p44s123z';
begin_tiles[2] = '1468m27p299s3457z';
begin_tiles[3] = '27m1245689p6s125z';
setDiscardTiles(['7z4z5z9m6s9s1s4z2p1z', '3z1z1s9p8s6z2z2z1z8m', '1m4z9m7z6z5z9s9s2p8m', '2m1m1z7m2m7z6s2z1s5z']);
randomPaishan('3p9m5p6s1s8s1m5z2z6p2s9m8s7s1s3m6z6z2m9s4m7s7z2p3p7p1m4z8m1p7m2p1z1p9p1z1m3s4z3s', '6z0p....');
roundBegin();
qiepai();
normalMoqie(23);
moqieLiqi();
normalMoqie(12);
moqieLiqi();
normalMoqie(2);
zimoHu();

// 南1局1本场
begin_tiles[0] = '3459m369p3679s127z';
begin_tiles[1] = '12224m1488p1248s';
begin_tiles[2] = '1789m2445p1499s4z';
begin_tiles[3] = '4678m289p35s4556z';
setDiscardTiles(['9m7z2z1z3p3s2z2s7z5m9p2z3z6p1p4s', '1p1s1m4p1z1m5z2s8m4m9p3z5s8p8p', '4z1m1s1s2p9s5p5p3s5z9m6p3p1p', '4z1z6z2p0p3z8p3s1s5s0s6z3s3p6z']);
randomPaishan('6m1s6m5m8m5z1z9s5z6s6s8p8s7s6s4m1z5p0p2z1m3s3z4z3m2s6m2m9p7z4s9m1s0m5s3p0s3z2z9p6p6z6p3z8m3s7p3m7p3p1p8s1p6z4s7m5m', '7z....');
roundBegin();
qiepai();
normalMoqie(25);
mingQiepai();
normalMoqie(13);
mingQiepai();
normalMoqie(17);
mingQiepai();
normalMoqie();
zimoHu();

// 南2局0本场
begin_tiles[1] = '139m29p123367788s';
begin_tiles[2] = '22367m5689p257s4z';
begin_tiles[3] = '278m125689p38s27z';
begin_tiles[0] = '149m2478p29s2345z';
setDiscardTiles(['2p2s4m5s8p7p4p7m3p9m1m5z3z4z', '9m9p2p3m1m5z7p7p2p4p3z1z7m8p6z', '4z5z2s8p9p3m9p6p1z5p8m9m7m8m6p', '2z7z8s3z8p9p2p1p6p5p8m7m9m1m6z']);
randomPaishan('4p3z5s1z5z0s7z0p4s6p2m3p5z8m6s4z9p7z9s7p4z7m7p6p4s3s2p1z1s7z4p5p9m5m3z8m0m6m6z9m6s6m7m2z6z2z8p5s1m9s4s4m6s1s7s', '9s....');
roundBegin();
qiepai();
normalMoqie(7);
mingQiepai();
normalMoqie(2);
mingQiepai();
normalMoqie(7);
mingQiepai();
normalMoqie(4);
mingQiepai();
normalMoqie(34);
zimoHu();

// 南2局1本场
begin_tiles[1] = '111129m2579p128s1z';
begin_tiles[2] = '799m11667p247s24z';
begin_tiles[3] = '4067m69p346s1346z';
begin_tiles[0] = '23456m58p1257s37z';
setDiscardTiles(['7z3z9s8p7z2s1s5p1p3m2m6m7s4z', '1z2m2m9m5p2p1p9p9p4p2s4s2p9p3s5z', '4z2m7z2z1p2p1p2s4s8s3m2z6m3z3s', '1z4z9p9s5z3z2z2z9m8s4s6m6m3s']);
randomPaishan('5p0p9s3s2m5m3p2m7z5z6s1p8m9s5s4s8s4p7z1s2p8s4m7p8p2z9s4p2z6z9p7s9m1p4p7m3m6m0s6p2z9s4m2p6m7m8p9p3z8m3p8p3s6z4z5z8m', '5m5z7z8m...8s');
roundBegin();
comboMopai();
qiepai();
normalMoqie(27);
mingQiepai();
normalMoqie(8);
moqieLiqi();
mingQiepai();
normalMoqie(20);
zimoHu();

// 南3局0本场
begin_tiles[2] = '158m3459p13446s33z';
begin_tiles[3] = '128m22367p68s144z';
begin_tiles[0] = '5667m1144p89s227z';
begin_tiles[1] = '779m3477p1348s34z';
setDiscardTiles(['8s7m5s7z5m2m6s4m0p4m7z7s', '3z4z7z2z1s1m9m2z3p8p8p3m9m', '1m8m1s5z3z8m3z6m7s3s7z5m4z', '1z4z4z1m2m2s3s7p3m3p2m9p']);
randomPaishan('8m9s1m9p0p7z3m5z5s8p5z7p9s2z3p7s5z2m6s8m2s6s2s6m3s4m2z4m7s3s3m4m8p7z5p7z3m5m2m7s9m4z9p1p', '5s....');
roundBegin();
qiepai();
normalMoqie(4);
mingQiepai();
normalMoqie(10);
mingQiepai();
normalMoqie(14);
mingQiepai(2);
normalMoqie();
mingQiepai(2);
normalMoqie(14);
zimoHu();

// 南4局0本场
begin_tiles[3] = '3499m112269p3s115z';
begin_tiles[0] = '138m1167p1568s24z';
begin_tiles[1] = '12378m5p27s34456z';
begin_tiles[2] = '46m24788p124668s';
setDiscardTiles(['4z1s8m3z2z7p2z5m3p8m', '5z6z3z7s9s7s7m4z4z5z', '3z1s1z7p2p6z7p1m6m8s9s', '9p5z5z6p8p3z9p9s3m2z3p1z']);
randomPaishan('3z3s3z3s5m7z1z5z5p7z4p2z7s7m8p3z9s9s6z9p7p7s7p9s2z6p1m4s2m4m3m3p3p2m8s6m8m5z9s8s4s', '7z4p....');
roundBegin();
qiepai();
normalMoqie(14);
mingQiepai();
normalMoqie();
mingQiepai();
normalMoqie(13);
moqieLiqi();
normalMoqie(11);
zimoHu();
