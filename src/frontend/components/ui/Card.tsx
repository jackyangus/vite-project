import React from "react";
import { useTheme } from "../../contexts/ThemeContext"; // Path to ThemeContext

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
  const { theme } = useTheme();
  const cardStyles = theme.components.card;

  const interactiveClasses = interactive ? cardStyles.interactiveHover : "";

  return (
    <div
      className={`rounded-2xl overflow-hidden transition-all duration-300 ${cardStyles.wrapper} ${interactiveClasses}`}
      {...props}
    >
      {title && (
        <div className={`px-6 py-4 ${cardStyles.titleSection}`}>
          <h3 className={`text-lg font-semibold ${cardStyles.titleText}`}>{title}</h3>
        </div>
      )}
      <div className="p-6">{children}</div>
    </div>
  );
};

export default Card;
