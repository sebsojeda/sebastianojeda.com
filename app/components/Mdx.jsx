import Link from "next/link";
import Code from "./Code";

/**
 * @param {any} props
 */
const pre = (props) => <Code {...props} />;

/**
 * @param {any} props
 */
const a = (props) => {
  const href = props.href;
  if (href && (href.startsWith("/") || href.startsWith("#"))) {
    return (
      <Link
        href={href}
        {...props}
        className="not-prose relative text-blue-500 hover:text-blue-600 underline underline-offset-1"
      >
        {props.children}
      </Link>
    );
  }

  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      {...props}
      className="not-prose relative text-blue-500 hover:text-blue-600 underline underline-offset-1"
    />
  );
};

/**
 * @param {any} props
 */
const code = (props) => (
  <code
    {...props}
    className="border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-neutral-50 p-1 rounded-lg font-mono not-prose"
  />
);

const Mdx = {
  pre,
  a,
  code,
};

export default Mdx;
