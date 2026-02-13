clearProject();

player_datas[0].nickname = '汪次郎-契约';
player_datas[1].nickname = '化妆舞会';
player_datas[2].nickname = '假日之滨';
player_datas[3].nickname = '冬日心愿簿';
player_datas[0].avatar_id = 401202;
player_datas[1].avatar_id = 401203;
player_datas[2].avatar_id = 401204;
player_datas[3].avatar_id = 401205;

// 称号-神社贵宾
player_datas[0].title = player_datas[1].title = player_datas[2].title = player_datas[3].title = 600038;
// 主播(猫爪)认证
player_datas[0].verified = player_datas[1].verified = player_datas[2].verified = player_datas[3].verified = 1;
player_datas[0].views = player_datas[1].views = player_datas[2].views = player_datas[3].views = [
    {slot: 6, item_id: 305810}, // 桌布-中光波——————！
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
