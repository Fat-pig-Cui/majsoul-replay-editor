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
            muyu_mode: true,
        }
    }
};

begin_tiles[0] = '222268m22288p222s';
begin_tiles[1] = '1111340678999m';
begin_tiles[2] = '1111330678999p';
begin_tiles[3] = '1111340678999s';
setMuyuSeats('1230');
randomPaishan('', '77m....22223333z7m3p2s2p');
roundBegin();
comboMopai(3);
qiepai();
mingQiepai('9p');
normalMoqie(61);
moqieLiqi();
normalMoqie(3);
zimoHu();
