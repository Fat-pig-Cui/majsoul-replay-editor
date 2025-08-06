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

player_datas[0].verified = player_datas[2].verified = 2;
player_datas[0].title = 600034; // 称号-天选之证
player_datas[0].views = [
    {slot: 1, item_id: 308011}, // 和牌-地狱低语
];
player_datas[2].title = 600039; // 称号-森罗万象

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

// qiepai 去掉暗牌需要支付 1000 点和其他冗余判断
origin_qiepai = qiepai;
qiepai = function (seat, tile, is_liqi, anpai, bs_type) {
    // 参数预处理
    function preprocess() {
        let x = {}, mat = [seat, tile, is_liqi, anpai, bs_type];
        for (let i in mat)
            if (mat[i] === 'anpai')
                x.anpai = mat[i];
            else if (typeof mat[i] == 'number')
                x.seat = mat[i];
            else if (typeof mat[i] == 'boolean' || mat[i] === 'kailiqi')
                x.is_liqi = mat[i];
            else if (mat[i] instanceof Array && typeof mat[i][0] === 'number')
                x.beishui_type = mat[i][0];
            else if (typeof mat[i] == 'string')
                x.tile = mat[i];
        return [x.seat, x.tile, x.is_liqi, x.anpai, x.beishui_type];
    }

    let beishui_type;
    [seat, tile, is_liqi, anpai, beishui_type] = preprocess();

    let lstaction = getlstaction();
    if (seat === undefined)
        seat = lstaction.name === 'RecordNewRound' ? ju : lstaction.data.seat;
    if (is_liqi === undefined)
        is_liqi = false;

    let moqie = true;
    // 如果 tile 参数原生不空, 且在手牌出现不止一次, 则一定是手切
    if (tile !== undefined && playertiles[seat].indexOf(tile) !== playertiles[seat].length - 1)
        moqie = false;
    if (tile === undefined && discardtiles[seat].length !== 0)
        tile = discardtiles[seat].shift();
    if (tile === undefined || tile === '..')
        tile = playertiles[seat].at(-1);
    moqie = moqie && playertiles[seat].at(-1) === tile && lstaction.name !== 'RecordNewRound' && lstaction.name !== 'RecordChiPengGang';

    let is_wliqi = false, is_kailiqi = false;
    if (is_liqi === 'kailiqi')
        is_liqi = is_kailiqi = true;
    if (is_liqi && liqiinfo[seat].yifa !== 0 && liqiinfo[seat].liqi === 0)
        is_wliqi = true;

    if (is_liqi)
        lstliqi = {seat: seat, type: is_wliqi ? 2 : 1, kai: is_kailiqi ? 1 : 0, beishui_type: 0};

    let index = playertiles[seat].lastIndexOf(tile);
    if (index === -1) {  // 要切的牌手牌中没有, 则报错
        console.error(roundinfo() + `seat: ${seat} 手牌不存在要切的牌: ${tile}`);
        return;
    }
    playertiles[seat].splice(index, 1);
    playertiles[seat].sort(cmp);

    let tile_state = is_openhand();
    if (is_peipaimingpai())
        tile_state = erasemingpai(seat, tile);

    paihe[seat].tiles.push(tile);
    if (!(is_anye() && anpai === 'anpai') && !judgetile(tile, 'Y'))
        paihe[seat].liujumanguan = false;
    if (liqiinfo[seat].yifa > 0)
        liqiinfo[seat].yifa--;

    if (is_anye() && anpai === 'anpai')
        addRevealTile(seat, tile, moqie, is_liqi, is_wliqi);
    else {
        addDiscardTile(seat, tile, moqie, is_liqi, is_wliqi, is_kailiqi, tile_state, beishui_type);

        update_shezhangzt(seat);
        update_prezhenting(seat, tile);
    }
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
mopaiset = ['', '', '', '9s7z1s5z6s1p'];
qiepaiset = ['4z9p7p2z3z1m1z7p6p3z6m1z4m2z2z5m9p3p4z5s', '', '1z8m9m6z9s4z6z1p9s4s2s9p3s5m4z2z4p1s2s', ''];
randompaishan('3z7z8m7z9m5z4z4m1m6z6s2m6s1p2m9s3z2m7z3s1z9p1m6s2z5m2z4z5m2z9p4p3p1s4z2s..1z3m5m5p4m..1s2p6z9p7s..3p7z3m', '8p.1m...4p');
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
