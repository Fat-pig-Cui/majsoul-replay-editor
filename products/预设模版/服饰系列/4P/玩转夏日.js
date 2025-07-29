clearproject();

// 玩转夏日UP装扮:
// 立直棒-小鳄霸
// 和牌-喵——呜！
// 立直-萌爪狂欢
// 立直音乐-势如破竹 (没加入views)
// 对局音乐-漂浮霓虹 (没加入views)

// 此外还有活动获得的 称号-青云之志 和 动态桌布-星间飞行

player_datas[0].nickname = '二阶堂美树';
player_datas[1].nickname = '寺崎千穗理';
player_datas[2].nickname = '柚';
player_datas[3].nickname = '凌';
player_datas[0].avatar_id = 400208;
player_datas[1].avatar_id = 403304;
player_datas[2].avatar_id = 405905;
player_datas[3].avatar_id = 407503;

// 称号-青云之志
player_datas[0].title = player_datas[1].title = player_datas[2].title = player_datas[3].title = 600094;
player_datas[0].views = player_datas[1].views = player_datas[2].views = player_datas[3].views = [
    {slot: 0, item_id: 30560003}, // 立直棒-小鳄霸
    {slot: 1, item_id: 30520005}, // 和牌-喵——呜！
    {slot: 2, item_id: 30530005}, // 立直-萌爪狂欢
    {slot: 6, item_id: 30580007}, // 动态桌布-星间飞行
];

config = {
    category: 1,
    meta: {mode_id: 0},
    mode: {
        mode: 1,
        detail_rule: {
            init_point: 100000,
        }
    }
};

// 示例对局
demogame();
