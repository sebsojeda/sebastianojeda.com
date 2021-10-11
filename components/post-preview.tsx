import Link from "next/link";
import { css } from "@emotion/react";

type PostPreviewProps = {
  title: string;
  abstract: string;
  slug: string;
};

const Styles = {
  card: css`
    color: var(--color-foreground);
    text-decoration: none;
  `,
  title: css`
    font-weight: 600;
  `,
  abstract: css`
    color: var(--color-accent-5);
    line-height: 1.5rem;
  `,
  action: css`
    font-weight: 600;
  `,
};

export default function PostPreview(props: PostPreviewProps) {
  return (
    <Link href={`/blog/${props.slug}`} passHref>
      <a css={Styles.card}>
        <h3 css={Styles.title}>{props.title}</h3>
        <p css={Styles.abstract}>{props.abstract}</p>
        <div css={Styles.action}>
          Read More <span>&rarr;</span>
        </div>
      </a>
    </Link>
  );
}
