import { colors } from "../lib/colors";

function setInitialColorMode() {
  const theme = "🌈";
  const root = document.documentElement;
  const storedPreference = window.localStorage.getItem("color-mode");
  const systemPreference =
    window.matchMedia("(prefers-color-scheme: dark)").matches && "dark";
  const initialColorMode = storedPreference || "system";
  const initialTheme = (() => {
    if (storedPreference && storedPreference !== "system") {
      return storedPreference;
    } else if (systemPreference) {
      return systemPreference;
    } else {
      return "light";
    }
  })();
  Object.entries(theme[initialTheme]).forEach(([colorName, colorValue]) => {
    const cssVarName = `--color-${colorName}`;
    root.style.setProperty(cssVarName, colorValue);
  });
  root.style.setProperty("--initial-color-mode", initialColorMode);
}

export default function MagicScriptTag() {
  const themeScript = String(setInitialColorMode).replace(
    '"🌈"',
    JSON.stringify(colors)
  );

  return <script dangerouslySetInnerHTML={{ __html: `(${themeScript})()` }} />;
}
