clearproject();

player_datas[0].nickname = '桃喰绮罗莉-契约';
player_datas[1].nickname = '桃喰绮罗莉';
player_datas[2].nickname = '桃喰绮罗莉-契约';
player_datas[3].nickname = '百花缭乱';
player_datas[0].avatar_id = 404302;
player_datas[1].avatar_id = 404301;
player_datas[2].avatar_id = 404302;
player_datas[3].avatar_id = 404303;

player_datas[0].views = player_datas[1].views = player_datas[2].views = player_datas[3].views = [
    {'slot': 0, 'item_id': 308008}, // 立直棒-生死之剑
    {'slot': 1, 'item_id': 308006}, // 和牌-命运之轮
    {'slot': 2, 'item_id': 308007}, // 立直-纸牌花火
    {'slot': 6, 'item_id': 308009}, // 桌布-无双之花
    {'slot': 7, 'item_id': 308010}, // 牌背-百花境界
];

config = {
    'category': 1,
    'meta': {'mode_id': 0},
    'mode': {
        'mode': 1,
        'detail_rule': {
            'init_point': 100000,
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
paishan = randompaishan('', '7z.....66s444477z.9s65z');
roundbegin();
combomopai(3);
qiepai('9s');
mingqiepai('4s');
normalmoqie(61);
moqieliqi();
normalmoqie(3);
zimohu();

// 最高番数(14条60番)
// 这个其实在'所有报菜名合集'中已经有了, 在第八局(东四局0本场)
// 两立直, 河底捞鱼, 白, 中, 东, 连东, 三杠子, 对对和,
// 三暗刻, 小三元, 混老头, 混一色, 宝牌一大堆(20), 宝牌一大堆(20)
tiles0 = '1999p1115556677z';
tiles1 = '222205558888m6z';
tiles2 = '222205558888s3z';
tiles3 = '3333444467777s';
paishan = randompaishan('...9p', '4444z8888p776z.51z');
roundbegin();
qiepai('1p', true);
normalmoqie(3);
mopai();
combomopai(3);
qiepai();
normalmoqie(60);
mopai();
leimingpai();
normalmoqie();
hupai();
