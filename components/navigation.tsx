import { css } from "@emotion/react";
import Link from "next/link";
import ThemeToggle from "./theme-toggle";

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
    margin: 0 1rem;
    * + * {
      margin-left: 0.5rem;
    }
  `,
  link: css`
    :hover {
      cursor: pointer;
    }
  `,
};

export default function Navigation() {
  return (
    <div css={Styles.border}>
      <div css={Styles.container}>
        <Link href="/">
          <a css={Styles.logo}>Sebastian Ojeda</a>
        </Link>
        <div css={Styles.nav}>
          <nav>
            <ul css={Styles.navList}>
              <li>
                <Link href="/blog">
                  <a css={Styles.link}>Blog</a>
                </Link>
              </li>
            </ul>
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}