loadproject();

editdata.player_datas[0].nickname = "一姬-契约";
editdata.player_datas[1].nickname = "新年初诣";
editdata.player_datas[2].nickname = "一姬当千";
editdata.player_datas[3].nickname = "绮春歌";
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
            'init_point': 500000,
            'xueliu': true,
        }
    }
};

tiles0 = "19m19p19s12345677z";
tiles1 = "1112340678999m";
tiles2 = "1112340678999p";
tiles3 = "1112340678999s";
paishan = randompaishan("...S", "HHMPSHMPSHMPSH");
roundbegin();
hupai();
for (let cnt = 0; cnt < 69; cnt++) {
    mopai();
    if (calchupai(playertiles[getlstaction().data.seat]) !== 0)
        hupai();
    else {
        qiepai();
        let seat = getlstaction().data.seat;
        let tile = getlstaction().data.tile;
        let is_fangchong = false;
        for (let i = seat; i < seat + playercnt; i++) {
            let tmp_seat = i % playercnt;
            let tmp_tingpais = calctingpai(tmp_seat);
            for (let j = 0; j < tmp_tingpais.length; j++)
                if (equaltile(tile, tmp_tingpais[j].tile)) {
                    is_fangchong = true;
                    break;
                }
            if (is_fangchong)
                break;
        }
        if (is_fangchong)
            hupai();
    }
}
notileliuju();
