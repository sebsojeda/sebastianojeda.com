import rangeParser from "parse-numeric-range";

export async function copyToClipboard(text: string) {
  await navigator.clipboard.writeText(text);
}

export function calculateLinesToHighlight(lines: string) {
  const lineNumbers = rangeParser(lines);
  return (index: number) => lineNumbers.includes(index + 1);
}
