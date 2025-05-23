import React from "react";
import { User } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: "sm" | "md" | "lg" | "xl";
  status?: "online" | "offline" | "busy" | "away";
  showStatus?: boolean;
  className?: string;
  fallbackIcon?: React.ReactNode;
}

const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = "用户头像",
  size = "md",
  status = "offline",
  showStatus = false,
  className = "",
  fallbackIcon,
  ...props
}) => {
  const { theme } = useTheme();

  const sizeVariants = {
    sm: {
      container: "w-8 h-8",
      icon: "w-4 h-4",
      status: "w-3 h-3 -bottom-0.5 -right-0.5",
    },
    md: {
      container: "w-10 h-10",
      icon: "w-5 h-5",
      status: "w-3 h-3 -bottom-0.5 -right-0.5",
    },
    lg: {
      container: "w-16 h-16",
      icon: "w-8 h-8",
      status: "w-5 h-5 -bottom-1 -right-1",
    },
    xl: {
      container: "w-20 h-20",
      icon: "w-10 h-10",
      status: "w-6 h-6 -bottom-1 -right-1",
    },
  };

  const statusColors = {
    online: "bg-green-500",
    offline: "bg-gray-400",
    busy: "bg-red-500",
    away: "bg-yellow-500",
  };

  const variant = sizeVariants[size];

  return (
    <div className={`relative ${className}`}>
      <div
        className={`${variant.container} rounded-2xl overflow-hidden flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300`}
      >
        {src ? (
          <img src={src} alt={alt} className="w-full h-full object-cover" {...props} />
        ) : fallbackIcon ? (
          fallbackIcon
        ) : (
          <User className={`${variant.icon} text-gray-600`} />
        )}
      </div>
      {showStatus && (
        <div className={`absolute ${variant.status} ${statusColors[status]} rounded-full border-2 border-white`} />
      )}
    </div>
  );
};

export default Avatar;
