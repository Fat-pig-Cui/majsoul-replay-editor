loadproject();

editdata.player_datas[0].nickname = "二之宫花-契约";
editdata.player_datas[1].nickname = "馥郁满室";
editdata.player_datas[2].nickname = "冬日心愿簿";
editdata.player_datas[0].avatar_id = 401702;
editdata.player_datas[1].avatar_id = 401708;
editdata.player_datas[2].avatar_id = 401709;

// 头像框-豆芽
editdata.player_datas[0].avatar_frame = editdata.player_datas[1].avatar_frame = editdata.player_datas[2].avatar_frame = 305500;
editdata.player_datas[0].views = editdata.player_datas[1].views = editdata.player_datas[2].views = [
    {"slot": 0, "item_id": 305621}, // 立直棒-盆栽
    {"slot": 5, "item_id": 305500}, // 头像框-豆芽
    {"slot": 6, "item_id": 305801}, // 桌布-锦鲤游
];

editdata.config = {
    'category': 1,
    'meta': {'mode_id': 0},
    'mode': {
        'mode': 11,
    }
};

// 第1局: 立直, 两立直, 吃, 碰, 杠, 拔北, 四杠流局
tiles0 = "1112340678999p1s";
tiles1 = "23446668889s66z";
tiles2 = "1112223335777z";
paishan = randompaishan("1z6s", "6z84s4z4s");
roundbegin();
qiepai(true);
mingqiepai("23s");
mopai();
combomopai();
qiepai(true);
mingqiepai("6z");
normalmoqie();
mingpai();
mopai();
combomopai(3);
qiepai();
liuju();

// 第2局: 自摸
tiles0 = "111m23456p11123s4z";
tiles1 = "1112340678999p";
tiles2 = "1112223334445z";
paishan = randompaishan("", "1m.......1p");
roundbegin();
combomopai();
hupai();

// 第3局: 荣
tiles0 = "2p1112223334445z";
tiles1 = "2455667p234567s";
tiles2 = "1112340678999s";
paishan = randompaishan("", "1m........");
roundbegin();
qiepai("2p");
hupai();
