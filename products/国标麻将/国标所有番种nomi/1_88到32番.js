clearProject();

// 从第 1 局到第 18 局

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
            init_point: 300000,
            _guobiao: true,
            _guobiao_no_8fanfu: true,
            _guobiao_lianzhuang: true,
        }
    }
};

// 第1局: 大四喜, 混一色
begin_tiles[0] = '55s111223344567z';
begin_tiles[1] = '1112345678999m';
begin_tiles[2] = '1112345678999p';
begin_tiles[3] = '1112345678999s';
randomPaishan('234z');
roundBegin();
qiepai();
normalMoqie();
for (let i = 0; i < 2; i++) {
    mingQiepai();
    normalMoqie();
}
hupai();

// 第2局: 大三元, 缺一门
begin_tiles[0] = '123m55s125566777z';
begin_tiles[1] = '3334446688999m';
begin_tiles[2] = '1112345678999p';
begin_tiles[3] = '1112345678999s';
randomPaishan('56z');
roundBegin();
qiepai('1z');
normalMoqie();
mingQiepai('2z');
normalMoqie();
hupai();

// 第3局: 绿一色, 一般高
begin_tiles[0] = '2233446688s5667z';
begin_tiles[1] = '1133445678999m';
begin_tiles[2] = '1112345678999p';
begin_tiles[3] = '1112233455999s';
randomPaishan('8s6s');
roundBegin();
qiepai();
normalMoqie();
mingQiepai('5z');
normalMoqie();
hupai();

// 第4局: 九莲宝灯, 连六
begin_tiles[0] = '1112345678999m1z';
begin_tiles[1] = '377s1234556677z';
begin_tiles[2] = '23468s11223344z';
begin_tiles[3] = '122344s66788s57z';
randomPaishan('7m');
roundBegin();
qiepai();
normalMoqie();
hupai();

// 第5局: 四杠
begin_tiles[0] = '2222m555666p333s1z';
begin_tiles[1] = '1133445678999m';
begin_tiles[2] = '555m1112447p9s11z';
begin_tiles[3] = '1111445555999s';
randomPaishan('5p6p3s1z');
roundBegin();
comboMopai();
qiepai();
normalMoqie();
for (let i = 0; i < 3; i++) {
    mingpai();
    normalMoqie(2);
}
hupai();

// 第6局: 连七对
begin_tiles[0] = '1122334455667p1z';
begin_tiles[1] = '1133445678999m';
begin_tiles[2] = '11223447889p11z';
begin_tiles[3] = '1111445555999s';
randomPaishan('7p');
roundBegin();
qiepai();
normalMoqie();
hupai();

// 第7局: 十三幺
begin_tiles[0] = '19m19p19s12345777z';
begin_tiles[1] = '1133445678999m';
begin_tiles[2] = '11223447889p11z';
begin_tiles[3] = '1112445555999s';
randomPaishan('6z');
roundBegin();
qiepai();
normalMoqie();
hupai();

// ===========================

// 第8局: 清幺九
begin_tiles[0] = '1199m11999p11s123z';
begin_tiles[1] = '3334445666777m';
begin_tiles[2] = '12223447889p11z';
begin_tiles[3] = '1244555566999s';
randomPaishan('1m9m1p');
roundBegin();
qiepai();
normalMoqie();
for (let i = 0; i < 2; i++) {
    mingQiepai();
    normalMoqie();
}
hupai();

// 第9局: 小四喜, 混一色
begin_tiles[0] = '456s11223344456z';
begin_tiles[1] = '1112345678999m';
begin_tiles[2] = '1112345678999p';
begin_tiles[3] = '1112345678999s';
randomPaishan('23z');
roundBegin();
qiepai();
normalMoqie();
mingQiepai();
normalMoqie();
hupai();

// 第10局: 小三元, 缺一门
begin_tiles[0] = '123m234s12556677z';
begin_tiles[1] = '2223344488999m';
begin_tiles[2] = '1112345678999p';
begin_tiles[3] = '1112345678999s';
randomPaishan('56z');
roundBegin();
qiepai('1z');
normalMoqie();
mingQiepai('2z');
normalMoqie();
hupai();

// 第11局: 字一色, 双箭刻
begin_tiles[0] = '678m11223355666z';
begin_tiles[1] = '1133445678999m';
begin_tiles[2] = '1112345678999p';
begin_tiles[3] = '1112345678999s';
randomPaishan('235z');
roundBegin();
qiepai('6m');
normalMoqie();
mingQiepai('7m');
normalMoqie();
mingQiepai('8m');
normalMoqie();
hupai();

// 第12局: 四暗刻, 单钓将
begin_tiles[0] = '222m555666p777s12z';
begin_tiles[1] = '3333445678999m';
begin_tiles[2] = '1112344478999p';
begin_tiles[3] = '1112345668999s';
randomPaishan('1z');
roundBegin();
qiepai();
normalMoqie();
hupai();

// 第13局: 一色双龙会
begin_tiles[0] = '112233557789m12z';
begin_tiles[1] = '1122334455677m';
begin_tiles[2] = '1112344478999p';
begin_tiles[3] = '8m1112345888s22z';
randomPaishan('9m');
roundBegin();
qiepai();
mingQiepai('8m');
mingQiepai();
normalMoqie();
hupai();

// ===========================

// 第14局: 一色四同顺, 平和, 缺一门
begin_tiles[0] = '3333444455m99p12z';
begin_tiles[1] = '1111222288889m';
begin_tiles[2] = '1112344478899p';
begin_tiles[3] = '5m1112345888s22z';
randomPaishan('5m');
roundBegin();
qiepai();
mingQiepai('5m');
mingQiepai('34m');
normalMoqie();
hupai();

// 第15局: 一色四节高, 缺一门, 无字
begin_tiles[0] = '334455666m99p123z';
begin_tiles[1] = '1111222289999m';
begin_tiles[2] = '1112344478899p';
begin_tiles[3] = '1112345668999s';
randomPaishan('345m');
roundBegin();
qiepai();
normalMoqie();
for (let i = 0; i < 2; i++) {
    mingQiepai();
    normalMoqie();
}
hupai();

// ===========================

// 第16局: 一色四步高, 平和, 缺一门
begin_tiles[0] = '1233455678m99p12z';
begin_tiles[1] = '1112223344455m';
begin_tiles[2] = '1112344478899p';
begin_tiles[3] = '9m1112345888s22z';
randomPaishan('7m');
roundBegin();
qiepai();
mingQiepai('9m');
mingQiepai();
normalMoqie();
hupai();

// 第17局: 三杠
begin_tiles[0] = '2222m555666p23s11z';
begin_tiles[1] = '1133445678999m';
begin_tiles[2] = '555m11123447p11z';
begin_tiles[3] = '1111444777789s';
randomPaishan('5p6p4s');
roundBegin();
comboMopai();
qiepai();
normalMoqie();
for (let i = 0; i < 2; i++) {
    mingpai();
    normalMoqie(2);
}
hupai();

// 第18局: 混幺九
begin_tiles[0] = '11m99p11s22233567z';
begin_tiles[1] = '1334456789999m';
begin_tiles[2] = '11123447889p11z';
begin_tiles[3] = '2244445555999s';
randomPaishan('1s9p3z');
roundBegin();
qiepai();
normalMoqie();
for (let i = 0; i < 2; i++) {
    mingQiepai();
    normalMoqie();
}
hupai();
