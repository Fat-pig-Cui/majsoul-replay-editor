clearProject();

player_datas[0].nickname = '一姬-契约';
player_datas[1].nickname = '新年初诣';
player_datas[2].nickname = '一姬当千';
player_datas[3].nickname = '绮春歌';
player_datas[0].avatar_id = 400102;
player_datas[1].avatar_id = 400104;
player_datas[2].avatar_id = 400105;
player_datas[3].avatar_id = 400106;

config = {
    category: 1,
    meta: {mode_id: 0},
    mode: {
        mode: 1,
        detail_rule: {
            init_point: 500000,
            _sigangbaopai: true,
            _baogang: true,
            _chang_ju_ben_num_: [0, 0, 1], // 1本场
        }
    }
};

// 第1局: 一般放铳
begin_tiles[0] = '23m123456p22345s7z';
begin_tiles[1] = '2223455567888m';
begin_tiles[2] = '1112345678999p';
begin_tiles[3] = '1112345678999s';
randomPaishan('1m', '2z....');
roundBegin();
qiepai();
normalMoqie();
hupai();

// 第2局: 一般自摸
begin_tiles[0] = '123m123456p345s27z';
begin_tiles[1] = '2223455567888m';
begin_tiles[2] = '1112345678999p';
begin_tiles[3] = '1112345678s677z';
randomPaishan('2z', '2z....');
roundBegin();
qiepai();
mingQiepai();
zimoHu();

// 第3局: 包牌放铳, 不止一家包牌, 有非包牌部分, 第四家放铳
begin_tiles[0] = '12444555666777z';
begin_tiles[1] = '2223455567888m';
begin_tiles[2] = '2223455567888p';
begin_tiles[3] = '2223455567888s';
randomPaishan('765zT4zTT1z', 'TTTT');
roundBegin();
qiepai('2z');
normalMoqie();
for (let i = 0; i < 3; i++) {
    mingpai();
    normalMoqie(2);
}
normalMoqie();
mingpai();
normalMoqie(4);
hupai();

// 第4局: 有包杠, 不止一家包牌, 有非包牌部分
begin_tiles[0] = '12444555666777z';
begin_tiles[1] = '2223455567888m';
begin_tiles[2] = '2223455567888p';
begin_tiles[3] = '2223455567888s';
randomPaishan('765zT4z', '1zTTT');
roundBegin();
qiepai('2z');
normalMoqie();
for (let i = 0; i < 3; i++) {
    mingpai();
    normalMoqie(2);
}
normalMoqie();
mingpai();
zimoHu();

// 第5局: 一般包牌自摸, 只有一家包牌, 只有包牌部分
begin_tiles[0] = '1m999m2555666777z';
begin_tiles[1] = '2223455567888m';
begin_tiles[2] = '2223455567888p';
begin_tiles[3] = '2223455567888s';
randomPaishan('765z9mHHH1m', 'HHHH');
roundBegin();
qiepai('2z');
normalMoqie();
for (let i = 0; i < 4; i++) {
    mingpai();
    normalMoqie(2);
}
normalMoqie(2);
zimoHu();

// 第6局: 混合包牌自摸, 只有一家包牌, 有非包牌部分
begin_tiles[0] = '12444555666777z';
begin_tiles[1] = '2223455567888m';
begin_tiles[2] = '2223455567888p';
begin_tiles[3] = '2223455567888s';
randomPaishan('7654zTTT1z', 'TTTT');
roundBegin();
qiepai('2z');
normalMoqie();
for (let i = 0; i < 4; i++) {
    mingpai();
    normalMoqie(2);
}
normalMoqie(2);
zimoHu();

// 第7局: 一般多家包牌自摸, 有多家包牌, 只有包牌部分
begin_tiles[0] = '1999m2555666777z';
begin_tiles[1] = '2223455567888m';
begin_tiles[2] = '2223455567888p';
begin_tiles[3] = '2223455567888s';
randomPaishan('765zH9mHHH1m', 'HHHH');
roundBegin();
qiepai('2z');
normalMoqie();
for (let i = 0; i < 3; i++) {
    mingpai();
    normalMoqie(2);
}
normalMoqie();
mingpai();
normalMoqie(4);
zimoHu();

// 第8局: 复合包牌自摸, 有多家包牌, 有非包牌部分
begin_tiles[0] = '12444555666777z';
begin_tiles[1] = '2223455567888m';
begin_tiles[2] = '2223455567888p';
begin_tiles[3] = '2223455567888s';
randomPaishan('765zT4zTTT1z', 'TTTT');
roundBegin();
qiepai('2z');
normalMoqie();
for (let i = 0; i < 3; i++) {
    mingpai();
    normalMoqie(2);
}
normalMoqie();
mingpai();
normalMoqie(4);
zimoHu();
