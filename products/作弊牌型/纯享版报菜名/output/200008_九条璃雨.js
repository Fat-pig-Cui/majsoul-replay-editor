clearProject();

player_datas[0].nickname = '九条璃雨-契约';
player_datas[1].nickname = '魂色幻想';
player_datas[2].nickname = '心跳时速';
player_datas[3].nickname = '校园微风';
player_datas[0].avatar_id = 400802;
player_datas[1].avatar_id = 400805;
player_datas[2].avatar_id = 400806;
player_datas[3].avatar_id = 400807;

player_datas[0].views = player_datas[1].views = player_datas[2].views = player_datas[3].views = [
    {slot: 6, item_id: 305805}, // 动态桌布-捞金鱼
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
