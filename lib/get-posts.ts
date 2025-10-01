import { readFileSync } from "node:fs";
import { join } from "node:path";
import { glob } from "glob";
import matter from "gray-matter";
import type { PostList } from "./types";

export async function getPosts(): Promise<PostList> {
	const posts = [];
	const contentDirectory = join(process.cwd(), "content");
	const files = await glob(join(contentDirectory, "*.md"));

	for (const file of files) {
		const fileContents = readFileSync(file, "utf8");
		const { data } = matter(fileContents);
		const slug = file.replace(/^.*\/|\.md$/g, "");

		posts.push({
			metadata: {
				title: data.title,
				description: data.description,
				date: new Date(data.date),
			},
			slug,
		});
	}

	return posts.sort(
		(a, b) =>
			new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime(),
	);
}
