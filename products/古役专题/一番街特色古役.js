clearProject();

// 八连庄放最后, 并且中间加了一个荒牌流局来破坏连续和牌

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
            _yifanjieguyi: true,
            init_point: 500000,
        }
    }
};

// 第1局: 推不倒
begin_tiles[0] = '33445888p456s557z';
begin_tiles[1] = '1334456789999m';
begin_tiles[2] = '11123447899p11z';
begin_tiles[3] = '1111222244999s';
randomPaishan('2p', '2z....');
roundBegin();
qiepai();
normalMoqie();
hupai();

// 第2局: 赤三色
begin_tiles[0] = '340m406p067s24447z';
begin_tiles[1] = '1112345678999m';
begin_tiles[2] = '1112345678999p';
begin_tiles[3] = '1112345678999s';
randomPaishan('2z', '2z....');
roundBegin();
qiepai();
normalMoqie();
hupai();

// 第3局: 三色通贯
begin_tiles[0] = '123m456p789s22447z';
begin_tiles[1] = '1112345678999m';
begin_tiles[2] = '1112345678999p';
begin_tiles[3] = '1112345678999s';
randomPaishan('2z', '2z....');
roundBegin();
qiepai();
normalMoqie();
hupai();

// 第4局: 四连刻
begin_tiles[0] = '2223334445566m7z';
begin_tiles[1] = '1112347778999m';
begin_tiles[2] = '1112345678999p';
begin_tiles[3] = '1112345678999s';
randomPaishan('5m', '2z....');
roundBegin();
qiepai();
normalMoqie();
hupai();

// 第5局: 一色四同顺
begin_tiles[0] = '2222333344455m7z';
begin_tiles[1] = '1111788889999m';
begin_tiles[2] = '1112345678999p';
begin_tiles[3] = '1112345678999s';
randomPaishan('4m', '2z....');
roundBegin();
qiepai();
normalMoqie();
hupai();

// 第6局: 红孔雀
begin_tiles[0] = '11155777999s677z';
begin_tiles[1] = '1111788889999m';
begin_tiles[2] = '1112345678999p';
begin_tiles[3] = '1112223334445z';
randomPaishan('7z', '2z....');
roundBegin();
qiepai('6z');
normalMoqie();
hupai();


// 中断连庄的小局
begin_tiles[0] = '19m19p189s1234567z';
begin_tiles[1] = '19m19p19s1234567z';
begin_tiles[2] = '19m19p19s1234567z';
begin_tiles[3] = '19m19p19s1234567z';
roundBegin();
qiepai('8s');
moqieLiuju();


// 第7局: 红一点
begin_tiles[0] = '22334466688s677z';
begin_tiles[1] = '1111788889999m';
begin_tiles[2] = '1112345678999p';
begin_tiles[3] = '1112223334445z';
randomPaishan('7z', '2z....');
roundBegin();
qiepai('6z');
normalMoqie();
hupai();

// 第8局: 黑一色
begin_tiles[0] = '222444888p11227z';
begin_tiles[1] = '1111788889999m';
begin_tiles[2] = '1112345678999s';
begin_tiles[3] = '3334445556777z';
randomPaishan('2z', '2z....');
roundBegin();
qiepai();
normalMoqie();
hupai();

// 第9局: 十三不搭
begin_tiles[0] = '159m258p37s123455z';
begin_tiles[1] = '1112340678999m';
begin_tiles[2] = '1112340678999p';
begin_tiles[3] = '1112340678999s';
randomPaishan('', '2z....');
roundBegin();
hupai();

// 第10局: 百万石
begin_tiles[0] = '6667777888899m7z';
begin_tiles[1] = '1111222233334m';
begin_tiles[2] = '1112340678999p';
begin_tiles[3] = '1112340678999s';
randomPaishan('9m', '2z....');
roundBegin();
qiepai();
normalMoqie();
hupai();

// 第11局: 金门桥
begin_tiles[0] = '1233455567789m7z';
begin_tiles[1] = '1112223344466m';
begin_tiles[2] = '1112340678999p';
begin_tiles[3] = '1112340678999s';
randomPaishan('7z0m', '2z....');
roundBegin();
qiepai();
normalMoqie(2);
hupai();

// 第12局: 东北新干线
begin_tiles[0] = '123456789m11447z';
begin_tiles[1] = '1112340678999m';
begin_tiles[2] = '1112340678999p';
begin_tiles[3] = '1112340678999s';
randomPaishan('74z', '2z....');
roundBegin();
qiepai();
normalMoqie(2);
hupai();

// 第13局: 无发绿一色
begin_tiles[0] = '2223344466688s7z';
begin_tiles[1] = '1112340678999m';
begin_tiles[2] = '1112340678999p';
begin_tiles[3] = '1112055678999s';
randomPaishan('8s', '2z....');
roundBegin();
qiepai();
normalMoqie();
hupai();

// 第14局: 八连庄
begin_tiles[0] = '123456m234567p67z';
begin_tiles[1] = '1112345678999m';
begin_tiles[2] = '1112345678999p';
begin_tiles[3] = '1112345678999s';
randomPaishan('6z', '2z....');
roundBegin();
qiepai();
normalMoqie();
hupai();
