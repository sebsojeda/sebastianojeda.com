import { css } from "@emotion/react";
import { ReactNode, useEffect, useState } from "react";
import Triangle from "./icons/triangle";

type DropdownProps = {
  label: string;
  children: ReactNode;
};

const Styles = {
  dropdown: css`
    position: relative;
    user-select: none;
    }
  `,
  triangle: css`
    width: 100%;
    z-index: 1;
    position: absolute;
    top: 0;
    right: 0;
    margin-top: 1rem;
    padding-top: 5px;
  `,
  label: css`
    margin-left: 0;
    color: var(--color-accent-5);
    :hover {
      cursor: pointer;
      color: var(--color-foreground);
    }
  `,
  dropdownItems: css`
    display: grid;
    gap: 1rem;
    grid-template-columns: auto;
    min-width: max-content;
    background-color: var(--color-background);
    border: 1px solid var(--color-accent-2);
    border-radius: 5px;
    padding: 1rem;
    position: absolute;
    top: 35px;
    right: 0;
  `,
};

export default function Dropdown(props: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      if (isOpen) {
        window.addEventListener("click", () => setIsOpen(false));
      } else {
        window.removeEventListener("click", () => setIsOpen(false));
      }
    }, 0);
    return window.removeEventListener("click", () => setIsOpen(false));
  }, [isOpen]);
  return (
    <div css={Styles.dropdown}>
      <div
        css={Styles.label}
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
      >
        {props.label}
      </div>
      {isOpen && (
        <div css={Styles.triangle}>
          <Triangle />
        </div>
      )}
      {isOpen && (
        <div role="list" css={Styles.dropdownItems}>
          {props.children}
        </div>
      )}
    </div>
  );
}
