clearProject();

player_datas[0].nickname = '泷川夏彦-契约';
player_datas[1].nickname = '氤氲浮光';
player_datas[2].nickname = '贺今朝';
player_datas[3].nickname = '摇曳心情';
player_datas[0].avatar_id = 404902;
player_datas[1].avatar_id = 404903;
player_datas[2].avatar_id = 404904;
player_datas[3].avatar_id = 404905;

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
