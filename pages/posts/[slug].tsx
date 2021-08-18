import { getAllPosts, getPostBySlug } from "../../lib/api";
import { getMDXComponent } from "mdx-bundler/client";
import React from "react";
import PostHeader from "../../components/post-header";
import PostsLayout from "../../components/layouts/posts-layout";
import mdx from "../../components/mdx";

export interface PostProps {
  post: {
    frontmatter: {
      title: string;
      date: string;
      abstract: string;
    };
    code: string;
    timeToRead: string;
  };
}

export default function Post({ post }: PostProps) {
  const PostBody = React.useMemo(() => getMDXComponent(post.code), [post.code]);

  return (
    <PostsLayout>
      <div className="py-8">
        <PostHeader
          title={post.frontmatter.title}
          date={post.frontmatter.date}
          timeToRead={post.timeToRead}
        />
        <PostBody components={mdx} />
      </div>
    </PostsLayout>
  );
}

export async function getStaticProps({ params }: { params: any }) {
  const { frontmatter, code, timeToRead } = await getPostBySlug(params.slug);

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
  const posts = getAllPosts();

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
