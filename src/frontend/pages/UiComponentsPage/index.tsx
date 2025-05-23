import React, { useState } from "react";
import {
  LogIn,
  LogOut,
  PlusCircle,
  Save,
  Trash2,
  Edit3,
  Send,
  ArrowRight,
  ArrowLeft,
  FileText,
  Users,
  Briefcase,
  X,
  AlertTriangle,
  CheckCircle,
  Info,
  User,
  Mail,
  Lock,
  Search,
  CalendarDays,
  ChevronDown,
  Languages,
  Filter,
  List,
  Settings,
  CheckCircle2,
  XOctagon,
  Tag as TagIcon,
  Circle,
  Archive,
  UploadCloud,
  File,
  Star,
  Heart,
  Bell,
  Download,
  Share2,
  Play,
  Pause,
  Volume2,
  Wifi,
  Battery,
  Zap,
  TrendingUp,
  Award,
  Target,
  Clock,
  Palette,
  Sparkles,
  Moon,
  Sun,
} from "lucide-react";
import Alert from "@/frontend/components/ui/Alert";
import Card from "@/frontend/components/ui/Card";
import Button from "@/frontend/components/ui/Button";
import TextInput from "@/frontend/components/ui/TextInput";
import Dropdown from "@/frontend/components/ui/Dropdown";
import Modal from "@/frontend/components/ui/Modal";
import Tag from "@/frontend/components/ui/Tag";
import DataTable from "@/frontend/components/ui/DataTable";

const BeautifulUIComponents = () => {
  const [activeTab, setActiveTab] = useState("showcase");
  const [modalOpen, setModalOpen] = useState(false);
  const [alertVisible, setAlertVisible] = useState(true);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [rating, setRating] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(75);
  const [progress, setProgress] = useState(65);

  const fileUploadData = [
    { name: "design-system.sketch", size: "2.4 MB", type: "Sketch", progress: 100 },
    { name: "component-library.fig", size: "1.8 MB", type: "Figma", progress: 85 },
    { name: "brand-guidelines.pdf", size: "3.2 MB", type: "PDF", progress: 100 },
  ];

  const tableData = [
    { id: 1, name: "Sophia Chen", email: "sophia@design.co", role: "Design Lead", status: "Active", avatar: "SC" },
    { id: 2, name: "Marcus Johnson", email: "marcus@ui.dev", role: "Frontend Dev", status: "Active", avatar: "MJ" },
    { id: 3, name: "Elena Rodriguez", email: "elena@ux.studio", role: "UX Designer", status: "Away", avatar: "ER" },
    { id: 4, name: "David Kim", email: "david@creative.io", role: "Creative Dir", status: "Active", avatar: "DK" },
    { id: 5, name: "Aria Patel", email: "aria@design.lab", role: "UI Designer", status: "Busy", avatar: "AP" },
  ];

  const statsData = [
    {
      label: "Components",
      value: "120+",
      icon: Palette,
      trend: "+12%",
      color: "bg-gradient-to-r from-purple-500 to-pink-500",
    },
    {
      label: "Downloads",
      value: "50K",
      icon: Download,
      trend: "+25%",
      color: "bg-gradient-to-r from-blue-500 to-cyan-500",
    },
    {
      label: "Contributors",
      value: "2.5K",
      icon: Users,
      trend: "+8%",
      color: "bg-gradient-to-r from-green-500 to-emerald-500",
    },
    { label: "Stars", value: "15.2K", icon: Star, trend: "+18%", color: "bg-gradient-to-r from-orange-500 to-red-500" },
  ];

  const features = [
    {
      title: "Modern Design",
      description: "Beautiful components following latest design trends",
      icon: Sparkles,
      color: "text-purple-600 bg-purple-100",
    },
    {
      title: "Accessibility First",
      description: "Built with WCAG 2.1 compliance and screen reader support",
      icon: Target,
      color: "text-blue-600 bg-blue-100",
    },
    {
      title: "Dark Mode",
      description: "Seamless theme switching with elegant transitions",
      icon: Moon,
      color: "text-indigo-600 bg-indigo-100",
    },
    {
      title: "Performance",
      description: "Optimized for speed with minimal bundle size",
      icon: Zap,
      color: "text-yellow-600 bg-yellow-100",
    },
  ];

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div
      className={`min-h-screen transition-all duration-500 ${isDarkMode ? "bg-gray-900" : "bg-gradient-to-br from-blue-50 via-white to-purple-50"} p-6 overflow-x-hidden`}
    >
      <div className="max-w-7xl mx-auto space-y-8 pb-20">
        {/* Floating Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="fixed top-6 right-6 z-50 p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
          aria-label="Toggle theme"
        >
          {isDarkMode ? <Sun className="h-5 w-5 text-yellow-500" /> : <Moon className="h-5 w-5 text-gray-600" />}
        </button>

        {/* Enhanced Header */}
        <div className="text-center space-y-6 relative">
          <div className="absolute inset-0 flex items-center justify-center opacity-5">
            <Sparkles className="h-64 w-64 text-purple-500" />
          </div>
          <div className="relative z-10">
            <h1 className={`text-6xl font-black tracking-tight mb-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                Beautiful
              </span>{" "}
              UI Components
            </h1>
            <p
              className={`text-xl max-w-3xl mx-auto leading-relaxed ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}
            >
              Discover our comprehensive collection of modern, accessible, and beautifully crafted components designed
              for the next generation of web applications.
            </p>
            <div className="flex items-center justify-center space-x-4 mt-6">
              <Button variant="primary" icon={Play} className="px-8 py-3">
                Explore Components
              </Button>
              <Button variant="outline" icon={Download}>
                Download Kit
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsData.map((stat, index) => (
            <div
              key={index}
              className={`relative overflow-hidden rounded-2xl p-6 text-white transform hover:scale-105 transition-all duration-300 cursor-pointer ${stat.color}`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80 text-sm font-medium">{stat.label}</p>
                  <p className="text-3xl font-bold mt-1">{stat.value}</p>
                  <p className="text-white/90 text-sm flex items-center mt-2">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    {stat.trend}
                  </p>
                </div>
                <stat.icon className="h-12 w-12 text-white/30" />
              </div>
              <div className="absolute -right-4 -bottom-4 opacity-10">
                <stat.icon className="h-24 w-24" />
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Navigation Tabs */}
        <div
          className={`${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"} rounded-2xl shadow-lg border p-2 backdrop-blur-sm`}
        >
          <div className="flex flex-wrap gap-2">
            {[
              { id: "showcase", label: "Showcase", icon: Sparkles },
              { id: "interactive", label: "Interactive", icon: Play },
              { id: "forms", label: "Forms", icon: Edit3 },
              { id: "feedback", label: "Feedback", icon: Bell },
              { id: "data", label: "Data", icon: FileText },
              { id: "media", label: "Media", icon: Volume2 },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                    : `${isDarkMode ? "text-gray-300 hover:text-white hover:bg-gray-700" : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"}`
                }`}
              >
                <tab.icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Enhanced Alert */}
        {alertVisible && (
          <Alert
            type="success"
            title="🎉 Welcome to the Beautiful UI Library!"
            onDismiss={() => setAlertVisible(false)}
          >
            <p>Experience our meticulously crafted components with stunning animations and delightful interactions.</p>
          </Alert>
        )}

        {/* Showcase Tab */}
        {activeTab === "showcase" && (
          <div className="space-y-8">
            {/* Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="text-center space-y-4">
                    <div
                      className={`inline-flex p-4 rounded-2xl ${feature.color} group-hover:scale-110 transition-transform duration-300`}
                    >
                      <feature.icon className="h-8 w-8" />
                    </div>
                    <h3 className={`text-lg font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                      {feature.title}
                    </h3>
                    <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>{feature.description}</p>
                  </div>
                </Card>
              ))}
            </div>

            {/* Enhanced Button Showcase */}
            <Card title="Button Variations" className="group">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <h4 className={`font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>Primary Actions</h4>
                  <Button variant="primary" icon={Save} className="w-full">
                    Save Changes
                  </Button>
                  <Button variant="primary" icon={Send} className="w-full">
                    Send Message
                  </Button>
                  <Button variant="primary" icon={Download} className="w-full">
                    Download File
                  </Button>
                </div>

                <div className="space-y-3">
                  <h4 className={`font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>Secondary Actions</h4>
                  <Button variant="secondary" icon={Edit3} className="w-full">
                    Edit Content
                  </Button>
                  <Button variant="outline" icon={Share2} className="w-full">
                    Share Link
                  </Button>
                  <Button variant="outline" icon={Archive} className="w-full">
                    Archive Item
                  </Button>
                </div>

                <div className="space-y-3">
                  <h4 className={`font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                    Destructive Actions
                  </h4>
                  <Button variant="danger" icon={Trash2} className="w-full">
                    Delete Forever
                  </Button>
                  <Button variant="danger" icon={LogOut} className="w-full">
                    Sign Out
                  </Button>
                  <Button disabled icon={X} className="w-full">
                    Disabled State
                  </Button>
                </div>
              </div>
            </Card>

            {/* Interactive Rating Component */}
            <Card title="Interactive Rating" className="max-w-md">
              <div className="space-y-4">
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRating(star)}
                      className="transition-all duration-200 hover:scale-110"
                    >
                      <Star
                        className={`h-8 w-8 ${
                          star <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300 hover:text-yellow-300"
                        }`}
                      />
                    </button>
                  ))}
                </div>
                <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                  {rating > 0 ? `You rated ${rating} out of 5 stars` : "Click to rate"}
                </p>
              </div>
            </Card>
          </div>
        )}

        {/* Interactive Tab */}
        {activeTab === "interactive" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Progress & Loading States */}
            <Card title="Progress & Loading States">
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className={isDarkMode ? "text-gray-300" : "text-gray-600"}>Upload Progress</span>
                    <span className={isDarkMode ? "text-gray-300" : "text-gray-600"}>{progress}%</span>
                  </div>
                  <div className={`w-full h-3 rounded-full ${isDarkMode ? "bg-gray-700" : "bg-gray-200"}`}>
                    <div
                      className="h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <Button
                    variant="outline"
                    onClick={() => setProgress(Math.min(100, progress + 10))}
                    disabled={progress >= 100}
                  >
                    Increase
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setProgress(Math.max(0, progress - 10))}
                    disabled={progress <= 0}
                  >
                    Decrease
                  </Button>
                  <Button variant="secondary" onClick={() => setProgress(0)}>
                    Reset
                  </Button>
                </div>

                {/* Loading Spinner */}
                <div className="flex items-center space-x-3 p-4 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700">
                  <div className="animate-spin rounded-full h-6 w-6 border-2 border-purple-500 border-t-transparent"></div>
                  <span className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                    Loading amazing content...
                  </span>
                </div>
              </div>
            </Card>

            {/* Interactive Cards */}
            <Card title="Interactive Elements">
              <div className="space-y-4">
                <Button variant="primary" icon={PlusCircle} onClick={() => setModalOpen(true)} className="w-full">
                  Open Beautiful Modal
                </Button>

                <div className="flex flex-wrap gap-2">
                  <Tag variant="primary" className="animate-pulse">
                    React 19+
                  </Tag>
                  <Tag variant="success">TypeScript</Tag>
                  <Tag variant="warning">Tailwind 4+</Tag>
                  <Tag variant="default">Lucide Icons</Tag>
                </div>

                <div className="p-4 rounded-lg bg-gradient-to-r from-green-50 to-blue-50 dark:from-gray-800 dark:to-gray-700">
                  <div className="flex items-center space-x-3">
                    <div className="flex space-x-1">
                      <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                      <div
                        className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                      <div
                        className="w-3 h-3 bg-green-500 rounded-full animate-pulse"
                        style={{ animationDelay: "0.4s" }}
                      ></div>
                    </div>
                    <span className={`text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                      System Status: All systems operational
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Forms Tab - Enhanced */}
        {activeTab === "forms" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card title="Beautiful Form Elements">
              <div className="space-y-6">
                <TextInput label="Email Address" type="email" placeholder="designer@beautiful.ui" icon={Mail} />
                <TextInput label="Password" type="password" placeholder="Enter secure password" icon={Lock} />
                <Dropdown
                  label="Design Role"
                  options={[
                    { value: "designer", label: "UI/UX Designer" },
                    { value: "developer", label: "Frontend Developer" },
                    { value: "manager", label: "Design Manager" },
                    { value: "researcher", label: "UX Researcher" },
                  ]}
                  value="designer"
                />
                <TextInput label="Search Components" placeholder="Search our beautiful components..." icon={Search} />

                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <Button variant="primary" icon={Save} className="w-full">
                    Save Beautiful Form
                  </Button>
                </div>
              </div>
            </Card>

            {/* Enhanced File Upload */}
            <Card title="Drag & Drop Upload">
              <div className="space-y-6">
                <div className="relative border-2 border-dashed border-purple-300 dark:border-purple-600 rounded-2xl p-8 text-center hover:border-purple-500 hover:bg-purple-50/50 dark:hover:bg-purple-900/20 transition-all duration-300 cursor-pointer group">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative z-10">
                    <UploadCloud className="mx-auto h-16 w-16 text-purple-400 group-hover:text-purple-500 transition-colors duration-300 group-hover:scale-110 transform" />
                    <p className="mt-4 text-lg font-medium text-purple-600 dark:text-purple-400">
                      Drop your files here
                    </p>
                    <p className={`mt-1 text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                      or <span className="font-medium text-purple-600 dark:text-purple-400">browse</span> to upload
                    </p>
                    <p className={`text-xs mt-2 ${isDarkMode ? "text-gray-500" : "text-gray-400"}`}>
                      PNG, JPG, PDF, Sketch, Figma up to 10MB
                    </p>
                  </div>
                </div>

                {fileUploadData.length > 0 && (
                  <div className="space-y-3">
                    <h4 className={`font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>Uploaded Files</h4>
                    {fileUploadData.map((file, index) => (
                      <div
                        key={index}
                        className={`flex items-center justify-between p-4 rounded-xl border transition-all duration-200 hover:shadow-md ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-gray-50 border-gray-200"}`}
                      >
                        <div className="flex items-center space-x-4">
                          <div className="flex-shrink-0">
                            <File
                              className={`h-8 w-8 ${file.type === "Sketch" ? "text-orange-500" : file.type === "Figma" ? "text-purple-500" : "text-red-500"}`}
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p
                              className={`text-sm font-medium truncate ${isDarkMode ? "text-white" : "text-gray-900"}`}
                            >
                              {file.name}
                            </p>
                            <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                              {file.size} • {file.type}
                            </p>
                            <div
                              className={`w-full h-1.5 rounded-full mt-2 ${isDarkMode ? "bg-gray-700" : "bg-gray-200"}`}
                            >
                              <div
                                className="h-1.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full transition-all duration-500"
                                style={{ width: `${file.progress}%` }}
                              />
                            </div>
                          </div>
                        </div>
                        <button className="ml-4 text-red-500 hover:text-red-700 transition-colors">
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Card>
          </div>
        )}

        {/* Feedback Tab - Enhanced */}
        {activeTab === "feedback" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card title="Beautiful Alerts">
                <div className="space-y-4">
                  <Alert type="success" title="🎉 Success!">
                    Your beautiful design has been saved successfully with all animations intact.
                  </Alert>
                  <Alert type="warning" title="⚠️ Design Warning">
                    Please review your color contrast ratios for accessibility compliance.
                  </Alert>
                  <Alert type="error" title="❌ Upload Failed">
                    The design file is too large. Please compress it and try again.
                  </Alert>
                  <Alert type="info" title="💡 Pro Tip">
                    Use our new gradient backgrounds for more engaging user interfaces.
                  </Alert>
                </div>
              </Card>

              <Card title="Tags & Status Indicators">
                <div className="space-y-6">
                  <div>
                    <h4 className={`font-semibold mb-3 ${isDarkMode ? "text-white" : "text-gray-900"}`}>Design Tags</h4>
                    <div className="flex flex-wrap gap-2">
                      <Tag variant="primary" className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                        Modern
                      </Tag>
                      <Tag variant="success" className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                        Accessible
                      </Tag>
                      <Tag variant="warning" className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
                        Beta
                      </Tag>
                      <Tag variant="error" className="bg-gradient-to-r from-red-500 to-pink-500 text-white">
                        Deprecated
                      </Tag>
                      <Tag variant="default">Neutral</Tag>
                    </div>
                  </div>

                  <div>
                    <h4 className={`font-semibold mb-3 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                      Status Indicators
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                        <div className="flex items-center space-x-3">
                          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                          <span className={`font-medium ${isDarkMode ? "text-green-300" : "text-green-800"}`}>
                            System Online
                          </span>
                        </div>
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      </div>

                      <div className="flex items-center justify-between p-3 rounded-lg bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800">
                        <div className="flex items-center space-x-3">
                          <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
                          <span className={`font-medium ${isDarkMode ? "text-yellow-300" : "text-yellow-800"}`}>
                            Maintenance Mode
                          </span>
                        </div>
                        <Clock className="h-5 w-5 text-yellow-500" />
                      </div>

                      <div className="flex items-center justify-between p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                        <div className="flex items-center space-x-3">
                          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                          <span className={`font-medium ${isDarkMode ? "text-red-300" : "text-red-800"}`}>
                            Service Offline
                          </span>
                        </div>
                        <AlertTriangle className="h-5 w-5 text-red-500" />
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* Data Tab - Enhanced */}
        {activeTab === "data" && (
          <div className="space-y-6">
            <DataTable title="Beautiful User Management" data={tableData} />

            {/* Additional Data Visualization */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card title="Quick Stats" className="lg:col-span-1">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Active Users</span>
                    <span className={`font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>127</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Conversion Rate</span>
                    <span className={`font-semibold text-green-600`}>12.5%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Avg. Session</span>
                    <span className={`font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>4m 32s</span>
                  </div>
                </div>
              </Card>

              <Card title="Recent Activity" className="lg:col-span-2">
                <div className="space-y-3">
                  {[
                    { user: "Sophia Chen", action: "created new component", time: "2 minutes ago", type: "create" },
                    { user: "Marcus Johnson", action: "updated design system", time: "5 minutes ago", type: "update" },
                    {
                      user: "Elena Rodriguez",
                      action: "published components",
                      time: "10 minutes ago",
                      type: "publish",
                    },
                  ].map((activity, index) => (
                    <div
                      key={index}
                      className={`flex items-center space-x-4 p-3 rounded-lg transition-colors ${isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-50"}`}
                    >
                      <div
                        className={`w-2 h-2 rounded-full ${activity.type === "create" ? "bg-green-500" : activity.type === "update" ? "bg-blue-500" : "bg-purple-500"}`}
                      ></div>
                      <div className="flex-1">
                        <p className={`text-sm ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                          <span className="font-medium">{activity.user}</span> {activity.action}
                        </p>
                        <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* Media Tab - New */}
        {activeTab === "media" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card title="Media Player Controls">
              <div className="space-y-6">
                <div className={`p-6 rounded-2xl ${isDarkMode ? "bg-gray-800" : "bg-gray-900"} text-white`}>
                  <div className="flex items-center space-x-4 mb-4">
                    <img
                      src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=64&h=64&fit=crop&crop=face"
                      alt="Album Cover"
                      className="w-16 h-16 rounded-xl object-cover"
                    />
                    <div>
                      <h4 className="font-semibold">Beautiful Ambient</h4>
                      <p className="text-gray-400 text-sm">UI Sounds Collection</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm text-gray-400">
                      <span>2:14</span>
                      <span>4:32</span>
                    </div>
                    <div className="w-full h-2 bg-gray-700 rounded-full">
                      <div className="w-1/2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                    </div>

                    <div className="flex items-center justify-center space-x-6">
                      <button className="text-gray-400 hover:text-white transition-colors">
                        <ArrowLeft className="h-6 w-6" />
                      </button>
                      <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="bg-white text-gray-900 p-3 rounded-full hover:scale-105 transition-transform"
                      >
                        {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                      </button>
                      <button className="text-gray-400 hover:text-white transition-colors">
                        <ArrowRight className="h-6 w-6" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <Volume2 className={`h-5 w-5 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`} />
                  <div className="flex-1">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={volume}
                      onChange={(e) => setVolume(parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                    />
                  </div>
                  <span className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>{volume}%</span>
                </div>
              </div>
            </Card>

            <Card title="Device Status">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
                  <div className="flex items-center space-x-3">
                    <Wifi className="h-6 w-6 text-blue-500" />
                    <div>
                      <p className={`font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>WiFi Connection</p>
                      <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Beautiful-UI-5G</p>
                    </div>
                  </div>
                  <Tag variant="success">Connected</Tag>
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
                  <div className="flex items-center space-x-3">
                    <Battery className="h-6 w-6 text-green-500" />
                    <div>
                      <p className={`font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>Battery Level</p>
                      <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                        Charging - 2h remaining
                      </p>
                    </div>
                  </div>
                  <span className={`font-semibold text-green-600`}>78%</span>
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
                  <div className="flex items-center space-x-3">
                    <Zap className="h-6 w-6 text-purple-500" />
                    <div>
                      <p className={`font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>Performance</p>
                      <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                        Optimized for beauty
                      </p>
                    </div>
                  </div>
                  <Tag variant="primary">Excellent</Tag>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Enhanced Modal */}
        <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="✨ Beautiful Modal Experience">
          <div className="space-y-6">
            <div
              className={`p-4 rounded-xl ${isDarkMode ? "bg-gray-800" : "bg-gradient-to-r from-purple-50 to-pink-50"} border border-purple-200 dark:border-purple-800`}
            >
              <p className={`${isDarkMode ? "text-gray-300" : "text-gray-700"} leading-relaxed`}>
                Experience the perfect blend of functionality and aesthetics. This modal demonstrates smooth animations,
                backdrop blur effects, and beautiful typography that creates an engaging user experience.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TextInput label="Full Name" placeholder="Enter your name" icon={User} />
              <TextInput label="Email" placeholder="your@email.com" icon={Mail} />
            </div>

            <Dropdown
              label="Preferred Design Style"
              options={[
                { value: "minimal", label: "Minimal & Clean" },
                { value: "vibrant", label: "Vibrant & Colorful" },
                { value: "elegant", label: "Elegant & Sophisticated" },
                { value: "playful", label: "Playful & Fun" },
              ]}
              value="minimal"
            />

            <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200 dark:border-gray-700">
              <Button variant="outline" onClick={() => setModalOpen(false)}>
                Maybe Later
              </Button>
              <Button variant="primary" icon={Sparkles} onClick={() => setModalOpen(false)}>
                Create Beautiful UI
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default BeautifulUIComponents;
