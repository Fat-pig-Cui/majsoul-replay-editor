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
            wanxiangxiuluo_mode: true,
        }
    }
};

begin_tiles[0] = 'b19m12489p159s127z';
begin_tiles[1] = 'b368m223344s666z';
begin_tiles[2] = 'b111356799p345z';
begin_tiles[3] = 'b112457999m248s';
randomPaishan('6z', '5z....');
roundBegin();
huanpai(['248p', '368m', '345z', '248s'], 1);
qiepai('5s');
mopai();
zimingpai();
hupai(true);
