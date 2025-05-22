import React from "react";
import { LucideProps } from "lucide-react";

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
  return (
    <div className="space-y-1">
      {label && <label className="block text-sm font-medium text-gray-700">{label}</label>}
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="h-5 w-5 text-gray-400" />
          </div>
        )}
        <input
          className={`block w-full rounded-xl border-0 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 transition-all duration-200 ${
            Icon ? "pl-10" : ""
          } ${error ? "ring-red-500 focus:ring-red-500" : ""}`}
          {...props}
        />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default TextInput;
