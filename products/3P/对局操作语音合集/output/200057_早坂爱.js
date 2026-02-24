clearProject();

player_datas[0].nickname = '早坂爱-契约';
player_datas[1].nickname = '早坂爱';
player_datas[2].nickname = '偷心怪盗';
player_datas[0].avatar_id = 405702;
player_datas[1].avatar_id = 405701;
player_datas[2].avatar_id = 405703;

player_datas[0].views = player_datas[1].views = player_datas[2].views = [
    {slot: 0, item_id: 308018}, // 立直棒-恋之反省
    {slot: 1, item_id: 308016}, // 和牌-恋之降临
    {slot: 2, item_id: 308017}, // 立直-恋之箭矢
    {slot: 6, item_id: 308019}, // 桌布-恋之见证
    {slot: 7, item_id: 308020}, // 牌背-恋之背影
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
roundBegin();
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
roundBegin();
comboMopai();
hupai();
