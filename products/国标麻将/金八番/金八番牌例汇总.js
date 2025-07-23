clearproject();

player_datas[0].nickname = '一姬-契约';
player_datas[1].nickname = '新年初诣';
player_datas[2].nickname = '一姬当千';
player_datas[3].nickname = '绮春歌';
player_datas[0].avatar_id = 400102;
player_datas[1].avatar_id = 400104;
player_datas[2].avatar_id = 400105;
player_datas[3].avatar_id = 400106;

config = {
    'category': 1,
    'meta': {'mode_id': 0},
    'mode': {
        'mode': 1,
        'detail_rule': {
            'init_point': 50000,
            '_guobiao': true,
            '_guobiao_lianzhuang': true,
        }
    }
};

// 第1局: 幺九刻*1, 一般高, 连六, 边张 (明杠, 缺一门, 无字, 自摸)
tiles0 = '1112m44556689p57z';
tiles1 = '1112345678999s';
tiles2 = '2224445666888s';
tiles3 = '1112223344556z';
paishan = randompaishan('1m7p', '2m');
roundbegin();
qiepai();
normalmoqie();
mingpai();
normalmoqie('5z');
mingqiepai();
zimohu();

// 第2局: 幺九刻*1, 一般高, 连六, 坎张 (明杠, 缺一门, 无字, 自摸)
tiles0 = '1112m44556679p57z';
tiles1 = '1112345678999s';
tiles2 = '2224445666888s';
tiles3 = '1112223344556z';
paishan = randompaishan('1m8p', '2m');
roundbegin();
qiepai();
normalmoqie();
mingpai();
normalmoqie('5z');
mingqiepai();
zimohu();

// 第3局: 幺九刻*1, 一般高, 连六, 单钓将 (明杠, 缺一门, 无字, 自摸)
tiles0 = '1112m44556689p57z';
tiles1 = '1112345678999s';
tiles2 = '2224445666888s';
tiles3 = '1112223344556z';
paishan = randompaishan('1m2m', '7p');
roundbegin();
qiepai();
normalmoqie();
mingpai();
normalmoqie('5z');
mingqiepai();
zimohu();

// 第4局: 幺九刻*1, 一般高, 老少副, 边张 (明杠, 缺一门, 无字, 自摸)
tiles0 = '1112m11223389p57z';
tiles1 = '1112345678999s';
tiles2 = '2224445666888s';
tiles3 = '1112223344556z';
paishan = randompaishan('1m7p', '2m');
roundbegin();
qiepai();
normalmoqie();
mingpai();
normalmoqie('5z');
mingqiepai();
zimohu();

// 第5局: 幺九刻*1, 一般高, 老少副, 坎张 (明杠, 缺一门, 无字, 自摸)
tiles0 = '1112m11223379p57z';
tiles1 = '1112345678999s';
tiles2 = '2224445666888s';
tiles3 = '1112223344556z';
paishan = randompaishan('1m8p', '2m');
roundbegin();
qiepai();
normalmoqie();
mingpai();
normalmoqie('5z');
mingqiepai();
zimohu();

// 第6局: 幺九刻*1, 一般高, 老少副, 单钓将 (明杠, 缺一门, 无字, 自摸)
tiles0 = '1112m11223389p57z';
tiles1 = '1112345678999s';
tiles2 = '2224445666888s';
tiles3 = '1112223344556z';
paishan = randompaishan('1m2m', '7p');
roundbegin();
qiepai();
normalmoqie();
mingpai();
normalmoqie('5z');
mingqiepai();
zimohu();

// 第7局: 幺九刻*1, 一般高, 喜相逢, 边张 (明杠, 缺一门, 无字, 自摸)
tiles0 = '1112778899m89p57z';
tiles1 = '1112345678999s';
tiles2 = '2224445666888s';
tiles3 = '1112223344556z';
paishan = randompaishan('1m7p', '2m');
roundbegin();
qiepai();
normalmoqie();
mingpai();
normalmoqie('5z');
mingqiepai();
zimohu();


// 第8局: 幺九刻*1, 一般高, 喜相逢, 坎张 (明杠, 缺一门, 无字, 自摸)
tiles0 = '1112778899m79p57z';
tiles1 = '1112345678999s';
tiles2 = '2224445666888s';
tiles3 = '1112223344556z';
paishan = randompaishan('1m8p', '2m');
roundbegin();
qiepai();
normalmoqie();
mingpai();
normalmoqie('5z');
mingqiepai();
zimohu();

// 第9局: 幺九刻*1, 一般高, 喜相逢, 单钓将 (明杠, 缺一门, 无字, 自摸)
tiles0 = '1112778899m89p57z';
tiles1 = '1112345678999s';
tiles2 = '2224445666888s';
tiles3 = '1112223344556z';
paishan = randompaishan('1m2m', '7p');
roundbegin();
qiepai();
normalmoqie();
mingpai();
normalmoqie('5z');
mingqiepai();
zimohu();


// 第10局: 幺九刻*1, 连六, 喜相逢, 边张 (明杠, 缺一门, 无字, 自摸)
tiles0 = '1112456789m89p57z';
tiles1 = '1112345678999s';
tiles2 = '2224445666888s';
tiles3 = '1112223344556z';
paishan = randompaishan('1m7p', '2m');
roundbegin();
qiepai();
normalmoqie();
mingpai();
normalmoqie('5z');
mingqiepai();
zimohu();

// 第11局: 幺九刻*1, 连六, 喜相逢, 坎张 (明杠, 缺一门, 无字, 自摸)
tiles0 = '1112456789m79p57z';
tiles1 = '1112345678999s';
tiles2 = '2224445666888s';
tiles3 = '1112223344556z';
paishan = randompaishan('1m8p', '2m');
roundbegin();
qiepai();
normalmoqie();
mingpai();
normalmoqie('5z');
mingqiepai();
zimohu();

// 第12局: 幺九刻*1, 连六, 喜相逢, 单钓将 (明杠, 缺一门, 无字, 自摸)
tiles0 = '1112456789m89p57z';
tiles1 = '1112345678999s';
tiles2 = '2224445666888s';
tiles3 = '1112223344556z';
paishan = randompaishan('1m2m', '7p');
roundbegin();
qiepai();
normalmoqie();
mingpai();
normalmoqie('5z');
mingqiepai();
zimohu();


// 第13局: 幺九刻*1, 老少副, 喜相逢, 边张 (明杠, 缺一门, 无字, 自摸)
tiles0 = '1112789m12389p57z';
tiles1 = '1112345678999s';
tiles2 = '2224445666888s';
tiles3 = '1112223344556z';
paishan = randompaishan('1m7p', '2m');
roundbegin();
qiepai();
normalmoqie();
mingpai();
normalmoqie('5z');
mingqiepai();
zimohu();

// 第14局: 幺九刻*1, 老少副, 喜相逢, 坎张 (明杠, 缺一门, 无字, 自摸)
tiles0 = '1112789m12379p57z';
tiles1 = '1112345678999s';
tiles2 = '2224445666888s';
tiles3 = '1112223344556z';
paishan = randompaishan('1m8p', '2m');
roundbegin();
qiepai();
normalmoqie();
mingpai();
normalmoqie('5z');
mingqiepai();
zimohu();

// 第15局: 幺九刻*1, 老少副, 喜相逢, 单钓将 (明杠, 缺一门, 无字, 自摸)
tiles0 = '1112789m12389p57z';
tiles1 = '1112345678999s';
tiles2 = '2224445666888s';
tiles3 = '1112223344556z';
paishan = randompaishan('1m2m', '7p');
roundbegin();
qiepai();
normalmoqie();
mingpai();
normalmoqie('5z');
mingqiepai();
zimohu();


// 第16局: 幺九刻*2, 一般高, 边张 (明杠, 缺一门, 无字, 自摸)
tiles0 = '1112999m78899p57z';
tiles1 = '1112345678999s';
tiles2 = '2224445666888s';
tiles3 = '1112223344556z';
paishan = randompaishan('1m7p', '2m');
roundbegin();
qiepai();
normalmoqie();
mingpai();
normalmoqie('5z');
mingqiepai();
zimohu();

// 第17局: 幺九刻*2, 一般高, 坎张 (明杠, 缺一门, 无字, 自摸)
tiles0 = '1112999m77899p57z';
tiles1 = '1112345678999s';
tiles2 = '2224445666888s';
tiles3 = '1112223344556z';
paishan = randompaishan('1m8p', '2m');
roundbegin();
qiepai();
normalmoqie();
mingpai();
normalmoqie('5z');
mingqiepai();
zimohu();

// 第18局: 幺九刻*2, 一般高, 单钓将 (明杠, 缺一门, 无字, 自摸)
tiles0 = '1112999m78899p57z';
tiles1 = '1112345678999s';
tiles2 = '2224445666888s';
tiles3 = '1112223344556z';
paishan = randompaishan('1m2m', '7p');
roundbegin();
qiepai();
normalmoqie();
mingpai();
normalmoqie('5z');
mingqiepai();
zimohu();


// 第19局: 幺九刻*2, 连六, 边张 (明杠, 缺一门, 无字, 自摸)
tiles0 = '1112999m45689p57z';
tiles1 = '1112345678999s';
tiles2 = '2224445666888s';
tiles3 = '1112223344556z';
paishan = randompaishan('1m7p', '2m');
roundbegin();
qiepai();
normalmoqie();
mingpai();
normalmoqie('5z');
mingqiepai();
zimohu();

// 第20局: 幺九刻*2, 连六, 坎张 (明杠, 缺一门, 无字, 自摸)
tiles0 = '1112999m45679p57z';
tiles1 = '1112345678999s';
tiles2 = '2224445666888s';
tiles3 = '1112223344556z';
paishan = randompaishan('1m8p', '2m');
roundbegin();
qiepai();
normalmoqie();
mingpai();
normalmoqie('5z');
mingqiepai();
zimohu();

// 第21局: 幺九刻*2, 连六, 单钓将 (明杠, 缺一门, 无字, 自摸)
tiles0 = '1112999m45689p57z';
tiles1 = '1112345678999s';
tiles2 = '2224445666888s';
tiles3 = '1112223344556z';
paishan = randompaishan('1m2m', '7p');
roundbegin();
qiepai();
normalmoqie();
mingpai();
normalmoqie('5z');
mingqiepai();
zimohu();


// 第22局: 幺九刻*2, 老少副, 边张 (明杠, 缺一门, 无字, 自摸)
tiles0 = '1112999m12389p57z';
tiles1 = '1112345678999s';
tiles2 = '2224445666888s';
tiles3 = '1112223344556z';
paishan = randompaishan('1m7p', '2m');
roundbegin();
qiepai();
normalmoqie();
mingpai();
normalmoqie('5z');
mingqiepai();
zimohu();

// 第23局: 幺九刻*2, 老少副, 坎张 (明杠, 缺一门, 无字, 自摸)
tiles0 = '1112999m12379p57z';
tiles1 = '1112345678999s';
tiles2 = '2224445666888s';
tiles3 = '1112223344556z';
paishan = randompaishan('1m8p', '2m');
roundbegin();
qiepai();
normalmoqie();
mingpai();
normalmoqie('5z');
mingqiepai();
zimohu();

// 第24局: 幺九刻*2, 老少副, 单钓将 (明杠, 缺一门, 无字, 自摸)
tiles0 = '1112999m12389p57z';
tiles1 = '1112345678999s';
tiles2 = '2224445666888s';
tiles3 = '1112223344556z';
paishan = randompaishan('1m2m', '7p');
roundbegin();
qiepai();
normalmoqie();
mingpai();
normalmoqie('5z');
mingqiepai();
zimohu();


// 第25局: 幺九刻*2, 喜相逢, 坎张 (明杠, 缺一门, 无字, 自摸)
tiles0 = '1112678999m68p57z';
tiles1 = '1112345678999s';
tiles2 = '2224445666888s';
tiles3 = '1112223344556z';
paishan = randompaishan('1m7p', '2m');
roundbegin();
qiepai();
normalmoqie();
mingpai();
normalmoqie('5z');
mingqiepai();
zimohu();

// 第26局: 幺九刻*2, 喜相逢, 单钓将 (明杠, 缺一门, 无字, 自摸)
tiles0 = '1112678999m68p57z';
tiles1 = '1112345678999s';
tiles2 = '2224445666888s';
tiles3 = '1112223344556z';
paishan = randompaishan('1m2m', '7p');
roundbegin();
qiepai();
normalmoqie();
mingpai();
normalmoqie('5z');
mingqiepai();
zimohu();
