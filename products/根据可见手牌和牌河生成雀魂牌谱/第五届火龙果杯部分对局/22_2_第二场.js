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

setPlayGame([
    { // 东1局0本场
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
]);
