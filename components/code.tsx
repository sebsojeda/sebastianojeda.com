import Highlight, { defaultProps, Language } from "prism-react-renderer";
import { useState } from "react";
import { calculateLinesToHighlight, copyToClipboard } from "../lib/utils";
import Copy from "./icons/copy";
import Check from "./icons/check";

type CodeProps = {
  highlight?: string;
  filename?: string;
  language?: string;
  content?: string;
  children?: {
    props: {
      className?: string;
      children: string;
    };
  };
};

export default function Code(props: CodeProps) {
  const className = props?.children?.props?.className;
  const code = props?.children?.props?.children ?? props.content ?? "";
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
    <div className="text-sm group not-prose bg-accent-1 relative rounded-lg border border-accent-2 divide-y divide-accent-2 font-mono">
      {(filename || language) && (
        <div className="flex items-center justify-between py-2 px-4">
          <span className="select-none text-accent-5 overflow-hidden whitespace-nowrap text-ellipsis">
            {filename ?? ""}
          </span>
          <span className="uppercase select-none text-accent-5 ml-4">
            {language ?? ""}
          </span>
        </div>
      )}
      <pre className="overflow-auto py-4">
        <button
          className={`opacity-0 border bg-accent-1 absolute rounded-lg p-2 right-2 focus:opacity-100 group-hover:opacity-100 hover:cursor-pointer ${
            copied
              ? "text-success border-success hover:border-success hover:text-success"
              : "text-accent-2 border-accent-2 hover:border-accent-4 hover:text-accent-4"
          }`}
          onClick={handleCopyCode}
        >
          {copied ? <Check /> : <Copy />}
        </button>
        <Highlight
          {...defaultProps}
          code={code.trim()}
          language={language?.toLowerCase() as Language}
          theme={undefined}
        >
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <code className={className} style={{ ...style }}>
              {tokens.map((line, index) => {
                return (
                  <div
                    key={index}
                    {...getLineProps({ line, key: index })}
                    className={
                      shouldHighlightLine(index)
                        ? `pl-[calc(1rem-2px)] pr-4 border-l-accent-5 box-border border-l-2 bg-accent-2`
                        : `px-4`
                    }
                  >
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token, key })} />
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
