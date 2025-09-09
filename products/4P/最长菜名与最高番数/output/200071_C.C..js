clearProject();

player_datas[0].nickname = 'C.C.-契约';
player_datas[1].nickname = 'C.C.';
player_datas[2].nickname = 'C.C.-契约';
player_datas[3].nickname = '棋盘晚宴';
player_datas[0].avatar_id = 407102;
player_datas[1].avatar_id = 407101;
player_datas[2].avatar_id = 407102;
player_datas[3].avatar_id = 407103;

player_datas[0].views = player_datas[1].views = player_datas[2].views = player_datas[3].views = [
    {slot: 0, item_id: 308028}, // 立直棒-骑士的钥匙
    {slot: 1, item_id: 308026}, // 和牌-绝对的命令
    {slot: 2, item_id: 308027}, // 立直-王者的决意
    {slot: 6, item_id: 308029}, // 桌布-魔女的契约
    {slot: 7, item_id: 308030}, // 牌背-假面的裁决
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
begin_tiles[0] = '789s1111z5556667z';
begin_tiles[1] = '222205588889m3s';
begin_tiles[2] = '1122224055599s';
begin_tiles[3] = '3333444467777p';
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
begin_tiles[0] = '1999p1115556677z';
begin_tiles[1] = '222205558888m6z';
begin_tiles[2] = '222205558888s3z';
begin_tiles[3] = '3333444467777s';
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
