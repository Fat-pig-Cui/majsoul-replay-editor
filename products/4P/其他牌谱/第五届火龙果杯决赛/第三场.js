clearProject();

player_datas[0] = {
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
player_datas[1] = {
    nickname: '114231',
    avatar_id: 405001, // 赤木茂
    level: {id: 10501, score: 2000},
    views: [
        {slot: 0, item_id: 305621}, // 立直棒-盆栽
        {slot: 1, item_id: 305034}, // 和牌-爆炎龙卷
        {slot: 2, item_id: 305038}, // 立直-龙腾
    ]
};
player_datas[2] = {
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
player_datas[3] = {
    nickname: '北雨听海',
    avatar_id: 402602, // 雏桃-契约
    title: 600006, // 魂之契约者-中阶
    level: {id: 10302, score: 700},
    views: [
        {slot: 0, item_id: 305003}, // 狗骨头立直棒
        {slot: 1, item_id: 305209}, // 和牌-安可
        {slot: 2, item_id: 305316}, // 立直-鹿雪冬至
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
tiles0 = '235m22357p1779s14z';
tiles1 = '407m1124068p14s5z';
tiles2 = '3367m3p23567s567z';
tiles3 = '2389m1289p2448s3z';
qiepai_set = ['4z1s9p5z9s7s6p5m3p7z4z7m2s6z7z8p9s7s', '1s5z1s1s7m8p2p7m9p8s5m2s2z8m8s4p6p6z', '5z9m6z7z1m3p4z4z7p3m3s2s3p4p8s9s1p7s', '3z5z8s9p5p9m7p6z2z7p7s8m9m5s8p8p8m'];
randomPaishan('5s7p9m9p8s9m5z6p1s6m8p5z1s9s3s9s6s1m5p0s3s8s3z6p6s4z7p1z7m4z6z1z9p1m2z7z8s2m7p4z5m2m7s7m2s4m5s2s2z3p6z8m4p1m7z6s9m4p8p4p6m4s4m6p1p8m3s6z3p', '1m....');
roundBegin();
qiepai();
normalMoqie(50);
mingQiepai();
normalMoqie(5);
moqieLiqi();
moqieLiuju();

// 东1局1本场
tiles0 = '14579m68p167s2477z';
tiles1 = '234m3777p7s23567z';
tiles2 = '468m34p135789s46z';
tiles3 = '888m299p144566s3z';
qiepai_set = ['2z4z1s1m2m8p2s6p3p7s4m9m9m8p9s2p2p9m', '3z6z7z5z3p1z4s7s3z6m2s1p8p3m7s4s2s5z', '4z6z6z7p6z2m1s3z4m6m9s7z5s2p3m6p2m', '1s1z3z2p3p5z1z1s4z4s1m5z4z5s4s2s'];
randomPaishan('1p7m5p5m2z7p1z4p4s2z6z5z2m1p5p6p3p1z6z3p2s3m2m1z9m1m0p8s1p3z3z1s8p6m4p4z9s2s9m9p0m1p9s1m8s8p7z5z2p3m6p4z3s7s2p5m9m4s3m8s2p2s6p2s9p5z2m', '4p0s....');
roundBegin();
qiepai();
normalMoqie(9);
mingQiepai();
normalMoqie(16);
moqieLiqi();
normalMoqie(24);
moqieLiqi();
normalMoqie(16);
hupai();

// 东2局0本场
tiles1 = '1126m1579p139s556z';
tiles2 = '24p12335799s445z';
tiles3 = '349m44069p1479s3z';
tiles0 = '889m18p5678s1125z';
qiepai_set = ['2z1p2s8p5p2s5z3p', '9s1p4z6z5p3z2p2m4s3p', '2m8p4p4m2p3m7z5z8p7s6p', '1s9p3z4s9s7s2z7m7s1m'];
randomPaishan('2m7m5s6m8p2m5m4z2z2s4m6p5p3m7p3p7m3z7z3m2s2p1s8p0m5m4s7s3p3p6p1m', '4m....');
roundBegin();
qiepai();
normalMoqie(8);
mingQiepai();
normalMoqie(2);
mingQiepai();
normalMoqie(3);
mingQiepai();
normalMoqie(2);
mingQiepai();
normalMoqie(8);
mingQiepai();
normalMoqie(4);
mingQiepai('35s');
normalMoqie(5);
hupai();

// 东2局1本场
tiles1 = '24m123789p18s1237z';
tiles2 = '1467m557p2359s47z';
tiles3 = '12689m379p34s466z';
tiles0 = '2689m688p16779s1z';
qiepai_set = ['1s9m9s8p4p4s8m4p6m7s', '2z3z1s2z8s4m2m7z1z3m', '4z1p1m9s5z7z6z', '3p4z4z1m9p3p7p8m'];
randomPaishan('1p0s2m2p5z9m1z2p3m4z4s2z2s4m4p0p8m6m4p9p3p8s3p4p6z5s3m', '6s....');
roundBegin();
qiepai();
normalMoqie(19);
mingQiepai('30p');
normalMoqie(4);
mingQiepai();
normalMoqie(2);
mingQiepai(5);
normalMoqie(2);
hupai();

// 东3局0本场
tiles2 = '24069m247p468s124z';
tiles3 = '25678m3499p35s27z';
tiles0 = '78m5588p22788s36z';
tiles1 = '39m1346p369s1257z';
qiepai_set = ['6z5z1m2p8m5z6s7m0p2m7p4s7m4s3z2p9s', '9s9m2z8m7z1z5z6s4z2z3s1z3s7z1s4m4m', '2z9m7p1z5z9s6m4z4z7z2m2m7p4s8m6s4m9s', '2m7z6p6z2z9p6z9p1z3z3s7m7p7m8m1s6s6z'];
randomPaishan('9m7s1p4z6p5z4m6m5s1m8m2m6z2p1s5z5m3z3p9s3m5z4m2s6z6s3s4s7s1p8p7p1z0p4z7z3z2m2z4m7m7p3p8s4s1z3m7p7m6p9m2s4s7z8m3m3z0s9s1s2p6m5s6s9s2p6p6z1p', '1m3s....');
roundBegin();
qiepai();
normalMoqie(29);
moqieLiqi();
normalMoqie(13);
mingQiepai();
normalMoqie(25);
zimoHu();

// 东4局0本场
tiles3 = '24456m1168p23s146z';
tiles0 = '166m5p11679s3677z';
tiles1 = '37m3346p248s4567z';
tiles2 = '2457m89p23699s27z';
qiepai_set = ['3z1m6z9s4s1m6m7s5p5z8s5s2z9p', '9p4z7z5z6z1z3s1z8s6s8m3z7p4s2s', '2z1z7z9p3z4z1m2m6s9p7m9m3z2s', '4z6z8s7s1z5z4p8m4p2m2s4p1p6p'];
randomPaishan('7p9p1z5z4s3s6s8s7m4m3s2p7s9p6s1m4s1m1z3z4p8s7m4z4p7s1z6p8m9m4p5z7p7s5m8s8m9p2s5s3z5s3z2p2z2p9s8p5p3m2p3p', '1p....');
roundBegin();
qiepai();
normalMoqie(10);
mingQiepai();
normalMoqie(19);
mingQiepai();
mingQiepai('46p');
normalMoqie(13);
mingQiepai();
normalMoqie(9);
moqieLiqi();
hupai();

// 南1局0本场
tiles0 = '13446m234588p2s35z';
tiles1 = '26m2566p5699s677z';
tiles2 = '0569m3679p24s145z';
tiles3 = '334m334679s1467z';
qiepai_set = ['3z5z4z1m8s1m6m2z3m1m1m1p4z8s2z1p8s6p', '6z6m7m7m9s9s7s1z2m2m2z9p6p5m9m3z2s', '4z1z1z9p5z8s3p2s6m5z6z9p9s2z9m9m7p', '1z5z6z9s8m4z6s3m3z8m2m8m2m6m5m3m3m'];
randomPaishan('2p3s5z8s2m8s4m4z7m1z7z8p7m1s2m3p4s9m8m1m7p1s3m3s7s2s4s2z1z1s3z1p5s9p8m1m2z5z2m1m0s6z7p1p9p9s8m4z5s6s6m8p5m2z0p2z9m7s5m1p3z5p7s8s2s7p1s6p', '3z.6z...8s');
roundBegin();
qiepai();
normalMoqie(31);
moqieLiqi();
normalMoqie(16);
moqieLiqi();
normalMoqie(2);
mopai();
zimingpai();
normalMoqie(10);
moqieLiqi();
moqieLiuju();

// 南1局1本场
tiles0 = '36m3567p8s1234677z';
tiles1 = '11405789m2478p8s';
tiles2 = '1488m12089p124s2z';
tiles3 = '5m34p12389s35677z';
qiepai_set = ['4z3z2z6z1z9m7p2m7z', '5m2p4p4p2p2m7p4z', '4s1m2p5z4m4z1z2z', '1z3z6z5z9s3z4p2z'];
randomPaishan('6s9m1z2s3m1p3s5s2m8p1p6p4p5z4m3m2p8p4s9m7s4z3z6m7p1z6p2m4z7m2z3s9p', '2z9p....');
roundBegin();
qiepai();
normalMoqie(20);
moqieLiqi();
normalMoqie(11);
zimoHu();

// 南2局0本场
tiles1 = '18m369p2456s13457z';
tiles2 = '249m12059p4s2457z';
tiles3 = '35m2p1236789s336z';
tiles0 = '26m12348p178s367z';
qiepai_set = ['3z7z6z8p2s1s3m8s3p1p2m2m', '9p3z9p4z7z1m1m1z3p2z7m6p8p', '4z9m9p7z2z2z6s7z6p2m1p6m', '9m2p1z9p1p6p4p3m1z2z6z3m'];
randomPaishan('6m9m6m3s2s9p6p1z3m8p5z9p9s7s7z1p0m7m3s6p8m1m2z4p2m7p6s1z8s5z7p9s2z1s2z7p7m5m2s7p6p1p3m3s8p6m', '9s2p....');
roundBegin();
qiepai();
normalMoqie(4);
mingQiepai();
normalMoqie(25);
moqieLiqi();
mingQiepai();
normalMoqie(16);
hupai();

// 南2局1本场
tiles1 = '1122m778p249s2345z';
tiles2 = '146668m13p146s45z';
tiles3 = '4589p4067s14466z';
tiles0 = '278m4p1235799s25z';
qiepai_set = ['2z2m4p2p8m7m5s7p3m2z6p8m7z5s9m', '3z4z9s2z6z5z8s1z6z2p3p1m6s1m9m', '1s4z3z1m1p5z4m2p6s4m3m7m', '9p8p1p4m1z7z8p4m7z7p1m9p1p4p'];
randomPaishan('3p4m7s1z5z2p9p6p1p2p6z1s3s8s3z7z1s6s4s3s7p6z5p8p3m6m8m4m2z3p7z6p9m2p7p8m1m7z1p4m9p5s5m3m1p9m6s7m0m', '4p....');
roundBegin();
qiepai();
normalMoqie(4);
mingQiepai();
normalMoqie(2);
mingQiepai();
normalMoqie(5);
mingQiepai();
normalMoqie(2);
mingQiepai();
normalMoqie(17);
mingQiepai();
normalMoqie(6);
mingQiepai();
normalMoqie(13);
hupai();

// 南3局0本场
tiles2 = '68m120p13458s2457z';
tiles3 = '7m39p23556789s22z';
tiles0 = '14789p13466s234z';
tiles1 = '1289m138p347s466z';
qiepai_set = ['4z1p5z1s2z3z8p9p2p5m', '4z9m8m7s5m3p2s5z', '4z5z7z9p1s7z2z8m2p', '9p3p4m7m2m5s8p1z1z4z'];
randomPaishan('4m7p2s6m4s8s1p2m1z5z3m9p2m5m6p6p2p4p5m7z8p7m6z9s9s8s0s1m1z5p5z4p4z7s7p', '6p....');
roundBegin();
qiepai();
normalMoqie(16);
mingQiepai();
normalMoqie();
mingQiepai();
normalMoqie(17);
zimoHu();

// 南4局0本场
tiles3 = '369m2469p12579s23z';
tiles0 = '2479m377p39s1367z';
tiles1 = '147m24p1459s2447z';
tiles2 = '159m8p234069s246z';
qiepai_set = ['3z1z7z3s1z7s9s1p8s1z1p', '9s1s7z1z2z2p8p7m6s7z4z', '9m9s2z8p6z2p4z5p8m5m7p', '3z9p9m5z2z3m8m7z2z0m'];
randomPaishan('7s1m4m6m3m3s1m5z6z6s7s8m3p1z5p7p1z5p5m8p2p8p1p6s4s2z2m1s7z8s2s8m0m1z7z4s5z1p4p7p', '5p....');
roundBegin();
qiepai();
normalMoqie(19);
mingQiepai();
normalMoqie(7);
mingQiepai();
normalMoqie(9);
moqieLiqi();
normalMoqie(4);
hupai();
