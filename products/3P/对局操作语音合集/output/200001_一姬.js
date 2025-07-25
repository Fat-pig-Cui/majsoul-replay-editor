clearproject();

player_datas[0].nickname = '一姬-契约';
player_datas[1].nickname = '绮春歌';
player_datas[2].nickname = '校园微风';
player_datas[0].avatar_id = 400102;
player_datas[1].avatar_id = 400106;
player_datas[2].avatar_id = 400107;

// 称号-一姬当千
player_datas[0].title = player_datas[1].title = player_datas[2].title = 600045;
// 主播(猫爪子)认证
player_datas[0].verified = player_datas[1].verified = player_datas[2].verified = 1;
player_datas[0].views = player_datas[1].views = player_datas[2].views = [
    {'slot': 0, 'item_id': 305049}, // 立直棒-炎夏型一姬甜筒
    {'slot': 1, 'item_id': 305213}, // 和牌-疾月斩
    {'slot': 2, 'item_id': 305324}, // 立直-猫过留痕
    {'slot': 6, 'item_id': 305046}, // 桌布-吃瓜
    {'slot': 13, 'item_id': 305718}, // 牌面-猫咪雀圣
];

config = {
    'category': 1,
    'meta': {'mode_id': 0},
    'mode': {
        'mode': 11,
    }
};

// 第1局: 立直, 两立直, 吃, 碰, 杠, 拔北, 四杠流局
tiles0 = '1112340678999p1s';
tiles1 = '23446668889s66z';
tiles2 = '1112223335777z';
paishan = randompaishan('1z6s', '6z84s4z4s');
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
paishan = randompaishan('', '1m.......1p');
roundbegin();
combomopai();
hupai();

// 第3局: 荣
tiles0 = '2p1112223334445z';
tiles1 = '2455667p234567s';
tiles2 = '1112340678999s';
paishan = randompaishan('', '1m........');
roundbegin();
qiepai('2p');
hupai();
