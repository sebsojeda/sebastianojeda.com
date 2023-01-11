import Image from "next/image";
import { usePathname } from "next/navigation";
import RedditIcon from "./icons/RedditIcon";
import TwitterIcon from "./icons/TwitterIcon";
import PageViews from "./PageViews";
import PostLikes from "./PostLikes";
import Title from "./Title";

/**
 * Props for the `PostHeader` component.
 *
 * @typedef {object} PostHeaderProps
 * @property {string} title - Article title.
 * @property {string} timeToRead - Approximate time to read the article.
 * @property {string} slug - Article slug.
 */

/**
 * The blog post header. Renders some article data as well as an image, if provided.
 *
 * @param {PostHeaderProps} props - {@link PostHeaderProps}
 */
export default function PostHeader(props) {
  const path = usePathname();
  return (
    <>
      <Title text={props.title} />
      <div className="text-neutral-500 dark:text-neutral-400 my-8 flex flex-col md:flex-row md:space-x-2">
        <div className="flex items-center space-x-2">
          <Image
            src="/images/sebastian-ojeda.png"
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
              <TwitterIcon size={18} />
            </a>
            <a
              href={`https://reddit.com/submit?url=https://www.sebastianojeda.com${path}`}
              target="_blank"
              rel="noreferrer"
            >
              <RedditIcon size={18} />
            </a>
          </span>
        </div>
      </div>
    </>
  );
}
