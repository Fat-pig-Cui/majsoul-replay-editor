clearproject();

//     门清自摸 门清荣和 副露自摸
// 1番 100符    110符   100符
// 2番 100符    110符   110符
// 门清自摸1番100符(子: 800/1600, 亲: 1600All)
// 1. 两个幺九非役牌暗杠+两个顺子+双风对子,两个顺子不能同时有幺九牌,最后坎张,边张,单骑自摸
//    如南场南家: 234m567p2z 11111z 33333z 自摸2z
//    20+32*2+4+2+2=92-->100
// 门清荣和1番110符(子: 3600, 亲: 5300)
// 2. 两个幺九暗杠+不带幺九牌的顺子+双风对子+幺九非役牌对子,荣和幺九非役牌对子,役可以是役牌或立直
//    如南场南家: 234m99p22z 11111z 33333z 荣和9p
//    20+10+32*2+4+4=102-->110
// 3. 副露自摸1番100符(子: 900/1800, 亲: 1800All)
//    基本同1. 只不过两个顺子至少有一个要吃,而且要有役(这样两个顺子可以全带幺九形成混全带)
// 4. 门清自摸2番100符(子: 1600/3200, 亲: 3200All)
//    基本同1. 只要多一个役牌或立直即可
// 5. 门清荣和2番110符(子: 7100, 亲: 10600)
//    基本同2. 只要再多一个役牌或立直即可
//    但有另一种思路: 两个幺九非役牌暗杠+一个幺九非役牌暗刻+不带幺九牌的顺子+双风对子, 最后坎张,单骑荣和 (三暗刻nomi)
//    如南场南家: 999m234s2z 11111z 33333z 荣和2z
//    20+10+32*2+8+4+2=108-->110
// 6. 副露自摸2番110符(子: 1800/3600, 亲: 3600All)
//    两个幺九非役牌暗杠+一个幺九非役牌明杠+一个不带幺九的顺子+双风对子,最后坎张,单骑自摸 (三杠子nomi)
//    如南场南家: 234s2z 1111m 11111z 33333z 自摸2z
//    20+32*2+16+4+2+2=108-->110
//
// *. 非役满牌型的最高符数是 20+10+32*3+4+4=134-->140符, 如南场南家 11m22z 99999p 99999s 33333z 荣和1m
//     三杠子,对对和,三暗刻,混老头 8番140符 倍满
// *. 理论最高符数是 20+10+32*4+4+2=164-->170符, 但这已经至少是三倍役满(四暗杠单骑)

player_datas[0].nickname = '一姬-契约';
player_datas[1].nickname = '新年初诣';
player_datas[2].nickname = '一姬当千';
player_datas[3].nickname = '绮春歌';
player_datas[0].avatar_id = 400102;
player_datas[1].avatar_id = 400104;
player_datas[2].avatar_id = 400105;
player_datas[3].avatar_id = 400106;

config = {
    'category': 1,
    'meta': {'mode_id': 0},
    'mode': {
        'mode': 1,
        'detail_rule': {
            'init_point': 50000,
        }
    }
};

// 1番门清自摸最高符数: 100
tiles0 = '234m789p13333444z';
tiles1 = '1112340678999m';
tiles2 = '1112340678999p';
tiles3 = '1133334678999s';
paishan = randompaishan('1z', '5z.5z.5z..1s4z');
roundbegin();
combomopai(2);
qiepai();
mingqiepai('3s');
zimohu();

// 1番门清荣和最高符数: 110
tiles0 = '234m11s113333444z';
tiles1 = '1112340678999m';
tiles2 = '1112340678999p';
tiles3 = '1333346678999s';
paishan = randompaishan('', '656565z..6s4z');
roundbegin();
combomopai(2);
qiepai(true);
mingqiepai('1s');
hupai();

// 1番副露自摸最高符数: 100
tiles0 = '789p238s13333444z';
tiles1 = '1112340678999m';
tiles2 = '1112340678999p';
tiles3 = '1333446778899s';
paishan = randompaishan('1z', '5z.5z.5z..9s4z');
roundbegin();
combomopai(2);
qiepai();
mingqiepai('1s');
mingqiepai('8s');
mingqiepai('6s');
zimohu();

// 2番门清自摸最高符数: 100
tiles0 = '234m567p13333444z';
tiles1 = '1112340678999m';
tiles2 = '1112340678999p';
tiles3 = '1133334678999s';
paishan = randompaishan('1z', '656565z..1s4z');
roundbegin();
combomopai(2);
qiepai(true);
mingqiepai('3s');
zimohu();

// 2番门清荣和最高符数: 110
tiles0 = '111p234s13333444z';
tiles1 = '1112340678999m';
tiles2 = '2223405567888p';
tiles3 = '113334678999s1z';
paishan = randompaishan('', '5z.5z.5z..1s4z');
roundbegin();
combomopai(2);
qiepai();
mingqiepai('1z');
hupai();

// 2番副露自摸最高符数: 110
tiles0 = '111p234s13333444z';
tiles1 = '1112340678999m';
tiles2 = '2223405567888p';
tiles3 = '1p113334688999s';
paishan = randompaishan('1z', '5z.5z.5z.5z.81s4z');
roundbegin();
combomopai(2);
qiepai();
mingqiepai('1p');
mingpai();
normalmoqie();
mingqiepai('6s');
zimohu();

// 以下是子家的牌, 前六个和亲家一样
gotoju(1, 0, 0);
// 1番门清自摸最高符数: 100
tiles0 = '1133334678999s7z';
tiles1 = '234m789p2333444z';
tiles2 = '1112340678999m';
tiles3 = '1112340678999p';
paishan = randompaishan('32z', '5z.5z.5z..1s4z');
roundbegin();
qiepai();
mopai();
combomopai(2);
qiepai();
mingqiepai('3s');
zimohu();

gotoju(1, 0, 0);
// 1番门清荣和最高符数: 110
tiles0 = '1333346678999s7z';
tiles1 = '234m11s22333444z';
tiles2 = '1112340678999m';
tiles3 = '1112340678999p';
paishan = randompaishan('3z', '656565z..6s4z');
roundbegin();
qiepai();
mopai();
combomopai(2);
qiepai(true);
mingqiepai('1s');
hupai();

gotoju(1, 0, 0);
// 1番副露自摸最高符数: 100
tiles0 = '1333446778899s7z';
tiles1 = '789p238s2333444z';
tiles2 = '1112340678999m';
tiles3 = '1112340678999p';
paishan = randompaishan('32z', '5z.5z.5z..9s4z');
roundbegin();
qiepai();
mopai();
combomopai(2);
qiepai();
mingqiepai('1s');
mingqiepai('8s');
mingqiepai('6s');
zimohu();

gotoju(1, 0, 0);
// 2番门清自摸最高符数: 100
tiles0 = '1133334678999s7z';
tiles1 = '234m567p2333444z';
tiles2 = '1112340678999m';
tiles3 = '1112340678999p';
paishan = randompaishan('32z', '656565z..1s4z');
roundbegin();
qiepai();
mopai();
combomopai(2);
qiepai(true);
mingqiepai('3s');
zimohu();

gotoju(1, 0, 0);
// 2番门清荣和最高符数: 110
tiles0 = '113334678999s27z';
tiles1 = '111p234s2333444z';
tiles2 = '1112340678999m';
tiles3 = '2223405567888p';
paishan = randompaishan('3z', '5z.5z.5z..1s4z');
roundbegin();
qiepai();
mopai();
combomopai(2);
qiepai();
mingqiepai('2z');
hupai();

gotoju(1, 0, 0);
// 2番副露自摸最高符数: 110
tiles0 = '1p113334688999s7z';
tiles1 = '111p234s2333444z';
tiles2 = '1112340678999m';
tiles3 = '2223405567888p';
paishan = randompaishan('32z', '5z.5z.5z.5z.81s4z');
roundbegin();
qiepai();
mopai();
combomopai(2);
qiepai();
mingqiepai('1p');
mingpai();
normalmoqie();
mingqiepai('6s');
zimohu();

gotoju(1, 0, 0);
// 8番140符
tiles0 = '2223405567888s7z';
tiles1 = '11m111999s22333z';
tiles2 = '2223405567888m';
tiles3 = '2223405567888p';
paishan = randompaishan('3z1m', '5z.5z.5z.5z.7z91s');
roundbegin();
qiepai();
mopai();
combomopai(3);
qiepai();
normalmoqie();
hupai();

gotoju(1, 0, 0);
// 最高符数170符, 三倍役满(四暗杠单骑)
tiles0 = '2223405567888s7z';
tiles1 = '111m111999s2333z';
tiles2 = '2223405567888m';
tiles3 = '2223405567888p';
paishan = randompaishan('3z2z', '6z.5z.5z.5z.5z7z91s1m');
roundbegin();
qiepai();
mopai();
combomopai(4);
qiepai();
normalmoqie();
hupai();
