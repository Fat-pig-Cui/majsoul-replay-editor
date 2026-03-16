clearProject();

player_datas[0].nickname = '浅仓透-契约';
player_datas[1].nickname = '浅仓透';
player_datas[2].nickname = '悠然格调';
player_datas[0].avatar_id = 40010002;
player_datas[1].avatar_id = 40010001;
player_datas[2].avatar_id = 40010003;

player_datas[0].views = player_datas[1].views = player_datas[2].views = [
    {slot: 0, item_id: 30560005}, // 立直棒-动听之源
    {slot: 1, item_id: 30520007}, // 和牌-涟漪之空
    {slot: 2, item_id: 30530007}, // 立直-水漾星光
    {slot: 6, item_id: 30580011}, // 桌布-闪耀吧！
    {slot: 7, item_id: 30570007}, // 牌背-静谧夜光
];

setConfig({
    category: 1,
    meta: {mode_id: 0},
    mode: {
        mode: 10,
        detail_rule: {}
    }
});

// 第1局: 立直, 两立直, 吃, 碰, 杠, 拔北, 四杠流局
begin_tiles[0] = '1112340678999p1s';
begin_tiles[1] = '234466688s5567z';
begin_tiles[2] = '1112223335777z';
randomPaishan('1z8s', '6z.6z.......4s');
qiepai(true);
mingQiepai('23s');
mopai();
comboMopai();
qiepai(true);
mingQiepai();
normalMoqie();
hupai(1);

// 第2局: 自摸
begin_tiles[1] = '111m23456p11123s4z';
begin_tiles[2] = '1112340678999p';
begin_tiles[0] = '1112223334445z';
randomPaishan('', '1m.......1p');
comboMopai();
hupai();
