clearProject();

// 参考视频: https://www.bilibili.com/video/BV1zv4116733
// 对局四人: 泷泽和典, 朝仓康心, 多井隆晴, 萩原圣人
// 角色分别使用: 石原碓海, A-37, 如月莲, 明智英树

player_datas[0].nickname = '泷泽和典';
player_datas[1].nickname = '朝仓康心';
player_datas[2].nickname = '多井隆晴';
player_datas[3].nickname = '萩原圣人';
player_datas[0].avatar_id = 403101;
player_datas[1].avatar_id = 404501;
player_datas[2].avatar_id = 403001;
player_datas[3].avatar_id = 401401;
player_datas[0].verified = player_datas[1].verified = player_datas[2].verified = player_datas[3].verified = 2;

setConfig({
    category: 4,
    meta: {mode_id: 0},
    mode: {
        mode: 2,
        detail_rule: {
            _qieshangmanguan: true,
            _toutiao: true,
            _sigangbaopai: true,
            _no_liujumanguan: true,
            _no_lianfengsifu: true,
            _dora_jifan: true,
            _no_leijiyiman: true,
            _no_wyakuman: true,
            _no_guoshiangang: true,

            _chang_ju_ben_num_: [0, 2, 5, 1], // 东3局5本场, 1根棒子
            _scores_: [13200, 49400, 18500, 17900],
            _mainrole_: 1,
        }
    }
});

begin_tiles[2] = '08m2299p468s11236z';
begin_tiles[3] = '127m168p156779s4z';
begin_tiles[0] = '19m330557p125s57z';
begin_tiles[1] = '235789m1233s267z';
setDiscardTiles(['9m1m5z7z1m1s2s5p4m5z8p5s4p4m3z6m2s9s', '2z9s6z7z3s2z7p8m7m9m8m4m1z2m9m1s2m2s', '3z8m2z4s5p1s5s0m3z2p1m8s1z2s1z6z1p2p', '4z1s2m3s1m9s2m7m7z3m5z2z1z7z1p1p1p5s']);
randomPaishan('3p4p9s6z1p7s7p5p1p8p6m3s6p4p8s2z1m4m1s6s6p2z5s2m8p7m4p7z9p8m3z5z4m7s0s3m5z4m1m1z9s9p4s7p7p2m6s5m4p1z2s7z4m6p2p5m3z9m6z8m6m4s1p4z2s8s8p9s7m', '2p....');
roundBegin();
qiepai();
normalMoqie(11);
mingQiepai();
normalMoqie(33);
moqieLiqi();
normalMoqie(20);
mingQiepai('37s');
moqieLiuju();
