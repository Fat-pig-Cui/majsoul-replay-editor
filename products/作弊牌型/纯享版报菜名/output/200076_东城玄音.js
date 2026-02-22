clearProject();

player_datas[0].nickname = '东城玄音-契约';
player_datas[1].nickname = '东城玄音';
player_datas[2].nickname = '东城玄音-契约';
player_datas[3].nickname = '东城玄音';
player_datas[0].avatar_id = 407602;
player_datas[1].avatar_id = 407601;
player_datas[2].avatar_id = 407602;
player_datas[3].avatar_id = 407601;

// 头像框-丹心一寸
player_datas[0].avatar_frame = player_datas[1].avatar_frame = player_datas[2].avatar_frame = player_datas[3].avatar_frame = 305551;
player_datas[0].views = player_datas[1].views = player_datas[2].views = player_datas[3].views = [
    {slot: 1, item_id: 305223}, // 和牌-衔环结草
    {slot: 2, item_id: 305323}, // 立直-狐缘之绊
    {slot: 5, item_id: 305551}, // 头像框-丹心一寸
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
