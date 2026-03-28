# Minimal Timestamp Updater

一个轻量级 [Obsidian](https://obsidian.md) 插件，一键将笔记 frontmatter 中指定属性更新为当前日期。

[English](README.md)

## 功能特性

- 一键将任意 frontmatter 属性更新为今天的日期
- 仅更新已包含指定属性的笔记，不会向没有该属性的笔记添加新字段
- 可配置属性名（默认：`updated`）
- 支持 Moment.js 语法的日期格式（默认：`YYYY-MM-DD`）
- 可选的侧边栏 Ribbon 图标，点击即用
- 零外部运行时依赖，使用 Obsidian 内置的 Moment.js

## 安装

### 手动安装

1. 从[最新发布](../../releases/latest)下载 `main.js`、`manifest.json` 和 `styles.css`
2. 在 vault 中创建目录 `<vault>/.obsidian/plugins/update1click/`
3. 将上述三个文件复制到该目录
4. 在 Obsidian 中：**设置 → 第三方插件 → 刷新列表 → 启用 "Minimal Timestamp Updater"**

### BRAT（Beta 插件管理器）

1. 安装 [BRAT 插件](https://github.com/TfTHacker/obsidian42-brat)
2. 在 BRAT 设置中点击 **Add Beta plugin**，输入本仓库地址
3. 在 **设置 → 第三方插件** 中启用插件

## 使用方法

### 命令面板

打开命令面板（`Cmd/Ctrl + P`）并执行：

```
Update Date Property: 更新日期属性
```

### Ribbon 图标

点击左侧侧边栏的日历图标（默认开启，可在设置中关闭）。

当前笔记的 frontmatter 将被更新：

```yaml
---
updated: 2026-03-23
---
```

## 设置项

| 设置项 | 默认值 | 说明 |
|--------|--------|------|
| 属性名 | `updated` | 要更新的 frontmatter 键名 |
| 日期格式 | `YYYY-MM-DD` | Moment.js 格式字符串 |
| 显示侧边栏图标 | `true` | 控制侧边栏日历按钮的显示 |

**常用日期格式：**

| 格式 | 输出示例 |
|------|----------|
| `YYYY-MM-DD` | 2026-03-23 |
| `YYYY/MM/DD` | 2026/03/23 |
| `YYYY-MM-DD HH:mm` | 2026-03-23 14:30 |
| `MMM D, YYYY` | Mar 23, 2026 |

## 本地开发

```bash
git clone https://github.com/Armotrine/minimal-timestamp-updater.git
cd minimal-timestamp-updater
npm install
npm run build   # 生成 main.js
```

开发调试时使用 `npm run dev`（生成 source map）。

## 许可证

[MIT](LICENSE)
