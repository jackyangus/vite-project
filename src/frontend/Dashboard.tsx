import React, { useState, useRef, useEffect } from "react";
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

// Define TranslatorWorkbench as a separate component
const TranslatorWorkbench = () => {
  // Mock data for segments
  const segments = [
    {
      id: "seg1",
      source: "Hello, world!",
      target: "",
      status: "untranslated",
      screenshotUrl: "https://via.placeholder.com/400x300.png?text=Screenshot+Seg1",
    },
    {
      id: "seg2",
      source: "This is an example sentence.",
      target: "",
      status: "untranslated",
      screenshotUrl: "https://via.placeholder.com/400x300.png?text=Screenshot+Seg2",
    },
    {
      id: "seg3",
      source: "Translate this text carefully.",
      target: "请仔细翻译此文本。",
      status: "translated",
      screenshotUrl: "https://via.placeholder.com/400x300.png?text=Screenshot+Seg3",
    },
    {
      id: "seg4",
      source: "Another segment to work on.",
      target: "",
      status: "untranslated",
      screenshotUrl: "https://via.placeholder.com/400x300.png?text=Screenshot+Seg4",
    },
    {
      id: "seg5",
      source: "The quick brown fox jumps over the lazy dog.",
      target: "",
      status: "draft",
      screenshotUrl: "https://via.placeholder.com/400x300.png?text=Screenshot+Seg5",
    },
  ];

  const [selectedSegment, setSelectedSegment] = useState(segments[0]);
  const [mtSuggestion, setMtSuggestion] = useState("Bonjour le monde!");
  const [tmResults, setTmResults] = useState([
    { score: 95, source: "Hello, world!", target: "Hallo Welt!" },
    { score: 80, source: "Hello, new world!", target: "Hallo neue Welt!" },
  ]);

  const auxWindowRef = useRef(null);

  useEffect(() => {
    // When selectedSegment changes, send a message to the aux window if it's open
    if (auxWindowRef.current && !auxWindowRef.current.closed) {
      auxWindowRef.current.postMessage({ type: "SEGMENT_UPDATE", data: selectedSegment }, "*");
    }

    // Listener for messages from the aux window
    const handleAuxMessages = (event) => {
      // IMPORTANT: Validate event.origin in production!
      if (event.source === auxWindowRef.current && event.data && event.data.type === "AUX_WINDOW_READY") {
        // Aux window is ready, send current segment data
        if (auxWindowRef.current && !auxWindowRef.current.closed) {
          auxWindowRef.current.postMessage({ type: "SEGMENT_UPDATE", data: selectedSegment }, "*");
        }
      }
    };

    window.addEventListener("message", handleAuxMessages);

    return () => {
      window.removeEventListener("message", handleAuxMessages);
    };
  }, [selectedSegment]); // selectedSegment is a dependency to re-send data if it changes

  const openAuxWindow = () => {
    if (auxWindowRef.current && !auxWindowRef.current.closed) {
      auxWindowRef.current.focus();
      return;
    }
    const newAuxWindow = window.open(
      `/aux-viewer`,
      "auxiliaryViewer",
      "width=600,height=400,resizable=yes,scrollbars=yes,status=no,toolbar=no,menubar=no,location=no",
    );
    if (newAuxWindow) {
      auxWindowRef.current = newAuxWindow;
      // Send initial data after a short delay to ensure the new window's listener is ready
      setTimeout(() => {
        if (auxWindowRef.current && !auxWindowRef.current.closed) {
          auxWindowRef.current.postMessage({ type: "SEGMENT_UPDATE", data: selectedSegment }, "*");
        }
      }, 500);
      newAuxWindow.focus();
    } else {
      alert("请允许弹出窗口。");
    }
  };

  return (
    <div className="p-8 h-full flex flex-col">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">翻译工作台: Project Alpha</h1>
        <p className="text-gray-600 font-medium">任务: Document_Main_EN_to_FR.docx</p>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-0">
        {/* Left Column: Segments List */}
        <div className="lg:col-span-3 bg-white rounded-3xl border border-gray-100 p-6 flex flex-col">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">待翻译句段</h2>
          <div className="flex items-center gap-2 mb-4">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="搜索句段..."
                className="pl-9 pr-3 py-2 w-full bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white text-sm"
              />
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-xl">
              <Filter className="w-4 h-4 text-gray-600" />
            </button>
          </div>
          <div className="flex-1 space-y-2 overflow-y-auto pr-1">
            {segments.map((segment) => (
              <div
                key={segment.id}
                onClick={() => setSelectedSegment(segment)} // This will trigger the useEffect to send message
                className={`p-3 rounded-xl cursor-pointer transition-all duration-150 ${selectedSegment.id === segment.id ? "bg-blue-500 text-white shadow-lg" : "hover:bg-gray-100"}`}
              >
                <p
                  className={`text-sm truncate ${selectedSegment.id === segment.id ? "font-semibold" : "text-gray-700"}`}
                >
                  {segment.source}
                </p>
                <p className={`text-xs mt-1 ${selectedSegment.id === segment.id ? "text-blue-100" : "text-gray-500"}`}>
                  {segment.status === "translated" ? "已翻译" : segment.status === "draft" ? "草稿" : "未翻译"}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Middle Column: Editor */}
        <div className="lg:col-span-6 bg-white rounded-3xl border border-gray-100 p-6 flex flex-col">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-800">源文本 (ID: {selectedSegment.id})</h2>
            <div className="mt-2 p-4 bg-gray-50 rounded-xl min-h-[100px] text-gray-800 text-sm">
              {selectedSegment.source}
            </div>
          </div>

          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-semibold text-gray-800">译文</h2>
              {mtSuggestion && (
                <button className="text-xs bg-purple-100 text-purple-700 hover:bg-purple-200 px-2 py-1 rounded-md font-medium transition-colors">
                  使用机器翻译: "{mtSuggestion.substring(0, 20)}..."
                </button>
              )}
            </div>
            <textarea
              rows={6}
              className="w-full p-4 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white text-sm text-gray-800 resize-none"
              placeholder="在此输入译文..."
              defaultValue={selectedSegment.target}
            />
          </div>

          <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
            <div className="flex items-center gap-2">
              <button className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-xl border border-gray-200 transition-colors">
                复制原文
              </button>
              <button className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-xl border border-gray-200 transition-colors">
                清除译文
              </button>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-500">状态: {selectedSegment.status}</span>
              <button className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-xl font-semibold text-sm transition-colors shadow-sm">
                <CheckCircle className="w-4 h-4 inline mr-1.5" />
                确认并下一个
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Context & TM */}
        <div className="lg:col-span-3 bg-white rounded-3xl border border-gray-100 p-6 flex flex-col space-y-6">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold text-gray-800">辅助信息</h2>
              <button
                onClick={openAuxWindow}
                title="在新窗口中打开辅助信息"
                className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <ExternalLink className="w-4 h-4 text-gray-500" />
              </button>
            </div>
            <div className="bg-gray-100 rounded-xl aspect-video flex items-center justify-center overflow-hidden">
              {/* Main window still shows the screenshot, aux window will too */}
              <img
                src={selectedSegment.screenshotUrl}
                alt="Product Screenshot"
                className="max-w-full max-h-full object-contain"
              />
            </div>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-3">翻译记忆库 (TM)</h2>
            {tmResults.length > 0 ? (
              <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                {tmResults.map((tm, index) => (
                  <div
                    key={index}
                    className="p-3 bg-gray-50 rounded-xl border border-gray-200 hover:border-blue-300 transition-colors cursor-pointer"
                  >
                    <div className="flex justify-between items-center mb-1">
                      <p className="text-xs font-semibold text-blue-600">匹配度: {tm.score}%</p>
                      <button className="text-xs text-blue-500 hover:text-blue-700 font-medium">使用</button>
                    </div>
                    <p className="text-xs text-gray-700 mb-1">
                      <strong>源:</strong> {tm.source}
                    </p>
                    <p className="text-xs text-gray-500">
                      <strong>译:</strong> {tm.target}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 italic">未找到相关翻译记忆。</p>
            )}
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-3">术语库</h2>
            <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 text-center">
              <p className="text-sm text-gray-400 italic">术语库功能待添加</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const navigationItems = [
    { id: "dashboard", label: "概览", icon: BarChart3 },
    { id: "projects", label: "项目", icon: FileText },
    { id: "translators", label: "译者", icon: Users },
    { id: "workbench", label: "工作台", icon: Edit },
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
                  rows={4}
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

          {/* 文件上传 */}
          <div className="bg-white rounded-3xl p-8 border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-6">上传翻译文件</h2>
            <div className="space-y-6">
              <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-blue-500 transition-colors duration-200 cursor-pointer">
                <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-700 font-semibold mb-2">拖拽文件到此处，或点击上传</p>
                <p className="text-xs text-gray-500">支持的文件格式: JSON, XML, TXT, Excel (XLSX, CSV)</p>
                <input type="file" className="hidden" multiple />
              </div>
              {/* 文件列表预览 (示例) */}
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                  <div className="flex items-center gap-3">
                    <FileJson className="w-6 h-6 text-blue-500" />
                    <div>
                      <p className="text-sm font-semibold text-gray-800">product_data.json</p>
                      <p className="text-xs text-gray-500">2.5 MB</p>
                    </div>
                  </div>
                  <button className="p-2 hover:bg-gray-100 rounded-xl">
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 翻译设置 */}
          <div className="bg-white rounded-3xl p-8 border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-6">翻译设置</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">翻译类型</label>
                <select className="w-full px-4 py-4 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white text-sm font-medium">
                  <option>机器翻译 (AI)</option>
                  <option>人工翻译 (专业译者)</option>
                  <option>混合翻译 (AI + 人工校对)</option>
                </select>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">截止日期 (可选)</label>
                  <input
                    type="date"
                    className="w-full px-4 py-4 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200 text-sm font-medium"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">优先级</label>
                  <select className="w-full px-4 py-4 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white text-sm font-medium">
                    <option>普通</option>
                    <option>高</option>
                    <option>紧急</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">备注 (可选)</label>
                <textarea
                  rows={3}
                  className="w-full px-4 py-4 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200 text-sm font-medium resize-none"
                  placeholder="例如：术语表、风格指南、特殊要求等..."
                ></textarea>
              </div>
            </div>
          </div>
        </div>

        {/* 侧边栏 - 项目摘要和操作 */}
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-white rounded-3xl p-8 border border-gray-100 sticky top-24">
            <h2 className="text-xl font-bold text-gray-900 mb-6">项目摘要</h2>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">项目名称:</span>
                <span className="font-semibold text-gray-800">待填写</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">源语言:</span>
                <span className="font-semibold text-gray-800">待选择</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">目标语言:</span>
                <span className="font-semibold text-gray-800">待选择</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">文件数量:</span>
                <span className="font-semibold text-gray-800">0</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">翻译类型:</span>
                <span className="font-semibold text-gray-800">待选择</span>
              </div>
            </div>
            <div className="border-t border-gray-100 pt-6 space-y-3">
              <div className="flex justify-between font-bold text-lg">
                <span className="text-gray-700">预计费用:</span>
                <span className="text-blue-600">¥0.00</span>
              </div>
              <p className="text-xs text-gray-500">费用将根据文件字数、语言对和翻译类型计算。</p>
            </div>
            <div className="mt-8 space-y-3">
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-2xl font-semibold text-sm transition-all duration-200 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 flex items-center justify-center gap-2">
                <CheckCircle className="w-4 h-4" />
                提交项目
              </button>
              <button className="w-full text-gray-600 hover:text-gray-800 font-medium text-sm transition-colors duration-200 py-3">
                保存为草稿
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Placeholder for Translators page
  const renderTranslators = () => (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">译者管理</h1>
      <p className="text-gray-600 font-medium">管理平台上的译者资源 (占位内容)</p>
      <div className="mt-8 bg-white rounded-3xl p-8 border border-gray-100 text-center">
        <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500">译者管理功能正在开发中。</p>
      </div>
    </div>
  );

  // Placeholder for Pricing page
  const renderPricing = () => (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">计费系统</h1>
      <p className="text-gray-600 font-medium">查看和管理您的计费信息 (占位内容)</p>
      <div className="mt-8 bg-white rounded-3xl p-8 border border-gray-100 text-center">
        <DollarSign className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500">计费系统功能正在开发中。</p>
      </div>
    </div>
  );

  // Placeholder for API page
  const renderApi = () => (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">API 接口</h1>
      <p className="text-gray-600 font-medium">集成翻译服务到您的应用程序 (占位内容)</p>
      <div className="mt-8 bg-white rounded-3xl p-8 border border-gray-100 text-center">
        <Globe className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500">API 接口管理功能正在开发中。</p>
      </div>
    </div>
  );

  // Placeholder for Settings page
  const renderSettings = () => (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">系统设置</h1>
      <p className="text-gray-600 font-medium">配置您的账户和平台参数 (占位内容)</p>
      <div className="mt-8 bg-white rounded-3xl p-8 border border-gray-100 text-center">
        <Settings className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500">系统设置功能正在开发中。</p>
      </div>
    </div>
  );

  // Placeholder for Translator Workbench - now just returns the component
  const renderTranslatorWorkbench = () => <TranslatorWorkbench />;

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return renderDashboard();
      case "projects":
        return renderProjects();
      case "create-project":
        return renderCreateProject();
      case "translators":
        return renderTranslators();
      case "workbench":
        return renderTranslatorWorkbench();
      case "pricing":
        return renderPricing();
      case "api":
        return renderApi();
      case "settings":
        return renderSettings();
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      {renderSidebar()}
      <div className="flex-1 flex flex-col">
        {renderHeader()}
        <main className="flex-1 overflow-y-auto">{renderPage()}</main>
      </div>
    </div>
  );
};

export default Dashboard;
