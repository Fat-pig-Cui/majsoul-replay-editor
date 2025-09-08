clearProject();

// 海滩派对实装时没有UP装扮, 但有以下装扮加入
// 立直棒-雪糕
// 立直棒-断恶
// 和牌-逆鳞
// 和牌-K.O.
// 立直-龙腾
// 立直-叮～
// 立直音乐-出阵 (没加入views)
// 桌布-吃瓜 (没加入views)
// 桌布-雀魂祭一周年

// 此外还有活动获得的 头像框-豆芽

player_datas[0].nickname = '一姬';
player_datas[1].nickname = '相原舞';
player_datas[2].nickname = '抚子';
player_datas[3].nickname = '九条璃雨';
player_datas[0].avatar_id = 400103;
player_datas[1].avatar_id = 400503;
player_datas[2].avatar_id = 400603;
player_datas[3].avatar_id = 400803;

// 头像框-豆芽
player_datas[0].avatar_frame = player_datas[1].avatar_frame = player_datas[2].avatar_frame = player_datas[3].avatar_frame = 305500;
// 一姬, 相原舞
player_datas[0].views = player_datas[1].views = [
    {slot: 0, item_id: 305042}, // 立直棒-雪糕
    {slot: 1, item_id: 305040}, // 和牌-逆鳞
    {slot: 2, item_id: 305038}, // 立直-龙腾
    {slot: 5, item_id: 305500}, // 头像框-豆芽
    {slot: 6, item_id: 305048}, // 桌布-雀魂祭一周年
];
// 抚子, 九条璃雨
player_datas[2].views = player_datas[3].views = [
    {slot: 0, item_id: 305041}, // 立直棒-断恶
    {slot: 1, item_id: 305039}, // 和牌-K.O.
    {slot: 2, item_id: 305037}, // 立直-叮～
    {slot: 5, item_id: 305500}, // 头像框-豆芽
    {slot: 6, item_id: 305048}, // 桌布-雀魂祭一周年
];

config = {
    category: 1,
    meta: {mode_id: 0},
    mode: {
        mode: 1,
        detail_rule: {
            _init_point: 100000,
            _tablecloth_id: 305048, // 桌布-雀魂祭一周年
        }
    }
};

// 示例对局
demoGame();
