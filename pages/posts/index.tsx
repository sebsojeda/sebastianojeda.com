import PostsLayout from "../../components/layouts/posts-layout";
import PostPreview from "../../components/post-preview";
import PostsList from "../../components/posts-list";
import { getAllPosts } from "../../lib/api";

export interface PostsProps {
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

export default function Posts({ posts }: PostsProps) {
  return (
    <PostsLayout>
      <h1 className="text-4xl font-bold py-4">Posts</h1>
      <PostsList posts={posts} />
    </PostsLayout>
  );
}

export async function getStaticProps() {
  const posts = getAllPosts();

  return {
    props: { posts },
  };
}
