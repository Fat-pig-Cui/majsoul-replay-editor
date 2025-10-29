clearProject();

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

setConfig({
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
        }
    }
});

// qiepai 去掉暗牌需要支付 1000 点和其他冗余判断
let origin_qiepai = qiepai;
qiepai = (seat, tile, is_liqi, f_moqie, anpai, bs_type) => {
    // 参数预处理
    function preprocess() {
        let x = {}, tmp = [seat, tile, is_liqi, f_moqie, anpai, bs_type];
        for (let i in tmp)
            if (tmp[i] === 'anpai')
                x.anpai = tmp[i];
            else if (tmp[i] === 'moqie' || tmp[i] === 'shouqie')
                x.f_moqie = tmp[i];
            else if (typeof tmp[i] == 'number')
                x.seat = tmp[i];
            else if (typeof tmp[i] == 'boolean' || tmp[i] === 'kailiqi')
                x.is_liqi = tmp[i];
            else if (tmp[i] instanceof Array && typeof tmp[i][0] === 'number')
                x.beishui_type = tmp[i][0];
            else if (typeof tmp[i] == 'string')
                x.tile = tmp[i];
        return [x.seat, x.tile, x.is_liqi, x.f_moqie, x.anpai, x.beishui_type];
    }

    let beishui_type;
    [seat, tile, is_liqi, f_moqie, anpai, beishui_type] = preprocess();

    lstActionCompletion();

    let lst_name = getLstAction().name;
    if (seat === undefined)
        seat = getLstAction().data.seat;
    if (is_liqi === undefined)
        is_liqi = false;
    if (is_beishuizhizhan() && beishui_type === undefined)
        beishui_type = 0;

    let moqie = true;
    // 如果 tile 参数原生不空, 且在手牌出现不止一次, 则一定是手切
    if (tile !== undefined && player_tiles[seat].indexOf(tile) !== player_tiles[seat].length - 1)
        moqie = false;
    if (tile === undefined && discard_tiles[seat].length > 0) {
        tile = discard_tiles[seat].shift();
        if (tile === '..')
            tile = undefined;
    }
    if (tile === undefined)
        tile = player_tiles[seat][player_tiles[seat].length - 1];
    moqie = moqie && player_tiles[seat][player_tiles[seat].length - 1] === tile && lst_name !== 'RecordNewRound' && lst_name !== 'RecordChiPengGang';
    if (is_heqie_mode())
        moqie = f_moqie === 'moqie';

    // 切牌解除同巡振听
    pretongxunzt[seat] = tongxunzt[seat] = false;
    updateZhenting();

    // 确定立直类型
    let is_wliqi = false, is_kailiqi = false;
    if (is_liqi === 'kailiqi')
        is_liqi = is_kailiqi = true;
    if (is_liqi && liqi_info[seat].yifa !== 0 && liqi_info[seat].liqi === 0)
        is_wliqi = true;

    // 确定 lst_liqi
    if (is_liqi && liqi_info[seat].liqi === 0)
        lst_liqi = {
            seat: seat,
            liqi: is_wliqi ? 2 : 1,
            kai: is_kailiqi,
            beishui_type: beishui_type,
        };

    // 切的牌是否为明牌
    let tile_state = is_openhand() || is_begin_open() && eraseMingpai(seat, tile);

    // 龙之目玉: 更新目玉数据
    if (is_muyu() && seat === muyu.seat)
        updateMuyu();

    // 幻境传说: 命运卡3
    if (get_field_spell_mode3() === 3)
        if (liqi_info[seat].liqi !== 0)
            spell_hourglass[seat]++;

    // 咏唱之战: 更新手摸切数据
    if (is_yongchang()) {
        shoumoqie[seat].push(!moqie);
        updateShoumoqie(seat);
    }

    // 魂之一击: 宣布魂之一击立直
    if (is_hunzhiyiji() && lst_liqi != null)
        hunzhiyiji_info[seat] = {
            seat: seat,
            liqi: lst_liqi.liqi,
            continue_deal_count: 6,
            overload: false,
        };

    // 切的牌从 player_tiles 中移除
    if (is_heqie_mode())
        player_tiles[seat].pop();
    else {
        let index = player_tiles[seat].lastIndexOf(tile);
        if (index === -1) // 要切的牌手牌中没有, 则报错
            throw new Error(roundInfo() + `seat: ${seat} 手牌不存在要切的牌: ${tile}`);
        player_tiles[seat].splice(index, 1);
    }
    player_tiles[seat].sort(cmp);

    // 切的牌 push 到 paihe 中, 并计算流局满贯
    paihe[seat].tiles.push(tile);
    if (!(is_anye() && anpai === 'anpai') && !judgeTile(tile, 'Y'))
        paihe[seat].liujumanguan = false;

    if (liqi_info[seat].yifa > 0)
        liqi_info[seat].yifa--;

    if (is_anye() && anpai === 'anpai')
        addRevealTile(seat, tile, moqie, is_liqi, is_wliqi);
    else {
        addDiscardTile(seat, tile, moqie, is_liqi, is_wliqi, is_kailiqi, tile_state, beishui_type);

        updateShezhangzt(seat);
        updatePrezhenting(seat, tile);
    }

    // 完成上个操作的后续
    function lstActionCompletion() {
        // 包杠失效
        baogang_seat = -1;

        // 开杠翻指示牌
        if (dora_cnt.lastype === 1) {
            dora_cnt.cnt += 1 + dora_cnt.bonus;
            dora_cnt.licnt += 1 + dora_cnt.bonus;
            dora_cnt.bonus = dora_cnt.lastype = 0;
        }
    }
};

// 修改点数变化
let origin_endHule = endHule;
endHule = hule_info => {
    delta_scores = [12300, 0, 0, 0];
    scores = [21500, 0, 20300, 0];
    actions.push({
        name: 'RecordHule',
        data: {
            delta_scores: delta_scores.slice(),
            hules: hule_info,
            old_scores: [9200, 0, 20300, 0],
            scores: scores.slice(),
            baopai: 0
        }
    });
}

begin_tiles[0] = '6m6779p135s123455z';
begin_tiles[2] = '33m888p24679s136z';
setDealTiles(['', '', '', '9s7z1s5z6s1p']);
setDiscardTiles(['4z9p7p2z3z1m1z7p6p3z6m1z4m2z2z5m9p3p4z5s', '', '1z8m9m6z9s4z6z1p9s4s2s9p3s5m4z2z4p1s2s', '']);
randomPaishan('3z7z8m7z9m5z4z4m1m6z6s2m6s1p2m9s3z2m7z3s1z9p1m6s2z5m2z4z5m2z9p4p3p1s4z2s..1z3m5m5p4m..1s2p6z9p7s..3p7z3m', '8p.1m...4p');
roundBegin();
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
zimingpai();
mopai(1);
qiepai();
mopai(0);
hupai();

// 函数复原
qiepai = origin_qiepai;
endHule = origin_endHule;
