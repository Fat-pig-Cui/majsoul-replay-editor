clearproject();

// 春池小憩UP装扮:
// 立直棒-仿生喵
// 和牌-核心裂变
// 立直-虚拟导航

// 氤氲浮光UP装扮:
// 和牌-机械哲学
// 立直-量子智能
// 牌背-魂之元件

player_datas[0].nickname = '辉夜姬';
player_datas[1].nickname = '福姬';
player_datas[2].nickname = '泷川夏彦';
player_datas[3].nickname = '夏弥尔';
player_datas[0].avatar_id = 402905;
player_datas[1].avatar_id = 403803;
player_datas[2].avatar_id = 404903;
player_datas[3].avatar_id = 405403;

// 福姬, 夏弥尔
player_datas[1].views = player_datas[3].views = [
    {slot: 0, item_id: 305607}, // 立直棒-仿生喵
    {slot: 1, item_id: 305211}, // 和牌-核心裂变
    {slot: 2, item_id: 305311}, // 立直-虚拟导航
    {slot: 7, item_id: 305713}, // 牌背-魂之元件
];
// 辉夜姬, 泷川夏彦
player_datas[0].views = player_datas[2].views = [
    {slot: 0, item_id: 305607}, // 立直棒-仿生喵
    {slot: 1, item_id: 305221}, // 和牌-机械哲学
    {slot: 2, item_id: 305321}, // 立直-量子智能
    {slot: 7, item_id: 305713}, // 牌背-魂之元件
];

config = {
    category: 1,
    meta: {mode_id: 0},
    mode: {
        mode: 1,
        detail_rule: {
            init_point: 100000,
            _mjp_id: 305713, // 牌背-魂之元件
        }
    }
};

// 示例对局
demogame();
