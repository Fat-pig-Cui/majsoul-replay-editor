clearProject();

player_datas[0].nickname = '一姬-契约';
player_datas[1].nickname = '一姬当千';
player_datas[2].nickname = '绮春歌';
player_datas[3].nickname = '校园微风';
player_datas[0].avatar_id = 400102;
player_datas[1].avatar_id = 400105;
player_datas[2].avatar_id = 400106;
player_datas[3].avatar_id = 400107;

// 头像框-大小姐发带
player_datas[0].avatar_frame = player_datas[1].avatar_frame = player_datas[2].avatar_frame = player_datas[3].avatar_frame = 305552;
player_datas[0].views = player_datas[1].views = player_datas[2].views = player_datas[3].views = [
    {slot: 5, item_id: 305552}, // 头像框-大小姐发带
    {slot: 6, item_id: 305802}, // 桌布-冲鸭！
];

setConfig({
    category: 1,
    meta: {mode_id: 0},
    mode: {
        mode: 1,
        detail_rule: {
            init_point: 500000,
        }
    }
});

// 第1局: 东亲, 南起 地和, 大三元, 四暗刻
begin_tiles[0] = '1112340678999m1z';
begin_tiles[1] = '22p22s555666777z';
begin_tiles[2] = '1112340678999p';
begin_tiles[3] = '1112340678999s';
randomPaishan('2p');
roundBegin();
qiepai();
zimoHu();

// 第2局: 南亲, 西起 地和, 四暗刻, 字一色
begin_tiles[1] = '1112340678999m7z';
begin_tiles[2] = '1112223335566z';
begin_tiles[3] = '1112340678999p';
begin_tiles[0] = '1112340678999s';
randomPaishan('5z');
roundBegin();
qiepai();
zimoHu();

// 第3局: 西亲, 北起 地和, 四暗刻, 绿一色
begin_tiles[2] = '1112340678999m7z';
begin_tiles[3] = '22244466688s66z';
begin_tiles[0] = '1112340678999p';
begin_tiles[1] = '1112340678999s';
randomPaishan('8s');
roundBegin();
qiepai();
zimoHu();

// 第4局: 北亲, 东起 地和, 四暗刻, 清老头
begin_tiles[3] = '2223405567888m7z';
begin_tiles[0] = '111999m11199p11s';
begin_tiles[1] = '2223405567888p';
begin_tiles[2] = '2223405567888s';
randomPaishan('9p');
roundBegin();
qiepai();
zimoHu();

// 第5局: 东亲, 南起 地和, 四暗刻, 小四喜
begin_tiles[0] = '2223405567888m7z';
begin_tiles[1] = '111m1112223344z';
begin_tiles[2] = '2223405567888p';
begin_tiles[3] = '2223405567888s';
randomPaishan('3z');
roundBegin();
qiepai();
zimoHu();

// 第6局: 南亲, 南起 大三元, 四暗刻, 字一色
begin_tiles[1] = '1s1122555666777z';
begin_tiles[2] = '2223405567888m';
begin_tiles[3] = '2223405567888p';
begin_tiles[0] = '1113405567888s';
randomPaishan('1z', '4z');
roundBegin();
qiepai('1s');
mingpai();
normalMoqie();
zimoHu();

// 第7局: 南亲, 南起 大三元, 字一色, 四杠子 (副露)
begin_tiles[1] = '11123555666777z';
begin_tiles[2] = '2223405567888m';
begin_tiles[3] = '2223405567888p';
begin_tiles[0] = '2223405567888s';
randomPaishan('1z', '2567z');
roundBegin();
qiepai('3z');
normalMoqie();
mingpai();
mopai();
comboMopai(3);
hupai();

// 第8局: 南亲, 南起 四暗刻, 字一色, 小四喜
begin_tiles[1] = '1s1112223344555z';
begin_tiles[2] = '2223405567888m';
begin_tiles[3] = '2223405567888p';
begin_tiles[0] = '1113405567888s';
randomPaishan('3z', '6z');
roundBegin();
qiepai('1s');
mingpai();
normalMoqie();
zimoHu();

// 第9局: 南亲, 南起 字一色, 小四喜, 四杠子 (副露)
begin_tiles[1] = '1112223334z5557z';
begin_tiles[2] = '2223405567888m';
begin_tiles[3] = '2223405567888p';
begin_tiles[0] = '2223405567888s';
randomPaishan('5z', '4123z');
roundBegin();
qiepai();
normalMoqie();
mingpai();
mopai();
comboMopai(3);
hupai();
