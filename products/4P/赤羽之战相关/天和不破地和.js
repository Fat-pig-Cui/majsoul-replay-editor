clearproject();

// 赤羽之战的天和是不破地和的, 有汪汪录佐证: 137期片尾 https://www.bilibili.com/video/BV1jX4y1P7zi

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
            chuanma: true,
            init_point: 100000,
        }
    }
};

tiles0 = '11234567899m159s';
tiles1 = '357m1123467899p';
tiles2 = '159m1123467899s';
tiles3 = '2224466888m159p';
randompaishan('5p5s5m');
roundbegin();
huansanzhang('159s', '357m', '159m', '159p', 1);
dingque('psmp');
hupai();

zimohu();

zimohu(true);
