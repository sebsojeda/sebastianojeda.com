import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { colors } from "../lib/colors";

type ThemeProviderProps = {
  children: ReactNode;
};

const defaultContext: {
  theme: string;
  setTheme: Dispatch<SetStateAction<string>>;
} = { theme: "system", setTheme: () => {} };

export const ThemeContext = createContext(defaultContext);

export default function ThemeProvider(props: ThemeProviderProps) {
  const [systemPreference, setSystemPreference] = useState("");
  const [theme, setTheme] = useState("");

  useEffect(() => {
    const root = window.document.documentElement;
    const initialColorValue = root.style.getPropertyValue(
      "--initial-color-mode"
    );
    setTheme(initialColorValue);
  }, []);

  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

    if (prefersDark.matches) {
      setSystemPreference("dark");
    } else {
      setSystemPreference("");
    }

    prefersDark.addEventListener("change", (e) => {
      if (e.matches) {
        setSystemPreference("dark");
      } else {
        setSystemPreference("");
      }
    });

    return () => prefersDark.removeEventListener("change", () => {});
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    if ((theme == "system" && !systemPreference) || theme == "light") {
      Object.entries(colors["light"]).forEach(([colorName, colorValue]) =>
        root.style.setProperty(`--color-${colorName}`, colorValue)
      );
    } else {
      Object.entries(colors["dark"]).forEach(([colorName, colorValue]) =>
        root.style.setProperty(`--color-${colorName}`, colorValue)
      );
    }
    window.localStorage.setItem("color-mode", theme);
  }, [theme, systemPreference]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
}
