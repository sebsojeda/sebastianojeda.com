import { css } from "@emotion/react";
import { ReactNode } from "react";
import Container from "../components/container";
import SideNav from "../components/sidenav";

type AdminLayoutProps = {
  children: ReactNode;
};

const Styles = {
  layout: css`
    background-color: var(--color-background);
    color: var(--color-foreground);
    font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue",
      sans-serif;
    min-height: 100vh;
    display: grid;
    grid-template-columns: auto 1fr;
  `,
  main: css`
    display: grid;
    grid-auto-columns: 15rem;
    grid-auto-rows: 10rem;
    padding: 5rem;
    gap: 1rem;
  `,
};

export default function AdminLayout(props: AdminLayoutProps) {
  return (
    <div css={Styles.layout}>
      <SideNav />
      <main css={Styles.main}>{props.children}</main>
    </div>
  );
}
