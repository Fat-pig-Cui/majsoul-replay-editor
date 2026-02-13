clearProject();

player_datas[0].nickname = '辉夜姬-契约';
player_datas[1].nickname = '氤氲浮光';
player_datas[2].nickname = '罗裳曼影';
player_datas[3].nickname = '摇曳心情';
player_datas[0].avatar_id = 402902;
player_datas[1].avatar_id = 402905;
player_datas[2].avatar_id = 402906;
player_datas[3].avatar_id = 402907;

// 称号-神社贵宾
player_datas[0].title = player_datas[1].title = player_datas[2].title = player_datas[3].title = 600038;
// 主播(猫爪)认证
player_datas[0].verified = player_datas[1].verified = player_datas[2].verified = player_datas[3].verified = 1;
player_datas[0].views = player_datas[1].views = player_datas[2].views = player_datas[3].views = [
    {slot: 6, item_id: 30580005}, // 桌布-预热开场
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
