clearProject();

player_datas[0].nickname = '赤木茂-契约';
player_datas[1].nickname = '赤木茂';
player_datas[2].nickname = '赤木茂-契约';
player_datas[3].nickname = '光暗对决';
player_datas[0].avatar_id = 405002;
player_datas[1].avatar_id = 405001;
player_datas[2].avatar_id = 405002;
player_datas[3].avatar_id = 405003;

player_datas[0].views = player_datas[1].views = player_datas[2].views = player_datas[3].views = [
    {slot: 0, item_id: 308013}, // 立直棒-命悬一线
    {slot: 1, item_id: 308011}, // 和牌-地狱低语
    {slot: 2, item_id: 308012}, // 立直-幽冥之焰
    {slot: 6, item_id: 308014}, // 桌布-传说之夜
    {slot: 7, item_id: 308015}, // 牌背-双鹫纹章
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
reportYaku();
