clearProject();

player_datas[0].nickname = '鲁鲁修-契约';
player_datas[1].nickname = 'C.C.-契约';
player_datas[2].nickname = '枢木朱雀-契约';
player_datas[3].nickname = '红月卡莲-契约';
player_datas[0].avatar_id = 407002;
player_datas[1].avatar_id = 407102;
player_datas[2].avatar_id = 407202;
player_datas[3].avatar_id = 407302;

player_datas[0].views = player_datas[1].views = player_datas[2].views = player_datas[3].views = [
    {slot: 0, item_id: 308028}, // 立直棒-骑士的钥匙
    {slot: 1, item_id: 308026}, // 和牌-绝对的命令
    {slot: 2, item_id: 308027}, // 立直-王者的决意
    {slot: 6, item_id: 308029}, // 桌布-魔女的契约
    {slot: 7, item_id: 308030}, // 牌背-假面的裁决
];

config = {
    category: 1,
    meta: {mode_id: 0},
    mode: {
        mode: 1,
        detail_rule: {
            init_point: 100000,
            _tablecloth_id: 308029, // 桌布-魔女的契约
            _mjp_id: 308030, // 牌背-假面的裁决
        }
    }
};

// 示例对局
demoGame();
