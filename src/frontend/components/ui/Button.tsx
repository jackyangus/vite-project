import React from "react";
import { LucideProps } from "lucide-react"; // Assuming LucideProps is the correct type for icons

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
  const baseClasses =
    "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white";

  const variants = {
    primary:
      "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 shadow-sm hover:shadow-md active:scale-[0.98]",
    secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-400 active:scale-[0.98]",
    outline:
      "bg-transparent text-blue-600 border border-gray-300 hover:bg-gray-50 focus:ring-blue-500 active:scale-[0.98]",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 shadow-sm hover:shadow-md active:scale-[0.98]",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm gap-1.5",
    md: "px-4 py-2.5 text-sm gap-2",
    lg: "px-6 py-3 text-base gap-2.5",
  };

  const disabledClasses = disabled ? "opacity-40 cursor-not-allowed pointer-events-none" : "";

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${disabledClasses}`}
      disabled={disabled}
      {...props}
    >
      {Icon && <Icon size={size === "sm" ? 16 : 18} />}
      {children}
    </button>
  );
};

export default Button;
