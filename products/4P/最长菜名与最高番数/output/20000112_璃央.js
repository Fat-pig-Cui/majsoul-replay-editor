clearProject();

player_datas[0].nickname = '璃央-契约';
player_datas[1].nickname = '璃央';
player_datas[2].nickname = '璃央-契约';
player_datas[3].nickname = '绛夜缠仪';
player_datas[0].avatar_id = 40011202;
player_datas[1].avatar_id = 40011201;
player_datas[2].avatar_id = 40011202;
player_datas[3].avatar_id = 40011203;

// 头像框-星点鳞光
player_datas[0].avatar_frame = player_datas[1].avatar_frame = player_datas[2].avatar_frame = player_datas[3].avatar_frame = 30550030;
player_datas[0].views = player_datas[1].views = player_datas[2].views = player_datas[3].views = [
    {slot: 1, item_id: 30520009}, // 和牌-静伏蛰影
    {slot: 2, item_id: 30530009}, // 立直-曲径通幽
    {slot: 5, item_id: 30550030}, // 头像框-星点鳞光
];

setConfig({
    category: 1,
    meta: {mode_id: 0},
    mode: {
        mode: 1,
        detail_rule: {
            init_point: 100000,
        }
    }
});

// 最长菜名(15条45番)
// 立直, 一发, 海底摸月, 门前清自摸和, 白, 发, 东, 连东, 混全带幺九,
// 三杠子, 三暗刻, 小三元, 混一色, 宝牌一大堆(13), 宝牌一大堆(13)
begin_tiles[0] = '789s1111z5556667z';
begin_tiles[1] = '222205588889m3s';
begin_tiles[2] = '1122224055599s';
begin_tiles[3] = '3333444467777p';
randomPaishan('', '7z.....66s444477z.9s65z');
roundBegin();
comboMopai(3);
qiepai('9s');
mingQiepai('4s');
normalMoqie(61);
moqieLiqi();
normalMoqie(3);
zimoHu();

// 最高番数(14条60番)
// 这个其实在'所有报菜名合集'中已经有了, 在第八局(东四局0本场)
// 两立直, 河底捞鱼, 白, 中, 东, 连东, 三杠子, 对对和,
// 三暗刻, 小三元, 混老头, 混一色, 宝牌一大堆(20), 宝牌一大堆(20)
begin_tiles[0] = '1999p1115556677z';
begin_tiles[1] = '222205558888m6z';
begin_tiles[2] = '222205558888s3z';
begin_tiles[3] = '3333444467777s';
randomPaishan('...9p', '4444z8888p776z.51z');
roundBegin();
qiepai('1p', true);
normalMoqie(3);
mopai();
comboMopai(3);
qiepai();
normalMoqie(60);
mopai();
zimingpai();
normalMoqie();
hupai();
