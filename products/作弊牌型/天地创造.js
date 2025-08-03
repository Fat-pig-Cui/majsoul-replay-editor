clearproject();

// 天地创造: 三暗杠白, 一明杠白, 岭上开花自摸白, 5张指示牌4张白1张1p
// 青天井规则下:
// 岭上开花1番, 4组役牌白4番, 三暗刻2番, 字一色13番, 四杠子13番, 宝牌72番, 共105番
// 符底20符, 幺九暗杠3个3*32=96符, 幺九明杠1个16符, 单骑听牌2符, 自摸2符, 役牌雀头2符, 共计138符, 切上140符
// 共计105番140符, 计算结果35位, 共 90865195024359483499283685761351700 点
// 因为青天井规则非常容易导致游戏崩溃, 而且'创造'没使用雀魂Plus修改的话无法显示, 这里直接显示'六倍役满'(虽然按雀魂逻辑只有两倍役满)

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
    }
};

tiles0 = '55555555555556z';
tiles1 = '1112340678999m';
tiles2 = '1112340678999p';
tiles3 = '1112340678999s';
randompaishan('65z', '1p.7z.7z.7z.7z5555z');
roundbegin();
qiepai();
normalmoqie(2);
mingpai();
mopai();
combomopai(3);
hupai();
