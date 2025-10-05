import type { Metadata } from "next";
import Image from "next/image";
import * as config from "@/lib/config";

export const metadata: Metadata = {
	title: `About ${config.title}`,
	description: config.description,
	robots: "index, follow",
	openGraph: {
		type: "article",
		title: `About ${config.title}`,
		description: config.description,
		url: `${config.url}/about`,
		locale: "en_US",
		siteName: config.title,
		images: [
			{
				url: `${config.url}/og?title=About ${config.title}`,
				alt: `About ${config.title}`,
			},
		],
	},
};

export default function About() {
	return (
		<article className="dark:prose-invert prose prose-zinc">
			<Image
				alt="Profile"
				className="md:float-right ml-2 rounded-lg rotate-6"
				src="/images/profile.png"
				height={150}
				width={150}
			/>
			<h1 className="mt-0 text-2xl sm:text-3xl md:text-4xl">
				I'm Sebastian Ojeda.
				<br />I build things for the web.
			</h1>
			<p>
				I'm passionate about science and technology, both the advancement and
				practical applications of them. I believe software has the ability to
				improve the lives of people and the world we live in.
			</p>
			<p>
				I'm a software engineer at{" "}
				<a href="https://schwab.com" rel="noopener noreferrer">
					Charles Schwab
				</a>{" "}
				where I work on developer pipelines and build internal tools &mdash; I
				like to think of developers as my customers. Previously, I was a
				software engineer at Cognito. I'm also currently a graduate student at{" "}
				<a href="https://www.utexas.edu" rel="noopener noreferrer">
					The University of Texas at Austin
				</a>{" "}
				where I'm pursuing a Master's degree in Computer Science with a focus on
				Artificial Intelligence.
			</p>
			<ul className="space-y-5 not-prose">
				<li className="flex">
					<a
						className="group flex font-medium text-sm"
						href={`https://x.com/${config.twitter}`}
						rel="noopener noreferrer"
					>
						<svg
							viewBox="0 0 24 24"
							aria-hidden="true"
							className="flex-none fill-zinc-500 dark:fill-zinc-400 dark:group-hover:fill-zinc-300 group-hover:fill-zinc-600 w-6 h-6 transition"
						>
							<title>Follow on X</title>
							<path d="M13.3174 10.7749L19.1457 4H17.7646L12.7039 9.88256L8.66193 4H4L10.1122 12.8955L4 20H5.38119L10.7254 13.7878L14.994 20H19.656L13.3171 10.7749H13.3174ZM11.4257 12.9738L10.8064 12.0881L5.87886 5.03974H8.00029L11.9769 10.728L12.5962 11.6137L17.7652 19.0075H15.6438L11.4257 12.9742V12.9738Z"></path>
						</svg>
						<span className="ml-4">Follow on X</span>
					</a>
				</li>
				<li className="flex">
					<a
						className="group flex font-medium text-sm"
						href={`https://www.linkedin.com/in/${config.linkedin}`}
						rel="noopener noreferrer"
					>
						<svg
							viewBox="0 0 24 24"
							aria-hidden="true"
							className="flex-none fill-zinc-500 dark:fill-zinc-400 dark:group-hover:fill-zinc-300 group-hover:fill-zinc-600 w-6 h-6 transition"
						>
							<title>Follow on LinkedIn</title>
							<path d="M18.335 18.339H15.67v-4.177c0-.996-.02-2.278-1.39-2.278-1.389 0-1.601 1.084-1.601 2.205v4.25h-2.666V9.75h2.56v1.17h.035c.358-.674 1.228-1.387 2.528-1.387 2.7 0 3.2 1.778 3.2 4.091v4.715zM7.003 8.575a1.546 1.546 0 01-1.548-1.549 1.548 1.548 0 111.547 1.549zm1.336 9.764H5.666V9.75H8.34v8.589zM19.67 3H4.329C3.593 3 3 3.58 3 4.297v15.406C3 20.42 3.594 21 4.328 21h15.338C20.4 21 21 20.42 21 19.703V4.297C21 3.58 20.4 3 19.666 3h.003z"></path>
						</svg>
						<span className="ml-4">Follow on LinkedIn</span>
					</a>
				</li>
				<hr className="my-4 border-zinc-200 dark:border-zinc-700" />
				<li className="flex">
					<a
						className="group flex font-medium text-sm"
						href={`mailto:${config.email}`}
						rel="noopener noreferrer"
					>
						<svg
							viewBox="0 0 24 24"
							aria-hidden="true"
							className="flex-none fill-zinc-500 dark:fill-zinc-400 dark:group-hover:fill-zinc-300 group-hover:fill-zinc-600 w-6 h-6 transition"
						>
							<title>Email me</title>
							<path
								fillRule="evenodd"
								d="M6 5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H6Zm.245 2.187a.75.75 0 0 0-.99 1.126l6.25 5.5a.75.75 0 0 0 .99 0l6.25-5.5a.75.75 0 0 0-.99-1.126L12 12.251 6.245 7.187Z"
							></path>
						</svg>
						<span className="ml-4">{config.email}</span>
					</a>
				</li>
			</ul>
		</article>
	);
}
