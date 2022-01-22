import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { theme } from "../lib/theme";

type ThemeProviderProps = {
  children: ReactNode;
};

const defaultContext: {
  colorMode: string;
  setColorMode: Dispatch<SetStateAction<string>>;
  systemPreference: string;
} = { colorMode: "system", setColorMode: () => {}, systemPreference: "" };

export const ThemeContext = createContext(defaultContext);

export const useTheme = () => useContext(ThemeContext);

export default function ThemeProvider(props: ThemeProviderProps) {
  const [systemPreference, setSystemPreference] = useState("");
  const [colorMode, setColorMode] = useState("");

  useEffect(() => {
    const root = window.document.documentElement;
    const initialColorValue = root.style.getPropertyValue(
      "--initial-color-mode"
    );
    setColorMode(initialColorValue);
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
    if (
      (colorMode === "system" && !systemPreference) ||
      colorMode === "light"
    ) {
      Object.entries(theme.colors.light).forEach(([colorName, colorValue]) =>
        root.style.setProperty(`--color-${colorName}`, colorValue)
      );
    } else {
      Object.entries(theme.colors.dark).forEach(([colorName, colorValue]) =>
        root.style.setProperty(`--color-${colorName}`, colorValue)
      );
    }
    window.localStorage.setItem("color-mode", colorMode);
  }, [colorMode, systemPreference]);

  return (
    <ThemeContext.Provider
      value={{ colorMode, setColorMode, systemPreference }}
    >
      {props.children}
    </ThemeContext.Provider>
  );
}
