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
} from "lucide-react";
import Alert from "@/frontend/components/ui/Alert";
import Card from "@/frontend/components/ui/Card";
import Button from "@/frontend/components/ui/Button";
import TextInput from "@/frontend/components/ui/TextInput";
import Dropdown from "@/frontend/components/ui/Dropdown";
import Modal from "@/frontend/components/ui/Modal";
import Tag from "@/frontend/components/ui/Tag";
import DataTable from "@/frontend/components/ui/DataTable";

const AppleUIComponents = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [modalOpen, setModalOpen] = useState(false);
  const [alertVisible, setAlertVisible] = useState(true);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const fileUploadData = [
    { name: "document.pdf", size: "2.4 MB", type: "PDF" },
    { name: "image.jpg", size: "1.2 MB", type: "Image" },
  ];

  const tableData = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin", status: "Active" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User", status: "Active" },
    { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "User", status: "Inactive" },
    { id: 4, name: "Alice Brown", email: "alice@example.com", role: "Editor", status: "Active" },
    { id: 5, name: "Charlie Green", email: "charlie@example.com", role: "Viewer", status: "Inactive" },
    { id: 6, name: "David White", email: "david@example.com", role: "Admin", status: "Active" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight">Apple-Inspired UI Components</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A modern component library following Apple's design principles with clean aesthetics, smooth animations, and
            intuitive interactions.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-1">
          <div className="flex space-x-1">
            {["overview", "forms", "feedback", "data"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  activeTab === tab
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Alert */}
        {alertVisible && (
          <Alert type="success" title="Welcome to the component library!" onDismiss={() => setAlertVisible(false)}>
            Explore our collection of beautifully crafted components inspired by Apple's design language.
          </Alert>
        )}

        {activeTab === "overview" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Buttons Card */}
            <Card title="Buttons" interactive>
              <div className="space-y-3">
                <Button variant="primary" icon={Save}>
                  Primary
                </Button>
                <Button variant="secondary" icon={Edit3}>
                  Secondary
                </Button>
                <Button variant="outline" icon={ArrowRight}>
                  Outline
                </Button>
                <Button variant="danger" icon={Trash2}>
                  Danger
                </Button>
                <Button disabled icon={LogIn}>
                  Disabled
                </Button>
              </div>
            </Card>

            {/* Interactive Card */}
            <Card title="Interactive Elements" interactive>
              <div className="space-y-4">
                <Button variant="primary" icon={PlusCircle} onClick={() => setModalOpen(true)}>
                  Open Modal
                </Button>
                <div className="flex flex-wrap gap-2">
                  <Tag variant="primary">React 19+</Tag>
                  <Tag variant="success">Tailwind 4+</Tag>
                  <Tag variant="default">Lucide</Tag>
                </div>
              </div>
            </Card>

            {/* Status Card */}
            <Card title="System Status">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Components</span>
                  <Tag variant="success">Active</Tag>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Animations</span>
                  <Tag variant="success">Smooth</Tag>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Performance</span>
                  <Tag variant="primary">Optimized</Tag>
                </div>
              </div>
            </Card>
          </div>
        )}

        {activeTab === "forms" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Form Elements */}
            <Card title="Form Elements">
              <div className="space-y-4">
                <TextInput label="Email Address" type="email" placeholder="Enter your email" icon={Mail} />
                <TextInput label="Password" type="password" placeholder="Enter your password" icon={Lock} />
                <Dropdown
                  label="Language"
                  options={[
                    { value: "en", label: "English" },
                    { value: "es", label: "Spanish" },
                    { value: "fr", label: "French" },
                  ]}
                  value="en"
                />
                <TextInput label="Search" placeholder="Search components..." icon={Search} />
              </div>
            </Card>

            {/* File Upload */}
            <Card title="File Upload">
              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-500 hover:bg-blue-50/50 transition-colors cursor-pointer">
                  <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-600">
                    <span className="font-medium text-blue-600">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">PNG, JPG, PDF up to 10MB</p>
                </div>

                {fileUploadData.length > 0 && (
                  <div className="space-y-2">
                    {fileUploadData.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <File className="h-5 w-5 text-gray-400" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">{file.name}</p>
                            <p className="text-xs text-gray-500">
                              {file.size} • {file.type}
                            </p>
                          </div>
                        </div>
                        <button className="text-red-500 hover:text-red-700">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Card>
          </div>
        )}

        {activeTab === "feedback" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card title="Alert Variants">
                <div className="space-y-4">
                  <Alert type="success" title="Success!">
                    Your changes have been saved successfully.
                  </Alert>
                  <Alert type="warning" title="Warning">
                    Please review your input before proceeding.
                  </Alert>
                  <Alert type="error" title="Error">
                    Something went wrong. Please try again.
                  </Alert>
                  <Alert type="info" title="Information">
                    This is some helpful information for you.
                  </Alert>
                </div>
              </Card>

              <Card title="Tags & Badges">
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <Tag variant="default">Default</Tag>
                    <Tag variant="primary">Primary</Tag>
                    <Tag variant="success">Success</Tag>
                    <Tag variant="warning">Warning</Tag>
                    <Tag variant="error">Error</Tag>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Tag variant="primary">
                      <Circle className="w-2 h-2 mr-1.5 fill-current" />
                      Online
                    </Tag>
                    <Tag variant="error">
                      <Circle className="w-2 h-2 mr-1.5 fill-current" />
                      Offline
                    </Tag>
                    <Tag variant="warning">
                      <Circle className="w-2 h-2 mr-1.5 fill-current" />
                      Pending
                    </Tag>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}

        {activeTab === "data" && (
          <div className="space-y-6">
            {/* Data Table */}
            <DataTable title="User Management" data={tableData} />
          </div>
        )}

        {/* Modal */}
        <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Example Modal">
          <div className="space-y-4">
            <p className="text-gray-600">
              This is an example modal with Apple-inspired design. Notice the smooth animations, backdrop blur, and
              clean typography.
            </p>
            <TextInput label="Name" placeholder="Enter your name" icon={User} />
            <div className="flex justify-end space-x-3 pt-4">
              <Button variant="outline" onClick={() => setModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={() => setModalOpen(false)}>
                Save Changes
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default AppleUIComponents;
