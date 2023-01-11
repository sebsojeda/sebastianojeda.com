import Link from "next/link";

/**
 * Props for the `SnippetPreview` component.
 *
 * @typedef {object} SnippetPreviewProps
 * @property {string} slug - Slugified snippet name.
 * @property {string} title - Snippet name.
 * @property {string} description - Snippet description.
 */

/**
 * A simple tile with information about the code snippet.
 *
 * @param {SnippetPreviewProps} props - {@link SnippetPreviewProps}
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
