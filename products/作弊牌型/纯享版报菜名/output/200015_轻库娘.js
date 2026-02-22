clearProject();

player_datas[0].nickname = '轻库娘-契约';
player_datas[1].nickname = '轻库娘';
player_datas[2].nickname = '轻库娘-契约';
player_datas[3].nickname = '清凉夏日';
player_datas[0].avatar_id = 401502;
player_datas[1].avatar_id = 401501;
player_datas[2].avatar_id = 401502;
player_datas[3].avatar_id = 401503;

player_datas[0].views = player_datas[1].views = player_datas[2].views = player_datas[3].views = [
    {slot: 0, item_id: 305604}, // 立直棒-乘风破浪
    {slot: 1, item_id: 305208}, // 和牌-海浪的馈赠
    {slot: 2, item_id: 305308}, // 立直-浪之声
    {slot: 6, item_id: 305802}, // 桌布-冲鸭！
    {slot: 7, item_id: 305702}, // 牌背-浪花朵朵
];

setConfig({
    category: 2,
    meta: {mode_id: 13},
    mode: {
        mode: 1,
        detail_rule: {
            _report_yakus: true,
            init_point: 300000,
            _chang_ju_ben_num_: [2, 0, 0],
        }
    }
});

// 具体内容在 src/core/core.ts 的 reportYaku 函数中
// 为了考虑版面, 有重复的语音
// 若要去掉重复的语音, 则给该函数加上参数 true 即可
reportYaku();
// reportYaku(true);
