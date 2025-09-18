clearProject();

// 2018雀魂TOP15, 其中的NO.2: '振w立一摸' https://www.bilibili.com/video/BV1ub411r7Qh/?t=785

player_datas[0].nickname = '猫肆镹';
player_datas[1].nickname = '魅魂';
player_datas[2].nickname = '红烧拉拉肥';
player_datas[3].nickname = '马猴烧酒小圆酱';
player_datas[0].avatar_id = 400201;
player_datas[1].avatar_id = 400401;
player_datas[2].avatar_id = 400101;
player_datas[3].avatar_id = 400101;
player_datas[1].title = 600008; // 称号-魂之启迪者 初阶

setConfig({
    category: 2,
    meta: {mode_id: 2},
    mode: {
        mode: 1,
        detail_rule: {
            _chang_ju_ben_num_: [0, 2, 0], // 东3局0本场
            _scores_: [24600, 25300, 24600, 25500],
            _mainrole_: 3,
        }
    }
});

begin_tiles[2] = '112m48p167778s347z';
begin_tiles[3] = '44567m12p123456s';
begin_tiles[0] = '48m4p13699s34556z';
begin_tiles[1] = '57889m14689p36s2z';
randomPaishan('3p7s2p1m3p', '3z3m....');
roundBegin();
qiepai('3z');
moqieLiqi();
mopai();
qiepai('3z');
mopai();
qiepai('2z');
mopai();
qiepai('4z');
zimoHu();
