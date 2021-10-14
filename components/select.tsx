import { css } from "@emotion/react";
import { ChangeEventHandler, ReactNode } from "react";

type SelectProps = {
  value: string;
  children: ReactNode;
  prefix?: ReactNode;
  suffix?: ReactNode;
  onChange?: ChangeEventHandler<HTMLSelectElement>;
};

const Styles = {
  container: css`
    width: 6.5rem;
    box-sizing: border-box;
    padding: 0.35rem;
    position: relative;
    background-color: var(--color-background);
    color: var(--color-foreground);
    border: 1px solid var(--color-accent-2);
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 5px;
    font-size: 0.75rem;
    :hover,
    :focus-within {
      span {
        color: var(--color-foreground);
      }
      border: 1px solid var(--color-foreground);
    }
  `,
  prefix: css`
    color: var(--color-accent-5);
  `,
  suffix: css`
    color: var(--color-accent-5);
  `,
  select: css`
    position: absolute;
    padding: 0 1.85rem;
    left: 0;
    top: 0;
    background-color: transparent;
    color: var(--color-foreground);
    border: none;
    outline: none;
    -moz-appearance: none; /* Firefox */
    -webkit-appearance: none; /* Safari and Chrome */
    appearance: none;
    width: 100%;
    height: 100%;
    :hover {
      cursor: pointer;
    }
  `,
};

export default function Select(props: SelectProps) {
  return (
    <div css={Styles.container}>
      {props.prefix && <span css={Styles.prefix}>{props.prefix}</span>}
      <select value={props.value} onChange={props.onChange} css={Styles.select}>
        {props.children}
      </select>
      {props.suffix && <span css={Styles.suffix}>{props.suffix}</span>}
    </div>
  );
}
