clearProject();

player_datas[0].nickname = 'Saber-契约';
player_datas[1].nickname = 'Saber';
player_datas[2].nickname = '命运之夜';
player_datas[0].avatar_id = 40011002;
player_datas[1].avatar_id = 40011001;
player_datas[2].avatar_id = 40011003;

player_datas[0].views = player_datas[1].views = player_datas[2].views = [
    {slot: 0, item_id: 308043}, // 立直棒-胜利誓约
    {slot: 1, item_id: 308041}, // 和牌-咒层界・恶念祝祭
    {slot: 2, item_id: 308042}, // 立直-虚影祝祷
    {slot: 6, item_id: 308044}, // 桌布-剑之丘
    {slot: 7, item_id: 308045}, // 牌背-噬光之剑
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
