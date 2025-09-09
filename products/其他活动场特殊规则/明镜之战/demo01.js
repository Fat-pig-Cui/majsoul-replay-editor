clearProject();

player_datas[0].nickname = '一姬-契约';
player_datas[1].nickname = '新年初诣';
player_datas[2].nickname = '一姬当千';
player_datas[3].nickname = '绮春歌';
player_datas[0].avatar_id = 400102;
player_datas[1].avatar_id = 400104;
player_datas[2].avatar_id = 400105;
player_datas[3].avatar_id = 400106;

config = {
    category: 1,
    meta: {mode_id: 0},
    mode: {
        mode: 1,
        detail_rule: {
            jiuchao_mode: true,
        }
    }
};

begin_tiles[0] = '11122233344457zt';
begin_tiles[1] = '111666mt225pt5p6pt8st8s';
begin_tiles[2] = '345mt34pt23334455st';
begin_tiles[3] = '1p1112pt88st55zt5z77zt7z';
randomPaishan('3s..5pt', '44pt242st2s..5pt2p');
roundBegin();
qiepai();
mingpai();
mopai();
comboMopai();
qiepai();
mingQiepai('6pt');
moqieLiqi('2st');
normalMoqie(2);
mopai();
zimingpai();
hupai();
