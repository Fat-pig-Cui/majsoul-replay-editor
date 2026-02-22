/**
 * @file: core.ts - 牌谱核心文件, 包含牌谱数据结构定义、全局变量、以及牌谱编辑的核心函数
 * @author: GrandDawn, Fat-pig-Cui
 * @email: chubbypig@qq.com
 * @github: https://github.com/Fat-pig-Cui/majsoul-replay-editor
 */

import {
    cuohu_points, get_aka_cnt, get_ben_times,
    get_chang_ju_ben_num, get_fafu_1ting, get_fafu_2p, get_fafu_2ting, get_fafu_3p_1ting,
    get_fafu_3p_2ting, get_fafu_3ting, get_field_spell_mode1, get_field_spell_mode2,
    get_field_spell_mode3, get_init_point, get_init_scores, get_liqi_need, is_anye,
    is_baogang, is_begin_open, is_beishuizhizhan, is_chuanma, is_cuohupeida, is_dora3, is_dora_jifan, is_fufenliqi,
    is_guobiao, is_guobiao_huapai, is_guobiao_lianzhuang, is_guobiao_no_8fanfu, is_guyi,
    is_heqie_mode, is_hunzhiyiji, is_mingjing, is_mopai_paishan, is_muyu,
    is_openhand, is_qingtianjing, is_renhumanguan, is_ronghuzhahu,
    is_sanxiangliuju, is_sigangbaopai, is_sixifuhe,
    is_tiandichuangzao, is_tianming, is_toutiao, is_wanwushengzhang, is_wanxiangxiuluo, is_xiakeshang, is_xueliu,
    is_xuezhandaodi, is_yifanjieguyi, is_yongchang,
    is_zhanxing, no_guoshiangang, no_lianfengsifu, no_liujumanguan,
    no_normalbaopai, no_shiduan, no_wyakuman, no_yifa, no_zimosun, scale_points
} from "./misc";
import {
    calcDoras, calcSudian, calcSudianChuanma, calcSudianGuobiao,
    calcTianming, calcXiaKeShang, cmp, eraseMingpai, fulu2Ming,
    huazhu, int2Tile, inTiles, isAwaitingIndex, isBeishuiType, isDora, isTile, isValidSeat,
    push2PlayerTiles, randomCmp, errorRoundInfo,
    tile2Int, updateMuyu, updatePrezhenting, updateShezhangzt, updateShoumoqie, updateZhenting, separateWithMoqie,
    separate, separateWithParam, judgeTile, getLstAction, isEqualTile, allEqualTiles, calcHupai, calcTingpai,
    getLeftTileCnt
} from "./utils";
import {Constants} from "./constants";
import {
    addAnGangAddGang, addBaBei, addChangeTile, addChiPengGang, addCuohu, addDealTile, addDiscardTile,
    addFillAwaitingTiles, addGangResult, addGangResultEnd, addHuleXueLiuMid, addHuleXueZhanMid,
    addRevealTile, addSelectGap, addUnveilTile, endHule, endHuleXueLiuEnd, endHuleXueZhanEnd, endLiuJu, endNoTile,
    addLockTile, addNewRound
} from "./glue";
import {editOffline} from "./override";

// 玩家的个人信息
export const player_datas: PlayerDatas = [null, null];

// 玩家的起手
export const begin_tiles: Players_String = ['', ''];

// 玩家当时的手牌
export const player_tiles: Players_TileArray = [[], []];

// 完成编辑后的所有信息集合
export const all_data: AllData = {
    all_actions: [],
    xun: [],
    config: null,
    player_datas: [null, null],
    players: [null, null],
};

/**
 * 初始化必要变量
 */
export const clearProject = (): void => {
    if (view?.DesktopMgr?.Inst?.active)
        throw new Error('clearProject: 请退出当前牌谱后再载入自制牌谱');

    game_begin_once = true;
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
    }
    config = {
        category: 1,
        meta: {mode_id: 0},
        mode: {
            mode: 1,
            detail_rule: {}
        }
    };
    muyu = {seats: '', times: [1, 1, 1, 1]};
    paishan = [];
    chang = ju = ben = liqibang = lianzhuang_cnt = 0;
    discard_tiles = [[], [], [], []];
    deal_tiles = [[], [], [], []];

    all_data.all_actions = [];
    all_data.xun = [];
    all_data.player_datas = player_datas;
    all_data.config = config;
    all_data.players = players;

    protected_tiles = {seat: 0, tiles: []};
};

/**
 * 设置对局的模式
 */
export const setConfig = (c: Config): void => {
    config = c;
};

/**
 * 设置玩家的切牌集合
 */
export const setDiscardTiles = (tiles: Players_String): void => {
    for (let i in tiles)
        discard_tiles[i] = separateWithMoqie(tiles[i]);
};

/**
 * 设置玩家的摸牌集合
 */
export const setDealTiles = (tiles: Players_String): void => {
    for (let i in tiles)
        deal_tiles[i] = separateWithMoqie(tiles[i]);
};

/**
 * 手动设置牌山(参数不含起手)
 */
export const setPaishan = (ps: string): void => {
    paishan = separate(ps);
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

    let tiles = [separateWithParam(begin_tiles[0]), separateWithParam(begin_tiles[1]), separateWithParam(begin_tiles[2]), separateWithParam(begin_tiles[3])];
    let para_tiles = [separateWithParam(ps_head), separateWithParam(ps_back)];

    // 检查手牌数量是否合规
    for (let i = 0; i < player_cnt; i++) {
        let tiles_len = tiles[i].length;
        if (i === ju) {
            if (tiles_len > Constants.QIN_TILE_NUM)
                console.warn(errorRoundInfo() + `tiles${i} 作为亲家牌数量超过正常值: ${tiles_len}`);
            else if (tiles_len < Constants.QIN_TILE_NUM)
                console.log(errorRoundInfo() + `tiles${i} 作为亲家牌数量不够: ${tiles_len}, 自动补全至${Constants.QIN_TILE_NUM}张`);
        } else {
            if (tiles_len > Constants.XIAN_TILE_NUM)
                console.warn(errorRoundInfo() + `tiles${i} 作为闲家牌数量超过正常值: ${tiles_len}`);
            else if (tiles_len < Constants.XIAN_TILE_NUM)
                console.log(errorRoundInfo() + `tiles${i} 作为闲家牌数量不够: ${tiles_len}, 自动补全至${Constants.XIAN_TILE_NUM}张`);
        }
    }

    let aka_cnt = 3;
    if (get_aka_cnt() > -1)
        aka_cnt = get_aka_cnt();
    else if (player_cnt === 3)
        aka_cnt = 2;
    else if (player_cnt === 2)
        aka_cnt = 1;

    let cnt: number[] = [];
    cnt[Constants.CBD] = 0;
    for (let i = Constants.TILE_NUM.C1m; i <= Constants.TILE_NUM.C7z; i++)
        cnt[i] = 4;
    for (let i = Constants.TILE_NUM.C0m; i <= Constants.TILE_NUM.C0s; i++)
        cnt[i] = 0;

    if (player_cnt === 2) { // 二麻
        for (let i = Constants.TILE_NUM.C1p + 1; i <= Constants.TILE_NUM.C9p - 1; i++)
            cnt[i] = 0;
        for (let i = Constants.TILE_NUM.C1s + 1; i <= Constants.TILE_NUM.C9s - 1; i++)
            cnt[i] = 0;
        cnt[Constants.TILE_NUM.C5m] = 4 - aka_cnt;
        cnt[Constants.TILE_NUM.C0m] = aka_cnt;
    } else if (player_cnt === 3) { // 三麻
        for (let i = Constants.TILE_NUM.C1m + 1; i <= Constants.TILE_NUM.C9m - 1; i++)
            cnt[i] = 0;
        cnt[Constants.TILE_NUM.C5p] = cnt[Constants.TILE_NUM.C5s] = 4 - Math.floor(aka_cnt / 2);
        cnt[Constants.TILE_NUM.C0p] = cnt[Constants.TILE_NUM.C0s] = Math.floor(aka_cnt / 2);
    } else { // 四麻
        if (aka_cnt === 4) {
            cnt[Constants.TILE_NUM.C5m] = cnt[Constants.TILE_NUM.C5s] = 3;
            cnt[Constants.TILE_NUM.C5p] = cnt[Constants.TILE_NUM.C0p] = 2;
            cnt[Constants.TILE_NUM.C0m] = cnt[Constants.TILE_NUM.C0s] = 1;
        } else {
            cnt[Constants.TILE_NUM.C5m] = cnt[Constants.TILE_NUM.C5p] = cnt[Constants.TILE_NUM.C5s] = 4 - Math.floor(aka_cnt / 3);
            cnt[Constants.TILE_NUM.C0m] = cnt[Constants.TILE_NUM.C0p] = cnt[Constants.TILE_NUM.C0s] = Math.floor(aka_cnt / 3);
        }
    }
    if (is_chuanma()) {
        for (let i = Constants.TILE_NUM.C1z; i <= Constants.TILE_NUM.C7z; i++)
            cnt[i] = 0;
        cnt[Constants.TILE_NUM.C0m] = cnt[Constants.TILE_NUM.C0p] = cnt[Constants.TILE_NUM.C0s] = 0;
        cnt[Constants.TILE_NUM.C5m] = cnt[Constants.TILE_NUM.C5p] = cnt[Constants.TILE_NUM.C5s] = 4;
    }
    if (is_guobiao()) {
        cnt[Constants.TILE_NUM.C0m] = cnt[Constants.TILE_NUM.C0p] = cnt[Constants.TILE_NUM.C0s] = 0;
        cnt[Constants.TILE_NUM.C5m] = cnt[Constants.TILE_NUM.C5p] = cnt[Constants.TILE_NUM.C5s] = 4;
        // 用 Constants.HUAPAI 当做国标的花牌
        if (is_guobiao_huapai() && typeof editFunction == 'function')
            cnt[tile2Int(Constants.HUAPAI, true)] = 8;
    }

    // 明镜之战
    let cnt2: number[] = [];
    cnt2[Constants.CBD] = 0;
    for (let i = Constants.TILE_NUM.C1m; i <= Constants.TILE_NUM.C7z; i++)
        cnt2[i] = 3;
    if (is_mingjing()) {
        for (let i = Constants.TILE_NUM.C1m; i <= Constants.TILE_NUM.C7z; i++)
            cnt[i] = 1;
        cnt[Constants.TILE_NUM.C0m] = cnt[Constants.TILE_NUM.C0p] = cnt[Constants.TILE_NUM.C0s] = 0;
    }

    // 万象修罗
    if (is_wanxiangxiuluo())
        cnt[Constants.CBD] = 4;

    const sp_type = ['Y', 'D', 'T', 'H', 'M', 'P', 'S', '.'];
    // 减去玩家起手
    for (let j = 0; j < player_cnt; j++)
        for (let i in tiles[j])
            if (!sp_type.includes(tiles[j][i][0]))
                if (tiles[j][i].length > 2 && tiles[j][i][2] === Constants.SPT_SUFFIX && is_mingjing())
                    cnt2[tile2Int(tiles[j][i] as Tile)]--;
                else
                    cnt[tile2Int(tiles[j][i] as Tile, true)]--;

    if (is_mopai_paishan() && deal_tiles[ju].length > 0) {
        para_tiles[0] = [];
        while (deal_tiles[0].length > 0 || deal_tiles[1].length > 0 || deal_tiles[2].length > 0 || deal_tiles[3].length > 0)
            for (let i = ju + 1; i < ju + 1 + player_cnt; i++)
                if (deal_tiles[i % player_cnt].length > 0) {
                    let tile = deal_tiles[i % player_cnt].shift();
                    if (tile !== '..')
                        para_tiles[0].push(tile);
                }
    }

    // 减去两个参数的牌
    for (let j in para_tiles)
        for (let i in para_tiles[j])
            if (!sp_type.includes(para_tiles[j][i][0]))
                if (para_tiles[j][i].length === 3 && para_tiles[j][i][2] === Constants.SPT_SUFFIX)
                    cnt2[tile2Int(para_tiles[j][i] as Tile, true)]--;
                else
                    cnt[tile2Int(para_tiles[j][i] as Tile, true)]--;

    let remain_tiles: Tile[] = [];
    for (let i = Constants.TILE_NUM.C1m; i <= Constants.TILE_NUM.C0s; i++) {
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
        while (tiles[i].length < Constants.XIAN_TILE_NUM)
            tiles[i].push(remain_tiles.pop());
        if (i === ju && tiles[i].length < Constants.QIN_TILE_NUM)
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
            console.warn(errorRoundInfo() + `paishan 不合规: ${full_num - cnt[i]} 个 ${int2Tile(parseInt(i))}`);
        if (cnt2[i] < 0)
            console.warn(errorRoundInfo() + `paishan 不合规: ${3 - cnt2[i]} 个 ${int2Tile(parseInt(i), true)}`);
    }

    paishan = para_tiles[0].concat(remain_tiles, para_tiles[1]) as Tile[];

    function randomize(tls: TileWithParam[]): void {
        for (let i in tls)
            if (['H', 'T'].includes(tls[i][0])) {
                let index = remain_tiles.findIndex((tile: Tile) => judgeTile(tile, tls[i][0]));
                tls[i] = index > -1 ? remain_tiles.splice(index, 1)[0] : remain_tiles.pop();
            }
        for (let i in tls)
            if (['Y', 'D', 'M', 'P', 'S'].includes(tls[i][0])) {
                let index = remain_tiles.findIndex((tile: Tile) => judgeTile(tile, tls[i][0]));
                tls[i] = index > -1 ? remain_tiles.splice(index, 1)[0] : remain_tiles.pop();
            }
        for (let i in tls)
            if (tls[i][0] === '.')
                tls[i] = remain_tiles.pop();
    }
};

/**
 * 开局, 数据初始化
 */
export const roundBegin = (): void => {
    if (all_data.all_actions.length === 0)
        gameBegin();

    init();

    if (is_dora3() || is_muyu())
        dora_cnt.cnt = dora_cnt.licnt = 3;

    // 剩余牌数量
    let left_cnt = getLeftTileCnt();

    let opens: Opens = undefined;
    if (is_begin_open() || is_openhand()) {
        opens = [null, null];
        for (let seat: Seat = 0; seat < player_cnt; seat++) {
            let ret: Open_Player = {seat: seat as Seat, tiles: [], count: []};
            let tiles = player_tiles[seat], cnt: number[] = [];
            for (let i = Constants.TILE_NUM.C1m; i <= Constants.TILE_NUM.C0s; i++)
                cnt[i] = 0;
            for (let i in tiles)
                cnt[tile2Int(tiles[i], true)]++;
            mingpais[seat] = cnt;
            for (let i = Constants.TILE_NUM.C1m; i <= Constants.TILE_NUM.C0s; i++) {
                if (cnt[i] === 0)
                    continue;
                ret.tiles.push(int2Tile(i));
                ret.count.push(cnt[i]);
            }
            opens[seat] = ret;
        }
    }

    if (is_muyu())
        updateMuyu();

    paishan = paishan.slice(0, 136);
    // 添加起手进牌山
    let qishou_len = 0, is_sha256 = false, has_intergrity = true;
    let qishou_tiles: Tile[] = [], random_tiles: Players_TileArray = [[], [], [], []];
    for (let i = 0; i < player_cnt; i++) {
        if (i === ju) {
            if (player_tiles[i].length !== Constants.QIN_TILE_NUM)
                has_intergrity = false;
        } else if (player_tiles[i].length !== Constants.XIAN_TILE_NUM)
            has_intergrity = false;

        for (let j in player_tiles[i])
            if (player_tiles[i][j] !== Constants.TBD) {
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

/**
 * 摸牌, 参数顺序可以不一致, 包含
 * - {Seat} - 摸牌的玩家, 没有此参数时按照正常对局流程
 * - {Tile} - 摸的牌, 没有此参数时将根据 deal_tiles 或牌山确定
 * - {AwaitingIndex} - 占星之战: 牌候选池中选择的牌位置, 后面会变为 AwaitingIndex 类型
 */
export const mopai = (...args: any[]): void => {
    let seat: Seat, tile: Tile, index: AwaitingIndex;
    // 参数预处理
    for (let i in args)
        if (typeof args[i] == 'string') {
            if (isTile(args[i]))
                tile = args[i];
            else
                console.error(errorRoundInfo() + `mopai: 不合规的牌: ${args[i]}`);
        } else if (typeof args[i] == 'number') {
            if (isValidSeat(args[i]))
                seat = args[i];
            else
                console.error(errorRoundInfo() + `mopai: 不合规的 seat: ${args[i]}, 当前对局玩家数: ${player_cnt}`);
        } else if (args[i] instanceof Array && args[i].length === 1 && typeof args[i][0] == 'number') {
            if (isAwaitingIndex(args[i][0]))
                index = args[i][0];
            else
                console.error(errorRoundInfo() + `mopai: 不合规的 awaiting_index: ${args[i][0]}`);
        }

    let liqi: Liqi = null;
    let hunzhiyiji_data: HunzhiyijiInfo_Player = null;

    lstActionCompletion();

    if (seat === undefined) {
        let lst_name = getLstAction().name, lst_seat = getLstAction().data.seat;
        // 自家鸣牌, 摸牌家仍然是上个操作的玩家
        if (['RecordChiPengGang', 'RecordBaBei', 'RecordAnGangAddGang'].includes(lst_name))
            seat = lst_seat;
        // 广义切牌, 摸牌家是上个操作玩家的下一家
        if (['RecordDiscardTile', 'RecordLockTile'].includes(lst_name))
            seat = is_hunzhiyiji() && hunzhiyiji_info[lst_seat].liqi && !hunzhiyiji_info[lst_seat].overload ? lst_seat : (lst_seat + 1) % player_cnt as Seat;

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
        if (['RecordHuleXueLiuMid', 'RecordCuohu'].includes(lst_name))
            seat = (getLstAction(2).data.seat + 1) % player_cnt;

        while (huled[seat])
            seat = (seat + 1) % player_cnt;
        if (isNaN(seat))
            throw new Error(errorRoundInfo() + `mopai: 无法判断谁摸牌, getLstAction().name: ${lst_name}`);
    }
    if (tile === undefined && deal_tiles[seat].length > 0) {
        let tmp_tile = deal_tiles[seat].shift();
        if (tmp_tile !== '..')
            tile = tmp_tile;
    }

    // 是否明牌
    let tile_state = is_openhand() || liqi_info[seat].kai;

    // 占星之战, 填充牌候选池供 seat 号玩家选择
    if (is_zhanxing()) {
        if (index === undefined)
            index = 0;
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
        draw_card = awaiting_tiles.splice(index, 1)[0];
    else if (draw_type === 0)
        draw_card = paishan[paishan.length - 1];

    player_tiles[seat].push(draw_card);

    if (!is_zhanxing())
        draw_type === 1 ? paishan.shift() : paishan.pop();
    lst_draw_type = draw_type;
    draw_type = 1;

    addDealTile(seat, draw_card, liqi, tile_state, index, hunzhiyiji_data);

    // 完成上个操作的后续
    function lstActionCompletion(): void {
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
 * 切牌, 参数顺序可以不一致, 包含
 * - {Seat} - 切牌的玩家, 没有此参数时按照正常对局流程
 * - {Tile} - 切的牌, 没有此参数时将根据 discard_tiles 确定或摸切
 * - {boolean|'kailiqi'} - 是否立直, 默认不立直, 若为 'kailiqi', 则为开立直
 * - {'moqie' | 'shouqie'} - 何切模式: 值为 'moqie' 表示强制显示摸切, 值为 'shouqie' 或其他情况则强制显示手切
 * - {'anpai' | 'anpai_ignore_1000'}  - 暗夜之战: 当值为字符串 'anpai' 时, 表示暗牌, 若为 'anpai_ignore_1000' 则不会支付1000点, 默认不暗牌
 * - {[BeishuiType]} - 背水之战: 立直类型, 有效值为 '[0]', '[1]', '[2]', 默认为普通立直, 需要配合 is_liqi 使用
 */
export const qiepai = (...args: any[]): void => {
    let seat: Seat, tile: Tile, is_liqi: boolean, f_moqie: 'moqie' | 'shouqie', anpai: 'anpai' | 'anpai_ignore_1000',
        beishui_type: BeishuiType;
    let is_kailiqi = false;
    // 参数预处理
    for (let i in args)
        if (['anpai', 'anpai_ignore_1000'].includes(args[i]))
            anpai = args[i];
        else if (args[i] === 'kailiqi')
            is_kailiqi = is_liqi = true;
        else if (['moqie', 'shouqie'].includes(args[i]))
            f_moqie = args[i];
        else if (typeof args[i] == 'number') {
            if (isValidSeat(args[i]))
                seat = args[i];
            else
                throw new Error(errorRoundInfo() + `qiepai: 不合规的 seat: ${args[i]}, 当前对局玩家数: ${player_cnt}`);
        } else if (typeof args[i] == 'boolean')
            is_liqi = args[i];
        else if (args[i] instanceof Array && args[i].length === 1 && typeof args[i][0] === 'number') {
            if (isBeishuiType(args[i][0]))
                beishui_type = args[i][0];
            else
                throw new Error(errorRoundInfo() + `qiepai: 不合规的 beishui_type: ${args[i][0]}`);
        } else if (typeof args[i] == 'string') {
            if (isTile(args[i]))
                tile = args[i];
            else
                throw new Error(errorRoundInfo() + `qiepai: 不合规的牌: ${args[i]}`);
        }

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
        let tmp_tile = discard_tiles[seat].shift();
        if (tmp_tile !== '..')
            tile = tmp_tile;
    }
    if (tile === undefined)
        tile = player_tiles[seat][player_tiles[seat].length - 1];
    moqie &&= player_tiles[seat][player_tiles[seat].length - 1] === tile && !['RecordNewRound', 'RecordChiPengGang'].includes(lst_name);
    if (is_heqie_mode())
        moqie = f_moqie === 'moqie';

    // 切牌解除同巡振听
    pretongxunzt[seat] = tongxunzt[seat] = false;
    updateZhenting();

    // 确定立直类型
    let is_wliqi = false;
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
    if (is_muyu() && seat === muyu_info.seat)
        updateMuyu();

    // 暗夜之战: 暗牌支付1000点
    if (is_anye() && anpai === 'anpai') {
        scores[seat] -= 1000;
        liqibang++;
    }
    if (is_anye() && anpai === 'anpai_ignore_1000')
        anpai = 'anpai';

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
            throw new Error(errorRoundInfo() + `qiepai: seat: ${seat} 手牌不存在要切的牌: ${tile}`);
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
    function lstActionCompletion(): void {
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
 * 他家鸣牌(吃/碰/明杠), 参数顺序可以不一致, 包含
 * - {Seat} - 鸣牌的玩家, 没有此参数时按照能否可以 明杠/碰/吃 确定鸣牌玩家
 * - {string|string[]} - 鸣牌家从手里拿出来的牌, 没有此参数时将根据能否可以 明杠/碰/吃 确定鸣牌类型
 * - {boolean} - 川麻: 开杠刮风下雨是否击飞, 默认不击飞
 */
export const mingpai = (...args: any[]): void => {
    let seat: Seat, tiles: Tile[], jifei: boolean;
    // 参数预处理
    for (let i in args)
        if (typeof args[i] == 'number') {
            if (isValidSeat(args[i]))
                seat = args[i];
            else
                throw new Error(errorRoundInfo() + `mingpai: 不合规的 seat: ${args[i]}, 当前对局玩家数: ${player_cnt}`);
        } else if (typeof args[i] == 'boolean')
            jifei = args[i];
        else if (args[i] instanceof Array || typeof args[i] == 'string')
            tiles = separate(args[i]);

    let from = getLstAction().data.seat, tile = getLstAction().data.tile;

    if (seat === undefined)
        if (tiles !== undefined)
            if (!isEqualTile(tiles[0], tile))
                seat = (from + 1) % player_cnt;
            else
                for (let i = from + 1; i < from + player_cnt; i++) {
                    let seat2: Seat = i % player_cnt as Seat;
                    let cnt = [];
                    for (let i = Constants.TILE_NUM.C1m; i <= Constants.TILE_NUM.C7z; i++)
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
            seat = (from + 1) % player_cnt as Seat;
            if (tile[1] !== 'z' && !['1', '2'].includes(tile[0])) // 吃上端
                if (trying([int2Tile(tile2Int(tile) - 2), int2Tile(tile2Int(tile) - 1)], seat))
                    return;
            if (tile[1] !== 'z' && !['1', '9'].includes(tile[0])) // 吃中间
                if (trying([int2Tile(tile2Int(tile) - 1), int2Tile(tile2Int(tile) + 1)], seat))
                    return;
            if (tile[1] !== 'z' && !['8', '9'].includes(tile[0])) // 吃下端
                if (trying([int2Tile(tile2Int(tile) + 1), int2Tile(tile2Int(tile) + 2)], seat))
                    return;
        }

        throw new Error(errorRoundInfo() + `mingpai: seat: ${from} 的切牌: ${tile} 没有玩家能 mingpai`);
    }
    if (tiles.length <= 1)
        throw new Error(errorRoundInfo() + `mingpai: seat: ${from} 的切牌: ${tile} 后的 mingpai tiles 参数不对: ${tiles}`);

    let liqi = null;
    lstActionCompletion();

    // 鸣出去的牌是否为明牌
    let tile_states: boolean[] = [];
    if (is_begin_open())
        for (let i in tiles)
            tile_states.push(eraseMingpai(seat, tiles[i]));

    let type: ChiPengGangType, froms: Seat[], split_tiles: Tile[];
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
            chuanma_gangs.not_over.push({from: from, to: seat, val: 2000});
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
    function lstActionCompletion(): void {
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

        for (let i = 0; i < player_cnt; i++)
            liqi_info[i].yifa = 0;
    }

    /**
     * 判断玩家能否鸣牌出 x 牌型的牌
     * @param x - 牌型, 组合之一
     * @param seat - 鸣牌的玩家, 可能为 undefined
     */
    function trying(x: Tile[], seat: Seat): boolean {
        let x0 = allEqualTiles(x[0]).reverse(), x1 = allEqualTiles(x[1]).reverse(), x2: Tile[] = [];
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
         * @param try_tiles - 牌型, 组合之一
         */
        function tryMingpai(try_tiles: Tile[]): boolean {
            for (let i = 0; i < player_cnt; i++) {
                let seat2 = (from + 1 + i) % player_cnt as Seat;
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
    for (let i in args)
        if (['babei', 'angang', 'jiagang', 'baxi'].includes(args[i]))
            type = args[i];
        else if (typeof args[i] == 'number') {
            if (isValidSeat(args[i]))
                seat = args[i];
            else
                console.error(errorRoundInfo() + `zimingpai: 不合规的 seat: ${args[i]}, 当前对局玩家数: ${player_cnt}`);
        } else if (typeof args[i] == 'boolean')
            jifei = args[i];
        else if (typeof args[i] == 'string') {
            if (isTile(args[i]))
                tile = args[i];
            else
                console.error(errorRoundInfo() + `zimingpai: 不合规的牌: ${args[i]}`);
        }

    if (seat === undefined) {
        seat = getLstAction().data.seat;
        if (seat === undefined)
            throw new Error(errorRoundInfo() + `zimingpai: 无法判断谁 zimingpai, getLstAction().name: ${getLstAction().name}`);
    }
    if (jifei === undefined)
        jifei = false;
    if (tile === undefined) {
        if (trying())
            return;
        throw new Error(errorRoundInfo() + `zimingpai: seat: ${seat}, xun: ${xun[seat].length}: 玩家无法 zimingpai (没给 tile 情况下)`);
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
    is_babei ||= tile_cnt >= 1 && player_cnt === 2 && isEqualTile(tile, '3z') && (!type || type === 'baxi');
    // 国标补花'拔花', 需要载入 add_function.js
    is_babei ||= is_guobiao() && tile === Constants.HUAPAI && type === 'babei' && typeof editFunction == 'function';
    // 强制拔北, 需要载入 add_function.js
    is_babei ||= tile_cnt >= 1 && type === 'babei' && typeof editFunction == 'function';

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
    let tile_states: boolean[] = [];

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
        const ziming_type: ZiMingType = is_angang ? 3 : 2;
        // 幻境传说: 庄家卡4
        if (get_field_spell_mode1() === 4 && seat === ju)
            dora_cnt.bonus = 1;

        dora_cnt.lastype = is_angang || is_jiagang && is_dora_jifan() ? 2 : 1;

        if (is_angang) {
            let tmp_fulu: { type: FuLuType, tile: Tile[] } = {type: 3, tile: []};
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
                for (let i: Seat = 0; i < player_cnt; i++) {
                    if (i === seat || huled[i])
                        continue;
                    chuanma_gangs.not_over.push({from: i as Seat, to: seat, val: 2000});
                }
        } else {
            if (is_begin_open())
                tile_states.push(eraseMingpai(seat, tile));
            let index: number;
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
                for (let i: Seat = 0; i < player_cnt; i++) {
                    if (i === seat || huled[i])
                        continue;
                    chuanma_gangs.not_over.push({from: i as Seat, to: seat, val: 1000});
                }
        }
        player_tiles[seat].sort(cmp);

        addAnGangAddGang(seat, tile, ziming_type, tile_states);

        if (jifei)
            roundEnd();
    } else
        throw new Error(errorRoundInfo() + `zimingpai: seat: ${seat}, xun: ${xun[seat].length}: 玩家无法 zimingpai (给定 tile: ${tile} 情况下)`);

    // seat 号玩家尝试自家鸣牌, 按照顺序: 国标补花, 拔北, 拔西, 暗杠, 加杠
    function trying(): boolean {
        // 国标补花
        if (is_guobiao() && typeof editFunction == 'function' && inTiles(Constants.HUAPAI, player_tiles[seat])) {
            zimingpai(seat, Constants.HUAPAI, 'babei');
            return true;
        }
        let all_tiles: Tile[];
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
                    zimingpai(seat, all_tiles[i], 'babei');
                    return true;
                }
        }
        // 暗杠
        for (let i = Constants.TILE_NUM.C1m; i <= Constants.TILE_NUM.C7z; i++) {
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
        for (let i = Constants.TILE_NUM.C1m; i <= Constants.TILE_NUM.C7z; i++) {
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
 * 和牌, 参数顺序可以不一致, 包含
 * - {Seat|Seat[]} - 本次和牌所有和牌的玩家, 没有此参数时按照正常对局流程
 * - {boolean} - 修罗/川麻: 是否为最终和牌, 默认为中途和牌
 */
export const hupai = (...args: any[]): void => {
    let seats: Seat[], type: boolean;
    // 参数预处理
    for (let i in args)
        if (typeof args[i] == 'number') {
            if (isValidSeat(args[i]))
                seats = [args[i]];
            else
                console.error(errorRoundInfo() + `hupai: 不合规的 seat: ${args[i]}, 当前对局玩家数: ${player_cnt}`);
        } else if (args[i] instanceof Array) {
            for (let j in args[i])
                if (typeof args[i] != "number" || !isValidSeat(args[i][j]))
                    console.error(errorRoundInfo() + `hupai: 不合规的 seat: ${args[i][j]}, 当前对局玩家数: ${player_cnt}`);
            seats = args[i];
        } else if (typeof args[i] == 'boolean')
            type = args[i];

    // 川麻枪杠, 则杠不收取点数
    if (is_chuanma())
        chuanma_gangs.not_over.pop();

    if (type === undefined)
        type = false;
    if (seats === undefined || seats.length === 0) {
        let lst_name = getLstAction().name, lst_seat = getLstAction().data.seat;
        if (['RecordDealTile', 'RecordNewRound'].includes(lst_name))
            seats = [lst_seat];
        else { // 荣和
            seats = [];
            for (let i = lst_seat + 1; i < lst_seat + player_cnt; i++) {
                const seat = i % player_cnt as Seat;
                if (huled[seat])
                    continue;
                push2PlayerTiles(seat);
                if ((is_chuanma() || is_guobiao() && !cuohu[seat] || !is_chuanma() && !is_guobiao() && !zhenting[seat]) && calcHupai(player_tiles[seat]) !== 0) {
                    if (!is_chuanma() && !is_guobiao() && !is_ronghuzhahu()) { // 非川麻国标防止自动无役荣和诈和
                        let points = calcFan(seat, false, lst_seat);
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
            throw new Error(errorRoundInfo() + 'hupai: 没给 seat 参数无人能正常和牌');
    }

    // seats 重新排序, 按照放铳家逆时针顺序
    if (seats.length > 1) {
        let lst_name = getLstAction().name, lst_seat = getLstAction().data.seat;
        if (['RecordNewRound', 'RecordDealTile'].includes(lst_name))
            lst_seat = (lst_seat + player_cnt - 1) % player_cnt;

        let hupai_seats = [false, false, false, false];
        for (let i in seats)
            hupai_seats[seats[i]] = true;
        seats = [];
        for (let i = lst_seat + 1; i <= lst_seat + player_cnt; i++)
            if (hupai_seats[i % player_cnt])
                seats.push(i % player_cnt as Seat);
    }

    if (is_toutiao() || is_mingjing() || is_guobiao()) // 有头跳且参数给了至少两家和牌的情况, 则取头跳家
        seats = [seats[0]];

    // 非血战到底, 血流成河模式
    if (!is_xuezhandaodi() && !is_wanxiangxiuluo() && !is_chuanma() && !is_xueliu()) {
        let ret: HuleInfo[] = [], baopait: BaopaiT = 0;
        for (let i in seats)
            ret.push(!is_guobiao() ? huleOnePlayer(seats[i]) : huleOnePlayerGuobiao(seats[i]));
        // 国标错和陪打
        if (is_guobiao() && is_cuohupeida() && typeof editFunction == 'function' && ret[0].cuohu) {
            let old_scores = scores.slice() as Players_Number;
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
        // '包'字的选择
        // 包牌比包杠优先, 因为雀魂目前没有包杠, 以雀魂为主
        if (!is_guobiao() && baogang_seat !== -1)
            baopait = baogang_seat + 1;
        baogang_seat = -1;
        // 多家包牌, 自摸情况下以最先包牌的玩家为准
        // 荣和情况下, 以距放铳玩家最近的玩家的最先包牌的玩家为准
        if (!is_guobiao())
            for (let i in seats)
                if (baopai[seats[i]].length > 0) {
                    baopait = baopai[seats[i]][0].seat + 1;
                    break;
                }
        let old_scores = scores.slice() as Players_Number;
        for (let i = 0; i < player_cnt; i++)
            scores[i] += delta_scores[i];

        // 天贵史VS原田克美_最终二人麻将决战
        if (config.mode.detail_rule._tianguishi_vs_yuantiankemei) {
            old_scores = [9200, 0, 20300, 0];
            delta_scores = [12300, 0, 0, 0];
            scores = [21500, 0, 20300, 0];
        }
        endHule(ret, old_scores, baopait as BaopaiT);

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
        for (let i in seats) {
            pretongxunzt[seats[i]] = tongxunzt[seats[i]] = false;
            prelizhizt[seats[i]] = lizhizt[seats[i]] = false;
        }
        updateZhenting();

        let ret: HuleInfo[] = [];
        for (let i in seats) {
            let whatever = !is_chuanma() ? huleOnePlayer(seats[i]) : huleOnePlayerChuanma(seats[i]);
            ret.push(whatever);
            hules_history.push(whatever);
        }
        if (is_chuanma() && first_hu_seat === -1)
            first_hu_seat = seats[0];
        if (!is_xueliu())
            for (let i in seats)
                huled[seats[i]] = true;
        let old_scores = scores.slice() as Players_Number;
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
export const huangpai = (): void => {
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
    let ting_info: TingInfo = [];
    for (let i: Seat = 0; i < player_cnt; i++) {
        if (!huled[i])
            player_left++;
        let tings = is_heqie_mode() || huled[i] ? [] : calcTingpai(i as Seat);
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
    let scores_info: ScoresInfo = [];

    // 是否有流满
    let liujumanguan = false;
    if (!is_chuanma() && !is_guobiao())
        for (let i = 0; i < player_cnt; i++)
            if (paihe[i].liujumanguan && !huled[i])
                liujumanguan = true;

    if (liujumanguan)
        for (let i = ju; i < ju + player_cnt; i++) {
            let seat = i % player_cnt as Seat;
            if (!paihe[seat].liujumanguan || huled[seat])
                continue;

            let cur_delta_scores: Players_Number = [0, 0];
            for (let i = 0; i < player_cnt; i++)
                cur_delta_scores[i] = 0;
            let score = calcScore(seat, cur_delta_scores as Players_Number);
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

                for (let i = 0; i < player_cnt; i++) {
                    if (huled[i])
                        continue;
                    if (ting_info[i].tingpai) // 幻境传说: 命运卡1
                        delta_scores[i] += fafu * noting_cnt / ting_cnt * times;
                    else
                        delta_scores[i] -= fafu * times;
                }
            } else { // seat 向 i 查大叫, 查花猪
                for (let seat: Seat = 0; seat < player_cnt; seat++) {
                    for (let i: Seat = 0; i < player_cnt; i++) {
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
            for (let i in chuanma_gangs.over) {
                let from = chuanma_gangs.over[i].from, to = chuanma_gangs.over[i].to,
                    val = chuanma_gangs.over[i].val;
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
     * @param seat - seat 号玩家
     * @param cur_delta_scores - 该流满导致的玩家点数变动
     */
    function calcScore(seat: Seat, cur_delta_scores: Players_Number): number {
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
 * @param liuju_type - 流局类型, 若没有该参数, 则除了"三家和了"外, 由系统自动判断属于哪种流局
 */
export const liuju = (liuju_type?: LiujuType): void => {
    let all_liuju = [jiuZhongJiuPai, siFengLianDa, siGangSanLe, siJiaLiZhi, sanJiaHuLe];
    let type: LiujuType, seat = getLstAction().data.seat, tiles: Tile[];

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
        throw new Error(errorRoundInfo() + 'liuju: 不符合任何途中流局条件');

    // 九种九牌
    function jiuZhongJiuPai(): void {
        let cnt: number[] = [], yaojiu_type = 0;
        for (let i = Constants.TILE_NUM.C1m; i <= Constants.TILE_NUM.C7z; i++)
            cnt[i] = 0;
        for (let i in player_tiles[seat])
            cnt[tile2Int(player_tiles[seat][i])]++;
        for (let i = Constants.TILE_NUM.C1m; i <= Constants.TILE_NUM.C7z; i++)
            if (cnt[i] >= 1 && judgeTile(int2Tile(i), 'Y'))
                yaojiu_type++;
        if (yaojiu_type >= 9 && liqi_info[seat].liqi === 0 && liqi_info[seat].yifa === 1 && player_tiles[seat].length === 14) {
            type = 1;
            tiles = player_tiles[seat].slice();
        }
    }

    // 四风连打
    function siFengLianDa(): void {
        if (player_cnt === 4)
            if (fulu[0].length === 0 && fulu[1].length === 0 && fulu[2].length === 0 && fulu[3].length === 0)
                if (paihe[0].tiles.length === 1 && paihe[1].tiles.length === 1 && paihe[2].tiles.length === 1 && paihe[3].tiles.length === 1)
                    if (paihe[0].tiles[0] === paihe[1].tiles[0] && paihe[1].tiles[0] === paihe[2].tiles[0] && paihe[2].tiles[0] === paihe[3].tiles[0])
                        if (tile2Int(paihe[0].tiles[0]) >= Constants.TILE_NUM.C1z && tile2Int(paihe[0].tiles[0]) <= Constants.TILE_NUM.C4z)
                            type = 2;
    }

    // 四杠散了
    function siGangSanLe(): void {
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

    // 四家立直
    function siJiaLiZhi(): void {
        if (player_cnt === 4) {
            let liqi_player_cnt = 0;
            for (let i = 0; i < player_cnt; i++)
                if (liqi_info[i].liqi !== 0)
                    liqi_player_cnt++;

            if (lst_liqi != null && liqi_player_cnt === 3)
                type = 4;
        }
    }

    // 三家和了, 需要设置 '_sanxiangliuju'
    function sanJiaHuLe(): void {
        if (is_sanxiangliuju())
            type = 5;
    }
};

/**
 * 龙之目玉: 设置拥有目玉的玩家队列
 */
export const setMuyuSeats = (m_seats: MuyuSeats): void => {
    muyu.seats = m_seats;
};

/**
 * 换三张换牌(修罗/川麻)
 * @param tls - 四名玩家交出去的牌
 * @param type - 换牌方式, 0: 逆时针, 1: 对家, 2: 顺时针
 */
export const huanpai = (tls: string[], type: HuanpaiType): void => {
    let tiles = [separate(tls[0]), separate(tls[1]), separate(tls[2]), separate(tls[3])];

    let ret: ChangeTileInfo = [null, null, null, null];
    for (let seat: Seat = 0; seat < player_cnt; seat++) {
        let in_seat = (seat - type + 3) % player_cnt;
        for (let j = 0; j < tiles[seat].length; j++) {
            player_tiles[seat].splice(player_tiles[seat].indexOf(tiles[seat][j]), 1);
            player_tiles[seat].push(tiles[in_seat][j]);
        }
        ret[seat] = {
            out_tiles: tiles[seat] as [Tile, Tile, Tile],
            out_tile_states: [0, 0, 0],
            in_tiles: tiles[in_seat] as [Tile, Tile, Tile],
            in_tile_states: [0, 0, 0],
        };
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
 * @param x - 四位玩家的定缺
 */
export const dingque = (x: GapsInput): void => {
    let all_dingque = x.split('') as [GapInputType, GapInputType, GapInputType, GapInputType];
    let dict: { m: GapType, p: GapType, s: GapType } = {'m': 1 as GapType, 'p': 0 as GapType, 's': 2 as GapType}; // 注意 012 分别对应 pms, 而不是 mps
    let ret: Gaps = [0, 0, 0, 0];
    for (let i: Seat = 0; i < player_cnt; i++)
        ret[i] = dict[all_dingque[i]];
    gaps = ret;

    addSelectGap(ret);
};

/**
 * seat 号玩家开牌并成功(暗夜之战)
 */
export const kaipai = (seat: Seat): void => {
    if (typeof seat != 'number')
        throw new Error(errorRoundInfo() + `kaipai: 暗夜之战开牌必须指定玩家, seat: ${seat}`);
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
        throw new Error(errorRoundInfo() + `kaipai: 暗夜之战开牌的前提是有人刚暗牌, getLstAction().name: ${getLstAction().name}`);
};

/**
 * seat 号玩家开牌后锁定(暗夜之战)
 * @param seat
 */
export const kaipaiLock = (seat: Seat): void => {
    if (typeof seat != 'number')
        throw new Error(errorRoundInfo() + `kaipaiLock: 暗夜之战开牌必须指定玩家, seat: ${seat}`);
    if (getLstAction().name === 'RecordRevealTile') {
        let tile_seat = getLstAction().data.seat;
        scores[seat] -= 2000;
        liqibang += 2;

        addUnveilTile(seat);

        scores[tile_seat] -= 4000;
        liqibang += 4;

        addLockTile(tile_seat, 1);

    } else
        throw new Error(errorRoundInfo() + `kaipaiLock: 暗夜之战开牌的前提是有人刚暗牌, getLstAction().name: ${getLstAction().name}`);
};

/**
 * 跳转局数
 * @param c - 场 chang, 0,1,2,3 分别表示 东,南,西,北 场
 * @param j - 局 ju, seat 为 ju 坐庄
 * @param b - 本 ben, 本场数
 */
export const setRound = (c: Seat, j: Seat, b: number): void => {
    [chang, ju, ben] = [c, j, b];
};

/**
 * 便捷函数: 正常摸切
 * @param tile_cnt - 要切的牌(Tile)或循环次数(number), 默认为1
 */
export const normalMoqie = (tile_cnt?: Tile | number): void => {
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
        throw new Error(errorRoundInfo() + `normalMoqie: tile_cnt 参数不合规: ${tile_cnt}`);
};

/**
 * 便捷函数: 摸牌立直
 * @param tile_cnt - 要切的牌(Tile)或循环次数(number), 默认为1
 */
export const moqieLiqi = (tile_cnt?: Tile | number): void => {
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
        throw new Error(errorRoundInfo() + `moqieLiqi: tile_cnt 参数不合规: ${tile_cnt}`);
};

/**
 * 便捷函数: 连续岭上摸牌
 * @param tile_cnt - 要鸣的牌(string)或循环次数(number), 默认为1
 */
export const comboMopai = (tile_cnt?: Tile | number): void => {
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
        throw new Error(errorRoundInfo() + `comboMopai: tile_cnt 参数不合规: ${tile_cnt}`);
};

/**
 * 便捷函数: 鸣牌并切牌
 * @param tls_cnt - 要切的牌(string, 1张牌)或鸣牌从手里拿出来的牌(string, 至少2张牌)或循环次数(number), 默认为1
 */
export const mingQiepai = (tls_cnt?: string | number): void => {
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
        throw new Error(errorRoundInfo() + `mingQiepai: tls_cnt 参数不合规: ${tls_cnt}`);
};

/**
 * 便捷函数: 自摸和牌
 * @param flag - 修罗/川麻: 即 hupai 中的 type 参数, 是否为最终和牌, 默认为中途和牌
 */
export const zimoHu = (flag: boolean = false): void => {
    if (typeof flag == 'boolean') {
        mopai();
        hupai(flag);
    } else
        throw new Error(errorRoundInfo() + `zimoHu: flag 参数不合规: ${flag}`);
};

/**
 * 便捷函数: 摸切到荒牌流局
 */
export const moqieLiuju = (): void => {
    normalMoqie(getLeftTileCnt());
    huangpai();
};

/**
 * 设置玩家的实时点数
 */
export const setScores = (s: Players_Number): void => {
    scores = s;
};


// 对局的模式
export let config: Config;
// 牌山, 会随着牌局的进行逐渐减少
export let paishan: Tile[];
// 玩家的实时点数
export let scores: Players_Number;
// 玩家数, 有效值2, 3, 4, 默认为4
export let player_cnt: PlayerNum;
// 立直所需要的棒子数, 默认为1
export let liqi_need: number;
/**
 * - chang: 场(东/南/西/北对应0/1/2/3)
 * - ju: 局(东1/2/3/4对应0/1/2/3)
 * - ben: 本场数
 * - liqibang: 场上立直棒个数
 * - benchangbang: 原子化的本场棒个数(用于和牌的点数划分)
 */
export let chang: Seat, ju: Seat, ben: number, liqibang: number, benchangbang: number;
// 玩家的切牌集合和摸牌集合
export let discard_tiles: Players_TileMoqieArray, deal_tiles: Players_TileMoqieArray;
// 玩家的副露信息
export let fulu: Fulu;
// 玩家的牌河
export let paihe: Paihe;
// 立直信息
export let liqi_info: LiqiInfo;
// 刚宣言立直的玩家信息
export let lst_liqi: LstLiqi;
// 宝牌指示牌(表和里各5张)
export let doras: Doras, li_doras: Doras;
// dora相关数据
export let dora_cnt: DoraCnt;
// 各家点数变动
export let delta_scores: Players_Number;
// 各家原点分数, 默认为25000
export let base_points: number;
// draw_type: 摸牌方向: 1 表示正常摸牌, 0 表示岭上摸牌, lst_draw_type: 最近玩家摸牌方向
export let draw_type: 0 | 1, lst_draw_type: 0 | 1;
// 最终要注入到牌谱回放中的内容的内容, 每小局结束后 push 到 all_data.actions 中并清空
export let actions: Actions;
// 血战到底/血流成河: 玩家和牌历史
export let hules_history: HuleInfo[];
// 玩家是否已和牌
export let huled: Players_Boolean;
// 玩家的包牌信息
export let baopai: Baopai;
// 玩家的巡目, 对应的数字是在 actions 中的下标
export let xun: Players_NumberArray;
// 终局玩家的排名, 点数等信息
export let players: Players;
// 第四个明杠时, 前三副露是否都是杠子(然后第四个杠才构成包牌)
export let sigang_bao: [boolean, boolean, boolean?, boolean?];
// 包杠的玩家, 无人包杠则为-1
export let baogang_seat: -1 | Seat;
// 配牌明牌: 玩家所亮明的牌, number 为牌的数字编码
export let mingpais: Players_NumberArray;
// 龙之目玉: 拥有目玉的玩家队列 和 各玩家打点的倍数, 只有有目玉的玩家为2, 其他都为1
export let muyu: Muyu;
// 龙之目玉: 目玉信息
export let muyu_info: MuyuInfo;
// 川麻: 某局第一位和牌玩家的 seat, 若没有则为-1
export let first_hu_seat: -1 | Seat;
// 川麻: 玩家的定缺, 注意 012 分别代表 pms
export let gaps: Gaps;
// 川麻: 开杠刮风下雨
export let chuanma_gangs: ChuanmaGangs;
// 幻境传说: 命运卡3(厄运沙漏): 各家立直后舍牌数量
export let spell_hourglass: Players_Number;
// 魂之一击: 各家立直信息
export let hunzhiyiji_info: HunzhiyijiInfo;
// 咏唱之战: 各家舍牌手摸切信息, 与 paihe.tiles 不同的是, 牌被鸣走后, shoumoqie 同样会去掉, 而 paihe.tiles 不会
export let shoumoqie: Players_BooleanArray;
// 咏唱之战: 各家舍牌手摸切最大长度和bonus
export let yongchang_data: YongChangData;
// 占星之战: 牌候选池, 通常长度为3
export let awaiting_tiles: [Tile?, Tile?, Tile?];
// 庄家连续和牌连庄数量, 用于八连庄
export let lianzhuang_cnt: number;
// 国标玩家是否已错和
export let cuohu: [boolean, boolean, boolean, boolean];
// 何切模式: 主视角要保护的牌(防止切出去)
export let protected_tiles: { seat: Seat, tiles: string[] };
/**
 * 各种振听, 有效长度为玩家数, 不超过4
 *
 * 影响振听的因素
 * 1. 自家牌河中有听的牌(qiepai)
 * 2. 其他家切牌(qiepai), 加杠(zimingpai), 拔北(zimingpai), 暗杠(国士, zimingpai)有听的牌
 * 3. 只有切牌的时候会解除舍张振听
 * 4. 只有在摸牌和自家鸣牌的时候会解除同巡振听
 * 5. 同巡和立直振听在pass掉这张牌之后才会振听, 紧跟的操作可能是 mopai, mingpai (hupai 不影响)
 */
export let pretongxunzt: Players_Boolean, prelizhizt: Players_Boolean, shezhangzt: Players_Boolean,
    tongxunzt: Players_Boolean, lizhizt: Players_Boolean, zhenting: Players_Boolean;

// 使 gameBegin 每个牌谱只运行一次的变量
export let game_begin_once: boolean;

// 只在一开局生效或者整个对局期间都不会变化的值的初始化
export const gameBegin = (): void => {
    if (!game_begin_once)
        return;

    if (config.mode.mode >= 20 && config.mode.mode <= 29)
        player_cnt = 2;
    else if (config.mode.mode >= 10 && config.mode.mode <= 19)
        player_cnt = 3;
    else
        player_cnt = 4;

    all_data.config = config;
    player_datas.splice(player_cnt);
    all_data.player_datas = player_datas;

    if (player_cnt === 3 || player_cnt === 2) { // 三麻, 二麻屏蔽以下模式
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
        scores = [0, 0];
        for (let i = 0; i < player_cnt; i++)
            scores[i] = init_point;
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
        scores = get_init_scores() as Players_Number;

    game_begin_once = false;
};

// 大部分数据初始化
export const init = (): void => {
    actions = [];
    for (let i = 0; i < player_cnt; i++)
        muyu.times[i] = 1;
    muyu_info = {id: 0, seat: 0, count: 0, count_max: 5};
    xun = [[], [], [], []];
    gaps = null;
    first_hu_seat = -1;
    benchangbang = ben;
    baopai = [[], [], [], []];
    baopai.splice(player_cnt);
    lst_liqi = null;
    mingpais = [[], [], [], []];
    mingpais.splice(player_cnt);
    chuanma_gangs = {over: [], not_over: []};
    dora_cnt = {cnt: 1, licnt: 1, lastype: 0, bonus: 0};
    huled = [false, false, false, false];
    huled.splice(player_cnt);
    hules_history = [];
    fulu = [[], [], [], []];
    fulu.splice(player_cnt);
    paihe = [
        {liujumanguan: !(no_liujumanguan() || is_heqie_mode()), tiles: []},
        {liujumanguan: !(no_liujumanguan() || is_heqie_mode()), tiles: []},
        {liujumanguan: !(no_liujumanguan() || is_heqie_mode()), tiles: []},
        {liujumanguan: !(no_liujumanguan() || is_heqie_mode()), tiles: []},
    ];
    paihe.splice(player_cnt);
    liqi_info = [
        {liqi: 0, yifa: 1, kai: false},
        {liqi: 0, yifa: 1, kai: false},
        {liqi: 0, yifa: 1, kai: false},
        {liqi: 0, yifa: 1, kai: false},
    ];
    liqi_info.splice(player_cnt);
    lst_draw_type = draw_type = 1;

    baogang_seat = -1;
    shezhangzt = [false, false, false, false];
    pretongxunzt = [false, false, false, false];
    prelizhizt = [false, false, false, false];
    tongxunzt = [false, false, false, false];
    lizhizt = [false, false, false, false];
    zhenting = [false, false, false, false];
    sigang_bao = [false, false, false, false];
    shezhangzt.splice(player_cnt);
    pretongxunzt.splice(player_cnt);
    prelizhizt.splice(player_cnt);
    tongxunzt.splice(player_cnt);
    lizhizt.splice(player_cnt);
    zhenting.splice(player_cnt);
    sigang_bao.splice(player_cnt);
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

    delta_scores = [0, 0, 0, 0];
    delta_scores.splice(player_cnt);

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
    protected_tiles.seat = 0;
    protected_tiles.tiles = [];
};

/**
 * 把 lst_liqi 中的信息赋值给 liqi_info, 并返回胶水代码用的 liqi
 * @param type - 是否允许立直失败, 只会出现在血战到底模式中, 默认不允许
 */
export const lstLiqi2Liqi = (type: boolean = false): Liqi => {
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
                beishui_type: lst_liqi.beishui_type,
                xia_ke_shang: {score_coefficients: calcXiaKeShang()},
            };
            ret = {
                seat: lst_liqi.seat,
                liqibang: liqibang,
                score: scores[lst_liqi.seat],
                liqi_type_beishuizhizhan: lst_liqi.beishui_type,
                xia_ke_shang: {score_coefficients: calcXiaKeShang()},
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
 * huleOnePlayer 组 - 立直
 *
 * 计算 seat 号玩家的和牌导致的各家点数变动
 */
export let huleOnePlayer = (seat: Seat): HuleInfo => {
    /**
     * 点数切上到整百
     * @param point - 原点数
     */
    const qieshang = (point: number): number => Math.ceil(point / 100) * 100;

    let lst_action = getLstAction(), lst_name = getLstAction().name;
    let zimo = false;
    if (lst_name === 'RecordDealTile' || lst_name === 'RecordNewRound')
        zimo = true;
    else
        push2PlayerTiles(seat);
    let fangchong_seat: Seat;
    let delta_scores_backup = delta_scores.slice();
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
    let xia_ke_shang_coefficient = calcXiaKeShang()[seat];

    let extra_times = tianming_bonus * xia_ke_shang_coefficient;
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
    let point_rong: number, point_sum: number, point_zimo_qin: number, point_zimo_xian: number;

    let doras0: Doras = calcDoras();
    let li_doras0: Doras = [];
    if (liqi_info[seat].liqi !== 0)
        for (let i = 0; i < dora_cnt.licnt; i++)
            li_doras0[i] = li_doras[i];

    if (zhahu) {
        if (seat === ju)
            lianzhuang_cnt = -1; // 任意荒牌流局都会导致连庄数重置, 而在 hupai 中会加1, 所以这里是 -1
        [point_rong, point_sum, point_zimo_qin, point_zimo_xian] = calcPoint(-2000);
        for (let i = 0; i < player_cnt; i++) {
            if (i === seat || huled[i])
                continue;
            let delta_point = 0;
            if (i === ju || seat === ju) {
                delta_point = point_zimo_qin * muyu.times[i] * muyu.times[seat];
                delta_scores[i] -= delta_point;
                delta_scores[seat] += delta_point;
            } else {
                delta_point = point_zimo_xian * muyu.times[i] * muyu.times[seat];
                delta_scores[i] -= delta_point;
                delta_scores[seat] += delta_point;
            }
        }
        player_tiles[seat].pop();
        console.log(errorRoundInfo() + `seat: ${seat} 玩家诈和`);
        return {
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
            dadian: is_xuezhandaodi() || is_wanxiangxiuluo() || player_cnt === 2 ? -delta_scores[seat] : undefined,
        };
    }

    [point_rong, point_sum, point_zimo_qin, point_zimo_xian] = calcPoint(sudian);
    point_rong = qieshang(point_rong) * extra_times;
    point_sum = qieshang(point_sum) * extra_times;
    point_zimo_qin = qieshang(point_zimo_qin) * extra_times;
    point_zimo_xian = qieshang(point_zimo_xian) * extra_times;

    // 有包牌
    if (baopai[seat].length > 0) {
        let delta_point = 0;
        let yiman_sudian = 8000;
        let baoval = 0;
        for (let j in baopai[seat])
            baoval += baopai[seat][j].val;

        let feibao_rong: number, feibao_zimo_qin: number, feibao_zimo_xian: number;
        [feibao_rong, , feibao_zimo_qin, feibao_zimo_xian] = calcPoint((val - baoval) * yiman_sudian);
        feibao_rong = qieshang(feibao_rong) * extra_times;
        feibao_zimo_qin = qieshang(feibao_zimo_qin) * extra_times;
        feibao_zimo_xian = qieshang(feibao_zimo_xian) * extra_times;

        if (zimo) {
            // 包牌部分, 包牌家全包
            for (let j in baopai[seat]) {
                for (let i = 0; i < player_cnt; i++) {
                    if (i === seat || huled[i])
                        continue;
                    if (i === ju || seat === ju) {
                        delta_point = baopai[seat][j].val * 2 * yiman_sudian * muyu.times[i] * muyu.times[seat] * extra_times;
                        delta_scores[baopai[seat][j].seat] -= delta_point;
                        delta_scores[seat] += delta_point;
                    } else {
                        delta_point = baopai[seat][j].val * yiman_sudian * muyu.times[i] * muyu.times[seat] * extra_times;
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
                if (baogang_seat !== -1 && !huled[baogang_seat])
                    equ_seat = baogang_seat;
                if (i === ju || seat === ju) {
                    delta_point = feibao_zimo_qin * muyu.times[i] * muyu.times[seat];
                    delta_scores[equ_seat] -= delta_point;
                    delta_scores[seat] += delta_point;
                } else {
                    delta_point = feibao_zimo_xian * muyu.times[i] * muyu.times[seat];
                    delta_scores[equ_seat] -= delta_point;
                    delta_scores[seat] += delta_point;
                }
            }
        } else {
            // 包牌部分
            for (let j in baopai[seat]) {
                delta_point = baopai[seat][j].val * yiman_sudian * 2 * muyu.times[fangchong_seat] * muyu.times[seat] * extra_times;
                if (qinjia)
                    delta_point *= 1.5;
                delta_scores[baopai[seat][j].seat] -= delta_point;
                delta_scores[seat] += delta_point;
            }
            // 非包牌部分: 非包牌部分 + 包牌部分/2 => 非包牌部分 + (全部 - 非包牌部分)/2 => (全部 + 非包牌部分)/2
            delta_point = (point_rong + feibao_rong) / 2 * muyu.times[fangchong_seat] * muyu.times[seat];
            delta_scores[fangchong_seat] -= delta_point;
            delta_scores[seat] += delta_point;
        }
    }
    // 无包牌情况下的包杠, 自摸全由包杠家负担
    else if (baogang_seat !== -1 && !huled[baogang_seat] && zimo) {
        let delta_point = 0;
        for (let i = 0; i < player_cnt; i++) {
            if (i === seat || huled[i])
                continue;
            if (i === ju || seat === ju) {
                delta_point = point_zimo_qin * muyu.times[i] * muyu.times[seat];
                delta_scores[baogang_seat] -= delta_point;
                delta_scores[seat] += delta_point;
            } else {
                delta_point = point_zimo_xian * muyu.times[i] * muyu.times[seat];
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
                    delta_point = point_zimo_qin * muyu.times[i] * muyu.times[seat];
                    delta_scores[i] -= delta_point;
                    delta_scores[seat] += delta_point;
                } else {
                    delta_point = point_zimo_xian * muyu.times[i] * muyu.times[seat];
                    delta_scores[i] -= delta_point;
                    delta_scores[seat] += delta_point;
                }
            }
        } else {
            delta_point = point_rong * muyu.times[fangchong_seat] * muyu.times[seat];
            delta_scores[fangchong_seat] -= delta_point;
            delta_scores[seat] += delta_point;
        }
    }
    let dadian = Math.max(delta_scores[seat], -delta_scores[seat]);
    // 幻境传说: 命运卡3
    if (get_field_spell_mode3() === 3 && liqi_info[seat].liqi !== 0) {
        let diff = 300 * spell_hourglass[seat];
        let win_point = delta_scores[seat] - delta_scores_backup[seat];
        if (win_point < diff)
            for (let i = 0; i < player_cnt; i++)
                delta_scores[i] = delta_scores_backup[i];
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

    /**
     * 通过素点计算 荣和, 自摸总计, 自摸收亲, 自摸收闲 的点数
     * @param c_sudian - 素点
     * @returns [荣和, 自摸总计, 自摸收亲, 自摸收闲]
     */
    function calcPoint(c_sudian: number): [number, number, number, number] {
        let rong: number, sum: number, zimo_qin: number, zimo_xian: number;
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
                baoval += baopai[seat][i].val;
                if (baopai[seat][0].seat !== baopai[seat][i].seat)
                    baopai_same_seat = false;
            }
            all_baopai = val === baoval;
        }
        // 存在包杠, 则包杠家支付全部本场, 相当于包杠家放铳
        if (baogang_seat !== -1 && zimo && !huled[baogang_seat])
            equal_seat = baogang_seat;
        // 自摸情况下全是包牌, 且包牌家只有一家, 则那个包牌家支付全部本场
        else if (baopai[seat].length > 0 && zimo && all_baopai && baopai_same_seat)
            equal_seat = baopai[seat][0].seat;

        let delta_point: number;
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
 */
export let huleOnePlayerChuanma = (seat: Seat): HuleInfo => {
    let lst_action = getLstAction(), lst_name = getLstAction().name;
    let zimo = false;
    if (lst_name === 'RecordDealTile' || lst_name === 'RecordNewRound')
        zimo = true;
    else
        push2PlayerTiles(seat);
    let fangchong_seat: Seat;
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
        console.log(`第${all_data.all_actions.length + 1}局: seat: ${seat} 玩家诈和`);
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
            doras: [] as Doras,
            li_doras: [] as Doras,
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
        doras: [] as Doras,
        li_doras: [] as Doras,
    };
};

/**
 * huleOnePlayer 组 - 国标
 *
 * 计算 seat 号玩家的和牌导致的各家点数变动
 */
export let huleOnePlayerGuobiao = (seat: Seat): HuleInfo => {
    let lst_action = getLstAction(), lst_name = getLstAction().name;
    let zimo = false;
    if (lst_name === 'RecordDealTile' || lst_name === 'RecordNewRound')
        zimo = true;
    else
        push2PlayerTiles(seat);
    let fangchong_seat: Seat;
    if (!zimo)
        fangchong_seat = lst_action.data.seat;

    let ming = fulu2Ming(seat);
    let qinjia = seat === ju;
    let hand = player_tiles[seat].slice();
    let hu_tile = hand[hand.length - 1];
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
    if (!is_guobiao_no_8fanfu() && sudian_no_huapai < Constants.GB_BASE_FAN * scale_points())
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
        console.log(errorRoundInfo() + `seat: ${seat} 玩家诈和或错和`);
        return {
            count: 0,
            doras: [] as Doras,
            li_doras: [] as Doras,
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
            delta_scores[i] -= sudian + Constants.GB_BASE_FAN * scale_points();
            delta_scores[seat] += sudian + Constants.GB_BASE_FAN * scale_points();
        }
    } else {
        delta_scores[fangchong_seat] -= sudian;
        delta_scores[seat] += sudian;

        for (let i = 0; i < player_cnt; i++) {
            if (i === seat)
                continue;
            delta_scores[i] -= Constants.GB_BASE_FAN * scale_points();
            delta_scores[seat] += Constants.GB_BASE_FAN * scale_points();
        }
    }
    player_tiles[seat].pop();
    return {
        count: val,
        doras: [] as Doras,
        li_doras: [] as Doras,
        fans: points.fans,
        fu: points.fu,
        hand: hand,
        hu_tile: hu_tile,
        liqi: false,
        ming: ming,
        point_rong: sudian + 3 * Constants.GB_BASE_FAN * scale_points(),
        point_sum: 3 * (sudian + Constants.GB_BASE_FAN * scale_points()),
        point_zimo_qin: sudian + Constants.GB_BASE_FAN * scale_points(),
        point_zimo_xian: sudian + Constants.GB_BASE_FAN * scale_points(),
        qinjia: qinjia,
        seat: seat,
        title_id: 0,
        yiman: false,
        zimo: zimo,
        cuohu: false,
    };
};

/**
 * calcFan 组 - 立直
 *
 * 根据牌算番
 * @param seat - 和牌的 seat 号玩家
 * @param zimo - 是否是自摸
 * @param fangchong - 放铳玩家的 seat, 只有在 zimo 为 false 有效
 */
export const calcFan = (seat: Seat, zimo: boolean, fangchong?: Seat): CalcFanRet => {
    // 更新返回值
    const updateRet = (x: CalcFanRet): void => {
        if (calcSudian(ret, 1) < calcSudian(x, 1))
            ret = x;
    };

    let tiles = player_tiles[seat];
    let lastile = tiles[tiles.length - 1];
    let fulu_cnt = 0;
    let ret: CalcFanRet = {yiman: false, fans: [], fu: 0};
    let cnt: number[] = []; // cnt 是仅手牌的数量集合, 不含红宝牌
    for (let i = Constants.CBD; i <= Constants.TILE_NUM.C0s; i++) // 注意这里是 C0s 而不是 C7z, 是因为下面 dfs 要用到 NXT2, 需要从 C7z 扩展到 C0s
        cnt[i] = 0;
    for (let i in tiles)
        cnt[tile2Int(tiles[i])]++;

    let partition: Partition = [];
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
    else if (cnt[Constants.CBD] === 1) {
        cnt[Constants.CBD]--;
        tiles.splice(tiles.indexOf(Constants.TBD), 1);
        for (let j = Constants.TILE_NUM.C1m; j <= Constants.TILE_NUM.C7z; j++) {
            cnt[j]++;
            tiles.push(int2Tile(j));

            normalCalc();

            tiles.pop();
            cnt[j]--;
        }
        tiles.unshift(Constants.TBD);
    }

    return ret;

    // 没有百搭牌情况下的算番流程, 分为一般算番(dfs)和国士型
    function normalCalc() {
        dfs(1);
        if (calcHupai(tiles) === 3) {
            // 删除 ans 中番为 id 的番
            const deleteFan = (id: number): void => {
                for (let i in ans.fans)
                    if (ans.fans[i].id === id) {
                        ans.fans.splice(parseInt(i), 1);
                        break;
                    }
            };

            const menqing = fulu_cnt === 0;
            let tianhu = false;
            let ans: CalcFanRet = {yiman: !is_qingtianjing(), fans: [], fu: 25};

            let wangpai_num = 14;
            if (player_cnt === 3)
                wangpai_num = 18;
            else if (player_cnt === 2)
                wangpai_num = 22;
            if (is_qingtianjing()) {
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

                let cnt2: number[] = []; // cnt2 是包含副露的牌数量集合, 不含红包牌和拔北宝牌
                for (let i = Constants.TILE_NUM.C1m; i <= Constants.TILE_NUM.C7z; i++)
                    cnt2[i] = 0;
                for (let i in tiles)
                    cnt2[tile2Int(tiles[i])]++;

                // 四种dora: 表dora, 红dora, 拔北dora, 里dora
                let all_doras = [0, 0, 0, 0];
                // 先把拔北给算上, 然后减去
                for (let i in fulu[seat])
                    if (fulu[seat][i].type === 4) {
                        cnt2[tile2Int(fulu[seat][i].tile[0])]++;
                        all_doras[2]++;
                    }
                for (let i = 0; i < dora_cnt.cnt; i++) {
                    if (player_cnt === 3 && tile2Int(doras[i]) === Constants.TILE_NUM.C1m)
                        all_doras[0] += cnt2[Constants.TILE_NUM.C9m];
                    else if (player_cnt === 2) {
                        if (tile2Int(doras[i]) === Constants.TILE_NUM.C1p)
                            all_doras[0] += cnt2[Constants.TILE_NUM.C9p];
                        if (tile2Int(doras[i]) === Constants.TILE_NUM.C1s)
                            all_doras[0] += cnt2[Constants.TILE_NUM.C9s];
                    } else {
                        // 幻境传说: 机会卡3
                        if (get_field_spell_mode2() === 3)
                            all_doras[0] += cnt2[tile2Int(doras[i])];
                        all_doras[0] += cnt2[Constants.DORA_NXT[tile2Int(doras[i])]];
                    }
                }
                for (let i = 0; i < dora_cnt.licnt; i++) {
                    if (player_cnt === 3 && tile2Int(li_doras[i]) === Constants.TILE_NUM.C1m)
                        all_doras[3] += cnt2[Constants.TILE_NUM.C9m];
                    else if (player_cnt === 2) {
                        if (tile2Int(li_doras[i]) === Constants.TILE_NUM.C1p)
                            all_doras[3] += cnt2[Constants.TILE_NUM.C9p];
                        if (tile2Int(li_doras[i]) === Constants.TILE_NUM.C1s)
                            all_doras[3] += cnt2[Constants.TILE_NUM.C9s];
                    } else {
                        // 幻境传说: 机会卡3
                        if (get_field_spell_mode2() === 3)
                            all_doras[3] += cnt2[tile2Int(li_doras[i])];
                        all_doras[3] += cnt2[Constants.DORA_NXT[tile2Int(li_doras[i])]];
                    }
                }
                // 幻境传说: 庄家卡5
                if (get_field_spell_mode1() === 5 && seat === ju && !zimo)
                    ans.dora_bonus = all_doras[0] + all_doras[1] + all_doras[3];

                // 悬赏番
                if (all_doras[0] > 0)
                    // 幻境传说: 机会卡1
                    if (!(get_field_spell_mode2() === 1 && liqi_info[seat].liqi !== 0))
                        ans.fans.push({val: all_doras[0], id: 31}); // 宝牌
                if (all_doras[1] > 0)
                    ans.fans.push({val: all_doras[1], id: 32}); // 红宝牌
                if (all_doras[2] > 0)
                    ans.fans.push({val: all_doras[2], id: 34}); // 北宝牌
                if (liqi_info[seat].liqi !== 0) {
                    let times = 1;
                    // 幻境传说: 机会卡1
                    if (get_field_spell_mode2() === 1)
                        times = 2;
                    ans.fans.push({val: all_doras[3] * times, id: 33}); // 里宝牌
                }
            }

            if (liqi_info[seat].yifa !== 0 && liqi_info[seat].liqi === 0)
                if (zimo) {
                    deleteFan(1); // 删除门前清自摸和
                    if (seat === ju) {
                        ans.fans.push({val: !is_qingtianjing() ? 1 : 13, id: 35}); // 天和
                        tianhu = true;
                    } else
                        ans.fans.push({val: !is_qingtianjing() ? 1 : 13, id: 36}); // 地和
                } else if (is_guyi() || is_yifanjieguyi())
                    ans.fans.push({val: !is_qingtianjing() ? 1 : 13, id: 59}); // 人和

            if (menqing && cnt[tile2Int(lastile)] === 1 && !tianhu)
                ans.fans.push({val: !is_qingtianjing() ? 1 : 13, id: 42}); // 国士无双
            if (menqing && (cnt[tile2Int(lastile)] === 2 || tianhu)) {
                let tmp = {val: !is_qingtianjing() ? 2 : 26, id: 49}; // 国士无双十三面
                if (no_wyakuman())
                    tmp.val /= 2;
                ans.fans.push(tmp);
            }
            if (liqi_info[seat].liqi === 2)
                if (zimo && paishan.length === wangpai_num && lst_draw_type === 1 || !zimo && paishan.length === wangpai_num) {
                    deleteFan(18); // 删除两立直
                    deleteFan(5); // 删除海底摸月
                    deleteFan(6); // 删除河底捞鱼
                    ans.fans.push({val: !is_qingtianjing() ? 1 : 13, id: 63}); // 石上三年
                }
            if (is_yifanjieguyi() && seat === ju && lianzhuang_cnt >= 7) // 第8次和牌
                ans.fans.push({val: 1, id: 46}); // 八连庄

            updateRet(ans);
        }

        if (is_yifanjieguyi() && calcHupai(tiles) === 12) {
            let ans: CalcFanRet = {yiman: !is_qingtianjing(), fans: [], fu: 25};
            if (is_qingtianjing()) {
                let cnt2: number[] = []; // cnt2 是包含副露的牌数量集合, 不含红包牌和拔北宝牌
                for (let i = Constants.TILE_NUM.C1m; i <= Constants.TILE_NUM.C7z; i++)
                    cnt2[i] = 0;
                for (let i in tiles)
                    cnt2[tile2Int(tiles[i])]++;

                // 四种dora: 表dora, 红dora, 拔北dora, 里dora
                let all_doras = [0, 0, 0, 0];
                // 先把拔北给算上, 然后减去
                for (let i in fulu[seat])
                    if (fulu[seat][i].type === 4) {
                        cnt2[tile2Int(fulu[seat][i].tile[0])]++;
                        all_doras[2]++;
                    }
                for (let i = 0; i < dora_cnt.cnt; i++) {
                    if (player_cnt === 3 && tile2Int(doras[i]) === Constants.TILE_NUM.C1m)
                        all_doras[0] += cnt2[Constants.TILE_NUM.C9m];
                    else if (player_cnt === 2) {
                        if (tile2Int(doras[i]) === Constants.TILE_NUM.C1p)
                            all_doras[0] += cnt2[Constants.TILE_NUM.C9p];
                        if (tile2Int(doras[i]) === Constants.TILE_NUM.C1s)
                            all_doras[0] += cnt2[Constants.TILE_NUM.C9s];
                    } else {
                        // 幻境传说: 机会卡3
                        if (get_field_spell_mode2() === 3)
                            all_doras[0] += cnt2[tile2Int(doras[i])];
                        all_doras[0] += cnt2[Constants.DORA_NXT[tile2Int(doras[i])]];
                    }
                }
                for (let i = 0; i < dora_cnt.licnt; i++) {
                    if (player_cnt === 3 && tile2Int(li_doras[i]) === Constants.TILE_NUM.C1m)
                        all_doras[3] += cnt2[Constants.TILE_NUM.C9m];
                    else if (player_cnt === 2) {
                        if (tile2Int(li_doras[i]) === Constants.TILE_NUM.C1p)
                            all_doras[3] += cnt2[Constants.TILE_NUM.C9p];
                        if (tile2Int(li_doras[i]) === Constants.TILE_NUM.C1s)
                            all_doras[3] += cnt2[Constants.TILE_NUM.C9s];
                    } else {
                        // 幻境传说: 机会卡3
                        if (get_field_spell_mode2() === 3)
                            all_doras[3] += cnt2[tile2Int(li_doras[i])];
                        all_doras[3] += cnt2[Constants.DORA_NXT[tile2Int(li_doras[i])]];
                    }
                }
                // 幻境传说: 庄家卡5
                if (get_field_spell_mode1() === 5 && seat === ju && !zimo)
                    ans.dora_bonus = all_doras[0] + all_doras[1] + all_doras[3];

                // 悬赏番
                if (all_doras[0] > 0)
                    // 幻境传说: 机会卡1
                    if (!(get_field_spell_mode2() === 1 && liqi_info[seat].liqi !== 0))
                        ans.fans.push({val: all_doras[0], id: 31}); // 宝牌
                if (all_doras[1] > 0)
                    ans.fans.push({val: all_doras[1], id: 32}); // 红宝牌
                if (all_doras[2] > 0)
                    ans.fans.push({val: all_doras[2], id: 34}); // 北宝牌
                if (liqi_info[seat].liqi !== 0) {
                    let times = 1;
                    // 幻境传说: 机会卡1
                    if (get_field_spell_mode2() === 1)
                        times = 2;
                    ans.fans.push({val: all_doras[3] * times, id: 33}); // 里宝牌
                }
            }
            if (liqi_info[seat].yifa !== 0 && liqi_info[seat].liqi === 0 && zimo)
                ans.fans.push({val: !is_qingtianjing() ? 1 : 13, id: 9708}); // 十三不搭
            updateRet(ans);
        }
    }

    // 深度优先搜索, 对手牌和副露进行划分, 搜索到尽头划分数量达到5或7时, 开始算番
    function dfs(now: number) {
        if (now === Constants.TILE_NUM.C0m) {
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
            if (whatever[k] % 3 === 2) { // 有对子
                let kezi_num = (whatever[k] - 2) / 3;
                for (let j = 0; j < kezi_num; j++)
                    partition.push({type: 6, tile: [int2Tile(now), int2Tile(now), int2Tile(now)]});
                partition.push({type: 7, tile: [int2Tile(now), int2Tile(now)]});
                dfs(now);
            } else if (whatever[k] % 3 === 0) // 3 的倍数, 全是当成刻子
                for (let j = 0; j < whatever[k] / 3; j++)
                    partition.push({type: 6, tile: [int2Tile(now), int2Tile(now), int2Tile(now)]});

            if (cnt[Constants.NXT2[now]] >= cnt0 && cnt[Constants.NXT2[Constants.NXT2[now]]] >= cnt0) {
                cnt[now] -= cnt0;
                cnt[Constants.NXT2[now]] -= cnt0;
                cnt[Constants.NXT2[Constants.NXT2[now]]] -= cnt0;
                for (let i = 1; i <= cnt0; i++)
                    partition.push({
                        type: 5,
                        tile: [int2Tile(now), int2Tile(Constants.NXT2[now]), int2Tile(Constants.NXT2[Constants.NXT2[now]])],
                    });
                dfs(now + 1);
                cnt[now] += cnt0;
                cnt[Constants.NXT2[now]] += cnt0;
                cnt[Constants.NXT2[Constants.NXT2[now]]] += cnt0;
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
        let cnt2: number[] = []; // cnt2 是包含副露的牌数量集合, 不含红包牌和拔北宝牌
        for (let i = Constants.TILE_NUM.C1m; i <= Constants.TILE_NUM.C7z; i++)
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
         * @param tingpaifu - 听牌符数
         */
        function calc0(tingpaifu: 0 | 2): CalcFanRet {
            // 删除 ans 中番为 id 的番
            const deleteFan = (id: number): void => {
                for (let i in ans.fans)
                    if (ans.fans[i].id === id) {
                        ans.fans.splice(parseInt(i), 1);
                        break;
                    }
            };

            baopai[seat] = []; // 重置和牌玩家包牌信息
            let tianhu = false;
            let menqing = fulu_cnt === 0;
            // 无青天井情况下默认为 true, 之后再否定
            let ans: CalcFanRet = {yiman: !is_qingtianjing(), fans: [], fu: 0, dora_bonus: 0};
            // ----------------------------------------------
            // typecnt[i] 的 0-7 下标分别对应对应划分种类的数量
            // 0: 明顺    1: 明刻   2: 明杠   3: 暗杠
            // 4: 北宝    5: 暗顺   6: 暗刻   7: 对子
            let typecnt: TypeCnt = [];
            // 刻子, 杠子, 暗刻, 顺子
            let kezi: number[] = [], gangzi: number[] = [], anke: number[] = [], shunzi: number[] = [];
            let kezi_num = 0, gangzi_num = 0, anke_num = 0, duizi_num = 0;

            for (let i = Constants.TILE_NUM.C1m; i <= Constants.TILE_NUM.C7z; i++) {
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
            for (let i = Constants.TILE_NUM.C1m; i <= Constants.TILE_NUM.C7z; i++) {
                anke_num += anke[i];
                gangzi_num += gangzi[i];
                kezi_num += kezi[i];
                duizi_num += typecnt[i][7];

                if (i >= Constants.TILE_NUM.C1m + 1 && i <= Constants.TILE_NUM.C9m - 1 || i >= Constants.TILE_NUM.C1p + 1 && i <= Constants.TILE_NUM.C9p - 1 || i >= Constants.TILE_NUM.C1s + 1 && i <= Constants.TILE_NUM.C9s - 1)
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
            for (let i = Constants.TILE_NUM.C1m; i <= Constants.TILE_NUM.C7z; i++) {
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
                const wumen_lows = [Constants.TILE_NUM.C1m, Constants.TILE_NUM.C1p, Constants.TILE_NUM.C1s, Constants.TILE_NUM.C1z, Constants.TILE_NUM.C5z],
                    wumen_highs = [Constants.TILE_NUM.C9m, Constants.TILE_NUM.C9p, Constants.TILE_NUM.C9s, Constants.TILE_NUM.C4z, Constants.TILE_NUM.C7z];
                let flag = false;
                for (let j = wumen_lows[i]; j <= wumen_highs[i]; j++)
                    flag = flag || cnt2[j] > 0;
                if (!flag)
                    wumenqi = false;
            }
            // ---------------------------------
            // jiulian[0] 用于判断是否为九莲, jiulian[1] 表示多出来的一张牌
            let jiulian: [boolean, Tile?] = [false], yiqi = false, hunyise = false, qingyise = false;
            let jlbd = [0, 3, 1, 1, 1, 1, 1, 1, 1, 3];
            for (let k = 0; k <= 2; k++) {
                if (shunzi[k * 9 + 2] >= 1 && shunzi[k * 9 + 5] >= 1 && shunzi[k * 9 + 8] >= 1)
                    yiqi = true;

                jiulian = [true];
                for (let i = Constants.TILE_NUM.C1m; i <= Constants.TILE_NUM.C9m; i++)
                    if (cnt2[k * 9 + i] < jlbd[i]) // 手牌中各种牌数量不满足
                        jiulian = [false];
                    else if (cnt2[k * 9 + i] > jlbd[i]) // 多出来的牌
                        jiulian[1] = int2Tile(k * 9 + i);
                if (jiulian[0])
                    break;
            }
            for (let i = Constants.TILE_NUM.C1m; i <= Constants.TILE_NUM.C7z; i++)
                if (gangzi[i] >= 1) // 九莲不允许有杠子
                    jiulian = [false];

            for (let k = 0; k <= 3; k++) { // 0, 1, 2, 3 分别代表 m, p, s, z
                hunyise = qingyise = true;
                for (let i = Constants.TILE_NUM.C1m; i <= Constants.TILE_NUM.C7z; i++)
                    if (Math.floor((i - 1) / 9) !== k && cnt2[i] > 0) {
                        if (i <= Constants.TILE_NUM.C9s)
                            hunyise = false;
                        qingyise = false;
                    }
                if (hunyise) // 有一个满足, 就跳出
                    break;
            }
            // ----------------------------------
            let sanse = false, sansetongke = false;
            for (let i = Constants.TILE_NUM.C1m; i <= Constants.TILE_NUM.C9m; i++) {
                if (i >= Constants.TILE_NUM.C1m + 1 && i <= Constants.TILE_NUM.C9m - 1)
                    if (shunzi[i] >= 1 && shunzi[i + 9] >= 1 && shunzi[i + 18] >= 1)
                        sanse = true;
                if (kezi[i] >= 1 && kezi[i + 9] >= 1 && kezi[i + 18] >= 1)
                    sansetongke = true;
            }
            // ----------------------------------
            let chunquandai = true, hunquandai = true;
            for (let i = Constants.TILE_NUM.C1m; i <= Constants.TILE_NUM.C7z; i++) {
                // 从顺子和(刻子, 雀头)的角度判断是否有全带, 先顺子后(刻子, 雀头)
                if (i !== Constants.TILE_NUM.C1m + 1 && i !== Constants.TILE_NUM.C9m - 1 && i !== Constants.TILE_NUM.C1p + 1 && i !== Constants.TILE_NUM.C9p - 1 && i !== Constants.TILE_NUM.C1s + 1 && i !== Constants.TILE_NUM.C9s - 1 && shunzi[i] >= 1)
                    chunquandai = hunquandai = false;
                if (i !== Constants.TILE_NUM.C1m && i !== Constants.TILE_NUM.C9m && i !== Constants.TILE_NUM.C1p && i !== Constants.TILE_NUM.C9p && i !== Constants.TILE_NUM.C1s && i < Constants.TILE_NUM.C9s && kezi[i] + typecnt[i][7] >= 1)
                    chunquandai = hunquandai = false;
                if (i >= Constants.TILE_NUM.C1z && i <= Constants.TILE_NUM.C7z && kezi[i] + typecnt[i][7] >= 1)
                    chunquandai = false;
            }
            // ------------------------------------
            let pinghu = true;
            if (duizi_num === 7)
                pinghu = false;
            for (let i = Constants.TILE_NUM.C1m; i <= Constants.TILE_NUM.C7z; i++) {
                if (kezi[i] >= 1) // 有刻子
                    pinghu = false;
                if (typecnt[i][7] === 1) {
                    // 雀头是自风, 场风, 三元
                    if (tile2Int(((seat - ju + player_cnt) % player_cnt + 1).toString() + 'z' as Tile) === i)
                        pinghu = false;
                    if (tile2Int((chang + 1).toString() + 'z' as Tile) === i)
                        pinghu = false;
                    if (i >= Constants.TILE_NUM.C5z && i <= Constants.TILE_NUM.C7z)
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
                if (typecnt[Constants.TILE_NUM.C5z + i][7] === 1 && kezi[Constants.TILE_NUM.C5z + (i + 1) % 3] >= 1 && kezi[Constants.TILE_NUM.C5z + (i + 2) % 3] >= 1)
                    xiaosanyuan = true;

            if (kezi[Constants.TILE_NUM.C5z] >= 1 && kezi[Constants.TILE_NUM.C5z + 1] >= 1 && kezi[Constants.TILE_NUM.C5z + 2] >= 1)
                dasanyuan = true;

            for (let i = 0; i < 4; i++)
                if (typecnt[Constants.TILE_NUM.C1z + i][7] === 1 && kezi[Constants.TILE_NUM.C1z + (i + 1) % 4] >= 1 && kezi[Constants.TILE_NUM.C1z + (i + 2) % 4] >= 1 && kezi[Constants.TILE_NUM.C1z + (i + 3) % 4] >= 1)
                    xiaosixi = true;

            if (kezi[Constants.TILE_NUM.C1z] >= 1 && kezi[Constants.TILE_NUM.C1z + 1] >= 1 && kezi[Constants.TILE_NUM.C1z + 2] >= 1 && kezi[Constants.TILE_NUM.C1z + 3] >= 1)
                dasixi = true;

            // -------------------------------------
            // 四种dora: 表dora, 红dora, 拔北dora, 里dora
            let all_doras = [0, 0, 0, 0];
            // 先把拔北给算上, 然后减去
            for (let i in fulu[seat])
                if (fulu[seat][i].type === 4) {
                    cnt2[tile2Int(fulu[seat][i].tile[0])]++;
                    all_doras[2]++;
                }
            for (let i = 0; i < dora_cnt.cnt; i++) {
                if (player_cnt === 3 && tile2Int(doras[i]) === Constants.TILE_NUM.C1m)
                    all_doras[0] += cnt2[Constants.TILE_NUM.C9m];
                else if (player_cnt === 2) {
                    if (tile2Int(doras[i]) === Constants.TILE_NUM.C1p)
                        all_doras[0] += cnt2[Constants.TILE_NUM.C9p];
                    if (tile2Int(doras[i]) === Constants.TILE_NUM.C1s)
                        all_doras[0] += cnt2[Constants.TILE_NUM.C9s];
                } else {
                    // 幻境传说: 机会卡3
                    if (get_field_spell_mode2() === 3)
                        all_doras[0] += cnt2[tile2Int(doras[i])];
                    all_doras[0] += cnt2[Constants.DORA_NXT[tile2Int(doras[i])]];
                }
            }
            for (let i = 0; i < dora_cnt.licnt; i++) {
                if (player_cnt === 3 && tile2Int(li_doras[i]) === Constants.TILE_NUM.C1m)
                    all_doras[3] += cnt2[Constants.TILE_NUM.C9m];
                else if (player_cnt === 2) {
                    if (tile2Int(li_doras[i]) === Constants.TILE_NUM.C1p)
                        all_doras[3] += cnt2[Constants.TILE_NUM.C9p];
                    if (tile2Int(li_doras[i]) === Constants.TILE_NUM.C1s)
                        all_doras[3] += cnt2[Constants.TILE_NUM.C9s];
                } else {
                    // 幻境传说: 机会卡3
                    if (get_field_spell_mode2() === 3)
                        all_doras[3] += cnt2[tile2Int(li_doras[i])];
                    all_doras[3] += cnt2[Constants.DORA_NXT[tile2Int(li_doras[i])]];
                }
            }
            // cnt2 不记录红宝牌, 所以不能用 cnt2
            for (let i in tiles)
                if (tile2Int(tiles[i], true) >= Constants.TILE_NUM.C0m && tile2Int(tiles[i], true) <= Constants.TILE_NUM.C0s)
                    all_doras[1]++;
            for (let i in fulu[seat])
                for (let j in fulu[seat][i].tile)
                    if (tile2Int(fulu[seat][i].tile[j], true) >= Constants.TILE_NUM.C0m && tile2Int(fulu[seat][i].tile[j], true) <= Constants.TILE_NUM.C0s)
                        all_doras[1]++;

            for (let i in fulu[seat])
                if (fulu[seat][i].type === 4)
                    cnt2[tile2Int(fulu[seat][i].tile[0])]--;

            // 幻境传说: 庄家卡5
            if (get_field_spell_mode1() === 5 && seat === ju && !zimo)
                ans.dora_bonus = all_doras[0] + all_doras[1] + all_doras[3];
            // ------------------------------------
            // ------------------------------------
            // ------------------------------------
            // 自己添加的役种
            if (is_tiandichuangzao() && typecnt[Constants.TILE_NUM.C5z][2] === 1 && typecnt[Constants.TILE_NUM.C5z][7] === 1 && typecnt[Constants.TILE_NUM.C5z][3] === 3) {
                if (!is_qingtianjing()) {
                    ans.fans.push({val: 6, id: 9001}); // 天地创造
                    return ans;
                } else
                    ans.fans.push({val: 0, id: 9001}); // 设为0是防止重复计数
            }
            if (is_wanwushengzhang() && typecnt[Constants.TILE_NUM.C5z + 1][3] === 4 && typecnt[Constants.TILE_NUM.C5z + 1][7] === 1) {
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
                        if ((type === 1 || type === 2 || type === 3) && (t_int >= Constants.TILE_NUM.C5z && t_int <= Constants.TILE_NUM.C7z)) {
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

            if (xiaosixi && (!dasixi || is_sixifuhe()))
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
                        if ((type === 1 || type === 2 || type === 3) && (t_int >= Constants.TILE_NUM.C1z && t_int <= Constants.TILE_NUM.C4z)) {
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
                if (menqing && qingyise && flag_duanyao) {
                    if (cnt2.slice(2, Constants.TILE_NUM.C9m).every(n => n == 2))
                        ans.fans.push({val: !is_qingtianjing() ? 1 : 13, id: 62}); // 大数邻
                    if (cnt2.slice(11, Constants.TILE_NUM.C9p).every(n => n == 2))
                        ans.fans.push({val: !is_qingtianjing() ? 1 : 13, id: 60}); // 大车轮
                    if (cnt2.slice(20, Constants.TILE_NUM.C9s).every(n => n == 2))
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
                    for (let j = Constants.TILE_NUM.C1m; j <= Constants.TILE_NUM.C9m; j++) {
                        if (j !== Constants.TILE_NUM.C1m && j !== Constants.TILE_NUM.C9m && shunzi[i * 9 + j] >= 4)
                            sitongshun = true;
                        if (j <= 6 && kezi[i * 9 + j] >= 1 && kezi[i * 9 + j + 1] >= 1 && kezi[i * 9 + j + 2] >= 1 && kezi[i * 9 + j + 3] >= 1)
                            silianke = true;
                    }
                if (silianke)
                    ans.fans.push({val: !is_qingtianjing() ? 1 : 13, id: 9703}); // 四连刻
                if (sitongshun)
                    ans.fans.push({val: !is_qingtianjing() ? 1 : 13, id: 9704}); // 一色四同顺

                let hongkongque = true, hongyidian = true, heiyise = true;
                if (cnt2[34] === 0)
                    hongkongque = hongyidian = false;
                for (let i = Constants.TILE_NUM.C1m as number; i <= Constants.TILE_NUM.C7z; i++) {
                    if (i !== 19 && i !== 23 && i !== 25 && i !== 27 && i !== 34 && i !== 37 && cnt2[i] >= 1)
                        hongkongque = false;
                    if (i !== 20 && i !== 21 && i !== 22 && i !== 24 && i !== 26 && i !== 34 && cnt2[i] >= 1)
                        hongyidian = false;
                    if (i !== 11 && i !== 13 && i !== 17 && i !== 28 && i !== 29 && i !== 30 && i !== 31 && cnt2[i] >= 1)
                        heiyise = false;
                }
                if (hongkongque)
                    ans.fans.push({val: !is_qingtianjing() ? 1 : 13, id: 9705}); // 红孔雀
                if (hongyidian)
                    ans.fans.push({val: !is_qingtianjing() ? 1 : 13, id: 9706}); // 红一点
                if (heiyise)
                    ans.fans.push({val: !is_qingtianjing() ? 1 : 13, id: 9707}); // 黑一色

                if (seat === ju && lianzhuang_cnt >= 7) // 第8次和牌
                    ans.fans.push({val: !is_qingtianjing() ? 1 : 13, id: 46}); // 八连庄

                let wan_qingyise = true;
                for (let i = Constants.TILE_NUM.C1p; i <= Constants.TILE_NUM.C7z; i++)
                    if (cnt2[i] >= 1)
                        wan_qingyise = false;
                if (wan_qingyise) {
                    let sum = 0;
                    for (let i = 1; i <= 9; i++)
                        sum += cnt2[i] * i;
                    if (sum >= 100)
                        ans.fans.push({val: !is_qingtianjing() ? 1 : 13, id: 9709}); // 百万石
                }

                let jinmenqiao = false;
                for (let i = 0; i <= 2; i++)
                    if (shunzi[i * 9 + 2] >= 1 && shunzi[i * 9 + 4] >= 1 && shunzi[i * 9 + 6] >= 1 && shunzi[i * 9 + 8] >= 1)
                        jinmenqiao = true;
                if (menqing && jinmenqiao)
                    ans.fans.push({val: !is_qingtianjing() ? 1 : 13, id: 9710}); // 金门桥

                let xinganxian_part1 = false, xinganxian_part2 = false;
                for (let j = 0; j <= 2; j++) {
                    xinganxian_part1 = true;
                    for (let i = Constants.TILE_NUM.C1m; i <= Constants.TILE_NUM.C9m; i++)
                        if (cnt2[j * 9 + i] !== 1)
                            xinganxian_part1 = false;
                    if (xinganxian_part1)
                        break;
                }
                if (kezi[Constants.TILE_NUM.C1z] === 1 && typecnt[Constants.TILE_NUM.C4z][7] === 1 || kezi[Constants.TILE_NUM.C4z] === 1 && typecnt[Constants.TILE_NUM.C1z][7] === 1)
                    xinganxian_part2 = true;
                if (menqing && xinganxian_part1 && xinganxian_part2)
                    ans.fans.push({val: !is_qingtianjing() ? 1 : 13, id: 9711}); // 东北新干线

                if (flag_lvyise && cnt2[33] === 0) {
                    deleteFan(40);
                    ans.fans.push({val: !is_qingtianjing() ? 2 : 26, id: 9712}); // 无发绿一色
                }
            }

            if (liqi_info[seat].kai && !zimo && liqi_info[fangchong].liqi === 0) { // 开立直
                if (liqi_info[seat].liqi === 1)
                    ans.fans.push({val: !is_qingtianjing() ? 1 : 13, id: 9003});
                if (liqi_info[seat].liqi === 2)
                    ans.fans.push({val: !is_qingtianjing() ? 1 : 13, id: 9004});
            }

            if (ans.fans.length > 0 && !is_qingtianjing())
                return ans;
            // ------------------------------------
            ans.yiman = false;

            if (liqi_info[seat].yifa !== 0 && liqi_info[seat].liqi === 0 && seat !== ju && !zimo)
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

            if (kezi[Constants.TILE_NUM.C5z] >= 1)
                ans.fans.push({val: kezi[Constants.TILE_NUM.C5z], id: 7}); // 白
            if (kezi[Constants.TILE_NUM.C5z + 1] >= 1)
                ans.fans.push({val: kezi[Constants.TILE_NUM.C5z + 1], id: 8}); // 发
            if (kezi[Constants.TILE_NUM.C7z] >= 1)
                ans.fans.push({val: kezi[Constants.TILE_NUM.C7z], id: 9}); // 中
            if (kezi[tile2Int(((seat - ju + player_cnt) % player_cnt + 1).toString() + 'z' as Tile)] >= 1)
                ans.fans.push({
                    val: kezi[tile2Int(((seat - ju + player_cnt) % player_cnt + 1).toString() + 'z' as Tile)],
                    id: 10
                }); // 自风
            if (kezi[tile2Int((chang + 1).toString() + 'z' as Tile)] >= 1)
                ans.fans.push({val: kezi[tile2Int((chang + 1).toString() + 'z' as Tile)], id: 11}); // 场风

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
                for (let i = Constants.TILE_NUM.C1m as number; i <= Constants.TILE_NUM.C7z; i++)
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

            if (all_doras[0] > 0)
                // 幻境传说: 机会卡1
                if (!(get_field_spell_mode2() === 1 && liqi_info[seat].liqi !== 0))
                    ans.fans.push({val: all_doras[0], id: 31}); // 宝牌
            if (all_doras[1] > 0)
                ans.fans.push({val: all_doras[1], id: 32}); // 红宝牌
            if (all_doras[2] > 0)
                ans.fans.push({val: all_doras[2], id: 34}); // 北宝牌
            if (liqi_info[seat].liqi !== 0) {
                let times = 1;
                // 幻境传说: 机会卡1
                if (get_field_spell_mode2() === 1)
                    times = 2;
                ans.fans.push({val: all_doras[3] * times, id: 33}); // 里宝牌
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
            for (let i = Constants.TILE_NUM.C1m; i <= Constants.TILE_NUM.C7z; i++) {
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
                        if (i === tile2Int(((seat - ju + player_cnt) % player_cnt + 1).toString() + 'z' as Tile) || i === tile2Int((chang + 1).toString() + 'z' as Tile))
                            ans.fu += 2;
                    } else {
                        if (i === tile2Int(((seat - ju + player_cnt) % player_cnt + 1).toString() + 'z' as Tile))
                            ans.fu += 2;
                        if (i === tile2Int((chang + 1).toString() + 'z' as Tile))
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
 * @param seat - 和牌的 seat 号玩家
 * @param zimo - 是否是自摸
 * @param type - false 表示正常和牌, true 表示查大叫的情况
 */
export const calcFanChuanma = (seat: Seat, zimo: boolean, type: boolean = false): CalcFanRet => {
    // 更新返回值
    const updateRet = (x: CalcFanRet): void => {
        if (calcSudianChuanma(ret, 1) < calcSudianChuanma(x, 1))
            ret = x;
    };

    let tiles = player_tiles[seat];
    // 手牌少一张, 表示查大叫的情况
    if (tiles.length % 3 === 1 && type) {
        let tingpais = calcTingpai(seat), ret: CalcFanRet = {fans: [] as FansType, fu: 0};
        for (let i in tingpais) {
            tiles.push(tingpais[i].tile);
            let tmp: CalcFanRet = calcFanChuanma(seat, zimo, true);
            updateRet(tmp);
            tiles.pop();
        }
        return ret;
    }

    let lastile = tiles[tiles.length - 1];
    let fulu_cnt = 0;
    let ret: CalcFanRet = {fans: [] as FansType, fu: 0};
    if (huazhu(seat))
        return ret;
    let cnt: number[] = [];
    for (let i = Constants.TILE_NUM.C1m; i <= Constants.TILE_NUM.C0s; i++) // 注意这里是 C0s 而不是 C7z, 是因为下面 dfs 要用到 NXT2, 需要从 C7z 扩展到 C0s
        cnt[i] = 0;
    for (let i in tiles)
        cnt[tile2Int(tiles[i])]++;
    let partition: Partition = [];
    for (let i in fulu[seat]) {
        partition.push(fulu[seat][i]);
        fulu_cnt++;
    }

    dfs(1);
    if (calcHupai(tiles) === 2) { // 七对子只有一种分解方式
        partition = [];
        for (let i = Constants.TILE_NUM.C1m; i <= Constants.TILE_NUM.C9s; i++)
            while (cnt[i] > 0) {
                partition.push({type: 7, tile: [int2Tile(i), int2Tile(i)]});
                cnt[i] -= 2;
            }
        calc();
    }

    return ret;

    // 深度优先搜索, 对手牌和副露进行划分, 搜索到尽头划分数量达到5或7时, 开始算番
    function dfs(now: number) {
        if (now === Constants.TILE_NUM.C1z) {
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
            if (whatever[k] % 3 === 2) { // 有对子
                let kezi_num = (whatever[k] - 2) / 3;
                for (let j = 0; j < kezi_num; j++)
                    partition.push({type: 6, tile: [int2Tile(now), int2Tile(now), int2Tile(now)]});
                partition.push({type: 7, tile: [int2Tile(now), int2Tile(now)]});
                dfs(now);
            } else if (whatever[k] % 3 === 0)
                for (let j = 0; j < whatever[k] / 3; j++)
                    partition.push({type: 6, tile: [int2Tile(now), int2Tile(now), int2Tile(now)]});

            if (cnt[Constants.NXT2[now]] >= cnt0 && cnt[Constants.NXT2[Constants.NXT2[now]]] >= cnt0) {
                cnt[now] -= cnt0;
                cnt[Constants.NXT2[now]] -= cnt0;
                cnt[Constants.NXT2[Constants.NXT2[now]]] -= cnt0;
                for (let i = 1; i <= cnt0; i++)
                    partition.push({
                        type: 5,
                        tile: [int2Tile(now), int2Tile(Constants.NXT2[now]), int2Tile(Constants.NXT2[Constants.NXT2[now]])],
                    });
                dfs(now + 1);
                cnt[now] += cnt0;
                cnt[Constants.NXT2[now]] += cnt0;
                cnt[Constants.NXT2[Constants.NXT2[now]]] += cnt0;
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
        let cnt2: number[] = [];
        for (let i = Constants.TILE_NUM.C1m; i <= Constants.TILE_NUM.C9s; i++)
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
         * @param tingpaifu - 听牌符数, 这里没什么用
         */
        function calc0(tingpaifu: 0 | 2): { fans: FansType; fu: number; } {
            let ans = {fans: [] as number[], fu: 0};
            // 0: 明顺    1: 明刻   2: 明杠   3: 暗杠
            // 4: 北宝    5: 暗顺   6: 暗刻   7: 对子
            let typecnt: TypeCnt = [];
            let kezi: number[] = [], gangzi: number[] = [], shunzi: number[] = [];
            let kezi_num = 0, gangzi_num = 0, duizi_num = 0;
            for (let i = Constants.TILE_NUM.C1m; i <= Constants.TILE_NUM.C9s; i++) {
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
            for (let i = Constants.TILE_NUM.C1m; i <= Constants.TILE_NUM.C9s; i++) {
                gangzi_num += gangzi[i];
                kezi_num += kezi[i];
            }
            if (partitiontmp.length === 7)
                duizi_num = 7;
            // --------------------------
            let quandai = true;
            for (let i = Constants.TILE_NUM.C1m as number; i <= Constants.TILE_NUM.C9s; i++) {
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
                for (let i = Constants.TILE_NUM.C1m; i <= Constants.TILE_NUM.C9s; i++)
                    if (Math.floor((i - 1) / 9) !== k && cnt2[i] > 0)
                        qingyise = false;
                if (qingyise)
                    break;
            }
            // ---------------------------
            let jiangdui = true;
            for (let i = Constants.TILE_NUM.C1m as number; i <= Constants.TILE_NUM.C9s; i++)
                if (i !== 2 && i !== 5 && i !== 8 && i !== 11 && i !== 14 && i !== 17 && i !== 20 && i !== 23 && i !== 26 && cnt2[i] > 0)
                    jiangdui = false;
            // ---------------------------
            ans.fans[1000] = 0;
            ans.fans[1003] = 1;
            for (let i = Constants.TILE_NUM.C1m; i <= Constants.TILE_NUM.C9s; i++)
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
            for (let i = Constants.TILE_NUM.C1m; i <= Constants.TILE_NUM.C9s; i++) {
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

        // 根据初步算得的番列表, 确定要实际显示哪些番
        function ans2Fan(x: { fans: number[], fu: number }): CalcFanRet {
            let ans: CalcFanRet = {fans: [], fu: x.fu};
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
    }
};

/**
 * calcFan 组 - 国标
 *
 * 根据牌算番
 * @param seat - 和牌的 seat 号玩家
 * @param zimo - 是否是自摸
 */
export const calcFanGuobiao = (seat: Seat, zimo: boolean): CalcFanRet => {
    // 更新返回值
    const updateRet = (x: CalcFanRet): void => {
        if (calcSudianGuobiao(ret) < calcSudianGuobiao(x))
            ret = x;
    };

    let tiles = player_tiles[seat];
    let lastile = tiles[tiles.length - 1];
    let fulu_cnt = 0;
    let ret: CalcFanRet = {fans: [], fu: 0};
    let cnt: number[] = [];
    for (let i = Constants.TILE_NUM.C1m; i <= Constants.TILE_NUM.C0s; i++) // 注意这里是 C0s 而不是 C7z, 是因为下面 dfs 要用到 NXT2, 需要从 C7z 扩展到 C0s
        cnt[i] = 0;
    for (let i in tiles)
        cnt[tile2Int(tiles[i])]++;

    let partition: Partition = [];
    for (let i in fulu[seat])
        if (fulu[seat][i].type !== 4) {
            if (fulu[seat][i].type !== 3)
                fulu_cnt++;
            partition.push(fulu[seat][i]);
        }

    dfs(1);

    let result = calcHupai(tiles);
    if (result === 3) {
        let ans: CalcFanRet = {fans: [], fu: 25};
        ans.fans.push({val: 88, id: 8006}); // 十三幺
        specialCalc(ans);
        updateRet(ans);
    }
    if (result === 4 || result === 5) { // 一定是全不靠或七星不靠
        let qixingbukao = true;
        for (let i = Constants.TILE_NUM.C1z; i <= Constants.TILE_NUM.C7z; i++)
            if (cnt[i] === 0)
                qixingbukao = false;

        let ans: CalcFanRet = {fans: [], fu: 25};
        if (qixingbukao)
            ans.fans.push({val: 24, id: 8019}); // 七星不靠
        else if (result === 5) { // 有组合龙
            ans.fans.push({val: 12, id: 8033}); // 全不靠
            ans.fans.push({val: 12, id: 8034}); // 组合龙
        } else
            ans.fans.push({val: 12, id: 8033}); // 全不靠
        specialCalc(ans);
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
            partition.push({type: 8, tile: new_shunzi});
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
    function dfs(now: number) {
        if (now === Constants.TILE_NUM.C0m) {
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
                partition.push({type: 7, tile: [int2Tile(now), int2Tile(now)]});
                dfs(now);
            } else if (k === 2)
                partition.push({type: 6, tile: [int2Tile(now), int2Tile(now), int2Tile(now)]});
            if (cnt[Constants.NXT2[now]] >= cnt0 && cnt[Constants.NXT2[Constants.NXT2[now]]] >= cnt0) {
                cnt[now] -= cnt0;
                cnt[Constants.NXT2[now]] -= cnt0;
                cnt[Constants.NXT2[Constants.NXT2[now]]] -= cnt0;
                for (let i = 1; i <= cnt0; i++)
                    partition.push({
                        type: 5,
                        tile: [int2Tile(now), int2Tile(Constants.NXT2[now]), int2Tile(Constants.NXT2[Constants.NXT2[now]])]
                    });
                dfs(now + 1);
                cnt[now] += cnt0;
                cnt[Constants.NXT2[now]] += cnt0;
                cnt[Constants.NXT2[Constants.NXT2[now]]] += cnt0;
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
        let cnt2: number[] = [];
        for (let i = Constants.TILE_NUM.C1m; i <= Constants.TILE_NUM.C7z; i++)
            cnt2[i] = 0;
        let partitiontmp = partition.slice();
        for (let i = partitiontmp.length - 1; i >= 0; i--) {
            let tiles = partitiontmp[i].tile;
            // 新增 9 分类, 用于组合龙
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
            if (type === 8)
                updateRet(calc0(0)); // 组合龙
        }

        /**
         * 核心算法, 根据所有前置动作计算手牌有哪些番
         *
         * @param tingpaifu - 听牌符数, 这里没什么用
         */
        function calc0(tingpaifu: 0 | 2): CalcFanRet {
            /**
             * ban 掉 ids 中 id 的番
             *
             * @param ids - ban 番列表
             */
            const banFan = (ids: number | number[]): void => {
                if (typeof ids == 'number')
                    ids = [ids] as number[];
                for (let i in ids)
                    ban_num[ids[i] - 8000] = true;
            };

            /**
             * id 番是否已被 ban
             *
             * @param id - 查询番的 id
             */
            const isBanned = (id: number): boolean => {
                return ban_num[id - 8000];
            };

            let menqing = fulu_cnt === 0;
            // 不计列表
            let ban_num: boolean[] = [];
            for (let i = 0; i < 100; i++)
                ban_num[i] = false;
            // 指定数量的不计幺九刻计数
            let ban_yaojiuke_num = 0;

            let ans: CalcFanRet = {fans: [], fu: 0};
            // 0: 明顺    1: 明刻   2: 明杠   3: 暗杠
            // 4: 北宝    5: 暗顺   6: 暗刻   7: 对子
            let typecnt: TypeCnt = [];
            // 刻子, 杠子, 暗刻, 顺子
            let kezi: number[] = [], gangzi: number[] = [], anke: number[] = [], shunzi: number[] = [];
            let kezi_num = 0, gangzi_num = 0, anke_num = 0, duizi_num = 0;
            let minggang_num = 0;
            let angang_num = 0;

            for (let i = Constants.TILE_NUM.C1m; i <= Constants.TILE_NUM.C7z; i++) {
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
                        banFan(8042); // 有类型8, 则是在组合龙内, ban 无番和
                        break;
                }
                if (type === 1 || type === 2 || type === 3 || type === 6 || type === 7)
                    typecnt[tile2Int(partitiontmp[i].tile[0])][type]++;
                if (type === 0 || type === 5)
                    typecnt[(tile2Int(partitiontmp[i].tile[0]) + tile2Int(partitiontmp[i].tile[1]) + tile2Int(partitiontmp[i].tile[2])) / 3][type]++;
            }
            let beikou = 0, santongshun = false;
            for (let i = Constants.TILE_NUM.C1m; i <= Constants.TILE_NUM.C7z; i++) {
                anke_num += anke[i];
                gangzi_num += gangzi[i];
                kezi_num += kezi[i];
                duizi_num += typecnt[i][7];
                minggang_num += typecnt[i][2];
                angang_num += typecnt[i][3];

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
            for (let i = Constants.TILE_NUM.C1m; i <= Constants.TILE_NUM.C7z; i++) {
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
                const wumen_lows = [Constants.TILE_NUM.C1m, Constants.TILE_NUM.C1p, Constants.TILE_NUM.C1s, Constants.TILE_NUM.C1z, Constants.TILE_NUM.C5z],
                    wumen_highs = [Constants.TILE_NUM.C9m, Constants.TILE_NUM.C9p, Constants.TILE_NUM.C9s, Constants.TILE_NUM.C4z, Constants.TILE_NUM.C7z];
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
            for (let i = Constants.TILE_NUM.C1m; i <= Constants.TILE_NUM.C7z; i++)
                if (gangzi[i] >= 1) // 九莲不允许有杠子
                    jiulian = false;
            // --------------------------
            for (let k = 0; k <= 3; k++) {
                hunyise = qingyise = true;
                for (let i = Constants.TILE_NUM.C1m; i <= Constants.TILE_NUM.C7z; i++)
                    if (Math.floor((i - 1) / 9) !== k && cnt2[i] > 0) {
                        if (i <= Constants.TILE_NUM.C9s)
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
                if (typecnt[Constants.TILE_NUM.C5z + i][7] === 1 && kezi[Constants.TILE_NUM.C5z + (i + 1) % 3] >= 1 && kezi[Constants.TILE_NUM.C5z + (i + 2) % 3] >= 1)
                    xiaosanyuan = true;

            if (kezi[Constants.TILE_NUM.C5z] >= 1 && kezi[Constants.TILE_NUM.C5z + 1] >= 1 && kezi[Constants.TILE_NUM.C5z + 2] >= 1)
                dasanyuan = true;

            for (let i = 0; i < 4; i++)
                if (typecnt[Constants.TILE_NUM.C1z + i][7] === 1 && kezi[Constants.TILE_NUM.C1z + (i + 1) % 4] >= 1 && kezi[Constants.TILE_NUM.C1z + (i + 2) % 4] >= 1 && kezi[Constants.TILE_NUM.C1z + (i + 3) % 4] >= 1)
                    xiaosixi = true;

            if (kezi[Constants.TILE_NUM.C1z] >= 1 && kezi[Constants.TILE_NUM.C1z + 1] >= 1 && kezi[Constants.TILE_NUM.C1z + 2] >= 1 && kezi[Constants.TILE_NUM.C1z + 3] >= 1)
                dasixi = true;
            // --------------------------
            let hunquandai = true;
            for (let i = Constants.TILE_NUM.C1m; i <= Constants.TILE_NUM.C7z; i++) {
                // 从顺子和(刻子, 雀头)的角度判断是否有全带, 先顺子后(刻子, 雀头)
                if (i !== Constants.TILE_NUM.C1m + 1 && i !== Constants.TILE_NUM.C9m - 1 && i !== Constants.TILE_NUM.C1p + 1 && i !== Constants.TILE_NUM.C9p - 1 && i !== Constants.TILE_NUM.C1s + 1 && i !== Constants.TILE_NUM.C9s - 1 && shunzi[i] >= 1)
                    hunquandai = false;
                if (i !== Constants.TILE_NUM.C1m && i !== Constants.TILE_NUM.C9m && i !== Constants.TILE_NUM.C1p && i !== Constants.TILE_NUM.C9p && i !== Constants.TILE_NUM.C1s && i < Constants.TILE_NUM.C9s && kezi[i] + typecnt[i][7] >= 1)
                    hunquandai = false;
            }
            // --------------------------
            let pinghu = true;
            if (duizi_num === 7)
                pinghu = false;
            for (let i = Constants.TILE_NUM.C1m; i <= Constants.TILE_NUM.C7z; i++)
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
            for (let i = Constants.TILE_NUM.C1m; i <= Constants.TILE_NUM.C7z; i++)
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
            for (let i = Constants.TILE_NUM.C1m; i <= Constants.TILE_NUM.C7z; i++) {
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
            for (let i = Constants.TILE_NUM.C1m as number; i <= Constants.TILE_NUM.C7z; i++) {
                if (!(i >= 4 && i <= 6) && !(i >= 13 && i <= 15) && !(i >= 22 && i <= 24) && shunzi[i] >= 1)
                    quandaiwu = false;
                if (i !== Constants.TILE_NUM.C5m && i !== Constants.TILE_NUM.C5p && i !== Constants.TILE_NUM.C5s)
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
            for (let i = Constants.TILE_NUM.C1m; i <= Constants.TILE_NUM.C7z; i++) {
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
                if (kezi[Constants.TILE_NUM.C1z + i] >= 1 && kezi[Constants.TILE_NUM.C1z + (i + 1) % 4] >= 1 && kezi[Constants.TILE_NUM.C1z + (i + 2) % 4] >= 1)
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
            for (let i = Constants.TILE_NUM.C1m; i <= Constants.TILE_NUM.C7z; i++)
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
            for (let i = Constants.TILE_NUM.C1m; i <= Constants.TILE_NUM.C9m - 2; i++)
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
                if (kezi[Constants.TILE_NUM.C5z + (i + 1) % 3] >= 1 && kezi[Constants.TILE_NUM.C5z + (i + 2) % 3] >= 1)
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
                for (let i = 0; i < kezi[Constants.TILE_NUM.C5z]; i++) {
                    ans.fans.push({val: 2, id: 8058}); // 箭刻 白
                    // 这副刻子不计幺九刻
                    ban_yaojiuke_num++;
                }
            if (!isBanned(8059))
                for (let i = 0; i < kezi[Constants.TILE_NUM.C5z + 1]; i++) {
                    ans.fans.push({val: 2, id: 8059}); // 箭刻 发
                    // 这副刻子不计幺九刻
                    ban_yaojiuke_num++;
                }
            if (!isBanned(8060))
                for (let i = 0; i < kezi[Constants.TILE_NUM.C7z]; i++) {
                    ans.fans.push({val: 2, id: 8060}); // 箭刻 中
                    // 这副刻子不计幺九刻
                    ban_yaojiuke_num++;
                }

            if (!isBanned(8061))
                for (let i = 0; i < kezi[tile2Int((chang + 1).toString() + 'z' as Tile)]; i++) {
                    ans.fans.push({val: 2, id: 8061}); // 圈风刻
                    // 这副刻子不计幺九刻
                    ban_yaojiuke_num++;
                }
            if (!isBanned(8062))
                for (let i = 0; i < kezi[tile2Int(((seat - ju + player_cnt) % player_cnt + 1).toString() + 'z' as Tile)]; i++) {
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
            for (let i = Constants.TILE_NUM.C1m; i <= Constants.TILE_NUM.C7z; i++)
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
            for (let i = Constants.TILE_NUM.C1m; i <= Constants.TILE_NUM.C7z; i++)
                if (judgeTile(int2Tile(i), 'Y'))
                    yaojiuke_num += kezi[i];
            if (!isBanned(8074) && yaojiuke_num >= 1)
                ans.fans.push({val: yaojiuke_num, id: 8074}); // 幺九刻

            if (minggang_num === 1 && gangzi_num === 1 && !isBanned(8075))
                ans.fans.push({val: 1, id: 8075}); // 明杠

            let queyimen = false, have_m = 0, have_p = 0, have_s = 0;
            for (let i = Constants.TILE_NUM.C1m; i <= Constants.TILE_NUM.C9m; i++) {
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
            for (let i = Constants.TILE_NUM.C1z; i <= Constants.TILE_NUM.C7z; i++)
                if (cnt2[i] >= 1)
                    wuzi = false;
            if (wuzi && !isBanned(8077))
                ans.fans.push({val: 1, id: 8077}); // 无字

            let cnt_tiles: number[] = []; // 只包括手牌的 cnt, cnt2 是包括副露的
            for (let i = Constants.TILE_NUM.C1m; i <= Constants.TILE_NUM.C7z; i++)
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
            for (let i = Constants.TILE_NUM.C1m; i <= Constants.TILE_NUM.C7z; i++) {
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
                    if (i === tile2Int(((seat - ju + player_cnt) % player_cnt + 1).toString() + 'z' as Tile))
                        ans.fu += 2;
                    if (i === tile2Int((chang + 1).toString() + 'z' as Tile))
                        ans.fu += 2;
                    if (i >= Constants.TILE_NUM.C5z && i <= Constants.TILE_NUM.C7z)
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

    /**
     * 能与特殊牌型(国士, 全不靠)复合番种的计算, 不含全不靠的组合龙因为还会调用 dfs 所以不需要调用该函数
     *
     * 复合番种包括: 天和, 地和, 人和, 妙手回春, 海底捞月, 抢杠和, 和绝张, 自摸
     */
    function specialCalc(ans: CalcFanRet): void {
        let ban_zimo = false;

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
    }
};

// ========================================================================

/**
 * 川麻刮风下雨
 * @param type - 是否完场, 默认不完场
 */
export const calcGangPoint = (type: boolean = false): void => {
    if (chuanma_gangs.not_over.length === 0)
        return;
    for (let i = chuanma_gangs.not_over.length - 1; i >= 0; i--) {
        chuanma_gangs.over.push(chuanma_gangs.not_over[i]);
        delta_scores[chuanma_gangs.not_over[i].from] -= chuanma_gangs.not_over[i].val;
        delta_scores[chuanma_gangs.not_over[i].to] += chuanma_gangs.not_over[i].val;
        chuanma_gangs.not_over.pop();
    }
    let old_scores = scores.slice() as Players_Number;
    for (let i = 0; i < player_cnt; i++)
        scores[i] += delta_scores[i];

    if (!type)
        addGangResult(old_scores);
    else
        addGangResultEnd(old_scores);

    for (let i = 0; i < player_cnt; i++)
        delta_scores[i] = 0;
};

// ========================================================================

// 小局结束
export const roundEnd = (): void => {
    if (actions.length === 0)
        return;
    if (is_chuanma() && chuanma_gangs.not_over.length !== 0 && getLstAction().name !== 'RecordNoTile' && getLstAction().name !== 'RecordHuleXueZhanEnd')
        calcGangPoint(true);
    for (let i = 0; i < 4; i++)
        begin_tiles[i] = '';
    discard_tiles = [[], [], [], []];
    deal_tiles = [[], [], [], []];
    muyu.seats = '';
    paishan = [];

    all_data.all_actions.push(actions.slice());
    all_data.xun.push(xun.slice() as Players_NumberArray);
    xun = [[], [], [], []];
    actions = [];
    if (is_chuanma() && first_hu_seat !== -1)
        ju = first_hu_seat;
    if (ju === player_cnt) {
        chang++;
        ju = 0;
    }
    chang %= player_cnt;

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

    players = [null, null];
    for (let i: Seat = 0; i < player_cnt; i++)
        players[i] = {
            seat: i as Seat,
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

/**
 * 示例牌局: 东一局庄家大七星w立, 南家追立放铳
 */
export const demoGame = (): void => {
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

/**
 * 用于报菜名的示例牌局
 * @param type - 是否去掉重复的番种(去掉可能会使得界面显示差一点, 但不会出现重复的语音, 如"国士无双")
 */
export const reportYaku = (type: boolean = false): void => {
    if (config.mode.detail_rule._report_yakus) {
        let origin_huleOnePlayer = huleOnePlayer;

        // 第1局
        huleOnePlayer = seat => {
            let fans = [
                {val: 1, id: 2}, // 立直
                {val: 2, id: 18}, // 两立直
                {val: 1, id: 30}, // 一发
                {val: 1, id: 3}, // 枪杠
                {val: 1, id: 4}, // 岭上开花
                {val: 1, id: 5}, // 海底摸月
                {val: 1, id: 6}, // 河底捞鱼
                {val: 1, id: 1}, // 门前清自摸和
                {val: 1, id: 14}, // 平和
                {val: 1, id: 13}, // 一杯口
                {val: 3, id: 28}, // 二杯口
                {val: 2, id: 25}, // 七对子
            ];
            player_tiles[seat].pop();
            delta_scores = [-16000, -8000, 32000, -8000];
            return {
                count: 64,
                doras: [doras[0]],
                li_doras: [],
                fans: fans,
                fu: 170,
                hand: player_tiles[seat].slice(),
                hu_tile: player_tiles[seat][player_tiles[seat].length - 1],
                liqi: false,
                ming: [],
                point_rong: 32000,
                point_sum: 32000,
                point_zimo_qin: 16000,
                point_zimo_xian: 8000,
                qinjia: false,
                seat: seat,
                title_id: 11,
                yiman: false,
                zimo: true,
            };
        };
        begin_tiles[0] = '1112340678999m7z';
        begin_tiles[1] = '1112340678999p';
        begin_tiles[2] = '5555555555555z';
        begin_tiles[3] = '1112340678999s';
        randomPaishan('75z', '7z....');
        roundBegin();
        qiepai();
        normalMoqie();
        zimoHu();

        setRound(2, 0, 0);

        // 第2局
        huleOnePlayer = seat => {
            let fans = [
                {val: 1, id: 7}, // 役牌 白
                {val: 1, id: 8}, // 役牌 发
                {val: 1, id: 9}, // 役牌 中
                {val: 1, id: 9101}, // 役牌 东
                {val: 1, id: 9102}, // 役牌 连东
                {val: 1, id: 9103}, // 役牌 南
                {val: 1, id: 9104}, // 役牌 连南
                {val: 1, id: 10}, // 役牌:门风牌
                {val: 1, id: 11}, // 役牌:场风牌
                {val: 1, id: 9107}, // 役牌 北
                {val: 1, id: 9108}, // 役牌 连北
                {val: 1, id: 12}, // 断幺九
            ];
            player_tiles[seat].pop();
            delta_scores = [-16000, -8000, 32000, -8000];
            return {
                count: 64,
                doras: [doras[0]],
                li_doras: [],
                fans: fans,
                fu: 170,
                hand: player_tiles[seat].slice(),
                hu_tile: player_tiles[seat][player_tiles[seat].length - 1],
                liqi: false,
                ming: [],
                point_rong: 32000,
                point_sum: 32000,
                point_zimo_qin: 16000,
                point_zimo_xian: 8000,
                qinjia: false,
                seat: seat,
                title_id: 11,
                yiman: false,
                zimo: true,
            };
        };
        begin_tiles[0] = '1112340678999m7z';
        begin_tiles[1] = '1112340678999p';
        begin_tiles[2] = '5555555555555z';
        begin_tiles[3] = '1112340678999s';
        randomPaishan('75z', '7z....');
        roundBegin();
        qiepai();
        normalMoqie();
        zimoHu();

        setRound(2, 0, 0);

        // 第3局
        huleOnePlayer = seat => {
            let fans = [
                {val: 2, id: 15}, // 混全带幺九
                {val: 2, id: 16}, // 一气通贯
                {val: 2, id: 17}, // 三色同顺
                {val: 2, id: 19}, // 三色同刻
                {val: 2, id: 20}, // 三杠子
                {val: 2, id: 21}, // 对对和
                {val: 2, id: 22}, // 三暗刻
                {val: 2, id: 23}, // 小三元
                {val: 2, id: 24}, // 混老头
                {val: 3, id: 26}, // 纯全带幺九
                {val: 3, id: 27}, // 混一色
                {val: 6, id: 29}, // 清一色
            ];
            player_tiles[seat].pop();
            delta_scores = [-16000, -8000, 32000, -8000];
            return {
                count: 64,
                doras: [doras[0]],
                li_doras: [],
                fans: fans,
                fu: 170,
                hand: player_tiles[seat].slice(),
                hu_tile: player_tiles[seat][player_tiles[seat].length - 1],
                liqi: false,
                ming: [],
                point_rong: 32000,
                point_sum: 32000,
                point_zimo_qin: 16000,
                point_zimo_xian: 8000,
                qinjia: false,
                seat: seat,
                title_id: 11,
                yiman: false,
                zimo: true,
            };
        };
        begin_tiles[0] = '1112340678999m7z';
        begin_tiles[1] = '1112340678999p';
        begin_tiles[2] = '5555555555555z';
        begin_tiles[3] = '1112340678999s';
        randomPaishan('75z', '7z....');
        roundBegin();
        qiepai();
        normalMoqie();
        zimoHu();

        setRound(2, 0, 0);

        // 第4局
        huleOnePlayer = seat => {
            let fans = [
                {val: 1, id: 31}, // 宝牌
                {val: 2, id: 31}, // 宝牌
                {val: 3, id: 31}, // 宝牌
                {val: 4, id: 31}, // 宝牌
                {val: 5, id: 32}, // 红宝牌
                {val: 6, id: 32}, // 红宝牌
                {val: 7, id: 32}, // 红宝牌
                {val: 8, id: 32}, // 红宝牌
                {val: 9, id: 34}, // 拔北宝牌
                {val: 10, id: 34}, // 拔北宝牌
                {val: 11, id: 34}, // 拔北宝牌
                {val: 12, id: 34}, // 拔北宝牌
                {val: 13, id: 33}, // 里宝牌
                {val: 14, id: 33}, // 里宝牌
                {val: 5, id: 9100}, // 流局满贯
            ];
            if (type)
                fans.splice(13, 1);
            player_tiles[seat].pop();
            delta_scores = [-16000, -8000, 32000, -8000];
            return {
                count: 64,
                doras: [doras[0]],
                li_doras: [],
                fans: fans,
                fu: 170,
                hand: player_tiles[seat].slice(),
                hu_tile: player_tiles[seat][player_tiles[seat].length - 1],
                liqi: false,
                ming: [],
                point_rong: 32000,
                point_sum: 32000,
                point_zimo_qin: 16000,
                point_zimo_xian: 8000,
                qinjia: false,
                seat: seat,
                title_id: 11,
                yiman: false,
                zimo: true,
            };
        };
        begin_tiles[0] = '1112340678999m7z';
        begin_tiles[1] = '1112340678999p';
        begin_tiles[2] = '5555555555555z';
        begin_tiles[3] = '1112340678999s';
        randomPaishan('75z', '7z....');
        roundBegin();
        qiepai();
        normalMoqie();
        zimoHu();

        setRound(2, 0, 0);

        // 第5局
        huleOnePlayer = seat => {
            let fans = [
                {val: 1, id: 35}, // 天和
                {val: 1, id: 36}, // 地和
                {val: 1, id: 37}, // 大三元
                {val: 1, id: 38}, // 四暗刻
                {val: 1, id: 39}, // 字一色
                {val: 1, id: 40}, // 绿一色
                {val: 1, id: 41}, // 清老头
                {val: 1, id: 42}, // 国士无双
            ];
            player_tiles[seat].pop();
            delta_scores = [-96000, -48000, 192000, -48000];
            return {
                count: 6,
                doras: [doras[0]],
                li_doras: [],
                fans: fans,
                fu: 170,
                hand: player_tiles[seat].slice(),
                hu_tile: player_tiles[seat][player_tiles[seat].length - 1],
                liqi: false,
                ming: [],
                point_rong: 192000,
                point_sum: 192000,
                point_zimo_qin: 96000,
                point_zimo_xian: 48000,
                qinjia: false,
                seat: seat,
                title_id: 10,
                yiman: true,
                zimo: true,
            };
        };
        begin_tiles[0] = '1112340678999m7z';
        begin_tiles[1] = '1112340678999p';
        begin_tiles[2] = '5555555555555z';
        begin_tiles[3] = '1112340678999s';
        randomPaishan('75z', '7z....');
        roundBegin();
        qiepai();
        normalMoqie();
        zimoHu();

        setRound(2, 0, 0);

        // 第6局
        huleOnePlayer = seat => {
            let fans = [
                {val: 1, id: 42}, // 国士无双
                {val: 1, id: 43}, // 小四喜
                {val: 1, id: 44}, // 四杠子
                {val: 1, id: 45}, // 九莲宝灯
                {val: 2, id: 47}, // 纯正九莲宝灯
                {val: 2, id: 48}, // 四暗刻单骑
                {val: 2, id: 49}, // 国士无双十三面
                {val: 2, id: 50}, // 大四喜
            ];
            if (type)
                fans.shift();
            player_tiles[seat].pop();
            delta_scores = [-96000, -48000, 192000, -48000];
            return {
                count: 6,
                doras: [doras[0]],
                li_doras: [],
                fans: fans,
                fu: 170,
                hand: player_tiles[seat].slice(),
                hu_tile: player_tiles[seat][player_tiles[seat].length - 1],
                liqi: false,
                ming: [],
                point_rong: 192000,
                point_sum: 192000,
                point_zimo_qin: 96000,
                point_zimo_xian: 48000,
                qinjia: false,
                seat: seat,
                title_id: 10,
                yiman: true,
                zimo: true,
            };
        };
        begin_tiles[0] = '1112340678999m7z';
        begin_tiles[1] = '1112340678999p';
        begin_tiles[2] = '5555555555555z';
        begin_tiles[3] = '1112340678999s';
        randomPaishan('75z', '7z....');
        roundBegin();
        qiepai();
        normalMoqie();
        zimoHu();

        setRound(2, 0, 0);

        // 第7局
        huleOnePlayer = seat => {
            let fans = [
                {val: 6, id: 1015}, // 清龙七对
                {val: 6, id: 1016}, // 十八罗汉
                {val: 6, id: 1017}, // 清十八罗汉
                {val: 4, id: 1010}, // 清对
                {val: 4, id: 1011}, // 将对
                {val: 4, id: 1012}, // 龙七对
                {val: 5, id: 1013}, // 清七对
                {val: 5, id: 1020}, // 清幺九
                {val: 5, id: 1014}, // 清金钩钓
                {val: 3, id: 1008}, // 带幺九
                {val: 3, id: 1009}, // 金钩钓
                {val: 1, id: 1000}, // 根
                {val: 1, id: 1002}, // 杠上炮
            ];
            player_tiles[seat].pop();
            delta_scores = [-16000, -8000, 32000, -8000];
            return {
                count: 64,
                doras: [doras[0]],
                li_doras: [],
                fans: fans,
                fu: 170,
                hand: player_tiles[seat].slice(),
                hu_tile: player_tiles[seat][player_tiles[seat].length - 1],
                liqi: false,
                ming: [],
                point_rong: 32000,
                point_sum: 32000,
                point_zimo_qin: 16000,
                point_zimo_xian: 8000,
                qinjia: false,
                seat: seat,
                title_id: 11,
                yiman: false,
                zimo: true,
            };
        };
        begin_tiles[0] = '1112340678999m7z';
        begin_tiles[1] = '1112340678999p';
        begin_tiles[2] = '5555555555555z';
        begin_tiles[3] = '1112340678999s';
        randomPaishan('75z', '7z....');
        roundBegin();
        qiepai();
        normalMoqie();
        zimoHu();

        huleOnePlayer = origin_huleOnePlayer;
    }
};

/**
 * 一姬专用的报菜名牌局
 */
export const reportYaku_yiji = (): void => {
    if (config.mode.detail_rule._report_yakus) {
        let origin_huleOnePlayer = huleOnePlayer;

        // 第1局
        huleOnePlayer = seat => {
            let fans = [
                {val: 0, id: 9500}, // 自我介绍
                {val: 0, id: 9200},
                {val: 0, id: 9201},
                {val: 0, id: 9202},
                {val: 0, id: 9203},
                {val: 0, id: 9204},
                {val: 0, id: 9205},
                {val: 0, id: 9511}, // 送礼物普通
                {val: 0, id: 9206},
                {val: 0, id: 9603}, // 役满听牌
                {val: 0, id: 9207},
                {val: 1, id: 2},
                {val: 2, id: 18},
                {val: 1, id: 30},
                {val: 1, id: 3},
            ];
            player_tiles[seat].pop();
            delta_scores = [-16000, -8000, 32000, -8000];
            return {
                count: 64,
                doras: [doras[0]],
                li_doras: [],
                fans: fans,
                fu: 170,
                hand: player_tiles[seat].slice(),
                hu_tile: player_tiles[seat][player_tiles[seat].length - 1],
                liqi: false,
                ming: [],
                point_rong: 32000,
                point_sum: 32000,
                point_zimo_qin: 16000,
                point_zimo_xian: 8000,
                qinjia: false,
                seat: seat,
                title_id: 11,
                yiman: false,
                zimo: true,
            };
        };
        begin_tiles[0] = '1112340678999m7z';
        begin_tiles[1] = '1112340678999p';
        begin_tiles[2] = '5555555555555z';
        begin_tiles[3] = '1112340678999s';
        randomPaishan('75z', '7z....');
        roundBegin();
        qiepai();
        normalMoqie();
        zimoHu();

        setRound(2, 0, 0);

        // 第2局
        huleOnePlayer = seat => {
            let fans = [
                {val: 1, id: 4},
                {val: 1, id: 5},
                {val: 1, id: 6},
                {val: 1, id: 1},
                {val: 1, id: 14},
                {val: 1, id: 13},
                {val: 3, id: 28},
                {val: 2, id: 25},
                {val: 1, id: 7},
                {val: 1, id: 8},
                {val: 1, id: 9},
                {val: 1, id: 9101},
                {val: 1, id: 9102},
                {val: 1, id: 9103},
                {val: 1, id: 9104},
            ];
            player_tiles[seat].pop();
            delta_scores = [-16000, -8000, 32000, -8000];
            return {
                count: 64,
                doras: [doras[0]],
                li_doras: [],
                fans: fans,
                fu: 170,
                hand: player_tiles[seat].slice(),
                hu_tile: player_tiles[seat][player_tiles[seat].length - 1],
                liqi: false,
                ming: [],
                point_rong: 32000,
                point_sum: 32000,
                point_zimo_qin: 16000,
                point_zimo_xian: 8000,
                qinjia: false,
                seat: seat,
                title_id: 11,
                yiman: false,
                zimo: true,
            };
        };
        begin_tiles[0] = '1112340678999m7z';
        begin_tiles[1] = '1112340678999p';
        begin_tiles[2] = '5555555555555z';
        begin_tiles[3] = '1112340678999s';
        randomPaishan('75z', '7z....');
        roundBegin();
        qiepai();
        normalMoqie();
        zimoHu();

        setRound(2, 0, 0);

        // 第3局
        huleOnePlayer = seat => {
            let fans = [
                {val: 1, id: 10},
                {val: 1, id: 11},
                {val: 1, id: 9107},
                {val: 1, id: 9108},
                {val: 1, id: 12},
                {val: 2, id: 15},
                {val: 2, id: 16},
                {val: 2, id: 17},
                {val: 2, id: 19},
                {val: 2, id: 20},
                {val: 2, id: 21},
                {val: 2, id: 22},
                {val: 2, id: 23},
                {val: 2, id: 24},
                {val: 3, id: 26},
            ];
            player_tiles[seat].pop();
            delta_scores = [-16000, -8000, 32000, -8000];
            return {
                count: 64,
                doras: [doras[0]],
                li_doras: [],
                fans: fans,
                fu: 170,
                hand: player_tiles[seat].slice(),
                hu_tile: player_tiles[seat][player_tiles[seat].length - 1],
                liqi: false,
                ming: [],
                point_rong: 32000,
                point_sum: 32000,
                point_zimo_qin: 16000,
                point_zimo_xian: 8000,
                qinjia: false,
                seat: seat,
                title_id: 11,
                yiman: false,
                zimo: true,
            };
        };
        begin_tiles[0] = '1112340678999m7z';
        begin_tiles[1] = '1112340678999p';
        begin_tiles[2] = '5555555555555z';
        begin_tiles[3] = '1112340678999s';
        randomPaishan('75z', '7z....');
        roundBegin();
        qiepai();
        normalMoqie();
        zimoHu();

        setRound(2, 0, 0);

        // 第4局
        huleOnePlayer = seat => {
            let fans = [
                {val: 3, id: 27},
                {val: 6, id: 29},
                {val: 1, id: 31},
                {val: 2, id: 31},
                {val: 3, id: 31},
                {val: 4, id: 31},
                {val: 5, id: 32},
                {val: 6, id: 32},
                {val: 7, id: 32},
                {val: 8, id: 32},
                {val: 9, id: 34},
                {val: 10, id: 34},
                {val: 11, id: 34},
                {val: 12, id: 34},
                {val: 13, id: 33},
            ];
            player_tiles[seat].pop();
            delta_scores = [-16000, -8000, 32000, -8000];
            return {
                count: 64,
                doras: [doras[0]],
                li_doras: [],
                fans: fans,
                fu: 170,
                hand: player_tiles[seat].slice(),
                hu_tile: player_tiles[seat][player_tiles[seat].length - 1],
                liqi: false,
                ming: [],
                point_rong: 32000,
                point_sum: 32000,
                point_zimo_qin: 16000,
                point_zimo_xian: 8000,
                qinjia: false,
                seat: seat,
                title_id: 11,
                yiman: false,
                zimo: true,
            };
        };
        begin_tiles[0] = '1112340678999m7z';
        begin_tiles[1] = '1112340678999p';
        begin_tiles[2] = '5555555555555z';
        begin_tiles[3] = '1112340678999s';
        randomPaishan('75z', '7z....');
        roundBegin();
        qiepai();
        normalMoqie();
        zimoHu();

        setRound(2, 0, 0);

        // 第5局
        huleOnePlayer = seat => {
            let fans = [
                {val: 0, id: 9400}, // 四风连打
                {val: 0, id: 9401}, // 四杠散了
                {val: 0, id: 9402}, // 四家立直
                {val: 0, id: 9403}, // 九种九牌
                {val: 0, id: 9100}, // 流局满贯
                {val: 0, id: 9300},
                {val: 0, id: 9301},
                {val: 0, id: 9302},
                {val: 0, id: 9303},
                {val: 0, id: 9304},
                {val: 0, id: 9305},
                {val: 0, id: 9306},
                {val: 0, id: 9307},
                {val: 0, id: 9308},
                {val: 0, id: 9309},
                // {val: 0, id: 9502}, // 登录语音满羁绊
            ];
            player_tiles[seat].pop();
            delta_scores = [-16000, -8000, 32000, -8000];
            return {
                count: 64,
                doras: [doras[0]],
                li_doras: [],
                fans: fans,
                fu: 170,
                hand: player_tiles[seat].slice(),
                hu_tile: player_tiles[seat][player_tiles[seat].length - 1],
                liqi: false,
                ming: [],
                point_rong: 32000,
                point_sum: 32000,
                point_zimo_qin: 16000,
                point_zimo_xian: 8000,
                qinjia: false,
                seat: seat,
                title_id: 11,
                yiman: false,
                zimo: true,
            };
        };
        begin_tiles[0] = '1112340678999m7z';
        begin_tiles[1] = '1112340678999p';
        begin_tiles[2] = '5555555555555z';
        begin_tiles[3] = '1112340678999s';
        randomPaishan('75z', '7z....');
        roundBegin();
        qiepai();
        normalMoqie();
        zimoHu();

        setRound(2, 0, 0);

        // 第6局
        huleOnePlayer = seat => {
            let fans = [
                {val: 1, id: 35},
                {val: 1, id: 36},
                {val: 1, id: 37},
                {val: 1, id: 38},
                {val: 1, id: 39},
                {val: 1, id: 40},
                {val: 1, id: 41},
                {val: 1, id: 42},
            ];
            player_tiles[seat].pop();
            delta_scores = [-96000, -48000, 192000, -48000];
            return {
                count: 6,
                doras: [doras[0]],
                li_doras: [],
                fans: fans,
                fu: 170,
                hand: player_tiles[seat].slice(),
                hu_tile: player_tiles[seat][player_tiles[seat].length - 1],
                liqi: false,
                ming: [],
                point_rong: 192000,
                point_sum: 192000,
                point_zimo_qin: 96000,
                point_zimo_xian: 48000,
                qinjia: false,
                seat: seat,
                title_id: 10,
                yiman: true,
                zimo: true,
            };
        };
        begin_tiles[0] = '1112340678999m7z';
        begin_tiles[1] = '1112340678999p';
        begin_tiles[2] = '5555555555555z';
        begin_tiles[3] = '1112340678999s';
        randomPaishan('75z', '7z....');
        roundBegin();
        qiepai();
        normalMoqie();
        zimoHu();

        setRound(2, 0, 0);

        // 第7局
        huleOnePlayer = seat => {
            let fans = [
                {val: 1, id: 43},
                {val: 1, id: 44},
                {val: 1, id: 45},
                {val: 2, id: 47},
                {val: 2, id: 48},
                {val: 2, id: 49},
                {val: 2, id: 50},
                {val: 0, id: 9209},
            ];
            player_tiles[seat].pop();
            delta_scores = [-96000, -48000, 192000, -48000];
            return {
                count: 6,
                doras: [doras[0]],
                li_doras: [],
                fans: fans,
                fu: 170,
                hand: player_tiles[seat].slice(),
                hu_tile: player_tiles[seat][player_tiles[seat].length - 1],
                liqi: false,
                ming: [],
                point_rong: 192000,
                point_sum: 192000,
                point_zimo_qin: 96000,
                point_zimo_xian: 48000,
                qinjia: false,
                seat: seat,
                title_id: 10,
                yiman: true,
                zimo: true,
            };
        };
        begin_tiles[0] = '1112340678999m7z';
        begin_tiles[1] = '1112340678999p';
        begin_tiles[2] = '5555555555555z';
        begin_tiles[3] = '1112340678999s';
        randomPaishan('75z', '7z....');
        roundBegin();
        qiepai();
        normalMoqie();
        zimoHu();

        setRound(2, 0, 0);

        // 第8局
        huleOnePlayer = seat => {
            let fans = [
                {val: 6, id: 1015}, // 清龙七对
                {val: 6, id: 1016}, // 十八罗汉
                {val: 6, id: 1017}, // 清十八罗汉
                {val: 4, id: 1010}, // 清对
                {val: 4, id: 1011}, // 将对
                {val: 4, id: 1012}, // 龙七对
                {val: 5, id: 1013}, // 清七对
                {val: 5, id: 1020}, // 清幺九
                {val: 5, id: 1014}, // 清金钩钓
                {val: 3, id: 1008}, // 带幺九
                {val: 3, id: 1009}, // 金钩钓
                {val: 1, id: 1000}, // 根
                {val: 1, id: 1002}, // 杠上炮
                {val: 0, id: 9311}, // 听牌
                {val: 0, id: 9312}, // 未听牌
            ];
            player_tiles[seat].pop();
            delta_scores = [-16000, -8000, 32000, -8000];
            return {
                count: 64,
                doras: [doras[0]],
                li_doras: [],
                fans: fans,
                fu: 170,
                hand: player_tiles[seat].slice(),
                hu_tile: player_tiles[seat][player_tiles[seat].length - 1],
                liqi: false,
                ming: [],
                point_rong: 32000,
                point_sum: 32000,
                point_zimo_qin: 16000,
                point_zimo_xian: 8000,
                qinjia: false,
                seat: seat,
                title_id: 11,
                yiman: false,
                zimo: true,
            };
        };
        begin_tiles[0] = '1112340678999m7z';
        begin_tiles[1] = '1112340678999p';
        begin_tiles[2] = '5555555555555z';
        begin_tiles[3] = '1112340678999s';
        randomPaishan('75z', '7z....');
        roundBegin();
        qiepai();
        normalMoqie();
        zimoHu();

        setRound(2, 0, 0);

        // 第9局
        huleOnePlayer = seat => {
            let fans = [
                {val: 0, id: 9500},
                {val: 0, id: 9501},
                {val: 0, id: 9502},
                {val: 0, id: 9503},
                {val: 0, id: 9504},
                {val: 0, id: 9505},
                {val: 0, id: 9506},
                {val: 0, id: 9507},
                {val: 0, id: 9508},
                {val: 0, id: 9509},
                {val: 0, id: 9510},
                {val: 0, id: 9511},
                {val: 0, id: 9512},
                {val: 0, id: 9513},
                {val: 0, id: 9514},
            ];
            player_tiles[seat].pop();
            delta_scores = [0, 0, 0, 0];
            return {
                count: 0,
                doras: [doras[0]],
                li_doras: [],
                fans: fans,
                fu: 0,
                hand: player_tiles[seat].slice(),
                hu_tile: player_tiles[seat][player_tiles[seat].length - 1],
                liqi: false,
                ming: [],
                point_rong: 1000,
                point_sum: 1000,
                point_zimo_qin: 1000,
                point_zimo_xian: 1000,
                qinjia: false,
                seat: seat,
                title_id: 0,
                yiman: false,
                zimo: true,
            };
        };
        begin_tiles[0] = '1112340678999m7z';
        begin_tiles[1] = '1112340678999p';
        begin_tiles[2] = '5555555555555z';
        begin_tiles[3] = '1112340678999s';
        randomPaishan('75z', '7z....');
        roundBegin();
        qiepai();
        normalMoqie();
        zimoHu();

        setRound(2, 0, 0);

        // 第10局
        huleOnePlayer = seat => {
            let fans = [
                {val: 0, id: 9515},
                {val: 0, id: 9516},
                {val: 0, id: 9517},
                {val: 0, id: 9518},
                {val: 0, id: 9519},
                {val: 0, id: 9520},
                {val: 0, id: 9600},
                {val: 0, id: 9601},
                {val: 0, id: 9602},
                {val: 0, id: 9603},
                {val: 0, id: 9604},
            ];
            player_tiles[seat].pop();
            delta_scores = [0, 0, 0, 0];
            return {
                count: 0,
                doras: [doras[0]],
                li_doras: [],
                fans: fans,
                fu: 0,
                hand: player_tiles[seat].slice(),
                hu_tile: player_tiles[seat][player_tiles[seat].length - 1],
                liqi: false,
                ming: [],
                point_rong: 1000,
                point_sum: 1000,
                point_zimo_qin: 1000,
                point_zimo_xian: 1000,
                qinjia: false,
                seat: seat,
                title_id: 0,
                yiman: false,
                zimo: true,
            };
        };
        begin_tiles[0] = '1112340678999m7z';
        begin_tiles[1] = '1112340678999p';
        begin_tiles[2] = '5555555555555z';
        begin_tiles[3] = '1112340678999s';
        randomPaishan('75z', '7z....');
        roundBegin();
        qiepai();
        normalMoqie();
        zimoHu();

        huleOnePlayer = origin_huleOnePlayer;
    }
};
