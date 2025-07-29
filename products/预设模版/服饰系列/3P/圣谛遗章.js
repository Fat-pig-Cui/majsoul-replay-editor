clearproject();

// 同期UP装扮:
// 对局音乐-优雅格调 (没加入 views)
// 立直棒-金枝神谕
// 桌布-天穹星幕
// 牌背-凯旋之环

player_datas[0].nickname = '小鸟游雏田';
player_datas[1].nickname = '夏弥尔';
player_datas[2].nickname = '伊芙';
player_datas[0].avatar_id = 401907;
player_datas[1].avatar_id = 405405;
player_datas[2].avatar_id = 408303;

player_datas[0].views = player_datas[1].views = player_datas[2].views = [
    {slot: 0, item_id: 30560008}, // 立直棒-金枝神谕
    {slot: 6, item_id: 30580019}, // 桌布-天穹星幕
    {slot: 7, item_id: 30570010}, // 牌背-凯旋之环
];

config = {
    category: 1,
    meta: {mode_id: 0},
    mode: {
        mode: 11,
        detail_rule: {
            init_point: 100000,
            _tablecloth_id: 30580019, // 桌布-天穹星幕
            _mjp_id: 30570010, // 牌背-凯旋之环
        }
    }
};

// 示例对局
demogame();
