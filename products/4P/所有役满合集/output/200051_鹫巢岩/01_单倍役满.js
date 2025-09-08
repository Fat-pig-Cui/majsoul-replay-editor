clearProject();

player_datas[0].nickname = '一姬-契约';
player_datas[1].nickname = '一姬当千';
player_datas[2].nickname = '绮春歌';
player_datas[3].nickname = '校园微风';
player_datas[0].avatar_id = 400102;
player_datas[1].avatar_id = 400105;
player_datas[2].avatar_id = 400106;
player_datas[3].avatar_id = 400107;

player_datas[0].views = player_datas[1].views = player_datas[2].views = player_datas[3].views = [
    {slot: 0, item_id: 308013}, // 立直棒-命悬一线
    {slot: 1, item_id: 308011}, // 和牌-地狱低语
    {slot: 2, item_id: 308012}, // 立直-幽冥之焰
    {slot: 6, item_id: 308014}, // 桌布-传说之夜
    {slot: 7, item_id: 308015}, // 牌背-双鹫纹章
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
}

// 第1局: 东亲, 东起 天和
tiles0 = '123456789p11144z';
tiles1 = '1112340678999m';
tiles2 = '1112340678999p';
tiles3 = '1112340678999s';
roundBegin();
hupai();

// 第2局: 东亲, 南起 地和
tiles0 = '1112340678999m2z';
tiles1 = '123456789p1144z';
tiles2 = '1112340678999p';
tiles3 = '1112340678999s';
randomPaishan('1z');
roundBegin();
qiepai();
zimoHu();

// 第3局: 南亲, 南起 大三元
tiles1 = '123p12555666777z';
tiles2 = '1112340678999m';
tiles3 = '1112340678999p';
tiles0 = '1112340678999s';
randomPaishan('1z');
roundBegin();
qiepai('2z');
normalMoqie();
hupai();

// 第4局: 南亲, 南起 四暗刻
tiles1 = '555m555p555s11447z';
tiles2 = '1112340678999m';
tiles3 = '1112340678999p';
tiles0 = '1112340678999s';
randomPaishan('2221z');
roundBegin();
qiepai();
normalMoqie(3);
zimoHu();

// 第5局: 南亲, 南起 字一色
tiles1 = '11122233355667z';
tiles2 = '1112340678999m';
tiles3 = '1112340678999p';
tiles0 = '1112340678999s';
randomPaishan('76z');
roundBegin();
qiepai();
normalMoqie(2);
hupai();

// 第6局: 南亲, 南起 绿一色
tiles1 = '223344666888s6z7z';
tiles2 = '1112340678999m';
tiles3 = '1112340678999p';
tiles0 = '1112340678999s';
randomPaishan('776z');
roundBegin();
qiepai();
normalMoqie(3);
hupai();

// 第7局: 南亲, 南起 清老头
tiles1 = '11999m999p11999s1z';
tiles2 = '2223405567888m';
tiles3 = '2223405567888p';
tiles0 = '2223405567888s';
randomPaishan('1m');
roundBegin();
qiepai();
normalMoqie();
hupai();

// 第8局: 南亲, 南起 国士无双
tiles1 = '119m19p19s1234577z';
tiles2 = '2223405567888m';
tiles3 = '2223405567888p';
tiles0 = '2223405567888s';
randomPaishan('16z');
roundBegin();
qiepai();
normalMoqie(2);
hupai();

// 第9局: 南亲, 南起 小四喜
tiles1 = '123m11122233345z';
tiles2 = '2223405567888m';
tiles3 = '2223405567888p';
tiles0 = '2223405567888s';
randomPaishan('554z');
roundBegin();
qiepai();
normalMoqie(3);
hupai();

// 第10局: 南亲, 南起 四杠子
tiles1 = '111999m999p11127z';
tiles2 = '2223405567888m';
tiles3 = '2223405567888p';
tiles0 = '2223405567888s';
randomPaishan('1z', '2z1m9p9m');
roundBegin();
qiepai();
normalMoqie();
mingpai();
mopai();
comboMopai(3);
hupai();

// 第11局: 南亲, 南起 九莲宝灯
tiles1 = '1123465789999m7z';
tiles2 = '2223405567888m';
tiles3 = '2223405567888p';
tiles0 = '2223405567888s';
randomPaishan('11z1m');
roundBegin();
qiepai();
normalMoqie(3);
hupai();
