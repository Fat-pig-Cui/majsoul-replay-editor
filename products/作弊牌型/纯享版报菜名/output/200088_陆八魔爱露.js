clearProject();

player_datas[0].nickname = '陆八魔爱露-契约';
player_datas[1].nickname = '陆八魔爱露';
player_datas[2].nickname = '陆八魔爱露-契约';
player_datas[3].nickname = '华芳雅韵';
player_datas[0].avatar_id = 408802;
player_datas[1].avatar_id = 408801;
player_datas[2].avatar_id = 408802;
player_datas[3].avatar_id = 408803;

player_datas[0].views = player_datas[1].views = player_datas[2].views = player_datas[3].views = [
    {slot: 0, item_id: 308038}, // 立直棒-大蛇比纳
    {slot: 1, item_id: 308036}, // 和牌-冷血射击
    {slot: 2, item_id: 308037}, // 立直-虹色轨迹
    {slot: 6, item_id: 308039}, // 桌布-什亭青空
    {slot: 7, item_id: 308040}, // 牌背-佩洛之星
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
