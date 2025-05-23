import React from "react";
import { LucideIcon } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";

interface NavigationItem {
  id: string;
  label: string;
  icon: LucideIcon;
  badge?: string;
  disabled?: boolean;
}

interface SidebarProps {
  navigationItems: NavigationItem[];
  currentPage: string;
  onNavigate: (pageId: string) => void;
  isOpen: boolean;
  onToggle: () => void;
  logo?: {
    icon: LucideIcon;
    title: string;
    subtitle: string;
  };
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({
  navigationItems,
  currentPage,
  onNavigate,
  isOpen,
  onToggle,
  logo,
  className = "",
}) => {
  const { theme } = useTheme();

  return (
    <div
      className={`bg-white border-r border-gray-100 transition-all duration-300 ease-out ${
        isOpen ? "w-72" : "w-20"
      } min-h-screen backdrop-blur-xl bg-white/95 ${className}`}
    >
      {logo && (
        <div className="p-6 border-b border-gray-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25">
              <logo.icon className="w-6 h-6 text-white" />
            </div>
            {isOpen && (
              <div>
                <h1 className="text-xl font-semibold text-gray-900">{logo.title}</h1>
                <p className="text-xs text-gray-500 font-medium">{logo.subtitle}</p>
              </div>
            )}
          </div>
        </div>
      )}

      <nav className="p-4 space-y-2">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;

          return (
            <button
              key={item.id}
              onClick={() => !item.disabled && onNavigate(item.id)}
              disabled={item.disabled}
              className={`w-full flex items-center gap-4 p-3 rounded-2xl transition-all duration-200 ease-out group ${
                isActive
                  ? "bg-blue-50 text-blue-600 shadow-sm"
                  : item.disabled
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Icon
                className={`w-5 h-5 transition-colors duration-200 ${
                  isActive
                    ? "text-blue-600"
                    : item.disabled
                      ? "text-gray-400"
                      : "text-gray-500 group-hover:text-gray-700"
                }`}
              />
              {isOpen && (
                <div className="flex items-center justify-between flex-1">
                  <span className="font-medium text-sm">{item.label}</span>
                  {item.badge && (
                    <span className="px-2 py-1 bg-red-500 text-white text-xs rounded-full">{item.badge}</span>
                  )}
                </div>
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
