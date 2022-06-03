import Title from "./title";
import PageViews from "./page-views";
import Twitter from "./icons/twitter";
import { useRouter } from "next/router";
import Reddit from "./icons/reddit";
import Image from "next/image";

type PostHeaderProps = {
  title: string;
  timeToRead: string;
  slug: string;
};

export default function PostHeader(props: PostHeaderProps) {
  const router = useRouter();
  return (
    <>
      <Title text={props.title} />
      <div className="text-accent-7 my-8 flex flex-col md:flex-row md:space-x-2">
        <div className="flex items-center space-x-2">
          <Image
            src="/images/sebastian-ojeda.jpeg"
            className="rounded-full"
            height={24}
            width={24}
            alt="Headshot of Sebastian Ojeda"
          />
          <span>Sebastian Ojeda</span>
        </div>
        <span className="hidden md:inline">/</span>
        <div className="flex items-center justify-between flex-grow">
          <span>
            <span>{props.timeToRead}</span> • <PageViews slug={props.slug} />
          </span>
          <span className="flex items-center space-x-4">
            <a
              href={`https://twitter.com/intent/tweet?url=https://www.sebastianojeda.com${router.asPath}`}
              target="_blank"
              rel="noreferrer"
            >
              <Twitter size={18} />
            </a>
            <a
              href={`https://reddit.com/submit?url=https://www.sebastianojeda.com${router.asPath}`}
              target="_blank"
              rel="noreferrer"
            >
              <Reddit size={18} />
            </a>
          </span>
        </div>
      </div>
    </>
  );
}
