loadproject();

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
            '_sigangbaopai': true,
        }
    }
};

// 情景1: 0: 大三元四杠子 包牌家1和2, 1: 大四喜, 包牌家: 0, 最后3放铳01
tiles0 = '1999m1555666777z';
tiles1 = '1m9s11223344567z';
tiles2 = '1666777888999p';
tiles3 = '1666777888999s';
paishan = randompaishan('9mDD1m', 'D432z');
roundbegin();
qiepai('1z');
for (let i = 0; i < 3; i++) {
    mingqiepai(i + 5 + 'z');
    mingpai();
    normalmoqie();
}
mingqiepai('9s');
normalmoqie();
mingpai();
normalmoqie(4);
hupai();

// 情景2: 三种役满出现在三家
tiles0 = '1112345678999m6z';
tiles1 = '366s1234556677z';
tiles2 = '12389s11223344z';
tiles3 = '1112223s888999s';
paishan = randompaishan('3s', '76s75z');
discardtiles = ['6z3s', '1234z', '1289s', '57z67s']
roundbegin();
qiepai(true);
for (let i = 0; i < 4; i++) {
    mingqiepai(2);
    mingpai();
    normalmoqie();
}
normalmoqie();
hupai();
