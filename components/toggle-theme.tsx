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
        <circle cx="12" cy="12" r="5"></circle>
        <line x1="12" y1="1" x2="12" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="23"></line>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
        <line x1="1" y1="12" x2="3" y2="12"></line>
        <line x1="21" y1="12" x2="23" y2="12"></line>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
      </svg>
    </button>
  );
}
