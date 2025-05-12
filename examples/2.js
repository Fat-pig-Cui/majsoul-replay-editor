loadproject();

editdata.player_datas[0].nickname = "电脑0";
editdata.player_datas[1].nickname = "电脑1";
editdata.player_datas[2].nickname = "电脑2";
editdata.player_datas[0].avatar_id = 400101;
editdata.player_datas[1].avatar_id = 400101;
editdata.player_datas[2].avatar_id = 400101;
editdata.config = {
    'category': 1,
    'meta': {'mode_id': 0},
    'mode': {
        'mode': 11,
        'detail_rule': {
            'init_point': 100000,
            'dora_count': 2,
            'fanfu': 1,
            'begin_open_mode': false,
            'chuanma': false,
            'dora3_mode': false,
            'guyi_mode': false,
            'huansanzhang': false,
            'open_hand': false,
            'muyu_mode': false,
            'xuezhandaodi': false,
        }
    }
};

tiles0 = "111s11125566777z";
tiles1 = "1m222333444688s";
tiles2 = "1m111222333p688s";
paishan = randompaishan("66s4z", "2s5z999m33336z9999s65z9m71z1s444z");
roundbegin();
qiepai("2z", true);
mopai();
qiepai("1m", true);
mopai();
qiepai("1m", true);
mopai();
for (let i = 0; i < 7; i++) {
    leimingpai();
    mopai();
}
while (getlstaction(1).data.left_tile_count >= 2) {
    qiepai();
    mopai();
}
leimingpai();
mopai();
qiepai();
hupai();

tiles0 = "1122334567899s4z";
tiles1 = "1m444055667789s";
tiles2 = "1m111222333p688s";
paishan = randompaishan("", "9s");
roundbegin();
leimingpai();
mopai();
hupai();

tiles0 = "1199m123456789p4z";
tiles1 = "2223334448888s";
tiles2 = "1199m123456789p";
paishan = randompaishan();
roundbegin();
leimingpai();
mopai();
qiepai(true);
mopai();
qiepai("8s", true);
{
    let tingpais = calctingpai(1);

    function hule(t, tingpais) {
        for (let i = 0; i < tingpais.length; i++)
            if (equaltile(tingpais[i].tile, t))
                return true;
        return false;
    }

    mopai();
    if (getlstaction().data.tile !== "4z")
        qiepai(true);
    else
        leimingpai();
    if (hule(getlstaction().data.tile, tingpais))
        hupai();
    else {
        if (getlstaction().name === "RecordBaBei") {
            mopai();
            if (getlstaction().data.tile !== "4z")
                qiepai(true);
            else
                leimingpai();
            if (hule(getlstaction().data.tile, tingpais))
                hupai();
            if (getlstaction().name === "RecordBaBei") {
                mopai();
                if (getlstaction().data.tile !== "4z")
                    qiepai(true);
                else
                    leimingpai();
                if (hule(getlstaction().data.tile, tingpais))
                    hupai();
            }
        } else {
            while (getlstaction(2).data.left_tile_count >= 1) {
                mopai();
                let seat = getlstaction().data.seat, tile = getlstaction().data.tile;
                if (hule(tile, tingpais)) {
                    if (seat !== 1 && tile !== "4z")
                        qiepai();
                    else if (seat !== 1)
                        leimingpai();
                    hupai();
                    break;
                } else if (tile === "4z")
                    leimingpai();
                else
                    qiepai();
                if (getlstaction(2).data.left_tile_count === 0) {
                    notileliuju();
                    break;
                }
            }
        }
    }
}
