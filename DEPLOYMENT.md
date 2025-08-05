# 部署指南 | Deployment Guide

## 🚀 快速部署到Vercel

### 步骤1: 推送到GitHub

```bash
# 初始化Git仓库（如果还没有）
git init

# 添加所有文件
git add .

# 提交代码
git commit -m "feat: 多模型GPU显存计算器 - 支持多模型配置和中国主流模型"

# 添加远程仓库（替换为你的GitHub仓库地址）
git remote add origin https://github.com/your-username/multimodel-gpu-memory-calculator.git

# 推送到GitHub
git branch -M main
git push -u origin main
```

### 步骤2: 部署到Vercel

#### 方法A: 通过Vercel Dashboard
1. 访问 [vercel.com](https://vercel.com)
2. 点击 "New Project"
3. 导入你的GitHub仓库
4. 框架选择 "Next.js"
5. 点击 "Deploy"

#### 方法B: 一键部署
点击下方按钮：
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/multimodel-gpu-memory-calculator)

#### 方法C: 使用Vercel CLI
```bash
# 安装Vercel CLI
npm i -g vercel

# 登录Vercel
vercel login

# 部署
vercel --prod
```

## 🔧 环境配置

### 本地开发
```bash
# 克隆项目
git clone https://github.com/your-username/multimodel-gpu-memory-calculator.git
cd multimodel-gpu-memory-calculator

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

### 生产构建
```bash
# 构建项目
npm run build

# 启动生产服务器
npm start
```

## 📋 部署检查清单

- [ ] 代码已推送到GitHub
- [ ] package.json配置正确
- [ ] 构建命令测试通过 (`npm run build`)
- [ ] 所有依赖已安装
- [ ] TypeScript类型检查通过
- [ ] 响应式设计测试完成
- [ ] 中英文切换功能正常
- [ ] 多模型配置功能正常

## 🌐 域名配置

部署完成后，Vercel会自动分配一个域名，格式如：
- `https://multimodel-gpu-memory-calculator.vercel.app`
- `https://multimodel-gpu-memory-calculator-git-main-username.vercel.app`

如需自定义域名：
1. 在Vercel项目设置中添加域名
2. 配置DNS记录指向Vercel
3. 等待SSL证书自动配置

## 🔍 故障排除

### 常见问题

1. **构建失败**
   ```bash
   # 本地测试构建
   npm run build
   ```

2. **依赖问题**
   ```bash
   # 清除缓存重新安装
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **TypeScript错误**
   ```bash
   # 检查类型
   npx tsc --noEmit
   ```

### 性能优化

- 启用Vercel Analytics
- 配置CDN缓存
- 优化图片资源
- 启用压缩

## 📊 监控和分析

部署后可以在Vercel Dashboard中查看：
- 部署状态
- 访问统计
- 性能指标
- 错误日志

---

🎉 **恭喜！你的多模型GPU显存计算器已成功部署！**