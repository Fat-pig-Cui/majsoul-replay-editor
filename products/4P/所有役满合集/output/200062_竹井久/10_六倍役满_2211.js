clearProject();

player_datas[0].nickname = '竹井久-契约';
player_datas[1].nickname = '竹井久';
player_datas[2].nickname = '竹井久-契约';
player_datas[3].nickname = '兔耳派对';
player_datas[0].avatar_id = 406202;
player_datas[1].avatar_id = 406201;
player_datas[2].avatar_id = 406202;
player_datas[3].avatar_id = 406203;

player_datas[0].views = player_datas[1].views = player_datas[2].views = player_datas[3].views = [
    {slot: 0, item_id: 308023}, // 立直棒-爱心便当
    {slot: 1, item_id: 308021}, // 和牌-高岭之花
    {slot: 2, item_id: 308022}, // 立直-未来视
    {slot: 6, item_id: 308024}, // 桌布-清凉假日
    {slot: 7, item_id: 308025}, // 牌背-摇曳彩球
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

// 第1局: 东亲, 东起 天和, 字一色, 四暗刻单骑, 大四喜
begin_tiles[0] = '11122233344477z';
begin_tiles[1] = '1112340678999m';
begin_tiles[2] = '1112340678999p';
begin_tiles[3] = '1112340678999s';
randomPaishan();
hupai();

// 第2局: 东亲, 南起 地和, 字一色, 四暗刻单骑, 大四喜
begin_tiles[0] = '1112340678999s5z';
begin_tiles[1] = '1112223334447z';
begin_tiles[2] = '1112340678999m';
begin_tiles[3] = '1112340678999p';
randomPaishan('7z');
qiepai();
zimoHu();

// 第3局: 南亲, 南起 字一色, 四杠子, 四暗刻单骑, 大四喜
begin_tiles[1] = '11112223334447z';
begin_tiles[2] = '1112340678999m';
begin_tiles[3] = '1112340678999p';
begin_tiles[0] = '1112340678999s';
randomPaishan('', '7432z');
comboMopai(4);
hupai();
