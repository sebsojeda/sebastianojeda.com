"use client";

import PostPreview from "./post-preview";
import { useQuery } from "./useQuery";

/**
 * @typedef {object} Post
 * @property {{[key: string]: any}} frontmatter - Parsed frontmatter from an `.mdx` file.
 * @property {string} slug - Filename without the extension.
 */

/**
 * @typedef {object} PostsListProps
 * @property {Post[]} posts
 */

/**
 * @param {PostsListProps} props
 */
export default function PostsList(props) {
  const query = useQuery((state) => state.query);

  return (
    <div className="py-5 space-y-7">
      {props.posts
        .filter((post) =>
          post.frontmatter.title.toLowerCase().includes(query.toLowerCase())
        )
        .map((post) => (
          <PostPreview
            key={post.slug}
            slug={post.slug}
            frontmatter={post.frontmatter}
          />
        ))}
    </div>
  );
}
