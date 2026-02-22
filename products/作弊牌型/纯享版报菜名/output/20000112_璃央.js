clearProject();

player_datas[0].nickname = '璃央-契约';
player_datas[1].nickname = '璃央';
player_datas[2].nickname = '璃央-契约';
player_datas[3].nickname = '绛夜缠仪';
player_datas[0].avatar_id = 40011202;
player_datas[1].avatar_id = 40011201;
player_datas[2].avatar_id = 40011202;
player_datas[3].avatar_id = 40011203;

// 头像框-星点鳞光
player_datas[0].avatar_frame = player_datas[1].avatar_frame = player_datas[2].avatar_frame = player_datas[3].avatar_frame = 30550030;
player_datas[0].views = player_datas[1].views = player_datas[2].views = player_datas[3].views = [
    {slot: 1, item_id: 30520009}, // 和牌-静伏蛰影
    {slot: 2, item_id: 30530009}, // 立直-曲径通幽
    {slot: 5, item_id: 30550030}, // 头像框-星点鳞光
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
