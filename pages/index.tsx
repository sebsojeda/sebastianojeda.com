import Head from "next/head";
import { getAllFilesFrontMatter } from "../lib/mdx";
import PostsList from "../components/posts-list";
import { css } from "@emotion/react";
import Header from "../components/header";
import Link from "next/link";
import Image from "next/image";

type HomeProps = {
  posts: any[];
};

const Styles = {
  header: css`
    display: flex;
    flex-direction: column-reverse;
    padding-bottom: 5rem;
    @media only screen and (min-width: 530px) {
      flex-direction: row;
    }
  `,
  image: css`
    border-radius: 100%;
  `,
  imageContainer: css`
    width: 80px;
    flex-shrink: 0;
    @media only screen and (min-width: 530px) {
      margin-top: 20px;
      width: 120px;
      padding-left: 2rem;
    }
  `,
  postsHeader: css`
    display: inline-block;
    font-weight: bold;
    background: -webkit-linear-gradient(
      to right,
      var(--color-violet) 0%,
      var(--color-highlight-purple) 50%,
      var(--color-highlight-pink) 100%
    );
    background: -moz-linear-gradient(
      to right,
      var(--color-violet) 0%,
      var(--color-highlight-purple) 50%,
      var(--color-highlight-pink) 100%
    );
    background: linear-gradient(
      to right,
      var(--color-violet) 0%,
      var(--color-highlight-purple) 50%,
      var(--color-highlight-pink) 100%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  `,
  subHeader: css`
    color: var(--color-accent-5);
    line-height: 1.5rem;
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
    <>
      <Head>
        <title>Sebastian Ojeda</title>
        <meta
          name="description"
          content="Hi there, I'm Sebastian Ojeda. I’m a developer and creative coder. I make it my mission to deliver value through user-centered tools, applications, and seamless integration with the cloud."
        />
        {/* <meta property="og:image" content="" /> */}
      </Head>
      <div>
        <Header>
          <div css={Styles.header}>
            <div>
              <h1>
                Hi there 👋
                <br />
                I’m Sebastian Ojeda
              </h1>
              <p css={Styles.subHeader}>
                I’m a developer and creative coder. I make it my mission to
                deliver value through user-centered tools, applications, and
                seamless integration with the cloud. If you’d like, you can{" "}
                <Link href="/about" passHref>
                  <a css={Styles.link}>learn more about me here.</a>
                </Link>
              </p>
            </div>
            <div css={Styles.imageContainer}>
              <Image
                src="/images/sebastian-ojeda.jpeg"
                height={120}
                width={120}
                alt=""
                css={Styles.image}
              />
            </div>
          </div>
        </Header>
        <div>
          <h2 css={Styles.postsHeader}>Recently published</h2>
          <div css={Styles.posts}>
            <PostsList posts={props.posts} />
          </div>
        </div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const posts = getAllFilesFrontMatter("blog").slice(0, 5);

  return {
    props: { posts },
  };
}
