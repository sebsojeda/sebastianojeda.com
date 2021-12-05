import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { bundleMDX } from "mdx-bundler";
import readingTime from "reading-time";
import { remarkMdxCodeMeta } from "remark-mdx-code-meta";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

export function getSourceOfFile(type: string, fileName: string) {
  return fs
    .readFileSync(path.join(process.cwd(), "data", type, fileName))
    .toString();
}

export function getAllFilesFrontMatter(type: string) {
  return fs
    .readdirSync(path.join(process.cwd(), "data", type))
    .filter((path) => /\.mdx$/.test(path))
    .map((fileName) => {
      const source = getSourceOfFile(type, fileName);
      const slug = fileName.replace(/\.mdx$/, "");
      const { data: frontmatter } = matter(source);
      const { text: timeToRead } = readingTime(source);

      return {
        frontmatter,
        slug,
        timeToRead,
      };
    })
    .filter((post) =>
      process.env.NODE_ENV !== "production" ? true : !post.frontmatter.draft
    )
    .sort((post1, post2) =>
      post1.frontmatter.date > post2.frontmatter.date ? -1 : 1
    );
}

export async function getFileBySlug(type: string, slug: string) {
  const source = getSourceOfFile(type, slug + ".mdx");
  const { text: timeToRead } = readingTime(source);
  const { code, frontmatter } = await bundleMDX(source, {
    xdmOptions(options) {
      options.remarkPlugins = [
        ...(options.remarkPlugins ?? []),
        remarkMdxCodeMeta,
      ];
      options.rehypePlugins = [
        ...(options.rehypePlugins ?? []),
        rehypeSlug,
        () => rehypeAutolinkHeadings({ behavior: "prepend" }),
      ];
      return options;
    },
  });
  return {
    frontmatter,
    code,
    timeToRead,
  };
}
