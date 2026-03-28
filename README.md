# Minimal Timestamp Updater

A lightweight [Obsidian](https://obsidian.md) plugin that updates a specified frontmatter property to the current date with a single click or command.

[中文文档](README_CN.md)

## Features

- Update any frontmatter property to today's date instantly
- Only updates notes that already have the specified property — never adds it to notes that don't have it
- Configurable property name (default: `updated`)
- Configurable date format using Moment.js syntax (default: `YYYY-MM-DD`)
- Optional ribbon icon in the left sidebar for one-click access
- Zero external runtime dependencies — uses Obsidian's built-in Moment.js

## Installation

### Manual

1. Download `main.js`, `manifest.json`, and `styles.css` from the [latest release](../../releases/latest)
2. Create a folder at `<vault>/.obsidian/plugins/update1click/`
3. Copy the three files into that folder
4. In Obsidian: **Settings → Community plugins → Reload plugins → Enable "Minimal Timestamp Updater"**

### BRAT (Beta Reviewers Auto-update Tester)

1. Install the [BRAT plugin](https://github.com/TfTHacker/obsidian42-brat)
2. In BRAT settings, click **Add Beta plugin** and enter this repository URL
3. Enable the plugin in **Settings → Community plugins**

## Usage

### Command palette

Open the command palette (`Cmd/Ctrl + P`) and run:

```
Update Date Property: 更新日期属性
```

### Ribbon icon

Click the calendar icon in the left sidebar (enabled by default, can be toggled in settings).

The active note's frontmatter will be updated:

```yaml
---
updated: 2026-03-23
---
```

## Settings

| Setting | Default | Description |
|---------|---------|-------------|
| Property name | `updated` | The frontmatter key to update |
| Date format | `YYYY-MM-DD` | Moment.js format string |
| Show ribbon icon | `true` | Toggle the sidebar calendar button |

**Common date formats:**

| Format | Output |
|--------|--------|
| `YYYY-MM-DD` | 2026-03-23 |
| `YYYY/MM/DD` | 2026/03/23 |
| `YYYY-MM-DD HH:mm` | 2026-03-23 14:30 |
| `MMM D, YYYY` | Mar 23, 2026 |

## Development

```bash
git clone https://github.com/Armotrine/minimal-timestamp-updater.git
cd minimal-timestamp-updater
npm install
npm run build   # outputs main.js
```

For live development, use `npm run dev` (generates source maps).

## License

[MIT](LICENSE)
