# Copilot Instructions for majsoul-replay-editor

## 项目架构与核心知识
- 本项目用于自定义雀魂牌谱回放，核心脚本为 `main.js`，扩展功能在 `add_function.js`，示例在 `examples/`，大量自定义规则和模式在 `products/`。
- 主要通过在网页端雀魂（推荐用小号登录）F12控制台粘贴脚本实现功能。先粘贴 `main.js`，再粘贴具体牌谱脚本（如 `examples/demo.js`）。如遇“禁止粘贴”警告，先输入 `allow pasting`。
- 详细文档见 `doc/`，建议按顺序阅读 1-7 号文档，查找牌型用 `0_字典.md`。
- `code.js` 为解混淆后的核心 JS，仅供查阅，非主要开发入口。

## 关键开发流程
- 新增自定义规则或模式时，建议在 `products/` 下新建 JS 文件，并参考已有文件命名与结构。
- 复杂模式（如活动场、国标麻将、自制模式）请参考对应子目录和 README。
- 示例脚本请参考 `examples/` 下的 1-4.js 和 demo.js，覆盖常见与特殊牌型。
- 维护/扩展核心功能时，优先修改 `main.js` 和 `add_function.js`，并补充 JSDoc 注释。

## 项目约定与模式
- 牌谱脚本结构需与 `main.js` 兼容，变量命名、函数调用风格建议参考已有示例。
- 规则实现优先复用 `main.js` 提供的通用方法，特殊场景可在 `add_function.js` 扩展。
- 复杂自定义模式建议在 `products/自制模式/` 下开发，便于归档和查找。
- 牌型字典与模板见 `doc/字典_template.md`，生成新字典时请参考。

## 集成与外部依赖
- 仅依赖网页端雀魂，无需本地构建或测试命令。
- 部分功能参考 [雀魂Plus](https://github.com/MajsoulPlus/majsoul-plus) 或 misc-code 仓库，相关说明见 README。

## 贡献与维护
- 发现 bug 或有新需求请提 issue 或邮件联系维护者（见 README）。
- 贡献新功能建议 fork 仓库，按现有目录结构提交 PR。
- 维护者主要为 GrandDawn（原作者）与 Fat-pig-Cui（现维护），核心算法与文档均有详细注释。

## 重要文件/目录参考
- `main.js`：核心脚本入口
- `add_function.js`：扩展/自定义功能
- `examples/`：示例脚本
- `products/`：自定义规则与模式
- `doc/`：详细文档与字典

---
如有不清楚或遗漏之处，请反馈以便补充完善。
