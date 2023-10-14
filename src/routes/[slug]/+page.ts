import { getPost } from '$lib/getPost';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const prerender = true;

export async function load({ params }: PageLoad) {
	try {
		const post = await getPost(params.slug);
		return { ...post };
	} catch (e) {
		throw error(404, { message: `Could not find ${params.slug}` });
	}
}