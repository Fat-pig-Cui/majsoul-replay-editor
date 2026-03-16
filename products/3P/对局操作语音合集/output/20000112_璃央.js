clearProject();

player_datas[0].nickname = '璃央-契约';
player_datas[1].nickname = '璃央';
player_datas[2].nickname = '绛夜缠仪';
player_datas[0].avatar_id = 40011202;
player_datas[1].avatar_id = 40011201;
player_datas[2].avatar_id = 40011203;

// 头像框-星点鳞光
player_datas[0].avatar_frame = player_datas[1].avatar_frame = player_datas[2].avatar_frame = 30550030;
player_datas[0].views = player_datas[1].views = player_datas[2].views = [
    {slot: 1, item_id: 30520009}, // 和牌-静伏蛰影
    {slot: 2, item_id: 30530009}, // 立直-曲径通幽
    {slot: 5, item_id: 30550030}, // 头像框-星点鳞光
];

setConfig({
    category: 1,
    meta: {mode_id: 0},
    mode: {
        mode: 10,
        detail_rule: {}
    }
});

// 第1局: 立直, 两立直, 吃, 碰, 杠, 拔北, 四杠流局
begin_tiles[0] = '1112340678999p1s';
begin_tiles[1] = '234466688s5567z';
begin_tiles[2] = '1112223335777z';
randomPaishan('1z8s', '6z.6z.......4s');
qiepai(true);
mingQiepai('23s');
mopai();
comboMopai();
qiepai(true);
mingQiepai();
normalMoqie();
hupai(1);

// 第2局: 自摸
begin_tiles[1] = '111m23456p11123s4z';
begin_tiles[2] = '1112340678999p';
begin_tiles[0] = '1112223334445z';
randomPaishan('', '1m.......1p');
comboMopai();
hupai();
