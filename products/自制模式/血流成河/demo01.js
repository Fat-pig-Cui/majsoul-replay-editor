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
            init_point: 500000,
            _xueliu: true,
        }
    }
});

begin_tiles[0] = '19m19p19s12345677z';
begin_tiles[1] = '1112340678999m';
begin_tiles[2] = '1112340678999p';
begin_tiles[3] = '1112340678999s';
randomPaishan('', 'HHMPSHMPSHMPSH');
hupai();
while (getLeftTileCnt() !== 0) {
    mopai();
    if (calcHupai(player_tiles[getLstAction().data.seat]) !== 0)
        hupai();
    else {
        qiepai();
        const seat = getLstAction().data.seat;
        const tile = getLstAction().data.tile;
        let is_fangchong = false;
        for (let i = seat + 1; i < seat + 4; i++) {
            const tmp_seat = i % 4;
            const tmp_tingpais = calcTingpai(tmp_seat);
            is_fangchong = tmp_tingpais.some(tingpai => isEqualTile(tile, tingpai.tile));
            if (is_fangchong)
                break;
        }
        if (is_fangchong)
            hupai();
    }
}
huangpai();
