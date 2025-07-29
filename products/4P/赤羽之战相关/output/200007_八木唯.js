clearproject();

// 为了方便编辑不考虑换三张的过程

player_datas[0].nickname = '八木唯-契约';
player_datas[1].nickname = '悸动之夏';
player_datas[2].nickname = '四方雀者';
player_datas[3].nickname = '异想烂漫';
player_datas[0].avatar_id = 400702;
player_datas[1].avatar_id = 400706;
player_datas[2].avatar_id = 400707;
player_datas[3].avatar_id = 400708;

player_datas[0].views = player_datas[1].views = player_datas[2].views = player_datas[3].views = [
    {slot: 6, item_id: 30580007}, // 动态桌布-星间飞行
];

config = {
    category: 1,
    meta: {mode_id: 0},
    mode: {
        mode: 1,
        detail_rule: {
            chuanma: true,
            init_point: 500000,
        }
    }
};

// 第1局: 天和, 根;  清十八罗汉, 杠上花; 清金钩钓, 杠上炮
tiles0 = '11112222333344m';
tiles1 = '1112223334446p';
tiles2 = '66778999m99p689s';
tiles3 = '1122334457777s';
paishan = randompaishan('12346p2134s9m5s');
roundbegin();
dingque('pspm');
hupai();

mopai();
combomopai(4);
hupai();

for (let i = 0; i < 4; i++) {
    normalmoqie();
    mingqiepai('7s');
}
mopai();
leimingpai();
normalmoqie();
hupai(true);


// 第2局: 地和;         清龙七对;           十八罗汉
tiles0 = '4455667788999m9p';
tiles1 = '1112223334m789p';
tiles2 = '3344455p568999s';
tiles3 = '111222p1112224s';
paishan = randompaishan('49m12p1234s');
roundbegin();
dingque('pspm');
qiepai();
zimohu();

normalmoqie();
hupai();

normalmoqie();
mingpai();
mopai();
combomopai(3);
qiepai();
normalmoqie();
hupai(true);


// 第3局: 清七对;    清幺九, 抢杠;        龙七对
tiles1 = '7788999m445566p7s';
tiles2 = '2m123445677889s';
tiles3 = '1112223338999s';
tiles0 = '2334455667788m';
paishan = randompaishan('2m7s9m');
roundbegin();
dingque('pspm');
qiepai();
mingqiepai('2m');
hupai();

normalmoqie();
mopai();
leimingpai();
hupai();

zimohu(true);


// 第4局: 将对;         清对;             金钩钓
tiles0 = '222555888m22258s';
tiles1 = '12366m66788899p';
tiles2 = '113344m1139999s';
tiles3 = '1112223334445p';
paishan = randompaishan('5s5p134m13s');
roundbegin();
dingque('pspm');
qiepai();
normalmoqie();
hupai();

normalmoqie();
hupai();

for (let i = 0; i < 4; i++) {
    normalmoqie();
    mingqiepai('9s');
}
normalmoqie();
hupai(true);


// 第5局: 带幺九;        七对子;            清一色
tiles0 = '123778899m23999s';
tiles1 = '2233445566778m';
tiles2 = '1112345678999p';
tiles3 = '223344p2233445s';
paishan = randompaishan('15s5p');
roundbegin();
dingque('pssm');
qiepai();
normalmoqie();
hupai();

normalmoqie();
hupai();

normalmoqie();
hupai(true);


// 第6局: 对对;         底和, 海底捞月
tiles0 = '222333444m22235s';
tiles1 = '8m333466788999p';
tiles2 = '1112467999m112p';
tiles3 = '1555678p123456s';
paishan = randompaishan('3s', '1p');
roundbegin();
dingque('pssm');
qiepai();
normalmoqie();
hupai();

normalmoqie(53);
zimohu();
notileliuju();


// 第7局: 诈和示范
tiles0 = '22234555678889m';
tiles1 = '1112345678999m';
tiles2 = '1112345678999p';
tiles3 = '1112345678999s';
paishan = randompaishan();
roundbegin();
dingque('pssm');
hupai(true);
