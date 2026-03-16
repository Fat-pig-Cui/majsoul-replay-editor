clearProject();

// 龙之目玉(放铳家持有目玉) + 幻境传说(含有 庄家卡: 赠品) + 天命之战(各和牌家满天命牌) + 下克上(各和牌家不到1w点)
// 四位最低分: -1792800

player_datas[0].nickname = '一姬-契约';
player_datas[1].nickname = '新年初诣';
player_datas[2].nickname = '一姬当千';
player_datas[3].nickname = '绮春歌';
player_datas[0].avatar_id = 400102;
player_datas[1].avatar_id = 400104;
player_datas[2].avatar_id = 400105;
player_datas[3].avatar_id = 400106;

setConfig({
    category: 1,
    meta: {mode_id: 0},
    mode: {
        mode: 1,
        detail_rule: {
            muyu_mode: true,
            field_spell_mode: 10205, // 赠品, 三倍速, 夸大其词
            tianming_mode: true,
            amusement_switches: [18],
            _chang_ju_ben_num_: [0, 0, 0, 100],
            _scores_: [0, 0, 0, 0],
        }
    }
});

begin_tiles[0] = '1111zt2223334446z';
begin_tiles[1] = '1113st33777999s6z';
begin_tiles[2] = '2224st44666888s6z';
begin_tiles[3] = '1112mt340678999m';
setMuyuSeats('3');
randomPaishan('5p5p6z', '5z.5z.5z.5z0p432z');
comboMopai(4);
qiepai();
normalMoqie(3);
hupai();
