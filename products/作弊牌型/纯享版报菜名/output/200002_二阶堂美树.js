clearProject();

player_datas[0].nickname = '二阶堂美树-契约';
player_datas[1].nickname = '万象沐春';
player_datas[2].nickname = '鸢尾花之夜';
player_datas[3].nickname = '玩转夏日';
player_datas[0].avatar_id = 400202;
player_datas[1].avatar_id = 400206;
player_datas[2].avatar_id = 400207;
player_datas[3].avatar_id = 400208;

// 称号-喵国大护法
player_datas[0].title = player_datas[1].title = player_datas[2].title = player_datas[3].title = 600021;
player_datas[0].views = player_datas[1].views = player_datas[2].views = player_datas[3].views = [
    {slot: 6, item_id: 305818}, // 桌布-藤萝悦色
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
