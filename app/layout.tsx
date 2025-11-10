import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import * as config from "@/lib/config";
import "./globals.css";
import { ThemeScript, ThemeToggle } from "@/components";

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

export default function RootLayout({ children }: LayoutProps<"/">) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<ThemeScript />
			</head>
			<body
				className={`${interSans.variable} ${robotoMono.variable} mx-auto px-4 md:px-0 w-full max-w-prose bg-white dark:bg-zinc-900 antialiased text-zinc-950 dark:text-white scroll-smooth font-sans border-zinc-200 dark:border-zinc-700`}
			>
				<header className="flex justify-between my-4">
					<Link href="/">
						<Image
							src="/images/side-profile.png"
							alt={config.title}
							width={36}
							height={36}
							className="rounded-full"
							priority
						/>
					</Link>
					<div className="flex items-center gap-1 md:gap-2">
						<ThemeToggle />
						<nav className="text-sm">
							<ul className="flex justify-between items-center gap-1 md:gap-2">
								<li>
									<Link
										className="hover:bg-zinc-100 dark:hover:bg-zinc-800 p-2 rounded-sm transition-colors duration-200"
										href="/about"
									>
										About
									</Link>
								</li>
							</ul>
						</nav>
					</div>
				</header>
				<main className="my-14">{children}</main>
				<footer className="flex justify-between my-4 text-zinc-400 text-sm">
					<div>
						<span>{config.title}</span>
					</div>
					<a
						className="hover:text-zinc-500 dark:hover:text-zinc-300"
						href="https://github.com/sebsojeda/sebastianojeda.com"
						rel="noopener noreferrer"
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
