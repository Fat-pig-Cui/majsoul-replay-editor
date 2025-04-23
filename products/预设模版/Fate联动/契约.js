loadproject();

editdata.player_datas[0].nickname = "间桐樱";
editdata.player_datas[1].nickname = "远坂凛";
editdata.player_datas[2].nickname = "Saber";
editdata.player_datas[3].nickname = "Archer";
editdata.player_datas[0].avatar_id = 40010802;
editdata.player_datas[1].avatar_id = 40010902;
editdata.player_datas[2].avatar_id = 40011002;
editdata.player_datas[3].avatar_id = 40011102;

editdata.player_datas[0].views = editdata.player_datas[1].views = editdata.player_datas[2].views = editdata.player_datas[3].views = [
    {"slot": 0, "item_id": 308043}, // 立直棒-胜利誓约
    {"slot": 1, "item_id": 308041}, // 和牌-咒层界・恶念祝祭
    {"slot": 2, "item_id": 308042}, // 立直-虚影祝祷
    {"slot": 6, "item_id": 308044}, // 桌布-剑之丘
    {"slot": 7, "item_id": 308045}, // 牌背-噬光之剑
];

editdata.config = {
    'category': 1,
    'meta': {'mode_id': 0},
    'mode': {
        'mode': 1,
        'detail_rule': {
            'init_point': 100000,
            'tablecloth_id': 308044, // 桌布-剑之丘
            'mjp_id': 308045, // 牌背-噬光之剑
        }
    }
};

// 示例对局
demogame();
