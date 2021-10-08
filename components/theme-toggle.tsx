import { useContext } from "react";
import ChevronUpDown from "./icons/chevron-up-down";
import Display from "./icons/display";
import Moon from "./icons/moon";
import Sun from "./icons/sun";
import Select from "./select";
import { ThemeContext } from "./theme-provider";

export default function ThemeToggle() {
  const { theme, setTheme } = useContext(ThemeContext);

  if (!theme) {
    return null;
  }

  return (
    <Select
      prefix={
        <>
          {theme == "system" && <Display />}
          {theme == "light" && <Sun />}
          {theme == "dark" && <Moon />}
        </>
      }
      suffix={<ChevronUpDown />}
      value={theme}
      onChange={(e) => setTheme(e.target.value)}
    >
      <option value="system">System</option>
      <option value="light">Light</option>
      <option value="dark">Dark</option>
    </Select>
  );
}
