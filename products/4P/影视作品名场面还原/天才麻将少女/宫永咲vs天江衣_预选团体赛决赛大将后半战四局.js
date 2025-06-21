loadproject();

// 预选团体赛决赛大将后半战的经典牌局 第一季第17集10min开始, 19集结束
// 1. 枪杠dora7. 池田华菜0点枪宫永咲的加杠成功拿回棒子
// 2. 1番110符. 天江衣点宫永咲1番110符
// 3. 三连杠倍满. 宫永咲三连杠自摸倍满
// 4. 包杠累计役满. 宫永咲三连杠自摸累计役满

// 大会战的规则是四赤, 有杠包牌, 无双倍役满
// 因为雀魂天麻联动没有 池田华菜 和 加治木由美, 所以分别用 一姬 和 小鸟游雏田 代替

editdata.player_datas[0].nickname = "池田华菜";
editdata.player_datas[1].nickname = "天江衣";
editdata.player_datas[2].nickname = "宫永咲";
editdata.player_datas[3].nickname = "加治木由美";
editdata.player_datas[0].avatar_id = 400101;
editdata.player_datas[1].avatar_id = 403601;
editdata.player_datas[2].avatar_id = 403401;
editdata.player_datas[3].avatar_id = 401901;

editdata.player_datas[0].views = [{"slot": 1, "item_id": 305206}, {"slot": 2, "item_id": 305324}]; // 和牌-天降正义 和 立直-猫过留痕
editdata.player_datas[1].views = [{"slot": 1, "item_id": 308001}]; // 和牌-龙卷雷霆
editdata.player_datas[2].views = [{"slot": 1, "item_id": 308021}]; // 和牌-高岭之花

editdata.config = {
    'category': 4,
    'meta': {'mode_id': 0},
    'mode': {
        'mode': 2,
        'detail_rule': {
            'dora_count': 4,
            'init_point': 100000,
            '_baogang': true,

            '_chang_ju_ben_num_': [0, 1, 3], // 东2局3本场
            '_scores_': [0, 187900, 113200, 98900],
            '_local_position_': 2,
        }
    }
};

// 枪杠dora7
// 因为动画没有部分切牌和 天江衣, 加治木由美 的手牌画面, 我这里乱编了一个
tiles1 = "7899m9s111223346z";
tiles2 = "4444067788s667p";
tiles3 = "123345789p2389s";
tiles0 = "111667s34099m07p";
paishan = randompaishan("1m2m2z5z5z6m1m5m4m5s8s6p...8p", "9s.8m...6p");
discardtiles = ["2z1m6s", "9s5z5m6p", "1m5z4m7s", "2m6m5s"];
roundbegin();
qiepai();
normalmoqie(12);
mingqiepai();
normalmoqie(3);
mopai();
combomopai();
leimingpai();
hupai();

// 南2局0本场
gotoju(1, 1, 0);

// 1番110符
// 加治木由美 的手牌没给镜头, 我就乱编了一个
scores = [47900, 167500, 83200, 101400];
tiles1 = "1356788m566778s2z";
tiles2 = "11116p1m678s2666z";
tiles3 = "1222245689m158s";
tiles0 = "234444s079m6777p";
paishan = randompaishan("4z2z2p4z5z7z5z2p1s2s2p7z4m1s5z2s6z.6m4m..6p", "3s.6p.0p..1m2z");
discardtiles = ["2p5z2p5z9m", "2z4z2p7z2s1m", "4z5z1s4m6p", "2z7z2s1s"];
roundbegin();
qiepai();
normalmoqie(16);
mopai();
combomopai("6z");
leimingpai("1p");
normalmoqie(2);
moqieliqi();
normalmoqie();
hupai();

// 南3局0本场
gotoju(1, 2, 0);

// 岭上断幺对对三暗刻三杠子 宫永咲自摸倍满
scores = [46900, 163900, 87800, 101400];
tiles2 = "23334s6688p38m347z";
tiles3 = "111205778999s6p";
tiles0 = "119p9m19s1123567z";
tiles1 = "44s11123m777p444z";
paishan = randompaishan("9p3m.8p2p5p.3s2m3p.8p6sH1m1p6p.4m4m", "4p.4m.8s.9m.4s2s2s");
discardtiles = ["3m5p3p1p", "", "4z3z7z8m3m", "9p2p2m6p"];
roundbegin();
qiepai();
normalmoqie(13);
mingqiepai();
normalmoqie(3);
mopai();
combomopai("6p");
combomopai("8p");
leimingpai("3s");
zimohu();
// IF线, 如果宫永咲没碰6p 天江衣自摸倍满
gotoju(1, 2, 0);
scores = [46900, 163900, 87800, 101400];
tiles2 = "23334s6688p38m347z";
tiles3 = "111205778999s6p";
tiles0 = "119p9m19s1123567z";
tiles1 = "44s11123m777p444z";
paishan = randompaishan("9p3m.8p2p5p.3s2m3p.8p6sH1m", "9m....");
discardtiles = ["3m5p3p", "", "4z3z7z8m", "9p2p2m6p"];
roundbegin();
qiepai();
normalmoqie(14);
zimohu();

// 南4局0本场
// 岭上清一色对对三暗刻三杠子红宝1 累计役满
gotoju(1, 3, 0);

scores = [35800, 168200, 105700, 90300];
tiles3 = "19m7999p19s234567z";
tiles0 = "225779s2588m788p";
tiles1 = "24679m169s469p56z";
tiles2 = "122234p14m38s267z";
paishan = randompaishan("4z2m4p 6s1z3m1p 7s7z0m3p 4s2s0p2p 3s8m4s1p 6m7s8s3p 7m8p0s3p 7p7p1p", "7z.8s.1z.8p.0p4p5p");
discardtiles = ["4z1z7z2m5m9s5s7p", "9m1s9s5z6z9p8s1p", "1m8s3s4m6z2z7z", "7p6s7s4s3s6m7m7p"];
roundbegin();
qiepai();
normalmoqie(30);
mingpai();
mopai();
combomopai(2);
hupai();
