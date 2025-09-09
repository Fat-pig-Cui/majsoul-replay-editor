clearProject();

player_datas[0].nickname = '五十岚阳菜-契约';
player_datas[1].nickname = '新岁添喜';
player_datas[2].nickname = '无拘乐趣';
player_datas[0].avatar_id = 402002;
player_datas[1].avatar_id = 402005;
player_datas[2].avatar_id = 402006;

// 头像框-猫咪军团的身份
player_datas[0].avatar_frame = player_datas[1].avatar_frame = player_datas[2].avatar_frame = 305523;
player_datas[0].views = player_datas[1].views = player_datas[2].views = [
    {slot: 5, item_id: 305523}, // 头像框-猫咪军团的身份
];

config = {
    category: 1,
    meta: {mode_id: 0},
    mode: {
        mode: 11,
        detail_rule: {}
    }
};

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
