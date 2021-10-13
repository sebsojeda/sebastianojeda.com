import { ReactNode } from "react";
import { css } from "@emotion/react";

type ContainerProps = {
  children: ReactNode;
};

const Styles = {
  grow: css`
    flex-grow: 1;
  `,
  container: css`
    max-width: 50rem;
    padding: 0 1.25rem;
    margin: 0 auto;
  `,
};

export default function Container(props: ContainerProps) {
  return (
    <div css={Styles.grow}>
      <div css={Styles.container}>{props.children}</div>
    </div>
  );
}
