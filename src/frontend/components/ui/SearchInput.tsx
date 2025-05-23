import React from "react";
import { Search } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";

interface SearchInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  size?: "sm" | "md" | "lg";
  className?: string;
  ariaLabel?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  placeholder = "搜索...",
  value,
  onChange,
  onKeyDown,
  size = "md",
  className = "",
  ariaLabel = "搜索输入框",
  ...props
}) => {
  const { theme } = useTheme();

  const sizeVariants = {
    sm: {
      container: "w-64",
      input: "pl-9 pr-3 py-2 text-sm",
      icon: "w-4 h-4 left-3",
    },
    md: {
      container: "w-96",
      input: "pl-12 pr-6 py-3 text-sm",
      icon: "w-5 h-5 left-4",
    },
    lg: {
      container: "w-full",
      input: "pl-14 pr-8 py-4 text-base",
      icon: "w-6 h-6 left-4",
    },
  };

  const variant = sizeVariants[size];

  return (
    <div className={`relative ${variant.container} ${className}`}>
      <Search className={`${variant.icon} absolute top-1/2 transform -translate-y-1/2 text-gray-400`} />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        aria-label={ariaLabel}
        className={`${variant.input} w-full bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200 font-medium placeholder-gray-500`}
        {...props}
      />
    </div>
  );
};

export default SearchInput;
