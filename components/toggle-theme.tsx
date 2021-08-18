import React from "react";

export default function ToggleTheme() {
  const [isDark, setIsDark] = React.useState(false);

  React.useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("color-mode", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("color-mode", "light");
    }
  }, [isDark]);

  React.useLayoutEffect(() => {
    let prefersDark = false;

    const defaultPreference = window.matchMedia("(prefers-color-scheme: dark)");
    const persistedPreference = window.localStorage.getItem("color-mode");

    if (persistedPreference) {
      prefersDark = persistedPreference === "dark";
    } else {
      prefersDark = defaultPreference.matches;
    }

    setIsDark(prefersDark);
  }, []);

  return (
    <button onClick={() => setIsDark(!isDark)}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>
      </svg>
    </button>
  );
}
