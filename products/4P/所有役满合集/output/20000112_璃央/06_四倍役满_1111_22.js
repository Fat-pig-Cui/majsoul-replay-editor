clearproject();

player_datas[0].nickname = '一姬-契约';
player_datas[1].nickname = '一姬当千';
player_datas[2].nickname = '绮春歌';
player_datas[3].nickname = '校园微风';
player_datas[0].avatar_id = 400102;
player_datas[1].avatar_id = 400105;
player_datas[2].avatar_id = 400106;
player_datas[3].avatar_id = 400107;

// 头像框-星点鳞光
player_datas[0].avatar_frame = player_datas[1].avatar_frame = player_datas[2].avatar_frame = player_datas[3].avatar_frame = 30550030;
player_datas[0].views = player_datas[1].views = player_datas[2].views = player_datas[3].views = [
    {slot: 1, item_id: 30520009}, // 和牌-静伏蛰影
    {slot: 2, item_id: 30530009}, // 立直-曲径通幽
    {slot: 5, item_id: 30550030}, // 头像框-星点鳞光
];

config = {
    category: 1,
    meta: {mode_id: 0},
    mode: {
        mode: 1,
        detail_rule: {
            init_point: 200000,
        }
    }
};

// 第1局: 东亲, 东起 四暗刻单骑, 大四喜
tiles0 = '1p1s111222333444z';
tiles1 = '2223405567888m';
tiles2 = '2223405567888p';
tiles3 = '2223405567888s';
randompaishan('1s');
roundbegin();
qiepai('1p');
normalmoqie();
hupai();

// 第2局: 东亲, 南起 地和, 大三元, 四暗刻, 字一色
tiles0 = '1112340678999s3z';
tiles1 = '1122555666777z';
tiles2 = '1112340678999m';
tiles3 = '1112340678999p';
randompaishan('1z');
roundbegin();
qiepai();
zimohu();

// 第3局: 南亲, 西起 地和, 四暗刻, 字一色, 小四喜
tiles1 = '1112340678999s7z';
tiles2 = '1112223334455z';
tiles3 = '1112340678999m';
tiles0 = '1112340678999p';
randompaishan('5z');
roundbegin();
qiepai();
zimohu();
