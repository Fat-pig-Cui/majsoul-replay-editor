clearProject();

// 暗牌如果没有被开, 那么可以当成幺九牌, 所以这个模式可以做到四家流满

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
            reveal_discard: true,
        }
    }
};

begin_tiles[0] = '22223444666888s';
begin_tiles[1] = '2228m333557777s';
begin_tiles[2] = '233344447777m0s';
begin_tiles[3] = '05556666888m08p';
randomPaishan('', 'Y864s');
roundBegin();
comboMopai(4);
qiepai(true);
for (let i = 0; i < 65; i++) {
    mopai();
    if (judgeTile(getLstAction().data.tile, 'Y'))
        qiepai();
    else
        qiepai('anpai');
}
huangpai();
