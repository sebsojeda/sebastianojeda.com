import { ReactNode } from "react";
import { css } from "@emotion/react";
interface ContainerProps {
  children: ReactNode;
}

const Styles = {
  container: css`
    max-width: 50rem;
    margin: auto;
    padding: 0 1.25rem;
  `,
};

export default function Container(props: ContainerProps) {
  return <div css={Styles.container}>{props.children}</div>;
}
