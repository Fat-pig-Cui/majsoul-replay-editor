clearproject();

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
