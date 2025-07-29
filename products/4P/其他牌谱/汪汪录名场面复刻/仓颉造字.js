clearproject();

// 2020雀魂TOP20, 其中的TOP3: '仓颉造字' https://www.bilibili.com/video/BV1BV411B7nw/?t=403

player_datas[0].nickname = '珒';
player_datas[1].nickname = '七海单推人';
player_datas[2].nickname = '瑞文丶丶';
player_datas[3].nickname = '纟非';
player_datas[0].avatar_id = 400101;
player_datas[1].avatar_id = 401801;
player_datas[2].avatar_id = 400101;
player_datas[3].avatar_id = 400101;
player_datas[1].title = 600008;

config = {
    category: 2,
    meta: {mode_id: 2},
    mode: {
        mode: 1,
    }
};

tiles0 = '45668m3468p1238s3z';
tiles1 = '17m1155p13408s23z';
tiles2 = '46789m12489p47s4z';
tiles3 = '24589m69p469s255z';
paishan = randompaishan('8s0p7s4z1s6m9m7z7s9s2m2z9s7p5z1z6z2p3m3z1p3m1m8m9p2s2p7z7m9p6s7z2s2m5p5z0m5m3p7z2s3s5s4m5s7p2z3m2m1z4p6z6s1z7p3s1m4z7m3z7p4s7s4z', '1m9s1z3m...2p');
discardtiles = ['8p6p4p3p8s8m8m3s5m5p3p2s4m5s1s6m6m', '3z7m7s9s6z1m5p7m2s5p9p4m3m4p7p7p', '4z1p4s2p2p3m2s9p2m9s7s2s5s6z3s9p4s', '9s7s6s4s9p6p2p6s8m2z3s7p4m6s2p3m7s'];
roundbegin();
qiepai();
normalmoqie(34);
mingqiepai();
normalmoqie(14);
mingqiepai();
normalmoqie(8);
mopai();
leimingpai();
normalmoqie(2);
mingqiepai();
normalmoqie();
moqieliqi();
normalmoqie(3);
zimohu();
