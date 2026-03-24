clearProject();

player_datas[0] = {
    nickname: '宇佐见秋彦',
    avatar_id: 402203, // 约瑟夫
    title: 600045, // 一姬当千
    avatar_frame: 305500, // 头像框-豆芽
    views: [
        {slot: 0, item_id: 305618}, // 立直棒-猫神剑玉
        {slot: 1, item_id: 308021}, // 和牌-高岭之花
        {slot: 2, item_id: 305021}, // 立直-碎冰
    ]
};
player_datas[1] = {
    nickname: '司马馥玲',
    avatar_id: 400304, // 藤田佳奈-暗夜法则
    title: 600032, // 连胜之道
    views: [
        {slot: 0, item_id: 305605}, // 立直棒-应援棒
        {slot: 1, item_id: 305206}, // 和牌-天降正义
    ]
};
player_datas[2] = {
    nickname: '绿导师原谅你了',
    avatar_id: 400201, // 二阶堂美树
    views: [
    ]
};
player_datas[3] = {
    nickname: '北雨听海',
    avatar_id: 402602, // 雏桃-契约
    title: 600006, // 魂之契约者-中阶
    views: [
        {slot: 0, item_id: 305042}, // 立直棒-雪糕
        {slot: 1, item_id: 305008}, // 和牌-旋风
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
        tiles2: '067m46p22666789s',
        tiles3: '',
        lst_mopai: '5p',
        dora: ['8m'],
        li_dora: ['5m'],
        paihe0: '9p4z2z5z3s8s 1m6p1p7z3z3p7zr',
        paihe1: '1p5z2z9p7m1m 8p6p9m4p7s7m 7z',
        paihe2: '4z1s2m1z9s1z 5m1z3m4s6zr7pg',
        paihe3: '2z3z4z1s9m1s 5z9s4z7z2m8p',
        fulu0: [],
        fulu1: ['_333z'],
        fulu2: [],
        fulu3: [],
        end_mode: 1,
        hu_seat: [2],
        first_op: 0,
    }, // 东1局0本场
    { // 东2局0本场
        ju: 1,
        tiles0: '',
        tiles1: '',
        tiles2: '067p123456999s7z',
        tiles3: '3577m34p1112233s',
        lst_mopai: '',
        dora: ['6z'],
        li_dora: ['1m'],
        paihe0: '8s8p2z5s2p3z 1p1p2m9m9m9m 2z6p',
        paihe1: '3z1m2z8m6z1p 4s6z4z4z1p1z 1z2m7zr',
        paihe2: '2p9p4z4z1m8m 2m6zr3zg6sg5zg7sg 6mg6pg',
        paihe3: '9s2z8p2m1z2p 3z2p9p8m9m7s 7s5m',
        fulu0: [],
        fulu1: [],
        fulu2: [],
        fulu3: [],
        end_mode: 1,
        hu_seat: [2],
        first_op: 0,
    }, // 东2局0本场
    { // 东3局0本场
        ju: 2,
        tiles0: '444067m567p5788s',
        tiles1: '',
        tiles2: '',
        tiles3: '',
        lst_mopai: '',
        dora: ['9p'],
        li_dora: ['5z'],
        paihe0: '1s4z4z3p3s4s 8p4zr1sg8pg7pg0sg',
        paihe1: '2s2m6s3s3s3p 2m7z7z1s4z3z',
        paihe2: '2z9m1s7z3m3m 3m7s2z7s8m1z 6s',
        paihe3: '5z3z3z7m6z6m 5s1p3s2s4s8m',
        fulu0: [],
        fulu1: [],
        fulu2: [],
        fulu3: [],
        end_mode: 1,
        hu_seat: [0],
        first_op: 0,
    }, // 东3局0本场
    { // 东4局0本场
        ju: 3,
        tiles0: '',
        tiles1: '',
        tiles2: '',
        tiles3: '12356789m11p789s',
        lst_mopai: '',
        dora: ['9s'],
        li_dora: ['1z'],
        paihe0: '3z7z5z3m2m5z 3z4m4p8s9s8p 1p',
        paihe1: '9p5z4m4z5s6p 5s9m9m6z4z8p 9m',
        paihe2: '3z6z8s1p2p2z 9p7p1z2p2z2m 4m',
        paihe3: '7z5z1z8p3m3s 3p4z3s8sr4pg1sg 3zg',
        fulu0: [],
        fulu1: [],
        fulu2: [],
        fulu3: [],
        end_mode: 1,
        hu_seat: [3],
        first_op: 0,
    }, // 东4局0本场
    { // 东4局1本场
        ju: 3,
        tiles0: '44m456p55678s',
        tiles1: '345m23456p66789s',
        tiles2: '340678m78p67899s',
        tiles3: '2m40668p2278s',
        lst_mopai: '',
        dora: ['2m'],
        li_dora: [],
        paihe0: '4z1p2z1m1z8p 2m4z1m3s8p2s 3p9m5z5m1s3m6z',
        paihe1: '9p4z7z5z6z1z 9p5z3z2m3s2p 9s1m8m7mr1zg1sg',
        paihe2: '2z9m7z2s6z1p 3p4z4s3p5p5m 4s3mr7mg6mg3sg',
        paihe3: '2z3z9m5z1z1m 1s1s4p9p7z2p 3z3s3z7m6m6m',
        fulu0: ['88_8m'],
        fulu1: [],
        fulu2: [],
        fulu3: ['_444s'],
        end_mode: 0,
        hu_seat: [],
        first_op: 0,
    }, // 东4局1本场
    { // 南1局0本场
        ju: 0,
        tiles0: '222m667788p34s11z',
        tiles1: '',
        tiles2: '',
        tiles3: '',
        lst_mopai: '',
        dora: ['9m'],
        li_dora: ['2p'],
        paihe0: '4z9s7z8m5z4p 6z5z1m4s9pr',
        paihe1: '4z9m9p6z2p1s 2s4z1p6p1z',
        paihe2: '9s8s1s2p7z5m 3z2z5m2s2s',
        paihe3: '4z2p9m4p5p9s 9p1p3s5z',
        fulu0: [],
        fulu1: [],
        fulu2: [],
        fulu3: [],
        end_mode: 1,
        hu_seat: [0],
        first_op: 0,
    }, // 南1局0本场
    { // 南1局1本场
        ju: 0,
        tiles0: '',
        tiles1: '',
        tiles2: '',
        tiles3: '678m13789p44567s',
        lst_mopai: '2p',
        dora: ['9p'],
        li_dora: ['8p'],
        paihe0: '1s1z9s2z7z2z 5z3z9m7m7p9p',
        paihe1: '9s1m7z1p8m6m 7m8s7p3s4z5p',
        paihe2: '2z4z2z7z1z6m 7p1m1m3m9m3m',
        paihe3: '1z2m9s1m5z5pr 7zg9mg5mg9pg2mg',
        fulu0: [],
        fulu1: [],
        fulu2: ['_888s', '_333s'],
        fulu3: [],
        end_mode: 1,
        hu_seat: [3],
        first_op: 0,
    }, // 南1局1本场
    { // 南2局0本场
        ju: 1,
        tiles0: '',
        tiles1: '',
        tiles2: '',
        tiles3: '06678p05567s',
        lst_mopai: '',
        dora: ['7p', '6s'],
        li_dora: [],
        paihe0: '4z2p9m4s8m9p 2p3m4s2s8m4p',
        paihe1: '3z3z1z2z1m2s 2z7z6z9p9p',
        paihe2: '1z3z1m1z1p1s 5z7z4s2m5z',
        paihe3: '9m2z1m5z2s6m3s 7z4m4m7m',
        fulu0: ['_234s', '2_222m'],
        fulu1: [],
        fulu2: [],
        fulu3: ['33_3m'],
        end_mode: 1,
        hu_seat: [3],
        first_op: 0,
    }, // 南2局0本场
    { // 南3局0本场
        ju: 2,
        tiles0: '',
        tiles1: '',
        tiles2: '',
        tiles3: '678m78p23456788s',
        lst_mopai: '',
        dora: ['2z'],
        li_dora: [],
        paihe0: '2m1s3m7z8p7p 4p4s4p',
        paihe1: '1z1p4z7z6z9m 5z3z9p',
        paihe2: '9s1s1z4z4z1m 1z9m',
        paihe3: '1z4z9m2p3z4p6s 1s',
        fulu0: ['_430p', '55_5z'],
        fulu1: [],
        fulu2: [],
        fulu3: [],
        end_mode: 1,
        hu_seat: [3],
        first_op: 0,
    }, // 南3局0本场
    { // 南4局0本场
        ju: 3,
        tiles0: '',
        tiles1: '678p4566s',
        tiles2: '',
        tiles3: '340888m406p1144s',
        lst_mopai: '',
        dora: ['4p', '1p'],
        li_dora: [],
        paihe0: '9m4z5z8s9s7s 1s4p2z3p7p8s 5m1z1p',
        paihe1: '7z5z2m3z9s2z4p 7m5z1m5m3p8s 1m2p3z',
        paihe2: '7z5z9s8p8s2z 7s1z9s1z2s6s 6z7m6s',
        paihe3: '4z1m9m2m3z2p 9m7sr3sg6pg6zg3zg1pg3mg 6pg',
        fulu0: ['77_7z', '_678p'],
        fulu1: ['6_66z', '9999p'],
        fulu2: [],
        fulu3: [],
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
