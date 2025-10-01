"use client";

import { useEffect } from "react";

export function ScrollToHash() {
	useEffect(() => {
		if (window?.location.hash) {
			const id = window.location.hash.slice(1);
			const el = document.getElementById(id);
			if (el) {
				el.scrollIntoView({
					behavior: "smooth",
					block: "start",
					inline: "nearest",
				});
			}
		}
	}, []);

	return null;
}
