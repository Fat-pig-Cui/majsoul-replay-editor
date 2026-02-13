clearProject();

player_datas[0].nickname = '四宫夏生-契约';
player_datas[1].nickname = '化妆舞会';
player_datas[2].nickname = '细雪呈瑞';
player_datas[3].nickname = '悸动之夏';
player_datas[0].avatar_id = 401102;
player_datas[1].avatar_id = 401103;
player_datas[2].avatar_id = 401104;
player_datas[3].avatar_id = 401105;

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
