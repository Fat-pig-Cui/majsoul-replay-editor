clearProject();

// 除了轻库娘

// 清凉夏日UP装扮:
// 立直棒-乘风破浪
// 和牌-海浪的馈赠
// 立直-浪之声
// 桌布-冲鸭！
// 牌背-浪花朵朵

player_datas[0].nickname = '三上千织';
player_datas[1].nickname = '泽尼娅';
player_datas[2].nickname = '白石奈奈';
player_datas[3].nickname = '五十岚阳菜';
player_datas[0].avatar_id = 400404;
player_datas[1].avatar_id = 400904;
player_datas[2].avatar_id = 401803;
player_datas[3].avatar_id = 402003;

player_datas[0].views = player_datas[1].views = player_datas[2].views = player_datas[3].views = [
    {slot: 0, item_id: 305604}, // 立直棒-乘风破浪
    {slot: 1, item_id: 305208}, // 和牌-海浪的馈赠
    {slot: 2, item_id: 305308}, // 立直-浪之声
    {slot: 6, item_id: 305802}, // 桌布-冲鸭！
    {slot: 7, item_id: 305702}, // 牌背-浪花朵朵
];

setConfig({
    category: 1,
    meta: {mode_id: 0},
    mode: {
        mode: 1,
        detail_rule: {
            init_point: 100000,
            _tablecloth_id: 305802, // 桌布-冲鸭！
            _mjp_id: 305702, // 牌背-浪花朵朵
        }
    }
});

// 示例对局
demoGame();
