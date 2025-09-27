import { kv } from '$lib/kv';

export const prerender = true;

export async function load({ params }) {
	if ((await kv.get<number>(`views:${params.slug}`)) === null) {
		await kv.set(`views:${params.slug}`, 0);
	}
	return { views: (await kv.get<number>(`views:${params.slug}`))! };
}
