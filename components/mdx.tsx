import { css } from "@emotion/react";
import ArrowRight from "./icons/arrow-right";
import Code from "./code";

const h1 = (props: any) => <h1 {...props} />;

const h2 = (props: any) => <h2 {...props} />;

const h3 = (props: any) => <h3 {...props} />;

const h4 = (props: any) => <h4 {...props} />;

const h5 = (props: any) => <h5 {...props} />;

const h6 = (props: any) => <h6 {...props} />;

const p = (props: any) => (
  <p
    css={css`
      line-height: 2rem;
    `}
    {...props}
  />
);

const pre = (props: any) => <Code {...props} />;

const a = (props: any) => (
  <a
    css={css`
      color: var(--color-success);
    `}
    {...props}
  />
);

const ul = (props: any) => (
  <ul
    css={css`
      list-style-type: none;
      padding-inline-start: 1rem;
    `}
    {...props}
  />
);

const li = (props: any) => (
  <li {...props}>
    <span
      css={css`
        color: var(--color-highlight-pink);
        margin-right: 0.5rem;
      `}
    >
      <ArrowRight />
    </span>
    {props.children}
  </li>
);

const code = (props: any) => (
  <code
    css={css`
      background-color: var(--color-accent-2);
      padding: 0.125rem;
      border-radius: 5px;
      font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
        DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
    `}
    {...props}
  />
);

const blockquote = (props: any) => (
  <blockquote
    css={css`
      background-color: var(--color-accent-1);
      padding: 0.5rem 1.5rem;
      margin: 1rem 0;
      border-radius: 5px;
      color: var(--color-warning);
      border: 1px solid var(--color-warning-dark);
    `}
    {...props}
  />
);

const Mdx = {
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  pre,
  a,
  ul,
  li,
  code,
  blockquote,
};

export default Mdx;
