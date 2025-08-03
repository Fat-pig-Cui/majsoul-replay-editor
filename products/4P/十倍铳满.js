clearproject();

// 南起 铳三家共 2 (十三面) + 3 (绿四单) + 5 (字骑喜) = 10 倍役满

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
            init_point: 500000,
        }
    }
};

tiles0 = '0p1112223334446z';
tiles1 = '1112340678999m';
tiles2 = '19m19p19s1234567z';
tiles3 = '222444666888s6z';
randompaishan('6z');
roundbegin();
qiepai('0p');
moqieliqi();
hupai();
