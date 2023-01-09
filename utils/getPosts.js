import fs from "fs";
import matter from "gray-matter";
import kebabCase from "lodash.kebabcase";
import path from "path";

/**
 * Reads all `.mdx` files in the `content/blog` folder.
 *
 * @param {number} [limit] - The number of posts to fetch. By default, all posts will be returned.
 * @return An array containing the frontmatter for each file, sorted by date.
 */
export default async function getPosts(limit) {
  return fs
    .readdirSync(path.join(process.cwd(), "content", "blog"))
    .filter((file) => /\.mdx$/.test(file))
    .map((file) => {
      const source = fs
        .readFileSync(path.join(process.cwd(), "content", "blog", file))
        .toString();
      const slug = kebabCase(file.replace(/\.mdx$/, ""));
      const { data: frontmatter } = matter(source);
      return {
        frontmatter,
        slug,
      };
    })
    .filter((post) => {
      return process.env.NODE_ENV !== "production" || !post.frontmatter.draft;
    })
    .sort((a, b) => (a.frontmatter.date > b.frontmatter.date ? -1 : 1))
    .slice(0, limit);
}
