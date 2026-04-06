# 根据可见手牌和牌河生成雀魂牌谱

相关仓库: [根据可见手牌和牌河生成天凤牌谱](https://github.com/wuye999/tenhou)

需要注意: 过于复杂的牌谱可能无法完美显示, 因为截图中的信息不足以完美还原各个操作的细节, 特别是自家鸣牌的巡目, 但总体上大差不差

## 输入

打开 [pic2majsoul.js](pic2majsoul.js), 根据你的截图修改下列内容, 注释如下(在js文件中修改, 而不是在下面修改)

```js
setConfig({
    category: 3,
    meta: {mode_id: 0},
    mode: {
        mode: 2, // 十位数为0表示四人, 1表示三人, 个位数为1表示东风战, 2表示半庄战
        detail_rule: {
            _chang_ju_ben_num_: [0, 2, 10], // 所在小局, 第一个是什么场, 第二个是谁坐庄, 第三个是本场数, 第四个是刚开局时场上立直棒个数(默认为0)
            _mainrole_: 2, // 主视角的 seat
            _scores_: [9500, 14700, 64800, 11000], // 所有玩家第一局开始时的点数
        }
    }
});

/**
 * 用户修改 json 数据
 * - tiles0-3: 各家在何切的巡目的手牌(若是当前小局结束前最后一个操作是摸牌, 则不包括这次摸的牌)
 * - lst_mopai: 如果当前小局结束前最后一个操作是摸牌, 则该参数为摸的牌, 否则置为空
 * - dora: 宝牌指示牌, 从左到右
 * - li_dora: 里宝牌指示牌, 从左到右, 若未知则置为空
 * - paihe0-3: 各家的牌河, 牌不要缩写, 包含被鸣走的牌, 牌之间空格不影响
 *             牌有后缀g表示摸切, 无g则为手切
 *             有后缀r表示立直, 无r表示非立直
 *             g和r顺序不分先后
 * - fulu0-3: 各家的副露, 按时间顺序从左到右
 *            '_'表示下一张牌是倾倒的鸣的其他家的牌, '^'表示加杠, 先'_'后'^'
 *            大明杠对家的牌的'_'放在第二个数字前
 *            暗杠的巡目在轮到该暗杠副露时的下一个摸牌巡, 加杠的巡目在碰对应副露之后下一个摸牌巡
 * - end_mode: 结束方式, 0: 荒牌流局, 1: 和牌, 2: 途中流局(若不符合途中流局条件则会报错), 默认为1
 * - hu_seat: 和牌玩家的所有 seat, 只在 end_mode 是 1 的时候有效, 若为空则自动判断谁可以和牌(若无人能和牌会报错)
 * - first_op: 庄家第一个操作, 0: 切牌(含立直), 1: 暗杠/拔北, 2. 和牌(天和), 默认为0, 若是第二类何切则无论如何都置为0
 */
setPlayGame({
    tiles0: '5m489p359s234z',
    tiles1: '6z',
    tiles2: '123m6z',
    tiles3: '48m126p112359s26z',
    lst_mopai: '6z',
    dora: ['4s', '3z', '8p', '1s'],
    li_dora: ['9p', '9m', '4m', '9m'],
    paihe0: '6s5p4s8m6p6s6mg4mg9pg 5mg7pg7mg7s0mg3pg 1mg2mg',
    paihe1: '5p8p9sg4p2sg3sg 3pg1m2zg6m7mg8s 8pg2zg3mg5p3m4m',
    paihe2: '6m0p7p0s7s7s 3z2s9mg4zg1s3p 6mg5sg2p1p2sg5mgr',
    paihe3: '2m4s7s3s7pg2mg4p 8s7mg4sg1pg4z3zg9sg 2pg2pg9pg9mg',
    fulu0: ['_213m'],
    fulu1: ['_666s', '_534p', '_888m', '8_88s'],
    fulu2: ['5555z', '7777z', '1111z'],
    fulu3: [],
    end_mode: 1,
    hu_seat: [],
    first_op: 1,
});
```

## 加载并放映

1. 登录网页版雀魂, F12 打开控制台
2. 载入 [main.js](../../main.js),
3. 再输入编辑后的 [pic2majsoul.js](pic2majsoul.js),
4. 随便选择一个谱查看, 跳转到对应巡目即可

更多例子可见: [第五届火龙果杯部分对局](第五届火龙果杯部分对局)

另见 [天凤牌谱编辑器数据转雀魂格式](天凤牌谱编辑器数据转雀魂格式.md) 

## 一些官方何切

```javascript
// https://www.bilibili.com/opus/1100855183761473545
setConfig({
    category: 3,
    meta: {mode_id: 0},
    mode: {
        mode: 2,
        detail_rule: {
            _chang_ju_ben_num_: [1, 0, 0],
            _mainrole_: 0,
            _scores_: [26500, 23900, 19300, 30300],
        }
    }
});
setPlayGame({
    tiles0: '34055m11346p406s',
    tiles1: '',
    tiles2: '',
    tiles3: '',
    lst_mopai: '5p',
    dora: ['2z'],
    li_dora: [],
    paihe0: '9m9p6z5z6zg8p 9pg3zg',
    paihe1: '1s9s7z2z8m1z 4mg3mg',
    paihe2: '4zg6z7m7mg9mg1p 8pg6m',
    paihe3: '9m9mg2z1p1zg6z 5p4z',
    fulu0: [],
    fulu1: [],
    fulu2: [],
    fulu3: [],
    end_mode: 0,
    hu_seat: [],
    first_op: 0,
});
// https://www.bilibili.com/opus/1096031042145353764
setConfig({
    category: 3,
    meta: {mode_id: 0},
    mode: {
        mode: 2,
        detail_rule: {
            _chang_ju_ben_num_: [0, 2, 0],
            _mainrole_: 0,
            _scores_: [23400, 25500, 23100, 28000],
        }
    }
});
setPlayGame({
    tiles0: '2220m56p3066778s',
    tiles1: '',
    tiles2: '',
    tiles3: '',
    lst_mopai: '4s',
    dora: ['7p'],
    li_dora: [],
    paihe0: '7z2s5mg2zg3z3z 9s2pg5zg',
    paihe1: '9s2z8s4s6m7mg 1zg7zg4m',
    paihe2: '9m9mg4p4zg2zr1zg 9sg6zg4zg5zg',
    paihe3: '5z2sg1s1zg7p3m 1pg6zg2pg1pg',
    fulu0: [],
    fulu1: [],
    fulu2: [],
    fulu3: [],
    end_mode: 0,
    hu_seat: [],
    first_op: 0,
});
// https://www.bilibili.com/opus/1090866786329427968
setConfig({
    category: 3,
    meta: {mode_id: 0},
    mode: {
        mode: 2,
        detail_rule: {
            _chang_ju_ben_num_: [1, 2, 0],
            _mainrole_: 2,
            _scores_: [24400, 16400, 32600, 26600],
        }
    }
});
setPlayGame({
    tiles0: '',
    tiles1: '',
    tiles2: '446m456p44556s77z',
    tiles3: '',
    lst_mopai: '0p',
    dora: ['6z', '1p'],
    li_dora: [],
    paihe0: '8p5z5p9s6zg7s 4zg5m9sg',
    paihe1: '1zg5zg3z2s1sg8sg1zg 1sg7pr',
    paihe2: '4z1z9s8s2z7p 8pg6pg',
    paihe3: '1z4zg2m8s9m2z 9p2zg',
    fulu0: ['33_3z', '7777m'],
    fulu1: [],
    fulu2: [],
    fulu3: [],
    end_mode: 0,
    hu_seat: [],
    first_op: 0,
});
// https://www.bilibili.com/opus/1064906303211569152
setConfig({
    category: 3,
    meta: {mode_id: 0},
    mode: {
        mode: 2,
        detail_rule: {
            _chang_ju_ben_num_: [0, 3, 0],
            _mainrole_: 0,
            _scores_: [21500, 18600, 34500, 25400],
        }
    }
});
setPlayGame({
    tiles0: '355m123405p3345s',
    tiles1: '',
    tiles2: '',
    tiles3: '',
    lst_mopai: '5m',
    dora: ['5p'],
    li_dora: [],
    paihe0: '9m4z8s8p7zg',
    paihe1: '4z1m9p7zg6z',
    paihe2: '1s9s7z1z3m',
    paihe3: '7z5z2m8s9sg9p',
    fulu0: [],
    fulu1: [],
    fulu2: ['_444z'],
    fulu3: [],
    first_op: 0,
    end_mode: 0,
    hu_seat: [],
});
```
