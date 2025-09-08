clearProject();

// Q: 有牌型满足这样的条件:
//      1. 门清且没有暗杠
//      2. 手牌摸牌到14张时, 切里面的任何一张牌都会听牌
//      3. 上述的所有听牌都是役满牌型的听牌
//      4. 所有听牌都役满确定的, 且可能不会振听
//  问这种牌型是什么?
// A: 两种可能
//  1) 111222333444z + 任意一个顺子去掉一张牌, 如 12m111222333444z, 役满是 小四喜(听3m) 或 大四喜和四暗刻单骑(听1m或2m)
//  2) 22224444888s666z, 役满是 绿一色, 听牌是 3s

player_datas[0].nickname = '一姬-契约';
player_datas[1].nickname = '新年初诣';
player_datas[2].nickname = '一姬当千';
player_datas[3].nickname = '绮春歌';
player_datas[0].avatar_id = 400102;
player_datas[1].avatar_id = 400104;
player_datas[2].avatar_id = 400105;
player_datas[3].avatar_id = 400106;

config = {
    category: 1,
    meta: {mode_id: 0},
    mode: {
        mode: 1,
        detail_rule: {
            init_point: 200000,
        }
    }
};

// ===================== 第一部分 =====================

// 第1局, 切1m
tiles0 = '12m111222333444z';
tiles1 = '9m555566667777z';
tiles2 = '1112340678999p';
tiles3 = '1112340678999s';
randomPaishan('2m');
roundBegin();
qiepai('1m');
normalMoqie();
hupai();

scores = [200000, 200000, 200000, 200000];
// 第2局, 切2m
tiles0 = '12m111222333444z';
tiles1 = '9m555566667777z';
tiles2 = '1112340678999p';
tiles3 = '1112340678999s';
randomPaishan('1m');
roundBegin();
qiepai('2m');
normalMoqie();
hupai();

scores = [200000, 200000, 200000, 200000];
// 第3局, 切1z
tiles0 = '12m111222333444z';
tiles1 = '9m555566667777z';
tiles2 = '1112340678999p';
tiles3 = '1112340678999s';
randomPaishan('3m');
roundBegin();
qiepai('1z');
normalMoqie();
hupai();

scores = [200000, 200000, 200000, 200000];
// 第4局, 切2z
tiles0 = '12m111222333444z';
tiles1 = '9m555566667777z';
tiles2 = '1112340678999p';
tiles3 = '1112340678999s';
randomPaishan('3m');
roundBegin();
qiepai('2z');
normalMoqie();
hupai();

scores = [200000, 200000, 200000, 200000];
// 第5局, 切3z
tiles0 = '12m111222333444z';
tiles1 = '9m555566667777z';
tiles2 = '1112340678999p';
tiles3 = '1112340678999s';
randomPaishan('3m');
roundBegin();
qiepai('3z');
normalMoqie();
hupai();

scores = [200000, 200000, 200000, 200000];
// 第6局, 切4z
tiles0 = '12m111222333444z';
tiles1 = '9m555566667777z';
tiles2 = '1112340678999p';
tiles3 = '1112340678999s';
randomPaishan('3m');
roundBegin();
qiepai('4z');
normalMoqie();
hupai();

// ===================== 第二部分 =====================

scores = [200000, 200000, 200000, 200000];
// 第7局, 切2s
tiles0 = '22224444888s666z';
tiles1 = '1112340678999m';
tiles2 = '1112340678999p';
tiles3 = '1111333055577s';
randomPaishan('3s');
roundBegin();
qiepai('2s');
normalMoqie();
hupai();

scores = [200000, 200000, 200000, 200000];
// 第8局, 切4s
tiles0 = '22224444888s666z';
tiles1 = '1112340678999m';
tiles2 = '1112340678999p';
tiles3 = '1111333055577s';
randomPaishan('3s');
roundBegin();
qiepai('4s');
normalMoqie();
hupai();

scores = [200000, 200000, 200000, 200000];
// 第9局, 切8s
tiles0 = '22224444888s666z';
tiles1 = '1112340678999m';
tiles2 = '1112340678999p';
tiles3 = '1111333055577s';
randomPaishan('3s');
roundBegin();
qiepai('8s');
normalMoqie();
hupai();

scores = [200000, 200000, 200000, 200000];
// 第10局, 切6z
tiles0 = '22224444888s666z';
tiles1 = '1112340678999m';
tiles2 = '1112340678999p';
tiles3 = '1111333055577s';
randomPaishan('3s');
roundBegin();
qiepai('6z');
normalMoqie();
hupai();
