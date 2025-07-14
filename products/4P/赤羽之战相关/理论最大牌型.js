loadproject();

// 川麻的理论最大牌型是 花天月地清十八罗汉

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
            'chuanma': true,
            'huansanzhang': true,
            'xuezhandaodi': true,
        }
    }
};

tiles0 = '22335777889p159s';
tiles1 = '2589m445569p159s';
tiles2 = '112346689p3467s';
tiles3 = '114699m469p3467s';
paishan = randompaishan('', '23785p');
roundbegin();
huansanzhang('159s', '159s', '238p', '469p', 1);
dingque('msmp');
qiepai('9p');
mingqiepai('2m');
normalmoqie(50);
mopai();
combomopai(4);
hupai();
notileliuju();
