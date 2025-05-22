import React from "react";
import { LucideProps } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext"; // Path to ThemeContext

// TextInput Component
const TextInput = ({
  label,
  error,
  icon: Icon,
  ...props
}: {
  label?: string;
  error?: string;
  icon?: React.ElementType<LucideProps>;
  [x: string]: any;
}) => {
  const { theme } = useTheme();
  const styles = theme.components.textInput;

  // Base structural classes that don't change with theme (like padding, w-full)
  const structuralInputClasses = "block w-full rounded-xl border-0 py-3 px-4 shadow-sm transition-all duration-200";
  const iconPaddingClass = Icon ? "pl-10" : "";

  // Determine error state classes
  const errorRingClass = error ? styles.errorRing : "";

  return (
    <div className="space-y-1">
      {label && <label className={`block text-sm font-medium ${styles.label}`}>{label}</label>}
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className={`h-5 w-5 ${styles.icon}`} />
          </div>
        )}
        <input
          className={`${structuralInputClasses} ${styles.input} ${styles.inputFocus} ${iconPaddingClass} ${errorRingClass}`}
          {...props}
        />
      </div>
      {error && <p className={`text-sm ${styles.errorText}`}>{error}</p>}
    </div>
  );
};

export default TextInput;
