import { css } from "@emotion/react";
import Head from "next/head";
import Link from "next/link";

const Styles = {
  title: css`
    display: inline-block;
    font-weight: bold;
  `,
  blurb: css`
    margin-bottom: 3.5rem;
    line-height: 1.5rem;
    color: var(--color-accent-5);
    a {
      color: var(--color-success);
      :hover {
        color: var(--color-success-dark);
      }
    }
  `,
};

export default function NotFound() {
  return (
    <>
      <Head>
        <title>Page Not Found</title>
      </Head>
      <h1 css={Styles.title}>Page Not Found</h1>
      <p css={Styles.blurb}>
        That page does not exist but you can explore the{" "}
        <Link href="/blog" passHref>
          <a>Blog</a>
        </Link>
        .
      </p>
    </>
  );
}
