import * as config from '$lib/config';
import { getPosts } from '$lib/getPosts';
import { Feed } from 'feed';

export const prerender = true;

export async function GET() {
	const posts = await getPosts();

	const feed = new Feed({
		title: `${config.title}'s Blog`,
		description: config.description,
		id: config.url,
		link: config.url,
		language: 'en',
		image: `${config.url}/og?title=${config.title}'s Blog`,
		favicon: `${config.url}/favicon.ico`,
		copyright: `All rights reserved 2023, ${config.title}`,
		author: {
			name: config.title,
			email: config.email,
			link: config.url
		}
	});

	posts.forEach(async (post) => {
		feed.addItem({
			title: post.title,
			id: `${config.url}/${post.slug}`,
			link: `${config.url}/${post.slug}`,
			description: post.description,
			date: new Date(post.date),
			image: `${config.url}/og?title=${post.title}`
		});
	});

	feed.addCategory('Science & Technology');

	return new Response(feed.rss2(), {
		headers: {
			'Cache-Control': 'max-age=0, s-maxage=3600',
			'Content-Type': 'application/rss+xml'
		}
	});
}
