import SnippetPreview from "./snippet-preview";

type SnippetsListProps = {
  snippets: {
    id: string;
    title: string;
    slug: string;
    description: string;
  }[];
};

export default function SnippetsList(props: SnippetsListProps) {
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
