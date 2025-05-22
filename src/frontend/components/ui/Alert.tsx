import React from "react";
import { CheckCircle2, XOctagon, AlertTriangle, Info, X, LucideProps } from "lucide-react";

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
  const variants = {
    success: {
      bg: "bg-green-50",
      text: "text-green-800",
      icon: CheckCircle2 as React.ElementType<LucideProps>,
      iconColor: "text-green-400",
    },
    error: {
      bg: "bg-red-50",
      text: "text-red-800",
      icon: XOctagon as React.ElementType<LucideProps>,
      iconColor: "text-red-400",
    },
    warning: {
      bg: "bg-yellow-50",
      text: "text-yellow-800",
      icon: AlertTriangle as React.ElementType<LucideProps>,
      iconColor: "text-yellow-400",
    },
    info: {
      bg: "bg-blue-50",
      text: "text-blue-800",
      icon: Info as React.ElementType<LucideProps>,
      iconColor: "text-blue-400",
    },
  };

  const { bg, text, icon: Icon, iconColor } = variants[type];

  return (
    <div className={`${bg} rounded-xl p-4 border border-opacity-20`}>
      <div className="flex">
        <div className="flex-shrink-0">
          <Icon className={`h-5 w-5 ${iconColor}`} />
        </div>
        <div className="ml-3 flex-1">
          <h3 className={`text-sm font-medium ${text}`}>{title}</h3>
          <div className={`mt-1 text-sm ${text} opacity-80`}>{children}</div>
        </div>
        {onDismiss && (
          <div className="ml-auto pl-3">
            <button
              onClick={onDismiss}
              className={`inline-flex rounded-md p-1.5 ${text} hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-50 focus:ring-green-600`}
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
