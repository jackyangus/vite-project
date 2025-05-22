import React from "react";
import { LucideProps } from "lucide-react"; // Assuming LucideProps is the correct type for icons
import { useTheme } from "../../contexts/ThemeContext"; // Path to ThemeContext

// Button Component
const Button = ({
  variant = "primary",
  size = "md",
  icon: Icon,
  children,
  disabled = false, // Made disabled optional with a default value
  ...props
}: {
  variant?: "primary" | "secondary" | "outline" | "danger";
  size?: "sm" | "md" | "lg";
  icon?: React.ElementType<LucideProps>;
  children: React.ReactNode;
  disabled?: boolean;
  [x: string]: any; // For other props
}) => {
  const { theme } = useTheme();
  const buttonStyles = theme.components.button;

  const baseClasses =
    "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 shadow-sm hover:shadow-md active:scale-[0.98]";

  const sizes = {
    sm: "px-3 py-1.5 text-sm gap-1.5",
    md: "px-4 py-2.5 text-sm gap-2",
    lg: "px-6 py-3 text-base gap-2.5",
  };

  const variantClasses = buttonStyles.variants[variant];
  const disabledClasses = disabled ? buttonStyles.disabled : "";

  return (
    <button
      className={`${baseClasses} ${variantClasses} ${sizes[size]} ${buttonStyles.base} ${disabledClasses}`}
      disabled={disabled}
      {...props}
    >
      {Icon && <Icon size={size === "sm" ? 16 : 18} />}
      {children}
    </button>
  );
};

export default Button;
