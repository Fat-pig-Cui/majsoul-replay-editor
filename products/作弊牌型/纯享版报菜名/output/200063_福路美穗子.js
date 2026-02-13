clearProject();

player_datas[0].nickname = '福路美穗子-契约';
player_datas[1].nickname = '福路美穗子';
player_datas[2].nickname = '福路美穗子-契约';
player_datas[3].nickname = '兔耳派对';
player_datas[0].avatar_id = 406302;
player_datas[1].avatar_id = 406301;
player_datas[2].avatar_id = 406302;
player_datas[3].avatar_id = 406303;

player_datas[0].views = player_datas[1].views = player_datas[2].views = player_datas[3].views = [
    {slot: 0, item_id: 308023}, // 立直棒-爱心便当
    {slot: 1, item_id: 308021}, // 和牌-高岭之花
    {slot: 2, item_id: 308022}, // 立直-未来视
    {slot: 6, item_id: 308024}, // 桌布-清凉假日
    {slot: 7, item_id: 308025}, // 牌背-摇曳彩球
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
