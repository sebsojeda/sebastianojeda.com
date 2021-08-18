import Link from "next/link";
import DateFormatter from "./date-formatter";

export interface PostPreviewProps {
  title: string;
  date: string;
  abstract: string;
  slug: string;
  timeToRead: string;
}

export default function PostPreview(props: PostPreviewProps) {
  return (
    <Link href={`/posts/${props.slug}`}>
      <a className="group block">
        <h2 className="group-hover:text-tertiary text-xl font-semibold">
          {props.title}
        </h2>
        <DateFormatter dateString={props.date} /> &middot;{" "}
        <span>{props.timeToRead}</span>
        <p className="py-5">{props.abstract}</p>
        <span className="font-semibold">Read More </span>
        <span className="group-hover:opacity-100 text-tertiary opacity-0">
          &rarr;
        </span>
      </a>
    </Link>
  );
}
