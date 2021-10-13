import { css } from "@emotion/react";
import Head from "next/head";
import Header from "../../components/header";
import SnippetsList from "../../components/snippets-list";
import AppLayout from "../../layouts/app-layout";
import { listGists } from "../../lib/github";

type SnippetsProps = {
  snippets: {
    id: string;
    title: string;
    slug: string;
    description: string;
  }[];
};

const Styles = {
  headerText: css`
    display: inline-block;
    font-weight: bold;
    background: -webkit-linear-gradient(
      to right,
      var(--color-violet) 0%,
      var(--color-highlight-purple) 50%,
      var(--color-highlight-pink) 100%
    );
    background: -moz-linear-gradient(
      to right,
      var(--color-violet) 0%,
      var(--color-highlight-purple) 50%,
      var(--color-highlight-pink) 100%
    );
    background: linear-gradient(
      to right,
      var(--color-violet) 0%,
      var(--color-highlight-purple) 50%,
      var(--color-highlight-pink) 100%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  `,
};

export default function Snippets(props: SnippetsProps) {
  return (
    <AppLayout>
      <Head>
        <title>Code Snippets</title>
      </Head>
      <Header>
        <h1 css={Styles.headerText}>Snippets</h1>
      </Header>
      <p
        css={css`
          color: var(--color-accent-5);
          line-height: 1.5rem;
        `}
      >
        These are snippets I&apos;ve come across and reference from time to
        time. I hope you find them as useful as I have.
      </p>
      <SnippetsList snippets={props.snippets} />
    </AppLayout>
  );
}

export async function getStaticProps() {
  const snippets = await listGists();

  return {
    props: { snippets },
  };
}
