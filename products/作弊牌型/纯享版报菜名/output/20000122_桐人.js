clearProject();

player_datas[0].nickname = '桐人-契约';
player_datas[1].nickname = '桐人';
player_datas[2].nickname = '桐人-契约';
player_datas[3].nickname = '绀碧之界';
player_datas[0].avatar_id = 40012202;
player_datas[1].avatar_id = 40012201;
player_datas[2].avatar_id = 40012202;
player_datas[3].avatar_id = 40012203;

// 头像框-战斗视界
player_datas[0].avatar_frame = player_datas[1].avatar_frame = player_datas[2].avatar_frame = player_datas[3].avatar_frame = 308057;
player_datas[0].views = player_datas[1].views = player_datas[2].views = player_datas[3].views = [
    {slot: 0, item_id: 308054}, // 立直棒-黑与白
    {slot: 1, item_id: 308052}, // 和牌-百斩缭乱
    {slot: 2, item_id: 308053}, // 立直-决战宣言
    {slot: 5, item_id: 308057}, // 头像框-战斗视界
    {slot: 6, item_id: 308055}, // 桌布-浮游城
    {slot: 7, item_id: 308056}, // 牌背-澄澈之心
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

// 具体内容在 src/core/sample.ts 的 reportYaku 函数中
reportYaku();
