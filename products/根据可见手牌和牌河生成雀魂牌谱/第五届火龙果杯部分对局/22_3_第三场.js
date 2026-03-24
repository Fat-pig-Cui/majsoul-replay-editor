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

setPlayGame([
    { // 东1局0本场
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
        paihe3: '2z6z5z3p3z2m 4z9m9p9p4s5z 3p2p2z8s9s5p',
        fulu0: [],
        fulu1: ['1111m'],
        fulu2: ['_867p', '7_77z'],
        fulu3: [],
        end_mode: 0,
        hu_seat: [],
        first_op: 0,
    }, // 东1局0本场
    { // 东1局1本场
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
        tiles0: '244778899p3388s',
        tiles1: '678m12333p2367s7z',
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
        tiles0: '123888p2233455s',
        tiles1: '0555m4667p17778s',
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
]);
