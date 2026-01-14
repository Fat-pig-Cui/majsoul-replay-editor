# Edit Each Round (Round Info)

**Updated on January 3, 2026**

## Opening hand

The variable `begin_tiles` represents each player's opening hand. It is an array of strings with up to 4 entries; index `i` corresponds to the player whose `seat` is `i`.

Note that the dealer (oya) starts with 14 tiles while non-dealer players start with 13.

Example:

```js
begin_tiles[0] = '11122233344477z';
begin_tiles[1] = '1112340678999m';
begin_tiles[2] = '1112340678999p';
begin_tiles[3] = '1112340678999s';
```

For three-player mahjong, do not set `begin_tiles[3]` (leave it empty). The same applies for two-player mode.

If a player's opening hand has too few tiles, calling the `randomPaishan` helper below will automatically fill the hand and the console will report it. If a hand has too many tiles, `randomPaishan` will log a warning.

Important: every participating player's opening hand must not be empty. The main view player's opening hand must not be excessively large; if it is, the replay may crash on load.

## Wall (paishan)

Majsoul's internal wall format changed over time. Older walls (before May 2023) did not include opening hands and used md5; current walls include opening hands and use sha256 (salted).

To keep the repository size small, the md5/sha256 strings included in this repo are placeholders and are not real hashes.

### Set the wall directly

You can set the wall string directly:

```js
setPaishan('3s4m1p7p7m8m1m3p1s1s5s9s8p9s2p7m2m8m4p3m6p4m3p1s1p5m2p2m5s7m0s3m4m6m8m6p0m4p7p1p8p3p1s1p2m3m7s3p7s9m2p8p4p6m9p6p9p7p7s8p6p4p6z9s9s7p9p6p7s5s2p5z6s3z4s2z0p7z8s1z2s4z5m');
```

The string is the wall data excluding the opening hands. Manually crafting a full wall string is tedious; the helper below simplifies this.

### Random wall function

`randomPaishan(ps_head, ps_back)`

`ps_head` and `ps_back` specify the head and tail parts of the wall (excluding opening hands). They support simple placeholders to control tile selection:

- `.` — any remaining tile
- `H` — any honor tile (winds/dragons)
- `T` — a terminal tile (1 or 9)
- `D` — a middle tile (2–8)
- `M`, `P`, `S` — a tile from Man (characters), Pin (dots), or Sou (bamboo) respectively

If no remaining tile satisfies the requested constraint, the generator will fall back to choosing any remaining tile (same as `.`).

If you call `randomPaishan`, opening hands may also be randomized according to the same placeholder rules (but only when `randomPaishan` is invoked).

Spaces in `ps_head` and `ps_back` are ignored and can be used for readability.

Examples:

```js
randomPaishan(); // completely random wall
randomPaishan('3s'); // wall starting with 3-sou
randomPaishan('33s3s 3s', '1z'); // begin with four 3-sou; the first rinshan tile is East (spaces ignored)
randomPaishan('', '1z....'); // four-player wall where the dora indicator is East
```

`randomPaishan` validates the generated wall and the players' opening hands (for example, tile counts). If validation fails it will log warnings. The function behavior depends on three variables describing the round state:

- `chang`: 0–3 for East, South, West, North round
- `ju`: 0–3 which seat is dealer within the current `chang` (e.g., in East round 2 with dealer at seat 1, `ju = 1`)
- `ben`: the current honba count for the hand

Examples: for West round 2 with 3 honba, `chang = 2`, `ju = 1`, `ben = 3`. For North round 1 with 1 honba, `chang = 3`, `ju = 0`, `ben = 1`.

Note: `randomPaishan` treats any tiles explicitly provided as injected tiles (they are appended), so the generated wall may contain more tiles than a normal wall unless validations trim them.

### Notes for either method

Because of the official logic limits, the total number of tiles in the wall cannot exceed 136 tiles:

- When using `randomPaishan`, if validation warnings are present (invalid counts etc.), the generated wall will omit opening hands; otherwise it includes opening hands.
- When using `setPaishan`, if the provided wall plus the players' opening hands exceeds 136 tiles, or player opening hand sizes are invalid, the wall will omit opening hands; otherwise it includes opening hands.
- If the provided wall (excluding opening hands) itself exceeds 136 tiles, it will be truncated to prevent a crash.

The order of tiles within opening hands may be randomized as well, which affects the draw ordering.

## Each player's discard sequence (optional)

`setDiscardTiles([qiepai0, qiepai1, qiepai2, qiepai3])`

Each `qiepai${i}` is the discard sequence (list of discards) for the player at `seat = i`. The string lists tiles left-to-right. This is useful for expressing precise discard sequences.

Example:

```js
setDiscardTiles(['4z1z7z2m5m9s5s7p', '9m1s9s5z6z9p8s1p', '1m8s3s4m6z2z7z', '7p6s7s4s3s6m7m7p']);
```

Notes:

- Inside `qiepai${i}`, `.` can be used as a wildcard for a non-specific tile placeholder. When reached, it behaves as a draw-and-discard placeholder (the engine will draw the next tile from the wall).
- If the specified list for `qiepai${i}` runs out, it no longer influences that player's further discards.

## Each player's draw sequence (optional)

`setDealTiles([mopai0, mopai1, mopai2, mopai3])`

Each `mopai${i}` is the draw sequence for the player at `seat = i`.

Example:

```js
setDealTiles(['4z1z7z2m5m9s5s7p', '9m1s9s5z6z9p8s1p', '1m8s3s4m6z2z7z', '7p6s7s4s3s6m7m7p']);
```

Notes:

- In `mopai${i}`, `.` denotes a non-specific tile; when encountered the player will draw the next tile from the wall.
- If a specified draw list for `mopai${i}` is exhausted, it no longer affects that player's draws.
- If `detail_rule` sets `_mopai_paishan`, `randomPaishan` will generate the wall according to that parameter and `ps_head` becomes ineffective. Call `setDealTiles` before `randomPaishan`. This approach only works for hands with no open melds (no calls).

## Round flow

Before each hand begins, call `roundBegin();`.

If the wall has not been set before calling `roundBegin`, an unparameterized `randomPaishan()` will be invoked automatically.

Functions used to script the play-by-play are documented in `doc/3_对局操作相关函数.md`.

For event-specific fields and special modes refer to `doc/4_对局操作相关函数（活动场）.md`.
