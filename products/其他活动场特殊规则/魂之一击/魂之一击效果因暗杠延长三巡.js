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
            hunzhiyiji_mode: true,
        }
    }
};

tiles0 = '22268m22288p222s7z';
tiles1 = '1111340678999m';
tiles2 = '1111330678999p';
tiles3 = '1111340678999s';
randomPaishan('.....2m', '77m....22223333z.7m2s2p');
roundBegin();
qiepai(true);
normalMoqie(5);
mopai();
comboMopai(3);
hupai();

