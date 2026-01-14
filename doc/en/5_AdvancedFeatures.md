# Advanced Features

**Updated on January 3, 2026**

## Check whether a tile satisfies a rule

`judgeTile(tile, type)`

Determine whether `tile` satisfies the rule `type`. Besides the placeholder rules used by `randomPaishan`, the following are supported:

- `H`: honor tiles
- `T`: terminals (1 or 9)
- `Y`: terminals or honors (1/9/honor)
- `D`: middle tiles (2–8)
- `M`: Man (characters)
- `P`: Pin (dots)
- `S`: Sou (bamboo)

Additional rules:

- `L`: tiles used for Green (ryanpeikou?) — green-only set
- `quanshuang`: Guobiao: all-double triplets
- `quanda`: Guobiao: all big tiles
- `quanzhong`: Guobiao: all middle tiles
- `quanxiao`: Guobiao: all small tiles
- `dayuwu`: Guobiao: tiles greater than five
- `xiaoyuwu`: Guobiao: tiles less than five
- `tuibudao`: Guobiao: "tui bu dao" (special pattern)

Example: `judgeTile('2s', 'L')` returns `true`.

The function is often used in negation checks. For example, to determine if a hand cannot be "all honors", scanning tiles with `judgeTile(tile, 'H')` and finding any match returns `false` for all-honors.

If `tile` is a wildcard tile (in Wanxiang Shura) it always returns `true`.

## Equivalent tile set

`allEqualTiles(tile)`

Returns an array of all tiles equivalent to `tile`. Note the result may include special-suffixed tiles (e.g., the Mirror Battle's transparent tiles use a `t` suffix on top of the normal tile encoding).

Example: `allEqualTiles('5m')` returns `['5m', '0m', '5mt', '0mt']`.

## Check tile equivalence

`isEqualTile(x, y)`

Uses `allEqualTiles` to determine whether two tiles are equivalent.

Example: `isEqualTile('5m', '0m')` returns `true`.

This function is commonly used in tenpai and win checks.

## Decompose tile string

`decompose(tiles)`

Transforms the simplified tile encoding into an expanded string of individual tiles.

Example: `decompose('123m99p')` returns `'1m2m3m9p9p'`.

## Separate tiles into an array

`separate(tiles)`

Similar to `decompose` but returns an array.

Example: `separate('123m99p')` returns `['1m', '2m', '3m', '9p', '9p']`.

`decompose` and `separate` are largely equivalent; use whichever suits your needs.

## Is a tile set a winning hand?

`calcHupai(tiles, type)`

Determines whether `tiles` is a winning hand. The optional `type` parameter is only used in Wanxiang Shura mode to indicate whether wildcard tiles might be absent; other modes ignore `type`.

`tiles` must be in a non-awaiting state (e.g., 14 or 11 tiles). Passing 13 or 10 will always return 0.

Return values:
- 0: not a winning hand
- 1: standard winning hand
- 2: seven pairs
- 3: kokushi (thirteen orphans) type win
- 4: Guobiao "no-rely" win (without combination dragons)
- 5: Guobiao "no-rely" win (with combination dragons)
- 6-11: Guobiao non-no-rely combination-dragon wins
- 12: Yifan-jie ancient-yaku 'Thirteen Disconnected'

Examples:

`calcHupai('11122233344455z')` returns 1

`calcHupai('11223355668899m')` returns 2

`calcHupai('19m19p19s11234567z')` returns 3

`calcHupai('19m19p19s1234567z')` returns 0 (13 tiles — awaiting, not a win)

`calcHupai('111199m223344p99s')`, for Riichi rules returns 0 (no dragon seven-pairs), but for Akaba and Guobiao it returns 2.

## Calculate tenpai (tingpai)

`calcTingpai(seat, type)`

Calculates the tenpai tiles for the player at `seat`. If `type` is `true` the function will consider the "5th tile" (i.e., avoid virtual waits); default is `false`.

The function reads the player's hand from `player_tiles[seat]`.

Unlike `calcHupai`, `calcTingpai` requires the player's hand to be in an awaiting state (e.g., 13 tiles), otherwise it will not return tenpai.

The return value is an array of objects.

Examples (player 0's simplified hands shown):

- `calcTingpai(0)` with `tiles = '1112223334445z'` returns `[{tile: '5z'}]`
- `calcTingpai(0)` with `tiles = '1122335577889m'` returns `[{tile: '6m'}, {tile: '9m'}]`
- `calcTingpai(0)` with `tiles = '11199m223355p99s'` returns `[{tile: '1m'}]` under Akaba and Guobiao
- `calcTingpai(0)` with `tiles = '14m28p69s1234567z'` returns `[{tile: '7m'}, {tile: '5p'}, {tile: '3s'}]` under Guobiao

## Get the most recent action

`getLstAction(num)`

A fully programmer-oriented function that returns recent action records. `num` indicates the nth-from-last action, default `1` for the most recent.

Use this function alongside the `Record`-prefixed entries in `main.js` (e.g., `RecordDealTile`).

## Set player scores

`setScores(scores)`

Call this during `roundBegin` to modify player scores for hands other than the first. Example:

`setScores([100000, 0, 0, 0]);` — all players except the East-starting player have 0 points.

To change the first-hand scores use `detail_rule._scores_` instead.

## Player realtime tiles (read-only)

`player_tiles`

`player_tiles[seat]` holds the player's current hand; this is intended for debugging and should not be modified.

## Replay data object (read-only)

`all_data`

After loading a custom replay into the console you can inspect this variable to see almost all information about the replayed data. It's intended for debugging; don't modify it.

