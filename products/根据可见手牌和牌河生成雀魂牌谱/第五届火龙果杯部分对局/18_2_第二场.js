clearProject();

player_datas[0] = {
    nickname: '稳住别浪',
    avatar_id: 400902, // 泽尼娅-契约
    title: 600032, // 连胜之道
    views: [
        {slot: 0, item_id: 308028}, // 立直棒-骑士的钥匙
        {slot: 1, item_id: 305040}, // 和牌-逆鳞
    ]
};
player_datas[1] = {
    nickname: '千石丶抚子',
    avatar_id: 406202, // 竹井久-契约
    title: 600015, // 猫粮供应商
    avatar_frame: 305529, // 头像框-秋霜切玉
    views: [
        {slot: 0, item_id: 305608}, // 立直棒-夹心猫团子
        {slot: 1, item_id: 308021}, // 和牌-高岭之花
        {slot: 2, item_id: 308017}, // 立直-恋之箭矢
    ]
};
player_datas[2] = {
    nickname: '歪比巴卜LL',
    avatar_id: 407102, // C.C.-契约
    title: 600032, // 连胜之道
    views: [
        {slot: 0, item_id: 305615}, // 立直棒-柴犬团子
        {slot: 1, item_id: 305216}, // 和牌-槲寄生下
    ]
};
player_datas[3] = {
    nickname: '北雨听海',
    avatar_id: 402602, // 雏桃-契约
    title: 600006, // 魂之契约者-中阶
    views: [
        {slot: 0, item_id: 305042}, // 立直棒-雪糕
        {slot: 1, item_id: 305200}, // 和牌-幽灵嗷嗷
        {slot: 2, item_id: 305032}, // 立直-幻影
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
        tiles2: '44m55z',
        tiles3: '2667m235799p345s',
        lst_mopai: '4m',
        dora: ['8p'],
        li_dora: [],
        paihe0: '3z1p8m8p7s2z1m7z 2s4p6m1s4z9s 9s8s5p9m4z',
        paihe1: '4z7z1z6z5z2z 4p8s9s2s1z6z 2s4s6p9m6p',
        paihe2: '6s1p4p4s3s4z 1z2m6p1s1z2p 7z7p8p6p7s8m',
        paihe3: '3z9s6z1s3m9m 5s3z1p2m3p8s8s 4s7p3p7z1p',
        fulu0: ['_340p', '_423s'],
        fulu1: [],
        fulu2: ['2_22z', '1_11m', '_978m'],
        fulu3: [],
        end_mode: 1,
        hu_seat: [2],
        first_op: 0,
    }, // 东1局0本场
    { // 东2局0本场
        tiles0: '234m2244556s',
        tiles1: '',
        tiles2: '',
        tiles3: '28m1238p22467s36z',
        lst_mopai: '6s',
        dora: ['8m'],
        li_dora: [],
        paihe0: '9s5z1s2p3m4z 1s4p9m5z7p6m 3m',
        paihe1: '4z9p2p8s9s4p 8p3mr7pg0sg3pg6mg8sg 3pg',
        paihe2: '1z1p5z7z2z9p1m 9s9p7s6p7p6p 2p',
        paihe3: '4m8p1s5p3z3z 9s1p7s9p7s3z 7p',
        fulu0: ['7_77z'],
        fulu1: [],
        fulu2: ['_324m'],
        fulu3: [],
        end_mode: 1,
        hu_seat: [0],
        first_op: 0,
    }, // 东2局0本场
    { // 东3局0本场
        tiles0: '',
        tiles1: '34566m68p',
        tiles2: '',
        tiles3: '122306678s3377z',
        lst_mopai: '',
        dora: ['5s'],
        li_dora: [],
        paihe0: '9m9s9p1s1m4z 1z5z2p8m7p',
        paihe1: '3z1m1p1z4z4p4s9m 4p7s8s',
        paihe2: '8s2s3m2m5p3p7m7p 5z5m1m3p',
        paihe3: '9m9m9p2m1p2p 2p9p5z2z',
        fulu0: ['0_55p'],
        fulu1: ['33_3p', '_888m'],
        fulu2: ['_111z', '_456s'],
        fulu3: [],
        end_mode: 1,
        hu_seat: [1],
        first_op: 0,
    }, // 东3局0本场
    { // 东4局0本场
        tiles0: '',
        tiles1: '',
        tiles2: '',
        tiles3: '406m2240s',
        lst_mopai: '',
        dora: ['8s'],
        li_dora: [],
        paihe0: '3z1s7z5z1p3s',
        paihe1: '4z7z1z9m3p',
        paihe2: '6z9m7z2z',
        paihe3: '4p6p2p5s3z1p',
        fulu0: [],
        fulu1: [],
        fulu2: [],
        fulu3: ['_666z', '1_11z'],
        end_mode: 1,
        hu_seat: [3],
        first_op: 0,
    }, // 东4局0本场
    { // 东4局1本场
        tiles0: '',
        tiles1: '',
        tiles2: '',
        tiles3: '1p',
        lst_mopai: '',
        dora: ['4m'],
        li_dora: [],
        paihe0: '9p3z1m4z1m7z5z 1z1s8p8m1p3z6s7s6mr 1zg',
        paihe1: '2z3z9m6z3s4s9p 6p9s9s5z9m7p 2m1p',
        paihe2: '8s8p9m8m3z6m 5s9s5m7p5zr5pg7mg',
        paihe3: '2z4z1m6s8m8m 9s4s6z0m5z5s 7m7s6z3p4z',
        fulu0: [],
        fulu1: ['_867m', '_645m'],
        fulu2: [],
        fulu3: ['77_7z', '9_99p', '88_8p', '_534p'],
        end_mode: 1,
        hu_seat: [3],
        first_op: 0,
    }, // 东4局1本场
    { // 东4局2本场
        tiles0: '',
        tiles1: '06788m40p666z',
        tiles2: '',
        tiles3: '599m2688p233446s',
        lst_mopai: '',
        dora: ['9m'],
        li_dora: [],
        paihe0: '4z5z2z9sr3pg7pg 5pg4zg5sg7zg6sg1zg5mg 6mg5mg7zg',
        paihe1: '4z1s2p7z9p1p 5p2z5s9p1m3s 7s7p2m8p',
        paihe2: '2z7z3z8s1s4p 1m7m6z1m4p5z 9p1p1s3p',
        paihe3: '1z3z1p5z1p9s 8s3p5p0s3p7p 1z7s5z2m',
        fulu0: [],
        fulu1: ['_678s'],
        fulu2: ['_234m'],
        fulu3: [],
        end_mode: 1,
        hu_seat: [1],
        first_op: 0,
    }, // 东4局2本场
    { // 南1局0本场
        tiles0: '',
        tiles1: '',
        tiles2: '33777m067789p34s',
        tiles3: '1146m8p1067s4z',
        lst_mopai: '',
        dora: ['6z'],
        li_dora: ['1z'],
        paihe0: '3z9m9s2z1m7z 6z1z9s9s3m6s 4s7s1p8m2s',
        paihe1: '9m1s2m1m8m9p 2z7p3z5p2m7z 4s4s7z2p',
        paihe2: '2z2p5m9p1p6z 8p0m1z2mr3sg3zg7zg 5zg5mg9mg',
        paihe3: '3z9p9s2z6z8p 3s5p1s2m8m6s5z5z 5z2p',
        fulu0: ['_234m', '_867m'],
        fulu1: [],
        fulu2: [],
        fulu3: ['_046m'],
        end_mode: 1,
        hu_seat: [2],
        first_op: 0,
    }, // 南1局0本场
    { // 南2局0本场
        tiles0: '',
        tiles1: '567m88p12346789s',
        tiles2: '',
        tiles3: '12377m23p3468s16z',
        lst_mopai: '',
        dora: ['1s'],
        li_dora: ['6m'],
        paihe0: '3z9s6z5z9s8m 6z8m3z8p2p',
        paihe1: '4z1m1p2z7pr8pg 6pg6pg9mg1sg9mg1mg',
        paihe2: '4z1p9p9p2z8m 9p5z7z4p1s5s',
        paihe3: '9s3z2z5z7p7p 7p6p9m7z7z',
        fulu0: [],
        fulu1: [],
        fulu2: [],
        fulu3: [],
        end_mode: 1,
        hu_seat: [1],
        first_op: 0,
    }, // 南2局0本场
    { // 南2局1本场
        tiles0: '',
        tiles1: '45688m12306789s',
        tiles2: '',
        tiles3: '119m23306p23678s',
        lst_mopai: '7s',
        dora: ['1p'],
        li_dora: ['4m'],
        paihe0: '3z6z1m7m2m6m 5p4p2z3m2m1p',
        paihe1: '4z2z5z8p2m3z 1p5p4z8p5zr1sg',
        paihe2: '9s1s1p7z5p1z8s 5s6z2p3z3z',
        paihe3: '1z2z5z1z6s9p 9p4m6m2m6z',
        fulu0: ['7_77z'],
        fulu1: [],
        fulu2: [],
        fulu3: [],
        end_mode: 1,
        hu_seat: [1],
        first_op: 0,
    }, // 南2局1本场
    { // 南2局2本场
        tiles0: '067m233445p345s6z',
        tiles1: '',
        tiles2: '',
        tiles3: '337m0566p377s167z',
        lst_mopai: '',
        dora: ['4z'],
        li_dora: ['4m'],
        paihe0: '9s9p8p1p2s6p 2s8p5z2z2zr1sg6mg 3sg',
        paihe1: '3z4z2m2m1s1m 2m6z7p8m4s9s 8s9p9p',
        paihe2: '9m1p4z1p6s6m 9s9m8p7z5z2z 9p3z6z',
        paihe3: '2z9m4z1s2m9s 3p4s6s3m7m1m 1m7z',
        fulu0: [],
        fulu1: ['_555z'],
        fulu2: [],
        fulu3: [],
        end_mode: 1,
        hu_seat: [0],
        first_op: 0,
    }, // 南2局2本场
    { // 南3局0本场
        tiles1: '44m55z',
        tiles2: '',
        tiles3: '34m2357p406779s',
        lst_mopai: '4m',
        dora: ['7z'],
        li_dora: [],
        paihe0: '2m8m4p4p9m3m 6p8m8p2z',
        paihe1: '1z9m7p6s1p1m 6s4s4s3z4p6p',
        paihe2: '4z9m8p6z8p1p 1p4z2s2z3pr0mg7pg',
        paihe3: '1z4z1s7z6z2z4z9p 8m2z7p',
        fulu0: ['2_22s'],
        fulu1: ['1_11s', '9_99p', '33_3p'],
        fulu2: [],
        fulu3: [],
        end_mode: 1,
        hu_seat: [1],
        first_op: 0,
    }, // 南3局0本场
]);
