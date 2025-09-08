clearProject();

// 2018雀魂TOP15, 其中的NO.7: '无役岭上累满' https://www.bilibili.com/video/BV1ub411r7Qh/?t=460

player_datas[0].nickname = 'sqn惹不起';
player_datas[1].nickname = '最强之九';
player_datas[2].nickname = 'CSJL';
player_datas[3].nickname = '蒲烧';
player_datas[0].avatar_id = 400201;
player_datas[1].avatar_id = 400101;
player_datas[2].avatar_id = 400101;
player_datas[3].avatar_id = 400101;
player_datas[3].views = [
    {slot: 1, item_id: 305009}, // 和牌-樱花
]

config = {
    category: 2,
    meta: {mode_id: 6},
    mode: {
        mode: 2,
        detail_rule: {
            _mainrole_: 3,
        }
    }
};

tiles0 = '2449m556689p6s126z';
tiles1 = '478p40689s23346z';
tiles2 = '58m69p112335s146z';
tiles3 = '13556688m47s177z';
qiepai_set = ['6s2z9m9s1s1z6z1m1p9s9p2m', '1m9m9m4z6z4z2z5z4s4p2p6z', '9p4z1z6z8m3m2z8p9s6p9m8s', '4s1s2p1z2s2s1p4p1m3m'];
randomPaishan('1m3p1s1m9m6m2p9s9m3m2s2p2p3p2s1s4s8p6m4z4p1p2m3p2z4p7m5z5s7s1p4p9s8m9s0p3p0m9m7s3s6z8s7s', '7m.6s.6s..7m7m');
roundBegin();
qiepai();
normalMoqie(18);
mingQiepai();
normalMoqie(19);
mingQiepai();
normalMoqie(6);
mopai();
comboMopai('8m');
comboMopai();
hupai();
