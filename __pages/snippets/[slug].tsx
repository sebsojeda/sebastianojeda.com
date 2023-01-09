import { getGistById, listGists } from "../../lib/github";
import fs from "fs";
import path from "path";
import Meta from "../../components/meta";
import Title from "../../components/title";
import Code from "../../components/code";

type SnippetProps = {
  snippet: {
    title: string;
    slug: string;
    description: string;
    id: string;
    url: string;
    files: {
      filename: string;
      content: string;
      language: string;
    }[];
  };
};

export default function Snippet(props: SnippetProps) {
  return (
    <>
      <Meta
        title={props.snippet.title}
        description={props.snippet.description}
      />
      <Title text={props.snippet.title} />
      <p className="text-accent-5 pt-5">{props.snippet.description}</p>
      <div className="grid grid-cols-1 space-y-4 my-8">
        {props.snippet.files.map((file) => (
          <Code
            key={file.filename}
            content={file.content}
            filename={file.filename}
            language={file.language}
          />
        ))}
      </div>
      <a
        href={props.snippet.url}
        className="text-success hover:text-success-dark underline underline-offset-1 mb-16 inline-block"
      >
        View in GitHub
      </a>
    </>
  );
}

export async function getStaticProps({ params: { slug } }: any) {
  const data = fs
    .readFileSync(path.join(__filename, "../../../../cache/gists.json"))
    .toString();
  const gists = JSON.parse(data);
  const gist = gists.filter((gist: any) => gist.slug === slug)[0];
  const snippet = await getGistById(gist.id);
  const files = Object.entries(snippet.files).map(([_, file]) => file);

  return {
    props: {
      snippet: {
        ...gist,
        files,
        url: snippet.html_url,
      },
    },
  };
}

export async function getStaticPaths() {
  const gists = await listGists();
  fs.writeFileSync(
    path.join(__filename, "../../../../cache/gists.json"),
    JSON.stringify(gists)
  );

  return {
    paths: gists.map((gist) => {
      return {
        params: {
          slug: gist.slug,
        },
      };
    }),
    fallback: false,
  };
}
