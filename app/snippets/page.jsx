import SnippetsList from "../../components/SnippetsList";
import Title from "../../components/Title";
import getGists from "../../utils/getGists";

/**
 * The `/snippets` page.
 */
export default async function SnippetsPage() {
  const snippets = await getGists();

  return (
    <>
      <Title text="Snippets" gradient="green" />
      <p className="text-neutral-500 dark:text-neutral-400 pt-5">
        These are snippets I&apos;ve come across and reference from time to
        time. I hope you find them as useful as I have.
      </p>
      <SnippetsList snippets={snippets} />
    </>
  );
}
