clearProject();

player_datas[0].nickname = '宫永咲';
player_datas[1].nickname = '福姬';
player_datas[2].nickname = '七夕';
player_datas[3].nickname = '远坂凛';
player_datas[0].avatar_id = 403401;
player_datas[1].avatar_id = 403801;
player_datas[2].avatar_id = 403901;
player_datas[3].avatar_id = 40010901;

setConfig({
    category: 1,
    meta: {mode_id: 0},
    mode: {
        mode: 1,
        detail_rule: {
            init_point: 100000,
        }
    }
});

// 示例对局
demoGame();
