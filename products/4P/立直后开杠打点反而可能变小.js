clearproject();

// 11m77888999p123s 摸 8p 开暗杠(雀魂规则下, 不影响听牌面就可以暗杠), 荣和 7p 直接少了一杯口, 纯全带幺九总共4番

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
    }
};

// 亲荣和, 立直, 一杯口, 纯全带幺九, 5番40符, 12000
tiles0 = '119m77888999p237s';
tiles1 = '222340567888m7p';
tiles2 = '2222333346666p';
tiles3 = '2233405677999s';
randompaishan('1s', '11z....');
roundbegin();
qiepai();
mingqiepai('9s');
moqieliqi('9m');
mingqiepai('7p');
hupai();

// 亲荣和, 立直nomi, 1番60符, 2900
tiles0 = '11m77888999p2237s';
tiles1 = '222340567888m7p';
tiles2 = '2222333346666p';
tiles3 = '2233405677999s';
randompaishan('1s8p', '1111z...9m');
roundbegin();
qiepai();
mingqiepai('9s');
moqieliqi('2s');
mingqiepai('9s');
mopai();
leimingpai();
normalmoqie();
mingqiepai('7p');
hupai();
