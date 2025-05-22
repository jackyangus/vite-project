import React from "react";
import { useTheme } from "../../contexts/ThemeContext"; // Path to ThemeContext

interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "primary" | "success" | "warning" | "error";
}

const Tag: React.FC<TagProps> = ({ variant = "default", children, className, ...props }) => {
  const { theme } = useTheme();
  const tagStyles = theme.components.tag;

  const baseClasses = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";

  // variantClasses will now come from theme
  const variantClasses = tagStyles.variants[variant];

  return (
    <span className={`${baseClasses} ${variantClasses} ${tagStyles.base} ${className || ""}`} {...props}>
      {children}
    </span>
  );
};

export default Tag;
