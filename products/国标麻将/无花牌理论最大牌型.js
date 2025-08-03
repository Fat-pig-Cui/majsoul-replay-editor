clearproject();

// 大三元, 四杠, 字一色, 四暗刻, 妙手回春, 杠上开花, 圈风刻, 门风刻, 不计花牌共324番

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
            _guobiao: true,
        }
    }
};

tiles0 = '11125555666777z';
tiles1 = '23455678m22334z';
tiles2 = '1112223334445m';
tiles3 = '5666777888999m';
randompaishan('', '12376z');
roundbegin();
combomopai(3);
qiepai();
mingqiepai();
normalmoqie(78);
mopai();
combomopai();
hupai();
