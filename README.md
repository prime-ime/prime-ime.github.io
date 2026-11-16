# PRIME Lab 学术主页

新疆大学 · 工业建模与能源预测研究组

Predictive Research in Industrial Modeling and Energy

目标地址：https://prime-ime.github.io

网站仅提供中文版，首页 `/`；英文页面和语言切换入口已移除。Astro 静态生成，GitHub Pages 托管，不需要数据库或服务器。

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
npm run test:content # 可选：在临时目录验证非空内容，不改正式资料
```

## 内容放在哪里

| 内容 | 位置 |
| --- | --- |
| 名称、简介、邮箱、办公地址、导师介绍入口 | `src/config.ts` |
| 导航、按钮、空状态及首页中文文案 | `src/i18n/ui.ts` |
| 研究方向 | `src/content/research/*.md` |
| 导师、博士生、硕士生、毕业成员 | `src/content/team/*.md` |
| 招生专业、培养理念、研究介绍与联系建议 | `src/content/join.md` |
| 项目与资源 | `src/content/projects/*.md` |
| 新闻动态 | `src/content/news/*.md` |
| 论文来源 | 根目录 `citations.bib` |
| 本地照片 | `src/assets/` |
| 下载文件 | `public/files/`（链接写 `/files/文件名.pdf`） |
| 组件、统一样式 | `src/components/`、`src/styles/global.css` |

已收录苏雷老师的中文简介、官网照片、公开工作邮箱，以及经 PDF 和 Crossref 核实的四篇 2026 年论文。另已收录苏雷老师主持的四项科研项目。学生个人资料和新闻尚待补充，因此相应栏目保留空状态。空集合在 Astro 构建日志中会产生提示，这是无资料状态下的预期行为，不影响构建。请只发布经核实的资料，并取得照片及个人联系方式的公开许可。研究方向是介绍性文字，不代表已完成项目或验证过的成果。

### 内容规则

网站只发布中文内容，`lang` 固定为 `zh`，也可省略（默认中文）。每条内容使用一个 Markdown 文件，例如 `energy.zh.md`。现有 `translationKey` 字段保留为详情页的唯一网址标识，只用小写英文、数字和短横线；已发布的标识尽量不改。无需创建英文文件。

论文保留原始英文题名、作者姓名及期刊名称，方便检索和引用。课题组英文全称、品牌文字和技术术语仍可用于中文页面的视觉设计。

添加 `draft: true` 可隐藏尚未确认的条目；省略时默认发布。Markdown 正文是详情页内容；列表摘要来自 frontmatter。

## 添加成员

在 `src/content/team/` 新建 `member-key.zh.md`，将以下占位字段替换为真实信息后再改为 `draft: false`。

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

必填 `title`、`author`、四位 `year`，以及 `journal` / `booktitle` / `publisher` / `howpublished` / `institution` 之一；可选 `volume`、`pages`、`note` 保留卷号、页码或文章编号及 Early Access 等出版状态，供 BibTeX 引用使用；页面摘要仅显示期刊或会议名称与年份；其他字段可直接删除。`featured = {true}` 才会出现在首页代表性成果，不从备注猜测奖项。链接支持 `https://`、`http://` 或 `/files/...`；不要使用 Zotero 本机文件路径。

```bash
npm run import-bibtex
```

开发和构建都会自动导入，按年份倒序展示，并提供单篇 BibTeX 展开与完整 `.bib` 下载。自动文件 `src/content/publications/bib-*.md` 不提交，**请直接编辑 `citations.bib`**；条目删除后旧的自动生成文件会同步移除。导入前校验全部记录，错误会阻止发布。独立手写 Markdown 不受删除操作影响。

导入器保留常见作者格式和 BibTeX 引用原文，但不是完整 LaTeX 排版引擎；复杂 LaTeX 宏请在题名展示文本中改用 Unicode 后核对效果。

## 发布新闻

在 `src/content/news/` 新建 `news-key.zh.md`：

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

研究方向可直接复制当前中文 Markdown 修改。项目在 `src/content/projects/` 新建中文文件：

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

基于 [Scholar-Lite](https://github.com/fjd2004711/scholar-lite)，来源提交 `f43e9de7672ad90f7d8bddbd825b466cae8d9ef5`。保留其 Astro 目录习惯、Markdown 内容集合、BibTeX → Markdown 流程、Pagefind 静态搜索及组件化页面思想；针对 PRIME Lab 重做视觉与静态路由，修复导入删除同步，并移除演示数据及未使用的成果栏目。

上游 README 标称 Astro 6，但该提交实际依赖为 Astro 5；本项目基于该源码完成定制，并因已公布的依赖漏洞将构建链升级到 Astro 7.4.12、配套 React 集成及 Sharp 0.35.5（实际解析版本由锁文件固定）。迁移遵循 [Astro 官方升级指南](https://docs.astro.build/en/guides/upgrade-to/v7/)，保留内容集合与静态页面结构。React 仅用于构建期渲染原模板使用的 Lucide 图标，没有客户端 React hydration。交互包含轻量移动导航、BibTeX 复制、渐入效果与按需加载的 Pagefind 搜索。首页 SVG 是自制概念示意，不是实际实验结果。

保留上游 [MIT LICENSE](LICENSE)，其声明适用于上游软件及衍生代码。请单独确认新增论文、照片和其他科研资料的使用许可。

为避免上游 BibTeX npm 包携带的过时测试依赖，本项目在 `scripts/vendor/` 保留其原版、无运行依赖的解析核心及 MIT 许可证。

## 当前资料来源

- 教师资料、工作邮箱与照片：[苏雷老师的学院主页](https://it.xju.edu.cn/info/1144/3136.htm)，2026-11-16 核对。学院页脚地址不是已确认的实验室办公地址，因此不填入办公地址字段。
- 四篇论文：用户提供的正式出版 PDF，并与 DOI 对应的 Crossref 登记记录核对题名、作者顺序、年份、卷号和页码。郭跃跃参与论文以 Lei Su 为第一作者；不同论文中的姓名拼写保持出版原文。
- TII 记录目前为 Early Access，尚无正式卷期；后续确定卷期后更新 `citations.bib`。四篇论文均设为首页代表性成果。
- 论文按钮指向出版社页面，代码按钮采用论文原文给出的公开仓库。本站未重新分发出版社 PDF。教师照片仅用于本人学术简介，不属于网站代码的 MIT 授权范围。
- 未将目录中的 AAAI、TIM 文稿纳入已发表列表；学生学位类别、在读或毕业状态需另行确认后再添加成员资料。

- 科研项目依据学院主页“主持项目”栏目收录四项，保留原项目名称、类别、经费、期限及已公开编号；“参与项目”未纳入主持列表。

## 站内介绍与招生内容

教师完整介绍维护在 `src/content/team/lei-su.zh.md`，团队卡片优先链接本站详情。教育经历、研究兴趣、项目和培养介绍可直接在本站阅读；详情页底部保留学院资料来源。

“加入我们”的正文维护在 `src/content/join.md`，公开邮箱和导师入口在 `src/config.ts`。联系建议不代表正式报考门槛，招生名额与时间只在取得当年官方通知后补充。

访客页面不显示资料整理说明与核对日期；来源记录保留在本 README 中。官网未公开的项目编号按网站展示约定写为“无”，不据此认定该项目没有立项编号。


## UI 设计规范与维护

2026-11-16 的视觉优化保留 Astro、内容集合、全部既有路由与科研资料。统一样式在 `src/styles/global.css`，按设计变量、导航、首页、研究、论文、团队、内页、页脚和响应式分段维护；没有新增生产依赖。

| 规范 | 当前约定 |
| --- | --- |
| 主色 | 深蓝 `#10263f`；正文 `#172e47`；链接 `#345f89` |
| 背景 | 冷白 `#fcfdff`；浅蓝灰 `#f0f4f8`；分割线 `#dbe3eb` |
| 辅色 | 浅蓝 `#a9c8e9` 用于深底强调，正文辅助色使用 `#5d6d7e` |
| 字体 | 本地 Inter Regular / Bold；中文采用系统苹方、微软雅黑等，不请求外部字体服务 |
| 字级 | 桌面正文 16px、移动长文 15px；列表 14–15px；英文论文题名 21px / 手机 18px |
| 空间 | 最大内容宽 1240px；桌面章节间距 96px、平板 72px、手机 54px |
| 组件 | 4px 圆角、1px 边框；阴影仅用于悬停；主要操作至少 44–48px 高 |
| 断点 | 1100px 以下折叠导航；768px 以下切换单列；320px 保留完整阅读与操作能力 |
| 动效 | 悬停 200–250ms；章节首次进入视口渐入 550ms；遵循系统减少动态效果偏好 |

首页以 PRIME 品牌和概念曲面建立识别度；研究专题使用系统网络、预测轨迹和机理融合三种 SVG 示意（`ResearchVisual.astro`），不表示实验结果。首页导师介绍自动取已有导师记录。研究内页采用横向专题、论文按年份分组、团队采用人物介绍、项目采用编号列表、新闻采用时间列表；正文详情目录从 Markdown 的二、三级标题自动生成。新增内容仍只需维护原来的内容文件。

导航和 BibTeX 展开在关闭 JavaScript 后仍可用；复制按钮仅在浏览器提供 Clipboard API 时显示，失败时提示手动复制。渐入效果不预先隐藏内容，关闭脚本或开启减少动态效果时，正文正常显示。Pagefind 的主题变量放在 `.search-panel`，避免其自身样式覆盖。

本轮验证：

- `npm run verify`：类型检查、3 项 BibTeX 测试、生产构建与 17 页／493 个站内链接及资源校验通过。
- `npm run test:content`：在临时目录检查未来新增成员、项目、新闻、论文及草稿排除，未向正式内容写入测试记录。
- Chromium 检查 320、390、768、1024、1440、1920px 下全部 17 页，无横向溢出或脚本异常。
- 检查导航展开、Escape 关闭与焦点恢复、窗口切换、键盘展开引用、复制成功与失败、BibTeX 下载、中英文搜索、无结果与清除、目录跳转、跳过导航、关闭 JavaScript 及减少动态效果。
- axe-core 在手机和桌面检查 11 类页面（包括展开引用与搜索结果），WCAG A/AA 自动规则检查通过。自动检查不等同于完整的人工无障碍认证；未进行 Safari、Firefox 真机验证。

本地截图与临时检查记录保存在被 Git 忽略的 `.qa/`，不参与部署。上线使用原有 GitHub Pages 工作流；本地检查通过后，提交并推送到 `main`，以对应提交的 Actions 部署结果及线上验收为准。
