import Image from "next/image";
import { usePathname } from "next/navigation";
import PageViews from "../components/page-views";
import Title from "../components/Title";
import Reddit from "./icons/reddit";
import Twitter from "./icons/twitter";
import PostLikes from "./PostLikes";

/**
 *
 * @typedef {object} PostHeaderProps
 * @property {string} title
 * @property {string} timeToRead
 * @property {string} slug
 */

/**
 * @param {PostHeaderProps} props
 */
export default function PostHeader(props) {
  const path = usePathname();
  return (
    <>
      <Title text={props.title} />
      <div className="text-neutral-500 dark:text-neutral-400 my-8 flex flex-col md:flex-row md:space-x-2">
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
            <PostLikes slug={props.slug} />
          </span>
          <span className="flex items-center space-x-4">
            <a
              href={`https://twitter.com/intent/tweet?url=https://www.sebastianojeda.com${path}`}
              target="_blank"
              rel="noreferrer"
            >
              <Twitter size={18} />
            </a>
            <a
              href={`https://reddit.com/submit?url=https://www.sebastianojeda.com${path}`}
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
