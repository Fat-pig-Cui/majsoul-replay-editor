clearProject();

player_datas[0].nickname = '一姬-契约';
player_datas[1].nickname = '一姬当千';
player_datas[2].nickname = '绮春歌';
player_datas[3].nickname = '校园微风';
player_datas[0].avatar_id = 400102;
player_datas[1].avatar_id = 400105;
player_datas[2].avatar_id = 400106;
player_datas[3].avatar_id = 400107;

// 称号-一姬当千
player_datas[0].title = player_datas[1].title = player_datas[2].title = player_datas[3].title = 600045;
// 主播(猫爪)认证
player_datas[0].verified = player_datas[1].verified = player_datas[2].verified = player_datas[3].verified = 1;
player_datas[0].views = player_datas[1].views = player_datas[2].views = player_datas[3].views = [
    {slot: 0, item_id: 305049}, // 立直棒-炎夏型一姬甜筒
    {slot: 1, item_id: 305213}, // 和牌-疾月斩
    {slot: 2, item_id: 305324}, // 立直-猫过留痕
    {slot: 6, item_id: 305046}, // 桌布-吃瓜
    {slot: 13, item_id: 305718}, // 牌面-猫咪雀圣
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
