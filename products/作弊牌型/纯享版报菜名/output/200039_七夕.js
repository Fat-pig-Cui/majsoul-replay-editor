clearProject();

player_datas[0].nickname = '七夕-契约';
player_datas[1].nickname = '悸动之夏';
player_datas[2].nickname = '四方雀者';
player_datas[3].nickname = '纯白乐章';
player_datas[0].avatar_id = 403902;
player_datas[1].avatar_id = 403903;
player_datas[2].avatar_id = 403904;
player_datas[3].avatar_id = 403905;

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
