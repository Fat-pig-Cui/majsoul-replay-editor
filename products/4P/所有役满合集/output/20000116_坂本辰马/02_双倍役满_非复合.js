clearProject();

player_datas[0].nickname = '坂本辰马-契约';
player_datas[1].nickname = '坂本辰马';
player_datas[2].nickname = '坂本辰马-契约';
player_datas[3].nickname = '麻将桌即人生';
player_datas[0].avatar_id = 40011602;
player_datas[1].avatar_id = 40011601;
player_datas[2].avatar_id = 40011602;
player_datas[3].avatar_id = 40011603;

// 头像框-伊丽莎白框
player_datas[0].avatar_frame = player_datas[1].avatar_frame = player_datas[2].avatar_frame = player_datas[3].avatar_frame = 308051;
player_datas[0].views = player_datas[1].views = player_datas[2].views = player_datas[3].views = [
    {slot: 0, item_id: 308048}, // 立直棒-志村新八
    {slot: 1, item_id: 308046}, // 和牌-谢幕的Just a way
    {slot: 2, item_id: 308047}, // 立直-伊丽莎白
    {slot: 5, item_id: 308051}, // 头像框-伊丽莎白框
    {slot: 6, item_id: 308049}, // 桌布-骑摩托的银时
    {slot: 7, item_id: 308050}, // 牌背-Just a way
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
