clearProject();

// 圣诞嘉年华实装时没有UP装扮

// 但有活动获得的 圣夜桌布

player_datas[0].nickname = '藤田佳奈';
player_datas[1].nickname = '三上千织';
player_datas[2].nickname = '八木唯';
player_datas[3].nickname = '一之濑空';
player_datas[0].avatar_id = 400303;
player_datas[1].avatar_id = 400403;
player_datas[2].avatar_id = 400703;
player_datas[3].avatar_id = 401303;

player_datas[0].views = player_datas[1].views = player_datas[2].views = player_datas[3].views = [
    {slot: 6, item_id: 305020}, // 圣夜桌布
];

setConfig({
    category: 1,
    meta: {mode_id: 0},
    mode: {
        mode: 1,
        detail_rule: {
            init_point: 100000,
            _tablecloth_id: 305020, // 圣夜桌布
        }
    }
});

// 示例对局
demoGame();
