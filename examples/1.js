try {
    MRE.open();
} catch (e) {
}

loadproject();
editdata.player_datas[0].nickname = "电脑0";
editdata.player_datas[1].nickname = "电脑1";
editdata.player_datas[2].nickname = "电脑2";
editdata.player_datas[3].nickname = "电脑3";
editdata.player_datas[0].avatar_id = 400101;
editdata.player_datas[1].avatar_id = 400101;
editdata.player_datas[2].avatar_id = 400101;
editdata.player_datas[3].avatar_id = 400101;
settings.chuanma_points_method = 0;
editdata.config = {
    'category': 2,
    'meta': {'mode_id': 11},
    'mode': {
        'mode': 1,
        'detail_rule': {
            'begin_open_mode': 0,
            'chuanma': 0,
            'dora3_mode': 0,
            'dora_count': 3,
            'fanfu': 1,
            'guyi_mode': 0,
            'have_zimosun': true,
            'huansanzhang': 0,
            'open_hand': 0,
            'init_point': 25000,
            'muyu_mode': 0,
            'shiduan': 1,
            'xuezhandaodi': 0,
            'xueliu': 0
        }
    }
}
//gamebegin();
//第一局（流局满贯，作弊） 
tiles0 = ["1m", "1m", "1m", "2m", "3m", "4m", "0m", "6m", "7m", "8m", "9m", "9m", "9m", "5z"];
tiles1 = ["1p", "1p", "1p", "2p", "3p", "4p", "0p", "6p", "7p", "8p", "9p", "9p", "9p"];
tiles2 = ["1s", "1s", "1s", "2s", "3s", "4s", "0s", "6s", "7s", "8s", "9s", "9s", "9s"];
tiles3 = ["1z", "1z", "1z", "2z", "2z", "2z", "3z", "3z", "3z", "4z", "4z", "4z", "7z"];
paishan = "5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z5z";
roundbegin();
qiepai("5z");
for (let i = 69; i >= 1; i--) {
    mopai();
    qiepai();
}
notileliuju();
//roundend();
//第二局
tiles0 = ["1m", "1m", "1m", "2m", "3m", "4m", "0m", "6m", "7m", "8m", "9m", "9m", "9m", "1z"];
tiles1 = ["1p", "1p", "1p", "2p", "3p", "4p", "0p", "6p", "7p", "8p", "9p", "9p", "9p"];
tiles2 = ["1s", "1s", "1s", "2s", "3s", "4s", "0s", "6s", "7s", "8s", "9s", "9s", "9s"];
tiles3 = ["1z", "1z", "1z", "2z", "2z", "2z", "3z", "3z", "3z", "4z", "4z", "4z", "7z"];
paishan = randompaishan("2z3z9m", "5z5z5z5z");
roundbegin();
qiepai("1z");
mingpai(); // 3 家明杠 1z
mopai(); // 摸 5z
qiepai();
mopai(); // 0 家摸 2z
qiepai();
mingpai(); // 3 家明杠 2z
mopai(); // 摸 5z
qiepai();
mopai(); // 0 家摸 3z
qiepai();
mingpai(); // 3 家明杠 3z
mopai(); // 摸 5z
qiepai();
mopai(); // 0 家摸 9m
leimingpai(); // 0 家暗杠 9m
mopai(); // 0 家摸 5z
qiepai();
liuju();
//roundend();
//第三局（每局的dora可能不一样哦）
tiles0 = ["1s", "1s", "1s", "2s", "3s", "4s", "0s", "6s", "7s", "8s", "9s", "9s", "9s", "1p"];
tiles1 = ["1p", "1p", "2p", "3p", "7m", "7m", "7m", "8m", "8m", "8m", "9m", "9m", "9m"];
tiles2 = ["2s", "2s", "2s", "3s", "3s", "3s", "4s", "4s", "4s", "5s", "5s", "6s", "6s"];
tiles3 = ["2m", "2m", "2m", "3m", "3m", "3m", "4m", "4m", "4m", "5m", "5m", "6m", "6m"];
paishan = randompaishan("4p");
roundbegin();
qiepai("1p", true);
hupai();
//roundend();
//第四局（诈和示范） 
tiles1 = "1112340678999m6z";
tiles2 = "238s55p12556677z";
tiles3 = "223446688s3457z";
tiles0 = "346s59p11223344z";
paishan = randompaishan("3s");
roundbegin();
hupai();
//roundend();
//第五局 
tiles1 = ["4m", "5m", "6m", "4p", "5p", "6p", "2s", "2s", "6z", "5s", "5s", "8s", "8s", "6z"];
tiles2 = ["1z", "1z", "1z", "2z", "2z", "2z", "3z", "3z", "3z", "4z", "4z", "4z", "7z"];
tiles3 = ["1p", "1p", "1p", "2p", "3p", "4p", "0p", "6p", "7p", "8p", "9p", "9p", "9p"];
tiles0 = ["1m", "1m", "1m", "2m", "3m", "4m", "0m", "6m", "7m", "8m", "9m", "9m", "9m"];
paishan = randompaishan("8s2s", "5z5z5z5z6z7z7z7z");
roundbegin();
qiepai("6z");
mopai();
qiepai();
mingpai();
qiepai("6z");
mopai();
qiepai();
hupai();
//roundend();
//第六局
tiles1 = ["3m", "4m", "5m", "3p", "4p", "5p", "4s", "7s", "1z", "1z", "1z", "5z", "5z", "5z"];
tiles2 = ["3s", "1m", "1m", "1m", "2m", "3m", "4m", "0m", "6m", "7m", "8m", "9m", "9m"];
tiles3 = ["3s", "3s", "6z", "6z", "4s", "4s", "6s", "6s", "6s", "8s", "8s", "8s", "2s"];
tiles0 = ["1p", "1p", "1p", "2p", "3p", "4p", "0p", "6p", "7p", "8p", "9p", "9p", "9p"];
paishan = randompaishan("9m9s1z9s3s", "1s1s1s1s7s7s4s5s");
discardtiles = ["", "7s5z", "3s", "2s"];
roundbegin();
qiepai();
mopai();
qiepai(true);
mingpai();
qiepai();
mopai();
qiepai(true);
mopai();
leimingpai();
mopai();
qiepai(true);
mopai();
qiepai();
mopai();
leimingpai();
hupai();
//roundend();
//第七局
tiles1 = ["2s", "2s", "4s", "4s", "8s", "8s", "1z", "1z", "2z", "2z", "3z", "3z", "4z", "7z"];
tiles2 = ["1m", "1m", "1m", "2m", "3m", "4m", "0m", "6m", "7m", "8m", "9m", "9m", "9m"];
tiles3 = ["1p", "1p", "1p", "2p", "3p", "4p", "0p", "6p", "7p", "8p", "9p", "9p", "9p"];
tiles0 = ["1s", "1s", "1s", "2s", "3s", "4s", "0s", "6s", "7s", "8s", "9s", "9s", "9s"];
paishan = randompaishan("4z", "5z5z5z5z6z6z6z6z");
roundbegin();
qiepai("7z", true);
mopai();
qiepai("4z", true);
hupai();
//roundend();
//第八局
tiles1 = "1m1m1m2m3m4m0m6m7m8m9m9m9m1z";
tiles2 = "1p1p1p2p3p4p0p6p7p8p9p9p9p";
tiles3 = "1s1s1s2s3s4s0s6s7s8s9s9s9s";
tiles0 = "2p2s3p3s4p4s5m6p7p8p6s7s8s";
paishan = randompaishan("1z1z1z");
roundbegin();
qiepai("1z", true);
mopai();
qiepai(true);
mopai();
qiepai(true);
mopai();
qiepai(true);
liuju();
//roundend();
//第九局
tiles1 = ["1m", "1m", "1m", "2m", "3m", "4m", "0m", "6m", "7m", "8m", "9m", "9m", "9m", "6z"];
tiles2 = ["2s", "3s", "8s", "5p", "5p", "1z", "2z", "5z", "5z", "6z", "6z", "7z", "7z"];
tiles3 = ["2s", "2s", "3s", "4s", "4s", "6s", "6s", "8s", "8s", "3z", "4z", "5z", "7z"];
tiles0 = ["3s", "4s", "6s", "5p", "9p", "1z", "1z", "2z", "2z", "3z", "3z", "4z", "4z"];
paishan = randompaishan("3s");
roundbegin();
qiepai("6z", true);
mingpai(["6z", "6z"]);
qiepai("8s");
mingpai(["8s", "8s"]);
qiepai("3z");
mingpai(["3z", "3z"]);
qiepai("5p");
mingpai(["5p", "5p"]);
qiepai("2z");
mingpai(["2z", "2z"]);
qiepai("6s");
mingpai(["6s", "6s"]);
qiepai("7z");
mingpai(["7z", "7z"]);
qiepai("2s");
mingpai(["2s", "2s"]);
qiepai("4z");
mingpai(["4z", "4z"]);
qiepai("4s");
mingpai(["4s", "4s"]);
qiepai("5z");
mingpai(["5z", "5z"]);
qiepai("1z");
mingpai(["1z", "1z"]);
qiepai("9p");
mopai();
qiepai();
hupai();
//roundend();
//第十局
//... 
//gameend();
try {
    MRE.close();
} catch (e) {
}

