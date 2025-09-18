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
        detail_rule: {}
    }
});

begin_tiles[0] = '129m19p19s1234567z';
begin_tiles[1] = '19m19p19s1234567z';
begin_tiles[2] = '19m19p19s1234567z';
begin_tiles[3] = '19m19p19s1234567z';
roundBegin();
qiepai('2m');
moqieLiuju();
