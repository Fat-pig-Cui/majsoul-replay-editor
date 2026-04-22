clearProject();

player_datas[0].nickname = '桐人-绀碧之界';
player_datas[1].nickname = '亚丝娜-绀碧之界';
player_datas[2].nickname = '莉法-绀碧之界';
player_datas[3].nickname = '诗乃-绀碧之界';
player_datas[0].avatar_id = 40012203;
player_datas[1].avatar_id = 40012303;
player_datas[2].avatar_id = 40012403;
player_datas[3].avatar_id = 40012503;

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
    category: 1,
    meta: {mode_id: 0},
    mode: {
        mode: 1,
        detail_rule: {
            init_point: 100000,
            _tablecloth_id: 308055, // 桌布-浮游城
            _mjp_id: 308056, // 牌背-澄澈之心
        }
    }
});

// 示例对局
demoGame();
