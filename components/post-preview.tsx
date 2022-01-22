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
      <a>
        <h3 className="text-xl font-medium">{props.title}</h3>
        <p className="text-accent-5 py-2">{props.abstract}</p>
        <div className="text-sm">
          Read More <span>&rarr;</span>
        </div>
      </a>
    </Link>
  );
}
