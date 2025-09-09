clearProject();

player_datas[0].nickname = '东城玄音-契约';
player_datas[1].nickname = '东城玄音';
player_datas[2].nickname = '东城玄音-契约';
player_datas[3].nickname = '东城玄音';
player_datas[0].avatar_id = 407602;
player_datas[1].avatar_id = 407601;
player_datas[2].avatar_id = 407602;
player_datas[3].avatar_id = 407601;

// 头像框-丹心一寸
player_datas[0].avatar_frame = player_datas[1].avatar_frame = player_datas[2].avatar_frame = player_datas[3].avatar_frame = 305551;
player_datas[0].views = player_datas[1].views = player_datas[2].views = player_datas[3].views = [
    {slot: 1, item_id: 305223}, // 和牌-衔环结草
    {slot: 2, item_id: 305323}, // 立直-狐缘之绊
    {slot: 5, item_id: 305551}, // 头像框-丹心一寸
];

config = {
    category: 2,
    meta: {mode_id: 13},
    mode: {
        mode: 1,
        detail_rule: {
            init_point: 300000,
            _chang_ju_ben_num_: [2, 0, 0],
        }
    }
};

origin_huleOnePlayer = huleOnePlayer;

// 第1局
huleOnePlayer = seat => {
    let fans = [
        {val: 1, id: 2}, // 立直
        {val: 2, id: 18}, // 两立直
        {val: 1, id: 30}, // 一发
        {val: 1, id: 3}, // 枪杠
        {val: 1, id: 4}, // 岭上开花
        {val: 1, id: 5}, // 海底摸月
        {val: 1, id: 6}, // 河底捞鱼
        {val: 1, id: 1}, // 门前清自摸和
        {val: 1, id: 14}, // 平和
        {val: 1, id: 13}, // 一杯口
        {val: 3, id: 28}, // 二杯口
        {val: 2, id: 25}, // 七对子
        {val: 1, id: 7}, // 役牌 白
    ];
    player_tiles[seat].pop();
    delta_scores = [-16000, -8000, 32000, -8000];
    return {
        count: 64,
        doras: [doras[0]],
        li_doras: li_doras,
        fans: fans,
        fu: 170,
        hand: player_tiles[seat].slice(),
        hu_tile: player_tiles[seat][player_tiles[seat].length - 1],
        liqi: false,
        ming: [],
        point_rong: 32000,
        point_sum: 32000,
        point_zimo_qin: 16000,
        point_zimo_xian: 8000,
        qinjia: false,
        seat: seat,
        title_id: 11,
        yiman: false,
        zimo: true,
    };
}
begin_tiles[0] = '1112340678999m7z';
begin_tiles[1] = '1112340678999p';
begin_tiles[2] = '5555555555555z';
begin_tiles[3] = '1112340678999s';
randomPaishan('75z', '7z....');
roundBegin();
qiepai();
normalMoqie();
zimoHu();

setRound(2, 0, 0);

// 第2局
huleOnePlayer = seat => {
    let fans = [
        {val: 1, id: 8}, // 役牌 发
        {val: 1, id: 9}, // 役牌 中
        {val: 1, id: 9101}, // 役牌 东
        {val: 1, id: 9102}, // 役牌 连东
        {val: 1, id: 9103}, // 役牌 南
        {val: 1, id: 9104}, // 役牌 连南
        {val: 1, id: 10}, // 役牌:门风牌
        {val: 1, id: 11}, // 役牌:场风牌
        {val: 1, id: 9107}, // 役牌 北
        {val: 1, id: 9108}, // 役牌 连北
        {val: 1, id: 12}, // 断幺九
        {val: 2, id: 15}, // 混全带幺九
        {val: 2, id: 16}, // 一气通贯
    ];
    player_tiles[seat].pop();
    delta_scores = [-16000, -8000, 32000, -8000];
    return {
        count: 64,
        doras: [doras[0]],
        li_doras: li_doras,
        fans: fans,
        fu: 170,
        hand: player_tiles[seat].slice(),
        hu_tile: player_tiles[seat][player_tiles[seat].length - 1],
        liqi: false,
        ming: [],
        point_rong: 32000,
        point_sum: 32000,
        point_zimo_qin: 16000,
        point_zimo_xian: 8000,
        qinjia: false,
        seat: seat,
        title_id: 11,
        yiman: false,
        zimo: true,
    };
}
begin_tiles[0] = '1112340678999m7z';
begin_tiles[1] = '1112340678999p';
begin_tiles[2] = '5555555555555z';
begin_tiles[3] = '1112340678999s';
randomPaishan('75z', '7z....');
roundBegin();
qiepai();
normalMoqie();
zimoHu();

setRound(2, 0, 0);

// 第3局
huleOnePlayer = seat => {
    let fans = [
        {val: 2, id: 17}, // 三色同顺
        {val: 2, id: 19}, // 三色同刻
        {val: 2, id: 20}, // 三杠子
        {val: 2, id: 21}, // 对对和
        {val: 2, id: 22}, // 三暗刻
        {val: 2, id: 23}, // 小三元
        {val: 2, id: 24}, // 混老头
        {val: 3, id: 26}, // 纯全带幺九
        {val: 3, id: 27}, // 混一色
        {val: 6, id: 29}, // 清一色
        {val: 1, id: 31}, // 宝牌
        {val: 2, id: 31}, // 宝牌
        {val: 3, id: 31}, // 宝牌
    ];
    player_tiles[seat].pop();
    delta_scores = [-16000, -8000, 32000, -8000];
    return {
        count: 64,
        doras: [doras[0]],
        li_doras: li_doras,
        fans: fans,
        fu: 170,
        hand: player_tiles[seat].slice(),
        hu_tile: player_tiles[seat][player_tiles[seat].length - 1],
        liqi: false,
        ming: [],
        point_rong: 32000,
        point_sum: 32000,
        point_zimo_qin: 16000,
        point_zimo_xian: 8000,
        qinjia: false,
        seat: seat,
        title_id: 11,
        yiman: false,
        zimo: true,
    };
}
begin_tiles[0] = '1112340678999m7z';
begin_tiles[1] = '1112340678999p';
begin_tiles[2] = '5555555555555z';
begin_tiles[3] = '1112340678999s';
randomPaishan('75z', '7z....');
roundBegin();
qiepai();
normalMoqie();
zimoHu();

setRound(2, 0, 0);

// 第4局
huleOnePlayer = seat => {
    let fans = [
        {val: 4, id: 31}, // 宝牌
        {val: 5, id: 32}, // 红宝牌
        {val: 6, id: 32}, // 红宝牌
        {val: 7, id: 32}, // 红宝牌
        {val: 8, id: 32}, // 红宝牌
        {val: 9, id: 34}, // 拔北宝牌
        {val: 10, id: 34}, // 拔北宝牌
        {val: 11, id: 34}, // 拔北宝牌
        {val: 12, id: 34}, // 拔北宝牌
        {val: 13, id: 33}, // 里宝牌
        {val: 14, id: 33}, // 里宝牌
        {val: 15, id: 33}, // 里宝牌
        {val: 5, id: 9100}, // 流局满贯
    ];
    player_tiles[seat].pop();
    delta_scores = [-16000, -8000, 32000, -8000];
    return {
        count: 64,
        doras: [doras[0]],
        li_doras: li_doras,
        fans: fans,
        fu: 170,
        hand: player_tiles[seat].slice(),
        hu_tile: player_tiles[seat][player_tiles[seat].length - 1],
        liqi: false,
        ming: [],
        point_rong: 32000,
        point_sum: 32000,
        point_zimo_qin: 16000,
        point_zimo_xian: 8000,
        qinjia: false,
        seat: seat,
        title_id: 11,
        yiman: false,
        zimo: true,
    };
}
begin_tiles[0] = '1112340678999m7z';
begin_tiles[1] = '1112340678999p';
begin_tiles[2] = '5555555555555z';
begin_tiles[3] = '1112340678999s';
randomPaishan('75z', '7z....');
roundBegin();
qiepai();
normalMoqie();
zimoHu();

setRound(2, 0, 0);

// 第5局
huleOnePlayer = seat => {
    let fans = [
        {val: 1, id: 35}, // 天和
        {val: 1, id: 36}, // 地和
        {val: 1, id: 37}, // 大三元
        {val: 1, id: 38}, // 四暗刻
        {val: 1, id: 39}, // 字一色
        {val: 1, id: 40}, // 绿一色
        {val: 1, id: 41}, // 清老头
        {val: 1, id: 42}, // 国士无双
    ];
    player_tiles[seat].pop();
    delta_scores = [-96000, -48000, 192000, -48000];
    return {
        count: 6,
        doras: [doras[0]],
        li_doras: li_doras,
        fans: fans,
        fu: 170,
        hand: player_tiles[seat].slice(),
        hu_tile: player_tiles[seat][player_tiles[seat].length - 1],
        liqi: false,
        ming: [],
        point_rong: 192000,
        point_sum: 192000,
        point_zimo_qin: 96000,
        point_zimo_xian: 48000,
        qinjia: false,
        seat: seat,
        title_id: 10,
        yiman: true,
        zimo: true,
    };
}
begin_tiles[0] = '1112340678999m7z';
begin_tiles[1] = '1112340678999p';
begin_tiles[2] = '5555555555555z';
begin_tiles[3] = '1112340678999s';
randomPaishan('75z', '7z....');
roundBegin();
qiepai();
normalMoqie();
zimoHu();

setRound(2, 0, 0);

// 第6局
huleOnePlayer = seat => {
    let fans = [
        {val: 1, id: 42}, // 国士无双
        {val: 1, id: 43}, // 小四喜
        {val: 1, id: 44}, // 四杠子
        {val: 1, id: 45}, // 九莲宝灯
        {val: 2, id: 47}, // 纯正九莲宝灯
        {val: 2, id: 48}, // 四暗刻单骑
        {val: 2, id: 49}, // 国士无双十三面
        {val: 2, id: 50}, // 大四喜
    ];
    player_tiles[seat].pop();
    delta_scores = [-96000, -48000, 192000, -48000];
    return {
        count: 6,
        doras: [doras[0]],
        li_doras: li_doras,
        fans: fans,
        fu: 170,
        hand: player_tiles[seat].slice(),
        hu_tile: player_tiles[seat][player_tiles[seat].length - 1],
        liqi: false,
        ming: [],
        point_rong: 192000,
        point_sum: 192000,
        point_zimo_qin: 96000,
        point_zimo_xian: 48000,
        qinjia: false,
        seat: seat,
        title_id: 10,
        yiman: true,
        zimo: true,
    };
}
begin_tiles[0] = '1112340678999m7z';
begin_tiles[1] = '1112340678999p';
begin_tiles[2] = '5555555555555z';
begin_tiles[3] = '1112340678999s';
randomPaishan('75z', '7z....');
roundBegin();
qiepai();
normalMoqie();
zimoHu();

setRound(2, 0, 0);

// 第7局
huleOnePlayer = seat => {
    let fans = [
        {val: 6, id: 1015}, // 清龙七对
        {val: 6, id: 1016}, // 十八罗汉
        {val: 6, id: 1017}, // 清十八罗汉
        {val: 4, id: 1010}, // 清对
        {val: 4, id: 1011}, // 将对
        {val: 4, id: 1012}, // 龙七对
        {val: 5, id: 1013}, // 清七对
        {val: 5, id: 1020}, // 清幺九
        {val: 5, id: 1014}, // 清金钩钓
        {val: 3, id: 1008}, // 带幺九
        {val: 3, id: 1009}, // 金钩钓
        {val: 1, id: 1000}, // 根
        {val: 1, id: 1002}, // 杠上炮
    ];
    player_tiles[seat].pop();
    delta_scores = [-16000, -8000, 32000, -8000];
    return {
        count: 64,
        doras: [doras[0]],
        li_doras: li_doras,
        fans: fans,
        fu: 170,
        hand: player_tiles[seat].slice(),
        hu_tile: player_tiles[seat][player_tiles[seat].length - 1],
        liqi: false,
        ming: [],
        point_rong: 32000,
        point_sum: 32000,
        point_zimo_qin: 16000,
        point_zimo_xian: 8000,
        qinjia: false,
        seat: seat,
        title_id: 11,
        yiman: false,
        zimo: true,
    };
}
begin_tiles[0] = '1112340678999m7z';
begin_tiles[1] = '1112340678999p';
begin_tiles[2] = '5555555555555z';
begin_tiles[3] = '1112340678999s';
randomPaishan('75z', '7z....');
roundBegin();
qiepai();
normalMoqie();
zimoHu();

huleOnePlayer = origin_huleOnePlayer;
