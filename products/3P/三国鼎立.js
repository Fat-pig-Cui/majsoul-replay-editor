clearProject();

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
        detail_rule: {}
    }
});

begin_tiles[0] = '19m19p189s1234567z';
begin_tiles[1] = '19m19p19s1234567z';
begin_tiles[2] = '19m19p19s1234567z';
randomPaishan('', 'YYYYYDYYYYYYYY');
roundBegin();
qiepai('8s');
moqieLiuju();
