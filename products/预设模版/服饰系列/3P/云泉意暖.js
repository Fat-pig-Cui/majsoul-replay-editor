clearProject();

// 同期UP装扮:
// 立直棒-夺笋
// 和牌-墨韵
// 立直-挥毫
// 桌布-熊猫观月
// 牌背-萌滚滚

player_datas[0].nickname = '明智英树';
player_datas[1].nickname = '北见纱和子';
player_datas[2].nickname = '辛西娅';
player_datas[0].avatar_id = 401406;
player_datas[1].avatar_id = 402407;
player_datas[2].avatar_id = 409403;

player_datas[0].views = player_datas[1].views = player_datas[2].views = [
    {slot: 0, item_id: 30560002}, // 立直棒-夺笋
    {slot: 1, item_id: 30520003}, // 和牌-墨韵
    {slot: 2, item_id: 30530003}, // 立直-挥毫
    {slot: 6, item_id: 30580003}, // 桌布-熊猫观月
    {slot: 7, item_id: 30570002}, // 牌背-萌滚滚
];

config = {
    category: 1,
    meta: {mode_id: 0},
    mode: {
        mode: 11,
        detail_rule: {
            init_point: 100000,
            _tablecloth_id: 30580003, // 桌布-熊猫观月
            _mjp_id: 30570002, // 牌背-萌滚滚
        }
    }
};

// 示例对局
demoGame();
