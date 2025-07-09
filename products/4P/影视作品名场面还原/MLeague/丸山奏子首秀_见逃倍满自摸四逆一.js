loadproject();

// 参考视频: https://www.bilibili.com/video/BV1jT41167Mg
// 对局四人: 丸山奏子, 佐佐木寿人, 多井隆晴, 泷泽和典
// 角色分别使用: 二之宫花-契约, 月见山, 如月莲, 石原碓海

editdata.player_datas[0].nickname = '丸山奏子';
editdata.player_datas[1].nickname = '佐佐木寿人';
editdata.player_datas[2].nickname = '多井隆晴';
editdata.player_datas[3].nickname = '泷泽和典';
editdata.player_datas[0].avatar_id = 401702;
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

            '_chang_ju_ben_num_': [1, 3, 2], // 南4局2本场
            '_scores_': [16100, 17700, 30900, 35300],
            '_local_position_': 0,
        }
    }
};

tiles3 = '27m3567p89s123347z';
tiles0 = '46m140789p13s567z';
tiles1 = '8m233p13489s1245z';
tiles2 = '12248m2p34669s26z';
paishan = randompaishan('5m4p6s1z3p1s6m6z2p8s1z5z0m4s7z6p9p2s6z8p9p2z6p8s6m3m9m6m2m6s2s5z2s9m1m5s6p8p4z3m7p4z8m9s7p9m2p7s7s5s1p0s4p1m5m5s7s1p5p1p4s2s9p9m4m5m4m3m', '7m8p....');
discardtiles = ['7z5z6z5m7z6z1s3s 2m2s6p7p7p7s4p7s4s9m', '1s1s5z1z8m9s2z3s4z3m6p4z6s3p1m4p5s4m', '1m9s1z6z2z3s2m2s4z2m6s6s1m6s2s4m', '4z2m9s8s7m2s6z5z7z5z3z6p7p3z7s3p9s5s0s'];
roundbegin();
qiepai();
normalmoqie(14);
mingqiepai();
normalmoqie(10);
mingqiepai();
moqieliqi();
normalmoqie(36);
mingqiepai();
normalmoqie(6);
zimohu();
