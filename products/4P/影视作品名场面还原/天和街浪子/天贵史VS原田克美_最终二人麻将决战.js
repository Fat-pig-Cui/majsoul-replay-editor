clearProject();

// 南北两家的作用是在 Stage B 的时候分别代表另外两家摸打牌, 起手是随机的, 没什么用
// 点数变动的特例化实现放到 hupai 函数中了

player_datas[0].nickname = '天贵史';
player_datas[1].nickname = '天贵史-替身';
player_datas[2].nickname = '原田克美';
player_datas[3].nickname = '原田克美-替身';
player_datas[0].avatar_id = 404502; // A-37-契约
player_datas[1].avatar_id = 404501; // A-37-初始
player_datas[2].avatar_id = 408502; // 袁枫-契约
player_datas[3].avatar_id = 408501; // 袁枫-初始

player_datas[0].verified = player_datas[2].verified = 2;
player_datas[0].title = 600034; // 称号-天选之证
player_datas[0].views = [
    {slot: 1, item_id: 308011}, // 和牌-地狱低语
];
player_datas[2].title = 600039; // 称号-森罗万象

setConfig({
    category: 4,
    meta: {mode_id: 0},
    mode: {
        mode: 1,
        detail_rule: {
            reveal_discard: true,
            _tianguishi_vs_yuantiankemei: true,

            _tablecloth_id: 305012,
            _mjp_id: 305724,
            dora_count: 0,
            _no_liujumanguan: true,
            _chang_ju_ben_num_: [0, 0, 1],
            _scores_: [9200, 0, 20300, 0],
        }
    }
});

begin_tiles[0] = '6m6779p135s123455z';
begin_tiles[2] = '33m888p24679s136z';
setDealTiles(['', '', '', '9s7z1s5z6s1p']);
setDiscardTiles(['4z9p7p2z3z1m1z7p6p3z6m1z4m2z2z5m9p3p4z5s', '', '1z8m9m6z9s4z6z1p9s4s2s9p3s5m4z2z4p1s2s', '']);
randomPaishan('3z7z8m7z9m5z4z4m1m6z6s2m6s1p2m9s3z2m7z3s1z9p1m6s2z5m2z4z5m2z9p4p3p1s4z2s..1z3m5m5p4m..1s2p6z9p7s..3p7z3m', '8p.1m...4p');
roundBegin();
// Stage A
qiepai();
for (let i = 0; i < 4; i++) {
    mopai(2);
    qiepai();
    mopai(0);
    qiepai();
}
mingpai();
qiepai();
for (let i = 0; i < 14; i++) {
    mopai(0);
    qiepai();
    mopai(2);
    qiepai();
}
mingpai(0, '13s');
qiepai();

// Stage B
for (let i = 0; i < 2; i++) {
    mopai(3);
    qiepai();
}
for (let i = 0; i < 5; i++) {
    mopai(1);
    if (i === 1)
        qiepai('anpai_ignore_1000');
    else
        qiepai();
}

for (let i = 0; i < 2; i++) {
    mopai(3);
    qiepai();
}
for (let i = 0; i < 5; i++) {
    mopai(1);
    qiepai();
}

for (let i = 0; i < 2; i++) {
    mopai(3);
    qiepai();
}
mopai(1)
qiepai();
mopai(0);
zimingpai();
mopai(1);
qiepai();
mopai(0);
hupai();
