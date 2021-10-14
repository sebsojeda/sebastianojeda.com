import { css } from "@emotion/react";

const Styles = {
  link: css`
    z-index: 9999;
    position: absolute;
    color: var(--color-success);
    border: 1px solid var(--color-success);
    border-radius: 5px;
    padding: 0.5rem;
    background-color: var(--color-background);
    margin: 0.5rem 0 0 0.5rem;
    overflow: hidden;
    height: 1px;
    width: 1px;
    clip: rect(1px, 1px, 1px, 1px);
    :focus {
      height: auto;
      width: auto;
      clip: auto;
    }
  `,
};

export default function SkipToContent() {
  return (
    <a css={Styles.link} href="#skip-to-content" tabIndex={1}>
      Skip to content
    </a>
  );
}
