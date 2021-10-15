import fs from "fs";
import { Feed } from "feed";
import path from "path";
import matter from "gray-matter";

function getPostFrontmatter() {
  const posts = fs
    .readdirSync(path.join(import.meta.url, "../../data/blog/"))
    .filter((path) => /\.mdx$/.test(path))
    .map((fileName) => {
      const source = fs
        .readFileSync(path.join(import.meta.url, "../../data/blog", fileName))
        .toString();
      const slug = fileName.replace(/\.mdx$/, "");
      const { data: frontmatter } = matter(source);
      return {
        frontmatter,
        slug,
      };
    })
    .filter((post) => !post.frontmatter.draft)
    .sort((post1, post2) =>
      post1.frontmatter.date > post2.frontmatter.date ? -1 : 1
    );
  return posts;
}

async function generateRss() {
  const baseUrl = "https://www.sebastianojeda.com";
  const author = {
    name: "Sebastian Ojeda",
    email: "me@sebastianojeda.com",
    link: "https://twitter.com/sebsojeda",
  };

  const feed = new Feed({
    title: "Sebastian Ojeda's Blog",
    description:
      "Developer and creative coder. I like to write about my successes in development and various computer science topics that interest me.",
    id: baseUrl,
    link: baseUrl,
    language: "en",
    copyright: `Copyright ${new Date().getFullYear()} Sebastian Ojeda. All Rights Reserved.`,
    feedLinks: {
      rss2: `${baseUrl}/rss.xml`,
    },
    author,
  });

  feed.addCategory("Software Development");

  getPostFrontmatter().forEach((post) => {
    const {
      slug,
      frontmatter: { date, title, abstract, image },
    } = post;
    const url = `${baseUrl}/blog/${slug}`;

    feed.addItem({
      title,
      id: url,
      link: url,
      description: abstract,
      content: abstract,
      author: [author],
      date: new Date(date),
      image: image ? `${baseUrl}/${image}` : undefined,
    });
  });

  fs.writeFileSync("public/rss.xml", feed.rss2());
}

generateRss();
