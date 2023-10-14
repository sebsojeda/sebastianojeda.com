export async function getPost(slug: string) {
	const module = await import(`../content/${slug}.md`);
	return {
		component: module.default,
		metadata: module.metadata,
		slug
	};
}
