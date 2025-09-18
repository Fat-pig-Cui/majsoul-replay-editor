clearProject();

player_datas[0].nickname = '一姬-契约';
player_datas[1].nickname = '绮春歌';
player_datas[0].avatar_id = 400102;
player_datas[1].avatar_id = 400106;

setConfig({
    category: 1,
    meta: {mode_id: 0},
    mode: {
        mode: 21,
        detail_rule: {}
    }
});

begin_tiles[0] = '11112223334445z';
begin_tiles[1] = '1112340678999m';
randomPaishan('', '5m432z');
roundBegin();
comboMopai('1z');
comboMopai('2z');
zimingpai('3z', 'angang');
mopai();
zimingpai('4z', 'angang');
mopai();
qiepai();
hupai();
