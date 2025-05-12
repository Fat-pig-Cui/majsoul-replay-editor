loadproject();

// 客户端的装扮预览界面的虚假的对局(虚假是因为有些地方不符合规则逻辑, 比如作为主视角的南家比亲家先摸牌)

editdata.player_datas[0].nickname = editdata.player_datas[2].nickname = editdata.player_datas[3].nickname = "电脑(简单)";
editdata.player_datas[1] = {
    'nickname': "$nickname$",
    'avatar_id': 407002, // 鲁鲁修-契约
    'title': 600034, // 称号也可以看, 不过称号不属于严格意义上的装扮, 这里用 天选之证 举例
    'avatar_frame': 305552, // 头像框, 用 大小姐发带 举例
    'views': [
        {"slot": 0, "item_id": 308028}, // 立直棒, 用 骑士的钥匙 举例
        {"slot": 1, "item_id": 308026}, // 和牌特效, 用 绝对的命令 举例
        {"slot": 2, "item_id": 308027}, // 立直特效, 用 王者的决意 举例
        {"slot": 3, "item_id": 309500}, // 手的样式, 用 橘色虎爪 举例
        // {"slot": 4, "item_id": 305025}, // 立直音乐, 这个回放中无法展现, 用 真剑胜负 举例
        {"slot": 5, "item_id": 305552}, // 头像框, 用 大小姐发带 举例
        // {"slot": 6, "item_id": 308029}, // 桌布, 这个与对局玩家无关, 在 config 中修改, 用 魔女的契约 举例
        // {"slot": 7, "item_id": 308030}, // 牌背, 这个与对局玩家无关, 在 config 中修改, 用 假面的裁决 举例
        // {"slot": 10, "item_id": 305901}, // 鸣牌指示, 这个回放中无法展现, 用 雷驰电掣 举例
        // {"slot": 13, "item_id": 305718}, // 牌面, 这个与对局玩家无关, 在 config 中修改, 用 猫咪雀圣 举例
    ]
};

editdata.config = {
    'category': 1,
    'meta': {'mode_id': 0},
    'mode': {
        'mode': 1,
        'detail_rule': {
            '_tablecloth_id': 308029, // 桌布-魔女的契约
            '_mjp_id': 308030, // 牌背-假面的裁决
            '_mjpsurface_id': 305718, // 牌面-猫咪雀圣
        }
    }
};

// 东1局0本场, 和牌特效
tiles0 = "1s1234056789m566z";
tiles1 = "123456789m1122z";
tiles2 = "1234056789p122z";
tiles3 = "1234056789s566z";
paishan = randompaishan("3z1m1p2s3z2m2p3s3z3m3p4s4z4m4p5s4z5m5p6s4z6m6p7s7z7m7p8s7z8m8p9s7z9m9p1z", "5z....");
discardtiles = ["123456789s", "333444777z", "123456789m", "123456789p"];
roundbegin();
qiepai();
normalmoqie(35);
mopai(1);
hupai();

gotoju(0, 0, 0);
scores = [25000, 25000, 25000, 25000];

// 立直特效
tiles0 = "1s1234056789m566z";
tiles1 = "123456789m1122z";
tiles2 = "1234056789p122z";
tiles3 = "1234056789s566z";
paishan = randompaishan("3z1m1p2s3z2m2p3s3z3m3p4s4z4m4p5s4z5m5p6s4z6m6p7s7z7m7p8s7z8m8p9s7z9m9p5z", "15z....");
discardtiles = ["123456789s", "333444777z", "123456789m", "123456789p"];
roundbegin();
qiepai();
normalmoqie(35);
mopai(1);
qiepai(true);
normalmoqie(33);
notileliuju();
