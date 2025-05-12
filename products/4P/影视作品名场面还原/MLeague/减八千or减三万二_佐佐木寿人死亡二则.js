loadproject();

// 参考视频: https://www.bilibili.com/video/BV1a7411H7pS
// 对局四人: 鱼谷侑未, 佐佐木寿人, 石桥伸洋, 泽崎诚
// 角色分别使用: 七海礼奈, 月见山, 如月莲, 石原碓海

editdata.player_datas[0].nickname = "鱼谷侑未";
editdata.player_datas[1].nickname = "佐佐木寿人";
editdata.player_datas[2].nickname = "石桥伸洋";
editdata.player_datas[3].nickname = "泽崎诚";
editdata.player_datas[0].avatar_id = 404401;
editdata.player_datas[1].avatar_id = 402701;
editdata.player_datas[2].avatar_id = 403001;
editdata.player_datas[3].avatar_id = 403101;
editdata.player_datas[0].verified = editdata.player_datas[1].verified = editdata.player_datas[2].verified = editdata.player_datas[3].verified = 2;

editdata.config = {
    'category': 4,
    'meta': {'mode_id': 0},
    'mode': {
        'mode': 2,
        'detail_rule': {
            '_qieshangmanguan': true,
            '_toutiao': true,
            '_sigangbaopai': true,
            '_no_liujumanguan': true,
            '_no_lianfengsifu': true,
            '_dora_jifan': true,
            '_no_leijiyiman': true,
            '_no_wyakuman': true,
            '_no_guoshiangang': true,
        }
    }
};

// 南3局0本场
transition(1, 2, 0);

scores = [22600, 22900, 33800, 20700];
tiles2 = "13569m1147p668s25z";
tiles3 = "3m338p199s245667z";
tiles0 = "12358m068p4788s3z";
tiles1 = "346m49p33579s144z";
paishan = randompaishan("5z5m7z7z3z5z1z1s3z9m7m6p5p0m9p3z2z2z4s1p7m8m2p4m6s8p7m9m4z5s7p3s3p7p1m6z2m9p1s7p8s1m7z5p2s7s1z4p7s0s6p1z5p2p2s8m5s6m", "2s....");
discardtiles = ["7z8p8m5m8s8s2z7s4z6p1s7z1z1m2p5s", "9p1z9m5z5s2z4p8p5s6m8m7p5p4p6p2s6m", "9m8s4p7p1z9p3m2z7p6m5z8s2m7s1m2p", "4z1s8p1s6p3m3z2z4m9m3s7p9p1m7s0s5p3p"];
roundbegin();
qiepai();
normalmoqie();
mingqiepai();
normalmoqie(3);
mingqiepai();
normalmoqie(9);
mingpai("34m");
qiepai();
mingqiepai();
normalmoqie();
mingqiepai();
normalmoqie(18);
mingqiepai();
normalmoqie(18);
mingqiepai();
normalmoqie(6);
mingqiepai();
normalmoqie(2);
hupai();
