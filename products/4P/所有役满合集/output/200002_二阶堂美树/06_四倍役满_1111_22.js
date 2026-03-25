clearProject();

player_datas[0].nickname = '二阶堂美树-契约';
player_datas[1].nickname = '万象沐春';
player_datas[2].nickname = '鸢尾花之夜';
player_datas[3].nickname = '玩转夏日';
player_datas[0].avatar_id = 400202;
player_datas[1].avatar_id = 400206;
player_datas[2].avatar_id = 400207;
player_datas[3].avatar_id = 400208;

// 称号-喵国大护法
player_datas[0].title = player_datas[1].title = player_datas[2].title = player_datas[3].title = 600021;
player_datas[0].views = player_datas[1].views = player_datas[2].views = player_datas[3].views = [
    {slot: 6, item_id: 305818}, // 桌布-藤萝悦色
];

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
