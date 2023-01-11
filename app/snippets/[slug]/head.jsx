import { getGist } from "../../../utils/getGist";
import Meta from "../../components/Meta";

/**
 * Props for the `SnippetsCodeHead` component.
 *
 * @typedef {object} SnippetsCodeHeadProps
 * @property {{[key: string]: any}} params - The dynamic route parameters object from the root segment down to that page.
 */

/**
 * Head for the `/snippets/[slug]` page.
 *
 * @param {SnippetsCodeHeadProps} props - {@link SnippetsCodeHeadProps}
 */
export default async function SnippetsCodeHead({ params }) {
  const { slug } = params;
  const snippet = await getGist(slug);
  return (
    <Meta
      title={snippet.title}
      description={snippet.description}
      path={`/snippets/${slug}`}
    />
  );
}
