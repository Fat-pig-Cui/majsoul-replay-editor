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
    category: 2,
    meta: {mode_id: 13},
    mode: {
        mode: 1,
        detail_rule: {
            _no_zhenting: true,
            init_point: 200000,
        }
    }
};

// 牌全是6z, 旧版演示视频: https://www.bilibili.com/video/BV1xZmZYKEbz
tiles0 = '66666666666666z';
tiles1 = '6666666666666z';
tiles2 = '6666666666666z';
tiles3 = '6666666666666z';
paishan = separate('66666666666666666666666666666666666666666666666666666666666666666666666666666666666z');
roundbegin();
combomopai(4);
hupai();

// 庄手牌全是7z, 旧版演示视频: https://www.bilibili.com/video/BV1GVSgYUEyf
tiles0 = '77777777777777z';
tiles1 = '1112340678999m';
tiles2 = '1112340678999p';
tiles3 = '1112340678999s';
roundbegin();
hupai();

// 无限立直, 第一次立直之后再次立直, 本质上都是无效的, 只有发声和牌横着的效果, 没有放立直棒动作, 也不影响立直番数和一发的计算
// 旧版演示视频: https://www.bilibili.com/video/BV1tPBtYbEDu
tiles0 = '123456789s11167z';
tiles1 = '1112340678999m';
tiles2 = '1112340678999p';
tiles3 = '1112340678999s';
randompaishan('', '666z............');
roundbegin();
qiepai(true);
for (let i = 0; i < 17; i++) {
    normalmoqie(3);
    moqieliqi();
}
normalmoqie();
hupai();

// 无振听模式, 手牌全是红宝牌的暗杠与算番, 至于百位无法显示的问题, 已经解决
// 旧版演示视频: https://www.bilibili.com/video/BV1D9iyY3EUJ
tiles0 = '00000000000067p';
tiles1 = '1112340678999m';
tiles2 = '1111236789999p';
tiles3 = '1112340678999s';
randompaishan('00p', '4p.4p.4p.4p.000p');
roundbegin();
combomopai(3);
qiepai('7p');
normalmoqie();
mingqiepai('00p');
normalmoqie();
hupai();
