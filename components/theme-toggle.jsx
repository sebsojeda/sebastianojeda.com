"use client";

import { useEffect, useState } from "react";
import ChevronUpDown from "./icons/chevron-up-down";
import Display from "./icons/display";
import Moon from "./icons/moon";
import Sun from "./icons/sun";
import Select from "./Select";

export default function ThemeToggle() {
  const [theme, setTheme] = useState("system");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTheme(localStorage.getItem("theme") ?? "system");
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      if (
        theme === "dark" ||
        (theme === "system" &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
      ) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }

      theme === "system"
        ? localStorage.removeItem("theme")
        : localStorage.setItem("theme", theme);
    }
  }, [theme, mounted]);

  return (
    <Select
      prefix={
        <>
          {theme === "system" && <Display size={14} />}
          {theme === "light" && <Sun size={14} />}
          {theme === "dark" && <Moon size={14} />}
        </>
      }
      suffix={<ChevronUpDown size={14} />}
      value={theme}
      onChange={(e) => setTheme(e.target.value)}
    >
      <option value="system">System</option>
      <option value="light">Light</option>
      <option value="dark">Dark</option>
    </Select>
  );
}
