# Operation Functions (Event Modes)

**Updated on January 3, 2026**

## Event-mode operation state transition diagram

The official-function version of the diagram and source are included at the end of this file.

![pic/活动场操作状态转移表.svg](../pic/活动场操作状态转移表.svg)

## Set Muyu (Dragon Eye) positions

`setMuyuSeats(muyu_seats)`

`muyu_seats` specifies the order/positions where the "muyu" (Dragon Eye) tiles appear during a hand. If the provided sequence is exhausted, positions are randomized.

Example: `setMuyuSeats('1230');`

## Three-tile exchange (Shura / Akaba)

`huanpai(tls, type)`

`tls[0], tls[1], tls[2], tls[3]` are the three tiles each of the four players will give away.

`type`: 0 = pass tiles counter-clockwise, 1 = exchange with opposite seat, 2 = pass tiles clockwise.

Example: `huanpai(['9p79s', '333s', '78p8s', '333z'], 1);`

## Win (Shura / Akaba)

`hupai(all_seats, type)`

Compared to the ranked-mode `hupai`, this function accepts an extra parameter `type`. `false` means a mid-hand win (does not necessarily end the hand), `true` means a final/ending win (a win that ends the current hand). Default is mid-hand win.

Example: `hupai([0, 2, 3], true);` and `hupai(1);`

## Select gap (Dingque) — Akaba

`dingque(gaps)`

`gaps` indicates each player's selected gap suit. The four letters correspond to seats 0..3 respectively.

Example: `dingque('smps');`

## Open-gang knockout (Akaba / Sichuan Mahjong)

`mingpai(seat, tiles, jifei)` and `zimingpai(seat, tile, type, jifei)`

Compared to the ranked mode versions, these accept an additional `jifei` parameter. Similar to `hupai`, in Akaba/Sichuan Mahjong an open gang can trigger a gale/rain effect that knocks players out; setting `jifei` to `true` indicates the action causes the match to end for those players.

Example: `zimingpai(1, true);`

## Discard (Dark Night / Anye mode)

`qiepai(seat, tile, is_liqi, f_moqie, anpai)`

Compared to the ranked-mode `qiepai`, this accepts an extra `anpai` parameter. If `anpai` is the string `'anpai'`, the discard will be made face-down (hidden) in the Dark Night mode; otherwise it will be a normal discard.

Example: `qiepai(0, '7z', true, 'anpai');`

## Reveal tile successfully (Dark Night)

`kaipai(seat)`

After a player has made a hidden discard, calling this will make the player at `seat` unveil their tile successfully; the hidden-discarding player is not locked and the reveal succeeds.

Example: `kaipai(1);`

## Reveal-and-lock after reveal failure (Dark Night)

`kaipaiLock(seat)`

After a player has made a hidden discard, calling this will cause the player at `seat` to attempt to unveil but immediately lock the hidden-discarding player, making the reveal fail.

Example: `kaipaiLock(2);`

## Draw (Astrology Battle)

`mopai(seat, tile, index)`

Compared to the ranked-mode `mopai`, this accepts an extra `index` parameter which selects a tile position from the candidate pool. If omitted the first candidate is chosen.

`[0]` = first candidate, `[1]` = second, `[2]` = third.

Note: To disambiguate `index` from `seat`, when `seat` is omitted you must pass `index` as an array. For example, `mopai([1])` selects the second candidate rather than representing seat 1.

Example: `mopai(3, [2]);`

## Discard (Last Resort / Bei Shui Zhi Zhan)

`qiepai(seat, tile, is_liqi, f_moqie, bs_type)`

Compared to the ranked-mode `qiepai`, this supports an additional `bs_type` parameter which can be `[0]`, `[1]`, or `[2]`.

`[0]` = standard Riichi, `[1]` = "True" series, `[2]` = "Extreme" series. Default is `[0]`.

Example: `qiepai(3, '1m', true, [2]);`

## SVG diagrams and PlantUML source

### Official-version event-mode operation state transition diagram

![pic/活动场操作状态转移表_官方分组版.svg](../pic/活动场操作状态转移表_官方分组版.svg)

### PlantUML source

Event-mode operation state transition diagram

```plantumlcode
@startuml 活动场操作状态转移表
hide empty description
scale 1.5
skinparam defaultTextAlignment center
skinparam defaultFontName "微软雅黑"
skinparam DefaultFontSize 20
skinparam State { 
    FontSize 28
}

State "Broad dealing group" as S000 #LightGreen {
    State "Round start\nroundBegin()" as S1 #LightCyan
    State "Deal\nmopai()" as S3 #LightGreen
    State "Muyu positions (optional)\nsetMuyuSeats()" as S9 #LightPink
    State "Tile exchange\nhuanpai()" as S10 #LightSalmon
    State "Select gap\ndingque()" as S11

    S1 -[bold]-> S9 : Dragon Eye
    S1 -[bold]-> S10 : Shura/Akaba
    S10 -[bold]-> S11 : Akaba

    State "-" as S003 <<entryPoint>>
    S003 -[bold]-> S1

    State "-" as S001 <<entryPoint>>
    S001 -[bold]-> S3

    State "-" as S009 <<fork>>
    S1 -[bold]-> S009
    S3 -[bold]-> S009
    S9 -[bold]-> S009
    S10 -[bold]-> S009
    S11 -[bold]-> S009

    State "+" as S002 <<exitPoint>>
    S009 -[bold]-> S002
}
State "Broad discard group" as S040 #LightSkyBlue {
    State "Discard\nqiepai()" as S2 #LightSkyBlue
    State "Reveal success\nkaipai()" as S12 #LightSalmon
    State "Reveal lock\nkaipaiLock()" as S13 #DarkSeaGreen

    State "-" as S049 <<fork>>
    S2 -[bold]-> S049 : Dark Night hidden discard
    State "-" as S048 <<fork>>
    S049 -[bold]-> S048 : Someone unveils
    S048 -[bold]-> S12 : Success
    S048 -[bold]-> S13 : Lock
    State "-" as S047 <<fork>>
    S2 -[bold]-> S047
    S12 -[bold]-> S047
    State "-" as S046 <<fork>>
    S13 -[bold]-> S046
    S049 -[bold]-> S046 : No one unveils
    State "-" as S045 <<fork>>
    S047 -[bold]-> S045
    S046 -[bold]-> S045

    State "-" as S041 <<entryPoint>>
    S041 -[bold]-> S2
    
    ' reveal
    State "+" as S042 <<exitPoint>>
    S047 -[bold]-> S042

    ' lock
    State "+" as S043 <<exitPoint>>
    S045 -[bold]-> S043
}
State "Abortive draws group" as S050 #LightSeaGreen {
    State "Abortive draw\nliuju()" as S7 #LightBlue
    State "Exhaustive draw\nhuangpai()" as S8 #LightBlue

    ' discard-entry
    State "-" as S051 <<entryPoint>>
    S051 -[bold]-> S7
    S051 -[bold]-> S8

    ' deal-entry
    State "-" as S052 <<entryPoint>>
    S052 -[bold]-> S7

    State "+" as S053 <<exitPoint>>
    S7 -[bold]-> S053
    S8 -[bold]-> S053
}
State "Round end\nStart settlement" as S0 #LightCyan
State "Chi/Pon/OpenGang\nmingpai()" as S4 #Yellow
State "ConcealedGang/AddedGang/BaBei\nzimingpai()" as S5 #Yellow
State "Win\nhupai()" as S6 #LightCoral

[*] -[dashed]-> S003

' Broad dealing exit
S002 -[#green,bold]-> S041
S002 -[bold]-> S5 : Self calls
S002 -[#red,bold]-> S6
S002 -[#blue,bold]-> S052

' Broad discard exit
S042 -[bold]-> S4 : Other calls
S042 -[#red,bold]-> S6

S043 -[#green,bold]-> S001
S043 -[#blue,bold]-> S051

' Abortive draws exit
S053 -[dashed]-> S0

' Chi/Pon/OpenGang exit
S4 -[bold]-> S041 : after chi/pon
S4 -[bold]-> S001 : after open-gang\nrinshan draw
S4 -[#DarkCyan,bold]-> S0 : Akaba gang knockout

' Concealed/Added/BaBei exit
S5 -[bold]-> S001 : rinshan draw
S5 -[#red,bold]-> S6
S5 -[#DarkCyan,bold]-> S0 : Akaba gang knockout

' Win exit
S6 -[bold]-> S001 : Shura/Akaba mid-hand wins
S6 -[bold]-> S051 : Shura/Akaba mid-hand wins
S6 -[dashed]-> S0

' End
S0 -[dashed]-> [*]

@enduml
```

