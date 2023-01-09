import Title from "../../components/title";
import Meta from "../../components/meta";
import SnippetsList from "../../components/snippets-list";
import { listGists } from "../../lib/github";

type SnippetsProps = {
  snippets: {
    id: string;
    title: string;
    slug: string;
    description: string;
  }[];
};

export default function Snippets(props: SnippetsProps) {
  return (
    <>
      <Meta
        title="Code Snippets"
        description="These are snippets I've come across and reference from time to time. I hope you find them as useful as I have."
      />
      <Title text="Snippets" gradient="pink" />
      <p className="text-accent-5 pt-5">
        These are snippets I&apos;ve come across and reference from time to
        time. I hope you find them as useful as I have.
      </p>
      <SnippetsList snippets={props.snippets} />
    </>
  );
}

export async function getStaticProps() {
  const snippets = await listGists();

  return {
    props: { snippets },
  };
}
