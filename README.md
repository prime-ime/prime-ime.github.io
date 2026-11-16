# PRIME Lab 学术主页

新疆大学 · 工业建模与能源预测研究组

Predictive Research in Industrial Modeling and Energy

目标地址：https://prime-ime.github.io

中文默认首页 `/`，英文首页 `/en/`。Astro 静态生成，GitHub Pages 托管，不需要数据库或服务器。

## 本地开发

使用 Node.js 22.23.4+（推荐 Node.js 24 LTS，与 CI 一致）。

```bash
npm ci
npm run dev
```

打开终端给出的 `http://localhost:4321`。完整搜索索引在生产构建时生成：

```bash
npm run verify    # 类型检查、BibTeX 测试、生产构建、链接及资源检查
npm run preview  # 预览 dist 中的完整网站，包含静态搜索
npm run test:content # 可选：在临时目录验证非空的双语内容，不改正式资料
```

## 内容放在哪里

| 内容 | 位置 |
| --- | --- |
| 名称、简介、邮箱、办公地址、招生链接 | `src/config.ts` |
| 导航、按钮、空状态及首页中英文文案 | `src/i18n/ui.ts` |
| 研究方向 | `src/content/research/*.md` |
| 导师、博士生、硕士生、毕业成员 | `src/content/team/*.md` |
| 项目与资源 | `src/content/projects/*.md` |
| 新闻动态 | `src/content/news/*.md` |
| 论文来源 | 根目录 `citations.bib` |
| 本地照片 | `src/assets/` |
| 下载文件 | `public/files/`（链接写 `/files/文件名.pdf`） |
| 组件、统一样式 | `src/components/`、`src/styles/global.css` |

目前未提供成员、论文、项目、新闻或联系方式，因此这些栏目显示待更新状态。空集合在 Astro 构建日志中会产生提示，这是无资料状态下的预期行为，不影响构建。请只发布经核实的资料，并取得照片及个人联系方式的公开许可。研究方向是介绍性文字，不代表已完成项目或验证过的成果。

### 双语规则

同一内容使用两个文件，例如 `energy.zh.md`、`energy.en.md`。分别设置 `lang: zh` / `lang: en`，但 `translationKey` 完全一致。`translationKey` 只用小写英文、数字和短横线，同时决定详情页网址，发布后尽量不改。

两种语言分别生成完整 HTML，不依赖浏览器即时翻译。列表只显示当前语言的条目；尚未创建翻译时，详情页语言切换返回另一语言的栏目首页。请一起维护中英文文件。论文保持原始题名和作者，共用于双语页面。

添加 `draft: true` 可隐藏尚未确认的条目；省略时默认发布。Markdown 正文是详情页内容；列表摘要来自 frontmatter。

## 添加成员

在 `src/content/team/` 新建 `member-key.zh.md`，将以下占位字段替换为真实信息后再改为 `draft: false`。英文文件保持相同 `translationKey`。

```yaml
---
lang: zh
translationKey: member-key
draft: true
name: 待填写真实姓名
role: Master Student
weight: 10
bio: 待填写研究兴趣
# avatar: ../../assets/member-photo.webp
# website: https://真实个人主页
# email: 真实公开邮箱
---
这里填写个人简介、研究兴趣或经历。
```

`role` 只选 `Faculty`（导师）、`PhD Student`、`Master Student`、`Alumni`。`weight` 越小越靠前。毕业后改成 `Alumni`。照片可省略，省略时显示“照片待提供”；建议正方形 WebP/JPEG，边长 600–1000 像素。使用 `src/assets/` 图片可获得 Astro 构建优化。成员自动生成详情页，个人主页、邮箱显示为可访问链接。

## 更新论文

将确认后的 BibTeX 条目添加到 `citations.bib`。以下仅是格式示意，不是课题组论文；请替换所有占位值，勿直接发布。

```bibtex
@article{unique-key,
  title = {真实论文题名},
  author = {Family, Given and Other, Author},
  year = {2026},
  journal = {真实期刊名称},
  doi = {真实 DOI},
  pdf = {https://真实论文链接},
  code = {https://真实代码地址},
  project = {https://真实项目地址},
  featured = {true}
}
```

必填 `title`、`author`、四位 `year`，以及 `journal` / `booktitle` / `publisher` / `howpublished` / `institution` 之一；其他字段可直接删除。`featured = {true}` 才会出现在首页代表性成果，不从备注猜测奖项。链接支持 `https://`、`http://` 或 `/files/...`；不要使用 Zotero 本机文件路径。

```bash
npm run import-bibtex
```

开发和构建都会自动导入，按年份倒序展示，并提供单篇 BibTeX 展开与完整 `.bib` 下载。自动文件 `src/content/publications/bib-*.md` 不提交，**请直接编辑 `citations.bib`**；条目删除后旧的自动生成文件会同步移除。导入前校验全部记录，错误会阻止发布。独立手写 Markdown 不受删除操作影响。

导入器保留常见作者格式和 BibTeX 引用原文，但不是完整 LaTeX 排版引擎；复杂 LaTeX 宏请在题名展示文本中改用 Unicode 后核对效果。

## 发布新闻

在 `src/content/news/` 新建 `news-key.zh.md`，并提供英文版本：

```yaml
---
lang: zh
translationKey: news-key
draft: true
title: 待填写经确认的动态标题
date: 2026-11-16
category: 科研进展
summary: 待填写一至两句摘要
---
这里填写正文，支持 Markdown 标题、图片、列表和链接。
```

日期用于倒序排列，未来日期暂不展示。静态网站不会定时自动更新：到发布日期后需要提交修改或在 Actions 手动运行部署。默认首页显示最近三条新闻。

## 更新项目与研究方向

研究方向可直接复制当前中英文 Markdown 修改。项目在 `src/content/projects/` 新建双语文件：

```yaml
---
lang: zh
translationKey: project-key
draft: true
title: 待填写真实项目名称
description: 待填写已确认的项目简介
order: 10
status: 待确认
links: {}
# 确认后可增加：links: {代码: "https://真实资源地址"}
---
项目背景、内容、已验证成果及可公开资源。
```

## 部署到 GitHub Pages

`astro.config.mjs` 已配置 `site: 'https://prime-ime.github.io'`，这是组织主页，**不要添加 `/prime-ime.github.io` 的 base 前缀**。

1. 在有该仓库写入权限的环境登录 GitHub（HTTPS 凭据或 SSH 均可）。
2. 仓库 **Settings → Pages → Build and deployment → Source** 选择 **GitHub Actions**。
3. 推送到既有远程仓库：

   ```bash
   git push -u origin main
   ```

4. 在仓库 **Actions → Build and deploy PRIME Lab** 检查 `build`、`deploy` 均成功，再访问 https://prime-ime.github.io 。必要时使用 **Run workflow** 手动部署。

后续修改内容并提交到 `main` 即自动部署。Pull Request 只执行检查和构建，不部署。CI 使用 Node 24、`npm ci` 和 `npm run verify`；只有检查通过才上传产物并部署。首次配置 Pages 需要仓库管理权限。

本地构建成功并不代表线上已发布。若推送失败，先检查账号是否对 `prime-ime/prime-ime.github.io` 有写入权限、凭据是否允许更新工作流以及网络是否可用。

## 技术与来源

基于 [Scholar-Lite](https://github.com/fjd2004711/scholar-lite)，来源提交 `f43e9de7672ad90f7d8bddbd825b466cae8d9ef5`。保留其 Astro 目录习惯、Markdown 内容集合、BibTeX → Markdown 流程、Pagefind 静态搜索及组件化页面思想；针对 PRIME Lab 重做视觉与双语静态路由，修复导入删除同步，并移除演示数据及未使用的成果栏目。

上游 README 标称 Astro 6，但该提交实际依赖为 Astro 5；本项目基于该源码完成定制，并因已公布的依赖漏洞将构建链升级到 Astro 7.4.12、配套 React 集成及 Sharp 0.35.5（实际解析版本由锁文件固定）。迁移遵循 [Astro 官方升级指南](https://docs.astro.build/en/guides/upgrade-to/v7/)，保留内容集合与静态页面结构。React 仅用于构建期渲染原模板使用的 Lucide 图标，没有客户端 React hydration。交互仅包含轻量移动导航和按需加载的 Pagefind 搜索。首页 SVG 是自制概念示意，不是实际实验结果。

保留上游 [MIT LICENSE](LICENSE)，其声明适用于上游软件及衍生代码。请单独确认新增论文、照片和其他科研资料的使用许可。

为避免上游 BibTeX npm 包携带的过时测试依赖，本项目在 `scripts/vendor/` 保留其原版、无运行依赖的解析核心及 MIT 许可证。
