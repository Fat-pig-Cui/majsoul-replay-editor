clearProject();

player_datas[0].nickname = '白石奈奈-契约';
player_datas[1].nickname = '清凉夏日';
player_datas[2].nickname = '馥郁满室';
player_datas[3].nickname = '冬日心愿簿';
player_datas[0].avatar_id = 401802;
player_datas[1].avatar_id = 401803;
player_datas[2].avatar_id = 401804;
player_datas[3].avatar_id = 401805;

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
// 为了考虑版面, 有重复的语音
// 若要去掉重复的语音, 则给该函数加上参数 true 即可
reportYaku();
// reportYaku(true);
