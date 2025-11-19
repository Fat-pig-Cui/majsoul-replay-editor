clearProject();

player_datas[0].nickname = '辉夜姬-契约';
player_datas[1].nickname = '罗裳曼影';
player_datas[2].nickname = '摇曳心情';
player_datas[0].avatar_id = 402902;
player_datas[1].avatar_id = 402906;
player_datas[2].avatar_id = 402907;

// 称号-神社贵宾
player_datas[0].title = player_datas[1].title = player_datas[2].title = 600038;
// 主播(猫爪)认证
player_datas[0].verified = player_datas[1].verified = player_datas[2].verified = 1;
player_datas[0].views = player_datas[1].views = player_datas[2].views = [
    {slot: 6, item_id: 30580005}, // 桌布-预热开场
];

setConfig({
    category: 1,
    meta: {mode_id: 0},
    mode: {
        mode: 11,
        detail_rule: {}
    }
});

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
