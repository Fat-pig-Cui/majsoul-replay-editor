clearProject();

player_datas[0].nickname = '宫永咲-契约';
player_datas[1].nickname = '宫永咲';
player_datas[2].nickname = '凛然花开';
player_datas[3].nickname = '兔耳派对';
player_datas[0].avatar_id = 403402;
player_datas[1].avatar_id = 403401;
player_datas[2].avatar_id = 403403;
player_datas[3].avatar_id = 403404;

player_datas[0].views = player_datas[1].views = player_datas[2].views = player_datas[3].views = [
    {slot: 0, item_id: 308003}, // 立直棒-墨西哥卷饼
    {slot: 1, item_id: 308001}, // 和牌-龙卷雷霆
    {slot: 2, item_id: 308002}, // 立直-花天月地
    {slot: 6, item_id: 308004}, // 桌布-赛间小憩
    {slot: 7, item_id: 308005}, // 牌背-艾托企鹅
];

config = {
    category: 1,
    meta: {mode_id: 0},
    mode: {
        mode: 1,
        detail_rule: {
            init_point: 200000,
        }
    }
};

// 第1局: 东亲, 东起 天和, 字一色, 四暗刻单骑, 大四喜      六倍役满
tiles0 = '11122233344477z';
tiles1 = '1112340678999m';
tiles2 = '1112340678999p';
tiles3 = '1112340678999s';
roundBegin();
hupai();

// 第2局: 东亲, 南起 地和, 清老头, 四暗刻     三倍役满
tiles0 = '2223455567888s1z';
tiles1 = '11999m999p11999s';
tiles2 = '2223455567888m';
tiles3 = '2223455567888p';
randomPaishan('1m');
roundBegin();
qiepai();
zimoHu();

// 第3局: 南亲, 东起 铳两家: 绿一色, 纯正九莲宝灯 (3s)    役满, 两倍役满
tiles1 = '2233344666888s6z';
tiles2 = '2223455567888p';
tiles3 = '1112340678999s';
tiles0 = '1112340678999m';
randomPaishan('11z2s');
roundBegin();
qiepai();
normalMoqie(2);
mopai();
qiepai(true);
hupai();

// 第4局: 南亲, 东起 铳三家: 大三元, 国士无双十三面, 小四喜 (1p)
tiles1 = '23p355s555666777z';
tiles2 = '19m19p19s1234567z';
tiles3 = '23p11122233344z';
tiles0 = '1112340678999m';
randomPaishan('33s1p');
roundBegin();
qiepai('3s');
normalMoqie(2);
mopai();
qiepai(true);
hupai();

// 第5局: 南亲, 东起 铳三家: 国士无双, 九莲宝灯, 四杠子 (1p, 四杠子家要副露)
tiles1 = '19m9p1129s1234567z';
tiles2 = '1123405678999p';
tiles3 = '1p222444666888s';
tiles0 = '1112340678999m';
randomPaishan('1p', '2p864s');
roundBegin();
qiepai('2s');
mingpai();
mopai();
comboMopai(3);
qiepai();
mopai();
qiepai(true);
hupai();

// 第6局: 南亲, 南起 铳 东起 字一色, 四暗刻单骑, 大四喜        五倍役满
tiles1 = '1112340678999m7z';
tiles2 = '1112340678999p';
tiles3 = '1112340678999s';
tiles0 = '1112223334447z';
roundBegin();
qiepai();
hupai();

// 第7局: 西亲, 南起 铳 东起 字一色, 四暗刻单骑, 小四喜        四倍役满
tiles2 = '1112340678999p7z';
tiles3 = '1112340678999s';
tiles0 = '1112223334555z';
tiles1 = '1112340678999m';
randomPaishan('774z');
roundBegin();
qiepai();
normalMoqie(3);
hupai();

// 第8局: 北亲, 北起 荣 东起, 报菜名 (60番)        累计役满
// 两立直, 河底捞鱼, 白, 中, 东, 连东, 三杠子, 对对和,
// 三暗刻, 小三元, 混老头, 混一色, 宝牌一大堆(20), 宝牌一大堆(20)
tiles3 = '1999p1115556677z';
tiles0 = '222205558888m6z';
tiles1 = '222205558888s3z';
tiles2 = '3333444467777s';
randomPaishan('...9p', '4444z8888p776251z');
roundBegin();
qiepai('1p', true);
normalMoqie(3);
mopai();
comboMopai(3);
qiepai();
normalMoqie(60);
mopai();
comboMopai();
qiepai();
hupai();

// 第9局: 北亲, 南起 荣 东起, 报菜名 (27番)
// 立直, 一发, 枪杠, 平和, 一杯口, 断幺九, 三色同顺, 宝牌7, 宝牌3, 宝牌9
// 340m34p33334450s, 枪 0p, dora 3s5s3m(2s4s2m), 3s3s3m(2s2s2m)
tiles3 = '11122233344457z';
tiles0 = '111666m22556p88s';
tiles1 = '340m34p23334405s';
tiles2 = '11112p88s555777z';
randomPaishan('3s..0p', '44p2422s..52p');
roundBegin();
qiepai();
mingpai();
mopai();
comboMopai();
qiepai();
mingQiepai('6p');
moqieLiqi('2s');
normalMoqie(2);
mopai();
zimingpai();
hupai();

// 第10局: (南场) 东亲, 南起 自摸, 报菜名 (33番)
// 双立直, 门前清自摸和, 二杯口, 纯全带幺九, 清一色, 宝牌8, 宝牌10
// 1111223378899p, 摸7p, dora 3p3p8p8p(2p2p7p7p), 6p7p1p1p(5p6p9p9p)
tiles0 = '11122233344457z';
tiles1 = '1111223378899p';
tiles2 = '1112340678999m';
tiles3 = '1112340678999s';
randomPaishan('6661z7p', '97976252p5632z');
roundBegin();
qiepai();
moqieLiqi();
normalMoqie(2);
mopai();
comboMopai(3);
qiepai();
zimoHu();

// 第11局: (南场) 南亲, 西起 自摸, 报菜名 (16番)
// 双立直, 海底摸月, 门前清自摸和, 七对子, 宝牌4, 宝牌6
// 11m22p344556677s 摸3s,  dora 1m1m2m(9m9m1m), 2p2p2p(1p1p1p)
tiles1 = '2222055588899m1z';
tiles2 = '11m22p344556677s';
tiles3 = '1333305558888p';
tiles0 = '2222338889999s';
randomPaishan('1z', '3s......7s1p4s1p4s1p..9m.');
roundBegin();
qiepai();
moqieLiqi();
mopai();
comboMopai(2);
qiepai();
mingQiepai('5m');
normalMoqie(64);
zimoHu();

// 第12局: (南场) 西亲 北起 自摸, 报菜名 (32番)
// 双立直, 岭上开花, 门前清自摸和, 三色同刻, 三暗刻, 宝牌11, 红宝牌, 宝牌12
// 12333m33350p 33333s 暗杠3s岭上摸3m, dora 3s3s3p(2s2s2p) 3s3s3m(2s2s2m)
tiles2 = '11122233344457z';
tiles3 = '12333m33305p333s';
tiles0 = '55p11119999s555z';
tiles1 = '1111666677779p';
randomPaishan('....3s', '2m2p2222s..3m.');
roundBegin();
qiepai();
moqieLiqi();
mopai();
zimingpai();
normalMoqie(3);
mopai();
comboMopai();
hupai();

// 第13局: (南场) 北亲, 东起 荣和 北起        三倍满
// 南, 连南, 三色同顺, 混全带幺九, 宝牌5
// 123m12399p12s222z, 荣和3s dora 9p2z(8p1z)
tiles3 = '11133344445557z';
tiles0 = '123m12399p12s222z';
tiles1 = '1112340678999m';
tiles2 = '1112340567899p';
randomPaishan('', '1z.8p...3s');
roundBegin();
comboMopai();
qiepai('3s');
hupai();

// 第14局: (西场) 东亲, 东起 铳三家     满贯, 跳满, 倍满 (西1局) (1p)
// 西, 连西, 一气;   中, 混全带幺九, 混一色;  清一色, dora 2
// 123456789m1p333z  2367788889999p  1222333455667p, dora 5p
tiles0 = '1p1112224445557z';
tiles1 = '1222333455667p';
tiles2 = '123456789m1p333z';
tiles3 = '23789999p66777z';
randomPaishan('', '4p....');
roundBegin();
qiepai('1p');
hupai();

// 跳转到北一局0本场
setRound(3, 0, 0);

// 第15局: (北场) 东亲, 北起 荣 东起 (北1局)
// 北, 连北
// 123m23p23488s444z, 荣和1p, dora 7z
tiles0 = '1p1112223335557z';
tiles1 = '1112340678999m';
tiles2 = '1112340678999s';
tiles3 = '123m23p23488s444z';
randomPaishan('', '6z....');
roundBegin();
qiepai('1p');
hupai();

// 第16局: (北场) 南亲
// 四风连打
tiles1 = '2223444666888s1z';
tiles2 = '1112340678999m';
tiles3 = '1112340678999p';
tiles0 = '1112340678999s';
randomPaishan('111z');
roundBegin();
qiepai(true);
moqieLiqi(3);
liuju();

// 四杠流局
tiles1 = '11112223334447z';
tiles2 = '1112340678999m';
tiles3 = '1113340678999p';
tiles0 = '1112340678999s';
randomPaishan('', '5z1p32z');
roundBegin();
comboMopai(3);
qiepai();
mingpai();
normalMoqie();
liuju();

// 九种九牌
tiles1 = '19m19p19s12345677z';
tiles2 = '1112340678999m';
tiles3 = '1112340678999p';
tiles0 = '1112340678999s';
roundBegin();
liuju();

// 四家立直
tiles1 = '2223444666888s5z';
tiles2 = '1112340678999m';
tiles3 = '1112340678999p';
tiles0 = '1112340678999s';
randomPaishan('555z');
roundBegin();
qiepai(true);
moqieLiqi(3);
liuju();

// 流局满贯, 听牌, 未听牌
tiles1 = '22223444666888s';
tiles2 = '2228m333557777s';
tiles3 = '233344447777m0s';
tiles0 = '05556666888m08p';
randomPaishan('YYYDYYYDYYYDYYYDYYYDYYYDYYYDYYYDYYYDYYYDYYYDYYYDYYYDYYYDYYYDYYYDY', 'D864s');
roundBegin();
comboMopai(4);
qiepai(true);
moqieLiuju();
