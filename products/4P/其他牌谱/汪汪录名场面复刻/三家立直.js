clearProject();

// 2025雀魂三麻TOP10, 其中的NO.6: 三家立直 https://www.bilibili.com/video/BV1v3cizyEGj?t=331

player_datas[0].nickname = 'わったーふ';
player_datas[1].nickname = '欸贛這可以養嗎';
player_datas[2].nickname = '西山药';
player_datas[0].avatar_id = 400101;
player_datas[1].avatar_id = 40010001;
player_datas[2].avatar_id = 400101;
player_datas[1].title = 600006; // 魂之契约者·中阶
player_datas[0].views = [{slot: 0, item_id: 30560005}]; // 立直棒-动听之源
player_datas[1].views = [{slot: 0, item_id: 305019}]; // 24K金棒
player_datas[2].views = [{slot: 0, item_id: 30560006}]; // 立直棒-立奇棒

setConfig({
    category: 2,
    meta: {mode_id: 19},
    mode: {
        mode: 11,
        detail_rule: {
            _chang_ju_ben_num_: [0, 1, 0],
            _mainrole_: 0,
            _scores_: [27300, 35000, 42700],
        }
    }
});

begin_tiles[0] = '1199m77p114s2266z';
begin_tiles[1] = '23067999p678s277z';
begin_tiles[2] = '12233456p246s33z';
setDiscardTiles(['4s6s', '2z8s3p', '2s8s1z']);
randomPaishan('5s1z8s4z6s3p1z', '7s4z.......8s');
roundBegin();
qiepai(true);
moqieLiqi();
moqieLiqi();
normalMoqie();
mopai();
comboMopai();
qiepai();
normalMoqie(3);
hupai();
