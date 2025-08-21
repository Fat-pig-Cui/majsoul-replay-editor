clearproject();

// 同期UP装扮:
// 立直棒-绚烂烟花
// 和牌-一击必鲨
// 立直-暗藏鲨机
// 桌布-星月夜
// 牌背-星幕绘卷

// 此外还有活动获得的 称号-勇喵小队 和 牌面-飞鸟与鱼

player_datas[0].nickname = '雏桃';
player_datas[1].nickname = '小野寺七羽';
player_datas[2].nickname = '青鸾';
player_datas[3].nickname = '玖辻';
player_datas[0].avatar_id = 402606;
player_datas[1].avatar_id = 405304;
player_datas[2].avatar_id = 406704;
player_datas[3].avatar_id = 409003;

// 称号-勇喵小队
player_datas[0].title = player_datas[1].title = player_datas[2].title = player_datas[3].title = 600127;
player_datas[0].views = player_datas[1].views = player_datas[2].views = player_datas[3].views = [
    {slot: 0, item_id: 30560009}, // 立直棒-绚烂烟花
    {slot: 1, item_id: 30520010}, // 和牌-一击必鲨
    {slot: 2, item_id: 30530010}, // 立直-暗藏鲨机
    {slot: 6, item_id: 30580020}, // 桌布-星月夜
    {slot: 7, item_id: 30570012}, // 牌背-星幕绘卷
    {slot: 13, item_id: 30710001}, // 牌面-飞鸟与鱼
];

config = {
    category: 1,
    meta: {mode_id: 0},
    mode: {
        mode: 1,
        detail_rule: {
            init_point: 100000,
            _tablecloth_id: 30580020, // 桌布-星月夜
            _mjp_id: 30570012, // 牌背-星幕绘卷
            _mjpsurface_id: 30710001, // 牌面-飞鸟与鱼
        }
    }
};

// 示例对局
demogame();
