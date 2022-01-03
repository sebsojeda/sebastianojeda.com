import { getAllFilesFrontMatter, getFileBySlug } from "../../lib/mdx";
import { getMDXComponent } from "mdx-bundler/client";
import React from "react";
import PostHeader from "../../components/post-header";
import Mdx from "../../components/mdx";
import DateFormatter from "../../components/date-formatter";
import { css } from "@emotion/react";
import Image from "next/image";
import Likes from "../../components/likes";
import Meta from "../../components/meta";

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
    span {
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
    <>
      <Meta
        title={props.post.frontmatter.title}
        description={props.post.frontmatter.abstract}
        image={props.post.frontmatter.image}
      />
      <Likes slug={props.post.slug} css={Styles.likes} />
      <PostHeader
        title={props.post.frontmatter.title}
        timeToRead={props.post.timeToRead}
        slug={props.post.slug}
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
    </>
  );
}

export async function getStaticProps({ params: { slug } }: any) {
  const { frontmatter, code, timeToRead } = await getFileBySlug("blog", slug);

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
  const posts = getAllFilesFrontMatter("blog");

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
