loadproject();

// 雀魂官方的逻辑是大小四喜同时满足的话只会取大四喜, 所以只有六倍役满而不是七倍

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
            'huansanzhang': true,
            'wanxiangxiuluo_mode': true,
        }
    }
};

tiles0 = 'b1112223344z899p';
tiles1 = 'b112340679m899s';
tiles2 = 'b112340679p344z';
tiles3 = 'b112340679s899m';
paishan = randompaishan('', '1z....');
roundbegin();
huansanzhang('899p', '899s', '344z', '899m', 1);
hupai(true);
