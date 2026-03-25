clearProject();

player_datas[0].nickname = '二阶堂美树-契约';
player_datas[1].nickname = '万象沐春';
player_datas[2].nickname = '鸢尾花之夜';
player_datas[3].nickname = '玩转夏日';
player_datas[0].avatar_id = 400202;
player_datas[1].avatar_id = 400206;
player_datas[2].avatar_id = 400207;
player_datas[3].avatar_id = 400208;

// 称号-喵国大护法
player_datas[0].title = player_datas[1].title = player_datas[2].title = player_datas[3].title = 600021;
player_datas[0].views = player_datas[1].views = player_datas[2].views = player_datas[3].views = [
    {slot: 6, item_id: 305818}, // 桌布-藤萝悦色
];

setConfig({
    category: 1,
    meta: {mode_id: 0},
    mode: {
        mode: 1,
        detail_rule: {
            init_point: 500000,
        }
    }
});

// 第1局: 东亲, 南起 地和, 大三元, 四暗刻
begin_tiles[0] = '1112340678999m1z';
begin_tiles[1] = '22p22s555666777z';
begin_tiles[2] = '1112340678999p';
begin_tiles[3] = '1112340678999s';
randomPaishan('2p');
qiepai();
zimoHu();

// 第2局: 南亲, 西起 地和, 四暗刻, 字一色
begin_tiles[1] = '1112340678999m7z';
begin_tiles[2] = '1112223335566z';
begin_tiles[3] = '1112340678999p';
begin_tiles[0] = '1112340678999s';
randomPaishan('5z');
qiepai();
zimoHu();

// 第3局: 西亲, 北起 地和, 四暗刻, 绿一色
begin_tiles[2] = '1112340678999m7z';
begin_tiles[3] = '22244466688s66z';
begin_tiles[0] = '1112340678999p';
begin_tiles[1] = '1112340678999s';
randomPaishan('8s');
qiepai();
zimoHu();

// 第4局: 北亲, 东起 地和, 四暗刻, 清老头
begin_tiles[3] = '2223405567888m7z';
begin_tiles[0] = '111999m11199p11s';
begin_tiles[1] = '2223405567888p';
begin_tiles[2] = '2223405567888s';
randomPaishan('9p');
qiepai();
zimoHu();

// 第5局: 东亲, 南起 地和, 四暗刻, 小四喜
begin_tiles[0] = '2223405567888m7z';
begin_tiles[1] = '111m1112223344z';
begin_tiles[2] = '2223405567888p';
begin_tiles[3] = '2223405567888s';
randomPaishan('3z');
qiepai();
zimoHu();

// 第6局: 南亲, 南起 大三元, 四暗刻, 字一色
begin_tiles[1] = '1s1122555666777z';
begin_tiles[2] = '2223405567888m';
begin_tiles[3] = '2223405567888p';
begin_tiles[0] = '1113405567888s';
randomPaishan('1z', '4z');
qiepai('1s');
mingpai();
normalMoqie();
zimoHu();

// 第7局: 南亲, 南起 大三元, 字一色, 四杠子 (副露)
begin_tiles[1] = '11123555666777z';
begin_tiles[2] = '2223405567888m';
begin_tiles[3] = '2223405567888p';
begin_tiles[0] = '2223405567888s';
randomPaishan('1z', '2567z');
qiepai('3z');
normalMoqie();
mingpai();
mopai();
comboMopai(3);
hupai();

// 第8局: 南亲, 南起 四暗刻, 字一色, 小四喜
begin_tiles[1] = '1s1112223344555z';
begin_tiles[2] = '2223405567888m';
begin_tiles[3] = '2223405567888p';
begin_tiles[0] = '1113405567888s';
randomPaishan('3z', '6z');
qiepai('1s');
mingpai();
normalMoqie();
zimoHu();

// 第9局: 南亲, 南起 字一色, 小四喜, 四杠子 (副露)
begin_tiles[1] = '1112223334z5557z';
begin_tiles[2] = '2223405567888m';
begin_tiles[3] = '2223405567888p';
begin_tiles[0] = '2223405567888s';
randomPaishan('5z', '4123z');
qiepai();
normalMoqie();
mingpai();
mopai();
comboMopai(3);
hupai();
