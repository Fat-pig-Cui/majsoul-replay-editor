loadproject();

editdata.player_datas[0].nickname = "八木唯";
editdata.player_datas[1].nickname = "四宫夏生";
editdata.player_datas[2].nickname = "莎拉";
editdata.player_datas[3].nickname = "七夕";
editdata.player_datas[0].avatar_id = 400706;
editdata.player_datas[1].avatar_id = 401105;
editdata.player_datas[2].avatar_id = 401605;
editdata.player_datas[3].avatar_id = 403903;

editdata.player_datas[0].views = editdata.player_datas[1].views = editdata.player_datas[2].views = editdata.player_datas[3].views = [
    {"slot": 1, "item_id": 305220}, // 和牌-泰山鸭顶
    {"slot": 2, "item_id": 305320}, // 立直-立直鸭
];

editdata.config = {
    'category': 1,
    'meta': {'mode_id': 0},
    'mode': {
        'mode': 1,
        'detail_rule': {
            'init_point': 100000,
        }
    }
};

// Insert your code below

/*
tiles0 = "11112223334446z";
tiles1 = "1112340678999m";
tiles2 = "111333777999s6z";
tiles3 = "222444666888s6z";
paishan = randompaishan("6z", "0p432z");
roundbegin();
for (let i = 0; i < 4; i++) {
    leimingpai();
    mopai();
}
qiepai();
mopai();
qiepai("6z", true);
hupai();
*/

GameMgr.Inst.checkPaiPu("231127-e18887d1-d8eb-4e13-9ac0-5fb4f1a17426", 0)
