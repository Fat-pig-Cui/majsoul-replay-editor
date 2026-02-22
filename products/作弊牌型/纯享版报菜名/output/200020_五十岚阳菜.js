clearProject();

player_datas[0].nickname = '五十岚阳菜-契约';
player_datas[1].nickname = '春日返校季';
player_datas[2].nickname = '新岁添喜';
player_datas[3].nickname = '无拘乐趣';
player_datas[0].avatar_id = 402002;
player_datas[1].avatar_id = 402004;
player_datas[2].avatar_id = 402005;
player_datas[3].avatar_id = 402006;

// 头像框-猫咪军团的身份
player_datas[0].avatar_frame = player_datas[1].avatar_frame = player_datas[2].avatar_frame = player_datas[3].avatar_frame = 305523;
player_datas[0].views = player_datas[1].views = player_datas[2].views = player_datas[3].views = [
    {slot: 5, item_id: 305523}, // 头像框-猫咪军团的身份
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
