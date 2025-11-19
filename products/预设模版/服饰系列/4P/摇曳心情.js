clearProject();

// 摇曳心情UP装扮:
// 立直棒-喵星棒
// 和牌-杰克的恶作剧
// 立直-南瓜夜行
// 对局音乐-一千零一夜 (未加入 views)

player_datas[0].nickname = '辉夜姬';
player_datas[1].nickname = '泷川夏彦';
player_datas[2].nickname = '岚星';
player_datas[3].nickname = '希里';
player_datas[0].avatar_id = 402907;
player_datas[1].avatar_id = 404905;
player_datas[2].avatar_id = 407404;
player_datas[3].avatar_id = 409103;

player_datas[0].views = player_datas[1].views = player_datas[2].views = player_datas[3].views = [
    {slot: 0, item_id: 30560001}, // 立直棒-喵星棒
    {slot: 1, item_id: 30520001}, // 和牌-杰克的恶作剧
    {slot: 2, item_id: 30530001}, // 立直-南瓜夜行
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
