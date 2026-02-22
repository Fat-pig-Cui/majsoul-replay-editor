clearProject();

player_datas[0].nickname = '抚子-契约';
player_datas[1].nickname = '细雪呈瑞';
player_datas[2].nickname = '四方雀者';
player_datas[3].nickname = '无拘乐趣';
player_datas[0].avatar_id = 400602;
player_datas[1].avatar_id = 400604;
player_datas[2].avatar_id = 400605;
player_datas[3].avatar_id = 400606;

player_datas[0].views = player_datas[1].views = player_datas[2].views = player_datas[3].views = [
    {slot: 6, item_id: 305048}, // 桌布-雀魂祭一周年
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
