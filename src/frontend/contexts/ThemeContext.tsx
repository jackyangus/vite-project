import React, { createContext, useContext, useState, useMemo, useEffect } from "react";

export interface AlertThemeStyles {
  bg: string;
  text: string;
  iconColor: string;
  // Add other style properties if needed, e.g., borderColor for the alert box itself
}

// New component style interfaces
export interface ButtonThemeStyles {
  base: string; // For common classes like focus rings, transitions not tied to variant
  variants: {
    primary: string;
    secondary: string;
    outline: string;
    danger: string;
  };
  disabled: string;
}

export interface CardThemeStyles {
  wrapper: string;
  titleSection: string;
  titleText: string;
  interactiveHover: string;
}

export interface DropdownThemeStyles {
  label: string;
  select: string;
  selectFocus: string; // Combined with select for focus state
  icon: string;
}

export interface ModalThemeStyles {
  backdrop: string;
  dialog: string;
  header: string;
  titleText: string;
  closeButton: string;
  closeButtonHover: string;
}

export interface TagThemeStyles {
  base: string; // For common padding/font
  variants: {
    default: string;
    primary: string;
    success: string;
    warning: string;
    error: string;
  };
}

export interface TextInputThemeStyles {
  label: string;
  input: string; // Includes base, placeholder, ring
  inputFocus: string; // Added to input for focus state
  icon: string;
  errorRing: string; // For error state on input
  errorText: string;
}

export interface ComponentSpecificThemes {
  alert: {
    success: AlertThemeStyles;
    error: AlertThemeStyles;
    warning: AlertThemeStyles;
    info: AlertThemeStyles;
  };
  button: ButtonThemeStyles;
  card: CardThemeStyles;
  dropdown: DropdownThemeStyles;
  modal: ModalThemeStyles;
  tag: TagThemeStyles;
  textInput: TextInputThemeStyles;
}

export interface Theme {
  name: "light" | "dark";
  colors: {
    primary: string;
    secondary: string;
    background: string;
    surface: string;
    textPrimary: string;
    textSecondary: string;

    // Base names for status colors, actual styling might be in components section
    statusSuccess: string;
    statusError: string;
    statusWarning: string;
    statusInfo: string;
  };
  components: ComponentSpecificThemes;
}

// Define specific themes
export const lightTheme: Theme = {
  name: "light",
  colors: {
    primary: "blue-600", // Example Tailwind color
    secondary: "gray-500",
    background: "bg-white",
    surface: "bg-gray-50",
    textPrimary: "text-gray-900",
    textSecondary: "text-gray-700",
    statusSuccess: "green",
    statusError: "red",
    statusWarning: "yellow",
    statusInfo: "blue",
  },
  components: {
    alert: {
      success: { bg: "bg-green-50", text: "text-green-800", iconColor: "text-green-400" },
      error: { bg: "bg-red-50", text: "text-red-800", iconColor: "text-red-400" },
      warning: { bg: "bg-yellow-50", text: "text-yellow-800", iconColor: "text-yellow-400" },
      info: { bg: "bg-blue-50", text: "text-blue-800", iconColor: "text-blue-400" },
    },
    button: {
      base: "focus:ring-offset-white", // Other base classes remain in component for structure
      variants: {
        primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
        secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-400",
        outline: "bg-transparent text-blue-600 border border-gray-300 hover:bg-gray-50 focus:ring-blue-500",
        danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
      },
      disabled: "opacity-40 cursor-not-allowed pointer-events-none",
    },
    card: {
      wrapper: "bg-white shadow-sm border border-gray-100",
      titleSection: "border-b border-gray-100 bg-gray-50/50",
      titleText: "text-gray-900",
      interactiveHover: "hover:shadow-xl hover:-translate-y-1 cursor-pointer",
    },
    dropdown: {
      label: "text-gray-700",
      select: "bg-white text-gray-900 ring-gray-300 placeholder:text-gray-400",
      selectFocus: "focus:ring-blue-600",
      icon: "text-gray-400",
    },
    modal: {
      backdrop: "bg-black/20 backdrop-blur-sm",
      dialog: "bg-white shadow-2xl",
      header: "border-b border-gray-100",
      titleText: "text-gray-900",
      closeButton: "text-gray-400",
      closeButtonHover: "hover:text-gray-600 hover:bg-gray-100",
    },
    tag: {
      base: "", // Base structural classes remain in component
      variants: {
        default: "bg-gray-100 text-gray-800",
        primary: "bg-blue-100 text-blue-800",
        success: "bg-green-100 text-green-800",
        warning: "bg-yellow-100 text-yellow-800",
        error: "bg-red-100 text-red-800",
      },
    },
    textInput: {
      label: "text-gray-700",
      input: "text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400",
      inputFocus: "focus:ring-2 focus:ring-inset focus:ring-blue-600",
      icon: "text-gray-400",
      errorRing: "ring-red-500 focus:ring-red-500", // Applied to input
      errorText: "text-red-600",
    },
  },
};

export const darkTheme: Theme = {
  name: "dark",
  colors: {
    primary: "blue-400",
    secondary: "gray-400",
    background: "bg-gray-900",
    surface: "bg-gray-800",
    textPrimary: "text-gray-100",
    textSecondary: "text-gray-400",
    statusSuccess: "green",
    statusError: "red",
    statusWarning: "yellow",
    statusInfo: "blue",
  },
  components: {
    alert: {
      success: { bg: "bg-green-700/30", text: "text-green-200", iconColor: "text-green-300" },
      error: { bg: "bg-red-700/30", text: "text-red-200", iconColor: "text-red-300" },
      warning: { bg: "bg-yellow-700/30", text: "text-yellow-200", iconColor: "text-yellow-300" },
      info: { bg: "bg-blue-700/30", text: "text-blue-200", iconColor: "text-blue-300" },
    },
    button: {
      base: "focus:ring-offset-gray-800", // Dark mode offset
      variants: {
        primary: "bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-400",
        secondary: "bg-gray-700 text-gray-100 hover:bg-gray-600 focus:ring-gray-500",
        outline: "bg-transparent text-blue-400 border border-gray-600 hover:bg-gray-700/50 focus:ring-blue-400",
        danger: "bg-red-500 text-white hover:bg-red-600 focus:ring-red-400",
      },
      disabled: "opacity-50 cursor-not-allowed pointer-events-none", // Slightly different opacity for dark
    },
    card: {
      wrapper: "bg-gray-800 shadow-md border border-gray-700",
      titleSection: "border-b border-gray-700 bg-gray-850/50", // Assuming a slightly different bg
      titleText: "text-gray-100",
      interactiveHover: "hover:shadow-lg hover:-translate-y-1 cursor-pointer", // Shadow might need adjustment
    },
    dropdown: {
      label: "text-gray-400",
      select: "bg-gray-700 text-gray-100 ring-gray-600 placeholder:text-gray-400",
      selectFocus: "focus:ring-blue-500",
      icon: "text-gray-400",
    },
    modal: {
      backdrop: "bg-black/50 backdrop-blur-sm", // Darker backdrop
      dialog: "bg-gray-800 shadow-2xl",
      header: "border-b border-gray-700",
      titleText: "text-gray-100",
      closeButton: "text-gray-400",
      closeButtonHover: "hover:text-gray-200 hover:bg-gray-700",
    },
    tag: {
      base: "",
      variants: {
        default: "bg-gray-700 text-gray-200",
        primary: "bg-blue-500/30 text-blue-300",
        success: "bg-green-500/30 text-green-300",
        warning: "bg-yellow-500/30 text-yellow-300",
        error: "bg-red-500/30 text-red-300",
      },
    },
    textInput: {
      label: "text-gray-400",
      input: "bg-gray-700 text-gray-100 ring-1 ring-inset ring-gray-600 placeholder:text-gray-500",
      inputFocus: "focus:ring-2 focus:ring-inset focus:ring-blue-500",
      icon: "text-gray-400",
      errorRing: "ring-red-500 focus:ring-red-500", // Error ring might be same
      errorText: "text-red-400", // Lighter red for dark bg
    },
  },
};

interface ThemeContextProps {
  theme: Theme;
  setTheme: (themeName: "light" | "dark") => void;
  currentThemeName: "light" | "dark";
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode; initialTheme?: "light" | "dark" }> = ({
  children,
  initialTheme = "dark",
}) => {
  const [currentThemeName, setCurrentThemeName] = useState<"light" | "dark">(initialTheme);

  // Function to change theme
  const setTheme = (themeName: "light" | "dark") => {
    setCurrentThemeName(themeName);
    // Persist theme preference if desired (e.g., localStorage)
    // localStorage.setItem('theme', themeName);
  };

  // useEffect(() => {
  // Optional: Load theme from localStorage on initial mount
  // const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
  // if (savedTheme) {
  //   setCurrentThemeName(savedTheme);
  // }
  // }, []);

  const theme = useMemo(() => (currentThemeName === "light" ? lightTheme : darkTheme), [currentThemeName]);

  useEffect(() => {
    const root = window.document.documentElement; // Get the <html> element

    root.classList.remove("light", "dark"); // Remove any existing theme class
    root.classList.add(currentThemeName); // Add the current theme name as a class ('light' or 'dark')

    // This helps browsers adapt their built-in UI elements (like scrollbars) to the theme
    root.style.colorScheme = currentThemeName;
  }, [currentThemeName]);

  return <ThemeContext.Provider value={{ theme, setTheme, currentThemeName }}>{children}</ThemeContext.Provider>;
};

export const useTheme = (): ThemeContextProps => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
