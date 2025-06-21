loadproject();

// 动画版 天才麻将少女 第一季第1集19min开始
// 清澄高校内部友人场, 四赤东风战
// 因为雀魂天麻联动没有 片冈优希 和 染谷真子, 所以分别用 五十岚阳菜 和 二之宫花 代替

editdata.player_datas[0].nickname = "片冈优希";
editdata.player_datas[1].nickname = "染谷真子";
editdata.player_datas[2].nickname = "宫永咲";
editdata.player_datas[3].nickname = "原村和";
editdata.player_datas[0].avatar_id = 402001;
editdata.player_datas[1].avatar_id = 401701;
editdata.player_datas[2].avatar_id = 403401;
editdata.player_datas[3].avatar_id = 403501;

editdata.player_datas[2].views = [{"slot": 1, "item_id": 308021}]; // 和牌-高岭之花
editdata.player_datas[3].views = [{"slot": 2, "item_id": 308002}]; // 立直-花天月地

editdata.config = {
    'category': 1,
    'meta': {'mode_id': 0},
    'mode': {
        'mode': 1,
        'detail_rule': {
            'dora_count': 4,

            '_chang_ju_ben_num_': [0, 3, 0], // 东4局0本场
            '_scores_': [32600, 18700, 24500, 24200],
            '_local_position_': 2,
        }
    }
};

// 具体到这一小局, 因为动画没有部分切牌和 片冈优希, 染谷真子 的手牌画面, 我这里随便编的
tiles3 = "23467m111p156889s";
tiles0 = "2468m058p227777s";
tiles1 = "2468m2488p44446s";
tiles2 = "6m122334679p333z";
paishan = randompaishan("9p.5z4z4z.1z2z1z.6z1z2z.9s1s4z.2m3p6z.3s1m1z.9p1m5p.9m0p9m.7z0m..2s...9p...3z", "4z.3s...2s");
discardtiles = ["9p4z1z2z4z6z1z5p9m", "", "5z1z6z9s2m3s6m9m7z6p7p", "9s4z2z1z1s3p1m1m0p1s"];
roundbegin();
qiepai();
normalmoqie(35);
moqieliqi();
normalmoqie(10);
mopai();
leimingpai();
zimohu();
