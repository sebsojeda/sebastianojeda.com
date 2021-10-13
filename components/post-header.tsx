import { css } from "@emotion/react";
import PageViews from "./page-views";

type PostHeaderProps = {
  title: string;
  timeToRead: string;
  slug: string;
};

const Styles = {
  wrapper: css`
    margin: 3rem 0 2rem 0;
  `,
  title: css`
    font-weight: bold;
  `,
  metadata: css`
    color: var(--color-accent-5);
    font-size: 0.85rem;
  `,
};

export default function PostHeader(props: PostHeaderProps) {
  return (
    <div css={Styles.wrapper}>
      <h1 css={Styles.title}>{props.title}</h1>
      <div css={Styles.metadata}>
        <span>{props.timeToRead}</span> • <PageViews slug={props.slug} />
      </div>
    </div>
  );
}
