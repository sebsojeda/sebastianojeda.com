import Head from "next/head";
import { getRecentPosts } from "../lib/api";
import PostPreview from "../components/post-preview";
import HomeLayout from "../components/layouts/home-layout";
import PostsList from "../components/posts-list";

export interface HomeProps {
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

export default function Home({ posts }: HomeProps) {
  return (
    <HomeLayout>
      <Head>
        <title>Sebastian Ojeda</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="relative grid grid-cols-3 gap-8 pb-8">
        <div className="col-span-2">
          <h1 className="text-md pb-8 pt-32 uppercase text-red">
            Recently published
          </h1>
          <PostsList posts={posts} />
        </div>
        <div>
          <h1 className="text-md pb-8 pt-32 uppercase text-red">Categories</h1>
        </div>
      </div>
    </HomeLayout>
  );
}

export async function getStaticProps() {
  const posts = getRecentPosts(20);

  return {
    props: { posts },
  };
}
