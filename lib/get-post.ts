import { readFileSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";
import type { PostDetail } from "./types";

export async function getPost(slug: string): Promise<PostDetail> {
	const contentDirectory = join(process.cwd(), "content");
	const fullPath = join(contentDirectory, `${slug}.md`);
	const fileContents = readFileSync(fullPath, "utf8");
	const { data, content } = matter(fileContents);

	return {
		content,
		metadata: {
			title: data.title,
			description: data.description,
			date: new Date(data.date),
		},
		slug,
	};
}
