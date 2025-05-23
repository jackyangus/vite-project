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
import {
  Button,
  Card,
  StatCard,
  SearchInput,
  Avatar,
  Badge,
  Progress,
  Select,
  Textarea,
  Sidebar,
  Header,
  TextInput,
} from "./components/ui";

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
    <Sidebar
      navigationItems={navigationItems}
      currentPage={currentPage}
      onNavigate={setCurrentPage}
      isOpen={sidebarOpen}
      onToggle={() => setSidebarOpen(!sidebarOpen)}
      logo={{
        icon: Languages,
        title: "TransHub",
        subtitle: "专业翻译平台",
      }}
    />
  );

  const renderHeader = () => (
    <Header
      onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
      searchPlaceholder="搜索项目、译者或文档..."
      showNotifications={true}
      notificationCount={1}
      user={{
        name: "管理员",
        role: "在线",
        status: "online",
      }}
    />
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
        <StatCard title="活跃项目" value="128" change="+12%" icon={FileText} color="blue" />
        <StatCard title="在线译者" value="45" change="+8%" icon={UserCheck} color="green" />
        <StatCard title="本月收入" value="¥52,340" change="+23%" icon={DollarSign} color="purple" />
        <StatCard title="API调用" value="1,234" change="+15%" icon={Zap} color="orange" />
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
          <Button variant="secondary" icon={Filter}>
            筛选
          </Button>
          <Button variant="primary" icon={Plus} onClick={() => setCurrentPage("create-project")}>
            新建项目
          </Button>
        </div>
      </div>

      {/* 搜索和筛选 */}
      <div className="bg-white rounded-3xl p-6 border border-gray-100">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          <SearchInput placeholder="搜索项目名称、描述或ID..." size="lg" className="flex-1" />
          <div className="flex items-center gap-3">
            <Select
              options={[
                { value: "", label: "所有状态" },
                { value: "pending", label: "待开始" },
                { value: "in-progress", label: "进行中" },
                { value: "completed", label: "已完成" },
                { value: "paused", label: "已暂停" },
              ]}
              placeholder="所有状态"
            />
            <Select
              options={[
                { value: "", label: "所有类型" },
                { value: "machine", label: "机器翻译" },
                { value: "human", label: "人工翻译" },
                { value: "hybrid", label: "混合翻译" },
              ]}
              placeholder="所有类型"
            />
            <Select
              options={[
                { value: "recent", label: "最近创建" },
                { value: "updated", label: "最近更新" },
                { value: "deadline", label: "即将到期" },
              ]}
              placeholder="最近创建"
            />
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
                <Badge
                  variant={project.type === "混合翻译" ? "primary" : project.type === "人工翻译" ? "success" : "info"}
                  size="sm"
                >
                  {project.type}
                </Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500 font-medium">负责译者</span>
                <span className="font-semibold text-gray-900">{project.translator}</span>
              </div>
            </div>

            <div className="space-y-3">
              <Progress
                value={project.progress}
                showLabel={true}
                label="完成进度"
                variant={project.progress === 100 ? "success" : "default"}
              />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Calendar className="w-3 h-3" />
                  <span>{project.deadline}</span>
                </div>
                <Badge
                  variant={
                    project.status === "已完成"
                      ? "success"
                      : project.status === "进行中"
                        ? "primary"
                        : project.status === "待开始"
                          ? "warning"
                          : "default"
                  }
                  size="sm"
                >
                  {project.status}
                </Badge>
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
                <TextInput label="项目名称" placeholder="为您的翻译项目起一个清晰的名称" />
              </div>
              <Textarea label="项目描述" placeholder="详细描述翻译需求、目标用户、使用场景等信息..." rows={4} />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Select
                  label="源语言"
                  options={[
                    { value: "en", label: "英语 (English)" },
                    { value: "zh", label: "中文 (Chinese)" },
                    { value: "ja", label: "日语 (Japanese)" },
                    { value: "ko", label: "韩语 (Korean)" },
                    { value: "fr", label: "法语 (French)" },
                    { value: "de", label: "德语 (German)" },
                  ]}
                  placeholder="选择源语言"
                />
                <Select
                  label="目标语言"
                  options={[
                    { value: "zh", label: "中文 (Chinese)" },
                    { value: "en", label: "英语 (English)" },
                    { value: "ja", label: "日语 (Japanese)" },
                    { value: "ko", label: "韩语 (Korean)" },
                    { value: "fr", label: "法语 (French)" },
                    { value: "de", label: "德语 (German)" },
                  ]}
                  placeholder="选择目标语言"
                />
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

  // Enhanced Translators page with full functionality
  const renderTranslators = () => (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">译者管理</h1>
          <p className="text-gray-600 font-medium">管理平台上的译者资源和团队协作</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium text-sm transition-colors duration-200 flex items-center gap-2">
            <Filter className="w-4 h-4" />
            筛选
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-semibold text-sm transition-all duration-200 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 flex items-center gap-2">
            <Plus className="w-4 h-4" />
            邀请译者
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          {
            title: "活跃译者",
            value: "24",
            change: "+3",
            icon: UserCheck,
            color: "green",
            bgGradient: "from-green-50 to-green-100",
            iconBg: "bg-green-500",
          },
          {
            title: "本月字数",
            value: "125.8K",
            change: "+18%",
            icon: FileText,
            color: "blue",
            bgGradient: "from-blue-50 to-blue-100",
            iconBg: "bg-blue-500",
          },
          {
            title: "平均评分",
            value: "4.8",
            change: "+0.2",
            icon: Star,
            color: "yellow",
            bgGradient: "from-yellow-50 to-yellow-100",
            iconBg: "bg-yellow-500",
          },
          {
            title: "完成项目",
            value: "89",
            change: "+12",
            icon: CheckCircle,
            color: "purple",
            bgGradient: "from-purple-50 to-purple-100",
            iconBg: "bg-purple-500",
          },
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-3xl p-6 border border-gray-100 hover:shadow-xl hover:shadow-gray-100/50 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-2xl ${stat.iconBg} shadow-lg`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex items-center gap-1 text-green-600 text-sm font-semibold">
                  <TrendingUp className="w-3 h-3" />
                  {stat.change}
                </div>
              </div>
              <div>
                <p className="text-gray-600 text-sm font-medium mb-1">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-3xl p-6 border border-gray-100">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="搜索译者姓名、语言专长或技能..."
              className="pl-12 pr-6 py-3 w-full bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200 text-sm font-medium"
            />
          </div>
          <div className="flex items-center gap-3">
            <select className="px-4 py-3 bg-gray-50 border-0 rounded-2xl text-sm font-medium text-gray-700 focus:ring-2 focus:ring-blue-500 focus:bg-white">
              <option>所有状态</option>
              <option>在线</option>
              <option>离线</option>
              <option>忙碌</option>
            </select>
            <select className="px-4 py-3 bg-gray-50 border-0 rounded-2xl text-sm font-medium text-gray-700 focus:ring-2 focus:ring-blue-500 focus:bg-white">
              <option>所有语言</option>
              <option>英语-中文</option>
              <option>日语-中文</option>
              <option>韩语-中文</option>
            </select>
            <select className="px-4 py-3 bg-gray-50 border-0 rounded-2xl text-sm font-medium text-gray-700 focus:ring-2 focus:ring-blue-500 focus:bg-white">
              <option>评分排序</option>
              <option>活跃度排序</option>
              <option>完成率排序</option>
            </select>
          </div>
        </div>
      </div>

      {/* Translators Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {[
          {
            id: "T001",
            name: "李雅静",
            avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b913?w=150&h=150&fit=crop&crop=face",
            email: "li.yajing@example.com",
            languages: ["英语", "中文", "日语"],
            specializations: ["技术文档", "商务翻译"],
            status: "在线",
            rating: 4.9,
            completedProjects: 47,
            currentProjects: 3,
            totalWords: "125.8K",
            joinDate: "2023年3月",
            lastActive: "2分钟前",
            workload: 75,
          },
          {
            id: "T002",
            name: "王德明",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
            email: "wang.deming@example.com",
            languages: ["英语", "中文", "韩语"],
            specializations: ["市场营销", "网站本地化"],
            status: "忙碌",
            rating: 4.7,
            completedProjects: 32,
            currentProjects: 5,
            totalWords: "89.2K",
            joinDate: "2023年6月",
            lastActive: "30分钟前",
            workload: 90,
          },
          {
            id: "T003",
            name: "张小丽",
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
            email: "zhang.xiaoli@example.com",
            languages: ["法语", "中文", "英语"],
            specializations: ["法律文档", "学术翻译"],
            status: "离线",
            rating: 4.8,
            completedProjects: 28,
            currentProjects: 1,
            totalWords: "76.4K",
            joinDate: "2023年1月",
            lastActive: "2小时前",
            workload: 30,
          },
          {
            id: "T004",
            name: "陈志华",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
            email: "chen.zhihua@example.com",
            languages: ["德语", "中文", "英语"],
            specializations: ["工程技术", "汽车行业"],
            status: "在线",
            rating: 4.6,
            completedProjects: 41,
            currentProjects: 2,
            totalWords: "98.6K",
            joinDate: "2022年11月",
            lastActive: "刚刚",
            workload: 60,
          },
        ].map((translator, index) => (
          <div
            key={index}
            className="bg-white rounded-3xl p-6 border border-gray-100 hover:shadow-xl hover:shadow-gray-100/50 transition-all duration-300 group"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img src={translator.avatar} alt={translator.name} className="w-16 h-16 rounded-2xl object-cover" />
                  <div
                    className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white ${
                      translator.status === "在线"
                        ? "bg-green-500"
                        : translator.status === "忙碌"
                          ? "bg-yellow-500"
                          : "bg-gray-400"
                    }`}
                  ></div>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">{translator.name}</h3>
                  <p className="text-gray-500 text-sm">{translator.email}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm font-semibold text-gray-700">{translator.rating}</span>
                    </div>
                    <span className="text-gray-300">·</span>
                    <span className="text-sm text-gray-500">{translator.completedProjects} 项目</span>
                  </div>
                </div>
              </div>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-2 hover:bg-gray-100 rounded-xl">
                  <Settings className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Language Skills */}
            <div className="mb-4">
              <p className="text-sm font-semibold text-gray-700 mb-2">语言能力</p>
              <div className="flex flex-wrap gap-2">
                {translator.languages.map((lang, i) => (
                  <span key={i} className="px-2 py-1 bg-blue-100 text-blue-700 rounded-lg text-xs font-medium">
                    {lang}
                  </span>
                ))}
              </div>
            </div>

            {/* Specializations */}
            <div className="mb-4">
              <p className="text-sm font-semibold text-gray-700 mb-2">专业领域</p>
              <div className="flex flex-wrap gap-2">
                {translator.specializations.map((spec, i) => (
                  <span key={i} className="px-2 py-1 bg-purple-100 text-purple-700 rounded-lg text-xs font-medium">
                    {spec}
                  </span>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center p-3 bg-gray-50 rounded-xl">
                <p className="text-sm text-gray-500 mb-1">当前项目</p>
                <p className="text-xl font-bold text-gray-900">{translator.currentProjects}</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-xl">
                <p className="text-sm text-gray-500 mb-1">总字数</p>
                <p className="text-xl font-bold text-gray-900">{translator.totalWords}</p>
              </div>
            </div>

            {/* Workload */}
            <div className="mb-4">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-gray-600 font-medium">工作负载</span>
                <span className="font-bold text-gray-900">{translator.workload}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-500 ${
                    translator.workload > 80
                      ? "bg-red-500"
                      : translator.workload > 60
                        ? "bg-yellow-500"
                        : "bg-green-500"
                  }`}
                  style={{ width: `${translator.workload}%` }}
                ></div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl font-semibold text-sm transition-colors">
                分配项目
              </button>
              <button className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium text-sm transition-colors border border-gray-200 rounded-xl hover:bg-gray-50">
                查看详情
              </button>
            </div>

            {/* Footer Info */}
            <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
              <span>加入: {translator.joinDate}</span>
              <span>最后活跃: {translator.lastActive}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Team Performance Section */}
      <div className="bg-white rounded-3xl p-8 border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">团队绩效</h3>
          <button className="text-blue-600 text-sm font-medium hover:text-blue-700">查看详细报告</button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Performance Chart */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4">月度完成趋势</h4>
            <div className="h-48 bg-gradient-to-t from-blue-50 to-transparent rounded-2xl flex items-end justify-center">
              <div className="text-center text-gray-500">
                <BarChart3 className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p className="text-sm">绩效图表展示区域</p>
              </div>
            </div>
          </div>

          {/* Top Performers */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4">本月优秀译者</h4>
            <div className="space-y-3">
              {[
                { name: "李雅静", metric: "47 项目", score: "4.9★" },
                { name: "陈志华", metric: "41 项目", score: "4.6★" },
                { name: "王德明", metric: "32 项目", score: "4.7★" },
              ].map((performer, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white ${
                        index === 0 ? "bg-yellow-500" : index === 1 ? "bg-gray-400" : "bg-orange-500"
                      }`}
                    >
                      {index + 1}
                    </div>
                    <span className="font-semibold text-gray-900">{performer.name}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-700">{performer.metric}</p>
                    <p className="text-xs text-gray-500">{performer.score}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Enhanced Pricing page with comprehensive billing management
  const renderPricing = () => (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">计费与订阅</h1>
          <p className="text-gray-600 font-medium">管理您的计费信息和使用情况</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium text-sm transition-colors duration-200">
            下载发票
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-semibold text-sm transition-all duration-200 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30">
            升级套餐
          </button>
        </div>
      </div>

      {/* Current Plan Overview */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-3xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold mb-2">专业版套餐</h3>
            <p className="text-blue-100 mb-4">您当前的订阅计划，包含高级功能和优先支持</p>
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span>无限项目数量</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span>高级协作工具</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span>API 访问</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-4xl font-bold mb-1">¥299</p>
            <p className="text-blue-100 text-sm">每月</p>
            <p className="text-xs text-blue-200 mt-2">下次续费: 2025-02-15</p>
          </div>
        </div>
      </div>

      {/* Usage Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Usage Overview */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-8 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">本月使用情况</h3>
            <select className="px-3 py-2 bg-gray-50 border-0 rounded-xl text-sm font-medium text-gray-700">
              <option>本月</option>
              <option>上月</option>
              <option>过去3个月</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[
              {
                title: "翻译字数",
                used: "245,680",
                limit: "无限制",
                percentage: 0,
                icon: FileText,
                color: "blue",
              },
              {
                title: "API 调用",
                used: "8,432",
                limit: "50,000",
                percentage: 17,
                icon: Zap,
                color: "purple",
              },
              {
                title: "存储空间",
                used: "12.5 GB",
                limit: "100 GB",
                percentage: 12.5,
                icon: Upload,
                color: "green",
              },
            ].map((metric, index) => {
              const Icon = metric.icon;
              return (
                <div key={index} className="p-6 bg-gray-50 rounded-2xl">
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className={`p-2 rounded-xl ${
                        metric.color === "blue"
                          ? "bg-blue-100"
                          : metric.color === "purple"
                            ? "bg-purple-100"
                            : "bg-green-100"
                      }`}
                    >
                      <Icon
                        className={`w-5 h-5 ${
                          metric.color === "blue"
                            ? "text-blue-600"
                            : metric.color === "purple"
                              ? "text-purple-600"
                              : "text-green-600"
                        }`}
                      />
                    </div>
                    <h4 className="font-semibold text-gray-900">{metric.title}</h4>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">已使用</span>
                      <span className="font-semibold text-gray-900">{metric.used}</span>
                    </div>
                    {metric.limit !== "无限制" && (
                      <>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">总限额</span>
                          <span className="font-semibold text-gray-900">{metric.limit}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              metric.color === "blue"
                                ? "bg-blue-500"
                                : metric.color === "purple"
                                  ? "bg-purple-500"
                                  : "bg-green-500"
                            }`}
                            style={{ width: `${metric.percentage}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-gray-500">{metric.percentage}% 已使用</p>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Usage Chart */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4">使用趋势 (过去30天)</h4>
            <div className="h-48 bg-gradient-to-t from-blue-50 to-transparent rounded-2xl flex items-end justify-center">
              <div className="text-center text-gray-500">
                <Activity className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p className="text-sm">使用量图表展示区域</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          {/* Payment Method */}
          <div className="bg-white rounded-3xl p-6 border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4">付款方式</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                    <span className="text-white text-xs font-bold">VISA</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">**** 4242</p>
                    <p className="text-xs text-gray-500">到期 12/26</p>
                  </div>
                </div>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">默认</span>
              </div>
              <button className="w-full text-blue-600 hover:text-blue-700 font-medium text-sm py-2">
                管理付款方式
              </button>
            </div>
          </div>

          {/* Billing Address */}
          <div className="bg-white rounded-3xl p-6 border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4">账单地址</h3>
            <div className="text-sm space-y-1 text-gray-600">
              <p className="font-semibold text-gray-900">TransHub 科技有限公司</p>
              <p>北京市朝阳区建国门外大街</p>
              <p>国贸大厦 28层 2808室</p>
              <p>北京, 100020</p>
              <p>中国</p>
            </div>
            <button className="w-full text-blue-600 hover:text-blue-700 font-medium text-sm py-2 mt-3">编辑地址</button>
          </div>

          {/* Billing Alerts */}
          <div className="bg-white rounded-3xl p-6 border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4">计费提醒</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">使用量警告 (80%)</span>
                <input type="checkbox" className="rounded text-blue-600" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">账单生成通知</span>
                <input type="checkbox" className="rounded text-blue-600" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">付款失败提醒</span>
                <input type="checkbox" className="rounded text-blue-600" defaultChecked />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Plan Comparison */}
      <div className="bg-white rounded-3xl p-8 border border-gray-100">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">选择适合您的套餐</h3>
          <p className="text-gray-600">灵活的定价方案，满足不同规模的翻译需求</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {[
            {
              name: "基础版",
              price: "免费",
              period: "",
              description: "适合个人用户和小型项目",
              current: false,
              popular: false,
              features: ["3个项目", "10,000 字符/月", "基础翻译功能", "邮件支持", "基础 API 访问"],
              limitations: ["无协作功能", "无高级分析"],
            },
            {
              name: "专业版",
              price: "¥299",
              period: "/月",
              description: "适合专业译者和中小团队",
              current: true,
              popular: true,
              features: [
                "无限项目",
                "无限字符数",
                "高级翻译工具",
                "团队协作",
                "优先支持",
                "完整 API 访问",
                "高级分析报告",
                "翻译记忆库",
              ],
              limitations: [],
            },
            {
              name: "企业版",
              price: "¥999",
              period: "/月",
              description: "适合大型团队和企业客户",
              current: false,
              popular: false,
              features: [
                "专业版所有功能",
                "SSO 单点登录",
                "高级用户管理",
                "自定义集成",
                "24/7 专属支持",
                "本地部署选项",
                "SLA 保证",
                "定制化工作流",
              ],
              limitations: [],
            },
          ].map((plan, index) => (
            <div
              key={index}
              className={`relative p-8 rounded-3xl border-2 transition-all duration-200 ${
                plan.current
                  ? "border-blue-500 bg-blue-50"
                  : plan.popular
                    ? "border-purple-500 bg-purple-50"
                    : "border-gray-200 hover:border-gray-300"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-purple-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    最受欢迎
                  </span>
                </div>
              )}
              {plan.current && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold">当前套餐</span>
                </div>
              )}

              <div className="text-center mb-6">
                <h4 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h4>
                <div className="mb-3">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-600">{plan.period}</span>
                </div>
                <p className="text-gray-600 text-sm">{plan.description}</p>
              </div>

              <div className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">{feature}</span>
                  </div>
                ))}
                {plan.limitations.map((limitation, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <X className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <span className="text-gray-500 text-sm">{limitation}</span>
                  </div>
                ))}
              </div>

              <button
                className={`w-full py-3 px-6 rounded-2xl font-semibold text-sm transition-colors ${
                  plan.current
                    ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                    : plan.popular
                      ? "bg-purple-600 hover:bg-purple-700 text-white"
                      : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
                disabled={plan.current}
              >
                {plan.current ? "当前套餐" : plan.price === "免费" ? "降级到此套餐" : "升级到此套餐"}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Billing History */}
      <div className="bg-white rounded-3xl p-8 border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">账单历史</h3>
          <button className="text-blue-600 text-sm font-medium hover:text-blue-700">查看全部</button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-gray-500 border-b border-gray-100">
                <th className="pb-4 font-medium">日期</th>
                <th className="pb-4 font-medium">描述</th>
                <th className="pb-4 font-medium">金额</th>
                <th className="pb-4 font-medium">状态</th>
                <th className="pb-4 font-medium">操作</th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  date: "2025-01-15",
                  description: "专业版套餐 - 1月",
                  amount: "¥299.00",
                  status: "已支付",
                  invoice: "INV-2025-001",
                },
                {
                  date: "2024-12-15",
                  description: "专业版套餐 - 12月",
                  amount: "¥299.00",
                  status: "已支付",
                  invoice: "INV-2024-012",
                },
                {
                  date: "2024-11-15",
                  description: "专业版套餐 - 11月",
                  amount: "¥299.00",
                  status: "已支付",
                  invoice: "INV-2024-011",
                },
                {
                  date: "2024-10-15",
                  description: "基础版升级至专业版",
                  amount: "¥199.00",
                  status: "已支付",
                  invoice: "INV-2024-010",
                },
              ].map((record, index) => (
                <tr key={index} className="border-b border-gray-50 last:border-0">
                  <td className="py-4 text-sm text-gray-900">{record.date}</td>
                  <td className="py-4 text-sm text-gray-700">{record.description}</td>
                  <td className="py-4 text-sm font-semibold text-gray-900">{record.amount}</td>
                  <td className="py-4">
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                      {record.status}
                    </span>
                  </td>
                  <td className="py-4">
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1">
                      <Download className="w-3 h-3" />
                      下载
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // Enhanced API page with comprehensive documentation and management
  const renderApi = () => (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">API 接口</h1>
          <p className="text-gray-600 font-medium">集成翻译服务到您的应用程序</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium text-sm transition-colors duration-200 flex items-center gap-2">
            <Download className="w-4 h-4" />
            下载 SDK
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-semibold text-sm transition-all duration-200 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 flex items-center gap-2">
            <Plus className="w-4 h-4" />
            创建 API 密钥
          </button>
        </div>
      </div>

      {/* API Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          {
            title: "今日调用",
            value: "1,234",
            change: "+12%",
            icon: Zap,
            color: "blue",
          },
          {
            title: "本月配额",
            value: "8.4K / 50K",
            change: "17%",
            icon: Activity,
            color: "green",
          },
          {
            title: "平均响应",
            value: "342ms",
            change: "-8%",
            icon: Clock,
            color: "purple",
          },
          {
            title: "成功率",
            value: "99.8%",
            change: "+0.1%",
            icon: CheckCircle,
            color: "orange",
          },
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-3xl p-6 border border-gray-100 hover:shadow-xl hover:shadow-gray-100/50 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`p-3 rounded-2xl ${
                    stat.color === "blue"
                      ? "bg-blue-100"
                      : stat.color === "green"
                        ? "bg-green-100"
                        : stat.color === "purple"
                          ? "bg-purple-100"
                          : "bg-orange-100"
                  } shadow-lg`}
                >
                  <Icon
                    className={`w-5 h-5 ${
                      stat.color === "blue"
                        ? "text-blue-600"
                        : stat.color === "green"
                          ? "text-green-600"
                          : stat.color === "purple"
                            ? "text-purple-600"
                            : "text-orange-600"
                    }`}
                  />
                </div>
                <div className="flex items-center gap-1 text-green-600 text-sm font-semibold">
                  <TrendingUp className="w-3 h-3" />
                  {stat.change}
                </div>
              </div>
              <div>
                <p className="text-gray-600 text-sm font-medium mb-1">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* API Keys Management */}
      <div className="bg-white rounded-3xl p-8 border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">API 密钥管理</h3>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl font-semibold text-sm transition-colors flex items-center gap-2">
            <Plus className="w-4 h-4" />
            新增密钥
          </button>
        </div>

        <div className="space-y-4">
          {[
            {
              name: "生产环境密钥",
              key: "sk_live_1234...5678",
              created: "2024-01-15",
              lastUsed: "2分钟前",
              permissions: ["read", "write"],
              status: "active",
            },
            {
              name: "开发环境密钥",
              key: "sk_test_abcd...efgh",
              created: "2024-01-10",
              lastUsed: "1小时前",
              permissions: ["read"],
              status: "active",
            },
            {
              name: "备用密钥",
              key: "sk_live_9876...5432",
              created: "2023-12-01",
              lastUsed: "30天前",
              permissions: ["read"],
              status: "inactive",
            },
          ].map((apiKey, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:border-gray-200 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-3 h-3 rounded-full ${apiKey.status === "active" ? "bg-green-500" : "bg-gray-400"}`}
                ></div>
                <div>
                  <h4 className="font-semibold text-gray-900">{apiKey.name}</h4>
                  <p className="text-sm text-gray-500 font-mono">{apiKey.key}</p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                    <span>创建: {apiKey.created}</span>
                    <span>最后使用: {apiKey.lastUsed}</span>
                    <div className="flex gap-1">
                      {apiKey.permissions.map((perm, i) => (
                        <span key={i} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                          {perm}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-gray-200 rounded-xl transition-colors">
                  <Eye className="w-4 h-4 text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-200 rounded-xl transition-colors">
                  <Edit className="w-4 h-4 text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-200 rounded-xl transition-colors">
                  <Trash2 className="w-4 h-4 text-red-500" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive API Documentation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* API Endpoints */}
        <div className="bg-white rounded-3xl p-8 border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-6">API 端点</h3>

          <div className="space-y-4">
            {[
              {
                method: "POST",
                endpoint: "/api/v1/translate",
                description: "翻译文本内容",
                status: "stable",
              },
              {
                method: "GET",
                endpoint: "/api/v1/projects",
                description: "获取项目列表",
                status: "stable",
              },
              {
                method: "POST",
                endpoint: "/api/v1/projects",
                description: "创建新项目",
                status: "stable",
              },
              {
                method: "GET",
                endpoint: "/api/v1/projects/{id}",
                description: "获取项目详情",
                status: "stable",
              },
              {
                method: "PUT",
                endpoint: "/api/v1/projects/{id}",
                description: "更新项目信息",
                status: "stable",
              },
              {
                method: "POST",
                endpoint: "/api/v1/webhooks",
                description: "配置回调通知",
                status: "beta",
              },
            ].map((api, index) => (
              <div
                key={index}
                className="p-4 border border-gray-200 rounded-2xl hover:border-blue-300 transition-colors cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span
                      className={`px-2 py-1 rounded text-xs font-bold ${
                        api.method === "GET"
                          ? "bg-green-100 text-green-700"
                          : api.method === "POST"
                            ? "bg-blue-100 text-blue-700"
                            : api.method === "PUT"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                      }`}
                    >
                      {api.method}
                    </span>
                    <code className="text-sm font-mono text-gray-700">{api.endpoint}</code>
                  </div>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      api.status === "stable" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"
                    }`}
                  >
                    {api.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{api.description}</p>
                <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="text-blue-600 text-xs font-medium hover:text-blue-700">查看详细文档 →</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Start Guide */}
        <div className="bg-white rounded-3xl p-8 border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-6">快速开始</h3>

          <div className="space-y-6">
            {/* Authentication */}
            <div>
              <h4 className="font-semibold text-gray-800 mb-3">1. 身份认证</h4>
              <div className="bg-gray-900 rounded-xl p-4 overflow-x-auto">
                <pre className="text-green-400 text-sm font-mono">
                  {`curl -X POST "https://api.transhub.com/v1/translate" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`}
                </pre>
              </div>
            </div>

            {/* Request Example */}
            <div>
              <h4 className="font-semibold text-gray-800 mb-3">2. 请求示例</h4>
              <div className="bg-gray-900 rounded-xl p-4 overflow-x-auto">
                <pre className="text-green-400 text-sm font-mono">
                  {`{
  "text": "Hello, world!",
  "source_lang": "en",
  "target_lang": "zh",
  "project_id": "proj_123"
}`}
                </pre>
              </div>
            </div>

            {/* Response Example */}
            <div>
              <h4 className="font-semibold text-gray-800 mb-3">3. 响应示例</h4>
              <div className="bg-gray-900 rounded-xl p-4 overflow-x-auto">
                <pre className="text-green-400 text-sm font-mono">
                  {`{
  "success": true,
  "data": {
    "translated_text": "你好，世界！",
    "confidence": 0.98,
    "translation_id": "trans_456"
  }
}`}
                </pre>
              </div>
            </div>

            {/* SDKs */}
            <div>
              <h4 className="font-semibold text-gray-800 mb-3">4. SDK 支持</h4>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { name: "JavaScript", icon: "JS" },
                  { name: "Python", icon: "PY" },
                  { name: "PHP", icon: "PHP" },
                  { name: "Java", icon: "JV" },
                ].map((sdk, index) => (
                  <button
                    key={index}
                    className="p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors text-center"
                  >
                    <div className="w-8 h-8 bg-blue-500 text-white rounded-lg flex items-center justify-center mx-auto mb-2 text-xs font-bold">
                      {sdk.icon}
                    </div>
                    <p className="text-sm font-medium text-gray-700">{sdk.name}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Webhooks Configuration */}
      <div className="bg-white rounded-3xl p-8 border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">Webhook 配置</h3>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl font-semibold text-sm transition-colors flex items-center gap-2">
            <Plus className="w-4 h-4" />
            添加 Webhook
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Webhook List */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-4">已配置的 Webhooks</h4>
            <div className="space-y-3">
              {[
                {
                  url: "https://api.yourapp.com/webhooks",
                  events: ["translation.completed", "project.updated"],
                  status: "active",
                  lastDelivery: "2分钟前",
                },
                {
                  url: "https://dev.yourapp.com/hooks",
                  events: ["translation.completed"],
                  status: "inactive",
                  lastDelivery: "1天前",
                },
              ].map((webhook, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-2xl">
                  <div className="flex items-center justify-between mb-2">
                    <code className="text-sm font-mono text-gray-700">{webhook.url}</code>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        webhook.status === "active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {webhook.status}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {webhook.events.map((event, i) => (
                      <span key={i} className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded">
                        {event}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500">最后推送: {webhook.lastDelivery}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Available Events */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-4">可用事件类型</h4>
            <div className="space-y-2">
              {[
                {
                  event: "translation.completed",
                  description: "翻译任务完成时触发",
                },
                {
                  event: "project.created",
                  description: "新项目创建时触发",
                },
                {
                  event: "project.updated",
                  description: "项目信息更新时触发",
                },
                {
                  event: "project.completed",
                  description: "项目完成时触发",
                },
                {
                  event: "error.occurred",
                  description: "发生错误时触发",
                },
              ].map((event, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-xl">
                  <div className="flex items-center justify-between">
                    <code className="text-sm font-mono text-gray-700">{event.event}</code>
                    <input type="checkbox" className="rounded text-blue-600" />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{event.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* API Usage Analytics */}
      <div className="bg-white rounded-3xl p-8 border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">使用分析</h3>
          <select className="px-3 py-2 bg-gray-50 border-0 rounded-xl text-sm font-medium text-gray-700">
            <option>过去7天</option>
            <option>过去30天</option>
            <option>过去90天</option>
          </select>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Request Volume Chart */}
          <div className="lg:col-span-2">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">请求量趋势</h4>
            <div className="h-48 bg-gradient-to-t from-blue-50 to-transparent rounded-2xl flex items-end justify-center">
              <div className="text-center text-gray-500">
                <BarChart3 className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p className="text-sm">API 使用量图表展示区域</p>
              </div>
            </div>
          </div>

          {/* Top Endpoints */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4">热门端点</h4>
            <div className="space-y-3">
              {[
                { endpoint: "/api/v1/translate", calls: "2,345", percentage: 78 },
                { endpoint: "/api/v1/projects", calls: "456", percentage: 15 },
                { endpoint: "/api/v1/webhooks", calls: "123", percentage: 4 },
                { endpoint: "其他", calls: "89", percentage: 3 },
              ].map((endpoint, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div>
                    <code className="text-sm font-mono text-gray-700">{endpoint.endpoint}</code>
                    <p className="text-xs text-gray-500">{endpoint.calls} 次调用</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-12 bg-gray-200 rounded-full h-2">
                      <div className="h-2 bg-blue-500 rounded-full" style={{ width: `${endpoint.percentage}%` }}></div>
                    </div>
                    <span className="text-xs text-gray-600 w-8">{endpoint.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Enhanced Settings page with comprehensive configuration
  const renderSettings = () => (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">系统设置</h1>
          <p className="text-gray-600 font-medium">配置您的账户和平台参数</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium text-sm transition-colors duration-200">
            导出设置
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-semibold text-sm transition-all duration-200 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30">
            保存更改
          </button>
        </div>
      </div>

      {/* Account Information Section */}
      <div className="bg-white rounded-3xl p-8 border border-gray-100">
        <h3 className="text-xl font-bold text-gray-900 mb-6">账户信息</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">用户名</label>
              <input
                type="text"
                defaultValue="admin"
                className="w-full px-4 py-3 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200 text-sm font-medium"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">邮箱地址</label>
              <input
                type="email"
                defaultValue="admin@transhub.com"
                className="w-full px-4 py-3 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200 text-sm font-medium"
              />
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">公司名称</label>
              <input
                type="text"
                defaultValue="TransHub 科技有限公司"
                className="w-full px-4 py-3 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200 text-sm font-medium"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">语言偏好</label>
              <select className="w-full px-4 py-3 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white text-sm font-medium">
                <option>中文简体</option>
                <option>English</option>
                <option>日本語</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Security Settings Section */}
      <div className="bg-white rounded-3xl p-8 border border-gray-100">
        <h3 className="text-xl font-bold text-gray-900 mb-6">安全设置</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h4 className="font-semibold text-gray-800 mb-4">密码设置</h4>
            <div className="space-y-4">
              <input
                type="password"
                placeholder="当前密码"
                className="w-full px-4 py-3 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200 text-sm font-medium"
              />
              <input
                type="password"
                placeholder="新密码"
                className="w-full px-4 py-3 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200 text-sm font-medium"
              />
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-semibold text-sm transition-colors">
                更新密码
              </button>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-4">双因素认证</h4>
            <div className="space-y-3">
              {[
                { label: "SMS 验证码", description: "通过短信接收验证码", enabled: true },
                { label: "邮箱验证码", description: "通过邮箱接收验证码", enabled: false },
                { label: "认证应用", description: "使用 Google Authenticator", enabled: false },
              ].map((auth, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                  <div>
                    <p className="font-semibold text-gray-900">{auth.label}</p>
                    <p className="text-sm text-gray-500">{auth.description}</p>
                  </div>
                  <input type="checkbox" className="rounded text-blue-600" defaultChecked={auth.enabled} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Notification Preferences */}
      <div className="bg-white rounded-3xl p-8 border border-gray-100">
        <h3 className="text-xl font-bold text-gray-900 mb-6">通知偏好</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h4 className="font-semibold text-gray-800 mb-4">项目通知</h4>
            <div className="space-y-3">
              {[
                { label: "项目创建", description: "新项目创建时通知", enabled: true },
                { label: "项目完成", description: "项目完成时通知", enabled: true },
                { label: "进度更新", description: "项目进度更新", enabled: false },
              ].map((notif, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div>
                    <p className="font-semibold text-gray-900">{notif.label}</p>
                    <p className="text-sm text-gray-500">{notif.description}</p>
                  </div>
                  <input type="checkbox" className="rounded text-blue-600" defaultChecked={notif.enabled} />
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-4">系统通知</h4>
            <div className="space-y-3">
              {[
                { label: "安全警告", description: "账户安全相关警告", enabled: true },
                { label: "系统维护", description: "系统维护通知", enabled: true },
                { label: "使用量提醒", description: "配额限制提醒", enabled: true },
              ].map((notif, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div>
                    <p className="font-semibold text-gray-900">{notif.label}</p>
                    <p className="text-sm text-gray-500">{notif.description}</p>
                  </div>
                  <input type="checkbox" className="rounded text-blue-600" defaultChecked={notif.enabled} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Integration Management */}
      <div className="bg-white rounded-3xl p-8 border border-gray-100">
        <h3 className="text-xl font-bold text-gray-900 mb-6">集成管理</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { name: "GitHub", description: "代码仓库集成", connected: true },
            { name: "Slack", description: "团队协作通知", connected: true },
            { name: "Figma", description: "设计文件同步", connected: false },
            { name: "Jira", description: "项目管理集成", connected: false },
          ].map((integration, index) => (
            <div key={index} className="p-6 border border-gray-200 rounded-2xl hover:border-blue-300 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-500 text-white rounded-xl flex items-center justify-center text-sm font-bold">
                  {integration.name.slice(0, 2)}
                </div>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    integration.connected ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {integration.connected ? "已连接" : "未连接"}
                </span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">{integration.name}</h4>
              <p className="text-sm text-gray-500 mb-4">{integration.description}</p>
              <button
                className={`w-full py-2 px-4 rounded-xl text-sm font-medium transition-colors ${
                  integration.connected
                    ? "bg-red-100 text-red-700 hover:bg-red-200"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                {integration.connected ? "断开连接" : "立即连接"}
              </button>
            </div>
          ))}
        </div>
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
