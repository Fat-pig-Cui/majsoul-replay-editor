clearProject();

player_datas[0].nickname = '寺崎千穗理-契约';
player_datas[1].nickname = '寺崎千穗理';
player_datas[2].nickname = '佳期不负';
player_datas[3].nickname = '玩转夏日';
player_datas[0].avatar_id = 403302;
player_datas[1].avatar_id = 403301;
player_datas[2].avatar_id = 403303;
player_datas[3].avatar_id = 403304;

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
