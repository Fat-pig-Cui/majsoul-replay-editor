/**
 * @file: main.js - main script of Majsoul Replay Editor
 * @author: GrandDawn, Fat-pig-Cui
 * @email: chubbypig@qq.com
 * @github: https://github.com/Fat-pig-Cui/majsoul-replay-editor
 */
'use strict';

// 除了常量, 全局变量的初始化全在 clearProject, gameBegin, roundBegin, init 函数中

/**
 * 玩家的个人信息, 有效长度为玩家数, 不超过4
 * - nickname: 昵称
 * - avatar_id: 头像, 也修改了皮肤
 * - title: 称号
 * - avatar_frame: 头像框
 * - verified: 认证表示, 0: 无认证, 1: 主播(猫爪)认证, 2: 职业(P标)认证
 * - views: 装扮槽数组
 *      - slot: 槽的位置 (更多可以通过 game.EView 查看)
 *          - 0: 立直棒
 *          - 1: 和牌特效
 *          - 2: 立直特效
 *          - 3: 手的样式
 *          - 5: 头像框(要在上面 avatar_frame 修改, 这里修改无效)
 *          - 6: 桌布
 *          - 7: 牌背
 *          - 13: 牌面
 *      - id: 装扮的id
 * @type {{nickname: string, avatar_id: number, [title]: number, [avatar_frame]: number, [verified]: number, [views]: {slot: number, item_id: number}[]}[]}
 */
let player_datas;
/**
 * 玩家的起手, 有效长度为玩家数, 不超过4
 * @type {string[]}
 */
let begin_tiles;

// 初始化必要变量
const clearProject = () => {
    if (view.DesktopMgr.Inst && view.DesktopMgr.Inst.active)
        throw new Error('clearProject: 请退出当前牌谱后再载入自制牌谱');

    game_begin_once = true;
    player_datas = [
        {nickname: '电脑0', avatar_id: 400101, title: 600001, avatar_frame: 0, verified: 0, views: []},
        {nickname: '电脑1', avatar_id: 400101, title: 600001, avatar_frame: 0, verified: 0, views: []},
        {nickname: '电脑2', avatar_id: 400101, title: 600001, avatar_frame: 0, verified: 0, views: []},
        {nickname: '电脑3', avatar_id: 400101, title: 600001, avatar_frame: 0, verified: 0, views: []},
    ];
    config = {
        category: 1,
        meta: {mode_id: 0},
        mode: {
            mode: 1,
            detail_rule: {}
        }
    };
    begin_tiles = ['', '', '', ''];
    muyu_seats = '';
    paishan = [];
    chang = ju = ben = liqibang = lianzhuang_cnt = 0;
    player_tiles = [[], [], [], []];
    discard_tiles = [[], [], [], []];
    deal_tiles = [[], [], [], []];
    all_data = {
        actions: [],
        xun: [],
        players: players,
        config: config,
        player_datas: player_datas,
    };
};

/**
 * 设置对局的模式
 * - category: 模式大类, 1: 友人场, 2: 匹配场, 4: 比赛场, 100: 新手教程
 * - meta
 *      - mode_id: 匹配场的房间, 只有在 category 为 2 时才有效, 详见 字典.md
 *      - room_id: 友人场的房间号, 只有在 category 为 1 时才有效
 * - mode
 *      - mode: 玩家数和场次局数
 *          - 个位 0, 1, 2, 3 分别表示 一局战, 东风战, 半庄战, 人机战, 4 和 0 一样
 *          - 十位 0, 1 分别表示四麻, 三麻, 2 的话就是二人麻将
 *      - detail_rule: 详细规则, 很多详细配置都在这里, 下面仅列举部分, 更多详见 1_编辑游戏信息.md
 *          - init_point: 各玩家初始点数, 默认根据玩家数和模式自动选择
 *          - dora_count: 红宝牌数量, 默认为段位场规则
 *          - chuanma: 是否是赤羽之战模式, 默认否
 *          - _qieshangmanguan: 是否切上满贯, 默认否
 *          - _guobiao: 是否为国标模式, 默认否
 * @param {{category: number, meta: {[mode_id]: number, [room_id]: number}, mode: {mode: number, detail_rule: {}}}} c
 */
const setConfig = c => {
    config = c;
};

/**
 * 设置玩家的切牌集合
 * @param {string[]} dc_tls - 切牌集合, 有效长度为玩家数, 不超过4
 */
const setDiscardTiles = dc_tls => {
    for (let i in dc_tls)
        discard_tiles[i] = separate(dc_tls[i]);
};

/**
 * 设置玩家的摸牌集合
 * @param {string[]} dl_tls - 摸牌集合, 有效长度为玩家数, 不超过4
 */
const setDealTiles = dl_tls => {
    for (let i in dl_tls)
        deal_tiles[i] = separate(dl_tls[i]);
};

/**
 * 手动设置牌山(参数不含起手)
 * @param {string} ps - 不含起手的完整牌山字符串
 */
const setPaishan = ps => {
    paishan = separate(ps);
};

/**
 * 随机牌山函数, 最后会将随机牌山赋给全局变量 paishan, paishan.join('') 就是牌谱界面显示的牌山字符串代码
 * @example
 * // 以四个三索开头, 东风为第一张岭上牌的牌山, 可以简写, 中间的空格不影响
 * randomPaishan('33s3s 3s', '1z')
 * @param {string} [ps_head] - 牌山开头
 * @param {string} [ps_back] - 牌山结尾
 */
let randomPaishan = (ps_head = '', ps_back = '') => {
    if (all_data.actions.length === 0)
        gameBegin();

    let tiles = [separate(begin_tiles[0]), separate(begin_tiles[1]), separate(begin_tiles[2]), separate(begin_tiles[3])];
    let para_tiles = [separate(ps_head), separate(ps_back)];

    // 检查手牌数量是否合规
    for (let i = 0; i < player_cnt; i++) {
        let tiles_len = tiles[i].length;
        if (i === ju) {
            if (tiles_len > Qin_tiles_num)
                console.warn(roundInfo() + `tiles${i} 作为亲家牌数量超过正常值: ${tiles_len}`);
            else if (tiles_len < Qin_tiles_num)
                console.log(roundInfo() + `tiles${i} 作为亲家牌数量不够: ${tiles_len}, 自动补全至${Qin_tiles_num}张`);
        } else {
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

    if (player_cnt === 2) { // 二麻
        for (let i = C1p + 1; i <= C9p - 1; i++)
            cnt[i] = 0;
        for (let i = C1s + 1; i <= C9s - 1; i++)
            cnt[i] = 0;
        cnt[C5m] = 4 - aka_cnt;
        cnt[C0m] = aka_cnt;
    } else if (player_cnt === 3) { // 三麻
        for (let i = C1m + 1; i <= C9m - 1; i++)
            cnt[i] = 0;
        cnt[C5p] = cnt[C5s] = 4 - Math.floor(aka_cnt / 2);
        cnt[C0p] = cnt[C0s] = Math.floor(aka_cnt / 2);
    } else { // 四麻
        if (aka_cnt === 4) {
            cnt[C5m] = cnt[C5s] = 3;
            cnt[C5p] = cnt[C0p] = 2;
            cnt[C0m] = cnt[C0s] = 1;
        } else {
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
        // 用 Huapai 当做国标的花牌
        if (is_guobiao_huapai() && typeof editFunction == 'function')
            cnt[tile2Int(Huapai, true)] = 8;
    }

    // 明镜之战
    let cnt2 = [];
    cnt2[Cbd] = 0;
    for (let i = C1m; i <= C7z; i++)
        cnt2[i] = 3;
    if (is_mingjing()) {
        for (let i = C1m; i <= C7z; i++)
            cnt[i] = 1;
        cnt[C0m] = cnt[C0p] = cnt[C0s] = 0;
    }

    // 万象修罗
    if (is_wanxiangxiuluo())
        cnt[Cbd] = 4;

    // 减去玩家起手
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

    // 减去两个参数的牌
    let sp_type = ['Y', 'D', 'T', 'H', 'M', 'P', 'S', '.'];
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
    // 补全玩家起手
    for (let i = 0; i < player_cnt; i++) {
        while (tiles[i].length < Xian_tiles_num)
            tiles[i].push(remain_tiles.pop());
        if (i === ju && tiles[i].length < Qin_tiles_num)
            tiles[i].push(remain_tiles.pop());
    }

    // 回写
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
                let index = remain_tiles.findIndex(tile => judgeTile(tile, tls[i][0]));
                tls[i] = index > -1 ? remain_tiles.splice(index, 1)[0] : remain_tiles.pop();
            }
        for (let i in tls)
            if (tls[i][0] === 'Y' || tls[i][0] === 'D' || tls[i][0] === 'M' || tls[i][0] === 'P' || tls[i][0] === 'S') {
                let index = remain_tiles.findIndex(tile => judgeTile(tile, tls[i][0]));
                tls[i] = index > -1 ? remain_tiles.splice(index, 1)[0] : remain_tiles.pop();
            }
        for (let i in tls)
            if (tls[i][0] === '.')
                tls[i] = remain_tiles.pop();
    }
};

// 开局, 数据初始化
const roundBegin = () => {
    if (all_data.actions.length === 0)
        gameBegin();

    init();

    if (is_dora3() || is_muyu())
        dora_cnt.cnt = dora_cnt.licnt = 3;

    // 剩余牌数量
    let left_cnt = getLeftTileCnt();

    let opens = [];
    if (is_begin_open() || is_openhand())
        for (let seat = 0; seat < player_cnt; seat++) {
            let ret = {seat: seat, tiles: [], count: []};
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
            opens.push(ret);
        }

    if (is_muyu())
        updateMuyu(true);

    paishan = paishan.slice(0, 136);
    // 添加起手进牌山
    let qishou_len = 0, is_sha256 = false, has_intergrity = true;
    let qishou_tiles = [], random_tiles = [[], [], [], []];
    for (let i = 0; i < player_cnt; i++) {
        if (i === ju) {
            if (player_tiles[i].length !== Qin_tiles_num)
                has_intergrity = false;
        } else if (player_tiles[i].length !== Xian_tiles_num)
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

// ========================================================================

/**
 * 摸牌, 参数顺序可以不一致
 * @param {number} [seat] - 摸牌的玩家, 没有此参数时按照正常对局流程
 * @param {string} [tile] - 摸的牌, 没有此参数时将根据 deal_tiles 或牌山确定
 * @param {number[]} [index] - 占星之战: 牌候选池中选择的牌位置, 后面会变为 number 类型
 */
let mopai = (seat, tile, index) => {
    // 参数预处理
    function preprocess() {
        let x = {}, tmp = [seat, tile, index];
        for (let i in tmp)
            if (typeof tmp[i] == 'string')
                x.tile = tmp[i];
            else if (typeof tmp[i] == 'number')
                x.seat = tmp[i];
            else if (tmp[i] instanceof Array && typeof tmp[i][0] == 'number')
                x.index = tmp[i][0];
        return [x.seat, x.tile, x.index];
    }

    let zhanxing_index;
    let liqi = null;
    let hunzhiyiji_data = null;

    [seat, tile, zhanxing_index] = preprocess();

    lstActionCompletion();

    if (seat === undefined) {
        let lst_name = getLstAction().name, lst_seat = getLstAction().data.seat;
        // 自家鸣牌, 摸牌家仍然是上个操作的玩家
        if (lst_name === 'RecordChiPengGang' || lst_name === 'RecordBaBei' || lst_name === 'RecordAnGangAddGang')
            seat = lst_seat;
        // 广义切牌, 摸牌家是上个操作玩家的下一家
        if (lst_name === 'RecordDiscardTile' || lst_name === 'RecordLockTile')
            seat = is_hunzhiyiji() && hunzhiyiji_info[lst_seat].liqi && !hunzhiyiji_info[lst_seat].overload ? lst_seat : (lst_seat + 1) % player_cnt;

        // 血战到底和牌, 摸牌家为最后和牌家的下一家
        if (lst_name === 'RecordHuleXueZhanMid') {
            if (getLstAction(2).name === 'RecordAnGangAddGang') {
                if (is_chuanma()) // 川麻枪杠, 摸牌家为被枪杠家的下一家
                    seat = (getLstAction(2).data.seat + 1) % player_cnt;
                else // 修罗则为被枪杠家继续岭上摸牌
                    seat = getLstAction(2).data.seat;
            } else {
                let lst_index = getLstAction().data.hules.length - 1;
                seat = (getLstAction().data.hules[lst_index].seat + 1) % player_cnt;
            }
        }
        // 血流成河或国标错和, 摸牌家为和牌之前最后操作玩家的下一家
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

    // 是否明牌
    let tile_state = is_openhand() || liqi_info[seat].kai;

    // 占星之战, 填充牌候选池供 seat 号玩家选择
    if (is_zhanxing()) {
        if (zhanxing_index === undefined)
            zhanxing_index = 0;
        if (draw_type === 0)
            awaiting_tiles.push(paishan.pop());
        while (awaiting_tiles.length < 3 && paishan.length > 14)
            awaiting_tiles.push(paishan.shift());

        addFillAwaitingTiles(seat, liqi);
    }

    // 魂之一击, 摸牌家 seat 没过载, 则减少次数
    if (is_hunzhiyiji() && hunzhiyiji_info[seat].liqi && !hunzhiyiji_info[seat].overload) {
        if (hunzhiyiji_info[seat].continue_deal_count > 0)
            hunzhiyiji_info[seat].continue_deal_count--;
        hunzhiyiji_data = JSON.parse(JSON.stringify(hunzhiyiji_info[seat]));
    }

    // 实际摸的牌
    let draw_card = paishan[0];
    if (tile !== undefined)
        draw_card = tile;
    else if (is_zhanxing())
        draw_card = awaiting_tiles.splice(zhanxing_index, 1)[0];
    else if (draw_type === 0)
        draw_card = paishan[paishan.length - 1];

    player_tiles[seat].push(draw_card);

    if (!is_zhanxing())
        draw_type === 1 ? paishan.shift() : paishan.pop();
    lst_draw_type = draw_type;
    draw_type = 1;

    addDealTile(seat, draw_card, liqi, tile_state, zhanxing_index, hunzhiyiji_data);

    // 完成上个操作的后续
    function lstActionCompletion() {
        let lst_name = getLstAction().name, lst_seat = getLstAction().data.seat;
        // 开杠翻指示牌
        if (dora_cnt.lastype === 2) {
            dora_cnt.cnt += 1 + dora_cnt.bonus;
            dora_cnt.licnt += 1 + dora_cnt.bonus;
            dora_cnt.bonus = dora_cnt.lastype = 0;
        }

        // pass掉自家鸣牌, 则破一发
        for (let i = 0; i < player_cnt; i++)
            if (liqi_info[i].yifa === -1)
                liqi_info[i].yifa = 0;

        // pass掉上个操作的牌的, pre同巡振听和pre立直振听 转 真实振听
        for (let i = 0; i < player_cnt; i++) {
            if (pretongxunzt[i])
                tongxunzt[i] = true;
            if (prelizhizt[i])
                lizhizt[i] = true;
        }

        // 龙之目玉: 更新目玉数据
        if (is_muyu() && muyu.count === 0)
            updateMuyu(true);

        // 川麻: 刮风下雨结算点数
        if (is_chuanma())
            calcGangPoint();

        // 暗夜之战: 暗牌无人开
        if (is_anye() && lst_name === 'RecordRevealTile')
            addLockTile(lst_seat, 2);

        // 魂之一击: 已过载的玩家, push 一次过载数据
        if (is_hunzhiyiji()) {
            let count = hunzhiyiji_info[lst_seat].continue_deal_count;
            if (lst_name !== 'RecordAnGangAddGang')
                if (hunzhiyiji_info[lst_seat].liqi && count === 0 && !hunzhiyiji_info[lst_seat].overload) {
                    hunzhiyiji_info[lst_seat].overload = true;
                    hunzhiyiji_data = JSON.parse(JSON.stringify(hunzhiyiji_info[lst_seat]));
                }
        }

        // 立直成功
        liqi = lstLiqi2Liqi(true);
    }
};

/**
 * 切牌, 参数顺序可以不一致
 * @param {number} [seat] - 切牌的玩家, 没有此参数时按照正常对局流程
 * @param {string} [tile] - 切的牌, 没有此参数时将根据 discard_tiles 确定或摸切
 * @param {boolean|'kailiqi'} [is_liqi] - 是否立直, 默认不立直, 若为 'kailiqi', 则为开立直
 * @param {string} [f_moqie] - 何切模式: 值为 'moqie' 表示强制显示摸切, 值为 'shouqie' 或其他情况则强制显示手切
 * @param {'anpai'} [anpai] - 暗夜之战: 当值为字符串 'anpai' 时, 表示暗牌, 默认不暗牌
 * @param {number[]} [bs_type] - 背水之战: 立直类型, 有效值为 '[0]', '[1]', '[2]', 默认为普通立直, 需要配合 is_liqi 使用
 */
let qiepai = (seat, tile, is_liqi, f_moqie, anpai, bs_type) => {
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

    // 暗夜之战: 暗牌支付1000点
    if (is_anye() && anpai === 'anpai') {
        scores[seat] -= 1000;
        liqibang++;
    }

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
            throw new Error(roundInfo() + ` qiepai: seat: ${seat} 手牌不存在要切的牌: ${tile}`);
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

/**
 * 他家鸣牌(吃/碰/明杠), 参数顺序可以不一致
 * @param {number} [seat] - 鸣牌的玩家, 没有此参数时按照能否可以 明杠/碰/吃 确定鸣牌玩家
 * @param {string|string[]} [tiles] - 鸣牌家从手里拿出来的牌, 没有此参数时将根据能否可以 明杠/碰/吃 确定鸣牌类型
 * @param {boolean} [jifei] - 川麻: 开杠刮风下雨是否击飞, 默认不击飞
 */
let mingpai = (seat, tiles, jifei) => {
    // 参数预处理
    function preprocess() {
        let x = {}, tmp = [seat, tiles, jifei];
        for (let i in tmp)
            if (typeof tmp[i] == 'number')
                x.seat = tmp[i];
            else if (typeof tmp[i] == 'boolean')
                x.jifei = tmp[i];
            else if (tmp[i] instanceof Array || typeof tmp[i] == 'string')
                x.tiles = separate(tmp[i]);
        return [x.seat, x.tiles, x.jifei];
    }

    [seat, tiles, jifei] = preprocess();

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
        // 明杠
        if (trying([tile, tile, tile], seat))
            return;
        // 碰
        if (trying([tile, tile], seat))
            return;
        // 吃
        if (player_cnt === 4 && !is_chuanma()) {
            seat = (from + 1) % player_cnt;
            if (tile[1] !== 'z' && tile[0] !== '1' && tile[0] !== '2') // 吃上端
                if (trying([int2Tile(tile2Int(tile) - 2), int2Tile(tile2Int(tile) - 1)], seat))
                    return;
            if (tile[1] !== 'z' && tile[0] !== '1' && tile[0] !== '9') // 吃中间
                if (trying([int2Tile(tile2Int(tile) - 1), int2Tile(tile2Int(tile) + 1)], seat))
                    return;
            if (tile[1] !== 'z' && tile[0] !== '8' && tile[0] !== '9') // 吃下端
                if (trying([int2Tile(tile2Int(tile) + 1), int2Tile(tile2Int(tile) + 2)], seat))
                    return;
        }

        throw new Error(roundInfo() + ` mingpai: seat: ${from} 的切牌: ${tile} 没有玩家能 mingpai`);
    }
    if (tiles.length <= 1)
        throw new Error(roundInfo() + ` mingpai: seat: ${from} 的切牌: ${tile} 后的 mingpai tiles 参数不对: ${tiles}`);

    // 鸣出去的牌是否为明牌
    let tile_states = [];
    if (is_begin_open())
        for (let i in tiles)
            tile_states.push(eraseMingpai(seat, tiles[i]));

    let type, froms, split_tiles;
    if (!isEqualTile(tiles[0], tile)) { // 吃
        type = 0;
        froms = [seat, seat, from];
        split_tiles = [tiles[0], tiles[1], tile];
    } else if (tiles.length === 2) { // 碰
        type = 1;
        froms = [seat, seat, from];
        split_tiles = [tiles[0], tiles[1], tile];

        // 幻境传说: 庄家卡4
        if (get_field_spell_mode1() === 4 && seat === ju)
            dora_cnt.lastype = is_dora_jifan() ? 2 : 1;
    } else if (tiles.length === 3) { // 大明杠
        type = 2;
        froms = [seat, seat, seat, from];
        split_tiles = [tiles[0], tiles[1], tiles[2], tile];

        // 幻境传说: 庄家卡4
        if (get_field_spell_mode1() === 4 && seat === ju)
            dora_cnt.bonus = 1;
        dora_cnt.lastype = is_dora_jifan() ? 2 : 1;

        if (is_chuanma())
            chuanma_gangs.notover.push({from: from, to: seat, val: 2000});
        else {
            if (!is_guobiao()) {
                let gang_num = 0; // 查是否四杠子确定, 用于包牌
                for (let j in fulu[seat])
                    if (fulu[seat][j].type === 2 || fulu[seat][j].type === 3) // 查杠子个数
                        gang_num++;
                if (gang_num === 3) // 之前已经有3个杠子, 则第4个杠构成四杠子包牌
                    sigang_bao[seat] = true;

                if (is_baogang()) // 包杠
                    baogang_seat = from;
            }
            draw_type = 0;
        }
    }
    // 副露信息 push 到 fulu
    fulu[seat].push({type: type, tile: split_tiles.slice(), from: from});

    // 从 player_tiles 中移除鸣出去的牌
    for (let i in tiles)
        player_tiles[seat].splice(player_tiles[seat].indexOf(tiles[i]), 1);

    // 幻境传说: 命运卡4
    if (get_field_spell_mode3() === 4) {
        scores[seat] -= 500;
        scores[from] += 500;
    }
    // 幻境传说: 命运卡5
    if (get_field_spell_mode3() === 5 && isDora(tile)) {
        scores[seat] -= 2000;
        liqibang += 2;
    }

    addChiPengGang(seat, split_tiles, froms, type, liqi, tile_states);

    // 川麻开杠击飞
    if (jifei)
        roundEnd();

    // 完成上个操作的后续
    function lstActionCompletion() {
        // pass掉上个操作的牌的, pre同巡振听和pre立直振听 转 真实振听
        for (let i = 0; i < player_cnt; i++) {
            if (pretongxunzt[i])
                tongxunzt[i] = true;
            if (prelizhizt[i])
                lizhizt[i] = true;
        }

        // 破流满
        paihe[from].liujumanguan = false;

        // 龙之目玉: 更新目玉信息
        if (is_muyu() && muyu.count === 0)
            updateMuyu(true);

        // 咏唱之战: 移除最后的切牌
        if (is_yongchang()) {
            shoumoqie[from].pop();
            updateShoumoqie(from);
        }

        // 魂之一击: 破一发
        if (is_hunzhiyiji() && hunzhiyiji_info[from].liqi)
            hunzhiyiji_info[from].overload = true;

        // 立直成功
        liqi = lstLiqi2Liqi();

        for (let i = 0; i < player_cnt; i++)
            liqi_info[i].yifa = 0;
    }

    /**
     * 判断玩家能否鸣 x 牌对应的一个组合
     * @param {string[]} x - 牌型, 组合之一
     * @param {number} seat - 鸣牌的玩家, 可能为 undefined
     * @returns {boolean}
     */
    function trying(x, seat) {
        let x0 = allEqualTiles(x[0]).reverse(), x1 = allEqualTiles(x[1]).reverse(), x2 = [];
        if (x.length === 3) // 大明杠
            x2 = allEqualTiles(x[2]).reverse();
        for (let i in x0)
            for (let j in x1) {
                let try_tiles = [x0[i], x1[j]];
                if (x.length === 3) // 大明杠
                    for (let k in x2) {
                        try_tiles[2] = x2[k];
                        if (tryMingpai(try_tiles))
                            return true;
                    }
                else if (tryMingpai(try_tiles))
                    return true;
            }
        return false;

        /**
         * 判断 x 牌对应的某个组合 try_tiles 能否有玩家能鸣
         * @param {string[]} try_tiles - 牌型, 组合之一
         * @returns {boolean}
         */
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

/**
 * 自家鸣牌(暗杠/加杠/拔北), 参数顺序可以不一致
 * @param {number} [seat] - 鸣牌的玩家, 没有此参数时按照正常对局流程
 * @param {string} [tile] - 要鸣的牌, 没有此参数时按照是否可以"拔北, 暗杠, 加杠"的顺序判断
 * @param {string} [type] - 操作类型, 暗杠/加杠/拔北分别为 'angang'/'jiagang'/'babei', 没有此参数时按照是否可以"拔北, 暗杠, 加杠"的顺序判断
 * @param {boolean} [jifei] - 川麻: 开杠刮风下雨是否击飞, 默认不击飞
 */
let zimingpai = (seat, tile, type, jifei) => {
    // 参数预处理
    function preprocess() {
        let x = {}, tmp = [seat, tile, type, jifei];
        for (let i in tmp)
            if (tmp[i] === 'babei' || tmp[i] === 'angang' || tmp[i] === 'jiagang' || tmp[i] === 'baxi')
                x.type = tmp[i];
            else if (typeof tmp[i] == 'number')
                x.seat = tmp[i];
            else if (typeof tmp[i] == 'boolean')
                x.jifei = tmp[i];
            else if (typeof tmp[i] == 'string')
                x.tile = tmp[i];
        return [x.seat, x.tile, x.type, x.jifei];
    }

    [seat, tile, type, jifei] = preprocess();

    if (seat === undefined) {
        seat = getLstAction().data.seat;
        if (seat === undefined)
            throw new Error(roundInfo() + ` zimingpai: 无法判断谁 zimingpai, getLstAction().name: ${getLstAction().name}`)
    }
    if (jifei === undefined)
        jifei = false;
    if (tile === undefined) {
        if (trying())
            return;
        throw new Error(roundInfo() + ` zimingpai: seat: ${seat}, xun: ${xun[seat].length}: 玩家无法 zimingpai (没给 tile 情况下)`);
    }

    // 上个操作补完: 开杠翻指示牌
    if (dora_cnt.lastype === 1) {
        dora_cnt.cnt += 1 + dora_cnt.bonus;
        dora_cnt.licnt += 1 + dora_cnt.bonus;
        dora_cnt.bonus = dora_cnt.lastype = 0;
    }

    // 和 tile 等效牌的个数
    let tile_cnt = 0;
    for (let i in player_tiles[seat])
        if (isEqualTile(tile, player_tiles[seat][i]))
            tile_cnt++;

    // 拔北
    let is_babei = tile_cnt >= 1 && (player_cnt === 3 || player_cnt === 2) && isEqualTile(tile, '4z') && (!type || type === 'babei');
    // 拔西, 并入拔北
    is_babei = is_babei || tile_cnt >= 1 && player_cnt === 2 && isEqualTile(tile, '3z') && (!type || type === 'baxi');
    // 国标补花'拔花', 需要载入 add_function.js
    is_babei = is_babei || is_guobiao() && tile === Huapai && type === 'babei' && typeof editFunction == 'function';
    // 强制拔北, 需要载入 add_function.js
    is_babei = is_babei || tile_cnt >= 1 && type === 'babei' && typeof editFunction == 'function';

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

    // 自家鸣牌会使得所有玩家的一发进入特殊状态, 若pass掉则一发立即消失
    for (let i = 0; i < player_cnt; i++)
        if (liqi_info[i].yifa > 0)
            liqi_info[i].yifa = -1;
    updatePrezhenting(seat, tile, is_angang);

    // 鸣出去的牌明牌状态
    let tile_states = [];

    if (!is_chuanma())
        draw_type = 0;

    // 拔北
    if (is_babei) {
        if (is_begin_open())
            tile_states.push(eraseMingpai(seat, tile));
        fulu[seat].push({type: 4, tile: [tile]});
        player_tiles[seat].splice(player_tiles[seat].lastIndexOf(tile), 1);
        player_tiles[seat].sort(cmp);

        addBaBei(seat, tile, tile_states);

    } else if (is_angang || is_jiagang) {
        let ming_type = is_angang ? 3 : 2;
        // 幻境传说: 庄家卡4
        if (get_field_spell_mode1() === 4 && seat === ju)
            dora_cnt.bonus = 1;

        dora_cnt.lastype = is_angang || is_jiagang && is_dora_jifan() ? 2 : 1;

        if (is_angang) {
            let tmp_fulu = {type: 3, tile: []};
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
            tmp_fulu.tile = [tmp_fulu.tile[0], tmp_fulu.tile[2], tmp_fulu.tile[3], tmp_fulu.tile[1]]; // 让红宝牌显露
            fulu[seat].push(tmp_fulu);

            if (is_chuanma())
                for (let i = 0; i < player_cnt; i++) {
                    if (i === seat || huled[i])
                        continue;
                    chuanma_gangs.notover.push({from: i, to: seat, val: 2000});
                }
        } else {
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

            // 本来应该是 player_tiles[seat].length - 1, 但因上面 splice 长度减1, 这里就加1
            if (is_chuanma() && index === player_tiles[seat].length)
                for (let i = 0; i < player_cnt; i++) {
                    if (i === seat || huled[i])
                        continue;
                    chuanma_gangs.notover.push({from: i, to: seat, val: 1000});
                }
        }
        player_tiles[seat].sort(cmp);

        addAnGangAddGang(seat, tile, ming_type, tile_states);

        if (jifei)
            roundEnd();
    } else
        throw new Error(roundInfo() + ` zimingpai: seat: ${seat}, xun: ${xun[seat].length}: 玩家无法 zimingpai (给定 tile: ${tile} 情况下)`);

    /**
     * seat 号玩家尝试自家鸣牌, 按照顺序: 国标补花, 拔北, 拔西, 暗杠, 加杠
     * @returns {boolean}
     */
    function trying() {
        // 国标补花
        if (is_guobiao() && typeof editFunction == 'function' && inTiles(Huapai, player_tiles[seat])) {
            zimingpai(seat, Huapai, 'babei');
            return true;
        }
        let all_tiles;
        // 拔北
        if (player_cnt === 2 || player_cnt === 3) {
            all_tiles = allEqualTiles('4z').reverse();
            for (let i in all_tiles)
                if (inTiles(all_tiles[i], player_tiles[seat])) {
                    zimingpai(seat, all_tiles[i], 'babei');
                    return true;
                }
        }
        // 拔西
        if (player_cnt === 2 && typeof editFunction == 'function') {
            all_tiles = allEqualTiles('3z').reverse();
            for (let i in all_tiles)
                if (inTiles(all_tiles[i], player_tiles[seat])) {
                    zimingpai(seat, all_tiles[i], 'babei')
                    return true;
                }
        }
        // 暗杠
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
        // 加杠
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

/**
 * 和牌, 参数顺序可以不一致
 * @param {number|number[]} [all_seats] - 本次和牌所有和牌的玩家, 没有此参数时按照正常对局流程
 * @param {boolean} [type] - 修罗/川麻: 是否为最终和牌, 默认为中途和牌
 */
let hupai = (all_seats, type) => {
    // 参数预处理
    function preprocess() {
        let x = {}, tmp = [all_seats, type];
        for (let i in tmp)
            if (typeof tmp[i] == 'number')
                x.all_seats = [tmp[i]];
            else if (tmp[i] instanceof Array)
                x.all_seats = tmp[i];
            else if (typeof tmp[i] == 'boolean')
                x.type = tmp[i];
        return [x.all_seats, x.type];
    }

    // 川麻枪杠, 则杠不收取点数
    if (is_chuanma())
        chuanma_gangs.notover = [];

    [all_seats, type] = preprocess();

    if (type === undefined)
        type = false;
    if (all_seats === undefined || all_seats.length === 0) {
        let lst_name = getLstAction().name, lst_seat = getLstAction().data.seat;
        if (lst_name === 'RecordDealTile' || lst_name === 'RecordNewRound')
            all_seats = [lst_seat];
        else { // 荣和
            all_seats = [];
            for (let i = lst_seat + 1; i < lst_seat + player_cnt; i++) {
                const seat = i % player_cnt;
                if (huled[seat])
                    continue;
                push2PlayerTiles(seat);
                if ((is_chuanma() || is_guobiao() && !cuohu[seat] || !is_chuanma() && !is_guobiao() && !zhenting[seat]) && calcHupai(player_tiles[seat]) !== 0) {
                    if (!is_chuanma() && !is_guobiao() && !is_ronghuzhahu()) { // 非川麻国标防止自动无役荣和诈和
                        let points = calcFan(seat, false, lst_seat);
                        if (calcSudian(points) !== -2000)
                            all_seats.push(seat);
                    } else
                        all_seats.push(seat);
                }
                player_tiles[seat].pop();
                if (!is_chuanma() && (is_toutiao() || is_mingjing() || is_guobiao()) && all_seats.length >= 1)
                    break;
            }
        }
        if (all_seats.length === 0)  // 没给参数 seat 的情况下, 无人能正常和牌
            throw new Error(roundInfo() + ' hupai: 没给 seat 参数无人能正常和牌');
    }

    // all_seats 重新排序, 按照放铳家逆时针顺序
    if (all_seats.length > 1) {
        let lst_name = getLstAction().name, lst_seat = getLstAction().data.seat;
        if (lst_name === 'RecordDealTile' || lst_name === 'RecordNewRound')
            lst_seat = (lst_seat + player_cnt - 1) % player_cnt;

        let hupai_seats = [false, false, false, false];
        for (let i in all_seats)
            hupai_seats[all_seats[i]] = true;
        all_seats = [];
        for (let i = lst_seat + 1; i <= lst_seat + player_cnt; i++)
            if (hupai_seats[i % player_cnt])
                all_seats.push(i % player_cnt);
    }

    if (is_toutiao() || is_mingjing() || is_guobiao()) // 有头跳且参数给了至少两家和牌的情况, 则取头跳家
        all_seats = [all_seats[0]];

    // 非血战到底, 血流成河模式
    if (!is_xuezhandaodi() && !is_wanxiangxiuluo() && !is_chuanma() && !is_xueliu()) {
        let ret = [], baopait = 0;
        for (let i in all_seats)
            ret.push(!is_guobiao() ? huleOnePlayer(all_seats[i]) : huleOnePlayerGuobiao(all_seats[i]));
        // 国标错和陪打
        if (is_guobiao() && is_cuohupeida() && typeof editFunction == 'function' && ret[0].cuohu) {
            let old_scores = scores.slice();
            for (let i = 0; i < player_cnt; i++)
                if (i === all_seats[0])
                    delta_scores[i] = -3 * cuohu_points() * scale_points();
                else
                    delta_scores[i] = cuohu_points() * scale_points();
            for (let i = 0; i < player_cnt; i++)
                scores[i] += delta_scores[i];

            addCuohu(all_seats[0], ret[0].zimo, old_scores);

            for (let i = 0; i < player_cnt; i++)
                delta_scores[i] = 0;
            cuohu[all_seats[0]] = true;
            return;
        }
        for (let i in all_seats)
            huled[all_seats[i]] = true;
        // '包'字的选择
        // 包牌比包杠优先, 因为雀魂目前没有包杠, 以雀魂为主
        if (!is_guobiao() && baogang_seat > -1)
            baopait = baogang_seat + 1;
        baogang_seat = -1;
        // 多家包牌, 自摸情况下以最先包牌的玩家为准
        // 荣和情况下, 以距放铳玩家最近的玩家的最先包牌的玩家为准
        if (!is_guobiao())
            for (let i in all_seats)
                if (baopai[all_seats[i]].length > 0) {
                    baopait = baopai[all_seats[i]][0].seat + 1;
                    break;
                }
        let old_scores = scores.slice();
        for (let i = 0; i < player_cnt; i++)
            scores[i] += delta_scores[i];

        endHule(ret, old_scores, baopait);

        for (let i = 0; i < player_cnt; i++)
            delta_scores[i] = 0;
        if (huled[ju]) { // 亲家和牌, 则连庄
            if (!is_guobiao() || is_guobiao() && is_guobiao_lianzhuang())
                ben++;
            // 幻境传说: 庄家卡2
            if (get_field_spell_mode1() === 2)
                ben += 4;
            lianzhuang_cnt++;
        } else {
            ju++;
            ben = 0;
            lianzhuang_cnt = 0;
        }
        roundEnd();
    } else {
        // 血流成河模式中, 和牌家prezhenting消失
        for (let i in all_seats) {
            pretongxunzt[all_seats[i]] = tongxunzt[all_seats[i]] = false;
            prelizhizt[all_seats[i]] = lizhizt[all_seats[i]] = false;
        }
        updateZhenting();

        let ret = [];
        for (let i in all_seats) {
            let whatever = !is_chuanma() ? huleOnePlayer(all_seats[i]) : huleOnePlayerChuanma(all_seats[i]);
            ret.push(whatever);
            hules_history.push(whatever);
        }
        if (is_chuanma() && ju_cnt === -1)
            ju_cnt = all_seats[0];
        if (!is_xueliu())
            for (let i in all_seats)
                huled[all_seats[i]] = true;
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
                liqi_info[lst_liqi.seat] = {liqi: lst_liqi.liqi, yifa: 0, kai: lst_liqi.kai};
            }
            lst_liqi = null;
        } else {
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

// 荒牌流局, 任何时刻都可以调用
let huangpai = () => {
    // 暗夜之战暗牌无人开
    if (is_anye() && getLstAction().name === 'RecordRevealTile')
        addLockTile(getLstAction().data.seat, 2);

    // 幻境传说: 庄家卡3
    if (get_field_spell_mode1() === 3) {
        scores[ju] += liqibang * 1000;
        liqibang = 0;
    }

    lianzhuang_cnt = 0; // 任意荒牌流局都会导致连庄数重置

    // 剩余玩家数, 听牌玩家数
    let player_left = 0, ting_cnt = 0;
    // 川麻未听返杠的点数
    let taxes = [0, 0, 0, 0];

    // 玩家的听牌信息
    let ting_info = [];
    for (let i = 0; i < player_cnt; i++) {
        if (!huled[i])
            player_left++;
        let tings = is_heqie_mode() || huled[i] ? [] : calcTingpai(i);
        if (tings.length === 0)
            ting_info.push({tingpai: false, hand: [], tings: tings});
        else {
            ting_cnt++;
            ting_info.push({tingpai: true, hand: player_tiles[i].slice(), tings: tings});
        }
    }
    let noting_cnt = player_left - ting_cnt; // 未听玩家数

    // 幻境传说: 命运卡1
    // 流局满贯/罚符倍数
    let times = get_field_spell_mode3() === 1 ? 2 : 1;

    // 玩家的点数变动信息
    let scores_info = [];

    // 是否有流满
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

            let cur_delta_scores = [];
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
        // 罚符, 川麻查大叫, 花猪
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
                    if (ting_info[i].tingpai) // 幻境传说: 命运卡1
                        delta_scores[i] += fafu * noting_cnt / ting_cnt * times;
                    else
                        delta_scores[i] -= fafu * times;
                }
            } else { // seat 向 i 查大叫, 查花猪
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
        // 川麻未听返杠
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
        ben += get_field_spell_mode1() === 2 ? 5 : 1; // 幻境传说: 庄家卡2
    if ((!ting_info[ju].tingpai || is_xuezhandaodi() || is_wanxiangxiuluo() || is_guobiao() && !is_guobiao_lianzhuang()) && !is_chuanma())
        ju++;

    roundEnd();

    /**
     * 计算 seat 号玩家的流局满贯导致的各家点数变动, 并返回流满点数
     * @param {number} seat - seat 号玩家
     * @param {number[]} cur_delta_scores - 该流满导致的玩家点数变动
     * @returns {number} 流满点数
     */
    function calcScore(seat, cur_delta_scores) {
        let score = 0;
        for (let i = 0; i < player_cnt; i++) {
            if (seat === i || huled[i])
                continue;
            // 幻境传说: 命运卡1
            if (seat === ju || i === ju) {
                cur_delta_scores[i] -= 4000 * times;
                cur_delta_scores[seat] += 4000 * times;
                score += 4000 * times;
            } else {
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
                } else {
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

/**
 * 途中流局
 * @param {number} [liuju_type] - 流局类型
 * - 1: 九种九牌
 * - 2: 四风连打
 * - 3: 四杠散了
 * - 4: 四家立直
 * - 5: 三家和了(需要在 detail_rule 中设置 _sanxiangliuju)
 *
 * 若没有该参数, 则除了"三家和了"外, 由系统自动判断属于哪种流局
 */
let liuju = liuju_type => {
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
            ben += get_field_spell_mode1() === 2 ? 5 : 1; // 幻境传说: 庄家卡2

        roundEnd();
    } else
        throw new Error(roundInfo() + ' liuju: 不符合任何途中流局条件');

    // 九种九牌
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

    // 四风连打
    function siFengLianDa() {
        if (player_cnt === 4)
            if (fulu[0].length === 0 && fulu[1].length === 0 && fulu[2].length === 0 && fulu[3].length === 0)
                if (paihe[0].tiles.length === 1 && paihe[1].tiles.length === 1 && paihe[2].tiles.length === 1 && paihe[3].tiles.length === 1)
                    if (paihe[0].tiles[0] === paihe[1].tiles[0] && paihe[1].tiles[0] === paihe[2].tiles[0] && paihe[2].tiles[0] === paihe[3].tiles[0])
                        if (tile2Int(paihe[0].tiles[0]) >= C1z && tile2Int(paihe[0].tiles[0]) <= C4z)
                            type = 2;
    }

    // 四杠散了
    function siGangSanLe() {
        let havegangcnt = 0;
        for (let i = 0; i < player_cnt; i++)
            for (let j in fulu[i])
                if (fulu[i][j].type === 2 || fulu[i][j].type === 3) {
                    havegangcnt++;
                    break;
                }
        if (dora_cnt.cnt === 5 && havegangcnt >= 2)
            type = 3;
    }

    // 四家立直
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

    // 三家和了, 需要设置 '_sanxiangliuju'
    function sanJiaHuLe() {
        if (is_sanxiangliuju())
            type = 5;
    }
};

// ========================================================================

/**
 * 龙之目玉: 设置目玉队列
 * @param {string} m_seats - 拥有目玉的玩家队列
 */
const setMuyuSeats = m_seats => {
    muyu_seats = m_seats;
};

/**
 * 换三张换牌(修罗/川麻)
 * @param {string[]} tls - 四名玩家交出去的牌
 * @param {number} type - 换牌方式, 0: 逆时针, 1: 对家, 2: 顺时针
 */
const huanpai = (tls, type) => {
    let tiles = [separate(tls[0]), separate(tls[1]), separate(tls[2]), separate(tls[3])];

    let ret = [];
    for (let seat = 0; seat < player_cnt; seat++) {
        let in_seat = (seat - type + 3) % player_cnt;
        for (let j = 0; j < tiles[seat].length; j++) {
            player_tiles[seat].splice(player_tiles[seat].indexOf(tiles[seat][j]), 1);
            player_tiles[seat].push(tiles[in_seat][j]);
        }
        ret.push({
            out_tiles: tiles[seat],
            out_tile_states: [0, 0, 0],
            in_tiles: tiles[in_seat],
            in_tile_states: [0, 0, 0],
        });
    }
    for (let i = 0; i < player_cnt; i++)
        player_tiles[i].sort(cmp);

    addChangeTile(ret, type);
};

/**
 * 定缺(川麻)
 * @example
 * // seat 从0-3的定缺花色分别为"索,万,饼,索"
 * dingque('smps')
 * @param {string} x - 四位玩家的定缺
 */
const dingque = x => {
    let all_dingque = x.split('');
    let dict = {'m': 1, 'p': 0, 's': 2}; // 注意 012 分别对应 pms, 而不是 mps
    let ret = [];
    for (let i in all_dingque)
        ret.push(dict[all_dingque[i]]);
    gaps = ret;

    addSelectGap(ret);
};

/**
 * 开牌并成功(暗夜之战)
 * @param {number} seat - 开牌的玩家
 */
let kaipai = seat => {
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
    } else
        throw new Error(roundInfo() + `kaipai: 暗夜之战开牌的前提是有人刚暗牌, getLstAction().name: ${getLstAction().name}`);
};

/**
 * 开牌后锁定(暗夜之战)
 * @param {number} seat - 开牌的玩家
 */
let kaipaiLock = seat => {
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

    } else
        throw new Error(roundInfo() + ` kaipaiLock: 暗夜之战开牌的前提是有人刚暗牌, getLstAction().name: ${getLstAction().name}`);
};

// ========================================================================

/**
 * 跳转局数
 * @param {number} c - 场 chang, 0,1,2,3 分别表示 东,南,西,北 场
 * @param {number} j - 局 ju, seat 为 ju 坐庄
 * @param {number} b - 本 ben, 本场数
 */
const setRound = (c, j, b) => {
    chang = c;
    ju = j;
    ben = b;
};

// 获取当前位置还剩余多少牌
function getLeftTileCnt() {
    let left_cnt = paishan.length - 14;
    if (player_cnt === 2)
        left_cnt = paishan.length - 18;
    else if (is_chuanma() || is_guobiao())
        left_cnt = paishan.length;
    if (is_zhanxing())
        left_cnt += awaiting_tiles.length;
    return left_cnt;
}

// 示例牌局
const demoGame = () => {
    gameBegin();
    begin_tiles[0] = '11223344556777z';
    if (player_cnt === 2) {
        begin_tiles[1] = '1112340678999m';
        randomPaishan('6z', '55z............');
    } else if (player_cnt === 3) {
        begin_tiles[1] = '1112340678999p';
        begin_tiles[2] = '1112340678999s';
        randomPaishan('6z', '55z........');
    } else {
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

// ========================================================================

/**
 * 便捷函数: 正常摸切
 * @param {number|string} [tile_cnt] - 要切的牌(string)或循环次数(number), 默认为1
 */
const normalMoqie = tile_cnt => {
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
    } else
        throw new Error(roundInfo() + ` normalMoqie: tile_cnt 参数不合规: ${tile_cnt}`);
};

/**
 * 便捷函数: 摸牌立直
 * @param {number|string} [tile_cnt] - 要切的牌(string)或循环次数(number), 默认为1
 */
const moqieLiqi = tile_cnt => {
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
    } else
        throw new Error(roundInfo() + ` moqieLiqi: tile_cnt 参数不合规: ${tile_cnt}`);
};

/**
 * 便捷函数: 连续岭上摸牌
 * @param {number|string} [tile_cnt] - 要鸣的牌(string)或循环次数(number), 默认为1
 */
const comboMopai = tile_cnt => {
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
    } else
        throw new Error(roundInfo() + ` comboMopai: tile_cnt 参数不合规: ${tile_cnt}`);
};

/**
 * 便捷函数: 鸣牌并切牌
 * @param {number|string} [tls_cnt] - 要切的牌(string, 1张牌)或鸣牌从手里拿出来的牌(string, 至少2张牌)或循环次数(number), 默认为1
 */
const mingQiepai = tls_cnt => {
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
        } else {
            mingpai();
            qiepai(tls_cnt);
        }
    } else
        throw new Error(roundInfo() + ` mingQiepai: tls_cnt 参数不合规: ${tls_cnt}`);
};

/**
 * 便捷函数: 自摸和牌
 * @param {boolean} [flag] - 修罗/川麻: 即 hupai 中的 type 参数, 是否为最终和牌, 默认为中途和牌
 */
const zimoHu = (flag = false) => {
    if (typeof flag == 'boolean') {
        mopai();
        hupai(flag);
    } else
        throw new Error(roundInfo() + ` zimoHu: flag 参数不合规: ${flag}`);
};

// 便捷函数: 摸切到荒牌流局
const moqieLiuju = () => {
    normalMoqie(getLeftTileCnt());
    huangpai();
};

// ========================================================================

/**
 * 判断 tile 牌是否满足 type 规则
 * @example
 * // return true
 * judgeTile('1m', 'M')
 * @param {string} tile - 要验的牌
 * @param {string} type - 规则:
 * - 'H': 字牌
 * - 'T': 老头牌
 * - 'Y': 幺九牌
 * - 'D': 中张牌
 * - 'M': 万子
 * - 'P': 饼子
 * - 'S': 索子
 * - 'L': 组成绿一色的牌
 * - 'quanshuang': 国标: 组成全双刻的牌
 * - 'quanda': 国标: 组成全大的牌
 * - 'quanzhong': 国标: 组成全中的牌
 * - 'quanxiao': 国标: 组成全小的牌
 * - 'dayuwu': 国标: 组成大于五的牌
 * - 'xiaoyuwu': 国标: 组成小于五的牌
 * - 'tuibudao': 国标: 组成推不倒的牌
 * @returns {boolean}
 */
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

/**
 * 返回和 tile 等效的所有牌, 优先把红宝牌和含有 SPT_Suf 放到后面
 * @example
 * // return ['5m', '0m', '5mt', '0mt']
 * allEqualTiles('5m')
 * @param {string} tile - 要查的牌
 * @returns {string[]} - 所有与参数 tile 等效的牌的字符串数组
 */
const allEqualTiles = tile => {
    if (tile === Tbd)
        return [Tbd];
    tile = tile.substring(0, 2);
    if (tile[0] === '0' || tile[0] === '5' && tile[1] !== 'z')
        return ['5' + tile[1], '5' + tile[1] + SPT_Suf, '0' + tile[1], '0' + tile[1] + SPT_Suf];
    else
        return [tile, tile + SPT_Suf];
};

/**
 * 判断两个牌是否等效
 * @param {string} x - 牌1
 * @param {string} y - 牌2
 * @returns {boolean}
 */
const isEqualTile = (x, y) => allEqualTiles(x).indexOf(y) > -1;

/**
 * 解析牌, 会将简化后牌编码恢复成单个并列样子
 * @example
 * // return '1m2m3m9p9p'
 * decompose('123m99p')
 * @param {string} tiles - 要解析的牌
 * @returns {string} - 解析后的牌
 */
const decompose = tiles => {
    let x = tiles.replace(/\s*/g, '');
    let random_tiles = '.HTYDMPS'; // 随机牌
    let bd_tile_num = x.match(/b/g) ? x.match(/b/g).length : 0;
    let matches = x.match(/\d+[mpsz]t?|\.|H|T|Y|D|M|P|S/g);

    let ret = '';
    for (let i = 0; i < bd_tile_num; i++)
        ret += Tbd; // 万象修罗百搭牌
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

/**
 * 拆分牌为数组, 与 decompose 类似, 不过返回的是数组
 * @example
 * // return ['1m', '2m', '3m', '9p', '9p']
 * separate('123m99p')
 * @param {string|string[]} tiles - 要拆分的牌
 * @returns {string[]} - 拆分后的牌集合, 字符串数组
 */
const separate = tiles => {
    if (!tiles)
        return [];
    if (tiles instanceof Array)
        return tiles;
    tiles = decompose(tiles);
    let ret = [];
    while (tiles.length > 0) {
        if (tiles.length > 2 && tiles[2] === SPT_Suf) { // 第3位是 SPT_Suf, 则是特殊牌
            ret.push(tiles.substring(0, 3));
            tiles = tiles.substring(3);
        } else {
            ret.push(tiles.substring(0, 2));
            tiles = tiles.substring(2);
        }
    }
    return ret;
};

/**
 * 计算手牌为 tiles 时的和牌型
 * @example
 * // return 1
 * calcHupai('11122233344455z')
 * @example
 * // return 3
 * calcHupai('19m19p19s11234567z')
 * // return 0, 因为牌少一张, 处于待牌状态, 不是和牌型
 * calcHupai('19m19p19s1234567z')
 * @param {string[]} tiles - 手牌
 * @param {boolean} [type] - 是否可能没有百搭牌, 默认为可能有百搭牌
 * @returns {number}
 * - 0: 不是和牌型
 * - 1: 一般型和牌
 * - 2: 七对子和牌
 * - 3: 国士型和牌
 * - 4: 国标中全不靠和牌(不含组合龙)
 * - 5: 国标中全不靠和牌(含有组合龙)
 * - 6-11: 国标中不含全不靠的组合龙和牌
 * - 12: 一番街古役: 十三不搭
 */
const calcHupai = (tiles, type = false) => {
    let cnt = [], tmp = [];
    for (let i = Cbd; i <= C7z; i++) // 是 Cbd 而不是 C1m 是因为百搭牌
        cnt[i] = tmp[i] = 0;
    for (let i in tiles)
        cnt[tile2Int(tiles[i])]++;

    if (is_guobiao() && tiles.indexOf(Huapai) > -1)  // 国标无法听花牌, 有花牌一定不是和牌型
        return 0;

    if (is_wanxiangxiuluo() && cnt[Cbd] === 1 && !type) {
        let tmp_tiles = [];
        for (let i in tiles)
            if (tiles[i] !== Tbd)
                tmp_tiles.push(tiles[i]);
        for (let i = 1; i <= 34; i++) { // 百搭牌试所有牌
            tmp_tiles.push(int2Tile(i));
            let result = calcHupai(tmp_tiles, true);
            if (result !== 0) // 存在百搭牌使得成为和牌型, 则返回
                return result;
            tmp_tiles.pop();
        }
        return 0;
    }

    for (let i = C1m; i <= C7z; i++) {
        if (cnt[i] >= 2) { // 假设雀头, 则剩下的只有4个面子
            cnt[i] -= 2;
            let ok = true; // 先假设能和, 再依条件否定
            for (let j = C1m; j <= C7z; j++)
                tmp[j] = cnt[j];
            tmp[C0m] = tmp[C0p] = tmp[C0s] = 0;

            for (let k = 1; k <= 3; k++) {
                for (let j = k * 9 - 8; j !== 0; j = nxt2[j]) {
                    if (tmp[j] < 0) { // 若牌数量减为了负数, 说明有有未成形的顺子
                        ok = false;
                        break;
                    }
                    tmp[j] %= 3; // 去掉暗刻, 如果 tmp[j] 仍然不为0的话, 则要构成和牌型一定构成顺子
                    // j, nxt2[j], nxt2[nxt2[j]] 构成顺子, 三个一组减去
                    tmp[nxt2[j]] -= tmp[j];
                    tmp[nxt2[nxt2[j]]] -= tmp[j];
                }
                tmp[C0m] = tmp[C0p] = tmp[C0s] = 0;
            }
            // 若字牌不能构成暗刻
            for (let j = C1z; j <= C7z; j++)
                if (tmp[j] % 3 !== 0)
                    ok = false;

            cnt[i] += 2;
            if (ok)
                return 1;
        }
    }

    // 七对子
    let duizi = 0;
    for (let i = C1m; i <= C7z; i++) {
        if (cnt[i] === 2)
            duizi++;
        // 本来只要判断 cnt[i] === 4 就行, 这里扩展成作弊大于四张牌的情况
        if (cnt[i] >= 4 && cnt[i] % 2 === 0 && (is_chuanma() || is_guobiao()))
            duizi += cnt[i] / 2;
    }
    if (duizi === 7)
        return 2;

    // 国士无双
    let guoshi = true;
    for (let i = C1m; i <= C7z; i++) {
        if (judgeTile(int2Tile(i), 'Y')) {
            if (cnt[i] === 0) // 所有幺九牌都至少有一张
                guoshi = false;
        } else if (cnt[i] > 0) // 存在非幺九牌
            guoshi = false;
    }
    if (guoshi)
        return 3;

    if (is_guobiao() && tiles.length === 14) { // 国标的全不靠和七星不靠
        let quanbukao = true;
        for (let i = C1m; i <= C7z; i++)
            if (cnt[i] >= 2)
                quanbukao = false;
        // 3*3 的数组, 每一行代表一个花色, 三行分别对应 m, p, s 色, 每一行的三个元素分别代表是否有147, 258, 369中的牌
        let jin_huase = [
            [false, false, false],
            [false, false, false],
            [false, false, false],
        ];
        for (let j = 0; j <= 2; j++)
            for (let i = 0; i <= 8; i++)
                if (cnt[j * 9 + i + 1] === 1)
                    jin_huase[j][i % 3] = true;

        // jin_huase 的每一行, 每一列都最多只有一个 true
        for (let i = 0; i <= 2; i++) {
            let true_cnt_row = 0, true_cnt_col = 0;
            for (let j = 0; j <= 2; j++) {
                if (jin_huase[i][j]) // 扫描每一行
                    true_cnt_row++;
                if (jin_huase[j][i]) // 扫描每一列
                    true_cnt_col++;
            }
            if (true_cnt_row >= 2 || true_cnt_col >= 2)
                quanbukao = false;
        }
        if (quanbukao) {
            let zuhelong = true; // 是否复合组合龙
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
    if (is_guobiao() && tiles.length >= 11) { // 国标不含全不靠的组合龙
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

/**
 * 计算 seat 号玩家的所有听牌
 * @example
 * // return [{tile: '6m'}, {tile: '9m'}]
 * // 当 player_tiles[0] 为 separate('1122335577889m')
 * calcTingpai(0)
 * @param {number} seat - seat 号玩家
 * @param {boolean} [type] - 是否考虑听第5张(无虚听), 默认不考虑
 * @returns {{tile: string}[]}
 */
const calcTingpai = (seat, type = false) => {
    if (is_chuanma() && huazhu(seat))
        return [];
    let tiles = player_tiles[seat];
    let cnt = [];
    for (let i = Cbd; i <= C7z; i++)
        cnt[i] = 0;
    for (let i in tiles)
        cnt[tile2Int(tiles[i])]++;

    if (is_guobiao() && tiles.indexOf(Huapai) > -1) // 国标无法听花牌, 有花牌一定不是听牌型
        return [];

    let ret = [];
    for (let i = C1m; i <= C7z; i++) { // 试所有牌作为听牌, 检查是否为和牌型
        tiles.push(int2Tile(i));
        cnt[i]++;
        // cnt[i] <= 4 为了除去虚听
        if ((cnt[i] <= 4 || type) && calcHupai(tiles) !== 0 && calcHupai(tiles) !== 12)
            ret.push({tile: int2Tile(i)});

        tiles.pop();
        cnt[i]--;
    }
    return ret;
};

// ========================================================================

/**
 * 获取最近操作信息, 忽略 RecordChangeTile, RecordSelectGap, RecordGangResult, RecordFillAwaitingTiles 这几个操作
 * @param {number} [num] - 倒数第 num 个操作, 默认为1
 * @returns {{name: string, data: {}}}
 */
const getLstAction = (num = 1) => {
    if (actions.length > 0) {
        let ret = actions.length;
        for (let i = 0; i < num; i++) {
            ret--;
            while (actions[ret] !== undefined && (actions[ret].name === 'RecordChangeTile' || actions[ret].name === 'RecordSelectGap' || actions[ret].name === 'RecordGangResult' || actions[ret].name === 'RecordFillAwaitingTiles'))
                ret--;
        }
        return actions[ret];
    } else
        throw new Error(roundInfo() + ' actions 为空');
};

/**
 * 设置玩家的实时点数
 * @param {number[]} s - 各玩家的点数, 有效长度为玩家数, 不超过4
 */
const setScores = s => {
    scores = s;
};

// 复原以查看真实牌谱
const resetReplay = function () {
    if (checkPaiPu !== undefined)
        GameMgr.Inst.checkPaiPu = function (game_uuid, account_id, paipu_config, is_maka) {
            return checkPaiPu.call(this, game_uuid, account_id, paipu_config, is_maka);
        }
    if (resetData !== undefined)
        uiscript.UI_Replay.prototype.resetData = function () {
            return resetData.call(this);
        }
};

// ========================================================================
// ========================================================================
// ========================================================================
// ========================================================================
// ========================================================================
// 编辑自制牌谱时, 除非知道自己在做什么, 否则不建议修改下面的所有变量与函数, 或仅限只读

/**
 * 设置对局的模式
 * - category: 模式大类, 1: 友人场, 2: 匹配场, 4: 比赛场, 100: 新手教程
 * - meta
 *      - mode_id: 匹配场的房间, 只有在 category 为 2 时才有效, 详见 字典.md
 *      - room_id: 友人场的房间号, 只有在 category 为 1 时才有效
 * - mode
 *      - mode: 玩家数和场次局数
 *      - detail_rule: 详细规则, 很多详细配置都在这里, 详见 1_编辑游戏信息.md
 * @type {{category: number, meta: {[mode_id]: number, [room_id]: number}, mode: {mode: number, detail_rule: {}}}}
 */
let config;
/**
 * 牌山, 会随着牌局的进行逐渐减少
 * @type {string[]}
 */
let paishan;
/**
 * 玩家的实时点数, 长度为玩家数, 不超过4
 * @type {number[]}
 */
let scores;
/**
 * 玩家数, 有效值2, 3, 4, 默认为4
 * @type {number}
 */
let player_cnt;
/**
 * 立直所需要的棒子数, 默认为1
 * @type {number}
 */
let liqi_need;
/**
 * - chang: 场(东/南/西/北对应0/1/2/3)
 * - ju: 局(东1/2/3/4对应0/1/2/3)
 * - ben: 本场数
 * - liqibang: 场上立直棒个数
 * - benchangbang: 原子化的本场棒个数(用于和牌的点数划分)
 * @type {number}
 */
let chang, ju, ben, liqibang, benchangbang;
/**
 * 玩家的切牌集合和摸牌集合, 有效长度为玩家数, 不超过4
 * @type {[string][]}
 */
let discard_tiles, deal_tiles;
/**
 * 玩家的副露信息, 一维有效长度为玩家数, 不超过4
 * - type: 副露类型:
 *      - 0: 吃 -> 明顺
 *      - 1: 碰 -> 明刻
 *      - 2: 明杠(包括加杠)
 *      - 3: 暗杠
 *      - 4: 拔北
 * - tile: 构成副露的牌集合
 * - from: 鸣其他家的牌时, 构成副露的牌所来自的玩家, 这里默认最后一张牌是来自被鸣牌家的,
 * 如果是自家鸣牌, 则没有 from
 * @type {[{type: number, tile: string[], [from]: number}][]}
 */
let fulu;
/**
 * 玩家的牌河, 一维有效长度为玩家数, 不超过4
 * - liujumanguan: 是否满足流局满贯
 * - tiles: 牌河的牌集合(包括被鸣走的牌)
 * @type {{liujumanguan: boolean, tiles: string[]}[]}
 */
let paihe;
/**
 * 立直信息, 有效长度为玩家数, 不超过4
 * - liqi: 魂之一击模式不使用这个值
 *      - 0: 未立直
 *      - 1: 普通立直
 *      - 2: 两立直
 * - yifa: 一发持续的巡目, 默认为1, 若为0, 则一发消失,
 * 值得注意的是刚开局所有玩家的 yifa 都是1, 用于天地人和的判断
 * - kai: 是否为开立直
 * - beishui_type: 背水之战: 立直类型, 0: 普通立直, 1: 真系列, 2: 极系列
 * @type {{liqi: number, yifa: number, kai: boolean, [beishui_type]: number}[]}
 */
let liqi_info;
/**
 * lst_liqi: 宣言立直的玩家信息
 * - seat: 宣言立直的玩家
 * - liqi: 立直的类型, 1: 普通立直, 2: 两立直
 * - kai: 是否为开立直
 * - beishui_type: 背水之战: 立直类型, 0: 普通立直, 1: 真系列, 2: 极系列
 * @type {{seat: number, liqi: number, kai: boolean, [beishui_type]: number}|null}
 */
let lst_liqi;
/**
 * 宝牌指示牌(表和里各5张)
 * @type {string[]}
 */
let doras, li_doras;
/**
 * dora相关数据
 * - cnt: 表dora数量
 * - licnt: 里dora数量
 * - lastype: 翻dora类型, 1表示即翻指示牌(暗杠), 2表示过一个操作才翻指示牌(明杠)
 * - bonus: 幻境传说: 是否多一个dora
 * @type {{cnt: number, licnt: number, lastype: number, [bonus]: number}}
 */
let dora_cnt;
/**
 * 各家点数变动
 * @type {number[]}
 */
let delta_scores;
/**
 * 各家原点分数, 默认为25000
 * @type {number}
 */
let base_points;
/**
 * draw_type: 摸牌方向: 1 表示正常摸牌, 0 表示岭上摸牌, lst_draw_type: 最近玩家摸牌方向
 * @type {number}
 */
let draw_type, lst_draw_type;
/**
 * 最终要注入到牌谱回放中的内容的内容, 每小局结束后 push 到 all_data.actions 中并清空
 * @type {{name: string, data: {}}[]}
 */
let actions;
/**
 * 血战到底/血流成河: 玩家和牌历史
 * @type {{}[]}
 */
let hules_history;
/**
 * 玩家是否已和牌, 有效长度为玩家数, 不超过4
 * @type {boolean[]}
 */
let huled;
/**
 * 玩家的包牌信息, 有效长度为玩家数, 不超过4
 * - seat: 要包牌的玩家
 * - val: 包牌的役满倍数
 * @type {[{seat: number, val: number}][]}
 */
let baopai;
/**
 * 玩家的巡目, 对应的数字是在 actions 中的下标, 一维有效长度为玩家数, 不超过4
 * @type {[number][]}
 */
let xun;
/**
 * 终局玩家的排名, 点数等信息, 有效长度为玩家数, 不超过4
 * - seat: 座次
 * - part1_point_1: 最终点数
 * - total_point: 素点
 * - ...
 * @type {{seat: number, part_point_1: number, total_point: number}[]}
 */
let players;
/**
 * 第四个明杠时, 前三副露是否都是杠子(然后第四个杠才构成包牌), 有效长度为玩家数, 不超过4
 * @type {boolean[]}
 */
let sigang_bao;
/**
 * 包杠的玩家, 无人包杠则为-1
 * @type {number}
 */
let baogang_seat;
/**
 * 配牌明牌: 玩家所亮明的牌, number 为牌的数字编码, 有效长度为玩家数, 不超过4
 * @type {[number][]}
 */
let mingpais;
/**
 * 龙之目玉: 拥有目玉的玩家队列
 * @type {string}
 */
let muyu_seats;
/**
 * 龙之目玉: 目玉信息
 * - id: 目玉id, 从1开始依次递增1
 * - seat: 拥有目玉的玩家
 * - count: 当前拥有目玉的剩余巡目
 * - count_max: 拥有目玉的最大巡目, 固定为5
 * @type {{id: number, seat: number, count: number, count_max: number}}
 */
let muyu;
/**
 * 龙之目玉: 打点的倍数, 只有有目玉的玩家为2, 其他都为1, 有效长度为玩家数, 不超过4
 * @type {number[]}
 */
let muyu_times;
/**
 * 川麻: 某局第一位和牌玩家的 seat, 若没有则为-1
 * @type {number}
 */
let ju_cnt;
/**
 * 川麻: 玩家的定缺, 注意 012 分别代表 pms, 有效长度为玩家数, 不超过4
 * @type {number[]}
 */
let gaps;
/**
 * 川麻: 开杠刮风下雨
 * - over: 已经收取点数的部分
 *      - from: 被收点数的玩家
 *      - to: 收点数的玩家
 *      - val: 收取的点数
 * - notover: 与 over 类似, 是可能会被枪杠的部分, 杠通过后会转为 over 并结算
 * @type {{over: {from: number, to: number, val: number}[], notover: {from: number, to: number, val: number}[]}}
 */
let chuanma_gangs;
/**
 * 幻境传说: 命运卡3(厄运沙漏): 各家立直后舍牌数量, 有效长度为玩家数, 不超过4
 * @type {number[]}
 */
let spell_hourglass;
/**
 * 魂之一击: 各家立直信息
 * - seat: 立直的玩家
 * = liqi: 立直的类型, 1: 普通立直, 2: 两立直
 * - continue_deal_count: 魂之一击期间还有多少次摸牌机会
 * - overload: 是否已过载
 * @type {{seat: number, liqi: number, continue_deal_count: number, overload: boolean}[]}
 */
let hunzhiyiji_info;
/**
 * 咏唱之战: 各家舍牌手摸切信息,
 * 与 paihe.tiles 不同的是, 牌被鸣走后, shoumoqie 同样会去掉, 而 paihe.tiles 不会
 * @type {[boolean][]}
 */
let shoumoqie;
/**
 * 咏唱之战: 各家舍牌手摸切最大长度和bonus
 * - seat: 玩家
 * - moqie_count: 摸切最大长度
 * - moqie_bonus: 摸切奖励番数(绯)
 * - shouqie_count: 手切最大长度
 * - shouqie_bonus: 手切奖励番数(苍)
 * @type {{seat: number, moqie_count: number, moqie_bonus: number, shouqie_count: number, shouqie_bonus: number}[]}
 */
let yongchang_data;
/**
 * 占星之战: 牌候选池, 通常长度为3
 * @type {string[]}
 */
let awaiting_tiles;
/**
 * 庄家连续和牌连庄数量, 用于八连庄
 * @type {number}
 */
let lianzhuang_cnt;
/**
 * 国标玩家是否已错和, 长度为4
 * @type {boolean[]}
 */
let cuohu;
/**
 * 何切模式: 主视角要保护的牌(防止切出去)
 * @type {{seat: number, tiles: string[]}}
 */
let protected_tiles;
/**
 * 各种振听, 有效长度为玩家数, 不超过4
 *
 * 影响振听的因素
 * 1. 自家牌河中有听的牌(qiepai)
 * 2. 其他家切牌(qiepai), 加杠(zimingpai), 拔北(zimingpai), 暗杠(国士, zimingpai)有听的牌
 * 3. 只有切牌的时候会解除舍张振听
 * 4. 只有在摸牌和自家鸣牌的时候会解除同巡振听
 * 5. 同巡和立直振听在pass掉这张牌之后才会振听, 紧跟的操作可能是 mopai, mingpai (hupai 不影响)
 * @type {boolean[]}
 */
let pretongxunzt, prelizhizt, shezhangzt, tongxunzt, lizhizt, zhenting;
/**
 * 玩家当时的手牌, 一维长度为玩家数, 不超过4
 * @type {[string][]}
 */
let player_tiles;
/**
 * 完成编辑后的所有信息集合
 * - actions: actions[], 同名变量 actions 每小局结束后会 push 到 all_data.actions 中
 * - xun: xun[], 与 actions 类似, 同名变量 xun 每小局结束后会 push 到 all_data.xun 中
 * - config: config, 与同名变量直接链接
 * - player_datas: player_datas, 与同名变量直接链接
 * - players: players, 与同名变量直接链接
 * @type {{actions: [], xun: [], config: {}, player_datas: [], players: []}}
 */
let all_data;

// ========================================================================

/**
 * 亲家, 闲家起手牌数量
 * @constant
 * @default
 */
const Qin_tiles_num = 14, Xian_tiles_num = 13;
/**
 * 常用牌的数字编码
 * @constant
 * @default
 */
const C1m = 1, C9m = 9, C1p = 10, C9p = 18, C1s = 19, C9s = 27, C1z = 28, C4z = 31, C5z = 32, C7z = 34, C0m = 35,
    C0p = 36, C0s = 37, C5m = 5, C5p = 14, C5s = 23;
/**
 * 特殊牌的后缀
 * @constant
 * @default
 */
const SPT_Suf = 't';
/**
 * 特殊牌和普通牌数字编码的差值
 * @constant
 * @default
 */
const SPT_Offset = 40;
/**
 * 万象修罗百搭牌编码
 * @constant
 * @default
 */
const Tbd = 'bd';
/**
 * 万象修罗百搭牌数字编码
 * @constant
 * @default
 */
const Cbd = 0;
/**
 * 国标麻将起和番
 * @constant
 * @default
 */
const GB_Qihu = 8;
/**
 * 国标麻将花牌的编码
 * @constant
 * @default
 */
const Huapai = '0m';
/**
 * 顺子中比它大的牌, 如果某张牌的数字编码(不区分红宝牌)为 i, 则由它构成的顺子中比它大1的牌的数字编码为 nxt2[i]
 *
 * 故可得出 即 j, nxt2[j], nxt2[nxt2[j]] 构成递增的顺子
 *
 * 如果不存在, 则指向 35, 36
 *
 * 数组长度为37
 * @constant
 * @default
 */
const nxt2 = [0, 2, 3, 4, 5, 6, 7, 8, 9, 35, 11, 12, 13, 14, 15, 16, 17, 18, 35, 20, 21, 22, 23, 24, 25, 26, 27, 35, 35, 35, 35, 35, 35, 35, 35, 36, 0];
/**
 * 宝牌指示牌表, 如果某张指示牌的数字编码(不区分红宝牌)为 i, 则它对应的宝牌的数字编码为 dora_nxt[i]
 *
 * 数组长度35
 * @constant
 * @default
 */
const dora_nxt = [0, 2, 3, 4, 5, 6, 7, 8, 9, 1, 11, 12, 13, 14, 15, 16, 17, 18, 10, 20, 21, 22, 23, 24, 25, 26, 27, 19, 29, 30, 31, 28, 33, 34, 32];

// ========================================================================

/**
 * 使 gameBegin 每个牌谱只运行一次的变量
 * @type {boolean}
 */
let game_begin_once;

// 只在一开局生效或者整个对局期间都不会变化的值的初始化
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

    if (player_cnt === 3) { // 三麻, 二麻屏蔽以下模式
        let x = config.mode.detail_rule;
        x.wanxiangxiuluo_mode = x.xuezhandaodi = x.muyu_mode = x.chuanma = false;
    }

    liqi_need = get_liqi_need();
    if (get_field_spell_mode3() === 2) // 幻境传说: 命运卡2
        liqi_need = 2;

    [chang, ju, ben, liqibang] = get_chang_ju_ben_num();
    if (!liqibang)
        liqibang = 0;
    lianzhuang_cnt = 0;

    let init_point = -1;
    if (get_init_point() > -1)
        init_point = get_init_point();
    if (init_point > -1) {
        scores = [];
        for (let i = 0; i < player_cnt; i++)
            scores.push(init_point);
    } else if (player_cnt === 2) { // 二麻
        scores = [50000, 50000];
    } else if (player_cnt === 3) { // 三麻
        scores = [35000, 35000, 35000];
    } else { // 四麻
        if (is_guobiao()) {
            scores = [300, 300, 300, 300];
            for (let i = 0; i < player_cnt; i++)
                scores[i] *= scale_points();
        } else if (is_chuanma() || is_tianming())
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

// 大部分数据初始化
const init = () => {
    actions = [];
    muyu_times = [1, 1, 1, 1];
    muyu = {id: 0, seat: 0, count: 5, count_max: 5};
    xun = [[], [], [], []];
    gaps = [];
    ju_cnt = -1;
    benchangbang = ben;
    baopai = [[], [], [], []];
    lst_liqi = null;
    mingpais = [[], [], [], []];
    chuanma_gangs = {over: [], notover: []};
    dora_cnt = {cnt: 1, licnt: 1, lastype: 0, bonus: 0};
    huled = [false, false, false, false];
    hules_history = [];
    fulu = [[], [], [], []];
    paihe = [
        {liujumanguan: !(no_liujumanguan() || is_heqie_mode()), tiles: []},
        {liujumanguan: !(no_liujumanguan() || is_heqie_mode()), tiles: []},
        {liujumanguan: !(no_liujumanguan() || is_heqie_mode()), tiles: []},
        {liujumanguan: !(no_liujumanguan() || is_heqie_mode()), tiles: []},
    ];
    liqi_info = [
        {liqi: 0, yifa: 1, kai: false},
        {liqi: 0, yifa: 1, kai: false},
        {liqi: 0, yifa: 1, kai: false},
        {liqi: 0, yifa: 1, kai: false},
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
        {seat: 0, liqi: 0, continue_deal_count: 0, overload: false},
        {seat: 1, liqi: 0, continue_deal_count: 0, overload: false},
        {seat: 2, liqi: 0, continue_deal_count: 0, overload: false},
        {seat: 3, liqi: 0, continue_deal_count: 0, overload: false},
    ];
    shoumoqie = [[], [], [], []];
    yongchang_data = [
        {seat: 0, moqie_count: 0, moqie_bonus: 0, shouqie_count: 0, shouqie_bonus: 0},
        {seat: 1, moqie_count: 0, moqie_bonus: 0, shouqie_count: 0, shouqie_bonus: 0},
        {seat: 2, moqie_count: 0, moqie_bonus: 0, shouqie_count: 0, shouqie_bonus: 0},
        {seat: 3, moqie_count: 0, moqie_bonus: 0, shouqie_count: 0, shouqie_bonus: 0},
    ];
    awaiting_tiles = [];
    cuohu = [false, false, false, false];

    delta_scores = [];
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
    if (tiles[0].length === 0 && tiles[1].length === 0 && tiles[2].length === 0 && tiles[3].length === 0) { // 没有给定起手, 则模仿现实中摸牌
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
    protected_tiles = {};
};

// 玩家的巡目所对应的操作位置
const calcXun = () => {
    for (let i = 0; i < player_cnt; i++)
        if (player_tiles[i].length % 3 === 2 && !huled[i])
            xun[i].push(actions.length - 1);
};

/**
 * 计算表指示牌
 * @returns {string[]}
 */
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

// ========================================================================

/**
 * tile 编码转换为数字编码
 * @param {string} tile - 输入的牌
 * @param {boolean} [type] - 是否区分红宝牌, 默认不区分
 * @param {boolean} [sptile] - 是否区分以 SPT_Suf 结尾的特殊牌, 默认不区分
 * @returns {number}
 */
const tile2Int = (tile, type = false, sptile = false) => {
    if (tile === Tbd) // 万象修罗百搭牌
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
    } else if (tile[2] === SPT_Suf) {
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

/**
 * 数字编码转换为 tile 编码
 * @param {number} x - 数字编码
 * @param {boolean} [type] - 是否生成带 SPT_Suf 结尾的特殊牌
 * @returns {string}
 */
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
    } else {
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

/**
 * 手牌理牌算法
 * @param {string} x - tile x
 * @param {string} y - tile y
 * @returns {number}
 */
const cmp = (x, y) => tile2Int(x) - tile2Int(y);

// 随机排序比较函数
const randomCmp = () => Math.random() - 0.5;

/**
 * 判断第一个参数里面的所有牌是否为第二个参数里面的牌的子集
 * @param {string|string[]} x - 子集
 * @param {string[]} y - 全集
 * @returns {boolean}
 */
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

// ========================================================================

/**
 * 更新 seat 号玩家的舍张振听状态
 * @param {number} seat - seat 号玩家
 */
const updateShezhangzt = seat => {
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

/**
 * 更新同巡和立直预振听, zimingpai 不会造成舍张振听, 所以只有同巡和立直,
 * 此外, 暗杠只有国士听牌才有可能导致其他玩家振听
 * @param {number} seat - seat 号玩家
 * @param {string} tile - 相关操作的牌
 * @param {boolean} [is_angang] - 是否为暗杠
 */
const updatePrezhenting = (seat, tile, is_angang = false) => {
    if (!is_chuanma() && !is_guobiao() && !no_zhenting()) {
        // 同巡振听预判断
        for (let i = 0; i < player_cnt; i++) {
            if (i === seat)
                continue;
            let tingpais_i = calcTingpai(i);
            for (let j in tingpais_i)
                if (isEqualTile(tile, tingpais_i[j].tile)) {
                    if (!is_angang) {
                        pretongxunzt[i] = true;
                        break;
                    } else {
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
        // 立直振听预判断
        for (let i = 0; i < player_cnt; i++) {
            if (liqi_info[i].liqi === 0)
                continue;
            let tingpais_i = calcTingpai(i);
            for (let j in tingpais_i)
                if (isEqualTile(tile, tingpais_i[j].tile)) {
                    if (!is_angang) {
                        prelizhizt[i] = true;
                        break;
                    } else {
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

// 更新振听状态
const updateZhenting = () => {
    for (let i = 0; i < player_cnt; i++)
        zhenting[i] = shezhangzt[i] || tongxunzt[i] || lizhizt[i];
};

// ========================================================================

/**
 * 把 lst_liqi 中的信息赋值给 liqi_info, 并返回胶水代码用的 liqi
 * @param {boolean} [type] - 是否允许立直失败, 只会出现在血战到底模式中, 默认不允许
 * @returns {{seat: number, liqibang: number, score: number, [liqi_type_beishuizhizhan]: number, [failed]: boolean} |null}
 */
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
                yifa: get_field_spell_mode2() === 2 ? 3 : 1, // 幻境传说: 机会卡2
                kai: lst_liqi.kai,
                beishui_type: lst_liqi.beishui_type
            };
            ret = {
                seat: lst_liqi.seat,
                liqibang: liqibang,
                score: scores[lst_liqi.seat],
                liqi_type_beishuizhizhan: lst_liqi.beishui_type,
            };
        } else if (type)
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

/**
 * 开局计算所有玩家的听牌, 亲家去掉最后一张牌后再计算, 但仍然不会显示
 * @returns {{seat: number, tingpais1: {tile: string}[]}[]}
 */
const getAllTingpai = () => {
    let tingpai = [];
    let lastile = player_tiles[ju].pop();
    if (!is_heqie_mode())
        for (let i = 0; i < player_cnt; i++) {
            let tingpais1 = calcTingpai(i);
            if (tingpais1.length > 0)
                tingpai.push({seat: i, tingpais1: tingpais1});
        }
    player_tiles[ju].push(lastile);
    return tingpai;
};

/**
 * 通过最近其他玩家的操作把对应的牌 push 到要和牌的玩家的手牌中
 * @param seat - seat 号玩家
 */
const push2PlayerTiles = seat => {
    let lst_action = getLstAction(), lst_name = getLstAction().name;
    if (lst_name === 'RecordDiscardTile' || lst_name === 'RecordRevealTile' || lst_name === 'RecordLockTile')
        player_tiles[seat].push(lst_action.data.tile);
    else if (lst_name === 'RecordBaBei')
        player_tiles[seat].push(lst_action.data.tile);
    else if (lst_name === 'RecordAnGangAddGang')
        player_tiles[seat].push(lst_action.data.tiles);
};

/**
 * 将 seat 号玩家的副露信息 fulu 赋值给 ming
 * @param seat - seat 号玩家
 * @returns {string[]}
 */
const fulu2Ming = seat => {
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

// ========================================================================

/**
 * 配牌明牌, 如果有明的牌则去掉, 返回 true, 没有则返回 false
 * @param {number} seat - seat 号玩家
 * @param {string} tile - 牌的种类
 * @returns {boolean}
 */
const eraseMingpai = (seat, tile) => {
    if (mingpais[seat][tile2Int(tile, true)] > 0) {
        mingpais[seat][tile2Int(tile, true)]--;
        return true;
    }
    return false;
};

/**
 * 龙之目玉, 更新目玉
 * @param {boolean} [type] - 更新类型, true 表示生成新目玉, false 表示计数, 默认为 false
 */
const updateMuyu = (type = false) => {
    if (type) {
        muyu.id++;
        muyu.count = 5;
        if (muyu_seats.length > 0) {
            muyu.seat = parseInt(muyu_seats[0]);
            muyu_seats = muyu_seats.substring(1);
        } else
            muyu.seat = Math.floor(Math.random() * player_cnt);
        muyu_times = [1, 1, 1, 1];
        muyu_times[muyu.seat]++;
    } else
        muyu.count--;
};

/**
 * 川麻, 判断 seat 玩家是否花猪
 * @param {number} seat - seat 号玩家
 * @returns {boolean}
 */
const huazhu = seat => {
    // 注意 gaps 的 012 分别对应 pms, 而不是 mps
    for (let i in player_tiles[seat]) { // 查手牌
        if (Math.floor((tile2Int(player_tiles[seat][i]) - 1) / 9) === 0 && gaps[seat] === 1)
            return true;
        if (Math.floor((tile2Int(player_tiles[seat][i]) - 1) / 9) === 1 && gaps[seat] === 0)
            return true;
        if (Math.floor((tile2Int(player_tiles[seat][i]) - 1) / 9) === 2 && gaps[seat] === 2)
            return true;
    }
    for (let i in fulu[seat]) { // 查副露
        if (Math.floor((tile2Int(fulu[seat][i].tile[0]) - 1) / 9) === 0 && gaps[seat] === 1)
            return true;
        if (Math.floor((tile2Int(fulu[seat][i].tile[0]) - 1) / 9) === 1 && gaps[seat] === 0)
            return true;
        if (Math.floor((tile2Int(fulu[seat][i].tile[0]) - 1) / 9) === 2 && gaps[seat] === 2)
            return true;
    }
    return false;
};

/**
 * 幻境传说, 判断 tile 是否为 dora
 * @param {string} tile - 牌
 * @returns {boolean}
 */
const isDora = tile => {
    if (tile[0] === '0')
        return true;
    let doras0 = calcDoras();
    for (let i in doras0)
        if (tile2Int(tile) === dora_nxt[tile2Int(doras0[i])])
            return true;
    return false;
};

/**
 * 天命之战, 有多少天命牌
 * @param {number} seat - seat 号玩家
 * @param {boolean} zimo - 是否为自摸
 * @returns {number}
 */
const calcTianming = (seat, zimo) => {
    let sum = 1;
    for (let i in player_tiles[seat]) { // 查手牌
        if (!zimo && i === player_tiles[seat].length - 1) // 不是自摸, 则最后一张牌不考虑
            break;
        if (player_tiles[seat][i].length >= 2 && player_tiles[seat][i][2] === SPT_Suf)
            sum++;
    }
    for (let i in fulu[seat]) // 查副露
        for (let j in fulu[seat][i].tile) {
            if (fulu[seat][i].type !== 3 && j === fulu[seat][i].tile.length - 1) // 不是暗杠, 则最后一张牌不考虑
                break;
            if (fulu[seat][i].tile[j].length > 2 && fulu[seat][i].tile[j][2] === SPT_Suf)
                sum++;
        }
    return sum;
};

/**
 * 咏唱之战, 更新 seat 号玩家手摸切信息
 * @param {number} seat - seat 号玩家
 */
const updateShoumoqie = seat => {
    for (let k = 0; k < 2; k++) { // k 为 0 表示摸切, 为 1 表示手切
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

    /**
     * 咏唱之战, 计算 seat 号玩家的奖励番(绯, 苍)
     * @param {number} seat - seat 号玩家
     * @param {boolean} flag - 计算类型, false 表示摸切, true 表示手切
     * @returns {number}
     */
    function calcBonus(seat, flag) {
        const val = yongchang_data[seat][flag ? 'shouqie_count' : 'moqie_count'];
        if (!flag) { // 摸切
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
        } else { // 手切
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

// ========================================================================

/**
 * huleOnePlayer 组 - 立直
 *
 * 计算 seat 号玩家的和牌导致的各家点数变动
 * @param {number} seat - 和牌的 seat 号玩家
 * @returns {{}}
 */
let huleOnePlayer = seat => {
    /**
     * 点数切上到整百
     * @param {number} point - 原点数
     * @returns {number}
     */
    const qieshang = point => Math.ceil(point / 100) * 100;

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
    // -------------------------------------------
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
    // -------------------------------------------
    let tianming_bonus = 1;
    if (is_tianming())
        tianming_bonus = calcTianming(seat, zimo);
    // -------------------------------------------
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
            } else {
                delta_point = point_zimo_xian * muyu_times[i] * muyu_times[seat];
                delta_scores[i] -= delta_point;
                delta_scores[seat] += delta_point;
            }
        }
        let ret = {
            count: 0,
            doras: doras0,
            li_doras: li_doras0,
            fans: [{val: 0, id: 9000}],
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
        }
        player_tiles[seat].pop();
        if (is_xuezhandaodi() || is_wanxiangxiuluo() || player_cnt === 2)
            ret.dadian = -delta_scores[seat];
        return ret;
    }

    [point_rong, point_sum, point_zimo_qin, point_zimo_xian] = calcPoint(sudian);
    point_rong = qieshang(point_rong) * tianming_bonus;
    point_sum = qieshang(point_sum) * tianming_bonus;
    point_zimo_qin = qieshang(point_zimo_qin) * tianming_bonus;
    point_zimo_xian = qieshang(point_zimo_xian) * tianming_bonus;

    // 有包牌
    if (baopai[seat].length > 0) {
        let delta_point = 0;
        let yiman_sudian = 8000;
        let baoval = 0;
        for (let j in baopai[seat])
            baoval += baopai[seat][j].val;

        let feibao_rong, feibao_zimo_qin, feibao_zimo_xian;
        [feibao_rong, , feibao_zimo_qin, feibao_zimo_xian] = calcPoint((val - baoval) * yiman_sudian);
        feibao_rong = qieshang(feibao_rong) * tianming_bonus;
        feibao_zimo_qin = qieshang(feibao_zimo_qin) * tianming_bonus;
        feibao_zimo_xian = qieshang(feibao_zimo_xian) * tianming_bonus;

        if (zimo) {
            // 包牌部分, 包牌家全包
            for (let j in baopai[seat]) {
                for (let i = 0; i < player_cnt; i++) {
                    if (i === seat || huled[i])
                        continue;
                    if (i === ju || seat === ju) {
                        delta_point = baopai[seat][j].val * 2 * yiman_sudian * muyu_times[i] * muyu_times[seat] * tianming_bonus;
                        delta_scores[baopai[seat][j].seat] -= delta_point;
                        delta_scores[seat] += delta_point;
                    } else {
                        delta_point = baopai[seat][j].val * yiman_sudian * muyu_times[i] * muyu_times[seat] * tianming_bonus;
                        delta_scores[baopai[seat][j].seat] -= delta_point;
                        delta_scores[seat] += delta_point;
                    }
                }
            }
            // 非包牌部分: 没有包杠, 则是一般自摸; 存在包杠, 则包杠全包
            for (let i = 0; i < player_cnt; i++) {
                if (i === seat || huled[i])
                    continue;
                let equ_seat = i;
                if (baogang_seat > -1 && !huled[baogang_seat])
                    equ_seat = baogang_seat;
                if (i === ju || seat === ju) {
                    delta_point = feibao_zimo_qin * muyu_times[i] * muyu_times[seat];
                    delta_scores[equ_seat] -= delta_point;
                    delta_scores[seat] += delta_point;
                } else {
                    delta_point = feibao_zimo_xian * muyu_times[i] * muyu_times[seat];
                    delta_scores[equ_seat] -= delta_point;
                    delta_scores[seat] += delta_point;
                }
            }
        } else {
            // 包牌部分
            for (let j in baopai[seat]) {
                delta_point = baopai[seat][j].val * yiman_sudian * 2 * muyu_times[fangchong_seat] * muyu_times[seat] * tianming_bonus;
                if (qinjia)
                    delta_point *= 1.5;
                delta_scores[baopai[seat][j].seat] -= delta_point;
                delta_scores[seat] += delta_point;
            }
            // 非包牌部分: 非包牌部分 + 包牌部分/2 => 非包牌部分 + (全部 - 非包牌部分)/2 => (全部 + 非包牌部分)/2
            delta_point = (point_rong + feibao_rong) / 2 * muyu_times[fangchong_seat] * muyu_times[seat];
            delta_scores[fangchong_seat] -= delta_point;
            delta_scores[seat] += delta_point;
        }
    }
    // 无包牌情况下的包杠, 自摸全由包杠家负担
    else if (baogang_seat > -1 && !huled[baogang_seat] && zimo) {
        let delta_point = 0;
        for (let i = 0; i < player_cnt; i++) {
            if (i === seat || huled[i])
                continue;
            if (i === ju || seat === ju) {
                delta_point = point_zimo_qin * muyu_times[i] * muyu_times[seat];
                delta_scores[baogang_seat] -= delta_point;
                delta_scores[seat] += delta_point;
            } else {
                delta_point = point_zimo_xian * muyu_times[i] * muyu_times[seat];
                delta_scores[baogang_seat] -= delta_point;
                delta_scores[seat] += delta_point;
            }
        }
    }
    // 一般情况
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
                } else {
                    delta_point = point_zimo_xian * muyu_times[i] * muyu_times[seat];
                    delta_scores[i] -= delta_point;
                    delta_scores[seat] += delta_point;
                }
            }
        } else {
            delta_point = point_rong * muyu_times[fangchong_seat] * muyu_times[seat];
            delta_scores[fangchong_seat] -= delta_point;
            delta_scores[seat] += delta_point;
        }
    }
    let dadian = Math.max(delta_scores[seat], -delta_scores[seat]);
    // 幻境传说: 命运卡3
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

    // 幻境传说: 庄家卡5
    if (get_field_spell_mode1() === 5 && seat === ju && !zimo) {
        delta_scores[seat] += points.dora_bonus * 1000;
        delta_scores[fangchong_seat] -= points.dora_bonus * 1000;
    }

    calcChangGong();

    let ret = {
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
    }
    if (is_tianming())
        ret.tianming_bonus = tianming_bonus;
    if (is_xuezhandaodi() || is_wanxiangxiuluo() || player_cnt === 2)
        ret.dadian = dadian;
    player_tiles[seat].pop();
    return ret;

    /**
     * 通过素点计算 荣和, 自摸总计, 自摸收亲, 自摸收闲 的点数
     * @param {number} c_sudian - 素点
     * @returns {[number, number, number, number]} - 荣和, 自摸总计, 自摸收亲, 自摸收闲
     */
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
        } else {
            rong = 4 * c_sudian;
            sum = 4 * c_sudian;
            zimo_qin = 2 * c_sudian;
            zimo_xian = c_sudian;
            if (no_zimosun()) {
                zimo_qin = (player_cnt + 2) / (player_cnt - 1) * c_sudian;
                zimo_xian = 3 / (player_cnt - 1) * c_sudian;
            } else
                sum = player_cnt * c_sudian;
        }
        return [rong, sum, zimo_qin, zimo_xian];
    }

    // 计算本场供托划分
    function calcChangGong() {
        let equal_seat = fangchong_seat; // 等效放铳 seat
        let baopai_same_seat = true; // true 表示当前的和牌只有一种包牌, 或只有一家包牌
        let all_baopai = true; // 包牌家是否只有一家
        if (baopai[seat].length > 0) { // 有包牌
            let baoval = 0;
            for (let i in baopai[seat]) {
                baoval += baopai[seat][i].val
                if (baopai[seat][0].seat !== baopai[seat][i].seat)
                    baopai_same_seat = false;
            }
            all_baopai = val === baoval;
        }
        // 存在包杠, 则包杠家支付全部本场, 相当于包杠家放铳
        if (baogang_seat > -1 && zimo && !huled[baogang_seat])
            equal_seat = baogang_seat;
        // 自摸情况下全是包牌, 且包牌家只有一家, 则那个包牌家支付全部本场
        else if (baopai[seat].length > 0 && zimo && all_baopai && baopai_same_seat)
            equal_seat = baopai[seat][0].seat;

        let delta_point;
        if (equal_seat !== undefined) {
            delta_point = (player_cnt - 1) * 100 * benchangbang * get_ben_times();
            delta_scores[equal_seat] -= delta_point;
            delta_scores[seat] += delta_point;
        } else {
            delta_point = 100 * benchangbang * get_ben_times();
            for (let i = 0; i < player_cnt; i++) {
                if (i === seat || huled[i])
                    continue;
                delta_scores[i] -= delta_point;
                delta_scores[seat] += delta_point;
            }
        }
        benchangbang = 0;
        // 供托
        delta_scores[seat] += liqibang * 1000;
        liqibang = 0;
    }
};

/**
 * huleOnePlayer 组 - 川麻
 *
 * 计算 seat 号玩家的和牌导致的各家点数变动
 * @param {number} seat - 和牌的 seat 号玩家
 * @returns {{}}
 */
let huleOnePlayerChuanma = seat => {
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
    // -------------------------------------------
    let points = calcFanChuanma(seat, zimo);
    let sudian = calcSudianChuanma(points);
    let val = 0;
    for (let i in points.fans)
        val += points.fans[i].val;
    // -------------------------------------------
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
            fans: [{val: 0, id: 9000}],
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
    // ---------------------------------------------------
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

/**
 * huleOnePlayer 组 - 国标
 *
 * 计算 seat 号玩家的和牌导致的各家点数变动
 * @param {number} seat - 和牌的 seat 号玩家
 * @returns {{}}
 */
let huleOnePlayerGuobiao = seat => {
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
    let hand = player_tiles[seat].slice(), hu_tile;
    hu_tile = hand[hand.length - 1];
    hand.pop();
    // -------------------------------------------
    let points = calcFanGuobiao(seat, zimo);
    let sudian = calcSudianGuobiao(points), sudian_no_huapai = calcSudianGuobiao(points, true);
    let val = 0;
    for (let i in points.fans)
        val += points.fans[i].val;
    // -------------------------------------------
    let zhahu = false, is_cuohu = false;
    if (calcHupai(player_tiles[seat]) === 0)
        zhahu = true;
    // 国标无法听花牌, 所以和拔的花牌一定是诈和
    if (lst_name === 'RecordBaBei' || lst_name === 'RecordAnGangAddGang' && lst_action.data.type === 3)
        zhahu = true;
    if (!is_guobiao_no_8fanfu() && sudian_no_huapai < GB_Qihu * scale_points())
        is_cuohu = true;
    if (cuohu[seat]) // 已错和的玩家再次和牌, 仍然是错和
        is_cuohu = true;

    if (zhahu || is_cuohu) { // 诈和, 错和赔三家各 cuohu_points() * scale_points() 点
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
            fans: zhahu ? [{val: 0, id: 9000}] : points.fans,
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
    } else {
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
    };
};

/**
 * calcFan 组 - 立直
 *
 * 根据牌算番
 * @param {number} seat - 和牌的 seat 号玩家
 * @param {boolean} zimo - 是否是自摸
 * @param {number} fangchong - 放铳玩家的 seat, 只有在 zimo 为 false 有效
 * @returns {{yiman: boolean, fans: {id: number, val: number}[], fu: number, dora_bonus: number}}
 */
const calcFan = (seat, zimo, fangchong) => {
    // 更新返回值
    function updateRet(x) {
        if (calcSudian(ret, 1) < calcSudian(x, 1))
            ret = x;
    }

    let tiles = player_tiles[seat];
    let lastile = tiles[tiles.length - 1];
    let fulu_cnt = 0;
    let ret = {yiman: false, fans: [], fu: 0};
    let cnt = []; // cnt 是仅手牌的数量集合, 不含红宝牌
    for (let i = Cbd; i <= C0s; i++) // 注意这里是 C0s 而不是 C7z, 是因为下面 dfs 要用到 nxt2, 需要从 C7z 扩展到 C0s
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

    // 幻境传说: 庄家卡1: 庄家门清状态下荣和只能是立直状态, 否则诈和
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
        let ans = {yiman: !is_qingtianjing(), fans: [], fu: 25};
        if (liqi_info[seat].yifa !== 0 && liqi_info[seat].liqi === 0 && zimo)
            ans.fans.push({val: 1, id: 9708}); // 十三不搭
        updateRet(ans);
    }
    return ret;

    // 没有百搭牌情况下的算番流程, 分为一般算番(dfs)和国士型
    function normalCalc() {
        dfs(1);
        if (calcHupai(tiles) === 3) {
            let menqing = fulu_cnt === 0;
            let tianhu = false;
            let ans = {yiman: !is_qingtianjing(), fans: [], fu: 25};

            if (liqi_info[seat].yifa !== 0 && liqi_info[seat].liqi === 0)
                if (zimo)
                    if (seat === ju) {
                        ans.fans.push({val: !is_qingtianjing() ? 1 : 13, id: 35}); // 天和
                        tianhu = true;
                    } else
                        ans.fans.push({val: !is_qingtianjing() ? 1 : 13, id: 36}); // 地和
                else if (is_guyi() || is_yifanjieguyi())
                    ans.fans.push({val: !is_qingtianjing() ? 1 : 13, id: 59}); // 人和

            if (menqing && cnt[tile2Int(lastile)] === 1 && !tianhu)
                ans.fans.push({val: !is_qingtianjing() ? 1 : 13, id: 42}); // 国士无双
            if (menqing && (cnt[tile2Int(lastile)] === 2 || tianhu)) {
                let tmp = {val: !is_qingtianjing() ? 2 : 26, id: 49}; // 国士无双十三面
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
                    ans.fans.push({val: !is_qingtianjing() ? 1 : 13, id: 63}); // 石上三年
            }
            updateRet(ans);
        }
    }

    // 深度优先搜索, 对手牌和副露进行划分, 搜索到尽头划分数量达到5或7时, 开始算番
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
        let whatever = [0, 2, 3, 5, 6, 8, 9, 11, 12, 14];
        for (let k in whatever) {
            if (cnt[now] < whatever[k])
                continue;
            cnt[now] -= whatever[k];
            let cnt0 = cnt[now];
            if (whatever[k] % 3 === 2) { // 有对子
                let kezi_num = (whatever[k] - 2) / 3;
                for (let j = 0; j < kezi_num; j++)
                    partition.push({type: 6, tile: [int2Tile(now), int2Tile(now), int2Tile(now)]});
                partition.push({type: 7, tile: [int2Tile(now), int2Tile(now)]});
                dfs(now);
            } else if (whatever[k] % 3 === 0) // 3 的倍数, 全是当成刻子
                for (let j = 0; j < whatever[k] / 3; j++)
                    partition.push({type: 6, tile: [int2Tile(now), int2Tile(now), int2Tile(now)]});

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

    // 算番
    function calc() {
        let cnt2 = []; // cnt2 是包含副露的牌数量集合, 不含红包牌
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
                    updateRet(calc0(2)); // 坎张听符
                else if (tile2Int(lastile) % 9 === 3 && tile2Int(midtile) % 9 === 2)
                    updateRet(calc0(2)); // 边张听符
                else if (tile2Int(lastile) % 9 === 7 && tile2Int(midtile) % 9 === 8)
                    updateRet(calc0(2)); // 边张听符
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
                updateRet(calc0(2)); // 单骑符
        }

        /**
         * 核心算法, 根据所有前置动作计算手牌有哪些番
         *
         * @param {number} tingpaifu - 听牌符数
         * @returns {{yiman: boolean, fans: {id: number, val: number}[], fu: number, dora_bonus: number}}
         */
        function calc0(tingpaifu) {
            /**
             * 删除 ans 中有番为 id 的番
             *
             * @param {number} id - 听牌符数
             */
            function deleteFan(id) {
                for (let i in ans.fans)
                    if (ans.fans[i].id === id) {
                        ans.fans.splice(parseInt(i), 1);
                        break;
                    }
            }

            baopai[seat] = []; // 重置和牌玩家包牌信息
            let tianhu = false;
            let menqing = fulu_cnt === 0;
            // 无青天井情况下默认为 true, 之后再否定
            let ans = {yiman: !is_qingtianjing(), fans: [], fu: 0, dora_bonus: 0};
            // ----------------------------------------------
            // typecnt[i] 的 0-7 下标分别对应对应划分种类的数量
            // 0: 明顺    1: 明刻   2: 明杠   3: 暗杠
            // 4: 北宝    5: 暗顺   6: 暗刻   7: 对子
            let typecnt = [];
            // 刻子, 杠子, 暗刻, 顺子
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

                // 这里的杯口数量算上副露的, 最后在判断是否有效
                beikou += Math.floor(shunzi[i] / 2);

                if (Math.floor(shunzi[i] / 3) >= 1)
                    santongshun = true;
            }
            // ---------------------------
            let flag_ziyise = true, flag_lvyise = true, flag_qinglaotou = true, flag_duanyao = true,
                flag_hunlaotou = true;
            for (let i = C1m; i <= C7z; i++) {
                if (!judgeTile(int2Tile(i), 'H') && cnt2[i] > 0)
                    flag_ziyise = false; // 字一色
                if (!judgeTile(int2Tile(i), 'L') && cnt2[i] > 0)
                    flag_lvyise = false; // 绿一色
                if (!judgeTile(int2Tile(i), 'T') && cnt2[i] > 0)
                    flag_qinglaotou = false; // 清老头
                if (!judgeTile(int2Tile(i), 'D') && cnt2[i] > 0)
                    flag_duanyao = false; // 断幺九
                if (!judgeTile(int2Tile(i), 'Y') && cnt2[i] > 0)
                    flag_hunlaotou = false; // 混老头
            }
            // ---------------------------------
            let wumenqi = true;
            for (let i = 0; i < 5; i++) {
                const wumen_lows = [C1m, C1p, C1s, C1z, C5z], wumen_highs = [C9m, C9p, C9s, C4z, C7z];
                let flag = false;
                for (let j = wumen_lows[i]; j <= wumen_highs[i]; j++)
                    flag = flag || cnt2[j] > 0;
                if (!flag)
                    wumenqi = false;
            }
            // ---------------------------------
            // jiulian[0] 用于判断是否为九莲, jiulian[1] 表示多出来的一张牌
            let jiulian = [false, ''], yiqi = false, hunyise = false, qingyise = false;
            let jlbd = [0, 3, 1, 1, 1, 1, 1, 1, 1, 3];
            for (let k = 0; k <= 2; k++) {
                if (shunzi[k * 9 + 2] >= 1 && shunzi[k * 9 + 5] >= 1 && shunzi[k * 9 + 8] >= 1)
                    yiqi = true;

                jiulian = [true, ''];
                for (let i = C1m; i <= C9m; i++)
                    if (cnt2[k * 9 + i] < jlbd[i]) // 手牌中各种牌数量不满足
                        jiulian = [false, ''];
                    else if (cnt2[k * 9 + i] > jlbd[i]) // 多出来的牌
                        jiulian[1] = int2Tile(k * 9 + i);
                if (jiulian[0])
                    break;
            }
            for (let i = C1m; i <= C7z; i++)
                if (gangzi[i] >= 1) // 九莲不允许有杠子
                    jiulian = [false, ''];

            for (let k = 0; k <= 3; k++) { // 0, 1, 2, 3 分别代表 m, p, s, z
                hunyise = qingyise = true;
                for (let i = C1m; i <= C7z; i++)
                    if (Math.floor((i - 1) / 9) !== k && cnt2[i] > 0) {
                        if (i <= C9s)
                            hunyise = false;
                        qingyise = false;
                    }
                if (hunyise) // 有一个满足, 就跳出
                    break;
            }
            // ----------------------------------
            let sanse = false, sansetongke = false;
            for (let i = C1m; i <= C9m; i++) {
                if (i >= C1m + 1 && i <= C9m - 1)
                    if (shunzi[i] >= 1 && shunzi[i + 9] >= 1 && shunzi[i + 18] >= 1)
                        sanse = true;
                if (kezi[i] >= 1 && kezi[i + 9] >= 1 && kezi[i + 18] >= 1)
                    sansetongke = true;
            }
            // ----------------------------------
            let chunquandai = true, hunquandai = true;
            for (let i = C1m; i <= C7z; i++) {
                // 从顺子和(刻子, 雀头)的角度判断是否有全带, 先顺子后(刻子, 雀头)
                if (i !== C1m + 1 && i !== C9m - 1 && i !== C1p + 1 && i !== C9p - 1 && i !== C1s + 1 && i !== C9s - 1 && shunzi[i] >= 1)
                    chunquandai = hunquandai = false;
                if (i !== C1m && i !== C9m && i !== C1p && i !== C9p && i !== C1s && i < C9s && kezi[i] + typecnt[i][7] >= 1)
                    chunquandai = hunquandai = false;
                if (i >= C1z && i <= C7z && kezi[i] + typecnt[i][7] >= 1)
                    chunquandai = false;
            }
            // ------------------------------------
            let pinghu = true;
            if (duizi_num === 7)
                pinghu = false;
            for (let i = C1m; i <= C7z; i++) {
                if (kezi[i] >= 1) // 有刻子
                    pinghu = false;
                if (typecnt[i][7] === 1) {
                    // 雀头是自风, 场风, 三元
                    if (tile2Int(((seat - ju + player_cnt) % player_cnt + 1).toString() + 'z') === i)
                        pinghu = false;
                    if (tile2Int((chang + 1).toString() + 'z') === i)
                        pinghu = false;
                    if (i >= C5z && i <= C7z)
                        pinghu = false;
                }
            }
            // 顺子两面听判断
            let flag_liangmian = false;
            if ((tile2Int(lastile) - 1) % 9 >= 3) // 数牌4-9
                if (shunzi[tile2Int(lastile) - 1] >= 1) // 顺子的中心比 lastile 小 1
                    flag_liangmian = true;
            if ((tile2Int(lastile) - 1) % 9 <= 5) // 数牌1-6
                if (shunzi[tile2Int(lastile) + 1] >= 1) // 顺子的中心比 lastile 大 1
                    flag_liangmian = true;
            if (!flag_liangmian)
                pinghu = false;
            // -------------------------------------
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

            // -------------------------------------
            // 四种dora: 表dora, 红dora, 拔北dora, 里dora
            let alldoras = [0, 0, 0, 0];
            // 先把拔北给算上, 然后减去
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
                } else {
                    // 幻境传说: 机会卡3
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
                } else {
                    // 幻境传说: 机会卡3
                    if (get_field_spell_mode2() === 3)
                        alldoras[3] += cnt2[tile2Int(li_doras[i])];
                    alldoras[3] += cnt2[dora_nxt[tile2Int(li_doras[i])]];
                }
            }
            // cnt2 不记录红宝牌, 所以不能用 cnt2
            for (let i in tiles)
                if (tiles[i][0] === '0')
                    alldoras[1]++;
            for (let i in fulu[seat])
                for (let j in fulu[seat][i].tile)
                    if (fulu[seat][i].tile[j][0] === '0')
                        alldoras[1]++;

            for (let i in fulu[seat])
                if (fulu[seat][i].type === 4)
                    cnt2[tile2Int(fulu[seat][i].tile[0])]--;

            // 幻境传说: 庄家卡5
            if (get_field_spell_mode1() === 5 && seat === ju && !zimo)
                ans.dora_bonus = alldoras[0] + alldoras[1] + alldoras[3];
            // ------------------------------------
            // ------------------------------------
            // ------------------------------------
            // 自己添加的役种
            if (is_tiandichuangzao() && typecnt[C5z][2] === 1 && typecnt[C5z][7] === 1 && typecnt[C5z][3] === 3) {
                if (!is_qingtianjing()) {
                    ans.fans.push({val: 6, id: 9001}); // 天地创造
                    return ans;
                } else
                    ans.fans.push({val: 0, id: 9001}); // 设为0是防止重复计数
            }
            if (is_wanwushengzhang() && typecnt[C5z + 1][3] === 4 && typecnt[C5z + 1][7] === 1) {
                if (!is_qingtianjing()) {
                    ans.fans.push({val: 6, id: 9002}); // 万物生长
                    return ans;
                } else
                    ans.fans.push({val: 0, id: 9002}); // 设为0是防止重复计数
            }
            // ------------------------------------
            // ------------------------------------
            // ------------------------------------
            if (liqi_info[seat].yifa !== 0 && liqi_info[seat].liqi === 0)
                if (zimo)
                    if (seat === ju) {
                        ans.fans.push({val: !is_qingtianjing() ? 1 : 13, id: 35}); // 天和
                        tianhu = true;
                    } else
                        ans.fans.push({val: !is_qingtianjing() ? 1 : 13, id: 36}); // 地和
                else if (is_guyi() || is_yifanjieguyi())
                    ans.fans.push({val: !is_qingtianjing() ? 1 : 13, id: 59}); // 人和

            if (dasanyuan) {
                if (!is_xuezhandaodi() && !is_wanxiangxiuluo() && !no_normalbaopai()) {
                    let fulusanyuancnt = 0;
                    for (let i in fulu[seat]) {
                        let type = fulu[seat][i].type, t_int = tile2Int(fulu[seat][i].tile[0]);
                        if ((type === 1 || type === 2 || type === 3) && (t_int >= C5z && t_int <= C7z)) {
                            fulusanyuancnt++;
                            if (fulusanyuancnt === 3 && fulu[seat][i].from !== undefined)
                                baopai[seat].push({seat: fulu[seat][i].from, val: 1});
                        }
                    }
                }
                ans.fans.push({val: !is_qingtianjing() ? 1 : 13, id: 37}); // 大三元
            }

            if (menqing && anke_num === 4 && (typecnt[tile2Int(lastile)][7] === 1 || tianhu)) {
                let tmp = {val: !is_qingtianjing() ? 2 : 26, id: 48}; // 四暗刻单骑
                if (no_wyakuman())
                    tmp.val /= 2;
                ans.fans.push(tmp);
            } else if (menqing && anke_num === 4 && anke[tile2Int(lastile)] - gangzi[tile2Int(lastile)] >= 1 && !tianhu)
                ans.fans.push({val: !is_qingtianjing() ? 1 : 13, id: 38}); // 四暗刻

            if (flag_ziyise)
                ans.fans.push({val: !is_qingtianjing() ? 1 : 13, id: 39}); // 字一色
            if (flag_lvyise)
                ans.fans.push({val: !is_qingtianjing() ? 1 : 13, id: 40}); // 绿一色
            if (flag_qinglaotou)
                ans.fans.push({val: !is_qingtianjing() ? 1 : 13, id: 41}); // 清老头

            if (xiaosixi && !dasixi)
                ans.fans.push({val: !is_qingtianjing() ? 1 : 13, id: 43}); // 小四喜

            if (gangzi_num === 4) {
                if (!is_xuezhandaodi() && !is_wanxiangxiuluo() && is_sigangbaopai() && sigang_bao[seat]) {
                    let fulugangzi = 0;
                    for (let i in fulu[seat])
                        if (fulu[seat][i].type === 2 || fulu[seat][i].type === 3) {
                            fulugangzi++;
                            if (fulugangzi === 4 && fulu[seat][i].from !== undefined)
                                baopai[seat].push({seat: fulu[seat][i].from, val: 1});
                        }
                }
                ans.fans.push({val: !is_qingtianjing() ? 1 : 13, id: 44}); // 四杠子
            }

            if (menqing && jiulian[0] && (isEqualTile(lastile, jiulian[1]) || tianhu)) {
                let tmp = {val: !is_qingtianjing() ? 2 : 26, id: 47}; // 纯正九莲宝灯
                if (no_wyakuman())
                    tmp.val /= 2;
                ans.fans.push(tmp);
            }

            if (menqing && jiulian[0] && !isEqualTile(lastile, jiulian[1]) && !tianhu)
                ans.fans.push({val: !is_qingtianjing() ? 1 : 13, id: 45}); // 九莲宝灯

            if (dasixi) {
                if (!is_xuezhandaodi() && !is_wanxiangxiuluo() && !no_normalbaopai()) {
                    let fulusixicnt = 0;
                    for (let i in fulu[seat]) {
                        let type = fulu[seat][i].type, t_int = tile2Int(fulu[seat][i].tile[0]);
                        if ((type === 1 || type === 2 || type === 3) && (t_int >= C1z && t_int <= C4z)) {
                            fulusixicnt++;
                            if (fulusixicnt === 4 && fulu[seat][i].from !== undefined)
                                baopai[seat].push({seat: fulu[seat][i].from, val: no_wyakuman() ? 1 : 2});
                        }
                    }
                }
                let tmp = {val: !is_qingtianjing() ? 2 : 26, id: 50}; // 大四喜
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
                        ans.fans.push({val: !is_qingtianjing() ? 1 : 13, id: 62}); // 大数邻
                    if (cnt2[11] > 0)
                        ans.fans.push({val: !is_qingtianjing() ? 1 : 13, id: 60}); // 大车轮
                    if (cnt2[20] > 0)
                        ans.fans.push({val: !is_qingtianjing() ? 1 : 13, id: 61}); // 大竹林
                }

                if (liqi_info[seat].liqi === 2)
                    if (zimo && paishan.length === wangpai_num && lst_draw_type === 1 || !zimo && paishan.length === wangpai_num)
                        ans.fans.push({val: !is_qingtianjing() ? 1 : 13, id: 63}); // 石上三年
                if (flag_ziyise && duizi_num === 7 && !no_wyakuman()) {
                    deleteFan(39); // 删除字一色
                    let tmp = {val: !is_qingtianjing() ? 2 : 26, id: 64}; // 大七星
                    if (no_wyakuman())
                        tmp.val /= 2;
                    ans.fans.push(tmp);
                }
            }
            // 四连刻, 一色四同顺, 红孔雀, 红一点, 黑一色,
            // 十三不搭, 八连庄, 百万石, 金门桥, 东北新干线, 无发绿一色
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
                    ans.fans.push({val: 1, id: 9703}); // 四连刻
                if (sitongshun)
                    ans.fans.push({val: 1, id: 9704}); // 一色四同顺

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
                    ans.fans.push({val: 1, id: 9705}); // 红孔雀
                if (hongyidian)
                    ans.fans.push({val: 1, id: 9706}); // 红一点
                if (heiyise)
                    ans.fans.push({val: 1, id: 9707}); // 黑一色

                if (seat === ju && lianzhuang_cnt >= 7) // 第8次和牌
                    ans.fans.push({val: 1, id: 46}); // 八连庄

                let wan_qingyise = true;
                for (let i = C1p; i <= C7z; i++)
                    if (cnt2[i] >= 1)
                        wan_qingyise = false;
                if (wan_qingyise) {
                    let sum = 0;
                    for (let i = 1; i <= 9; i++)
                        sum += cnt2[i] * i;
                    if (sum >= 100)
                        ans.fans.push({val: 1, id: 9709}); // 百万石
                }

                let jinmenqiao = false;
                for (let i = 0; i <= 2; i++)
                    if (shunzi[i * 9 + 2] >= 1 && shunzi[i * 9 + 4] >= 1 && shunzi[i * 9 + 6] >= 1 && shunzi[i * 9 + 8] >= 1)
                        jinmenqiao = true;
                if (menqing && jinmenqiao)
                    ans.fans.push({val: 1, id: 9710}); // 金门桥

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
                    ans.fans.push({val: 1, id: 9711}); // 东北新干线

                if (flag_lvyise && cnt2[33] === 0) {
                    deleteFan(40);
                    ans.fans.push({val: 2, id: 9712}); // 无发绿一色
                }
            }

            if (liqi_info[seat].kai && !zimo && liqi_info[fangchong].liqi === 0) { // 开立直
                if (liqi_info[seat].liqi === 1)
                    ans.fans.push({val: 1, id: 9003});
                if (liqi_info[seat].liqi === 2)
                    ans.fans.push({val: 1, id: 9004});
            }

            if (ans.fans.length > 0 && !is_qingtianjing())
                return ans;
            // ------------------------------------
            ans.yiman = false;

            if (liqi_info[seat].yifa !== 0 && liqi_info[seat].liqi === 0 && seat !== ju && !zimo && (is_guyi() || is_yifanjieguyi()))
                if (is_renhumanguan())
                    ans.fans.push({val: 5, id: 65}); // 人和2

            if (is_hunzhiyiji()) {
                if (hunzhiyiji_info[seat].liqi === 1)
                    ans.fans.push({val: 2, id: 804}); // 立直
                if (hunzhiyiji_info[seat].liqi === 2)
                    ans.fans.push({val: 3, id: 805}); // 双立直
                if (hunzhiyiji_info[seat].liqi !== 0 && !hunzhiyiji_info[seat].overload)
                    ans.fans.push({val: 1, id: 30}); // 一发
            } else {
                if (liqi_info[seat].kai) { // 开立直非役满情况
                    if (liqi_info[seat].liqi === 1)
                        ans.fans.push({val: 2, id: 9005}); // 开立直
                    if (liqi_info[seat].liqi === 2)
                        ans.fans.push({val: 3, id: 9006}); // 开两立直
                } else {
                    // 幻境传说: 机会卡5
                    if (get_field_spell_mode2() === 5) {
                        if (liqi_info[seat].liqi === 1)
                            ans.fans.push({val: 2, id: 2}); // 立直
                        if (liqi_info[seat].liqi === 2)
                            ans.fans.push({val: 4, id: 18}); // 两立直
                    } else if (is_beishuizhizhan()) {
                        if (liqi_info[seat].liqi === 1 && liqi_info[seat].beishui_type === 1)
                            ans.fans.push({val: 3, id: 806}); // 真-立直
                        else if (liqi_info[seat].liqi === 2 && liqi_info[seat].beishui_type === 1)
                            ans.fans.push({val: 4, id: 807}); // 真-两立直
                        else if (liqi_info[seat].liqi === 1 && liqi_info[seat].beishui_type === 2)
                            ans.fans.push({val: 5, id: 808}); // 极-立直
                        else if (liqi_info[seat].liqi === 2 && liqi_info[seat].beishui_type === 2)
                            ans.fans.push({val: 6, id: 809}); // 极-两立直
                        else if (liqi_info[seat].liqi === 1)
                            ans.fans.push({val: 1, id: 2}); // 立直
                        else if (liqi_info[seat].liqi === 2)
                            ans.fans.push({val: 2, id: 18}); // 两立直
                    } else {
                        if (liqi_info[seat].liqi === 1)
                            ans.fans.push({val: 1, id: 2}); // 立直
                        if (liqi_info[seat].liqi === 2)
                            ans.fans.push({val: 2, id: 18}); // 两立直
                    }
                }
                // 幻境传说: 机会卡5
                if (get_field_spell_mode2() === 5) {
                    if (liqi_info[seat].liqi !== 0 && liqi_info[seat].yifa !== 0)
                        ans.fans.push({val: 2, id: 30}); // 一发
                } else {
                    if (liqi_info[seat].liqi !== 0 && liqi_info[seat].yifa !== 0 && !no_yifa())
                        ans.fans.push({val: 1, id: 30}); // 一发
                }
            }
            let lstname = getLstAction().name;
            if (is_guyi() || is_yifanjieguyi()) {
                if (lstname === 'RecordDiscardTile' && getLstAction().data.is_liqi)
                    ans.fans.push({val: 1, id: 51}); // 燕返
                if (!zimo && lst_draw_type === 0 && lstname === 'RecordDiscardTile')
                    if (getLstAction(3) !== undefined && (getLstAction(3).name === 'RecordAnGangAddGang' || getLstAction(3).name === 'RecordChiPengGang'))
                        ans.fans.push({val: 1, id: 52}); // 杠振
                if (fulu_cnt === 4)
                    ans.fans.push({val: 1, id: 53}); // 十二落抬
            }
            if (menqing && zimo)
                ans.fans.push({val: 1, id: 1}); // 门前清自摸和

            if (lstname === 'RecordAnGangAddGang')
                ans.fans.push({val: 1, id: 3}); // 枪杠
            if (zimo && lst_draw_type === 0)
                ans.fans.push({val: 1, id: 4}); // 岭上开花
            if (zimo && paishan.length === wangpai_num && lst_draw_type === 1)
                ans.fans.push({val: 1, id: 5}); // 海底摸月
            if (!zimo && paishan.length === wangpai_num)
                ans.fans.push({val: 1, id: 6}); // 河底捞鱼

            if (kezi[C5z] >= 1)
                ans.fans.push({val: kezi[C5z], id: 7}); // 白
            if (kezi[C5z + 1] >= 1)
                ans.fans.push({val: kezi[C5z + 1], id: 8}); // 发
            if (kezi[C7z] >= 1)
                ans.fans.push({val: kezi[C7z], id: 9}); // 中
            if (kezi[tile2Int(((seat - ju + player_cnt) % player_cnt + 1).toString() + 'z')] >= 1)
                ans.fans.push({
                    val: kezi[tile2Int(((seat - ju + player_cnt) % player_cnt + 1).toString() + 'z')],
                    id: 10
                }); // 自风
            if (kezi[tile2Int((chang + 1).toString() + 'z')] >= 1)
                ans.fans.push({val: kezi[tile2Int((chang + 1).toString() + 'z')], id: 11}); // 场风

            if (flag_duanyao && (!no_shiduan() || no_shiduan() && menqing))
                // 幻境传说: 机会卡4
                ans.fans.push({val: get_field_spell_mode2() === 4 ? 3 : 1, id: 12}); // 断幺九

            if (beikou === 1 && menqing)
                ans.fans.push({val: 1, id: 13}); // 一杯口

            if (pinghu && menqing)
                ans.fans.push({val: 1, id: 14}); // 平和

            if (hunquandai && !chunquandai && !flag_hunlaotou)
                ans.fans.push({val: menqing ? 2 : 1, id: 15}); // 混全带幺九

            if (yiqi)
                ans.fans.push({val: menqing ? 2 : 1, id: 16}); // 一气通贯

            if (sanse)
                ans.fans.push({val: menqing ? 2 : 1, id: 17}); // 三色同顺

            if (sansetongke)
                ans.fans.push({val: 2, id: 19}); // 三色同刻

            if (gangzi_num === 3)
                ans.fans.push({val: 2, id: 20}); // 三杠子

            if (kezi_num === 4)
                ans.fans.push({val: 2, id: 21}); // 对对和

            if (anke_num === 3)
                ans.fans.push({val: 2, id: 22}); // 三暗刻

            if (xiaosanyuan)
                ans.fans.push({val: 2, id: 23}); // 小三元

            if (flag_hunlaotou && !flag_qinglaotou)
                ans.fans.push({val: 2, id: 24}); // 混老头

            if (duizi_num === 7)
                ans.fans.push({val: 2, id: 25}); // 七对子

            if ((is_guyi() || is_yifanjieguyi()) && wumenqi)
                ans.fans.push({val: 2, id: 54}); // 五门齐

            if ((is_guyi() || is_yifanjieguyi()) && sanlianke)
                ans.fans.push({val: 2, id: 55}); // 三连刻

            if (chunquandai)
                ans.fans.push({val: menqing ? 3 : 2, id: 26}); // 纯全带幺九

            if (hunyise && !qingyise)
                ans.fans.push({val: menqing ? 3 : 2, id: 27}); // 混一色

            if ((is_guyi() || is_yifanjieguyi()) && santongshun) {
                deleteFan(13); // 删除一杯口
                ans.fans.push({val: menqing ? 3 : 2, id: 56}); // 一色三同顺
            }

            if (beikou === 2 && menqing)
                ans.fans.push({val: 3, id: 28}); // 二杯口

            if (qingyise)
                ans.fans.push({val: menqing ? 6 : 5, id: 29}); // 清一色

            if (is_guyi()) {
                if (zimo && paishan.length === wangpai_num && lst_draw_type === 1 && lastile.substring(0, 2) === '1p') {
                    deleteFan(5); // 删除海底摸月
                    ans.fans.push({val: 5, id: 57}); // 一筒摸月
                }
                if (!zimo && paishan.length === wangpai_num && lastile.substring(0, 2) === '9p') {
                    deleteFan(6); // 删除河底捞鱼
                    ans.fans.push({val: 5, id: 58}); // 九筒捞鱼
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
                    ans.fans.push({val: 1, id: 9700}); // 推不倒
                if (chisanse)
                    ans.fans.push({val: 2, id: 9701}); // 赤三色
                if (sansetongguan)
                    ans.fans.push({val: menqing ? 2 : 1, id: 9702}); // 三色通贯
            }


            if (calcSudian(ans) === -2000)
                return ans;

            // --------------------------------------------------
            // 悬赏番

            if (alldoras[0] !== 0)
                // 幻境传说: 机会卡1
                if (!(get_field_spell_mode2() === 1 && liqi_info[seat].liqi !== 0))
                    ans.fans.push({val: alldoras[0], id: 31}); // 宝牌
            if (alldoras[1] !== 0)
                ans.fans.push({val: alldoras[1], id: 32}); // 红宝牌
            if (alldoras[2] !== 0)
                ans.fans.push({val: alldoras[2], id: 34}); // 北宝牌
            if (liqi_info[seat].liqi !== 0) {
                let times = 1;
                // 幻境传说: 机会卡1
                if (get_field_spell_mode2() === 1 && liqi_info[seat].liqi !== 0)
                    times = 2;
                ans.fans.push({val: alldoras[3] * times, id: 33}); // 里宝牌
            }

            if (is_hunzhiyiji())
                if (!zimo && hunzhiyiji_info[fangchong].liqi !== 0)
                    ans.fans.push({val: 2, id: 803}); // 过载

            if (is_yongchang()) {
                let moqie_bonus = yongchang_data[seat].moqie_bonus;
                let shouqie_bonus = yongchang_data[seat].shouqie_bonus;
                if (moqie_bonus !== 0)
                    ans.fans.push({val: moqie_bonus, id: 801}); // 绯
                if (shouqie_bonus !== 0)
                    ans.fans.push({val: shouqie_bonus, id: 802}); // 苍
            }
            // --------------------------------------------------
            // --------------------------------------------------
            // --------------------------------------------------
            if (duizi_num === 7) { // 七对子固定符数
                ans.fu = 25;
                return ans;
            }
            ans.fu = 20; // 符底
            if (!pinghu)
                ans.fu += tingpaifu; // 听牌型符
            for (let i = C1m; i <= C7z; i++) {
                // 刻子符(幺九/中张, 明刻明杠, 暗杠暗刻)
                if (judgeTile(int2Tile(i), 'Y')) {
                    ans.fu += typecnt[i][1] * 4;
                    ans.fu += typecnt[i][2] * 16;
                    ans.fu += typecnt[i][3] * 32;
                    ans.fu += typecnt[i][6] * 8;
                } else {
                    ans.fu += typecnt[i][1] * 2;
                    ans.fu += typecnt[i][2] * 8;
                    ans.fu += typecnt[i][3] * 16;
                    ans.fu += typecnt[i][6] * 4;
                }
                if (typecnt[i][7] === 1) {
                    // 雀头符, 雀头是自风, 场风, 三元
                    if (no_lianfengsifu()) {
                        if (i === tile2Int(((seat - ju + player_cnt) % player_cnt + 1).toString() + 'z') || i === tile2Int((chang + 1).toString() + 'z'))
                            ans.fu += 2;
                    } else {
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
                ans.fu += 2; // 自摸符
            if (!zimo && menqing)
                ans.fu += 10; // 门前清荣和符
            ans.fu = Math.ceil(ans.fu / 10) * 10;
            if (fulu_cnt !== 0 && ans.fu === 20)
                ans.fu = 30;
            // --------------------------------------------------
            return ans;
        }
    }
};

/**
 * calcFan 组 - 川麻
 *
 * 根据牌算番
 * @param {number} seat - 和牌的 seat 号玩家
 * @param {boolean} zimo - 是否是自摸
 * @param {boolean} [type] - false 表示正常和牌, true 表示查大叫的情况
 * @returns {{fans: {id: number, val: number}[], fu: number}}
 */
const calcFanChuanma = (seat, zimo, type = false) => {
    // 更新返回值
    function updateRet(x) {
        if (calcSudianChuanma(ret, 1) < calcSudianChuanma(x, 1))
            ret = x;
    }

    /**
     * 根据初步算得的番列表, 确定要实际显示哪些番
     *
     * @param {{fans: {id: number, val: number}[], fu: number}} x
     * @returns {{fans: {id: number, val: number}[], fu: number}}
     */
    function ans2Fan(x) {
        let ans = {fans: [], fu: x.fu};
        for (let i = 1019; i >= 1005; i--) {
            if (i === 1014 && x.fans[1020] >= 1) { // 这里 1014 可以换成 1013, 1012
                ans.fans.push({val: x.fans[1020], id: 1020});
                break;
            }
            if (x.fans[i] >= 1) {
                ans.fans.push({val: x.fans[i], id: i});
                break;
            }
            if (i === 1005 && ans.fans.length === 0)
                ans.fans.push({val: x.fans[1003], id: 1003});
        }
        if (x.fans[1000] >= 1)
            ans.fans.push({val: x.fans[1000], id: 1000});
        if (x.fans[1001] >= 1)
            ans.fans.push({val: x.fans[1001], id: 1001});
        if (x.fans[1002] >= 1)
            ans.fans.push({val: x.fans[1002], id: 1002});
        if (x.fans[1004] >= 1)
            ans.fans.push({val: x.fans[1004], id: 1004});
        if (x.fans[1021] >= 1)
            ans.fans.push({val: x.fans[1021], id: 1021});
        return ans;
    }

    let tiles = player_tiles[seat];
    // 手牌少一张, 表示查大叫的情况
    if (tiles.length % 3 === 1 && type) {
        let tingpais = calcTingpai(seat), ret = {fans: [], fu: 0};
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
    let ret = {fans: [], fu: 0};
    if (huazhu(seat))
        return ret;
    let cnt = [];
    for (let i = C1m; i <= C0s; i++) // 注意这里是 C0s 而不是 C7z, 是因为下面 dfs 要用到 nxt2, 需要从 C7z 扩展到 C0s
        cnt[i] = 0;
    for (let i in tiles)
        cnt[tile2Int(tiles[i])]++;
    let partition = [];
    for (let i in fulu[seat]) {
        partition.push(fulu[seat][i]);
        fulu_cnt++;
    }

    dfs(1);
    if (calcHupai(tiles) === 2) { // 七对子只有一种分解方式
        partition = [];
        for (let i = C1m; i <= C9s; i++)
            while (cnt[i] > 0) {
                partition.push({type: 7, tile: [int2Tile(i), int2Tile(i)]});
                cnt[i] -= 2;
            }
        calc();
    }

    return ret;

    // 深度优先搜索, 对手牌和副露进行划分, 搜索到尽头划分数量达到5或7时, 开始算番
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
        let whatever = [0, 2, 3, 5, 6, 8, 9, 11, 12, 14];
        for (let k in whatever) {
            if (cnt[now] < whatever[k])
                continue;
            cnt[now] -= whatever[k];
            let cnt0 = cnt[now];
            if (whatever[k] % 3 === 2) { // 有对子
                let kezi_num = (whatever[k] - 2) / 3;
                for (let j = 0; j < kezi_num; j++)
                    partition.push({type: 6, tile: [int2Tile(now), int2Tile(now), int2Tile(now)]});
                partition.push({type: 7, tile: [int2Tile(now), int2Tile(now)]});
                dfs(now);
            } else if (whatever[k] % 3 === 0)
                for (let j = 0; j < whatever[k] / 3; j++)
                    partition.push({type: 6, tile: [int2Tile(now), int2Tile(now), int2Tile(now)]});

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

    // 算番
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
                    updateRet(calc0(2)); // 坎张听符
                else if (tile2Int(lastile) % 9 === 3 && tile2Int(midtile) % 9 === 2)
                    updateRet(calc0(2)); // 边张听符
                else if (tile2Int(lastile) % 9 === 7 && tile2Int(midtile) % 9 === 8)
                    updateRet(calc0(2)); // 边张听符
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
                updateRet(calc0(2)); // 单骑符
        }

        /**
         * 核心算法, 根据所有前置动作计算手牌有哪些番
         *
         * @param {number} tingpaifu - 听牌符数, 这里没什么用
         * @returns {{fans: {id: number, val: number}[], fu: number}}
         */
        function calc0(tingpaifu) {
            let ans = {fans: [], fu: 0};
            // 0: 明顺    1: 明刻   2: 明杠   3: 暗杠
            // 4: 北宝    5: 暗顺   6: 暗刻   7: 对子
            let typecnt = [[]];
            let kezi = [], gangzi = [], shunzi = [];
            let kezi_num = 0, gangzi_num = 0, duizi_num = 0;
            for (let i = C1m; i <= C9s; i++) {
                typecnt[i] = [0, 0, 0, 0, 0, 0, 0, 0];
                kezi[i] = gangzi[i] = shunzi[i] = 0;
            }
            for (let i in partitiontmp) {
                let tmp_type = partitiontmp[i].type;
                switch (tmp_type) {
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
                if (tmp_type === 1 || tmp_type === 2 || tmp_type === 3 || tmp_type === 6 || tmp_type === 7)
                    typecnt[tile2Int(partitiontmp[i].tile[0])][tmp_type]++;
                if (tmp_type === 0 || tmp_type === 5)
                    typecnt[(tile2Int(partitiontmp[i].tile[0]) + tile2Int(partitiontmp[i].tile[1]) + tile2Int(partitiontmp[i].tile[2])) / 3][tmp_type]++;
            }
            for (let i = C1m; i <= C9s; i++) {
                gangzi_num += gangzi[i];
                kezi_num += kezi[i];
            }
            if (partitiontmp.length === 7)
                duizi_num = 7;
            // --------------------------
            let quandai = true;
            for (let i = C1m; i <= C9s; i++) {
                // 顺子和(刻子, 雀头)
                if (i !== 2 && i !== 8 && i !== 11 && i !== 17 && i !== 20 && i !== 26 && shunzi[i] >= 1)
                    quandai = false;
                if (i !== 1 && i !== 9 && i !== 10 && i !== 18 && i !== 19 && i !== 27 && i < 28 && kezi[i] + typecnt[i][7] >= 1)
                    quandai = false;
            }
            // --------------------------
            let qingyise = false;
            for (let k = 0; k < 3; k++) {
                qingyise = true;
                for (let i = C1m; i <= C9s; i++)
                    if (Math.floor((i - 1) / 9) !== k && cnt2[i] > 0)
                        qingyise = false;
                if (qingyise)
                    break;
            }
            // ---------------------------
            let jiangdui = true;
            for (let i = C1m; i <= C9s; i++)
                if (i !== 2 && i !== 5 && i !== 8 && i !== 11 && i !== 14 && i !== 17 && i !== 20 && i !== 23 && i !== 26 && cnt2[i] > 0)
                    jiangdui = false;
            // ---------------------------
            ans.fans[1000] = 0;
            ans.fans[1003] = 1;
            for (let i = C1m; i <= C9s; i++)
                ans.fans[1000] += Math.floor(cnt2[i] / 4); // 根
            if (!type && zimo && getLstAction(2) !== undefined && (getLstAction(2).name === 'RecordAnGangAddGang' || getLstAction(2).name === 'RecordChiPengGang'))
                ans.fans[1001] = 1; // 杠上花
            if (!type && !zimo && getLstAction(3) !== undefined && (getLstAction(3).name === 'RecordAnGangAddGang' || getLstAction(3).name === 'RecordChiPengGang'))
                ans.fans[1002] = 1; // 杠上炮
            if (!type && getLstAction().name === 'RecordAnGangAddGang')
                ans.fans[1004] = 1; // 抢杠
            if (kezi_num === 4)
                ans.fans[1005] = 2; // 对对和
            if (qingyise)
                ans.fans[1006] = 3; // 清一色
            if (duizi_num === 7)
                ans.fans[1007] = 3; // 七对子
            if (quandai)
                ans.fans[1008] = 3; // 带幺九
            if (fulu_cnt === 4)
                ans.fans[1009] = 3; // 金钩钓
            if (qingyise && kezi_num === 4)
                ans.fans[1010] = 4; // 清对
            if (jiangdui && kezi_num === 4)
                ans.fans[1011] = 4; // 将对
            if (ans.fans[1000] > 0 && duizi_num === 7) {
                ans.fans[1012] = 4;
                ans.fans[1000]--;
            } // 龙七对
            if (qingyise && duizi_num === 7)
                ans.fans[1013] = 5; // 清七对
            if (qingyise && fulu_cnt === 4)
                ans.fans[1014] = 5; // 清金钩钓
            if (qingyise && ans.fans[1012] === 4)
                ans.fans[1015] = 6; // 清龙七对
            if (gangzi_num === 4) {
                ans.fans[1016] = 6;
                ans.fans[1000] -= 4;
            } // 十八罗汉
            if (qingyise && gangzi_num === 4)
                ans.fans[1017] = 6; // 清十八罗汉
            if (liqi_info[seat].yifa !== 0 && liqi_info[seat].liqi === 0 && zimo)
                if (seat === ju)
                    ans.fans[1018] = 6; // 天和
                else
                    ans.fans[1019] = 6; // 地和
            if (qingyise && quandai)
                ans.fans[1020] = 5; // 清幺九
            if (!type && paishan.length === 0)
                ans.fans[1021] = 1; // 海底捞月

            if (duizi_num === 7) { // 七对子固定符数
                ans.fu = 25;
                return ans2Fan(ans);
            }
            ans.fu = 20; // 符底
            ans.fu += tingpaifu; // 听牌型符
            for (let i = C1m; i <= C9s; i++) {
                // 刻子符(幺九/中张, 明刻明杠, 暗杠暗刻)
                if (judgeTile(int2Tile(i), 'Y')) {
                    ans.fu += typecnt[i][1] * 4;
                    ans.fu += typecnt[i][2] * 16;
                    ans.fu += typecnt[i][3] * 32;
                    ans.fu += typecnt[i][6] * 8;
                } else {
                    ans.fu += typecnt[i][1] * 2;
                    ans.fu += typecnt[i][2] * 8;
                    ans.fu += typecnt[i][3] * 16;
                    ans.fu += typecnt[i][6] * 4;
                }
            }
            if (zimo)
                ans.fu += 2; // 自摸符
            if (!zimo && fulu_cnt === 0)
                ans.fu += 10; // 门前清荣和符
            ans.fu = Math.ceil(ans.fu / 10) * 10;
            if (fulu_cnt !== 0 && ans.fu === 20)
                ans.fu = 30;

            return ans2Fan(ans);
        }
    }
};

/**
 * calcFan 组 - 国标
 *
 * 根据牌算番
 * @param {number} seat - 和牌的 seat 号玩家
 * @param {boolean} zimo - 是否是自摸
 * @returns {{fans: {id: number, val: number}[], fu: number}}
 */
const calcFanGuobiao = (seat, zimo) => {
    // 更新返回值
    function updateRet(x) {
        if (calcSudianGuobiao(ret) < calcSudianGuobiao(x))
            ret = x;
    }

    let tiles = player_tiles[seat];
    let lastile = tiles[tiles.length - 1];
    let fulu_cnt = 0;
    let ret = {fans: [], fu: 0};
    let cnt = [];
    for (let i = C1m; i <= C0s; i++) // 注意这里是 C0s 而不是 C7z, 是因为下面 dfs 要用到 nxt2, 需要从 C7z 扩展到 C0s
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
        let ans = {fans: [], fu: 25};
        ans.fans.push({val: 88, id: 8006}); // 十三幺

        let ban_zimo = false;
        // 天地人和
        if (liqi_info[seat].yifa !== 0 && liqi_info[seat].liqi === 0 && seat === ju && zimo) {
            ans.fans.push({val: 8, id: 8083}); // 天和
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
            ans.fans.push({val: 8, id: 8084}); // 地和

        // 在立直麻将中人和的基础上添加亲家的下一家没有一发(因为国标没有立直, 所以任何情况下切牌后都没有一发)
        if (liqi_info[seat].yifa !== 0 && liqi_info[seat].liqi === 0 && seat !== ju && zimo) {
            ans.fans.push({val: 8, id: 8085}); // 人和
            ban_zimo = true;
        } else if (liqi_info[seat].yifa !== 0 && liqi_info[seat].liqi === 0 && seat !== ju && !zimo && liqi_info[(ju + 1) % player_cnt].yifa === 0)
            ans.fans.push({val: 8, id: 8085}); // 人和

        if (paishan.length === 0)
            if (zimo) {
                ans.fans.push({val: 8, id: 8043}); // 妙手回春
                ban_zimo = true;
            } else
                ans.fans.push({val: 8, id: 8044}); // 海底捞月
        if (getLstAction().name === 'RecordAnGangAddGang')
            ans.fans.push({val: 8, id: 8046}); // 抢杠和
        else {
            let lastile_num = 0;
            for (let i = 0; i < player_cnt; i++) {
                for (let j in paihe[i].tiles) // 查牌河, 注意被鸣走的牌还在 paihe 中
                    if (isEqualTile(lastile, paihe[i].tiles[j]))
                        lastile_num++;
                for (let j in fulu[i])  // 查副露
                    if (fulu[i][j].from !== undefined)
                        for (let k = 0; k < fulu[i][j].tile.length - 1; k++) // -1 是要剔除掉被鸣走的牌
                            if (isEqualTile(lastile, fulu[i][j].tile[k]))
                                lastile_num++;
            }
            if (lastile_num === 4 || lastile_num === 3 && zimo)
                ans.fans.push({val: 4, id: 8057}); // 和绝张
        }
        if (zimo && !ban_zimo)
            ans.fans.push({val: 1, id: 8081}); // 自摸

        updateRet(ans);
    }
    if (result === 4 || result === 5) { // 一定是全不靠或七星不靠
        let qixingbukao = true;
        for (let i = C1z; i <= C7z; i++)
            if (cnt[i] === 0)
                qixingbukao = false;

        let ans = {fans: [], fu: 25};
        if (qixingbukao)
            ans.fans.push({val: 24, id: 8019}); // 七星不靠
        else if (result === 5) { // 有组合龙
            ans.fans.push({val: 12, id: 8033}); // 全不靠
            ans.fans.push({val: 12, id: 8034}); // 组合龙
        } else
            ans.fans.push({val: 12, id: 8033}); // 全不靠
        updateRet(ans);
    }
    if (result >= 6 && result <= 11) { // 没有全不靠的组合龙
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
            partition.push({type: 9, tile: new_shunzi});
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

        ret.fans.push({val: 12, id: 8034}); // 组合龙
        ret.fu = 25;
    }
    return ret;

    // 深度优先搜索, 对手牌和副露进行划分, 搜索到尽头划分数量达到5或7时, 开始算番
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
        let whatever = [0, 2, 3];
        for (let k = 0; k < 3; k++) {
            if (cnt[now] < whatever[k])
                continue;
            cnt[now] -= whatever[k];
            let cnt0 = cnt[now];
            if (k === 1) {
                partition.push({type: 7, tile: [int2Tile(now), int2Tile(now)]});
                dfs(now);
            } else if (k === 2)
                partition.push({type: 6, tile: [int2Tile(now), int2Tile(now), int2Tile(now)]});
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

    // 算番
    function calc() {
        let cnt2 = [];
        for (let i = C1m; i <= C7z; i++)
            cnt2[i] = 0;
        let partitiontmp = partition.slice();
        for (let i = partitiontmp.length - 1; i >= 0; i--) {
            let tiles = partitiontmp[i].tile;
            // 新增 9 分类, 用于组合龙
            if (partitiontmp[i].type === 0 || partitiontmp[i].type === 5 || partitiontmp[i].type === 9)
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
                    updateRet(calc0(2)); // 坎张听符
                else if (tile2Int(lastile) % 9 === 3 && tile2Int(midtile) % 9 === 2)
                    updateRet(calc0(2)); // 边张听符
                else if (tile2Int(lastile) % 9 === 7 && tile2Int(midtile) % 9 === 8)
                    updateRet(calc0(2)); // 边张听符
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
                updateRet(calc0(2)); // 单骑符
            if (type === 9)
                updateRet(calc0(0)); // 组合龙
        }

        /**
         * 核心算法, 根据所有前置动作计算手牌有哪些番
         *
         * @param {number} tingpaifu - 听牌符数, 这里没什么用
         * @returns {{fans: {id: number, val: number}[], fu: number}}
         */
        function calc0(tingpaifu) {
            /**
             * ban 掉 ids 中 id 的番
             *
             * @param {number|number[]} ids - ban 番列表
             */
            function banFan(ids) {
                if (typeof ids == 'number')
                    ids = [ids];
                for (let i in ids)
                    ban_num[ids[i] - 8000] = true;
            }

            /**
             * id 番是否已被 ban
             *
             * @param {number} id - 查询番的 id
             */
            function isBanned(id) {
                return ban_num[id - 8000];
            }

            let menqing = fulu_cnt === 0;
            // 不计列表
            let ban_num = [];
            for (let i = 0; i < 100; i++)
                ban_num[i] = false;
            // 指定数量的不计幺九刻计数
            let ban_yaojiuke_num = 0;

            let ans = {fans: [], fu: 0};
            // 0: 明顺    1: 明刻   2: 明杠   3: 暗杠
            // 4: 北宝    5: 暗顺   6: 暗刻   7: 对子
            let typecnt = [[]];
            // 刻子, 杠子, 暗刻, 顺子
            let kezi = [], gangzi = [], anke = [], shunzi = [];
            let kezi_num = 0, gangzi_num = 0, anke_num = 0, duizi_num = 0;
            let minggang_num = 0;
            let angang_num = 0;

            for (let i = C1m; i <= C7z; i++) {
                typecnt[i] = [0, 0, 0, 0, 0, 0, 0, 0, 0];
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
                    case 9:
                        banFan(8042); // 有类型9, 则是在组合龙内, ban 无番和
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
                minggang_num += typecnt[i][2];
                angang_num += typecnt[i][3];

                if (i >= C1m + 1 && i <= C9m - 1 || i >= C1p + 1 && i <= C9p - 1 || i >= C1s + 1 && i <= C9s - 1)
                    if (kezi[i - 1] >= 1 && kezi[i] >= 1 && kezi[i + 1] >= 1)
                        sanlianke = true;
                // 这里的杯口数量算上副露的, 最后在判断是否有效
                beikou += Math.floor(shunzi[i] / 2);

                if (shunzi[i] === 3)
                    santongshun = true;
            }

            if (partitiontmp.length === 7)
                duizi_num = 7;
            // --------------------------
            // --------------------------
            // --------------------------
            let flag_ziyise = true, flag_lvyise = true, flag_qinglaotou = true, flag_duanyao = true,
                flag_hunlaotou = true;
            for (let i = C1m; i <= C7z; i++) {
                if (!judgeTile(int2Tile(i), 'H') && cnt2[i] > 0)
                    flag_ziyise = false; // 字一色
                if (!judgeTile(int2Tile(i), 'L') && cnt2[i] > 0)
                    flag_lvyise = false; // 绿一色
                if (!judgeTile(int2Tile(i), 'T') && cnt2[i] > 0)
                    flag_qinglaotou = false; // 清老头
                if (!judgeTile(int2Tile(i), 'D') && cnt2[i] > 0)
                    flag_duanyao = false; // 断幺九
                if (!judgeTile(int2Tile(i), 'Y') && cnt2[i] > 0)
                    flag_hunlaotou = false; // 混老头
            }
            // ---------------------------------
            let wumenqi = true;
            for (let i = 0; i < 5; i++) {
                const wumen_lows = [C1m, C1p, C1s, C1z, C5z], wumen_highs = [C9m, C9p, C9s, C4z, C7z];
                let flag = false;
                for (let j = wumen_lows[i]; j <= wumen_highs[i]; j++)
                    flag = flag || cnt2[j] > 0;
                if (!flag)
                    wumenqi = false;
            }
            // ---------------------------------
            let jiulian = false, yiqi = false, hunyise = false, qingyise = false;
            let jlbd = [0, 3, 1, 1, 1, 1, 1, 1, 1, 3];
            for (let k = 0; k <= 2; k++) {
                if (shunzi[k * 9 + 2] >= 1 && shunzi[k * 9 + 5] >= 1 && shunzi[k * 9 + 8] >= 1)
                    yiqi = true;

                jiulian = true;
                for (let i = 1; i <= 9; i++)
                    if (cnt2[k * 9 + i] < jlbd[i]) // 手牌中各种牌数量不满足
                        jiulian = false;
                    else if (cnt2[k * 9 + i] > jlbd[i] && lastile !== int2Tile(k * 9 + i)) // 多出来的牌
                        jiulian = false;
                if (jiulian)
                    break;
            }
            for (let i = C1m; i <= C7z; i++)
                if (gangzi[i] >= 1) // 九莲不允许有杠子
                    jiulian = false;
            // --------------------------
            for (let k = 0; k <= 3; k++) {
                hunyise = qingyise = true;
                for (let i = C1m; i <= C7z; i++)
                    if (Math.floor((i - 1) / 9) !== k && cnt2[i] > 0) {
                        if (i <= C9s)
                            hunyise = false;
                        qingyise = false;
                    }
                if (hunyise) // 有一个满足, 就跳出
                    break;
            }
            // --------------------------
            let santongke = false, shuangtongke = false;
            for (let i = 1; i <= 9; i++) {
                if (kezi[i] >= 1 && kezi[i + 9] >= 1 && kezi[i + 18] >= 1)
                    santongke = true;
                else if (kezi[i] >= 1 && kezi[i + 9] >= 1 || kezi[i] >= 1 && kezi[i + 18] >= 1 || kezi[i + 9] >= 1 && kezi[i + 18] >= 1)
                    shuangtongke = true;
            }
            // --------------------------
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
            // --------------------------
            let hunquandai = true;
            for (let i = C1m; i <= C7z; i++) {
                // 从顺子和(刻子, 雀头)的角度判断是否有全带, 先顺子后(刻子, 雀头)
                if (i !== C1m + 1 && i !== C9m - 1 && i !== C1p + 1 && i !== C9p - 1 && i !== C1s + 1 && i !== C9s - 1 && shunzi[i] >= 1)
                    hunquandai = false;
                if (i !== C1m && i !== C9m && i !== C1p && i !== C9p && i !== C1s && i < C9s && kezi[i] + typecnt[i][7] >= 1)
                    hunquandai = false;
            }
            // --------------------------
            let pinghu = true;
            if (duizi_num === 7)
                pinghu = false;
            for (let i = C1m; i <= C7z; i++)
                if (kezi[i] >= 1 || typecnt[i][7] === 1 && i >= 28 && i <= 34) { // 有刻子或雀头是字牌
                    pinghu = false;
                    break;
                }
            // --------------------------
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
            // ---------------------------
            // ---------------------------
            // ---------------------------
            if (angang_num === 1 && gangzi_num === 2)
                ans.fans.push({val: 5, id: 8082}); // 明暗杠
            // --------------------------
            // 天地人和
            if (liqi_info[seat].yifa !== 0 && liqi_info[seat].liqi === 0 && seat === ju && zimo) {
                ans.fans.push({val: 8, id: 8083}); // 天和
                // 不计 不求人, 自摸, 边张, 坎张, 单钓将
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
                ans.fans.push({val: 8, id: 8084}); // 地和
                // 不计 门前清
                banFan(8063);
            }

            // 在立直麻将中人和的基础上添加亲家的下一家没有一发(因为国标没有立直, 所以任何情况下切牌后都没有一发)
            if (liqi_info[seat].yifa !== 0 && liqi_info[seat].liqi === 0 && seat !== ju) {
                if (zimo) {
                    ans.fans.push({val: 8, id: 8085}); // 人和
                    // 不计 不求人, 自摸
                    banFan([8055, 8081]);
                } else if (liqi_info[(ju + 1) % player_cnt].yifa === 0) {
                    ans.fans.push({val: 8, id: 8085}); // 人和
                    // 不计 门前清
                    banFan(8063);
                }
            }
            // --------------------------
            // --------------------------
            // --------------------------
            // 88 番, 十三幺不在 calc 函数中, 另算
            if (dasixi && !isBanned(8000)) {
                ans.fans.push({val: 88, id: 8000}); // 大四喜
                // 不计 三风刻, 碰碰和, 圈风刻, 门风刻, 幺九刻
                banFan([8037, 8047, 8061, 8062, 8074]);
            }
            if (dasanyuan && !isBanned(8001)) {
                ans.fans.push({val: 88, id: 8001}); // 大三元
                // 不计 双箭刻, 箭刻, 组成大三元的三副刻子不计幺九刻
                banFan([8053, 8058, 8059, 8060]);
                ban_yaojiuke_num += 3;
            }
            if (flag_lvyise && !isBanned(8002)) {
                ans.fans.push({val: 88, id: 8002}); // 绿一色
                // 不计 混一色
                banFan(8048);
            }
            // 国标中的九莲对标立直麻将中的纯九
            if (jiulian && !isBanned(8003)) {
                ans.fans.push({val: 88, id: 8003}); // 九莲宝灯
                // 不计 清一色, 不求人, 门前清, 无字, 一个幺九刻
                banFan([8021, 8055, 8063, 8077]);
                ban_yaojiuke_num++;
            }
            if (gangzi_num === 4 && !isBanned(8004)) {
                ans.fans.push({val: 88, id: 8004}); // 四杠
                // 不计 碰碰和, 单钓将
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
                ans.fans.push({val: 88, id: 8005}); // 连七对
                // 不计 清一色, 七对, 不求人, 门前清, 无字, 单钓将
                banFan([8021, 8018, 8055, 8063, 8077, 8080]);
            }
            // ---------------------------
            // 64 番
            if (flag_qinglaotou && !isBanned(8007)) {
                ans.fans.push({val: 64, id: 8007}); // 清幺九
                // 不计 混幺九, 碰碰和, 全带幺, 双同刻, 幺九刻, 无字
                banFan([8017, 8047, 8054, 8066, 8074, 8077]);
            }
            if (xiaosixi && !isBanned(8008)) {
                ans.fans.push({val: 64, id: 8008}); // 小四喜
                // 不计 三风刻, 幺九刻
                banFan([8037, 8074]);
            }
            if (xiaosanyuan && !isBanned(8009)) {
                ans.fans.push({val: 64, id: 8009}); // 小三元
                // 不计 箭刻, 双箭刻, 组成小三元的两副刻子不计幺九刻
                banFan([8058, 8059, 8060, 8053]);
                ban_yaojiuke_num += 2;
            }
            if (flag_ziyise && !isBanned(8010)) {
                ans.fans.push({val: 64, id: 8010}); // 字一色
                // 不计 混幺九, 碰碰和, 全带幺, 幺九刻
                // 此外删除判断漏洞的混一色
                banFan([8017, 8047, 8054, 8074, 8048]);
            }
            if (anke_num === 4 && !isBanned(8011)) {
                ans.fans.push({val: 64, id: 8011}); // 四暗刻
                // 不计 碰碰和, 不求人, 门前清
                banFan([8047, 8055, 8063]);
            }

            let shuanglonghui = false;
            for (let i = 0; i <= 2; i++)
                if (shunzi[2 + i] >= 2 && shunzi[8 + i] >= 2 && typecnt[5 + i][7] >= 1)
                    shuanglonghui = true;

            if (shuanglonghui && !isBanned(8012)) {
                ans.fans.push({val: 64, id: 8012}); // 一色双龙会
                // 不计 七对, 清一色, 平和, 一般高, 老少副, 无字
                banFan([8018, 8021, 8064, 8070, 8073, 8077]);
            }
            // ---------------------------
            // 48 番
            let sitongshun = false, sijiegao = false;
            for (let i = 0; i <= 2; i++)
                for (let j = 1; j <= 9; j++) {
                    if (j !== 1 && j !== 9 && shunzi[i * 9 + j] >= 4)
                        sitongshun = true;
                    if (j <= 6 && kezi[i * 9 + j] >= 1 && kezi[i * 9 + j + 1] >= 1 && kezi[i * 9 + j + 2] >= 1 && kezi[i * 9 + j + 3] >= 1)
                        sijiegao = true;
                }
            if (sitongshun && !isBanned(8013)) {
                ans.fans.push({val: 48, id: 8013}); // 一色四同顺
                // 不计 一色三同顺, 一色三节高, 七对, 四归一, 一般高
                banFan([8022, 8023, 8018, 8065, 8070]);
            }
            if (sijiegao && !isBanned(8014)) {
                ans.fans.push({val: 48, id: 8014}); // 一色四节高
                // 不计 一色三同顺, 一色三节高, 碰碰和
                banFan([8022, 8023, 8047]);
            }
            // ---------------------------
            // 32 番
            let sibugao = false;
            for (let i = 0; i <= 2; i++) {
                for (let j = 2; j <= 5; j++)
                    if (shunzi[i * 9 + j] >= 1 && shunzi[i * 9 + j + 1] >= 1 && shunzi[i * 9 + j + 2] >= 1 && shunzi[i * 9 + j + 3] >= 1)
                        sibugao = true;

                if (shunzi[i * 9 + 2] >= 1 && shunzi[i * 9 + 4] >= 1 && shunzi[i * 9 + 6] >= 1 && shunzi[i * 9 + 8] >= 1)
                    sibugao = true;
            }
            if (sibugao && !isBanned(8015)) {
                ans.fans.push({val: 32, id: 8015}); // 一色四步高
                // 不计 一色三步高, 连六, 老少副
                banFan([8029, 8072, 8073]);
            }
            if (gangzi_num === 3)
                ans.fans.push({val: 32, id: 8016}); // 三杠
            if (flag_hunlaotou && !flag_qinglaotou && !isBanned(8017)) {
                ans.fans.push({val: 32, id: 8017}); // 混幺九
                // 不计 碰碰和, 全带幺, 幺九刻
                banFan([8047, 8054, 8074]);
            }
            // ---------------------------
            // 24 番
            // 七星不靠不在 calc 函数中, 另算
            if (duizi_num === 7 && !isBanned(8018)) {
                ans.fans.push({val: 24, id: 8018}); // 七对
                // 不计 不求人, 门前清, 单钓将
                banFan([8055, 8063, 8080]);
            }
            let quanshuangke = true;
            for (let i = C1m; i <= C7z; i++)
                if (!judgeTile(int2Tile(i), 'quanshuang') && cnt2[i] >= 1)
                    quanshuangke = false;
            if (duizi_num >= 2) // 不能是七对
                quanshuangke = false;
            if (quanshuangke && !isBanned(8020)) {
                ans.fans.push({val: 24, id: 8020}); // 全双刻
                // 不计 碰碰和, 断幺, 无字
                banFan([8047, 8069, 8077]);
            }
            if (qingyise && !isBanned(8021)) {
                ans.fans.push({val: 24, id: 8021}); // 清一色
                // 不计 无字
                banFan(8077);
            }

            if (santongshun && !isBanned(8022)) {
                ans.fans.push({val: 24, id: 8022}); // 一色三同顺
                // 不计 一色三节高, 一般高
                banFan([8023, 8070]);
            }

            let sanjiegao = false;
            for (let j = 0; j <= 2; j++)
                for (let i = 1; i <= 7; i++)
                    if (kezi[j * 9 + i] >= 1 && kezi[j * 9 + i + 1] >= 1 && kezi[j * 9 + i + 2] >= 1)
                        sanjiegao = true;
            if (sanjiegao && !isBanned(8023)) {
                ans.fans.push({val: 24, id: 8023}); // 一色三节高
                // 不计一色三同顺
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
                ans.fans.push({val: 24, id: 8024}); // 全大
                // 不计 大于五, 无字
                banFan([8035, 8077]);
            }
            if (quanzhong && !isBanned(8025)) {
                ans.fans.push({val: 24, id: 8025}); // 全中
                // 不计 断幺, 无字
                banFan([8069, 8077]);
            }
            if (quanxiao && !isBanned(8026)) {
                ans.fans.push({val: 24, id: 8026}); // 全小
                // 不计 小于五, 无字
                banFan([8036, 8077]);
            }
            // ---------------------------
            // 16 番
            if (yiqi && !isBanned(8027)) {
                ans.fans.push({val: 16, id: 8027}); // 清龙
                // 不计 连六, 老少副
                banFan([8072, 8073]);
            }
            let sanseshuanglonghui = false;
            for (let i = 0; i < 3; i++)
                if (shunzi[2 + 9 * ((i + 1) % 3)] >= 1 && shunzi[8 + 9 * ((i + 1) % 3)] >= 1)
                    if (shunzi[2 + 9 * ((i + 2) % 3)] >= 1 && shunzi[8 + 9 * ((i + 2) % 3)] >= 1)
                        if (typecnt[5 + 9 * i][7] >= 1)
                            sanseshuanglonghui = true;
            if (sanseshuanglonghui && !isBanned(8028)) {
                ans.fans.push({val: 16, id: 8028}); // 三色双龙会
                // 不计 喜相逢, 老少副, 无字, 平和
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
                ans.fans.push({val: 16, id: 8029}); // 一色三步高
            let quandaiwu = true;
            for (let i = C1m; i <= C7z; i++) {
                if (!(i >= 4 && i <= 6) && !(i >= 13 && i <= 15) && !(i >= 22 && i <= 24) && shunzi[i] >= 1)
                    quandaiwu = false;
                if (i !== C5m && i !== C5p && i !== C5s)
                    if (kezi[i] >= 1 || typecnt[i][7] >= 1)
                        quandaiwu = false;
            }
            if (quandaiwu && !isBanned(8030)) {
                ans.fans.push({val: 16, id: 8030}); // 全带五
                // 不计 断幺, 无字
                banFan([8069, 8077]);
            }

            if (santongke && !isBanned(8031)) {
                ans.fans.push({val: 16, id: 8031}); // 三同刻
                // 不计 双同刻
                banFan(8066);
            }
            if (anke_num === 3 && !isBanned(8032))
                ans.fans.push({val: 16, id: 8032}); // 三暗刻
            // ---------------------------
            // 12 番
            // 全不靠和组合龙不在 calc 函数中, 另算
            let dayuwu = true, xiaoyuwu = true;
            for (let i = C1m; i <= C7z; i++) {
                if (!judgeTile(int2Tile(i), 'dayuwu') && cnt2[i] >= 1)
                    dayuwu = false;
                if (!judgeTile(int2Tile(i), 'xiaoyuwu') && cnt2[i] >= 1)
                    xiaoyuwu = false;
            }
            if (dayuwu && !isBanned(8035)) {
                ans.fans.push({val: 12, id: 8035}); // 大于五
                // 不计 无字
                banFan(8077);
            }
            if (xiaoyuwu && !isBanned(8036)) {
                ans.fans.push({val: 12, id: 8036}); // 小于五
                // 不计 无字
                banFan(8077);
            }
            let sanfengke = false;
            for (let i = 0; i < 4; i++)
                if (kezi[C1z + i] >= 1 && kezi[C1z + (i + 1) % 4] >= 1 && kezi[C1z + (i + 2) % 4] >= 1)
                    sanfengke = true;
            if (sanfengke && !xiaosixi && !isBanned(8037)) {
                ans.fans.push({val: 12, id: 8037}); // 三风刻
                // 组成三风刻的三副刻子不计幺九刻
                ban_yaojiuke_num += 3;
            }
            // ---------------------------
            // 8 番, 无番和放到最后
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
                ans.fans.push({val: 8, id: 8038}); // 花龙
                // 还有喜相逢时, 删除连六和老少副
                if (ersetongshun_num >= 1)
                    banFan([8072, 8073]);
            }

            let tuibudao = true;
            for (let i = C1m; i <= C7z; i++)
                if (!judgeTile(int2Tile(i), 'tuibudao') && cnt2[i] >= 1)
                    tuibudao = false;

            if (tuibudao && !isBanned(8039)) {
                ans.fans.push({val: 8, id: 8039}); // 推不倒
                // 不计 缺一门
                banFan(8076);
            }

            if (sansetongshun && !isBanned(8040)) {
                ans.fans.push({val: 8, id: 8040}); // 三色三同顺
                // 不计 喜相逢
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
                ans.fans.push({val: 8, id: 8041}); // 三色三节高
            if (paishan.length === 0) {
                if (zimo && !isBanned(8043)) {
                    ans.fans.push({val: 8, id: 8043}); // 妙手回春
                    // 不计 自摸
                    banFan(8081);
                } else if (!isBanned(8044))
                    ans.fans.push({val: 8, id: 8044}); // 海底捞月
            }
            if (zimo && lst_draw_type === 0 && !isBanned(8045) && getLstAction(2).name !== 'RecordBaBei') {
                ans.fans.push({val: 8, id: 8045}); // 杠上开花
                // 不计 自摸
                banFan(8081);
            }
            if (getLstAction().name === 'RecordAnGangAddGang' && !isBanned(8046)) {
                ans.fans.push({val: 8, id: 8046}); // 抢杠和
                // 不计 和绝张
                banFan(8057);
            }
            // ---------------------------
            // 6 番
            if (kezi_num === 4 && !isBanned(8047))
                ans.fans.push({val: 6, id: 8047}); // 碰碰和
            if (hunyise && !qingyise && !isBanned(8048))
                ans.fans.push({val: 6, id: 8048}); // 混一色
            let sansesanbugao = false;
            for (let i = 2; i <= 6; i++)
                for (let j = 0; j < 3; j++)
                    for (let k = 0; k < 3; k++)
                        for (let l = 0; l < 3; l++)
                            if (j !== k && j !== k && k !== l)
                                if (shunzi[i + j] >= 1 && shunzi[i + k + 9] >= 1 && shunzi[i + l + 18] >= 1)
                                    sansesanbugao = true;

            if (sansesanbugao && !isBanned(8049))
                ans.fans.push({val: 6, id: 8049}); // 三色三步高
            if (wumenqi && !isBanned(8050))
                ans.fans.push({val: 6, id: 8050}); // 五门齐
            let quanqiuren = true;
            if (zimo || fulu_cnt !== 4)
                quanqiuren = false;

            if (quanqiuren && !isBanned(8051)) {
                ans.fans.push({val: 6, id: 8051}); // 全求人
                // 不计 单钓将
                banFan(8080);
            }
            if (angang_num === 2 && !isBanned(8052)) {
                ans.fans.push({val: 6, id: 8052}); // 双暗杠
                // 不计 双暗刻
                banFan(8067);
            }

            let shuangjianke = false;
            for (let i = 0; i < 3; i++)
                if (kezi[C5z + (i + 1) % 3] >= 1 && kezi[C5z + (i + 2) % 3] >= 1)
                    shuangjianke = true;
            if (shuangjianke && !isBanned(8053)) {
                // 不计箭刻, 组成双箭刻的两副刻子不计幺九刻
                banFan([8058, 8059, 8060]);
                ban_yaojiuke_num += 2;
                ans.fans.push({val: 6, id: 8053}); // 双箭刻
            }
            // ---------------------------
            // 4 番
            if (hunquandai && !isBanned(8054))
                ans.fans.push({val: 4, id: 8054}); // 全带幺
            if (menqing && zimo && !isBanned(8055)) {
                // 不计 自摸
                banFan(8081);
                ans.fans.push({val: 4, id: 8055}); // 不求人
            }

            if (minggang_num === 2 && gangzi_num === 2 && !isBanned(8056))
                ans.fans.push({val: 4, id: 8056}); // 双明杠

            let lastile_num = 0;
            for (let i = 0; i < player_cnt; i++) {
                for (let j in paihe[i].tiles) // 查牌河, 注意被鸣走的牌还在 paihe 中
                    if (isEqualTile(lastile, paihe[i].tiles[j]))
                        lastile_num++;
                for (let j in fulu[i])  // 查副露
                    if (fulu[i][j].from !== undefined)
                        for (let k = 0; k < fulu[i][j].tile.length - 1; k++) // -1 是要剔除掉被鸣走的牌
                            if (isEqualTile(lastile, fulu[i][j].tile[k]))
                                lastile_num++;
            }
            if ((lastile_num === 4 || lastile_num === 3 && zimo) && !isBanned(8057))
                ans.fans.push({val: 4, id: 8057}); // 和绝张
            // ---------------------------
            // 2 番
            if (!isBanned(8058))
                for (let i = 0; i < kezi[C5z]; i++) {
                    ans.fans.push({val: 2, id: 8058}); // 箭刻 白
                    // 这副刻子不计幺九刻
                    ban_yaojiuke_num++;
                }
            if (!isBanned(8059))
                for (let i = 0; i < kezi[C5z + 1]; i++) {
                    ans.fans.push({val: 2, id: 8059}); // 箭刻 发
                    // 这副刻子不计幺九刻
                    ban_yaojiuke_num++;
                }
            if (!isBanned(8060))
                for (let i = 0; i < kezi[C7z]; i++) {
                    ans.fans.push({val: 2, id: 8060}); // 箭刻 中
                    // 这副刻子不计幺九刻
                    ban_yaojiuke_num++;
                }

            if (!isBanned(8061))
                for (let i = 0; i < kezi[tile2Int((chang + 1).toString() + 'z')]; i++) {
                    ans.fans.push({val: 2, id: 8061}); // 圈风刻
                    // 这副刻子不计幺九刻
                    ban_yaojiuke_num++;
                }
            if (!isBanned(8062))
                for (let i = 0; i < kezi[tile2Int(((seat - ju + player_cnt) % player_cnt + 1).toString() + 'z')]; i++) {
                    ans.fans.push({val: 2, id: 8062}); // 门风刻
                    // 这副刻子不计幺九刻
                    ban_yaojiuke_num++;
                }

            if (menqing && !zimo && !isBanned(8063))
                ans.fans.push({val: 2, id: 8063}); // 门前清

            if (pinghu && !isBanned(8064)) {
                ans.fans.push({val: 2, id: 8064}); // 平和
                // 不计 无字
                banFan(8077);
            }

            let siguiyi_num = 0;
            for (let i = C1m; i <= C7z; i++)
                if (cnt2[i] === 4 && gangzi[i] === 0)
                    siguiyi_num++;
            if (siguiyi_num >= 1 && !isBanned(8065))
                ans.fans.push({val: 2 * siguiyi_num, id: 8065}); // 四归一

            if (shuangtongke && !isBanned(8066))
                ans.fans.push({val: 2, id: 8066}); // 双同刻

            if (anke_num === 2 && !isBanned(8067))
                ans.fans.push({val: 2, id: 8067}); // 双暗刻
            if (angang_num === 1 && gangzi_num === 1 && !isBanned(8068))
                ans.fans.push({val: 2, id: 8068}); // 暗杠
            if (flag_duanyao && !isBanned(8069)) {
                ans.fans.push({val: 2, id: 8069}); // 断幺
                // 不计 无字
                banFan(8077);
            }
            // ---------------------------
            // 1 番
            if (beikou >= 1 && !isBanned(8070))
                ans.fans.push({val: beikou, id: 8070}); // 一般高
            if (ersetongshun_num >= 1 && !sansetongshun && !isBanned(8071))
                // 有2个一般高的情况下喜相逢最多只会算1个
                ans.fans.push({val: beikou >= 2 ? 1 : ersetongshun_num, id: 8071}); // 一般高

            let lianliu_num = 0;
            for (let j = 0; j <= 2; j++)
                for (let i = 2; i <= 5; i++)
                    if (shunzi[j * 9 + i] >= 1 && shunzi[j * 9 + i + 3] >= 1)
                        lianliu_num++;
            if (lianliu_num >= 1 && !isBanned(8072))
                // 有2个一般高, 喜相逢的情况下连六最多只会算1个
                ans.fans.push({val: beikou >= 2 || ersetongshun_num >= 2 ? 1 : lianliu_num, id: 8072}); // 连六

            let laoshaofu_num = 0;
            for (let j = 0; j <= 2; j++)
                if (shunzi[j * 9 + 2] >= 1 && shunzi[j * 9 + 8] >= 1)
                    if (shunzi[j * 9 + 2] >= 2 && shunzi[j * 9 + 8] >= 2)
                        laoshaofu_num += 2;
                    else
                        laoshaofu_num++;

            if (laoshaofu_num >= 1 && !isBanned(8073))
                // 有2个一般高, 喜相逢的情况下老少副最多只会算1个
                ans.fans.push({val: beikou >= 2 || ersetongshun_num >= 2 ? 1 : laoshaofu_num, id: 8073}); // 老少副

            let yaojiuke_num = -ban_yaojiuke_num;
            for (let i = C1m; i <= C7z; i++)
                if (judgeTile(int2Tile(i), 'Y'))
                    yaojiuke_num += kezi[i];
            if (!isBanned(8074) && yaojiuke_num >= 1)
                ans.fans.push({val: yaojiuke_num, id: 8074}); // 幺九刻

            if (minggang_num === 1 && gangzi_num === 1 && !isBanned(8075))
                ans.fans.push({val: 1, id: 8075}); // 明杠

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
                ans.fans.push({val: 1, id: 8076}); // 缺一门

            let wuzi = true;
            for (let i = C1z; i <= C7z; i++)
                if (cnt2[i] >= 1)
                    wuzi = false;
            if (wuzi && !isBanned(8077))
                ans.fans.push({val: 1, id: 8077}); // 无字

            let cnt_tiles = []; // 只包括手牌的 cnt, cnt2 是包括副露的
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
                if (calcTingpai(seat, true).length === 1) // 严格独听
                    ans.fans.push({val: 1, id: 8078}); // 边张
                tiles.push(lastile);
                cnt[tile2Int(lastile)]++;
            }

            let kanzhang = cnt_tiles[tile2Int(lastile) - 1] >= 1 && cnt_tiles[tile2Int(lastile) + 1] >= 1;
            if (kanzhang && !bianzhang && !isBanned(8079)) {
                cnt[tile2Int(lastile)]--;
                tiles.pop();
                if (calcTingpai(seat, true).length === 1) // 严格独听
                    ans.fans.push({val: 1, id: 8079}); // 坎张
                tiles.push(lastile);
                cnt[tile2Int(lastile)]++;
            }

            let dandiaojiang = true;
            if (typecnt[tile2Int(lastile)][7] !== 1)
                dandiaojiang = false;

            if (dandiaojiang && !kanzhang && !bianzhang && !isBanned(8080)) {
                cnt[tile2Int(lastile)]--;
                tiles.pop();
                if (calcTingpai(seat, true).length === 1) // 严格独听
                    ans.fans.push({val: 1, id: 8080}); // 单钓将
                tiles.push(lastile);
                cnt[tile2Int(lastile)]++;
            }

            if (zimo && !isBanned(8081))
                ans.fans.push({val: 1, id: 8081}); // 自摸
            // ---------------------------
            // ---------------------------
            // ---------------------------
            // 无番和
            if (ans.fans.length === 0 && !isBanned(8042))
                ans.fans.push({val: 8, id: 8042}); // 无番和
            // ---------------------------
            // ---------------------------
            // ---------------------------
            // ---------------------------
            // ---------------------------
            // 花牌
            let huapai_num = 0;
            for (let i in fulu[seat])
                if (fulu[seat][i].type === 4)
                    huapai_num++;
            if (huapai_num >= 1 && huapai_num <= 8)
                ans.fans.push({val: huapai_num, id: 8090 + huapai_num});
            else if (huapai_num >= 9)
                ans.fans.push({val: huapai_num, id: 8099});
            // ---------------------------
            // ---------------------------
            // ---------------------------
            // ---------------------------
            // ---------------------------
            if (duizi_num === 7) { // 七对子固定符数
                ans.fu = 25;
                return ans;
            }
            ans.fu = 20; // 符底
            if (!pinghu)
                ans.fu += tingpaifu; // 听牌型符
            for (let i = C1m; i <= C7z; i++) {
                // 刻子符(幺九/中张, 明刻明杠, 暗杠暗刻)
                if (judgeTile(int2Tile(i), 'Y')) {
                    ans.fu += typecnt[i][1] * 4;
                    ans.fu += typecnt[i][2] * 16;
                    ans.fu += typecnt[i][3] * 32;
                    ans.fu += typecnt[i][6] * 8;
                } else {
                    ans.fu += typecnt[i][1] * 2;
                    ans.fu += typecnt[i][2] * 8;
                    ans.fu += typecnt[i][3] * 16;
                    ans.fu += typecnt[i][6] * 4;
                }
                if (typecnt[i][7] === 1) {
                    // 雀头符, 雀头是自风, 场风, 三元
                    if (i === tile2Int(((seat - ju + player_cnt) % player_cnt + 1).toString() + 'z'))
                        ans.fu += 2;
                    if (i === tile2Int((chang + 1).toString() + 'z'))
                        ans.fu += 2;
                    if (i >= C5z && i <= C7z)
                        ans.fu += 2;
                }
            }
            if (zimo && !pinghu)
                ans.fu += 2; // 自摸符
            if (!zimo && menqing)
                ans.fu += 10; // 门前清荣和符
            ans.fu =
                Math.ceil(ans.fu / 10) * 10;
            if (fulu_cnt !== 0 && ans.fu === 20)
                ans.fu = 30;
            // --------------------------------------------------
            return ans;
        }
    }
};

/**
 * calcSudian 组 - 立直
 *
 * 根据算得的番计算素点
 * @param {{yiman: boolean, fans: {id: number, val: number}[], fu: number}} x - 和牌信息
 * @param {boolean} x.yiman - 是否为役满
 * @param {{id: number, val: number}[]} x.fans - 和牌番数列表, id 是番 id, val 是番数
 * @param {number} x.fu - 和牌符数
 * @param {number} type - 有效值0和1, 0是一般模式, 1表示比较模式, 默认为一般模式
 * @returns {number}
 */
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
        return 6000 + type * (val + x.fu * 0.01)
    else if (val >= 8)
        return 4000 + type * (val + x.fu * 0.01)
    else if (val >= 6)
        return 3000 + type * (val + x.fu * 0.01)
    else if (val >= 5)
        return 2000 + type * (val + x.fu * 0.01)
    else if (is_qieshang() && (val === 4 && x.fu === 30 || val === 3 && x.fu === 60))
        return 2000 + type * (val + x.fu * 0.01)
    else
        return Math.min(Math.pow(2, val + 2) * x.fu, 2000) + type * (val + x.fu * 0.01)
};

/**
 * calcSudian 组 - 川麻
 *
 * 根据算得的番计算素点
 * @param {{fans: {id: number, val: number}[], fu: number}} x - 和牌信息
 * @param {{id: number, val: number}[]} x.fans - 和牌番数列表, id 是番 id, val 是番数
 * @param {number} x.fu - 和牌符数
 * @param {number} type - 有效值0和1, 0是一般模式, 1表示比较模式, 默认为一般模式
 * @returns {number}
 */
const calcSudianChuanma = (x, type = 0) => {
    let val = 0;
    for (let i in x.fans)
        val = val + x.fans[i].val;
    if (val === 0)
        return 0;
    return Math.min(1000 * Math.pow(2, val - 1), 32000) + type * val;
};

/**
 * calcSudian 组 - 国标
 *
 * 根据算得的番计算素点
 * @param {{fans: {id: number, val: number}[], fu: number}} x - 和牌信息
 * @param {{id: number, val: number}[]} x.fans - 和牌番数列表, id 是番 id, val 是番数
 * @param {number} x.fu - 和牌符数
 * @param {boolean} no_huapai - 是否不考虑花牌, 默认考虑
 * @returns {number}
 */
const calcSudianGuobiao = (x, no_huapai = false) => {
    let val = 0;
    for (let i in x.fans)
        if (!(no_huapai && x.fans[i].id >= 8091 && x.fans[i].id <= 8099))
            val = val + x.fans[i].val;
    return val * scale_points();
};

// ========================================================================

/**
 * 川麻刮风下雨
 * @param {boolean} [type] - 是否完场, 默认不完场
 */
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

// 小局结束
const roundEnd = () => {
    if (actions.length === 0)
        return;
    if (is_chuanma() && chuanma_gangs.notover.length !== 0 && getLstAction().name !== 'RecordNoTile' && getLstAction().name !== 'RecordHuleXueZhanEnd')
        calcGangPoint(true);
    begin_tiles = ['', '', '', ''];
    discard_tiles = [[], [], [], []];
    deal_tiles = [[], [], [], []];
    muyu_seats = '';
    paishan = [];

    all_data.actions.push(actions.slice());
    all_data.xun.push(xun.slice());
    xun = [[], [], [], []];
    actions = [];
    if (is_chuanma() && ju_cnt > -1)
        ju = ju_cnt;
    if (ju === player_cnt) {
        chang++;
        ju = 0;
    }
    chang %= player_cnt;

    gameEnd();
};

// 计算终局界面玩家的点数
const gameEnd = () => {
    /**
     * 根据最终点数和座次确定位次的比较算法
     * @param {{part_point_1: number, seat: number}} x - 参数1玩家的信息
     * @param {{part_point_1: number, seat: number}} y - 参数2玩家的信息
     * @returns {number} - 有效值 -1, 0, 1
     */
    function cmp2(x, y) {
        if (x.part_point_1 < y.part_point_1)
            return 1;
        if (x.part_point_1 > y.part_point_1)
            return -1;
        if (x.seat > y.seat)
            return 1;
        if (x.seat < y.seat)
            return -1;
        return 0;
    }

    players = [];
    for (let i = 0; i < player_cnt; i++)
        players.push({
            gold: 0,
            grading_score: 0,
            part_point_1: scores[i],
            part_point_2: 0,
            seat: i,
            total_point: 0,
        });
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

// 辅助函数, chang, ju, ben 转换为控制台输出的所在小局
const roundInfo = () => {
    let chang_word = [`东`, `南`, `西`, `北`];
    return `${chang_word[chang]}${ju + 1}局${ben}本场: `;
};

// ========================================================================
// ============================ 以下是胶水代码 ==============================
// ========================================================================

/**
 * 胶水代码: 开局
 * @param {number} left_tile_count - 剩余牌数
 * @param {string} fake_hash_code - 牌山虚假的 md5 或 sha256 码, 由下面 is_sha256 决定类型
 * @param {{seat: number, tiles: string[], count: number[]}[]} opens - 配牌明牌: 明的牌
 * @param {boolean} is_sha256 - 牌山是否包含起手
 */
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
        }
    })));
    calcXun();
};

/**
 * 胶水代码: 摸牌
 * @param {number} seat - 摸牌的玩家
 * @param {string} draw_card - 摸的牌
 * @param {{liqibang: number, seat: number, scores: number[]}|null} liqi - 刚立直玩家的立直信息
 * @param {boolean} tile_state - 配牌明牌: 摸的牌是否是明牌
 * @param {number} zhanxing_index - 占星之战: 摸的牌在候选池的位置
 * @param {{}|{seat: number, liqi: number, continue_deal_count: number, overload: boolean}} hunzhiyiji_data - 魂之一击: 魂之一击立直数据
 */
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

/**
 * 胶水代码: 占星之战: 牌候选池填充
 * @param {number} seat - 要摸牌的玩家
 * @param {{liqibang: number, seat: number, scores: number[]}|null} liqi - 刚立直玩家的立直信息
 */
let addFillAwaitingTiles = (seat, liqi) => {
    actions.push(JSON.parse(JSON.stringify({
        name: 'RecordFillAwaitingTiles',
        data: {
            operation: {seat: seat},
            awaiting_tiles: awaiting_tiles.slice(),
            left_tile_count: getLeftTileCnt(),
            liqi: liqi ? liqi : undefined,
            doras: calcDoras(),
        }
    })));
};

/**
 * 胶水代码: 切牌
 * @param {number} seat - 切牌的玩家
 * @param {string} tile - 切的牌
 * @param {boolean} moqie - 是否为摸切
 * @param {boolean} is_liqi - 是否立直
 * @param {boolean} is_wliqi - 是否为双立直
 * @param {boolean} is_kailiqi - 是否为开立直
 * @param {boolean} tile_state - 配牌明牌: 切的牌是否为明的牌
 * @param {number} beishui_type - 背水之战: 立直类型
 */
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

/**
 * 胶水代码: 暗夜之战暗牌
 * @param {number} seat - 暗牌的玩家
 * @param {string} tile - 切的牌
 * @param {boolean} moqie - 是否为摸切
 * @param {boolean} is_liqi - 是否立直
 * @param {boolean} is_wliqi - 是否为双立直
 */
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

/**
 * 胶水代码: 暗夜之战锁牌
 * @param {number} seat - 切牌的玩家
 * @param {number} lock_state - 锁定状态, 0 为未锁定, 1 为锁定, 2 为无人开牌
 * @param {string} [tile] - 切的牌
 */
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

/**
 * 胶水代码: 暗夜之战开牌
 * @param {number} seat - 开牌的玩家
 */
let addUnveilTile = seat => {
    actions.push(JSON.parse(JSON.stringify({
        name: 'RecordUnveilTile',
        data: {
            seat: seat,
            scores: scores.slice(),
            liqibang: liqibang,
        }
    })));
};

/**
 * 胶水代码: 他家鸣牌(吃/碰/明杠)
 * @param {number} seat - 鸣牌的玩家
 * @param {string[]} split_tiles - 参与鸣牌的所有牌
 * @param {number[]} froms - 副露的牌来自哪些玩家
 * @param {number} type - 操作类型, 0吃, 1碰, 2明杠
 * @param {{}} liqi - 刚立直玩家的立直信息
 * @param {boolean[]} tile_states - 配牌明牌: 鸣出去的牌是否为明牌
 */
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

/**
 * 胶水代码: 自家鸣牌(暗杠/加杠)
 * @param {number} seat - 鸣牌的玩家
 * @param {string} tile - 鸣的牌
 * @param {number} ming_type - 操作类型, 2加杠, 3暗杠
 * @param {boolean[]} tile_states - 配牌明牌: 鸣出去的牌是否为明牌
 */
let addAnGangAddGang = (seat, tile, ming_type, tile_states) => {
    actions.push(JSON.parse(JSON.stringify({
        name: 'RecordAnGangAddGang',
        data: {
            seat: seat,
            tiles: tile,
            type: ming_type,
            doras: calcDoras(),
            tingpais: is_heqie_mode() ? undefined : calcTingpai(seat),
            tile_states: tile_states,
        }
    })));
};

/**
 * 胶水代码: 自家鸣牌: 拔北
 * @param {number} seat - 拔北的玩家
 * @param {string} tile - 拔的牌
 * @param {boolean[]} tile_states - 配牌明牌: 拔出去的牌是否为明牌
 */
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

/**
 * 胶水代码: 和牌
 * @param {{}[]} hule_info - 本次和牌所有的和牌信息
 * @param {number[]} old_scores - 结算前分数
 * @param {number} baopait - 包牌玩家, 注意和数值比 seat 大1
 */
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

/**
 * 胶水代码: 血战到底(修罗/川麻)中途和牌
 * @param {{}[]} hule_info - 本次和牌所有的和牌信息
 * @param {number[]} old_scores - 结算前分数
 * @param {{}} liqi - 刚立直玩家的立直信息
 */
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

/**
 * 胶水代码: 血战到底(修罗/川麻)完场和牌
 * @param {{}[]} hule_info - 本次和牌所有的和牌信息
 * @param {(number)[]} old_scores - 结算前分数
 */
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

/**
 * 胶水代码: 自创函数: 血流成河中途和牌
 * @param {{}[]} hule_info - 本次和牌所有的和牌信息
 * @param {(number)[]} old_scores - 结算前分数
 */
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

/**
 * 胶水代码: 自创函数: 血流成河完场和牌
 * @param {{}[]} hule_info - 本次和牌所有的和牌信息
 * @param {(number)[]} old_scores - 结算前分数
 */
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

/**
 * 胶水代码: 荒牌流局
 * @param {boolean} liujumanguan - 是否有流局满贯
 * @param {{}[]} ting_info - 玩家的听牌信息
 * @param {{}[]} scores_info - 结算相关信息
 */
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

/**
 * 胶水代码: 途中流局
 * @param {number} type - 流局的类型
 * @param {number} seat - 最后操作的玩家, 只有在九种九牌和三家和了有效
 * @param {{}|null} liqi - 立直信息
 * @param {string[]} [tiles] - 玩家的手牌, 只有在九种九牌有效
 * @param {string[]} allplayertiles - 所有玩家的手牌, 只有在四家立直和三家和了有效
 */
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

/**
 * 胶水代码: 换三张换牌
 * @param {{}[]} change_tile_infos - 换三张主体信息
 * @param {number} type - 换牌方式, 0: 逆时针, 1: 对家, 2: 顺时针
 */
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

/**
 * 胶水代码: 川麻: 定缺
 * @param {number[]} gap_types - 所有玩家的定缺
 */
let addSelectGap = gap_types => {
    actions.push(JSON.parse(JSON.stringify({
        name: 'RecordSelectGap',
        data: {
            gap_types: gap_types,
            tingpai: getAllTingpai(),
        }
    })));
};

/**
 * 胶水代码: 川麻: 刮风下雨
 * @param {number[]} old_scores - 结算前分数
 */
let addGangResult = old_scores => {
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

/**
 * 胶水代码: 川麻: 刮风下雨完场
 * @param {number[]} old_scores - 结算前分数
 */
let addGangResultEnd = old_scores => {
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

/**
 * 胶水代码: 自创函数, 国标错和配打
 * @param {number} seat - 错和的玩家
 * @param {boolean} zimo - 是否为自摸
 * @param {number[]} old_scores - 结算前分数
 */
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

// ========================================================================
// ====================== 以下是 detail_rule 有关设置 =======================
// ========================================================================

/**
 * 回放的桌布, 默认为当前使用的桌布
 * @returns {number}
 */
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

/**
 * 回放的牌背, 默认为当前使用的牌背
 * @returns {number}
 */
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

/**
 * 回放的牌面, 默认为当前使用的牌面
 * @returns {number}
 */
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

/**
 * 初始点数
 * @returns {number}
 */
const get_init_point = () => {
    if (typeof config.mode.detail_rule.init_point == 'number' && config.mode.detail_rule.init_point > -1)
        return config.mode.detail_rule.init_point;
    return -1;
};

/**
 * 红宝牌数量
 * @returns {number}
 */
const get_aka_cnt = () => {
    if (typeof config.mode.detail_rule.dora_count == 'number' && config.mode.detail_rule.dora_count > -1)
        return config.mode.detail_rule.dora_count;
    return -1;
};

/**
 * 番缚, 默认为1
 * @returns {number}
 */
const get_fanfu = () => {
    if (typeof config.mode.detail_rule.fanfu == 'number' && config.mode.detail_rule.fanfu > 1)
        return config.mode.detail_rule.fanfu;
    return 1;
};

// ------------------------------------------------------------------------

/**
 * 牌谱第一局的 chang, ju, ben 和场供中的立直棒个数(最后一个参数可以省略)
 * @returns {number[]}
 */
const get_chang_ju_ben_num = () => {
    if (config.mode.detail_rule._chang_ju_ben_num_ instanceof Array && config.mode.detail_rule._chang_ju_ben_num_.length >= 3)
        return config.mode.detail_rule._chang_ju_ben_num_;
    return [0, 0, 0, 0];
};

/**
 * 第一局各玩家的点数
 * @returns {number[]}
 */
const get_init_scores = () => {
    if (config.mode.detail_rule._scores_ instanceof Array)
        return config.mode.detail_rule._scores_;
    return [];
};

/**
 * 回放的主视角
 * @returns {number}
 */
const get_mainrole_seat = () => {
    if (typeof config.mode.detail_rule._mainrole_ == 'number' && config.mode.detail_rule._mainrole_ > -1)
        return config.mode.detail_rule._mainrole_;
    return -1;
};

// ------------------------------------------------------------------------
/**
 * 是否为修罗之战模式
 * @returns {boolean}
 */
const is_xuezhandaodi = () => config.mode.detail_rule.xuezhandaodi;

/**
 * 是否是赤羽之战模式
 * @returns {boolean}
 */
const is_chuanma = () => config.mode.detail_rule.chuanma;

/**
 * 是否为宝牌狂热模式
 * @returns {boolean}
 */
const is_dora3 = () => config.mode.detail_rule.dora3_mode;

/**
 * 是否为配牌明牌模式
 * @returns {boolean}
 */
const is_begin_open = () => config.mode.detail_rule.begin_open_mode;

/**
 * 是否为龙之目玉模式
 * @returns {boolean}
 */
const is_muyu = () => config.mode.detail_rule.muyu_mode;

/**
 * 是否为明镜之战模式
 * @returns {boolean}
 */
const is_mingjing = () => config.mode.detail_rule.jiuchao_mode;

/**
 * 是否为暗夜之战模式
 * @returns {boolean}
 */
const is_anye = () => config.mode.detail_rule.reveal_discard;

/**
 * 是否为幻境传说模式
 * @returns {boolean}
 */
const is_field_spell = () => typeof config.mode.detail_rule.field_spell_mode == 'number';

/**
 * 获取幻境传说模式的庄家卡
 * @returns {number}
 */
const get_field_spell_mode1 = () => {
    if (!is_field_spell())
        return 0;
    return Math.floor(parseInt(config.mode.detail_rule.field_spell_mode) % 10);
};

/**
 * 获取幻境传说模式的机会卡
 * @returns {number}
 */
const get_field_spell_mode2 = () => {
    if (!is_field_spell())
        return 0;
    return Math.floor((parseInt(config.mode.detail_rule.field_spell_mode) / 100) % 10);
};

/**
 * 获取幻境传说模式的命运卡
 * @returns {number}
 */
const get_field_spell_mode3 = () => {
    if (!is_field_spell())
        return 0;
    return Math.floor(parseInt(config.mode.detail_rule.field_spell_mode) / 10000);
};

/**
 * 是否为占星之战模式
 * @returns {boolean}
 */
const is_zhanxing = () => config.mode.detail_rule.zhanxing;

/**
 * 是否为天命之战模式
 * @returns {boolean}
 */
const is_tianming = () => config.mode.detail_rule.tianming_mode;

/**
 * 是否为咏唱之战模式
 * @returns {boolean}
 */
const is_yongchang = () => config.mode.detail_rule.yongchang_mode;

/**
 * 是否为魂之一击模式
 * @returns {boolean}
 */
const is_hunzhiyiji = () => config.mode.detail_rule.hunzhiyiji_mode;

/**
 * 是否为万象修罗模式
 * @returns {boolean}
 */
const is_wanxiangxiuluo = () => config.mode.detail_rule.wanxiangxiuluo_mode;

/**
 * 是否为背水之战模式
 * @returns {boolean}
 */
const is_beishuizhizhan = () => config.mode.detail_rule.beishuizhizhan_mode;

/**
 * 是否为血流成河模式
 * @returns {boolean}
 */
const is_xueliu = () => config.mode.detail_rule._xueliu;

// ------------------------------------------------------------------------
/**
 * 是否开启古役
 * @returns {boolean}
 */
const is_guyi = () => config.mode.detail_rule.guyi_mode;

/**
 * 是否开启一番街的古役
 * @returns {boolean}
 */
const is_yifanjieguyi = () => config.mode.detail_rule._yifanjieguyi;

/**
 * 是否为无食断模式
 * @returns {boolean}
 */
const no_shiduan = () => config.mode.detail_rule._no_shiduan;

/**
 * 是否为无自摸损模式
 * @returns {boolean}
 */
const no_zimosun = () => config.mode.detail_rule._no_zimosun;

/**
 * 是否公开手牌
 * @returns {boolean}
 */
const is_openhand = () => config.mode.detail_rule.open_hand;

// ------------------------------------------------------------------------
/**
 * 立直所需要的立直棒个数, 默认为1
 * @returns {number}
 */
const get_liqi_need = () => {
    if (typeof config.mode.detail_rule._liqi_need == 'number' && config.mode.detail_rule._liqi_need > -1)
        return config.mode.detail_rule._liqi_need;
    return 1;
};

/**
 * 本场点数的倍数, 默认为1
 * @returns {number}
 */
const get_ben_times = () => {
    if (typeof config.mode.detail_rule._ben_times == 'number' && config.mode.detail_rule._ben_times > -1)
        return config.mode.detail_rule._ben_times;
    return 1;
};

/**
 * 四麻一个玩家听牌的罚符, 默认为段位规则: 1000
 * @returns {number}
 */
const get_fafu_1ting = () => {
    if (typeof config.mode.detail_rule._fafu_1ting == 'number')
        return config.mode.detail_rule._fafu_1ting;
    return 1000;
};

/**
 * 四麻两个玩家听牌的罚符, 默认为段位规则: 1500
 * @returns {number}
 */
const get_fafu_2ting = () => {
    if (typeof config.mode.detail_rule._fafu_2ting == 'number')
        return config.mode.detail_rule._fafu_2ting;
    return 1500;
};

/**
 * 四麻三个玩家听牌的罚符, 默认为段位规则: 3000
 * @returns {number}
 */
const get_fafu_3ting = () => {
    if (typeof config.mode.detail_rule._fafu_3ting == 'number')
        return config.mode.detail_rule._fafu_3ting;
    return 3000;
};

/**
 * 三麻一个玩家听牌的罚符, 默认为段位规则: 1000
 * @returns {number}
 */
const get_fafu_3p_1ting = () => {
    if (typeof config.mode.detail_rule._fafu_3p_1ting == 'number')
        return config.mode.detail_rule._fafu_3p_1ting;
    return 1000;
};

/**
 * 三麻两个玩家听牌的罚符, 默认为段位规则: 2000
 * @returns {number}
 */
const get_fafu_3p_2ting = () => {
    if (typeof config.mode.detail_rule._fafu_3p_2ting == 'number')
        return config.mode.detail_rule._fafu_3p_2ting;
    return 2000;
};

/**
 * 二麻听牌的罚符, 默认为 1000
 * @returns {number}
 */
const get_fafu_2p = () => {
    if (typeof config.mode.detail_rule._fafu_2p == 'number')
        return config.mode.detail_rule._fafu_2p;
    return 1000;
};

/**
 * 是否有切上满贯
 * @returns {boolean}
 */
const is_qieshang = () => config.mode.detail_rule._qieshangmanguan;

/**
 * 是否有头跳
 * @returns {boolean}
 */
const is_toutiao = () => config.mode.detail_rule._toutiao;

/**
 * 是否开启人和, 而且打点为满贯(5番)
 * @returns {boolean}
 */
const is_renhumanguan = () => config.mode.detail_rule._renhumanguan;

/**
 * 是否无大三元大四喜包牌, 修罗模式强制无包牌
 * @returns {boolean}
 */
const no_normalbaopai = () => config.mode.detail_rule._no_normalbaopai;

/**
 * 是否有四杠子包牌
 * @returns {boolean}
 */
const is_sigangbaopai = () => config.mode.detail_rule._sigangbaopai;

/**
 * 是否禁用流局满贯
 * @returns {boolean}
 */
const no_liujumanguan = () => config.mode.detail_rule._no_liujumanguan;

/**
 * 是否禁用一发
 * @returns {boolean}
 */
const no_yifa = () => config.mode.detail_rule._no_yifa;

/**
 * 是否不算连风4符
 * @returns {boolean}
 */
const no_lianfengsifu = () => config.mode.detail_rule._no_lianfengsifu;

/**
 * 是否禁用表宝牌
 * @returns {boolean}
 */
const no_dora = () => config.mode.detail_rule._no_dora;

/**
 * 是否禁用里宝牌
 * @returns {boolean}
 */
const no_lidora = () => config.mode.detail_rule._no_lidora;

/**
 * 是否禁用杠表宝牌
 * @returns {boolean}
 */
const no_gangdora = () => config.mode.detail_rule._no_gangdora;

/**
 * 是否禁用杠里宝牌
 * @returns {boolean}
 */
const no_ganglidora = () => config.mode.detail_rule._no_ganglidora;

/**
 * 明杠表宝牌是否即翻
 * @returns {boolean}
 */
const is_dora_jifan = () => config.mode.detail_rule._dora_jifan;

/**
 * 是否有三家和了流局
 * @returns {boolean}
 */
const is_sanxiangliuju = () => config.mode.detail_rule._sanxiangliuju;

/**
 * 是否禁用累计役满(番数最高三倍满)
 * @returns {boolean}
 */
const no_leijiyiman = () => config.mode.detail_rule._no_leijiyiman;

/**
 * 是否无双倍役满(纯九, 四暗刻单骑, 十三面, 大四喜算单倍役满)
 * @returns {boolean}
 */
const no_wyakuman = () => config.mode.detail_rule._no_wyakuman;

/**
 * 是否禁用国士枪暗杠
 * @returns {boolean}
 */
const no_guoshiangang = () => config.mode.detail_rule._no_guoshiangang;

/**
 * 是否禁用立直需要点数限制(点数不够及负分的情况是否能立直)
 * @returns {boolean}
 */
const is_fufenliqi = () => config.mode.detail_rule._fufenliqi;

// ------------------------------------------------------------------------
/**
 * 是否有包杠, 只适用于非修罗立直麻将
 * @returns {boolean}
 */
const is_baogang = () => config.mode.detail_rule._baogang;

/**
 * 是否为青天井模式(谨慎使用, 高打点时很容易崩溃)
 * @returns {boolean}
 */
const is_qingtianjing = () => config.mode.detail_rule._qingtianjing;

/**
 * 是否为无振听模式
 * @returns {boolean}
 */
const no_zhenting = () => config.mode.detail_rule._no_zhenting;

/**
 * 是否 hupai 无参数时无役荣和自动诈和
 * @returns {boolean}
 */
const is_ronghuzhahu = () => config.mode.detail_rule._ronghuzhahu;

/**
 * 是否开启自定义番种'天地创造'
 * @returns {boolean}
 */
const is_tiandichuangzao = () => config.mode.detail_rule._tiandichuangzao;

/**
 * 是否开启自定义番种'万物生长'
 * @returns {boolean}
 */
const is_wanwushengzhang = () => config.mode.detail_rule._wanwushengzhang;

/**
 * 是否根据 deal_tiles 确定牌山
 * @returns {boolean}
 */
const is_mopai_paishan = () => config.mode.detail_rule._mopai_paishan;

/**
 * 是否为何切模式
 * @returns {boolean}
 */
const is_heqie_mode = () => config.mode.detail_rule._heqie_mode;

// ------------------------------------------------------------------------
/**
 * 是否为国标模式
 * @returns {boolean}
 */
const is_guobiao = () => config.mode.detail_rule._guobiao;

/**
 * 是否启用国标花牌(用 Huapai 即 0m 当作花牌)
 * @returns {boolean}
 */
const is_guobiao_huapai = () => config.mode.detail_rule._guobiao_huapai;

/**
 * 国标模式是否禁用8番缚
 * @returns {boolean}
 */
const is_guobiao_no_8fanfu = () => config.mode.detail_rule._guobiao_no_8fanfu;

/**
 * 国标模式是否可以连庄
 * @returns {boolean}
 */
const is_guobiao_lianzhuang = () => config.mode.detail_rule._guobiao_lianzhuang;

/**
 * 国标模式为了美观, 将点数放大的倍数
 * @returns {number}
 */
const scale_points = () => {
    if (typeof config.mode.detail_rule._scale_points == 'number')
        return config.mode.detail_rule._scale_points;
    return 100;
};

/**
 * 国标模式诈和, 错和赔各家的点数
 * @returns {number}
 */
const cuohu_points = () => {
    if (typeof config.mode.detail_rule._cuohu_points == 'number')
        return config.mode.detail_rule._cuohu_points;
    return 10;
};

/**
 * 国标诈和, 错和后玩家是否陪打
 * @returns {boolean}
 */
const is_cuohupeida = () => config.mode.detail_rule._cuohupeida;

// ------------------------------------------------------------------------
/**
 * 是否随机皮肤, 开启此选项后设置的皮肤无效
 * @returns {boolean}
 */
const is_random_skin = () => config.mode.detail_rule._random_skin;

/**
 * 是否随机装扮, 范围包括立直棒, 和牌特效, 立直特效, 头像框, 桌布, 称号, 开启此选项后设置的对应装扮均无效
 * @returns {boolean}
 */
const is_random_views = () => config.mode.detail_rule._random_views;

// ========================================================================
// =========================== 随机装扮与自定义番种 ==========================
// ========================================================================
/**
 * 回放用装扮随机池和中文服无法加载和排除的装扮, 键是 slot, 值是对应的装扮id数组
 * @type {{}}
 */
const views_pool = {}, invalid_views = {
    // 头像框
    5: [
        305501,  // 头像框-默认
        305510,  // 头像框-四象战
        305511,  // 头像框-四象战
        305512,  // 头像框-四象战
        305513,  // 头像框-四象战
        305514,  // 头像框-四象战
        305515,  // 头像框-四象战
        305516,  // 头像框-四象战
        305517,  // 头像框-四象战
        305518,  // 头像框-四象战
        305519,  // 头像框-四象战
        305524,  // 头像框-四象战
        305525,  // 双聖の眷属たち
        305526,  // Team Championship Limited Portrait Frame
        305527,  // 头像框-四象战
        305528,  // 头像框-四象战
        305530,  // 头像框-四象战
        305531,  // 头像框-四象战
        305532,  // 头像框-四象战
        305533,  // 双聖の眷属たち
        305534,  // 头像框-四象战
        305535,  // 头像框-四象战
        305536,  // 头像框-四象战
        305538,  // 头像框-四象战
        305539,  // 双聖の眷属たち
        305540,  // 头像框-四象战
        305541,  // 头像框-四象战
        305543,  // 头像框-四象战
        305544,  // 头像框-四象战
        305546,  // 双聖の眷属たち
        305547,  // 头像框-四象战
        305548,  // 头像框-四象战
        305549,  // 头像框-四象战
        305550,  // 头像框-四象战
        305553,  // 双聖の眷属たち
        305555,  // 头像框-豆芽测试用
        30550001,  // 头像框-四象战
        30550002,  // 头像框-四象战
        30550003,  // 头像框-四象战
        30550004,  // 头像框-四象战
        30550005,  // 头像框-四象战
        30550006,  // 头像框-四象战
        30550007,  // 双聖の眷属たち
        30550008,  // 头像框-四象战
        30550009,  // 头像框-四象战
        30550010,  // 头像框-四象战
        30550011,  // 头像框-四象战
        30550013,  // 双聖の眷属たち
        30550015,  // 头像框-四象战
        30550018,  // Limited Portrait Frame
        30550019,  // 프로필 테두리 - MKC 2025
        30550024,  // 双聖の眷属たち
    ],
    // 称号
    11: [
        600001,  // 无称号
        600017,  // 认证玩家
        600025,  // 限时称号测试用
        600026,  // 雀魂公認の選ばれしプレイヤーG
        600029,  // インターハイ王者
        600041,  // 最強鴉天狗の愛弟子
        600043,  // Limited Title
        600044,  // 花より団子
        600048,  // 伝説の名コンビ
        600049,  // 伝説の迷コンビ
        600051,  // 虹懸かる右手
        600055,  // 麻雀スクワッド
        600066,  // みんな家族
        600067,  // ぶいすぽ女傑
        600069,  // インターハイ王者
        600071,  // 煌めく女王の星
        600072,  // 闘魂杯王者
        600073,  // 華風戦優勝
        600076,  // 雀魂インビ夏王者
        600077,  // 雀魂インビ冬将軍
        600081,  // 野鳥観察部
        600082,  // ななしサンマ王
        600085,  // ぶいすぽの頂
        600087,  // 雀荘牌舞台
        600088,  // 闘魂杯王者
        600089,  // 麒麟位2024
        600090,  // 四象战冠军
        600091,  // 四象战冠军
        600092,  // 四象战冠军
        600093,  // 花ノ国 戦国最強
        600095,  // 双聖戦優勝
        600097,  // 雀魂インビ夏王者
        600098,  // 限定称号
        600099,  // 四象战冠军
        600100,  // 四象战冠军
        600102,  // 豪勇無双のまつたけ
        600103,  // 華風戦優勝
        600104,  // Limited Title
        600105,  // MKC 2025 국사무쌍
        600106,  // 四象战冠军
        600109,  // 雀魂インビ冬将軍
        600110,  // ぶいすぽの覇者
        600111,  // プロ×魂天覇者
        600114,  // あやまらないよ！
        600115,  // 双聖戦優勝
        600122,  // 麒麟位2025
        600133,  // Limited Title
        600136,  // チームシリウス
    ],
};

// 更新装扮随机池
const updateViews = () => {
    // 建议玩家随机的装扮: 立直棒(0), 和牌特效(1), 立直特效(2), 头像框(5), 桌布(6), 牌背(7), 称号(11), 牌面(13)
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
            views_pool[11].push(Titles[i].id)
};

// 自定义番种: 役种名称的汉字需要在已有的里面选, 否则不会显示
const DIYFans = () => {
    // 9000: 诈和, '诈'字无法显示, 原名称为'振和'
    // 9001: 天地创造: '创造'无法显示, 原名称为'天地大白'
    // 9002: 万物生长: '万生长'无法显示, 原名称为'龙发杠载'
    // 9003: 开立直(役满): 对应语音是对局中的宣言立直
    // 9004: 开两立直(役满): 对应语音是对局中的宣言两立直
    // 9005: 开立直(2番)
    // 9006: 开两立直(3番)
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

    // 以下是流局满贯和自风场风役种分化
    // 9100: 流局满贯
    // 9101: 东
    // 9102: 连东
    // 9103: 南
    // 9104: 连南
    // 9105: 西: '西'显示不出来
    // 9106: 连西
    // 9107: 北
    // 9108: 连北
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

    // 对局操作语音, 中间会有较长时间的停顿
    // 9200: 立直
    // 9201: 两立直
    // 9202: 吃
    // 9203: 碰
    // 9204: 杠
    // 9205: 拔北
    // 9206: 荣, '荣'无法显示, 原名称为'点和'
    // 9207: 自摸
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
    // 9209: 终局一位语音(天地无双指一姬的)
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

    // 满贯及以上和听牌语音
    // 9300: 满贯
    // 9301: 跳满, '跳'无法显示, 原名称为'一点五满贯'
    // 9302: 倍满, '倍'无法显示, 原名称为'两满贯'
    // 9303: 三倍满
    // 9304: 役满
    // 9305: 双倍役满
    // 9306: 三倍役满
    // 9307: 四倍役满
    // 9308: 五倍役满
    // 9309: 六倍役满
    // 9310: 累计役满, '累计'无法显示, 原名称为'数满贯'
    // 9311: 听牌, '听'无法显示
    // 9312: 未听牌, '未'无法显示, 原名称为'无听牌'
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

    // 流局语音, 这里可以穿插到川麻的番种中
    // 9400: 四风连打
    // 9400: 四杠散了, '散'无法显示
    // 9400: 九种九牌, '种'无法显示
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

    // 大厅交互语音
    // 9500: 获得语音, 都无法显示
    // 9501: 登录语音普通, '语音普'无法显示
    // 9502: 登录语音满羁绊, '语音羁绊'无法显示
    // 9503: 大厅交互语音1, '厅互语音'无法显示
    // 9504: 大厅交互语音2
    // 9505: 大厅交互语音3
    // 9506: 大厅交互语音4
    // 9507: 大厅交互语音5
    // 9508: 大厅交互语音6
    // 9509: 大厅交互语音7
    // 9510: 大厅交互语音8
    // 9511: 送礼物语音普通, '送语音普'无法显示
    // 9512: 送礼物语音喜好, '送语音'无法显示
    // 9513: 好感度升级语音1, '感度升级语音'无法显示
    // 9514: 好感度升级语音2
    // 9515: 好感度升级语音3
    // 9516: 好感度升级语音4
    // 9517: 好感度升级语音5
    // 9518: 契约语音, 都无法显示
    // 9519: 新年语音, '新语音'无法显示
    // 9520: 情人节语音, '情节语音'无法显示
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

    // 对局契约特殊语音
    // 9600: 连续打出多张相同牌, '续出多张'无法显示
    // 9600: 打出宝牌, '出'无法显示
    // 9600: 余牌少于10, '余少于'无法显示
    // 9600: 役满听牌, '听'无法显示
    // 9600: 倍满/三倍满听牌, '倍听'无法显示
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

    // 一番街的特色古役
    // 9700: 推不倒, '推倒'无法显示, 原名称为'对称牌'
    // 9701: 赤三色, '赤'无法显示, 原名称为'红三色'
    // 9702: 三色通贯
    // 9703: 四连刻
    // 9704: 一色四同顺
    // 9705: 红孔雀, '孔雀'无法显示, 原名称为'红一色'
    // 9706: 红一点
    // 9707: 黑一色, '黑'无法显示, 原名称为'暗一色'
    // 9708: 十三不搭, '搭'无法显示, 原名称为'十三不顺'
    // 9709: 百万石, '百万'无法显示, 原名称为'1000000石'
    // 9710: 金门桥, '桥'无法显示, 原名称为'金门顺'
    // 9711: 东北新干线, '新干线'无法显示, 原名称'东北一气通贯'
    // 9712: 无发绿一色
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

// 国标麻将番种
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

// 花牌1-8, 以及'一大堆'情况
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

// ========================================================================
// ================================ 重写函数 ===============================
// ========================================================================

/**
 * 回放接口, 其中
 *
 * checkPaiPu 和 resetData 在 editOffline 中重写, 在 resetReplay 中复原
 *
 * OnChoosedPai, seat2LocalPosition, localPosition2Seat 在 add_function.js 中重写
 * @type {function}
 */
var checkPaiPu, resetData, OnChoosedPai, seat2LocalPosition, localPosition2Seat;

// 使补充和优化函数只执行一次的控制变量
let inst_once = true;

// 在线编辑(进入牌谱之后的修改, 包括切换视角和切换巡目, 只在 editOffline 中的 resetData 中调用)
const editOnline = () => {
    let rounds = [];
    for (let i in all_data.actions)
        rounds.push({actions: all_data.actions[i], xun: all_data.xun[i][view.DesktopMgr.Inst.seat]});
    uiscript.UI_Replay.Inst.rounds = rounds;
    uiscript.UI_Replay.Inst.gameResult.result.players = all_data.players;
};

// 离线编辑(进入牌谱之前改, 只在 gameEnd 中调用)
const editOffline = () => {
    // 修改玩家信息
    const editPlayerDatas = () => {
        let ret = [];
        // 建议玩家随机的装扮: 立直棒(0), 和牌特效(1), 立直特效(2), 头像框(5), 桌布(6), 牌背(7), 称号(11), 牌面(13)
        let slots = [0, 1, 2, 5, 6, 7, 11, 13];
        for (let seat = 0; seat < player_datas.length; seat++) {
            ret[seat] = {
                account_id: player_datas[seat].avatar_id * 10 + seat, // 账号唯一id, 这里没什么用随便设的
                seat: seat, // 座次
                nickname: player_datas[seat].nickname, // 昵称
                avatar_id: player_datas[seat].avatar_id, // 头像id
                character: { // 角色信息
                    charid: cfg.item_definition.skin.map_[player_datas[seat].avatar_id].character_id, // 角色id
                    level: 5, // 角色好感等级, 即好感几颗心
                    exp: 0, // 好感经验, 契约之后值是0
                    skin: player_datas[seat].avatar_id, // 皮肤, 和 avatar_id 一样
                    is_upgraded: true, // 是否已契约
                    extra_emoji: [10, 11, 12], // 额外表情, 除了初始的九个外其他都是额外表情, 包括契约后的三个
                },
                title: player_datas[seat].title, // 称号
                level: {id: 10503, score: 4500}, // 四麻段位分, 这里是圣三原点, 下同
                level3: {id: 20503, score: 4500}, // 三麻段位分
                avatar_frame: player_datas[seat].avatar_frame, // 头像框
                verified: player_datas[seat].verified, // 是否已认证, 0: 未认证, 1: 主播(猫爪)认证, 2: 职业(P标)认证
                views: player_datas[seat].views, // 装扮槽
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
        all_data.player_datas = player_datas = ret;
    };

    if (checkPaiPu === undefined)
        checkPaiPu = GameMgr.Inst.checkPaiPu;
    if (resetData === undefined)
        resetData = uiscript.UI_Replay.prototype.resetData;
    if (OnChoosedPai === undefined)
        OnChoosedPai = view.ViewPai.prototype.OnChoosedPai
    if (seat2LocalPosition === undefined)
        seat2LocalPosition = view.DesktopMgr.prototype.seat2LocalPosition;
    if (localPosition2Seat === undefined)
        localPosition2Seat = view.DesktopMgr.prototype.localPosition2Seat;

    // 重写对局信息
    uiscript.UI_Replay.prototype.resetData = function () {
        try {
            resetData.call(this);
            editOnline();
        } catch (e) {
            console.error(e);
        }
    }
    // 重写房间信息和玩家信息
    GameMgr.Inst.checkPaiPu = function (game_uuid, account_id, paipu_config) {
        try { // 添加下面
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
        } catch (e) { // 添加上面
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
                },
                function (l, n) {
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
                    } else {
                        // 添加: 接受的牌谱信息去除 robots
                        n.head.robots = [];

                        // 修改的地方: 本来是 openMJRoom 的第二个参数(单个字母), 现在是 all_data.player_datas
                        // 本来是 openMJRoom 的第一个参数(如 X.config), 现在是 all_data.config
                        // 添加下面
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
                            // 第一场的主视角
                            if (get_mainrole_seat() > -1)
                                account_id = all_data.player_datas[get_mainrole_seat()].account_id;
                            else // 第一局的亲家
                                account_id = all_data.player_datas[all_data.actions[0][0].data.ju].account_id;
                        } catch (e) { // 添加上面
                            console.error(e);
                        }

                        const C = Laya.Handler.create(W, function (H) {
                            const main_func = function () {
                                game.Scene_Lobby.Inst.active = false;
                                game.Scene_MJ.Inst.openMJRoom(all_data.config, all_data.player_datas,
                                    Laya.Handler.create(W, function () {
                                        W.duringPaipu = false;
                                        view.DesktopMgr.Inst.paipu_config = paipu_config;
                                        view.DesktopMgr.Inst.initRoom(JSON.parse(JSON.stringify(all_data.config)), all_data.player_datas, account_id, view.EMJMode.paipu, Laya.Handler.create(W, function () {
                                            // 添加下面
                                            if (typeof editFunction2 == 'function' && inst_once)
                                                editFunction2();
                                            inst_once = false;
                                            if (player_cnt === 2) {
                                                view.DesktopMgr.Inst.rule_mode = view.ERuleMode.Liqi2;
                                                uiscript.UI_DesktopInfo.Inst.refreshSeat();
                                            }
                                            // 添加上面

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
                                    }),
                                    Laya.Handler.create(W,
                                        function (H) {
                                            return uiscript.UI_Loading.Inst.setProgressVal(0.1 + 0.9 * H);
                                        },
                                        null, false)
                                );
                            };
                            main_func();
                        });
                        let B = {};
                        B.record = n.head;
                        if (n.data && n.data.length) {
                            B.game = net.MessageWrapper.decodeMessage(n.data);
                            C.runWith(B);
                        } else {
                            let O = n.data_url;
                            if (!O.startsWith('http'))
                                O = GameMgr.prefix_url + O;
                            game.LoadMgr.httpload(O, 'arraybuffer', false,
                                Laya.Handler.create(W,
                                    function (H) {
                                        if (H.success) {
                                            const N = new Laya.Byte();
                                            N.writeArrayBuffer(H.data);
                                            B.game = net.MessageWrapper.decodeMessage(N.getUint8Array(0, N.length));
                                            C.runWith(B);
                                        } else {
                                            uiscript.UIMgr.Inst.ShowErrorInfo(game.Tools.strOfLocalization(2005) + n.data_url);
                                            uiscript.UI_Loading.Inst.close();
                                            uiscript.UIMgr.Inst.showLobby();
                                            W.duringPaipu = false;
                                        }
                                    }
                                )
                            );
                        }
                    }
                }
            );
        }

    }
};

// ========================================================================
// ============================= 一些的优化函数 =============================
// ========================================================================

const optimizeFunction = () => {
    // 修正多赤的暗杠
    view.ActionAnGangAddGang.getAngangTile = (tile, seat) => {
        let hand = view.DesktopMgr.Inst.players[view.DesktopMgr.Inst.seat2LocalPosition(seat)].hand;
        let mj_tile = mjcore.MJPai.Create(tile);
        let dora_cnt = 0; // 红宝牌数量
        let touming_cnt = 0; // 透明牌数量

        // 贪心策略: 优先杠出赤宝牌
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
    }

    // 添加 category 为 3: '段位场' , 99: '装扮预览' 的情况
    // 逐渐取代 '四人东' 为对应模式的名称
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
        } else if (4 === config.category)
            text += '比赛场\xB7';
        else if (2 === config.category) {
            let S = config.meta;
            if (S) {
                let M = cfg.desktop.matchmode.get(S.mode_id);
                M && (text += M['room_name_' + GameMgr.client_language] + '\xB7');
            }
        } else if (100 === config.category)
            return {
                text: '新手教程',
                isSimhei: !1
            };
        // 添加下面
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
            else if (x._random_views || x._random_skin)
                text = '随机装扮';
            else
                text += this.room_mode_desc(config.mode.mode)
        }
        // 添加上面
        return {
            text: text,
            isSimhei: !1
        };
    }

    // 国标添加圈风刻, 门风刻语音, 并不显示宝牌指示牌
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
        var s = view.DesktopMgr.Inst.player_datas[K.seat].character
            , U = new uiscript.UIRect();
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
        var O = K.fan_names.length
            , m = 100;
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
            var p = K.fan_names[j]
                , M = 0
                , u = K.fan_ids[j]
                , e = false
                , H = cfg.fan.fan.get(u);
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
            // 添加下面
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
            // 添加上面
            else if (u >= 31 && 34 >= u) {
                var T = r.value;
                T > 13 && (T = 13),
                    r.sound = 0 === T ? '' : 'fan_dora' + T;
            } else
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
                var s = Y.getChildAt(B)
                    , U = s.getChildByName('l_name');
                U.text = Q[B].name,
                    U.color = Q[B].isSpecialFan ? '#ffc74c' : '#f1eeda';
                var O = K.yiman && 'en' === GameMgr.client_language ? 290 : 242;
                if (U.width = O,
                    game.Tools.labelLocalizationSize(U, O, 0.8),
                undefined !== Q[B].value && null !== Q[B].value) {
                    s.getChildAt(2).visible = true;
                    var m = Q[B].value
                        , j = m.toString();
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
            var V = 0
                , g = 0
                , W = '';
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
        if (view.DesktopMgr.Inst.mode === view.EMJMode.play && K.seat === view.DesktopMgr.Inst.seat && K.mode <= 1 && uiscript.UI_Activity.activity_is_running(uiscript.UI_Activity_DuanWu_Point.activity_id)) {
            for (var S = false, j = 0; j < view.DesktopMgr.Inst.player_datas.length; j++) {
                var _ = view.DesktopMgr.Inst.player_datas[j];
                if (!_ || game.Tools.isAI(_.account_id)) {
                    S = true;
                    break;
                }
            }
            S ? this.container_Activity_Point.me.visible = false : m += this.container_Activity_Point.show(m, K.point_sum, K.score);
        } else
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
        } else
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
    }

    // 上述函数对应的跳过动画的版本
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
            var m = K.fan_names[U]
                , Y = K.fan_ids[U]
                , j = 0
                , Q = false
                , p = cfg.fan.fan.get(Y);
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
            var u = s.getChildAt(U)
                , e = u.getChildByName('l_name');
            e.text = O[U].name,
                e.color = O[U].isSpecialFan ? '#ffc74c' : '#f1eeda';
            var H = K.yiman && 'en' === GameMgr.client_language ? 290 : 242;
            if (e.width = H,
                game.Tools.labelLocalizationSize(e, H, 0.8),
            undefined !== O[U].value && null !== O[U].value) {
                u.getChildAt(2).visible = true;
                var r = O[U].value
                    , T = r.toString();
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
        this.count_down.text = '',
            this.btn_confirm.visible = true,
            this.btn_confirm.disabled = false,
            this.btn_confirm.alpha = 1,
            this.count_down.visible = false,
            this.btn_confirm.getChildByName('confirm').x = 131;
    }

    // 国标麻将不显示符数
    uiscript.UI_Win.prototype.setFanFu = function (B, K) {
        // cloneImage 函数由猫粮工作室老板娘'丝茉茉'提供
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
    }

    // 牌偷梁换柱, 用于何切模式, 其他家视角
    // P: mjcore 生成的 tile
    // T: -1 配牌明牌, 0: 正常牌, 1: 透明牌
    // n: 从左到右扫描还是从右到左扫描, 默认从左到右
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

        // 添加下面
        if (is_heqie_mode() && this.hand.length > 0)
            if (this.seat === protected_tiles.seat) {
                for (let i = 0; i < this.hand.length; i++)
                    if (this.hand[i].val.toString() !== protected_tiles.tiles[i]) {
                        F = i;
                        break;
                    }
            } else
                F = this.hand.length - 1;
        // 添加上面

        if (-1 !== F) {
            this.hand[F].Destory();
            for (o = F; o < this.hand.length - 1; o++)
                this.hand[o] = this.hand[o + 1];
            this.hand.pop();
        }
    }

    // 自家视角
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
            } else
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
            } else
                for (S = 0; S < this.hand.length; S++)
                    if (mjcore.MJPai.isSame(r, this.hand[S].val) && !this.hand[S].is_open) {
                        n = S;
                        break;
                    }

        // 添加下面
        if (is_heqie_mode() && this.hand.length > 0)
            if (this.seat === protected_tiles.seat) {
                for (let i = 0; i < this.hand.length; i++)
                    if (this.hand[i].val.toString() !== protected_tiles.tiles[i]) {
                        n = i;
                        break;
                    }
            } else
                n = this.hand.length - 1;
        // 添加上面

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
    }
};
