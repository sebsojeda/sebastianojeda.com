import { kv } from '@vercel/kv';

export const prerender = true;

export async function load({ params }) {
	await kv.getset(`views:${params.slug}`, 0);
}
