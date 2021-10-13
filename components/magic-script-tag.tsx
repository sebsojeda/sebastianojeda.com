import { theme } from "../lib/theme";

function setInitialColorMode() {
  const theme: any = "🌈";
  const root = document.documentElement;
  const storedPreference = window.localStorage.getItem("color-mode");
  const systemPreference =
    window.matchMedia("(prefers-color-scheme: dark)").matches && "dark";
  const initialColorMode = storedPreference ?? "system";
  const initialTheme: any = (() => {
    if (storedPreference && storedPreference !== "system") {
      return storedPreference;
    } else if (systemPreference) {
      return systemPreference;
    } else {
      return "light";
    }
  })();
  Object.entries<any>(theme.colors[initialTheme]).forEach(
    ([colorName, colorValue]) => {
      const cssVarName = `--color-${colorName}`;
      root.style.setProperty(cssVarName, colorValue);
    }
  );
  root.style.setProperty("--initial-color-mode", initialColorMode);
}

export default function MagicScriptTag() {
  const themeScript = String(setInitialColorMode).replace(
    '"🌈"',
    JSON.stringify(theme)
  );

  return <script dangerouslySetInnerHTML={{ __html: `(${themeScript})()` }} />;
}
