import { css } from "@emotion/react";
import SnippetPreview from "./snippet-preview";

type SnippetsListProps = {
  snippets: {
    id: string;
    title: string;
    slug: string;
    description: string;
  }[];
};

const Styles = {
  wrapper: css`
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
    margin: 3.5rem 0;
    @media only screen and (min-width: 768px) {
      grid-template-columns: 1fr 1fr;
    }
  `,
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
