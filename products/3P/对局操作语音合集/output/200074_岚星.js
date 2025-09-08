clearProject();

player_datas[0].nickname = '岚星-契约';
player_datas[1].nickname = '岚星';
player_datas[2].nickname = '不寐之绊';
player_datas[0].avatar_id = 407402;
player_datas[1].avatar_id = 407401;
player_datas[2].avatar_id = 407403;

player_datas[0].views = player_datas[1].views = player_datas[2].views = [
    {slot: 0, item_id: 305620}, // 立直棒-秘传之卷
    {slot: 1, item_id: 305222}, // 和牌-天地无用
    {slot: 2, item_id: 305322}, // 立直-毒烟玉
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
tiles0 = '1112340678999p1s';
tiles1 = '23446668889s66z';
tiles2 = '1112223335777z';
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
tiles0 = '111m23456p11123s4z';
tiles1 = '1112340678999p';
tiles2 = '1112223334445z';
randomPaishan('', '1m.......1p');
roundBegin();
comboMopai();
hupai();

// 第3局: 荣
tiles0 = '2p1112223334445z';
tiles1 = '2455667p234567s';
tiles2 = '1112340678999s';
randomPaishan('', '1m........');
roundBegin();
qiepai('2p');
hupai();
