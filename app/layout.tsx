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
						<a
							className="flex items-center gap-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 -mr-2 p-2 rounded-sm text-sm transition-colors duration-200"
							href={`https://x.com/${config.twitter}`}
							rel="noopener noreferrer"
						>
							<svg
								viewBox="0 0 24 24"
								aria-hidden="true"
								className="w-5 h-5"
								fill="currentColor"
							>
								<title>Follow on X</title>
								<path d="M13.3174 10.7749L19.1457 4H17.7646L12.7039 9.88256L8.66193 4H4L10.1122 12.8955L4 20H5.38119L10.7254 13.7878L14.994 20H19.656L13.3171 10.7749H13.3174ZM11.4257 12.9738L10.8064 12.0881L5.87886 5.03974H8.00029L11.9769 10.728L12.5962 11.6137L17.7652 19.0075H15.6438L11.4257 12.9742V12.9738Z"></path>{" "}
							</svg>
							<span>Follow</span>
						</a>
					</div>
				</header>
				<main className="my-14">{children}</main>
				<footer className="flex justify-between my-4 text-zinc-400 text-sm">
					<div>
						<span>{config.title}</span>{" "}
						<a
							className="hover:text-zinc-500 dark:hover:text-zinc-300 underline underline-offset-2"
							href={`https://x.com/${config.twitter}`}
							rel="noopener noreferrer"
						>
							@{config.twitter}
						</a>
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
