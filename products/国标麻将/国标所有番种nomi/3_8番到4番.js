loadproject();

// 从第 39 局到第 58 局

editdata.player_datas[0].nickname = "一姬-契约";
editdata.player_datas[1].nickname = "新年初诣";
editdata.player_datas[2].nickname = "一姬当千";
editdata.player_datas[3].nickname = "绮春歌";
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
            'init_point': 300000,
            '_guobiao': true,
            '_guobiao_no_8fanfu': true,
            '_guobiao_lianzhuang': true
        }
    }
};

// 第1(39)局: 花龙
tiles0 = "23m456p22789s1156z";
tiles1 = "3334456789999m";
tiles2 = "11123447889p11z";
tiles3 = "1111445555999s";
paishan = randompaishan("2s1m");
roundbegin();
qiepai();
normalmoqie();
mingqiepai();
normalmoqie();
hupai();

// 第2(40)局: 推不倒
tiles0 = "3344588p456s5567z";
tiles1 = "1334456789999m";
tiles2 = "11123447899p11z";
tiles3 = "1111222244999s";
paishan = randompaishan("8p2p");
roundbegin();
qiepai();
normalmoqie();
mingqiepai();
normalmoqie();
hupai();

// 第3(41)局: 三色三同顺
tiles0 = "234m234p2388s5567z";
tiles1 = "1334456789999m";
tiles2 = "11123447899p11z";
tiles3 = "1111222444999s";
paishan = randompaishan("8s4s");
roundbegin();
qiepai();
normalmoqie();
mingqiepai();
normalmoqie();
hupai();

// 第4(42)局: 三色三节高
tiles0 = "22m33p44567s44567z";
tiles1 = "1334456789999m";
tiles2 = "11123447899p11z";
tiles3 = "1111222555999s";
paishan = randompaishan("2m3p4s");
roundbegin();
qiepai();
normalmoqie();
for (let i = 0; i < 2; i++) {
    mingqiepai();
    normalmoqie();
}
hupai();

// 第5(43)局: 无番和
tiles0 = "2245m234p789s5567z";
tiles1 = "1334456789999m";
tiles2 = "11123447899p11z";
tiles3 = "1111222555999s";
paishan = randompaishan("2m3m");
roundbegin();
qiepai();
normalmoqie();
mingqiepai();
normalmoqie();
hupai();

// 第6(44)局: 妙手回春
tiles0 = "2245m567p789s5567z";
tiles1 = "1334456789999m";
tiles2 = "11112344449p66z";
tiles3 = "1111225555999s";
paishan = randompaishan("2m", "6m");
roundbegin();
qiepai();
normalmoqie();
mingqiepai(2);
normalmoqie(81);
zimohu();

// 第7(45)局: 海底捞月
tiles0 = "2245m567p789s5567z";
tiles1 = "1334456789999m";
tiles2 = "11112344449p66z";
tiles3 = "1111225555999s";
paishan = randompaishan("2m", "6m");
roundbegin();
qiepai();
normalmoqie();
mingqiepai();
normalmoqie(82);
hupai();

// 第8(46)局: 杠上开花, 明杠
tiles0 = "2245m567p789s5567z";
tiles1 = "1334456789999m";
tiles2 = "11112344449p66z";
tiles3 = "1111225555999s";
paishan = randompaishan("2m...2m", "6m");
roundbegin();
qiepai();
normalmoqie();
mingqiepai();
normalmoqie(3);
mopai();
combomopai();
hupai();

// 第9(47)局: 抢杠和
tiles0 = "2245m567p789s5567z";
tiles1 = "1334455789999m";
tiles2 = "266m11122344p67z";
tiles3 = "1111225555999s";
paishan = randompaishan("6m.6m");
roundbegin();
qiepai();
normalmoqie();
mingqiepai("2m");
mingqiepai();
normalmoqie();
mopai();
leimingpai();
hupai();

// ===========================

// 第10(48)局: 碰碰和
tiles0 = "2266m33p88s224567z";
tiles1 = "1334455789999m";
tiles2 = "256m11122344p67z";
tiles3 = "1111225555999s";
paishan = randompaishan("26m3p8s");
roundbegin();
qiepai();
normalmoqie();
for (let i = 0; i < 3; i++) {
    mingqiepai();
    normalmoqie();
}
hupai();

// 第11(49)局: 混一色
tiles0 = "1233456688m2245z";
tiles1 = "1112223555777m";
tiles2 = "11122344p11167z";
tiles3 = "1111225555999s";
paishan = randompaishan("8m6m");
roundbegin();
qiepai();
normalmoqie();
mingqiepai();
normalmoqie();
hupai();

// 第12(50)局: 三色三步高
tiles0 = "12388m34p345s2245z";
tiles1 = "1112223555777m";
tiles2 = "11122344p11167z";
tiles3 = "1111225559999s";
paishan = randompaishan("8m2p");
roundbegin();
qiepai();
normalmoqie();
mingqiepai();
normalmoqie();
hupai();

// 第13(51)局: 五门齐, 幺九刻
tiles0 = "123m33p345s225567z";
tiles1 = "1112223555777m";
tiles2 = "11122344p11167z";
tiles3 = "1111225559999s";
paishan = randompaishan("2z3p");
roundbegin();
qiepai();
normalmoqie();
mingqiepai();
normalmoqie();
hupai();

// 第14(52)局: 全求人
tiles0 = "2366m33p44s1z34567z";
tiles1 = "1112225557779m";
tiles2 = "11122344p11267z";
tiles3 = "1111225559999s";
paishan = randompaishan("..4m6m3p4s1z");
roundbegin();
qiepai();
normalmoqie(3);
for (let i = 0; i < 4; i++) {
    mingqiepai();
    normalmoqie();
}
hupai();

// 第15(53)局: 双暗杠
tiles0 = "3333444m55p67s112z";
tiles1 = "1112225557779m";
tiles2 = "11122344p11267z";
tiles3 = "1111225559999s";
paishan = randompaishan("5p8s", "4m");
roundbegin();
combomopai(2);
qiepai();
normalmoqie();
mingqiepai();
normalmoqie();
hupai();

// 第16(54)局: 双箭刻
tiles0 = "234m56p33s1235566z";
tiles1 = "1112225557779m";
tiles2 = "11122344p11267z";
tiles3 = "1111225559999s";
paishan = randompaishan("5z6z7p");
roundbegin();
qiepai("1z");
normalmoqie();
mingqiepai("2z");
normalmoqie();
mingqiepai("3z");
normalmoqie();
hupai();

// ===========================

// 第17(55)局: 全带幺, 喜相逢, 幺九刻
tiles0 = "123m789p23s112267z";
tiles1 = "1112225557779m";
tiles2 = "11122344p11267z";
tiles3 = "1112225559999s";
paishan = randompaishan("2z1s");
roundbegin();
qiepai();
normalmoqie();
mingqiepai();
normalmoqie();
hupai();

// 第18(56)局: 不求人
tiles0 = "22245m567p789s556z";
tiles1 = "1334456789999m";
tiles2 = "11112344449p66z";
tiles3 = "1111225555999s";
paishan = randompaishan("...3m");
roundbegin();
qiepai();
normalmoqie(3);
zimohu();

// 第19(57)局: 双明杠
tiles0 = "333444m55p678s112z";
tiles1 = "1112225557779m";
tiles2 = "11122344p11267z";
tiles3 = "1111225559999s";
paishan = randompaishan("3m4m5p");
roundbegin();
qiepai();
normalmoqie();
for (let i = 0; i < 2; i++) {
    mingpai();
    normalmoqie(2);
}
hupai();

// 第20(58)局: 和绝张
tiles0 = "2245m567p789s5567z";
tiles1 = "1334455789999m";
tiles2 = "266m11122344p67z";
tiles3 = "1111225555999s";
paishan = randompaishan("6m6m");
roundbegin();
qiepai();
normalmoqie();
mingqiepai("2m");
mingqiepai();
normalmoqie();
hupai();
