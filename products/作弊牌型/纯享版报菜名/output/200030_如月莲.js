clearProject();

player_datas[0].nickname = '如月莲-契约';
player_datas[1].nickname = '如月莲';
player_datas[2].nickname = '暗夜法则';
player_datas[3].nickname = '新岁景明';
player_datas[0].avatar_id = 403002;
player_datas[1].avatar_id = 403001;
player_datas[2].avatar_id = 403003;
player_datas[3].avatar_id = 403004;

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
