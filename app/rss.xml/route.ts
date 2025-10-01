import { Feed } from "feed";
import * as config from "@/lib/config";
import { getPosts } from "@/lib/get-posts";

export const dynamic = "force-static";

export async function GET() {
	const posts = await getPosts();

	const feed = new Feed({
		title: `${config.title}'s Blog`,
		description: config.description,
		id: config.url,
		link: config.url,
		language: "en",
		image: `${config.url}/api/og?title=${encodeURIComponent(
			`${config.title}'s Blog`,
		)}`,
		favicon: `${config.url}/favicon.ico`,
		copyright: `All rights reserved ${new Date().getFullYear()}, ${
			config.title
		}`,
		updated: new Date(),
		feedLinks: {
			rss2: `${config.url}/rss.xml`,
		},
		author: {
			name: config.title,
			email: config.email,
			link: config.url,
		},
	});

	posts.forEach((post) => {
		feed.addItem({
			title: post.metadata.title,
			id: `${config.url}/${post.slug}`,
			link: `${config.url}/${post.slug}`,
			description: post.metadata.description,
			date: new Date(post.metadata.date),
			image: `${config.url}/api/og?title=${encodeURIComponent(post.metadata.title)}`,
		});
	});

	return new Response(feed.rss2(), {
		headers: {
			"Content-Type": "application/xml",
		},
	});
}
