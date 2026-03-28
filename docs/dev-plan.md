# 开发计划：Update Date Property 插件

## 背景

需要一个轻量级 Obsidian 插件，运行后将当前笔记 frontmatter 中指定属性的值更新为当前日期。支持通过设置页面配置属性名、日期格式和 Ribbon 图标开关。

## 文件结构

```
update1click/
├── manifest.json          # 插件元数据
├── package.json           # 依赖管理
├── tsconfig.json          # TypeScript 配置
├── esbuild.config.mjs     # 构建脚本
├── main.ts                # 插件主逻辑（单文件）
├── styles.css             # 空样式文件（插件规范要求）
├── README.md              # 英文说明文档
├── README_CN.md           # 中文说明文档
├── LICENSE                # MIT 许可证
└── docs/
    ├── dev-plan.md        # 本文件：开发计划
    └── release-checklist.md  # GitHub 发布检查清单
```

## 实现细节

### main.ts — 单文件包含所有逻辑

#### 接口 `PluginSettings`
| 字段 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `propertyName` | `string` | `"updated"` | 要更新的 frontmatter 属性名 |
| `dateFormat` | `string` | `"YYYY-MM-DD"` | Moment.js 日期格式 |
| `showRibbonIcon` | `boolean` | `true` | 是否显示侧边栏图标 |

#### 类 `UpdateDatePlugin extends Plugin`
- `onload()`: 加载设置 → 按需添加 Ribbon → 注册命令 → 注册设置页
- `updateDateProperty()`: 获取活动文件 → `processFrontMatter` 写入日期
- `addRibbonButton()` / `removeRibbonButton()`: 动态控制 Ribbon 图标

#### 类 `UpdateDateSettingTab extends PluginSettingTab`
- 属性名文本框
- 日期格式文本框
- Ribbon 图标开关（Toggle，实时生效）

### 关键设计决策

| 决策 | 原因 |
|------|------|
| 零外部依赖 | 使用 Obsidian 内置 moment.js，减小包体积 |
| 单文件 `main.ts` | 最小化代码复杂度和资源消耗 |
| `processFrontMatter` API | Obsidian 官方推荐方式，安全解析/写入 frontmatter |
| Ribbon 可选 | 用户偏好不同，默认开启但可关闭 |

## 构建

```bash
npm install
npm run build    # 生产构建，输出 main.js（~2.7kb）
npm run dev      # 开发模式，带 source map
```

## 测试验证

1. 创建带 frontmatter 的测试笔记（含或不含 `updated` 属性）
2. 运行命令 "更新日期属性"，确认属性值更新为当前日期
3. 修改设置中的属性名，重新运行，确认新属性名被写入
4. 修改日期格式，确认输出格式正确
5. 切换 Ribbon 图标开关，确认图标出现/消失
