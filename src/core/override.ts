/**
 * @file: override.ts - 重写游戏函数以实现编辑功能, 以及部分强化功能
 * @author: Fat-pig-Cui
 * @email: chubbypig@qq.com
 * @github: https://github.com/Fat-pig-Cui/majsoul-replay-editor
 */

import {all_data, player_datas, base_info, views_pool} from "./data";
import {
    get_mainrole_seat, get_mjp_id, get_mjpsurface_id, get_tablecloth_id, is_guobiao, is_random_skin, is_random_views,
    updateViews
} from "./misc";
import {DIYFans, guobiaoFans} from "./constants";

const overrideStore: {
    backedUp: boolean;
    originals: {
        checkPaiPu?: CheckPaiPu;
        resetData?: ResetData;
        OnChoosedPai?: OnChoosedPaiFn;
        seat2LocalPosition?: SeatTransformFn;
        localPosition2Seat?: SeatTransformFn;
    };
} = {
    backedUp: false,
    originals: {},
};

const backupOriginalsOnce = (): void => {
    if (overrideStore.backedUp)
        return;

    // 只备份“注入当下”能拿到的原函数引用；后续 export var 也以它为准
    overrideStore.originals.checkPaiPu = GameMgr.Inst.checkPaiPu as CheckPaiPu;
    overrideStore.originals.resetData = uiscript.UI_Replay.prototype.resetData as ResetData;
    overrideStore.originals.OnChoosedPai = view.ViewPai.prototype.OnChoosedPai as OnChoosedPaiFn;
    overrideStore.originals.seat2LocalPosition = view.DesktopMgr.prototype.seat2LocalPosition as SeatTransformFn;
    overrideStore.originals.localPosition2Seat = view.DesktopMgr.prototype.localPosition2Seat as SeatTransformFn;

    // 同步导出变量：保证外部（例如 add_function.js）仍可读取“最初备份的原版”
    checkPaiPu = overrideStore.originals.checkPaiPu;
    resetData = overrideStore.originals.resetData;
    OnChoosedPai = overrideStore.originals.OnChoosedPai;
    seat2LocalPosition = overrideStore.originals.seat2LocalPosition;
    localPosition2Seat = overrideStore.originals.localPosition2Seat;

    overrideStore.backedUp = true;
};

/**
 * 重写的回放接口, 其中
 *
 * checkPaiPu 和 resetData 在 editOffline 中重写, 在 resetReplay 中复原
 *
 * OnChoosedPai, seat2LocalPosition, localPosition2Seat 在 add_function.js 中重写
 */
export var checkPaiPu: CheckPaiPu | undefined,
    resetData: ResetData | undefined,
    OnChoosedPai: OnChoosedPaiFn | undefined,
    seat2LocalPosition: SeatTransformFn | undefined,
    localPosition2Seat: SeatTransformFn | undefined;

/**
 * 复原以查看真实牌谱
 */
export const resetReplay = (): void => {
    backupOriginalsOnce();
    if (overrideStore.originals.checkPaiPu)
        GameMgr.Inst.checkPaiPu = overrideStore.originals.checkPaiPu;
    if (overrideStore.originals.resetData)
        uiscript.UI_Replay.prototype.resetData = overrideStore.originals.resetData;
};

// 使补充和优化函数只执行一次的控制变量
let inst_once_chkP = true;

// 在线编辑(进入牌谱之后的修改, 包括切换视角和切换巡目, 只在 editOffline 中的 resetData 中调用)
const editOnline = (): void => {
    const rounds: { actions: Actions, xun: number[] }[] = [];
    for (const actions of all_data.all_actions)
        rounds.push({actions: actions, xun: all_data.xun[rounds.length][view.DesktopMgr.Inst.seat]});
    uiscript.UI_Replay.Inst.rounds = rounds;
    uiscript.UI_Replay.Inst.gameResult.result.players = all_data.players;
};

// 离线编辑(进入牌谱之前的修改, 只在 gameEnd 中调用)
export const editOffline = (): void => {
    // 修改玩家信息
    const editPlayerDatas = (): void => {
        const ret: PlayerDatas = [null, null];
        // 建议玩家随机的装扮: 立直棒(0), 和牌特效(1), 立直特效(2), 头像框(5), 桌布(6), 牌背(7), 称号(11), 牌面(13)
        const slots = [0, 1, 2, 5, 6, 7, 11, 13];
        for (let seat = 0; seat < base_info.player_cnt; seat++) {
            ret[seat] = {
                account_id: 100000 + seat, // 账号唯一id, 这里没什么用随便设的
                seat: seat as Seat, // 座次
                nickname: player_datas[seat].nickname, // 昵称
                avatar_id: player_datas[seat].avatar_id, // 头像id
                character: { // 角色信息
                    charid: cfg.item_definition.skin.map_[player_datas[seat].avatar_id].character_id, // 角色id
                    level: 5, // 角色好感等级, 即好感几颗心
                    exp: 0, // 好感经验, 契约之后值是0
                    skin: player_datas[seat].avatar_id, // 皮肤, 和 avatar_id 一样
                    is_upgraded: true, // 是否已契约
                    extra_emoji: [10, 11, 12], // 额外表情, 除了初始的九个外其他都是额外表情, 包括契约后的三个
                },
                title: player_datas[seat].title, // 称号
                level: {id: 10503, score: 4500}, // 四麻段位分, 这里是圣三原点, 下同
                level3: {id: 20503, score: 4500}, // 三麻段位分
                avatar_frame: player_datas[seat].avatar_frame, // 头像框
                verified: player_datas[seat].verified, // 是否已认证, 0: 未认证, 1: 主播(猫爪)认证, 2: 职业(P标)认证
                views: player_datas[seat].views, // 装扮槽
            };
            if (is_random_skin()) {
                const skin_len = cfg.item_definition.skin.rows_.length;
                let skin_id = cfg.item_definition.skin.rows_[Math.floor(Math.random() * skin_len)].id;
                while (skin_id === 400000 || skin_id === 400001)
                    skin_id = cfg.item_definition.skin.rows_[Math.floor(Math.random() * skin_len)].id;
                ret[seat].avatar_id = ret[seat].character.skin = skin_id;
                ret[seat].character.charid = cfg.item_definition.skin.map_[skin_id].character_id;
            }
            if (is_random_views())
                for (const slot of slots) {
                    const item_id = views_pool[slot][Math.floor(Math.random() * views_pool[slot].length)];
                    if (slot === 11) {
                        ret[seat].title = item_id;
                        continue;
                    }
                    if (slot === 5)
                        ret[seat].avatar_frame = item_id;
                    let existed = false;
                    for (const view of ret[seat].views)
                        if (view.slot === slot) {
                            view.item_id = item_id;
                            existed = true;
                            break;
                        }
                    if (!existed)
                        ret[seat].views.push({
                            slot: slot,
                            item_id: item_id,
                        });
                }
        }
        for (let seat = 0; seat < base_info.player_cnt; seat++)
            player_datas[seat] = ret[seat];
        player_datas.splice(base_info.player_cnt);
    };

    // 备份原函数（只做一次），并同步导出变量
    backupOriginalsOnce();

    // 重写对局信息
    uiscript.UI_Replay.prototype.resetData = function () {
        try {
            // 始终调用“最初备份的原版”，避免导出变量被外部覆盖导致链条断裂
            overrideStore.originals.resetData?.call(this);
            editOnline();
        } catch (e) {
            console.error(e);
        }
    };

    // 重写查看牌谱函数, 修改房间信息和玩家信息
    GameMgr.Inst.checkPaiPu = function (game_uuid: string, account_id: number, paipu_config: 0 | 2) {
        try { // 添加下面
            if (all_data.all_actions.length === 0) {
                console.error('GameMgr.Inst.checkPaiPu: 没有载入自制牌谱, 不可查看, 若要查看真实牌谱, 请输入 resetReplay()');
                return;
            }
            if (inst_once_chkP) {
                if (typeof editFunction == 'function')
                    editFunction();
                updateViews();
                DIYFans();
                guobiaoFans();
                optimizeFunction();
            }
        } catch (e) { // 添加上面
            console.error(e);
        }
        const W = this;
        game_uuid = game_uuid.trim();
        app.Log.log('checkPaiPu game_uuid:' + game_uuid + ' account_id:' + account_id.toString() + ' paipu_config:' + paipu_config);

        if (this.duringPaipu)
            app.Log.Error('已经在看牌谱了');
        else {
            this.duringPaipu = true;
            uiscript.UI_Loading.Inst.show(uiscript.ELoadingType.EEnterMJ);
            GameMgr.Inst.onLoadStart('paipu');
            if (paipu_config === 2)
                game_uuid = game.Tools.DecodePaipuUUID(game_uuid);
            this.record_uuid = game_uuid;

            app.NetAgent.sendReq2Lobby('Lobby', 'fetchGameRecord', {
                    game_uuid: game_uuid,
                    client_version_string: this.getClientVersion()
                },
                function (l, n) {
                    if (l || n.error) {
                        uiscript.UIMgr.Inst.showNetReqError('fetchGameRecord', l, n);
                        let y = 0.12;
                        uiscript.UI_Loading.Inst.setProgressVal(y);
                        const f = function () {
                            y += 0.06;
                            uiscript.UI_Loading.Inst.setProgressVal(Math.min(1, y));
                            if (y >= 1.1) {
                                uiscript.UI_Loading.Inst.close();
                                uiscript.UIMgr.Inst.showLobby();
                                Laya.timer.clear(this, f);
                            }
                        };
                        Laya.timer.loop(50, W, f);
                        W.duringPaipu = false;
                    } else {
                        // 添加: 接受的牌谱信息去除 robots
                        n.head.robots = [];

                        // 修改的地方: 本来是 openMJRoom 的第二个参数(单个字母), 现在是 all_data.player_datas
                        // 本来是 openMJRoom 的第一个参数(如 X.config), 现在是 all_data.config
                        // 添加下面
                        editPlayerDatas();
                        try {
                            if (cfg.item_definition.view.get(get_tablecloth_id()) !== undefined)
                                uiscript.UI_Sushe.now_desktop_id = get_tablecloth_id();
                            if (cfg.item_definition.view.get(get_mjp_id()) !== undefined) {
                                uiscript.UI_Sushe.now_mjp_id = get_mjp_id();
                                GameMgr.Inst.mjp_view = cfg.item_definition.view.get(get_mjp_id()).res_name;
                                Laya.loader.load(`${game.LoadMgr.getAtlasRoot()}myres2/mjp/${GameMgr.Inst.mjp_view}/hand.atlas`);
                            }
                            if (cfg.item_definition.view.get(get_mjpsurface_id()) !== undefined) {
                                uiscript.UI_Sushe.now_mjp_surface_id = get_mjpsurface_id();
                                GameMgr.Inst.mjp_surface_view = cfg.item_definition.view.get(get_mjpsurface_id()).res_name;
                                Laya.loader.load(`${game.LoadMgr.getAtlasRoot()}myres2/mjpm/${GameMgr.Inst.mjp_surface_view}/ui.atlas`);
                            }
                            // 第一场的主视角
                            const tmp_seat = get_mainrole_seat();
                            if (tmp_seat !== -1)
                                account_id = all_data.player_datas[tmp_seat].account_id;
                            else // 第一局的亲家
                                account_id = all_data.player_datas[all_data.all_actions[0][0].data.ju].account_id;
                        } catch (e) { // 添加上面
                            console.error(e);
                        }

                        const C = Laya.Handler.create(W, function (H) {
                            const main_func = function () {
                                game.Scene_Lobby.Inst.active = false;
                                game.Scene_MJ.Inst.openMJRoom(all_data.config, all_data.player_datas,
                                    Laya.Handler.create(W, function () {
                                        W.duringPaipu = false;
                                        view.DesktopMgr.Inst.paipu_config = paipu_config;
                                        view.DesktopMgr.Inst.initRoom(JSON.parse(JSON.stringify(all_data.config)), all_data.player_datas, account_id, view.EMJMode.paipu, Laya.Handler.create(W, function () {
                                            // 添加下面
                                            if (typeof editFunction2 == 'function' && inst_once_chkP)
                                                editFunction2();
                                            inst_once_chkP = false;
                                            if (base_info.player_cnt === 2) {
                                                view.DesktopMgr.Inst.rule_mode = view.ERuleMode.Liqi2;
                                                uiscript.UI_DesktopInfo.Inst.refreshSeat();
                                            }
                                            // 添加上面

                                            uiscript.UI_Replay.Inst.initMaka(false, false);
                                            uiscript.UI_Replay.Inst.initData(H);
                                            uiscript.UI_Replay.Inst.enable = true;
                                            Laya.timer.once(1000, W, function () {
                                                W.EnterMJ();
                                            });
                                            Laya.timer.once(1500, W, function () {
                                                view.DesktopMgr.player_link_state = [view.ELink_State.READY, view.ELink_State.READY, view.ELink_State.READY, view.ELink_State.READY];
                                                uiscript.UI_DesktopInfo.Inst.refreshLinks();
                                                uiscript.UI_Loading.Inst.close();
                                            });
                                            Laya.timer.once(1000, W, function () {
                                                uiscript.UI_Replay.Inst.nextStep(true);
                                            });
                                        }));
                                    }),
                                    Laya.Handler.create(W,
                                        function (H) {
                                            return uiscript.UI_Loading.Inst.setProgressVal(0.1 + 0.9 * H);
                                        },
                                        null, false)
                                );
                            };
                            main_func();
                        });
                        let B: any = {};
                        B.record = n.head;
                        if (n.data && n.data.length) {
                            B.game = net.MessageWrapper.decodeMessage(n.data);
                            C.runWith(B);
                        } else {
                            let O = n.data_url;
                            if (!O.startsWith('http'))
                                O = GameMgr.prefix_url + O;
                            game.LoadMgr.httpload(O, 'arraybuffer', false,
                                Laya.Handler.create(W,
                                    function (H) {
                                        if (H.success) {
                                            const N = new Laya.Byte();
                                            N.writeArrayBuffer(H.data);
                                            B.game = net.MessageWrapper.decodeMessage(N.getUint8Array(0, N.length));
                                            C.runWith(B);
                                        } else {
                                            uiscript.UIMgr.Inst.ShowErrorInfo(game.Tools.strOfLocalization(2005) + n.data_url);
                                            uiscript.UI_Loading.Inst.close();
                                            uiscript.UIMgr.Inst.showLobby();
                                            W.duringPaipu = false;
                                        }
                                    }
                                )
                            );
                        }
                    }
                }
            );
        }
    };
};

// ========================================================================
// ============================= 一些的优化函数 =============================
// ========================================================================

const optimizeFunction = (): void => {
    // 修正多赤的暗杠
    view.ActionAnGangAddGang.getAngangTile = (tile: Tile, seat: Seat) => {
        const hand = view.DesktopMgr.Inst.players[view.DesktopMgr.Inst.seat2LocalPosition(seat)].hand;
        const mj_tile = mjcore.MJPai.Create(tile);
        let dora_cnt = 0; // 红宝牌数量
        let touming_cnt = 0; // 透明牌数量

        // 贪心策略: 优先杠出赤宝牌
        for (let i = 0; i < hand.length; i++) {
            if (mjcore.MJPai.Distance(hand[i].val, mj_tile) === 0 && hand[i].val.dora)
                dora_cnt = Math.min(dora_cnt + 1, 4);
            if (mjcore.MJPai.Distance(hand[i].val, mj_tile) === 0 && hand[i].val.touming)
                touming_cnt = Math.min(touming_cnt + 1, 4);
        }

        const angang_tiles = [];
        for (let i = 0; i < 4; i++) {
            const mjp = mjcore.MJPai.Create(tile);
            mjp.dora = false;
            mjp.touming = false;
            angang_tiles.push(mjp);
        }

        for (let i = 1; i <= dora_cnt; i++)
            angang_tiles[i % 4].dora = true;
        for (let i = 0; i < touming_cnt; i++)
            angang_tiles[i].touming = true;

        view.DesktopMgr.Inst.waiting_lingshang_deal_tile = true;
        return angang_tiles;
    };

    // 添加 category 为 3: '段位场' , 99: '装扮预览' 的情况
    // 逐渐取代 '四人东' 为对应模式的名称
    game.Tools.get_room_desc = function (config: Config) {
        if (!config)
            return {
                text: '',
                isSimhei: !1
            };
        let text = '';
        if (config.meta && config.meta.tournament_id) {
            const n = cfg.tournament.tournaments.get(config.meta.tournament_id);
            n && (text = n.name);
            return {
                text: text,
                isSimhei: !0
            };
        }
        if (1 === config.category) {
            if (config.mode.detail_rule)
                text += '友人场\xB7';
        } else if (4 === config.category)
            text += '比赛场\xB7';
        else if (2 === config.category) {
            const S = config.meta;
            if (S) {
                const M = cfg.desktop.matchmode.get(S.mode_id);
                M && (text += M['room_name_' + GameMgr.client_language] + '\xB7');
            }
        } else if (100 === config.category)
            return {
                text: '新手教程',
                isSimhei: !1
            };
        // 添加下面
        else if (99 === config.category)
            return {
                text: '装扮预览',
                isSimhei: !1
            };
        else if (3 === config.category)
            text += '段位场\xB7';
        if (config.category && config.mode.detail_rule) {
            const x = config.mode.detail_rule;
            if (x.xuezhandaodi)
                text += '修罗之战';
            else if (x.chuanma)
                text += '赤羽之战';
            else if (x.dora3_mode)
                text += '宝牌狂热';
            else if (x.begin_open_mode)
                text += '配牌明牌';
            else if (x.muyu_mode)
                text += '龙之目玉';
            else if (x.jiuchao_mode)
                text += '明镜之战';
            else if (x.reveal_discard)
                text += '暗夜之战';
            else if (x.field_spell_mode)
                text += '幻境传说';
            else if (x.zhanxing)
                text += '占星之战';
            else if (x.tianming_mode)
                text += '天命之战';
            else if (x.yongchang_mode)
                text += '咏唱之战';
            else if (x.hunzhiyiji_mode)
                text += '魂之一击';
            else if (x.wanxiangxiuluo_mode)
                text += '万象修罗';
            else if (x.beishuizhizhan_mode)
                text += '背水之战';
            else if (x.amusement_switches instanceof Array && x.amusement_switches.includes(18))
                text += '下克上';
            else if (x._random_views || x._random_skin)
                text = '随机装扮';
            else
                text += this.room_mode_desc(config.mode.mode);
        }
        // 添加上面
        return {
            text: text,
            isSimhei: !1
        };
    };

    // 1. 国标添加圈风刻, 门风刻语音
    // 2. 并不显示宝牌指示牌
    // 3. 番种数超过上限时, 会循环报菜名
    uiscript.UI_Win.prototype.showRecord = function (K) {
        var z = this;
        if (!view.DesktopMgr.Inst.record_show_anim)
            return this._showInfo_record(K),
                this.isDoAnimation = false,
                undefined;
        this.isDoAnimation = true,
            this.container_Activity_Point.me.visible = false,
            this.container_activity_rpg.me.visible = false,
            this.root.alpha = 0,
            this.tweenManager.addTweenTo(this.root, {
                alpha: 1
            }, 500);
        var Z = view.DesktopMgr.Inst.getPlayerName(K.seat);
        game.Tools.SetNickname(this.winner_name, Z, false, true);
        var s = view.DesktopMgr.Inst.player_datas[K.seat].character
            , U = new uiscript.UIRect();
        U.x = this.illust_rect.x,
            U.y = this.illust_rect.y,
            U.width = this.illust_rect.width,
            U.height = this.illust_rect.height,
            this.char_skin.setRect(U),
            this.char_skin.setSkin(view.DesktopMgr.Inst.player_datas[K.seat].avatar_id, 'full'),
            2 === K.mode ? this.img_mode.visible = false : (this.img_mode.visible = true,
                this.img_mode.skin = 0 === K.mode ? game.Tools.localUISrc('myres/mjdesktop/pg_zimo.png') : game.Tools.localUISrc('myres/mjdesktop/pg_he.png')),
            this._showPai(K),
            // 添加下面
            this.container_dora.visible = !(view.DesktopMgr.Inst.is_chuanma_mode() || is_guobiao()),
            this.container_lidora.visible = !(view.DesktopMgr.Inst.is_chuanma_mode() || is_guobiao());
        // 添加上面
        var O = K.fan_names.length
            , m = 100;
        this.container_fan_yiman.visible = false,
            this.container_fan_8.visible = false,
            this.container_fan_15.visible = false,
            this.container_fan_12.visible = false,
            this.container_fan_liuju.visible = false,
            this.container_fan_yiman.visible = false,
            this.container_fan_8.visible = false,
            this.container_fan_15.visible = false,
            this.container_fan_12.visible = false,
            this.container_fan_liuju.visible = false;
        var Y = null;
        Y = 2 === K.mode ? this.container_fan_liuju : K.yiman ? this.container_fan_yiman : 8 >= O ? this.container_fan_8 : 12 >= O ? this.container_fan_12 : this.container_fan_15,
            Y.visible = true;
        for (var j = 0; j < Y.numChildren; j++)
            Y.getChildAt(j).visible = false;
        for (var Q = [], j = 0; j < K.fan_names.length; j++) {
            var p = K.fan_names[j]
                , M = 0
                , u = K.fan_ids[j]
                , e = false
                , H = cfg.fan.fan.get(u);
            H && (e = !!H.mark),
            9999 !== u && H && (M = H.show_index);
            var r: any = {
                name: p,
                index: M,
                isSpecialFan: e
            };
            if (K.fan_value && K.fan_value.length > j && (r.value = K.fan_value[j]),
            10 === u)
                switch ((K.seat - view.DesktopMgr.Inst.index_ju + view.DesktopMgr.Inst.player_count) % view.DesktopMgr.Inst.player_count) {
                    case 0:
                        r.sound = 'fan_dong';
                        break;
                    case 1:
                        r.sound = 'fan_nan';
                        break;
                    case 2:
                        r.sound = 'fan_xi';
                        break;
                    case 3:
                        r.sound = 'fan_bei';
                }
            else if (11 === u)
                if (view.DesktopMgr.Inst.index_change % 4 === (K.seat - view.DesktopMgr.Inst.index_ju + view.DesktopMgr.Inst.player_count) % view.DesktopMgr.Inst.player_count)
                    switch (view.DesktopMgr.Inst.index_change % 4) {
                        case 0:
                            r.sound = 'fan_doubledong';
                            break;
                        case 1:
                            r.sound = 'fan_doublenan';
                            break;
                        case 2:
                            r.sound = 'fan_doublexi';
                            break;
                        case 3:
                            r.sound = 'fan_doublebei';
                    }
                else
                    switch (view.DesktopMgr.Inst.index_change % 4) {
                        case 0:
                            r.sound = 'fan_dong';
                            break;
                        case 1:
                            r.sound = 'fan_nan';
                            break;
                        case 2:
                            r.sound = 'fan_xi';
                            break;
                        case 3:
                            r.sound = 'fan_bei';
                    }
            // 添加下面
            else if (8061 === u)
                switch (view.DesktopMgr.Inst.index_change % 4) {
                    case 0:
                        r.sound = 'fan_dong';
                        break;
                    case 1:
                        r.sound = 'fan_nan';
                        break;
                    case 2:
                        r.sound = 'fan_xi';
                        break;
                    case 3:
                        r.sound = 'fan_bei';
                }
            else if (8062 === u)
                if (view.DesktopMgr.Inst.index_change % 4 === (K.seat - view.DesktopMgr.Inst.index_ju + view.DesktopMgr.Inst.player_count) % view.DesktopMgr.Inst.player_count)
                    switch ((K.seat - view.DesktopMgr.Inst.index_ju + view.DesktopMgr.Inst.player_count) % view.DesktopMgr.Inst.player_count) {
                        case 0:
                            r.sound = 'fan_doubledong';
                            break;
                        case 1:
                            r.sound = 'fan_doublenan';
                            break;
                        case 2:
                            r.sound = 'fan_doublexi';
                            break;
                        case 3:
                            r.sound = 'fan_doublebei';
                    }
                else
                    switch ((K.seat - view.DesktopMgr.Inst.index_ju + view.DesktopMgr.Inst.player_count) % view.DesktopMgr.Inst.player_count) {
                        case 0:
                            r.sound = 'fan_dong';
                            break;
                        case 1:
                            r.sound = 'fan_nan';
                            break;
                        case 2:
                            r.sound = 'fan_xi';
                            break;
                        case 3:
                            r.sound = 'fan_bei';
                    }
            // 添加上面
            else if (u >= 31 && 34 >= u) {
                var T = r.value;
                T > 13 && (T = 13),
                    r.sound = 0 === T ? '' : 'fan_dora' + T;
            } else
                9999 === u ? r.sound = 'fan_liujumanguan' : u >= 0 && (r.sound = cfg.fan.fan.get(u).sound);
            Q.push(r);
        }
        Q = Q.sort(function (B, K) {
            return B.index - K.index;
        }),
            m += 500;
        for (var I = function (B) {
            if (!(B % Y.numChildren)) // 添加该 if
                C.timerManager.addTimerOnce(m, function (){
                    for (var k = 0; k < Y.numChildren; k++)
                    Y.getChildAt(k).visible = false;
                });
            var Z = game.Tools.get_chara_audio(s, Q[B].sound);
            C.timerManager.addTimerOnce(m, function () {
                var s = Y.getChildAt(B % Y.numChildren) // 加入 % Y.numChildren
                    , U = s.getChildByName('l_name');
                U.text = Q[B].name,
                    U.color = Q[B].isSpecialFan ? '#ffc74c' : '#f1eeda';
                var O = K.yiman && 'en' === GameMgr.client_language ? 290 : 242;
                if (U.width = O,
                    game.Tools.labelLocalizationSize(U, O, 0.8),
                undefined !== Q[B].value && null !== Q[B].value) {
                    s.getChildAt(2).visible = true;
                    var m = Q[B].value
                        , j = m.toString();
                    2 === j.length ? (s.getChildAt(3).skin = game.Tools.localUISrc('myres/mjdesktop/number/h_' + j[1] + '.png'),
                        s.getChildAt(3).visible = true,
                        s.getChildAt(4).skin = game.Tools.localUISrc('myres/mjdesktop/number/h_' + j[0] + '.png'),
                        s.getChildAt(4).visible = true) : (s.getChildAt(3).skin = game.Tools.localUISrc('myres/mjdesktop/number/h_' + j[0] + '.png'),
                        s.getChildAt(3).visible = true,
                        s.getChildAt(4).visible = false);
                }
                s.visible = true,
                    z.tweenManager.addTweenFrom(s, {
                        x: 169,
                        y: 184,
                        alpha: 0
                    }, 100, Laya.Ease.strongOut),
                    Z ? (view.AudioMgr.PlaySound(Z.path, Z.volume),
                        view.AudioMgr.PlayAudio(211, 1, 0.5)) : view.AudioMgr.PlayAudio(211, 1, 1);
            }),
                m += Z ? Z.time_length > 500 ? Z.time_length : 500 : 500;
        }, C = this, j = 0; j < O; j++) // 去掉 j < Y.numChildren 的循环条件
            I(j);
        this.container_fan.visible = false,
            this.container_fu.visible = false,
            this.img_yiman.visible = false,
            K.fan && K.fu ? (m += 300,
                this.timerManager.addTimerOnce(m, function () {
                    view.AudioMgr.PlayAudio(208),
                        z.setFanFu(K.fan, K.fu);
                })) : K.yiman && (m += 700,
                this.timerManager.addTimerOnce(m, function () {
                    view.AudioMgr.PlayAudio(208),
                        z.img_yiman.alpha = 0,
                        z.img_yiman.visible = true,
                        z.tweenManager.addTweenTo(z.img_yiman, {
                            alpha: 1
                        }, 200);
                })),
            this.container_score.alpha = 0;
        for (var j = 0; j < this.score_imgs.length; j++)
            this.score_imgs[j].visible = false;
        if (m += 700,
            this.container_score.scaleX = this.container_score.scaleY = 2,
            this.timerManager.addTimerOnce(m, function () {
                for (var B = 0, Z = K.score; 0 !== Z;) {
                    var s = Z % 10;
                    if (Z = Math.floor(Z / 10),
                        z.score_imgs[B].skin = game.Tools.localUISrc('myres/mjdesktop/number/ww_' + s.toString() + '.png'),
                        z.score_imgs[B].visible = true,
                        B++,
                    B >= z.score_imgs.length)
                        break;
                }
                z.tweenManager.addTweenTo(z.container_score, {
                    alpha: 1,
                    scaleX: 1.2,
                    scaleY: 1.2
                }, 200, Laya.Ease.strongIn),
                    view.AudioMgr.PlayAudio(221);
            }),
            this.container_title.visible = false,
            K.title_id) {
            m += 700;
            var V = 0
                , g = 0
                , W = '';
            switch (K.title_id) {
                case mjcore.E_Dadian_Title.E_Dadian_Title_manguan:
                    W = 'gameend_manguan',
                        V = 214;
                    break;
                case mjcore.E_Dadian_Title.E_Dadian_Title_tiaoman:
                    W = 'gameend_tiaoman',
                        V = 214;
                    break;
                case mjcore.E_Dadian_Title.E_Dadian_Title_beiman:
                    W = 'gameend_beiman',
                        V = 201;
                    break;
                case mjcore.E_Dadian_Title.E_Dadian_Title_sanbeiman:
                    W = 'gameend_sanbeiman',
                        V = 201;
                    break;
                case mjcore.E_Dadian_Title.E_Dadian_Title_leijiyiman:
                    W = 'gameend_leijiyiman',
                        g = 2,
                        V = 226;
                    break;
                case mjcore.E_Dadian_Title.E_Dadian_Title_yiman:
                    W = 'gameend_yiman1',
                        g = 1,
                        V = 226;
                    break;
                case mjcore.E_Dadian_Title.E_Dadian_Title_yiman2:
                    W = 'gameend_yiman2',
                        g = 2,
                        V = 226;
                    break;
                case mjcore.E_Dadian_Title.E_Dadian_Title_yiman3:
                    W = 'gameend_yiman3',
                        g = 2,
                        V = 226;
                    break;
                case mjcore.E_Dadian_Title.E_Dadian_Title_yiman4:
                    W = 'gameend_yiman4',
                        g = 2,
                        V = 226;
                    break;
                case mjcore.E_Dadian_Title.E_Dadian_Title_yiman5:
                    W = 'gameend_yiman5',
                        g = 2,
                        V = 226;
                    break;
                case mjcore.E_Dadian_Title.E_Dadian_Title_yiman6:
                    W = 'gameend_yiman6',
                        g = 2,
                        V = 226;
            }
            var X = game.Tools.get_chara_audio(s, W);
            this.timerManager.addTimerOnce(m, function () {
                z.setTitle(K.title_id),
                    z.container_title.visible = true,
                    z.container_title.alpha = 0,
                    z.container_title.scaleX = z.container_title.scaleY = 3,
                    z.tweenManager.addTweenTo(z.container_title, {
                        alpha: 1,
                        scaleX: 1.2,
                        scaleY: 1.2
                    }, 300, Laya.Ease.strongIn),
                    z.timerManager.addTimerOnce(300, function () {
                        0 !== V && view.AudioMgr.PlayAudio(V);
                    }),
                X && z.timerManager.addTimerOnce(500, function () {
                    view.AudioMgr.PlaySound(X.path, X.volume);
                }),
                0 !== g && z.timerManager.addTimerOnce(300, function () {
                    var B, K;
                    'en' === GameMgr.client_language ? (B = z.root.getChildByName('effect_yiman_en'),
                        K = 'scene/effect_yiman2.lh') : 'kr' === GameMgr.client_language ? (B = z.root.getChildByName('effect_yiman_en'),
                        K = 'scene/effect_yiman.lh') : 1 === g ? (B = z.root.getChildByName('effect_yiman'),
                        K = 'scene/effect_yiman.lh') : (B = z.root.getChildByName('effect_yiman2'),
                        K = 'scene/effect_yiman2.lh'),
                        z.effect_yiman = game.FrontEffect.Inst.create_ui_effect(B, K, new Laya.Point(0, 0), 25);
                });
            }),
            (K.yiman || '累积役满' === K.title) && (m += 500);
        }
        if (this.muyu.visible = false,
            view.DesktopMgr.Inst.muyu_info) {
            var i = false;
            0 === K.mode ? i = true : 1 === K.mode && (view.DesktopMgr.Inst.index_player === view.DesktopMgr.Inst.muyu_info.seat && (i = true),
            K.seat === view.DesktopMgr.Inst.muyu_info.seat && (i = true)),
            i && (this.muyu.scale(1.2, 1.2),
                m += 700,
                this.timerManager.addTimerOnce(m, function () {
                    z.muyu.visible = true,
                        z.muyu.alpha = 0;
                    var B = (view.DesktopMgr.Inst.muyu_info.seat - view.DesktopMgr.Inst.index_ju + view.DesktopMgr.Inst.player_count) % view.DesktopMgr.Inst.player_count;
                    z.muyu.skin = game.Tools.localUISrc('myres/mjdesktop/muyu_seat' + B + '.png'),
                        z.tweenManager.addTweenTo(z.muyu, {
                            alpha: 1
                        }, 250);
                }));
        }
        if (view.DesktopMgr.Inst.is_tianming_mode()) {
            this.muyu.visible = false;
            var i = false;
            K.tianming_bonus > 0 && (i = true),
            i && (this.muyu.scale(1, 1),
                m += 700,
                this.timerManager.addTimerOnce(m, function () {
                    z.muyu.visible = true,
                        z.muyu.alpha = 0,
                        z.muyu.skin = game.Tools.localUISrc('myres/mjdesktop/tianming_result_' + K.tianming_bonus + '.png'),
                        z.tweenManager.addTweenTo(z.muyu, {
                            alpha: 1
                        }, 250);
                }));
        }
        if (this.xiakeshang.visible = !1,
            view.DesktopMgr.Inst.isTargetSpecialMode(18)) {
            var k = !1;
            K.xia_ke_shang_coefficient && (k = !0),
            k && (m += 700,
                this.timerManager.addTimerOnce(m, function () {
                    z.xiakeshang.visible = !0,
                        z.xiakeshang.alpha = 0,
                        z.xiakeshang.skin = game.Tools.localUISrc('myres/mjdesktop/xiakeshang_result' + K.xia_ke_shang_coefficient + '.png'),
                        z.tweenManager.addTweenTo(z.xiakeshang, {
                            alpha: 1
                        }, 250);
                }));
        }

        if (view.DesktopMgr.Inst.mode === view.EMJMode.play && K.seat === view.DesktopMgr.Inst.seat && K.mode <= 1 && uiscript.UI_Activity.activity_is_running(uiscript.UI_Activity_DuanWu_Point.activity_id)) {
            for (var S = false, j = 0; j < view.DesktopMgr.Inst.player_datas.length; j++) {
                var _ = view.DesktopMgr.Inst.player_datas[j];
                if (!_ || game.Tools.isAI(_.account_id)) {
                    S = true;
                    break;
                }
            }
            S ? this.container_Activity_Point.me.visible = false : m += this.container_Activity_Point.show(m, K.point_sum, K.score);
        } else
            this.container_Activity_Point.me.visible = false;
        if (view.DesktopMgr.Inst.mode === view.EMJMode.play && uiscript.UI_Activity.activity_is_running(uiscript.UI_Activity_RPG.activity_id)) {
            for (var S = false, j = 0; j < view.DesktopMgr.Inst.player_datas.length; j++) {
                var _ = view.DesktopMgr.Inst.player_datas[j];
                if (!_ || game.Tools.isAI(_.account_id)) {
                    S = true;
                    break;
                }
            }
            if (S)
                this.container_activity_rpg.me.visible = false;
            else {
                var f = 0;
                view.DesktopMgr.Inst.seat !== K.seat && (f = 0 === K.mode ? 2 : 1),
                    1 === f && 0 !== view.DesktopMgr.Inst.seat2LocalPosition(view.DesktopMgr.Inst.index_player) ? this.container_activity_rpg.me.visible = false : this.container_activity_rpg.show(f, 0);
            }
        } else
            this.container_activity_rpg.me.visible = false;
        this.btn_confirm.visible = false,
            m += 300,
            this.btn_confirm.disabled = true,
            this.timerManager.addTimerOnce(m, function () {
                if (z.btn_confirm.visible = true,
                    z.btn_confirm.alpha = 1,
                    z.tweenManager.addTweenFrom(z.btn_confirm, {
                        alpha: 0
                    }, 200),
                    z.btn_confirm.disabled = false,
                view.DesktopMgr.Inst.mode === view.EMJMode.paipu || view.DesktopMgr.Inst.mode === view.EMJMode.xinshouyindao)
                    z.count_down.visible = false,
                        z.btn_confirm.getChildByName('confirm').x = 131;
                else {
                    z.count_down.visible = true,
                        z.btn_confirm.getChildByName('confirm').x = 165;
                    for (var B = function (B) {
                        z.timerManager.addTimerOnce(1000 * B, function () {
                            z.btn_confirm.disabled || (z.count_down.text = '(' + (3 - B).toString() + ')');
                        });
                    }, K = 0; 3 > K; K++)
                        B(K);
                    z.timerManager.addTimerOnce(3000, function () {
                        z.btn_confirm.disabled || z.onConfirm();
                    });
                }
            });
    };

    // 上述函数对应的跳过动画的版本
    uiscript.UI_Win.prototype._showInfo_record = function (K) {
        this.container_Activity_Point.me.visible = false,
            this.root.alpha = 1;
        view.DesktopMgr.Inst.setNickname(this.winner_name, K.seat, '#c3e2ff', '#fbfbfb', true);
        var z = new uiscript.UIRect();
        z.x = this.illust_rect.x,
            z.y = this.illust_rect.y,
            z.width = this.illust_rect.width,
            z.height = this.illust_rect.height,
            this.char_skin.setRect(z),
            this.char_skin.setSkin(view.DesktopMgr.Inst.player_datas[K.seat].avatar_id, 'full'),
            2 === K.mode ? this.img_mode.visible = false : (this.img_mode.visible = true,
                this.img_mode.skin = 0 === K.mode ? game.Tools.localUISrc('myres/mjdesktop/pg_zimo.png') : game.Tools.localUISrc('myres/mjdesktop/pg_he.png')),
            this._showPai(K),
            // 添加下面
            this.container_dora.visible = !(view.DesktopMgr.Inst.is_chuanma_mode() || is_guobiao()),
            this.container_lidora.visible = !(view.DesktopMgr.Inst.is_chuanma_mode() || is_guobiao());
        // 添加上面
        var Z = K.fan_names.length;
        this.container_fan_yiman.visible = false,
            this.container_fan_8.visible = false,
            this.container_fan_15.visible = false,
            this.container_fan_12.visible = false,
            this.container_fan_liuju.visible = false,
            this.container_fan_yiman.visible = false,
            this.container_fan_8.visible = false,
            this.container_fan_15.visible = false,
            this.container_fan_12.visible = false,
            this.container_fan_liuju.visible = false;
        var s;
        s = 2 === K.mode ? this.container_fan_liuju : K.yiman ? this.container_fan_yiman : 8 >= Z ? this.container_fan_8 : 12 >= Z ? this.container_fan_12 : this.container_fan_15,
            s.visible = true;
        for (var U = 0; U < s.numChildren; U++)
            s.getChildAt(U).visible = false;
        for (var O = [], U = 0; U < K.fan_names.length; U++) {
            var m = K.fan_names[U]
                , Y = K.fan_ids[U]
                , j = 0
                , Q = false
                , p = cfg.fan.fan.get(Y);
            p && (Q = !!p.mark),
            9999 !== Y && p && (j = p.show_index);
            var M: any = {
                name: m,
                index: j,
                isSpecialFan: Q
            };
            K.fan_value && K.fan_value.length > U && (M.value = K.fan_value[U]),
                O.push(M);
        }
        O = O.sort(function (B, K) {
            return B.index - K.index;
        });
        for (var U = 0; Z > U && U < s.numChildren; U++) {
            var u = s.getChildAt(U)
                , e = u.getChildByName('l_name');
            e.text = O[U].name,
                e.color = O[U].isSpecialFan ? '#ffc74c' : '#f1eeda';
            var H = K.yiman && 'en' === GameMgr.client_language ? 290 : 242;
            if (e.width = H,
                game.Tools.labelLocalizationSize(e, H, 0.8),
            undefined !== O[U].value && null !== O[U].value) {
                u.getChildAt(2).visible = true;
                var r = O[U].value
                    , T = r.toString();
                2 === T.length ? (u.getChildAt(3).skin = game.Tools.localUISrc('myres/mjdesktop/number/h_' + T[1] + '.png'),
                    u.getChildAt(3).visible = true,
                    u.getChildAt(4).skin = game.Tools.localUISrc('myres/mjdesktop/number/h_' + T[0] + '.png'),
                    u.getChildAt(4).visible = true) : (u.getChildAt(3).skin = game.Tools.localUISrc('myres/mjdesktop/number/h_' + T[0] + '.png'),
                    u.getChildAt(3).visible = true,
                    u.getChildAt(4).visible = false);
            }
            u.visible = true;
        }
        this.container_fan.visible = false,
            this.container_fu.visible = false,
            this.img_yiman.visible = false,
            K.fan && K.fu ? this.setFanFu(K.fan, K.fu) : K.yiman && (this.img_yiman.alpha = 1,
                this.img_yiman.visible = true);
        for (var U = 0; U < this.score_imgs.length; U++)
            this.score_imgs[U].visible = false;
        for (var I = K.score.toString(), U = 0; U < I.length && !(U >= this.score_imgs.length); U++)
            this.score_imgs[U].skin = game.Tools.localUISrc('myres/mjdesktop/number/ww_' + I.charAt(I.length - 1 - U) + '.png'),
                this.score_imgs[U].visible = true;
        if (this.container_score.alpha = 1,
            this.container_score.scaleX = this.container_score.scaleY = 1.2,
            this.container_title.visible = false,
        K.title_id && (this.setTitle(K.title_id),
            this.container_title.visible = true,
            this.container_title.alpha = 1,
            this.container_title.scaleX = this.container_title.scaleY = 1.2),
            this.muyu.visible = false,
            view.DesktopMgr.Inst.muyu_info) {
            var C = false;
            if (0 === K.mode ? C = true : 1 === K.mode && (view.DesktopMgr.Inst.index_player === view.DesktopMgr.Inst.muyu_info.seat && (C = true),
            K.seat === view.DesktopMgr.Inst.muyu_info.seat && (C = true)),
                C) {
                this.muyu.visible = true,
                    this.muyu.alpha = 1;
                var V = (view.DesktopMgr.Inst.muyu_info.seat - view.DesktopMgr.Inst.index_ju + view.DesktopMgr.Inst.player_count) % view.DesktopMgr.Inst.player_count;
                this.muyu.skin = game.Tools.localUISrc('myres/mjdesktop/muyu_seat' + V + '.png');
            }
        }
        if (this.xiakeshang.visible = !1,
            view.DesktopMgr.Inst.isTargetSpecialMode(18)) {
            var r: any = !1;
            K.xia_ke_shang_coefficient && (r = !0),
            r && (this.xiakeshang.visible = !0,
                this.xiakeshang.alpha = 1,
                this.xiakeshang.skin = game.Tools.localUISrc('myres/mjdesktop/xiakeshang_result' + K.xia_ke_shang_coefficient + '.png'));
        }
        this.count_down.text = '',
            this.btn_confirm.visible = true,
            this.btn_confirm.disabled = false,
            this.btn_confirm.alpha = 1,
            this.count_down.visible = false,
            this.btn_confirm.getChildByName('confirm').x = 131;
    };

    // 国标麻将不显示符数; 番数扩展到百位显示
    uiscript.UI_Win.prototype.setFanFu = function (B, K) {
        // cloneImage 函数由猫粮工作室老板娘"丝茉茉"提供
        const cloneImage = original => {
            const clone = new Laya.Image();
            original.parent.addChildAt(clone, 0);
            clone.pos(-138, 62);
            clone.size(original.width, original.height);
            clone.rotation = original.rotation;
            clone.scale(original.scaleX, original.scaleY);
            clone.alpha = original.alpha;
            clone.visible = original.visible;
            clone.skin = original.skin;
            return clone;
        };

        this.container_fan.visible = this.container_fu.visible = true,
            this.container_fan.alpha = this.container_fu.alpha = 0;

        if (this.fan_imgs.length < 3)
            this.fan_imgs[2] = cloneImage(this.fan_imgs[1]);

        for (var z = 0; 3 > z; z++)
            if (0 === B)
                this.fan_imgs[z].visible = false;
            else {
                var Z = B % 10;
                B = Math.floor(B / 10),
                    this.fan_imgs[z].visible = true,
                    this.fan_imgs[z].skin = game.Tools.localUISrc('myres/mjdesktop/number/h_' + Z.toString() + '.png');
            }
        // 添加下面
        this.container_fu.visible = !(view.DesktopMgr.Inst.is_chuanma_mode() || is_guobiao());
        // 添加上面
        for (var z = 0; 3 > z; z++)
            if (0 === K)
                this.fu_imgs[z].visible = false;
            else {
                var Z = K % 10;
                K = Math.floor(K / 10),
                    this.fu_imgs[z].visible = true,
                    this.fu_imgs[z].skin = game.Tools.localUISrc('myres/mjdesktop/number/ww_' + Z.toString() + '.png');
            }
        this.tweenManager.addTweenTo(this.container_fan, {
            alpha: 1
        }, 200),
            this.tweenManager.addTweenTo(this.container_fu, {
                alpha: 1
            }, 200);
    };
};
