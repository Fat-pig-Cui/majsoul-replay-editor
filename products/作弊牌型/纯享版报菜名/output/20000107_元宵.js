clearProject();

player_datas[0].nickname = '元宵-契约';
player_datas[1].nickname = '元宵';
player_datas[2].nickname = '元宵-契约';
player_datas[3].nickname = '云踪侠影';
player_datas[0].avatar_id = 40010702;
player_datas[1].avatar_id = 40010701;
player_datas[2].avatar_id = 40010702;
player_datas[3].avatar_id = 40010703;

// 头像框-竹福滚滚
player_datas[0].avatar_frame = player_datas[1].avatar_frame = player_datas[2].avatar_frame = player_datas[3].avatar_frame = 30550022;
player_datas[0].views = player_datas[1].views = player_datas[2].views = player_datas[3].views = [
    {slot: 0, item_id: 30560007}, // 立直棒-青竹伞
    {slot: 5, item_id: 30550022}, // 头像框-竹福滚滚
    {slot: 6, item_id: 30580015}, // 桌布-清辉竹影
    {slot: 7, item_id: 30570009}, // 牌背-翠竹墨影
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
reportYaku();
