import SnippetPreview from "./snippet-preview";

/**
 * @typedef {object} Snippet
 * @property {string} id
 * @property {string} title
 * @property {string} slug
 * @property {string} description
 */

/**
 * @typedef {object} SnippetsListProps
 * @property {Snippet[]} snippets
 */

/**
 * @param {SnippetsListProps} props
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
