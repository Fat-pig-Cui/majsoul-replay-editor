clearProject();

player_datas[0].nickname = '鲁鲁修-契约';
player_datas[1].nickname = '鲁鲁修·兰佩洛基';
player_datas[2].nickname = '鲁鲁修-契约';
player_datas[3].nickname = '棋盘晚宴';
player_datas[0].avatar_id = 407002;
player_datas[1].avatar_id = 407001;
player_datas[2].avatar_id = 407002;
player_datas[3].avatar_id = 407003;

player_datas[0].views = player_datas[1].views = player_datas[2].views = player_datas[3].views = [
    {slot: 0, item_id: 308028}, // 立直棒-骑士的钥匙
    {slot: 1, item_id: 308026}, // 和牌-绝对的命令
    {slot: 2, item_id: 308027}, // 立直-王者的决意
    {slot: 6, item_id: 308029}, // 桌布-魔女的契约
    {slot: 7, item_id: 308030}, // 牌背-假面的裁决
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
// 为了考虑版面, 有重复的语音
// 若要去掉重复的语音, 则给该函数加上参数 true 即可
reportYaku();
// reportYaku(true);
