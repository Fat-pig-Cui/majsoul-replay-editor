clearProject();

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
            wanxiangxiuluo_mode: true,
        }
    }
};

tiles0 = 'b145678m22349p19s';
tiles1 = 'b23p237s1236666z';
tiles2 = 'b19m14569p23688s';
tiles3 = 'b1p17s112233444z';
randomPaishan('7s7s', '7z....');
roundBegin();
huansanzhang('9p19s', '123z', '19m1p', '1p17s', 1);
hupai();

zimoHu();

zimoHu(true);
