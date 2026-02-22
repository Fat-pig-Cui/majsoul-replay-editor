clearProject();

player_datas[0].nickname = '卡维-契约';
player_datas[1].nickname = '卡维';
player_datas[2].nickname = '命运之夏';
player_datas[3].nickname = '拂晓的G大调';
player_datas[0].avatar_id = 401002;
player_datas[1].avatar_id = 401001;
player_datas[2].avatar_id = 401003;
player_datas[3].avatar_id = 401004;

player_datas[0].views = player_datas[1].views = player_datas[2].views = player_datas[3].views = [
    {slot: 0, item_id: 305612}, // 立直棒-陨石法杖
    {slot: 6, item_id: 305809}, // 动态桌布-紫霞海岸
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
