clearProject();

player_datas[0].nickname = '雏桃-契约';
player_datas[1].nickname = '醇香初夏';
player_datas[2].nickname = '冬日心愿簿';
player_datas[3].nickname = '夏风吹拂';
player_datas[0].avatar_id = 402602;
player_datas[1].avatar_id = 402604;
player_datas[2].avatar_id = 402605;
player_datas[3].avatar_id = 402606;

player_datas[0].views = player_datas[1].views = player_datas[2].views = player_datas[3].views = [
    {slot: 6, item_id: 305804}, // 桌布-贺华岁
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
