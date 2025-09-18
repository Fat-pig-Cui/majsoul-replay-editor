clearProject();

// 为了方便编辑不考虑换三张的过程

player_datas[0].nickname = '新子憧-契约';
player_datas[1].nickname = '新子憧';
player_datas[2].nickname = '新子憧-契约';
player_datas[3].nickname = '兔耳派对';
player_datas[0].avatar_id = 406402;
player_datas[1].avatar_id = 406401;
player_datas[2].avatar_id = 406402;
player_datas[3].avatar_id = 406403;

player_datas[0].views = player_datas[1].views = player_datas[2].views = player_datas[3].views = [
    {slot: 0, item_id: 308023}, // 立直棒-爱心便当
    {slot: 1, item_id: 308021}, // 和牌-高岭之花
    {slot: 2, item_id: 308022}, // 立直-未来视
    {slot: 6, item_id: 308024}, // 桌布-清凉假日
    {slot: 7, item_id: 308025}, // 牌背-摇曳彩球
];

setConfig({
    category: 1,
    meta: {mode_id: 0},
    mode: {
        mode: 1,
        detail_rule: {
            chuanma: true,
            init_point: 500000,
        }
    }
});

// 第1局: 天和, 根;  清十八罗汉, 杠上花; 清金钩钓, 杠上炮
begin_tiles[0] = '11112222333344m';
begin_tiles[1] = '1112223334446p';
begin_tiles[2] = '66778999m99p689s';
begin_tiles[3] = '1122334457777s';
randomPaishan('12346p2134s9m5s');
roundBegin();
dingque('pspm');
hupai();

mopai();
comboMopai(4);
hupai();

for (let i = 0; i < 4; i++) {
    normalMoqie();
    mingQiepai('7s');
}
mopai();
zimingpai();
normalMoqie();
hupai(true);


// 第2局: 地和;         清龙七对;           十八罗汉
begin_tiles[0] = '4455667788999m9p';
begin_tiles[1] = '1112223334m789p';
begin_tiles[2] = '3344455p568999s';
begin_tiles[3] = '111222p1112224s';
randomPaishan('49m12p1234s');
roundBegin();
dingque('pspm');
qiepai();
zimoHu();

normalMoqie();
hupai();

normalMoqie();
mingpai();
mopai();
comboMopai(3);
qiepai();
normalMoqie();
hupai(true);


// 第3局: 清七对;    清幺九, 抢杠;        龙七对
begin_tiles[1] = '7788999m445566p7s';
begin_tiles[2] = '2m123445677889s';
begin_tiles[3] = '1112223338999s';
begin_tiles[0] = '2334455667788m';
randomPaishan('2m7s9m');
roundBegin();
dingque('pspm');
qiepai();
mingQiepai('2m');
hupai();

normalMoqie();
mopai();
zimingpai();
hupai();

zimoHu(true);


// 第4局: 将对;         清对;             金钩钓
begin_tiles[0] = '222555888m22258s';
begin_tiles[1] = '12366m66788899p';
begin_tiles[2] = '113344m1139999s';
begin_tiles[3] = '1112223334445p';
randomPaishan('5s5p134m13s');
roundBegin();
dingque('pspm');
qiepai();
normalMoqie();
hupai();

normalMoqie();
hupai();

for (let i = 0; i < 4; i++) {
    normalMoqie();
    mingQiepai('9s');
}
normalMoqie();
hupai(true);


// 第5局: 带幺九;        七对子;            清一色
begin_tiles[0] = '123778899m23999s';
begin_tiles[1] = '2233445566778m';
begin_tiles[2] = '1112345678999p';
begin_tiles[3] = '223344p2233445s';
randomPaishan('15s5p');
roundBegin();
dingque('pssm');
qiepai();
normalMoqie();
hupai();

normalMoqie();
hupai();

normalMoqie();
hupai(true);


// 第6局: 对对;         底和, 海底捞月
begin_tiles[0] = '222333444m22235s';
begin_tiles[1] = '8m333466788999p';
begin_tiles[2] = '1112467999m112p';
begin_tiles[3] = '1555678p123456s';
randomPaishan('3s', '1p');
roundBegin();
dingque('pssm');
qiepai();
normalMoqie();
hupai();

normalMoqie(53);
zimoHu();
huangpai();


// 第7局: 诈和示范
begin_tiles[0] = '22234555678889m';
begin_tiles[1] = '1112345678999m';
begin_tiles[2] = '1112345678999p';
begin_tiles[3] = '1112345678999s';
roundBegin();
dingque('pssm');
hupai(true);
