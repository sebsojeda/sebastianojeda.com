import { css } from "@emotion/react";
import Link from "next/link";

type SnippetPreviewProps = {
  slug: string;
  title: string;
  description: string;
};

const Styles = {
  card: css`
    text-decoration: none;
    color: var(--color-foreground);
    padding: 1rem;
    border-radius: 5px;
    border: 1px solid var(--color-accent-2);
  `,
  title: css`
    margin-top: 0;
  `,
  description: css`
    height: 3rem;
  `,
  action: css``,
};

export default function SnippetPreview(props: SnippetPreviewProps) {
  return (
    <Link href={`/snippets/${props.slug}`} passHref>
      <a css={Styles.card}>
        <h3 css={Styles.title}>{props.title}</h3>
        <p css={Styles.description}>{props.description}</p>
        <div css={Styles.action}>
          View Code <span>&rarr;</span>
        </div>
      </a>
    </Link>
  );
}
