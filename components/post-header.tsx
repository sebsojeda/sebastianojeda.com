import Title from "./title";
import PageViews from "./page-views";

type PostHeaderProps = {
  title: string;
  timeToRead: string;
  slug: string;
};

export default function PostHeader(props: PostHeaderProps) {
  return (
    <>
      <Title text={props.title} />
      <div className="text-accent-5 text-sm my-8">
        <span>{props.timeToRead}</span> • <PageViews slug={props.slug} />
      </div>
    </>
  );
}
