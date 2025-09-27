"use client";

import { useEffect, useState } from "react";

const useMedia = (query: string, onChange?: () => void) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => {
      setMatches(media.matches);
      onChange?.();
    };
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [query]);

  return matches;
};

export function ThemeToggle() {
  const [theme, setTheme] = useState<string>();
  const prefersDark = useMedia("(prefers-color-scheme: dark)");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setTheme(localStorage.getItem("theme") ?? "system");
    }
  }, []);

  useEffect(() => {
    if (theme === "dark" || (!theme && prefersDark)) {
      document.documentElement.classList.add("dark");
    }
  }, [theme, prefersDark]);

  const toggleTheme = () => {
    const options = prefersDark
      ? ["system", "light", "dark"]
      : ["system", "dark", "light"];
    const next = options[(options.indexOf(theme!) + 1) % options.length];

    if (next === "system") {
      localStorage.removeItem("theme");
      document.documentElement.classList.toggle("dark", prefersDark);
    } else {
      localStorage.setItem("theme", next);
      document.documentElement.classList.toggle("dark", next === "dark");
    }
    setTheme(next);
  };

  return (
    <>
      <button
        className={`${
          theme !== "system"
            ? "bg-zinc-100 dark:bg-zinc-800"
            : "hover:bg-zinc-100 dark:hover:bg-zinc-800"
        } p-2 rounded-sm peer`}
        type="button"
        aria-label="Toggle theme"
        onClick={toggleTheme}
      >
        {theme ? (
          theme === "light" ? (
            <svg
              fill="none"
              height="16"
              shapeRendering="geometricPrecision"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              width="16"
            >
              <circle cx="12" cy="12" r="5" />
              <path d="M12 1v2" />
              <path d="M12 21v2" />
              <path d="M4.22 4.22l1.42 1.42" />
              <path d="M18.36 18.36l1.42 1.42" />
              <path d="M1 12h2" />
              <path d="M21 12h2" />
              <path d="M4.22 19.78l1.42-1.42" />
              <path d="M18.36 5.64l1.42-1.42" />
            </svg>
          ) : theme === "dark" ? (
            <svg
              fill="none"
              height="16"
              shapeRendering="geometricPrecision"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              width="16"
            >
              <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
            </svg>
          ) : (
            <svg
              fill="none"
              height="16"
              shapeRendering="geometricPrecision"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              width="16"
            >
              <path d="M2 13.381h20M8.66 19.05V22m6.84-2.95V22m-8.955 0h10.932M4 19.05h16a2 2 0 002-2V4a2 2 0 00-2-2H4a2 2 0 00-2 2v13.05a2 2 0 002 2z" />
            </svg>
          )
        ) : null}
      </button>
      <span
        className={`absolute ${
          theme !== "system" ? "" : "invisible"
        } w-12 text-xs text-right capitalize md:inline -left-14 peer-hover:visible text-zinc-500`}
      >
        {theme}
      </span>
    </>
  );
}
