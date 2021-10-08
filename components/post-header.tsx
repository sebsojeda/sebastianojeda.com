import { css } from "@emotion/react";

type PostHeaderProps = {
  title: string;
  timeToRead: string;
};

const Styles = {
  wrapper: css`
    margin: 3rem 0 2rem 0;
  `,
  title: css`
    font-weight: bold;
  `,
  timeToRead: css`
    color: var(--color-accent-5);
  `,
};

export default function PostHeader(props: PostHeaderProps) {
  return (
    <div css={Styles.wrapper}>
      <h1 css={Styles.title}>{props.title}</h1>
      <div css={Styles.timeToRead}>{props.timeToRead}</div>
    </div>
  );
}
