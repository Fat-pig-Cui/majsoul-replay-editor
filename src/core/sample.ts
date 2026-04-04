/**
 * @file: sample.ts - 一些定制化的牌谱, 包括示例牌局, 根据截图自制牌谱和报菜名牌局
 * @author: Fat-pig-Cui
 * @email: chubbypig@qq.com
 * @github: https://github.com/Fat-pig-Cui/majsoul-replay-editor
 */

import {actions, all_data, base_info, begin_tiles} from "./data";
import {gameBegin, huangpai, hupai, liuju, mingpai, mopai, qiepai, randomPaishan, roundEnd, zimingpai} from "./core";
import {moqieLiqi, normalMoqie} from "./simplifyFunction";
import {isEqualTile, separate} from "./exportedUtils";
import {errRoundInfo, randomCmp} from "./utils";
import {is_report_yakus} from "./misc";
import {Constants} from "./constants";

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
 * 根据截图自制牌谱
 *
 * @param jsons - 截图中的信息, 详见 RoundJson 的定义, 或查看 products 文件夹下的"根据可见手牌和牌河生成雀魂牌谱"
 */
export const setPlayGame = (jsons: RoundJson | RoundJson[]): void => {
    if (!(jsons instanceof Array))
        jsons = [jsons];
    gameBegin();

    for (const json of jsons) {
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
        const new_fulu: NewFulu = [[], [], [], []];
        // 玩家的切牌信息
        const new_discard_tiles: NewDiscardTiles = [[], [], [], []];
        // 玩家的广义摸牌(起手+手切+副露中自己的牌)
        const new_deal_tiles: Tile[][] = [[], [], [], []];
        // 预处理
        (function () {
            // 解析 fulu 至 new_fulu
            const json_fulus: string[][] = [json.fulu0, json.fulu1, json.fulu2, json.fulu3];
            for (let i = 0; i < base_info.player_cnt; i++) {
                for (const tmp_fulu of json_fulus[i]) {
                    const tile_type: string = tmp_fulu[tmp_fulu.length - 1];
                    const own_tiles: Tile[] = [];
                    if (tmp_fulu.includes('_')) {
                        let index = tmp_fulu.indexOf('_');
                        const ming_tile = tmp_fulu[index + 1] + tile_type as Tile;
                        for (let j = 0; j < tmp_fulu.length - 1; j++)
                            if (tmp_fulu[j] !== '_' && tmp_fulu[j] !== '^')
                                own_tiles.push(tmp_fulu[j] + tile_type as Tile);
                            else
                                j++;
                        const is_jiagang: boolean = tmp_fulu.includes('^');
                        let type = '';
                        if (!isEqualTile(own_tiles[0], own_tiles[1]))
                            type = 'chi';
                        else if (is_jiagang)
                            type = 'jiagang';
                        else if (own_tiles.length === 2)
                            type = 'peng';
                        else if (own_tiles.length === 3)
                            type = 'minggang';

                        if (type === 'minggang' && index === 3)
                            index = 2;
                        let from = (i + 3 - index) % base_info.player_cnt;
                        if (type === 'jiagang') { // 加杠多一个碰, 方便算法实现, 并且加杠的 from 优化
                            new_fulu[i].push({
                                type: 'peng',
                                own_tiles: own_tiles,
                                ming_tile: ming_tile,
                                from: from,
                            });
                            from = i;
                        }
                        new_fulu[i].push({
                            type: type,
                            own_tiles: own_tiles,
                            ming_tile: type !== 'jiagang' ? ming_tile : tmp_fulu[tmp_fulu.indexOf('_') + 1] + tile_type as Tile,
                            from: from,
                        });
                    } else {
                        for (let j = 0; j < tmp_fulu.length - 1; j++)
                            own_tiles.push(tmp_fulu[j] + tile_type as Tile);
                        new_fulu[i].push({
                            type: 'angang',
                            own_tiles: own_tiles,
                            from: i,
                        });
                    }
                }
            }
            // 解析 paihe 至 new_discard_tiles
            (function () {
                const tmp_qiepai_set: string[] = [json.paihe0, json.paihe1, json.paihe2, json.paihe3];
                const new_qiepai_set: string[][] = [[], [], [], []];
                for (let i = 0; i < base_info.player_cnt; i++) {
                    new_qiepai_set[i] = separate_tiles(tmp_qiepai_set[i]);
                    for (const tile_with_suf of new_qiepai_set[i])
                        new_discard_tiles[i].push({
                            tile: tile_with_suf.substring(0, 2) as Tile,
                            moqie: tile_with_suf.includes('g'),
                            is_liqi: tile_with_suf.includes('r'),
                        });
                }
            })();

            // 从 new_fulu, new_discard_tiles 和 tiles0-3 解析至 new_deal_tiles
            const first_tile: NewTile = new_discard_tiles[base_info.ju][0];
            if (!first_tile.moqie) {
                new_deal_tiles[base_info.ju].push(first_tile.tile);
                new_discard_tiles[base_info.ju].shift();
            }
            for (let i = 0; i < base_info.player_cnt; i++) {
                for (const tmp_fulu of new_fulu[i])
                    if (tmp_fulu.type !== 'jiagang')
                        new_deal_tiles[i].push(...tmp_fulu.own_tiles);
                    else
                        new_deal_tiles[i].push(tmp_fulu.ming_tile);
            }
            for (let i = 0; i < base_info.player_cnt; i++)
                for (const discard_tile of new_discard_tiles[i]) {
                    if (!discard_tile.moqie)
                        new_deal_tiles[i].push(discard_tile.tile);
                    else
                        cnt[discard_tile.tile]--;
                }
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
            for (let i = dora.length - 1; i >= 0; i--) {
                zhishipais += li_dora[i] + dora[i];
                cnt[dora[i]]--;
                if (li_dora[i] !== '.')
                    cnt[li_dora[i]]--;
            }
            if (base_info.player_cnt === 3)
                zhishipais += '....';

            for (const tile of Constants.TILE) {
                for (let i = 0; i < cnt[tile]; i++)
                    remain_tiles.push(tile);
                if (cnt[tile] < 0)
                    console.warn(errRoundInfo() + `${4 - cnt[tile]} 个 ${tile}`);
            }
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

                if (new_fulu[seat].length > 0 && (new_fulu[seat][0].type === 'angang' || new_fulu[seat][0].type === 'jiagang'))
                    nxt_step = new_fulu[seat][0].type;
                else
                    nxt_step = 'qiepai';

                let tile: Tile = new_discard_tiles[seat][0].tile;
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
                const tile_info: NewTile = new_discard_tiles[seat].shift();
                const para_tile: Tile = tile_info.moqie ? undefined : tile_info.tile;
                const tile: Tile = tile_info.tile;

                qiepai(seat, para_tile, tile_info.is_liqi);

                // 明杠, 碰
                const ops = ['minggang', 'peng'];
                for (const op of ops)
                    for (let i = seat + 1; i < seat + base_info.player_cnt; i++) {
                        const tmp_seat = i % base_info.player_cnt as Seat;
                        const tmp_fulu: NewFuluInfo = new_fulu[tmp_seat][0];
                        if (tmp_fulu && tmp_fulu.type === op && tmp_fulu.from === seat && isEqualTile(tmp_fulu.ming_tile, tile)) {
                            nxt_step = op;
                            seat = tmp_seat as Seat;
                            return;
                        }
                    }

                const tmp_seat = (seat + 1) % base_info.player_cnt as Seat;
                const tmp_fulu: NewFuluInfo = new_fulu[tmp_seat][0];
                if (tmp_fulu && tmp_fulu.type === 'chi' && tmp_fulu.from === seat && isEqualTile(tmp_fulu.ming_tile, tile)) {
                    nxt_step = 'chi';
                    seat = tmp_seat;
                    return;
                }

                nxt_step = 'mopai';
                seat = (seat + 1) % base_info.player_cnt;
            }

            function new_mingpai(): void {
                const tmp_fulu: NewFuluInfo = new_fulu[seat].shift();

                mingpai(seat, tmp_fulu.own_tiles.join(''));

                if (tmp_fulu.type === 'minggang')
                    nxt_step = 'mopai';
                else
                    nxt_step = 'qiepai';
            }

            function new_zimingpai(): void {
                const tmp_fulu: NewFuluInfo = new_fulu[seat].shift();

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
    }
};

export const tenhou2Majsoul = (json: TenhouJSON) => {
    if (!json)
        throw new Error('User canceled input');
    gameBegin();

    // log[0][0][0]: 等于 chang * 4 + ju
    // log[0][0][1]: 本场数
    // log[0][0][2]: 供托棒子个数
    const log = json.log;
    log[0].shift();
    const tmp_scores = log[0].shift() as number[];
    const biao_dora = log[0].shift() as number[];
    const li_dora = log[0].shift() as number[];
    const dict = Constants.TOUHOU_DICT;

    // 起手
    const tiles: number[][] = [];
    // 广义摸牌组
    const new_mopai_set: TenhouInfo[] = [[], [], [], []];
    // 广义切牌组
    const new_qiepai_set: TenhouInfo[] = [[], [], [], []];
    // 各家摸牌的巡目河切牌的巡目
    const mopai_xunmu = [0, 0, 0, 0], qiepai_xunmu = [0, 0, 0, 0];

    for (let i = 0; i < Math.floor(log[0].length / 3); i++) {
        tiles[i] = log[0][3 * i] as number[];
        new_mopai_set[i] = log[0][3 * i + 1];
        new_qiepai_set[i] = log[0][3 * i + 2];
    }

    const ply_cnt = tiles[3].length === 0 ? 3 : 4;

    if (ply_cnt === 3) { // 三麻点数修正
        let all_4p_points = true;
        for (const seat of tmp_scores.keys())
            if (tmp_scores[seat] !== 25000)
                all_4p_points = false;
        if (all_4p_points) // 三麻点数修正
            for (let i = 0; i < ply_cnt; i++)
                tmp_scores[i] = 35000;
    }

    // while 循环关键变量: seat: 要操作的玩家, nxt_step: 下个操作的类型
    let seat = base_info.ju, nxt_step = 'mopai';
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
            case 'babei':
                break;
        }
        if (nxt_step === 'liuju') {

            huangpai();
            fixPaishan();

            break;
        }
    }

    // new_mopai 不会改变 seat
    function new_mopai() {
        if (mopai_xunmu[seat] >= new_mopai_set[seat].length) {
            nxt_step = 'liuju';
            return;
        }
        // 开局, 亲家补全至14张牌
        if (seat === base_info.ju && mopai_xunmu[base_info.ju] === 0) {
            tiles[base_info.ju].push(new_mopai_set[base_info.ju][mopai_xunmu[base_info.ju]] as number);

            for (const seat of tiles.keys())
                begin_tiles[seat] = process(tiles[seat]);

            let zhishipais = '';
            for (let i = biao_dora.length - 1; i >= 0; i--) {
                if (li_dora[i] !== undefined)
                    zhishipais += dict[li_dora[i]];
                zhishipais += dict[biao_dora[i]];
            }

            randomPaishan('', zhishipais + '....');

            function process(tls: number[]) {
                let ret = '';
                for (const touhou_tile of tls)
                    ret += dict[touhou_tile];
                return ret;
            }
        } else
            mopai(seat, dict[new_mopai_set[seat][mopai_xunmu[seat]]]);

        mopai_xunmu[seat]++;

        const nxt_qiepai = new_qiepai_set[seat][qiepai_xunmu[seat]];
        if (typeof nxt_qiepai == 'string') {
            if (nxt_qiepai.includes('a'))
                nxt_step = 'angang';
            else if (nxt_qiepai.includes('k'))
                nxt_step = 'jiagang';
            else if (nxt_qiepai.includes('r'))
                nxt_step = 'qiepai';
        } else
            nxt_step = 'qiepai';
    }

    function new_qiepai() {
        if (qiepai_xunmu[seat] >= new_qiepai_set[seat].length) {
            nxt_step = 'liuju';
            return;
        }
        let is_liqi = false;
        let tile: Tile;
        const nxt_qiepai = new_qiepai_set[seat][qiepai_xunmu[seat]];
        if (typeof nxt_qiepai == 'string') {
            tile = dict[parseInt(nxt_qiepai.substring(1))];
            is_liqi = true;
        } else
            tile = dict[nxt_qiepai];

        qiepai(seat, tile, is_liqi);

        qiepai_xunmu[seat]++;

        // 明杠
        for (let i = seat + 1; i < seat + ply_cnt; i++) {
            const tmp_seat = i % ply_cnt as Seat;
            const nxt_mopai = new_mopai_set[tmp_seat][mopai_xunmu[tmp_seat]];
            if (typeof nxt_mopai == 'string') {
                const [tmp_fulu_from_seat, tmp_fulu_type] = judge_fulu(nxt_mopai, tmp_seat);
                if (tmp_fulu_from_seat === seat && tmp_fulu_type === 'm') {
                    nxt_step = 'minggang';
                    seat = tmp_seat;
                    return;
                }
            }
        }
        // 碰
        for (let i = seat + 1; i < seat + ply_cnt; i++) {
            const tmp_seat = i % ply_cnt as Seat;
            const nxt_mopai = new_mopai_set[tmp_seat][mopai_xunmu[tmp_seat]];
            if (typeof nxt_mopai == 'string') {
                const [tmp_fulu_from_seat, tmp_fulu_type] = judge_fulu(nxt_mopai, tmp_seat);
                if (tmp_fulu_from_seat === seat && tmp_fulu_type === 'p') {
                    nxt_step = 'peng';
                    seat = tmp_seat;
                    return;
                }
            }
        }
        // 吃
        const tmp_seat = (seat + 1) % ply_cnt as Seat;
        const nxt_mopai = new_mopai_set[tmp_seat][mopai_xunmu[tmp_seat]];
        if (typeof nxt_mopai == 'string') {
            const [tmp_fulu_from_seat, tmp_fulu_type] = judge_fulu(nxt_mopai, tmp_seat);
            if (tmp_fulu_from_seat === seat && tmp_fulu_type === 'c') {
                nxt_step = 'chi';
                seat = tmp_seat;
                return;
            }
        }
        // 摸牌
        seat = (seat + 1) % ply_cnt;
        nxt_step = 'mopai';

        function judge_fulu(tmp_fulu: string, tmp_seat: Seat) {
            const fulu_types = ['c', 'p', 'm'];
            let fulu_local_seat = 0;
            let fulu_type = '';
            for (const type of fulu_types)
                if (tmp_fulu.includes(type)) {
                    let index = tmp_fulu.indexOf(type);
                    if (index === 6)
                        index = 4;
                    fulu_type = type;
                    fulu_local_seat = 3 - index / 2;
                    break;
                }
            const real_seat = (fulu_local_seat + tmp_seat) % 4;
            return [real_seat, fulu_type];
        }
    }

    // new_mingpai 不会改变 seat
    function new_mingpai() {
        const fulu = new_mopai_set[seat][mopai_xunmu[seat]];
        mopai_xunmu[seat]++;

        let [tmp_tiles, fulu_type] = parse_fulu(fulu);
        const tiles: Tile[] = [];
        while (tmp_tiles.length) {
            tiles.push(dict[parseInt(tmp_tiles.substring(0, 2))]);
            tmp_tiles = tmp_tiles.substring(2);
        }

        mingpai(seat, tiles.join(''));

        if (fulu_type === 'm') {
            qiepai_xunmu[seat]++;
            nxt_step = 'mopai';
        } else
            nxt_step = 'qiepai';
    }

    // new_zimingpai 不会改变 seat
    function new_zimingpai() {
        const fulu = new_qiepai_set[seat][qiepai_xunmu[seat]];
        qiepai_xunmu[seat]++;

        const [tmp_tiles, fulu_type] = parse_fulu(fulu);
        const tile = dict[parseInt(tmp_tiles.substring(0, 2))];
        const type = fulu_type === 'a' ? 'angang' : 'jiagang';

        zimingpai(seat, tile, type);

        nxt_step = 'mopai';
    }

    function parse_fulu(fulu: string|number) {
        // 'c': 吃, 'p': 碰, 'm': 明杠, 'a': 暗杠, 'k': 加杠
        if (typeof fulu === 'number')
            return [];
        const fulu_types = ['c', 'p', 'm', 'a', 'k'];
        for (const type of fulu_types)
            if (fulu.includes(type)) {
                const index = fulu.indexOf(type);
                return [fulu.substring(0, index) + fulu.substring(index + 3), type];
            }
        return [];
    }
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

/**
 * 根据已结束的对局进行牌山修正, 用于"天凤牌谱编辑器数据转雀魂格式"和"根据可见手牌和牌河生成雀魂牌谱"的最后
 * @param dora_num - 表指示牌数量, 默认为1
 * @param li_dora_num - 里指示牌刷领, 默认为0
 */
const fixPaishan = (dora_num: number = 1, li_dora_num: number = 0): void => {
    let qishou_num = 53, all_lingshang_num = 4;
    if (base_info.player_cnt === 3) {
        qishou_num = 40;
        all_lingshang_num = 8;
    } else if (base_info.player_cnt === 2) {
        qishou_num = 27;
        all_lingshang_num = 12;
    }
    const data_new_round = all_data.all_actions[all_data.all_actions.length - 1][0].data;
    if (!data_new_round.sha256)
        qishou_num = 0;

    let normal_num = 0, lingshang_num = 0;
    const normal_tiles: Tile[] = [], lingshang_tiles: Tile[] = [];

    const cur_actions = all_data.all_actions[all_data.all_actions.length - 1];
    for (const [index, action] of cur_actions.entries()) {
        if (action.name === 'RecordDealTile') {
            let is_lingshang = false;
            const lst_action = cur_actions[index - 1];
            if (lst_action.name === 'RecordChiPengGang' && lst_action.data.type === 2) // 上一个操作是暗杠, 则这张牌是岭上牌
                is_lingshang = true;
            if (lst_action.name === 'RecordAnGangAddGang' || lst_action.name === 'RecordBaBei') // 上一个操作是暗杠/加杠/拔北, 则这张牌是岭上牌
                is_lingshang = true;

            if (is_lingshang) {
                lingshang_num++;
                lingshang_tiles.push(action.data.tile);
            } else {
                normal_num++;
                normal_tiles.push(action.data.tile);
            }
        }
    }
    const new_paishan: Tile[] = separate(data_new_round.paishan);
    const protected_index = [];
    for (let i = 0; i < dora_num; i++)
        protected_index.push(new_paishan.length - 1 - all_lingshang_num - i * 2);
    for (let i = 0; i < li_dora_num; i++)
        protected_index.push(new_paishan.length - 2 - all_lingshang_num - i * 2);

    for (let i = 0; i < normal_num; i++) {
        if (new_paishan[qishou_num + i] === normal_tiles[i])
            continue;
        let same_index = -1;
        for (let j = qishou_num + i + 1; j < new_paishan.length; j++)
            if (!protected_index.includes(j) && new_paishan[j] === normal_tiles[i]) {
                same_index = j;
                break;
            }
        if (same_index !== -1) {
            const tmp = new_paishan[qishou_num + i];
            new_paishan[qishou_num + i] = new_paishan[same_index];
            new_paishan[same_index] = tmp;
        }
    }
    for (let i = 0; i < lingshang_num; i++) {
        if (new_paishan[new_paishan.length - 1 - i] === lingshang_tiles[i])
            continue;
        let same_index = -1;
        for (let j = new_paishan.length - 2 - i; j >= qishou_num; j--)
            if (!protected_index.includes(j) && new_paishan[j] === lingshang_tiles[i]) {
                same_index = j;
                break;
            }
        if (same_index !== -1) {
            const tmp = new_paishan[new_paishan.length - 1 - i];
            new_paishan[new_paishan.length - 1 - i] = new_paishan[same_index];
            new_paishan[same_index] = tmp;
        }
    }
    data_new_round.paishan = new_paishan.join('');
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
