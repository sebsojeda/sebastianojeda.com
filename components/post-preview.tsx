import Link from "next/link";
import { css } from "@emotion/react";

interface PostPreviewProps {
  title: string;
  abstract: string;
  slug: string;
}

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
  `,
  action: css`
    font-weight: 600;
  `,
};

export default function PostPreview(props: PostPreviewProps) {
  return (
    <Link href={`/blog/${props.slug}`} passHref>
      <a css={Styles.card}>
        <h2 css={Styles.title}>{props.title}</h2>
        <p css={Styles.abstract}>{props.abstract}</p>
        <div css={Styles.action}>
          Read More <span>&rarr;</span>
        </div>
      </a>
    </Link>
  );
}