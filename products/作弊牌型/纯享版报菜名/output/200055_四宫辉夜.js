clearProject();

player_datas[0].nickname = '四宫辉夜-契约';
player_datas[1].nickname = '四宫辉夜';
player_datas[2].nickname = '四宫辉夜-契约';
player_datas[3].nickname = '偷心怪盗';
player_datas[0].avatar_id = 405502;
player_datas[1].avatar_id = 405501;
player_datas[2].avatar_id = 405502;
player_datas[3].avatar_id = 405503;

player_datas[0].views = player_datas[1].views = player_datas[2].views = player_datas[3].views = [
    {slot: 0, item_id: 308018}, // 立直棒-恋之反省
    {slot: 1, item_id: 308016}, // 和牌-恋之降临
    {slot: 2, item_id: 308017}, // 立直-恋之箭矢
    {slot: 6, item_id: 308019}, // 桌布-恋之见证
    {slot: 7, item_id: 308020}, // 牌背-恋之背影
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
