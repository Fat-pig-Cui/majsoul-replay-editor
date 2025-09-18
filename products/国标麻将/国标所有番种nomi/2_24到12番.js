clearProject();

// 从第 19 局到第 38 局

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
            init_point: 300000,
            _guobiao: true,
            _guobiao_no_8fanfu: true,
            _guobiao_lianzhuang: true,
        }
    }
});

// 第1(19)局: 七对
begin_tiles[0] = '11m2299p2288s5567z';
begin_tiles[1] = '1334456789999m';
begin_tiles[2] = '11123447889p11z';
begin_tiles[3] = '1111445555999s';
randomPaishan('6z');
roundBegin();
qiepai();
normalMoqie();
hupai();

// 第2(20)局: 七星不靠
begin_tiles[0] = '47m28p36s12345677z';
begin_tiles[1] = '3334456789999m';
begin_tiles[2] = '11123447889p11z';
begin_tiles[3] = '1111445555999s';
randomPaishan('1m');
roundBegin();
qiepai();
normalMoqie();
hupai();

// 第3(21)局: 全双刻
begin_tiles[0] = '2244m66888p22s123z';
begin_tiles[1] = '1113336789999m';
begin_tiles[2] = '11123447899p11z';
begin_tiles[3] = '1111445555999s';
randomPaishan('24m6p');
roundBegin();
qiepai();
normalMoqie();
for (let i = 0; i < 2; i++) {
    mingQiepai();
    normalMoqie();
}
hupai();

// 第4(22)局: 清一色
begin_tiles[0] = '222334566789m67z';
begin_tiles[1] = '1112223334445z';
begin_tiles[2] = '1112344789p555z';
begin_tiles[3] = '1111445555999s';
randomPaishan('3m9m');
roundBegin();
qiepai();
normalMoqie();
mingQiepai();
normalMoqie();
hupai();

// 第5(23)局: 一色三同顺, 缺一门
begin_tiles[0] = '1122233m456p1123z';
begin_tiles[1] = '1144555666777z';
begin_tiles[2] = '111234478999p5z';
begin_tiles[3] = '3m1112345888s33z';
randomPaishan('1m');
roundBegin();
qiepai();
mingQiepai('3m');
mingQiepai('12m');
normalMoqie();
hupai();

// 第6(24)局: 一色三节高, 缺一门
begin_tiles[0] = '2223344m456p5567z';
begin_tiles[1] = '1112223334445z';
begin_tiles[2] = '111234478999p5z';
begin_tiles[3] = '1111445555999s';
randomPaishan('3m4m');
roundBegin();
qiepai();
normalMoqie();
mingQiepai();
normalMoqie();
hupai();

// 第7(25)局: 全大, 幺九刻
begin_tiles[0] = '77789m77788p78s12z';
begin_tiles[1] = '1112223334445z';
begin_tiles[2] = '111234455999p5z';
begin_tiles[3] = '1111445555888s';
randomPaishan('8p9s');
roundBegin();
qiepai();
normalMoqie();
mingQiepai();
normalMoqie();
hupai();

// 第8(26)局: 全中
begin_tiles[0] = '44456m44455p66s12z';
begin_tiles[1] = '1112223334445z';
begin_tiles[2] = '111233466999p5z';
begin_tiles[3] = '1111445555888s';
randomPaishan('5p6s');
roundBegin();
qiepai();
normalMoqie();
mingQiepai();
normalMoqie();
hupai();

// 第9(27)局: 全小, 一般高
begin_tiles[0] = '2233m112233p11s12z';
begin_tiles[1] = '1112223334445z';
begin_tiles[2] = '112233466999p5z';
begin_tiles[3] = '2224445555888s';
randomPaishan('23m');
roundBegin();
qiepai();
normalMoqie();
mingQiepai();
normalMoqie();
hupai();

// ===========================

// 第10(28)局: 清龙, 缺一门
begin_tiles[0] = '12345678m44p1124z';
begin_tiles[1] = '1133555666777z';
begin_tiles[2] = '111123466999p5z';
begin_tiles[3] = '9m1112345888s33z';
randomPaishan('4p9m');
roundBegin();
qiepai();
normalMoqie();
mingQiepai();
normalMoqie();
hupai();

// 第11(29)局: 三色双龙会
begin_tiles[0] = '12378m12378p55s12z';
begin_tiles[1] = '1113334445666z';
begin_tiles[2] = '111223466999p5z';
begin_tiles[3] = '9m1112345888s22z';
randomPaishan('9p');
roundBegin();
qiepai();
mingQiepai('9m');
mingQiepai();
normalMoqie();
hupai();

// 第12(30)局: 一色三步高, 缺一门
begin_tiles[0] = '12334556m44p1123z';
begin_tiles[1] = '1144555666777z';
begin_tiles[2] = '111223466999p5z';
begin_tiles[3] = '7m1112345888s33z';
randomPaishan('4p7m');
roundBegin();
qiepai();
normalMoqie();
mingQiepai();
normalMoqie();
hupai();

// 第13(31)局: 全带五
begin_tiles[0] = '345567m55p4555s12z';
begin_tiles[1] = '1112223334445z';
begin_tiles[2] = '111223466999p5z';
begin_tiles[3] = '2222444666888s';
randomPaishan('5p6s');
roundBegin();
qiepai();
normalMoqie();
mingQiepai();
normalMoqie();
hupai();

// 第14(32)局: 三同刻
begin_tiles[0] = '22789m22p222s4456z';
begin_tiles[1] = '1112223334555z';
begin_tiles[2] = '1112334669999p';
begin_tiles[3] = '3334446666888s';
randomPaishan('2m2p');
roundBegin();
qiepai();
normalMoqie();
mingQiepai();
normalMoqie();
hupai();

// 第15(33)局: 三暗刻, 无字
begin_tiles[0] = '222378m333p555s12z';
begin_tiles[1] = '1113334555666z';
begin_tiles[2] = '1112234669999p';
begin_tiles[3] = '9m1112345888s22z';
randomPaishan('3m');
roundBegin();
qiepai();
mingQiepai('9m');
mingQiepai();
normalMoqie();
hupai();

// ===========================

// 第16(34)局: 全不靠
begin_tiles[0] = '147m258p39s234566z';
begin_tiles[1] = '1112223334555z';
begin_tiles[2] = '1112234669999p';
begin_tiles[3] = '3334446666888s';
randomPaishan('7z');
roundBegin();
qiepai();
normalMoqie();
hupai();

// 第17(35)局: 组合龙
begin_tiles[0] = '147m258p2239s5567z';
begin_tiles[1] = '1112223334445z';
begin_tiles[2] = '1112234669999p';
begin_tiles[3] = '3334446668888s';
randomPaishan('2s6s');
roundBegin();
qiepai();
normalMoqie();
mingQiepai();
normalMoqie();
hupai();

// 第18(36)局: 大于五
begin_tiles[0] = '666789m77p6799s12z';
begin_tiles[1] = '1112223334445z';
begin_tiles[2] = '1112234669999p';
begin_tiles[3] = '3334444666888s';
randomPaishan('7p8s');
roundBegin();
qiepai();
normalMoqie();
mingQiepai();
normalMoqie();
hupai();

// 第19(37)局: 小于五
begin_tiles[0] = '123444m33p1134s12z';
begin_tiles[1] = '1112223334445z';
begin_tiles[2] = '1112234669999p';
begin_tiles[3] = '3334446666888s';
randomPaishan('3p2s');
roundBegin();
qiepai();
normalMoqie();
mingQiepai();
normalMoqie();
hupai();

// 第20(38)局: 三风刻, 缺一门
begin_tiles[0] = '234m22p223344456z';
begin_tiles[1] = '1112223334445m';
begin_tiles[2] = '1112234669999p';
begin_tiles[3] = '3334446666888s';
randomPaishan('23z');
roundBegin();
qiepai();
normalMoqie();
mingQiepai();
normalMoqie();
hupai();
