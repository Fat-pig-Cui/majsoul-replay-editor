clearProject();

player_datas[0].nickname = '远坂凛-契约';
player_datas[1].nickname = '远坂凛';
player_datas[2].nickname = '远坂凛-契约';
player_datas[3].nickname = '命运之夜';
player_datas[0].avatar_id = 40010902;
player_datas[1].avatar_id = 40010901;
player_datas[2].avatar_id = 40010902;
player_datas[3].avatar_id = 40010903;

player_datas[0].views = player_datas[1].views = player_datas[2].views = player_datas[3].views = [
    {slot: 0, item_id: 308043}, // 立直棒-胜利誓约
    {slot: 1, item_id: 308041}, // 和牌-咒层界・恶念祝祭
    {slot: 2, item_id: 308042}, // 立直-虚影祝祷
    {slot: 6, item_id: 308044}, // 桌布-剑之丘
    {slot: 7, item_id: 308045}, // 牌背-噬光之剑
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
