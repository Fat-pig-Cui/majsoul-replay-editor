"use strict";

var view;

function editfunction() {
    !function (O) {
        O.ActionDiscardTile = function (K) {
            function U() {
                return null !== K && K['apply'](this, arguments) || this;
            }

            return __extends(U, K),
                U['play'] = function (K) {
                    app.Log.log('ActionDiscardTile play data:' + JSON['stringify'](K));
                    var U = 500;
                    K['doras'] && O['DesktopMgr'].Inst['WhenDoras'](K['doras'], !1);
                    var V = K.seat
                        , N = mjcore['MJPai']['Create'](K.tile)
                        , q = !(null == K['is_liqi'] || void 0 === K['is_liqi'] || !K['is_liqi']);

                    // 添加内容: kailiqi
                    if (K.is_kailiqi) {
                        if (K.seat !== view.DesktopMgr.Inst.seat)
                            for (let i = 0; i < view.DesktopMgr.Inst.players[view.DesktopMgr.Inst.seat2LocalPosition(K.seat)].hand.length; i++) {
                                view.DesktopMgr.Inst.players[view.DesktopMgr.Inst.seat2LocalPosition(K.seat)].hand[i].DoAnim_FullDown();
                                view.DesktopMgr.Inst.players[view.DesktopMgr.Inst.seat2LocalPosition(K.seat)].hand[i].is_open = true;
                            }
                    }

                    if (K.muyu && O['DesktopMgr'].Inst['onMuyuChange'](K.muyu, !0),
                        O['DesktopMgr'].Inst['players'][O['DesktopMgr'].Inst['seat2LocalPosition'](V)]['AddQiPai'](N, q, K['moqie']),
                    O['DesktopMgr'].Inst['is_field_spell_mode']() && uiscript['UI_FieldSpell'].Inst['onDiscard'](V, q),
                    O['DesktopMgr'].Inst['is_zhanxing_mode']() && uiscript['UI_Astrology'].Inst['alignTile'](),
                        q) {
                        K['is_wliqi'] ? O['DesktopMgr'].Inst['players'][O['DesktopMgr'].Inst['seat2LocalPosition'](V)]['PlaySound']('act_drich') :
                            O['DesktopMgr'].Inst['players'][O['DesktopMgr'].Inst['seat2LocalPosition'](V)]['PlaySound']('act_rich');
                        var _ = O['DesktopMgr'].Inst['player_effects'][V][game['EView']['lizhi_bgm']];
                        if (_ && 0 !== _) {
                            var h = cfg['item_definition'].item.get(_)['sargs'][0];
                            O['AudioMgr']['lizhiMuted'] ? O['AudioMgr']['PlayLiqiBgm'](h, 300, !0) : (O['BgmListMgr']['stopBgm'](),
                                Laya['timer'].once(1000, this, function () {
                                    O['DesktopMgr'].Inst['gameing'] && (O['BgmListMgr']['PlayMJBgm']('', !0),
                                        O['AudioMgr']['PlayLiqiBgm'](h, 300, !0));
                                }));
                        }
                    }
                    var t = !1;
                    return !N['touming'] && K['tile_state'] && K['tile_state'] > 0 && (t = !0),
                        V === O['DesktopMgr'].Inst.seat ? O['DesktopMgr'].Inst['mainrole']['OnDiscardTile'](N, t, !1, K['moqie']) :
                            O['DesktopMgr'].Inst['players'][O['DesktopMgr'].Inst['seat2LocalPosition'](V)]['onDiscardTile'](K['moqie'], K.tile, t, !1),
                    K['operation'] && Laya['timer'].once(500, this, function () {
                        O['ActionOperation'].play(K['operation']);
                    }),
                    void 0 !== K['zhenting'] && void 0 === K['operation'] && (uiscript['UI_DesktopInfo'].Inst['setZhenting'](K['zhenting']),
                        uiscript['UI_TingPai'].Inst['setZhengting'](K['zhenting'])),
                    V === O['DesktopMgr'].Inst.seat && uiscript['UI_TingPai'].Inst['setData1'](K, !1),
                    O['DesktopMgr'].Inst['is_tianming_mode']() && uiscript['UI_DesktopInfo'].Inst['SetTianMingRate'](V,
                        O['DesktopMgr'].Inst['players'][O['DesktopMgr'].Inst['seat2LocalPosition'](V)]['getTianMingRate'](), !0),
                    K['yongchang'] && uiscript['UI_DesktopInfo'].Inst['SetYongChangRate'](O['DesktopMgr'].Inst['seat2LocalPosition'](K['yongchang'].seat), K['yongchang']['moqie_count'], K['yongchang']['moqie_bonus'], K['yongchang']['shouqie_count'], K['yongchang']['shouqie_bonus'], !0),
                    K['hun_zhi_yi_ji_info'] && (uiscript['UI_DesktopInfo'].Inst['SetHunZhiContinueDealCount'](O['DesktopMgr'].Inst['seat2LocalPosition'](K['hun_zhi_yi_ji_info'].seat), K['hun_zhi_yi_ji_info']['continue_deal_count'], K['hun_zhi_yi_ji_info']['overload'], !0),
                    K['hun_zhi_yi_ji_info']['overload'] || (U = q ? 1100 : 600)),
                        Laya['timer'].once(500, this, function () {
                            q ? O['DesktopMgr'].Inst['clearMindVoice']() : O['DesktopMgr'].Inst['playMindVoice']();
                        }),
                        U;
                }
                ,
                U['fastplay'] = function (K, U) {
                    app.Log.log('ActionDiscardTile fastplay data:' + JSON['stringify'](K) + ' usetime:' + U),
                    K['doras'] && O['DesktopMgr'].Inst['WhenDoras'](K['doras'], !0);
                    var V = K.seat
                        , N = mjcore['MJPai']['Create'](K.tile)
                        , q = !(null == K['is_liqi'] || void 0 === K['is_liqi'] || !K['is_liqi'])
                        , _ = !1;

                    // 添加内容: kailiqi
                    if (K.is_kailiqi) {
                        if (K.seat !== view.DesktopMgr.Inst.seat)
                            for (let i = 0; i < view.DesktopMgr.Inst.players[view.DesktopMgr.Inst.seat2LocalPosition(K.seat)].hand.length; i++) {
                                view.DesktopMgr.Inst.players[view.DesktopMgr.Inst.seat2LocalPosition(K.seat)].hand[i].DoAnim_FullDown();
                                view.DesktopMgr.Inst.players[view.DesktopMgr.Inst.seat2LocalPosition(K.seat)].hand[i].is_open = true;
                            }
                    }

                    !N['touming'] && K['tile_state'] && K['tile_state'] > 0 && (_ = !0),
                        O['DesktopMgr'].Inst['players'][O['DesktopMgr'].Inst['seat2LocalPosition'](V)]['AddQiPai'](N, q, K['moqie'], !1),
                    K.muyu && O['DesktopMgr'].Inst['onMuyuChange'](K.muyu, !1),
                        V === O['DesktopMgr'].Inst.seat ? O['DesktopMgr'].Inst['mainrole']['OnDiscardTile'](N, _, !0, K['moqie']) :
                            O['DesktopMgr'].Inst['players'][O['DesktopMgr'].Inst['seat2LocalPosition'](V)]['onDiscardTile'](K['moqie'], K.tile, _, !0),
                    K['operation'] && -1 !== U && Laya['timer'].once(500, this, function () {
                        O['ActionOperation'].play(K['operation'], U);
                    }),
                    void 0 !== K['zhenting'] && void 0 === K['operation'] && (uiscript['UI_DesktopInfo'].Inst['setZhenting'](K['zhenting']),
                        uiscript['UI_TingPai'].Inst['setZhengting'](K['zhenting'])),
                    V === O['DesktopMgr'].Inst.seat && uiscript['UI_TingPai'].Inst['setData1'](K, !0),
                    O['DesktopMgr'].Inst['is_field_spell_mode']() && uiscript['UI_FieldSpell'].Inst['onDiscard'](V, q),
                    O['DesktopMgr'].Inst['is_zhanxing_mode']() && uiscript['UI_Astrology'].Inst['alignTile'](),
                    O['DesktopMgr'].Inst['is_tianming_mode']() && uiscript['UI_DesktopInfo'].Inst['SetTianMingRate'](V, O['DesktopMgr'].Inst['players'][O['DesktopMgr'].Inst['seat2LocalPosition'](V)]['getTianMingRate']()),
                    K['yongchang'] && uiscript['UI_DesktopInfo'].Inst['SetYongChangRate'](O['DesktopMgr'].Inst['seat2LocalPosition'](K['yongchang'].seat), K['yongchang']['moqie_count'], K['yongchang']['moqie_bonus'], K['yongchang']['shouqie_count'], K['yongchang']['shouqie_bonus'], !1),
                    K['hun_zhi_yi_ji_info'] && uiscript['UI_DesktopInfo'].Inst['SetHunZhiContinueDealCount'](O['DesktopMgr'].Inst['seat2LocalPosition'](K['hun_zhi_yi_ji_info'].seat), K['hun_zhi_yi_ji_info']['continue_deal_count'], K['hun_zhi_yi_ji_info']['overload'], !1);
                }
                ,
                U['record'] = function (K, U) {
                    void 0 === U && (U = 0),
                        app.Log.log("ActionDiscardTile record data:" + JSON.stringify(K));
                    var V = 500;
                    K.doras && O.DesktopMgr.Inst.WhenDoras(K.doras, !0);
                    var N = K.seat,
                        q = mjcore.MJPai.Create(K.tile),
                        _ = !(null === K.is_liqi || void 0 === K.is_liqi || !K.is_liqi),
                        h = !1;

                    // 添加内容: kailiqi
                    if (K.is_kailiqi) {
                        if (K.seat !== view.DesktopMgr.Inst.seat)
                            for (let i = 0; i < view.DesktopMgr.Inst.players[view.DesktopMgr.Inst.seat2LocalPosition(K.seat)].hand.length; i++) {
                                view.DesktopMgr.Inst.players[view.DesktopMgr.Inst.seat2LocalPosition(K.seat)].hand[i].DoAnim_FullDown();
                                view.DesktopMgr.Inst.players[view.DesktopMgr.Inst.seat2LocalPosition(K.seat)].hand[i].is_open = true;
                            }
                    }

                    if (!q['touming'] && K['tile_state'] && K['tile_state'] > 0 && (h = !0),
                    K.muyu && O['DesktopMgr'].Inst['onMuyuChange'](K.muyu, !0),
                        O['DesktopMgr'].Inst['players'][O['DesktopMgr'].Inst['seat2LocalPosition'](N)]['AddQiPai'](q, _, K['moqie']),
                    _ && (K['is_wliqi'] ? O['DesktopMgr'].Inst['players'][O['DesktopMgr'].Inst['seat2LocalPosition'](N)]['PlaySound']('act_drich') :
                        O['DesktopMgr'].Inst['players'][O['DesktopMgr'].Inst['seat2LocalPosition'](N)]['PlaySound']('act_rich'),
                        uiscript['UI_DesktopInfo'].Inst['changeHeadEmo'](N, 'emoji_9', 2000)),
                        N === O['DesktopMgr'].Inst.seat ? O['DesktopMgr'].Inst['mainrole']['OnDiscardTile'](q, h, !1, K['moqie']) :
                            O['DesktopMgr'].Inst['players'][O['DesktopMgr'].Inst['seat2LocalPosition'](N)]['recordDiscardTile'](q, K['moqie'], h, !1),
                    K['tingpais'] && O['DesktopMgr'].Inst['setTingpai'](K.seat, K['tingpais']),
                    O['DesktopMgr'].Inst.mode === O['EMJMode']['live_broadcast'] && uiscript['UI_Live_Broadcast'].Inst['during_play'] && K['operations'])
                        for (var t = 0; t < K['operations']['length']; t++)
                            O['ActionOperation'].ob(K['operations'][t], U, 450);
                    return K['operation'] && Laya['timer'].once(500, this, function () {
                        O['ActionOperation'].play(K['operation']);
                    }),
                    O['DesktopMgr'].Inst['is_field_spell_mode']() && uiscript['UI_FieldSpell'].Inst['onDiscard'](N, _),
                    O['DesktopMgr'].Inst['is_zhanxing_mode']() && uiscript['UI_Astrology'].Inst['alignTile'](),
                    O['DesktopMgr'].Inst['is_tianming_mode']() &&
                    uiscript['UI_DesktopInfo'].Inst['SetTianMingRate'](N, O['DesktopMgr'].Inst['players'][O['DesktopMgr'].Inst['seat2LocalPosition'](N)]['getTianMingRate'](), !0),
                    K['yongchang'] && uiscript['UI_DesktopInfo'].Inst['SetYongChangRate'](O['DesktopMgr'].Inst['seat2LocalPosition'](K['yongchang'].seat),
                        K['yongchang']['moqie_count'], K['yongchang']['moqie_bonus'], K['yongchang']['shouqie_count'], K['yongchang']['shouqie_bonus'], !0),
                    K['hun_zhi_yi_ji_info'] &&
                    (uiscript['UI_DesktopInfo'].Inst['SetHunZhiContinueDealCount'](O['DesktopMgr'].Inst['seat2LocalPosition'](K['hun_zhi_yi_ji_info'].seat),
                        K['hun_zhi_yi_ji_info']['continue_deal_count'], K['hun_zhi_yi_ji_info']['overload'], !0),
                    K['hun_zhi_yi_ji_info']['overload'] || (V = _ ? 1100 : 600)),
                        V;
                }
                ,
                U['fastrecord'] = function (K, U) {
                    void 0 === U && (U = -1),
                        app.Log.log('ActionDiscardTile fastrecord data:' + JSON['stringify'](K)),
                    K['doras'] && O['DesktopMgr'].Inst['WhenDoras'](K['doras'], !0);
                    var V = K.seat
                        , N = mjcore['MJPai']['Create'](K.tile)
                        , q = !(null == K['is_liqi'] || void 0 == K['is_liqi'] || !K['is_liqi'])
                        , _ = !1;

                    // 添加内容: kailiqi
                    if (K.is_kailiqi) {
                        if (K.seat !== view.DesktopMgr.Inst.seat)
                            for (let i = 0; i < view.DesktopMgr.Inst.players[view.DesktopMgr.Inst.seat2LocalPosition(K.seat)].hand.length; i++) {
                                view.DesktopMgr.Inst.players[view.DesktopMgr.Inst.seat2LocalPosition(K.seat)].hand[i].DoAnim_FullDown();
                                view.DesktopMgr.Inst.players[view.DesktopMgr.Inst.seat2LocalPosition(K.seat)].hand[i].is_open = true;
                            }
                    }

                    if (!N['touming'] && K['tile_state'] && K['tile_state'] > 0 && (_ = !0),
                    K.muyu && O['DesktopMgr'].Inst['onMuyuChange'](K.muyu, !1),
                        O['DesktopMgr'].Inst['players'][O['DesktopMgr'].Inst['seat2LocalPosition'](V)]['AddQiPai'](N, q, K['moqie'], !1),
                        V === O['DesktopMgr'].Inst.seat ? O['DesktopMgr'].Inst['mainrole']['OnDiscardTile'](N, _, !0, K['moqie']) :
                            O['DesktopMgr'].Inst['players'][O['DesktopMgr'].Inst['seat2LocalPosition'](V)]['recordDiscardTile'](N, K['moqie'], _, !0),
                    K['tingpais'] && O['DesktopMgr'].Inst['setTingpai'](K.seat, K['tingpais']),
                    O['DesktopMgr'].Inst.mode === O['EMJMode']['live_broadcast'] && uiscript['UI_Live_Broadcast'].Inst['during_play'] && U >= 0 && K['operations'])
                        for (var h = 0; h < K['operations']['length']; h++)
                            O['ActionOperation'].ob(K['operations'][h], U, 450);
                    O['DesktopMgr'].Inst['is_field_spell_mode']() && uiscript['UI_FieldSpell'].Inst['onDiscard'](V, q),
                    O['DesktopMgr'].Inst['is_zhanxing_mode']() && uiscript['UI_Astrology'].Inst['alignTile'](),
                    O['DesktopMgr'].Inst['is_tianming_mode']() && uiscript['UI_DesktopInfo'].Inst['SetTianMingRate'](V,
                        O['DesktopMgr'].Inst['players'][O['DesktopMgr'].Inst['seat2LocalPosition'](V)]['getTianMingRate']()),
                    K['yongchang'] && uiscript['UI_DesktopInfo'].Inst['SetYongChangRate'](O['DesktopMgr'].Inst['seat2LocalPosition'](K['yongchang'].seat),
                        K['yongchang']['moqie_count'], K['yongchang']['moqie_bonus'], K['yongchang']['shouqie_count'], K['yongchang']['shouqie_bonus'], !1),
                    K['hun_zhi_yi_ji_info'] &&
                    uiscript['UI_DesktopInfo'].Inst['SetHunZhiContinueDealCount'](O['DesktopMgr'].Inst['seat2LocalPosition'](K['hun_zhi_yi_ji_info'].seat),
                        K['hun_zhi_yi_ji_info']['continue_deal_count'], K['hun_zhi_yi_ji_info']['overload'], !1);
                }
                ,
                U;
        }(O.ActionBase)
    }(view || (view = {}));
    !function (O) {
        O.ActionBabei = function (K) {
            function U() {
                return null !== K && K.apply(this, arguments) || this
            }

            return __extends(U, K),
                U.play = function (K) {
                    app.Log.log('ActionBabei play data:' + JSON['stringify'](K)),
                    K['doras'] && O['DesktopMgr'].Inst['WhenDoras'](K['doras'], !1);
                    var U = K.seat, V;

                    // 添加内容: 拔的牌可以是其他牌
                    V = K.tile ? mjcore['MJPai']['Create'](K.tile) : mjcore['MJPai']['Create']('4z');

                    O['DesktopMgr'].Inst['players'][O['DesktopMgr'].Inst['seat2LocalPosition'](U)]['AddBabei'](V, K['moqie'], !0),
                        O['DesktopMgr'].Inst['players'][O['DesktopMgr'].Inst['seat2LocalPosition'](U)]['PlaySound']('act_babei');
                    var N = !1;
                    K['tile_state'] && K['tile_state'] > 0 && (N = !0),
                    K.muyu && O['DesktopMgr'].Inst['onMuyuChange'](K.muyu, !0),
                        U === O['DesktopMgr'].Inst.seat ? O['DesktopMgr'].Inst['mainrole']['onBabei'](V, N, !1) :
                            O['DesktopMgr'].Inst['players'][O['DesktopMgr'].Inst['seat2LocalPosition'](U)]['onBabei'](K['moqie'], N, !1),
                    K['operation'] && Laya['timer'].once(500, this, function () {
                        O['ActionOperation'].play(K['operation']);
                    }),
                    void 0 !== K['zhenting'] && void 0 === K['operation'] && (uiscript['UI_DesktopInfo'].Inst['setZhenting'](K['zhenting']),
                        uiscript['UI_TingPai'].Inst['setZhengting'](K['zhenting'])),
                    U === O['DesktopMgr'].Inst.seat && uiscript['UI_TingPai'].Inst['setData1'](K, !1),
                        O['DesktopMgr'].Inst['waiting_lingshang_deal_tile'] = !0;
                }
                ,
                U.fastplay = function (K, U) {
                    app.Log.log('ActionBabei fastplay data:' + JSON['stringify'](K) + ' usetime:' + U),
                    K['doras'] && O['DesktopMgr'].Inst['WhenDoras'](K['doras'], !0);
                    var V = K.seat, N;

                    // 添加内容: 拔的牌可以是其他牌
                    N = K.tile ? mjcore.MJPai.Create(K.tile) : mjcore.MJPai.Create("4z");

                    O['DesktopMgr'].Inst['players'][O['DesktopMgr'].Inst['seat2LocalPosition'](V)]['AddBabei'](N, K['moqie'], !1);
                    var q = !1;
                    K['tile_state'] && K['tile_state'] > 0 && (q = !0),
                    K.muyu && O['DesktopMgr'].Inst['onMuyuChange'](K.muyu, !1),
                        V === O['DesktopMgr'].Inst.seat ? O['DesktopMgr'].Inst['mainrole']['onBabei'](N, q, !0) :
                            O['DesktopMgr'].Inst['players'][O['DesktopMgr'].Inst['seat2LocalPosition'](V)]['onBabei'](K['moqie'], q, !0),
                    K['operation'] && -1 !== U && Laya['timer'].once(500, this, function () {
                        O['ActionOperation'].play(K['operation'], U);
                    }),
                    void 0 !== K['zhenting'] && void 0 === K['operation'] && (uiscript['UI_DesktopInfo'].Inst['setZhenting'](K['zhenting']),
                        uiscript['UI_TingPai'].Inst['setZhengting'](K['zhenting'])),
                    V === O['DesktopMgr'].Inst.seat && uiscript['UI_TingPai'].Inst['setData1'](K, !0),
                        O['DesktopMgr'].Inst['waiting_lingshang_deal_tile'] = !0;
                }
                ,
                U.record = function (K, U) {
                    void 0 === U && (U = 0),
                        app.Log.log("ActionBabei record data:" + JSON.stringify(K)), K.doras && O.DesktopMgr.Inst.WhenDoras(K.doras, !0);
                    var V = K.seat, N;

                    // 添加内容: 拔的牌可以是其他牌
                    N = K.tile ? mjcore.MJPai.Create(K.tile) : mjcore.MJPai.Create("4z");

                    O['DesktopMgr'].Inst['players'][O['DesktopMgr'].Inst['seat2LocalPosition'](V)]['AddBabei'](N, K['moqie'], !0),
                        O['DesktopMgr'].Inst['players'][O['DesktopMgr'].Inst['seat2LocalPosition'](V)]['PlaySound']('act_babei');
                    var q = !1;
                    if (K['tile_state'] && K['tile_state'] > 0 && (q = !0),
                    K.muyu && O['DesktopMgr'].Inst['onMuyuChange'](K.muyu, !0),
                        V === O['DesktopMgr'].Inst.seat ? O['DesktopMgr'].Inst['mainrole']['onBabei'](N, q, !1) :
                            O['DesktopMgr'].Inst['players'][O['DesktopMgr'].Inst['seat2LocalPosition'](V)]['recordBabei'](N, K['moqie'], q, !1),
                    K['tingpais'] && O['DesktopMgr'].Inst['setTingpai'](K.seat, K['tingpais']),
                    O['DesktopMgr'].Inst.mode === O['EMJMode']['live_broadcast'] && uiscript['UI_Live_Broadcast'].Inst['during_play'] && K['operations'])
                        for (var _ = 0; _ < K['operations']['length']; _++)
                            O['ActionOperation'].ob(K['operations'][_], U, 450);
                    return O['DesktopMgr'].Inst['waiting_lingshang_deal_tile'] = !0,
                        1000;
                }
                ,
                U.fastrecord = function (K, U) {
                    void 0 === U && (U = -1),
                        app.Log.log("ActionBabei fastrecord data:" + JSON.stringify(K)),
                    K.doras && O.DesktopMgr.Inst.WhenDoras(K.doras, !0);
                    var V = K.seat, N;

                    // 添加内容: 拔的牌可以是其他牌
                    N = K.tile ? mjcore.MJPai.Create(K.tile) : mjcore.MJPai.Create("4z");

                    O['DesktopMgr'].Inst['players'][O['DesktopMgr'].Inst['seat2LocalPosition'](V)]['AddBabei'](N, K['moqie'], !1);
                    var q = !1;
                    if (K['tile_state'] && K['tile_state'] > 0 && (q = !0),
                    K.muyu && O['DesktopMgr'].Inst['onMuyuChange'](K.muyu, !1),
                        V === O['DesktopMgr'].Inst.seat ? O['DesktopMgr'].Inst['mainrole']['onBabei'](N, q, !0) :
                            O['DesktopMgr'].Inst['players'][O['DesktopMgr'].Inst['seat2LocalPosition'](V)]['recordBabei'](N, K['moqie'], q, !0),
                    K['tingpais'] && O['DesktopMgr'].Inst['setTingpai'](K.seat, K['tingpais']),
                    O['DesktopMgr'].Inst.mode === O['EMJMode']['live_broadcast'] && uiscript['UI_Live_Broadcast'].Inst['during_play'] && U >= 0 &&
                    K['operations'])
                        for (var _ = 0; _ < K['operations']['length']; _++)
                            O['ActionOperation'].ob(K['operations'][_], U, 450);
                    O['DesktopMgr'].Inst['waiting_lingshang_deal_tile'] = !0;
                }
                ,
                U;
        }(O.ActionBase)
    }(view || (view = {}));
    // 自创函数: ActionHuleXueLiu, 改编自 ActionHuleXueZhanMid
    !function (O) {
        O.ActionHuleXueLiu = function (K) {
            function U() {
                return null !== K && K.apply(this, arguments) || this
            }

            return __extends(U, K),
                U.record = function (K) {
                    var U = this;
                    var n = 1;

                    K['doras'] && O['DesktopMgr'].Inst['WhenDoras'](K['doras'], !1);
                    Laya.timer.once(100, this, function () {
                        var N = K.hules
                            , q = 0;
                        if (N[0].zimo) {
                            var _ = N[0].seat;
                            uiscript.UI_Huleshow.Inst.showZimo([O.DesktopMgr.Inst.seat2LocalPosition(_)]),
                                q += n ? 1200 : 200,
                                Laya.timer.once(q, U, function () {
                                    O.DesktopMgr.Inst.players[O.DesktopMgr.Inst.seat2LocalPosition(_)].AddBabei(mjcore.MJPai.Create(N[0].hu_tile), true, 1);
                                    if (O.DesktopMgr.Inst.lastqipai)
                                        O.DesktopMgr.Inst.lastqipai.isxuezhanhu = !0, O.DesktopMgr.Inst.lastqipai.OnChoosedPai();
                                    _ === O.DesktopMgr.Inst.seat ? O.DesktopMgr.Inst.mainrole.OnDiscardTile(mjcore.MJPai.Create(N[0].hu_tile), 0, 0) :
                                        O.DesktopMgr.Inst.players[O.DesktopMgr.Inst.seat2LocalPosition(_)].recordDiscardTile(mjcore.MJPai.Create(N[0].hu_tile), true, 0, 0);
                                })
                            if (O.DesktopMgr.Inst.lastqipai)
                                O.DesktopMgr.Inst.lastqipai.isxuezhanhu = !0;
                        } else {
                            for (var l = -1, h = [], c = 0; c < N.length; c++) {
                                var _ = N[c].seat;
                                h.push(O.DesktopMgr.Inst.seat2LocalPosition(_)), -1 === l && (l = _)
                            }
                            l >= 0 && (O.DesktopMgr.Inst.player_effects[l][game.EView.hupai_effect]), n && uiscript.UI_Huleshow.Inst.showRong(h), q += n ? 1200 : 200, Laya.timer.once(q, U, function () {
                                if (!O.DesktopMgr.Inst.isLastPaiMingPai()) O.DesktopMgr.Inst.players[O.DesktopMgr.Inst.seat2LocalPosition(O.DesktopMgr.Inst.lastpai_seat)].QiPaiNoPass();
                                else {
                                    O.DesktopMgr.Inst.lastqipai.lastColor = new Laya.Vector4(1, .78, .78, .4);
                                    // O.DesktopMgr.Inst.lastqipai.model.meshRender.sharedMaterial.setColor(caps.Cartoon.COLOR, O.DesktopMgr.Inst.lastqipai.lastColor);
                                    // O.DesktopMgr.Inst.lastqipai.model.meshRender.sharedMaterial.blend = 2;
                                    O.DesktopMgr.Inst.lastqipai.val.type += 10;
                                    O.DesktopMgr.Inst.lastqipai.isxuezhanhu = !0, O.DesktopMgr.Inst.lastqipai.OnChoosedPai()
                                }
                                for (var e = 0; e < N.length; e++) {
                                    var i = N[e].seat;
                                    var s = mjcore.MJPai.Create(N[0].hu_tile);
                                    O.DesktopMgr.Inst.players[O.DesktopMgr.Inst.seat2LocalPosition(i)].AddBabei(s, true, 1);
                                    //i==t.DesktopMgr.Inst.seat?t.DesktopMgr.Inst.mainrole.onBabei(mjcore.MJPai.Create(a[e].hu_tile),0,0):t.DesktopMgr.Inst.players[t.DesktopMgr.Inst.seat2LocalPosition(i)].recordBabei(mjcore.MJPai.Create(a[e].hu_tile),true,0,0);
                                    if (e !== 0) O.DesktopMgr.Inst.lastqipai.lastColor = new Laya.Vector4(1, .78, .78, .4);
                                    else O.DesktopMgr.Inst.lastqipai.lastColor = new Laya.Vector4(1, .78, .78, 1);
                                    // if (O.DesktopMgr.Inst.lastqipai) O.DesktopMgr.Inst.lastqipai.model.meshRender.sharedMaterial.setColor(caps.Cartoon.COLOR, O.DesktopMgr.Inst.lastqipai.lastColor);
                                    // if (O.DesktopMgr.Inst.lastqipai) O.DesktopMgr.Inst.lastqipai.model.meshRender.sharedMaterial.blend = 2;
                                    if (O.DesktopMgr.Inst.lastqipai) O.DesktopMgr.Inst.lastqipai.val.type += 10;
                                    if (O.DesktopMgr.Inst.lastqipai) O.DesktopMgr.Inst.lastqipai.isxuezhanhu = !0, O.DesktopMgr.Inst.lastqipai.OnChoosedPai()
                                }
                            })
                        }
                        Laya.timer.once(q, U, function () {
                            for (var n = 0, r = O.DesktopMgr.Inst.players; n < r.length; n++) {
                                r[n].hideLiqi()
                            }
                            K.liqi ? O.ActionLiqi.play(K.liqi) : uiscript.UI_DesktopInfo.Inst.setLiqibang(0);
                            for (var s = [], o = 0; o < K.delta_scores.length; o++) {
                                var l = {
                                    title_id: 0,
                                    score: 0,
                                    delta: 0
                                };
                                if (K.delta_scores[o] > 0) {
                                    o === O.DesktopMgr.Inst.seat, uiscript.UI_DesktopInfo.Inst.changeHeadEmo(o, "emoji_7", -1), l.delta = K.delta_scores[o];
                                    for (var h = 0, c = N; h < c.length; h++) {
                                        var _ = c[h];
                                        if (_.seat === o) {
                                            l.title_id = _.title_id;
                                            break
                                        }
                                    }
                                } else
                                    K.delta_scores[o] < 0 && (l.delta = K.delta_scores[o], uiscript.UI_DesktopInfo.Inst.changeHeadEmo(o, "emoji_8", -1));
                                l.score = K.old_scores[o], s.push(l)
                            }
                            Laya.timer.once(200, U, function () {
                                O.DesktopMgr.Inst.setScores(K.scores)
                            }), uiscript.UI_Hu_Xuezhan.Inst.showScoreChange(s)
                        }), q += 3e3, Laya.timer.once(q, U, function () {
                            O.DesktopMgr.Inst.ActionRunComplete()
                        })
                    })
                    return 4e3;
                },
                U.fastrecord = function (e) {
                    app.Log.log("ActionHule fastplay data:" + JSON.stringify(e));
                    var n = e.hules;
                    if (n[0].zimo) {
                        var a = n[0].seat;
                        O.DesktopMgr.Inst.players[O.DesktopMgr.Inst.seat2LocalPosition(a)].AddBabei(mjcore.MJPai.Create(n[0].hu_tile), true, 0);
                        a === O.DesktopMgr.Inst.seat ? O.DesktopMgr.Inst.mainrole.OnDiscardTile(mjcore.MJPai.Create(n[0].hu_tile), 0, 1) : O.DesktopMgr.Inst.players[O.DesktopMgr.Inst.seat2LocalPosition(a)].recordDiscardTile(mjcore.MJPai.Create(n[0].hu_tile), true, 0, 1);
                        if (O.DesktopMgr.Inst.lastqipai) O.DesktopMgr.Inst.lastqipai.isxuezhanhu = !0, O.DesktopMgr.Inst.lastqipai.OnChoosedPai();
                    } else {
                        if (!O.DesktopMgr.Inst.isLastPaiMingPai()) O.DesktopMgr.Inst.players[O.DesktopMgr.Inst.seat2LocalPosition(O.DesktopMgr.Inst.lastpai_seat)].QiPaiNoPass();
                        else {
                            O.DesktopMgr.Inst.lastqipai.lastColor = new Laya.Vector4(1, .78, .78, .4);
                            // O.DesktopMgr.Inst.lastqipai.model.meshRender.sharedMaterial.setColor(caps.Cartoon.COLOR, O.DesktopMgr.Inst.lastqipai.lastColor);
                            // O.DesktopMgr.Inst.lastqipai.model.meshRender.sharedMaterial.blend = 2;
                            O.DesktopMgr.Inst.lastqipai.val.type += 10;
                            O.DesktopMgr.Inst.lastqipai.isxuezhanhu = !0, O.DesktopMgr.Inst.lastqipai.OnChoosedPai()
                        }
                        for (let s = 0; s < n.length; s++) {
                            var o = n[s].seat;
                            O.DesktopMgr.Inst.players[O.DesktopMgr.Inst.seat2LocalPosition(o)].AddBabei(mjcore.MJPai.Create(n[s].hu_tile), true, 0);
                            //o==t.DesktopMgr.Inst.seat?t.DesktopMgr.Inst.mainrole.onBabei(mjcore.MJPai.Create(n[s].hu_tile),0,1):t.DesktopMgr.Inst.players[t.DesktopMgr.Inst.seat2LocalPosition(o)].recordBabei(mjcore.MJPai.Create(n[s].hu_tile),true,0,1);
                            if (s !== 0)
                                O.DesktopMgr.Inst.lastqipai.lastColor = new Laya.Vector4(1, .78, .78, .4);
                            else
                                O.DesktopMgr.Inst.lastqipai.lastColor = new Laya.Vector4(1, .78, .78, 1);
                            // if (O.DesktopMgr.Inst.lastqipai)
                            //     O.DesktopMgr.Inst.lastqipai.model.meshRender.sharedMaterial.setColor(caps.Cartoon.COLOR, O.DesktopMgr.Inst.lastqipai.lastColor);
                            // if (O.DesktopMgr.Inst.lastqipai)
                            //     O.DesktopMgr.Inst.lastqipai.model.meshRender.sharedMaterial.blend = 2;
                            if (O.DesktopMgr.Inst.lastqipai)
                                O.DesktopMgr.Inst.lastqipai.val.type += 10;
                            if (O.DesktopMgr.Inst.lastqipai)
                                O.DesktopMgr.Inst.lastqipai.isxuezhanhu = !0, O.DesktopMgr.Inst.lastqipai.OnChoosedPai()
                        }
                    }
                    for (var l = 0, h = O.DesktopMgr.Inst.players; l < h.length; l++) {
                        var c = h[l];
                        c.hideLiqi()
                    }
                    e.liqi ? O.ActionLiqi.fastplay(e.liqi, 0) :
                        uiscript.UI_DesktopInfo.Inst.setLiqibang(0), O.DesktopMgr.Inst.setScores(e.scores)
                }
                ,
                U
        }(O.ActionBase)
    }(view || (view = {}));
    // 自创函数: ActionHuleXueLiuEnd, 改编自 ActionHuleXueZhanEnd
    !function (O) {
        O.ActionHuleXueLiuEnd = function (K) {
            function U() {
                return null !== K && K.apply(this, arguments) || this
            }

            return __extends(U, K),
                U.record = function (e) {
                    var i = this, n = 1;
                    e.doras && O.DesktopMgr.Inst.WhenDoras(e.doras, 0);
                    Laya.timer.once(100, this, function () {
                        var a = e.hules, r = 0;
                        if (e.hules_history) Laya.timer.once(3e3, i, function () {
                            for (var i = 0, a = e.hules_history; i < a.length; i++) {
                                var r = a[i],
                                    s = O.DesktopMgr.Inst.players[O.DesktopMgr.Inst.seat2LocalPosition(r.seat)];
                                if (s && s.already_xuezhan_hule_state) {
                                    for (var o = [], l = 0; l < r.hand.length; l++) o.push(mjcore.MJPai.Create(r.hand[l]));
                                    o = o.sort(mjcore.MJPai.Distance), s.onXuezhanEnd(o, !n)
                                }
                            }
                        })
                        if (a[0].zimo) {
                            var s = a[0].seat;
                            uiscript.UI_Huleshow.Inst.showZimo([O.DesktopMgr.Inst.seat2LocalPosition(s)]), r += n ? 1200 : 200,
                                Laya.timer.once(r, i, function () {
                                    O.DesktopMgr.Inst.players[O.DesktopMgr.Inst.seat2LocalPosition(s)].AddBabei(mjcore.MJPai.Create(a[0].hu_tile), true, 1);
                                    if (O.DesktopMgr.Inst.lastqipai) O.DesktopMgr.Inst.lastqipai.isxuezhanhu = !0, O.DesktopMgr.Inst.lastqipai.OnChoosedPai();
                                    s === O.DesktopMgr.Inst.seat ? O.DesktopMgr.Inst.mainrole.OnDiscardTile(mjcore.MJPai.Create(a[0].hu_tile), 0, 0) : O.DesktopMgr.Inst.players[O.DesktopMgr.Inst.seat2LocalPosition(s)].recordDiscardTile(mjcore.MJPai.Create(a[0].hu_tile), true, 0, 0);
                                })
                            if (O.DesktopMgr.Inst.lastqipai) O.DesktopMgr.Inst.lastqipai.isxuezhanhu = !0;
                            //if(t.DesktopMgr.Inst.lastqipai&&t.DesktopMgr.Inst.lastqipai.model.meshRender)t.DesktopMgr.Inst.lastqipai.OnChoosedPai();
                        } else {
                            for (var l = -1, h = [], c = 0; c < a.length; c++) {
                                var _ = a[c].seat;
                                h.push(O.DesktopMgr.Inst.seat2LocalPosition(_)), -1 === l && (l = _)
                            }
                            l >= 0 && (O.DesktopMgr.Inst.player_effects[l][game.EView.hupai_effect]), n && uiscript.UI_Huleshow.Inst.showRong(h), r += n ? 1200 : 200, Laya.timer.once(r, i, function () {
                                if (!O.DesktopMgr.Inst.isLastPaiMingPai())
                                    O.DesktopMgr.Inst.players[O.DesktopMgr.Inst.seat2LocalPosition(O.DesktopMgr.Inst.lastpai_seat)].QiPaiNoPass();
                                else {
                                    O.DesktopMgr.Inst.lastqipai.lastColor = new Laya.Vector4(1, .78, .78, .4);
                                    // O.DesktopMgr.Inst.lastqipai.model.meshRender.sharedMaterial.setColor(caps.Cartoon.COLOR, O.DesktopMgr.Inst.lastqipai.lastColor);
                                    // O.DesktopMgr.Inst.lastqipai.model.meshRender.sharedMaterial.blend = 2;
                                    O.DesktopMgr.Inst.lastqipai.val.type += 10;
                                    O.DesktopMgr.Inst.lastqipai.isxuezhanhu = !0, O.DesktopMgr.Inst.lastqipai.OnChoosedPai()
                                }
                                for (let e = 0; e < a.length; e++) {
                                    var i = a[e].seat;
                                    var s = mjcore.MJPai.Create(a[0].hu_tile);
                                    O.DesktopMgr.Inst.players[O.DesktopMgr.Inst.seat2LocalPosition(i)].AddBabei(s, true, 1);
                                    //i==t.DesktopMgr.Inst.seat?t.DesktopMgr.Inst.mainrole.onBabei(mjcore.MJPai.Create(a[e].hu_tile),0,0):t.DesktopMgr.Inst.players[t.DesktopMgr.Inst.seat2LocalPosition(i)].recordBabei(mjcore.MJPai.Create(a[e].hu_tile),true,0,0);
                                    if (e !== 0)
                                        O.DesktopMgr.Inst.lastqipai.lastColor = new Laya.Vector4(1, .78, .78, .4);
                                    else
                                        O.DesktopMgr.Inst.lastqipai.lastColor = new Laya.Vector4(1, .78, .78, 1);
                                    // if (O.DesktopMgr.Inst.lastqipai)
                                    //     O.DesktopMgr.Inst.lastqipai.model.meshRender.sharedMaterial.setColor(caps.Cartoon.COLOR, O.DesktopMgr.Inst.lastqipai.lastColor);
                                    // if (O.DesktopMgr.Inst.lastqipai)
                                    //     O.DesktopMgr.Inst.lastqipai.model.meshRender.sharedMaterial.blend = 2;
                                    if (O.DesktopMgr.Inst.lastqipai)
                                        O.DesktopMgr.Inst.lastqipai.val.type += 10;
                                    if (O.DesktopMgr.Inst.lastqipai)
                                        O.DesktopMgr.Inst.lastqipai.isxuezhanhu = !0, O.DesktopMgr.Inst.lastqipai.OnChoosedPai()
                                }
                            })
                        }
                        r += 2e3, Laya.timer.once(r, i, function () {
                            for (var n = 0, r = O.DesktopMgr.Inst.players; n < r.length; n++) {
                                r[n].hideLiqi()
                            }
                            e.liqi ? Laya.timer.once(2500, i, function () {
                                O.ActionLiqi.play(e.liqi)
                            }) : uiscript.UI_DesktopInfo.Inst.setLiqibang(0);
                            for (var s = [], o = 0; o < e.delta_scores.length; o++) {
                                var l = {
                                    title_id: 0,
                                    score: 0,
                                    delta: 0
                                };
                                if (e.delta_scores[o] > 0) {
                                    o === O.DesktopMgr.Inst.seat, uiscript.UI_DesktopInfo.Inst.changeHeadEmo(o, "emoji_7", -1), l.delta = e.delta_scores[o];
                                    for (var h = 0, c = a; h < c.length; h++) {
                                        var _ = c[h];
                                        if (_.seat === o) {
                                            l.title_id = _.title_id;
                                            break
                                        }
                                    }
                                } else
                                    e.delta_scores[o] < 0 && (l.delta = e.delta_scores[o], uiscript.UI_DesktopInfo.Inst.changeHeadEmo(o, "emoji_8", -1));
                                l.score = e.old_scores[o], s.push(l)
                            }
                            Laya.timer.once(200, i, function () {
                                O.DesktopMgr.Inst.setScores(e.scores)
                            }), uiscript.UI_Hu_Xuezhan.Inst.showScoreChange(s)
                        }), r += 2500, Laya.timer.once(r, this, function () {
                            for (var i = 0; i < e.allplayertiles.length; i++) {
                                for (var n = e.allplayertiles[i].split("|"), r = [], s = 0; s < n.length; s++)
                                    r.push(mjcore.MJPai.Create(n[s]));
                                r = r.sort(mjcore.MJPai.Distance), O.DesktopMgr.Inst.players[O.DesktopMgr.Inst.seat2LocalPosition(i)].Huangpai(!0, r, !1)
                            }
                        }), r += 2500, Laya.timer.once(r, i, function () {
                            uiscript.UIMgr.Inst.ShowWin(e, !1), O.DesktopMgr.Inst.ActionRunComplete()
                        })
                    })
                    return 1e5;
                },
                U.fastrecord = function (e) {
                    app.Log.log("ActionHule fastplay data:" + JSON.stringify(e));
                    O.BgmListMgr.stopBgm(), O.DesktopMgr.Inst.gameing = !1, e.muyu && O.DesktopMgr.Inst.onMuyuChange(e.muyu, !1),
                    e.doras && O.DesktopMgr.Inst.WhenDoras(e.doras, !1), O.DesktopMgr.Inst.setScores(e.scores),
                        uiscript.UIMgr.Inst.ShowWin(e, !1)
                }
                ,
                U
        }(O.ActionBase)
    }(view || (view = {}));

    var OnChoosedPai = view.ViewPai.prototype.OnChoosedPai;
    view.ViewPai.prototype.OnChoosedPai = function () {
        try {
            var K = view['ERevealState'];
            if (!view['DesktopMgr']['bianjietishi'] || this['revealState'] === K['reveal'])
                return this['ResetShow'](),
                    void 0;
            var U = view['DesktopMgr'].Inst['choosed_pai']
                , V = null;
            if (null == U || 0 !== mjcore.MJPai.Distance(this.val, U)) {
                var N = this['revealState'] === K.self ? 0.6 : 1;

                // 添加内容: lastColor
                V = this.lastColor ? this.lastColor :
                    this['isxuezhanhu'] ? new Laya['Vector4'](1, 0.78, 0.78, N) :
                        this['ispaopai'] ? new Laya['Vector4'](1, 0.78, 0.78, N) :
                            this['is_gap'] ? new Laya['Vector4'](0.6, 0.6, 0.6, N) :
                                this['ismoqie'] ? new Laya['Vector4'](0.8, 0.8, 0.8, N) : this['GetDefaultColor']();
            } else
                V = new Laya['Vector4'](0.615, 0.827, 0.976, 1);

            this['setMeshColor'](V),
            this['contianer_touming_touying'] &&
            (this['contianer_touming_touying']['getChildByName']('bg')['meshRender']['sharedMaterial']['albedoColor'] = V);
        } catch (e) {
            OnChoosedPai.call(this);
            console.error(e);
        }
    }

    uiscript.UI_Replay.prototype.doRecord = function (O) {
        try {
            var K = 0;
            switch (O.name) {
                case 'RecordNewRound':
                    K = view['ActionNewRound']['record'](O.data);
                    break;
                case 'RecordChangeTile':
                    K = view['ActionChangeTile']['record'](O.data);
                    break;
                case 'RecordSelectGap':
                    K = view['ActionSelectGap']['record'](O.data);
                    break;
                case 'RecordDiscardTile':
                    K = view['ActionDiscardTile']['record'](O.data);
                    break;
                case 'RecordDealTile':
                    K = view['ActionDealTile']['record'](O.data);
                    break;
                case 'RecordChiPengGang':
                    K = view['ActionChiPengGang']['record'](O.data);
                    break;
                case 'RecordAnGangAddGang':
                    K = view['ActionAnGangAddGang']['record'](O.data);
                    break;
                case 'RecordBaBei':
                    K = view['ActionBabei']['record'](O.data);
                    break;
                case 'RecordHule':
                    K = view['ActionHule']['record'](O.data);
                    break;
                case 'RecordLiuJu':
                    K = view['ActionLiuJu']['record'](O.data);
                    break;
                case 'RecordNoTile':
                    K = view['ActionNoTile']['record'](O.data);
                    break;
                case 'RecordHuleXueZhanMid':
                    K = view['ActionHuleXueZhanMid']['record'](O.data);
                    break;
                case 'RecordHuleXueZhanEnd':
                    K = view['ActionHuleXueZhanEnd']['record'](O.data);
                    break;
                case 'RecordGangResult':
                    K = view['ActionGangResult']['record'](O.data);
                    break;
                case 'RecordGangResultEnd':
                    K = view['ActionGangResultEnd']['record'](O.data);
                    break;
                case 'RecordRevealTile':
                    K = view['ActionRevealTile']['record'](O.data);
                    break;
                case 'RecordLockTile':
                    K = view['ActionLockTile']['record'](O.data);
                    break;
                case 'RecordUnveilTile':
                    K = view['ActionUnveilTile']['record'](O.data);
                    break;
                case 'RecordNewCard':
                    K = view['ActionNewCard']['record'](O.data);
                    break;
                case 'RecordFillAwaitingTiles':
                    K = view['ActionFillAwaitingTiles']['record'](O.data);
                    break;

                // 添加内容: RecordHuleXueLiu 和 RecordHuleXueLiuEnd
                case "RecordHuleXueLiu":
                    K = view.ActionHuleXueLiu.record(O.data);
                    break;
                case "RecordHuleXueLiuEnd":
                    K = view.ActionHuleXueLiuEnd.record(O.data)
            }
            return this['auto_play'] && (K += this['_get_autoplay_delay'](O)),
            ('RecordNewRound' === O.name || 'RecordDealTile' === O.name || view['DesktopMgr'].Inst['is_zhanxing_mode']() &&
                'RecordDiscardTile' === O.name || 'RecordFillAwaitingTiles' === O.name) && this['page_paishan']['refresh'](),
                K;
        } catch (U) {
            var V = {};
            return V['error'] = U['message'],
                V['stack'] = U['stack'],
                V['method'] = 'ui_replay doRecord',
                V.name = O.name,
                V.data = O.data,
                GameMgr.Inst['onFatalError'](V),
                1000000;
        }
    };
    uiscript.UI_Replay.prototype.doFastRecord = function (O) {
        try {
            switch (O.name) {
                case 'RecordNewRound':
                    view['ActionNewRound']['fastrecord'](O.data);
                    break;
                case 'RecordChangeTile':
                    view['ActionChangeTile']['fastrecord'](O.data);
                    break;
                case 'RecordSelectGap':
                    view['ActionSelectGap']['fastrecord'](O.data);
                    break;
                case 'RecordDiscardTile':
                    view['ActionDiscardTile']['fastrecord'](O.data);
                    break;
                case 'RecordDealTile':
                    view['ActionDealTile']['fastrecord'](O.data);
                    break;
                case 'RecordChiPengGang':
                    view['ActionChiPengGang']['fastrecord'](O.data);
                    break;
                case 'RecordAnGangAddGang':
                    view['ActionAnGangAddGang']['fastrecord'](O.data);
                    break;
                case 'RecordHule':
                    view['ActionHule']['fastrecord'](O.data);
                    break;
                case 'RecordLiuJu':
                    view['ActionLiuJu']['fastrecord'](O.data);
                    break;
                case 'RecordNoTile':
                    view['ActionNoTile']['fastrecord'](O.data);
                    break;
                case 'RecordBaBei':
                    view['ActionBabei']['fastrecord'](O.data);
                    break;
                case 'RecordHuleXueZhanMid':
                    view['ActionHuleXueZhanMid']['fastrecord'](O.data);
                    break;
                case 'RecordHuleXueZhanEnd':
                    view['ActionHuleXueZhanEnd']['fastrecord'](O.data);
                    break;
                case 'RecordRevealTile':
                    view['ActionRevealTile']['fastrecord'](O.data);
                    break;
                case 'RecordLockTile':
                    view['ActionLockTile']['fastrecord'](O.data);
                    break;
                case 'RecordUnveilTile':
                    view['ActionUnveilTile']['fastrecord'](O.data);
                    break;
                case 'RecordGangResult':
                    view['ActionGangResult']['fastrecord'](O.data);
                    break;
                case 'RecordGangResultEnd':
                    view['ActionGangResultEnd']['fastrecord'](O.data);
                    break;
                case 'RecordNewCard':
                    view['ActionNewCard']['fastrecord'](O.data);
                    break;
                case 'RecordFillAwaitingTiles':
                    view['ActionFillAwaitingTiles']['fastrecord'](O.data);
                    break;

                // 添加内容: RecordHuleXueLiu 和 RecordHuleXueLiuEnd
                case "RecordHuleXueLiu":
                    view.ActionHuleXueLiu.fastrecord(O.data);
                    break;
                case "RecordHuleXueLiuEnd":
                    view.ActionHuleXueLiuEnd.fastrecord(O.data);
            }
            ('RecordNewRound' === O.name || 'RecordDealTile' === O.name || view['DesktopMgr'].Inst['is_zhanxing_mode']() &&
                'RecordDiscardTile' === O.name || 'RecordFillAwaitingTiles' === O.name) && this['page_paishan']['refresh']();
        } catch (K) {
            var U = {};
            return U['error'] = K['message'],
                U['stack'] = K['stack'],
                U['method'] = 'ui_replay doRecord',
                U.name = O.name,
                U.data = O.data,
                GameMgr.Inst['onFatalError'](U),
                1000000;
        }
        return 0;
    }
    uiscript.UI_Replay.prototype._get_autoplay_delay = function (t) {
        switch (t.name) {
            case 'RecordNewCard':
                return 0;
            case 'RecordNewRound':
                return 0;
            case 'RecordChangeTile':
                return 500;
            case 'RecordDiscardTile':
                return 500;
            case 'RecordDealTile':
                return 500;
            case 'RecordChiPengGang':
                return 500;
            case 'RecordAnGangAddGang':
                return 200;
            case 'RecordBaBei':
                return 200;
            case 'RecordHuleXueZhanMid':
                return 500;
            case 'RecordRevealTile':
                return 500;
            case 'RecordUnveilTile':
                return 500;
            case 'RecordLockTile':
                return 1000;

            // 添加内容: RecordHuleXueLiu
            case "RecordHuleXueLiu":
                return 500;
        }
        return 0;
    }
    var seat2LocalPosition = view.DesktopMgr.prototype.seat2LocalPosition;
    var localPosition2Seat = view.DesktopMgr.prototype.localPosition2Seat;
    view.ERuleMode[view.ERuleMode.Liqi2 = 2] = "Liqi2";
    view.DesktopMgr.prototype.seat2LocalPosition = function (t) {
        if (this.rule_mode === view.ERuleMode.Liqi2) {
            if (t === this.seat)
                return 0;
            else
                return 2;
        }
        return seat2LocalPosition.call(this, t);
    }
    view.DesktopMgr.prototype.localPosition2Seat = function (t) {
        if (this.rule_mode === view.ERuleMode.Liqi2) {
            if (t === 1 || t === 3)
                return -1;
            if (t === 0)
                return this.seat;
            if (t === 2)
                return 1 - this.seat;
        }
        return localPosition2Seat.call(this, t);
    }
    view.ViewPlayer.prototype.RefreshDir = function () {
        if (-1 !== this.seat) {
            var e = new Laya.Vector4, i = 0;
            if (view.DesktopMgr.Inst.rule_mode === view.ERuleMode.Liqi3)
                i = (this.seat - view.DesktopMgr.Inst.index_ju + 3) % 3;
            if (view.DesktopMgr.Inst.rule_mode === view.ERuleMode.Liqi2)
                i = (this.seat - view.DesktopMgr.Inst.index_ju + 2) % 2;
            if (view.DesktopMgr.Inst.rule_mode === view.ERuleMode.Liqi4)
                i = (this.seat - view.DesktopMgr.Inst.index_ju + 4) % 4;
            e.z = .25 * i, e.w = 0, e.x = .25, e.y = 1, this.trans_dir.meshRender.material.tilingOffset = e
        }
    }
    Object.defineProperty(view.DesktopMgr.prototype, "player_count", {
        get: function () {
            if (this.rule_mode === view.ERuleMode.Liqi2)
                return 2;
            return this.rule_mode === view.ERuleMode.Liqi3 ? 3 : 4
        },
        enumerable: !0,
        configurable: !0
    })
    mjcore.MJPai.DoraMet = function (t, i) {
        if (t.type !== i.type)
            return !1;
        var n = i.index + 1;
        if (view.DesktopMgr.Inst.rule_mode === view.ERuleMode.Liqi2) {
            if (i.type === 3 && n === 5)
                n = 1;
            else if (i.type === 3 && n === 8)
                n = 5;
            else if (i.type === 1 && n === 2)
                n = 9;
            else if (i.type === 0 && n === 2)
                n = 9;
            else if (n === 10)
                n = 1;
        }
        if (view.DesktopMgr.Inst.rule_mode === view.ERuleMode.Liqi3) {
            if (i.type === 3 && n === 5)
                n = 1;
            else if (i.type === 3 && n === 8)
                n = 5;
            else if (i.type === 1 && n === 2)
                n = 9;
            else if (n === 10)
                n = 1;
        }
        if (view.DesktopMgr.Inst.rule_mode === view.ERuleMode.Liqi4) {
            if (i.type === 3 && n === 5)
                n = 1;
            else if (i.type === 3 && n === 8)
                n = 5;
            else if (n === 10)
                n = 1;
        }
        return n === t.index;
    }
}

function editfunction2() {
    uiscript.UI_Replay.Inst.page_paishan.setInfo = function () {
        var z = uiscript;
        if (!this['noinfo']) {
            var I = view['DesktopMgr'].Inst['left_tile_count']
                , C = view['DesktopMgr'].Inst.dora['length'];
            view['DesktopMgr'].Inst['is_zhanxing_mode']() && (I -= z['UI_Astrology'].Inst['getTileCount']());
            var r = view['DesktopMgr'].Inst['get_gang_count']()
                , B = view['DesktopMgr'].Inst['get_babei_count']()
                , W = r + B;
            W > 0 && view['DesktopMgr'].Inst['waiting_lingshang_deal_tile'] && W--;
            var R = 14;

            // 添加内容: 二人麻将王牌18张
            if (view.DesktopMgr.Inst.rule_mode === view.ERuleMode.Liqi2)
                R = 18;

            view['DesktopMgr'].Inst['is_chuanma_mode']() && (W = 0,
                R = 0);
            var L = view['DesktopMgr'].Inst['sha256'] ? view['DesktopMgr'].Inst['rule_mode'] === view['ERuleMode']['Liqi3'] ? 40 : view['DesktopMgr'].Inst['is_wanxiangxiuluo_mode']() ? 49 : 53 : 0
                , G = this['tile_count'] - W - R - L;
            0 > G && (G = 0);
            for (var T = this['tiles'][0].me['width'], Z = this['tiles'][0].me['height'] + 5, U = view['DesktopMgr'].Inst['index_ju'],
                     P = view['DesktopMgr'].Inst['rule_mode'] === view['ERuleMode']['Liqi3'] ? 3 :
                         // 添加内容: 二人麻将玩家数2
                         view['DesktopMgr'].Inst['rule_mode'] === view['ERuleMode']['Liqi2'] ? 2 : 4, v = (view['DesktopMgr'].Inst.seat - U + P) % P, M = 0; L > M; M++) {
                var m = 0;
                m += 2 + M % 12 * T + 5 * Math['floor'](M % 12 / 4),
                    this['tiles'][M].pos(m, Math['floor'](M / 12) * Z),
                    12 * P > M && Math['floor'](M / 4) % P === v ? this['tiles'][M]['setYellowState']() : M >= 12 * P && (M - L + P + 1) % P === v ? this['tiles'][M]['setYellowState']() : this['tiles'][M]['setFiltersState'](z['EUIPaiFilterState'].gray);
            }
            for (var X = L ? Math.ceil(L / 12) * Z + 20 : 0, M = 0; G > M; M++) {
                var V = M + L
                    , m = 0;
                view['DesktopMgr'].Inst['rule_mode'] === view['ERuleMode']['Liqi3'] ? m = M % 12 * T + 5 * Math['floor'](M % 12 / 3) : m += 2 + M % 12 * T + 5 * Math['floor'](M % 12 / 4),
                    this['tiles'][V].pos(m, Math['floor'](M / 12) * Z + X),
                    I >= G - M ? this['tiles'][V]['setFiltersState'](z['EUIPaiFilterState'].none) : this['tiles'][V]['setFiltersState'](z['EUIPaiFilterState'].gray);
            }
            X += Math.ceil(G / 12) * Z + 20;
            for (var M = G + L; M < this['tile_count']; M++) {
                var N = this['tiles'][M]
                    , b = (M - G - L) % 12 * T
                    , d = Math['floor']((M - G - L) / 12) * Z + X;
                N.pos(b, d),
                    N['setFiltersState'](z['EUIPaiFilterState'].none);
            }
            for (var f = view['DesktopMgr'].Inst['rule_mode'] === view['ERuleMode']['Liqi3'] ? 8 :
                // 添加内容: 二人麻将岭上牌12张
                view['DesktopMgr'].Inst['rule_mode'] === view['ERuleMode']['Liqi2'] ? 12 :
                    4, M = 0; C > M; M++)
                this['tiles'][this['tile_count'] - f - 1 - 2 * M]['setFiltersState'](z['EUIPaiFilterState'].dora),
                    this['tiles'][this['tile_count'] - f - 2 - 2 * M]['setFiltersState'](z['EUIPaiFilterState']['lidora']);
            for (var M = 0; W > M; M++)
                this['tiles'][this['tile_count'] - 1 - M]['setFiltersState'](z['EUIPaiFilterState'].gray);
            X += Math.ceil((this['tile_count'] - G - L) / 12) * Z,
                this['container_input'].y = X + 80,
                view['DesktopMgr'].Inst.salt ? (this['container_salt'].y = X + 290,
                    this['container_salt']['visible'] = !0,
                    this['input_salt'].text = view['DesktopMgr'].Inst.salt) : (this['container_salt'].y = X + 0,
                    this['container_salt']['visible'] = !1),
                this['content']['refresh']();
        }
    }
}
