# 多模型GPU显存计算器 | Multimodel GPU Memory Calculator

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/multimodel-gpu-memory-calculator)

一个专业的AI推理场景显存需求计算与服务器推荐工具，帮助开发者和企业准确评估AI项目的硬件需求。

🌐 **在线体验**: [https://multimodel-gpu-memory-calculator.vercel.app](https://multimodel-gpu-memory-calculator.vercel.app)

## 🌟 项目亮点

- 🇨🇳 **支持中国主流模型**: Qwen、DeepSeek、ChatGLM、Baichuan、Yi等
- 🔢 **多模型配置**: 支持语言模型、多模态模型、TTS模型同时部署
- 🌍 **双语界面**: 完整的中英文支持
- 📊 **精确计算**: 基于实际模型参数的科学计算方法
- 🎯 **智能推荐**: 根据显存需求推荐合适的GPU服务器

## 功能特性

### 🎯 精确计算
- **模型权重显存**：支持FP16、INT8、INT4等不同精度
- **KV Cache显存**：基于序列长度和批处理大小动态计算
- **中间激活显存**：考虑推理过程中的临时内存占用
- **辅助模型显存**：包含Embedding和Rerank模型的内存需求
- **系统开销**：预留系统运行所需的额外内存

### 🚀 智能推荐
- **服务器配置推荐**：基于计算结果推荐合适的GPU服务器
- **性能参数对比**：显示各服务器的算力、价格等关键指标
- **优化建议**：提供显存优化和性能调优建议

### 📊 可视化展示
- **显存占用分解图**：直观展示各部分显存占用比例
- **服务器适配状态**：清晰标识推荐和不推荐的服务器
- **实时计算结果**：参数调整后即时更新计算结果

## 🤖 支持的模型

### 语言模型 (Language Models)
- **Qwen系列**: Qwen-7B/14B/72B, Qwen2-7B/72B
- **DeepSeek系列**: DeepSeek-7B/67B, DeepSeek-Coder-7B/33B
- **ChatGLM系列**: ChatGLM3-6B, ChatGLM4-9B
- **Baichuan系列**: Baichuan2-7B/13B
- **Yi系列**: Yi-6B/34B
- **Llama系列**: Llama2-7B/13B/70B

### 多模态模型 (Multimodal Models)
- **Qwen-VL系列**: Qwen-VL-7B/14B
- **ChatGLM4V**: ChatGLM4V-9B
- **Yi-VL系列**: Yi-VL-6B/34B

### TTS模型 (Text-to-Speech)
- **CosyVoice**: CosyVoice-300M
- **ChatTTS**: ChatTTS-40K
- **FishTTS**: FishTTS-1B

### 辅助模型
- **Embedding模型**: 文本向量化模型
- **Rerank模型**: 检索结果重排序模型
- **OCR模型**: 光学字符识别模型

## 技术栈

- **前端框架**：Next.js 14 + React 18
- **样式方案**：Tailwind CSS
- **图标库**：Lucide React
- **类型支持**：TypeScript
- **部署平台**：Vercel

## 快速开始

### 环境要求
- Node.js 18+
- npm 或 yarn

### 安装依赖
```bash
npm install
# 或
yarn install
```

### 开发运行
```bash
npm run dev
# 或
yarn dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

### 构建部署
```bash
npm run build
npm start
```

## 使用指南

### 1. 配置主推理模型
- 选择预设模型或自定义模型参数
- 设置模型精度（FP16/INT8/INT4）
- 输入模型的参数量、隐藏层维度、层数等

### 2. 配置辅助模型
- 根据业务需求启用Embedding模型
- 根据检索场景启用Rerank模型
- 设置相应的模型大小参数

### 3. 设置业务负载
- **批处理大小**：同时处理的请求数量
- **序列长度**：输入输出文本的最大长度
- **并发用户数**：同时在线的用户数量
- **QPS**：每秒查询请求数

### 4. 调整系统配置
- **KV Cache占比**：缓存占用的显存比例
- **系统开销占比**：系统运行的额外开销

### 5. 查看计算结果
- 显存需求分解和总量
- 服务器推荐列表
- 性能优化建议

## 计算公式

### 显存需求计算
```
总显存 = 模型权重 + KV Cache + 中间激活 + 辅助模型 + 系统开销

其中：
- 模型权重 = 参数量 × 精度字节数
- KV Cache = batch_size × seq_len × hidden_dim × layers × 2 × 精度字节数 / (1024³)
- 中间激活 ≈ 模型权重 × 15%
- 系统开销 = 基础显存 × 系统开销占比
```

### 服务器推荐逻辑
- 显存容量需大于计算需求的110%（预留10%余量）
- 按适配性和性价比排序推荐
- 提供详细的规格参数对比

## 🚀 部署到Vercel

### 方法一：一键部署
点击下方按钮一键部署到Vercel：

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/multimodel-gpu-memory-calculator)

### 方法二：手动部署
1. Fork本项目到你的GitHub账户
2. 在[Vercel](https://vercel.com)中导入项目
3. 选择框架为Next.js
4. 点击部署

### 方法三：使用Vercel CLI
```bash
# 安装Vercel CLI
npm i -g vercel

# 登录Vercel
vercel login

# 部署项目
vercel --prod
```

### 环境变量配置
项目无需额外的环境变量配置，开箱即用。

## 🔧 本地开发

```bash
# 克隆项目
git clone https://github.com/your-username/multimodel-gpu-memory-calculator.git
cd multimodel-gpu-memory-calculator

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 启动生产服务器
npm start
```

## 贡献指南

欢迎提交Issue和Pull Request来改进这个项目：

1. Fork项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启Pull Request

## 许可证

本项目采用MIT许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 联系方式

如有问题或建议，请通过以下方式联系：

- 提交GitHub Issue
- 发送邮件至：[your-email@example.com]

---

**多模型GPU显存计算器** - 让AI硬件选型更科学、更精准！