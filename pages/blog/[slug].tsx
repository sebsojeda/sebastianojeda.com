import { getAllFilesFrontMatter, getFileBySlug } from "../../lib/mdx";
import { getMDXComponent } from "mdx-bundler/client";
import React from "react";
import PostHeader from "../../components/post-header";
import Mdx from "../../components/mdx";
import DateFormatter from "../../components/date-formatter";
import Image from "next/image";
import Likes from "../../components/likes";
import Meta from "../../components/meta";
import { useTheme } from "../../components/theme-provider";

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

export default function Post(props: PostProps) {
  const { colorMode, systemPreference } = useTheme();
  const isDark =
    colorMode === "dark" ||
    (colorMode === "system" && systemPreference === "dark");
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
      <Likes slug={props.post.slug} />
      <PostHeader
        title={props.post.frontmatter.title}
        timeToRead={props.post.timeToRead}
        slug={props.post.slug}
      />
      {props.post.frontmatter.image && (
        <div className="my-8">
          <Image
            src={props.post.frontmatter.image}
            alt={props.post.frontmatter.title}
            width="1200"
            height="500"
            className="rounded-lg"
            layout="responsive"
          />
        </div>
      )}
      <article className={`prose max-w-none ${isDark && "prose-invert"}`}>
        <PostBody components={Mdx} />
      </article>
      <div className="text-accent-5 my-16">
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
