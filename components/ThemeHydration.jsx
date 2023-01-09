"use client";

export default function ThemeHydration() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
        (function() {
          var theme = localStorage.getItem("theme");
          if (theme === "dark" || (theme === null && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
            document.documentElement.classList.add("dark");
          } else {
            document.documentElement.classList.remove("dark");
          }
        })();`,
      }}
    />
  );
}
