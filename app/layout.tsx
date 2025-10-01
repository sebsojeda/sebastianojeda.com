import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import Link from "next/link";
import * as config from "@/lib/config";
import "./globals.css";
import { ScrollToHash, ThemeScript, ThemeToggle } from "@/components";

const interSans = Inter({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-inter",
});

const robotoMono = Roboto_Mono({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-roboto-mono",
});

export const metadata: Metadata = {
	title: {
		default: config.title,
		template: `%s | ${config.title}`,
	},
	description: config.description,
	openGraph: {
		title: config.title,
		description: config.description,
		url: config.url,
		siteName: config.title,
		locale: "en_US",
		type: "website",
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<ThemeScript />
			</head>
			<body
				className={`${interSans.variable} ${robotoMono.variable} antialiased h-full text-zinc-950 dark:text-white dark:bg-zinc-900 flex flex-col px-4 mx-auto max-w-prose scroll-smooth font-sans`}
			>
				<nav className="flex items-center justify-between pt-2 pb-6 md:pt-3 md:pb-8">
					<Link className="p-2 -ml-2 rounded-md md:text-lg" href="/">
						<b>{config.title}</b>
					</Link>
					<div className="relative flex items-center gap-1 font-mono text-sm md:gap-2">
						<ThemeToggle />
						<ul className="flex items-center gap-1">
							<li>
								<Link
									className="p-2 rounded-sm hover:bg-zinc-100 dark:hover:bg-zinc-800"
									href="/about"
								>
									About
								</Link>
							</li>
							<li>
								<a
									className="flex items-center gap-1 p-2 -mr-2 rounded-sm hover:bg-zinc-100 dark:hover:bg-zinc-800"
									href={`https://x.com/${config.twitter}`}
									target="_blank"
									rel="noopener noreferrer"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="16"
										height="16"
										viewBox="0 0 24 24"
										fill="currentColor"
									>
										<title>Follow on X</title>
										<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
									</svg>
									<span>Follow</span>
								</a>
							</li>
						</ul>
					</div>
				</nav>
				<main className="grow">{children}</main>
				<ScrollToHash />
				<footer className="flex justify-between pt-8 pb-4 font-mono text-sm text-zinc-400">
					<span>
						<span>{config.title}</span>{" "}
						<a
							className="underline underline-offset-2 hover:text-zinc-500 dark:hover:text-zinc-300"
							href={`https://x.com/${config.twitter}`}
						>
							@{config.twitter}
						</a>
					</span>
					<a
						className="hover:text-zinc-500 dark:hover:text-zinc-300"
						href="https://github.com/sebsojeda/sebastianojeda.com"
					>
						Source
					</a>
				</footer>
				<Analytics />
				<SpeedInsights />
			</body>
		</html>
	);
}
