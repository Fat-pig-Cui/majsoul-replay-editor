clearProject();

player_datas[0].nickname = '四宫夏生-契约';
player_datas[1].nickname = '化妆舞会';
player_datas[2].nickname = '细雪呈瑞';
player_datas[3].nickname = '悸动之夏';
player_datas[0].avatar_id = 401102;
player_datas[1].avatar_id = 401103;
player_datas[2].avatar_id = 401104;
player_datas[3].avatar_id = 401105;

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
