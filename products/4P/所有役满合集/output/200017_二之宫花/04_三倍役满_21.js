clearProject();

player_datas[0].nickname = '一姬-契约';
player_datas[1].nickname = '一姬当千';
player_datas[2].nickname = '绮春歌';
player_datas[3].nickname = '校园微风';
player_datas[0].avatar_id = 400102;
player_datas[1].avatar_id = 400105;
player_datas[2].avatar_id = 400106;
player_datas[3].avatar_id = 400107;

// 头像框-豆芽
player_datas[0].avatar_frame = player_datas[1].avatar_frame = player_datas[2].avatar_frame = player_datas[3].avatar_frame = 305500;
player_datas[0].views = player_datas[1].views = player_datas[2].views = player_datas[3].views = [
    {slot: 0, item_id: 305621}, // 立直棒-盆栽
    {slot: 5, item_id: 305500}, // 头像框-豆芽
    {slot: 6, item_id: 305801}, // 桌布-锦鲤游
];

config = {
    category: 1,
    meta: {mode_id: 0},
    mode: {
        mode: 1,
        detail_rule: {
            init_point: 500000,
        }
    }
};

// 第1局: 东亲, 东起 天和, 纯正九莲宝灯
tiles0 = '11123405678999m';
tiles1 = '1112223334445z';
tiles2 = '1112340678999p';
tiles3 = '1112340678999s';
roundBegin();
hupai();

// 第2局: 东亲, 东起 天和, 四暗刻单骑
tiles0 = '555m555p555s11122z';
tiles1 = '1112340678999m';
tiles2 = '1112340678999p';
tiles3 = '1112340678999s';
roundBegin();
hupai();

// 第3局: 东亲, 东起 天和, 国士无双十三面
tiles0 = '19m19p19s12345677z';
tiles1 = '1112340678999m';
tiles2 = '1112340678999p';
tiles3 = '1112340678999s';
roundBegin();
hupai();

// 第4局: 东亲, 南起 地和, 纯正九莲宝灯
tiles0 = '11122233344456z';
tiles1 = '1112345678999m';
tiles2 = '1112340678999p';
tiles3 = '1112340678999s';
randomPaishan('0m');
roundBegin();
qiepai();
zimoHu();

// 第5局: 南亲, 西起 地和, 四暗刻单骑
tiles1 = '1112340678999m7z';
tiles2 = '555m555p555s1112z';
tiles3 = '1112340678999p';
tiles0 = '1112340678999s';
randomPaishan('2z');
roundBegin();
qiepai();
zimoHu();

// 第6局: 西亲, 北起 地和, 国士无双十三面
tiles2 = '22234055677888m';
tiles3 = '19m19p19s1234567z';
tiles0 = '1112340678999p';
tiles1 = '1112340678999s';
randomPaishan('7z');
roundBegin();
qiepai('7m');
zimoHu();

// 第7局: 北亲, 北起 大三元, 四暗刻单骑
tiles3 = '222p12555666777z';
tiles0 = '1112340678999m';
tiles1 = '1112340678999p';
tiles2 = '1112340678999s';
randomPaishan('1z');
roundBegin();
qiepai('2z');
normalMoqie();
hupai();

// 第8局: 北亲, 北起 四暗刻, 大四喜
tiles3 = '22m111222333445z';
tiles0 = '1112340678999m';
tiles1 = '1112340678999p';
tiles2 = '1112340678999s';
randomPaishan('5554z');
roundBegin();
qiepai();
normalMoqie(3);
zimoHu();

// 第9局: 北亲, 北起 字一色, 四暗刻单骑
tiles3 = '11122233355567z';
tiles0 = '1112340678999m';
tiles1 = '1112340678999p';
tiles2 = '1112340678999s';
randomPaishan('6z');
roundBegin();
qiepai();
normalMoqie();
hupai();

// 第10局: 北亲, 北起 字一色, 大四喜
tiles3 = '11122233344556z';
tiles0 = '1112340678999m';
tiles1 = '1112340678999p';
tiles2 = '1112340678999s';
randomPaishan('4z');
roundBegin();
qiepai();
normalMoqie();
hupai();

// 第11局: 北亲, 北起 绿一色, 四暗刻单骑
tiles3 = '222444666888s67z';
tiles0 = '1112340678999m';
tiles1 = '1112340678999p';
tiles2 = '1112340678999s';
randomPaishan('6z');
roundBegin();
qiepai();
normalMoqie();
hupai();

// 第12局: 北亲, 北起 清老头, 四暗刻单骑
tiles3 = '111999m111999p19s';
tiles0 = '2223405567888m';
tiles1 = '2223405567888p';
tiles2 = '2223405567888s';
randomPaishan('1s');
roundBegin();
qiepai();
normalMoqie();
hupai();

// 第13局: 北亲, 北起 小四喜, 四暗刻单骑
tiles3 = '111m11122233345z';
tiles0 = '2223405567888m';
tiles1 = '2223405567888p';
tiles2 = '2223405567888s';
randomPaishan('54z');
roundBegin();
qiepai();
normalMoqie(2);
hupai();

// 第14局: 北亲, 北起 四杠子, 四暗刻单骑
tiles3 = '1111m1112223335z';
tiles0 = '2223405567888m';
tiles1 = '2223405567888p';
tiles2 = '2223405567888s';
randomPaishan('', '5123z');
roundBegin();
comboMopai(4);
hupai();

// 第15局: 北亲, 北起 四杠子, 大四喜
tiles3 = '1m1112223334445z';
tiles0 = '2223405567888m';
tiles1 = '2223405567888p';
tiles2 = '2223405567888s';
randomPaishan('1z', '1m432z');
roundBegin();
qiepai();
normalMoqie();
mingpai();
mopai();
comboMopai(3);
hupai();
