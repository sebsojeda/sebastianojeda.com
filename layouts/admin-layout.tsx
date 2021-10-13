import { css } from "@emotion/react";
import { ReactNode } from "react";
import SideNav from "../components/sidenav";

type AdminLayoutProps = {
  children: ReactNode;
};

const Styles = {
  layout: css`
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
