clearProject();

// 同期UP装扮:
// 和牌-清波跃金
// 立直-荷间戏
// 桌布-月满楼
// 牌背-几度春

// 此外还有活动奖励: 桌布-沧溟水府

player_datas[0].nickname = '福姬';
player_datas[1].nickname = '伊芙';
player_datas[2].nickname = '局';
player_datas[0].avatar_id = 403807;
player_datas[1].avatar_id = 408304;
player_datas[2].avatar_id = 409203;

player_datas[0].views = player_datas[1].views = player_datas[2].views = [
    {slot: 1, item_id: 30520012}, // 和牌-清波跃金
    {slot: 2, item_id: 30530012}, // 立直-荷间戏
    {slot: 6, item_id: 30580027}, // 桌布-月满楼
    {slot: 7, item_id: 30570017}, // 牌背-几度春
];

setConfig({
    category: 1,
    meta: {mode_id: 0},
    mode: {
        mode: 11,
        detail_rule: {
            init_point: 100000,
            _tablecloth_id: 30580027, // 桌布-月满楼
            _mjp_id: 30570017, // 牌背-几度春
        }
    }
});

// 示例对局
demoGame();
