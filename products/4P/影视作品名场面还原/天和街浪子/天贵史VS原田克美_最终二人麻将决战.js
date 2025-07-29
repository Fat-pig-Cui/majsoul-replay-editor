clearproject();

// 南北两家的作用是在 Stage B 的时候分别代表另外两家摸打牌, 起手是随机的, 没什么用

player_datas[0].nickname = '天贵史';
player_datas[1].nickname = '天贵史-替身';
player_datas[2].nickname = '原田克美';
player_datas[3].nickname = '原田克美-替身';
player_datas[0].avatar_id = 404502; // A-37-契约
player_datas[1].avatar_id = 404501; // A-37-初始
player_datas[2].avatar_id = 408502; // 袁枫-契约
player_datas[3].avatar_id = 408501; // 袁枫-初始

config = {
    category: 4,
    meta: {mode_id: 0},
    mode: {
        mode: 1,
        detail_rule: {
            reveal_discard: true,

            _tablecloth_id: 305012,
            _mjp_id: 305724,
            dora_count: 0,
            _no_liujumanguan: true,
            _chang_ju_ben_num_: [0, 0, 1],
            _scores_: [9200, 0, 20300, 0],
            _buquanshoupai: true,
        }
    }
};

// qiepai 去掉暗牌需要支付 1000 点
origin_qiepai = qiepai;
qiepai = function (seat, tile, is_liqi, anpai, beishui_type) {
    // 判断手牌中 tile 牌是否只有刚摸的牌
    function judge_unique(seat, tile) {
        for (let i = 0; i < playertiles[seat].length - 1; i++)
            if (playertiles[seat][i] === tile)
                return false;
        return true;
    }

    function preprocess() {
        let obj = {};
        let mat = [seat, tile, is_liqi, anpai, beishui_type];
        for (let i = 0; i < mat.length; i++) {
            if (mat[i] === 'anpai')
                obj.anpai = mat[i];
            else if (typeof mat[i] == 'number')
                obj.seat = mat[i];
            else if (typeof mat[i] == 'boolean' || mat[i] === 'kailiqi')
                obj.is_liqi = mat[i];
            else if (mat[i] instanceof Array && typeof mat[i][0] === 'number')
                obj.beishui_type = mat[i][0];
            else if (typeof mat[i] == 'string')
                obj.tile = mat[i];
        }
        return [obj.seat, obj.tile, obj.is_liqi, obj.anpai, obj.beishui_type];
    }

    baogangseat = -1;
    [seat, tile, is_liqi, anpai, beishui_type] = preprocess()

    if (seat === undefined) {
        let lstaction = getlstaction();
        if (lstaction.name === 'RecordNewRound')
            seat = ju;
        else
            seat = lstaction.data.seat;
    }
    if (is_liqi === undefined)
        is_liqi = false;
    if (anpai === undefined)
        anpai = false;
    if (beishui_type === undefined)
        beishui_type = 0;

    let moqie = true;
    if (tile === playertiles[seat][playertiles[seat].length - 1] && !judge_unique(seat, tile))
        moqie = false;
    if (tile === undefined && discardtiles[seat].length !== 0)
        tile = discardtiles[seat].shift();
    if (tile === undefined || tile === '..')
        tile = playertiles[seat][playertiles[seat].length - 1];
    let lstaction = getlstaction();
    moqie = moqie && playertiles[seat][playertiles[seat].length - 1] === tile && lstaction.name !== 'RecordNewRound' && lstaction.name !== 'RecordChiPengGang';

    let is_wliqi = false, is_kailiqi = false;
    if (is_liqi && liqiinfo[seat].yifa !== 0 && liqiinfo[seat].liqi === 0)
        is_wliqi = true;
    if (is_liqi === 'kailiqi') {
        is_liqi = true;
        is_kailiqi = true;
    } else if (is_liqi)
        is_liqi = true;
    if (is_liqi)
        lstliqi = {seat: seat, type: 1};
    if (is_wliqi)
        lstliqi.type = 2;
    if (doracnt.lastype === 1) {
        doracnt.cnt += 1 + doracnt.bonus;
        doracnt.licnt += 1 + doracnt.bonus;
        doracnt.bonus = doracnt.lastype = 0;
    }

    for (let i = playertiles[seat].length - 1; i >= 0; i--) {
        if (tile === playertiles[seat][i]) {
            playertiles[seat][i] = playertiles[seat][playertiles[seat].length - 1];
            playertiles[seat][playertiles[seat].length - 1] = tile;
            break;
        }
        if (i === 0) { // 要切的牌手牌中没有, 则报错
            console.error(roundinfo() + `seat: ${seat} 手牌不存在要切的牌: ${tile}`);
            return;
        }
    }

    let tile_state;
    if (is_openhand())
        tile_state = 1;

    if (is_peipaimingpai())
        tile_state = erasemingpai(seat, tile);
    paihe[seat].tiles.push(tile);
    let abc = tiletoint(tile);
    if (!(is_anye() && anpai === 'anpai'))
        if (abc !== 1 && abc !== 9 && abc !== 10 && abc !== 18 && abc !== 19 && abc !== 27 && abc <= 27)
            paihe[seat].liujumanguan = false;
    if (liqiinfo[seat].yifa > 0)
        liqiinfo[seat].yifa--;
    for (let i = 0; i < playertiles[seat].length; i++)
        if (playertiles[seat][i] === tile) {
            playertiles[seat][i] = playertiles[seat][playertiles[seat].length - 1];
            playertiles[seat].pop();
            break;
        }

    if (is_anye() && anpai === 'anpai')
        addRevealTile(is_liqi, is_wliqi, moqie, seat, tile);
    else {
        addDiscardTile(is_liqi, is_wliqi, moqie, seat, tile, calctingpai(seat), tile_state, is_kailiqi, beishui_type);

        update_shezhangzt(seat);
        update_prezhenting(seat, tile);
    }
    playertiles[seat].sort(cmp);
}
// 修改点数变化
origin_endHule = endHule;
endHule = function (HuleInfo) {
    delta_scores = [12300, 0, 0, 0];
    scores = [21500, 0, 20300, 0];
    actions.push({
        name: 'RecordHule',
        data: {
            delta_scores: delta_scores.slice(),
            hules: HuleInfo,
            old_scores: [9200, 0, 20300, 0],
            scores: scores.slice(),
            baopai: 0
        }
    });
}

tiles0 = '6m6779p135s123455z';
tiles2 = '33m888p24679s136z';
paishan = randompaishan('3z7z8m7z9m5z4z4m1m6z6s2m6s1p2m9s3z2m7z3s1z9p1m6s2z5m2z4z5m2z9p4p3p1s4z2s..1z3m5m5p4m..1s2p6z9p7s..3p7z3m', '8p.1m...4p');
dealtiles = ['', '', '', '9s7z1s5z6s1p'];
discardtiles = ['4z9p7p2z3z1m1z7p6p3z6m1z4m2z2z5m9p3p4z5s', '', '1z8m9m6z9s4z6z1p9s4s2s9p3s5m4z2z4p1s2s', ''];
roundbegin();
// Stage A
qiepai();
for (let i = 0; i < 4; i++) {
    mopai(2);
    qiepai();
    mopai(0);
    qiepai();
}
mingpai();
qiepai();
for (let i = 0; i < 14; i++) {
    mopai(0);
    qiepai();
    mopai(2);
    qiepai();
}
mingpai(0, '13s');
qiepai();

// Stage B
for (let i = 0; i < 2; i++) {
    mopai(3);
    qiepai();
}
for (let i = 0; i < 5; i++) {
    mopai(1);
    if (i === 1)
        qiepai('anpai');
    else
        qiepai();
}

for (let i = 0; i < 2; i++) {
    mopai(3);
    qiepai();
}
for (let i = 0; i < 5; i++) {
    mopai(1);
    qiepai();
}

for (let i = 0; i < 2; i++) {
    mopai(3);
    qiepai();
}
mopai(1)
qiepai();
mopai(0);
leimingpai();
mopai(1);
qiepai();
mopai(0);
hupai();

// 函数复原
qiepai = origin_qiepai;
endHule = origin_endHule;
