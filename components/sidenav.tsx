import { css } from "@emotion/react";
import Link from "next/link";
import Button from "./button";
import ThemeToggle from "./theme-toggle";
import Logout from "./icons/logout";
import { useAuth } from "./auth-provider";

const Styles = {
  container: css`
    background-color: var(--color-accent-1);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 1rem;
    border-right: 1px solid var(--color-accent-2);
  `,
  logo: css`
    font-size: 1rem;
    font-weight: bold;
    :hover {
      cursor: pointer;
    }
  `,
  buttons: css`
    button {
      margin-top: 1rem;
    }
  `,
};

export default function SideNav() {
  const { logout } = useAuth();
  return (
    <div css={Styles.container}>
      <div>
        <Link href="/">
          <a css={Styles.logo}>Sebastian Ojeda</a>
        </Link>
      </div>
      <div css={Styles.buttons}>
        <ThemeToggle />
        <Button prefix={<Logout />} onClick={logout}>
          Sign Out
        </Button>
      </div>
    </div>
  );
}
