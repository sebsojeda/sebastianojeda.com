import type { MetadataRoute } from "next";
import * as config from "@/lib/config";
import { getPosts } from "@/lib/get-posts";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const posts = await getPosts();

	return [
		{
			url: config.url,
			lastModified: new Date().toISOString(),
			changeFrequency: "monthly",
			priority: 1,
		},
		{
			url: `${config.url}/about`,
			lastModified: new Date().toISOString(),
			changeFrequency: "yearly",
			priority: 0.8,
		},
		...posts.map((post) => {
			return {
				url: `${config.url}/${post.slug}`,
				lastModified: post.metadata.date.toISOString(),
				changeFrequency: "yearly" as const,
				priority: 0.5,
			};
		}),
	];
}
