import { readFileSync } from "fs";
import { glob } from "glob";
import matter from "gray-matter";
import { FrontMatter } from "./types";

export async function getPosts() {
  const posts = [];
  const files = await glob("content/*.md");

  for (const file of files) {
    const fileBuffer = readFileSync(file);
    const metadata = matter(fileBuffer).data as FrontMatter;
    const slug = file.replace(/^content\/|\.md$/g, "");
    posts.push({ metadata, slug });
  }

  return posts.sort(
    (a, b) =>
      new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime()
  );
}
