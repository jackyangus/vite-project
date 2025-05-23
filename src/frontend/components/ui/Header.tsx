import React from "react";
import { Menu, Bell } from "lucide-react";
import SearchInput from "./SearchInput";
import Avatar from "./Avatar";
import Button from "./Button";
import { useTheme } from "../../contexts/ThemeContext";

interface HeaderProps {
  onMenuToggle: () => void;
  searchPlaceholder?: string;
  onSearch?: (value: string) => void;
  searchValue?: string;
  showNotifications?: boolean;
  notificationCount?: number;
  onNotificationClick?: () => void;
  user?: {
    name: string;
    role: string;
    avatar?: string;
    status?: "online" | "offline" | "busy" | "away";
  };
  onUserClick?: () => void;
  actions?: React.ReactNode;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({
  onMenuToggle,
  searchPlaceholder = "搜索...",
  onSearch,
  searchValue,
  showNotifications = true,
  notificationCount = 0,
  onNotificationClick,
  user,
  onUserClick,
  actions,
  className = "",
}) => {
  const { theme } = useTheme();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onSearch) {
      onSearch(e.target.value);
    }
  };

  return (
    <header
      className={`bg-white/80 backdrop-blur-xl border-b border-gray-100 px-8 py-6 sticky top-0 z-10 ${className}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Button variant="secondary" size="sm" icon={Menu} onClick={onMenuToggle} aria-label="切换侧边栏"></Button>

          <SearchInput placeholder={searchPlaceholder} value={searchValue} onChange={handleSearchChange} size="md" />
        </div>

        <div className="flex items-center gap-4">
          {actions}

          {showNotifications && (
            <button
              onClick={onNotificationClick}
              className="p-3 hover:bg-gray-100 rounded-2xl relative transition-colors duration-200 group"
              aria-label="通知"
            >
              <Bell className="w-5 h-5 text-gray-600 group-hover:text-gray-800" />
              {notificationCount > 0 && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white">
                  {notificationCount > 9 && <span className="sr-only">{notificationCount} 条新通知</span>}
                </span>
              )}
            </button>
          )}

          {user && (
            <div
              onClick={onUserClick}
              className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-2xl cursor-pointer transition-colors duration-200"
            >
              <Avatar src={user.avatar} alt={user.name} size="md" status={user.status} showStatus={true} />
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-500">{user.role}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
