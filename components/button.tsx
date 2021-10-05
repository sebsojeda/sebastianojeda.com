import { css } from "@emotion/react";
import { ReactNode } from "react";

interface ButtonProps {
  prefix?: ReactNode;
  suffix?: ReactNode;
  onClick?: any;
  children: ReactNode;
}

const Styles = {
  button: css`
    padding: 0;
    position: relative;
    background-color: var(--color-background);
    color: var(--color-foreground);
    border: 1px solid var(--color-accent-2);
    display: flex;
    align-items: center;
    border-radius: 5px;
    font-size: 0.75rem;
    :hover {
      span {
        color: var(--color-foreground);
      }
      cursor: pointer;
      border: 1px solid var(--color-foreground);
    }
  `,
  prefix: css`
    color: var(--color-accent-5);
    position: absolute;
    left: 0.5rem;
  `,
  suffix: css`
    color: var(--color-accent-5);
    position: absolute;
    right: 0.5rem;
  `,
};

export default function Button(props: ButtonProps) {
  return (
    <button onClick={props.onClick} css={Styles.button}>
      {props.prefix && <span css={Styles.prefix}>{props.prefix}</span>}
      {props.children}
      {props.suffix && <span css={Styles.suffix}>{props.suffix}</span>}
    </button>
  );
}
