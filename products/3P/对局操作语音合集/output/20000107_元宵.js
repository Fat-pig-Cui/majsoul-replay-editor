clearProject();

player_datas[0].nickname = '元宵-契约';
player_datas[1].nickname = '元宵';
player_datas[2].nickname = '云踪侠影';
player_datas[0].avatar_id = 40010702;
player_datas[1].avatar_id = 40010701;
player_datas[2].avatar_id = 40010703;

// 头像框-竹福滚滚
player_datas[0].avatar_frame = player_datas[1].avatar_frame = player_datas[2].avatar_frame = 30550022;
player_datas[0].views = player_datas[1].views = player_datas[2].views = [
    {slot: 0, item_id: 30560007}, // 立直棒-青竹伞
    {slot: 5, item_id: 30550022}, // 头像框-竹福滚滚
    {slot: 6, item_id: 30580015}, // 桌布-清辉竹影
    {slot: 7, item_id: 30570009}, // 牌背-翠竹墨影
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
