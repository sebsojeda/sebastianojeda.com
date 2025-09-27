import { kv } from '$lib/kv';
import { json } from '@sveltejs/kit';

export async function GET({ url }) {
	const slug = url.searchParams.get('slug');
	const views =
		(await kv.get<number>(`views:${slug}`)) !== null ? await kv.incr(`views:${slug}`) : 0;
	return json({ views });
}
