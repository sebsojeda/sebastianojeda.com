import { format, parseISO } from "date-fns";

/**
 * @typedef {object} DateFormatterProps
 * @property {string} dateString
 */

/**
 *
 * @param {DateFormatterProps} props
 */
export default function DateFormatter(props) {
  const date = parseISO(props.dateString);

  return <time dateTime={props.dateString}>{format(date, "PP")}</time>;
}
