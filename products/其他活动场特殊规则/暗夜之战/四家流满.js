loadproject();

// 暗牌如果没有被开, 那么可以当成幺九牌, 所以这个模式可以做到四家流满

editdata.player_datas[0].nickname = '一姬-契约';
editdata.player_datas[1].nickname = '新年初诣';
editdata.player_datas[2].nickname = '一姬当千';
editdata.player_datas[3].nickname = '绮春歌';
editdata.player_datas[0].avatar_id = 400102;
editdata.player_datas[1].avatar_id = 400104;
editdata.player_datas[2].avatar_id = 400105;
editdata.player_datas[3].avatar_id = 400106;

editdata.config = {
    'category': 1,
    'meta': {'mode_id': 0},
    'mode': {
        'mode': 1,
        'detail_rule': {
            'reveal_discard': true,
        }
    }
};

tiles0 = '22223444666888s';
tiles1 = '2228m333557777s';
tiles2 = '233344447777m0s';
tiles3 = '05556666888m08p';
paishan = randompaishan('', 'Y864s');
roundbegin();
combomopai(4);
qiepai(true);
for (let i = 0; i < 65; i++) {
    mopai();
    let tile = getlstaction().data.tile;
    let is_yaojiu = false;
    for (let i = 0; i < non_sptiles.duanyaojiu.length; i++)
        if (equaltile(tile, non_sptiles.duanyaojiu[i])) {
            is_yaojiu = true;
            break;
        }
    if (is_yaojiu)
        qiepai();
    else
        qiepai('anpai');
}
notileliuju();
