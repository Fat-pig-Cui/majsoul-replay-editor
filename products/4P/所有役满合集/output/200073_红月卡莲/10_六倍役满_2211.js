clearProject();

player_datas[0].nickname = '红月卡莲-契约';
player_datas[1].nickname = '红月卡莲';
player_datas[2].nickname = '红月卡莲-契约';
player_datas[3].nickname = '棋盘晚宴';
player_datas[0].avatar_id = 407302;
player_datas[1].avatar_id = 407301;
player_datas[2].avatar_id = 407302;
player_datas[3].avatar_id = 407303;

player_datas[0].views = player_datas[1].views = player_datas[2].views = player_datas[3].views = [
    {slot: 0, item_id: 308028}, // 立直棒-骑士的钥匙
    {slot: 1, item_id: 308026}, // 和牌-绝对的命令
    {slot: 2, item_id: 308027}, // 立直-王者的决意
    {slot: 6, item_id: 308029}, // 桌布-魔女的契约
    {slot: 7, item_id: 308030}, // 牌背-假面的裁决
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
