clearProject();

player_datas[0].nickname = '岚星-契约';
player_datas[1].nickname = '岚星';
player_datas[2].nickname = '不寐之绊';
player_datas[3].nickname = '摇曳心情';
player_datas[0].avatar_id = 407402;
player_datas[1].avatar_id = 407401;
player_datas[2].avatar_id = 407403;
player_datas[3].avatar_id = 407404;

player_datas[0].views = player_datas[1].views = player_datas[2].views = player_datas[3].views = [
    {slot: 0, item_id: 305620}, // 立直棒-秘传之卷
    {slot: 1, item_id: 305222}, // 和牌-天地无用
    {slot: 2, item_id: 305322}, // 立直-毒烟玉
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
