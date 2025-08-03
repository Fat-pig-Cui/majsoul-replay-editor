clearproject();

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

// 第1局: 东亲, 东起 天和, 大三元, 字一色, 四暗刻单骑
tiles0 = '11122555666777z';
tiles1 = '1112340678999m';
tiles2 = '1112340678999p';
tiles3 = '1112340678999s';
roundbegin();
hupai();

// 第2局: 东亲, 东起 天和, 字一色, 小四喜, 四暗刻单骑
tiles0 = '11122233344555z';
tiles1 = '1112340678999m';
tiles2 = '1112340678999p';
tiles3 = '1112340678999s';
roundbegin();
hupai();

// 第3局: 东亲, 南起 地和, 大三元, 字一色, 四暗刻单骑
tiles0 = '1112340678999m4z';
tiles1 = '1112555666777z';
tiles2 = '1112340678999p';
tiles3 = '1112340678999s';
randompaishan('2z');
roundbegin();
qiepai();
zimohu();

// 第4局: 南亲, 西起 地和, 四暗刻, 字一色, 大四喜
tiles1 = '1112340678999m7z';
tiles2 = '1112223334455z';
tiles3 = '1112340678999p';
tiles0 = '1112340678999s';
randompaishan('4z');
roundbegin();
qiepai();
zimohu();

// 第5局: 西亲, 北起 地和, 字一色, 小四喜, 四暗刻单骑
tiles2 = '1112340678999m7z';
tiles3 = '1112223334555z';
tiles0 = '1112340678999p';
tiles1 = '1112340678999s';
randompaishan('4z');
roundbegin();
qiepai();
zimohu();

// 第6局: 北亲, 北起 大三元, 字一色, 四杠子, 四暗刻单骑
tiles3 = '11112555666777z';
tiles0 = '1112340678999m';
tiles1 = '1112340678999p';
tiles2 = '1112340678999s';
randompaishan('', '2567z');
roundbegin();
combomopai(4);
hupai();

// 第7局: 北亲, 北起 字一色, 小四喜, 四杠子, 四暗刻单骑
tiles3 = '11112223334555z';
tiles0 = '1112340678999m';
tiles1 = '1112340678999p';
tiles2 = '1112340678999s';
randompaishan('', '4532z');
roundbegin();
combomopai(4);
hupai();
