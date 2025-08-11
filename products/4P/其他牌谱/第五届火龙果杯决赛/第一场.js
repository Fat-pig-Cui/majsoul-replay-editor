clearproject();

player_datas[0] = {
    nickname: '猛吞',
    avatar_id: 400701, // 八木唯
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
player_datas[1] = {
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
player_datas[2] = {
    nickname: '北雨听海',
    avatar_id: 402602, // 雏桃-契约
    title: 600006, // 魂之契约者-中阶
    level: {id: 10302, score: 700},
    views: [
        {slot: 0, item_id: 305003}, // 狗骨头立直棒
        {slot: 1, item_id: 305200}, // 和牌-幽灵嗷嗷
        {slot: 2, item_id: 305316}, // 立直-鹿雪冬至
    ]
};
player_datas[3] = {
    nickname: '114231',
    avatar_id: 405001, // 赤木茂
    level: {id: 10501, score: 2000},
    views: [
        {slot: 0, item_id: 305002}, // 大葱立直棒
        {slot: 1, item_id: 305034}, // 和牌-爆炎龙卷
        {slot: 2, item_id: 305038}, // 立直-龙腾
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
tiles0 = '2267m3p1223568s13z';
tiles1 = '135m2689p677s116z';
tiles2 = '136778m2289s457z';
tiles3 = '1468m3468p79s667z';
qiepaiset = ['3z3p8s9m5z2p2s6s7p6s3z3s1s1s3p4m', '9p6z7s4s3m2z9m3m6s7s6z2z7p1p8m', '4z9p8s5z2s3m1p9p4s5m9s7z2m5z6p', '1m7z8p7z9s3z9s7s2z4z9s6z3s6z8m'];
randompaishan('0m8s7p0s3m9p4p1z3p1s8p9m4s1m7z5z2m3s4m2p2z4s3z4m9m1p9s5s3m9p6m7p8m2z6s6z5m4z3z4p6s9s3s2z5z2p1s7p2m3s4s1p3z5p3p8m6p', '1s....');
roundbegin();
qiepai();
normalmoqie(32);
mingqiepai();
normalmoqie(25);
mingqiepai('45p');
mingqiepai('67m');
hupai();

// 东2局0本场
tiles1 = '1467m13407p15s116z';
tiles2 = '457m1234p1247s44z';
tiles3 = '169m2269p15s2367z';
tiles0 = '23578m5678p34s33z';
qiepaiset = ['5m3s7m2z8m2z7m8m1z', '1m1s9m2z6z4m1p7p4p', '8p1s7m5m4z7z9p9m6z', '9m2z9p9s1s7z9m1m3z'];
randompaishan('8p7p9p9m4p2m3s3p8s4s7m2z0m9s2z6s8s5m8m7z7s2z5p9p9m0s3p9m1m5p7s6z3m1z', '6s....');
roundbegin();
qiepai();
normalmoqie(19);
mingqiepai();
normalmoqie(15);
hupai();

// 东2局1本场
tiles1 = '145666m479p289s46z';
tiles2 = '57788m257p133s23z';
tiles3 = '133479m366p257s6z';
tiles0 = '25m17p3440579s45z';
qiepaiset = ['4z1p5z1p8m9s3z2m9s4s3p4p', '4z1m2s2z1s1p1z7z4p7m4s1s4z9p', '2p2z4z5m1z1s7p5p6z5z3p0m0p3s', '6z7z2s1m3p3m3m5s9p2s9m1z1z'];
randompaishan('3m7z5p1z2m1p8m6z4z8m6s2z5s3p1p1s1z2p6m1p6s8s8p7s6z3m3z7z4s9p8p7m5z1m2s9s4s3p1z4m1s0m9m3p4z0p1z4p6p3z6s6p', '1m....');
roundbegin();
qiepai();
normalmoqie(33);
mingqiepai();
normalmoqie(17);
moqieliqi();
zimohu();

// 东3局0本场
tiles2 = '344799m38p269s137z';
tiles3 = '3m237p3899s22467z';
tiles0 = '168m124667p136s4z';
tiles1 = '599m130p3448s567z';
qiepaiset = ['4z1m4z6s8s1p6z9p8m5z6s', '7z6z5z8s8p1p9m8m9s9m1m', '2s8p3z9s3p4p6s2s5s7s7z', '4z7z3p3m7p8s4z5s2m8p9p'];
randompaishan('2p5z3p6m6z9p0s4z8m4m5s5p8p2m8s0m6m4p4z6s6p5s1s6z7p2s2z9s7s2m5p5s8p5m1m9p7p', '1p....');
roundbegin();
qiepai();
normalmoqie(7);
mingqiepai();
normalmoqie(7);
mingqiepai();
normalmoqie(3);
mingqiepai();
normalmoqie(9);
mingqiepai();
normalmoqie(6);
mingqiepai();
normalmoqie(3);
mingqiepai();
normalmoqie(2);
hupai();

// 东4局0本场
tiles3 = '178m11249p336s257z';
tiles0 = '449m188p11256s66z';
tiles1 = '136m578p379s2557z';
tiles2 = '167799m46p3456s4z';
qiepaiset = ['9m1z1p6s5s3m4s8s1s1z1z6p2m', '2z7z2z3s1m6m9s7z6m5z5z3m', '1m2m7m2m8m6p4z9s5z7p7s3z', '2z1m9p7z5z6s3z7s1z8m7m8m7m'];
randompaishan('1z8p0m1z9p8s2m5m2s2z7s7m0p5p2m5m1s9s8m2s3m3m3p3z4s6p5z7s8s7z9s4s9p6m2p4m1z6p7p5p1z4p7s8m6p4m3z2s2m', '2p....');
roundbegin();
qiepai();
normalmoqie(34);
moqieliqi();
normalmoqie(5);
moqieliqi();
normalmoqie(8);
hupai();

// 南1局0本场
tiles0 = '2245689m255p678s3z';
tiles1 = '18m133p222489s66z';
tiles2 = '6689m3668p35s125z';
tiles3 = '3m109p4458s12247z';
qiepaiset = ['3z2p2p6z8s8p1s8s1p5m9s', '1m1z2m8m4s6p5m4s1s8s4z', '1z5z5z3p3z1s9m6p2z4p6z', '1z1p7z4z9p7z4s4s4p5m'];
randompaishan('1p7m4p9m1z7p4p2p2m5z7s6z8m3z7m0s6p1s7z8p5m7m5m1s4s3s8s1s4p8p1p9s7m7z0m4z6z9p9s', '6p....');
roundbegin();
qiepai();
normalmoqie(12);
mingqiepai();
normalmoqie();
mingqiepai();
normalmoqie(12);
mingqiepai('35s');
normalmoqie(14);
hupai();

// 南2局0本场
tiles1 = '58899m1247p234s12z';
tiles2 = '136m68p1356799s6z';
tiles3 = '34088m269p27s133z';
tiles0 = '1477m2079p119s34z';
qiepaiset = ['3z1m9s4z1z1m9p1m3s4z1p7p', '1p2z1z8s6s1s1z9m9m8m4s', '6m3p8p9m3m1m1s8p2z', '9p1z4z2p2z6p2m9m8p4s5s'];
randompaishan('6z4z5p7m6m3p2s7m8s5p7s2p5p9m2z1z6s8s9m1m1s1z2z2m1m2m6z8p2m5m8p4s4z6m1p5z5s7z', '9s.7z...3s');
roundbegin();
qiepai();
normalmoqie(3);
mingqiepai();
normalmoqie(18);
mingqiepai();
normalmoqie(3);
mopai();
leimingpai();
normalmoqie(10);
mingqiepai();
normalmoqie(2);
mingqiepai();
normalmoqie(2);
hupai();

// 南3局0本场
tiles2 = '49m347p579s344567z';
tiles3 = '2340m406p3457s37z';
tiles0 = '1279m2268p17s246z';
tiles1 = '123459m9p24889s1z';
qiepaiset = ['4z1m1s2s2s9m1s1p7m1z1s9p2z6z8p9p3p7m', '1z9p1p7z2p9s9m9m8p2s1m9p5z1z6z6p6p8s', '9m5z1s6z7p4m5m9s4s2z3z9s3z7z3s4z7z2z', '7z3z8p7s3z2z1z5p5z1p5z7m3s1m2s5m8s'];
randompaishan('5p8p8m4s1m4m3m1s8p0s1p8s3s2s7z9s3z2s2p9m3z2z1s8m5m1z1p6s6s7m7p8p4s5z1z5z2z1p1s7p3s5z9p9p9s3p6m6p7p3p6m1z4z1m3p6z2m2s9p6p3s5m3m6s7z8s7m6m2z', '1p....');
roundbegin();
qiepai();
normalmoqie(19);
mingqiepai();
normalmoqie(30);
moqieliqi();
moqieliuju();

// 南4局0本场
tiles3 = '11245m6p23679s266z';
tiles0 = '36m339p1378s1123z';
tiles1 = '4699m1244p1456s7z';
tiles2 = '45m9p14568s22345z';
qiepaiset = ['3z2z9p3m6m4z7z0p2m4m7p3p3p7z3m', '1m1s1p2p1s9m4m9m7m2p3z5z7z4p', '9p1z1s5z6z9m3z6p5z1p5p1z4z9s7m', '9s2z7z7m7s6p2m9p8p2p5m5p3s9s9m'];
randompaishan('2s1m1z7z7s6s8m6z7m3s7p3p5s8s5p1p7z1s9m4s4z8p2p9p0p7m6p8p8s9p5z2p2m7m1p5m4m2p5p5p7p3z1z5z0s3s3p9s9s7z6m7m9m3m', '2s....');
roundbegin();
qiepai();
normalmoqie(4);
mingqiepai();
normalmoqie(12);
mingqiepai();
normalmoqie(27);
mingqiepai();
normalmoqie(3);
mingqiepai('12s');
normalmoqie(8);
hupai();

// 南4局1本场
tiles3 = '169m1366p458s1123z';
tiles0 = '2569m449p258s156z';
tiles1 = '1366789m233p77s6z';
tiles2 = '2458m1289p34689s';
qiepaiset = ['9m4z5z9p9p1z2m6z4p7p8p1s9m', '3p2z3s1m9m6z9s6m2z7z7z4p1s4m', '8m2m9p9s2m5p5p1p4m2p5z2m1p', '1m3z8s2z9s7s4m4s3m3z3p1p3s7m1m'];
randompaishan('6s3s5p4s4z2z5s1m3p3m8p7s4s4p5z9s9p8m2m4m4m7m1s6s9s5p3m3z5p2z7p7m7s7z1s6s7p7z7z3s8p4p2m6p2s1s1p1m9m4m', '5z....');
roundbegin();
qiepai();
normalmoqie(20);
mingqiepai();
normalmoqie(3);
mingqiepai();
normalmoqie(4);
mingqiepai(2);
normalmoqie(23);
hupai();
