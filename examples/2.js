clearProject();

player_datas[0].nickname = '电脑0';
player_datas[1].nickname = '电脑1';
player_datas[2].nickname = '电脑2';
player_datas[0].avatar_id = 400101;
player_datas[1].avatar_id = 400101;
player_datas[2].avatar_id = 400101;

setConfig({
    category: 1,
    meta: {mode_id: 0},
    mode: {
        mode: 11,
        detail_rule: {
            init_point: 100000,
            dora_count: 2,
            fanfu: 1,
            begin_open_mode: false,
            chuanma: false,
            dora3_mode: false,
            guyi_mode: false,
            open_hand: false,
            muyu_mode: false,
            xuezhandaodi: false,
        }
    }
});

begin_tiles[0] = '111s11125566777z';
begin_tiles[1] = '1m222333444688s';
begin_tiles[2] = '1m111222333p688s';
randomPaishan('66s4z', '2s5z999m33336z9999s65z9m71z1s444z');
qiepai('2z', true);
mopai();
qiepai('1m', true);
mopai();
qiepai('1m', true);
mopai();
for (let i = 0; i < 7; i++) {
    zimingpai();
    mopai();
}
while (getLstAction(1).data.left_tile_count >= 2) {
    qiepai();
    mopai();
}
zimingpai();
mopai();
qiepai();
hupai();

begin_tiles[0] = '1122334567899s4z';
begin_tiles[1] = '1m444055667789s';
begin_tiles[2] = '1m111222333p688s';
randomPaishan('', '9s');
zimingpai();
mopai();
hupai();

begin_tiles[0] = '1199m123456789p4z';
begin_tiles[1] = '2223334448888s';
begin_tiles[2] = '1199m123456789p';
zimingpai();
mopai();
qiepai(true);
mopai();
qiepai('8s', true);
(function () {
    const tmp_tingpais = calcTingpai(1);
    let is_first_2 = false; // 2号玩家是否已经立直
    let is_huled = false; // 是否已经胡牌
    while (getLeftTileCnt() !== 0) {
        mopai();
        if (calcHupai(player_tiles[getLstAction().data.seat]) !== 0) {
            hupai();
            is_huled = true;
            break;
        } else {
            if (getLstAction().data.tile === '4z') {
                zimingpai();
                if (isEqualTile('4z', tmp_tingpais[0].tile)) {
                    hupai();
                    is_huled = true;
                    break;
                } else
                    continue;
            }
            if (!is_first_2 && getLstAction().data.seat === 2) {
                is_first_2 = true;
                qiepai(true);
            } else
                qiepai();
            const is_fangchong = tmp_tingpais.some(tingpai =>
                isEqualTile(getLstAction().data.tile, tingpai.tile)
            );
            if (is_fangchong) {
                hupai();
                is_huled = true;
                break;
            }
        }
    }
    if (!is_huled)
        huangpai();
})();
