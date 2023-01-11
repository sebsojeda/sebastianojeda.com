"use client";

import { useEffect, useState } from "react";
import ChevronUpDownIcon from "./icons/ChevronUpDownIcon";
import DisplayIcon from "./icons/DisplayIcon";
import MoonIcon from "./icons/MoonIcon";
import SunIcon from "./icons/SunIcon";
import Select from "./Select";

/**
 * Allows the user to set the application theme.
 */
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
          {theme === "system" && <DisplayIcon size={14} />}
          {theme === "light" && <SunIcon size={14} />}
          {theme === "dark" && <MoonIcon size={14} />}
        </>
      }
      suffix={<ChevronUpDownIcon size={14} />}
      value={theme}
      onChange={(e) => setTheme(e.target.value)}
    >
      <option value="system">System</option>
      <option value="light">Light</option>
      <option value="dark">Dark</option>
    </Select>
  );
}
