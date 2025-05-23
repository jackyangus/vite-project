import React from "react";
import { useTheme } from "../../contexts/ThemeContext";

interface ProgressProps {
  value: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "success" | "warning" | "danger";
  showLabel?: boolean;
  className?: string;
  label?: string;
}

const Progress: React.FC<ProgressProps> = ({
  value,
  max = 100,
  size = "md",
  variant = "default",
  showLabel = false,
  className = "",
  label,
  ...props
}) => {
  const { theme } = useTheme();

  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  const sizeVariants = {
    sm: "h-1",
    md: "h-2",
    lg: "h-3",
  };

  const colorVariants = {
    default: "bg-blue-500",
    success: "bg-green-500",
    warning: "bg-yellow-500",
    danger: "bg-red-500",
  };

  const backgroundColors = {
    default: "bg-gray-200",
    success: "bg-green-100",
    warning: "bg-yellow-100",
    danger: "bg-red-100",
  };

  return (
    <div className={className}>
      {(showLabel || label) && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">{label || `进度`}</span>
          <span className="text-sm font-bold text-gray-900">{Math.round(percentage)}%</span>
        </div>
      )}
      <div className={`w-full ${backgroundColors[variant]} rounded-full ${sizeVariants[size]}`}>
        <div
          className={`${sizeVariants[size]} ${colorVariants[variant]} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
          aria-label={label || `进度 ${Math.round(percentage)}%`}
          {...props}
        />
      </div>
    </div>
  );
};

export default Progress;
