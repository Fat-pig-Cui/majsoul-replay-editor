/**
 * 何切模式分为两类:
 * 1. 自家摸牌后选择切什么牌(第一类何切)
 * 2. 其他家切牌后自家是否要鸣牌, 和鸣牌后切什么牌(第二类何切)
 */
(function () {
    /**
     * 用户修改 json 数据
     * - player_count: 玩家数
     * - chang_ju_ben_num: 所在小局, 第一个是什么场, 第二个是谁坐庄, 第三个是本场数, 第四个是刚开局时场上立直棒个数(默认为0)
     * - mainrole: 主视角的 seat
     * - tiles: 主视角在何切的巡目的手牌(若是第一类何切, 则不包含刚摸的牌)
     * - lst_mopai: 第一类何切中何切巡目刚摸的牌, 若是第二类何切, 则要置为空
     * - dora: 宝牌指示牌, 从左到右
     * - scores: 所有玩家这小局开始时的点数
     * - paihe0-3: 各家的牌河, 牌不要缩写, 包含被鸣走的牌
     *             牌有后缀g表示摸切, 无g则为手切
     *             有后缀r表示立直, 无r表示非立直
     *             g和r顺序不分先后
     * - fulu0-3: 各家的副露, 按时间顺序从左到右
     *            '_'表示下一张牌是倾倒的鸣的其他家的牌, '^'表示加杠, 先'_'后'^'
     *            大明杠对家的牌的'_'放在第二个数字前
     *            暗杠的巡目在轮到该暗杠副露时的下一个摸牌巡, 加杠的巡目在碰对应副露之后下一个摸牌巡
     * @type {{player_count: number, chang_ju_ben_num: number[], mainrole: number, tiles: string, lst_mopai: string, dora: string[], scores: number[], paihe0: string, paihe1: string, paihe2: string, paihe3: string, fulu0: string[], fulu1: string[], fulu2: string[], fulu3: string[]}}
     */
    let json = {
        player_count: 4,
        chang_ju_ben_num: [0, 0, 0],
        mainrole: 2,
        tiles: '0566m6p89s',
        lst_mopai: '',
        dora: ['0p'],
        scores: [25000, 25000, 25000, 25000],
        paihe0: '3z9s1p2pg8m9p1z4s5mr',
        paihe1: '7z2z3m5z1sg1zg4zg4zg',
        paihe2: '9p7z6z2p8m4s4zg1mg',
        paihe3: '9p7zg9s7sg5sg4z4p7pg',
        fulu0: [],
        fulu1: [],
        fulu2: ['_555z', '_111z'],
        fulu3: [],
    };
    /**
     * @type {[{type: string, own_tiles: string[], ming_tile: string|undefined, from: number}][]}
     */
    let fulus_info = [[], [], [], []];
    /**
     * @type {[{tile: string, moqie: boolean, is_liqi: boolean}][]}
     */
    let new_discard_tiles = [[], [], [], []];
    let qiepai_xun = [0, 0, 0, 0], fulu_index = [0, 0, 0, 0];
    // 预处理
    (function () {
        clearProject();
        player_datas[0].avatar_id = 400102;
        player_datas[1].avatar_id = 400104;
        player_datas[2].avatar_id = 400105;
        player_datas[3].avatar_id = 400106;
        setConfig({
            category: 3,
            meta: {mode_id: 0},
            mode: {
                mode: json.player_count === 3 ? 12 : 2,
                detail_rule: {
                    _heqie_mode: true, // 何切模式一定要开启, 否则会报错
                    _no_liujumanguan: true, // 无流满
                    _chang_ju_ben_num_: json.chang_ju_ben_num,
                    _mainrole_: json.mainrole,
                    _scores_: json.scores,
                }
            }
        });

        // 解析 fulu 至 fulus_info
        let new_fulus = [json.fulu0, json.fulu1, json.fulu2, json.fulu3];
        for (let i = 0; i < json.player_count; i++) {
            for (let k in new_fulus[i]) {
                let tile_type = new_fulus[i][k].at(-1);
                if (new_fulus[i][k].indexOf('_') !== -1) {
                    let index = new_fulus[i][k].indexOf('_');
                    let ming_tile = new_fulus[i][k][index + 1] + tile_type;
                    let own_tiles = [];
                    for (let j = 0; j < new_fulus[i][k].length - 1; j++)
                        if (new_fulus[i][k][j] !== '_')
                            own_tiles.push(new_fulus[i][k][j] + tile_type);
                        else
                            j++;
                    let is_jiagang = new_fulus[i][k].indexOf('^') !== -1;
                    let type = '';
                    if (own_tiles[0] !== own_tiles[1])
                        type = 'chi';
                    else if (is_jiagang)
                        type = 'jiagang';
                    else if (own_tiles.length === 2)
                        type = 'peng';
                    else if (own_tiles.length === 3)
                        type = 'minggang';

                    let tmp_fulu = new_fulus[i][k];
                    if (is_jiagang)
                        tmp_fulu.splice(tmp_fulu.indexOf('^'), 2);

                    if (type === 'minggang' && index === 3)
                        index = 2;
                    if (type === 'jiagang') // 加杠多一个碰, 方便算法实现
                        fulus_info[i].push({
                            type: 'peng',
                            own_tiles: own_tiles.slice(0, 2),
                            ming_tile: ming_tile,
                            from: (i + 3 - index) % json.player_count,
                        });
                    fulus_info[i].push({
                        type: type,
                        own_tiles: own_tiles.slice(),
                        ming_tile: ming_tile,
                        from: (i + 3 - index) % json.player_count,
                    });
                } else {
                    let own_tiles = [];
                    for (let j = 0; j < new_fulus[i][k].length - 1; j++)
                        own_tiles.push(new_fulus[i][k][j] + tile_type);
                    fulus_info[i].push({
                        type: 'angang',
                        own_tiles: own_tiles.slice(),
                        from: i,
                    });
                }
            }
        }
        // 解析 paihe 至 new_discard_tiles
        let tmp_qiepai_set = [json.paihe0, json.paihe1, json.paihe2, json.paihe3];
        let new_qiepai_set = [[], [], [], []];
        for (let i = 0; i < json.player_count; i++) {
            new_qiepai_set[i] = separate_tiles(tmp_qiepai_set[i]);
            for (let j in new_qiepai_set[i])
                new_discard_tiles[i].push({
                    tile: new_qiepai_set[i][j].substring(0, 2),
                    moqie: new_qiepai_set[i][j].indexOf('g') !== -1,
                    is_liqi: new_qiepai_set[i][j].indexOf('r') !== -1,
                });
        }

        let dora = json.dora;
        let zhishipais = '';
        for (let i = dora.length - 1; i >= 0; i--)
            zhishipais += '.' + dora[i];
        if (json.player_count === 3)
            zhishipais += '....';

        begin_tiles[json.mainrole] = json.tiles;

        randomPaishan('', zhishipais + '....');
        roundBegin();
        protected_tiles.seat = json.mainrole;
        protected_tiles.tiles = separate(json.tiles).sort(cmp);

        // paihe 经过该函数变为数组格式
        function separate_tiles(tiles) {
            if (!tiles)
                return [];
            let ret = [];
            while (tiles.length > 0) {
                // 牌河中的牌有三种可能
                // 1. 长度为4, 类似 1pgr, 即摸切1p&立直
                // 2. 长度为3, 类似 1pr 和 1pg, 摸切1p, 或手切1p立直
                // 3. 长度为2, 如 1p, 即摸切1p
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

    let seat = json.chang_ju_ben_num[1], nxt_step = 'qiepai';
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
        }
        if (nxt_step === 'liuju')
            break;

        function new_mopai() {
            if (qiepai_xun[seat] >= new_discard_tiles[seat].length) {
                nxt_step = 'liuju';
                return;
            }

            mopai(seat);

            if (fulus_info[seat][fulu_index[seat]] && (fulus_info[seat][fulu_index[seat]].type === 'angang' || fulus_info[seat][fulu_index[seat]].type === 'jiagang'))
                nxt_step = 'angang';
            else
                nxt_step = 'qiepai';
        }

        function new_qiepai() {
            let tile_info = new_discard_tiles[seat][qiepai_xun[seat]];
            qiepai_xun[seat]++;
            let tile = tile_info.tile;
            let f_moqie = tile_info.moqie ? 'moqie' : 'shouqie';

            qiepai(seat, tile, tile_info.is_liqi, f_moqie);

            // 明杠, 碰
            let op = ['minggang', 'peng'];
            for (let j in op)
                for (let i = seat + 1; i < seat + json.player_count; i++) {
                    let tmp_seat = i % json.player_count;
                    let tmp_fulu = fulus_info[tmp_seat][fulu_index[tmp_seat]];
                    if (tmp_fulu && tmp_fulu.type === op[j] && tmp_fulu.from === seat && tmp_fulu.ming_tile === tile) {
                        nxt_step = op[j];
                        seat = tmp_seat;
                        return;
                    }
                }

            let tmp_seat = (seat + 1) % json.player_count, tmp_fulu = fulus_info[tmp_seat][fulu_index[tmp_seat]];
            if (tmp_fulu && tmp_fulu.type === 'chi' && tmp_fulu.from === seat && tmp_fulu.ming_tile === tile) {
                nxt_step = 'chi';
                seat = tmp_seat;
                return;
            }

            nxt_step = 'mopai';
            seat = (seat + 1) % json.player_count;
        }

        function new_mingpai() {
            let tmp_fulu = fulus_info[seat][fulu_index[seat]];
            fulu_index[seat]++;

            mingpai(seat, tmp_fulu.own_tiles.join(''));

            if (tmp_fulu.type === 'minggang')
                nxt_step = 'mopai';
            else
                nxt_step = 'qiepai';
        }

        function new_zimingpai() {
            let tmp_fulu = fulus_info[seat][fulu_index[seat]];
            fulu_index[seat]++;

            zimingpai(seat, tmp_fulu.own_tiles[0], tmp_fulu.type);

            nxt_step = 'mopai';
        }
    }
    if (json.lst_mopai)
        mopai(json.mainrole, json.lst_mopai);

    huangpai();
})();

// // official
// json = {
//     player_count: 4,
//     chang_ju_ben_num: [0, 0, 0],
//     mainrole: 2,
//     tiles: '0566m6p89s',
//     lst_mopai: '',
//     dora: ['0p'],
//     paihe0: '3z9s1p2pg8m9p1z4s5mr',
//     paihe1: '7z2z3m5z1sg1zg4zg4zg',
//     paihe2: '9p7z6z2p8m4s4zg1mg',
//     paihe3: '9p7zg9s7sg5sg4z4p7pg',
//     fulu0: [],
//     fulu1: [],
//     fulu2: ['_555z', '_111z'],
//     fulu3: [],
// };
//
// // https://www.bilibili.com/opus/1100855183761473545
// json = {
//     player_count: 4,
//     chang_ju_ben_num: [1, 0, 0],
//     mainrole: 0,
//     tiles: '34055m11346p406s',
//     lst_mopai: '5p',
//     dora: ['2z'],
//     paihe0: '9m9p6z5z6zg8p9pg3zg',
//     paihe1: '1s9s7z2z8m1z4mg3mg',
//     paihe2: '4zg6z7m7mg9mg1p8pg6m',
//     paihe3: '9m9mg2z1p1zg6z5p4z',
//     fulu0: [],
//     fulu1: [],
//     fulu2: [],
//     fulu3: [],
// };
//
// // https://www.bilibili.com/opus/1096031042145353764
// json = {
//     player_count: 4,
//     chang_ju_ben_num: [0, 2, 0],
//     mainrole: 0,
//     tiles: '2220m56p3066778s',
//     lst_mopai: '4s',
//     dora: ['7p'],
//     paihe0: '7z2s5mg2zg3z3z9s2pg5zg',
//     paihe1: '9s2z8s4s6m7mg1zg7zg4m',
//     paihe2: '9m9mg4p4zg2zr1zg9sg6zg4zg4sg5zg',
//     paihe3: '5z2sg1s1zg7p3m1pg6zg2pg1pg',
//     fulu0: [],
//     fulu1: [],
//     fulu2: [],
//     fulu3: [],
// };
//
// // https://www.bilibili.com/opus/1090866786329427968
// json = {
//     player_count: 4,
//     chang_ju_ben_num: [1, 2, 0],
//     mainrole: 2,
//     tiles: '446m456p44556s77z',
//     lst_mopai: '0p',
//     dora: ['6z', '1p'],
//     paihe0: '8p5z5p9s6zg7s4zg5m9sg',
//     paihe1: '1zg5zg3z2s1sg8sg1zg1sg7pr',
//     paihe2: '4z1z9s8s2z7p8pg6pg',
//     paihe3: '1z4zg2m8s9m2z9p2zg',
//     fulu0: ['33_3z', '7777m'],
//     fulu1: [],
//     fulu2: [],
//     fulu3: [],
// };
//
// // https://www.bilibili.com/opus/1064906303211569152
// json = {
//     player_count: 4,
//     chang_ju_ben_num: [0, 3, 0],
//     mainrole: 0,
//     tiles: '355m123405p3345s',
//     lst_mopai: '5m',
//     dora: ['5p'],
//     paihe0: '9m4z8s8p7zg',
//     paihe1: '4z1m9p7zg6z',
//     paihe2: '1s9s7z1z3m',
//     paihe3: '7z5z2m8s9sg9p',
//     fulu0: [],
//     fulu1: [],
//     fulu2: ['_444z'],
//     fulu3: [],
// };
