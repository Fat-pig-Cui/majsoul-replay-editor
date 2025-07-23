clearproject();

player_datas[0].nickname = '一姬-契约';
player_datas[1].nickname = '一姬当千';
player_datas[2].nickname = '绮春歌';
player_datas[3].nickname = '校园微风';
player_datas[0].avatar_id = 400102;
player_datas[1].avatar_id = 400105;
player_datas[2].avatar_id = 400106;
player_datas[3].avatar_id = 400107;

// 称号-神社贵宾
player_datas[0].title = player_datas[1].title = player_datas[2].title = player_datas[3].title = 600038;
// 主播(猫爪子)认证
player_datas[0].verified = player_datas[1].verified = player_datas[2].verified = player_datas[3].verified = 1;

config = {
    'category': 1,
    'meta': {'mode_id': 0},
    'mode': {
        'mode': 1,
        'detail_rule': {
            'init_point': 500000,
        }
    }
};

// 第1局: 东亲, 东起 天和, 四暗刻单骑, 大四喜
tiles0 = '22m111222333444z';
tiles1 = '1112340678999m';
tiles2 = '1112340678999p';
tiles3 = '1112340678999s';
paishan = randompaishan();
roundbegin();
hupai();

// 第2局: 东亲, 南起 地和, 四暗刻单骑, 大四喜
tiles0 = '1112340678999s5z';
tiles1 = '2m111222333444z';
tiles2 = '1112340678999m';
tiles3 = '1112340678999p';
paishan = randompaishan('2m');
roundbegin();
qiepai();
zimohu();

// 第3局: 南亲, 南起 字一色, 四暗刻单骑, 大四喜
tiles1 = '111222333444z57z';
tiles2 = '1112340678999m';
tiles3 = '1112340678999p';
tiles0 = '1112340678999s';
paishan = randompaishan('5z');
roundbegin();
qiepai();
normalmoqie();
hupai();

// 第4局: 南亲, 南起 四杠子, 四暗刻单骑, 大四喜
tiles1 = '2m1111222333444z';
tiles2 = '1112340678999m';
tiles3 = '1112340678999p';
tiles0 = '1112340678999s';
paishan = randompaishan('', '2m432z');
roundbegin();
combomopai(4);
hupai();
