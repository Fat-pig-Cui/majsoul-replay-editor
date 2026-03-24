/**
 * @file: core.ts - 牌谱文件, 包含牌谱编辑的基础函数
 * @author: GrandDawn, Fat-pig-Cui
 * @email: chubbypig@qq.com
 * @github: https://github.com/Fat-pig-Cui/majsoul-replay-editor
 */

import {
    actions, all_data, awaiting_tiles, baopai, base_info, begin_tiles, chuanma_gangs, config, cuohu, deal_tiles,
    delta_scores, discard_tiles, dora_cnt, dora_indicator, fulu, gaps, huled, hules_history, hunzhiyiji_info, liqi_info,
    lst_liqi, mingpais, muyu, muyu_info, paihe, paishan, player_datas, player_tiles,
    scores, shoumoqie, sigang_bao, spell_hourglass, xun, yongchang_data, zhenting
} from "./data";
import {
    cuohu_points, get_aka_cnt, get_chang_ju_ben_num, get_fafu_1ting, get_fafu_2p, get_fafu_2ting, get_fafu_3p_1ting,
    get_fafu_3p_2ting, get_fafu_3ting, get_field_spell_mode, get_init_point, get_init_scores, get_liqi_need, is_anye,
    is_baogang, is_begin_open, is_beishuizhizhan, is_chuanma, is_cuohupeida, is_dora3, is_dora_jifan, is_fufenliqi,
    is_guobiao, is_guobiao_huapai, is_guobiao_lianzhuang, is_hunzhiyiji, is_mingjing, is_muyu, is_openhand,
    is_report_yakus, is_ronghuzhahu, is_sanxiangliuju, is_tianming, is_toutiao, is_wanxiangxiuluo, is_xueliu,
    is_xuezhandaodi, is_yongchang, is_zhanxing, no_liujumanguan, no_zimosun, scale_points
} from "./misc";
import {
    separate, separateWithParam, judgeTile, getLstAction, isEqualTile, allEqualTiles, calcHupai, calcTingpai,
    getLeftTileCnt
} from "./exportedUtils";
import {
    calcDoras, calcSudian, calcSudianChuanma, cmp, eraseMingpai, fulu2Ming, huazhu, inTiles, isAwaitingIndex,
    isBeishuiType, isDora, isTile, isValidSeat, push2PlayerTiles, randomCmp, errRoundInfo, updateMuyu, prejudgeZhenting,
    judgeShezhangzt, updateShoumoqie, updateZhenting, lstLiqi2Liqi, simplify
} from "./utils";
import {
    addAnGangAddGang, addBaBei, addChiPengGang, addCuohu, endHule, addDealTile, addDiscardTile, addFillAwaitingTiles,
    addHuleXueLiuMid, addHuleXueZhanMid, addRevealTile, endHuleXueLiuEnd, endHuleXueZhanEnd, endLiuJu, endNoTile,
    addLockTile, addNewRound
} from "./glue";
import {huleOnePlayer, huleOnePlayerChuanma, huleOnePlayerGuobiao} from "./huleOnePlayer";
import {calcFan, calcFanChuanma} from "./calcFan";
import {calcGangPoint} from "./activityFunction";
import {editOffline} from "./override";
import {Constants} from "./constants";

/**
 * 初始化必要变量
 */
export const clearProject = (): void => {
    if (view?.DesktopMgr?.Inst?.active)
        throw new Error('clearProject: 请退出当前牌谱后再载入自制牌谱');

    game_begin_once = round_begin_once = true;
    for (let i = 0; i < 4; i++) {
        player_datas[i] = {
            nickname: `电脑${i}`,
            avatar_id: 400101,
            title: 600001,
            avatar_frame: 0,
            verified: 0,
            views: []
        };
        begin_tiles[i] = '';
        player_tiles[i] = [];
        discard_tiles[i] = [];
        deal_tiles[i] = [];
        muyu.times[i] = 1;
    }

    config.category = 1;
    config.meta = {mode_id: 0};
    config.mode = {mode: 1, detail_rule: {}};

    muyu.seats = '';
    paishan.length = 0;
    base_info.chang = base_info.ju = base_info.ben = base_info.liqibang = base_info.benchangbang = base_info.lianzhuang_cnt = 0;
    base_info.liqi_need = base_info.draw_type = base_info.lst_draw_type = 1;
    base_info.baogang_seat = base_info.first_hu_seat = -1;
    base_info.base_point = 25000;

    all_data.all_actions = [];
    all_data.xun = [];
    all_data.player_datas = player_datas;
    all_data.config = config;
    all_data.players = [null, null];
};

/**
 * 随机牌山函数, 最后会将随机牌山赋给全局变量 paishan, paishan.join('') 就是牌谱界面显示的牌山字符串代码
 * @example
 * // 以四个三索开头, 东风为第一张岭上牌的牌山, 可以简写, 中间的空格不影响
 * randomPaishan('33s3s 3s', '1z')
 * @param ps_head - 牌山开头
 * @param ps_back - 牌山结尾
 */
export const randomPaishan = (ps_head: string = '', ps_back: string = ''): void => {
    if (all_data.all_actions.length === 0)
        gameBegin();

    const tiles = [separateWithParam(begin_tiles[0]), separateWithParam(begin_tiles[1]), separateWithParam(begin_tiles[2]), separateWithParam(begin_tiles[3])];
    const para_tiles = [separateWithParam(ps_head), separateWithParam(ps_back)];

    // 检查手牌数量是否合规
    for (let i = 0; i < base_info.player_cnt; i++) {
        const tiles_len = tiles[i].length;
        if (i === base_info.ju) {
            if (tiles_len > Constants.QIN_TILE_NUM)
                console.warn(errRoundInfo() + `seat: ${i} 为亲家起手牌数量超过正常值: ${tiles_len}, 页面可能会崩溃`);
            else if (tiles_len < Constants.QIN_TILE_NUM)
                console.log(errRoundInfo() + `seat: ${i} 为亲家起手牌数量不够: ${tiles_len}, 自动补全至${Constants.QIN_TILE_NUM}张`);
        } else {
            if (tiles_len > Constants.XIAN_TILE_NUM)
                console.warn(errRoundInfo() + `seat: ${i} 为闲家起手牌数量超过正常值: ${tiles_len}, 页面可能会崩溃`);
            else if (tiles_len < Constants.XIAN_TILE_NUM)
                console.log(errRoundInfo() + `seat: ${i} 为闲家起手牌数量不够: ${tiles_len}, 自动补全至${Constants.XIAN_TILE_NUM}张`);
        }
    }

    let aka_cnt = 3;
    if (get_aka_cnt() > -1)
        aka_cnt = get_aka_cnt();
    else if (base_info.player_cnt === 3)
        aka_cnt = 2;
    else if (base_info.player_cnt === 2)
        aka_cnt = 1;

    const cnt: TileNum = {};
    for (const tile of Constants.TILE)
        if (Constants.AKA_TILE.includes(tile))
            cnt[tile] = 0;
        else
            cnt[tile] = 4;

    if (base_info.player_cnt === 2) { // 二麻
        for (const tile of Constants.PIN_MID_TILE)
            cnt[tile] = 0;
        for (const tile of Constants.SOU_MID_TILE)
            cnt[tile] = 0;
        cnt['5m'] = 4 - aka_cnt;
        cnt['0m'] = aka_cnt;
    } else if (base_info.player_cnt === 3) { // 三麻
        for (const tile of Constants.MAN_MID_TILE)
            cnt[tile] = 0;
        cnt['5p'] = cnt['5s'] = 4 - Math.floor(aka_cnt / 2);
        cnt['0p'] = cnt['0s'] = Math.floor(aka_cnt / 2);
    } else { // 四麻
        if (aka_cnt === 4) {
            cnt['5m'] = cnt['5s'] = 3;
            cnt['5p'] = cnt['0p'] = 2;
            cnt['0m'] = cnt['0s'] = 1;
        } else {
            cnt['5m'] = cnt['5p'] = cnt['5s'] = 4 - Math.floor(aka_cnt / 3);
            cnt['0m'] = cnt['0p'] = cnt['0s'] = Math.floor(aka_cnt / 3);
        }
    }
    if (is_chuanma()) {
        for (const tile of Constants.HONOR_TILE)
            cnt[tile] = 0;
        cnt['0m'] = cnt['0p'] = cnt['0s'] = 0;
        cnt['5m'] = cnt['5p'] = cnt['5s'] = 4;
    }
    if (is_guobiao()) {
        cnt['0m'] = cnt['0p'] = cnt['0s'] = 0;
        cnt['5m'] = cnt['5p'] = cnt['5s'] = 4;
        // 用 HUAPAI 当做国标的花牌
        if (is_guobiao_huapai() && typeof editFunction == 'function')
            cnt[Constants.HUAPAI] = 8;
    }

    // 明镜之战
    const cnt2: number[] = [];
    if (is_mingjing()) {
        for (const tile of Constants.TILE_NO_AKA) {
            cnt2[tile] = 3;
            cnt[tile] = 1;
        }
        cnt['0m'] = cnt['0p'] = cnt['0s'] = 0;
    }

    // 万象修罗
    if (is_wanxiangxiuluo())
        cnt[Constants.TBD] = 4;

    const sp_type = ['Y', 'D', 'T', 'H', 'M', 'P', 'S', '.'];
    // 减去玩家起手
    for (let j = 0; j < base_info.player_cnt; j++)
        for (const tile of tiles[j])
            if (!sp_type.includes(tile[0]))
                if (tile.length > 2 && tile[2] === Constants.SPT_SUFFIX && is_mingjing())
                    cnt2[tile[0] + tile[1]]--;
                else
                    cnt[tile]--;

    // 减去两个参数的牌
    for (const para_tile of para_tiles)
        for (const tile of para_tile)
            if (!sp_type.includes(tile[0]))
                if (tile.length === 3 && tile[2] === Constants.SPT_SUFFIX)
                    cnt2[tile[0] + tile[1]]--;
                else
                    cnt[tile]--;

    const remain_tiles: Tile[] = [];
    for (const tile of Constants.TILE) {
        for (let j = 0; j < cnt[tile]; j++)
            remain_tiles.push(tile);
        if (is_mingjing())
            for (let j = 0; j < cnt2[tile]; j++)
                remain_tiles.push(tile + Constants.SPT_SUFFIX as Tile);
    }
    remain_tiles.sort(randomCmp);

    for (const para_tile of para_tiles)
        randomize(para_tile);
    for (let i = 0; i < base_info.player_cnt; i++)
        randomize(tiles[i]);

    // 补全玩家起手
    for (let i = 0; i < base_info.player_cnt; i++) {
        while (tiles[i].length < Constants.XIAN_TILE_NUM)
            tiles[i].push(remain_tiles.pop());
        if (i === base_info.ju && tiles[i].length < Constants.QIN_TILE_NUM)
            tiles[i].push(remain_tiles.pop());
    }

    // 回写
    for (let i = 0; i < base_info.player_cnt; i++)
        begin_tiles[i] = tiles[i].join('');

    if (!is_report_yakus())
        for (const tile in cnt) {
            let full_num = 4, has_fault = false;
            if (cnt[tile] < 0) {
                has_fault = true;
                if (is_mingjing())
                    full_num = 1;
            }
            if (has_fault)
                console.warn(errRoundInfo() + `paishan 不合规: ${full_num - cnt[tile]} 个 ${tile}`);
            if (cnt2[tile] < 0)
                console.warn(errRoundInfo() + `paishan 不合规: ${3 - cnt2[tile]} 个 ${tile}t`);
        }

    paishan.length = 0;
    paishan.push(...para_tiles[0].concat(remain_tiles, para_tiles[1]) as Tile[]);

    roundBegin();

    function randomize(tls: TileWithParam[]): void {
        for (const i in tls)
            if (['H', 'T'].includes(tls[i][0])) {
                const index = remain_tiles.findIndex((tile: Tile) => judgeTile(tile, tls[i][0]));
                tls[i] = index > -1 ? remain_tiles.splice(index, 1)[0] : remain_tiles.pop();
            }
        for (const i in tls)
            if (['Y', 'D', 'M', 'P', 'S'].includes(tls[i][0])) {
                const index = remain_tiles.findIndex((tile: Tile) => judgeTile(tile, tls[i][0]));
                tls[i] = index > -1 ? remain_tiles.splice(index, 1)[0] : remain_tiles.pop();
            }
        for (const i in tls)
            if (tls[i][0] === '.')
                tls[i] = remain_tiles.pop();
    }
};

/**
 * 摸牌, 参数顺序可以不一致, 包含
 * - {Seat} - 摸牌的玩家, 没有此参数时按照正常对局流程
 * - {Tile} - 摸的牌, 没有此参数时将根据 deal_tiles 或牌山确定
 * - {AwaitingIndex} - 占星之战: 牌候选池中选择的牌位置, 后面会变为 AwaitingIndex 类型
 */
export const mopai = (...args: any[]): void => {
    let seat: Seat, tile: Tile, index: AwaitingIndex;
    // 参数预处理
    for (const arg of args)
        if (typeof arg == 'string') {
            if (isTile(arg))
                tile = arg;
            else
                console.error(errRoundInfo() + `mopai: 不合规的牌: ${arg}`);
        } else if (typeof arg == 'number') {
            if (isValidSeat(arg))
                seat = arg;
            else
                console.error(errRoundInfo() + `mopai: 不合规的 seat: ${arg}, 当前对局玩家数: ${base_info.player_cnt}`);
        } else if (arg instanceof Array && arg.length === 1 && typeof arg[0] == 'number') {
            if (isAwaitingIndex(arg[0]))
                index = arg[0];
            else
                console.error(errRoundInfo() + `mopai: 不合规的 awaiting_index: ${arg[0]}`);
        }

    let liqi: Liqi = null;
    let hunzhiyiji_data: HunzhiyijiInfo_Player = null;

    lstActionCompletion();

    if (seat === undefined) {
        const lst_name = getLstAction().name, lst_seat = getLstAction().data.seat;
        // 自家鸣牌, 摸牌家仍然是上个操作的玩家
        if (['RecordChiPengGang', 'RecordBaBei', 'RecordAnGangAddGang'].includes(lst_name))
            seat = lst_seat;
        // 广义切牌, 摸牌家是上个操作玩家的下一家
        if (['RecordDiscardTile', 'RecordLockTile'].includes(lst_name))
            seat = is_hunzhiyiji() && hunzhiyiji_info[lst_seat].liqi && !hunzhiyiji_info[lst_seat].overload ? lst_seat : (lst_seat + 1) % base_info.player_cnt as Seat;

        // 血战到底和牌, 摸牌家为最后和牌家的下一家
        if (lst_name === 'RecordHuleXueZhanMid') {
            if (getLstAction(2).name === 'RecordAnGangAddGang') {
                if (is_chuanma()) // 川麻枪杠, 摸牌家为被枪杠家的下一家
                    seat = (getLstAction(2).data.seat + 1) % base_info.player_cnt;
                else // 修罗则为被枪杠家继续岭上摸牌
                    seat = getLstAction(2).data.seat;
            } else {
                const lst_index = getLstAction().data.hules.length - 1;
                seat = (getLstAction().data.hules[lst_index].seat + 1) % base_info.player_cnt;
            }
        }
        // 血流成河或国标错和, 摸牌家为和牌之前最后操作玩家的下一家
        if (['RecordHuleXueLiuMid', 'RecordCuohu'].includes(lst_name))
            seat = (getLstAction(2).data.seat + 1) % base_info.player_cnt;

        while (huled[seat])
            seat = (seat + 1) % base_info.player_cnt;
        if (isNaN(seat))
            throw new Error(errRoundInfo() + `mopai: 无法判断谁摸牌, getLstAction().name: ${lst_name}`);
    }
    if (tile === undefined && deal_tiles[seat].length > 0) {
        const tmp_tile = deal_tiles[seat].shift();
        if (tmp_tile !== '..')
            tile = tmp_tile;
    }

    // 是否明牌
    const tile_state = is_openhand() || liqi_info[seat].kai;

    // 占星之战, 填充牌候选池供 seat 号玩家选择
    if (is_zhanxing()) {
        if (index === undefined)
            index = 0;
        if (base_info.draw_type === 0)
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
        draw_card = awaiting_tiles.splice(index, 1)[0];
    else if (base_info.draw_type === 0)
        draw_card = paishan[paishan.length - 1];

    player_tiles[seat].push(draw_card);

    if (!is_zhanxing())
        base_info.draw_type === 0 ? paishan.pop() : paishan.shift();
    base_info.lst_draw_type = base_info.draw_type;
    base_info.draw_type = 1;

    addDealTile(seat, draw_card, liqi, tile_state, index, hunzhiyiji_data);

    // 完成上个操作的后续
    function lstActionCompletion(): void {
        const lst_name = getLstAction().name, lst_seat = getLstAction().data.seat;
        // 开杠翻指示牌
        if (dora_cnt.lastype === 2) {
            dora_cnt.cnt += 1 + dora_cnt.bonus;
            dora_cnt.li_cnt += 1 + dora_cnt.bonus;
            dora_cnt.bonus = dora_cnt.lastype = 0;
        }

        // pass掉自家鸣牌, 则破一发
        for (let i = 0; i < base_info.player_cnt; i++)
            if (liqi_info[i].yifa === -1)
                liqi_info[i].yifa = 0;

        // pass掉上个操作的牌的, pre同巡振听和pre立直振听 转 真实振听
        for (let i = 0; i < base_info.player_cnt; i++) {
            if (zhenting.tongxun[0][i])
                zhenting.tongxun[1][i] = true;
            if (zhenting.liqi[0][i])
                zhenting.liqi[1][i] = true;
        }

        // 龙之目玉: 更新目玉数据
        if (is_muyu() && muyu_info.count === 0)
            updateMuyu();

        // 川麻: 刮风下雨结算点数
        if (is_chuanma())
            calcGangPoint();

        // 暗夜之战: 暗牌无人开
        if (is_anye() && lst_name === 'RecordRevealTile')
            addLockTile(lst_seat, 2);

        // 魂之一击: 已过载的玩家, push 一次过载数据
        if (is_hunzhiyiji()) {
            const count = hunzhiyiji_info[lst_seat].continue_deal_count;
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
 * 切牌, 参数顺序可以不一致, 包含
 * - {Seat} - 切牌的玩家, 没有此参数时按照正常对局流程
 * - {Tile} - 切的牌, 没有此参数时将根据 discard_tiles 确定或摸切
 * - {boolean|'kailiqi'} - 是否立直, 默认不立直, 若为 'kailiqi', 则为开立直
 * - {'anpai' | 'anpai_ignore_1000'}  - 暗夜之战: 当值为字符串 'anpai' 时, 表示暗牌, 若为 'anpai_ignore_1000' 则不会支付1000点, 默认不暗牌
 * - {[BeishuiType]} - 背水之战: 立直类型, 有效值为 '[0]', '[1]', '[2]', 默认为普通立直, 需要配合 is_liqi 使用
 */
export const qiepai = (...args: any[]): void => {
    let seat: Seat, tile: Tile, is_liqi: boolean, anpai: 'anpai' | 'anpai_ignore_1000',
        beishui_type: BeishuiType;
    let is_kailiqi = false;
    // 参数预处理
    for (const arg of args)
        if (['anpai', 'anpai_ignore_1000'].includes(arg))
            anpai = arg;
        else if (arg === 'kailiqi')
            is_kailiqi = is_liqi = true;
        else if (typeof arg == 'number') {
            if (isValidSeat(arg))
                seat = arg;
            else
                throw new Error(errRoundInfo() + `qiepai: 不合规的 seat: ${arg}, 当前对局玩家数: ${base_info.player_cnt}`);
        } else if (typeof arg == 'boolean')
            is_liqi = arg;
        else if (arg instanceof Array && arg.length === 1 && typeof arg[0] === 'number') {
            if (isBeishuiType(arg[0]))
                beishui_type = arg[0];
            else
                throw new Error(errRoundInfo() + `qiepai: 不合规的 beishui_type: ${arg[0]}`);
        } else if (typeof arg == 'string') {
            if (isTile(arg))
                tile = arg;
            else
                throw new Error(errRoundInfo() + `qiepai: 不合规的牌: ${arg}`);
        }

    lstActionCompletion();

    const lst_name = getLstAction().name;
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
        const tmp_tile = discard_tiles[seat].shift();
        if (tmp_tile !== '..')
            tile = tmp_tile;
    }
    if (tile === undefined)
        tile = player_tiles[seat][player_tiles[seat].length - 1];
    moqie &&= player_tiles[seat][player_tiles[seat].length - 1] === tile && !['RecordNewRound', 'RecordChiPengGang'].includes(lst_name);

    // 切牌解除同巡振听
    zhenting.tongxun[0][seat] = zhenting.tongxun[1][seat] = false;
    updateZhenting();

    // 确定立直类型
    const is_wliqi = is_liqi && liqi_info[seat].yifa !== 0 && liqi_info[seat].liqi === 0;

    // 确定 lst_liqi
    if (is_liqi && liqi_info[seat].liqi === 0) {
        lst_liqi.valid = true;
        lst_liqi.seat = seat;
        lst_liqi.liqi = is_wliqi ? 2 : 1;
        lst_liqi.kai = is_kailiqi;
        lst_liqi.beishui_type = beishui_type;
    }

    // 切的牌是否为明牌
    const tile_state = is_openhand() || is_begin_open() && eraseMingpai(seat, tile);

    // 龙之目玉: 更新目玉数据
    if (is_muyu() && seat === muyu_info.seat)
        updateMuyu();

    // 暗夜之战: 暗牌支付1000点
    if (is_anye() && anpai === 'anpai') {
        scores[seat] -= 1000;
        base_info.liqibang++;
    }
    if (is_anye() && anpai === 'anpai_ignore_1000')
        anpai = 'anpai';

    // 幻境传说: 命运卡3
    if (get_field_spell_mode(3) === 3)
        if (liqi_info[seat].liqi !== 0)
            spell_hourglass[seat]++;

    // 咏唱之战: 更新手摸切数据
    if (is_yongchang()) {
        shoumoqie[seat].push(!moqie);
        updateShoumoqie(seat);
    }

    // 魂之一击: 宣布魂之一击立直
    if (is_hunzhiyiji() && lst_liqi.valid)
        hunzhiyiji_info[seat] = {
            seat: seat,
            liqi: lst_liqi.liqi,
            continue_deal_count: 6,
            overload: false,
        };

    // 切的牌从 player_tiles 中移除
    const index = player_tiles[seat].lastIndexOf(tile);
    if (index === -1) // 要切的牌手牌中没有, 则报错
        console.error(errRoundInfo() + `qiepai: seat: ${seat} 手牌不存在要切的牌: ${tile}`);
    player_tiles[seat].splice(index, 1);
    if (!moqie)
        player_tiles[seat].sort(cmp);

    // 切的牌 push 到 paihe 中, 并计算流局满贯
    paihe[seat].tiles.push(tile);
    if (!(is_anye() && anpai === 'anpai') && !Constants.YAOJIU_TILE.includes(tile))
        paihe[seat].liujumanguan = false;

    if (liqi_info[seat].yifa > 0)
        liqi_info[seat].yifa--;

    if (is_anye() && anpai === 'anpai')
        addRevealTile(seat, tile, moqie, is_liqi, is_wliqi);
    else {
        addDiscardTile(seat, tile, moqie, is_liqi, is_wliqi, is_kailiqi, tile_state, beishui_type);

        judgeShezhangzt(seat);
        prejudgeZhenting(seat, tile);
    }

    // 完成上个操作的后续
    function lstActionCompletion(): void {
        // 包杠失效
        base_info.baogang_seat = -1;

        // 开杠翻指示牌
        if (dora_cnt.lastype === 1) {
            dora_cnt.cnt += 1 + dora_cnt.bonus;
            dora_cnt.li_cnt += 1 + dora_cnt.bonus;
            dora_cnt.bonus = dora_cnt.lastype = 0;
        }
    }
};

/**
 * 他家鸣牌(吃/碰/明杠), 参数顺序可以不一致, 包含
 * - {Seat} - 鸣牌的玩家, 没有此参数时按照能否可以 明杠/碰/吃 确定鸣牌玩家
 * - {string|string[]} - 鸣牌家从手里拿出来的牌, 没有此参数时将根据能否可以 明杠/碰/吃 确定鸣牌类型
 * - {boolean} - 川麻: 开杠刮风下雨是否击飞, 默认不击飞
 */
export const mingpai = (...args: any[]): void => {
    let seat: Seat, tiles: Tile[], jifei: boolean;
    // 参数预处理
    for (const arg of args)
        if (typeof arg == 'number') {
            if (isValidSeat(arg))
                seat = arg;
            else
                throw new Error(errRoundInfo() + `mingpai: 不合规的 seat: ${arg}, 当前对局玩家数: ${base_info.player_cnt}`);
        } else if (typeof arg == 'boolean')
            jifei = arg;
        else if (arg instanceof Array || typeof arg == 'string')
            tiles = separate(arg);

    const from = getLstAction().data.seat, tile = getLstAction().data.tile;

    if (seat === undefined)
        if (tiles !== undefined)
            if (!isEqualTile(tiles[0], tile))
                seat = (from + 1) % base_info.player_cnt;
            else
                for (let i = from + 1; i < from + base_info.player_cnt; i++) {
                    const seat2: Seat = i % base_info.player_cnt as Seat;
                    const cnt: TileNum = {};
                    for (const tile of player_tiles[seat2])
                        if (cnt[simplify(tile)] === undefined)
                            cnt[simplify(tile)] = 0;
                        else
                            cnt[simplify(tile)]++;
                    if (tiles.length === 3 && cnt[simplify(tiles[0])] >= 3)
                        seat = seat2;
                    else if (tiles.length === 2 && cnt[simplify(tiles[0])] >= 2)
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
        if (base_info.player_cnt === 4 && !is_chuanma()) {
            seat = (from + 1) % base_info.player_cnt as Seat;
            if (tile[1] !== 'z' && !['1', '2'].includes(tile[0])) // 吃上端
                if (trying([parseInt(simplify(tile)) - 2 + tile[1], parseInt(simplify(tile)) - 1 + tile[1]] as Tile[], seat))
                    return;
            if (tile[1] !== 'z' && !['1', '9'].includes(tile[0])) // 吃中间
                if (trying([parseInt(simplify(tile)) - 1 + tile[1], parseInt(simplify(tile)) + 1 + tile[1]] as Tile[], seat))
                    return;
            if (tile[1] !== 'z' && !['8', '9'].includes(tile[0])) // 吃下端
                if (trying([parseInt(simplify(tile)) + 1 + tile[1], parseInt(simplify(tile)) + 2 + tile[1]] as Tile[], seat))
                    return;
        }

        throw new Error(errRoundInfo() + `mingpai: seat: ${from} 的切牌: ${tile} 没有玩家能 mingpai`);
    }
    if (tiles.length <= 1)
        throw new Error(errRoundInfo() + `mingpai: seat: ${from} 的切牌: ${tile} 后的 mingpai tiles 参数不对: ${tiles}`);

    let liqi = null;
    lstActionCompletion();

    // 鸣出去的牌是否为明牌
    const tile_states: boolean[] = [];
    if (is_begin_open())
        for (const tile of tiles)
            tile_states.push(eraseMingpai(seat, tile));

    let type: ChiPengGangType, tiles_from: Seat[], fulu_tiles: Tile[];
    if (!isEqualTile(tiles[0], tile)) { // 吃
        type = 0;
        tiles_from = [seat, seat, from];
        fulu_tiles = [tiles[0], tiles[1], tile];
    } else if (tiles.length === 2) { // 碰
        type = 1;
        tiles_from = [seat, seat, from];
        fulu_tiles = [tiles[0], tiles[1], tile];

        // 幻境传说: 庄家卡4
        if (get_field_spell_mode(1) === 4 && seat === base_info.ju)
            dora_cnt.lastype = is_dora_jifan() ? 2 : 1;
    } else if (tiles.length === 3) { // 大明杠
        type = 2;
        tiles_from = [seat, seat, seat, from];
        fulu_tiles = [tiles[0], tiles[1], tiles[2], tile];

        // 幻境传说: 庄家卡4
        if (get_field_spell_mode(1) === 4 && seat === base_info.ju)
            dora_cnt.bonus = 1;
        dora_cnt.lastype = is_dora_jifan() ? 2 : 1;

        if (is_chuanma())
            chuanma_gangs.not_over = {from: from, to: seat, val: 2000};
        else {
            if (!is_guobiao()) {
                let gang_num = 0; // 查是否四杠子确定, 用于包牌
                for (const f of fulu[seat])
                    if (f.type === 2 || f.type === 3) // 查杠子个数
                        gang_num++;
                if (gang_num === 3) // 之前已经有3个杠子, 则第4个杠构成四杠子包牌
                    sigang_bao[seat] = true;

                if (is_baogang()) // 包杠
                    base_info.baogang_seat = from;
            }
            base_info.draw_type = 0;
        }
    }
    // 副露信息 push 到 fulu
    fulu[seat].push({type: type, tile: fulu_tiles.slice(), from: from});

    // 从 player_tiles 中移除鸣出去的牌
    for (const tile of tiles)
        player_tiles[seat].splice(player_tiles[seat].indexOf(tile), 1);

    // 幻境传说: 命运卡4
    if (get_field_spell_mode(3) === 4) {
        scores[seat] -= 500;
        scores[from] += 500;
    }
    // 幻境传说: 命运卡5
    if (get_field_spell_mode(3) === 5 && isDora(tile)) {
        scores[seat] -= 2000;
        base_info.liqibang += 2;
    }

    addChiPengGang(seat, fulu_tiles, tiles_from, type, liqi, tile_states);

    // 川麻开杠击飞
    if (jifei)
        roundEnd();

    // 完成上个操作的后续
    function lstActionCompletion(): void {
        // pass掉上个操作的牌的, pre同巡振听和pre立直振听 转 真实振听
        for (let i = 0; i < base_info.player_cnt; i++) {
            if (zhenting.tongxun[0][i])
                zhenting.tongxun[1][i] = true;
            if (zhenting.liqi[0][i])
                zhenting.liqi[1][i] = true;
        }

        // 破流满
        paihe[from].liujumanguan = false;

        // 龙之目玉: 更新目玉信息
        if (is_muyu() && muyu_info.count === 0)
            updateMuyu();

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

        for (let i = 0; i < base_info.player_cnt; i++)
            liqi_info[i].yifa = 0;
    }

    /**
     * 判断玩家能否鸣牌出 x 牌型的牌
     * @param x - 牌型, 组合之一
     * @param seat - 鸣牌的玩家, 可能为 undefined
     */
    function trying(x: Tile[], seat: Seat): boolean {
        const x0 = allEqualTiles(x[0]).reverse(), x1 = allEqualTiles(x[1]).reverse(), x2: Tile[] = [];
        if (x.length === 3) // 大明杠
            x2.push(...allEqualTiles(x[2]).reverse());
        for (const i in x0)
            for (const j in x1) {
                const try_tiles = [x0[i], x1[j]];
                if (x.length === 3) // 大明杠
                    for (const k in x2) {
                        try_tiles.push(x2[k]);
                        if (tryMingpai(try_tiles))
                            return true;
                        try_tiles.pop();
                    }
                else if (tryMingpai(try_tiles))
                    return true;
            }
        return false;

        /**
         * 判断 x 牌对应的某个组合 try_tiles 能否有玩家能鸣
         * @param try_tiles - 牌型, 组合之一
         */
        function tryMingpai(try_tiles: Tile[]): boolean {
            for (let i = 0; i < base_info.player_cnt; i++) {
                const seat2 = (from + 1 + i) % base_info.player_cnt as Seat;
                if ((seat === seat2 || seat === undefined) && inTiles(try_tiles, player_tiles[seat2])) {
                    mingpai(seat2, try_tiles, jifei);
                    return true;
                }
            }
            return false;
        }
    }
};

/**
 * 自家鸣牌(暗杠/加杠/拔北), 参数顺序可以不一致, 包含
 * - {number} - 鸣牌的玩家, 没有此参数时按照正常对局流程
 * - {string} - 要鸣的牌, 没有此参数时按照是否可以"拔北, 暗杠, 加杠"的顺序判断
 * - {ZiMingInputType} - 操作类型, 暗杠/加杠/拔北分别为 'angang'/'jiagang'/'babei', 没有此参数时按照是否可以"拔北, 暗杠, 加杠"的顺序判断
 * - {boolean} - 川麻: 开杠刮风下雨是否击飞, 默认不击飞
 */
export const zimingpai = (...args: any[]): void => {
    let seat: Seat, tile: Tile, type: ZiMingInputType, jifei: boolean;
    // 参数预处理
    for (const arg of args)
        if (['babei', 'angang', 'jiagang', 'baxi'].includes(arg))
            type = arg;
        else if (typeof arg == 'number') {
            if (isValidSeat(arg))
                seat = arg;
            else
                console.error(errRoundInfo() + `zimingpai: 不合规的 seat: ${arg}, 当前对局玩家数: ${base_info.player_cnt}`);
        } else if (typeof arg == 'boolean')
            jifei = arg;
        else if (typeof arg == 'string') {
            if (isTile(arg))
                tile = arg;
            else
                console.error(errRoundInfo() + `zimingpai: 不合规的牌: ${arg}`);
        }

    if (seat === undefined) {
        seat = getLstAction().data.seat;
        if (seat === undefined)
            throw new Error(errRoundInfo() + `zimingpai: 无法判断谁 zimingpai, getLstAction().name: ${getLstAction().name}`);
    }
    if (jifei === undefined)
        jifei = false;
    if (tile === undefined) {
        if (trying())
            return;
        throw new Error(errRoundInfo() + `zimingpai: seat: ${seat}, xun: ${xun[seat].length}: 玩家无法 zimingpai (没给 tile 情况下)`);
    }

    // 上个操作补完: 开杠翻指示牌
    if (dora_cnt.lastype === 1) {
        dora_cnt.cnt += 1 + dora_cnt.bonus;
        dora_cnt.li_cnt += 1 + dora_cnt.bonus;
        dora_cnt.bonus = dora_cnt.lastype = 0;
    }

    // 和 tile 等效牌的个数
    const tile_cnt = player_tiles[seat].filter(t => isEqualTile(t, tile)).length;

    // 拔北
    let is_babei = tile_cnt >= 1 && (base_info.player_cnt === 3 || base_info.player_cnt === 2) && isEqualTile(tile, '4z') && (!type || type === 'babei');
    // 拔西, 并入拔北
    is_babei ||= tile_cnt >= 1 && base_info.player_cnt === 2 && isEqualTile(tile, '3z') && (!type || type === 'baxi');
    // 国标补花'拔花', 需要载入 add_function.js
    is_babei ||= is_guobiao() && tile === Constants.HUAPAI && type === 'babei' && typeof editFunction == 'function';
    // 强制拔北, 需要载入 add_function.js
    is_babei ||= tile_cnt >= 1 && type === 'babei' && typeof editFunction == 'function';

    let is_angang = tile_cnt >= 4 && (!type || type === 'angang');

    let is_jiagang = false;
    if (tile_cnt > 0 && (!type || type === 'jiagang') && player_tiles[seat].includes(tile))
        for (const f of fulu[seat])
            if (isEqualTile(f.tile[0], tile) && f.type === 1) {
                is_jiagang = true;
                break;
            }

    // 自家鸣牌会使得所有玩家的一发进入特殊状态, 若pass掉则一发立即消失
    for (let i = 0; i < base_info.player_cnt; i++)
        if (liqi_info[i].yifa > 0)
            liqi_info[i].yifa = -1;
    prejudgeZhenting(seat, tile, is_angang);

    // 鸣出去的牌明牌状态
    const tile_states: boolean[] = [];

    if (!is_chuanma())
        base_info.draw_type = 0;

    // 拔北
    if (is_babei) {
        if (is_begin_open())
            tile_states.push(eraseMingpai(seat, tile));
        fulu[seat].push({type: 4, tile: [tile]});
        player_tiles[seat].splice(player_tiles[seat].lastIndexOf(tile), 1);
        player_tiles[seat].sort(cmp);

        addBaBei(seat, tile, tile_states);

    } else if (is_angang || is_jiagang) {
        const ziming_type: ZiMingType = is_angang ? 3 : 2;
        // 幻境传说: 庄家卡4
        if (get_field_spell_mode(1) === 4 && seat === base_info.ju)
            dora_cnt.bonus = 1;

        dora_cnt.lastype = is_angang || is_jiagang && is_dora_jifan() ? 2 : 1;

        if (is_angang) {
            const tmp_fulu: { type: FuLuType, tile: Tile[] } = {type: 3, tile: []};
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
                for (let i: Seat = 0; i < base_info.player_cnt; i++) {
                    if (i === seat || huled[i])
                        continue;
                    chuanma_gangs.not_over = {from: i as Seat, to: seat, val: 2000};
                }
        } else {
            if (is_begin_open())
                tile_states.push(eraseMingpai(seat, tile));
            let index: number;
            for (const f of fulu[seat])
                if (isEqualTile(f.tile[0], tile) && f.type === 1) {
                    f.type = 2;
                    f.tile.push(tile);
                    index = player_tiles[seat].lastIndexOf(tile);
                    player_tiles[seat].splice(index, 1);
                    break;
                }

            // 本来应该是 player_tiles[seat].length - 1, 但因上面 splice 长度减1, 这里就加1
            if (is_chuanma() && index === player_tiles[seat].length)
                for (let i: Seat = 0; i < base_info.player_cnt; i++) {
                    if (i === seat || huled[i])
                        continue;
                    chuanma_gangs.not_over = {from: i as Seat, to: seat, val: 1000};
                }
        }
        player_tiles[seat].sort(cmp);

        addAnGangAddGang(seat, tile, ziming_type, tile_states);

        if (jifei)
            roundEnd();
    } else
        throw new Error(errRoundInfo() + `zimingpai: seat: ${seat}, xun: ${xun[seat].length}: 玩家无法 zimingpai (给定 tile: ${tile} 情况下)`);

    // seat 号玩家尝试自家鸣牌, 按照顺序: 国标补花, 拔北, 拔西, 暗杠, 加杠
    function trying(): boolean {
        // 国标补花
        if (is_guobiao() && typeof editFunction == 'function' && inTiles(Constants.HUAPAI, player_tiles[seat])) {
            zimingpai(seat, Constants.HUAPAI, 'babei');
            return true;
        }
        let all_tiles: Tile[];
        // 拔北
        if (base_info.player_cnt === 2 || base_info.player_cnt === 3) {
            all_tiles = allEqualTiles('4z').reverse();
            for (const tile of all_tiles)
                if (inTiles(tile, player_tiles[seat])) {
                    zimingpai(seat, tile, 'babei');
                    return true;
                }
        }
        // 拔西
        if (base_info.player_cnt === 2 && typeof editFunction == 'function') {
            all_tiles = allEqualTiles('3z').reverse();
            for (const tile of all_tiles)
                if (inTiles(tile, player_tiles[seat])) {
                    zimingpai(seat, tile, 'babei');
                    return true;
                }
        }
        // 暗杠
        for (const tile of player_tiles[seat]) {
            all_tiles = allEqualTiles(tile).reverse();
            for (const x0 in all_tiles)
                for (const x1 in all_tiles)
                    for (const x2 in all_tiles)
                        for (const x3 in all_tiles) {
                            const tmp_angang = [all_tiles[x0], all_tiles[x1], all_tiles[x2], all_tiles[x3]];
                            if (inTiles(tmp_angang, player_tiles[seat])) {
                                zimingpai(seat, all_tiles[x0], 'angang', jifei);
                                return true;
                            }
                        }
        }
        // 加杠
        for (const tile of player_tiles[seat]) {
            all_tiles = allEqualTiles(tile).reverse();
            for (const tile of all_tiles)
                if (inTiles(tile, player_tiles[seat])) {
                    let can_jiagang = false;
                    for (const f of fulu[seat])
                        if (isEqualTile(f.tile[0], tile) && f.type === 1) {
                            can_jiagang = true;
                            break;
                        }
                    if (can_jiagang) {
                        zimingpai(seat, tile, 'jiagang', jifei);
                        return true;
                    }
                }
        }
        return false;
    }
};

/**
 * 和牌, 参数顺序可以不一致, 包含
 * - {Seat|Seat[]} - 本次和牌所有和牌的玩家, 没有此参数时按照正常对局流程
 * - {boolean} - 修罗/川麻: 是否为最终和牌, 默认为中途和牌
 */
export const hupai = (...args: any[]): void => {
    let seats: Seat[], type: boolean;
    // 参数预处理
    for (const arg of args)
        if (typeof arg == 'number') {
            if (isValidSeat(arg))
                seats = [arg];
            else
                console.error(errRoundInfo() + `hupai: 不合规的 seat: ${arg}, 当前对局玩家数: ${base_info.player_cnt}`);
        } else if (arg instanceof Array) {
            for (const s of arg)
                if (typeof s != "number" || !isValidSeat(s))
                    console.error(errRoundInfo() + `hupai: 不合规的 seat: ${s}, 当前对局玩家数: ${base_info.player_cnt}`);
            seats = arg;
        } else if (typeof arg == 'boolean')
            type = arg;

    // 川麻枪杠, 则杠不收取点数
    if (is_chuanma())
        chuanma_gangs.not_over = null;

    if (type === undefined)
        type = false;
    if (seats === undefined || seats.length === 0) {
        const lst_name = getLstAction().name, lst_seat = getLstAction().data.seat;
        if (['RecordDealTile', 'RecordNewRound'].includes(lst_name))
            seats = [lst_seat];
        else { // 荣和
            seats = [];
            for (let i = lst_seat + 1; i < lst_seat + base_info.player_cnt; i++) {
                const seat = i % base_info.player_cnt as Seat;
                if (huled[seat])
                    continue;
                push2PlayerTiles(seat);
                if ((is_chuanma() || is_guobiao() && !cuohu[seat] || !is_chuanma() && !is_guobiao() && !zhenting.result[seat]) && calcHupai(player_tiles[seat]) !== 0) {
                    if (!is_chuanma() && !is_guobiao() && !is_ronghuzhahu()) { // 非川麻国标防止自动无役荣和诈和
                        const points = calcFan(seat, false, lst_seat);
                        if (calcSudian(points) !== -2000)
                            seats.push(seat);
                    } else
                        seats.push(seat);
                }
                player_tiles[seat].pop();
                if (!is_chuanma() && (is_toutiao() || is_mingjing() || is_guobiao()) && seats.length >= 1)
                    break;
            }
        }
        if (seats.length === 0)  // 没给参数 seat 的情况下, 无人能正常和牌
            throw new Error(errRoundInfo() + 'hupai: 没给 seat 参数无人能正常和牌');
    }

    // seats 重新排序, 按照放铳家逆时针顺序
    if (seats.length > 1) {
        const lst_name = getLstAction().name;
        let lst_seat = getLstAction().data.seat;
        if (['RecordNewRound', 'RecordDealTile'].includes(lst_name))
            lst_seat = (lst_seat + base_info.player_cnt - 1) % base_info.player_cnt;

        const hupai_seats = [false, false, false, false];
        for (const seat of seats)
            hupai_seats[seat] = true;
        seats = [];
        for (let i = lst_seat + 1; i <= lst_seat + base_info.player_cnt; i++)
            if (hupai_seats[i % base_info.player_cnt])
                seats.push(i % base_info.player_cnt as Seat);
    }

    if (is_toutiao() || is_mingjing() || is_guobiao()) // 有头跳且参数给了至少两家和牌的情况, 则取头跳家
        seats = [seats[0]];

    // 非血战到底, 血流成河模式
    if (!is_xuezhandaodi() && !is_wanxiangxiuluo() && !is_chuanma() && !is_xueliu()) {
        const ret: HuleInfo[] = [];
        let baopai_player: BaopaiPlayer = 0;
        for (const seat of seats)
            ret.push(!is_guobiao() ? huleOnePlayer(seat) : huleOnePlayerGuobiao(seat));
        // 国标错和陪打
        if (is_guobiao() && is_cuohupeida() && typeof editFunction == 'function' && ret[0].cuohu) {
            const old_scores = scores.slice() as Players_Number;
            for (let i = 0; i < base_info.player_cnt; i++)
                if (i === seats[0])
                    delta_scores[i] = -3 * cuohu_points() * scale_points();
                else
                    delta_scores[i] = cuohu_points() * scale_points();
            for (let i = 0; i < base_info.player_cnt; i++)
                scores[i] += delta_scores[i];

            addCuohu(seats[0], ret[0].zimo, old_scores);

            for (let i = 0; i < base_info.player_cnt; i++)
                delta_scores[i] = 0;
            cuohu[seats[0]] = true;
            return;
        }
        for (const seat of seats)
            huled[seat] = true;
        // '包'字的选择
        // 包牌比包杠优先, 因为雀魂目前没有包杠, 以雀魂为主
        if (!is_guobiao() && base_info.baogang_seat !== -1)
            baopai_player = base_info.baogang_seat + 1;
        base_info.baogang_seat = -1;
        // 多家包牌, 自摸情况下以最先包牌的玩家为准
        // 荣和情况下, 以距放铳玩家最近的玩家的最先包牌的玩家为准
        if (!is_guobiao())
            for (const seat of seats)
                if (baopai[seat].length > 0) {
                    baopai_player = baopai[seat][0].seat + 1;
                    break;
                }
        let old_scores = scores.slice() as Players_Number;
        for (let i = 0; i < base_info.player_cnt; i++)
            scores[i] += delta_scores[i];

        // 天贵史VS原田克美_最终二人麻将决战
        if (config.mode.detail_rule._tianguishi_vs_yuantiankemei) {
            old_scores = [9200, 0, 20300, 0];
            delta_scores[0] = 12300;
            delta_scores[1] = delta_scores[2] = delta_scores[3] = 0;
            scores[0] = 21500;
            scores[2] = 20300;
            scores[1] = scores[3] = 0;
        }
        endHule(ret, old_scores, baopai_player as BaopaiPlayer);

        for (let i = 0; i < base_info.player_cnt; i++)
            delta_scores[i] = 0;
        if (huled[base_info.ju]) { // 亲家和牌, 则连庄
            if (!is_guobiao() || is_guobiao() && is_guobiao_lianzhuang())
                base_info.ben++;
            // 幻境传说: 庄家卡2
            if (get_field_spell_mode(1) === 2)
                base_info.ben += 4;
            base_info.lianzhuang_cnt++;
        } else {
            base_info.ju++;
            base_info.ben = 0;
            base_info.lianzhuang_cnt = 0;
        }
        roundEnd();
    } else {
        // 血流成河模式中, 和牌家prezhenting消失
        for (const seat of seats) {
            zhenting.tongxun[0][seat] = zhenting.tongxun[1][seat] = false;
            zhenting.liqi[0][seat] = zhenting.tongxun[1][seat] = false;
        }
        updateZhenting();

        const ret: HuleInfo[] = [];
        for (const seat of seats) {
            const whatever = !is_chuanma() ? huleOnePlayer(seat) : huleOnePlayerChuanma(seat);
            ret.push(whatever);
            hules_history.push(whatever);
        }
        if (is_chuanma() && base_info.first_hu_seat === -1)
            base_info.first_hu_seat = seats[0];
        if (!is_xueliu())
            for (const seat of seats)
                huled[seat] = true;
        const old_scores = scores.slice() as Players_Number;
        for (let i = 0; i < base_info.player_cnt; i++)
            scores[i] += delta_scores[i];

        if (!type) {
            let liqi = null;
            if (lst_liqi.valid) {
                if (scores[lst_liqi.seat] >= 1000 * base_info.liqi_need || is_fufenliqi())
                    liqi = {
                        seat: lst_liqi.seat,
                        liqibang: base_info.liqibang + base_info.liqi_need,
                        score: scores[lst_liqi.seat] - 1000 * base_info.liqi_need,
                    };
                else
                    liqi = {
                        seat: lst_liqi.seat,
                        liqibang: base_info.liqibang,
                        score: scores[lst_liqi.seat],
                        failed: true,
                    };
            }
            if (!is_chuanma())
                for (let i = 0; i < base_info.player_cnt; i++)
                    liqi_info[i].yifa = 0;

            if (!is_xueliu())
                addHuleXueZhanMid(ret, old_scores, liqi);
            else
                addHuleXueLiuMid(ret, old_scores);

            if (lst_liqi.valid && (scores[lst_liqi.seat] >= 1000 * base_info.liqi_need || is_fufenliqi())) {
                base_info.liqibang += base_info.liqi_need;
                scores[lst_liqi.seat] -= 1000 * base_info.liqi_need;
                liqi_info[lst_liqi.seat] = {liqi: lst_liqi.liqi, yifa: 0, kai: lst_liqi.kai};
            }
            lst_liqi.valid = false;
        } else {
            if (!is_xueliu())
                endHuleXueZhanEnd(ret, old_scores);
            else
                endHuleXueLiuEnd(ret, old_scores);
        }
        for (let i = 0; i < base_info.player_cnt; i++)
            delta_scores[i] = 0;
        if (type) {
            if (!is_chuanma())
                base_info.ju++;
            roundEnd();
        }
    }
};

/**
 * 荒牌流局, 任何时刻都可以调用
 */
export const huangpai = (): void => {
    // 暗夜之战暗牌无人开
    if (is_anye() && getLstAction().name === 'RecordRevealTile')
        addLockTile(getLstAction().data.seat, 2);

    // 幻境传说: 庄家卡3
    if (get_field_spell_mode(1) === 3) {
        scores[base_info.ju] += base_info.liqibang * 1000;
        base_info.liqibang = 0;
    }

    base_info.lianzhuang_cnt = 0; // 任意荒牌流局都会导致连庄数重置

    // 剩余玩家数, 听牌玩家数
    let player_left = 0, ting_cnt = 0;
    // 川麻未听返杠的点数
    const taxes = [0, 0, 0, 0];

    // 玩家的听牌信息
    const ting_info: TingInfo = [];
    for (let i: Seat = 0; i < base_info.player_cnt; i++) {
        if (!huled[i])
            player_left++;
        const tings = huled[i] ? [] : calcTingpai(i as Seat);
        if (tings.length === 0)
            ting_info.push({tingpai: false, hand: [], tings: tings});
        else {
            ting_cnt++;
            ting_info.push({tingpai: true, hand: player_tiles[i].slice(), tings: tings});
        }
    }
    const noting_cnt = player_left - ting_cnt; // 未听玩家数

    // 幻境传说: 命运卡1
    // 流局满贯/罚符倍数
    const times = get_field_spell_mode(3) === 1 ? 2 : 1;

    // 玩家的点数变动信息
    let scores_info: ScoresInfo = [];

    // 是否有流满
    let liujumanguan = false;
    if (!is_chuanma() && !is_guobiao())
        for (let i = 0; i < base_info.player_cnt; i++)
            if (paihe[i].liujumanguan && !huled[i])
                liujumanguan = true;

    if (liujumanguan)
        for (let i = base_info.ju; i < base_info.ju + base_info.player_cnt; i++) {
            const seat = i % base_info.player_cnt as Seat;
            if (!paihe[seat].liujumanguan || huled[seat])
                continue;

            const cur_delta_scores: Players_Number = [0, 0];
            for (let i = 0; i < base_info.player_cnt; i++)
                cur_delta_scores[i] = 0;
            const score = calcScore(seat, cur_delta_scores as Players_Number);
            scores_info.push({
                seat: seat,
                score: score,
                old_scores: scores.slice() as Players_Number,
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

                for (let i = 0; i < base_info.player_cnt; i++) {
                    if (huled[i])
                        continue;
                    if (ting_info[i].tingpai) // 幻境传说: 命运卡1
                        delta_scores[i] += fafu * noting_cnt / ting_cnt * times;
                    else
                        delta_scores[i] -= fafu * times;
                }
            } else { // seat 向 i 查大叫, 查花猪
                for (let seat: Seat = 0; seat < base_info.player_cnt; seat++) {
                    for (let i: Seat = 0; i < base_info.player_cnt; i++) {
                        if (huled[seat] || huled[i] || i === seat)
                            continue;
                        let points = 0;
                        if (huazhu(i as Seat))
                            points = Math.max(calcSudianChuanma(calcFanChuanma(seat as Seat, false, true)), 8000);
                        else if (!ting_info[i].tingpai && ting_info[seat].tingpai)
                            points = calcSudianChuanma(calcFanChuanma(seat as Seat, false, true));
                        delta_scores[seat] += points;
                        delta_scores[i] -= points;
                    }
                }
            }
        }
        // 川麻未听返杠
        if (is_chuanma())
            for (const gang of chuanma_gangs.over) {
                const from = gang.from, to = gang.to, val = gang.val;
                if (!(ting_info[to].tingpai || huled[to])) {
                    taxes[to] -= val;
                    taxes[from] += val;
                }
            }

        scores_info = [{
            old_scores: scores.slice() as Players_Number,
            delta_scores: delta_scores.slice() as Players_Number,
            taxes: is_chuanma() ? taxes.slice() as [number, number, number, number] : undefined,
        }];
    }

    endNoTile(liujumanguan, ting_info, scores_info);

    for (let i = 0; i < base_info.player_cnt; i++) {
        scores[i] += delta_scores[i] + taxes[i];
        delta_scores[i] = taxes[i] = 0;
    }

    if (!is_xuezhandaodi() && !is_wanxiangxiuluo() && !is_chuanma())
        base_info.ben += get_field_spell_mode(1) === 2 ? 5 : 1; // 幻境传说: 庄家卡2
    if ((!ting_info[base_info.ju].tingpai || is_xuezhandaodi() || is_wanxiangxiuluo() || is_guobiao() && !is_guobiao_lianzhuang()) && !is_chuanma())
        base_info.ju++;

    roundEnd();

    /**
     * 计算 seat 号玩家的流局满贯导致的各家点数变动, 并返回流满点数
     * @param seat - seat 号玩家
     * @param cur_delta_scores - 该流满导致的玩家点数变动
     */
    function calcScore(seat: Seat, cur_delta_scores: Players_Number): number {
        let score = 0;
        for (let i = 0; i < base_info.player_cnt; i++) {
            if (seat === i || huled[i])
                continue;
            // 幻境传说: 命运卡1
            if (seat === base_info.ju || i === base_info.ju) {
                cur_delta_scores[i] -= 4000 * times;
                cur_delta_scores[seat] += 4000 * times;
                score += 4000 * times;
            } else {
                cur_delta_scores[i] -= 2000 * times;
                cur_delta_scores[seat] += 2000 * times;
                score += 2000 * times;
            }
        }
        if ((base_info.player_cnt === 3 || base_info.player_cnt === 2) && no_zimosun()) {
            const base_points = base_info.player_cnt === 3 ? 1000 : 4000;
            for (let j = 0; j < base_info.player_cnt; j++) {
                if (seat === j || huled[j])
                    continue;
                if (seat === base_info.ju) {
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
        for (let i = 0; i < base_info.player_cnt; i++)
            delta_scores[i] += cur_delta_scores[i];
        return score;
    }
};

/**
 * 途中流局
 * @param liuju_type - 流局类型, 若没有该参数, 则除了"三家和了"外, 由系统自动判断属于哪种流局
 */
export const liuju = (liuju_type?: LiujuType): void => {
    const all_liuju = [jiuZhongJiuPai, siFengLianDa, siGangSanLe, siJiaLiZhi, sanJiaHuLe];
    const seat = getLstAction().data.seat;
    let type: LiujuType, tiles: Tile[];

    const allplayertiles = ['', '', '', ''];
    for (let i = 0; i < base_info.player_cnt; i++)
        allplayertiles[i] = player_tiles[i].join('|');

    if (typeof liuju_type == 'number')
        all_liuju[liuju_type - 1]();
    else
        for (const liuju_i of all_liuju) {
            liuju_i();
            if (type !== undefined)
                break;
        }

    const liqi = lstLiqi2Liqi();

    if (type !== undefined) {

        endLiuJu(type, seat, liqi, tiles, allplayertiles);

        if (!is_xuezhandaodi() && !is_wanxiangxiuluo() && !is_chuanma() && !is_guobiao())
            base_info.ben += get_field_spell_mode(1) === 2 ? 5 : 1; // 幻境传说: 庄家卡2

        roundEnd();
    } else
        throw new Error(errRoundInfo() + 'liuju: 不符合任何途中流局条件');

    // 九种九牌
    function jiuZhongJiuPai(): void {
        const has_tile: boolean[] = [];
        let type_num = 0;
        for (const tile of player_tiles[seat])
            if (Constants.YAOJIU_TILE.includes(simplify(tile)) && !has_tile[simplify(tile)]) {
                has_tile[simplify(tile)] = true;
                type_num++;
            }
        if (type_num >= 9 && liqi_info[seat].liqi === 0 && liqi_info[seat].yifa === 1 && player_tiles[seat].length === 14) {
            type = 1;
            tiles = player_tiles[seat].slice();
        }
    }

    // 四风连打
    function siFengLianDa(): void {
        if (base_info.player_cnt === 4)
            if (fulu[0].length === 0 && fulu[1].length === 0 && fulu[2].length === 0 && fulu[3].length === 0)
                if (paihe[0].tiles.length === 1 && paihe[1].tiles.length === 1 && paihe[2].tiles.length === 1 && paihe[3].tiles.length === 1)
                    if (isEqualTile(paihe[0].tiles[0], paihe[1].tiles[0]) && isEqualTile(paihe[1].tiles[0], paihe[2].tiles[0]) && isEqualTile(paihe[2].tiles[0], paihe[3].tiles[0]))
                        if (Constants.WIND_TILE.includes(simplify(paihe[0].tiles[0])))
                            type = 2;
    }

    // 四杠散了
    function siGangSanLe(): void {
        let gang_player_cnt = 0;
        for (let i = 0; i < base_info.player_cnt; i++)
            for (let f of fulu[i])
                if (f.type === 2 || f.type === 3) {
                    gang_player_cnt++;
                    break;
                }
        if (dora_cnt.cnt === 5 && gang_player_cnt >= 2)
            type = 3;
    }

    // 四家立直
    function siJiaLiZhi(): void {
        if (base_info.player_cnt === 4) {
            let liqi_player_cnt = 0;
            for (let i = 0; i < base_info.player_cnt; i++)
                if (liqi_info[i].liqi !== 0)
                    liqi_player_cnt++;

            if (lst_liqi.valid && liqi_player_cnt === 3)
                type = 4;
        }
    }

    // 三家和了, 需要设置 '_sanxiangliuju'
    function sanJiaHuLe(): void {
        if (is_sanxiangliuju())
            type = 5;
    }
};

// 使 gameBegin 每个牌谱只运行一次的变量
let game_begin_once: boolean;
// 使 roundBegin 每个小局只运行一次的变量
let round_begin_once: boolean;

// 只在一开局生效或者整个对局期间都不会变化的数据的初始化
export const gameBegin = (): void => {
    if (!game_begin_once)
        return;

    if (config.mode.mode >= 20 && config.mode.mode <= 29)
        base_info.player_cnt = 2;
    else if (config.mode.mode >= 10 && config.mode.mode <= 19)
        base_info.player_cnt = 3;
    else
        base_info.player_cnt = 4;

    all_data.config = config;
    player_datas.splice(base_info.player_cnt);
    all_data.player_datas = player_datas;

    if (base_info.player_cnt === 3 || base_info.player_cnt === 2) { // 三麻, 二麻屏蔽以下模式
        const x = config.mode.detail_rule;
        x.wanxiangxiuluo_mode = x.xuezhandaodi = x.muyu_mode = x.chuanma = false;
    }

    base_info.liqi_need = get_liqi_need();
    if (get_field_spell_mode(3) === 2) // 幻境传说: 命运卡2
        base_info.liqi_need = 2;

    [base_info.chang, base_info.ju, base_info.ben, base_info.liqibang] = get_chang_ju_ben_num();
    if (!base_info.liqibang)
        base_info.liqibang = 0;
    base_info.lianzhuang_cnt = 0;

    scores.splice(base_info.player_cnt);
    let init_point = get_init_point();
    if (init_point === -1) {
        if (base_info.player_cnt === 2)  // 二麻
            init_point = 50000;
        else if (base_info.player_cnt === 3)  // 三麻
            init_point = 35000;
        else { // 四麻
            if (is_guobiao())
                init_point = 300 * scale_points();
            else if (is_chuanma() || is_tianming())
                init_point = 50000;
            else if (is_muyu())
                init_point = 40000;
            else if (is_dora3())
                init_point = 35000;
            else
                init_point = 25000;
        }
    }
    for (let i = 0; i < base_info.player_cnt; i++)
        scores[i] = init_point;

    base_info.base_point = scores[0];

    const tmp_scores = get_init_scores() as Players_Number;
    for (const i in tmp_scores)
        scores[i] = tmp_scores[i];

    game_begin_once = false;
};

// 开局, 数据初始化
export const roundBegin = (): void => {
    if (all_data.all_actions.length === 0)
        gameBegin();
    if (!round_begin_once)
        return;

    actions.length = 0;
    for (let i = 0; i < base_info.player_cnt; i++) {
        fulu[i] = [];
        baopai[i] = [];
        xun[i] = [];
        shoumoqie[i] = [];
        huled[i] = false;
        sigang_bao[i] = false;
        cuohu[i] = false;
        zhenting.tongxun[0][i] = false;
        zhenting.tongxun[1][i] = false;
        zhenting.liqi[0][i] = false;
        zhenting.liqi[1][i] = false;
        zhenting.shezhang[i] = false;
        zhenting.result[i] = false;
        gaps[i] = 0;
        delta_scores[i] = 0;
        spell_hourglass[i] = 0;
        muyu.times[i] = 1;
        mingpais[i] = {};
        paihe[i] = {liujumanguan: !no_liujumanguan(), tiles: []};
        liqi_info[i] = {liqi: 0, yifa: 1, kai: false};
        hunzhiyiji_info[i] = {seat: i as Seat, liqi: 0, continue_deal_count: 0, overload: false};
        yongchang_data[i] = {seat: i as Seat, moqie_count: 0, moqie_bonus: 0, shouqie_count: 0, shouqie_bonus: 0};
    }
    muyu_info.id = muyu_info.seat = muyu_info.count = 0;
    lst_liqi.valid = false;
    chuanma_gangs.over = [];
    chuanma_gangs.not_over = null;
    dora_cnt.cnt = dora_cnt.li_cnt = is_dora3() || is_muyu() ? 3 : 1;
    dora_cnt.lastype = dora_cnt.bonus = 0;
    hules_history.length = 0;
    base_info.first_hu_seat = -1;
    base_info.benchangbang = base_info.ben;
    base_info.lst_draw_type = base_info.draw_type = 1;
    base_info.baogang_seat = -1;

    awaiting_tiles.length = 0;

    dora_indicator[0].length = dora_indicator[1].length = 0;
    for (let i = 0; i < 5; i++) {
        dora_indicator[0].push(paishan[paishan.length - (21 - 4 * base_info.player_cnt + 2 * i)]);
        dora_indicator[1].push(paishan[paishan.length - (22 - 4 * base_info.player_cnt + 2 * i)]);
    }

    let tiles = [separate(begin_tiles[0]), separate(begin_tiles[1]), separate(begin_tiles[2]), separate(begin_tiles[3])];
    if (tiles[0].length === 0 && tiles[1].length === 0 && tiles[2].length === 0 && tiles[3].length === 0) { // 没有给定起手, 则模仿现实中摸牌
        for (let i = 0; i < 3; i++)
            for (let j = 0; j < base_info.player_cnt; j++)
                for (let k = 0; k < 4; k++)
                    tiles[j].push(paishan.shift());
        for (let i = 0; i < base_info.player_cnt; i++)
            tiles[i].push(paishan.shift());
        tiles[0].push(paishan.shift());

        tiles = tiles.slice(base_info.ju, base_info.player_cnt).concat(tiles.slice(0, base_info.ju));
    }
    for (let i = 0; i < base_info.player_cnt; i++) {
        tiles[i].sort(cmp);
        player_tiles[i] = tiles[i];
    }

    // 剩余牌数量
    const left_cnt = getLeftTileCnt();

    let opens: Opens = undefined;
    if (is_begin_open() || is_openhand()) {
        opens = [null, null];
        for (let seat: Seat = 0; seat < base_info.player_cnt; seat++) {
            const ret: Open_Player = {seat: seat as Seat, tiles: [], count: []};
            const tiles = player_tiles[seat], cnt: TileNum = {};
            for (const tile of Constants.TILE)
                cnt[tile] = 0;
            for (const tile of tiles)
                cnt[tile]++;
            mingpais[seat] = cnt;
            for (const tile in cnt) {
                ret.tiles.push(tile as Tile);
                ret.count.push(cnt[tile]);
            }
            opens[seat] = ret;
        }
    }

    if (is_muyu())
        updateMuyu();

    paishan.splice(Constants.PAISHAN_MAX_LEN);
    // 添加起手进牌山
    let begin_len = 0, is_sha256 = false, has_integrity = true;
    const qishou_tiles: Tile[] = [], random_tiles: Players_TileArray = [[], [], [], []];
    for (let i = 0; i < base_info.player_cnt; i++) {
        if (i === base_info.ju) {
            if (player_tiles[i].length !== Constants.QIN_TILE_NUM)
                has_integrity = false;
        } else if (player_tiles[i].length !== Constants.XIAN_TILE_NUM)
            has_integrity = false;

        for (const tile of player_tiles[i])
            if (tile !== Constants.TBD) {
                begin_len++;
                random_tiles[i].push(tile);
            }
        random_tiles[i].sort(randomCmp);
    }
    if (has_integrity && begin_len + paishan.length <= Constants.PAISHAN_MAX_LEN) {
        is_sha256 = true;
        for (let i = 0; i < 3; i++)
            for (let j = base_info.ju; j < base_info.ju + base_info.player_cnt; j++)
                for (let k = 0; k < 4; k++)
                    if (i * 4 + k < random_tiles[j % base_info.player_cnt].length)
                        qishou_tiles.push(random_tiles[j % base_info.player_cnt][i * 4 + k]);
        for (let j = base_info.ju; j < base_info.ju + base_info.player_cnt; j++)
            if (random_tiles[j % base_info.player_cnt].length > 12)
                qishou_tiles.push(random_tiles[j % base_info.player_cnt][12]);
        if (random_tiles[base_info.ju].length > 13)
            qishou_tiles.push(random_tiles[base_info.ju][13]);
        paishan.unshift(...qishou_tiles);
    }

    const hash_code_set = '0123456789abcdef';
    let fake_hash_code = '';
    for (let i = 0; i < (is_sha256 ? 64 : 32); i++)
        fake_hash_code += hash_code_set[Math.floor(hash_code_set.length * Math.random())];

    addNewRound(left_cnt, fake_hash_code, opens, is_sha256);

    if (is_sha256)
        paishan.splice(0, begin_len);

    round_begin_once = false;
};

// 小局结束
export const roundEnd = (): void => {
    if (actions.length === 0)
        return;
    if (is_chuanma() && chuanma_gangs.not_over && getLstAction().name !== 'RecordNoTile' && getLstAction().name !== 'RecordHuleXueZhanEnd')
        calcGangPoint(true);

    all_data.all_actions.push(actions.slice());
    all_data.xun.push(xun.slice() as Players_NumberArray);

    for (let i = 0; i < base_info.player_cnt; i++) {
        begin_tiles[i] = '';
        discard_tiles[i] = [];
        deal_tiles[i] = [];
        xun[i] = [];
    }
    muyu.seats = '';
    paishan.length = 0;
    actions.length = 0;
    if (is_chuanma() && base_info.first_hu_seat !== -1)
        base_info.ju = base_info.first_hu_seat;
    if (base_info.ju === base_info.player_cnt) {
        base_info.chang++;
        base_info.ju = 0;
    }
    base_info.chang %= base_info.player_cnt;
    round_begin_once = true;

    gameEnd();
};

// 计算终局界面玩家的点数
export const gameEnd = (): void => {
    /**
     * 根据最终点数和座次确定位次的比较算法
     * @param x - 参数1玩家的信息
     * @param y - 参数2玩家的信息
     */
    const cmp2 = (x: Player_Player, y: Player_Player): number => {
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

    const players: Players = [null, null];
    for (let i: Seat = 0; i < base_info.player_cnt; i++)
        players[i] = {
            seat: i as Seat,
            gold: 0,
            grading_score: 0,
            part_point_1: scores[i],
            part_point_2: 0,
            total_point: 0,
        };
    players.sort(cmp2);
    players[0].part_point_1 += base_info.liqibang * 1000;

    const madian = [[5, -5], [10, 0, -10], [15, 5, -5, -15]];
    for (let i = 1; i < base_info.player_cnt; i++) {
        players[i].total_point = players[i].part_point_1 - base_info.base_point + madian[base_info.player_cnt - 2][i] * 1000;
        players[0].total_point -= players[i].total_point;
    }
    all_data.players = players;
    editOffline();
};
