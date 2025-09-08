clearProject();

// 雀魂流满的要求之一是不被吃碰杠, 而非鸣牌, 故放铳家仍然可以流满

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
    meta: {mode_id: 40},
    mode: {
        mode: 1,
        detail_rule: {
            xuezhandaodi: true,
        }
    }
};

tiles0 = '23444555667779m';
tiles1 = '1112223336999m';
tiles2 = '406m2223555788p';
tiles3 = '2222445566778s';
randomPaishan('Y...Y...Y...Y...Y...Y...Y...Y...Y...Y...Y...Y...Y...Y...Y...Y...1mY..Y');
roundBegin();
qiepai();
normalMoqie(65);
hupai();
normalMoqie(4);
huangpai();
