clearProject();

player_datas[0].nickname = '原村和-契约';
player_datas[1].nickname = '原村和';
player_datas[2].nickname = '凛然花开';
player_datas[3].nickname = '兔耳派对';
player_datas[0].avatar_id = 403502;
player_datas[1].avatar_id = 403501;
player_datas[2].avatar_id = 403503;
player_datas[3].avatar_id = 403504;

player_datas[0].views = player_datas[1].views = player_datas[2].views = player_datas[3].views = [
    {slot: 0, item_id: 308003}, // 立直棒-墨西哥卷饼
    {slot: 1, item_id: 308001}, // 和牌-龙卷雷霆
    {slot: 2, item_id: 308002}, // 立直-花天月地
    {slot: 6, item_id: 308004}, // 桌布-赛间小憩
    {slot: 7, item_id: 308005}, // 牌背-艾托企鹅
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
reportYaku();
