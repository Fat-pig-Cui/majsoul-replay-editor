loadproject();

editdata.player_datas[0].nickname = "一姬-契约";
editdata.player_datas[1].nickname = "新年初诣";
editdata.player_datas[2].nickname = "一姬当千";
editdata.player_datas[3].nickname = "绮春歌";
editdata.player_datas[0].avatar_id = 400102;
editdata.player_datas[1].avatar_id = 400104;
editdata.player_datas[2].avatar_id = 400105;
editdata.player_datas[3].avatar_id = 400106;

editdata.config = {
    'category': 1,
    'meta': {'mode_id': 0},
    'mode': {
        'mode': 1,
        'detail_rule': {
            'init_point': 300000,
        }
    }
};

origin_hupaioneplayer = hupaioneplayer;

transition(2, 0, 0);
// 第1局
hupaioneplayer = function (seat) {
    let fans = [
        {'val': 0, 'id': 9500}, // 自我介绍
        {'val': 0, 'id': 9200},
        {'val': 0, 'id': 9201},
        {'val': 0, 'id': 9202},
        {'val': 0, 'id': 9203},
        {'val': 0, 'id': 9204},
        {'val': 0, 'id': 9205},
        {'val': 0, 'id': 9511}, // 送礼物普通
        {'val': 0, 'id': 9206},
        {'val': 0, 'id': 9603}, // 役满听牌
        {'val': 0, 'id': 9207},
        {'val': 1, 'id': 2},
        {'val': 2, 'id': 18},
        {'val': 1, 'id': 30},
        {'val': 1, 'id': 3},
    ];
    playertiles[seat].length--;
    delta_scores = [-16000, -8000, 32000, -8000];
    return {
        'count': 64,
        'doras': [doras[0]],
        'li_doras': li_doras,
        'fans': fans,
        'fu': 170,
        'hand': [].concat(playertiles[seat]),
        'hu_tile': playertiles[seat][playertiles[seat].length - 1],
        'liqi': false,
        'ming': [],
        'point_rong': 32000,
        'point_sum': 32000,
        'point_zimo_qin': 16000,
        'point_zimo_xian': 8000,
        'qinjia': false,
        'seat': seat,
        'title_id': 11,
        'yiman': false,
        'zimo': true,
    };
}
tiles0 = "1112340678999m7z";
tiles1 = "1112340678999p";
tiles2 = "5555555555555z";
tiles3 = "1112340678999s";
paishan = randompaishan("75z", "7z....");
roundbegin();
qiepai();
normalmoqie();
zimohu();

gotoju(2, 0, 0);

// 第2局
hupaioneplayer = function (seat) {
    let fans = [
        {'val': 1, 'id': 4},
        {'val': 1, 'id': 5},
        {'val': 1, 'id': 6},
        {'val': 1, 'id': 1},
        {'val': 1, 'id': 14},
        {'val': 1, 'id': 13},
        {'val': 3, 'id': 28},
        {'val': 2, 'id': 25},
        {'val': 1, 'id': 7},
        {'val': 1, 'id': 8},
        {'val': 1, 'id': 9},
        {'val': 1, 'id': 9101},
        {'val': 1, 'id': 9102},
        {'val': 1, 'id': 9103},
        {'val': 1, 'id': 9104},
    ];
    playertiles[seat].length--;
    delta_scores = [-16000, -8000, 32000, -8000];
    return {
        'count': 64,
        'doras': [doras[0]],
        'li_doras': li_doras,
        'fans': fans,
        'fu': 170,
        'hand': [].concat(playertiles[seat]),
        'hu_tile': playertiles[seat][playertiles[seat].length - 1],
        'liqi': false,
        'ming': [],
        'point_rong': 32000,
        'point_sum': 32000,
        'point_zimo_qin': 16000,
        'point_zimo_xian': 8000,
        'qinjia': false,
        'seat': seat,
        'title_id': 11,
        'yiman': false,
        'zimo': true,
    };
}
tiles0 = "1112340678999m7z";
tiles1 = "1112340678999p";
tiles2 = "5555555555555z";
tiles3 = "1112340678999s";
paishan = randompaishan("75z", "7z....");
roundbegin();
qiepai();
normalmoqie();
zimohu();

gotoju(2, 0, 0);

// 第3局
hupaioneplayer = function (seat) {
    let fans = [
        {'val': 1, 'id': 10},
        {'val': 1, 'id': 11},
        {'val': 1, 'id': 9107},
        {'val': 1, 'id': 9108},
        {'val': 1, 'id': 12},
        {'val': 2, 'id': 15},
        {'val': 2, 'id': 16},
        {'val': 2, 'id': 17},
        {'val': 2, 'id': 19},
        {'val': 2, 'id': 20},
        {'val': 2, 'id': 21},
        {'val': 2, 'id': 22},
        {'val': 2, 'id': 23},
        {'val': 2, 'id': 24},
        {'val': 3, 'id': 26},
    ];
    playertiles[seat].length--;
    delta_scores = [-16000, -8000, 32000, -8000];
    return {
        'count': 64,
        'doras': [doras[0]],
        'li_doras': li_doras,
        'fans': fans,
        'fu': 170,
        'hand': [].concat(playertiles[seat]),
        'hu_tile': playertiles[seat][playertiles[seat].length - 1],
        'liqi': false,
        'ming': [],
        'point_rong': 32000,
        'point_sum': 32000,
        'point_zimo_qin': 16000,
        'point_zimo_xian': 8000,
        'qinjia': false,
        'seat': seat,
        'title_id': 11,
        'yiman': false,
        'zimo': true,
    };
}
tiles0 = "1112340678999m7z";
tiles1 = "1112340678999p";
tiles2 = "5555555555555z";
tiles3 = "1112340678999s";
paishan = randompaishan("75z", "7z....");
roundbegin();
qiepai();
normalmoqie();
zimohu();

gotoju(2, 0, 0);

// 第4局
hupaioneplayer = function (seat) {
    let fans = [
        {'val': 3, 'id': 27},
        {'val': 6, 'id': 29},
        {'val': 1, 'id': 31},
        {'val': 2, 'id': 31},
        {'val': 3, 'id': 31},
        {'val': 4, 'id': 31},
        {'val': 5, 'id': 32},
        {'val': 6, 'id': 32},
        {'val': 7, 'id': 32},
        {'val': 8, 'id': 32},
        {'val': 9, 'id': 34},
        {'val': 10, 'id': 34},
        {'val': 11, 'id': 34},
        {'val': 12, 'id': 34},
        {'val': 13, 'id': 33},
    ];
    playertiles[seat].length--;
    delta_scores = [-16000, -8000, 32000, -8000];
    return {
        'count': 64,
        'doras': [doras[0]],
        'li_doras': li_doras,
        'fans': fans,
        'fu': 170,
        'hand': [].concat(playertiles[seat]),
        'hu_tile': playertiles[seat][playertiles[seat].length - 1],
        'liqi': false,
        'ming': [],
        'point_rong': 32000,
        'point_sum': 32000,
        'point_zimo_qin': 16000,
        'point_zimo_xian': 8000,
        'qinjia': false,
        'seat': seat,
        'title_id': 11,
        'yiman': false,
        'zimo': true,
    };
}
tiles0 = "1112340678999m7z";
tiles1 = "1112340678999p";
tiles2 = "5555555555555z";
tiles3 = "1112340678999s";
paishan = randompaishan("75z", "7z....");
roundbegin();
qiepai();
normalmoqie();
zimohu();

gotoju(2, 0, 0);

// 第5局
hupaioneplayer = function (seat) {
    let fans = [
        {'val': 0, 'id': 9400}, // 四风连打
        {'val': 0, 'id': 9401}, // 四杠散了
        {'val': 0, 'id': 9402}, // 九种九牌
        {'val': 0, 'id': 9100}, // 流局满贯
        {'val': 0, 'id': 9300},
        {'val': 0, 'id': 9301},
        {'val': 0, 'id': 9302},
        {'val': 0, 'id': 9303},
        {'val': 0, 'id': 9304},
        {'val': 0, 'id': 9305},
        {'val': 0, 'id': 9306},
        {'val': 0, 'id': 9307},
        {'val': 0, 'id': 9308},
        {'val': 0, 'id': 9309},
        {'val': 0, 'id': 9502}, // 登录语音满羁绊
    ];
    playertiles[seat].length--;
    delta_scores = [-16000, -8000, 32000, -8000];
    return {
        'count': 64,
        'doras': [doras[0]],
        'li_doras': li_doras,
        'fans': fans,
        'fu': 170,
        'hand': [].concat(playertiles[seat]),
        'hu_tile': playertiles[seat][playertiles[seat].length - 1],
        'liqi': false,
        'ming': [],
        'point_rong': 32000,
        'point_sum': 32000,
        'point_zimo_qin': 16000,
        'point_zimo_xian': 8000,
        'qinjia': false,
        'seat': seat,
        'title_id': 11,
        'yiman': false,
        'zimo': true,
    };
}
tiles0 = "1112340678999m7z";
tiles1 = "1112340678999p";
tiles2 = "5555555555555z";
tiles3 = "1112340678999s";
paishan = randompaishan("75z", "7z....");
roundbegin();
qiepai();
normalmoqie();
zimohu();

gotoju(2, 0, 0);

// 第6局
hupaioneplayer = function (seat) {
    let fans = [
        {'val': 1, 'id': 35},
        {'val': 1, 'id': 36},
        {'val': 1, 'id': 37},
        {'val': 1, 'id': 38},
        {'val': 1, 'id': 39},
        {'val': 1, 'id': 40},
        {'val': 1, 'id': 41},
        {'val': 1, 'id': 42},
    ];
    playertiles[seat].length--;
    delta_scores = [-96000, -48000, 192000, -48000];
    return {
        'count': 6,
        'doras': [doras[0]],
        'li_doras': li_doras,
        'fans': fans,
        'fu': 170,
        'hand': [].concat(playertiles[seat]),
        'hu_tile': playertiles[seat][playertiles[seat].length - 1],
        'liqi': false,
        'ming': [],
        'point_rong': 192000,
        'point_sum': 192000,
        'point_zimo_qin': 96000,
        'point_zimo_xian': 48000,
        'qinjia': false,
        'seat': seat,
        'title_id': 10,
        'yiman': true,
        'zimo': true,
    };
}
tiles0 = "1112340678999m7z";
tiles1 = "1112340678999p";
tiles2 = "5555555555555z";
tiles3 = "1112340678999s";
paishan = randompaishan("75z", "7z....");
roundbegin();
qiepai();
normalmoqie();
zimohu();

gotoju(2, 0, 0);

// 第7局
hupaioneplayer = function (seat) {
    let fans = [
        {'val': 1, 'id': 43},
        {'val': 1, 'id': 44},
        {'val': 1, 'id': 45},
        {'val': 2, 'id': 47},
        {'val': 2, 'id': 48},
        {'val': 2, 'id': 49},
        {'val': 2, 'id': 50},
        {'val': 0, 'id': 9208},
    ];
    playertiles[seat].length--;
    delta_scores = [-96000, -48000, 192000, -48000];
    return {
        'count': 6,
        'doras': [doras[0]],
        'li_doras': li_doras,
        'fans': fans,
        'fu': 170,
        'hand': [].concat(playertiles[seat]),
        'hu_tile': playertiles[seat][playertiles[seat].length - 1],
        'liqi': false,
        'ming': [],
        'point_rong': 192000,
        'point_sum': 192000,
        'point_zimo_qin': 96000,
        'point_zimo_xian': 48000,
        'qinjia': false,
        'seat': seat,
        'title_id': 10,
        'yiman': true,
        'zimo': true,
    };
}
tiles0 = "1112340678999m7z";
tiles1 = "1112340678999p";
tiles2 = "5555555555555z";
tiles3 = "1112340678999s";
paishan = randompaishan("75z", "7z....");
roundbegin();
qiepai();
normalmoqie();
zimohu();

gotoju(2, 0, 0);

// 第8局
hupaioneplayer = function (seat) {
    let fans = [
        {'val': 0, 'id': 9501}, // 登录语音普通
        {'val': 6, 'id': 1018},
        {'val': 6, 'id': 1019},
        {'val': 6, 'id': 1015},
        {'val': 6, 'id': 1016},
        {'val': 6, 'id': 1017},
        {'val': 4, 'id': 1010},
        {'val': 4, 'id': 1011},
        {'val': 4, 'id': 1012},
        {'val': 5, 'id': 1013},
        {'val': 5, 'id': 1020},
        {'val': 1, 'id': 1021},
    ];
    playertiles[seat].length--;
    delta_scores = [-16000, -8000, 32000, -8000];
    return {
        'count': 64,
        'doras': [doras[0]],
        'li_doras': li_doras,
        'fans': fans,
        'fu': 170,
        'hand': [].concat(playertiles[seat]),
        'hu_tile': playertiles[seat][playertiles[seat].length - 1],
        'liqi': false,
        'ming': [],
        'point_rong': 32000,
        'point_sum': 32000,
        'point_zimo_qin': 16000,
        'point_zimo_xian': 8000,
        'qinjia': false,
        'seat': seat,
        'title_id': 11,
        'yiman': false,
        'zimo': true,
    };
}
tiles0 = "1112340678999m7z";
tiles1 = "1112340678999p";
tiles2 = "5555555555555z";
tiles3 = "1112340678999s";
paishan = randompaishan("75z", "7z....");
roundbegin();
qiepai();
normalmoqie();
zimohu();

gotoju(2, 0, 0);

// 第9局
hupaioneplayer = function (seat) {
    let fans = [
        {'val': 5, 'id': 1014},
        {'val': 2, 'id': 1005},
        {'val': 3, 'id': 1006},
        {'val': 3, 'id': 1007},
        {'val': 3, 'id': 1008},
        {'val': 3, 'id': 1009},
        {'val': 1, 'id': 1001},
        {'val': 1, 'id': 1004},
        {'val': 1, 'id': 1000},
        {'val': 1, 'id': 1002},
        {'val': 0, 'id': 9311}, // 听牌
        {'val': 0, 'id': 9312}, // 未听牌
    ];
    playertiles[seat].length--;
    delta_scores = [-16000, -8000, 32000, -8000];
    return {
        'count': 64,
        'doras': [doras[0]],
        'li_doras': li_doras,
        'fans': fans,
        'fu': 170,
        'hand': [].concat(playertiles[seat]),
        'hu_tile': playertiles[seat][playertiles[seat].length - 1],
        'liqi': false,
        'ming': [],
        'point_rong': 32000,
        'point_sum': 32000,
        'point_zimo_qin': 16000,
        'point_zimo_xian': 8000,
        'qinjia': false,
        'seat': seat,
        'title_id': 11,
        'yiman': false,
        'zimo': true,
    };
}
tiles0 = "1112340678999m7z";
tiles1 = "1112340678999p";
tiles2 = "5555555555555z";
tiles3 = "1112340678999s";
paishan = randompaishan("75z", "7z....");
roundbegin();
qiepai();
normalmoqie();
zimohu();

gotoju(2, 0, 0);

// 第10局
hupaioneplayer = function (seat) {
    let fans = [
        {'val': 0, 'id': 9500},
        {'val': 0, 'id': 9501},
        {'val': 0, 'id': 9502},
        {'val': 0, 'id': 9503},
        {'val': 0, 'id': 9504},
        {'val': 0, 'id': 9505},
        {'val': 0, 'id': 9506},
        {'val': 0, 'id': 9507},
        {'val': 0, 'id': 9508},
        {'val': 0, 'id': 9509},
        {'val': 0, 'id': 9510},
        {'val': 0, 'id': 9511},
        {'val': 0, 'id': 9512},
        {'val': 0, 'id': 9513},
        {'val': 0, 'id': 9514},
    ];
    playertiles[seat].length--;
    delta_scores = [0, 0, 0, 0];
    return {
        'count': 0,
        'doras': [doras[0]],
        'li_doras': li_doras,
        'fans': fans,
        'fu': 0,
        'hand': [].concat(playertiles[seat]),
        'hu_tile': playertiles[seat][playertiles[seat].length - 1],
        'liqi': false,
        'ming': [],
        'point_rong': 1000,
        'point_sum': 1000,
        'point_zimo_qin': 1000,
        'point_zimo_xian': 1000,
        'qinjia': false,
        'seat': seat,
        'title_id': 0,
        'yiman': false,
        'zimo': true,
    };
}
tiles0 = "1112340678999m7z";
tiles1 = "1112340678999p";
tiles2 = "5555555555555z";
tiles3 = "1112340678999s";
paishan = randompaishan("75z", "7z....");
roundbegin();
qiepai();
normalmoqie();
zimohu();

gotoju(2, 0, 0);

// 第11局
hupaioneplayer = function (seat) {
    let fans = [
        {'val': 0, 'id': 9515},
        {'val': 0, 'id': 9516},
        {'val': 0, 'id': 9517},
        {'val': 0, 'id': 9518},
        {'val': 0, 'id': 9519},
        {'val': 0, 'id': 9520},
        {'val': 0, 'id': 9600},
        {'val': 0, 'id': 9601},
        {'val': 0, 'id': 9602},
        {'val': 0, 'id': 9603},
        {'val': 0, 'id': 9604},
    ];
    playertiles[seat].length--;
    delta_scores = [0, 0, 0, 0];
    return {
        'count': 0,
        'doras': [doras[0]],
        'li_doras': li_doras,
        'fans': fans,
        'fu': 0,
        'hand': [].concat(playertiles[seat]),
        'hu_tile': playertiles[seat][playertiles[seat].length - 1],
        'liqi': false,
        'ming': [],
        'point_rong': 1000,
        'point_sum': 1000,
        'point_zimo_qin': 1000,
        'point_zimo_xian': 1000,
        'qinjia': false,
        'seat': seat,
        'title_id': 0,
        'yiman': false,
        'zimo': true,
    };
}
tiles0 = "1112340678999m7z";
tiles1 = "1112340678999p";
tiles2 = "5555555555555z";
tiles3 = "1112340678999s";
paishan = randompaishan("75z", "7z....");
roundbegin();
qiepai();
normalmoqie();
zimohu();

hupaioneplayer = origin_hupaioneplayer;
