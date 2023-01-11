import SnippetPreview from "./SnippetPreview";

/**
 * A snippet object.
 *
 * @typedef {object} Snippet
 * @property {string} id - The GitHub id of the snippet.
 * @property {string} title - The snippet name.
 * @property {string} slug - A slugified version of the snippet name.
 * @property {string} description - The snippet description.
 */

/**
 * Props for the `SnippetList` component.
 *
 * @typedef {object} SnippetsListProps
 * @property {Snippet[]} snippets - A list of snippet objects.
 */

/**
 * A list of all the GitHub gists (snippets).
 *
 * @param {SnippetsListProps} props - {@link SnippetsListProps}
 */
export default function SnippetsList(props) {
  return (
    <div className="my-16 grid grid-cols-1 gap-4 md:grid-cols-2">
      {props.snippets.map((snippet) => (
        <SnippetPreview
          key={snippet.id}
          title={snippet.title}
          description={snippet.description}
          slug={snippet.slug}
        />
      ))}
    </div>
  );
}
