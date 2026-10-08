# 尺K · 生日快乐

一份写给好兄弟 **尺K** 的二十岁生日礼物。用照片搭的一个小网站。

**线上地址 → https://sunfleeting-debug.github.io/chike-birthday/**

- 全屏纵向翻页，鼠标划过会有照片拖尾
- 四屏：封面 → 关于 → 时刻 → 生日
- 「时刻」里可以进去看全部 21 张照片，按 *江边 / 高处 / 我们* 分组
- 「生日」那屏有一个可以点亮的生日蛋糕，吹灭之后会下彩带、跳出许愿

技术栈：Vite + React 18 + TailwindCSS + Framer Motion（纯静态站点，无后端）。

---

## 一、本地跑起来

```bash
npm install
npm run dev          # http://localhost:3000
```

打包 & 本地预览产物：

```bash
npm run build
npm run preview      # http://localhost:4173
```

---

## 二、想改内容？只改这几个地方

| 想改什么 | 改哪里 |
| --- | --- |
| 所有文案（信件、关于、分组说明） | `src/data/content.js` |
| 照片顺序、分组、每张的配文 | `src/data/content.js` 里的 `PHOTOS` |
| 替换照片 | 覆盖 `public/photos/full/*.jpg` 与 `public/photos/thumb/*.jpg` |
| 名字 / 生日 / 送出的日期 | `src/data/content.js` 顶部的 `PROFILE` |
| 配色 | `tailwind.config.js` 里的 `colors` |
| 各屏排版结构 | `src/components/screens/*.jsx` |

照片想重新批量压缩一遍（EXIF 矫正 + 缩到 1600px），跑（需要 Pillow）：

```bash
python scripts/process_photos.py
```

---

## 三、发布 / 更新

### 改完内容，一条命令重新发布

```bash
npm run deploy
```

`scripts/deploy.sh` 会自动：从 git remote 读出仓库名 → 按 `/<仓库名>/` 作为
base 构建 → 把 `dist/` 推成 `gh-pages` 分支。约 1 分钟后生效。

### 当前线上是怎么部署的

| 项 | 值 |
| --- | --- |
| 仓库 | https://github.com/sunfleeting-debug/chike-birthday （public） |
| 线上地址 | https://sunfleeting-debug.github.io/chike-birthday/ |
| Pages 来源 | `gh-pages` 分支 / 根目录 |
| 发布方式 | 本地 `npm run deploy` 构建后推分支 |

> **为什么不用 GitHub Actions 自动部署？**
> 推送 `.github/workflows/` 里的文件需要 Personal Access Token 带 `workflow` 作用域，
> 当前令牌没有，会报 `refusing to allow a Personal Access Token to create or update workflow`。
> 工作流已经写好放在 `ci/deploy.yml.template`，想启用的话：
>
> ```bash
> gh auth refresh -s workflow
> mkdir -p .github/workflows && mv ci/deploy.yml.template .github/workflows/deploy.yml
> git add . && git commit -m "ci: 启用 GitHub Actions 自动部署" && git push
> ```
>
> 然后到仓库 **Settings → Pages → Source** 改成 **GitHub Actions**。
> 之后每次 `git push` 都会自动发布，就不用再跑 `npm run deploy` 了。

---

## 四、（可选）换成自己的域名

想要 `chikehappy.com` 这种自己的域名，两件事：

**1. 买域名**：阿里云 / 腾讯云 / Cloudflare / Namecheap 都行，`.com` 约 50–80 元/年。

**2. 解析 + 告诉 GitHub**：

在域名服务商处加 4 条 A 记录指向 GitHub Pages：

```
A     @     185.199.108.153
A     @     185.199.109.153
A     @     185.199.110.153
A     @     185.199.111.153
CNAME www   sunfleeting-debug.github.io
```

然后在仓库 **Settings → Pages → Custom domain** 填上域名，勾选 **Enforce HTTPS**。
证书自动签发，通常 10 分钟内生效。

> ⚠️ 用自定义域名后站点在根路径，`scripts/deploy.sh` 里的
> `BASE="/${REPO}/"` 要改成 `BASE="/"`。

---

## 五、目录结构

```
chike-birthday/
├─ ci/deploy.yml.template          GitHub Actions 工作流（待启用）
├─ public/
│  ├─ photos/full/                 网页用大图（长边 1600px，共 21 张）
│  ├─ photos/thumb/                缩略图（长边 640px）
│  └─ favicon.svg                  蜡烛图标
├─ scripts/
│  ├─ deploy.sh                    一键发布到 gh-pages
│  ├─ process_photos.py            批量矫正方向 + 压缩
│  └─ verify*.py                   Playwright 截图核验（本地 / 线上）
└─ src/
   ├─ App.jsx                      翻页主框架（桌面滚轮翻页 / 移动端正常滚动）
   ├─ data/content.js              全部文案与照片索引
   ├─ components/
   │  ├─ Cake.jsx                  可交互生日蛋糕
   │  ├─ ImageTrail.jsx            鼠标照片拖尾
   │  ├─ LetterSwap.jsx            按钮字母翻转
   │  ├─ Navbar.jsx / Footer.jsx
   │  └─ screens/                  四屏内容
   └─ pages/GalleryPage.jsx        全部照片页
```

---

生日快乐，尺K。🎂
