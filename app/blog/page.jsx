import getPosts from "../../utils/getPosts";
import PostsList from "../components/PostsList";
import Search from "../components/Search";
import Title from "../components/Title";

/**
 * The `/blog` page.
 */
export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <>
      <Title text="Blog" gradient="pink" />
      <p className="pt-5 text-neutral-500 dark:text-neutral-400">
        I&apos;ve been writing on and off for the past few years on different
        platforms but decided to gather my thoughts in one place. I like to
        write about my successes in development and various computer science
        topics that interest me.
      </p>
      <Search />
      <div className="mb-16">
        <PostsList posts={posts} />
      </div>
    </>
  );
}
