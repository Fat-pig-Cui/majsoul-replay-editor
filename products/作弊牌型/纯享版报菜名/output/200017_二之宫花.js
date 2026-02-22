clearProject();

player_datas[0].nickname = '二之宫花-契约';
player_datas[1].nickname = '命运之夏';
player_datas[2].nickname = '馥郁满室';
player_datas[3].nickname = '冬日心愿簿';
player_datas[0].avatar_id = 401702;
player_datas[1].avatar_id = 401707;
player_datas[2].avatar_id = 401708;
player_datas[3].avatar_id = 401709;

// 头像框-豆芽
player_datas[0].avatar_frame = player_datas[1].avatar_frame = player_datas[2].avatar_frame = player_datas[3].avatar_frame = 305500;
player_datas[0].views = player_datas[1].views = player_datas[2].views = player_datas[3].views = [
    {slot: 0, item_id: 305621}, // 立直棒-盆栽
    {slot: 5, item_id: 305500}, // 头像框-豆芽
    {slot: 6, item_id: 305801}, // 桌布-锦鲤游
    {slot: 7, item_id: 305715}, // 牌背-新手报到
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
