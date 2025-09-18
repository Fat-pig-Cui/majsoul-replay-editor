clearProject();

player_datas[0].nickname = '一姬-契约';
player_datas[1].nickname = '一姬当千';
player_datas[2].nickname = '绮春歌';
player_datas[3].nickname = '校园微风';
player_datas[0].avatar_id = 400102;
player_datas[1].avatar_id = 400105;
player_datas[2].avatar_id = 400106;
player_datas[3].avatar_id = 400107;

// 头像框-赤丹霞羽
player_datas[0].avatar_frame = player_datas[1].avatar_frame = player_datas[2].avatar_frame = player_datas[3].avatar_frame = 30550012;
player_datas[0].views = player_datas[1].views = player_datas[2].views = player_datas[3].views = [
    {slot: 1, item_id: 30520006}, // 和牌-落羽涅槃
    {slot: 2, item_id: 30530006}, // 立直-有凤来仪
    {slot: 5, item_id: 30550012}, // 头像框-赤丹霞羽
];

setConfig({
    category: 1,
    meta: {mode_id: 0},
    mode: {
        mode: 1,
        detail_rule: {
            init_point: 750000,
        }
    }
});

// 第1局: 东亲, 东起 天和, 大三元, 四暗刻单骑
begin_tiles[0] = '222p22s555666777z';
begin_tiles[1] = '1112340678999m';
begin_tiles[2] = '1112340678999p';
begin_tiles[3] = '1112340678999s';
roundBegin();
hupai();

// 第2局: 东亲, 东起 天和, 字一色, 四暗刻单骑
begin_tiles[0] = '11122233355566z';
begin_tiles[1] = '1112340678999m';
begin_tiles[2] = '1112340678999p';
begin_tiles[3] = '1112340678999s';
roundBegin();
hupai();

// 第3局: 东亲, 东起 天和, 绿一色, 四暗刻单骑
begin_tiles[0] = '222444666888s66z';
begin_tiles[1] = '1112340678999m';
begin_tiles[2] = '1112340678999p';
begin_tiles[3] = '1112340678999s';
roundBegin();
hupai();

// 第4局: 东亲, 东起 天和, 清老头, 四暗刻单骑
begin_tiles[0] = '111999m111999p11s';
begin_tiles[1] = '2223405567888m';
begin_tiles[2] = '2223405567888p';
begin_tiles[3] = '2223405567888s';
roundBegin();
hupai();

// 第5局: 东亲, 东起 天和, 小四喜, 四暗刻单骑
begin_tiles[0] = '111m11122233344z';
begin_tiles[1] = '2223405567888m';
begin_tiles[2] = '2223405567888p';
begin_tiles[3] = '2223405567888s';
roundBegin();
hupai();

// 第6局: 东亲, 南起 地和, 大三元, 四暗刻单骑
begin_tiles[0] = '1112340678999m1z';
begin_tiles[1] = '222p2s555666777z';
begin_tiles[2] = '1112340678999p';
begin_tiles[3] = '1112340678999s';
randomPaishan('2s');
roundBegin();
qiepai();
zimoHu();

// 第7局: 南亲, 西起 地和, 四暗刻, 大四喜
begin_tiles[1] = '1112340678999m1z';
begin_tiles[2] = '22m11122233344z';
begin_tiles[3] = '1112340678999p';
begin_tiles[0] = '1112340678999s';
randomPaishan('4z');
roundBegin();
qiepai();
zimoHu();

// 第8局: 南亲, 西起 地和, 字一色, 四暗刻单骑
begin_tiles[2] = '1112340678999m1z';
begin_tiles[3] = '1112223335556z';
begin_tiles[0] = '1112340678999p';
begin_tiles[1] = '1112340678999s';
randomPaishan('6z');
roundBegin();
qiepai();
zimoHu();

// 第9局: 西亲, 北起 地和, 绿一色, 四暗刻单骑
begin_tiles[3] = '1112340678999m1z';
begin_tiles[0] = '222444666888s6z';
begin_tiles[1] = '1112340678999p';
begin_tiles[2] = '1112340678999s';
randomPaishan('6z');
roundBegin();
qiepai();
zimoHu();

// 第10局: 北亲, 东起 地和, 清老头, 四暗刻单骑
begin_tiles[0] = '2223405567888m1z';
begin_tiles[1] = '111999m111999p1s';
begin_tiles[2] = '2223405567888p';
begin_tiles[3] = '2223405567888s';
randomPaishan('1s');
roundBegin();
qiepai();
zimoHu();

// 第11局: 东亲, 南起 地和, 小四喜, 四暗刻单骑
begin_tiles[1] = '2223405567888m1z';
begin_tiles[2] = '111m1112223334z';
begin_tiles[3] = '2223405567888p';
begin_tiles[0] = '2223405567888s';
randomPaishan('4z');
roundBegin();
qiepai();
zimoHu();

// 第12局: 南亲, 南起 大三元, 字一色, 四暗刻单骑
begin_tiles[2] = '11123555666777z';
begin_tiles[3] = '2223405567888m';
begin_tiles[0] = '2223405567888p';
begin_tiles[1] = '2223405567888s';
randomPaishan('32z');
roundBegin();
qiepai('3z');
normalMoqie(2);
hupai();

// 第13局: 南亲, 南起 大三元, 四杠子, 四暗刻单骑
begin_tiles[2] = '1111s2555666777z';
begin_tiles[3] = '2223405567888m';
begin_tiles[0] = '2223405567888p';
begin_tiles[1] = '2223405567888s';
randomPaishan('', '2567z');
roundBegin();
comboMopai(4);
hupai();

// 第14局: 南亲, 南起 四暗刻, 字一色, 大四喜
begin_tiles[2] = '1s1112223334455z';
begin_tiles[3] = '2223405567888m';
begin_tiles[0] = '2223405567888p';
begin_tiles[1] = '1113405567888s';
randomPaishan('4z', '7z');
roundBegin();
qiepai('1s');
mingpai();
normalMoqie();
zimoHu();

// 第15局: 南亲, 南起 字一色, 小四喜, 四暗刻单骑
begin_tiles[2] = '11122233345557z';
begin_tiles[3] = '2223405567888m';
begin_tiles[0] = '2223405567888p';
begin_tiles[1] = '1113405567888s';
randomPaishan('64z');
roundBegin();
qiepai();
normalMoqie(2);
hupai();

// 第16局: 南亲, 南起 字一色, 四杠子, 四暗刻单骑
begin_tiles[2] = '11112223335556z';
begin_tiles[3] = '2223405567888m';
begin_tiles[0] = '2223405567888p';
begin_tiles[1] = '2223405567888s';
randomPaishan('', '6532z');
roundBegin();
comboMopai(4);
hupai();

// 第17局: 南亲, 南起 绿一色, 四杠子, 四暗刻单骑
begin_tiles[2] = '2222444666888s6z';
begin_tiles[3] = '1112340678999m';
begin_tiles[0] = '1112340678999p';
begin_tiles[1] = '1111333377779s';
randomPaishan('', '6z864s');
roundBegin();
comboMopai(4);
hupai();

// 第18局: 南亲, 南起 清老头, 四杠子, 四暗刻单骑
begin_tiles[2] = '1111999m111999p1s';
begin_tiles[3] = '2223405567888m';
begin_tiles[0] = '2223405567888p';
begin_tiles[1] = '2223405567888s';
randomPaishan('', '1s9p1p9m');
roundBegin();
comboMopai(4);
hupai();

// 第19局: 南亲, 南起 小四喜, 四杠子, 四暗刻单骑
begin_tiles[2] = '1111m1112223334z';
begin_tiles[3] = '2223405567888m';
begin_tiles[0] = '2223405567888p';
begin_tiles[1] = '2223405567888s';
randomPaishan('', '4z3z2z1z');
roundBegin();
comboMopai(4);
hupai();
