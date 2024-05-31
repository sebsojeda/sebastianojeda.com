import type { FrontMatter, PostList } from './types';

export async function getPosts(): Promise<PostList> {
	const posts = [];
	const modules = import.meta.glob('/src/content/*.md', { eager: true });

	for (const path in modules) {
		const slug = path.split('/').pop()!.replace('.md', '');
		const { metadata } = modules[path] as { metadata: FrontMatter };
		const post = { metadata, slug };
		posts.push(post);
	}

	return posts.sort(
		(a, b) => new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime()
	);
}
