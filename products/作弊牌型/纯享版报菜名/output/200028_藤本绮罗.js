clearProject();

player_datas[0].nickname = '藤本绮罗-契约';
player_datas[1].nickname = '满分假期';
player_datas[2].nickname = '温存韶光';
player_datas[3].nickname = '校园微风';
player_datas[0].avatar_id = 402802;
player_datas[1].avatar_id = 402804;
player_datas[2].avatar_id = 402805;
player_datas[3].avatar_id = 402806;

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
