clearProject();

player_datas[0].nickname = '月见山-契约';
player_datas[1].nickname = '春日返校季';
player_datas[2].nickname = '禁锢之地';
player_datas[3].nickname = '温存韶光';
player_datas[0].avatar_id = 402702;
player_datas[1].avatar_id = 402703;
player_datas[2].avatar_id = 402704;
player_datas[3].avatar_id = 402705;

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
