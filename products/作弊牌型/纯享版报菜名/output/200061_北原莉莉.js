clearProject();

player_datas[0].nickname = '北原莉莉-契约';
player_datas[1].nickname = '北原莉莉';
player_datas[2].nickname = '北原莉莉-契约';
player_datas[3].nickname = '北原莉莉';
player_datas[0].avatar_id = 406102;
player_datas[1].avatar_id = 406101;
player_datas[2].avatar_id = 406102;
player_datas[3].avatar_id = 406101;

// 头像框-圣堂百合
player_datas[0].avatar_frame = player_datas[1].avatar_frame = player_datas[2].avatar_frame = player_datas[3].avatar_frame = 305537;
player_datas[0].views = player_datas[1].views = player_datas[2].views = player_datas[3].views = [
    {slot: 1, item_id: 305219}, // 和牌-银链飞雪
    {slot: 2, item_id: 305319}, // 立直-蛇行诡道
    {slot: 5, item_id: 305537}, // 头像框-圣堂百合
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
