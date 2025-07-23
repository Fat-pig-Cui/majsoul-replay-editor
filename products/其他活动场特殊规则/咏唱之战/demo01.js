clearproject();

player_datas[0].nickname = '一姬-契约';
player_datas[1].nickname = '新年初诣';
player_datas[2].nickname = '一姬当千';
player_datas[3].nickname = '绮春歌';
player_datas[0].avatar_id = 400102;
player_datas[1].avatar_id = 400104;
player_datas[2].avatar_id = 400105;
player_datas[3].avatar_id = 400106;

config = {
    'category': 1,
    'meta': {'mode_id': 0},
    'mode': {
        'mode': 1,
        'detail_rule': {
            'yongchang_mode': true,
        }
    }
};

tiles0 = '222268m22288p222s';
tiles1 = '1111340678999m';
tiles2 = '1111330678999p';
tiles3 = '1111340678999s';
paishan = randompaishan('', '77m....22223333z7m3p2s2p');
roundbegin();
combomopai(3);
qiepai();
mingqiepai('9p');
normalmoqie(61);
moqieliqi();
normalmoqie(3);
zimohu();
