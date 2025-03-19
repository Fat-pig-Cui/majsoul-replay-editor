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
            'init_point': 200000,
            'chuanma': true,
            'huansanzhang': true,
            'xueliu': true,
        }
    }
};

tiles0 = "222888m22255s789p";
tiles1 = "1112345699m789s";
tiles2 = "1112345699p588s";
tiles3 = "1112345699s789m";
paishan = randompaishan("...S");
roundbegin();
huansanzhang("789p", "789s", "588s", "789m", 1);
dingque("psmp");
hupai();
for (let cnt = 0; cnt < 55; cnt++) {
    mopai();
    if (calchupai(playertiles[getlstaction().data.seat]) !== 0)
        hupai();
    else {
        qiepai();
        let seat = getlstaction().data.seat;
        let tile = getlstaction().data.tile;
        let is_fangchong = false;
        for (let i = seat + 1; i < seat + playercnt; i++) {
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
