clearproject();

player_datas[0] = {
    'nickname': '114231',
    'avatar_id': 405001, // 赤木茂
    'level': {'id': 10501, 'score': 2000},
    'views': [
        {'slot': 0, 'item_id': 305002}, // 大葱立直棒
        {'slot': 1, 'item_id': 305034}, // 和牌-爆炎龙卷
        {'slot': 2, 'item_id': 305038}, // 立直-龙腾
    ]
};
player_datas[1] = {
    'nickname': '北雨听海',
    'avatar_id': 402602, // 雏桃-契约
    'title': 600006, // 魂之契约者-中阶
    'level': {'id': 10302, 'score': 700},
    'views': [
        {'slot': 0, 'item_id': 305003}, // 狗骨头立直棒
        {'slot': 1, 'item_id': 305008}, // 和牌-旋风
        {'slot': 2, 'item_id': 305316}, // 立直-鹿雪冬至
    ]
};
player_datas[2] = {
    'nickname': '领取好运',
    'avatar_id': 402202, // 约瑟夫-契约
    'title': 600038, // 神社贵宾
    'avatar_frame': 305523, // 头像框-猫咪军团的身份
    'level': {'id': 10501, 'score': 2000},
    'views': [
        {'slot': 0, 'item_id': 305049}, // 立直棒-炎夏型一姬甜筒
        {'slot': 1, 'item_id': 308021}, // 和牌-高岭之花
        {'slot': 2, 'item_id': 308022}, // 立直-未来视
        {'slot': 5, 'item_id': 305523}, // 头像框-猫咪军团的身份
    ]
};
player_datas[3] = {
    'nickname': '猛吞',
    'avatar_id': 400102, // 一姬-契约
    'title': 600045, // 一姬当千
    'avatar_frame': 305500, // 头像框-豆芽
    'level': {'id': 10401, 'score': 1400},
    'views': [
        {'slot': 0, 'item_id': 305019}, // 24K金棒
        {'slot': 1, 'item_id': 308026}, // 和牌-绝对的命令
        {'slot': 2, 'item_id': 308017}, // 立直-恋之箭矢
        {'slot': 5, 'item_id': 305500}, // 头像框-豆芽
    ]
};

config = {
    'category': 4,
    'meta': {'mode_id': 0},
    'mode': {
        'mode': 2,
    }
};

// 东1局0本场
tiles0 = '125678899m257p36s';
tiles1 = '1237m12p67s22345z';
tiles2 = '26m069p346777s36z';
tiles3 = '69m1568p35s45566z';
paishan = randompaishan('4m3p8p9p9s4s8m7m1s6p7z4p9p1s6s3s5m2s', '1z....');
discardtiles = ['2p5p7p6s3s1s', '4z9p5z3z1s2s', '9p9s3z7z6z', '9m6m1p4z3s'];
roundbegin();
qiepai();
normalmoqie(3);
mingqiepai();
normalmoqie(5);
mingqiepai();
normalmoqie(10);
mingqiepai();
hupai();

// 东2局0本场
tiles1 = '14889m235p206s245z';
tiles2 = '25679m1566p59s56z';
tiles3 = '3346789p1228s37z';
tiles0 = '116m14057p78s157z';
paishan = randompaishan('3m3m6z3s0m9s7m1z3m9s2m9p4z7m4s1z6z7s7z9m7m6z7s6s3s6p5s6s4z4m2z9p8p8m8m3z4z4m2z5m8s4s6m7z3s7p1p4p2p5z7p6m2m3m1s2z2p2m1s8p1s3p3z6s4s9p2s5s1p', '2p....');
discardtiles = ['1z1p6z7z7z5z2m7p5p2z6m2z5z1m3m2m1m', '1m5z9m9p4z9m2z5p9p3z8m8m1z1z1s1s3z2s', '9s6z1p4z6z5z9m4z8p4z8s6m7m7m2m3m2z7z', '3z7z3m7m9s6z9p4m8m4m1s2s2p2m2p1s4s1p'];
roundbegin();
qiepai();
normalmoqie(43);
mingqiepai();
normalmoqie();
moqieliqi();
moqieliuju();

// 东3局0本场
tiles2 = '1266789m78p469s14z';
tiles3 = '2446m1p223678s23z';
tiles0 = '3478m13567p1s257z';
tiles1 = '1206p48s1133455z';
paishan = randompaishan('2p7m7p2p7s4p3z8p1s2m9p2m1m5m4s9m8s4p0m6p2p7p9p6m7s3m1z4m6s3p', '2s....');
discardtiles = ['2z7z5z8s1m7s1p', '4s8s7s2m5m4z1p3m', '4z9s1z3z4p2m1m9p1z', '3z2z2p1p9m2s2m2m'];
roundbegin();
qiepai();
normalmoqie();
mingqiepai();
normalmoqie(5);
mingqiepai();
normalmoqie(21);
moqieliqi();
normalmoqie();
zimohu();

// 东4局0本场
tiles3 = '306m2334468p79s77z';
tiles0 = '26m7888p1408s256z';
tiles1 = '778m49p1279s1124z';
tiles2 = '12358m9p367s1235z';
paishan = randompaishan('5m2p9m2s6z5z9s4z3s3p4m7z7m6s5m7p4z3z1p6z1m2m3p5p5s7z1p7s9p1z3m5p7m', '6p....');
discardtiles = ['1s5z2z2m3z8s3p7z1z', '9p2z4z9s1s2s5z8m1p3m', '3z2z9s1z5z6z3s8m9m3m', '3m2s4z7s4z2m9s5s9p'];
roundbegin();
qiepai();
normalmoqie(15);
mingqiepai();
normalmoqie(5);
mingqiepai(2);
normalmoqie(3);
mingqiepai('12p');
normalmoqie(10);
hupai();

// 南1局0本场
tiles0 = '3389m66p2458s4667z';
tiles1 = '12238m23p5789s77z';
tiles2 = '15679m456p19s155z';
tiles3 = '1468m89p13407s25z';
paishan = randompaishan('5m5m9m4m7z9p4z6s6p4p6m8p6z6m6s7m8m3s4s2p1p', '5p....');
discardtiles = ['4z2s7z4m8p8s8m1p', '8m5s6p1m6z6m3s', '1s9s9p1m9m', '1m9m4z1s2z'];
roundbegin();
qiepai();
normalmoqie(9);
mingqiepai();
mingqiepai('35m');
normalmoqie(4);
mingqiepai();
normalmoqie(8);
hupai();

// 南2局0本场
tiles1 = '5m12340689p19s455z';
tiles2 = '1145778m3p5s1366z';
tiles3 = '389m1148p235s223z';
tiles0 = '13677m15p89s4777z';
paishan = randompaishan('8s8s3z7z7p6p3z6m2m2m7p3p7p9s0s8s4z6s4m3s2m3s5m5z6s5p4s2z6s2s9s6p2m', '6m....');
discardtiles = ['1p8s9s4z4z6m6s6s2m', '9s1s7z2m9s6s3s5p2s', '8s1z3z5s0s3p8m4s9s', '8s5s3m8s3z5z3s8m'];
roundbegin();
qiepai();
normalmoqie(9);
mingqiepai();
normalmoqie(24);
hupai();

// 南3局0本场
tiles2 = '3440m12p2307s1567z';
tiles3 = '115m356679p7s457z';
tiles0 = '238m34p11355s147z';
tiles1 = '236899m267p148s3z';
paishan = randompaishan('1s7m1p5s5p8p2s9s8s8p7s7p6s1m6z8m7p5m9s6p7m8s1m1p3p4m9m5m8p8p', '6m4s....');
discardtiles = ['1z4z7z1s5m8s1s1m', '1s8s7s3z9s6z8m', '1z6z7z5z8m2p9s1p', '4z1s7z5z5m7m9p8p'];
roundbegin();
qiepai();
normalmoqie(24);
moqieliqi();
normalmoqie(5);
hupai();

// 南4局0本场
tiles3 = '2558m23589s12347z';
tiles0 = '79m12488p46688s6z';
tiles1 = '33778m12336p3s16z';
tiles2 = '124m356p28s12677z';
paishan = randompaishan('9m9s4m7s2z5m4p9p5z4z1s2s9p6m1s5z1s7p4z1z2m6p4s0p1m4p3z8m5s6m9p7s7s2p7p', '4m....');
discardtiles = ['1p6z5z2z1s1z2p9m9p', '9s1z4z3p3s2m1m5s7s', '1z6z2z8s1s1m2m6m6p', '3z4z9p2z5z4z1z3z9p7z'];
roundbegin();
qiepai();
normalmoqie(18);
mingqiepai();
normalmoqie(17);
hupai();
