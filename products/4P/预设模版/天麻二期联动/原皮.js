loadproject();

editdata.player_datas[0].nickname = "竹井久";
editdata.player_datas[1].nickname = "福路美穗子";
editdata.player_datas[2].nickname = "新子憧";
editdata.player_datas[3].nickname = "园城寺怜";
editdata.player_datas[0].avatar_id = 406201;
editdata.player_datas[1].avatar_id = 406301;
editdata.player_datas[2].avatar_id = 406401;
editdata.player_datas[3].avatar_id = 406501;

editdata.player_datas[0].views = editdata.player_datas[1].views = editdata.player_datas[2].views = editdata.player_datas[3].views = [
    {"slot": 1, "item_id": 308021}, // 和牌-高岭之花
    {"slot": 2, "item_id": 308022}, // 立直-未来视
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

