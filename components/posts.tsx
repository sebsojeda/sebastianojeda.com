import Link from "next/link";
import { formatDate } from "@/lib/format-date";
import type { PostList } from "@/lib/types";

type PostsProps = {
	posts: PostList;
};

export default function Posts({ posts }: PostsProps) {
	return (
		<ul className="space-y-8">
			{posts.map((post) => (
				<li key={post.slug}>
					<Link
						className="group block space-y-4 hover:bg-zinc-100 dark:hover:bg-zinc-800 py-3 rounded-md transition-colors duration-200"
						href={post.slug}
						title={post.metadata.title}
					>
						<div className="flex items-center gap-2 text-zinc-500 text-sm">
							<div className="bg-zinc-200 dark:bg-zinc-700 rounded-full w-[2px] h-4"></div>
							{formatDate(post.metadata.date)}
						</div>
						<div>
							<div className="tracking-tight">{post.metadata.title}</div>
							<div className="text-zinc-500 text-sm">
								{post.metadata.description}
							</div>
						</div>
						<div className="font-medium text-zinc-400 dark:group-hover:text-zinc-300 group-hover:text-zinc-600 text-sm transition-colors duration-200">
							Read article &rsaquo;
						</div>
					</Link>
				</li>
			))}
		</ul>
	);
}
