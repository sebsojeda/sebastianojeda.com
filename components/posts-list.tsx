import React from "react";
import PostPreview from "./post-preview";

export interface PostsListProps {
  posts: {
    frontmatter: {
      title: string;
      date: string;
      abstract: string;
    };
    slug: string;
    timeToRead: string;
  }[];
}

export default function PostsList({ posts }: PostsListProps) {
  return (
    <div className="space-y-10">
      {posts.map(({ frontmatter, slug, timeToRead }) => (
        <PostPreview
          key={slug}
          title={frontmatter.title}
          date={frontmatter.date}
          abstract={frontmatter.abstract}
          slug={slug}
          timeToRead={timeToRead}
        />
      ))}
    </div>
  );
}
