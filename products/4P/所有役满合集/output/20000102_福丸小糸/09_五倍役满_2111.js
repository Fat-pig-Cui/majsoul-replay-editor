clearProject();

player_datas[0].nickname = '福丸小糸-契约';
player_datas[1].nickname = '福丸小糸';
player_datas[2].nickname = '福丸小糸-契约';
player_datas[3].nickname = '悠然格调';
player_datas[0].avatar_id = 40010202;
player_datas[1].avatar_id = 40010201;
player_datas[2].avatar_id = 40010202;
player_datas[3].avatar_id = 40010203;

player_datas[0].views = player_datas[1].views = player_datas[2].views = player_datas[3].views = [
    {slot: 0, item_id: 30560005}, // 立直棒-动听之源
    {slot: 1, item_id: 30520007}, // 和牌-涟漪之空
    {slot: 2, item_id: 30530007}, // 立直-水漾星光
    {slot: 6, item_id: 30580011}, // 桌布-闪耀吧！
    {slot: 7, item_id: 30570007}, // 牌背-静谧夜光
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

// 第1局: 东亲, 东起 天和, 大三元, 字一色, 四暗刻单骑
begin_tiles[0] = '11122555666777z';
begin_tiles[1] = '1112340678999m';
begin_tiles[2] = '1112340678999p';
begin_tiles[3] = '1112340678999s';
randomPaishan();
hupai();

// 第2局: 东亲, 东起 天和, 字一色, 小四喜, 四暗刻单骑
begin_tiles[0] = '11122233344555z';
begin_tiles[1] = '1112340678999m';
begin_tiles[2] = '1112340678999p';
begin_tiles[3] = '1112340678999s';
randomPaishan();
hupai();

// 第3局: 东亲, 南起 地和, 大三元, 字一色, 四暗刻单骑
begin_tiles[0] = '1112340678999m4z';
begin_tiles[1] = '1112555666777z';
begin_tiles[2] = '1112340678999p';
begin_tiles[3] = '1112340678999s';
randomPaishan('2z');
qiepai();
zimoHu();

// 第4局: 南亲, 西起 地和, 四暗刻, 字一色, 大四喜
begin_tiles[1] = '1112340678999m7z';
begin_tiles[2] = '1112223334455z';
begin_tiles[3] = '1112340678999p';
begin_tiles[0] = '1112340678999s';
randomPaishan('4z');
qiepai();
zimoHu();

// 第5局: 西亲, 北起 地和, 字一色, 小四喜, 四暗刻单骑
begin_tiles[2] = '1112340678999m7z';
begin_tiles[3] = '1112223334555z';
begin_tiles[0] = '1112340678999p';
begin_tiles[1] = '1112340678999s';
randomPaishan('4z');
qiepai();
zimoHu();

// 第6局: 北亲, 北起 大三元, 字一色, 四杠子, 四暗刻单骑
begin_tiles[3] = '11112555666777z';
begin_tiles[0] = '1112340678999m';
begin_tiles[1] = '1112340678999p';
begin_tiles[2] = '1112340678999s';
randomPaishan('', '2567z');
comboMopai(4);
hupai();

// 第7局: 北亲, 北起 字一色, 小四喜, 四杠子, 四暗刻单骑
begin_tiles[3] = '11112223334555z';
begin_tiles[0] = '1112340678999m';
begin_tiles[1] = '1112340678999p';
begin_tiles[2] = '1112340678999s';
randomPaishan('', '4532z');
comboMopai(4);
hupai();
