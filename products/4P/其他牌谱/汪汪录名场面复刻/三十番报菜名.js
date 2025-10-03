clearProject();

// 2023雀魂三麻TOP10, 其中的NO.7: 三十番报菜名 https://www.bilibili.com/video/BV1a4421A7SM?t=163

player_datas[0].nickname = '竹炭sama';
player_datas[1].nickname = '小狸ovo';
player_datas[2].nickname = 'えちょお';
player_datas[0].avatar_id = 404801;
player_datas[1].avatar_id = 400101;
player_datas[2].avatar_id = 404901;

setConfig({
    category: 2,
    meta: {mode_id: 17},
    mode: {
        mode: 11,
        detail_rule: {
            _chang_ju_ben_num_: [0, 2, 0],
            _mainrole_: 0,
            _scores_: [51000, 27600, 26400],
        }
    }
});

begin_tiles[0] = '19m114p17s114456z';
begin_tiles[1] = '99m2368p23777s22z';
begin_tiles[2] = '19m220578p1245s23z';
setDiscardTiles(['4p6p7s6s3p9p1m8s9m8s3p8s5p5s4s6s1s6p', '2p6p3p8p9s9p9m9m7p5p8s9s5z8p1s6s9p6z', '3z1m2z3z9s5s2z9m1m8p5s9s3p9p1s1m0s4p3z']);
randomPaishan('7z3s6p8s9s3z1z4s1p3s7p3p9p2z9p3s5s6s7p1m8s7z6z5p4z9s9s3p5z3p8s2s9p5p8p0s5s1s1m4s5z6s4p5z9p4s6p2s', '7z3z4z6p1p4p7p6z..3z8s6z6s7z9s');
roundBegin();
qiepai();
normalMoqie(2);
mingQiepai();
normalMoqie(3);
mingQiepai();
normalMoqie(2);
mingpai();
normalMoqie();
normalMoqie();
mopai();
comboMopai(2);
qiepai();
normalMoqie(6);
mopai();
comboMopai();
qiepai();
normalMoqie(6);
mingQiepai();
normalMoqie(2);
mingQiepai();
mopai();
comboMopai();
qiepai();
normalMoqie(15);
mingQiepai();
normalMoqie(3);
moqieLiqi();
normalMoqie();
mopai();
comboMopai();
qiepai();
normalMoqie(2);
hupai();
