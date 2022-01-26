import Link from "next/link";

type PostPreviewProps = {
  title: string;
  abstract: string;
  slug: string;
};

export default function PostPreview(props: PostPreviewProps) {
  return (
    <Link href={`/blog/${props.slug}`} passHref>
      <a>
        <h3 className="text-xl font-medium">{props.title}</h3>
        <p className="text-accent-5 py-2">{props.abstract}</p>
        <div className="text-sm">
          Read More <span>&rarr;</span>
        </div>
      </a>
    </Link>
  );
}
