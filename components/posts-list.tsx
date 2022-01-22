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

export default function PostsList(props: PostsListProps) {
  return (
    <div className="py-5">
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
