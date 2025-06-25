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
    let tmp_tingpais = calctingpai(1);
    let first_2 = false; // 2号玩家是否已经立直
    for (let i = 0; i < 52; i++) {
        mopai();
        if (calchupai(playertiles[getlstaction().data.seat]) !== 0) {
            hupai();
            break;
        } else {
            if (getlstaction().data.tile === "4z") {
                leimingpai();
                if (equaltile("4z", tmp_tingpais[0].tile)) {
                    hupai();
                    break;
                } else
                    continue;
            }
            if (!first_2 && getlstaction().data.seat === 2) {
                first_2 = true;
                qiepai(true);
            } else
                qiepai();
            let is_fangchong = false;
            for (let j = 0; j < tmp_tingpais.length; j++) {
                if (equaltile(getlstaction().data.tile, tmp_tingpais[j].tile)) {
                    is_fangchong = true;
                    hupai();
                    break;
                }
            }
            if (is_fangchong)
                break;
        }
    }
}
if (getlstaction().name !== "RecordHule")
    notileliuju();
