clearProject();

player_datas[0].nickname = '电脑0';
player_datas[1].nickname = '电脑1';
player_datas[2].nickname = '电脑2';
player_datas[3].nickname = '电脑3';
player_datas[0].avatar_id = 400101;
player_datas[1].avatar_id = 400101;
player_datas[2].avatar_id = 400101;
player_datas[3].avatar_id = 400101;

setConfig({
    category: 1,
    meta: {mode_id: 0},
    mode: {
        mode: 1,
        detail_rule: {
            init_point: 25000,
            dora_count: 3,
            fanfu: 1,
            begin_open_mode: false,
            chuanma: false,
            dora3_mode: false,
            guyi_mode: false,
            open_hand: false,
            muyu_mode: false,
            xuezhandaodi: false,
        }
    }
});

// 第一局(流局满贯, 作弊)
begin_tiles[0] = '1112340678999m5z';
begin_tiles[1] = '1112340678999p';
begin_tiles[2] = '1112340678999s';
begin_tiles[3] = '1112223334447z';
setPaishan('5z'.repeat(83));
roundBegin();
qiepai('5z');
for (let i = 0; i < 69; i++) {
    mopai();
    qiepai();
}
huangpai();

// 第二局
begin_tiles[0] = '1112340678999m1z';
begin_tiles[1] = '1112340678999p';
begin_tiles[2] = '1112340678999s';
begin_tiles[3] = '1112223334447z';
randomPaishan('23z9m', '5555z');
roundBegin();
for (let i = 0; i < 3; i++) {
    qiepai();
    mingpai();
    mopai();
    qiepai();
    mopai();
}
zimingpai();
mopai();
qiepai();
liuju();

// 第三局
begin_tiles[0] = '1p1112340678999s';
begin_tiles[1] = '1123p777888999m';
begin_tiles[2] = '2223334445566s';
begin_tiles[3] = '2223334445566m';
randomPaishan('4p');
roundBegin();
qiepai('1p', true);
hupai();

// 第四局(诈和示范)
begin_tiles[1] = '1112340678999m6z';
begin_tiles[2] = '55p238s12556677z';
begin_tiles[3] = '223446688s3457z';
begin_tiles[0] = '59p346s11223344z';
randomPaishan('3s');
roundBegin();
hupai();

// 第五局
begin_tiles[1] = '456m456p225588s66z';
begin_tiles[2] = '1112223334447z';
begin_tiles[3] = '1112340678999p';
begin_tiles[0] = '1112340678999m';
randomPaishan('82s', '55556777z');
roundBegin();
qiepai('6z');
mopai();
qiepai();
mingpai();
qiepai('6z');
mopai();
qiepai();
hupai();

// 第六局
begin_tiles[1] = '345m345p47s111555z';
begin_tiles[2] = '111234067899m3s';
begin_tiles[3] = '23344666888s66z';
begin_tiles[0] = '1112340678999p';
setDiscardTiles(['', '7s5z', '3s', '2s']);
randomPaishan('9m9s1z93s', '11117745s');
roundBegin();
qiepai();
mopai();
qiepai(true);
mingpai();
qiepai();
mopai();
qiepai(true);
mopai();
zimingpai();
mopai();
qiepai(true);
mopai();
qiepai();
mopai();
zimingpai();
hupai();

// 第七局
begin_tiles[1] = '224488s11223347z';
begin_tiles[2] = '1112340678999m';
begin_tiles[3] = '1112340678999p';
begin_tiles[0] = '1112340678999s';
randomPaishan('4z', '55556666z');
roundBegin();
qiepai('7z', true);
mopai();
qiepai('4z', true);
hupai();

// 第八局
begin_tiles[1] = '1112340678999m1z';
begin_tiles[2] = '1112340678999p';
begin_tiles[3] = '1112340678999s';
begin_tiles[0] = '5m234678p234678s';
randomPaishan('111z');
roundBegin();
qiepai('1z', true);
mopai();
qiepai(true);
mopai();
qiepai(true);
mopai();
qiepai(true);
liuju();

// 第九局
begin_tiles[1] = '1112340678999m6z';
begin_tiles[2] = '238s55p12556677z';
begin_tiles[3] = '223446688s3457z';
begin_tiles[0] = '346s59p11223344z';
randomPaishan('3s');
roundBegin();
qiepai('6z', true);
mingpai('66z');
qiepai('8s');
mingpai('88s');
qiepai('3z');
mingpai('33z');
qiepai('5p');
mingpai('55p');
qiepai('2z');
mingpai('22z');
qiepai('6s');
mingpai('66s');
qiepai('7z');
mingpai('77z');
qiepai('2s');
mingpai('22s');
qiepai('4z');
mingpai('44z');
qiepai('4s');
mingpai('44s');
qiepai('5z');
mingpai('55z');
qiepai('1z');
mingpai('11z');
qiepai('9p');
mopai();
qiepai();
hupai();
