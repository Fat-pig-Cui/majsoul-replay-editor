clearProject();

// 四风连打, 四杠散了, 四家立直同时出现,
// 优先级最高的是四风连打, 但四风连打需要无人鸣牌, 故这里不会显示
// 四杠散了和四家立直, 通常认为四杠散了的优先级更高, 因为杠在立直前
// 同理对于四风连打和四家立直, 四风连打优先级更高
// 以上两种情况, 按照雀魂官方规则, 临近流局的最后一张牌立直也会成功交出棒子, 但没有交出棒子动画

// 供参考的真实牌谱(已匿名):
// 四杠散了后立直可以成立(东1局0本场): https://game.maj-soul.com/1/?paipu=jmklmq-vsry7112-yy10-63cc-gdmo-nksoqtwmrr0z__2
// 四风连打后立直可以成立(东3局2本场): https://game.maj-soul.com/1/?paipu=jnjpns-uvuv46x4-5d99-69da-ianf-hinotnnktnxy__2

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
        detail_rule: {}
    }
};

begin_tiles[0] = '11112224445556z';
begin_tiles[1] = '111999m111999p6z';
begin_tiles[2] = '222444666888s6z';
begin_tiles[3] = '111333777999s6z';
randomPaishan('1m2s1s', '23333z');
roundBegin();
comboMopai();
qiepai(true);
for (let i = 0; i < 3; i++) {
    mopai();
    comboMopai();
    qiepai(true);
}
liuju();
