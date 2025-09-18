clearProject();

player_datas[0].nickname = '西园寺一羽-契约';
player_datas[1].nickname = '北原莉莉-契约';
player_datas[2].nickname = '东城玄音-契约';
player_datas[3].nickname = '南枫花-契约';
player_datas[0].avatar_id = 405202;
player_datas[1].avatar_id = 406102;
player_datas[2].avatar_id = 407602;
player_datas[3].avatar_id = 409502;

player_datas[0].avatar_frame = 305529; // 头像框-秋霜切玉
player_datas[0].views = [
    {slot: 1, item_id: 305215}, // 和牌-剑吟虎啸
    {slot: 2, item_id: 305315}, // 立直-虎啸长风
    {slot: 5, item_id: 305529}, // 头像框-秋霜切玉
];
player_datas[1].avatar_frame = 305537; // 头像框-圣堂百合
player_datas[1].views = [
    {slot: 1, item_id: 305219}, // 和牌-银链飞雪
    {slot: 2, item_id: 305319}, // 立直-蛇行诡道
    {slot: 5, item_id: 305537}, // 头像框-圣堂百合
];
player_datas[2].avatar_frame = 305551; // 头像框-丹心一寸
player_datas[2].views = [
    {slot: 1, item_id: 305223}, // 和牌-衔环结草
    {slot: 2, item_id: 305323}, // 立直-狐缘之绊
    {slot: 5, item_id: 305551}, // 头像框-丹心一寸
];
player_datas[3].avatar_frame = 30550012; // 头像框-赤丹霞羽
player_datas[3].views = [
    {slot: 1, item_id: 30520006}, // 和牌-落羽涅槃
    {slot: 2, item_id: 30530006}, // 立直-有凤来仪
    {slot: 5, item_id: 30550012}, // 头像框-赤丹霞羽
];

setConfig({
    category: 1,
    meta: {mode_id: 0},
    mode: {
        mode: 1,
        detail_rule: {
            init_point: 100000,
        }
    }
});

// 示例对局
demoGame();
