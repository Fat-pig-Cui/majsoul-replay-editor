/**
 * @file: sample.ts - 一些定制化的牌谱, 包括示例牌局和报菜名牌局
 * @author: Fat-pig-Cui
 * @email: chubbypig@qq.com
 * @github: https://github.com/Fat-pig-Cui/majsoul-replay-editor
 */

import {all_data, actions, begin_tiles, base_info} from "./data";
import {mopai, qiepai, randomPaishan, roundEnd, gameBegin, hupai, huangpai, liuju, mingpai, zimingpai} from "./core";
import {normalMoqie, moqieLiqi} from "./simplifyFunction";
import {is_report_yakus} from "./misc";
import {fixPaishan, isEqualTile, separate} from "./exportedUtils";
import {Constants} from "./constants";
import {randomCmp} from "./utils";

/**
 * 示例牌局: 东一局庄家大七星w立, 南家追立放铳
 */
export const demoGame = (): void => {
    gameBegin();
    begin_tiles[0] = '11223344556777z';
    if (base_info.player_cnt === 2) {
        begin_tiles[1] = '1112340678999m';
        randomPaishan('6z', '55z............');
    } else if (base_info.player_cnt === 3) {
        begin_tiles[1] = '1112340678999p';
        begin_tiles[2] = '1112340678999s';
        randomPaishan('6z', '55z........');
    } else {
        begin_tiles[1] = '1112340678999m';
        begin_tiles[2] = '1112340678999p';
        begin_tiles[3] = '1112340678999s';
        randomPaishan('6z', '55z....');
    }
    qiepai(true);
    moqieLiqi();
    hupai();
};

/**
 * 用户修改 json 数据
 * - tiles0-3: 各家在何切的巡目的手牌(若是第一类何切, 则不包含刚摸的牌, 若未知则置为空)
 * - lst_mopai: 第一类何切中何切巡目刚摸的牌, 若是第二类何切, 则要置为空
 * - dora: 宝牌指示牌, 从左到右
 * - li_dora: 里宝牌指示牌, 从左到右, 长度要和 dora 一致, 若未知则置为空
 * - paihe0-3: 各家的牌河, 牌不要缩写, 包含被鸣走的牌, 牌之间空格不影响
 *             牌有后缀g表示摸切, 无g则为手切
 *             有后缀r表示立直, 无r表示非立直
 *             g和r顺序不分先后
 * - fulu0-3: 各家的副露, 按时间顺序从左到右
 *            '_'表示下一张牌是倾倒的鸣的其他家的牌, '^'表示加杠, 先'_'后'^'
 *            大明杠对家的牌的'_'放在第二个数字前
 *            暗杠的巡目在轮到该暗杠副露时的下一个摸牌巡, 加杠的巡目在碰对应副露之后下一个摸牌巡
 * - first_op: 庄家第一个操作, 0: 切牌(含立直), 1: 暗杠/拔北, 2. 和牌(天和), 默认为0, 若是第二类何切则无论如何都置为0
 * - end_mode: 结束方式, 0: 荒牌流局, 1: 和牌, 2: 途中流局(若不符合途中流局条件则会报错), 默认为1
 * - hu_seat: 和牌玩家的所有 seat, 只在 end_mode 是 1 的时候有效, 若为空则自动判断谁可以和牌(若无人能和牌会报错)
 */
export const setPlayGame = (json: RoundJson): void => {
    gameBegin();
    const cnt: TileNum = {};
    const remain_tiles: Tile[] = [];
    (function () {
        for (const tile of Constants.TILE_NO_AKA)
            cnt[tile] = 4;
        cnt['5m'] = cnt['5p'] = cnt['5s'] = 3;
        cnt['0m'] = cnt['0p'] = cnt['0s'] = 1;
        if (base_info.player_cnt === 2) {
            for (const tile of Constants.PIN_MID_TILE)
                cnt[tile] = 0;
            for (const tile of Constants.SOU_MID_TILE)
                cnt[tile] = 0;
            cnt['0p'] = cnt['0s'] = 0;
        } else if (base_info.player_cnt === 3) {
            for (const tile of Constants.MAN_MID_TILE)
                cnt[tile] = 0;
            cnt['0m'] = 0;
        }
    })();
    // 玩家的副露信息
    const fulus_info: { type: string, own_tiles: Tile[], ming_tile?: Tile, from: number }[][] = [[], [], [], []];
    // 玩家的切牌信息
    const new_discard_tiles: { tile: Tile, moqie: boolean, is_liqi: boolean, }[][] = [[], [], [], []];
    // 玩家的广义摸牌(起手+手切+副露中自己的牌)
    const new_deal_tiles: string[][] = [[], [], [], []];
    // 预处理
    (function () {
        // 解析 fulu 至 fulus_info
        const new_fulus = [json.fulu0, json.fulu1, json.fulu2, json.fulu3];
        for (let i = 0; i < base_info.player_cnt; i++) {
            for (const k in new_fulus[i]) {
                const tile_type = new_fulus[i][k][new_fulus[i][k].length - 1];
                if (new_fulus[i][k].includes('_')) {
                    let index = new_fulus[i][k].indexOf('_');
                    const ming_tile = new_fulus[i][k][index + 1] + tile_type as Tile;
                    const own_tiles = [];
                    for (let j = 0; j < new_fulus[i][k].length - 1; j++)
                        if (new_fulus[i][k][j] !== '_' && new_fulus[i][k][j] !== '^')
                            own_tiles.push(new_fulus[i][k][j] + tile_type);
                        else
                            j++;
                    const is_jiagang = new_fulus[i][k].includes('^');
                    let type = '';
                    if (!isEqualTile(own_tiles[0], own_tiles[1]))
                        type = 'chi';
                    else if (is_jiagang)
                        type = 'jiagang';
                    else if (own_tiles.length === 2)
                        type = 'peng';
                    else if (own_tiles.length === 3)
                        type = 'minggang';

                    let tmp_fulu = new_fulus[i][k];
                    if (is_jiagang)
                        tmp_fulu = tmp_fulu.substring(0, tmp_fulu.indexOf('^')) + tmp_fulu.substring(tmp_fulu.indexOf('^') + 2);

                    if (type === 'minggang' && index === 3)
                        index = 2;
                    let from = (i + 3 - index) % base_info.player_cnt;
                    if (type === 'jiagang') { // 加杠多一个碰, 方便算法实现, 并且加杠的 from 优化
                        fulus_info[i].push({
                            type: 'peng',
                            own_tiles: own_tiles,
                            ming_tile: ming_tile,
                            from: from,
                        });
                        from = i;
                    }
                    fulus_info[i].push({
                        type: type,
                        own_tiles: own_tiles,
                        ming_tile: type !== 'jiagang' ? ming_tile : new_fulus[i][k][new_fulus[i][k].indexOf('_') + 1] + tile_type as Tile,
                        from: from,
                    });
                } else {
                    const own_tiles = [];
                    for (let j = 0; j < new_fulus[i][k].length - 1; j++)
                        own_tiles.push(new_fulus[i][k][j] + tile_type);
                    fulus_info[i].push({
                        type: 'angang',
                        own_tiles: own_tiles,
                        from: i,
                    });
                }
            }
        }
        // 解析 paihe 至 new_discard_tiles
        const tmp_qiepai_set = [json.paihe0, json.paihe1, json.paihe2, json.paihe3];
        const new_qiepai_set: string[][] = [[], [], [], []];
        for (let i = 0; i < base_info.player_cnt; i++) {
            new_qiepai_set[i] = separate_tiles(tmp_qiepai_set[i]);
            for (const j in new_qiepai_set[i])
                new_discard_tiles[i].push({
                    tile: new_qiepai_set[i][j].substring(0, 2) as Tile,
                    moqie: new_qiepai_set[i][j].includes('g'),
                    is_liqi: new_qiepai_set[i][j].includes('r'),
                });
        }

        // 从 fulus_info, new_discard_tiles 和 tiles0-3 解析至 new_deal_tiles
        const first_tile = new_discard_tiles[base_info.ju][0];
        if (!first_tile.moqie) {
            new_deal_tiles[base_info.ju].push(first_tile.tile);
            new_discard_tiles[base_info.ju].shift();
        }
        for (let i = 0; i < base_info.player_cnt; i++) {
            for (const tmp_fulu of fulus_info[i])
                if (tmp_fulu.type !== 'jiagang')
                    new_deal_tiles[i].push(...tmp_fulu.own_tiles);
                else
                    new_deal_tiles[i].push(tmp_fulu.ming_tile);
        }
        for (let i = 0; i < base_info.player_cnt; i++)
            for (const discard_tile of new_discard_tiles[i])
                if (!discard_tile.moqie)
                    new_deal_tiles[i].push(discard_tile.tile);
        new_discard_tiles[base_info.ju].unshift(first_tile);
        for (let i = 0; i < base_info.player_cnt; i++) {
            new_deal_tiles[i].push(...separate(json['tiles' + i]));
            for (const tile of new_deal_tiles[i])
                cnt[tile]--;
        }

        const dora = json.dora;
        const li_dora = json.li_dora.slice() as string[];
        while (li_dora.length < dora.length)
            li_dora.push('.');
        let zhishipais = '';
        for (let i = dora.length - 1; i >= 0; i--){
            zhishipais += li_dora[i] + dora[i];
            cnt[dora[i]]--;
            if (li_dora[i] !== '.')
                cnt[li_dora[i]]--;
        }
        if (base_info.player_cnt === 3)
            zhishipais += '....';

        for (const tile of Constants.TILE)
            for (let i = 0; i < cnt[tile]; i++)
                remain_tiles.push(tile);
        remain_tiles.sort(randomCmp);

        for (let i = 0; i < base_info.player_cnt; i++) {
            const num = base_info.ju === i ? Constants.QIN_TILE_NUM : Constants.XIAN_TILE_NUM;
            while (separate(begin_tiles[i]).length < num && new_deal_tiles[i].length > 0)
                begin_tiles[i] += new_deal_tiles[i].shift();
            while (separate(begin_tiles[i]).length < num && remain_tiles.length > 0)
                begin_tiles[i] += remain_tiles.pop();
        }

        randomPaishan('', zhishipais + '....');

        // paihe 经过该函数变为数组格式
        function separate_tiles(tiles: string): string[] {
            if (!tiles)
                return [];
            tiles = tiles.replace(/\s*/g, '');
            const ret: string[] = [];
            while (tiles.length > 0) {
                // 牌河中的牌有三种可能
                // 1. 长度为4, 类似 1pgr, 即摸切1p&立直
                // 2. 长度为3, 类似 1pr 和 1pg, 摸切1p, 或手切1p立直
                // 3. 长度为2, 如 1p, 即手切1p
                if (tiles.length > 3 && (tiles[2] === 'g' && tiles[3] === 'r' || tiles[2] === 'r' && tiles[3] === 'g')) {
                    ret.push(tiles.substring(0, 4));
                    tiles = tiles.substring(4);
                } else if (tiles.length > 2 && (tiles[2] === 'g' || tiles[2] === 'r')) {
                    ret.push(tiles.substring(0, 3));
                    tiles = tiles.substring(3);
                } else {
                    ret.push(tiles.substring(0, 2));
                    tiles = tiles.substring(2);
                }
            }
            return ret;
        }
    })();

    let seat = base_info.ju;
    let nxt_step = json.first_op === 1 ? 'angang' : json.first_op === 2 ? 'hupai/liuju' : 'qiepai';
    while (true) {
        switch (nxt_step) {
            case 'mopai':
                new_mopai();
                break;
            case 'qiepai':
                new_qiepai();
                break;
            case 'chi':
            case 'peng':
            case 'minggang':
                new_mingpai();
                break;
            case 'angang':
            case 'jiagang':
                new_zimingpai();
                break;
            default:
                break;
        }
        if (nxt_step === 'hupai/liuju')
            break;

        function new_mopai(): void {
            if (new_discard_tiles[seat].length <= 0) {
                nxt_step = 'hupai/liuju';
                return;
            }

            if (fulus_info[seat].length > 0 && (fulus_info[seat][0].type === 'angang' || fulus_info[seat][0].type === 'jiagang'))
                nxt_step = fulus_info[seat][0].type;
            else
                nxt_step = 'qiepai';

            let tile = new_discard_tiles[seat][0].tile;
            if (!new_discard_tiles[seat][0].moqie || nxt_step === 'angang') {
                if (new_deal_tiles[seat].length === 0)
                    tile = remain_tiles.pop();
                else
                    tile = new_deal_tiles[seat].shift() as Tile;
            }

            mopai(seat, tile);
        }

        // 先看其他家谁可以鸣主视角的牌, 再看主视角自己切什么牌
        function new_qiepai(): void {
            const tile_info = new_discard_tiles[seat].shift();
            const para_tile = tile_info.moqie ? undefined : tile_info.tile;
            const tile = tile_info.tile;

            qiepai(seat, para_tile, tile_info.is_liqi);

            // 明杠, 碰
            const op = ['minggang', 'peng'];
            for (const j in op)
                for (let i = seat + 1; i < seat + base_info.player_cnt; i++) {
                    const tmp_seat = i % base_info.player_cnt;
                    const tmp_fulu = fulus_info[tmp_seat][0];
                    if (tmp_fulu && tmp_fulu.type === op[j] && tmp_fulu.from === seat && isEqualTile(tmp_fulu.ming_tile, tile)) {
                        nxt_step = op[j];
                        seat = tmp_seat as Seat;
                        return;
                    }
                }

            const tmp_seat = (seat + 1) % base_info.player_cnt, tmp_fulu = fulus_info[tmp_seat][0];
            if (tmp_fulu && tmp_fulu.type === 'chi' && tmp_fulu.from === seat && isEqualTile(tmp_fulu.ming_tile, tile)) {
                nxt_step = 'chi';
                seat = tmp_seat as Seat;
                return;
            }

            nxt_step = 'mopai';
            seat = (seat + 1) % base_info.player_cnt;
        }

        function new_mingpai(): void {
            const tmp_fulu = fulus_info[seat].shift();

            mingpai(seat, tmp_fulu.own_tiles.join(''));

            if (tmp_fulu.type === 'minggang')
                nxt_step = 'mopai';
            else
                nxt_step = 'qiepai';
        }

        function new_zimingpai(): void {
            const tmp_fulu = fulus_info[seat].shift();

            zimingpai(seat, tmp_fulu.own_tiles[0], tmp_fulu.type);

            nxt_step = 'mopai';
        }
    }
    if (json.lst_mopai)
        mopai(json.lst_mopai);

    if (json.end_mode === 1) {
        if (json.hu_seat.length === 0)
            hupai();
        else
            hupai(json.hu_seat);
    } else if (json.end_mode === 2)
        liuju();
    else
        huangpai();

    fixPaishan(json.dora.length, json.li_dora.length);
};

/**
 * 用于报菜名的示例牌局
 */
export const reportYaku = (): void => {
    if (is_report_yakus())
        for (let i = 0; i < 2; i++)
            reportGame();
};

/**
 * 一姬专用的报菜名牌局
 */
export const reportYaku_yiji = (): void => {
    if (is_report_yakus())
        for (let i = 0; i < 10; i++)
            reportGame(true);
};

const generateHuleInfo = (index: number): Action => {
    const all_fans = [
        [
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
            {val: 5, id: 9100}, // 流局满贯
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
        ], [
            {val: 1, id: 35}, // 天和
            {val: 1, id: 36}, // 地和
            {val: 1, id: 37}, // 大三元
            {val: 1, id: 38}, // 四暗刻
            {val: 1, id: 39}, // 字一色
            {val: 1, id: 40}, // 绿一色
            {val: 1, id: 41}, // 清老头
            {val: 1, id: 42}, // 国士无双
            {val: 1, id: 43}, // 小四喜
            {val: 1, id: 44}, // 四杠子
            {val: 1, id: 45}, // 九莲宝灯
            {val: 2, id: 47}, // 纯正九莲宝灯
            {val: 2, id: 48}, // 四暗刻单骑
            {val: 2, id: 49}, // 国士无双十三面
            {val: 2, id: 50}, // 大四喜
        ]];
    return {
        "name": "RecordHule",
        "data": {
            "hules": [{
                "count": 64, // 207
                "doras": ["7z"],
                "li_doras": [],
                "fans": all_fans[index],
                "fu": 170,
                "hand": ["5z", "5z", "5z", "5z", "5z", "5z", "5z", "5z", "5z", "5z", "5z", "5z", "5z"],
                "hu_tile": "5z",
                "liqi": false,
                "ming": [],
                "point_rong": index === 1 ? 192000 : 32000,
                "point_sum": index === 1 ? 192000 : 32000,
                "point_zimo_qin": index === 1 ? 96000 : 16000,
                "point_zimo_xian": index === 1 ? 48000 : 8000,
                "qinjia": false,
                "seat": 2,
                "title_id": index === 1 ? 10 : 11,
                "yiman": index === 1,
                "zimo": true
            }],
            "old_scores": [300000, 300000, 300000, 300000],
            "delta_scores": [0, 0, 0, 0],
            "scores": [300000, 300000, 300000, 300000],
            "baopai": 0
        }
    };
};

const generateHuleInfo_yiji = (index: number): Action => {
    const all_fans = [
        [
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
        ], [
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
        ], [
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
        ], [
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
        ], [
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
        ], [
            {val: 1, id: 35},
            {val: 1, id: 36},
            {val: 1, id: 37},
            {val: 1, id: 38},
            {val: 1, id: 39},
            {val: 1, id: 40},
            {val: 1, id: 41},
            {val: 1, id: 42},
        ], [
            {val: 1, id: 43},
            {val: 1, id: 44},
            {val: 1, id: 45},
            {val: 2, id: 47},
            {val: 2, id: 48},
            {val: 2, id: 49},
            {val: 2, id: 50},
            {val: 0, id: 9209},
        ], [
            {val: 6, id: 1015},
            {val: 6, id: 1016},
            {val: 6, id: 1017},
            {val: 4, id: 1010},
            {val: 4, id: 1011},
            {val: 4, id: 1012},
            {val: 5, id: 1013},
            {val: 5, id: 1020},
            {val: 5, id: 1014},
            {val: 3, id: 1008},
            {val: 3, id: 1009},
            {val: 1, id: 1000},
            {val: 1, id: 1002},
            {val: 0, id: 9311}, // 听牌
            {val: 0, id: 9312}, // 未听牌
        ], [
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
        ], [
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
        ]
    ];
    return {
        "name": "RecordHule",
        "data": {
            "hules": [{
                "count": 64,
                "doras": ["7z"],
                "li_doras": [],
                "fans": all_fans[index],
                "fu": 170,
                "hand": ["5z", "5z", "5z", "5z", "5z", "5z", "5z", "5z", "5z", "5z", "5z", "5z", "5z"],
                "hu_tile": "5z",
                "liqi": false,
                "ming": [],
                "point_rong": [5, 6].includes(index) ? 192000 : 32000,
                "point_sum": [5, 6].includes(index) ? 192000 : 32000,
                "point_zimo_qin": [5, 6].includes(index) ? 96000 : 16000,
                "point_zimo_xian": [5, 6].includes(index) ? 48000 : 8000,
                "qinjia": false,
                "seat": 2,
                "title_id": [5, 6].includes(index) ? 10 : 11,
                "yiman": [5, 6].includes(index),
                "zimo": true
            }],
            "old_scores": [300000, 300000, 300000, 300000],
            "delta_scores": [0, 0, 0, 0],
            "scores": [300000, 300000, 300000, 300000],
            "baopai": 0
        }
    };
};

const reportGame = (is_yiji: boolean = false): void => {
    begin_tiles[0] = '1112340678999m7z';
    begin_tiles[1] = '1112340678999p';
    begin_tiles[2] = '5555555555555z';
    begin_tiles[3] = '1112340678999s';
    randomPaishan('75z', '7z....');
    qiepai();
    normalMoqie();
    mopai();
    if (is_yiji)
        actions.push(generateHuleInfo_yiji(all_data.all_actions.length));
    else
        actions.push(generateHuleInfo(all_data.all_actions.length));
    roundEnd();
};
