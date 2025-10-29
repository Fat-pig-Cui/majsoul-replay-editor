clearProject();

player_datas[0].nickname = '一姬-契约';
player_datas[1].nickname = '新年初诣';
player_datas[2].nickname = '一姬当千';
player_datas[3].nickname = '绮春歌';
player_datas[0].avatar_id = 400102;
player_datas[1].avatar_id = 400104;
player_datas[2].avatar_id = 400105;
player_datas[3].avatar_id = 400106;

setConfig({
    category: 1,
    meta: {mode_id: 0},
    mode: {
        mode: 1,
        detail_rule: {
            guyi_mode: true,
            init_point: 200000,
        }
    }
});

// 第1局: 燕返
begin_tiles[0] = '234567m234567p67z';
begin_tiles[1] = '1112340678999m';
begin_tiles[2] = '1112340678999p';
begin_tiles[3] = '1112340678999s';
randomPaishan('6z', '1z....');
roundBegin();
qiepai();
moqieLiqi();
hupai();

// 第2局: 杠振
begin_tiles[0] = '234567m234567p67z';
begin_tiles[1] = '1112340678m222z';
begin_tiles[2] = '1112340678999p';
begin_tiles[3] = '1112340678999s';
randomPaishan('2z', '1z.1z...6z');
roundBegin();
qiepai();
mopai();
comboMopai();
qiepai();
hupai();

// 第3局: 十二落抬
begin_tiles[0] = '12m3377p99s234567z';
begin_tiles[1] = '2223455567888m';
begin_tiles[2] = '2223455567888p';
begin_tiles[3] = '2223455567888s';
randomPaishan('..3m3p7p9s2z', '2z....');
roundBegin();
qiepai();
normalMoqie(3);
for (let i = 0; i < 4; i++) {
    mingQiepai();
    normalMoqie();
}
hupai();

// 第4局: 五门齐
begin_tiles[0] = '234m678p789s22667z';
begin_tiles[1] = '2223455567888m';
begin_tiles[2] = '2223455567888p';
begin_tiles[3] = '2223455567888s';
randomPaishan('2z', '2z....');
roundBegin();
qiepai();
normalMoqie();
hupai();

// 第5局: 三连刻
begin_tiles[0] = '123m2223344p99s67z';
begin_tiles[1] = '2223455567888m';
begin_tiles[2] = '1113455567888p';
begin_tiles[3] = '2223455567888s';
randomPaishan('34p', '2z....');
roundBegin();
qiepai();
normalMoqie();
mingQiepai();
normalMoqie();
hupai();

// 第6局: 一色三同顺
begin_tiles[0] = '123m22233444p99s7z';
begin_tiles[1] = '2223455567888m';
begin_tiles[2] = '1113455567888p';
begin_tiles[3] = '2223455567888s';
randomPaishan('3p', '2z....');
roundBegin();
qiepai();
normalMoqie();
hupai();

// 第7局: 一筒摸月
begin_tiles[0] = '234m23p22s678s2267z';
begin_tiles[1] = '666777888999m1p';
begin_tiles[2] = '666777888999p1p';
begin_tiles[3] = '666777888999s1p';
randomPaishan('2z', '1p.........2z....');
roundBegin();
qiepai();
normalMoqie();
mingQiepai();
normalMoqie(67);
zimoHu();

// 第8局: 九筒捞鱼
begin_tiles[0] = '234m78p55s678s2227z';
begin_tiles[1] = '111222333444m6p';
begin_tiles[2] = '1112223336999p';
begin_tiles[3] = '111222333444s6p';
randomPaishan('', '9p.........2z6p...');
roundBegin();
qiepai();
normalMoqie(69);
hupai();

// 第9局: 人和
begin_tiles[0] = '11122233344457z';
begin_tiles[1] = '234567m234567p7z';
begin_tiles[2] = '1112340678999p';
begin_tiles[3] = '1112340678999s';
randomPaishan('', '2z....');
roundBegin();
qiepai();
hupai();

setRound(0, 0, 9);

// 第10局: 大车轮
begin_tiles[0] = '2233445667788p7z';
begin_tiles[1] = '1112335778999m';
begin_tiles[2] = '1112335778999p';
begin_tiles[3] = '1112335778999s';
randomPaishan('5p', '2z....');
roundBegin();
qiepai();
normalMoqie();
hupai();

// 第11局: 大竹林
begin_tiles[0] = '2233445667788s7z';
begin_tiles[1] = '1112335778999m';
begin_tiles[2] = '1112335778999p';
begin_tiles[3] = '1112335778999s';
randomPaishan('5s', '2z....');
roundBegin();
qiepai();
normalMoqie();
hupai();

// 第12局: 大数邻
begin_tiles[0] = '2233445667788m7z';
begin_tiles[1] = '1112335778999m';
begin_tiles[2] = '1112335778999p';
begin_tiles[3] = '1112335778999s';
randomPaishan('5p5m', '2z....');
roundBegin();
qiepai();
normalMoqie(2);
hupai();

// 第13局: 石上三年
begin_tiles[0] = '567789m234567p67z';
begin_tiles[1] = '1144m222333s999p';
begin_tiles[2] = '1144m222333444p';
begin_tiles[3] = '23m666777888p66z';
randomPaishan('', '6z........22z....');
roundBegin();
qiepai(true);
normalMoqie(69);
hupai();

// 第14局: 大七星
begin_tiles[0] = '11223344556777z';
begin_tiles[1] = '1112340678999m';
begin_tiles[2] = '1112340678999p';
begin_tiles[3] = '1112340678999s';
randomPaishan('6z', '2z....');
roundBegin();
qiepai();
normalMoqie();
hupai();
