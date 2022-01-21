import { css } from "@emotion/react";
import ActiveLink from "./active-link";
import Container from "./container";
import Dropdown from "./dropdown";

const Styles = {
  nav: css`
    display: flex;
    align-items: center;
    justify-content: start;
    padding-bottom: 4rem;
    padding-top: 1.75rem;
  `,
  navList: css`
    list-style: none;
    display: flex;
    align-items: center;
    padding: 0;
    li {
      margin-left: 1.5rem;
    }
    li:first-child {
      margin-left: 0;
    }
  `,
};

export default function Navigation() {
  return (
    <Container>
      <nav css={Styles.nav}>
        <ul css={Styles.navList}>
          <li>
            <ActiveLink href="/" text="Home" />
          </li>
          <li>
            <ActiveLink href="/blog" text="Blog" />
          </li>
          <li>
            <ActiveLink href="/about" text="About" />
          </li>
          <li>
            <Dropdown label="Extras">
              <ActiveLink href="/snippets" text="Snippets" />
            </Dropdown>
          </li>
        </ul>
      </nav>
    </Container>
  );
}
