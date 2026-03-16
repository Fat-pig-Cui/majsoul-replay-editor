/**
 * @file: calcFan.ts - 根据牌算番核心文件, 分为立直, 川麻, 国标三个部分
 * @author: GrandDawn, Fat-pig-Cui
 * @email: chubbypig@qq.com
 * @github: https://github.com/Fat-pig-Cui/majsoul-replay-editor
 */

import {
    baopai, base_info, dora_cnt, dora_indicator, fulu,
    hunzhiyiji_info, liqi_info, paihe, paishan, player_tiles,
    sigang_bao, yongchang_data,
} from "./data";
import {
    get_field_spell_mode, is_beishuizhizhan, is_guyi, is_hunzhiyiji, is_qingtianjing,
    is_renhumanguan, is_sigangbaopai, is_sixifuhe, is_tiandichuangzao, is_wanwushengzhang,
    is_wanxiangxiuluo, is_xuezhandaodi, is_yifanjieguyi, is_yongchang, no_lianfengsifu,
    no_normalbaopai, no_shiduan, no_wyakuman, no_yifa
} from "./misc";
import {isEqualTile, judgeTile, calcHupai, calcTingpai, getLstAction} from "./exportedUtils";
import {
    calcSudian, calcSudianChuanma, calcSudianGuobiao, cmp, huazhu,
    nextTile, shunziMidTile, simplify
} from "./utils";
import {Constants} from "./constants";

/**
 * calcFan 组 - 立直
 *
 * 根据牌算番
 * @param seat - 和牌的 seat 号玩家
 * @param zimo - 是否是自摸
 * @param fangchong - 放铳玩家的 seat, 只有在 zimo 为 false 有效
 */
export const calcFan = (seat: Seat, zimo: boolean, fangchong?: Seat): CalcFanRet => {
    // 更新返回值
    const updateRet = (x: CalcFanRet): void => {
        if (calcSudian(ret, 1) < calcSudian(x, 1))
            ret = x;
    };

    const tiles = player_tiles[seat];
    const lastile = tiles[tiles.length - 1];
    let fulu_cnt = 0;
    let ret: CalcFanRet = {yiman: false, fans: [], fu: 0};
    const cnt: TileNum = {}; // cnt 不含副露, 并将红宝牌/透明牌转化为普通牌
    for (const tile of Constants.TILE)
        cnt[tile] = 0;
    for (const tile of tiles)
        cnt[simplify(tile)]++;

    const partition: Partition = [];
    for (const f of fulu[seat])
        if (f.type !== 4) {
            if (f.type !== 3)
                fulu_cnt++;
            partition.push(f);
        }

    // 幻境传说: 庄家卡1: 庄家门清状态下荣和只能是立直状态, 否则诈和
    if (get_field_spell_mode(1) === 1 && seat === base_info.ju && fulu_cnt === 0 && !zimo && liqi_info[seat].liqi !== 0)
        return ret;

    if (!is_wanxiangxiuluo())
        normalCalc();
    else if (cnt[Constants.TBD] === 1) {
        cnt[Constants.TBD]--;
        tiles.splice(tiles.indexOf(Constants.TBD), 1);
        for (const tile of Constants.TILE_NO_AKA) {
            cnt[tile]++;
            tiles.push(tile);

            normalCalc();

            tiles.pop();
            cnt[tile]--;
        }
        tiles.unshift(Constants.TBD);
    }

    return ret;

    // 没有百搭牌情况下的算番流程, 分为一般算番(dfs)和国士型
    function normalCalc() {
        dfs('1m');
        if (calcHupai(tiles) === 3) {
            // 删除 ans 中番为 id 的番
            const deleteFan = (id: number): void => {
                for (let i in ans.fans)
                    if (ans.fans[i].id === id) {
                        ans.fans.splice(parseInt(i), 1);
                        break;
                    }
            };

            const menqing = fulu_cnt === 0;
            let tianhu = false;
            const ans: CalcFanRet = {yiman: !is_qingtianjing(), fans: [], fu: 25};

            let wangpai_num = 14;
            if (base_info.player_cnt === 3)
                wangpai_num = 18;
            else if (base_info.player_cnt === 2)
                wangpai_num = 22;
            if (is_qingtianjing()) {
                if (is_hunzhiyiji()) {
                    if (hunzhiyiji_info[seat].liqi === 1)
                        ans.fans.push({val: 2, id: 804}); // 立直
                    if (hunzhiyiji_info[seat].liqi === 2)
                        ans.fans.push({val: 3, id: 805}); // 双立直
                    if (hunzhiyiji_info[seat].liqi !== 0 && !hunzhiyiji_info[seat].overload)
                        ans.fans.push({val: 1, id: 30}); // 一发
                } else {
                    if (liqi_info[seat].kai) { // 开立直非役满情况
                        if (liqi_info[seat].liqi === 1)
                            ans.fans.push({val: 2, id: 9005}); // 开立直
                        if (liqi_info[seat].liqi === 2)
                            ans.fans.push({val: 3, id: 9006}); // 开两立直
                    } else {
                        // 幻境传说: 机会卡5
                        if (get_field_spell_mode(2) === 5) {
                            if (liqi_info[seat].liqi === 1)
                                ans.fans.push({val: 2, id: 2}); // 立直
                            if (liqi_info[seat].liqi === 2)
                                ans.fans.push({val: 4, id: 18}); // 两立直
                        } else if (is_beishuizhizhan()) {
                            if (liqi_info[seat].liqi === 1 && liqi_info[seat].beishui_type === 1)
                                ans.fans.push({val: 3, id: 806}); // 真-立直
                            else if (liqi_info[seat].liqi === 2 && liqi_info[seat].beishui_type === 1)
                                ans.fans.push({val: 4, id: 807}); // 真-两立直
                            else if (liqi_info[seat].liqi === 1 && liqi_info[seat].beishui_type === 2)
                                ans.fans.push({val: 5, id: 808}); // 极-立直
                            else if (liqi_info[seat].liqi === 2 && liqi_info[seat].beishui_type === 2)
                                ans.fans.push({val: 6, id: 809}); // 极-两立直
                            else if (liqi_info[seat].liqi === 1)
                                ans.fans.push({val: 1, id: 2}); // 立直
                            else if (liqi_info[seat].liqi === 2)
                                ans.fans.push({val: 2, id: 18}); // 两立直
                        } else {
                            if (liqi_info[seat].liqi === 1)
                                ans.fans.push({val: 1, id: 2}); // 立直
                            if (liqi_info[seat].liqi === 2)
                                ans.fans.push({val: 2, id: 18}); // 两立直
                        }
                    }
                    // 幻境传说: 机会卡5
                    if (get_field_spell_mode(2) === 5) {
                        if (liqi_info[seat].liqi !== 0 && liqi_info[seat].yifa !== 0)
                            ans.fans.push({val: 2, id: 30}); // 一发
                    } else {
                        if (liqi_info[seat].liqi !== 0 && liqi_info[seat].yifa !== 0 && !no_yifa())
                            ans.fans.push({val: 1, id: 30}); // 一发
                    }
                }
                let lst_name = getLstAction().name;
                if (is_guyi() || is_yifanjieguyi()) {
                    if (lst_name === 'RecordDiscardTile' && getLstAction().data.is_liqi)
                        ans.fans.push({val: 1, id: 51}); // 燕返
                    if (!zimo && base_info.lst_draw_type === 0 && lst_name === 'RecordDiscardTile')
                        if (getLstAction(3) !== undefined && (getLstAction(3).name === 'RecordAnGangAddGang' || getLstAction(3).name === 'RecordChiPengGang'))
                            ans.fans.push({val: 1, id: 52}); // 杠振
                }
                if (menqing && zimo)
                    ans.fans.push({val: 1, id: 1}); // 门前清自摸和

                if (lst_name === 'RecordAnGangAddGang')
                    ans.fans.push({val: 1, id: 3}); // 枪杠
                if (zimo && base_info.lst_draw_type === 0)
                    ans.fans.push({val: 1, id: 4}); // 岭上开花
                if (zimo && paishan.length === wangpai_num && base_info.lst_draw_type === 1)
                    ans.fans.push({val: 1, id: 5}); // 海底摸月
                if (!zimo && paishan.length === wangpai_num)
                    ans.fans.push({val: 1, id: 6}); // 河底捞鱼

                const cnt2: TileNum = {}; // cnt2 包含副露, 不含红宝牌和拔北宝牌
                for (const tile of Constants.TILE_NO_AKA)
                    cnt2[tile] = 0;
                for (const tile of tiles)
                    cnt2[simplify(tile)]++;

                // 四种dora: 表dora, 红dora, 拔北dora, 里dora
                const all_doras = [0, 0, 0, 0];
                // 先把拔北给算上, 然后减去
                for (const f of fulu[seat])
                    if (f.type === 4) {
                        cnt2[simplify(f.tile[0])]++;
                        all_doras[2]++;
                    }
                for (let i = 0; i < dora_cnt.cnt; i++) {
                    if (base_info.player_cnt === 3 && isEqualTile(dora_indicator[0][i], '1m'))
                        all_doras[0] += cnt2['9m'];
                    else if (base_info.player_cnt === 2) {
                        if (isEqualTile(dora_indicator[0][i], '1p'))
                            all_doras[0] += cnt2['9p'];
                        if (isEqualTile(dora_indicator[0][i], '1s'))
                            all_doras[0] += cnt2['9s'];
                    } else {
                        // 幻境传说: 机会卡3
                        if (get_field_spell_mode(2) === 3)
                            all_doras[0] += cnt2[simplify(dora_indicator[0][i])];
                        all_doras[0] += cnt2[Constants.DORA_NXT[simplify(dora_indicator[0][i])]];
                    }
                }
                for (let i = 0; i < dora_cnt.li_cnt; i++) {
                    if (base_info.player_cnt === 3 && isEqualTile(dora_indicator[0][i], '1m'))
                        all_doras[3] += cnt2['9m'];
                    else if (base_info.player_cnt === 2) {
                        if (isEqualTile(dora_indicator[0][i], '1p'))
                            all_doras[3] += cnt2['9p'];
                        if (isEqualTile(dora_indicator[0][i], '1s'))
                            all_doras[3] += cnt2['9s'];
                    } else {
                        // 幻境传说: 机会卡3
                        if (get_field_spell_mode(2) === 3)
                            all_doras[3] += cnt2[simplify(dora_indicator[1][i])];
                        all_doras[3] += cnt2[Constants.DORA_NXT[simplify(dora_indicator[1][i])]];
                    }
                }
                // 幻境传说: 庄家卡5
                if (get_field_spell_mode(1) === 5 && seat === base_info.ju && !zimo)
                    ans.dora_bonus = all_doras[0] + all_doras[1] + all_doras[3];

                // 悬赏番
                if (all_doras[0] > 0)
                    // 幻境传说: 机会卡1
                    if (!(get_field_spell_mode(2) === 1 && liqi_info[seat].liqi !== 0))
                        ans.fans.push({val: all_doras[0], id: 31}); // 宝牌
                if (all_doras[1] > 0)
                    ans.fans.push({val: all_doras[1], id: 32}); // 红宝牌
                if (all_doras[2] > 0)
                    ans.fans.push({val: all_doras[2], id: 34}); // 北宝牌
                if (liqi_info[seat].liqi !== 0) {
                    let times = 1;
                    // 幻境传说: 机会卡1
                    if (get_field_spell_mode(2) === 1)
                        times = 2;
                    ans.fans.push({val: all_doras[3] * times, id: 33}); // 里宝牌
                }
            }

            if (liqi_info[seat].yifa !== 0 && liqi_info[seat].liqi === 0)
                if (zimo) {
                    deleteFan(1); // 删除门前清自摸和
                    if (seat === base_info.ju) {
                        ans.fans.push({val: !is_qingtianjing() ? 1 : 13, id: 35}); // 天和
                        tianhu = true;
                    } else
                        ans.fans.push({val: !is_qingtianjing() ? 1 : 13, id: 36}); // 地和
                } else if (is_guyi() || is_yifanjieguyi())
                    ans.fans.push({val: !is_qingtianjing() ? 1 : 13, id: 59}); // 人和

            if (menqing && cnt[simplify(lastile)] === 1 && !tianhu)
                ans.fans.push({val: !is_qingtianjing() ? 1 : 13, id: 42}); // 国士无双
            if (menqing && (cnt[simplify(lastile)] === 2 || tianhu)) {
                const tmp = {val: !is_qingtianjing() ? 2 : 26, id: 49}; // 国士无双十三面
                if (no_wyakuman())
                    tmp.val /= 2;
                ans.fans.push(tmp);
            }
            if (liqi_info[seat].liqi === 2)
                if (zimo && paishan.length === wangpai_num && base_info.lst_draw_type === 1 || !zimo && paishan.length === wangpai_num) {
                    deleteFan(18); // 删除两立直
                    deleteFan(5); // 删除海底摸月
                    deleteFan(6); // 删除河底捞鱼
                    ans.fans.push({val: !is_qingtianjing() ? 1 : 13, id: 63}); // 石上三年
                }
            if (is_yifanjieguyi() && seat === base_info.ju && base_info.lianzhuang_cnt >= 7) // 第8次和牌
                ans.fans.push({val: 1, id: 46}); // 八连庄

            updateRet(ans);
        }

        if (is_yifanjieguyi() && calcHupai(tiles) === 12) {
            const ans: CalcFanRet = {yiman: !is_qingtianjing(), fans: [], fu: 25};
            if (is_qingtianjing()) {
                const cnt2: TileNum = {}; // cnt2 是包含副露的牌数量集合, 不含红包牌和拔北宝牌
                for (const tile of Constants.TILE_NO_AKA)
                    cnt2[tile] = 0;
                for (const tile of tiles)
                    cnt2[simplify(tile)]++;

                // 四种dora: 表dora, 红dora, 拔北dora, 里dora
                const all_doras = [0, 0, 0, 0];
                // 先把拔北给算上, 然后减去
                for (const f of fulu[seat])
                    if (f.type === 4) {
                        cnt2[simplify(f.tile[0])]++;
                        all_doras[2]++;
                    }
                for (let i = 0; i < dora_cnt.cnt; i++) {
                    if (base_info.player_cnt === 3 && isEqualTile(dora_indicator[0][i], '1m'))
                        all_doras[0] += cnt2['9m'];
                    else if (base_info.player_cnt === 2) {
                        if (isEqualTile(dora_indicator[0][i], '1p'))
                            all_doras[0] += cnt2['9p'];
                        if (isEqualTile(dora_indicator[0][i], '1s'))
                            all_doras[0] += cnt2['9s'];
                    } else {
                        // 幻境传说: 机会卡3
                        if (get_field_spell_mode(2) === 3)
                            all_doras[0] += cnt2[simplify(dora_indicator[0][i])];
                        all_doras[0] += cnt2[Constants.DORA_NXT[simplify(dora_indicator[0][i])]];
                    }
                }
                for (let i = 0; i < dora_cnt.li_cnt; i++) {
                    if (base_info.player_cnt === 3 && isEqualTile(dora_indicator[0][i], '1m'))
                        all_doras[3] += cnt2['9m'];
                    else if (base_info.player_cnt === 2) {
                        if (isEqualTile(dora_indicator[0][i], '1p'))
                            all_doras[3] += cnt2['9p'];
                        if (isEqualTile(dora_indicator[0][i], '1s'))
                            all_doras[3] += cnt2['9s'];
                    } else {
                        // 幻境传说: 机会卡3
                        if (get_field_spell_mode(2) === 3)
                            all_doras[3] += cnt2[simplify(dora_indicator[1][i])];
                        all_doras[3] += cnt2[Constants.DORA_NXT[simplify(dora_indicator[1][i])]];
                    }
                }
                // 幻境传说: 庄家卡5
                if (get_field_spell_mode(1) === 5 && seat === base_info.ju && !zimo)
                    ans.dora_bonus = all_doras[0] + all_doras[1] + all_doras[3];

                // 悬赏番
                if (all_doras[0] > 0)
                    // 幻境传说: 机会卡1
                    if (!(get_field_spell_mode(2) === 1 && liqi_info[seat].liqi !== 0))
                        ans.fans.push({val: all_doras[0], id: 31}); // 宝牌
                if (all_doras[1] > 0)
                    ans.fans.push({val: all_doras[1], id: 32}); // 红宝牌
                if (all_doras[2] > 0)
                    ans.fans.push({val: all_doras[2], id: 34}); // 北宝牌
                if (liqi_info[seat].liqi !== 0) {
                    let times = 1;
                    // 幻境传说: 机会卡1
                    if (get_field_spell_mode(2) === 1)
                        times = 2;
                    ans.fans.push({val: all_doras[3] * times, id: 33}); // 里宝牌
                }
            }
            if (liqi_info[seat].yifa !== 0 && liqi_info[seat].liqi === 0 && zimo)
                ans.fans.push({val: !is_qingtianjing() ? 1 : 13, id: 9708}); // 十三不搭
            updateRet(ans);
        }
    }

    // 深度优先搜索, 对手牌和副露进行划分, 搜索到尽头划分数量达到5或7时, 开始算番
    function dfs(tile: Tile) {
        if (tile === '0m') {
            if (partition.length === 5 || partition.length === 7)
                calc();
            return;
        }
        if (cnt[tile] === 0) {
            dfs(nextTile(tile));
            return;
        }
        const whatever = [0, 2, 3, 5, 6, 8, 9, 11, 12, 14];
        for (const num of whatever) {
            if (cnt[tile] < num)
                continue;
            cnt[tile] -= num;
            const cnt0 = cnt[tile];
            if (num % 3 === 2) { // 有对子
                const kezi_num = (num - 2) / 3;
                for (let j = 0; j < kezi_num; j++)
                    partition.push({type: 6, tile: [tile, tile, tile]});
                partition.push({type: 7, tile: [tile, tile]});
                dfs(tile);
            } else if (num % 3 === 0) // 3 的倍数, 全是当成刻子
                for (let j = 0; j < num / 3; j++)
                    partition.push({type: 6, tile: [tile, tile, tile]});

            if (cnt[Constants.NXT2[tile]] >= cnt0 && cnt[Constants.NXT2[Constants.NXT2[tile]]] >= cnt0) {
                cnt[tile] -= cnt0;
                cnt[Constants.NXT2[tile]] -= cnt0;
                cnt[Constants.NXT2[Constants.NXT2[tile]]] -= cnt0;
                for (let i = 0; i < cnt0; i++)
                    partition.push({
                        type: 5,
                        tile: [tile, Constants.NXT2[tile], Constants.NXT2[Constants.NXT2[tile]]],
                    });
                dfs(nextTile(tile));
                cnt[tile] += cnt0;
                cnt[Constants.NXT2[tile]] += cnt0;
                cnt[Constants.NXT2[Constants.NXT2[tile]]] += cnt0;
                for (let i = 0; i < cnt0; i++)
                    partition.pop();
            }
            for (let i = 0; i < Math.floor((num + 1) / 3); i++)
                partition.pop();
            cnt[tile] += num;
        }
    }

    // 算番
    function calc() {
        const cnt2: TileNum = {}; // cnt2 是包含副露的牌数量集合, 不含红包牌和拔北宝牌
        for (const tile of Constants.TILE_NO_AKA)
            cnt2[tile] = 0;
        const partition_tmp = partition.slice();
        for (const p of partition_tmp) {
            const tls = p.tile;
            if (p.type === 0 || p.type === 5)
                for (let j = 0; j < 3; j++)
                    cnt2[simplify(tls[j])]++;
            else if (p.type === 1 || p.type === 6)
                cnt2[simplify(tls[0])] += 3;
            else if (p.type === 2 || p.type === 3)
                cnt2[simplify(tls[0])] += 4;
            else if (p.type === 7)
                cnt2[simplify(tls[0])] += 2;
        }

        for (const p of partition_tmp) {
            const p_tiles = p.tile, type = p.type;
            if (type === 5 && (isEqualTile(p_tiles[0], lastile) || isEqualTile(p_tiles[1], lastile) || isEqualTile(p_tiles[2], lastile))) {
                if (!zimo)
                    p.type = 0;
                const mid_tile = shunziMidTile(p_tiles);
                if (isEqualTile(mid_tile, lastile))
                    updateRet(calc0(2)); // 坎张听符
                else if (parseInt(simplify(lastile)) === 3 && parseInt(mid_tile) === 2)
                    updateRet(calc0(2)); // 边张听符
                else if (parseInt(simplify(lastile)) === 7 && parseInt(mid_tile) === 8)
                    updateRet(calc0(2)); // 边张听符
                else
                    updateRet(calc0(0));
                p.type = 5;
            }
            if (type === 6 && isEqualTile(p_tiles[0], lastile)) {
                if (!zimo)
                    p.type = 1;
                updateRet(calc0(0));
                p.type = 6;
            }
            if (type === 7 && isEqualTile(p_tiles[0], lastile))
                updateRet(calc0(2)); // 单骑符
        }

        /**
         * 核心算法, 根据所有前置动作计算手牌有哪些番
         *
         * @param tingpaifu - 听牌符数
         */
        function calc0(tingpaifu: 0 | 2): CalcFanRet {
            // 删除 ans 中番为 id 的番
            const deleteFan = (id: number): void => {
                for (let i in ans.fans)
                    if (ans.fans[i].id === id) {
                        ans.fans.splice(parseInt(i), 1);
                        break;
                    }
            };

            baopai[seat] = []; // 重置和牌玩家包牌信息
            let tianhu = false;
            const menqing = fulu_cnt === 0;
            // 无青天井情况下默认为 true, 之后再否定
            const ans: CalcFanRet = {yiman: !is_qingtianjing(), fans: [], fu: 0, dora_bonus: 0};
            // ----------------------------------------------
            // type_cnt[i] 的 0-7 下标分别对应对应划分种类的数量
            // 0: 明顺    1: 明刻   2: 明杠   3: 暗杠
            // 4: 北宝    5: 暗顺   6: 暗刻   7: 对子
            const type_cnt: TypeCnt = {};
            // 刻子, 杠子, 暗刻, 顺子
            const kezi: TileNum = {}, gangzi: TileNum = {}, anke: TileNum = {}, shunzi: TileNum = {};
            let kezi_num = 0, gangzi_num = 0, anke_num = 0, duizi_num = 0;

            for (const tile of Constants.TILE_NO_AKA) {
                type_cnt[tile] = [0, 0, 0, 0, 0, 0, 0, 0];
                anke[tile] = gangzi[tile] = kezi[tile] = shunzi[tile] = 0;
            }
            for (const p of partition_tmp) {
                const type = p.type;
                switch (type) {
                    case 1:
                        kezi[simplify(p.tile[0])]++;
                        break;
                    case 2:
                        kezi[simplify(p.tile[0])]++;
                        gangzi[simplify(p.tile[0])]++;
                        break;
                    case 3:
                        kezi[simplify(p.tile[0])]++;
                        gangzi[simplify(p.tile[0])]++;
                        anke[simplify(p.tile[0])]++;
                        break;
                    case 6:
                        kezi[simplify(p.tile[0])]++;
                        anke[simplify(p.tile[0])]++;
                        break;
                    case 0:
                    case 5:
                        shunzi[shunziMidTile(p.tile)]++;
                        break;
                }
                if (type === 1 || type === 2 || type === 3 || type === 6 || type === 7)
                    type_cnt[simplify(p.tile[0])][type]++;
                if (type === 0 || type === 5)
                    type_cnt[shunziMidTile(p.tile)][type]++;
            }
            let beikou = 0, santongshun = false, sanlianke = false;
            for (const tile of Constants.TILE_NO_AKA) {
                anke_num += anke[tile];
                gangzi_num += gangzi[tile];
                kezi_num += kezi[tile];
                duizi_num += type_cnt[tile][7];

                if (Constants.MAN_MID_TILE.includes(tile) || Constants.PIN_MID_TILE.includes(tile) || Constants.SOU_MID_TILE.includes(tile))
                    if (kezi[parseInt(tile) - 1 + tile[1]] >= 1 && kezi[tile] >= 1 && kezi[parseInt(tile) + 1 + tile[1]] >= 1)
                        sanlianke = true;

                // 这里的杯口数量算上副露的, 最后在判断是否有效
                beikou += Math.floor(shunzi[tile] / 2);

                if (Math.floor(shunzi[tile] / 3) >= 1)
                    santongshun = true;
            }
            const group = Constants.GROUP;
            // ---------------------------
            let flag_ziyise = true, flag_lvyise = true, flag_qinglaotou = true, flag_duanyao = true,
                flag_hunlaotou = true;
            for (const tile of Constants.TILE_NO_AKA)
                if (cnt2[tile] > 0) {
                    if (!Constants.HONOR_TILE.includes(tile))
                        flag_ziyise = false; // 字一色
                    if (!Constants.TERMINAL_TILE.includes(tile))
                        flag_qinglaotou = false; // 清老头
                    if (Constants.YAOJIU_TILE.includes(tile))
                        flag_duanyao = false; // 断幺九
                    if (!Constants.YAOJIU_TILE.includes(tile))
                        flag_hunlaotou = false; // 混老头
                    if (!judgeTile(tile, 'L'))
                        flag_lvyise = false; // 绿一色
                }

            // ---------------------------------
            let wumenqi = true;
            for (let i = 0; i < 5; i++) {
                const wumen_lows = ['1m', '1p', '1s', '1z', '5z'],
                    wumen_highs = ['9m', '9p', '9s', '4z', '7z'];
                let flag = false;
                for (let j = parseInt(wumen_lows[i]); j <= parseInt(wumen_highs[i]); j++)
                    flag ||= cnt2[j + wumen_lows[i][1]] > 0;
                if (!flag)
                    wumenqi = false;
            }
            // ---------------------------------
            // jiulian[0] 用于判断是否为九莲, jiulian[1] 表示多出来的一张牌
            let jiulian: [boolean, Tile?] = [false], yiqi = false, hunyise: boolean, qingyise: boolean;
            const jlbd = [0, 3, 1, 1, 1, 1, 1, 1, 1, 3];
            for (let k = 0; k <= 2; k++) {
                if (shunzi['2' + group[k]] >= 1 && shunzi['5' + group[k]] >= 1 && shunzi['8' + group[k]] >= 1)
                    yiqi = true;

                jiulian = [true];
                for (let i = 1; i <= 9; i++)
                    if (cnt2[i + group[k]] < jlbd[i]) // 手牌中各种牌数量不满足
                        jiulian = [false];
                    else if (cnt2[i + group[k]] > jlbd[i]) // 多出来的牌
                        jiulian[1] = i + group[k] as Tile;
                if (jiulian[0])
                    break;
            }
            if (gangzi_num >= 1) // 九莲不允许有杠子
                jiulian = [false];

            let hunyise_man = true, hunyise_pin = true, hunyise_sou = true;
            let qingyise_man = true, qingyise_pin = true, qingyise_sou = true;
            for (const tile of Constants.TILE_NO_AKA) {
                if (tile[1] !== 'm' && cnt2[tile] > 0) {
                    if (tile[1] !== 'z')
                        hunyise_man = false;
                    qingyise_man = false;
                }
                if (tile[1] !== 'p' && cnt2[tile] > 0) {
                    if (tile[1] !== 'z')
                        hunyise_pin = false;
                    qingyise_pin = false;
                }
                if (tile[1] !== 's' && cnt2[tile] > 0) {
                    if (tile[1] !== 'z')
                        hunyise_sou = false;
                    qingyise_sou = false;
                }
            }
            hunyise = hunyise_man || hunyise_pin || hunyise_sou;
            qingyise = qingyise_man || qingyise_pin || qingyise_sou;
            // ----------------------------------
            let sanse = false, sansetongke = false;
            for (let i = 1; i <= 9; i++) {
                if (shunzi[i + 'm'] >= 1 && shunzi[i + 'p'] >= 1 && shunzi[i + 's'] >= 1)
                    sanse = true;
                if (kezi[i + 'm'] >= 1 && kezi[i + 'p'] >= 1 && kezi[i + 's'] >= 1)
                    sansetongke = true;
            }
            // ----------------------------------
            let chunquandai = true, hunquandai = true;
            for (let j = 0; j < 3; j++)
                for (let i = 1; i <= 9; i++) {
                    // 从顺子和(刻子, 雀头)的角度判断是否有全带, 先顺子后(刻子, 雀头)
                    if (i > 2 && i < 8 && shunzi[i + group[j]] >= 1)
                        chunquandai = hunquandai = false;
                    if (i > 1 && i < 9 && kezi[i + group[j]] + type_cnt[i + group[j]][7] >= 1)
                        chunquandai = hunquandai = false;
                }
            for (let i = 1; i <= 7; i++)
                if (kezi[i + 'z'] + type_cnt[i + 'z'][7] >= 1)
                    chunquandai = false;
            // ------------------------------------
            let pinghu = true;
            if (duizi_num === 7)
                pinghu = false;
            for (const tile of Constants.TILE_NO_AKA) {
                if (kezi[tile] >= 1) // 有刻子
                    pinghu = false;
                if (type_cnt[tile][7] === 1) {
                    // 雀头是自风, 场风, 三元
                    if (((seat - base_info.ju + base_info.player_cnt) % base_info.player_cnt + 1) + 'z' === tile)
                        pinghu = false;
                    if ((base_info.chang + 1) + 'z' === tile)
                        pinghu = false;
                    if (Constants.DRAGON_TILE.includes(tile))
                        pinghu = false;
                }
            }
            // 顺子两面听判断
            let flag_liangmian = false;
            if (parseInt(simplify(lastile)) >= 4 && parseInt(simplify(lastile)) <= 9) // 数牌4-9
                if (shunzi[parseInt(simplify(lastile)) - 1 + lastile[1]] >= 1) // 顺子的中心比 lastile 小 1
                    flag_liangmian = true;
            if (parseInt(simplify(lastile)) >= 1 && parseInt(simplify(lastile)) <= 6) // 数牌1-6
                if (shunzi[parseInt(simplify(lastile)) + 1 + lastile[1]] >= 1) // 顺子的中心比 lastile 大 1
                    flag_liangmian = true;
            if (!flag_liangmian)
                pinghu = false;
            // -------------------------------------
            let xiaosanyuan = false, dasanyuan = false, xiaosixi = false, dasixi = false;

            for (let i = 0; i < 3; i++)
                if (type_cnt[5 + i + 'z'][7] === 1 && kezi[5 + (i + 1) % 3 + 'z'] >= 1 && kezi[5 + (i + 2) % 3 + 'z'] >= 1)
                    xiaosanyuan = true;

            if (kezi['5z'] >= 1 && kezi['6z'] >= 1 && kezi['7z'] >= 1)
                dasanyuan = true;

            for (let i = 0; i < 4; i++)
                if (type_cnt[1 + i + 'z'][7] === 1 && kezi[1 + (i + 1) % 4 + 'z'] >= 1 && kezi[1 + (i + 2) % 4 + 'z'] >= 1 && kezi[1 + (i + 3) % 4 + 'z'] >= 1)
                    xiaosixi = true;

            if (kezi['1z'] >= 1 && kezi['2z'] >= 1 && kezi['3z'] >= 1 && kezi['4z'] >= 1)
                dasixi = true;

            // -------------------------------------
            // 四种dora: 表dora, 红dora, 拔北dora, 里dora
            let all_doras = [0, 0, 0, 0];
            // 先把拔北给算上, 然后减去
            for (const f of fulu[seat])
                if (f.type === 4) {
                    cnt2[simplify(f.tile[0])]++;
                    all_doras[2]++;
                }
            for (let i = 0; i < dora_cnt.cnt; i++) {
                if (base_info.player_cnt === 3 && isEqualTile(dora_indicator[0][i], '1m'))
                    all_doras[0] += cnt2['9m'];
                else if (base_info.player_cnt === 2) {
                    if (isEqualTile(dora_indicator[0][i], '1p'))
                        all_doras[0] += cnt2['9p'];
                    if (isEqualTile(dora_indicator[0][i], '1s'))
                        all_doras[0] += cnt2['9s'];
                } else {
                    // 幻境传说: 机会卡3
                    if (get_field_spell_mode(2) === 3)
                        all_doras[0] += cnt2[simplify(dora_indicator[0][i])];
                    all_doras[0] += cnt2[Constants.DORA_NXT[simplify(dora_indicator[0][i])]];
                }
            }
            for (let i = 0; i < dora_cnt.li_cnt; i++) {
                if (base_info.player_cnt === 3 && isEqualTile(dora_indicator[1][i], '1m'))
                    all_doras[3] += cnt2['9m'];
                else if (base_info.player_cnt === 2) {
                    if (isEqualTile(dora_indicator[1][i], '1p'))
                        all_doras[3] += cnt2['9p'];
                    if (isEqualTile(dora_indicator[1][i], '1s'))
                        all_doras[3] += cnt2['9s'];
                } else {
                    // 幻境传说: 机会卡3
                    if (get_field_spell_mode(2) === 3)
                        all_doras[3] += cnt2[simplify(dora_indicator[1][i])];
                    all_doras[3] += cnt2[Constants.DORA_NXT[simplify(dora_indicator[1][i])]];
                }
            }
            // cnt2 不记录红宝牌, 所以不能用 cnt2
            for (const tile of tiles)
                if (tile[0] === '0')
                    all_doras[1]++;
            for (const f of fulu[seat])
                for (const tile of f.tile)
                    if (tile[0] === '0')
                        all_doras[1]++;

            for (const f of fulu[seat])
                if (f.type === 4)
                    cnt2[simplify(f.tile[0])]--;

            // 幻境传说: 庄家卡5
            if (get_field_spell_mode(1) === 5 && seat === base_info.ju && !zimo)
                ans.dora_bonus = all_doras[0] + all_doras[1] + all_doras[3];
            // ------------------------------------
            // ------------------------------------
            // ------------------------------------
            // 自己添加的役种
            if (is_tiandichuangzao() && type_cnt['5z'][2] === 1 && type_cnt['5z'][7] === 1 && type_cnt['5z'][3] === 3) {
                if (!is_qingtianjing()) {
                    ans.fans.push({val: 6, id: 9001}); // 天地创造
                    return ans;
                } else
                    ans.fans.push({val: 0, id: 9001}); // 设为0是防止重复计数
            }
            if (is_wanwushengzhang() && type_cnt['6z'][3] === 4 && type_cnt['6z'][7] === 1) {
                if (!is_qingtianjing()) {
                    ans.fans.push({val: 6, id: 9002}); // 万物生长
                    return ans;
                } else
                    ans.fans.push({val: 0, id: 9002}); // 设为0是防止重复计数
            }
            // ------------------------------------
            // ------------------------------------
            // ------------------------------------
            if (liqi_info[seat].yifa !== 0 && liqi_info[seat].liqi === 0)
                if (zimo)
                    if (seat === base_info.ju) {
                        ans.fans.push({val: !is_qingtianjing() ? 1 : 13, id: 35}); // 天和
                        tianhu = true;
                    } else
                        ans.fans.push({val: !is_qingtianjing() ? 1 : 13, id: 36}); // 地和
                else if (is_guyi() || is_yifanjieguyi())
                    ans.fans.push({val: !is_qingtianjing() ? 1 : 13, id: 59}); // 人和

            if (dasanyuan) {
                if (!is_xuezhandaodi() && !is_wanxiangxiuluo() && !no_normalbaopai()) {
                    let fulu_sanyuan = 0;
                    for (const f of fulu[seat]) {
                        const type = f.type;
                        if ((type === 1 || type === 2 || type === 3) && Constants.DRAGON_TILE.includes(simplify(f.tile[0]))) {
                            fulu_sanyuan++;
                            if (fulu_sanyuan === 3 && f.from !== undefined)
                                baopai[seat].push({seat: f.from, val: 1});
                        }
                    }
                }
                ans.fans.push({val: !is_qingtianjing() ? 1 : 13, id: 37}); // 大三元
            }

            if (menqing && anke_num === 4 && (type_cnt[simplify(lastile)][7] === 1 || tianhu)) {
                const tmp = {val: !is_qingtianjing() ? 2 : 26, id: 48}; // 四暗刻单骑
                if (no_wyakuman())
                    tmp.val /= 2;
                ans.fans.push(tmp);
            } else if (menqing && anke_num === 4 && anke[simplify(lastile)] - gangzi[simplify(lastile)] >= 1 && !tianhu)
                ans.fans.push({val: !is_qingtianjing() ? 1 : 13, id: 38}); // 四暗刻

            if (flag_ziyise)
                ans.fans.push({val: !is_qingtianjing() ? 1 : 13, id: 39}); // 字一色
            if (flag_lvyise)
                ans.fans.push({val: !is_qingtianjing() ? 1 : 13, id: 40}); // 绿一色
            if (flag_qinglaotou)
                ans.fans.push({val: !is_qingtianjing() ? 1 : 13, id: 41}); // 清老头

            if (xiaosixi && (!dasixi || is_sixifuhe()))
                ans.fans.push({val: !is_qingtianjing() ? 1 : 13, id: 43}); // 小四喜

            if (gangzi_num === 4) {
                if (!is_xuezhandaodi() && !is_wanxiangxiuluo() && is_sigangbaopai() && sigang_bao[seat]) {
                    let fulu_gangzi = 0;
                    for (const f of fulu[seat])
                        if (f.type === 2 || f.type === 3) {
                            fulu_gangzi++;
                            if (fulu_gangzi === 4 && f.from !== undefined)
                                baopai[seat].push({seat: f.from, val: 1});
                        }
                }
                ans.fans.push({val: !is_qingtianjing() ? 1 : 13, id: 44}); // 四杠子
            }

            if (menqing && jiulian[0] && (isEqualTile(lastile, jiulian[1]) || tianhu)) {
                const tmp = {val: !is_qingtianjing() ? 2 : 26, id: 47}; // 纯正九莲宝灯
                if (no_wyakuman())
                    tmp.val /= 2;
                ans.fans.push(tmp);
            }

            if (menqing && jiulian[0] && !isEqualTile(lastile, jiulian[1]) && !tianhu)
                ans.fans.push({val: !is_qingtianjing() ? 1 : 13, id: 45}); // 九莲宝灯

            if (dasixi) {
                if (!is_xuezhandaodi() && !is_wanxiangxiuluo() && !no_normalbaopai()) {
                    let fulu_sixi = 0;
                    for (const f of fulu[seat]) {
                        const type = f.type;
                        if ((type === 1 || type === 2 || type === 3) && Constants.WIND_TILE.includes(simplify(f.tile[0]))) {
                            fulu_sixi++;
                            if (fulu_sixi === 4 && f.from !== undefined)
                                baopai[seat].push({seat: f.from, val: no_wyakuman() ? 1 : 2});
                        }
                    }
                }
                const tmp = {val: !is_qingtianjing() ? 2 : 26, id: 50}; // 大四喜
                if (no_wyakuman())
                    tmp.val /= 2;
                ans.fans.push(tmp);
            }
            let wangpai_num = 14;
            if (base_info.player_cnt === 2)
                wangpai_num = 18;

            if (is_guyi() || is_yifanjieguyi()) {
                for (let j = 0; j < 3; j++) {
                    let flag = true;
                    for (let i = 2; i <= 8; i++)
                        if (cnt2[i + group[j]] !== 2) {
                            flag = false;
                            break;
                        }
                    if (flag) {
                        if (j === 0)
                            ans.fans.push({val: !is_qingtianjing() ? 1 : 13, id: 62}); // 大数邻
                        if (j === 1)
                            ans.fans.push({val: !is_qingtianjing() ? 1 : 13, id: 60}); // 大车轮
                        if (j === 2)
                            ans.fans.push({val: !is_qingtianjing() ? 1 : 13, id: 61}); // 大竹林
                        break;
                    }
                }

                if (liqi_info[seat].liqi === 2)
                    if (zimo && paishan.length === wangpai_num && base_info.lst_draw_type === 1 || !zimo && paishan.length === wangpai_num)
                        ans.fans.push({val: !is_qingtianjing() ? 1 : 13, id: 63}); // 石上三年
                if (flag_ziyise && duizi_num === 7 && !no_wyakuman()) {
                    deleteFan(39); // 删除字一色
                    const tmp = {val: !is_qingtianjing() ? 2 : 26, id: 64}; // 大七星
                    if (no_wyakuman())
                        tmp.val /= 2;
                    ans.fans.push(tmp);
                }
            }
            // 四连刻, 一色四同顺, 红孔雀, 红一点, 黑一色,
            // 十三不搭, 八连庄, 百万石, 金门桥, 东北新干线, 无发绿一色
            if (is_yifanjieguyi()) {
                let sitongshun = false, silianke = false;
                for (let i = 0; i < 3; i++)
                    for (let j = 1; j <= 9; j++) {
                        if (j !== 1 && j !== 9 && shunzi[j + group[i]] >= 4)
                            sitongshun = true;
                        if (j <= 6 && kezi[j + group[i]] >= 1 && kezi[j + 1 + group[i]] >= 1 && kezi[j + 2 + group[i]] >= 1 && kezi[j + 3 + group[i]] >= 1)
                            silianke = true;
                    }
                if (silianke)
                    ans.fans.push({val: !is_qingtianjing() ? 1 : 13, id: 9703}); // 四连刻
                if (sitongshun)
                    ans.fans.push({val: !is_qingtianjing() ? 1 : 13, id: 9704}); // 一色四同顺

                let hongkongque = true, hongyidian = true, heiyise = true;
                if (cnt2['7z'] === 0)
                    hongkongque = hongyidian = false;
                for (const tile of Constants.TILE_NO_AKA) {
                    if (!judgeTile(tile, 'hongkongque') && cnt2[tile] >= 1)
                        hongkongque = false;
                    if (!judgeTile(tile, 'hongyidian') && cnt2[tile] >= 1)
                        hongyidian = false;
                    if (!judgeTile(tile, 'heiyise') && cnt2[tile] >= 1)
                        heiyise = false;
                }
                if (hongkongque)
                    ans.fans.push({val: !is_qingtianjing() ? 1 : 13, id: 9705}); // 红孔雀
                if (hongyidian)
                    ans.fans.push({val: !is_qingtianjing() ? 1 : 13, id: 9706}); // 红一点
                if (heiyise)
                    ans.fans.push({val: !is_qingtianjing() ? 1 : 13, id: 9707}); // 黑一色

                if (seat === base_info.ju && base_info.lianzhuang_cnt >= 7) // 第8次和牌
                    ans.fans.push({val: !is_qingtianjing() ? 1 : 13, id: 46}); // 八连庄

                if (qingyise_man) {
                    let sum = 0;
                    for (let i = 1; i <= 9; i++)
                        sum += cnt2[i + 'm'] * i;
                    if (sum >= 100)
                        ans.fans.push({val: !is_qingtianjing() ? 1 : 13, id: 9709}); // 百万石
                }

                let jinmenqiao = false;
                for (let i = 0; i <= 2; i++)
                    if (shunzi[2 + group[i]] >= 1 && shunzi[4 + group[i]] >= 1 && shunzi[6 + group[i]] >= 1 && shunzi[8 + group[i]] >= 1)
                        jinmenqiao = true;
                if (menqing && jinmenqiao)
                    ans.fans.push({val: !is_qingtianjing() ? 1 : 13, id: 9710}); // 金门桥

                let xinganxian_part1 = false, xinganxian_part2 = false;
                for (let j = 0; j <= 2; j++) {
                    xinganxian_part1 = true;
                    for (let i = 1; i <= 9; i++)
                        if (cnt2[i + group[j]] !== 1)
                            xinganxian_part1 = false;
                    if (xinganxian_part1)
                        break;
                }
                if (kezi['1z'] === 1 && type_cnt['4z'][7] === 1 || kezi['4z'] === 1 && type_cnt['1z'][7] === 1)
                    xinganxian_part2 = true;
                if (menqing && xinganxian_part1 && xinganxian_part2)
                    ans.fans.push({val: !is_qingtianjing() ? 1 : 13, id: 9711}); // 东北新干线

                if (flag_lvyise && cnt2['6z'] === 0) {
                    deleteFan(40);
                    ans.fans.push({val: !is_qingtianjing() ? 2 : 26, id: 9712}); // 无发绿一色
                }
            }

            if (liqi_info[seat].kai && !zimo && liqi_info[fangchong].liqi === 0) { // 开立直
                if (liqi_info[seat].liqi === 1)
                    ans.fans.push({val: !is_qingtianjing() ? 1 : 13, id: 9003});
                if (liqi_info[seat].liqi === 2)
                    ans.fans.push({val: !is_qingtianjing() ? 1 : 13, id: 9004});
            }

            if (ans.fans.length > 0 && !is_qingtianjing())
                return ans;
            // ------------------------------------
            ans.yiman = false;

            if (liqi_info[seat].yifa !== 0 && liqi_info[seat].liqi === 0 && seat !== base_info.ju && !zimo)
                if (is_renhumanguan())
                    ans.fans.push({val: 5, id: 65}); // 人和2

            if (is_hunzhiyiji()) {
                if (hunzhiyiji_info[seat].liqi === 1)
                    ans.fans.push({val: 2, id: 804}); // 立直
                if (hunzhiyiji_info[seat].liqi === 2)
                    ans.fans.push({val: 3, id: 805}); // 双立直
                if (hunzhiyiji_info[seat].liqi !== 0 && !hunzhiyiji_info[seat].overload)
                    ans.fans.push({val: 1, id: 30}); // 一发
            } else {
                if (liqi_info[seat].kai) { // 开立直非役满情况
                    if (liqi_info[seat].liqi === 1)
                        ans.fans.push({val: 2, id: 9005}); // 开立直
                    if (liqi_info[seat].liqi === 2)
                        ans.fans.push({val: 3, id: 9006}); // 开两立直
                } else {
                    // 幻境传说: 机会卡5
                    if (get_field_spell_mode(2) === 5) {
                        if (liqi_info[seat].liqi === 1)
                            ans.fans.push({val: 2, id: 2}); // 立直
                        if (liqi_info[seat].liqi === 2)
                            ans.fans.push({val: 4, id: 18}); // 两立直
                    } else if (is_beishuizhizhan()) {
                        if (liqi_info[seat].liqi === 1 && liqi_info[seat].beishui_type === 1)
                            ans.fans.push({val: 3, id: 806}); // 真-立直
                        else if (liqi_info[seat].liqi === 2 && liqi_info[seat].beishui_type === 1)
                            ans.fans.push({val: 4, id: 807}); // 真-两立直
                        else if (liqi_info[seat].liqi === 1 && liqi_info[seat].beishui_type === 2)
                            ans.fans.push({val: 5, id: 808}); // 极-立直
                        else if (liqi_info[seat].liqi === 2 && liqi_info[seat].beishui_type === 2)
                            ans.fans.push({val: 6, id: 809}); // 极-两立直
                        else if (liqi_info[seat].liqi === 1)
                            ans.fans.push({val: 1, id: 2}); // 立直
                        else if (liqi_info[seat].liqi === 2)
                            ans.fans.push({val: 2, id: 18}); // 两立直
                    } else {
                        if (liqi_info[seat].liqi === 1)
                            ans.fans.push({val: 1, id: 2}); // 立直
                        if (liqi_info[seat].liqi === 2)
                            ans.fans.push({val: 2, id: 18}); // 两立直
                    }
                }
                // 幻境传说: 机会卡5
                if (get_field_spell_mode(2) === 5) {
                    if (liqi_info[seat].liqi !== 0 && liqi_info[seat].yifa !== 0)
                        ans.fans.push({val: 2, id: 30}); // 一发
                } else {
                    if (liqi_info[seat].liqi !== 0 && liqi_info[seat].yifa !== 0 && !no_yifa())
                        ans.fans.push({val: 1, id: 30}); // 一发
                }
            }
            const lst_name = getLstAction().name;
            if (is_guyi() || is_yifanjieguyi()) {
                if (lst_name === 'RecordDiscardTile' && getLstAction().data.is_liqi)
                    ans.fans.push({val: 1, id: 51}); // 燕返
                if (!zimo && base_info.lst_draw_type === 0 && lst_name === 'RecordDiscardTile')
                    if (getLstAction(3) !== undefined && (getLstAction(3).name === 'RecordAnGangAddGang' || getLstAction(3).name === 'RecordChiPengGang'))
                        ans.fans.push({val: 1, id: 52}); // 杠振
                if (fulu_cnt === 4)
                    ans.fans.push({val: 1, id: 53}); // 十二落抬
            }
            if (menqing && zimo)
                ans.fans.push({val: 1, id: 1}); // 门前清自摸和

            if (lst_name === 'RecordAnGangAddGang')
                ans.fans.push({val: 1, id: 3}); // 枪杠
            if (zimo && base_info.lst_draw_type === 0)
                ans.fans.push({val: 1, id: 4}); // 岭上开花
            if (zimo && paishan.length === wangpai_num && base_info.lst_draw_type === 1)
                ans.fans.push({val: 1, id: 5}); // 海底摸月
            if (!zimo && paishan.length === wangpai_num)
                ans.fans.push({val: 1, id: 6}); // 河底捞鱼

            if (kezi['5z'] >= 1)
                ans.fans.push({val: kezi['5z'], id: 7}); // 白
            if (kezi['6z'] >= 1)
                ans.fans.push({val: kezi['6z'], id: 8}); // 发
            if (kezi['7z'] >= 1)
                ans.fans.push({val: kezi['7z'], id: 9}); // 中
            if (kezi[(seat - base_info.ju + base_info.player_cnt) % base_info.player_cnt + 1 + 'z'] >= 1)
                ans.fans.push({
                    val: kezi[(seat - base_info.ju + base_info.player_cnt) % base_info.player_cnt + 1 + 'z'],
                    id: 10
                }); // 自风
            if (kezi[base_info.chang + 1 + 'z'] >= 1)
                ans.fans.push({val: kezi[base_info.chang + 1 + 'z'], id: 11}); // 场风

            if (flag_duanyao && (!no_shiduan() || no_shiduan() && menqing))
                // 幻境传说: 机会卡4
                ans.fans.push({val: get_field_spell_mode(2) === 4 ? 3 : 1, id: 12}); // 断幺九

            if (beikou === 1 && menqing)
                ans.fans.push({val: 1, id: 13}); // 一杯口

            if (pinghu && menqing)
                ans.fans.push({val: 1, id: 14}); // 平和

            if (hunquandai && !chunquandai && !flag_hunlaotou)
                ans.fans.push({val: menqing ? 2 : 1, id: 15}); // 混全带幺九

            if (yiqi)
                ans.fans.push({val: menqing ? 2 : 1, id: 16}); // 一气通贯

            if (sanse)
                ans.fans.push({val: menqing ? 2 : 1, id: 17}); // 三色同顺

            if (sansetongke)
                ans.fans.push({val: 2, id: 19}); // 三色同刻

            if (gangzi_num === 3)
                ans.fans.push({val: 2, id: 20}); // 三杠子

            if (kezi_num === 4)
                ans.fans.push({val: 2, id: 21}); // 对对和

            if (anke_num === 3)
                ans.fans.push({val: 2, id: 22}); // 三暗刻

            if (xiaosanyuan)
                ans.fans.push({val: 2, id: 23}); // 小三元

            if (flag_hunlaotou && !flag_qinglaotou)
                ans.fans.push({val: 2, id: 24}); // 混老头

            if (duizi_num === 7)
                ans.fans.push({val: 2, id: 25}); // 七对子

            if ((is_guyi() || is_yifanjieguyi()) && wumenqi)
                ans.fans.push({val: 2, id: 54}); // 五门齐

            if ((is_guyi() || is_yifanjieguyi()) && sanlianke)
                ans.fans.push({val: 2, id: 55}); // 三连刻

            if (chunquandai)
                ans.fans.push({val: menqing ? 3 : 2, id: 26}); // 纯全带幺九

            if (hunyise && !qingyise)
                ans.fans.push({val: menqing ? 3 : 2, id: 27}); // 混一色

            if ((is_guyi() || is_yifanjieguyi()) && santongshun) {
                deleteFan(13); // 删除一杯口
                ans.fans.push({val: menqing ? 3 : 2, id: 56}); // 一色三同顺
            }

            if (beikou === 2 && menqing)
                ans.fans.push({val: 3, id: 28}); // 二杯口

            if (qingyise)
                ans.fans.push({val: menqing ? 6 : 5, id: 29}); // 清一色

            if (is_guyi()) {
                if (zimo && paishan.length === wangpai_num && base_info.lst_draw_type === 1 && simplify(lastile) === '1p') {
                    deleteFan(5); // 删除海底摸月
                    ans.fans.push({val: 5, id: 57}); // 一筒摸月
                }
                if (!zimo && paishan.length === wangpai_num && simplify(lastile) === '9p') {
                    deleteFan(6); // 删除河底捞鱼
                    ans.fans.push({val: 5, id: 58}); // 九筒捞鱼
                }
            }

            if (is_yifanjieguyi()) {
                let tuibudao = true;
                for (const tile of Constants.TILE_NO_AKA)
                    if (!judgeTile(tile, 'tuibudao') && cnt2[tile] >= 1) {
                        tuibudao = false;
                        break;
                    }

                let have_0m = false, have_0p = false, have_0s = false;
                for (const tile of tiles) {
                    if (tile.substring(0, 2) === '0m')
                        have_0m = true;
                    if (tile.substring(0, 2) === '0p')
                        have_0p = true;
                    if (tile.substring(0, 2) === '0s')
                        have_0s = true;
                }
                for (const f of fulu[seat])
                    for (const tile of f.tile) {
                        if (tile.substring(0, 2) === '0m')
                            have_0m = true;
                        if (tile.substring(0, 2) === '0p')
                            have_0p = true;
                        if (tile.substring(0, 2) === '0s')
                            have_0s = true;
                    }
                let chisanse = have_0m && have_0p && have_0s;

                let sansetongguan = false;
                for (let i = 0; i < 3; i++)
                    for (let j = (i + 1) % 3; j !== i; j = (j + 1) % 3) {
                        const k = 3 - i - j;
                        if (shunzi[3 * i + 2 + 'm'] >= 1 && shunzi[3 * j + 2 + 'p'] >= 1 && shunzi[3 * k + 2 + 's'] >= 1)
                            sansetongguan = true;
                    }

                if (tuibudao)
                    ans.fans.push({val: 1, id: 9700}); // 推不倒
                if (chisanse)
                    ans.fans.push({val: 2, id: 9701}); // 赤三色
                if (sansetongguan)
                    ans.fans.push({val: menqing ? 2 : 1, id: 9702}); // 三色通贯
            }


            if (calcSudian(ans) === -2000)
                return ans;

            // --------------------------------------------------
            // 悬赏番

            if (all_doras[0] > 0)
                // 幻境传说: 机会卡1
                if (!(get_field_spell_mode(2) === 1 && liqi_info[seat].liqi !== 0))
                    ans.fans.push({val: all_doras[0], id: 31}); // 宝牌
            if (all_doras[1] > 0)
                ans.fans.push({val: all_doras[1], id: 32}); // 红宝牌
            if (all_doras[2] > 0)
                ans.fans.push({val: all_doras[2], id: 34}); // 北宝牌
            if (liqi_info[seat].liqi !== 0) {
                let times = 1;
                // 幻境传说: 机会卡1
                if (get_field_spell_mode(2) === 1)
                    times = 2;
                ans.fans.push({val: all_doras[3] * times, id: 33}); // 里宝牌
            }

            if (is_hunzhiyiji())
                if (!zimo && hunzhiyiji_info[fangchong].liqi !== 0)
                    ans.fans.push({val: 2, id: 803}); // 过载

            if (is_yongchang()) {
                const moqie_bonus = yongchang_data[seat].moqie_bonus;
                const shouqie_bonus = yongchang_data[seat].shouqie_bonus;
                if (moqie_bonus !== 0)
                    ans.fans.push({val: moqie_bonus, id: 801}); // 绯
                if (shouqie_bonus !== 0)
                    ans.fans.push({val: shouqie_bonus, id: 802}); // 苍
            }
            // --------------------------------------------------
            // --------------------------------------------------
            // --------------------------------------------------
            if (duizi_num === 7) { // 七对子固定符数
                ans.fu = 25;
                return ans;
            }
            ans.fu = 20; // 符底
            if (!pinghu)
                ans.fu += tingpaifu; // 听牌型符
            for (const tile of Constants.TILE_NO_AKA) {
                // 刻子符(幺九/中张, 明刻明杠, 暗杠暗刻)
                if (Constants.YAOJIU_TILE.includes(tile)) {
                    ans.fu += type_cnt[tile][1] * 4;
                    ans.fu += type_cnt[tile][2] * 16;
                    ans.fu += type_cnt[tile][3] * 32;
                    ans.fu += type_cnt[tile][6] * 8;
                } else {
                    ans.fu += type_cnt[tile][1] * 2;
                    ans.fu += type_cnt[tile][2] * 8;
                    ans.fu += type_cnt[tile][3] * 16;
                    ans.fu += type_cnt[tile][6] * 4;
                }
                if (type_cnt[tile][7] === 1) {
                    // 雀头符, 雀头是自风, 场风, 三元
                    if (no_lianfengsifu()) {
                        if (tile === ((seat - base_info.ju + base_info.player_cnt) % base_info.player_cnt + 1 + 'z') || tile === base_info.chang + 1 + 'z')
                            ans.fu += 2;
                    } else {
                        if (tile === ((seat - base_info.ju + base_info.player_cnt) % base_info.player_cnt + 1 + 'z'))
                            ans.fu += 2;
                        if (tile === base_info.chang + 1 + 'z')
                            ans.fu += 2;
                    }
                    if (tile[1] === 'z' && parseInt(tile) >= 5 && parseInt(tile) <= 7)
                        ans.fu += 2;
                }
            }
            if (zimo && !pinghu)
                ans.fu += 2; // 自摸符
            if (!zimo && menqing)
                ans.fu += 10; // 门前清荣和符
            ans.fu = Math.ceil(ans.fu / 10) * 10;
            if (fulu_cnt !== 0 && ans.fu === 20)
                ans.fu = 30;
            // --------------------------------------------------
            return ans;
        }
    }
};

/**
 * calcFan 组 - 川麻
 *
 * 根据牌算番
 * @param seat - 和牌的 seat 号玩家
 * @param zimo - 是否是自摸
 * @param type - false 表示正常和牌, true 表示查大叫的情况
 */
export const calcFanChuanma = (seat: Seat, zimo: boolean, type: boolean = false): CalcFanRet => {
    // 更新返回值
    const updateRet = (x: CalcFanRet): void => {
        if (calcSudianChuanma(ret, 1) < calcSudianChuanma(x, 1))
            ret = x;
    };

    const tiles = player_tiles[seat];
    // 手牌少一张, 表示查大叫的情况
    if (tiles.length % 3 === 1 && type) {
        let ret: CalcFanRet = {fans: [] as FansType, fu: 0};
        const tingpais = calcTingpai(seat);
        for (const tingpai of tingpais) {
            tiles.push(tingpai.tile);
            const tmp: CalcFanRet = calcFanChuanma(seat, zimo, true);
            updateRet(tmp);
            tiles.pop();
        }
        return ret;
    }

    const lastile = tiles[tiles.length - 1];
    let fulu_cnt = 0;
    let ret: CalcFanRet = {fans: [] as FansType, fu: 0};
    if (huazhu(seat))
        return ret;
    const cnt: TileNum = {};
    for (const tile of Constants.TILE)
        cnt[tile] = 0;
    for (const tile of tiles)
        cnt[simplify(tile)]++;
    const partition: Partition = [];
    for (const f of fulu[seat]) {
        partition.push(f);
        fulu_cnt++;
    }

    dfs('1m');
    if (calcHupai(tiles) === 2) { // 七对子只有一种分解方式
        partition.splice(0, partition.length);
        for (const tile of Constants.TILE_NO_AKA)
            while (cnt[tile] > 0) {
                partition.push({type: 7, tile: [tile, tile]});
                cnt[tile] -= 2;
            }
        calc();
    }

    return ret;

    function dfs(tile: Tile) {
        if (tile === '0m') {
            if (partition.length === 5 || partition.length === 7)
                calc();
            return;
        }
        if (cnt[tile] === 0) {
            dfs(nextTile(tile));
            return;
        }
        const whatever = [0, 2, 3, 5, 6, 8, 9, 11, 12, 14];
        for (const num of whatever) {
            if (cnt[tile] < num)
                continue;
            cnt[tile] -= num;
            const cnt0 = cnt[tile];
            if (num % 3 === 2) { // 有对子
                const kezi_num = (num - 2) / 3;
                for (let j = 0; j < kezi_num; j++)
                    partition.push({type: 6, tile: [tile, tile, tile]});
                partition.push({type: 7, tile: [tile, tile]});
                dfs(tile);
            } else if (num % 3 === 0) // 3 的倍数, 全是当成刻子
                for (let j = 0; j < num / 3; j++)
                    partition.push({type: 6, tile: [tile, tile, tile]});

            if (cnt[Constants.NXT2[tile]] >= cnt0 && cnt[Constants.NXT2[Constants.NXT2[tile]]] >= cnt0) {
                cnt[tile] -= cnt0;
                cnt[Constants.NXT2[tile]] -= cnt0;
                cnt[Constants.NXT2[Constants.NXT2[tile]]] -= cnt0;
                for (let i = 0; i < cnt0; i++)
                    partition.push({
                        type: 5,
                        tile: [tile, Constants.NXT2[tile], Constants.NXT2[Constants.NXT2[tile]]],
                    });
                dfs(nextTile(tile));
                cnt[tile] += cnt0;
                cnt[Constants.NXT2[tile]] += cnt0;
                cnt[Constants.NXT2[Constants.NXT2[tile]]] += cnt0;
                for (let i = 0; i < cnt0; i++)
                    partition.pop();
            }
            for (let i = 0; i < Math.floor((num + 1) / 3); i++)
                partition.pop();
            cnt[tile] += num;
        }
    }

    // 算番
    function calc() {
        const cnt2: TileNum = {};
        for (const tile of Constants.TILE_NO_AKA)
            cnt2[tile] = 0;
        const partition_tmp = partition.slice();
        for (const p of partition_tmp) {
            const tls = p.tile;
            if (p.type === 0 || p.type === 5)
                for (let j = 0; j <= 2; j++)
                    cnt2[simplify(tls[j])]++;
            else if (p.type === 1 || p.type === 6)
                cnt2[simplify(tls[0])] += 3;
            else if (p.type === 2 || p.type === 3)
                cnt2[simplify(tls[0])] += 4;
            else if (p.type === 7)
                cnt2[simplify(tls[0])] += 2;
        }

        for (const p of partition_tmp) {
            const p_tiles = p.tile, type = p.type;
            if (type === 5 && (isEqualTile(p_tiles[0], lastile) || isEqualTile(p_tiles[1], lastile) || isEqualTile(p_tiles[2], lastile))) {
                if (!zimo)
                    p.type = 0;
                let mid_tile = shunziMidTile(p_tiles);
                if (isEqualTile(mid_tile, lastile))
                    updateRet(calc0(2)); // 坎张听符
                else if (parseInt(simplify(lastile)) === 3 && parseInt(mid_tile) === 2)
                    updateRet(calc0(2)); // 边张听符
                else if (parseInt(simplify(lastile)) === 7 && parseInt(mid_tile) === 8)
                    updateRet(calc0(2)); // 边张听符
                else
                    updateRet(calc0(0));
                p.type = 5;
            }
            if (type === 6 && isEqualTile(p_tiles[0], lastile)) {
                if (!zimo)
                    p.type = 1;
                updateRet(calc0(0));
                p.type = 6;
            }
            if (type === 7 && isEqualTile(p_tiles[0], lastile))
                updateRet(calc0(2)); // 单骑符
        }

        /**
         * 核心算法, 根据所有前置动作计算手牌有哪些番
         *
         * @param tingpaifu - 听牌符数, 这里没什么用
         */
        function calc0(tingpaifu: 0 | 2): { fans: FansType; fu: number; } {
            const ans = {fans: [] as number[], fu: 0};
            // 0: 明顺    1: 明刻   2: 明杠   3: 暗杠
            // 4: 北宝    5: 暗顺   6: 暗刻   7: 对子
            const type_cnt: TypeCnt = {};
            const kezi: TileNum = {}, gangzi: TileNum = {}, shunzi: TileNum = {};
            let kezi_num = 0, gangzi_num = 0, duizi_num = 0;
            for (const tile of Constants.TILE_NO_AKA) {
                type_cnt[tile] = [0, 0, 0, 0, 0, 0, 0, 0];
                kezi[tile] = gangzi[tile] = shunzi[tile] = 0;
            }
            for (const p of partition_tmp) {
                const p_type = p.type;
                switch (p_type) {
                    case 1:
                        kezi[simplify(p.tile[0])]++;
                        break;
                    case 2:
                        kezi[simplify(p.tile[0])]++;
                        gangzi[simplify(p.tile[0])]++;
                        break;
                    case 3:
                        kezi[simplify(p.tile[0])]++;
                        gangzi[simplify(p.tile[0])]++;
                        break;
                    case 6:
                        kezi[simplify(p.tile[0])]++;
                        break;
                    case 0:
                    case 5:
                        shunzi[shunziMidTile(p.tile)]++;
                        break;
                }
                if (p_type === 1 || p_type === 2 || p_type === 3 || p_type === 6 || p_type === 7)
                    type_cnt[simplify(p.tile[0])][p_type]++;
                if (p_type === 0 || p_type === 5)
                    type_cnt[shunziMidTile(p.tile)][p_type]++;
            }
            for (const tile of Constants.TILE_NO_AKA) {
                gangzi_num += gangzi[tile];
                kezi_num += kezi[tile];
            }
            const group = Constants.GROUP;
            if (partition_tmp.length === 7)
                duizi_num = 7;
            // --------------------------
            let quandai = true;
            for (let j = 0; j < 3; j++)
                for (let i = 1; i <= 9; i++) {
                    // 从顺子和(刻子, 雀头)的角度判断是否有全带, 先顺子后(刻子, 雀头)
                    if (i > 2 && i < 8 && shunzi[i + group[j]] >= 1)
                        quandai = false;
                    if (i > 1 && i < 9 && kezi[i + group[j]] + type_cnt[i + group[j]][7] >= 1)
                        quandai = false;
                }
            // --------------------------
            let qingyise: boolean;
            let qingyise_man = true, qingyise_pin = true, qingyise_sou = true;
            for (const tile of Constants.TILE_NO_AKA) {
                if (tile[1] !== 'm' && cnt2[tile] > 0)
                    qingyise_man = false;
                if (tile[1] !== 'p' && cnt2[tile] > 0)
                    qingyise_pin = false;
                if (tile[1] !== 's' && cnt2[tile] > 0)
                    qingyise_sou = false;
            }
            qingyise = qingyise_man || qingyise_pin || qingyise_sou;
            // ---------------------------
            let jiangdui = true;
            for (const tile of Constants.TILE_NO_AKA)
                if (!judgeTile(tile, 'jiangdui') && cnt2[tile] > 0)
                    jiangdui = false;
            // ---------------------------
            ans.fans[1000] = 0;
            ans.fans[1003] = 1;
            for (const tile of Constants.TILE_NO_AKA)
                ans.fans[1000] += Math.floor(cnt2[tile] / 4); // 根
            if (!type && zimo && getLstAction(2) !== undefined && (getLstAction(2).name === 'RecordAnGangAddGang' || getLstAction(2).name === 'RecordChiPengGang'))
                ans.fans[1001] = 1; // 杠上花
            if (!type && !zimo && getLstAction(3) !== undefined && (getLstAction(3).name === 'RecordAnGangAddGang' || getLstAction(3).name === 'RecordChiPengGang'))
                ans.fans[1002] = 1; // 杠上炮
            if (!type && getLstAction().name === 'RecordAnGangAddGang')
                ans.fans[1004] = 1; // 抢杠
            if (kezi_num === 4)
                ans.fans[1005] = 2; // 对对和
            if (qingyise)
                ans.fans[1006] = 3; // 清一色
            if (duizi_num === 7)
                ans.fans[1007] = 3; // 七对子
            if (quandai)
                ans.fans[1008] = 3; // 带幺九
            if (fulu_cnt === 4)
                ans.fans[1009] = 3; // 金钩钓
            if (qingyise && kezi_num === 4)
                ans.fans[1010] = 4; // 清对
            if (jiangdui && kezi_num === 4)
                ans.fans[1011] = 4; // 将对
            if (ans.fans[1000] > 0 && duizi_num === 7) {
                ans.fans[1012] = 4;
                ans.fans[1000]--;
            } // 龙七对
            if (qingyise && duizi_num === 7)
                ans.fans[1013] = 5; // 清七对
            if (qingyise && fulu_cnt === 4)
                ans.fans[1014] = 5; // 清金钩钓
            if (qingyise && ans.fans[1012] === 4)
                ans.fans[1015] = 6; // 清龙七对
            if (gangzi_num === 4) {
                ans.fans[1016] = 6;
                ans.fans[1000] -= 4;
            } // 十八罗汉
            if (qingyise && gangzi_num === 4)
                ans.fans[1017] = 6; // 清十八罗汉
            if (liqi_info[seat].yifa !== 0 && liqi_info[seat].liqi === 0 && zimo)
                if (seat === base_info.ju)
                    ans.fans[1018] = 6; // 天和
                else
                    ans.fans[1019] = 6; // 地和
            if (qingyise && quandai)
                ans.fans[1020] = 5; // 清幺九
            if (!type && paishan.length === 0)
                ans.fans[1021] = 1; // 海底捞月

            if (duizi_num === 7) { // 七对子固定符数
                ans.fu = 25;
                return ans2Fan(ans);
            }
            ans.fu = 20; // 符底
            ans.fu += tingpaifu; // 听牌型符
            for (const tile of Constants.TILE_NO_AKA) {
                // 刻子符(幺九/中张, 明刻明杠, 暗杠暗刻)
                if (Constants.YAOJIU_TILE.includes(tile)) {
                    ans.fu += type_cnt[tile][1] * 4;
                    ans.fu += type_cnt[tile][2] * 16;
                    ans.fu += type_cnt[tile][3] * 32;
                    ans.fu += type_cnt[tile][6] * 8;
                } else {
                    ans.fu += type_cnt[tile][1] * 2;
                    ans.fu += type_cnt[tile][2] * 8;
                    ans.fu += type_cnt[tile][3] * 16;
                    ans.fu += type_cnt[tile][6] * 4;
                }
            }
            if (zimo)
                ans.fu += 2; // 自摸符
            if (!zimo && fulu_cnt === 0)
                ans.fu += 10; // 门前清荣和符
            ans.fu = Math.ceil(ans.fu / 10) * 10;
            if (fulu_cnt !== 0 && ans.fu === 20)
                ans.fu = 30;

            return ans2Fan(ans);
        }

        // 根据初步算得的番列表, 确定要实际显示哪些番
        function ans2Fan(x: { fans: number[], fu: number }): CalcFanRet {
            const ans: CalcFanRet = {fans: [], fu: x.fu};
            for (let i = 1019; i >= 1005; i--) {
                if (i === 1014 && x.fans[1020] >= 1) { // 这里 1014 可以换成 1013, 1012
                    ans.fans.push({val: x.fans[1020], id: 1020});
                    break;
                }
                if (x.fans[i] >= 1) {
                    ans.fans.push({val: x.fans[i], id: i});
                    break;
                }
                if (i === 1005 && ans.fans.length === 0)
                    ans.fans.push({val: x.fans[1003], id: 1003});
            }
            if (x.fans[1000] >= 1)
                ans.fans.push({val: x.fans[1000], id: 1000});
            if (x.fans[1001] >= 1)
                ans.fans.push({val: x.fans[1001], id: 1001});
            if (x.fans[1002] >= 1)
                ans.fans.push({val: x.fans[1002], id: 1002});
            if (x.fans[1004] >= 1)
                ans.fans.push({val: x.fans[1004], id: 1004});
            if (x.fans[1021] >= 1)
                ans.fans.push({val: x.fans[1021], id: 1021});
            return ans;
        }
    }
};

/**
 * calcFan 组 - 国标
 *
 * 根据牌算番
 * @param seat - 和牌的 seat 号玩家
 * @param zimo - 是否是自摸
 */
export const calcFanGuobiao = (seat: Seat, zimo: boolean): CalcFanRet => {
    // 更新返回值
    const updateRet = (x: CalcFanRet): void => {
        if (calcSudianGuobiao(ret) < calcSudianGuobiao(x))
            ret = x;
    };

    const tiles = player_tiles[seat];
    const lastile = tiles[tiles.length - 1];
    let fulu_cnt = 0;
    let ret: CalcFanRet = {fans: [], fu: 0};
    const cnt: TileNum = {};
    for (const tile of Constants.TILE)
        cnt[tile] = 0;
    for (const tile of tiles)
        cnt[simplify(tile)]++;

    const partition: Partition = [];
    for (const f of fulu[seat])
        if (f.type !== 4) {
            if (f.type !== 3)
                fulu_cnt++;
            partition.push(f);
        }

    dfs('1m');

    const result = calcHupai(tiles);
    if (result === 3) {
        const ans: CalcFanRet = {fans: [], fu: 25};
        ans.fans.push({val: 88, id: 8006}); // 十三幺
        specialCalc(ans);
        updateRet(ans);
    }
    if (result === 4 || result === 5) { // 一定是全不靠或七星不靠
        let qixingbukao = true;
        for (const tile of Constants.HONOR_TILE)
            if (cnt[tile] === 0)
                qixingbukao = false;

        const ans: CalcFanRet = {fans: [], fu: 25};
        if (qixingbukao)
            ans.fans.push({val: 24, id: 8019}); // 七星不靠
        else if (result === 5) { // 有组合龙
            ans.fans.push({val: 12, id: 8033}); // 全不靠
            ans.fans.push({val: 12, id: 8034}); // 组合龙
        } else
            ans.fans.push({val: 12, id: 8033}); // 全不靠
        specialCalc(ans);
        updateRet(ans);
    }
    if (result >= 6 && result <= 11) { // 没有全不靠的组合龙
        const row = result - 6;
        const condition = Constants.GB_CONDITIONS;
        for (let i = 0; i < 3; i++) {
            const new_shunzi = [condition[row][3 * i], condition[row][3 * i + 1], condition[row][3 * i + 2]];
            partition.push({type: 8, tile: new_shunzi});
        }
        for (const i in condition[row]) {
            tiles.splice(tiles.indexOf(condition[row][i]), 1);
            cnt[condition[row][i]]--;
        }

        dfs('1m');

        for (const i in condition[row]) {
            tiles.push(condition[row][i]);
            cnt[condition[row][i]]++;
        }
        tiles.sort(cmp);

        ret.fans.push({val: 12, id: 8034}); // 组合龙
        ret.fu = 25;
    }
    return ret;

    // 深度优先搜索, 对手牌和副露进行划分, 搜索到尽头划分数量达到5或7时, 开始算番
    function dfs(tile: Tile) {
        if (tile === '0m') {
            if (partition.length === 5 || partition.length === 7)
                calc();
            return;
        }
        if (cnt[tile] === 0) {
            dfs(nextTile(tile));
            return;
        }
        const whatever = [0, 2, 3, 5, 6, 8, 9, 11, 12, 14];
        for (const num of whatever) {
            if (cnt[tile] < num)
                continue;
            cnt[tile] -= num;
            const cnt0 = cnt[tile];
            if (num % 3 === 2) { // 有对子
                const kezi_num = (num - 2) / 3;
                for (let j = 0; j < kezi_num; j++)
                    partition.push({type: 6, tile: [tile, tile, tile]});
                partition.push({type: 7, tile: [tile, tile]});
                dfs(tile);
            } else if (num % 3 === 0) // 3 的倍数, 全是当成刻子
                for (let j = 0; j < num / 3; j++)
                    partition.push({type: 6, tile: [tile, tile, tile]});

            if (cnt[Constants.NXT2[tile]] >= cnt0 && cnt[Constants.NXT2[Constants.NXT2[tile]]] >= cnt0) {
                cnt[tile] -= cnt0;
                cnt[Constants.NXT2[tile]] -= cnt0;
                cnt[Constants.NXT2[Constants.NXT2[tile]]] -= cnt0;
                for (let i = 0; i < cnt0; i++)
                    partition.push({
                        type: 5,
                        tile: [tile, Constants.NXT2[tile], Constants.NXT2[Constants.NXT2[tile]]],
                    });
                dfs(nextTile(tile));
                cnt[tile] += cnt0;
                cnt[Constants.NXT2[tile]] += cnt0;
                cnt[Constants.NXT2[Constants.NXT2[tile]]] += cnt0;
                for (let i = 0; i < cnt0; i++)
                    partition.pop();
            }
            for (let i = 0; i < Math.floor((num + 1) / 3); i++)
                partition.pop();
            cnt[tile] += num;
        }
    }

    // 算番
    function calc() {
        const cnt2: TileNum = {};
        for (const tile of Constants.TILE_NO_AKA)
            cnt2[tile] = 0;
        const partition_tmp = partition.slice();
        for (const p of partition_tmp) {
            const tls = p.tile;
            if (p.type === 0 || p.type === 5 || p.type === 8) // 新增 8 分类, 用于组合龙
                for (let j = 0; j <= 2; j++)
                    cnt2[simplify(tls[j])]++;
            else if (p.type === 1 || p.type === 6)
                cnt2[simplify(tls[0])] += 3;
            else if (p.type === 2 || p.type === 3)
                cnt2[simplify(tls[0])] += 4;
            else if (p.type === 7)
                cnt2[simplify(tls[0])] += 2;
        }

        for (const p of partition_tmp) {
            const p_tiles = p.tile, type = p.type;
            if (type === 5 && (isEqualTile(p_tiles[0], lastile) || isEqualTile(p_tiles[1], lastile) || isEqualTile(p_tiles[2], lastile))) {
                if (!zimo)
                    p.type = 0;
                const mid_tile = shunziMidTile(p_tiles);
                if (isEqualTile(mid_tile, lastile))
                    updateRet(calc0(2)); // 坎张听符
                else if (parseInt(simplify(lastile)) === 3 && parseInt(mid_tile) === 2)
                    updateRet(calc0(2)); // 边张听符
                else if (parseInt(simplify(lastile)) === 7 && parseInt(mid_tile) === 8)
                    updateRet(calc0(2)); // 边张听符
                else
                    updateRet(calc0(0));
                p.type = 5;
            }
            if (type === 6 && isEqualTile(p_tiles[0], lastile)) {
                if (!zimo)
                    p.type = 1;
                updateRet(calc0(0));
                p.type = 6;
            }
            if (type === 7 && isEqualTile(p_tiles[0], lastile))
                updateRet(calc0(2)); // 单骑符
            if (type === 8)
                updateRet(calc0(0)); // 组合龙
        }

        /**
         * 核心算法, 根据所有前置动作计算手牌有哪些番
         *
         * @param tingpaifu - 听牌符数, 这里没什么用
         */
        function calc0(tingpaifu: 0 | 2): CalcFanRet {
            /**
             * ban 掉 ids 中 id 的番
             */
            const banFan = (ids: number | number[]): void => {
                if (typeof ids == 'number')
                    ids = [ids] as number[];
                for (const id of ids)
                    ban_num[id - 8000] = true;
            };

            /**
             * id 番是否已被 ban
             */
            const isBanned = (id: number): boolean => {
                return ban_num[id - 8000];
            };

            const menqing = fulu_cnt === 0;
            // 不计列表
            const ban_num: boolean[] = [];
            for (let i = 0; i < 100; i++)
                ban_num[i] = false;
            // 指定数量的不计幺九刻计数
            let ban_yaojiuke_num = 0;

            const ans: CalcFanRet = {fans: [], fu: 0};
            // 0: 明顺    1: 明刻   2: 明杠   3: 暗杠
            // 4: 北宝    5: 暗顺   6: 暗刻   7: 对子
            const type_cnt: TypeCnt = {};
            // 刻子, 杠子, 暗刻, 顺子
            const kezi: TileNum = {}, gangzi: TileNum = {}, anke: TileNum = {}, shunzi: TileNum = {};
            let kezi_num = 0, gangzi_num = 0, anke_num = 0, duizi_num = 0;
            let minggang_num = 0, angang_num = 0;

            for (const tile of Constants.TILE_NO_AKA) {
                type_cnt[tile] = [0, 0, 0, 0, 0, 0, 0, 0];
                anke[tile] = gangzi[tile] = kezi[tile] = shunzi[tile] = 0;
            }
            for (const p of partition_tmp) {
                const type = p.type;
                switch (type) {
                    case 1:
                        kezi[simplify(p.tile[0])]++;
                        break;
                    case 2:
                        kezi[simplify(p.tile[0])]++;
                        gangzi[simplify(p.tile[0])]++;
                        break;
                    case 3:
                        kezi[simplify(p.tile[0])]++;
                        gangzi[simplify(p.tile[0])]++;
                        anke[simplify(p.tile[0])]++;
                        break;
                    case 6:
                        kezi[simplify(p.tile[0])]++;
                        anke[simplify(p.tile[0])]++;
                        break;
                    case 0:
                    case 5:
                        shunzi[shunziMidTile(p.tile)]++;
                        break;
                    case 8:
                        banFan(8042); // 有类型8, 则是在组合龙内, ban 无番和
                        break;
                }
                if (type === 1 || type === 2 || type === 3 || type === 6 || type === 7)
                    type_cnt[simplify(p.tile[0])][type]++;
                if (type === 0 || type === 5)
                    type_cnt[shunziMidTile(p.tile)][type]++;
            }
            let beikou = 0, santongshun = false;
            for (const tile of Constants.TILE_NO_AKA) {
                anke_num += anke[tile];
                gangzi_num += gangzi[tile];
                kezi_num += kezi[tile];
                duizi_num += type_cnt[tile][7];
                minggang_num += type_cnt[tile][2];
                angang_num += type_cnt[tile][3];

                // 这里的杯口数量算上副露的, 最后在判断是否有效
                beikou += Math.floor(shunzi[tile] / 2);

                if (shunzi[tile] === 3)
                    santongshun = true;
            }

            const group = Constants.GROUP;
            if (partition_tmp.length === 7)
                duizi_num = 7;
            // --------------------------
            // --------------------------
            // --------------------------
            let flag_ziyise = true, flag_lvyise = true, flag_qinglaotou = true, flag_duanyao = true,
                flag_hunlaotou = true;
            for (const tile of Constants.TILE_NO_AKA)
                if (cnt2[tile] > 0) {
                    if (!Constants.HONOR_TILE.includes(tile))
                        flag_ziyise = false; // 字一色
                    if (!Constants.TERMINAL_TILE.includes(tile))
                        flag_qinglaotou = false; // 清老头
                    if (Constants.YAOJIU_TILE.includes(tile))
                        flag_duanyao = false; // 断幺九
                    if (!Constants.YAOJIU_TILE.includes(tile))
                        flag_hunlaotou = false; // 混老头
                    if (!judgeTile(tile, 'L'))
                        flag_lvyise = false; // 绿一色
                }
            // ---------------------------------
            let wumenqi = true;
            for (let i = 0; i < 5; i++) {
                const wumen_lows = ['1m', '1p', '1s', '1z', '5z'],
                    wumen_highs = ['9m', '9p', '9s', '4z', '7z'];
                let flag = false;
                for (let j = parseInt(wumen_lows[i]); j <= parseInt(wumen_highs[i]); j++)
                    flag ||= cnt2[j + wumen_lows[i][1]] > 0;
                if (!flag)
                    wumenqi = false;
            }
            // ---------------------------------
            let jiulian = false, yiqi = false, hunyise: boolean, qingyise: boolean;
            const jlbd = [0, 3, 1, 1, 1, 1, 1, 1, 1, 3];
            for (let k = 0; k < 3; k++) {
                if (shunzi['2' + group[k]] >= 1 && shunzi['5' + group[k]] >= 1 && shunzi['8' + group[k]] >= 1)
                    yiqi = true;

                jiulian = true;
                for (let i = 1; i <= 9; i++)
                    if (cnt2[i + group[k]] < jlbd[i]) // 手牌中各种牌数量不满足
                        jiulian = false;
                    else if (cnt2[i + group[k]] > jlbd[i] && simplify(lastile) !== i + group[k]) // 多出来的牌不是 lastile
                        jiulian = false;
                if (jiulian)
                    break;
            }
            if (gangzi_num >= 1) // 九莲不允许有杠子
                jiulian = false;
            // --------------------------
            let hunyise_man = true, hunyise_pin = true, hunyise_sou = true;
            let qingyise_man = true, qingyise_pin = true, qingyise_sou = true;
            for (const tile of Constants.TILE_NO_AKA) {
                if (tile[1] !== 'm' && cnt2[tile] > 0) {
                    if (tile[1] !== 'z')
                        hunyise_man = false;
                    qingyise_man = false;
                }
                if (tile[1] !== 'p' && cnt2[tile] > 0) {
                    if (tile[1] !== 'z')
                        hunyise_pin = false;
                    qingyise_pin = false;
                }
                if (tile[1] !== 's' && cnt2[tile] > 0) {
                    if (tile[1] !== 'z')
                        hunyise_sou = false;
                    qingyise_sou = false;
                }
            }
            hunyise = hunyise_man || hunyise_pin || hunyise_sou;
            qingyise = qingyise_man || qingyise_pin || qingyise_sou;
            // --------------------------
            let santongke = false, shuangtongke = false;
            for (let i = 1; i <= 9; i++) {
                if (kezi[i + 'm'] >= 1 && kezi[i + 'p'] >= 1 && kezi[i + 's'] >= 1)
                    santongke = true;
                else if (kezi[i + 'm'] >= 1 && kezi[i + 'p'] >= 1 || kezi[i + 'm'] >= 1 && kezi[i + 's'] >= 1 || kezi[i + 'p'] >= 1 && kezi[i + 's'] >= 1)
                    shuangtongke = true;
            }
            // --------------------------
            let xiaosanyuan = false, dasanyuan = false, xiaosixi = false, dasixi = false;

            for (let i = 0; i < 3; i++)
                if (type_cnt[5 + i + 'z'][7] === 1 && kezi[5 + (i + 1) % 3 + 'z'] >= 1 && kezi[5 + (i + 2) % 3 + 'z'] >= 1)
                    xiaosanyuan = true;

            if (kezi['5z'] >= 1 && kezi['6z'] >= 1 && kezi['7z'] >= 1)
                dasanyuan = true;

            for (let i = 0; i < 4; i++)
                if (type_cnt[1 + i + 'z'][7] === 1 && kezi[1 + (i + 1) % 4 + 'z'] >= 1 && kezi[1 + (i + 2) % 4 + 'z'] >= 1 && kezi[1 + (i + 3) % 4 + 'z'] >= 1)
                    xiaosixi = true;

            if (kezi['1z'] >= 1 && kezi['2z'] >= 1 && kezi['3z'] >= 1 && kezi['4z'] >= 1)
                dasixi = true;
            // --------------------------
            let hunquandai = true;
            for (let j = 0; j < 3; j++)
                for (let i = 1; i <= 9; i++) {
                    // 从顺子和(刻子, 雀头)的角度判断是否有全带, 先顺子后(刻子, 雀头)
                    if (i > 2 && i < 8 && shunzi[i + group[j]] >= 1)
                        hunquandai = false;
                    if (i > 1 && i < 9 && kezi[i + group[j]] + type_cnt[i + group[j]][7] >= 1)
                        hunquandai = false;
                }
            // --------------------------
            let pinghu = true;
            if (duizi_num === 7)
                pinghu = false;
            for (const tile of Constants.TILE_NO_AKA)
                if (kezi[tile] >= 1 || Constants.HONOR_TILE.includes(tile) && type_cnt[tile][7] >= 1) { // 有刻子或雀头是字牌
                    pinghu = false;
                    break;
                }
            // --------------------------
            let sansetongshun = false, ersetongshun_num = 0;
            for (let i = 2; i <= 8; i++) {
                if (shunzi[i + 'm'] >= 1 && shunzi[i + 'p'] >= 1 && shunzi[i + 's'] >= 1)
                    sansetongshun = true;

                for (let j = 0; j < 3; j++)
                    for (let k = j + 1; k < 3; k++)
                        if (shunzi[i + group[j]] >= 1 && shunzi[i + group[k]] >= 1) {
                            ersetongshun_num += shunzi[i + group[j]] >= 2 && shunzi[i + group[k]] >= 2 ? 2 : 1;
                            break;
                        }
            }
            // ---------------------------
            // ---------------------------
            // ---------------------------
            if (angang_num === 1 && gangzi_num === 2)
                ans.fans.push({val: 5, id: 8082}); // 明暗杠
            // --------------------------
            // 天地人和
            if (liqi_info[seat].yifa !== 0 && liqi_info[seat].liqi === 0 && seat === base_info.ju && zimo) {
                ans.fans.push({val: 8, id: 8083}); // 天和
                // 不计 不求人, 自摸, 边张, 坎张, 单钓将
                banFan([8055, 8081, 8078, 8079, 8080]);
            }

            let first_tile = true;
            for (let i = 0; i < base_info.player_cnt; i++) {
                if (i === base_info.ju)
                    continue;
                if (!(liqi_info[i].yifa !== 0 && liqi_info[i].liqi === 0))
                    first_tile = false;
            }
            if (first_tile && seat !== base_info.ju && !zimo) {
                ans.fans.push({val: 8, id: 8084}); // 地和
                // 不计 门前清
                banFan(8063);
            }

            // 在立直麻将中人和的基础上添加亲家的下一家没有一发(因为国标没有立直, 所以任何情况下切牌后都没有一发)
            if (liqi_info[seat].yifa !== 0 && liqi_info[seat].liqi === 0 && seat !== base_info.ju) {
                if (zimo) {
                    ans.fans.push({val: 8, id: 8085}); // 人和
                    // 不计 不求人, 自摸
                    banFan([8055, 8081]);
                } else if (liqi_info[(base_info.ju + 1) % base_info.player_cnt].yifa === 0) {
                    ans.fans.push({val: 8, id: 8085}); // 人和
                    // 不计 门前清
                    banFan(8063);
                }
            }
            // --------------------------
            // --------------------------
            // --------------------------
            // 88 番, 十三幺不在 calc 函数中, 另算
            if (dasixi && !isBanned(8000)) {
                ans.fans.push({val: 88, id: 8000}); // 大四喜
                // 不计 三风刻, 碰碰和, 圈风刻, 门风刻, 幺九刻
                banFan([8037, 8047, 8061, 8062, 8074]);
            }
            if (dasanyuan && !isBanned(8001)) {
                ans.fans.push({val: 88, id: 8001}); // 大三元
                // 不计 双箭刻, 箭刻, 组成大三元的三副刻子不计幺九刻
                banFan([8053, 8058, 8059, 8060]);
                ban_yaojiuke_num += 3;
            }
            if (flag_lvyise && !isBanned(8002)) {
                ans.fans.push({val: 88, id: 8002}); // 绿一色
                // 不计 混一色
                banFan(8048);
            }
            // 国标中的九莲对标立直麻将中的纯九
            if (jiulian && !isBanned(8003)) {
                ans.fans.push({val: 88, id: 8003}); // 九莲宝灯
                // 不计 清一色, 不求人, 门前清, 无字, 一个幺九刻
                banFan([8021, 8055, 8063, 8077]);
                ban_yaojiuke_num++;
            }
            if (gangzi_num === 4 && !isBanned(8004)) {
                ans.fans.push({val: 88, id: 8004}); // 四杠
                // 不计 碰碰和, 单钓将
                banFan([8047, 8080]);
            }

            let lianqidui = false;
            for (let i = 0; i <= 2; i++)
                if (type_cnt[3 + group[i]][7] >= 1 && type_cnt[4 + group[i]][7] >= 1 && type_cnt[5 + group[i]][7] >= 1 && type_cnt[6 + group[i]][7] >= 1 && type_cnt[7 + group[i]][7] >= 1) {
                    if (type_cnt[1 + group[i]][7] >= 1 && type_cnt[2 + group[i]][7] >= 1)
                        lianqidui = true;
                    if (type_cnt[2 + group[i]][7] >= 1 && type_cnt[8 + group[i]][7] >= 1)
                        lianqidui = true;
                    if (type_cnt[8 + group[i]][7] >= 1 && type_cnt[9 + group[i]][7] >= 1)
                        lianqidui = true;
                    break;
                }
            if (lianqidui && !isBanned(8005)) {
                ans.fans.push({val: 88, id: 8005}); // 连七对
                // 不计 清一色, 七对, 不求人, 门前清, 无字, 单钓将
                banFan([8021, 8018, 8055, 8063, 8077, 8080]);
            }
            // ---------------------------
            // 64 番
            if (flag_qinglaotou && !isBanned(8007)) {
                ans.fans.push({val: 64, id: 8007}); // 清幺九
                // 不计 混幺九, 碰碰和, 全带幺, 双同刻, 幺九刻, 无字
                banFan([8017, 8047, 8054, 8066, 8074, 8077]);
            }
            if (xiaosixi && !isBanned(8008)) {
                ans.fans.push({val: 64, id: 8008}); // 小四喜
                // 不计 三风刻, 幺九刻
                banFan([8037, 8074]);
            }
            if (xiaosanyuan && !isBanned(8009)) {
                ans.fans.push({val: 64, id: 8009}); // 小三元
                // 不计 箭刻, 双箭刻, 组成小三元的两副刻子不计幺九刻
                banFan([8058, 8059, 8060, 8053]);
                ban_yaojiuke_num += 2;
            }
            if (flag_ziyise && !isBanned(8010)) {
                ans.fans.push({val: 64, id: 8010}); // 字一色
                // 不计 混幺九, 碰碰和, 全带幺, 幺九刻
                // 此外删除判断漏洞的混一色
                banFan([8017, 8047, 8054, 8074, 8048]);
            }
            if (anke_num === 4 && !isBanned(8011)) {
                ans.fans.push({val: 64, id: 8011}); // 四暗刻
                // 不计 碰碰和, 不求人, 门前清
                banFan([8047, 8055, 8063]);
            }

            let yiseshuanglonghui = false;
            for (let i = 0; i <= 2; i++)
                if (shunzi[2 + group[i]] >= 2 && shunzi[8 + group[i]] >= 2 && type_cnt[5 + group[i]][7] >= 1)
                    yiseshuanglonghui = true;

            if (yiseshuanglonghui && !isBanned(8012)) {
                ans.fans.push({val: 64, id: 8012}); // 一色双龙会
                // 不计 七对, 清一色, 平和, 一般高, 老少副, 无字
                banFan([8018, 8021, 8064, 8070, 8073, 8077]);
            }
            // ---------------------------
            // 48 番
            let sitongshun = false, sijiegao = false;
            for (let i = 0; i <= 2; i++)
                for (let j = 1; j <= 9; j++) {
                    if (j !== 1 && j !== 9 && shunzi[j + group[i]] >= 4)
                        sitongshun = true;
                    if (j <= 6 && kezi[j + group[i]] >= 1 && kezi[j + 1 + group[i]] >= 1 && kezi[j + 2 + group[i]] >= 1 && kezi[j + 3 + group[i]] >= 1)
                        sijiegao = true;
                }
            if (sitongshun && !isBanned(8013)) {
                ans.fans.push({val: 48, id: 8013}); // 一色四同顺
                // 不计 一色三同顺, 一色三节高, 七对, 四归一, 一般高
                banFan([8022, 8023, 8018, 8065, 8070]);
            }
            if (sijiegao && !isBanned(8014)) {
                ans.fans.push({val: 48, id: 8014}); // 一色四节高
                // 不计 一色三同顺, 一色三节高, 碰碰和
                banFan([8022, 8023, 8047]);
            }
            // ---------------------------
            // 32 番
            let sibugao = false;
            for (let i = 0; i <= 2; i++) {
                for (let j = 2; j <= 5; j++)
                    if (shunzi[j + group[i]] >= 1 && shunzi[j + 1 + group[i]] >= 1 && shunzi[j + 2 + group[i]] >= 1 && shunzi[j + 3 + group[i]] >= 1)
                        sibugao = true;

                if (shunzi[2 + group[i]] >= 1 && shunzi[4 + group[i]] >= 1 && shunzi[6 + group[i]] >= 1 && shunzi[8 + group[i]] >= 1)
                    sibugao = true;
            }
            if (sibugao && !isBanned(8015)) {
                ans.fans.push({val: 32, id: 8015}); // 一色四步高
                // 不计 一色三步高, 连六, 老少副
                banFan([8029, 8072, 8073]);
            }
            if (gangzi_num === 3)
                ans.fans.push({val: 32, id: 8016}); // 三杠
            if (flag_hunlaotou && !flag_qinglaotou && !isBanned(8017)) {
                ans.fans.push({val: 32, id: 8017}); // 混幺九
                // 不计 碰碰和, 全带幺, 幺九刻
                banFan([8047, 8054, 8074]);
            }
            // ---------------------------
            // 24 番
            // 七星不靠不在 calc 函数中, 另算
            if (duizi_num === 7 && !isBanned(8018)) {
                ans.fans.push({val: 24, id: 8018}); // 七对
                // 不计 不求人, 门前清, 单钓将
                banFan([8055, 8063, 8080]);
            }
            let quanshuangke = true;
            for (const tile of Constants.TILE_NO_AKA)
                if (!judgeTile(tile, 'quanshuang') && cnt2[tile] >= 1)
                    quanshuangke = false;
            if (duizi_num >= 2) // 不能是七对
                quanshuangke = false;
            if (quanshuangke && !isBanned(8020)) {
                ans.fans.push({val: 24, id: 8020}); // 全双刻
                // 不计 碰碰和, 断幺, 无字
                banFan([8047, 8069, 8077]);
            }
            if (qingyise && !isBanned(8021)) {
                ans.fans.push({val: 24, id: 8021}); // 清一色
                // 不计 无字
                banFan(8077);
            }

            if (santongshun && !isBanned(8022)) {
                ans.fans.push({val: 24, id: 8022}); // 一色三同顺
                // 不计 一色三节高, 一般高
                banFan([8023, 8070]);
            }

            let yisesanjiegao = false;
            for (let j = 0; j <= 2; j++)
                for (let i = 1; i <= 7; i++)
                    if (kezi[i + group[j]] >= 1 && kezi[i + 1 + group[j]] >= 1 && kezi[i + 2 + group[j]] >= 1)
                        yisesanjiegao = true;
            if (yisesanjiegao && !isBanned(8023)) {
                ans.fans.push({val: 24, id: 8023}); // 一色三节高
                // 不计一色三同顺
                banFan(8022);
            }

            let quanda = true, quanzhong = true, quanxiao = true;
            for (const tile of Constants.TILE_NO_AKA) {
                if (!judgeTile(tile, 'quanda') && cnt2[tile] >= 1)
                    quanda = false;
                if (!judgeTile(tile, 'quanzhong') && cnt2[tile] >= 1)
                    quanzhong = false;
                if (!judgeTile(tile, 'quanxiao') && cnt2[tile] >= 1)
                    quanxiao = false;
            }

            if (quanda && !isBanned(8024)) {
                ans.fans.push({val: 24, id: 8024}); // 全大
                // 不计 大于五, 无字
                banFan([8035, 8077]);
            }
            if (quanzhong && !isBanned(8025)) {
                ans.fans.push({val: 24, id: 8025}); // 全中
                // 不计 断幺, 无字
                banFan([8069, 8077]);
            }
            if (quanxiao && !isBanned(8026)) {
                ans.fans.push({val: 24, id: 8026}); // 全小
                // 不计 小于五, 无字
                banFan([8036, 8077]);
            }
            // ---------------------------
            // 16 番
            if (yiqi && !isBanned(8027)) {
                ans.fans.push({val: 16, id: 8027}); // 清龙
                // 不计 连六, 老少副
                banFan([8072, 8073]);
            }
            let sanseshuanglonghui = false;
            for (let i = 0; i < 3; i++)
                if (shunzi[2 + group[(i + 1) % 3]] >= 1 && shunzi[8 + group[(i + 1) % 3]] >= 1)
                    if (shunzi[2 + group[(i + 2) % 3]] >= 1 && shunzi[8 + group[(i + 2) % 3]] >= 1)
                        if (type_cnt[5 + group[i]][7] >= 1)
                            sanseshuanglonghui = true;
            if (sanseshuanglonghui && !isBanned(8028)) {
                ans.fans.push({val: 16, id: 8028}); // 三色双龙会
                // 不计 喜相逢, 老少副, 无字, 平和
                banFan([8071, 8073, 8077, 8064]);
            }
            let yisesanbugao = false;
            for (let j = 0; j <= 2; j++) {
                for (let i = 2; i <= 6; i++)
                    if (shunzi[i + group[j]] >= 1 && shunzi[i + 1 + group[j]] >= 1 && shunzi[i + 2 + group[j]] >= 1)
                        yisesanbugao = true;
                for (let i = 0; i <= 2; i++)
                    if (shunzi[i + 2 + group[j]] >= 1 && shunzi[i + 4 + group[j]] >= 1 && shunzi[i + 6 + group[j]] >= 1)
                        yisesanbugao = true;
            }
            if (yisesanbugao && !isBanned(8029))
                ans.fans.push({val: 16, id: 8029}); // 一色三步高
            let quandaiwu = true;
            for (const tile of Constants.TILE_NO_AKA) {
                if (!(parseInt(tile) >= 4 && parseInt(tile) <= 6) && shunzi[tile] >= 1)
                    quandaiwu = false;
                if (tile !== '5m' && tile !== '5p' && tile !== '5s')
                    if (kezi[tile] >= 1 || type_cnt[tile][7] >= 1)
                        quandaiwu = false;
            }
            if (quandaiwu && !isBanned(8030)) {
                ans.fans.push({val: 16, id: 8030}); // 全带五
                // 不计 断幺, 无字
                banFan([8069, 8077]);
            }

            if (santongke && !isBanned(8031)) {
                ans.fans.push({val: 16, id: 8031}); // 三同刻
                // 不计 双同刻
                banFan(8066);
            }
            if (anke_num === 3 && !isBanned(8032))
                ans.fans.push({val: 16, id: 8032}); // 三暗刻
            // ---------------------------
            // 12 番
            // 全不靠和组合龙不在 calc 函数中, 另算
            let dayuwu = true, xiaoyuwu = true;
            for (const tile of Constants.TILE_NO_AKA) {
                if (!judgeTile(tile, 'dayuwu') && cnt2[tile] >= 1)
                    dayuwu = false;
                if (!judgeTile(tile, 'xiaoyuwu') && cnt2[tile] >= 1)
                    xiaoyuwu = false;
            }
            if (dayuwu && !isBanned(8035)) {
                ans.fans.push({val: 12, id: 8035}); // 大于五
                // 不计 无字
                banFan(8077);
            }
            if (xiaoyuwu && !isBanned(8036)) {
                ans.fans.push({val: 12, id: 8036}); // 小于五
                // 不计 无字
                banFan(8077);
            }
            let sanfengke = false;
            for (let i = 0; i < 4; i++)
                if (kezi[1 + i + 'z'] >= 1 && kezi[1 + (i + 1) % 4 + 'z'] >= 1 && kezi[1 + (i + 2) % 4 + 'z'] >= 1)
                    sanfengke = true;
            if (sanfengke && !xiaosixi && !isBanned(8037)) {
                ans.fans.push({val: 12, id: 8037}); // 三风刻
                // 组成三风刻的三副刻子不计幺九刻
                ban_yaojiuke_num += 3;
            }
            // ---------------------------
            // 8 番, 无番和放到最后
            let hualong = false;
            for (let i = 0; i < 3; i++)
                for (let j = (i + 1) % 3; j !== i; j = (j + 1) % 3) {
                    const k = 3 - i - j;
                    if (shunzi[3 * i + 2 + 'm'] >= 1 && shunzi[3 * j + 2 + 'p'] >= 1 && shunzi[3 * k + 2 + 's'] >= 1)
                        hualong = true;
                }
            if (hualong && !isBanned(8038)) {
                ans.fans.push({val: 8, id: 8038}); // 花龙
                // 还有喜相逢时, 删除连六和老少副
                if (ersetongshun_num >= 1)
                    banFan([8072, 8073]);
            }

            let tuibudao = true;
            for (const tile of Constants.TILE_NO_AKA)
                if (!judgeTile(tile, 'tuibudao') && cnt2[tile] >= 1) {
                    tuibudao = false;
                    break;
                }

            if (tuibudao && !isBanned(8039)) {
                ans.fans.push({val: 8, id: 8039}); // 推不倒
                // 不计 缺一门
                banFan(8076);
            }

            if (sansetongshun && !isBanned(8040)) {
                ans.fans.push({val: 8, id: 8040}); // 三色三同顺
                // 不计 喜相逢
                banFan(8071);
            }
            let sansesanjiegao = false;
            for (let i = 1; i <= 7; i++)
                for (let j = 0; j < 3; j++)
                    for (let k = (j + 1) % 3; k !== j; k = (k + 1) % 3) {
                        const l = 3 - j - k;
                        if (kezi[i + j + 'm'] >= 1 && kezi[i + k + 'p'] >= 1 && kezi[i + l + 's'] >= 1)
                            sansesanjiegao = true;
                    }

            if (sansesanjiegao && !isBanned(8041))
                ans.fans.push({val: 8, id: 8041}); // 三色三节高
            if (paishan.length === 0) {
                if (zimo && !isBanned(8043)) {
                    ans.fans.push({val: 8, id: 8043}); // 妙手回春
                    // 不计 自摸
                    banFan(8081);
                } else if (!isBanned(8044))
                    ans.fans.push({val: 8, id: 8044}); // 海底捞月
            }
            if (zimo && base_info.lst_draw_type === 0 && !isBanned(8045) && getLstAction(2).name !== 'RecordBaBei') {
                ans.fans.push({val: 8, id: 8045}); // 杠上开花
                // 不计 自摸
                banFan(8081);
            }
            if (getLstAction().name === 'RecordAnGangAddGang' && !isBanned(8046)) {
                ans.fans.push({val: 8, id: 8046}); // 抢杠和
                // 不计 和绝张
                banFan(8057);
            }
            // ---------------------------
            // 6 番
            if (kezi_num === 4 && !isBanned(8047))
                ans.fans.push({val: 6, id: 8047}); // 碰碰和
            if (hunyise && !qingyise && !isBanned(8048))
                ans.fans.push({val: 6, id: 8048}); // 混一色
            let sansesanbugao = false;
            for (let i = 2; i <= 6; i++)
                for (let j = 0; j < 3; j++)
                    for (let k = (j + 1) % 3; k !== j; k = (k + 1) % 3) {
                        const l = 3 - j - k;
                        if (shunzi[i + j + 'm'] >= 1 && shunzi[i + k + 'p'] >= 1 && shunzi[i + l + 's'] >= 1)
                            sansesanbugao = true;
                    }

            if (sansesanbugao && !isBanned(8049))
                ans.fans.push({val: 6, id: 8049}); // 三色三步高
            if (wumenqi && !isBanned(8050))
                ans.fans.push({val: 6, id: 8050}); // 五门齐
            let quanqiuren = true;
            if (zimo || fulu_cnt !== 4)
                quanqiuren = false;

            if (quanqiuren && !isBanned(8051)) {
                ans.fans.push({val: 6, id: 8051}); // 全求人
                // 不计 单钓将
                banFan(8080);
            }
            if (angang_num === 2 && !isBanned(8052)) {
                ans.fans.push({val: 6, id: 8052}); // 双暗杠
                // 不计 双暗刻
                banFan(8067);
            }

            let shuangjianke = false;
            for (let i = 0; i < 3; i++)
                if (kezi[5 + i + 'z'] >= 1 && kezi[5 + (i + 1) % 3 + 'z'] >= 1)
                    shuangjianke = true;
            if (shuangjianke && !isBanned(8053)) {
                // 不计箭刻, 组成双箭刻的两副刻子不计幺九刻
                banFan([8058, 8059, 8060]);
                ban_yaojiuke_num += 2;
                ans.fans.push({val: 6, id: 8053}); // 双箭刻
            }
            // ---------------------------
            // 4 番
            if (hunquandai && !isBanned(8054))
                ans.fans.push({val: 4, id: 8054}); // 全带幺
            if (menqing && zimo && !isBanned(8055)) {
                // 不计 自摸
                banFan(8081);
                ans.fans.push({val: 4, id: 8055}); // 不求人
            }

            if (minggang_num === 2 && gangzi_num === 2 && !isBanned(8056))
                ans.fans.push({val: 4, id: 8056}); // 双明杠

            let lastile_num = 0;
            for (let i = 0; i < base_info.player_cnt; i++) {
                for (const tile of paihe[i].tiles) // 查牌河, 注意被鸣走的牌还在 paihe 中
                    if (isEqualTile(lastile, tile))
                        lastile_num++;
                for (const f of fulu[i])  // 查副露
                    if (f.from !== undefined)
                        for (let k = 0; k < f.tile.length - 1; k++) // -1 是要剔除掉被鸣走的牌
                            if (isEqualTile(lastile, f.tile[k]))
                                lastile_num++;
            }
            if ((lastile_num === 4 || lastile_num === 3 && zimo) && !isBanned(8057))
                ans.fans.push({val: 4, id: 8057}); // 和绝张
            // ---------------------------
            // 2 番
            if (!isBanned(8058))
                for (let i = 0; i < kezi['5z']; i++) {
                    ans.fans.push({val: 2, id: 8058}); // 箭刻 白
                    // 这副刻子不计幺九刻
                    ban_yaojiuke_num++;
                }
            if (!isBanned(8059))
                for (let i = 0; i < kezi['6z']; i++) {
                    ans.fans.push({val: 2, id: 8059}); // 箭刻 发
                    // 这副刻子不计幺九刻
                    ban_yaojiuke_num++;
                }
            if (!isBanned(8060))
                for (let i = 0; i < kezi['7z']; i++) {
                    ans.fans.push({val: 2, id: 8060}); // 箭刻 中
                    // 这副刻子不计幺九刻
                    ban_yaojiuke_num++;
                }

            if (!isBanned(8061))
                for (let i = 0; i < kezi[base_info.chang + 1 + 'z']; i++) {
                    ans.fans.push({val: 2, id: 8061}); // 圈风刻
                    // 这副刻子不计幺九刻
                    ban_yaojiuke_num++;
                }
            if (!isBanned(8062))
                for (let i = 0; i < kezi[(seat - base_info.ju + base_info.player_cnt) % base_info.player_cnt + 1 + 'z']; i++) {
                    ans.fans.push({val: 2, id: 8062}); // 门风刻
                    // 这副刻子不计幺九刻
                    ban_yaojiuke_num++;
                }

            if (menqing && !zimo && !isBanned(8063))
                ans.fans.push({val: 2, id: 8063}); // 门前清

            if (pinghu && !isBanned(8064)) {
                ans.fans.push({val: 2, id: 8064}); // 平和
                // 不计 无字
                banFan(8077);
            }

            let siguiyi_num = 0;
            for (const tile of Constants.TILE_NO_AKA)
                if (cnt2[tile] === 4 && gangzi[tile] === 0)
                    siguiyi_num++;
            if (siguiyi_num >= 1 && !isBanned(8065))
                ans.fans.push({val: 2 * siguiyi_num, id: 8065}); // 四归一

            if (shuangtongke && !isBanned(8066))
                ans.fans.push({val: 2, id: 8066}); // 双同刻

            if (anke_num === 2 && !isBanned(8067))
                ans.fans.push({val: 2, id: 8067}); // 双暗刻
            if (angang_num === 1 && gangzi_num === 1 && !isBanned(8068))
                ans.fans.push({val: 2, id: 8068}); // 暗杠
            if (flag_duanyao && !isBanned(8069)) {
                ans.fans.push({val: 2, id: 8069}); // 断幺
                // 不计 无字
                banFan(8077);
            }
            // ---------------------------
            // 1 番
            if (beikou >= 1 && !isBanned(8070))
                ans.fans.push({val: beikou, id: 8070}); // 一般高
            if (ersetongshun_num >= 1 && !sansetongshun && !isBanned(8071))
                // 有2个一般高的情况下喜相逢最多只会算1个
                ans.fans.push({val: beikou >= 2 ? 1 : ersetongshun_num, id: 8071}); // 一般高

            let lianliu_num = 0;
            for (let j = 0; j < 3; j++)
                for (let i = 2; i <= 5; i++)
                    if (shunzi[i + group[j]] >= 1 && shunzi[i + 3 + group[j]] >= 1)
                        lianliu_num++;
            if (lianliu_num >= 1 && !isBanned(8072))
                // 有2个一般高, 喜相逢的情况下连六最多只会算1个
                ans.fans.push({val: beikou >= 2 || ersetongshun_num >= 2 ? 1 : lianliu_num, id: 8072}); // 连六

            let laoshaofu_num = 0;
            for (let j = 0; j < 3; j++)
                if (shunzi[2 + group[j]] >= 1 && shunzi[8 + group[j]] >= 1)
                    laoshaofu_num += shunzi[2 + group[j]] >= 2 && shunzi[8 + group[j]] >= 2 ? 2 : 1;

            if (laoshaofu_num >= 1 && !isBanned(8073))
                // 有2个一般高, 喜相逢的情况下老少副最多只会算1个
                ans.fans.push({val: beikou >= 2 || ersetongshun_num >= 2 ? 1 : laoshaofu_num, id: 8073}); // 老少副

            let yaojiuke_num = -ban_yaojiuke_num;
            for (const tile of Constants.YAOJIU_TILE)
                yaojiuke_num += kezi[tile];
            if (!isBanned(8074) && yaojiuke_num >= 1)
                ans.fans.push({val: yaojiuke_num, id: 8074}); // 幺九刻

            if (minggang_num === 1 && gangzi_num === 1 && !isBanned(8075))
                ans.fans.push({val: 1, id: 8075}); // 明杠

            let queyimen = false, have_m = 0, have_p = 0, have_s = 0;
            for (let i = 1; i <= 9; i++) {
                if (cnt2[i + 'm'] >= 1)
                    have_m = 1;
                if (cnt2[i + 'p'] >= 1)
                    have_p = 1;
                if (cnt2[i + 's'] >= 1)
                    have_s = 1;
            }
            if (have_m + have_p + have_s === 2)
                queyimen = true;
            if (queyimen && !isBanned(8076))
                ans.fans.push({val: 1, id: 8076}); // 缺一门

            let wuzi = true;
            for (const tile of Constants.HONOR_TILE)
                if (cnt2[tile] >= 1)
                    wuzi = false;
            if (wuzi && !isBanned(8077))
                ans.fans.push({val: 1, id: 8077}); // 无字

            const cnt_hand: TileNum = {}; // cnt 在 dfs 之后已经清零了, 所以要想再得到手牌情况需要重新遍历
            for (const tile of Constants.TILE_NO_AKA)
                cnt_hand[tile] = 0;
            for (const tile of tiles)
                cnt_hand[simplify(tile)]++;

            let bianzhang = false;
            if (parseInt(simplify(lastile)) === 3 && cnt_hand[2 + lastile[1]] >= 1 && cnt_hand[1 + lastile[1]] >= 1)
                bianzhang = true;
            if (parseInt(simplify(lastile)) === 7 && cnt_hand[8 + lastile[1]] >= 1 && cnt_hand[9 + lastile[1]] >= 1)
                bianzhang = true;
            if (bianzhang && !isBanned(8078)) {
                cnt_hand[simplify(lastile)]--;
                tiles.pop();
                if (calcTingpai(seat, true).length === 1) // 严格独听
                    ans.fans.push({val: 1, id: 8078}); // 边张
                tiles.push(lastile);
                cnt_hand[simplify(lastile)]++;
            }

            let kanzhang = cnt_hand[parseInt(simplify(lastile)) - 1 + lastile[1]] >= 1 && cnt_hand[parseInt(simplify(lastile)) + 1 + lastile[1]] >= 1;
            if (kanzhang && !bianzhang && !isBanned(8079)) {
                cnt_hand[simplify(lastile)]--;
                tiles.pop();
                if (calcTingpai(seat, true).length === 1) // 严格独听
                    ans.fans.push({val: 1, id: 8079}); // 坎张
                tiles.push(lastile);
                cnt_hand[simplify(lastile)]++;
            }

            let dandiaojiang = true;
            if (type_cnt[simplify(lastile)][7] !== 1)
                dandiaojiang = false;

            if (dandiaojiang && !kanzhang && !bianzhang && !isBanned(8080)) {
                cnt_hand[simplify(lastile)]--;
                tiles.pop();
                if (calcTingpai(seat, true).length === 1) // 严格独听
                    ans.fans.push({val: 1, id: 8080}); // 单钓将
                tiles.push(lastile);
                cnt_hand[simplify(lastile)]++;
            }

            if (zimo && !isBanned(8081))
                ans.fans.push({val: 1, id: 8081}); // 自摸
            // ---------------------------
            // ---------------------------
            // ---------------------------
            // 无番和
            if (ans.fans.length === 0 && !isBanned(8042))
                ans.fans.push({val: 8, id: 8042}); // 无番和
            // ---------------------------
            // ---------------------------
            // ---------------------------
            // ---------------------------
            // ---------------------------
            // 花牌
            let huapai_num = 0;
            for (const f of fulu[seat])
                if (f.type === 4)
                    huapai_num++;
            if (huapai_num >= 1 && huapai_num <= 8)
                ans.fans.push({val: huapai_num, id: 8090 + huapai_num});
            else if (huapai_num >= 9)
                ans.fans.push({val: huapai_num, id: 8099});
            // ---------------------------
            // ---------------------------
            // ---------------------------
            // ---------------------------
            // ---------------------------
            if (duizi_num === 7) { // 七对子固定符数
                ans.fu = 25;
                return ans;
            }
            ans.fu = 20; // 符底
            if (!pinghu)
                ans.fu += tingpaifu; // 听牌型符
            for (const tile of Constants.TILE_NO_AKA) {
                // 刻子符(幺九/中张, 明刻明杠, 暗杠暗刻)
                if (Constants.YAOJIU_TILE.includes(tile)) {
                    ans.fu += type_cnt[tile][1] * 4;
                    ans.fu += type_cnt[tile][2] * 16;
                    ans.fu += type_cnt[tile][3] * 32;
                    ans.fu += type_cnt[tile][6] * 8;
                } else {
                    ans.fu += type_cnt[tile][1] * 2;
                    ans.fu += type_cnt[tile][2] * 8;
                    ans.fu += type_cnt[tile][3] * 16;
                    ans.fu += type_cnt[tile][6] * 4;
                }
                if (type_cnt[tile][7] === 1) {
                    // 雀头符, 雀头是自风, 场风, 三元
                    if (no_lianfengsifu()) {
                        if (tile === ((seat - base_info.ju + base_info.player_cnt) % base_info.player_cnt + 1 + 'z') || tile === base_info.chang + 1 + 'z')
                            ans.fu += 2;
                    } else {
                        if (tile === ((seat - base_info.ju + base_info.player_cnt) % base_info.player_cnt + 1 + 'z'))
                            ans.fu += 2;
                        if (tile === base_info.chang + 1 + 'z')
                            ans.fu += 2;
                    }
                    if (tile[1] === 'z' && parseInt(tile) >= 5 && parseInt(tile) <= 7)
                        ans.fu += 2;
                }
            }
            if (zimo && !pinghu)
                ans.fu += 2; // 自摸符
            if (!zimo && menqing)
                ans.fu += 10; // 门前清荣和符
            ans.fu = Math.ceil(ans.fu / 10) * 10;
            if (fulu_cnt !== 0 && ans.fu === 20)
                ans.fu = 30;
            // --------------------------------------------------
            return ans;
        }
    }

    /**
     * 能与特殊牌型(国士, 全不靠)复合番种的计算, 不含全不靠的组合龙因为还会调用 dfs 所以不需要调用该函数
     *
     * 复合番种包括: 天和, 地和, 人和, 妙手回春, 海底捞月, 抢杠和, 和绝张, 自摸
     */
    function specialCalc(ans: CalcFanRet): void {
        let ban_zimo = false;

        if (liqi_info[seat].yifa !== 0 && liqi_info[seat].liqi === 0 && seat === base_info.ju && zimo) {
            ans.fans.push({val: 8, id: 8083}); // 天和
            ban_zimo = true;
        }

        let first_tile = true;
        for (let i = 0; i < base_info.player_cnt; i++) {
            if (i === base_info.ju)
                continue;
            if (!(liqi_info[i].yifa !== 0 && liqi_info[i].liqi === 0))
                first_tile = false;
        }
        if (first_tile && seat !== base_info.ju && !zimo)
            ans.fans.push({val: 8, id: 8084}); // 地和

        // 在立直麻将中人和的基础上添加亲家的下一家没有一发(因为国标没有立直, 所以任何情况下切牌后都没有一发)
        if (liqi_info[seat].yifa !== 0 && liqi_info[seat].liqi === 0 && seat !== base_info.ju && zimo) {
            ans.fans.push({val: 8, id: 8085}); // 人和
            ban_zimo = true;
        } else if (liqi_info[seat].yifa !== 0 && liqi_info[seat].liqi === 0 && seat !== base_info.ju && !zimo && liqi_info[(base_info.ju + 1) % base_info.player_cnt].yifa === 0)
            ans.fans.push({val: 8, id: 8085}); // 人和

        if (paishan.length === 0)
            if (zimo) {
                ans.fans.push({val: 8, id: 8043}); // 妙手回春
                ban_zimo = true;
            } else
                ans.fans.push({val: 8, id: 8044}); // 海底捞月
        if (getLstAction().name === 'RecordAnGangAddGang')
            ans.fans.push({val: 8, id: 8046}); // 抢杠和
        else {
            let lastile_num = 0;
            for (let i = 0; i < base_info.player_cnt; i++) {
                for (const tile of paihe[i].tiles) // 查牌河, 注意被鸣走的牌还在 paihe 中
                    if (isEqualTile(lastile, tile))
                        lastile_num++;
                for (const f of fulu[i])  // 查副露
                    if (f.from !== undefined)
                        for (let k = 0; k < f.tile.length - 1; k++) // -1 是要剔除掉被鸣走的牌
                            if (isEqualTile(lastile, f.tile[k]))
                                lastile_num++;
            }
            if (lastile_num === 4 || lastile_num === 3 && zimo)
                ans.fans.push({val: 4, id: 8057}); // 和绝张
        }
        if (zimo && !ban_zimo)
            ans.fans.push({val: 1, id: 8081}); // 自摸
    }
};
