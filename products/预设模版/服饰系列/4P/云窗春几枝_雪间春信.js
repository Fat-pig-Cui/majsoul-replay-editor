clearProject();

// 冬日心愿簿UP装扮:
// 和牌-得胜达摩
// 立直-一锤定音
// 桌布-瑞雪祈狐
// 牌背-圣夜雪人

// 雪间春信UP装扮:
// 立直棒-祈愿之矢
// 和牌-惊澜
// 立直-行云
// 头像框-北风之诗

player_datas[0].nickname = '相原舞';
player_datas[1].nickname = '艾因';
player_datas[2].nickname = '七海礼奈';
player_datas[3].nickname = '如月彩音';
player_datas[0].avatar_id = 400508;
player_datas[1].avatar_id = 402505;
player_datas[2].avatar_id = 404405;
player_datas[3].avatar_id = 406804;

// 头像框-北风之诗
player_datas[0].avatar_frame = player_datas[1].avatar_frame = player_datas[2].avatar_frame = player_datas[3].avatar_frame = 30550034;
player_datas[0].views = player_datas[1].views = player_datas[2].views = player_datas[3].views = [
    {slot: 0, item_id: 30560010}, // 立直棒-祈愿之矢
    {slot: 1, item_id: 30520011}, // 和牌-惊澜
    {slot: 2, item_id: 30530011}, // 立直-行云
    {slot: 5, item_id: 30580012}, // 头像框-北风之诗
    {slot: 6, item_id: 30580012}, // 桌布-瑞雪祈狐
    {slot: 7, item_id: 30570008}, // 牌背-圣夜雪人
];

setConfig({
    category: 1,
    meta: {mode_id: 0},
    mode: {
        mode: 1,
        detail_rule: {
            init_point: 100000,
            _tablecloth_id: 30580012, // 桌布-瑞雪祈狐
            _mjp_id: 30570008, // 牌背-圣夜雪人
        }
    }
});

// 示例对局
demoGame();
