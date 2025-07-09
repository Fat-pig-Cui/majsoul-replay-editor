loadproject();

editdata.player_datas[0].nickname = '一姬-契约';
editdata.player_datas[1].nickname = '新年初诣';
editdata.player_datas[2].nickname = '一姬当千';
editdata.player_datas[3].nickname = '绮春歌';
editdata.player_datas[0].avatar_id = 400102;
editdata.player_datas[1].avatar_id = 400104;
editdata.player_datas[2].avatar_id = 400105;
editdata.player_datas[3].avatar_id = 400106;

// 称号-一姬当千
editdata.player_datas[0].title = editdata.player_datas[1].title = editdata.player_datas[2].title = editdata.player_datas[3].title = 600045;
// 主播(猫爪子)认证
editdata.player_datas[0].verified = editdata.player_datas[1].verified = editdata.player_datas[2].verified = editdata.player_datas[3].verified = 1;
editdata.player_datas[0].views = editdata.player_datas[1].views = editdata.player_datas[2].views = editdata.player_datas[3].views = [
    {'slot': 0, 'item_id': 305049}, // 立直棒-炎夏型一姬甜筒
    {'slot': 1, 'item_id': 305213}, // 和牌-疾月斩
    {'slot': 2, 'item_id': 305324}, // 立直-猫过留痕
    {'slot': 6, 'item_id': 305046}, // 桌布-吃瓜
    {'slot': 13, 'item_id': 305718}, // 牌面-猫咪雀圣
];

editdata.config = {
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
