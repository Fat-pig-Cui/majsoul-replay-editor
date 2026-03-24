clearProject();

player_datas[0] = {
    nickname: '北雨听海',
    avatar_id: 402602, // 雏桃-契约
    title: 600006, // 魂之契约者-中阶
    views: [
        {slot: 0, item_id: 305042}, // 立直棒-雪糕
        {slot: 1, item_id: 305209}, // 和牌-安可
        {slot: 2, item_id: 305316}, // 立直-鹿雪冬至
    ]
};
player_datas[1] = {
    nickname: '歪比巴卜LL',
    avatar_id: 400705, // 八木唯-月夜华尔兹
    title: 600032, // 连胜之道
    views: [
        {slot: 0, item_id: 305615}, // 立直棒-柴犬团子
        {slot: 1, item_id: 305216}, // 和牌-槲寄生下
        {slot: 2, item_id: 305308}, // 立直-鹿雪冬至
    ]
};
player_datas[2] = {
    nickname: '咲kurosaki',
    avatar_id: 400101, // 一姬
    views: [
        {slot: 0, item_id: 305041}, // 立直棒-断恶
    ]
};
player_datas[3] = {
    nickname: '雀魂真良心',
    avatar_id: 407202, // 枢木朱雀-契约
    title: 600032, // 连胜之道
    views: [
        {slot: 0, item_id: 308018}, // 立直棒-恋之反省
        {slot: 1, item_id: 305226}, // 和牌-水之道
        {slot: 2, item_id: 305308}, // 立直-浪之声
    ]
};

setConfig({
    category: 4,
    meta: {mode_id: 0},
    mode: {
        mode: 2,
        detail_rule: {
            _mainrole_: 0,
        }
    }
});

const player_count = 4;

const jsons = [
    { // 东1局0本场
        ju: 0,
        tiles0: '223m368p123578s5z',
        tiles1: '',
        tiles2: '',
        tiles3: '456777m23p34577s',
        lst_mopai: '',
        dora: ['7z'],
        li_dora: ['5z'],
        paihe0: '2z3z9p1z5p9s 6m8m2p8m9m',
        paihe1: '1m1z7z6m8s2p 4z2z2z4sr1pg',
        paihe2: '4z7z1z9s9p3z 3m3z4z8m',
        paihe3: '1m9s9p8p6mr9sg 8mg6sg4mg4zg',
        fulu0: [],
        fulu1: [],
        fulu2: [],
        fulu3: [],
        end_mode: 1,
        hu_seat: [3],
        first_op: 0,
    }, // 东1局0本场
    { // 东2局0本场
        ju: 1,
        tiles0: '406789m12389p22s',
        tiles1: '',
        tiles2: '',
        tiles3: '',
        lst_mopai: '7p',
        dora: ['8p'],
        li_dora: ['9p'],
        paihe0: '3z6z1s8m8s4sr',
        paihe1: '4z2z3z9m3s5z 9s',
        paihe2: '1s6z1s8s1m8s 9s',
        paihe3: '2z5z5z9s4z8s 2p',
        fulu0: [],
        fulu1: [],
        fulu2: [],
        fulu3: [],
        end_mode: 1,
        hu_seat: [0],
        first_op: 0,
    }, // 东2局0本场
    { // 东3局0本场
        ju: 2,
        tiles0: '38m3667p56s33z',
        tiles1: '345m05778899p56s',
        tiles2: '',
        tiles3: '',
        lst_mopai: '',
        dora: ['1m'],
        li_dora: ['1z'],
        paihe0: '9m9s5z6z1p3z 4z4z7p3s6m4s 4p4p2p8m',
        paihe1: '2z5z7z1m7z8s 9s8p3s8m5z4pr8sg 8pg9mg3sg',
        paihe2: '4z8s9m7z8s1z4s 6m8m5p1s2s6m 5m3s1p6s',
        paihe3: '2z1p9m2z7z1s 4z2s4s6mr7sg0mg 2pg1sg2mg7sg',
        fulu0: ['1_11z'],
        fulu1: [],
        fulu2: ['_312s'],
        fulu3: [],
        end_mode: 1,
        hu_seat: [1],
        first_op: 0,
    }, // 东3局0本场
    { // 东4局0本场
        ju: 3,
        tiles0: '5599m6677p1166s4z',
        tiles1: '',
        tiles2: '',
        tiles3: '',
        lst_mopai: '',
        dora: ['0p'],
        li_dora: ['4z'],
        paihe0: '3z9s4s8p6zr9pg 3zg8sg6mg',
        paihe1: '9p1p9m7s4s8s7z 3s5pr',
        paihe2: '6z2s2z3z8p8s 9m4z',
        paihe3: '1m1m4z7m1m4m 5s6z4m',
        fulu0: [],
        fulu1: [],
        fulu2: [],
        fulu3: ['7_77z'],
        end_mode: 1,
        hu_seat: [0],
        first_op: 0,
    }, // 东4局0本场
    { // 南1局0本场
        ju: 0,
        tiles0: '1235677p34456s7z',
        tiles1: '',
        tiles2: '',
        tiles3: '11223334m88p234s',
        lst_mopai: '',
        dora: ['7s'],
        li_dora: ['9m'],
        paihe0: '2z1z8m9m3z7m 5m5z5z',
        paihe1: '1s1p6z4z7s1z 7s2z3z',
        paihe2: '6z2p1m3s3p9m 1z8m2m',
        paihe3: '5z4p2z6m8s4z 6sr1pg',
        fulu0: [],
        fulu1: [],
        fulu2: [],
        fulu3: [],
        end_mode: 1,
        hu_seat: [3],
        first_op: 0,
    }, // 南1局0本场
    { // 南2局0本场
        ju: 1,
        tiles0: '3m113067899s',
        tiles1: '23344567m234s33z',
        tiles2: '',
        tiles3: '',
        lst_mopai: '8m',
        dora: ['5z'],
        li_dora: ['3s'],
        paihe0: '3z7z3p5z2p6p 9m1z1m1m',
        paihe1: '1m7z1z2p8s7m 5p7p1mr9pg',
        paihe2: '9p5z4z7z9s6s4s 8p2p9p',
        paihe3: '1p3z9m1p5z7z 2m5p7p',
        fulu0: ['4_44z'],
        fulu1: [],
        fulu2: [],
        fulu3: [],
        end_mode: 1,
        hu_seat: [1],
        first_op: 0,
    }, // 南2局0本场
    { // 南2局1本场
        ju: 1,
        tiles0: '255778m06p12356s',
        tiles1: '34m56799p456789s',
        tiles2: '456m789p2206s',
        tiles3: '',
        lst_mopai: '',
        dora: ['4m'],
        li_dora: [],
        paihe0: '9s7z2z6z5p2p 1m4z9s6z2p7z 9m4s4p4s2m',
        paihe1: '3z1z1p1m7s1p 7s8pr4sg2zg6zg3mg 3pg7pg4mg9mg8mg7pg',
        paihe2: '1p5z1m1m4z3m 1p6s3s9p8s2p 9m3s4p4z2m5z',
        paihe3: '1z7z2z2m6z8p 4z7s5z5z8s2p 8p3p4p4p9m8m',
        fulu0: [],
        fulu1: [],
        fulu2: ['_867m'],
        fulu3: [],
        end_mode: 0,
        hu_seat: [],
        first_op: 0,
    }, // 南2局1本场
    { // 南2局2本场
        ju: 1,
        tiles0: '',
        tiles1: '666m77p06s',
        tiles2: '',
        tiles3: '',
        lst_mopai: '',
        dora: ['7z'],
        li_dora: [],
        paihe0: '1p1z1s6z2s4s4p7p 1p',
        paihe1: '4z3z7z6z7z8s 3s8m2m5s',
        paihe2: '9m4z1z1s8s3p1m 5m8m1p',
        paihe3: '1p1s4z8s2s4p 2p9p0p7s',
        fulu0: [],
        fulu1: ['_423s', '_435p'],
        fulu2: [],
        fulu3: ['_123m'],
        end_mode: 1,
        hu_seat: [1],
        first_op: 0,
    }, // 南2局2本场
    { // 南2局3本场
        ju: 1,
        tiles0: '12333p12379s',
        tiles1: '',
        tiles2: '',
        tiles3: '',
        lst_mopai: '8s',
        dora: ['5s'],
        li_dora: [],
        paihe0: '2z6z7m5m5z8p6p 1p7m4z1s',
        paihe1: '1m3z9s9p9m5z 1s4m2p2p9m5z 3s',
        paihe2: '3z3z8p1z9m3z8m 4p8p6z7z5p3sr',
        paihe3: '2m6m8m3m4p3m 3m1p4m5z6z',
        fulu0: ['7_77z'],
        fulu1: ['_867p', '50_5p'],
        fulu2: [],
        fulu3: ['_111z', '3_12s'],
        end_mode: 1,
        hu_seat: [0],
        first_op: 0,
    }, // 南2局3本场
    { // 南3局0本场
        ju: 2,
        tiles0: '23m123p12333567s',
        tiles1: '1678p440566789s',
        tiles2: '',
        tiles3: '',
        lst_mopai: '',
        dora: ['4p'],
        li_dora: ['5z'],
        paihe0: '1z3z2z7z6z5z 3p7m5z9p5p3s 1p',
        paihe1: '6z4z7z5m1z9m 4m3m9s5s3p4pr',
        paihe2: '9s1s1s3p9p4p 4z1z2z4z7p8s 1z',
        paihe3: '3z6z1m9p1s2s 2z2s9m8m1p8s 8m',
        fulu0: [],
        fulu1: [],
        fulu2: [],
        fulu3: [],
        end_mode: 1,
        hu_seat: [1],
        first_op: 0,
    }, // 南3局0本场
    { // 南4局0本场
        ju: 3,
        tiles0: '88s66z',
        tiles1: '33789m340p13456s',
        tiles2: '',
        tiles3: '',
        lst_mopai: '2s',
        dora: ['4m'],
        li_dora: [],
        paihe0: '7p7m9m4p3p2p 2p1z6s9p7z1p 7z2m6p8p',
        paihe1: '4z9s1p2z1m7p5p 9m6s5z8m1m5m5p 9m',
        paihe2: '3z9p2z1z9p7p 1m7z3s3z1z5p2s',
        paihe3: '4z1m2m4z2p1s2s4s 5z3m9s1z7s7m 5z',
        fulu0: ['99_9s', '_213s', '_444s'],
        fulu1: [],
        fulu2: [],
        fulu3: ['0_55m', '_567p'],
        end_mode: 1,
        hu_seat: [1],
        first_op: 0,
    }, // 南4局0本场
];

for (const json of jsons)
    (function () {
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
            for (let i = 0; i < player_count; i++) {
                for (const k in new_fulus[i]) {
                    const tile_type = new_fulus[i][k].at(-1);
                    if (new_fulus[i][k].includes('_')) {
                        let index = new_fulus[i][k].indexOf('_');
                        const ming_tile = new_fulus[i][k][index + 1] + tile_type;
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
                        let from = (i + 3 - index) % player_count;
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
                            ming_tile: type !== 'jiagang' ? ming_tile : new_fulus[i][k][new_fulus[i][k].indexOf('_') + 1] + tile_type,
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
            for (let i = 0; i < player_count; i++) {
                new_qiepai_set[i] = separate_tiles(tmp_qiepai_set[i]);
                for (const j in new_qiepai_set[i])
                    new_discard_tiles[i].push({
                        tile: new_qiepai_set[i][j].substring(0, 2),
                        moqie: new_qiepai_set[i][j].includes('g'),
                        is_liqi: new_qiepai_set[i][j].includes('r'),
                    });
            }

            // 从 fulus_info, new_discard_tiles 和 tiles0-3 解析至 new_deal_tiles
            const zhuang_seat = json.ju;
            const first_tile = new_discard_tiles[zhuang_seat][0];
            if (!first_tile.moqie) {
                new_deal_tiles[zhuang_seat].push(first_tile.tile);
                new_discard_tiles[zhuang_seat].shift();
            }
            for (let i = 0; i < player_count; i++) {
                for (const tmp_fulu of fulus_info[i])
                    if (tmp_fulu.type !== 'jiagang')
                        new_deal_tiles[i].push(...tmp_fulu.own_tiles);
                    else
                        new_deal_tiles[i].push(tmp_fulu.ming_tile);
            }
            for (let i = 0; i < player_count; i++)
                for (const discard_tile of new_discard_tiles[i])
                    if (!discard_tile.moqie)
                        new_deal_tiles[i].push(discard_tile.tile);
            new_discard_tiles[zhuang_seat].unshift(first_tile);
            for (let i = 0; i < player_count; i++)
                new_deal_tiles[i].push(...separate(json['tiles' + i]));

            const dora = json.dora;
            const li_dora = json.li_dora;
            while (li_dora.length < dora.length)
                li_dora.push('.');
            let zhishipais = '';
            for (let i = dora.length - 1; i >= 0; i--)
                zhishipais += li_dora[i] + dora[i];
            if (player_count === 3)
                zhishipais += '....';

            for (let i = 0; i < player_count; i++) {
                let num = 13;
                if (zhuang_seat === i)
                    num = 14;
                for (let j = 0; j < num && new_deal_tiles[i].length > 0; j++)
                    begin_tiles[i] += new_deal_tiles[i].shift();
            }

            randomPaishan('', zhishipais + '....');

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

        let seat = json.ju;
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
                if (!new_discard_tiles[seat][0].moqie || nxt_step === 'angang')
                    tile = new_deal_tiles[seat].shift();

                mopai(seat, tile);
            }

            // 先看其他家谁可以鸣主视角的牌, 再看主视角自己切什么牌
            function new_qiepai() {
                const tile_info = new_discard_tiles[seat].shift();
                const para_tile = tile_info.moqie ? undefined : tile_info.tile;
                const tile = tile_info.tile;

                qiepai(seat, para_tile, tile_info.is_liqi);

                // 明杠, 碰
                const op = ['minggang', 'peng'];
                for (const j in op)
                    for (let i = seat + 1; i < seat + player_count; i++) {
                        const tmp_seat = i % player_count;
                        const tmp_fulu = fulus_info[tmp_seat][0];
                        if (tmp_fulu && tmp_fulu.type === op[j] && tmp_fulu.from === seat && isEqualTile(tmp_fulu.ming_tile, tile)) {
                            nxt_step = op[j];
                            seat = tmp_seat;
                            return;
                        }
                    }

                const tmp_seat = (seat + 1) % player_count, tmp_fulu = fulus_info[tmp_seat][0];
                if (tmp_fulu && tmp_fulu.type === 'chi' && tmp_fulu.from === seat && isEqualTile(tmp_fulu.ming_tile, tile)) {
                    nxt_step = 'chi';
                    seat = tmp_seat;
                    return;
                }

                nxt_step = 'mopai';
                seat = (seat + 1) % player_count;
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
    })();
