import { css } from "@emotion/react";
import React from "react";
import PostPreview from "./post-preview";

type PostsListProps = {
  posts: {
    frontmatter: {
      title: string;
      abstract: string;
    };
    slug: string;
  }[];
};

const Styles = {
  wrapper: css`
    margin-bottom: 3.5rem;
  `,
};

export default function PostsList(props: PostsListProps) {
  return (
    <div css={Styles.wrapper}>
      {props.posts.map(({ frontmatter, slug }) => (
        <PostPreview
          key={slug}
          title={frontmatter.title}
          abstract={frontmatter.abstract}
          slug={slug}
        />
      ))}
    </div>
  );
}
