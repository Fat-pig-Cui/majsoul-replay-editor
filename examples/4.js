loadproject();

editdata.player_datas[0].nickname = '电脑0';
editdata.player_datas[1].nickname = '电脑1';
editdata.player_datas[2].nickname = '电脑2';
editdata.player_datas[3].nickname = '电脑3';
editdata.player_datas[0].avatar_id = 400101;
editdata.player_datas[1].avatar_id = 400101;
editdata.player_datas[2].avatar_id = 400101;
editdata.player_datas[3].avatar_id = 400101;

editdata.config = {
    'category': 1,
    'meta': {'mode_id': 0},
    'mode': {
        'mode': 1,
        'detail_rule': {
            'init_point': 250000,
            'dora_count': 3,
            'fanfu': 1,
            'begin_open_mode': false,
            'chuanma': true,
            'dora3_mode': false,
            'guyi_mode': false,
            'huansanzhang': false,
            'muyu_mode': false,
            'xuezhandaodi': false
        }
    }
};

// 第1局 底和
tiles0 = '2345678m2345678p';
tiles1 = '1112345678999p';
tiles2 = '1112345678999s';
tiles3 = '1112345678999m';
paishan = randompaishan('5p');
roundbegin();
dingque('smps');
qiepai('5m');
mopai();
qiepai();
hupai(0, true);
roundend();

// 第2局 对对和
tiles0 = '222333777888m37p';
tiles1 = '1112345678999p';
tiles2 = '1112345678999s';
tiles3 = '1112345678999m';
paishan = randompaishan('7p');
roundbegin();
dingque('smps');
qiepai('3p');
mopai();
qiepai();
hupai(0, true);
roundend();

// 第3局 清一色
tiles0 = '1112345678999m5p';
tiles1 = '1112345678999p';
tiles2 = '1112345678999s';
tiles3 = '2233445667788m';
paishan = randompaishan('5m');
roundbegin();
dingque('smps');
qiepai('5p');
mopai();
qiepai();
hupai(0, true);
roundend();

// 第4局 七对子
tiles0 = '112258899m33577p';
tiles1 = '1112345678999p';
tiles2 = '1112345678999s';
tiles3 = '2233445566778m';
paishan = randompaishan('5p');
roundbegin();
dingque('smps');
qiepai('5m');
mopai();
qiepai();
hupai(0, true);
roundend();

// 第5局 带幺九
tiles0 = '11123778899m199p';
tiles1 = '1112345678888p';
tiles2 = '1112345678999s';
tiles3 = '2233445667788m';
paishan = randompaishan('9p');
roundbegin();
dingque('smps');
qiepai('1p');
mopai();
qiepai();
hupai(0, true);
roundend();

// 第6局 金钩钓
tiles0 = '22337788m123456p';
tiles1 = '1112345678999p';
tiles2 = '1112345678999s';
tiles3 = '1112345678999m';
paishan = randompaishan('2378m6p');
roundbegin();
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
roundend();

// 第7局 清对
tiles0 = '2223335777888m3p';
tiles1 = '1112345678999p';
tiles2 = '1112345678999s';
tiles3 = '1112345678999m';
paishan = randompaishan('5m');
roundbegin();
dingque('smps');
qiepai('3p');
mopai();
qiepai();
hupai(0, true);
roundend();

// 第8局 将对
tiles0 = '222555888m23555p';
tiles1 = '1112345678999p';
tiles2 = '1112345678999s';
tiles3 = '1112345678999m';
paishan = randompaishan('2p');
roundbegin();
dingque('smps');
qiepai('3p');
mopai();
qiepai();
hupai(0, true);
roundend();

// 第9局 龙七对
tiles0 = '112259999m33577p';
tiles1 = '1112345678999p';
tiles2 = '1112345678999s';
tiles3 = '2233445667788m';
paishan = randompaishan('5p');
roundbegin();
dingque('smps');
qiepai('5m');
mopai();
qiepai();
hupai(0, true);
roundend();

// 第10局 清七对
tiles0 = '2233445667788m5p';
tiles1 = '1112345678999p';
tiles2 = '1112345678999s';
tiles3 = '1112345678999m';
paishan = randompaishan('5m');
roundbegin();
dingque('smps');
qiepai('5p');
mopai();
qiepai();
hupai(0, true);
roundend();

// 第11局 清金钩钓
tiles0 = '223367788m12345p';
tiles1 = '1112345678999p';
tiles2 = '1112345678999s';
tiles3 = '1112345678999m';
paishan = randompaishan('23786m');
roundbegin();
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
roundend();

// 第12局 清龙七对
tiles0 = '1122335779999m5p';
tiles1 = '1112345678999p';
tiles2 = '1112345678999s';
tiles3 = '2233445667788m';
paishan = randompaishan('5m');
roundbegin();
dingque('smps');
qiepai('5p');
mopai();
qiepai();
hupai(0, true);
roundend();

// 第13局 十八罗汉
tiles0 = '222888m13335777p';
tiles1 = '1112223334445s';
tiles2 = '5666777888999s';
tiles3 = '111999m111999p1s';
paishan = randompaishan('25m3p585m7p5m5p');
roundbegin();
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
roundend();

// 第14局 清十八罗汉
tiles0 = '2223334777888m1p';
tiles1 = '1112223334445s';
tiles2 = '5666777888999s';
tiles3 = '111999m111999p1s';
paishan = randompaishan('253585754m');
roundbegin();
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
roundend();

// 第15局 清幺九
tiles0 = '11122233378995m';
tiles1 = '1112345678999p';
tiles2 = '1112345678999s';
tiles3 = '2345556667788m';
paishan = randompaishan('9m');
roundbegin();
dingque('smps');
qiepai('5m');
mopai();
qiepai();
hupai(0, true);
roundend();

// 第16局 天和
tiles0 = '234678m23455678p';
tiles1 = '1112345678999p';
tiles2 = '1112345678999s';
tiles3 = '1112345678999m';
paishan = randompaishan('5p');
roundbegin();
dingque('smps');
hupai(0, true);
roundend();

// 第17局 地和
tiles0 = '5m1112345678999p';
tiles1 = '234678m2345678p';
tiles2 = '1112345678999s';
tiles3 = '1112345678999m';
paishan = randompaishan('5p');
roundbegin();
dingque('ssmp');
qiepai();
mopai();
hupai(1, true);
roundend();

// 第18局 根
tiles1 = '222234m11122235p';
tiles2 = '2345678888999p';
tiles3 = '1112345678999s';
tiles0 = '1113345678999m';
paishan = randompaishan('3p');
roundbegin();
dingque('ssmp');
qiepai('5p');
mopai();
qiepai();
hupai(1, true);
roundend();

// 第19局 杠上花
tiles1 = '222233m11122235p';
tiles2 = '2345678888999p';
tiles3 = '1112345678999s';
tiles0 = '1113345678999m';
paishan = randompaishan('4p');
roundbegin();
dingque('ssmp');
leimingpai();
mopai();
hupai(1, true);
roundend();

// 第20局 杠上炮
tiles1 = '222233m11122235p';
tiles2 = '33m34455p677889m';
tiles3 = '1112345678999s';
tiles0 = '1114445678999m';
paishan = randompaishan('5p');
roundbegin();
dingque('sssp');
leimingpai();
mopai();
qiepai('3p');
hupai(2, true);
roundend();

// 第21局 枪杠
tiles2 = '22m66p33m11122235p';
tiles3 = '2345678888999p';
tiles1 = '1112345678999s';
tiles0 = '44m33444777p555m';
paishan = randompaishan('21312m');
roundbegin();
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
leimingpai();
hupai(0, true);
roundend();

// 第22局 海底捞月
tiles0 = '111m2345678p999m1s';
tiles1 = '2345678p222888m';
tiles2 = '2345678p333777m';
tiles3 = '2345p444555666m';
paishan = randompaishan('123456789m', '8p');
roundbegin();
dingque('ssss');
qiepai();
while (paishan.length !== 0) {
    mopai();
    qiepai();
}
hupai(0, true);
roundend();
