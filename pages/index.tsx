import { getAllFilesFrontMatter } from "../lib/mdx";
import PostsList from "../components/posts-list";
import Title from "../components/title";
import Link from "next/link";
import Image from "next/image";
import Meta from "../components/meta";

type HomeProps = {
  posts: any[];
};

export default function Home(props: HomeProps) {
  return (
    <>
      <Meta
        title="Sebastian Ojeda - Developer and creative coder."
        description="I make it my mission to deliver value through user-centered tools, applications, and seamless integration with the cloud."
      />
      <div className="flex mb-16 flex-col md:flex-row-reverse">
        <div className="md:w-28 w-20 shrink-0">
          <Image
            src="/images/sebastian-ojeda.jpeg"
            height={112}
            width={112}
            alt="Headshot of Sebastian Ojeda"
            className="rounded-full -z-10"
          />
        </div>
        <div className="pt-5 md:pt-0 md:pr-8">
          <Title text="Sebastian Ojeda" gradient="cyan" />
          <h2>Developer and creative coder.</h2>
          <p className="text-accent-5 pt-5">
            I make it my mission to deliver value through user-centered tools,
            applications, and seamless integration with the cloud. If you’d
            like, you can learn more{" "}
            <Link href="/about" passHref>
              <a className="text-success hover:text-success-dark underline underline-offset-1">
                about me here.
              </a>
            </Link>
          </p>
        </div>
      </div>
      <div className="mb-16">
        <h3 className="font-bold text-3xl">Recently Published</h3>
        <PostsList posts={props.posts} />
      </div>
    </>
  );
}

export async function getStaticProps() {
  const posts = getAllFilesFrontMatter("blog").slice(0, 5);

  return {
    props: { posts },
  };
}
