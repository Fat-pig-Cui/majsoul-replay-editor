clearProject();

// 2025雀魂三麻TOP10, 其中的NO.1: 四连岭上 https://www.bilibili.com/video/BV1v3cizyEGj?t=583

player_datas[0].nickname = 'i惞';
player_datas[1].nickname = '梨シャイマ';
player_datas[2].nickname = '磯川健斗';
player_datas[0].avatar_id = 407701;
player_datas[1].avatar_id = 400201;
player_datas[2].avatar_id = 408303;
player_datas[0].views = [{slot: 0, item_id: 30560005}]; // 立直棒-动听之源
player_datas[1].views = [{slot: 0, item_id: 305019}]; // 24K金棒
player_datas[2].views = [{slot: 0, item_id: 30560006}]; // 立直棒-立奇棒

setConfig({
    category: 2,
    meta: {mode_id: 19},
    mode: {
        mode: 11,
        detail_rule: {
            _chang_ju_ben_num_: [0, 0, 0],
            _mainrole_: 0,
            _scores_: [35000, 35000, 35000],
        }
    }
});

begin_tiles[0] = '11m24p11455s15677z';
begin_tiles[1] = '9m348p230799s125z';
begin_tiles[2] = '1m147p1225679s37z';
setDiscardTiles(['2p4p9m5z7p3z8s4s5s6s5p5s9p6p', '9m8p5z8p2p2p8p3z4p7p6z1z3p9p', '1m3z5z1p7z4p5z9s3p3z1s9s3s']);
randomPaishan('2z6p2s5z9m3s6p3z8p9s7p2p8s2p7p8s4z5z4z3z6s6s4s3p9p7p3z5p6z8p4s7s3s6p4z4s1s', '1p.3s.6p.4z.6z1m7z1z9p1z8p');
roundBegin();
qiepai();
normalMoqie(2);
mingQiepai();
normalMoqie(11);
mingQiepai();
normalMoqie(3);
mopai();
comboMopai();
qiepai();
normalMoqie();
mopai();
comboMopai();
qiepai();
normalMoqie(11);
mingQiepai();
normalMoqie();
mingQiepai();
normalMoqie(3);
mopai();
comboMopai();
qiepai();
moqieLiqi();
mopai();
comboMopai(4);
hupai();
