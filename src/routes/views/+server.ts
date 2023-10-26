import { json } from '@sveltejs/kit';
import { kv } from '@vercel/kv';

export async function GET({ url }) {
	const slug = url.searchParams.get('slug');
	const views = (await kv.get<number>(`views:${slug}`)) ? await kv.incr(`views:${slug}`) : 0;
	return json({ views });
}
