import { css } from "@emotion/react";
import { ReactNode } from "react";

type HeaderProps = {
  children: ReactNode;
};

const Styles = {
  header: css`
    padding-top: 4rem;
  `,
};

export default function Header(props: HeaderProps) {
  return <header css={Styles.header}>{props.children}</header>;
}
