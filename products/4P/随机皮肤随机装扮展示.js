loadproject();

// 皮肤随机范围为所有实装皮肤
// 装扮随机范围包括立直棒, 和牌特效, 立直特效, 头像框, 桌布, 牌背, 称号, 牌面
// 由于包含桌布, 根据回放显示的桌布算法, 没有在 detail_rule 中设置桌布的话, 最终会显示为东起玩家的桌布
// 其中部分头像框和称号在国际中文服无法加载, 在 main.js 中作为"黑名单"去掉了

editdata.player_datas[0].nickname = "东邪黄药师";
editdata.player_datas[1].nickname = "南帝段智兴";
editdata.player_datas[2].nickname = "西毒欧阳锋";
editdata.player_datas[3].nickname = "北丐洪七公";

editdata.config = {
    'category': 1,
    'meta': {'mode_id': 0},
    'mode': {
        'mode': 1,
        'detail_rule': {
            '_random_views': true,
            '_random_skin': true,
        }
    }
};

tiles0 = "2223444666888s5z";
tiles1 = "1112340678999m";
tiles2 = "1112340678999p";
tiles3 = "1112340678999s";
paishan = randompaishan("555z");
roundbegin();
qiepai(true);
moqieliqi(3);
liuju();
