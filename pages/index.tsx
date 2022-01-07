import { getAllFilesFrontMatter } from "../lib/mdx";
import PostsList from "../components/posts-list";
import { css } from "@emotion/react";
import Header from "../components/header";
import Link from "next/link";
import Image from "next/image";
import Meta from "../components/meta";

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
    z-index: -1;
  `,
  imageContainer: css`
    width: 80px;
    flex-shrink: 0;
    @media only screen and (min-width: 530px) {
      width: 100px;
      padding-left: 2rem;
    }
    @media only screen and (min-width: 769px) {
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
  title: css`
    margin: 1rem 0 0.25rem 0;
    font-size: 1.75rem;
    @media only screen and (min-width: 530px) {
      margin: 0 0 0.25rem 0;
      font-size: 2rem;
    }
    @media only screen and (min-width: 769px) {
      margin: 0 0 0.25rem 0;
      font-size: 3rem;
    }
  `,
  subtitle: css`
    margin-top: 0;
  `,
};

export default function Home(props: HomeProps) {
  return (
    <>
      <Meta
        title="Sebastian Ojeda - Developer and creative coder."
        description="I make it my mission to deliver value through user-centered tools, applications, and seamless integration with the cloud."
      />
      <div>
        <Header>
          <div css={Styles.header}>
            <div>
              <h1 css={Styles.title}>Sebastian Ojeda</h1>
              <p css={Styles.subtitle}>Developer and creative coder.</p>
              <p css={Styles.subHeader}>
                I make it my mission to deliver value through user-centered
                tools, applications, and seamless integration with the cloud. If
                you’d like, you can learn more{" "}
                <Link href="/about" passHref>
                  <a css={Styles.link}>about me here.</a>
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
          <h1 css={Styles.postsHeader}>Recently published</h1>
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
