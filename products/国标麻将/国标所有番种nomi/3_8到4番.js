clearProject();

// 从第 39 局到第 58 局

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

// 第1(39)局: 花龙
begin_tiles[0] = '23m456p22789s1156z';
begin_tiles[1] = '3334456789999m';
begin_tiles[2] = '11123447889p11z';
begin_tiles[3] = '1111445555999s';
randomPaishan('2s1m');
roundBegin();
qiepai();
normalMoqie();
mingQiepai();
normalMoqie();
hupai();

// 第2(40)局: 推不倒
begin_tiles[0] = '3344588p456s5567z';
begin_tiles[1] = '1334456789999m';
begin_tiles[2] = '11123447899p11z';
begin_tiles[3] = '1111222244999s';
randomPaishan('8p2p');
roundBegin();
qiepai();
normalMoqie();
mingQiepai();
normalMoqie();
hupai();

// 第3(41)局: 三色三同顺
begin_tiles[0] = '234m234p2388s5567z';
begin_tiles[1] = '1334456789999m';
begin_tiles[2] = '11123447899p11z';
begin_tiles[3] = '1111222444999s';
randomPaishan('8s4s');
roundBegin();
qiepai();
normalMoqie();
mingQiepai();
normalMoqie();
hupai();

// 第4(42)局: 三色三节高
begin_tiles[0] = '222m33p44567s4456z';
begin_tiles[1] = '1334456789999m';
begin_tiles[2] = '11123447899p11z';
begin_tiles[3] = '1111222555999s';
randomPaishan('3p4s');
roundBegin();
qiepai();
normalMoqie();
mingQiepai();
normalMoqie();
hupai();

// 第5(43)局: 无番和
begin_tiles[0] = '234m2245p789s5567z';
begin_tiles[1] = '1334456789999m';
begin_tiles[2] = '11123447899p11z';
begin_tiles[3] = '1111222555999s';
randomPaishan('23p');
roundBegin();
qiepai();
normalMoqie();
mingQiepai();
normalMoqie();
hupai();

// 第6(44)局: 妙手回春
begin_tiles[0] = '567m2245p789s5567z';
begin_tiles[1] = '1334456789999m';
begin_tiles[2] = '1111234469p166z';
begin_tiles[3] = '33366p25555999s';
randomPaishan('2p', '6p');
roundBegin();
qiepai();
normalMoqie();
mingQiepai(2);
normalMoqie(81);
zimoHu();

// 第7(45)局: 海底捞月
begin_tiles[0] = '567m2245p789s5567z';
begin_tiles[1] = '1334456789999m';
begin_tiles[2] = '11112344469p66z';
begin_tiles[3] = '33366p25555999s';
randomPaishan('2p', '6p');
roundBegin();
qiepai();
normalMoqie();
mingQiepai();
normalMoqie(82);
hupai();

// 第8(46)局: 杠上开花, 明杠
begin_tiles[0] = '567m22245p789s113z';
begin_tiles[1] = '1334456789999m';
begin_tiles[2] = '11113444669p66z';
begin_tiles[3] = '11123458889s22z';
randomPaishan('2p', '6p');
roundBegin();
qiepai();
normalMoqie();
mingpai();
zimoHu();

// 第9(47)局: 抢杠和
begin_tiles[0] = '567m2245p789s5567z';
begin_tiles[1] = '1445566778899m';
begin_tiles[2] = '11122344m266p67z';
begin_tiles[3] = '3333p225555999s';
randomPaishan('6p.6p');
roundBegin();
qiepai();
normalMoqie();
mingQiepai('2p');
mingQiepai();
normalMoqie();
mopai();
zimingpai();
hupai();

// ===========================

// 第10(48)局: 碰碰和
begin_tiles[0] = '2266m33p888s22567z';
begin_tiles[1] = '1113334455599m';
begin_tiles[2] = '256m11122344p67z';
begin_tiles[3] = '1111225555999s';
randomPaishan('26m3p');
roundBegin();
qiepai();
normalMoqie();
for (let i = 0; i < 2; i++) {
    mingQiepai();
    normalMoqie();
}
hupai();

// 第11(49)局: 混一色
begin_tiles[0] = '2233466688s5667z';
begin_tiles[1] = '1112223355777m';
begin_tiles[2] = '11122344p11167z';
begin_tiles[3] = '1122334449999s';
randomPaishan('8s1s');
roundBegin();
qiepai();
normalMoqie();
mingQiepai('5z');
normalMoqie();
hupai();

// 第12(50)局: 三色三步高
begin_tiles[0] = '12388m34p345s2245z';
begin_tiles[1] = '1112223355777m';
begin_tiles[2] = '11122344p11167z';
begin_tiles[3] = '1111225559999s';
randomPaishan('8m2p');
roundBegin();
qiepai();
normalMoqie();
mingQiepai();
normalMoqie();
hupai();

// 第13(51)局: 五门齐, 幺九刻
begin_tiles[0] = '123m33p345s225567z';
begin_tiles[1] = '1112223555777m';
begin_tiles[2] = '11122344p11167z';
begin_tiles[3] = '1111225559999s';
randomPaishan('2z3p');
roundBegin();
qiepai();
normalMoqie();
mingQiepai();
normalMoqie();
hupai();

// 第14(52)局: 全求人
begin_tiles[0] = '2366m33p44s1z34567z';
begin_tiles[1] = '1112225557799m';
begin_tiles[2] = '11122344p11267z';
begin_tiles[3] = '4m1112345888s77z';
randomPaishan('6m3p4s1z');
roundBegin();
qiepai();
mingQiepai('4m');
for (let i = 0; i < 4; i++) {
    mingQiepai();
    normalMoqie();
}
hupai();

// 第15(53)局: 双暗杠
begin_tiles[0] = '3333444m55p67s112z';
begin_tiles[1] = '1116677889999m';
begin_tiles[2] = '166m1112345p117z';
begin_tiles[3] = '1112225555888s';
randomPaishan('5p8s', '4m');
roundBegin();
comboMopai(2);
qiepai();
normalMoqie();
mingQiepai();
normalMoqie();
hupai();

// 第16(54)局: 双箭刻
begin_tiles[0] = '234m567p33s125566z';
begin_tiles[1] = '1112225557779m';
begin_tiles[2] = '11122344p11267z';
begin_tiles[3] = '1111225559999s';
randomPaishan('5z6z');
roundBegin();
qiepai('1z');
normalMoqie();
mingQiepai('2z');
normalMoqie();
hupai();

// ===========================

// 第17(55)局: 全带幺, 喜相逢, 幺九刻
begin_tiles[0] = '123m789p23s112267z';
begin_tiles[1] = '1112225557779m';
begin_tiles[2] = '11122344p11267z';
begin_tiles[3] = '1112225559999s';
randomPaishan('2z1s');
roundBegin();
qiepai();
normalMoqie();
mingQiepai();
normalMoqie();
hupai();

// 第18(56)局: 不求人
begin_tiles[0] = '22245m567p789s556z';
begin_tiles[1] = '1334456789999m';
begin_tiles[2] = '11112344449p77z';
begin_tiles[3] = '11123458889s66z';
randomPaishan('3m');
roundBegin();
qiepai();
mingQiepai();
zimoHu();

// 第19(57)局: 双明杠
begin_tiles[0] = '333444m55p678s223z';
begin_tiles[1] = '1116677889999m';
begin_tiles[2] = '166m1112345p227z';
begin_tiles[3] = '1112225559999s';
randomPaishan('3m4m5p');
roundBegin();
qiepai();
normalMoqie();
for (let i = 0; i < 2; i++) {
    mingpai();
    normalMoqie(2);
}
hupai();

// 第20(58)局: 和绝张
begin_tiles[0] = '567m45p33789s5567z';
begin_tiles[1] = '1334455789999m';
begin_tiles[2] = '11144455566p3s4z';
begin_tiles[3] = '1111225555999s';
randomPaishan('66p');
roundBegin();
qiepai();
normalMoqie();
mingQiepai('3s');
mingQiepai();
normalMoqie();
hupai();
