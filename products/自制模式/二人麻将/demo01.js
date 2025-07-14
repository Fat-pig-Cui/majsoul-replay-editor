loadproject();

player_datas[0].nickname = '一姬-契约';
player_datas[1].nickname = '绮春歌';
player_datas[0].avatar_id = 400102;
player_datas[1].avatar_id = 400106;

config = {
    'category': 100,
    'meta': {'mode_id': 0},
    'mode': {
        'mode': 21,
    }
};

tiles0 = '11112223334445z';
tiles1 = '1112340678999m';
paishan = randompaishan('', '5m432z');
roundbegin();
combomopai('1z');
combomopai('2z');
leimingpai('3z', 'angang');
mopai();
leimingpai('4z', 'angang');
mopai();
qiepai();
hupai();
