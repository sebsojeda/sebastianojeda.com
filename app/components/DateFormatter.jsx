import { format, parseISO } from "date-fns";

/**
 * Props for the `DateFormatter` component.
 *
 * @typedef {object} DateFormatterProps
 * @property {string} dateString - `Date` string to format.
 */

/**
 * Formats a `Date` string into human readable words.
 *
 * @param {DateFormatterProps} props - {@link DateFormatterProps}
 */
export default function DateFormatter(props) {
  const date = parseISO(props.dateString);
  return <time dateTime={props.dateString}>{format(date, "PP")}</time>;
}
