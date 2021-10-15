import { css } from "@emotion/react";
import { ChangeEventHandler, useEffect, useRef } from "react";
import MagnifyingGlass from "./icons/magnifying-glass";

type SearchProps = {
  onChange: ChangeEventHandler<HTMLInputElement>;
  value: string;
};

const Styles = {
  container: css`
    display: flex;
    margin: 3.5rem 0;
  `,
  wrapper: css`
    display: flex;
    border: 1px solid var(--color-accent-2);
    border-radius: 5px;
    :focus-within {
      svg {
        color: var(--color-foreground);
      }
      border-color: var(--color-foreground);
    }
  `,
  input: css`
    background-color: transparent;
    border: none;
    color: var(--color-foreground);
    padding: 0.5rem;
    outline: none;
  `,
  slash: css`
    background-color: var(--color-accent-1);
    padding: 0.25rem 0.5rem;
    margin: 0.25rem 0.5rem 0.25rem 0.25rem;
    border-radius: 5px;
    color: var(--color-accent-2);
    border: 1px solid var(--color-accent-2);
  `,
  glass: css`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0.25rem 0.25rem 0.25rem 0.5rem;
    color: var(--color-accent-2);
  `,
};

export default function Search(props: SearchProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    document.addEventListener("keypress", (e) => {
      if (e.key === "/") {
        e.preventDefault();
        inputRef?.current?.focus();
      }
    });

    return () => document.removeEventListener("keypress", () => {});
  }, []);

  return (
    <div css={Styles.container}>
      <div css={Styles.wrapper}>
        <div css={Styles.glass}>
          <MagnifyingGlass />
        </div>
        <input
          type="text"
          placeholder="Search..."
          onChange={props.onChange}
          value={props.value}
          ref={inputRef}
          css={Styles.input}
        />
        <div css={Styles.slash}>&#47;</div>
      </div>
    </div>
  );
}
