# Edit Game Information (Game)

**Updated on January 3, 2026**

## Player information

`player_datas`

This variable stores data for four players, including nickname, avatar frame, character/skin, rank, and other fields.

The most commonly edited fields are `nickname` and `avatar_id` (avatar/skin, which also changes the character).

Example:

```js
player_datas[0].nickname = '电脑0';
player_datas[1].nickname = '电脑1';
player_datas[2].nickname = '电脑2';
player_datas[3].nickname = '电脑3';
player_datas[0].avatar_id = 400101;
player_datas[1].avatar_id = 400101;
player_datas[2].avatar_id = 400101;
player_datas[3].avatar_id = 400101;
```

Index 0, 1, 2, 3 refers to the initial seats (`seat`) at the start of the match (East, South, West, North respectively). The same indexing is used throughout the documentation.

Defaults match the example above (nickname equals "电脑" + seat, and the skin is the default for the character).

To change to different characters/skins consult the dictionary: `doc/0_字典.md`.

A typical generated `ret[seat]` player object contains (example):

```js
ret[seat] = {
    account_id: player_datas[seat].avatar_id * 10 + seat, // unique account id (arbitrary here)
    seat: seat, // seat index
    nickname: player_datas[seat].nickname,
    avatar_id: player_datas[seat].avatar_id,
    character: {
        charid: cfg.item_definition.skin.map_[player_datas[seat].avatar_id].character_id, // character id
        level: 5, // character friendship level
        exp: 0, // friendship exp (0 after contract)
        skin: player_datas[seat].avatar_id, // skin id (same as avatar_id)
        is_upgraded: true, // whether contracted
        extra_emoji: [10, 11, 12], // extra emojis beyond the initial set
    },
    title: player_datas[seat].title,
    level: {id: 10503, score: 4500}, // 4p ranked level
    level3: {id: 20503, score: 4500}, // 3p ranked level
    avatar_frame: player_datas[seat].avatar_frame,
    verified: player_datas[seat].verified,
    views: player_datas[seat].views, // appearance slots
}
```

## Setting the match mode

`setConfig(c)`

By default, the replay uses ranked rules and a friend-room four-player East match; see in-file comments and the dictionary for numeric meanings.

Keys in `detail_rule` that start with an underscore are custom options not present in the official Majsoul logic. Keys that end with an underscore only affect the first round of the replay. Some deeper options require reading the later documents.

Example usage:

```js
setConfig({
    category: 1, // major category: 1 = Friendly, 2 = Match, 4 = Tournament, 100 = Tutorial
    meta: {mode_id: 0}, // matchmaking room id (used when category == 2)
    mode: {
        mode: 1, // 1 = 4-player East, 2 = 4-player South, 11 = 3-player East, 12 = 3-player South
        // tens digit: 0 = 4p, 1 = 3p, 2 = 2p (requires add_function.js)
        // ones digit: 1 = East, 2 = half-round, 3 = AI mode, 0/4 = single-hand
        detail_rule: { // defaults shown are for ranked rules (most options default to false)
            _tablecloth_id: uiscript.UI_Sushe.now_desktop_id, // tablecloth (desktop)
            _mjp_id: uiscript.UI_Sushe.now_mjp_id, // tile back skin
            _mjpsurface_id: uiscript.UI_Sushe.now_mjp_surface_id, // tile face skin
            init_point: 25000, // initial points for each player (overridden by _scores_ if provided)
            dora_count: 3, // red-dora count
            fanfu: 1, // fan-fu multiplier

            _chang_ju_ben_num_: [0, 0, 0, 0], // first displayed round's chang, ju, ben and honba (last may be omitted)
            _scores_: [25000, 25000, 25000, 25000], // initial scores for the first shown hand (higher priority than init_point)
            _mainrole_: all_data.actions[0][0].data.ju, // main view on first load (default: dealer of first hand)

            xuezhandaodi: false, // Shura Battle mode
            chuanma: false, // Akaba Battle mode
            dora3_mode: false, // Treasure Tiles Frenzy mode
            begin_open_mode: false, // dealt-open-hand mode
            muyu_mode: false, // Dragon Eye mode
            jiuchao_mode: false, // Mirror Battle mode
            reveal_discard: false, // Night Battle mode
            field_spell_mode: false, // Illusion Legend mode
            zhanxing: false, // Astrology Battle mode
            tianming_mode: false, // Fate Battle mode
            yongchang_mode: false, // Chanting Battle mode
            hunzhiyiji_mode: false, // Soul Strike mode
            wanxiangxiuluo_mode: false, // Ten Thousand Changes Shura mode
            beishuizhizhan_mode: false, // Last Resort mode
            amusement_switches: [], // For special amusement modes; add id 18 to enable certain modes
            _xueliu: false, // Blood Flow mode (custom; requires add_function.js)

            guyi_mode: false, // Ancient-yaku mode
            _yifanjieguyi: false, // Yifan-jie Ancient-yaku
            _no_shiduan: false, // no-shiduan mode
            _no_zimosun: false, // no-tsumo-penalty mode
            open_hand: false, // show hands publicly

            _liqi_need: 1, // Riichi cost in sticks
            _ben_times: 1, // multiplier for honba points
            _fafu_1ting: 1000, // four-player single-tenpai penalty, etc.
            _fafu_2ting: 1500,
            _fafu_3ting: 3000,
            _fafu_3p_1ting: 1000, // three-player variants
            _fafu_3p_2ting: 2000,
            _fafu_2p: 1000,  // two-player variant
            _qieshangmanguan: false, // qieshang mangan
            _toutiao: false, // head-jump
            _renhumanguan: false, // renhu counts as mangan (5-fan)
            _no_normalbaopai: false, // disable normal bao-pai (big dragon/four winds indemnity)
            _sigangbaopai: false, // four-kong bao-pai
            _no_liujumanguan: false, // disable liuju mangan
            _no_yifa: false, // disable ippatsu
            _no_lianfengsifu: false, // disable double-wind four-fu
            _no_dora: false, // disable visible dora
            _no_lidora: false, // disable ura-dora
            _no_gangdora: false, // disable gang dora (visible)
            _no_ganglidora: false, // disable gang ura-dora
            _dora_jifan: false, // immediate flip on open-gang dora
            _sanxiangliuju: false, // three-player simultaneous win abortive draw
            _no_leijiyiman: false, // disable accumulated yakuman
            _no_wyakuman: false, // disable double yakuman
            _no_guoshiangang: false, // disable guoshi ankan gun (国士暗杠)
            _fufenliqi: false, // disable point requirement for riichi

            _baogang: false, // bao-gang (kong liability)
            _qingtianjing: false, // Qingtianjing mode (use cautiously)
            _no_zhenting: false, // disable furiten checks
            _ronghuzhahu: false, // allow false ronghu when hupai called without params
            _tiandichuangzao: false, // enable 'Heaven-Earth Creation' yakuman
            _wanwushengzhang: false, // enable 'All Things Grow' yakuman

            _mopai_paishan: false, // use mopai_set to determine randomPaishan ps_head (only for no-call flows)
            _heqie_mode: false, // heqie mode (hides tenpai display)

            _guobiao: false, // Guobiao (Chinese National Standard) mode
            _guobiao_huapai: false, // use huapai as flower tiles (0m) — requires add_function.js
            _guobiao_no_8fanfu: false, // disable 8-fan limit in Guobiao
            _guobiao_lianzhuang: false, // allow dealer carry in Guobiao
            _scale_points: 100, // point scaling for Guobiao display
            _cuohu_points: 10, // Guobiao false-win penalty points
            _cuohupeida: false, // Guobiao false-win: should losers "pay" players? (requires add_function.js)

            // The following two random options are per-view randomized (each view may differ on each inspection), not per-game randomized
            _random_skin: false, // randomize character skins (disables explicit skin settings)
            _random_views: false, // randomize appearances (riichi stick, win effects, avatar frame, tablecloth, title, etc.)
        }
    }
});
```

For changing the tablecloth, tile back and tile face there are two methods:

1. Use `_tablecloth_id`, `_mjp_id`, `_mjpsurface_id` in `detail_rule`.
2. Use the East-seat player's `views` slots: slot 6, 7, 13 correspond to these three appearance items.

When both are set, `detail_rule` values take precedence.

## Edit each round (round)

Start editing per-round data in `doc/2_编辑每个小局.md`.

After editing per-round data, the replay file editing is complete.

## Input to the console

Log into the Majsoul web client and open the DevTools console (F12).

Copy the entire contents of `main.js` into the console first, then paste your custom replay JS file.

Open any replay on the website and the custom replay will be visible.

If the console blocks pasting, type `allow pasting` first (or follow the instructions in `doc/pic/allow_pasting.jpg`).

## Clear and reset

- Clear: call `clearProject()` — most custom replay files in this repository call this at the top to avoid data accumulation.
- Reset: call `resetReplay()` — used to view the original (real) replay.
