clearProject();

// 白色礼赞和细雪呈瑞完全同期, UP装扮:
// 冬日心愿簿UP装扮:
// 和牌-槲寄生下
// 立直-鹿雪冬至
// 桌布-暖屋圣夜
// 牌背-圣诞树

player_datas[0].nickname = '抚子';
player_datas[1].nickname = '四宫夏生';
player_datas[2].nickname = '石原碓海';
player_datas[3].nickname = '七海礼奈';
player_datas[0].avatar_id = 400604;
player_datas[1].avatar_id = 401104;
player_datas[2].avatar_id = 403103;
player_datas[3].avatar_id = 404403;

player_datas[0].views = player_datas[1].views = player_datas[2].views = player_datas[3].views = [
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
