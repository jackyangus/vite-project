import React from "react";
import { LucideProps } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";

export interface ButtonProps {
  children?: React.ReactNode;
  icon?: React.ComponentType<LucideProps>;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  variant?: "primary" | "secondary" | "outline" | "danger" | "gradient";
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  icon: Icon,
  size = "md",
  variant = "primary",
  disabled = false,
  onClick,
  className = "",
}) => {
  const { theme } = useTheme();
  const buttonStyles = theme.components.button;

  // Size configurations
  const sizeClasses = {
    xs: "px-3 py-1.5 text-xs h-7",
    sm: "px-4 py-2 text-sm h-9",
    md: "px-6 py-3 text-base h-12",
    lg: "px-8 py-4 text-lg h-14",
    xl: "px-10 py-5 text-xl h-16",
  };

  // Icon sizes for each button size
  const iconSizes = {
    xs: 12,
    sm: 14,
    md: 18,
    lg: 22,
    xl: 26,
  };

  // Gap between icon and text
  const gapClasses = {
    xs: "gap-1.5",
    sm: "gap-2",
    md: "gap-3",
    lg: "gap-3.5",
    xl: "gap-4",
  };

  // Get variant styles
  const getVariantStyles = () => {
    if (variant === "gradient") {
      return "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white border-0 shadow-lg hover:shadow-xl";
    }
    return buttonStyles.variants[variant];
  };

  const variantStyles = getVariantStyles();

  // Disabled styles from theme
  const disabledClasses = disabled ? buttonStyles.disabled : "cursor-pointer";

  // Base classes - use more rounded corners for gradient variant
  const baseClasses =
    variant === "gradient"
      ? "inline-flex items-center justify-center font-medium rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2"
      : `inline-flex items-center justify-center font-medium rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 border ${buttonStyles.base}`;

  const buttonClasses = `
    ${baseClasses}
    ${sizeClasses[size]}
    ${variantStyles}
    ${gapClasses[size]}
    ${disabledClasses}
    ${className}
  `
    .trim()
    .replace(/\s+/g, " ");

  return (
    <button
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
      tabIndex={0}
      aria-label={typeof children === "string" ? children : "Button"}
      role="button"
    >
      {Icon && <Icon size={iconSizes[size]} className="flex-shrink-0" />}
      {children && <span className="whitespace-nowrap font-medium">{children}</span>}
    </button>
  );
};

export default Button;
