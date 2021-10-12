import { getGistById, listGists } from "../../lib/github";
import fs from "fs";
import path from "path";
import { css } from "@emotion/react";
import AppLayout from "../../layouts/app-layout";
import SnippetCode from "../../components/snippet-code";
import SnippetHeader from "../../components/snippet-header";

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

const Styles = {
  container: css`
    background: var(--color-accent-1);
    position: relative;
    & > button {
      opacity: 0;
    }
    :hover > button {
      opacity: 1;
    }
  `,
  pre: css`
    margin-top: 0;
    margin-bottom: 1rem;
  `,
  code: css`
    font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
      DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
    border-bottom: 1px solid var(--color-accent-2);
    border-left: 1px solid var(--color-accent-2);
    border-right: 1px solid var(--color-accent-2);
    border-radius: 0 0 5px 5px;
    display: block;
    padding: 1rem 0;
    overflow: auto;
  `,
  metadata: css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: var(--color-accent-1);
    border-radius: 5px 5px 0 0;
    border: 1px solid var(--color-accent-2);
    margin-top: 1rem;
    padding: 0.5rem 1rem;
  `,
  language: css`
    text-transform: uppercase;
    user-select: none;
    color: var(--color-accent-5);
  `,
  filename: css`
    user-select: none;
    color: var(--color-accent-5);
  `,
  line: css`
    box-sizing: border-box;
    padding: 0 1rem;
    min-width: fit-content;
  `,
  copy: css`
    border: 1px solid var(--color-accent-2);
    color: var(--color-accent-2);
    background-color: var(--color-accent-1);
    position: absolute;
    border-radius: 5px;
    padding: 0.5rem;
    top: 2.75rem;
    right: 0.75rem;
    &:hover {
      cursor: pointer;
      border: 1px solid var(--color-accent-4);
      color: var(--color-accent-4);
    }
  `,
  check: css`
    border: 1px solid var(--color-success);
    color: var(--color-success);
    background-color: var(--color-accent-1);
    position: absolute;
    border-radius: 5px;
    padding: 0.5rem;
    top: 2.75rem;
    right: 0.75rem;
    &:hover {
      cursor: pointer;
    }
  `,
  link: css`
    margin: 2rem 0 3.5rem 0;
    display: inline-block;
    color: var(--color-success);
    :hover {
      color: var(--color-success-dark);
    }
  `,
};

export default function Snippet(props: SnippetProps) {
  return (
    <AppLayout>
      <SnippetHeader
        title={props.snippet.title}
        description={props.snippet.description}
      />
      {props.snippet.files.map((file) => (
        <SnippetCode
          key={file.filename}
          content={file.content}
          filename={file.filename}
          language={file.language}
        />
      ))}
      <a href={props.snippet.url} css={Styles.link}>
        View in GitHub
      </a>
    </AppLayout>
  );
}

export async function getStaticProps({ params: { slug } }: any) {
  const data = fs
    .readFileSync(path.join(__dirname, "../../../cache/gists.json"))
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
    path.join(__dirname, "../../../cache/gists.json"),
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
