clearProject();

player_datas[0] = {
    nickname: 'SirLancelot',
    avatar_id: 405902, // 柚-契约
    title: 600009, // 魂之启迪者·中阶
    views: [
        {slot: 0, item_id: 305042}, // 立直棒-雪糕
        {slot: 1, item_id: 305008}, // 和牌-旋风
        {slot: 2, item_id: 305032}, // 立直-幻影
    ]
};
player_datas[1] = {
    nickname: 'phigroS',
    avatar_id: 400201, // 二阶堂美树
    views: [
        {slot: 0, item_id: 308018}, // 立直棒-恋之反省
        {slot: 1, item_id: 305008}, // 和牌-旋风
        {slot: 2, item_id: 308007}, // 立直-纸牌花火
    ]
};
player_datas[2] = {
    nickname: '北雨听海',
    avatar_id: 402602, // 雏桃-契约
    title: 600006, // 魂之契约者-中阶
    views: [
        {slot: 0, item_id: 305003}, // 狗骨头立直棒
        {slot: 1, item_id: 305209}, // 和牌-安可
        {slot: 2, item_id: 305316}, // 立直-鹿雪冬至
    ]
};
player_datas[3] = {
    nickname: '我要考不上了',
    avatar_id: 401004, // 卡维-拂晓的G大调
    views: [
        {slot: 0, item_id: 305028}, // 立直棒-饺子
        {slot: 1, item_id: 308026}, // 和牌-绝对的命令
    ]
};

setConfig({
    category: 4,
    meta: {mode_id: 0},
    mode: {
        mode: 2,
        detail_rule: {
            _mainrole_: 2,
        }
    }
});

const player_count = 4;

const jsons = [
    { // 东1局0本场
        ju: 0,
        tiles0: '234789m12344p23s',
        tiles1: '456m06678p22345s',
        tiles2: '05m77999p134788s',
        tiles3: '1s7z', // 防止听牌的牌
        lst_mopai: '',
        dora: ['1m'],
        li_dora: [],
        paihe0: '4z2z6z6z8s6p 1m9s3p4m1pr1zg 2zg3zg6sg2zg9mg5pg',
        paihe1: '2z1m2p4z6m2mr 3mg5mg2sg1zg1mg2pg 6mg2mg7mg1zg6zg9pg',
        paihe2: '4z1s9m7z4z6z 2m2p9s9s1z4m 3m3z6s7z1p',
        paihe3: '5z5z7z1s3p8p 3m8p8m7m3p1p 9m3z6s6s3z',
        fulu0: [],
        fulu1: [],
        fulu2: [],
        fulu3: [],
        end_mode: 0,
        hu_seat: [],
        first_op: 0,
    }, // 东1局0本场
    { // 东1局1本场
        ju: 0,
        tiles0: '1366s',
        tiles1: '1z2z', // 防止听牌的牌
        tiles2: '455m0557p224469s',
        tiles3: '56m456678p22340s',
        lst_mopai: '',
        dora: ['2p', '4s'],
        li_dora: [],
        paihe0: '4z8p2m2m6z3m 1p3z5z7m8s7m 4z1m4p5s6z2m7s1p',
        paihe1: '3z1z9s6z9p9s1s 5z8m2z4m9s7m9p 4p8s2p8m1p',
        paihe2: '9m6z2z4z8p1s 7z7z9p4z7m8s9p 4p5s7s6m',
        paihe3: '3z2z2p1s1m2m 9m9m5z1m3m8s 9m7sr6mg5zg',
        fulu0: ['11_1z', '7_77z', '88_8m'],
        fulu1: ['3333p'],
        fulu2: [],
        fulu3: [],
        end_mode: 0,
        hu_seat: [],
        first_op: 0,
    }, // 东1局1本场
    { // 东1局2本场
        ju: 0,
        tiles0: '',
        tiles1: '6777899m406p',
        tiles2: '6m2234578p56888s',
        tiles3: '',
        lst_mopai: '',
        dora: ['2z'],
        li_dora: [],
        paihe0: '2z1m8m3z6p1z 7p4p4z7m',
        paihe1: '1s8p1s1z3z5z 6z2z4s7s',
        paihe2: '9m7z9p1z3z6z 9s9s2m1m',
        paihe3: '7z9m1m2m1s1m4z 9s4z3p',
        fulu0: [],
        fulu1: ['7_77z'],
        fulu2: [],
        fulu3: [],
        end_mode: 1,
        hu_seat: [1],
        first_op: 0,
    }, // 东1局2本场
    { // 东2局0本场
        ju: 1,
        tiles0: '',
        tiles1: '',
        tiles2: '11123p06s',
        tiles3: '',
        lst_mopai: '',
        dora: ['1s'],
        li_dora: [],
        paihe0: '3z1m5z6z3p9s9s 2z6p1p4s',
        paihe1: '9s8m4z5z3s9m1s 5z8s3m',
        paihe2: '1m8m1z7z7p5s4p1z8s 5s3s',
        paihe3: '2p1m5z4z2z3z 3m3z7m4z',
        fulu0: ['7_77z'],
        fulu1: [],
        fulu2: ['6_66z', '_324s'],
        fulu3: ['_111z', '_567s', '_546s'],
        end_mode: 1,
        hu_seat: [2],
        first_op: 0,
    }, // 东2局0本场
    { // 东3局0本场
        ju: 2,
        tiles0: '',
        tiles1: '',
        tiles2: '12305m123p12367s',
        tiles3: '',
        lst_mopai: '8s',
        dora: ['1m', '1p'],
        li_dora: ['9s', '7z'],
        paihe0: '1p6z4z7z3z1z 3z1p4p7p5z',
        paihe1: '1m1m3z5z8m4z 7m4p5z3p3p',
        paihe2: '6z7p5pr2zg6zg4zg 8pg2zg5zg2pg2pg',
        paihe3: '6z1s8p8p7z8m 1z1z4z4p3p',
        fulu0: ['9999m'],
        fulu1: [],
        fulu2: [],
        fulu3: [],
        end_mode: 1,
        hu_seat: [2],
        first_op: 0,
    }, // 东3局0本场
    { // 东3局1本场
        ju: 2,
        tiles0: '',
        tiles1: '',
        tiles2: '45789m456p22456s',
        tiles3: '',
        lst_mopai: '',
        dora: ['3p'],
        li_dora: [],
        paihe0: '4z2z1p8m1z7z 9p9m1s6z9s8s 5z6z9p9s7p',
        paihe1: '1p1m3z1s9p8m 7z4z7s4s4z8s 8s4p9s7p2z',
        paihe2: '3z5z8p1s3z1z 2m1m7sr4sg7zg6zg 4sg4pg6zg9mg3sg5sg',
        paihe3: '4z5z1z9p2s7z 2p9s1m2m2m2m 7s2z7p7p3s3s',
        fulu0: [],
        fulu1: [],
        fulu2: [],
        fulu3: [],
        end_mode: 0,
        hu_seat: [],
        first_op: 0,
    }, // 东3局1本场
    { // 东3局2本场
        ju: 2,
        tiles0: '12456m66z',
        tiles1: '',
        tiles2: '24m88p56s1z',
        tiles3: '',
        lst_mopai: '3m',
        dora: ['7p'],
        li_dora: [],
        paihe0: '1s7p3p5z1s4s 7s6p8s6m7z1p2m',
        paihe1: '9s3z1m1p5m7m 9m9p3p1p0p8p',
        paihe2: '3z4z5p9p8m3z 5p1m8s9s9p7m 3p2p',
        paihe3: '9p4z1p5z1z8m8s8m 2s5z8p2p4z1m',
        fulu0: ['_879m', '_867s'],
        fulu1: [],
        fulu2: ['6_66m', '_067p'],
        fulu3: [],
        end_mode: 1,
        hu_seat: [0],
        first_op: 0,
    }, // 东3局2本场
    { // 东4局0本场
        ju: 3,
        tiles0: '',
        tiles1: '',
        tiles2: '23405m789p66778s',
        tiles3: '89m99p666z',
        lst_mopai: '',
        dora: ['5s'],
        li_dora: [],
        paihe0: '1z1z9p2z1s2p1s 4m2s7m9s9s7m 4m2m1p2s5p',
        paihe1: '1m3m3z5s4p2z 4z2p1p3m8p8p 8p8m8m7p5p7p',
        paihe2: '9m4z4p1mr2pg3mg4mg 4pg2zg9sg1pg1mg1sg 2mg4sg6sg6sg9mg',
        paihe3: '9s3z5p6m4z3z 1s2s2s2p1p9m 7m7m8m3z5m0p5z',
        fulu0: [],
        fulu1: ['_111z'],
        fulu2: [],
        fulu3: ['_312m', '_640s'],
        end_mode: 0,
        hu_seat: [],
        first_op: 0,
    }, // 东4局0本场
    { // 东4局1本场
        ju: 3,
        tiles0: '',
        tiles1: '',
        tiles2: '1112p340s',
        tiles3: '234m4577s',
        lst_mopai: '6s',
        dora: ['8m'],
        li_dora: [],
        paihe0: '4z5z8s5p9s7m4p 5m4m9s9p4p6p',
        paihe1: '9m5z1s9m3z7z0m 8s7p8s3z4s',
        paihe2: '9s8m7m9p4z5s4p 1s6p7s3z2z8p',
        paihe3: '9p4z6z1m1m1s2z 7m8s7p8m7z4s',
        fulu0: ['_123s'],
        fulu1: [],
        fulu2: ['5_55z', '_777z'],
        fulu3: ['_435p', '_657p'],
        end_mode: 1,
        hu_seat: [3],
        first_op: 0,
    }, // 东4局1本场
    { // 东4局2本场
        ju: 3,
        tiles0: '',
        tiles1: '',
        tiles2: '77m44p22445577s5z',
        tiles3: '',
        lst_mopai: '',
        dora: ['3p'],
        li_dora: [],
        paihe0: '4z3z1p2z8m3p 6s1z2p7z9s8p 7p5p1s1s6p5z',
        paihe1: '9m1z2z6z3s9s 9s7s1m6s9p1p 1z4z3s3z4z',
        paihe2: '1z7z8p2p7z1p 6m5m9m7p4s7s 3s3m8m6z6p',
        paihe3: '4z3z1p1s9m8p 6s9p2z9m7z1m 2m3s6m9p4s',
        fulu0: ['3_33m'],
        fulu1: ['_534p', '_657p'],
        fulu2: [],
        fulu3: ['_888m', '_666z'],
        end_mode: 1,
        hu_seat: [2],
        first_op: 0,
    }, // 东4局2本场
    { // 南1局0本场
        ju: 0,
        tiles0: '67m340p66z',
        tiles1: '',
        tiles2: '20667m2p4466778s',
        tiles3: '40689s66z',
        lst_mopai: '',
        dora: ['5z'],
        li_dora: [],
        paihe0: '2z1s7z1m1z9p 1p3s3m2s7z1p8p 4m7z3z9m9m9m2p',
        paihe1: '1s1p5z1z8s2s 2p2z3z5z9p7z1z 1m1m5p8m3m',
        paihe2: '1s1z7p5m9p9s 3p1s2m2s4z4z 2s9p1m9s3m',
        paihe3: '2m4p5p3p8m5z 2m4z2p9s7p7m 4m8s1p7p7p3m5s',
        fulu0: ['_768p', '_768p'],
        fulu1: [],
        fulu2: [],
        fulu3: ['33_3s', '3_33z'],
        end_mode: 0,
        hu_seat: [],
        first_op: 0,
    }, // 南1局0本场
    { // 南1局1本场
        ju: 0,
        tiles0: '',
        tiles1: '',
        tiles2: '1678m444s555z',
        tiles3: '567m5688s',
        lst_mopai: '',
        dora: ['7z'],
        li_dora: [],
        paihe0: '4z9m8m1z2z1p 6s9s5m',
        paihe1: '1z3z6z7p4s8s2s 9m7s',
        paihe2: '1p3z7z1z7s4p2m6p',
        paihe3: '1s9s1z6z7z8p 5s6m',
        fulu0: [],
        fulu1: [],
        fulu2: ['_423s'],
        fulu3: ['_456p', '_234m'],
        end_mode: 1,
        hu_seat: [3],
        first_op: 0,
    }, // 南1局1本场
    { // 南2局0本场
        ju: 1,
        tiles0: '',
        tiles1: '',
        tiles2: '36678m4678p1377s',
        tiles3: '1123p777z',
        lst_mopai: '4p',
        dora: ['5z'],
        li_dora: [],
        paihe0: '1z4z2s6z8s3p 3p5m5pr5z5s6p',
        paihe1: '1s4z9m1p8m8m 2z5z6z9s9p9p 9p',
        paihe2: '1z4z9m1p1m1s 5s5m8s2p2z0s2p',
        paihe3: '1z9m2z7p5p6s 4s4m5p9s9s9s',
        fulu0: [],
        fulu1: ['_534p'],
        fulu2: [],
        fulu3: ['_534s', '_546m'],
        end_mode: 1,
        hu_seat: [3],
        first_op: 0,
    }, // 南2局0本场
    { // 南3局0本场
        ju: 2,
        tiles0: '',
        tiles1: '',
        tiles2: '89m567s33z',
        tiles3: '',
        lst_mopai: '',
        dora: ['6p'],
        li_dora: [],
        paihe0: '2m6z8m3s7z1s3s 8s9p',
        paihe1: '5z6z1m3z1s1z 9p8p',
        paihe2: '1p4m6z7z2m5m 4p2z8s7p5p',
        paihe3: '5z6z4z3z2z2p 1s1s2s5m7m',
        fulu0: [],
        fulu1: [],
        fulu2: ['7_77z', '22_2s'],
        fulu3: [],
        end_mode: 1,
        hu_seat: [2],
        first_op: 0,
    }, // 南3局0本场
    { // 南3局1本场
        ju: 2,
        tiles0: '',
        tiles1: '',
        tiles2: '44999m067p35789s',
        tiles3: '',
        lst_mopai: '',
        dora: ['2s'],
        li_dora: ['7p'],
        paihe0: '2z1p1z9s6m5z 2z2z7z8m9s7mr 4pg9pg4sg',
        paihe1: '3z0s1z7p4z5z 1p9p2s3p3z1s 6m7m',
        paihe2: '2z6z7m4z6z2s 9p2p5sr3pg6zg1sg 6mg5pg7mg',
        paihe3: '1s3z7z1z8m8p 9p9s2p4z4z5z 3m5p3m',
        fulu0: [],
        fulu1: [],
        fulu2: [],
        fulu3: [],
        end_mode: 1,
        hu_seat: [2],
        first_op: 0,
    }, // 南3局1本场
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
