import DateFormatter from "./date-formatter";

export interface PostHeaderProps {
  date: string;
  title: string;
  timeToRead: string;
}

export default function PostHeader(props: PostHeaderProps) {
  return (
    <div>
      <h1 className="text-4xl font-bold mt-16">{props.title}</h1>
      <div className="mb-16">
        <DateFormatter dateString={props.date} /> &middot;{" "}
        <span>{props.timeToRead}</span>
      </div>
    </div>
  );
}
