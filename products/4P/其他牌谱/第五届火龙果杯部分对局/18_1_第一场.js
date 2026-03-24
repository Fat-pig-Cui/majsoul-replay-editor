clearProject();

player_datas[0] = {
    nickname: '北雨听海',
    avatar_id: 402602, // 雏桃-契约
    title: 600006, // 魂之契约者-中阶
    views: [
        {slot: 0, item_id: 305042}, // 立直棒-雪糕
        {slot: 1, item_id: 305200}, // 和牌-幽灵嗷嗷
        {slot: 2, item_id: 305032}, // 立直-幻影
    ]
};
player_datas[1] = {
    nickname: '随风而行与光同存',
    avatar_id: 401702, // 二之宫花-契约
    title: 600045, // 一姬当千
    avatar_frame: 305500, // 头像框-豆芽
    views: [
        {slot: 0, item_id: 305600}, // 立直棒-小恶魔蝙蝠
    ]
};
player_datas[2] = {
    nickname: '不知道QAQ',
    avatar_id: 403501, // 原村和
    title: 600027, // 万象更新
    views: [
        {slot: 0, item_id: 305027}, // 立直棒-爆竹
        {slot: 2, item_id: 305038}, // 立直-龙腾
    ]
};
player_datas[3] = {
    nickname: 'Jiumimi',
    avatar_id: 400601, // 抚子
    views: [
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
        tiles0: '11567m34566p445s',
        tiles1: '1p1s', // 防止听牌的牌
        tiles2: '44567m23406789p',
        tiles3: '22456p66778s',
        lst_mopai: '',
        dora: ['3s'],
        li_dora: [],
        paihe0: '3z1m9p2z1z2m 9m4z9s3m9m4z 5z8s1z9s2s2s',
        paihe1: '4z9p7z5z7p7z 3s1s8m1s6m4m 8p6z1z3p1z6z',
        paihe2: '4z5z3z3z2z7z 2s6z8m3s8s7s3mr 6zg0mg2pg4sg3mg',
        paihe3: '2z1m2m2z9s2s 1p9m1p9m7z8p 5z3z3p9s2m',
        fulu0: [],
        fulu1: [],
        fulu2: [],
        fulu3: ['_756s'],
        end_mode: 0,
        hu_seat: [],
        first_op: 0,
    }, // 东1局0本场
    { // 东2局1本场
        ju: 1,
        tiles0: '56678m13456p344s',
        tiles1: '30m56788p',
        tiles2: '',
        tiles3: '',
        lst_mopai: '',
        dora: ['7m'],
        li_dora: [],
        paihe0: '2z9s4z6z5z3m9p 9m2z7z',
        paihe1: '4z1s9m8s8s9p 2p9s0s3z5z4p',
        paihe2: '7z1p6z1m9p1p 1m8p4p7z6z4mr',
        paihe3: '2z4z1z7z5z5z5s 5p1s6z2s',
        fulu0: [],
        fulu1: ['1_11z', '_333m'],
        fulu2: [],
        fulu3: [],
        end_mode: 1,
        hu_seat: [1],
        first_op: 0,
    }, // 东2局1本场
    { // 东2局2本场
        ju: 1,
        tiles0: '112367m66p34477s',
        tiles1: '',
        tiles2: '',
        tiles3: '34m678999p88s',
        lst_mopai: '',
        dora: ['7p'],
        li_dora: [],
        paihe0: '6z9s2p9s1z2z',
        paihe1: '4z9m1s6z3m5p 8p2m',
        paihe2: '3z7z6z1s2z9p2p',
        paihe3: '4z1m1z6s2p4p',
        fulu0: [],
        fulu1: ['77_7z'],
        fulu2: ['_888p'],
        fulu3: ['_333z'],
        end_mode: 1,
        hu_seat: [3],
        first_op: 0,
    }, // 东2局2本场
    { // 东3局0本场
        ju: 2,
        tiles0: '4m456p577s155z',
        tiles1: '',
        tiles2: '',
        tiles3: '567m34066p46s111z',
        lst_mopai: '',
        dora: ['9s', '3s'],
        li_dora: ['4m', '8m'],
        paihe0: '8s7m3m7s4m6z 7z1m2s6z6m2p 3z3z7z4z3z',
        paihe1: '9p2z7z3p8s9m9s 9s4s3s2s6m3s4z 9m9m8m',
        paihe2: '4z9p6z1s8s3s 9s2s2m8m2p2p 1p1m5m1s0s',
        paihe3: '1p7z6z9m3mr6sg 1mg4sg1pg4zg1mg2sg 1pg2pg4sg2mg',
        fulu0: ['22_2^2z'],
        fulu1: [],
        fulu2: ['_456s'],
        fulu3: [],
        end_mode: 1,
        hu_seat: [3],
        first_op: 0,
    }, // 东3局0本场
    { // 东4局0本场
        ju: 3,
        tiles0: '2240m345789s222z',
        tiles1: '',
        tiles2: '',
        tiles3: '',
        lst_mopai: '3m',
        dora: ['3s', '7s'],
        li_dora: ['4m', '7s'],
        paihe0: '7z7p1m1s2s9s 9p2s1zr1pg1mg',
        paihe1: '9p8p6s1p3sr3zg1mg6pg 2pg9pg',
        paihe2: '8p3p2z6z8s3p 3m7m5z0s2p',
        paihe3: '4z3z6z3p1s8s 9p8p2s2s1s1s',
        fulu0: [],
        fulu1: [],
        fulu2: ['_345s', '_666p', '1_111z'],
        fulu3: [],
        end_mode: 1,
        hu_seat: [0],
        first_op: 0,
    }, // 东4局0本场
    { // 南1局0本场
        ju: 0,
        tiles0: '45m6679p2344056s',
        tiles1: '',
        tiles2: '11345p77s',
        tiles3: '',
        lst_mopai: '',
        dora: ['9p'],
        li_dora: [],
        paihe0: '1m5z6z7z6z1s9s 4z5s5s3p9m8m',
        paihe1: '4z6z3m1p5p4m 7s2s4s2m2z1p',
        paihe2: '1m5z4z3z9m3z 2z1z1s7m7p',
        paihe3: '9p1s1m6z1m7m 9m2m3z9m2p9s',
        fulu0: [],
        fulu1: [],
        fulu2: ['7_77z', '_234m'],
        fulu3: ['2_22s'],
        end_mode: 1,
        hu_seat: [2],
        first_op: 0,
    }, // 南1局0本场
    { // 南2局0本场
        ju: 1,
        tiles0: '233456789m2p077s',
        tiles1: '',
        tiles2: '678m678p2234578s',
        tiles3: '',
        lst_mopai: '9s',
        dora: ['5z'],
        li_dora: ['4s'],
        paihe0: '1p9p8s5z2p1z 7z1z',
        paihe1: '3z7z1z2m8m4z 1m5m4z2z',
        paihe2: '3z2z6z5z4z2m5pr 3pg5pg',
        paihe3: '2z9s5z7z9p1z 1p3p',
        fulu0: [],
        fulu1: ['66_6z'],
        fulu2: [],
        fulu3: [],
        end_mode: 1,
        hu_seat: [2],
        first_op: 0,
    }, // 南2局0本场
    { // 南3局0本场
        ju: 2,
        tiles0: '1123558m478p133z',
        tiles1: '',
        tiles2: '06m123p12344789s',
        tiles3: '',
        lst_mopai: '4m',
        dora: ['6m'],
        li_dora: ['9m'],
        paihe0: '2z1s5z1z6z7z 3z1p2p9m',
        paihe1: '9s9p5z3m7p1m 6p2p3p3p',
        paihe2: '2z9m4z5p6p5z 3mr1pg4sg6pg',
        paihe3: '9s1z4z5z1s2s6z2z2z2p',
        fulu0: [],
        fulu1: [],
        fulu2: [],
        fulu3: ['_345m'],
        end_mode: 1,
        hu_seat: [2],
        first_op: 0,
    }, // 南3局0本场
    { // 南3局1本场
        ju: 2,
        tiles0: '23468m12344p678s',
        tiles1: '11m23677889p345s',
        tiles2: '',
        tiles3: '',
        lst_mopai: '',
        dora: ['9m'],
        li_dora: ['3z'],
        paihe0: '1s9m7z9p5z2z 4s3m9s9s5p5p',
        paihe1: '9s7z6z5z3m3s2sr 9pg7mg0pg4mg6sg',
        paihe2: '9p9m7m0m3p2p 7m6z1m4m5z6m 1p',
        paihe3: '3z4z1s1z1m1p3z 2z2s2s4m1z7m',
        fulu0: [],
        fulu1: [],
        fulu2: ['44_4z', '_678s'],
        fulu3: ['7_77z'],
        end_mode: 1,
        hu_seat: [1],
        first_op: 0,
    }, // 南3局1本场
    { // 南4局0本场
        ju: 3,
        tiles0: '8m40589p1234058s',
        tiles1: '123m678p12678s44z',
        tiles2: '1z6z', // 防止听牌的牌
        tiles3: '340m66p23456789s',
        lst_mopai: '',
        dora: ['8m', '1p'],
        li_dora: [],
        paihe0: '1z3z5z9s1s5m2m1m 2z2z1z9m6m8m 7z7z3p3p',
        paihe1: '1p4s5m2p1m4zr 4mg2pg9mg6mg6mg3pg 6zg9pg7mg8pg',
        paihe2: '4p2p1p5z7m5z 1z2m2z6z7p6m 9m7m7z3p4z4p',
        paihe3: '9m9p5z4m2p4p 2mr8sg2zg6zg7pg6sg 8mg6pg7zg1pg2sg8pg7mg',
        fulu0: [],
        fulu1: [],
        fulu2: ['3_3^33z', '9_99s'],
        fulu3: [],
        end_mode: 0,
        hu_seat: [],
        first_op: 0,
    }, // 南4局0本场
    { // 南4局1本场
        ju: 3,
        tiles0: '44m8899m1123344s',
        tiles1: '44m88p',
        tiles2: '',
        tiles3: '',
        lst_mopai: '8p',
        dora: ['7p', '7m'],
        li_dora: [],
        paihe0: '9p1p5z6z6p7m 5p9m9s',
        paihe1: '1p9s5z9p8s8m1s 6p6z7p',
        paihe2: '1p3z5z9m7z8s3m 6s0m8s',
        paihe3: '9s1z3z3z2z9p7p 8m2s5s',
        fulu0: [],
        fulu1: ['2_22z', '_555p', '666_6s'],
        fulu2: ['_867m', '_640p'],
        fulu3: ['_777z'],
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
