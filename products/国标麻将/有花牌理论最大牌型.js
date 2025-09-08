clearProject();

// 需要导入 add_function.js

// 用'0m'当做花牌

// 大三元, 四杠, 字一色, 四暗刻, 妙手回春, 杠上开花, 圈风刻, 门风刻, 加上8个花牌总计共332番

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
            _guobiao: true,
            _guobiao_huapai: true,
        }
    }
};

tiles0 = '0m1112555666777z';
tiles1 = '23455678p22334z';
tiles2 = '1112223334445p';
tiles3 = '5666777888999p';
randomPaishan('', '123765z0000000m');
roundBegin();
comboMopai(11);
qiepai();
mingQiepai();
normalMoqie(78);
mopai();
comboMopai();
hupai();
