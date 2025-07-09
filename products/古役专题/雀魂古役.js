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
            '_guyi_mode': true,
            'init_point': 200000,
        }
    }
};

// 第1局: 燕返
tiles0 = '234567m234567p67z';
tiles1 = '1112340678999m';
tiles2 = '1112340678999p';
tiles3 = '1112340678999s';
paishan = randompaishan('6z', '1z....');
roundbegin();
qiepai();
moqieliqi();
hupai();

// 第2局: 杠振
tiles0 = '234567m234567p67z';
tiles1 = '1112340678m222z';
tiles2 = '1112340678999p';
tiles3 = '1112340678999s';
paishan = randompaishan('2z', '1z.1z...6z');
roundbegin();
qiepai();
mopai();
combomopai();
qiepai();
hupai();

// 第3局: 十二落抬
tiles0 = '12m3377p99s234567z';
tiles1 = '2223455567888m';
tiles2 = '2223455567888p';
tiles3 = '2223455567888s';
paishan = randompaishan('..3m3p7p9s2z', '2z....');
roundbegin();
qiepai();
normalmoqie(3);
for (let i = 0; i < 4; i++) {
    mingqiepai();
    normalmoqie();
}
hupai();

// 第4局: 五门齐
tiles0 = '234m678p789s22667z';
tiles1 = '2223455567888m';
tiles2 = '2223455567888p';
tiles3 = '2223455567888s';
paishan = randompaishan('2z', '2z....');
roundbegin();
qiepai();
normalmoqie();
hupai();

// 第5局: 三连刻
tiles0 = '123m2223344p99s67z';
tiles1 = '2223455567888m';
tiles2 = '1113455567888p';
tiles3 = '2223455567888s';
paishan = randompaishan('34p', '2z....');
roundbegin();
qiepai();
normalmoqie();
mingqiepai();
normalmoqie();
hupai();

// 第6局: 一色三同顺
tiles0 = '123m22233444p99s7z';
tiles1 = '2223455567888m';
tiles2 = '1113455567888p';
tiles3 = '2223455567888s';
paishan = randompaishan('3p', '2z....');
roundbegin();
qiepai();
normalmoqie();
hupai();

// 第7局: 一筒摸月
tiles0 = '234m23p22s678s2267z';
tiles1 = '666777888999m1p';
tiles2 = '666777888999p1p';
tiles3 = '666777888999s1p';
paishan = randompaishan('2z', '1p.........2z....');
roundbegin();
qiepai();
normalmoqie();
mingqiepai();
normalmoqie(67);
zimohu();

// 第8局: 九筒捞鱼
tiles0 = '234m78p55s678s2227z';
tiles1 = '111222333444m6p';
tiles2 = '1112223336999p';
tiles3 = '111222333444s6p';
paishan = randompaishan('', '9p.........2z6p...');
roundbegin();
qiepai();
normalmoqie(69);
hupai();

// 第9局: 人和
tiles0 = '11122233344457z';
tiles1 = '234567m234567p7z';
tiles2 = '1112340678999p';
tiles3 = '1112340678999s';
paishan = randompaishan('', '2z....');
roundbegin();
qiepai();
hupai();

gotoju(0, 0, 9);

// 第10局: 大车轮
tiles0 = '2233445667788p7z';
tiles1 = '1112335778999m';
tiles2 = '1112335778999p';
tiles3 = '1112335778999s';
paishan = randompaishan('5p', '2z....');
roundbegin();
qiepai();
normalmoqie();
hupai();

// 第11局: 大竹林
tiles0 = '2233445667788s7z';
tiles1 = '1112335778999m';
tiles2 = '1112335778999p';
tiles3 = '1112335778999s';
paishan = randompaishan('5s', '2z....');
roundbegin();
qiepai();
normalmoqie();
hupai();

// 第12局: 大数邻
tiles0 = '2233445667788m7z';
tiles1 = '1112335778999m';
tiles2 = '1112335778999p';
tiles3 = '1112335778999s';
paishan = randompaishan('5p5m', '2z....');
roundbegin();
qiepai();
normalmoqie(2);
hupai();

// 第13局: 石上三年
tiles0 = '567789m234567p67z';
tiles1 = '1144m222333s999p';
tiles2 = '1144m222333444p';
tiles3 = '23m666777888p66z';
paishan = randompaishan('', '6z........22z....');
roundbegin();
qiepai(true);
normalmoqie(69);
hupai();

// 第14局: 大七星
tiles0 = '11223344556777z';
tiles1 = '1112340678999m';
tiles2 = '1112340678999p';
tiles3 = '1112340678999s';
paishan = randompaishan('6z', '2z....');
roundbegin();
qiepai();
normalmoqie();
hupai();
