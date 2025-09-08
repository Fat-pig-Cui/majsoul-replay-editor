clearProject();

player_datas[0].nickname = '一姬-契约';
player_datas[1].nickname = '新年初诣';
player_datas[2].nickname = '一姬当千';
player_datas[3].nickname = '绮春歌';
player_datas[0].avatar_id = 400102;
player_datas[1].avatar_id = 400104;
player_datas[2].avatar_id = 400105;
player_datas[3].avatar_id = 400106;

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
randomPaishan('1s');
roundBegin();
qiepai('1p');
normalMoqie();
hupai();

// 第2局: 东亲, 南起 地和, 大三元, 四暗刻, 字一色
tiles0 = '1112340678999s3z';
tiles1 = '1122555666777z';
tiles2 = '1112340678999m';
tiles3 = '1112340678999p';
randomPaishan('1z');
roundBegin();
qiepai();
zimoHu();

// 第3局: 南亲, 西起 地和, 四暗刻, 字一色, 小四喜
tiles1 = '1112340678999s7z';
tiles2 = '1112223334455z';
tiles3 = '1112340678999m';
tiles0 = '1112340678999p';
randomPaishan('5z');
roundBegin();
qiepai();
zimoHu();
