clearProject();

player_datas[0].nickname = '小野寺七羽-契约';
player_datas[1].nickname = '小野寺七羽';
player_datas[2].nickname = '夏日风物诗';
player_datas[3].nickname = '夏风吹拂';
player_datas[0].avatar_id = 405302;
player_datas[1].avatar_id = 405301;
player_datas[2].avatar_id = 405303;
player_datas[3].avatar_id = 405304;

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
