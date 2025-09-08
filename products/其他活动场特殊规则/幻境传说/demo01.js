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
            field_spell_mode: 30504, // 炒作, 胜负手, 厄运沙漏
        }
    }
};

tiles0 = '22288m22288p222s1z';
tiles1 = '1111340678999m';
tiles2 = '1111340678999p';
tiles3 = '1111340678999s';
randomPaishan('...2m', '8m.....22223333z8p.2s2p');
roundBegin();
qiepai(true);
normalMoqie(3);
mopai();
comboMopai(3);
qiepai();
normalMoqie(62);
hupai();
