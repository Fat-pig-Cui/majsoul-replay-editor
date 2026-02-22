clearProject();

player_datas[0].nickname = '吉尔-契约';
player_datas[1].nickname = '吉尔';
player_datas[2].nickname = '吉尔-契约';
player_datas[3].nickname = 'Prism Live';
player_datas[0].avatar_id = 408202;
player_datas[1].avatar_id = 408201;
player_datas[2].avatar_id = 408202;
player_datas[3].avatar_id = 408203;

player_datas[0].views = player_datas[1].views = player_datas[2].views = player_datas[3].views = [
    {slot: 0, item_id: 308033}, // 立直棒-红晖的魔杖
    {slot: 1, item_id: 308031}, // 和牌-魔力的迸发
    {slot: 2, item_id: 308032}, // 立直-英灵的典仪
    {slot: 6, item_id: 308034}, // 桌布-星夜的羁绊
    {slot: 7, item_id: 308035}, // 牌背-苍蓝的星辰
];

setConfig({
    category: 2,
    meta: {mode_id: 13},
    mode: {
        mode: 1,
        detail_rule: {
            _report_yakus: true,
            init_point: 300000,
            _chang_ju_ben_num_: [2, 0, 0],
        }
    }
});

// 具体内容在 src/core/core.ts 的 reportYaku 函数中
// 为了考虑版面, 有重复的语音
// 若要去掉重复的语音, 则给该函数加上参数 true 即可
reportYaku();
// reportYaku(true);
