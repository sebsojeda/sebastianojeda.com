import { css } from "@emotion/react";
import { ReactNode } from "react";
import Triangle from "./icons/triangle";

type PopupProps = {
  label: string;
  children: ReactNode;
};

const Styles = {
  popup: css`
    position: relative;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    :hover,
    .popup:hover,
    .triangle:hover {
      .popup,
      .triangle {
        visibility: visible;
      }
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
    visibility: hidden;
  `,
  label: css`
    margin-left: 0;
    :hover {
      cursor: pointer;
    }
  `,
  popupItems: css`
    display: grid;
    gap: 1rem;
    grid-template-columns: auto;
    visibility: hidden;
    min-width: max-content;
    background-color: var(--color-background);
    border: 1px solid var(--color-accent-2);
    border-radius: 5px;
    padding: 1rem;
    position: absolute;
    top: 35px;
    right: 0;
    margin-left: 0;
    * {
      margin-left: 0;
      color: var(--color-foreground);
      text-decoration: none;
    }
  `,
};

export default function Popup(props: PopupProps) {
  return (
    <>
      <div css={Styles.popup}>
        <div className="triangle" css={Styles.triangle}>
          <Triangle />
        </div>
        <div css={Styles.label}>{props.label}</div>
        <div className="popup" css={Styles.popupItems}>
          {props.children}
        </div>
      </div>
    </>
  );
}
