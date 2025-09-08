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
    {slot: 0, item_id: 308043}, // 立直棒-胜利誓约
    {slot: 1, item_id: 308041}, // 和牌-咒层界・恶念祝祭
    {slot: 2, item_id: 308042}, // 立直-虚影祝祷
    {slot: 6, item_id: 308044}, // 桌布-剑之丘
    {slot: 7, item_id: 308045}, // 牌背-噬光之剑
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
roundBegin();
hupai();

// 第2局: 东亲, 东起 天和, 字一色, 小四喜, 四暗刻单骑
tiles0 = '11122233344555z';
tiles1 = '1112340678999m';
tiles2 = '1112340678999p';
tiles3 = '1112340678999s';
roundBegin();
hupai();

// 第3局: 东亲, 南起 地和, 大三元, 字一色, 四暗刻单骑
tiles0 = '1112340678999m4z';
tiles1 = '1112555666777z';
tiles2 = '1112340678999p';
tiles3 = '1112340678999s';
randomPaishan('2z');
roundBegin();
qiepai();
zimoHu();

// 第4局: 南亲, 西起 地和, 四暗刻, 字一色, 大四喜
tiles1 = '1112340678999m7z';
tiles2 = '1112223334455z';
tiles3 = '1112340678999p';
tiles0 = '1112340678999s';
randomPaishan('4z');
roundBegin();
qiepai();
zimoHu();

// 第5局: 西亲, 北起 地和, 字一色, 小四喜, 四暗刻单骑
tiles2 = '1112340678999m7z';
tiles3 = '1112223334555z';
tiles0 = '1112340678999p';
tiles1 = '1112340678999s';
randomPaishan('4z');
roundBegin();
qiepai();
zimoHu();

// 第6局: 北亲, 北起 大三元, 字一色, 四杠子, 四暗刻单骑
tiles3 = '11112555666777z';
tiles0 = '1112340678999m';
tiles1 = '1112340678999p';
tiles2 = '1112340678999s';
randomPaishan('', '2567z');
roundBegin();
comboMopai(4);
hupai();

// 第7局: 北亲, 北起 字一色, 小四喜, 四杠子, 四暗刻单骑
tiles3 = '11112223334555z';
tiles0 = '1112340678999m';
tiles1 = '1112340678999p';
tiles2 = '1112340678999s';
randomPaishan('', '4532z');
roundBegin();
comboMopai(4);
hupai();
