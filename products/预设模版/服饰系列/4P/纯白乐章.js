clearProject();

// 纯白乐章UP装扮:
// 立直棒-祈愿之矢
// 和牌-惊澜
// 立直-行云
// 头像框-北风之诗

player_datas[0].nickname = '艾丽莎';
player_datas[1].nickname = '七夕';
player_datas[2].nickname = '森川绫子';
player_datas[3].nickname = '琳琅';
player_datas[0].avatar_id = 403207;
player_datas[1].avatar_id = 403905;
player_datas[2].avatar_id = 404806;
player_datas[3].avatar_id = 408404;

// 头像框-北风之诗
player_datas[0].avatar_frame = player_datas[1].avatar_frame = player_datas[2].avatar_frame = player_datas[3].avatar_frame = 30550034;
player_datas[0].views = player_datas[1].views = player_datas[2].views = player_datas[3].views = [
    {slot: 0, item_id: 30560010}, // 立直棒-祈愿之矢
    {slot: 1, item_id: 30520011}, // 和牌-惊澜
    {slot: 2, item_id: 30530011}, // 立直-行云
    {slot: 5, item_id: 30580012}, // 头像框-北风之诗
];

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
