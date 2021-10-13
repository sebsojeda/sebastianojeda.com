import { getAllFilesFrontMatter, getFileBySlug } from "../../lib/mdx";
import { getMDXComponent } from "mdx-bundler/client";
import React from "react";
import PostHeader from "../../components/post-header";
import Mdx from "../../components/mdx";
import DateFormatter from "../../components/date-formatter";
import { css } from "@emotion/react";
import Image from "next/image";
import Likes from "../../components/likes";
import AppLayout from "../../layouts/app-layout";
import Head from "next/head";

type PostProps = {
  post: {
    frontmatter: {
      title: string;
      date: string;
      abstract: string;
      image: string;
    };
    slug: string;
    code: string;
    timeToRead: string;
  };
};

const Styles = {
  date: css`
    margin: 2rem 0 3.5rem 0;
    color: var(--color-accent-5);
  `,
  postImage: css`
    margin: 2rem 0;
    div {
      position: unset !important;
      border-radius: 5px;
      img {
        height: unset !important;
        position: relative !important;
      }
    }
  `,
  likes: css``,
};

export default function Post(props: PostProps) {
  const PostBody = React.useMemo(
    () => getMDXComponent(props.post.code),
    [props.post.code]
  );
  return (
    <AppLayout>
      <Head>
        <title>{props.post.frontmatter.title}</title>
      </Head>
      <Likes slug={props.post.slug} css={Styles.likes} />
      <PostHeader
        title={props.post.frontmatter.title}
        timeToRead={props.post.timeToRead}
      />
      {props.post.frontmatter.image && (
        <div css={Styles.postImage}>
          <Image
            src={props.post.frontmatter.image}
            alt={props.post.frontmatter.title}
            layout="fill"
          />
        </div>
      )}
      <PostBody components={Mdx} />
      <div css={Styles.date}>
        Published on <DateFormatter dateString={props.post.frontmatter.date} />
      </div>
    </AppLayout>
  );
}

export async function getStaticProps({ params: { slug } }: any) {
  const { frontmatter, code, timeToRead } = await getFileBySlug("_posts", slug);

  return {
    props: {
      post: {
        slug,
        frontmatter,
        code,
        timeToRead,
      },
    },
  };
}

export async function getStaticPaths() {
  const posts = getAllFilesFrontMatter("_posts");

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
}
