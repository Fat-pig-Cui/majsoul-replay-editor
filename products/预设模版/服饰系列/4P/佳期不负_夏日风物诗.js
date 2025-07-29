clearproject();

// 佳期不负UP装扮:
// 立直棒-乘风破浪
// 和牌-海浪的馈赠
// 立直-浪之声
// 桌布-冲鸭！
// 牌背-浪花朵朵

// 夏日风物诗UP装扮:
// 立直棒-波子汽水
// 和牌-泰山鸭顶
// 立直-立直鸭
// 桌布-小黄鸭冲浪里
// 牌背-鸭鸭牌背

player_datas[0].nickname = '明智英树';
player_datas[1].nickname = '寺崎千穗理';
player_datas[2].nickname = '小野寺七羽';
player_datas[3].nickname = '泽克斯';
player_datas[0].avatar_id = 401405;
player_datas[1].avatar_id = 403303;
player_datas[2].avatar_id = 405303;
player_datas[3].avatar_id = 406003;

// 明智英树, 寺崎千穗理
player_datas[0].views = player_datas[1].views = [
    {slot: 0, item_id: 305604}, // 立直棒-乘风破浪
    {slot: 1, item_id: 305208}, // 和牌-海浪的馈赠
    {slot: 2, item_id: 305308}, // 立直-浪之声
    {slot: 6, item_id: 305802}, // 桌布-冲鸭！
    {slot: 7, item_id: 305702}, // 牌背-浪花朵朵
];
// 小野寺七羽, 泽克斯
player_datas[2].views = player_datas[3].views = [
    {slot: 0, item_id: 305613}, // 立直棒-波子汽水
    {slot: 1, item_id: 305220}, // 和牌-泰山鸭顶
    {slot: 2, item_id: 305320}, // 立直-立直鸭
    {slot: 6, item_id: 305811}, // 桌布-小黄鸭冲浪里
    {slot: 7, item_id: 305709}, // 牌背-鸭鸭牌背
];

config = {
    category: 1,
    meta: {mode_id: 0},
    mode: {
        mode: 1,
        detail_rule: {
            init_point: 100000,
            _tablecloth_id: 305811, // 桌布-小黄鸭冲浪里
            _mjp_id: 305709, // 牌背-鸭鸭牌背
        }
    }
};

// 示例对局
demogame();
