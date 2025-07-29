clearproject();

player_datas[0].nickname = '电脑0';
player_datas[1].nickname = '电脑1';
player_datas[2].nickname = '电脑2';
player_datas[3].nickname = '电脑3';
player_datas[0].avatar_id = 400101;
player_datas[1].avatar_id = 400101;
player_datas[2].avatar_id = 400101;
player_datas[3].avatar_id = 400101;

config = {
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
};

// 第一局(流局满贯, 作弊)
tiles0 = '1112340678999m5z';
tiles1 = '1112340678999p';
tiles2 = '1112340678999s';
tiles3 = '1112223334447z';
paishan = separatetile('55555555555555555555555555555555555555555555555555555555555555555555555555555555555z');
roundbegin();
qiepai('5z');
for (let i = 0; i < 69; i++) {
    mopai();
    qiepai();
}
notileliuju();

// 第二局
tiles0 = '1112340678999m1z';
tiles1 = '1112340678999p';
tiles2 = '1112340678999s';
tiles3 = '1112223334447z';
paishan = randompaishan('23z9m', '5555z');
roundbegin();
for (let i = 0; i < 3; i++) {
    qiepai();
    mingpai();
    mopai();
    qiepai();
    mopai();
}
leimingpai();
mopai();
qiepai();
liuju();

// 第三局
tiles0 = '1p1112340678999s';
tiles1 = '1123p777888999m';
tiles2 = '2223334445566s';
tiles3 = '2223334445566m';
paishan = randompaishan('4p');
roundbegin();
qiepai('1p', true);
hupai();

// 第四局(诈和示范)
tiles1 = '1112340678999m6z';
tiles2 = '55p238s12556677z';
tiles3 = '223446688s3457z';
tiles0 = '59p346s11223344z';
paishan = randompaishan('3s');
roundbegin();
hupai();

// 第五局
tiles1 = '456m456p225588s66z';
tiles2 = '1112223334447z';
tiles3 = '1112340678999p';
tiles0 = '1112340678999m';
paishan = randompaishan('82s', '55556777z');
roundbegin();
qiepai('6z');
mopai();
qiepai();
mingpai();
qiepai('6z');
mopai();
qiepai();
hupai();

// 第六局
tiles1 = '345m345p47s111555z';
tiles2 = '111234067899m3s';
tiles3 = '23344666888s66z';
tiles0 = '1112340678999p';
paishan = randompaishan('9m9s1z93s', '11117745s');
discardtiles = ['', '7s5z', '3s', '2s'];
roundbegin();
qiepai();
mopai();
qiepai(true);
mingpai();
qiepai();
mopai();
qiepai(true);
mopai();
leimingpai();
mopai();
qiepai(true);
mopai();
qiepai();
mopai();
leimingpai();
hupai();

// 第七局
tiles1 = '224488s11223347z';
tiles2 = '1112340678999m';
tiles3 = '1112340678999p';
tiles0 = '1112340678999s';
paishan = randompaishan('4z', '55556666z');
roundbegin();
qiepai('7z', true);
mopai();
qiepai('4z', true);
hupai();

// 第八局
tiles1 = '1112340678999m1z';
tiles2 = '1112340678999p';
tiles3 = '1112340678999s';
tiles0 = '5m234678p234678s';
paishan = randompaishan('111z');
roundbegin();
qiepai('1z', true);
mopai();
qiepai(true);
mopai();
qiepai(true);
mopai();
qiepai(true);
liuju();

// 第九局
tiles1 = '1112340678999m6z';
tiles2 = '238s55p12556677z';
tiles3 = '223446688s3457z';
tiles0 = '346s59p11223344z';
paishan = randompaishan('3s');
roundbegin();
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
