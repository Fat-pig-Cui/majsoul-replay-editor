clearProject();

player_datas[0].nickname = '姬川响-契约';
player_datas[1].nickname = '姬川响';
player_datas[2].nickname = '新岁添喜';
player_datas[3].nickname = '奇遇星光';
player_datas[0].avatar_id = 404602;
player_datas[1].avatar_id = 404601;
player_datas[2].avatar_id = 404603;
player_datas[3].avatar_id = 404604;

// 主播(猫爪)认证
player_datas[0].verified = player_datas[1].verified = player_datas[2].verified = player_datas[3].verified = 1;

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
