import Image from "next/image";
import Link from "next/link";
import PostsList from "../components/PostsList";
import Title from "../components/Title";
import getPosts from "../utils/getPosts";

/**
 * The `/` page.
 */
export default async function HomePage() {
  const POSTS_LIMIT = 5;
  const posts = await getPosts(POSTS_LIMIT);

  return (
    <>
      <div className="flex mb-16 flex-col md:flex-row-reverse">
        <div className="md:w-28 w-20 shrink-0">
          <Image
            src="/images/sebastian-ojeda.png"
            height={112}
            width={112}
            alt="Headshot of Sebastian Ojeda"
            className="rounded-full"
          />
        </div>
        <div className="pt-5 md:pt-0 md:pr-8">
          <Title text="Sebastian Ojeda" gradient="cyan" />
          <h2>Developer and creative coder.</h2>
          <p className="text-neutral-500 dark:text-neutral-400 pt-5">
            I make it my mission to deliver value through user-centered tools,
            applications, and seamless integration with the cloud. If you’d
            like, you can learn more{" "}
            <Link
              href="/about"
              className="text-blue-500 hover:text-blue-600 underline underline-offset-1"
            >
              about me here.
            </Link>
          </p>
        </div>
      </div>
      <div className="mb-16">
        <h3 className="font-bold text-3xl">Recently Published</h3>
        <PostsList posts={posts} />
      </div>
    </>
  );
}
