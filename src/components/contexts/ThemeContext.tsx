import { createContext } from "react";

interface ThemeContextValue {
  theme: string;
  toggleTheme: React.Dispatch<React.SetStateAction<string>>;
}

export const ThemeContext = createContext<ThemeContextValue | null>(null);