import { getPosts } from '$lib/getPosts';

export async function load() {
	const posts = await getPosts();
	return { posts };
}
