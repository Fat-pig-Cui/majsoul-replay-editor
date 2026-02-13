clearProject();

player_datas[0].nickname = '柚-契约';
player_datas[1].nickname = '新岁景明';
player_datas[2].nickname = '玩转夏日';
player_datas[3].nickname = '足尖独白';
player_datas[0].avatar_id = 405902;
player_datas[1].avatar_id = 405904;
player_datas[2].avatar_id = 405905;
player_datas[3].avatar_id = 405906;

player_datas[0].views = player_datas[1].views = player_datas[2].views = player_datas[3].views = [
    {slot: 0, item_id: 305612}, // 立直棒-陨石法杖
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
