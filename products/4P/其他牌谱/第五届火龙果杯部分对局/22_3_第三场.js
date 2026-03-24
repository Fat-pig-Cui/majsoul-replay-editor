clearProject();

player_datas[0] = {
    nickname: '英梨梨',
    avatar_id: 401902, // 小鸟游雏田-契约
    title: 600002, // 原初之火
    avatar_frame: 305500, // 头像框-豆芽
    views: [
        {slot: 0, item_id: 305018}, // 猩红立直棒
        {slot: 2, item_id: 305300}, // 立直-蝙蝠桀桀
    ]
};
player_datas[1] = {
    nickname: '北雨听海',
    avatar_id: 402602, // 雏桃-契约
    title: 600006, // 魂之契约者-中阶
    views: [
        {slot: 0, item_id: 305042}, // 立直棒-雪糕
        {slot: 1, item_id: 305209}, // 和牌-安可
        {slot: 2, item_id: 305316}, // 立直-鹿雪冬至
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
    nickname: '卡之维比',
    avatar_id: 401004, // 卡维-拂晓的G大调
    title: 600015, // 猫粮供应商
    avatar_frame: 305537, // 头像框-圣堂百合
    views: [
        {slot: 0, item_id: 308018}, // 立直棒-恋之反省
        {slot: 1, item_id: 305200}, // 和牌-幽灵嗷嗷
        {slot: 2, item_id: 305300}, // 立直-蝙蝠桀桀
    ]
};

setConfig({
    category: 4,
    meta: {mode_id: 0},
    mode: {
        mode: 2,
        detail_rule: {
            _mainrole_: 1,
        }
    }
});

const player_count = 4;

const jsons = [
    { // 东1局0本场
        ju: 0,
        tiles0: '789m12340678p11s',
        tiles1: '2267m406789s',
        tiles2: '45p11166z',
        tiles3: '',
        lst_mopai: '',
        dora: ['4m', '6p'],
        li_dora: [],
        paihe0: '9s7s1p3m4m6z 3s4m4m3s2p5s 1p7z6s3m7mr6mg',
        paihe1: '4z9m9p9p5z2z 8p1z7z8p8p2s6m 3zr5sg7sg6sg',
        paihe2: '3s2m2p4s3p9s 5m0m2z3z4z8s 2s4z8s6s7s5p',
        paihe3: '2z4z5z3p3z2m 4z9m9p9p4s5z 3p2p2z8s9s5p',
        fulu0: [],
        fulu1: ['1111m'],
        fulu2: ['_867p', '7_77z'],
        fulu3: [],
        end_mode: 0,
        hu_seat: [],
        first_op: 0,
    }, // 东1局0本场
    { // 东1局1本场
        ju: 0,
        tiles0: '',
        tiles1: '2346677m2346p05s',
        tiles2: '2233899m77p99s66z',
        tiles3: '',
        lst_mopai: '8m',
        dora: ['7m'],
        li_dora: ['5m'],
        paihe0: '4z5z6z1p9p3z 3z7s2s1m1m1m 1s1p',
        paihe1: '3z7z9p8p2p7z 3s8s8s2s7z9s 7z4s',
        paihe2: '2p9p9m6sr1zg6sg 1sg4zg1zg6sg6zg1pg 3sg',
        paihe3: '1s5z1z9m2p2z 2z4s8s8s9s5z 7s',
        fulu0: [],
        fulu1: [],
        fulu2: [],
        fulu3: [],
        end_mode: 1,
        hu_seat: [2],
        first_op: 0,
    }, // 东1局1本场
    { // 东2局0本场
        ju: 1,
        tiles0: '678m055678p3z',
        tiles1: '11778899m0566s3z',
        tiles2: '',
        tiles3: '',
        lst_mopai: '',
        dora: ['2z'],
        li_dora: [],
        paihe0: '1z1s9s2p4z2p 7s4s2m1m6s8p 9p6m3p4m',
        paihe1: '9s5z8p3s7z4m 4z6m1z1m3p1s 9p5z6p4m7p',
        paihe2: '7z8s6z4p7z9m2z 5z4s1s6z1z4z 2z1p3p3z',
        paihe3: '4z9p9m7z1z1s 2p5z1p3s7s9p 3s1p8s',
        fulu0: ['6_66z'],
        fulu1: [],
        fulu2: ['_423m'],
        fulu3: [],
        end_mode: 1,
        hu_seat: [0, 1],
        first_op: 0,
    }, // 东2局0本场
    { // 东2局1本场
        ju: 1,
        tiles0: '',
        tiles1: '06677m67p340s',
        tiles2: '',
        tiles3: '55m23344079p678s',
        lst_mopai: '8p',
        dora: ['3s'],
        li_dora: ['1z'],
        paihe0: '6z7z8s9s4z3s 5z2m5z6s4z',
        paihe1: '2z3z4z1s5z2z 2p7z3m1m6s5z',
        paihe2: '1p1m9m4z7z9p 5s1m7z1z8s1p',
        paihe3: '9m1s6z3z1z9s 9p9s5pr3zg1sg',
        fulu0: [],
        fulu1: ['_222m'],
        fulu2: [],
        fulu3: [],
        end_mode: 1,
        hu_seat: [3],
        first_op: 0,
    }, // 东2局1本场
    { // 东3局0本场
        ju: 2,
        tiles0: '244778899p3388s',
        tiles1: '',
        tiles2: '',
        tiles3: '',
        lst_mopai: '',
        dora: ['5s'],
        li_dora: ['6z'],
        paihe0: '4z1m9m9s4m2sr 4sg6sg',
        paihe1: '9p6z3m6p3m9s 2z1m',
        paihe2: '1s3z1p8s1s5z 5z2s2z3s2p',
        paihe3: '1m9s1z8m4m2m5z4z 2z5z',
        fulu0: [],
        fulu1: [],
        fulu2: ['11_1z', '44_4m'],
        fulu3: [],
        end_mode: 1,
        hu_seat: [0],
        first_op: 0,
    }, // 东3局0本场
    { // 东4局0本场
        ju: 3,
        tiles0: '',
        tiles1: '23467m345678p77s',
        tiles2: '',
        tiles3: '',
        lst_mopai: '',
        dora: ['7z'],
        li_dora: ['4p'],
        paihe0: '1p9m9m6z3m8m',
        paihe1: '6z4z3z9m2pr',
        paihe2: '1z2z1s1m7z',
        paihe3: '9s7z6z4z6z1z',
        fulu0: [],
        fulu1: [],
        fulu2: [],
        fulu3: [],
        end_mode: 1,
        hu_seat: [1],
        first_op: 0,
    }, // 东4局0本场
    { // 南1局0本场
        ju: 0,
        tiles0: '4457m055p567s',
        tiles1: '1115z',
        tiles2: '',
        tiles3: '',
        lst_mopai: '',
        dora: ['3s'],
        li_dora: [],
        paihe0: '1m2z1p5z3p1m3z 1m3z7p3p',
        paihe1: '1s9m8s6m7m2m 2m9m4m8m8p1z',
        paihe2: '2z4z6z3z7p6s8s 4p2m9s9s6m',
        paihe3: '3z9m2m5z1m5s 6z0m2s2s',
        fulu0: ['_234s'],
        fulu1: ['44_4z', '_324p', '_768p'],
        fulu2: [],
        fulu3: [],
        end_mode: 1,
        hu_seat: [0],
        first_op: 0,
    }, // 南1局0本场
    { // 南1局1本场
        ju: 0,
        tiles0: '3356p340s',
        tiles1: '67m4407p2456788s',
        tiles2: '',
        tiles3: '',
        lst_mopai: '',
        dora: ['4s'],
        li_dora: [],
        paihe0: '2z6z7z1s7z3m 3m7m8p4s2s0m 6p',
        paihe1: '4z3z9m1p5z2z 3m6z7z1z1z2s 9s',
        paihe2: '4m9s5z9s8s3p 7z8m3s9m1z3z1m',
        paihe3: '1z9p3z5z4m2z 6m3p1p5z9sr7pg',
        fulu0: ['_678m', '3_33s'],
        fulu1: [],
        fulu2: [],
        fulu3: [],
        end_mode: 1,
        hu_seat: [0],
        first_op: 0,
    }, // 南1局1本场
    { // 南1局2本场
        ju: 0,
        tiles0: '123888p2233455s',
        tiles1: '',
        tiles2: '',
        tiles3: '',
        lst_mopai: '1s',
        dora: ['1p'],
        li_dora: ['9s'],
        paihe0: '9m4z9p3m5p3z 6m6sr3mg9sg6zg3pg 2zg2pg3mg9mg',
        paihe1: '1z3z2m1z8m2m 4p6m9p3s1m4z 4m4m6s9m',
        paihe2: '5z4s8s2z1s7m 6mr8mg6zg1mg7zg1mg 5pg6mg3zg6zg',
        paihe3: '3z1m9s2z5z7z 7z8m9p6z6s4z 4m2p5p3s',
        fulu0: [],
        fulu1: [],
        fulu2: [],
        fulu3: [],
        end_mode: 1,
        hu_seat: [0],
        first_op: 0,
    }, // 南1局2本场
    { // 南1局3本场
        ju: 0,
        tiles0: '',
        tiles1: '135567m78p246s44z',
        tiles2: '',
        tiles3: '789m1236p678s',
        lst_mopai: '',
        dora: ['3z'],
        li_dora: [],
        paihe0: '6z1m7m4p4z9s 2z6p',
        paihe1: '6z2p8s2z2p5p 5p',
        paihe2: '5p7z2z9p3z3s8p',
        paihe3: '6z3z1z9p5z5z 0p',
        fulu0: [],
        fulu1: [],
        fulu2: [],
        fulu3: ['_777z'],
        end_mode: 1,
        hu_seat: [3],
        first_op: 0,
    }, // 南1局3本场
    { // 南2局0本场
        ju: 1,
        tiles0: '',
        tiles1: '22p56999s',
        tiles2: '',
        tiles3: '234789m78p23455s',
        lst_mopai: '9p',
        dora: ['8s'],
        li_dora: ['8s'],
        paihe0: '3z7z1m7z6z2m8s 6s3z1p4p',
        paihe1: '1s7z5p7m3z7m 3p2s6p6p2z1m8p',
        paihe2: '9m4z6z7p1z1p 9p1s3s8m5z1z',
        paihe3: '4z1z1p6z4p3p 9m7s4z7pr',
        fulu0: ['22_2z'],
        fulu1: ['_213m', '55_5z'],
        fulu2: [],
        fulu3: [],
        end_mode: 1,
        hu_seat: [3],
        first_op: 0,
    }, // 南2局0本场
    { // 南3局0本场
        ju: 2,
        tiles0: '12355m222p40777s',
        tiles1: '09m113345678p88s',
        tiles2: '',
        tiles3: '',
        lst_mopai: '6s',
        dora: ['3p'],
        li_dora: ['9m'],
        paihe0: '4z5z9m9p3z9s 2z4s1z6mr2mg1mg 5zg4mg',
        paihe1: '4z7z5s7p2z2s 1s9s7m6m6z7m 2z4m',
        paihe2: '9s3z7m1z4m2s 1m7pr7zg6sg7zg1sg 2sg3zg3mg',
        paihe3: '9p2m5z1s4z6z 3z1m7m4s9s2m 6z1z2z',
        fulu0: [],
        fulu1: [],
        fulu2: [],
        fulu3: [],
        end_mode: 1,
        hu_seat: [0],
        first_op: 0,
    }, // 南3局0本场
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
