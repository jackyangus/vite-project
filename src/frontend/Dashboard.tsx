import React, { useState } from "react";
import {
  Globe,
  FileText,
  Users,
  Settings,
  Upload,
  Download,
  User,
  Bell,
  Search,
  Filter,
  Plus,
  Eye,
  Edit,
  Trash2,
  Clock,
  CheckCircle,
  AlertCircle,
  DollarSign,
  BarChart3,
  Languages,
  Zap,
  UserCheck,
  FileJson,
  FileSpreadsheet,
  FileX,
  Menu,
  X,
  ChevronRight,
  Star,
  TrendingUp,
  Activity,
  Calendar,
  ExternalLink,
} from "lucide-react";

const Dashboard = () => {
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const navigationItems = [
    { id: "dashboard", label: "概览", icon: BarChart3 },
    { id: "projects", label: "项目", icon: FileText },
    { id: "translators", label: "译者", icon: Users },
    { id: "pricing", label: "计费", icon: DollarSign },
    { id: "api", label: "API", icon: Globe },
    { id: "settings", label: "设置", icon: Settings },
  ];

  const renderSidebar = () => (
    <div
      className={`bg-white border-r border-gray-100 transition-all duration-300 ease-out ${sidebarOpen ? "w-72" : "w-20"} min-h-screen backdrop-blur-xl bg-white/95`}
    >
      <div className="p-6 border-b border-gray-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25">
            <Languages className="w-6 h-6 text-white" />
          </div>
          {sidebarOpen && (
            <div>
              <h1 className="text-xl font-semibold text-gray-900">TransHub</h1>
              <p className="text-xs text-gray-500 font-medium">专业翻译平台</p>
            </div>
          )}
        </div>
      </div>
      <nav className="p-4 space-y-2">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              className={`w-full flex items-center gap-4 p-3 rounded-2xl transition-all duration-200 ease-out group ${
                isActive ? "bg-blue-50 text-blue-600 shadow-sm" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Icon
                className={`w-5 h-5 transition-colors duration-200 ${
                  isActive ? "text-blue-600" : "text-gray-500 group-hover:text-gray-700"
                }`}
              />
              {sidebarOpen && <span className="font-medium text-sm">{item.label}</span>}
            </button>
          );
        })}
      </nav>
    </div>
  );

  const renderHeader = () => (
    <header className="bg-white/80 backdrop-blur-xl border-b border-gray-100 px-8 py-6 sticky top-0 z-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors duration-200"
          >
            <Menu className="w-5 h-5 text-gray-600" />
          </button>
          <div className="relative">
            <Search className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="搜索项目、译者或文档..."
              className="pl-12 pr-6 py-3 w-96 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200 text-sm font-medium placeholder-gray-500"
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-3 hover:bg-gray-100 rounded-2xl relative transition-colors duration-200 group">
            <Bell className="w-5 h-5 text-gray-600 group-hover:text-gray-800" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
          <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-2xl cursor-pointer transition-colors duration-200">
            <div className="w-10 h-10 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-gray-600" />
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-gray-900">管理员</p>
              <p className="text-xs text-gray-500">在线</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );

  const renderDashboard = () => (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">早上好！</h1>
          <p className="text-gray-600 font-medium">这是您今天的翻译平台概览</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium text-sm transition-colors duration-200">
            导出报告
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-semibold text-sm transition-all duration-200 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 flex items-center gap-2">
            <Plus className="w-4 h-4" />
            新建项目
          </button>
        </div>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            title: "活跃项目",
            value: "128",
            change: "+12%",
            icon: FileText,
            color: "blue",
            bgGradient: "from-blue-50 to-blue-100",
            iconBg: "bg-blue-500",
          },
          {
            title: "在线译者",
            value: "45",
            change: "+8%",
            icon: UserCheck,
            color: "green",
            bgGradient: "from-green-50 to-green-100",
            iconBg: "bg-green-500",
          },
          {
            title: "本月收入",
            value: "¥52,340",
            change: "+23%",
            icon: DollarSign,
            color: "purple",
            bgGradient: "from-purple-50 to-purple-100",
            iconBg: "bg-purple-500",
          },
          {
            title: "API调用",
            value: "1,234",
            change: "+15%",
            icon: Zap,
            color: "orange",
            bgGradient: "from-orange-50 to-orange-100",
            iconBg: "bg-orange-500",
          },
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-3xl p-8 border border-gray-100 hover:shadow-xl hover:shadow-gray-100/50 transition-all duration-300 group"
            >
              <div className="flex items-start justify-between mb-6">
                <div className={`p-4 rounded-2xl ${stat.iconBg} shadow-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex items-center gap-1 text-green-600 text-sm font-semibold">
                  <TrendingUp className="w-4 h-4" />
                  {stat.change}
                </div>
              </div>
              <div>
                <p className="text-gray-600 text-sm font-medium mb-2">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* 图表和活动 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 项目概览图表 */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-8 border border-gray-100">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">项目趋势</h3>
              <p className="text-gray-600 text-sm">过去30天的项目完成情况</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-600 font-medium">完成</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                <span className="text-sm text-gray-600 font-medium">进行中</span>
              </div>
            </div>
          </div>
          <div className="h-64 bg-gradient-to-t from-blue-50 to-transparent rounded-2xl flex items-end justify-center">
            <div className="text-center text-gray-500">
              <Activity className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p className="text-sm">图表数据展示区域</p>
            </div>
          </div>
        </div>

        {/* 最新活动 */}
        <div className="bg-white rounded-3xl p-8 border border-gray-100">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-gray-900">最新活动</h3>
            <button className="text-blue-600 text-sm font-medium hover:text-blue-700">查看全部</button>
          </div>
          <div className="space-y-6">
            {[
              {
                type: "project",
                title: "新项目创建",
                desc: "电商网站本地化",
                time: "2分钟前",
                icon: FileText,
                iconBg: "bg-blue-100",
                iconColor: "text-blue-600",
              },
              {
                type: "translator",
                title: "译者加入",
                desc: "张三 已通过审核",
                time: "1小时前",
                icon: UserCheck,
                iconBg: "bg-green-100",
                iconColor: "text-green-600",
              },
              {
                type: "api",
                title: "API调用",
                desc: "批量翻译接口",
                time: "3小时前",
                icon: Zap,
                iconBg: "bg-orange-100",
                iconColor: "text-orange-600",
              },
            ].map((activity, index) => {
              const Icon = activity.icon;
              return (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
                >
                  <div className={`p-3 rounded-xl ${activity.iconBg}`}>
                    <Icon className={`w-4 h-4 ${activity.iconColor}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 text-sm mb-1">{activity.title}</p>
                    <p className="text-gray-600 text-sm truncate">{activity.desc}</p>
                    <p className="text-gray-400 text-xs mt-1">{activity.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 快速操作 */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-3xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold mb-2">开始您的翻译项目</h3>
            <p className="text-blue-100 mb-6">上传文档，选择语言，我们的AI和专业译者团队将为您提供高质量翻译</p>
            <div className="flex items-center gap-4">
              <button className="bg-white text-blue-600 px-6 py-3 rounded-2xl font-semibold hover:bg-gray-50 transition-colors duration-200">
                创建项目
              </button>
              <button className="text-blue-100 hover:text-white font-medium transition-colors duration-200 flex items-center gap-2">
                了解更多
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="hidden lg:block">
            <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center">
              <Languages className="w-16 h-16 text-white/50" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderProjects = () => (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">项目管理</h1>
          <p className="text-gray-600 font-medium">管理和监控您的翻译项目</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium text-sm transition-colors duration-200 flex items-center gap-2">
            <Filter className="w-4 h-4" />
            筛选
          </button>
          <button
            onClick={() => setCurrentPage("create-project")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-semibold text-sm transition-all duration-200 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            新建项目
          </button>
        </div>
      </div>

      {/* 搜索和筛选 */}
      <div className="bg-white rounded-3xl p-6 border border-gray-100">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="搜索项目名称、描述或ID..."
              className="pl-12 pr-6 py-3 w-full bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200 text-sm font-medium"
            />
          </div>
          <div className="flex items-center gap-3">
            <select className="px-4 py-3 bg-gray-50 border-0 rounded-2xl text-sm font-medium text-gray-700 focus:ring-2 focus:ring-blue-500 focus:bg-white">
              <option>所有状态</option>
              <option>待开始</option>
              <option>进行中</option>
              <option>已完成</option>
              <option>已暂停</option>
            </select>
            <select className="px-4 py-3 bg-gray-50 border-0 rounded-2xl text-sm font-medium text-gray-700 focus:ring-2 focus:ring-blue-500 focus:bg-white">
              <option>所有类型</option>
              <option>机器翻译</option>
              <option>人工翻译</option>
              <option>混合翻译</option>
            </select>
            <select className="px-4 py-3 bg-gray-50 border-0 rounded-2xl text-sm font-medium text-gray-700 focus:ring-2 focus:ring-blue-500 focus:bg-white">
              <option>最近创建</option>
              <option>最近更新</option>
              <option>即将到期</option>
            </select>
          </div>
        </div>
      </div>

      {/* 项目卡片 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {[
          {
            id: "PRJ-001",
            name: "电商网站本地化",
            description: "完整的电商平台多语言本地化项目，包含产品描述、用户界面和营销内容",
            source: "英语",
            target: "中文",
            type: "混合翻译",
            status: "进行中",
            progress: 75,
            fileType: "JSON",
            deadline: "2025-06-15",
            priority: "high",
            translator: "李译者",
            estimatedHours: 24,
          },
          {
            id: "PRJ-002",
            name: "移动应用界面翻译",
            description: "iOS和Android应用的用户界面文本翻译，包含按钮、提示和帮助文档",
            source: "英语",
            target: "日语",
            type: "人工翻译",
            status: "待开始",
            progress: 0,
            fileType: "XML",
            deadline: "2025-06-20",
            priority: "medium",
            translator: "待分配",
            estimatedHours: 16,
          },
          {
            id: "PRJ-003",
            name: "技术文档翻译",
            description: "API文档和用户手册的专业技术翻译，要求术语准确性高",
            source: "中文",
            target: "英语",
            type: "机器翻译",
            status: "已完成",
            progress: 100,
            fileType: "TXT",
            deadline: "2025-05-30",
            priority: "low",
            translator: "AI引擎",
            estimatedHours: 8,
          },
          {
            id: "PRJ-004",
            name: "营销材料本地化",
            description: "广告文案、宣传册和社交媒体内容的创意本地化翻译",
            source: "英语",
            target: "韩语",
            type: "人工翻译",
            status: "进行中",
            progress: 45,
            fileType: "Excel",
            deadline: "2025-06-25",
            priority: "high",
            translator: "王译者",
            estimatedHours: 32,
          },
        ].map((project, index) => (
          <div
            key={index}
            className="bg-white rounded-3xl p-6 border border-gray-100 hover:shadow-xl hover:shadow-gray-100/50 transition-all duration-300 group cursor-pointer"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div
                  className={`p-3 rounded-2xl ${
                    project.fileType === "JSON"
                      ? "bg-blue-100"
                      : project.fileType === "XML"
                        ? "bg-green-100"
                        : project.fileType === "Excel"
                          ? "bg-purple-100"
                          : "bg-gray-100"
                  }`}
                >
                  {project.fileType === "JSON" && <FileJson className="w-5 h-5 text-blue-600" />}
                  {project.fileType === "XML" && <FileText className="w-5 h-5 text-green-600" />}
                  {project.fileType === "Excel" && <FileSpreadsheet className="w-5 h-5 text-purple-600" />}
                  {project.fileType === "TXT" && <FileX className="w-5 h-5 text-gray-600" />}
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium mb-1">{project.id}</p>
                  <h3 className="font-bold text-gray-900 text-lg leading-tight">{project.name}</h3>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {project.priority === "high" && <div className="w-2 h-2 bg-red-500 rounded-full"></div>}
                <button className="opacity-0 group-hover:opacity-100 p-2 hover:bg-gray-100 rounded-xl transition-all duration-200">
                  <ChevronRight className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>

            <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-2">{project.description}</p>

            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500 font-medium">翻译方向</span>
                <span className="font-semibold text-gray-900">
                  {project.source} → {project.target}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500 font-medium">翻译类型</span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    project.type === "混合翻译"
                      ? "bg-blue-100 text-blue-700"
                      : project.type === "人工翻译"
                        ? "bg-green-100 text-green-700"
                        : "bg-purple-100 text-purple-700"
                  }`}
                >
                  {project.type}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500 font-medium">负责译者</span>
                <span className="font-semibold text-gray-900">{project.translator}</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500 font-medium">完成进度</span>
                <span className="font-bold text-gray-900">{project.progress}%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-500 ${
                    project.progress === 100 ? "bg-green-500" : "bg-blue-500"
                  }`}
                  style={{ width: `${project.progress}%` }}
                ></div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Calendar className="w-3 h-3" />
                  <span>{project.deadline}</span>
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    project.status === "已完成"
                      ? "bg-green-100 text-green-700"
                      : project.status === "进行中"
                        ? "bg-blue-100 text-blue-700"
                        : project.status === "待开始"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {project.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCreateProject = () => (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => setCurrentPage("projects")}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors duration-200"
          >
            <ChevronRight className="w-5 h-5 text-gray-600 rotate-180" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">创建翻译项目</h1>
            <p className="text-gray-600 font-medium mt-1">配置您的翻译需求和参数</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 主要配置区域 */}
        <div className="lg:col-span-2 space-y-8">
          {/* 基本信息 */}
          <div className="bg-white rounded-3xl p-8 border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-6">基本信息</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">项目名称</label>
                <input
                  type="text"
                  className="w-full px-4 py-4 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200 text-sm font-medium"
                  placeholder="为您的翻译项目起一个清晰的名称"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">项目描述</label>
                <textarea
                  rows="4"
                  className="w-full px-4 py-4 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200 text-sm font-medium resize-none"
                  placeholder="详细描述翻译需求、目标用户、使用场景等信息..."
                ></textarea>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">源语言</label>
                  <select className="w-full px-4 py-4 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white text-sm font-medium">
                    <option>英语 (English)</option>
                    <option>中文 (Chinese)</option>
                    <option>日语 (Japanese)</option>
                    <option>韩语 (Korean)</option>
                    <option>法语 (French)</option>
                    <option>德语 (German)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">目标语言</label>
                  <select className="w-full px-4 py-4 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white text-sm font-medium">
                    <option>中文 (Chinese)</option>
                    <option>英语 (English)</option>
                    <option>日语 (Japanese)</option>
                    <option>韩语 (Korean)</option>
                    <option>法语 (French)</option>
                    <option>德语 (German)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      {renderSidebar()}
      {renderHeader()}
      {renderDashboard()}
      {renderProjects()}
      {renderCreateProject()}
    </div>
  );
};

export default Dashboard;
