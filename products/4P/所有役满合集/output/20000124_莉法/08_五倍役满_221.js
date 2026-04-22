clearProject();

player_datas[0].nickname = '莉法-契约';
player_datas[1].nickname = '莉法';
player_datas[2].nickname = '莉法-契约';
player_datas[3].nickname = '绀碧之界';
player_datas[0].avatar_id = 40012402;
player_datas[1].avatar_id = 40012401;
player_datas[2].avatar_id = 40012402;
player_datas[3].avatar_id = 40012403;

// 头像框-战斗视界
player_datas[0].avatar_frame = player_datas[1].avatar_frame = player_datas[2].avatar_frame = player_datas[3].avatar_frame = 308057;
player_datas[0].views = player_datas[1].views = player_datas[2].views = player_datas[3].views = [
    {slot: 0, item_id: 308054}, // 立直棒-黑与白
    {slot: 1, item_id: 308052}, // 和牌-百斩缭乱
    {slot: 2, item_id: 308053}, // 立直-决战宣言
    {slot: 5, item_id: 308057}, // 头像框-战斗视界
    {slot: 6, item_id: 308055}, // 桌布-浮游城
    {slot: 7, item_id: 308056}, // 牌背-澄澈之心
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

// 第1局: 东亲, 东起 天和, 四暗刻单骑, 大四喜
begin_tiles[0] = '22m111222333444z';
begin_tiles[1] = '1112340678999m';
begin_tiles[2] = '1112340678999p';
begin_tiles[3] = '1112340678999s';
randomPaishan();
hupai();

// 第2局: 东亲, 南起 地和, 四暗刻单骑, 大四喜
begin_tiles[0] = '1112340678999s5z';
begin_tiles[1] = '2m111222333444z';
begin_tiles[2] = '1112340678999m';
begin_tiles[3] = '1112340678999p';
randomPaishan('2m');
qiepai();
zimoHu();

// 第3局: 南亲, 南起 字一色, 四暗刻单骑, 大四喜
begin_tiles[1] = '111222333444z57z';
begin_tiles[2] = '1112340678999m';
begin_tiles[3] = '1112340678999p';
begin_tiles[0] = '1112340678999s';
randomPaishan('5z');
qiepai();
normalMoqie();
hupai();

// 第4局: 南亲, 南起 四杠子, 四暗刻单骑, 大四喜
begin_tiles[1] = '2m1111222333444z';
begin_tiles[2] = '1112340678999m';
begin_tiles[3] = '1112340678999p';
begin_tiles[0] = '1112340678999s';
randomPaishan('', '2m432z');
comboMopai(4);
hupai();
