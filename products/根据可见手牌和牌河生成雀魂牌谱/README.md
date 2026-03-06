# 根据可见手牌和牌河生成雀魂牌谱

相关仓库: [根据可见手牌和牌河生成天凤牌谱](https://github.com/wuye999/tenhou)

## 输入

打开 [pic2majsoul.js](pic2majsoul.js), 根据你的截图修改 `json` 变量, 注释如下(在文件中修改, 而不是在下面的注释中修改)

```js
/**
 * 何切模式分为两类:
 * 1. 自家摸牌后选择切什么牌(第一类何切)
 * 2. 其他家切牌后自家是否要鸣牌, 以及鸣牌后切什么牌(第二类何切)
 */

/**
 * 用户修改 json 数据
 * - player_count: 玩家数
 * - chang_ju_ben_num: 所在小局, 第一个是什么场, 第二个是谁坐庄, 第三个是本场数, 第四个是刚开局时场上立直棒个数(默认为0)
 * - mainrole: 主视角的 seat
 * - tiles0-3: 各家在何切的巡目的手牌(若是第一类何切, 则不包含刚摸的牌, 若未知则置为空)
 * - lst_mopai: 第一类何切中何切巡目刚摸的牌, 若是第二类何切, 则要置为空
 * - dora: 宝牌指示牌, 从左到右
 * - li_dora: 里宝牌指示牌, 从左到右, 长度要和 dora 一致, 若未知则置为空
 * - scores: 所有玩家这小局开始时的点数
 * - paihe0-3: 各家的牌河, 牌不要缩写, 包含被鸣走的牌
 *             牌有后缀g表示摸切, 无g则为手切
 *             有后缀r表示立直, 无r表示非立直
 *             g和r顺序不分先后
 * - fulu0-3: 各家的副露, 按时间顺序从左到右
 *            '_'表示下一张牌是倾倒的鸣的其他家的牌, '^'表示加杠, 先'_'后'^'
 *            大明杠对家的牌的'_'放在第二个数字前
 *            暗杠的巡目在轮到该暗杠副露时的下一个摸牌巡, 加杠的巡目在碰对应副露之后下一个摸牌巡
 * - first_op: 庄家第一个操作, 0: 切牌(含立直), 1: 暗杠/拔北, 2. 和牌(天和), 默认为0, 若是第二类何切则无论如何都置为0
 * - end_mode: 结束方式, 0: 和牌, 1: 荒牌流局, 2: 途中流局(若不符合途中流局条件则会报错), 默认为1
 * - hu_seat: 和牌玩家的所有 seat, 只在 end_mode 是 0 的时候有效, 若为空则自动判断谁可以和牌(若无人能和牌会报错)
 */
const json = {
    player_count: 4,
    chang_ju_ben_num: [0, 2, 10],
    mainrole: 2,
    tiles0: '5m489p359s234z',
    tiles1: '6z',
    tiles2: '123m6z',
    tiles3: '48m126p112359s26z',
    lst_mopai: '6z',
    dora: ['4s', '3z', '8p', '1s'],
    li_dora: ['9p', '9m', '4m', '9m'],
    scores: [9500, 14700, 64800, 11000],
    paihe0: '6s5p4s8m6p6s6mg4mg9pg5mg7pg7mg7s0mg3pg1mg2mg',
    paihe1: '5p8p9sg4p2sg3sg3pg1m2zg6m7mg8s8pg2zg3mg5p3m4m',
    paihe2: '6m0p7p0s7s7s3z2s9mg4zg1s3p6mg5sg2p1p2sg5mgr',
    paihe3: '2m4s7s3s7pg2mg4p8s7mg4sg1pg4z3zg9sg2pg2pg9pg9mg',
    fulu0: ['_213m'],
    fulu1: ['_666s', '_534p', '_888m', '8_88s'],
    fulu2: ['5555z', '7777z', '1111z'],
    fulu3: [],
    first_op: 1,
    end_mode: 0,
    hu_seat: [],
};
```

## 加载并放映

1. 登录网页版雀魂, F12 打开控制台
2. 载入 [main.js](../../main.js),
3. 再输入编辑后的 [pic2majsoul.js](pic2majsoul.js),
4. 随便选择一个谱查看, 跳转到对应巡目即可

另见 [天凤牌谱编辑器数据转雀魂格式](天凤牌谱编辑器数据转雀魂格式.md) 

## 一些官方何切

```javascript
// https://www.bilibili.com/opus/1100855183761473545
const json = {
    player_count: 4,
    chang_ju_ben_num: [1, 0, 0],
    mainrole: 0,
    tiles: '34055m11346p406s',
    lst_mopai: '5p',
    dora: ['2z'],
    paihe0: '9m9p6z5z6zg8p9pg3zg',
    paihe1: '1s9s7z2z8m1z4mg3mg',
    paihe2: '4zg6z7m7mg9mg1p8pg6m',
    paihe3: '9m9mg2z1p1zg6z5p4z',
    fulu0: [],
    fulu1: [],
    fulu2: [],
    fulu3: [],
};
// https://www.bilibili.com/opus/1096031042145353764
const json = {
    player_count: 4,
    chang_ju_ben_num: [0, 2, 0],
    mainrole: 0,
    tiles: '2220m56p3066778s',
    lst_mopai: '4s',
    dora: ['7p'],
    paihe0: '7z2s5mg2zg3z3z9s2pg5zg',
    paihe1: '9s2z8s4s6m7mg1zg7zg4m',
    paihe2: '9m9mg4p4zg2zr1zg9sg6zg4zg4sg5zg',
    paihe3: '5z2sg1s1zg7p3m1pg6zg2pg1pg',
    fulu0: [],
    fulu1: [],
    fulu2: [],
    fulu3: [],
};
// https://www.bilibili.com/opus/1090866786329427968
const json = {
    player_count: 4,
    chang_ju_ben_num: [1, 2, 0],
    mainrole: 2,
    tiles: '446m456p44556s77z',
    lst_mopai: '0p',
    dora: ['6z', '1p'],
    paihe0: '8p5z5p9s6zg7s4zg5m9sg',
    paihe1: '1zg5zg3z2s1sg8sg1zg1sg7pr',
    paihe2: '4z1z9s8s2z7p8pg6pg',
    paihe3: '1z4zg2m8s9m2z9p2zg',
    fulu0: ['33_3z', '7777m'],
    fulu1: [],
    fulu2: [],
    fulu3: [],
};
// https://www.bilibili.com/opus/1064906303211569152
const json = {
    player_count: 4,
    chang_ju_ben_num: [0, 3, 0],
    mainrole: 0,
    tiles: '355m123405p3345s',
    lst_mopai: '5m',
    dora: ['5p'],
    paihe0: '9m4z8s8p7zg',
    paihe1: '4z1m9p7zg6z',
    paihe2: '1s9s7z1z3m',
    paihe3: '7z5z2m8s9sg9p',
    fulu0: [],
    fulu1: [],
    fulu2: ['_444z'],
    fulu3: [],
};
```
