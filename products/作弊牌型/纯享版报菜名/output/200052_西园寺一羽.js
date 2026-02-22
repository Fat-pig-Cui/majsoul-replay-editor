clearProject();

player_datas[0].nickname = '西园寺一羽-契约';
player_datas[1].nickname = '西园寺一羽';
player_datas[2].nickname = '西园寺一羽-契约';
player_datas[3].nickname = '西园寺一羽';
player_datas[0].avatar_id = 405202;
player_datas[1].avatar_id = 405201;
player_datas[2].avatar_id = 405202;
player_datas[3].avatar_id = 405201;

// 头像框-秋霜切玉
player_datas[0].avatar_frame = player_datas[1].avatar_frame = player_datas[2].avatar_frame = player_datas[3].avatar_frame = 305529;
player_datas[0].views = player_datas[1].views = player_datas[2].views = player_datas[3].views = [
    {slot: 1, item_id: 305215}, // 和牌-剑吟虎啸
    {slot: 2, item_id: 305315}, // 立直-虎啸长风
    {slot: 5, item_id: 305529}, // 头像框-秋霜切玉
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
