# TransHub - 专业翻译平台

一个现代化的翻译管理平台，提供完整的翻译工作流程解决方案，支持机器翻译、人工翻译和混合翻译模式。

## ✨ 特性

### 🎯 核心功能

- **多种翻译模式**: 机器翻译、人工翻译、混合翻译
- **项目管理**: 完整的翻译项目生命周期管理
- **译者管理**: 专业译者团队协作和绩效管理
- **翻译工作台**: 高效的翻译编辑界面，支持辅助窗口
- **质量控制**: 翻译记忆库、术语库、质量检查

### 💼 企业级功能

- **API 集成**: 完整的 RESTful API 和 Webhook 支持
- **计费系统**: 灵活的定价方案和使用量统计
- **团队协作**: 多角色权限管理和实时协作
- **数据分析**: 详细的项目进度和团队绩效分析
- **系统集成**: 支持 GitHub、Slack、Figma 等第三方集成
- **其他**:

### 🎨 用户体验

- **现代化界面**: 基于 Tailwind CSS 的响应式设计
- **多语言支持**: 国际化 (i18n) 和本地化
- **无障碍设计**: 符合 WCAG 2.1 AA 标准
- **移动端适配**: PWA 支持，离线翻译功能

## 🛠️ 技术栈

- **前端框架**: React 18 + TypeScript
- **UI 组件**: Tailwind CSS + Lucide Icons
- **路由管理**: React Router v6
- **构建工具**: Vite
- **代码规范**: ESLint + Prettier

## 📦 项目结构

```
src/
├── frontend/
│   ├── Dashboard.tsx     # 主仪表板组件
│   ├── AuxViewer.tsx     # 辅助查看器组件
│   └── App.tsx           # 应用根组件
├── main.tsx              # 应用入口点
└── index.css             # 全局样式

public/                   # 静态资源
docs/                    # 项目文档
wireframes.txt           # 界面设计规范
```

## 🚀 快速开始

### 环境要求

- Node.js 16.0 或更高版本
- npm 或 yarn 包管理器

### 安装和运行

1. **克隆项目**

   ```bash
   git clone <repository-url>
   cd transhub-platform
   ```

2. **安装依赖**

   ```bash
   npm install
   ```

3. **启动开发服务器**

   ```bash
   npm run dev
   ```

4. **访问应用**
   打开浏览器访问 `http://localhost:3000`

### 构建生产版本

```bash
npm run build
npm run preview
```

## 🚀 部署

### GitHub Pages 自动部署

项目配置了 GitHub Actions 自动部署到 GitHub Pages：

1. **推送代码到 main 分支**：

   ```bash
   git add .
   git commit -m "Your commit message"
   git push origin main
   ```

2. **GitHub Actions 自动执行**：

   - 安装依赖
   - 运行 `npm run build`
   - 部署到 GitHub Pages

3. **访问部署的应用**：
   https://jackyangus.github.io/vite-project

### 手动部署

如需手动部署到其他平台：

```bash
npm run build
# 将 dist/ 目录上传到你的服务器
```

## 📱 功能模块

### 1. 仪表板概览

- 实时统计数据和关键指标
- 项目进度可视化
- 快速操作面板
- 最新活动动态

### 2. 项目管理

- 项目创建和配置向导
- 多文件格式支持 (JSON, XML, Excel, TXT)
- 项目状态跟踪和进度管理
- 文件版本控制

### 3. 翻译工作台

- 分段翻译界面
- 翻译记忆库集成
- 实时预览和上下文信息
- 辅助窗口支持
- 键盘快捷键

### 4. 译者管理

- 译者资料和技能管理
- 工作负载分配
- 绩效评估和排名
- 协作工具集成

### 5. 计费系统

- 多种定价方案
- 使用量统计和分析
- 自动计费和发票生成
- 付款方式管理

### 6. API 接口

- RESTful API 文档
- SDK 和代码示例
- Webhook 配置
- API 密钥管理

### 7. 系统设置

- 账户信息管理
- 安全设置和双因素认证
- 通知偏好配置
- 第三方集成管理

## 🔧 配置选项

### 环境变量

创建 `.env` 文件配置环境变量:

```env
VITE_API_BASE_URL=https://api.transhub.com
VITE_APP_NAME=TransHub
VITE_VERSION=1.0.0
```

### Tailwind 自定义

在 `tailwind.config.js` 中自定义主题颜色和样式。

## 🧪 开发指南

### 代码规范

- 使用 TypeScript 进行类型安全
- 遵循 ESLint 和 Prettier 配置
- 组件采用函数式设计
- 使用 React Hooks 管理状态

### 组件开发

- 所有组件使用 TypeScript
- 提供完整的 Props 类型定义
- 实现响应式设计
- 支持无障碍访问

### 样式指南

- 优先使用 Tailwind CSS 工具类
- 自定义样式放在 `index.css` 中
- 保持一致的设计系统
- 支持深色模式

## 🌐 国际化支持

项目支持多语言，当前包含:

- 中文简体 (默认)
- English
- 日本語
- 한국어

## 📊 性能优化

- 代码分割和懒加载
- 图片优化和懒加载
- 缓存策略
- 打包体积优化

## 🔒 安全特性

- API 密钥管理
- 双因素认证
- 数据加密传输
- 安全审计日志

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支
3. 提交代码变更
4. 推送到分支
5. 创建 Pull Request

## 📄 许可证

MIT License - 查看 [LICENSE](LICENSE) 文件了解更多详情。

## 📞 支持

- 技术文档: [docs/](docs/)
- 问题反馈: GitHub Issues
- 邮件支持: support@transhub.com

---

© 2025 TransHub. 专业翻译平台解决方案。
