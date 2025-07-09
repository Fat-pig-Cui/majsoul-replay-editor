loadproject();

// 万物生长: 两立直, 四暗杠发财, 岭上开花自摸发财, 10张指示牌全是白
// 青天井规则下:
// 两立直2番, 岭上开花1番, 自摸1番, 4组役牌发4番, 字一色13番, 绿一色13番, 四杠子13番, 四暗刻单骑26番, 宝牌180番,
// 符底20符, 幺九暗杠4个4*32=128符, 单骑听牌2符, 自摸2符, 役牌雀头2符, 共计154符, 切上160符
// 共计253番160符, 计算结果80位, 每家需支付: 3*2*160*2^(253+2) =
// 1852,6734,2779,7059,1267,7713,5760,1390,0652,5652,3197,5465,0249,0246,3132,1344,1266,1007,4238,9800 点
// 因为青天井规则非常容易导致游戏崩溃, 而且'万生长'没使用雀魂Plus修改的话无法显示, 这里直接显示'六倍役满'(虽然按雀魂逻辑只有五倍役满)

editdata.player_datas[0].nickname = '一姬-契约';
editdata.player_datas[1].nickname = '新年初诣';
editdata.player_datas[2].nickname = '一姬当千';
editdata.player_datas[3].nickname = '绮春歌';
editdata.player_datas[0].avatar_id = 400102;
editdata.player_datas[1].avatar_id = 400104;
editdata.player_datas[2].avatar_id = 400105;
editdata.player_datas[3].avatar_id = 400106;

editdata.config = {
    'category': 1,
    'meta': {'mode_id': 0},
    'mode': {
        'mode': 1,
    }
};

tiles0 = '66666666666667z';
tiles1 = '1112340678999m';
tiles2 = '1112340678999p';
tiles3 = '9s111222334477z';
paishan = randompaishan('6z', '55555555556666z');
roundbegin();
qiepai(true);
mingqiepai('9s');
mopai();
combomopai(4);
hupai();
