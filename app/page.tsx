import type { Metadata } from "next";
import { Posts } from "@/components";
import * as config from "@/lib/config";
import { getPosts } from "@/lib/get-posts";

export const metadata: Metadata = {
	title: `${config.title}'s Blog`,
	description: config.description,
	robots: "index, follow",
	openGraph: {
		type: "website",
		title: `${config.title}'s Blog`,
		description: config.description,
		url: config.url,
		locale: "en_US",
		siteName: config.title,
		images: [
			{
				url: `${config.url}/og?title=${config.title}'s Blog`,
				alt: `${config.title}'s Blog`,
			},
		],
	},
};

export default async function Home() {
	const posts = await getPosts();
	return <Posts posts={posts} />;
}
