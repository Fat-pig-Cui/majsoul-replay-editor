# 背水之战模式

活动场对应 `mode_id` 是 52, 关键词是 `beishuizhizhan_mode`

## 规则说明

- 玩家满足立直的条件时(包括双立直), 会根据玩家点数出现"真"和"极"两个选项
- "真"会使得交出的立直供托条件变成5根, 但立直番数加2番
- "极"会使得交出的立直供托条件变成10根, 但立直番数加4番

## 函数特殊说明

### 切牌: `qiepai(seat, tile, is_liqi, beishui_type)`

与段位场的切牌相比, 多了一个参数 `beishui_type`, `beishui_type` 的值可以是 `[0]`, `[1]`, `[2]`

`[0]` 表示普通立直, `[1]` 表示"真"系列, `[2]` 表示"极"系列, 默认为 `[0]`

## 示例牌谱

- [demo01](demo01.js)
