import Link from "next/link";

/**
 * @typedef {object} SnippetPreviewProps
 * @property {string} slug
 * @property {string} title
 * @property {string} description
 */

/**
 * @param {SnippetPreviewProps} props
 */
export default function SnippetPreview(props) {
  return (
    <Link
      href={`/snippets/${props.slug}`}
      className="p-4 rounded-lg border dark:border-neutral-700 border-neutral-200 flex flex-col"
    >
      <h3 className="text-xl font-medium">{props.title}</h3>
      <p className="text-neutral-500 dark:text-neutral-400 py-2 grow">
        {props.description}
      </p>
      <div className="text-sm">
        View Code <span>&rarr;</span>
      </div>
    </Link>
  );
}
