import rangeParser from "parse-numeric-range";

/**
 * Parses a range of numbers and returns a function to determine if the line should be highlighted.
 *
 * @param {string} [range] - A range of line numbers.
 * @returns {(index: number) => boolean} A function that determines if the `index` is in the given
 * `range`.
 */
export default function calculateLinesToHighlight(range) {
  if (range === undefined) {
    return (_) => false;
  }

  const lineNumbers = rangeParser(range);
  return (index) => lineNumbers.includes(index + 1);
}
