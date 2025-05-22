import React, { useState } from "react";
import {
  Check,
  X,
  AlignLeft,
  MessageSquare,
  Bot,
  Download,
  Upload,
  RotateCcw,
  ChevronRight,
  ChevronLeft,
  Flag,
  Search,
  Clock,
} from "lucide-react";

// Mock translation data
const mockTranslations = [
  {
    id: 1,
    key: "welcome_message",
    source: "Welcome to our application",
    target: "Bienvenido a nuestra aplicación",
    status: "approved",
    context: "Homepage header",
    machineTranslation: "Bienvenido a nuestra aplicación",
    comments: [
      {
        author: "John D.",
        text: "Make sure to keep the informal tone here",
        timestamp: "2023-05-20T10:30:00Z",
      },
    ],
  },
  {
    id: 2,
    key: "login_button",
    source: "Sign In",
    target: "Iniciar sesión",
    status: "pending",
    context: "Login form",
    machineTranslation: "Iniciar sesión",
    comments: [],
  },
  {
    id: 3,
    key: "error_message",
    source: "An error occurred. Please try again later.",
    target: "Se produjo un error. Por favor, inténtelo de nuevo más tarde.",
    status: "needs_review",
    context: "Error dialog",
    machineTranslation: "Ocurrió un error. Inténtelo de nuevo más tarde.",
    comments: [
      {
        author: "Maria S.",
        text: "The formal 'usted' form is preferred here",
        timestamp: "2023-05-19T14:20:00Z",
      },
    ],
  },
  {
    id: 4,
    key: "settings_title",
    source: "Application Settings",
    target: "Configuración de la aplicación",
    status: "pending",
    context: "Settings page",
    machineTranslation: "Configuración de la aplicación",
    comments: [],
  },
  {
    id: 5,
    key: "logout_confirmation",
    source: "Are you sure you want to log out?",
    target: "¿Está seguro de que desea cerrar sesión?",
    status: "approved",
    context: "Logout dialog",
    machineTranslation: "¿Está seguro de que desea cerrar sesión?",
    comments: [],
  },
];

const TranslationEditor = () => {
  const [translations, setTranslations] = useState(mockTranslations);
  const [selectedTranslation, setSelectedTranslation] = useState(mockTranslations[0]);
  const [editedTranslation, setEditedTranslation] = useState(selectedTranslation.target);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [newComment, setNewComment] = useState("");
  const [showMachineTranslation, setShowMachineTranslation] = useState(false);

  const filteredTranslations = translations.filter((translation) => {
    const matchesSearch =
      translation.key.toLowerCase().includes(searchTerm.toLowerCase()) ||
      translation.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
      translation.target.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = filterStatus === "all" || translation.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const handleTranslationSelect = (translation) => {
    setSelectedTranslation(translation);
    setEditedTranslation(translation.target);
    setShowMachineTranslation(false);
  };

  const handleTranslationUpdate = () => {
    const updatedTranslations = translations.map((t) =>
      t.id === selectedTranslation.id ? { ...t, target: editedTranslation, status: "needs_review" } : t,
    );

    setTranslations(updatedTranslations);
    setSelectedTranslation({ ...selectedTranslation, target: editedTranslation, status: "needs_review" });
  };

  const handleStatusUpdate = (newStatus) => {
    const updatedTranslations = translations.map((t) =>
      t.id === selectedTranslation.id ? { ...t, status: newStatus } : t,
    );

    setTranslations(updatedTranslations);
    setSelectedTranslation({ ...selectedTranslation, status: newStatus });
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const comment = {
      author: "You",
      text: newComment,
      timestamp: new Date().toISOString(),
    };

    const updatedTranslation = {
      ...selectedTranslation,
      comments: [...selectedTranslation.comments, comment],
    };

    const updatedTranslations = translations.map((t) => (t.id === selectedTranslation.id ? updatedTranslation : t));

    setTranslations(updatedTranslations);
    setSelectedTranslation(updatedTranslation);
    setNewComment("");
  };

  const handleUseMachineTranslation = () => {
    setEditedTranslation(selectedTranslation.machineTranslation);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "needs_review":
        return "bg-yellow-100 text-yellow-800";
      case "pending":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "approved":
        return <Check className="h-4 w-4" />;
      case "needs_review":
        return <Flag className="h-4 w-4" />;
      case "pending":
        return <Clock className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left sidebar - Translation list */}
      <div className="w-1/3 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Search translations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="mt-3 flex space-x-2">
            <button
              className={`px-3 py-1 text-xs font-medium rounded-md ${
                filterStatus === "all" ? "bg-indigo-100 text-indigo-800" : "bg-gray-100 text-gray-800"
              }`}
              onClick={() => setFilterStatus("all")}
            >
              All
            </button>
            <button
              className={`px-3 py-1 text-xs font-medium rounded-md ${
                filterStatus === "pending" ? "bg-indigo-100 text-indigo-800" : "bg-gray-100 text-gray-800"
              }`}
              onClick={() => setFilterStatus("pending")}
            >
              Pending
            </button>
            <button
              className={`px-3 py-1 text-xs font-medium rounded-md ${
                filterStatus === "needs_review" ? "bg-indigo-100 text-indigo-800" : "bg-gray-100 text-gray-800"
              }`}
              onClick={() => setFilterStatus("needs_review")}
            >
              Needs Review
            </button>
            <button
              className={`px-3 py-1 text-xs font-medium rounded-md ${
                filterStatus === "approved" ? "bg-indigo-100 text-indigo-800" : "bg-gray-100 text-gray-800"
              }`}
              onClick={() => setFilterStatus("approved")}
            >
              Approved
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {filteredTranslations.map((translation) => (
            <div
              key={translation.id}
              className={`p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 ${
                selectedTranslation.id === translation.id ? "bg-indigo-50" : ""
              }`}
              onClick={() => handleTranslationSelect(translation)}
            >
              <div className="flex justify-between items-start">
                <div className="text-sm font-medium text-gray-900 truncate">{translation.key}</div>
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getStatusColor(translation.status)}`}
                >
                  {getStatusIcon(translation.status)}
                  <span className="ml-1">
                    {translation.status === "needs_review"
                      ? "Review"
                      : translation.status.charAt(0).toUpperCase() + translation.status.slice(1)}
                  </span>
                </span>
              </div>
              <div className="mt-1 text-sm text-gray-500 line-clamp-2">{translation.source}</div>
              <div className="mt-1 text-sm text-gray-700 line-clamp-2">{translation.target}</div>
              {translation.comments.length > 0 && (
                <div className="mt-2 flex items-center text-xs text-gray-500">
                  <MessageSquare className="h-3 w-3 mr-1" />
                  {translation.comments.length} comment{translation.comments.length !== 1 ? "s" : ""}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="p-3 border-t border-gray-200 bg-gray-50 flex justify-between">
          <button className="inline-flex items-center text-sm text-gray-500">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Previous
          </button>
          <div className="text-sm text-gray-500">
            {filteredTranslations.length} of {translations.length}
          </div>
          <button className="inline-flex items-center text-sm text-gray-500">
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </button>
        </div>
      </div>

      {/* Main content - Translation editor */}
      <div className="flex-1 flex flex-col">
        {/* Translation metadata header */}
        <div className="bg-white p-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-medium text-gray-900">{selectedTranslation.key}</h2>
              <p className="text-sm text-gray-500">Context: {selectedTranslation.context}</p>
            </div>
            <div className="flex space-x-2">
              <button
                className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                onClick={() => setShowMachineTranslation(!showMachineTranslation)}
              >
                <Bot className="h-4 w-4 mr-1" />
                {showMachineTranslation ? "Hide Machine" : "Show Machine"}
              </button>
              <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                <Download className="h-4 w-4 mr-1" />
                Export
              </button>
              <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                <Upload className="h-4 w-4 mr-1" />
                Import
              </button>
            </div>
          </div>
        </div>

        {/* Translation content */}
        <div className="flex-1 p-6 bg-gray-50 overflow-y-auto">
          <div className="grid grid-cols-1 gap-6">
            {/* Source text */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <AlignLeft className="h-4 w-4 mr-2" />
                Source Text (English)
              </div>
              <div className="p-3 bg-gray-50 rounded border border-gray-200 text-gray-900">
                {selectedTranslation.source}
              </div>
            </div>

            {/* Machine translation if shown */}
            {showMachineTranslation && (
              <div className="bg-white p-4 rounded-lg shadow-sm border border-blue-100">
                <div className="flex items-center text-sm font-medium text-blue-700 mb-2">
                  <Bot className="h-4 w-4 mr-2" />
                  Machine Translation (Spanish)
                </div>
                <div className="p-3 bg-blue-50 rounded border border-blue-200 text-gray-900">
                  {selectedTranslation.machineTranslation}
                </div>
                <div className="mt-2 flex justify-end">
                  <button
                    className="inline-flex items-center px-2 py-1 text-xs font-medium text-blue-700 hover:text-blue-900"
                    onClick={handleUseMachineTranslation}
                  >
                    <RotateCcw className="h-3 w-3 mr-1" />
                    Use This Translation
                  </button>
                </div>
              </div>
            )}

            {/* Target text editor */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <AlignLeft className="h-4 w-4 mr-2" />
                Target Text (Spanish)
              </div>
              <textarea
                className="w-full p-3 bg-white rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 min-h-[120px]"
                value={editedTranslation}
                onChange={(e) => setEditedTranslation(e.target.value)}
                placeholder="Enter translation..."
              />
              <div className="mt-3 flex justify-between">
                <div className="flex items-center space-x-2">
                  <button
                    className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    onClick={() => setEditedTranslation(selectedTranslation.target)}
                  >
                    <RotateCcw className="h-4 w-4 mr-1" />
                    Reset
                  </button>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                    onClick={() => {
                      handleTranslationUpdate();
                      handleStatusUpdate("approved");
                    }}
                  >
                    <Check className="h-4 w-4 mr-1" />
                    Save & Approve
                  </button>
                  <button
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                    onClick={handleTranslationUpdate}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>

            {/* Comments section */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-center text-sm font-medium text-gray-700 mb-4">
                <MessageSquare className="h-4 w-4 mr-2" />
                Comments ({selectedTranslation.comments.length})
              </div>

              {selectedTranslation.comments.length > 0 ? (
                <div className="space-y-4 mb-4">
                  {selectedTranslation.comments.map((comment, index) => (
                    <div key={index} className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-gray-900">{comment.author}</span>
                        <span className="text-xs text-gray-500">{new Date(comment.timestamp).toLocaleString()}</span>
                      </div>
                      <p className="text-sm text-gray-700">{comment.text}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500 mb-4">No comments yet.</p>
              )}

              <div className="flex space-x-2">
                <input
                  type="text"
                  className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Add a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleAddComment()}
                />
                <button
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                  onClick={handleAddComment}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TranslationEditor;
