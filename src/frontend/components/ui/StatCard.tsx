import React from "react";
import { LucideIcon, TrendingUp } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";

interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  icon: LucideIcon;
  color?: "blue" | "green" | "purple" | "orange" | "red";
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, icon: Icon, color = "blue", className = "" }) => {
  const { theme } = useTheme();

  const colorVariants = {
    blue: {
      iconBg: "bg-blue-500",
      bgGradient: "from-blue-50 to-blue-100",
    },
    green: {
      iconBg: "bg-green-500",
      bgGradient: "from-green-50 to-green-100",
    },
    purple: {
      iconBg: "bg-purple-500",
      bgGradient: "from-purple-50 to-purple-100",
    },
    orange: {
      iconBg: "bg-orange-500",
      bgGradient: "from-orange-50 to-orange-100",
    },
    red: {
      iconBg: "bg-red-500",
      bgGradient: "from-red-50 to-red-100",
    },
  };

  return (
    <div
      className={`bg-white rounded-3xl p-8 border border-gray-100 hover:shadow-xl hover:shadow-gray-100/50 transition-all duration-300 group ${className}`}
    >
      <div className="flex items-start justify-between mb-6">
        <div className={`p-4 rounded-2xl ${colorVariants[color].iconBg} shadow-lg`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        {change && (
          <div className="flex items-center gap-1 text-green-600 text-sm font-semibold">
            <TrendingUp className="w-4 h-4" />
            {change}
          </div>
        )}
      </div>
      <div>
        <p className="text-gray-600 text-sm font-medium mb-2">{title}</p>
        <p className="text-3xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  );
};

export default StatCard;
