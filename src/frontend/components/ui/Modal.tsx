import React from "react";
import { X } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext"; // Path to ThemeContext

// Modal Component
const Modal = ({
  isOpen,
  onClose,
  title,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) => {
  const { theme } = useTheme();
  const modalStyles = theme.components.modal;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className={`absolute inset-0 transition-opacity duration-300 ${modalStyles.backdrop}`} onClick={onClose} />
      <div
        className={`relative rounded-3xl max-w-md w-full transform transition-all duration-300 ease-out ${modalStyles.dialog}`}
      >
        <div className={`flex items-center justify-between p-6 ${modalStyles.header}`}>
          <h2 className={`text-xl font-semibold ${modalStyles.titleText}`}>{title}</h2>
          <button
            onClick={onClose}
            className={`p-2 rounded-full transition-colors ${modalStyles.closeButton} ${modalStyles.closeButtonHover}`}
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
