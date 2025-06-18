loadproject();

// 要做到和牌却被飞, 那就只能是役满的包牌和一炮多响导致的, 下面分别用大三元和大四喜作为例子

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
            '_scores_': [55000, 21000, 24000, 0]
        }
    }
};

// 大三元包牌
tiles0 = "238999p11z556677z";
tiles1 = "11345678m23456p";
tiles2 = "2223405567888m";
tiles3 = "2223405567888s";
paishan = randompaishan("5677z1p", "1z....");
roundbegin();
qiepai("8p");
for (let i = 0; i < 3; i++) {
    normalmoqie();
    mingqiepai("9p");
}
normalmoqie(2);
hupai();

// 大四喜包牌
gotoju(0, 0, 0);
scores = [7000, 45000, 48000, 0];
tiles0 = "19999p112233445z";
tiles1 = "11345678m23456p";
tiles2 = "2223405567888m";
tiles3 = "2223405567888s";
paishan = randompaishan("12344z1p", "5z....");
roundbegin();
qiepai();
for (let i = 0; i < 4; i++) {
    normalmoqie();
    mingqiepai("9p");
}
normalmoqie(2);
hupai();
