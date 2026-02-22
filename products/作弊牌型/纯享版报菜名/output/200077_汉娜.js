clearProject();

player_datas[0].nickname = '汉娜-契约';
player_datas[1].nickname = '汉娜';
player_datas[2].nickname = '汉娜-契约';
player_datas[3].nickname = '迷人礼颂';
player_datas[0].avatar_id = 407702;
player_datas[1].avatar_id = 407701;
player_datas[2].avatar_id = 407702;
player_datas[3].avatar_id = 407703;

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
