clearProject();

player_datas[0].nickname = '坂本辰马-契约';
player_datas[1].nickname = '坂本辰马';
player_datas[2].nickname = '坂本辰马-契约';
player_datas[3].nickname = '麻将桌即人生';
player_datas[0].avatar_id = 40011602;
player_datas[1].avatar_id = 40011601;
player_datas[2].avatar_id = 40011602;
player_datas[3].avatar_id = 40011603;

// 头像框-伊丽莎白框
player_datas[0].avatar_frame = player_datas[1].avatar_frame = player_datas[2].avatar_frame = player_datas[3].avatar_frame = 308051;
player_datas[0].views = player_datas[1].views = player_datas[2].views = player_datas[3].views = [
    {slot: 0, item_id: 308048}, // 立直棒-志村新八
    {slot: 1, item_id: 308046}, // 和牌-谢幕的Just a way
    {slot: 2, item_id: 308047}, // 立直-伊丽莎白
    {slot: 5, item_id: 308051}, // 头像框-伊丽莎白框
    {slot: 6, item_id: 308049}, // 桌布-骑摩托的银时
    {slot: 7, item_id: 308050}, // 牌背-Just a way
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
