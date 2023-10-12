import { getPosts } from '$lib/getPosts';

export const prerender = true;

export async function load() {
	const posts = await getPosts();
	return { posts };
}
