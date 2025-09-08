clearProject();

// 月夜华尔兹UP装扮:
// 立直棒-应援棒
// 和牌-安可
// 立直-开场曲

// 拂晓的G大调UP装扮:
// 和牌-槲寄生下
// 立直-鹿雪冬至
// 桌布-暖屋圣夜
// 牌背-圣诞树

player_datas[0].nickname = '八木唯';
player_datas[1].nickname = '卡维';
player_datas[2].nickname = '北见纱和子';
player_datas[3].nickname = '森川绫子';
player_datas[0].avatar_id = 400705;
player_datas[1].avatar_id = 401004;
player_datas[2].avatar_id = 402404;
player_datas[3].avatar_id = 404804;

// 八木唯, 北见纱和子
player_datas[0].views = player_datas[2].views = [
    {slot: 0, item_id: 305605}, // 立直棒-应援棒
    {slot: 1, item_id: 305209}, // 和牌-安可
    {slot: 2, item_id: 305309}, // 立直-开场曲
    {slot: 6, item_id: 305807}, // 桌布-暖屋圣夜
    {slot: 7, item_id: 305706}, // 牌背-圣诞树
];
// 卡维, 森川绫子
player_datas[1].views = player_datas[3].views = [
    {slot: 0, item_id: 305605}, // 立直棒-应援棒
    {slot: 1, item_id: 305216}, // 和牌-槲寄生下
    {slot: 2, item_id: 305316}, // 立直-鹿雪冬至
    {slot: 6, item_id: 305807}, // 桌布-暖屋圣夜
    {slot: 7, item_id: 305706}, // 牌背-圣诞树
];

config = {
    category: 1,
    meta: {mode_id: 0},
    mode: {
        mode: 1,
        detail_rule: {
            init_point: 100000,
            _tablecloth_id: 305807, // 桌布-暖屋圣夜
            _mjp_id: 305706, // 牌背-圣诞树
        }
    }
};

// 示例对局
demoGame();
