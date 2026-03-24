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
    nickname: '卡之维比',
    avatar_id: 401004, // 卡维-拂晓的G大调
    title: 600015, // 猫粮供应商
    avatar_frame: 305537, // 头像框-圣堂百合
    views: [
        {slot: 0, item_id: 305003}, // 狗骨头立直棒
        {slot: 1, item_id: 305200}, // 和牌-幽灵嗷嗷
        {slot: 2, item_id: 305300}, // 立直-蝙蝠桀桀
    ]
};
player_datas[2] = {
    nickname: '英梨梨',
    avatar_id: 401902, // 小鸟游雏田-契约
    title: 600002, // 原初之火
    avatar_frame: 305500, // 头像框-豆芽
    views: [
        {slot: 0, item_id: 305018}, // 猩红立直棒
        {slot: 2, item_id: 305300}, // 立直-蝙蝠桀桀
    ]
};
player_datas[3] = {
    nickname: '无海无风',
    avatar_id: 400201, // 二阶堂美树
    views: [
        {slot: 0, item_id: 305001}, // 咸鱼立直棒
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
        tiles0: '30688m66p233s',
        tiles1: '',
        tiles2: '',
        tiles3: '3577m234067p',
        lst_mopai: '',
        dora: ['5z'],
        li_dora: [],
        paihe0: '2z3z4z9s8p3z 1z9m9p0s2p2p 1m8p',
        paihe1: '1s9s1p5z1z7z7z 9p9m7p3z1p1m 8s',
        paihe2: '2z4z9p9m4p2mr 1pg7pg2pg1mg5sg6zg4mg',
        paihe3: '9s5z9s2z1z8m 4s7s5s5z2z1p',
        fulu0: ['6_66z'],
        fulu1: [],
        fulu2: [],
        fulu3: ['7_77z'],
        end_mode: 1,
        hu_seat: [3],
        first_op: 0,
    }, // 东1局0本场
    { // 东2局0本场
        ju: 1,
        tiles0: '78m4466899p4499s',
        tiles1: '',
        tiles2: '678m22406p07s',
        tiles3: '',
        lst_mopai: '',
        dora: ['7p'],
        li_dora: [],
        paihe0: '1s5m5m1m4z3m 7p',
        paihe1: '1z1m1z4z7z8s 9s6s',
        paihe2: '6z6z2m1p1s8s 6m3m',
        paihe3: '1s9s6z6m2s5z4m 8s',
        fulu0: [],
        fulu1: [],
        fulu2: ['22_2s'],
        fulu3: [],
        end_mode: 1,
        hu_seat: [2],
        first_op: 0,
    }, // 东2局0本场
    { // 东3局0本场
        ju: 2,
        tiles0: '77m33s',
        tiles1: '',
        tiles2: '',
        tiles3: '',
        lst_mopai: '',
        dora: ['7s', '6s'],
        li_dora: [],
        paihe0: '4m6s3p2z0p7p8p6z2s6z4z4m 5z5s6m4p',
        paihe1: '1m9s1z9m5p5z7p 8m2s1z2s2p6m 4s3p3s',
        paihe2: '2z9m6z1z3z7z5z 6z2m4m3z5s2m 8p5s',
        paihe3: '8m4z1z2m9s4z3z 7s3m1m7p7p4z 4p',
        fulu0: ['99_9m', '_999s', '7_7^77z'],
        fulu1: [],
        fulu2: ['_345p'],
        fulu3: [],
        end_mode: 1,
        hu_seat: [0],
        first_op: 0,
    }, // 东3局0本场
    { // 东4局0本场
        ju: 3,
        tiles0: '2m125577p23068s4z',
        tiles1: '23334567m23445s',
        tiles2: '',
        tiles3: '',
        lst_mopai: '3s',
        dora: ['3z'],
        li_dora: ['6z'],
        paihe0: '9s5z7z7z2z9s8p 7m5z',
        paihe1: '3z6z1p1s8p9p 1mr',
        paihe2: '1p8p4p7z1z1m 1s8m9p',
        paihe3: '3z6z5z8m9m9sr8mg 3pg1mg4mg',
        fulu0: [],
        fulu1: [],
        fulu2: ['99_9m', '2_22z'],
        fulu3: [],
        end_mode: 1,
        hu_seat: [1],
        first_op: 0,
    }, // 东4局0本场
    { // 南1局0本场
        ju: 0,
        tiles0: '',
        tiles1: '',
        tiles2: '',
        tiles3: '678m44456p40s',
        lst_mopai: '',
        dora: ['4z'],
        li_dora: [],
        paihe0: '3z5p5s4m2m3m 2m4s',
        paihe1: '5m7p2m6s4m6s 5z2p6s',
        paihe2: '3z2z1p4z3m3s3p',
        paihe3: '9p1s4m3z5z7m1z',
        fulu0: ['_978p'],
        fulu1: ['33_3p'],
        fulu2: [],
        fulu3: ['2_22p'],
        end_mode: 1,
        hu_seat: [3],
        first_op: 0,
    }, // 南1局0本场
    { // 南2局0本场
        ju: 1,
        tiles0: '226679m123p0558s',
        tiles1: '123567m11789p56s',
        tiles2: '',
        tiles3: '',
        lst_mopai: '4s',
        dora: ['7z'],
        li_dora: ['6p'],
        paihe0: '1z3z1s2z8p9s5z',
        paihe1: '9s4z2s3m3zr4zg',
        paihe2: '4z9m9p9s5zr3sg',
        paihe3: '8m1z1m6z4p3z 2s',
        fulu0: [],
        fulu1: [],
        fulu2: [],
        fulu3: ['22_2z'],
        end_mode: 1,
        hu_seat: [1],
        first_op: 0,
    }, // 南2局0本场
    { // 南2局1本场
        ju: 1,
        tiles0: '23m3477p2340s114z',
        tiles1: '68m678p33566778s',
        tiles2: '',
        tiles3: '',
        lst_mopai: '',
        dora: ['5p'],
        li_dora: [],
        paihe0: '3z9p9p5z9s2z9p',
        paihe1: '1p9p6z9m2m4m 2s',
        paihe2: '1z3z6z7z2p8p 8s9s',
        paihe3: '1s1p5z8s6z1m 3m7m',
        fulu0: [],
        fulu1: [],
        fulu2: ['2_22z'],
        fulu3: [],
        end_mode: 1,
        hu_seat: [1],
        first_op: 0,
    }, // 南2局1本场
    { // 南2局2本场
        ju: 1,
        tiles0: '66m45s',
        tiles1: '',
        tiles2: '',
        tiles3: '',
        lst_mopai: '',
        dora: ['1p'],
        li_dora: [],
        paihe0: '3z1s2z7z8s8m1p 7m1m2m9s1s9p 7p7z9p',
        paihe1: '3z8p8m9m2p7s 2p4m1z9s1z8s 7m7p2z9s',
        paihe2: '1z4z9p1p3s7z3m 7z1m8s8p5p5z8mr 5zg7sg',
        paihe3: '9s2z9m1p5m8p3m 5s4s8m1m4m4p4p 4z3s',
        fulu0: ['4_44z', '_534m', '_430p'],
        fulu1: [],
        fulu2: [],
        fulu3: ['33_3z', '_534p'],
        end_mode: 1,
        hu_seat: [0],
        first_op: 0,
    }, // 南2局2本场
    { // 南3局0本场
        ju: 2,
        tiles0: '4066m789p4599s66z',
        tiles1: '',
        tiles2: '2346688m344556p',
        tiles3: '',
        lst_mopai: '8m',
        dora: ['8m'],
        li_dora: ['5z'],
        paihe0: '4z1s2z7z3z2m 1m1z5m4p8s7z 7z5z9p2z',
        paihe1: '4z2z6z5m9m4z 9m1s8p2s1z8s 1z2m7s2p',
        paihe2: '3z1p9s7s4s3s 9p5z1m2s1m7z 8p4m9mr2pg',
        paihe3: '4z1z9p5z8s7m 3z8p2m5p2zr5sg 7mg7pg7sg7mg',
        fulu0: [],
        fulu1: [],
        fulu2: [],
        fulu3: [],
        end_mode: 1,
        hu_seat: [2],
        first_op: 0,
    }, // 南3局0本场
    { // 南3局1本场
        ju: 2,
        tiles0: '1124m1124567p45s',
        tiles1: '',
        tiles2: '44m23789p234s',
        tiles3: '',
        lst_mopai: '4p',
        dora: ['7z'],
        li_dora: [],
        paihe0: '1z1s6z7s5z2z 4s',
        paihe1: '9s8p7p5z7m9m 6p',
        paihe2: '4z3z9m6z8s2p 5m2p',
        paihe3: '8m1z2m3z3m7z3p 6p',
        fulu0: [],
        fulu1: [],
        fulu2: ['77_7z'],
        fulu3: [],
        end_mode: 1,
        hu_seat: [2],
        first_op: 0,
    }, // 南3局1本场
    { // 南3局2本场
        ju: 2,
        tiles0: '340789m678p5578s',
        tiles1: '',
        tiles2: '',
        tiles3: '340p5z',
        lst_mopai: '5z',
        dora: ['2s'],
        li_dora: [],
        paihe0: '1z9p4z4pr6zg8sg4zg',
        paihe1: '4z2z8m5m8p7z4sr',
        paihe2: '1p6z2p9p8p4s3z',
        paihe3: '4z7s5m2s1z4s 7z',
        fulu0: [],
        fulu1: [],
        fulu2: [],
        fulu3: ['2_22z', '_978p', '_867p'],
        end_mode: 1,
        hu_seat: [3],
        first_op: 0,
    }, // 南3局2本场
    { // 南4局0本场
        ju: 3,
        tiles0: '666m789p3445677s',
        tiles1: '',
        tiles2: '',
        tiles3: '',
        lst_mopai: '',
        dora: ['8p', '5z'],
        li_dora: ['6z', '1m'],
        paihe0: '1p3z1p9m9m4p 1s2m4m2p9pr7mg8pg 4pg1mg8pg8mg8mg',
        paihe1: '1s8s2z6z1p5z 9s6z7z6p2p1p 7z5z2m2z3m',
        paihe2: '1z1z2z3z5z4z 6z1m1z4s9m8m 7s5p3m8s2s',
        paihe3: '3z4z9s3p7z1m 5p2z4m6p1s9p 1s9p8m6m3z4z',
        fulu0: [],
        fulu1: [],
        fulu2: [],
        fulu3: ['77_7^7m', '_567p'],
        end_mode: 1,
        hu_seat: [0],
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
