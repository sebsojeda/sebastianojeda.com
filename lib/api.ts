import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { bundleMDX } from "mdx-bundler";
import readingTime from "reading-time";

export const POSTS_PATH = path.join(process.cwd(), "data/_posts");

export function getSourceOfFile(fileName: string) {
  return fs.readFileSync(path.join(POSTS_PATH, fileName)).toString();
}

export function getRecentPosts(limit: number) {
  return getAllPosts().slice(0, limit);
}

export function getAllPosts() {
  return fs
    .readdirSync(POSTS_PATH)
    .filter((path) => /\.mdx$/.test(path))
    .map((fileName) => {
      const source = getSourceOfFile(fileName);
      const slug = fileName.replace(/\.mdx$/, "");
      const { data: frontmatter } = matter(source);
      const { text: timeToRead } = readingTime(source);

      return {
        frontmatter,
        slug,
        timeToRead,
      };
    })
    .filter((post) => !post.frontmatter.draft)
    .sort((post1, post2) =>
      post1.frontmatter.date > post2.frontmatter.date ? -1 : 1
    );
}

export async function getPostBySlug(slug: string) {
  const source = getSourceOfFile(slug + ".mdx");
  const { text: timeToRead } = readingTime(source);

  const { code, frontmatter } = await bundleMDX(source, {
    cwd: POSTS_PATH,
  });

  return {
    frontmatter,
    code,
    timeToRead,
  };
}
