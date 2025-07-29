clearproject();

// 照姐自摸亲跳满, 阿知贺篇第9集11min开始
// 因为雀魂天麻联动没有 花田煌 和 松实玄, 所以分别用 岚星 和 伊芙 代替

player_datas[0].nickname = '宫永照';
player_datas[1].nickname = '花田煌';
player_datas[2].nickname = '松实玄';
player_datas[3].nickname = '园城寺怜';
player_datas[0].avatar_id = 403701;
player_datas[1].avatar_id = 407401;
player_datas[2].avatar_id = 408301;
player_datas[3].avatar_id = 406501;

player_datas[3].views = [{slot: 1, item_id: 305206}, {slot: 2, item_id: 308022}]; // 和牌-天降正义 和 立直-未来视

config = {
    category: 4,
    meta: {mode_id: 0},
    mode: {
        mode: 2,
        detail_rule: {
            dora_count: 4,
            init_point: 100000,

            _chang_ju_ben_num_: [1, 0, 2], // 南1局2本场
            _scores_: [123300, 85200, 91900, 99600],
        }
    }
};

// 自摸平和一杯口纯全带, 跳满
// 因为动画没有部分切牌和 花田煌, 松实玄 美 的手牌画面, 我这里乱编了一个
tiles0 = '12399m789s12233p1z';
tiles1 = '23567m1369p24s13z';
tiles2 = '139m267p14599s25z';
tiles3 = '234s449m249p4467z';
paishan = randompaishan('4z1z1z8p7z2z3z4s9s1m4p1p', '7z....');
discardtiles = ['1z8p4s', '4z7z9s', '1z2z1m', '1z3z7z'];
roundbegin();
qiepai();
normalmoqie(11);
zimohu();
