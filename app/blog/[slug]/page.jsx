import Image from "next/image";
import DateFormatter from "../../../components/DateFormatter";
import Meta from "../../../components/Meta";
import PostContent from "../../../components/PostContent";
import PostHeader from "../../../components/PostHeader";
import getPost from "../../../utils/getPost";
import getPosts from "../../../utils/getPosts";
import viewPost from "../../../utils/viewPost";

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
  const { mdxSource: source, timeToRead } = await getPost(slug);
  viewPost(slug);

  return (
    <>
      <Meta
        title={source.frontmatter.title}
        description={source.frontmatter.abstract}
        image={source.frontmatter.image}
      />
      <PostHeader
        title={source.frontmatter.title}
        timeToRead={timeToRead}
        slug={slug}
      />
      {source.frontmatter.image && (
        <div className="my-8">
          <Image
            priority
            src={source.frontmatter.image}
            alt={source.frontmatter.title}
            width="1200"
            height="500"
            className="rounded-lg"
          />
        </div>
      )}
      <article className={`prose dark:prose-invert max-w-none`}>
        <PostContent source={source} />
      </article>
      <div className="text-neutral-600 dark:text-neutral-300 my-16">
        Published on <DateFormatter dateString={source.frontmatter.date} />
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
