import { css } from "@emotion/react";
import Highlight, { defaultProps, Language } from "prism-react-renderer";
import { useState } from "react";
import { calculateLinesToHighlight, copyToClipboard } from "../lib/utils";
import Copy from "./icons/copy";
import Check from "./icons/check";

type CodeProps = {
  highlight?: string;
  filename?: string;
  children: {
    props: {
      className?: string;
      children: string;
    };
  };
};

const Styles = {
  container: css`
    position: relative;
    & > button {
      opacity: 0;
    }
    :hover > button {
      opacity: 1;
    }
  `,
  pre: css`
    margin-top: 0;
    margin-bottom: 1rem;
  `,
  code: css`
    border-bottom: 1px solid var(--color-accent-2);
    border-left: 1px solid var(--color-accent-2);
    border-right: 1px solid var(--color-accent-2);
    border-radius: 0 0 5px 5px;
    display: block;
    padding: 1rem 0;
    overflow: auto;
  `,
  metadata: css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: var(--color-accent-1);
    border-radius: 5px 5px 0 0;
    border-top: 1px solid var(--color-accent-2);
    border-left: 1px solid var(--color-accent-2);
    border-right: 1px solid var(--color-accent-2);
    margin-top: 1rem;
    padding: 0.5rem 1rem;
  `,
  language: css`
    text-transform: uppercase;
    user-select: none;
    color: var(--color-accent-5);
  `,
  filename: css`
    user-select: none;
    color: var(--color-accent-5);
  `,
  line: css`
    box-sizing: border-box;
    padding: 0 1rem;
    min-width: fit-content;
  `,
  highlight: css`
    min-width: fit-content;
    box-sizing: border-box;
    background-color: blue;
    padding: 0 calc(1rem - 2px);
    border-left: solid 2px red;
  `,
  copy: css`
    border: 1px solid var(--color-accent-2);
    color: var(--color-accent-2);
    background-color: var(--color-accent-1);
    position: absolute;
    border-radius: 5px;
    padding: 0.5rem;
    top: 2.75rem;
    right: 0.75rem;
    &:hover {
      cursor: pointer;
    }
  `,
};

export default function Code(props: CodeProps) {
  const { children: code, className } = props.children.props;
  const language = className?.replace(/language-/, "") || "text";
  const shouldHighlightLine = calculateLinesToHighlight(props.highlight || "");
  const [copied, setCopied] = useState(false);

  const handleCopyCode = async () => {
    setCopied(true);
    await copyToClipboard(code.trim());
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div css={Styles.container}>
      <div css={Styles.metadata}>
        <span css={Styles.filename}>{props.filename || ""}</span>
        <span css={Styles.language}>{language}</span>
      </div>
      <button css={Styles.copy} onClick={handleCopyCode}>
        {copied ? <Check /> : <Copy />}
      </button>
      <pre css={Styles.pre}>
        <Highlight
          {...defaultProps}
          code={code.trim()}
          language={language as Language}
          theme={undefined}
        >
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <code className={className} style={{ ...style }} css={Styles.code}>
              {tokens.map((line, index) => {
                return (
                  <div
                    key={index}
                    css={
                      shouldHighlightLine(index)
                        ? Styles.highlight
                        : Styles.line
                    }
                    {...getLineProps({ line, key: index })}
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
