loadproject();

// 从第 83 局到第 87 局

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
            '_guobiao': true,
            '_guobiao_no_8fanfu': true,
            '_guobiao_lianzhuang': true,
        }
    }
};

// 第1(83)局: 明暗杠
tiles0 = '2222333m123p67s55z';
tiles1 = '1112223334445z';
tiles2 = '111234478899p1z';
tiles3 = '1112225555888s';
paishan = randompaishan('3m8s');
roundbegin();
combomopai();
qiepai();
normalmoqie();
mingpai();
normalmoqie(2);
hupai();

// 第2(84)局: 天和
tiles0 = '222345m234p789s55z';
tiles1 = '1112223334445z';
tiles2 = '1112345678999p';
tiles3 = '1112345678999s';
paishan = randompaishan();
roundbegin();
hupai();

// 第3(85)局: 地和
tiles0 = '3m1112223334445z';
tiles1 = '22245m234p789s55z';
tiles2 = '1112345678999p';
tiles3 = '1112345678999s';
paishan = randompaishan();
roundbegin();
qiepai('3m');
hupai();

gotoju(0, 0, 3);

// 第4(86)局: 人和(自摸)
tiles0 = '11122233344456z';
tiles1 = '22245m234p789s55z';
tiles2 = '1112345678999p';
tiles3 = '1112345678999s';
paishan = randompaishan('3m');
roundbegin();
qiepai();
zimohu();

gotoju(0, 0, 4);
// 第5(87)局: 人和(点炮)
tiles0 = '11122233344456z';
tiles1 = '1112345678999p';
tiles2 = '22245m234p789s55z';
tiles3 = '1112345678999s';
paishan = randompaishan('3m');
roundbegin();
qiepai();
normalmoqie();
hupai();
