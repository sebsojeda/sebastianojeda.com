import { css } from "@emotion/react";
import Link from "next/link";
import Container from "./container";
import GitHub from "./icons/github";
import LinkedIn from "./icons/linkedin";
import Rss from "./icons/rss";
import Twitter from "./icons/twitter";
import RecentlyPlayed from "./recently-played";
import ThemeToggle from "./theme-toggle";

const Styles = {
  footer: css`
    border-top: 1px solid var(--color-accent-2);
    background-color: var(--color-accent-1);
    padding: 3rem 0;
  `,
  wrapper: css`
    padding-top: 2rem;
    display: grid;
    grid-template-columns: 1fr;
    @media only screen and (min-width: 425px) {
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
      color: var(--color-foreground);
    }
  `,
  section: css`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: start;
    @media only screen and (min-width: 425px) {
      h5 {
        margin-top: 0;
      }
    }
  `,
  banner: css`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 1rem;
    @media only screen and (min-width: 425px) {
      flex-direction: row;
      justify-content: space-between;
      margin-bottom: 0;
    }
  `,
  externalLink: css`
    color: var(--color-accent-5);
    :hover {
      color: var(--color-foreground);
    }
  `,
  externalLinks: css`
    color: var(--color-accent-5);
    * + * {
      margin-left: 1rem;
    }
    margin-bottom: 1rem;
    @media only screen and (min-width: 425px) {
      margin-bottom: 0;
    }
  `,
  copyright: css`
    border-top: 1px solid var(--color-accent-2);
    color: var(--color-accent-5);
    padding-top: 1rem;
    font-size: 0.85rem;
  `,
};

export default function Footer() {
  return (
    <footer css={Styles.footer}>
      <Container>
        <RecentlyPlayed />
        <div css={Styles.wrapper}>
          <div css={Styles.section}>
            <h5>Pages</h5>
            <div>
              <Link href="/" passHref>
                <a css={Styles.link}>Home</a>
              </Link>
            </div>
            <div>
              <Link href="/blog" passHref>
                <a css={Styles.link}>Blog</a>
              </Link>
            </div>
            <div>
              <Link href="/about" passHref>
                <a css={Styles.link}>About</a>
              </Link>
            </div>
          </div>
          <div css={Styles.section}>
            <h5>Extras</h5>
            <div>
              <Link href="/snippets" passHref>
                <a css={Styles.link}>Snippets</a>
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
            <a href="/rss.xml" css={Styles.externalLink}>
              <Rss />
            </a>
          </div>
          <ThemeToggle />
        </div>
        <div css={Styles.copyright}>
          Copyright &copy; {new Date().getFullYear()} Sebastian Ojeda. All
          Rights Reserved.
        </div>
      </Container>
    </footer>
  );
}
