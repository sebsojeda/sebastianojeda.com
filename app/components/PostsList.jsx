"use client";

import { useQuery } from "../../lib/useQuery";
import PostPreview from "./PostPreview";

/**
 * A blog post object.
 *
 * @typedef {object} Post
 * @property {{[key: string]: any}} frontmatter - Parsed frontmatter from an `.mdx` file.
 * @property {string} slug - Filename without the extension.
 */

/**
 * Props for the `PostsList` component.
 *
 * @typedef {object} PostsListProps
 * @property {Post[]} posts - A list of blog post objects.
 */

/**
 * Shows a list view of all the posts that have been published.
 *
 * @param {PostsListProps} props - {@link PostsListProps}
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
