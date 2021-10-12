import { css } from "@emotion/react";

type SnippetHeaderProps = {
  title: string;
  description: string;
};

const Styles = {
  wrapper: css`
    margin: 3rem 0 3.5rem 0;
  `,
  title: css`
    font-weight: bold;
    word-break: break-all;
  `,
  description: css`
    color: var(--color-accent-5);
  `,
};

export default function SnippetHeader(props: SnippetHeaderProps) {
  return (
    <div css={Styles.wrapper}>
      <h1 css={Styles.title}>{props.title}</h1>
      <div css={Styles.description}>{props.description}</div>
    </div>
  );
}
