"use strict";
var checkPaiPu, resetData, OnChoosedPai, seat2LocalPosition, localPosition2Seat;
var editFunction, editFunction2, cfg, view, GameMgr, uiscript;
const player_datas = [null, null, null, null];
const begin_tiles = ['', '', '', ''];
const player_tiles = [[], [], [], []];
const all_data = {
    actions: [],
    xun: [],
    config: null,
    player_datas: [null, null],
    players: [null, null],
};
const clearProject = () => {
    var _a, _b;
    if ((_b = (_a = view === null || view === void 0 ? void 0 : view.DesktopMgr) === null || _a === void 0 ? void 0 : _a.Inst) === null || _b === void 0 ? void 0 : _b.active)
        throw new Error('clearProject: 请退出当前牌谱后再载入自制牌谱');
    game_begin_once = true;
    for (let i = 0; i < 4; i++)
        player_datas[i] = {
            nickname: '电脑0',
            avatar_id: 400101,
            title: 600001,
            avatar_frame: 0,
            verified: 0,
            views: []
        };
    config = {
        category: 1,
        meta: { mode_id: 0 },
        mode: {
            mode: 1,
            detail_rule: {}
        }
    };
    for (let i = 0; i < 4; i++) {
        begin_tiles[i] = '';
        player_tiles[i] = [];
    }
    muyu_seats = '';
    paishan = [];
    chang = ju = ben = liqibang = lianzhuang_cnt = 0;
    discard_tiles = [[], [], [], []];
    deal_tiles = [[], [], [], []];
    all_data.actions = [];
    all_data.xun = [];
    all_data.player_datas = player_datas;
    all_data.config = config;
    all_data.players = players;
};
const setConfig = (c) => {
    config = c;
};
const setDiscardTiles = (tiles) => {
    for (let i in tiles)
        discard_tiles[i] = separate(tiles[i]);
};
const setDealTiles = (tiles) => {
    for (let i in tiles)
        deal_tiles[i] = separate(tiles[i]);
};
const setPaishan = (ps) => {
    paishan = separate(ps);
};
let randomPaishan = (ps_head = '', ps_back = '') => {
    if (all_data.actions.length === 0)
        gameBegin();
    let tiles = [separate(begin_tiles[0]), separate(begin_tiles[1]), separate(begin_tiles[2]), separate(begin_tiles[3])];
    let para_tiles = [separate(ps_head), separate(ps_back)];
    for (let i = 0; i < player_cnt; i++) {
        let tiles_len = tiles[i].length;
        if (i === ju) {
            if (tiles_len > Qin_tiles_num)
                console.warn(roundInfo() + `tiles${i} 作为亲家牌数量超过正常值: ${tiles_len}`);
            else if (tiles_len < Qin_tiles_num)
                console.log(roundInfo() + `tiles${i} 作为亲家牌数量不够: ${tiles_len}, 自动补全至${Qin_tiles_num}张`);
        }
        else {
            if (tiles_len > Xian_tiles_num)
                console.warn(roundInfo() + `tiles${i} 作为闲家牌数量超过正常值: ${tiles_len}`);
            else if (tiles_len < Xian_tiles_num)
                console.log(roundInfo() + `tiles${i} 作为闲家牌数量不够: ${tiles_len}, 自动补全至${Xian_tiles_num}张`);
        }
    }
    let aka_cnt = 3;
    if (get_aka_cnt() > -1)
        aka_cnt = get_aka_cnt();
    else if (player_cnt === 3)
        aka_cnt = 2;
    else if (player_cnt === 2)
        aka_cnt = 1;
    let cnt = [];
    cnt[Cbd] = 0;
    for (let i = C1m; i <= C7z; i++)
        cnt[i] = 4;
    for (let i = C0m; i <= C0s; i++)
        cnt[i] = 0;
    if (player_cnt === 2) {
        for (let i = C1p + 1; i <= C9p - 1; i++)
            cnt[i] = 0;
        for (let i = C1s + 1; i <= C9s - 1; i++)
            cnt[i] = 0;
        cnt[C5m] = 4 - aka_cnt;
        cnt[C0m] = aka_cnt;
    }
    else if (player_cnt === 3) {
        for (let i = C1m + 1; i <= C9m - 1; i++)
            cnt[i] = 0;
        cnt[C5p] = cnt[C5s] = 4 - Math.floor(aka_cnt / 2);
        cnt[C0p] = cnt[C0s] = Math.floor(aka_cnt / 2);
    }
    else {
        if (aka_cnt === 4) {
            cnt[C5m] = cnt[C5s] = 3;
            cnt[C5p] = cnt[C0p] = 2;
            cnt[C0m] = cnt[C0s] = 1;
        }
        else {
            cnt[C5m] = cnt[C5p] = cnt[C5s] = 4 - Math.floor(aka_cnt / 3);
            cnt[C0m] = cnt[C0p] = cnt[C0s] = Math.floor(aka_cnt / 3);
        }
    }
    if (is_chuanma()) {
        for (let i = C1z; i <= C7z; i++)
            cnt[i] = 0;
        cnt[C0m] = cnt[C0p] = cnt[C0s] = 0;
        cnt[C5m] = cnt[C5p] = cnt[C5s] = 4;
    }
    if (is_guobiao()) {
        cnt[C0m] = cnt[C0p] = cnt[C0s] = 0;
        cnt[C5m] = cnt[C5p] = cnt[C5s] = 4;
        if (is_guobiao_huapai() && typeof editFunction == 'function')
            cnt[tile2Int(Huapai, true)] = 8;
    }
    let cnt2 = [];
    cnt2[Cbd] = 0;
    for (let i = C1m; i <= C7z; i++)
        cnt2[i] = 3;
    if (is_mingjing()) {
        for (let i = C1m; i <= C7z; i++)
            cnt[i] = 1;
        cnt[C0m] = cnt[C0p] = cnt[C0s] = 0;
    }
    if (is_wanxiangxiuluo())
        cnt[Cbd] = 4;
    for (let j = 0; j < player_cnt; j++)
        for (let i in tiles[j])
            if (tiles[j][i].length > 2 && tiles[j][i][2] === SPT_Suf && is_mingjing())
                cnt2[tile2Int(tiles[j][i])]--;
            else
                cnt[tile2Int(tiles[j][i], true)]--;
    if (is_mopai_paishan() && deal_tiles[ju].length > 0) {
        para_tiles[0] = [];
        while (deal_tiles[0].length > 0 || deal_tiles[1].length > 0 || deal_tiles[2].length > 0 || deal_tiles[3].length > 0)
            for (let i = ju + 1; i < ju + 1 + player_cnt; i++)
                if (deal_tiles[i % player_cnt].length > 0)
                    para_tiles[0].push(deal_tiles[i % player_cnt].shift());
    }
    const sp_type = ['Y', 'D', 'T', 'H', 'M', 'P', 'S', '.'];
    for (let j in para_tiles)
        for (let i in para_tiles[j])
            if (sp_type.indexOf(para_tiles[j][i][0]) === -1)
                if (para_tiles[j][i].length === 3 && para_tiles[j][i][2] === SPT_Suf)
                    cnt2[tile2Int(para_tiles[j][i], true)]--;
                else
                    cnt[tile2Int(para_tiles[j][i], true)]--;
    let remain_tiles = [];
    for (let i = C1m; i <= C0s; i++) {
        for (let j = 0; j < cnt[i]; j++)
            remain_tiles.push(int2Tile(i));
        if (is_mingjing())
            for (let j = 0; j < cnt2[i]; j++)
                remain_tiles.push(int2Tile(i, true));
    }
    remain_tiles.sort(randomCmp);
    for (let i in para_tiles)
        randomize(para_tiles[i]);
    for (let i = 0; i < player_cnt; i++)
        randomize(tiles[i]);
    for (let i = 0; i < player_cnt; i++) {
        while (tiles[i].length < Xian_tiles_num)
            tiles[i].push(remain_tiles.pop());
        if (i === ju && tiles[i].length < Qin_tiles_num)
            tiles[i].push(remain_tiles.pop());
    }
    for (let i = 0; i < player_cnt; i++)
        begin_tiles[i] = tiles[i].join('');
    for (let i in cnt) {
        let full_num = 4, has_fault = false;
        if (cnt[i] < 0) {
            has_fault = true;
            if (is_mingjing())
                full_num = 1;
        }
        if (has_fault)
            console.warn(roundInfo() + `paishan 不合规: ${full_num - cnt[i]} 个 ${int2Tile(parseInt(i))}`);
        if (cnt2[i] < 0)
            console.warn(roundInfo() + `paishan 不合规: ${3 - cnt2[i]} 个 ${int2Tile(parseInt(i), true)}`);
    }
    paishan = para_tiles[0].concat(remain_tiles, para_tiles[1]);
    function randomize(tls) {
        for (let i in tls)
            if (tls[i][0] === 'H' || tls[i][0] === 'T') {
                let index = remain_tiles.findIndex((tile) => judgeTile(tile, tls[i][0]));
                tls[i] = index > -1 ? remain_tiles.splice(index, 1)[0] : remain_tiles.pop();
            }
        for (let i in tls)
            if (tls[i][0] === 'Y' || tls[i][0] === 'D' || tls[i][0] === 'M' || tls[i][0] === 'P' || tls[i][0] === 'S') {
                let index = remain_tiles.findIndex((tile) => judgeTile(tile, tls[i][0]));
                tls[i] = index > -1 ? remain_tiles.splice(index, 1)[0] : remain_tiles.pop();
            }
        for (let i in tls)
            if (tls[i][0] === '.')
                tls[i] = remain_tiles.pop();
    }
};
const roundBegin = () => {
    if (all_data.actions.length === 0)
        gameBegin();
    init();
    if (is_dora3() || is_muyu())
        dora_cnt.cnt = dora_cnt.licnt = 3;
    let left_cnt = getLeftTileCnt();
    let opens = undefined;
    if (is_begin_open() || is_openhand()) {
        opens = [null, null];
        for (let seat = 0; seat < player_cnt; seat++) {
            let ret = { seat: seat, tiles: [], count: [] };
            let tiles = player_tiles[seat], cnt = [];
            for (let i = C1m; i <= C0s; i++)
                cnt[i] = 0;
            for (let i in tiles)
                cnt[tile2Int(tiles[i], true)]++;
            mingpais[seat] = cnt;
            for (let i = C1m; i <= C0s; i++) {
                if (cnt[i] === 0)
                    continue;
                ret.tiles.push(int2Tile(i));
                ret.count.push(cnt[i]);
            }
            opens[seat] = ret;
        }
    }
    if (is_muyu())
        updateMuyu(true);
    paishan = paishan.slice(0, 136);
    let qishou_len = 0, is_sha256 = false, has_intergrity = true;
    let qishou_tiles = [], random_tiles = [[], [], [], []];
    for (let i = 0; i < player_cnt; i++) {
        if (i === ju) {
            if (player_tiles[i].length !== Qin_tiles_num)
                has_intergrity = false;
        }
        else if (player_tiles[i].length !== Xian_tiles_num)
            has_intergrity = false;
        for (let j in player_tiles[i])
            if (player_tiles[i][j] !== Tbd) {
                qishou_len++;
                random_tiles[i].push(player_tiles[i][j]);
            }
        random_tiles[i].sort(randomCmp);
    }
    if (has_intergrity && qishou_len + paishan.length <= 136) {
        is_sha256 = true;
        for (let i = 0; i < 3; i++)
            for (let j = ju; j < ju + player_cnt; j++)
                for (let k = 0; k < 4; k++)
                    if (i * 4 + k < random_tiles[j % player_cnt].length)
                        qishou_tiles.push(random_tiles[j % player_cnt][i * 4 + k]);
        for (let j = ju; j < ju + player_cnt; j++)
            if (random_tiles[j % player_cnt].length > 12)
                qishou_tiles.push(random_tiles[j % player_cnt][12]);
        if (random_tiles[ju].length > 13)
            qishou_tiles.push(random_tiles[ju][13]);
        paishan = qishou_tiles.concat(paishan);
    }
    const hash_code_set = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
    let fake_hash_code = '';
    for (let i = 0; i < (is_sha256 ? 64 : 32); i++)
        fake_hash_code += hash_code_set[Math.floor(hash_code_set.length * Math.random())];
    addNewRound(left_cnt, fake_hash_code, opens, is_sha256);
    if (is_sha256)
        paishan.splice(0, qishou_len);
};
let mopai = (...args) => {
    let seat, tile, index;
    for (let i in args)
        if (typeof args[i] == 'string')
            tile = args[i];
        else if (typeof args[i] == 'number')
            seat = args[i];
        else if (args[i] instanceof Array && typeof args[i][0] == 'number')
            index = args[i][0];
    let liqi = null;
    let hunzhiyiji_data = null;
    lstActionCompletion();
    if (seat === undefined) {
        let lst_name = getLstAction().name, lst_seat = getLstAction().data.seat;
        if (lst_name === 'RecordChiPengGang' || lst_name === 'RecordBaBei' || lst_name === 'RecordAnGangAddGang')
            seat = lst_seat;
        if (lst_name === 'RecordDiscardTile' || lst_name === 'RecordLockTile')
            seat = is_hunzhiyiji() && hunzhiyiji_info[lst_seat].liqi && !hunzhiyiji_info[lst_seat].overload ? lst_seat : (lst_seat + 1) % player_cnt;
        if (lst_name === 'RecordHuleXueZhanMid') {
            if (getLstAction(2).name === 'RecordAnGangAddGang') {
                if (is_chuanma())
                    seat = (getLstAction(2).data.seat + 1) % player_cnt;
                else
                    seat = getLstAction(2).data.seat;
            }
            else {
                let lst_index = getLstAction().data.hules.length - 1;
                seat = (getLstAction().data.hules[lst_index].seat + 1) % player_cnt;
            }
        }
        if (lst_name === 'RecordHuleXueLiuMid' || lst_name === 'RecordCuohu')
            seat = (getLstAction(2).data.seat + 1) % player_cnt;
        while (huled[seat])
            seat = (seat + 1) % player_cnt;
        if (isNaN(seat))
            throw new Error(roundInfo() + ` mopai: 无法判断谁摸牌, getLstAction().name: ${lst_name}`);
    }
    if (tile === undefined && deal_tiles[seat].length > 0) {
        tile = deal_tiles[seat].shift();
        if (tile === '..')
            tile = undefined;
    }
    let tile_state = is_openhand() || liqi_info[seat].kai;
    if (is_zhanxing()) {
        if (index === undefined)
            index = 0;
        if (draw_type === 0)
            awaiting_tiles.push(paishan.pop());
        while (awaiting_tiles.length < 3 && paishan.length > 14)
            awaiting_tiles.push(paishan.shift());
        addFillAwaitingTiles(seat, liqi);
    }
    if (is_hunzhiyiji() && hunzhiyiji_info[seat].liqi && !hunzhiyiji_info[seat].overload) {
        if (hunzhiyiji_info[seat].continue_deal_count > 0)
            hunzhiyiji_info[seat].continue_deal_count--;
        hunzhiyiji_data = JSON.parse(JSON.stringify(hunzhiyiji_info[seat]));
    }
    let draw_card = paishan[0];
    if (tile !== undefined)
        draw_card = tile;
    else if (is_zhanxing())
        draw_card = awaiting_tiles.splice(index, 1)[0];
    else if (draw_type === 0)
        draw_card = paishan[paishan.length - 1];
    player_tiles[seat].push(draw_card);
    if (!is_zhanxing())
        draw_type === 1 ? paishan.shift() : paishan.pop();
    lst_draw_type = draw_type;
    draw_type = 1;
    addDealTile(seat, draw_card, liqi, tile_state, index, hunzhiyiji_data);
    function lstActionCompletion() {
        let lst_name = getLstAction().name, lst_seat = getLstAction().data.seat;
        if (dora_cnt.lastype === 2) {
            dora_cnt.cnt += 1 + dora_cnt.bonus;
            dora_cnt.licnt += 1 + dora_cnt.bonus;
            dora_cnt.bonus = dora_cnt.lastype = 0;
        }
        for (let i = 0; i < player_cnt; i++)
            if (liqi_info[i].yifa === -1)
                liqi_info[i].yifa = 0;
        for (let i = 0; i < player_cnt; i++) {
            if (pretongxunzt[i])
                tongxunzt[i] = true;
            if (prelizhizt[i])
                lizhizt[i] = true;
        }
        if (is_muyu() && muyu.count === 0)
            updateMuyu(true);
        if (is_chuanma())
            calcGangPoint();
        if (is_anye() && lst_name === 'RecordRevealTile')
            addLockTile(lst_seat, 2);
        if (is_hunzhiyiji()) {
            let count = hunzhiyiji_info[lst_seat].continue_deal_count;
            if (lst_name !== 'RecordAnGangAddGang')
                if (hunzhiyiji_info[lst_seat].liqi && count === 0 && !hunzhiyiji_info[lst_seat].overload) {
                    hunzhiyiji_info[lst_seat].overload = true;
                    hunzhiyiji_data = JSON.parse(JSON.stringify(hunzhiyiji_info[lst_seat]));
                }
        }
        liqi = lstLiqi2Liqi(true);
    }
};
let qiepai = (...args) => {
    let seat, tile, is_liqi, f_moqie, anpai, beishui_type;
    let is_kailiqi = false;
    for (let i in args)
        if (args[i] === 'anpai')
            anpai = args[i];
        else if (args[i] === 'kailiqi')
            is_kailiqi = is_liqi = true;
        else if (args[i] === 'moqie' || args[i] === 'shouqie')
            f_moqie = args[i];
        else if (typeof args[i] == 'number')
            seat = args[i];
        else if (typeof args[i] == 'boolean')
            is_liqi = args[i];
        else if (args[i] instanceof Array && typeof args[i][0] === 'number')
            beishui_type = args[i][0];
        else if (typeof args[i] == 'string')
            tile = args[i];
    lstActionCompletion();
    let lst_name = getLstAction().name;
    if (seat === undefined)
        seat = getLstAction().data.seat;
    if (is_liqi === undefined)
        is_liqi = false;
    if (is_beishuizhizhan() && beishui_type === undefined)
        beishui_type = 0;
    let moqie = true;
    if (tile !== undefined && player_tiles[seat].indexOf(tile) !== player_tiles[seat].length - 1)
        moqie = false;
    if (tile === undefined && discard_tiles[seat].length > 0) {
        tile = discard_tiles[seat].shift();
        if (tile === '..')
            tile = undefined;
    }
    if (tile === undefined)
        tile = player_tiles[seat][player_tiles[seat].length - 1];
    moqie && (moqie = player_tiles[seat][player_tiles[seat].length - 1] === tile && lst_name !== 'RecordNewRound' && lst_name !== 'RecordChiPengGang');
    if (is_heqie_mode())
        moqie = f_moqie === 'moqie';
    pretongxunzt[seat] = tongxunzt[seat] = false;
    updateZhenting();
    let is_wliqi = false;
    if (is_liqi && liqi_info[seat].yifa !== 0 && liqi_info[seat].liqi === 0)
        is_wliqi = true;
    if (is_liqi && liqi_info[seat].liqi === 0)
        lst_liqi = {
            seat: seat,
            liqi: is_wliqi ? 2 : 1,
            kai: is_kailiqi,
            beishui_type: beishui_type,
        };
    let tile_state = is_openhand() || is_begin_open() && eraseMingpai(seat, tile);
    if (is_muyu() && seat === muyu.seat)
        updateMuyu();
    if (is_anye() && anpai === 'anpai') {
        scores[seat] -= 1000;
        liqibang++;
    }
    if (get_field_spell_mode3() === 3)
        if (liqi_info[seat].liqi !== 0)
            spell_hourglass[seat]++;
    if (is_yongchang()) {
        shoumoqie[seat].push(!moqie);
        updateShoumoqie(seat);
    }
    if (is_hunzhiyiji() && lst_liqi != null)
        hunzhiyiji_info[seat] = {
            seat: seat,
            liqi: lst_liqi.liqi,
            continue_deal_count: 6,
            overload: false,
        };
    if (is_heqie_mode())
        player_tiles[seat].pop();
    else {
        let index = player_tiles[seat].lastIndexOf(tile);
        if (index === -1)
            throw new Error(roundInfo() + ` qiepai: seat: ${seat} 手牌不存在要切的牌: ${tile}`);
        player_tiles[seat].splice(index, 1);
    }
    player_tiles[seat].sort(cmp);
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
    function lstActionCompletion() {
        baogang_seat = -1;
        if (dora_cnt.lastype === 1) {
            dora_cnt.cnt += 1 + dora_cnt.bonus;
            dora_cnt.licnt += 1 + dora_cnt.bonus;
            dora_cnt.bonus = dora_cnt.lastype = 0;
        }
    }
};
let mingpai = (...args) => {
    let seat, tiles, jifei;
    for (let i in args)
        if (typeof args[i] == 'number')
            seat = args[i];
        else if (typeof args[i] == 'boolean')
            jifei = args[i];
        else if (args[i] instanceof Array || typeof args[i] == 'string')
            tiles = separate(args[i]);
    let from = getLstAction().data.seat, tile = getLstAction().data.tile;
    let liqi = null;
    lstActionCompletion();
    if (seat === undefined)
        if (tiles !== undefined)
            if (!isEqualTile(tiles[0], tile))
                seat = (from + 1) % player_cnt;
            else
                for (let i = from + 1; i < from + player_cnt; i++) {
                    let seat2 = i % player_cnt;
                    let cnt = [];
                    for (let i = C1m; i <= C7z; i++)
                        cnt[i] = 0;
                    for (let i in player_tiles[seat2])
                        cnt[tile2Int(player_tiles[seat2][i])]++;
                    if (tiles.length === 3 && cnt[tile2Int(tiles[0])] >= 3)
                        seat = seat2;
                    else if (tiles.length === 2 && cnt[tile2Int(tiles[0])] >= 2)
                        seat = seat2;
                    if (seat !== undefined)
                        break;
                }
    if (tiles === undefined) {
        if (trying([tile, tile, tile], seat))
            return;
        if (trying([tile, tile], seat))
            return;
        if (player_cnt === 4 && !is_chuanma()) {
            seat = (from + 1) % player_cnt;
            if (tile[1] !== 'z' && tile[0] !== '1' && tile[0] !== '2')
                if (trying([int2Tile(tile2Int(tile) - 2), int2Tile(tile2Int(tile) - 1)], seat))
                    return;
            if (tile[1] !== 'z' && tile[0] !== '1' && tile[0] !== '9')
                if (trying([int2Tile(tile2Int(tile) - 1), int2Tile(tile2Int(tile) + 1)], seat))
                    return;
            if (tile[1] !== 'z' && tile[0] !== '8' && tile[0] !== '9')
                if (trying([int2Tile(tile2Int(tile) + 1), int2Tile(tile2Int(tile) + 2)], seat))
                    return;
        }
        throw new Error(roundInfo() + ` mingpai: seat: ${from} 的切牌: ${tile} 没有玩家能 mingpai`);
    }
    if (tiles.length <= 1)
        throw new Error(roundInfo() + ` mingpai: seat: ${from} 的切牌: ${tile} 后的 mingpai tiles 参数不对: ${tiles}`);
    let tile_states = [];
    if (is_begin_open())
        for (let i in tiles)
            tile_states.push(eraseMingpai(seat, tiles[i]));
    let type, froms, split_tiles;
    if (!isEqualTile(tiles[0], tile)) {
        type = 0;
        froms = [seat, seat, from];
        split_tiles = [tiles[0], tiles[1], tile];
    }
    else if (tiles.length === 2) {
        type = 1;
        froms = [seat, seat, from];
        split_tiles = [tiles[0], tiles[1], tile];
        if (get_field_spell_mode1() === 4 && seat === ju)
            dora_cnt.lastype = is_dora_jifan() ? 2 : 1;
    }
    else if (tiles.length === 3) {
        type = 2;
        froms = [seat, seat, seat, from];
        split_tiles = [tiles[0], tiles[1], tiles[2], tile];
        if (get_field_spell_mode1() === 4 && seat === ju)
            dora_cnt.bonus = 1;
        dora_cnt.lastype = is_dora_jifan() ? 2 : 1;
        if (is_chuanma())
            chuanma_gangs.notover.push({ from: from, to: seat, val: 2000 });
        else {
            if (!is_guobiao()) {
                let gang_num = 0;
                for (let j in fulu[seat])
                    if (fulu[seat][j].type === 2 || fulu[seat][j].type === 3)
                        gang_num++;
                if (gang_num === 3)
                    sigang_bao[seat] = true;
                if (is_baogang())
                    baogang_seat = from;
            }
            draw_type = 0;
        }
    }
    fulu[seat].push({ type: type, tile: split_tiles.slice(), from: from });
    for (let i in tiles)
        player_tiles[seat].splice(player_tiles[seat].indexOf(tiles[i]), 1);
    if (get_field_spell_mode3() === 4) {
        scores[seat] -= 500;
        scores[from] += 500;
    }
    if (get_field_spell_mode3() === 5 && isDora(tile)) {
        scores[seat] -= 2000;
        liqibang += 2;
    }
    addChiPengGang(seat, split_tiles, froms, type, liqi, tile_states);
    if (jifei)
        roundEnd();
    function lstActionCompletion() {
        for (let i = 0; i < player_cnt; i++) {
            if (pretongxunzt[i])
                tongxunzt[i] = true;
            if (prelizhizt[i])
                lizhizt[i] = true;
        }
        paihe[from].liujumanguan = false;
        if (is_muyu() && muyu.count === 0)
            updateMuyu(true);
        if (is_yongchang()) {
            shoumoqie[from].pop();
            updateShoumoqie(from);
        }
        if (is_hunzhiyiji() && hunzhiyiji_info[from].liqi)
            hunzhiyiji_info[from].overload = true;
        liqi = lstLiqi2Liqi();
        for (let i = 0; i < player_cnt; i++)
            liqi_info[i].yifa = 0;
    }
    function trying(x, seat) {
        let x0 = allEqualTiles(x[0]).reverse(), x1 = allEqualTiles(x[1]).reverse(), x2 = [];
        if (x.length === 3)
            x2 = allEqualTiles(x[2]).reverse();
        for (let i in x0)
            for (let j in x1) {
                let try_tiles = [x0[i], x1[j]];
                if (x.length === 3)
                    for (let k in x2) {
                        try_tiles[2] = x2[k];
                        if (tryMingpai(try_tiles))
                            return true;
                    }
                else if (tryMingpai(try_tiles))
                    return true;
            }
        return false;
        function tryMingpai(try_tiles) {
            for (let seat2 = 0; seat2 < player_cnt; seat2++)
                if (seat2 !== from && (seat === seat2 || seat === undefined) && inTiles(try_tiles, player_tiles[seat2])) {
                    mingpai(seat2, try_tiles, jifei);
                    return true;
                }
            return false;
        }
    }
};
let zimingpai = (...args) => {
    let seat, tile, type, jifei;
    for (let i in args)
        if (args[i] === 'babei' || args[i] === 'angang' || args[i] === 'jiagang' || args[i] === 'baxi')
            type = args[i];
        else if (typeof args[i] == 'number')
            seat = args[i];
        else if (typeof args[i] == 'boolean')
            jifei = args[i];
        else if (typeof args[i] == 'string')
            tile = args[i];
    if (seat === undefined) {
        seat = getLstAction().data.seat;
        if (seat === undefined)
            throw new Error(roundInfo() + ` zimingpai: 无法判断谁 zimingpai, getLstAction().name: ${getLstAction().name}`);
    }
    if (jifei === undefined)
        jifei = false;
    if (tile === undefined) {
        if (trying())
            return;
        throw new Error(roundInfo() + ` zimingpai: seat: ${seat}, xun: ${xun[seat].length}: 玩家无法 zimingpai (没给 tile 情况下)`);
    }
    if (dora_cnt.lastype === 1) {
        dora_cnt.cnt += 1 + dora_cnt.bonus;
        dora_cnt.licnt += 1 + dora_cnt.bonus;
        dora_cnt.bonus = dora_cnt.lastype = 0;
    }
    let tile_cnt = 0;
    for (let i in player_tiles[seat])
        if (isEqualTile(tile, player_tiles[seat][i]))
            tile_cnt++;
    let is_babei = tile_cnt >= 1 && (player_cnt === 3 || player_cnt === 2) && isEqualTile(tile, '4z') && (!type || type === 'babei');
    is_babei || (is_babei = tile_cnt >= 1 && player_cnt === 2 && isEqualTile(tile, '3z') && (!type || type === 'baxi'));
    is_babei || (is_babei = is_guobiao() && tile === Huapai && type === 'babei' && typeof editFunction == 'function');
    is_babei || (is_babei = tile_cnt >= 1 && type === 'babei' && typeof editFunction == 'function');
    let is_angang = tile_cnt >= 4 && (!type || type === 'angang');
    let is_jiagang = false;
    if (tile_cnt > 0 && (!type || type === 'jiagang'))
        for (let i in fulu[seat])
            if (player_tiles[seat].lastIndexOf(tile) > 0 && isEqualTile(fulu[seat][i].tile[0], tile) && fulu[seat][i].type === 1) {
                is_jiagang = true;
                break;
            }
    if (is_heqie_mode()) {
        if (type === 'angang')
            is_angang = true;
        else if (type === 'jiagang')
            is_jiagang = true;
        else if (type === 'babei')
            is_babei = true;
    }
    for (let i = 0; i < player_cnt; i++)
        if (liqi_info[i].yifa > 0)
            liqi_info[i].yifa = -1;
    updatePrezhenting(seat, tile, is_angang);
    let tile_states = [];
    if (!is_chuanma())
        draw_type = 0;
    if (is_babei) {
        if (is_begin_open())
            tile_states.push(eraseMingpai(seat, tile));
        fulu[seat].push({ type: 4, tile: [tile] });
        player_tiles[seat].splice(player_tiles[seat].lastIndexOf(tile), 1);
        player_tiles[seat].sort(cmp);
        addBaBei(seat, tile, tile_states);
    }
    else if (is_angang || is_jiagang) {
        const ziming_type = is_angang ? 3 : 2;
        if (get_field_spell_mode1() === 4 && seat === ju)
            dora_cnt.bonus = 1;
        dora_cnt.lastype = is_angang || is_jiagang && is_dora_jifan() ? 2 : 1;
        if (is_angang) {
            let tmp_fulu = { type: 3, tile: [] };
            let tile_num = 0;
            for (let i = player_tiles[seat].length - 1; i >= 0; i--)
                if (isEqualTile(tile, player_tiles[seat][i])) {
                    if (is_begin_open())
                        tile_states.push(eraseMingpai(seat, player_tiles[seat][i]));
                    tmp_fulu.tile.push(player_tiles[seat][i]);
                    player_tiles[seat].splice(i, 1);
                    tile_num++;
                    if (tile_num >= 4)
                        break;
                }
            tmp_fulu.tile.sort(cmp);
            tmp_fulu.tile = [tmp_fulu.tile[0], tmp_fulu.tile[2], tmp_fulu.tile[3], tmp_fulu.tile[1]];
            fulu[seat].push(tmp_fulu);
            if (is_chuanma())
                for (let i = 0; i < player_cnt; i++) {
                    if (i === seat || huled[i])
                        continue;
                    chuanma_gangs.notover.push({ from: i, to: seat, val: 2000 });
                }
        }
        else {
            if (is_begin_open())
                tile_states.push(eraseMingpai(seat, tile));
            let index;
            for (let i in fulu[seat])
                if (isEqualTile(fulu[seat][i].tile[0], tile) && fulu[seat][i].type === 1) {
                    fulu[seat][i].type = 2;
                    fulu[seat][i].tile.push(tile);
                    index = player_tiles[seat].lastIndexOf(tile);
                    player_tiles[seat].splice(index, 1);
                    break;
                }
            if (is_chuanma() && index === player_tiles[seat].length)
                for (let i = 0; i < player_cnt; i++) {
                    if (i === seat || huled[i])
                        continue;
                    chuanma_gangs.notover.push({ from: i, to: seat, val: 1000 });
                }
        }
        player_tiles[seat].sort(cmp);
        addAnGangAddGang(seat, tile, ziming_type, tile_states);
        if (jifei)
            roundEnd();
    }
    else
        throw new Error(roundInfo() + ` zimingpai: seat: ${seat}, xun: ${xun[seat].length}: 玩家无法 zimingpai (给定 tile: ${tile} 情况下)`);
    function trying() {
        if (is_guobiao() && typeof editFunction == 'function' && inTiles(Huapai, player_tiles[seat])) {
            zimingpai(seat, Huapai, 'babei');
            return true;
        }
        let all_tiles;
        if (player_cnt === 2 || player_cnt === 3) {
            all_tiles = allEqualTiles('4z').reverse();
            for (let i in all_tiles)
                if (inTiles(all_tiles[i], player_tiles[seat])) {
                    zimingpai(seat, all_tiles[i], 'babei');
                    return true;
                }
        }
        if (player_cnt === 2 && typeof editFunction == 'function') {
            all_tiles = allEqualTiles('3z').reverse();
            for (let i in all_tiles)
                if (inTiles(all_tiles[i], player_tiles[seat])) {
                    zimingpai(seat, all_tiles[i], 'babei');
                    return true;
                }
        }
        for (let i = C1m; i <= C7z; i++) {
            all_tiles = allEqualTiles(int2Tile(i)).reverse();
            for (let x0 in all_tiles)
                for (let x1 in all_tiles)
                    for (let x2 in all_tiles)
                        for (let x3 in all_tiles) {
                            let tmp_angang = [all_tiles[x0], all_tiles[x1], all_tiles[x2], all_tiles[x3]];
                            if (inTiles(tmp_angang, player_tiles[seat])) {
                                zimingpai(seat, all_tiles[x0], 'angang', jifei);
                                return true;
                            }
                        }
        }
        for (let i = C1m; i <= C7z; i++) {
            all_tiles = allEqualTiles(int2Tile(i)).reverse();
            for (let j in all_tiles)
                if (inTiles(all_tiles[j], player_tiles[seat])) {
                    let can_jiagang = false;
                    for (let k in fulu[seat])
                        if (isEqualTile(fulu[seat][k].tile[0], all_tiles[j]) && fulu[seat][k].type === 1) {
                            can_jiagang = true;
                            break;
                        }
                    if (can_jiagang) {
                        zimingpai(seat, all_tiles[j], 'jiagang', jifei);
                        return true;
                    }
                }
        }
        return false;
    }
};
let hupai = (...args) => {
    let seats, type;
    for (let i in args)
        if (typeof args[i] == 'number')
            seats = [args[i]];
        else if (args[i] instanceof Array)
            seats = args[i];
        else if (typeof args[i] == 'boolean')
            type = args[i];
    if (is_chuanma())
        chuanma_gangs.notover = [];
    if (type === undefined)
        type = false;
    if (seats === undefined || seats.length === 0) {
        let lst_name = getLstAction().name, lst_seat = getLstAction().data.seat;
        if (lst_name === 'RecordDealTile' || lst_name === 'RecordNewRound')
            seats = [lst_seat];
        else {
            seats = [];
            for (let i = lst_seat + 1; i < lst_seat + player_cnt; i++) {
                const seat = i % player_cnt;
                if (huled[seat])
                    continue;
                push2PlayerTiles(seat);
                if ((is_chuanma() || is_guobiao() && !cuohu[seat] || !is_chuanma() && !is_guobiao() && !zhenting[seat]) && calcHupai(player_tiles[seat]) !== 0) {
                    if (!is_chuanma() && !is_guobiao() && !is_ronghuzhahu()) {
                        let points = calcFan(seat, false, lst_seat);
                        if (calcSudian(points) !== -2000)
                            seats.push(seat);
                    }
                    else
                        seats.push(seat);
                }
                player_tiles[seat].pop();
                if (!is_chuanma() && (is_toutiao() || is_mingjing() || is_guobiao()) && seats.length >= 1)
                    break;
            }
        }
        if (seats.length === 0)
            throw new Error(roundInfo() + ' hupai: 没给 seat 参数无人能正常和牌');
    }
    if (seats.length > 1) {
        let lst_name = getLstAction().name, lst_seat = getLstAction().data.seat;
        if (lst_name === 'RecordDealTile' || lst_name === 'RecordNewRound')
            lst_seat = (lst_seat + player_cnt - 1) % player_cnt;
        let hupai_seats = [false, false, false, false];
        for (let i in seats)
            hupai_seats[seats[i]] = true;
        seats = [];
        for (let i = lst_seat + 1; i <= lst_seat + player_cnt; i++)
            if (hupai_seats[i % player_cnt])
                seats.push(i % player_cnt);
    }
    if (is_toutiao() || is_mingjing() || is_guobiao())
        seats = [seats[0]];
    if (!is_xuezhandaodi() && !is_wanxiangxiuluo() && !is_chuanma() && !is_xueliu()) {
        let ret = [], baopait = 0;
        for (let i in seats)
            ret.push(!is_guobiao() ? huleOnePlayer(seats[i]) : huleOnePlayerGuobiao(seats[i]));
        if (is_guobiao() && is_cuohupeida() && typeof editFunction == 'function' && ret[0].cuohu) {
            let old_scores = scores.slice();
            for (let i = 0; i < player_cnt; i++)
                if (i === seats[0])
                    delta_scores[i] = -3 * cuohu_points() * scale_points();
                else
                    delta_scores[i] = cuohu_points() * scale_points();
            for (let i = 0; i < player_cnt; i++)
                scores[i] += delta_scores[i];
            addCuohu(seats[0], ret[0].zimo, old_scores);
            for (let i = 0; i < player_cnt; i++)
                delta_scores[i] = 0;
            cuohu[seats[0]] = true;
            return;
        }
        for (let i in seats)
            huled[seats[i]] = true;
        if (!is_guobiao() && baogang_seat !== -1)
            baopait = baogang_seat + 1;
        baogang_seat = -1;
        if (!is_guobiao())
            for (let i in seats)
                if (baopai[seats[i]].length > 0) {
                    baopait = baopai[seats[i]][0].seat + 1;
                    break;
                }
        let old_scores = scores.slice();
        for (let i = 0; i < player_cnt; i++)
            scores[i] += delta_scores[i];
        endHule(ret, old_scores, baopait);
        for (let i = 0; i < player_cnt; i++)
            delta_scores[i] = 0;
        if (huled[ju]) {
            if (!is_guobiao() || is_guobiao() && is_guobiao_lianzhuang())
                ben++;
            if (get_field_spell_mode1() === 2)
                ben += 4;
            lianzhuang_cnt++;
        }
        else {
            ju++;
            ben = 0;
            lianzhuang_cnt = 0;
        }
        roundEnd();
    }
    else {
        for (let i in seats) {
            pretongxunzt[seats[i]] = tongxunzt[seats[i]] = false;
            prelizhizt[seats[i]] = lizhizt[seats[i]] = false;
        }
        updateZhenting();
        let ret = [];
        for (let i in seats) {
            let whatever = !is_chuanma() ? huleOnePlayer(seats[i]) : huleOnePlayerChuanma(seats[i]);
            ret.push(whatever);
            hules_history.push(whatever);
        }
        if (is_chuanma() && ju_cnt === -1)
            ju_cnt = seats[0];
        if (!is_xueliu())
            for (let i in seats)
                huled[seats[i]] = true;
        let old_scores = scores.slice();
        for (let i = 0; i < player_cnt; i++)
            scores[i] += delta_scores[i];
        if (!type) {
            let liqi = null;
            if (lst_liqi != null) {
                if (scores[lst_liqi.seat] >= 1000 * liqi_need || is_fufenliqi())
                    liqi = {
                        seat: lst_liqi.seat,
                        liqibang: liqibang + liqi_need,
                        score: scores[lst_liqi.seat] - 1000 * liqi_need,
                    };
                else
                    liqi = {
                        seat: lst_liqi.seat,
                        liqibang: liqibang,
                        score: scores[lst_liqi.seat],
                        failed: true,
                    };
            }
            if (!is_chuanma())
                for (let i = 0; i < player_cnt; i++)
                    liqi_info[i].yifa = 0;
            if (!is_xueliu())
                addHuleXueZhanMid(ret, old_scores, liqi);
            else
                addHuleXueLiuMid(ret, old_scores);
            if (lst_liqi != null && (scores[lst_liqi.seat] >= 1000 * liqi_need || is_fufenliqi())) {
                liqibang += liqi_need;
                scores[lst_liqi.seat] -= 1000 * liqi_need;
                liqi_info[lst_liqi.seat] = { liqi: lst_liqi.liqi, yifa: 0, kai: lst_liqi.kai };
            }
            lst_liqi = null;
        }
        else {
            if (!is_xueliu())
                endHuleXueZhanEnd(ret, old_scores);
            else
                endHuleXueLiuEnd(ret, old_scores);
        }
        for (let i = 0; i < player_cnt; i++)
            delta_scores[i] = 0;
        if (type) {
            if (!is_chuanma())
                ju++;
            roundEnd();
        }
    }
};
let huangpai = () => {
    if (is_anye() && getLstAction().name === 'RecordRevealTile')
        addLockTile(getLstAction().data.seat, 2);
    if (get_field_spell_mode1() === 3) {
        scores[ju] += liqibang * 1000;
        liqibang = 0;
    }
    lianzhuang_cnt = 0;
    let player_left = 0, ting_cnt = 0;
    let taxes = [0, 0, 0, 0];
    let ting_info = [];
    for (let i = 0; i < player_cnt; i++) {
        if (!huled[i])
            player_left++;
        let tings = is_heqie_mode() || huled[i] ? [] : calcTingpai(i);
        if (tings.length === 0)
            ting_info.push({ tingpai: false, hand: [], tings: tings });
        else {
            ting_cnt++;
            ting_info.push({ tingpai: true, hand: player_tiles[i].slice(), tings: tings });
        }
    }
    let noting_cnt = player_left - ting_cnt;
    let times = get_field_spell_mode3() === 1 ? 2 : 1;
    let scores_info = [];
    let liujumanguan = false;
    if (!is_chuanma() && !is_guobiao())
        for (let i = 0; i < player_cnt; i++)
            if (paihe[i].liujumanguan && !huled[i])
                liujumanguan = true;
    if (liujumanguan)
        for (let i = ju; i < ju + player_cnt; i++) {
            let seat = i % player_cnt;
            if (!paihe[seat].liujumanguan || huled[seat])
                continue;
            let cur_delta_scores = [0, 0];
            for (let i = 0; i < player_cnt; i++)
                cur_delta_scores[i] = 0;
            let score = calcScore(seat, cur_delta_scores);
            scores_info.push({
                seat: seat,
                score: score,
                old_scores: scores.slice(),
                delta_scores: cur_delta_scores,
                hand: player_tiles[seat].slice(),
                ming: fulu2Ming(seat),
                doras: calcDoras(),
            });
        }
    else {
        if (ting_cnt !== 0 && noting_cnt !== 0 && !is_guobiao()) {
            if (!is_chuanma()) {
                let fafu = 1000;
                if (ting_cnt === 1 && noting_cnt === 1)
                    fafu = get_fafu_2p();
                else if (ting_cnt === 1 && noting_cnt === 2)
                    fafu = get_fafu_3p_1ting();
                else if (ting_cnt === 2 && noting_cnt === 1)
                    fafu = get_fafu_3p_2ting();
                else if (ting_cnt === 1 && noting_cnt === 3)
                    fafu = get_fafu_1ting();
                else if (ting_cnt === 2 && noting_cnt === 2)
                    fafu = get_fafu_2ting();
                else if (ting_cnt === 3 && noting_cnt === 1)
                    fafu = get_fafu_3ting();
                for (let i = 0; i < player_cnt; i++) {
                    if (huled[i])
                        continue;
                    if (ting_info[i].tingpai)
                        delta_scores[i] += fafu * noting_cnt / ting_cnt * times;
                    else
                        delta_scores[i] -= fafu * times;
                }
            }
            else {
                for (let seat = 0; seat < player_cnt; seat++) {
                    for (let i = 0; i < player_cnt; i++) {
                        if (huled[seat] || huled[i] || i === seat)
                            continue;
                        let points = 0;
                        if (huazhu(i))
                            points = Math.max(calcSudianChuanma(calcFanChuanma(seat, false, true)), 8000);
                        else if (!ting_info[i].tingpai && ting_info[seat].tingpai)
                            points = calcSudianChuanma(calcFanChuanma(seat, false, true));
                        delta_scores[seat] += points;
                        delta_scores[i] -= points;
                    }
                }
            }
        }
        if (is_chuanma())
            for (let i in chuanma_gangs.over) {
                let from = chuanma_gangs.over[i].from, to = chuanma_gangs.over[i].to, val = chuanma_gangs.over[i].val;
                if (!(ting_info[to].tingpai || huled[to])) {
                    taxes[to] -= val;
                    taxes[from] += val;
                }
            }
        scores_info = [{
                old_scores: scores.slice(),
                delta_scores: delta_scores.slice(),
                taxes: is_chuanma() ? taxes.slice() : undefined,
            }];
    }
    endNoTile(liujumanguan, ting_info, scores_info);
    for (let i = 0; i < player_cnt; i++) {
        scores[i] += delta_scores[i] + taxes[i];
        delta_scores[i] = taxes[i] = 0;
    }
    if (!is_xuezhandaodi() && !is_wanxiangxiuluo() && !is_chuanma())
        ben += get_field_spell_mode1() === 2 ? 5 : 1;
    if ((!ting_info[ju].tingpai || is_xuezhandaodi() || is_wanxiangxiuluo() || is_guobiao() && !is_guobiao_lianzhuang()) && !is_chuanma())
        ju++;
    roundEnd();
    function calcScore(seat, cur_delta_scores) {
        let score = 0;
        for (let i = 0; i < player_cnt; i++) {
            if (seat === i || huled[i])
                continue;
            if (seat === ju || i === ju) {
                cur_delta_scores[i] -= 4000 * times;
                cur_delta_scores[seat] += 4000 * times;
                score += 4000 * times;
            }
            else {
                cur_delta_scores[i] -= 2000 * times;
                cur_delta_scores[seat] += 2000 * times;
                score += 2000 * times;
            }
        }
        if ((player_cnt === 3 || player_cnt === 2) && no_zimosun()) {
            let base_points = player_cnt === 3 ? 1000 : 4000;
            for (let j = 0; j < player_cnt; j++) {
                if (seat === j || huled[j])
                    continue;
                if (seat === ju) {
                    cur_delta_scores[j] -= base_points * 2;
                    cur_delta_scores[seat] += base_points * 2;
                    score += base_points * 2;
                }
                else {
                    cur_delta_scores[j] -= base_points;
                    cur_delta_scores[seat] += base_points;
                    score += base_points;
                }
            }
        }
        for (let i = 0; i < player_cnt; i++)
            delta_scores[i] += cur_delta_scores[i];
        return score;
    }
};
let liuju = (liuju_type) => {
    let all_liuju = [jiuZhongJiuPai, siFengLianDa, siGangSanLe, siJiaLiZhi, sanJiaHuLe];
    let type, seat = getLstAction().data.seat, tiles;
    let allplayertiles = ['', '', '', ''];
    for (let i = 0; i < player_cnt; i++)
        allplayertiles[i] = player_tiles[i].join('|');
    if (typeof liuju_type == 'number')
        all_liuju[liuju_type - 1]();
    else
        for (let i in all_liuju) {
            all_liuju[i]();
            if (type !== undefined)
                break;
        }
    let liqi = lstLiqi2Liqi();
    if (type !== undefined) {
        endLiuJu(type, seat, liqi, tiles, allplayertiles);
        if (!is_xuezhandaodi() && !is_wanxiangxiuluo() && !is_chuanma() && !is_guobiao())
            ben += get_field_spell_mode1() === 2 ? 5 : 1;
        roundEnd();
    }
    else
        throw new Error(roundInfo() + ' liuju: 不符合任何途中流局条件');
    function jiuZhongJiuPai() {
        let cnt = [], yaojiu_type = 0;
        for (let i = C1m; i <= C7z; i++)
            cnt[i] = 0;
        for (let i in player_tiles[seat])
            cnt[tile2Int(player_tiles[seat][i])]++;
        for (let i = C1m; i <= C7z; i++)
            if (cnt[i] >= 1 && judgeTile(int2Tile(i), 'Y'))
                yaojiu_type++;
        if (yaojiu_type >= 9 && liqi_info[seat].liqi === 0 && liqi_info[seat].yifa === 1 && player_tiles[seat].length === 14) {
            type = 1;
            tiles = player_tiles[seat].slice();
        }
    }
    function siFengLianDa() {
        if (player_cnt === 4)
            if (fulu[0].length === 0 && fulu[1].length === 0 && fulu[2].length === 0 && fulu[3].length === 0)
                if (paihe[0].tiles.length === 1 && paihe[1].tiles.length === 1 && paihe[2].tiles.length === 1 && paihe[3].tiles.length === 1)
                    if (paihe[0].tiles[0] === paihe[1].tiles[0] && paihe[1].tiles[0] === paihe[2].tiles[0] && paihe[2].tiles[0] === paihe[3].tiles[0])
                        if (tile2Int(paihe[0].tiles[0]) >= C1z && tile2Int(paihe[0].tiles[0]) <= C4z)
                            type = 2;
    }
    function siGangSanLe() {
        let gang_player_cnt = 0;
        for (let i = 0; i < player_cnt; i++)
            for (let j in fulu[i])
                if (fulu[i][j].type === 2 || fulu[i][j].type === 3) {
                    gang_player_cnt++;
                    break;
                }
        if (dora_cnt.cnt === 5 && gang_player_cnt >= 2)
            type = 3;
    }
    function siJiaLiZhi() {
        if (player_cnt === 4) {
            let liqiplayercnt = 0;
            for (let i = 0; i < player_cnt; i++)
                if (liqi_info[i].liqi !== 0)
                    liqiplayercnt++;
            if (lst_liqi != null && liqiplayercnt === 3)
                type = 4;
        }
    }
    function sanJiaHuLe() {
        if (is_sanxiangliuju())
            type = 5;
    }
};
const setMuyuSeats = (m_seats) => {
    muyu_seats = m_seats;
};
const huanpai = (tls, type) => {
    let tiles = [separate(tls[0]), separate(tls[1]), separate(tls[2]), separate(tls[3])];
    let ret = [null, null, null, null];
    for (let seat = 0; seat < player_cnt; seat++) {
        let in_seat = (seat - type + 3) % player_cnt;
        for (let j = 0; j < tiles[seat].length; j++) {
            player_tiles[seat].splice(player_tiles[seat].indexOf(tiles[seat][j]), 1);
            player_tiles[seat].push(tiles[in_seat][j]);
        }
        ret[seat] = {
            out_tiles: tiles[seat],
            out_tile_states: [0, 0, 0],
            in_tiles: tiles[in_seat],
            in_tile_states: [0, 0, 0],
        };
    }
    for (let i = 0; i < player_cnt; i++)
        player_tiles[i].sort(cmp);
    addChangeTile(ret, type);
};
const dingque = (x) => {
    let all_dingque = x.split('');
    let dict = { 'm': 1, 'p': 0, 's': 2 };
    let ret = [0, 0, 0, 0];
    for (let i = 0; i < player_cnt; i++)
        ret[i] = dict[all_dingque[i]];
    gaps = ret;
    addSelectGap(ret);
};
let kaipai = (seat) => {
    if (typeof seat != 'number')
        throw new Error(roundInfo() + ` kaipai: 暗夜之战开牌必须指定玩家, seat: ${seat}`);
    if (getLstAction().name === 'RecordRevealTile') {
        let tile_seat = getLstAction().data.seat;
        let tile = getLstAction().data.tile;
        scores[seat] -= 2000;
        liqibang += 2;
        addUnveilTile(seat);
        addLockTile(tile_seat, 0, tile);
        if (!judgeTile(tile, 'Y'))
            paihe[tile_seat].liujumanguan = false;
    }
    else
        throw new Error(roundInfo() + `kaipai: 暗夜之战开牌的前提是有人刚暗牌, getLstAction().name: ${getLstAction().name}`);
};
let kaipaiLock = (seat) => {
    if (typeof seat != 'number')
        throw new Error(roundInfo() + ` kaipaiLock: 暗夜之战开牌必须指定玩家, seat: ${seat}`);
    if (getLstAction().name === 'RecordRevealTile') {
        let tile_seat = getLstAction().data.seat;
        scores[seat] -= 2000;
        liqibang += 2;
        addUnveilTile(seat);
        scores[tile_seat] -= 4000;
        liqibang += 4;
        addLockTile(tile_seat, 1);
    }
    else
        throw new Error(roundInfo() + ` kaipaiLock: 暗夜之战开牌的前提是有人刚暗牌, getLstAction().name: ${getLstAction().name}`);
};
const setRound = (c, j, b) => {
    chang = c;
    ju = j;
    ben = b;
};
const getLeftTileCnt = () => {
    let left_cnt = paishan.length - 14;
    if (player_cnt === 2)
        left_cnt = paishan.length - 18;
    else if (is_chuanma() || is_guobiao())
        left_cnt = paishan.length;
    if (is_zhanxing())
        left_cnt += awaiting_tiles.length;
    return left_cnt;
};
const demoGame = () => {
    gameBegin();
    begin_tiles[0] = '11223344556777z';
    if (player_cnt === 2) {
        begin_tiles[1] = '1112340678999m';
        randomPaishan('6z', '55z............');
    }
    else if (player_cnt === 3) {
        begin_tiles[1] = '1112340678999p';
        begin_tiles[2] = '1112340678999s';
        randomPaishan('6z', '55z........');
    }
    else {
        begin_tiles[1] = '1112340678999m';
        begin_tiles[2] = '1112340678999p';
        begin_tiles[3] = '1112340678999s';
        randomPaishan('6z', '55z....');
    }
    roundBegin();
    qiepai(true);
    moqieLiqi();
    hupai();
};
const normalMoqie = (tile_cnt) => {
    if (tile_cnt === undefined)
        tile_cnt = 1;
    if (typeof tile_cnt == 'number')
        for (let i = 0; i < tile_cnt; i++) {
            mopai();
            qiepai();
        }
    else if (typeof tile_cnt == 'string') {
        mopai();
        qiepai(tile_cnt);
    }
    else
        throw new Error(roundInfo() + ` normalMoqie: tile_cnt 参数不合规: ${tile_cnt}`);
};
const moqieLiqi = (tile_cnt) => {
    if (tile_cnt === undefined)
        tile_cnt = 1;
    if (typeof tile_cnt == 'number')
        for (let i = 0; i < tile_cnt; i++) {
            mopai();
            qiepai(true);
        }
    else if (typeof tile_cnt == 'string') {
        mopai();
        qiepai(tile_cnt, true);
    }
    else
        throw new Error(roundInfo() + ` moqieLiqi: tile_cnt 参数不合规: ${tile_cnt}`);
};
const comboMopai = (tile_cnt) => {
    if (tile_cnt === undefined)
        tile_cnt = 1;
    if (typeof tile_cnt == 'number')
        for (let i = 0; i < tile_cnt; i++) {
            zimingpai();
            mopai();
        }
    else if (typeof tile_cnt == 'string') {
        zimingpai(tile_cnt);
        mopai();
    }
    else
        throw new Error(roundInfo() + ` comboMopai: tile_cnt 参数不合规: ${tile_cnt}`);
};
const mingQiepai = (tls_cnt) => {
    if (tls_cnt === undefined)
        tls_cnt = 1;
    if (typeof tls_cnt == 'number')
        for (let i = 0; i < tls_cnt; i++) {
            mingpai();
            qiepai();
        }
    else if (typeof tls_cnt == 'string') {
        let split_tile = separate(tls_cnt);
        if (split_tile.length >= 2) {
            mingpai(tls_cnt);
            qiepai();
        }
        else {
            mingpai();
            qiepai(tls_cnt);
        }
    }
    else
        throw new Error(roundInfo() + ` mingQiepai: tls_cnt 参数不合规: ${tls_cnt}`);
};
const zimoHu = (flag = false) => {
    if (typeof flag == 'boolean') {
        mopai();
        hupai(flag);
    }
    else
        throw new Error(roundInfo() + ` zimoHu: flag 参数不合规: ${flag}`);
};
const moqieLiuju = () => {
    normalMoqie(getLeftTileCnt());
    huangpai();
};
const judgeTile = (tile, type) => {
    if (typeof tile != 'string' || tile.length === 1)
        throw new Error(roundInfo() + ` judgeTile: tile 格式不合规: ${tile}`);
    if (tile === Tbd)
        return true;
    let x = tile2Int(tile);
    switch (type) {
        case 'Y':
            return tile[0] === '1' || tile[0] === '9' || tile[1] === 'z';
        case 'D':
            return !(tile[0] === '1' || tile[0] === '9' || tile[1] === 'z');
        case 'T':
            return tile[0] === '1' && tile[1] !== 'z' || tile[0] === '9';
        case 'H':
            return tile[1] === 'z';
        case 'M':
            return tile[1] === 'm';
        case 'P':
            return tile[1] === 'p';
        case 'S':
            return tile[1] === 's';
        case 'L':
            return x === C1s + 1 || x === C1s + 2 || x === C1s + 3 || x === C1s + 5 || x === C1s + 7 || x === C5z + 1;
        case 'quanshuang':
            return x <= C9s && ((x - 1) % 9 + 1) % 2 === 0;
        case 'quanda':
            return x <= C9s && (x - 1) % 9 >= 6;
        case 'quanzhong':
            return x <= C9s && (x - 1) % 9 >= 3 && (x - 1) % 9 <= 5;
        case 'quanxiao':
            return x <= C9s && (x - 1) % 9 <= 2;
        case 'dayuwu':
            return x <= C9s && (x - 1) % 9 >= 5;
        case 'xiaoyuwu':
            return x <= C9s && (x - 1) % 9 <= 3;
        case 'tuibudao':
            return x === 10 || x === 11 || x === 12 || x === 13 || x === 14 || x === 17 || x === 18 || x === 20 || x === 22 || x === 23 || x === 24 || x === 26 || x === 27 || x === 32;
        default:
            throw new Error(roundInfo() + ` judgeTile: type 格式不合规: ${type}`);
    }
};
const allEqualTiles = (tile) => {
    if (tile === Tbd)
        return [Tbd];
    tile = tile.substring(0, 2);
    if (tile[0] === '0' || tile[0] === '5' && tile[1] !== 'z')
        return ['5' + tile[1], '5' + tile[1] + SPT_Suf, '0' + tile[1], '0' + tile[1] + SPT_Suf];
    else
        return [tile, tile + SPT_Suf];
};
const isEqualTile = (x, y) => allEqualTiles(x).indexOf(y) > -1;
const decompose = (tiles) => {
    let x = tiles.replace(/\s*/g, '');
    let random_tiles = '.HTYDMPS';
    let bd_tile_num = x.match(/b/g) ? x.match(/b/g).length : 0;
    let matches = x.match(/\d+[mpsz]t?|\.|H|T|Y|D|M|P|S/g);
    let ret = '';
    for (let i = 0; i < bd_tile_num; i++)
        ret += Tbd;
    for (let i in matches) {
        if (matches[i].length === 1 && random_tiles.indexOf(matches[i]) > -1) {
            ret += matches[i] + matches[i];
            continue;
        }
        let kind_index = matches[i][matches[i].length - 1] === SPT_Suf ? matches[i].length - 2 : matches[i].length - 1;
        let tile_kind = matches[i][kind_index];
        if (kind_index === matches[i].length - 2)
            tile_kind += SPT_Suf;
        for (let j = 0; j < kind_index; j++)
            ret += matches[i][j] + tile_kind;
    }
    return ret;
};
const separate = (tiles) => {
    if (!tiles)
        return [];
    if (tiles instanceof Array)
        return tiles;
    tiles = decompose(tiles);
    let ret = [];
    while (tiles.length > 0) {
        if (tiles.length > 2 && tiles[2] === SPT_Suf) {
            ret.push(tiles.substring(0, 3));
            tiles = tiles.substring(3);
        }
        else {
            ret.push(tiles.substring(0, 2));
            tiles = tiles.substring(2);
        }
    }
    return ret;
};
const calcHupai = (tiles, type = false) => {
    let cnt = [], tmp = [];
    for (let i = Cbd; i <= C7z; i++)
        cnt[i] = tmp[i] = 0;
    for (let i in tiles)
        cnt[tile2Int(tiles[i])]++;
    if (is_guobiao() && tiles.indexOf(Huapai) > -1)
        return 0;
    if (is_wanxiangxiuluo() && cnt[Cbd] === 1 && !type) {
        let tmp_tiles = [];
        for (let i in tiles)
            if (tiles[i] !== Tbd)
                tmp_tiles.push(tiles[i]);
        for (let i = 1; i <= 34; i++) {
            tmp_tiles.push(int2Tile(i));
            let result = calcHupai(tmp_tiles, true);
            if (result !== 0)
                return result;
            tmp_tiles.pop();
        }
        return 0;
    }
    for (let i = C1m; i <= C7z; i++) {
        if (cnt[i] >= 2) {
            cnt[i] -= 2;
            let ok = true;
            for (let j = C1m; j <= C7z; j++)
                tmp[j] = cnt[j];
            tmp[C0m] = tmp[C0p] = tmp[C0s] = 0;
            for (let k = 1; k <= 3; k++) {
                for (let j = k * 9 - 8; j !== 0; j = nxt2[j]) {
                    if (tmp[j] < 0) {
                        ok = false;
                        break;
                    }
                    tmp[j] %= 3;
                    tmp[nxt2[j]] -= tmp[j];
                    tmp[nxt2[nxt2[j]]] -= tmp[j];
                }
                tmp[C0m] = tmp[C0p] = tmp[C0s] = 0;
            }
            for (let j = C1z; j <= C7z; j++)
                if (tmp[j] % 3 !== 0)
                    ok = false;
            cnt[i] += 2;
            if (ok)
                return 1;
        }
    }
    let duizi = 0;
    for (let i = C1m; i <= C7z; i++) {
        if (cnt[i] === 2)
            duizi++;
        if (cnt[i] >= 4 && cnt[i] % 2 === 0 && (is_chuanma() || is_guobiao()))
            duizi += cnt[i] / 2;
    }
    if (duizi === 7)
        return 2;
    let guoshi = true;
    for (let i = C1m; i <= C7z; i++) {
        if (judgeTile(int2Tile(i), 'Y')) {
            if (cnt[i] === 0)
                guoshi = false;
        }
        else if (cnt[i] > 0)
            guoshi = false;
    }
    if (guoshi)
        return 3;
    if (is_guobiao() && tiles.length === 14) {
        let quanbukao = true;
        for (let i = C1m; i <= C7z; i++)
            if (cnt[i] >= 2)
                quanbukao = false;
        let jin_huase = [
            [false, false, false],
            [false, false, false],
            [false, false, false],
        ];
        for (let j = 0; j <= 2; j++)
            for (let i = 0; i <= 8; i++)
                if (cnt[j * 9 + i + 1] === 1)
                    jin_huase[j][i % 3] = true;
        for (let i = 0; i <= 2; i++) {
            let true_cnt_row = 0, true_cnt_col = 0;
            for (let j = 0; j <= 2; j++) {
                if (jin_huase[i][j])
                    true_cnt_row++;
                if (jin_huase[j][i])
                    true_cnt_col++;
            }
            if (true_cnt_row >= 2 || true_cnt_col >= 2)
                quanbukao = false;
        }
        if (quanbukao) {
            let zuhelong = true;
            for (let j = 0; j <= 2; j++)
                for (let i = 0; i <= 2; i++)
                    if (jin_huase[j][i])
                        if (!(cnt[j * 9 + 1 + i] === 1 && cnt[j * 9 + 4 + i] === 1 && cnt[j * 9 + 7 + i] === 1))
                            zuhelong = false;
            if (!zuhelong)
                return 4;
            else
                return 5;
        }
    }
    if (is_guobiao() && tiles.length >= 11) {
        let condition = [
            [1, 4, 7, 11, 14, 17, 21, 24, 27],
            [1, 4, 7, 12, 15, 18, 20, 23, 26],
            [2, 5, 8, 10, 13, 16, 21, 24, 27],
            [2, 5, 8, 12, 15, 18, 19, 22, 25],
            [3, 6, 9, 10, 13, 16, 20, 23, 26],
            [3, 6, 9, 11, 14, 17, 19, 22, 25],
        ];
        let flag = [true, true, true, true, true, true];
        for (let j in condition)
            for (let i in condition[j])
                if (cnt[condition[j][i]] === 0)
                    flag[j] = false;
        for (let row in condition) {
            if (flag[row]) {
                let new_tiles = tiles.slice();
                for (let i in condition[row])
                    for (let j in new_tiles)
                        if (new_tiles[j] === int2Tile(condition[row][i])) {
                            new_tiles.splice(parseInt(j), 1);
                            break;
                        }
                if (calcHupai(new_tiles) === 1)
                    return 6 + parseInt(row);
            }
        }
    }
    if (is_yifanjieguyi() && tiles.length === 14) {
        let shisanbuda = true;
        let duizi_num = 0;
        for (let i = C1m; i <= C7z; i++) {
            if (cnt[i] === 2)
                duizi_num++;
            if (cnt[i] >= 3)
                shisanbuda = false;
        }
        if (duizi_num !== 1)
            shisanbuda = false;
        for (let j = 0; j <= 2; j++)
            for (let i = 1; i <= 7; i++)
                if (cnt[j * 9 + i] >= 1)
                    if (cnt[j * 9 + i + 1] !== 0 || cnt[j * 9 + i + 2] !== 0)
                        shisanbuda = false;
        if (shisanbuda)
            return 12;
    }
    return 0;
};
const calcTingpai = (seat, type = false) => {
    if (is_chuanma() && huazhu(seat))
        return [];
    let tiles = player_tiles[seat];
    let cnt = [];
    for (let i = Cbd; i <= C7z; i++)
        cnt[i] = 0;
    for (let i in tiles)
        cnt[tile2Int(tiles[i])]++;
    if (is_guobiao() && tiles.indexOf(Huapai) > -1)
        return [];
    let ret = [];
    for (let i = C1m; i <= C7z; i++) {
        tiles.push(int2Tile(i));
        cnt[i]++;
        if ((cnt[i] <= 4 || type) && calcHupai(tiles) !== 0 && calcHupai(tiles) !== 12)
            ret.push({ tile: int2Tile(i) });
        tiles.pop();
        cnt[i]--;
    }
    return ret;
};
const getLstAction = (num = 1) => {
    if (actions.length > 0) {
        let ret = actions.length;
        for (let i = 0; i < num; i++) {
            ret--;
            while (actions[ret] !== undefined && (actions[ret].name === 'RecordChangeTile' || actions[ret].name === 'RecordSelectGap' || actions[ret].name === 'RecordGangResult' || actions[ret].name === 'RecordFillAwaitingTiles'))
                ret--;
        }
        return actions[ret];
    }
    else
        throw new Error(roundInfo() + ' actions 为空');
};
const setScores = (s) => {
    scores = s;
};
const resetReplay = () => {
    if (checkPaiPu !== undefined)
        GameMgr.Inst.checkPaiPu = checkPaiPu;
    if (resetData !== undefined)
        uiscript.UI_Replay.prototype.resetData = resetData;
};
let config;
let paishan;
let scores;
let player_cnt;
let liqi_need;
let chang, ju, ben, liqibang, benchangbang;
let discard_tiles, deal_tiles;
let fulu;
let paihe;
let liqi_info;
let lst_liqi;
let doras, li_doras;
let dora_cnt;
let delta_scores;
let base_points;
let draw_type, lst_draw_type;
let actions;
let hules_history;
let huled;
let baopai;
let xun;
let players;
let sigang_bao;
let baogang_seat;
let mingpais;
let muyu_seats;
let muyu;
let muyu_times;
let ju_cnt;
let gaps;
let chuanma_gangs;
let spell_hourglass;
let hunzhiyiji_info;
let shoumoqie;
let yongchang_data;
let awaiting_tiles;
let lianzhuang_cnt;
let cuohu;
let protected_tiles;
let pretongxunzt, prelizhizt, shezhangzt, tongxunzt, lizhizt, zhenting;
const Qin_tiles_num = 14, Xian_tiles_num = 13;
const C1m = 1, C9m = 9, C1p = 10, C9p = 18, C1s = 19, C9s = 27, C1z = 28, C4z = 31, C5z = 32, C7z = 34, C0m = 35, C0p = 36, C0s = 37, C5m = 5, C5p = 14, C5s = 23;
const SPT_Suf = 't';
const SPT_Offset = 40;
const Tbd = 'bd';
const Cbd = 0;
const GB_Qihu = 8;
const Huapai = '0m';
const nxt2 = [0, 2, 3, 4, 5, 6, 7, 8, 9, 35, 11, 12, 13, 14, 15, 16, 17, 18, 35, 20, 21, 22, 23, 24, 25, 26, 27, 35, 35, 35, 35, 35, 35, 35, 35, 36, 0];
const dora_nxt = [0, 2, 3, 4, 5, 6, 7, 8, 9, 1, 11, 12, 13, 14, 15, 16, 17, 18, 10, 20, 21, 22, 23, 24, 25, 26, 27, 19, 29, 30, 31, 28, 33, 34, 32];
let game_begin_once;
const gameBegin = () => {
    if (!game_begin_once)
        return;
    all_data.config = config;
    all_data.player_datas = player_datas;
    if (config.mode.mode >= 20 && config.mode.mode <= 29)
        player_cnt = 2;
    else if (config.mode.mode >= 10 && config.mode.mode <= 19)
        player_cnt = 3;
    else
        player_cnt = 4;
    if (player_cnt === 3) {
        let x = config.mode.detail_rule;
        x.wanxiangxiuluo_mode = x.xuezhandaodi = x.muyu_mode = x.chuanma = false;
    }
    liqi_need = get_liqi_need();
    if (get_field_spell_mode3() === 2)
        liqi_need = 2;
    [chang, ju, ben, liqibang] = get_chang_ju_ben_num();
    if (!liqibang)
        liqibang = 0;
    lianzhuang_cnt = 0;
    let init_point = -1;
    if (get_init_point() > -1)
        init_point = get_init_point();
    if (init_point > -1) {
        scores = [0, 0];
        for (let i = 0; i < player_cnt; i++)
            scores[i] = init_point;
    }
    else if (player_cnt === 2) {
        scores = [50000, 50000];
    }
    else if (player_cnt === 3) {
        scores = [35000, 35000, 35000];
    }
    else {
        if (is_guobiao()) {
            scores = [300, 300, 300, 300];
            for (let i = 0; i < player_cnt; i++)
                scores[i] *= scale_points();
        }
        else if (is_chuanma() || is_tianming())
            scores = [50000, 50000, 50000, 50000];
        else if (is_muyu())
            scores = [40000, 40000, 40000, 40000];
        else if (is_dora3())
            scores = [35000, 35000, 35000, 35000];
        else
            scores = [25000, 25000, 25000, 25000];
    }
    base_points = scores[0];
    if (get_init_scores().length > 0)
        scores = get_init_scores();
    game_begin_once = false;
};
const init = () => {
    actions = [];
    muyu_times = [1, 1, 1, 1];
    muyu = { id: 0, seat: 0, count: 5, count_max: 5 };
    xun = [[], [], [], []];
    gaps = null;
    ju_cnt = -1;
    benchangbang = ben;
    baopai = [[], [], [], []];
    lst_liqi = null;
    mingpais = [[], [], [], []];
    chuanma_gangs = { over: [], notover: [] };
    dora_cnt = { cnt: 1, licnt: 1, lastype: 0, bonus: 0 };
    huled = [false, false, false, false];
    hules_history = [];
    fulu = [[], [], [], []];
    paihe = [
        { liujumanguan: !(no_liujumanguan() || is_heqie_mode()), tiles: [] },
        { liujumanguan: !(no_liujumanguan() || is_heqie_mode()), tiles: [] },
        { liujumanguan: !(no_liujumanguan() || is_heqie_mode()), tiles: [] },
        { liujumanguan: !(no_liujumanguan() || is_heqie_mode()), tiles: [] },
    ];
    liqi_info = [
        { liqi: 0, yifa: 1, kai: false },
        { liqi: 0, yifa: 1, kai: false },
        { liqi: 0, yifa: 1, kai: false },
        { liqi: 0, yifa: 1, kai: false },
    ];
    lst_draw_type = draw_type = 1;
    baogang_seat = -1;
    shezhangzt = [false, false, false, false];
    pretongxunzt = [false, false, false, false];
    prelizhizt = [false, false, false, false];
    tongxunzt = [false, false, false, false];
    lizhizt = [false, false, false, false];
    zhenting = [false, false, false, false];
    sigang_bao = [false, false, false, false];
    spell_hourglass = [0, 0, 0, 0];
    hunzhiyiji_info = [
        { seat: 0, liqi: 0, continue_deal_count: 0, overload: false },
        { seat: 1, liqi: 0, continue_deal_count: 0, overload: false },
        { seat: 2, liqi: 0, continue_deal_count: 0, overload: false },
        { seat: 3, liqi: 0, continue_deal_count: 0, overload: false },
    ];
    shoumoqie = [[], [], [], []];
    yongchang_data = [
        { seat: 0, moqie_count: 0, moqie_bonus: 0, shouqie_count: 0, shouqie_bonus: 0 },
        { seat: 1, moqie_count: 0, moqie_bonus: 0, shouqie_count: 0, shouqie_bonus: 0 },
        { seat: 2, moqie_count: 0, moqie_bonus: 0, shouqie_count: 0, shouqie_bonus: 0 },
        { seat: 3, moqie_count: 0, moqie_bonus: 0, shouqie_count: 0, shouqie_bonus: 0 },
    ];
    awaiting_tiles = [];
    cuohu = [false, false, false, false];
    delta_scores = [0, 0];
    for (let i = 0; i < player_cnt; i++)
        delta_scores[i] = 0;
    if (paishan.length === 0)
        randomPaishan();
    doras = [];
    li_doras = [];
    for (let i = 0; i < 5; i++) {
        doras.push(paishan[paishan.length - (21 - 4 * player_cnt + 2 * i)]);
        li_doras.push(paishan[paishan.length - (22 - 4 * player_cnt + 2 * i)]);
    }
    let tiles = [separate(begin_tiles[0]), separate(begin_tiles[1]), separate(begin_tiles[2]), separate(begin_tiles[3])];
    if (tiles[0].length === 0 && tiles[1].length === 0 && tiles[2].length === 0 && tiles[3].length === 0) {
        for (let i = 0; i < 3; i++)
            for (let j = 0; j < player_cnt; j++)
                for (let k = 0; k < 4; k++)
                    tiles[j].push(paishan.shift());
        for (let i = 0; i < player_cnt; i++)
            tiles[i].push(paishan.shift());
        tiles[0].push(paishan.shift());
        tiles = tiles.slice(ju, player_cnt).concat(tiles.slice(0, ju));
    }
    for (let i = 0; i < player_cnt; i++) {
        tiles[i].sort(cmp);
        player_tiles[i] = tiles[i];
    }
    protected_tiles = null;
};
const calcXun = () => {
    for (let i = 0; i < player_cnt; i++)
        if (player_tiles[i].length % 3 === 2 && !huled[i])
            xun[i].push(actions.length - 1);
};
const calcDoras = () => {
    dora_cnt.cnt = Math.min(dora_cnt.cnt, 5);
    dora_cnt.licnt = Math.min(dora_cnt.licnt, 5);
    if (no_ganglidora())
        dora_cnt.licnt = 1;
    if (no_gangdora())
        dora_cnt.cnt = dora_cnt.licnt = 1;
    if (no_lidora())
        dora_cnt.licnt = 0;
    if (is_chuanma() || is_guobiao() || no_dora())
        dora_cnt.cnt = dora_cnt.licnt = 0;
    let doras0 = [];
    for (let i = 0; i < dora_cnt.cnt; i++)
        doras0[i] = doras[i];
    return doras0;
};
const tile2Int = (tile, type = false, sptile = false) => {
    if (tile === Tbd)
        return 0;
    if (!sptile || tile.length <= 2) {
        if (type && tile[0] === '0') {
            if (tile[1] === 'm')
                return 35;
            if (tile[1] === 'p')
                return 36;
            if (tile[1] === 's')
                return 37;
        }
        if (tile[0] === '0')
            tile = '5' + tile[1];
        if (tile[1] === 'm')
            return parseInt(tile);
        if (tile[1] === 'p')
            return 9 + parseInt(tile);
        if (tile[1] === 's')
            return 18 + parseInt(tile);
        if (tile[1] === 'z')
            return 27 + parseInt(tile);
    }
    else if (tile[2] === SPT_Suf) {
        if (type && tile[0] === '0') {
            if (tile[1] === 'm')
                return 35 + SPT_Offset;
            if (tile[1] === 'p')
                return 36 + SPT_Offset;
            if (tile[1] === 's')
                return 37 + SPT_Offset;
        }
        if (tile[0] === '0')
            tile = '5' + tile[1];
        if (tile[1] === 'm')
            return parseInt(tile) + SPT_Offset;
        if (tile[1] === 'p')
            return 9 + parseInt(tile) + SPT_Offset;
        if (tile[1] === 's')
            return 18 + parseInt(tile) + SPT_Offset;
        if (tile[1] === 'z')
            return 27 + parseInt(tile) + SPT_Offset;
    }
    throw new Error(roundInfo() + ` tile2Int 输入不合规: ${tile}`);
};
const int2Tile = (x, type = false) => {
    if (x === 0)
        return Tbd;
    if (!type) {
        if (x >= 1 && x <= 9)
            return x.toString() + 'm';
        if (x >= 10 && x <= 18)
            return (x - 9).toString() + 'p';
        if (x >= 19 && x <= 27)
            return (x - 18).toString() + 's';
        if (x >= 28 && x <= 34)
            return (x - 27).toString() + 'z';
        if (x === 35)
            return '0m';
        if (x === 36)
            return '0p';
        if (x === 37)
            return '0s';
    }
    else {
        if (x >= 1 && x <= 9)
            return x.toString() + 'm' + SPT_Suf;
        if (x >= 10 && x <= 18)
            return (x - 9).toString() + 'p' + SPT_Suf;
        if (x >= 19 && x <= 27)
            return (x - 18).toString() + 's' + SPT_Suf;
        if (x >= 28 && x <= 34)
            return (x - 27).toString() + 'z' + SPT_Suf;
        if (x === 35)
            return '0m' + SPT_Suf;
        if (x === 36)
            return '0p' + SPT_Suf;
        if (x === 37)
            return '0s' + SPT_Suf;
    }
    throw new Error(roundInfo() + ` int2Tile 输入不合规: ${x}`);
};
const cmp = (x, y) => tile2Int(x) - tile2Int(y);
const randomCmp = () => Math.random() - 0.5;
const inTiles = (x, y) => {
    if (typeof x == 'string')
        x = [x];
    let cnt = [], cnt2 = [];
    for (let i = C1m; i <= C0s + SPT_Offset; i++)
        cnt[i] = cnt2[i] = 0;
    for (let i in x)
        cnt[tile2Int(x[i], true, true)]++;
    for (let i in y)
        cnt2[tile2Int(y[i], true, true)]++;
    for (let i = C1m; i <= C0s + SPT_Offset; i++)
        if (cnt[i] > cnt2[i])
            return false;
    return true;
};
const updateShezhangzt = (seat) => {
    if (!is_chuanma() && !is_guobiao() && !no_zhenting()) {
        shezhangzt[seat] = false;
        let tingpais = calcTingpai(seat);
        for (let i in tingpais)
            for (let j in paihe[seat].tiles)
                if (isEqualTile(tingpais[i].tile, paihe[seat].tiles[j]))
                    shezhangzt[seat] = true;
        updateZhenting();
    }
};
const updatePrezhenting = (seat, tile, is_angang = false) => {
    if (!is_chuanma() && !is_guobiao() && !no_zhenting()) {
        for (let i = 0; i < player_cnt; i++) {
            if (i === seat)
                continue;
            let tingpais_i = calcTingpai(i);
            for (let j in tingpais_i)
                if (isEqualTile(tile, tingpais_i[j].tile)) {
                    if (!is_angang) {
                        pretongxunzt[i] = true;
                        break;
                    }
                    else {
                        let tiles = player_tiles[i];
                        tiles.push(tile);
                        if (calcHupai(tiles) === 3) {
                            pretongxunzt[i] = true;
                            tiles.pop();
                            break;
                        }
                        tiles.pop();
                    }
                }
        }
        for (let i = 0; i < player_cnt; i++) {
            if (liqi_info[i].liqi === 0)
                continue;
            let tingpais_i = calcTingpai(i);
            for (let j in tingpais_i)
                if (isEqualTile(tile, tingpais_i[j].tile)) {
                    if (!is_angang) {
                        prelizhizt[i] = true;
                        break;
                    }
                    else {
                        let tiles = player_tiles[i];
                        tiles.push(tile);
                        if (calcHupai(tiles) === 3) {
                            prelizhizt[i] = true;
                            tiles.pop();
                            break;
                        }
                        tiles.pop();
                    }
                }
        }
    }
};
const updateZhenting = () => {
    for (let i = 0; i < player_cnt; i++)
        zhenting[i] = shezhangzt[i] || tongxunzt[i] || lizhizt[i];
};
const lstLiqi2Liqi = (type = false) => {
    let ret = null;
    if (lst_liqi != null) {
        let need_bangzi = liqi_need;
        if (lst_liqi.beishui_type === 1)
            need_bangzi = 5;
        else if (lst_liqi.beishui_type === 2)
            need_bangzi = 10;
        if (scores[lst_liqi.seat] >= need_bangzi * 1000 || is_fufenliqi()) {
            liqibang += need_bangzi;
            scores[lst_liqi.seat] -= need_bangzi * 1000;
            liqi_info[lst_liqi.seat] = {
                liqi: lst_liqi.liqi,
                yifa: get_field_spell_mode2() === 2 ? 3 : 1,
                kai: lst_liqi.kai,
                beishui_type: lst_liqi.beishui_type,
                xia_ke_shang: { score_coefficients: calcXiaKeShang() },
            };
            ret = {
                seat: lst_liqi.seat,
                liqibang: liqibang,
                score: scores[lst_liqi.seat],
                liqi_type_beishuizhizhan: lst_liqi.beishui_type,
                xia_ke_shang: { score_coefficients: calcXiaKeShang() },
            };
        }
        else if (type)
            ret = {
                seat: lst_liqi.seat,
                liqibang: liqibang,
                score: scores[lst_liqi.seat],
                failed: true,
            };
        lst_liqi = null;
    }
    return ret;
};
const getAllTingpai = () => {
    let tingpai = [];
    let lastile = player_tiles[ju].pop();
    if (!is_heqie_mode())
        for (let i = 0; i < player_cnt; i++) {
            let tingpais1 = calcTingpai(i);
            if (tingpais1.length > 0)
                tingpai.push({ seat: i, tingpais1: tingpais1 });
        }
    player_tiles[ju].push(lastile);
    return tingpai;
};
const push2PlayerTiles = (seat) => {
    let lst_action = getLstAction(), lst_name = getLstAction().name;
    if (lst_name === 'RecordDiscardTile' || lst_name === 'RecordRevealTile' || lst_name === 'RecordLockTile')
        player_tiles[seat].push(lst_action.data.tile);
    else if (lst_name === 'RecordBaBei')
        player_tiles[seat].push(lst_action.data.tile);
    else if (lst_name === 'RecordAnGangAddGang')
        player_tiles[seat].push(lst_action.data.tiles);
};
const fulu2Ming = (seat) => {
    let ming = [];
    for (let i in fulu[seat]) {
        let tiles = fulu[seat][i].tile;
        if (fulu[seat][i].type === 0)
            ming.push(`shunzi(${tiles[0]},${tiles[1]},${tiles[2]})`);
        else if (fulu[seat][i].type === 1)
            ming.push(`kezi(${tiles[0]},${tiles[1]},${tiles[2]})`);
        else if (fulu[seat][i].type === 2)
            ming.push(`minggang(${tiles[0]},${tiles[1]},${tiles[2]},${tiles[3]})`);
        else if (fulu[seat][i].type === 3)
            ming.push(`angang(${tiles[0]},${tiles[1]},${tiles[2]},${tiles[3]})`);
    }
    return ming;
};
const eraseMingpai = (seat, tile) => {
    if (mingpais[seat][tile2Int(tile, true)] > 0) {
        mingpais[seat][tile2Int(tile, true)]--;
        return true;
    }
    return false;
};
const updateMuyu = (type = false) => {
    if (type) {
        muyu.id++;
        muyu.count = 5;
        if (muyu_seats.length > 0) {
            muyu.seat = parseInt(muyu_seats[0]);
            muyu_seats = muyu_seats.substring(1);
        }
        else
            muyu.seat = Math.floor(Math.random() * player_cnt);
        muyu_times = [1, 1, 1, 1];
        muyu_times[muyu.seat]++;
    }
    else
        muyu.count--;
};
const huazhu = (seat) => {
    for (let i in player_tiles[seat]) {
        if (Math.floor((tile2Int(player_tiles[seat][i]) - 1) / 9) === 0 && gaps[seat] === 1)
            return true;
        if (Math.floor((tile2Int(player_tiles[seat][i]) - 1) / 9) === 1 && gaps[seat] === 0)
            return true;
        if (Math.floor((tile2Int(player_tiles[seat][i]) - 1) / 9) === 2 && gaps[seat] === 2)
            return true;
    }
    for (let i in fulu[seat]) {
        if (Math.floor((tile2Int(fulu[seat][i].tile[0]) - 1) / 9) === 0 && gaps[seat] === 1)
            return true;
        if (Math.floor((tile2Int(fulu[seat][i].tile[0]) - 1) / 9) === 1 && gaps[seat] === 0)
            return true;
        if (Math.floor((tile2Int(fulu[seat][i].tile[0]) - 1) / 9) === 2 && gaps[seat] === 2)
            return true;
    }
    return false;
};
const isDora = (tile) => {
    if (tile2Int(tile) >= C0m && tile2Int(tile) <= C0s)
        return true;
    let doras0 = calcDoras();
    for (let i in doras0)
        if (tile2Int(tile) === dora_nxt[tile2Int(doras0[i])])
            return true;
    return false;
};
const calcTianming = (seat, zimo) => {
    let sum = 1;
    for (let i in player_tiles[seat]) {
        if (!zimo && parseInt(i) === player_tiles[seat].length - 1)
            break;
        if (player_tiles[seat][i].length >= 2 && player_tiles[seat][i][2] === SPT_Suf)
            sum++;
    }
    for (let i in fulu[seat])
        for (let j in fulu[seat][i].tile) {
            if (fulu[seat][i].type !== 3 && parseInt(j) === fulu[seat][i].tile.length - 1)
                break;
            if (fulu[seat][i].tile[j].length > 2 && fulu[seat][i].tile[j][2] === SPT_Suf)
                sum++;
        }
    return sum;
};
const updateShoumoqie = (seat) => {
    for (let k = 0; k < 2; k++) {
        let flag = !!k, len = 0;
        for (let i = 0; i < shoumoqie[seat].length; i++)
            if (shoumoqie[seat][i] === flag) {
                let j = i + 1;
                while (shoumoqie[seat][j] === flag && j < shoumoqie[seat].length)
                    j++;
                len = Math.max(len, j - i);
                i = j + 1;
            }
        yongchang_data[seat][flag ? 'shouqie_count' : 'moqie_count'] = len;
        yongchang_data[seat][flag ? 'shouqie_bonus' : 'moqie_bonus'] = calcBonus(seat, flag);
    }
    function calcBonus(seat, flag) {
        const val = yongchang_data[seat][flag ? 'shouqie_count' : 'moqie_count'];
        if (!flag) {
            if (val < 3)
                return 0;
            else if (val < 5)
                return 1;
            else if (val < 7)
                return 2;
            else if (val < 9)
                return 3;
            else if (val < 12)
                return 5;
            else
                return 12;
        }
        else {
            if (val < 3)
                return 0;
            else if (val < 6)
                return 1;
            else if (val < 9)
                return 2;
            else if (val < 12)
                return 3;
            else if (val < 18)
                return 5;
            else
                return 12;
        }
    }
};
const calcXiaKeShang = () => {
    let times = [1, 1, 1, 1];
    for (let i = 0; i < player_cnt; i++)
        if (is_xiakeshang() && scores[i] < 30000) {
            if (scores[i] < 10000)
                times[i] = 4;
            else if (scores[i] < 20000)
                times[i] = 3;
            else
                times[i] = 2;
        }
    return times;
};
let huleOnePlayer = (seat) => {
    const qieshang = (point) => Math.ceil(point / 100) * 100;
    let lst_action = getLstAction(), lst_name = getLstAction().name;
    let zimo = false;
    if (lst_name === 'RecordDealTile' || lst_name === 'RecordNewRound')
        zimo = true;
    else
        push2PlayerTiles(seat);
    let fangchong_seat;
    if (!zimo)
        fangchong_seat = lst_action.data.seat;
    if (is_hunzhiyiji() && !zimo && hunzhiyiji_info[fangchong_seat].liqi !== 0)
        hunzhiyiji_info[fangchong_seat].overload = true;
    let ming = fulu2Ming(seat);
    let qinjia = seat === ju;
    let liqi = liqi_info[seat].liqi !== 0;
    let hand = player_tiles[seat].slice();
    let hu_tile = hand[hand.length - 1];
    hand.pop();
    let points = calcFan(seat, zimo, fangchong_seat);
    let sudian = calcSudian(points);
    let val = 0, title_id = 0;
    for (let i in points.fans)
        val += points.fans[i].val;
    if (!is_qingtianjing()) {
        if (points.yiman)
            title_id = val + 4;
        else if (sudian === 8000)
            title_id = 11;
        else if (sudian === 6000)
            title_id = 4;
        else if (sudian === 4000)
            title_id = 3;
        else if (sudian === 3000)
            title_id = 2;
        else if (sudian === 2000)
            title_id = 1;
    }
    let tianming_bonus = 1;
    if (is_tianming())
        tianming_bonus = calcTianming(seat, zimo);
    let xia_ke_shang_coefficient = calcXiaKeShang()[seat];
    let extra_times = tianming_bonus * xia_ke_shang_coefficient;
    let zhahu = false;
    if (calcHupai(player_tiles[seat]) === 0 || sudian === -2000)
        zhahu = true;
    if ((calcHupai(player_tiles[seat]) !== 3 || no_guoshiangang()) && lst_name === 'RecordAnGangAddGang' && lst_action.data.type === 3)
        zhahu = true;
    if (!zimo && zhenting[seat])
        zhahu = true;
    if (lst_name === 'RecordRevealTile' || lst_name === 'RecordLockTile' && lst_action.data.lock_state !== 0)
        zhahu = true;
    let point_rong, point_sum, point_zimo_qin, point_zimo_xian;
    let doras0 = calcDoras();
    let li_doras0 = [];
    if (liqi_info[seat].liqi !== 0)
        for (let i = 0; i < dora_cnt.licnt; i++)
            li_doras0[i] = li_doras[i];
    if (zhahu) {
        [point_rong, point_sum, point_zimo_qin, point_zimo_xian] = calcPoint(-2000);
        for (let i = 0; i < player_cnt; i++) {
            if (i === seat || huled[i])
                continue;
            let delta_point = 0;
            if (i === ju || seat === ju) {
                delta_point = point_zimo_qin * muyu_times[i] * muyu_times[seat];
                delta_scores[i] -= delta_point;
                delta_scores[seat] += delta_point;
            }
            else {
                delta_point = point_zimo_xian * muyu_times[i] * muyu_times[seat];
                delta_scores[i] -= delta_point;
                delta_scores[seat] += delta_point;
            }
        }
        player_tiles[seat].pop();
        return {
            count: 0,
            doras: doras0,
            li_doras: li_doras0,
            fans: [{ val: 0, id: 9000 }],
            fu: 0,
            hand: hand,
            hu_tile: hu_tile,
            liqi: liqi,
            ming: ming,
            point_rong: -point_rong,
            point_sum: -point_sum,
            point_zimo_qin: -point_zimo_qin,
            point_zimo_xian: -point_zimo_xian,
            qinjia: qinjia,
            seat: seat,
            title_id: 1,
            yiman: false,
            zimo: zimo,
            dadian: is_xuezhandaodi() || is_wanxiangxiuluo() || player_cnt === 2 ? -delta_scores[seat] : undefined,
        };
    }
    [point_rong, point_sum, point_zimo_qin, point_zimo_xian] = calcPoint(sudian);
    point_rong = qieshang(point_rong) * extra_times;
    point_sum = qieshang(point_sum) * extra_times;
    point_zimo_qin = qieshang(point_zimo_qin) * extra_times;
    point_zimo_xian = qieshang(point_zimo_xian) * extra_times;
    if (baopai[seat].length > 0) {
        let delta_point = 0;
        let yiman_sudian = 8000;
        let baoval = 0;
        for (let j in baopai[seat])
            baoval += baopai[seat][j].val;
        let feibao_rong, feibao_zimo_qin, feibao_zimo_xian;
        [feibao_rong, , feibao_zimo_qin, feibao_zimo_xian] = calcPoint((val - baoval) * yiman_sudian);
        feibao_rong = qieshang(feibao_rong) * extra_times;
        feibao_zimo_qin = qieshang(feibao_zimo_qin) * extra_times;
        feibao_zimo_xian = qieshang(feibao_zimo_xian) * extra_times;
        if (zimo) {
            for (let j in baopai[seat]) {
                for (let i = 0; i < player_cnt; i++) {
                    if (i === seat || huled[i])
                        continue;
                    if (i === ju || seat === ju) {
                        delta_point = baopai[seat][j].val * 2 * yiman_sudian * muyu_times[i] * muyu_times[seat] * extra_times;
                        delta_scores[baopai[seat][j].seat] -= delta_point;
                        delta_scores[seat] += delta_point;
                    }
                    else {
                        delta_point = baopai[seat][j].val * yiman_sudian * muyu_times[i] * muyu_times[seat] * extra_times;
                        delta_scores[baopai[seat][j].seat] -= delta_point;
                        delta_scores[seat] += delta_point;
                    }
                }
            }
            for (let i = 0; i < player_cnt; i++) {
                if (i === seat || huled[i])
                    continue;
                let equ_seat = i;
                if (baogang_seat !== -1 && !huled[baogang_seat])
                    equ_seat = baogang_seat;
                if (i === ju || seat === ju) {
                    delta_point = feibao_zimo_qin * muyu_times[i] * muyu_times[seat];
                    delta_scores[equ_seat] -= delta_point;
                    delta_scores[seat] += delta_point;
                }
                else {
                    delta_point = feibao_zimo_xian * muyu_times[i] * muyu_times[seat];
                    delta_scores[equ_seat] -= delta_point;
                    delta_scores[seat] += delta_point;
                }
            }
        }
        else {
            for (let j in baopai[seat]) {
                delta_point = baopai[seat][j].val * yiman_sudian * 2 * muyu_times[fangchong_seat] * muyu_times[seat] * extra_times;
                if (qinjia)
                    delta_point *= 1.5;
                delta_scores[baopai[seat][j].seat] -= delta_point;
                delta_scores[seat] += delta_point;
            }
            delta_point = (point_rong + feibao_rong) / 2 * muyu_times[fangchong_seat] * muyu_times[seat];
            delta_scores[fangchong_seat] -= delta_point;
            delta_scores[seat] += delta_point;
        }
    }
    else if (baogang_seat !== -1 && !huled[baogang_seat] && zimo) {
        let delta_point = 0;
        for (let i = 0; i < player_cnt; i++) {
            if (i === seat || huled[i])
                continue;
            if (i === ju || seat === ju) {
                delta_point = point_zimo_qin * muyu_times[i] * muyu_times[seat];
                delta_scores[baogang_seat] -= delta_point;
                delta_scores[seat] += delta_point;
            }
            else {
                delta_point = point_zimo_xian * muyu_times[i] * muyu_times[seat];
                delta_scores[baogang_seat] -= delta_point;
                delta_scores[seat] += delta_point;
            }
        }
    }
    else {
        let delta_point = 0;
        if (zimo) {
            for (let i = 0; i < player_cnt; i++) {
                if (i === seat || huled[i])
                    continue;
                if (i === ju || seat === ju) {
                    delta_point = point_zimo_qin * muyu_times[i] * muyu_times[seat];
                    delta_scores[i] -= delta_point;
                    delta_scores[seat] += delta_point;
                }
                else {
                    delta_point = point_zimo_xian * muyu_times[i] * muyu_times[seat];
                    delta_scores[i] -= delta_point;
                    delta_scores[seat] += delta_point;
                }
            }
        }
        else {
            delta_point = point_rong * muyu_times[fangchong_seat] * muyu_times[seat];
            delta_scores[fangchong_seat] -= delta_point;
            delta_scores[seat] += delta_point;
        }
    }
    let dadian = Math.max(delta_scores[seat], -delta_scores[seat]);
    if (get_field_spell_mode3() === 3 && liqi_info[seat].liqi !== 0) {
        let diff = 300 * spell_hourglass[seat];
        if (delta_scores[seat] <= diff)
            for (let i = 0; i < player_cnt; i++)
                delta_scores[i] = 0;
        else {
            delta_scores[seat] -= diff;
            if (zimo)
                for (let i = 0; i < player_cnt; i++) {
                    if (i === seat)
                        continue;
                    delta_scores[i] += diff / 3;
                }
            else
                delta_scores[fangchong_seat] += diff;
        }
    }
    if (get_field_spell_mode1() === 5 && seat === ju && !zimo) {
        delta_scores[seat] += points.dora_bonus * 1000;
        delta_scores[fangchong_seat] -= points.dora_bonus * 1000;
    }
    calcChangGong();
    player_tiles[seat].pop();
    return {
        count: val,
        doras: doras0,
        li_doras: li_doras0,
        fans: points.fans,
        fu: points.fu,
        hand: hand,
        hu_tile: hu_tile,
        liqi: liqi,
        ming: ming,
        point_rong: point_rong,
        point_sum: point_sum,
        point_zimo_qin: point_zimo_qin,
        point_zimo_xian: point_zimo_xian,
        qinjia: qinjia,
        seat: seat,
        title_id: title_id,
        yiman: points.yiman,
        zimo: zimo,
        tianming_bonus: is_tianming() ? tianming_bonus : undefined,
        xia_ke_shang_coefficient: is_xiakeshang() ? xia_ke_shang_coefficient : undefined,
        dadian: is_xuezhandaodi() || is_wanxiangxiuluo() || player_cnt === 2 ? dadian : undefined,
    };
    function calcPoint(c_sudian) {
        let rong, sum, zimo_qin, zimo_xian;
        if (qinjia) {
            rong = 6 * c_sudian;
            sum = 6 * c_sudian;
            zimo_qin = 2 * c_sudian;
            zimo_xian = 2 * c_sudian;
            if (no_zimosun())
                zimo_xian = 6 / (player_cnt - 1) * c_sudian;
            else
                sum = 2 * (player_cnt - 1) * c_sudian;
        }
        else {
            rong = 4 * c_sudian;
            sum = 4 * c_sudian;
            zimo_qin = 2 * c_sudian;
            zimo_xian = c_sudian;
            if (no_zimosun()) {
                zimo_qin = (player_cnt + 2) / (player_cnt - 1) * c_sudian;
                zimo_xian = 3 / (player_cnt - 1) * c_sudian;
            }
            else
                sum = player_cnt * c_sudian;
        }
        return [rong, sum, zimo_qin, zimo_xian];
    }
    function calcChangGong() {
        let equal_seat = fangchong_seat;
        let baopai_same_seat = true;
        let all_baopai = true;
        if (baopai[seat].length > 0) {
            let baoval = 0;
            for (let i in baopai[seat]) {
                baoval += baopai[seat][i].val;
                if (baopai[seat][0].seat !== baopai[seat][i].seat)
                    baopai_same_seat = false;
            }
            all_baopai = val === baoval;
        }
        if (baogang_seat !== -1 && zimo && !huled[baogang_seat])
            equal_seat = baogang_seat;
        else if (baopai[seat].length > 0 && zimo && all_baopai && baopai_same_seat)
            equal_seat = baopai[seat][0].seat;
        let delta_point;
        if (equal_seat !== undefined) {
            delta_point = (player_cnt - 1) * 100 * benchangbang * get_ben_times();
            delta_scores[equal_seat] -= delta_point;
            delta_scores[seat] += delta_point;
        }
        else {
            delta_point = 100 * benchangbang * get_ben_times();
            for (let i = 0; i < player_cnt; i++) {
                if (i === seat || huled[i])
                    continue;
                delta_scores[i] -= delta_point;
                delta_scores[seat] += delta_point;
            }
        }
        benchangbang = 0;
        delta_scores[seat] += liqibang * 1000;
        liqibang = 0;
    }
};
let huleOnePlayerChuanma = (seat) => {
    let lst_action = getLstAction(), lst_name = getLstAction().name;
    let zimo = false;
    if (lst_name === 'RecordDealTile' || lst_name === 'RecordNewRound')
        zimo = true;
    else
        push2PlayerTiles(seat);
    let fangchong_seat;
    if (!zimo)
        fangchong_seat = lst_action.data.seat;
    let ming = fulu2Ming(seat);
    let hand = player_tiles[seat].slice();
    let hu_tile = hand[hand.length - 1];
    hand.pop();
    let points = calcFanChuanma(seat, zimo);
    let sudian = calcSudianChuanma(points);
    let val = 0;
    for (let i in points.fans)
        val += points.fans[i].val;
    let zhahu = false;
    if (huazhu(seat) || calcHupai(player_tiles[seat]) === 0)
        zhahu = true;
    if (lst_name === 'RecordAnGangAddGang' && lst_action.data.type === 3)
        zhahu = true;
    if (zhahu) {
        for (let i = 0; i < player_cnt; i++) {
            if (i === seat || huled[i])
                continue;
            delta_scores[i] -= -33000;
            delta_scores[seat] += -33000;
        }
        player_tiles[seat].pop();
        return {
            seat: seat,
            hand: hand,
            ming: ming,
            hu_tile: hu_tile,
            zimo: zimo,
            yiman: false,
            count: 0,
            fans: [{ val: 0, id: 9000 }],
            fu: 0,
            title_id: 0,
            dadian: -delta_scores[seat],
            liqi: false,
            qinjia: false,
            doras: [],
            li_doras: [],
        };
    }
    if (zimo)
        for (let i = 0; i < player_cnt; i++) {
            if (i === seat || huled[i])
                continue;
            delta_scores[i] -= sudian + 1000;
            delta_scores[seat] += sudian + 1000;
        }
    else {
        delta_scores[fangchong_seat] -= sudian;
        delta_scores[seat] += sudian;
    }
    let dadian = Math.max(delta_scores[seat], -delta_scores[seat]);
    player_tiles[seat].pop();
    return {
        seat: seat,
        hand: hand,
        ming: ming,
        hu_tile: hu_tile,
        zimo: zimo,
        yiman: false,
        count: val,
        fans: points.fans,
        fu: points.fu,
        title_id: 0,
        dadian: dadian,
        liqi: false,
        qinjia: false,
        doras: [],
        li_doras: [],
    };
};
let huleOnePlayerGuobiao = (seat) => {
    let lst_action = getLstAction(), lst_name = getLstAction().name;
    let zimo = false;
    if (lst_name === 'RecordDealTile' || lst_name === 'RecordNewRound')
        zimo = true;
    else
        push2PlayerTiles(seat);
    let fangchong_seat;
    if (!zimo)
        fangchong_seat = lst_action.data.seat;
    let ming = fulu2Ming(seat);
    let qinjia = seat === ju;
    let hand = player_tiles[seat].slice();
    let hu_tile = hand[hand.length - 1];
    hand.pop();
    let points = calcFanGuobiao(seat, zimo);
    let sudian = calcSudianGuobiao(points), sudian_no_huapai = calcSudianGuobiao(points, true);
    let val = 0;
    for (let i in points.fans)
        val += points.fans[i].val;
    let zhahu = false, is_cuohu = false;
    if (calcHupai(player_tiles[seat]) === 0)
        zhahu = true;
    if (lst_name === 'RecordBaBei' || lst_name === 'RecordAnGangAddGang' && lst_action.data.type === 3)
        zhahu = true;
    if (!is_guobiao_no_8fanfu() && sudian_no_huapai < GB_Qihu * scale_points())
        is_cuohu = true;
    if (cuohu[seat])
        is_cuohu = true;
    if (zhahu || is_cuohu) {
        for (let i = 0; i < player_cnt; i++) {
            if (i === seat)
                continue;
            delta_scores[i] += cuohu_points() * scale_points();
            delta_scores[seat] -= cuohu_points() * scale_points();
        }
        if (!zimo)
            player_tiles[seat].pop();
        return {
            count: 0,
            doras: [],
            li_doras: [],
            fans: zhahu ? [{ val: 0, id: 9000 }] : points.fans,
            fu: 0,
            hand: hand,
            hu_tile: hu_tile,
            liqi: false,
            ming: ming,
            point_rong: 3 * cuohu_points() * scale_points(),
            point_sum: 3 * cuohu_points() * scale_points(),
            point_zimo_qin: cuohu_points() * scale_points(),
            point_zimo_xian: cuohu_points() * scale_points(),
            qinjia: qinjia,
            seat: seat,
            title_id: 0,
            yiman: false,
            zimo: zimo,
            cuohu: true,
        };
    }
    if (zimo) {
        for (let i = 0; i < player_cnt; i++) {
            if (i === seat)
                continue;
            delta_scores[i] -= sudian + GB_Qihu * scale_points();
            delta_scores[seat] += sudian + GB_Qihu * scale_points();
        }
    }
    else {
        delta_scores[fangchong_seat] -= sudian;
        delta_scores[seat] += sudian;
        for (let i = 0; i < player_cnt; i++) {
            if (i === seat)
                continue;
            delta_scores[i] -= GB_Qihu * scale_points();
            delta_scores[seat] += GB_Qihu * scale_points();
        }
    }
    player_tiles[seat].pop();
    return {
        count: val,
        doras: [],
        li_doras: [],
        fans: points.fans,
        fu: points.fu,
        hand: hand,
        hu_tile: hu_tile,
        liqi: false,
        ming: ming,
        point_rong: sudian + 3 * GB_Qihu * scale_points(),
        point_sum: 3 * (sudian + GB_Qihu * scale_points()),
        point_zimo_qin: sudian + GB_Qihu * scale_points(),
        point_zimo_xian: sudian + GB_Qihu * scale_points(),
        qinjia: qinjia,
        seat: seat,
        title_id: 0,
        yiman: false,
        zimo: zimo,
        cuohu: false,
    };
};
const calcFan = (seat, zimo, fangchong) => {
    const updateRet = (x) => {
        if (calcSudian(ret, 1) < calcSudian(x, 1))
            ret = x;
    };
    let tiles = player_tiles[seat];
    let lastile = tiles[tiles.length - 1];
    let fulu_cnt = 0;
    let ret = { yiman: false, fans: [], fu: 0 };
    let cnt = [];
    for (let i = Cbd; i <= C0s; i++)
        cnt[i] = 0;
    for (let i in tiles)
        cnt[tile2Int(tiles[i])]++;
    let partition = [];
    for (let i in fulu[seat])
        if (fulu[seat][i].type !== 4) {
            if (fulu[seat][i].type !== 3)
                fulu_cnt++;
            partition.push(fulu[seat][i]);
        }
    if (get_field_spell_mode1() === 1 && seat === ju && fulu_cnt === 0 && !zimo && liqi_info[seat].liqi !== 0)
        return ret;
    if (!is_wanxiangxiuluo())
        normalCalc();
    else if (cnt[Cbd] === 1) {
        cnt[Cbd]--;
        tiles.splice(tiles.indexOf(Tbd), 1);
        for (let j = C1m; j <= C7z; j++) {
            cnt[j]++;
            tiles.push(int2Tile(j));
            normalCalc();
            tiles.pop();
            cnt[j]--;
        }
        tiles.unshift(Tbd);
    }
    if (is_yifanjieguyi() && calcHupai(tiles) === 12) {
        let ans = { yiman: !is_qingtianjing(), fans: [], fu: 25 };
        if (liqi_info[seat].yifa !== 0 && liqi_info[seat].liqi === 0 && zimo)
            ans.fans.push({ val: 1, id: 9708 });
        updateRet(ans);
    }
    return ret;
    function normalCalc() {
        dfs(1);
        if (calcHupai(tiles) === 3) {
            const menqing = fulu_cnt === 0;
            let tianhu = false;
            let ans = { yiman: !is_qingtianjing(), fans: [], fu: 25 };
            if (liqi_info[seat].yifa !== 0 && liqi_info[seat].liqi === 0)
                if (zimo)
                    if (seat === ju) {
                        ans.fans.push({ val: !is_qingtianjing() ? 1 : 13, id: 35 });
                        tianhu = true;
                    }
                    else
                        ans.fans.push({ val: !is_qingtianjing() ? 1 : 13, id: 36 });
                else if (is_guyi() || is_yifanjieguyi())
                    ans.fans.push({ val: !is_qingtianjing() ? 1 : 13, id: 59 });
            if (menqing && cnt[tile2Int(lastile)] === 1 && !tianhu)
                ans.fans.push({ val: !is_qingtianjing() ? 1 : 13, id: 42 });
            if (menqing && (cnt[tile2Int(lastile)] === 2 || tianhu)) {
                let tmp = { val: !is_qingtianjing() ? 2 : 26, id: 49 };
                if (no_wyakuman())
                    tmp.val /= 2;
                ans.fans.push(tmp);
            }
            if (liqi_info[seat].liqi === 2) {
                let wangpai_num = 14;
                if (player_cnt === 3)
                    wangpai_num = 18;
                else if (player_cnt === 2)
                    wangpai_num = 22;
                if (zimo && paishan.length === wangpai_num && lst_draw_type === 1 || !zimo && paishan.length === wangpai_num)
                    ans.fans.push({ val: !is_qingtianjing() ? 1 : 13, id: 63 });
            }
            updateRet(ans);
        }
    }
    function dfs(now) {
        if (now === C0m) {
            if (partition.length === 5 || partition.length === 7)
                calc();
            return;
        }
        if (cnt[now] === 0) {
            dfs(now + 1);
            return;
        }
        const whatever = [0, 2, 3, 5, 6, 8, 9, 11, 12, 14];
        for (let k in whatever) {
            if (cnt[now] < whatever[k])
                continue;
            cnt[now] -= whatever[k];
            let cnt0 = cnt[now];
            if (whatever[k] % 3 === 2) {
                let kezi_num = (whatever[k] - 2) / 3;
                for (let j = 0; j < kezi_num; j++)
                    partition.push({ type: 6, tile: [int2Tile(now), int2Tile(now), int2Tile(now)] });
                partition.push({ type: 7, tile: [int2Tile(now), int2Tile(now)] });
                dfs(now);
            }
            else if (whatever[k] % 3 === 0)
                for (let j = 0; j < whatever[k] / 3; j++)
                    partition.push({ type: 6, tile: [int2Tile(now), int2Tile(now), int2Tile(now)] });
            if (cnt[nxt2[now]] >= cnt0 && cnt[nxt2[nxt2[now]]] >= cnt0) {
                cnt[now] -= cnt0;
                cnt[nxt2[now]] -= cnt0;
                cnt[nxt2[nxt2[now]]] -= cnt0;
                for (let i = 1; i <= cnt0; i++)
                    partition.push({
                        type: 5,
                        tile: [int2Tile(now), int2Tile(nxt2[now]), int2Tile(nxt2[nxt2[now]])],
                    });
                dfs(now + 1);
                cnt[now] += cnt0;
                cnt[nxt2[now]] += cnt0;
                cnt[nxt2[nxt2[now]]] += cnt0;
                for (let i = 0; i < cnt0; i++)
                    partition.pop();
            }
            for (let i = 0; i < Math.floor((whatever[k] + 1) / 3); i++)
                partition.pop();
            cnt[now] += whatever[k];
        }
    }
    function calc() {
        let cnt2 = [];
        for (let i = C1m; i <= C7z; i++)
            cnt2[i] = 0;
        let partitiontmp = partition.slice();
        for (let i = partitiontmp.length - 1; i >= 0; i--) {
            let tls = partitiontmp[i].tile;
            if (partitiontmp[i].type === 0 || partitiontmp[i].type === 5)
                for (let j = 0; j < 3; j++)
                    cnt2[tile2Int(tls[j])]++;
            else if (partitiontmp[i].type === 1 || partitiontmp[i].type === 6)
                cnt2[tile2Int(tls[0])] += 3;
            else if (partitiontmp[i].type === 2 || partitiontmp[i].type === 3)
                cnt2[tile2Int(tls[0])] += 4;
            else if (partitiontmp[i].type === 7)
                cnt2[tile2Int(tls[0])] += 2;
        }
        for (let i in partitiontmp) {
            let tile = partitiontmp[i].tile, type = partitiontmp[i].type;
            if (type === 5 && (isEqualTile(tile[0], lastile) || isEqualTile(tile[1], lastile) || isEqualTile(tile[2], lastile))) {
                if (!zimo)
                    partitiontmp[i].type = 0;
                let midtile = int2Tile((tile2Int(tile[0]) + tile2Int(tile[1]) + tile2Int(tile[2])) / 3);
                if (isEqualTile(midtile, lastile))
                    updateRet(calc0(2));
                else if (tile2Int(lastile) % 9 === 3 && tile2Int(midtile) % 9 === 2)
                    updateRet(calc0(2));
                else if (tile2Int(lastile) % 9 === 7 && tile2Int(midtile) % 9 === 8)
                    updateRet(calc0(2));
                else
                    updateRet(calc0(0));
                partitiontmp[i].type = 5;
            }
            if (type === 6 && isEqualTile(tile[0], lastile)) {
                if (!zimo)
                    partitiontmp[i].type = 1;
                updateRet(calc0(0));
                partitiontmp[i].type = 6;
            }
            if (type === 7 && isEqualTile(tile[0], lastile))
                updateRet(calc0(2));
        }
        function calc0(tingpaifu) {
            const deleteFan = (id) => {
                for (let i in ans.fans)
                    if (ans.fans[i].id === id) {
                        ans.fans.splice(parseInt(i), 1);
                        break;
                    }
            };
            baopai[seat] = [];
            let tianhu = false;
            let menqing = fulu_cnt === 0;
            let ans = { yiman: !is_qingtianjing(), fans: [], fu: 0, dora_bonus: 0 };
            let typecnt = [];
            let kezi = [], gangzi = [], anke = [], shunzi = [];
            let kezi_num = 0, gangzi_num = 0, anke_num = 0, duizi_num = 0;
            for (let i = C1m; i <= C7z; i++) {
                typecnt[i] = [0, 0, 0, 0, 0, 0, 0, 0];
                anke[i] = gangzi[i] = kezi[i] = shunzi[i] = 0;
            }
            for (let i in partitiontmp) {
                let type = partitiontmp[i].type;
                switch (type) {
                    case 1:
                        kezi[tile2Int(partitiontmp[i].tile[0])]++;
                        break;
                    case 2:
                        kezi[tile2Int(partitiontmp[i].tile[0])]++;
                        gangzi[tile2Int(partitiontmp[i].tile[0])]++;
                        break;
                    case 3:
                        kezi[tile2Int(partitiontmp[i].tile[0])]++;
                        gangzi[tile2Int(partitiontmp[i].tile[0])]++;
                        anke[tile2Int(partitiontmp[i].tile[0])]++;
                        break;
                    case 6:
                        kezi[tile2Int(partitiontmp[i].tile[0])]++;
                        anke[tile2Int(partitiontmp[i].tile[0])]++;
                        break;
                    case 0:
                    case 5:
                        shunzi[(tile2Int(partitiontmp[i].tile[0]) + tile2Int(partitiontmp[i].tile[1]) + tile2Int(partitiontmp[i].tile[2])) / 3]++;
                        break;
                }
                if (type === 1 || type === 2 || type === 3 || type === 6 || type === 7)
                    typecnt[tile2Int(partitiontmp[i].tile[0])][type]++;
                if (type === 0 || type === 5)
                    typecnt[(tile2Int(partitiontmp[i].tile[0]) + tile2Int(partitiontmp[i].tile[1]) + tile2Int(partitiontmp[i].tile[2])) / 3][type]++;
            }
            let beikou = 0, santongshun = false, sanlianke = false;
            for (let i = C1m; i <= C7z; i++) {
                anke_num += anke[i];
                gangzi_num += gangzi[i];
                kezi_num += kezi[i];
                duizi_num += typecnt[i][7];
                if (i >= C1m + 1 && i <= C9m - 1 || i >= C1p + 1 && i <= C9p - 1 || i >= C1s + 1 && i <= C9s - 1)
                    if (kezi[i - 1] >= 1 && kezi[i] >= 1 && kezi[i + 1] >= 1)
                        sanlianke = true;
                beikou += Math.floor(shunzi[i] / 2);
                if (Math.floor(shunzi[i] / 3) >= 1)
                    santongshun = true;
            }
            let flag_ziyise = true, flag_lvyise = true, flag_qinglaotou = true, flag_duanyao = true, flag_hunlaotou = true;
            for (let i = C1m; i <= C7z; i++) {
                if (!judgeTile(int2Tile(i), 'H') && cnt2[i] > 0)
                    flag_ziyise = false;
                if (!judgeTile(int2Tile(i), 'L') && cnt2[i] > 0)
                    flag_lvyise = false;
                if (!judgeTile(int2Tile(i), 'T') && cnt2[i] > 0)
                    flag_qinglaotou = false;
                if (!judgeTile(int2Tile(i), 'D') && cnt2[i] > 0)
                    flag_duanyao = false;
                if (!judgeTile(int2Tile(i), 'Y') && cnt2[i] > 0)
                    flag_hunlaotou = false;
            }
            let wumenqi = true;
            for (let i = 0; i < 5; i++) {
                const wumen_lows = [C1m, C1p, C1s, C1z, C5z], wumen_highs = [C9m, C9p, C9s, C4z, C7z];
                let flag = false;
                for (let j = wumen_lows[i]; j <= wumen_highs[i]; j++)
                    flag = flag || cnt2[j] > 0;
                if (!flag)
                    wumenqi = false;
            }
            let jiulian = [false, ''], yiqi = false, hunyise = false, qingyise = false;
            let jlbd = [0, 3, 1, 1, 1, 1, 1, 1, 1, 3];
            for (let k = 0; k <= 2; k++) {
                if (shunzi[k * 9 + 2] >= 1 && shunzi[k * 9 + 5] >= 1 && shunzi[k * 9 + 8] >= 1)
                    yiqi = true;
                jiulian = [true, ''];
                for (let i = C1m; i <= C9m; i++)
                    if (cnt2[k * 9 + i] < jlbd[i])
                        jiulian = [false, ''];
                    else if (cnt2[k * 9 + i] > jlbd[i])
                        jiulian[1] = int2Tile(k * 9 + i);
                if (jiulian[0])
                    break;
            }
            for (let i = C1m; i <= C7z; i++)
                if (gangzi[i] >= 1)
                    jiulian = [false, ''];
            for (let k = 0; k <= 3; k++) {
                hunyise = qingyise = true;
                for (let i = C1m; i <= C7z; i++)
                    if (Math.floor((i - 1) / 9) !== k && cnt2[i] > 0) {
                        if (i <= C9s)
                            hunyise = false;
                        qingyise = false;
                    }
                if (hunyise)
                    break;
            }
            let sanse = false, sansetongke = false;
            for (let i = C1m; i <= C9m; i++) {
                if (i >= C1m + 1 && i <= C9m - 1)
                    if (shunzi[i] >= 1 && shunzi[i + 9] >= 1 && shunzi[i + 18] >= 1)
                        sanse = true;
                if (kezi[i] >= 1 && kezi[i + 9] >= 1 && kezi[i + 18] >= 1)
                    sansetongke = true;
            }
            let chunquandai = true, hunquandai = true;
            for (let i = C1m; i <= C7z; i++) {
                if (i !== C1m + 1 && i !== C9m - 1 && i !== C1p + 1 && i !== C9p - 1 && i !== C1s + 1 && i !== C9s - 1 && shunzi[i] >= 1)
                    chunquandai = hunquandai = false;
                if (i !== C1m && i !== C9m && i !== C1p && i !== C9p && i !== C1s && i < C9s && kezi[i] + typecnt[i][7] >= 1)
                    chunquandai = hunquandai = false;
                if (i >= C1z && i <= C7z && kezi[i] + typecnt[i][7] >= 1)
                    chunquandai = false;
            }
            let pinghu = true;
            if (duizi_num === 7)
                pinghu = false;
            for (let i = C1m; i <= C7z; i++) {
                if (kezi[i] >= 1)
                    pinghu = false;
                if (typecnt[i][7] === 1) {
                    if (tile2Int(((seat - ju + player_cnt) % player_cnt + 1).toString() + 'z') === i)
                        pinghu = false;
                    if (tile2Int((chang + 1).toString() + 'z') === i)
                        pinghu = false;
                    if (i >= C5z && i <= C7z)
                        pinghu = false;
                }
            }
            let flag_liangmian = false;
            if ((tile2Int(lastile) - 1) % 9 >= 3)
                if (shunzi[tile2Int(lastile) - 1] >= 1)
                    flag_liangmian = true;
            if ((tile2Int(lastile) - 1) % 9 <= 5)
                if (shunzi[tile2Int(lastile) + 1] >= 1)
                    flag_liangmian = true;
            if (!flag_liangmian)
                pinghu = false;
            let xiaosanyuan = false, dasanyuan = false, xiaosixi = false, dasixi = false;
            for (let i = 0; i < 3; i++)
                if (typecnt[C5z + i][7] === 1 && kezi[C5z + (i + 1) % 3] >= 1 && kezi[C5z + (i + 2) % 3] >= 1)
                    xiaosanyuan = true;
            if (kezi[C5z] >= 1 && kezi[C5z + 1] >= 1 && kezi[C5z + 2] >= 1)
                dasanyuan = true;
            for (let i = 0; i < 4; i++)
                if (typecnt[C1z + i][7] === 1 && kezi[C1z + (i + 1) % 4] >= 1 && kezi[C1z + (i + 2) % 4] >= 1 && kezi[C1z + (i + 3) % 4] >= 1)
                    xiaosixi = true;
            if (kezi[C1z] >= 1 && kezi[C1z + 1] >= 1 && kezi[C1z + 2] >= 1 && kezi[C1z + 3] >= 1)
                dasixi = true;
            let alldoras = [0, 0, 0, 0];
            for (let i in fulu[seat])
                if (fulu[seat][i].type === 4) {
                    cnt2[tile2Int(fulu[seat][i].tile[0])]++;
                    alldoras[2]++;
                }
            for (let i = 0; i < dora_cnt.cnt; i++) {
                if (player_cnt === 3 && tile2Int(doras[i]) === C1m)
                    alldoras[0] += cnt2[C9m];
                else if (player_cnt === 2) {
                    if (tile2Int(doras[i]) === C1p)
                        alldoras[0] += cnt2[C9p];
                    if (tile2Int(doras[i]) === C1s)
                        alldoras[0] += cnt2[C9s];
                }
                else {
                    if (get_field_spell_mode2() === 3)
                        alldoras[0] += cnt2[tile2Int(doras[i])];
                    alldoras[0] += cnt2[dora_nxt[tile2Int(doras[i])]];
                }
            }
            for (let i = 0; i < dora_cnt.licnt; i++) {
                if (player_cnt === 3 && tile2Int(li_doras[i]) === C1m)
                    alldoras[3] += cnt2[C9m];
                else if (player_cnt === 2) {
                    if (tile2Int(li_doras[i]) === C1p)
                        alldoras[3] += cnt2[C9p];
                    if (tile2Int(li_doras[i]) === C1s)
                        alldoras[3] += cnt2[C9s];
                }
                else {
                    if (get_field_spell_mode2() === 3)
                        alldoras[3] += cnt2[tile2Int(li_doras[i])];
                    alldoras[3] += cnt2[dora_nxt[tile2Int(li_doras[i])]];
                }
            }
            for (let i in tiles)
                if (tile2Int(tiles[i]) >= C0m && tile2Int(tiles[i]) <= C0s)
                    alldoras[1]++;
            for (let i in fulu[seat])
                for (let j in fulu[seat][i].tile)
                    if (tile2Int(fulu[seat][i].tile[j]) >= C0m && tile2Int(fulu[seat][i].tile[j]) <= C0s)
                        alldoras[1]++;
            for (let i in fulu[seat])
                if (fulu[seat][i].type === 4)
                    cnt2[tile2Int(fulu[seat][i].tile[0])]--;
            if (get_field_spell_mode1() === 5 && seat === ju && !zimo)
                ans.dora_bonus = alldoras[0] + alldoras[1] + alldoras[3];
            if (is_tiandichuangzao() && typecnt[C5z][2] === 1 && typecnt[C5z][7] === 1 && typecnt[C5z][3] === 3) {
                if (!is_qingtianjing()) {
                    ans.fans.push({ val: 6, id: 9001 });
                    return ans;
                }
                else
                    ans.fans.push({ val: 0, id: 9001 });
            }
            if (is_wanwushengzhang() && typecnt[C5z + 1][3] === 4 && typecnt[C5z + 1][7] === 1) {
                if (!is_qingtianjing()) {
                    ans.fans.push({ val: 6, id: 9002 });
                    return ans;
                }
                else
                    ans.fans.push({ val: 0, id: 9002 });
            }
            if (liqi_info[seat].yifa !== 0 && liqi_info[seat].liqi === 0)
                if (zimo)
                    if (seat === ju) {
                        ans.fans.push({ val: !is_qingtianjing() ? 1 : 13, id: 35 });
                        tianhu = true;
                    }
                    else
                        ans.fans.push({ val: !is_qingtianjing() ? 1 : 13, id: 36 });
                else if (is_guyi() || is_yifanjieguyi())
                    ans.fans.push({ val: !is_qingtianjing() ? 1 : 13, id: 59 });
            if (dasanyuan) {
                if (!is_xuezhandaodi() && !is_wanxiangxiuluo() && !no_normalbaopai()) {
                    let fulusanyuancnt = 0;
                    for (let i in fulu[seat]) {
                        let type = fulu[seat][i].type, t_int = tile2Int(fulu[seat][i].tile[0]);
                        if ((type === 1 || type === 2 || type === 3) && (t_int >= C5z && t_int <= C7z)) {
                            fulusanyuancnt++;
                            if (fulusanyuancnt === 3 && fulu[seat][i].from !== undefined)
                                baopai[seat].push({ seat: fulu[seat][i].from, val: 1 });
                        }
                    }
                }
                ans.fans.push({ val: !is_qingtianjing() ? 1 : 13, id: 37 });
            }
            if (menqing && anke_num === 4 && (typecnt[tile2Int(lastile)][7] === 1 || tianhu)) {
                let tmp = { val: !is_qingtianjing() ? 2 : 26, id: 48 };
                if (no_wyakuman())
                    tmp.val /= 2;
                ans.fans.push(tmp);
            }
            else if (menqing && anke_num === 4 && anke[tile2Int(lastile)] - gangzi[tile2Int(lastile)] >= 1 && !tianhu)
                ans.fans.push({ val: !is_qingtianjing() ? 1 : 13, id: 38 });
            if (flag_ziyise)
                ans.fans.push({ val: !is_qingtianjing() ? 1 : 13, id: 39 });
            if (flag_lvyise)
                ans.fans.push({ val: !is_qingtianjing() ? 1 : 13, id: 40 });
            if (flag_qinglaotou)
                ans.fans.push({ val: !is_qingtianjing() ? 1 : 13, id: 41 });
            if (xiaosixi && !dasixi)
                ans.fans.push({ val: !is_qingtianjing() ? 1 : 13, id: 43 });
            if (gangzi_num === 4) {
                if (!is_xuezhandaodi() && !is_wanxiangxiuluo() && is_sigangbaopai() && sigang_bao[seat]) {
                    let fulugangzi = 0;
                    for (let i in fulu[seat])
                        if (fulu[seat][i].type === 2 || fulu[seat][i].type === 3) {
                            fulugangzi++;
                            if (fulugangzi === 4 && fulu[seat][i].from !== undefined)
                                baopai[seat].push({ seat: fulu[seat][i].from, val: 1 });
                        }
                }
                ans.fans.push({ val: !is_qingtianjing() ? 1 : 13, id: 44 });
            }
            if (menqing && jiulian[0] && (isEqualTile(lastile, jiulian[1]) || tianhu)) {
                let tmp = { val: !is_qingtianjing() ? 2 : 26, id: 47 };
                if (no_wyakuman())
                    tmp.val /= 2;
                ans.fans.push(tmp);
            }
            if (menqing && jiulian[0] && !isEqualTile(lastile, jiulian[1]) && !tianhu)
                ans.fans.push({ val: !is_qingtianjing() ? 1 : 13, id: 45 });
            if (dasixi) {
                if (!is_xuezhandaodi() && !is_wanxiangxiuluo() && !no_normalbaopai()) {
                    let fulusixicnt = 0;
                    for (let i in fulu[seat]) {
                        let type = fulu[seat][i].type, t_int = tile2Int(fulu[seat][i].tile[0]);
                        if ((type === 1 || type === 2 || type === 3) && (t_int >= C1z && t_int <= C4z)) {
                            fulusixicnt++;
                            if (fulusixicnt === 4 && fulu[seat][i].from !== undefined)
                                baopai[seat].push({ seat: fulu[seat][i].from, val: no_wyakuman() ? 1 : 2 });
                        }
                    }
                }
                let tmp = { val: !is_qingtianjing() ? 2 : 26, id: 50 };
                if (no_wyakuman())
                    tmp.val /= 2;
                ans.fans.push(tmp);
            }
            let wangpai_num = 14;
            if (player_cnt === 2)
                wangpai_num = 18;
            if (is_guyi() || is_yifanjieguyi()) {
                if (qingyise && duizi_num === 7 && flag_duanyao) {
                    if (cnt2[2] > 0)
                        ans.fans.push({ val: !is_qingtianjing() ? 1 : 13, id: 62 });
                    if (cnt2[11] > 0)
                        ans.fans.push({ val: !is_qingtianjing() ? 1 : 13, id: 60 });
                    if (cnt2[20] > 0)
                        ans.fans.push({ val: !is_qingtianjing() ? 1 : 13, id: 61 });
                }
                if (liqi_info[seat].liqi === 2)
                    if (zimo && paishan.length === wangpai_num && lst_draw_type === 1 || !zimo && paishan.length === wangpai_num)
                        ans.fans.push({ val: !is_qingtianjing() ? 1 : 13, id: 63 });
                if (flag_ziyise && duizi_num === 7 && !no_wyakuman()) {
                    deleteFan(39);
                    let tmp = { val: !is_qingtianjing() ? 2 : 26, id: 64 };
                    if (no_wyakuman())
                        tmp.val /= 2;
                    ans.fans.push(tmp);
                }
            }
            if (is_yifanjieguyi()) {
                let sitongshun = false, silianke = false;
                for (let i = 0; i <= 2; i++)
                    for (let j = C1m; j <= C9m; j++) {
                        if (j !== C1m && j !== C9m && shunzi[i * 9 + j] >= 4)
                            sitongshun = true;
                        if (j <= 6 && kezi[i * 9 + j] >= 1 && kezi[i * 9 + j + 1] >= 1 && kezi[i * 9 + j + 2] >= 1 && kezi[i * 9 + j + 3] >= 1)
                            silianke = true;
                    }
                if (silianke)
                    ans.fans.push({ val: 1, id: 9703 });
                if (sitongshun)
                    ans.fans.push({ val: 1, id: 9704 });
                let hongkongque = true, hongyidian = true, heiyise = true;
                if (cnt2[34] === 0)
                    hongkongque = hongyidian = false;
                for (let i = C1m; i <= C7z; i++) {
                    if (i !== 19 && i !== 23 && i !== 25 && i !== 27 && i !== 34 && i !== 37 && cnt2[i] >= 1)
                        hongkongque = false;
                    if (i !== 20 && i !== 21 && i !== 22 && i !== 24 && i !== 26 && i !== 34 && cnt2[i] >= 1)
                        hongyidian = false;
                    if (i !== 11 && i !== 13 && i !== 17 && i !== 28 && i !== 29 && i !== 30 && i !== 31 && cnt2[i] >= 1)
                        heiyise = false;
                }
                if (hongkongque)
                    ans.fans.push({ val: 1, id: 9705 });
                if (hongyidian)
                    ans.fans.push({ val: 1, id: 9706 });
                if (heiyise)
                    ans.fans.push({ val: 1, id: 9707 });
                if (seat === ju && lianzhuang_cnt >= 7)
                    ans.fans.push({ val: 1, id: 46 });
                let wan_qingyise = true;
                for (let i = C1p; i <= C7z; i++)
                    if (cnt2[i] >= 1)
                        wan_qingyise = false;
                if (wan_qingyise) {
                    let sum = 0;
                    for (let i = 1; i <= 9; i++)
                        sum += cnt2[i] * i;
                    if (sum >= 100)
                        ans.fans.push({ val: 1, id: 9709 });
                }
                let jinmenqiao = false;
                for (let i = 0; i <= 2; i++)
                    if (shunzi[i * 9 + 2] >= 1 && shunzi[i * 9 + 4] >= 1 && shunzi[i * 9 + 6] >= 1 && shunzi[i * 9 + 8] >= 1)
                        jinmenqiao = true;
                if (menqing && jinmenqiao)
                    ans.fans.push({ val: 1, id: 9710 });
                let xinganxian_part1 = false, xinganxian_part2 = false;
                for (let j = 0; j <= 2; j++) {
                    xinganxian_part1 = true;
                    for (let i = C1m; i <= C9m; i++)
                        if (cnt2[j * 9 + i] !== 1)
                            xinganxian_part1 = false;
                    if (xinganxian_part1)
                        break;
                }
                if (kezi[C1z] === 1 && typecnt[C4z][7] === 1 || kezi[C4z] === 1 && typecnt[C1z][7] === 1)
                    xinganxian_part2 = true;
                if (menqing && xinganxian_part1 && xinganxian_part2)
                    ans.fans.push({ val: 1, id: 9711 });
                if (flag_lvyise && cnt2[33] === 0) {
                    deleteFan(40);
                    ans.fans.push({ val: 2, id: 9712 });
                }
            }
            if (liqi_info[seat].kai && !zimo && liqi_info[fangchong].liqi === 0) {
                if (liqi_info[seat].liqi === 1)
                    ans.fans.push({ val: 1, id: 9003 });
                if (liqi_info[seat].liqi === 2)
                    ans.fans.push({ val: 1, id: 9004 });
            }
            if (ans.fans.length > 0 && !is_qingtianjing())
                return ans;
            ans.yiman = false;
            if (liqi_info[seat].yifa !== 0 && liqi_info[seat].liqi === 0 && seat !== ju && !zimo && (is_guyi() || is_yifanjieguyi()))
                if (is_renhumanguan())
                    ans.fans.push({ val: 5, id: 65 });
            if (is_hunzhiyiji()) {
                if (hunzhiyiji_info[seat].liqi === 1)
                    ans.fans.push({ val: 2, id: 804 });
                if (hunzhiyiji_info[seat].liqi === 2)
                    ans.fans.push({ val: 3, id: 805 });
                if (hunzhiyiji_info[seat].liqi !== 0 && !hunzhiyiji_info[seat].overload)
                    ans.fans.push({ val: 1, id: 30 });
            }
            else {
                if (liqi_info[seat].kai) {
                    if (liqi_info[seat].liqi === 1)
                        ans.fans.push({ val: 2, id: 9005 });
                    if (liqi_info[seat].liqi === 2)
                        ans.fans.push({ val: 3, id: 9006 });
                }
                else {
                    if (get_field_spell_mode2() === 5) {
                        if (liqi_info[seat].liqi === 1)
                            ans.fans.push({ val: 2, id: 2 });
                        if (liqi_info[seat].liqi === 2)
                            ans.fans.push({ val: 4, id: 18 });
                    }
                    else if (is_beishuizhizhan()) {
                        if (liqi_info[seat].liqi === 1 && liqi_info[seat].beishui_type === 1)
                            ans.fans.push({ val: 3, id: 806 });
                        else if (liqi_info[seat].liqi === 2 && liqi_info[seat].beishui_type === 1)
                            ans.fans.push({ val: 4, id: 807 });
                        else if (liqi_info[seat].liqi === 1 && liqi_info[seat].beishui_type === 2)
                            ans.fans.push({ val: 5, id: 808 });
                        else if (liqi_info[seat].liqi === 2 && liqi_info[seat].beishui_type === 2)
                            ans.fans.push({ val: 6, id: 809 });
                        else if (liqi_info[seat].liqi === 1)
                            ans.fans.push({ val: 1, id: 2 });
                        else if (liqi_info[seat].liqi === 2)
                            ans.fans.push({ val: 2, id: 18 });
                    }
                    else {
                        if (liqi_info[seat].liqi === 1)
                            ans.fans.push({ val: 1, id: 2 });
                        if (liqi_info[seat].liqi === 2)
                            ans.fans.push({ val: 2, id: 18 });
                    }
                }
                if (get_field_spell_mode2() === 5) {
                    if (liqi_info[seat].liqi !== 0 && liqi_info[seat].yifa !== 0)
                        ans.fans.push({ val: 2, id: 30 });
                }
                else {
                    if (liqi_info[seat].liqi !== 0 && liqi_info[seat].yifa !== 0 && !no_yifa())
                        ans.fans.push({ val: 1, id: 30 });
                }
            }
            let lstname = getLstAction().name;
            if (is_guyi() || is_yifanjieguyi()) {
                if (lstname === 'RecordDiscardTile' && getLstAction().data.is_liqi)
                    ans.fans.push({ val: 1, id: 51 });
                if (!zimo && lst_draw_type === 0 && lstname === 'RecordDiscardTile')
                    if (getLstAction(3) !== undefined && (getLstAction(3).name === 'RecordAnGangAddGang' || getLstAction(3).name === 'RecordChiPengGang'))
                        ans.fans.push({ val: 1, id: 52 });
                if (fulu_cnt === 4)
                    ans.fans.push({ val: 1, id: 53 });
            }
            if (menqing && zimo)
                ans.fans.push({ val: 1, id: 1 });
            if (lstname === 'RecordAnGangAddGang')
                ans.fans.push({ val: 1, id: 3 });
            if (zimo && lst_draw_type === 0)
                ans.fans.push({ val: 1, id: 4 });
            if (zimo && paishan.length === wangpai_num && lst_draw_type === 1)
                ans.fans.push({ val: 1, id: 5 });
            if (!zimo && paishan.length === wangpai_num)
                ans.fans.push({ val: 1, id: 6 });
            if (kezi[C5z] >= 1)
                ans.fans.push({ val: kezi[C5z], id: 7 });
            if (kezi[C5z + 1] >= 1)
                ans.fans.push({ val: kezi[C5z + 1], id: 8 });
            if (kezi[C7z] >= 1)
                ans.fans.push({ val: kezi[C7z], id: 9 });
            if (kezi[tile2Int(((seat - ju + player_cnt) % player_cnt + 1).toString() + 'z')] >= 1)
                ans.fans.push({
                    val: kezi[tile2Int(((seat - ju + player_cnt) % player_cnt + 1).toString() + 'z')],
                    id: 10
                });
            if (kezi[tile2Int((chang + 1).toString() + 'z')] >= 1)
                ans.fans.push({ val: kezi[tile2Int((chang + 1).toString() + 'z')], id: 11 });
            if (flag_duanyao && (!no_shiduan() || no_shiduan() && menqing))
                ans.fans.push({ val: get_field_spell_mode2() === 4 ? 3 : 1, id: 12 });
            if (beikou === 1 && menqing)
                ans.fans.push({ val: 1, id: 13 });
            if (pinghu && menqing)
                ans.fans.push({ val: 1, id: 14 });
            if (hunquandai && !chunquandai && !flag_hunlaotou)
                ans.fans.push({ val: menqing ? 2 : 1, id: 15 });
            if (yiqi)
                ans.fans.push({ val: menqing ? 2 : 1, id: 16 });
            if (sanse)
                ans.fans.push({ val: menqing ? 2 : 1, id: 17 });
            if (sansetongke)
                ans.fans.push({ val: 2, id: 19 });
            if (gangzi_num === 3)
                ans.fans.push({ val: 2, id: 20 });
            if (kezi_num === 4)
                ans.fans.push({ val: 2, id: 21 });
            if (anke_num === 3)
                ans.fans.push({ val: 2, id: 22 });
            if (xiaosanyuan)
                ans.fans.push({ val: 2, id: 23 });
            if (flag_hunlaotou && !flag_qinglaotou)
                ans.fans.push({ val: 2, id: 24 });
            if (duizi_num === 7)
                ans.fans.push({ val: 2, id: 25 });
            if ((is_guyi() || is_yifanjieguyi()) && wumenqi)
                ans.fans.push({ val: 2, id: 54 });
            if ((is_guyi() || is_yifanjieguyi()) && sanlianke)
                ans.fans.push({ val: 2, id: 55 });
            if (chunquandai)
                ans.fans.push({ val: menqing ? 3 : 2, id: 26 });
            if (hunyise && !qingyise)
                ans.fans.push({ val: menqing ? 3 : 2, id: 27 });
            if ((is_guyi() || is_yifanjieguyi()) && santongshun) {
                deleteFan(13);
                ans.fans.push({ val: menqing ? 3 : 2, id: 56 });
            }
            if (beikou === 2 && menqing)
                ans.fans.push({ val: 3, id: 28 });
            if (qingyise)
                ans.fans.push({ val: menqing ? 6 : 5, id: 29 });
            if (is_guyi()) {
                if (zimo && paishan.length === wangpai_num && lst_draw_type === 1 && lastile.substring(0, 2) === '1p') {
                    deleteFan(5);
                    ans.fans.push({ val: 5, id: 57 });
                }
                if (!zimo && paishan.length === wangpai_num && lastile.substring(0, 2) === '9p') {
                    deleteFan(6);
                    ans.fans.push({ val: 5, id: 58 });
                }
            }
            if (is_yifanjieguyi()) {
                let tuibudao = true;
                for (let i = C1m; i <= C7z; i++)
                    if (i !== 10 && i !== 11 && i !== 12 && i !== 13 && i !== 14 && i !== 17 && i !== 18)
                        if (i !== 20 && i !== 22 && i !== 23 && i !== 24 && i !== 26 && i !== 27)
                            if (i !== 32 && cnt2[i] >= 1) {
                                tuibudao = false;
                                break;
                            }
                let have_0m = false, have_0p = false, have_0s = false;
                for (let i in tiles) {
                    if (tiles[i].substring(0, 2) === '0m')
                        have_0m = true;
                    if (tiles[i].substring(0, 2) === '0p')
                        have_0p = true;
                    if (tiles[i].substring(0, 2) === '0s')
                        have_0s = true;
                }
                for (let i in fulu[seat])
                    for (let j in fulu[seat][i].tile) {
                        if (fulu[seat][i].tile[j].substring(0, 2) === '0m')
                            have_0m = true;
                        if (fulu[seat][i].tile[j].substring(0, 2) === '0p')
                            have_0p = true;
                        if (fulu[seat][i].tile[j].substring(0, 2) === '0s')
                            have_0s = true;
                    }
                let chisanse = have_0m && have_0p && have_0s;
                let sansetongguan = false;
                for (let i = 0; i < 3; i++)
                    for (let j = 0; j < 3; j++)
                        for (let k = 0; k < 3; k++)
                            if (i !== j && j !== k && i !== k)
                                if (shunzi[3 * i + 2] >= 1 && shunzi[3 * j + 11] && shunzi[3 * k + 20]) {
                                    sansetongguan = true;
                                    break;
                                }
                if (tuibudao)
                    ans.fans.push({ val: 1, id: 9700 });
                if (chisanse)
                    ans.fans.push({ val: 2, id: 9701 });
                if (sansetongguan)
                    ans.fans.push({ val: menqing ? 2 : 1, id: 9702 });
            }
            if (calcSudian(ans) === -2000)
                return ans;
            if (alldoras[0] !== 0)
                if (!(get_field_spell_mode2() === 1 && liqi_info[seat].liqi !== 0))
                    ans.fans.push({ val: alldoras[0], id: 31 });
            if (alldoras[1] !== 0)
                ans.fans.push({ val: alldoras[1], id: 32 });
            if (alldoras[2] !== 0)
                ans.fans.push({ val: alldoras[2], id: 34 });
            if (liqi_info[seat].liqi !== 0) {
                let times = 1;
                if (get_field_spell_mode2() === 1 && liqi_info[seat].liqi !== 0)
                    times = 2;
                ans.fans.push({ val: alldoras[3] * times, id: 33 });
            }
            if (is_hunzhiyiji())
                if (!zimo && hunzhiyiji_info[fangchong].liqi !== 0)
                    ans.fans.push({ val: 2, id: 803 });
            if (is_yongchang()) {
                let moqie_bonus = yongchang_data[seat].moqie_bonus;
                let shouqie_bonus = yongchang_data[seat].shouqie_bonus;
                if (moqie_bonus !== 0)
                    ans.fans.push({ val: moqie_bonus, id: 801 });
                if (shouqie_bonus !== 0)
                    ans.fans.push({ val: shouqie_bonus, id: 802 });
            }
            if (duizi_num === 7) {
                ans.fu = 25;
                return ans;
            }
            ans.fu = 20;
            if (!pinghu)
                ans.fu += tingpaifu;
            for (let i = C1m; i <= C7z; i++) {
                if (judgeTile(int2Tile(i), 'Y')) {
                    ans.fu += typecnt[i][1] * 4;
                    ans.fu += typecnt[i][2] * 16;
                    ans.fu += typecnt[i][3] * 32;
                    ans.fu += typecnt[i][6] * 8;
                }
                else {
                    ans.fu += typecnt[i][1] * 2;
                    ans.fu += typecnt[i][2] * 8;
                    ans.fu += typecnt[i][3] * 16;
                    ans.fu += typecnt[i][6] * 4;
                }
                if (typecnt[i][7] === 1) {
                    if (no_lianfengsifu()) {
                        if (i === tile2Int(((seat - ju + player_cnt) % player_cnt + 1).toString() + 'z') || i === tile2Int((chang + 1).toString() + 'z'))
                            ans.fu += 2;
                    }
                    else {
                        if (i === tile2Int(((seat - ju + player_cnt) % player_cnt + 1).toString() + 'z'))
                            ans.fu += 2;
                        if (i === tile2Int((chang + 1).toString() + 'z'))
                            ans.fu += 2;
                    }
                    if (i >= 32 && i <= 34)
                        ans.fu += 2;
                }
            }
            if (zimo && !pinghu)
                ans.fu += 2;
            if (!zimo && menqing)
                ans.fu += 10;
            ans.fu = Math.ceil(ans.fu / 10) * 10;
            if (fulu_cnt !== 0 && ans.fu === 20)
                ans.fu = 30;
            return ans;
        }
    }
};
const calcFanChuanma = (seat, zimo, type = false) => {
    const updateRet = (x) => {
        if (calcSudianChuanma(ret, 1) < calcSudianChuanma(x, 1))
            ret = x;
    };
    let tiles = player_tiles[seat];
    if (tiles.length % 3 === 1 && type) {
        let tingpais = calcTingpai(seat), ret = { fans: [], fu: 0 };
        for (let i in tingpais) {
            tiles.push(tingpais[i].tile);
            let tmp = calcFanChuanma(seat, zimo, true);
            updateRet(tmp);
            tiles.pop();
        }
        return ret;
    }
    let lastile = tiles[tiles.length - 1];
    let fulu_cnt = 0;
    let ret = { fans: [], fu: 0 };
    if (huazhu(seat))
        return ret;
    let cnt = [];
    for (let i = C1m; i <= C0s; i++)
        cnt[i] = 0;
    for (let i in tiles)
        cnt[tile2Int(tiles[i])]++;
    let partition = [];
    for (let i in fulu[seat]) {
        partition.push(fulu[seat][i]);
        fulu_cnt++;
    }
    dfs(1);
    if (calcHupai(tiles) === 2) {
        partition = [];
        for (let i = C1m; i <= C9s; i++)
            while (cnt[i] > 0) {
                partition.push({ type: 7, tile: [int2Tile(i), int2Tile(i)] });
                cnt[i] -= 2;
            }
        calc();
    }
    return ret;
    function dfs(now) {
        if (now === C1z) {
            if (partition.length === 5 || partition.length === 7)
                calc();
            return;
        }
        if (cnt[now] === 0) {
            dfs(now + 1);
            return;
        }
        const whatever = [0, 2, 3, 5, 6, 8, 9, 11, 12, 14];
        for (let k in whatever) {
            if (cnt[now] < whatever[k])
                continue;
            cnt[now] -= whatever[k];
            let cnt0 = cnt[now];
            if (whatever[k] % 3 === 2) {
                let kezi_num = (whatever[k] - 2) / 3;
                for (let j = 0; j < kezi_num; j++)
                    partition.push({ type: 6, tile: [int2Tile(now), int2Tile(now), int2Tile(now)] });
                partition.push({ type: 7, tile: [int2Tile(now), int2Tile(now)] });
                dfs(now);
            }
            else if (whatever[k] % 3 === 0)
                for (let j = 0; j < whatever[k] / 3; j++)
                    partition.push({ type: 6, tile: [int2Tile(now), int2Tile(now), int2Tile(now)] });
            if (cnt[nxt2[now]] >= cnt0 && cnt[nxt2[nxt2[now]]] >= cnt0) {
                cnt[now] -= cnt0;
                cnt[nxt2[now]] -= cnt0;
                cnt[nxt2[nxt2[now]]] -= cnt0;
                for (let i = 1; i <= cnt0; i++)
                    partition.push({
                        type: 5,
                        tile: [int2Tile(now), int2Tile(nxt2[now]), int2Tile(nxt2[nxt2[now]])],
                    });
                dfs(now + 1);
                cnt[now] += cnt0;
                cnt[nxt2[now]] += cnt0;
                cnt[nxt2[nxt2[now]]] += cnt0;
                for (let i = 0; i < cnt0; i++)
                    partition.pop();
            }
            for (let i = 0; i < Math.floor((whatever[k] + 1) / 3); i++)
                partition.pop();
            cnt[now] += whatever[k];
        }
    }
    function calc() {
        let cnt2 = [];
        for (let i = C1m; i <= C9s; i++)
            cnt2[i] = 0;
        let partitiontmp = partition.slice();
        for (let i = partitiontmp.length - 1; i >= 0; i--) {
            let tmp_tiles = partitiontmp[i].tile;
            if (partitiontmp[i].type === 0 || partitiontmp[i].type === 5)
                for (let j = 0; j <= 2; j++)
                    cnt2[tile2Int(tmp_tiles[j])]++;
            else if (partitiontmp[i].type === 1 || partitiontmp[i].type === 6)
                cnt2[tile2Int(tmp_tiles[0])] += 3;
            else if (partitiontmp[i].type === 2 || partitiontmp[i].type === 3)
                cnt2[tile2Int(tmp_tiles[0])] += 4;
            else if (partitiontmp[i].type === 7)
                cnt2[tile2Int(tmp_tiles[0])] += 2;
        }
        for (let i in partitiontmp) {
            let tile = partitiontmp[i].tile, type = partitiontmp[i].type;
            if (type === 5 && (isEqualTile(tile[0], lastile) || isEqualTile(tile[1], lastile) || isEqualTile(tile[2], lastile))) {
                if (!zimo)
                    partitiontmp[i].type = 0;
                let midtile = int2Tile((tile2Int(tile[0]) + tile2Int(tile[1]) + tile2Int(tile[2])) / 3);
                if (isEqualTile(midtile, lastile))
                    updateRet(calc0(2));
                else if (tile2Int(lastile) % 9 === 3 && tile2Int(midtile) % 9 === 2)
                    updateRet(calc0(2));
                else if (tile2Int(lastile) % 9 === 7 && tile2Int(midtile) % 9 === 8)
                    updateRet(calc0(2));
                else
                    updateRet(calc0(0));
                partitiontmp[i].type = 5;
            }
            if (type === 6 && isEqualTile(tile[0], lastile)) {
                if (!zimo)
                    partitiontmp[i].type = 1;
                updateRet(calc0(0));
                partitiontmp[i].type = 6;
            }
            if (type === 7 && isEqualTile(tile[0], lastile))
                updateRet(calc0(2));
        }
        function calc0(tingpaifu) {
            let ans = { fans: [], fu: 0 };
            let typecnt = [];
            let kezi = [], gangzi = [], shunzi = [];
            let kezi_num = 0, gangzi_num = 0, duizi_num = 0;
            for (let i = C1m; i <= C9s; i++) {
                typecnt[i] = [0, 0, 0, 0, 0, 0, 0, 0];
                kezi[i] = gangzi[i] = shunzi[i] = 0;
            }
            for (let i in partitiontmp) {
                let p_type = partitiontmp[i].type;
                switch (p_type) {
                    case 1:
                        kezi[tile2Int(partitiontmp[i].tile[0])]++;
                        break;
                    case 2:
                        kezi[tile2Int(partitiontmp[i].tile[0])]++;
                        gangzi[tile2Int(partitiontmp[i].tile[0])]++;
                        break;
                    case 3:
                        kezi[tile2Int(partitiontmp[i].tile[0])]++;
                        gangzi[tile2Int(partitiontmp[i].tile[0])]++;
                        break;
                    case 6:
                        kezi[tile2Int(partitiontmp[i].tile[0])]++;
                        break;
                    case 0:
                    case 5:
                        shunzi[(tile2Int(partitiontmp[i].tile[0]) + tile2Int(partitiontmp[i].tile[1]) + tile2Int(partitiontmp[i].tile[2])) / 3]++;
                        break;
                }
                if (p_type === 1 || p_type === 2 || p_type === 3 || p_type === 6 || p_type === 7)
                    typecnt[tile2Int(partitiontmp[i].tile[0])][p_type]++;
                if (p_type === 0 || p_type === 5)
                    typecnt[(tile2Int(partitiontmp[i].tile[0]) + tile2Int(partitiontmp[i].tile[1]) + tile2Int(partitiontmp[i].tile[2])) / 3][p_type]++;
            }
            for (let i = C1m; i <= C9s; i++) {
                gangzi_num += gangzi[i];
                kezi_num += kezi[i];
            }
            if (partitiontmp.length === 7)
                duizi_num = 7;
            let quandai = true;
            for (let i = C1m; i <= C9s; i++) {
                if (i !== 2 && i !== 8 && i !== 11 && i !== 17 && i !== 20 && i !== 26 && shunzi[i] >= 1)
                    quandai = false;
                if (i !== 1 && i !== 9 && i !== 10 && i !== 18 && i !== 19 && i !== 27 && i < 28 && kezi[i] + typecnt[i][7] >= 1)
                    quandai = false;
            }
            let qingyise = false;
            for (let k = 0; k < 3; k++) {
                qingyise = true;
                for (let i = C1m; i <= C9s; i++)
                    if (Math.floor((i - 1) / 9) !== k && cnt2[i] > 0)
                        qingyise = false;
                if (qingyise)
                    break;
            }
            let jiangdui = true;
            for (let i = C1m; i <= C9s; i++)
                if (i !== 2 && i !== 5 && i !== 8 && i !== 11 && i !== 14 && i !== 17 && i !== 20 && i !== 23 && i !== 26 && cnt2[i] > 0)
                    jiangdui = false;
            ans.fans[1000] = 0;
            ans.fans[1003] = 1;
            for (let i = C1m; i <= C9s; i++)
                ans.fans[1000] += Math.floor(cnt2[i] / 4);
            if (!type && zimo && getLstAction(2) !== undefined && (getLstAction(2).name === 'RecordAnGangAddGang' || getLstAction(2).name === 'RecordChiPengGang'))
                ans.fans[1001] = 1;
            if (!type && !zimo && getLstAction(3) !== undefined && (getLstAction(3).name === 'RecordAnGangAddGang' || getLstAction(3).name === 'RecordChiPengGang'))
                ans.fans[1002] = 1;
            if (!type && getLstAction().name === 'RecordAnGangAddGang')
                ans.fans[1004] = 1;
            if (kezi_num === 4)
                ans.fans[1005] = 2;
            if (qingyise)
                ans.fans[1006] = 3;
            if (duizi_num === 7)
                ans.fans[1007] = 3;
            if (quandai)
                ans.fans[1008] = 3;
            if (fulu_cnt === 4)
                ans.fans[1009] = 3;
            if (qingyise && kezi_num === 4)
                ans.fans[1010] = 4;
            if (jiangdui && kezi_num === 4)
                ans.fans[1011] = 4;
            if (ans.fans[1000] > 0 && duizi_num === 7) {
                ans.fans[1012] = 4;
                ans.fans[1000]--;
            }
            if (qingyise && duizi_num === 7)
                ans.fans[1013] = 5;
            if (qingyise && fulu_cnt === 4)
                ans.fans[1014] = 5;
            if (qingyise && ans.fans[1012] === 4)
                ans.fans[1015] = 6;
            if (gangzi_num === 4) {
                ans.fans[1016] = 6;
                ans.fans[1000] -= 4;
            }
            if (qingyise && gangzi_num === 4)
                ans.fans[1017] = 6;
            if (liqi_info[seat].yifa !== 0 && liqi_info[seat].liqi === 0 && zimo)
                if (seat === ju)
                    ans.fans[1018] = 6;
                else
                    ans.fans[1019] = 6;
            if (qingyise && quandai)
                ans.fans[1020] = 5;
            if (!type && paishan.length === 0)
                ans.fans[1021] = 1;
            if (duizi_num === 7) {
                ans.fu = 25;
                return ans2Fan(ans);
            }
            ans.fu = 20;
            ans.fu += tingpaifu;
            for (let i = C1m; i <= C9s; i++) {
                if (judgeTile(int2Tile(i), 'Y')) {
                    ans.fu += typecnt[i][1] * 4;
                    ans.fu += typecnt[i][2] * 16;
                    ans.fu += typecnt[i][3] * 32;
                    ans.fu += typecnt[i][6] * 8;
                }
                else {
                    ans.fu += typecnt[i][1] * 2;
                    ans.fu += typecnt[i][2] * 8;
                    ans.fu += typecnt[i][3] * 16;
                    ans.fu += typecnt[i][6] * 4;
                }
            }
            if (zimo)
                ans.fu += 2;
            if (!zimo && fulu_cnt === 0)
                ans.fu += 10;
            ans.fu = Math.ceil(ans.fu / 10) * 10;
            if (fulu_cnt !== 0 && ans.fu === 20)
                ans.fu = 30;
            return ans2Fan(ans);
        }
        function ans2Fan(x) {
            let ans = { fans: [], fu: x.fu };
            for (let i = 1019; i >= 1005; i--) {
                if (i === 1014 && x.fans[1020] >= 1) {
                    ans.fans.push({ val: x.fans[1020], id: 1020 });
                    break;
                }
                if (x.fans[i] >= 1) {
                    ans.fans.push({ val: x.fans[i], id: i });
                    break;
                }
                if (i === 1005 && ans.fans.length === 0)
                    ans.fans.push({ val: x.fans[1003], id: 1003 });
            }
            if (x.fans[1000] >= 1)
                ans.fans.push({ val: x.fans[1000], id: 1000 });
            if (x.fans[1001] >= 1)
                ans.fans.push({ val: x.fans[1001], id: 1001 });
            if (x.fans[1002] >= 1)
                ans.fans.push({ val: x.fans[1002], id: 1002 });
            if (x.fans[1004] >= 1)
                ans.fans.push({ val: x.fans[1004], id: 1004 });
            if (x.fans[1021] >= 1)
                ans.fans.push({ val: x.fans[1021], id: 1021 });
            return ans;
        }
    }
};
const calcFanGuobiao = (seat, zimo) => {
    const updateRet = (x) => {
        if (calcSudianGuobiao(ret) < calcSudianGuobiao(x))
            ret = x;
    };
    let tiles = player_tiles[seat];
    let lastile = tiles[tiles.length - 1];
    let fulu_cnt = 0;
    let ret = { fans: [], fu: 0 };
    let cnt = [];
    for (let i = C1m; i <= C0s; i++)
        cnt[i] = 0;
    for (let i in tiles)
        cnt[tile2Int(tiles[i])]++;
    let partition = [];
    for (let i in fulu[seat])
        if (fulu[seat][i].type !== 4) {
            if (fulu[seat][i].type !== 3)
                fulu_cnt++;
            partition.push(fulu[seat][i]);
        }
    dfs(1);
    let result = calcHupai(tiles);
    if (result === 3) {
        let ans = { fans: [], fu: 25 };
        ans.fans.push({ val: 88, id: 8006 });
        let ban_zimo = false;
        if (liqi_info[seat].yifa !== 0 && liqi_info[seat].liqi === 0 && seat === ju && zimo) {
            ans.fans.push({ val: 8, id: 8083 });
            ban_zimo = true;
        }
        let first_tile = true;
        for (let i = 0; i < player_cnt; i++) {
            if (i === ju)
                continue;
            if (!(liqi_info[i].yifa !== 0 && liqi_info[i].liqi === 0))
                first_tile = false;
        }
        if (first_tile && seat !== ju && !zimo)
            ans.fans.push({ val: 8, id: 8084 });
        if (liqi_info[seat].yifa !== 0 && liqi_info[seat].liqi === 0 && seat !== ju && zimo) {
            ans.fans.push({ val: 8, id: 8085 });
            ban_zimo = true;
        }
        else if (liqi_info[seat].yifa !== 0 && liqi_info[seat].liqi === 0 && seat !== ju && !zimo && liqi_info[(ju + 1) % player_cnt].yifa === 0)
            ans.fans.push({ val: 8, id: 8085 });
        if (paishan.length === 0)
            if (zimo) {
                ans.fans.push({ val: 8, id: 8043 });
                ban_zimo = true;
            }
            else
                ans.fans.push({ val: 8, id: 8044 });
        if (getLstAction().name === 'RecordAnGangAddGang')
            ans.fans.push({ val: 8, id: 8046 });
        else {
            let lastile_num = 0;
            for (let i = 0; i < player_cnt; i++) {
                for (let j in paihe[i].tiles)
                    if (isEqualTile(lastile, paihe[i].tiles[j]))
                        lastile_num++;
                for (let j in fulu[i])
                    if (fulu[i][j].from !== undefined)
                        for (let k = 0; k < fulu[i][j].tile.length - 1; k++)
                            if (isEqualTile(lastile, fulu[i][j].tile[k]))
                                lastile_num++;
            }
            if (lastile_num === 4 || lastile_num === 3 && zimo)
                ans.fans.push({ val: 4, id: 8057 });
        }
        if (zimo && !ban_zimo)
            ans.fans.push({ val: 1, id: 8081 });
        updateRet(ans);
    }
    if (result === 4 || result === 5) {
        let qixingbukao = true;
        for (let i = C1z; i <= C7z; i++)
            if (cnt[i] === 0)
                qixingbukao = false;
        let ans = { fans: [], fu: 25 };
        if (qixingbukao)
            ans.fans.push({ val: 24, id: 8019 });
        else if (result === 5) {
            ans.fans.push({ val: 12, id: 8033 });
            ans.fans.push({ val: 12, id: 8034 });
        }
        else
            ans.fans.push({ val: 12, id: 8033 });
        updateRet(ans);
    }
    if (result >= 6 && result <= 11) {
        let row = result - 6;
        let condition = [
            [1, 4, 7, 11, 14, 17, 21, 24, 27],
            [1, 4, 7, 12, 15, 18, 20, 23, 26],
            [2, 5, 8, 10, 13, 16, 21, 24, 27],
            [2, 5, 8, 12, 15, 18, 19, 22, 25],
            [3, 6, 9, 10, 13, 16, 20, 23, 26],
            [3, 6, 9, 11, 14, 17, 19, 22, 25],
        ];
        for (let i = 0; i < 3; i++) {
            let new_shunzi = [int2Tile(condition[row][3 * i]), int2Tile(condition[row][3 * i + 1]), int2Tile(condition[row][3 * i + 2])];
            partition.push({ type: 8, tile: new_shunzi });
        }
        for (let i in condition[row]) {
            tiles.splice(tiles.indexOf(int2Tile(condition[row][i])), 1);
            cnt[condition[row][i]]--;
        }
        dfs(1);
        for (let i in condition[row]) {
            tiles.push(int2Tile(condition[row][i]));
            cnt[condition[row][i]]++;
        }
        tiles.sort(cmp);
        ret.fans.push({ val: 12, id: 8034 });
        ret.fu = 25;
    }
    return ret;
    function dfs(now) {
        if (now === C0m) {
            if (partition.length === 5 || partition.length === 7)
                calc();
            return;
        }
        if (cnt[now] === 0) {
            dfs(now + 1);
            return;
        }
        const whatever = [0, 2, 3];
        for (let k = 0; k < 3; k++) {
            if (cnt[now] < whatever[k])
                continue;
            cnt[now] -= whatever[k];
            let cnt0 = cnt[now];
            if (k === 1) {
                partition.push({ type: 7, tile: [int2Tile(now), int2Tile(now)] });
                dfs(now);
            }
            else if (k === 2)
                partition.push({ type: 6, tile: [int2Tile(now), int2Tile(now), int2Tile(now)] });
            if (cnt[nxt2[now]] >= cnt0 && cnt[nxt2[nxt2[now]]] >= cnt0) {
                cnt[now] -= cnt0;
                cnt[nxt2[now]] -= cnt0;
                cnt[nxt2[nxt2[now]]] -= cnt0;
                for (let i = 1; i <= cnt0; i++)
                    partition.push({
                        type: 5,
                        tile: [int2Tile(now), int2Tile(nxt2[now]), int2Tile(nxt2[nxt2[now]])]
                    });
                dfs(now + 1);
                cnt[now] += cnt0;
                cnt[nxt2[now]] += cnt0;
                cnt[nxt2[nxt2[now]]] += cnt0;
                for (let i = 1; i <= cnt0; i++)
                    partition.length = partition.length - 1;
            }
            if (k === 1 || k === 2)
                partition.length = partition.length - 1;
            cnt[now] += whatever[k];
        }
    }
    function calc() {
        let cnt2 = [];
        for (let i = C1m; i <= C7z; i++)
            cnt2[i] = 0;
        let partitiontmp = partition.slice();
        for (let i = partitiontmp.length - 1; i >= 0; i--) {
            let tiles = partitiontmp[i].tile;
            if (partitiontmp[i].type === 0 || partitiontmp[i].type === 5 || partitiontmp[i].type === 8)
                for (let j = 0; j <= 2; j++)
                    cnt2[tile2Int(tiles[j])]++;
            else if (partitiontmp[i].type === 1 || partitiontmp[i].type === 6)
                cnt2[tile2Int(tiles[0])] += 3;
            else if (partitiontmp[i].type === 2 || partitiontmp[i].type === 3)
                cnt2[tile2Int(tiles[0])] += 4;
            else if (partitiontmp[i].type === 7)
                cnt2[tile2Int(tiles[0])] += 2;
        }
        for (let i in partitiontmp) {
            let tile = partitiontmp[i].tile, type = partitiontmp[i].type;
            if (type === 5 && (isEqualTile(tile[0], lastile) || isEqualTile(tile[1], lastile) || isEqualTile(tile[2], lastile))) {
                if (!zimo)
                    partitiontmp[i].type = 0;
                let midtile = int2Tile((tile2Int(tile[0]) + tile2Int(tile[1]) + tile2Int(tile[2])) / 3);
                if (isEqualTile(midtile, lastile))
                    updateRet(calc0(2));
                else if (tile2Int(lastile) % 9 === 3 && tile2Int(midtile) % 9 === 2)
                    updateRet(calc0(2));
                else if (tile2Int(lastile) % 9 === 7 && tile2Int(midtile) % 9 === 8)
                    updateRet(calc0(2));
                else
                    updateRet(calc0(0));
                partitiontmp[i].type = 5;
            }
            if (type === 6 && isEqualTile(tile[0], lastile)) {
                if (!zimo)
                    partitiontmp[i].type = 1;
                updateRet(calc0(0));
                partitiontmp[i].type = 6;
            }
            if (type === 7 && isEqualTile(tile[0], lastile))
                updateRet(calc0(2));
            if (type === 8)
                updateRet(calc0(0));
        }
        function calc0(tingpaifu) {
            const banFan = (ids) => {
                if (typeof ids == 'number')
                    ids = [ids];
                for (let i in ids)
                    ban_num[ids[i] - 8000] = true;
            };
            const isBanned = (id) => {
                return ban_num[id - 8000];
            };
            let menqing = fulu_cnt === 0;
            let ban_num = [];
            for (let i = 0; i < 100; i++)
                ban_num[i] = false;
            let ban_yaojiuke_num = 0;
            let ans = { fans: [], fu: 0 };
            let typecnt = [];
            let kezi = [], gangzi = [], anke = [], shunzi = [];
            let kezi_num = 0, gangzi_num = 0, anke_num = 0, duizi_num = 0;
            let minggang_num = 0;
            let angang_num = 0;
            for (let i = C1m; i <= C7z; i++) {
                typecnt[i] = [0, 0, 0, 0, 0, 0, 0, 0];
                anke[i] = gangzi[i] = kezi[i] = shunzi[i] = 0;
            }
            for (let i in partitiontmp) {
                let type = partitiontmp[i].type;
                switch (type) {
                    case 1:
                        kezi[tile2Int(partitiontmp[i].tile[0])]++;
                        break;
                    case 2:
                        kezi[tile2Int(partitiontmp[i].tile[0])]++;
                        gangzi[tile2Int(partitiontmp[i].tile[0])]++;
                        break;
                    case 3:
                        kezi[tile2Int(partitiontmp[i].tile[0])]++;
                        gangzi[tile2Int(partitiontmp[i].tile[0])]++;
                        anke[tile2Int(partitiontmp[i].tile[0])]++;
                        break;
                    case 6:
                        kezi[tile2Int(partitiontmp[i].tile[0])]++;
                        anke[tile2Int(partitiontmp[i].tile[0])]++;
                        break;
                    case 0:
                    case 5:
                        shunzi[(tile2Int(partitiontmp[i].tile[0]) + tile2Int(partitiontmp[i].tile[1]) + tile2Int(partitiontmp[i].tile[2])) / 3]++;
                        break;
                    case 8:
                        banFan(8042);
                        break;
                }
                if (type === 1 || type === 2 || type === 3 || type === 6 || type === 7)
                    typecnt[tile2Int(partitiontmp[i].tile[0])][type]++;
                if (type === 0 || type === 5)
                    typecnt[(tile2Int(partitiontmp[i].tile[0]) + tile2Int(partitiontmp[i].tile[1]) + tile2Int(partitiontmp[i].tile[2])) / 3][type]++;
            }
            let beikou = 0, santongshun = false;
            for (let i = C1m; i <= C7z; i++) {
                anke_num += anke[i];
                gangzi_num += gangzi[i];
                kezi_num += kezi[i];
                duizi_num += typecnt[i][7];
                minggang_num += typecnt[i][2];
                angang_num += typecnt[i][3];
                beikou += Math.floor(shunzi[i] / 2);
                if (shunzi[i] === 3)
                    santongshun = true;
            }
            if (partitiontmp.length === 7)
                duizi_num = 7;
            let flag_ziyise = true, flag_lvyise = true, flag_qinglaotou = true, flag_duanyao = true, flag_hunlaotou = true;
            for (let i = C1m; i <= C7z; i++) {
                if (!judgeTile(int2Tile(i), 'H') && cnt2[i] > 0)
                    flag_ziyise = false;
                if (!judgeTile(int2Tile(i), 'L') && cnt2[i] > 0)
                    flag_lvyise = false;
                if (!judgeTile(int2Tile(i), 'T') && cnt2[i] > 0)
                    flag_qinglaotou = false;
                if (!judgeTile(int2Tile(i), 'D') && cnt2[i] > 0)
                    flag_duanyao = false;
                if (!judgeTile(int2Tile(i), 'Y') && cnt2[i] > 0)
                    flag_hunlaotou = false;
            }
            let wumenqi = true;
            for (let i = 0; i < 5; i++) {
                const wumen_lows = [C1m, C1p, C1s, C1z, C5z], wumen_highs = [C9m, C9p, C9s, C4z, C7z];
                let flag = false;
                for (let j = wumen_lows[i]; j <= wumen_highs[i]; j++)
                    flag = flag || cnt2[j] > 0;
                if (!flag)
                    wumenqi = false;
            }
            let jiulian = false, yiqi = false, hunyise = false, qingyise = false;
            let jlbd = [0, 3, 1, 1, 1, 1, 1, 1, 1, 3];
            for (let k = 0; k <= 2; k++) {
                if (shunzi[k * 9 + 2] >= 1 && shunzi[k * 9 + 5] >= 1 && shunzi[k * 9 + 8] >= 1)
                    yiqi = true;
                jiulian = true;
                for (let i = 1; i <= 9; i++)
                    if (cnt2[k * 9 + i] < jlbd[i])
                        jiulian = false;
                    else if (cnt2[k * 9 + i] > jlbd[i] && lastile !== int2Tile(k * 9 + i))
                        jiulian = false;
                if (jiulian)
                    break;
            }
            for (let i = C1m; i <= C7z; i++)
                if (gangzi[i] >= 1)
                    jiulian = false;
            for (let k = 0; k <= 3; k++) {
                hunyise = qingyise = true;
                for (let i = C1m; i <= C7z; i++)
                    if (Math.floor((i - 1) / 9) !== k && cnt2[i] > 0) {
                        if (i <= C9s)
                            hunyise = false;
                        qingyise = false;
                    }
                if (hunyise)
                    break;
            }
            let santongke = false, shuangtongke = false;
            for (let i = 1; i <= 9; i++) {
                if (kezi[i] >= 1 && kezi[i + 9] >= 1 && kezi[i + 18] >= 1)
                    santongke = true;
                else if (kezi[i] >= 1 && kezi[i + 9] >= 1 || kezi[i] >= 1 && kezi[i + 18] >= 1 || kezi[i + 9] >= 1 && kezi[i + 18] >= 1)
                    shuangtongke = true;
            }
            let xiaosanyuan = false, dasanyuan = false, xiaosixi = false, dasixi = false;
            for (let i = 0; i < 3; i++)
                if (typecnt[C5z + i][7] === 1 && kezi[C5z + (i + 1) % 3] >= 1 && kezi[C5z + (i + 2) % 3] >= 1)
                    xiaosanyuan = true;
            if (kezi[C5z] >= 1 && kezi[C5z + 1] >= 1 && kezi[C5z + 2] >= 1)
                dasanyuan = true;
            for (let i = 0; i < 4; i++)
                if (typecnt[C1z + i][7] === 1 && kezi[C1z + (i + 1) % 4] >= 1 && kezi[C1z + (i + 2) % 4] >= 1 && kezi[C1z + (i + 3) % 4] >= 1)
                    xiaosixi = true;
            if (kezi[C1z] >= 1 && kezi[C1z + 1] >= 1 && kezi[C1z + 2] >= 1 && kezi[C1z + 3] >= 1)
                dasixi = true;
            let hunquandai = true;
            for (let i = C1m; i <= C7z; i++) {
                if (i !== C1m + 1 && i !== C9m - 1 && i !== C1p + 1 && i !== C9p - 1 && i !== C1s + 1 && i !== C9s - 1 && shunzi[i] >= 1)
                    hunquandai = false;
                if (i !== C1m && i !== C9m && i !== C1p && i !== C9p && i !== C1s && i < C9s && kezi[i] + typecnt[i][7] >= 1)
                    hunquandai = false;
            }
            let pinghu = true;
            if (duizi_num === 7)
                pinghu = false;
            for (let i = C1m; i <= C7z; i++)
                if (kezi[i] >= 1 || typecnt[i][7] === 1 && i >= 28 && i <= 34) {
                    pinghu = false;
                    break;
                }
            let sansetongshun = false, ersetongshun_num = 0;
            for (let i = 2; i <= 8; i++) {
                if (shunzi[i] >= 1 && shunzi[i + 9] >= 1 && shunzi[i + 18] >= 1)
                    sansetongshun = true;
                for (let j = 0; j < 3; j++)
                    for (let k = j + 1; k < 3; k++)
                        if (shunzi[i + 9 * j] >= 1 && shunzi[i + 9 * k] >= 1) {
                            ersetongshun_num += shunzi[i + 9 * j] >= 2 && shunzi[i + 9 * k] >= 2 ? 2 : 1;
                            break;
                        }
            }
            if (angang_num === 1 && gangzi_num === 2)
                ans.fans.push({ val: 5, id: 8082 });
            if (liqi_info[seat].yifa !== 0 && liqi_info[seat].liqi === 0 && seat === ju && zimo) {
                ans.fans.push({ val: 8, id: 8083 });
                banFan([8055, 8081, 8078, 8079, 8080]);
            }
            let first_tile = true;
            for (let i = 0; i < player_cnt; i++) {
                if (i === ju)
                    continue;
                if (!(liqi_info[i].yifa !== 0 && liqi_info[i].liqi === 0))
                    first_tile = false;
            }
            if (first_tile && seat !== ju && !zimo) {
                ans.fans.push({ val: 8, id: 8084 });
                banFan(8063);
            }
            if (liqi_info[seat].yifa !== 0 && liqi_info[seat].liqi === 0 && seat !== ju) {
                if (zimo) {
                    ans.fans.push({ val: 8, id: 8085 });
                    banFan([8055, 8081]);
                }
                else if (liqi_info[(ju + 1) % player_cnt].yifa === 0) {
                    ans.fans.push({ val: 8, id: 8085 });
                    banFan(8063);
                }
            }
            if (dasixi && !isBanned(8000)) {
                ans.fans.push({ val: 88, id: 8000 });
                banFan([8037, 8047, 8061, 8062, 8074]);
            }
            if (dasanyuan && !isBanned(8001)) {
                ans.fans.push({ val: 88, id: 8001 });
                banFan([8053, 8058, 8059, 8060]);
                ban_yaojiuke_num += 3;
            }
            if (flag_lvyise && !isBanned(8002)) {
                ans.fans.push({ val: 88, id: 8002 });
                banFan(8048);
            }
            if (jiulian && !isBanned(8003)) {
                ans.fans.push({ val: 88, id: 8003 });
                banFan([8021, 8055, 8063, 8077]);
                ban_yaojiuke_num++;
            }
            if (gangzi_num === 4 && !isBanned(8004)) {
                ans.fans.push({ val: 88, id: 8004 });
                banFan([8047, 8080]);
            }
            let lianqidui = false;
            for (let i = 0; i <= 2; i++)
                if (typecnt[3 + i * 9][7] >= 1 && typecnt[4 + i * 9][7] >= 1 && typecnt[5 + i * 9][7] >= 1 && typecnt[6 + i * 9][7] >= 1 && typecnt[7 + i * 9][7] >= 1) {
                    if (typecnt[1 + i * 9][7] >= 1 && typecnt[2 + i * 9][7] >= 1)
                        lianqidui = true;
                    if (typecnt[2 + i * 9][7] >= 1 && typecnt[8 + i * 9][7] >= 1)
                        lianqidui = true;
                    if (typecnt[8 + i * 9][7] >= 1 && typecnt[9 + i * 9][7] >= 1)
                        lianqidui = true;
                    break;
                }
            if (lianqidui && !isBanned(8005)) {
                ans.fans.push({ val: 88, id: 8005 });
                banFan([8021, 8018, 8055, 8063, 8077, 8080]);
            }
            if (flag_qinglaotou && !isBanned(8007)) {
                ans.fans.push({ val: 64, id: 8007 });
                banFan([8017, 8047, 8054, 8066, 8074, 8077]);
            }
            if (xiaosixi && !isBanned(8008)) {
                ans.fans.push({ val: 64, id: 8008 });
                banFan([8037, 8074]);
            }
            if (xiaosanyuan && !isBanned(8009)) {
                ans.fans.push({ val: 64, id: 8009 });
                banFan([8058, 8059, 8060, 8053]);
                ban_yaojiuke_num += 2;
            }
            if (flag_ziyise && !isBanned(8010)) {
                ans.fans.push({ val: 64, id: 8010 });
                banFan([8017, 8047, 8054, 8074, 8048]);
            }
            if (anke_num === 4 && !isBanned(8011)) {
                ans.fans.push({ val: 64, id: 8011 });
                banFan([8047, 8055, 8063]);
            }
            let shuanglonghui = false;
            for (let i = 0; i <= 2; i++)
                if (shunzi[2 + i] >= 2 && shunzi[8 + i] >= 2 && typecnt[5 + i][7] >= 1)
                    shuanglonghui = true;
            if (shuanglonghui && !isBanned(8012)) {
                ans.fans.push({ val: 64, id: 8012 });
                banFan([8018, 8021, 8064, 8070, 8073, 8077]);
            }
            let sitongshun = false, sijiegao = false;
            for (let i = 0; i <= 2; i++)
                for (let j = 1; j <= 9; j++) {
                    if (j !== 1 && j !== 9 && shunzi[i * 9 + j] >= 4)
                        sitongshun = true;
                    if (j <= 6 && kezi[i * 9 + j] >= 1 && kezi[i * 9 + j + 1] >= 1 && kezi[i * 9 + j + 2] >= 1 && kezi[i * 9 + j + 3] >= 1)
                        sijiegao = true;
                }
            if (sitongshun && !isBanned(8013)) {
                ans.fans.push({ val: 48, id: 8013 });
                banFan([8022, 8023, 8018, 8065, 8070]);
            }
            if (sijiegao && !isBanned(8014)) {
                ans.fans.push({ val: 48, id: 8014 });
                banFan([8022, 8023, 8047]);
            }
            let sibugao = false;
            for (let i = 0; i <= 2; i++) {
                for (let j = 2; j <= 5; j++)
                    if (shunzi[i * 9 + j] >= 1 && shunzi[i * 9 + j + 1] >= 1 && shunzi[i * 9 + j + 2] >= 1 && shunzi[i * 9 + j + 3] >= 1)
                        sibugao = true;
                if (shunzi[i * 9 + 2] >= 1 && shunzi[i * 9 + 4] >= 1 && shunzi[i * 9 + 6] >= 1 && shunzi[i * 9 + 8] >= 1)
                    sibugao = true;
            }
            if (sibugao && !isBanned(8015)) {
                ans.fans.push({ val: 32, id: 8015 });
                banFan([8029, 8072, 8073]);
            }
            if (gangzi_num === 3)
                ans.fans.push({ val: 32, id: 8016 });
            if (flag_hunlaotou && !flag_qinglaotou && !isBanned(8017)) {
                ans.fans.push({ val: 32, id: 8017 });
                banFan([8047, 8054, 8074]);
            }
            if (duizi_num === 7 && !isBanned(8018)) {
                ans.fans.push({ val: 24, id: 8018 });
                banFan([8055, 8063, 8080]);
            }
            let quanshuangke = true;
            for (let i = C1m; i <= C7z; i++)
                if (!judgeTile(int2Tile(i), 'quanshuang') && cnt2[i] >= 1)
                    quanshuangke = false;
            if (duizi_num >= 2)
                quanshuangke = false;
            if (quanshuangke && !isBanned(8020)) {
                ans.fans.push({ val: 24, id: 8020 });
                banFan([8047, 8069, 8077]);
            }
            if (qingyise && !isBanned(8021)) {
                ans.fans.push({ val: 24, id: 8021 });
                banFan(8077);
            }
            if (santongshun && !isBanned(8022)) {
                ans.fans.push({ val: 24, id: 8022 });
                banFan([8023, 8070]);
            }
            let sanjiegao = false;
            for (let j = 0; j <= 2; j++)
                for (let i = 1; i <= 7; i++)
                    if (kezi[j * 9 + i] >= 1 && kezi[j * 9 + i + 1] >= 1 && kezi[j * 9 + i + 2] >= 1)
                        sanjiegao = true;
            if (sanjiegao && !isBanned(8023)) {
                ans.fans.push({ val: 24, id: 8023 });
                banFan(8022);
            }
            let quanda = true, quanzhong = true, quanxiao = true;
            for (let i = C1m; i <= C7z; i++) {
                if (!judgeTile(int2Tile(i), 'quanda') && cnt2[i] >= 1)
                    quanda = false;
                if (!judgeTile(int2Tile(i), 'quanzhong') && cnt2[i] >= 1)
                    quanzhong = false;
                if (!judgeTile(int2Tile(i), 'quanxiao') && cnt2[i] >= 1)
                    quanxiao = false;
            }
            if (quanda && !isBanned(8024)) {
                ans.fans.push({ val: 24, id: 8024 });
                banFan([8035, 8077]);
            }
            if (quanzhong && !isBanned(8025)) {
                ans.fans.push({ val: 24, id: 8025 });
                banFan([8069, 8077]);
            }
            if (quanxiao && !isBanned(8026)) {
                ans.fans.push({ val: 24, id: 8026 });
                banFan([8036, 8077]);
            }
            if (yiqi && !isBanned(8027)) {
                ans.fans.push({ val: 16, id: 8027 });
                banFan([8072, 8073]);
            }
            let sanseshuanglonghui = false;
            for (let i = 0; i < 3; i++)
                if (shunzi[2 + 9 * ((i + 1) % 3)] >= 1 && shunzi[8 + 9 * ((i + 1) % 3)] >= 1)
                    if (shunzi[2 + 9 * ((i + 2) % 3)] >= 1 && shunzi[8 + 9 * ((i + 2) % 3)] >= 1)
                        if (typecnt[5 + 9 * i][7] >= 1)
                            sanseshuanglonghui = true;
            if (sanseshuanglonghui && !isBanned(8028)) {
                ans.fans.push({ val: 16, id: 8028 });
                banFan([8071, 8073, 8077, 8064]);
            }
            let sanbugao = false;
            for (let j = 0; j <= 2; j++) {
                for (let i = 2; i <= 6; i++)
                    if (shunzi[j * 9 + i] >= 1 && shunzi[j * 9 + i + 1] >= 1 && shunzi[j * 9 + i + 2] >= 1)
                        sanbugao = true;
                for (let i = 0; i <= 2; i++)
                    if (shunzi[j * 9 + 2 + i] >= 1 && shunzi[j * 9 + 4 + i] >= 1 && shunzi[j * 9 + 6 + i] >= 1)
                        sanbugao = true;
            }
            if (sanbugao && !isBanned(8029))
                ans.fans.push({ val: 16, id: 8029 });
            let quandaiwu = true;
            for (let i = C1m; i <= C7z; i++) {
                if (!(i >= 4 && i <= 6) && !(i >= 13 && i <= 15) && !(i >= 22 && i <= 24) && shunzi[i] >= 1)
                    quandaiwu = false;
                if (i !== C5m && i !== C5p && i !== C5s)
                    if (kezi[i] >= 1 || typecnt[i][7] >= 1)
                        quandaiwu = false;
            }
            if (quandaiwu && !isBanned(8030)) {
                ans.fans.push({ val: 16, id: 8030 });
                banFan([8069, 8077]);
            }
            if (santongke && !isBanned(8031)) {
                ans.fans.push({ val: 16, id: 8031 });
                banFan(8066);
            }
            if (anke_num === 3 && !isBanned(8032))
                ans.fans.push({ val: 16, id: 8032 });
            let dayuwu = true, xiaoyuwu = true;
            for (let i = C1m; i <= C7z; i++) {
                if (!judgeTile(int2Tile(i), 'dayuwu') && cnt2[i] >= 1)
                    dayuwu = false;
                if (!judgeTile(int2Tile(i), 'xiaoyuwu') && cnt2[i] >= 1)
                    xiaoyuwu = false;
            }
            if (dayuwu && !isBanned(8035)) {
                ans.fans.push({ val: 12, id: 8035 });
                banFan(8077);
            }
            if (xiaoyuwu && !isBanned(8036)) {
                ans.fans.push({ val: 12, id: 8036 });
                banFan(8077);
            }
            let sanfengke = false;
            for (let i = 0; i < 4; i++)
                if (kezi[C1z + i] >= 1 && kezi[C1z + (i + 1) % 4] >= 1 && kezi[C1z + (i + 2) % 4] >= 1)
                    sanfengke = true;
            if (sanfengke && !xiaosixi && !isBanned(8037)) {
                ans.fans.push({ val: 12, id: 8037 });
                ban_yaojiuke_num += 3;
            }
            let hualong = false;
            for (let i = 0; i < 3; i++)
                for (let j = 0; j < 3; j++)
                    for (let k = 0; k < 3; k++)
                        if (i !== j && j !== k && i !== k)
                            if (shunzi[3 * i + 2] >= 1 && shunzi[3 * j + 11] && shunzi[3 * k + 20]) {
                                hualong = true;
                                break;
                            }
            if (hualong && !isBanned(8038)) {
                ans.fans.push({ val: 8, id: 8038 });
                if (ersetongshun_num >= 1)
                    banFan([8072, 8073]);
            }
            let tuibudao = true;
            for (let i = C1m; i <= C7z; i++)
                if (!judgeTile(int2Tile(i), 'tuibudao') && cnt2[i] >= 1)
                    tuibudao = false;
            if (tuibudao && !isBanned(8039)) {
                ans.fans.push({ val: 8, id: 8039 });
                banFan(8076);
            }
            if (sansetongshun && !isBanned(8040)) {
                ans.fans.push({ val: 8, id: 8040 });
                banFan(8071);
            }
            let sansesanjiegao = false;
            for (let i = C1m; i <= C9m - 2; i++)
                for (let j = 0; j < 3; j++)
                    for (let k = 0; k < 3; k++)
                        for (let l = 0; l < 3; l++)
                            if (j !== k && j !== k && k !== l)
                                if (kezi[i + j] >= 1 && kezi[i + k + 9] >= 1 && kezi[i + l + 18] >= 1)
                                    sansesanjiegao = true;
            if (sansesanjiegao && !isBanned(8041))
                ans.fans.push({ val: 8, id: 8041 });
            if (paishan.length === 0) {
                if (zimo && !isBanned(8043)) {
                    ans.fans.push({ val: 8, id: 8043 });
                    banFan(8081);
                }
                else if (!isBanned(8044))
                    ans.fans.push({ val: 8, id: 8044 });
            }
            if (zimo && lst_draw_type === 0 && !isBanned(8045) && getLstAction(2).name !== 'RecordBaBei') {
                ans.fans.push({ val: 8, id: 8045 });
                banFan(8081);
            }
            if (getLstAction().name === 'RecordAnGangAddGang' && !isBanned(8046)) {
                ans.fans.push({ val: 8, id: 8046 });
                banFan(8057);
            }
            if (kezi_num === 4 && !isBanned(8047))
                ans.fans.push({ val: 6, id: 8047 });
            if (hunyise && !qingyise && !isBanned(8048))
                ans.fans.push({ val: 6, id: 8048 });
            let sansesanbugao = false;
            for (let i = 2; i <= 6; i++)
                for (let j = 0; j < 3; j++)
                    for (let k = 0; k < 3; k++)
                        for (let l = 0; l < 3; l++)
                            if (j !== k && j !== k && k !== l)
                                if (shunzi[i + j] >= 1 && shunzi[i + k + 9] >= 1 && shunzi[i + l + 18] >= 1)
                                    sansesanbugao = true;
            if (sansesanbugao && !isBanned(8049))
                ans.fans.push({ val: 6, id: 8049 });
            if (wumenqi && !isBanned(8050))
                ans.fans.push({ val: 6, id: 8050 });
            let quanqiuren = true;
            if (zimo || fulu_cnt !== 4)
                quanqiuren = false;
            if (quanqiuren && !isBanned(8051)) {
                ans.fans.push({ val: 6, id: 8051 });
                banFan(8080);
            }
            if (angang_num === 2 && !isBanned(8052)) {
                ans.fans.push({ val: 6, id: 8052 });
                banFan(8067);
            }
            let shuangjianke = false;
            for (let i = 0; i < 3; i++)
                if (kezi[C5z + (i + 1) % 3] >= 1 && kezi[C5z + (i + 2) % 3] >= 1)
                    shuangjianke = true;
            if (shuangjianke && !isBanned(8053)) {
                banFan([8058, 8059, 8060]);
                ban_yaojiuke_num += 2;
                ans.fans.push({ val: 6, id: 8053 });
            }
            if (hunquandai && !isBanned(8054))
                ans.fans.push({ val: 4, id: 8054 });
            if (menqing && zimo && !isBanned(8055)) {
                banFan(8081);
                ans.fans.push({ val: 4, id: 8055 });
            }
            if (minggang_num === 2 && gangzi_num === 2 && !isBanned(8056))
                ans.fans.push({ val: 4, id: 8056 });
            let lastile_num = 0;
            for (let i = 0; i < player_cnt; i++) {
                for (let j in paihe[i].tiles)
                    if (isEqualTile(lastile, paihe[i].tiles[j]))
                        lastile_num++;
                for (let j in fulu[i])
                    if (fulu[i][j].from !== undefined)
                        for (let k = 0; k < fulu[i][j].tile.length - 1; k++)
                            if (isEqualTile(lastile, fulu[i][j].tile[k]))
                                lastile_num++;
            }
            if ((lastile_num === 4 || lastile_num === 3 && zimo) && !isBanned(8057))
                ans.fans.push({ val: 4, id: 8057 });
            if (!isBanned(8058))
                for (let i = 0; i < kezi[C5z]; i++) {
                    ans.fans.push({ val: 2, id: 8058 });
                    ban_yaojiuke_num++;
                }
            if (!isBanned(8059))
                for (let i = 0; i < kezi[C5z + 1]; i++) {
                    ans.fans.push({ val: 2, id: 8059 });
                    ban_yaojiuke_num++;
                }
            if (!isBanned(8060))
                for (let i = 0; i < kezi[C7z]; i++) {
                    ans.fans.push({ val: 2, id: 8060 });
                    ban_yaojiuke_num++;
                }
            if (!isBanned(8061))
                for (let i = 0; i < kezi[tile2Int((chang + 1).toString() + 'z')]; i++) {
                    ans.fans.push({ val: 2, id: 8061 });
                    ban_yaojiuke_num++;
                }
            if (!isBanned(8062))
                for (let i = 0; i < kezi[tile2Int(((seat - ju + player_cnt) % player_cnt + 1).toString() + 'z')]; i++) {
                    ans.fans.push({ val: 2, id: 8062 });
                    ban_yaojiuke_num++;
                }
            if (menqing && !zimo && !isBanned(8063))
                ans.fans.push({ val: 2, id: 8063 });
            if (pinghu && !isBanned(8064)) {
                ans.fans.push({ val: 2, id: 8064 });
                banFan(8077);
            }
            let siguiyi_num = 0;
            for (let i = C1m; i <= C7z; i++)
                if (cnt2[i] === 4 && gangzi[i] === 0)
                    siguiyi_num++;
            if (siguiyi_num >= 1 && !isBanned(8065))
                ans.fans.push({ val: 2 * siguiyi_num, id: 8065 });
            if (shuangtongke && !isBanned(8066))
                ans.fans.push({ val: 2, id: 8066 });
            if (anke_num === 2 && !isBanned(8067))
                ans.fans.push({ val: 2, id: 8067 });
            if (angang_num === 1 && gangzi_num === 1 && !isBanned(8068))
                ans.fans.push({ val: 2, id: 8068 });
            if (flag_duanyao && !isBanned(8069)) {
                ans.fans.push({ val: 2, id: 8069 });
                banFan(8077);
            }
            if (beikou >= 1 && !isBanned(8070))
                ans.fans.push({ val: beikou, id: 8070 });
            if (ersetongshun_num >= 1 && !sansetongshun && !isBanned(8071))
                ans.fans.push({ val: beikou >= 2 ? 1 : ersetongshun_num, id: 8071 });
            let lianliu_num = 0;
            for (let j = 0; j <= 2; j++)
                for (let i = 2; i <= 5; i++)
                    if (shunzi[j * 9 + i] >= 1 && shunzi[j * 9 + i + 3] >= 1)
                        lianliu_num++;
            if (lianliu_num >= 1 && !isBanned(8072))
                ans.fans.push({ val: beikou >= 2 || ersetongshun_num >= 2 ? 1 : lianliu_num, id: 8072 });
            let laoshaofu_num = 0;
            for (let j = 0; j <= 2; j++)
                if (shunzi[j * 9 + 2] >= 1 && shunzi[j * 9 + 8] >= 1)
                    if (shunzi[j * 9 + 2] >= 2 && shunzi[j * 9 + 8] >= 2)
                        laoshaofu_num += 2;
                    else
                        laoshaofu_num++;
            if (laoshaofu_num >= 1 && !isBanned(8073))
                ans.fans.push({ val: beikou >= 2 || ersetongshun_num >= 2 ? 1 : laoshaofu_num, id: 8073 });
            let yaojiuke_num = -ban_yaojiuke_num;
            for (let i = C1m; i <= C7z; i++)
                if (judgeTile(int2Tile(i), 'Y'))
                    yaojiuke_num += kezi[i];
            if (!isBanned(8074) && yaojiuke_num >= 1)
                ans.fans.push({ val: yaojiuke_num, id: 8074 });
            if (minggang_num === 1 && gangzi_num === 1 && !isBanned(8075))
                ans.fans.push({ val: 1, id: 8075 });
            let queyimen = false, have_m = 0, have_p = 0, have_s = 0;
            for (let i = C1m; i <= C9m; i++) {
                if (cnt2[i] >= 1)
                    have_m = 1;
                if (cnt2[i + 9] >= 1)
                    have_p = 1;
                if (cnt2[i + 18] >= 1)
                    have_s = 1;
            }
            if (have_m + have_p + have_s === 2)
                queyimen = true;
            if (queyimen && !isBanned(8076))
                ans.fans.push({ val: 1, id: 8076 });
            let wuzi = true;
            for (let i = C1z; i <= C7z; i++)
                if (cnt2[i] >= 1)
                    wuzi = false;
            if (wuzi && !isBanned(8077))
                ans.fans.push({ val: 1, id: 8077 });
            let cnt_tiles = [];
            for (let i = C1m; i <= C7z; i++)
                cnt_tiles[i] = 0;
            for (let i in tiles)
                cnt_tiles[tile2Int(tiles[i])]++;
            let bianzhang = false;
            if ((tile2Int(lastile) - 1) % 9 + 1 === 3 && cnt_tiles[tile2Int(lastile) - 1] >= 1 && cnt_tiles[tile2Int(lastile) - 2] >= 1)
                bianzhang = true;
            if ((tile2Int(lastile) - 1) % 9 + 1 === 7 && cnt_tiles[tile2Int(lastile) + 1] >= 1 && cnt_tiles[tile2Int(lastile) + 2] >= 1)
                bianzhang = true;
            if (bianzhang && !isBanned(8078)) {
                cnt[tile2Int(lastile)]--;
                tiles.pop();
                if (calcTingpai(seat, true).length === 1)
                    ans.fans.push({ val: 1, id: 8078 });
                tiles.push(lastile);
                cnt[tile2Int(lastile)]++;
            }
            let kanzhang = cnt_tiles[tile2Int(lastile) - 1] >= 1 && cnt_tiles[tile2Int(lastile) + 1] >= 1;
            if (kanzhang && !bianzhang && !isBanned(8079)) {
                cnt[tile2Int(lastile)]--;
                tiles.pop();
                if (calcTingpai(seat, true).length === 1)
                    ans.fans.push({ val: 1, id: 8079 });
                tiles.push(lastile);
                cnt[tile2Int(lastile)]++;
            }
            let dandiaojiang = true;
            if (typecnt[tile2Int(lastile)][7] !== 1)
                dandiaojiang = false;
            if (dandiaojiang && !kanzhang && !bianzhang && !isBanned(8080)) {
                cnt[tile2Int(lastile)]--;
                tiles.pop();
                if (calcTingpai(seat, true).length === 1)
                    ans.fans.push({ val: 1, id: 8080 });
                tiles.push(lastile);
                cnt[tile2Int(lastile)]++;
            }
            if (zimo && !isBanned(8081))
                ans.fans.push({ val: 1, id: 8081 });
            if (ans.fans.length === 0 && !isBanned(8042))
                ans.fans.push({ val: 8, id: 8042 });
            let huapai_num = 0;
            for (let i in fulu[seat])
                if (fulu[seat][i].type === 4)
                    huapai_num++;
            if (huapai_num >= 1 && huapai_num <= 8)
                ans.fans.push({ val: huapai_num, id: 8090 + huapai_num });
            else if (huapai_num >= 9)
                ans.fans.push({ val: huapai_num, id: 8099 });
            if (duizi_num === 7) {
                ans.fu = 25;
                return ans;
            }
            ans.fu = 20;
            if (!pinghu)
                ans.fu += tingpaifu;
            for (let i = C1m; i <= C7z; i++) {
                if (judgeTile(int2Tile(i), 'Y')) {
                    ans.fu += typecnt[i][1] * 4;
                    ans.fu += typecnt[i][2] * 16;
                    ans.fu += typecnt[i][3] * 32;
                    ans.fu += typecnt[i][6] * 8;
                }
                else {
                    ans.fu += typecnt[i][1] * 2;
                    ans.fu += typecnt[i][2] * 8;
                    ans.fu += typecnt[i][3] * 16;
                    ans.fu += typecnt[i][6] * 4;
                }
                if (typecnt[i][7] === 1) {
                    if (i === tile2Int(((seat - ju + player_cnt) % player_cnt + 1).toString() + 'z'))
                        ans.fu += 2;
                    if (i === tile2Int((chang + 1).toString() + 'z'))
                        ans.fu += 2;
                    if (i >= C5z && i <= C7z)
                        ans.fu += 2;
                }
            }
            if (zimo && !pinghu)
                ans.fu += 2;
            if (!zimo && menqing)
                ans.fu += 10;
            ans.fu = Math.ceil(ans.fu / 10) * 10;
            if (fulu_cnt !== 0 && ans.fu === 20)
                ans.fu = 30;
            return ans;
        }
    }
};
const calcSudian = (x, type = 0) => {
    let fanfu = get_fanfu(), val = 0;
    for (let i in x.fans)
        val += x.fans[i].val;
    if (is_qingtianjing())
        return x.fu * Math.pow(2, val + 2);
    if (x.yiman)
        return 8000 * val;
    else if (val < fanfu)
        return -2000;
    else if (val >= 13 && !no_leijiyiman())
        return 8000 + type * (val + x.fu * 0.01);
    else if (val >= 11)
        return 6000 + type * (val + x.fu * 0.01);
    else if (val >= 8)
        return 4000 + type * (val + x.fu * 0.01);
    else if (val >= 6)
        return 3000 + type * (val + x.fu * 0.01);
    else if (val >= 5)
        return 2000 + type * (val + x.fu * 0.01);
    else if (is_qieshang() && (val === 4 && x.fu === 30 || val === 3 && x.fu === 60))
        return 2000 + type * (val + x.fu * 0.01);
    else
        return Math.min(Math.pow(2, val + 2) * x.fu, 2000) + type * (val + x.fu * 0.01);
};
const calcSudianChuanma = (x, type = 0) => {
    let val = 0;
    for (let i in x.fans)
        val = val + x.fans[i].val;
    if (val === 0)
        return 0;
    return Math.min(1000 * Math.pow(2, val - 1), 32000) + type * val;
};
const calcSudianGuobiao = (x, no_huapai = false) => {
    let val = 0;
    for (let i in x.fans)
        if (!(no_huapai && x.fans[i].id >= 8091 && x.fans[i].id <= 8099))
            val = val + x.fans[i].val;
    return val * scale_points();
};
const calcGangPoint = (type = false) => {
    if (chuanma_gangs.notover.length === 0)
        return;
    for (let i = chuanma_gangs.notover.length - 1; i >= 0; i--) {
        chuanma_gangs.over.push(chuanma_gangs.notover[i]);
        delta_scores[chuanma_gangs.notover[i].from] -= chuanma_gangs.notover[i].val;
        delta_scores[chuanma_gangs.notover[i].to] += chuanma_gangs.notover[i].val;
        chuanma_gangs.notover.pop();
    }
    let old_scores = scores.slice();
    for (let i = 0; i < player_cnt; i++)
        scores[i] += delta_scores[i];
    if (!type)
        addGangResult(old_scores);
    else
        addGangResultEnd(old_scores);
    for (let i = 0; i < player_cnt; i++)
        delta_scores[i] = 0;
};
const roundEnd = () => {
    if (actions.length === 0)
        return;
    if (is_chuanma() && chuanma_gangs.notover.length !== 0 && getLstAction().name !== 'RecordNoTile' && getLstAction().name !== 'RecordHuleXueZhanEnd')
        calcGangPoint(true);
    for (let i = 0; i < 4; i++)
        begin_tiles[i] = '';
    discard_tiles = [[], [], [], []];
    deal_tiles = [[], [], [], []];
    muyu_seats = '';
    paishan = [];
    all_data.actions.push(actions.slice());
    all_data.xun.push(xun.slice());
    xun = [[], [], [], []];
    actions = [];
    if (is_chuanma() && ju_cnt !== -1)
        ju = ju_cnt;
    if (ju === player_cnt) {
        chang++;
        ju = 0;
    }
    chang %= player_cnt;
    gameEnd();
};
const gameEnd = () => {
    const cmp2 = (x, y) => {
        if (x.part_point_1 < y.part_point_1)
            return 1;
        if (x.part_point_1 > y.part_point_1)
            return -1;
        if (x.seat > y.seat)
            return 1;
        if (x.seat < y.seat)
            return -1;
        return 0;
    };
    players = [null, null];
    for (let i = 0; i < player_cnt; i++)
        players[i] = {
            seat: i,
            gold: 0,
            grading_score: 0,
            part_point_1: scores[i],
            part_point_2: 0,
            total_point: 0,
        };
    players.sort(cmp2);
    players[0].part_point_1 += liqibang * 1000;
    let madian = [[5, -5], [10, 0, -10], [15, 5, -5, -15]];
    for (let i = 1; i < player_cnt; i++) {
        players[i].total_point = players[i].part_point_1 - base_points + madian[player_cnt - 2][i] * 1000;
        players[0].total_point -= players[i].total_point;
    }
    all_data.players = players;
    editOffline();
};
const roundInfo = () => {
    let chang_word = [`东`, `南`, `西`, `北`];
    return `${chang_word[chang]}${ju + 1}局${ben}本场: `;
};
let addNewRound = (left_tile_count, fake_hash_code, opens, is_sha256) => {
    actions.push(JSON.parse(JSON.stringify({
        name: 'RecordNewRound',
        data: {
            chang: chang,
            ju: ju,
            ben: ben,
            ju_count: is_chuanma() ? all_data.actions.length : undefined,
            seat: ju,
            left_tile_count: left_tile_count,
            liqibang: liqibang,
            tiles0: player_tiles[0].slice(),
            tiles1: player_tiles[1].slice(),
            tiles2: player_tiles[2].slice(),
            tiles3: player_tiles[3].slice(),
            paishan: paishan.join(''),
            scores: scores.slice(),
            tingpai: getAllTingpai(),
            doras: calcDoras(),
            opens: opens,
            muyu: is_muyu() ? JSON.parse(JSON.stringify(muyu)) : undefined,
            md5: !is_sha256 ? fake_hash_code : undefined,
            sha256: is_sha256 ? fake_hash_code : undefined,
            xia_ke_shang: is_xiakeshang() ? { score_coefficients: calcXiaKeShang() } : undefined,
        }
    })));
    calcXun();
};
let addDealTile = (seat, draw_card, liqi, tile_state, zhanxing_index, hunzhiyiji_data) => {
    actions.push(JSON.parse(JSON.stringify({
        name: 'RecordDealTile',
        data: {
            seat: seat,
            tile: draw_card,
            left_tile_count: getLeftTileCnt(),
            liqi: liqi ? liqi : undefined,
            doras: calcDoras(),
            tile_state: tile_state ? tile_state : undefined,
            muyu: is_muyu() ? JSON.parse(JSON.stringify(muyu)) : undefined,
            tile_index: is_zhanxing() ? zhanxing_index : undefined,
            hun_zhi_yi_ji_info: is_hunzhiyiji() ? hunzhiyiji_data : undefined,
        }
    })));
    calcXun();
};
let addFillAwaitingTiles = (seat, liqi) => {
    actions.push(JSON.parse(JSON.stringify({
        name: 'RecordFillAwaitingTiles',
        data: {
            operation: { seat: seat },
            awaiting_tiles: awaiting_tiles.slice(),
            left_tile_count: getLeftTileCnt(),
            liqi: liqi ? liqi : undefined,
            doras: calcDoras(),
        }
    })));
};
let addDiscardTile = (seat, tile, moqie, is_liqi, is_wliqi, is_kailiqi, tile_state, beishui_type) => {
    actions.push(JSON.parse(JSON.stringify({
        name: 'RecordDiscardTile',
        data: {
            seat: seat,
            tile: tile,
            moqie: moqie,
            is_liqi: is_liqi,
            is_wliqi: is_wliqi,
            is_kailiqi: is_kailiqi,
            doras: calcDoras(),
            tingpais: is_heqie_mode() ? undefined : calcTingpai(seat),
            tile_state: tile_state ? tile_state : undefined,
            muyu: is_muyu() ? JSON.parse(JSON.stringify(muyu)) : undefined,
            yongchang: is_yongchang() ? JSON.parse(JSON.stringify(yongchang_data[seat])) : undefined,
            hun_zhi_yi_ji_info: is_hunzhiyiji() && hunzhiyiji_info[seat].liqi && !hunzhiyiji_info[seat].overload ? JSON.parse(JSON.stringify(hunzhiyiji_info[seat])) : undefined,
            liqi_type_beishuizhizhan: is_liqi ? beishui_type : undefined,
        }
    })));
};
let addRevealTile = (seat, tile, moqie, is_liqi, is_wliqi) => {
    actions.push(JSON.parse(JSON.stringify({
        name: 'RecordRevealTile',
        data: {
            seat: seat,
            tile: tile,
            moqie: moqie,
            is_liqi: is_liqi,
            is_wliqi: is_wliqi,
            liqibang: liqibang,
            scores: scores.slice(),
            tingpais: is_heqie_mode() ? undefined : calcTingpai(seat),
        }
    })));
};
let addLockTile = (seat, lock_state, tile = '') => {
    actions.push(JSON.parse(JSON.stringify({
        name: 'RecordLockTile',
        data: {
            seat: seat,
            tile: tile,
            scores: scores.slice(),
            liqibang: liqibang,
            lock_state: lock_state,
        }
    })));
};
let addUnveilTile = (seat) => {
    actions.push(JSON.parse(JSON.stringify({
        name: 'RecordUnveilTile',
        data: {
            seat: seat,
            scores: scores.slice(),
            liqibang: liqibang,
        }
    })));
};
let addChiPengGang = (seat, split_tiles, froms, type, liqi, tile_states) => {
    actions.push(JSON.parse(JSON.stringify({
        name: 'RecordChiPengGang',
        data: {
            seat: seat,
            tiles: split_tiles,
            type: type,
            froms: froms,
            liqi: liqi,
            tingpais: is_heqie_mode() ? undefined : calcTingpai(seat),
            tile_states: tile_states,
            muyu: is_muyu() ? JSON.parse(JSON.stringify(muyu)) : undefined,
            yongchang: is_yongchang() ? JSON.parse(JSON.stringify(yongchang_data[froms[froms.length - 1]])) : undefined,
            hun_zhi_yi_ji_info: is_hunzhiyiji() && hunzhiyiji_info[seat].liqi ? JSON.parse(JSON.stringify(hunzhiyiji_info[froms[froms.length - 1]])) : undefined,
        }
    })));
    calcXun();
};
let addAnGangAddGang = (seat, tile, ziming_type, tile_states) => {
    actions.push(JSON.parse(JSON.stringify({
        name: 'RecordAnGangAddGang',
        data: {
            seat: seat,
            tiles: tile,
            type: ziming_type,
            doras: calcDoras(),
            tingpais: is_heqie_mode() ? undefined : calcTingpai(seat),
            tile_states: tile_states,
        }
    })));
};
let addBaBei = (seat, tile, tile_states) => {
    actions.push(JSON.parse(JSON.stringify({
        name: 'RecordBaBei',
        data: {
            seat: seat,
            tile: tile,
            tile_states: tile_states,
            doras: calcDoras(),
            tingpais: is_heqie_mode() ? undefined : calcTingpai(seat),
        }
    })));
};
let endHule = (hule_info, old_scores, baopait) => {
    actions.push(JSON.parse(JSON.stringify({
        name: 'RecordHule',
        data: {
            hules: hule_info,
            old_scores: old_scores,
            delta_scores: delta_scores.slice(),
            scores: scores.slice(),
            baopai: baopait,
        }
    })));
};
let addHuleXueZhanMid = (hule_info, old_scores, liqi) => {
    actions.push(JSON.parse(JSON.stringify({
        name: 'RecordHuleXueZhanMid',
        data: {
            hules: hule_info,
            old_scores: old_scores,
            delta_scores: delta_scores.slice(),
            scores: scores.slice(),
            liqi: liqi,
        }
    })));
};
let endHuleXueZhanEnd = (hule_info, old_scores) => {
    actions.push(JSON.parse(JSON.stringify({
        name: 'RecordHuleXueZhanEnd',
        data: {
            hules: hule_info,
            old_scores: old_scores,
            delta_scores: delta_scores.slice(),
            scores: scores.slice(),
            hules_history: hules_history.slice(),
        }
    })));
};
let addHuleXueLiuMid = (hule_info, old_scores) => {
    actions.push(JSON.parse(JSON.stringify({
        name: 'RecordHuleXueLiuMid',
        data: {
            old_scores: old_scores,
            delta_scores: delta_scores.slice(),
            scores: scores.slice(),
            hules: hule_info,
            tingpais: getLstAction().name === 'RecordNewRound' && !is_heqie_mode() ? calcTingpai(ju) : [],
            baopai: 0,
        }
    })));
};
let endHuleXueLiuEnd = (hule_info, old_scores) => {
    actions.push(JSON.parse(JSON.stringify({
        name: 'RecordHuleXueLiuEnd',
        data: {
            old_scores: old_scores,
            delta_scores: delta_scores.slice(),
            scores: scores.slice(),
            hules: hule_info,
            hules_history: hules_history.slice(),
            baopai: 0,
        }
    })));
};
let endNoTile = (liujumanguan, ting_info, scores_info) => {
    actions.push(JSON.parse(JSON.stringify({
        name: 'RecordNoTile',
        data: {
            scores: scores_info,
            players: ting_info,
            liujumanguan: liujumanguan,
            hules_history: hules_history.slice(),
        }
    })));
};
let endLiuJu = (type, seat, liqi, tiles, allplayertiles) => {
    actions.push(JSON.parse(JSON.stringify({
        name: 'RecordLiuJu',
        data: {
            type: type,
            seat: type === 1 || type === 5 ? seat : undefined,
            liqi: liqi != null ? liqi : undefined,
            tiles: type === 1 ? tiles : undefined,
            allplayertiles: type === 4 || type === 5 ? allplayertiles : undefined,
            hules_history: hules_history.slice(),
        }
    })));
};
let addChangeTile = (change_tile_infos, type) => {
    actions.push(JSON.parse(JSON.stringify({
        name: 'RecordChangeTile',
        data: {
            change_tile_infos: change_tile_infos,
            change_type: type,
            doras: calcDoras(),
            tingpai: getAllTingpai(),
            operations: [],
        }
    })));
};
let addSelectGap = (gap_types) => {
    actions.push(JSON.parse(JSON.stringify({
        name: 'RecordSelectGap',
        data: {
            gap_types: gap_types,
            tingpai: getAllTingpai(),
        }
    })));
};
let addGangResult = (old_scores) => {
    actions.push(JSON.parse(JSON.stringify({
        name: 'RecordGangResult',
        data: {
            gang_infos: {
                old_scores: old_scores,
                delta_scores: delta_scores.slice(),
                scores: scores.slice(),
            }
        }
    })));
};
let addGangResultEnd = (old_scores) => {
    actions.push(JSON.parse(JSON.stringify({
        name: 'RecordGangResultEnd',
        data: {
            gang_infos: {
                old_scores: old_scores,
                delta_scores: delta_scores.slice(),
                scores: scores.slice(),
                hules_history: hules_history.slice(),
            },
        }
    })));
};
let addCuohu = (seat, zimo, old_scores) => {
    actions.push(JSON.parse(JSON.stringify({
        name: 'RecordCuohu',
        data: {
            cuohu_info: {
                seat: seat,
                zimo: zimo,
                old_scores: old_scores,
                delta_scores: delta_scores.slice(),
                scores: scores.slice(),
            },
        }
    })));
};
const get_tablecloth_id = () => {
    if (typeof config.mode.detail_rule._tablecloth_id == 'number')
        return config.mode.detail_rule._tablecloth_id;
    if (all_data.player_datas[0].views) {
        let views = all_data.player_datas[0].views;
        for (let i in views)
            if (views[i].slot === 6)
                return views[i].item_id;
    }
    return uiscript.UI_Sushe.now_desktop_id;
};
const get_mjp_id = () => {
    if (typeof config.mode.detail_rule._mjp_id == 'number')
        return config.mode.detail_rule._mjp_id;
    if (all_data.player_datas[0].views) {
        let views = all_data.player_datas[0].views;
        for (let i in views)
            if (views[i].slot === 7)
                return views[i].item_id;
    }
    return uiscript.UI_Sushe.now_mjp_id;
};
const get_mjpsurface_id = () => {
    if (typeof config.mode.detail_rule._mjpsurface_id == 'number')
        return config.mode.detail_rule._mjpsurface_id;
    if (all_data.player_datas[0].views) {
        let views = all_data.player_datas[0].views;
        for (let i in views)
            if (views[i].slot === 13)
                return views[i].item_id;
    }
    return uiscript.UI_Sushe.now_mjp_surface_id;
};
const get_init_point = () => {
    if (typeof config.mode.detail_rule.init_point == 'number' && config.mode.detail_rule.init_point > -1)
        return config.mode.detail_rule.init_point;
    return -1;
};
const get_aka_cnt = () => {
    if (typeof config.mode.detail_rule.dora_count == 'number' && config.mode.detail_rule.dora_count > -1)
        return config.mode.detail_rule.dora_count;
    return -1;
};
const get_fanfu = () => {
    if (typeof config.mode.detail_rule.fanfu == 'number' && config.mode.detail_rule.fanfu > 1)
        return config.mode.detail_rule.fanfu;
    return 1;
};
const get_chang_ju_ben_num = () => {
    if (config.mode.detail_rule._chang_ju_ben_num_ instanceof Array && config.mode.detail_rule._chang_ju_ben_num_.length >= 3)
        return config.mode.detail_rule._chang_ju_ben_num_;
    return [0, 0, 0, 0];
};
const get_init_scores = () => {
    if (config.mode.detail_rule._scores_ instanceof Array)
        return config.mode.detail_rule._scores_;
    return [];
};
const get_mainrole_seat = () => {
    if (typeof config.mode.detail_rule._mainrole_ == 'number' && config.mode.detail_rule._mainrole_ > -1 && config.mode.detail_rule._mainrole_ < 4)
        return config.mode.detail_rule._mainrole_;
    return -1;
};
const is_xuezhandaodi = () => config.mode.detail_rule.xuezhandaodi;
const is_chuanma = () => config.mode.detail_rule.chuanma;
const is_dora3 = () => config.mode.detail_rule.dora3_mode;
const is_begin_open = () => config.mode.detail_rule.begin_open_mode;
const is_muyu = () => config.mode.detail_rule.muyu_mode;
const is_mingjing = () => config.mode.detail_rule.jiuchao_mode;
const is_anye = () => config.mode.detail_rule.reveal_discard;
const is_field_spell = () => typeof config.mode.detail_rule.field_spell_mode == 'number';
const get_field_spell_mode1 = () => {
    if (!is_field_spell())
        return 0;
    return Math.floor(config.mode.detail_rule.field_spell_mode % 10);
};
const get_field_spell_mode2 = () => {
    if (!is_field_spell())
        return 0;
    return Math.floor((config.mode.detail_rule.field_spell_mode / 100) % 10);
};
const get_field_spell_mode3 = () => {
    if (!is_field_spell())
        return 0;
    return Math.floor(config.mode.detail_rule.field_spell_mode / 10000);
};
const is_zhanxing = () => config.mode.detail_rule.zhanxing;
const is_tianming = () => config.mode.detail_rule.tianming_mode;
const is_yongchang = () => config.mode.detail_rule.yongchang_mode;
const is_hunzhiyiji = () => config.mode.detail_rule.hunzhiyiji_mode;
const is_wanxiangxiuluo = () => config.mode.detail_rule.wanxiangxiuluo_mode;
const is_beishuizhizhan = () => config.mode.detail_rule.beishuizhizhan_mode;
const is_xiakeshang = () => config.mode.detail_rule.amusement_switches instanceof Array && config.mode.detail_rule.amusement_switches.indexOf(18) > -1;
const is_xueliu = () => config.mode.detail_rule._xueliu;
const is_guyi = () => config.mode.detail_rule.guyi_mode;
const is_yifanjieguyi = () => config.mode.detail_rule._yifanjieguyi;
const no_shiduan = () => config.mode.detail_rule._no_shiduan;
const no_zimosun = () => config.mode.detail_rule._no_zimosun;
const is_openhand = () => config.mode.detail_rule.open_hand;
const get_liqi_need = () => {
    if (typeof config.mode.detail_rule._liqi_need == 'number' && config.mode.detail_rule._liqi_need > -1)
        return config.mode.detail_rule._liqi_need;
    return 1;
};
const get_ben_times = () => {
    if (typeof config.mode.detail_rule._ben_times == 'number' && config.mode.detail_rule._ben_times > -1)
        return config.mode.detail_rule._ben_times;
    return 1;
};
const get_fafu_1ting = () => {
    if (typeof config.mode.detail_rule._fafu_1ting == 'number')
        return config.mode.detail_rule._fafu_1ting;
    return 1000;
};
const get_fafu_2ting = () => {
    if (typeof config.mode.detail_rule._fafu_2ting == 'number')
        return config.mode.detail_rule._fafu_2ting;
    return 1500;
};
const get_fafu_3ting = () => {
    if (typeof config.mode.detail_rule._fafu_3ting == 'number')
        return config.mode.detail_rule._fafu_3ting;
    return 3000;
};
const get_fafu_3p_1ting = () => {
    if (typeof config.mode.detail_rule._fafu_3p_1ting == 'number')
        return config.mode.detail_rule._fafu_3p_1ting;
    return 1000;
};
const get_fafu_3p_2ting = () => {
    if (typeof config.mode.detail_rule._fafu_3p_2ting == 'number')
        return config.mode.detail_rule._fafu_3p_2ting;
    return 2000;
};
const get_fafu_2p = () => {
    if (typeof config.mode.detail_rule._fafu_2p == 'number')
        return config.mode.detail_rule._fafu_2p;
    return 1000;
};
const is_qieshang = () => config.mode.detail_rule._qieshangmanguan;
const is_toutiao = () => config.mode.detail_rule._toutiao;
const is_renhumanguan = () => config.mode.detail_rule._renhumanguan;
const no_normalbaopai = () => config.mode.detail_rule._no_normalbaopai;
const is_sigangbaopai = () => config.mode.detail_rule._sigangbaopai;
const no_liujumanguan = () => config.mode.detail_rule._no_liujumanguan;
const no_yifa = () => config.mode.detail_rule._no_yifa;
const no_lianfengsifu = () => config.mode.detail_rule._no_lianfengsifu;
const no_dora = () => config.mode.detail_rule._no_dora;
const no_lidora = () => config.mode.detail_rule._no_lidora;
const no_gangdora = () => config.mode.detail_rule._no_gangdora;
const no_ganglidora = () => config.mode.detail_rule._no_ganglidora;
const is_dora_jifan = () => config.mode.detail_rule._dora_jifan;
const is_sanxiangliuju = () => config.mode.detail_rule._sanxiangliuju;
const no_leijiyiman = () => config.mode.detail_rule._no_leijiyiman;
const no_wyakuman = () => config.mode.detail_rule._no_wyakuman;
const no_guoshiangang = () => config.mode.detail_rule._no_guoshiangang;
const is_fufenliqi = () => config.mode.detail_rule._fufenliqi;
const is_baogang = () => config.mode.detail_rule._baogang;
const is_qingtianjing = () => config.mode.detail_rule._qingtianjing;
const no_zhenting = () => config.mode.detail_rule._no_zhenting;
const is_ronghuzhahu = () => config.mode.detail_rule._ronghuzhahu;
const is_tiandichuangzao = () => config.mode.detail_rule._tiandichuangzao;
const is_wanwushengzhang = () => config.mode.detail_rule._wanwushengzhang;
const is_mopai_paishan = () => config.mode.detail_rule._mopai_paishan;
const is_heqie_mode = () => config.mode.detail_rule._heqie_mode;
const is_guobiao = () => config.mode.detail_rule._guobiao;
const is_guobiao_huapai = () => config.mode.detail_rule._guobiao_huapai;
const is_guobiao_no_8fanfu = () => config.mode.detail_rule._guobiao_no_8fanfu;
const is_guobiao_lianzhuang = () => config.mode.detail_rule._guobiao_lianzhuang;
const scale_points = () => {
    if (typeof config.mode.detail_rule._scale_points == 'number')
        return config.mode.detail_rule._scale_points;
    return 100;
};
const cuohu_points = () => {
    if (typeof config.mode.detail_rule._cuohu_points == 'number')
        return config.mode.detail_rule._cuohu_points;
    return 10;
};
const is_cuohupeida = () => config.mode.detail_rule._cuohupeida;
const is_random_skin = () => config.mode.detail_rule._random_skin;
const is_random_views = () => config.mode.detail_rule._random_views;
const views_pool = {}, invalid_views = {
    5: [
        305501,
        305510,
        305511,
        305512,
        305513,
        305514,
        305515,
        305516,
        305517,
        305518,
        305519,
        305524,
        305525,
        305526,
        305527,
        305528,
        305530,
        305531,
        305532,
        305533,
        305534,
        305535,
        305536,
        305538,
        305539,
        305540,
        305541,
        305543,
        305544,
        305546,
        305547,
        305548,
        305549,
        305550,
        305553,
        305555,
        30550001,
        30550002,
        30550003,
        30550004,
        30550005,
        30550006,
        30550007,
        30550008,
        30550009,
        30550010,
        30550011,
        30550013,
        30550015,
        30550018,
        30550019,
        30550024,
    ],
    11: [
        600001,
        600017,
        600025,
        600026,
        600029,
        600041,
        600043,
        600044,
        600048,
        600049,
        600051,
        600055,
        600066,
        600067,
        600069,
        600071,
        600072,
        600073,
        600076,
        600077,
        600081,
        600082,
        600085,
        600087,
        600088,
        600089,
        600090,
        600091,
        600092,
        600093,
        600095,
        600097,
        600098,
        600099,
        600100,
        600102,
        600103,
        600104,
        600105,
        600106,
        600109,
        600110,
        600111,
        600114,
        600115,
        600122,
        600133,
        600136,
    ],
};
const updateViews = () => {
    const slots = [0, 1, 2, 5, 6, 7, 11, 13];
    for (let i in slots) {
        views_pool[slots[i]] = [];
        if (invalid_views[slots[i]] === undefined)
            invalid_views[slots[i]] = [];
    }
    const Items = cfg.item_definition.item.rows_, Titles = cfg.item_definition.title.rows_;
    for (let i in Items) {
        if (Items[i].name_chs === '(已过期)' || Items[i].category !== 5 || Items[i].type === 11)
            continue;
        let slot = Items[i].type;
        if (slots.indexOf(slot) > -1 && invalid_views[slot].indexOf(Items[i].id) === -1)
            views_pool[slot].push(Items[i].id);
    }
    for (let i in Titles)
        if (invalid_views[11].indexOf(Titles[i].id) === -1)
            views_pool[11].push(Titles[i].id);
};
const DIYFans = () => {
    cfg.fan.fan.map_[9000] = {
        id: 9000,
        name_chs: '诈和',
        name_chs_t: '诈和',
        name_jp: '诈和',
        name_en: 'Fake winning',
        fan_menqing: 5,
        fan_fulu: 5,
        show_index: 5,
        sound: '',
    };
    cfg.fan.fan.map_[9001] = {
        id: 9001,
        name_chs: '天地创造',
        name_chs_t: '天地创造',
        name_jp: '天地创造',
        name_en: 'Beginning of the Cosmos',
        fan_menqing: 78,
        fan_fulu: 78,
        show_index: 6,
        sound: '',
    };
    cfg.fan.fan.map_[9002] = {
        id: 9002,
        name_chs: '万物生长',
        name_chs_t: '万物生长',
        name_jp: '万物生长',
        name_en: 'Sprout of the Earth',
        fan_menqing: 78,
        fan_fulu: 78,
        show_index: 7,
        sound: '',
    };
    cfg.fan.fan.map_[9003] = {
        id: 9003,
        name_chs: '役满 开立直',
        name_chs_t: '役满 开立直',
        name_jp: '役满 开立直',
        name_en: 'Open Reach',
        fan_menqing: 1,
        fan_fulu: 1,
        show_index: 0,
        sound: 'act_rich',
    };
    cfg.fan.fan.map_[9004] = {
        id: 9004,
        name_chs: '役满 开两立直',
        name_chs_t: '役满 开两立直',
        name_jp: '役满 开两立直',
        name_en: 'Open Double Reach',
        fan_menqing: 1,
        fan_fulu: 1,
        show_index: 0,
        sound: 'act_drich',
    };
    cfg.fan.fan.map_[9005] = {
        id: 9005,
        name_chs: '开立直',
        name_chs_t: '开立直',
        name_jp: '开立直',
        name_en: 'Open Reach',
        fan_menqing: 2,
        fan_fulu: 2,
        show_index: 0,
        sound: 'fan_liqi',
    };
    cfg.fan.fan.map_[9006] = {
        id: 9006,
        name_chs: '开两立直',
        name_chs_t: '开两立直',
        name_jp: '开两立直',
        name_en: 'Open Double Reach',
        fan_menqing: 3,
        fan_fulu: 3,
        show_index: 0,
        sound: 'fan_dliqi',
    };
    cfg.fan.fan.map_[9100] = {
        id: 9100,
        name_chs: '流局满贯',
        name_chs_t: '流局滿貫',
        name_jp: '流局滿貫',
        name_en: 'mangan at draw',
        fan_menqing: 5,
        fan_fulu: 5,
        show_index: 2000,
        sound: 'fan_liujumanguan',
    };
    cfg.fan.fan.map_[9101] = {
        id: 9101,
        name_chs: '役牌 东',
        name_chs_t: '役牌 東',
        name_jp: '役牌 東',
        name_en: 'East Wind',
        fan_menqing: 1,
        fan_fulu: 1,
        show_index: 150,
        sound: 'fan_dong',
    };
    cfg.fan.fan.map_[9102] = {
        id: 9102,
        name_chs: '役牌 连东',
        name_chs_t: '役牌 連東',
        name_jp: '役牌 連東',
        name_en: 'Double East Wind',
        fan_menqing: 1,
        fan_fulu: 1,
        show_index: 150,
        sound: 'fan_doubledong',
    };
    cfg.fan.fan.map_[9103] = {
        id: 9103,
        name_chs: '役牌 南',
        name_chs_t: '役牌 南',
        name_jp: '役牌 南',
        name_en: 'South Wind',
        fan_menqing: 1,
        fan_fulu: 1,
        show_index: 150,
        sound: 'fan_nan',
    };
    cfg.fan.fan.map_[9104] = {
        id: 9104,
        name_chs: '役牌 连南',
        name_chs_t: '役牌 連南',
        name_jp: '役牌 連南',
        name_en: 'Double South Wind',
        fan_menqing: 1,
        fan_fulu: 1,
        show_index: 150,
        sound: 'fan_doublenan',
    };
    cfg.fan.fan.map_[9105] = {
        id: 9105,
        name_chs: '役牌 西',
        name_chs_t: '役牌 西',
        name_jp: '役牌 西',
        name_en: 'West Wind',
        fan_menqing: 1,
        fan_fulu: 1,
        show_index: 150,
        sound: 'fan_xi',
    };
    cfg.fan.fan.map_[9106] = {
        id: 9106,
        name_chs: '役牌 连西',
        name_chs_t: '役牌 連西',
        name_jp: '役牌 連西',
        name_en: 'Double West Wind',
        fan_menqing: 1,
        fan_fulu: 1,
        show_index: 150,
        sound: 'fan_doublexi',
    };
    cfg.fan.fan.map_[9107] = {
        id: 9107,
        name_chs: '役牌 北',
        name_chs_t: '役牌 北',
        name_jp: '役牌 北',
        name_en: 'North Wind',
        fan_menqing: 1,
        fan_fulu: 1,
        show_index: 160,
        sound: 'fan_bei',
    };
    cfg.fan.fan.map_[9108] = {
        id: 9107,
        name_chs: '役牌 连北',
        name_chs_t: '役牌 連北',
        name_jp: '役牌 連北',
        name_en: 'Double North Wind',
        fan_menqing: 1,
        fan_fulu: 1,
        show_index: 160,
        sound: 'fan_doublebei',
    };
    cfg.fan.fan.map_[9200] = {
        id: 9200,
        name_chs: '立直',
        name_chs_t: '立直',
        name_jp: '立直',
        name_en: 'Reach',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 0,
        sound: 'act_rich',
    };
    cfg.fan.fan.map_[9201] = {
        id: 9200,
        name_chs: '双立直',
        name_chs_t: '双立直',
        name_jp: '双立直',
        name_en: 'Double Reach',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 0,
        sound: 'act_drich',
    };
    cfg.fan.fan.map_[9202] = {
        id: 9202,
        name_chs: '吃',
        name_chs_t: '吃',
        name_jp: '吃',
        name_en: 'Chi',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 0,
        sound: 'act_chi',
    };
    cfg.fan.fan.map_[9203] = {
        id: 9203,
        name_chs: '碰',
        name_chs_t: '碰',
        name_jp: '碰',
        name_en: 'Pon',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 0,
        sound: 'act_pon',
    };
    cfg.fan.fan.map_[9204] = {
        id: 9204,
        name_chs: '杠',
        name_chs_t: '杠',
        name_jp: '杠',
        name_en: 'Kan',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 0,
        sound: 'act_kan',
    };
    cfg.fan.fan.map_[9205] = {
        id: 9205,
        name_chs: '拔北',
        name_chs_t: '拔北',
        name_jp: '拔北',
        name_en: 'Babei',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 0,
        sound: 'act_babei',
    };
    cfg.fan.fan.map_[9206] = {
        id: 9206,
        name_chs: '荣和',
        name_chs_t: '荣和',
        name_jp: '荣和',
        name_en: 'Ron',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 0,
        sound: 'act_ron',
    };
    cfg.fan.fan.map_[9207] = {
        id: 9207,
        name_chs: '自摸',
        name_chs_t: '自摸',
        name_jp: '自摸',
        name_en: 'Tsumo',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 0,
        sound: 'act_tumo',
    };
    cfg.fan.fan.map_[9208] = {
        id: 9208,
        name_chs: '对局开始',
        name_chs_t: '对局开始',
        name_jp: '对局开始',
        name_en: '',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 9999,
        sound: 'ingame_start',
    };
    cfg.fan.fan.map_[9209] = {
        id: 9209,
        name_chs: '天地无双',
        name_chs_t: '天地无双',
        name_jp: '天地无双',
        name_en: 'tianxiawushuangmiao',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 9999,
        sound: 'game_top',
    };
    cfg.fan.fan.map_[9210] = {
        id: 9210,
        name_chs: '荣和获胜',
        name_chs_t: '荣和获胜',
        name_jp: '荣和获胜',
        name_en: '',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 9999,
        sound: 'game_top_ron',
    };
    cfg.fan.fan.map_[9211] = {
        id: 9211,
        name_chs: '高分获胜',
        name_chs_t: '高分获胜',
        name_jp: '高分获胜',
        name_en: '',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 9999,
        sound: 'game_top_big',
    };
    cfg.fan.fan.map_[9300] = {
        id: 9300,
        name_chs: '满贯',
        name_chs_t: '满贯',
        name_jp: '满贯',
        name_en: 'mangan',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 2000,
        sound: 'gameend_manguan',
    };
    cfg.fan.fan.map_[9301] = {
        id: 9301,
        name_chs: '跳满',
        name_chs_t: '跳满',
        name_jp: '跳满',
        name_en: 'tiaoman',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 2000,
        sound: 'gameend_tiaoman',
    };
    cfg.fan.fan.map_[9302] = {
        id: 9302,
        name_chs: '倍满',
        name_chs_t: '倍满',
        name_jp: '倍满',
        name_en: 'beiman',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 2000,
        sound: 'gameend_beiman',
    };
    cfg.fan.fan.map_[9303] = {
        id: 9303,
        name_chs: '三倍满',
        name_chs_t: '三倍满',
        name_jp: '三倍满',
        name_en: 'sanbeiman',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 2000,
        sound: 'gameend_sanbeiman',
    };
    cfg.fan.fan.map_[9304] = {
        id: 9304,
        name_chs: '役满',
        name_chs_t: '役满',
        name_jp: '役满',
        name_en: 'yakuman',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 2000,
        sound: 'gameend_yiman1',
    };
    cfg.fan.fan.map_[9305] = {
        id: 9305,
        name_chs: '两倍役满',
        name_chs_t: '两倍役满',
        name_jp: '两倍役满',
        name_en: 'Double Yakuman',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 2000,
        sound: 'gameend_yiman2',
    };
    cfg.fan.fan.map_[9306] = {
        id: 9306,
        name_chs: '三倍役满',
        name_chs_t: '三倍役满',
        name_jp: '三倍役满',
        name_en: 'Triple Yakuman',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 2000,
        sound: 'gameend_yiman3',
    };
    cfg.fan.fan.map_[9307] = {
        id: 9307,
        name_chs: '四倍役满',
        name_chs_t: '四倍役满',
        name_jp: '四倍役满',
        name_en: 'Yakumans',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 2000,
        sound: 'gameend_yiman4',
    };
    cfg.fan.fan.map_[9308] = {
        id: 9308,
        name_chs: '五倍役满',
        name_chs_t: '五倍役满',
        name_jp: '五倍役满',
        name_en: 'Yakumans',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 2000,
        sound: 'gameend_yiman5',
    };
    cfg.fan.fan.map_[9309] = {
        id: 9309,
        name_chs: '六倍役满',
        name_chs_t: '六倍役满',
        name_jp: '六倍役满',
        name_en: 'Yakumans',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 2000,
        sound: 'gameend_yiman6',
    };
    cfg.fan.fan.map_[9310] = {
        id: 9310,
        name_chs: '累计役满',
        name_chs_t: '累计役满',
        name_jp: '累计役满',
        name_en: 'Yakumans',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 2000,
        sound: 'gameend_leijiyiman',
    };
    cfg.fan.fan.map_[9311] = {
        id: 9311,
        name_chs: '听牌',
        name_chs_t: '听牌',
        name_jp: '听牌',
        name_en: 'tingpai',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 2000,
        sound: 'gameend_tingpai',
    };
    cfg.fan.fan.map_[9312] = {
        id: 9310,
        name_chs: '未听牌',
        name_chs_t: '未听牌',
        name_jp: '未听牌',
        name_en: 'noting',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 2000,
        sound: 'gameend_noting',
    };
    cfg.fan.fan.map_[9400] = {
        id: 9400,
        name_chs: '四风连打',
        name_chs_t: '四风连打',
        name_jp: '四风连打',
        name_en: 'sifenglianda',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 2000,
        sound: 'gameend_sifenglianda',
    };
    cfg.fan.fan.map_[9401] = {
        id: 9401,
        name_chs: '四杠散了',
        name_chs_t: '四杠散了',
        name_jp: '四杠散了',
        name_en: 'sigangsanle',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 2000,
        sound: 'gameend_sigangliuju',
    };
    cfg.fan.fan.map_[9402] = {
        id: 9402,
        name_chs: '九种九牌',
        name_chs_t: '九种九牌',
        name_jp: '九种九牌',
        name_en: 'jiuzhongjiupai',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 2000,
        sound: 'gameend_jiuzhongjiupai',
    };
    cfg.fan.fan.map_[9500] = {
        id: 9500,
        name_chs: '获得语音',
        name_chs_t: '获得语音',
        name_jp: '获得语音',
        name_en: 'selfintro',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 0,
        sound: 'lobby_selfintro',
    };
    cfg.fan.fan.map_[9501] = {
        id: 9501,
        name_chs: '登录语音普通',
        name_chs_t: '登录语音普通',
        name_jp: '登录语音普通',
        name_en: 'playerlogin',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 0,
        sound: 'lobby_playerlogin',
    };
    cfg.fan.fan.map_[9502] = {
        id: 9502,
        name_chs: '登录语音满羁绊',
        name_chs_t: '登录语音满羁绊',
        name_jp: '登录语音满羁绊',
        name_en: 'playerlogin_max',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 2000,
        sound: 'lobby_playerlogin',
    };
    cfg.fan.fan.map_[9503] = {
        id: 9503,
        name_chs: '大厅交互语音1',
        name_chs_t: '大厅交互语音1',
        name_jp: '大厅交互语音1',
        name_en: 'lobby_normal1',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 0,
        sound: 'lobby_normal',
    };
    cfg.fan.fan.map_[9504] = {
        id: 9504,
        name_chs: '大厅交互语音2',
        name_chs_t: '大厅交互语音2',
        name_jp: '大厅交互语音2',
        name_en: 'lobby_normal2',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 0,
        sound: 'lobby_normal',
    };
    cfg.fan.fan.map_[9505] = {
        id: 9505,
        name_chs: '大厅交互语音3',
        name_chs_t: '大厅交互语音3',
        name_jp: '大厅交互语音3',
        name_en: 'lobby_normal3',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 0,
        sound: 'lobby_normal',
    };
    cfg.fan.fan.map_[9506] = {
        id: 9506,
        name_chs: '大厅交互语音4',
        name_chs_t: '大厅交互语音4',
        name_jp: '大厅交互语音4',
        name_en: 'lobby_normal4',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 0,
        sound: 'lobby_normal',
    };
    cfg.fan.fan.map_[9507] = {
        id: 9507,
        name_chs: '大厅交互语音5',
        name_chs_t: '大厅交互语音5',
        name_jp: '大厅交互语音5',
        name_en: 'lobby_normal5',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 0,
        sound: 'lobby_normal',
    };
    cfg.fan.fan.map_[9508] = {
        id: 9508,
        name_chs: '大厅交互语音6',
        name_chs_t: '大厅交互语音6',
        name_jp: '大厅交互语音6',
        name_en: 'lobby_normal6',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 0,
        sound: 'lobby_normal',
    };
    cfg.fan.fan.map_[9509] = {
        id: 9509,
        name_chs: '大厅交互语音7',
        name_chs_t: '大厅交互语音7',
        name_jp: '大厅交互语音7',
        name_en: 'lobby_normal7',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 0,
        sound: 'lobby_normal',
    };
    cfg.fan.fan.map_[9510] = {
        id: 9510,
        name_chs: '大厅交互语音8',
        name_chs_t: '大厅交互语音8',
        name_jp: '大厅交互语音8',
        name_en: 'lobby_normal8',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 0,
        sound: 'lobby_normal',
    };
    cfg.fan.fan.map_[9511] = {
        id: 9511,
        name_chs: '送礼物语音普通',
        name_chs_t: '送礼物语音普通',
        name_jp: '送礼物语音普通',
        name_en: 'lobby_gift',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 0,
        sound: 'lobby_gift',
    };
    cfg.fan.fan.map_[9512] = {
        id: 9512,
        name_chs: '送礼物语音喜好',
        name_chs_t: '送礼物语音喜好',
        name_jp: '送礼物语音喜好',
        name_en: 'lobby_gift_favor',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 0,
        sound: 'lobby_gift_favor',
    };
    cfg.fan.fan.map_[9513] = {
        id: 9513,
        name_chs: '好感度升级语音1',
        name_chs_t: '好感度升级语音1',
        name_jp: '好感度升级语音1',
        name_en: 'lobby_levelup1',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 0,
        sound: 'lobby_levelup1',
    };
    cfg.fan.fan.map_[9514] = {
        id: 9514,
        name_chs: '好感度升级语音2',
        name_chs_t: '好感度升级语音2',
        name_jp: '好感度升级语音2',
        name_en: 'lobby_levelup2',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 0,
        sound: 'lobby_levelup2',
    };
    cfg.fan.fan.map_[9515] = {
        id: 9515,
        name_chs: '好感度升级语音3',
        name_chs_t: '好感度升级语音3',
        name_jp: '好感度升级语音3',
        name_en: 'lobby_levelup3',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 0,
        sound: 'lobby_levelup3',
    };
    cfg.fan.fan.map_[9516] = {
        id: 9516,
        name_chs: '好感度升级语音4',
        name_chs_t: '好感度升级语音4',
        name_jp: '好感度升级语音4',
        name_en: 'lobby_levelup4',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 0,
        sound: 'lobby_levelup4',
    };
    cfg.fan.fan.map_[9517] = {
        id: 9517,
        name_chs: '好感度升级语音5',
        name_chs_t: '好感度升级语音5',
        name_jp: '好感度升级语音5',
        name_en: 'lobby_levelmax',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 0,
        sound: 'lobby_levelmax',
    };
    cfg.fan.fan.map_[9517] = {
        id: 9517,
        name_chs: '好感度升级语音5',
        name_chs_t: '好感度升级语音5',
        name_jp: '好感度升级语音5',
        name_en: 'lobby_manjiban',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 0,
        sound: 'lobby_manjiban',
    };
    cfg.fan.fan.map_[9518] = {
        id: 9518,
        name_chs: '契约语音',
        name_chs_t: '契约语音',
        name_jp: '契约语音',
        name_en: 'lobby_qiyue',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 0,
        sound: 'lobby_qiyue',
    };
    cfg.fan.fan.map_[9519] = {
        id: 9519,
        name_chs: '新年语音',
        name_chs_t: '新年语音',
        name_jp: '新年语音',
        name_en: 'lobby_newyear',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 0,
        sound: 'lobby_newyear',
    };
    cfg.fan.fan.map_[9520] = {
        id: 9520,
        name_chs: '情人节语音',
        name_chs_t: '情人节语音',
        name_jp: '情人节语音',
        name_en: 'lobby_valentine',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 0,
        sound: 'lobby_valentine',
    };
    cfg.fan.fan.map_[9600] = {
        id: 9600,
        name_chs: '连续打出多张相同牌',
        name_chs_t: '连续打出多张相同牌',
        name_jp: '连续打出多张相同牌',
        name_en: 'ingame_lianda',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 0,
        sound: 'ingame_lianda',
    };
    cfg.fan.fan.map_[9601] = {
        id: 9601,
        name_chs: '打出宝牌',
        name_chs_t: '打出宝牌',
        name_jp: '打出宝牌',
        name_en: 'ingame_baopai',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 0,
        sound: 'ingame_baopai',
    };
    cfg.fan.fan.map_[9602] = {
        id: 9602,
        name_chs: '余牌少于10',
        name_chs_t: '余牌少于10',
        name_jp: '余牌少于10',
        name_en: 'ingame_remain10',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 0,
        sound: 'ingame_remain10',
    };
    cfg.fan.fan.map_[9603] = {
        id: 9603,
        name_chs: '役满听牌',
        name_chs_t: '役满听牌',
        name_jp: '役满听牌',
        name_en: 'ingame_yiman',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 0,
        sound: 'ingame_yiman',
    };
    cfg.fan.fan.map_[9604] = {
        id: 9604,
        name_chs: '倍满/三倍满听牌',
        name_chs_t: '倍满/三倍满听牌',
        name_jp: '倍满/三倍满听牌',
        name_en: 'ingame_beiman',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 0,
        sound: 'ingame_beiman',
    };
    cfg.fan.fan.map_[9605] = {
        id: 9605,
        name_chs: '进入友人房',
        name_chs_t: '进入友人房',
        name_jp: '进入友人房',
        name_en: 'lobby_room_in',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 0,
        sound: 'lobby_room_in',
    };
    cfg.fan.fan.map_[9606] = {
        id: 9606,
        name_chs: '友人房内准备',
        name_chs_t: '友人房内准备',
        name_jp: '友人房内准备',
        name_en: 'lobby_room_ready',
        fan_menqing: 0,
        fan_fulu: 0,
        show_index: 0,
        sound: 'lobby_room_ready',
    };
    cfg.fan.fan.map_[9700] = {
        id: 9700,
        name_chs: '推不倒',
        name_chs_t: '推不倒',
        name_jp: '推不倒',
        name_en: '',
        fan_menqing: 1,
        fan_fulu: 1,
        show_index: 0,
        sound: '',
    };
    cfg.fan.fan.map_[9701] = {
        id: 9701,
        name_chs: '赤三色',
        name_chs_t: '赤三色',
        name_jp: '赤三色',
        name_en: '',
        fan_menqing: 2,
        fan_fulu: 2,
        show_index: 0,
        sound: '',
    };
    cfg.fan.fan.map_[9702] = {
        id: 9702,
        name_chs: '三色通贯',
        name_chs_t: '三色通贯',
        name_jp: '三色通贯',
        name_en: '',
        fan_menqing: 2,
        fan_fulu: 1,
        show_index: 0,
        sound: '',
    };
    cfg.fan.fan.map_[9703] = {
        id: 9703,
        name_chs: '四连刻',
        name_chs_t: '四连刻',
        name_jp: '四连刻',
        name_en: '',
        fan_menqing: 1,
        fan_fulu: 1,
        show_index: 0,
        sound: '',
    };
    cfg.fan.fan.map_[9704] = {
        id: 9704,
        name_chs: '一色四同顺',
        name_chs_t: '一色四同顺',
        name_jp: '一色四同顺',
        name_en: '',
        fan_menqing: 1,
        fan_fulu: 1,
        show_index: 0,
        sound: '',
    };
    cfg.fan.fan.map_[9705] = {
        id: 9705,
        name_chs: '红孔雀',
        name_chs_t: '红孔雀',
        name_jp: '红孔雀',
        name_en: '',
        fan_menqing: 1,
        fan_fulu: 1,
        show_index: 0,
        sound: '',
    };
    cfg.fan.fan.map_[9706] = {
        id: 9706,
        name_chs: '红一点',
        name_chs_t: '红一点',
        name_jp: '红一点',
        name_en: '',
        fan_menqing: 1,
        fan_fulu: 1,
        show_index: 0,
        sound: '',
    };
    cfg.fan.fan.map_[9707] = {
        id: 9707,
        name_chs: '黑一色',
        name_chs_t: '黑一色',
        name_jp: '黑一色',
        name_en: '',
        fan_menqing: 1,
        fan_fulu: 1,
        show_index: 0,
        sound: '',
    };
    cfg.fan.fan.map_[9708] = {
        id: 9708,
        name_chs: '十三不搭',
        name_chs_t: '十三不搭',
        name_jp: '十三不搭',
        name_en: '',
        fan_menqing: 1,
        fan_fulu: 1,
        show_index: 0,
        sound: '',
    };
    cfg.fan.fan.map_[9709] = {
        id: 9709,
        name_chs: '百万石',
        name_chs_t: '百万石',
        name_jp: '百万石',
        name_en: '',
        fan_menqing: 1,
        fan_fulu: 1,
        show_index: 0,
        sound: '',
    };
    cfg.fan.fan.map_[9710] = {
        id: 9710,
        name_chs: '金门桥',
        name_chs_t: '金门桥',
        name_jp: '金门桥',
        name_en: '',
        fan_menqing: 1,
        fan_fulu: 1,
        show_index: 0,
        sound: '',
    };
    cfg.fan.fan.map_[9711] = {
        id: 9711,
        name_chs: '东北新干线',
        name_chs_t: '东北新干线',
        name_jp: '东北新干线',
        name_en: '',
        fan_menqing: 1,
        fan_fulu: 1,
        show_index: 0,
        sound: '',
    };
    cfg.fan.fan.map_[9712] = {
        id: 9712,
        name_chs: '无发绿一色',
        name_chs_t: '无发绿一色',
        name_jp: '无发绿一色',
        name_en: '',
        fan_menqing: 1,
        fan_fulu: 1,
        show_index: 0,
        sound: 'fan_lvyise',
    };
};
const guobiaoFans = () => {
    cfg.fan.fan.map_[8000] = {
        id: 8000,
        name_chs: '大四喜',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 88,
        fan_fulu: 88,
        show_index: 8000,
        sound: 'fan_dasixi',
    };
    cfg.fan.fan.map_[8001] = {
        id: 8001,
        name_chs: '大三元',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 88,
        fan_fulu: 88,
        show_index: 8001,
        sound: 'fan_dasanyuan',
    };
    cfg.fan.fan.map_[8002] = {
        id: 8002,
        name_chs: '绿一色',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 88,
        fan_fulu: 88,
        show_index: 8002,
        sound: 'fan_lvyise',
    };
    cfg.fan.fan.map_[8003] = {
        id: 8003,
        name_chs: '九莲宝灯',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 88,
        fan_fulu: 88,
        show_index: 8003,
        sound: 'fan_jiulianbaodeng',
    };
    cfg.fan.fan.map_[8004] = {
        id: 8004,
        name_chs: '四杠',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 88,
        fan_fulu: 88,
        show_index: 8004,
        sound: 'fan_sigangzi',
    };
    cfg.fan.fan.map_[8005] = {
        id: 8005,
        name_chs: '连七对',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 88,
        fan_fulu: 88,
        show_index: 8005,
        sound: '',
    };
    cfg.fan.fan.map_[8006] = {
        id: 8006,
        name_chs: '十三幺',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 88,
        fan_fulu: 88,
        show_index: 8006,
        sound: 'fan_guoshiwushuang',
    };
    cfg.fan.fan.map_[8007] = {
        id: 8007,
        name_chs: '清幺九',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 64,
        fan_fulu: 64,
        show_index: 8007,
        sound: 'fan_qinglaotou',
    };
    cfg.fan.fan.map_[8008] = {
        id: 8008,
        name_chs: '小四喜',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 64,
        fan_fulu: 64,
        show_index: 8008,
        sound: 'fan_xiaosixi',
    };
    cfg.fan.fan.map_[8009] = {
        id: 8009,
        name_chs: '小三元',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 64,
        fan_fulu: 64,
        show_index: 8009,
        sound: 'fan_xiaosanyuan',
    };
    cfg.fan.fan.map_[8010] = {
        id: 8010,
        name_chs: '字一色',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 64,
        fan_fulu: 64,
        show_index: 8010,
        sound: 'fan_ziyise',
    };
    cfg.fan.fan.map_[8011] = {
        id: 8011,
        name_chs: '四暗刻',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 64,
        fan_fulu: 64,
        show_index: 8011,
        sound: 'fan_sianke',
    };
    cfg.fan.fan.map_[8012] = {
        id: 8012,
        name_chs: '一色双龙会',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 64,
        fan_fulu: 64,
        show_index: 8012,
        sound: '',
    };
    cfg.fan.fan.map_[8013] = {
        id: 8013,
        name_chs: '一色四同顺',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 32,
        fan_fulu: 32,
        show_index: 8013,
        sound: '',
    };
    cfg.fan.fan.map_[8014] = {
        id: 8014,
        name_chs: '一色四节高',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 32,
        fan_fulu: 32,
        show_index: 8014,
        sound: '',
    };
    cfg.fan.fan.map_[8015] = {
        id: 8015,
        name_chs: '一色四步高',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 32,
        fan_fulu: 32,
        show_index: 8015,
        sound: '',
    };
    cfg.fan.fan.map_[8016] = {
        id: 8016,
        name_chs: '三杠',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 32,
        fan_fulu: 32,
        show_index: 8016,
        sound: 'fan_sangangzi',
    };
    cfg.fan.fan.map_[8017] = {
        id: 8017,
        name_chs: '混幺九',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 32,
        fan_fulu: 32,
        show_index: 8017,
        sound: 'fan_hunlaotou',
    };
    cfg.fan.fan.map_[8018] = {
        id: 8018,
        name_chs: '七对',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 24,
        fan_fulu: 24,
        show_index: 8018,
        sound: 'fan_qiduizi',
    };
    cfg.fan.fan.map_[8019] = {
        id: 8019,
        name_chs: '七星不靠',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 24,
        fan_fulu: 24,
        show_index: 8019,
        sound: '',
    };
    cfg.fan.fan.map_[8020] = {
        id: 8020,
        name_chs: '全双刻',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 24,
        fan_fulu: 24,
        show_index: 8020,
        sound: '',
    };
    cfg.fan.fan.map_[8021] = {
        id: 8021,
        name_chs: '清一色',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 24,
        fan_fulu: 24,
        show_index: 8021,
        sound: 'fan_qingyise',
    };
    cfg.fan.fan.map_[8022] = {
        id: 8022,
        name_chs: '一色三同顺',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 24,
        fan_fulu: 24,
        show_index: 8022,
        sound: '',
    };
    cfg.fan.fan.map_[8023] = {
        id: 8023,
        name_chs: '一色三节高',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 24,
        fan_fulu: 24,
        show_index: 8023,
        sound: '',
    };
    cfg.fan.fan.map_[8024] = {
        id: 8024,
        name_chs: '全大',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 24,
        fan_fulu: 24,
        show_index: 8024,
        sound: '',
    };
    cfg.fan.fan.map_[8025] = {
        id: 8025,
        name_chs: '全中',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 24,
        fan_fulu: 24,
        show_index: 8025,
        sound: '',
    };
    cfg.fan.fan.map_[8026] = {
        id: 8026,
        name_chs: '全小',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 24,
        fan_fulu: 24,
        show_index: 8026,
        sound: '',
    };
    cfg.fan.fan.map_[8027] = {
        id: 8027,
        name_chs: '清龙',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 16,
        fan_fulu: 16,
        show_index: 8027,
        sound: 'fan_yiqitongguan',
    };
    cfg.fan.fan.map_[8028] = {
        id: 8028,
        name_chs: '三色双龙会',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 16,
        fan_fulu: 16,
        show_index: 8028,
        sound: '',
    };
    cfg.fan.fan.map_[8029] = {
        id: 8029,
        name_chs: '一色三步高',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 16,
        fan_fulu: 16,
        show_index: 8029,
        sound: '',
    };
    cfg.fan.fan.map_[8030] = {
        id: 8030,
        name_chs: '全带五',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 16,
        fan_fulu: 16,
        show_index: 8030,
        sound: '',
    };
    cfg.fan.fan.map_[8031] = {
        id: 8031,
        name_chs: '三同刻',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 16,
        fan_fulu: 16,
        show_index: 8031,
        sound: 'fan_sansetongke',
    };
    cfg.fan.fan.map_[8032] = {
        id: 8032,
        name_chs: '三暗刻',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 16,
        fan_fulu: 16,
        show_index: 8032,
        sound: 'fan_sananke',
    };
    cfg.fan.fan.map_[8033] = {
        id: 8033,
        name_chs: '全不靠',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 12,
        fan_fulu: 12,
        show_index: 8033,
        sound: '',
    };
    cfg.fan.fan.map_[8034] = {
        id: 8034,
        name_chs: '组合龙',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 12,
        fan_fulu: 12,
        show_index: 8034,
        sound: '',
    };
    cfg.fan.fan.map_[8035] = {
        id: 8035,
        name_chs: '大于五',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 12,
        fan_fulu: 12,
        show_index: 8035,
        sound: '',
    };
    cfg.fan.fan.map_[8036] = {
        id: 8036,
        name_chs: '小于五',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 12,
        fan_fulu: 12,
        show_index: 8036,
        sound: '',
    };
    cfg.fan.fan.map_[8037] = {
        id: 8037,
        name_chs: '三风刻',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 12,
        fan_fulu: 12,
        show_index: 8037,
        sound: '',
    };
    cfg.fan.fan.map_[8038] = {
        id: 8038,
        name_chs: '花龙',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 8,
        fan_fulu: 8,
        show_index: 8038,
        sound: '',
    };
    cfg.fan.fan.map_[8039] = {
        id: 8039,
        name_chs: '推不倒',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 8,
        fan_fulu: 8,
        show_index: 8039,
        sound: '',
    };
    cfg.fan.fan.map_[8040] = {
        id: 8040,
        name_chs: '三色三同顺',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 8,
        fan_fulu: 8,
        show_index: 8040,
        sound: 'fan_sansetongshun',
    };
    cfg.fan.fan.map_[8041] = {
        id: 8041,
        name_chs: '三色三节高',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 8,
        fan_fulu: 8,
        show_index: 8041,
        sound: '',
    };
    cfg.fan.fan.map_[8042] = {
        id: 8042,
        name_chs: '无番和',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 8,
        fan_fulu: 8,
        show_index: 8042,
        sound: '',
    };
    cfg.fan.fan.map_[8043] = {
        id: 8043,
        name_chs: '妙手回春',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 8,
        fan_fulu: 8,
        show_index: 8043,
        sound: 'fan_haidi',
    };
    cfg.fan.fan.map_[8044] = {
        id: 8044,
        name_chs: '海底捞月',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 8,
        fan_fulu: 8,
        show_index: 8044,
        sound: 'fan_hedi',
    };
    cfg.fan.fan.map_[8045] = {
        id: 8045,
        name_chs: '杠上开花',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 8,
        fan_fulu: 8,
        show_index: 8045,
        sound: 'fan_lingshang',
    };
    cfg.fan.fan.map_[8046] = {
        id: 8046,
        name_chs: '抢杠和',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 8,
        fan_fulu: 8,
        show_index: 8046,
        sound: 'fan_qianggang',
    };
    cfg.fan.fan.map_[8047] = {
        id: 8047,
        name_chs: '碰碰和',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 6,
        fan_fulu: 6,
        show_index: 8047,
        sound: 'fan_duiduihu',
    };
    cfg.fan.fan.map_[8048] = {
        id: 8048,
        name_chs: '混一色',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 6,
        fan_fulu: 6,
        show_index: 8048,
        sound: 'fan_hunyise',
    };
    cfg.fan.fan.map_[8049] = {
        id: 8049,
        name_chs: '三色三步高',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 6,
        fan_fulu: 6,
        show_index: 8049,
        sound: '',
    };
    cfg.fan.fan.map_[8050] = {
        id: 8050,
        name_chs: '五门齐',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 6,
        fan_fulu: 6,
        show_index: 8050,
        sound: '',
    };
    cfg.fan.fan.map_[8051] = {
        id: 8051,
        name_chs: '全求人',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 6,
        fan_fulu: 6,
        show_index: 8051,
        sound: '',
    };
    cfg.fan.fan.map_[8052] = {
        id: 8052,
        name_chs: '双暗杠',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 6,
        fan_fulu: 6,
        show_index: 8052,
        sound: '',
    };
    cfg.fan.fan.map_[8053] = {
        id: 8053,
        name_chs: '双箭刻',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 6,
        fan_fulu: 6,
        show_index: 8053,
        sound: '',
    };
    cfg.fan.fan.map_[8054] = {
        id: 8054,
        name_chs: '全带幺',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 4,
        fan_fulu: 4,
        show_index: 8054,
        sound: 'fan_hunquandaiyaojiu',
    };
    cfg.fan.fan.map_[8055] = {
        id: 8055,
        name_chs: '不求人',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 4,
        fan_fulu: 4,
        show_index: 8055,
        sound: 'fan_zimo',
    };
    cfg.fan.fan.map_[8056] = {
        id: 8056,
        name_chs: '双明杠',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 4,
        fan_fulu: 4,
        show_index: 8056,
        sound: '',
    };
    cfg.fan.fan.map_[8057] = {
        id: 8057,
        name_chs: '和绝张',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 4,
        fan_fulu: 4,
        show_index: 8057,
        sound: '',
    };
    cfg.fan.fan.map_[8058] = {
        id: 8058,
        name_chs: '箭刻 白',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 2,
        fan_fulu: 2,
        show_index: 8058,
        sound: 'fan_bai',
    };
    cfg.fan.fan.map_[8059] = {
        id: 8059,
        name_chs: '箭刻 发',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 2,
        fan_fulu: 2,
        show_index: 8059,
        sound: 'fan_fa',
    };
    cfg.fan.fan.map_[8060] = {
        id: 8060,
        name_chs: '箭刻 中',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 2,
        fan_fulu: 2,
        show_index: 8060,
        sound: 'fan_zhong',
    };
    cfg.fan.fan.map_[8061] = {
        id: 8061,
        name_chs: '圈风刻',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 2,
        fan_fulu: 2,
        show_index: 8061,
        sound: '',
    };
    cfg.fan.fan.map_[8062] = {
        id: 8062,
        name_chs: '门风刻',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 2,
        fan_fulu: 2,
        show_index: 8062,
        sound: '',
    };
    cfg.fan.fan.map_[8063] = {
        id: 8063,
        name_chs: '门前清',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 2,
        fan_fulu: 2,
        show_index: 8063,
        sound: '',
    };
    cfg.fan.fan.map_[8064] = {
        id: 8064,
        name_chs: '平和',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 2,
        fan_fulu: 2,
        show_index: 8064,
        sound: 'fan_pinghu',
    };
    cfg.fan.fan.map_[8065] = {
        id: 8065,
        name_chs: '四归一',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 2,
        fan_fulu: 2,
        show_index: 8065,
        sound: 'scfan_gen',
    };
    cfg.fan.fan.map_[8066] = {
        id: 8066,
        name_chs: '双同刻',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 2,
        fan_fulu: 2,
        show_index: 8066,
        sound: '',
    };
    cfg.fan.fan.map_[8067] = {
        id: 8067,
        name_chs: '双暗刻',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 2,
        fan_fulu: 2,
        show_index: 8067,
        sound: '',
    };
    cfg.fan.fan.map_[8068] = {
        id: 8068,
        name_chs: '暗杠',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 2,
        fan_fulu: 2,
        show_index: 8068,
        sound: '',
    };
    cfg.fan.fan.map_[8069] = {
        id: 8069,
        name_chs: '断幺',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 2,
        fan_fulu: 2,
        show_index: 8069,
        sound: 'fan_duanyao',
    };
    cfg.fan.fan.map_[8070] = {
        id: 8070,
        name_chs: '一般高',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 1,
        fan_fulu: 1,
        show_index: 8070,
        sound: 'fan_yibeikou',
    };
    cfg.fan.fan.map_[8071] = {
        id: 8071,
        name_chs: '喜相逢',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 1,
        fan_fulu: 1,
        show_index: 8071,
        sound: '',
    };
    cfg.fan.fan.map_[8072] = {
        id: 8072,
        name_chs: '连六',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 1,
        fan_fulu: 1,
        show_index: 8072,
        sound: '',
    };
    cfg.fan.fan.map_[8073] = {
        id: 8073,
        name_chs: '老少副',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 1,
        fan_fulu: 1,
        show_index: 8073,
        sound: '',
    };
    cfg.fan.fan.map_[8074] = {
        id: 8074,
        name_chs: '幺九刻',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 1,
        fan_fulu: 1,
        show_index: 8074,
        sound: '',
    };
    cfg.fan.fan.map_[8075] = {
        id: 8075,
        name_chs: '明杠',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 1,
        fan_fulu: 1,
        show_index: 8075,
        sound: '',
    };
    cfg.fan.fan.map_[8076] = {
        id: 8076,
        name_chs: '缺一门',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 1,
        fan_fulu: 1,
        show_index: 8076,
        sound: '',
    };
    cfg.fan.fan.map_[8077] = {
        id: 8077,
        name_chs: '无字',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 1,
        fan_fulu: 1,
        show_index: 8077,
        sound: '',
    };
    cfg.fan.fan.map_[8078] = {
        id: 8078,
        name_chs: '边张',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 1,
        fan_fulu: 1,
        show_index: 8078,
        sound: '',
    };
    cfg.fan.fan.map_[8079] = {
        id: 8079,
        name_chs: '坎张',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 1,
        fan_fulu: 1,
        show_index: 8079,
        sound: '',
    };
    cfg.fan.fan.map_[8080] = {
        id: 8080,
        name_chs: '单钓将',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 1,
        fan_fulu: 1,
        show_index: 8080,
        sound: '',
    };
    cfg.fan.fan.map_[8081] = {
        id: 8081,
        name_chs: '自摸',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 1,
        fan_fulu: 1,
        show_index: 8081,
        sound: 'fan_zimo',
    };
    cfg.fan.fan.map_[8082] = {
        id: 8082,
        name_chs: '明暗杠',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 6,
        fan_fulu: 6,
        show_index: 8082,
        sound: '',
    };
    cfg.fan.fan.map_[8083] = {
        id: 8083,
        name_chs: '天和',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 8,
        fan_fulu: 8,
        show_index: 8083,
        sound: 'fan_tianhu',
    };
    cfg.fan.fan.map_[8084] = {
        id: 8084,
        name_chs: '地和',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 6,
        fan_fulu: 6,
        show_index: 8084,
        sound: 'fan_dihu',
    };
    cfg.fan.fan.map_[8085] = {
        id: 8085,
        name_chs: '人和',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 6,
        fan_fulu: 6,
        show_index: 8085,
        sound: '',
    };
    cfg.fan.fan.map_[8091] = {
        id: 8091,
        name_chs: '花牌',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 1,
        fan_fulu: 1,
        show_index: 8091,
        sound: 'fan_dora1',
    };
    cfg.fan.fan.map_[8092] = {
        id: 8092,
        name_chs: '花牌',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 2,
        fan_fulu: 2,
        show_index: 8092,
        sound: 'fan_dora2',
    };
    cfg.fan.fan.map_[8093] = {
        id: 8093,
        name_chs: '花牌',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 3,
        fan_fulu: 3,
        show_index: 8093,
        sound: 'fan_dora3',
    };
    cfg.fan.fan.map_[8094] = {
        id: 8094,
        name_chs: '花牌',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 4,
        fan_fulu: 4,
        show_index: 8094,
        sound: 'fan_dora4',
    };
    cfg.fan.fan.map_[8095] = {
        id: 8095,
        name_chs: '花牌',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 5,
        fan_fulu: 5,
        show_index: 8095,
        sound: 'fan_dora5',
    };
    cfg.fan.fan.map_[8096] = {
        id: 8096,
        name_chs: '花牌',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 6,
        fan_fulu: 6,
        show_index: 8096,
        sound: 'fan_dora6',
    };
    cfg.fan.fan.map_[8097] = {
        id: 8097,
        name_chs: '花牌',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 7,
        fan_fulu: 7,
        show_index: 8097,
        sound: 'fan_dora7',
    };
    cfg.fan.fan.map_[8098] = {
        id: 8098,
        name_chs: '花牌',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 1,
        fan_fulu: 1,
        show_index: 8098,
        sound: 'fan_dora8',
    };
    cfg.fan.fan.map_[8099] = {
        id: 8099,
        name_chs: '花牌',
        name_chs_t: '',
        name_jp: '',
        name_en: '',
        fan_menqing: 1,
        fan_fulu: 1,
        show_index: 8099,
        sound: 'fan_dora13',
    };
};
let inst_once = true;
const editOnline = () => {
    let rounds = [];
    for (let i in all_data.actions)
        rounds.push({ actions: all_data.actions[i], xun: all_data.xun[i][view.DesktopMgr.Inst.seat] });
    uiscript.UI_Replay.Inst.rounds = rounds;
    uiscript.UI_Replay.Inst.gameResult.result.players = all_data.players;
};
const editOffline = () => {
    const editPlayerDatas = () => {
        let ret = [null, null];
        let slots = [0, 1, 2, 5, 6, 7, 11, 13];
        for (let seat = 0; seat < player_cnt; seat++) {
            ret[seat] = {
                account_id: player_datas[seat].avatar_id * 10 + seat,
                seat: seat,
                nickname: player_datas[seat].nickname,
                avatar_id: player_datas[seat].avatar_id,
                character: {
                    charid: cfg.item_definition.skin.map_[player_datas[seat].avatar_id].character_id,
                    level: 5,
                    exp: 0,
                    skin: player_datas[seat].avatar_id,
                    is_upgraded: true,
                    extra_emoji: [10, 11, 12],
                },
                title: player_datas[seat].title,
                level: { id: 10503, score: 4500 },
                level3: { id: 20503, score: 4500 },
                avatar_frame: player_datas[seat].avatar_frame,
                verified: player_datas[seat].verified,
                views: player_datas[seat].views,
            };
            if (is_random_skin()) {
                let skin_len = cfg.item_definition.skin.rows_.length;
                let skin_id = cfg.item_definition.skin.rows_[Math.floor(Math.random() * skin_len)].id;
                while (skin_id === 400000 || skin_id === 400001)
                    skin_id = cfg.item_definition.skin.rows_[Math.floor(Math.random() * skin_len)].id;
                ret[seat].avatar_id = ret[seat].character.skin = skin_id;
                ret[seat].character.charid = cfg.item_definition.skin.map_[skin_id].character_id;
            }
            if (is_random_views())
                for (let i in slots) {
                    let slot = slots[i];
                    let item_id = views_pool[slot][Math.floor(Math.random() * views_pool[slot].length)];
                    if (slot === 11) {
                        ret[seat].title = item_id;
                        continue;
                    }
                    if (slot === 5)
                        ret[seat].avatar_frame = item_id;
                    let existed = false;
                    for (let j in ret[seat].views)
                        if (ret[seat].views[j].slot === slot) {
                            ret[seat].views[j].item_id = item_id;
                            existed = true;
                            break;
                        }
                    if (!existed)
                        ret[seat].views.push({
                            slot: slot,
                            item_id: item_id,
                        });
                }
        }
        for (let i = 0; i < player_cnt; i++)
            all_data.player_datas[i] = player_datas[i] = ret[i];
    };
    if (checkPaiPu === undefined)
        checkPaiPu = GameMgr.Inst.checkPaiPu;
    if (resetData === undefined)
        resetData = uiscript.UI_Replay.prototype.resetData;
    if (OnChoosedPai === undefined)
        OnChoosedPai = view.ViewPai.prototype.OnChoosedPai;
    if (seat2LocalPosition === undefined)
        seat2LocalPosition = view.DesktopMgr.prototype.seat2LocalPosition;
    if (localPosition2Seat === undefined)
        localPosition2Seat = view.DesktopMgr.prototype.localPosition2Seat;
    uiscript.UI_Replay.prototype.resetData = function () {
        try {
            resetData.call(this);
            editOnline();
        }
        catch (e) {
            console.error(e);
        }
    };
    GameMgr.Inst.checkPaiPu = function (game_uuid, account_id, paipu_config) {
        try {
            if (all_data.actions.length === 0) {
                console.error('GameMgr.Inst.checkPaiPu: 没有载入自制牌谱, 不可查看, 若要查看真实牌谱, 请输入 resetReplay()');
                return;
            }
            if (inst_once) {
                if (typeof editFunction == 'function')
                    editFunction();
                updateViews();
                DIYFans();
                guobiaoFans();
                optimizeFunction();
            }
        }
        catch (e) {
            console.error(e);
        }
        const W = this;
        game_uuid = game_uuid.trim();
        app.Log.log('checkPaiPu game_uuid:' + game_uuid + ' account_id:' + account_id.toString() + ' paipu_config:' + paipu_config);
        if (this.duringPaipu)
            app.Log.Error('已经在看牌谱了');
        else {
            this.duringPaipu = true;
            uiscript.UI_Loading.Inst.show(uiscript.ELoadingType.EEnterMJ);
            GameMgr.Inst.onLoadStart('paipu');
            if (paipu_config === 2)
                game_uuid = game.Tools.DecodePaipuUUID(game_uuid);
            this.record_uuid = game_uuid;
            app.NetAgent.sendReq2Lobby('Lobby', 'fetchGameRecord', {
                game_uuid: game_uuid,
                client_version_string: this.getClientVersion()
            }, function (l, n) {
                if (l || n.error) {
                    uiscript.UIMgr.Inst.showNetReqError('fetchGameRecord', l, n);
                    let y = 0.12;
                    uiscript.UI_Loading.Inst.setProgressVal(y);
                    const f = function () {
                        y += 0.06;
                        uiscript.UI_Loading.Inst.setProgressVal(Math.min(1, y));
                        if (y >= 1.1) {
                            uiscript.UI_Loading.Inst.close();
                            uiscript.UIMgr.Inst.showLobby();
                            Laya.timer.clear(this, f);
                        }
                    };
                    Laya.timer.loop(50, W, f);
                    W.duringPaipu = false;
                }
                else {
                    n.head.robots = [];
                    editPlayerDatas();
                    try {
                        if (cfg.item_definition.view.get(get_tablecloth_id()) !== undefined)
                            uiscript.UI_Sushe.now_desktop_id = get_tablecloth_id();
                        if (cfg.item_definition.view.get(get_mjp_id()) !== undefined) {
                            uiscript.UI_Sushe.now_mjp_id = get_mjp_id();
                            GameMgr.Inst.mjp_view = cfg.item_definition.view.get(get_mjp_id()).res_name;
                            Laya.loader.load(`${game.LoadMgr.getAtlasRoot()}myres2/mjp/${GameMgr.Inst.mjp_view}/hand.atlas`);
                        }
                        if (cfg.item_definition.view.get(get_mjpsurface_id()) !== undefined) {
                            uiscript.UI_Sushe.now_mjp_surface_id = get_mjpsurface_id();
                            GameMgr.Inst.mjp_surface_view = cfg.item_definition.view.get(get_mjpsurface_id()).res_name;
                            Laya.loader.load(`${game.LoadMgr.getAtlasRoot()}myres2/mjpm/${GameMgr.Inst.mjp_surface_view}/ui.atlas`);
                        }
                        if (get_mainrole_seat() > -1)
                            account_id = all_data.player_datas[get_mainrole_seat()].account_id;
                        else
                            account_id = all_data.player_datas[all_data.actions[0][0].data.ju].account_id;
                    }
                    catch (e) {
                        console.error(e);
                    }
                    const C = Laya.Handler.create(W, function (H) {
                        const main_func = function () {
                            game.Scene_Lobby.Inst.active = false;
                            game.Scene_MJ.Inst.openMJRoom(all_data.config, all_data.player_datas, Laya.Handler.create(W, function () {
                                W.duringPaipu = false;
                                view.DesktopMgr.Inst.paipu_config = paipu_config;
                                view.DesktopMgr.Inst.initRoom(JSON.parse(JSON.stringify(all_data.config)), all_data.player_datas, account_id, view.EMJMode.paipu, Laya.Handler.create(W, function () {
                                    if (typeof editFunction2 == 'function' && inst_once)
                                        editFunction2();
                                    inst_once = false;
                                    if (player_cnt === 2) {
                                        view.DesktopMgr.Inst.rule_mode = view.ERuleMode.Liqi2;
                                        uiscript.UI_DesktopInfo.Inst.refreshSeat();
                                    }
                                    uiscript.UI_Replay.Inst.initMaka(false, false);
                                    uiscript.UI_Replay.Inst.initData(H);
                                    uiscript.UI_Replay.Inst.enable = true;
                                    Laya.timer.once(1000, W, function () {
                                        W.EnterMJ();
                                    });
                                    Laya.timer.once(1500, W, function () {
                                        view.DesktopMgr.player_link_state = [view.ELink_State.READY, view.ELink_State.READY, view.ELink_State.READY, view.ELink_State.READY];
                                        uiscript.UI_DesktopInfo.Inst.refreshLinks();
                                        uiscript.UI_Loading.Inst.close();
                                    });
                                    Laya.timer.once(1000, W, function () {
                                        uiscript.UI_Replay.Inst.nextStep(true);
                                    });
                                }));
                            }), Laya.Handler.create(W, function (H) {
                                return uiscript.UI_Loading.Inst.setProgressVal(0.1 + 0.9 * H);
                            }, null, false));
                        };
                        main_func();
                    });
                    let B = {};
                    B.record = n.head;
                    if (n.data && n.data.length) {
                        B.game = net.MessageWrapper.decodeMessage(n.data);
                        C.runWith(B);
                    }
                    else {
                        let O = n.data_url;
                        if (!O.startsWith('http'))
                            O = GameMgr.prefix_url + O;
                        game.LoadMgr.httpload(O, 'arraybuffer', false, Laya.Handler.create(W, function (H) {
                            if (H.success) {
                                const N = new Laya.Byte();
                                N.writeArrayBuffer(H.data);
                                B.game = net.MessageWrapper.decodeMessage(N.getUint8Array(0, N.length));
                                C.runWith(B);
                            }
                            else {
                                uiscript.UIMgr.Inst.ShowErrorInfo(game.Tools.strOfLocalization(2005) + n.data_url);
                                uiscript.UI_Loading.Inst.close();
                                uiscript.UIMgr.Inst.showLobby();
                                W.duringPaipu = false;
                            }
                        }));
                    }
                }
            });
        }
    };
};
const optimizeFunction = () => {
    view.ActionAnGangAddGang.getAngangTile = (tile, seat) => {
        let hand = view.DesktopMgr.Inst.players[view.DesktopMgr.Inst.seat2LocalPosition(seat)].hand;
        let mj_tile = mjcore.MJPai.Create(tile);
        let dora_cnt = 0;
        let touming_cnt = 0;
        for (let i = 0; i < hand.length; i++) {
            if (mjcore.MJPai.Distance(hand[i].val, mj_tile) === 0 && hand[i].val.dora)
                dora_cnt = Math.min(dora_cnt + 1, 4);
            if (mjcore.MJPai.Distance(hand[i].val, mj_tile) === 0 && hand[i].val.touming)
                touming_cnt = Math.min(touming_cnt + 1, 4);
        }
        let angang_tiles = [];
        for (let i = 0; i < 4; i++) {
            let mjp = mjcore.MJPai.Create(tile);
            mjp.dora = false;
            mjp.touming = false;
            angang_tiles.push(mjp);
        }
        for (let i = 1; i <= dora_cnt; i++)
            angang_tiles[i % 4].dora = true;
        for (let i = 0; i < touming_cnt; i++)
            angang_tiles[i].touming = true;
        view.DesktopMgr.Inst.waiting_lingshang_deal_tile = true;
        return angang_tiles;
    };
    game.Tools.get_room_desc = function (config) {
        if (!config)
            return {
                text: '',
                isSimhei: !1
            };
        let text = '';
        if (config.meta && config.meta.tournament_id) {
            let n = cfg.tournament.tournaments.get(config.meta.tournament_id);
            return n && (text = n.name),
                {
                    text: text,
                    isSimhei: !0
                };
        }
        if (1 === config.category) {
            if (config.mode.detail_rule)
                text += '友人场\xB7';
        }
        else if (4 === config.category)
            text += '比赛场\xB7';
        else if (2 === config.category) {
            let S = config.meta;
            if (S) {
                let M = cfg.desktop.matchmode.get(S.mode_id);
                M && (text += M['room_name_' + GameMgr.client_language] + '\xB7');
            }
        }
        else if (100 === config.category)
            return {
                text: '新手教程',
                isSimhei: !1
            };
        else if (99 === config.category)
            return {
                text: '装扮预览',
                isSimhei: !1
            };
        else if (3 === config.category)
            text += '段位场\xB7';
        if (config.category && config.mode.detail_rule) {
            let x = config.mode.detail_rule;
            if (x.xuezhandaodi)
                text += '修罗之战';
            else if (x.chuanma)
                text += '赤羽之战';
            else if (x.dora3_mode)
                text += '宝牌狂热';
            else if (x.begin_open_mode)
                text += '配牌明牌';
            else if (x.muyu_mode)
                text += '龙之目玉';
            else if (x.jiuchao_mode)
                text += '明镜之战';
            else if (x.reveal_discard)
                text += '暗夜之战';
            else if (x.field_spell_mode)
                text += '幻境传说';
            else if (x.zhanxing)
                text += '占星之战';
            else if (x.tianming_mode)
                text += '天命之战';
            else if (x.yongchang_mode)
                text += '咏唱之战';
            else if (x.hunzhiyiji_mode)
                text += '魂之一击';
            else if (x.wanxiangxiuluo_mode)
                text += '万象修罗';
            else if (x.beishuizhizhan_mode)
                text += '背水之战';
            else if (x.amusement_switches instanceof Array && x.amusement_switches.indexOf(18) > -1)
                text += '下克上';
            else if (x._random_views || x._random_skin)
                text = '随机装扮';
            else
                text += this.room_mode_desc(config.mode.mode);
        }
        return {
            text: text,
            isSimhei: !1
        };
    };
    uiscript.UI_Win.prototype.showRecord = function (K) {
        var z = this;
        if (!view.DesktopMgr.Inst.record_show_anim)
            return this._showInfo_record(K),
                this.isDoAnimation = false,
                undefined;
        this.isDoAnimation = true,
            this.container_Activity_Point.me.visible = false,
            this.container_activity_rpg.me.visible = false,
            this.root.alpha = 0,
            this.tweenManager.addTweenTo(this.root, {
                alpha: 1
            }, 500);
        var Z = view.DesktopMgr.Inst.getPlayerName(K.seat);
        game.Tools.SetNickname(this.winner_name, Z, false, true);
        var s = view.DesktopMgr.Inst.player_datas[K.seat].character, U = new uiscript.UIRect();
        U.x = this.illust_rect.x,
            U.y = this.illust_rect.y,
            U.width = this.illust_rect.width,
            U.height = this.illust_rect.height,
            this.char_skin.setRect(U),
            this.char_skin.setSkin(view.DesktopMgr.Inst.player_datas[K.seat].avatar_id, 'full'),
            2 === K.mode ? this.img_mode.visible = false : (this.img_mode.visible = true,
                this.img_mode.skin = 0 === K.mode ? game.Tools.localUISrc('myres/mjdesktop/pg_zimo.png') : game.Tools.localUISrc('myres/mjdesktop/pg_he.png')),
            this._showPai(K),
            this.container_dora.visible = !(view.DesktopMgr.Inst.is_chuanma_mode() || is_guobiao()),
            this.container_lidora.visible = !(view.DesktopMgr.Inst.is_chuanma_mode() || is_guobiao());
        var O = K.fan_names.length, m = 100;
        this.container_fan_yiman.visible = false,
            this.container_fan_8.visible = false,
            this.container_fan_15.visible = false,
            this.container_fan_12.visible = false,
            this.container_fan_liuju.visible = false,
            this.container_fan_yiman.visible = false,
            this.container_fan_8.visible = false,
            this.container_fan_15.visible = false,
            this.container_fan_12.visible = false,
            this.container_fan_liuju.visible = false;
        var Y = null;
        Y = 2 === K.mode ? this.container_fan_liuju : K.yiman ? this.container_fan_yiman : 8 >= O ? this.container_fan_8 : 12 >= O ? this.container_fan_12 : this.container_fan_15,
            Y.visible = true;
        for (var j = 0; j < Y.numChildren; j++)
            Y.getChildAt(j).visible = false;
        for (var Q = [], j = 0; j < K.fan_names.length; j++) {
            var p = K.fan_names[j], M = 0, u = K.fan_ids[j], e = false, H = cfg.fan.fan.get(u);
            H && (e = !!H.mark),
                9999 !== u && H && (M = H.show_index);
            var r = {
                name: p,
                index: M,
                isSpecialFan: e
            };
            if (K.fan_value && K.fan_value.length > j && (r.value = K.fan_value[j]),
                10 === u)
                switch ((K.seat - view.DesktopMgr.Inst.index_ju + view.DesktopMgr.Inst.player_count) % view.DesktopMgr.Inst.player_count) {
                    case 0:
                        r.sound = 'fan_dong';
                        break;
                    case 1:
                        r.sound = 'fan_nan';
                        break;
                    case 2:
                        r.sound = 'fan_xi';
                        break;
                    case 3:
                        r.sound = 'fan_bei';
                }
            else if (11 === u)
                if (view.DesktopMgr.Inst.index_change % 4 === (K.seat - view.DesktopMgr.Inst.index_ju + view.DesktopMgr.Inst.player_count) % view.DesktopMgr.Inst.player_count)
                    switch (view.DesktopMgr.Inst.index_change % 4) {
                        case 0:
                            r.sound = 'fan_doubledong';
                            break;
                        case 1:
                            r.sound = 'fan_doublenan';
                            break;
                        case 2:
                            r.sound = 'fan_doublexi';
                            break;
                        case 3:
                            r.sound = 'fan_doublebei';
                    }
                else
                    switch (view.DesktopMgr.Inst.index_change % 4) {
                        case 0:
                            r.sound = 'fan_dong';
                            break;
                        case 1:
                            r.sound = 'fan_nan';
                            break;
                        case 2:
                            r.sound = 'fan_xi';
                            break;
                        case 3:
                            r.sound = 'fan_bei';
                    }
            else if (8061 === u)
                switch (view.DesktopMgr.Inst.index_change % 4) {
                    case 0:
                        r.sound = 'fan_dong';
                        break;
                    case 1:
                        r.sound = 'fan_nan';
                        break;
                    case 2:
                        r.sound = 'fan_xi';
                        break;
                    case 3:
                        r.sound = 'fan_bei';
                }
            else if (8062 === u)
                if (view.DesktopMgr.Inst.index_change % 4 === (K.seat - view.DesktopMgr.Inst.index_ju + view.DesktopMgr.Inst.player_count) % view.DesktopMgr.Inst.player_count)
                    switch ((K.seat - view.DesktopMgr.Inst.index_ju + view.DesktopMgr.Inst.player_count) % view.DesktopMgr.Inst.player_count) {
                        case 0:
                            r.sound = 'fan_doubledong';
                            break;
                        case 1:
                            r.sound = 'fan_doublenan';
                            break;
                        case 2:
                            r.sound = 'fan_doublexi';
                            break;
                        case 3:
                            r.sound = 'fan_doublebei';
                    }
                else
                    switch ((K.seat - view.DesktopMgr.Inst.index_ju + view.DesktopMgr.Inst.player_count) % view.DesktopMgr.Inst.player_count) {
                        case 0:
                            r.sound = 'fan_dong';
                            break;
                        case 1:
                            r.sound = 'fan_nan';
                            break;
                        case 2:
                            r.sound = 'fan_xi';
                            break;
                        case 3:
                            r.sound = 'fan_bei';
                    }
            else if (u >= 31 && 34 >= u) {
                var T = r.value;
                T > 13 && (T = 13),
                    r.sound = 0 === T ? '' : 'fan_dora' + T;
            }
            else
                9999 === u ? r.sound = 'fan_liujumanguan' : u >= 0 && (r.sound = cfg.fan.fan.get(u).sound);
            Q.push(r);
        }
        Q = Q.sort(function (B, K) {
            return B.index - K.index;
        }),
            m += 500;
        for (var I = function (B) {
            var Z = game.Tools.get_chara_audio(s, Q[B].sound);
            C.timerManager.addTimerOnce(m, function () {
                var s = Y.getChildAt(B), U = s.getChildByName('l_name');
                U.text = Q[B].name,
                    U.color = Q[B].isSpecialFan ? '#ffc74c' : '#f1eeda';
                var O = K.yiman && 'en' === GameMgr.client_language ? 290 : 242;
                if (U.width = O,
                    game.Tools.labelLocalizationSize(U, O, 0.8),
                    undefined !== Q[B].value && null !== Q[B].value) {
                    s.getChildAt(2).visible = true;
                    var m = Q[B].value, j = m.toString();
                    2 === j.length ? (s.getChildAt(3).skin = game.Tools.localUISrc('myres/mjdesktop/number/h_' + j[1] + '.png'),
                        s.getChildAt(3).visible = true,
                        s.getChildAt(4).skin = game.Tools.localUISrc('myres/mjdesktop/number/h_' + j[0] + '.png'),
                        s.getChildAt(4).visible = true) : (s.getChildAt(3).skin = game.Tools.localUISrc('myres/mjdesktop/number/h_' + j[0] + '.png'),
                        s.getChildAt(3).visible = true,
                        s.getChildAt(4).visible = false);
                }
                s.visible = true,
                    z.tweenManager.addTweenFrom(s, {
                        x: 169,
                        y: 184,
                        alpha: 0
                    }, 100, Laya.Ease.strongOut),
                    Z ? (view.AudioMgr.PlaySound(Z.path, Z.volume),
                        view.AudioMgr.PlayAudio(211, 1, 0.5)) : view.AudioMgr.PlayAudio(211, 1, 1);
            }),
                m += Z ? Z.time_length > 500 ? Z.time_length : 500 : 500;
        }, C = this, j = 0; O > j && j < Y.numChildren; j++)
            I(j);
        this.container_fan.visible = false,
            this.container_fu.visible = false,
            this.img_yiman.visible = false,
            K.fan && K.fu ? (m += 300,
                this.timerManager.addTimerOnce(m, function () {
                    view.AudioMgr.PlayAudio(208),
                        z.setFanFu(K.fan, K.fu);
                })) : K.yiman && (m += 700,
                this.timerManager.addTimerOnce(m, function () {
                    view.AudioMgr.PlayAudio(208),
                        z.img_yiman.alpha = 0,
                        z.img_yiman.visible = true,
                        z.tweenManager.addTweenTo(z.img_yiman, {
                            alpha: 1
                        }, 200);
                })),
            this.container_score.alpha = 0;
        for (var j = 0; j < this.score_imgs.length; j++)
            this.score_imgs[j].visible = false;
        if (m += 700,
            this.container_score.scaleX = this.container_score.scaleY = 2,
            this.timerManager.addTimerOnce(m, function () {
                for (var B = 0, Z = K.score; 0 !== Z;) {
                    var s = Z % 10;
                    if (Z = Math.floor(Z / 10),
                        z.score_imgs[B].skin = game.Tools.localUISrc('myres/mjdesktop/number/ww_' + s.toString() + '.png'),
                        z.score_imgs[B].visible = true,
                        B++,
                        B >= z.score_imgs.length)
                        break;
                }
                z.tweenManager.addTweenTo(z.container_score, {
                    alpha: 1,
                    scaleX: 1.2,
                    scaleY: 1.2
                }, 200, Laya.Ease.strongIn),
                    view.AudioMgr.PlayAudio(221);
            }),
            this.container_title.visible = false,
            K.title_id) {
            m += 700;
            var V = 0, g = 0, W = '';
            switch (K.title_id) {
                case mjcore.E_Dadian_Title.E_Dadian_Title_manguan:
                    W = 'gameend_manguan',
                        V = 214;
                    break;
                case mjcore.E_Dadian_Title.E_Dadian_Title_tiaoman:
                    W = 'gameend_tiaoman',
                        V = 214;
                    break;
                case mjcore.E_Dadian_Title.E_Dadian_Title_beiman:
                    W = 'gameend_beiman',
                        V = 201;
                    break;
                case mjcore.E_Dadian_Title.E_Dadian_Title_sanbeiman:
                    W = 'gameend_sanbeiman',
                        V = 201;
                    break;
                case mjcore.E_Dadian_Title.E_Dadian_Title_leijiyiman:
                    W = 'gameend_leijiyiman',
                        g = 2,
                        V = 226;
                    break;
                case mjcore.E_Dadian_Title.E_Dadian_Title_yiman:
                    W = 'gameend_yiman1',
                        g = 1,
                        V = 226;
                    break;
                case mjcore.E_Dadian_Title.E_Dadian_Title_yiman2:
                    W = 'gameend_yiman2',
                        g = 2,
                        V = 226;
                    break;
                case mjcore.E_Dadian_Title.E_Dadian_Title_yiman3:
                    W = 'gameend_yiman3',
                        g = 2,
                        V = 226;
                    break;
                case mjcore.E_Dadian_Title.E_Dadian_Title_yiman4:
                    W = 'gameend_yiman4',
                        g = 2,
                        V = 226;
                    break;
                case mjcore.E_Dadian_Title.E_Dadian_Title_yiman5:
                    W = 'gameend_yiman5',
                        g = 2,
                        V = 226;
                    break;
                case mjcore.E_Dadian_Title.E_Dadian_Title_yiman6:
                    W = 'gameend_yiman6',
                        g = 2,
                        V = 226;
            }
            var X = game.Tools.get_chara_audio(s, W);
            this.timerManager.addTimerOnce(m, function () {
                z.setTitle(K.title_id),
                    z.container_title.visible = true,
                    z.container_title.alpha = 0,
                    z.container_title.scaleX = z.container_title.scaleY = 3,
                    z.tweenManager.addTweenTo(z.container_title, {
                        alpha: 1,
                        scaleX: 1.2,
                        scaleY: 1.2
                    }, 300, Laya.Ease.strongIn),
                    z.timerManager.addTimerOnce(300, function () {
                        0 !== V && view.AudioMgr.PlayAudio(V);
                    }),
                    X && z.timerManager.addTimerOnce(500, function () {
                        view.AudioMgr.PlaySound(X.path, X.volume);
                    }),
                    0 !== g && z.timerManager.addTimerOnce(300, function () {
                        var B, K;
                        'en' === GameMgr.client_language ? (B = z.root.getChildByName('effect_yiman_en'),
                            K = 'scene/effect_yiman2.lh') : 'kr' === GameMgr.client_language ? (B = z.root.getChildByName('effect_yiman_en'),
                            K = 'scene/effect_yiman.lh') : 1 === g ? (B = z.root.getChildByName('effect_yiman'),
                            K = 'scene/effect_yiman.lh') : (B = z.root.getChildByName('effect_yiman2'),
                            K = 'scene/effect_yiman2.lh'),
                            z.effect_yiman = game.FrontEffect.Inst.create_ui_effect(B, K, new Laya.Point(0, 0), 25);
                    });
            }),
                (K.yiman || '累积役满' === K.title) && (m += 500);
        }
        if (this.muyu.visible = false,
            view.DesktopMgr.Inst.muyu_info) {
            var i = false;
            0 === K.mode ? i = true : 1 === K.mode && (view.DesktopMgr.Inst.index_player === view.DesktopMgr.Inst.muyu_info.seat && (i = true),
                K.seat === view.DesktopMgr.Inst.muyu_info.seat && (i = true)),
                i && (this.muyu.scale(1.2, 1.2),
                    m += 700,
                    this.timerManager.addTimerOnce(m, function () {
                        z.muyu.visible = true,
                            z.muyu.alpha = 0;
                        var B = (view.DesktopMgr.Inst.muyu_info.seat - view.DesktopMgr.Inst.index_ju + view.DesktopMgr.Inst.player_count) % view.DesktopMgr.Inst.player_count;
                        z.muyu.skin = game.Tools.localUISrc('myres/mjdesktop/muyu_seat' + B + '.png'),
                            z.tweenManager.addTweenTo(z.muyu, {
                                alpha: 1
                            }, 250);
                    }));
        }
        if (view.DesktopMgr.Inst.is_tianming_mode()) {
            this.muyu.visible = false;
            var i = false;
            K.tianming_bonus > 0 && (i = true),
                i && (this.muyu.scale(1, 1),
                    m += 700,
                    this.timerManager.addTimerOnce(m, function () {
                        z.muyu.visible = true,
                            z.muyu.alpha = 0,
                            z.muyu.skin = game.Tools.localUISrc('myres/mjdesktop/tianming_result_' + K.tianming_bonus + '.png'),
                            z.tweenManager.addTweenTo(z.muyu, {
                                alpha: 1
                            }, 250);
                    }));
        }
        if (this.xiakeshang.visible = !1,
            view.DesktopMgr.Inst.isTargetSpecialMode(18)) {
            var k = !1;
            K.xia_ke_shang_coefficient && (k = !0),
                k && (m += 700,
                    this.timerManager.addTimerOnce(m, function () {
                        z.xiakeshang.visible = !0,
                            z.xiakeshang.alpha = 0,
                            z.xiakeshang.skin = game.Tools.localUISrc('myres/mjdesktop/xiakeshang_result' + K.xia_ke_shang_coefficient + '.png'),
                            z.tweenManager.addTweenTo(z.xiakeshang, {
                                alpha: 1
                            }, 250);
                    }));
        }
        if (view.DesktopMgr.Inst.mode === view.EMJMode.play && K.seat === view.DesktopMgr.Inst.seat && K.mode <= 1 && uiscript.UI_Activity.activity_is_running(uiscript.UI_Activity_DuanWu_Point.activity_id)) {
            for (var S = false, j = 0; j < view.DesktopMgr.Inst.player_datas.length; j++) {
                var _ = view.DesktopMgr.Inst.player_datas[j];
                if (!_ || game.Tools.isAI(_.account_id)) {
                    S = true;
                    break;
                }
            }
            S ? this.container_Activity_Point.me.visible = false : m += this.container_Activity_Point.show(m, K.point_sum, K.score);
        }
        else
            this.container_Activity_Point.me.visible = false;
        if (view.DesktopMgr.Inst.mode === view.EMJMode.play && uiscript.UI_Activity.activity_is_running(uiscript.UI_Activity_RPG.activity_id)) {
            for (var S = false, j = 0; j < view.DesktopMgr.Inst.player_datas.length; j++) {
                var _ = view.DesktopMgr.Inst.player_datas[j];
                if (!_ || game.Tools.isAI(_.account_id)) {
                    S = true;
                    break;
                }
            }
            if (S)
                this.container_activity_rpg.me.visible = false;
            else {
                var f = 0;
                view.DesktopMgr.Inst.seat !== K.seat && (f = 0 === K.mode ? 2 : 1),
                    1 === f && 0 !== view.DesktopMgr.Inst.seat2LocalPosition(view.DesktopMgr.Inst.index_player) ? this.container_activity_rpg.me.visible = false : this.container_activity_rpg.show(f, 0);
            }
        }
        else
            this.container_activity_rpg.me.visible = false;
        this.btn_confirm.visible = false,
            m += 300,
            this.btn_confirm.disabled = true,
            this.timerManager.addTimerOnce(m, function () {
                if (z.btn_confirm.visible = true,
                    z.btn_confirm.alpha = 1,
                    z.tweenManager.addTweenFrom(z.btn_confirm, {
                        alpha: 0
                    }, 200),
                    z.btn_confirm.disabled = false,
                    view.DesktopMgr.Inst.mode === view.EMJMode.paipu || view.DesktopMgr.Inst.mode === view.EMJMode.xinshouyindao)
                    z.count_down.visible = false,
                        z.btn_confirm.getChildByName('confirm').x = 131;
                else {
                    z.count_down.visible = true,
                        z.btn_confirm.getChildByName('confirm').x = 165;
                    for (var B = function (B) {
                        z.timerManager.addTimerOnce(1000 * B, function () {
                            z.btn_confirm.disabled || (z.count_down.text = '(' + (3 - B).toString() + ')');
                        });
                    }, K = 0; 3 > K; K++)
                        B(K);
                    z.timerManager.addTimerOnce(3000, function () {
                        z.btn_confirm.disabled || z.onConfirm();
                    });
                }
            });
    };
    uiscript.UI_Win.prototype._showInfo_record = function (K) {
        this.container_Activity_Point.me.visible = false,
            this.root.alpha = 1;
        view.DesktopMgr.Inst.setNickname(this.winner_name, K.seat, '#c3e2ff', '#fbfbfb', true);
        var z = new uiscript.UIRect();
        z.x = this.illust_rect.x,
            z.y = this.illust_rect.y,
            z.width = this.illust_rect.width,
            z.height = this.illust_rect.height,
            this.char_skin.setRect(z),
            this.char_skin.setSkin(view.DesktopMgr.Inst.player_datas[K.seat].avatar_id, 'full'),
            2 === K.mode ? this.img_mode.visible = false : (this.img_mode.visible = true,
                this.img_mode.skin = 0 === K.mode ? game.Tools.localUISrc('myres/mjdesktop/pg_zimo.png') : game.Tools.localUISrc('myres/mjdesktop/pg_he.png')),
            this._showPai(K),
            this.container_dora.visible = !(view.DesktopMgr.Inst.is_chuanma_mode() || is_guobiao()),
            this.container_lidora.visible = !(view.DesktopMgr.Inst.is_chuanma_mode() || is_guobiao());
        var Z = K.fan_names.length;
        this.container_fan_yiman.visible = false,
            this.container_fan_8.visible = false,
            this.container_fan_15.visible = false,
            this.container_fan_12.visible = false,
            this.container_fan_liuju.visible = false,
            this.container_fan_yiman.visible = false,
            this.container_fan_8.visible = false,
            this.container_fan_15.visible = false,
            this.container_fan_12.visible = false,
            this.container_fan_liuju.visible = false;
        var s;
        s = 2 === K.mode ? this.container_fan_liuju : K.yiman ? this.container_fan_yiman : 8 >= Z ? this.container_fan_8 : 12 >= Z ? this.container_fan_12 : this.container_fan_15,
            s.visible = true;
        for (var U = 0; U < s.numChildren; U++)
            s.getChildAt(U).visible = false;
        for (var O = [], U = 0; U < K.fan_names.length; U++) {
            var m = K.fan_names[U], Y = K.fan_ids[U], j = 0, Q = false, p = cfg.fan.fan.get(Y);
            p && (Q = !!p.mark),
                9999 !== Y && p && (j = p.show_index);
            var M = {
                name: m,
                index: j,
                isSpecialFan: Q
            };
            K.fan_value && K.fan_value.length > U && (M.value = K.fan_value[U]),
                O.push(M);
        }
        O = O.sort(function (B, K) {
            return B.index - K.index;
        });
        for (var U = 0; Z > U && U < s.numChildren; U++) {
            var u = s.getChildAt(U), e = u.getChildByName('l_name');
            e.text = O[U].name,
                e.color = O[U].isSpecialFan ? '#ffc74c' : '#f1eeda';
            var H = K.yiman && 'en' === GameMgr.client_language ? 290 : 242;
            if (e.width = H,
                game.Tools.labelLocalizationSize(e, H, 0.8),
                undefined !== O[U].value && null !== O[U].value) {
                u.getChildAt(2).visible = true;
                var r = O[U].value, T = r.toString();
                2 === T.length ? (u.getChildAt(3).skin = game.Tools.localUISrc('myres/mjdesktop/number/h_' + T[1] + '.png'),
                    u.getChildAt(3).visible = true,
                    u.getChildAt(4).skin = game.Tools.localUISrc('myres/mjdesktop/number/h_' + T[0] + '.png'),
                    u.getChildAt(4).visible = true) : (u.getChildAt(3).skin = game.Tools.localUISrc('myres/mjdesktop/number/h_' + T[0] + '.png'),
                    u.getChildAt(3).visible = true,
                    u.getChildAt(4).visible = false);
            }
            u.visible = true;
        }
        this.container_fan.visible = false,
            this.container_fu.visible = false,
            this.img_yiman.visible = false,
            K.fan && K.fu ? this.setFanFu(K.fan, K.fu) : K.yiman && (this.img_yiman.alpha = 1,
                this.img_yiman.visible = true);
        for (var U = 0; U < this.score_imgs.length; U++)
            this.score_imgs[U].visible = false;
        for (var I = K.score.toString(), U = 0; U < I.length && !(U >= this.score_imgs.length); U++)
            this.score_imgs[U].skin = game.Tools.localUISrc('myres/mjdesktop/number/ww_' + I.charAt(I.length - 1 - U) + '.png'),
                this.score_imgs[U].visible = true;
        if (this.container_score.alpha = 1,
            this.container_score.scaleX = this.container_score.scaleY = 1.2,
            this.container_title.visible = false,
            K.title_id && (this.setTitle(K.title_id),
                this.container_title.visible = true,
                this.container_title.alpha = 1,
                this.container_title.scaleX = this.container_title.scaleY = 1.2),
            this.muyu.visible = false,
            view.DesktopMgr.Inst.muyu_info) {
            var C = false;
            if (0 === K.mode ? C = true : 1 === K.mode && (view.DesktopMgr.Inst.index_player === view.DesktopMgr.Inst.muyu_info.seat && (C = true),
                K.seat === view.DesktopMgr.Inst.muyu_info.seat && (C = true)),
                C) {
                this.muyu.visible = true,
                    this.muyu.alpha = 1;
                var V = (view.DesktopMgr.Inst.muyu_info.seat - view.DesktopMgr.Inst.index_ju + view.DesktopMgr.Inst.player_count) % view.DesktopMgr.Inst.player_count;
                this.muyu.skin = game.Tools.localUISrc('myres/mjdesktop/muyu_seat' + V + '.png');
            }
        }
        if (this.xiakeshang.visible = !1,
            view.DesktopMgr.Inst.isTargetSpecialMode(18)) {
            var r = !1;
            K.xia_ke_shang_coefficient && (r = !0),
                r && (this.xiakeshang.visible = !0,
                    this.xiakeshang.alpha = 1,
                    this.xiakeshang.skin = game.Tools.localUISrc('myres/mjdesktop/xiakeshang_result' + K.xia_ke_shang_coefficient + '.png'));
        }
        this.count_down.text = '',
            this.btn_confirm.visible = true,
            this.btn_confirm.disabled = false,
            this.btn_confirm.alpha = 1,
            this.count_down.visible = false,
            this.btn_confirm.getChildByName('confirm').x = 131;
    };
    uiscript.UI_Win.prototype.setFanFu = function (B, K) {
        const cloneImage = original => {
            const clone = new Laya.Image();
            original.parent.addChildAt(clone, 0);
            clone.pos(-138, 62);
            clone.size(original.width, original.height);
            clone.rotation = original.rotation;
            clone.scale(original.scaleX, original.scaleY);
            clone.alpha = original.alpha;
            clone.visible = original.visible;
            clone.skin = original.skin;
            return clone;
        };
        this.container_fan.visible = this.container_fu.visible = true,
            this.container_fan.alpha = this.container_fu.alpha = 0;
        if (this.fan_imgs.length < 3)
            this.fan_imgs[2] = cloneImage(this.fan_imgs[1]);
        for (var z = 0; 3 > z; z++)
            if (0 === B)
                this.fan_imgs[z].visible = false;
            else {
                var Z = B % 10;
                B = Math.floor(B / 10),
                    this.fan_imgs[z].visible = true,
                    this.fan_imgs[z].skin = game.Tools.localUISrc('myres/mjdesktop/number/h_' + Z.toString() + '.png');
            }
        this.container_fu.visible = !(view.DesktopMgr.Inst.is_chuanma_mode() || is_guobiao());
        for (var z = 0; 3 > z; z++)
            if (0 === K)
                this.fu_imgs[z].visible = false;
            else {
                var Z = K % 10;
                K = Math.floor(K / 10),
                    this.fu_imgs[z].visible = true,
                    this.fu_imgs[z].skin = game.Tools.localUISrc('myres/mjdesktop/number/ww_' + Z.toString() + '.png');
            }
        this.tweenManager.addTweenTo(this.container_fan, {
            alpha: 1
        }, 200),
            this.tweenManager.addTweenTo(this.container_fu, {
                alpha: 1
            }, 200);
    };
    view.ViewPlayer_Other.prototype._RecordRemoveHandPai = function (P, T, n) {
        void 0 === n && (n = !0);
        let S, M, A, o;
        n ? (S = 0,
            M = this.hand.length - 1,
            A = 1) : (S = this.hand.length - 1,
            M = 0,
            A = -1),
            view.DesktopMgr.Inst.is_peipai_open_mode() && (T = -1);
        let F = -1;
        if (-1 === T || 1 === T)
            for (o = S; o !== M + A; o += A)
                if (this.hand[o].is_open && mjcore.MJPai.isSame(P, this.hand[o].val)) {
                    F = o;
                    break;
                }
        if (-1 === F && (-1 === T || 0 === T))
            for (o = S; o !== M + A; o += A)
                if (!this.hand[o].is_open && mjcore.MJPai.isSame(P, this.hand[o].val)) {
                    F = o;
                    break;
                }
        if (is_heqie_mode() && this.hand.length > 0)
            if (this.seat === protected_tiles.seat) {
                for (let i = 0; i < this.hand.length; i++)
                    if (this.hand[i].val.toString() !== protected_tiles.tiles[i]) {
                        F = i;
                        break;
                    }
            }
            else
                F = this.hand.length - 1;
        if (-1 !== F) {
            this.hand[F].Destory();
            for (o = F; o < this.hand.length - 1; o++)
                this.hand[o] = this.hand[o + 1];
            this.hand.pop();
        }
    };
    view.ViewPlayer_Me.prototype._RemoveHandPai = function (r, P, T) {
        void 0 === T && (T = !0);
        view.DesktopMgr.Inst.is_peipai_open_mode() && (T = -1);
        let S, n = -1;
        if (-1 === P || 1 === P)
            if (T) {
                for (S = this.hand.length - 1; S >= 0; S--)
                    if (mjcore.MJPai.isSame(r, this.hand[S].val) && this.hand[S].is_open) {
                        n = S;
                        break;
                    }
            }
            else
                for (S = 0; S < this.hand.length; S++)
                    if (mjcore.MJPai.isSame(r, this.hand[S].val) && this.hand[S].is_open) {
                        n = S;
                        break;
                    }
        if (-1 === n && (-1 === P || 0 === P))
            if (T) {
                for (S = this.hand.length - 1; S >= 0; S--)
                    if (mjcore.MJPai.isSame(r, this.hand[S].val) && !this.hand[S].is_open) {
                        n = S;
                        break;
                    }
            }
            else
                for (S = 0; S < this.hand.length; S++)
                    if (mjcore.MJPai.isSame(r, this.hand[S].val) && !this.hand[S].is_open) {
                        n = S;
                        break;
                    }
        if (is_heqie_mode() && this.hand.length > 0)
            if (this.seat === protected_tiles.seat) {
                for (let i = 0; i < this.hand.length; i++)
                    if (this.hand[i].val.toString() !== protected_tiles.tiles[i]) {
                        n = i;
                        break;
                    }
            }
            else
                n = this.hand.length - 1;
        if (-1 !== n) {
            let M = this.hand[n];
            for (let A = n; A < this.hand.length - 1; A++)
                this.hand[A] = this.hand[A + 1], this.hand[A].SetIndex(A, !1, !0);
            return this.hand.pop(),
                this._OnRemovePai(M),
                M.Reset(),
                this.handpool.push(M),
                !0;
        }
        return !1;
    };
};
