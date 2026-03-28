# GitHub 发布检查清单

发布 Obsidian 插件到 GitHub 的完整步骤。

---

## 第零步：隐私保护配置（首次发布必做）

1. 登录 GitHub → **Settings → Emails**
   - 勾选 **Keep my email addresses private**
   - 勾选 **Block command line pushes that expose my email**
   - 记下分配的 noreply 邮箱（格式：`xxx@users.noreply.github.com`）

2. 本地 Git 配置（使用 noreply 邮箱）：
```bash
git config --global user.name "你的GitHub用户名"
git config --global user.email "xxx@users.noreply.github.com"
```

---

## 第一步：准备仓库

- [ ] 在 GitHub 创建新仓库，名称：`minimal-timestamp-updater`，设为 **Public**，不要勾选初始化文件
- [ ] 初始化本地 git 仓库并关联远端

```bash
git init
git add manifest.json package.json tsconfig.json esbuild.config.mjs main.ts styles.css README.md README_CN.md LICENSE .gitignore docs/
git commit -m "Initial release v1.0.0"
git remote add origin https://github.com/Armotrine/minimal-timestamp-updater.git
git branch -M main
git push -u origin main
```

> 注意：`.gitignore` 已排除 `node_modules/` 和构建产物 `main.js`，勿手动添加这些文件。

---

## 第二步：创建 Release

Obsidian 社区插件要求 Release 中包含三个文件：`main.js`、`manifest.json`、`styles.css`。

```bash
# 构建生产版本
npm run build

# 创建 git tag
git tag v1.0.0
git push origin v1.0.0
```

在 GitHub 仓库页面：
- [ ] 点击 **Releases → Create a new release**
- [ ] Tag: `v1.0.0`，Target: `main`
- [ ] Title: `v1.0.0`
- [ ] 上传以下三个文件作为 Release Assets：
  - `main.js`
  - `manifest.json`
  - `styles.css`
- [ ] 发布 Release

---

## 第三步：用 BRAT 测试（发布前验证）

在正式提交社区列表前，建议先用 BRAT 测试安装流程：

1. 安装 [BRAT 插件](https://github.com/TfTHacker/obsidian42-brat)
2. BRAT 设置 → Add Beta plugin → 填入你的仓库 URL：`https://github.com/Armotrine/minimal-timestamp-updater`
3. 验证插件安装、启用、功能正常

---

## 第四步：提交社区插件列表

若想让用户可以在 Obsidian 内直接搜索安装，需提交 PR 到官方插件列表。

1. Fork 仓库：[obsidianmd/obsidian-releases](https://github.com/obsidianmd/obsidian-releases)
2. 编辑 `community-plugins.json`，在末尾追加：

```json
{
  "id": "minimal-timestamp-updater",
  "name": "Minimal Timestamp Updater",
  "author": "m",
  "description": "One-click update a frontmatter date property to the current date.",
  "repo": "Armotrine/minimal-timestamp-updater"
}
```

3. 提交 PR，等待审核（通常需要 1-4 周）

**审核要求核对：**
- [ ] `manifest.json` 中 `minAppVersion` 填写正确（当前：`1.4.0`）
- [ ] 仓库有 `README.md`
- [ ] 仓库有 `LICENSE`
- [ ] Release 包含 `main.js`、`manifest.json`、`styles.css`
- [ ] 插件 id `minimal-timestamp-updater` 在列表中唯一

---

## 版本更新流程（后续迭代）

```bash
# 1. 修改代码
# 2. 更新 manifest.json 和 package.json 中的 version
npm run build
git add manifest.json package.json main.ts
git commit -m "Release v1.x.x"
git tag v1.x.x
git push origin main --tags
# 3. 在 GitHub 创建新 Release，上传新的 main.js、manifest.json、styles.css
```
