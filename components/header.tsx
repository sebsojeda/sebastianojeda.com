import { css } from "@emotion/react";
import { ReactNode } from "react";

type HeaderProps = {
  children: ReactNode;
};

const Styles = {};

export default function Header(props: HeaderProps) {
  return <header>{props.children}</header>;
}
