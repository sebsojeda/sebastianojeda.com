import { css } from "@emotion/react";

interface PostHeaderProps {
  title: string;
}

const Styles = {
  title: css`
    font-weight: bold;
  `,
};

export default function PostHeader(props: PostHeaderProps) {
  return (
    <div>
      <h1 css={Styles.title}>{props.title}</h1>
    </div>
  );
}
