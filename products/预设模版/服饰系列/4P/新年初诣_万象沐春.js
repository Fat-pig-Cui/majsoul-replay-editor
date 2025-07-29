clearproject();

// 新年初诣UP装扮:
// 立直棒-魔法棒
// 和牌-歌剧魅影
// 和牌-魔法少女
// 立直-非常事态
// 立直-魔法少女

// 万象沐春UP装扮:
// 立直棒-爆竹
// 立直棒-饺子
// 立直棒-金龙鱼
// 和牌-阖家欢
// 立直-鼠生威
// 桌布-锦鲤游
// 牌背-红包

player_datas[0].nickname = '一姬';
player_datas[1].nickname = '二阶堂美树';
player_datas[2].nickname = '莎拉';
player_datas[3].nickname = '二之宫花';
player_datas[0].avatar_id = 400104;
player_datas[1].avatar_id = 400206;
player_datas[2].avatar_id = 401603;
player_datas[3].avatar_id = 401706;

// 一姬
player_datas[0].views = [
    {slot: 0, item_id: 305601}, // 立直棒-魔法棒
    {slot: 1, item_id: 305201}, // 和牌-歌剧魅影
    {slot: 2, item_id: 305301}, // 立直-非常事态
    {slot: 6, item_id: 305801}, // 桌布-锦鲤游
    {slot: 7, item_id: 305701}, // 牌背-红包
];
// 莎拉
player_datas[2].views = [
    {slot: 0, item_id: 305027}, // 立直棒-饺子
    {slot: 1, item_id: 305202}, // 和牌-魔法少女
    {slot: 2, item_id: 305302}, // 立直-魔法少女
    {slot: 6, item_id: 305801}, // 桌布-锦鲤游
    {slot: 7, item_id: 305701}, // 牌背-红包
];
// 二阶堂美树
player_datas[1].views = [
    {slot: 0, item_id: 305028}, // 立直棒-爆竹
    {slot: 1, item_id: 305203}, // 和牌-阖家欢
    {slot: 2, item_id: 305303}, // 立直-鼠生威
    {slot: 6, item_id: 305801}, // 桌布-锦鲤游
    {slot: 7, item_id: 305701}, // 牌背-红包
];
// 二之宫花
player_datas[3].views = [
    {slot: 0, item_id: 305602}, // 立直棒-金龙鱼
    {slot: 1, item_id: 305203}, // 和牌-阖家欢
    {slot: 2, item_id: 305303}, // 立直-鼠生威
    {slot: 6, item_id: 305801}, // 桌布-锦鲤游
    {slot: 7, item_id: 305701}, // 牌背-红包
];

config = {
    category: 1,
    meta: {mode_id: 0},
    mode: {
        mode: 1,
        detail_rule: {
            init_point: 100000,
            _tablecloth_id: 305801, // 桌布-锦鲤游
            _mjp_id: 305701, // 牌背-红包
        }
    }
};

// 示例对局
demogame();
