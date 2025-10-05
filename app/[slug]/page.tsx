import rehypeFigure from "@microflash/rehype-figure";
import rehypeShiki from "@shikijs/rehype";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkToc from "remark-toc";
import { mdxComponents, ScrollToHash, ViewCounter } from "@/components";
import * as config from "@/lib/config";
import { formatDate } from "@/lib/format-date";
import { getPost } from "@/lib/get-post";
import { getPosts } from "@/lib/get-posts";

export async function generateStaticParams() {
	const posts = await getPosts();

	return posts.map((post) => ({
		slug: post.slug,
	}));
}

export async function generateMetadata({
	params,
}: PageProps<"/[slug]">): Promise<Metadata> {
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

export default async function PostPage({ params }: PageProps<"/[slug]">) {
	const { slug } = await params;

	try {
		const post = await getPost(slug);

		return (
			<>
				<link
					crossOrigin="anonymous"
					href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css"
					integrity="sha384-n8MVd4RsNIU0tAv4ct0nTaAbDJwPJzDEaqSD1odI+WdtXRGWt2kTvGFasHpSy3SV"
					rel="stylesheet"
				/>
				<div className="mb-6 md:mb-8">
					<div className="flex justify-between py-3 text-zinc-500 text-sm">
						<div className="flex items-center gap-2">
							<div className="bg-zinc-200 dark:bg-zinc-700 rounded-full w-[2px] h-4"></div>
							{formatDate(post.metadata.date)}
						</div>
						<ViewCounter slug={slug} />
					</div>
					<h1 className="font-bold text-2xl sm:text-3xl md:text-4xl">
						{post.metadata.title}
					</h1>
				</div>
				<article className="dark:prose-invert prose prose-zinc">
					<MDXRemote
						source={post.content}
						components={mdxComponents}
						options={{
							mdxOptions: {
								remarkPlugins: [remarkGfm, remarkMath, remarkToc],
								rehypePlugins: [
									rehypeFigure,
									[
										rehypeShiki,
										{
											themes: {
												dark: "github-dark-dimmed",
												light: "github-light",
											},
											inline: "tailing-curly-colon",
											defaultColor: "light-dark()",
											transformers: [],
										},
									],
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
					<ScrollToHash />
				</article>
			</>
		);
	} catch {
		notFound();
	}
}
