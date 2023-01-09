"use client";

import Highlight, { defaultProps } from "prism-react-renderer";
import { useState } from "react";
import calculateLinesToHighlight from "../utils/calculateLinesToHighlight";
import copyToClipboard from "../utils/copyToClipboard";
import Check from "./icons/check";
import Copy from "./icons/copy";

/**
 * @typedef {object} CodeProps
 * @property {string} [highlight]
 * @property {string} [filename]
 * @property {string} [language]
 * @property {string} [content]
 * @property {import("react").ReactNode} [children]
 */

/**
 *
 * @param {CodeProps} props
 */
export default function Code(props) {
  const className = props?.children?.props?.className;
  const code = props?.children?.props?.children ?? props.content;
  const language = className?.replace(/language-/, "") ?? props.language;
  const shouldHighlightLine = calculateLinesToHighlight(props.highlight ?? "");
  const [copied, setCopied] = useState(false);
  const filename = props.filename;

  const handleCopyCode = async () => {
    setCopied(true);
    await copyToClipboard(code.trim());
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="text-sm group not-prose bg-neutral-100 dark:bg-neutral-900 relative rounded-lg border border-neutral-200 dark:border-neutral-700 divide-y divide-neutral-200 dark:divide-neutral-700 font-mono">
      {(filename || language) && (
        <div className="flex items-center justify-between py-2 px-4 gap-4">
          <span className="select-none text-neutral-500 dark:text-neutral-400 overflow-hidden whitespace-nowrap text-ellipsis">
            {filename ?? ""}
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
          {copied ? <Check size={14} /> : <Copy size={14} />}
        </button>
        <Highlight
          {...defaultProps}
          code={code.trim()}
          language={language?.toLowerCase()}
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
