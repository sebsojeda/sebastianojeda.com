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
  about: css`
    line-height: 1.5rem;
    color: var(--color-accent-5);
    a {
      color: var(--color-success);
      :hover {
        color: var(--color-success-dark);
      }
    }
    margin-bottom: 3.5rem;
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
      <div css={Styles.about}>
        <p>
          Hey, I&apos;m Sebastian. I&apos;m a developer, writer, and creative
          coder. I currently work at{" "}
          <a href="https://schwab.com">Charles Schwab</a> as a DevOps Engineer.
          Previously, I worked as a full stack software developer for a{" "}
          <a href="https://cognitosoftware.com">startup</a>.
        </p>
        <p>
          I was born in Chile off the western coast of South America but grew up
          in a small town in North Carolina. I went to school at Appalachian
          State University, where I graduated with a degree in Physics and I am
          currently pursuing a degree in Computer Science at the University of
          Colorado Boulder.
        </p>
        <p>
          When I&apos;m not coding, I spend my free time playing music, rock
          climbing, and hanging out with friends and family in Dever, CO.
        </p>
      </div>
    </AppLayout>
  );
}
