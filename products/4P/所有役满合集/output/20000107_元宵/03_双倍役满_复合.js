clearProject();

player_datas[0].nickname = '一姬-契约';
player_datas[1].nickname = '一姬当千';
player_datas[2].nickname = '绮春歌';
player_datas[3].nickname = '校园微风';
player_datas[0].avatar_id = 400102;
player_datas[1].avatar_id = 400105;
player_datas[2].avatar_id = 400106;
player_datas[3].avatar_id = 400107;

// 头像框-竹福滚滚
player_datas[0].avatar_frame = player_datas[1].avatar_frame = player_datas[2].avatar_frame = player_datas[3].avatar_frame = 30550022;
player_datas[0].views = player_datas[1].views = player_datas[2].views = player_datas[3].views = [
    {slot: 0, item_id: 30560007}, // 立直棒-青竹伞
    {slot: 5, item_id: 30550022}, // 头像框-竹福滚滚
    {slot: 6, item_id: 30580015}, // 桌布-清辉竹影
    {slot: 7, item_id: 30570009}, // 牌背-翠竹墨影
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

// 第1局: 东亲, 东起 天和, 大三元
begin_tiles[0] = '23488m555666777z';
begin_tiles[1] = '1112345678999m';
begin_tiles[2] = '1112340678999p';
begin_tiles[3] = '1112340678999s';
roundBegin();
hupai();

// 第2局: 东亲, 东起 天和, 字一色 (大七星)
begin_tiles[0] = '11223344556677z';
begin_tiles[1] = '1112340678999m';
begin_tiles[2] = '1112340678999p';
begin_tiles[3] = '1112340678999s';
roundBegin();
hupai();

// 第3局: 东亲, 东起 天和, 绿一色
begin_tiles[0] = '223344666888s66z';
begin_tiles[1] = '1112340678999m';
begin_tiles[2] = '1112340678999p';
begin_tiles[3] = '1112340678999s';
roundBegin();
hupai();

// 第4局: 东亲, 东起 天和, 小四喜
begin_tiles[0] = '234m11122233344z';
begin_tiles[1] = '1112340678999m';
begin_tiles[2] = '1112340678999p';
begin_tiles[3] = '1112340678999s';
roundBegin();
hupai();

// 第5局: 东亲, 南起 地和, 大三元
begin_tiles[0] = '1112340678999m1z';
begin_tiles[1] = '23488m55566677z';
begin_tiles[2] = '1112340678999p';
begin_tiles[3] = '1112340678999s';
randomPaishan('7z');
roundBegin();
qiepai();
zimoHu();

// 第6局: 南亲, 西起 地和, 四暗刻
begin_tiles[1] = '1112340678999m7z';
begin_tiles[2] = '555m555p555s1122z';
begin_tiles[3] = '1112340678999p';
begin_tiles[0] = '1112340678999s';
randomPaishan('1z');
roundBegin();
qiepai();
zimoHu();

// 第7局: 西亲, 北起 地和, 字一色
begin_tiles[2] = '1112340678999m1z';
begin_tiles[3] = '1122334455667z';
begin_tiles[0] = '1112340678999p';
begin_tiles[1] = '1112340678999s';
randomPaishan('7z');
roundBegin();
qiepai();
zimoHu();

// 第8局: 北亲, 东起 地和, 绿一色
begin_tiles[3] = '1112340678999m1z';
begin_tiles[0] = '223344666888s6z';
begin_tiles[1] = '1112340678999p';
begin_tiles[2] = '1112340678999s';
randomPaishan('6z');
roundBegin();
qiepai();
zimoHu();

// 第9局: 东亲, 南起 地和, 国士无双
begin_tiles[0] = '1112340678999m1z';
begin_tiles[1] = '19m19p19s1123457z';
begin_tiles[2] = '1112340678999p';
begin_tiles[3] = '1112340678999s';
randomPaishan('6z');
roundBegin();
qiepai();
zimoHu();

// 第10局: 南亲, 西起 地和, 小四喜
begin_tiles[1] = '1112340678999m1z';
begin_tiles[2] = '234m1112223334z';
begin_tiles[3] = '1112340678999p';
begin_tiles[0] = '1112340678999s';
randomPaishan('4z');
roundBegin();
qiepai();
zimoHu();

// 第11局: 西亲, 北起 地和, 九莲宝灯
begin_tiles[2] = '11122233344457z';
begin_tiles[3] = '1111234678999m';
begin_tiles[0] = '1112340678999p';
begin_tiles[1] = '1112340678999s';
randomPaishan('0m');
roundBegin();
qiepai();
zimoHu();

// 第12局: 北亲, 北起 大三元, 四暗刻
begin_tiles[3] = '222m88p155566677z';
begin_tiles[0] = '1112340678999m';
begin_tiles[1] = '1112340678999p';
begin_tiles[2] = '1112340678999s';
randomPaishan('1117z');
roundBegin();
qiepai('1z');
normalMoqie(3);
zimoHu();

// 第13局: 北亲, 北起 大三元, 字一色
begin_tiles[3] = '12233555666777z';
begin_tiles[0] = '1112340678999m';
begin_tiles[1] = '1112340678999p';
begin_tiles[2] = '1112340678999s';
randomPaishan('2z');
roundBegin();
qiepai('1z');
normalMoqie();
hupai();

// 第14局: 北亲, 北起 大三元, 四杠子 (副露)
begin_tiles[3] = '555m12555666777z';
begin_tiles[0] = '1111234678999m';
begin_tiles[1] = '1112340678999p';
begin_tiles[2] = '1112340678999s';
randomPaishan('5z', '276z0m');
roundBegin();
qiepai('1z');
normalMoqie();
mingpai();
mopai();
comboMopai(3);
hupai();

// 第15局: 北亲, 北起 四暗刻, 字一色
begin_tiles[3] = '1s1112223335566z';
begin_tiles[0] = '1112340678999m';
begin_tiles[1] = '1112340678999p';
begin_tiles[2] = '1113340678999s';
randomPaishan('5z', '4z');
roundBegin();
qiepai('1s');
mingpai();
normalMoqie();
zimoHu();

// 第16局: 北亲, 北起 四暗刻, 绿一色
begin_tiles[3] = '122244466688s66z';
begin_tiles[0] = '1112340678999m';
begin_tiles[1] = '1112340678999p';
begin_tiles[2] = '1113340678999s';
randomPaishan('6z', '4z');
roundBegin();
qiepai('1s');
mingpai();
normalMoqie();
zimoHu();

// 第17局: 北亲, 北起 四暗刻, 清老头
begin_tiles[3] = '11999m11999p1999s';
begin_tiles[0] = '2223405567888m';
begin_tiles[1] = '2223405567888p';
begin_tiles[2] = '1113405567888s';
randomPaishan('1m', '4z');
roundBegin();
qiepai('1s');
mingpai();
normalMoqie();
zimoHu();

// 第18局: 北亲, 北起 四暗刻, 小四喜
begin_tiles[3] = '1222s1112223344z';
begin_tiles[0] = '2223405567888m';
begin_tiles[1] = '2223405567888p';
begin_tiles[2] = '1113405567888s';
randomPaishan('3z', '5z');
roundBegin();
qiepai('1s');
mingpai();
normalMoqie();
zimoHu();

// 第19局: 北亲, 北起 字一色, 小四喜
begin_tiles[3] = '11122233445557z';
begin_tiles[0] = '2223405567888m';
begin_tiles[1] = '2223405567888p';
begin_tiles[2] = '2223405567888s';
randomPaishan('3z');
roundBegin();
qiepai();
normalMoqie();
hupai();

// 第20局: 北亲, 北起 字一色, 四杠子 (副露)
begin_tiles[3] = '11122233355567z';
begin_tiles[0] = '2223405567888m';
begin_tiles[1] = '2223405567888p';
begin_tiles[2] = '2223405567888s';
randomPaishan('1z', '6532z');
roundBegin();
qiepai();
normalMoqie();
mingpai();
mopai();
comboMopai(3);
hupai();

// 第21局: 北亲, 北起 绿一色, 四杠子 (副露)
begin_tiles[3] = '222444666888s67z';
begin_tiles[0] = '2223405567888m';
begin_tiles[1] = '2223405567888p';
begin_tiles[2] = '1111333377779s';
randomPaishan('2s', '6z864s');
roundBegin();
qiepai();
normalMoqie();
mingpai();
mopai();
comboMopai(3);
hupai();

// 第22局: 北亲, 北起 清老头, 四杠子 (副露)
begin_tiles[3] = '1999m111999p999s6z';
begin_tiles[0] = '2223405567888m';
begin_tiles[1] = '2223405567888p';
begin_tiles[2] = '2223405567888s';
randomPaishan('9s', '19m19p');
roundBegin();
qiepai();
normalMoqie();
mingpai();
mopai();
comboMopai(3);
hupai();

// 第23局: 北亲, 北起 小四喜, 四杠子 (副露)
begin_tiles[3] = '111s11122233347z';
begin_tiles[0] = '2223405567888m';
begin_tiles[1] = '2223405567888p';
begin_tiles[2] = '2223405567888s';
randomPaishan('1s', '4321z');
roundBegin();
qiepai();
normalMoqie();
mingpai();
mopai();
comboMopai(3);
hupai();
