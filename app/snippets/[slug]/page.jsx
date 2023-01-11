import { notFound } from "next/navigation";
import Code from "../../../components/Code";
import Meta from "../../../components/Meta";
import Title from "../../../components/Title";
import { getGist } from "../../../utils/getGist";

/**
 * Props for the `SnippetsCodePage` component.
 *
 * @typedef {object} SnippetsCodePageProps
 * @property {{[key: string]: any}} params - See {@link https://beta.nextjs.org/docs/api-reference/file-conventions/page#props}.
 */

/**
 * The `/snippets/[slug]` page.
 *
 * @param {SnippetsCodePageProps} props - {@link SnippetsCodePageProps}
 */
export default async function SnippetsCodePage({ params }) {
  const snippet = await getGist(params.slug);
  if (!snippet) {
    notFound();
  }

  return (
    <>
      <Meta title={snippet.title} description={snippet.description} />
      <Title text={snippet.title} />
      <p className="text-neutral-500 dark:text-neutral-400 pt-5">
        {snippet.description}
      </p>
      <div className="grid grid-cols-1 space-y-4 my-8">
        {snippet.files.map((/** @type {any} */ file) => (
          <Code
            key={file.filename}
            content={file.content}
            filename={file.filename}
            language={file.language}
          />
        ))}
      </div>
      <a
        href={snippet.url}
        className="text-blue-500 hover:text-blue-600 underline underline-offset-1 mb-16 inline-block"
      >
        View in GitHub
      </a>
    </>
  );
}
