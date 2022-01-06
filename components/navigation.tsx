import { css } from "@emotion/react";
import Link from "next/link";
import Dropdown from "./dropdown";

const Styles = {
  container: css`
    height: 65px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 50rem;
    margin: auto;
    padding: 0 0.75rem;
  `,
  border: css`
    border-bottom: 1px solid var(--color-accent-2);
  `,
  logo: css`
    color: var(--color-foreground);
    text-decoration: none;
    font-size: 1.25rem;
    font-weight: bold;
    :hover {
      cursor: pointer;
    }
  `,
  nav: css`
    display: flex;
    align-items: center;
  `,
  navList: css`
    list-style: none;
    display: flex;
    align-items: center;
    padding: 0;
    li {
      margin-left: 1rem;
    }
  `,
  link: css`
    color: var(--color-accent-5);
    text-decoration: none;
    :hover {
      cursor: pointer;
      color: var(--color-foreground);
    }
  `,
};

export default function Navigation() {
  return (
    <div css={Styles.border}>
      <div css={Styles.container}>
        <Link href="/" passHref>
          <a css={Styles.logo}>Sebastian Ojeda</a>
        </Link>
        <nav css={Styles.nav}>
          <ul css={Styles.navList}>
            <li>
              <Link href="/blog" passHref>
                <a css={Styles.link}>Blog</a>
              </Link>
            </li>
            <li>
              <Link href="/about" passHref>
                <a css={Styles.link}>About</a>
              </Link>
            </li>
            <li>
              <Dropdown label="Extras">
                <Link href="/snippets" passHref>
                  <a css={Styles.link}>Snippets</a>
                </Link>
                <Link href="/public/resume">
                  <a css={Styles.link}>Resume</a>
                </Link>
              </Dropdown>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
