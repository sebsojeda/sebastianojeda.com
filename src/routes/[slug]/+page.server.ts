import { getPost } from '$lib/getPost';
import { error } from '@sveltejs/kit';
import { kv } from '@vercel/kv';

export const prerender = true;

export async function load({ params }) {
	try {
		const post = await getPost(params.slug);
		await kv.getset(`views:${post.slug}`, 0);
		return { ...post };
	} catch (e) {
		throw error(404, { message: `Could not find ${params.slug}` });
	}
}
