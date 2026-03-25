clearProject();

player_datas[0].nickname = '艾丽莎-契约';
player_datas[1].nickname = '天黑请闭眼';
player_datas[2].nickname = '心跳时速';
player_datas[3].nickname = '纯白乐章';
player_datas[0].avatar_id = 403202;
player_datas[1].avatar_id = 403205;
player_datas[2].avatar_id = 403206;
player_datas[3].avatar_id = 403207;

player_datas[0].views = player_datas[1].views = player_datas[2].views = player_datas[3].views = [
    {slot: 6, item_id: 305803}, // 桌布-堆雪人
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

// 第1局: 东亲, 南起 纯正九莲宝灯
begin_tiles[0] = '0m123456789p1114z';
begin_tiles[1] = '1112345678999m';
begin_tiles[2] = '1112340678999p';
begin_tiles[3] = '1112340678999s';
randomPaishan();
qiepai('0m');
hupai();

// 第2局: 南亲, 南起 四暗刻单骑
begin_tiles[1] = '222p222s11122267z';
begin_tiles[2] = '1112340678999m';
begin_tiles[3] = '1112340678999p';
begin_tiles[0] = '1112340678999s';
randomPaishan('6z');
qiepai();
normalMoqie();
hupai();

// 第3局: 南亲, 南起 国士无双十三面
begin_tiles[1] = '139m19p19s1234567z';
begin_tiles[2] = '2223405567888m';
begin_tiles[3] = '1112340678999p';
begin_tiles[0] = '1112340678999s';
randomPaishan('1z');
qiepai('3m');
normalMoqie();
hupai();

// 第4局: 南亲, 南起 大四喜
begin_tiles[1] = '22m111222333445z';
begin_tiles[2] = '1112340678999m';
begin_tiles[3] = '1112340678999p';
begin_tiles[0] = '1112340678999s';
randomPaishan('54z');
qiepai();
normalMoqie(2);
hupai();
