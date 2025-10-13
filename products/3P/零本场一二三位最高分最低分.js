clearProject();

// 主要思路可以参照四麻的十一倍铳满和对应文件
// 这里分两种情况, 不限制本场数和只能零本场
// 不限制本场数一位最高分和二三位最低分都没有限制, 且二位最高分就是零本场情况下的一位最高分
// 零本场限制了用刷本场的方法刷最高分

player_datas[0].nickname = '一姬-契约';
player_datas[1].nickname = '一姬当千';
player_datas[2].nickname = '绮春歌';
player_datas[0].avatar_id = 400102;
player_datas[1].avatar_id = 400105;
player_datas[2].avatar_id = 400106;

setConfig({
    category: 1,
    meta: {mode_id: 0},
    mode: {
        mode: 11,
        detail_rule: {
            _scores_: [105000, 0, 0],
        }
    }
});

// 零本场一位最高分: 393000, 三位最低分: -384000
begin_tiles[0] = '11112223334446z';
begin_tiles[1] = '1112340678999p';
begin_tiles[2] = '222444666888s6z';
randomPaishan('6z', '1m432z');
roundBegin();
for (let i = 0; i < 4; i++) {
    zimingpai(i + 1 + 'z', 'angang');
    mopai();
}
qiepai();
normalMoqie();
hupai();

setRound(0, 0, 0);

// 零本场二位最高分: 228500
setScores([36500, 68500, 0]);
begin_tiles[0] = '2222444666888s6z';
begin_tiles[1] = '1112223334446z';
begin_tiles[2] = '1112340678999p';
randomPaishan('76z', '1m864s');
roundBegin();
for (let i = 0; i < 4; i++) {
    zimingpai((i + 1) * 2 + 's', 'angang');
    mopai();
}
qiepai();
normalMoqie(2);
hupai();

setRound(0, 0, 0);

// 零本场二位最低分: -96000
setScores([105000, 0, 0]);
begin_tiles[0] = '11122233344466z';
begin_tiles[1] = '1112340678999p';
begin_tiles[2] = '1112340678999s';
roundBegin();
hupai();
