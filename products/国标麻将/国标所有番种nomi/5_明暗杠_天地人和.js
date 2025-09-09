clearProject();

// 从第 83 局到第 87 局

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
            _guobiao: true,
            _guobiao_no_8fanfu: true,
            _guobiao_lianzhuang: true,
        }
    }
};

// 第1(83)局: 明暗杠
begin_tiles[0] = '2222333m123p67s55z';
begin_tiles[1] = '1112223334445z';
begin_tiles[2] = '111234478899p5z';
begin_tiles[3] = '1112225555888s';
randomPaishan('3m8s');
roundBegin();
comboMopai();
qiepai();
normalMoqie();
mingpai();
normalMoqie(2);
hupai();

// 第2(84)局: 天和
begin_tiles[0] = '222345m234p789s55z';
begin_tiles[1] = '1112223334445z';
begin_tiles[2] = '1112345678999p';
begin_tiles[3] = '1112345678999s';
roundBegin();
hupai();

// 第3(85)局: 地和
begin_tiles[0] = '3m1112223334445z';
begin_tiles[1] = '22245m234p789s55z';
begin_tiles[2] = '1112345678999p';
begin_tiles[3] = '1112345678999s';
roundBegin();
qiepai('3m');
hupai();

setRound(0, 0, 3);

// 第4(86)局: 人和(自摸)
begin_tiles[0] = '11122233344456z';
begin_tiles[1] = '22245m234p789s55z';
begin_tiles[2] = '1112345678999p';
begin_tiles[3] = '1112345678999s';
randomPaishan('3m');
roundBegin();
qiepai();
zimoHu();

setRound(0, 0, 4);
// 第5(87)局: 人和(点炮)
begin_tiles[0] = '11122233344456z';
begin_tiles[1] = '1112345678999p';
begin_tiles[2] = '22245m234p789s55z';
begin_tiles[3] = '1112345678999s';
randomPaishan('3m');
roundBegin();
qiepai();
normalMoqie();
hupai();
