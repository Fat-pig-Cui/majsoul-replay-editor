clearProject();

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

begin_tiles[0] = '1112378999m5z406p';
begin_tiles[1] = '1112378999s555s';
begin_tiles[2] = '11123p78999p406m';
begin_tiles[3] = '4556m345567p406s';
setPaishan('555555z5m5555555555555555555555555555555555555555555555555555555555555555555555555555z');
roundBegin();
huanpai(['406p', '555s', '406m', '406s'], 1);
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
huangpai();

begin_tiles[1] = '19m19p19s1234z6s550m';
begin_tiles[2] = '12345s12345m406p';
begin_tiles[3] = '1122288999m556z';
begin_tiles[0] = '1112378999p6m11s';
randomPaishan('11z8m17z');
roundBegin();
huanpai(['6m11s', '550m', '406p', '556z'], 1);
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

begin_tiles[2] = '8s6667788p111m9p9m9s';
begin_tiles[3] = '111222z4446z333s';
begin_tiles[0] = '1m1p1s1234567z78p8s';
begin_tiles[1] = '222444s666s6z333z';
randomPaishan('6z9m');
roundBegin();
huanpai(['78p8s', '333z', '9p9m9s', '333s'], 1);
hupai(true);
