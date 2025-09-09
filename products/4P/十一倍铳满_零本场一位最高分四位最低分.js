clearProject();

// 如果不限制零本场那一位最高分和四位最低分没有限制
// 南起 铳三家共 2 (四单) + 3 (绿四单) + 6 (字杠骑喜) = 11 倍役满
// 一位最高分: 388000
// 四位最低分: -448000

player_datas[0].nickname = '一姬-契约';
player_datas[1].nickname = '新年初诣';
player_datas[2].nickname = '一姬当千';
player_datas[3].nickname = '绮春歌';
player_datas[0].avatar_id = 400102;
player_datas[1].avatar_id = 400104;
player_datas[2].avatar_id = 400105;
player_datas[3].avatar_id = 400106;

config = {
    category: 1,
    meta: {mode_id: 0},
    mode: {
        mode: 1,
        detail_rule: {
            _scores_: [100000, 0, 0, 0],
        }
    }
};

begin_tiles[0] = '11112223334446z';
begin_tiles[1] = '1112340678999m';
begin_tiles[2] = '111333777999s6z';
begin_tiles[3] = '222444666888s6z';
randomPaishan('6z', '0p432z');
roundBegin();
comboMopai(4);
qiepai();
normalMoqie();
hupai();
