clearProject();

player_datas[0].nickname = '竹井久-契约';
player_datas[1].nickname = '竹井久';
player_datas[2].nickname = '兔耳派对';
player_datas[0].avatar_id = 406202;
player_datas[1].avatar_id = 406201;
player_datas[2].avatar_id = 406203;

player_datas[0].views = player_datas[1].views = player_datas[2].views = [
    {slot: 0, item_id: 308023}, // 立直棒-爱心便当
    {slot: 1, item_id: 308021}, // 和牌-高岭之花
    {slot: 2, item_id: 308022}, // 立直-未来视
    {slot: 6, item_id: 308024}, // 桌布-清凉假日
    {slot: 7, item_id: 308025}, // 牌背-摇曳彩球
];

config = {
    category: 1,
    meta: {mode_id: 0},
    mode: {
        mode: 11,
        detail_rule: {}
    }
};

// 第1局: 立直, 两立直, 吃, 碰, 杠, 拔北, 四杠流局
begin_tiles[0] = '1112340678999p1s';
begin_tiles[1] = '23446668889s66z';
begin_tiles[2] = '1112223335777z';
randomPaishan('1z6s', '6z84s4z4s');
roundBegin();
qiepai(true);
mingQiepai('23s');
mopai();
comboMopai();
qiepai(true);
mingQiepai('6z');
normalMoqie();
mingpai();
mopai();
comboMopai(3);
qiepai();
liuju();

// 第2局: 自摸
begin_tiles[0] = '111m23456p11123s4z';
begin_tiles[1] = '1112340678999p';
begin_tiles[2] = '1112223334445z';
randomPaishan('', '1m.......1p');
roundBegin();
comboMopai();
hupai();

// 第3局: 荣
begin_tiles[0] = '2p1112223334445z';
begin_tiles[1] = '2455667p234567s';
begin_tiles[2] = '1112340678999s';
randomPaishan('', '1m........');
roundBegin();
qiepai('2p');
hupai();
