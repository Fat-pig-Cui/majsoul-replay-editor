clearProject();

player_datas[0].nickname = '一姬-契约';
player_datas[1].nickname = '新年初诣';
player_datas[2].nickname = '一姬当千';
player_datas[3].nickname = '绮春歌';
player_datas[0].avatar_id = 400102;
player_datas[1].avatar_id = 400104;
player_datas[2].avatar_id = 400105;
player_datas[3].avatar_id = 400106;

setConfig({
    category: 1,
    meta: {mode_id: 0},
    mode: {
        mode: 1,
        detail_rule: {
            init_point: 200000,
            chuanma: true,
            _xueliu: true,
        }
    }
});

begin_tiles[0] = '222888m22255s789p';
begin_tiles[1] = '1112345699m789s';
begin_tiles[2] = '1112345699p588s';
begin_tiles[3] = '1112345699s789m';
roundBegin();
huanpai(['789p', '789s', '588s', '789m'], 1);
dingque('psmp');
hupai();
for (let cnt = 0; cnt < 55; cnt++) {
    mopai();
    if (calcHupai(player_tiles[getLstAction().data.seat]) !== 0)
        hupai();
    else {
        qiepai();
        let seat = getLstAction().data.seat;
        let tile = getLstAction().data.tile;
        let is_fangchong = false;
        for (let i = seat + 1; i < seat + player_cnt; i++) {
            let tmp_seat = i % player_cnt;
            let tmp_tingpais = calcTingpai(tmp_seat);
            for (let j = 0; j < tmp_tingpais.length; j++)
                if (isEqualTile(tile, tmp_tingpais[j].tile)) {
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
huangpai();
