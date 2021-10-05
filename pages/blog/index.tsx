import { css } from "@emotion/react";
import { useState } from "react";
import Header from "../../components/header";
import Layout from "../../components/layout";
import PostsList from "../../components/posts-list";
import Search from "../../components/search";
import { getAllFilesFrontMatter } from "../../lib/mdx";

interface PostsProps {
  posts: {
    frontmatter: {
      title: string;
      date: string;
      abstract: string;
    };
    slug: string;
    timeToRead: string;
  }[];
}

const Styles = {
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
    <Layout>
      <Header>
        <h1>Blog</h1>
        <Search onChange={(e) => setQuery(e.target.value)} value={query} />
      </Header>
      <div css={Styles.results}>
        <PostsList posts={results} />
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const posts = getAllFilesFrontMatter("_posts");

  return {
    props: { posts },
  };
}
