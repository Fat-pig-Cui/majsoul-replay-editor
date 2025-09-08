clearProject();

player_datas[0].nickname = '元宵-契约';
player_datas[1].nickname = '元宵';
player_datas[2].nickname = '元宵-契约';
player_datas[3].nickname = '元宵';
player_datas[0].avatar_id = 40010702;
player_datas[1].avatar_id = 40010701;
player_datas[2].avatar_id = 40010702;
player_datas[3].avatar_id = 40010701;

// 头像框-竹福滚滚
player_datas[0].avatar_frame = player_datas[1].avatar_frame = player_datas[2].avatar_frame = player_datas[3].avatar_frame = 30550022;
player_datas[0].views = player_datas[1].views = player_datas[2].views = player_datas[3].views = [
    {slot: 0, item_id: 30560007}, // 立直棒-青竹伞
    {slot: 5, item_id: 30550022}, // 头像框-竹福滚滚
    {slot: 6, item_id: 30580015}, // 桌布-清辉竹影
    {slot: 7, item_id: 30570009}, // 牌背-翠竹墨影
];

config = {
    category: 1,
    meta: {mode_id: 0},
    mode: {
        mode: 1,
        detail_rule: {
            init_point: 100000,
        }
    }
};

// 最长菜名(15条45番)
// 立直, 一发, 海底摸月, 门前清自摸和, 白, 发, 东, 连东, 混全带幺九,
// 三杠子, 三暗刻, 小三元, 混一色, 宝牌一大堆(13), 宝牌一大堆(13)
tiles0 = '789s1111z5556667z';
tiles1 = '222205588889m3s';
tiles2 = '1122224055599s';
tiles3 = '3333444467777p';
randomPaishan('', '7z.....66s444477z.9s65z');
roundBegin();
comboMopai(3);
qiepai('9s');
mingQiepai('4s');
normalMoqie(61);
moqieLiqi();
normalMoqie(3);
zimoHu();

// 最高番数(14条60番)
// 这个其实在'所有报菜名合集'中已经有了, 在第八局(东四局0本场)
// 两立直, 河底捞鱼, 白, 中, 东, 连东, 三杠子, 对对和,
// 三暗刻, 小三元, 混老头, 混一色, 宝牌一大堆(20), 宝牌一大堆(20)
tiles0 = '1999p1115556677z';
tiles1 = '222205558888m6z';
tiles2 = '222205558888s3z';
tiles3 = '3333444467777s';
randomPaishan('...9p', '4444z8888p776z.51z');
roundBegin();
qiepai('1p', true);
normalMoqie(3);
mopai();
comboMopai(3);
qiepai();
normalMoqie(60);
mopai();
zimingpai();
normalMoqie();
hupai();
