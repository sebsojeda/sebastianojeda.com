import { getAllFilesFrontMatter, getFileBySlug } from "../../lib/mdx";
import { getMDXComponent } from "mdx-bundler/client";
import React from "react";
import PostHeader from "../../components/post-header";
import Mdx from "../../components/mdx";
import DateFormatter from "../../components/date-formatter";
import Layout from "../../components/layout";
import { css } from "@emotion/react";
import Image from "next/image";

interface BlogProps {
  post: {
    frontmatter: {
      title: string;
      date: string;
      abstract: string;
      image: string;
    };
    code: string;
  };
}

const Styles = {
  date: css`
    margin: 2rem 0 3rem 0;
    color: var(--color-accent-5);
  `,
  postImage: css`
    width: 100%;

    & > div {
      position: unset !important;
      border-radius: 5px;
      img {
        object-fit: contain;
        width: 100% !important;
        position: relative !important;
        height: unset !important;
      }
    }
  `,
};

export default function Blog(props: BlogProps) {
  const PostBody = React.useMemo(
    () => getMDXComponent(props.post.code),
    [props.post.code]
  );
  return (
    <Layout>
      <PostHeader title={props.post.frontmatter.title} />
      {props.post.frontmatter.image && (
        <div css={Styles.postImage}>
          <Image
            src={props.post.frontmatter.image}
            alt="Post hero"
            layout="fill"
          />
        </div>
      )}
      <PostBody components={Mdx} />
      <div css={Styles.date}>
        Published on <DateFormatter dateString={props.post.frontmatter.date} />
      </div>
    </Layout>
  );
}

export async function getStaticProps({ params }: { params: any }) {
  const { frontmatter, code, timeToRead } = await getFileBySlug(
    "_posts",
    params.slug
  );

  return {
    props: {
      post: {
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
