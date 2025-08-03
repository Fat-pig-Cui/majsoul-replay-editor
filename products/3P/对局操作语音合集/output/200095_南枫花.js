clearproject();

player_datas[0].nickname = '南枫花-契约';
player_datas[1].nickname = '南枫花';
player_datas[2].nickname = '南枫花-契约';
player_datas[0].avatar_id = 409502;
player_datas[1].avatar_id = 409501;
player_datas[2].avatar_id = 409502;

// 头像框-赤丹霞羽
player_datas[0].avatar_frame = player_datas[1].avatar_frame = player_datas[2].avatar_frame = 30550012;
player_datas[0].views = player_datas[1].views = player_datas[2].views = [
    {slot: 1, item_id: 30520006}, // 和牌-落羽涅槃
    {slot: 2, item_id: 30530006}, // 立直-有凤来仪
    {slot: 5, item_id: 30550012}, // 头像框-赤丹霞羽
];

config = {
    category: 1,
    meta: {mode_id: 0},
    mode: {
        mode: 11,
    }
};

// 第1局: 立直, 两立直, 吃, 碰, 杠, 拔北, 四杠流局
tiles0 = '1112340678999p1s';
tiles1 = '23446668889s66z';
tiles2 = '1112223335777z';
randompaishan('1z6s', '6z84s4z4s');
roundbegin();
qiepai(true);
mingqiepai('23s');
mopai();
combomopai();
qiepai(true);
mingqiepai('6z');
normalmoqie();
mingpai();
mopai();
combomopai(3);
qiepai();
liuju();

// 第2局: 自摸
tiles0 = '111m23456p11123s4z';
tiles1 = '1112340678999p';
tiles2 = '1112223334445z';
randompaishan('', '1m.......1p');
roundbegin();
combomopai();
hupai();

// 第3局: 荣
tiles0 = '2p1112223334445z';
tiles1 = '2455667p234567s';
tiles2 = '1112340678999s';
randompaishan('', '1m........');
roundbegin();
qiepai('2p');
hupai();
