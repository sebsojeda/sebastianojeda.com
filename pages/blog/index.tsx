import { css } from "@emotion/react";
import { useState } from "react";
import Header from "../../components/header";
import AppLayout from "../../layouts/app-layout";
import PostsList from "../../components/posts-list";
import Search from "../../components/search";
import { getAllFilesFrontMatter } from "../../lib/mdx";

type PostsProps = {
  posts: {
    frontmatter: {
      title: string;
      date: string;
      abstract: string;
    };
    slug: string;
    timeToRead: string;
  }[];
};

const Styles = {
  headerText: css`
    display: inline-block;
    font-weight: bold;
    background: -webkit-linear-gradient(
      to right,
      var(--color-success-dark) 0%,
      var(--color-success-light) 50%,
      var(--color-cyan) 100%
    );
    background: -moz-linear-gradient(
      to right,
      var(--color-success-dark) 0%,
      var(--color-success-light) 50%,
      var(--color-cyan) 100%
    );
    background: linear-gradient(
      to right,
      var(--color-success-dark) 0%,
      var(--color-success-light) 50%,
      var(--color-cyan) 100%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  `,
  results: css`
    margin-bottom: 3.5rem;
  `,
};

export default function Posts(props: PostsProps) {
  const [query, setQuery] = useState("");
  const results = props.posts.filter((post) =>
    post.frontmatter.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <AppLayout>
      <Header>
        <h1 css={Styles.headerText}>Blog</h1>
        <Search onChange={(e) => setQuery(e.target.value)} value={query} />
      </Header>
      <div css={Styles.results}>
        <PostsList posts={results} />
      </div>
    </AppLayout>
  );
}

export async function getStaticProps() {
  const posts = getAllFilesFrontMatter("_posts");

  return {
    props: { posts },
  };
}
