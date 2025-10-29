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

begin_tiles[0] = '2222333444555p8s';
begin_tiles[1] = '5566667777888s';
begin_tiles[2] = '2223333444405s';
randomPaishan('Y'.repeat(50), 'Y043p');
roundBegin();
comboMopai(4);
qiepai();
moqieLiuju();
