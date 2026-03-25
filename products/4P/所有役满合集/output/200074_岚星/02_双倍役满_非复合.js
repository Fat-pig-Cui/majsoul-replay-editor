clearProject();

player_datas[0].nickname = '岚星-契约';
player_datas[1].nickname = '岚星';
player_datas[2].nickname = '不寐之绊';
player_datas[3].nickname = '摇曳心情';
player_datas[0].avatar_id = 407402;
player_datas[1].avatar_id = 407401;
player_datas[2].avatar_id = 407403;
player_datas[3].avatar_id = 407404;

player_datas[0].views = player_datas[1].views = player_datas[2].views = player_datas[3].views = [
    {slot: 0, item_id: 305620}, // 立直棒-秘传之卷
    {slot: 1, item_id: 305222}, // 和牌-天地无用
    {slot: 2, item_id: 305322}, // 立直-毒烟玉
    {slot: 7, item_id: 305714}, // 牌背-手里剑
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
