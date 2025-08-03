clearproject();

player_datas[0].nickname = '电脑0';
player_datas[1].nickname = '电脑1';
player_datas[2].nickname = '电脑2';
player_datas[3].nickname = '电脑3';
player_datas[0].avatar_id = 400101;
player_datas[1].avatar_id = 400101;
player_datas[2].avatar_id = 400101;
player_datas[3].avatar_id = 400101;

config = {
    category: 1,
    meta: {mode_id: 0},
    mode: {
        mode: 1,
        detail_rule: {
            init_point: 25000,
            dora_count: 3,
            fanfu: 1,
            begin_open_mode: false,
            chuanma: false,
            dora3_mode: false,
            guyi_mode: false,
            open_hand: false,
            muyu_mode: false,
            xuezhandaodi: true,
        }
    }
};

tiles0 = '1112378999m5z406p';
tiles1 = '1112378999s555s';
tiles2 = '11123p78999p406m';
tiles3 = '4556m345567p406s';
paishan = separatetile('555555z5m5555555555555555555555555555555555555555555555555555555555555555555555555555z');
roundbegin();
huansanzhang('406p', '555s', '406m', '406s', 1);
qiepai('5z');
mopai();
for (let i = 0; i < 6; i++) {
    qiepai();
    mopai();
}
hupai();
for (let i = 62; i >= 0; i--) {
    mopai();
    qiepai();
}
notileliuju();

tiles1 = '19m19p19s1234z6s550m';
tiles2 = '12345s12345m406p';
tiles3 = '1122288999m556z';
tiles0 = '1112378999p6m11s';
randompaishan('11z8m17z');
roundbegin();
huansanzhang('6m11s', '550m', '406p', '556z', 1);
qiepai('6s');
hupai(2);
for (let i = 0; i < 3; i++) {
    mopai();
    qiepai(true);
}
hupai();
mopai();
qiepai();
mopai();
hupai(true);

tiles2 = '8s6667788p111m9p9m9s';
tiles3 = '111222z4446z333s';
tiles0 = '1m1p1s1234567z78p8s';
tiles1 = '222444s666s6z333z';
randompaishan('6z9m');
roundbegin();
huansanzhang('78p8s', '333z', '9p9m9s', '333s', 1);
hupai(true);
