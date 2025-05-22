import React from "react";
import { ChevronDown } from "lucide-react";

// Dropdown Component
const Dropdown = ({
  label,
  options = [],
  value,
  onChange,
  ...props
}: {
  label?: string;
  options?: { value: string; label: string }[];
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  [x: string]: any;
}) => {
  return (
    <div className="space-y-1">
      {label && <label className="block text-sm font-medium text-gray-700">{label}</label>}
      <div className="relative">
        <select
          className="block w-full rounded-xl border-0 py-3 px-4 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 transition-all duration-200 appearance-none bg-white"
          value={value}
          onChange={onChange}
          {...props}
        >
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3">
          <ChevronDown className="h-5 w-5 text-gray-400" />
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
