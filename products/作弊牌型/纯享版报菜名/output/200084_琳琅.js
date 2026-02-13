clearProject();

player_datas[0].nickname = '琳琅-契约';
player_datas[1].nickname = '琳琅';
player_datas[2].nickname = '奇遇星光';
player_datas[3].nickname = '纯白乐章';
player_datas[0].avatar_id = 408402;
player_datas[1].avatar_id = 408401;
player_datas[2].avatar_id = 408403;
player_datas[3].avatar_id = 408404;

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
