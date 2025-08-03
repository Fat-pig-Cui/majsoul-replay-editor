clearproject();

// 无宝累满
// 111999m5556677z 6z
// 1112233778899m 1m

// 非清一色无宝断幺最高三倍满
// 88m88p 22222m 22222p 22222s 8m  12番
// 68m88p 22222m 22222p 22222s 7m  11番

// 大车轮: 无论怎么和都一定有 平和, 两杯口, 断幺, 清一色, 加上 立直 和 自摸, 刚好13番
// 22334455667788p

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

// 对对和, 三暗刻, 小三元, 混老头, 混一色  13番
tiles0 = '111999m15556677z';
tiles1 = '2223455567888m';
tiles2 = '1112340678999p';
tiles3 = '1112340678999s';
randompaishan('6z', '1z....');
roundbegin();
qiepai('1z');
normalmoqie();
hupai();

// 平和(也可以换成 门前清自摸和), 两杯口, 纯全带幺九, 清一色  13番
tiles0 = '1112233778899m1z';
tiles1 = '4444055566667m';
tiles2 = '1112340678999p';
tiles3 = '1112340678999s';
randompaishan('1m', '1z....');
roundbegin();
qiepai();
normalmoqie();
hupai();

// 双立直, 河底, 断幺, 三色同刻, 三杠子, 对对和, 三暗刻  12番
tiles0 = '22288m22288p222s1z';
tiles1 = '1111340678999m';
tiles2 = '1111340678999p';
tiles3 = '1111340678999s';
randompaishan('...2m', '8m.....22223333z8p.2s2p');
roundbegin();
qiepai(true);
normalmoqie(3);
mopai();
combomopai(3);
qiepai();
normalmoqie(62);
hupai();

// 立直, 一发, 海底, 自摸, 断幺, 三色同刻, 三杠子, 三暗刻  11番
tiles0 = '222268m22288p222s';
tiles1 = '1111340678999m';
tiles2 = '1111330678999p';
tiles3 = '1111340678999s';
randompaishan('', '77m....22223333z7m3p2s2p');
roundbegin();
combomopai(3);
qiepai();
mingqiepai('9p');
normalmoqie(61);
moqieliqi();
normalmoqie(3);
zimohu();

// 立直, 自摸, 平和, 两杯口, 断幺, 清一色  13番
tiles0 = '1m2233445667788p';
tiles1 = '1112340678999p';
tiles2 = '1112340678999s';
tiles3 = '1122306678999m';
randompaishan('2m5p', '11z....');
roundbegin();
qiepai('1m');
mingqiepai('3m');
moqieliqi();
mingqiepai('6m');
zimohu();
