import fs from "fs";
import matter from "gray-matter";
import path from "path";
import Meta from "../../components/Meta";

/**
 * Props for the `BlogPostHead` component.
 *
 * @typedef {object} BlogPostHeadProps
 * @property {{[key: string]: any}} params - The dynamic route parameters object from the root segment down to that page.
 */

/**
 * Head for the `/blog/[slug]` page.
 *
 * @param {BlogPostHeadProps} props - {@link BlogPostHeadProps}
 */
export default function BlogPostHead({ params }) {
  const { slug } = params;
  const source = fs
    .readFileSync(path.join(process.cwd(), "content", "blog", `${slug}.mdx`))
    .toString();
  const { data: frontmatter } = matter(source);
  return (
    <Meta
      title={frontmatter.title}
      description={frontmatter.abstract}
      path={`/blog/${slug}`}
      image={frontmatter.image}
    />
  );
}
