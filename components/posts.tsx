"use client";

import Link from "next/link";
import { useState } from "react";
import { formatDate } from "@/lib/format-date";
import type { PostList } from "@/lib/types";

type PostsProps = {
	posts: PostList;
};

export default function Posts({ posts }: PostsProps) {
	const [sortBy, setSortBy] = useState("");
	const [sortOrder, setSortOrder] = useState("");

	const sortPosts = (by: string) => {
		const options = ["", "asc", "desc"];
		let order =
			options[
				by === sortBy ? (options.indexOf(sortOrder) + 1) % options.length : 1
			];

		posts = posts.sort((a, b) => {
			if (by === "title") {
				if (order === "asc")
					return a.metadata.title.localeCompare(b.metadata.title);
				if (order === "desc")
					return b.metadata.title.localeCompare(a.metadata.title);
			}
			if (by === "date") {
				if (order === "asc")
					return a.metadata.date.getTime() - b.metadata.date.getTime();
				if (order === "desc") {
					order = "";
					return b.metadata.date.getTime() - a.metadata.date.getTime();
				}
			}
			return b.metadata.date.getTime() - a.metadata.date.getTime();
		});
		setSortBy(by);
		setSortOrder(order);
	};
	return (
		<>
			<header className="flex items-end justify-between pb-3 font-mono text-xs text-zinc-500">
				<button type="button" onClick={() => sortPosts("title")}>
					{sortBy === "title" && sortOrder === "asc" ? (
						<span className="text-zinc-400">title &uarr;</span>
					) : sortBy === "title" && sortOrder === "desc" ? (
						<span className="text-zinc-400">title &darr;</span>
					) : (
						<span>title</span>
					)}
				</button>
				<button type="button" onClick={() => sortPosts("date")}>
					{sortBy === "date" && sortOrder === "asc" ? (
						<span className="text-zinc-400">&uarr; date</span>
					) : (
						<span>date</span>
					)}
				</button>
			</header>
			<ul className="font-mono">
				{posts.map((post) => (
					<li
						key={post.slug}
						className="border-t border-t-zinc-200 dark:border-t-zinc-700"
					>
						<Link
							className="flex items-center gap-2 py-3 hover:bg-zinc-100 dark:hover:bg-zinc-800"
							title={post.metadata.title}
							href={post.slug}
						>
							<span className="text-sm truncate grow">
								{post.metadata.title}
							</span>
							<span className="text-xs text-zinc-500 whitespace-nowrap">
								{formatDate(post.metadata.date)}
							</span>
						</Link>
					</li>
				))}
			</ul>
		</>
	);
}
