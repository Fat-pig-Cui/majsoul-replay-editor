clearProject();

player_datas[0].nickname = '伊芙-契约';
player_datas[1].nickname = '伊芙';
player_datas[2].nickname = '圣谛遗章';
player_datas[3].nickname = '缘结祈岁';
player_datas[0].avatar_id = 408302;
player_datas[1].avatar_id = 408301;
player_datas[2].avatar_id = 408303;
player_datas[3].avatar_id = 408304;

player_datas[0].views = player_datas[1].views = player_datas[2].views = player_datas[3].views = [
    {slot: 1, item_id: 30520002}, // 和牌-虚空结界
    {slot: 2, item_id: 30530002}, // 立直-星河入梦
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
