# Maintenance Guide

本文件说明 FrostVista OS 官网在发布新版本、更新内容时需要修改哪些部分，以及哪些内容会自动更新、无需手动维护。

---

## 一、自动更新的内容（无需手动改）

以下内容由 GitHub API 实时驱动，**发布新 release 后全站自动更新**：

| 内容 | 数据源 | 位置 |
| --- | --- | --- |
| 当前最新版本号（页脚 `ver`） | GitHub `/releases` | `src/hooks/useLatestVersion.js` |
| 交互终端的 `uname` 输出 | 同上 | `src/components/InteractiveTerminal.jsx` |
| Roadmap 页头「v0.1 to vX.Y」 | 同上 | `src/pages/Roadmap.jsx` |
| Changelog 发布列表 | GitHub `/releases` | `src/hooks/useReleases.js` |
| /stats 看板（stars/commits/文件数…） | GitHub API | `src/hooks/useRepoStats.js` |

> 所有实时拉取都有**本地兜底快照**（见下），API 不可用时不会空白：
> - `/stats` 兜底：`src/data/stats.json`
> - Changelog/版本号 兜底：`content.js` 中的 `roadmapPast`（v0.1–v1.3 历史档案）

---

## 二、发布新版本时需要手动修改的部分

### 1. `src/data/content.js` —— 主要修改点

**① `roadmapCurrent`（当前里程碑）**
当 v1.4 完成、开始规划 v1.5 时：
- 把整个 `roadmapCurrent` 对象移动/复制进 `roadmapPast` 数组的**最前面**
- 用新的里程碑（标题/摘要/范围/阶段/验证命令）重写 `roadmapCurrent`

**② `roadmapPast`（历史档案）**
- 新完成的版本手动追加条目（`version` / `title` / `summary` / `points`）
- 注意：changelog 和页脚版本号走 GitHub 实时数据，**不需要**在 `roadmapPast` 里维护发布正文，但 roadmap 历史查看器依赖此数组，所以新版本发布后要补一条

**③ `changelog`（旧版 changelog 页的数据，现已由 useReleases 替代）**
- 当前 changelog 页已改用 GitHub `/releases` 实时数据，`changelog` 数组仅作为历史遗留可保留，**不强制更新**
- 如希望离线兜底也含新版本，可同步补条目

**④ `features` 列表中的「Signals roadmap」**
- 该特性卡写着 `v1.4`。v1.4 发布后建议改描述或替换为新规划中的特性

**⑤ `site.version`（静态兜底值）**
- 现在仅作为 API 失败时的回退。建议随手更新为最新版本号保持一致

### 2. `src/data/stats.json` —— /stats 离线兜底（可选）

- 正常无需改，/stats 页面浏览器端实时拉取
- 如需刷新兜底快照：`node scripts/fetch-stats.mjs`（会重新生成此文件）

### 3. `src/data/content.js` 之外

| 文件 | 何时改 |
| --- | --- |
| `src/pages/Docs.jsx` | 文档内容（项目布局/命令/参数）变化时 |
| `src/pages/Home.jsx` | 首页文案/特性/启动日志展示变化时 |
| `src/components/InteractiveTerminal.jsx` | 虚拟文件系统内容想更新时 |
| `README.md` | 项目说明变化时 |

---

## 三、完整发布流程（新版本 v1.4 为例）

```text
1. OS 仓库发布 GitHub Release（tag: v1.4）
   → 页脚版本号、changelog、/stats 自动更新（无需网站改动）

2. 手动同步内容（本项目）：
   - content.js: roadmapCurrent 挪入 roadmapPast 并新增 v1.4 条目
   - content.js: 更新 site.version = 'v1.4'
   - content.js: 更新 features 中过期的「Signals roadmap」描述
   - （可选）node scripts/fetch-stats.mjs 刷新 /stats 兜底

3. 提交并推送 → GitHub Actions 自动构建部署到 GitHub Pages
   （构建自动复制 dist/404.html 处理 SPA 路由刷新）
```

---

## 四、部署

- 部署文件：`.github/workflows/deploy.yml`（push 到 `main` 自动构建部署）
- 目标：`AuroBreeze.github.io`（根域名，vite base 保持 `/`）
- 本地预览：`npm run dev`
- 本地构建验证：`npm run build` + `npm run lint`
