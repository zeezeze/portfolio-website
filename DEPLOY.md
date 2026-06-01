# 首次发布指南

项目代码已就绪。请在 **本机终端**（Cursor 内置终端或 PowerShell）中按顺序执行以下步骤。

> 前提：已安装 [Node.js](https://nodejs.org/)（含 npm）和 [Git](https://git-scm.com/)。

## 1. 安装依赖并本地预览

```powershell
cd D:\project\protfolio-website
npm install
npm run dev
```

打开 http://localhost:3000 ，确认首页、作品列表、`/works/sample-demo` 交互 demo 正常。

## 2. 初始化 Git 并首次提交

```powershell
git init
git add .
git commit -m "feat: initial portfolio site with sample interactive work"
```

## 3. 创建 GitHub 仓库并推送

1. 打开 https://github.com/new 创建空仓库（例如 `portfolio-website`），**不要**勾选 README / .gitignore（本地已有）。
2. 执行（替换 `<你的用户名>` 和仓库名）：

```powershell
git remote add origin https://github.com/<你的用户名>/portfolio-website.git
git branch -M main
git push -u origin main
```

## 4. Vercel 部署

1. 登录 https://vercel.com ，用 GitHub 账号授权。
2. **Add New → Project** → 选择刚推送的仓库。
3. Framework 自动识别为 **Next.js**，保持默认，点击 **Deploy**。
4. 约 1–2 分钟后获得 `https://xxx.vercel.app`，即可分享链接。

之后每次修改代码并 `git push`，Vercel 会自动重新部署。

## 5. 添加新作品

见 [README.md](./README.md) 中的 checklist。
