clearProject();

player_datas[0].nickname = '二阶堂美树-契约';
player_datas[1].nickname = '鸢尾花之夜';
player_datas[2].nickname = '玩转夏日';
player_datas[0].avatar_id = 400202;
player_datas[1].avatar_id = 400207;
player_datas[2].avatar_id = 400208;

// 称号-喵国大护法
player_datas[0].title = player_datas[1].title = player_datas[2].title = 600021;
player_datas[0].views = player_datas[1].views = player_datas[2].views = [
    {slot: 6, item_id: 305818}, // 桌布-藤萝悦色
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
