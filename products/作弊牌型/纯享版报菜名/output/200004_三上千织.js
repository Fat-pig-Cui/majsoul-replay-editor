clearProject();

player_datas[0].nickname = '三上千织-契约';
player_datas[1].nickname = '甜蜜茶点';
player_datas[2].nickname = '天黑请闭眼';
player_datas[3].nickname = '惊鸿岁';
player_datas[0].avatar_id = 400402;
player_datas[1].avatar_id = 400405;
player_datas[2].avatar_id = 400406;
player_datas[3].avatar_id = 400407;

// 头像框-大小姐发带
player_datas[0].avatar_frame = player_datas[1].avatar_frame = player_datas[2].avatar_frame = player_datas[3].avatar_frame = 305552;
player_datas[0].views = player_datas[1].views = player_datas[2].views = player_datas[3].views = [
    {slot: 5, item_id: 305552}, // 头像框-大小姐发带
    {slot: 6, item_id: 305802}, // 桌布-冲鸭！
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
