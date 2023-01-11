"use client";

import Highlight, { defaultProps } from "prism-react-renderer";
import { useCallback, useState } from "react";
import calculateLinesToHighlight from "../../utils/calculateLinesToHighlight";
import copyToClipboard from "../../utils/copyToClipboard";
import CheckIcon from "./icons/CheckIcon";
import CopyIcon from "./icons/CopyIcon";

/**
 * Props for the `Code` component.
 *
 * @typedef {object} CodeProps
 * @property {string} [highlight] - A range of numbers to highlight.
 * @property {string} [filename] - The filename of the code block.
 * @property {string} [language] - The language of the code block.
 * @property {string} [content] - The code string to render.
 * @property {import("react").ReactNode} [children]
 */

/**
 * Attempts to extract the `language` from the props.
 *
 * @param {CodeProps} props - {@link CodeProps}
 * @returns {import("prism-react-renderer").Language} The extracted `language` or an empty string
 * if not found.
 */
function getLanguageFromProps(props) {
  if (props.language) {
    // @ts-ignore
    return props.language.toLowerCase();
  } else {
    // @ts-ignore
    const className = props?.children?.props?.className;
    if (className !== undefined) {
      return className?.replace(/language-/, "").toLowerCase();
    } else {
      // @ts-ignore
      return "";
    }
  }
}

/**
 * Attempts to extract the `code` from the props.
 *
 * @param {CodeProps} props - {@link CodeProps}
 * @returns {string} The extracted `code` or and empty string if not found.
 */
function getCodeStringFromProps(props) {
  if (props.content) {
    return props.content;
  } else {
    // @ts-ignore
    const code = props?.children?.props?.children;
    if (code !== undefined) {
      return code;
    }
    return "";
  }
}

/**
 * A `code` block to render along with syntax and line number highlighting.
 *
 * @param {CodeProps} props - {@link CodeProps}
 */
export default function Code(props) {
  const language = getLanguageFromProps(props);
  const code = getCodeStringFromProps(props);
  const [copied, setCopied] = useState(false);
  const shouldHighlightLine = useCallback(
    (i) => calculateLinesToHighlight(props.highlight)(i),
    [props.highlight]
  );

  /**
   * Copies the code block to the clipboard and signals the action to the user using setTimeout().
   */
  async function handleCopyCode() {
    setCopied(true);
    await copyToClipboard(code.trim());
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="text-sm group not-prose bg-neutral-100 dark:bg-neutral-900 relative rounded-lg border border-neutral-200 dark:border-neutral-700 divide-y divide-neutral-200 dark:divide-neutral-700 font-mono">
      {(props.filename || language) && (
        <div className="flex items-center justify-between py-2 px-4 gap-4">
          <span className="select-none text-neutral-500 dark:text-neutral-400 overflow-hidden whitespace-nowrap text-ellipsis">
            {props.filename ?? ""}
          </span>
          <span className="uppercase select-none text-neutral-500 dark:text-neutral-400">
            {language ?? ""}
          </span>
        </div>
      )}
      <pre className="overflow-auto py-4">
        {copied && (
          <div className="bg-neutral-500 absolute rounded-md p-1 right-12 text-xs mt-1 text-neutral-50">
            Copied!
          </div>
        )}
        <button
          tabIndex={-1}
          className={`opacity-0 border bg-neutral-200 dark:bg-neutral-800 absolute rounded-lg p-2 right-2 group-hover:opacity-100 hover:cursor-pointer ${
            copied
              ? "text-blue-500 border-blue-500 opacity-100"
              : "text-neutral-400 dark:text-neutral-500 border-neutral-300 dark:border-neutral-700 hover:border-neutral-500 hover:text-neutral-500 dark:hover:border-neutral-400 dark:hover:text-neutral-400"
          }`}
          onClick={handleCopyCode}
        >
          {copied ? <CheckIcon size={14} /> : <CopyIcon size={14} />}
        </button>
        <Highlight
          {...defaultProps}
          code={code.trim()}
          language={language}
          theme={undefined}
        >
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <code className={className} style={{ ...style }}>
              {tokens.map((line, index) => {
                return (
                  <div
                    {...getLineProps({ line, key: index })}
                    key={index}
                    className={
                      shouldHighlightLine(index)
                        ? `pl-[calc(1rem-2px)] pr-4 border-l-accent-5 box-border border-l-2 bg-accent-2`
                        : `px-4`
                    }
                  >
                    {line.map((token, key) => (
                      <span {...getTokenProps({ token, key })} key={key} />
                    ))}
                  </div>
                );
              })}
            </code>
          )}
        </Highlight>
      </pre>
    </div>
  );
}
