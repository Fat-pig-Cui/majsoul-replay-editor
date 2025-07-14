loadproject();

player_datas[0].nickname = '一姬-契约';
player_datas[1].nickname = '新年初诣';
player_datas[2].nickname = '一姬当千';
player_datas[3].nickname = '绮春歌';
player_datas[0].avatar_id = 400102;
player_datas[1].avatar_id = 400104;
player_datas[2].avatar_id = 400105;
player_datas[3].avatar_id = 400106;

// 头像框-大小姐发带
player_datas[0].avatar_frame = player_datas[1].avatar_frame = player_datas[2].avatar_frame = player_datas[3].avatar_frame = 305552;
player_datas[0].views = player_datas[1].views = player_datas[2].views = player_datas[3].views = [
    {'slot': 0, 'item_id': 308003}, // 立直棒-墨西哥卷饼
    {'slot': 1, 'item_id': 308001}, // 和牌-龙卷雷霆
    {'slot': 2, 'item_id': 308002}, // 立直-花天月地
    {'slot': 5, 'item_id': 305552}, // 头像框-大小姐发带
    {'slot': 6, 'item_id': 308004}, // 桌布-赛间小憩
    {'slot': 7, 'item_id': 308005}, // 牌背-艾托企鹅
];

config = {
    'category': 1,
    'meta': {'mode_id': 0},
    'mode': {
        'mode': 1,
        'detail_rule': {
            'init_point': 200000,
        }
    }
};

// 第1局: 东亲, 南起 纯正九莲宝灯
tiles0 = '0m123456789p1114z';
tiles1 = '1112345678999m';
tiles2 = '1112340678999p';
tiles3 = '1112340678999s';
paishan = randompaishan();
roundbegin();
qiepai('0m');
hupai();

// 第2局: 南亲, 南起 四暗刻单骑
tiles1 = '222p222s11122267z';
tiles2 = '1112340678999m';
tiles3 = '1112340678999p';
tiles0 = '1112340678999s';
paishan = randompaishan('6z');
roundbegin();
qiepai();
normalmoqie();
hupai();

// 第3局: 南亲, 南起 国士无双十三面
tiles1 = '139m19p19s1234567z';
tiles2 = '2223405567888m';
tiles3 = '1112340678999p';
tiles0 = '1112340678999s';
paishan = randompaishan('1z');
roundbegin();
qiepai('3m');
normalmoqie();
hupai();

// 第4局: 南亲, 南起 大四喜
tiles1 = '22m111222333445z';
tiles2 = '1112340678999m';
tiles3 = '1112340678999p';
tiles0 = '1112340678999s';
paishan = randompaishan('54z');
roundbegin();
qiepai();
normalmoqie(2);
hupai();
