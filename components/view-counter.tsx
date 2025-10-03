"use client";

import { useEffect, useRef, useState } from "react";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function useAnimatedCounter(targetValue: number, duration = 1000) {
	const [displayValue, setDisplayValue] = useState(targetValue);
	const [prevTarget, setPrevTarget] = useState(targetValue);

	useEffect(() => {
		if (targetValue === prevTarget) return;

		const startValue = displayValue;
		const difference = targetValue - startValue;
		const startTime = Date.now();

		const animate = () => {
			const elapsed = Date.now() - startTime;
			const progress = Math.min(elapsed / duration, 1);

			const easeOut = 1 - (1 - progress) ** 3;
			const currentValue = Math.round(startValue + difference * easeOut);

			setDisplayValue(currentValue);

			if (progress < 1) {
				requestAnimationFrame(animate);
			} else {
				setPrevTarget(targetValue);
			}
		};

		requestAnimationFrame(animate);
	}, [targetValue, displayValue, prevTarget, duration]);

	return displayValue;
}

export function ViewCounter({ slug }: { slug: string }) {
	const incrementedRef = useRef(false);

	const { data, error } = useSWR<{ views: number }>(
		`/api/views/${slug}`,
		fetcher,
		{
			refreshInterval: 30000,
			revalidateOnFocus: true,
			dedupingInterval: 5000,
		},
	);

	const animatedViews = useAnimatedCounter(data?.views || 0, 800);

	useEffect(() => {
		if (!incrementedRef.current) {
			incrementedRef.current = true;
			fetch(`/api/views/${slug}`, { method: "POST" }).catch((err) => {
				console.error("Failed to increment views:", err);
			});
		}
	}, [slug]);

	useEffect(() => {
		if (error) {
			console.error("Failed to fetch views:", error);
		}
	}, [error]);

	return (
		<span className="tabular-nums">{animatedViews.toLocaleString()} views</span>
	);
}
