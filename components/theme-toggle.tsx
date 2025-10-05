"use client";

import { useTheme } from "@/hooks";

const renderIcon = (theme: string | null) => {
	switch (theme) {
		case "light":
			return (
				<svg
					fill="none"
					height="16"
					shapeRendering="geometricPrecision"
					stroke="currentColor"
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="1.5"
					viewBox="0 0 24 24"
					width="16"
				>
					<title>Light mode</title>
					<circle cx="12" cy="12" r="5" />
					<path d="M12 1v2" />
					<path d="M12 21v2" />
					<path d="M4.22 4.22l1.42 1.42" />
					<path d="M18.36 18.36l1.42 1.42" />
					<path d="M1 12h2" />
					<path d="M21 12h2" />
					<path d="M4.22 19.78l1.42-1.42" />
					<path d="M18.36 5.64l1.42-1.42" />
				</svg>
			);
		case "dark":
			return (
				<svg
					fill="none"
					height="16"
					shapeRendering="geometricPrecision"
					stroke="currentColor"
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="1.5"
					viewBox="0 0 24 24"
					width="16"
				>
					<title>Dark mode</title>
					<path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
				</svg>
			);
		case "system":
			return (
				<svg
					fill="none"
					height="16"
					shapeRendering="geometricPrecision"
					stroke="currentColor"
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="1.5"
					viewBox="0 0 24 24"
					width="16"
				>
					<title>System theme</title>
					<path d="M2 13.381h20M8.66 19.05V22m6.84-2.95V22m-8.955 0h10.932M4 19.05h16a2 2 0 002-2V4a2 2 0 00-2-2H4a2 2 0 00-2 2v13.05a2 2 0 002 2z" />
				</svg>
			);
		default:
			return null;
	}
};

export function ThemeToggle() {
	const { theme, toggleTheme } = useTheme();

	if (!theme) {
		return <div className="w-8 h-8" />;
	}

	return (
		<div className="relative flex items-center gap-1 md:gap-2">
			<button
				className={`${
					theme !== "system"
						? "bg-zinc-100 dark:bg-zinc-800"
						: "hover:bg-zinc-100 dark:hover:bg-zinc-800"
				} p-2 rounded-sm peer animate-fade-in transition-colors duration-200`}
				type="button"
				aria-label="Toggle theme"
				onClick={toggleTheme}
			>
				{renderIcon(theme)}
			</button>
			<span className="invisible sm:peer-hover:visible md:inline -left-14 absolute opacity-0 w-12 text-zinc-500 text-xs text-right capitalize animate-fade-in">
				{theme}
			</span>
		</div>
	);
}
