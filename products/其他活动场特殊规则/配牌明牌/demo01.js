clearProject();

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
            begin_open_mode: true,
        }
    }
};

begin_tiles[0] = '11122233344457z';
begin_tiles[1] = '111666m22556p88s';
begin_tiles[2] = '340m34p23334405s';
begin_tiles[3] = '11112p88s555777z';
randomPaishan('3s..0p', '44p2422s..52p');
roundBegin();
qiepai();
mingpai();
mopai();
comboMopai();
qiepai();
mingQiepai('6p');
moqieLiqi('2s');
normalMoqie(2);
mopai();
zimingpai();
hupai();
