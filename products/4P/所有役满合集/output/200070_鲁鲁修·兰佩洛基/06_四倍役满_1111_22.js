loadproject();

editdata.player_datas[0].nickname = '一姬-契约';
editdata.player_datas[1].nickname = '新年初诣';
editdata.player_datas[2].nickname = '一姬当千';
editdata.player_datas[3].nickname = '绮春歌';
editdata.player_datas[0].avatar_id = 400102;
editdata.player_datas[1].avatar_id = 400104;
editdata.player_datas[2].avatar_id = 400105;
editdata.player_datas[3].avatar_id = 400106;

editdata.player_datas[0].views = editdata.player_datas[1].views = editdata.player_datas[2].views = editdata.player_datas[3].views = [
    {'slot': 0, 'item_id': 308028}, // 立直棒-骑士的钥匙
    {'slot': 1, 'item_id': 308026}, // 和牌-绝对的命令
    {'slot': 2, 'item_id': 308027}, // 立直-王者的决意
    {'slot': 6, 'item_id': 308029}, // 桌布-魔女的契约
    {'slot': 7, 'item_id': 308030}, // 牌背-假面的裁决
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

// 第1局: 东亲, 东起 四暗刻单骑, 大四喜
tiles0 = '1p1s111222333444z';
tiles1 = '2223405567888m';
tiles2 = '2223405567888p';
tiles3 = '2223405567888s';
paishan = randompaishan('1s');
roundbegin();
qiepai('1p');
normalmoqie();
hupai();

// 第2局: 东亲, 南起 地和, 大三元, 四暗刻, 字一色
tiles0 = '1112340678999s3z';
tiles1 = '1122555666777z';
tiles2 = '1112340678999m';
tiles3 = '1112340678999p';
paishan = randompaishan('1z');
roundbegin();
qiepai();
zimohu();

// 第3局: 南亲, 西起 地和, 四暗刻, 字一色, 小四喜
tiles1 = '1112340678999s7z';
tiles2 = '1112223334455z';
tiles3 = '1112340678999m';
tiles0 = '1112340678999p';
paishan = randompaishan('5z');
roundbegin();
qiepai();
zimohu();
