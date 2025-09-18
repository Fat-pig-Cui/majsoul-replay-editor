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
            init_point: 250000,
            dora_count: 3,
            fanfu: 1,
            begin_open_mode: false,
            chuanma: true,
            dora3_mode: false,
            guyi_mode: false,
            muyu_mode: false,
            xuezhandaodi: false
        }
    }
});

// 第1局 底和
begin_tiles[0] = '2345678m2345678p';
begin_tiles[1] = '1112345678999p';
begin_tiles[2] = '1112345678999s';
begin_tiles[3] = '1112345678999m';
randomPaishan('5p');
roundBegin();
dingque('smps');
qiepai('5m');
mopai();
qiepai();
hupai(0, true);

// 第2局 对对和
begin_tiles[0] = '222333777888m37p';
begin_tiles[1] = '1112345678999p';
begin_tiles[2] = '1112345678999s';
begin_tiles[3] = '1112345678999m';
randomPaishan('7p');
roundBegin();
dingque('smps');
qiepai('3p');
mopai();
qiepai();
hupai(0, true);

// 第3局 清一色
begin_tiles[0] = '1112345678999m5p';
begin_tiles[1] = '1112345678999p';
begin_tiles[2] = '1112345678999s';
begin_tiles[3] = '2233445667788m';
randomPaishan('5m');
roundBegin();
dingque('smps');
qiepai('5p');
mopai();
qiepai();
hupai(0, true);

// 第4局 七对子
begin_tiles[0] = '112258899m33577p';
begin_tiles[1] = '1112345678999p';
begin_tiles[2] = '1112345678999s';
begin_tiles[3] = '2233445566778m';
randomPaishan('5p');
roundBegin();
dingque('smps');
qiepai('5m');
mopai();
qiepai();
hupai(0, true);

// 第5局 带幺九
begin_tiles[0] = '11123778899m199p';
begin_tiles[1] = '1112345678888p';
begin_tiles[2] = '1112345678999s';
begin_tiles[3] = '2233445667788m';
randomPaishan('9p');
roundBegin();
dingque('smps');
qiepai('1p');
mopai();
qiepai();
hupai(0, true);

// 第6局 金钩钓
begin_tiles[0] = '22337788m123456p';
begin_tiles[1] = '1112345678999p';
begin_tiles[2] = '1112345678999s';
begin_tiles[3] = '1112345678999m';
randomPaishan('2378m6p');
roundBegin();
dingque('smps');
qiepai('1p');
mopai();
qiepai();
mingpai();
qiepai('2p');
mopai();
qiepai();
mingpai();
qiepai('3p');
mopai();
qiepai();
mingpai();
qiepai('4p');
mopai();
qiepai();
mingpai();
qiepai('5p');
mopai();
qiepai();
hupai(0, true);

// 第7局 清对
begin_tiles[0] = '2223335777888m3p';
begin_tiles[1] = '1112345678999p';
begin_tiles[2] = '1112345678999s';
begin_tiles[3] = '1112345678999m';
randomPaishan('5m');
roundBegin();
dingque('smps');
qiepai('3p');
mopai();
qiepai();
hupai(0, true);

// 第8局 将对
begin_tiles[0] = '222555888m23555p';
begin_tiles[1] = '1112345678999p';
begin_tiles[2] = '1112345678999s';
begin_tiles[3] = '1112345678999m';
randomPaishan('2p');
roundBegin();
dingque('smps');
qiepai('3p');
mopai();
qiepai();
hupai(0, true);

// 第9局 龙七对
begin_tiles[0] = '112259999m33577p';
begin_tiles[1] = '1112345678999p';
begin_tiles[2] = '1112345678999s';
begin_tiles[3] = '2233445667788m';
randomPaishan('5p');
roundBegin();
dingque('smps');
qiepai('5m');
mopai();
qiepai();
hupai(0, true);

// 第10局 清七对
begin_tiles[0] = '2233445667788m5p';
begin_tiles[1] = '1112345678999p';
begin_tiles[2] = '1112345678999s';
begin_tiles[3] = '1112345678999m';
randomPaishan('5m');
roundBegin();
dingque('smps');
qiepai('5p');
mopai();
qiepai();
hupai(0, true);

// 第11局 清金钩钓
begin_tiles[0] = '223367788m12345p';
begin_tiles[1] = '1112345678999p';
begin_tiles[2] = '1112345678999s';
begin_tiles[3] = '1112345678999m';
randomPaishan('23786m');
roundBegin();
dingque('smps');
qiepai('1p');
mopai();
qiepai();
mingpai();
qiepai('2p');
mopai();
qiepai();
mingpai();
qiepai('3p');
mopai();
qiepai();
mingpai();
qiepai('4p');
mopai();
qiepai();
mingpai();
qiepai('5p');
mopai();
qiepai();
hupai(0, true);

// 第12局 清龙七对
begin_tiles[0] = '1122335779999m5p';
begin_tiles[1] = '1112345678999p';
begin_tiles[2] = '1112345678999s';
begin_tiles[3] = '2233445667788m';
randomPaishan('5m');
roundBegin();
dingque('smps');
qiepai('5p');
mopai();
qiepai();
hupai(0, true);

// 第13局 十八罗汉
begin_tiles[0] = '222888m13335777p';
begin_tiles[1] = '1112223334445s';
begin_tiles[2] = '5666777888999s';
begin_tiles[3] = '111999m111999p1s';
randomPaishan('25m3p585m7p5m5p');
roundBegin();
dingque('smps');
qiepai('1p');
mopai();
qiepai();
mingpai();
mopai();
qiepai();
mopai();
qiepai();
mingpai();
mopai();
qiepai();
mopai();
qiepai();
mingpai();
mopai();
qiepai();
mopai();
qiepai();
mingpai();
mopai();
qiepai();
mopai();
qiepai();
hupai(0, true);

// 第14局 清十八罗汉
begin_tiles[0] = '2223334777888m1p';
begin_tiles[1] = '1112223334445s';
begin_tiles[2] = '5666777888999s';
begin_tiles[3] = '111999m111999p1s';
randomPaishan('253585754m');
roundBegin();
dingque('smps');
qiepai('1p');
mopai();
qiepai();
mingpai();
mopai();
qiepai();
mopai();
qiepai();
mingpai();
mopai();
qiepai();
mopai();
qiepai();
mingpai();
mopai();
qiepai();
mopai();
qiepai();
mingpai();
mopai();
qiepai();
mopai();
qiepai();
hupai(0, true);

// 第15局 清幺九
begin_tiles[0] = '11122233378995m';
begin_tiles[1] = '1112345678999p';
begin_tiles[2] = '1112345678999s';
begin_tiles[3] = '2345556667788m';
randomPaishan('9m');
roundBegin();
dingque('smps');
qiepai('5m');
mopai();
qiepai();
hupai(0, true);

// 第16局 天和
begin_tiles[0] = '234678m23455678p';
begin_tiles[1] = '1112345678999p';
begin_tiles[2] = '1112345678999s';
begin_tiles[3] = '1112345678999m';
randomPaishan('5p');
roundBegin();
dingque('smps');
hupai(0, true);

// 第17局 地和
begin_tiles[0] = '5m1112345678999p';
begin_tiles[1] = '234678m2345678p';
begin_tiles[2] = '1112345678999s';
begin_tiles[3] = '1112345678999m';
randomPaishan('5p');
roundBegin();
dingque('ssmp');
qiepai();
mopai();
hupai(1, true);

// 第18局 根
begin_tiles[1] = '222234m11122235p';
begin_tiles[2] = '2345678888999p';
begin_tiles[3] = '1112345678999s';
begin_tiles[0] = '1113345678999m';
randomPaishan('3p');
roundBegin();
dingque('ssmp');
qiepai('5p');
mopai();
qiepai();
hupai(1, true);

// 第19局 杠上花
begin_tiles[1] = '222233m11122235p';
begin_tiles[2] = '2345678888999p';
begin_tiles[3] = '1112345678999s';
begin_tiles[0] = '1113345678999m';
randomPaishan('4p');
roundBegin();
dingque('ssmp');
zimingpai();
mopai();
hupai(1, true);

// 第20局 杠上炮
begin_tiles[1] = '222233m11122235p';
begin_tiles[2] = '33m34455p677889m';
begin_tiles[3] = '1112345678999s';
begin_tiles[0] = '1114445678999m';
randomPaishan('5p');
roundBegin();
dingque('sssp');
zimingpai();
mopai();
qiepai('3p');
hupai(2, true);

// 第21局 枪杠
begin_tiles[2] = '22m66p33m11122235p';
begin_tiles[3] = '2345678888999p';
begin_tiles[1] = '1112345678999s';
begin_tiles[0] = '44m33444777p555m';
randomPaishan('21312m');
roundBegin();
dingque('smss');
qiepai('5p');
mopai();
qiepai();
mingpai();
qiepai('3p');
mopai();
qiepai();
mopai();
qiepai('4m');
mopai();
qiepai();
mopai();
zimingpai();
hupai(0, true);

// 第22局 海底捞月
begin_tiles[0] = '111m2345678p999m1s';
begin_tiles[1] = '2345678p222888m';
begin_tiles[2] = '2345678p333777m';
begin_tiles[3] = '2345p444555666m';
randomPaishan('123456789m', '8p');
roundBegin();
dingque('ssss');
qiepai();
while (paishan.length !== 0) {
    mopai();
    qiepai();
}
hupai(0, true);
