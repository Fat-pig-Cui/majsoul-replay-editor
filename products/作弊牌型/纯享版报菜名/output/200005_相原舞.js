clearProject();

player_datas[0].nickname = '相原舞-契约';
player_datas[1].nickname = '温存韶光';
player_datas[2].nickname = '异想烂漫';
player_datas[3].nickname = '雪间春信';
player_datas[0].avatar_id = 400502;
player_datas[1].avatar_id = 400506;
player_datas[2].avatar_id = 400507;
player_datas[3].avatar_id = 400508;

// 称号-神社贵宾
player_datas[0].title = player_datas[1].title = player_datas[2].title = player_datas[3].title = 600038;
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
// 为了考虑版面, 有重复的语音
// 若要去掉重复的语音, 则给该函数加上参数 true 即可
reportYaku();
// reportYaku(true);
