loadproject();

// 从第 59 局到第 82 局

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

// 第1(59)局: 箭刻: 白
tiles0 = "2245m234p789s5567z";
tiles1 = "1114445557799m";
tiles2 = "11123447899p11z";
tiles3 = "1111222555999s";
paishan = randompaishan("5z3m");
roundbegin();
qiepai();
normalmoqie();
mingqiepai();
normalmoqie();
hupai();

// 第2(60)局: 箭刻: 发
tiles0 = "2245m234p789s5667z";
tiles1 = "1114445557799m";
tiles2 = "11123447899p11z";
tiles3 = "1111222555999s";
paishan = randompaishan("6z3m");
roundbegin();
qiepai();
normalmoqie();
mingqiepai("5z");
normalmoqie();
hupai();

// 第3(61)局: 箭刻: 中
tiles0 = "2245m234p789s5677z";
tiles1 = "1114445557799m";
tiles2 = "11123447899p11z";
tiles3 = "1111222555999s";
paishan = randompaishan("7z3m");
roundbegin();
qiepai("5z");
normalmoqie();
mingqiepai("6z");
normalmoqie();
hupai();

// 第4(62)局: 圈风刻
tiles0 = "1112255678999m1z";
tiles1 = "2245m234p789s113z";
tiles2 = "1112345678999p";
tiles3 = "1112345678999s";
paishan = randompaishan("3m");
roundbegin();
qiepai();
mingqiepai();
normalmoqie();
hupai();

gotoju(0, 0, 4);

// 第5(63)局: 门风刻
tiles0 = "1112255678999m2z";
tiles1 = "2245m234p789s223z";
tiles2 = "1112345678999p";
tiles3 = "1112345678999s";
paishan = randompaishan("3m");
roundbegin();
qiepai();
mingqiepai();
normalmoqie();
hupai();

gotoju(0, 0, 5);

// 第6(64)局: 门前清
tiles0 = "22245m234p789s556z";
tiles1 = "1114445557799m";
tiles2 = "11123447899p11z";
tiles3 = "1111222555999s";
paishan = randompaishan("3m");
roundbegin();
qiepai();
normalmoqie();
hupai();

// 第7(65)局: 平和
tiles0 = "2245m78p234789s67z";
tiles1 = "1334456789999m";
tiles2 = "11123447899p11z";
tiles3 = "6m1112345888s77z";
paishan = randompaishan("6p");
roundbegin();
qiepai();
mingqiepai("6m");
mingqiepai();
normalmoqie();
hupai();

// 第8(66)局: 四归一
tiles0 = "22234m55p567s1167z";
tiles1 = "3334445557799m";
tiles2 = "11123447899p11z";
tiles3 = "1111222555899s";
paishan = randompaishan("5p2m");
roundbegin();
qiepai();
normalmoqie();
mingqiepai();
normalmoqie();
hupai();

// 第9(67)局: 双同刻
tiles0 = "2245m222p789s1167z";
tiles1 = "1114445557799m";
tiles2 = "11123447899p11z";
tiles3 = "1111222555999s";
paishan = randompaishan("2m3m");
roundbegin();
qiepai();
normalmoqie();
mingqiepai();
normalmoqie();
hupai();

// 第10(68)局: 双暗刻
tiles0 = "22245m333p88s1167z";
tiles1 = "1114445557799m";
tiles2 = "11123447899p11z";
tiles3 = "1111222555999s";
paishan = randompaishan("8s3m");
roundbegin();
qiepai();
normalmoqie();
mingqiepai();
normalmoqie();
hupai();

// 第11(69)局: 暗杠
tiles0 = "222245m33p789s116z";
tiles1 = "1114445557799m";
tiles2 = "11123447899p11z";
tiles3 = "1111222555999s";
paishan = randompaishan("3p3m");
roundbegin();
combomopai();
qiepai();
normalmoqie();
mingqiepai();
normalmoqie();
hupai();

// 第12(70)局: 断幺
tiles0 = "2245m33p566778s67z";
tiles1 = "1114445557799m";
tiles2 = "11123447899p11z";
tiles3 = "1111222555999s";
paishan = randompaishan("3p3m");
roundbegin();
qiepai();
normalmoqie();
mingqiepai();
normalmoqie();
hupai();

// ===========================

// 第13(71)局: 一般高
tiles0 = "223344m55p78s1123z";
tiles1 = "1334456789999m";
tiles2 = "11123447899p11z";
tiles3 = "1111222555999s";
paishan = randompaishan("5p9s");
roundbegin();
qiepai();
normalmoqie();
mingqiepai();
normalmoqie();
hupai();

// 第14(72)局: 喜相逢
tiles0 = "234m23455p78s1123z";
tiles1 = "1334456789999m";
tiles2 = "11123447899p11z";
tiles3 = "1111222555999s";
paishan = randompaishan("5p9s");
roundbegin();
qiepai();
normalmoqie();
mingqiepai();
normalmoqie();
hupai();

// 第15(73)局: 连六
tiles0 = "234567m55p78s1123z";
tiles1 = "1334456789999m";
tiles2 = "11123447899p11z";
tiles3 = "1111222555999s";
paishan = randompaishan("5p9s");
roundbegin();
qiepai();
normalmoqie();
mingqiepai();
normalmoqie();
hupai();

// 第16(74)局: 老少副
tiles0 = "123789m55p78s1123z";
tiles1 = "1334456788999m";
tiles2 = "11123447899p11z";
tiles3 = "1111222555999s";
paishan = randompaishan("5p6s");
roundbegin();
qiepai();
normalmoqie();
mingqiepai();
normalmoqie();
hupai();

// 第17(75)局: 幺九刻
tiles0 = "234789m55p78s2234z";
tiles1 = "1334456788999m";
tiles2 = "11123447899p11z";
tiles3 = "1111222555999s";
paishan = randompaishan("2z6s");
roundbegin();
qiepai();
normalmoqie();
mingqiepai();
normalmoqie();
hupai();

// 第18(76)局: 明杠
tiles0 = "222789m555p78s224z";
tiles1 = "1114445557799m";
tiles2 = "11123447899p11z";
tiles3 = "1111222555999s";
paishan = randompaishan("2m6s");
roundbegin();
qiepai();
normalmoqie();
mingpai();
normalmoqie(2);
hupai();

// 第19(77)局: 缺一门
tiles0 = "22789m55578s2234z";
tiles1 = "1114445557799m";
tiles2 = "11123447899p11z";
tiles3 = "1111222666999s";
paishan = randompaishan("2m6s");
roundbegin();
qiepai();
normalmoqie();
mingqiepai();
normalmoqie();
hupai();

// 第20(78)局: 无字
tiles0 = "22789m555p5578s34z";
tiles1 = "1114445557799m";
tiles2 = "11123447899p11z";
tiles3 = "1111222666999s";
paishan = randompaishan("2m6s");
roundbegin();
qiepai();
normalmoqie();
mingqiepai();
normalmoqie();
hupai();

// 第21(79)局: 边张
tiles0 = "12888m55p678s1134z";
tiles1 = "1114445557799m";
tiles2 = "11123447899p11z";
tiles3 = "1111222666999s";
paishan = randompaishan("5p3m");
roundbegin();
qiepai();
normalmoqie();
mingqiepai();
normalmoqie();
hupai();

// 第22(80)局: 坎张
tiles0 = "24789m55p678s1134z";
tiles1 = "1114445557799m";
tiles2 = "11123447899p11z";
tiles3 = "1111222666999s";
paishan = randompaishan("5p3m");
roundbegin();
qiepai();
normalmoqie();
mingqiepai();
normalmoqie();
hupai();

// 第23(81)局: 单钓将
tiles0 = "234789m55p678s134z";
tiles1 = "1334456788999m";
tiles2 = "11123447899p11z";
tiles3 = "1111222666999s";
paishan = randompaishan("5p1z");
roundbegin();
qiepai();
normalmoqie();
mingqiepai();
normalmoqie();
hupai();

// 第24(82)局: 自摸
tiles0 = "789m55p56778s1123z";
tiles1 = "1334456788999m";
tiles2 = "11123447899p11z";
tiles3 = "11123458889s22z";
paishan = randompaishan("5p6s");
roundbegin();
qiepai();
normalmoqie();
mingqiepai(2);
zimohu();
