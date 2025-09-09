clearProject();

// 主要思路是用十一倍铳满变换
// 这里分两种情况, 不限制本场数和只能零本场
// 不限制本场数一位最高分和二三四位最低分都没有限制,
// 且二位最高分就是零本场情况下的一位最高分, 三位最高分就是零本场情况下的二位最高分
// 零本场限制了用刷本场的方法刷最高分
// 因为一局最多只能有一个人放铳, 所以二位和三位最低分都只能是亲自摸导致的, 而且数值一样

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
            _scores_: [34000, 66000, 0, 0],
        }
    }
};

// 零本场二位最高分: 226000
begin_tiles[0] = '2222444666888s6z';
begin_tiles[1] = '1112223334446z';
begin_tiles[2] = '1112340678999m';
begin_tiles[3] = '111333777999s6z';
randomPaishan('76z', '7z864s');
roundBegin();
comboMopai(4);
qiepai();
normalMoqie(2);
hupai([0, 1]);

setRound(0, 0, 0);

// 零本场三位最高分: 162000
setScores([0, 2000, 0, 98000]);
begin_tiles[0] = '2222444666888s6z';
begin_tiles[1] = '1112223334446z';
begin_tiles[2] = '1112340678999m';
begin_tiles[3] = '111333777999s6z';
randomPaishan('76z', '7z864s');
roundBegin();
comboMopai(4);
qiepai();
normalMoqie(2);
hupai();

setRound(0, 0, 0);

// 零本场二位最低分和三位最低分: -96000
setScores([100000, 0, 0, 0]);
begin_tiles[0] = '11122233344477z';
begin_tiles[1] = '1112340678999m';
begin_tiles[2] = '1112340678999p';
begin_tiles[3] = '1112340678999s';
roundBegin();
hupai();
