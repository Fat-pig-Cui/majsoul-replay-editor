'use strict';

function editfunction() {
    // ActionDiscardTile 改动: 添加 kailiqi
    view.ActionDiscardTile.record = function (K, U) {
        var O = view;

        void 0 === U && (U = 0),
            app.Log.log('ActionDiscardTile record data:' + JSON.stringify(K));
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
    view.ActionDiscardTile.fastrecord = function (K, U) {
        var O = view;

        void 0 === U && (U = -1),
            app.Log.log('ActionDiscardTile fastrecord data:' + JSON['stringify'](K)),
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

    // ActionChiPengGang 改动: 添加听牌变化
    view.ActionChiPengGang.record = function (X, A) {
        var Q = view;

        void 0 === A && (A = 0),
            app.Log.log('ActionChiPengGang record data:' + JSON['stringify'](X));
        var F = X.seat
            , E = new mjcore['MJMing']();
        E.type = X.type,
            E.from = X['froms'],
            E.pais = [];

        // 添加听牌
        X['tingpais'] && view['DesktopMgr'].Inst['setTingpai'](X.seat, X['tingpais']);

        for (var I = 0; I < X['tiles']['length']; I++) {
            var d = mjcore['MJPai']['Create'](X['tiles'][I]);
            Q['DesktopMgr'].Inst['is_tianming_mode']() && d['touming'] && X['froms'][I] !== F && (d['touming'] = !1),
                E.pais.push(d);
        }
        for (var S = [], I = 0; I < E.pais['length']; I++)
            !X['tile_states'] || X['tile_states']['length'] <= I ? S.push(0) : S.push(X['tile_states'][I]);
        Laya['timer'].once(600, this, function () {
            X.muyu && Q['DesktopMgr'].Inst['onMuyuChange'](X.muyu, !0),
                Q['DesktopMgr'].Inst['players'][Q['DesktopMgr'].Inst['seat2LocalPosition'](Q['DesktopMgr'].Inst['lastpai_seat'])]['QiPaiNoPass'](),
                Q['DesktopMgr'].Inst['players'][Q['DesktopMgr'].Inst['seat2LocalPosition'](F)]['AddMing'](E, S),
            E.type === mjcore['E_Ming']['gang_ming'] && (Q['DesktopMgr'].Inst['waiting_lingshang_deal_tile'] = !0);
        });
        var P = ''
            , B = '';
        switch (E.type) {
            case mjcore['E_Ming'].kezi:
                P = 'emoji_4',
                    B = 'emoji_3';
                break;
            case mjcore['E_Ming']['shunzi']:
                P = 'emoji_2',
                    B = 'emoji_1';
                break;
            case mjcore['E_Ming']['gang_ming']:
                P = 'emoji_6',
                    B = 'emoji_5';
        }
        uiscript['UI_DesktopInfo'].Inst['changeHeadEmo'](Q['DesktopMgr'].Inst['index_player'], P, 2000),
            Q['DesktopMgr'].Inst['index_player'] = F,
            uiscript['UI_DesktopInfo'].Inst['changeHeadEmo'](Q['DesktopMgr'].Inst['index_player'], B, 2000),
            Q['DesktopMgr'].Inst['RefreshPlayerIndicator'](),
        X.liqi && Q['ActionLiqi']['record'](X.liqi),
        X['liqibang'] && uiscript['UI_DesktopInfo'].Inst['setLiqibang'](X['liqibang']);
        var m = '';
        switch (E.type) {
            case mjcore['E_Ming']['shunzi']:
                m = 'act_chi';
                break;
            case mjcore['E_Ming']['gang_ming']:
            case mjcore['E_Ming']['gang_an']:
                m = 'act_kan';
                break;
            case mjcore['E_Ming'].kezi:
                m = 'act_pon';
        }
        var H = Q['DesktopMgr'].Inst['players'][Q['DesktopMgr'].Inst['seat2LocalPosition'](F)]
            , Y = H['score'];
        return X['scores'] && X['scores']['length'] > 0 && Q['DesktopMgr'].Inst['setScores'](X['scores']),
            H['PlaySound'](m, H['score'] - Y),
        Q['DesktopMgr'].Inst.mode === Q['EMJMode']['live_broadcast'] && uiscript['UI_Live_Broadcast'].Inst['during_play'] && X['operation'] && Q['ActionOperation'].ob(X['operation'], A, 500),
        X['yongchang'] && uiscript['UI_DesktopInfo'].Inst['SetYongChangRate'](Q['DesktopMgr'].Inst['seat2LocalPosition'](X['yongchang'].seat), X['yongchang']['moqie_count'], X['yongchang']['moqie_bonus'], X['yongchang']['shouqie_count'], X['yongchang']['shouqie_bonus'], !0),
        X['hun_zhi_yi_ji_info'] && uiscript['UI_DesktopInfo'].Inst['SetHunZhiContinueDealCount'](Q['DesktopMgr'].Inst['seat2LocalPosition'](X['hun_zhi_yi_ji_info'].seat), X['hun_zhi_yi_ji_info']['continue_deal_count'], X['hun_zhi_yi_ji_info']['overload'], !0),
            1200;
    }
    view.ActionChiPengGang.fastrecord = function (X, A) {
        var Q = view;

        void 0 === A && (A = -1),
            app.Log.log('ActionChiPengGang fastrecord data:' + JSON['stringify'](X));
        var F = X.seat
            , E = new mjcore['MJMing']();
        E.type = X.type,
            E.from = X['froms'],
            E.pais = [];

        // 添加听牌
        X['tingpais'] && view['DesktopMgr'].Inst['setTingpai'](X.seat, X['tingpais']);

        for (var I = 0; I < X['tiles']['length']; I++) {
            var d = mjcore['MJPai']['Create'](X['tiles'][I]);
            Q['DesktopMgr'].Inst['is_tianming_mode']() && d['touming'] && X['froms'][I] !== F && (d['touming'] = !1),
                E.pais.push(d);
        }
        for (var S = [], I = 0; I < E.pais['length']; I++)
            !X['tile_states'] || X['tile_states']['length'] <= I ? S.push(0) : S.push(X['tile_states'][I]);
        X.muyu && Q['DesktopMgr'].Inst['onMuyuChange'](X.muyu, !1),
            Q['DesktopMgr'].Inst['players'][Q['DesktopMgr'].Inst['seat2LocalPosition'](Q['DesktopMgr'].Inst['lastpai_seat'])]['QiPaiNoPass'](),
            Q['DesktopMgr'].Inst['players'][Q['DesktopMgr'].Inst['seat2LocalPosition'](F)]['AddMing'](E, S, !1),
        E.type === mjcore['E_Ming']['gang_ming'] && (Q['DesktopMgr'].Inst['waiting_lingshang_deal_tile'] = !0),
        X['scores'] && X['scores']['length'] > 0 && Q['DesktopMgr'].Inst['setScores'](X['scores']),
        X['liqibang'] && uiscript['UI_DesktopInfo'].Inst['setLiqibang'](X['liqibang']),
            Q['DesktopMgr'].Inst['index_player'] = F,
            Q['DesktopMgr'].Inst['RefreshPlayerIndicator'](),
        X.liqi && Q['ActionLiqi']['fastrecord'](X.liqi),
        X['yongchang'] && uiscript['UI_DesktopInfo'].Inst['SetYongChangRate'](Q['DesktopMgr'].Inst['seat2LocalPosition'](X['yongchang'].seat), X['yongchang']['moqie_count'], X['yongchang']['moqie_bonus'], X['yongchang']['shouqie_count'], X['yongchang']['shouqie_bonus'], !1),
        X['hun_zhi_yi_ji_info'] && uiscript['UI_DesktopInfo'].Inst['SetHunZhiContinueDealCount'](Q['DesktopMgr'].Inst['seat2LocalPosition'](X['hun_zhi_yi_ji_info'].seat), X['hun_zhi_yi_ji_info']['continue_deal_count'], X['hun_zhi_yi_ji_info']['overload'], !1),
        Q['DesktopMgr'].Inst.mode === Q['EMJMode']['live_broadcast'] && uiscript['UI_Live_Broadcast'].Inst['during_play'] && A >= 0 && X['operation'] && Q['ActionOperation'].ob(X['operation'], A, 500);
    }

    // ActionAnGangAddGang 改动: 添加听牌变化
    view.ActionAnGangAddGang.record = function (K, U) {
        var O = view;

        void 0 === U && (U = 0),
            app.Log.log('ActionAnGangAddGang record data:' + JSON['stringify'](K)),
        K['doras'] && O['DesktopMgr'].Inst['WhenDoras'](K['doras'], !1);

        // 添加听牌
        K['tingpais'] && O['DesktopMgr'].Inst['setTingpai'](K.seat, K['tingpais']);

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
    view.ActionAnGangAddGang.fastrecord = function (K, U) {
        var O = view;

        void 0 === U && (U = -1),
            app.Log.log('ActionAnGangAddGang fastrecord data:' + JSON['stringify'](K)),
        K['doras'] && O['DesktopMgr'].Inst['WhenDoras'](K['doras'], !0);

        // 添加听牌
        K['tingpais'] && O['DesktopMgr'].Inst['setTingpai'](K.seat, K['tingpais']);

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
    // 修正6/9/12赤的暗杠
    view.ActionAnGangAddGang.getAngangTile = function (tile, seat) {
        let hand = view.DesktopMgr.Inst.players[view.DesktopMgr.Inst.seat2LocalPosition(seat)].hand;
        let mj_tile = mjcore.MJPai.Create(tile);
        let dora_cnt = 0; // 红宝牌数量

        // 贪心策略: 优先杠出赤宝牌
        for (let i = 0; i < hand.length; i++) {
            if (dora_cnt === 4)
                break;
            if (hand[i].val.numValue() === mj_tile.numValue() && hand[i].val.dora)
                dora_cnt++;
        }

        let angang_tiles = [];
        for (let i = 0; i < 4; i++) {
            let mjp = mjcore.MJPai.Create(tile);
            mjp.dora = false;
            angang_tiles.push(mjp);
        }
        if (view.DesktopMgr.Inst.is_jiuchao_mode())
            angang_tiles[0].touming = angang_tiles[1].touming = angang_tiles[2].touming = true;
        for (let i = 1; i <= dora_cnt; i++)
            angang_tiles[i % 4].dora = true;

        view.DesktopMgr.Inst.waiting_lingshang_deal_tile = true;
        return angang_tiles;
    }

    // ActionBabei 改动: 拔的牌可以是其他牌
    view.ActionBabei.record = function (K, U) {
        var O = view;

        void 0 === U && (U = 0),
            app.Log.log('ActionBabei record data:' + JSON.stringify(K)), K.doras && O.DesktopMgr.Inst.WhenDoras(K.doras, !0);
        var V = K.seat, N;

        // 添加内容: 拔的牌可以是其他牌
        N = K.tile ? mjcore.MJPai.Create(K.tile) : mjcore.MJPai.Create('4z');

        O['DesktopMgr'].Inst['players'][O['DesktopMgr'].Inst['seat2LocalPosition'](V)]['AddBabei'](N, K['moqie'], !0);
        if (!is_guobiao())
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
    view.ActionBabei.fastrecord = function (K, U) {
        var O = view;

        void 0 === U && (U = -1),
            app.Log.log('ActionBabei fastrecord data:' + JSON.stringify(K)),
        K.doras && O.DesktopMgr.Inst.WhenDoras(K.doras, !0);
        var V = K.seat, N;

        // 添加内容: 拔的牌可以是其他牌
        N = K.tile ? mjcore.MJPai.Create(K.tile) : mjcore.MJPai.Create('4z');
        // 添加听牌
        K['tingpais'] && O['DesktopMgr'].Inst['setTingpai'](K.seat, K['tingpais']);

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

    // 自创函数: ActionHuleXueLiuMid, 改编自 ActionHuleXueZhanMid
    view.ActionHuleXueLiuMid = {};
    view.ActionHuleXueLiuMid.record = function (K) {
        var O = view;

        var U = this;
        var n = 1;
        K['doras'] && O['DesktopMgr'].Inst['WhenDoras'](K['doras'], !1);
        K['tingpais'] && K.hules[0].zimo && O['DesktopMgr'].Inst['setTingpai'](K.hules[0].seat, K['tingpais']);

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
                        o === O.DesktopMgr.Inst.seat, uiscript.UI_DesktopInfo.Inst.changeHeadEmo(o, 'emoji_7', -1), l.delta = K.delta_scores[o];
                        for (var h = 0, c = N; h < c.length; h++) {
                            var _ = c[h];
                            if (_.seat === o) {
                                l.title_id = _.title_id;
                                break
                            }
                        }
                    } else
                        K.delta_scores[o] < 0 && (l.delta = K.delta_scores[o], uiscript.UI_DesktopInfo.Inst.changeHeadEmo(o, 'emoji_8', -1));
                    l.score = K.old_scores[o], s.push(l)
                }
                Laya.timer.once(200, U, function () {
                    O.DesktopMgr.Inst.setScores(K.scores)
                }), uiscript.UI_Hu_Xuezhan.Inst.showScoreChange(s)
            }), q += 3e3, Laya.timer.once(q, U, function () {
                O.DesktopMgr.Inst.ActionRunComplete()
            })
        })
        O['DesktopMgr'].Inst['waiting_lingshang_deal_tile'] = !1;
        return 4e3;
    }
    view.ActionHuleXueLiuMid.fastrecord = function (K) {
        var O = view;

        K['tingpais'] && K.hules[0].zimo && O['DesktopMgr'].Inst['setTingpai'](K.hules[0].seat, K['tingpais']);
        var n = K.hules;
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
        K.liqi ? O.ActionLiqi.fastplay(K.liqi, 0) :
            uiscript.UI_DesktopInfo.Inst.setLiqibang(0), O.DesktopMgr.Inst.setScores(K.scores)
        O['DesktopMgr'].Inst['waiting_lingshang_deal_tile'] = !1;
    }

    // 自创函数: ActionHuleXueLiuEnd, 改编自 ActionHuleXueZhanEnd
    view.ActionHuleXueLiuEnd = {};
    view.ActionHuleXueLiuEnd.record = function (K) {
        var O = view;

        var i = this, n = 1;
        K.doras && O.DesktopMgr.Inst.WhenDoras(K.doras, 0);
        Laya.timer.once(100, this, function () {
            var a = K.hules, r = 0;
            if (K.hules_history) Laya.timer.once(3e3, i, function () {
                for (var i = 0, a = K.hules_history; i < a.length; i++) {
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
                K.liqi ? Laya.timer.once(2500, i, function () {
                    O.ActionLiqi.play(K.liqi)
                }) : uiscript.UI_DesktopInfo.Inst.setLiqibang(0);
                for (var s = [], o = 0; o < K.delta_scores.length; o++) {
                    var l = {
                        title_id: 0,
                        score: 0,
                        delta: 0
                    };
                    if (K.delta_scores[o] > 0) {
                        o === O.DesktopMgr.Inst.seat, uiscript.UI_DesktopInfo.Inst.changeHeadEmo(o, 'emoji_7', -1), l.delta = K.delta_scores[o];
                        for (var h = 0, c = a; h < c.length; h++) {
                            var _ = c[h];
                            if (_.seat === o) {
                                l.title_id = _.title_id;
                                break
                            }
                        }
                    } else
                        K.delta_scores[o] < 0 && (l.delta = K.delta_scores[o], uiscript.UI_DesktopInfo.Inst.changeHeadEmo(o, 'emoji_8', -1));
                    l.score = K.old_scores[o], s.push(l)
                }
                Laya.timer.once(200, i, function () {
                    O.DesktopMgr.Inst.setScores(K.scores)
                }), uiscript.UI_Hu_Xuezhan.Inst.showScoreChange(s)
            }), r += 2500, Laya.timer.once(r, this, function () {
                for (var i = 0; i < K.allplayertiles.length; i++) {
                    for (var n = K.allplayertiles[i].split('|'), r = [], s = 0; s < n.length; s++)
                        r.push(mjcore.MJPai.Create(n[s]));
                    r = r.sort(mjcore.MJPai.Distance), O.DesktopMgr.Inst.players[O.DesktopMgr.Inst.seat2LocalPosition(i)].Huangpai(!0, r, !1)
                }
            }), r += 2500, Laya.timer.once(r, i, function () {
                uiscript.UIMgr.Inst.ShowWin(K, !1), O.DesktopMgr.Inst.ActionRunComplete()
            })
        })
        return 1e5;
    }
    view.ActionHuleXueLiuEnd.fastrecord = function (K) {
        var O = view;

        O.BgmListMgr.stopBgm(), O.DesktopMgr.Inst.gameing = !1, K.muyu && O.DesktopMgr.Inst.onMuyuChange(K.muyu, !1),
        K.doras && O.DesktopMgr.Inst.WhenDoras(K.doras, !1), O.DesktopMgr.Inst.setScores(K.scores),
            uiscript.UIMgr.Inst.ShowWin(K, !1)
    }

    // 自创函数: ActionCuohu, 改编自 ActionGangResult
    view.ActionCuohu = {};
    view.ActionCuohu.record = function (X) {
        var Q = view;
        var A = Q['DesktopMgr'].Inst['record_show_anim'],
            F = true,
            E = uiscript['UI_Replay'].Inst['enable'] && uiscript['UI_Replay'].Inst['auto_play'],
            I = 1200, d = X['CuohuInfo'], S = !1, P = [];

        if (d.zimo)
            uiscript.UI_Huleshow.Inst.showZimo([Q.DesktopMgr.Inst.seat2LocalPosition(X.seat)]);
        else
            uiscript.UI_Huleshow.Inst.showRong([Q.DesktopMgr.Inst.seat2LocalPosition(X.seat)]);

        for (var B = 0; B < d['delta_scores']['length']; B++) {
            var m = {
                title_id: 0,
                score: 0,
                delta: 0
            };
            d['delta_scores'][B] > 0 ? (uiscript['UI_DesktopInfo'].Inst['changeHeadEmo'](B, 'emoji_7', -1),
                    m['delta'] = d['delta_scores'][B], S = !0)
                : d['delta_scores'][B] < 0 && (m['delta'] = d['delta_scores'][B],
                uiscript['UI_DesktopInfo'].Inst['changeHeadEmo'](B, 'emoji_8', -1), S = !0),
                m['score'] = d['old_scores'][B],
                P.push(m);
        }
        S && (Laya['timer'].once(I, this, function () {
            uiscript['UI_Hu_Xuezhan'].Inst['showScoreChange'](P),
                Q['DesktopMgr'].Inst['setScores'](d['scores']);
        }),
            !F || A || E ? (
                    I += 2000, Q['DesktopMgr'].Inst['mainrole']['revertAllPais'](),
                        Laya['timer'].once(I, this, function () {
                            Q['DesktopMgr'].Inst['ActionRunComplete']();
                        })) :
                (uiscript['UI_Hu_Xuezhan'].Inst['showScoreChange'](P, Laya['Handler']['create'](this, function () {
                    Q['DesktopMgr'].Inst['ActionRunComplete']();
                })),
                    Q['DesktopMgr'].Inst['mainrole']['revertAllPais']()));
        return 4000;
    }
    view.ActionCuohu.fastrecord = function (X) {
        view['DesktopMgr'].Inst['setScores'](X['CuohuInfo']['scores']);
    }

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

                // 添加内容: RecordHuleXueLiuMid 和 RecordHuleXueLiuEnd
                case 'RecordHuleXueLiuMid':
                    K = view.ActionHuleXueLiuMid.record(O.data);
                    break;
                case 'RecordHuleXueLiuEnd':
                    K = view.ActionHuleXueLiuEnd.record(O.data);
                    break;
                // 添加内容: 国标麻将 RecordCuohu
                case 'RecordCuohu':
                    K = view.ActionCuohu.record(O.data);
                    break;
                default:
                    break;
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
                // GameMgr.Inst['onFatalError'](V),
                console.error(U),
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

                // 添加内容: RecordHuleXueLiuMid 和 RecordHuleXueLiuEnd
                case 'RecordHuleXueLiuMid':
                    view.ActionHuleXueLiuMid.fastrecord(O.data);
                    break;
                case 'RecordHuleXueLiuEnd':
                    view.ActionHuleXueLiuEnd.fastrecord(O.data);
                    break;
                // 添加内容: 国标麻将 RecordCuohu
                case 'RecordCuohu':
                    view.ActionCuohu.fastrecord(O.data);
                    break;
                default:
                    break;
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
                // GameMgr.Inst['onFatalError'](U),
                console.error(U),
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

            // 添加内容: RecordHuleXueLiuMid 和 RecordCuohu
            case 'RecordHuleXueLiuMid':
                return 500;
            case 'RecordCuohu':
                return 500;
            default:
                break;
        }
        return 0;
    }

    view.ERuleMode[view.ERuleMode.Liqi2 = 2] = 'Liqi2';
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

    Object.defineProperty(view.DesktopMgr.prototype, 'player_count', {
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
            // I: 牌山显示剩余牌, C: 宝牌数
            var I = view['DesktopMgr'].Inst['left_tile_count']
                , C = view['DesktopMgr'].Inst.dora['length'];
            view['DesktopMgr'].Inst['is_zhanxing_mode']() && (I -= z['UI_Astrology'].Inst['getTileCount']());
            // W: 岭上摸牌个数, R: 王牌数
            var r = view['DesktopMgr'].Inst['get_gang_count']()
                , B = is_xueliu() ? 0 : view['DesktopMgr'].Inst['get_babei_count']()
                , W = r + B;
            W > 0 && view['DesktopMgr'].Inst['waiting_lingshang_deal_tile'] && W--;
            var R = 14;

            // 添加内容: 二人麻将王牌18张
            if (view.DesktopMgr.Inst.rule_mode === view.ERuleMode.Liqi2)
                R = 18;

            view['DesktopMgr'].Inst['is_chuanma_mode']() && (W = 0, R = 0);
            // 添加内容: 国标麻将无王牌
            is_guobiao() && (R = 0);
            // L: 玩家的起手显示牌数, G: 可摸牌数
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
