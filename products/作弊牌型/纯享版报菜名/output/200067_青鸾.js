clearProject();

player_datas[0].nickname = '青鸾-契约';
player_datas[1].nickname = '青鸾';
player_datas[2].nickname = '贺今朝';
player_datas[3].nickname = '夏风吹拂';
player_datas[0].avatar_id = 406702;
player_datas[1].avatar_id = 406701;
player_datas[2].avatar_id = 406703;
player_datas[3].avatar_id = 406704;

// 主播(猫爪)认证
player_datas[0].verified = player_datas[1].verified = player_datas[2].verified = player_datas[3].verified = 1;

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
