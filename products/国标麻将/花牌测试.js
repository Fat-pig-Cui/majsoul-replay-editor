loadproject();

// 需要导入 add_function.js

// 用"0m"当做花牌

editdata.player_datas[0].nickname = "一姬-契约";
editdata.player_datas[1].nickname = "新年初诣";
editdata.player_datas[2].nickname = "一姬当千";
editdata.player_datas[3].nickname = "绮春歌";
editdata.player_datas[0].avatar_id = 400102;
editdata.player_datas[1].avatar_id = 400104;
editdata.player_datas[2].avatar_id = 400105;
editdata.player_datas[3].avatar_id = 400106;

editdata.config = {
    'category': 1,
    'meta': {'mode_id': 0},
    'mode': {
        'mode': 1,
        'detail_rule': {
            '_guobiao': true,
        }
    }
};

tiles0 = "0m1112223334445z";
tiles1 = "1112345678999m";
tiles2 = "1112345678999p";
tiles3 = "1112345678999s";
paishan = randompaishan("", "5z0000000m");
roundbegin();
combomopai(8);
hupai();
