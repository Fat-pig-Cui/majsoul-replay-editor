# Recommended Variables & Helper Functions

**Updated on January 3, 2026**

Detailed descriptions are available in the referenced documents.

## Variables

1. `player_datas`: player information (see `doc/en/1_GameInfo.md#player-information`)
2. `begin_tiles`: opening hands (see `doc/en/2_RoundInfo.md#opening-hand`)
3. `player_tiles` (read-only): current player hands (see `doc/en/5_AdvancedFeatures.md#player-realtime-tiles-read-only`)
4. `all_data` (read-only): replay data object (see `doc/en/5_AdvancedFeatures.md#replay-data-object-read-only`)

## Functions

1. `setConfig`: set match configuration (see `doc/en/1_GameInfo.md#set-the-match-mode`)
2. `setDiscardTiles`: set each player's discard sequence (see `doc/en/2_RoundInfo.md#each-players-discard-sequence-optional`)
3. `setDealTiles`: set each player's draw sequence (see `doc/en/2_RoundInfo.md#each-players-draw-sequence-optional`)
4. `setPaishan`: set the wall directly (see `doc/en/2_RoundInfo.md#set-the-wall-directly`)
5. `randomPaishan`: generate a randomized wall (see `doc/en/2_RoundInfo.md#random-wall-function`)
6. `roundBegin`: begin a hand (see `doc/en/2_RoundInfo.md#round-flow`)

7. `mopai`: draw tile
    - `doc/en/3_OperationFunc.md#mopai` (operation functions)
    - `doc/en/4_EventOperationFunc.md#mopai` (Astrology Battle)
8. `qiepai`: discard
    - `doc/en/3_OperationFunc.md#qiepai` (operation functions)
    - `doc/en/4_EventOperationFunc.md#qiepai` (Dark Night)
    - `doc/en/4_EventOperationFunc.md#qiepai` (Last Resort)
9. `mingpai`:
    - `doc/en/3_OperationFunc.md#mingpai` (Chi/Pon/Open Gang)
    - `doc/en/4_EventOperationFunc.md#mingpai` (Open-gang knockout in Akaba)
10. `zimingpai`:
     - `doc/en/3_OperationFunc.md#zimingpai` (Concealed/Added/BaBei)
     - `doc/en/4_EventOperationFunc.md#zimingpai` (Open-gang knockout in Akaba)
11. `hupai`: win
     - `doc/en/3_OperationFunc.md#hupai` (operation functions)
     - `doc/en/4_EventOperationFunc.md#hupai` (Shura/Akaba)
12. `huangpai`: exhaustive draw
     - `doc/en/3_OperationFunc.md#huangpai` (operation functions)
13. `liuju`: abortive draw
     - `doc/en/3_OperationFunc.md#liuju` (operation functions)

14. `setRound`: jump to a specific round
     - `doc/en/3_OperationFunc.md#setround` (operation functions)
15. `getLeftTileCnt`: get remaining tiles in the wall
     - `doc/en/3_OperationFunc.md#getlefttilecnt` (operation functions)
16. `demoGame`: demo game helper
     - `doc/en/3_OperationFunc.md#demogame` (operation functions)
17. `normalMoqie`: normal draw-and-discard helper
     - `doc/en/3_OperationFunc.md#normalmoqie` (operation functions)
18. `moqieLiqi`: draw-and-riichi helper
     - `doc/en/3_OperationFunc.md#moqieliqi` (operation functions)
19. `comboMopai`: consecutive rinshan draws helper
     - `doc/en/3_OperationFunc.md#combomopai` (operation functions)
20. `mingQiepai`: call-then-discard helper
     - `doc/en/3_OperationFunc.md#mingqiepai` (operation functions)
21. `zimoHu`: tsumo helper
     - `doc/en/3_OperationFunc.md#zimoHu` (operation functions)
22. `moqieLiuju`: draw-and-discard to exhaustive draw helper
     - `doc/en/3_OperationFunc.md#moqieliuju` (operation functions)

23. `setMuyuSeats`: set Dragon Eye positions
     - `doc/en/4_EventOperationFunc.md#setmuyuseats` (event-mode operations)
24. `huanpai`: three-tile exchange
     - `doc/en/4_EventOperationFunc.md#huanpai` (event-mode operations)
25. `dingque`: select gap (Akaba)
     - `doc/en/4_EventOperationFunc.md#dingque` (event-mode operations)
26. `kaipai`: successful reveal (Dark Night)
     - `doc/en/4_EventOperationFunc.md#kaipai` (event-mode operations)
27. `kaipaiLock`: reveal-lock (Dark Night)
     - `doc/en/4_EventOperationFunc.md#kaipailock` (event-mode operations)

28. `judgeTile`: tile rule checker
     - `doc/en/5_AdvancedFeatures.md#judgeTile` (advanced features)
29. `allEqualTiles`: equivalent tile set
     - `doc/en/5_AdvancedFeatures.md#allequaltile` (advanced features)
30. `isEqualTile`: tile equivalence
     - `doc/en/5_AdvancedFeatures.md#isequaltile` (advanced features)
31. `decompose`: decompose tile string
     - `doc/en/5_AdvancedFeatures.md#decompose` (advanced features)
32. `separate`: separate into array
     - `doc/en/5_AdvancedFeatures.md#separate` (advanced features)
33. `calcHupai`: winning-hand calculation
     - `doc/en/5_AdvancedFeatures.md#calchupai` (advanced features)
34. `calcTingpai`: tenpai calculation
     - `doc/en/5_AdvancedFeatures.md#calctingpai` (advanced features)
35. `getLstAction`: recent action lookup
     - `doc/en/5_AdvancedFeatures.md#getlstaction` (advanced features)
36. `setScores`: set player scores
     - `doc/en/5_AdvancedFeatures.md#setScores` (advanced features)

37. `clearProject`: clear project
     - `doc/en/1_GameInfo.md#clear-and-reset`
38. `resetReplay`: reset replay
     - `doc/en/1_GameInfo.md#clear-and-reset`

