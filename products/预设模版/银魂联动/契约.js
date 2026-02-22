clearProject();

player_datas[0].nickname = '坂田银时-契约';
player_datas[1].nickname = '桂小太郎-契约';
player_datas[2].nickname = '高杉晋助-契约';
player_datas[3].nickname = '坂本辰马-契约';
player_datas[0].avatar_id = 40011302;
player_datas[1].avatar_id = 40011402;
player_datas[2].avatar_id = 40011502;
player_datas[3].avatar_id = 40011602;

player_datas[0].avatar_frame = player_datas[1].avatar_frame = player_datas[2].avatar_frame = player_datas[3].avatar_frame = 308051; // 头像框-伊丽莎白框
player_datas[0].views = player_datas[1].views = player_datas[2].views = player_datas[3].views = [
    {slot: 0, item_id: 308048}, // 立直棒-志村新八
    {slot: 1, item_id: 308046}, // 和牌-谢幕的Just a way
    {slot: 2, item_id: 308047}, // 立直-伊丽莎白
    {slot: 5, item_id: 308051}, // 头像框-伊丽莎白框
    {slot: 6, item_id: 308049}, // 桌布-骑摩托的银时
    {slot: 7, item_id: 308050}, // 牌背-Just a way
];

setConfig({
    category: 1,
    meta: {mode_id: 0},
    mode: {
        mode: 1,
        detail_rule: {
            init_point: 100000,
            _tablecloth_id: 308049, // 桌布-骑摩托的银时
            _mjp_id: 308050, // 牌背-Just a way
        }
    }
});

// 示例对局
demoGame();
