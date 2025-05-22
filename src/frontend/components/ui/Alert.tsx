import React from "react";
import { CheckCircle2, XOctagon, AlertTriangle, Info, X, LucideProps } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext"; // Adjusted path

// Alert Component
const Alert = ({
  type = "info",
  title,
  children,
  onDismiss,
}: {
  type?: "success" | "error" | "warning" | "info";
  title: string;
  children: React.ReactNode;
  onDismiss?: () => void;
}) => {
  const { theme } = useTheme();

  // Icons remain the same, but their colors will come from the theme
  const icons = {
    success: CheckCircle2 as React.ElementType<LucideProps>,
    error: XOctagon as React.ElementType<LucideProps>,
    warning: AlertTriangle as React.ElementType<LucideProps>,
    info: Info as React.ElementType<LucideProps>,
  };

  const Icon = icons[type];
  // Get component-specific styles from the theme
  const alertStyles = theme.components.alert[type];

  return (
    <div className={`${alertStyles.bg} rounded-xl p-4 border border-opacity-20`}>
      <div className="flex">
        <div className="flex-shrink-0">
          <Icon className={`h-5 w-5 ${alertStyles.iconColor}`} />
        </div>
        <div className="ml-3 flex-1">
          <h3 className={`text-sm font-medium ${alertStyles.text}`}>{title}</h3>
          <div className={`mt-1 text-sm ${alertStyles.text} opacity-80`}>{children}</div>
        </div>
        {onDismiss && (
          <div className="ml-auto pl-3">
            <button
              onClick={onDismiss}
              className={`inline-flex rounded-md p-1.5 ${alertStyles.text} hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-50 focus:ring-green-600`}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Alert;
