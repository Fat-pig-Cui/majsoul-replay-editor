clearproject();

player_datas[0].nickname = '宫永五峰';
player_datas[1].nickname = '仓木幽魂　';
player_datas[2].nickname = 'lyuris';
player_datas[3].nickname = '手柄';
player_datas[0].avatar_id = 400101;
player_datas[1].avatar_id = 400101;
player_datas[2].avatar_id = 400201;
player_datas[3].avatar_id = 402401;

player_datas[2].title = 600027;
player_datas[3].title = 600012;

config = {
    category: 1,
    meta: {room_id: 63031},
    mode: {
        mode: 4,
        detail_rule: {
            init_point: 200000,
            guyi_mode: 1,
        },
        testing_environment: {
            paixing: 3,
        }
    },
};

tiles0 = '11122233344467z';
tiles1 = '1112223334446z';
tiles2 = '1112223334446z';
tiles3 = '1112223334446z';
paishan = separatetile('2z4z2z4s6p9p4m4s7z3s6s2p2s8m4p7s1z9p6m2p3z7p7p3s3m9s6z8m1z9m3p3z4z7m3m1p3z2m9m0p3p1m0s8m5s8p7m3p8m6z3s5z4m3m9s2m5p6p2m3m1s6p5z9s3p9p1z1p1p1m5z1p5s7z2z6s9m1s7p7m1z1p1p');
roundbegin();
qiepai('6z', true);
hupai();
