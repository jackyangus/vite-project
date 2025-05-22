import React from "react";

// Card Component
const Card = ({
  title,
  children,
  interactive = false,
  ...props
}: {
  title?: string;
  children: React.ReactNode;
  interactive?: boolean;
  [x: string]: any;
}) => {
  const interactiveClasses = interactive ? "hover:shadow-xl hover:-translate-y-1 cursor-pointer" : "";

  return (
    <div
      className={`bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 ${interactiveClasses}`}
      {...props}
    >
      {title && (
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        </div>
      )}
      <div className="p-6">{children}</div>
    </div>
  );
};

export default Card;
