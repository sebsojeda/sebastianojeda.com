import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";

type ThemeProviderProps = {
  children: ReactNode;
};

const defaultContext: {
  theme: string;
  setTheme: Dispatch<SetStateAction<string>>;
} = { theme: "system", setTheme: () => {} };

export const ThemeContext = createContext(defaultContext);

export default function ThemeProvider(props: ThemeProviderProps) {
  const [systemPreference, setSystemPreference] = useState("light");
  const [theme, setTheme] = useState("system");

  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
    if (prefersDark.matches) {
      setSystemPreference("dark");
    } else {
      setSystemPreference("light");
    }

    prefersDark.addEventListener("change", (e) => {
      if (e.matches) {
        setSystemPreference("dark");
      } else {
        setSystemPreference("light");
      }
    });

    return () => prefersDark.removeEventListener("change", () => {});
  }, []);

  useEffect(() => {
    if (
      (theme == "system" && systemPreference == "light") ||
      theme == "light"
    ) {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
    } else {
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add("dark");
    }
    localStorage.setItem("color-mode", theme);
  }, [theme, systemPreference]);

  useLayoutEffect(() => {
    const persistedPreference = localStorage.getItem("color-mode");
    if (persistedPreference) {
      setTheme(persistedPreference);
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
}
