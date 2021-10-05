import { css } from "@emotion/react";
import { useContext } from "react";
import Button from "./button";
import ChevronUpDown from "./icons/chevron-up-down";
import Display from "./icons/display";
import Moon from "./icons/moon";
import Sun from "./icons/sun";
import { ThemeContext } from "./theme-provider";

const Styles = {
  select: css`
    background-color: transparent;
    color: var(--color-foreground);
    border: none;
    outline: none;
    -moz-appearance: none; /* Firefox */
    -webkit-appearance: none; /* Safari and Chrome */
    appearance: none;
    width: 100%;
    padding: 0.35rem 2rem;
    z-index: 1;
    :hover {
      cursor: pointer;
    }
  `,
};

export default function ThemeToggle() {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <Button
      prefix={
        <>
          {theme == "system" && <Display />}
          {theme == "light" && <Sun />}
          {theme == "dark" && <Moon />}
        </>
      }
      suffix={<ChevronUpDown />}
    >
      <select
        css={Styles.select}
        onChange={(e) => setTheme(e.target.value)}
        value={theme}
      >
        <option value="system">System</option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </Button>
  );
}
