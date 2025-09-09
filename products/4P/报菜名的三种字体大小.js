clearProject();

// 雀魂报的菜名有三种字体大小, 与菜名条数的多少有关系(注意, 立直情况下里宝牌即使没中也算)
// 最常见的就是能容纳至多 8 条菜名的'大号字体', 菜名条数在 [1, 8] 内
// 然后是能容纳至多 12 条菜名的'小号字体', 菜名条数在 [9, 12] 内, 若出现则至少是倍满
// 最后是能容纳至多 15 条菜名的'特小号字体', 菜名条数在 [13, 15] 内, 若出现则至少累计役满
// 超过15条的菜名汇报时会吞掉(但最终番数不影响), 目前在段位场只有三麻(最多16条)能做到, 四麻最多15条

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
            init_point: 50000,
        }
    }
};

// 8条菜名, 至少7番: 立直, 一发, 自摸, 平和, 一杯口, 断幺九, 宝牌1, 里宝牌0
begin_tiles[0] = '223344m4p144567s1z';
begin_tiles[1] = '1112340678999m';
begin_tiles[2] = '1112340678999p';
begin_tiles[3] = '1133440678999s';
randomPaishan('5pHHH6p', '65p....');
roundBegin();
qiepai('1s');
mingQiepai('9s');
moqieLiqi('1z');
normalMoqie(3);
zimoHu();

// 9条菜名, 至少8番: 立直, 一发, 自摸, 平和, 一杯口, 断幺九, 宝牌1, 红宝牌1, 里宝牌0
begin_tiles[0] = '223344m4p144567s1z';
begin_tiles[1] = '1112340678999m';
begin_tiles[2] = '1112345678999p';
begin_tiles[3] = '1133440678999s';
randomPaishan('0pHHH6p', '65p....');
roundBegin();
qiepai('1s');
mingQiepai('9s');
moqieLiqi('1z');
normalMoqie(3);
zimoHu();

// 12条菜名, 至少12番: 立直, 一发, 海底摸月, 门前清自摸和, 白, 发, 东, 连东, 三暗刻, 宝牌1, 宝牌1, 里宝牌0
begin_tiles[0] = '5p789s1112z555666z';
begin_tiles[1] = '22220558888m55p';
begin_tiles[2] = '3333444467777p';
begin_tiles[3] = '11222240555s22z';
randomPaishan('', '0p........2z6s....');
roundBegin();
qiepai('2z');
mingQiepai('4s');
normalMoqie(64);
moqieLiqi();
normalMoqie(3);
zimoHu();

// 13条菜名, 至少14番: 立直, 一发, 海底摸月, 门前清自摸和, 白, 发, 东, 连东, 三杠子, 三暗刻, 宝牌1, 宝牌1, 里宝牌0
begin_tiles[0] = '5p789s1111z555666z';
begin_tiles[1] = '22220558888m55p';
begin_tiles[2] = '1122224055599s';
begin_tiles[3] = '3333444467777p';
randomPaishan('', '0p.....3333222z6s.9s65z');
roundBegin();
comboMopai(3);
qiepai('9s');
mingQiepai('4s');
normalMoqie(61);
moqieLiqi();
normalMoqie(3);
zimoHu();

// 14条菜名, 至少17番: 立直, 一发, 海底摸月, 门前清自摸和, 白, 发, 东, 连东, 三杠子, 三暗刻, 混一色, 宝牌1, 宝牌1, 里宝牌0
begin_tiles[0] = '5789s1111z555666z';
begin_tiles[1] = '22220558888m55p';
begin_tiles[2] = '1122224556699s';
begin_tiles[3] = '3333444467777p';
randomPaishan('', '0s.....3333222z6s.9s65z');
roundBegin();
comboMopai(3);
qiepai('9s');
mingQiepai('4s');
normalMoqie(61);
moqieLiqi();
normalMoqie(3);
zimoHu();
