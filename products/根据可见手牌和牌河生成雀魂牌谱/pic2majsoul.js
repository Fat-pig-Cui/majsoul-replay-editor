/**
 * 何切模式分为两类:
 * 1. 自家摸牌后选择切什么牌(第一类何切)
 * 2. 其他家切牌后自家是否要鸣牌, 以及鸣牌后切什么牌(第二类何切)
 */
(function () {
    /**
     * 用户修改 json 数据
     * - player_count: 玩家数
     * - chang_ju_ben_num: 所在小局, 第一个是什么场, 第二个是谁坐庄, 第三个是本场数, 第四个是刚开局时场上立直棒个数(默认为0)
     * - mainrole: 主视角的 seat
     * - tiles0-3: 各家在何切的巡目的手牌(若是第一类何切, 则不包含刚摸的牌, 若未知则置为空)
     * - lst_mopai: 第一类何切中何切巡目刚摸的牌, 若是第二类何切, 则要置为空
     * - dora: 宝牌指示牌, 从左到右
     * - li_dora: 里宝牌指示牌, 从左到右, 长度要和 dora 一致, 若未知则置为空
     * - scores: 所有玩家这小局开始时的点数
     * - paihe0-3: 各家的牌河, 牌不要缩写, 包含被鸣走的牌
     *             牌有后缀g表示摸切, 无g则为手切
     *             有后缀r表示立直, 无r表示非立直
     *             g和r顺序不分先后
     * - fulu0-3: 各家的副露, 按时间顺序从左到右
     *            '_'表示下一张牌是倾倒的鸣的其他家的牌, '^'表示加杠, 先'_'后'^'
     *            大明杠对家的牌的'_'放在第二个数字前
     *            暗杠的巡目在轮到该暗杠副露时的下一个摸牌巡, 加杠的巡目在碰对应副露之后下一个摸牌巡
     * - first_op: 庄家第一个操作, 0: 切牌(含立直), 1: 暗杠/拔北, 2. 和牌(天和), 默认为0, 若是第二类何切则无论如何都置为0
     * - end_mode: 结束方式, 0: 和牌, 1: 荒牌流局, 2: 途中流局(若不符合途中流局条件则会报错), 默认为1
     * - hu_seat: 和牌玩家的所有 seat, 只在 end_mode 是 0 的时候有效, 若为空则自动判断谁可以和牌(若无人能和牌会报错)
     */
    const json = {
        player_count: 4,
        chang_ju_ben_num: [0, 2, 10],
        mainrole: 2,
        tiles0: '5m489p359s234z',
        tiles1: '6z',
        tiles2: '123m6z',
        tiles3: '48m126p112359s26z',
        lst_mopai: '6z',
        dora: ['4s', '3z', '8p', '1s'],
        li_dora: ['9p', '9m', '4m', '9m'],
        scores: [9500, 14700, 64800, 11000],
        paihe0: '6s5p4s8m6p6s6mg4mg9pg5mg7pg7mg7s0mg3pg1mg2mg',
        paihe1: '5p8p9sg4p2sg3sg3pg1m2zg6m7mg8s8pg2zg3mg5p3m4m',
        paihe2: '6m0p7p0s7s7s3z2s9mg4zg1s3p6mg5sg2p1p2sg5mgr',
        paihe3: '2m4s7s3s7pg2mg4p8s7mg4sg1pg4z3zg9sg2pg2pg9pg9mg',
        fulu0: ['_213m'],
        fulu1: ['_666s', '_534p', '_888m', '8_88s'],
        fulu2: ['5555z', '7777z', '1111z'],
        fulu3: [],
        first_op: 1,
        end_mode: 0,
        hu_seat: [],
    };

    (function () {
        clearProject();
        player_datas[0].nickname = '一姬-契约';
        player_datas[1].nickname = '新年初诣';
        player_datas[2].nickname = '一姬当千';
        player_datas[3].nickname = '绮春歌';
        player_datas[0].avatar_id = 400102;
        player_datas[1].avatar_id = 400104;
        player_datas[2].avatar_id = 400105;
        player_datas[3].avatar_id = 400106;
        setConfig({
            category: 3,
            meta: {mode_id: 0},
            mode: {
                mode: json.player_count === 3 ? 12 : 2,
                detail_rule: { // 无流满, 无罚符
                    _no_liujumanguan: true,
                    _fafu_1ting: 0,
                    _fafu_2ting: 0,
                    _fafu_3ting: 0,
                    _fafu_3p_1ting: 0,
                    _fafu_3p_2ting: 0,
                    _fafu_2p: 0,

                    _chang_ju_ben_num_: json.chang_ju_ben_num,
                    _mainrole_: json.mainrole,
                    _scores_: json.scores,
                }
            }
        });
    })();

    /**
     * @type {{type: string, own_tiles: string[], ming_tile: string|undefined, from: number}[][]}
     */
    const fulus_info = [[], [], [], []];
    /**
     * @type {{tile: string, moqie: boolean, is_liqi: boolean}[][]}
     */
    const new_discard_tiles = [[], [], [], []];
    /**
     * @type {string[][]}
     */
    const new_deal_tiles = [[], [], [], []];
    // 预处理
    (function () {
        // 解析 fulu 至 fulus_info
        const new_fulus = [json.fulu0, json.fulu1, json.fulu2, json.fulu3];
        for (let i = 0; i < json.player_count; i++) {
            for (const k in new_fulus[i]) {
                let tile_type = new_fulus[i][k].at(-1);
                if (new_fulus[i][k].includes('_')) {
                    let index = new_fulus[i][k].indexOf('_');
                    const ming_tile = new_fulus[i][k][index + 1] + tile_type;
                    const own_tiles = [];
                    for (let j = 0; j < new_fulus[i][k].length - 1; j++)
                        if (new_fulus[i][k][j] !== '_')
                            own_tiles.push(new_fulus[i][k][j] + tile_type);
                        else
                            j++;
                    const is_jiagang = new_fulus[i][k].includes('^');
                    let type = '';
                    if (own_tiles[0] !== own_tiles[1])
                        type = 'chi';
                    else if (is_jiagang)
                        type = 'jiagang';
                    else if (own_tiles.length === 2)
                        type = 'peng';
                    else if (own_tiles.length === 3)
                        type = 'minggang';

                    const tmp_fulu = new_fulus[i][k];
                    if (is_jiagang)
                        tmp_fulu.splice(tmp_fulu.indexOf('^'), 2);

                    if (type === 'minggang' && index === 3)
                        index = 2;
                    let from = (i + 3 - index) % json.player_count;
                    if (type === 'jiagang') { // 加杠多一个碰, 方便算法实现, 并且加杠的 from 优化
                        fulus_info[i].push({
                            type: 'peng',
                            own_tiles: own_tiles.slice(0, 2),
                            ming_tile: ming_tile,
                            from: from,
                        });
                        from = i;
                        own_tiles.splice(1);
                    }
                    fulus_info[i].push({
                        type: type,
                        own_tiles: own_tiles,
                        ming_tile: ming_tile,
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
        const new_qiepai_set = [[], [], [], []];
        for (let i = 0; i < json.player_count; i++) {
            new_qiepai_set[i] = separate_tiles(tmp_qiepai_set[i]);
            for (const j in new_qiepai_set[i])
                new_discard_tiles[i].push({
                    tile: new_qiepai_set[i][j].substring(0, 2),
                    moqie: new_qiepai_set[i][j].includes('g'),
                    is_liqi: new_qiepai_set[i][j].includes('r'),
                });
        }

        // 从 fulus_info, new_discard_tiles 和 tiles0-3 解析至 new_deal_tiles
        const zhuang_seat = json.chang_ju_ben_num[1];
        const first_tile = new_discard_tiles[zhuang_seat][0];
        if (!first_tile.moqie) {
            new_deal_tiles[zhuang_seat].push(first_tile.tile);
            new_discard_tiles[zhuang_seat].shift();
        }
        for (let i = 0; i < json.player_count; i++) {
            for (const tmp_fulu of fulus_info[i])
                if (tmp_fulu.type !== 'jiagang') {
                    new_deal_tiles[i].push(...tmp_fulu.own_tiles);
                } else
                    new_deal_tiles[i].push(tmp_fulu.ming_tile);
        }
        for (let i = 0; i < json.player_count; i++)
            for (const discard_tile of new_discard_tiles[i])
                if (!discard_tile.moqie)
                    new_deal_tiles[i].push(discard_tile.tile);
        new_discard_tiles[zhuang_seat].unshift(first_tile);
        for (let i = 0; i < json.player_count; i++)
            new_deal_tiles[i].push(...separate(json['tiles' + i]));

        const dora = json.dora;
        const li_dora = json.li_dora;
        while (li_dora.length < dora.length)
            li_dora.push('.');
        let zhishipais = '';
        for (let i = dora.length - 1; i >= 0; i--)
            zhishipais += li_dora[i] + dora[i];
        if (json.player_count === 3)
            zhishipais += '....';

        for (let i = 0; i < json.player_count; i++) {
            let num = 13;
            if (zhuang_seat === i)
                num = 14;
            for (let j = 0; j < num && new_deal_tiles[i].length > 0; j++)
                begin_tiles[i] += new_deal_tiles[i].shift();
        }

        randomPaishan('', zhishipais + '....');
        roundBegin();

        // paihe 经过该函数变为数组格式
        function separate_tiles(tiles) {
            if (!tiles)
                return [];
            tiles = tiles.replace(/\s*/g, '');
            const ret = [];
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

    let seat = json.chang_ju_ben_num[1];
    let nxt_step = 'qiepai';
    if (json.first_op === 1)
        nxt_step = 'angang';
    else if (json.first_op === 2)
        nxt_step = 'hupai/liuju';
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

        function new_mopai() {
            if (new_discard_tiles[seat].length <= 0) {
                nxt_step = 'hupai/liuju';
                return;
            }

            if (fulus_info[seat].length > 0 && (fulus_info[seat][0].type === 'angang' || fulus_info[seat][0].type === 'jiagang'))
                nxt_step = fulus_info[seat][0].type;
            else
                nxt_step = 'qiepai';

            let tile = new_discard_tiles[seat][0].tile;
            if (nxt_step === 'jiagang')
                tile = fulus_info[seat][0].own_tiles[0];
            else if (!new_discard_tiles[seat][0].moqie || nxt_step === 'angang')
                tile = new_deal_tiles[seat].shift();

            mopai(seat, tile);
        }

        // 先看其他家谁可以鸣主视角的牌, 再看主视角自己切什么牌
        function new_qiepai() {
            const tile_info = new_discard_tiles[seat].shift();
            const tile = tile_info.moqie ? undefined : tile_info.tile;

            qiepai(seat, tile, tile_info.is_liqi);

            // 明杠, 碰
            const op = ['minggang', 'peng'];
            for (const j in op)
                for (let i = seat + 1; i < seat + json.player_count; i++) {
                    const tmp_seat = i % json.player_count;
                    const tmp_fulu = fulus_info[tmp_seat][0];
                    if (tmp_fulu && tmp_fulu.type === op[j] && tmp_fulu.from === seat && tmp_fulu.ming_tile === tile) {
                        nxt_step = op[j];
                        seat = tmp_seat;
                        return;
                    }
                }

            const tmp_seat = (seat + 1) % json.player_count, tmp_fulu = fulus_info[tmp_seat][0];
            if (tmp_fulu && tmp_fulu.type === 'chi' && tmp_fulu.from === seat && tmp_fulu.ming_tile === tile) {
                nxt_step = 'chi';
                seat = tmp_seat;
                return;
            }

            nxt_step = 'mopai';
            seat = (seat + 1) % json.player_count;
        }

        function new_mingpai() {
            const tmp_fulu = fulus_info[seat].shift();

            mingpai(seat, tmp_fulu.own_tiles.join(''));

            if (tmp_fulu.type === 'minggang')
                nxt_step = 'mopai';
            else
                nxt_step = 'qiepai';
        }

        function new_zimingpai() {
            const tmp_fulu = fulus_info[seat].shift();

            zimingpai(seat, tmp_fulu.own_tiles[0], tmp_fulu.type);

            nxt_step = 'mopai';
        }
    }
    if (json.lst_mopai)
        mopai(json.mainrole, json.lst_mopai);

    if (json.end_mode === 0) {
        if (json.hu_seat.length === 0)
            hupai();
        else
            hupai(json.hu_seat);
    } else if (json.end_mode === 1)
        huangpai();
    else if (json.end_mode === 2)
        liuju();

    fixPaishan();
})();
