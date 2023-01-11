import Link from "next/link";

/**
 * Props for the `PostPreview` component.
 *
 * @typedef {object} PostPreviewProps
 * @property {{[key: string]: any}} frontmatter - Parsed frontmatter from an `.mdx` file.
 * @property {string} slug - Filename without the extension.
 */

/**
 * A tile with some information about the article.
 *
 * @param {PostPreviewProps} props - {@link PostPreviewProps}
 */
export default function PostPreview({ frontmatter, slug }) {
  return (
    <Link href={`/blog/${slug}`} className="block">
      <h3 className="text-xl font-medium">{frontmatter.title}</h3>
      <p className="text-neutral-500 dark:text-neutral-400 py-2">
        {frontmatter.abstract}
      </p>
      <div className="text-sm">
        Read More <span>&rarr;</span>
      </div>
    </Link>
  );
}
