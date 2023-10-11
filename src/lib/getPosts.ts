export async function getPosts() {
	const posts = [];
	const modules = import.meta.glob('/src/content/*.md', { eager: true });

	for (const path in modules) {
		const slug = path.split('/').pop()!.replace('.md', '');
		const { metadata } = modules[path] as {
			metadata: { title: string; description: string; date: string };
		};
		const post = { ...metadata, slug };
		posts.push(post);
	}

	return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
