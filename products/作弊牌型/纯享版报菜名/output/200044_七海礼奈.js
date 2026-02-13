clearProject();

player_datas[0].nickname = '七海礼奈-契约';
player_datas[1].nickname = '白色礼赞';
player_datas[2].nickname = '枕边私语';
player_datas[3].nickname = '云窗春几枝';
player_datas[0].avatar_id = 404402;
player_datas[1].avatar_id = 404403;
player_datas[2].avatar_id = 404404;
player_datas[3].avatar_id = 404405;

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
