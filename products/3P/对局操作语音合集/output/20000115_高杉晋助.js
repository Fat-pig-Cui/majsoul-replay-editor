clearProject();

player_datas[0].nickname = '高杉晋助-契约';
player_datas[1].nickname = '高杉晋助';
player_datas[2].nickname = '麻将桌即人生';
player_datas[0].avatar_id = 40011502;
player_datas[1].avatar_id = 40011501;
player_datas[2].avatar_id = 40011503;

// 头像框-伊丽莎白框
player_datas[0].avatar_frame = player_datas[1].avatar_frame = player_datas[2].avatar_frame = 308051;
player_datas[0].views = player_datas[1].views = player_datas[2].views = [
    {slot: 0, item_id: 308048}, // 立直棒-志村新八
    {slot: 1, item_id: 308046}, // 和牌-谢幕的Just a way
    {slot: 2, item_id: 308047}, // 立直-伊丽莎白
    {slot: 5, item_id: 308051}, // 头像框-伊丽莎白框
    {slot: 6, item_id: 308049}, // 桌布-骑摩托的银时
    {slot: 7, item_id: 308050}, // 牌背-Just a way
];

setConfig({
    category: 1,
    meta: {mode_id: 0},
    mode: {
        mode: 11,
        detail_rule: {}
    }
});

// 第1局: 立直, 两立直, 吃, 碰, 杠, 拔北, 四杠流局
begin_tiles[0] = '1112340678999p1s';
begin_tiles[1] = '23446668889s66z';
begin_tiles[2] = '1112223335777z';
randomPaishan('1z6s', '6z84s4z4s');
roundBegin();
qiepai(true);
mingQiepai('23s');
mopai();
comboMopai();
qiepai(true);
mingQiepai('6z');
normalMoqie();
mingpai();
mopai();
comboMopai(3);
qiepai();
liuju();

// 第2局: 自摸
begin_tiles[0] = '111m23456p11123s4z';
begin_tiles[1] = '1112340678999p';
begin_tiles[2] = '1112223334445z';
randomPaishan('', '1m.......1p');
roundBegin();
comboMopai();
hupai();

// 第3局: 荣
begin_tiles[0] = '2p1112223334445z';
begin_tiles[1] = '2455667p234567s';
begin_tiles[2] = '1112340678999s';
randomPaishan('', '1m........');
roundBegin();
qiepai('2p');
hupai();
