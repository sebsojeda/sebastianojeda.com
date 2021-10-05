import { css } from "@emotion/react";
import Link from "next/link";
import Container from "./container";
import GitHub from "./icons/github";
import LinkedIn from "./icons/linkedin";
import Twitter from "./icons/twitter";
import ThemeToggle from "./theme-toggle";

const Styles = {
  footer: css`
    border-top: 1px solid var(--color-accent-2);
    background-color: var(--color-accent-1);
    padding: 3rem 0;
  `,
  wrapper: css`
    display: grid;
    grid-template-columns: 1fr;
    @media only screen and (min-width: 768px) {
      grid-template-columns: 1fr 1fr;
    }
  `,
  link: css`
    text-decoration: none;
    color: var(--color-accent-5);
    margin: 0.75rem 0;
    display: inline-block;
    :hover {
      cursor: pointer;
    }
  `,
  section: css`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  `,
  banner: css`
    display: flex;
    flex-direction: column;
    align-items: center;
    @media only screen and (min-width: 768px) {
      flex-direction: row;
      justify-content: space-between;
    }
  `,
  externalLink: css`
    color: var(--color-accent-5);
  `,
  externalLinks: css`
    margin-bottom: 1rem;
    @media only screen and (min-width: 768px) {
      margin-bottom: 0;
    }
    * + * {
      margin-left: 0.5rem;
    }
  `,
  copyright: css`
    color: var(--color-accent-5);
    margin-top: 1rem;
    @media only screen and (min-width: 768px) {
      margin-top: 0;
    }
  `,
};

export default function Footer() {
  return (
    <footer css={Styles.footer}>
      <Container>
        <div css={Styles.wrapper}>
          <div css={Styles.section}>
            <h5>Pages</h5>
            <div>
              <Link href="/">
                <a css={Styles.link}>Home</a>
              </Link>
            </div>
            <div>
              <Link href="/blog">
                <a css={Styles.link}>Blog</a>
              </Link>
            </div>
            <div>
              <Link href="/about">
                <a css={Styles.link}>About</a>
              </Link>
            </div>
          </div>
          <div css={Styles.section}>
            <h5>Extras</h5>
            <div>
              <Link href="/snippets">
                <a css={Styles.link}>Snippets</a>
              </Link>
            </div>
            <div>
              <Link href="/public/resume">
                <a css={Styles.link}>Resume</a>
              </Link>
            </div>
          </div>
        </div>
        <div css={Styles.banner}>
          <h4>Sebastian Ojeda</h4>
          <div css={Styles.externalLinks}>
            <a href="https://github.com/sebsojeda" css={Styles.externalLink}>
              <GitHub />
            </a>
            <a href="https://twitter.com/sebsojeda" css={Styles.externalLink}>
              <Twitter />
            </a>
            <a
              href="https://linkedin.com/in/sebastian-ojeda"
              css={Styles.externalLink}
            >
              <LinkedIn />
            </a>
          </div>
          <ThemeToggle />
          <div css={Styles.copyright}>
            &copy; 2021-present. All Rights Reserved.
          </div>
        </div>
      </Container>
    </footer>
  );
}