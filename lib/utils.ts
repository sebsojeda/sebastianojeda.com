import rangeParser from "parse-numeric-range";

export async function copyToClipboard(text: string) {
  await navigator.clipboard.writeText(text);
}

export function calculateLinesToHighlight(lines: string) {
  const lineNumbers = rangeParser(lines);
  return (index: number) => lineNumbers.includes(index + 1);
}

export function kebabCase(str: string) {
  return str
    .match(/[A-Z]{2,}(?=[A-Z][a-z0-9]*|\b)|[A-Z]?[a-z0-9]*|[A-Z]|[0-9]+/g)
    ?.filter(Boolean)
    .map((x) => x.toLowerCase())
    .join("-");
}
