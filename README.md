# 尺K · 生日快乐

一份写给好兄弟 **尺K** 的二十岁生日礼物。用照片搭的一个小网站。

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
| 所有文案（信件、关于、分组的说明） | `src/data/content.js` |
| 照片顺序、分组、每张的配文 | `src/data/content.js` 里的 `PHOTOS` |
| 替换照片 | 覆盖 `public/photos/full/*.jpg` 与 `public/photos/thumb/*.jpg` |
| 名字 / 生日 / 送出的日期 | `src/data/content.js` 顶部的 `PROFILE` |
| 配色 | `tailwind.config.js` 里的 `colors` |
| 各屏的排版结构 | `src/components/screens/*.jsx` |

照片想重新批量压缩一遍，就跑（需要 Pillow）：

```bash
python scripts/process_photos.py
```

---

## 三、发布到 GitHub Pages（免费，拿到一个二级域名）

### 1. 登录 GitHub

本机已装 `gh`（GitHub 官方命令行）。在**你自己的终端**里执行一次：

```bash
gh auth login
```

选 `GitHub.com` → `HTTPS` → `Login with a web browser`，浏览器里授权即可。
（不想用 gh 也行，直接在 github.com 网页上建仓库，然后按下面的 git 命令推。）

### 2. 建仓库并推代码

仓库名建议就叫 **`chike-birthday`**（下面步骤都按这个名字写；换名字的话，
其它地方不用改，部署时的工作流会自动读取仓库名）。

```bash
cd "F:/MyProject/个人网站/chike-birthday"

git init -b main
git add .
git commit -m "尺K 二十岁生日快乐"
git remote add origin https://github.com/<你的用户名>/chike-birthday.git
git push -u origin main
```

### 3. 打开 Pages（一次性设置，1 分钟）

打开仓库页面 → **Settings** → 左侧 **Pages**：

- **Source** 选 `GitHub Actions`（不是 "Deploy from a branch"）

不用再做别的。仓库里已经带了 `.github/workflows/deploy.yml`，
推送之后它自动构建并发布。到 **Actions** 标签页能看到进度，绿勾即成功。

### 4. 你的免费网址

```
https://<你的用户名>.github.io/chike-birthday/
```

比如用户名是 `sunfleeting`，就是 `https://sunfleeting.github.io/chike-birthday/`。
这个地址已经可以直接发给尺K 了。

> **为什么图片不会 404**：工作流构建时带上了 `BASE=/<仓库名>/`，
> 资源路径会自动加前缀。路由用的是 hash（`/#/gallery`），刷新任意页面也不会 404。

### 5. 以后改了内容想更新

```bash
git add .
git commit -m "改了点东西"
git push
```

推上去大约 1 分钟后自动重新发布。

---

## 四、（可选）换成自己的域名

想用 `chikehappy.com` 这种自己的域名，两件事：

**1. 买域名**：阿里云 / 腾讯云 / Cloudflare / Namecheap 都行，`.com` 约 50–80 元/年。

**2. 解析 + 告诉 GitHub**：

在域名服务商处加 4 条 A 记录指向 GitHub Pages（或 1 条 CNAME 指向 `<你的用户名>.github.io`）：

```
A     @     185.199.108.153
A     @     185.199.109.153
A     @     185.199.110.153
A     @     185.199.111.153
CNAME www   <你的用户名>.github.io
```

然后在仓库 **Settings → Pages → Custom domain** 填上域名，勾选
**Enforce HTTPS**。证书会自动签发，通常 10 分钟内生效。

> ⚠️ 用自定义域名后，因为域名在根路径下，构建时 `BASE` 要是 `/`，
> 需要把 `.github/workflows/deploy.yml` 里的
> `BASE: /${{ github.event.repository.name }}/` 改成 `BASE: /`。

---

## 五、目录结构

```
chike-birthday/
├─ .github/workflows/deploy.yml   自动部署到 GitHub Pages
├─ public/
│  ├─ photos/full/                网页用大图（长边 1600px）
│  ├─ photos/thumb/               缩略图（长边 640px）
│  └─ favicon.svg                 蜡烛图标
├─ scripts/
│  ├─ process_photos.py           批量矫正方向 + 压缩
│  └─ verify.py                   Playwright 截图核验
└─ src/
   ├─ App.jsx                     翻页主框架（桌面滚轮翻页 / 移动端正常滚动）
   ├─ data/content.js             全部文案与照片索引
   ├─ components/
   │  ├─ Cake.jsx                 可交互生日蛋糕
   │  ├─ ImageTrail.jsx           鼠标照片拖尾
   │  ├─ LetterSwap.jsx           按钮字母翻转
   │  ├─ Navbar.jsx / Footer.jsx
   │  └─ screens/                 四屏内容
   └─ pages/GalleryPage.jsx       全部照片页
```

---

生日快乐，尺K。🎂
