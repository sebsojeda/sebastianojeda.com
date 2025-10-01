"use client";

import { useEffect, useState } from "react";
import { useMedia } from "./use-media";

export const useTheme = () => {
	const [theme, setTheme] = useState<string | null>(null);
	const prefersDark = useMedia("(prefers-color-scheme: dark)");

	useEffect(() => {
		setTheme(localStorage.getItem("theme") ?? "system");
	}, []);

	useEffect(() => {
		if (!theme) return;

		const shouldBeDark =
			theme === "dark" || (theme === "system" && prefersDark);

		if (shouldBeDark) {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
	}, [theme, prefersDark]);

	const toggleTheme = () => {
		if (!theme) return;

		const options = prefersDark
			? ["system", "light", "dark"]
			: ["system", "dark", "light"];
		const next = options[(options.indexOf(theme) + 1) % options.length];

		if (next === "system") {
			localStorage.removeItem("theme");
		} else {
			localStorage.setItem("theme", next);
		}
		setTheme(next);
	};

	return { theme, toggleTheme };
};
