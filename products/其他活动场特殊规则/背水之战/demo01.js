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
            beishuizhizhan_mode: true,
        }
    }
};

begin_tiles[0] = '1999p1115556677z';
begin_tiles[1] = '222205558888m6z';
begin_tiles[2] = '222205558888s3z';
begin_tiles[3] = '3333444467777s';
randomPaishan('...9p', '4444z8888p776251z');
roundBegin();
qiepai('1p', true, [2]);
normalMoqie(3);
mopai();
comboMopai(3);
qiepai();
normalMoqie(60);
mopai();
comboMopai();
qiepai();
hupai();
