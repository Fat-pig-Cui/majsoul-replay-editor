// 修正6/9/12赤的暗杠
!function (O) {
    O['ActionAnGangAddGang'] = function (K) {
        function U() {
            return null !== K && K['apply'](this, arguments) || this;
        }

        return __extends(U, K),
            U.play = function (K) {
                app.Log.log('ActionAnGangAddGang play data:' + JSON['stringify'](K));
                var U = K.seat
                    , V = O['DesktopMgr'].Inst['seat2LocalPosition'](U);
                if (K['doras'] && O['DesktopMgr'].Inst['WhenDoras'](K['doras'], !1),
                K.type === mjcore['E_Ming']['gang_ming'])
                    O['DesktopMgr'].Inst['players'][V]['PlaySound']('act_kan'),
                        Laya['timer'].once(500, this, function () {
                            K.muyu && O['DesktopMgr'].Inst['onMuyuChange'](K.muyu, !0),
                                O['DesktopMgr'].Inst['players'][V]['AddGang'](mjcore['MJPai']['Create'](K['tiles'])),
                                O['DesktopMgr'].Inst['waiting_lingshang_deal_tile'] = !0;
                        });
                else {
                    var N = new mjcore['MJMing']();
                    N.type = mjcore['E_Ming']['gang_an'],
                        N.from = [U, U, U, U],
                        N.pais = this['getAngangTile'](K['tiles'], U);
                    for (var q = [], _ = 0; _ < N.pais['length']; _++)
                        q.push(-1);
                    Laya['timer'].once(500, this, function () {
                        K.muyu && O['DesktopMgr'].Inst['onMuyuChange'](K.muyu, !0),
                            O['DesktopMgr'].Inst['players'][V]['AddMing'](N, q),
                            O['DesktopMgr'].Inst['waiting_lingshang_deal_tile'] = !0;
                    }),
                        O['DesktopMgr'].Inst['players'][V]['PlaySound']('act_kan');
                }
                K['operation'] && Laya['timer'].once(600, this, function () {
                    O['ActionOperation'].play(K['operation']);
                }),
                void 0 !== K['zhenting'] && uiscript['UI_TingPai'].Inst['setZhengting'](K['zhenting']),
                U === O['DesktopMgr'].Inst.seat && uiscript['UI_TingPai'].Inst['setData1'](K, !1),
                    uiscript['UI_DesktopInfo'].Inst['changeHeadEmo'](U, 'emoji_5', 2000),
                    O['DesktopMgr'].Inst['mainrole']['revertAllPais']();
            }
            ,
            U['fastplay'] = function (K, U) {
                app.Log.log('ActionAnGangAddGang fastplay data:' + JSON['stringify'](K) + ' usetime:' + U);
                var V = K.seat
                    , N = O['DesktopMgr'].Inst['seat2LocalPosition'](V);
                if (K['doras'] && O['DesktopMgr'].Inst['WhenDoras'](K['doras'], !0),
                K.type === mjcore['E_Ming']['gang_ming'])
                    O['DesktopMgr'].Inst['players'][N]['AddGang'](mjcore['MJPai']['Create'](K['tiles']), !1);
                else {
                    var q = new mjcore['MJMing']();
                    q.type = mjcore['E_Ming']['gang_an'],
                        q.from = [V, V, V, V],
                        q.pais = this['getAngangTile'](K['tiles'], V);
                    for (var _ = [], h = 0; h < q.pais['length']; h++)
                        _.push(-1);
                    O['DesktopMgr'].Inst['players'][N]['AddMing'](q, _, !1);
                }
                K['operation'] && -1 != U && Laya['timer'].once(500, this, function () {
                    O['ActionOperation'].play(K['operation'], U);
                }),
                void 0 !== K['zhenting'] && uiscript['UI_TingPai'].Inst['setZhengting'](K['zhenting']),
                V === O['DesktopMgr'].Inst.seat && uiscript['UI_TingPai'].Inst['setData1'](K, !0),
                K.muyu && O['DesktopMgr'].Inst['onMuyuChange'](K.muyu, !1),
                    O['DesktopMgr'].Inst['waiting_lingshang_deal_tile'] = !0;
            }
            ,
            U['record'] = function (K, U) {
                void 0 === U && (U = 0),
                    app.Log.log('ActionAnGangAddGang record data:' + JSON['stringify'](K)),
                K['doras'] && O['DesktopMgr'].Inst['WhenDoras'](K['doras'], !1);
                var V = K.seat
                    , N = O['DesktopMgr'].Inst['seat2LocalPosition'](V);
                if (K.type === mjcore['E_Ming']['gang_ming'])
                    O['DesktopMgr'].Inst['players'][N]['PlaySound']('act_kan'),
                        Laya['timer'].once(500, this, function () {
                            K.muyu && O['DesktopMgr'].Inst['onMuyuChange'](K.muyu, !0),
                                O['DesktopMgr'].Inst['players'][N]['AddGang'](mjcore['MJPai']['Create'](K['tiles'])),
                                O['DesktopMgr'].Inst['waiting_lingshang_deal_tile'] = !0;
                        });
                else {
                    var q = new mjcore['MJMing']();
                    q.type = mjcore['E_Ming']['gang_an'],
                        q.from = [V, V, V, V],
                        q.pais = this['getAngangTile'](K['tiles'], V);
                    for (var _ = [], h = 0; h < q.pais['length']; h++)
                        _.push(-1);
                    Laya['timer'].once(500, this, function () {
                        K.muyu && O['DesktopMgr'].Inst['onMuyuChange'](K.muyu, !0),
                            O['DesktopMgr'].Inst['players'][N]['AddMing'](q, _),
                            O['DesktopMgr'].Inst['waiting_lingshang_deal_tile'] = !0;
                    }),
                        O['DesktopMgr'].Inst['players'][N]['PlaySound']('act_kan');
                }
                if (uiscript['UI_DesktopInfo'].Inst['changeHeadEmo'](V, 'emoji_5', 2000),
                O['DesktopMgr'].Inst.mode === O['EMJMode']['live_broadcast'] && uiscript['UI_Live_Broadcast'].Inst['during_play'] && K['operations'])
                    for (var h = 0; h < K['operations']['length']; h++)
                        O['ActionOperation'].ob(K['operations'][h], U, 450);
                return 1700;
            }
            ,
            U['fastrecord'] = function (K, U) {
                void 0 === U && (U = -1),
                    app.Log.log('ActionAnGangAddGang fastrecord data:' + JSON['stringify'](K)),
                K['doras'] && O['DesktopMgr'].Inst['WhenDoras'](K['doras'], !0);
                var V = K.seat
                    , N = O['DesktopMgr'].Inst['seat2LocalPosition'](V);
                if (K.type === mjcore['E_Ming']['gang_ming'])
                    O['DesktopMgr'].Inst['players'][N]['AddGang'](mjcore['MJPai']['Create'](K['tiles']), !1);
                else {
                    var q = new mjcore['MJMing']();
                    q.type = mjcore['E_Ming']['gang_an'],
                        q.from = [V, V, V, V],
                        q.pais = this['getAngangTile'](K['tiles'], V);
                    for (var _ = [], h = 0; h < q.pais['length']; h++)
                        _.push(-1);
                    O['DesktopMgr'].Inst['players'][N]['AddMing'](q, _, !1);
                }
                if (O['DesktopMgr'].Inst.mode === O['EMJMode']['live_broadcast'] && uiscript['UI_Live_Broadcast'].Inst['during_play'] && U >= 0 && K['operations'])
                    for (var h = 0; h < K['operations']['length']; h++)
                        O['ActionOperation'].ob(K['operations'][h], U, 450);
                O['DesktopMgr'].Inst['waiting_lingshang_deal_tile'] = !0,
                K.muyu && O['DesktopMgr'].Inst['onMuyuChange'](K.muyu, !1);
            }
            ,
            U['getAngangTile'] = function (K, U) {
                var V = [];
                if (O['DesktopMgr'].Inst['is_chuanma_mode']() || O['DesktopMgr'].Inst['is_tianming_mode']() ||
                    '0' !== K['charAt'](0) && '5' !== K['charAt'](0) || 'z' === K['charAt'](1))
                    if (O['DesktopMgr'].Inst['is_tianming_mode']()) {
                        var N = O['DesktopMgr'].Inst['seat2LocalPosition'](U)
                            , q = O['DesktopMgr'].Inst['players'][N]
                            , _ = 0;
                        if (('0' === K['charAt'](0) || '5' === K['charAt'](0)) && 'z' !== K['charAt'](1) && (_ = 1,
                            O['DesktopMgr'].Inst['game_config'])) {
                            var h = O['DesktopMgr'].Inst['game_config'].mode;
                            if (h && h['extendinfo']) {
                                var t = JSON['parse'](h['extendinfo']);
                                if (t && null != t['dora_count'])
                                    switch (t['dora_count']) {
                                        case 0:
                                            _ = 0;
                                            break;
                                        case 2:
                                            _ = 1;
                                            break;
                                        case 3:
                                            _ = 1;
                                            break;
                                        case 4:
                                            _ = 'p' === K['charAt'](1) ? 2 : 1;
                                            break;

                                        // 添加 6/9/12 赤的情况
                                        case 6:
                                            _ = 2;
                                            break;
                                        case 9:
                                            _ = 3;
                                            break;
                                        case 12:
                                            _ = 4;
                                            break;
                                    }
                            }
                            if (h && h['detail_rule'] && h['detail_rule'] && null != h['detail_rule']['dora_count'])
                                switch (h['detail_rule']['dora_count']) {
                                    case 0:
                                        _ = 0;
                                        break;
                                    case 2:
                                        _ = 1;
                                        break;
                                    case 3:
                                        _ = 1;
                                        break;
                                    case 4:
                                        _ = 'p' === K['charAt'](1) ? 2 : 1;
                                        break;

                                    // 添加 6/9/12 赤的情况
                                    case 6:
                                        _ = 2;
                                        break;
                                    case 9:
                                        _ = 3;
                                        break;
                                    case 12:
                                        _ = 4;
                                        break;
                                }
                        }
                        var X = mjcore['MJPai']['Create'](K)
                            , m = 0
                            , y = 0;
                        if (0 === N)
                            for (var w = 0, A = q.hand; w < A['length']; w++) {
                                var l = A[w];
                                l.val['numValue']() === X['numValue']() && l.val['touming'] && (l.val.dora ? (_--,
                                    y++) : m++);
                            }
                        else
                            for (var r = 0, i = q.hand; r < i['length']; r++) {
                                var l = i[r];
                                l.val['numValue']() === X['numValue']() && l.val['touming'] && (l.val.dora ? (_--,
                                    y++) : m++);
                            }
                        for (var Q = 0; 4 > Q; Q++) {
                            var u = mjcore['MJPai']['Create'](K);
                            u.dora = !1,
                                u['touming'] = !1,
                                V.push(u);
                        }
                        for (var j = [1, 2, 0, 3], Q = 0; Q < Math.min(y + m + _, 4); Q++)
                            y > Q ? (V[j[Q]].dora = !0,
                                V[j[Q]]['touming'] = !0) : y + m > Q ? V[j[Q]]['touming'] = !0 : V[j[Q]].dora = !0;
                    } else
                        for (var Q = 0; 4 > Q; Q++) {
                            var X = mjcore['MJPai']['Create'](K);
                            O['DesktopMgr'].Inst['is_jiuchao_mode']() && (X['touming'] = 3 !== Q),
                                V.push(X);
                        }
                else {
                    var _ = 1;
                    if (O['DesktopMgr'].Inst['game_config']) {
                        var h = O['DesktopMgr'].Inst['game_config'].mode;
                        if (h && h['extendinfo']) {
                            var t = JSON['parse'](h['extendinfo']);
                            if (t && null != t['dora_count'])
                                switch (t['dora_count']) {
                                    case 0:
                                        _ = 0;
                                        break;
                                    case 2:
                                        _ = 1;
                                        break;
                                    case 3:
                                        _ = 1;
                                        break;
                                    case 4:
                                        _ = 'p' === K['charAt'](1) ? 2 : 1;
                                        break;

                                    // 添加 6/9/12 赤的情况
                                    case 6:
                                        _ = 2;
                                        break;
                                    case 9:
                                        _ = 3;
                                        break;
                                    case 12:
                                        _ = 4;
                                        break;
                                }
                        }
                        if (h && h['detail_rule'] && h['detail_rule'] && null != h['detail_rule']['dora_count'])
                            switch (h['detail_rule']['dora_count']) {
                                case 0:
                                    _ = 0;
                                    break;
                                case 2:
                                    _ = 1;
                                    break;
                                case 3:
                                    _ = 1;
                                    break;
                                case 4:
                                    _ = 'p' === K['charAt'](1) ? 2 : 1;
                                    break;

                                // 添加 6/9/12 赤的情况
                                case 6:
                                    _ = 2;
                                    break;
                                case 9:
                                    _ = 3;
                                    break;
                                case 12:
                                    _ = 4;
                                    break;
                            }
                    }
                    /* 原文 在 if (O['DesktopMgr'].Inst['game_config']) 之后

                    for (var Q = 0; 4 > Q; Q++) {
                        var X = mjcore['MJPai']['Create'](K);
                        O['DesktopMgr'].Inst['is_jiuchao_mode']() && (X['touming'] = 3 !== Q),
                            X.dora = 0 === Q ? !1 : _ >= Q,
                            V.push(X);
                    }
                    */
                    // 贪心策略: 优先杠出赤宝牌
                    var N = O['DesktopMgr'].Inst['seat2LocalPosition'](U)
                        , q = O['DesktopMgr'].Inst['players'][N]
                    var X = mjcore['MJPai']['Create'](K);
                    var dora_cnt = 0;

                    for (var w = 0, A = q.hand; w < A['length']; w++) {
                        if (dora_cnt === 4)
                            break;
                        if (A[w].val['numValue']() === X['numValue']() && A[w].val.dora)
                            dora_cnt++;
                    }
                    for (var Q = 0; Q < 4; Q++)
                        V.push(mjcore['MJPai']['Create'](K));
                    if (O['DesktopMgr'].Inst['is_jiuchao_mode']())
                        V[0]['touming'] = V[1]['touming'] = V[2]['touming'] = true;
                    switch (dora_cnt) {
                        case 4:
                            V[0].dora = true;
                        case 3:
                            V[3].dora = true;
                        case 2:
                            V[2].dora = true;
                        case 1:
                            V[1].dora = true;
                    }
                }
                return O['DesktopMgr'].Inst['waiting_lingshang_deal_tile'] = !0,
                    V;
            }
            ,
            U;
    }(O['ActionBase']);
}(view || (view = {}));
