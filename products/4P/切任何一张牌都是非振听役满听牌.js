loadproject();

// Q: 有牌型满足这样的条件:
//      1. 门清且没有暗杠
//      2. 手牌摸牌到14张时, 切里面的任何一张牌都会听牌
//      3. 上述的所有听牌都是役满牌型的听牌
//      4. 所有听牌都役满确定的, 且可能不会振听
//  问这种牌型是什么?
// A: 两种可能
//  1) 111222333444z + 任意一个顺子去掉一张牌, 如 12m111222333444z, 役满是 小四喜(听3m) 或 大四喜和四暗刻单骑(听1m或2m)
//  2) 22224444888s666z, 役满是 绿一色, 听牌是 3s

editdata.player_datas[0].nickname = '一姬-契约';
editdata.player_datas[1].nickname = '新年初诣';
editdata.player_datas[2].nickname = '一姬当千';
editdata.player_datas[3].nickname = '绮春歌';
editdata.player_datas[0].avatar_id = 400102;
editdata.player_datas[1].avatar_id = 400104;
editdata.player_datas[2].avatar_id = 400105;
editdata.player_datas[3].avatar_id = 400106;

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

// ===================== 第一部分 =====================

// 第1局, 切1m
tiles0 = '12m111222333444z';
tiles1 = '9m555566667777z';
tiles2 = '1112340678999p';
tiles3 = '1112340678999s';
paishan = randompaishan('2m');
roundbegin();
qiepai('1m');
normalmoqie();
hupai();

scores = [200000, 200000, 200000, 200000];
// 第2局, 切2m
tiles0 = '12m111222333444z';
tiles1 = '9m555566667777z';
tiles2 = '1112340678999p';
tiles3 = '1112340678999s';
paishan = randompaishan('1m');
roundbegin();
qiepai('2m');
normalmoqie();
hupai();

scores = [200000, 200000, 200000, 200000];
// 第3局, 切1z
tiles0 = '12m111222333444z';
tiles1 = '9m555566667777z';
tiles2 = '1112340678999p';
tiles3 = '1112340678999s';
paishan = randompaishan('3m');
roundbegin();
qiepai('1z');
normalmoqie();
hupai();

scores = [200000, 200000, 200000, 200000];
// 第4局, 切2z
tiles0 = '12m111222333444z';
tiles1 = '9m555566667777z';
tiles2 = '1112340678999p';
tiles3 = '1112340678999s';
paishan = randompaishan('3m');
roundbegin();
qiepai('2z');
normalmoqie();
hupai();

scores = [200000, 200000, 200000, 200000];
// 第5局, 切3z
tiles0 = '12m111222333444z';
tiles1 = '9m555566667777z';
tiles2 = '1112340678999p';
tiles3 = '1112340678999s';
paishan = randompaishan('3m');
roundbegin();
qiepai('3z');
normalmoqie();
hupai();

scores = [200000, 200000, 200000, 200000];
// 第6局, 切4z
tiles0 = '12m111222333444z';
tiles1 = '9m555566667777z';
tiles2 = '1112340678999p';
tiles3 = '1112340678999s';
paishan = randompaishan('3m');
roundbegin();
qiepai('4z');
normalmoqie();
hupai();

// ===================== 第二部分 =====================

scores = [200000, 200000, 200000, 200000];
// 第7局, 切2s
tiles0 = '22224444888s666z';
tiles1 = '1112340678999m';
tiles2 = '1112340678999p';
tiles3 = '1111333055577s';
paishan = randompaishan('3s');
roundbegin();
qiepai('2s');
normalmoqie();
hupai();

scores = [200000, 200000, 200000, 200000];
// 第8局, 切4s
tiles0 = '22224444888s666z';
tiles1 = '1112340678999m';
tiles2 = '1112340678999p';
tiles3 = '1111333055577s';
paishan = randompaishan('3s');
roundbegin();
qiepai('4s');
normalmoqie();
hupai();

scores = [200000, 200000, 200000, 200000];
// 第9局, 切8s
tiles0 = '22224444888s666z';
tiles1 = '1112340678999m';
tiles2 = '1112340678999p';
tiles3 = '1111333055577s';
paishan = randompaishan('3s');
roundbegin();
qiepai('8s');
normalmoqie();
hupai();

scores = [200000, 200000, 200000, 200000];
// 第10局, 切6z
tiles0 = '22224444888s666z';
tiles1 = '1112340678999m';
tiles2 = '1112340678999p';
tiles3 = '1111333055577s';
paishan = randompaishan('3s');
roundbegin();
qiepai('6z');
normalmoqie();
hupai();
