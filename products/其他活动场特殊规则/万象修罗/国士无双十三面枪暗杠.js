loadproject();

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
            'huansanzhang': true,
            'wanxiangxiuluo_mode': true,
        }
    }
};

tiles0 = 'b19m12489p159s127z';
tiles1 = 'b368m223344s666z';
tiles2 = 'b111356799p345z';
tiles3 = 'b112457999m248s';
paishan = randompaishan('6z', '5z....');
roundbegin();
huansanzhang('248p', '368m', '345z', '248s', 1);
qiepai('5s');
mopai();
leimingpai();
hupai(true);
