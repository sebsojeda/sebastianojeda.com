import fs from "fs";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import path from "path";
import readingTime from "reading-time";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import { remarkMdxCodeMeta } from "remark-mdx-code-meta";

/**
 *
 *
 * @param {string} slug
 */
export default async function getPost(slug) {
  const source = fs
    .readFileSync(path.join(process.cwd(), "content", "blog", `${slug}.mdx`))
    .toString();
  const { text: timeToRead } = readingTime(source);
  const { data: frontmatter } = matter(source);
  const mdxSource = await serialize(source, {
    parseFrontmatter: true,
    mdxOptions: {
      rehypePlugins: [
        rehypeSlug,
        () => rehypeAutolinkHeadings({ behavior: "prepend" }),
      ],
      remarkPlugins: [remarkMdxCodeMeta],
      development: false,
    },
  });
  return {
    mdxSource,
    frontmatter,
    timeToRead,
  };
}
