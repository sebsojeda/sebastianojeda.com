import { kv } from '@vercel/kv';

export const prerender = true;

export function load({ params }) {
	kv.getset(`views:${params.slug}`, 0);
}
