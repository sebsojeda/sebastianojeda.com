import Link from "next/link";

type SnippetPreviewProps = {
  slug: string;
  title: string;
  description: string;
};

export default function SnippetPreview(props: SnippetPreviewProps) {
  return (
    <Link href={`/snippets/${props.slug}`} passHref>
      <a className="p-4 rounded-lg border border-accent-2 flex flex-col">
        <h3 className="text-xl font-medium">{props.title}</h3>
        <p className="text-accent-5 py-2 grow">{props.description}</p>
        <div className="text-sm">
          View Code <span>&rarr;</span>
        </div>
      </a>
    </Link>
  );
}
