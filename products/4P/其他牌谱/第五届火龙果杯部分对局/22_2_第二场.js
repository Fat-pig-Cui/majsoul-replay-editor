clearProject();

player_datas[0] = {
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
player_datas[1] = {
    nickname: '英梨梨',
    avatar_id: 401902, // 小鸟游雏田-契约
    title: 600002, // 原初之火
    avatar_frame: 305500, // 头像框-豆芽
    views: [
        {slot: 0, item_id: 305018}, // 猩红立直棒
        {slot: 2, item_id: 305300}, // 立直-蝙蝠桀桀
    ]
};
player_datas[2] = {
    nickname: '无海无风',
    avatar_id: 400201, // 二阶堂美树
    views: [
        {slot: 0, item_id: 305001}, // 咸鱼立直棒
    ]
};
player_datas[3] = {
    nickname: '北雨听海',
    avatar_id: 402602, // 雏桃-契约
    title: 600006, // 魂之契约者-中阶
    views: [
        {slot: 0, item_id: 305042}, // 立直棒-雪糕
        {slot: 1, item_id: 305209}, // 和牌-安可
        {slot: 2, item_id: 305316}, // 立直-鹿雪冬至
    ]
};

setConfig({
    category: 4,
    meta: {mode_id: 0},
    mode: {
        mode: 2,
        detail_rule: {
            _mainrole_: 3,
        }
    }
});

const player_count = 4;

const jsons = [
    { // 东1局0本场
        ju: 0,
        tiles0: '',
        tiles1: '',
        tiles2: '',
        tiles3: '6677899m456p234s',
        lst_mopai: '5m',
        dora: ['8s'],
        li_dora: ['1m'],
        paihe0: '3z4z5z6z8m1z 1z1p3s4p2p1m8s 2z7p3m',
        paihe1: '5z7z7p2s5p8m 9m2z3m2m6s5z 0p3z4m1s',
        paihe2: '2z9m6z3z7z3z 1p1m2s1z6s2s 4zr8sg7mg4sg',
        paihe3: '2z7z4z1m4m7p 1z4p4z8p8s1p 6z2pr3sg',
        fulu0: [],
        fulu1: ['_222p'],
        fulu2: [],
        fulu3: [],
        end_mode: 1,
        hu_seat: [3],
        first_op: 0,
    }, // 东1局0本场
    { // 东2局0本场
        ju: 1,
        tiles0: '444789m67p66s',
        tiles1: '',
        tiles2: '',
        tiles3: '666m23479p33344s',
        lst_mopai: '8p',
        dora: ['3m'],
        li_dora: [],
        paihe0: '1z7z4z7z2s4p 7s',
        paihe1: '4z7z9s1s2s3z 6z6z',
        paihe2: '1z8s9m4z2z2s 1p',
        paihe3: '9s1z5m1p7s3m 9p',
        fulu0: ['66_6z'],
        fulu1: [],
        fulu2: [],
        fulu3: [],
        end_mode: 1,
        hu_seat: [0],
        first_op: 0,
    }, // 东2局0本场
    { // 东3局0本场
        ju: 2,
        tiles0: '',
        tiles1: '',
        tiles2: '',
        tiles3: '123m406p234s3355z',
        lst_mopai: '3z',
        dora: ['4p'],
        li_dora: ['9s'],
        paihe0: '4z3m4z7m8s2p',
        paihe1: '1z7z8p1m1m8s',
        paihe2: '4z7p7z7z2s2p',
        paihe3: '9p2z7mr2mg2pg',
        fulu0: ['11_1z'],
        fulu1: [],
        fulu2: [],
        fulu3: [],
        end_mode: 1,
        hu_seat: [3],
        first_op: 0,
    }, // 东3局0本场
    { // 东4局0本场
        ju: 3,
        tiles0: '',
        tiles1: '',
        tiles2: '40688p12356s',
        tiles3: '8m2289p79s111z',
        lst_mopai: '',
        dora: ['5z'],
        li_dora: [],
        paihe0: '9s4z8m2z1s3p 4s',
        paihe1: '4z8s9s6z2s9m',
        paihe2: '2p5z3s4m7z',
        paihe3: '3z4z2m6m6z1m4p',
        fulu0: ['_456p'],
        fulu1: [],
        fulu2: ['_666z'],
        fulu3: ['9_99m'],
        end_mode: 1,
        hu_seat: [2],
        first_op: 0,
    }, // 东4局0本场
    { // 南1局0本场
        ju: 0,
        tiles0: '',
        tiles1: '456m33567p12356s',
        tiles2: '',
        tiles3: '2334567m27p1235s',
        lst_mopai: '4s',
        dora: ['1z'],
        li_dora: ['1s'],
        paihe0: '3z1p7z8p6z8p 6p8m9m1z9s9p 8s3s8m',
        paihe1: '8m1m5m8p9m8s2zr 6zg4pg9sg4zg3zg3sg 4pg',
        paihe2: '2s1p3p4s6p4z 2z1m1z4z9p5p 5z9m8m',
        paihe3: '7z1p8s6z5z8s7s1m6z4p7z1m7z 0p2z',
        fulu0: [],
        fulu1: [],
        fulu2: ['55_5z', '_879s'],
        fulu3: [],
        end_mode: 1,
        hu_seat: [1],
        first_op: 0,
    }, // 南1局0本场
    { // 南2局0本场
        ju: 1,
        tiles0: '',
        tiles1: '',
        tiles2: '67m556677p66789s',
        tiles3: '55m2233468p6679s',
        lst_mopai: '',
        dora: ['8m'],
        li_dora: [],
        paihe0: '5z8m2m1m1p2p 3s3s6m4z2s8s 9p1s2s4z1z',
        paihe1: '1p2z6z7z1p4p 2m4s2s3z3z6z 7m5z9p9p2s1z',
        paihe2: '1s1m1z6z1p2z 1m6m5zr4mg3sg1sg 7zg8sg4sg1mg5sg3zg',
        paihe3: '4z9s1s5z9p8m 3z9m7z2z4m3m 9m2m8s7z5s',
        fulu0: [],
        fulu1: [],
        fulu2: [],
        fulu3: [],
        end_mode: 0,
        hu_seat: [],
        first_op: 0,
    }, // 南2局0本场
    { // 南3局1本场
        ju: 2,
        tiles0: '',
        tiles1: '',
        tiles2: '55777789m46888p',
        tiles3: '40668m33p234566s',
        lst_mopai: '',
        dora: ['4s'],
        li_dora: ['2p'],
        paihe0: '4z9m6z2p1s1s 9s9s7p1s8s1z',
        paihe1: '9m6z5z8m1p7z 2p2p9m8p2m5p',
        paihe2: '1p5z6z3z7sr4sg 3mg4pg9pg2zg3pg6pg',
        paihe3: '9s6z1z7z1p7s 7s1z3m9p2z7p',
        fulu0: [],
        fulu1: [],
        fulu2: [],
        fulu3: [],
        end_mode: 1,
        hu_seat: [2],
        first_op: 0,
    }, // 南3局1本场
    { // 南3局2本场
        ju: 2,
        tiles0: '',
        tiles1: '',
        tiles2: '',
        tiles3: '44789m23468p123s',
        lst_mopai: '',
        dora: ['3p'],
        li_dora: ['4p'],
        paihe0: '4z2z7z4z2p3z 2m1p9p8m8m1p 8s6m4m2z7z3p',
        paihe1: '1z5z1s1s9s7s1m6z 6z2m8m1m5m7z 2p3m3pr7pg',
        paihe2: '9m2m4z8p1p7z 3z0m6z9p9p8s 3z5p5m9m3m7s',
        paihe3: '4z1p2z9m7s9p 2p5mr2zg6zg9sg1mg 2mg6mg4mg5zg7mg6mg',
        fulu0: [],
        fulu1: [],
        fulu2: ['_111z', '_789s'],
        fulu3: [],
        end_mode: 1,
        hu_seat: [3],
        first_op: 0,
    }, // 南3局2本场
    { // 南4局0本场
        ju: 3,
        tiles0: '',
        tiles1: '',
        tiles2: '',
        tiles3: '666m22266p22245s',
        lst_mopai: '3s',
        dora: ['3p'],
        li_dora: [],
        paihe0: '1s1p1m5z8s4s 6z3z9m8m7m1m 4z3m',
        paihe1: '9s5z7m8m4z7m 6s2z7p4p3z7p6m1m',
        paihe2: '5z8p7s7s6z1p 8m9p0m8s1z1m 9m',
        paihe3: '9m5z7z6z1p8m 1p1z6z9m8p4z 7z',
        fulu0: ['77_7p'],
        fulu1: [],
        fulu2: ['_435p'],
        fulu3: [],
        end_mode: 1,
        hu_seat: [3],
        first_op: 0,
    }, // 南4局0本场
    { // 南4局1本场
        ju: 3,
        tiles0: '',
        tiles1: '345m77p33405s',
        tiles2: '',
        tiles3: '589m1239p14688s6z',
        lst_mopai: '',
        dora: ['7p'],
        li_dora: [],
        paihe0: '1z3z7z5z5p',
        paihe1: '1z5z9s7s8p',
        paihe2: '9m7z2z8s4s',
        paihe3: '4z1m1z3z7z',
        fulu0: [],
        fulu1: ['_534p'],
        fulu2: ['_555z', '_768s'],
        fulu3: [],
        end_mode: 1,
        hu_seat: [1],
        first_op: 0,
    }, // 南4局1本场
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
