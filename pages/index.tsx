import Head from "next/head";
import { getAllFilesFrontMatter } from "../lib/mdx";
import PostsList from "../components/posts-list";
import { css } from "@emotion/react";
import Layout from "../components/layout";
import Header from "../components/header";
import Link from "next/link";

interface HomeProps {
  posts: any[];
}

const Styles = {
  postsHeader: css`
    color: var(--color-highlight-pink);
    font-weight: bold;
  `,
  subHeader: css`
    color: var(--color-accent-5);
    font-weight: 400;
    padding-bottom: 5rem;
  `,
  link: css`
    color: var(--color-success);
    text-decoration: underline;
    :hover {
      cursor: pointer;
      color: var(--color-success-dark);
    }
  `,
  posts: css`
    margin-bottom: 3.5rem;
  `,
};

export default function Home(props: HomeProps) {
  return (
    <Layout>
      <Head>
        <title>Sebastian Ojeda</title>
      </Head>
      <div>
        <Header>
          <h1>
            Hi there 👋
            <br />
            I’m Sebastian Ojeda
          </h1>
          <h4 css={Styles.subHeader}>
            I’m a developer and creative coder. I make it my mission to deliver
            value through user-centered tools, applications, and seamless
            integration with the cloud. If you’d like, you can{" "}
            <Link href="/about">
              <a css={Styles.link}>learn more about me here.</a>
            </Link>
          </h4>
        </Header>
        <div>
          <h2 css={Styles.postsHeader}>Recently published</h2>
          <div css={Styles.posts}>
            <PostsList posts={props.posts} />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const posts = getAllFilesFrontMatter("_posts").slice(0, 5);

  return {
    props: { posts },
  };
}
