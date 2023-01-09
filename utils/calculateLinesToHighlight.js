import rangeParser from "parse-numeric-range";

/**
 *
 * @param {string} lines
 */
export default function calculateLinesToHighlight(lines) {
  const lineNumbers = rangeParser(lines);

  /**
   * @param {number} index
   */
  return function (index) {
    return lineNumbers.includes(index + 1);
  };
}
