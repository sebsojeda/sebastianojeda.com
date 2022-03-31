import { useState } from "react";
import PostsList from "../../components/posts-list";
import Search from "../../components/search";
import { getAllFilesFrontMatter } from "../../lib/mdx";
import Meta from "../../components/meta";
import Title from "../../components/title";

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

export default function Posts(props: PostsProps) {
  const [query, setQuery] = useState("");
  const results = props.posts.filter((post) =>
    post.frontmatter.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      <Meta
        title="Blog"
        description="I've been writing on and off for the past few years on different platforms but decided to gather my thoughts in one place. I like to write about my successes in development and various computer science topics that interest me."
      />
      <Title text="Blog" gradient="pink" />
      <p className="pt-5 text-accent-5">
        I&apos;ve been writing on and off for the past few years on different
        platforms but decided to gather my thoughts in one place. I like to
        write about my successes in development and various computer science
        topics that interest me.
      </p>
      <Search onChange={(e) => setQuery(e.target.value)} value={query} />
      <div className="mb-16">
        <PostsList posts={results} />
      </div>
    </>
  );
}

export async function getStaticProps() {
  const posts = getAllFilesFrontMatter("blog");

  return {
    props: { posts },
  };
}
