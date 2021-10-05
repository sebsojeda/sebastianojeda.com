import { parseISO, format } from "date-fns";

interface DateFormatterProps {
  dateString: string;
}

export default function DateFormatter(props: DateFormatterProps) {
  const date = parseISO(props.dateString);

  return <time dateTime={props.dateString}>{format(date, "PP")}</time>;
}
