clearProject();

player_datas[0].nickname = '一姬-契约';
player_datas[1].nickname = '新年初诣';
player_datas[2].nickname = '一姬当千';
player_datas[3].nickname = '绮春歌';
player_datas[0].avatar_id = 400102;
player_datas[1].avatar_id = 400104;
player_datas[2].avatar_id = 400105;
player_datas[3].avatar_id = 400106;

setConfig({
    category: 1,
    meta: {mode_id: 0},
    mode: {
        mode: 1,
        detail_rule: {
            init_point: 100000,
            _sigangbaopai: true,
        }
    }
});

// 情景1: 0: 大三元四杠子 包牌家1和2, 1: 大四喜, 包牌家: 0, 最后3放铳01
begin_tiles[0] = '1999m1555666777z';
begin_tiles[1] = '1m9s11223344567z';
begin_tiles[2] = '1666777888999p';
begin_tiles[3] = '1666777888999s';
randomPaishan('9mDD1m', 'D432z');
roundBegin();
qiepai('1z');
for (let i = 0; i < 3; i++) {
    mingQiepai(i + 5 + 'z');
    mingpai();
    normalMoqie();
}
mingQiepai('9s');
normalMoqie();
mingpai();
normalMoqie(4);
hupai();

// 情景2: 三种役满出现在三家
begin_tiles[0] = '1112345678999m6z';
begin_tiles[1] = '366s1234556677z';
begin_tiles[2] = '12389s11223344z';
begin_tiles[3] = '1112223s888999s';
setDiscardTiles(['6z3s', '1234z', '1289s', '57z67s']);
randomPaishan('3s', '76s75z');
roundBegin();
qiepai(true);
for (let i = 0; i < 4; i++) {
    mingQiepai(2);
    mingpai();
    normalMoqie();
}
normalMoqie();
hupai();
