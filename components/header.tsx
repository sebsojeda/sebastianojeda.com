import { css } from "@emotion/react";
import { ReactNode } from "react";

interface HeaderProps {
  children: ReactNode;
}

const Styles = {
  header: css`
    padding-top: 2rem;
  `,
};

export default function Header(props: HeaderProps) {
  return <header css={Styles.header}>{props.children}</header>;
}
