import rehypeFigure from "@microflash/rehype-figure";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkToc from "remark-toc";
import { mdxComponents } from "@/components/mdx";
import * as config from "@/lib/config";
import { formatDate } from "@/lib/format-date";
import { getPost } from "@/lib/get-post";
import { getPosts } from "@/lib/get-posts";

export const dynamic = "force-dynamic";

type Props = {
	params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
	const posts = await getPosts();

	return posts.map((post) => ({
		slug: post.slug,
	}));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { slug } = await params;

	try {
		const post = await getPost(slug);

		return {
			title: post.metadata.title,
			description: post.metadata.description,
			robots: "index, follow",
			openGraph: {
				title: post.metadata.title,
				description: post.metadata.description,
				url: `${config.url}/${slug}`,
				type: "article",
				siteName: "Sebastian Ojeda",
				locale: "en_US",
				images: [
					{
						url: `${config.url}/api/og?title=${encodeURIComponent(post.metadata.title)}`,
						width: 1200,
						height: 630,
						alt: post.metadata.title,
					},
				],
			},
			alternates: {
				canonical: `${config.url}/${slug}`,
			},
		};
	} catch {
		return {
			title: "Post Not Found",
			description: "The requested blog post could not be found.",
		};
	}
}

export default async function PostPage({ params }: Props) {
	const { slug } = await params;

	try {
		const post = await getPost(slug);

		let views = 1;

		try {
			if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
				const { kv } = await import("@/lib/kv");

				if ((await kv.get<number>(`views:${slug}`)) === null) {
					await kv.set(`views:${slug}`, 1);
					views = 1;
				} else {
					views = await kv.incr(`views:${slug}`);
				}
			}
		} catch (kvError) {
			console.warn("KV error:", kvError);
			// Use default view count if KV fails
		}

		return (
			<>
				<link
					rel="stylesheet"
					href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css"
					integrity="sha384-n8MVd4RsNIU0tAv4ct0nTaAbDJwPJzDEaqSD1odI+WdtXRGWt2kTvGFasHpSy3SV"
					crossOrigin="anonymous"
				/>
				<header className="pb-6 md:pb-8">
					<h1 className="text-2xl font-bold">{post.metadata.title}</h1>
					<div className="flex justify-between font-mono text-xs text-zinc-500">
						<span>{formatDate(post.metadata.date)}</span>
						<span>{views} views</span>
					</div>
				</header>

				<article className="prose prose-zinc dark:prose-invert">
					<MDXRemote
						source={post.content}
						components={mdxComponents}
						options={{
							mdxOptions: {
								remarkPlugins: [remarkGfm, remarkMath, remarkToc],
								rehypePlugins: [
									rehypeFigure,
									[
										rehypeKatex,
										{
											strict: false,
										},
									],
								],
							},
						}}
					/>
				</article>
			</>
		);
	} catch {
		notFound();
	}
}
