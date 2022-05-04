import ChevronUpDown from "./icons/chevron-up-down";
import Display from "./icons/display";
import Moon from "./icons/moon";
import Sun from "./icons/sun";
import Select from "./select";
import { useTheme } from "./theme-provider";

export default function ThemeToggle() {
  const { colorMode, setColorMode } = useTheme();

  if (!colorMode) {
    return null;
  }

  return (
    <Select
      prefix={
        <>
          {colorMode === "system" && <Display size={14} />}
          {colorMode === "light" && <Sun size={14} />}
          {colorMode === "dark" && <Moon size={14} />}
        </>
      }
      suffix={<ChevronUpDown size={14} />}
      value={colorMode}
      onChange={(e) => setColorMode(e.target.value)}
    >
      <option value="system">System</option>
      <option value="light">Light</option>
      <option value="dark">Dark</option>
    </Select>
  );
}
