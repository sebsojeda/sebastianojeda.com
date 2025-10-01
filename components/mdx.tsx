import Link from "next/link";
import type { ComponentProps } from "react";

const slugify = (text: string) => {
	return text
		.toLowerCase()
		.replace(/[^\w\s-]/g, "")
		.replace(/\s+/g, "-")
		.trim();
};

const createLinkableHeading = (
	Tag: "h1" | "h2" | "h3" | "h4" | "h5" | "h6",
) => {
	return ({ children, className, ...props }: ComponentProps<typeof Tag>) => {
		const text = String(children);
		const id = slugify(text);

		return (
			<Tag id={id} className={`group relative ${className || ""}`} {...props}>
				<Link
					href={`#${id}`}
					className="no-underline"
					aria-label={`Link to ${text}`}
				>
					<span className="absolute -left-6 pr-4 top-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300">
						#
					</span>
					{children}
				</Link>
			</Tag>
		);
	};
};

export const mdxComponents = {
	h1: createLinkableHeading("h1"),
	h2: createLinkableHeading("h2"),
	h3: createLinkableHeading("h3"),
	h4: createLinkableHeading("h4"),
	h5: createLinkableHeading("h5"),
	h6: createLinkableHeading("h6"),
};
