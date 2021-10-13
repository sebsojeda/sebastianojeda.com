import { css } from "@emotion/react";
import Head from "next/head";
import Header from "../components/header";
import AppLayout from "../layouts/app-layout";

const Styles = {
  headerText: css`
    display: inline-block;
    font-weight: bold;
    background: -webkit-linear-gradient(
      to right,
      var(--color-error-light) 0%,
      var(--color-warning-light) 50%,
      var(--color-highlight-yellow) 100%
    );
    background: -moz-linear-gradient(
      to right,
      var(--color-error-light) 0%,
      var(--color-warning-light) 50%,
      var(--color-highlight-yellow) 100%
    );
    background: linear-gradient(
      to right,
      var(--color-error-light) 0%,
      var(--color-warning-light) 50%,
      var(--color-highlight-yellow) 100%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  `,
};

export default function About() {
  return (
    <AppLayout>
      <Head>
        <title>About</title>
      </Head>
      <Header>
        <h1 css={Styles.headerText}>About Me</h1>
      </Header>
      <p>Hey, I&apos;m Sebastian.</p>
    </AppLayout>
  );
}
