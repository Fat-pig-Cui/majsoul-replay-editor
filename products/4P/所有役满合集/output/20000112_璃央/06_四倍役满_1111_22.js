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
            init_point: 200000,
        }
    }
});

// 第1局: 东亲, 东起 四暗刻单骑, 大四喜
begin_tiles[0] = '1p1s111222333444z';
begin_tiles[1] = '2223405567888m';
begin_tiles[2] = '2223405567888p';
begin_tiles[3] = '2223405567888s';
randomPaishan('1s');
qiepai('1p');
normalMoqie();
hupai();

// 第2局: 东亲, 南起 地和, 大三元, 四暗刻, 字一色
begin_tiles[0] = '1112340678999s3z';
begin_tiles[1] = '1122555666777z';
begin_tiles[2] = '1112340678999m';
begin_tiles[3] = '1112340678999p';
randomPaishan('1z');
qiepai();
zimoHu();

// 第3局: 南亲, 西起 地和, 四暗刻, 字一色, 小四喜
begin_tiles[1] = '1112340678999s7z';
begin_tiles[2] = '1112223334455z';
begin_tiles[3] = '1112340678999m';
begin_tiles[0] = '1112340678999p';
randomPaishan('5z');
qiepai();
zimoHu();
