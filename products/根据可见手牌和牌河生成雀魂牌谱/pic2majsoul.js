clearProject();

player_datas[0].nickname = '一姬-契约';
player_datas[1].nickname = '新年初诣';
player_datas[2].nickname = '一姬当千';
player_datas[3].nickname = '绮春歌';
player_datas[0].avatar_id = 400102;
player_datas[1].avatar_id = 400104;
player_datas[2].avatar_id = 400105;
player_datas[3].avatar_id = 400106;

setConfig({
    category: 3,
    meta: {mode_id: 0},
    mode: {
        mode: 2,
        detail_rule: {
            _chang_ju_ben_num_: [0, 2, 10],
            _mainrole_: 2,
            _scores_: [9500, 14700, 64800, 11000],
        }
    }
});

setPlayGame({
    tiles0: '5m489p359s234z',
    tiles1: '6z',
    tiles2: '123m6z',
    tiles3: '48m126p112359s26z',
    lst_mopai: '6z',
    dora: ['4s', '3z', '8p', '1s'],
    li_dora: ['9p', '9m', '4m', '9m'],
    paihe0: '6s5p4s8m6p6s6mg4mg9pg 5mg7pg7mg7s0mg3pg 1mg2mg',
    paihe1: '5p8p9sg4p2sg3sg 3pg1m2zg6m7mg8s 8pg2zg3mg5p3m4m',
    paihe2: '6m0p7p0s7s7s 3z2s9mg4zg1s3p 6mg5sg2p1p2sg5mgr',
    paihe3: '2m4s7s3s7pg2mg4p 8s7mg4sg1pg4z3zg9sg 2pg2pg9pg9mg',
    fulu0: ['_213m'],
    fulu1: ['_666s', '_534p', '_888m', '8_88s'],
    fulu2: ['5555z', '7777z', '1111z'],
    fulu3: [],
    end_mode: 1,
    hu_seat: [],
    first_op: 1,
});
