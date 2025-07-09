loadproject();

// 报菜名界面会见到所有 7*4 = 28 张字牌(四杠子18张+10张指示牌)

editdata.player_datas[0].nickname = '一姬-契约';
editdata.player_datas[1].nickname = '新年初诣';
editdata.player_datas[2].nickname = '一姬当千';
editdata.player_datas[3].nickname = '绮春歌';
editdata.player_datas[0].avatar_id = 400102;
editdata.player_datas[1].avatar_id = 400104;
editdata.player_datas[2].avatar_id = 400105;
editdata.player_datas[3].avatar_id = 400106;

editdata.config = {
    'category': 1,
    'meta': {'mode_id': 0},
    'mode': {
        'mode': 1,
        'detail_rule': {
            'init_point': 100000,
        }
    }
};

tiles0 = '9s1112223334447z';
tiles1 = '1112340678999m';
tiles2 = '1112340678999p';
tiles3 = '1112223345599s';
paishan = randompaishan('1z', '7565656567z7432z');
roundbegin();
qiepai('9s', true);
mingqiepai('4s');
mopai();
combomopai(4);
hupai();
