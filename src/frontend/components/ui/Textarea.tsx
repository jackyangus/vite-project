import React from "react";
import { useTheme } from "../../contexts/ThemeContext";

interface TextareaProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  rows?: number;
  disabled?: boolean;
  error?: boolean;
  className?: string;
  label?: string;
  required?: boolean;
  maxLength?: number;
  showCharCount?: boolean;
}

const Textarea: React.FC<TextareaProps> = ({
  value,
  onChange,
  placeholder,
  rows = 4,
  disabled = false,
  error = false,
  className = "",
  label,
  required = false,
  maxLength,
  showCharCount = false,
  ...props
}) => {
  const { theme } = useTheme();
  const charCount = value?.length || 0;

  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        disabled={disabled}
        maxLength={maxLength}
        className={`w-full px-4 py-4 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200 text-sm font-medium resize-none ${
          error ? "focus:ring-red-500 bg-red-50" : ""
        } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
        {...props}
      />
      {(showCharCount || maxLength) && (
        <div className="flex justify-between items-center mt-2">
          <div></div>
          <span className={`text-xs ${charCount === maxLength ? "text-red-500" : "text-gray-500"}`}>
            {showCharCount && charCount}
            {maxLength && `/${maxLength}`}
          </span>
        </div>
      )}
    </div>
  );
};

export default Textarea;
