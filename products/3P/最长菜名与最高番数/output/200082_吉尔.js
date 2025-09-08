clearProject();

// 第一局亲家的最长菜名(15条49番), 第二局最高番数(14条64番)
// 最后一局闲家的最长菜名(15条55番)

player_datas[0].nickname = '吉尔-契约';
player_datas[1].nickname = '吉尔';
player_datas[2].nickname = 'Prism Live';
player_datas[0].avatar_id = 408202;
player_datas[1].avatar_id = 408201;
player_datas[2].avatar_id = 408203;

player_datas[0].views = player_datas[1].views = player_datas[2].views = [
    {slot: 0, item_id: 308033}, // 立直棒-红晖的魔杖
    {slot: 1, item_id: 308031}, // 和牌-魔力的迸发
    {slot: 2, item_id: 308032}, // 立直-英灵的典仪
    {slot: 6, item_id: 308034}, // 桌布-星夜的羁绊
    {slot: 7, item_id: 308035}, // 牌背-苍蓝的星辰
];

config = {
    category: 1,
    meta: {mode_id: 0},
    mode: {
        mode: 11,
        detail_rule: {
            init_point: 100000,
        }
    }
};

// 最长菜名(15条49番)
// 立直, 一发, 海底摸月, 门前清自摸和, 白, 发, 东, 连东, 混全带幺九,
// 三杠子, 三暗刻, 小三元, 混一色, 宝牌一大堆(13), 宝牌4, 宝牌一大堆(13)
tiles0 = '789s1114z5556667z';
tiles1 = '2222556688889p';
tiles2 = '1111222240555s';
randomPaishan('', '7z.....66s333377z.6p651444z');
roundBegin();
comboMopai(7);
qiepai('6p');
mingQiepai('9p');
normalMoqie(43);
moqieLiqi();
normalMoqie(2);
zimoHu();

// 最高番数(14条64番)
// 两立直, 河底捞鱼, 白, 中, 东, 连东, 三杠子, 对对和,
// 三暗刻, 小三元, 混老头, 混一色, 宝牌一大堆(20), 宝牌4, 宝牌一大堆(20)
tiles0 = '1999p1115556677z';
tiles1 = '222255667777p6z';
tiles2 = '1111222240555s';
randomPaishan('..4z', '3333z8888p776z.51z9p444z');
roundBegin();
qiepai('1p', true);
normalMoqie(2);
mopai();
comboMopai(7);
qiepai();
normalMoqie(42);
mopai();
comboMopai();
qiepai();
hupai();

// 跳转到南1局0本场
setRound(1, 0, 0);

// 最长菜名(15条55番)
// 立直, 一发, 海底摸月, 门前清自摸和, 白, 发, 东, 连东, 混全带幺九,
// 三杠子, 三暗刻, 小三元, 混一色, 宝牌一大堆(16), 宝牌4, 宝牌一大堆(16)
tiles0 = '2222556688889p9m';
tiles1 = '789s2225556667z';
tiles2 = '1111222240555s';
randomPaishan('4z', '7z.....11333377z.6p652444z');
roundBegin();
qiepai('9m');
mopai();
comboMopai(7);
qiepai('6p');
mingQiepai('9p');
normalMoqie(42);
moqieLiqi();
normalMoqie(2);
zimoHu();
