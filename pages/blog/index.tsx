import { css } from "@emotion/react";
import { useState } from "react";
import Header from "../../components/header";
import PostsList from "../../components/posts-list";
import Search from "../../components/search";
import { getAllFilesFrontMatter } from "../../lib/mdx";
import Head from "next/head";

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
};

export default function Posts(props: PostsProps) {
  const [query, setQuery] = useState("");
  const results = props.posts.filter((post) =>
    post.frontmatter.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      <Head>
        <title>Blog</title>
      </Head>
      <Header>
        <h1 css={Styles.headerText}>Blog</h1>
        <p
          css={css`
            color: var(--color-accent-5);
            line-height: 1.5rem;
          `}
        >
          I&apos;ve been writing on and off for the past few years on different
          platforms but decided to gather my thoughts in one place. I like to
          write about my successes in development and various computer science
          topics that interest me.
        </p>
        <Search onChange={(e) => setQuery(e.target.value)} value={query} />
      </Header>
      <PostsList posts={results} />
    </>
  );
}

export async function getStaticProps() {
  const posts = getAllFilesFrontMatter("blog");

  return {
    props: { posts },
  };
}
