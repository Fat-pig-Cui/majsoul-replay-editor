clearProject();

// 从第 59 局到第 82 局

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

// 第1(59)局: 箭刻: 白
begin_tiles[0] = '2245m234p789s5567z';
begin_tiles[1] = '1114445557799m';
begin_tiles[2] = '11123447899p11z';
begin_tiles[3] = '1111222555999s';
randomPaishan('5z3m');
roundBegin();
qiepai();
normalMoqie();
mingQiepai();
normalMoqie();
hupai();

// 第2(60)局: 箭刻: 发
begin_tiles[0] = '2245m234p789s5667z';
begin_tiles[1] = '1114445557799m';
begin_tiles[2] = '11123447899p11z';
begin_tiles[3] = '1111222555999s';
randomPaishan('6z3m');
roundBegin();
qiepai();
normalMoqie();
mingQiepai('5z');
normalMoqie();
hupai();

// 第3(61)局: 箭刻: 中
begin_tiles[0] = '2245m234p789s5677z';
begin_tiles[1] = '1114445557799m';
begin_tiles[2] = '11123447899p11z';
begin_tiles[3] = '1111222555999s';
randomPaishan('7z3m');
roundBegin();
qiepai('5z');
normalMoqie();
mingQiepai('6z');
normalMoqie();
hupai();

// 第4(62)局: 圈风刻
begin_tiles[0] = '1112255678999m1z';
begin_tiles[1] = '2245m234p789s113z';
begin_tiles[2] = '1112345678999p';
begin_tiles[3] = '1112345678999s';
randomPaishan('3m');
roundBegin();
qiepai();
mingQiepai();
normalMoqie();
hupai();

setRound(0, 0, 4);

// 第5(63)局: 门风刻
begin_tiles[0] = '1112255678999m2z';
begin_tiles[1] = '2245m234p789s223z';
begin_tiles[2] = '1112345678999p';
begin_tiles[3] = '1112345678999s';
randomPaishan('3m');
roundBegin();
qiepai();
mingQiepai();
normalMoqie();
hupai();

setRound(0, 0, 5);

// 第6(64)局: 门前清
begin_tiles[0] = '22245m234p789s556z';
begin_tiles[1] = '1114445557799m';
begin_tiles[2] = '11123447899p11z';
begin_tiles[3] = '1111222555999s';
randomPaishan('3m');
roundBegin();
qiepai();
normalMoqie();
hupai();

// 第7(65)局: 平和
begin_tiles[0] = '2245m78p234789s67z';
begin_tiles[1] = '1334456789999m';
begin_tiles[2] = '11123447899p11z';
begin_tiles[3] = '6m1112345888s77z';
randomPaishan('6p');
roundBegin();
qiepai();
mingQiepai('6m');
mingQiepai();
normalMoqie();
hupai();

// 第8(66)局: 四归一
begin_tiles[0] = '22234m55p567s1167z';
begin_tiles[1] = '3334445557799m';
begin_tiles[2] = '11123447899p11z';
begin_tiles[3] = '1111222555899s';
randomPaishan('5p2m');
roundBegin();
qiepai();
normalMoqie();
mingQiepai();
normalMoqie();
hupai();

// 第9(67)局: 双同刻
begin_tiles[0] = '2245m222p789s1167z';
begin_tiles[1] = '1114445557799m';
begin_tiles[2] = '11123447899p11z';
begin_tiles[3] = '1111222555999s';
randomPaishan('2m3m');
roundBegin();
qiepai();
normalMoqie();
mingQiepai();
normalMoqie();
hupai();

// 第10(68)局: 双暗刻
begin_tiles[0] = '22245m333p88s1167z';
begin_tiles[1] = '1114445557799m';
begin_tiles[2] = '11123447899p11z';
begin_tiles[3] = '1111222555999s';
randomPaishan('8s3m');
roundBegin();
qiepai();
normalMoqie();
mingQiepai();
normalMoqie();
hupai();

// 第11(69)局: 暗杠
begin_tiles[0] = '222245m33p678s116z';
begin_tiles[1] = '1114446667799m';
begin_tiles[2] = '33367799m113p11z';
begin_tiles[3] = '1112225559999s';
randomPaishan('3p3m');
roundBegin();
comboMopai();
qiepai();
normalMoqie();
mingQiepai();
normalMoqie();
hupai();

// 第12(70)局: 断幺
begin_tiles[0] = '2245m33p566778s67z';
begin_tiles[1] = '1114445557799m';
begin_tiles[2] = '11123447899p11z';
begin_tiles[3] = '1111222555999s';
randomPaishan('3p3m');
roundBegin();
qiepai();
normalMoqie();
mingQiepai();
normalMoqie();
hupai();

// ===========================

// 第13(71)局: 一般高
begin_tiles[0] = '223344m55p78s1123z';
begin_tiles[1] = '1334456789999m';
begin_tiles[2] = '11123447899p11z';
begin_tiles[3] = '1111222555999s';
randomPaishan('5p9s');
roundBegin();
qiepai();
normalMoqie();
mingQiepai();
normalMoqie();
hupai();

// 第14(72)局: 喜相逢
begin_tiles[0] = '234m23455p78s1123z';
begin_tiles[1] = '1334456789999m';
begin_tiles[2] = '11123447899p11z';
begin_tiles[3] = '1111222555999s';
randomPaishan('5p9s');
roundBegin();
qiepai();
normalMoqie();
mingQiepai();
normalMoqie();
hupai();

// 第15(73)局: 连六
begin_tiles[0] = '234567m55p78s1123z';
begin_tiles[1] = '1334456789999m';
begin_tiles[2] = '11123447899p11z';
begin_tiles[3] = '1111222555999s';
randomPaishan('5p9s');
roundBegin();
qiepai();
normalMoqie();
mingQiepai();
normalMoqie();
hupai();

// 第16(74)局: 老少副
begin_tiles[0] = '123789m55p78s1123z';
begin_tiles[1] = '1334456788999m';
begin_tiles[2] = '11123447899p11z';
begin_tiles[3] = '1111222555999s';
randomPaishan('5p6s');
roundBegin();
qiepai();
normalMoqie();
mingQiepai();
normalMoqie();
hupai();

// 第17(75)局: 幺九刻
begin_tiles[0] = '234789m55p78s2234z';
begin_tiles[1] = '1334456788999m';
begin_tiles[2] = '11123447899p11z';
begin_tiles[3] = '1111222555999s';
randomPaishan('2z6s');
roundBegin();
qiepai();
normalMoqie();
mingQiepai();
normalMoqie();
hupai();

// 第18(76)局: 明杠
begin_tiles[0] = '222789m555p78s224z';
begin_tiles[1] = '1114445557799m';
begin_tiles[2] = '79m111235899p11z';
begin_tiles[3] = '1112226669999s';
randomPaishan('2m6s');
roundBegin();
qiepai();
normalMoqie();
mingpai();
normalMoqie(2);
hupai();

// 第19(77)局: 缺一门
begin_tiles[0] = '22789m55578s2234z';
begin_tiles[1] = '1114445557799m';
begin_tiles[2] = '11123447899p11z';
begin_tiles[3] = '1111222666999s';
randomPaishan('2m6s');
roundBegin();
qiepai();
normalMoqie();
mingQiepai();
normalMoqie();
hupai();

// 第20(78)局: 无字
begin_tiles[0] = '22789m555p5578s34z';
begin_tiles[1] = '1114445557799m';
begin_tiles[2] = '11123447899p11z';
begin_tiles[3] = '1111222666999s';
randomPaishan('2m6s');
roundBegin();
qiepai();
normalMoqie();
mingQiepai();
normalMoqie();
hupai();

// 第21(79)局: 边张
begin_tiles[0] = '12888m55p678s1134z';
begin_tiles[1] = '1114445557799m';
begin_tiles[2] = '11123447899p11z';
begin_tiles[3] = '1111222666999s';
randomPaishan('5p3m');
roundBegin();
qiepai();
normalMoqie();
mingQiepai();
normalMoqie();
hupai();

// 第22(80)局: 坎张
begin_tiles[0] = '24789m55p678s1134z';
begin_tiles[1] = '1114445557799m';
begin_tiles[2] = '11123447899p11z';
begin_tiles[3] = '1111222666999s';
randomPaishan('5p3m');
roundBegin();
qiepai();
normalMoqie();
mingQiepai();
normalMoqie();
hupai();

// 第23(81)局: 单钓将
begin_tiles[0] = '234789m55p678s134z';
begin_tiles[1] = '1334456788999m';
begin_tiles[2] = '11123447899p11z';
begin_tiles[3] = '1111222666999s';
randomPaishan('5p1z');
roundBegin();
qiepai();
normalMoqie();
mingQiepai();
normalMoqie();
hupai();

// 第24(82)局: 自摸
begin_tiles[0] = '789m55p45667s1123z';
begin_tiles[1] = '1334456788999m';
begin_tiles[2] = '11123447899p11z';
begin_tiles[3] = '11123458889s22z';
randomPaishan('5p5s');
roundBegin();
qiepai();
normalMoqie();
mingQiepai(2);
zimoHu();
