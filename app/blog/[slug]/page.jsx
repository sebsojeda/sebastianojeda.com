import Image from "next/image";
import getPost from "../../../utils/getPost";
import getPosts from "../../../utils/getPosts";
import viewPost from "../../../utils/viewPost";
import DateFormatter from "../../components/DateFormatter";
import PostContent from "../../components/PostContent";
import PostHeader from "../../components/PostHeader";

/**
 * Props for the `BlogPostPage` component.
 *
 * @typedef {object} BlogPostPageProps
 * @property {{[key: string]: any}} params - The dynamic route parameters object from the root segment down to that page.
 */

/**
 * The `/blog/[slug]` page.
 *
 * @param {BlogPostPageProps} props - {@link BlogPostPageProps}
 */
export default async function BlogPostPage({ params }) {
  const { slug } = params;
  const { mdxSource, frontmatter, timeToRead } = await getPost(slug);
  viewPost(slug);

  return (
    <>
      <PostHeader
        title={frontmatter.title}
        timeToRead={timeToRead}
        slug={slug}
      />
      {frontmatter.image && (
        <div className="my-8">
          <Image
            priority
            src={frontmatter.image}
            alt={frontmatter.title}
            width="1200"
            height="500"
            className="rounded-lg"
          />
        </div>
      )}
      <article className={`prose dark:prose-invert max-w-none`}>
        <PostContent source={mdxSource} />
      </article>
      <div className="text-neutral-600 dark:text-neutral-300 my-16">
        Published on <DateFormatter dateString={frontmatter.date} />
      </div>
    </>
  );
}

/**
 * Reads all `.mdx` files in the `content/blog` folder.
 *
 * @return An array containing the slug for each file.
 */
export async function generateStaticParams() {
  const posts = await getPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}
